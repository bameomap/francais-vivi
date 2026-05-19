import { useState, useEffect, useRef } from "react";
import { C } from "../constants.js";
import { callAIText } from "../utils/api.js";
import { addWordToSRS } from "../utils/srs.js";
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
const BATCH_SIZE = 20;

function makeFp(words) {
  const s = words.map(w => w.fr).join("|");
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) & 0xffffffff;
  return (h >>> 0).toString(36);
}

export function FlashcardSection({ words, onRecord }) {
  const fp      = makeFp(words);
  const lsKey   = `fc_batch_${fp}`;
  const batches = [];
  for (let i = 0; i < words.length; i += BATCH_SIZE) batches.push(words.slice(i, i + BATCH_SIZE));
  const totalBatches = batches.length;

  const makeCards = (ws) => ws.map((w, i) => ({ id:`${w.fr}-${i}`, front:w.fr, back:w.vi, status:"unseen" }));

  const initBatch = () => Math.min(parseInt(localStorage.getItem(lsKey) || "0"), totalBatches - 1);

  const [batchIdx,     setBatchIdx]     = useState(initBatch);
  const [deck,         setDeck]         = useState(() => makeCards(batches[initBatch()]));
  const [idx,          setIdx]          = useState(0);
  const [flipped,      setFlipped]      = useState(false);
  const [batchLearned, setBatchLearned] = useState(0);
  const [batchDone,    setBatchDone]    = useState(false);
  const [examples,     setExamples]     = useState({}); // { word: { fr, vi } | "loading" }
  const touchX = useRef(null);

  // Fetch example sentence when card is flipped
  useEffect(() => {
    if (!flipped || !current) return;
    const w = current.front;
    if (examples[w]) return; // already cached
    setExamples(ex => ({ ...ex, [w]: "loading" }));
    callAIText(
      [{ role:"user", content:`Câu ví dụ ngắn (6-10 từ) dùng từ "${w}" bằng tiếng Pháp, kèm dịch tiếng Việt.` }],
      "Giáo viên tiếng Pháp A1. Trả lời đúng 2 dòng: câu Pháp trước, dịch Việt sau (bắt đầu bằng →). Không thêm gì khác."
    ).then(raw => {
      const lines = raw.trim().split("\n").map(l => l.trim()).filter(Boolean);
      const fr = lines[0] || "";
      const vi = (lines[1] || "").replace(/^→\s*/, "");
      setExamples(ex => ({ ...ex, [w]: { fr, vi } }));
    }).catch(() => setExamples(ex => ({ ...ex, [w]: null })));
  }, [flipped, current?.front]);

  const batchWords = batches[batchIdx];
  const batchSize  = batchWords.length;
  const current    = deck[idx];
  const pct        = Math.round((batchLearned / batchSize) * 100);

  const flip   = () => setFlipped(f => !f);
  const goNext = () => { if (idx >= deck.length - 1) return; setFlipped(false); setTimeout(() => setIdx(i => i + 1), 180); };
  const goPrev = () => { if (idx <= 0) return; setFlipped(false); setTimeout(() => setIdx(i => i - 1), 180); };

  const markLearned = () => {
    onRecord?.(current.front, true);
    const next = deck.filter((_, i) => i !== idx);
    setBatchLearned(c => c + 1);
    setFlipped(false);
    setDeck(next);
    if (next.length === 0) setBatchDone(true);
    else setIdx(i => Math.min(i, next.length - 1));
  };

  const markLearning = () => {
    onRecord?.(current.front, false);
    // Auto-add to SRS so SM-2 tracks this word
    addWordToSRS(current.front, current.back);
    const next = [...deck];
    const [card] = next.splice(idx, 1);
    next.push({ ...card, status:"learning" });
    setFlipped(false);
    setDeck(next);
    setIdx(i => Math.min(i, next.length - 1));
  };

  const shuffle = () => { setDeck(d => [...d].sort(() => Math.random() - 0.5)); setIdx(0); setFlipped(false); };

  const goNextBatch = () => {
    const next = batchIdx + 1;
    localStorage.setItem(lsKey, String(next));
    setBatchIdx(next); setDeck(makeCards(batches[next]));
    setIdx(0); setFlipped(false); setBatchLearned(0); setBatchDone(false);
  };

  const resetAll = () => {
    localStorage.removeItem(lsKey);
    setBatchIdx(0); setDeck(makeCards(batches[0]).sort(() => Math.random() - 0.5));
    setIdx(0); setFlipped(false); setBatchLearned(0); setBatchDone(false);
  };

  // Keyboard
  useEffect(() => {
    const h = (e) => {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); }
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft")  goPrev();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  // Swipe
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (!touchX.current) return;
    const diff = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) { diff > 0 ? goNext() : goPrev(); }
    touchX.current = null;
  };

  // ── Tất cả batch xong ──
  if (batchDone && batchIdx >= totalBatches - 1) return (
    <div style={{ textAlign:"center", padding:"2.5rem 1rem", animation:"fadeUp 0.3s ease" }}>
      <div style={{ fontSize:"3.5rem", marginBottom:"0.6rem" }}>🎉</div>
      <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.4rem", color:C.ink, fontWeight:700, marginBottom:"0.3rem" }}>Hoàn thành tất cả!</div>
      <div style={{ fontSize:"0.85rem", color:C.gray, marginBottom:"1.5rem" }}>{words.length} từ · {totalBatches} bộ</div>
      <button onClick={resetAll}
        style={{ padding:"0.65rem 1.8rem", background:`linear-gradient(135deg,${C.blue},${C.purple})`, color:C.white, border:"none", borderRadius:14, fontSize:"0.9rem", cursor:"pointer", fontWeight:700, boxShadow:`0 4px 16px ${C.blue}44` }}>
        🔄 Học lại từ đầu
      </button>
    </div>
  );

  // ── Batch hiện tại xong, còn batch tiếp ──
  if (batchDone) return (
    <div style={{ textAlign:"center", padding:"2.5rem 1rem", animation:"fadeUp 0.3s ease" }}>
      <div style={{ fontSize:"3rem", marginBottom:"0.6rem" }}>✅</div>
      <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.3rem", color:C.ink, fontWeight:700, marginBottom:"0.3rem" }}>
        Bộ {batchIdx + 1}/{totalBatches} xong!
      </div>
      <div style={{ fontSize:"0.85rem", color:C.gray, marginBottom:"0.4rem" }}>Thuộc {batchLearned}/{batchSize} từ trong bộ này</div>
      <div style={{ fontSize:"0.78rem", color:C.gray, marginBottom:"1.5rem" }}>
        Còn {totalBatches - batchIdx - 1} bộ · {batches[batchIdx + 1]?.length} từ tiếp theo
      </div>
      <button onClick={goNextBatch}
        style={{ padding:"0.65rem 1.8rem", background:`linear-gradient(135deg,${C.green},#0D9488)`, color:C.white, border:"none", borderRadius:14, fontSize:"0.9rem", cursor:"pointer", fontWeight:700, boxShadow:`0 4px 16px ${C.green}44` }}>
        Tiếp tục Bộ {batchIdx + 2} →
      </button>
    </div>
  );

  // ── Card UI ──
  return (
    <div>
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.6rem" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <SecLabel icon="🃏" text="Flashcard" />
          {totalBatches > 1 && (
            <span style={{ fontSize:"0.68rem", color:C.blue, background:C.blueL, borderRadius:20, padding:"0.1rem 0.55rem", fontWeight:600 }}>
              Bộ {batchIdx + 1}/{totalBatches}
            </span>
          )}
        </div>
        <div style={{ display:"flex", gap:"0.4rem", alignItems:"center" }}>
          <span style={{ fontSize:"0.68rem", color:C.gray }}>{batchLearned}/{batchSize} thuộc</span>
          <button onClick={shuffle}
            style={{ padding:"0.2rem 0.55rem", background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, borderRadius:20, fontSize:"0.68rem", cursor:"pointer" }}>
            🔀 Trộn
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height:5, background:C.border, borderRadius:999, marginBottom:"1rem", overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${pct}%`, background:C.green, borderRadius:999, transition:"width 0.4s ease" }}/>
      </div>

      {/* Card 3D */}
      <div onClick={flip} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
        style={{ perspective:1200, cursor:"pointer", marginBottom:"0.9rem", userSelect:"none" }}>
        <div style={{ position:"relative", height:220, transformStyle:"preserve-3d", transition:"transform 0.42s cubic-bezier(0.4,0,0.2,1)", transform:flipped?"rotateY(180deg)":"rotateY(0deg)" }}>
          {/* Front */}
          <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden", background:C.white, border:`1.5px solid ${C.blue}44`, borderRadius:22, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"1.5rem", boxShadow:"0 4px 24px rgba(74,144,217,0.10)" }}>
            <div style={{ fontSize:"0.58rem", textTransform:"uppercase", letterSpacing:2, color:C.gray, fontWeight:700, marginBottom:"1rem" }}>🇫🇷 Tiếng Pháp</div>
            <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"2rem", color:C.blue, fontWeight:700, textAlign:"center", marginBottom:"0.5rem", lineHeight:1.2 }}>{current.front}</div>
            <SpeakBtn text={current.front} />
            <div style={{ marginTop:"1.2rem", fontSize:"0.65rem", color:C.gray, display:"flex", alignItems:"center", gap:"0.3rem" }}>
              <span style={{ background:C.border, borderRadius:4, padding:"0.1rem 0.4rem", fontSize:"0.6rem" }}>Space</span> hoặc nhấn thẻ để xem nghĩa
            </div>
            {current.status === "learning" && (
              <div style={{ position:"absolute", top:12, right:14, fontSize:"0.6rem", color:C.gold, fontWeight:700, background:C.goldL, borderRadius:20, padding:"0.1rem 0.4rem" }}>🔁 Ôn lại</div>
            )}
          </div>
          {/* Back */}
          <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden", transform:"rotateY(180deg)", background:`linear-gradient(135deg,${C.blueL},#f0f4ff)`, border:`1.5px solid ${C.blue}88`, borderRadius:22, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"1.2rem 1.5rem", boxShadow:"0 4px 24px rgba(74,144,217,0.14)" }}>
            <div style={{ fontSize:"0.58rem", textTransform:"uppercase", letterSpacing:2, color:C.gray, fontWeight:700, marginBottom:"0.6rem" }}>🇻🇳 Tiếng Việt</div>
            <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.7rem", color:C.ink, fontWeight:700, textAlign:"center", lineHeight:1.3, marginBottom:"0.75rem" }}>{current.back || "—"}</div>
            {/* Example sentence */}
            {(() => {
              const ex = examples[current.front];
              if (!ex) return null;
              if (ex === "loading") return <div style={{ fontSize:"0.65rem", color:C.gray, fontStyle:"italic" }}>Đang tải ví dụ…</div>;
              return (
                <div style={{ borderTop:`1px solid ${C.blue}33`, paddingTop:"0.6rem", width:"100%", textAlign:"center" }}>
                  <div style={{ fontSize:"0.78rem", color:C.blue, fontFamily:"Georgia,serif", fontStyle:"italic", marginBottom:"0.2rem", lineHeight:1.5 }}>{ex.fr}</div>
                  <div style={{ fontSize:"0.68rem", color:C.gray }}>{ex.vi}</div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:"0.75rem", marginBottom:"0.85rem" }}>
        <button onClick={goPrev} disabled={idx===0}
          style={{ width:40, height:40, background:"transparent", border:`1.5px solid ${idx===0?C.border:C.gray}`, color:idx===0?C.border:C.gray, borderRadius:"50%", fontSize:"1rem", cursor:idx===0?"default":"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>←</button>
        <span style={{ fontSize:"0.72rem", color:C.gray, minWidth:64, textAlign:"center" }}>{idx+1} / {deck.length}</span>
        <button onClick={goNext} disabled={idx===deck.length-1}
          style={{ width:40, height:40, background:"transparent", border:`1.5px solid ${idx===deck.length-1?C.border:C.gray}`, color:idx===deck.length-1?C.border:C.gray, borderRadius:"50%", fontSize:"1rem", cursor:idx===deck.length-1?"default":"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>→</button>
      </div>

      {/* Status buttons */}
      {flipped ? (
        <div style={{ display:"flex", gap:"0.6rem", animation:"fadeUp 0.2s ease" }}>
          <button onClick={markLearning}
            style={{ flex:1, padding:"0.65rem", background:"#FFF7ED", border:"1.5px solid #F97316", color:"#EA580C", borderRadius:14, fontSize:"0.85rem", cursor:"pointer", fontWeight:700 }}>
            🔁 Đang học
          </button>
          <button onClick={markLearned}
            style={{ flex:1, padding:"0.65rem", background:C.greenL, border:`1.5px solid ${C.green}`, color:C.green, borderRadius:14, fontSize:"0.85rem", cursor:"pointer", fontWeight:700 }}>
            ✓ Đã thuộc
          </button>
        </div>
      ) : (
        <div style={{ textAlign:"center", fontSize:"0.68rem", color:C.gray }}>Lật thẻ để đánh giá mức độ ghi nhớ</div>
      )}
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
