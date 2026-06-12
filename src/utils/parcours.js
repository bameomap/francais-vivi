import { PARCOURS_UNITS, STEP_DEFS } from "../data/parcoursData.js";
import { getStepSubIds } from "./parcoursSteps.js";
import { schedulePush } from "./cloudSync.js";

const KEY = "parcours_progress";
const STEP_IDS = STEP_DEFS.map(s => s.id);

// Steps without enumerable content (e.g. U0 has no audio tracks) still get
// one implicit slot so they can be marked done manually and counted in totals.
function subIdsFor(unitId, stepId) {
  const ids = getStepSubIds(unitId, stepId);
  return ids.length ? ids : ["_done"];
}

export function getParcoursProgress() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
  catch { return {}; }
}

function save(p) {
  localStorage.setItem(KEY, JSON.stringify(p));
  schedulePush();
}

// Resolve the set of completed sub-lessons for a step.
// Backward compatible: a legacy boolean `true` means "whole step done"
// and expands to every sub-lesson of that step.
function doneSet(p, unitId, stepId) {
  const v = p[unitId]?.[stepId];
  if (v === true) {
    const o = {};
    subIdsFor(unitId, stepId).forEach(id => { o[id] = true; });
    return o;
  }
  return v && typeof v === "object" ? v : {};
}

// ── Sub-lesson API ─────────────────────────────────────────────

export function getSubDone(unitId, stepId) {
  return doneSet(getParcoursProgress(), unitId, stepId);
}

export function markSubDone(unitId, stepId, subId = "_done") {
  const p = getParcoursProgress();
  if (!p[unitId]) p[unitId] = {};
  const set = doneSet(p, unitId, stepId);   // normalises legacy true → object
  set[subId] = true;
  p[unitId][stepId] = set;
  save(p);
}

export function unmarkSubDone(unitId, stepId, subId = "_done") {
  const p = getParcoursProgress();
  if (!p[unitId]) return;
  const set = doneSet(p, unitId, stepId);
  delete set[subId];
  if (Object.keys(set).length === 0) delete p[unitId][stepId];
  else p[unitId][stepId] = set;
  save(p);
}

// Mark / clear the whole step (all sub-lessons) — used by the
// step-level "Làm lại" affordance in ParcoursPanel.
export function markStepDone(unitId, stepId) {
  const p = getParcoursProgress();
  if (!p[unitId]) p[unitId] = {};
  const set = {};
  subIdsFor(unitId, stepId).forEach(id => { set[id] = true; });
  p[unitId][stepId] = set;
  save(p);
}

export function unmarkStepDone(unitId, stepId) {
  const p = getParcoursProgress();
  if (p[unitId]) {
    delete p[unitId][stepId];
    save(p);
  }
}

export function resetUnit(unitId) {
  const p = getParcoursProgress();
  if (p[unitId]) {
    delete p[unitId];
    save(p);
  }
}

// { done, total, pct, complete } for one step in one unit.
export function getStepStat(unitId, stepId) {
  const ids   = subIdsFor(unitId, stepId);
  const set   = getSubDone(unitId, stepId);
  const done  = ids.filter(id => set[id]).length;
  const total = ids.length;
  return {
    done, total,
    pct: total ? Math.round((done / total) * 100) : 0,
    complete: total > 0 && done === total,
  };
}

export function getUnitStepProgress(unitId) {
  return getParcoursProgress()[unitId] || {};
}

// Sum done / total sub-lessons across every step of a unit.
function unitTally(unitId) {
  let done = 0, total = 0;
  for (const s of STEP_IDS) {
    const st = getStepStat(unitId, s);
    done  += st.done;
    total += st.total;
  }
  return { done, total };
}

// Returns { unitId: { status, pct } } for all units
export function computeUnitStatuses() {
  const statuses = {};
  for (const u of PARCOURS_UNITS) {
    const { done, total } = unitTally(u.id);
    const pct = total ? Math.round((done / total) * 100) : 0;
    if (total > 0 && done === total)      statuses[u.id] = { status: "done",    pct: 100 };
    else if (done > 0)                    statuses[u.id] = { status: "current", pct };
    else                                  statuses[u.id] = { status: "next",    pct: 0 };
  }
  return statuses;
}

// Overall % across all units (by sub-lesson granularity)
export function computeOverallProgress() {
  let done = 0, total = 0;
  for (const u of PARCOURS_UNITS) {
    const t = unitTally(u.id);
    done  += t.done;
    total += t.total;
  }
  return { done, total, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
}
