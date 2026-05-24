import { useState } from "react";
import { C } from "../constants.js";
import { EDITO_GRAMMAR } from "../data/editoGrammar.js";

// ── Accordion card ────────────────────────────────────────────
function GrammarCard({ point, isOpen, onToggle }) {
  return (
    <div style={{
      border: `1px solid ${isOpen ? C.blue + "55" : C.border}`,
      borderRadius: 12, overflow: "hidden", background: C.white,
      transition: "border-color 0.15s",
    }}>
      {/* Header row */}
      <div
        onClick={onToggle}
        style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "0.7rem 0.9rem", cursor: "pointer",
          background: isOpen ? C.blueL : C.white,
          transition: "background 0.15s",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          {(() => {
            const dashIdx = point.topic.indexOf(" — ");
            const vi = dashIdx >= 0 ? point.topic.slice(0, dashIdx) : point.topic;
            const fr = dashIdx >= 0 ? point.topic.slice(dashIdx + 3) : null;
            return (
              <div style={{ fontSize: "0.85rem", fontWeight: 600, lineHeight: 1.3 }}>
                <span style={{ color: C.blue }}>{vi}</span>
                {fr && (
                  <>
                    <span style={{ color: C.gray, fontWeight: 400 }}> &mdash; </span>
                    <span style={{ color: "#C0392B" }}>{fr}</span>
                  </>
                )}
              </div>
            );
          })()}
        </div>
        <div style={{
          width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
          background: isOpen ? C.blue : "transparent",
          border: `1.5px solid ${isOpen ? C.blue : C.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: isOpen ? "#fff" : C.gray, fontSize: "0.72rem",
          transition: "all 0.15s",
        }}>
          {isOpen ? "▲" : "▼"}
        </div>
      </div>

      {/* Expanded content */}
      {isOpen && (
        <div style={{ borderTop: `1px solid ${C.border}`, animation: "fadeUp 0.2s ease" }}>
          {/* Rule text */}
          <div style={{ padding: "0.8rem 1rem 0.5rem" }}>
            {point.rule.split("\n").map((line, i) => {
              const trimmed    = line.trim();
              const isHeader   = trimmed === trimmed.toUpperCase() && trimmed.length > 3 && /[A-ZÀ-ÿ]/.test(trimmed);
              const isWarning  = trimmed.startsWith("⚠️");
              const isTip      = trimmed.startsWith("💡");
              const isBullet   = trimmed.startsWith("•");
              const isOk       = trimmed.startsWith("✅");
              const isWrong    = trimmed.startsWith("❌");
              const isNumbered = /^\d+\./.test(trimmed);

              const renderLine = () => {
                if (isNumbered && line.includes(":")) {
                  const colonIdx = line.indexOf(":");
                  return (
                    <>
                      <span style={{ color: "#C0392B", fontWeight: 600 }}>{line.slice(0, colonIdx)}</span>
                      <span>{line.slice(colonIdx)}</span>
                    </>
                  );
                }
                return line || " ";
              };

              return (
                <div key={i} style={{
                  fontSize: isHeader ? "0.62rem" : "0.8rem",
                  fontWeight: isHeader ? 700 : 400,
                  color: isWarning ? "#E67E22" : isTip ? "#0891B2" : isOk ? "#059669" : isWrong ? "#DC2626" : isHeader ? C.gray : C.ink,
                  letterSpacing: isHeader ? "0.1em" : 0,
                  textTransform: isHeader ? "uppercase" : "none",
                  fontFamily: isBullet || isOk || isWrong ? "Georgia, serif" : "inherit",
                  lineHeight: 1.65,
                  marginTop: isHeader && i > 0 ? "0.6rem" : 0,
                  paddingLeft: isBullet ? "0.2rem" : 0,
                }}>
                  {renderLine()}
                </div>
              );
            })}
          </div>

          {/* Examples */}
          {point.examples?.length > 0 && (
            <div style={{ padding: "0.4rem 1rem 0.9rem", borderTop: `1px dashed ${C.border}` }}>
              <div style={{
                fontSize: "0.58rem", fontWeight: 700, color: C.gray,
                textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6,
              }}>
                Ví dụ
              </div>
              {point.examples.map((ex, i) => {
                const dashIdx = ex.indexOf(" — ");
                const fr = dashIdx >= 0 ? ex.slice(0, dashIdx) : ex;
                const vi = dashIdx >= 0 ? ex.slice(dashIdx + 3) : null;
                return (
                  <div key={i} style={{
                    display: "flex", gap: 6, paddingBottom: "0.35rem",
                    borderBottom: i < point.examples.length - 1 ? `1px solid ${C.border}` : "none",
                    marginBottom: i < point.examples.length - 1 ? "0.35rem" : 0,
                  }}>
                    <span style={{ fontFamily: "Georgia,serif", fontSize: "0.82rem", color: C.blue, flex: "0 0 auto", maxWidth: "52%" }}>
                      {fr}
                    </span>
                    {vi && (
                      <span style={{ fontSize: "0.75rem", color: C.gray, flex: 1 }}>
                        &rarr; {vi}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────
export default function EditoGrammarPanel() {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [openCard,     setOpenCard]     = useState(null);

  const unitData = selectedUnit ? EDITO_GRAMMAR.find(u => u.id === selectedUnit) : null;

  const selectUnit = (id) => { setSelectedUnit(id); setOpenCard(null); };
  const goBack     = ()   => { setSelectedUnit(null); setOpenCard(null); };
  const toggleCard = (key) => setOpenCard(prev => prev === key ? null : key);

  const EMOJIS = { g0:"👋", g1:"🪪", g2:"🏘️", g3:"🥐", g4:"🗺️", g5:"👗", g6:"📅", g7:"🏠", g8:"💪", g9:"🌴", g10:"💼" };

  // ── Unit list ───────────────────────────────────────────────
  if (!selectedUnit) return (
    <div style={{ padding: "1rem", animation: "fadeUp 0.3s ease" }}>
      <div style={{
        fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5,
        fontWeight: 600, color: C.gray, letterSpacing: "0.12em",
        textTransform: "uppercase", marginBottom: 4,
      }}>
        Ngữ pháp Édito A1
      </div>
      <div style={{ fontSize: "0.72rem", color: C.gray, marginBottom: 14 }}>
        Chọn unité để xem điểm ngữ pháp
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {EDITO_GRAMMAR.map(u => (
          <button key={u.id} onClick={() => selectUnit(u.id)}
            style={{
              background: C.white, border: `1px solid ${C.border}`,
              borderRadius: 14, padding: "12px 14px",
              display: "flex", alignItems: "center", gap: 12,
              textAlign: "left", cursor: "pointer", fontFamily: "inherit",
              transition: "all 0.15s", width: "100%",
            }}
            className="card-hover"
          >
            <div style={{
              width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
              background: C.blueL, border: `1.5px solid ${C.blue}44`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Playfair Display',Georgia,serif",
              fontWeight: 700, fontSize: 14, color: C.blue,
            }}>
              {u.num}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: "'Playfair Display',Georgia,serif",
                fontWeight: 700, fontSize: 14.5, color: C.ink, lineHeight: 1.2,
              }}>
                {EMOJIS[u.id]} {u.title}
              </div>
              <div style={{ fontSize: 10.5, color: C.blue, marginTop: 2, fontWeight: 600 }}>
                {u.points.length} điểm ngữ pháp
              </div>
            </div>

            <span style={{ color: C.gray2, fontSize: 18, flexShrink: 0 }}>&rsaquo;</span>
          </button>
        ))}
      </div>
    </div>
  );

  // ── Unit detail ─────────────────────────────────────────────
  return (
    <div style={{ animation: "fadeUp 0.25s ease" }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "0.7rem 1rem 0.6rem",
        borderBottom: `1px solid ${C.border}`, background: C.white,
      }}>
        <button onClick={goBack} style={{
          background: C.blueL, border: `1.5px solid ${C.blue}33`,
          color: C.blue, cursor: "pointer", fontSize: "0.82rem",
          padding: "0.28rem 0.65rem", borderRadius: 10,
          fontWeight: 600, flexShrink: 0, fontFamily: "inherit",
        }}>
          &larr; Quay lại
        </button>

        <div style={{
          width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
          background: C.blue, display: "flex", alignItems: "center",
          justifyContent: "center", fontWeight: 700, fontSize: 13, color: "#fff",
          fontFamily: "'Playfair Display',Georgia,serif",
        }}>
          {unitData.num}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "'Playfair Display',Georgia,serif",
            fontWeight: 700, fontSize: 14.5, color: C.ink, lineHeight: 1.15,
          }}>
            {EMOJIS[unitData.id]} {unitData.title}
          </div>
          <div style={{ fontSize: 10.5, color: C.blue, fontWeight: 600 }}>
            {unitData.points.length} điểm ngữ pháp
          </div>
        </div>
      </div>

      {/* Cards */}
      <div style={{ padding: "0.75rem 1rem 4rem", display: "flex", flexDirection: "column", gap: 8 }}>
        {unitData.points.map((pt, i) => {
          const key = `${selectedUnit}-${i}`;
          return (
            <GrammarCard
              key={key}
              point={pt}
              isOpen={openCard === key}
              onToggle={() => toggleCard(key)}
            />
          );
        })}
      </div>
    </div>
  );
}
