/**
 * PourPracticePanel.jsx
 * Luyện tập Pour communiquer — AI tạo tình huống, học sinh viết câu, AI chấm.
 */

import { useState, useCallback } from "react";
import { C } from "../constants.js";
import { EDITO_POUR_NOTES } from "../data/editoAudioNotes.js";
import { EDITO_AUDIO } from "../data/editoAudio.js";

// ── Build flat list of all practice items ─────────────────────────
function buildItems() {
  const items = [];
  Object.entries(EDITO_POUR_NOTES).forEach(([trackId, notes]) => {
    const unitKey = trackId.match(/^(u\d+)/)?.[1] || "u1";
    const tracks  = EDITO_AUDIO[unitKey] || [];
    const track   = tracks.find(t => t.id === trackId);
    notes.forEach((note, noteIdx) => {
      items.push({
        trackId,
        unitKey,
        section:    track?.section  || "",
        trackTitle: track?.title    || trackId,
        // Màu thống nhất theo theme (bỏ màu riêng của track)
        color:      C.blue,
        colorLight: C.blueL,
        noteIdx,
        heading: note.heading,
        phrases: note.phrases,
      });
    });
  });
  return items;
}

const ALL_ITEMS  = buildItems();
const UNIT_KEYS  = [...new Set(ALL_ITEMS.map(i => i.unitKey))]
  .sort((a, b) => parseInt(a.slice(1)) - parseInt(b.slice(1)));

// ── Score config ──────────────────────────────────────────────────
const SCORE = {
  perfect: { emoji:"🎉", color:C.green, bg:C.greenL, border:C.green, label:"Hoàn hảo!"  },
  good:    { emoji:"👍", color:"#2563EB", bg:C.blueL, border:"#93C5FD", label:"Tốt lắm!"   },
  partial: { emoji:"💪", color:C.gold, bg:C.goldL, border:C.gold, label:"Gần đúng!"  },
  wrong:   { emoji:"❌", color:C.red, bg:C.redL, border:C.red, label:"Chưa đúng"  },
};

// ── API helpers ───────────────────────────────────────────────────
async function callProxy(content, maxTokens = 250) {
  const res = await fetch("/api/proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      max_tokens: maxTokens,
      messages: [{ role: "user", content }],
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const raw   = data.content?.[0]?.text || "{}";
  const match = raw.match(/\{[\s\S]*\}/);
  return JSON.parse(match ? match[0] : "{}");
}

async function generateSituation(heading, phrases) {
  return callProxy(
`Bạn là giáo viên tiếng Pháp A1.
Tạo 1 tình huống thực tế ngắn để luyện công thức: "${heading}"
Mẫu câu: ${phrases.slice(0, 2).join(" / ")}

Trả về JSON thuần (không markdown):
{"vi":"Tình huống tiếng Việt 1-2 câu ngắn, cụ thể","ja":"日本語で同じ状況 1-2文"}`,
    200
  );
}

async function gradeResponse(heading, phrases, situationVi, userAnswer) {
  return callProxy(
`Bạn là giáo viên tiếng Pháp A1, chấm bài luyện tập giao tiếp.
Công thức đang luyện: "${heading}"
Mẫu câu đúng: ${phrases.join(" / ")}
Tình huống: "${situationVi}"
Câu học sinh viết: "${userAnswer}"

Quy tắc chấm:
- "perfect": dùng đúng công thức, ngữ pháp tốt
- "good": đúng ý, có thể cải thiện nhỏ (thiếu s'il vous plaît, v.v.)
- "partial": hiểu đúng nhưng sai ngữ pháp hoặc từ
- "wrong": chưa dùng đúng công thức

Trả về JSON thuần:
{"score":"perfect/good/partial/wrong","feedback":"nhận xét ngắn tiếng Việt 1-2 câu","correction":"câu tiếng Pháp đúng/đầy đủ hơn nếu cần, hoặc null","tip":"mẹo ngắn hoặc null"}`,
    300
  );
}

// ── Random picker (tránh lặp) ─────────────────────────────────────
function pickRandom(pool, exclude) {
  const candidates = exclude
    ? pool.filter(i => !(i.trackId === exclude.trackId && i.noteIdx === exclude.noteIdx))
    : pool;
  const src = candidates.length > 0 ? candidates : pool;
  return src[Math.floor(Math.random() * src.length)];
}

// ── Spinner ───────────────────────────────────────────────────────
function Spin({ color = "#7C3AED" }) {
  return (
    <div style={{
      width: 14, height: 14, flexShrink: 0,
      border: `2px solid ${color}40`,
      borderTopColor: color,
      borderRadius: "50%",
      animation: "pourSpin 0.7s linear infinite",
    }} />
  );
}

// ═══════════════════════════════════════════════════════════════════
export default function PourPracticePanel() {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [currentItem,  setCurrentItem]  = useState(null);
  const [situation,    setSituation]    = useState(null);   // { vi, ja }
  const [sitLoading,   setSitLoading]   = useState(false);
  const [showHint,     setShowHint]     = useState(false);
  const [userAnswer,   setUserAnswer]   = useState("");
  const [gradeResult,  setGradeResult]  = useState(null);
  const [gradeLoading, setGradeLoading] = useState(false);
  const [score,        setScore]        = useState({ total: 0, correct: 0 });

  const filteredItems = selectedUnit
    ? ALL_ITEMS.filter(i => i.unitKey === selectedUnit)
    : ALL_ITEMS;

  // ── Start / next ──────────────────────────────────────────────
  const startItem = useCallback(async (item) => {
    setCurrentItem(item);
    setSituation(null);
    setSitLoading(true);
    setUserAnswer("");
    setGradeResult(null);
    setShowHint(false);
    try {
      const sit = await generateSituation(item.heading, item.phrases);
      setSituation(sit);
    } catch {
      setSituation({ vi: "Không thể tạo tình huống. Nhấn Câu tiếp theo để thử lại!", ja: "" });
    }
    setSitLoading(false);
  }, []);

  const handleStart = () => startItem(pickRandom(filteredItems, null));
  const handleNext  = () => startItem(pickRandom(filteredItems, currentItem));

  // ── Submit ────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!userAnswer.trim() || !situation?.vi || gradeLoading) return;
    setGradeLoading(true);
    try {
      const result = await gradeResponse(
        currentItem.heading,
        currentItem.phrases,
        situation.vi,
        userAnswer.trim()
      );
      setGradeResult(result);
      const isOk = result.score === "perfect" || result.score === "good";
      setScore(s => ({ total: s.total + 1, correct: s.correct + (isOk ? 1 : 0) }));
    } catch {
      setGradeResult({ score: "wrong", feedback: "Lỗi kết nối AI. Thử lại nhé! 😢", correction: null, tip: null });
    }
    setGradeLoading(false);
  };

  const PURPLE = "#7C3AED";

  // ── Render ────────────────────────────────────────────────────
  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>

      {/* Hero banner */}
      <div style={{ background: "linear-gradient(135deg, #5B21B6 0%, #7C3AED 100%)", padding: "0.9rem 1rem 0.85rem" }}>
        <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1.1rem", color: "#fff", fontWeight: 800, lineHeight: 1.1 }}>
          🎯 Luyện tập giao tiếp
        </div>
        <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.7)", marginTop: 3 }}>
          AI tạo tình huống · Viết câu tiếng Pháp · AI chấm ngay
        </div>
      </div>

      {/* Unit filter + score */}
      <div style={{ padding: "0.6rem 1rem 0.5rem", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: "0.6rem", fontWeight: 700, color: C.gray, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Unit
          </span>
          {score.total > 0 && (
            <span style={{ fontSize: "0.65rem", color: PURPLE, fontWeight: 700, background: "#EDE9FE", padding: "0.1rem 0.5rem", borderRadius: 10 }}>
              ✓ {score.correct}/{score.total}
            </span>
          )}
        </div>
        <div style={{ display: "flex", gap: "0.3rem", overflowX: "auto", scrollbarWidth: "none", paddingBottom: 2 }}>
          {/* All */}
          <button onClick={() => { setSelectedUnit(null); setCurrentItem(null); }}
            style={{
              flexShrink: 0, padding: "0.26rem 0.65rem",
              background: !selectedUnit ? PURPLE : C.cream,
              border: `1.5px solid ${!selectedUnit ? PURPLE : C.border}`,
              color: !selectedUnit ? "#fff" : C.ink,
              borderRadius: 20, fontSize: "0.67rem",
              cursor: "pointer", fontFamily: "inherit",
              fontWeight: !selectedUnit ? 700 : 400,
              transition: "all 0.15s",
            }}>Tất cả</button>
          {UNIT_KEYS.map(uid => (
            <button key={uid} onClick={() => { setSelectedUnit(uid); setCurrentItem(null); }}
              style={{
                flexShrink: 0, padding: "0.26rem 0.6rem",
                background: selectedUnit === uid ? PURPLE : C.cream,
                border: `1.5px solid ${selectedUnit === uid ? PURPLE : C.border}`,
                color: selectedUnit === uid ? "#fff" : C.ink,
                borderRadius: 20, fontSize: "0.67rem",
                cursor: "pointer", fontFamily: "inherit",
                fontWeight: selectedUnit === uid ? 700 : 400,
                whiteSpace: "nowrap", transition: "all 0.15s",
              }}>
              {uid.replace("u", "U")}
            </button>
          ))}
        </div>
      </div>

      {/* ── Empty / Start screen ── */}
      {!currentItem && (
        <div style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "3.2rem", marginBottom: "0.7rem" }}>🎯</div>
          <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1rem", color: C.ink, fontWeight: 700, marginBottom: "0.45rem" }}>
            Luyện tập Pour communiquer
          </div>
          <div style={{ fontSize: "0.78rem", color: C.gray, lineHeight: 1.7, marginBottom: "1.5rem" }}>
            AI tạo tình huống thực tế bằng tiếng Việt (+ Nhật)<br />
            Bạn viết câu tiếng Pháp phù hợp<br />
            <span style={{ color: PURPLE, fontWeight: 600 }}>
              {filteredItems.length} công thức
            </span>{" "}
            từ {selectedUnit ? selectedUnit.replace("u", "Unit ") : "tất cả Unit"}
          </div>
          <button onClick={handleStart} style={{
            padding: "0.72rem 2.2rem",
            background: `linear-gradient(135deg, #5B21B6, ${PURPLE})`,
            color: "#fff", border: "none", borderRadius: 24,
            fontSize: "0.88rem", fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
            boxShadow: `0 4px 18px ${PURPLE}44`,
          }}>
            Bắt đầu luyện →
          </button>
        </div>
      )}

      {/* ── Practice area ── */}
      {currentItem && (
        <div style={{ padding: "0.8rem" }}>

          {/* Track badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.7rem", flexWrap: "wrap" }}>
            <span style={{
              background: `${C.blue}18`,
              color: C.blue,
              border: `1px solid ${C.blue}40`,
              fontSize: "0.59rem", fontWeight: 700,
              padding: "0.12rem 0.5rem", borderRadius: 10,
              textTransform: "uppercase",
            }}>
              {currentItem.trackId} · §{currentItem.section}
            </span>
            <span style={{ fontSize: "0.65rem", color: C.gray, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {currentItem.trackTitle}
            </span>
          </div>

          {/* Situation card */}
          <div style={{
            background: `linear-gradient(135deg, ${C.blueLight}, #F5F3FF)`,
            border: `1.5px solid ${C.blue}40`,
            borderRadius: 14, padding: "0.85rem 1rem",
            marginBottom: "0.65rem", minHeight: 72,
          }}>
            <div style={{ fontSize: "0.57rem", fontWeight: 700, color: C.blue, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>
              🎬 Tình huống
            </div>

            {sitLoading ? (
              <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                <Spin color={C.blue} />
                <span style={{ fontSize: "0.74rem", color: C.blue }}>Đang tạo tình huống…</span>
              </div>
            ) : situation ? (
              <>
                <div style={{ fontSize: "0.84rem", color: C.ink, lineHeight: 1.6, fontWeight: 500, marginBottom: situation.ja ? "0.35rem" : 0 }}>
                  {situation.vi}
                </div>
                {situation.ja && (
                  <div style={{ fontSize: "0.72rem", color: "#6D28D9", lineHeight: 1.55, display: "flex", gap: "0.35rem", alignItems: "flex-start" }}>
                    <span style={{ background: "#FFF0F0", color: "#C0392B", fontSize: "0.52rem", fontWeight: 700, padding: "0.05rem 0.3rem", borderRadius: 4, flexShrink: 0, marginTop: "0.12rem" }}>日本語</span>
                    {situation.ja}
                  </div>
                )}
              </>
            ) : null}
          </div>

          {/* Hint toggle */}
          <div style={{ marginBottom: "0.6rem" }}>
            <button onClick={() => setShowHint(h => !h)} style={{
              background: "transparent",
              border: `1px dashed ${showHint ? C.blue : C.border}`,
              color: showHint ? C.blue : C.gray,
              borderRadius: 8, padding: "0.22rem 0.65rem",
              fontSize: "0.63rem", cursor: "pointer",
              fontFamily: "inherit", fontWeight: showHint ? 700 : 400,
              transition: "all 0.13s",
            }}>
              {showHint ? "▲ Ẩn gợi ý" : "💡 Gợi ý công thức"}
            </button>

            {showHint && (
              <div style={{ marginTop: "0.4rem", background: C.goldL, border: `1px solid ${C.gold}55`, borderRadius: 9, padding: "0.5rem 0.75rem", animation: "fadeUp 0.15s ease" }}>
                <div style={{ fontSize: "0.6rem", fontWeight: 700, color: C.gold, marginBottom: "0.28rem" }}>
                  {currentItem.heading}
                </div>
                <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                  {currentItem.phrases.map((p, i) => (
                    <li key={i} style={{ fontSize: "0.72rem", color: C.ink, fontStyle: "italic", lineHeight: 1.7 }}>{p}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ── Input (before grading) ── */}
          {!gradeResult && (
            <div>
              <textarea
                key={`${currentItem.trackId}-${currentItem.noteIdx}`}
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey && !gradeLoading && !sitLoading) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Viết câu tiếng Pháp của bạn… (Enter để nộp)"
                rows={3}
                autoFocus
                disabled={sitLoading || gradeLoading}
                style={{
                  width: "100%", padding: "0.5rem 0.65rem",
                  border: `1.5px solid ${C.blue}50`,
                  borderRadius: 10, fontFamily: "inherit",
                  fontSize: "0.83rem", resize: "none",
                  outline: "none", color: C.ink,
                  boxSizing: "border-box", lineHeight: 1.55,
                  background: sitLoading ? "#F9FAFB" : "#fff",
                  transition: "border-color 0.15s",
                }}
              />
              <button
                onClick={handleSubmit}
                disabled={!userAnswer.trim() || sitLoading || gradeLoading}
                style={{
                  marginTop: "0.42rem",
                  width: "100%", padding: "0.52rem",
                  background: userAnswer.trim() && !sitLoading && !gradeLoading
                    ? `linear-gradient(135deg, #5B21B6, ${PURPLE})`
                    : "#D1D5DB",
                  color: "#fff", border: "none", borderRadius: 10,
                  fontSize: "0.77rem", fontWeight: 700,
                  cursor: userAnswer.trim() && !sitLoading ? "pointer" : "default",
                  fontFamily: "inherit", transition: "background 0.15s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                }}>
                {gradeLoading ? <><Spin color="#fff" /> Đang chấm…</> : "Nộp bài ✦"}
              </button>
            </div>
          )}

          {/* ── Grade result ── */}
          {gradeResult && (() => {
            const cfg = SCORE[gradeResult.score] || SCORE.wrong;
            return (
              <div style={{ animation: "fadeUp 0.25s ease" }}>
                {/* Score card */}
                <div style={{
                  background: cfg.bg, border: `1.5px solid ${cfg.border}`,
                  borderRadius: 13, padding: "0.75rem 0.9rem",
                  marginBottom: "0.55rem",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                    <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>{cfg.emoji}</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: cfg.color }}>{cfg.label}</span>
                  </div>

                  <div style={{ fontSize: "0.73rem", color: "#374151", lineHeight: 1.6, marginBottom: gradeResult.correction ? "0.4rem" : 0 }}>
                    {gradeResult.feedback}
                  </div>

                  {gradeResult.correction && (
                    <div style={{
                      padding: "0.4rem 0.6rem",
                      background: "rgba(255,255,255,0.75)",
                      borderRadius: 8,
                      borderLeft: `3px solid ${cfg.color}`,
                      marginBottom: gradeResult.tip ? "0.3rem" : 0,
                    }}>
                      <div style={{ fontSize: "0.57rem", fontWeight: 700, color: C.gray, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.15rem" }}>
                        Câu đúng hơn
                      </div>
                      <div style={{ fontSize: "0.79rem", color: cfg.color, fontStyle: "italic", fontWeight: 600 }}>
                        {gradeResult.correction}
                      </div>
                    </div>
                  )}

                  {gradeResult.tip && gradeResult.tip !== "null" && (
                    <div style={{ fontSize: "0.68rem", color: PURPLE, fontStyle: "italic", marginTop: "0.3rem" }}>
                      📌 {gradeResult.tip}
                    </div>
                  )}

                  <div style={{ marginTop: "0.3rem", fontSize: "0.62rem", color: "#9CA3AF" }}>
                    Bạn viết: «{userAnswer}»
                  </div>
                </div>

                {/* Buttons */}
                <div style={{ display: "flex", gap: "0.45rem" }}>
                  <button onClick={() => { setUserAnswer(""); setGradeResult(null); }} style={{
                    flex: 1, padding: "0.48rem",
                    background: "transparent",
                    border: `1.5px solid ${C.border}`,
                    color: C.gray, borderRadius: 10,
                    fontSize: "0.71rem", fontWeight: 600,
                    cursor: "pointer", fontFamily: "inherit",
                  }}>
                    ↩ Thử lại
                  </button>
                  <button onClick={handleNext} style={{
                    flex: 2, padding: "0.48rem",
                    background: `linear-gradient(135deg, #5B21B6, ${PURPLE})`,
                    color: "#fff", border: "none", borderRadius: 10,
                    fontSize: "0.71rem", fontWeight: 700,
                    cursor: "pointer", fontFamily: "inherit",
                    boxShadow: `0 2px 10px ${PURPLE}33`,
                  }}>
                    Câu tiếp theo →
                  </button>
                </div>
              </div>
            );
          })()}

        </div>
      )}

      <style>{`@keyframes pourSpin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
