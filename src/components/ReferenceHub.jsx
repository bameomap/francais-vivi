import { useState, useEffect } from "react";
import { C } from "../constants.js";
import ReferencePanel from "./ReferencePanel.jsx";
import GrammarCheatsheet from "./GrammarCheatsheet.jsx";
import ConjugaisonPanel from "./ConjugaisonPanel.jsx";
import PhrasebookPanel from "./PhrasebookPanel.jsx";
import EditoVerbsPanel from "./EditoVerbsPanel.jsx";
import EditoPhonoPanel from "./EditoPhonoPanel.jsx";
import DictionaryPanel from "./DictionaryPanel.jsx";

import { EDITO_A1_PHONO } from "../data/editoPhono.js";

const TABS = [
  { id: "dict",      label: "Tra từ",       icon: "🔍" },
  { id: "pronunc",   label: "Phát âm",      icon: "🔊" },
  { id: "grammar",   label: "Ngữ pháp",     icon: "⚜️" },
  { id: "phono",     label: "Phono",        icon: "🎵" },
  { id: "verbes",    label: "Động từ",      icon: "🖊️" },
  { id: "conjug",    label: "Chia tự do",   icon: "✏️" },
  { id: "phrases",   label: "Mẫu câu",      icon: "💬" },
];

// `tabs` lets a level hide sections it has no content for yet (A2 has no
// cheatsheet / verb tables / phrasebook), and `phonoData` swaps the Phono set.
export default function ReferenceHub({
  onBackToParcours,
  tabs = TABS,
  phonoData = EDITO_A1_PHONO,
  levelLabel = "Édito A1",
  cahier = null,
}) {
  const [active, setActive]             = useState(tabs[0].id);
  const [fromParcours, setFromParcours] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("parcours_back")) {
      setFromParcours(true);
      localStorage.removeItem("parcours_back");
    }
    const tab = localStorage.getItem("parcours_ref_tab");
    if (tab) {
      // Ignore a deep-link to a tab this level doesn't offer.
      if (tabs.some(t => t.id === tab)) setActive(tab);
      localStorage.removeItem("parcours_ref_tab");
    }
  }, []);

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      {fromParcours && onBackToParcours && (
        <div style={{ background: `linear-gradient(135deg, ${C.heroFrom} 0%, ${C.heroTo} 100%)`, padding: "0.6rem 1rem" }}>
          <button onClick={onBackToParcours} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer", padding: "0.2rem 0.65rem", borderRadius: 20, fontFamily: "inherit" }}>
            ← Parcours
          </button>
        </div>
      )}
      <div style={{
        display: "flex", gap: "0.3rem", padding: "0.6rem 1rem",
        overflowX: "auto", borderBottom: `1.5px solid ${C.border}`,
        background: C.white,
      }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            style={{
              padding: "0.25rem 0.6rem",
              background: active === t.id ? C.blue : "transparent",
              border: `1.5px solid ${active === t.id ? C.blue : C.border}`,
              color: active === t.id ? C.white : C.gray,
              borderRadius: 20,
              fontSize: "0.68rem",
              cursor: "pointer",
              fontWeight: active === t.id ? 600 : 400,
              whiteSpace: "nowrap",
              transition: "all 0.15s",
              flexShrink: 0,
              fontFamily: "inherit",
            }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {active === "dict"    && <DictionaryPanel />}
      {active === "pronunc" && <ReferencePanel />}
      {active === "grammar" && <GrammarCheatsheet />}
      {active === "phono"   && <EditoPhonoPanel fromParcours={fromParcours} data={phonoData} levelLabel={levelLabel} cahier={cahier} />}
      {active === "verbes"  && <EditoVerbsPanel fromParcours={fromParcours} />}
      {active === "conjug"  && <ConjugaisonPanel />}
      {active === "phrases" && <PhrasebookPanel />}
    </div>
  );
}
