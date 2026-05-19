import { useState, useEffect, useCallback } from "react";
import { C } from "../constants.js";
import { getAllCards } from "../utils/srs.js";
import { BUILTIN_SETS } from "../data/builtinSets.js";
import { speak } from "../utils/helpers.js";
import { awardXP } from "../utils/xp.js";

const ROUND_SIZE = 10;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildWordPool() {
  const srsCards = getAllCards().map(c => ({ fr: c.fr, vi: c.vi }));
  if (srsCards.length >= 8) return srsCards;
  // Supplement with built-in sets if SRS is sparse
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

export default function ListeningQuiz() {
  const [pool,    setPool]    = useState([]);
  const [round,   setRound]   = useState([]);
  const [qIdx,    setQIdx]    = useState(0);
  const [picked,  setPicked]  = useState(null);   // index of chosen option
  const [score,   setScore]   = useState(0);
  const [done,    setDone]    = useState(false);
  const [playing, setPlaying] = useState(false);
  const [results, setResults] = useState([]);      // {correct, chosen} per question

  useEffect(() => {
    const p = buildWordPool();
    setPool(p);
    if (p.length >= 4) {
      const r = makeRound(p);
      setRound(r);
    }
  }, []);

  const current = round[qIdx];

  const playWord = useCallback(() => {
    if (!current || playing) return;
    setPlaying(true);
    speak(current.word.fr, () => setPlaying(false));
  }, [current, playing]);

  // Auto-play when question changes
  useEffect(() => {
    if (current && !picked) {
      const t = setTimeout(playWord, 300);
      return () => clearTimeout(t);
    }
  }, [qIdx, round]);

  const choose = (optIdx) => {
    if (picked !== null) return;
    setPicked(optIdx);
    const isCorrect = current.options[optIdx].fr === current.word.fr;
    if (isCorrect) {
      setScore(s => s + 1);
      awardXP(2);
    }
    setResults(r => [...r, { correct: isCorrect, word: current.word, chosen: current.options[optIdx] }]);
    setTimeout(() => {
      if (qIdx + 1 >= round.length) {
        setDone(true);
      } else {
        setQIdx(i => i + 1);
        setPicked(null);
      }
    }, 900);
  };

  const restart = () => {
    const r = makeRound(pool);
    setRound(r); setQIdx(0); setPicked(null);
    setScore(0); setDone(false); setResults([]);
  };

  if (pool.length < 4) return (
    <div style={{ padding:"2rem 1rem", textAlign:"center" }}>
      <div style={{ fontSize:"2.5rem", marginBottom:"0.75rem" }}>🎵</div>
      <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1rem", color:C.ink, marginBottom:"0.4rem" }}>Cần thêm từ vựng</div>
      <div style={{ fontSize:"0.8rem", color:C.gray, lineHeight:1.7 }}>
        Thêm ít nhất 4 từ vào SRS hoặc dùng bộ từ chủ đề để bắt đầu nghe.
      </div>
    </div>
  );

  if (done) {
    const pct = Math.round(score / round.length * 100);
    return (
      <div style={{ padding:"1.5rem 1rem", animation:"fadeUp 0.3s ease" }}>
        <div style={{ textAlign:"center", marginBottom:"1.25rem" }}>
          <div style={{ fontSize:"3rem", marginBottom:"0.5rem" }}>{pct >= 80 ? "🎉" : pct >= 50 ? "👍" : "💪"}</div>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.4rem", color:C.ink, fontWeight:700, marginBottom:"0.2rem" }}>
            {score}/{round.length} đúng
          </div>
          <div style={{ fontSize:"0.82rem", color:C.gray }}>{pct}% · {pct >= 80 ? "Excellent!" : pct >= 50 ? "Bien!" : "Continue d'essayer!"}</div>
        </div>

        {/* Results breakdown */}
        <div style={{ background:C.white, borderRadius:16, border:`1.5px solid ${C.border}`, padding:"0.85rem 1rem", marginBottom:"1rem" }}>
          <div style={{ fontSize:"0.62rem", textTransform:"uppercase", letterSpacing:2, color:C.gray, fontWeight:700, marginBottom:"0.6rem" }}>Kết quả chi tiết</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem" }}>
            {results.map((r, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                <span style={{ fontSize:"0.85rem" }}>{r.correct ? "✅" : "❌"}</span>
                <span style={{ fontFamily:"Georgia,serif", fontSize:"0.82rem", color:C.ink, fontWeight:600 }}>{r.word.fr}</span>
                <span style={{ fontSize:"0.75rem", color:C.gray }}>—</span>
                <span style={{ fontSize:"0.75rem", color:r.correct ? "#059669" : C.red }}>{r.word.vi}</span>
                {!r.correct && (
                  <span style={{ fontSize:"0.68rem", color:C.gray, marginLeft:"auto" }}>bạn chọn: {r.chosen.vi}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <button onClick={restart}
          style={{ width:"100%", padding:"0.85rem", background:`linear-gradient(135deg, #0D9488, #0891B2)`, color:"#fff", border:"none", borderRadius:14, fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.95rem", cursor:"pointer", fontWeight:700 }}>
          🎵 Chơi lại →
        </button>
      </div>
    );
  }

  if (!current) return null;

  const totalQ = round.length;
  const progress = ((qIdx) / totalQ) * 100;

  return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      {/* Progress bar */}
      <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"1.25rem" }}>
        <div style={{ flex:1, height:5, background:C.border, borderRadius:999, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${progress}%`, background:"#0D9488", borderRadius:999, transition:"width 0.4s ease" }}/>
        </div>
        <span style={{ fontSize:"0.72rem", color:C.gray, whiteSpace:"nowrap" }}>{qIdx + 1}/{totalQ}</span>
        <span style={{ fontSize:"0.72rem", color:"#059669", fontWeight:700, whiteSpace:"nowrap" }}>✓ {score}</span>
      </div>

      {/* Speaker card */}
      <div style={{ background:`linear-gradient(135deg, #0D9488, #0891B2)`, borderRadius:24, padding:"2rem 1.5rem", textAlign:"center", marginBottom:"1.5rem", boxShadow:"0 8px 30px #0D948866" }}>
        <div style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.8)", textTransform:"uppercase", letterSpacing:2, marginBottom:"0.75rem" }}>Nghe & chọn nghĩa đúng</div>
        <button onClick={playWord} disabled={playing}
          style={{ background:"rgba(255,255,255,0.2)", border:"2.5px solid rgba(255,255,255,0.6)", borderRadius:"50%", width:72, height:72, display:"flex", alignItems:"center", justifyContent:"center", cursor:playing?"not-allowed":"pointer", margin:"0 auto", transition:"all 0.2s", transform:playing?"scale(0.95)":"scale(1)" }}>
          <span style={{ fontSize:"2rem" }}>{playing ? "🔊" : "🔈"}</span>
        </button>
        <div style={{ marginTop:"0.75rem", fontSize:"0.78rem", color:"rgba(255,255,255,0.75)" }}>
          {playing ? "Đang phát..." : "Nhấn để nghe lại"}
        </div>
      </div>

      {/* Options */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.6rem" }}>
        {current.options.map((opt, i) => {
          const isCorrectOpt = opt.fr === current.word.fr;
          const isChosen = picked === i;
          let bg = C.white, border = `1.5px solid ${C.border}`, color = C.ink;
          if (picked !== null) {
            if (isCorrectOpt)        { bg = "#ECFDF5"; border = "1.5px solid #059669"; color = "#059669"; }
            else if (isChosen)       { bg = "#FEF2F2"; border = "1.5px solid #DC2626"; color = "#DC2626"; }
          }
          return (
            <button key={i} onClick={() => choose(i)} disabled={picked !== null}
              style={{ background:bg, border, borderRadius:16, padding:"1rem 0.75rem", fontFamily:"Georgia,serif", fontSize:"0.9rem", color, cursor:picked!==null?"default":"pointer", textAlign:"center", lineHeight:1.4, transition:"all 0.2s", fontWeight:isChosen || (picked !== null && isCorrectOpt) ? 700 : 400 }}>
              {picked !== null && isCorrectOpt && <span style={{ display:"block", fontSize:"1.1rem" }}>✅</span>}
              {picked !== null && isChosen && !isCorrectOpt && <span style={{ display:"block", fontSize:"1.1rem" }}>❌</span>}
              {opt.vi}
            </button>
          );
        })}
      </div>
    </div>
  );
}
