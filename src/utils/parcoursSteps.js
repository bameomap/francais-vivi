// Single source of truth for "sub-lessons" inside each Parcours step.
// Given a unit + step, returns the list of stable sub-lesson ids that live
// in that step for that unit. Used by:
//   • parcours.js  → to compute fractional step/unit progress
//   • activity panels → to render per-sub-lesson "Done / Làm lại" and to
//     mark the right sub-lesson done on completion.
//
// subId convention = the natural id already present in each data source
// (no new ids invented), so panels and the progress store always agree.
//
// The ids come from a generated manifest rather than from the course data
// directly. This module is on the eager path (the home screen's progress bar
// pulls it in via parcours.js), and deriving the ids at runtime meant
// importing every vocab/grammar/phono/verb/audio/reading corpus for both
// levels — about a megabyte of French text — only to call .map(x => x.id).
// The manifest carries the same 768 ids in ~11 KB.
//
// After editing any course data, run `npm run gen:subids` to refresh it;
// `npm run check:subids` fails the build if it has drifted.

import { STEP_SUB_IDS } from "../data/stepSubIds.generated.js";

// unitId is the parcours form "u0".."u10" (A1) or "b1".."b12" (A2).
export const isA2Unit = (unitId) => String(unitId).startsWith("b");

// Returns string[] of sub-lesson ids for (unitId, stepId). Empty if none.
// Steps with no sub-lessons are omitted from the manifest entirely, so a miss
// and a genuinely empty step are the same answer — as before.
//
// The array is the manifest's own — shared across calls, so treat it as
// read-only. (The previous implementation built a fresh array per call via
// .map(); nothing downstream relied on that, but a future caller that wants
// to sort or splice the result must copy it first.)
export function getStepSubIds(unitId, stepId) {
  return STEP_SUB_IDS[unitId]?.[stepId] ?? [];
}

export function getStepTotal(unitId, stepId) {
  return getStepSubIds(unitId, stepId).length;
}
