#!/usr/bin/env node
// Verifies the A2 parcours partition.
//
// A2 splits each skill across the book's three cycles, so every card in
// STEP_GROUPS_A2 claims an explicit slice of sub-lessons (see
// parcoursDataA2.js). This checks that, for every unit, the slices cover the
// real sub-lesson ids exactly once — no typo'd id that can never be completed,
// no sub-lesson orphaned out of the unit total, no id counted twice.
//
// A typo here fails silently in the app: the card just never reaches 100%.
// Run this after adding a unit.
//
//   node scripts/check-parcours-a2.mjs

import { PARCOURS_UNITS_A2, getStepDefsForA2 } from "../src/data/parcoursDataA2.js";
import { getStepSubIds } from "../src/utils/parcoursSteps.js";

let ok = true;

for (const unit of PARCOURS_UNITS_A2) {
  const defs = getStepDefsForA2(unit.id);
  // Derived, not hand-listed: a hand-listed set silently skips any skill
  // added later, which is exactly the case this script exists to catch.
  const skills = [...new Set(defs.map(s => s.stepKey || s.id))];

  console.log(`\n── Unité ${unit.num} · ${unit.fr} (${unit.id}) ──`);
  let total = 0;

  // The DELF card scores under "ecouter" but isn't backed by an audio track —
  // it opens its own exam screen and owns a synthetic sub-lesson id instead.
  // Derived from the card's destination rather than its name so a rename
  // doesn't quietly turn this back into a false failure.
  const synthetic = new Set(
    defs.filter(s => s.view === "delf-a2" || s.section === "delf-a2")
        .flatMap(s => s.subIds || [])
  );

  for (const skill of skills) {
    const real = getStepSubIds(unit.id, skill);
    const used = defs
      .filter(s => (s.stepKey || s.id) === skill)
      .flatMap(s => s.subIds || []);

    const missing = real.filter(id => !used.includes(id));
    const unknown = used.filter(id => !real.includes(id) && !synthetic.has(id));
    const dupes   = used.filter((id, i) => used.indexOf(id) !== i);
    const bad     = missing.length || unknown.length || dupes.length;

    if (bad) ok = false;
    total += real.length;

    console.log(
      `${bad ? "✗" : "✓"} ${skill.padEnd(8)} real=${String(real.length).padStart(2)} used=${String(used.length).padStart(2)}` +
      (missing.length ? `  THIẾU: ${missing.join(", ")}` : "") +
      (unknown.length ? `  SAI ID: ${unknown.join(", ")}` : "") +
      (dupes.length   ? `  TRÙNG: ${dupes.join(", ")}`   : "") +
      // Surfaced, not hidden: a synthetic id is legitimate but shouldn't be
      // invisible, or a genuine typo could hide behind the exemption.
      (used.filter(id => synthetic.has(id)).length
        ? `  +DELF: ${used.filter(id => synthetic.has(id)).join(", ")}` : "")
    );
  }

  console.log(`   → ${total} sub-lessons · ${defs.length} thẻ`);
}

console.log(ok ? "\n✅ Phân chia khớp hoàn toàn" : "\n❌ Có sai lệch — sửa subIds trong parcoursDataA2.js");
process.exit(ok ? 0 : 1);
