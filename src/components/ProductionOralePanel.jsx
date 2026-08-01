import { useState, useEffect } from "react";
import { C } from "../constants.js";
import { getSubDone, markSubDone, unmarkSubDone } from "../utils/parcours.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import GrammarBlocks from "./GrammarBlocks.jsx";
import { parseRuleToBlocks } from "../utils/parseGrammarRule.js";
import { EDITO_A2_UNITS } from "../data/editoA2Units.js";
import { EDITO_POUR_NOTES_A2 } from "../data/editoPourNotesA2.js";

// Production orale — a preparation sheet, not a chatbot. For each speaking
// topic of the unit it shows the book's task, the ready-made opening phrases,
// and one of two possible phrasebooks behind it:
//   • `topic.notes`  — keys into a per-lesson EDITO_POUR_NOTES map (structure
//     + sample sentences with Vietnamese glosses), used where the book ties a
//     communication box to a specific reading/listening document.
//   • `topic.rule`   — a longer, self-contained script (A1's former
//     "Production orale" grammar points, moved here since they were
//     phrasebooks, not grammar). Rendered with the same GrammarBlocks used on
//     the grammar screen, via parseRuleToBlocks.
// Either way, every sample sentence is speakable.
//
// Progress ids match the parcours "parler" step ("s0", "s1", …) so the unit
// tally is unchanged by how the step is presented.

// A "structure" note is one prose blob; split it into bullets on sentence
// boundaries so it reads as a checklist rather than a wall.
const toBullets = (text) =>
  text.split(/(?<=\.)\s+(?=\S)/).map(s => s.replace(/\.$/, "").trim()).filter(Boolean);

function PhraseRow({ fr, vi }) {
  return (
    <li style={{ fontSize: "0.76rem", color: C.ink, lineHeight: 1.5, marginBottom: "0.35rem" }}>
      <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
        <span style={{ fontStyle: "italic", fontFamily: "Georgia,serif" }}>{fr}</span>
        <SpeakBtn text={fr} size="0.64rem" />
      </span>
      {vi && (
        <span style={{ display: "block", color: C.gray, fontSize: "0.69rem", lineHeight: 1.45 }}>
          ↳ {vi}
        </span>
      )}
    </li>
  );
}

function NoteBox({ note }) {
  return (
    <div style={{ borderRadius: 11, border: `1.5px solid ${C.gold}44`, overflow: "hidden", marginBottom: "0.55rem" }}>
      {/* Dark brown rather than white: C.gold is a light yellow in the dark
          theme, where white text on it is unreadable. #3D2B00 clears 7:1 on
          both the light (#F5A623) and dark (#FCD34D) gold. */}
      <div style={{ background: C.gold, color: "#3D2B00", padding: "0.34rem 0.7rem", fontSize: "0.71rem", fontWeight: 700, lineHeight: 1.3 }}>
        {note.heading}
      </div>
      <div style={{ background: `${C.gold}10`, padding: "0.55rem 0.7rem 0.6rem" }}>
        {note.structure && (
          <div style={{ fontSize: "0.68rem", color: C.ink, background: `${C.gold}1c`, borderRadius: 8, padding: "0.45rem 0.6rem", marginBottom: "0.55rem", lineHeight: 1.6 }}>
            <div style={{ fontWeight: 700, marginBottom: "0.25rem", color: "#9A7B0A" }}>🔑 Cách nói</div>
            {toBullets(note.structure).map((line, i) => (
              <div key={i} style={{ display: "flex", gap: "0.35rem", marginBottom: "0.15rem" }}>
                <span style={{ flexShrink: 0, opacity: 0.6 }}>•</span><span>{line}</span>
              </div>
            ))}
          </div>
        )}
        <ul style={{ margin: 0, paddingLeft: "1.05rem" }}>
          {note.phrases.map((p, i) => (
            <PhraseRow key={i} fr={typeof p === "string" ? p : p.fr} vi={typeof p === "object" ? p.vi : null} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function ScriptExample({ ex }) {
  const parts = ex.split(" — ");
  const fr = parts[0] || ex;
  const vi = parts[1] || "";
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0.45rem 0.65rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: vi ? "0.2rem" : 0 }}>
        <span style={{ fontSize: "0.65rem", color: C.gold, flexShrink: 0 }}>▸</span>
        <span style={{ fontFamily: "Georgia,serif", fontSize: "0.8rem", color: C.ink, fontStyle: "italic", flex: 1 }}>{fr}</span>
        <SpeakBtn text={fr} size="0.7rem" />
      </div>
      {vi && <div style={{ fontSize: "0.72rem", color: C.gray, marginLeft: "1.1rem", lineHeight: 1.5 }}>→ {vi}</div>}
    </div>
  );
}

function ScriptBox({ rule, examples }) {
  const blocks = parseRuleToBlocks(rule);
  return (
    <div style={{ marginBottom: "0.55rem" }}>
      <div style={{ background: C.cream, borderRadius: 10, padding: "0.6rem 0.7rem", borderLeft: `3px solid ${C.gold}`, marginBottom: "0.6rem" }}>
        <GrammarBlocks blocks={blocks} />
      </div>
      {examples?.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {examples.map((ex, i) => <ScriptExample key={i} ex={ex} />)}
        </div>
      )}
    </div>
  );
}

function TopicCard({ topic, index, unitId, pourNotes, onChange }) {
  const [open, setOpen] = useState(false);
  const isDone = !!getSubDone(unitId, "parler")["s" + index];
  const notes  = (topic.notes || []).flatMap(k => pourNotes[k] || []);
  const hasScript = !!topic.rule;
  const scriptPhraseCount = hasScript
    ? (topic.rule.match(/^•/gm) || []).length + (topic.examples?.length || 0)
    : 0;

  return (
    <div style={{
      background: isDone ? C.greenL : C.white,
      borderTop: `1.5px solid ${isDone ? C.green + "88" : C.border}`,
      borderRight: `1.5px solid ${isDone ? C.green + "88" : C.border}`,
      borderBottom: `1.5px solid ${isDone ? C.green + "88" : C.border}`,
      borderLeft: `4px solid ${isDone ? C.green : C.gold}`,
      borderRadius: 14, padding: "0.85rem 1rem", marginBottom: "0.6rem",
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: "0.3rem" }}>
        <span style={{
          flexShrink: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: "0.62rem",
          fontWeight: 700, color: C.gold, border: `1px solid ${C.gold}55`,
          borderRadius: 20, padding: "0.05rem 0.4rem",
        }}>
          {index + 1}
        </span>
        <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "0.92rem", color: C.ink, fontWeight: 700, lineHeight: 1.25 }}>
          {topic.title}
        </span>
      </div>

      <div style={{ fontSize: "0.74rem", color: C.gray, lineHeight: 1.6, marginBottom: "0.55rem" }}>
        {topic.task}
      </div>

      {topic.usefulPhrases?.length > 0 && (
        <>
          <div style={{ fontSize: "0.6rem", fontWeight: 700, color: C.gray2, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.3rem" }}>
            Mở lời thế nào
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "0.6rem" }}>
            {topic.usefulPhrases.map((ph, i) => (
              <span key={i} style={{
                display: "inline-flex", alignItems: "center", gap: 2,
                background: C.cream, border: `1px solid ${C.gold}44`, borderRadius: 20,
                padding: "2px 4px 2px 9px", fontSize: "0.68rem", color: C.ink,
                fontFamily: "Georgia,serif",
              }}>
                {ph}<SpeakBtn text={ph} size="0.58rem" />
              </span>
            ))}
          </div>
        </>
      )}

      {(notes.length > 0 || hasScript) && (
        <>
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              width: "100%", background: open ? `${C.gold}22` : C.cream,
              border: `1px solid ${C.gold}55`, borderRadius: 10,
              padding: "0.45rem 0.7rem", cursor: "pointer", fontFamily: "inherit",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              fontSize: "0.72rem", fontWeight: 700, color: C.ink, marginBottom: open ? "0.55rem" : 0,
            }}>
            <span>📝 Mẫu câu &amp; cách nói</span>
            <span style={{ color: C.gold }}>
              {open ? "Ẩn ▲" : `${notes.reduce((a, n) => a + n.phrases.length, 0) + scriptPhraseCount} câu ▼`}
            </span>
          </button>
          {open && (
            <>
              {hasScript && <ScriptBox rule={topic.rule} examples={topic.examples} />}
              {notes.map((note, i) => <NoteBox key={i} note={note} />)}
            </>
          )}
        </>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.65rem" }}>
        {isDone ? (
          <>
            <span style={{ background: C.green, color: "#fff", borderRadius: 20, padding: "0.15rem 0.55rem", fontSize: "0.64rem", fontWeight: 700 }}>
              ✓ Đã luyện
            </span>
            <button
              onClick={() => { unmarkSubDone(unitId, "parler", "s" + index); onChange(); }}
              style={{ background: "#fff", color: C.green, border: `1px solid ${C.green}66`, borderRadius: 20, padding: "0.15rem 0.55rem", fontSize: "0.64rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              ↻ Làm lại
            </button>
          </>
        ) : (
          <button
            onClick={() => { markSubDone(unitId, "parler", "s" + index); onChange(); }}
            style={{ background: C.white, color: C.gold, border: `1.5px solid ${C.gold}77`, borderRadius: 20, padding: "0.22rem 0.7rem", fontSize: "0.68rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            ✓ Đã luyện nói xong
          </button>
        )}
      </div>
    </div>
  );
}

export default function ProductionOralePanel({
  onBackToParcours,
  units      = EDITO_A2_UNITS,
  pourNotes  = EDITO_POUR_NOTES_A2,
  unitPrefix = "b",
  levelLabel = "Édito A2",
}) {
  const [selUnit,      setSelUnit]      = useState(0);
  const [fromParcours, setFromParcours] = useState(false);
  const [, setTick] = useState(0);
  const refresh = () => setTick(t => t + 1);

  useEffect(() => {
    if (localStorage.getItem("parcours_back")) {
      setFromParcours(true);
      localStorage.removeItem("parcours_back");
    }
    const idx = localStorage.getItem("parcours_unit_idx");
    if (idx !== null) {
      setSelUnit(Number(idx));
      localStorage.removeItem("parcours_unit_idx");
    }
  }, []);

  const unit   = units[Math.min(selUnit, units.length - 1)];
  const unitId = unitPrefix + unit.unit;

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${C.heroFrom} 0%, ${C.heroTo} 100%)`, padding: "0.9rem 1rem 0.85rem" }}>
        {fromParcours && onBackToParcours && (
          <button onClick={onBackToParcours}
            style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer", padding: "0.2rem 0.65rem", borderRadius: 20, marginBottom: "0.6rem", fontFamily: "inherit" }}>
            ← Parcours
          </button>
        )}
        <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1.15rem", color: "#fff", fontWeight: 800, lineHeight: 1.1 }}>
          🗣️ La Production orale
        </div>
        <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.65)", marginTop: 4 }}>
          Chủ điểm nói của bài · cách nói · câu mẫu — {levelLabel}
        </div>
      </div>

      <div style={{ padding: "0.75rem 1rem 4rem" }}>

        {/* Unit chips */}
        {units.length > 1 && (
          <div style={{ overflowX: "auto", display: "flex", gap: 6, paddingBottom: 6, scrollbarWidth: "none" }}>
            {units.map((u, i) => {
              const active = selUnit === i;
              return (
                <button key={u.id} onClick={() => setSelUnit(i)}
                  style={{ flexShrink: 0, padding: "5px 11px", borderRadius: 999, fontSize: 11.5, fontWeight: active ? 700 : 500, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", background: active ? C.gold : C.white, color: active ? "#fff" : C.ink, border: `1.5px solid ${active ? C.gold : C.border}` }}>
                  U{u.unit} · {u.title}
                </button>
              );
            })}
          </div>
        )}

        <div style={{ fontSize: "0.65rem", fontWeight: 700, color: C.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
          Unité {unit.unit} — {unit.title} · {unit.speakingPractice.length} chủ điểm
        </div>

        <div style={{ background: C.cream, borderRadius: 12, padding: "0.6rem 0.8rem", fontSize: "0.71rem", color: C.gray, lineHeight: 1.6, marginBottom: "0.8rem" }}>
          💡 Đọc đề bài, bấm 🔈 nghe câu mẫu rồi nói to theo. Nói được trọn chủ điểm thì đánh dấu đã luyện.
        </div>

        {unit.speakingPractice.map((topic, i) => (
          <TopicCard
            key={i}
            topic={topic}
            index={i}
            unitId={unitId}
            pourNotes={pourNotes}
            onChange={refresh}
          />
        ))}
      </div>
    </div>
  );
}
