// Fails if src/data/stepSubIds.generated.js has drifted from the course data.
//
// The manifest is what progress calculation reads at runtime, so a stale one
// shows wrong completion totals — silently, with nothing in the UI to hint at
// it. Editing any vocab/grammar/phono/verb/audio/reading data without running
// `npm run gen:subids` is the way that happens.
//
//   npm run check:subids
//
// Exits non-zero on drift and prints exactly which (unit, step) changed.

import { buildManifest } from "./gen-step-subids.mjs";
import { STEP_SUB_IDS as committed } from "../src/data/stepSubIds.generated.js";

const fresh = buildManifest();
const unitIds = [...new Set([...Object.keys(fresh), ...Object.keys(committed)])];

const drift = [];
for (const unitId of unitIds) {
  const a = committed[unitId] || {};
  const b = fresh[unitId] || {};
  for (const stepId of [...new Set([...Object.keys(a), ...Object.keys(b)])]) {
    const was = JSON.stringify(a[stepId] ?? []);
    const now = JSON.stringify(b[stepId] ?? []);
    if (was !== now) drift.push({ unitId, stepId, was, now });
  }
}

const totalIds = Object.values(fresh)
  .reduce((n, steps) => n + Object.values(steps).reduce((m, a) => m + a.length, 0), 0);

if (drift.length) {
  console.error(`❌ Manifest lệch với dữ liệu nguồn — ${drift.length} (unit, step) khác nhau:\n`);
  for (const d of drift) {
    console.error(`   ${d.unitId}.${d.stepId}`);
    console.error(`     committed: ${d.was}`);
    console.error(`     thực tế:   ${d.now}`);
  }
  console.error(`\n   Chạy \`npm run gen:subids\` rồi commit lại file đã sinh.`);
  process.exit(1);
}

console.log(`✅ Manifest khớp dữ liệu nguồn — ${unitIds.length} units, ${totalIds} sub-lesson ids`);
