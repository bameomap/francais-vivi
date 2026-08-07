// Deep-link focus for the A2 parcours.
//
// An A2 step owns only a slice of a skill — "Đọc B" is one of five readings,
// "Nghe A + C" is two of four tracks (see parcoursDataA2.js). Without this the
// step would open its panel on the whole unit and the learner would have to
// find the right item themselves, which defeats the point of splitting.
//
// ParcoursPanel stashes the step's subIds here; the target panel picks them up
// once and narrows itself to those items. A1 steps own a whole skill, so they
// stash nothing and every panel behaves exactly as before.

const KEY = "parcours_sub_ids";

export function setParcoursFocus(subIds, stepId = null) {
  // A step with no subIds still has an identity worth carrying. Unité 0 is the
  // one A1 unit left on the flat STEP_GROUPS: its cards own whole skills and
  // so pass no subIds, and while nothing was stored the vocab panel never
  // learned which step opened it — so u0's cahier exercises could not appear
  // at all, however correctly they were keyed.
  if (subIds?.length || stepId) {
    localStorage.setItem(KEY, JSON.stringify({ ids: subIds || [], step: stepId }));
  } else {
    localStorage.removeItem(KEY);
  }
}

// Read once and clear. Returns { ids: string[], step: string|null } or null.
// Cleared on read so that going back to the panel later, or reaching it from
// anywhere other than the parcours, shows the full list again.
//
// `step` is the card's own id ("c1_vocab"), which panels need when the same
// skill is opened by several cards and each has its own material — the vocab
// panel uses it to pick the right cahier page.
export function takeParcoursFocus() {
  try {
    const raw = localStorage.getItem(KEY);
    localStorage.removeItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const ids  = Array.isArray(parsed) ? parsed : parsed?.ids;   // tolerate the older array form
    const step = Array.isArray(parsed) ? null : (parsed?.step || null);

    // `ids` is null — never [] — when there is nothing to narrow to. Every
    // panel reads it as `focusIds ? filter(...) : showEverything`, so an empty
    // array would narrow the view down to nothing instead of leaving it whole.
    const narrowed = Array.isArray(ids) && ids.length ? ids : null;
    if (!narrowed && !step) return null;
    return { ids: narrowed, step };
  } catch {
    localStorage.removeItem(KEY);
    return null;
  }
}
