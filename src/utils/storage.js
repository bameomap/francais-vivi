const SETS_KEY = "vocab_sets";
const STREAK_KEY = "streak_data";
const PROGRESS_KEY = "module_progress";

export function loadSets() {
  try {
    const r = localStorage.getItem(SETS_KEY);
    return r ? JSON.parse(r) : [];
  } catch {
    return [];
  }
}

export function saveSets(sets) {
  try {
    localStorage.setItem(SETS_KEY, JSON.stringify(sets));
  } catch {}
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
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
    markStudiedToday();
  } catch {}
}
