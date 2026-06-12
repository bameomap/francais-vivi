/**
 * EditoAudioPanel.jsx
 * Nghe theo sách Édito A1 — câu hỏi tương tác, AI chấm, chép chính tả, script.
 */

import { useState, useEffect } from "react";
import { C } from "../constants.js";
import { EDITO_AUDIO } from "../data/editoAudio.js";
import { EDITO_VOCAB_UNITS } from "../data/editoVocab.js";
import { EDITO_POUR_NOTES } from "../data/editoAudioNotes.js";
import AccentBar from "./ui/AccentBar.jsx";

const EDITO_UNITS = EDITO_VOCAB_UNITS.map(u => ({ id: u.id, num: u.num, title: u.title }));

// ── Question group styles ──────────────────────────────────────────
// Đọc C động (function thay vì const) để màu đổi theo theme/dark mode.
// Thống nhất một hue chủ đạo: chỉ phần khởi động (Entrée) dùng gold nhẹ để phân giai đoạn.
const Q_STYLE_FN = (label) => ({
  "Entrée en matière": { bg: C.goldL, border: C.gold, chip: C.gold, icon: "🔍" },
  "1ère écoute":       { bg: C.blueL, border: C.blue, chip: C.blue, icon: "👂" },
  "2e écoute":         { bg: C.blueL, border: C.blueDark, chip: C.blueDark, icon: "👂👂" },
}[label]);

// ── Parse "Q1 / Q2 / Q3" → ["Q1","Q2","Q3"] ──────────────────────
function parseSubQ(text) {
  return text.split(" / ").map(s => s.trim()).filter(Boolean);
}

// ── Strip "Speaker : " prefix from dictée sentences ──────────────
// "Lars : Bonjour…"  →  "Bonjour…"
// "La mère : Merci" →  "Merci"
function stripSpeaker(s) {
  return s.replace(/^[^:]+:\s+/, "").trim();
}

// ── Normalise a word for lenient comparison ───────────────────────
// • lowercase  • remove accents  • ligatures oe/ae  • strip punctuation
function normWord(w) {
  return w
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")   // accents
    .replace(/œ/g, "oe").replace(/æ/g, "ae")            // ligatures
    .replace(/[''ʼ]/g, "'")                              // apostrophe variants → '
    .replace(/[^a-z0-9']/g, "")                         // strip all punctuation
    .trim();
}

// ── LCS-based word diff (position-independent) ────────────────────
// Strips speaker label then aligns expected vs typed using LCS so
// one missing/extra word doesn't cascade wrong marks across the line.
function diffWords(expected, typed) {
  const exp     = stripSpeaker(expected);
  const eWords  = exp.trim().split(/\s+/).filter(Boolean);
  const tWords  = (typed || "").trim().split(/\s+/).filter(Boolean);

  if (eWords.length === 0) return [];
  if (tWords.length === 0) return eWords.map(w => ({ word: w, ok: false, typed: "" }));

  const ne = eWords.map(normWord);
  const nt = tWords.map(normWord);
  const n  = ne.length, m = nt.length;

  // Build LCS table
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++)
    for (let j = 1; j <= m; j++)
      dp[i][j] = ne[i-1] === nt[j-1]
        ? dp[i-1][j-1] + 1
        : Math.max(dp[i-1][j], dp[i][j-1]);

  // Backtrack to align
  const result = [];
  let i = n, j = m;
  while (i > 0) {
    if (j > 0 && ne[i-1] === nt[j-1]) {
      result.unshift({ word: eWords[i-1], ok: true,  typed: tWords[j-1] });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j-1] >= dp[i-1][j])) {
      j--;          // extra typed word — skip silently
    } else {
      result.unshift({ word: eWords[i-1], ok: false, typed: "" });
      i--;
    }
  }
  return result;
}

// ── Call /api/proxy to grade an answer ───────────────────────────
async function gradeAnswer(question, userAnswer, sentences) {
  const script = sentences.join(" ");
  const res = await fetch("/api/proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      max_tokens: 300,
      messages: [{
        role: "user",
        content:
`Bạn là giáo viên tiếng Pháp chấm bài nghe hiểu A1 cho học sinh Việt Nam học tiếng Pháp.

Script bài nghe: "${script}"

Câu hỏi: "${question}"
Câu trả lời của học sinh: "${userAnswer}"

Quy tắc chấm:
- Cho phép lỗi chính tả nhỏ, thiếu dấu tiếng Pháp
- Nghiêm với sai thông tin thực tế (tên, số, địa danh)
- Với "Vrai ou faux": chấp nhận V/F/Vrai/Faux/Đúng/Sai

Trả về JSON thuần (không markdown, không giải thích):
{"correct":true,"feedback":"nhận xét ngắn bằng tiếng Việt","hint":""}
hoặc:
{"correct":false,"feedback":"giải thích ngắn bằng tiếng Việt","hint":"gợi ý đáp án đúng bằng tiếng Pháp"}`,
      }],
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  const raw = data.content?.[0]?.text || "{}";
  const match = raw.match(/\{[\s\S]*?\}/);
  return JSON.parse(match ? match[0] : "{}");
}

// ═══════════════════════════════════════════════════════════════════
export default function EditoAudioPanel() {
  const [selectedUnit, setSelectedUnit] = useState(null);

  // Deep-link from Parcours "Nghe" step: open the current unit directly.
  // Read in an effect (not a useState initializer) so the localStorage
  // read+remove stays StrictMode-safe.
  useEffect(() => {
    const idx = localStorage.getItem("parcours_unit_idx");
    if (idx !== null) {
      const u = EDITO_UNITS[Number(idx)];
      if (u) setSelectedUnit(u.id);
      localStorage.removeItem("parcours_unit_idx");
    }
  }, []);
  // mode per track: null | "questions" | "script" | "dictee"
  const [panelMode, setPanelMode]       = useState({});
  // Q answers: { "tid|gi|qi": string }
  const [answers, setAnswers]           = useState({});
  // Q grades:  { "tid|gi|qi": { loading, correct, feedback, hint } }
  const [grades, setGrades]             = useState({});
  // Dictée state: { [tid]: { current:number, typed:{[i]:str}, results:{[i]:{ok,diff}} } }
  const [dictee, setDictee]             = useState({});
  // Note expansions: { [tid|ni]: { loading, content } }
  const [noteExpansions, setNoteExpansions] = useState({});

  const tracks   = selectedUnit ? (EDITO_AUDIO[selectedUnit] || []) : [];
  const unitData = EDITO_UNITS.find(u => u.id === selectedUnit);

  // ── Unit toggle ────────────────────────────────────────────────
  const toggleUnit = uid => {
    setSelectedUnit(prev => prev === uid ? null : uid);
    setPanelMode({});
  };

  // ── Panel mode toggle ──────────────────────────────────────────
  const togglePanel = (tid, mode) => {
    setPanelMode(prev => ({ ...prev, [tid]: prev[tid] === mode ? null : mode }));
  };

  const openDictee = tid => {
    setDictee(prev => ({ ...prev, [tid]: { current: 0, typed: {}, results: {} } }));
    setPanelMode(prev => ({ ...prev, [tid]: prev[tid] === "dictee" ? null : "dictee" }));
  };

  // ── AI grade ──────────────────────────────────────────────────
  const handleGrade = async (tid, gi, qi, question, sentences) => {
    const key = `${tid}|${gi}|${qi}`;
    const answer = (answers[key] || "").trim();
    if (!answer) return;
    setGrades(prev => ({ ...prev, [key]: { loading: true } }));
    try {
      const r = await gradeAnswer(question, answer, sentences);
      setGrades(prev => ({ ...prev, [key]: { loading: false, ...r } }));
    } catch (e) {
      setGrades(prev => ({ ...prev, [key]: { loading: false, correct: null, feedback: "Lỗi kết nối AI. Thử lại nhé! 😢", hint: "" } }));
    }
  };

  const resetGrade = (tid, gi, qi) => {
    const key = `${tid}|${gi}|${qi}`;
    setGrades(prev => { const n = { ...prev }; delete n[key]; return n; });
    setAnswers(prev => { const n = { ...prev }; delete n[key]; return n; });
  };

  // ── Dictée helpers ────────────────────────────────────────────
  const dicteeSetTyped = (tid, i, val) =>
    setDictee(prev => {
      const s = prev[tid] || { current: 0, typed: {}, results: {} };
      return { ...prev, [tid]: { ...s, typed: { ...s.typed, [i]: val } } };
    });

  const dicteeSubmit = (tid, sentences) =>
    setDictee(prev => {
      const s = prev[tid];
      const i = s.current;
      const diff = diffWords(sentences[i], s.typed[i] || "");
      return { ...prev, [tid]: { ...s, results: { ...s.results, [i]: { ok: diff.every(w => w.ok), diff } } } };
    });

  const dicteeNext = (tid, total) =>
    setDictee(prev => {
      const s = prev[tid];
      return { ...prev, [tid]: { ...s, current: Math.min(s.current + 1, total - 1) } };
    });

  const dicteeReset = tid =>
    setDictee(prev => ({ ...prev, [tid]: { current: 0, typed: {}, results: {} } }));

  // ── AI expand Pour note ───────────────────────────────────────
  const NOTE_CACHE_KEY = "pour_note_expansions_v2";
  const getNoteCache = () => { try { return JSON.parse(localStorage.getItem(NOTE_CACHE_KEY) || "{}"); } catch { return {}; } };
  const setNoteCache = (key, content) => { try { const c = getNoteCache(); c[key] = content; localStorage.setItem(NOTE_CACHE_KEY, JSON.stringify(c)); } catch {} };

  const handleExpandNote = async (tid, ni, heading, phrases) => {
    const key = `${tid}|${ni}`;
    // Return cached result instantly if available
    const cached = getNoteCache()[key];
    if (cached) { setNoteExpansions(prev => ({ ...prev, [key]: { loading: false, content: cached } })); return; }
    setNoteExpansions(prev => ({ ...prev, [key]: { loading: true } }));
    try {
      const res = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          max_tokens: 400,
          messages: [{ role: "user", content:
`Bạn là giáo viên tiếng Pháp A1, dạy cho học sinh Việt Nam.
Giải thích công thức giao tiếp: "${heading}"
Công thức trong bài: ${phrases.join(" / ")}

Trả về JSON thuần (không markdown):
{"vi":"Dùng khi nào, hoàn cảnh nào — giải thích rõ bằng tiếng Việt (2-3 câu)","examples":[{"fr":"câu ví dụ 1 hoàn chỉnh tiếng Pháp","vi":"dịch tiếng Việt tự nhiên"},{"fr":"câu ví dụ 2","vi":"dịch 2"},{"fr":"câu ví dụ 3 (tình huống khác)","vi":"dịch 3"}],"tip":"ghi chú ngữ pháp ngắn quan trọng hoặc null"}` }],
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const raw = data.content?.[0]?.text || "{}";
      const match = raw.match(/\{[\s\S]*\}/);
      const content = JSON.parse(match ? match[0] : "{}");
      setNoteCache(key, content);
      setNoteExpansions(prev => ({ ...prev, [key]: { loading: false, content } }));
    } catch {
      setNoteExpansions(prev => ({ ...prev, [key]: { loading: false, content: { vi: "Lỗi kết nối AI. Thử lại nhé! 😢" } } }));
    }
  };

  // Load cached expansions on mount
  useEffect(() => {
    const cached = getNoteCache();
    if (Object.keys(cached).length > 0) {
      setNoteExpansions(Object.fromEntries(
        Object.entries(cached).map(([k, content]) => [k, { loading: false, content }])
      ));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Render ────────────────────────────────────────────────────
  return (
    <div>

      {/* ── Unit picker ── */}
      <div style={{ padding: "0.65rem 1rem 0.5rem", borderBottom: `1px solid ${C.borderSoft || C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
          <span style={{ fontSize: "0.62rem", fontWeight: 700, color: C.gray, letterSpacing: "0.1em", textTransform: "uppercase", flexShrink: 0 }}>
            Unit Édito
          </span>
          {selectedUnit && (
            <button onClick={() => toggleUnit(null)}
              style={{ padding: "0.1rem 0.5rem", background: "transparent", border: `1px solid ${C.border}`, color: C.gray, borderRadius: 20, fontSize: "0.62rem", cursor: "pointer" }}>
              ✕ Bỏ chọn
            </button>
          )}
        </div>
        <div style={{ display: "flex", gap: "0.3rem", overflowX: "auto", scrollbarWidth: "none", paddingBottom: 2 }}>
          {EDITO_UNITS.map(u => {
            const active = selectedUnit === u.id;
            return (
              <button key={u.id} onClick={() => toggleUnit(u.id)} style={{
                flexShrink: 0, padding: "0.28rem 0.65rem",
                background: active ? C.blue : C.cream,
                border: `1.5px solid ${active ? C.blue : C.border}`,
                color: active ? "#fff" : C.ink,
                borderRadius: 20, fontSize: "0.68rem", cursor: "pointer",
                fontFamily: "inherit", fontWeight: active ? 700 : 400,
                whiteSpace: "nowrap", transition: "all 0.15s",
              }}>
                U{u.num}
              </button>
            );
          })}
        </div>
        {selectedUnit && unitData && (
          <div style={{ marginTop: 4, fontSize: "0.7rem", color: C.blue, fontWeight: 600 }}>
            {unitData.title} · {tracks.length} bài nghe
          </div>
        )}
      </div>

      {/* ── Empty state ── */}
      {!selectedUnit && (
        <div style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "2.2rem", marginBottom: "0.75rem" }}>📚</div>
          <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1rem", color: C.ink, fontWeight: 700, marginBottom: "0.4rem" }}>
            Chọn một Unit Édito
          </div>
          <div style={{ fontSize: "0.78rem", color: C.gray, lineHeight: 1.65 }}>
            Bấm vào unit để xem bài nghe, câu hỏi<br />
            và luyện chép chính tả từ sách.
          </div>
        </div>
      )}

      {/* ── Track cards ── */}
      {selectedUnit && (
        <div style={{ padding: "0.75rem 0.85rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {tracks.map(rawTrack => {
            // Thống nhất màu card theo theme — bỏ màu riêng lẻ của từng track
            const track = { ...rawTrack, color: C.blue, colorLight: C.blueL };
            const mode  = panelMode[track.id] || null;
            const ds    = dictee[track.id];
            const total = track.sentences.length;

            return (
              <div key={track.id} style={{
                borderRadius: 14, overflow: "hidden",
                border: `1.5px solid ${track.color}30`,
                background: C.white,
                boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
              }}>

                {/* ── Header ── */}
                <div style={{
                  background: `linear-gradient(135deg, ${track.color} 0%, ${track.color}bb 100%)`,
                  padding: "0.7rem 0.9rem",
                  display: "flex", alignItems: "center", gap: "0.6rem",
                }}>
                  <span style={{ fontSize: "1.5rem", lineHeight: 1, flexShrink: 0 }}>{track.theme}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.18rem", flexWrap: "wrap" }}>
                      <span style={{ background: "rgba(255,255,255,0.25)", color: "#fff", fontSize: "0.6rem", fontWeight: 700, padding: "0.1rem 0.45rem", borderRadius: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Section {track.section}
                      </span>
                      <span style={{ background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: "0.6rem", padding: "0.1rem 0.45rem", borderRadius: 10 }}>
                        Piste {track.trackNum} · trang {track.page}
                      </span>
                    </div>
                    <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "0.9rem", color: "#fff", fontWeight: 700, lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {track.title}
                    </div>
                    <div style={{ fontSize: "0.63rem", color: "rgba(255,255,255,0.78)", marginTop: 2, lineHeight: 1.3 }}>
                      {track.subtitle}
                    </div>
                  </div>
                </div>

                {/* ── Audio player ── */}
                <div style={{ padding: "0.55rem 0.9rem 0.45rem", background: `${track.color}0d` }}>
                  <audio controls src={track.audioSrc} preload="none"
                    style={{ width: "100%", height: 34, accentColor: track.color }} />
                </div>

                {/* ── Action buttons ── */}
                {(() => {
                  const hasNotes = !!EDITO_POUR_NOTES[track.id];
                  const btns = [
                    { id: "questions", icon: "📋", label: "Câu hỏi", action: () => togglePanel(track.id, "questions") },
                    { id: "script",    icon: "📖", label: "Script",  action: () => togglePanel(track.id, "script") },
                    { id: "dictee",    icon: "✏️",  label: "Chép",   action: () => openDictee(track.id) },
                    // Luôn hiện nút Note để bố cục các card đồng nhất; mờ đi khi bài không có ghi chú
                    { id: "notes", icon: "📝", label: "Note", disabled: !hasNotes, action: () => hasNotes && togglePanel(track.id, "notes") },
                  ];
                  return (
                    <div style={{ display: "flex", gap: 0, borderTop: `1px solid ${C.border}`, borderBottom: mode ? `1px solid ${C.border}` : "none" }}>
                      {btns.map((btn, bi) => (
                        <button key={btn.id} onClick={btn.action} disabled={btn.disabled}
                          title={btn.disabled ? "Bài này không có ghi chú" : undefined}
                          style={{
                            flex: 1, padding: "0.45rem 0.2rem",
                            background: mode === btn.id ? `${track.color}1a` : "transparent",
                            border: "none",
                            borderRight: bi < btns.length - 1 ? `1px solid ${C.border}` : "none",
                            color: mode === btn.id ? track.color : C.gray,
                            fontSize: "0.68rem", fontWeight: mode === btn.id ? 700 : 500,
                            cursor: btn.disabled ? "default" : "pointer", fontFamily: "inherit",
                            opacity: btn.disabled ? 0.35 : 1,
                            transition: "all 0.13s",
                          }}>
                          {btn.icon} {btn.label}
                        </button>
                      ))}
                    </div>
                  );
                })()}

                {/* ══ PANEL: Questions ══════════════════════════════ */}
                {mode === "questions" && (
                  <div style={{ padding: "0.7rem 0.85rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {track.questions.map((qGroup, gIdx) => {
                      const subQs = parseSubQ(qGroup.text);
                      const qs    = Q_STYLE_FN(qGroup.label) || Q_STYLE_FN("1ère écoute");
                      // "Entrée en matière" = câu khởi động (thường tham chiếu ảnh sách,
                      // hỏi mở) → hiển thị để suy nghĩ/nói trước khi nghe, KHÔNG chấm AI.
                      const isWarmup = qGroup.label === "Entrée en matière";
                      return (
                        <div key={gIdx} style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${qs.border}25` }}>
                          {/* Group header */}
                          <div style={{ background: qs.border, color: "#fff", padding: "0.3rem 0.75rem", fontSize: "0.63rem", fontWeight: 700, letterSpacing: "0.04em" }}>
                            {qs.icon} {qGroup.label}
                          </div>
                          {/* Sub-questions */}
                          <div style={{ background: `${qs.border}14` }}>
                            {subQs.map((q, qIdx) => {
                              const key   = `${track.id}|${gIdx}|${qIdx}`;
                              const grade = grades[key];
                              const ans   = answers[key] || "";
                              const graded = grade && !grade.loading && grade.correct !== undefined;

                              return (
                                <div key={qIdx} style={{
                                  padding: "0.6rem 0.75rem",
                                  borderTop: qIdx > 0 ? `1px solid ${qs.border}15` : "none",
                                }}>
                                  {/* Question text */}
                                  <div style={{ fontSize: "0.74rem", color: C.ink, lineHeight: 1.55, marginBottom: isWarmup ? 0 : "0.42rem", fontStyle: "italic" }}>
                                    {q}
                                  </div>

                                  {/* Warm-up prompt — no grading */}
                                  {isWarmup && (
                                    <div style={{ fontSize: "0.64rem", color: qs.chip, marginTop: "0.3rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                                      💭 Suy nghĩ / nói thử trước khi nghe — không cần chấm
                                    </div>
                                  )}

                                  {/* Input row — show if not yet graded */}
                                  {!isWarmup && !graded && (
                                    <div style={{ display: "flex", gap: "0.35rem", alignItems: "flex-end" }}>
                                      <textarea
                                        value={ans}
                                        onChange={e => setAnswers(prev => ({ ...prev, [key]: e.target.value }))}
                                        onKeyDown={e => {
                                          if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleGrade(track.id, gIdx, qIdx, q, track.sentences);
                                          }
                                        }}
                                        placeholder="Câu trả lời của bạn… (Enter để chấm)"
                                        rows={2}
                                        style={{
                                          flex: 1, padding: "0.38rem 0.5rem",
                                          fontSize: "0.73rem",
                                          border: `1.5px solid ${qs.border}40`,
                                          borderRadius: 7, fontFamily: "inherit",
                                          resize: "none", outline: "none",
                                          background: "#fff", color: C.ink,
                                          lineHeight: 1.45,
                                        }}
                                      />
                                      <button
                                        onClick={() => handleGrade(track.id, gIdx, qIdx, q, track.sentences)}
                                        disabled={!ans.trim() || grade?.loading}
                                        style={{
                                          padding: "0.38rem 0.65rem",
                                          background: ans.trim() && !grade?.loading ? qs.border : "#D1D5DB",
                                          color: "#fff", border: "none",
                                          borderRadius: 7, fontSize: "0.67rem",
                                          fontWeight: 700, cursor: ans.trim() ? "pointer" : "default",
                                          fontFamily: "inherit", minWidth: 52,
                                          transition: "background 0.15s",
                                        }}
                                      >
                                        {grade?.loading ? "⏳" : "Chấm ✦"}
                                      </button>
                                    </div>
                                  )}
                                  {!isWarmup && !graded && <div style={{ marginTop: "0.45rem" }}><AccentBar compact /></div>}

                                  {/* Grade result */}
                                  {!isWarmup && graded && (
                                    <div style={{
                                      background: grade.correct ? C.greenL : C.redL,
                                      border: `1px solid ${grade.correct ? C.green : C.red}`,
                                      borderRadius: 8, padding: "0.5rem 0.65rem",
                                    }}>
                                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.25rem" }}>
                                        <span style={{ fontSize: "1.05rem" }}>{grade.correct ? "✅" : "❌"}</span>
                                        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: grade.correct ? C.green : C.red, flex: 1 }}>
                                          {grade.correct ? "Đúng rồi!" : "Chưa đúng"}
                                        </span>
                                        <button onClick={() => resetGrade(track.id, gIdx, qIdx)}
                                          style={{ background: "transparent", border: "none", fontSize: "0.62rem", color: C.gray, cursor: "pointer", padding: "0.1rem 0.3rem" }}>
                                          ↩ Thử lại
                                        </button>
                                      </div>
                                      {grade.feedback && (
                                        <div style={{ fontSize: "0.71rem", color: C.ink, lineHeight: 1.5 }}>
                                          {grade.feedback}
                                        </div>
                                      )}
                                      {grade.hint && (
                                        <div style={{ marginTop: "0.2rem", fontSize: "0.68rem", color: "#7C3AED", fontStyle: "italic" }}>
                                          💡 {grade.hint}
                                        </div>
                                      )}
                                      <div style={{ marginTop: "0.25rem", fontSize: "0.63rem", color: "#9CA3AF" }}>
                                        Bạn trả lời: «{ans}»
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* ══ PANEL: Script ═════════════════════════════════ */}
                {mode === "script" && (
                  <div style={{ padding: "0.65rem 0.9rem" }}>
                    <div style={{ fontSize: "0.6rem", fontWeight: 700, color: C.gray, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
                      📖 Script — Piste {track.trackNum}
                    </div>
                    <ol style={{ margin: 0, paddingLeft: "1.25rem" }}>
                      {track.sentences.map((s, i) => (
                        <li key={i} style={{
                          fontSize: "0.78rem", color: C.ink, lineHeight: 1.75,
                          paddingLeft: "0.2rem",
                          borderBottom: i < track.sentences.length - 1 ? `1px dashed ${C.border}` : "none",
                          paddingBottom: "0.2rem", marginBottom: "0.15rem",
                        }}>
                          {s}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* ══ PANEL: Notes (Pour communiquer) ══════════════ */}
                {mode === "notes" && EDITO_POUR_NOTES[track.id] && (
                  <div style={{ padding: "0.7rem 0.85rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                    <div style={{ fontSize: "0.6rem", fontWeight: 700, color: C.gray, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      📝 Pour communiquer — Piste {track.trackNum}
                    </div>
                    {EDITO_POUR_NOTES[track.id].map((note, ni) => {
                      const expKey = `${track.id}|${ni}`;
                      const exp = noteExpansions[expKey];
                      return (
                        <div key={ni} style={{ borderRadius: 10, border: `1.5px solid ${track.color}30`, overflow: "hidden" }}>
                          {/* Heading row */}
                          <div style={{ background: track.color, color: "#fff", padding: "0.35rem 0.75rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
                            <span style={{ fontSize: "0.69rem", fontWeight: 700, lineHeight: 1.3 }}>{note.heading}</span>
                            <button
                              onClick={() => !exp?.loading && handleExpandNote(track.id, ni, note.heading, note.phrases)}
                              style={{ background: "rgba(255,255,255,0.22)", border: "none", color: "#fff", fontSize: "0.6rem", fontWeight: 700, padding: "0.12rem 0.55rem", borderRadius: 10, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", flexShrink: 0 }}>
                              {exp?.loading ? "⏳" : exp?.content ? "✓ VI" : "AI ✦"}
                            </button>
                          </div>
                          {/* Phrases */}
                          <div style={{ background: `${track.color}14`, padding: "0.5rem 0.75rem 0.55rem" }}>
                            {note.structure && (
                              <div style={{ fontSize: "0.66rem", color: track.color, background: `${track.color}1f`, borderRadius: 7, padding: "0.4rem 0.6rem", marginBottom: "0.5rem", lineHeight: 1.6 }}>
                                <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>🔑 Cấu trúc</div>
                                {note.structure.split(/(?<=\.)\s+(?=\S)/).map(s => s.replace(/\.$/, "").trim()).filter(Boolean).map((line, li) => (
                                  <div key={li} style={{ display: "flex", gap: "0.35rem", marginBottom: "0.15rem" }}>
                                    <span style={{ flexShrink: 0, opacity: 0.65 }}>•</span>
                                    <span>{line}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
                              {note.phrases.map((p, pi) => {
                                const fr = typeof p === "string" ? p : p.fr;
                                const vi = typeof p === "object" ? p.vi : null;
                                return (
                                  <li key={pi} style={{ fontSize: "0.74rem", color: C.ink, lineHeight: 1.5, marginBottom: vi ? "0.38rem" : "0.12rem" }}>
                                    <span style={{ fontStyle: "italic" }}>{fr}</span>
                                    {vi && (
                                      <span style={{ display: "block", fontStyle: "normal", color: C.gray, fontSize: "0.68rem", lineHeight: 1.45, marginTop: "0.05rem" }}>↳ {vi}</span>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          {/* AI expansion */}
                          {exp && !exp.loading && exp.content && (
                            <div style={{ background: C.cream, padding: "0.5rem 0.75rem", borderTop: `1px dashed ${track.color}30` }}>
                              {exp.content.vi && (
                                <div style={{ fontSize: "0.71rem", color: C.ink, lineHeight: 1.55, marginBottom: "0.25rem", display: "flex", gap: "0.4rem", alignItems: "flex-start" }}>
                                  <span style={{ background: C.blueL, color: "#2563EB", fontSize: "0.56rem", fontWeight: 700, padding: "0.1rem 0.35rem", borderRadius: 5, flexShrink: 0, marginTop: "0.15rem" }}>VI</span>
                                  <em>{exp.content.vi}</em>
                                </div>
                              )}
                              {exp.content.examples?.length > 0 && (
                                <div style={{ marginBottom: "0.2rem" }}>
                                  <div style={{ fontSize: "0.58rem", fontWeight: 700, color: C.gray, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3rem" }}>Thêm ví dụ</div>
                                  <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                                    {exp.content.examples.map((ex, ei) => {
                                      const fr = typeof ex === "string" ? ex : ex.fr;
                                      const vi = typeof ex === "object" ? ex.vi : null;
                                      return (
                                        <div key={ei} style={{ paddingLeft: "0.5rem", borderLeft: `2px solid ${track.color}50` }}>
                                          <div style={{ fontSize: "0.73rem", color: track.color, fontStyle: "italic", lineHeight: 1.6 }}>› {fr}</div>
                                          {vi && (
                                            <div style={{ fontSize: "0.67rem", color: C.gray, lineHeight: 1.5, marginTop: "0.1rem" }}>↳ {vi}</div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                              {exp.content.tip && exp.content.tip !== "null" && (
                                <div style={{ fontSize: "0.67rem", color: track.color, background: `${track.color}14`, borderRadius: 6, padding: "0.28rem 0.5rem", marginTop: "0.25rem" }}>
                                  📌 {exp.content.tip}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* ══ PANEL: Dictée ═════════════════════════════════ */}
                {mode === "dictee" && ds && (() => {
                  const idx     = ds.current;
                  const result  = ds.results[idx];
                  const typed   = ds.typed[idx] || "";
                  const doneCount = Object.keys(ds.results).length;
                  const allDone = doneCount === total;
                  const score   = Object.values(ds.results).filter(r => r.ok).length;

                  return (
                    <div style={{ padding: "0.65rem 0.9rem" }}>
                      {/* Header row */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.55rem" }}>
                        <span style={{ fontSize: "0.62rem", fontWeight: 700, color: C.gray, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                          ✏️ Chép chính tả
                        </span>
                        {!allDone && (
                          <span style={{ fontSize: "0.63rem", color: C.gray }}>
                            {idx + 1} / {total}
                          </span>
                        )}
                      </div>

                      {/* Progress bar */}
                      {!allDone && (
                        <div style={{ height: 3, background: "#E5E7EB", borderRadius: 2, marginBottom: "0.55rem", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${(doneCount / total) * 100}%`, background: track.color, transition: "width 0.3s" }} />
                        </div>
                      )}

                      {/* ── All done: summary ── */}
                      {allDone ? (
                        <div style={{ textAlign: "center", padding: "0.8rem 0 0.4rem" }}>
                          <div style={{ fontSize: "2.2rem", marginBottom: "0.35rem" }}>
                            {score === total ? "🎉" : score >= Math.ceil(total / 2) ? "👍" : "💪"}
                          </div>
                          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 700, color: C.ink }}>
                            {score} / {total} câu đúng
                          </div>
                          <div style={{ fontSize: "0.72rem", color: C.gray, marginTop: "0.25rem", marginBottom: "0.75rem" }}>
                            {score === total ? "Hoàn hảo! 🌟" : score >= Math.ceil(total / 2) ? "Khá tốt, tiếp tục cố gắng!" : "Hãy nghe lại và thử lần nữa!"}
                          </div>
                          <button onClick={() => dicteeReset(track.id)} style={{
                            padding: "0.42rem 1.2rem",
                            background: track.color, color: "#fff",
                            border: "none", borderRadius: 20,
                            fontSize: "0.72rem", fontWeight: 700,
                            cursor: "pointer", fontFamily: "inherit",
                          }}>
                            🔄 Làm lại từ đầu
                          </button>
                        </div>

                      ) : (
                        <>
                          {/* Speaker hint */}
                          {(() => {
                            const raw = track.sentences[idx] || "";
                            const m   = raw.match(/^([^:]+):\s+/);
                            const speaker = m ? m[1].trim() : null;
                            return (
                              <div style={{ fontSize: "0.68rem", color: C.gray, marginBottom: "0.4rem", display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                                <span>Chép lại câu {idx + 1}:</span>
                                {speaker && (
                                  <span style={{ background: `${track.color}1a`, color: track.color, borderRadius: 10, padding: "0.05rem 0.5rem", fontWeight: 700, fontSize: "0.65rem" }}>
                                    💬 {speaker}
                                  </span>
                                )}
                                <span style={{ color: "#9CA3AF", fontSize: "0.62rem" }}>(không cần gõ tên)</span>
                              </div>
                            );
                          })()}

                          {/* ── Input (not yet submitted) ── */}
                          {!result && (
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                              <textarea
                                key={`${track.id}-${idx}`}
                                value={typed}
                                onChange={e => dicteeSetTyped(track.id, idx, e.target.value)}
                                onKeyDown={e => {
                                  if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    dicteeSubmit(track.id, track.sentences);
                                  }
                                }}
                                placeholder="Chép câu bạn nghe được… (Enter để kiểm tra)"
                                rows={3}
                                autoFocus
                                style={{
                                  width: "100%", padding: "0.45rem 0.55rem",
                                  border: `1.5px solid ${track.color}50`,
                                  borderRadius: 8, fontFamily: "inherit",
                                  fontSize: "0.78rem", resize: "none",
                                  outline: "none", color: C.ink,
                                  boxSizing: "border-box", lineHeight: 1.5,
                                }}
                              />
                              <AccentBar compact />
                              <div style={{ display: "flex", gap: "0.4rem" }}>
                                <button
                                  onClick={() => dicteeSubmit(track.id, track.sentences)}
                                  disabled={!typed.trim()}
                                  style={{
                                    flex: 1, padding: "0.42rem",
                                    background: typed.trim() ? track.color : "#D1D5DB",
                                    color: "#fff", border: "none", borderRadius: 8,
                                    fontSize: "0.72rem", fontWeight: 700,
                                    cursor: typed.trim() ? "pointer" : "default",
                                    fontFamily: "inherit",
                                  }}
                                >
                                  Kiểm tra ↵
                                </button>
                                <button
                                  onClick={() => dicteeSubmit(track.id, track.sentences)}
                                  style={{
                                    padding: "0.42rem 0.75rem",
                                    background: "transparent",
                                    color: C.gray, border: `1px solid ${C.border}`,
                                    borderRadius: 8, fontSize: "0.68rem",
                                    cursor: "pointer", fontFamily: "inherit",
                                  }}
                                >
                                  Bỏ qua
                                </button>
                              </div>
                            </div>
                          )}

                          {/* ── Result + diff ── */}
                          {result && (
                            <div>
                              <div style={{
                                background: result.ok ? C.greenL : C.redL,
                                border: `1px solid ${result.ok ? C.green : C.red}`,
                                borderRadius: 8, padding: "0.55rem 0.7rem",
                                marginBottom: "0.4rem",
                              }}>
                                <div style={{ fontSize: "0.65rem", fontWeight: 700, color: result.ok ? C.green : C.red, marginBottom: "0.35rem" }}>
                                  {result.ok ? "✅ Chính xác!" : "❌ Có lỗi — chữ đỏ là chỗ sai:"}
                                </div>
                                {/* Word-by-word diff */}
                                <div style={{ fontSize: "0.8rem", lineHeight: 1.8 }}>
                                  {result.diff.map((w, wi) => (
                                    <span key={wi}>
                                      <span style={{
                                        background: w.ok ? "transparent" : "#FEE2E2",
                                        color: w.ok ? C.green : C.red,
                                        borderBottom: w.ok ? "none" : "2px solid #DC2626",
                                        padding: "0 1px",
                                        fontWeight: w.ok ? 400 : 700,
                                      }}>
                                        {w.word}
                                      </span>{wi < result.diff.length - 1 ? " " : ""}
                                    </span>
                                  ))}
                                </div>
                                {!result.ok && ds.typed[idx] && (
                                  <div style={{ marginTop: "0.25rem", fontSize: "0.63rem", color: "#9CA3AF" }}>
                                    Bạn chép: «{ds.typed[idx]}»
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() => {
                                  if (idx < total - 1) dicteeNext(track.id, total);
                                  else dicteeNext(track.id, total); // triggers allDone
                                }}
                                style={{
                                  width: "100%", padding: "0.43rem",
                                  background: track.color, color: "#fff",
                                  border: "none", borderRadius: 8,
                                  fontSize: "0.72rem", fontWeight: 700,
                                  cursor: "pointer", fontFamily: "inherit",
                                }}
                              >
                                {idx < total - 1 ? "Câu tiếp theo →" : "Xem kết quả 🎉"}
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })()}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
