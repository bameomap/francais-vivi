import { useState, useEffect, useMemo, useRef } from "react";
import { C } from "../constants.js";
import { EDITO_GRAMMAR } from "../data/editoGrammar.js";
import { EDITO_VOCAB_UNITS } from "../data/editoVocab.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";

// Bỏ dấu để tìm không phân biệt accent: "ecole" khớp "école"
const fold = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

// Index phẳng dựng một lần khi mở modal
function buildIndex() {
  const vocab = [];
  for (const u of EDITO_VOCAB_UNITS) {
    for (const g of u.groups) {
      for (const w of g.words) {
        vocab.push({ fr: w.fr, vi: w.vi, ipa: w.ipa, ex_fr: w.ex_fr, ex_vi: w.ex_vi, unit: u.num, group: g.label });
      }
    }
  }
  const grammar = [];
  EDITO_GRAMMAR.forEach(u => {
    u.points.forEach((p, idx) => {
      grammar.push({ topic: p.topic, unitId: u.id, unitNum: u.num, unitTitle: u.title, pointIndex: idx });
    });
  });
  return { vocab, grammar };
}

export default function GlobalSearch({ onClose, onNavigate }) {
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  const index = useMemo(buildIndex, []);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const fq = fold(q.trim());
  const results = useMemo(() => {
    if (fq.length < 2) return { vocab: [], grammar: [] };
    const vocab = index.vocab
      .filter(w => fold(w.fr).includes(fq) || fold(w.vi).includes(fq))
      .slice(0, 12);
    const grammar = index.grammar
      .filter(g => fold(g.topic).includes(fq) || fold(g.unitTitle).includes(fq))
      .slice(0, 10);
    return { vocab, grammar };
  }, [fq, index]);

  const goGrammar = (g) => {
    // EditoGrammarView khôi phục unit từ key này; điểm cần mở đọc từ grammar_open_point
    localStorage.setItem("grammar_last_unit", g.unitId);
    localStorage.setItem("grammar_open_point", String(g.pointIndex));
    onClose();
    onNavigate("grammar", "grammar");
  };

  const empty = fq.length >= 2 && results.vocab.length === 0 && results.grammar.length === 0;

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(26,39,68,0.55)", zIndex:350, display:"flex", flexDirection:"column", alignItems:"center", paddingTop:"8vh" }}>
      <div onClick={e => e.stopPropagation()} style={{ width:"calc(100% - 32px)", maxWidth:560, background:C.white, borderRadius:18, overflow:"hidden", boxShadow:"0 16px 50px rgba(0,0,0,0.3)", animation:"fadeUp 0.2s ease", display:"flex", flexDirection:"column", maxHeight:"75vh" }}>
        {/* Search input */}
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 16px", borderBottom:`1px solid ${C.border}` }}>
          <span style={{ fontSize:17, color:C.gray2 }}>⌕</span>
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Tìm từ vựng, điểm ngữ pháp… (vd: passé composé, maison)"
            style={{ flex:1, border:"none", outline:"none", fontSize:15, fontFamily:"inherit", color:C.ink, background:"transparent" }}
          />
          <button onClick={onClose} aria-label="Đóng tìm kiếm"
            style={{ background:"none", border:"none", cursor:"pointer", color:C.gray, fontSize:16, lineHeight:1, padding:"2px 4px" }}>✕</button>
        </div>

        {/* Results */}
        <div style={{ overflowY:"auto", flex:1 }}>
          {fq.length < 2 && (
            <div style={{ padding:"28px 16px", textAlign:"center", color:C.gray, fontSize:12.5, lineHeight:1.7 }}>
              Gõ ít nhất 2 ký tự để tìm trong<br/><b>684 từ vựng</b> và <b>64 điểm ngữ pháp</b> Édito A1.
            </div>
          )}
          {empty && (
            <div style={{ padding:"28px 16px", textAlign:"center", color:C.gray, fontSize:12.5 }}>
              Không tìm thấy «{q.trim()}» 😢
            </div>
          )}

          {results.grammar.length > 0 && (
            <div style={{ padding:"10px 16px 4px" }}>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9.5, fontWeight:700, color:C.gray, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:6 }}>
                ⚜️ Ngữ pháp
              </div>
              {results.grammar.map((g, i) => (
                <button key={i} onClick={() => goGrammar(g)}
                  style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"8px 10px", background:"transparent", border:"none", borderRadius:10, cursor:"pointer", textAlign:"left", fontFamily:"inherit" }}
                  onMouseEnter={e => e.currentTarget.style.background = C.blueL}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <span style={{ background:C.purpleL || "#F0EEFF", color:"#7B6CF6", borderRadius:8, fontSize:10, fontWeight:700, padding:"2px 7px", flexShrink:0 }}>U{g.unitNum}</span>
                  <span style={{ flex:1, fontSize:13, color:C.ink, lineHeight:1.4 }}>{g.topic}</span>
                  <span style={{ color:C.gray2, fontSize:14 }}>›</span>
                </button>
              ))}
            </div>
          )}

          {results.vocab.length > 0 && (
            <div style={{ padding:"10px 16px 14px" }}>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9.5, fontWeight:700, color:C.gray, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:6 }}>
                📖 Từ vựng
              </div>
              {results.vocab.map((w, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 10px", borderBottom: i < results.vocab.length-1 ? `1px solid ${C.borderSoft || C.border}` : "none" }}>
                  <span style={{ background:C.blueL, color:C.blue, borderRadius:8, fontSize:10, fontWeight:700, padding:"2px 7px", flexShrink:0 }}>U{w.unit}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:14, color:C.ink }}>
                      {w.fr}
                      {w.ipa && <span style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:400, fontSize:10, color:C.gray2, marginLeft:6 }}>[{w.ipa}]</span>}
                    </div>
                    <div style={{ fontSize:11.5, color:C.gray }}>{w.vi}{w.group ? ` · ${w.group}` : ""}</div>
                    {w.ex_fr && <div style={{ fontSize:11, color:C.gray2, fontStyle:"italic", marginTop:1 }}>{w.ex_fr}</div>}
                  </div>
                  <SpeakBtn text={w.fr} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
