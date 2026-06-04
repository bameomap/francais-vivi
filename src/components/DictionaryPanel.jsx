import { useState, useRef } from "react";
import { C } from "../constants.js";
import { callAI } from "../utils/api.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import Spinner from "./ui/Spinner.jsx";

const CACHE_PREFIX = "dict_v1_";

const QUICK_WORDS = [
  "bâtiment", "quartier", "déménager", "s'occuper", "se déplacer",
  "gratuit", "économiser", "proposer", "participer", "découvrir",
];

function buildPrompt(word) {
  return `Tra từ tiếng Pháp: "${word}"
Trả về JSON hợp lệ KHÔNG có markdown:
{
  "word": "${word}",
  "type": "loại từ viết tắt (n.m / n.f / n.m/f / v / adj / adv / prép / conj / expr)",
  "pronunciation": "phiên âm IPA ngắn gọn, vd [bɑ.ti.mɑ̃]",
  "vi": "nghĩa tiếng Việt chính, ngắn gọn",
  "vi_extra": "nghĩa bổ sung hoặc cách dùng khác nếu có, để trống nếu không",
  "gender": "đực/cái/không áp dụng — chỉ cho danh từ",
  "plural": "dạng số nhiều — chỉ cho danh từ, để trống nếu không cần",
  "examples": [
    {"fr": "câu ví dụ 1 tiếng Pháp ngắn", "vi": "bản dịch tiếng Việt"},
    {"fr": "câu ví dụ 2 tiếng Pháp ngắn", "vi": "bản dịch tiếng Việt"}
  ],
  "grammar_note": "ghi chú ngữ pháp quan trọng tiếng Việt, tối đa 20 từ (để trống nếu không có)",
  "related": ["từ liên quan 1", "từ liên quan 2", "từ liên quan 3"]
}`;
}

const TYPE_COLOR = {
  "n.m":   { bg: "#EBF4FF", text: "#1B3A6B", label: "n.m — danh từ đực" },
  "n.f":   { bg: "#FDF2F8", text: "#9D174D", label: "n.f — danh từ cái" },
  "n.m/f": { bg: "#F5F3FF", text: "#5B21B6", label: "n.m/f — cả hai" },
  "v":     { bg: "#ECFDF5", text: "#065F46", label: "v — động từ" },
  "adj":   { bg: "#FFF7ED", text: "#92400E", label: "adj — tính từ" },
  "adv":   { bg: "#FEF9C3", text: "#713F12", label: "adv — phó từ" },
  "prép":  { bg: "#EFF6FF", text: "#1E40AF", label: "prép — giới từ" },
  "conj":  { bg: "#F0FDF4", text: "#166534", label: "conj — liên từ" },
  "expr":  { bg: "#FFF0EF", text: "#9B1C1C", label: "expr — thành ngữ" },
};

function TypeBadge({ type }) {
  const t = TYPE_COLOR[type] || { bg: C.cream, text: C.gray, label: type };
  return (
    <span style={{ background: t.bg, color: t.text, border: `1px solid ${t.text}44`, borderRadius: 20, padding: "0.1rem 0.55rem", fontSize: "0.72rem", fontWeight: 700, whiteSpace: "nowrap" }}>
      {t.label}
    </span>
  );
}

const WORDLIST_KEY = "reading_wordlist_v1";

export default function DictionaryPanel() {
  const [query,   setQuery]   = useState("");
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState(null);
  const [error,   setError]   = useState("");
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("dict_history") || "[]"); } catch { return []; }
  });
  const [savedWords, setSavedWords] = useState(() => {
    try { return JSON.parse(localStorage.getItem(WORDLIST_KEY) || "[]"); } catch { return []; }
  });
  const inputRef = useRef(null);

  const isSaved = result && savedWords.some(w => w.fr === result.word);

  const saveWord = () => {
    if (!result || isSaved) return;
    const updated = [{
      fr: result.word, vi: result.vi, type: result.type,
      note: result.grammar_note || "", source: "Tra từ điển",
      unit: null, savedAt: Date.now(),
    }, ...savedWords];
    setSavedWords(updated);
    try { localStorage.setItem(WORDLIST_KEY, JSON.stringify(updated)); } catch {}
  };

  const lookup = async (word) => {
    const w = (word || query).trim().toLowerCase();
    if (!w) return;
    setError("");
    setQuery(w);

    // Check cache
    const cached = localStorage.getItem(CACHE_PREFIX + w);
    if (cached) {
      try { setResult(JSON.parse(cached)); return; } catch {}
    }

    setLoading(true);
    setResult(null);
    try {
      const data = await callAI(buildPrompt(w));
      setResult(data);
      try {
        localStorage.setItem(CACHE_PREFIX + w, JSON.stringify(data));
        const newHistory = [w, ...history.filter(h => h !== w)].slice(0, 20);
        setHistory(newHistory);
        localStorage.setItem("dict_history", JSON.stringify(newHistory));
      } catch {}
    } catch {
      setError("Không tìm được từ này. Thử lại nhé!");
    }
    setLoading(false);
  };

  const clearResult = () => { setResult(null); setQuery(""); setError(""); inputRef.current?.focus(); };

  return (
    <div style={{ padding: "1rem", animation: "fadeUp 0.3s ease" }}>
      {/* Header */}
      <div style={{ marginBottom: "1rem" }}>
        <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1.05rem", color: C.ink, fontWeight: 700, marginBottom: "0.15rem" }}>
          🔍 Tra từ điển
        </div>
        <div style={{ fontSize: "0.72rem", color: C.gray }}>Nhập từ tiếng Pháp bất kỳ · Nghĩa + ngữ pháp + ví dụ</div>
      </div>

      {/* Search bar */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && lookup()}
          placeholder="Nhập từ tiếng Pháp… vd: bâtiment"
          style={{
            flex: 1, padding: "0.55rem 0.85rem",
            border: `1.5px solid ${C.border}`, borderRadius: 12,
            fontSize: "0.9rem", fontFamily: "Georgia,serif",
            color: C.ink, background: C.white, outline: "none",
            boxSizing: "border-box",
          }}
        />
        <button
          onClick={() => lookup()}
          disabled={loading || !query.trim()}
          style={{
            padding: "0.55rem 1rem", background: query.trim() ? C.blue : C.border,
            color: C.white, border: "none", borderRadius: 12,
            fontSize: "0.82rem", fontWeight: 700, cursor: query.trim() ? "pointer" : "default",
            fontFamily: "inherit", flexShrink: 0, transition: "all 0.15s",
          }}
        >
          {loading ? <Spinner size={14} /> : "Tra →"}
        </button>
      </div>

      {/* Quick chips */}
      {!result && !loading && (
        <div style={{ marginBottom: "1rem" }}>
          <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: 1.5, color: C.gray2, fontWeight: 700, marginBottom: "0.4rem" }}>Tra nhanh</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
            {QUICK_WORDS.map(w => (
              <button key={w} onClick={() => lookup(w)}
                style={{ padding: "0.22rem 0.6rem", background: C.cream, border: `1px solid ${C.border}`, borderRadius: 20, fontSize: "0.74rem", color: C.blue, cursor: "pointer", fontFamily: "Georgia,serif", fontWeight: 500 }}>
                {w}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* History */}
      {!result && !loading && history.length > 0 && (
        <div>
          <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: 1.5, color: C.gray2, fontWeight: 700, marginBottom: "0.4rem" }}>Đã tra gần đây</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
            {history.slice(0, 12).map(w => (
              <button key={w} onClick={() => lookup(w)}
                style={{ padding: "0.22rem 0.6rem", background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, fontSize: "0.74rem", color: C.gray, cursor: "pointer", fontFamily: "Georgia,serif" }}>
                {w}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{ background: C.redL, border: `1px solid ${C.red}44`, borderRadius: 10, padding: "0.6rem 0.85rem", fontSize: "0.8rem", color: C.red }}>
          {error}
        </div>
      )}

      {/* Result card */}
      {result && (
        <div style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 16, overflow: "hidden", animation: "fadeUp 0.25s ease" }}>

          {/* Word header */}
          <div style={{ background: `linear-gradient(135deg, ${C.blueDark} 0%, #2d4f8a 100%)`, padding: "1rem 1.2rem" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                  <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1.5rem", color: "#fff", fontWeight: 700 }}>{result.word}</span>
                  <SpeakBtn text={result.word} size="0.85rem" color="#fff" />
                </div>
                {result.pronunciation && (
                  <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.65)", fontFamily: "Georgia,serif", marginBottom: "0.35rem" }}>{result.pronunciation}</div>
                )}
                <TypeBadge type={result.type} />
              </div>
              <button onClick={clearResult}
                style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", borderRadius: 20, padding: "0.2rem 0.55rem", fontSize: "0.7rem", cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}>
                ✕ Xóa
              </button>
            </div>
          </div>

          <div style={{ padding: "1rem 1.2rem" }}>

            {/* Meaning */}
            <div style={{ marginBottom: "0.85rem" }}>
              <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: 1.5, color: C.gray2, fontWeight: 700, marginBottom: "0.3rem" }}>Nghĩa</div>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: C.ink, marginBottom: result.vi_extra ? "0.2rem" : 0 }}>{result.vi}</div>
              {result.vi_extra && <div style={{ fontSize: "0.82rem", color: C.gray }}>{result.vi_extra}</div>}
            </div>

            {/* Grammar info (gender/plural) */}
            {(result.gender && result.gender !== "không áp dụng") && (
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.85rem", flexWrap: "wrap" }}>
                <div style={{ background: C.cream, borderRadius: 8, padding: "0.35rem 0.7rem", fontSize: "0.76rem", color: C.ink }}>
                  <span style={{ color: C.gray, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: 1, marginRight: "0.3rem" }}>Giống</span>
                  <strong>{result.gender}</strong>
                </div>
                {result.plural && (
                  <div style={{ background: C.cream, borderRadius: 8, padding: "0.35rem 0.7rem", fontSize: "0.76rem", color: C.ink }}>
                    <span style={{ color: C.gray, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: 1, marginRight: "0.3rem" }}>Số nhiều</span>
                    <strong style={{ fontFamily: "Georgia,serif" }}>{result.plural}</strong>
                    <SpeakBtn text={result.plural} size="0.65rem" style={{ marginLeft: 4 }} />
                  </div>
                )}
              </div>
            )}

            {/* Grammar note */}
            {result.grammar_note && (
              <div style={{ background: C.goldL, border: `1px solid ${C.gold}44`, borderRadius: 8, padding: "0.45rem 0.7rem", fontSize: "0.76rem", color: C.ink, lineHeight: 1.5, marginBottom: "0.85rem" }}>
                💡 {result.grammar_note}
              </div>
            )}

            {/* Examples */}
            {result.examples?.length > 0 && (
              <div style={{ marginBottom: "0.85rem" }}>
                <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: 1.5, color: C.gray2, fontWeight: 700, marginBottom: "0.4rem" }}>Ví dụ</div>
                {result.examples.map((ex, i) => (
                  <div key={i} style={{ padding: "0.45rem 0", borderBottom: i < result.examples.length - 1 ? `1px solid ${C.border}` : "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.15rem" }}>
                      <span style={{ fontFamily: "Georgia,serif", fontSize: "0.9rem", color: C.blue, fontWeight: 600 }}>{ex.fr}</span>
                      <SpeakBtn text={ex.fr} size="0.65rem" />
                    </div>
                    <div style={{ fontSize: "0.78rem", color: C.gray }}>→ {ex.vi}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Related words */}
            {result.related?.length > 0 && (
              <div style={{ marginBottom: "0.85rem" }}>
                <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: 1.5, color: C.gray2, fontWeight: 700, marginBottom: "0.4rem" }}>Từ liên quan</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                  {result.related.map(w => (
                    <button key={w} onClick={() => { setQuery(w); lookup(w); }}
                      style={{ padding: "0.22rem 0.6rem", background: C.blueL, border: `1px solid ${C.blue}44`, borderRadius: 20, fontSize: "0.76rem", color: C.blue, cursor: "pointer", fontFamily: "Georgia,serif", fontWeight: 500 }}>
                      {w} →
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Save to word list */}
            <button onClick={saveWord} disabled={isSaved}
              style={{ width: "100%", padding: "0.55rem", background: isSaved ? C.greenL : C.green, border: isSaved ? `1.5px solid ${C.green}` : "none", borderRadius: 12, color: isSaved ? C.green : "#fff", fontSize: "0.85rem", fontWeight: 700, cursor: isSaved ? "default" : "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
              {isSaved ? "✅ Đã lưu vào danh sách" : "💾 Lưu vào danh sách từ"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
