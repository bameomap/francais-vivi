// Single source of truth for "sub-lessons" inside each Parcours step.
// Given a unit + step, returns the list of stable sub-lesson ids that live
// in that step for that unit. Used by:
//   • parcours.js  → to compute fractional step/unit progress
//   • activity panels → to render per-sub-lesson "Done / Làm lại" and to
//     mark the right sub-lesson done on completion.
//
// subId convention = the natural id already present in each data source
// (no new ids invented), so panels and the progress store always agree.

import { EDITO_VOCAB_UNITS }    from "../data/editoVocab.js";
import { EDITO_A1_PHONO }       from "../data/editoPhono.js";
import { EDITO_A1_VERB_UNITS }  from "../data/editoVerbs.js";
import { EDITO_GRAMMAR }        from "../data/editoGrammar.js";
import { EDITO_AUDIO }          from "../data/editoAudio.js";
import { EDITO_A1_UNITS }       from "../data/editoA1Units.js";
import editoA1ReadingComprehension from "../data/editoA1ReadingComprehension.js";

import { EDITO_VOCAB_A2_UNITS } from "../data/editoVocabA2.js";
import { EDITO_A2_PHONO }       from "../data/editoPhonoA2.js";
import { EDITO_GRAMMAR_A2 }     from "../data/editoGrammarA2.js";
import { EDITO_A2_UNITS }       from "../data/editoA2Units.js";
import editoA2ReadingComprehension from "../data/editoA2Reading.js";
import { EDITO_AUDIO_A2 }   from "../data/editoAudioA2.js";

// unitId is the parcours form "u0".."u10" (A1) or "b1".."b12" (A2).
const numOf = (unitId) => Number(String(unitId).replace(/^[ub]/, ""));
export const isA2Unit = (unitId) => String(unitId).startsWith("b");

// A2 keeps its own data sources; unlike A1 it has no `verbes` step yet, so
// that returns [] and never appears in an A2 unit's totals.
function getStepSubIdsA2(unitId, stepId) {
  const num = numOf(unitId);
  switch (stepId) {
    case "vocab": {
      const u = EDITO_VOCAB_A2_UNITS.find(x => x.id === unitId);
      return (u?.groups || []).map(g => g.id);
    }
    case "phono": {
      const u = EDITO_A2_PHONO.find(x => x.unitId === unitId);
      if (!u) return [];
      const ids = (u.sounds || []).map(s => s.id);
      if (u.quiz?.length) ids.push("quiz");
      return ids;
    }
    case "grammar": {
      const u = EDITO_GRAMMAR_A2.find(x => x.id === unitId);
      return (u?.points || []).map((_, i) => "p" + i);
    }
    case "lecture":
      return editoA2ReadingComprehension.filter(a => a.unit === num).map(a => a.id);
    case "ecouter":
      return (EDITO_AUDIO_A2[unitId] || []).map(t => t.id);
    case "ecrire": {
      const u = EDITO_A2_UNITS.find(x => x.unit === num);
      return (u?.writingPractice || []).map((_, i) => "w" + i);
    }
    case "parler": {
      const u = EDITO_A2_UNITS.find(x => x.unit === num);
      return (u?.speakingPractice || []).map((_, i) => "s" + i);
    }
    case "quiz":
      return ["quiz"];
    default:
      return [];
  }
}

// Returns string[] of sub-lesson ids for (unitId, stepId). Empty if none.
export function getStepSubIds(unitId, stepId) {
  try {
    if (isA2Unit(unitId)) return getStepSubIdsA2(unitId, stepId);
    const num = numOf(unitId);
    switch (stepId) {
      case "vocab": {
        const u = EDITO_VOCAB_UNITS.find(x => x.id === unitId);
        return (u?.groups || []).map(g => g.id);
      }
      case "phono": {
        const u = EDITO_A1_PHONO.find(x => x.unitId === unitId);
        if (!u) return [];
        const ids = (u.sounds || []).map(s => s.id);
        if (u.quiz?.length) ids.push("quiz");
        return ids;
      }
      case "verbes": {
        const u = EDITO_A1_VERB_UNITS.find(x => x.unitId === unitId);
        return (u?.tenses || []).map(t => t.id);
      }
      case "grammar": {
        const u = EDITO_GRAMMAR.find(x => x.id === "g" + num);
        return (u?.points || []).map((_, i) => "p" + i);
      }
      case "lecture":
        return editoA1ReadingComprehension.filter(a => a.unit === num).map(a => a.id);
      case "ecouter":
        return (EDITO_AUDIO[unitId] || []).map(t => t.id);
      case "ecrire": {
        const u = EDITO_A1_UNITS.find(x => x.unit === num);
        return (u?.writingPractice || []).map((_, i) => "w" + i);
      }
      case "parler": {
        const u = EDITO_A1_UNITS.find(x => x.unit === num);
        return (u?.speakingPractice || []).map((_, i) => "s" + i);
      }
      case "quiz":
        return ["quiz"];
      default:
        return [];
    }
  } catch {
    return [];
  }
}

export function getStepTotal(unitId, stepId) {
  return getStepSubIds(unitId, stepId).length;
}
