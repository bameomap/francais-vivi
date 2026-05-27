import { useState, useEffect, useCallback } from "react";
import { C } from "../constants.js";
import { getAllCards } from "../utils/srs.js";
import { BUILTIN_SETS } from "../data/builtinSets.js";
import { speak } from "../utils/helpers.js";
import { awardXP } from "../utils/xp.js";

const ROUND_SIZE = 8;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildWordPool(propWords) {
  if (propWords?.length >= 4) return propWords;
  const srsCards = getAllCards().map(c => ({ fr: c.fr, vi: c.vi }));
  if (srsCards.length >= 4) return srsCards;
  const builtinWords = BUILTIN_SETS.flatMap(s => s.words);
  const merged = [...srsCards];
  const existing = new Set(srsCards.map(c => c.fr));
  for (const w of builtinWords) {
    if (!existing.has(w.fr)) { merged.push(w); existing.add(w.fr); }
  }
  return merged;
}

function makeRound(pool) {
  const shuffled = shuffle(pool);
  return shuffled.slice(0, Math.min(ROUND_SIZE, shuffled.length)).map(word => {
    const distractors = shuffle(pool.filter(w => w.fr !== word.fr)).slice(0, 3);
    const options = shuffle([word, ...distractors]);
    return { word, options };
  });
}

export default function ListeningQuiz({ words: propWords = [] }) {
  const [pool,     setPool]     = useState([]);
  const [round,    setRound]    = useState([]);
  const [qIdx,     setQIdx]     = useState(0);
  const [selected, setSelected] = useState(null);   // index chosen
  const [checked,  setChecked]  = useState(false);
  const [score,    setScore]    = useState(0);
  const [done,     setDone]     = useState(false);
  const [playing,  setPlaying]  = useState(false);
  const [playCount,setPlayCount]= useState(0);
  const [results,  setResults]  = useState([]);

  useEffect(() => {
    const p = buildWordPool(propWords);
    setPool(p);
    if (p.length >= 4) { const r = makeRound(p); setRound(r); }
  }, []);

  const current = round[qIdx];

  const playWord = useCallback(() => {
    if (!current || playing) return;
    setPlaying(true);
    speak(current.word.fr, () => setPlaying(false));
    setPlayCount(n => n + 1);
  }, [current, playing]);

  useEffect(() => {
    if (current && !checked) {
      setSelected(null); setPlayCount(0);
      const t = setTimeout(playWord, 400);
      return () => clearTimeout(t);
    }
  }, [qIdx, round]);

  const check = () => {
    if (selected === null || checked) return;
    setChecked(true);
    const isCorrect = current.options[selected].fr === current.word.fr;
    if (isCorrect) { setScore(s => s + 1); awardXP(2); }
    setResults(r => [...r, { correct: isCorrect, word: current.word, chosen: current.options[selected] }]);
  };

  const next = () => {
    if (qIdx + 1 >= round.length) { setDone(true); }
    else { setQIdx(i => i + 1); setChecked(false); setSelected(null); }
  };

  const restart = () => {
    const r = makeRound(pool);
    setRound(r); setQIdx(0); setSelected(null); setChecked(false);
    setScore(0); setDone(false); setResults([]);
  };

  if (pool.length < 4) return (
    <div style={{ padding:"2rem 1rem", textAlign:"center" }}>
      <div style={{ width:64, height:64, background:C.blueL, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"2rem", margin:"0 auto 1rem" }}>🎵</div>
      <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1rem", color:C.ink, marginBottom:"0.4rem" }}>Cần thêm từ vựng</div>
      <div style={{ fontSize:"0.8rem", color:C.gray, lineHeight:1.7 }}>Chọn unit Édito hoặc thêm từ vào SRS để bắt đầu.</div>
    </div>
  );

  if (done) {
    const pct = Math.round(score / round.length * 100);
    return (
      <div style={{ padding:"1.5rem 1rem", animation:"fadeUp 0.3s ease" }}>
        <div style={{ textAlign:"center", marginBottom:"1.5rem" }}>
          <div style={{ width:72, height:72, borderRadius:"50%", background:C.blueL, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"2.5rem", margin:"0 auto 0.75rem" }}>
            {pct>=80?"🎉":pct>=50?"👍":"💪"}
          </div>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.6rem", color:C.ink, fontWeight:700 }}>{score}/{round.length}</div>
          <div style={{ fontSize:"0.82rem", color:C.blue, fontWeight:600, marginTop:2 }}>{pct}% · {pct>=80?"Excellent!":pct>=50?"Bien!":"Continue!"}</div>
        </div>

        <div style={{ background:C.white, borderRadius:16, border:`1.5px solid ${C.border}`, padding:"0.85rem 1rem", marginBottom:"1rem" }}>
          <div style={{ fontSize:"0.58rem", textTransform:"uppercase", letterSpacing:"0.12em", color:C.gray, fontWeight:700, marginBottom:"0.6rem" }}>Kết quả chi tiết</div>
          {results.map((r, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:"0.5rem", padding:"0.3rem 0", borderBottom: i<results.length-1?`1px solid ${C.border}`:"none" }}>
              <span style={{ fontSize:"0.85rem" }}>{r.correct ? "✅" : "❌"}</span>
              <span style={{ fontFamily:"Georgia,serif", fontSize:"0.85rem", color:C.ink, fontWeight:600 }}>{r.word.fr}</span>
              <span style={{ fontSize:"0.75rem", color:r.correct?"#059669":C.red, marginLeft:"auto" }}>{r.word.vi}</span>
            </div>
          ))}
        </div>

        <button onClick={restart}
          style={{ width:"100%", padding:"0.9rem", background:`linear-gradient(135deg,${C.accent},#c0392b)`, color:"#fff", border:"none", borderRadius:14, fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1rem", cursor:"pointer", fontWeight:700 }}>
          🎵 Chơi lại →
        </button>
      </div>
    );
  }

  if (!current) return null;

  const progress = qIdx / round.length;

  return (
    <div style={{ padding:"0 0 1rem", animation:"fadeUp 0.3s ease" }}>
      {/* Progress */}
      <div style={{ padding:"0.75rem 1rem 0" }}>
        <div style={{ display:"flex", gap:3, marginBottom:4 }}>
          {round.map((_, i) => (
            <div key={i} style={{ flex:1, height:3, borderRadius:99, background: i < qIdx ? C.blue : i === qIdx ? `${C.blue}88` : C.border, transition:"background 0.3s" }}/>
          ))}
        </div>
        <div style={{ display:"flex", justifyContent:"space-between" }}>
          <span style={{ fontSize:"0.62rem", color:C.gray }}>Câu {qIdx+1}/{round.length}</span>
          <span style={{ fontSize:"0.62rem", color:"#059669", fontWeight:700 }}>✓ {score} đúng</span>
        </div>
      </div>

      {/* Question header */}
      <div style={{ padding:"0.6rem 1rem 0" }}>
        <div style={{ fontSize:"0.58rem", fontWeight:700, color:C.blue, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:2 }}>Nghe &amp; chọn</div>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.25rem", color:C.ink, fontWeight:700 }}>Quel mot entends-tu ?</div>
      </div>

      {/* Play area */}
      <div style={{ padding:"0.75rem 1rem" }}>
        <div style={{ background:"linear-gradient(135deg, #1B3A6B 0%, #2d4f8a 100%)", borderRadius:20, padding:"1.5rem", textAlign:"center" }}>
          <button onClick={playWord} disabled={playing}
            style={{
              width:80, height:80, borderRadius:"50%",
              background:"rgba(255,255,255,0.2)", backdropFilter:"blur(8px)",
              border:"2.5px solid rgba(255,255,255,0.5)",
              display:"flex", alignItems:"center", justifyContent:"center",
              cursor:playing?"not-allowed":"pointer", margin:"0 auto",
              transition:"transform 0.15s, background 0.15s",
              transform: playing ? "scale(0.93)" : "scale(1)",
            }}>
            <span style={{ fontSize:"2.2rem" }}>{playing ? "🔊" : "♪"}</span>
          </button>
          <div style={{ marginTop:"0.75rem", fontSize:"0.75rem", color:"rgba(255,255,255,0.85)", letterSpacing:"0.05em" }}>
            {playing ? "Đang phát…" : playCount === 0 ? "Tap để nghe" : `Đã nghe ${playCount} lần · Tap để nghe lại`}
          </div>
        </div>
      </div>

      {/* Options */}
      <div style={{ padding:"0 1rem" }}>
        <div style={{ fontSize:"0.58rem", fontWeight:700, color:C.gray, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:8 }}>Lựa chọn</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.55rem" }}>
          {current.options.map((opt, i) => {
            const isCorrect = opt.fr === current.word.fr;
            const isSelected = selected === i;
            let bg = C.white, border = `1.5px solid ${C.border}`, wordColor = C.blue;
            if (checked) {
              if (isCorrect)           { bg = "#F0FDF4"; border = `2px solid #059669`; wordColor = "#059669"; }
              else if (isSelected)     { bg = "#FEF2F2"; border = `2px solid #DC2626`; wordColor = "#DC2626"; }
            } else if (isSelected)     { bg = C.blueL; border = `2px solid ${C.blue}`; }
            return (
              <button key={i} onClick={() => !checked && setSelected(i)} disabled={checked}
                style={{ background:bg, border, borderRadius:16, padding:"0.9rem 0.7rem", cursor:checked?"default":"pointer", textAlign:"center", transition:"all 0.15s" }}>
                {checked && isCorrect && <div style={{ fontSize:"0.9rem", marginBottom:2 }}>✅</div>}
                {checked && isSelected && !isCorrect && <div style={{ fontSize:"0.9rem", marginBottom:2 }}>❌</div>}
                <div style={{ fontFamily:"Georgia,serif", fontSize:"1rem", fontWeight:700, color:wordColor, lineHeight:1.2 }}>{opt.fr}</div>
                <div style={{ fontSize:"0.68rem", color:C.gray, marginTop:4 }}>{opt.vi}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action button */}
      <div style={{ padding:"0.75rem 1rem 0" }}>
        {!checked ? (
          <button onClick={check} disabled={selected === null}
            style={{ width:"100%", padding:"0.85rem", background: selected !== null ? C.accent : C.border, color:"#fff", border:"none", borderRadius:14, fontSize:"0.95rem", fontFamily:"'Playfair Display',Georgia,serif", cursor: selected !== null ? "pointer" : "default", fontWeight:700, transition:"background 0.15s" }}>
            Kiểm tra
          </button>
        ) : (
          <button onClick={next}
            style={{ width:"100%", padding:"0.85rem", background:C.accent, color:"#fff", border:"none", borderRadius:14, fontSize:"0.95rem", fontFamily:"'Playfair Display',Georgia,serif", cursor:"pointer", fontWeight:700 }}>
            {qIdx + 1 >= round.length ? "Xem kết quả →" : "Câu tiếp →"}
          </button>
        )}
      </div>
    </div>
  );
}
