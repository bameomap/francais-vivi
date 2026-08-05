// Validates CAHIER_A1 / CAHIER_A2 against the things that actually consume them.
//
//   npm run check:cahier
//
// Two classes of bug, both of which have already shipped and cost real time:
//
//   Silent — the exercises simply never appear, with nothing in the UI or the
//   console to say why. A `vocab` block keyed by a vocab-group id instead of
//   the Parcours *step* id did this to Unité 1; a `grammar` key of "p5" on a
//   unit with 5 points (p0..p4) does the same.
//
//   Crash — CahierExercises.jsx reads ex.pairs, it.tokens and it.options
//   without guards, so a `match` with no pairs, an `order` item with no
//   tokens, or a `choice` item with no options throws on expand. An `order`
//   item written as {q, answer} instead of {tokens, answer} did exactly this.
//
// The shape rules below are read off CahierExercises.jsx — if that renderer
// changes, update them here.

import { CAHIER_A1 } from "../src/data/editoCahierA1.js";
import { CAHIER_A2 } from "../src/data/editoCahierA2.js";
import { EDITO_GRAMMAR } from "../src/data/editoGrammar.js";
import { EDITO_GRAMMAR_A2 } from "../src/data/editoGrammarA2.js";
import { PARCOURS_UNITS, getStepGroupsFor } from "../src/data/parcoursData.js";
import { PARCOURS_UNITS_A2, getStepGroupsForA2 } from "../src/data/parcoursDataA2.js";
// The same comparison the renderer grades with — checking `answer` against
// `options` any other way produces false positives, since grading tolerates
// case, apostrophe variants and trailing punctuation.
import { isAnswerCorrect } from "../src/utils/cahierAnswer.js";

const KNOWN_TYPES = new Set(["fill", "choice", "order", "match", "truefalse", "transform"]);

const errors = [];
const warnings = [];
const err  = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

// Ids of the Parcours steps that render vocab for a unit. EditoVocabPanel looks
// up cahier[unit].vocab[step.id], so these — not the vocab-group ids — are the
// only valid keys.
function vocabStepIds(unitId, isA2) {
  const groups = isA2 ? getStepGroupsForA2(unitId) : getStepGroupsFor(unitId);
  return groups.flatMap(g => g.steps)
    .filter(s => (s.stepKey || s.id) === "vocab")
    .map(s => s.id);
}

function grammarPointCount(unitId, isA2) {
  if (isA2) return EDITO_GRAMMAR_A2.find(g => g.id === unitId)?.points?.length ?? 0;
  const num = String(unitId).replace(/^u/, "");
  return EDITO_GRAMMAR.find(g => g.id === "g" + num)?.points?.length ?? 0;
}

function checkExercise(ex, where) {
  if (!ex || typeof ex !== "object") return err(where, "không phải object");
  if (!KNOWN_TYPES.has(ex.type)) {
    return err(where, `type không hợp lệ: ${JSON.stringify(ex.type)} (hợp lệ: ${[...KNOWN_TYPES].join(", ")})`);
  }

  // `match` stores its data in pairs; every other type uses items.
  if (ex.type === "match") {
    if (!Array.isArray(ex.pairs) || !ex.pairs.length) {
      return err(where, "type 'match' nhưng thiếu mảng `pairs` → CahierExercises sẽ crash");
    }
    ex.pairs.forEach((p, i) => {
      if (p?.r === undefined) err(`${where} pairs[${i}]`, "thiếu `r` (đáp án) → không chấm được");
      if (p?.l === undefined) warn(`${where} pairs[${i}]`, "thiếu `l` (vế trái hiển thị)");
    });
    return;
  }

  if (!Array.isArray(ex.items) || !ex.items.length) {
    return err(where, `type '${ex.type}' nhưng thiếu mảng \`items\``);
  }

  ex.items.forEach((it, i) => {
    const at = `${where} items[${i}]`;
    if (it?.example) return;              // worked example — shown solved, not graded

    switch (ex.type) {
      case "order":
        if (!Array.isArray(it.tokens) || !it.tokens.length) {
          err(at, "type 'order' cần `tokens` là mảng → thiếu sẽ crash khi mở bài");
        }
        if (it.answer === undefined) {
          err(at, "thiếu `answer`");
        } else if (!Array.isArray(it.answer) && typeof it.answer !== "string") {
          err(at, "`answer` của 'order' phải là mảng token (hoặc chuỗi)");
        }
        break;

      case "choice":
        if (!Array.isArray(it.options) || !it.options.length) {
          err(at, "type 'choice' cần `options` là mảng → thiếu sẽ crash khi mở bài");
        } else if (it.answer !== undefined && !it.options.some(o => isAnswerCorrect(o, it.answer))) {
          err(at, `không option nào khớp \`answer\` (${JSON.stringify(it.answer)}) → luôn chấm sai. options: ${JSON.stringify(it.options)}`);
        }
        if (it.answer === undefined) err(at, "thiếu `answer`");
        break;

      case "truefalse":
        // The renderer does `it.answer ? "Vrai" : "Faux"`, so the string "Faux"
        // is truthy and would silently grade as Vrai.
        if (typeof it.answer !== "boolean") {
          err(at, `'truefalse' cần \`answer\` kiểu boolean, đang là ${JSON.stringify(it.answer)} → chấm sai âm thầm`);
        }
        break;

      default:                             // fill, transform
        if (it.answer === undefined) err(at, "thiếu `answer`");
    }
  });
}

function checkAudio(ex, where, maxPiste) {
  if (ex.audioSrc === undefined) return;
  if (typeof ex.audioSrc !== "string" || !ex.audioSrc.endsWith(".mp3")) {
    return err(where, `audioSrc không phải URL .mp3: ${JSON.stringify(ex.audioSrc)}`);
  }
  const n = Number(ex.audioSrc.match(/\/(\d+)_/)?.[1]);
  if (!Number.isInteger(n) || n < 1) {
    err(where, `số piste không đọc được từ audioSrc: ${ex.audioSrc}`);
  } else if (maxPiste && n > maxPiste) {
    err(where, `piste ${n} vượt quá dải hợp lệ (1–${maxPiste})`);
  }
}

function checkLevel(label, cahier, units, isA2, maxPiste) {
  const unitIds = new Set(units.map(u => u.id));
  let exercises = 0;

  for (const [unitId, unit] of Object.entries(cahier)) {
    const U = `${label}.${unitId}`;
    if (!unitIds.has(unitId)) {
      err(U, `unit id không có trong ${isA2 ? "PARCOURS_UNITS_A2" : "PARCOURS_UNITS"}`);
      continue;
    }

    // ── grammar: keyed pN by index into that unit's grammar points ──
    const points = grammarPointCount(unitId, isA2);
    for (const [key, list] of Object.entries(unit.grammar || {})) {
      const at = `${U}.grammar.${key}`;
      const m = /^p(\d+)$/.exec(key);
      if (!m) {
        err(at, "key ngữ pháp phải có dạng p0, p1, …");
      } else if (Number(m[1]) >= points) {
        err(at, `unit chỉ có ${points} điểm ngữ pháp (p0–p${points - 1}) → bài tập này không bao giờ hiện`);
      }
      if (!Array.isArray(list)) { err(at, "phải là mảng bài tập"); continue; }
      list.forEach((ex, i) => { exercises++; checkExercise(ex, `${at}[${i}]`); checkAudio(ex, `${at}[${i}]`, maxPiste); });
    }

    // ── vocab: keyed by Parcours step id, not vocab-group id ──
    const validSteps = vocabStepIds(unitId, isA2);
    for (const [key, list] of Object.entries(unit.vocab || {})) {
      const at = `${U}.vocab.${key}`;
      if (!validSteps.includes(key)) {
        err(at, `không phải step id của unit này → bài tập không bao giờ hiện. Hợp lệ: ${validSteps.join(", ") || "(unit không có bước vocab)"}`);
      }
      if (!Array.isArray(list)) { err(at, "phải là mảng bài tập"); continue; }
      list.forEach((ex, i) => { exercises++; checkExercise(ex, `${at}[${i}]`); checkAudio(ex, `${at}[${i}]`, maxPiste); });
    }

    // ── phono / bilan: flat arrays, looked up by unit id alone ──
    for (const key of ["phono", "bilan"]) {
      if (unit[key] === undefined) continue;
      const at = `${U}.${key}`;
      if (!Array.isArray(unit[key])) { err(at, "phải là mảng bài tập"); continue; }
      unit[key].forEach((ex, i) => { exercises++; checkExercise(ex, `${at}[${i}]`); checkAudio(ex, `${at}[${i}]`, maxPiste); });
    }
  }

  return { units: Object.keys(cahier).length, exercises };
}

const a1 = checkLevel("A1", CAHIER_A1, PARCOURS_UNITS, false, 111);
const a2 = checkLevel("A2", CAHIER_A2, PARCOURS_UNITS_A2, true, null);

console.log(`A1 · ${a1.units} unités · ${a1.exercises} bài tập`);
console.log(`A2 · ${a2.units} unités · ${a2.exercises} bài tập`);

if (warnings.length) {
  console.log(`\n⚠️  ${warnings.length} cảnh báo:`);
  warnings.forEach(w => console.log("   " + w));
}

if (errors.length) {
  console.error(`\n❌ ${errors.length} lỗi:`);
  errors.forEach(e => console.error("   " + e));
  process.exit(1);
}

console.log("\n✅ Cahier hợp lệ — key khớp Parcours/ngữ pháp, shape đúng với CahierExercises");
