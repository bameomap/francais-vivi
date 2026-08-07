import { beforeEach, describe, expect, it, vi } from "vitest";

// In-memory stand-in for Upstash, so the handler's own read/write paths are
// exercised rather than just the date logic around them.
const store = { kv: new Map(), lists: new Map() };
const fakeRedis = {
  get: async (k) => (store.kv.has(k) ? store.kv.get(k) : null),
  set: async (k, v) => void store.kv.set(k, v),
  lpush: async (k, v) => {
    const l = store.lists.get(k) || [];
    l.unshift(v);
    store.lists.set(k, l);
    return l.length;
  },
  ltrim: async (k, start, stop) => {
    const l = store.lists.get(k) || [];
    store.lists.set(k, l.slice(start, stop + 1));
  },
  lindex: async (k, i) => (store.lists.get(k) || [])[i] ?? null,
  lrange: async (k, start, stop) => (store.lists.get(k) || []).slice(start, stop + 1),
};
vi.mock("@upstash/redis", () => ({ Redis: { fromEnv: () => fakeRedis } }));

import handler, { shouldSnapshot } from "./sync.js";

const TOKEN = "test-secret";

function call(method, query = {}, body = null) {
  const req = { method, query: { token: TOKEN, ...query }, headers: {}, body };
  let statusCode = 0, payload = null;
  const res = {
    setHeader() {},
    status(c) { statusCode = c; return res; },
    json(p) { payload = p; return res; },
    end() { return res; },
  };
  return handler(req, res).then(() => ({ statusCode, payload }));
}

const at = (iso) => new Date(iso).getTime();

// The backup used to be a single key that every push overwrote, so damaged
// data reached the cloud within seconds and took the good copy with it.
// Snapshots are the way back; this decides when one is worth keeping.
describe("shouldSnapshot", () => {
  it("keeps a snapshot when there is no history yet", () => {
    expect(shouldSnapshot(null, at("2026-08-07T09:00:00Z"))).toBe(true);
  });

  it("does not snapshot again on the same day", () => {
    // Pushes are debounced to a few seconds; snapshotting each one would fill
    // the whole history with a single afternoon.
    expect(shouldSnapshot(at("2026-08-07T09:00:00Z"), at("2026-08-07T09:00:05Z"))).toBe(false);
    expect(shouldSnapshot(at("2026-08-07T00:00:00Z"), at("2026-08-07T23:59:59Z"))).toBe(false);
  });

  it("snapshots on the first push of a new day", () => {
    expect(shouldSnapshot(at("2026-08-07T23:59:59Z"), at("2026-08-08T00:00:01Z"))).toBe(true);
  });

  it("snapshots after a gap of several days", () => {
    expect(shouldSnapshot(at("2026-07-20T12:00:00Z"), at("2026-08-07T12:00:00Z"))).toBe(true);
  });

  it("snapshots across a year boundary", () => {
    expect(shouldSnapshot(at("2026-12-31T22:00:00Z"), at("2027-01-01T02:00:00Z"))).toBe(true);
  });

  // The point of a daily snapshot is that the newest one predates today's
  // damage. If a same-day push replaced it, that guarantee would be gone.
  it("leaves yesterday's recovery point intact all through today", () => {
    const yesterday = at("2026-08-06T08:00:00Z");
    for (const t of ["2026-08-07T00:00:00Z", "2026-08-07T12:00:00Z", "2026-08-07T23:00:00Z"]) {
      expect(shouldSnapshot(yesterday, at(t))).toBe(true);   // first push today
    }
    const today = at("2026-08-07T00:00:00Z");
    for (const t of ["2026-08-07T12:00:00Z", "2026-08-07T23:00:00Z"]) {
      expect(shouldSnapshot(today, at(t))).toBe(false);      // later pushes today
    }
  });
});

describe("/api/sync handler", () => {
  beforeEach(() => {
    store.kv.clear();
    store.lists.clear();
    process.env.SYNC_SECRET = TOKEN;
    vi.useRealTimers();
  });

  it("rejects a wrong token", async () => {
    const req = { method: "GET", query: { token: "nope" }, headers: {} };
    let code = 0;
    const res = { setHeader() {}, status(c) { code = c; return res; }, json() { return res; }, end() { return res; } };
    await handler(req, res);
    expect(code).toBe(401);
  });

  it("round-trips a push and a pull", async () => {
    const post = await call("POST", {}, { data: { parcours_progress: '{"u1":{}}' } });
    expect(post.statusCode).toBe(200);
    expect(post.payload.ok).toBe(true);

    const get = await call("GET");
    expect(get.payload.data.parcours_progress).toBe('{"u1":{}}');
  });

  it("rejects a malformed body rather than clobbering the backup", async () => {
    await call("POST", {}, { data: { srs_data: "good" } });
    const bad = await call("POST", {}, { nope: true });
    expect(bad.statusCode).toBe(400);

    const get = await call("GET");
    expect(get.payload.data.srs_data).toBe("good");   // survived
  });

  it("keeps the first push of the day as a recovery point", async () => {
    await call("POST", {}, { data: { srs_data: "day-1" } });
    const history = await call("GET", { history: 1 });
    expect(history.payload.snapshots).toHaveLength(1);
    expect(history.payload.snapshots[0].keys).toBe(1);
  });

  it("does not add a second snapshot for later pushes the same day", async () => {
    await call("POST", {}, { data: { srs_data: "first" } });
    await call("POST", {}, { data: { srs_data: "second" } });
    await call("POST", {}, { data: { srs_data: "third" } });

    const history = await call("GET", { history: 1 });
    expect(history.payload.snapshots).toHaveLength(1);
    // ...and the live backup still tracks the newest push.
    expect((await call("GET")).payload.data.srs_data).toBe("third");
  });

  // The whole point: a push that loses data must not take the good copy away.
  it("can recover yesterday's data after today's push wipes it", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-06T09:00:00Z"));
    await call("POST", {}, { data: { parcours_progress: '{"u1":{"vocab":{"u1g1":true}}}' } });

    vi.setSystemTime(new Date("2026-08-07T09:00:00Z"));
    await call("POST", {}, { data: {} });          // damaged push: progress gone
    vi.useRealTimers();

    // Live backup is indeed empty now...
    expect((await call("GET")).payload.data).toEqual({});

    // ...but yesterday is still recoverable.
    const history = await call("GET", { history: 1 });
    const yesterday = history.payload.snapshots.find(s => s.date === "2026-08-06");
    expect(yesterday).toBeDefined();

    const restored = await call("GET", { snapshot: String(yesterday.ts) });
    expect(restored.payload.data.parcours_progress)
      .toBe('{"u1":{"vocab":{"u1g1":true}}}');
  });

  it("404s for a snapshot that does not exist", async () => {
    await call("POST", {}, { data: { srs_data: "x" } });
    const missing = await call("GET", { snapshot: "1" });
    expect(missing.statusCode).toBe(404);
  });
});
