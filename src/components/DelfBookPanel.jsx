import { useState, useEffect, useMemo } from "react";
import { C } from "../constants.js";
import DelfItemCard, { Gloss } from "./DelfItemCard.jsx";
import DelfCEPanel, { SkillGroup } from "./DelfCEPanel.jsx";
import ProductionBox from "./ProductionBox.jsx";
import { DELF_A1_CE } from "../data/delfA1Reussite.js";
import { CO_PREPARE } from "../data/delfA1CO.js";
import { CO_MATCH } from "../data/delfA1COMatch.js";
import { INTRO, PE, PO, BLANCS } from "../data/delfA1Book.js";

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

      <Heading sub="Comment ça se passe ?">Les 4 épreuves</Heading>
      {INTRO.day.map((d, i) => (
        <Card key={i} accent={[C.blue, C.green, C.accent, C.gold][i]}>
          <Line fr={d.fr} vi={d.vi} alwaysVi={alwaysVi} bold />
        </Card>
      ))}
      <Card accent={C.gray2}>
        <Line fr={INTRO.note.fr} vi={INTRO.note.vi} alwaysVi={alwaysVi} />
      </Card>

      <Heading sub="Réussir">Comment on obtient le diplôme</Heading>
      <Card accent={C.green}>
        <Line fr={INTRO.pass.fr} vi={INTRO.pass.vi} alwaysVi={alwaysVi} />
      </Card>

      <Heading sub="Livre p.69–70">Stratégies</Heading>
      {INTRO.strategy.map((s, i) => (
        <Card key={i}>
          <Line fr={`${i + 1}. ${s.fr}`} vi={s.vi} alwaysVi={alwaysVi} />
        </Card>
      ))}
    </div>
  );
}

// ── 3 · Écouter ──────────────────────────────────────────────────
// The generated drills and the hand-written matching ones are one list, in the
// book's own order — which activité came from which pipeline is our problem,
// not the learner's.
const CO_DRILLS = [...CO_PREPARE, ...CO_MATCH]
  .sort((a, b) => a.piste - b.piste);

function EcouterTab({ done, onDone, alwaysVi }) {
  return (
    <div>
      <Heading sub="20 minutes · 25 points · 5 exercices · Livre p.9–40">
        Compréhension de l'oral
      </Heading>
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

      <SkillGroup title="SE PRÉPARER" sub="Nghe từng kỹ năng nhỏ · audio của sách"
        color={C.blue} items={CO_DRILLS} done={done} onDone={onDone} alwaysVi={alwaysVi} />

      <Card accent={C.gray2}>
        <div style={{ fontSize: "0.7rem", color: C.gray, lineHeight: 1.6 }}>
          Còn thiếu: các activité dạng điền bảng và chọn hình của phần Nghe, cùng toàn bộ phần
          S'ENTRAÎNER (p.28–37) — cần cắt hình như bên mục Lire.
        </div>
      </Card>
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

function EcrireTab({ alwaysVi }) {
  return (
    <div>
      <Heading sub={`${PE.duree} · ${PE.points} points · Livre ${PE.pages}`}>Production écrite</Heading>
      <Card accent={C.accent}>
        <Line fr={PE.intro.fr} vi={PE.intro.vi} alwaysVi={alwaysVi} />
        <Line fr={PE.timing.fr} vi={PE.timing.vi} alwaysVi={alwaysVi} />
      </Card>

      <Heading sub="Exercice 1 — 10 points, 1 point par ligne">1 · Remplir un formulaire</Heading>
      {PE.forms.map(f => <FormCard key={f.id} f={f} alwaysVi={alwaysVi} />)}
      <div style={{ marginBottom: "1rem" }}>
        {PE.tips.map((t, i) => (
          <Card key={i}><Line fr={t.fr} vi={t.vi} alwaysVi={alwaysVi} /></Card>
        ))}
      </div>

      <Heading sub="Exercice 2 — 15 points, 40 mots minimum">2 · Écrire un texte court</Heading>
      {PE.essays.map(e => <EssayCard key={e.id} e={e} alwaysVi={alwaysVi} />)}

      <Grid rows={PE.grid} alwaysVi={alwaysVi} total={15} />
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
function BlancTab({ alwaysVi }) {
  return (
    <div>
      <Heading sub={`2 épreuves complètes · Livre ${BLANCS.pages}`}>Épreuves blanches</Heading>
      <Card accent={C.blue}>
        <Line fr={BLANCS.intro.fr} vi={BLANCS.intro.vi} alwaysVi={alwaysVi} />
        {BLANCS.rules.map((r, i) => <Line key={i} fr={r.fr} vi={r.vi} alwaysVi={alwaysVi} />)}
      </Card>

      {BLANCS.exams.map(ex => (
        <div key={ex.id} style={{ marginTop: "1rem" }}>
          <Heading sub={ex.pages}>{ex.label}</Heading>
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

      <Card accent={C.gray2}>
        <div style={{ fontSize: "0.7rem", color: C.gray, lineHeight: 1.6 }}>
          Còn thiếu: phần Nghe và phần Đọc của hai đề thi thử — cần cắt tài liệu và hình như bên mục Đọc.
        </div>
      </Card>
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
      ...CO_PREPARE,
    ];
    return { total: all.length, finished: all.filter(i => done[i.id]).length };
  }, [done]);

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      <div style={{ background: `linear-gradient(135deg, ${C.heroFrom} 0%, ${C.heroTo} 100%)`, padding: "0.9rem 1rem 0.95rem" }}>
        {onBack && (
          <button onClick={onBack}
            style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", fontSize: "0.72rem",
                     fontWeight: 600, cursor: "pointer", padding: "0.2rem 0.65rem", borderRadius: 20,
                     marginBottom: "0.6rem", fontFamily: "inherit" }}>
            ← Trang chủ
          </button>
        )}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.55rem", letterSpacing: "0.18em",
                          color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginBottom: 4 }}>
              Didier FLE · 2022
            </div>
            <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1.15rem", color: "#fff",
                          fontWeight: 800, lineHeight: 1.15 }}>
              Le DELF A1 100 % réussite
            </div>
            <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.7)", marginTop: 4 }}>
              {finished}/{total} bài tự chấm đã làm
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
        <div style={{ height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 4, marginTop: 8, overflow: "hidden" }}>
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
        {tab === "ecrire"  && <EcrireTab alwaysVi={alwaysVi} />}
        {tab === "parler"  && <ParlerTab alwaysVi={alwaysVi} />}
        {tab === "blanc"   && <BlancTab alwaysVi={alwaysVi} />}

        <div style={{ marginTop: "1.2rem", fontSize: "0.62rem", color: C.gray2, lineHeight: 1.6 }}>
          Nguồn: Le DELF A1 100 % réussite — Martine Boyer-Dalat, Romain Chrétien, Nicolas Frappe.
          Didier FLE, 2e édition 2022. Đáp án và bài mẫu lấy từ phần <i>Corrigés</i> của chính cuốn sách.
        </div>
      </div>
    </div>
  );
}
