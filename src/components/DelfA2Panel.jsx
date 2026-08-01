import { useState, useEffect } from "react";
import { C } from "../constants.js";
import { getSubDone, markSubDone, unmarkSubDone } from "../utils/parcours.js";
import CahierExercises from "./CahierExercises.jsx";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import { EDITO_AUDIO_A2 } from "../data/editoAudioA2.js";
import { CAHIER_A2 } from "../data/editoCahierA2.js";
import { PARCOURS_UNITS_A2 } from "../data/parcoursDataA2.js";

// DELF A2 blanc for one unit: the four exam skills on one page.
//   • Compréhension de l'oral   — the livre's DELF track, already hosted
//   • Compréhension des écrits  — the cahier's matching exercise, auto-graded
//   • Production écrite / orale — prompt plus the cahier's model answer
//
// Production can't be auto-graded, so the model answer is the yardstick: write
// or record first, then reveal and compare. Hiding it until then is the point.

const SKILL_COLORS = {
  CO: "#0891B2",
  CE: "#059669",
  PE: "#E67E22",
  PO: "#D97706",
};

function SkillHeader({ tag, title, points, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.55rem" }}>
      <span style={{
        flexShrink: 0, background: color, color: "#fff", borderRadius: 8,
        padding: "0.15rem 0.5rem", fontSize: "0.62rem", fontWeight: 800,
        fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.05em",
      }}>
        {tag}
      </span>
      <span style={{ flex: 1, minWidth: 0, fontFamily: "'Playfair Display',Georgia,serif", fontSize: "0.95rem", fontWeight: 700, color: C.ink }}>
        {title}
      </span>
      {points && <span style={{ flexShrink: 0, fontSize: "0.62rem", color: C.gray2, fontWeight: 600 }}>{points}</span>}
    </div>
  );
}

function ProductionCard({ p, color }) {
  const [shown, setShown] = useState(false);
  return (
    <div style={{
      background: C.white, border: `1px solid ${C.border}`,
      borderLeft: `3px solid ${color}`, borderRadius: 10,
      padding: "0.75rem 0.85rem", marginBottom: "0.6rem",
    }}>
      <div style={{ fontSize: "0.78rem", color: C.ink, lineHeight: 1.6, fontWeight: 600 }}>
        {p.prompt}
      </div>
      <div style={{ fontSize: "0.7rem", color: C.gray, lineHeight: 1.55, marginTop: "0.3rem" }}>
        {p.vi}
      </div>

      <button
        onClick={() => setShown(s => !s)}
        style={{
          marginTop: "0.6rem", background: shown ? `${color}18` : C.cream,
          border: `1px solid ${color}55`, borderRadius: 20,
          padding: "0.22rem 0.75rem", fontSize: "0.68rem", fontWeight: 700,
          color: C.ink, cursor: "pointer", fontFamily: "inherit",
        }}>
        {shown ? "Ẩn bài mẫu ▲" : "📄 Xem bài mẫu của sách ▼"}
      </button>

      {shown && (
        <div style={{
          marginTop: "0.55rem", background: C.cream, borderRadius: 9,
          padding: "0.6rem 0.7rem", fontSize: "0.76rem", color: C.ink,
          lineHeight: 1.7, fontFamily: "Georgia,serif",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: "0.35rem" }}>
            <span style={{ fontSize: "0.58rem", fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'JetBrains Mono',monospace" }}>
              Exemple de production · Corrigés p.155
            </span>
            <SpeakBtn text={p.model} size="0.66rem" />
          </div>
          {p.model}
        </div>
      )}
      <div style={{ marginTop: "0.5rem", fontSize: "0.62rem", color: C.gray2 }}>
        💡 Tự viết/nói trước rồi mới mở bài mẫu — mở trước thì mất tác dụng luyện.
      </div>
    </div>
  );
}

export default function DelfA2Panel({
  onBackToParcours,
  units  = PARCOURS_UNITS_A2,
  audio  = EDITO_AUDIO_A2,
  cahier = CAHIER_A2,
}) {
  const [unitId,       setUnitId]       = useState(units[0]?.id || null);
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
      const u = units[Number(idx)];
      if (u) setUnitId(u.id);
      localStorage.removeItem("parcours_unit_idx");
    }
  }, [units]);

  const unit    = units.find(u => u.id === unitId) || units[0];
  const delf    = cahier?.[unitId]?.delf;
  // The listening half comes from the livre track already hosted for this unit.
  const coTrack = (audio?.[unitId] || []).find(t => t.section === "DELF");

  // Progress rides on the same sub-lesson the écoute step used, so the unit
  // tally is unchanged by moving DELF onto its own screen.
  const isDone = coTrack ? !!getSubDone(unitId, "ecouter")[coTrack.id] : false;

  if (!unit) return null;

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
          🎓 DELF A2 blanc
        </div>
        <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.65)", marginTop: 4 }}>
          Unité {unit.num} · {unit.fr} — 4 kỹ năng thi thật
        </div>
      </div>

      <div style={{ padding: "0.85rem 1rem 4rem" }}>

        {/* 1 — Compréhension de l'oral */}
        {coTrack && (
          <section style={{ marginBottom: "1.2rem" }}>
            <SkillHeader tag="CO" title="Compréhension de l'oral" points="6 points" color={SKILL_COLORS.CO} />
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${SKILL_COLORS.CO}`, borderRadius: 10, padding: "0.75rem 0.85rem" }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: C.ink, marginBottom: 3 }}>{coTrack.title}</div>
              <div style={{ fontSize: "0.7rem", color: C.gray, marginBottom: "0.55rem" }}>{coTrack.subtitle}</div>
              <audio controls preload="none" src={coTrack.audioSrc} style={{ width: "100%", height: 34 }} />
              {coTrack.questions?.map((q, i) => (
                <div key={i} style={{ marginTop: "0.55rem" }}>
                  <div style={{ fontSize: "0.6rem", fontWeight: 700, color: SKILL_COLORS.CO, textTransform: "uppercase", letterSpacing: "0.08em" }}>{q.label}</div>
                  <div style={{ fontSize: "0.74rem", color: C.ink, lineHeight: 1.6, marginTop: 2 }}>{q.text}</div>
                </div>
              ))}
              <details style={{ marginTop: "0.6rem" }}>
                <summary style={{ fontSize: "0.68rem", color: SKILL_COLORS.CO, fontWeight: 700, cursor: "pointer" }}>
                  📄 Xem lời thoại (transcription)
                </summary>
                <div style={{ marginTop: "0.4rem", background: C.cream, borderRadius: 9, padding: "0.55rem 0.7rem", fontSize: "0.74rem", color: C.ink, lineHeight: 1.75, fontFamily: "Georgia,serif" }}>
                  {coTrack.sentences?.map((l, i) => <div key={i} style={{ marginBottom: 3 }}>{l}</div>)}
                </div>
              </details>
            </div>
          </section>
        )}

        {/* 2 — Compréhension des écrits */}
        {delf?.ce?.length > 0 && (
          <section style={{ marginBottom: "1.2rem" }}>
            <SkillHeader tag="CE" title="Compréhension des écrits" points="6 points" color={SKILL_COLORS.CE} />
            <CahierExercises exercises={delf.ce} color={SKILL_COLORS.CE} defaultOpen />
          </section>
        )}

        {/* 3 & 4 — Production */}
        {delf?.production?.map((p, i) => (
          <section key={i} style={{ marginBottom: "1.2rem" }}>
            <SkillHeader
              tag={p.skill.includes("écrite") ? "PE" : "PO"}
              title={p.skill}
              points={p.points}
              color={p.skill.includes("écrite") ? SKILL_COLORS.PE : SKILL_COLORS.PO}
            />
            <ProductionCard p={p} color={p.skill.includes("écrite") ? SKILL_COLORS.PE : SKILL_COLORS.PO} />
          </section>
        ))}

        {/* Done */}
        {coTrack && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.5rem" }}>
            {isDone ? (
              <>
                <span style={{ background: C.green, color: "#fff", borderRadius: 20, padding: "0.15rem 0.6rem", fontSize: "0.66rem", fontWeight: 700 }}>✓ Đã làm</span>
                <button onClick={() => { unmarkSubDone(unitId, "ecouter", coTrack.id); refresh(); }}
                  style={{ background: C.white, color: C.green, border: `1px solid ${C.green}66`, borderRadius: 20, padding: "0.15rem 0.6rem", fontSize: "0.66rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  ↻ Làm lại
                </button>
              </>
            ) : (
              <button onClick={() => { markSubDone(unitId, "ecouter", coTrack.id); refresh(); }}
                style={{ background: C.white, color: C.blue, border: `1.5px solid ${C.blue}66`, borderRadius: 20, padding: "0.25rem 0.8rem", fontSize: "0.7rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                ✓ Đánh dấu đã làm xong
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
