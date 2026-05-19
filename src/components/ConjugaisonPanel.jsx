import { useState } from "react";
import { C } from "../constants.js";
import { callAI } from "../utils/api.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import Spinner from "./ui/Spinner.jsx";

const TENSES = [
  { id:"présent",         label:"Présent",          desc:"Hiện tại" },
  { id:"passé composé",   label:"Passé composé",    desc:"Quá khứ hoàn thành" },
  { id:"imparfait",       label:"Imparfait",         desc:"Quá khứ chưa hoàn thành" },
  { id:"futur proche",    label:"Futur proche",      desc:"Tương lai gần" },
  { id:"futur simple",    label:"Futur simple",      desc:"Tương lai đơn" },
  { id:"conditionnel",    label:"Conditionnel",      desc:"Điều kiện" },
  { id:"subjonctif",      label:"Subjonctif",        desc:"Giả định" },
  { id:"impératif",       label:"Impératif",         desc:"Mệnh lệnh" },
];

const QUICK_VERBS = ["être","avoir","aller","faire","venir","pouvoir","vouloir","prendre","partir","manger","parler","finir","voir","savoir","mettre"];

export function ConjugQuizItem({ q, idx }) {
  const [val, setVal] = useState("");
  const [done, setDone] = useState(false);
  const ok = done && val.trim().toLowerCase() === (q.answer||"").toLowerCase();
  return (
    <div style={{ background:C.white, border:`1.5px solid ${done?(ok?C.green:C.red):C.border}`, borderRadius:10, padding:"0.75rem 0.9rem" }}>
      <div style={{ fontSize:"0.63rem", color:C.gray, textTransform:"uppercase", letterSpacing:1, marginBottom:"0.35rem" }}>
        Câu {idx+1} · <span style={{ color:"#16a085" }}>{q.tense}</span> · {q.pronoun}
      </div>
      <div style={{ fontFamily:"Georgia,serif", fontSize:"0.9rem", marginBottom:"0.5rem", lineHeight:1.5, color:C.ink }}>{q.sentence}</div>
      {q.hint && <div style={{ fontSize:"0.7rem", color:C.gold, marginBottom:"0.4rem" }}>💡 {q.hint}</div>}
      <div style={{ display:"flex", gap:"0.38rem", alignItems:"center" }}>
        <input value={val} disabled={done} onChange={e=>setVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!done&&setDone(true)}
          placeholder={`${q.pronoun} ___`}
          style={{ border:`1.5px solid ${done?(ok?C.green:C.red):C.border}`, borderRadius:6, padding:"0.3rem 0.6rem", fontSize:"0.88rem", fontFamily:"Georgia,serif", width:160, background:done?(ok?"#e8f7f1":"#fde8e6"):C.white, color:done?(ok?C.green:C.red):C.ink, outline:"none" }} />
        {!done && <button onClick={()=>setDone(true)} style={{ padding:"0.3rem 0.65rem", background:C.purple, color:C.white, border:"none", borderRadius:6, fontSize:"0.73rem", cursor:"pointer" }}>Kiểm tra</button>}
        {done && <span style={{ fontSize:"0.73rem", color:ok?C.green:C.red, fontWeight:500 }}>{ok ? "✓ Đúng!" : `✗ Đáp án: ${q.answer}`}</span>}
        {done && !ok && <SpeakBtn text={q.answer} />}
      </div>
    </div>
  );
}

export default function ConjugaisonPanel() {
  const [verb, setVerb] = useState("");
  const [tenses, setTenses] = useState(["présent","passé composé","futur proche"]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [quizMode, setQuizMode] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);

  const toggleTense = t => setTenses(prev => prev.includes(t) ? prev.filter(x=>x!==t) : [...prev, t]);

  const lookup = async (v) => {
    const target = v || verb;
    if (!target.trim()) return;
    setLoading(true); setErr(""); setResult(null); setQuiz(null); setQuizMode(false);
    try {
      const r = await callAI(`You are a French grammar expert. Conjugate the verb "${target.trim()}" for these tenses: ${tenses.join(", ")}.
Return ONLY JSON:
{
  "verb": "infinitive",
  "meaning": "Vietnamese meaning",
  "group": "1er groupe|2e groupe|3e groupe|irrégulier",
  "auxiliary": "avoir|être",
  "tenses": [
    {
      "tense": "tense name",
      "tense_vi": "Vietnamese tense name",
      "usage": "one-line usage tip in Vietnamese",
      "forms": [
        {"pronoun":"je","form":"conjugated form","example":"short example sentence"}
      ]
    }
  ]
}`);
      setResult(r);
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  const generateQuiz = async () => {
    if (!result) return;
    setQuizLoading(true); setQuiz(null);
    try {
      const r = await callAI(`French teacher. Create 8 fill-in-the-blank conjugation exercises for the verb "${result.verb}" using these tenses: ${tenses.join(", ")}.
Return ONLY JSON:
{"questions":[{"sentence":"French sentence with ___ for the verb form","answer":"correct conjugated form","pronoun":"the pronoun used","tense":"tense name","hint":"Vietnamese hint about the tense"}]}`);
      setQuiz(r);
    } catch(e) { setErr(e.message); }
    setQuizLoading(false);
  };

  const groupColor = g => ({"1er groupe":C.green,"2e groupe":C.purple,"3e groupe":C.gold,"irrégulier":C.red}[g]||C.gray);

  return (
    <div style={{ padding:"1rem", display:"flex", flexDirection:"column", gap:"0.85rem" }}>
      <div style={{ fontSize:"0.72rem", fontWeight:600, color:"#16a085" }}>📖 Conjugaison</div>
      <div style={{ fontSize:"0.73rem", color:C.gray, lineHeight:1.6 }}>Nhập một động từ — xem bảng chia đầy đủ và luyện tập ngay.</div>

      {/* Input */}
      <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"0.85rem", display:"flex", flexDirection:"column", gap:"0.65rem" }}>
        <div style={{ display:"flex", gap:"0.5rem" }}>
          <input value={verb} onChange={e=>setVerb(e.target.value)} onKeyDown={e=>e.key==="Enter"&&lookup()}
            placeholder="Nhập động từ... vd: manger"
            style={{ flex:1, border:`1.5px solid ${C.border}`, borderRadius:8, padding:"0.5rem 0.75rem", fontSize:"0.88rem", fontFamily:"Georgia,serif", outline:"none", color:C.ink }} />
          <button onClick={()=>lookup()} disabled={loading||!verb.trim()}
            style={{ padding:"0.5rem 0.9rem", background: verb.trim()?"#16a085":C.border, color:C.white, border:"none", borderRadius:8, fontSize:"0.82rem", cursor: verb.trim()?"pointer":"default", fontFamily:"Georgia,serif" }}>
            {loading?"...":"Xem ✦"}
          </button>
        </div>

        {/* Quick verb chips */}
        <div>
          <div style={{ fontSize:"0.62rem", color:C.gray, textTransform:"uppercase", letterSpacing:1, marginBottom:"0.3rem" }}>Động từ thông dụng</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.28rem" }}>
            {QUICK_VERBS.map(v => (
              <button key={v} onClick={()=>{ setVerb(v); lookup(v); }}
                style={{ padding:"0.18rem 0.55rem", border:`1px solid ${C.border}`, borderRadius:20, background: verb===v?C.purple:C.white, color: verb===v?C.white:C.gray, fontSize:"0.72rem", cursor:"pointer", fontFamily:"Georgia,serif" }}>
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Tense selector */}
        <div>
          <div style={{ fontSize:"0.62rem", color:C.gray, textTransform:"uppercase", letterSpacing:1, marginBottom:"0.3rem" }}>Thì muốn xem</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.28rem" }}>
            {TENSES.map(t => (
              <button key={t.id} onClick={()=>toggleTense(t.id)}
                style={{ padding:"0.35rem 0.5rem", border:`1.5px solid ${tenses.includes(t.id)?"#16a085":C.border}`, borderRadius:8, background: tenses.includes(t.id)?"#e8f8f5":C.white, color: tenses.includes(t.id)?"#16a085":C.ink, fontSize:"0.72rem", cursor:"pointer", fontFamily:"inherit", textAlign:"left" }}>
                <div style={{ fontWeight: tenses.includes(t.id)?600:400 }}>{t.label}</div>
                <div style={{ fontSize:"0.6rem", color: tenses.includes(t.id)?"#16a085":C.gray }}>{t.desc}</div>
              </button>
            ))}
          </div>
        </div>
        {err && <div style={{ fontSize:"0.72rem", color:C.red }}>⚠ {err}</div>}
      </div>

      {loading && <div style={{ display:"flex", justifyContent:"center", padding:"1.5rem" }}><Spinner /></div>}

      {/* Result */}
      {result && !quizMode && (
        <div style={{ display:"flex", flexDirection:"column", gap:"0.65rem", animation:"fadeUp 0.3s ease" }}>
          {/* Verb header */}
          <div style={{ background:C.purple, borderRadius:12, padding:"0.9rem 1rem", display:"flex", alignItems:"center", gap:"0.8rem" }}>
            <div>
              <div style={{ fontFamily:"Georgia,serif", fontSize:"1.6rem", color:C.paper }}>{result.verb} <SpeakBtn text={result.verb} size="1rem" /></div>
              <div style={{ fontSize:"0.78rem", color:"#a0a0b8", marginTop:"0.15rem" }}>{result.meaning}</div>
            </div>
            <div style={{ marginLeft:"auto", display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"0.3rem" }}>
              <span style={{ background:`${groupColor(result.group)}33`, color:groupColor(result.group), fontSize:"0.65rem", padding:"0.15rem 0.5rem", borderRadius:20, fontWeight:600 }}>{result.group}</span>
              {result.auxiliary && <span style={{ background:"#ffffff11", color:"#a0a0b8", fontSize:"0.65rem", padding:"0.15rem 0.5rem", borderRadius:20 }}>aux. {result.auxiliary}</span>}
            </div>
          </div>

          {/* Conjugation tables */}
          {result.tenses?.map((t, ti) => (
            <div key={ti} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
              <div style={{ background:"#e8f8f5", borderBottom:`1px solid ${C.border}`, padding:"0.6rem 0.9rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <span style={{ fontFamily:"Georgia,serif", fontSize:"0.92rem", color:"#16a085", fontWeight:600 }}>{t.tense}</span>
                  <span style={{ fontSize:"0.72rem", color:C.gray, marginLeft:"0.5rem" }}>— {t.tense_vi}</span>
                </div>
              </div>
              {t.usage && <div style={{ padding:"0.4rem 0.9rem", fontSize:"0.72rem", color:C.gold, background:"#fff8e6", borderBottom:`1px solid ${C.border}` }}>💡 {t.usage}</div>}
              <div style={{ padding:"0.5rem" }}>
                {t.forms?.map((f, fi) => (
                  <div key={fi} style={{ display:"grid", gridTemplateColumns:"80px 1fr", gap:"0.5rem", padding:"0.42rem 0.4rem", background: fi%2===0?C.white:C.cream, borderRadius:6, alignItems:"start" }}>
                    <div style={{ fontSize:"0.78rem", color:C.gray, fontWeight:600 }}>{f.pronoun}</div>
                    <div>
                      <div style={{ display:"flex", alignItems:"center", gap:"0.3rem" }}>
                        <span style={{ fontFamily:"Georgia,serif", fontSize:"0.95rem", color:C.purple, fontWeight:600 }}>{f.form}</span>
                        <SpeakBtn text={`${f.pronoun === "il/elle" ? "il" : f.pronoun === "ils/elles" ? "ils" : f.pronoun} ${f.form}`} size="0.75rem" />
                      </div>
                      {f.example && <div style={{ fontSize:"0.7rem", color:C.gray, fontStyle:"italic", marginTop:"0.1rem" }}>{f.example}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Quiz button */}
          <button onClick={()=>{ setQuizMode(true); generateQuiz(); }}
            style={{ padding:"0.7rem", background:"#16a085", color:C.white, border:"none", borderRadius:8, fontFamily:"Georgia,serif", fontSize:"0.88rem", cursor:"pointer" }}>
            🧩 Luyện chia động từ này
          </button>
        </div>
      )}

      {/* Quiz mode */}
      {quizMode && (
        <div style={{ display:"flex", flexDirection:"column", gap:"0.65rem" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ fontFamily:"Georgia,serif", color:"#16a085", fontSize:"0.92rem" }}>🧩 Luyện tập — {result?.verb}</div>
            <button onClick={()=>setQuizMode(false)} style={{ background:"transparent", border:`1px solid ${C.border}`, borderRadius:20, padding:"0.2rem 0.6rem", fontSize:"0.68rem", color:C.gray, cursor:"pointer" }}>← Bảng chia</button>
          </div>
          {quizLoading && <div style={{ display:"flex", justifyContent:"center", padding:"1rem" }}><Spinner /></div>}
          {quiz?.questions?.map((q, i) => <ConjugQuizItem key={i} q={q} idx={i} />)}
          {quiz && <button onClick={generateQuiz} style={{ padding:"0.55rem", background:"transparent", border:`1px solid ${C.border}`, borderRadius:8, color:C.gray, fontSize:"0.78rem", cursor:"pointer" }}>🔄 Tạo bài mới</button>}
        </div>
      )}
    </div>
  );
}
