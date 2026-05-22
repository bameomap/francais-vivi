import { PARCOURS_UNITS, STEP_DEFS } from "../data/parcoursData.js";

const KEY = "parcours_progress";
const STEP_IDS = STEP_DEFS.map(s => s.id);

export function getParcoursProgress() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
  catch { return {}; }
}

export function markStepDone(unitId, stepId) {
  const p = getParcoursProgress();
  if (!p[unitId]) p[unitId] = {};
  p[unitId][stepId] = true;
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function getUnitStepProgress(unitId) {
  return getParcoursProgress()[unitId] || {};
}

// Returns { unitId: { status, pct } } for all units
export function computeUnitStatuses() {
  const p = getParcoursProgress();
  const statuses = {};
  let prevUnlocked = true;

  for (const u of PARCOURS_UNITS) {
    const done = STEP_IDS.filter(s => p[u.id]?.[s]).length;
    const total = STEP_IDS.length;
    const allDone = done === total;
    const anyDone = done > 0;

    if (allDone) {
      statuses[u.id] = { status: "done", pct: 100 };
      prevUnlocked = true;
    } else if (anyDone) {
      statuses[u.id] = { status: "current", pct: Math.round((done / total) * 100) };
      prevUnlocked = false;
    } else if (prevUnlocked) {
      statuses[u.id] = { status: "next", pct: 0 };
      prevUnlocked = false;
    } else {
      statuses[u.id] = { status: "locked", pct: 0 };
    }
  }
  return statuses;
}

// Overall % across all units
export function computeOverallProgress() {
  const p = getParcoursProgress();
  const total = PARCOURS_UNITS.length * STEP_IDS.length;
  const done = PARCOURS_UNITS.reduce((acc, u) =>
    acc + STEP_IDS.filter(s => p[u.id]?.[s]).length, 0);
  return { done, total, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
}
