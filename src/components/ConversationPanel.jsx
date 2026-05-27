import { useState, useEffect, useRef } from "react";
import { C } from "../constants.js";
import { callAIText } from "../utils/api.js";
import { awardXP } from "../utils/xp.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import { EDITO_A1_UNITS } from "../data/editoA1Units.js";

function buildEditoPrompt(unit, practice) {
  const phrases = practice.usefulPhrases?.length
    ? `\nUseful phrases the learner can use: ${practice.usefulPhrases.join(", ")}.` : "";
  return `You are a French conversation partner helping an A1 Vietnamese learner practice speaking.
Unit ${unit.unit}: "${unit.title}". Task: ${practice.task}${phrases}
Keep ALL your sentences very short and simple (A1 level, max 10 words).
After each learner reply, if there are any mistakes add a correction note prefixed EXACTLY with '💡' on its own line, in Vietnamese.
Start by briefly setting up the roleplay situation in French, then invite the learner to begin.`;
}

export const EDITO_SCENARIOS = [
  {
    id:"greet", label:"Saluer", icon:"🥐", desc:"Chào hỏi & giới thiệu",
    color:"#2980B9", bg:"#E8F4FD",
    phrases:["Bonjour !","Je m'appelle…","J'ai … ans.","Je suis vietnamien(ne).","Et vous ?","Enchanté(e) !"],
    prompt:"You are a friendly French person at a café. The learner is A1 level. Start with a simple greeting. Keep sentences very short and simple. After each learner reply, if there are mistakes put a correction note prefixed EXACTLY with '💡' on its own line. Then continue the conversation naturally.",
  },
  {
    id:"shop", label:"Faire les courses", icon:"🛍️", desc:"Mua sắm tại chợ",
    color:"#16A085", bg:"#E6FAF5",
    phrases:["Bonjour, je voudrais…","Combien ça coûte ?","Un kilo de…, s'il vous plaît.","C'est tout, merci.","Vous avez… ?"],
    prompt:"You are a French market vendor. The learner is A1 level. Start by greeting and asking what they need. Keep sentences very short. After each learner reply, if there are mistakes put a correction note prefixed EXACTLY with '💡' on its own line. Then respond as the vendor.",
  },
  {
    id:"cafe", label:"Au café", icon:"☕", desc:"Gọi đồ tại quán",
    color:"#E67E22", bg:"#FEF3E2",
    phrases:["Un café, s'il vous plaît.","Je voudrais un thé.","L'addition, s'il vous plaît.","C'est combien ?","Merci beaucoup !"],
    prompt:"You are a French waiter at a café. The learner is A1 level. Start by welcoming them. Keep sentences short. After each learner reply, if there are mistakes put a correction note prefixed EXACTLY with '💡' on its own line. Then respond as the waiter.",
  },
  {
    id:"school", label:"À l'école", icon:"📚", desc:"Nói chuyện tại trường",
    color:"#8E44AD", bg:"#F5EEFF",
    phrases:["Tu t'appelles comment ?","Tu es en quelle année ?","J'étudie le français.","C'est difficile !","On mange ensemble ?"],
    prompt:"You are a French classmate. The learner is A1 level. Start by introducing yourself and asking their name. Keep it simple. After each learner reply, if there are mistakes put a correction note prefixed EXACTLY with '💡' on its own line. Then continue chatting.",
  },
  {
    id:"direction", label:"Demander le chemin", icon:"🗺️", desc:"Hỏi đường trong phố",
    color:"#C0392B", bg:"#FDEDEC",
    phrases:["Excusez-moi !","Où est… ?","C'est loin ?","À gauche ou à droite ?","Merci, au revoir !"],
    prompt:"You are a French passerby in the street. The learner is A1 level. Wait for them to ask for directions. Give simple directions. After each reply, if there are mistakes put a correction note prefixed EXACTLY with '💡' on its own line.",
  },
  {
    id:"family", label:"La famille", icon:"🏡", desc:"Nói về gia đình",
    color:"#D35400", bg:"#FDEBD0",
    phrases:["J'ai … frères et sœurs.","Mon père s'appelle…","Ma mère est…","J'habite avec…","Tu as des frères ?"],
    prompt:"You are a friendly French neighbor. The learner is A1 level. Start by asking about their family. Keep questions short. After each learner reply, if there are mistakes put a correction note prefixed EXACTLY with '💡' on its own line. Then continue.",
  },
];

// ── Parse AI message ───────────────────────────────────────────
function parseAIMsg(text) {
  const lines = text.split("\n");
  const correctionLines = [];
  const suggestionLines = [];
  const mainLines = [];
  for (const line of lines) {
    if (line.startsWith("💡")) correctionLines.push(line.slice(1).trim());
    else if (line.startsWith("🌟")) suggestionLines.push(line.slice(1).trim());
    else mainLines.push(line);
  }
  return { main: mainLines.join("\n").trim(), correctionLines, suggestionLines };
}

// ── Hint instruction appended to every system prompt ───────────
const HINT_INSTR = "\nAt the end of EVERY response (including your first), on its own line, add a suggestion prefixed EXACTLY with '🌟' (no space before it): in Vietnamese, suggest how the learner can respond next, then show ONE short French example sentence in quotes. Example format: '🌟 Gợi ý: Bạn có thể trả lời \"Je m'appelle...\"'";

// ════════════════════════════════════════════════════════════════
export default function ConversationPanel({ onBackToParcours }) {
  const [scenario,       setScenario]       = useState(null);
  const [messages,       setMessages]       = useState([]);
  const [input,          setInput]          = useState("");
  const [loading,        setLoading]        = useState(false);
  const [err,            setErr]            = useState("");
  const [correcting,     setCorrecting]     = useState(null);
  const [inlineCorrects, setInlineCorrects] = useState({});
  const [mode,           setMode]           = useState("libre");
  const [selUnit,        setSelUnit]        = useState(0);
  const bottomRef = useRef(null);

  const [fromParcours, setFromParcours] = useState(false);

  useEffect(() => {
    const back = localStorage.getItem("parcours_back");
    if (back) { localStorage.removeItem("parcours_back"); setFromParcours(true); }
    const idx = localStorage.getItem("parcours_unit_idx");
    if (idx !== null) {
      setMode("edito");
      setSelUnit(Number(idx));
      localStorage.removeItem("parcours_unit_idx");
    }
  }, []);

  const startScenario = async (sc) => {
    setScenario(sc); setMessages([]); setInput(""); setErr(""); setLoading(true);
    try {
      const reply = await callAIText(
        [{ role:"user", content:"Commençons." }],
        sc.prompt + " The learner just said they are ready. Start the conversation now." + HINT_INSTR
      );
      setMessages([{ role:"assistant", text: reply }]);
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  const retry = async () => {
    setErr(""); setLoading(true);
    try {
      const apiMsgs = messages.map(m => ({ role: m.role, content: m.text }));
      const reply = await callAIText(apiMsgs, scenario.prompt + HINT_INSTR);
      setMessages(m => [...m, { role:"assistant", text: reply }]);
      awardXP(3);
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  const send = async (override) => {
    const txt = (override || input).trim();
    if (!txt || loading) return;
    const userMsg = { role:"user", text: txt };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs); setInput(""); setLoading(true);
    try {
      const apiMsgs = newMsgs.map(m => ({ role: m.role, content: m.text }));
      const reply = await callAIText(apiMsgs, scenario.prompt + HINT_INSTR);
      setMessages(m => [...m, { role:"assistant", text: reply }]);
      awardXP(3);
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  const correctMsg = async (idx, text) => {
    setCorrecting(idx);
    try {
      const fb = await callAIText(
        [{ role:"user", content:`Câu tiếng Pháp của học sinh: "${text}"\n\nHãy:\n1. Chỉ ra lỗi sai (nếu có) bằng tiếng Việt\n2. Đưa ra câu đúng\n3. Giải thích ngắn gọn lý do\n\nNếu câu đã đúng hoàn toàn, chỉ cần nói "Câu đúng rồi! ✅"` }],
        "Bạn là giáo viên tiếng Pháp. Trả lời ngắn gọn, thân thiện, bằng tiếng Việt."
      );
      setInlineCorrects(c => ({ ...c, [idx]: fb }));
    } catch {
      setInlineCorrects(c => ({ ...c, [idx]: "⚠ Không thể phân tích lúc này." }));
    }
    setCorrecting(null);
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  // ════════════════════════════════════════════════════════════════
  // SCENARIO PICKER
  // ════════════════════════════════════════════════════════════════
  if (!scenario) {
    const unit = EDITO_A1_UNITS[selUnit];
    return (
      <div style={{ animation:"fadeUp 0.3s ease" }}>

        {/* Dark hero banner */}
        <div style={{ background:"linear-gradient(135deg, #1B3A6B 0%, #2d4f8a 100%)", padding:"0.9rem 1rem 0.85rem" }}>
          {fromParcours && onBackToParcours && (
            <button onClick={onBackToParcours} style={{ background:"rgba(255,255,255,0.15)", border:"none", color:"#fff", fontSize:"0.72rem", fontWeight:600, cursor:"pointer", padding:"0.2rem 0.65rem", borderRadius:20, marginBottom:"0.6rem", fontFamily:"inherit" }}>
              ← Parcours
            </button>
          )}
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.15rem", color:"#fff", fontWeight:800, lineHeight:1.1 }}>
            🥐 La Conversation
          </div>
          <div style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.65)", marginTop:4 }}>
            Roleplay · Sửa lỗi nhẹ nhàng · Tình huống thực tế
          </div>
        </div>

        <div style={{ padding:"0.75rem 1rem 4rem", display:"flex", flexDirection:"column", gap:"0.75rem" }}>

          {/* Mode toggle */}
          <div style={{ display:"flex", gap:4, background:C.cream, padding:4, borderRadius:12 }}>
            {[{ id:"libre", label:"💬 Tự do" }, { id:"edito", label:"📘 Édito A1" }].map(m => (
              <button key={m.id} onClick={() => setMode(m.id)}
                style={{ flex:1, padding:"7px 4px", background: mode===m.id ? C.white : "transparent", border:"none", borderRadius:8, cursor:"pointer", fontWeight: mode===m.id ? 700 : 500, color: mode===m.id ? C.ink : C.gray, fontFamily:"inherit", fontSize:12, boxShadow: mode===m.id ? "0 1px 3px rgba(0,0,0,0.06)" : "none", transition:"all 0.15s" }}>
                {m.label}
              </button>
            ))}
          </div>

          {/* ── Libre mode ── */}
          {mode === "libre" && (
            <>
              <div style={{ fontSize:"0.72rem", color:C.gray }}>AI đóng vai · sửa lỗi nhẹ nhàng bằng tiếng Việt</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.6rem" }}>
                {EDITO_SCENARIOS.map(sc => (
                  <button key={sc.id} onClick={() => startScenario(sc)}
                    style={{ background:sc.bg, border:`1.5px solid ${sc.color}33`, borderRadius:16, padding:"0.9rem 0.85rem", textAlign:"left", cursor:"pointer", fontFamily:"inherit", transition:"transform 0.1s, box-shadow 0.15s", boxShadow:`0 2px 8px ${sc.color}18` }}
                    onPointerDown={e => e.currentTarget.style.transform="scale(0.97)"}
                    onPointerUp={e => e.currentTarget.style.transform="scale(1)"}
                    onPointerLeave={e => e.currentTarget.style.transform="scale(1)"}
                  >
                    <div style={{ fontSize:"1.8rem", marginBottom:"0.35rem" }}>{sc.icon}</div>
                    <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.88rem", color:C.ink, fontWeight:700, marginBottom:"0.15rem", lineHeight:1.3 }}>{sc.label}</div>
                    <div style={{ fontSize:"0.67rem", color:sc.color, fontWeight:600 }}>{sc.desc}</div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ── Édito mode ── */}
          {mode === "edito" && (
            <>
              <div style={{ overflowX:"auto", display:"flex", gap:6, paddingBottom:2, scrollbarWidth:"none" }}>
                {EDITO_A1_UNITS.map((u, i) => {
                  const active = selUnit === i;
                  return (
                    <button key={u.id} onClick={() => setSelUnit(i)}
                      style={{ flexShrink:0, padding:"5px 11px", borderRadius:999, fontSize:11.5, fontWeight: active ? 700 : 500, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap", transition:"all 0.15s", background: active ? C.blue : C.white, color: active ? "#fff" : C.ink, border:`1.5px solid ${active ? C.blue : C.border}` }}>
                      U{u.unit} · {u.title}
                    </button>
                  );
                })}
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:"0.55rem" }}>
                <div style={{ fontSize:"0.65rem", fontWeight:700, color:C.blue, textTransform:"uppercase", letterSpacing:"0.1em" }}>
                  Unité {unit.unit} — {unit.title}
                </div>
                {unit.speakingPractice.map((p, i) => (
                  <button key={i} onClick={() => {
                    const sc = {
                      id:`edito-${unit.id}-${i}`, label:p.title, icon:"🎙️",
                      desc: p.task.length > 55 ? p.task.slice(0,55)+"…" : p.task,
                      color: C.blue, bg: C.blueL,
                      phrases: p.usefulPhrases || [],
                      prompt: buildEditoPrompt(unit, p),
                    };
                    startScenario(sc);
                  }}
                    style={{ background:C.white, border:`1.5px solid ${C.border}`, borderLeft:`4px solid ${C.blue}`, borderRadius:14, padding:"0.85rem 1rem", textAlign:"left", cursor:"pointer", fontFamily:"inherit", transition:"box-shadow 0.15s, transform 0.1s", boxShadow:`0 2px 8px rgba(74,144,217,0.06)` }}
                    onPointerDown={e => e.currentTarget.style.transform="scale(0.99)"}
                    onPointerUp={e => e.currentTarget.style.transform="scale(1)"}
                    onPointerLeave={e => e.currentTarget.style.transform="scale(1)"}
                  >
                    <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.9rem", color:C.ink, fontWeight:700, marginBottom:"0.3rem" }}>{p.title}</div>
                    <div style={{ fontSize:"0.73rem", color:C.gray, lineHeight:1.55 }}>{p.task}</div>
                    {p.usefulPhrases?.length > 0 && (
                      <div style={{ marginTop:"0.5rem", display:"flex", flexWrap:"wrap", gap:"0.3rem" }}>
                        {p.usefulPhrases.map((ph, j) => (
                          <span key={j} style={{ background:C.cream, border:`1px solid ${C.blue}33`, borderRadius:20, padding:"2px 8px", fontSize:"0.65rem", color:C.blue, fontFamily:"Georgia,serif" }}>{ph}</span>
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════
  // CHAT SCREEN
  // ════════════════════════════════════════════════════════════════
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"calc(100dvh - 120px)" }}>

      {/* Chat header */}
      <div style={{ background:"linear-gradient(135deg, #1B3A6B 0%, #2d4f8a 100%)", padding:"0.65rem 1rem", display:"flex", alignItems:"center", gap:"0.65rem" }}>
        <div style={{ width:38, height:38, background:"rgba(255,255,255,0.18)", border:"1.5px solid rgba(255,255,255,0.3)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.35rem", flexShrink:0 }}>
          {scenario.icon}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.95rem", color:"#fff", fontWeight:700 }}>{scenario.label}</div>
          <div style={{ fontSize:"0.65rem", color:"rgba(255,255,255,0.65)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{scenario.desc}</div>
        </div>
        <button onClick={() => setScenario(null)}
          style={{ padding:"0.28rem 0.75rem", background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.3)", color:"#fff", borderRadius:20, fontSize:"0.68rem", cursor:"pointer", flexShrink:0, fontFamily:"inherit" }}>
          Đổi
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:"auto", padding:"0.85rem 1rem", display:"flex", flexDirection:"column", gap:"0.7rem", background:C.paper }}>
        {messages.map((m, i) => {
          const isUser = m.role === "user";

          if (isUser) return (
            <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"0.3rem" }}>
              {/* User bubble */}
              <div style={{ background:`linear-gradient(135deg, ${C.blue}, #1B3A6B)`, color:"#fff", borderRadius:"18px 18px 4px 18px", padding:"0.65rem 1rem", maxWidth:"78%", fontSize:"0.88rem", lineHeight:1.6, fontFamily:"Georgia,serif" }}>
                {m.text}
              </div>
              {/* Analyse button */}
              <button
                onClick={() => inlineCorrects[i] ? setInlineCorrects(c => ({ ...c, [i]: undefined })) : correctMsg(i, m.text)}
                disabled={correcting === i}
                style={{ padding:"0.18rem 0.55rem", background:"transparent", border:`1px solid ${C.blue}44`, borderRadius:20, color:C.blue, fontSize:"0.6rem", cursor:"pointer", opacity: correcting===i ? 0.6 : 1 }}>
                {correcting===i ? "…" : inlineCorrects[i] ? "Ẩn phân tích" : "💡 Phân tích câu"}
              </button>
              {/* Inline correction */}
              {inlineCorrects[i] && (
                <div style={{ background:"#FFFBEB", border:"1.5px solid #FCD34D", borderRadius:"10px 10px 10px 4px", padding:"0.55rem 0.8rem", maxWidth:"82%", animation:"fadeUp 0.2s ease" }}>
                  <div style={{ fontSize:"0.58rem", textTransform:"uppercase", letterSpacing:"0.1em", color:"#D97706", fontWeight:700, marginBottom:4 }}>Phân tích</div>
                  <div style={{ fontSize:"0.75rem", color:"#7a5c00", lineHeight:1.65, whiteSpace:"pre-wrap" }}>{inlineCorrects[i]}</div>
                </div>
              )}
            </div>
          );

          // AI message
          const { main, correctionLines, suggestionLines } = parseAIMsg(m.text);
          return (
            <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"flex-start", gap:"0.35rem" }}>
              {/* AI bubble */}
              <div style={{ background:C.white, color:C.ink, borderRadius:"18px 18px 18px 4px", padding:"0.65rem 0.95rem", maxWidth:"82%", fontSize:"0.88rem", lineHeight:1.65, boxShadow:"0 2px 8px rgba(0,0,0,0.07)", fontFamily:"Georgia,serif", border:`1px solid ${C.border}` }}>
                <div>{main}</div>
                {main && <div style={{ marginTop:4 }}><SpeakBtn text={main} size="0.75rem" /></div>}
              </div>
              {/* Grammar correction bubbles */}
              {correctionLines.length > 0 && (
                <div style={{ background:"#FFFBEB", border:"1.5px solid #FCD34D", borderRadius:12, padding:"0.5rem 0.75rem", maxWidth:"82%", display:"flex", flexDirection:"column", gap:"0.25rem" }}>
                  <div style={{ fontSize:"0.58rem", textTransform:"uppercase", letterSpacing:"0.1em", color:"#D97706", fontWeight:700, marginBottom:2 }}>Nhận xét ngữ pháp</div>
                  {correctionLines.map((c, j) => (
                    <div key={j} style={{ fontSize:"0.75rem", color:"#7a5c00", lineHeight:1.55 }}>💡 {c}</div>
                  ))}
                </div>
              )}
              {/* 🌟 Suggestion chip */}
              {suggestionLines.length > 0 && (() => {
                const txt = suggestionLines.join(" ");
                // Extract French example in quotes to make tappable
                const qMatch = txt.match(/"([^"]+)"/);
                const frExample = qMatch?.[1] || null;
                return (
                  <div style={{ background:C.goldL, border:`1px solid ${C.gold}55`, borderRadius:"4px 14px 14px 14px", padding:"0.42rem 0.75rem", maxWidth:"82%", animation:"fadeUp 0.2s ease" }}>
                    <div style={{ fontSize:"0.58rem", fontWeight:700, color:"#B45309", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"0.2rem" }}>💬 Gợi ý</div>
                    <div style={{ fontSize:"0.74rem", color:"#78350F", lineHeight:1.55 }}>{txt}</div>
                    {frExample && (
                      <button onClick={() => setInput(frExample)}
                        style={{ marginTop:"0.35rem", padding:"0.2rem 0.6rem", background:"rgba(255,255,255,0.7)", border:`1px solid ${C.gold}55`, borderRadius:20, fontSize:"0.68rem", color:"#92400E", cursor:"pointer", fontFamily:"Georgia,serif", fontStyle:"italic", fontWeight:600 }}>
                        ✎ Dùng câu này
                      </button>
                    )}
                  </div>
                );
              })()}
              {/* invisible spacer so last item isn't hidden under input bar */}
              {i === messages.length - 1 && <div style={{ height: 4 }} />}
            </div>
          );
        })}

        {/* Loading dots */}
        {loading && (
          <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", color:C.gray, fontSize:"0.78rem" }}>
            <div style={{ display:"flex", gap:4 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width:7, height:7, background:C.blue, borderRadius:"50%", opacity:0.5, animation:`pulse 1.2s ease ${i*0.2}s infinite` }}/>
              ))}
            </div>
            <span>Đang soạn…</span>
          </div>
        )}
        {err && (
          <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", background:"#FEF2F2", borderRadius:8, padding:"0.4rem 0.65rem" }}>
            <span style={{ color:"#DC2626", fontSize:"0.75rem", flex:1 }}>⚠ {err}</span>
            <button onClick={retry} style={{ padding:"0.2rem 0.6rem", background:"#DC2626", color:"#fff", border:"none", borderRadius:20, fontSize:"0.65rem", cursor:"pointer", fontWeight:600 }}>↺ Thử lại</button>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Phrase chips */}
      {scenario.phrases.length > 0 && (
        <div style={{ background:C.white, borderTop:`1px solid ${C.border}`, padding:"0.5rem 0.75rem 0.3rem", display:"flex", gap:"0.35rem", overflowX:"auto", scrollbarWidth:"none" }}>
          {scenario.phrases.map((p, i) => (
            <button key={i} onClick={() => send(p)}
              style={{ flexShrink:0, padding:"0.28rem 0.7rem", background:C.blueL, border:`1px solid ${C.blue}33`, color:C.blue, borderRadius:20, fontSize:"0.72rem", cursor:"pointer", fontFamily:"Georgia,serif", fontWeight:500, whiteSpace:"nowrap" }}>
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div style={{ padding:"0.5rem 0.75rem 0.6rem", background:C.white, borderTop:`1px solid ${C.border}`, display:"flex", gap:"0.4rem", alignItems:"center" }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Écrivez en français…"
          style={{ flex:1, border:`1.5px solid ${C.border}`, borderRadius:22, padding:"0.5rem 0.85rem", fontSize:"0.88rem", fontFamily:"Georgia,serif", outline:"none", color:C.ink, minWidth:0, transition:"border-color 0.15s" }}
          onFocus={e => e.target.style.borderColor = C.blue}
          onBlur={e => e.target.style.borderColor = C.border}
        />
        <button onClick={() => send()} disabled={loading || !input.trim()}
          style={{ padding:"0.5rem 1rem", background: input.trim() ? `linear-gradient(135deg, ${C.accent}, #c0392b)` : C.border, color:"#fff", border:"none", borderRadius:22, fontSize:"0.82rem", cursor: input.trim() ? "pointer" : "default", fontFamily:"Georgia,serif", fontWeight:700, flexShrink:0, transition:"background 0.15s" }}>
          Gửi
        </button>
      </div>
    </div>
  );
}
