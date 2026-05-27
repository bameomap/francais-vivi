import { useState, useRef } from "react";
import { C } from "../constants.js";
import { EDITO_A1_PHONO } from "../data/editoPhono.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import { speak } from "../utils/helpers.js";

/* ── Tag chip ─────────────────────────────────────────────── */
function Tag({ text }) {
  return (
    <span style={{
      display: "inline-block", padding: "0.1rem 0.4rem",
      background: C.cream, color: C.gray2, borderRadius: 10,
      fontSize: "0.64rem", fontFamily: "monospace", border: `1px solid ${C.border}`,
    }}>{text}</span>
  );
}

/* ── UNIT LIST ────────────────────────────────────────────── */
function UnitList({ onSelect }) {
  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      {/* Hero banner */}
      <div style={{
        background: "linear-gradient(135deg, #1B3A6B 0%, #2d4f8a 100%)",
        padding: "1rem 1rem 0.85rem",
      }}>
        <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1.15rem", color: "#fff", fontWeight: 800 }}>
          🎵 Phono-graphie Édito A1
        </div>
        <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.65)", marginTop: 4 }}>
          11 bài · Âm vị · Cặp từ tối thiểu · Luyện nghe phân biệt
        </div>
      </div>

      <div style={{ padding: "0.85rem 1rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {EDITO_A1_PHONO.map((unit, i) => (
            <button
              key={unit.unitId}
              onClick={() => onSelect(unit)}
              style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: 0,
                background: C.white,
                border: `1.5px solid ${C.border}`,
                borderLeft: `4px solid ${unit.color}`,
                borderRadius: 14, cursor: "pointer",
                textAlign: "left", width: "100%", overflow: "hidden",
                animation: `fadeUp 0.2s ease ${i * 0.03}s both`,
                transition: "box-shadow 0.15s, transform 0.1s",
                boxShadow: "0 2px 8px rgba(74,144,217,0.08)",
              }}
              onPointerDown={e => e.currentTarget.style.transform = "scale(0.99)"}
              onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
              onPointerLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              {/* unit badge */}
              <div style={{
                width: 44, height: 52, flexShrink: 0,
                background: `${unit.color}18`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Playfair Display',Georgia,serif",
                fontWeight: 800, fontSize: 16, color: unit.color,
              }}>
                {unit.unitNum}
              </div>

              <div style={{ flex: 1, minWidth: 0, padding: "0.6rem 0.4rem 0.6rem 0" }}>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", color: C.ink, lineHeight: 1.2 }}>
                  {unit.title}
                </div>
                <div style={{ fontSize: "0.72rem", color: C.blue, fontWeight: 600, marginTop: 2 }}>
                  🎵 {unit.topic}
                </div>
                <div style={{ fontSize: "0.65rem", color: C.gray, marginTop: 1 }}>
                  {unit.topicVi}
                </div>
              </div>
              <span style={{ color: C.gray2, fontSize: 18, flexShrink: 0, paddingRight: 12 }}>›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── SOUND CARD ───────────────────────────────────────────── */
function SoundCard({ sound, unitColor }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{
      border: `1.5px solid ${open ? C.blue + "40" : C.border}`,
      borderRadius: 12, overflow: "hidden",
      marginBottom: "0.6rem", transition: "border-color 0.15s",
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          gap: "0.6rem", padding: "0.6rem 0.8rem",
          background: open ? C.blueL : C.white,
          border: "none", cursor: "pointer", textAlign: "left",
          transition: "background 0.15s",
        }}
      >
        {/* phoneme bubble — keeps unit color as it's content identity */}
        <span style={{
          minWidth: 44, height: 36, borderRadius: 8,
          background: `${unitColor}18`, border: `1.5px solid ${unitColor}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1rem", fontWeight: 800, fontFamily: "monospace",
          color: unitColor, flexShrink: 0, padding: "0 0.3rem",
        }}>{sound.phoneme}</span>

        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: "0.8rem", color: C.ink }}>{sound.label}</div>
          <div style={{ fontSize: "0.68rem", color: C.gray, marginTop: 1 }}>{sound.description}</div>
        </div>
        <span style={{ color: C.gray, fontSize: "0.72rem" }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={{ padding: "0.7rem 0.9rem", background: C.white }}>
          {/* Vietnamese tip */}
          <p style={{
            fontSize: "0.74rem", color: C.ink, lineHeight: 1.5,
            background: C.blueL, borderLeft: `3px solid ${C.blue}`,
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

          {/* examples grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
            gap: "0.35rem", marginBottom: "0.5rem",
          }}>
            {sound.examples.map((ex, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "0.3rem",
                background: C.cream, borderRadius: 8, padding: "0.3rem 0.5rem",
                border: `1px solid ${C.border}`,
              }}>
                <SpeakBtn text={ex.word} size="0.78rem" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.78rem", color: C.ink }}>{ex.word}</div>
                  <div style={{ fontSize: "0.63rem", color: C.gray }}>{ex.vi}</div>
                </div>
              </div>
            ))}
          </div>

          {sound.tip && (
            <p style={{ fontSize: "0.7rem", color: C.gray, fontStyle: "italic", lineHeight: 1.5 }}>
              ⚡ {sound.tip}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ── MINIMAL PAIRS ────────────────────────────────────────── */
function MinimalPairs({ pairs }) {
  if (!pairs || pairs.length === 0) return null;
  return (
    <div style={{ marginBottom: "1rem" }}>
      <h4 style={{ fontSize: "0.72rem", fontWeight: 700, color: C.gray, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
        🔀 Cặp từ tối thiểu
      </h4>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        {pairs.map((p, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.5rem 0.7rem",
            background: C.white, borderRadius: 10, border: `1.5px solid ${C.border}`,
          }}>
            {/* word A */}
            <div style={{
              flex: 1, background: C.blueL, borderRadius: 8,
              padding: "0.35rem 0.5rem",
              display: "flex", alignItems: "center", gap: "0.35rem",
              border: `1px solid ${C.blue}30`,
            }}>
              <SpeakBtn text={p.a} size="0.75rem" />
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.8rem", color: C.blue }}>{p.a}</div>
                <div style={{ fontSize: "0.63rem", color: C.gray }}>{p.aVi}</div>
              </div>
            </div>

            <span style={{ fontSize: "0.65rem", color: C.gray2, flexShrink: 0 }}>↔</span>

            {/* word B */}
            <div style={{
              flex: 1, background: C.goldL, borderRadius: 8,
              padding: "0.35rem 0.5rem",
              display: "flex", alignItems: "center", gap: "0.35rem",
              border: `1px solid ${C.gold}40`,
            }}>
              <SpeakBtn text={p.b} size="0.75rem" />
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.8rem", color: "#92400E" }}>{p.b}</div>
                <div style={{ fontSize: "0.63rem", color: C.gray }}>{p.bVi}</div>
              </div>
            </div>

            <div style={{ fontSize: "0.62rem", color: C.gray, flexShrink: 0, maxWidth: 56, textAlign: "center", lineHeight: 1.3 }}>
              {p.note}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── PRACTICE SENTENCES ───────────────────────────────────── */
function PracticeSection({ practice }) {
  const [playing, setPlaying] = useState(false);
  const stopRef = useRef(false);

  async function playAll() {
    if (playing) { stopRef.current = true; return; }
    stopRef.current = false;
    setPlaying(true);
    for (const sentence of practice) {
      if (stopRef.current) break;
      await new Promise(res => speak(sentence, res));
      await new Promise(res => setTimeout(res, 400));
    }
    setPlaying(false);
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <h4 style={{ fontSize: "0.72rem", fontWeight: 700, color: C.gray, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          🗣️ Câu luyện tập
        </h4>
        <button
          onClick={playAll}
          style={{
            padding: "0.22rem 0.65rem",
            background: playing ? C.accent : C.blue,
            color: "#fff", border: "none", borderRadius: 20,
            fontSize: "0.67rem", cursor: "pointer", fontFamily: "inherit",
            fontWeight: 600,
          }}
        >
          {playing ? "⏹ Dừng" : "▶ Đọc tất cả"}
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        {practice.map((s, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            background: C.white, borderRadius: 8, padding: "0.4rem 0.6rem",
            border: `1px solid ${C.border}`,
          }}>
            <SpeakBtn text={s} size="0.75rem" />
            <span style={{ fontSize: "0.79rem", color: C.ink, fontStyle: "italic" }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── LISTENING QUIZ ───────────────────────────────────────── */
function ListeningQuiz({ quiz, sounds }) {
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [heard, setHeard] = useState(false);

  if (!quiz || quiz.length === 0) return null;

  const total = quiz.length;
  const current = quiz[idx];

  function hear() { speak(current.word, null); setHeard(true); }

  function choose(soundId) {
    if (answered) return;
    const correct = soundId === current.target;
    setAnswered(correct ? "correct" : "wrong");
    if (correct) setScore(s => s + 1);
    setTimeout(() => {
      if (idx + 1 >= total) { setDone(true); }
      else { setIdx(i => i + 1); setAnswered(null); setHeard(false); }
    }, 900);
  }

  function restart() { setIdx(0); setAnswered(null); setScore(0); setDone(false); setHeard(false); }

  return (
    <div style={{ border: `2px solid ${C.blue}30`, borderRadius: 14, overflow: "hidden" }}>
      {/* header */}
      <div style={{
        background: C.blueL, padding: "0.5rem 0.8rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: `1px solid ${C.blue}20`,
      }}>
        <span style={{ fontWeight: 700, fontSize: "0.78rem", color: C.blue }}>
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
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: C.ink, marginBottom: 4 }}>
              {score}/{total} đúng
            </div>
            <div style={{ fontSize: "0.72rem", color: C.gray, marginBottom: "0.8rem" }}>
              {score >= total * 0.8 ? "Tuyệt vời! Tai nghe rất tốt 👂" :
               score >= total * 0.5 ? "Khá tốt! Luyện thêm nhé." : "Thử lại — lắng nghe thật kỹ!"}
            </div>
            <button onClick={restart} style={{
              padding: "0.35rem 1rem",
              background: C.accent, color: "#fff",
              border: "none", borderRadius: 20,
              fontSize: "0.75rem", cursor: "pointer", fontFamily: "inherit", fontWeight: 600,
            }}>🔄 Làm lại</button>
          </div>
        ) : (
          <>
            {/* listen button */}
            <div style={{ textAlign: "center", marginBottom: "0.9rem" }}>
              <button onClick={hear} style={{
                padding: "0.6rem 1.4rem",
                background: heard ? C.cream : C.blue,
                color: heard ? C.ink : "#fff",
                border: `2px solid ${heard ? C.border : C.blue}`,
                borderRadius: 24, fontSize: "1rem", cursor: "pointer",
                fontFamily: "inherit", fontWeight: 600,
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                transition: "all 0.15s",
              }}>
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
                let bg = C.cream, border = `1.5px solid ${C.border}`, color = C.ink;
                if (chosen && isTarget) {
                  bg = C.greenL; border = `1.5px solid ${C.green}`; color = "#065F46";
                } else if (chosen && !isTarget && sound.id === current.target) {
                  bg = "#FEE2E2"; border = "1.5px solid #EF4444"; color = "#991B1B";
                }
                return (
                  <button key={sound.id} onClick={() => choose(sound.id)}
                    disabled={!!answered || !heard}
                    style={{
                      padding: "0.5rem", background: !heard ? C.cream : bg,
                      border, borderRadius: 10,
                      cursor: heard && !answered ? "pointer" : "default",
                      color: !heard ? C.gray2 : color,
                      fontFamily: "monospace", fontWeight: 700, fontSize: "0.9rem",
                      textAlign: "center", transition: "all 0.15s",
                      opacity: !heard ? 0.55 : 1,
                    }}
                  >
                    {sound.phoneme}
                    <div style={{ fontWeight: 400, fontSize: "0.6rem", fontFamily: "inherit", marginTop: 2 }}>
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
                color: answered === "correct" ? C.green : C.accent,
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
    <div style={{ animation: "fadeUp 0.25s ease" }}>
      {/* Sticky gradient header */}
      <div style={{
        background: "linear-gradient(135deg, #1B3A6B 0%, #2d4f8a 100%)",
        padding: "0.85rem 1rem 0.9rem",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <button onClick={onBack} style={{
          background: "rgba(255,255,255,0.15)", border: "none",
          color: "#fff", fontSize: "0.72rem", fontWeight: 600,
          cursor: "pointer", padding: "0.2rem 0.65rem",
          borderRadius: 20, marginBottom: "0.6rem", fontFamily: "inherit",
        }}>← Quay lại</button>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            background: `${unit.color}30`, border: `2px solid ${unit.color}60`,
            color: "#fff", borderRadius: 10,
            minWidth: 40, height: 40,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: "0.9rem", flexShrink: 0,
          }}>{unit.unitNum}</div>

          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, color: "#fff", fontSize: "1rem", fontFamily: "'Playfair Display',Georgia,serif", lineHeight: 1.1 }}>
              {unit.title}
            </div>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.7)", marginTop: 2 }}>
              🎵 {unit.topic} · {unit.topicVi}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "0.9rem 1rem" }}>
        {/* sounds */}
        <div style={{ fontSize: "0.6rem", color: C.gray, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginBottom: "0.55rem" }}>
          🔤 Âm mục tiêu
        </div>
        {unit.sounds.map(sound => (
          <SoundCard key={sound.id} sound={sound} unitColor={unit.color} />
        ))}

        <MinimalPairs pairs={unit.pairs} />
        <PracticeSection practice={unit.practice} />
        <ListeningQuiz quiz={unit.quiz} sounds={unit.sounds} />
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
