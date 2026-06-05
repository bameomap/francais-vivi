const SETS_KEY = "vocab_sets";
const STREAK_KEY = "streak_data";
const PROGRESS_KEY = "module_progress";
import { schedulePush } from "./cloudSync.js";

// ── Storage health ────────────────────────────────────────────
// Most browsers cap localStorage at ~5MB. We warn before silent data loss.
const STORAGE_LIMIT = 5 * 1024 * 1024;

export function estimateStorageBytes() {
  try {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const val = localStorage.getItem(key) || "";
      total += (key.length + val.length) * 2; // UTF-16 ~2 bytes/char
    }
    return total;
  } catch { return 0; }
}

// Returns { bytes, pct, near } — near = true when over 80% of the limit.
export function getStorageHealth() {
  const bytes = estimateStorageBytes();
  const pct = Math.round((bytes / STORAGE_LIMIT) * 100);
  return { bytes, pct, near: pct >= 80 };
}

// Safe write that surfaces quota failures instead of losing data silently.
// On failure it broadcasts a "storage-quota-exceeded" event the UI listens for,
// then rethrows nothing — callers stay simple but the user gets warned.
export function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    try {
      window.dispatchEvent(new CustomEvent("storage-quota-exceeded", { detail: { key } }));
    } catch {}
    return false;
  }
}

// Full backup of everything in localStorage → downloadable JSON.
export function exportBackup() {
  try {
    const dump = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      dump[k] = localStorage.getItem(k);
    }
    const blob = new Blob([JSON.stringify(dump, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `vivi-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    return true;
  } catch { return false; }
}

export function loadSets() {
  try {
    const r = localStorage.getItem(SETS_KEY);
    return r ? JSON.parse(r) : [];
  } catch {
    return [];
  }
}

export function saveSets(sets) {
  return safeSetItem(SETS_KEY, JSON.stringify(sets));
}

export function getStreak() {
  try {
    const d = JSON.parse(localStorage.getItem(STREAK_KEY) || "{}");
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (d.last === today) return { streak: d.streak || 1, studiedToday: true };
    if (d.last === yesterday) return { streak: d.streak || 1, studiedToday: false };
    return { streak: 0, studiedToday: false };
  } catch {
    return { streak: 0, studiedToday: false };
  }
}

export function markStudiedToday() {
  try {
    const d = JSON.parse(localStorage.getItem(STREAK_KEY) || "{}");
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (d.last === today) return;
    const streak = d.last === yesterday ? (d.streak || 1) + 1 : 1;
    localStorage.setItem(STREAK_KEY, JSON.stringify({ last: today, streak }));
    // Track full history for calendar (last 90 days)
    const hist = JSON.parse(localStorage.getItem("study_history") || "[]");
    if (!hist.includes(today)) {
      hist.push(today);
      localStorage.setItem("study_history", JSON.stringify(hist.slice(-90)));
    }
    schedulePush();
  } catch {}
}

export function getStudyHistory() {
  try { return new Set(JSON.parse(localStorage.getItem("study_history") || "[]")); }
  catch { return new Set(); }
}

// ── Mistake log (cross-module) ────────────────────────────────
const MISTAKES_KEY = "mistake_log";

export function logMistake({ fr, vi, context, module }) {
  try {
    const log = JSON.parse(localStorage.getItem(MISTAKES_KEY) || "[]");
    // Avoid exact duplicate in last 20 entries
    const recent = log.slice(-20);
    if (recent.some(m => m.fr === fr && m.context === context)) return;
    log.push({ fr, vi: vi || "", context: context || "", module: module || "unknown", date: new Date().toDateString(), ts: Date.now() });
    localStorage.setItem(MISTAKES_KEY, JSON.stringify(log.slice(-200)));
  } catch {}
}

export function getMistakes() {
  try { return JSON.parse(localStorage.getItem(MISTAKES_KEY) || "[]"); }
  catch { return []; }
}

export function clearMistake(ts) {
  try {
    const log = JSON.parse(localStorage.getItem(MISTAKES_KEY) || "[]");
    localStorage.setItem(MISTAKES_KEY, JSON.stringify(log.filter(m => m.ts !== ts)));
  } catch {}
}

export function clearAllMistakes() {
  localStorage.removeItem(MISTAKES_KEY);
}

export function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
  } catch {
    return {};
  }
}

export function markModuleUsed(moduleId) {
  try {
    const p = getProgress();
    if (!p[moduleId]) p[moduleId] = { count: 0 };
    p[moduleId].count = (p[moduleId].count || 0) + 1;
    p[moduleId].last = new Date().toDateString();
    p[moduleId].lastTs = Date.now();
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
    markStudiedToday();
  } catch {}
}
