// Generates src/data/stepSubIds.generated.js — the sub-lesson id manifest that
// parcoursSteps.js reads at runtime.
//
// Why this exists: progress calculation only ever needs the *ids* of the
// sub-lessons in each (unit, step), never their content. Deriving them at
// runtime meant importing every vocab/grammar/phono/verb/audio/reading corpus
// for both levels — about a megabyte of French text — into the eager bundle,
// just to call .map(x => x.id) on it. The manifest is a few KB instead.
//
//   npm run gen:subids     regenerate after editing any course data
//   npm run check:subids   fail if the committed manifest has drifted
//
// The extraction rules below must mirror parcoursSteps.js exactly. They are
// verified against it by scripts/check-step-subids.mjs, which recomputes the
// ids from the source data and diffs them against the committed file.

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { EDITO_VOCAB_UNITS } from "../src/data/editoVocab.js";
import { EDITO_A1_PHONO } from "../src/data/editoPhono.js";
import { EDITO_A1_VERB_UNITS } from "../src/data/editoVerbs.js";
import { EDITO_GRAMMAR } from "../src/data/editoGrammar.js";
import { EDITO_AUDIO } from "../src/data/editoAudio.js";
import { EDITO_A1_UNITS } from "../src/data/editoA1Units.js";
import editoA1ReadingComprehension from "../src/data/editoA1ReadingComprehension.js";

import { EDITO_VOCAB_A2_UNITS } from "../src/data/editoVocabA2.js";
import { EDITO_A2_PHONO } from "../src/data/editoPhonoA2.js";
import { EDITO_GRAMMAR_A2 } from "../src/data/editoGrammarA2.js";
import { EDITO_A2_UNITS } from "../src/data/editoA2Units.js";
import editoA2ReadingComprehension from "../src/data/editoA2Reading.js";
import { EDITO_AUDIO_A2 } from "../src/data/editoAudioA2.js";
import { EDITO_A2_VERB_UNITS } from "../src/data/editoVerbsA2.js";

import { PARCOURS_UNITS } from "../src/data/parcoursData.js";
import { PARCOURS_UNITS_A2 } from "../src/data/parcoursDataA2.js";

const STEPS = [
  "vocab", "phono", "verbes", "grammar",
  "lecture", "ecouter", "ecrire", "parler", "quiz",
];

const numOf = (unitId) => Number(String(unitId).replace(/^[ub]/, ""));
const isA2 = (unitId) => String(unitId).startsWith("b");

// Mirrors getStepSubIdsA2() in parcoursSteps.js.
function subIdsA2(unitId, stepId) {
  const num = numOf(unitId);
  switch (stepId) {
    case "vocab":
      return (EDITO_VOCAB_A2_UNITS.find(x => x.id === unitId)?.groups || []).map(g => g.id);
    case "phono": {
      const u = EDITO_A2_PHONO.find(x => x.unitId === unitId);
      if (!u) return [];
      const ids = (u.sounds || []).map(s => s.id);
      if (u.quiz?.length) ids.push("quiz");
      return ids;
    }
    case "grammar":
      return (EDITO_GRAMMAR_A2.find(x => x.id === unitId)?.points || []).map((_, i) => "p" + i);
    case "lecture":
      return editoA2ReadingComprehension.filter(a => a.unit === num).map(a => a.id);
    case "ecouter":
      return (EDITO_AUDIO_A2[unitId] || []).map(t => t.id);
    case "ecrire":
      return (EDITO_A2_UNITS.find(x => x.unit === num)?.writingPractice || []).map((_, i) => "w" + i);
    case "parler":
      return (EDITO_A2_UNITS.find(x => x.unit === num)?.speakingPractice || []).map((_, i) => "s" + i);
    case "verbes":
      return (EDITO_A2_VERB_UNITS.find(x => x.unitId === unitId)?.tenses || []).map(t => t.id);
    case "quiz":
      return ["quiz"];
    default:
      return [];
  }
}

// Mirrors the A1 branch of getStepSubIds() in parcoursSteps.js.
function subIdsA1(unitId, stepId) {
  const num = numOf(unitId);
  switch (stepId) {
    case "vocab":
      return (EDITO_VOCAB_UNITS.find(x => x.id === unitId)?.groups || []).map(g => g.id);
    case "phono": {
      const u = EDITO_A1_PHONO.find(x => x.unitId === unitId);
      if (!u) return [];
      const ids = (u.sounds || []).map(s => s.id);
      if (u.quiz?.length) ids.push("quiz");
      return ids;
    }
    case "verbes":
      return (EDITO_A1_VERB_UNITS.find(x => x.unitId === unitId)?.tenses || []).map(t => t.id);
    case "grammar":
      return (EDITO_GRAMMAR.find(x => x.id === "g" + num)?.points || []).map((_, i) => "p" + i);
    case "lecture":
      return editoA1ReadingComprehension.filter(a => a.unit === num).map(a => a.id);
    case "ecouter":
      return (EDITO_AUDIO[unitId] || []).map(t => t.id);
    case "ecrire":
      return (EDITO_A1_UNITS.find(x => x.unit === num)?.writingPractice || []).map((_, i) => "w" + i);
    case "parler":
      return (EDITO_A1_UNITS.find(x => x.unit === num)?.speakingPractice || []).map((_, i) => "s" + i);
    case "quiz":
      return ["quiz"];
    default:
      return [];
  }
}

export function buildManifest() {
  const unitIds = [
    ...PARCOURS_UNITS.map(u => u.id),
    ...PARCOURS_UNITS_A2.map(u => u.id),
  ];
  const manifest = {};
  for (const unitId of unitIds) {
    const steps = {};
    for (const stepId of STEPS) {
      const ids = isA2(unitId) ? subIdsA2(unitId, stepId) : subIdsA1(unitId, stepId);
      // Omit empty steps — parcoursSteps.js already returns [] for a miss, so
      // storing them would only bloat the manifest.
      if (ids.length) steps[stepId] = ids;
    }
    manifest[unitId] = steps;
  }
  return manifest;
}

export function renderManifest(manifest) {
  const units = Object.entries(manifest).map(([unitId, steps]) => {
    const body = Object.entries(steps)
      .map(([stepId, ids]) => `    ${stepId}: ${JSON.stringify(ids)},`)
      .join("\n");
    return `  ${unitId}: {\n${body}\n  },`;
  }).join("\n");

  return `// GENERATED FILE — do not edit by hand.
// Regenerate with:  npm run gen:subids
// Verify freshness: npm run check:subids
//
// Sub-lesson ids per (unit, step), extracted from the course data at build
// time so the runtime progress calculation doesn't have to import the whole
// corpus just to read ids. See scripts/gen-step-subids.mjs.

export const STEP_SUB_IDS = {
${units}
};
`;
}

// Only write when run directly, so check-step-subids.mjs can import the
// builder without clobbering the committed file.
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const out = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../src/data/stepSubIds.generated.js",
  );
  const manifest = buildManifest();
  writeFileSync(out, renderManifest(manifest));
  const units = Object.keys(manifest).length;
  const ids = Object.values(manifest)
    .reduce((n, steps) => n + Object.values(steps).reduce((m, a) => m + a.length, 0), 0);
  console.log(`✅ ${out.replace(process.cwd() + "/", "")} — ${units} units, ${ids} sub-lesson ids`);
}
