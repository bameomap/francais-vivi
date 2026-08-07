/**
 * /api/sync — Cloud sync endpoint for Vivi Learns Français
 *
 * GET  /api/sync?token=SECRET             → latest backup JSON
 * GET  /api/sync?token=SECRET&history=1   → list of daily snapshots (metadata)
 * GET  /api/sync?token=SECRET&snapshot=TS → one snapshot, in full
 * POST /api/sync?token=SECRET             → body: { data: {...} } → saves backup
 *
 * Protected by SYNC_SECRET env var. Single-user personal app —
 * no auth system needed, just a shared secret token.
 *
 * The latest backup lives under one key that each push overwrites. That alone
 * is a backup with no undo: if the app ever pushes damaged or partial data,
 * the good copy is gone five seconds later. So each push also keeps a daily
 * snapshot, giving a couple of weeks of recovery points to fall back on.
 */

import { Redis } from "@upstash/redis";

const REDIS_KEY = "vivi_backup_v1";
const HISTORY_KEY = "vivi_backup_daily";
const HISTORY_DAYS = 14;

const dayOf = (ts) => new Date(ts).toISOString().slice(0, 10);

/**
 * Whether this push should start a new snapshot rather than fold into the
 * newest one. Pushes are debounced to every few seconds, so snapshotting each
 * one would fill the history with a single afternoon and leave nothing to go
 * back to. One per day keeps HISTORY_DAYS days of real depth, and the newest
 * snapshot is always from before today's changes — which is what you want
 * when today is the day something went wrong.
 *
 * Exported for tests; the Redis wiring around it is not worth mocking.
 */
export function shouldSnapshot(headTs, nowTs) {
  if (!headTs) return true;                    // nothing kept yet
  return dayOf(headTs) !== dayOf(nowTs);
}

export default async function handler(req, res) {
  // ── CORS (same-origin only in prod, allow localhost in dev)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();

  // ── Auth: token in query string or Authorization header
  const token =
    req.query.token ||
    (req.headers.authorization || "").replace(/^Bearer\s+/i, "");

  if (!process.env.SYNC_SECRET || token !== process.env.SYNC_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // ── Initialize Redis
  const redis = Redis.fromEnv();
  const parse = (v) => (typeof v === "string" ? JSON.parse(v) : v);

  try {
    // ── GET: fetch saved data
    if (req.method === "GET") {
      // List the recovery points, without shipping every payload.
      if (req.query.history) {
        const raw = await redis.lrange(HISTORY_KEY, 0, HISTORY_DAYS - 1);
        const snapshots = (raw || []).map((entry) => {
          const s = parse(entry);
          return { ts: s.ts, date: dayOf(s.ts), keys: Object.keys(s.data || {}).length };
        });
        return res.status(200).json({ snapshots });
      }

      // Fetch one recovery point in full, so it can be restored.
      if (req.query.snapshot) {
        const wanted = Number(req.query.snapshot);
        const raw = await redis.lrange(HISTORY_KEY, 0, HISTORY_DAYS - 1);
        const found = (raw || []).map(parse).find((s) => s.ts === wanted);
        if (!found) return res.status(404).json({ error: "Snapshot not found" });
        return res.status(200).json(found);
      }

      const saved = await redis.get(REDIS_KEY);
      if (!saved) return res.status(200).json({ data: null, ts: null });
      // Upstash auto-parses JSON, so saved may already be an object
      return res.status(200).json(parse(saved));
    }

    // ── POST: save data
    if (req.method === "POST") {
      const body = req.body;
      if (!body || typeof body.data !== "object") {
        return res.status(400).json({ error: "Body must be { data: {...} }" });
      }
      const payload = {
        ts: Date.now(),
        version: 1,
        data: body.data,
      };
      const serialized = JSON.stringify(payload);

      // Store as string to avoid Upstash auto-parse issues with nested JSON
      await redis.set(REDIS_KEY, serialized);

      // Keep a daily recovery point. Failing here must not fail the push —
      // losing a snapshot is survivable, losing the backup itself is not.
      let snapshotted = false;
      try {
        const head = await redis.lindex(HISTORY_KEY, 0);
        if (shouldSnapshot(head ? parse(head).ts : null, payload.ts)) {
          await redis.lpush(HISTORY_KEY, serialized);
          await redis.ltrim(HISTORY_KEY, 0, HISTORY_DAYS - 1);
          snapshotted = true;
        }
      } catch (e) {
        console.error("[sync] snapshot failed (backup itself is saved):", e);
      }

      return res.status(200).json({
        ok: true,
        ts: payload.ts,
        keys: Object.keys(body.data).length,
        snapshotted,
      });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("[sync] error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
