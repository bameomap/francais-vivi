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

import { PARCOURS_UNITS_A2, STEP_DEFS_A2 } from "../src/data/parcoursDataA2.js";
import { getStepSubIds } from "../src/utils/parcoursSteps.js";

const SKILLS = ["vocab", "phono", "grammar", "lecture", "ecouter", "ecrire", "parler", "quiz"];

let ok = true;

for (const unit of PARCOURS_UNITS_A2) {
  console.log(`\n── Unité ${unit.num} · ${unit.fr} (${unit.id}) ──`);
  let total = 0;

  for (const skill of SKILLS) {
    const real = getStepSubIds(unit.id, skill);
    const used = STEP_DEFS_A2
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

  console.log(`   → ${total} sub-lessons · ${STEP_DEFS_A2.length} thẻ`);
}

console.log(ok ? "\n✅ Phân chia khớp hoàn toàn" : "\n❌ Có sai lệch — sửa subIds trong parcoursDataA2.js");
process.exit(ok ? 0 : 1);
