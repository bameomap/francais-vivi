import { useState } from "react";
import { C } from "../constants.js";
import { EDITO_VOCAB_UNITS } from "../data/editoVocab.js";
import DicteePanel from "./DicteePanel.jsx";
import ListeningQuiz from "./ListeningQuiz.jsx";
import AudioDictee from "./AudioDictee.jsx";

const TABS = [
  { id: "chon",  label: "🎧 Nghe chọn" },
  { id: "chep",  label: "✏️ Nghe chép" },
  { id: "audio", label: "📂 File audio" },
];

const EDITO_UNITS = EDITO_VOCAB_UNITS.map(u => ({ id: u.id, num: u.num, fr: u.title }));

// Cache key for listening quiz (shared with lecture uses same vocab so different prefix)
const cacheKey  = (uid) => `ecouter_unit_${uid}`;
const hasCached = (uid) => !!localStorage.getItem(cacheKey(uid));

export default function EcouterPanel({ words: propWords = [], section, onBackToParcours }) {
  const defaultTab = section === "listening" ? "chon" : "chep";
  const [tab,          setTab]          = useState(defaultTab);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [fromParcours] = useState(() => {
    const back = localStorage.getItem("parcours_back");
    if (back) { localStorage.removeItem("parcours_back"); return true; }
    return false;
  });

  // Active words: unit vocab > user words
  const unitData    = selectedUnit ? EDITO_VOCAB_UNITS.find(u => u.id === selectedUnit) : null;
  const unitWords   = unitData ? unitData.groups.flatMap(g => g.words) : null;
  const activeWords = unitWords || propWords;

  const selectUnit = (uid) => {
    setSelectedUnit(prev => prev === uid ? null : uid);
  };

  return (
    <div>
      {fromParcours && onBackToParcours && (
        <div style={{ padding:"0.5rem 1rem 0" }}>
          <button onClick={onBackToParcours} style={{ background:"transparent", border:"none", color:C.blue, fontSize:"0.82rem", fontWeight:600, cursor:"pointer", padding:0, display:"flex", alignItems:"center", gap:4, fontFamily:"inherit" }}>
            ← Parcours
          </button>
        </div>
      )}
      {/* ── Unit picker ── */}
      <div style={{ padding: "0.6rem 1rem 0.4rem", borderBottom: `1px solid ${C.borderSoft || "#EEF2FA"}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:5 }}>
          <span style={{ fontSize:"0.62rem", fontWeight:700, color:C.gray, letterSpacing:"0.1em", textTransform:"uppercase", flexShrink:0 }}>Unit Édito</span>
          {selectedUnit && (
            <button onClick={() => setSelectedUnit(null)} style={{ padding:"0.1rem 0.5rem", background:"transparent", border:`1px solid ${C.border}`, color:C.gray, borderRadius:20, fontSize:"0.62rem", cursor:"pointer" }}>
              ✕ Bỏ chọn
            </button>
          )}
        </div>
        <div style={{ display:"flex", gap:"0.3rem", overflowX:"auto", scrollbarWidth:"none" }}>
          {EDITO_UNITS.map(u => {
            const isActive = selectedUnit === u.id;
            return (
              <button key={u.id} onClick={() => selectUnit(u.id)} style={{
                flexShrink: 0, padding: "0.28rem 0.65rem",
                background: isActive ? "#0891B2" : C.cream,
                border: `1.5px solid ${isActive ? "#0891B2" : C.border}`,
                color: isActive ? "#fff" : C.ink,
                borderRadius: 20, fontSize: "0.68rem", cursor: "pointer",
                fontFamily: "inherit", fontWeight: isActive ? 700 : 400,
                whiteSpace: "nowrap", transition: "all 0.15s",
              }}>
                U{u.num}
              </button>
            );
          })}
        </div>
        {selectedUnit && unitData && (
          <div style={{ marginTop:4, fontSize:"0.7rem", color:"#0891B2", fontWeight:600 }}>
            {unitData.title} · {activeWords.length} từ
          </div>
        )}
      </div>

      {/* ── Sub-tabs ── */}
      <div style={{ display: "flex", background: C.white, borderBottom: `1px solid ${C.border}` }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{
              flex: 1, padding: "0.6rem 0.3rem",
              border: "none", background: "transparent",
              borderBottom: tab === t.id ? "2.5px solid #0891B2" : "2.5px solid transparent",
              color: tab === t.id ? "#0891B2" : C.gray,
              fontSize: "0.7rem", fontWeight: tab === t.id ? 700 : 500,
              cursor: "pointer", fontFamily: "inherit",
              transition: "all 0.15s", lineHeight: 1.3,
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Sub-tab content ── */}
      {tab === "audio" && <AudioDictee />}
      {(tab === "chon" || tab === "chep") && !selectedUnit && (
        <div style={{ padding:"2.5rem 1.5rem", textAlign:"center" }}>
          <div style={{ fontSize:"2rem", marginBottom:"0.75rem" }}>🎧</div>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1rem", color:C.ink, fontWeight:700, marginBottom:"0.4rem" }}>
            Chọn một Unit Édito
          </div>
          <div style={{ fontSize:"0.78rem", color:C.gray, lineHeight:1.6 }}>
            Bấm vào một unit bên trên để khoanh vùng<br/>từ vựng trước khi luyện nghe.
          </div>
        </div>
      )}
      {tab === "chon" && selectedUnit && <ListeningQuiz words={activeWords} />}
      {tab === "chep" && selectedUnit && <DicteePanel   words={activeWords} unitId={selectedUnit} />}
    </div>
  );
}
