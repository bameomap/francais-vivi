import { useState } from "react";
import { C } from "../constants.js";
import { EDITO_VOCAB_UNITS } from "../data/editoVocab.js";
import DicteePanel from "./DicteePanel.jsx";
import ListeningQuiz from "./ListeningQuiz.jsx";
import AudioDictee from "./AudioDictee.jsx";
import EditoAudioPanel from "./EditoAudioPanel.jsx";

// ── Main tabs ──────────────────────────────────────────────────────
const MAIN_TABS = [
  { id: "edito",  label: "📚 Édito" },
  { id: "luyen",  label: "🎧 Luyện nghe" },
];

// ── Sub-tabs inside "Luyện nghe" ───────────────────────────────────
const SUB_TABS = [
  { id: "chon",  label: "🎧 Nghe chọn" },
  { id: "chep",  label: "✏️ Nghe chép" },
  { id: "audio", label: "📂 File audio" },
];

const EDITO_UNITS = EDITO_VOCAB_UNITS.map(u => ({ id: u.id, num: u.num, fr: u.title }));

const cacheKey  = (uid) => `ecouter_unit_${uid}`;
const hasCached = (uid) => !!localStorage.getItem(cacheKey(uid));

export default function EcouterPanel({ words: propWords = [], section, onBackToParcours }) {
  const [mainTab,       setMainTab]       = useState("edito");
  const [subTab,        setSubTab]        = useState(section === "listening" ? "chon" : "chep");
  const [selectedUnit,  setSelectedUnit]  = useState(null);
  const [fromParcours] = useState(() => {
    const back = localStorage.getItem("parcours_back");
    if (back) { localStorage.removeItem("parcours_back"); return true; }
    return false;
  });

  const unitData    = selectedUnit ? EDITO_VOCAB_UNITS.find(u => u.id === selectedUnit) : null;
  const unitWords   = unitData ? unitData.groups.flatMap(g => g.words) : null;
  const activeWords = unitWords || propWords;

  const selectUnit = (uid) => setSelectedUnit(prev => prev === uid ? null : uid);

  // Hero subtitle
  const heroSub =
    mainTab === "edito" ? "Nghe & học theo sách Édito A1" :
    subTab  === "chon"  ? "Nghe & chọn đáp án" :
    subTab  === "chep"  ? "Nghe & chép chính tả" : "File audio của bạn";

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>

      {/* ── Dark hero banner ── */}
      <div style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #2d4f8a 100%)", padding: "0.9rem 1rem 0.85rem" }}>
        {fromParcours && onBackToParcours && (
          <button onClick={onBackToParcours} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer", padding: "0.2rem 0.65rem", borderRadius: 20, marginBottom: "0.6rem", fontFamily: "inherit" }}>
            ← Parcours
          </button>
        )}
        <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1.15rem", color: "#fff", fontWeight: 800, lineHeight: 1.1 }}>
          🎧 L'Écoute
        </div>
        <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.65)", marginTop: 4 }}>
          {heroSub}
        </div>
      </div>

      {/* ── Main tabs ── */}
      <div style={{ display: "flex", background: C.white, borderBottom: `2px solid ${C.border}` }}>
        {MAIN_TABS.map(t => (
          <button key={t.id} onClick={() => setMainTab(t.id)}
            style={{
              flex: 1, padding: "0.65rem 0.3rem",
              border: "none", background: "transparent",
              borderBottom: mainTab === t.id ? `2.5px solid ${C.blue}` : "2.5px solid transparent",
              color: mainTab === t.id ? C.blue : C.gray,
              fontSize: "0.75rem", fontWeight: mainTab === t.id ? 700 : 500,
              cursor: "pointer", fontFamily: "inherit",
              transition: "all 0.15s", lineHeight: 1.3,
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ══ TAB: Édito ══════════════════════════════════════════════ */}
      {mainTab === "edito" && <EditoAudioPanel />}

      {/* ══ TAB: Luyện nghe ════════════════════════════════════════ */}
      {mainTab === "luyen" && (
        <>
          {/* ── Unit picker ── */}
          <div style={{ padding: "0.65rem 1rem 0.5rem", borderBottom: `1px solid ${C.borderSoft || C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
              <span style={{ fontSize: "0.62rem", fontWeight: 700, color: C.gray, letterSpacing: "0.1em", textTransform: "uppercase", flexShrink: 0 }}>Unit Édito</span>
              {selectedUnit && (
                <button onClick={() => setSelectedUnit(null)}
                  style={{ padding: "0.1rem 0.5rem", background: "transparent", border: `1px solid ${C.border}`, color: C.gray, borderRadius: 20, fontSize: "0.62rem", cursor: "pointer" }}>
                  ✕ Bỏ chọn
                </button>
              )}
            </div>
            <div style={{ display: "flex", gap: "0.3rem", overflowX: "auto", scrollbarWidth: "none", paddingBottom: 2 }}>
              {EDITO_UNITS.map(u => {
                const isActive = selectedUnit === u.id;
                const cached   = hasCached(u.id);
                return (
                  <button key={u.id} onClick={() => selectUnit(u.id)} style={{
                    flexShrink: 0, padding: "0.28rem 0.65rem",
                    background: isActive ? C.blue : cached ? "#ECFDF5" : C.cream,
                    border: `1.5px solid ${isActive ? C.blue : cached ? "#059669" : C.border}`,
                    color: isActive ? "#fff" : cached ? "#059669" : C.ink,
                    borderRadius: 20, fontSize: "0.68rem", cursor: "pointer",
                    fontFamily: "inherit", fontWeight: isActive ? 700 : 400,
                    whiteSpace: "nowrap", transition: "all 0.15s",
                  }}>
                    {cached && !isActive ? "✓ " : ""}U{u.num}
                  </button>
                );
              })}
            </div>
            {selectedUnit && unitData && (
              <div style={{ marginTop: 4, fontSize: "0.7rem", color: C.blue, fontWeight: 600 }}>
                {unitData.title} · {activeWords.length} từ
              </div>
            )}
          </div>

          {/* ── Sub-tabs ── */}
          <div style={{ display: "flex", background: C.white, borderBottom: `1px solid ${C.border}` }}>
            {SUB_TABS.map(t => (
              <button key={t.id} onClick={() => setSubTab(t.id)}
                style={{
                  flex: 1, padding: "0.55rem 0.3rem",
                  border: "none", background: "transparent",
                  borderBottom: subTab === t.id ? `2.5px solid ${C.blue}` : "2.5px solid transparent",
                  color: subTab === t.id ? C.blue : C.gray,
                  fontSize: "0.68rem", fontWeight: subTab === t.id ? 700 : 500,
                  cursor: "pointer", fontFamily: "inherit",
                  transition: "all 0.15s", lineHeight: 1.3,
                }}>
                {t.label}
              </button>
            ))}
          </div>

          {/* ── Sub-tab content ── */}
          {subTab === "audio" && <AudioDictee />}

          {(subTab === "chon" || subTab === "chep") && !selectedUnit && (
            <div style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
              <div style={{ fontSize: "2.2rem", marginBottom: "0.75rem" }}>🎧</div>
              <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1rem", color: C.ink, fontWeight: 700, marginBottom: "0.4rem" }}>
                Chọn một Unit Édito
              </div>
              <div style={{ fontSize: "0.78rem", color: C.gray, lineHeight: 1.65 }}>
                Bấm vào một unit bên trên để khoanh vùng<br />từ vựng trước khi luyện nghe.
              </div>
            </div>
          )}

          {subTab === "chon" && selectedUnit && <ListeningQuiz words={activeWords} />}
          {subTab === "chep" && selectedUnit && <DicteePanel   words={activeWords} unitId={selectedUnit} />}
        </>
      )}

    </div>
  );
}
