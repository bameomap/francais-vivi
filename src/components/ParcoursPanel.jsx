import { useState, useCallback } from "react";
import { C } from "../constants.js";
import { PARCOURS_UNITS, STEP_DEFS } from "../data/parcoursData.js";
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
  const lockedCount  = PARCOURS_UNITS.filter(u => ["locked","next"].includes(statuses[u.id]?.status)).length;

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
          <span><b style={{ color: C.gray2 }}>{lockedCount}</b> <span style={{ color: C.gray }}>chưa mở</span></span>
        </div>
      </div>

      {/* ── Units timeline ── */}
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, fontWeight: 600, color: C.gray, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
        Units
      </div>

      <div style={{ position: "relative" }}>
        {/* vertical timeline line */}
        <div style={{ position: "absolute", left: 16, top: 8, bottom: 8, width: 1.5, background: C.border, zIndex: 0 }}/>

        {PARCOURS_UNITS.map((u) => {
          const { status, pct } = statuses[u.id] || { status: "locked", pct: 0 };
          const isDone    = status === "done";
          const isCurrent = status === "current";
          const isLocked  = status === "locked";
          const color     = statusColor(status);

          return (
            <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 9, position: "relative", zIndex: 1 }}>
              {/* dot */}
              <div style={{
                width: 33, height: 33, borderRadius: "50%", flexShrink: 0,
                background: isDone ? C.green : isCurrent ? C.accent : C.white,
                border: `2px solid ${isLocked ? C.border : color}`,
                color: isDone || isCurrent ? "#fff" : isLocked ? C.gray2 : color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 700, fontSize: 13,
                boxShadow: isCurrent ? `0 0 0 4px ${C.accent}22` : "none",
              }}>
                {isDone ? "✓" : isLocked ? "·" : u.num}
              </div>

              {/* card */}
              <button
                disabled={isLocked}
                onClick={() => onSelect(u.id)}
                style={{
                  flex: 1, minWidth: 0, textAlign: "left",
                  background: isCurrent ? "#FFF0EF" : C.white,
                  border: `1px solid ${isCurrent ? C.accent + "55" : C.border}`,
                  borderRadius: 11, padding: "9px 12px",
                  opacity: isLocked ? 0.5 : 1,
                  cursor: isLocked ? "default" : "pointer",
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
                      {u.vi}
                    </div>
                  </div>
                  {isCurrent && (
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: C.accent, fontWeight: 700, flexShrink: 0 }}>
                      {pct}%
                    </span>
                  )}
                  {!isLocked && !isCurrent && !isDone && (
                    <span style={{ fontSize: 12, color: C.blue, flexShrink: 0 }}>›</span>
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

// ── Unit Detail ────────────────────────────────────────────────

function UnitDetail({ unitId, onBack, onNavigate }) {
  const unit      = PARCOURS_UNITS.find(u => u.id === unitId);
  const [progress, setProgress] = useState(() => getUnitStepProgress(unitId));

  const doneCount = STEP_DEFS.filter(s => progress[s.id]).length;
  const pct       = Math.round((doneCount / STEP_DEFS.length) * 100);

  const handleStep = useCallback((step) => {
    if (!progress[step.id]) {
      markStepDone(unitId, step.id);
      setProgress(getUnitStepProgress(unitId));
    }
    const unitIdx = PARCOURS_UNITS.findIndex(u => u.id === unitId);
    if (step.id === "vocab") {
      localStorage.setItem("parcours_unit_idx", String(unitIdx));
      onNavigate("vocab", "edito");
    } else if (step.id === "grammar") {
      localStorage.setItem("parcours_unit_idx", String(unitIdx));
      onNavigate("grammar", "grammar");
    } else if (step.id === "lecture") {
      localStorage.setItem("parcours_writing_idx", String(Math.max(0, unitIdx - 1)));
      onNavigate("writing", "writing");
    } else if (step.id === "parler") {
      localStorage.setItem("parcours_unit_idx", String(unitIdx));
      onNavigate("conversation", "conversation");
    } else if (step.id === "ecouter") {
      onNavigate("dictee", "dictee");
    } else {
      onNavigate(step.view, step.view);
    }
  }, [unitId, progress, onNavigate]);

  // Compute per-step status: done > current (first undone) > locked
  const firstUndone = STEP_DEFS.find(s => !progress[s.id]);
  const getStepStatus = (step) => {
    if (progress[step.id]) return "done";
    if (step.id === firstUndone?.id) return "current";
    return "locked";
  };

  const currentStep = STEP_DEFS.find(s => getStepStatus(s) === "current");

  if (!unit) return null;

  return (
    <div style={{ padding: "1rem", animation: "fadeUp 0.3s ease" }}>

      {/* back link */}
      <button
        onClick={onBack}
        style={{ background: "transparent", border: "none", color: C.blue, fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", padding: 0, marginBottom: 14, display: "flex", alignItems: "center", gap: 4, fontFamily: "inherit" }}>
        ← Tất cả units
      </button>

      {/* Unit hero */}
      <div style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 16, overflow: "hidden", marginBottom: 16 }}>
        <div style={{
          background: `linear-gradient(135deg, ${C.ink} 0%, #2d4f8a 100%)`,
          padding: "18px 16px 14px", color: "#fff", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", right: -20, top: -20, width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle, #E8574A18 0%, transparent 70%)" }}/>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.15em", opacity: 0.6, marginBottom: 5 }}>
            UNIT {unit.num} / {PARCOURS_UNITS.length - 1} · A1
          </div>
          <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 26, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: 3 }}>
            {unit.emoji} {unit.fr}
          </div>
          <div style={{ fontSize: 12, opacity: 0.75 }}>{unit.vi}</div>
        </div>

        <div style={{ padding: "12px 16px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ flex: 1, height: 5, background: C.cream, borderRadius: 999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: C.accent, borderRadius: 999, transition: "width 0.4s ease" }}/>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: C.accent, fontWeight: 700 }}>
              {pct}%
            </span>
          </div>
          <div style={{ fontSize: 11.5, color: C.gray, marginTop: 6 }}>
            Ngữ pháp: <span style={{ color: C.ink2, fontWeight: 600 }}>{unit.grammar}</span>
          </div>
        </div>
      </div>

      {/* Steps list */}
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, fontWeight: 600, color: C.gray, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
        Bài học theo thứ tự
      </div>

      <div style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 14 }}>
        {STEP_DEFS.map((step, i) => {
          const stepStatus = getStepStatus(step);
          const isDone     = stepStatus === "done";
          const isCurrent  = stepStatus === "current";
          const isLocked   = stepStatus === "locked";

          return (
            <button
              key={step.id}
              disabled={isLocked}
              onClick={() => handleStep(step)}
              style={{
                width: "100%", textAlign: "left", fontFamily: "inherit",
                display: "flex", alignItems: "center", gap: 12,
                padding: "11px 14px",
                borderBottom: i < STEP_DEFS.length - 1 ? `1px solid ${C.borderSoft || "#EEF2FA"}` : "none",
                background: isCurrent ? C.cream : "transparent",
                opacity: isLocked ? 0.5 : 1,
                cursor: isLocked ? "default" : "pointer",
                border: "none", borderRadius: 0,
                borderBottom: i < STEP_DEFS.length - 1 ? `1px solid ${C.borderSoft || "#EEF2FA"}` : "none",
                transition: "background 0.15s",
              }}>
              {/* icon badge */}
              <div style={{
                width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                background: isDone ? C.greenL || "#ECFDF5" : isCurrent ? C.white : "#F1F5F9",
                border: `1.5px solid ${isDone ? C.green : isCurrent ? step.color : C.border}`,
                color: isDone ? C.green : isCurrent ? step.color : C.gray2,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 700, fontSize: 14,
              }}>
                {isDone ? "✓" : step.icon}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "nowrap" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: C.gray, letterSpacing: "0.06em", flexShrink: 0 }}>
                    STEP {i + 1}
                  </span>
                  {isCurrent && (
                    <span style={{ fontSize: 9, background: C.accent, color: "#fff", borderRadius: 999, padding: "1px 6px", fontWeight: 700, letterSpacing: "0.05em", whiteSpace: "nowrap", flexShrink: 0 }}>
                      ĐANG HỌC
                    </span>
                  )}
                </div>
                <div style={{ fontWeight: 700, fontSize: 13.5, color: C.ink, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {step.kind}
                </div>
                <div style={{ fontSize: 11, color: C.gray, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {step.sub}
                </div>
              </div>

              <div style={{ fontSize: 14, color: isLocked ? C.gray2 : C.ink, flexShrink: 0 }}>
                {isLocked ? "🔒" : isDone ? "" : "›"}
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      {currentStep && (
        <button
          onClick={() => handleStep(currentStep)}
          style={{
            width: "100%", padding: "13px 16px",
            background: C.ink, color: "#fff",
            border: "none", borderRadius: 14,
            fontFamily: "inherit", fontSize: 14, fontWeight: 700,
            cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
            transition: "opacity 0.15s",
          }}>
          <span>Tiếp tục · {currentStep.kind}</span>
          <span>→</span>
        </button>
      )}
      {!currentStep && (
        <div style={{ textAlign: "center", padding: "16px 0", fontSize: 14, color: C.green, fontWeight: 700 }}>
          ✓ Unit hoàn thành!
        </div>
      )}
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────

export default function ParcoursPanel({ onNavigate }) {
  const [selectedUnit, setSelectedUnit] = useState(null);

  if (selectedUnit) {
    return (
      <UnitDetail
        unitId={selectedUnit}
        onBack={() => setSelectedUnit(null)}
        onNavigate={onNavigate}
      />
    );
  }
  return <UnitList onSelect={setSelectedUnit} />;
}
