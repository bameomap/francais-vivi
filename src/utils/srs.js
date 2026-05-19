/**
 * Spaced Repetition System — SM-2 algorithm (simplified)
 *
 * Each card stores:
 *  - fr, vi       : the word pair
 *  - interval     : days until next review
 *  - dueDate      : timestamp when card is due
 *  - easeFactor   : difficulty multiplier (min 1.3, starts 2.5)
 *  - repetitions  : consecutive correct reviews
 *  - lastReviewed : timestamp of last review
 */

const SRS_KEY = "srs_data";

export function getSRSData() {
  try { return JSON.parse(localStorage.getItem(SRS_KEY) || "{}"); }
  catch { return {}; }
}

function saveSRSData(data) {
  try { localStorage.setItem(SRS_KEY, JSON.stringify(data)); }
  catch {}
}

/** Add a word to the deck (only if not already there) */
export function addWordToSRS(fr, vi) {
  const data = getSRSData();
  if (data[fr]) return false; // already exists
  data[fr] = {
    fr, vi,
    interval: 0,
    dueDate: Date.now(),   // due immediately (new card)
    easeFactor: 2.5,
    repetitions: 0,
    lastReviewed: null,
  };
  saveSRSData(data);
  return true;
}

/** Add multiple words at once, returns count of newly added */
export function addWordsToSRS(words) {
  const data = getSRSData();
  let added = 0;
  for (const w of words) {
    if (!data[w.fr]) {
      data[w.fr] = { fr:w.fr, vi:w.vi||"", interval:0, dueDate:Date.now(), easeFactor:2.5, repetitions:0, lastReviewed:null };
      added++;
    }
  }
  saveSRSData(data);
  return added;
}

/** Update a card after a review.
 *  correct = true → schedule forward
 *  correct = false → reset to 1 day
 */
export function updateSRSCard(fr, correct) {
  const data = getSRSData();
  if (!data[fr]) return;
  data[fr] = calculateNext(data[fr], correct);
  saveSRSData(data);
}

/** Return cards that are due now (dueDate <= now) */
export function getDueCards() {
  const data = getSRSData();
  const now = Date.now();
  return Object.values(data).filter(c => c.dueDate <= now);
}

/** All cards in deck */
export function getAllCards() {
  return Object.values(getSRSData());
}

/** Stats summary */
export function getSRSStats() {
  const data = getSRSData();
  const cards = Object.values(data);
  const now = Date.now();
  const today = now + 24 * 3600 * 1000;
  const week  = now + 7  * 24 * 3600 * 1000;
  return {
    total:   cards.length,
    due:     cards.filter(c => c.dueDate <= now).length,
    today:   cards.filter(c => c.dueDate <= today).length,
    week:    cards.filter(c => c.dueDate <= week).length,
    new:     cards.filter(c => c.repetitions === 0).length,
    mastered:cards.filter(c => c.interval >= 21).length,
  };
}

/** Remove a word from the deck */
export function removeFromSRS(fr) {
  const data = getSRSData();
  delete data[fr];
  saveSRSData(data);
}

/** Reset entire deck */
export function resetSRS() {
  localStorage.removeItem(SRS_KEY);
}

// ── SM-2 core ───────────────────────────────────────────────
function calculateNext(card, correct) {
  let { interval, easeFactor, repetitions } = card;

  if (!correct) {
    // Forgot → reset
    interval    = 1;
    repetitions = 0;
    easeFactor  = Math.max(1.3, easeFactor - 0.2);
  } else {
    repetitions += 1;
    if      (repetitions === 1) interval = 1;
    else if (repetitions === 2) interval = 3;
    else                        interval = Math.round(interval * easeFactor);

    // quality 4 = "correct but with effort"
    const q = 4;
    easeFactor = Math.max(1.3, easeFactor + 0.1 - (5-q)*(0.08+(5-q)*0.02));
  }

  return {
    ...card,
    interval,
    easeFactor,
    repetitions,
    dueDate:      Date.now() + interval * 86400000,
    lastReviewed: Date.now(),
  };
}
