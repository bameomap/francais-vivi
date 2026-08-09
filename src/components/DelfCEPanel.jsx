import { useState } from "react";
import { C } from "../constants.js";
import DelfItemCard, { ObjectifPicker } from "./DelfItemCard.jsx";
import { DELF_A1_CE } from "../data/delfA1Reussite.js";

// Compréhension des écrits, as a tab of the book hub (DelfBookPanel).
//
// The book's shape is kept on purpose: four objectifs, each drilled first on
// short activités (SE PRÉPARER) and only then on full exam-format exercices
// with points (S'ENTRAÎNER). Flattening that into one pile of questions would
// throw away the progression that makes the book work.

// A pass of the book (SE PRÉPARER or S'ENTRAÎNER), collapsible so a screen
// opens as two headers rather than a wall of cards. The header carries the
// count and how many are done, which is the part worth seeing while collapsed.
export function SkillGroup({ title, sub, color, items, done, onDone, alwaysVi, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  if (!items.length) return null;

  const finished = items.filter(i => done[i.id]).length;

  return (
    <section style={{ marginBottom: "1rem" }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width: "100%", background: "none", border: "none", padding: 0, marginBottom: "0.5rem",
                 cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                 display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ flexShrink: 0, background: color, color: "#fff", borderRadius: 8,
                       padding: "0.15rem 0.5rem", fontSize: "0.6rem", fontWeight: 800,
                       fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.05em" }}>
          {title}
        </span>
        <span style={{ flex: 1, minWidth: 0, fontSize: "0.67rem", color: C.gray }}>{sub}</span>
        <span style={{ flexShrink: 0, fontSize: "0.63rem", color: finished === items.length ? C.green : C.gray2,
                       fontWeight: 700 }}>
          {finished}/{items.length}
        </span>
        <span style={{ flexShrink: 0, color, fontSize: "0.7rem" }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && items.map(item => (
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
      <ObjectifPicker items={data.sections.map(x => ({ num: x.num, fr: x.fr, id: x.id }))}
        value={section.num} onChange={n => setSecId(data.sections.find(x => x.num === n).id)}
        countOf={n => {
          const s = data.sections.find(x => x.num === n);
          return [...s.prepare, ...s.train].filter(i => !i.worked).length;
        }}
        doneOf={n => {
          const s = data.sections.find(x => x.num === n);
          return [...s.prepare, ...s.train].filter(i => !i.worked && done[i.id]).length;
        }} />

      {/* The selected chip already names the objectif, so this is just the
          detail the chip has no room for. */}
      <div style={{ fontSize: "0.64rem", color: C.gray, lineHeight: 1.5, marginBottom: "0.7rem" }}>
        {section.domaine} · 5 câu · 5 điểm — {section.supports}
      </div>

      <SkillGroup title="SE PRÉPARER" sub="Luyện từng kỹ năng nhỏ" color={C.blue}
        items={section.prepare} done={done} onDone={onDone} alwaysVi={alwaysVi} defaultOpen={false} />

      <SkillGroup title="S'ENTRAÎNER" sub="Bài thi thật, có tính điểm" color={C.green}
        items={section.train} done={done} onDone={onDone} alwaysVi={alwaysVi} />
    </div>
  );
}
