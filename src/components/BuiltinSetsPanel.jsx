import { useState } from "react";
import { C } from "../constants.js";
import { BUILTIN_SETS } from "../data/builtinSets.js";
import { addWordsToSRS, getSRSData } from "../utils/srs.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";

export default function BuiltinSetsPanel({ onAdd }) {
  const [expanded,  setExpanded]  = useState(null);
  const [added,     setAdded]     = useState(() => {
    const data = getSRSData();
    const inSRS = new Set(Object.keys(data));
    const result = {};
    for (const s of BUILTIN_SETS) {
      const allIn = s.words.every(w => inSRS.has(w.fr));
      if (allIn && s.words.length > 0) result[s.id] = true;
    }
    return result;
  });
  const [toast, setToast] = useState("");

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 2200); };

  const addSet = (set) => {
    const count = addWordsToSRS(set.words);
    setAdded(a => ({ ...a, [set.id]: true }));
    showToast(`✓ Đã thêm ${count} từ vào SRS!`);
    onAdd?.();
  };

  return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      {toast && (
        <div style={{ position:"fixed", top:20, left:"50%", transform:"translateX(-50%)", background:"#0D9488", color:"#fff", padding:"0.5rem 1.2rem", borderRadius:24, fontSize:"0.8rem", zIndex:500, whiteSpace:"nowrap", boxShadow:"0 4px 20px rgba(0,0,0,0.2)", animation:"pop 0.3s ease" }}>
          {toast}
        </div>
      )}

      <div style={{ marginBottom:"1rem" }}>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.1rem", color:C.ink, fontWeight:700, marginBottom:"0.2rem" }}>
          📚 Bộ từ chủ đề A1
        </div>
        <div style={{ fontSize:"0.75rem", color:C.gray }}>
          Nhấn để xem từ · Thêm nguyên bộ vào SRS để bắt đầu ôn tập
        </div>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:"0.55rem" }}>
        {BUILTIN_SETS.map(set => {
          const isExpanded = expanded === set.id;
          const isDone = added[set.id];
          return (
            <div key={set.id} style={{ background:C.white, border:`1.5px solid ${isDone ? set.color+"44" : C.border}`, borderRadius:16, overflow:"hidden", transition:"border-color 0.2s" }}>
              {/* Header row */}
              <button
                onClick={() => setExpanded(isExpanded ? null : set.id)}
                style={{ width:"100%", background:"transparent", border:"none", cursor:"pointer", padding:"0.85rem 1rem", display:"flex", alignItems:"center", gap:"0.75rem", fontFamily:"inherit", textAlign:"left" }}>
                <span style={{ fontSize:"1.5rem", flexShrink:0 }}>{set.icon}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.92rem", color:C.ink, fontWeight:700 }}>{set.label}</div>
                  <div style={{ fontSize:"0.68rem", color:set.color, fontWeight:600 }}>{set.desc} · {set.words.length} từ</div>
                </div>
                {isDone
                  ? <span style={{ fontSize:"0.7rem", background:"#ECFDF5", color:"#059669", border:"1.5px solid #059669", borderRadius:20, padding:"0.15rem 0.55rem", fontWeight:700, flexShrink:0 }}>✓ SRS</span>
                  : <button
                      onClick={e => { e.stopPropagation(); addSet(set); }}
                      style={{ padding:"0.3rem 0.75rem", background:set.color, color:"#fff", border:"none", borderRadius:20, fontSize:"0.72rem", cursor:"pointer", fontWeight:700, flexShrink:0, whiteSpace:"nowrap" }}>
                      + SRS
                    </button>
                }
                <span style={{ fontSize:"0.7rem", color:C.gray, flexShrink:0 }}>{isExpanded ? "▲" : "▼"}</span>
              </button>

              {/* Word list */}
              {isExpanded && (
                <div style={{ borderTop:`1px solid ${C.border}`, padding:"0.65rem 1rem 0.85rem" }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.3rem 0.75rem" }}>
                    {set.words.map((w, i) => (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:"0.3rem", padding:"0.25rem 0" }}>
                        <span style={{ fontFamily:"Georgia,serif", fontSize:"0.82rem", color:C.ink, fontWeight:600 }}>{w.fr}</span>
                        <SpeakBtn text={w.fr} size="0.7rem" />
                        <span style={{ fontSize:"0.72rem", color:C.gray }}>— {w.vi}</span>
                      </div>
                    ))}
                  </div>
                  {!isDone && (
                    <button onClick={() => addSet(set)}
                      style={{ marginTop:"0.75rem", width:"100%", padding:"0.55rem", background:set.color, color:"#fff", border:"none", borderRadius:12, fontSize:"0.82rem", cursor:"pointer", fontWeight:700 }}>
                      Thêm tất cả {set.words.length} từ vào SRS →
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
