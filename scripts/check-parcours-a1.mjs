#!/usr/bin/env node
// Verifies the A1 per-unit cycle overrides (STEP_GROUPS_U10 and friends).
//
// Most A1 units use the flat STEP_GROUPS (one card per skill, no subIds) and
// can never desync — a card with no subIds always means "the whole skill".
// A unit with its own cycle layout partitions each skill across several
// cards instead (see parcoursData.js), so — exactly like A2 — this checks
// that the slices cover the real sub-lesson ids exactly once: no typo'd id
// that can never be completed, no sub-lesson orphaned out of the total, no
// id counted twice.
//
// A typo here fails silently in the app: the card just never reaches 100%.
// Run this after adding or editing a unit's cycle layout.
//
//   node scripts/check-parcours-a1.mjs

import {
  PARCOURS_UNITS,
  STEP_GROUPS_U5, STEP_GROUPS_U6, STEP_GROUPS_U7, STEP_GROUPS_U8, STEP_GROUPS_U9, STEP_GROUPS_U10,
} from "../src/data/parcoursData.js";
import { getStepSubIds } from "../src/utils/parcoursSteps.js";

// Registry of units with their own cycle layout — add new ones here as they
// get migrated off the flat STEP_GROUPS.
const UNIT_CYCLES = {
  u5: STEP_GROUPS_U5, u6: STEP_GROUPS_U6, u7: STEP_GROUPS_U7, u8: STEP_GROUPS_U8, u9: STEP_GROUPS_U9,
  u10: STEP_GROUPS_U10,
};

let ok = true;

for (const [unitId, groups] of Object.entries(UNIT_CYCLES)) {
  const unit = PARCOURS_UNITS.find(u => u.id === unitId);
  const defs = groups.flatMap(g => g.steps);
  // Derived, not hand-listed: a hand-listed set silently skips any skill
  // added later, which is exactly the case this script exists to catch.
  const skills = [...new Set(defs.map(s => s.stepKey || s.id))];

  console.log(`\n── ${unit ? `Unité ${unit.num} · ${unit.fr}` : unitId} (${unitId}) ──`);
  let total = 0;

  for (const skill of skills) {
    const real = getStepSubIds(unitId, skill);
    const used = defs
      .filter(s => (s.stepKey || s.id) === skill)
      .flatMap(s => s.subIds || []);

    const missing = real.filter(id => !used.includes(id));
    const unknown = used.filter(id => !real.includes(id));
    const dupes   = used.filter((id, i) => used.indexOf(id) !== i);
    const bad     = missing.length || unknown.length || dupes.length;

    if (bad) ok = false;
    total += real.length;

    console.log(
      `${bad ? "✗" : "✓"} ${skill.padEnd(8)} real=${String(real.length).padStart(2)} used=${String(used.length).padStart(2)}` +
      (missing.length ? `  THIẾU: ${missing.join(", ")}` : "") +
      (unknown.length ? `  SAI ID: ${unknown.join(", ")}` : "") +
      (dupes.length   ? `  TRÙNG: ${dupes.join(", ")}`   : "")
    );
  }

  console.log(`   → ${total} sub-lessons · ${defs.length} thẻ`);
}

console.log(ok ? "\n✅ Phân chia khớp hoàn toàn" : "\n❌ Có sai lệch — sửa subIds trong parcoursData.js");
process.exit(ok ? 0 : 1);
