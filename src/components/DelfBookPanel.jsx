import { useState, useEffect, useMemo } from "react";
import { C } from "../constants.js";
import DelfItemCard, { Gloss, ObjectifPicker } from "./DelfItemCard.jsx";
import DelfCEPanel, { SkillGroup } from "./DelfCEPanel.jsx";
import ProductionBox from "./ProductionBox.jsx";
import { DELF_A1_CE } from "../data/delfA1Reussite.js";
import { CO_PREPARE } from "../data/delfA1CO.js";
import { CO_MATCH } from "../data/delfA1COMatch.js";
import { CO_MORE } from "../data/delfA1COMore.js";
import { CO_PICTURES } from "../data/delfA1COPictures.js";
import { CO_TRAIN } from "../data/delfA1COTrain.js";
import { CO_GRID } from "../data/delfA1COGrid.js";
import { CO_WORKED } from "../data/delfA1COWorked.js";
import { BLANC1_CO, BLANC2_CO } from "../data/delfA1BlancCO.js";
import { BLANC1_CE, BLANC2_CE } from "../data/delfA1BlancCE.js";
import { INTRO, PE, PO, BLANCS } from "../data/delfA1Book.js";
import { PE_PREPARE, PE_TASKS, PE_OBJECTIFS } from "../data/delfA1PE.js";

// « Le DELF A1 100 % réussite » — the book, as one screen with the book's own
// six parts. Everything here is sourced from it and cites its page numbers.
//
// French is the default everywhere: this is an exam in French, and reading a
// Vietnamese gloss before attempting a question is the fastest way to feel
// prepared without being prepared. Every gloss hides behind a « ? », and the
// header toggle turns them all on for anyone who prefers that.

const DONE_KEY = "delf_a1_book_done";
const VI_KEY   = "delf_a1_book_vi";

const load = (k, fallback) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? fallback; }
  catch { return fallback; }
};

// The book's own six parts, under the book's own names.
const TABS = [
  { id: "intro",  label: "Introduction",      icon: "📘" },
  { id: "lire",   label: "Lire",              icon: "📖" },
  { id: "ecouter",label: "Écouter",           icon: "🎧" },
  { id: "ecrire", label: "Écrire",            icon: "✍️" },
  { id: "parler", label: "Parler",            icon: "🗣️" },
  { id: "blanc",  label: "Épreuves blanches", icon: "⏱️" },
];

// ── shared bits ──────────────────────────────────────────────────
function Card({ children, accent = C.border, pad = "0.7rem 0.8rem" }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${accent}`,
                  borderRadius: 10, padding: pad, marginBottom: "0.55rem" }}>
      {children}
    </div>
  );
}

function Line({ fr, vi, alwaysVi, bold }) {
  return (
    <div style={{ marginBottom: "0.5rem" }}>
      <div style={{ fontSize: "0.75rem", color: C.ink, lineHeight: 1.55, fontWeight: bold ? 700 : 400,
                    fontFamily: "Georgia,serif" }}>
        {fr}<Gloss vi={vi} always={alwaysVi} />
      </div>
    </div>
  );
}

function Heading({ children, sub }) {
  return (
    <div style={{ marginBottom: "0.7rem" }}>
      <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1rem", fontWeight: 700, color: C.ink }}>
        {children}
      </div>
      {sub && <div style={{ fontSize: "0.66rem", color: C.gray, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

// A marked line inside a card, for lists that would otherwise be one card each.
function Bullet({ marker, children, last, bold }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "baseline", marginBottom: last ? 0 : "0.5rem" }}>
      <span style={{ flexShrink: 0, width: 12, textAlign: "center" }}>{marker}</span>
      <div style={{ flex: 1, minWidth: 0, fontSize: "0.74rem", color: C.ink,
                    fontFamily: "Georgia,serif", lineHeight: 1.5, fontWeight: bold ? 600 : 400 }}>
        {children}
      </div>
    </div>
  );
}

const Dot = ({ color }) => (
  <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: 5, background: color }} />
);

// How a paper works is read once and then only ever scrolled past, so it lives
// behind its own title rather than above every visit.
function PaperNote({ title, sub, children }) {
  return (
    <details style={{ marginBottom: "0.7rem" }}>
      <summary style={{ cursor: "pointer", listStyle: "none", display: "flex",
                        alignItems: "baseline", gap: 8, padding: "0.1rem 0" }}>
        <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "0.98rem",
                       fontWeight: 700, color: C.ink }}>
          {title}
        </span>
        <span style={{ flex: 1, minWidth: 0, fontSize: "0.63rem", color: C.gray }}>{sub}</span>
        <span style={{ flexShrink: 0, fontSize: "0.62rem", color: C.blue, fontWeight: 700 }}>Méthode ▾</span>
      </summary>
      <div style={{ marginTop: "0.5rem" }}>{children}</div>
    </details>
  );
}

function Grid({ rows, alwaysVi, total }) {
  return (
    <Card accent={C.gold}>
      <div style={{ fontSize: "0.7rem", fontWeight: 700, color: C.ink, marginBottom: "0.45rem" }}>
        Grille d'évaluation — {total} points
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{ display: "flex", gap: 8, alignItems: "baseline", marginBottom: "0.4rem" }}>
          <span style={{ flexShrink: 0, background: C.goldL, color: C.gold, borderRadius: 6,
                         padding: "0.05rem 0.35rem", fontSize: "0.62rem", fontWeight: 800,
                         fontFamily: "'JetBrains Mono',monospace" }}>
            {r.pts}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "0.73rem", color: C.ink, lineHeight: 1.45 }}>
              {r.fr}<Gloss vi={r.vi} always={alwaysVi} />
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
}

// ── 1 · Giới thiệu ───────────────────────────────────────────────
function IntroTab({ alwaysVi }) {
  return (
    <div>
      <Heading sub="Qu'est-ce que le DELF ? · Livre p.3–8">Le DELF A1</Heading>
      <Card accent={C.blue}>
        <Line fr={INTRO.what.fr} vi={INTRO.what.vi} alwaysVi={alwaysVi} />
        <div style={{ fontSize: "0.7rem", color: C.gray, lineHeight: 1.55 }}>{INTRO.levels}</div>
      </Card>

      {/* One card per sentence spent more height on borders than on text, so
          the lists live inside a single card each. */}
      <Heading sub="Comment ça se passe ?">Les 4 épreuves</Heading>
      <Card accent={C.blue}>
        {INTRO.day.map((d, i) => (
          <Bullet key={i} marker={<Dot color={[C.blue, C.green, C.accent, C.gold][i]} />}
            last={i === INTRO.day.length - 1} bold>
            {d.fr}<Gloss vi={d.vi} always={alwaysVi} />
          </Bullet>
        ))}
      </Card>
      <Card accent={C.gray2}>
        <Line fr={INTRO.note.fr} vi={INTRO.note.vi} alwaysVi={alwaysVi} />
        <Line fr={INTRO.pass.fr} vi={INTRO.pass.vi} alwaysVi={alwaysVi} />
      </Card>

      <Heading sub="Livre p.69–70">Stratégies</Heading>
      <Card accent={C.green}>
        {INTRO.strategy.map((s, i) => (
          <Bullet key={i} last={i === INTRO.strategy.length - 1}
            marker={<span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem",
                                   fontWeight: 700, color: C.green }}>{i + 1}</span>}>
            {s.fr}<Gloss vi={s.vi} always={alwaysVi} />
          </Bullet>
        ))}
      </Card>
    </div>
  );
}

// ── 3 · Écouter ──────────────────────────────────────────────────
// The generated drills and the hand-written matching ones are one list, in the
// book's own order — which activité came from which pipeline is our problem,
// not the learner's.
const CO_DRILLS = [...CO_PREPARE, ...CO_MATCH, ...CO_MORE, ...CO_PICTURES]
  .sort((a, b) => a.piste - b.piste);

// Same for the exam-format exercices: the generated ones and the hand-written
// picture grids belong in the book's order, not their pipeline's.
// The book's worked examples belong in the run too — Exercice 1 comes before
// Exercice 2, solved or not.
const CO_EXERCICES = [...CO_TRAIN, ...CO_GRID, ...CO_WORKED].sort((a, b) => a.piste - b.piste);

// Worked examples can't be finished, so they don't count towards an objectif.
const gradable = items => items.filter(i => !i.worked);

// The book's five listening objectifs (p.12, 14, 17, 20, 24). Showing one at a
// time keeps this screen to a handful of cards instead of the thirty-odd it
// would otherwise open with.
const CO_OBJECTIFS = [
  { num: 1, fr: "Identifier un événement" },
  { num: 2, fr: "Identifier une activité" },
  { num: 3, fr: "Comprendre des instructions" },
  { num: 4, fr: "Identifier des situations" },
  { num: 5, fr: "Identifier des objets" },
];

function EcouterTab({ done, onDone, alwaysVi }) {
  const [obj, setObj] = useState(1);
  const drills = CO_DRILLS.filter(i => i.objectif === obj);
  const train  = CO_EXERCICES.filter(i => i.objectif === obj);

  return (
    <div>
      <PaperNote title="Compréhension de l'oral" sub="20 min · 25 pts · Livre p.9–40">
        <Card accent={C.blue}>
          <Line
            fr="Vous écoutez 5 documents, 2 fois chacun. Avant chaque écoute, une cloche annonce le début du document."
            vi="Nghe 5 tài liệu, mỗi tài liệu 2 lần. Trước mỗi lần nghe có tiếng chuông báo hiệu — đó là lúc ngừng đọc câu hỏi và tập trung nghe."
            alwaysVi={alwaysVi} />
          <Line
            fr="Lisez les questions pendant les 30 secondes avant la première écoute."
            vi="Dùng 30 giây trước lần nghe đầu để đọc câu hỏi — đừng ngồi đợi."
            alwaysVi={alwaysVi} />
        </Card>
      </PaperNote>

      {/* The selected chip already names the objectif, so no title repeats it. */}
      <ObjectifPicker items={CO_OBJECTIFS} value={obj} onChange={setObj}
        countOf={n => gradable([...CO_DRILLS, ...CO_EXERCICES]).filter(i => i.objectif === n).length}
        doneOf={n => gradable([...CO_DRILLS, ...CO_EXERCICES])
                       .filter(i => i.objectif === n && done[i.id]).length} />

      <SkillGroup title="SE PRÉPARER" sub="Nghe từng kỹ năng nhỏ" color={C.blue}
        items={drills} done={done} onDone={onDone} alwaysVi={alwaysVi} defaultOpen={false} />

      <SkillGroup title="S'ENTRAÎNER" sub="Đề đúng format thi" color={C.green}
        items={train} done={done} onDone={onDone} alwaysVi={alwaysVi} />
    </div>
  );
}

// ── 4 · Viết ─────────────────────────────────────────────────────
function FormCard({ f, alwaysVi }) {
  const [shown, setShown] = useState(false);
  return (
    <Card accent={C.accent}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 3 }}>
        <span style={{ flexShrink: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem",
                       fontWeight: 700, color: C.accent, border: `1px solid ${C.accent}55`,
                       borderRadius: 20, padding: "0.03rem 0.38rem" }}>{f.label}</span>
        <span style={{ flexShrink: 0, fontSize: "0.6rem", color: C.gray2, fontWeight: 700 }}>{f.pts} pts</span>
      </div>
      <Line fr={f.setup} vi={f.setupVi} alwaysVi={alwaysVi} />

      <div style={{ background: C.cream, borderRadius: 9, padding: "0.55rem 0.65rem" }}>
        {f.fields.map((field, i) => (
          <div key={i} style={{ display: "flex", gap: 6, alignItems: "baseline", marginBottom: "0.35rem" }}>
            <span style={{ fontSize: "0.72rem", color: C.ink, fontFamily: "Georgia,serif", minWidth: 130 }}>
              {field.includes(":") ? field : `${field} :`}
            </span>
            <span style={{ flex: 1, borderBottom: `1px dotted ${C.gray2}`, minHeight: "0.9rem",
                           fontSize: "0.72rem", color: C.green, fontFamily: "Georgia,serif" }}>
              {shown ? f.model?.[i] : ""}
            </span>
          </div>
        ))}
      </div>

      {f.model && (
        <button onClick={() => setShown(s => !s)}
          style={{ marginTop: "0.55rem", background: shown ? `${C.accent}18` : C.cream,
                   border: `1px solid ${C.accent}55`, borderRadius: 20, padding: "0.2rem 0.7rem",
                   fontSize: "0.66rem", fontWeight: 700, color: C.ink, cursor: "pointer", fontFamily: "inherit" }}>
          {shown ? "Ẩn ví dụ ▲" : "📄 Ví dụ của sách ▼"}
        </button>
      )}
      <div style={{ marginTop: "0.4rem", fontSize: "0.6rem", color: C.gray2 }}>Livre p.{f.page}</div>
    </Card>
  );
}

function EssayCard({ e, alwaysVi, cefr = "A1", minWords = 40 }) {
  const [shown, setShown] = useState(false);
  return (
    <Card accent={C.accent}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 3 }}>
        <span style={{ flexShrink: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem",
                       fontWeight: 700, color: C.accent, border: `1px solid ${C.accent}55`,
                       borderRadius: 20, padding: "0.03rem 0.38rem" }}>{e.label}</span>
        {e.pts && <span style={{ fontSize: "0.6rem", color: C.gray2, fontWeight: 700 }}>{e.pts} pts</span>}
      </div>
      <Line fr={e.setup} vi={e.setupVi} alwaysVi={alwaysVi} />

      {e.tip && (
        <div style={{ background: C.blueL, borderRadius: 8, padding: "0.35rem 0.5rem", marginBottom: "0.5rem",
                      fontSize: "0.68rem", color: C.ink2, lineHeight: 1.5 }}>
          ▸ {e.tip}<Gloss vi={e.tipVi} always={alwaysVi} />
        </div>
      )}

      {e.must && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", marginBottom: "0.55rem" }}>
          {e.must.map((m, i) => (
            <span key={i} style={{ background: C.goldL, color: C.ink2, border: `1px dashed ${C.gold}66`,
                                   borderRadius: 20, padding: "0.08rem 0.45rem", fontSize: "0.64rem" }}>
              {m}
            </span>
          ))}
        </div>
      )}

      <ProductionBox task={e.setup} mode="ecrit" cefr={cefr} color={C.accent}
        minWords={minWords} examMode storageKey={`delf_a1_${e.id}`} />

      {e.model && (
        <>
          <button onClick={() => setShown(s => !s)}
            style={{ marginTop: "0.6rem", background: shown ? `${C.accent}18` : C.cream,
                     border: `1px solid ${C.accent}55`, borderRadius: 20, padding: "0.22rem 0.75rem",
                     fontSize: "0.68rem", fontWeight: 700, color: C.ink, cursor: "pointer", fontFamily: "inherit" }}>
            {shown ? "Ẩn bài mẫu ▲" : "📄 Bài mẫu của sách ▼"}
          </button>
          {shown && (
            <div style={{ marginTop: "0.55rem", background: C.cream, borderRadius: 9, padding: "0.6rem 0.7rem",
                          fontSize: "0.76rem", color: C.ink, lineHeight: 1.7, fontFamily: "Georgia,serif",
                          whiteSpace: "pre-line" }}>
              {e.model}
            </div>
          )}
          <div style={{ marginTop: "0.45rem", fontSize: "0.62rem", color: C.gray2 }}>
            💡 Tự viết và nhờ AI chấm trước, rồi mới mở bài mẫu để so. · Livre p.{e.page}
          </div>
        </>
      )}
    </Card>
  );
}

function EcrireTab({ done, onDone, alwaysVi }) {
  const [obj, setObj] = useState(1);
  const drills = PE_PREPARE.filter(i => i.objectif === obj);
  const tasks  = PE_TASKS.filter(i => i.objectif === obj);

  return (
    <div>
      <PaperNote title="Production écrite" sub={`${PE.duree} · ${PE.points} pts · Livre ${PE.pages}`}>
        <Card accent={C.accent}>
          <Line fr={PE.intro.fr} vi={PE.intro.vi} alwaysVi={alwaysVi} />
          <Line fr={PE.timing.fr} vi={PE.timing.vi} alwaysVi={alwaysVi} />
        </Card>
        <Card accent={C.gray2}>
          {PE.tips.map((t, i) => (
            <Bullet key={i} marker={<Dot color={C.accent} />} last={i === PE.tips.length - 1}>
              {t.fr}<Gloss vi={t.vi} always={alwaysVi} />
            </Bullet>
          ))}
        </Card>
        <Grid rows={PE.grid} alwaysVi={alwaysVi} total={15} />
      </PaperNote>

      <ObjectifPicker items={PE_OBJECTIFS} value={obj} onChange={setObj}
        countOf={n => PE_PREPARE.filter(i => i.objectif === n).length}
        doneOf={n => PE_PREPARE.filter(i => i.objectif === n && done[i.id]).length} />

      <SkillGroup title="SE PRÉPARER" sub="Đọc kỹ và điền cho đúng" color={C.blue}
        items={drills} done={done} onDone={onDone} alwaysVi={alwaysVi} defaultOpen={false} />

      {/* The writing tasks can't be graded, so they get the prompt, the points
          the consigne asks for, and the book's model behind a reveal. */}
      {tasks.length > 0 && (
        <SkillGroup title="À ÉCRIRE" sub="Tự viết rồi so với bài mẫu" color={C.accent}
          items={tasks} alwaysVi={alwaysVi} defaultOpen={false} done={done} onDone={onDone}
          renderItem={t => <EssayCard e={t} alwaysVi={alwaysVi} minWords={t.minWords ?? 40} />} />
      )}

      <SkillGroup title="S'ENTRAÎNER" sub="Đề đúng format thi" color={C.green}
        items={obj === 1 ? PE.forms : PE.essays} alwaysVi={alwaysVi} done={done} onDone={onDone}
        renderItem={x => obj === 1
          ? <FormCard f={x} alwaysVi={alwaysVi} />
          : <EssayCard e={x} alwaysVi={alwaysVi} />} />
    </div>
  );
}
// ── 5 · Nói ──────────────────────────────────────────────────────
function SpeakCard({ p, alwaysVi }) {
  const [shown, setShown] = useState(false);
  return (
    <Card accent={C.gold}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
        <span style={{ flexShrink: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem",
                       fontWeight: 700, color: C.gold, border: `1px solid ${C.gold}66`,
                       borderRadius: 20, padding: "0.03rem 0.38rem" }}>{p.label}</span>
        <span style={{ flex: 1, minWidth: 0, fontSize: "0.78rem", fontWeight: 700, color: C.ink }}>{p.title}</span>
      </div>
      <Gloss vi={p.titleVi} always={alwaysVi} />
      <div style={{ marginTop: "0.35rem" }}>
        <Line fr={p.setup} vi={p.setupVi} alwaysVi={alwaysVi} />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", marginBottom: "0.6rem" }}>
        {p.prompts.map((q, i) => (
          <span key={i} style={{ background: C.cream, border: `1px solid ${C.border}`, borderRadius: 8,
                                 padding: "0.15rem 0.5rem", fontSize: "0.7rem", color: C.ink,
                                 fontFamily: "Georgia,serif" }}>
            {q}
          </span>
        ))}
      </div>

      {/* Speech recognition grades what was actually said, not what was typed. */}
      <ProductionBox task={p.setup} mode="oral" cefr="A1" color={C.gold}
        minWords={0} examMode storageKey={`delf_a1_${p.id}`} />

      {p.tips?.map((t, i) => (
        <div key={i} style={{ marginTop: "0.45rem", background: C.blueL, borderRadius: 8,
                              padding: "0.35rem 0.5rem", fontSize: "0.68rem", color: C.ink2, lineHeight: 1.5 }}>
          ▸ {t.fr}<Gloss vi={t.vi} always={alwaysVi} />
        </div>
      ))}

      <button onClick={() => setShown(s => !s)}
        style={{ marginTop: "0.6rem", background: shown ? `${C.gold}18` : C.cream,
                 border: `1px solid ${C.gold}66`, borderRadius: 20, padding: "0.22rem 0.75rem",
                 fontSize: "0.68rem", fontWeight: 700, color: C.ink, cursor: "pointer", fontFamily: "inherit" }}>
        {shown ? "Ẩn ví dụ ▲" : "📄 Ví dụ trả lời ▼"}
      </button>
      {shown && (
        <div style={{ marginTop: "0.55rem", background: C.cream, borderRadius: 9, padding: "0.6rem 0.7rem",
                      fontSize: "0.76rem", color: C.ink, lineHeight: 1.7, fontFamily: "Georgia,serif",
                      whiteSpace: "pre-line" }}>
          {p.model}
        </div>
      )}
      <div style={{ marginTop: "0.45rem", fontSize: "0.6rem", color: C.gray2 }}>Livre p.{p.page}</div>
    </Card>
  );
}

function ParlerTab({ alwaysVi }) {
  return (
    <div>
      <Heading sub={`${PO.duree} · ${PO.points} points · Livre ${PO.pages}`}>Production orale</Heading>
      <Card accent={C.gold}>
        <Line fr={PO.intro.fr} vi={PO.intro.vi} alwaysVi={alwaysVi} />
        <Line fr={PO.timing.fr} vi={PO.timing.vi} alwaysVi={alwaysVi} />
      </Card>
      {PO.parts.map(p => <SpeakCard key={p.id} p={p} alwaysVi={alwaysVi} />)}
      <Grid rows={PO.grid} alwaysVi={alwaysVi} total={25} />
    </div>
  );
}

// ── 6 · Thi thử ──────────────────────────────────────────────────
function BlancTab({ done, onDone, alwaysVi }) {
  return (
    <div>
      <PaperNote title="Épreuves blanches" sub={`2 épreuves complètes · Livre ${BLANCS.pages}`}>
        <Card accent={C.blue}>
          <Line fr={BLANCS.intro.fr} vi={BLANCS.intro.vi} alwaysVi={alwaysVi} />
          {BLANCS.rules.map((r, i) => <Line key={i} fr={r.fr} vi={r.vi} alwaysVi={alwaysVi} />)}
        </Card>
      </PaperNote>

      {BLANCS.exams.map((ex, n) => (
        <div key={ex.id} style={{ marginTop: "1rem" }}>
          <Heading sub={ex.pages}>{ex.label}</Heading>

          <SkillGroup title="ÉPREUVE 1" sub="Compréhension de l'oral · 20 min · 25 pts" color={C.blue}
            items={n === 0 ? BLANC1_CO : BLANC2_CO}
            done={done} onDone={onDone} alwaysVi={alwaysVi} defaultOpen={false} />

          <SkillGroup title="ÉPREUVE 2" sub="Compréhension des écrits · 30 min · 25 pts" color={C.green}
            items={n === 0 ? BLANC1_CE : BLANC2_CE}
            done={done} onDone={onDone} alwaysVi={alwaysVi} defaultOpen={false} />

          <FormCard f={ex.form} alwaysVi={alwaysVi} />
          <EssayCard e={ex.essay} alwaysVi={alwaysVi} />

          <Card accent={C.gold}>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: C.ink, marginBottom: 4 }}>
              {ex.po.label} — {ex.po.pts} points
            </div>
            <Line fr={ex.po.setup} vi={ex.po.setupVi} alwaysVi={alwaysVi} />
            <div style={{ fontSize: "0.66rem", color: C.gray2, fontWeight: 700, marginBottom: 4 }}>
              Partie 2 — vos six cartes
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", marginBottom: "0.6rem" }}>
              {ex.po.cards.map((c, i) => (
                <span key={i} style={{ background: C.cream, border: `1px solid ${C.border}`, borderRadius: 8,
                                       padding: "0.15rem 0.5rem", fontSize: "0.72rem", color: C.ink,
                                       fontFamily: "Georgia,serif" }}>{c}</span>
              ))}
            </div>
            {ex.po.sujets.map((s, i) => (
              <div key={i} style={{ fontSize: "0.72rem", color: C.ink, lineHeight: 1.55, marginBottom: "0.3rem" }}>
                {s}
              </div>
            ))}
            <div style={{ marginTop: "0.5rem" }}>
              <ProductionBox task={ex.po.sujets[0]} mode="oral" cefr="A1" color={C.gold}
                minWords={0} examMode storageKey={`delf_a1_${ex.po.id}`} />
            </div>
            <div style={{ marginTop: "0.45rem", fontSize: "0.6rem", color: C.gray2 }}>Livre p.{ex.po.page}</div>
          </Card>
        </div>
      ))}

    </div>
  );
}

// ── Panel ────────────────────────────────────────────────────────
export default function DelfBookPanel({ onBack }) {
  const [tab, setTab]         = useState("intro");
  const [done, setDone]       = useState(() => load(DONE_KEY, {}));
  const [alwaysVi, setAlways] = useState(() => load(VI_KEY, false));

  useEffect(() => { localStorage.setItem(DONE_KEY, JSON.stringify(done)); }, [done]);
  useEffect(() => { localStorage.setItem(VI_KEY, JSON.stringify(alwaysVi)); }, [alwaysVi]);

  const markDone = id => setDone(d => (d[id] ? d : { ...d, [id]: true }));

  // Only the auto-graded papers have a countable total; writing and speaking
  // are productions with no right answer to tick off.
  const { total, finished } = useMemo(() => {
    const all = [
      ...DELF_A1_CE.sections.flatMap(s => [...s.prepare, ...s.train]).filter(i => !i.worked),
      ...CO_DRILLS, ...CO_EXERCICES, ...BLANC1_CO, ...BLANC2_CO, ...BLANC1_CE, ...BLANC2_CE,
    ];
    return { total: all.length, finished: all.filter(i => done[i.id]).length };
  }, [done]);

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      {/* The hero used four stacked lines for what is really one: the book's
          name, where you are in it, and the two controls. */}
      <div style={{ background: `linear-gradient(135deg, ${C.heroFrom} 0%, ${C.heroTo} 100%)`, padding: "0.55rem 1rem 0.6rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {onBack && (
            <button onClick={onBack} title="Về trang chủ"
              style={{ flexShrink: 0, background: "rgba(255,255,255,0.15)", border: "none", color: "#fff",
                       fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", lineHeight: 1,
                       padding: "0.3rem 0.55rem", borderRadius: 20, fontFamily: "inherit" }}>
              ←
            </button>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1rem", color: "#fff",
                          fontWeight: 800, lineHeight: 1.2, whiteSpace: "nowrap",
                          overflow: "hidden", textOverflow: "ellipsis" }}>
              Le DELF A1 100 % réussite
            </div>
            <div style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.65)" }}>
              Didier FLE 2022 · {finished}/{total} bài tự chấm
            </div>
          </div>
          <button onClick={() => setAlways(v => !v)}
            title="Bật/tắt phần dịch tiếng Việt"
            style={{ flexShrink: 0, background: alwaysVi ? "#fff" : "rgba(255,255,255,0.15)",
                     color: alwaysVi ? C.ink : "#fff", border: "none", borderRadius: 20,
                     padding: "0.22rem 0.6rem", fontSize: "0.66rem", fontWeight: 700,
                     cursor: "pointer", fontFamily: "inherit" }}>
            {alwaysVi ? "VI ✓" : "VI"}
          </button>
        </div>
        <div style={{ height: 3, background: "rgba(255,255,255,0.2)", borderRadius: 4, marginTop: 7, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${total ? (finished / total) * 100 : 0}%`, background: C.green, borderRadius: 4 }} />
        </div>
      </div>

      {/* The book's six parts */}
      <div style={{ display: "flex", gap: "0.3rem", overflowX: "auto", padding: "0.6rem 1rem 0.5rem",
                    borderBottom: `1px solid ${C.border}`, background: C.paper }}>
        {TABS.map((t, i) => {
          const on = t.id === tab;
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ flexShrink: 0, background: on ? C.ink : C.white, color: on ? "#fff" : C.ink2,
                       border: `1px solid ${on ? C.ink : C.border}`, borderRadius: 20,
                       padding: "0.3rem 0.7rem", fontSize: "0.7rem", fontWeight: 700,
                       cursor: "pointer", fontFamily: "inherit" }}>
              {t.icon} {i + 1}. {t.label}
            </button>
          );
        })}
      </div>

      <div style={{ padding: "0.85rem 1rem 4rem" }}>
        {tab === "intro"   && <IntroTab alwaysVi={alwaysVi} />}
        {tab === "lire"    && <DelfCEPanel done={done} onDone={markDone} alwaysVi={alwaysVi} />}
        {tab === "ecouter" && <EcouterTab done={done} onDone={markDone} alwaysVi={alwaysVi} />}
        {tab === "ecrire"  && <EcrireTab done={done} onDone={markDone} alwaysVi={alwaysVi} />}
        {tab === "parler"  && <ParlerTab alwaysVi={alwaysVi} />}
        {tab === "blanc"   && <BlancTab done={done} onDone={markDone} alwaysVi={alwaysVi} />}

        <div style={{ marginTop: "1.2rem", fontSize: "0.62rem", color: C.gray2, lineHeight: 1.6 }}>
          Nguồn: Le DELF A1 100 % réussite — Martine Boyer-Dalat, Romain Chrétien, Nicolas Frappe.
          Didier FLE, 2e édition 2022. Đáp án và bài mẫu lấy từ phần <i>Corrigés</i> của chính cuốn sách.
        </div>
      </div>
    </div>
  );
}
