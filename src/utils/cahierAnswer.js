// Answer comparison for cahier exercises, shared by both levels.
//
// These used to live at the bottom of editoCahierA2.js, which meant the shared
// CahierExercises renderer imported a 441 KB A2 data module to get at two
// string helpers — and did so even when rendering an A1 exercise.

// Answers are compared loosely: case, accents on the apostrophe, doubled
// spaces and trailing punctuation shouldn't cost the learner a point.
export function normalizeAnswer(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[''’]/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.!?;:]+$/g, "")
    .trim();
}

export function isAnswerCorrect(given, expected) {
  return normalizeAnswer(given) === normalizeAnswer(expected);
}
