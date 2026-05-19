import { useState } from "react";
import { C } from "../../constants.js";
import { callAI } from "../../utils/api.js";
import Spinner from "./Spinner.jsx";

export function SecLabel({ icon, text }) {
  return <div style={{ fontFamily:"Georgia,serif", fontSize:"0.9rem", color:C.purple, marginBottom:"0.5rem", paddingBottom:"0.28rem", borderBottom:`1px solid ${C.border}` }}>{icon} {text}</div>;
}

export function QCard({ children, ok, wrong }) {
  return <div style={{ background: ok?"#f0faf6": wrong?"#fdf5f4":C.white, border:`1.5px solid ${ok?C.green:wrong?C.red:C.border}`, borderRadius:12, padding:"0.85rem 1rem", marginBottom:"0.6rem", transition:"all 0.2s" }}>{children}</div>;
}

export function SaveModal({ text, onSave, onClose }) {
  const [name, setName] = useState("");
  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"1rem" }} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{ background:C.white,borderRadius:16,padding:"1.5rem",width:"100%",maxWidth:360,display:"flex",flexDirection:"column",gap:"0.8rem" }}>
        <div style={{ fontFamily:"Georgia,serif",fontSize:"1rem",color:C.purple }}>💾 Lưu bộ từ</div>
        <input value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&name.trim()&&onSave(name.trim())}
          placeholder="Tên bộ từ (vd: Chủ đề nghề nghiệp)" autoFocus
          style={{ border:`1.5px solid ${C.border}`,borderRadius:8,padding:"0.6rem 0.8rem",fontSize:"0.88rem",outline:"none",fontFamily:"inherit" }} />
        <div style={{ display:"flex",gap:"0.5rem" }}>
          <button onClick={onClose} style={{ flex:1,padding:"0.6rem",border:`1.5px solid ${C.border}`,borderRadius:8,background:C.white,color:C.gray,fontSize:"0.83rem",cursor:"pointer" }}>Huỷ</button>
          <button onClick={()=>name.trim()&&onSave(name.trim())} style={{ flex:2,padding:"0.6rem",border:"none",borderRadius:8,background:C.purple,color:C.white,fontSize:"0.83rem",cursor:"pointer",fontFamily:"Georgia,serif" }}>Lưu ✦</button>
        </div>
      </div>
    </div>
  );
}

export function ImportModal({ onImport, onClose }) {
  const [state, setState] = useState("idle");
  const [preview, setPreview] = useState("");
  const [err, setErr] = useState("");

  // MODEL is needed for image import - import directly
  const MODEL = "claude-sonnet-4-6";

  const processFile = async file => {
    setState("loading"); setErr("");
    try {
      const ext = file.name.split(".").pop().toLowerCase();
      if (ext==="txt") { setPreview((await file.text()).trim()); setState("preview"); return; }
      if (ext==="csv") {
        const lines = (await file.text()).split("\n").map(l=>l.trim()).filter(Boolean);
        setPreview(lines.map(l=>{ const p=l.split(/[,;]/).map(x=>x.replace(/^"|"$/g,"").trim()); return p.length>=2?`${p[0]} — ${p[1]}`:p[0]; }).join("\n"));
        setState("preview"); return;
      }
      if (ext==="pdf") {
        if (!window.pdfjsLib) {
          await new Promise((res,rej)=>{ const s=document.createElement("script"); s.src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"; s.onload=res; s.onerror=rej; document.head.appendChild(s); });
          window.pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        }
        const pdf = await window.pdfjsLib.getDocument({data:await file.arrayBuffer()}).promise;
        let txt=""; for(let i=1;i<=Math.min(pdf.numPages,10);i++){const p=await pdf.getPage(i);const c=await p.getTextContent();txt+=c.items.map(x=>x.str).join(" ")+"\n";}
        const r = await callAI(`Extract French vocabulary from this text. Return each on its own line as: French — Vietnamese. Only the word list.\n\n${txt.slice(0,4000)}`);
        setPreview(typeof r==="string"?r:Object.values(r).join("\n")); setState("preview"); return;
      }
      if (["jpg","jpeg","png","webp","heic","gif"].includes(ext)) {
        const b64 = await new Promise((res,rej)=>{ const r=new FileReader(); r.onload=()=>res(r.result.split(",")[1]); r.onerror=rej; r.readAsDataURL(file); });
        const mt = ["jpg","heic"].includes(ext)?"image/jpeg":`image/${ext}`;
        const res = await fetch("/api/proxy",{ method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:MODEL, max_tokens:1000, system:"Extract vocabulary from image. Return each word on its own line as: French — Vietnamese. Only the word list.", messages:[{role:"user",content:[{type:"image",source:{type:"base64",media_type:mt,data:b64}},{type:"text",text:"Extract vocabulary."}]}] }) });
        const d = await res.json(); if(d.error)throw new Error(d.error.message);
        setPreview(d.content.map(c=>c.text||"").join("").trim()); setState("preview"); return;
      }
      throw new Error(`Định dạng .${ext} chưa hỗ trợ`);
    } catch(e) { setErr(e.message); setState("error"); }
  };

  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100 }} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{ background:C.white,borderRadius:"16px 16px 0 0",padding:"1.25rem",width:"100%",maxWidth:480,maxHeight:"80vh",display:"flex",flexDirection:"column",gap:"0.8rem" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <div style={{ fontFamily:"Georgia,serif",fontSize:"1rem",color:C.purple }}>📁 Import từ vựng</div>
          <button onClick={onClose} style={{ background:"transparent",border:"none",fontSize:"1.2rem",cursor:"pointer",color:C.gray }}>×</button>
        </div>
        {(state==="idle"||state==="error")&&<>
          <div onDrop={e=>{e.preventDefault();e.dataTransfer.files[0]&&processFile(e.dataTransfer.files[0]);}} onDragOver={e=>e.preventDefault()}
            style={{ border:`2px dashed ${C.border}`,borderRadius:12,padding:"1.5rem 1rem",textAlign:"center",color:C.gray,fontSize:"0.82rem",lineHeight:1.8 }}>
            <div style={{ fontSize:"1.8rem",marginBottom:"0.3rem" }}>📂</div>Kéo thả file vào đây<br/><span style={{ fontSize:"0.72rem" }}>hoặc chọn file bên dưới</span>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"0.5rem" }}>
            {[{label:"📄 .txt",accept:".txt",desc:"Mỗi dòng 1 từ"},{label:"📊 .csv",accept:".csv",desc:"2 cột"},{label:"📕 .pdf",accept:".pdf",desc:"Giáo trình"},{label:"🖼️ Ảnh",accept:"image/*",desc:"Chụp bảng từ"}].map(btn=>(
              <label key={btn.accept} style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:"0.2rem",padding:"0.6rem 0.3rem",border:`1.5px solid ${C.border}`,borderRadius:10,cursor:"pointer",fontSize:"0.72rem",color:C.ink,textAlign:"center",background:C.cream }}>
                <span style={{ fontSize:"1.1rem" }}>{btn.label}</span><span style={{ color:C.gray,fontSize:"0.65rem" }}>{btn.desc}</span>
                <input type="file" accept={btn.accept} style={{ display:"none" }} onChange={e=>e.target.files[0]&&processFile(e.target.files[0])} />
              </label>
            ))}
          </div>
          {state==="error"&&<div style={{ color:C.red,fontSize:"0.75rem",padding:"0.4rem 0.6rem",background:"#fde8e6",borderRadius:6 }}>⚠ {err}</div>}
        </>}
        {state==="loading"&&<div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:"0.7rem",padding:"1.5rem",color:C.gray }}><Spinner/><span style={{ fontSize:"0.83rem" }}>Đang đọc file...</span></div>}
        {state==="preview"&&<>
          <div style={{ fontSize:"0.72rem",color:C.gray }}>Xem lại trước khi import:</div>
          <textarea value={preview} onChange={e=>setPreview(e.target.value)} style={{ width:"100%",height:180,border:`1.5px solid ${C.border}`,borderRadius:8,padding:"0.55rem",fontFamily:"inherit",fontSize:"0.78rem",lineHeight:1.6,outline:"none",resize:"none",boxSizing:"border-box",overflowY:"auto" }} />
          <div style={{ display:"flex",gap:"0.5rem" }}>
            <button onClick={()=>setState("idle")} style={{ flex:1,padding:"0.6rem",border:`1.5px solid ${C.border}`,borderRadius:8,background:C.white,color:C.gray,fontSize:"0.83rem",cursor:"pointer" }}>← Chọn lại</button>
            <button onClick={()=>{onImport(preview);onClose();}} style={{ flex:2,padding:"0.6rem",border:"none",borderRadius:8,background:C.purple,color:C.white,fontSize:"0.83rem",cursor:"pointer",fontFamily:"Georgia,serif" }}>Import {preview.split("\n").filter(Boolean).length} từ ✦</button>
          </div>
        </>}
      </div>
    </div>
  );
}
