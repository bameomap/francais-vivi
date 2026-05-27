import { useState, useRef } from "react";
import { C } from "../constants.js";
import { EDITO_A1_PHONO } from "../data/editoPhono.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import { speak } from "../utils/helpers.js";

/* ── helpers ──────────────────────────────────────────────── */
function Badge({ text, bg = "#E8F0FE", color = "#3B5BDB" }) {
  return (
    <span style={{
      display: "inline-block", padding: "0.15rem 0.45rem",
      background: bg, color, borderRadius: 20,
      fontSize: "0.68rem", fontWeight: 600, fontFamily: "monospace",
    }}>{text}</span>
  );
}

function Tag({ text }) {
  return (
    <span style={{
      display: "inline-block", padding: "0.1rem 0.4rem",
      background: "#F3F4F6", color: "#6B7280", borderRadius: 12,
      fontSize: "0.66rem", fontFamily: "monospace",
    }}>{text}</span>
  );
}

/* ── UNIT LIST ────────────────────────────────────────────── */
function UnitList({ onSelect }) {
  return (
    <div style={{ padding: "1rem" }}>
      <p style={{ fontSize: "0.78rem", color: C.gray, marginBottom: "0.8rem" }}>
        Chọn bài để luyện phát âm theo từng đơn vị Édito A1.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
        {EDITO_A1_PHONO.map(unit => (
          <button
            key={unit.unitId}
            onClick={() => onSelect(unit)}
            style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              padding: "0.7rem 0.9rem",
              background: unit.bg,
              border: `1.5px solid ${unit.color}30`,
              borderRadius: 12, cursor: "pointer",
              textAlign: "left", width: "100%",
              transition: "box-shadow 0.15s",
            }}
          >
            {/* unit badge */}
            <span style={{
              minWidth: 32, height: 32, borderRadius: 8,
              background: unit.color, color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: "0.75rem", flexShrink: 0,
            }}>
              {unit.unitNum}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: "0.8rem", color: "#1F2937" }}>
                Unité {unit.unitNum} · {unit.title}
              </div>
              <div style={{ fontSize: "0.72rem", color: unit.color, fontWeight: 500, marginTop: 2 }}>
                🎵 {unit.topic}
              </div>
              <div style={{ fontSize: "0.67rem", color: C.gray, marginTop: 1 }}>
                {unit.topicVi}
              </div>
            </div>
            <span style={{ color: unit.color, fontSize: "0.8rem", flexShrink: 0 }}>›</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── SOUND CARD ───────────────────────────────────────────── */
function SoundCard({ sound, unitColor, unitBg }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{
      border: `1.5px solid ${unitColor}30`,
      borderRadius: 12, overflow: "hidden",
      marginBottom: "0.6rem",
    }}>
      {/* header */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          gap: "0.6rem", padding: "0.6rem 0.8rem",
          background: unitBg, border: "none", cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{
          fontSize: "1.2rem", fontWeight: 800, fontFamily: "monospace",
          color: unitColor, minWidth: 40,
        }}>{sound.phoneme}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: "0.8rem", color: "#1F2937" }}>
            {sound.label}
          </div>
          <div style={{ fontSize: "0.7rem", color: "#6B7280", marginTop: 1 }}>
            {sound.description}
          </div>
        </div>
        <span style={{ color: C.gray, fontSize: "0.75rem" }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={{ padding: "0.7rem 0.9rem", background: "#fff" }}>
          {/* Vietnamese tip */}
          <p style={{
            fontSize: "0.74rem", color: "#374151", lineHeight: 1.5,
            background: `${unitColor}10`, borderLeft: `3px solid ${unitColor}`,
            padding: "0.4rem 0.6rem", borderRadius: "0 6px 6px 0",
            marginBottom: "0.6rem",
          }}>
            💡 {sound.descVi}
          </p>

          {/* graphemes */}
          <div style={{ marginBottom: "0.55rem" }}>
            <span style={{ fontSize: "0.68rem", color: C.gray, marginRight: 4 }}>Chữ viết:</span>
            {sound.graphemes.map((g, i) => (
              <span key={i} style={{ marginRight: 4 }}><Tag text={g} /></span>
            ))}
          </div>

          {/* examples */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
            gap: "0.35rem", marginBottom: "0.5rem",
          }}>
            {sound.examples.map((ex, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "0.3rem",
                background: "#F9FAFB", borderRadius: 8, padding: "0.3rem 0.5rem",
              }}>
                <SpeakBtn text={ex.word} size="0.78rem" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.78rem", color: "#111827" }}>
                    {ex.word}
                  </div>
                  <div style={{ fontSize: "0.65rem", color: "#9CA3AF" }}>{ex.vi}</div>
                </div>
              </div>
            ))}
          </div>

          {/* tip */}
          {sound.tip && (
            <p style={{
              fontSize: "0.7rem", color: "#6B7280", fontStyle: "italic",
              marginTop: "0.3rem", lineHeight: 1.5,
            }}>
              ⚡ {sound.tip}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ── MINIMAL PAIRS ────────────────────────────────────────── */
function MinimalPairs({ pairs, unitColor }) {
  if (!pairs || pairs.length === 0) return null;
  return (
    <div style={{ marginBottom: "1rem" }}>
      <h4 style={{
        fontSize: "0.78rem", fontWeight: 700, color: "#374151",
        marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: 6,
      }}>
        🔀 Cặp từ tối thiểu
      </h4>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        {pairs.map((p, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.5rem 0.7rem",
            background: "#F9FAFB", borderRadius: 10,
            border: "1px solid #E5E7EB",
          }}>
            {/* word A */}
            <div style={{
              flex: 1, background: `${unitColor}15`,
              borderRadius: 8, padding: "0.35rem 0.5rem",
              display: "flex", alignItems: "center", gap: "0.35rem",
            }}>
              <SpeakBtn text={p.a} size="0.75rem" />
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.8rem", color: unitColor }}>
                  {p.a}
                </div>
                <div style={{ fontSize: "0.63rem", color: "#6B7280" }}>{p.aVi}</div>
              </div>
            </div>

            {/* vs */}
            <span style={{ fontSize: "0.65rem", color: "#9CA3AF", flexShrink: 0 }}>↔</span>

            {/* word B */}
            <div style={{
              flex: 1, background: "#FFF3CD",
              borderRadius: 8, padding: "0.35rem 0.5rem",
              display: "flex", alignItems: "center", gap: "0.35rem",
            }}>
              <SpeakBtn text={p.b} size="0.75rem" />
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.8rem", color: "#B45309" }}>
                  {p.b}
                </div>
                <div style={{ fontSize: "0.63rem", color: "#6B7280" }}>{p.bVi}</div>
              </div>
            </div>

            {/* note */}
            <div style={{
              fontSize: "0.62rem", color: "#6B7280", flexShrink: 0,
              maxWidth: 56, textAlign: "center", lineHeight: 1.3,
            }}>{p.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── PRACTICE SENTENCES ───────────────────────────────────── */
function PracticeSection({ practice, unitColor }) {
  const [playing, setPlaying] = useState(false);
  const stopRef = useRef(false);

  async function playAll() {
    if (playing) { stopRef.current = true; return; }
    stopRef.current = false;
    setPlaying(true);
    for (const sentence of practice) {
      if (stopRef.current) break;
      await new Promise(res => speak(sentence, res));
      await new Promise(res => setTimeout(res, 400)); // small gap
    }
    setPlaying(false);
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <h4 style={{ fontSize: "0.78rem", fontWeight: 700, color: "#374151" }}>
          🗣️ Câu luyện tập
        </h4>
        <button
          onClick={playAll}
          style={{
            padding: "0.2rem 0.6rem",
            background: playing ? "#EF4444" : unitColor,
            color: "#fff", border: "none", borderRadius: 20,
            fontSize: "0.67rem", cursor: "pointer", fontFamily: "inherit",
          }}
        >
          {playing ? "⏹ Dừng" : "▶ Đọc tất cả"}
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        {practice.map((s, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            background: "#F9FAFB", borderRadius: 8, padding: "0.4rem 0.6rem",
            border: "1px solid #E5E7EB",
          }}>
            <SpeakBtn text={s} size="0.75rem" />
            <span style={{ fontSize: "0.79rem", color: "#1F2937", fontStyle: "italic" }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── LISTENING QUIZ ───────────────────────────────────────── */
function ListeningQuiz({ quiz, sounds, unitColor }) {
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(null); // null | "correct" | "wrong"
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [heard, setHeard] = useState(false);

  if (!quiz || quiz.length === 0) return null;

  const total = quiz.length;
  const current = quiz[idx];

  function hear() {
    speak(current.word, null);
    setHeard(true);
  }

  function choose(soundId) {
    if (answered) return;
    const correct = soundId === current.target;
    setAnswered(correct ? "correct" : "wrong");
    if (correct) setScore(s => s + 1);
    setTimeout(() => {
      if (idx + 1 >= total) {
        setDone(true);
      } else {
        setIdx(i => i + 1);
        setAnswered(null);
        setHeard(false);
      }
    }, 900);
  }

  function restart() {
    setIdx(0); setAnswered(null); setScore(0);
    setDone(false); setHeard(false);
  }

  return (
    <div style={{
      border: `2px solid ${unitColor}40`,
      borderRadius: 14, overflow: "hidden",
    }}>
      {/* header */}
      <div style={{
        background: `${unitColor}15`,
        padding: "0.5rem 0.8rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontWeight: 700, fontSize: "0.78rem", color: unitColor }}>
          🎧 Nghe & Phân biệt
        </span>
        {!done && (
          <span style={{ fontSize: "0.68rem", color: C.gray }}>
            {idx + 1}/{total} · ✅ {score}
          </span>
        )}
      </div>

      <div style={{ padding: "1rem" }}>
        {done ? (
          <div style={{ textAlign: "center", padding: "0.5rem 0" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.4rem" }}>
              {score >= total * 0.8 ? "🏆" : score >= total * 0.5 ? "👍" : "😅"}
            </div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1F2937", marginBottom: 4 }}>
              {score}/{total} đúng
            </div>
            <div style={{ fontSize: "0.72rem", color: C.gray, marginBottom: "0.8rem" }}>
              {score >= total * 0.8 ? "Tuyệt vời! Tai nghe rất tốt 👂" :
               score >= total * 0.5 ? "Khá tốt! Luyện thêm nhé." : "Thử lại — lắng nghe thật kỹ!"}
            </div>
            <button
              onClick={restart}
              style={{
                padding: "0.35rem 1rem",
                background: unitColor, color: "#fff",
                border: "none", borderRadius: 20,
                fontSize: "0.75rem", cursor: "pointer", fontFamily: "inherit",
              }}
            >
              🔄 Làm lại
            </button>
          </div>
        ) : (
          <>
            {/* listen button */}
            <div style={{ textAlign: "center", marginBottom: "0.9rem" }}>
              <button
                onClick={hear}
                style={{
                  padding: "0.6rem 1.4rem",
                  background: heard ? "#E5E7EB" : unitColor,
                  color: heard ? "#374151" : "#fff",
                  border: "none", borderRadius: 24,
                  fontSize: "1rem", cursor: "pointer",
                  fontFamily: "inherit", fontWeight: 600,
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  transition: "all 0.15s",
                }}
              >
                {heard ? "🔊" : "🔈"} {current.word}
              </button>
              {!heard && (
                <p style={{ fontSize: "0.68rem", color: C.gray, marginTop: 4 }}>
                  Nhấn để nghe phát âm
                </p>
              )}
            </div>

            {/* choice buttons */}
            <div style={{
              display: "grid",
              gridTemplateColumns: `repeat(${sounds.length}, 1fr)`,
              gap: "0.5rem",
            }}>
              {sounds.map(sound => {
                const isTarget = sound.id === current.target;
                const chosen = answered !== null;
                let bg = "#F3F4F6";
                let border = "1.5px solid #E5E7EB";
                let color = "#374151";
                if (chosen && isTarget) {
                  bg = "#D1FAE5"; border = "1.5px solid #10B981"; color = "#065F46";
                } else if (chosen && !isTarget && sound.id === current.target) {
                  bg = "#FEE2E2"; border = "1.5px solid #EF4444"; color = "#991B1B";
                }
                return (
                  <button
                    key={sound.id}
                    onClick={() => choose(sound.id)}
                    disabled={!!answered || !heard}
                    style={{
                      padding: "0.5rem",
                      background: !heard ? "#F9FAFB" : bg,
                      border, borderRadius: 10, cursor: heard && !answered ? "pointer" : "default",
                      color: !heard ? "#9CA3AF" : color,
                      fontFamily: "monospace", fontWeight: 700, fontSize: "0.9rem",
                      textAlign: "center", transition: "all 0.15s",
                      opacity: !heard ? 0.6 : 1,
                    }}
                  >
                    {sound.phoneme}
                    <div style={{ fontWeight: 400, fontSize: "0.62rem", fontFamily: "inherit", marginTop: 2 }}>
                      {sound.label.split("—")[0].trim()}
                    </div>
                  </button>
                );
              })}
            </div>

            {answered && (
              <div style={{
                marginTop: "0.6rem", textAlign: "center",
                fontSize: "0.78rem", fontWeight: 600,
                color: answered === "correct" ? "#059669" : "#DC2626",
              }}>
                {answered === "correct" ? "✅ Chính xác!" : `❌ Đáp án đúng: ${current.label}`}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ── UNIT DETAIL ──────────────────────────────────────────── */
function UnitDetail({ unit, onBack }) {
  return (
    <div>
      {/* top bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: "0.6rem",
        padding: "0.7rem 1rem",
        borderBottom: `1px solid ${C.border}`,
        background: unit.bg,
        position: "sticky", top: 0, zIndex: 5,
      }}>
        <button
          onClick={onBack}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: "0.9rem", color: unit.color, padding: "0.1rem 0.3rem",
          }}
        >←</button>
        <span style={{
          background: unit.color, color: "#fff",
          borderRadius: 6, padding: "0.1rem 0.45rem",
          fontWeight: 700, fontSize: "0.72rem",
        }}>
          U{unit.unitNum}
        </span>
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "#1F2937" }}>
            {unit.title}
          </div>
          <div style={{ fontSize: "0.7rem", color: unit.color }}>
            🎵 {unit.topic}
          </div>
        </div>
      </div>

      <div style={{ padding: "0.9rem 1rem" }}>
        {/* sounds */}
        <h4 style={{
          fontSize: "0.78rem", fontWeight: 700, color: "#374151",
          marginBottom: "0.55rem",
        }}>
          🔤 Âm mục tiêu
        </h4>
        {unit.sounds.map(sound => (
          <SoundCard
            key={sound.id}
            sound={sound}
            unitColor={unit.color}
            unitBg={unit.bg}
          />
        ))}

        {/* minimal pairs */}
        <MinimalPairs pairs={unit.pairs} unitColor={unit.color} />

        {/* practice */}
        <PracticeSection practice={unit.practice} unitColor={unit.color} />

        {/* quiz */}
        <ListeningQuiz
          quiz={unit.quiz}
          sounds={unit.sounds}
          unitColor={unit.color}
        />
      </div>
    </div>
  );
}

/* ── MAIN COMPONENT ───────────────────────────────────────── */
export default function EditoPhonoPanel() {
  const [selected, setSelected] = useState(() => {
    const idx = localStorage.getItem("parcours_unit_idx");
    if (idx !== null) {
      localStorage.removeItem("parcours_unit_idx");
      return EDITO_A1_PHONO[Number(idx)] ?? null;
    }
    return null;
  });

  return (
    <div>
      {selected ? (
        <UnitDetail unit={selected} onBack={() => setSelected(null)} />
      ) : (
        <UnitList onSelect={setSelected} />
      )}
    </div>
  );
}
