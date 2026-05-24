import { useState } from "react";
import { C } from "../constants.js";
import ReferencePanel from "./ReferencePanel.jsx";
import GrammarCheatsheet from "./GrammarCheatsheet.jsx";
import ConjugaisonPanel from "./ConjugaisonPanel.jsx";
import PhrasebookPanel from "./PhrasebookPanel.jsx";
import EditoGrammarPanel from "./EditoGrammarPanel.jsx";

const TABS = [
  { id: "pronunc", label: "Phát âm",      icon: "🔊" },
  { id: "grammar", label: "Ngữ pháp",     icon: "⚜️" },
  { id: "edito",   label: "Édito",        icon: "📚" },
  { id: "conjug",  label: "Chia động từ", icon: "🖊️" },
  { id: "phrases", label: "Mẫu câu",      icon: "💬" },
];

export default function ReferenceHub() {
  const [active, setActive] = useState("pronunc");

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      <div style={{
        display: "flex", gap: "0.3rem", padding: "0.6rem 1rem",
        overflowX: "auto", borderBottom: `1.5px solid ${C.border}`,
        background: C.white,
      }}>
        {TABS.map(t => (
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

      {active === "pronunc" && <ReferencePanel />}
      {active === "grammar" && <GrammarCheatsheet />}
      {active === "edito"   && <EditoGrammarPanel />}
      {active === "conjug"  && <ConjugaisonPanel />}
      {active === "phrases" && <PhrasebookPanel />}
    </div>
  );
}
