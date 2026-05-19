import { useState, useEffect } from "react";
import { C } from "../constants.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import { SecLabel, QCard } from "./ui/SharedUI.jsx";

// ── Exercise MC (used by WeakSpotsPanel) ────────────────────
export function ExerciseMC({ ex, idx }) {
  const [ans, setAns] = useState(null);
  const norm = s => (s||"").trim().toLowerCase().replace(/[''`]/g,"'");
  const ok = ans && norm(ans) === norm(ex.answer);
  return (
    <div style={{ marginBottom:"0.7rem" }}>
      <div style={{ fontSize:"0.88rem", fontFamily:"Georgia,serif", marginBottom:"0.45rem", lineHeight:1.5 }}>
        <span style={{ fontSize:"0.63rem", color:C.gray, textTransform:"uppercase", marginRight:"0.4rem" }}>Câu {idx+1}</span>{ex.question}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.28rem" }}>
        {ex.options?.map((opt,j) => {
          let bg=C.white,bc=C.border,col=C.ink;
          if(ans){if(norm(opt)===norm(ex.answer)){bg="#e8f7f1";bc=C.green;col=C.green;}else if(norm(opt)===norm(ans)){bg="#fde8e6";bc=C.red;col=C.red;}}
          return <button key={j} disabled={!!ans} onClick={()=>setAns(opt)}
            style={{padding:"0.38rem 0.5rem",border:`1.5px solid ${bc}`,borderRadius:8,background:bg,color:col,fontSize:"0.77rem",cursor:ans?"default":"pointer",textAlign:"left",fontFamily:"inherit"}}>{opt}</button>;
        })}
      </div>
      {ans && <div style={{ marginTop:"0.35rem", fontSize:"0.73rem", color: ok?C.green:C.gray, lineHeight:1.5 }}>
        {!ok && <div style={{ color:C.red, marginBottom:"0.1rem" }}>✗ Đáp án: <b>{ex.answer}</b></div>}
        {ok && <div style={{ color:C.green, marginBottom:"0.1rem" }}>✓ Chính xác!</div>}
        {ex.explanation && <div>💡 {ex.explanation}</div>}
      </div>}
    </div>
  );
}

// ── Exercise Fill (used by WeakSpotsPanel) ──────────────────
export function ExerciseFill({ ex, idx }) {
  const [val, setVal] = useState("");
  const [done, setDone] = useState(false);
  const ok = done && val.trim().toLowerCase() === (ex.answer||"").toLowerCase();
  return (
    <div style={{ marginBottom:"0.7rem" }}>
      <div style={{ fontSize:"0.88rem", fontFamily:"Georgia,serif", marginBottom:"0.45rem", lineHeight:1.5 }}>
        <span style={{ fontSize:"0.63rem", color:C.gray, textTransform:"uppercase", marginRight:"0.4rem" }}>Câu {idx+1}</span>
        {ex.sentence}
        {ex.hint && <span style={{ fontSize:"0.72rem", color:C.gold, marginLeft:"0.4rem" }}>({ex.hint})</span>}
      </div>
      <div style={{ display:"flex", gap:"0.38rem", alignItems:"center" }}>
        <input value={val} disabled={done} onChange={e=>setVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!done&&setDone(true)}
          placeholder="Điền vào..."
          style={{ border:`1.5px solid ${done?(ok?C.green:C.red):C.border}`,borderRadius:6,padding:"0.3rem 0.55rem",fontSize:"0.83rem",width:160,fontFamily:"inherit",background:done?(ok?"#e8f7f1":"#fde8e6"):C.white,color:done?(ok?C.green:C.red):C.ink,outline:"none"}}/>
        {!done && <button onClick={()=>setDone(true)} style={{padding:"0.3rem 0.65rem",background:C.purple,color:C.white,border:"none",borderRadius:6,fontSize:"0.73rem",cursor:"pointer"}}>Kiểm tra</button>}
        {done && <span style={{fontSize:"0.73rem",color:ok?C.green:C.red,fontWeight:500}}>{ok?"✓ Đúng!":`✗ Đáp án: ${ex.answer}`}</span>}
      </div>
      {done && ex.explanation && <div style={{ marginTop:"0.3rem", fontSize:"0.73rem", color:C.gray }}>💡 {ex.explanation}</div>}
    </div>
  );
}

// ── MC Section ──────────────────────────────────────────────
export function MCSection({ questions, sl, onRecord, onWrong }) {
  const [ans, setAns] = useState({});
  const normalize = s => (s||"").trim().toLowerCase().replace(/[''`]/g,"'").replace(/\s+/g," ");
  const choose = (i, opt, correct, q) => {
    if (ans[i]) return;
    setAns(x => ({ ...x, [i]: opt }));
    const isOk = normalize(opt) === normalize(correct);
    onRecord?.(correct, isOk);
    if (!isOk) onWrong?.(q);
  };
  return (
    <div style={{ marginBottom:"0.5rem" }}>
      {sl && <SecLabel icon="☑" text="Trắc nghiệm" />}
      {questions.map((q, i) => {
        const a = ans[i];
        const norm = s => (s||"").trim().toLowerCase().replace(/[''`]/g,"'").replace(/\s+/g," ");
        const ok = a && norm(a) === norm(q.answer);
        return (
          <QCard key={i} ok={ok} wrong={a && !ok}>
            <div style={{ fontSize:"0.63rem", color:C.gray, textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>Câu {i+1}</div>
            <div style={{ fontFamily:"Georgia,serif", fontSize:"0.93rem", marginBottom:"0.6rem", lineHeight:1.5 }}>{q.question}</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.3rem" }}>
              {q.options.map((opt, j) => {
                let bg = C.white, bc = C.border, col = C.ink;
                if (a) { if (norm(opt)===norm(q.answer)){bg="#e8f7f1";bc=C.green;col=C.green;} else if(norm(opt)===norm(a)){bg="#fde8e6";bc=C.red;col=C.red;} }
                return <button key={j} disabled={!!a} onClick={() => choose(i, opt, q.answer, q)}
                  style={{ padding:"0.42rem 0.55rem", border:`1.5px solid ${bc}`, borderRadius:8, background:bg, color:col, fontSize:"0.78rem", cursor:a?"default":"pointer", textAlign:"left", fontFamily:"inherit" }}>{opt}</button>;
              })}
            </div>
            {a && <div style={{ marginTop:"0.4rem", fontSize:"0.72rem", lineHeight:1.7 }}>
              {ok
                ? <span style={{ color:C.green }}>✓ Chính xác!{q.explanation ? ` — ${q.explanation}` : ""}</span>
                : <><div style={{ color:C.red }}>✗ <b>{a}</b>{q.wrongExplanations?.[a] ? ` — ${q.wrongExplanations[a]}` : ""}</div>
                   <div style={{ color:C.green }}>✓ <b>{q.answer}</b>{q.explanation ? ` — ${q.explanation}` : ""}</div></>
              }
            </div>}
          </QCard>
        );
      })}
    </div>
  );
}

// ── Fill Section ────────────────────────────────────────────
export function FillSection({ questions, sl, onRecord, onWrong }) {
  const [inp, setInp] = useState({});
  const [chk, setChk] = useState({});
  const doCheck = (i, q, v) => {
    if (chk[i]) return;
    const ok = v.trim().toLowerCase() === (q.answer||"").toLowerCase();
    setChk(x => ({ ...x, [i]: true }));
    onRecord?.(q.answer, ok);
    if (!ok) onWrong?.(q);
  };
  return (
    <div style={{ marginBottom:"0.5rem" }}>
      {sl && <SecLabel icon="✏️" text="Điền từ" />}
      {questions.map((q, i) => {
        const v = inp[i]||"", done = chk[i];
        const ok = done && v.trim().toLowerCase()===(q.answer||"").toLowerCase();
        return (
          <QCard key={i} ok={done&&ok} wrong={done&&!ok}>
            <div style={{ fontSize:"0.63rem", color:C.gray, textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>
              Câu {i+1}{q.hint ? <span style={{ color:C.gold, marginLeft:6, textTransform:"none" }}>· gợi ý: {q.hint}</span> : null}
            </div>
            <div style={{ fontFamily:"Georgia,serif", fontSize:"0.9rem", marginBottom:"0.55rem", lineHeight:1.6 }}>{q.sentence}</div>
            <div style={{ display:"flex", gap:"0.38rem", alignItems:"center", flexWrap:"wrap" }}>
              <input value={v} disabled={done} onChange={e => setInp(x=>({...x,[i]:e.target.value}))}
                onKeyDown={e => e.key==="Enter" && doCheck(i,q,v)}
                placeholder="Nhập từ..."
                style={{ border:`1.5px solid ${done?(ok?C.green:C.red):C.border}`, borderRadius:6, padding:"0.3rem 0.55rem", fontSize:"0.83rem", width:160, fontFamily:"inherit", background:done?(ok?"#e8f7f1":"#fde8e6"):C.white, color:done?(ok?C.green:C.red):C.ink, outline:"none" }} />
              {!done && <button onClick={() => doCheck(i,q,v)} style={{ padding:"0.3rem 0.65rem", background:C.purple, color:C.white, border:"none", borderRadius:6, fontSize:"0.73rem", cursor:"pointer", fontFamily:"inherit" }}>Kiểm tra</button>}
              {done && <span style={{ fontSize:"0.73rem", color:ok?C.green:C.red, fontWeight:500 }}>{ok?"✓ Đúng!":`✗ Đáp án: ${q.answer}`}</span>}
            </div>
          </QCard>
        );
      })}
    </div>
  );
}

// ── Match Section ───────────────────────────────────────────
export function MatchSection({ pairs, sl }) {
  const [shuffled] = useState(() => [...pairs].sort(() => Math.random()-0.5));
  const [selFr, setSelFr] = useState(null);
  const [matched, setMatched] = useState({});
  const [wrongKey, setWrongKey] = useState(null);
  const done = Object.keys(matched).length;
  const clickFr = fr => { if (matched[fr]) return; setSelFr(fr===selFr?null:fr); };
  const clickVi = p => {
    if (!selFr || matched[selFr]) return;
    if (p.fr===selFr) { setMatched(m=>({...m,[selFr]:true})); setSelFr(null); }
    else { setWrongKey(selFr+"|"+p.fr); setTimeout(()=>setWrongKey(null),500); setSelFr(null); }
  };
  return (
    <div style={{ marginBottom:"0.5rem" }}>
      {sl && <SecLabel icon="🔗" text="Nối từ" />}
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.42rem" }}>
        <span style={{ fontSize:"0.68rem", color:C.gray }}>Chọn từ Pháp → chọn nghĩa</span>
        <span style={{ fontFamily:"Georgia,serif", color:C.purple, fontSize:"0.85rem" }}>{done}/{pairs.length}</span>
      </div>
      {done===pairs.length && <div style={{ background:C.green, color:C.white, borderRadius:10, padding:"0.55rem 0.9rem", marginBottom:"0.5rem", textAlign:"center", fontSize:"0.82rem" }}>🎉 Hoàn thành! Nối đúng tất cả {pairs.length} cặp</div>}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.45rem" }}>
        <div>
          <div style={{ fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:1, color:C.gray, marginBottom:"0.27rem" }}>Tiếng Pháp</div>
          {pairs.map((p,i) => { const isM=!!matched[p.fr],isSel=selFr===p.fr,isW=wrongKey&&wrongKey.startsWith(p.fr+"|"); return <div key={i} onClick={()=>clickFr(p.fr)} style={{ padding:"0.43rem 0.62rem", border:`1.5px solid ${isM?C.green:isSel?C.purple:isW?C.red:C.border}`, borderRadius:8, marginBottom:"0.28rem", fontSize:"0.78rem", cursor:isM?"default":"pointer", background:isM?"#e8f7f1":isSel?C.purpleL:C.white, color:isM?C.green:isSel?C.purple:C.ink, transition:"all 0.15s", userSelect:"none" }}>{p.fr}</div>; })}
        </div>
        <div>
          <div style={{ fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:1, color:C.gray, marginBottom:"0.27rem" }}>Tiếng Việt</div>
          {shuffled.map((p,i) => { const isM=!!matched[p.fr],isW=wrongKey&&wrongKey.endsWith("|"+p.fr); return <div key={i} onClick={()=>clickVi(p)} style={{ padding:"0.43rem 0.62rem", border:`1.5px solid ${isM?C.green:isW?C.red:C.border}`, borderRadius:8, marginBottom:"0.28rem", fontSize:"0.78rem", cursor:isM?"default":"pointer", background:isM?"#e8f7f1":C.white, color:isM?C.green:C.ink, transition:"all 0.15s", userSelect:"none" }}>{p.vi}</div>; })}
        </div>
      </div>
    </div>
  );
}

// ── Dictée Section ──────────────────────────────────────────
export function DicteeSection({ words, onRecord }) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState({ ok:0, total:0 });
  const [revealed, setRevealed] = useState(false);
  const w = words[idx];
  const isCorrect = checked && input.trim().toLowerCase()===w.fr.toLowerCase();
  const check = () => {
    if (checked) return;
    const ok = input.trim().toLowerCase()===w.fr.toLowerCase();
    setChecked(true);
    setScore(s=>({ok:s.ok+(ok?1:0),total:s.total+1}));
    onRecord?.(w.fr, ok);
  };
  const next = () => { setIdx(i=>Math.min(i+1,words.length-1)); setInput(""); setChecked(false); setRevealed(false); };
  const hint = w.fr.split(" ").map(word => word.length<=2?word:word[0]+"*".repeat(word.length-2)+word[word.length-1]).join(" ");
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.7rem" }}>
        <SecLabel icon="🎧" text="Dictée" />
        <span style={{ fontFamily:"Georgia,serif", color:C.purple, fontSize:"0.88rem" }}>{score.ok}/{score.total}</span>
      </div>
      <div style={{ background:C.white, border:`1.5px solid ${checked?(isCorrect?C.green:C.red):C.border}`, borderRadius:12, padding:"1.5rem 1rem", textAlign:"center", marginBottom:"0.8rem" }}>
        <div style={{ fontSize:"0.65rem", color:C.gray, textTransform:"uppercase", letterSpacing:1, marginBottom:"0.5rem" }}>{idx+1} / {words.length}</div>
        <div style={{ fontFamily:"Georgia,serif", fontSize:"1.3rem", color:C.ink, marginBottom:"1.2rem" }}>{w.vi||"?"}</div>
        <input value={input} disabled={checked} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&check()}
          placeholder="Nhập từ tiếng Pháp..."
          style={{ width:"100%", maxWidth:260, border:`1.5px solid ${checked?(isCorrect?C.green:C.red):C.border}`, borderRadius:8, padding:"0.5rem 0.8rem", fontSize:"1rem", fontFamily:"Georgia,serif", textAlign:"center", outline:"none", background:checked?(isCorrect?"#e8f7f1":"#fde8e6"):C.white, color:checked?(isCorrect?C.green:C.red):C.ink, boxSizing:"border-box" }} />
        {!checked && (
          <div style={{ marginTop:"0.8rem", display:"flex", gap:"0.5rem", justifyContent:"center" }}>
            <button onClick={()=>setRevealed(r=>!r)} style={{ padding:"0.3rem 0.8rem", border:`1px solid ${C.border}`, borderRadius:6, background:C.white, color:C.gray, fontSize:"0.72rem", cursor:"pointer" }}>{revealed?"Ẩn":"💡 Gợi ý"}</button>
            <button onClick={check} style={{ padding:"0.3rem 0.8rem", border:"none", borderRadius:6, background:C.purple, color:C.white, fontSize:"0.72rem", cursor:"pointer" }}>Kiểm tra</button>
          </div>
        )}
        {revealed && !checked && <div style={{ marginTop:"0.5rem", fontSize:"0.88rem", color:C.gold, fontFamily:"Georgia,serif", letterSpacing:"0.1em" }}>{hint}</div>}
        {checked && (
          <div style={{ marginTop:"0.7rem" }}>
            <div style={{ fontSize:"0.82rem", color:isCorrect?C.green:C.red, marginBottom:"0.3rem" }}>
              {isCorrect?"✓ Chính xác!":<>✗ Đáp án: <b style={{fontFamily:"Georgia,serif"}}>{w.fr}</b></>}
            </div>
            {idx<words.length-1 && <button onClick={next} style={{ padding:"0.35rem 1rem", border:"none", borderRadius:6, background:C.purple, color:C.white, fontSize:"0.78rem", cursor:"pointer" }}>Tiếp theo →</button>}
            {idx===words.length-1 && <div style={{ color:C.purple, fontFamily:"Georgia,serif" }}>🎉 Xong! {score.ok+1}/{words.length} đúng</div>}
          </div>
        )}
      </div>
      {!checked && idx<words.length-1 && <div style={{ textAlign:"right" }}><button onClick={next} style={{ padding:"0.3rem 0.8rem", border:`1px solid ${C.border}`, borderRadius:6, background:C.white, color:C.gray, fontSize:"0.72rem", cursor:"pointer" }}>Bỏ qua →</button></div>}
    </div>
  );
}

// ── Flashcard Section ───────────────────────────────────────
export function FlashcardSection({ words, onRecord }) {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState("show");
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ ok:0, total:0 });
  const [timeLeft, setTimeLeft] = useState(3);
  const w = words[idx];

  useEffect(() => {
    if (phase!=="show") return;
    setTimeLeft(3);
    const iv = setInterval(()=>setTimeLeft(t=>{ if(t<=1){clearInterval(iv);setPhase("type");return 0;} return t-1; }),1000);
    return ()=>clearInterval(iv);
  }, [phase, idx]);

  const check = () => {
    const ok = input.trim().toLowerCase()===w.fr.toLowerCase();
    setResult(ok); setPhase("result");
    setScore(s=>({ok:s.ok+(ok?1:0),total:s.total+1}));
    onRecord?.(w.fr, ok);
  };
  const next = () => { setIdx(i=>Math.min(i+1,words.length-1)); setInput(""); setResult(null); setPhase("show"); };

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.7rem" }}>
        <SecLabel icon="🃏" text="Flashcard" />
        <span style={{ fontFamily:"Georgia,serif", color:C.purple, fontSize:"0.88rem" }}>{score.ok}/{score.total}</span>
      </div>
      <div style={{ background:C.white, border:`1.5px solid ${phase==="result"?(result?C.green:C.red):C.border}`, borderRadius:12, padding:"1.5rem 1rem", textAlign:"center" }}>
        <div style={{ fontSize:"0.65rem", color:C.gray, textTransform:"uppercase", letterSpacing:1, marginBottom:"0.7rem" }}>{idx+1} / {words.length}</div>
        {phase==="show" && <>
          <div style={{ fontFamily:"Georgia,serif", fontSize:"1.5rem", color:C.purple, marginBottom:"0.3rem" }}>{w.fr} <SpeakBtn text={w.fr} size="1rem"/></div>
          {w.vi && <div style={{ fontSize:"0.82rem", color:C.gray }}>{w.vi}</div>}
          <div style={{ marginTop:"1rem", display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem" }}>
            <div style={{ width:36, height:36, borderRadius:"50%", border:`3px solid ${C.purple}`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Georgia,serif", fontSize:"1.1rem", color:C.purple, fontWeight:600 }}>{timeLeft}</div>
            <span style={{ fontSize:"0.72rem", color:C.gray }}>Ghi nhớ...</span>
          </div>
        </>}
        {phase==="type" && <>
          <div style={{ fontFamily:"Georgia,serif", fontSize:"1rem", color:C.gray, marginBottom:"0.8rem" }}>Viết lại từ vừa thấy:</div>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&check()} autoFocus
            placeholder="Nhập từ tiếng Pháp..."
            style={{ width:"100%", maxWidth:260, border:`1.5px solid ${C.border}`, borderRadius:8, padding:"0.5rem 0.8rem", fontSize:"1rem", fontFamily:"Georgia,serif", textAlign:"center", outline:"none", boxSizing:"border-box" }} />
          <div style={{ marginTop:"0.8rem" }}><button onClick={check} style={{ padding:"0.35rem 1rem", border:"none", borderRadius:6, background:C.purple, color:C.white, fontSize:"0.78rem", cursor:"pointer" }}>Kiểm tra</button></div>
        </>}
        {phase==="result" && <>
          <div style={{ fontFamily:"Georgia,serif", fontSize:"1.3rem", color:result?C.green:C.red, marginBottom:"0.3rem" }}>{input||"—"}</div>
          {!result && <div style={{ fontSize:"0.82rem", color:C.green, marginBottom:"0.3rem" }}>✓ Đúng: <b>{w.fr}</b></div>}
          <div style={{ fontSize:"0.78rem", color:result?C.green:C.red, marginBottom:"0.8rem" }}>{result?"✓ Chính xác!":"✗ Chưa đúng"}</div>
          {idx<words.length-1 ? <button onClick={next} style={{ padding:"0.35rem 1rem", border:"none", borderRadius:6, background:C.purple, color:C.white, fontSize:"0.78rem", cursor:"pointer" }}>Tiếp theo →</button>
            : <div style={{ color:C.purple, fontFamily:"Georgia,serif" }}>🎉 Xong! {score.ok+(result?1:0)}/{words.length} đúng</div>}
        </>}
      </div>
    </div>
  );
}

// ── Anagramme Section ───────────────────────────────────────
export function AnagrammeSection({ words, onRecord }) {
  const [idx, setIdx] = useState(0);
  const [tiles, setTiles] = useState(()=>[...words[0].fr].sort(()=>Math.random()-0.5));
  const [answer, setAnswer] = useState([]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState({ok:0,total:0});
  const w = words[idx];
  const isCorrect = checked && answer.join("")===w.fr;
  const reset = word => { setTiles([...word].sort(()=>Math.random()-0.5)); setAnswer([]); setChecked(false); };
  const next = () => { const ni=Math.min(idx+1,words.length-1); setIdx(ni); reset(words[ni].fr); };
  const clickTile = i => { if(checked)return; setAnswer(a=>[...a,tiles[i]]); setTiles(t=>t.filter((_,j)=>j!==i)); };
  const clickAns = i => { if(checked)return; setTiles(t=>[...t,answer[i]]); setAnswer(a=>a.filter((_,j)=>j!==i)); };
  const check = () => {
    if (checked) return;
    const ok = answer.join("")===w.fr;
    setChecked(true); setScore(s=>({ok:s.ok+(ok?1:0),total:s.total+1}));
    onRecord?.(w.fr, ok);
  };
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.7rem" }}>
        <SecLabel icon="🔀" text="Anagramme" />
        <span style={{ fontFamily:"Georgia,serif", color:C.purple, fontSize:"0.88rem" }}>{score.ok}/{score.total}</span>
      </div>
      <div style={{ background:C.white, border:`1.5px solid ${checked?(isCorrect?C.green:C.red):C.border}`, borderRadius:12, padding:"1.2rem 1rem", textAlign:"center" }}>
        <div style={{ fontSize:"0.65rem", color:C.gray, textTransform:"uppercase", letterSpacing:1, marginBottom:"0.5rem" }}>{idx+1} / {words.length}</div>
        {w.vi && <div style={{ fontFamily:"Georgia,serif", fontSize:"1.1rem", color:C.ink, marginBottom:"1rem" }}>{w.vi}</div>}
        <div style={{ minHeight:44, display:"flex", flexWrap:"wrap", gap:"0.3rem", justifyContent:"center", marginBottom:"0.8rem", padding:"0.5rem", background:C.purpleL, borderRadius:8 }}>
          {answer.length===0 && <span style={{ color:C.gray, fontSize:"0.78rem", alignSelf:"center" }}>Chọn chữ cái...</span>}
          {answer.map((ch,i)=><div key={i} onClick={()=>clickAns(i)} style={{ width:34,height:34,border:`1.5px solid ${C.purple}`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Georgia,serif",fontSize:"1rem",color:C.purple,background:C.white,cursor:checked?"default":"pointer",fontWeight:600 }}>{ch}</div>)}
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.3rem", justifyContent:"center", marginBottom:"1rem" }}>
          {tiles.map((ch,i)=><div key={i} onClick={()=>clickTile(i)} style={{ width:34,height:34,border:`1.5px solid ${C.border}`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Georgia,serif",fontSize:"1rem",color:C.ink,background:C.white,cursor:checked?"default":"pointer",opacity:checked?0.4:1 }}>{ch}</div>)}
        </div>
        <div style={{ display:"flex", gap:"0.5rem", justifyContent:"center" }}>
          {!checked && tiles.length===0 && <button onClick={check} style={{ padding:"0.38rem 1.2rem", border:"none", borderRadius:6, background:C.purple, color:C.white, fontSize:"0.78rem", cursor:"pointer" }}>Kiểm tra</button>}
          {!checked && <button onClick={()=>reset(w.fr)} style={{ padding:"0.38rem 0.8rem", border:`1px solid ${C.border}`, borderRadius:6, background:C.white, color:C.gray, fontSize:"0.72rem", cursor:"pointer" }}>↺ Reset</button>}
        </div>
        {checked && <div style={{ marginTop:"0.6rem" }}>
          <div style={{ fontSize:"0.82rem", color:isCorrect?C.green:C.red, marginBottom:"0.4rem" }}>{isCorrect?"✓ Chính xác!":<>✗ Đáp án: <b style={{fontFamily:"Georgia,serif"}}>{w.fr}</b></>}</div>
          {idx<words.length-1 && <button onClick={next} style={{ padding:"0.35rem 1rem", border:"none", borderRadius:6, background:C.purple, color:C.white, fontSize:"0.78rem", cursor:"pointer" }}>Tiếp theo →</button>}
          {idx===words.length-1 && <div style={{ color:C.purple, fontFamily:"Georgia,serif" }}>🎉 Xong! {score.ok+(isCorrect?1:0)}/{words.length} đúng</div>}
        </div>}
      </div>
    </div>
  );
}
