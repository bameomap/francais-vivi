/**
 * cloudSync.js — Sync localStorage data to/from Upstash Redis via /api/sync
 *
 * How it works:
 *  - On app start: pull from cloud and merge (cloud wins for SRS/progress,
 *    local wins for preferences like dark_mode).
 *  - On any data change (debounced 5 s): push to cloud.
 *  - Token stored in localStorage under "sync_token".
 */

// ── Keys to sync ─────────────────────────────────────────────────
const SYNC_KEYS = [
  "srs_data", "module_progress", "streak_data", "xp_data", "badges_earned",
  "vocab_sets", "mistake_log", "weak_spots_log", "study_history",
  "writing_history", "defi_history", "analyse_history", "parcours_last_unit",
  "pour_note_expansions_v2", "grammar_last_unit", "onboarded",
  // lecture caches collected dynamically below
];

/** Collect all keys that should be synced (including dynamic ones). */
function collectData() {
  const out = {};
  for (const key of SYNC_KEYS) {
    const v = localStorage.getItem(key);
    if (v !== null) out[key] = v;
  }
  // Dynamic lecture cache keys
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith("lecture_cache_")) out[k] = localStorage.getItem(k);
  }
  return out;
}

/** Apply data from cloud into localStorage. */
function applyData(data) {
  // Preferences that should NOT be overwritten from cloud
  const localOnly = new Set(["dark_mode", "user_name", "sync_token"]);
  let applied = 0;
  for (const [key, value] of Object.entries(data)) {
    if (localOnly.has(key)) continue;
    try {
      localStorage.setItem(key, value);
      applied++;
    } catch {}
  }
  return applied;
}

// ── Token helpers ─────────────────────────────────────────────────
export function getSyncToken() {
  return localStorage.getItem("sync_token") || "";
}
export function setSyncToken(token) {
  localStorage.setItem("sync_token", token.trim());
}
export function clearSyncToken() {
  localStorage.removeItem("sync_token");
}

// ── Core API calls ─────────────────────────────────────────────────
async function apiCall(method, token, body) {
  const url = `/api/sync?token=${encodeURIComponent(token)}`;
  const opts = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(url, opts);
  if (res.status === 401) throw new Error("UNAUTHORIZED");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/** Push current localStorage to cloud. Returns { ok, ts, keys } or throws. */
export async function pushToCloud(token = getSyncToken()) {
  if (!token) throw new Error("NO_TOKEN");
  const data = collectData();
  return apiCall("POST", token, { data });
}

/** Pull data from cloud and apply to localStorage. Returns { applied, ts } or throws. */
export async function pullFromCloud(token = getSyncToken()) {
  if (!token) throw new Error("NO_TOKEN");
  const res = await apiCall("GET", token);
  if (!res.data) return { applied: 0, ts: null, empty: true };
  const applied = applyData(res.data);
  return { applied, ts: res.ts };
}

// ── Debounced auto-push ───────────────────────────────────────────
let _pushTimer = null;

/** Schedule a debounced push (call this whenever data changes). */
export function schedulePush(delayMs = 5000) {
  if (!getSyncToken()) return;
  clearTimeout(_pushTimer);
  _pushTimer = setTimeout(async () => {
    try {
      await pushToCloud();
    } catch (e) {
      // Silently ignore auto-push errors (offline, etc.)
      if (e.message !== "NO_TOKEN") {
        console.warn("[cloudSync] auto-push failed:", e.message);
      }
    }
  }, delayMs);
}

/** Cancel any pending push (call on app unmount). */
export function cancelPendingPush() {
  clearTimeout(_pushTimer);
}
