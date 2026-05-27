/**
 * EditoAudioPanel.jsx
 * Nghe theo sách Édito A1 — audio tracks with comprehension questions.
 */

import { useState } from "react";
import { C } from "../constants.js";
import { EDITO_AUDIO } from "../data/editoAudio.js";
import { EDITO_VOCAB_UNITS } from "../data/editoVocab.js";

const EDITO_UNITS = EDITO_VOCAB_UNITS.map(u => ({ id: u.id, num: u.num, title: u.title }));

const Q_STYLES = {
  "Entrée en matière": { bg: "#FFFBEB", border: "#D97706", chip: "#D97706", label: "🔍 Entrée" },
  "1ère écoute":       { bg: "#EFF6FF", border: "#2563EB", chip: "#2563EB", label: "👂 1ère écoute" },
  "2e écoute":         { bg: "#F5F3FF", border: "#7C3AED", chip: "#7C3AED", label: "👂 2e écoute" },
};

export default function EditoAudioPanel() {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [openQ, setOpenQ]               = useState({}); // { trackId: bool }

  const tracks   = selectedUnit ? (EDITO_AUDIO[selectedUnit] || []) : [];
  const unitData = EDITO_UNITS.find(u => u.id === selectedUnit);

  const toggleUnit = (uid) => {
    setSelectedUnit(prev => prev === uid ? null : uid);
    setOpenQ({});
  };

  const toggleQ = (id) =>
    setOpenQ(prev => ({ ...prev, [id]: !prev[id] }));

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
            const isActive = selectedUnit === u.id;
            return (
              <button key={u.id} onClick={() => toggleUnit(u.id)} style={{
                flexShrink: 0, padding: "0.28rem 0.65rem",
                background: isActive ? C.blue : C.cream,
                border: `1.5px solid ${isActive ? C.blue : C.border}`,
                color: isActive ? "#fff" : C.ink,
                borderRadius: 20, fontSize: "0.68rem", cursor: "pointer",
                fontFamily: "inherit", fontWeight: isActive ? 700 : 400,
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

      {/* ── No unit selected ── */}
      {!selectedUnit && (
        <div style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "2.2rem", marginBottom: "0.75rem" }}>📚</div>
          <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1rem", color: C.ink, fontWeight: 700, marginBottom: "0.4rem" }}>
            Chọn một Unit Édito
          </div>
          <div style={{ fontSize: "0.78rem", color: C.gray, lineHeight: 1.65 }}>
            Bấm vào một unit bên trên để xem<br />các bài nghe và câu hỏi từ sách.
          </div>
        </div>
      )}

      {/* ── Track cards ── */}
      {selectedUnit && (
        <div style={{ padding: "0.75rem 0.85rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {tracks.map(track => {
            const isOpen = !!openQ[track.id];
            return (
              <div key={track.id} style={{
                borderRadius: 14, overflow: "hidden",
                border: `1.5px solid ${track.color}30`,
                background: C.white,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}>

                {/* ── Card header ── */}
                <div style={{
                  background: `linear-gradient(135deg, ${track.color} 0%, ${track.color}cc 100%)`,
                  padding: "0.7rem 0.9rem",
                  display: "flex", alignItems: "center", gap: "0.6rem",
                }}>
                  <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>{track.theme}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.18rem" }}>
                      <span style={{
                        background: "rgba(255,255,255,0.25)", color: "#fff",
                        fontSize: "0.6rem", fontWeight: 700, padding: "0.1rem 0.45rem",
                        borderRadius: 10, letterSpacing: "0.05em", textTransform: "uppercase",
                      }}>
                        Section {track.section}
                      </span>
                      <span style={{
                        background: "rgba(255,255,255,0.25)", color: "#fff",
                        fontSize: "0.6rem", fontWeight: 600, padding: "0.1rem 0.45rem",
                        borderRadius: 10,
                      }}>
                        Piste {track.trackNum} · p.{track.page}
                      </span>
                    </div>
                    <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "0.92rem", color: "#fff", fontWeight: 700, lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {track.title}
                    </div>
                    <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.8)", marginTop: 2, lineHeight: 1.3 }}>
                      {track.subtitle}
                    </div>
                  </div>
                </div>

                {/* ── Audio player ── */}
                <div style={{ padding: "0.6rem 0.9rem 0.5rem", background: track.colorLight }}>
                  <audio
                    controls
                    src={track.audioSrc}
                    style={{ width: "100%", height: 36, accentColor: track.color }}
                    preload="none"
                  />
                </div>

                {/* ── Questions toggle ── */}
                <div style={{ padding: "0 0.9rem 0.6rem" }}>
                  <button
                    onClick={() => toggleQ(track.id)}
                    style={{
                      width: "100%", padding: "0.42rem 0.7rem",
                      background: isOpen ? track.colorLight : C.cream,
                      border: `1px solid ${isOpen ? track.color : C.border}`,
                      borderRadius: 8, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      fontFamily: "inherit", fontSize: "0.72rem", fontWeight: 600,
                      color: isOpen ? track.color : C.gray,
                      transition: "all 0.15s",
                    }}
                  >
                    <span>📋 Câu hỏi trong sách</span>
                    <span style={{ fontSize: "0.65rem", opacity: 0.8 }}>{isOpen ? "▲ Ẩn" : "▼ Xem"}</span>
                  </button>

                  {isOpen && track.questions && (
                    <div style={{ marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      {track.questions.map((q, qi) => {
                        const style = Q_STYLES[q.label] || { bg: "#F9FAFB", border: "#9CA3AF", chip: "#6B7280", label: q.label };
                        return (
                          <div key={qi} style={{
                            background: style.bg,
                            border: `1px solid ${style.border}30`,
                            borderLeft: `3px solid ${style.border}`,
                            borderRadius: "0 8px 8px 0",
                            padding: "0.45rem 0.65rem",
                          }}>
                            <div style={{
                              display: "inline-block",
                              background: style.chip, color: "#fff",
                              fontSize: "0.58rem", fontWeight: 700,
                              padding: "0.1rem 0.5rem", borderRadius: 10,
                              marginBottom: "0.3rem", letterSpacing: "0.03em",
                            }}>
                              {style.label}
                            </div>
                            <div style={{ fontSize: "0.73rem", color: C.ink, lineHeight: 1.55 }}>
                              {q.text}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
