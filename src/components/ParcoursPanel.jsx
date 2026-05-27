import { useState, useCallback } from "react";
import { C } from "../constants.js";
import { PARCOURS_UNITS, STEP_GROUPS, STEP_DEFS } from "../data/parcoursData.js";
import {
  computeUnitStatuses,
  computeOverallProgress,
  getUnitStepProgress,
  markStepDone,
} from "../utils/parcours.js";

// ── Helpers ────────────────────────────────────────────────────

function statusColor(status) {
  return { done: C.green, current: C.accent, next: C.blue, locked: C.gray }[status] || C.gray;
}

// ── Unit List ──────────────────────────────────────────────────

function UnitList({ onSelect }) {
  const statuses = computeUnitStatuses();
  const overall  = computeOverallProgress();

  const doneCount    = PARCOURS_UNITS.filter(u => statuses[u.id]?.status === "done").length;
  const currentCount = PARCOURS_UNITS.filter(u => statuses[u.id]?.status === "current").length;

  return (
    <div style={{ padding: "1rem", animation: "fadeUp 0.3s ease" }}>

      {/* ── Hero card ── */}
      <div style={{
        background: C.white, border: `1.5px solid ${C.border}`,
        borderRadius: 16, padding: 16, marginBottom: 20,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12, gap: 12 }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: C.gray, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              NIVEAU CEFR
            </div>
            <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 22, fontWeight: 700, color: C.ink, lineHeight: 1.1, marginTop: 3 }}>
              A1 · Débutant
            </div>
            <div style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>Édito A1 · Didier FLE</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 28, fontWeight: 700, color: C.blue, lineHeight: 1 }}>
              {overall.pct}<span style={{ fontSize: 14, color: C.gray, fontWeight: 400 }}>%</span>
            </div>
            <div style={{ fontSize: 11, color: C.gray, marginTop: 3 }}>
              {doneCount} / {PARCOURS_UNITS.length} units
            </div>
          </div>
        </div>

        <div style={{ height: 6, background: C.cream, borderRadius: 999, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${overall.pct}%`,
            background: `linear-gradient(90deg, ${C.blue}, ${C.accent})`,
            borderRadius: 999, transition: "width 0.5s ease",
          }}/>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontSize: 11.5 }}>
          <span><b style={{ color: C.green }}>{doneCount}</b> <span style={{ color: C.gray }}>xong</span></span>
          <span><b style={{ color: C.accent }}>{currentCount}</b> <span style={{ color: C.gray }}>đang học</span></span>
          <span><b style={{ color: C.gray2 }}>{PARCOURS_UNITS.length - doneCount - currentCount}</b> <span style={{ color: C.gray }}>chưa học</span></span>
        </div>
      </div>

      {/* ── Units timeline ── */}
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, fontWeight: 600, color: C.gray, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
        Units · {PARCOURS_UNITS.length} bài
      </div>

      <div style={{ position: "relative" }}>
        {/* vertical timeline line */}
        <div style={{ position: "absolute", left: 16, top: 8, bottom: 8, width: 1.5, background: C.border, zIndex: 0 }}/>

        {PARCOURS_UNITS.map((u) => {
          const { status, pct } = statuses[u.id] || { status: "next", pct: 0 };
          const isDone    = status === "done";
          const isCurrent = status === "current";
          const color     = statusColor(status);

          return (
            <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 9, position: "relative", zIndex: 1 }}>
              {/* dot */}
              <div style={{
                width: 33, height: 33, borderRadius: "50%", flexShrink: 0,
                background: isDone ? C.green : isCurrent ? C.accent : C.white,
                border: `2px solid ${isDone ? C.green : isCurrent ? C.accent : C.border}`,
                color: isDone || isCurrent ? "#fff" : C.gray2,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 700, fontSize: 13,
                boxShadow: isCurrent ? `0 0 0 4px ${C.accent}22` : "none",
              }}>
                {isDone ? "✓" : u.num}
              </div>

              {/* card */}
              <button
                onClick={() => { localStorage.setItem("parcours_last_unit", u.id); onSelect(u.id); }}
                style={{
                  flex: 1, minWidth: 0, textAlign: "left",
                  background: isCurrent ? "#FFF0EF" : C.white,
                  border: `1px solid ${isCurrent ? C.accent + "55" : C.border}`,
                  borderRadius: 11, padding: "9px 12px",
                  cursor: "pointer",
                  transition: "all 0.15s", fontFamily: "inherit",
                }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 6 }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{
                      fontFamily: "'Playfair Display',Georgia,serif",
                      fontWeight: 700, fontSize: 14.5, color: C.ink, lineHeight: 1.15,
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      {u.emoji} {u.fr}
                    </div>
                    <div style={{ fontSize: 11, color: C.gray, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {u.vi} · {u.grammar}
                    </div>
                  </div>
                  {isCurrent && (
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: C.accent, fontWeight: 700, flexShrink: 0 }}>
                      {pct}%
                    </span>
                  )}
                  {!isCurrent && (
                    <span style={{ fontSize: 12, color: isDone ? C.green : C.blue, flexShrink: 0 }}>›</span>
                  )}
                </div>
                {isCurrent && (
                  <div style={{ height: 3, background: "rgba(232,87,74,0.15)", borderRadius: 999, marginTop: 7, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: C.accent, borderRadius: 999 }}/>
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Step Card ──────────────────────────────────────────────────

function StepCard({ step, done, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", flexDirection: "column", alignItems: "flex-start",
        gap: "0.3rem",
        padding: "0.75rem 0.8rem",
        background: done ? "#F0FDF4" : C.white,
        border: `1.5px solid ${done ? "#86EFAC" : C.border}`,
        borderRadius: 12, cursor: "pointer",
        textAlign: "left", fontFamily: "inherit",
        transition: "all 0.15s", position: "relative",
      }}
    >
      {/* done badge */}
      {done && (
        <span style={{
          position: "absolute", top: 6, right: 8,
          fontSize: "0.65rem", color: "#16A34A",
          fontWeight: 700,
        }}>✓</span>
      )}

      {/* icon */}
      <span style={{
        width: 32, height: 32, borderRadius: 9,
        background: done ? `${step.color}20` : `${step.color}18`,
        border: `1.5px solid ${step.color}40`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1rem", flexShrink: 0,
      }}>
        {step.icon}
      </span>

      {/* text */}
      <div>
        <div style={{ fontWeight: 700, fontSize: "0.79rem", color: done ? "#15803D" : C.ink, lineHeight: 1.2 }}>
          {step.kind}
        </div>
        <div style={{ fontSize: "0.65rem", color: C.gray, marginTop: 1, lineHeight: 1.3 }}>
          {step.sub}
        </div>
      </div>
    </button>
  );
}

// ── Unit Detail ────────────────────────────────────────────────

function UnitDetail({ unitId, onBack, onNavigate }) {
  const unit     = PARCOURS_UNITS.find(u => u.id === unitId);
  const unitIdx  = PARCOURS_UNITS.findIndex(u => u.id === unitId);
  const [progress, setProgress] = useState(() => getUnitStepProgress(unitId));

  const doneCount = STEP_DEFS.filter(s => progress[s.id]).length;
  const pct       = Math.round((doneCount / STEP_DEFS.length) * 100);

  const handleStep = useCallback((step) => {
    // Mark as done & refresh progress display
    if (!progress[step.id]) {
      markStepDone(unitId, step.id);
      setProgress(getUnitStepProgress(unitId));
    }

    localStorage.setItem("parcours_back", "1");

    if (step.refTab) {
      // Deep-link: open ReferenceHub at specific tab & pre-select unit
      localStorage.setItem("parcours_unit_idx", String(unitIdx));
      // Opens ReferenceHub at a specific sub-tab
      localStorage.setItem("parcours_ref_tab", step.refTab);
      onNavigate(step.section, step.view);
    } else if (step.id === "vocab") {
      localStorage.setItem("parcours_unit_idx", String(unitIdx));
      onNavigate("vocab", "edito");
    } else if (step.id === "grammar") {
      localStorage.setItem("parcours_back", "1");
      onNavigate("grammar", "grammar");
    } else if (step.id === "lecture") {
      localStorage.setItem("parcours_back", "1");
      onNavigate("lecture", "lecture");
    } else if (step.id === "ecouter") {
      onNavigate("dictee", "ecouter");
    } else if (step.id === "ecrire") {
      onNavigate("writing", "writing");
    } else if (step.id === "parler") {
      onNavigate("conversation", "conversation");
    } else if (step.id === "quiz") {
      localStorage.setItem("parcours_quiz_unit", unitId);
      onNavigate("quiz-unit", "quiz-unit");
    } else {
      onNavigate(step.section, step.view);
    }
  }, [unitId, unitIdx, progress, onNavigate]);

  // First undone step for the CTA
  const nextStep = STEP_DEFS.find(s => !progress[s.id]);

  if (!unit) return null;

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>

      {/* ── Sticky header ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: `linear-gradient(135deg, ${C.ink} 0%, #2d4f8a 100%)`,
        padding: "12px 16px 10px",
      }}>
        <button
          onClick={onBack}
          style={{
            background: "rgba(255,255,255,0.15)", border: "none",
            color: "#fff", fontSize: "0.75rem", fontWeight: 600,
            cursor: "pointer", padding: "0.2rem 0.6rem",
            borderRadius: 20, marginBottom: 8,
            fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4,
          }}>
          ← Tất cả units
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, letterSpacing: "0.15em", opacity: 0.55, color: "#fff" }}>
              UNIT {unit.num} · A1 ÉDITO
            </div>
            <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 22, fontWeight: 700, color: "#fff", lineHeight: 1.1, marginTop: 3 }}>
              {unit.emoji} {unit.fr}
            </div>
            <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.65)", marginTop: 3 }}>{unit.vi}</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 24, fontWeight: 700, color: "#fff" }}>
              {pct}<span style={{ fontSize: 12, opacity: 0.7 }}>%</span>
            </div>
            <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.6)" }}>
              {doneCount}/{STEP_DEFS.length} bài
            </div>
          </div>
        </div>

        {/* progress bar */}
        <div style={{ height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${pct}%`,
            background: pct === 100 ? C.green : C.accent,
            borderRadius: 999, transition: "width 0.4s ease",
          }}/>
        </div>

        {/* grammar note */}
        <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.55)", marginTop: 6 }}>
          ⚜️ {unit.grammar}
        </div>
      </div>

      {/* ── Step groups ── */}
      <div style={{ padding: "1rem" }}>
        {STEP_GROUPS.map(group => (
          <div key={group.id} style={{ marginBottom: "1.2rem" }}>

            {/* group header */}
            <div style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              marginBottom: "0.55rem",
            }}>
              <span style={{ fontSize: "0.95rem" }}>{group.emoji}</span>
              <span style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: "0.68rem", fontWeight: 700,
                color: C.gray, letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}>
                {group.label}
              </span>
              <span style={{ fontSize: "0.65rem", color: C.gray2, marginLeft: "auto" }}>
                {group.steps.filter(s => progress[s.id]).length}/{group.steps.length}
              </span>
            </div>

            {/* step cards grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: group.steps.length === 1 ? "1fr" : "repeat(2, 1fr)",
              gap: "0.5rem",
            }}>
              {group.steps.map(step => (
                <StepCard
                  key={step.id}
                  step={step}
                  done={!!progress[step.id]}
                  onClick={() => handleStep(step)}
                />
              ))}
            </div>
          </div>
        ))}

        {/* ── CTA ── */}
        {pct < 100 && nextStep && (
          <button
            onClick={() => handleStep(nextStep)}
            style={{
              width: "100%", padding: "13px 16px",
              background: C.ink, color: "#fff",
              border: "none", borderRadius: 14,
              fontFamily: "inherit", fontSize: 14, fontWeight: 700,
              cursor: "pointer",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              transition: "opacity 0.15s", marginTop: "0.5rem",
            }}>
            <span>Tiếp tục · {nextStep.icon} {nextStep.kind}</span>
            <span>→</span>
          </button>
        )}
        {pct === 100 && (
          <div style={{
            textAlign: "center", padding: "16px 0",
            fontSize: 14, color: C.green, fontWeight: 700,
          }}>
            🎉 Unit hoàn thành!
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────

export default function ParcoursPanel({ onNavigate }) {
  const [selectedUnit, setSelectedUnit] = useState(() =>
    localStorage.getItem("parcours_last_unit") || null
  );

  if (selectedUnit) {
    return (
      <UnitDetail
        unitId={selectedUnit}
        onBack={() => { setSelectedUnit(null); localStorage.removeItem("parcours_last_unit"); }}
        onNavigate={onNavigate}
      />
    );
  }
  return <UnitList onSelect={setSelectedUnit} />;
}
