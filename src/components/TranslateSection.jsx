import { useState } from "react";
import { C } from "../constants.js";
import { gradeTranslation } from "../utils/api.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";

// Bài DỊCH CÂU hai chiều (VI→FR / FR→VI), AI chấm theo nghĩa.
// exercises: [{ direction:"vi2fr"|"fr2vi", source, reference, note }]
export default function TranslateSection({ exercises = [], onComplete }) {
  const [st, setSt] = useState(() => exercises.map(() => ({ val: "", loading: false, res: null, err: "" })));
  const set = (i, patch) => setSt(prev => prev.map((s, j) => (j === i ? { ...s, ...patch } : s)));

  const check = async (i) => {
    const ex = exercises[i];
    const val = (st[i].val || "").trim();
    if (!val || st[i].loading || st[i].res) return;
    set(i, { loading: true, err: "" });
    try {
      const res = await gradeTranslation({
        direction: ex.direction, source: ex.source, reference: ex.reference, userAnswer: val,
      });
      set(i, { loading: false, res });
      // mọi câu đã có kết quả → coi như hoàn thành
      if (st.every((s, j) => j === i || s.res)) onComplete?.();
    } catch (e) {
      set(i, { loading: false, err: e.message });
    }
  };

  return (
    <div>
      {exercises.map((ex, i) => {
        const s = st[i];
        const fr2vi = ex.direction === "fr2vi";
        const verdict = s.res?.verdict;
        const tone = verdict === "correct" ? C.green : verdict === "close" ? C.gold : C.red;
        const targetLabel = fr2vi ? "Dịch sang tiếng Việt" : "Dịch sang tiếng Pháp";
        return (
          <div key={i} style={{
            background: s.res ? (verdict === "correct" ? C.greenL : C.redL) : C.white,
            border: `1.5px solid ${s.res ? tone : C.border}`,
            borderRadius: 14, padding: "0.9rem 1rem", marginBottom: "0.65rem",
          }}>
            {/* Direction chip */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.55rem" }}>
              <span style={{ fontSize: "0.6rem", fontWeight: 700, color: C.purple, textTransform: "uppercase", letterSpacing: 1 }}>
                Câu {i + 1} · {fr2vi ? "🇫🇷 → 🇻🇳" : "🇻🇳 → 🇫🇷"}
              </span>
              <span style={{ fontSize: "0.62rem", color: C.gray }}>{targetLabel}</span>
            </div>

            {/* Source */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: "0.6rem" }}>
              <span style={{ fontFamily: "Georgia,serif", fontSize: "1rem", color: C.ink, lineHeight: 1.4 }}>{ex.source}</span>
              {fr2vi && <SpeakBtn text={ex.source} />}
            </div>

            {/* Input */}
            <textarea
              value={s.val}
              disabled={!!s.res}
              onChange={e => set(i, { val: e.target.value })}
              placeholder={fr2vi ? "Nhập bản dịch tiếng Việt..." : "Saisis ta traduction française..."}
              rows={2}
              style={{
                width: "100%", boxSizing: "border-box", resize: "vertical",
                border: `1.5px solid ${s.res ? tone : C.border}`, borderRadius: 8,
                padding: "0.45rem 0.6rem", fontSize: "0.88rem", fontFamily: "inherit",
                outline: "none", background: s.res ? C.white : C.white, color: C.ink,
              }}
            />

            {s.err && <div style={{ color: C.red, fontSize: "0.74rem", marginTop: "0.4rem" }}>⚠ {s.err}</div>}

            {!s.res && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
                <button onClick={() => check(i)} disabled={s.loading || !s.val.trim()}
                  style={{
                    padding: "0.35rem 0.95rem", background: s.loading || !s.val.trim() ? C.border : C.purple,
                    color: "#fff", border: "none", borderRadius: 8, fontSize: "0.78rem",
                    cursor: s.loading || !s.val.trim() ? "default" : "pointer", fontWeight: 600, fontFamily: "inherit",
                  }}>
                  {s.loading ? "AI đang chấm..." : "Kiểm tra"}
                </button>
                {ex.note && <span style={{ fontSize: "0.7rem", color: C.gold }}>💡 {ex.note}</span>}
              </div>
            )}

            {/* Result */}
            {s.res && (
              <div style={{ marginTop: "0.55rem" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: tone, marginBottom: "0.35rem" }}>
                  {verdict === "correct" ? "✓ Chính xác!" : verdict === "close" ? "≈ Gần đúng" : "✗ Chưa đúng"}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: C.ink, marginBottom: "0.3rem" }}>
                  <span style={{ color: C.gray, fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: 0.5 }}>Đáp án mẫu:</span>
                  <b style={{ fontFamily: fr2vi ? "inherit" : "Georgia,serif" }}>{s.res.correction || ex.reference}</b>
                  {!fr2vi && <SpeakBtn text={s.res.correction || ex.reference} />}
                </div>
                {s.res.feedback && (
                  <div style={{ background: C.goldL, border: `1px solid ${C.gold}55`, borderRadius: 8, padding: "0.35rem 0.6rem", fontSize: "0.74rem", color: C.gold, lineHeight: 1.55 }}>
                    💡 {s.res.feedback}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
