import { useState, useEffect } from "react";
import { C } from "../constants.js";
import ProductionBox from "./ProductionBox.jsx";
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
// Production is graded by AI against the DELF A2 criteria — there is no answer
// key for something you wrote yourself. The cahier's model answer stays behind
// a reveal so it can't be copied before attempting.
//
// The speaking task dictates through the browser's speech recognition, so what
// gets graded is what you actually said, not what you typed.

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

function ProductionCard({ p, color, unitId }) {
  const isOral = p.skill.includes("orale");
  const [shown, setShown] = useState(false);

  return (
    <div style={{
      background: C.white, border: `1px solid ${C.border}`,
      borderLeft: `3px solid ${color}`, borderRadius: 10,
      padding: "0.75rem 0.85rem", marginBottom: "0.6rem",
    }}>
      <div style={{ fontSize: "0.78rem", color: C.ink, lineHeight: 1.6, fontWeight: 600 }}>{p.prompt}</div>
      <div style={{ fontSize: "0.7rem", color: C.gray, lineHeight: 1.55, marginTop: "0.3rem" }}>{p.vi}</div>

      <div style={{ marginTop: "0.6rem" }}>
        <ProductionBox
          task={p.prompt}
          mode={isOral ? "oral" : "ecrit"}
          cefr="A2"
          color={color}
          minWords={isOral ? 0 : 60}
          examMode
          storageKey={`delf_draft_${unitId}_${isOral ? "po" : "pe"}`}
        />
      </div>

      {/* Model answer, deliberately behind a reveal */}
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
        💡 Tự làm và nhờ AI chấm trước, rồi mới mở bài mẫu để so.
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

  const unit = units.find(u => u.id === unitId) || units[0];
  const delf = cahier?.[unitId]?.delf;
  // Only used to key progress: the DELF card scores under the livre's DELF
  // listening sub-lesson so the unit tally stays at 38.
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

        {/* 1 — Compréhension de l'oral (livre) */}
        {delf?.coLivre?.length > 0 && (
          <section style={{ marginBottom: "1.2rem" }}>
            <SkillHeader tag="CO" title="Compréhension de l'oral — Livre" points="6 points" color={SKILL_COLORS.CO} />
            <CahierExercises exercises={delf.coLivre} color={SKILL_COLORS.CO} defaultOpen />
          </section>
        )}

        {/* 1b — the cahier's own listening exam */}
        {delf?.co?.length > 0 && (
          <section style={{ marginBottom: "1.2rem" }}>
            <SkillHeader tag="CO" title="Compréhension de l'oral — Cahier" points="6 points" color={SKILL_COLORS.CO} />
            <CahierExercises exercises={delf.co} color={SKILL_COLORS.CO} defaultOpen />
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
            <ProductionCard p={p} color={p.skill.includes("écrite") ? SKILL_COLORS.PE : SKILL_COLORS.PO} unitId={unitId} />
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
