import { useState } from "react";
import { C } from "../constants.js";
import { EDITO_GRAMMAR } from "../data/editoGrammar.js";

const EMOJIS = { g0:"👋", g1:"🪪", g2:"🏘️", g3:"🥐", g4:"🗺️", g5:"👗", g6:"📅", g7:"🏠", g8:"💪", g9:"🌴", g10:"💼" };

// ── Grammar accordion card ────────────────────────────────────
function GrammarCard({ point, isOpen, onToggle }) {
  return (
    <div style={{
      border: `1.5px solid ${isOpen ? C.blue + "55" : C.border}`,
      borderRadius: 12, overflow: "hidden", background: C.white,
      transition: "border-color 0.15s",
    }}>
      <button
        onClick={onToggle}
        style={{
          width:"100%", display:"flex", alignItems:"center", gap:10,
          padding:"0.7rem 0.9rem", cursor:"pointer",
          background: isOpen ? C.blueL : C.white,
          border:"none", textAlign:"left", fontFamily:"inherit",
          transition:"background 0.15s",
        }}
      >
        <div style={{ flex:1, minWidth:0 }}>
          {(() => {
            const dashIdx = point.topic.indexOf(" — ");
            const vi = dashIdx >= 0 ? point.topic.slice(0, dashIdx) : point.topic;
            const fr = dashIdx >= 0 ? point.topic.slice(dashIdx + 3) : null;
            return (
              <div style={{ fontSize:"0.85rem", fontWeight:600, lineHeight:1.3 }}>
                <span style={{ color:C.blue }}>{vi}</span>
                {fr && (
                  <>
                    <span style={{ color:C.gray, fontWeight:400 }}> &mdash; </span>
                    <span style={{ color:"#C0392B" }}>{fr}</span>
                  </>
                )}
              </div>
            );
          })()}
        </div>
        <div style={{
          width:28, height:28, borderRadius:"50%", flexShrink:0,
          background: isOpen ? C.blue : "transparent",
          border:`1.5px solid ${isOpen ? C.blue : C.border}`,
          display:"flex", alignItems:"center", justifyContent:"center",
          color: isOpen ? "#fff" : C.gray, fontSize:"0.72rem",
          transition:"all 0.15s",
        }}>
          {isOpen ? "▲" : "▼"}
        </div>
      </button>

      {isOpen && (
        <div style={{ borderTop:`1px solid ${C.border}`, animation:"fadeUp 0.2s ease" }}>
          <div style={{ padding:"0.8rem 1rem 0.5rem" }}>
            {point.rule.split("\n").map((line, i) => {
              const trimmed   = line.trim();
              const isHeader  = trimmed === trimmed.toUpperCase() && trimmed.length > 3 && /[A-ZÀ-ÿ]/.test(trimmed);
              const isWarning = trimmed.startsWith("⚠️");
              const isTip     = trimmed.startsWith("💡");
              const isBullet  = trimmed.startsWith("•");
              const isOk      = trimmed.startsWith("✅");
              const isWrong   = trimmed.startsWith("❌");
              const isNumb    = /^\d+\./.test(trimmed);
              const renderLine = () => {
                if (isNumb && line.includes(":")) {
                  const ci = line.indexOf(":");
                  return (<><span style={{ color:"#C0392B", fontWeight:600 }}>{line.slice(0,ci)}</span><span>{line.slice(ci)}</span></>);
                }
                return line || " ";
              };
              return (
                <div key={i} style={{
                  fontSize: isHeader ? "0.62rem" : "0.8rem",
                  fontWeight: isHeader ? 700 : 400,
                  color: isWarning ? "#E67E22" : isTip ? "#0891B2" : isOk ? "#059669" : isWrong ? "#DC2626" : isHeader ? C.gray : C.ink,
                  letterSpacing: isHeader ? "0.1em" : 0,
                  textTransform: isHeader ? "uppercase" : "none",
                  fontFamily: isBullet || isOk || isWrong ? "Georgia,serif" : "inherit",
                  lineHeight: 1.65, marginTop: isHeader && i > 0 ? "0.6rem" : 0,
                  paddingLeft: isBullet ? "0.2rem" : 0,
                }}>
                  {renderLine()}
                </div>
              );
            })}
          </div>

          {point.examples?.length > 0 && (
            <div style={{ padding:"0.4rem 1rem 0.9rem", borderTop:`1px dashed ${C.border}` }}>
              <div style={{ fontSize:"0.58rem", fontWeight:700, color:C.gray, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6 }}>
                Ví dụ
              </div>
              {point.examples.map((ex, i) => {
                const di = ex.indexOf(" — ");
                const fr = di >= 0 ? ex.slice(0, di) : ex;
                const vi = di >= 0 ? ex.slice(di + 3) : null;
                return (
                  <div key={i} style={{
                    display:"flex", gap:6, paddingBottom:"0.35rem",
                    borderBottom: i < point.examples.length-1 ? `1px solid ${C.border}` : "none",
                    marginBottom: i < point.examples.length-1 ? "0.35rem" : 0,
                  }}>
                    <span style={{ fontFamily:"Georgia,serif", fontSize:"0.82rem", color:C.blue, flex:"0 0 auto", maxWidth:"52%" }}>{fr}</span>
                    {vi && <span style={{ fontSize:"0.75rem", color:C.gray, flex:1 }}>&rarr; {vi}</span>}
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

  // ── Unit list ─────────────────────────────────────────────────
  if (!selectedUnit) return (
    <div style={{ animation:"fadeUp 0.3s ease" }}>

      {/* Hero banner */}
      <div style={{
        background:"linear-gradient(135deg, #1B3A6B 0%, #2d4f8a 100%)",
        padding:"1rem 1rem 0.85rem",
      }}>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.15rem", color:"#fff", fontWeight:800, lineHeight:1.1 }}>
          ⚜️ Ngữ pháp Édito A1
        </div>
        <div style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.65)", marginTop:4 }}>
          {EDITO_GRAMMAR.length} bài · Điểm ngữ pháp theo từng đơn vị · Ví dụ minh họa
        </div>
      </div>

      <div style={{ padding:"0.85rem 1rem" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
          {EDITO_GRAMMAR.map((u, i) => (
            <button key={u.id} onClick={() => selectUnit(u.id)}
              style={{
                background:C.white, border:`1.5px solid ${C.border}`,
                borderLeft:`4px solid ${C.blue}`,
                borderRadius:14, padding:0,
                display:"flex", alignItems:"center", gap:12,
                textAlign:"left", cursor:"pointer", fontFamily:"inherit",
                width:"100%", overflow:"hidden",
                animation:`fadeUp 0.2s ease ${i*0.03}s both`,
                transition:"box-shadow 0.15s, transform 0.1s",
                boxShadow:`0 2px 8px rgba(74,144,217,0.08)`,
              }}
              onPointerDown={e => e.currentTarget.style.transform="scale(0.99)"}
              onPointerUp={e => e.currentTarget.style.transform="scale(1)"}
              onPointerLeave={e => e.currentTarget.style.transform="scale(1)"}
            >
              {/* number badge */}
              <div style={{
                width:44, height:52, flexShrink:0,
                background:C.blueL,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontFamily:"'Playfair Display',Georgia,serif",
                fontWeight:800, fontSize:16, color:C.blue,
              }}>
                {u.num}
              </div>

              <div style={{ flex:1, minWidth:0, padding:"0.65rem 0.4rem 0.65rem 0" }}>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:14.5, color:C.ink, lineHeight:1.2 }}>
                  {EMOJIS[u.id]} {u.title}
                </div>
                <div style={{ fontSize:10.5, color:C.blue, marginTop:3, fontWeight:600 }}>
                  {u.points.length} điểm ngữ pháp
                </div>
              </div>

              <span style={{ color:C.gray2, fontSize:18, flexShrink:0, paddingRight:12 }}>&rsaquo;</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ── Unit detail ───────────────────────────────────────────────
  return (
    <div style={{ animation:"fadeUp 0.25s ease" }}>

      {/* Sticky gradient header */}
      <div style={{
        background:"linear-gradient(135deg, #1B3A6B 0%, #2d4f8a 100%)",
        padding:"0.85rem 1rem 0.9rem",
        position:"sticky", top:0, zIndex:10,
      }}>
        <button onClick={goBack} style={{
          background:"rgba(255,255,255,0.15)", border:"none",
          color:"#fff", fontSize:"0.72rem", fontWeight:600,
          cursor:"pointer", padding:"0.2rem 0.65rem",
          borderRadius:20, marginBottom:"0.6rem",
          fontFamily:"inherit",
        }}>← Quay lại</button>

        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{
            background:"rgba(255,255,255,0.18)", border:"2px solid rgba(255,255,255,0.35)",
            color:"#fff", borderRadius:12,
            minWidth:40, height:40,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontFamily:"'Playfair Display',Georgia,serif",
            fontWeight:800, fontSize:15, flexShrink:0,
          }}>
            {unitData.num}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:16, color:"#fff", lineHeight:1.15 }}>
              {EMOJIS[unitData.id]} {unitData.title}
            </div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.65)", marginTop:2, fontWeight:500 }}>
              {unitData.points.length} điểm ngữ pháp
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div style={{ padding:"0.75rem 1rem 4rem", display:"flex", flexDirection:"column", gap:8 }}>
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
