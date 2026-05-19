import { useState, useEffect, useRef } from "react";
import { C } from "../constants.js";
import { callAIText } from "../utils/api.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";

export const EDITO_SCENARIOS = [
  { id:"greet",    label:"Saluer", icon:"👋", desc:"Chào hỏi & giới thiệu bản thân", prompt:"You are a friendly French person at a café. The learner is A1 level. Start with a simple greeting. Keep sentences very short and simple. After each learner reply, give a short correction note in Vietnamese if needed (prefix with 💡), then continue the conversation naturally." },
  { id:"shop",     label:"Faire les courses", icon:"🛒", desc:"Mua sắm tại chợ / siêu thị", prompt:"You are a French market vendor. The learner is A1 level. Start by greeting and asking what they need. Keep sentences very short. After each learner reply, give a short correction note in Vietnamese if needed (prefix with 💡), then respond as the vendor." },
  { id:"cafe",     label:"Au café", icon:"☕", desc:"Gọi đồ tại quán cà phê", prompt:"You are a French waiter at a café. The learner is A1 level. Start by welcoming them. Keep sentences short. After each learner reply, give a short correction note in Vietnamese if needed (prefix with 💡), then respond as the waiter." },
  { id:"school",   label:"À l'école", icon:"🏫", desc:"Nói chuyện tại trường học", prompt:"You are a French classmate. The learner is A1 level. Start by introducing yourself and asking their name. Keep it simple. After each learner reply, give a short correction note in Vietnamese if needed (prefix with 💡), then continue chatting." },
  { id:"direction",label:"Demander le chemin", icon:"🗺️", desc:"Hỏi đường trong thành phố", prompt:"You are a French passerby in the street. The learner is A1 level. Wait for them to ask for directions. Give simple directions. After each reply, give a short correction note in Vietnamese if needed (prefix with 💡)." },
  { id:"family",   label:"La famille", icon:"👨‍👩‍👧", desc:"Nói về gia đình", prompt:"You are a friendly French neighbor. The learner is A1 level. Start by asking about their family. Keep questions short. After each learner reply, give a short correction note in Vietnamese if needed (prefix with 💡), then continue." },
];

export default function ConversationPanel() {
  const [scenario, setScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const bottomRef = useRef(null);

  const startScenario = async (sc) => {
    setScenario(sc); setMessages([]); setInput(""); setErr(""); setLoading(true);
    try {
      const reply = await callAIText([], sc.prompt + " Begin now.");
      setMessages([{ role:"assistant", text: reply }]);
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role:"user", text: input.trim() };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs); setInput(""); setLoading(true);
    try {
      const apiMsgs = newMsgs.map(m => ({ role: m.role, content: m.text }));
      const reply = await callAIText(apiMsgs, scenario.prompt);
      setMessages(m => [...m, { role:"assistant", text: reply }]);
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  if (!scenario) return (
    <div style={{ padding:"1rem" }}>
      <div style={{ fontSize:"0.72rem", fontWeight:600, color:"#2980b9", marginBottom:"0.2rem" }}>💬 Hội thoại thực hành</div>
      <div style={{ fontSize:"0.73rem", color:C.gray, marginBottom:"1rem", lineHeight:1.6 }}>Chọn tình huống để bắt đầu luyện nói. AI sẽ đóng vai và sửa lỗi nhẹ nhàng bằng tiếng Việt.</div>
      <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
        {EDITO_SCENARIOS.map(sc => (
          <button key={sc.id} onClick={() => startScenario(sc)}
            style={{ background:C.white, border:`1.5px solid #2980b944`, borderRadius:12, padding:"0.9rem 1rem", textAlign:"left", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.background="#e8f4fd"}
            onMouseLeave={e=>e.currentTarget.style.background=C.white}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
              <span style={{ fontSize:"1.4rem" }}>{sc.icon}</span>
              <div>
                <div style={{ fontFamily:"Georgia,serif", fontSize:"0.95rem", color:C.ink, marginBottom:"0.15rem" }}>{sc.label}</div>
                <div style={{ fontSize:"0.72rem", color:C.gray }}>{sc.desc}</div>
              </div>
              <span style={{ marginLeft:"auto", color:"#2980b9", fontSize:"0.8rem" }}>→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 56px)" }}>
      {/* Chat header */}
      <div style={{ background:"#2980b9", color:C.white, padding:"0.7rem 1rem", display:"flex", alignItems:"center", gap:"0.6rem" }}>
        <button onClick={()=>setScenario(null)} style={{ background:"none", border:"none", color:C.white, cursor:"pointer", fontSize:"0.85rem" }}>←</button>
        <span style={{ fontSize:"1.1rem" }}>{scenario.icon}</span>
        <div>
          <div style={{ fontFamily:"Georgia,serif", fontSize:"0.92rem" }}>{scenario.label}</div>
          <div style={{ fontSize:"0.65rem", opacity:0.8 }}>{scenario.desc}</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:"auto", padding:"1rem", display:"flex", flexDirection:"column", gap:"0.65rem", background:C.cream }}>
        {messages.map((m, i) => {
          const isUser = m.role === "user";
          // Split correction from main text
          const parts = m.text.split(/(💡[^\n]+)/g);
          return (
            <div key={i} style={{ display:"flex", flexDirection:"column", alignItems: isUser ? "flex-end" : "flex-start" }}>
              {parts.map((p, j) => p.startsWith("💡") ? (
                <div key={j} style={{ fontSize:"0.72rem", color:C.gold, background:"#fff8e6", border:`1px solid ${C.gold}44`, borderRadius:8, padding:"0.3rem 0.65rem", marginTop:"0.25rem", maxWidth:"88%" }}>{p}</div>
              ) : p.trim() ? (
                <div key={j} style={{ background: isUser ? "#2980b9" : C.white, color: isUser ? C.white : C.ink, borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px", padding:"0.6rem 0.9rem", maxWidth:"85%", fontSize:"0.88rem", lineHeight:1.6, boxShadow:"0 1px 3px rgba(0,0,0,0.08)" }}>
                    {p.trim()}
                    {!isUser && <SpeakBtn text={p.trim()} size="0.75rem" />}
                  </div>
              ) : null)}
            </div>
          );
        })}
        {loading && (
          <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", color:C.gray, fontSize:"0.78rem" }}>
            <div style={{ width:14, height:14, border:`2px solid ${C.border}`, borderTopColor:"#2980b9", borderRadius:"50%", animation:"spin 0.8s linear infinite" }}/> Đang trả lời...
          </div>
        )}
        {err && <div style={{ color:C.red, fontSize:"0.75rem" }}>⚠ {err}</div>}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding:"0.75rem 1rem", background:C.white, borderTop:`1px solid ${C.border}`, display:"flex", gap:"0.5rem" }}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
          placeholder="Nhập câu trả lời bằng tiếng Pháp..."
          style={{ flex:1, border:`1.5px solid ${C.border}`, borderRadius:20, padding:"0.5rem 0.85rem", fontSize:"0.85rem", fontFamily:"inherit", outline:"none", color:C.ink }} />
        <button onClick={send} disabled={loading||!input.trim()}
          style={{ padding:"0.5rem 1rem", background: input.trim() ? "#2980b9" : C.border, color:C.white, border:"none", borderRadius:20, fontSize:"0.82rem", cursor: input.trim() ? "pointer" : "default", fontFamily:"Georgia,serif" }}>
          Gửi
        </button>
      </div>
    </div>
  );
}
