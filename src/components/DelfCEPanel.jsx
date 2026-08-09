import { useState } from "react";
import { C } from "../constants.js";
import DelfItemCard from "./DelfItemCard.jsx";
import { DELF_A1_CE } from "../data/delfA1Reussite.js";

// Compréhension des écrits, as a tab of the book hub (DelfBookPanel).
//
// The book's shape is kept on purpose: four objectifs, each drilled first on
// short activités (SE PRÉPARER) and only then on full exam-format exercices
// with points (S'ENTRAÎNER). Flattening that into one pile of questions would
// throw away the progression that makes the book work.

export function SkillGroup({ title, sub, color, items, done, onDone, alwaysVi }) {
  return (
    <section style={{ marginBottom: "1.1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.5rem" }}>
        <span style={{ background: color, color: "#fff", borderRadius: 8, padding: "0.15rem 0.5rem",
                       fontSize: "0.6rem", fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
                       letterSpacing: "0.05em" }}>
          {title}
        </span>
        <span style={{ fontSize: "0.67rem", color: C.gray }}>{sub}</span>
      </div>
      {items.map(item => (
        <DelfItemCard key={item.id} item={item} color={color} alwaysVi={alwaysVi}
          done={!!done[item.id]} onDone={() => onDone(item.id)} />
      ))}
    </section>
  );
}

export default function DelfCEPanel({ done, onDone, alwaysVi, data = DELF_A1_CE }) {
  const [secId, setSecId] = useState(data.sections[0].id);
  const section = data.sections.find(s => s.id === secId) || data.sections[0];

  return (
    <div>
      {/* Objectif picker */}
      <div style={{ display: "flex", gap: "0.35rem", overflowX: "auto", paddingBottom: "0.45rem", marginBottom: "0.7rem" }}>
        {data.sections.map(s => {
          const on = s.id === secId;
          return (
            <button key={s.id} onClick={() => setSecId(s.id)}
              style={{ flexShrink: 0, background: on ? C.ink : C.white, color: on ? "#fff" : C.ink2,
                       border: `1px solid ${on ? C.ink : C.border}`, borderRadius: 20,
                       padding: "0.28rem 0.7rem", fontSize: "0.69rem", fontWeight: 700,
                       cursor: "pointer", fontFamily: "inherit" }}>
              {s.num}. {s.fr}
            </button>
          );
        })}
      </div>

      <div style={{ marginBottom: "0.8rem" }}>
        <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1rem", fontWeight: 700, color: C.ink }}>
          Exercice {section.num} — {section.fr}
        </div>
        <div style={{ fontSize: "0.66rem", color: C.gray, lineHeight: 1.55, marginTop: 2 }}>
          {section.domaine} · 5 câu · 5 điểm — {section.supports}
        </div>
      </div>

      <SkillGroup title="SE PRÉPARER" sub="Luyện từng kỹ năng nhỏ" color={C.blue}
        items={section.prepare} done={done} onDone={onDone} alwaysVi={alwaysVi} />

      <SkillGroup title="S'ENTRAÎNER" sub="Bài thi thật, có tính điểm" color={C.green}
        items={section.train} done={done} onDone={onDone} alwaysVi={alwaysVi} />
    </div>
  );
}
