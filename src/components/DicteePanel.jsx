import { useState, useRef, useEffect } from "react";
import { C } from "../constants.js";
import { callAIText } from "../utils/api.js";
import { speak } from "../utils/helpers.js";
import Spinner from "./ui/Spinner.jsx";
import Minou, { Confetti } from "./ui/Minou.jsx";

const NUM_SENTENCES = 5;

// ── Text comparison ──────────────────────────────────────────
function normalize(s = "") {
  return s.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z\s]/g, "").trim();
}

function gradeWords(typed, correct) {
  const correctWords = correct.trim().split(/\s+/);
  const typedWords   = typed.trim().split(/\s+/).filter(Boolean);
  return correctWords.map((cw, i) => {
    const tw = typedWords[i] || "";
    const nTw = normalize(tw), nCw = normalize(cw);
    if (nTw === nCw && tw !== cw) return { word: cw, typed: tw, status: "accent" }; // right but missing accent
    if (nTw === nCw)               return { word: cw, typed: tw, status: "ok" };
    return { word: cw, typed: tw, status: "wrong" };
  });
}

// Word-diff display
function WordDiff({ result }) {
  return (
    <div style={{ lineHeight: 2.1, fontSize:"0.88rem", fontFamily:"Georgia,serif" }}>
      {result.map((r, i) => {
        const color = r.status==="ok" ? C.green : r.status==="accent" ? "#D97706" : C.red;
        const bg    = r.status==="ok" ? "#ECFDF5" : r.status==="accent" ? "#FFFBEB" : "#FEF2F2";
        return (
          <span key={i} style={{ marginRight:"0.35rem", display:"inline-block" }}>
            <span style={{ background:bg, color, borderRadius:4, padding:"0 3px", fontWeight:600 }}>
              {r.word}
            </span>
            {r.status !== "ok" && r.typed && (
              <span style={{ fontSize:"0.68rem", color:C.gray, marginLeft:2 }}>({r.typed})</span>
            )}
            {r.status === "accent" && (
              <span style={{ fontSize:"0.62rem", color:"#D97706", marginLeft:1 }}>~accent</span>
            )}
          </span>
        );
      })}
    </div>
  );
}

// ── Sentence generator ───────────────────────────────────────
async function generateSentences(words) {
  const sample = words.slice(0, 15).map(w => w.fr).join(", ");
  const text = await callAIText(
    [{ role:"user", content:`Tạo đúng ${NUM_SENTENCES} câu tiếng Pháp A1 ngắn (5-9 từ/câu) sử dụng các từ: ${sample}.\nMỗi câu trên một dòng, không đánh số, không giải thích, không dịch.` }],
    "Bạn là giáo viên tiếng Pháp. Chỉ trả lời đúng các câu được yêu cầu, mỗi câu một dòng."
  );
  return text.split("\n")
    .map(l => l.replace(/^\d+[\.\)]\s*/, "").trim())
    .filter(l => l.length > 3)
    .slice(0, NUM_SENTENCES);
}

// ── Play button ──────────────────────────────────────────────
function PlayBtn({ text, size = "md", disabled }) {
  const [playing, setPlaying] = useState(false);
  const play = () => {
    if (playing || disabled) return;
    setPlaying(true);
    speak(text, () => setPlaying(false));
  };
  const sz = size === "sm" ? "0.78rem" : "0.88rem";
  const pad = size === "sm" ? "0.3rem 0.65rem" : "0.45rem 1rem";
  return (
    <button onClick={play} disabled={playing || disabled}
      style={{ display:"flex", alignItems:"center", gap:"0.35rem", padding:pad, background: playing?"#EFF6FF":C.blueL, border:`1.5px solid ${playing?C.blue:C.border}`, borderRadius:24, cursor:"pointer", fontSize:sz, color:C.blue, fontWeight:600, transition:"all 0.15s", opacity: disabled?0.4:1 }}>
      <span style={{ fontSize:"1rem" }}>{playing ? "⏸" : "▶"}</span>
      {playing ? "Đang phát…" : "Nghe lại"}
    </button>
  );
}

// ── Main component ───────────────────────────────────────────
export default function DicteePanel({ words: propWords = [] }) {
  const words = propWords.length >= 4 ? propWords : [
    {fr:"famille"},{fr:"maison"},{fr:"école"},{fr:"ami"},{fr:"livre"},
    {fr:"manger"},{fr:"aller"},{fr:"beau"},{fr:"jour"},{fr:"ville"},
  ];

  const [phase,     setPhase]     = useState("idle");    // idle | loading | quiz | done
  const [sentences, setSentences] = useState([]);
  const [current,   setCurrent]   = useState(0);
  const [input,     setInput]     = useState("");
  const [results,   setResults]   = useState([]);        // [{sentence, typed, grade:[]}]
  const [checked,   setChecked]   = useState(false);
  const [plays,     setPlays]     = useState(0);         // how many times played this sentence
  const [confetti,  setConfetti]  = useState(false);
  const [err,       setErr]       = useState("");
  const inputRef = useRef(null);

  // Auto-play on new sentence
  useEffect(() => {
    if (phase !== "quiz" || !sentences[current]) return;
    setPlays(0);
    setTimeout(() => {
      speak(sentences[current]);
      setPlays(1);
    }, 400);
  }, [current, phase]);

  const start = async () => {
    setPhase("loading"); setErr("");
    try {
      const s = await generateSentences(words);
      if (s.length < 2) throw new Error("Không đủ câu, thử lại nhé.");
      setSentences(s); setResults([]); setCurrent(0); setInput(""); setChecked(false); setConfetti(false);
      setPhase("quiz");
    } catch(e) { setErr(e.message); setPhase("idle"); }
  };

  const playAgain = () => {
    speak(sentences[current]);
    setPlays(p => p + 1);
  };

  const check = () => {
    if (!input.trim()) return;
    const grade = gradeWords(input, sentences[current]);
    setResults(r => [...r, { sentence: sentences[current], typed: input, grade }]);
    setChecked(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const next = () => {
    const nextIdx = current + 1;
    if (nextIdx >= sentences.length) {
      setPhase("done");
      const totalWords = results.reduce((a, r) => a + r.grade.length, 0);
      const okWords    = results.reduce((a, r) => a + r.grade.filter(g => g.status==="ok").length, 0);
      const pct = Math.round(okWords / totalWords * 100);
      if (pct >= 80) setTimeout(() => setConfetti(true), 300);
    } else {
      setCurrent(nextIdx);
      setInput(""); setChecked(false);
    }
  };

  // ── Score calc ──
  const totalWords = results.reduce((a, r) => a + r.grade.length, 0);
  const okWords    = results.reduce((a, r) => a + r.grade.filter(g => g.status==="ok").length, 0);
  const accentWords= results.reduce((a, r) => a + r.grade.filter(g => g.status==="accent").length, 0);
  const pct = totalWords > 0 ? Math.round(okWords / totalWords * 100) : 0;

  // ── Idle ──
  if (phase === "idle") return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      <div style={{ background:C.white, borderRadius:20, padding:"1.5rem 1.2rem", border:`1.5px solid ${C.border}`, textAlign:"center" }}>
        <div style={{ fontSize:"2.5rem", marginBottom:"0.5rem" }}>🎧</div>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.2rem", color:C.ink, fontWeight:700, marginBottom:"0.3rem" }}>Nghe &amp; chép</div>
        <div style={{ fontSize:"0.8rem", color:C.gray, marginBottom:"0.75rem", lineHeight:1.7 }}>
          Nghe câu tiếng Pháp → gõ lại<br/>AI chấm từng chữ, báo lỗi dấu accent
        </div>
        <div style={{ display:"flex", justifyContent:"center", gap:"1.5rem", fontSize:"0.75rem", color:C.gray, marginBottom:"1.2rem" }}>
          <span><span style={{ background:"#ECFDF5", color:C.green, borderRadius:4, padding:"0 4px", fontWeight:700 }}>đúng</span></span>
          <span><span style={{ background:"#FFFBEB", color:"#D97706", borderRadius:4, padding:"0 4px", fontWeight:700 }}>~accent</span></span>
          <span><span style={{ background:"#FEF2F2", color:C.red, borderRadius:4, padding:"0 4px", fontWeight:700 }}>sai</span></span>
        </div>
        {err && <div style={{ color:C.red, fontSize:"0.78rem", marginBottom:"0.8rem" }}>⚠ {err}</div>}
        <button onClick={start}
          style={{ padding:"0.75rem 1.8rem", background:"linear-gradient(135deg,#0891B2,#0D9488)", color:C.white, border:"none", borderRadius:14, fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.95rem", cursor:"pointer", fontWeight:700, boxShadow:"0 6px 20px #0891B244" }}>
          Bắt đầu ✦
        </button>
      </div>
    </div>
  );

  // ── Loading ──
  if (phase === "loading") return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:260, gap:"1rem" }}>
      <Spinner />
      <div style={{ fontSize:"0.85rem", color:C.gray }}>AI đang tạo câu…</div>
    </div>
  );

  // ── Done ──
  if (phase === "done") return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      <Confetti active={confetti} onDone={() => setConfetti(false)} />
      <div style={{ background:C.white, borderRadius:20, padding:"1.4rem 1.2rem", border:`1.5px solid ${C.border}`, marginBottom:"0.75rem", textAlign:"center" }}>
        <Minou
          mood={pct>=80?"excited":pct>=60?"happy":"sad"}
          message={pct>=80?"Oreille parfaite! 🎧✨":pct>=60?"Bien écouté! Luyện thêm nhé 💪":"Nghe khó lắm, cứ tập dần nhé~ 🐱"}
          size="md"
        />
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"2rem", color:pct>=80?"#059669":pct>=60?C.gold:C.red, fontWeight:700, marginTop:"0.8rem" }}>
          {okWords}/{totalWords}
        </div>
        <div style={{ fontSize:"0.75rem", color:C.gray, marginTop:"0.2rem", marginBottom:"0.5rem" }}>
          {pct}% từ đúng · {accentWords} lỗi accent
        </div>
        <div style={{ display:"flex", gap:"0.5rem", justifyContent:"center", marginTop:"1rem" }}>
          <button onClick={start}
            style={{ padding:"0.55rem 1.2rem", background:"linear-gradient(135deg,#0891B2,#0D9488)", color:C.white, border:"none", borderRadius:12, fontSize:"0.82rem", cursor:"pointer", fontWeight:700 }}>
            🔄 Làm lại
          </button>
          <button onClick={() => setPhase("review")}
            style={{ padding:"0.55rem 1.2rem", background:C.white, border:`1.5px solid ${C.border}`, color:C.ink, borderRadius:12, fontSize:"0.82rem", cursor:"pointer" }}>
            📋 Xem kết quả
          </button>
        </div>
      </div>
    </div>
  );

  // ── Review ──
  if (phase === "review") return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      <div style={{ fontSize:"0.72rem", fontWeight:700, color:C.gray, textTransform:"uppercase", letterSpacing:1, marginBottom:"0.75rem" }}>Kết quả từng câu</div>
      {results.map((r, i) => (
        <div key={i} style={{ background:C.white, borderRadius:14, padding:"0.9rem 1rem", border:`1.5px solid ${C.border}`, marginBottom:"0.5rem" }}>
          <div style={{ fontSize:"0.67rem", color:C.gray, marginBottom:"0.35rem" }}>Câu {i+1}</div>
          <div style={{ fontSize:"0.82rem", color:C.ink, fontStyle:"italic", marginBottom:"0.4rem", lineHeight:1.6 }}>{r.sentence}</div>
          <WordDiff result={r.grade} />
        </div>
      ))}
      <button onClick={start}
        style={{ width:"100%", marginTop:"0.5rem", padding:"0.65rem", background:"linear-gradient(135deg,#0891B2,#0D9488)", color:C.white, border:"none", borderRadius:12, fontSize:"0.85rem", cursor:"pointer", fontWeight:700 }}>
        🔄 Làm lại
      </button>
    </div>
  );

  // ── Quiz ──
  const sentence = sentences[current];
  return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease", display:"flex", flexDirection:"column", gap:"0.75rem" }}>

      {/* Progress */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ fontSize:"0.72rem", color:C.gray, fontWeight:600 }}>Câu {current+1}/{sentences.length}</div>
        <div style={{ display:"flex", gap:4 }}>
          {sentences.map((_, i) => (
            <div key={i} style={{ width:28, height:4, borderRadius:999, background: i < current ? C.green : i===current ? C.blue : C.border, transition:"background 0.3s" }}/>
          ))}
        </div>
      </div>

      {/* Play card */}
      <div style={{ background:"linear-gradient(135deg,#0891B2,#0D9488)", borderRadius:20, padding:"1.4rem 1.2rem", textAlign:"center", color:C.white, boxShadow:"0 8px 30px #0891B244" }}>
        <div style={{ fontSize:"0.65rem", textTransform:"uppercase", letterSpacing:2, opacity:0.85, marginBottom:"0.75rem" }}>Nghe và gõ lại</div>
        <PlayBtn text={sentence} size="md" />
        {plays > 0 && (
          <div style={{ marginTop:"0.7rem" }}>
            <button onClick={playAgain}
              style={{ background:"rgba(255,255,255,0.2)", border:"1px solid rgba(255,255,255,0.4)", borderRadius:20, padding:"0.25rem 0.75rem", color:C.white, fontSize:"0.7rem", cursor:"pointer" }}>
              ↻ Nghe lại {plays > 1 ? `(${plays}x)` : ""}
            </button>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ background:C.white, borderRadius:16, padding:"1rem", border:`1.5px solid ${checked?C.border:C.blue}44`, boxShadow: checked?"none":"0 0 0 3px #3B82F611" }}>
        <div style={{ fontSize:"0.65rem", color:C.gray, marginBottom:"0.4rem", textTransform:"uppercase", letterSpacing:1 }}>Gõ câu bạn nghe được</div>
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={checked}
          onKeyDown={e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); checked ? next() : check(); } }}
          placeholder="Gõ tiếng Pháp…"
          rows={2}
          style={{ width:"100%", border:"none", outline:"none", fontSize:"0.9rem", fontFamily:"Georgia,serif", color:C.ink, resize:"none", background:"transparent", lineHeight:1.7 }}
        />
        {!checked && (
          <button onClick={check} disabled={!input.trim()}
            style={{ marginTop:"0.4rem", padding:"0.5rem 1.2rem", background:C.blue, color:C.white, border:"none", borderRadius:10, fontSize:"0.82rem", cursor:"pointer", fontWeight:600, opacity:input.trim()?1:0.5 }}>
            Chấm ✓
          </button>
        )}
      </div>

      {/* Result */}
      {checked && (
        <div style={{ background:C.white, borderRadius:16, padding:"1rem 1.1rem", border:`1.5px solid ${C.border}`, animation:"fadeUp 0.25s ease" }}>
          <div style={{ fontSize:"0.65rem", color:C.gray, marginBottom:"0.45rem", textTransform:"uppercase", letterSpacing:1 }}>Kết quả</div>
          <WordDiff result={gradeWords(input, sentence)} />
          <div style={{ marginTop:"0.6rem", fontSize:"0.78rem", color:C.gray, fontStyle:"italic" }}>
            Câu đúng: <span style={{ color:C.ink, fontWeight:600 }}>{sentence}</span>
          </div>
          <button onClick={next}
            style={{ marginTop:"0.75rem", width:"100%", padding:"0.6rem", background: current+1 >= sentences.length ? "linear-gradient(135deg,#059669,#0D9488)" : C.blue, color:C.white, border:"none", borderRadius:12, fontSize:"0.85rem", cursor:"pointer", fontWeight:700 }}>
            {current+1 >= sentences.length ? "Xem kết quả 🏁" : "Câu tiếp theo →"}
          </button>
        </div>
      )}
    </div>
  );
}
