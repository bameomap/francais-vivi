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

export function setParcoursFocus(subIds) {
  if (subIds?.length) localStorage.setItem(KEY, JSON.stringify(subIds));
  else localStorage.removeItem(KEY);
}

// Read once and clear. Returns string[] or null.
// Cleared on read so that going back to the panel later, or reaching it from
// anywhere other than the parcours, shows the full list again.
export function takeParcoursFocus() {
  try {
    const raw = localStorage.getItem(KEY);
    localStorage.removeItem(KEY);
    const ids = raw ? JSON.parse(raw) : null;
    return Array.isArray(ids) && ids.length ? ids : null;
  } catch {
    localStorage.removeItem(KEY);
    return null;
  }
}
