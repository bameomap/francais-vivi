import { useState, useRef } from "react";
import { C } from "../constants.js";
import { logMistake } from "../utils/storage.js";

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
    if (nTw === nCw && tw !== cw) return { word: cw, typed: tw, status: "accent" };
    if (nTw === nCw)              return { word: cw, typed: tw, status: "ok" };
    return { word: cw, typed: tw, status: "wrong" };
  });
}

function WordDiff({ result }) {
  return (
    <div style={{ lineHeight: 2.1, fontSize: "0.88rem", fontFamily: "Georgia,serif" }}>
      {result.map((r, i) => {
        const color = r.status === "ok" ? C.green : r.status === "accent" ? "#D97706" : C.red;
        const bg    = r.status === "ok" ? "#ECFDF5" : r.status === "accent" ? "#FFFBEB" : "#FEF2F2";
        return (
          <span key={i} style={{ marginRight: "0.35rem", display: "inline-block" }}>
            <span style={{ background: bg, color, borderRadius: 4, padding: "0 3px", fontWeight: 600 }}>
              {r.word}
            </span>
            {r.status !== "ok" && r.typed && (
              <span style={{ fontSize: "0.68rem", color: C.gray, marginLeft: 2 }}>({r.typed})</span>
            )}
            {r.status === "accent" && (
              <span style={{ fontSize: "0.62rem", color: "#D97706", marginLeft: 1 }}>~accent</span>
            )}
          </span>
        );
      })}
    </div>
  );
}

function parseTranscript(text) {
  return text
    .split(/(?<=[.!?»])\s+|(?<=[.!?»])$|\n+/)
    .map(s => s.replace(/^[«"'\-–—\s]+|[«»"'\s]+$/g, "").trim())
    .filter(s => s.length > 3 && /[a-zA-ZÀ-ÿ]/.test(s));
}

export default function AudioDictee() {
  const [phase,      setPhase]      = useState("setup");
  const [audioUrl,   setAudioUrl]   = useState(null);
  const [fileName,   setFileName]   = useState("");
  const [transcript, setTranscript] = useState("");
  const [sentences,  setSentences]  = useState([]);
  const [current,    setCurrent]    = useState(0);
  const [input,      setInput]      = useState("");
  const [checked,    setChecked]    = useState(false);
  const [results,    setResults]    = useState([]);

  const audioRef = useRef(null);
  const inputRef = useRef(null);
  const fileRef  = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(URL.createObjectURL(file));
    setFileName(file.name);
  };

  const replay5 = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
    audioRef.current.play();
  };

  const start = () => {
    const parsed = parseTranscript(transcript);
    if (!audioUrl || parsed.length < 1) return;
    setSentences(parsed);
    setCurrent(0); setInput(""); setChecked(false); setResults([]);
    setPhase("quiz");
  };

  const check = () => {
    if (!input.trim()) return;
    const grade = gradeWords(input, sentences[current]);
    setResults(r => [...r, { sentence: sentences[current], typed: input, grade }]);
    grade.filter(g => g.status === "wrong").forEach(g =>
      logMistake({ fr: g.word, vi: "", context: sentences[current], module: "dictee_audio" })
    );
    setChecked(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const next = () => {
    const nextIdx = current + 1;
    if (nextIdx >= sentences.length) {
      setPhase("done");
    } else {
      setCurrent(nextIdx); setInput(""); setChecked(false);
    }
  };

  const restart = () => {
    setCurrent(0); setInput(""); setChecked(false); setResults([]);
    setPhase("quiz");
  };

  const totalWords  = results.reduce((a, r) => a + r.grade.length, 0);
  const okWords     = results.reduce((a, r) => a + r.grade.filter(g => g.status === "ok").length, 0);
  const accentWords = results.reduce((a, r) => a + r.grade.filter(g => g.status === "accent").length, 0);
  const pct = totalWords > 0 ? Math.round(okWords / totalWords * 100) : 0;

  // ── SETUP ──
  if (phase === "setup") return (
    <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem", animation: "fadeUp 0.3s ease" }}>

      {/* Upload zone */}
      <div style={{ background: C.white, borderRadius: 16, border: `1.5px dashed ${audioUrl ? "#0891B2" : C.border}`, padding: "1.25rem 1rem", textAlign: "center" }}>
        <div style={{ fontSize: "2rem", marginBottom: "0.4rem" }}>📂</div>
        <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1rem", color: C.ink, marginBottom: "0.2rem" }}>
          Upload file audio
        </div>
        <div style={{ fontSize: "0.72rem", color: C.gray, marginBottom: "0.85rem" }}>
          MP3, WAV, M4A — giáo trình, podcast, TV5Monde…
        </div>
        {audioUrl ? (
          <div>
            <div style={{ fontSize: "0.78rem", color: "#0891B2", fontWeight: 600, marginBottom: "0.6rem" }}>✓ {fileName}</div>
            <audio ref={audioRef} src={audioUrl} controls style={{ width: "100%", borderRadius: 10, marginBottom: "0.5rem" }} />
            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
              <button onClick={replay5}
                style={{ padding: "0.3rem 0.85rem", background: "#EFF6FF", border: "1.5px solid #0891B233", color: "#0891B2", borderRadius: 999, fontSize: "0.72rem", fontWeight: 600, cursor: "pointer" }}>
                ↩ -5s
              </button>
              <button onClick={() => { setAudioUrl(null); setFileName(""); if (fileRef.current) fileRef.current.value = ""; }}
                style={{ padding: "0.3rem 0.85rem", background: "transparent", border: `1.5px solid ${C.border}`, color: C.gray, borderRadius: 999, fontSize: "0.72rem", cursor: "pointer" }}>
                Đổi file
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => fileRef.current?.click()}
            style={{ padding: "0.6rem 1.5rem", background: "linear-gradient(135deg,#0891B2,#0D9488)", color: "#fff", border: "none", borderRadius: 12, fontSize: "0.82rem", fontWeight: 700, cursor: "pointer" }}>
            Chọn file
          </button>
        )}
        <input ref={fileRef} type="file" accept="audio/*" onChange={handleFile} style={{ display: "none" }} />
      </div>

      {/* Transcript */}
      <div style={{ background: C.white, borderRadius: 16, border: `1.5px solid ${C.border}`, padding: "1rem" }}>
        <div style={{ fontSize: "0.7rem", color: C.gray, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600, marginBottom: "0.45rem" }}>
          Transcript (để tự động chấm bài)
        </div>
        <textarea
          value={transcript}
          onChange={e => setTranscript(e.target.value)}
          placeholder={"Paste transcript tiếng Pháp vào đây:\nBonjour, je m'appelle Marie.\nJ'habite à Paris depuis dix ans."}
          rows={5}
          style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "0.65rem 0.8rem", fontSize: "0.84rem", fontFamily: "Georgia,serif", color: C.ink, resize: "vertical", lineHeight: 1.7, outline: "none", boxSizing: "border-box" }}
        />
        {transcript.trim() && (
          <div style={{ marginTop: "0.3rem", fontSize: "0.7rem", color: C.gray }}>
            → {parseTranscript(transcript).length} câu được nhận diện
          </div>
        )}
      </div>

      <button
        onClick={start}
        disabled={!audioUrl || !transcript.trim()}
        style={{ padding: "0.75rem", background: audioUrl && transcript.trim() ? "linear-gradient(135deg,#0891B2,#0D9488)" : C.border, color: "#fff", border: "none", borderRadius: 14, fontFamily: "'Playfair Display',Georgia,serif", fontSize: "0.95rem", cursor: audioUrl && transcript.trim() ? "pointer" : "not-allowed", fontWeight: 700, transition: "all 0.2s" }}>
        Bắt đầu chép ✦
      </button>
    </div>
  );

  // ── QUIZ ──
  if (phase === "quiz") {
    const sentence = sentences[current];
    return (
      <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem", animation: "fadeUp 0.3s ease" }}>

        {/* Progress */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "0.72rem", color: C.gray, fontWeight: 600 }}>Câu {current + 1}/{sentences.length}</div>
          <div style={{ display: "flex", gap: 4 }}>
            {sentences.slice(0, Math.min(sentences.length, 10)).map((_, i) => (
              <div key={i} style={{ width: 22, height: 4, borderRadius: 999, background: i < current ? C.green : i === current ? "#0891B2" : C.border, transition: "background 0.3s" }} />
            ))}
          </div>
        </div>

        {/* Audio player */}
        <div style={{ background: "linear-gradient(135deg,#0891B2,#0D9488)", borderRadius: 20, padding: "1.2rem", boxShadow: "0 8px 30px #0891B244" }}>
          <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.8)", textAlign: "center", marginBottom: "0.75rem" }}>
            Nghe và gõ lại câu {current + 1}
          </div>
          <audio ref={audioRef} src={audioUrl} controls style={{ width: "100%", borderRadius: 10, marginBottom: "0.5rem" }} />
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
            <button onClick={replay5}
              style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 999, padding: "0.25rem 0.85rem", color: "#fff", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer" }}>
              ↩ -5s
            </button>
          </div>
        </div>

        {/* Input */}
        <div style={{ background: C.white, borderRadius: 16, padding: "1rem", border: `1.5px solid ${checked ? C.border : "#0891B2"}44`, boxShadow: checked ? "none" : "0 0 0 3px #0891B211" }}>
          <div style={{ fontSize: "0.65rem", color: C.gray, marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: 1 }}>Gõ câu bạn nghe được</div>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={checked}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); checked ? next() : check(); } }}
            placeholder="Gõ tiếng Pháp…"
            rows={2}
            style={{ width: "100%", border: "none", outline: "none", fontSize: "0.9rem", fontFamily: "Georgia,serif", color: C.ink, resize: "none", background: "transparent", lineHeight: 1.7 }}
          />
          {!checked && (
            <button onClick={check} disabled={!input.trim()}
              style={{ marginTop: "0.4rem", padding: "0.5rem 1.2rem", background: "#0891B2", color: "#fff", border: "none", borderRadius: 10, fontSize: "0.82rem", cursor: "pointer", fontWeight: 600, opacity: input.trim() ? 1 : 0.5 }}>
              Chấm ✓
            </button>
          )}
        </div>

        {/* Result */}
        {checked && (
          <div style={{ background: C.white, borderRadius: 16, padding: "1rem 1.1rem", border: `1.5px solid ${C.border}`, animation: "fadeUp 0.25s ease" }}>
            <div style={{ fontSize: "0.65rem", color: C.gray, marginBottom: "0.45rem", textTransform: "uppercase", letterSpacing: 1 }}>Kết quả</div>
            <WordDiff result={gradeWords(input, sentence)} />
            <div style={{ marginTop: "0.6rem", fontSize: "0.78rem", color: C.gray, fontStyle: "italic" }}>
              Câu đúng: <span style={{ color: C.ink, fontWeight: 600 }}>{sentence}</span>
            </div>
            <button onClick={next}
              style={{ marginTop: "0.75rem", width: "100%", padding: "0.6rem", background: current + 1 >= sentences.length ? "linear-gradient(135deg,#059669,#0D9488)" : "#0891B2", color: "#fff", border: "none", borderRadius: 12, fontSize: "0.85rem", cursor: "pointer", fontWeight: 700 }}>
              {current + 1 >= sentences.length ? "Xem kết quả 🏁" : "Câu tiếp theo →"}
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── DONE ──
  if (phase === "done") return (
    <div style={{ padding: "1rem", animation: "fadeUp 0.3s ease" }}>
      <div style={{ background: C.white, borderRadius: 20, padding: "1.4rem 1.2rem", border: `1.5px solid ${C.border}`, textAlign: "center" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{pct >= 80 ? "🎉" : pct >= 60 ? "👍" : "💪"}</div>
        <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "2rem", color: pct >= 80 ? "#059669" : pct >= 60 ? C.gold : C.red, fontWeight: 700 }}>
          {okWords}/{totalWords}
        </div>
        <div style={{ fontSize: "0.75rem", color: C.gray, marginTop: "0.2rem", marginBottom: "1rem" }}>
          {pct}% từ đúng · {accentWords} lỗi accent
        </div>
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={restart}
            style={{ padding: "0.55rem 1.2rem", background: "linear-gradient(135deg,#0891B2,#0D9488)", color: "#fff", border: "none", borderRadius: 12, fontSize: "0.82rem", cursor: "pointer", fontWeight: 700 }}>
            🔄 Làm lại
          </button>
          <button onClick={() => setPhase("review")}
            style={{ padding: "0.55rem 1.2rem", background: C.white, border: `1.5px solid ${C.border}`, color: C.ink, borderRadius: 12, fontSize: "0.82rem", cursor: "pointer" }}>
            📋 Xem kết quả
          </button>
          <button onClick={() => setPhase("setup")}
            style={{ padding: "0.55rem 1rem", background: C.white, border: `1.5px solid ${C.border}`, color: C.gray, borderRadius: 12, fontSize: "0.82rem", cursor: "pointer" }}>
            📂 File mới
          </button>
        </div>
      </div>
    </div>
  );

  // ── REVIEW ──
  return (
    <div style={{ padding: "1rem", animation: "fadeUp 0.3s ease" }}>
      <div style={{ fontSize: "0.72rem", fontWeight: 700, color: C.gray, textTransform: "uppercase", letterSpacing: 1, marginBottom: "0.75rem" }}>Kết quả từng câu</div>
      {results.map((r, i) => (
        <div key={i} style={{ background: C.white, borderRadius: 14, padding: "0.9rem 1rem", border: `1.5px solid ${C.border}`, marginBottom: "0.5rem" }}>
          <div style={{ fontSize: "0.67rem", color: C.gray, marginBottom: "0.35rem" }}>Câu {i + 1}</div>
          <div style={{ fontSize: "0.82rem", color: C.ink, fontStyle: "italic", marginBottom: "0.4rem", lineHeight: 1.6 }}>{r.sentence}</div>
          <WordDiff result={r.grade} />
        </div>
      ))}
      <button onClick={restart}
        style={{ width: "100%", marginTop: "0.5rem", padding: "0.65rem", background: "linear-gradient(135deg,#0891B2,#0D9488)", color: "#fff", border: "none", borderRadius: 12, fontSize: "0.85rem", cursor: "pointer", fontWeight: 700 }}>
        🔄 Làm lại
      </button>
    </div>
  );
}
