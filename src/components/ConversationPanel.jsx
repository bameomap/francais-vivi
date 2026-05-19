import { useState, useEffect, useRef } from "react";
import { C } from "../constants.js";
import { callAIText } from "../utils/api.js";
import { awardXP } from "../utils/xp.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";

export const EDITO_SCENARIOS = [
  {
    id:"greet", label:"Saluer", icon:"👋", desc:"Chào hỏi & giới thiệu",
    color:"#2980B9", bg:"#E8F4FD",
    phrases:["Bonjour !", "Je m'appelle…", "J'ai … ans.", "Je suis vietnamien(ne).", "Et vous ?", "Enchanté(e) !"],
    prompt:"You are a friendly French person at a café. The learner is A1 level. Start with a simple greeting. Keep sentences very short and simple. After each learner reply, if there are mistakes put a correction note prefixed EXACTLY with '💡' on its own line. Then continue the conversation naturally.",
  },
  {
    id:"shop", label:"Faire les courses", icon:"🛒", desc:"Mua sắm tại chợ",
    color:"#16A085", bg:"#E6FAF5",
    phrases:["Bonjour, je voudrais…", "Combien ça coûte ?", "Un kilo de…, s'il vous plaît.", "C'est tout, merci.", "Vous avez… ?"],
    prompt:"You are a French market vendor. The learner is A1 level. Start by greeting and asking what they need. Keep sentences very short. After each learner reply, if there are mistakes put a correction note prefixed EXACTLY with '💡' on its own line. Then respond as the vendor.",
  },
  {
    id:"cafe", label:"Au café", icon:"☕", desc:"Gọi đồ tại quán",
    color:"#E67E22", bg:"#FEF3E2",
    phrases:["Un café, s'il vous plaît.", "Je voudrais un thé.", "L'addition, s'il vous plaît.", "C'est combien ?", "Merci beaucoup !"],
    prompt:"You are a French waiter at a café. The learner is A1 level. Start by welcoming them. Keep sentences short. After each learner reply, if there are mistakes put a correction note prefixed EXACTLY with '💡' on its own line. Then respond as the waiter.",
  },
  {
    id:"school", label:"À l'école", icon:"🏫", desc:"Nói chuyện tại trường",
    color:"#8E44AD", bg:"#F5EEFF",
    phrases:["Tu t'appelles comment ?", "Tu es en quelle année ?", "J'étudie le français.", "C'est difficile !", "On mange ensemble ?"],
    prompt:"You are a French classmate. The learner is A1 level. Start by introducing yourself and asking their name. Keep it simple. After each learner reply, if there are mistakes put a correction note prefixed EXACTLY with '💡' on its own line. Then continue chatting.",
  },
  {
    id:"direction", label:"Demander le chemin", icon:"🗺️", desc:"Hỏi đường trong phố",
    color:"#C0392B", bg:"#FDEDEC",
    phrases:["Excusez-moi !", "Où est… ?", "C'est loin ?", "À gauche ou à droite ?", "Merci, au revoir !"],
    prompt:"You are a French passerby in the street. The learner is A1 level. Wait for them to ask for directions. Give simple directions. After each reply, if there are mistakes put a correction note prefixed EXACTLY with '💡' on its own line.",
  },
  {
    id:"family", label:"La famille", icon:"👨‍👩‍👧", desc:"Nói về gia đình",
    color:"#D35400", bg:"#FDEBD0",
    phrases:["J'ai … frères et sœurs.", "Mon père s'appelle…", "Ma mère est…", "J'habite avec…", "Tu as des frères ?"],
    prompt:"You are a friendly French neighbor. The learner is A1 level. Start by asking about their family. Keep questions short. After each learner reply, if there are mistakes put a correction note prefixed EXACTLY with '💡' on its own line. Then continue.",
  },
];

// ── Parse AI message: split main text vs correction lines ──
function parseMsg(text) {
  const lines = text.split("\n");
  const corrections = [];
  const main = [];
  for (const line of lines) {
    if (line.startsWith("💡")) corrections.push(line.slice(1).trim());
    else main.push(line);
  }
  return { main: main.join("\n").trim(), corrections };
}

export default function ConversationPanel() {
  const [scenario,    setScenario]    = useState(null);
  const [messages,    setMessages]    = useState([]);
  const [input,       setInput]       = useState("");
  const [loading,     setLoading]     = useState(false);
  const [err,         setErr]         = useState("");
  const [showPhrases, setShowPhrases] = useState(false);
  const [correcting,  setCorrecting]  = useState(null); // index of msg being corrected
  const [corrections, setCorrections] = useState({});   // { msgIdx: correctionText }
  const bottomRef = useRef(null);

  const startScenario = async (sc) => {
    setScenario(sc); setMessages([]); setInput(""); setErr(""); setLoading(true); setShowPhrases(false);
    try {
      const reply = await callAIText(
        [{ role:"user", content:"Commençons." }],
        sc.prompt + " The learner just said they are ready. Start the conversation now."
      );
      setMessages([{ role:"assistant", text: reply }]);
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  const send = async (override) => {
    const txt = (override || input).trim();
    if (!txt || loading) return;
    const userMsg = { role:"user", text: txt };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs); setInput(""); setShowPhrases(false); setLoading(true);
    try {
      const apiMsgs = newMsgs.map(m => ({ role: m.role, content: m.text }));
      const reply = await callAIText(apiMsgs, scenario.prompt);
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
      setCorrections(c => ({ ...c, [idx]: fb }));
    } catch(e) { setCorrections(c => ({ ...c, [idx]: "⚠ Không thể phân tích lúc này." })); }
    setCorrecting(null);
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  // ── Scenario selection screen ──
  if (!scenario) return (
    <div style={{ padding:"1rem" }}>
      <div style={{ marginBottom:"1rem" }}>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.1rem", color:C.ink, fontWeight:700 }}>💬 Chọn tình huống</div>
        <div style={{ fontSize:"0.75rem", color:C.gray, marginTop:"0.2rem" }}>AI đóng vai, sửa lỗi nhẹ nhàng bằng tiếng Việt</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.65rem" }}>
        {EDITO_SCENARIOS.map(sc => (
          <button key={sc.id} onClick={() => startScenario(sc)}
            style={{ background:sc.bg, border:`1.5px solid ${sc.color}33`, borderRadius:16, padding:"1rem 0.9rem", textAlign:"left", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}
            onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 6px 20px ${sc.color}22`; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
            <div style={{ fontSize:"1.8rem", marginBottom:"0.4rem" }}>{sc.icon}</div>
            <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.88rem", color:C.ink, fontWeight:700, marginBottom:"0.15rem", lineHeight:1.3 }}>{sc.label}</div>
            <div style={{ fontSize:"0.67rem", color:sc.color, fontWeight:600 }}>{sc.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );

  // ── Chat screen ──
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 120px)" }}>

      {/* Header */}
      <div style={{ background:C.white, borderBottom:`1.5px solid ${scenario.color}33`, padding:"0.65rem 1rem", display:"flex", alignItems:"center", gap:"0.65rem" }}>
        <div style={{ width:38, height:38, background:scenario.bg, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem", flexShrink:0 }}>
          {scenario.icon}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.92rem", color:C.ink, fontWeight:700 }}>{scenario.label}</div>
          <div style={{ fontSize:"0.65rem", color:C.gray, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{scenario.desc}</div>
        </div>
        <button onClick={()=>setScenario(null)}
          style={{ padding:"0.28rem 0.7rem", background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, borderRadius:20, fontSize:"0.68rem", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>
          Đổi
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:"auto", padding:"1rem", display:"flex", flexDirection:"column", gap:"0.75rem", background:C.cream }}>
        {messages.map((m, i) => {
          const isUser = m.role === "user";
          if (isUser) return (
            <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"0.3rem" }}>
              <div style={{ display:"flex", alignItems:"flex-end", gap:"0.4rem", justifyContent:"flex-end" }}>
                <button
                  onClick={() => corrections[i] ? setCorrections(c=>({...c,[i]:undefined})) : correctMsg(i, m.text)}
                  disabled={correcting===i}
                  style={{ padding:"0.2rem 0.55rem", background:"transparent", border:`1px solid ${scenario.color}66`, borderRadius:20, color:scenario.color, fontSize:"0.62rem", cursor:"pointer", opacity:correcting===i?0.6:1, whiteSpace:"nowrap", flexShrink:0 }}>
                  {correcting===i ? "…" : corrections[i] ? "Ẩn" : "Sửa câu"}
                </button>
                <div style={{ background:scenario.color, color:C.white, borderRadius:"16px 16px 4px 16px", padding:"0.6rem 0.95rem", maxWidth:"75%", fontSize:"0.88rem", lineHeight:1.6, fontFamily:"Georgia,serif" }}>
                  {m.text}
                </div>
              </div>
              {corrections[i] && (
                <div style={{ background:"#FFFBEB", border:`1.5px solid ${C.gold}55`, borderRadius:"10px 10px 10px 4px", padding:"0.55rem 0.8rem", maxWidth:"82%", animation:"fadeUp 0.2s ease" }}>
                  <div style={{ fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:1, color:C.gold, fontWeight:700, marginBottom:"0.3rem" }}>Phân tích câu</div>
                  <div style={{ fontSize:"0.75rem", color:"#7a5c00", lineHeight:1.65, whiteSpace:"pre-wrap" }}>{corrections[i]}</div>
                </div>
              )}
            </div>
          );
          const { main, corrections } = parseMsg(m.text);
          return (
            <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"flex-start", gap:"0.35rem" }}>
              {/* AI bubble */}
              <div style={{ background:C.white, color:C.ink, borderRadius:"16px 16px 16px 4px", padding:"0.65rem 0.95rem", maxWidth:"82%", fontSize:"0.88rem", lineHeight:1.65, boxShadow:"0 1px 4px rgba(0,0,0,0.07)", fontFamily:"Georgia,serif" }}>
                {main}
                {main && <SpeakBtn text={main} size="0.75rem" />}
              </div>
              {/* Corrections card — separate, visually distinct */}
              {corrections.length > 0 && (
                <div style={{ background:"#fffbea", border:`1.5px solid ${C.gold}55`, borderRadius:10, padding:"0.5rem 0.75rem", maxWidth:"82%", display:"flex", flexDirection:"column", gap:"0.25rem" }}>
                  <div style={{ fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:1, color:C.gold, fontWeight:700, marginBottom:"0.1rem" }}>Nhận xét</div>
                  {corrections.map((c, j) => (
                    <div key={j} style={{ fontSize:"0.75rem", color:"#7a5c00", lineHeight:1.55 }}>💡 {c}</div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", color:C.gray, fontSize:"0.78rem" }}>
            <div style={{ display:"flex", gap:3 }}>
              {[0,1,2].map(i=><div key={i} style={{ width:7, height:7, background:scenario.color, borderRadius:"50%", opacity:0.5, animation:`pulse 1.2s ease ${i*0.2}s infinite` }}/>)}
            </div>
            <span>Đang soạn...</span>
          </div>
        )}
        {err && <div style={{ color:C.red, fontSize:"0.75rem", background:"#fde8e6", borderRadius:8, padding:"0.4rem 0.65rem" }}>⚠ {err}</div>}
        <div ref={bottomRef} />
      </div>

      {/* Phrase suggestions */}
      {showPhrases && (
        <div style={{ background:C.white, borderTop:`1px solid ${C.border}`, padding:"0.6rem 1rem", display:"flex", flexWrap:"wrap", gap:"0.35rem" }}>
          {scenario.phrases.map((p, i) => (
            <button key={i} onClick={()=>{ setInput(p); setShowPhrases(false); }}
              style={{ padding:"0.3rem 0.7rem", background:scenario.bg, border:`1px solid ${scenario.color}44`, color:scenario.color, borderRadius:20, fontSize:"0.75rem", cursor:"pointer", fontFamily:"Georgia,serif", fontWeight:500 }}>
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div style={{ padding:"0.6rem 0.75rem", background:C.white, borderTop:`1px solid ${C.border}`, display:"flex", gap:"0.4rem", alignItems:"center" }}>
        <button onClick={()=>setShowPhrases(o=>!o)}
          style={{ padding:"0.45rem 0.65rem", background:showPhrases?scenario.bg:"transparent", border:`1.5px solid ${showPhrases?scenario.color:C.border}`, color:showPhrases?scenario.color:C.gray, borderRadius:10, fontSize:"0.75rem", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0, transition:"all 0.15s" }}>
          💡 Gợi ý
        </button>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
          placeholder="Nhập câu bằng tiếng Pháp..."
          style={{ flex:1, border:`1.5px solid ${C.border}`, borderRadius:20, padding:"0.5rem 0.85rem", fontSize:"0.85rem", fontFamily:"Georgia,serif", outline:"none", color:C.ink, minWidth:0 }} />
        <button onClick={()=>send()} disabled={loading||!input.trim()}
          style={{ padding:"0.5rem 0.9rem", background:input.trim()?scenario.color:C.border, color:C.white, border:"none", borderRadius:20, fontSize:"0.82rem", cursor:input.trim()?"pointer":"default", fontFamily:"Georgia,serif", flexShrink:0, transition:"background 0.15s" }}>
          Gửi
        </button>
      </div>
    </div>
  );
}
