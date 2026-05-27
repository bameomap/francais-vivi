import { useState, useEffect } from "react";
import { C } from "../constants.js";
import { callAI } from "../utils/api.js";
import Spinner from "./ui/Spinner.jsx";
import { MCSection, FillSection } from "./QuizSections.jsx";

const MODEL = "claude-sonnet-4-6";
const ANALYSE_HISTORY_KEY = "analyse_history";

function loadAnalyseHistory() {
  try { return JSON.parse(localStorage.getItem(ANALYSE_HISTORY_KEY)||"[]"); } catch { return []; }
}
function saveAnalyseHistory(h) {
  try { localStorage.setItem(ANALYSE_HISTORY_KEY, JSON.stringify(h.slice(0,20))); } catch {}
}

export default function AnalysePanel() {
  const [state,     setState]     = useState("idle"); // idle | loading | done | error | history | exercises
  const [result,    setResult]    = useState(null);
  const [err,       setErr]       = useState("");
  const [inputText, setInputText] = useState("");
  const [activeTab, setActiveTab] = useState("vocab");
  const [history,   setHistory]   = useState([]);
  const [exercises, setExercises] = useState(null);
  const [exLoading, setExLoading] = useState(false);
  const [exType,    setExType]    = useState("mixed");

  useEffect(() => { setHistory(loadAnalyseHistory()); }, []);

  const saveToHistory = (res, text) => {
    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString("vi-VN"),
      summary: res.summary || text.slice(0,80)+"...",
      level: res.level || "",
      result: res,
      inputText: text,
    };
    const updated = [entry, ...history].slice(0, 20);
    setHistory(updated);
    saveAnalyseHistory(updated);
  };

  const analyse = async (content) => {
    setState("loading"); setResult(null); setErr(""); setExercises(null);
    try {
      const prompt = `Tu es un professeur de français expert. Analyse ce texte français et réponds en JSON.
Texte: """${content.slice(0, 4000)}"""

Retourne UNIQUEMENT ce JSON:
{
  "translation": "Bản dịch tiếng Việt đầy đủ. Xuống dòng bằng \\n khi cần thiết.",
  "summary": "Tóm tắt nội dung bằng tiếng Việt (2-3 câu)",
  "level": "Trình độ ước tính A1/A2/B1/B2/C1/C2",
  "vocab": [{"fr":"từ","type":"n.m/n.f/v/adj/adv/prep/expr","vi":"nghĩa","example":"câu ví dụ"}],
  "grammar": [{"point":"điểm ngữ pháp","explanation":"giải thích tiếng Việt","example":"câu ví dụ"}],
  "notes": [{"type":"Phong cách/Văn hóa/Lưu ý/Thành ngữ","content":"nội dung"}]
}
Chọn 15-20 từ vựng quan trọng nhất và 4-6 điểm ngữ pháp nổi bật.`;
      const res = await callAI(prompt);
      setResult(res);
      setState("done");
      setActiveTab("vocab");
      saveToHistory(res, content);
    } catch(e) { setErr(e.message); setState("error"); }
  };

  const handleFile = async (file) => {
    const ext = file.name.split(".").pop().toLowerCase();
    setState("loading");
    try {
      if (ext==="txt") { const t=await file.text(); setInputText(t); await analyse(t); }
      else if (ext==="pdf") {
        if (!window.pdfjsLib) {
          await new Promise((res,rej)=>{ const s=document.createElement("script"); s.src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"; s.onload=res; s.onerror=rej; document.head.appendChild(s); });
          window.pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        }
        const pdf=await window.pdfjsLib.getDocument({data:await file.arrayBuffer()}).promise;
        let txt=""; for(let i=1;i<=Math.min(pdf.numPages,5);i++){const p=await pdf.getPage(i);const c=await p.getTextContent();txt+=c.items.map(x=>x.str).join(" ")+"\n";}
        setInputText(txt); await analyse(txt);
      } else if (["jpg","jpeg","png","webp"].includes(ext)) {
        const b64=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(",")[1]);r.onerror=rej;r.readAsDataURL(file);});
        const mt=ext==="jpg"?"image/jpeg":`image/${ext}`;
        const extractRes=await fetch("/api/proxy",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:MODEL,max_tokens:3000,system:"Extract all French text from this image exactly as written. Return only the text.",messages:[{role:"user",content:[{type:"image",source:{type:"base64",media_type:mt,data:b64}},{type:"text",text:"Extract French text."}]}]})});
        const ed=await extractRes.json(); if(ed.error)throw new Error(ed.error.message);
        const t=ed.content.map(c=>c.text||"").join("").trim();
        setInputText(t); await analyse(t);
      } else throw new Error(`Định dạng .${ext} chưa hỗ trợ`);
    } catch(e) { setErr(e.message); setState("error"); }
  };

  // ── Generate exercises ──
  const generateExercises = async () => {
    if (!result) return;
    setExLoading(true); setExercises(null);
    try {
      const vocabList     = (result.vocab||[]).map(w=>`${w.fr} — ${w.vi}`).join("\n");
      const grammarPoints = (result.grammar||[]).map(g=>g.point).join(", ");
      let prompt = "";
      if (exType==="vocab_fr_vi" || exType==="mixed") {
        prompt = `French teacher. Create 8 multiple choice questions testing vocabulary translation (FR→VI and VI→FR mixed).
Vocabulary from text: ${vocabList}
Return ONLY JSON: {"type":"multiple_choice","questions":[{"question":"...","options":["A","B","C","D"],"answer":"exact option","explanation":"Vietnamese tip","wrongExplanations":{"wrong option":"what it means"}}]}`;
      }
      if (exType==="grammar") {
        prompt = `French teacher. Create 6 grammar exercises based on these grammar points: ${grammarPoints}.
Use examples from or inspired by this text context.
Return ONLY JSON: {"type":"mixed","sections":[{"sectionType":"mc","exercises":[{"question":"...","options":["a","b","c","d"],"answer":"correct","explanation":"Vietnamese why"}]},{"sectionType":"fill","exercises":[{"sentence":"sentence with ___","answer":"word","hint":"Vietnamese hint","explanation":"why"}]}]}`;
      }
      if (exType==="mixed") {
        const vocabRes = await callAI(prompt);
        const grammarPrompt = `French teacher. Create 4 grammar exercises based on: ${grammarPoints}.
Return ONLY JSON: {"type":"mixed","sections":[{"sectionType":"mc","exercises":[{"question":"...","options":["a","b","c","d"],"answer":"correct","explanation":"Vietnamese why"}]},{"sectionType":"fill","exercises":[{"sentence":"sentence with ___","answer":"word","hint":"hint","explanation":"why"}]}]}`;
        const grammarRes = await callAI(grammarPrompt);
        setExercises({ type:"combined", vocab: vocabRes, grammar: grammarRes });
        setExLoading(false); setState("exercises"); return;
      }
      const res = await callAI(prompt);
      setExercises(res);
      setState("exercises");
    } catch(e) { setErr(e.message); }
    setExLoading(false);
  };

  // ── Word type colors (semantic) ──
  const typeColor = t => ({"n.m":"#6b4fbb","n.f":"#c0392b","v":"#3d8b6f","adj":"#c9a84c","adv":"#2980b9","prep":"#8a8a9a","expr":"#e67e22"}[t]||C.gray);

  // ── Export PDF ──
  const exportPDF = () => {
    if (!result) return;
    const date = new Date().toLocaleDateString("vi-VN");
    const vocabRows = (result.vocab||[]).map((w,i)=>`<tr style="background:${i%2===0?"#faf8f4":"#fff"}"><td style="padding:8px 12px;font-family:Georgia,serif;font-weight:600;color:#1a1a2e">${w.fr}</td><td style="padding:8px 12px;text-align:center"><span style="background:${typeColor(w.type)}22;color:${typeColor(w.type)};padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600">${w.type||""}</span></td><td style="padding:8px 12px;color:#1a1a2e">${w.vi}</td><td style="padding:8px 12px;color:#666;font-style:italic;font-size:12px">${w.example||""}</td></tr>`).join("");
    const grammarItems = (result.grammar||[]).map(g=>`<div style="background:#fff;border:1px solid #ddd8cc;border-radius:10px;padding:14px 16px;margin-bottom:10px"><div style="font-family:Georgia,serif;color:#4A90D9;font-size:15px;margin-bottom:6px">🧩 ${g.point}</div><div style="color:#1a1a2e;line-height:1.7;font-size:13px;margin-bottom:8px">${g.explanation}</div>${g.example?`<div style="background:#EBF4FF;padding:8px 12px;border-radius:6px;font-style:italic;color:#555;font-size:12px">« ${g.example} »</div>`:""}</div>`).join("");
    const notesItems = (result.notes||[]).map(n=>`<div style="background:#fff;border:1px solid #ddd8cc;border-radius:10px;padding:14px 16px;margin-bottom:10px"><div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#c9a84c;font-weight:700;margin-bottom:6px">${n.type}</div><div style="color:#1a1a2e;line-height:1.7;font-size:13px">${n.content}</div></div>`).join("");
    const translationHtml = (result.translation||"").replace(/\n/g,"<br>");
    const html=`<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>Phân tích — Français</title>
<style>*{box-sizing:border-box}body{font-family:system-ui,sans-serif;max-width:780px;margin:0 auto;padding:32px 24px;color:#1a1a2e;background:#faf8f4}.hdr{background:#1B3A6B;color:#faf8f4;padding:24px 28px;border-radius:14px;margin-bottom:28px}.hdr h1{font-family:Georgia,serif;font-size:22px;margin-bottom:4px}.meta{font-size:12px;color:#a0a0b8}.badge{background:#4A90D9;color:#fff;padding:3px 10px;border-radius:20px;font-size:11px;margin-left:8px}.gold{width:40px;height:2px;background:#F5A623;margin:10px 0}.sec{font-family:Georgia,serif;font-size:16px;color:#4A90D9;border-bottom:2px solid #EBF4FF;padding-bottom:8px;margin:28px 0 14px}table{width:100%;border-collapse:collapse;border-radius:10px;overflow:hidden}th{background:#1B3A6B;color:#faf8f4;padding:10px 12px;text-align:left;font-size:12px;font-weight:600}.trans{background:#EBF4FF;border-radius:10px;padding:16px;line-height:1.9;font-size:13px}.orig{background:#fff;border:1px solid #ddd8cc;border-radius:10px;padding:16px;line-height:1.8;font-size:13px;font-family:Georgia,serif;margin-bottom:10px;white-space:pre-wrap}@media print{body{padding:20px}}</style>
</head><body>
<div class="hdr"><div class="meta">Français · ${date}</div><div class="gold"></div><h1>Kết quả phân tích<span class="badge">${result.level||""}</span></h1>${result.summary?`<div style="margin-top:10px;font-size:13px;color:#a0a0b8;line-height:1.6">${result.summary}</div>`:""}</div>
<div class="sec">📚 Từ vựng (${(result.vocab||[]).length} từ)</div>
<table><tr><th>Từ tiếng Pháp</th><th style="width:80px;text-align:center">Loại</th><th>Nghĩa</th><th>Ví dụ</th></tr>${vocabRows}</table>
<div class="sec">🧩 Ngữ pháp</div>${grammarItems}
<div class="sec">💡 Điểm lưu ý</div>${notesItems}
<div class="sec">🌐 Bản dịch</div>
${inputText?`<div class="orig">${inputText.slice(0,600)}${inputText.length>600?"...":""}</div>`:""}
<div class="trans">${translationHtml}</div>
</body></html>`;
    const blob=new Blob([html],{type:"text/html;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a"); a.href=url; a.download=`phan-tich-${date.replace(/\//g,"-")}.html`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  };

  // ── Render exercises ──
  const renderExercises = () => {
    if (!exercises) return null;
    if (exercises.type==="combined") return (
      <div>
        <div style={{ fontFamily:"Georgia,serif", fontSize:"0.9rem", color:C.blue, marginBottom:"0.5rem", paddingBottom:"0.3rem", borderBottom:`1px solid ${C.border}` }}>☑ Từ vựng — Trắc nghiệm</div>
        {exercises.vocab?.questions && <MCSection questions={exercises.vocab.questions} onRecord={()=>{}} />}
        <div style={{ fontFamily:"Georgia,serif", fontSize:"0.9rem", color:C.blue, margin:"0.8rem 0 0.5rem", paddingBottom:"0.3rem", borderBottom:`1px solid ${C.border}` }}>🧩 Ngữ pháp</div>
        {exercises.grammar?.sections?.map((sec,i)=>(
          <div key={i}>
            {sec.sectionType==="mc"   && sec.exercises && <MCSection   questions={sec.exercises.map(e=>({question:e.question,options:e.options,answer:e.answer,explanation:e.explanation}))} onRecord={()=>{}} sl />}
            {sec.sectionType==="fill" && sec.exercises && <FillSection questions={sec.exercises.map(e=>({sentence:e.sentence,answer:e.answer,hint:e.hint}))} onRecord={()=>{}} sl />}
          </div>
        ))}
      </div>
    );
    if (exercises.type==="multiple_choice") return <MCSection questions={exercises.questions} onRecord={()=>{}} />;
    return null;
  };

  // ── History view ──
  if (state==="history") return (
    <div style={{ padding:"0.75rem 1rem" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.75rem" }}>
        <div style={{ fontSize:"0.72rem", fontWeight:700, color:C.blue }}>📁 Lịch sử phân tích</div>
        <button onClick={()=>setState("idle")}
          style={{ padding:"0.25rem 0.7rem", background:C.blue, color:C.white, border:"none", borderRadius:20, fontSize:"0.65rem", cursor:"pointer", fontWeight:600 }}>
          + Phân tích mới
        </button>
      </div>
      {history.length===0
        ? <div style={{ textAlign:"center", color:C.gray, fontSize:"0.85rem", padding:"2rem" }}>Chưa có lịch sử phân tích nào.</div>
        : history.map(h => (
          <div key={h.id} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"0.8rem 1rem", marginBottom:"0.5rem" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div style={{ flex:1, marginRight:"0.5rem" }}>
                {h.level && <span style={{ background:C.blue, color:C.white, fontSize:"0.6rem", padding:"0.12rem 0.45rem", borderRadius:20, marginRight:"0.4rem" }}>{h.level}</span>}
                <span style={{ fontSize:"0.65rem", color:C.gray }}>{h.date}</span>
                <div style={{ fontSize:"0.8rem", color:C.ink, marginTop:"0.3rem", lineHeight:1.5 }}>{h.summary}</div>
                <div style={{ fontSize:"0.65rem", color:C.gray, marginTop:"0.2rem" }}>{h.result?.vocab?.length||0} từ · {h.result?.grammar?.length||0} điểm ngữ pháp</div>
              </div>
              <div style={{ display:"flex", gap:"0.3rem", flexShrink:0 }}>
                <button onClick={()=>{setResult(h.result);setInputText(h.inputText||"");setState("done");setActiveTab("vocab");}}
                  style={{ padding:"0.25rem 0.6rem", background:C.blue, color:C.white, border:"none", borderRadius:6, fontSize:"0.7rem", cursor:"pointer", fontWeight:600 }}>Xem</button>
                <button onClick={()=>{const u=history.filter(x=>x.id!==h.id);setHistory(u);saveAnalyseHistory(u);}}
                  style={{ padding:"0.25rem 0.5rem", background:"transparent", color:C.gray, border:`1px solid ${C.border}`, borderRadius:6, fontSize:"0.7rem", cursor:"pointer" }}>🗑</button>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );

  // ── Exercise view ──
  if (state==="exercises") return (
    <div style={{ padding:"0.75rem 1rem" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.8rem" }}>
        <span style={{ background:C.blue, color:C.white, fontSize:"0.6rem", padding:"0.16rem 0.52rem", borderRadius:20, textTransform:"uppercase", letterSpacing:0.5 }}>Bài tập từ văn bản</span>
        <div style={{ display:"flex", gap:"0.35rem" }}>
          <button onClick={()=>{setExercises(null);generateExercises();}}
            style={{ padding:"0.23rem 0.6rem", border:`1.5px solid ${C.border}`, borderRadius:20, background:C.white, color:C.ink, fontSize:"0.68rem", cursor:"pointer" }}>🔄 Tạo lại</button>
          <button onClick={()=>setState("done")}
            style={{ padding:"0.23rem 0.6rem", border:`1.5px solid ${C.border}`, borderRadius:20, background:C.white, color:C.ink, fontSize:"0.68rem", cursor:"pointer" }}>← Phân tích</button>
        </div>
      </div>
      {exLoading
        ? <div style={{ display:"flex", flexDirection:"column", alignItems:"center", height:180, justifyContent:"center", gap:"0.7rem", color:C.gray }}><Spinner/><span style={{ fontSize:"0.83rem" }}>Đang tạo bài tập...</span></div>
        : renderExercises()
      }
    </div>
  );

  // ── Main view ──
  return (
    <div style={{ padding:"0.75rem 1rem 4rem", display:"flex", flexDirection:"column", gap:"0.85rem" }}>

      {/* Upload area */}
      {state!=="done" && (
        <div style={{ background:C.blueL, border:`1.5px solid ${C.blue}22`, borderRadius:14, padding:"0.9rem", display:"flex", flexDirection:"column", gap:"0.65rem" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ fontSize:"0.72rem", fontWeight:700, color:C.blue }}>🔍 Phân tích văn bản tiếng Pháp</div>
            <button onClick={()=>setState("history")}
              style={{ padding:"0.22rem 0.6rem", background:"transparent", border:`1px solid ${C.blue}55`, color:C.blue, borderRadius:20, fontSize:"0.65rem", cursor:"pointer", fontWeight:600 }}>
              📁 Lịch sử ({history.length})
            </button>
          </div>

          {/* File upload buttons */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"0.35rem" }}>
            {[{label:"📄 .txt",accept:".txt"},{label:"📕 .pdf",accept:".pdf"},{label:"🖼️ Ảnh",accept:"image/*"}].map(btn=>(
              <label key={btn.accept}
                style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.2rem", padding:"0.6rem 0.3rem", border:`1.5px solid ${C.border}`, borderRadius:10, cursor:"pointer", fontSize:"0.72rem", color:C.ink, textAlign:"center", background:C.white }}>
                <span style={{ fontSize:"1.1rem" }}>{btn.label}</span>
                <input type="file" accept={btn.accept} style={{ display:"none" }} onChange={e=>e.target.files[0]&&handleFile(e.target.files[0])} />
              </label>
            ))}
          </div>

          <div style={{ fontSize:"0.65rem", color:C.gray, textAlign:"center" }}>— hoặc dán văn bản trực tiếp —</div>
          <textarea value={inputText} onChange={e=>setInputText(e.target.value)}
            placeholder="Dán văn bản tiếng Pháp vào đây..."
            style={{ width:"100%", height:120, border:`1.5px solid ${C.border}`, borderRadius:8, padding:"0.6rem", fontFamily:"inherit", fontSize:"0.82rem", background:C.white, resize:"vertical", color:C.ink, lineHeight:1.6, outline:"none", boxSizing:"border-box" }}/>
          {err && <div style={{ color:"#DC2626", fontSize:"0.75rem", padding:"0.38rem 0.58rem", background:"#FEF2F2", borderRadius:6, border:"1px solid #FCA5A5" }}>⚠ {err}</div>}
          <button onClick={()=>inputText.trim()&&analyse(inputText)} disabled={!inputText.trim()||state==="loading"}
            style={{ padding:"0.75rem", background: inputText.trim() ? `linear-gradient(135deg, ${C.accent}, #c0392b)` : C.border, color:C.white, border:"none", borderRadius:10, fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.92rem", cursor:!inputText.trim()?"not-allowed":"pointer", fontWeight:700, transition:"background 0.15s", boxShadow: inputText.trim() ? `0 4px 14px ${C.accent}44` : "none" }}>
            Phân tích ✦
          </button>
        </div>
      )}

      {/* Loading */}
      {state==="loading" && (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:200, gap:"0.7rem", color:C.gray }}>
          <Spinner/>
          <span style={{ fontSize:"0.83rem" }}>AI đang phân tích...</span>
        </div>
      )}

      {/* Results */}
      {state==="done" && result && (
        <>
          {/* Header */}
          <div style={{ background:"linear-gradient(135deg, #1B3A6B 0%, #2d4f8a 100%)", borderRadius:14, padding:"0.9rem 1rem" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.95rem", color:"#fff", fontWeight:700, marginBottom:"0.25rem" }}>
                  Kết quả phân tích
                  {result.level && <span style={{ background:"rgba(255,255,255,0.2)", color:"#fff", fontSize:"0.6rem", padding:"0.12rem 0.5rem", borderRadius:20, marginLeft:"0.5rem", fontWeight:600 }}>{result.level}</span>}
                </div>
                {result.summary && <div style={{ fontSize:"0.72rem", color:"rgba(255,255,255,0.65)", lineHeight:1.5 }}>{result.summary}</div>}
              </div>
              <div style={{ display:"flex", gap:"0.3rem", flexShrink:0, marginLeft:"0.5rem" }}>
                <button onClick={exportPDF}
                  style={{ fontSize:"0.65rem", color:C.gold, background:"transparent", border:`1px solid ${C.gold}55`, borderRadius:20, padding:"0.2rem 0.55rem", cursor:"pointer" }}>📄 PDF</button>
                <button onClick={()=>setState("history")}
                  style={{ fontSize:"0.65rem", color:"rgba(255,255,255,0.7)", background:"transparent", border:"1px solid rgba(255,255,255,0.3)", borderRadius:20, padding:"0.2rem 0.5rem", cursor:"pointer" }}>📁</button>
                <button onClick={()=>{setState("idle");setResult(null);setInputText("");setErr("");}}
                  style={{ fontSize:"0.65rem", color:"rgba(255,255,255,0.7)", background:"transparent", border:"1px solid rgba(255,255,255,0.3)", borderRadius:20, padding:"0.2rem 0.5rem", cursor:"pointer" }}>✕</button>
              </div>
            </div>
          </div>

          {/* Exercise generator */}
          <div style={{ background:C.blueL, border:`1.5px solid ${C.blue}33`, borderRadius:14, padding:"0.85rem 1rem" }}>
            <div style={{ fontSize:"0.7rem", fontWeight:700, color:C.blue, marginBottom:"0.55rem" }}>🎯 Tạo bài tập từ văn bản này</div>
            <div style={{ display:"flex", gap:"0.35rem", marginBottom:"0.55rem", flexWrap:"wrap" }}>
              {[{id:"mixed",label:"🎲 Hỗn hợp"},{id:"vocab_fr_vi",label:"📚 Từ vựng"},{id:"grammar",label:"🧩 Ngữ pháp"}].map(t=>(
                <button key={t.id} onClick={()=>setExType(t.id)}
                  style={{ padding:"0.28rem 0.65rem", border:`1.5px solid ${exType===t.id?C.blue:C.border}`, borderRadius:20, background:exType===t.id?C.blue:C.white, color:exType===t.id?C.white:C.ink, fontSize:"0.72rem", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}>
                  {t.label}
                </button>
              ))}
            </div>
            <button onClick={generateExercises} disabled={exLoading}
              style={{ width:"100%", padding:"0.6rem", background: exLoading ? C.border : `linear-gradient(135deg, ${C.accent}, #c0392b)`, color:C.white, border:"none", borderRadius:10, fontSize:"0.85rem", cursor:exLoading?"not-allowed":"pointer", fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, transition:"all 0.15s" }}>
              {exLoading ? "Đang tạo..." : "Tạo bài tập ✦"}
            </button>
          </div>

          {/* Content tabs */}
          <div style={{ display:"flex", gap:"0.35rem", overflowX:"auto", paddingBottom:"0.2rem", scrollbarWidth:"none" }}>
            {[{id:"vocab",label:"📚 Từ vựng"},{id:"grammar",label:"🧩 Ngữ pháp"},{id:"notes",label:"💡 Lưu ý"},{id:"trans",label:"🌐 Bản dịch"}].map(t=>(
              <button key={t.id} onClick={()=>setActiveTab(t.id)}
                style={{ padding:"0.4rem 0.8rem", border:`1.5px solid ${activeTab===t.id?C.blue:C.border}`, borderRadius:20, background:activeTab===t.id?C.blue:C.white, color:activeTab===t.id?C.white:C.ink, fontSize:"0.75rem", cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit", transition:"all 0.15s", fontWeight:activeTab===t.id?700:400 }}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Vocab tab */}
          {activeTab==="vocab" && result.vocab && (
            <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem" }}>
              {result.vocab.map((w,i)=>(
                <div key={i} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:"0.65rem 0.85rem" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"0.2rem" }}>
                    <span style={{ fontFamily:"Georgia,serif", fontSize:"0.92rem", fontWeight:600, color:C.ink }}>{w.fr}</span>
                    {w.type && <span style={{ fontSize:"0.62rem", background:typeColor(w.type)+"22", color:typeColor(w.type), padding:"0.1rem 0.4rem", borderRadius:10, fontWeight:600 }}>{w.type}</span>}
                  </div>
                  <div style={{ fontSize:"0.78rem", color:C.ink, marginBottom:"0.15rem" }}>{w.vi}</div>
                  {w.example && <div style={{ fontSize:"0.7rem", color:C.gray, fontStyle:"italic" }}>« {w.example} »</div>}
                </div>
              ))}
            </div>
          )}

          {/* Grammar tab */}
          {activeTab==="grammar" && result.grammar && (
            <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem" }}>
              {result.grammar.map((g,i)=>(
                <div key={i} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:"0.65rem 0.85rem" }}>
                  <div style={{ fontFamily:"Georgia,serif", fontSize:"0.88rem", color:C.blue, marginBottom:"0.3rem", fontWeight:600 }}>🧩 {g.point}</div>
                  <div style={{ fontSize:"0.78rem", color:C.ink, lineHeight:1.6, marginBottom:"0.25rem" }}>{g.explanation}</div>
                  {g.example && <div style={{ fontSize:"0.72rem", color:C.gray, fontStyle:"italic", background:C.blueL, padding:"0.3rem 0.55rem", borderRadius:6 }}>« {g.example} »</div>}
                </div>
              ))}
            </div>
          )}

          {/* Notes tab */}
          {activeTab==="notes" && result.notes && (
            <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem" }}>
              {result.notes.map((n,i)=>(
                <div key={i} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:"0.65rem 0.85rem" }}>
                  <div style={{ fontSize:"0.65rem", textTransform:"uppercase", letterSpacing:1, color:C.gold, marginBottom:"0.3rem", fontWeight:700 }}>{n.type}</div>
                  <div style={{ fontSize:"0.82rem", color:C.ink, lineHeight:1.6 }}>{n.content}</div>
                </div>
              ))}
            </div>
          )}

          {/* Translation tab */}
          {activeTab==="trans" && (
            <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
              {inputText && (
                <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:"0.75rem 0.85rem" }}>
                  <div style={{ fontSize:"0.63rem", textTransform:"uppercase", letterSpacing:1, color:C.gray, marginBottom:"0.4rem", fontWeight:600 }}>Văn bản gốc</div>
                  <div style={{ fontFamily:"Georgia,serif", fontSize:"0.85rem", color:C.ink, lineHeight:1.8, whiteSpace:"pre-wrap" }}>{inputText.slice(0,800)}{inputText.length>800?"...":""}</div>
                </div>
              )}
              <div style={{ background:C.blueL, border:`1.5px solid ${C.blue}33`, borderRadius:10, padding:"0.75rem 0.85rem" }}>
                <div style={{ fontSize:"0.63rem", textTransform:"uppercase", letterSpacing:1, color:C.blue, marginBottom:"0.4rem", fontWeight:700 }}>Bản dịch tiếng Việt</div>
                <div style={{ fontSize:"0.85rem", color:C.ink, lineHeight:1.9, whiteSpace:"pre-wrap" }}>{result.translation}</div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
