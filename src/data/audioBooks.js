// Every book's listening tracks, in one shape, so one screen can list them all.
//
// Three books have audio today and a fourth (« 100 % réussite A2 ») is coming,
// so this is a registry rather than a page per book: adding a book means adding
// an entry here, and the screen doesn't change.
//
// Nothing is duplicated. Each book's tracks are derived from the data the app
// already holds — the DELF index, the Édito listening sets, the cahier
// exercises — so a track can't drift out of step with the exercise built on it.
//
// All of it is the publishers' and none of it is in this repo, which is public:
// every book streams from the same PRIVATE Blob store through /api/audio.
// See scripts/upload-audio.mjs.
//
// Every track the publishers shipped is in the store, not just the ones the app
// built exercises on. The exercise data still supplies the title and the page
// where it has them; everything else is listed by number under the unit it
// falls in, because the audio runs in book order and a track between two known
// anchors belongs to the earlier one.


import { PISTES } from "./delfA1Pistes.js";
import { EDITO_AUDIO } from "./editoAudio.js";
import { EDITO_AUDIO_A2 } from "./editoAudioA2.js";
import { CAHIER_A1 } from "./editoCahierA1.js";
import { CAHIER_A2 } from "./editoCahierA2.js";
import { EDITO_A1_UNITS } from "./editoA1Units.js";
import { EDITO_A2_UNITS } from "./editoA2Units.js";
import { EDITO_PISTES } from "./editoPistes.js";

// A track is { piste, label, sub, page, src, group } — group is what the list
// prints as a heading, and is shared by reference so rows can be compared with
// !== to know when to start a new one.
const trackNumOf = src => Number(new URLSearchParams(String(src).split("?")[1]).get("p"));

// ── Édito ────────────────────────────────────────────────────────
// Two shapes of source data, one output. The Livre set is keyed by unit and
// each entry already carries a section, a page and a title. The cahier's audio
// hangs off individual exercises, nested several levels down and often reused
// across exercises on one page, so it is collected by walking the unit.

function livreKnown(set, units, unitLabel) {
  const known = new Map();
  for (const [key, entries] of Object.entries(set)) {
    const n = Number(key.slice(1));
    const unit = units.find(u => u.unit === n);
    for (const e of entries) {
      known.set(e.trackNum, {
        label: e.title,
        sub: e.section ? `Section ${e.section}` : "",
        page: e.page,
        unit: n,
        unitTitle: unit?.title ?? "",
      });
    }
  }
  return known;
}

function cahierKnown(set, units) {
  const known = new Map();
  for (const [key, unitData] of Object.entries(set)) {
    const n = Number(key.slice(1));
    const unit = units.find(u => u.unit === n);
    const seen = new Map();

    const walk = node => {
      if (!node || typeof node !== "object") return;
      if (Array.isArray(node)) { node.forEach(walk); return; }
      if (node.audioSrc) {
        const piste = trackNumOf(node.audioSrc);
        const prev = seen.get(piste);
        if (prev) {
          // Same track, another exercise on it — keep the page, add the number.
          if (node.num && !prev.nums.includes(node.num)) prev.nums.push(node.num);
        } else {
          seen.set(piste, { page: node.page, nums: [node.num].filter(Boolean) });
        }
      }
      Object.values(node).forEach(walk);
    };
    walk(unitData);

    for (const [piste, t] of seen) {
      known.set(piste, {
        label: t.nums.length ? `Exercice ${t.nums.sort((a, b) => a - b).join(", ")}` : "Exercice",
        sub: "",
        page: t.page,
        unit: n,
        unitTitle: unit?.title ?? "",
      });
    }
  }
  return known;
}

// Every track in the store, in order, each under the unit it falls in. A track
// with no exercise data still gets a row — the number is what someone holding
// the book is looking for, and a gap in the list would read as a missing file.
function shelf(setId, known, unitLabel) {
  const groups = new Map();
  const out = [];
  let unit = null, unitTitle = "";

  for (const piste of EDITO_PISTES[setId]) {
    const k = known.get(piste);
    if (k) { unit = k.unit; unitTitle = k.unitTitle; }
    const gk = unit ?? 0;
    if (!groups.has(gk)) {
      groups.set(gk, unit == null
        ? { part: "Avant l'unité 1", skill: "", pages: "" }
        : { part: `${unitLabel} ${unit}`, skill: unitTitle, pages: "" });
    }
    out.push({
      piste,
      label: k?.label ?? `Piste ${piste}`,
      sub: k?.sub ?? "",
      page: k?.page ?? null,
      src: `/api/audio?b=${setId}&p=${piste}`,
      group: groups.get(gk),
    });
  }

  // Each unit's pages are whatever its own known tracks turned out to span.
  for (const g of groups.values()) {
    const pp = out.filter(t => t.group === g).map(t => t.page).filter(Boolean);
    if (pp.length) g.pages = `p.${Math.min(...pp)}–${Math.max(...pp)}`;
  }
  return out;
}

const fromLivre = (id, set, units) => shelf(id, livreKnown(set, units, "Unité"), "Unité");
const fromCahier = (id, set, units) => shelf(id, cahierKnown(set, units), "Unité");

// ── « 100 % réussite » ───────────────────────────────────────────
// Already an index; only the group shape needs adapting.
const fromDelf = () => PISTES.map(p => ({
  piste: p.piste,
  label: p.label,
  sub: "",
  page: p.page,
  src: p.src,
  group: p.section,
}));

export const AUDIO_BOOKS = [
  {
    id: "delf-a1",
    level: "A1",
    title: "Le DELF A1 100 % réussite",
    publisher: "Didier FLE · 2e édition 2022",
    note: "Đánh số piste theo mục Transcriptions của sách (tr.132–143).",
    icon: "📕",
    tracks: fromDelf(),
  },
  {
    id: "edito-a1-livre",
    level: "A1",
    title: "Édito A1 · Livre",
    publisher: "Didier · 2e édition",
    icon: "📘",
    tracks: fromLivre("edito-a1-livre", EDITO_AUDIO, EDITO_A1_UNITS),
  },
  {
    id: "edito-a1-cahier",
    level: "A1",
    title: "Édito A1 · Cahier",
    publisher: "Cahier d'activités",
    note: "Cahier A1 không in số piste; số ở đây suy ra từ chính lời đọc trong file.",
    icon: "📗",
    tracks: fromCahier("edito-a1-cahier", CAHIER_A1, EDITO_A1_UNITS),
  },
  {
    id: "edito-a2-livre",
    level: "A2",
    title: "Édito A2 · Livre",
    publisher: "Didier · 2e édition 2022",
    icon: "📘",
    tracks: fromLivre("edito-a2-livre", EDITO_AUDIO_A2, EDITO_A2_UNITS),
  },
  {
    id: "edito-a2-cahier",
    level: "A2",
    title: "Édito A2 · Cahier",
    publisher: "Cahier d'activités",
    icon: "📗",
    tracks: fromCahier("edito-a2-cahier", CAHIER_A2, EDITO_A2_UNITS),
  },
];

export const bookById = id => AUDIO_BOOKS.find(b => b.id === id);
