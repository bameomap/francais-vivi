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

/**
 * 4-button FSRS-style rating:
 *   0 = Lại  (Again) — due in 10 min
 *   1 = Khó  (Hard)  — interval * 1.2, ease −0.15
 *   2 = Tốt  (Good)  — normal SM-2 increment
 *   3 = Dễ   (Easy)  — interval * ease * 1.3, ease +0.15
 */
export function updateSRSCardRating(fr, rating) {
  const data = getSRSData();
  if (!data[fr]) return;
  data[fr] = calculateNextRating(data[fr], rating);
  saveSRSData(data);
}

/** Label for interval shown under each button */
export function ratingIntervalLabel(card, rating) {
  const { interval = 0, easeFactor = 2.5, repetitions = 0 } = card || {};
  if (rating === 0) return "10 phút";
  if (rating === 1) {
    const days = Math.max(1, Math.round(interval * 1.2)) || 1;
    return days <= 1 ? "1 ngày" : `${days} ngày`;
  }
  if (rating === 2) {
    let days;
    if (repetitions === 0)      days = 1;
    else if (repetitions === 1) days = 3;
    else                        days = Math.round(interval * easeFactor);
    return days <= 1 ? "1 ngày" : days < 7 ? `${days} ngày` : `${Math.round(days/7)} tuần`;
  }
  // easy
  const days = Math.max(1, Math.round(interval * easeFactor * 1.3));
  return days < 7 ? `${days} ngày` : `${Math.round(days/7)} tuần`;
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

/**
 * Returns a Set of French words considered "mastered":
 * SRS repetitions >= 2 AND interval >= 3 days
 * Used to exclude these from default quiz generation.
 */
export function getMasteredSet() {
  const data = getSRSData();
  const mastered = new Set();
  for (const card of Object.values(data)) {
    if (card.repetitions >= 2 && card.interval >= 3) {
      mastered.add(card.fr);
    }
  }
  return mastered;
}

// ── SM-2 core ───────────────────────────────────────────────
function calculateNext(card, correct) {
  let { interval, easeFactor, repetitions } = card;

  if (!correct) {
    interval    = 1;
    repetitions = 0;
    easeFactor  = Math.max(1.3, easeFactor - 0.2);
  } else {
    repetitions += 1;
    if      (repetitions === 1) interval = 1;
    else if (repetitions === 2) interval = 3;
    else                        interval = Math.round(interval * easeFactor);

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

// ── 4-button rating core ─────────────────────────────────────
function calculateNextRating(card, rating) {
  let { interval = 0, easeFactor = 2.5, repetitions = 0 } = card;
  let dueMs;

  if (rating === 0) {
    // Lại — due in 10 minutes, no interval change
    interval    = 0;
    repetitions = 0;
    easeFactor  = Math.max(1.3, easeFactor - 0.2);
    dueMs       = Date.now() + 10 * 60 * 1000;
  } else if (rating === 1) {
    // Khó — small bump
    interval    = Math.max(1, Math.round(interval * 1.2));
    easeFactor  = Math.max(1.3, easeFactor - 0.15);
    repetitions = Math.max(1, repetitions);
    dueMs       = Date.now() + interval * 86400000;
  } else if (rating === 2) {
    // Tốt — standard SM-2
    repetitions += 1;
    if      (repetitions === 1) interval = 1;
    else if (repetitions === 2) interval = 3;
    else                        interval = Math.round(interval * easeFactor);
    dueMs = Date.now() + interval * 86400000;
  } else {
    // Dễ — big jump
    repetitions += 1;
    if      (repetitions === 1) interval = 3;
    else if (repetitions === 2) interval = 7;
    else                        interval = Math.round(interval * easeFactor * 1.3);
    easeFactor = Math.min(3.0, easeFactor + 0.15);
    dueMs      = Date.now() + interval * 86400000;
  }

  return { ...card, interval, easeFactor, repetitions, dueDate: dueMs, lastReviewed: Date.now() };
}
