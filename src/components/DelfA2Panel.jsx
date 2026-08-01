import { useState, useEffect, useRef } from "react";
import { C } from "../constants.js";
import { callAI } from "../utils/api.js";
import Spinner from "./ui/Spinner.jsx";
import { getSubDone, markSubDone, unmarkSubDone } from "../utils/parcours.js";
import CahierExercises from "./CahierExercises.jsx";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import { EDITO_AUDIO_A2 } from "../data/editoAudioA2.js";
import { CAHIER_A2 } from "../data/editoCahierA2.js";
import { PARCOURS_UNITS_A2 } from "../data/parcoursDataA2.js";

// DELF A2 blanc for one unit: the four exam skills on one page.
//   • Compréhension de l'oral   — the livre's DELF track, already hosted
//   • Compréhension des écrits  — the cahier's matching exercise, auto-graded
//   • Production écrite / orale — prompt plus the cahier's model answer
//
// Production is graded by AI against the DELF A2 criteria — there is no answer
// key for something you wrote yourself. The cahier's model answer stays behind
// a reveal so it can't be copied before attempting.
//
// The speaking task dictates through the browser's speech recognition, so what
// gets graded is what you actually said, not what you typed.

const SKILL_COLORS = {
  CO: "#0891B2",
  CE: "#059669",
  PE: "#E67E22",
  PO: "#D97706",
};

function SkillHeader({ tag, title, points, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.55rem" }}>
      <span style={{
        flexShrink: 0, background: color, color: "#fff", borderRadius: 8,
        padding: "0.15rem 0.5rem", fontSize: "0.62rem", fontWeight: 800,
        fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.05em",
      }}>
        {tag}
      </span>
      <span style={{ flex: 1, minWidth: 0, fontFamily: "'Playfair Display',Georgia,serif", fontSize: "0.95rem", fontWeight: 700, color: C.ink }}>
        {title}
      </span>
      {points && <span style={{ flexShrink: 0, fontSize: "0.62rem", color: C.gray2, fontWeight: 600 }}>{points}</span>}
    </div>
  );
}

function buildGradePrompt(p, text, isOral) {
  return `Tu es examinateur DELF A2. Voici la consigne de l'épreuve de ${isOral ? "production orale" : "production écrite"} :
"${p.prompt}"

Voici la production du candidat (${isOral ? "transcription de ce qu'il a dit" : "texte écrit"}) :
"""${text}"""

Évalue selon les critères officiels du DELF A2. Réponds UNIQUEMENT en JSON valide sans markdown :
{
  "wordCount": nombre de mots,
  "verdict": "Đạt tốt|Đạt|Suýt đạt|Chưa đạt",
  "summary": "une phrase en vietnamien résumant le niveau",
  "criteria": [
    {"name":"Respect de la consigne","ok":true,"comment":"nhận xét ngắn bằng tiếng Việt"},
    {"name":"Lexique approprié","ok":true,"comment":"..."},
    {"name":"Morphosyntaxe (temps, accords)","ok":false,"comment":"..."},
    {"name":"Cohérence (connecteurs)","ok":true,"comment":"..."}
  ],
  "errors": [{"original":"đoạn sai","correction":"sửa lại","explanation":"giải thích ngắn bằng tiếng Việt"}],
  "corrected": "toàn bộ bài đã sửa lại bằng tiếng Pháp",
  "tip": "một lời khuyên ngắn bằng tiếng Việt"
}

Règles : sois exigeant mais juste pour le niveau A2. Toutes les explications en vietnamien, le français uniquement dans "corrected" et "original"/"correction". Si la production est vide ou hors sujet, dis-le clairement dans "summary".`;
}

function ProductionCard({ p, color }) {
  const isOral = p.skill.includes("orale");
  const [shown,   setShown]   = useState(false);
  const [text,    setText]    = useState("");
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [err,     setErr]     = useState("");

  // ── Dictation for the speaking task ──────────────────────────
  const recRef = useRef(null);
  const [listening, setListening] = useState(false);
  const micOK = typeof window !== "undefined" &&
    !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  const toggleMic = () => {
    if (!micOK) return;
    if (listening) { recRef.current?.stop(); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = "fr-FR";
    rec.interimResults = true;
    rec.continuous = true;
    let base = text ? text + " " : "";
    rec.onresult = (e) => {
      let out = "";
      for (const r of e.results) out += r[0].transcript;
      setText(base + out);
    };
    rec.onend   = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    rec.start();
    setListening(true);
  };
  useEffect(() => () => { try { recRef.current?.abort(); } catch {} }, []);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const minWords = isOral ? 0 : 60;

  const grade = async () => {
    if (!text.trim() || loading) return;
    setLoading(true); setErr(""); setResult(null);
    try {
      setResult(await callAI(buildGradePrompt(p, text.trim(), isOral)));
    } catch (e) { setErr(e.message); }
    setLoading(false);
  };

  const verdictColor = (v) =>
    v?.startsWith("Đạt tốt") ? C.green : v?.startsWith("Đạt") ? C.green
    : v?.startsWith("Suýt")  ? C.gold  : C.red;

  return (
    <div style={{
      background: C.white, border: `1px solid ${C.border}`,
      borderLeft: `3px solid ${color}`, borderRadius: 10,
      padding: "0.75rem 0.85rem", marginBottom: "0.6rem",
    }}>
      <div style={{ fontSize: "0.78rem", color: C.ink, lineHeight: 1.6, fontWeight: 600 }}>{p.prompt}</div>
      <div style={{ fontSize: "0.7rem", color: C.gray, lineHeight: 1.55, marginTop: "0.3rem" }}>{p.vi}</div>

      {/* ── Answer box ── */}
      <div style={{ marginTop: "0.6rem" }}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={isOral ? 5 : 7}
          placeholder={isOral
            ? "Bấm 🎤 rồi nói tiếng Pháp — máy sẽ ghi lại. Hoặc gõ tay cũng được."
            : "Viết bài của bạn bằng tiếng Pháp ở đây…"}
          style={{
            width: "100%", boxSizing: "border-box", padding: "0.55rem 0.65rem",
            borderRadius: 10, border: `1.5px solid ${listening ? C.red : C.border}`,
            background: C.white, color: C.ink, fontFamily: "Georgia,serif",
            fontSize: "0.8rem", lineHeight: 1.65, resize: "vertical", outline: "none",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.4rem", flexWrap: "wrap" }}>
          {isOral && micOK && (
            <button onClick={toggleMic}
              style={{
                background: listening ? C.red : C.white, color: listening ? "#fff" : C.red,
                border: `1.5px solid ${C.red}66`, borderRadius: 20,
                padding: "0.25rem 0.7rem", fontSize: "0.7rem", fontWeight: 700,
                cursor: "pointer", fontFamily: "inherit",
              }}>
              {listening ? "⏹ Dừng ghi" : "🎤 Nói"}
            </button>
          )}
          <button onClick={grade} disabled={!text.trim() || loading}
            style={{
              background: text.trim() && !loading ? color : C.cream,
              color: text.trim() && !loading ? "#fff" : C.gray2,
              border: "none", borderRadius: 20, padding: "0.28rem 0.85rem",
              fontSize: "0.72rem", fontWeight: 700,
              cursor: text.trim() && !loading ? "pointer" : "default", fontFamily: "inherit",
            }}>
            ✨ Nhờ AI chấm
          </button>
          <span style={{ fontSize: "0.65rem", color: minWords && words < minWords ? C.gold : C.gray2 }}>
            {words} từ{minWords ? ` · tối thiểu ${minWords}` : ""}
          </span>
        </div>
      </div>

      {loading && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 0", color: C.gray, fontSize: "0.75rem" }}>
          <Spinner size={14} /> AI đang chấm theo tiêu chí DELF A2…
        </div>
      )}
      {err && <div style={{ color: C.red, fontSize: "0.72rem", marginTop: "0.4rem" }}>⚠ {err}</div>}

      {/* ── AI feedback ── */}
      {result && (
        <div style={{ marginTop: "0.6rem", border: `1px solid ${verdictColor(result.verdict)}55`, borderRadius: 10, overflow: "hidden" }}>
          <div style={{ background: verdictColor(result.verdict), color: "#fff", padding: "0.35rem 0.7rem", fontSize: "0.73rem", fontWeight: 700, display: "flex", justifyContent: "space-between", gap: 8 }}>
            <span>{result.verdict}</span>
            {result.wordCount != null && <span style={{ opacity: 0.85 }}>{result.wordCount} từ</span>}
          </div>
          <div style={{ padding: "0.6rem 0.7rem" }}>
            {result.summary && <div style={{ fontSize: "0.75rem", color: C.ink, lineHeight: 1.6, marginBottom: "0.5rem" }}>{result.summary}</div>}

            {result.criteria?.map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 6, marginBottom: "0.3rem", fontSize: "0.71rem", lineHeight: 1.5 }}>
                <span style={{ flexShrink: 0, color: c.ok ? C.green : C.red, fontWeight: 700 }}>{c.ok ? "✓" : "✗"}</span>
                <span><b style={{ color: C.ink }}>{c.name}</b> — <span style={{ color: C.gray }}>{c.comment}</span></span>
              </div>
            ))}

            {result.errors?.length > 0 && (
              <div style={{ marginTop: "0.5rem" }}>
                <div style={{ fontSize: "0.6rem", fontWeight: 700, color: C.gray, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3rem" }}>Lỗi cần sửa</div>
                {result.errors.map((e, i) => (
                  <div key={i} style={{ background: C.redL, borderRadius: 8, padding: "0.35rem 0.55rem", marginBottom: "0.28rem", fontSize: "0.71rem", lineHeight: 1.55 }}>
                    <span style={{ textDecoration: "line-through", color: C.red, fontFamily: "Georgia,serif" }}>{e.original}</span>
                    <span style={{ color: C.gray }}> → </span>
                    <span style={{ color: C.green, fontWeight: 600, fontFamily: "Georgia,serif" }}>{e.correction}</span>
                    {e.explanation && <div style={{ color: C.gray, marginTop: 2 }}>{e.explanation}</div>}
                  </div>
                ))}
              </div>
            )}

            {result.corrected && (
              <div style={{ marginTop: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: "0.25rem" }}>
                  <span style={{ fontSize: "0.6rem", fontWeight: 700, color: C.green, textTransform: "uppercase", letterSpacing: "0.08em" }}>Bài đã sửa</span>
                  <SpeakBtn text={result.corrected} size="0.64rem" />
                </div>
                <div style={{ background: C.greenL, borderRadius: 8, padding: "0.45rem 0.6rem", fontSize: "0.75rem", color: C.ink, lineHeight: 1.7, fontFamily: "Georgia,serif" }}>
                  {result.corrected}
                </div>
              </div>
            )}

            {result.tip && (
              <div style={{ marginTop: "0.5rem", fontSize: "0.71rem", color: C.gold, lineHeight: 1.55 }}>💡 {result.tip}</div>
            )}
          </div>
        </div>
      )}

      {/* ── Model answer, deliberately behind a reveal ── */}
      <button
        onClick={() => setShown(s => !s)}
        style={{
          marginTop: "0.6rem", background: shown ? `${color}18` : C.cream,
          border: `1px solid ${color}55`, borderRadius: 20,
          padding: "0.22rem 0.75rem", fontSize: "0.68rem", fontWeight: 700,
          color: C.ink, cursor: "pointer", fontFamily: "inherit",
        }}>
        {shown ? "Ẩn bài mẫu ▲" : "📄 Xem bài mẫu của sách ▼"}
      </button>

      {shown && (
        <div style={{
          marginTop: "0.55rem", background: C.cream, borderRadius: 9,
          padding: "0.6rem 0.7rem", fontSize: "0.76rem", color: C.ink,
          lineHeight: 1.7, fontFamily: "Georgia,serif",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: "0.35rem" }}>
            <span style={{ fontSize: "0.58rem", fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'JetBrains Mono',monospace" }}>
              Exemple de production · Corrigés p.155
            </span>
            <SpeakBtn text={p.model} size="0.66rem" />
          </div>
          {p.model}
        </div>
      )}
      <div style={{ marginTop: "0.5rem", fontSize: "0.62rem", color: C.gray2 }}>
        💡 Tự làm và nhờ AI chấm trước, rồi mới mở bài mẫu để so.
      </div>
    </div>
  );
}

export default function DelfA2Panel({
  onBackToParcours,
  units  = PARCOURS_UNITS_A2,
  audio  = EDITO_AUDIO_A2,
  cahier = CAHIER_A2,
}) {
  const [unitId,       setUnitId]       = useState(units[0]?.id || null);
  const [fromParcours, setFromParcours] = useState(false);
  const [, setTick] = useState(0);
  const refresh = () => setTick(t => t + 1);

  useEffect(() => {
    if (localStorage.getItem("parcours_back")) {
      setFromParcours(true);
      localStorage.removeItem("parcours_back");
    }
    const idx = localStorage.getItem("parcours_unit_idx");
    if (idx !== null) {
      const u = units[Number(idx)];
      if (u) setUnitId(u.id);
      localStorage.removeItem("parcours_unit_idx");
    }
  }, [units]);

  const unit = units.find(u => u.id === unitId) || units[0];
  const delf = cahier?.[unitId]?.delf;
  // Only used to key progress: the DELF card scores under the livre's DELF
  // listening sub-lesson so the unit tally stays at 38.
  const coTrack = (audio?.[unitId] || []).find(t => t.section === "DELF");

  // Progress rides on the same sub-lesson the écoute step used, so the unit
  // tally is unchanged by moving DELF onto its own screen.
  const isDone = coTrack ? !!getSubDone(unitId, "ecouter")[coTrack.id] : false;

  if (!unit) return null;

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${C.heroFrom} 0%, ${C.heroTo} 100%)`, padding: "0.9rem 1rem 0.85rem" }}>
        {fromParcours && onBackToParcours && (
          <button onClick={onBackToParcours}
            style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer", padding: "0.2rem 0.65rem", borderRadius: 20, marginBottom: "0.6rem", fontFamily: "inherit" }}>
            ← Parcours
          </button>
        )}
        <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1.15rem", color: "#fff", fontWeight: 800, lineHeight: 1.1 }}>
          🎓 DELF A2 blanc
        </div>
        <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.65)", marginTop: 4 }}>
          Unité {unit.num} · {unit.fr} — 4 kỹ năng thi thật
        </div>
      </div>

      <div style={{ padding: "0.85rem 1rem 4rem" }}>

        {/* 1 — Compréhension de l'oral (livre) */}
        {delf?.coLivre?.length > 0 && (
          <section style={{ marginBottom: "1.2rem" }}>
            <SkillHeader tag="CO" title="Compréhension de l'oral — Livre" points="6 points" color={SKILL_COLORS.CO} />
            <CahierExercises exercises={delf.coLivre} color={SKILL_COLORS.CO} defaultOpen />
          </section>
        )}

        {/* 1b — the cahier's own listening exam */}
        {delf?.co?.length > 0 && (
          <section style={{ marginBottom: "1.2rem" }}>
            <SkillHeader tag="CO" title="Compréhension de l'oral — Cahier" points="6 points" color={SKILL_COLORS.CO} />
            <CahierExercises exercises={delf.co} color={SKILL_COLORS.CO} defaultOpen />
          </section>
        )}

        {/* 2 — Compréhension des écrits */}
        {delf?.ce?.length > 0 && (
          <section style={{ marginBottom: "1.2rem" }}>
            <SkillHeader tag="CE" title="Compréhension des écrits" points="6 points" color={SKILL_COLORS.CE} />
            <CahierExercises exercises={delf.ce} color={SKILL_COLORS.CE} defaultOpen />
          </section>
        )}

        {/* 3 & 4 — Production */}
        {delf?.production?.map((p, i) => (
          <section key={i} style={{ marginBottom: "1.2rem" }}>
            <SkillHeader
              tag={p.skill.includes("écrite") ? "PE" : "PO"}
              title={p.skill}
              points={p.points}
              color={p.skill.includes("écrite") ? SKILL_COLORS.PE : SKILL_COLORS.PO}
            />
            <ProductionCard p={p} color={p.skill.includes("écrite") ? SKILL_COLORS.PE : SKILL_COLORS.PO} />
          </section>
        ))}

        {/* Done */}
        {coTrack && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.5rem" }}>
            {isDone ? (
              <>
                <span style={{ background: C.green, color: "#fff", borderRadius: 20, padding: "0.15rem 0.6rem", fontSize: "0.66rem", fontWeight: 700 }}>✓ Đã làm</span>
                <button onClick={() => { unmarkSubDone(unitId, "ecouter", coTrack.id); refresh(); }}
                  style={{ background: C.white, color: C.green, border: `1px solid ${C.green}66`, borderRadius: 20, padding: "0.15rem 0.6rem", fontSize: "0.66rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  ↻ Làm lại
                </button>
              </>
            ) : (
              <button onClick={() => { markSubDone(unitId, "ecouter", coTrack.id); refresh(); }}
                style={{ background: C.white, color: C.blue, border: `1.5px solid ${C.blue}66`, borderRadius: 20, padding: "0.25rem 0.8rem", fontSize: "0.7rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                ✓ Đánh dấu đã làm xong
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
