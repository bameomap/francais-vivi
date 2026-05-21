import { useState, useRef } from "react";
import { C } from "../constants.js";
import { callAI } from "../utils/api.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import Spinner from "./ui/Spinner.jsx";
import { SecLabel } from "./ui/SharedUI.jsx";
import ConjugaisonPanel from "./ConjugaisonPanel.jsx";

const LEVELS = ["A1","A2","B1","B2","C1","C2"];
const GTYPES = [
  { id:"mc",    label:"☑ Chọn đáp án" },
  { id:"fill",  label:"✏️ Điền vào chỗ trống" },
  { id:"order", label:"🔀 Sắp xếp câu" },
  { id:"mixed", label:"🎲 Hỗn hợp" },
];

export function buildGrammarPrompt(topic, level, gtype, n) {
  const base = `French grammar teacher. Create ${n} exercises on the topic: "${topic}" for level ${level}.`;
  // explanationRules: array of {type, content} where type = "rule"|"warning"|"note"
  // This structured format allows the UI to render each rule on its own line with proper styling.
  const explSchema = `"explanationRules":[{"type":"rule","content":"Quy tắc 1 — giải thích ngắn gọn tiếng Việt"},{"type":"rule","content":"Quy tắc 2 — ..."},{"type":"warning","content":"⚠️ Lưu ý quan trọng"},{"type":"note","content":"Ngoại lệ hoặc mẹo nhớ"}]`;
  if (gtype === "mc") return `${base}\nReturn ONLY JSON: {"type":"mc","topic":"${topic}","level":"${level}",${explSchema},"exercises":[{"question":"Full sentence with context","options":["option1","option2","option3","option4"],"answer":"correct option","explanation":"why this is correct in Vietnamese"}]}`;
  if (gtype === "fill") return `${base}\nReturn ONLY JSON: {"type":"fill","topic":"${topic}","level":"${level}",${explSchema},"exercises":[{"sentence":"French sentence with ___ for the blank","answer":"correct word/form","hint":"brief Vietnamese hint","explanation":"why this form is correct in Vietnamese"}]}`;
  if (gtype === "order") return `${base} Create sentences where words are scrambled.\nIMPORTANT: The "words" array must NOT contain punctuation (no periods, commas, question marks). Punctuation goes only in "answer".\nReturn ONLY JSON: {"type":"order","topic":"${topic}","level":"${level}",${explSchema},"exercises":[{"words":["word1","word2","word3","word4","word5"],"answer":"Correct sentence (may include punctuation)","translation":"Vietnamese translation","explanation":"note about word order in Vietnamese"}]}`;
  if (gtype === "mixed") return `${base} Create a mix: ${Math.ceil(n/3)} multiple choice + ${Math.ceil(n/3)} fill-in-blank + ${Math.floor(n/3)} word order.\nFor word order exercises: "words" array must NOT contain punctuation.\nReturn ONLY JSON: {"type":"mixed","topic":"${topic}","level":"${level}",${explSchema},"sections":[{"sectionType":"mc","exercises":[{"question":"...","options":["a","b","c","d"],"answer":"correct","explanation":"Vietnamese why"}]},{"sectionType":"fill","exercises":[{"sentence":"sentence with ___","answer":"word","hint":"hint","explanation":"Vietnamese why"}]},{"sectionType":"order","exercises":[{"words":["w1","w2","w3"],"answer":"Correct sentence","translation":"Vietnamese","explanation":"note"}]}`;
  return "";
}

export function GrammarMC({ exercises, onWrong }) {
  const [ans, setAns] = useState({});
  return <div>{exercises.map((q,i) => {
    const a = ans[i], ok = a === q.answer;
    return (
      <div key={i} style={{ background:a?(ok?"#f0faf6":"#fdf5f4"):C.white, border:`1.5px solid ${a?(ok?C.green:C.red):C.border}`, borderRadius:12, padding:"0.85rem 1rem", marginBottom:"0.6rem" }}>
        <div style={{ fontSize:"0.63rem", color:C.gray, textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>Câu {i+1}</div>
        <div style={{ fontFamily:"Georgia,serif", fontSize:"0.93rem", marginBottom:"0.6rem", lineHeight:1.5 }}>{q.question}</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.3rem" }}>
          {q.options.map((opt,j) => {
            let bg=C.white,bc=C.border,col=C.ink;
            if(a){if(opt===q.answer){bg="#e8f7f1";bc=C.green;col=C.green;}else if(opt===a){bg="#fde8e6";bc=C.red;col=C.red;}}
            return <button key={j} disabled={!!a} onClick={()=>{setAns(x=>({...x,[i]:opt}));if(opt!==q.answer)onWrong?.(q);}}
              style={{padding:"0.42rem 0.55rem",border:`1.5px solid ${bc}`,borderRadius:8,background:bg,color:col,fontSize:"0.78rem",cursor:a?"default":"pointer",textAlign:"left",fontFamily:"inherit"}}>{opt}</button>;
          })}
        </div>
        {a && <div style={{ marginTop:"0.4rem", fontSize:"0.72rem", lineHeight:1.7 }}>
          {ok ? <span style={{color:C.green}}>✓ Chính xác!</span>
              : <><div style={{color:C.red}}>✗ <b>{a}</b></div><div style={{color:C.green}}>✓ <b>{q.answer}</b></div></>}
          {q.explanation && <div style={{color:C.gray,marginTop:"0.2rem"}}>💡 {q.explanation}</div>}
        </div>}
      </div>
    );
  })}</div>;
}

export function GrammarFill({ exercises }) {
  const [inp, setInp] = useState({});
  const [chk, setChk] = useState({});
  return <div>{exercises.map((q,i) => {
    const v=inp[i]||"", done=chk[i], ok=done&&v.trim().toLowerCase()===(q.answer||"").toLowerCase();
    return (
      <div key={i} style={{ background:done?(ok?"#f0faf6":"#fdf5f4"):C.white, border:`1.5px solid ${done?(ok?C.green:C.red):C.border}`, borderRadius:12, padding:"0.85rem 1rem", marginBottom:"0.6rem" }}>
        <div style={{ fontSize:"0.63rem", color:C.gray, textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>
          Câu {i+1}{q.hint?<span style={{color:C.gold,marginLeft:6,textTransform:"none"}}>· {q.hint}</span>:null}
        </div>
        <div style={{ fontFamily:"Georgia,serif", fontSize:"0.9rem", marginBottom:"0.55rem", lineHeight:1.6 }}>{q.sentence}</div>
        <div style={{ display:"flex", gap:"0.38rem", alignItems:"center", flexWrap:"wrap" }}>
          <input value={v} disabled={done} onChange={e=>setInp(x=>({...x,[i]:e.target.value}))}
            onKeyDown={e=>e.key==="Enter"&&!done&&setChk(x=>({...x,[i]:true}))}
            placeholder="Nhập từ / dạng đúng..."
            style={{border:`1.5px solid ${done?(ok?C.green:C.red):C.border}`,borderRadius:6,padding:"0.3rem 0.55rem",fontSize:"0.83rem",width:180,fontFamily:"inherit",background:done?(ok?"#e8f7f1":"#fde8e6"):C.white,color:done?(ok?C.green:C.red):C.ink,outline:"none"}}/>
          {!done&&<button onClick={()=>setChk(x=>({...x,[i]:true}))} style={{padding:"0.3rem 0.65rem",background:C.purple,color:C.white,border:"none",borderRadius:6,fontSize:"0.73rem",cursor:"pointer",fontFamily:"inherit"}}>Kiểm tra</button>}
          {done&&<span style={{fontSize:"0.73rem",color:ok?C.green:C.red,fontWeight:500}}>{ok?"✓ Đúng!":`✗ Đáp án: ${q.answer}`}</span>}
        </div>
        {done&&q.explanation&&<div style={{marginTop:"0.4rem",fontSize:"0.72rem",color:C.gray}}>💡 {q.explanation}</div>}
      </div>
    );
  })}</div>;
}

export function GrammarOrder({ exercises }) {
  const init = (words) => words.map((w,i)=>({w,id:i})).sort(()=>Math.random()-0.5);
  const [states, setStates] = useState(()=>exercises.map(q=>({ pool:init(q.words), chosen:[], checked:false })));

  const clickPool = (qi,ti) => {
    if(states[qi].checked) return;
    setStates(prev=>prev.map((s,i)=>i!==qi?s:({...s, pool:s.pool.filter((_,j)=>j!==ti), chosen:[...s.chosen,s.pool[ti]]})));
  };
  const clickChosen = (qi,ti) => {
    if(states[qi].checked) return;
    setStates(prev=>prev.map((s,i)=>i!==qi?s:({...s, chosen:s.chosen.filter((_,j)=>j!==ti), pool:[...s.pool,s.chosen[ti]]})));
  };
  const norm = s => (s||"").trim().toLowerCase().replace(/[''`]/g,"'").replace(/[.,!?;:«»]/g,"").replace(/\s+/g," ");
  const check = (qi) => setStates(prev=>prev.map((s,i)=>i!==qi?s:({...s,checked:true})));
  const reset = (qi) => setStates(prev=>prev.map((s,i)=>i!==qi?s:({...s,pool:init(exercises[qi].words),chosen:[],checked:false})));

  return <div>{exercises.map((q,i) => {
    const s = states[i];
    const answer = s.chosen.map(x=>x.w).join(" ");
    const ok = s.checked && norm(answer) === norm(q.answer);
    return (
      <div key={i} style={{ background:s.checked?(ok?"#f0faf6":"#fdf5f4"):C.white, border:`1.5px solid ${s.checked?(ok?C.green:C.red):C.border}`, borderRadius:12, padding:"0.85rem 1rem", marginBottom:"0.6rem" }}>
        <div style={{ fontSize:"0.63rem", color:C.gray, textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>Câu {i+1} — Sắp xếp thành câu đúng</div>
        {/* Chosen area */}
        <div style={{ minHeight:40, display:"flex", flexWrap:"wrap", gap:"0.28rem", padding:"0.45rem 0.5rem", background:C.purpleL, borderRadius:8, marginBottom:"0.5rem" }}>
          {s.chosen.length===0&&<span style={{color:C.gray,fontSize:"0.75rem",alignSelf:"center"}}>Chọn từ bên dưới...</span>}
          {s.chosen.map((item,j)=><button key={item.id} onClick={()=>clickChosen(i,j)} disabled={s.checked}
            style={{padding:"0.25rem 0.55rem",border:`1.5px solid ${C.purple}`,borderRadius:6,background:C.white,color:C.purple,fontSize:"0.82rem",cursor:s.checked?"default":"pointer",fontFamily:"Georgia,serif"}}>{item.w}</button>)}
        </div>
        {/* Pool */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.28rem", marginBottom:"0.7rem" }}>
          {s.pool.map((item,j)=><button key={item.id} onClick={()=>clickPool(i,j)} disabled={s.checked}
            style={{padding:"0.25rem 0.55rem",border:`1.5px solid ${C.border}`,borderRadius:6,background:C.white,color:C.ink,fontSize:"0.82rem",cursor:s.checked?"default":"pointer",opacity:s.checked?0.4:1,fontFamily:"Georgia,serif"}}>{item.w}</button>)}
        </div>
        <div style={{ display:"flex", gap:"0.4rem" }}>
          {!s.checked&&s.chosen.length>0&&<button onClick={()=>check(i)} style={{padding:"0.3rem 0.8rem",border:"none",borderRadius:6,background:C.purple,color:C.white,fontSize:"0.75rem",cursor:"pointer"}}>Kiểm tra</button>}
          {!s.checked&&<button onClick={()=>reset(i)} style={{padding:"0.3rem 0.7rem",border:`1px solid ${C.border}`,borderRadius:6,background:C.white,color:C.gray,fontSize:"0.72rem",cursor:"pointer"}}>↺</button>}
        </div>
        {s.checked&&<div style={{marginTop:"0.45rem"}}>
          <div style={{fontSize:"0.78rem",color:ok?C.green:C.red,marginBottom:"0.2rem"}}>{ok?"✓ Chính xác!":<><span>✗ Đáp án: </span><b style={{fontFamily:"Georgia,serif"}}>{q.answer}</b></>}</div>
          {q.translation&&<div style={{fontSize:"0.72rem",color:C.gray}}>→ {q.translation}</div>}
          {q.explanation&&<div style={{fontSize:"0.72rem",color:C.gray,marginTop:"0.15rem"}}>💡 {q.explanation}</div>}
        </div>}
      </div>
    );
  })}</div>;
}

const EDITO_GRAMMAR = [
  {
    id:"g0", num:"0", title:"Bienvenue !", points:[
      {
        topic:"Động từ ÊTRE — Chia ở thì hiện tại",
        rule:`ÊTRE = "là / là / thì / ở" — động từ quan trọng nhất tiếng Pháp!

Bảng chia:
• Je suis       → Tôi là / tôi ở
• Tu es         → Bạn là / bạn ở (thân mật)
• Il/Elle est   → Anh ấy / Cô ấy là
• Nous sommes   → Chúng tôi là
• Vous êtes     → Các bạn là / Bạn là (lịch sự)
• Ils/Elles sont → Họ là

⚠️ Être là động từ BẤT QUY TẮC — phải học thuộc lòng!

Dùng être để:
✅ Nói quốc tịch: Je suis vietnamien.
✅ Nói nghề nghiệp: Elle est médecin.
✅ Miêu tả tính cách: Il est sympa.
✅ Nói nơi ở: Nous sommes à Paris.`,
        examples:[
          "Je suis étudiant(e). — Tôi là sinh viên.",
          "Tu es français? — Bạn là người Pháp à?",
          "Il est très sympa. — Anh ấy rất dễ mến.",
          "Nous sommes à Hanoi. — Chúng tôi ở Hà Nội.",
          "Vous êtes professeur? — Thầy/Cô là giáo viên ạ?",
          "Elles sont belles. — Chúng thật đẹp.",
        ]
      },
      {
        topic:"Động từ AVOIR — Chia ở thì hiện tại",
        rule:`AVOIR = "có" — cũng là động từ bất quy tắc, rất hay dùng!

Bảng chia:
• J'ai         → Tôi có  (j' vì bắt đầu bằng nguyên âm)
• Tu as        → Bạn có
• Il/Elle a    → Anh ấy / Cô ấy có
• Nous avons   → Chúng tôi có
• Vous avez    → Các bạn có / Bạn có (lịch sự)
• Ils/Elles ont → Họ có

Dùng avoir để:
✅ Nói tuổi (quan trọng!): J'ai 20 ans. (KHÔNG nói "Je suis 20 ans")
✅ Nói có/sở hữu: Tu as une voiture?
✅ Diễn đạt cảm giác thể chất: Il a faim (đói), il a soif (khát), il a froid (lạnh)

⚠️ Lỗi thường gặp: Nói tuổi dùng AVOIR, không dùng être!
❌ Je suis 25 ans.   ✅ J'ai 25 ans.`,
        examples:[
          "J'ai 22 ans. — Tôi 22 tuổi.",
          "Tu as un stylo? — Bạn có cây bút không?",
          "Elle a une sœur. — Cô ấy có một người chị.",
          "Nous avons un cours à 9h. — Chúng tôi có lớp lúc 9 giờ.",
          "Vous avez faim? — Bạn đói không?",
          "Ils ont deux enfants. — Họ có hai đứa con.",
        ]
      },
      {
        topic:"Đại từ nhân xưng — Je, Tu, Il, Elle, Nous, Vous, Ils, Elles",
        rule:`Trong tiếng Pháp, ĐẠI TỪ NHÂN XƯNG luôn phải có trước động từ!

• Je (Tôi) → J' trước nguyên âm: j'aime, j'ai
• Tu (Bạn) → dùng với người thân, bạn bè, trẻ em
• Il (Anh ấy / Nó - nam)
• Elle (Cô ấy / Nó - nữ)
• On (Người ta / Chúng ta - thân mật) → chia như il/elle
• Nous (Chúng tôi / Chúng ta - trang trọng hơn on)
• Vous (Các bạn / Bạn lịch sự với 1 người)
• Ils (Họ - nhóm có ít nhất 1 nam)
• Elles (Họ - nhóm toàn nữ)

💡 Mẹo: Vous dùng với 1 người khi lịch sự (thầy cô, người lạ) — gọi là "vouvoyer"
💡 On thay cho nous trong khẩu ngữ: On va au café? = Nous allons au café?

Dạng nhấn mạnh (pronoms toniques):
Je→Moi, Tu→Toi, Il→Lui, Elle→Elle, Nous→Nous, Vous→Vous, Ils→Eux, Elles→Elles`,
        examples:[
          "Je m'appelle Linh. — Tôi tên là Linh.",
          "Tu habites où? — Bạn sống ở đâu?",
          "On mange ensemble? — Chúng mình ăn cùng nhau nhé?",
          "Vous avez quel âge, madame? — Bà bao nhiêu tuổi ạ?",
          "Ils sont étudiants. — Họ là sinh viên.",
          "Moi, j'adore le café! — Còn tôi, tôi rất thích cà phê!",
        ]
      },
      {
        topic:"Số đếm 0–31 và Ngày tháng",
        rule:`SỐ ĐẾM CƠ BẢN (0–20):
0 zéro, 1 un/une, 2 deux, 3 trois, 4 quatre, 5 cinq,
6 six, 7 sept, 8 huit, 9 neuf, 10 dix,
11 onze, 12 douze, 13 treize, 14 quatorze, 15 quinze,
16 seize, 17 dix-sept, 18 dix-huit, 19 dix-neuf, 20 vingt

SỐ 21–31:
21 vingt et un, 22 vingt-deux, ... 31 trente et un
(Chú ý: 21, 31, 41... dùng "et un"; 22, 32... dùng gạch ngang)

NGÀY TRONG TUẦN: lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche
💡 Thứ Hai trong tiếng Pháp là lundi (không phải Chủ Nhật!)

THÁNG TRONG NĂM: janvier, février, mars, avril, mai, juin,
juillet, août, septembre, octobre, novembre, décembre

NÓI NGÀY THÁNG: le + số + tháng
⚠️ Ngày 1 nói "le premier" (không phải "le un")`,
        examples:[
          "Aujourd'hui c'est le premier mai. — Hôm nay là mùng 1 tháng 5.",
          "Je suis né(e) le 15 août. — Tôi sinh ngày 15 tháng 8.",
          "Le cours est le lundi et le mercredi. — Lớp học vào thứ Hai và thứ Tư.",
          "Mon numéro c'est le 06 12 34 56 78. — Số của tôi là...",
          "On est le combien aujourd'hui? — Hôm nay là ngày mấy?",
        ]
      },
    ]
  },
  {
    id:"g1", num:"1", title:"Je suis…", points:[
      {
        topic:"Tính từ quốc tịch — Accord masculin/féminin",
        rule:`Tính từ quốc tịch phải ĐỒI GIỚI với người được nói đến.

QUY TẮC THÀNH LẬP GIỐNG CÁI:
1. Thêm -e: français→française, américain→américaine, anglais→anglaise
   ⚠️ Phát âm khác nhau! [frɑ̃sɛ] → [frɑ̃sɛz]

2. Thêm -ne (với -ien, -éen): italien→italienne, coréen→coréenne, brésilien→brésilienne

3. Thêm -que (ngoại lệ): grec→grecque, turc→turque

4. Không đổi (đã có -e): belge, russe, suisse, tchèque, mexicaine...

5. Đặc biệt: espagnol→espagnole

💡 Tính từ quốc tịch KHÔNG viết hoa khi dùng như tính từ!
✅ Il est français.  ❌ Il est Français.
✅ C'est un Français. (danh từ → viết hoa)`,
        examples:[
          "Il est japonais. Elle est japonaise. — Anh ấy / Cô ấy là người Nhật.",
          "Il est brésilien. Elle est brésilienne. — Anh ấy / Cô ấy là người Brazil.",
          "Il est belge. Elle est belge aussi. — Anh ấy người Bỉ. Cô ấy cũng vậy.",
          "Tu es vietnamien(ne)? — Bạn là người Việt Nam à?",
          "Nous sommes américains. — Chúng tôi là người Mỹ. (nhóm nam hoặc hỗn hợp)",
          "Elles sont italiennes. — Họ là những người phụ nữ Ý.",
        ]
      },
      {
        topic:"Mạo từ xác định — Le, La, L', Les",
        rule:`Mạo từ xác định dùng khi nói về thứ gì đó CỤ THỂ, đã biết, hoặc CHUNG CHUNG theo loại.

• LE + danh từ nam số ít: le cinéma, le sport, le café
• LA + danh từ nữ số ít: la musique, la France, la rue
• L' + danh từ bắt đầu bằng nguyên âm (a,e,i,o,u) hoặc h câm: l'art, l'ami, l'histoire
• LES + tất cả danh từ số nhiều: les langues, les films, les amis

Dùng le/la/les để:
✅ Nói về sở thích (chung chung): J'aime LA musique. (âm nhạc nói chung)
✅ Chỉ thứ cụ thể: C'est le livre de Marie.
✅ Tên nước, vùng: la France, le Vietnam, les États-Unis

⚠️ Tên nước có mạo từ! la France, le Japon, les Pays-Bas
⚠️ Tên thành phố KHÔNG có mạo từ! à Paris (không phải à la Paris)

💡 Phân biệt:
"J'aime LE cinéma." = Tôi thích điện ảnh (nói chung)
"J'aime CE film." = Tôi thích bộ phim này (cụ thể)`,
        examples:[
          "J'aime le sport et la musique. — Tôi thích thể thao và âm nhạc.",
          "Il parle l'anglais et le français. — Anh ấy nói tiếng Anh và tiếng Pháp.",
          "Les Français aiment le fromage. — Người Pháp thích phô mai.",
          "La France est un beau pays. — Pháp là một đất nước đẹp.",
          "L'art et l'histoire m'intéressent. — Nghệ thuật và lịch sử thu hút tôi.",
          "J'adore les films français! — Tôi rất thích phim Pháp!",
        ]
      },
      {
        topic:"Giới từ trước tên thành phố và quốc gia (1) — À, Au, En, Aux",
        rule:`Giới từ chỉ ĐỊA ĐIỂM (ở đâu) hay XUẤT PHÁT (từ đâu):

ĐỐI VỚI THÀNH PHỐ → À (luôn luôn)
• à Paris, à Tokyo, à Hanoï, à New York

ĐỐI VỚI QUỐC GIA:
• EN + nước nữ (kết thúc bằng -e): en France, en Chine, en Espagne, en Italie
• EN + nước bắt đầu bằng nguyên âm (dù nam): en Iran, en Irak, en Angola
• AU = à + le → nước nam: au Japon, au Canada, au Vietnam, au Brésil
• AUX = à + les → nước số nhiều: aux États-Unis, aux Pays-Bas

BẢNG TÓM TẮT:
Ville       → à Paris, à Genève
Pays féminin → en France, en Suisse, en Chine
Pays masculin → au Japon, au Canada
Pays pluriel  → aux États-Unis, aux Pays-Bas
Pays/voyelle  → en Iran, en Angola

💡 Hầu hết nước kết thúc bằng -e là nữ: France, Chine, Espagne...
⚠️ Ngoại lệ nam dù có -e: le Mexique, le Mozambique, le Cambodge`,
        examples:[
          "J'habite à Paris. — Tôi sống ở Paris.",
          "Elle est née en France. — Cô ấy sinh ở Pháp.",
          "Il habite au Canada. — Anh ấy sống ở Canada.",
          "Nous habitons aux États-Unis. — Chúng tôi sống ở Mỹ.",
          "Tu vas en Espagne cet été? — Bạn đi Tây Ban Nha mùa hè này à?",
          "Il est né au Vietnam et il habite en France. — Anh ấy sinh ở Việt Nam và sống ở Pháp.",
        ]
      },
      {
        topic:"Tính từ nghi vấn — Quel, Quelle, Quels, Quelles",
        rule:`QUEL = "nào / gì / bao nhiêu" — dùng để hỏi thông tin cụ thể.

Quel PHẢI ĐỒI GIỚI VÀ SỐ với danh từ mà nó đi kèm:
• QUEL   + danh từ nam số ít:  Quel âge? Quel est ton prénom?
• QUELLE + danh từ nữ số ít:  Quelle heure? Quelle est ta nationalité?
• QUELS  + danh từ nam số nhiều: Quels films tu aimes?
• QUELLES+ danh từ nữ số nhiều: Quelles langues tu parles?

Hai cách dùng:
1. Quel/Quelle + nom directement: Quel jour? Quelle ville?
2. Quel/Quelle + être + nom: Quel est ton numéro? Quelle est ton adresse?

💡 Phát âm: quel/quelle/quels/quelles đều đọc là [kɛl] — phát âm như nhau!
💡 Khác với QUI (ai?) và QU'EST-CE QUE (cái gì?) — quel đi với danh từ.`,
        examples:[
          "Quel est ton prénom? — Tên của bạn là gì?",
          "Quelle est ta nationalité? — Quốc tịch của bạn là gì?",
          "Tu as quel âge? — Bạn bao nhiêu tuổi?",
          "Quelle heure est-il? — Bây giờ là mấy giờ?",
          "Quels sports tu pratiques? — Bạn chơi những môn thể thao nào?",
          "Quelles langues vous parlez? — Bạn nói những ngôn ngữ nào?",
        ]
      },
      {
        topic:"Les nombres 32–100 — Số đếm từ 32 đến 100",
        rule:`SỐ 32–69 → Quy tắc bình thường:
32=trente-deux, 40=quarante, 41=quarante et un,
50=cinquante, 60=soixante, 61=soixante et un

SỐ 70–79 → Bắt đầu rắc rối!
70 = soixante-DIX (60+10), 71 = soixante et onze (60+11)
72 = soixante-douze, 73 = soixante-treize...
79 = soixante-dix-neuf

SỐ 80–89 → Còn rắc rối hơn!
80 = quatre-vingts (4×20, có -s!)
81 = quatre-vingt-un (không có "et", không có -s!)
82 = quatre-vingt-deux... 89 = quatre-vingt-neuf

SỐ 90–99:
90 = quatre-vingt-DIX (80+10)
91 = quatre-vingt-onze... 99 = quatre-vingt-dix-neuf

100 = cent

⚠️ Ngoại lệ Bỉ và Thụy Sĩ:
70 = septante (dễ hơn!), 80 = huitante (Thụy Sĩ), 90 = nonante

💡 Mẹo nhớ: 80 = 4×20, 70 = 60+10, 90 = 80+10`,
        examples:[
          "J'ai trente-cinq ans. — Tôi 35 tuổi.",
          "Il y a soixante élèves. — Có 60 học sinh.",
          "Ça coûte soixante-dix euros. — Cái đó giá 70 euro.",
          "Elle a quatre-vingts ans! — Bà ấy 80 tuổi!",
          "C'est au numéro quatre-vingt-dix-neuf. — Đó là số 99.",
          "Le billet coûte cent euros. — Vé giá 100 euro.",
        ]
      },
    ]
  },
  {
    id:"g2", num:"2", title:"Près de moi", points:[
      {
        topic:"Mạo từ xác định và bất định — Le/La/Les vs Un/Une/Des",
        rule:`HAI LOẠI MẠO TỪ — phân biệt rất quan trọng!

MẠO TỪ BẤT ĐỊNH (indéfini) → nói về thứ CHƯA XÁC ĐỊNH:
• UN  + danh từ nam số ít: un appartement, un ami, un film
• UNE + danh từ nữ số ít: une maison, une amie, une rue
• DES + số nhiều (nam và nữ): des amis, des maisons

MẠO TỪ XÁC ĐỊNH (défini) → nói về thứ ĐÃ BIẾT hoặc CỤ THỂ:
• LE / LA / L' / LES (đã học ở Unité 1)

⚠️ Sau phủ định → thay un/une/des bằng DE (d'):
J'ai un frère. → Je n'ai PAS DE frère.
Il a des amis. → Il n'a PAS D'amis.
(Le/la/les giữ nguyên sau phủ định: Je n'aime pas LE sport.)

💡 Nhớ quy tắc "lần đầu gặp → bất định, lần sau → xác định":
"J'ai UN chat. LE chat s'appelle Mimi."`,
        examples:[
          "J'habite dans un appartement. — Tôi sống trong một căn hộ.",
          "C'est le quartier du centre-ville. — Đó là khu trung tâm (cụ thể).",
          "Il y a des parcs sympas ici. — Ở đây có những công viên dễ thương.",
          "Je n'ai pas d'amis ici. — Tôi không có bạn bè ở đây.",
          "Je cherche une collocataire. LE logement est grand. — Tôi tìm người ở cùng. Chỗ ở khá rộng.",
        ]
      },
      {
        topic:"Động từ đuôi -ER ở thì hiện tại — Présent de l'indicatif",
        rule:`NHÓM 1: Động từ đuôi -ER (nhiều nhất, dễ nhất!)
Bỏ -er, thêm: -e / -es / -e / -ons / -ez / -ent

Ví dụ AIMER (yêu thích):
• J'aime     (j' vì nguyên âm!)
• Tu aimes
• Il/Elle aime
• Nous aimons
• Vous aimez
• Ils/Elles aiment

Một số động từ đặc biệt trong nhóm:
• ACHETER: j'achète (thêm accent grave ở tu, il)
• APPELER: j'appelle (đôi phụ âm: tu appelles, il appelle)
• PRÉFÉRER: je préfère (accent grave: tu préfères, il préfère)

PHỦ ĐỊNH: Ne + verbe + pas
J'aime → Je N'aime PAS
Il habite → Il N'habite PAS

DẠNG HỎIVỀ: Est-ce que tu aimes? hoặc Tu aimes?
DẠNG HỎI LỊCH SỰ: Aimez-vous le sport? (đảo ngữ)`,
        examples:[
          "J'aime la musique mais je déteste le sport. — Tôi thích âm nhạc nhưng ghét thể thao.",
          "Tu habites où? — Bạn sống ở đâu?",
          "Elle n'aime pas skier. — Cô ấy không thích trượt tuyết.",
          "Nous adorons voyager ensemble. — Chúng tôi rất thích du lịch cùng nhau.",
          "Ils dansent très bien. — Họ nhảy rất đẹp.",
          "Est-ce que vous parlez anglais? — Bạn có nói tiếng Anh không?",
        ]
      },
      {
        topic:"Tính từ sở hữu — Mon/Ma/Mes, Ton/Ta/Tes, Son/Sa/Ses…",
        rule:`Tính từ sở hữu chỉ ra VẬT THUỘC VỀ AI. Nó đồng ý với ĐỐI TƯỢNG SỞ HỮU (không phải chủ sở hữu)!

       Nam sg  | Nữ sg | Số nhiều
1 người: mon   |  ma   |  mes   (của tôi)
         ton   |  ta   |  tes   (của bạn)
         son   |  sa   |  ses   (của anh/cô ấy)
Nhiều:  notre  | notre |  nos   (của chúng tôi)
        votre  | votre |  vos   (của các bạn)
        leur   | leur  | leurs  (của họ)

⚠️ Quan trọng: SON/SA/SES có thể là "của anh ấy" HOẶC "của cô ấy"!
Paul et SA sœur = em gái của Paul
Marie et SA sœur = em gái của Marie

⚠️ Ngoại lệ phát âm: Mon/Ton/Son + danh từ nữ bắt đầu nguyên âm!
mon amie (không phải ma amie — khó đọc)
ton école, son histoire

💡 Mẹo: "mon livre" → quyển sách của tôi (livre=nam → mon)
"ma voiture" → xe của tôi (voiture=nữ → ma)`,
        examples:[
          "Mon père est médecin et ma mère est professeure. — Bố tôi là bác sĩ, mẹ tôi là giáo viên.",
          "Tes amis sont sympas. — Bạn bè của bạn thật dễ mến.",
          "Son chien s'appelle Rex. — Con chó của anh/cô ấy tên Rex.",
          "Notre appartement est grand. — Căn hộ của chúng tôi rộng.",
          "Leurs enfants adorent le sport. — Những đứa con của họ rất thích thể thao.",
          "C'est mon amie. (pas ma amie!) — Đây là bạn gái của tôi.",
        ]
      },
      {
        topic:"Giống đực/cái của danh từ nghề nghiệp — Masculin/Féminin",
        rule:`Danh từ nghề nghiệp cũng phải đổi giống! Các quy tắc chính:

1. KHÔNG ĐỔI (đuôi -e): artiste, journaliste, libraire, secrétaire, comptable, architecte
   → Il est artiste. Elle est artiste.

2. THÊM -E: étudiant→étudiante, client→cliente, assistant→assistante

3. ĐUÔI -EUR → -EUSE: coiffeur→coiffeuse, vendeur→vendeuse, danseur→danseuse

4. ĐUÔI -TEUR → -TRICE: acteur→actrice, directeur→directrice, professeur⚠️

5. ĐUÔI -ER → -ÈRE: boulanger→boulangère, boucher→bouchère, infirmier→infirmière

6. HOÀN TOÀN KHÁC: homme→femme de ménage

⚠️ Professeur: truyền thống là nam, nhưng ngày nay dùng "professeure" cho nữ
⚠️ Médecin: theo truyền thống không đổi, nhưng "médecine" đang được dùng

💡 Tên nghề không có mạo từ sau être:
"Je suis étudiant(e)." (không phải "Je suis UN étudiant" — trừ khi có tính từ đi kèm)`,
        examples:[
          "Il est acteur. Elle est actrice. — Anh ấy là diễn viên. Cô ấy là diễn viên.",
          "Mon père est boulanger. Ma mère est boulangère. — Bố tôi là thợ làm bánh. Mẹ tôi cũng vậy.",
          "Elle est infirmière à l'hôpital. — Cô ấy là y tá ở bệnh viện.",
          "C'est un bon vendeur. Elle est vendeuse aussi. — Anh ấy là nhân viên bán hàng giỏi.",
          "Je suis étudiant(e) en français. — Tôi là sinh viên học tiếng Pháp.",
        ]
      },
    ]
  },
  {
    id:"g3", num:"3", title:"Qu'est-ce qu'on mange?", points:[
      {
        topic:"Số ít và số nhiều của danh từ — Singulier et pluriel",
        rule:`QUY TẮC THÀNH LẬP SỐ NHIỀU:

1. THÊM -S (phổ biến nhất): un pain→des pains, une pomme→des pommes
   ⚠️ Số -s KHÔNG đọc trong tiếng Pháp! pains [pɛ̃] = pain [pɛ̃]

2. ĐÃ KẾT THÚC -S, -X, -Z → không đổi: une voix→des voix, un bras→des bras

3. -EAU, -EU → thêm -X: un gâteau→des gâteaux, un jeu→des jeux, un tableau→des tableaux

4. -AL → -AUX: un journal→des journaux, un animal→des animaux
   Ngoại lệ: un bal→des bals, un festival→des festivals, un carnaval→des carnavals

5. Bất quy tắc phải học thuộc:
   un œuf [oef]→des œufs [ø] (câm!)
   un monsieur→des messieurs
   madame→mesdames

⚠️ Mạo từ số nhiều: UN/UNE → DES; LE/LA/L' → LES
⚠️ Sau phủ định: DES → DE: J'ai des amis → Je n'ai PAS D'amis`,
        examples:[
          "Je voudrais un croissant. → Mme Martin achète trois croissants. — Ba cái bánh sừng bò.",
          "Il y a un beau gâteau. → Il y a de beaux gâteaux. — Có những cái bánh đẹp.",
          "Un journal → des journaux. — Một tờ báo → nhiều tờ báo.",
          "Un œuf [oef] → des œufs [ø]. — Phát âm thay đổi hoàn toàn!",
          "Ce sont des fruits et des légumes de saison. — Đây là trái cây và rau củ theo mùa.",
        ]
      },
      {
        topic:"Giới từ chỉ nơi chốn (1) — À la, Au, À l', Aux, Chez",
        rule:`ĐI ĐÂU hoặc Ở ĐÂU — hai loại giới từ:

VỚI NƠI CHỐN (lieux) — dùng À + mạo từ:
• À + LA → à la boulangerie, à la poste, à la pharmacie
• À + LE → AU marché, au café, au supermarché, au restaurant
• À + L' → à l'épicerie, à l'hôpital, à l'école
• À + LES → AUX caisses, aux Champs-Élysées, aux urgences

VỚI NGƯỜI (personnes) — dùng CHEZ:
• chez le médecin (ở chỗ bác sĩ)
• chez le boulanger (ở tiệm người làm bánh)
• chez moi/toi/lui/elle (ở nhà tôi/bạn/anh ấy...)
• chez mes parents (ở nhà bố mẹ tôi)

💡 CHEZ vs À:
"Je vais à la boulangerie." = Tôi đến tiệm bánh (địa điểm)
"Je vais chez le boulanger." = Tôi đến chỗ người làm bánh (người)

⚠️ Chez McDonald's, chez IKEA → dùng chez với thương hiệu (như tên người)`,
        examples:[
          "Je vais à la boulangerie acheter du pain. — Tôi đến tiệm bánh mua bánh mì.",
          "Il est au marché ce matin. — Anh ấy đang ở chợ sáng nay.",
          "On va à l'épicerie? — Mình đến tạp hóa nhé?",
          "Elle achète le fromage chez le fromager. — Cô ấy mua phô mai ở tiệm phô mai.",
          "Ce soir, on dîne chez mes parents. — Tối nay chúng tôi ăn tối ở nhà bố mẹ.",
          "Je paye aux caisses automatiques. — Tôi thanh toán ở máy tự động.",
        ]
      },
      {
        topic:"Mạo từ phân lượng — Du, De la, De l', Des",
        rule:`Mạo từ phân lượng dùng khi nói về SỐ LƯỢNG KHÔNG ĐẾM ĐƯỢC.

• DU  = DE + LE → nom masculin: du pain, du beurre, du fromage, du lait
• DE LA → nom féminin: de la farine, de la crème, de la viande
• DE L' → nom bắt đầu bằng nguyên âm: de l'eau, de l'huile, de l'ail
• DES → nom pluriel: des pâtes, des légumes, des fruits

Dùng khi:
✅ Nói về lượng không xác định: "Je mange du pain." (một lượng nào đó)
✅ Các chất liệu: du coton, du bois, de la soie
✅ Khái niệm trừu tượng: du courage, de la patience

BIẾN ĐỔI SAU PHỦ ĐỊNH:
Mọi mạo từ phân lượng → DE/D' sau phủ định!
"Je bois du café." → "Je ne bois PAS DE café."
"Il y a de la neige." → "Il n'y a PAS DE neige."

SỐ LƯỢNG CỤ THỂ thay thế mạo từ phân lượng:
un peu de, beaucoup de, assez de, trop de, un kilo de, une bouteille de...
→ "un peu de sel" (không phải "un peu du sel")`,
        examples:[
          "Le matin, je mange du pain avec de la confiture. — Sáng tôi ăn bánh mì với mứt.",
          "Tu veux de l'eau ou du jus? — Bạn muốn nước hay nước ép?",
          "Je ne mange pas de viande. — Tôi không ăn thịt.",
          "Il faut de la farine pour faire un gâteau. — Cần bột mì để làm bánh.",
          "Un peu de sel, beaucoup de poivre! — Một chút muối, nhiều tiêu!",
          "Il n'y a plus de lait. — Hết sữa rồi.",
        ]
      },
      {
        topic:"Động từ đuôi -IR nhóm 2 — Choisir, Finir",
        rule:`NHÓM 2: Động từ đuôi -IR (nhóm quy tắc)
Nhận biết: thêm -ISS- vào phần nous/vous/ils!

Chia CHOISIR (chọn):
• Je choisis     • Nous choisissons
• Tu choisis     • Vous choisissez
• Il/Elle choisit  • Ils/Elles choisissent

Chia FINIR (kết thúc / ăn hết):
• Je finis       • Nous finissons
• Tu finis       • Vous finissez
• Il/Elle finit    • Ils/Elles finissent

Các động từ tương tự: réussir (thành công), grossir (tăng cân), maigrir (giảm cân), rougir (đỏ mặt), vieillir (già đi), grandir (lớn lên)

⚠️ Đừng nhầm với -IR nhóm 3 (bất quy tắc) như partir, sortir, dormir → chia khác!
"Je pars" (không phải "je partis" ở thì hiện tại)`,
        examples:[
          "Je choisis le menu à 15 euros. — Tôi chọn thực đơn 15 euro.",
          "Tu finis ton dessert? — Bạn ăn hết món tráng miệng chưa?",
          "Nous choisissons un bon restaurant pour ce soir. — Chúng tôi chọn nhà hàng ngon cho tối nay.",
          "Les étudiants réussissent à l'examen. — Các sinh viên thi đỗ.",
          "Elle rougit quand elle parle en public. — Cô ấy đỏ mặt khi nói trước đám đông.",
        ]
      },
      {
        topic:"Verbes irréguliers — Acheter, Payer, Aller, Faire",
        rule:`Bốn động từ quan trọng trong Unité 3 — cần học thuộc:

ACHETER (mua) — biến đổi accent:
• J'achète     • Nous achetons
• Tu achètes   • Vous achetez
• Il achète    • Ils achètent
⚠️ Accent grave xuất hiện ở je/tu/il/ils (trước -e câm)

PAYER (trả tiền) — hai cách chia đều đúng:
• Je paie / paye    • Nous payons
• Tu paies / payes  • Vous payez
• Il paie / paye    • Ils paient / payent

ALLER (đi) — Bất quy tắc hoàn toàn:
• Je vais    • Nous allons
• Tu vas     • Vous allez
• Il va      • Ils vont
💡 ALLER sert à former le futur proche: Je vais partir.

FAIRE (làm / tạo):
• Je fais    • Nous faisons
• Tu fais    • Vous faites ⚠️ (không phải "faisez"!)
• Il fait    • Ils font`,
        examples:[
          "J'achète du pain à la boulangerie chaque matin. — Tôi mua bánh mì ở tiệm bánh mỗi sáng.",
          "Tu paies comment? Par carte ou en espèces? — Bạn thanh toán thế nào? Thẻ hay tiền mặt?",
          "Nous allons au marché ce matin. — Chúng tôi đi chợ sáng nay.",
          "Vous faites quoi ce week-end? — Cuối tuần này bạn làm gì?",
          "Il fait les courses tous les samedis. — Anh ấy đi mua đồ mỗi thứ Bảy.",
          "Ils achètent beaucoup de fromage à la fromagerie. — Họ mua nhiều phô mai ở tiệm phô mai.",
        ]
      },
    ]
  },
  {
    id:"g4", num:"4", title:"C'est où?", points:[
      {
        topic:"C'est / Il est — Phân biệt cách dùng",
        rule:`Đây là một trong những điểm khó nhất cho người học tiếng Pháp!

C'EST → để NHẬN DẠNG, GIỚI THIỆU (dùng với danh từ)
• C'est + un/une + nom: C'est un musée. C'est une artiste.
• C'est + le/la/les + nom: C'est le Louvre. C'est la Tour Eiffel.
• C'est + nom propre: C'est Paris. C'est Marie.
• Ce sont + pluriel: Ce sont des étudiants.

IL/ELLE EST → để MÔ TẢ (dùng với tính từ)
• Il/Elle est + adjectif: Il est grand. Elle est belle.
• Il/Elle est + profession (sans article!): Elle est médecin.
• Il/Elle est + nationalité: Il est français.

CẢ HAI ĐỀU ĐÚNG nhưng khác nghĩa:
"C'est un Français." = Anh ta là người Pháp (nhận dạng danh từ → có mạo từ!)
"Il est français." = Anh ta người Pháp (tính từ → không mạo từ!)

"C'est une actrice célèbre." = Cô ấy là diễn viên nổi tiếng (giới thiệu)
"Elle est célèbre." = Cô ấy nổi tiếng (miêu tả)`,
        examples:[
          "C'est le Musée d'Orsay. Il est magnifique! — Đó là Bảo tàng Orsay. Nó thật đẹp!",
          "C'est une étudiante. Elle est intelligente. — Đây là một sinh viên. Cô ấy thông minh.",
          "Ce sont des artistes. Ils sont très talentueux. — Họ là các nghệ sĩ. Họ rất tài năng.",
          "C'est mon quartier. Il est calme et sympa. — Đây là khu phố của tôi. Nó yên tĩnh và dễ chịu.",
          "Elle est professeure. (profession, pas d'article!) — Cô ấy là giáo viên.",
        ]
      },
      {
        topic:"Mệnh lệnh thức — L'impératif",
        rule:`IMPÉRATIF dùng để: RA LỆNH, ĐỀ NGHỊ, KHUYÊN BẢO, CHỈ ĐƯỜNG

Chỉ có 3 ngôi: TU / NOUS / VOUS
Xây dựng từ thì présent, BỎ đại từ:
• Tu vas → Va! (đi đi!)
• Nous allons → Allons! (nào đi!)
• Vous venez → Venez! (hãy đến!)

⚠️ QUAN TRỌNG: Verbes en -ER → bỏ -S ở ngôi TU!
Parler: Tu parles → Parle! (không phải Parles!)
Écouter: Tu écoutes → Écoute!
Trừ: "Vas-y!" (trước y hoặc en, giữ -s để phát âm đẹp)

ĐỘNG TỪ BẤT QUY TẮC:
• Être:  Sois! Soyons! Soyez!
• Avoir: Aie! Ayons! Ayez!
• Savoir: Sache! Sachons! Sachez!
• Vouloir: Veuille! Veuillons! Veuillez! (rất lịch sự)

PHỦ ĐỊNH: Ne + verbe + pas
"Ne tourne pas à droite! Tourne à gauche!"

PHẢN THÂN: Pronom APRÈS le verbe (avec trait d'union):
"Lève-toi!" (te→toi), "Levons-nous!", "Levez-vous!"`,
        examples:[
          "Tourne à droite puis continue tout droit! — Rẽ phải rồi đi thẳng!",
          "Prenons le métro, c'est plus rapide. — Chúng ta đi tàu điện ngầm, nhanh hơn.",
          "Parle moins vite, s'il te plaît! — Nói chậm hơn một chút nhé!",
          "Ne traverse pas ici! — Đừng băng qua đường ở đây!",
          "Soyez à l'heure, s'il vous plaît. — Xin hãy đúng giờ.",
          "Lève-toi! Il est 8 heures! — Dậy đi! 8 giờ rồi!",
        ]
      },
      {
        topic:"Liên từ — Pour, Parce que, Mais, Avec, Sans",
        rule:`Các liên từ và giới từ nối câu:

POUR + INFINITIF → mục đích (để làm gì)
"Je prends le bus pour aller au travail." (để đi làm)
⚠️ Không dùng "pour que" + subjonctif ở trình độ A1

PARCE QUE + PHRASE COMPLÈTE → lý do (vì...)
"Je prends le bus parce que c'est moins cher."
⚠️ Parce qu' trước nguyên âm: "parce qu'il fait froid"
Khác với CAR (vì) — trang trọng hơn, viết văn

MAIS → đối lập (nhưng)
"J'aime Paris mais c'est cher."
"Il est sympa mais un peu timide."

AVEC + NOM → có/cùng với
"Je bois un café avec du lait." "Je viens avec mes amis."
Sans avoir de verbe: "un café avec du sucre"

SANS + NOM/INFINITIF → không có/không làm
"Un café sans sucre." "Je pars sans manger."`,
        examples:[
          "Je prends le métro pour aller à l'université. — Tôi đi tàu điện để đến trường.",
          "Je reste à la maison parce qu'il pleut. — Tôi ở nhà vì trời mưa.",
          "J'aime ce quartier mais il est bruyant. — Tôi thích khu này nhưng nó ồn ào.",
          "Je prends un café avec du lait et sans sucre. — Tôi uống cà phê có sữa và không đường.",
          "Elle part sans dire au revoir. — Cô ấy ra đi không nói lời tạm biệt.",
        ]
      },
      {
        topic:"Tần suất (1) — Toujours, Souvent, Jamais",
        rule:`Ba trạng từ tần suất cơ bản — Unité 4:

• TOUJOURS = luôn luôn (100%)
  "Je prends toujours le métro."

• SOUVENT = thường xuyên (~70–80%)
  "Je vais souvent à la boulangerie."

• JAMAIS = không bao giờ (0%) → PHẢI dùng với NE!
  "Je ne vais jamais au cinéma seul(e)."
  ⚠️ JAMAIS luôn dùng với NE: "Je ne mange jamais de viande."
  ❌ "Je vais jamais" (argot — tránh dùng ở trình độ này)

VỊ TRÍ: SAU ĐỘNG TỪ (thì hiện tại)
"Je vais TOUJOURS au travail à pied."
"Il mange SOUVENT chez ses parents."
"Elle ne sort JAMAIS le soir."

Thứ tự tần suất đầy đủ:
jamais (0%) < rarement < parfois < souvent < toujours (100%)
💡 Xem thêm: parfois, rarement, tous les… → Unité 6`,
        examples:[
          "Je prends toujours le métro pour aller au travail. — Tôi luôn đi tàu điện đến chỗ làm.",
          "Il va souvent au musée le week-end. — Anh ấy thường đi bảo tàng vào cuối tuần.",
          "Je ne mange jamais de fast-food. — Tôi không bao giờ ăn đồ ăn nhanh.",
          "Elle ne sort jamais sans parapluie. — Cô ấy không bao giờ ra ngoài không mang ô.",
          "Tu vas souvent au cinéma? — Bạn hay đi xem phim không?",
        ]
      },
    ]
  },
  {
    id:"g5", num:"5", title:"C'est tendance!", points:[
      {
        topic:"Accord des adjectifs — Masculin, Féminin, Pluriel",
        rule:`Tính từ trong tiếng Pháp phải ĐỒNG Ý với danh từ nó bổ nghĩa (giống và số)!

THÀNH LẬP GIỐNG CÁI:
1. Thêm -E: grand→grande, petit→petite, noir→noire, vert→verte
   ⚠️ Nếu đã có -E, không đổi: rouge, jaune, jeune, russe, belge
2. Đôi phụ âm cuối + E: bon→bonne, gros→grosse, bas→basse
3. -EUX → -EUSE: heureux→heureuse, sérieux→sérieuse, courageux→courageuse
4. -F → -VE: actif→active, neuf→neuve, sportif→sportive
5. -ER → -ÈRE: cher→chère, léger→légère, premier→première
6. Bất quy tắc: beau→belle, nouveau→nouvelle, vieux→vieille, blanc→blanche, doux→douce, long→longue

THÀNH LẬP SỐ NHIỀU:
• Thêm -S: grand→grands, grande→grandes
• Đã có -S/-X: gros→gros, heureux→heureux
• -EAU → -EAUX: beau→beaux, nouveau→nouveaux

⚠️ Màu sắc từ tên vật → KHÔNG ĐỔI: orange, marron, kaki, crème
"Des chaussures orange." (không phải oranges)`,
        examples:[
          "Un pull noir, une robe noire, des pulls noirs, des robes noires.",
          "Il est actif. Elle est active. Ils sont actifs. Elles sont actives.",
          "C'est un beau sac! C'est une belle robe! Ce sont de beaux vêtements!",
          "Un gilet gris, une veste grise, des chaussures grises.",
          "Des chaussures marron. (couleur = invariable!)",
          "Elle porte une jupe longue et un pull court.",
        ]
      },
      {
        topic:"Thì tương lai gần — Le Futur Proche",
        rule:`FUTUR PROCHE = nói về hành động SẮP XẢY RA

Cấu trúc: ALLER (présent) + INFINITIF

Chia ALLER ở présent:
• Je vais     • Nous allons
• Tu vas      • Vous allez
• Il/Elle va  • Ils/Elles vont

Dùng futur proche khi:
✅ Hành động sắp xảy ra trong tương lai gần: "Je vais partir dans 5 minutes."
✅ Dự định đã lên kế hoạch: "Ce soir, nous allons au cinéma."
✅ Dự đoán chắc chắn: "Il va pleuvoir."
✅ Khẩu ngữ: thường dùng hơn futur simple trong giao tiếp hàng ngày

PHỦ ĐỊNH: Ne + ALLER + pas + INFINITIF
"Je ne vais pas sortir ce soir." (Tôi sẽ không ra ngoài tối nay)

ĐẠI TỪ: se place avant l'infinitif:
"Il va se lever tard." (không phải "Il va lever se tard")

💡 Mẹo phân biệt:
Futur proche: action très bientôt, intime conviction
Futur simple: plus lointain, formel, promesse`,
        examples:[
          "Je vais acheter une nouvelle veste. — Tôi sắp mua một chiếc áo vest mới.",
          "Il va faire froid ce week-end. — Cuối tuần này sẽ lạnh.",
          "Nous allons organiser une fête. — Chúng tôi sắp tổ chức một bữa tiệc.",
          "Tu vas partir quand? — Bạn sắp đi khi nào?",
          "Elle ne va pas venir ce soir. — Cô ấy sẽ không đến tối nay.",
          "Ils vont se marier en juin. — Họ sắp kết hôn vào tháng 6.",
        ]
      },
      {
        topic:"Vị trí của tính từ — La place des adjectifs",
        rule:`Trong tiếng Pháp, tính từ có thể đứng TRƯỚC hoặc SAU danh từ!

QUY TẮC CHUNG → SAU DANH TỪ:
Đặc biệt: màu sắc, hình dạng, quốc tịch, tôn giáo, kỹ thuật
"un livre rouge, une table ronde, un film français, un cours intéressant"

TÍNH TỪ NGẮN THƯỜNG GẶP → TRƯỚC DANH TỪ:
Nhớ qua từ khóa "BAGS" hoặc "BANGS":
• Beauté: beau/belle, joli(e)
• Âge: vieux/vieille, jeune, nouveau/nouvelle
• Grandeur: grand(e), petit(e), gros(se), long(ue), court(e), haut(e)
• Qualité subjective: bon(ne), mauvais(e), meilleur(e)

⚠️ Khi tính từ đứng TRƯỚC danh từ số nhiều → DES đổi thành DE/D':
"des fleurs rouges" NHƯNG "de belles fleurs" (pas des belles fleurs)

⚠️ Một số tính từ đổi nghĩa tùy vị trí:
"un homme grand" = người đàn ông cao
"un grand homme" = một vĩ nhân
"une robe chère" = chiếc váy đắt
"ma chère amie" = người bạn thân yêu`,
        examples:[
          "C'est un grand sac noir. — Đây là một chiếc túi đen to.",
          "J'ai une jolie robe bleue. — Tôi có một chiếc váy xanh xinh.",
          "C'est un bon restaurant français. — Đây là một nhà hàng Pháp ngon.",
          "Elle porte de belles chaussures. (pas des belles!) — Cô ấy mang đôi giày đẹp.",
          "Il a acheté une nouvelle voiture rouge. — Anh ấy đã mua một chiếc xe đỏ mới.",
        ]
      },
      {
        topic:"Tính từ chỉ định — Ce, Cet, Cette, Ces",
        rule:`Tính từ chỉ định = "này / đó / kia" — dùng để chỉ vào vật cụ thể

• CE   + danh từ nam bắt đầu bằng phụ âm: ce pull, ce sac, ce garçon
• CET  + danh từ nam bắt đầu bằng nguyên âm hoặc h câm: cet imperméable, cet homme, cet objet
• CETTE + danh từ nữ (mọi trường hợp): cette robe, cette idée, cette image
• CES  + danh từ số nhiều (mọi giống): ces chaussures, ces pulls, ces objets

Phát âm: ce/cet/cette/ces đều đọc là [sə] / [sɛt] / [sɛ]

Thêm -CI (gần) hoặc -LÀ (xa) sau danh từ để phân biệt:
"ce pull-CI" (cái áo len này, gần) vs "ce pull-LÀ" (cái áo len kia, xa)

💡 Cet vs Ce: chỉ khác nhau trước nguyên âm để dễ phát âm hơn
"Ce ami" → khó đọc → "Cet ami" [sɛtami]`,
        examples:[
          "Ce pull est très chaud. — Cái áo len này rất ấm.",
          "Cet imperméable est pratique. — Chiếc áo mưa đó thực tế.",
          "Cette robe est magnifique! — Chiếc váy này thật đẹp!",
          "Ces chaussures sont confortables. — Những đôi giày này thoải mái.",
          "Tu préfères ce modèle-ci ou ce modèle-là? — Bạn thích mẫu này hay mẫu kia?",
          "Cet objet, c'est quoi exactement? — Cái vật này là cái gì vậy?",
        ]
      },
      {
        topic:"Verbes — Vendre, Mettre, Venir",
        rule:`Ba động từ quan trọng trong Unité 5:

VENDRE (bán) — nhóm -RE quy tắc:
• Je vends    • Nous vendons
• Tu vends    • Vous vendez
• Il vend (không có -s!) • Ils vendent
Tương tự: répondre, attendre, entendre, perdre

METTRE (đặt / mặc / bật):
• Je mets     • Nous mettons
• Tu mets     • Vous mettez
• Il met      • Ils mettent
💡 Dùng: mettre une veste (mặc áo), mettre la table (dọn bàn ăn), mettre de la musique (bật nhạc)
Tương tự: promettre (hứa), permettre (cho phép)

VENIR (đến) — Bất quy tắc:
• Je viens    • Nous venons
• Tu viens    • Vous venez
• Il vient    • Ils viennent
⚠️ Venir DE + infinitif = passé récent: "Je viens de manger." (Unité 6)
⚠️ Venir DE + lieu = xuất xứ: "Je viens du Japon." (Unité 9)
Tương tự: devenir (trở thành), revenir (quay lại), tenir (giữ)`,
        examples:[
          "Ce magasin vend des vêtements à prix réduit. — Cửa hàng này bán quần áo giảm giá.",
          "Elle met toujours une veste pour aller au bureau. — Cô ấy luôn mặc áo vest đi làm.",
          "Tu mets combien de temps pour aller au travail? — Bạn mất bao lâu để đến chỗ làm?",
          "Il vient d'Espagne mais il habite en France. — Anh ấy đến từ Tây Ban Nha nhưng sống ở Pháp.",
          "Ils viennent nous voir ce week-end. — Cuối tuần này họ đến thăm chúng tôi.",
          "Nous vendons des accessoires et des vêtements. — Chúng tôi bán phụ kiện và quần áo.",
        ]
      },
    ]
  },
  {
    id:"g6", num:"6", title:"Qu'est-ce qu'on fait aujourd'hui?", points:[
      {
        topic:"Động từ phản thân — Les verbes pronominaux",
        rule:`Động từ phản thân = hành động TỰ LÀM CHO MÌNH (se + verbe)

Bảng chia SE LEVER (thức dậy):
• Je me lève      (me trước nguyên âm → m')
• Tu te lèves     (te → t' trước nguyên âm)
• Il/Elle se lève  (se → s' trước nguyên âm)
• Nous nous levons
• Vous vous levez
• Ils/Elles se lèvent

Các loại động từ phản thân:
1. Thực sự phản thân (tự làm cho mình): se laver, se coiffer, se maquiller, se raser
2. Nghĩa đặc biệt khác động từ gốc: s'appeler (tên là) ≠ appeler (gọi)
   se trouver (nằm ở) ≠ trouver (tìm thấy)
3. Luôn luôn phản thân (không có dạng không phản thân):
   se souvenir (nhớ), se taire (im lặng), se méfier (cảnh giác)

PHỦ ĐỊNH: Ne + me/te/se + verbe + pas
"Je ne me lève pas tôt." (Tôi không dậy sớm)

⚠️ Ở thì PASSÉ COMPOSÉ: Être (không avoir!) + participe passé
"Je me suis levé(e) à 7h."`,
        examples:[
          "Je me réveille à 7h et je me lève à 7h15. — Tôi thức lúc 7h và dậy lúc 7h15.",
          "Il se douche et se rase le matin. — Anh ấy tắm và cạo râu buổi sáng.",
          "Nous nous couchons tard le week-end. — Chúng tôi đi ngủ muộn vào cuối tuần.",
          "Elle s'habille vite. — Cô ấy mặc đồ nhanh.",
          "Comment tu t'appelles? — Bạn tên là gì?",
          "Je ne me maquille pas tous les jours. — Tôi không trang điểm mỗi ngày.",
        ]
      },
      {
        topic:"Trạng từ tần suất (2) — Parfois, Rarement, Tous les…",
        rule:`Thang tần suất từ thấp đến cao:
jamais (0%) < rarement < parfois/quelquefois < souvent < toujours (100%)

VỊ TRÍ TRONG CÂU:
• Sau động từ (thì hiện tại, passé composé phần avoir): Je vais SOUVENT au cinéma.
• Trước participe passé: J'ai SOUVENT regardé ce film.

BIỂU THỨC THỜI GIAN (đứng đầu hoặc cuối câu):
• le lundi = mỗi thứ Hai: Le lundi, je fais du yoga.
• tous les lundis = every Monday: Je fais du yoga tous les lundis.
• tous les jours = chaque jour: Il court tous les jours.
• tous les matins/soirs = chaque matin/soir
• le week-end = chaque week-end
• une fois par semaine/mois = một lần mỗi tuần/tháng
• de temps en temps = thỉnh thoảng

⚠️ JAMAIS avec ne → jamais sans ne = argot/informal
"Je ne vais jamais là-bas." (standard)
"Je vais jamais là-bas." (familier)`,
        examples:[
          "Je vais parfois au théâtre, mais jamais à l'opéra. — Tôi thỉnh thoảng đi xem kịch nhưng không bao giờ đi opera.",
          "Le lundi, je fais du sport. Tous les lundis! — Thứ Hai tôi tập thể thao. Mỗi thứ Hai!",
          "Elle travaille toujours tard le soir. — Cô ấy luôn làm việc muộn buổi tối.",
          "Tu sors souvent le week-end? — Bạn hay ra ngoài vào cuối tuần không?",
          "Je fais du yoga deux fois par semaine. — Tôi tập yoga hai lần một tuần.",
          "Il ne va rarement au cinéma. → Sai! Nói: Il va rarement au cinéma.",
        ]
      },
      {
        topic:"Passé récent — Venir de + infinitif",
        rule:`VENIR DE + INFINITIF = "vừa mới làm gì đó" (hành động vừa kết thúc)

Chia VENIR au présent:
• Je viens de     • Nous venons de
• Tu viens de     • Vous venez de
• Il/Elle vient de • Ils/Elles viennent de

Dùng khi:
✅ Hành động xảy ra NGAY TRƯỚC lúc nói: "Je viens de manger." (Tôi vừa mới ăn xong)
✅ Giải thích tại sao không thể làm gì: "Je ne peux pas manger, je viens de finir."

⚠️ VENIR DE + lieu = "vừa đến từ" → nghĩa khác!
"Il vient de Paris." = Anh ấy đến từ Paris. (xuất xứ)
"Il vient DE RENTRER." = Anh ấy vừa mới về. (passé récent)

PHỦ ĐỊNH: Je ne viens pas de + infinitif
"Il ne vient pas de partir." = Anh ấy không vừa đi.

💡 Đây là cách diễn đạt tự nhiên trong tiếng Pháp khẩu ngữ, thường dùng hơn passé composé khi nói về "vừa mới"`,
        examples:[
          "Je viens de finir mon cours de français! — Tôi vừa mới kết thúc bài học tiếng Pháp!",
          "Il vient d'appeler. Tu l'as raté! — Anh ấy vừa gọi. Bạn bỏ lỡ rồi!",
          "Nous venons d'arriver à Paris. — Chúng tôi vừa mới đến Paris.",
          "Désolé, elle vient de partir. — Xin lỗi, cô ấy vừa ra đi.",
          "Tu as faim? Non, je viens de manger. — Bạn đói không? Không, tôi vừa ăn xong.",
        ]
      },
      {
        topic:"Động từ -IR nhóm 3 — Partir, Sortir, Dormir",
        rule:`Nhóm 3 BẤT QUY TẮC: Cách chia KHÁC với nhóm 2!
Đặc điểm: số ít mất phụ âm cuối cùng của phần gốc

PARTIR (khởi hành / rời đi):
• Je pars    Tu pars    Il part
• Nous partons  Vous partez  Ils partent

SORTIR (ra ngoài):
• Je sors    Tu sors    Il sort
• Nous sortons  Vous sortez  Ils sortent

DORMIR (ngủ):
• Je dors    Tu dors    Il dort
• Nous dormons  Vous dormez  Ils dorment

Tương tự: servir (phục vụ), mentir (nói dối), sentir (cảm nhận/ngửi)

⚠️ So sánh với nhóm 2:
Finir (nhóm 2): je finis, nous finissons (có -ISS-)
Partir (nhóm 3): je pars, nous partons (không có -ISS-)

PARTIR vs QUITTER vs LAISSER:
• Partir (de) = rời đi: "Je pars de Paris."
• Quitter + COD = rời bỏ ai/đâu: "Je quitte Paris. Je quitte Marie."
• Laisser = để lại: "Je laisse mon sac ici."`,
        examples:[
          "Je pars à 8h du matin. — Tôi khởi hành lúc 8 giờ sáng.",
          "Tu sors ce soir? — Bạn ra ngoài tối nay không?",
          "Il dort beaucoup le week-end. — Anh ấy ngủ nhiều vào cuối tuần.",
          "Nous partons en vacances demain! — Chúng tôi đi nghỉ hè ngày mai!",
          "Vous dormez combien d'heures par nuit? — Bạn ngủ bao nhiêu tiếng mỗi đêm?",
          "Ils sortent souvent avec des amis. — Họ thường ra ngoài với bạn bè.",
        ]
      },
      {
        topic:"Verbes — Pouvoir et Vouloir",
        rule:`Hai động từ bất quy tắc rất hay dùng trong Unité 6:

POUVOIR (có thể / được phép):
• Je peux     • Nous pouvons
• Tu peux     • Vous pouvez
• Il peut     • Ils peuvent
⚠️ Hỏi lịch sự: "Puis-je...?" (đảo ngữ trang trọng)

VOULOIR (muốn):
• Je veux     • Nous voulons
• Tu veux     • Vous voulez
• Il veut     • Ils veulent
💡 Dạng lịch sự: "Je voudrais..." (conditionnel) — lịch sự hơn "Je veux"
"Je voudrais un café, s'il vous plaît."

CẤU TRÚC:
POUVOIR + infinitif = "có thể làm gì"
"Je peux sortir ce soir." / "Il ne peut pas venir."

VOULOIR + infinitif = "muốn làm gì"
"Je veux apprendre le français."

VOULOIR + nom = "muốn cái gì"
"Je veux un café." / "Ils veulent des billets."`,
        examples:[
          "Je peux t'aider? — Tôi có thể giúp bạn không?",
          "Tu peux venir à 18h? — Bạn có thể đến lúc 6 giờ tối không?",
          "Il ne peut pas sortir, il est malade. — Anh ấy không thể ra ngoài, anh ấy đang bệnh.",
          "Je veux apprendre à cuisiner. — Tôi muốn học nấu ăn.",
          "Vous voulez du café ou du thé? — Bạn muốn cà phê hay trà?",
          "Je voudrais réserver une table pour deux. — Tôi muốn đặt bàn cho hai người.",
        ]
      },
    ]
  },
  {
    id:"g7", num:"7", title:"Chez moi!", points:[
      {
        topic:"Passé composé (1) — Avec l'auxiliaire AVOIR",
        rule:`PASSÉ COMPOSÉ = thì quá khứ kể chuyện, hành động đã hoàn thành

Cấu trúc: AVOIR (présent) + PARTICIPE PASSÉ

THÀNH LẬP PARTICIPE PASSÉ:
• Verbes en -ER → É: parler→parlé, manger→mangé, trouver→trouvé
• Verbes en -IR (groupe 2) → I: finir→fini, choisir→choisi
• Irréguliers phải học thuộc:
  avoir→eu, être→été, faire→fait, voir→vu, pouvoir→pu,
  vouloir→voulu, devoir→dû, savoir→su, boire→bu,
  prendre→pris, mettre→mis, dire→dit, écrire→écrit

PHỦ ĐỊNH: NE + AVOIR + PAS + PARTICIPE PASSÉ
"Je n'ai pas mangé." "Il n'a pas vu ce film."

⚠️ Avec AVOIR: le participe passé ne s'accorde PAS avec le sujet!
"Elle a mangé." (pas mangée — l'accord se fait seulement avec le COD avant le verbe)

INDICATEURS DE TEMPS:
hier (hôm qua), avant-hier, la semaine dernière, le mois dernier,
il y a + temps: "Il y a deux jours" = hai ngày trước`,
        examples:[
          "J'ai trouvé un bel appartement hier! — Tôi đã tìm được một căn hộ đẹp hôm qua!",
          "Tu as fait les courses? — Bạn đã đi mua sắm chưa?",
          "Il n'a pas vu ce film. — Anh ấy chưa xem bộ phim này.",
          "Nous avons mangé une délicieuse pizza. — Chúng tôi đã ăn một chiếc pizza ngon.",
          "Ils ont eu un problème. — Họ đã gặp vấn đề.",
          "Elle a pris le bus ce matin. — Cô ấy đã bắt xe buýt sáng nay.",
        ]
      },
      {
        topic:"Giới từ chỉ vị trí (2) — Sur, Sous, Devant, Derrière, Entre, En face de…",
        rule:`VỊ TRÍ ĐỒ VẬT trong không gian:

• SUR = trên (tiếp xúc bề mặt): sur la table, sur le lit, sur le mur
• SOUS = dưới: sous la table, sous le lit
• DEVANT = trước (mặt đối mặt): devant la maison, devant toi
• DERRIÈRE = sau (phía sau): derrière la porte, derrière toi
• ENTRE = giữa (hai vật): entre le canapé et la fenêtre
• EN FACE DE = đối diện: en face de la gare, en face de moi
• À CÔTÉ DE = bên cạnh: à côté de la banque
• À DROITE DE = bên phải: à droite du canapé
• À GAUCHE DE = bên trái: à gauche de la porte
• AU-DESSUS DE = phía trên (không tiếp xúc): au-dessus du lit
• EN DESSOUS DE = phía dưới (không tiếp xúc)
• AU FOND DE = ở cuối/trong: au fond du couloir

⚠️ Chú ý: DE + LE = DU, DE + LES = DES
"à côté du canapé" (pas de le canapé)
"en face des fenêtres" (pas de les fenêtres)`,
        examples:[
          "Le chat est sous le lit. — Con mèo ở dưới giường.",
          "Les clés sont sur la table, devant la lampe. — Chìa khóa trên bàn, trước đèn.",
          "Le canapé est entre les deux fauteuils. — Ghế sofa ở giữa hai chiếc ghế bành.",
          "La salle de bains est en face de la chambre. — Phòng tắm đối diện phòng ngủ.",
          "Il y a un miroir à côté de la fenêtre. — Có một cái gương bên cạnh cửa sổ.",
          "Le garage est au fond de la cour. — Gara ở cuối sân.",
        ]
      },
      {
        topic:"Obligation et interdiction (1) — Il faut, Ne pas + infinitif",
        rule:`OBLIGATION ET INTERDICTION — ba cách diễn đạt:

1. IL FAUT + INFINITIF (obligation impersonnelle, générale)
"Il faut respecter le règlement." = Cần phải tôn trọng nội quy.
"Il faut faire du sport." = Cần phải tập thể thao.
Phủ định: "Il ne faut pas + inf." = Không được...
"Il ne faut pas faire de bruit." = Không được làm ồn.

2. INFINITIF seul (panneaux, instructions écrites)
"Ne pas fumer." "Ne pas stationner." "Composer son billet."
→ Style télégraphique pour affiches, règlements, recettes

3. IMPÉRATIF (ordre direct à une personne)
"Fermez la porte!" "Ne faites pas de bruit!"

Mức độ:
• Il faut... (obligation générale, impersonnelle)
• Devoir... (obligation personnelle — voir Unité 8)
• Pouvoir... (permission)
• Ne pas devoir... (interdiction personnelle)
• Il est interdit de... (interdiction formelle)`,
        examples:[
          "Il faut sortir les poubelles le lundi. — Cần đổ rác vào thứ Hai.",
          "Il ne faut pas faire de bruit après 22h. — Không được làm ồn sau 22 giờ.",
          "Ne pas laisser les vélos dans le couloir. — Không để xe đạp trong hành lang.",
          "Il faut respecter les voisins. — Cần tôn trọng hàng xóm.",
          "Fermer la porte à clé. — Hãy khóa cửa. (panneau, infinitif)",
        ]
      },
      {
        topic:"Pronoms COD (1) — Le, La, L', Les",
        rule:`COD = Complément d'Objet Direct = bổ ngữ trực tiếp
Pronoms COD thay thế danh từ để tránh lặp lại!

• LE = thay thế nam sg: le film → je LE regarde
• LA = thay thế nữ sg: la série → je LA regarde
• L' = trước nguyên âm (nam hoặc nữ): l'appartement → je L'ai trouvé
• LES = số nhiều: les clés → je LES ai

VỊ TRÍ: TRƯỚC động từ (sauf impératif affirmatif)
"Je regarde le film." → "Je LE regarde." ✅
"Je LE regarde." → pronom AVANT le verbe ✅

PHỦ ĐỊNH: ne + pronom + verbe + pas
"Je ne LE regarde pas."

IMPÉRATIF AFFIRMATIF: pronom APRÈS, avec trait d'union
"Regarde-LE!" "Appelle-LA!" "Mange-LES!"
⚠️ Le/la → l' avant h aspiré? Non! → "Regarde-le!" toujours

PASSÉ COMPOSÉ: pronom avant l'auxiliaire
"Je l'ai vu." "Tu les as appelés?"`,
        examples:[
          "Tu as les clés? Oui, je LES ai. — Bạn có chìa khóa không? Có, tôi có.",
          "Ce film? Je L'ai vu hier. — Bộ phim đó? Tôi đã xem hôm qua.",
          "Elle cherche un plombier. Elle LE contacte. — Cô ấy tìm thợ sửa ống nước. Cô ấy liên hệ anh ta.",
          "Mange ta soupe! Mange-LA! — Ăn súp đi! Ăn đi!",
          "Ce livre? Je ne LE comprends pas. — Quyển sách đó? Tôi không hiểu.",
          "Vous avez vu Marie? — Oui, je L'ai vue ce matin. — Bạn có gặp Marie không? — Có, tôi đã gặp sáng nay.",
        ]
      },
      {
        topic:"Verbe CONNAÎTRE — Biết / Quen biết",
        rule:`CONNAÎTRE = "biết / quen biết" — phân biệt với SAVOIR!

Chia CONNAÎTRE au présent:
• Je connais     • Nous connaissons
• Tu connais     • Vous connaissez
• Il connaît ⚠️ (accent circonflexe: î)  • Ils connaissent

CONNAÎTRE vs SAVOIR:

CONNAÎTRE + nom (người, nơi chốn, tác phẩm):
"Je connais Paris." (Tôi biết Paris — đã từng đến/quen thuộc)
"Tu connais Marie?" (Bạn quen Marie không?)
"Elle connaît bien ce quartier."

SAVOIR + infinitif (biết cách làm gì — kỹ năng):
"Je sais nager." (Tôi biết bơi)
"Il sait parler chinois."

SAVOIR + que/si/quand... (biết thông tin):
"Je sais qu'il habite ici."

💡 Mẹo nhớ:
CONNAÎTRE → quen biết (người / nơi)
SAVOIR → biết cách làm / biết thông tin`,
        examples:[
          "Tu connais un bon restaurant dans ce quartier? — Bạn biết nhà hàng ngon nào trong khu này không?",
          "Je connais bien le centre-ville. — Tôi biết rõ trung tâm thành phố.",
          "Vous connaissez Marie Dupont? — Bạn có quen Marie Dupont không?",
          "Il connaît beaucoup de monde ici. — Anh ấy quen biết nhiều người ở đây.",
          "Je connais ce film, il est excellent! — Tôi biết bộ phim này, tuyệt lắm!",
        ]
      },
    ]
  },
  {
    id:"g8", num:"8", title:"En forme!", points:[
      {
        topic:"Passé composé (2) — Participes passés irréguliers",
        rule:`Participes passés irréguliers PHẢI HỌC THUỘC! Đây là danh sách hay gặp nhất:

EN -U:
avoir→eu [y], boire→bu, courir→couru, croire→cru,
devoir→dû, falloir→fallu, lire→lu, pleuvoir→plu,
pouvoir→pu, recevoir→reçu, savoir→su, vivre→vécu,
vouloir→voulu, voir→vu, venir→venu

EN -IT/-IS:
dire→dit, écrire→écrit, faire→fait, mettre→mis,
prendre→pris, apprendre→appris, comprendre→compris,
permettre→permis, promettre→promis

EN -ERT:
couvrir→couvert, offrir→offert, ouvrir→ouvert, souffrir→souffert

EN -É (réguliers mais fréquents):
aller→allé (avec être!), naître→né, téléphoner→téléphone

COMPLÈTEMENT IRRÉGULIERS:
être→été, naître→né, mourir→mort

💡 Truco de memorización: groupez par terminaison!
-u: bu, lu, pu, su, vu, eu, eu!
-it: dit, fait, écrit
-is: mis, pris, appris`,
        examples:[
          "J'ai eu de la fièvre hier. — Hôm qua tôi bị sốt.",
          "Il a fait du sport ce matin. — Anh ấy đã tập thể thao sáng nay.",
          "Elle a pris rendez-vous chez le médecin. — Cô ấy đã hẹn gặp bác sĩ.",
          "Nous avons vu un bon film. — Chúng tôi đã xem một bộ phim hay.",
          "Tu as pu dormir? — Bạn đã ngủ được không?",
          "Ils n'ont pas voulu venir. — Họ đã không muốn đến.",
        ]
      },
      {
        topic:"Pronom Y — Remplace un complément de lieu",
        rule:`LE PRONOM Y = "đó / ở đó / đến đó"
Thay thế complément de lieu (à, en, dans, sur, chez... + lieu)

VỊ TRÍ: AVANT le verbe (comme les autres pronoms)
"Tu vas à la pharmacie?" → "Tu y vas?" (Y = à la pharmacie)
"Il est au bureau." → "Il y est." (Y = au bureau)
"Nous allons en France." → "Nous y allons." (Y = en France)

FORMES:
• Présent: J'y vais, Tu y vas, Il y va, Nous y allons...
• Futur proche: Je vais y aller. (y avant l'infinitif)
• Passé composé: J'y suis allé(e). (y avant l'auxiliaire)
• Impératif affirmatif: Vas-y! Allons-y! Allez-y!
• Impératif négatif: N'y va pas! N'y allons pas!

⚠️ Y ne remplace PAS les personnes (on utilise lui/leur):
"Je vais chez le médecin." → "J'y vais." ✅ (lieu)
"Je pense à ce problème." → "J'y pense." ✅ (chose)
"Je pense à ma mère." → "Je pense à elle." ❌ "J'y pense." (personne!)`,
        examples:[
          "Tu vas à la pharmacie? Oui, j'y vais maintenant. — Bạn đến nhà thuốc không? Có, tôi đi ngay.",
          "Il travaille au cabinet médical. Il y travaille depuis 5 ans. — Anh ấy làm ở phòng khám 5 năm rồi.",
          "On y va? — Chúng ta đi nhé? (đến đó)",
          "J'y suis allé(e) hier. — Tôi đã đến đó hôm qua.",
          "Allez-y! — Cứ tiến hành đi! / Cứ nói đi!",
          "N'y va pas, c'est dangereux. — Đừng đến đó, nguy hiểm.",
        ]
      },
      {
        topic:"Obligation personnelle — Devoir + infinitif",
        rule:`DEVOIR + INFINITIF = "phải làm gì" (obligation personnelle)

Chia DEVOIR au présent:
• Je dois      • Nous devons
• Tu dois      • Vous devez
• Il/Elle doit  • Ils/Elles doivent

Khác với IL FAUT (obligation générale, impersonnelle):
"Il faut manger des légumes." = Nói chung, người ta nên ăn rau.
"Tu DOIS manger des légumes." = Bạn (cụ thể) phải ăn rau.

PHỦ ĐỊNH → INTERDICTION (cấm):
"Tu ne dois PAS fumer." = Bạn không được hút thuốc.
"Il ne doit PAS conduire." = Anh ấy không được lái xe.

Các nghĩa khác của DEVOIR:
• Obligation: "Je dois partir." (tôi phải đi)
• Probabilité: "Il doit être là." (chắc anh ấy ở đó)
• Obligation morale: "Tu dois l'aider." (bạn nên giúp cô ấy)

DEVOIR au PASSÉ COMPOSÉ: "J'ai dû..." = tôi đã phải...
"J'ai dû prendre des médicaments." (Tôi đã phải uống thuốc)`,
        examples:[
          "Tu dois prendre ce médicament 3 fois par jour. — Bạn phải uống thuốc này 3 lần mỗi ngày.",
          "Vous devez vous reposer. — Bạn cần nghỉ ngơi.",
          "Il ne doit pas faire de sport cette semaine. — Anh ấy không được tập thể thao tuần này.",
          "Elle doit aller chez le médecin demain. — Cô ấy phải đến gặp bác sĩ ngày mai.",
          "Nous devons manger sainement. — Chúng ta phải ăn uống lành mạnh.",
          "J'ai dû annuler mon cours. — Tôi đã phải hủy bài học.",
        ]
      },
      {
        topic:"Le conseil — Pouvoir au présent + infinitif",
        rule:`POUVOIR + INFINITIF để ĐƯA RA LỜI KHUYÊN (Unité 8):

"Tu peux / Vous pouvez + infinitif"
"Tu peux faire du sport 3 fois par semaine."
"Vous pouvez prendre de la vitamine C."

So sánh các cách đưa lời khuyên ở A1:
1. POUVOIR (lời khuyên thực tế, có thể làm):
   "Tu peux te reposer plus." (Bạn có thể nghỉ ngơi nhiều hơn.)
2. DEVOIR (bắt buộc, obligation):
   "Tu dois prendre ce médicament."
3. IL FAUT (quy tắc chung):
   "Il faut boire beaucoup d'eau."
4. IMPÉRATIF (trực tiếp):
   "Repose-toi!"

Phủ định → cấm:
"Tu ne peux pas faire de sport cette semaine."
"Vous ne pouvez pas consommer d'alcool."`,
        examples:[
          "Tu peux prendre du paracétamol pour la fièvre. — Bạn có thể uống paracétamol để hạ sốt.",
          "Vous pouvez faire de la marche rapide, c'est bon pour la santé. — Bạn có thể đi bộ nhanh, tốt cho sức khỏe.",
          "Il peut commencer par du yoga pour se détendre. — Anh ấy có thể bắt đầu bằng yoga để thư giãn.",
          "Tu ne peux pas fumer ici. — Bạn không được hút thuốc ở đây.",
          "Pour dormir mieux, vous pouvez éviter le café le soir. — Để ngủ ngon hơn, bạn có thể tránh cà phê buổi tối.",
        ]
      },
      {
        topic:"Verbe BOIRE — Uống",
        rule:`BOIRE (uống) — Động từ bất quy tắc:

Chia BOIRE au présent:
• Je bois     • Nous buvons
• Tu bois     • Vous buvez
• Il boit     • Ils boivent

Participe passé: BU (bất quy tắc!)
"J'ai bu beaucoup d'eau aujourd'hui."

Dùng BOIRE với mạo từ phân lượng:
• de l'eau: "Je bois de l'eau."
• du café: "Il boit du café le matin."
• du lait: "Elle boit du lait."
• du vin / de la bière: "Ils boivent du vin."

💡 Lời khuyên y tế thường gặp:
"Il faut boire 1,5 litre d'eau par jour."
"Buvez beaucoup d'eau quand vous êtes malade."

⚠️ Phân biệt: "Je bois" (hành động) ≠ "J'ai soif" (trạng thái khát)`,
        examples:[
          "Je bois deux litres d'eau par jour. — Tôi uống hai lít nước mỗi ngày.",
          "Il boit du café le matin et du thé le soir. — Anh ấy uống cà phê buổi sáng và trà buổi tối.",
          "Qu'est-ce que vous voulez boire? — Bạn muốn uống gì?",
          "On boit quelque chose? — Chúng ta uống gì đó nhé?",
          "J'ai bu trop de café aujourd'hui. — Hôm nay tôi đã uống quá nhiều cà phê.",
        ]
      },
    ]
  },
  {
    id:"g9", num:"9", title:"Bonnes vacances!", points:[
      {
        topic:"Comparatifs — Plus, Aussi, Moins + adjectif + que",
        rule:`SO SÁNH trong tiếng Pháp — 3 mức độ:

SUPÉRIEUR (hơn): PLUS + adjectif + QUE
"Le train est plus rapide que le bus."

ÉGALITÉ (bằng nhau): AUSSI + adjectif + QUE
"Cet hôtel est aussi confortable que l'autre."

INFÉRIORITÉ (kém hơn): MOINS + adjectif + QUE
"Le camping est moins cher que l'hôtel."

⚠️ IRRÉGULIERS:
• BON → MEILLEUR (que): pas "plus bon"!
"Ce restaurant est meilleur que l'autre."
• MAUVAIS → PIRE (que) ou plus mauvais (informel)
• BIEN → MIEUX (adverbe, pas adjectif)

SO SÁNH VỚI NOM:
Plus de / Autant de / Moins de + nom + que
"Il y a plus de touristes en été qu'en hiver."

SO SÁNH VỚI VERBE:
Plus / Autant / Moins + que (pas d'adjectif)
"Je travaille plus que toi."
"Elle mange autant que son frère."

⚠️ QUE + pronom tonique: que moi, que toi, que lui, que nous...`,
        examples:[
          "Le TGV est plus rapide que la voiture. — Tàu cao tốc nhanh hơn ô tô.",
          "Cette plage est aussi belle que celle de Nice. — Bãi biển này đẹp như bãi ở Nice.",
          "Le camping est moins cher que l'hôtel, mais moins confortable. — Trại cắm trại rẻ hơn khách sạn nhưng kém tiện nghi hơn.",
          "Ce restaurant est meilleur que l'autre. — Nhà hàng này ngon hơn cái kia. (pas 'plus bon'!)",
          "Il y a plus de touristes en juillet qu'en mai. — Có nhiều khách du lịch hơn vào tháng 7 so với tháng 5.",
        ]
      },
      {
        topic:"Passé composé avec ÊTRE — Verbes de mouvement et d'état",
        rule:`Một số động từ dùng ÊTRE thay vì AVOIR ở passé composé!

DANH SÁCH PHẢI NHỚ (nhớ qua từ "DR & MRS VANT P" hoặc "la maison d'être"):
aller↔venir, partir↔arriver, entrer↔sortir,
monter↔descendre, naître↔mourir, rester, tomber,
passer, retourner, rentrer, devenir, revenir

⚠️ Với ÊTRE: PARTICIPE PASSÉ S'ACCORDE avec le SUJET!
• Masculin sg: Il est allé.
• Féminin sg: Elle est allée. (ajout de -E)
• Masculin pl: Ils sont allés. (ajout de -S)
• Féminin pl: Elles sont allées. (ajout de -ES)

⚠️ Verbes pronominaux → TOUJOURS avec ÊTRE:
"Je me suis levé(e)." "Il s'est habillé."

⚠️ ATTENTION: monter/descendre/sortir/rentrer/passer avec COD → AVOIR!
"Elle est montée." (sans COD, être)
"Elle a monté les bagages." (avec COD, avoir)`,
        examples:[
          "Je suis allé(e) à la plage hier. — Tôi đã đến bãi biển hôm qua.",
          "Elle est arrivée à 8h du matin. — Cô ấy đã đến lúc 8 giờ sáng.",
          "Ils sont partis tôt ce matin. — Họ đã khởi hành sớm sáng nay.",
          "Nous sommes restés une semaine. — Chúng tôi đã ở lại một tuần.",
          "Elle est née à Lyon. — Cô ấy sinh ở Lyon.",
          "Il est tombé en vacances et il est allé à l'hôpital. — Anh ấy bị ngã trong kỳ nghỉ và đã đến bệnh viện.",
        ]
      },
      {
        topic:"L'imparfait — C'était, Il y avait, Il faisait (description au passé)",
        rule:`L'IMPARFAIT dùng để MÔ TẢ ở quá khứ (trạng thái, hoàn cảnh, thói quen)

THÀNH LẬP: Radical de NOUS au présent + terminaisons
Terminaisons: -ais / -ais / -ait / -ions / -iez / -aient
ÊTRE (seule exception): j'étais, tu étais, il était...

Ba cụm từ cực kỳ hay dùng trong Édito A1:
• C'était + adjectif: "C'était magnifique! / C'était calme."
• Il y avait + nom: "Il y avait beaucoup de monde."
• Il faisait + temps: "Il faisait chaud/froid/beau/mauvais."

PHÂN BIỆT PASSÉ COMPOSÉ vs IMPARFAIT:
• Passé composé: hành động XẢY RA, CỤ THỂ
  "Je suis allé(e) à la plage." (tôi đã đi)
• Imparfait: HOÀN CẢNH, MÔ TẢ, THÓI QUEN
  "Il faisait beau, il y avait des touristes partout..."

Thường dùng CÙNG NHAU:
"Quand je suis arrivé(e) (PC), il faisait (IMP) très chaud."
(Khi tôi đến nơi, trời đang rất nóng.)`,
        examples:[
          "C'était magnifique! La mer était bleue et le sable blanc. — Thật tuyệt! Biển xanh và cát trắng.",
          "Il y avait beaucoup de touristes à la plage. — Có rất nhiều khách du lịch ở bãi biển.",
          "Il faisait très chaud, environ 35 degrés. — Trời rất nóng, khoảng 35 độ.",
          "Quand nous sommes arrivés, il pleuvait. — Khi chúng tôi đến nơi, trời đang mưa.",
          "L'hôtel était confortable et le personnel était sympa. — Khách sạn thoải mái và nhân viên thân thiện.",
        ]
      },
      {
        topic:"Giới từ chỉ xuất xứ (2) — De, D', Du, Des",
        rule:`Giới từ chỉ NƠI ĐẾN TỪ (provenance) — Unité 9:

ĐỐI VỚI THÀNH PHỐ → DE (luôn luôn):
• Je viens de Paris.
• Elle arrive de Tokyo.
• Il revient d'Hanoi. (de → d' trước nguyên âm)

ĐỐI VỚI QUỐC GIA:
• DE + nước nữ (kết thúc -e): de France, de Chine, d'Espagne
• DU = DE + LE → nước nam: du Japon, du Canada, du Vietnam
• DES = DE + LES → nước số nhiều: des États-Unis, des Pays-Bas
• D' + nguyên âm: d'Iran, d'Angola

SO SÁNH Unité 1 (destination) vs Unité 9 (provenance):
✅ Je vais AU Japon. (đi đến Nhật — au = à + le)
✅ Je reviens DU Japon. (từ Nhật về — du = de + le)
✅ Elle habite EN France. (sống ở Pháp)
✅ Elle vient DE France. (đến từ Pháp)

💡 Mẹo: À/EN/AU/AUX = đến đâu → DE/D'/DU/DES = từ đâu`,
        examples:[
          "Je viens de Paris. — Tôi đến từ Paris.",
          "Elle revient du Japon après ses vacances. — Cô ấy trở về từ Nhật sau kỳ nghỉ.",
          "Ils arrivent des États-Unis ce soir. — Họ đến từ Mỹ tối nay.",
          "Ce fromage vient de France. — Phô mai này đến từ Pháp.",
          "Tu rentres d'Espagne? — Bạn vừa từ Tây Ban Nha về à?",
          "Le vol vient du Canada. — Chuyến bay đến từ Canada.",
        ]
      },
    ]
  },
  {
    id:"g10", num:"10", title:"Au travail!", points:[
      {
        topic:"Pronoms COD (2) — Me, Te, Nous, Vous",
        rule:`COD de 1re et 2e personnes — thay thế NGƯỜI trong câu:

• ME (m') = tôi (object): "Tu me comprends?"
• TE (t') = bạn (object): "Je te comprends."
• NOUS = chúng tôi (object): "Il nous aide."
• VOUS = các bạn / bạn (lịch sự) (object): "Je vous écoute."

VỊ TRÍ: AVANT le verbe (comme le/la/les)
"Il me téléphone souvent." (me avant le verbe)
"Je te comprends." (te avant le verbe)

DEVANT VOYELLE:
me → m': "Il m'appelle."
te → t': "Je t'écoute."

PHỦ ĐỊNH:
"Il ne me comprend pas." "Je ne te vois pas."

PASSÉ COMPOSÉ:
"Il m'a appelé." "Tu nous as compris?"
⚠️ Accord avec COD féminin: "Il m'a appelée." (si je = femme)

TEMPS COMPOSÉS + accord:
"Il vous a écoutés." (vous = hommes ou mixte)
"Il vous a écoutées." (vous = femmes seulement)`,
        examples:[
          "Tu me comprends? — Bạn hiểu tôi không?",
          "Il nous contacte par mail. — Anh ấy liên hệ chúng tôi qua email.",
          "Je t'écoute, continue! — Tôi đang nghe bạn, tiếp tục đi!",
          "Elle m'a appelé(e) ce matin. — Cô ấy đã gọi cho tôi sáng nay.",
          "Ils vous ont invités à la réunion? — Họ đã mời bạn đến cuộc họp chưa?",
          "Il ne me répond pas. — Anh ấy không trả lời tôi.",
        ]
      },
      {
        topic:"Pronoms relatifs — Qui et Que",
        rule:`PRONOMS RELATIFS nối hai câu, tránh lặp từ.

QUI = sujet (chủ ngữ) — suivi d'un VERBE
"J'ai un travail. Ce travail est intéressant."
→ "J'ai un travail QUI est intéressant."
(qui remplace "ce travail" = sujet de "est")

QUE/QU' = COD (bổ ngữ trực tiếp) — suivi d'un SUJET + VERBE
"J'ai des collègues. J'aime beaucoup ces collègues."
→ "J'ai des collègues QUE j'aime beaucoup."
(que remplace "ces collègues" = COD de "j'aime")

⚠️ QUE → QU' devant voyelle ou h muet:
"C'est un métier QU'il adore." "La collègue QU'elle cherche."

⚠️ OÙ = pronom relatif de lieu/temps:
"C'est le bureau OÙ je travaille." (lieu)
"C'est le jour OÙ je l'ai rencontré." (temps)

DONT = relatif de "de":
"C'est le projet DONT je parle." (parler DE qqch)
"C'est l'ami DONT je t'ai parlé." (parler DE qqn)`,
        examples:[
          "J'ai trouvé un emploi qui me plaît beaucoup. — Tôi đã tìm được công việc mà tôi rất thích.",
          "C'est un métier que j'adore. — Đây là nghề mà tôi rất yêu thích.",
          "La collègue qu'il cherche est en réunion. — Đồng nghiệp mà anh ấy tìm đang họp.",
          "C'est une entreprise qui offre de bonnes conditions. — Đây là công ty đưa ra điều kiện tốt.",
          "Le bureau où je travaille est très moderne. — Văn phòng nơi tôi làm việc rất hiện đại.",
          "Voilà le dossier dont tu as besoin. — Đây là hồ sơ mà bạn cần.",
        ]
      },
      {
        topic:"L'intensité — Un peu, Assez, Très, Beaucoup, Trop",
        rule:`Các trạng từ chỉ MỨC ĐỘ — thang tăng dần:

un peu (một chút) < assez (khá) < très (rất) < beaucoup (nhiều) < trop (quá)

RÈGLES D'EMPLOI:

TRÈS + adjectif/adverbe:
"Je suis très fatigué." "Elle parle très vite."
⚠️ Không nói "très beaucoup"!

BEAUCOUP + verbe (sans de):
"Je travaille beaucoup." "Il mange beaucoup."
Beaucoup de + nom: "Il a beaucoup DE travail."

UN PEU + adjectif/verbe:
"C'est un peu difficile." "Je mange un peu."
Un peu de + nom: "Un peu DE patience!"

ASSEZ + adjectif/verbe:
"Je suis assez fatigué." "Elle travaille assez."
Assez de + nom: "J'ai assez DE temps."

TROP → sens NÉGATIF (excès, problème):
"C'est trop cher!" "Je travaille trop."
Trop de + nom: "Il y a trop DE bruit."
⚠️ "Trop" n'est pas un compliment (sauf argot jeune: "c'est trop bien!")`,
        examples:[
          "Je suis très fatigué(e) parce que je travaille beaucoup. — Tôi rất mệt vì làm việc nhiều.",
          "Ce poste est assez intéressant mais un peu stressant. — Vị trí này khá thú vị nhưng hơi căng thẳng.",
          "Il parle trop vite, je ne comprends pas! — Anh ấy nói quá nhanh, tôi không hiểu!",
          "Elle a beaucoup d'expérience dans ce domaine. — Cô ấy có nhiều kinh nghiệm trong lĩnh vực này.",
          "Tu manges un peu trop de sucre. — Bạn ăn hơi nhiều đường đó.",
          "Il a très bien réussi son entretien. — Anh ấy đã vượt qua buổi phỏng vấn rất tốt.",
        ]
      },
      {
        topic:"Thời gian và tiếp diễn — Pendant, Longtemps, Toujours",
        rule:`Ba biểu thức chỉ THỜI GIAN và SỰ TIẾP DIỄN — Unité 10:

PENDANT + durée = "trong suốt / trong khoảng thời gian"
"J'ai travaillé dans cette entreprise PENDANT deux ans."
"Elle a étudié le français PENDANT six mois."
→ Dùng với passé composé, chỉ khoảng thời gian đã kết thúc

LONGTEMPS = "lâu / trong thời gian dài" (không chỉ định cụ thể)
"Il a attendu LONGTEMPS." (Anh ấy đã chờ rất lâu)
"Je travaille ici depuis LONGTEMPS." (Tôi làm đây lâu rồi)

TOUJOURS — có HAI nghĩa, phân biệt qua ngữ cảnh:
1. = "vẫn còn" (tiếp diễn): "Il travaille TOUJOURS ici."
2. = "luôn luôn" (tần suất): "Je prends TOUJOURS le bus."

ENCORE = "vẫn còn" (đồng nghĩa với toujours nghĩa 1)
"Tu es encore là? — Toujours!" (Bạn vẫn còn đó? — Vẫn!)

⚠️ NE... PLUS = không còn nữa (phủ định của toujours/encore)
"Il ne travaille PLUS ici." (Anh ấy không còn làm ở đây nữa)`,
        examples:[
          "J'ai travaillé dans cette société pendant cinq ans. — Tôi đã làm việc ở công ty đó năm năm.",
          "Elle a cherché un emploi pendant longtemps. — Cô ấy đã tìm việc trong thời gian dài.",
          "Il travaille toujours dans la même entreprise. — Anh ấy vẫn còn làm ở cùng công ty.",
          "Tu attends depuis longtemps? — Bạn đợi lâu chưa?",
          "Il ne travaille plus ici. — Anh ấy không còn làm ở đây nữa.",
          "J'ai étudié le français pendant deux ans avant de venir en France. — Tôi đã học tiếng Pháp hai năm trước khi đến Pháp.",
        ]
      },
    ]
  },
];

function RuleRenderer({ text }) {
  if (!text) return null;
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"0.18rem" }}>
      {text.split("\n").map((line, i) => {
        const t = line.trim();
        if (!t) return <div key={i} style={{ height:"0.35rem" }}/>;
        if (t.startsWith("⚠️")) return (
          <div key={i} style={{ background:"#FFF8E1", border:"1px solid #F59E0B44", borderRadius:6, padding:"0.28rem 0.55rem", fontSize:"0.73rem", color:"#92400E", lineHeight:1.55 }}>{t}</div>
        );
        if (t.startsWith("💡")) return (
          <div key={i} style={{ background:"#EFF6FF", borderRadius:6, padding:"0.28rem 0.55rem", fontSize:"0.73rem", color:"#1D4ED8", lineHeight:1.55 }}>{t}</div>
        );
        if (t.startsWith("✅")) return (
          <div key={i} style={{ fontSize:"0.73rem", color:"#166534", lineHeight:1.55, paddingLeft:"0.25rem" }}>{t}</div>
        );
        if (t.startsWith("❌")) return (
          <div key={i} style={{ fontSize:"0.73rem", color:"#DC2626", lineHeight:1.55, paddingLeft:"0.25rem" }}>{t}</div>
        );
        if (t.startsWith("•")) return (
          <div key={i} style={{ fontFamily:"Georgia,serif", fontSize:"0.78rem", color:C.ink, lineHeight:1.65, paddingLeft:"0.4rem" }}>{t}</div>
        );
        if (/^[A-ZÀÂÁÉÈÊËÎÏÔÙÛÜ\s()]+:/.test(t) || (t.endsWith(":") && t.length < 50)) return (
          <div key={i} style={{ fontSize:"0.68rem", color:C.purple, fontWeight:700, textTransform:"uppercase", letterSpacing:0.6, marginTop:"0.3rem", lineHeight:1.4 }}>{t}</div>
        );
        return <div key={i} style={{ fontSize:"0.76rem", color:C.ink, lineHeight:1.65 }}>{t}</div>;
      })}
    </div>
  );
}

export function GrammarPresets({ onLoad }) {
  const [open, setOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [openPoints, setOpenPoints] = useState(new Set());

  return (
    <div style={{ background:C.white, border:`1.5px solid ${C.purple}33`, borderRadius:12, overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,0.05)" }}>
      <button onClick={()=>{ setOpen(o=>!o); setSelectedUnit(null); }}
        style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0.65rem 0.9rem", background:"transparent", border:"none", cursor:"pointer", fontFamily:"inherit" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <span style={{ fontSize:"0.85rem" }}>📘</span>
          <div style={{ textAlign:"left" }}>
            <div style={{ fontSize:"0.78rem", fontWeight:600, color:C.purple }}>Ngữ pháp Édito A1 — theo unité</div>
            <div style={{ fontSize:"0.65rem", color:C.gray }}>11 unités · giải thích + ví dụ + bài tập</div>
          </div>
        </div>
        <span style={{ fontSize:"0.8rem", color:C.gray }}>{open?"▲":"▼"}</span>
      </button>

      {open && !selectedUnit && (
        <div style={{ borderTop:`1px solid ${C.border}`, padding:"0.6rem" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.4rem" }}>
            {EDITO_GRAMMAR.map(u => (
              <button key={u.id} onClick={()=>{ setSelectedUnit(u); setOpenPoints(new Set()); }}
                style={{ background:C.cream, border:`1px solid ${C.border}`, borderRadius:8, padding:"0.55rem 0.6rem", textAlign:"left", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.background=C.purpleL}
                onMouseLeave={e=>e.currentTarget.style.background=C.cream}>
                <div style={{ display:"flex", gap:"0.35rem", alignItems:"center" }}>
                  <span style={{ background:C.purple, color:C.white, fontSize:"0.58rem", fontWeight:700, borderRadius:20, padding:"0.1rem 0.38rem", whiteSpace:"nowrap" }}>U{u.num}</span>
                  <div>
                    <div style={{ fontSize:"0.75rem", fontWeight:600, color:C.ink, lineHeight:1.2 }}>{u.title}</div>
                    <div style={{ fontSize:"0.62rem", color:C.gray }}>{u.points.length} điểm ngữ pháp</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {open && selectedUnit && (
        <div style={{ borderTop:`1px solid ${C.border}` }}>
          <button onClick={()=>{ setSelectedUnit(null); setOpenPoints(new Set()); }}
            style={{ display:"flex", alignItems:"center", gap:"0.4rem", padding:"0.5rem 0.9rem", background:"transparent", border:"none", cursor:"pointer", fontSize:"0.72rem", color:C.gray, fontFamily:"inherit" }}>
            ← Tất cả unités
          </button>
          <div style={{ padding:"0 0.75rem 0.75rem", display:"flex", flexDirection:"column", gap:"0.5rem" }}>
            {selectedUnit.points.map((p, i) => {
              const isOpen = openPoints.has(i);
              const toggle = () => setOpenPoints(prev => { const s=new Set(prev); s.has(i)?s.delete(i):s.add(i); return s; });
              return (
                <div key={i} style={{ background:C.white, border:`1.5px solid ${isOpen?C.purple+"55":C.border}`, borderRadius:12, overflow:"hidden", boxShadow:`0 2px 8px rgba(91,79,207,${isOpen?0.1:0.04})`, transition:"border-color 0.2s" }}>
                  {/* Clickable header */}
                  <div onClick={toggle} style={{ background:isOpen?C.purpleL:C.white, padding:"0.6rem 0.75rem", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", transition:"background 0.2s" }}>
                    <div style={{ fontSize:"0.78rem", fontWeight:600, color:C.purple, lineHeight:1.3, flex:1 }}>{p.topic}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", flexShrink:0 }}>
                      <button onClick={e=>{ e.stopPropagation(); onLoad(p.topic); }}
                        style={{ background:C.purple, color:C.white, border:"none", borderRadius:20, padding:"0.2rem 0.6rem", fontSize:"0.62rem", cursor:"pointer", whiteSpace:"nowrap" }}>
                        Luyện tập →
                      </button>
                      <span style={{ color:C.purple, fontSize:"0.75rem", transform:isOpen?"rotate(180deg)":"none", transition:"transform 0.2s" }}>▾</span>
                    </div>
                  </div>
                  {/* Collapsible body */}
                  {isOpen && (
                    <div style={{ padding:"0.65rem 0.85rem", borderTop:`1px solid ${C.purple}22` }}>
                      <div style={{ background:C.cream, borderRadius:8, padding:"0.55rem 0.7rem", borderLeft:`3px solid ${C.purple}`, marginBottom:"0.65rem" }}>
                        <RuleRenderer text={p.rule}/>
                      </div>
                      <div style={{ fontSize:"0.63rem", textTransform:"uppercase", letterSpacing:0.8, color:C.gray, marginBottom:"0.4rem", fontWeight:600 }}>Ví dụ</div>
                      <div style={{ display:"flex", flexDirection:"column", gap:"0.45rem" }}>
                        {p.examples.map((ex, j) => {
                          const parts = ex.split(" — ");
                          const fr = parts[0] || ex;
                          const vi = parts[1] || "";
                          return (
                            <div key={j} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:8, padding:"0.45rem 0.65rem" }}>
                              <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", marginBottom: vi?"0.2rem":0 }}>
                                <span style={{ fontSize:"0.65rem", color:C.purple, flexShrink:0 }}>▸</span>
                                <span style={{ fontFamily:"Georgia,serif", fontSize:"0.8rem", color:C.ink, fontStyle:"italic", flex:1 }}>{fr}</span>
                                <SpeakBtn text={fr} size="0.7rem"/>
                              </div>
                              {vi && <div style={{ fontSize:"0.72rem", color:C.gray, marginLeft:"1.1rem", lineHeight:1.5 }}>→ {vi}</div>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function GrammarExplanation({ rules, text }) {
  // Prefer structured rules array; fall back to splitting plain text
  const items = rules && rules.length > 0 ? rules : (
    text ? text.split(/(?<=\S)\s+(?=\d+\.\s)|\n+/).filter(l => l.trim()).map(l => {
      if (/^⚠/.test(l.trim())) return { type: "warning", content: l.trim() };
      if (/^(Ngoại lệ|Lưu ý)/i.test(l.trim())) return { type: "note", content: l.trim() };
      return { type: "rule", content: l.trim() };
    }) : []
  );

  if (!items.length) return null;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem" }}>
      {items.map((item, i) => {
        if (item.type === "warning") return (
          <div key={i} style={{ display:"flex", gap:"0.5rem", alignItems:"flex-start", background:"#fff8e6", border:"1px solid #f5c842", borderRadius:8, padding:"0.45rem 0.7rem" }}>
            <span style={{ fontSize:"0.9rem", flexShrink:0 }}>⚠️</span>
            <span style={{ fontSize:"0.78rem", color:"#7a5800", lineHeight:1.6 }}>{item.content.replace(/^⚠️?\s*/, "")}</span>
          </div>
        );
        if (item.type === "note") return (
          <div key={i} style={{ fontSize:"0.75rem", color:C.purple, lineHeight:1.6, padding:"0.35rem 0.65rem", background:C.purpleL, borderRadius:8, fontStyle:"italic" }}>
            {item.content}
          </div>
        );
        // type === "rule" — check if starts with number
        const numMatch = item.content.match(/^(\d+)\.\s*(.*)/s);
        if (numMatch) {
          const num = numMatch[1];
          const rest = numMatch[2];
          const colonIdx = rest.indexOf(":");
          const title = colonIdx > -1 ? rest.slice(0, colonIdx).trim() : rest;
          const detail = colonIdx > -1 ? rest.slice(colonIdx + 1).trim() : "";
          return (
            <div key={i} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:10, overflow:"hidden" }}>
              <div style={{ background:C.purple, padding:"0.3rem 0.7rem", display:"flex", alignItems:"center", gap:"0.5rem" }}>
                <span style={{ background:C.white, color:C.purple, fontWeight:700, fontSize:"0.65rem", borderRadius:"50%", width:"1.2rem", height:"1.2rem", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{num}</span>
                <span style={{ fontSize:"0.78rem", color:C.white, fontWeight:600, lineHeight:1.4 }}>{title}</span>
              </div>
              {detail && <div style={{ padding:"0.4rem 0.7rem", fontSize:"0.76rem", color:C.ink, lineHeight:1.7, fontFamily:"Georgia,serif", fontStyle:"italic" }}>{detail}</div>}
            </div>
          );
        }
        // Plain rule
        return (
          <div key={i} style={{ fontSize:"0.78rem", color:C.ink, lineHeight:1.7, padding:"0.1rem 0.1rem" }}>
            {item.content}
          </div>
        );
      })}
    </div>
  );
}

// ── Edito unit list (primary grammar view) ────────────────
function EditoGrammarView() {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [openPoints, setOpenPoints]     = useState(new Set());
  const [activeExercise, setActiveExercise] = useState(null); // {topic}
  const [loading, setLoading]   = useState(false);
  const [result, setResult]     = useState(null);
  const [err, setErr]           = useState("");
  const quizRef = useRef(null);

  const launchExercise = async (topic) => {
    setActiveExercise({ topic });
    setResult(null); setErr(""); setLoading(true);
    try {
      const data = await callAI(buildGrammarPrompt(topic, "A1", "mixed", 12));
      setResult(data);
      setTimeout(() => quizRef.current?.scrollIntoView({ behavior:"smooth", block:"start" }), 150);
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  const renderExercises = () => {
    if (!result) return null;
    const onW = () => {};
    if (result.type==="mc") return <GrammarMC exercises={result.exercises} onWrong={onW}/>;
    if (result.type==="fill") return <GrammarFill exercises={result.exercises}/>;
    if (result.type==="order") return <GrammarOrder exercises={result.exercises}/>;
    if (result.type==="mixed") return result.sections?.map((sec,i)=>(
      <div key={i} style={{marginBottom:"0.5rem"}}>
        <SecLabel icon={sec.sectionType==="mc"?"☑":sec.sectionType==="fill"?"✏️":"🔀"} text={sec.sectionType==="mc"?"Chọn đáp án":sec.sectionType==="fill"?"Điền vào chỗ trống":"Sắp xếp câu"}/>
        {sec.sectionType==="mc"&&<GrammarMC exercises={sec.exercises} onWrong={onW}/>}
        {sec.sectionType==="fill"&&<GrammarFill exercises={sec.exercises}/>}
        {sec.sectionType==="order"&&<GrammarOrder exercises={sec.exercises}/>}
      </div>
    ));
    return null;
  };

  // Exercise view
  if (activeExercise) {
    return (
      <div style={{ padding:"1rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.9rem" }}>
          <button onClick={() => { setActiveExercise(null); setResult(null); }}
            style={{ background:C.purpleL, border:`1.5px solid ${C.purple}33`, color:C.purple, padding:"0.3rem 0.75rem", borderRadius:10, fontSize:"0.78rem", cursor:"pointer", fontWeight:600 }}>
            ← Quay lại
          </button>
          {result && !loading && (
            <button onClick={() => launchExercise(activeExercise.topic)}
              style={{ padding:"0.25rem 0.65rem", border:`1.5px solid ${C.border}`, borderRadius:20, background:C.white, color:C.ink, fontSize:"0.68rem", cursor:"pointer" }}>
              🔄 Tạo lại
            </button>
          )}
        </div>
        {loading && (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.8rem", padding:"2rem", color:C.gray }}>
            <Spinner /><span style={{ fontSize:"0.88rem" }}>AI đang tạo bài tập...</span>
          </div>
        )}
        {err && <div style={{ color:C.red, padding:"0.75rem", background:"#fde8e6", borderRadius:10, fontSize:"0.82rem" }}>⚠ {err}</div>}
        {result && !loading && (
          <>
            {(result.explanationRules?.length > 0 || result.explanation) && (
              <div style={{ background:C.purpleL, border:`1px solid #d4c5f5`, borderRadius:12, padding:"0.75rem 0.9rem", marginBottom:"0.75rem" }}>
                <div style={{ fontSize:"0.65rem", textTransform:"uppercase", letterSpacing:1, color:C.purple, marginBottom:"0.5rem", fontWeight:600 }}>
                  📖 Lý thuyết — {result.topic}
                </div>
                <GrammarExplanation rules={result.explanationRules} text={result.explanation} />
              </div>
            )}
            <div ref={quizRef}>{renderExercises()}</div>
          </>
        )}
      </div>
    );
  }

  // Unit detail
  if (selectedUnit) {
    return (
      <div style={{ padding:"1rem" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"1rem" }}>
          <button onClick={() => { setSelectedUnit(null); setOpenPoints(new Set()); }}
            style={{ background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, padding:"0.2rem 0.65rem", borderRadius:20, fontSize:"0.7rem", cursor:"pointer", fontWeight:600 }}>
            ← Quay lại
          </button>
          <div style={{ background:C.purple, color:"#fff", borderRadius:999, minWidth:28, height:28, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.78rem", fontWeight:700, flexShrink:0 }}>
            {selectedUnit.num}
          </div>
          <div>
            <div style={{ fontWeight:700, color:C.ink, fontSize:"0.95rem" }}>Unité {selectedUnit.num}</div>
            <div style={{ fontSize:"0.72rem", color:C.purple, fontStyle:"italic" }}>{selectedUnit.title}</div>
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
          {selectedUnit.points.map((p, i) => {
            const isOpen = openPoints.has(i);
            const toggle = () => setOpenPoints(prev => { const s=new Set(prev); s.has(i)?s.delete(i):s.add(i); return s; });
            return (
              <div key={i} style={{ background:C.white, border:`1.5px solid ${isOpen?C.purple+"55":C.border}`, borderRadius:12, overflow:"hidden", transition:"border-color 0.2s" }}>
                <div onClick={toggle} style={{ background:isOpen?C.purpleL:C.white, padding:"0.65rem 0.85rem", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", transition:"background 0.2s" }}>
                  <div style={{ fontSize:"0.8rem", fontWeight:600, color:C.purple, lineHeight:1.3, flex:1 }}>{p.topic}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", flexShrink:0 }}>
                    <button onClick={e=>{ e.stopPropagation(); launchExercise(p.topic); }}
                      style={{ background:C.purple, color:C.white, border:"none", borderRadius:20, padding:"0.22rem 0.65rem", fontSize:"0.63rem", cursor:"pointer", whiteSpace:"nowrap" }}>
                      Làm bài tập →
                    </button>
                    <span style={{ color:C.purple, fontSize:"0.8rem", transform:isOpen?"rotate(180deg)":"none", transition:"transform 0.2s", display:"inline-block" }}>▾</span>
                  </div>
                </div>
                {isOpen && (
                  <div style={{ padding:"0.65rem 0.85rem", borderTop:`1px solid ${C.purple}22` }}>
                    <div style={{ background:C.cream, borderRadius:8, padding:"0.55rem 0.7rem", borderLeft:`3px solid ${C.purple}`, marginBottom:"0.65rem" }}>
                      <RuleRenderer text={p.rule}/>
                    </div>
                    <div style={{ fontSize:"0.63rem", textTransform:"uppercase", letterSpacing:0.8, color:C.gray, marginBottom:"0.4rem", fontWeight:600 }}>Ví dụ</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem" }}>
                      {p.examples.map((ex, j) => {
                        const parts = ex.split(" — ");
                        const fr = parts[0] || ex;
                        const vi = parts[1] || "";
                        return (
                          <div key={j} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:8, padding:"0.45rem 0.65rem" }}>
                            <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", marginBottom:vi?"0.2rem":0 }}>
                              <span style={{ fontSize:"0.65rem", color:C.purple, flexShrink:0 }}>▸</span>
                              <span style={{ fontFamily:"Georgia,serif", fontSize:"0.8rem", color:C.ink, fontStyle:"italic", flex:1 }}>{fr}</span>
                              <SpeakBtn text={fr} size="0.7rem"/>
                            </div>
                            {vi && <div style={{ fontSize:"0.72rem", color:C.gray, marginLeft:"1.1rem", lineHeight:1.5 }}>→ {vi}</div>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Unit list
  return (
    <div style={{ padding:"1rem" }}>
      <div style={{ marginBottom:"1rem" }}>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1rem", color:C.ink, fontWeight:700, marginBottom:"0.2rem" }}>
          📘 Ngữ pháp Edito A1
        </div>
        <div style={{ fontSize:"0.72rem", color:C.gray }}>Chọn unité để xem điểm ngữ pháp & làm bài tập</div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:"0.45rem" }}>
        {EDITO_GRAMMAR.map((u, i) => (
          <button key={u.id} onClick={() => { setSelectedUnit(u); setOpenPoints(new Set()); }}
            style={{ display:"flex", alignItems:"center", gap:"0.85rem", background:C.white, border:`1.5px solid ${C.purple}22`, borderRadius:14, padding:"0.75rem 1rem", cursor:"pointer", textAlign:"left", fontFamily:"inherit", animation:`fadeUp 0.2s ease ${i*0.03}s both`, transition:"all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.background = C.purpleL; e.currentTarget.style.borderColor = C.purple; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.white; e.currentTarget.style.borderColor = `${C.purple}22`; }}>
            <div style={{ background:C.purple, color:"#fff", borderRadius:999, minWidth:30, height:30, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.75rem", fontWeight:700, flexShrink:0 }}>
              {u.num}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700, color:C.ink, fontSize:"0.86rem" }}>Unité {u.num}: {u.title}</div>
              <div style={{ fontSize:"0.67rem", color:C.gray, marginTop:"0.08rem" }}>{u.points.length} điểm ngữ pháp</div>
            </div>
            <span style={{ color:C.gray }}>→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Free-form exercise generator ──────────────────────────
function CustomExerciseView() {
  const [topic, setTopic]     = useState("");
  const [level, setLevel]     = useState("A1");
  const [gtype, setGtype]     = useState("mixed");
  const [numQ, setNumQ]       = useState(12);
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);
  const [err, setErr]         = useState("");
  const [wrongCount, setWrongCount] = useState(0);
  const quizRef = useRef(null);

  const GRAMMAR_BY_LEVEL = {
    A1: ["Động từ être & avoir","Mạo từ le/la/l'/les","Mạo từ un/une/des","Số đếm 0-100","Đại từ nhân xưng","Thì hiện tại (présent)","Phủ định ne...pas","Tính từ sở hữu","Giới từ à & de","Câu hỏi đơn giản"],
    A2: ["Thì quá khứ passé composé","Thì chưa hoàn thành imparfait","Động từ phản thân","Tính từ so sánh","Trạng từ thường gặp","Đại từ COD & COI","Giới từ chỉ nơi chốn","Mạo từ partitif du/de la","Tương lai gần futur proche","Câu mệnh lệnh impératif"],
    B1: ["Thì tương lai đơn futur simple","Điều kiện hiện tại conditionnel","Mệnh đề quan hệ qui/que","Câu bị động voix passive","Liên từ phức tạp","Đại từ y & en","Thì subjonctif cơ bản","So sánh nhất (superlatif)","Câu gián tiếp","Động từ khuyết thiếu devoir/pouvoir"],
    B2: ["Subjonctif nâng cao","Conditionnel passé","Plus-que-parfait","Câu điều kiện loại 2 & 3","Đảo ngữ trong câu hỏi","Mệnh đề phân từ (participe)","Câu nhượng bộ","Phủ định phức tạp ne...que","Gérondif","Câu cảm thán"],
    C1: ["Subjonctif passé","Đảo ngữ văn phong cao","Nominalisaton","Câu điều kiện hỗn hợp","Liên từ nối câu phức","Phong cách viết trang trọng","Passif với các thì phức","Vị từ tri giác","Câu giả định","Cohérence du discours"],
    C2: ["Văn phong văn học","Archaïsmes & néologismes","Nuances du subjonctif","Rhétorique & argumentation","Registres de langue","Ironie & implicite","Syntaxe complexe","Ellipse & anaphore","Figures de style","Cohésion textuelle"],
  };

  const generate = async (overrideTopic) => {
    const t = (overrideTopic !== undefined ? overrideTopic : topic).trim();
    if (!t) { setErr("Nhập chủ đề ngữ pháp!"); return; }
    setLoading(true); setErr(""); setResult(null); setWrongCount(0);
    try {
      const data = await callAI(buildGrammarPrompt(t, level, gtype, numQ));
      setResult(data);
      setTimeout(() => quizRef.current?.scrollIntoView({ behavior:"smooth", block:"start" }), 150);
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  const renderExercises = () => {
    if (!result) return null;
    const onW = () => setWrongCount(n=>n+1);
    if (result.type==="mc") return <GrammarMC exercises={result.exercises} onWrong={onW}/>;
    if (result.type==="fill") return <GrammarFill exercises={result.exercises}/>;
    if (result.type==="order") return <GrammarOrder exercises={result.exercises}/>;
    if (result.type==="mixed") return result.sections?.map((sec,i)=>(
      <div key={i} style={{marginBottom:"0.5rem"}}>
        <SecLabel icon={sec.sectionType==="mc"?"☑":sec.sectionType==="fill"?"✏️":"🔀"} text={sec.sectionType==="mc"?"Chọn đáp án":sec.sectionType==="fill"?"Điền vào chỗ trống":"Sắp xếp câu"}/>
        {sec.sectionType==="mc"&&<GrammarMC exercises={sec.exercises} onWrong={onW}/>}
        {sec.sectionType==="fill"&&<GrammarFill exercises={sec.exercises}/>}
        {sec.sectionType==="order"&&<GrammarOrder exercises={sec.exercises}/>}
      </div>
    ));
    return null;
  };

  return (
    <div style={{ padding:"1rem", display:"flex", flexDirection:"column", gap:"0.75rem" }}>
      <div style={{ background:C.cream, borderRadius:12, padding:"0.9rem", display:"flex", flexDirection:"column", gap:"0.65rem" }}>
        <div style={{ fontSize:"0.72rem", fontWeight:600, color:C.purple }}>🎯 Nhập chủ đề tùy chỉnh</div>
        <div>
          <div style={{ fontSize:"0.65rem", color:C.gray, marginBottom:"0.3rem" }}>Chủ đề ngữ pháp</div>
          <input value={topic} onChange={e=>setTopic(e.target.value)} onKeyDown={e=>e.key==="Enter"&&generate()}
            placeholder="vd: chia động từ, mạo từ, thì quá khứ..."
            style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:8, padding:"0.5rem 0.7rem", fontSize:"0.82rem", fontFamily:"inherit", outline:"none", color:C.ink, boxSizing:"border-box" }}/>
        </div>
        <div>
          <div style={{ fontSize:"0.63rem", color:C.gray, marginBottom:"0.3rem" }}>Gợi ý {level}:</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.28rem" }}>
            {(GRAMMAR_BY_LEVEL[level]||[]).map((s,i)=>(
              <button key={i} onClick={()=>setTopic(s)}
                style={{ padding:"0.18rem 0.5rem", border:`1px solid ${topic===s?C.purple:C.border}`, borderRadius:20, background:topic===s?C.purple:C.white, color:topic===s?C.white:C.gray, fontSize:"0.65rem", cursor:"pointer", fontFamily:"inherit" }}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize:"0.65rem", color:C.gray, marginBottom:"0.3rem" }}>Trình độ</div>
          <div style={{ display:"flex", gap:"0.28rem" }}>
            {LEVELS.map(l=>(
              <button key={l} onClick={()=>{ setLevel(l); setTopic(""); }}
                style={{ flex:1, padding:"0.35rem 0.2rem", border:`1.5px solid ${level===l?C.purple:C.border}`, borderRadius:7, background:level===l?C.purple:C.white, color:level===l?C.white:C.ink, fontSize:"0.72rem", cursor:"pointer", fontFamily:"inherit" }}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize:"0.65rem", color:C.gray, marginBottom:"0.3rem" }}>Dạng bài tập</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.28rem" }}>
            {GTYPES.map(t=>(
              <button key={t.id} onClick={()=>setGtype(t.id)}
                style={{ padding:"0.4rem 0.3rem", border:`1.5px solid ${gtype===t.id?C.purple:C.border}`, borderRadius:8, background:gtype===t.id?C.purple:C.white, color:gtype===t.id?C.white:C.ink, fontSize:"0.73rem", cursor:"pointer", fontFamily:"inherit" }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <span style={{ fontSize:"0.65rem", color:C.gray, whiteSpace:"nowrap" }}>Số câu:</span>
          <input type="range" min={10} max={20} value={numQ} onChange={e=>setNumQ(Number(e.target.value))} style={{ flex:1, accentColor:C.purple }}/>
          <span style={{ fontFamily:"Georgia,serif", fontSize:"0.95rem", color:C.purple, fontWeight:600, minWidth:22 }}>{numQ}</span>
        </div>
        {err && <div style={{ color:C.red, fontSize:"0.75rem", padding:"0.38rem 0.58rem", background:"#fde8e6", borderRadius:6 }}>⚠ {err}</div>}
        <button onClick={()=>generate()} disabled={loading}
          style={{ padding:"0.75rem", background:loading?C.gray:C.ink, color:C.paper, border:"none", borderRadius:8, fontFamily:"Georgia,serif", fontSize:"0.92rem", cursor:loading?"not-allowed":"pointer" }}>
          {loading?"Đang tạo bài tập...":"Tạo bài tập ✦"}
        </button>
      </div>

      {(result?.explanationRules?.length > 0 || result?.explanation) && (
        <div style={{ background:C.purpleL, border:`1px solid #d4c5f5`, borderRadius:12, padding:"0.75rem 0.9rem" }}>
          <div style={{ fontSize:"0.65rem", textTransform:"uppercase", letterSpacing:1, color:C.purple, marginBottom:"0.6rem", fontWeight:600 }}>
            📖 Lý thuyết — {result.topic} · {result.level}
          </div>
          <GrammarExplanation rules={result.explanationRules} text={result.explanation} />
        </div>
      )}
      {loading && (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:160, gap:"0.7rem", color:C.gray }}>
          <Spinner/><span style={{ fontSize:"0.83rem" }}>AI đang tạo bài tập...</span>
        </div>
      )}
      {!loading && result && (
        <div ref={quizRef}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.75rem" }}>
            <span style={{ background:C.purple, color:C.white, fontSize:"0.6rem", padding:"0.16rem 0.52rem", borderRadius:20, textTransform:"uppercase", letterSpacing:0.5 }}>{result.topic} · {result.level}</span>
            <button onClick={()=>generate()} style={{ padding:"0.23rem 0.6rem", border:`1.5px solid ${C.border}`, borderRadius:20, background:C.white, color:C.ink, fontSize:"0.68rem", cursor:"pointer", fontFamily:"inherit" }}>🔄 Tạo lại</button>
          </div>
          {renderExercises()}
        </div>
      )}
    </div>
  );
}

export default function GrammarPanel() {
  const [panelTab, setPanelTab] = useState("edito");

  const TABS = [
    { id:"edito",  label:"📘 Edito A1"  },
    { id:"custom", label:"🎯 Tùy chỉnh" },
  ];

  const tabBar = (
    <div style={{ display:"flex", gap:"0.3rem", padding:"0.75rem 1rem 0" }}>
      {TABS.map(t => (
        <button key={t.id} onClick={() => setPanelTab(t.id)}
          style={{ flex:1, padding:"0.45rem 0.2rem", border:`1.5px solid ${panelTab===t.id?C.purple:C.border}`, borderRadius:10, background:panelTab===t.id?C.purple:C.white, color:panelTab===t.id?C.white:C.ink, fontSize:"0.7rem", cursor:"pointer", fontWeight:panelTab===t.id?700:400, fontFamily:"inherit", transition:"all 0.15s" }}>
          {t.label}
        </button>
      ))}
    </div>
  );

  return (
    <div>
      {tabBar}
      {panelTab === "edito"  && <EditoGrammarView />}
      {panelTab === "custom" && <CustomExerciseView />}
    </div>
  );
}
