import { useState, useCallback } from "react";
import { C } from "../constants.js";
import { PARCOURS_UNITS, STEP_GROUPS, STEP_DEFS } from "../data/parcoursData.js";
import {
  computeUnitStatuses,
  computeOverallProgress,
  getStepStat,
  unmarkStepDone,
  resetUnit,
} from "../utils/parcours.js";

// ── Helpers ────────────────────────────────────────────────────

function statusColor(status) {
  return { done: C.green, current: C.accent, next: C.blue, locked: C.gray }[status] || C.gray;
}

// ── Unit List ──────────────────────────────────────────────────

function UnitList({ onSelect, units, levelTitle, book, lastUnitKey }) {
  const statuses = computeUnitStatuses(units);
  const overall  = computeOverallProgress(units);

  const doneCount    = units.filter(u => statuses[u.id]?.status === "done").length;
  const currentCount = units.filter(u => statuses[u.id]?.status === "current").length;

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
              {levelTitle}
            </div>
            <div style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>{book}</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 28, fontWeight: 700, color: C.blue, lineHeight: 1 }}>
              {overall.pct}<span style={{ fontSize: 14, color: C.gray, fontWeight: 400 }}>%</span>
            </div>
            <div style={{ fontSize: 11, color: C.gray, marginTop: 3 }}>
              {doneCount} / {units.length} units
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
          <span><b style={{ color: C.gray2 }}>{units.length - doneCount - currentCount}</b> <span style={{ color: C.gray }}>chưa học</span></span>
        </div>
      </div>

      {/* ── Units timeline ── */}
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, fontWeight: 600, color: C.gray, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
        Units · {units.length} bài
      </div>

      <div style={{ position: "relative" }}>
        {/* vertical timeline line */}
        <div style={{ position: "absolute", left: 16, top: 8, bottom: 8, width: 1.5, background: C.border, zIndex: 0 }}/>

        {units.map((u) => {
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
                onClick={() => { localStorage.setItem(lastUnitKey, u.id); onSelect(u.id); }}
                style={{
                  flex: 1, minWidth: 0, textAlign: "left",
                  background: isCurrent ? C.accentL : C.white,
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

function StepCard({ step, stat, isNext, onClick, onRedo }) {
  const { done, total, pct, complete } = stat;
  const partial = done > 0 && !complete;
  // accent color while in progress, green when fully complete
  const tint = complete ? C.green : partial ? C.accent : step.color;

  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", flexDirection: "column", alignItems: "flex-start",
        gap: "0.3rem",
        padding: "0.75rem 0.8rem",
        background: complete ? C.greenL : partial ? `${C.accent}0C` : isNext ? `${step.color}08` : C.white,
        border: `1.5px solid ${complete ? C.green + "88" : partial ? C.accent + "66" : isNext ? step.color : C.border}`,
        borderRadius: 12, cursor: "pointer",
        textAlign: "left", fontFamily: "inherit",
        transition: "all 0.15s", position: "relative",
        boxShadow: isNext && !partial ? `0 2px 8px ${step.color}22` : "none",
      }}
    >
      {/* status badge */}
      {complete ? (
        <span style={{
          position: "absolute", top: 5, right: 7,
          fontSize: "0.58rem", color: "#fff",
          fontWeight: 700, background: C.green,
          borderRadius: 20, padding: "0.1rem 0.4rem",
          lineHeight: 1.5,
        }}>✓ Xong</span>
      ) : partial ? (
        <span style={{
          position: "absolute", top: 5, right: 7,
          fontSize: "0.58rem", color: "#fff",
          fontWeight: 700, background: C.accent,
          borderRadius: 20, padding: "0.1rem 0.4rem",
          lineHeight: 1.5,
        }}>{done}/{total}</span>
      ) : isNext ? (
        <span style={{
          position: "absolute", top: 5, right: 7,
          fontSize: "0.56rem", color: "#fff",
          fontWeight: 700, background: step.color,
          borderRadius: 20, padding: "0.1rem 0.4rem",
          lineHeight: 1.5,
        }}>Tiếp theo</span>
      ) : null}

      {/* icon */}
      <span style={{
        width: 32, height: 32, borderRadius: 9,
        background: complete ? `${C.green}22` : partial ? `${C.accent}1C` : `${step.color}18`,
        border: `1.5px solid ${complete ? C.green + "55" : partial ? C.accent + "55" : step.color + "40"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1rem", flexShrink: 0,
      }}>
        {step.icon}
      </span>

      {/* text */}
      <div>
        <div style={{ fontWeight: 700, fontSize: "0.79rem", color: complete ? C.green : partial ? C.accent : isNext ? step.color : C.ink, lineHeight: 1.2 }}>
          {step.kind}
        </div>
        <div style={{ fontSize: "0.65rem", color: C.gray, marginTop: 1, lineHeight: 1.3 }}>
          {partial ? `${done}/${total} bài · ${pct}%` : step.sub}
        </div>
      </div>

      {/* mini progress bar while in progress */}
      {partial && (
        <div style={{ width: "100%", height: 3, background: `${C.accent}22`, borderRadius: 999, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: C.accent, borderRadius: 999 }}/>
        </div>
      )}

      {/* redo button (when any progress) */}
      {done > 0 && (
        <span
          role="button"
          onClick={(e) => { e.stopPropagation(); onRedo(); }}
          style={{
            fontSize: "0.62rem", fontWeight: 700, color: tint,
            background: C.white, border: `1px solid ${tint}66`,
            borderRadius: 20, padding: "0.15rem 0.55rem",
            marginTop: 2, lineHeight: 1.5,
          }}>
          ↻ Làm lại
        </span>
      )}
    </button>
  );
}

// ── Unit Detail ────────────────────────────────────────────────

function UnitDetail({ unitId, onBack, onNavigate, units, stepGroups, stepDefs, levelLabel }) {
  const unit     = units.find(u => u.id === unitId);
  const unitIdx  = units.findIndex(u => u.id === unitId);
  const [, setTick] = useState(0);
  const refresh = () => setTick(t => t + 1);

  // Per-step fractional progress (recomputed each render)
  const stats = {};
  // A2 cards own a slice of a skill (stepKey + subIds); A1 cards own it whole.
  stepDefs.forEach(s => { stats[s.id] = getStepStat(unitId, s.stepKey || s.id, s.subIds); });

  const subDone  = stepDefs.reduce((a, s) => a + stats[s.id].done, 0);
  const subTotal = stepDefs.reduce((a, s) => a + stats[s.id].total, 0);
  const pct      = subTotal ? Math.round((subDone / subTotal) * 100) : 0;
  const doneSteps = stepDefs.filter(s => stats[s.id].complete).length;

  const handleStep = useCallback((step, { redo = false } = {}) => {
    const key = step.stepKey || step.id;

    if (redo) {
      unmarkStepDone(unitId, key, step.subIds);
      refresh();
      return;
    }

    localStorage.setItem("parcours_back", "1");

    if (step.refTab) {
      // Deep-link: open ReferenceHub at specific tab & pre-select unit
      localStorage.setItem("parcours_unit_idx", String(unitIdx));
      // Opens ReferenceHub at a specific sub-tab
      localStorage.setItem("parcours_ref_tab", step.refTab);
      onNavigate(step.section, step.view);
    } else if (key === "vocab") {
      localStorage.setItem("parcours_unit_idx", String(unitIdx));
      onNavigate("vocab", "edito");
    } else if (key === "grammar") {
      localStorage.setItem("parcours_unit_idx", String(unitIdx));
      onNavigate("grammar", "grammar");
    } else if (key === "lecture") {
      localStorage.setItem("parcours_unit_idx", String(unitIdx));
      onNavigate("lecture", "lecture");
    } else if (key === "ecouter") {
      localStorage.setItem("parcours_unit_idx", String(unitIdx));
      onNavigate("dictee", "ecouter");
    } else if (key === "ecrire") {
      localStorage.setItem("parcours_writing_idx", String(unitIdx));
      onNavigate("writing", "writing");
    } else if (key === "parler") {
      localStorage.setItem("parcours_unit_idx", String(unitIdx));
      onNavigate("conversation", "conversation");
    } else if (key === "quiz") {
      localStorage.setItem("parcours_quiz_unit", unitId);
      onNavigate("quiz-unit", "quiz-unit");
    } else {
      onNavigate(step.section, step.view);
    }
  }, [unitId, unitIdx, onNavigate]);

  // First not-yet-complete step for the CTA
  const nextStep = stepDefs.find(s => !stats[s.id].complete);

  if (!unit) return null;

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>

      {/* ── Sticky header ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: `linear-gradient(135deg, ${C.heroFrom} 0%, ${C.heroTo} 100%)`,
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
              UNIT {unit.num} · {levelLabel}
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
              {doneSteps}/{stepDefs.length} kỹ năng · {subDone}/{subTotal} bài
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
        {stepGroups.map(group => (
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
                {group.steps.filter(s => stats[s.id].complete).length}/{group.steps.length}
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
                  stat={stats[step.id]}
                  isNext={nextStep?.id === step.id}
                  onClick={() => handleStep(step)}
                  onRedo={() => handleStep(step, { redo: true })}
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
              background: C.heroFrom, color: "#fff",
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
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: 14, color: C.green, fontWeight: 700 }}>
              🎉 Unit hoàn thành!
            </div>
            <button
              onClick={() => {
                if (window.confirm("Xoá tiến độ unit này và học lại từ đầu?")) {
                  resetUnit(unitId);
                  refresh();
                }
              }}
              style={{
                marginTop: 10, padding: "8px 18px",
                background: C.white, color: C.gray,
                border: `1.5px solid ${C.border}`, borderRadius: 20,
                fontFamily: "inherit", fontSize: 12.5, fontWeight: 600,
                cursor: "pointer",
              }}>
              ↻ Làm lại cả unit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────

// Everything level-specific arrives as a prop, so Édito A2 reuses this panel
// as-is (see App.jsx). Defaults keep the A1 call sites unchanged.
export default function ParcoursPanel({
  onNavigate,
  units       = PARCOURS_UNITS,
  stepGroups  = STEP_GROUPS,
  stepDefs    = STEP_DEFS,
  levelLabel  = "A1 ÉDITO",
  levelTitle  = "A1 · Débutant",
  book        = "Édito A1 · Didier FLE",
  // Per-level key: otherwise opening A2 would try to restore an A1 unit id
  // that isn't in `units`, and UnitDetail would render nothing.
  lastUnitKey = "parcours_last_unit",
}) {
  const [selectedUnit, setSelectedUnit] = useState(() => {
    const saved = localStorage.getItem(lastUnitKey);
    return units.some(u => u.id === saved) ? saved : null;
  });

  if (selectedUnit) {
    return (
      <UnitDetail
        unitId={selectedUnit}
        onBack={() => { setSelectedUnit(null); localStorage.removeItem(lastUnitKey); }}
        onNavigate={onNavigate}
        units={units}
        stepGroups={stepGroups}
        stepDefs={stepDefs}
        levelLabel={levelLabel}
      />
    );
  }
  return (
    <UnitList
      onSelect={setSelectedUnit}
      units={units}
      levelTitle={levelTitle}
      book={book}
      lastUnitKey={lastUnitKey}
    />
  );
}
