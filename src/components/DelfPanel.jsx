import { useState } from "react";
import { C } from "../constants.js";
import {
  DELF_ECRITE, DELF_ORALE,
  DELF_PRATIQUE_ORALE, DELF_ECRITE_SUJETS, ECHANGE_POOL,
} from "../data/delfA1.js";
import { gradeDelfQuestion, gradeDelfEssai } from "../utils/api.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import AccentBar from "./ui/AccentBar.jsx";
import Spinner from "./ui/Spinner.jsx";

// ── small UI atoms ───────────────────────────────────────────────
const mono = { fontFamily: "'JetBrains Mono',monospace" };
const serif = { fontFamily: "'Playfair Display',Georgia,serif" };

function Pts({ children }) {
  return (
    <span style={{ ...mono, fontSize: 10.5, fontWeight: 700, color: C.accent,
      background: C.accentL, border: `1px solid ${C.accent}44`,
      borderRadius: 999, padding: "2px 8px", whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function Card({ children, tint }) {
  return (
    <div style={{ background: C.white, border: `1.5px solid ${tint || C.border}`,
      borderRadius: 14, padding: "14px 15px", marginBottom: 12 }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ ...mono, fontSize: 10.5, fontWeight: 700, color: C.gray,
      letterSpacing: "0.12em", textTransform: "uppercase", margin: "18px 0 9px" }}>
      {children}
    </div>
  );
}

function Astuces({ items }) {
  if (!items?.length) return null;
  return (
    <div style={{ background: C.goldL, border: `1px solid ${C.gold}44`,
      borderRadius: 10, padding: "9px 11px", marginTop: 10 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, marginBottom: 4 }}>💡 Lưu ý</div>
      <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, color: C.ink2, lineHeight: 1.6 }}>
        {items.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    </div>
  );
}

// A French line with a tap-to-listen speaker button
function FrLine({ text, vi }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 5 }}>
      <SpeakBtn text={text.replace(/^[—-]\s*/, "")} size={13} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: 12.5, color: C.ink, lineHeight: 1.45 }}>{text}</span>
        {vi && <span style={{ fontSize: 11, color: C.gray, display: "block" }}>{vi}</span>}
      </div>
    </div>
  );
}

// Price table (jeu de rôle)
function PrixTable({ rows }) {
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 9, overflow: "hidden", margin: "6px 0" }}>
      <div style={{ ...mono, fontSize: 9.5, fontWeight: 700, color: C.gray, letterSpacing: "0.1em",
        background: C.borderSoft + "88", padding: "5px 10px", textTransform: "uppercase" }}>💶 Bảng giá (document examinateur)</div>
      {rows.map((r, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 8, padding: "6px 10px",
          borderTop: `1px solid ${C.borderSoft}` }}>
          <span style={{ fontSize: 12, color: C.ink }}>{r.item}</span>
          <span style={{ ...mono, fontSize: 11.5, fontWeight: 700, color: C.green, whiteSpace: "nowrap" }}>{r.prix}</span>
        </div>
      ))}
    </div>
  );
}

// Obligatoire chips
function ObligChips({ items }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, margin: "8px 0" }}>
      {items.map((o, i) => (
        <span key={i} style={{ fontSize: 11, fontWeight: 600, color: C.blueDark,
          background: C.blueL, border: `1px solid ${C.blue}33`, borderRadius: 8, padding: "3px 8px" }}>
          {o}
        </span>
      ))}
    </div>
  );
}

// Collapsible "modèle" answer
function Modele({ text }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: 10 }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ background: open ? C.green : C.greenL, color: open ? "#fff" : C.green,
          border: `1.5px solid ${C.green}66`, borderRadius: 20, padding: "5px 12px",
          fontSize: 11.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
        {open ? "▾ Ẩn bài mẫu" : "▸ Xem bài mẫu"}
      </button>
      {open && (
        <div style={{ background: C.greenL, border: `1px solid ${C.green}44`,
          borderRadius: 10, padding: "11px 12px", marginTop: 8, position: "relative" }}>
          <div style={{ position: "absolute", top: 8, right: 8 }}>
            <SpeakBtn text={text} size={15} />
          </div>
          <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontSize: 12.5, color: C.ink,
            lineHeight: 1.55, fontFamily: "inherit" }}>{text}</pre>
        </div>
      )}
    </div>
  );
}

// ── Partie 2 interactive — bốc 6 từ, tự đặt câu hỏi, AI chấm ──────
const VERDICT_STYLE = {
  correct: { color: C.green, bg: C.greenL, label: "✓ Đúng" },
  close:   { color: C.gold,  bg: C.goldL,  label: "≈ Gần đúng" },
  wrong:   { color: C.red || "#DC2626", bg: C.redL || "#FEF2F2", label: "✗ Chưa đúng" },
};

function draw6() {
  const a = [...ECHANGE_POOL];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a.slice(0, 6);
}

function EchangeCard({ mot }) {
  const [val, setVal] = useState("");
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState(null);
  const [err, setErr] = useState("");

  const check = async () => {
    if (!val.trim() || busy) return;
    setBusy(true); setErr(""); setRes(null);
    try { setRes(await gradeDelfQuestion({ theme: mot, userQuestion: val.trim() })); }
    catch (e) { setErr(e.message || "Lỗi, thử lại."); }
    finally { setBusy(false); }
  };

  const vs = res && (VERDICT_STYLE[res.verdict] || VERDICT_STYLE.close);

  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 11, padding: "10px 11px", background: C.white }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: C.gold, background: C.goldL,
          borderRadius: 7, padding: "3px 10px" }}>{mot} ?</span>
        <span style={{ fontSize: 10.5, color: C.gray }}>→ đặt 1 câu hỏi cho giám khảo</span>
      </div>
      <textarea
        value={val} onChange={e => setVal(e.target.value)}
        placeholder="Ví dụ: Est-ce que vous…"
        rows={2}
        style={{ width: "100%", boxSizing: "border-box", resize: "vertical",
          border: `1.5px solid ${C.border}`, borderRadius: 9, padding: "7px 9px",
          fontSize: 13, fontFamily: "inherit", color: C.ink, background: C.paper || C.white }} />
      <div style={{ margin: "3px 0 6px" }}><AccentBar compact /></div>
      <button onClick={check} disabled={busy || !val.trim()}
        style={{ background: busy || !val.trim() ? C.border : C.gold, color: busy || !val.trim() ? C.gray : "#fff",
          border: "none", borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 700,
          cursor: busy || !val.trim() ? "default" : "pointer", fontFamily: "inherit",
          display: "inline-flex", alignItems: "center", gap: 6 }}>
        {busy ? <><Spinner size={13} /> Đang chấm…</> : "Kiểm tra ✦"}
      </button>
      {err && <div style={{ fontSize: 11.5, color: C.red || "#DC2626", marginTop: 6 }}>{err}</div>}
      {res && (
        <div style={{ marginTop: 8, background: vs.bg, border: `1px solid ${vs.color}55`,
          borderRadius: 9, padding: "8px 10px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: vs.color, marginBottom: 3 }}>{vs.label}</div>
          {res.feedback && <div style={{ fontSize: 12, color: C.ink2, lineHeight: 1.5 }}>{res.feedback}</div>}
          {res.verdict !== "correct" && res.correction && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginTop: 5,
              fontSize: 12.5, color: C.ink }}>
              <SpeakBtn text={res.correction} size={13} />
              <span><b style={{ color: C.green }}>Gợi ý:</b> {res.correction}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function EchangeInteractive() {
  const [words, setWords] = useState(draw6);
  const [k, setK] = useState(0); // remount inputs on redraw
  const redraw = () => { setWords(draw6()); setK(x => x + 1); };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 11.5, color: C.gray }}>🎲 6 thẻ ngẫu nhiên (như bốc bài thật)</span>
        <button onClick={redraw}
          style={{ background: C.white, color: C.gold, border: `1.5px solid ${C.gold}66`,
            borderRadius: 20, padding: "4px 11px", fontSize: 11.5, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit" }}>↻ Bốc 6 từ khác</button>
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {words.map((m, i) => <EchangeCard key={`${k}-${i}`} mot={m} />)}
      </div>
    </div>
  );
}

// ── Essai grader — ô viết + AccentBar + AI chấm ──────────────────
function EssaiGrader({ consigne, obligatoire, minWords = 40 }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState(null);
  const [err, setErr] = useState("");
  const wc = text.trim() ? text.trim().split(/\s+/).length : 0;

  const grade = async () => {
    if (wc < 10 || busy) return;
    setBusy(true); setErr(""); setRes(null);
    try { setRes(await gradeDelfEssai({ consigne, obligatoire, minWords, userText: text.trim() })); }
    catch (e) { setErr(e.message || "Lỗi, thử lại."); }
    finally { setBusy(false); }
  };

  const gcolor = res ? (res.score >= 78 ? C.green : res.score >= 55 ? C.gold : (C.red || "#DC2626")) : C.gray;

  return (
    <div style={{ marginTop: 10, borderTop: `1px dashed ${C.border}`, paddingTop: 10 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.gray, marginBottom: 5 }}>✍️ Viết bài của bạn:</div>
      <textarea
        value={text} onChange={e => setText(e.target.value)}
        placeholder="Salut …"
        rows={6}
        style={{ width: "100%", boxSizing: "border-box", resize: "vertical",
          border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "9px 11px",
          fontSize: 13.5, fontFamily: "Georgia,serif", color: C.ink, lineHeight: 1.6, background: C.paper || C.white }} />
      <div style={{ margin: "4px 0" }}><AccentBar /></div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={grade} disabled={busy || wc < 10}
          style={{ background: busy || wc < 10 ? C.border : C.green, color: busy || wc < 10 ? C.gray : "#fff",
            border: "none", borderRadius: 22, padding: "7px 16px", fontSize: 12.5, fontWeight: 700,
            cursor: busy || wc < 10 ? "default" : "pointer", fontFamily: "inherit",
            display: "inline-flex", alignItems: "center", gap: 6 }}>
          {busy ? <><Spinner size={14} /> AI đang chấm…</> : "Chấm bài với AI ✦"}
        </button>
        <span style={{ fontSize: 11.5, color: wc >= minWords ? C.green : C.gray, fontWeight: 600 }}>
          {wc} từ {wc < minWords ? `(cần ≥ ${minWords})` : "✓"}
        </span>
      </div>
      {err && <div style={{ fontSize: 12, color: C.red || "#DC2626", marginTop: 7 }}>{err}</div>}
      {res && (
        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8, animation: "fadeUp 0.3s ease" }}>
          {/* score hero */}
          <div style={{ display: "flex", alignItems: "center", gap: 12,
            background: `${gcolor}0F`, border: `1.5px solid ${gcolor}44`, borderRadius: 14, padding: "10px 12px" }}>
            <div style={{ width: 54, height: 54, borderRadius: "50%", flexShrink: 0,
              background: `${gcolor}22`, border: `2.5px solid ${gcolor}66`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ ...serif, fontSize: 17, fontWeight: 800, color: gcolor, lineHeight: 1 }}>{res.score}</span>
              <span style={{ fontSize: 8, color: gcolor, opacity: 0.7 }}>/100</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ ...serif, fontSize: 15, fontWeight: 700, color: gcolor }}>{res.verdict}</div>
              {res.tip && <div style={{ fontSize: 12, color: C.gray, lineHeight: 1.5, marginTop: 2 }}>{res.tip}</div>}
            </div>
          </div>
          {/* checklist */}
          {res.checklist?.length > 0 && (
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 11px" }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: C.gray, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>Yêu cầu bắt buộc</div>
              {res.checklist.map((c, i) => (
                <div key={i} style={{ fontSize: 12.5, color: C.ink, lineHeight: 1.7 }}>
                  <span style={{ color: c.ok ? C.green : (C.red || "#DC2626"), fontWeight: 700 }}>{c.ok ? "✓" : "✗"}</span> {c.item}
                </div>
              ))}
            </div>
          )}
          {/* errors */}
          {res.errors?.length > 0 && (
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 11px" }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: C.gray, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>Lỗi cần sửa</div>
              {res.errors.map((e, i) => (
                <div key={i} style={{ fontSize: 12.5, lineHeight: 1.6, marginBottom: 3 }}>
                  <span style={{ fontSize: 9.5, color: C.gold, background: C.goldL, borderRadius: 5, padding: "1px 5px", marginRight: 5 }}>{e.type}</span>
                  <span style={{ color: C.red || "#DC2626", textDecoration: "line-through" }}>{e.wrong}</span>
                  <span style={{ color: C.gray }}> → </span>
                  <span style={{ color: C.green, fontWeight: 600 }}>{e.right}</span>
                </div>
              ))}
            </div>
          )}
          {/* corrected */}
          {res.corrected && (
            <div style={{ background: C.greenL, border: `1.5px solid ${C.green}`, borderRadius: 12, padding: "9px 11px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: C.green, textTransform: "uppercase", letterSpacing: "0.08em" }}>✓ Bản sửa gợi ý</span>
                <SpeakBtn text={res.corrected} size={15} />
              </div>
              <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontFamily: "Georgia,serif", fontSize: 13, color: C.ink, lineHeight: 1.6 }}>{res.corrected}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── ÉCRITE view ──────────────────────────────────────────────────
function EcriteView() {
  return (
    <div>
      <p style={{ fontSize: 12.5, color: C.ink2, lineHeight: 1.6, margin: "4px 0 4px" }}>
        {DELF_ECRITE.intro}
      </p>
      <div style={{ fontSize: 11.5, color: C.gray, marginBottom: 4 }}>
        Tổng <b style={{ color: C.accent }}>{DELF_ECRITE.totalPts} điểm</b> · {DELF_ECRITE.duree}
      </div>

      {DELF_ECRITE.exercices.map(ex => (
        <Card key={ex.id} tint={C.accent + "55"}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
            <div>
              <div style={{ ...serif, fontWeight: 700, fontSize: 15, color: C.ink }}>{ex.titre}</div>
              <div style={{ fontSize: 11.5, color: C.gray }}>{ex.titreVi}</div>
            </div>
            <Pts>{ex.pts} pts</Pts>
          </div>

          <div style={{ background: C.cream, borderRadius: 9, padding: "9px 11px", marginBottom: 8 }}>
            <div style={{ fontSize: 12.5, color: C.ink, fontStyle: "italic", lineHeight: 1.5 }}>« {ex.consigne} »</div>
            <div style={{ fontSize: 11.5, color: C.gray, marginTop: 4 }}>{ex.consigneVi}</div>
          </div>

          {ex.type === "form" && (
            <div style={{ border: `1px solid ${C.border}`, borderRadius: 9, overflow: "hidden" }}>
              {ex.champs.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 8, padding: "7px 10px",
                  borderBottom: i < ex.champs.length - 1 ? `1px solid ${C.borderSoft}` : "none",
                  background: i % 2 ? C.white : C.borderSoft + "55" }}>
                  <div style={{ flex: "0 0 42%", minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.ink }}>{c.fr}</div>
                    <div style={{ fontSize: 10.5, color: C.gray }}>{c.vi}</div>
                  </div>
                  <div style={{ flex: 1, fontSize: 12, color: C.blue, alignSelf: "center" }}>{c.ex}</div>
                </div>
              ))}
            </div>
          )}

          {ex.type === "essai" && (
            <>
              {ex.obligatoire && (
                <>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.gray, marginBottom: 2 }}>Bắt buộc nêu:</div>
                  <ObligChips items={ex.obligatoire} />
                </>
              )}
              {ex.plan && (
                <div style={{ marginTop: 4 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.gray, marginBottom: 4 }}>Dàn ý:</div>
                  <ol style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: C.ink2, lineHeight: 1.6 }}>
                    {ex.plan.map((p, i) => <li key={i}>{p}</li>)}
                  </ol>
                </div>
              )}
              {ex.grammaire && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
                  {ex.grammaire.map((g, i) => (
                    <span key={i} style={{ fontSize: 10.5, color: C.purple, background: C.purpleL,
                      border: `1px solid ${C.purple}33`, borderRadius: 7, padding: "2px 7px" }}>⚜️ {g}</span>
                  ))}
                </div>
              )}
              {ex.modele && <Modele text={ex.modele} />}
              {ex.obligatoire && (
                <EssaiGrader consigne={ex.consigne} obligatoire={ex.obligatoire} minWords={40} />
              )}
            </>
          )}

          <Astuces items={ex.astuces} />
        </Card>
      ))}
    </div>
  );
}

// ── ORALE view ───────────────────────────────────────────────────
function OraleView() {
  return (
    <div>
      <p style={{ fontSize: 12.5, color: C.ink2, lineHeight: 1.6, margin: "4px 0 4px" }}>
        {DELF_ORALE.intro}
      </p>
      <div style={{ fontSize: 11.5, color: C.gray, marginBottom: 4 }}>
        Tổng <b style={{ color: C.accent }}>{DELF_ORALE.totalPts} điểm</b> · {DELF_ORALE.preparation}
      </div>

      {DELF_ORALE.parties.map(p => (
        <Card key={p.id} tint={C.gold + "66"}>
          <div style={{ ...serif, fontWeight: 700, fontSize: 15, color: C.ink }}>{p.titre}</div>
          <div style={{ fontSize: 11.5, color: C.gray }}>{p.titreVi}</div>
          <div style={{ ...mono, fontSize: 10.5, color: C.gold, fontWeight: 700, margin: "4px 0 8px" }}>{p.duree}</div>
          <div style={{ fontSize: 12.5, color: C.ink2, lineHeight: 1.55, marginBottom: 8 }}>{p.desc}</div>

          {p.exemples && (
            <div style={{ background: C.cream, borderRadius: 9, padding: "9px 11px" }}>
              {p.exemples.map((e, i) => {
                const [fr, vi] = e.split(" — ");
                return <FrLine key={i} text={fr} vi={vi} />;
              })}
            </div>
          )}

          {p.id === "p2" && <EchangeInteractive />}

          {(p.sujet || p.dialogue) && (
            <div style={{ background: C.cream, borderRadius: 9, padding: "9px 11px" }}>
              {p.sujet && <div style={{ fontSize: 12, color: C.ink, fontWeight: 600, marginBottom: 6 }}>🥐 {p.sujet}</div>}
              {p.produits && (
                <div style={{ fontSize: 11, color: C.gray, marginBottom: 8 }}>
                  Sản phẩm: {p.produits.join(" · ")}
                </div>
              )}
              {p.prix && <PrixTable rows={p.prix} />}
              {p.dialogue && <Dialogue2 turns={p.dialogue} />}
              {p.hints && <Hints hints={p.hints} />}
            </div>
          )}

          <Astuces items={p.astuce ? [p.astuce] : null} />
        </Card>
      ))}
    </div>
  );
}

// ── PRATIQUE view (đề tương tự) ──────────────────────────────────
// Two-sided model dialogue (client ↔ examinateur), hidden until tapped
function Dialogue2({ turns }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: 4 }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ background: open ? C.blue : C.blueL, color: open ? "#fff" : C.blueDark,
          border: `1.5px solid ${C.blue}55`, borderRadius: 20, padding: "5px 13px",
          fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
        {open ? "▾ Ẩn hội thoại mẫu" : "💬 Xem hội thoại mẫu (hỏi ↔ đáp)"}
      </button>
      {open && <Dialogue2Body turns={turns} />}
    </div>
  );
}

function Dialogue2Body({ turns }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
      {turns.map((t, i) => {
        const isClient = t.who === "c";
        return (
          <div key={i} style={{ display: "flex", justifyContent: isClient ? "flex-start" : "flex-end" }}>
            <div style={{ maxWidth: "85%", display: "flex", alignItems: "flex-start", gap: 5,
              flexDirection: isClient ? "row" : "row-reverse" }}>
              <SpeakBtn text={t.fr} size={13} />
              <div style={{
                background: isClient ? C.blueL : C.goldL,
                border: `1px solid ${isClient ? C.blue + "44" : C.gold + "44"}`,
                borderRadius: 10, padding: "6px 10px" }}>
                <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "0.06em",
                  color: isClient ? C.blue : C.gold, marginBottom: 1 }}>
                  {isClient ? "VOUS (client)" : "EXAMINATEUR"}
                </div>
                <div style={{ fontSize: 12.5, color: C.ink, lineHeight: 1.45 }}>{t.fr}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Hints button + panel (verbes, vocab, questions)
function Hints({ hints }) {
  const [open, setOpen] = useState(false);
  if (!hints) return null;
  return (
    <div style={{ marginTop: 8 }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ background: open ? C.purple : C.purpleL, color: open ? "#fff" : C.purple,
          border: `1.5px solid ${C.purple}55`, borderRadius: 20, padding: "5px 13px",
          fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
        {open ? "▾ Ẩn gợi ý" : "💡 Gợi ý từ vựng & câu hỏi"}
      </button>
      {open && (
        <div style={{ marginTop: 8, background: C.purpleL, border: `1px solid ${C.purple}33`,
          borderRadius: 11, padding: "11px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
          {hints.verbes?.length > 0 && (
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: C.purple, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>🖊️ Động từ nên dùng</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {hints.verbes.map((v, i) => (
                  <span key={i} style={{ fontSize: 11.5, color: C.ink, background: C.white,
                    border: `1px solid ${C.border}`, borderRadius: 7, padding: "2px 8px" }}>{v}</span>
                ))}
              </div>
            </div>
          )}
          {hints.vocab?.length > 0 && (
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: C.purple, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>📖 Từ vựng chủ đề</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 10px" }}>
                {hints.vocab.map((w, i) => (
                  <div key={i} style={{ fontSize: 11.5, color: C.ink, lineHeight: 1.5 }}>
                    <b>{w.fr}</b> <span style={{ color: C.gray }}>· {w.vi}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {hints.questions?.length > 0 && (
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: C.purple, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>❓ Câu có thể hỏi</div>
              {hints.questions.map((q, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 5, marginBottom: 3 }}>
                  <SpeakBtn text={q} size={12} />
                  <span style={{ fontSize: 12, color: C.ink, lineHeight: 1.45 }}>{q}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PratiqueCard({ item }) {
  return (
    <Card tint={C.green + "55"}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 4 }}>
        <div>
          <div style={{ ...serif, fontWeight: 700, fontSize: 14.5, color: C.ink }}>{item.titre}</div>
          <div style={{ fontSize: 11.5, color: C.gray }}>{item.titreVi}</div>
        </div>
        {item.partie && (
          <span style={{ ...mono, fontSize: 9.5, fontWeight: 700, color: C.green,
            background: C.greenL, borderRadius: 999, padding: "2px 7px", whiteSpace: "nowrap" }}>{item.partie}</span>
        )}
      </div>

      <div style={{ background: C.cream, borderRadius: 9, padding: "9px 11px", margin: "6px 0" }}>
        <div style={{ fontSize: 12.5, color: C.ink, fontStyle: "italic", lineHeight: 1.5 }}>« {item.consigne} »</div>
        <div style={{ fontSize: 11.5, color: C.gray, marginTop: 4 }}>{item.consigneVi}</div>
      </div>

      {item.obligatoire && <ObligChips items={item.obligatoire} />}

      {item.champs && (
        <div style={{ border: `1px solid ${C.border}`, borderRadius: 9, overflow: "hidden" }}>
          {item.champs.map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 8, padding: "6px 10px",
              borderBottom: i < item.champs.length - 1 ? `1px solid ${C.borderSoft}` : "none" }}>
              <div style={{ flex: "0 0 42%" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.ink }}>{c.fr}</span>
                <span style={{ fontSize: 10.5, color: C.gray, display: "block" }}>{c.vi}</span>
              </div>
              <div style={{ flex: 1, fontSize: 12, color: C.blue, alignSelf: "center" }}>{c.ex}</div>
            </div>
          ))}
        </div>
      )}

      {item.exemples && (
        <div style={{ background: C.cream, borderRadius: 9, padding: "9px 11px" }}>
          {item.exemples.map((e, i) => {
            const [fr, vi] = e.split(" — ");
            return <FrLine key={i} text={fr} vi={vi} />;
          })}
        </div>
      )}

      {item.cartes && (
        <div style={{ display: "grid", gap: 6 }}>
          {item.cartes.map((c, i) => (
            <div key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 9, padding: "8px 10px" }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: C.gold,
                background: C.goldL, borderRadius: 6, padding: "2px 8px", marginRight: 6 }}>{c.mot}</span>
              <FrLine text={c.q} />
            </div>
          ))}
        </div>
      )}

      {item.prix && <PrixTable rows={item.prix} />}

      {item.dialogue && <Dialogue2 turns={item.dialogue} />}

      {item.hints && <Hints hints={item.hints} />}

      {item.modele && <Modele text={item.modele} />}
    </Card>
  );
}

// Back link used inside the practice detail views
function BackBtn({ onClick, children }) {
  return (
    <button onClick={onClick}
      style={{ background: C.white, color: C.gray, border: `1.5px solid ${C.border}`,
        borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 600,
        cursor: "pointer", fontFamily: "inherit", marginBottom: 12 }}>
      ← {children}
    </button>
  );
}

// A row of selectable "chips" to pick a subject
function PickerGrid({ items, selected, onPick, color }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 14 }}>
      {items.map((it, i) => {
        const active = selected === i;
        return (
          <button key={i} onClick={() => onPick(i)}
            style={{ textAlign: "left", padding: "9px 11px", borderRadius: 11, cursor: "pointer",
              fontFamily: "inherit", background: active ? color : C.white,
              border: `1.5px solid ${active ? color : C.border}`,
              boxShadow: active ? `0 2px 8px ${color}33` : "none", transition: "all 0.12s" }}>
            <div style={{ ...mono, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em",
              color: active ? "rgba(255,255,255,0.8)" : C.gray2 }}>{it.tag}</div>
            <div style={{ fontSize: 12.5, fontWeight: 700, lineHeight: 1.25, marginTop: 2,
              color: active ? "#fff" : C.ink }}>{it.label}</div>
          </button>
        );
      })}
    </div>
  );
}

// Consolidated Ex.1 explainer — most formulaires share the same identity block
function Ex1Summary() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: C.blueL, border: `1.5px solid ${C.blue}44`, borderRadius: 12, padding: "11px 13px", marginBottom: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: C.blueDark, marginBottom: 3 }}>📋 Exercice 1 · Điền phiếu (10đ)</div>
      <div style={{ fontSize: 12, color: C.ink2, lineHeight: 1.55 }}>
        Hầu hết các đề chỉ điền <b>thông tin cá nhân</b> giống nhau — học 1 lần là làm được mọi đề:
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, margin: "7px 0" }}>
        {["Nom", "Prénom", "Date de naissance", "Nationalité", "Adresse", "Profession", "Téléphone", "Date"].map(c => (
          <span key={c} style={{ fontSize: 11, color: C.blueDark, background: C.white,
            border: `1px solid ${C.blue}33`, borderRadius: 7, padding: "3px 8px" }}>{c}</span>
        ))}
      </div>
      <button onClick={() => setOpen(o => !o)}
        style={{ background: "transparent", color: C.blue, border: "none", cursor: "pointer",
          fontFamily: "inherit", fontSize: 11.5, fontWeight: 700, padding: 0 }}>
        {open ? "▾ Ẩn trường đặc biệt từng đề" : "▸ Trường đặc biệt khác nhau theo đề"}
      </button>
      {open && (
        <div style={{ marginTop: 7, border: `1px solid ${C.blue}33`, borderRadius: 9, overflow: "hidden" }}>
          {DELF_ECRITE_SUJETS.map((s, i) => (
            <div key={s.id} style={{ display: "flex", gap: 8, padding: "6px 10px",
              background: i % 2 ? C.white : "transparent",
              borderTop: i ? `1px solid ${C.blue}22` : "none" }}>
              <span style={{ flex: "0 0 30%", fontSize: 11, fontWeight: 700, color: C.blueDark }}>Sujet {s.num}</span>
              <span style={{ flex: 1, fontSize: 11, color: C.ink2 }}>{s.formulaire.special}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Detail: one écrite subject (Ex.2 + AI grader)
function EcritDetail({ s }) {
  return (
    <div style={{ animation: "fadeUp 0.25s ease" }}>
      <div style={{ ...serif, fontWeight: 700, fontSize: 16, color: C.ink }}>{s.titre}</div>
      <div style={{ fontSize: 12, color: C.gray, marginBottom: 8 }}>{s.titreVi}</div>
      <div style={{ ...mono, fontSize: 9.5, fontWeight: 700, color: C.accent, marginBottom: 3 }}>EX.2 · VIẾT (15đ · ≥40 từ)</div>
      <div style={{ background: C.cream, borderRadius: 9, padding: "9px 11px", marginBottom: 6 }}>
        <div style={{ fontSize: 12.5, color: C.ink, fontStyle: "italic", lineHeight: 1.5 }}>« {s.ex2.consigne} »</div>
        <div style={{ fontSize: 11.5, color: C.gray, marginTop: 4 }}>{s.ex2.consigneVi}</div>
      </div>
      <ObligChips items={s.ex2.obligatoire} />
      {s.ex2.modele && <Modele text={s.ex2.modele} />}
      <EssaiGrader consigne={s.ex2.consigne} obligatoire={s.ex2.obligatoire} minWords={40} />
    </div>
  );
}

function PratiqueView() {
  const [skill, setSkill] = useState(null);   // null | "ecrite" | "orale"
  const [pick, setPick] = useState(null);     // selected index

  // Level 0 — choose skill
  if (!skill) {
    return (
      <div>
        <p style={{ fontSize: 12, color: C.gray, lineHeight: 1.6, margin: "4px 0 14px" }}>
          Đề chính thức DELF A1 (France Éducation International). Chọn kỹ năng để luyện:
        </p>
        <div style={{ display: "grid", gap: 10 }}>
          <button onClick={() => { setSkill("ecrite"); setPick(null); }}
            style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px",
              background: `linear-gradient(135deg, ${C.green}, #059669)`, border: "none",
              borderRadius: 16, cursor: "pointer", fontFamily: "inherit", textAlign: "left",
              boxShadow: `0 4px 16px ${C.green}33` }}>
            <span style={{ fontSize: 30 }}>✍️</span>
            <div style={{ flex: 1 }}>
              <div style={{ ...serif, fontSize: 17, fontWeight: 700, color: "#fff" }}>Viết</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)" }}>{DELF_ECRITE_SUJETS.length} đề · ô viết + AI chấm điểm</div>
            </div>
            <span style={{ fontSize: 20, color: "rgba(255,255,255,0.8)" }}>→</span>
          </button>
          <button onClick={() => { setSkill("orale"); setPick(null); }}
            style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px",
              background: `linear-gradient(135deg, ${C.gold}, #D97706)`, border: "none",
              borderRadius: 16, cursor: "pointer", fontFamily: "inherit", textAlign: "left",
              boxShadow: `0 4px 16px ${C.gold}33` }}>
            <span style={{ fontSize: 30 }}>🗣️</span>
            <div style={{ flex: 1 }}>
              <div style={{ ...serif, fontSize: 17, fontWeight: 700, color: "#fff" }}>Nói</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)" }}>{DELF_PRATIQUE_ORALE.length} tình huống đóng vai · bảng giá + hội thoại mẫu</div>
            </div>
            <span style={{ fontSize: 20, color: "rgba(255,255,255,0.8)" }}>→</span>
          </button>
        </div>
      </div>
    );
  }

  // Level 1/2 — écrite
  if (skill === "ecrite") {
    const items = DELF_ECRITE_SUJETS.map(s => ({ tag: `SUJET ${s.num}`, label: s.titreVi }));
    return (
      <div>
        <BackBtn onClick={() => setSkill(null)}>Chọn kỹ năng</BackBtn>
        <Ex1Summary />
        <SectionLabel>✍️ Exercice 2 · Chọn đề để viết</SectionLabel>
        <PickerGrid items={items} selected={pick} onPick={setPick} color={C.green} />
        {pick == null
          ? <div style={{ fontSize: 12, color: C.gray2, textAlign: "center", padding: "10px 0" }}>↑ Chọn một đề để bắt đầu viết</div>
          : <EcritDetail s={DELF_ECRITE_SUJETS[pick]} />}
      </div>
    );
  }

  // Level 1/2 — orale
  const items = DELF_PRATIQUE_ORALE.map(o => ({ tag: o.partie?.toUpperCase() || "", label: o.titreVi }));
  return (
    <div>
      <BackBtn onClick={() => setSkill(null)}>Chọn kỹ năng</BackBtn>
      <SectionLabel>🗣️ Jeu de rôle · Chọn tình huống</SectionLabel>
      <PickerGrid items={items} selected={pick} onPick={setPick} color={C.gold} />
      {pick == null
        ? <div style={{ fontSize: 12, color: C.gray2, textAlign: "center", padding: "10px 0" }}>↑ Chọn một tình huống để xem đề & hội thoại mẫu</div>
        : <PratiqueCard key={DELF_PRATIQUE_ORALE[pick].id} item={DELF_PRATIQUE_ORALE[pick]} />}
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────
const TABS = [
  { id: "ecrite",   label: "✍️ Viết",       emoji: "" },
  { id: "orale",    label: "🗣️ Nói",        emoji: "" },
  { id: "pratique", label: "🎯 Đề tương tự", emoji: "" },
];

export default function DelfPanel() {
  const [tab, setTab] = useState("ecrite");

  return (
    <div style={{ padding: "1rem", animation: "fadeUp 0.3s ease" }}>
      {/* hero */}
      <div style={{ background: `linear-gradient(135deg, ${C.heroFrom}, ${C.heroTo})`,
        borderRadius: 16, padding: "14px 16px", color: "#fff", marginBottom: 14 }}>
        <div style={{ ...mono, fontSize: 10, letterSpacing: "0.15em", opacity: 0.6 }}>DELF A1 · TOUT PUBLIC</div>
        <div style={{ ...serif, fontSize: 20, fontWeight: 700, marginTop: 2 }}>Production écrite & orale</div>
        <div style={{ fontSize: 11.5, opacity: 0.8, marginTop: 3 }}>
          Phân tích đề Viết & Nói theo chuẩn A1 · 🔊 chạm để nghe
        </div>
      </div>

      {/* tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ flex: 1, padding: "8px 6px", borderRadius: 10, cursor: "pointer",
              fontFamily: "inherit", fontSize: 12, fontWeight: 700,
              background: tab === t.id ? C.ink : C.white,
              color: tab === t.id ? "#fff" : C.gray,
              border: `1.5px solid ${tab === t.id ? C.ink : C.border}` }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "ecrite"   && <EcriteView />}
      {tab === "orale"    && <OraleView />}
      {tab === "pratique" && <PratiqueView />}
    </div>
  );
}
