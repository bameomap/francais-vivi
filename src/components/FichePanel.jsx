import { useState } from "react";
import { C } from "../constants.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import { EDITO_VOCAB_UNITS } from "../data/editoVocab.js";
import { EDITO_GRAMMAR } from "../data/editoGrammar.js";
import { EDITO_A1_UNITS } from "../data/editoA1Units.js";
import { FICHE_DIALOGUES } from "../data/ficheDialogues.js";
import { EDITO_POUR_NOTES } from "../data/editoAudioNotes.js";

// ── Fiche de révision — bản tóm tắt ôn tập theo Unité (U1 → U10) ──
// Gom lại 3 chủ điểm chính của mỗi bài từ dữ liệu đã có:
//   • Từ vựng chính  → EDITO_VOCAB_UNITS
//   • Ngữ pháp chính → EDITO_GRAMMAR
//   • Giao tiếp      → EDITO_A1_UNITS.speakingPractice

const UNITS = Array.from({ length: 10 }, (_, i) => i + 1); // 1..10

const TABS = [
  { id: "vocab",   label: "Từ vựng chính", icon: "📖" },
  { id: "grammar", label: "Ngữ pháp chính", icon: "⚜️" },
  { id: "comm",    label: "Giao tiếp",      icon: "🗣️" },
];

function getUnitData(n) {
  return {
    vocab:   EDITO_VOCAB_UNITS.find(u => u.id === `u${n}`),
    grammar: EDITO_GRAMMAR.find(g => g.id === `g${n}`),
    comm:    EDITO_A1_UNITS.find(u => u.unit === n),
  };
}

// Nhóm từ vựng cốt lõi theo chuẩn thi A1 — mặc định chỉ hiện những nhóm này.
const CORE_GROUPS = {
  1:  ["u1g2", "u1g3", "u1g4"],
  2:  ["u2g1", "u2g5", "u2g7"],
  3:  ["u3g1", "u3g2", "u3g3", "u3g5", "u3g7"],
  4:  ["u4g2", "u4g3", "u4g5", "u4g7"],
  5:  ["u5g1", "u5g3", "u5g5"],
  6:  ["u6g1", "u6gjms", "u6g2", "u6g6"],
  7:  ["u7g1", "u7g2", "u7g3", "u7g9"],
  8:  ["u8g1", "u8g4", "u8g6", "u8g7"],
  9:  ["u9g1", "u9g2", "u9g4", "u9g5"],
  10: ["u10g1", "u10g2", "u10g4", "u10g5"],
};

// ── Từ vựng ────────────────────────────────────────────────────
function VocabView({ data, unit }) {
  const [full, setFull] = useState(false);
  if (!data) return <Empty label="từ vựng" />;

  const coreIds = CORE_GROUPS[unit] || [];
  const hasCore = coreIds.length > 0;
  const shown = full || !hasCore ? data.groups : data.groups.filter(g => coreIds.includes(g.id));
  const hiddenCount = data.groups.length - shown.length;

  return (
    <div>
      {hasCore && (
        <div style={{ display: "flex", gap: 4, background: C.cream, padding: 4, borderRadius: 10, marginBottom: 14 }}>
          {[
            { id: false, label: `⭐ Cốt lõi (${coreIds.length})` },
            { id: true,  label: `Đầy đủ (${data.groups.length})` },
          ].map(m => {
            const active = m.id === full;
            return (
              <button key={String(m.id)} onClick={() => setFull(m.id)}
                style={{ flex: 1, padding: "6px 4px", background: active ? C.white : "transparent", border: "none", borderRadius: 7, cursor: "pointer",
                  fontWeight: active ? 700 : 500, color: active ? C.ink : C.gray, fontFamily: "inherit", fontSize: 11.5,
                  boxShadow: active ? "0 1px 3px rgba(0,0,0,0.06)" : "none", transition: "all 0.15s" }}>
                {m.label}
              </button>
            );
          })}
        </div>
      )}
      {shown.map(g => (
        <div key={g.id} style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: C.blue, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
            <span>{g.icon}</span>{g.label}
          </div>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
            {g.words.map((w, i) => (
              <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 8, padding: "8px 12px", borderTop: i ? `1px solid ${C.borderSoft}` : "none" }}>
                <span style={{ fontFamily: "Georgia,serif", fontSize: 14, color: C.ink, fontWeight: 600, flexShrink: 0 }}>{w.fr}</span>
                <SpeakBtn text={w.fr} />
                <span style={{ fontSize: 12.5, color: C.gray, marginLeft: "auto", textAlign: "right" }}>{w.vi}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      {!full && hiddenCount > 0 && (
        <button onClick={() => setFull(true)}
          style={{ width: "100%", padding: "10px", background: C.blueL, border: `1px dashed ${C.blue}66`, color: C.blue, borderRadius: 12, fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          Xem tất cả — còn {hiddenCount} nhóm từ khác ↓
        </button>
      )}
    </div>
  );
}

// Tô màu từng dòng của "rule" cho dễ đọc.
function RuleText({ text }) {
  const lines = (text || "").split("\n");
  return (
    <div style={{ fontSize: 12.5, lineHeight: 1.5 }}>
      {lines.map((ln, i) => {
        const t = ln.trim();
        if (!t) return <div key={i} style={{ height: 6 }} />;
        // Tiêu đề phần: PHẦN…, PARTIE…, BẢNG…, hoặc dòng IN HOA kết thúc bằng ':'
        if (/^(PHẦN|PARTIE|BẢNG)\b/.test(t) || (/:$/.test(t) && t === t.toUpperCase())) {
          return (
            <div key={i} style={{ margin: "10px 0 5px", padding: "3px 9px", background: C.blueL, color: C.blueDark, borderRadius: 7, fontWeight: 700, fontSize: 11.5, display: "inline-block" }}>{t}</div>
          );
        }
        if (/^⚠️/.test(t)) return <div key={i} style={{ margin: "4px 0", padding: "4px 9px", background: C.goldL, color: C.gold, borderLeft: `3px solid ${C.gold}`, borderRadius: 6, fontWeight: 600 }}>{t}</div>;
        if (/^💡/.test(t)) return <div key={i} style={{ margin: "4px 0", padding: "4px 9px", background: C.greenL, color: C.green, borderLeft: `3px solid ${C.green}`, borderRadius: 6 }}>{t}</div>;
        if (/❌/.test(t)) return <div key={i} style={{ padding: "1px 0", color: C.red }}>{t}</div>;
        if (/✅/.test(t)) return <div key={i} style={{ padding: "1px 0", color: C.green }}>{t}</div>;
        // Mục danh sách: •, -, hoặc "1." "2." …
        if (/^([•\-–]|\d+[.)])\s/.test(t)) {
          return <div key={i} style={{ padding: "1px 0 1px 12px", color: C.ink2, textIndent: -10 }}><span style={{ color: C.blue, fontWeight: 700 }}>{t.match(/^([•\-–]|\d+[.)])/)[0]}</span>{t.replace(/^([•\-–]|\d+[.)])/, "")}</div>;
        }
        return <div key={i} style={{ padding: "1px 0", color: C.ink2 }}>{t}</div>;
      })}
    </div>
  );
}

// ── Ngữ pháp ───────────────────────────────────────────────────
function GrammarView({ data }) {
  if (!data) return <Empty label="ngữ pháp" />;
  // Bỏ mục "Production orale" — nội dung giao tiếp đã nằm ở tab Giao tiếp.
  // (U5 đặt tên khác: "Dans un magasin…" nhưng rule mở đầu ghi "(Production orale)".)
  const points = data.points.filter(p =>
    !/^Production orale/i.test(p.topic) && !/Production orale/i.test((p.rule || "").split("\n")[0]));
  return (
    <div>
      {points.map((p, i) => (
        <div key={i} style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.blue}`, borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: C.white, background: C.blueDark, padding: "6px 10px", borderRadius: 8, marginBottom: 10 }}>{p.topic}</div>
          <RuleText text={p.rule} />
          {p.examples?.length > 0 && (
            <div style={{ marginTop: 10, borderTop: `1px solid ${C.borderSoft}`, paddingTop: 8 }}>
              {p.examples.map((ex, j) => {
                const [fr, vi] = ex.split(" — ");
                return (
                  <div key={j} style={{ display: "flex", alignItems: "baseline", gap: 6, padding: "3px 0" }}>
                    <span style={{ fontFamily: "Georgia,serif", fontSize: 12.5, color: C.ink }}>{fr}</span>
                    <SpeakBtn text={fr} size="0.72rem" />
                    {vi && <span style={{ fontSize: 12, color: C.gray }}>— {vi}</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Đoạn hội thoại mẫu ─────────────────────────────────────────
function DialogueCard({ dlg }) {
  return (
    <div style={{ background: C.blueL, border: `1px solid ${C.blue}33`, borderRadius: 14, padding: "12px 14px", marginBottom: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.blue, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
        <span>💬</span>Hội thoại mẫu · {dlg.situation}
      </div>
      {dlg.lines.map((l, i) => {
        const isA = l.sp === "A";
        return (
          <div key={i} style={{ display: "flex", justifyContent: isA ? "flex-start" : "flex-end", marginBottom: 8 }}>
            <div style={{ maxWidth: "85%", background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, borderTopLeftRadius: isA ? 3 : 12, borderTopRightRadius: isA ? 12 : 3, padding: "7px 11px" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: isA ? C.blue : C.accent, marginBottom: 2 }}>{isA ? dlg.a : dlg.b}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                <span style={{ fontFamily: "Georgia,serif", fontSize: 13.5, color: C.ink, fontWeight: 600 }}>{l.fr}</span>
                <SpeakBtn text={l.fr} size="0.72rem" />
              </div>
              <div style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{l.vi}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Mẫu câu « Pour communiquer » (từ các bài nghe của unit) ────
function getUnitNotes(unitNum) {
  const out = [];
  for (const [key, notes] of Object.entries(EDITO_POUR_NOTES)) {
    const m = key.match(/^u(\d+)-/);
    if (m && Number(m[1]) === unitNum) out.push(...notes);
  }
  return out;
}

function PourCommuniquer({ notes }) {
  const [open, setOpen] = useState(() => new Set([0]));
  const toggle = i => setOpen(prev => { const s = new Set(prev); s.has(i) ? s.delete(i) : s.add(i); return s; });
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 12.5, fontWeight: 700, color: C.blueDark, margin: "4px 0 10px" }}>📌 Mẫu câu giao tiếp — Pour communiquer</div>
      {notes.map((n, i) => {
        const isOpen = open.has(i);
        return (
          <div key={i} style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.gold}`, borderRadius: 12, marginBottom: 10, overflow: "hidden" }}>
            <button onClick={() => toggle(i)}
              style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 12px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: C.ink }}>{n.heading}</span>
              <span style={{ fontSize: 11, color: C.gray, flexShrink: 0 }}>{isOpen ? "▲" : `▼ ${n.phrases.length} câu`}</span>
            </button>
            {isOpen && (
              <div style={{ padding: "0 12px 12px" }}>
                {n.structure && (
                  <div style={{ fontSize: 11.5, color: C.ink2, lineHeight: 1.6, background: C.goldL, border: `1px solid ${C.gold}44`, borderRadius: 8, padding: "6px 10px", marginBottom: 8 }}>
                    💡 {n.structure}
                  </div>
                )}
                {n.phrases.map((p, j) => (
                  <div key={j} style={{ padding: "6px 0", borderTop: j ? `1px solid ${C.borderSoft}` : "none" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                      <span style={{ fontFamily: "Georgia,serif", fontSize: 13, color: C.ink, fontWeight: 600 }}>{p.fr}</span>
                      <SpeakBtn text={p.fr.replace(/\[|\]/g, "")} size="0.72rem" />
                    </div>
                    <div style={{ fontSize: 11.5, color: C.gray, marginTop: 1 }}>{p.vi}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Giao tiếp ──────────────────────────────────────────────────
function CommView({ data, unit }) {
  const items = data?.speakingPractice || [];
  const dialogues = FICHE_DIALOGUES[unit] || [];
  const notes = getUnitNotes(unit);
  if (!items.length && !dialogues.length && !notes.length) return <Empty label="giao tiếp" />;
  return (
    <div>
      {notes.length > 0 && <PourCommuniquer notes={notes} />}
      {dialogues.map((dlg, i) => <DialogueCard key={i} dlg={dlg} />)}
      {items.length > 0 && (
        <div style={{ fontSize: 12.5, fontWeight: 700, color: C.accent, margin: "4px 0 10px" }}>🎯 Tình huống luyện nói</div>
      )}
      {items.map((it, i) => (
        <div key={i} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: C.accent, marginBottom: 4 }}>{it.title}</div>
          <div style={{ fontSize: 12.5, color: C.ink2, lineHeight: 1.6 }}>{it.task}</div>
          {it.usefulPhrases?.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
              {it.usefulPhrases.map((ph, j) => (
                <span key={j} style={{ display: "inline-flex", alignItems: "center", gap: 3, background: C.blueL, border: `1px solid ${C.blue}33`, color: C.blueDark, borderRadius: 999, padding: "3px 10px", fontSize: 12, fontFamily: "Georgia,serif" }}>
                  {ph}<SpeakBtn text={ph} size="0.7rem" />
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Empty({ label }) {
  return <div style={{ textAlign: "center", color: C.gray, fontSize: 13, padding: "2rem 1rem" }}>Bài này chưa có nội dung {label} để ôn.</div>;
}

// ── Main ───────────────────────────────────────────────────────
export default function FichePanel({ onNavigate }) {
  const [unit, setUnit] = useState(1);
  const [tab, setTab]   = useState("vocab");
  const data  = getUnitData(unit);
  const title = data.vocab?.title || data.comm?.title || "";

  return (
    <div style={{ padding: "1rem", animation: "fadeUp 0.3s ease" }}>
      {/* Chọn Unité */}
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, fontWeight: 600, color: C.gray, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
        Chọn Unité
      </div>
      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 6, marginBottom: 4 }}>
        {UNITS.map(n => {
          const active = n === unit;
          return (
            <button key={n} onClick={() => setUnit(n)}
              style={{ flexShrink: 0, width: 40, height: 40, borderRadius: 12, cursor: "pointer", fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 700, fontSize: 15,
                background: active ? C.blue : C.white, color: active ? "#fff" : C.ink,
                border: `1.5px solid ${active ? C.blue : C.border}`, transition: "all 0.15s" }}>
              {n}
            </button>
          );
        })}
      </div>

      {title && (
        <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 18, fontWeight: 700, color: C.ink, margin: "8px 0 14px" }}>
          Unité {unit} · {title}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, background: C.cream, padding: 4, borderRadius: 11, marginBottom: 16 }}>
        {TABS.map(t => {
          const active = t.id === tab;
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ flex: 1, padding: "8px 4px", background: active ? C.white : "transparent", border: "none", borderRadius: 8, cursor: "pointer",
                fontWeight: active ? 700 : 500, color: active ? C.ink : C.gray, fontFamily: "inherit", fontSize: 11.5,
                boxShadow: active ? "0 1px 3px rgba(0,0,0,0.06)" : "none", transition: "all 0.15s" }}>
              {t.icon} {t.label}
            </button>
          );
        })}
      </div>

      {tab === "vocab"   && <VocabView key={unit} data={data.vocab} unit={unit} />}
      {tab === "grammar" && <GrammarView data={data.grammar} />}
      {tab === "comm"    && <CommView data={data.comm} unit={unit} />}

      {/* Kiểm tra nhanh — nhảy sang Quiz của unité này */}
      {onNavigate && (
        <button onClick={() => { localStorage.setItem("parcours_quiz_unit", `u${unit}`); onNavigate("quiz-unit", "quiz-unit"); }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", marginTop: 20, padding: "13px",
            background: `linear-gradient(135deg, ${C.heroFrom}, ${C.heroTo})`, border: "none", borderRadius: 14, cursor: "pointer",
            fontFamily: "inherit", boxShadow: "0 4px 14px rgba(26,39,68,0.25)" }}>
          <span style={{ fontSize: 18 }}>⚡</span>
          <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 700, fontSize: 14.5, color: "#fff" }}>
            Kiểm tra nhanh Unité {unit}
          </span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>→</span>
        </button>
      )}
    </div>
  );
}
