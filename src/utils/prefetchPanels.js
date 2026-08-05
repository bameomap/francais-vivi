// Warms the lazy panel chunks once the app is idle.
//
// Every panel is code-split, which keeps the first load small but means a
// chunk is only fetched — and only cached by the service worker — the first
// time that screen is opened. Offline, a screen never visited is a failed
// dynamic import and a broken view. Measured on a production build with the
// server stopped: the app booted fine, but only 3 of 22 chunks were cached
// and fetching an unvisited panel failed outright.
//
// Pulling them during idle time costs the learner nothing on wifi and turns
// "offline works for what you already opened" into "offline works".
//
// Ordered by how likely the screen is to be wanted next, so a learner who
// goes offline mid-warm still has the useful half.
const PANELS = [
  () => import("../components/ParcoursPanel.jsx"),
  () => import("../components/EditoVocabPanel.jsx"),
  () => import("../components/GrammarPanel.jsx"),
  () => import("../components/LecturePanel.jsx"),
  () => import("../components/EcouterPanel.jsx"),
  () => import("../components/ReferenceHub.jsx"),
  () => import("../components/UnitQuizPanel.jsx"),
  () => import("../components/EditoGrammarPanel.jsx"),
  () => import("../components/ProductionOralePanel.jsx"),
  () => import("../components/WritingPanel.jsx"),
  () => import("../components/FichePanel.jsx"),
  () => import("../components/RevisionPanel.jsx"),
  () => import("../components/SRSPanel.jsx"),
  () => import("../components/DefiPanel.jsx"),
  () => import("../components/SentenceBuilder.jsx"),
  () => import("../components/PrononciationPanel.jsx"),
  () => import("../components/StatsPanel.jsx"),
  () => import("../components/ProfilPanel.jsx"),
  () => import("../components/GlobalSearch.jsx"),
  () => import("../components/LevelSelectPanel.jsx"),
  () => import("../components/DelfPanel.jsx"),
  () => import("../components/DelfA2Panel.jsx"),
];

const onIdle = (fn) =>
  typeof requestIdleCallback === "function"
    ? requestIdleCallback(fn, { timeout: 5000 })
    : setTimeout(fn, 1500);

let started = false;

/**
 * Fetch the lazy panel chunks in the background, one at a time so the warm
 * never competes with a screen the learner actually opened. Safe to call more
 * than once; only the first call does anything.
 */
export function prefetchPanels() {
  if (started) return;
  started = true;

  // Nothing to warm if we're already offline, and on a metered or 2G
  // connection the cost isn't worth paying uninvited.
  const conn = navigator.connection;
  if (navigator.onLine === false) return;
  if (conn?.saveData) return;
  if (conn?.effectiveType && /(^|-)2g$/.test(conn.effectiveType)) return;

  let i = 0;
  const next = () => {
    if (i >= PANELS.length) return;
    const load = PANELS[i++];
    // A failed warm is not an error the learner should ever see: they haven't
    // asked for this screen yet, and React.lazy will retry when they do.
    load().catch(() => {}).then(() => onIdle(next));
  };
  onIdle(next);
}
