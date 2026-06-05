import { useState, useRef, useEffect, useCallback } from "react";
import { C } from "../constants.js";
import { speak, shuffleArray } from "../utils/helpers.js";
import { logMistake, markModuleUsed } from "../utils/storage.js";
import { getAllCards } from "../utils/srs.js";

// ── Levenshtein similarity [0, 1] ─────────────────────────────
// Strips punctuation, lowercases, then scores edit distance vs max length.
function similarity(a, b) {
  a = a.toLowerCase().trim().replace(/[.,!?;:'"-]/g, "");
  b = b.toLowerCase().trim().replace(/[.,!?;:'"-]/g, "");
  if (a === b) return 1;
  const m = a.length, n = b.length;
  if (!m || !n) return 0;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return 1 - dp[m][n] / Math.max(m, n);
}

const FALLBACK_WORDS = [
  { fr: "bonjour", vi: "xin chào" },
  { fr: "merci", vi: "cảm ơn" },
  { fr: "s'il vous plaît", vi: "làm ơn" },
  { fr: "au revoir", vi: "tạm biệt" },
  { fr: "excusez-moi", vi: "xin lỗi" },
  { fr: "je ne comprends pas", vi: "tôi không hiểu" },
  { fr: "comment allez-vous", vi: "bạn có khỏe không" },
  { fr: "enchanté", vi: "rất vui được gặp" },
  { fr: "d'accord", vi: "đồng ý" },
  { fr: "c'est bien", vi: "tốt lắm" },
];

function scoreInfo(sc) {
  if (sc >= 85) return { label: "Xuất sắc!", emoji: "🎉", color: C.green,  bg: C.greenL };
  if (sc >= 65) return { label: "Tốt!",      emoji: "👍", color: C.blue,   bg: C.blueL  };
  if (sc >= 40) return { label: "Cần luyện thêm", emoji: "😅", color: C.gold, bg: C.goldL };
  return             { label: "Thử lại nào!", emoji: "🙈", color: C.red,   bg: C.redL   };
}

export default function PrononciationPanel({ words = [] }) {
  const [queue] = useState(() => {
    let src = words.filter(w => w.fr);
    if (!src.length) src = getAllCards().map(c => ({ fr: c.fr, vi: c.vi })).filter(w => w.fr);
    if (!src.length) src = FALLBACK_WORDS;
    return shuffleArray(src);
  });
  const [idx,        setIdx]        = useState(0);
  const [phase,      setPhase]      = useState("idle"); // idle | listening | result
  const [transcript, setTranscript] = useState("");
  const [score,      setScore]      = useState(0);
  const [stats,      setStats]      = useState({ total: 0, great: 0, good: 0 });
  const recRef = useRef(null);

  const micOK = typeof window !== "undefined" &&
    !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  const word = queue[idx % queue.length];
  const info = scoreInfo(score);

  useEffect(() => { markModuleUsed("prononciation"); }, []);

  // Auto-play TTS when the card changes
  useEffect(() => { speak(word.fr); }, [word.fr]);

  // Cleanup recognition on unmount
  useEffect(() => () => { try { recRef.current?.abort(); } catch {} }, []);

  const startListening = useCallback(() => {
    if (!micOK || phase === "listening") return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang          = "fr-FR";
    rec.interimResults = false;
    rec.continuous     = false;
    let gotResult      = false;

    rec.onresult = (e) => {
      gotResult = true;
      const txt = Array.from(e.results).map(r => r[0].transcript).join("").trim();
      const sc  = Math.round(similarity(txt, word.fr) * 100);
      setTranscript(txt);
      setScore(sc);
      setPhase("result");
      setStats(s => ({
        total: s.total + 1,
        great: s.great + (sc >= 85 ? 1 : 0),
        good:  s.good  + (sc >= 65 && sc < 85 ? 1 : 0),
      }));
      // Log to "Ôn sai" when score is poor so WeakSpots picks it up
      if (sc < 50) logMistake({ fr: word.fr, vi: word.vi, context: "phát âm", module: "prononciation" });
    };
    rec.onerror = ()   => setPhase("idle");
    // onend fires after onresult too; only reset if no result came in
    rec.onend   = ()   => { if (!gotResult) setPhase("idle"); };

    recRef.current = rec;
    setPhase("listening");
    rec.start();
  }, [micOK, phase, word]);

  const stopListening = () => { recRef.current?.stop(); setPhase("idle"); };
  const retry = () => { setPhase("idle"); setTranscript(""); setScore(0); };
  const next  = () => { setIdx(i => i + 1); setPhase("idle"); setTranscript(""); setScore(0); };

  return (
    <div style={{ padding: "1rem", maxWidth: 480, margin: "0 auto" }}>

      {/* ── Stats bar ── */}
      {stats.total > 0 && (
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", justifyContent: "center" }}>
          {[
            { label: "Tổng",     val: stats.total, color: C.gray  },
            { label: "Xuất sắc", val: stats.great, color: C.green },
            { label: "Tốt",      val: stats.good,  color: C.blue  },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center", background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: "0.3rem 0.8rem", minWidth: 64 }}>
              <div style={{ fontSize: "1.2rem", fontWeight: 700, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: "0.6rem", color: C.gray }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── Word card ── */}
      <div style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 18, padding: "1.75rem 1.25rem", marginBottom: "1rem", textAlign: "center" }}>
        <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: 1.5, color: C.gray, fontWeight: 700, marginBottom: "0.6rem" }}>
          Luyện phát âm
        </div>
        <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "2.4rem", color: C.ink, fontWeight: 700, lineHeight: 1.15, marginBottom: "0.3rem" }}>
          {word.fr}
        </div>
        {word.vi && (
          <div style={{ fontSize: "0.85rem", color: C.gray, marginBottom: "1rem" }}>↳ {word.vi}</div>
        )}
        <button
          onClick={() => speak(word.fr)}
          style={{ background: C.blueL, border: `1.5px solid ${C.blue}33`, borderRadius: 12, padding: "0.4rem 1.1rem", fontSize: "0.82rem", color: C.blue, cursor: "pointer", fontWeight: 600 }}>
          🔊 Nghe mẫu
        </button>
      </div>

      {/* ── Mic area ── */}
      {phase !== "result" ? (
        <div style={{ textAlign: "center" }}>
          {!micOK ? (
            <div style={{ padding: "1.2rem", color: C.gray, fontSize: "0.82rem", background: C.cream, borderRadius: 14 }}>
              ⚠️ Trình duyệt không hỗ trợ nhận diện giọng nói.<br />Vui lòng dùng <strong>Chrome</strong> trên máy tính hoặc Android.
            </div>
          ) : (
            <>
              <button
                onClick={phase === "listening" ? stopListening : startListening}
                style={{
                  width: 84, height: 84, borderRadius: "50%",
                  background: phase === "listening"
                    ? `linear-gradient(135deg, ${C.red}, #C0392B)`
                    : `linear-gradient(135deg, ${C.blue}, ${C.blueDark})`,
                  border: "none", cursor: "pointer", fontSize: "2.2rem",
                  boxShadow: phase === "listening"
                    ? `0 0 0 10px ${C.red}2a, 0 4px 24px ${C.red}44`
                    : `0 4px 20px ${C.blue}44`,
                  transition: "all 0.25s",
                }}>
                🎤
              </button>
              <div style={{ marginTop: "0.75rem", fontSize: "0.78rem", color: C.gray, minHeight: "1.2em" }}>
                {phase === "listening" ? "Đang nghe… (nhấn để dừng)" : "Nhấn để đọc"}
              </div>
            </>
          )}
        </div>
      ) : (
        /* ── Result card ── */
        <div style={{ background: info.bg, border: `1.5px solid ${info.color}44`, borderRadius: 18, padding: "1.4rem 1.25rem", textAlign: "center" }}>
          <div style={{ fontSize: "2.2rem", marginBottom: "0.15rem" }}>{info.emoji}</div>
          <div style={{ fontWeight: 700, color: info.color, fontSize: "1rem", marginBottom: "0.1rem" }}>
            {info.label}
          </div>
          <div style={{ fontSize: "2.8rem", fontWeight: 700, color: info.color, lineHeight: 1.1 }}>
            {score}%
          </div>

          {transcript && (
            <div style={{ marginTop: "0.8rem", padding: "0.5rem 0.8rem", background: "rgba(255,255,255,0.65)", borderRadius: 10, fontSize: "0.82rem", color: C.gray }}>
              Bạn đọc: <span style={{ color: C.ink, fontStyle: "italic" }}>"{transcript}"</span>
            </div>
          )}

          {score < 65 && (
            <button onClick={() => speak(word.fr)}
              style={{ marginTop: "0.7rem", background: "transparent", border: "none", color: info.color, fontSize: "0.78rem", cursor: "pointer", textDecoration: "underline" }}>
              🔊 Nghe lại mẫu
            </button>
          )}

          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", justifyContent: "center" }}>
            <button onClick={retry}
              style={{ padding: "0.6rem 1.2rem", background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 12, fontSize: "0.82rem", color: C.gray, cursor: "pointer" }}>
              🔁 Thử lại
            </button>
            <button onClick={next}
              style={{ padding: "0.6rem 1.4rem", background: `linear-gradient(135deg,${C.blue},${C.blueDark})`, border: "none", borderRadius: 12, fontSize: "0.82rem", color: "#fff", cursor: "pointer", fontWeight: 700 }}>
              Từ tiếp →
            </button>
          </div>
        </div>
      )}

      {/* ── Progress ── */}
      <div style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.7rem", color: C.gray }}>
        {(idx % queue.length) + 1} / {queue.length} từ
      </div>
    </div>
  );
}
