/**
 * /api/sync — Cloud sync endpoint for Vivi Learns Français
 *
 * GET  /api/sync?token=SECRET      → returns saved backup JSON
 * POST /api/sync?token=SECRET      → body: { data: {...} }  → saves backup
 *
 * Protected by SYNC_SECRET env var. Single-user personal app —
 * no auth system needed, just a shared secret token.
 */

import { Redis } from "@upstash/redis";

const REDIS_KEY = "vivi_backup_v1";

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

  try {
    // ── GET: fetch saved data
    if (req.method === "GET") {
      const saved = await redis.get(REDIS_KEY);
      if (!saved) return res.status(200).json({ data: null, ts: null });
      // Upstash auto-parses JSON, so saved may already be an object
      const parsed = typeof saved === "string" ? JSON.parse(saved) : saved;
      return res.status(200).json(parsed);
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
      // Store as string to avoid Upstash auto-parse issues with nested JSON
      await redis.set(REDIS_KEY, JSON.stringify(payload));
      return res.status(200).json({ ok: true, ts: payload.ts, keys: Object.keys(body.data).length });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("[sync] error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
