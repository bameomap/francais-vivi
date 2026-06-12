import { useState, useEffect, useRef } from "react";
import { C } from "../constants.js";
import { callAI } from "../utils/api.js";
import { getSubDone, markSubDone, unmarkSubDone } from "../utils/parcours.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import Spinner from "./ui/Spinner.jsx";
import { SecLabel } from "./ui/SharedUI.jsx";
import ConjugaisonPanel from "./ConjugaisonPanel.jsx";
import { EDITO_GRAMMAR } from "../data/editoGrammar.js";

const LEVELS = ["A1","A2","B1","B2","C1","C2"];
const GTYPES = [
  { id:"mc",    label:"☑ Chọn đáp án" },
  { id:"fill",  label:"✏️ Điền vào chỗ trống" },
  { id:"order", label:"🔀 Sắp xếp câu" },
  { id:"mixed", label:"🎲 Hỗn hợp" },
];

export function buildDetectivePrompt(topic, level, n) {
  return `French grammar teacher. Create ${n} short French sentences, each containing EXACTLY ONE deliberate grammatical error related to the topic "${topic}" (level ${level}).
Return ONLY JSON: {"type":"detective","topic":"${topic}","level":"${level}","exercises":[{"sentence":"Full sentence with one error","words":["word1","word2","word3"],"errorIndex":2,"correction":"correct replacement","explanation":"Giải thích lỗi sai bằng tiếng Việt, tại sao sai và quy tắc đúng","rule":"tên quy tắc ngắn"}]}
RULES: errorIndex is 0-based index in words[]. Split sentence into tokens by spaces, keep punctuation attached to the nearest word. The error must be clear and unambiguous.`;
}

export function buildGrammarPrompt(topic, level, gtype, n) {
  const base = `French grammar teacher. Create ${n} exercises on the topic: "${topic}" for level ${level}.`;
  // explanationRules: array of {type, content} where type = "rule"|"warning"|"note"
  // This structured format allows the UI to render each rule on its own line with proper styling.
  const explSchema = `"explanationRules":[{"type":"rule","content":"Quy tắc 1 — giải thích ngắn gọn tiếng Việt"},{"type":"rule","content":"Quy tắc 2 — ..."},{"type":"warning","content":"⚠️ Lưu ý quan trọng"},{"type":"note","content":"Ngoại lệ hoặc mẹo nhớ"}]`;
  if (gtype === "mc") return `${base}\nReturn ONLY JSON: {"type":"mc","topic":"${topic}","level":"${level}",${explSchema},"exercises":[{"question":"Full sentence with context","options":["option1","option2","option3","option4"],"answer":"correct option","explanation":"why this is correct in Vietnamese"}]}`;
  if (gtype === "fill") return `${base}\nReturn ONLY JSON: {"type":"fill","topic":"${topic}","level":"${level}",${explSchema},"exercises":[{"sentence":"French sentence with ___ for the blank","answer":"correct word/form","hint":"brief Vietnamese hint","explanation":"why this form is correct in Vietnamese"}]}`;
  if (gtype === "order") return `${base} Create sentences where words are scrambled.\nIMPORTANT: The "words" array must NOT contain punctuation (no periods, commas, question marks). Punctuation goes only in "answer".\nReturn ONLY JSON: {"type":"order","topic":"${topic}","level":"${level}",${explSchema},"exercises":[{"words":["word1","word2","word3","word4","word5"],"answer":"Correct sentence (may include punctuation)","translation":"Vietnamese translation","explanation":"note about word order in Vietnamese"}]}`;
  if (gtype === "mixed") return `${base} Create a mix: ${Math.ceil(n/3)} multiple choice + ${Math.ceil(n/3)} fill-in-blank + ${Math.floor(n/3)} word order.\nFor word order exercises: "words" array must NOT contain punctuation.\nReturn ONLY JSON: {"type":"mixed","topic":"${topic}","level":"${level}",${explSchema},"sections":[{"sectionType":"mc","exercises":[{"question":"...","options":["a","b","c","d"],"answer":"correct","explanation":"Vietnamese why"}]},{"sectionType":"fill","exercises":[{"sentence":"sentence with ___","answer":"word","hint":"hint","explanation":"Vietnamese why"}]},{"sectionType":"order","exercises":[{"words":["w1","w2","w3"],"answer":"Correct sentence","translation":"Vietnamese","explanation":"note"}]}`;
  return "";
}

export function GrammarMC({ exercises, onWrong, onFirstAnswer }) {
  const [ans, setAns] = useState({});
  return <div>{exercises.map((q,i) => {
    const a = ans[i], ok = a === q.answer;
    return (
      <div key={i} style={{ background:a?(ok?C.greenL:C.redL):C.white, border:`1.5px solid ${a?(ok?C.green:C.red):C.border}`, borderRadius:12, padding:"0.85rem 1rem", marginBottom:"0.6rem" }}>
        <div style={{ fontSize:"0.63rem", color:C.gray, textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>Câu {i+1}</div>
        <div style={{ fontFamily:"Georgia,serif", fontSize:"0.93rem", marginBottom:"0.6rem", lineHeight:1.5 }}>{q.question}</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.3rem" }}>
          {q.options.map((opt,j) => {
            let bg=C.white,bc=C.border,col=C.ink;
            if(a){if(opt===q.answer){bg=C.greenL;bc=C.green;col=C.green;}else if(opt===a){bg=C.redL;bc=C.red;col=C.red;}}
            return <button key={j} disabled={!!a} onClick={()=>{if(Object.keys(ans).length===0)onFirstAnswer?.();setAns(x=>({...x,[i]:opt}));if(opt!==q.answer)onWrong?.(q);}}
              style={{padding:"0.42rem 0.55rem",border:`1.5px solid ${bc}`,borderRadius:8,background:bg,color:col,fontSize:"0.78rem",cursor:a?"default":"pointer",textAlign:"left",fontFamily:"inherit"}}>{opt}</button>;
          })}
        </div>
        {a && <div style={{ marginTop:"0.4rem", fontSize:"0.72rem", lineHeight:1.7 }}>
          {ok
            ? <span style={{color:C.green,fontWeight:600}}>✓ Chính xác!</span>
            : <><div style={{color:C.red}}>✗ Bạn chọn: <b>{a}</b></div><div style={{color:C.green,fontWeight:600}}>✓ Đáp án đúng: <b>{q.answer}</b></div></>}
          {q.explanation && (
            <div style={{
              marginTop:"0.35rem", padding:"0.35rem 0.6rem",
              background: ok ? C.greenL : C.goldL,
              border: `1px solid ${ok ? C.green+"44" : C.gold+"66"}`,
              borderRadius:8, color: ok ? C.green : C.gold,
              fontSize:"0.71rem", lineHeight:1.55,
            }}>💡 {q.explanation}</div>
          )}
        </div>}
      </div>
    );
  })}</div>;
}

export function GrammarFill({ exercises, onFirstAnswer }) {
  const [inp, setInp] = useState({});
  const [chk, setChk] = useState({});
  return <div>{exercises.map((q,i) => {
    const v=inp[i]||"", done=chk[i], ok=done&&v.trim().toLowerCase()===(q.answer||"").toLowerCase();
    return (
      <div key={i} style={{ background:done?(ok?C.greenL:C.redL):C.white, border:`1.5px solid ${done?(ok?C.green:C.red):C.border}`, borderRadius:12, padding:"0.85rem 1rem", marginBottom:"0.6rem" }}>
        <div style={{ fontSize:"0.63rem", color:C.gray, textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>
          Câu {i+1}{q.hint?<span style={{color:C.gold,marginLeft:6,textTransform:"none"}}>· {q.hint}</span>:null}
        </div>
        <div style={{ fontFamily:"Georgia,serif", fontSize:"0.9rem", marginBottom:"0.55rem", lineHeight:1.6 }}>{q.sentence}</div>
        <div style={{ display:"flex", gap:"0.38rem", alignItems:"center", flexWrap:"wrap" }}>
          <input value={v} disabled={done} onChange={e=>setInp(x=>({...x,[i]:e.target.value}))}
            onKeyDown={e=>e.key==="Enter"&&!done&&(Object.keys(chk).length===0&&onFirstAnswer?.(),setChk(x=>({...x,[i]:true})))}
            placeholder="Nhập từ / dạng đúng..."
            style={{border:`1.5px solid ${done?(ok?C.green:C.red):C.border}`,borderRadius:6,padding:"0.3rem 0.55rem",fontSize:"0.83rem",width:180,fontFamily:"inherit",background:done?(ok?C.greenL:C.redL):C.white,color:done?(ok?C.green:C.red):C.ink,outline:"none"}}/>
          {!done&&<button onClick={()=>{if(Object.keys(chk).length===0)onFirstAnswer?.();setChk(x=>({...x,[i]:true}));}} style={{padding:"0.3rem 0.65rem",background:C.purple,color:C.white,border:"none",borderRadius:6,fontSize:"0.73rem",cursor:"pointer",fontFamily:"inherit"}}>Kiểm tra</button>}
          {done&&<span style={{fontSize:"0.73rem",color:ok?C.green:C.red,fontWeight:500}}>{ok?"✓ Đúng!":`✗ Đáp án: ${q.answer}`}</span>}
        </div>
        {done && q.explanation && (
          <div style={{
            marginTop:"0.35rem", padding:"0.35rem 0.6rem",
            background: ok ? C.greenL : C.goldL,
            border: `1px solid ${ok ? C.green+"44" : C.gold+"66"}`,
            borderRadius:8, color: ok ? C.green : C.gold,
            fontSize:"0.71rem", lineHeight:1.55,
          }}>💡 {q.explanation}</div>
        )}
      </div>
    );
  })}</div>;
}

export function GrammarOrder({ exercises, onFirstAnswer }) {
  const init = (words) => words.map((w,i)=>({w,id:i})).sort(()=>Math.random()-0.5);
  const [states, setStates] = useState(()=>exercises.map(q=>({ pool:init(q.words), chosen:[], checked:false })));

  const clickPool = (qi,ti) => {
    if(states[qi].checked) return;
    setStates(prev=>prev.map((s,i)=>i!==qi?s:({...s, pool:s.pool.filter((_,j)=>j!==ti), chosen:[...s.chosen,s.pool[ti]]})));
  };
  const clickChosen = (qi,ti) => {
    if(states[qi].checked) return;
    setStates(prev=>prev.map((s,i)=>i!==qi?s:({...s, chosen:s.chosen.filter((_,j)=>j!==ti), pool:[...s.pool,s.chosen[ti]]})));
  };
  const norm = s => (s||"").trim().toLowerCase().replace(/[''`]/g,"'").replace(/[.,!?;:«»]/g,"").replace(/\s+/g," ");
  const check = (qi) => { if(!states.some(s=>s.checked))onFirstAnswer?.(); setStates(prev=>prev.map((s,i)=>i!==qi?s:({...s,checked:true}))); };
  const reset = (qi) => setStates(prev=>prev.map((s,i)=>i!==qi?s:({...s,pool:init(exercises[qi].words),chosen:[],checked:false})));

  return <div>{exercises.map((q,i) => {
    const s = states[i];
    const answer = s.chosen.map(x=>x.w).join(" ");
    const ok = s.checked && norm(answer) === norm(q.answer);
    return (
      <div key={i} style={{ background:s.checked?(ok?C.greenL:C.redL):C.white, border:`1.5px solid ${s.checked?(ok?C.green:C.red):C.border}`, borderRadius:12, padding:"0.85rem 1rem", marginBottom:"0.6rem" }}>
        <div style={{ fontSize:"0.63rem", color:C.gray, textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>Câu {i+1} — Sắp xếp thành câu đúng</div>
        {/* Chosen area */}
        <div style={{ minHeight:40, display:"flex", flexWrap:"wrap", gap:"0.28rem", padding:"0.45rem 0.5rem", background:C.purpleL, borderRadius:8, marginBottom:"0.5rem" }}>
          {s.chosen.length===0&&<span style={{color:C.gray,fontSize:"0.75rem",alignSelf:"center"}}>Chọn từ bên dưới...</span>}
          {s.chosen.map((item,j)=><button key={item.id} onClick={()=>clickChosen(i,j)} disabled={s.checked}
            style={{padding:"0.25rem 0.55rem",border:`1.5px solid ${C.purple}`,borderRadius:6,background:C.white,color:C.purple,fontSize:"0.82rem",cursor:s.checked?"default":"pointer",fontFamily:"Georgia,serif"}}>{item.w}</button>)}
        </div>
        {/* Pool */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.28rem", marginBottom:"0.7rem" }}>
          {s.pool.map((item,j)=><button key={item.id} onClick={()=>clickPool(i,j)} disabled={s.checked}
            style={{padding:"0.25rem 0.55rem",border:`1.5px solid ${C.border}`,borderRadius:6,background:C.white,color:C.ink,fontSize:"0.82rem",cursor:s.checked?"default":"pointer",opacity:s.checked?0.4:1,fontFamily:"Georgia,serif"}}>{item.w}</button>)}
        </div>
        <div style={{ display:"flex", gap:"0.4rem" }}>
          {!s.checked&&s.chosen.length>0&&<button onClick={()=>check(i)} style={{padding:"0.3rem 0.8rem",border:"none",borderRadius:6,background:C.purple,color:C.white,fontSize:"0.75rem",cursor:"pointer"}}>Kiểm tra</button>}
          {!s.checked&&<button onClick={()=>reset(i)} style={{padding:"0.3rem 0.7rem",border:`1px solid ${C.border}`,borderRadius:6,background:C.white,color:C.gray,fontSize:"0.72rem",cursor:"pointer"}}>↺</button>}
        </div>
        {s.checked&&<div style={{marginTop:"0.45rem"}}>
          <div style={{fontSize:"0.78rem",color:ok?C.green:C.red,marginBottom:"0.2rem"}}>{ok?"✓ Chính xác!":<><span>✗ Đáp án: </span><b style={{fontFamily:"Georgia,serif"}}>{q.answer}</b></>}</div>
          {q.translation&&<div style={{fontSize:"0.72rem",color:C.gray}}>→ {q.translation}</div>}
          {q.explanation && (
            <div style={{
              marginTop:"0.35rem", padding:"0.35rem 0.6rem",
              background: ok ? C.greenL : C.goldL,
              border: `1px solid ${ok ? C.green+"44" : C.gold+"66"}`,
              borderRadius:8, color: ok ? C.green : C.gold,
              fontSize:"0.71rem", lineHeight:1.55,
            }}>💡 {q.explanation}</div>
          )}
        </div>}
      </div>
    );
  })}</div>;
}


function RuleRenderer({ text }) {
  if (!text) return null;
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"0.18rem" }}>
      {text.split("\n").map((line, i) => {
        const t = line.trim();
        if (!t) return <div key={i} style={{ height:"0.35rem" }}/>;
        if (t.startsWith("⚠️")) return (
          <div key={i} style={{ background:C.goldL, border:"1px solid #F59E0B44", borderRadius:6, padding:"0.28rem 0.55rem", fontSize:"0.73rem", color:C.gold, lineHeight:1.55 }}>{t}</div>
        );
        if (t.startsWith("💡")) return (
          <div key={i} style={{ background:C.blueL, borderRadius:6, padding:"0.28rem 0.55rem", fontSize:"0.73rem", color:"#1D4ED8", lineHeight:1.55 }}>{t}</div>
        );
        if (t.startsWith("✅")) return (
          <div key={i} style={{ fontSize:"0.73rem", color:C.green, lineHeight:1.55, paddingLeft:"0.25rem" }}>{t}</div>
        );
        if (t.startsWith("❌")) return (
          <div key={i} style={{ fontSize:"0.73rem", color:C.red, lineHeight:1.55, paddingLeft:"0.25rem" }}>{t}</div>
        );
        if (t.startsWith("•")) return (
          <div key={i} style={{ fontFamily:"Georgia,serif", fontSize:"0.78rem", color:C.ink, lineHeight:1.65, paddingLeft:"0.4rem" }}>{t}</div>
        );
        if (/^[A-ZÀÂÁÉÈÊËÎÏÔÙÛÜ\s()]+:/.test(t) || (t.endsWith(":") && t.length < 50)) return (
          <div key={i} style={{ fontSize:"0.68rem", color:C.purple, fontWeight:700, textTransform:"uppercase", letterSpacing:0.6, marginTop:"0.3rem", lineHeight:1.4 }}>{t}</div>
        );
        return <div key={i} style={{ fontSize:"0.76rem", color:C.ink, lineHeight:1.65 }}>{t}</div>;
      })}
    </div>
  );
}

export function GrammarPresets({ onLoad }) {
  const [open, setOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [openPoints, setOpenPoints] = useState(new Set());

  return (
    <div style={{ background:C.white, border:`1.5px solid ${C.purple}33`, borderRadius:12, overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,0.05)" }}>
      <button onClick={()=>{ setOpen(o=>!o); setSelectedUnit(null); }}
        style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0.65rem 0.9rem", background:"transparent", border:"none", cursor:"pointer", fontFamily:"inherit" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <span style={{ fontSize:"0.85rem" }}>📘</span>
          <div style={{ textAlign:"left" }}>
            <div style={{ fontSize:"0.78rem", fontWeight:600, color:C.purple }}>Ngữ pháp Édito A1 — theo unité</div>
            <div style={{ fontSize:"0.65rem", color:C.gray }}>11 unités · giải thích + ví dụ + bài tập</div>
          </div>
        </div>
        <span style={{ fontSize:"0.8rem", color:C.gray }}>{open?"▲":"▼"}</span>
      </button>

      {open && !selectedUnit && (
        <div style={{ borderTop:`1px solid ${C.border}`, padding:"0.6rem" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.4rem" }}>
            {EDITO_GRAMMAR.map(u => (
              <button key={u.id} onClick={()=>{ setSelectedUnit(u); setOpenPoints(new Set()); }}
                style={{ background:C.cream, border:`1px solid ${C.border}`, borderRadius:8, padding:"0.55rem 0.6rem", textAlign:"left", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.background=C.purpleL}
                onMouseLeave={e=>e.currentTarget.style.background=C.cream}>
                <div style={{ display:"flex", gap:"0.35rem", alignItems:"center" }}>
                  <span style={{ background:C.purple, color:C.white, fontSize:"0.58rem", fontWeight:700, borderRadius:20, padding:"0.1rem 0.38rem", whiteSpace:"nowrap" }}>U{u.num}</span>
                  <div>
                    <div style={{ fontSize:"0.75rem", fontWeight:600, color:C.ink, lineHeight:1.2 }}>{u.title}</div>
                    <div style={{ fontSize:"0.62rem", color:C.gray }}>{u.points.length} điểm ngữ pháp</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {open && selectedUnit && (
        <div style={{ borderTop:`1px solid ${C.border}` }}>
          <button onClick={()=>{ setSelectedUnit(null); setOpenPoints(new Set()); }}
            style={{ display:"flex", alignItems:"center", gap:"0.4rem", padding:"0.5rem 0.9rem", background:"transparent", border:"none", cursor:"pointer", fontSize:"0.72rem", color:C.gray, fontFamily:"inherit" }}>
            ← Tất cả unités
          </button>
          <div style={{ padding:"0 0.75rem 0.75rem", display:"flex", flexDirection:"column", gap:"0.5rem" }}>
            {selectedUnit.points.map((p, i) => {
              const isOpen = openPoints.has(i);
              const toggle = () => setOpenPoints(prev => { const s=new Set(prev); s.has(i)?s.delete(i):s.add(i); return s; });
              return (
                <div key={i} style={{ background:C.white, border:`1.5px solid ${isOpen?C.purple+"55":C.border}`, borderRadius:12, overflow:"hidden", boxShadow:`0 2px 8px rgba(91,79,207,${isOpen?0.1:0.04})`, transition:"border-color 0.2s" }}>
                  {/* Clickable header */}
                  <div onClick={toggle} style={{ background:isOpen?C.purpleL:C.white, padding:"0.6rem 0.75rem", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", transition:"background 0.2s" }}>
                    <div style={{ fontSize:"0.78rem", fontWeight:600, color:C.purple, lineHeight:1.3, flex:1 }}>{p.topic}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", flexShrink:0 }}>
                      <button onClick={e=>{ e.stopPropagation(); onLoad(p.topic); }}
                        style={{ background:C.purple, color:C.white, border:"none", borderRadius:20, padding:"0.2rem 0.6rem", fontSize:"0.62rem", cursor:"pointer", whiteSpace:"nowrap" }}>
                        Luyện tập →
                      </button>
                      <span style={{ color:C.purple, fontSize:"0.75rem", transform:isOpen?"rotate(180deg)":"none", transition:"transform 0.2s" }}>▾</span>
                    </div>
                  </div>
                  {/* Collapsible body */}
                  {isOpen && (
                    <div style={{ padding:"0.65rem 0.85rem", borderTop:`1px solid ${C.purple}22` }}>
                      <div style={{ background:C.cream, borderRadius:8, padding:"0.55rem 0.7rem", borderLeft:`3px solid ${C.purple}`, marginBottom:"0.65rem" }}>
                        <RuleRenderer text={p.rule}/>
                      </div>
                      <div style={{ fontSize:"0.63rem", textTransform:"uppercase", letterSpacing:0.8, color:C.gray, marginBottom:"0.4rem", fontWeight:600 }}>Ví dụ</div>
                      <div style={{ display:"flex", flexDirection:"column", gap:"0.45rem" }}>
                        {p.examples.map((ex, j) => {
                          const parts = ex.split(" — ");
                          const fr = parts[0] || ex;
                          const vi = parts[1] || "";
                          return (
                            <div key={j} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:8, padding:"0.45rem 0.65rem" }}>
                              <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", marginBottom: vi?"0.2rem":0 }}>
                                <span style={{ fontSize:"0.65rem", color:C.purple, flexShrink:0 }}>▸</span>
                                <span style={{ fontFamily:"Georgia,serif", fontSize:"0.8rem", color:C.ink, fontStyle:"italic", flex:1 }}>{fr}</span>
                                <SpeakBtn text={fr} size="0.7rem"/>
                              </div>
                              {vi && <div style={{ fontSize:"0.72rem", color:C.gray, marginLeft:"1.1rem", lineHeight:1.5 }}>→ {vi}</div>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function GrammarExplanation({ rules, text }) {
  // Prefer structured rules array; fall back to splitting plain text
  const items = rules && rules.length > 0 ? rules : (
    text ? text.split(/(?<=\S)\s+(?=\d+\.\s)|\n+/).filter(l => l.trim()).map(l => {
      if (/^⚠/.test(l.trim())) return { type: "warning", content: l.trim() };
      if (/^(Ngoại lệ|Lưu ý)/i.test(l.trim())) return { type: "note", content: l.trim() };
      return { type: "rule", content: l.trim() };
    }) : []
  );

  if (!items.length) return null;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem" }}>
      {items.map((item, i) => {
        if (item.type === "warning") return (
          <div key={i} style={{ display:"flex", gap:"0.5rem", alignItems:"flex-start", background:"#fff8e6", border:"1px solid #f5c842", borderRadius:8, padding:"0.45rem 0.7rem" }}>
            <span style={{ fontSize:"0.9rem", flexShrink:0 }}>⚠️</span>
            <span style={{ fontSize:"0.78rem", color:"#7a5800", lineHeight:1.6 }}>{item.content.replace(/^⚠️?\s*/, "")}</span>
          </div>
        );
        if (item.type === "note") return (
          <div key={i} style={{ fontSize:"0.75rem", color:C.purple, lineHeight:1.6, padding:"0.35rem 0.65rem", background:C.purpleL, borderRadius:8, fontStyle:"italic" }}>
            {item.content}
          </div>
        );
        // type === "rule" — check if starts with number
        const numMatch = item.content.match(/^(\d+)\.\s*(.*)/s);
        if (numMatch) {
          const num = numMatch[1];
          const rest = numMatch[2];
          const colonIdx = rest.indexOf(":");
          const title = colonIdx > -1 ? rest.slice(0, colonIdx).trim() : rest;
          const detail = colonIdx > -1 ? rest.slice(colonIdx + 1).trim() : "";
          return (
            <div key={i} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:10, overflow:"hidden" }}>
              <div style={{ background:C.purple, padding:"0.3rem 0.7rem", display:"flex", alignItems:"center", gap:"0.5rem" }}>
                <span style={{ background:C.white, color:C.purple, fontWeight:700, fontSize:"0.65rem", borderRadius:"50%", width:"1.2rem", height:"1.2rem", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{num}</span>
                <span style={{ fontSize:"0.78rem", color:C.white, fontWeight:600, lineHeight:1.4 }}>{title}</span>
              </div>
              {detail && <div style={{ padding:"0.4rem 0.7rem", fontSize:"0.76rem", color:C.ink, lineHeight:1.7, fontFamily:"Georgia,serif", fontStyle:"italic" }}>{detail}</div>}
            </div>
          );
        }
        // Plain rule
        return (
          <div key={i} style={{ fontSize:"0.78rem", color:C.ink, lineHeight:1.7, padding:"0.1rem 0.1rem" }}>
            {item.content}
          </div>
        );
      })}
    </div>
  );
}

// ── Edito unit list (primary grammar view) ────────────────
function EditoGrammarView({ defaultUnitIndex, fromParcours, onBackToParcours }) {
  const [selectedUnit, setSelectedUnit] = useState(null);

  useEffect(() => {
    // Deep-link from Parcours takes priority, otherwise restore last-viewed unit
    if (defaultUnitIndex != null) {
      const unit = EDITO_GRAMMAR[defaultUnitIndex] || EDITO_GRAMMAR[0];
      if (unit) setSelectedUnit(unit);
    } else {
      const saved = localStorage.getItem("grammar_last_unit");
      if (saved) {
        const unit = EDITO_GRAMMAR.find(u => u.id === saved);
        if (unit) setSelectedUnit(unit);
      }
    }
    // Deep-link from global search: mở sẵn đúng điểm ngữ pháp
    const openPoint = localStorage.getItem("grammar_open_point");
    if (openPoint !== null) {
      localStorage.removeItem("grammar_open_point");
      const idx = parseInt(openPoint, 10);
      if (!Number.isNaN(idx)) setOpenPoints(new Set([idx]));
    }
  }, [defaultUnitIndex]);

  // Save last-viewed unit to localStorage whenever it changes
  useEffect(() => {
    if (selectedUnit) localStorage.setItem("grammar_last_unit", selectedUnit.id);
  }, [selectedUnit]);
  const [openPoints, setOpenPoints]     = useState(new Set());
  const [activeExercise, setActiveExercise] = useState(null); // {topic, subId}
  const [, setTick] = useState(0);
  const refresh = () => setTick(t => t + 1);
  // Grammar unit id ("g7") → parcours unit id ("u7"). Points are sub-lessons.
  const gUnitId = selectedUnit ? "u" + selectedUnit.id.replace("g", "") : null;
  const gDone   = gUnitId ? getSubDone(gUnitId, "grammar") : {};
  const [loading, setLoading]   = useState(false);
  const [result, setResult]     = useState(null);
  const [err, setErr]           = useState("");
  const quizRef = useRef(null);

  const launchExercise = async (topic, subId = null) => {
    setActiveExercise({ topic, subId });
    setResult(null); setErr(""); setLoading(true);
    try {
      const data = await callAI(buildGrammarPrompt(topic, "A1", "mixed", 12));
      setResult(data);
      setTimeout(() => quizRef.current?.scrollIntoView({ behavior:"smooth", block:"start" }), 150);
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  const renderExercises = () => {
    if (!result) return null;
    const onW = () => {};
    // Mark the specific grammar point done when its exercise is first answered.
    const onFirst = () => {
      if (gUnitId && activeExercise?.subId) markSubDone(gUnitId, "grammar", activeExercise.subId);
    };
    if (result.type==="mc") return <GrammarMC exercises={result.exercises} onWrong={onW} onFirstAnswer={onFirst}/>;
    if (result.type==="fill") return <GrammarFill exercises={result.exercises} onFirstAnswer={onFirst}/>;
    if (result.type==="order") return <GrammarOrder exercises={result.exercises} onFirstAnswer={onFirst}/>;
    if (result.type==="mixed") return result.sections?.map((sec,i)=>(
      <div key={i} style={{marginBottom:"0.5rem"}}>
        <SecLabel icon={sec.sectionType==="mc"?"☑":sec.sectionType==="fill"?"✏️":"🔀"} text={sec.sectionType==="mc"?"Chọn đáp án":sec.sectionType==="fill"?"Điền vào chỗ trống":"Sắp xếp câu"}/>
        {sec.sectionType==="mc"&&<GrammarMC exercises={sec.exercises} onWrong={onW} onFirstAnswer={onFirst}/>}
        {sec.sectionType==="fill"&&<GrammarFill exercises={sec.exercises} onFirstAnswer={onFirst}/>}
        {sec.sectionType==="order"&&<GrammarOrder exercises={sec.exercises} onFirstAnswer={onFirst}/>}
      </div>
    ));
    return null;
  };

  // Exercise view
  if (activeExercise) {
    return (
      <div style={{ padding:"1rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.9rem" }}>
          <button onClick={() => { setActiveExercise(null); setResult(null); }}
            style={{ background:C.purpleL, border:`1.5px solid ${C.purple}33`, color:C.purple, padding:"0.3rem 0.75rem", borderRadius:10, fontSize:"0.78rem", cursor:"pointer", fontWeight:600 }}>
            ← Quay lại
          </button>
          {result && !loading && (
            <button onClick={() => launchExercise(activeExercise.topic)}
              style={{ padding:"0.25rem 0.65rem", border:`1.5px solid ${C.border}`, borderRadius:20, background:C.white, color:C.ink, fontSize:"0.68rem", cursor:"pointer" }}>
              🔄 Tạo lại
            </button>
          )}
        </div>
        {loading && (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.8rem", padding:"2rem", color:C.gray }}>
            <Spinner /><span style={{ fontSize:"0.88rem" }}>AI đang tạo bài tập...</span>
          </div>
        )}
        {err && <div style={{ color:C.red, padding:"0.75rem", background:C.redL, borderRadius:10, fontSize:"0.82rem" }}>⚠ {err}</div>}
        {result && !loading && (
          <>
            {(result.explanationRules?.length > 0 || result.explanation) && (
              <div style={{ background:C.purpleL, border:`1px solid #d4c5f5`, borderRadius:12, padding:"0.75rem 0.9rem", marginBottom:"0.75rem" }}>
                <div style={{ fontSize:"0.65rem", textTransform:"uppercase", letterSpacing:1, color:C.purple, marginBottom:"0.5rem", fontWeight:600 }}>
                  📖 Lý thuyết — {result.topic}
                </div>
                <GrammarExplanation rules={result.explanationRules} text={result.explanation} />
              </div>
            )}
            <div ref={quizRef}>{renderExercises()}</div>
          </>
        )}
      </div>
    );
  }

  // Unit detail
  if (selectedUnit) {
    return (
      <div style={{ padding:"1rem" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"1rem" }}>
          {!fromParcours && (
            <button onClick={() => { setSelectedUnit(null); setOpenPoints(new Set()); }}
              style={{ background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, padding:"0.2rem 0.65rem", borderRadius:20, fontSize:"0.7rem", cursor:"pointer", fontWeight:600 }}>
              ← Quay lại
            </button>
          )}
          <div style={{ background:C.purple, color:"#fff", borderRadius:999, minWidth:28, height:28, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.78rem", fontWeight:700, flexShrink:0 }}>
            {selectedUnit.num}
          </div>
          <div>
            <div style={{ fontWeight:700, color:C.ink, fontSize:"0.95rem" }}>Unité {selectedUnit.num}</div>
            <div style={{ fontSize:"0.72rem", color:C.purple, fontStyle:"italic" }}>{selectedUnit.title}</div>
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
          {selectedUnit.points.map((p, i) => {
            const isOpen = openPoints.has(i);
            const subId  = "p" + i;
            const isDone = !!gDone[subId];
            const toggle = () => setOpenPoints(prev => { const s=new Set(prev); s.has(i)?s.delete(i):s.add(i); return s; });
            return (
              <div key={i} style={{ background: isDone ? C.greenL : C.white, border:`1.5px solid ${isDone ? C.green+"66" : isOpen?C.purple+"55":C.border}`, borderRadius:12, overflow:"hidden", transition:"border-color 0.2s" }}>
                <div onClick={toggle} style={{ background:isOpen?C.purpleL:(isDone?C.greenL:C.white), padding:"0.65rem 0.85rem", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", transition:"background 0.2s" }}>
                  <div style={{ fontSize:"0.8rem", fontWeight:600, color:C.purple, lineHeight:1.3, flex:1 }}>{p.topic}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", flexShrink:0 }}>
                    <button onClick={e=>{ e.stopPropagation(); launchExercise(p.topic, subId); }}
                      style={{ background:C.purple, color:C.white, border:"none", borderRadius:20, padding:"0.22rem 0.65rem", fontSize:"0.63rem", cursor:"pointer", whiteSpace:"nowrap" }}>
                      Làm bài tập →
                    </button>
                    <span style={{
                      display:"inline-flex", alignItems:"center", gap:3, whiteSpace:"nowrap",
                      background:isOpen?C.purple:"transparent", color:isOpen?"#fff":C.purple,
                      border:`1.5px solid ${C.purple}55`, borderRadius:20,
                      padding:"0.18rem 0.55rem", fontSize:"0.63rem", fontWeight:600,
                      transition:"all 0.2s",
                    }}>
                      📖 Lý thuyết
                      <span style={{ transform:isOpen?"rotate(180deg)":"none", transition:"transform 0.2s", display:"inline-block", fontSize:"0.7rem" }}>▾</span>
                    </span>
                  </div>
                </div>
                {/* Sub-lesson done state */}
                <div style={{ display:"flex", justifyContent:"flex-end", padding:"0 0.85rem", marginTop: isOpen ? 0 : "-0.2rem", marginBottom:"0.4rem" }}>
                  {isDone ? (
                    <span style={{ display:"inline-flex", alignItems:"center", gap:"0.35rem" }}>
                      <span style={{ background:C.green, color:"#fff", borderRadius:20, padding:"0.1rem 0.5rem", fontSize:"0.6rem", fontWeight:700 }}>✓ Đã học</span>
                      <span role="button" onClick={(e)=>{ e.stopPropagation(); unmarkSubDone(gUnitId,"grammar",subId); refresh(); }}
                        style={{ background:"#fff", color:C.green, border:`1px solid ${C.green}66`, borderRadius:20, padding:"0.1rem 0.5rem", fontSize:"0.6rem", fontWeight:700, cursor:"pointer" }}>↻ Làm lại</span>
                    </span>
                  ) : (
                    <span role="button" onClick={(e)=>{ e.stopPropagation(); markSubDone(gUnitId,"grammar",subId); refresh(); }}
                      style={{ background:"#fff", color:C.gray, border:`1px solid ${C.border}`, borderRadius:20, padding:"0.1rem 0.5rem", fontSize:"0.6rem", fontWeight:600, cursor:"pointer" }}>✓ Đánh dấu đã học</span>
                  )}
                </div>
                {isOpen && (
                  <div style={{ padding:"0.65rem 0.85rem", borderTop:`1px solid ${C.purple}22` }}>
                    <div style={{ background:C.cream, borderRadius:8, padding:"0.55rem 0.7rem", borderLeft:`3px solid ${C.purple}`, marginBottom:"0.65rem" }}>
                      <RuleRenderer text={p.rule}/>
                    </div>
                    <div style={{ fontSize:"0.63rem", textTransform:"uppercase", letterSpacing:0.8, color:C.gray, marginBottom:"0.4rem", fontWeight:600 }}>Ví dụ</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem" }}>
                      {p.examples.map((ex, j) => {
                        const parts = ex.split(" — ");
                        const fr = parts[0] || ex;
                        const vi = parts[1] || "";
                        return (
                          <div key={j} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:8, padding:"0.45rem 0.65rem" }}>
                            <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", marginBottom:vi?"0.2rem":0 }}>
                              <span style={{ fontSize:"0.65rem", color:C.purple, flexShrink:0 }}>▸</span>
                              <span style={{ fontFamily:"Georgia,serif", fontSize:"0.8rem", color:C.ink, fontStyle:"italic", flex:1 }}>{fr}</span>
                              <SpeakBtn text={fr} size="0.7rem"/>
                            </div>
                            {vi && <div style={{ fontSize:"0.72rem", color:C.gray, marginLeft:"1.1rem", lineHeight:1.5 }}>→ {vi}</div>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Unit list
  return (
    <div style={{ padding:"1rem" }}>
      <div style={{ marginBottom:"1rem" }}>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1rem", color:C.ink, fontWeight:700, marginBottom:"0.2rem" }}>
          📘 Ngữ pháp Edito A1
        </div>
        <div style={{ fontSize:"0.72rem", color:C.gray }}>Chọn unité để xem điểm ngữ pháp & làm bài tập</div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:"0.45rem" }}>
        {EDITO_GRAMMAR.map((u, i) => (
          <button key={u.id} onClick={() => { setSelectedUnit(u); setOpenPoints(new Set()); }}
            style={{ display:"flex", alignItems:"center", gap:"0.85rem", background:C.white, border:`1.5px solid ${C.purple}22`, borderRadius:14, padding:"0.75rem 1rem", cursor:"pointer", textAlign:"left", fontFamily:"inherit", animation:`fadeUp 0.2s ease ${i*0.03}s both`, transition:"all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.background = C.purpleL; e.currentTarget.style.borderColor = C.purple; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.white; e.currentTarget.style.borderColor = `${C.purple}22`; }}>
            <div style={{ background:C.purple, color:"#fff", borderRadius:999, minWidth:30, height:30, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.75rem", fontWeight:700, flexShrink:0 }}>
              {u.num}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700, color:C.ink, fontSize:"0.86rem" }}>Unité {u.num}: {u.title}</div>
              <div style={{ fontSize:"0.67rem", color:C.gray, marginTop:"0.08rem" }}>{u.points.length} điểm ngữ pháp</div>
            </div>
            <span style={{ color:C.gray }}>→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Free-form exercise generator ──────────────────────────
function CustomExerciseView() {
  const [topic, setTopic]     = useState("");
  const [level, setLevel]     = useState("A1");
  const [gtype, setGtype]     = useState("mixed");
  const [numQ, setNumQ]       = useState(12);
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);
  const [err, setErr]         = useState("");
  const [wrongCount, setWrongCount] = useState(0);
  const quizRef = useRef(null);

  const GRAMMAR_BY_LEVEL = {
    A1: ["Động từ être & avoir","Mạo từ le/la/l'/les","Mạo từ un/une/des","Số đếm 0-100","Đại từ nhân xưng","Thì hiện tại (présent)","Phủ định ne...pas","Tính từ sở hữu","Giới từ à & de","Câu hỏi đơn giản"],
    A2: ["Thì quá khứ passé composé","Thì chưa hoàn thành imparfait","Động từ phản thân","Tính từ so sánh","Trạng từ thường gặp","Đại từ COD & COI","Giới từ chỉ nơi chốn","Mạo từ partitif du/de la","Tương lai gần futur proche","Câu mệnh lệnh impératif"],
    B1: ["Thì tương lai đơn futur simple","Điều kiện hiện tại conditionnel","Mệnh đề quan hệ qui/que","Câu bị động voix passive","Liên từ phức tạp","Đại từ y & en","Thì subjonctif cơ bản","So sánh nhất (superlatif)","Câu gián tiếp","Động từ khuyết thiếu devoir/pouvoir"],
    B2: ["Subjonctif nâng cao","Conditionnel passé","Plus-que-parfait","Câu điều kiện loại 2 & 3","Đảo ngữ trong câu hỏi","Mệnh đề phân từ (participe)","Câu nhượng bộ","Phủ định phức tạp ne...que","Gérondif","Câu cảm thán"],
    C1: ["Subjonctif passé","Đảo ngữ văn phong cao","Nominalisaton","Câu điều kiện hỗn hợp","Liên từ nối câu phức","Phong cách viết trang trọng","Passif với các thì phức","Vị từ tri giác","Câu giả định","Cohérence du discours"],
    C2: ["Văn phong văn học","Archaïsmes & néologismes","Nuances du subjonctif","Rhétorique & argumentation","Registres de langue","Ironie & implicite","Syntaxe complexe","Ellipse & anaphore","Figures de style","Cohésion textuelle"],
  };

  const generate = async (overrideTopic) => {
    const t = (overrideTopic !== undefined ? overrideTopic : topic).trim();
    if (!t) { setErr("Nhập chủ đề ngữ pháp!"); return; }
    setLoading(true); setErr(""); setResult(null); setWrongCount(0);
    try {
      const data = await callAI(buildGrammarPrompt(t, level, gtype, numQ));
      setResult(data);
      setTimeout(() => quizRef.current?.scrollIntoView({ behavior:"smooth", block:"start" }), 150);
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  const renderExercises = () => {
    if (!result) return null;
    const onW = () => setWrongCount(n=>n+1);
    if (result.type==="mc") return <GrammarMC exercises={result.exercises} onWrong={onW}/>;
    if (result.type==="fill") return <GrammarFill exercises={result.exercises}/>;
    if (result.type==="order") return <GrammarOrder exercises={result.exercises}/>;
    if (result.type==="mixed") return result.sections?.map((sec,i)=>(
      <div key={i} style={{marginBottom:"0.5rem"}}>
        <SecLabel icon={sec.sectionType==="mc"?"☑":sec.sectionType==="fill"?"✏️":"🔀"} text={sec.sectionType==="mc"?"Chọn đáp án":sec.sectionType==="fill"?"Điền vào chỗ trống":"Sắp xếp câu"}/>
        {sec.sectionType==="mc"&&<GrammarMC exercises={sec.exercises} onWrong={onW}/>}
        {sec.sectionType==="fill"&&<GrammarFill exercises={sec.exercises}/>}
        {sec.sectionType==="order"&&<GrammarOrder exercises={sec.exercises}/>}
      </div>
    ));
    return null;
  };

  return (
    <div style={{ padding:"1rem", display:"flex", flexDirection:"column", gap:"0.75rem" }}>
      <div style={{ background:C.cream, borderRadius:12, padding:"0.9rem", display:"flex", flexDirection:"column", gap:"0.65rem" }}>
        <div style={{ fontSize:"0.72rem", fontWeight:600, color:C.purple }}>🎯 Nhập chủ đề tùy chỉnh</div>
        <div>
          <div style={{ fontSize:"0.65rem", color:C.gray, marginBottom:"0.3rem" }}>Chủ đề ngữ pháp</div>
          <input value={topic} onChange={e=>setTopic(e.target.value)} onKeyDown={e=>e.key==="Enter"&&generate()}
            placeholder="vd: chia động từ, mạo từ, thì quá khứ..."
            style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:8, padding:"0.5rem 0.7rem", fontSize:"0.82rem", fontFamily:"inherit", outline:"none", color:C.ink, boxSizing:"border-box" }}/>
        </div>
        <div>
          <div style={{ fontSize:"0.63rem", color:C.gray, marginBottom:"0.3rem" }}>Gợi ý {level}:</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.28rem" }}>
            {(GRAMMAR_BY_LEVEL[level]||[]).map((s,i)=>(
              <button key={i} onClick={()=>setTopic(s)}
                style={{ padding:"0.18rem 0.5rem", border:`1px solid ${topic===s?C.purple:C.border}`, borderRadius:20, background:topic===s?C.purple:C.white, color:topic===s?C.white:C.gray, fontSize:"0.65rem", cursor:"pointer", fontFamily:"inherit" }}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize:"0.65rem", color:C.gray, marginBottom:"0.3rem" }}>Trình độ</div>
          <div style={{ display:"flex", gap:"0.28rem" }}>
            {LEVELS.map(l=>(
              <button key={l} onClick={()=>{ setLevel(l); setTopic(""); }}
                style={{ flex:1, padding:"0.35rem 0.2rem", border:`1.5px solid ${level===l?C.purple:C.border}`, borderRadius:7, background:level===l?C.purple:C.white, color:level===l?C.white:C.ink, fontSize:"0.72rem", cursor:"pointer", fontFamily:"inherit" }}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize:"0.65rem", color:C.gray, marginBottom:"0.3rem" }}>Dạng bài tập</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.28rem" }}>
            {GTYPES.map(t=>(
              <button key={t.id} onClick={()=>setGtype(t.id)}
                style={{ padding:"0.4rem 0.3rem", border:`1.5px solid ${gtype===t.id?C.purple:C.border}`, borderRadius:8, background:gtype===t.id?C.purple:C.white, color:gtype===t.id?C.white:C.ink, fontSize:"0.73rem", cursor:"pointer", fontFamily:"inherit" }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <span style={{ fontSize:"0.65rem", color:C.gray, whiteSpace:"nowrap" }}>Số câu:</span>
          <input type="range" min={10} max={20} value={numQ} onChange={e=>setNumQ(Number(e.target.value))} style={{ flex:1, accentColor:C.blue }}/>
          <span style={{ fontFamily:"Georgia,serif", fontSize:"0.95rem", color:C.purple, fontWeight:600, minWidth:22 }}>{numQ}</span>
        </div>
        {err && <div style={{ color:C.red, fontSize:"0.75rem", padding:"0.38rem 0.58rem", background:C.redL, borderRadius:6 }}>⚠ {err}</div>}
        <button onClick={()=>generate()} disabled={loading}
          style={{ padding:"0.75rem", background:loading?C.gray:C.ink, color:C.paper, border:"none", borderRadius:8, fontFamily:"Georgia,serif", fontSize:"0.92rem", cursor:loading?"not-allowed":"pointer" }}>
          {loading?"Đang tạo bài tập...":"Tạo bài tập ✦"}
        </button>
      </div>

      {(result?.explanationRules?.length > 0 || result?.explanation) && (
        <div style={{ background:C.purpleL, border:`1px solid #d4c5f5`, borderRadius:12, padding:"0.75rem 0.9rem" }}>
          <div style={{ fontSize:"0.65rem", textTransform:"uppercase", letterSpacing:1, color:C.purple, marginBottom:"0.6rem", fontWeight:600 }}>
            📖 Lý thuyết — {result.topic} · {result.level}
          </div>
          <GrammarExplanation rules={result.explanationRules} text={result.explanation} />
        </div>
      )}
      {loading && (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:160, gap:"0.7rem", color:C.gray }}>
          <Spinner/><span style={{ fontSize:"0.83rem" }}>AI đang tạo bài tập...</span>
        </div>
      )}
      {!loading && result && (
        <div ref={quizRef}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.75rem" }}>
            <span style={{ background:C.purple, color:C.white, fontSize:"0.6rem", padding:"0.16rem 0.52rem", borderRadius:20, textTransform:"uppercase", letterSpacing:0.5 }}>{result.topic} · {result.level}</span>
            <button onClick={()=>generate()} style={{ padding:"0.23rem 0.6rem", border:`1.5px solid ${C.border}`, borderRadius:20, background:C.white, color:C.ink, fontSize:"0.68rem", cursor:"pointer", fontFamily:"inherit" }}>🔄 Tạo lại</button>
          </div>
          {renderExercises()}
        </div>
      )}
    </div>
  );
}

// ── Detective exercise ─────────────────────────────────────────
function GrammarDetective({ exercises }) {
  const [states, setStates] = useState(() =>
    exercises.map(() => ({ selected: null, submitted: false }))
  );
  const select = (qi, wi) =>
    setStates(prev => prev.map((s, i) => i === qi && !s.submitted ? { ...s, selected: wi } : s));
  const submit = (qi) =>
    setStates(prev => prev.map((s, i) => i === qi ? { ...s, submitted: true } : s));

  return (
    <div>
      {exercises.map((q, qi) => {
        const st = states[qi];
        const correct = st.submitted && st.selected === q.errorIndex;
        const wrong   = st.submitted && st.selected !== q.errorIndex;
        return (
          <div key={qi} style={{ background:C.white, border:`1.5px solid ${st.submitted ? (correct ? C.green : C.red) + "55" : C.border}`, borderRadius:14, padding:"0.9rem 1rem", marginBottom:"0.65rem" }}>
            <div style={{ fontSize:"0.62rem", color:C.purple, fontWeight:700, marginBottom:"0.55rem", textTransform:"uppercase", letterSpacing:1 }}>
              🔍 Tìm lỗi sai · {q.rule}
            </div>
            {/* Tappable word chips */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:"0.3rem", marginBottom:"0.7rem" }}>
              {q.words.map((w, wi) => {
                const isErr      = st.submitted && wi === q.errorIndex;
                const isSel      = st.selected === wi;
                return (
                  <button key={wi} onClick={() => select(qi, wi)}
                    style={{
                      padding:"0.22rem 0.55rem", borderRadius:8,
                      border:`1.5px solid ${isErr ? C.red : isSel ? C.purple : C.border}`,
                      background: isErr ? C.redL : isSel ? C.purpleL : C.white,
                      color: isErr ? C.red : isSel ? C.purple : C.ink,
                      fontSize:"0.92rem", fontFamily:"'Playfair Display',Georgia,serif",
                      fontWeight: (isSel || isErr) ? 700 : 400,
                      cursor: st.submitted ? "default" : "pointer",
                      transition:"all 0.15s",
                    }}>
                    {w}
                  </button>
                );
              })}
            </div>

            {!st.submitted ? (
              <button onClick={() => st.selected !== null && submit(qi)}
                disabled={st.selected === null}
                style={{ padding:"0.35rem 1rem", background: st.selected !== null ? C.purple : C.border, border:"none", borderRadius:10, color:"#fff", fontSize:"0.78rem", cursor: st.selected !== null ? "pointer" : "default", fontWeight:600, fontFamily:"inherit" }}>
                Xác nhận
              </button>
            ) : (
              <div>
                <div style={{ fontWeight:700, fontSize:"0.82rem", marginBottom:"0.4rem", color: correct ? C.green : C.red }}>
                  {correct ? "✓ Đúng!" : "✗ Sai."} Từ sai là <em>"{q.words[q.errorIndex]}"</em> → sửa thành <strong>"{q.correction}"</strong>
                </div>
                <div style={{ background:C.purpleL, borderRadius:10, padding:"0.55rem 0.8rem", fontSize:"0.74rem", color:C.ink, lineHeight:1.6 }}>
                  📖 {q.explanation}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Detective tab view ────────────────────────────────────────
function DetectiveView() {
  const [topic,   setTopic]   = useState("");
  const [level,   setLevel]   = useState("A1");
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState(null);
  const [err,     setErr]     = useState("");
  const quizRef = useRef(null);

  const QUICK = {
    A1:["Mạo từ le/la/l'","Chia être & avoir","Tính từ giống số","Phủ định ne…pas","Giới từ à & de"],
    A2:["Passé composé","Accord du participe","Imparfait","Pronoms COD/COI","Futur proche"],
    B1:["Subjonctif","Conditionnel","Pronoms y & en","Voix passive","Futur simple"],
  };

  const generate = async (t = topic) => {
    const topic_ = t.trim(); if (!topic_) return;
    setLoading(true); setErr(""); setResult(null);
    try {
      const data = await callAI(buildDetectivePrompt(topic_, level, 6));
      setResult(data);
      setTimeout(() => quizRef.current?.scrollIntoView({ behavior:"smooth", block:"start" }), 150);
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  return (
    <div style={{ padding:"1rem", display:"flex", flexDirection:"column", gap:"0.75rem" }}>
      {/* Intro */}
      <div style={{ background:"#FFFBEB", border:"1px solid #F59E0B44", borderRadius:12, padding:"0.75rem 0.9rem", fontSize:"0.78rem", color:"#92400E", lineHeight:1.6 }}>
        🔍 <strong>Thám tử lỗi sai</strong> — Mỗi câu có đúng 1 lỗi ngữ pháp cố ý. Bấm vào từ bạn cho là sai, rồi nhấn "Xác nhận".
      </div>

      {/* Config */}
      <div style={{ background:C.cream, borderRadius:12, padding:"0.9rem", display:"flex", flexDirection:"column", gap:"0.6rem" }}>
        <div style={{ fontSize:"0.65rem", color:C.gray, marginBottom:"0.1rem" }}>Chủ đề ngữ pháp</div>
        <input value={topic} onChange={e => setTopic(e.target.value)} onKeyDown={e => e.key==="Enter" && generate()}
          placeholder="vd: mạo từ, chia động từ, passé composé…"
          style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:8, padding:"0.5rem 0.7rem", fontSize:"0.82rem", fontFamily:"inherit", outline:"none", color:C.ink, boxSizing:"border-box" }} />
        {/* Quick picks */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.28rem" }}>
          {(QUICK[level] || QUICK.A1).map(s => (
            <button key={s} onClick={() => { setTopic(s); generate(s); }}
              style={{ padding:"0.18rem 0.55rem", border:`1px solid ${topic===s ? C.purple : C.border}`, borderRadius:20, background: topic===s ? C.purple : C.white, color: topic===s ? C.white : C.gray, fontSize:"0.65rem", cursor:"pointer", fontFamily:"inherit" }}>
              {s}
            </button>
          ))}
        </div>
        {/* Level */}
        <div style={{ display:"flex", gap:"0.28rem" }}>
          {["A1","A2","B1","B2"].map(l => (
            <button key={l} onClick={() => { setLevel(l); setTopic(""); }}
              style={{ flex:1, padding:"0.32rem", border:`1.5px solid ${level===l ? C.purple : C.border}`, borderRadius:7, background: level===l ? C.purple : C.white, color: level===l ? C.white : C.ink, fontSize:"0.72rem", cursor:"pointer", fontFamily:"inherit" }}>
              {l}
            </button>
          ))}
        </div>
        <button onClick={() => generate()} disabled={!topic.trim() || loading}
          style={{ padding:"0.6rem", background: topic.trim() && !loading ? C.purple : C.border, border:"none", borderRadius:10, color:"#fff", fontSize:"0.85rem", fontWeight:700, cursor: topic.trim() && !loading ? "pointer" : "default", fontFamily:"inherit" }}>
          {loading ? "Đang tạo…" : "🔍 Tạo bài tập"}
        </button>
      </div>

      {loading && (
        <div style={{ display:"flex", justifyContent:"center", padding:"1.5rem", gap:"0.8rem", color:C.gray, alignItems:"center" }}>
          <Spinner /><span style={{ fontSize:"0.88rem" }}>AI đang tạo câu lỗi sai…</span>
        </div>
      )}
      {err && <div style={{ color:C.red, background:C.redL, borderRadius:10, padding:"0.75rem", fontSize:"0.82rem" }}>⚠ {err}</div>}
      {result && (
        <div ref={quizRef}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.5rem" }}>
            <div style={{ fontSize:"0.7rem", color:C.gray }}>{result.exercises?.length} câu · chủ đề: {result.topic}</div>
            <button onClick={() => generate()} style={{ padding:"0.22rem 0.65rem", border:`1px solid ${C.border}`, borderRadius:20, background:C.white, color:C.ink, fontSize:"0.67rem", cursor:"pointer" }}>🔄 Tạo lại</button>
          </div>
          <GrammarDetective exercises={result.exercises || []} />
        </div>
      )}
    </div>
  );
}

export default function GrammarPanel({ onBackToParcours }) {
  const [panelTab, setPanelTab] = useState("edito");
  const [fromParcours, setFromParcours] = useState(false);
  const [initUnit, setInitUnit] = useState(null);

  // Read parcours deep-link in an effect (not a useState initializer) so the
  // localStorage read+remove side-effect stays StrictMode-safe — mirrors the
  // working pattern in EditoVocabPanel.
  useEffect(() => {
    if (localStorage.getItem("parcours_back")) {
      setFromParcours(true);
      localStorage.removeItem("parcours_back");
    }
    const idx = localStorage.getItem("parcours_unit_idx");
    if (idx !== null) {
      setInitUnit(Number(idx));
      localStorage.removeItem("parcours_unit_idx");
    }
  }, []);

  const TABS = [
    { id:"edito",     label:"📘 Edito A1"   },
    { id:"custom",    label:"🎯 Tùy chỉnh"  },
    { id:"detective", label:"🔍 Thám tử"    },
  ];

  const tabBar = (
    <div style={{ display:"flex", background:C.white, borderBottom:`1px solid ${C.border}` }}>
      {TABS.map(t => (
        <button key={t.id} onClick={() => setPanelTab(t.id)}
          style={{
            flex:1, padding:"0.6rem 0.3rem",
            border:"none", background:"transparent",
            borderBottom: panelTab===t.id ? `2.5px solid ${C.blue}` : "2.5px solid transparent",
            color: panelTab===t.id ? C.blue : C.gray,
            fontSize:"0.72rem", fontWeight:panelTab===t.id?700:500,
            cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s",
          }}>
          {t.label}
        </button>
      ))}
    </div>
  );

  return (
    <div style={{ animation:"fadeUp 0.3s ease" }}>
      {/* ── Dark hero banner ── */}
      <div style={{ background:`linear-gradient(135deg, ${C.heroFrom} 0%, ${C.heroTo} 100%)`, padding:"0.9rem 1rem 0.85rem" }}>
        {fromParcours && onBackToParcours && (
          <button onClick={onBackToParcours} style={{ background:"rgba(255,255,255,0.15)", border:"none", color:"#fff", fontSize:"0.72rem", fontWeight:600, cursor:"pointer", padding:"0.2rem 0.65rem", borderRadius:20, marginBottom:"0.6rem", fontFamily:"inherit" }}>
            ← Parcours
          </button>
        )}
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.15rem", color:"#fff", fontWeight:800, lineHeight:1.1 }}>
          📘 La Grammaire
        </div>
        <div style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.65)", marginTop:4 }}>
          Ngữ pháp Édito A1 · lý thuyết & luyện tập
        </div>
      </div>
      {tabBar}
      {panelTab === "edito"     && <EditoGrammarView defaultUnitIndex={initUnit} fromParcours={fromParcours} onBackToParcours={onBackToParcours} />}
      {panelTab === "custom"    && <CustomExerciseView />}
      {panelTab === "detective" && <DetectiveView />}
    </div>
  );
}
