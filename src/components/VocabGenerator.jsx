import { useState, useEffect } from "react";
import { C } from "../constants.js";
import { callAI, MODEL } from "../utils/api.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import Spinner from "./ui/Spinner.jsx";

// ── Example Card ───────────────────────────────────────────
export function ExampleCard({ word, triggerKey = 0 }) {
  const [state, setState] = useState("idle");
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  useEffect(() => {
    if (triggerKey > 0 && state === "idle") gen();
  }, [triggerKey]);

  const gen = async () => {
    setState("loading");
    try {
      const r = await callAI(`French teacher. For "${word.fr}"${word.vi?` (${word.vi})`:""},  create 2 example sentences.\nReturn ONLY JSON: {"sentences":[{"fr":"French sentence","vi":"Vietnamese translation","breakdown":[{"token":"word or chunk","role":"grammatical role in Vietnamese","note":"brief note or empty"}]}]}`);
      setData(r); setState("done");
    } catch(e) { setErr(e.message); setState("error"); }
  };
  return (
    <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:12, marginBottom:"0.55rem", overflow:"hidden" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0.65rem 0.95rem", borderBottom:state==="done"?`1px solid ${C.border}`:"none" }}>
        <div><span style={{ fontFamily:"Georgia,serif", fontSize:"0.92rem" }}>{word.fr}</span>{word.vi&&<span style={{ fontSize:"0.75rem", color:C.gray, marginLeft:"0.5rem" }}>— {word.vi}</span>}</div>
        {state==="idle"&&<button onClick={gen} style={{ padding:"0.25rem 0.58rem", background:C.purple, color:C.white, border:"none", borderRadius:6, fontSize:"0.7rem", cursor:"pointer" }}>Tạo ví dụ ✦</button>}
        {state==="loading"&&<div style={{ display:"flex", alignItems:"center", gap:"0.35rem", fontSize:"0.7rem", color:C.gray }}><div style={{ width:13,height:13,border:`2px solid ${C.border}`,borderTopColor:C.purple,borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>Đang tạo...</div>}
        {state==="done"&&<button onClick={()=>{setState("idle");setData(null);}} style={{ padding:"0.22rem 0.55rem", background:"transparent", color:C.gray, border:`1px solid ${C.border}`, borderRadius:6, fontSize:"0.67rem", cursor:"pointer" }}>Ẩn</button>}
        {state==="error"&&<button onClick={gen} style={{ padding:"0.22rem 0.55rem", background:"transparent", color:C.red, border:`1px solid ${C.red}`, borderRadius:6, fontSize:"0.67rem", cursor:"pointer" }}>Thử lại</button>}
      </div>
      {state==="error"&&<div style={{ padding:"0.5rem 0.95rem", fontSize:"0.72rem", color:C.red }}>⚠ {err}</div>}
      {state==="done"&&data?.sentences&&(
        <div style={{ padding:"0.65rem 0.95rem", display:"flex", flexDirection:"column", gap:"0.9rem" }}>
          {data.sentences.map((s,si)=>(
            <div key={si}>
              <div style={{ fontFamily:"Georgia,serif", fontSize:"0.92rem", lineHeight:1.5, marginBottom:"0.16rem" }}>{s.fr}</div>
              <div style={{ fontSize:"0.75rem", color:C.gray, fontStyle:"italic", marginBottom:"0.48rem" }}>→ {s.vi}</div>
              {s.breakdown?.length>0&&<div style={{ display:"flex", flexWrap:"wrap", gap:"0.28rem" }}>
                {s.breakdown.map((tok,ti)=>(
                  <div key={ti} style={{ background:C.purpleL, border:"1px solid #d4c5f5", borderRadius:7, padding:"0.27rem 0.48rem" }}>
                    <div style={{ fontFamily:"Georgia,serif", fontSize:"0.8rem", color:C.purple, fontWeight:600 }}>{tok.token}</div>
                    <div style={{ fontSize:"0.6rem", color:C.gray, marginTop:"0.07rem" }}>{tok.role}</div>
                    {tok.note&&<div style={{ fontSize:"0.58rem", color:"#7a5cb0", marginTop:"0.05rem" }}>{tok.note}</div>}
                  </div>
                ))}
              </div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Export PDF ─────────────────────────────────────────────
export function exportFillPDF(quiz) {
  const questions = quiz.type==="fill_blank"?quiz.questions:quiz.type==="mixed"?quiz.sections?.find(s=>s.sectionType==="fill_blank")?.questions:null;
  if (!questions?.length) return;
  const html=`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Bài điền từ</title><style>body{font-family:Georgia,serif;max-width:680px;margin:40px auto;color:#1a1a2e}h1{font-size:1.3rem;color:#6b4fbb;border-bottom:2px solid #c9a84c;padding-bottom:8px;margin-bottom:8px}.meta{font-size:0.75rem;color:#8a8a9a;margin-bottom:28px;font-family:system-ui}.q{margin-bottom:28px}.qnum{font-size:0.62rem;text-transform:uppercase;letter-spacing:1px;color:#8a8a9a;margin-bottom:4px;font-family:system-ui}.hint{color:#c9a84c;margin-left:8px;text-transform:none}.sentence{font-size:1rem;line-height:2}.blank{display:inline-block;min-width:110px;border-bottom:1.5px solid #1a1a2e;margin:0 3px}.writeline{font-size:0.72rem;color:#aaa;font-family:system-ui;margin-top:4px}.answers{margin-top:40px;padding-top:16px;border-top:1px dashed #ddd8cc;page-break-before:always}.answers h2{font-size:0.95rem;color:#6b4fbb;margin-bottom:10px}.answers p{font-size:0.82rem;line-height:2.2;font-family:system-ui}@media print{body{margin:20px}}</style></head><body><h1>✏️ Bài tập điền từ — Français</h1><div class="meta">Ngày: ${new Date().toLocaleDateString("vi-VN")} · ${questions.length} câu</div>${questions.map((q,i)=>`<div class="q"><div class="qnum">Câu ${i+1}${q.hint?`<span class="hint">· gợi ý: ${q.hint}</span>`:""}</div><div class="sentence">${(q.sentence||"").replace("___",'<span class="blank">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>')}</div><div class="writeline">Trả lời: _________________________________</div></div>`).join("")}<div class="answers"><h2>Đáp án</h2><p>${questions.map((q,i)=>`Câu ${i+1}: <b>${q.answer}</b>`).join(" · ")}</p></div></body></html>`;
  const blob=new Blob([html],{type:"text/html;charset=utf-8"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a"); a.href=url; a.download=`bai-dien-tu-${new Date().toISOString().slice(0,10)}.html`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

// ── Vocab Generator ────────────────────────────────────────
export default function VocabGenerator({ onGenerate }) {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const generate = async () => {
    if (!topic.trim()) { setErr("Nhập chủ đề trước!"); return; }
    setLoading(true); setErr("");
    try {
      const result = await callAI(
        `French teacher. Generate ${count} French vocabulary words for the topic: "${topic}".
For each word include:
- fr: the masculine form (or base form for verbs/expressions)
- fr_f: the feminine form if it exists and differs from masculine (e.g. for professions: "le médecin" → "la médecin", "le boulanger" → "la boulangère"). Leave empty string if no feminine form or if identical.
- gender: grammatical gender label like "m.", "f.", "m./f.", "m. pl." etc. Use "m./f." when the word has both forms.
- vi: Vietnamese meaning
- example_fr: one natural example sentence in French
- example_vi: Vietnamese translation of the example

Return ONLY JSON: {"words":[{"fr":"French word","fr_f":"feminine form or empty","gender":"m.","vi":"Vietnamese meaning","example_fr":"Example sentence","example_vi":"Vietnamese translation"}]}`
      );
      if (!result.words?.length) throw new Error("Không có kết quả");
      onGenerate(result.words);
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  return (
    <div style={{ background:C.white, border:`1.5px solid ${C.purple}44`, borderRadius:12, overflow:"hidden" }}>
      <button onClick={()=>setOpen(o=>!o)}
        style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0.65rem 0.9rem", background:"transparent", border:"none", cursor:"pointer", fontFamily:"inherit" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <span style={{ fontSize:"0.85rem" }}>✨</span>
          <span style={{ fontSize:"0.78rem", fontWeight:600, color:C.purple }}>Gợi ý từ theo chủ đề</span>
        </div>
        <span style={{ fontSize:"0.8rem", color:C.gray }}>{open?"▲":"▼"}</span>
      </button>
      {open && (
        <div style={{ padding:"0.75rem 0.9rem", borderTop:`1px solid ${C.border}`, display:"flex", flexDirection:"column", gap:"0.6rem" }}>
          <div style={{ display:"flex", gap:"0.5rem" }}>
            <input value={topic} onChange={e=>setTopic(e.target.value)} onKeyDown={e=>e.key==="Enter"&&generate()}
              placeholder="Chủ đề (vd: nghề nghiệp, đồ ăn, du lịch...)"
              style={{ flex:1, border:`1.5px solid ${C.border}`, borderRadius:8, padding:"0.42rem 0.65rem", fontSize:"0.8rem", fontFamily:"inherit", outline:"none", color:C.ink }} />
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
            <span style={{ fontSize:"0.72rem", color:C.gray, whiteSpace:"nowrap" }}>Số từ:</span>
            <input type="range" min={5} max={30} value={count} onChange={e=>setCount(Number(e.target.value))}
              style={{ flex:1, accentColor:C.purple }} />
            <span style={{ fontFamily:"Georgia,serif", fontSize:"0.95rem", color:C.purple, fontWeight:600, minWidth:24 }}>{count}</span>
          </div>
          {err && <div style={{ fontSize:"0.72rem", color:C.red }}>{err}</div>}
          <button onClick={generate} disabled={loading}
            style={{ padding:"0.5rem", background:loading?C.gray:C.purple, color:C.white, border:"none", borderRadius:8, fontSize:"0.82rem", cursor:loading?"not-allowed":"pointer", fontFamily:"Georgia,serif" }}>
            {loading?"Đang tạo...":"Tạo từ vựng ✦"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Édito A1 Presets ────────────────────────────────────────
const EDITO_UNITS = [
  {
    id: "u0", num: "0", title: "Bienvenue !", theme: "Premiers contacts & classe",
    words: `bonjour — xin chào
bonsoir — chào buổi tối
salut — chào (thân mật)
au revoir — tạm biệt
à bientôt — hẹn gặp lại
à demain — hẹn ngày mai
ciao — tạm biệt (thân mật)
merci — cảm ơn
s'il vous plaît — làm ơn (lịch sự)
s'il te plaît — làm ơn (thân mật)
pardon — xin lỗi
excusez-moi — xin lỗi (lịch sự)
oui — có / vâng
non — không
ça va ? — bạn khỏe không?
ça va ! — khỏe!
très bien — rất tốt
bonne journée — chúc một ngày tốt lành
je ne comprends pas — tôi không hiểu
comment on dit… en français ? — người ta nói… bằng tiếng Pháp thế nào?
comment ça s'écrit ? — viết thế nào?
vous pouvez répéter ? — bạn có thể nhắc lại không?
je suis en retard — tôi đến muộn
je m'appelle — tôi tên là
et toi ? — còn bạn?
et vous ? — còn bạn? (lịch sự)
madame — bà / cô
monsieur — ông / thầy
lundi — thứ Hai
mardi — thứ Ba
mercredi — thứ Tư
jeudi — thứ Năm
vendredi — thứ Sáu
samedi — thứ Bảy
dimanche — Chủ Nhật
janvier — tháng Một
février — tháng Hai
mars — tháng Ba
avril — tháng Tư
mai — tháng Năm
juin — tháng Sáu
juillet — tháng Bảy
août — tháng Tám
septembre — tháng Chín
octobre — tháng Mười
novembre — tháng Mười Một
décembre — tháng Mười Hai
zéro — không
un — một
deux — hai
trois — ba
quatre — bốn
cinq — năm
six — sáu
sept — bảy
huit — tám
neuf — chín
dix — mười
onze — mười một
douze — mười hai
treize — mười ba
quatorze — mười bốn
quinze — mười lăm
seize — mười sáu
vingt — hai mươi
trente — ba mươi`
  },
  {
    id: "u1", num: "1", title: "Je suis…", theme: "Se présenter, nationalités, identité, nombres",
    words: `le nom — họ
le prénom — tên
la nationalité — quốc tịch
la date de naissance — ngày sinh
le lieu de naissance — nơi sinh
l'adresse mail — địa chỉ email
le compte Instagram — tài khoản Instagram
le numéro de téléphone — số điện thoại
le pays — đất nước
la ville — thành phố
s'appeler — tên là
habiter — sống / ở
parler — nói
avoir — có
être — là
j'ai … ans — tôi … tuổi
né(e) à — sinh tại (thành phố)
né(e) en — sinh tại (nước)
français(e) — người Pháp
allemand(e) — người Đức
espagnol(e) — người Tây Ban Nha
italien(ne) — người Ý
chinois(e) — người Trung Quốc
vietnamien(ne) — người Việt Nam
américain(e) — người Mỹ
japonais(e) — người Nhật
hollandais(e) — người Hà Lan
belge — người Bỉ
suisse — người Thụy Sĩ
russe — người Nga
coréen(ne) — người Hàn Quốc
marocain(e) — người Maroc
sénégalais(e) — người Sénégal
brésilien(ne) — người Brazil
algérien(ne) — người Algeria
tunisien(ne) — người Tunisia
mexicain(e) — người Mexico
argentin(e) — người Argentina
colombien(ne) — người Colombia
canadien(ne) — người Canada
polonais(e) — người Ba Lan
camerounais(e) — người Cameroon
indien(ne) — người Ấn Độ
tchèque — người Séc
l'art — nghệ thuật
le cinéma — điện ảnh
les langues — các ngôn ngữ
la musique — âm nhạc
le sport — thể thao
les loisirs — sở thích / thú vui
la bande dessinée — truyện tranh
le covoiturage — đi chung xe
trente-deux — ba mươi hai
quarante — bốn mươi
cinquante — năm mươi
soixante — sáu mươi
soixante-dix — bảy mươi
quatre-vingts — tám mươi
quatre-vingt-dix — chín mươi
cent — một trăm`
  },
  {
    id: "u2", num: "2", title: "Près de moi", theme: "Logement, famille, loisirs, professions",
    words: `l'appartement — căn hộ
la maison — ngôi nhà
le quartier — khu phố
la rue — con đường / phố
le centre-ville — trung tâm thành phố
la banlieue — vùng ngoại ô
la mer — biển
la plage — bãi biển
le jardin — vườn / công viên nhỏ
l'université — trường đại học
habiter — sống / ở
aimer — yêu thích
détester — ghét
adorer — rất yêu thích
préférer — thích hơn
la famille — gia đình
les parents — bố mẹ
le père — bố
la mère — mẹ
le frère — anh/em trai
la sœur — chị/em gái
les enfants — con cái
le mari — chồng
la femme — vợ
les grands-parents — ông bà
le grand-père — ông
la grand-mère — bà
l'oncle — chú/bác/cậu
la tante — dì/cô/bác gái
le cousin, la cousine — anh/chị/em họ
le neveu — cháu trai
la nièce — cháu gái
marié(e) — đã kết hôn
célibataire — độc thân
divorcé(e) — đã ly hôn
la situation familiale — tình trạng hôn nhân
la guitare — đàn guitar
le piano — đàn piano
la batterie — trống
l'instrument — nhạc cụ
le festival — lễ hội
le film — bộ phim
la danse, danser — khiêu vũ
la marche, marcher — đi bộ
la natation, nager — bơi lội
le ski, skier — trượt tuyết
la profession — nghề nghiệp
étudiant(e) — sinh viên
médecin — bác sĩ
professeur — giáo viên
acteur, actrice — diễn viên
chanteur, chanteuse — ca sĩ
infirmier, infirmière — y tá
architecte — kiến trúc sư
sympa — dễ mến / thân thiện
dynamique — năng động
calme — điềm tĩnh
les adjectifs possessifs — tính từ sở hữu
mon, ma, mes — của tôi
ton, ta, tes — của bạn
son, sa, ses — của anh/cô ấy`
  },
  {
    id: "u3", num: "3", title: "Qu'est-ce qu'on mange ?", theme: "Alimentation, commerces, restaurant",
    words: `la boulangerie — tiệm bánh mì
le boulanger, la boulangère — thợ làm bánh
la boucherie — tiệm thịt
le boucher, la bouchère — người bán thịt
l'épicerie — tiệm tạp hóa
l'épicier, l'épicière — người bán tạp hóa
la fromagerie — tiệm phô mai
le fromager, la fromagère — người bán phô mai
la poissonnerie — tiệm cá
le poissonnier, la poissonnière — người bán cá
le marché — chợ
le supermarché — siêu thị
la baguette — bánh mì que
le croissant — bánh sừng bò
le fromage — phô mai
le fromage de chèvre — phô mai dê
le beurre — bơ
la crème — kem tươi
le yaourt — sữa chua
les pâtes — mì ống
le riz — gạo / cơm
la farine — bột mì
l'huile d'olive — dầu ô liu
l'œuf — quả trứng
la pomme — táo
la tomate — cà chua
la fraise — dâu tây
la cerise — cherry
la pêche — đào
l'abricot — mơ
la courgette — bí xanh
les haricots verts — đậu cô ve
le poivron — ớt chuông
la pomme de terre — khoai tây
la salade — rau xà lách
le poulet — thịt gà
le poisson — cá
la viande — thịt
un kilo de — một kilô
une bouteille de — một chai
un paquet de — một gói
une boîte de — một hộp
un pot de — một lọ
un panier de — một giỏ
un peu de — một chút
beaucoup de — nhiều
pas de — không có
la carte bancaire — thẻ ngân hàng
les espèces — tiền mặt
payer — thanh toán
acheter — mua
Je voudrais — Tôi muốn
Combien ça coûte ? — Bao nhiêu tiền?
C'est à qui ? — Đến lượt ai?
Vous payez comment ? — Bạn thanh toán bằng gì?
commander — gọi món
l'addition — hóa đơn
le menu / la carte — thực đơn
le plat du jour — món trong ngày
l'entrée — món khai vị
le plat — món chính
le dessert — món tráng miệng
le sel — muối
le poivre — tiêu
le sucre — đường
le café — cà phê
le thé — trà
le jus de fruits — nước ép trái cây
l'eau — nước
le soda — nước ngọt có ga
la glace — kem
le gâteau — bánh ngọt
la tarte — bánh tart
l'omelette — trứng tráng
le steak-frites — bít tết kèm khoai tây chiên
choisir — chọn
finir — kết thúc / ăn hết`
  },
  {
    id: "u4", num: "4", title: "C'est où ?", theme: "Ville, lieux, transports, itinéraire, nombres",
    words: `l'avenue — đại lộ
le boulevard — đại lộ lớn
la place — quảng trường
le pont — cầu
le quai — bờ kè / bến tàu
la rue — con phố
le fleuve — sông lớn
le centre-ville — trung tâm thành phố
le quartier — khu phố
la banlieue — ngoại ô
les habitants — cư dân
les touristes — du khách
la banque — ngân hàng
le bâtiment — tòa nhà
la bibliothèque — thư viện
le commissariat — đồn cảnh sát
l'école — trường học
l'église — nhà thờ
la fontaine — đài phun nước
la gare — nhà ga
le jardin — vườn hoa
la mairie — tòa thị chính
le musée — bảo tàng
le parc — công viên
la poste — bưu điện
le théâtre — nhà hát
à pied — đi bộ
à vélo — đi xe đạp
à trottinette — đi xe trượt
en bus — bằng xe buýt
en métro — bằng tàu điện ngầm
en tramway — bằng xe điện
en voiture — bằng ô tô
en train — bằng tàu hỏa
le covoiturage — đi chung xe
les transports en commun — giao thông công cộng
l'arrêt — bến / trạm dừng
la carte de transport — thẻ giao thông
l'itinéraire — lộ trình
la ligne — tuyến đường
la station — ga / bến
le ticket — vé
prendre — đi / bắt (phương tiện)
tourner à gauche — rẽ trái
tourner à droite — rẽ phải
aller tout droit — đi thẳng
traverser — băng qua
continuer — tiếp tục
jamais — không bao giờ
souvent — thường xuyên
toujours — luôn luôn
pour — để / cho
parce que — bởi vì
mais — nhưng
avec — với
sans — không có
cent — một trăm
deux cents — hai trăm
mille — một nghìn
un million — một triệu
un milliard — một tỷ`
  },
  {
    id: "u5", num: "5", title: "C'est tendance !", theme: "Vêtements, couleurs, matières, météo, objets",
    words: `la chemise — áo sơ mi
le costume — bộ vest
le gilet — áo gile
l'imperméable — áo mưa
la jupe — chân váy
le manteau — áo khoác dài
le pantalon — quần dài
le jean — quần jeans
le pull — áo len
la robe — váy đầm
le short — quần short
le tee-shirt — áo thun
la veste — áo vest / áo khoác ngắn
les bijoux — đồ trang sức
la ceinture — thắt lưng
le chapeau — mũ
les chaussures — giày dép
la cravate — cà vạt
les lunettes de soleil — kính mát
le parapluie — ô / dù
blanc(he) — trắng
bleu(e) — xanh dương
gris(e) — xám
jaune — vàng
marron — nâu
noir(e) — đen
rose — hồng
rouge — đỏ
vert(e) — xanh lá
en coton — bằng vải cotton
en cuir — bằng da
en jean — bằng vải denim
en laine — bằng len
la taille — kích cỡ / số đo
la pointure — cỡ giày
la météo — thời tiết
le degré — độ (nhiệt độ)
la pluie — mưa
la neige — tuyết
le soleil — mặt trời / nắng
il fait chaud — trời nóng
il fait froid — trời lạnh
il pleut — trời mưa
il neige — trời có tuyết
le téléphone portable — điện thoại di động
l'ordinateur portable — máy tính xách tay
les écouteurs sans fil — tai nghe không dây
l'enceinte Bluetooth — loa Bluetooth
la montre connectée — đồng hồ thông minh
la tablette — máy tính bảng
le sac à dos — ba lô
le sac de sport — túi thể thao
la valise — vali
le porte-monnaie — ví tiền
le portefeuille — ví da
le cadre photo — khung ảnh
le porte-clés — móc chìa khóa
carré(e) — hình vuông
rond(e) — hình tròn
léger / légère — nhẹ
lourd(e) — nặng
vendre — bán
mettre — mặc / đặt
venir — đến`
  },
  {
    id: "u6", num: "6", title: "Qu'est-ce qu'on fait aujourd'hui ?", theme: "Routine, heure, sorties, description",
    words: `se brosser les dents — đánh răng
se coiffer — chải tóc
se coucher — đi ngủ
se doucher — tắm vòi
s'habiller — mặc quần áo
se lever — thức dậy
se maquiller — trang điểm
s'occuper des enfants — chăm sóc trẻ em
se préparer — chuẩn bị
se raser — cạo râu
se réveiller — thức dậy
prendre son petit déjeuner — ăn sáng
faire du bricolage — làm đồ thủ công
faire les courses — đi mua sắm
faire la cuisine — nấu ăn
faire du jardinage — làm vườn
faire une lessive — giặt đồ
faire le ménage — dọn dẹp nhà cửa
faire la vaisselle — rửa bát
aller à un concert — đi xem hòa nhạc
aller au théâtre — đi xem kịch
écouter de la musique — nghe nhạc
écouter la radio — nghe đài
faire du jogging — chạy bộ
faire du sport — tập thể thao
jouer à un jeu vidéo — chơi trò chơi điện tử
regarder la télévision — xem tivi
se promener — đi dạo
surfer sur Internet — lướt internet
voir des amis — gặp bạn bè
neuf heures — chín giờ
neuf heures cinq — chín giờ năm phút
neuf heures et quart — chín giờ mười lăm
neuf heures et demie — chín giờ rưỡi
dix heures moins le quart — mười giờ kém mười lăm
midi — buổi trưa / 12 giờ
minuit — nửa đêm
le matin — buổi sáng
l'après-midi — buổi chiều
le soir — buổi tối
parfois — đôi khi
rarement — hiếm khi
tous les jours — mỗi ngày
grand(e) — cao / to
petit(e) — nhỏ / thấp
gros(se) — béo
mince — gầy
la barbe — râu
la moustache — ria mép
les yeux bleus — mắt xanh
les yeux verts — mắt xanh lá
les yeux marron — mắt nâu
les cheveux blonds — tóc vàng
les cheveux bruns — tóc nâu
les cheveux roux — tóc đỏ
les cheveux courts — tóc ngắn
les cheveux longs — tóc dài
les cheveux frisés — tóc xoăn
les cheveux raides — tóc thẳng
être chauve — hói đầu
bavard(e) — hay nói
courageux / courageuse — dũng cảm
drôle — hài hước
dynamique — năng động
généreux / généreuse — hào phóng
pouvoir — có thể
vouloir — muốn
partir — rời đi
sortir — ra ngoài
dormir — ngủ
le passé récent — vừa mới (venir de + inf.)`
  },
  {
    id: "u7", num: "7", title: "Chez moi !", theme: "Logement, meubles, électroménager, règles",
    words: `l'appartement — căn hộ
la maison — ngôi nhà
déménager — dọn nhà
l'étage — tầng lầu
le rez-de-chaussée — tầng trệt
la fenêtre — cửa sổ
le jardin — vườn
la surface — diện tích
la terrasse — sân thượng / hiên
la chambre — phòng ngủ
la cuisine — phòng bếp
la salle à manger — phòng ăn
la salle de bains — phòng tắm
le salon — phòng khách
les toilettes — nhà vệ sinh
la pièce — căn phòng
l'armoire — tủ quần áo
le bureau — bàn làm việc
le canapé — ghế sofa
la chaise — ghế
le fauteuil — ghế bành
le lit — cái giường
la table basse — bàn thấp
la cuisinière — bếp nấu
le four — lò nướng
le four à micro-ondes — lò vi sóng
le lave-linge — máy giặt
le réfrigérateur / le frigo — tủ lạnh
l'ascenseur — thang máy
le balcon — ban công
le couloir — hành lang
l'escalier — cầu thang
le hall — sảnh vào
le local à poubelles — phòng rác
le local à vélos — bãi xe đạp
la pelouse — bãi cỏ
la porte d'entrée — cửa chính
la résidence — tòa chung cư
le/la voisin(e) — người hàng xóm
la fuite d'eau — rò rỉ nước
fonctionner — hoạt động / chạy
louer — thuê
trouver — tìm / thấy
il est interdit de — bị cấm
il faut — phải / cần
le règlement — quy định / nội quy
s'excuser — xin lỗi
expliquer — giải thích
le problème — vấn đề / sự cố
connaître — biết / quen biết
le pronom COD — đại từ bổ ngữ trực tiếp
le/la/l'/les (pronom) — nó / chúng (đại từ)`
  },
  {
    id: "u8", num: "8", title: "En forme !", theme: "Corps, santé, sport, émotions",
    words: `la tête — đầu
le bras — cánh tay
le dos — lưng
le genou — đầu gối
la gorge — cổ họng
la jambe — chân
la main — bàn tay
le pied — bàn chân
le ventre — bụng
la bouche — miệng
la dent — răng
l'œil / les yeux — mắt
l'oreille — tai
le nez — mũi
mesurer — đo chiều cao
peser — cân nặng
le mètre — mét
le kilo — kilô
la fièvre — sốt
la grippe — bệnh cúm
le rhume — cảm lạnh
tousser — ho
la toux — tiếng ho
malade — bệnh / ốm
l'hôpital — bệnh viện
la pharmacie — nhà thuốc
le médecin / le docteur — bác sĩ
le dentiste — nha sĩ
le pharmacien, la pharmacienne — dược sĩ
le médicament — thuốc
le paracétamol — paracetamol
le sirop — thuốc siro
la radio — phim X-quang
la vitamine C — vitamin C
la visite à domicile — khám tại nhà
l'activité physique — hoạt động thể chất
l'appareil de sport — dụng cụ thể thao
le certificat médical — giấy chứng nhận y tế
le coach — huấn luyện viên
la douche — vòi tắm
le maillot de bain — đồ bơi
le sauna — phòng tắm hơi
la serviette de bain — khăn tắm
le vestiaire — phòng thay đồ
l'alimentation saine — chế độ ăn lành mạnh
la calorie — calo
la corde à sauter — dây nhảy
la course à pied — chạy bộ
la gymnastique — thể dục
le judo — võ judo
la marche rapide — đi bộ nhanh
la musculation — tập tạ / gym
la natation — bơi lội
le rugby — bóng bầu dục
content(e) — vui / hài lòng
triste — buồn
fatigué(e) — mệt mỏi
stressé(e) — căng thẳng
heureux / heureuse — hạnh phúc
boire — uống
devoir — phải / cần phải
le conseil — lời khuyên
être d'accord — đồng ý
ne pas être d'accord — không đồng ý`
  },
  {
    id: "u9", num: "9", title: "Bonnes vacances !", theme: "Voyages, hébergement, nature, animaux",
    words: `la campagne — vùng quê
l'île — hòn đảo
la mer — biển
la montagne — núi
la plage — bãi biển
le village — làng
le camping — trại cắm trại
la chambre d'hôtes — nhà nghỉ tư gia
l'échange de maison — trao đổi nhà ở
la ferme — nông trại
l'hôtel — khách sạn
la location — nhà cho thuê
la tente — lều trại
l'arrivée — lúc đến
le départ — lúc khởi hành
la chambre simple — phòng đơn
la chambre double — phòng đôi
le parking — bãi đỗ xe
le petit déjeuner compris — bao gồm bữa sáng
réserver — đặt chỗ / đặt phòng
le champ — cánh đồng
le chemin — đường mòn
la forêt — rừng
le lac — hồ
la rivière — sông nhỏ
l'arbre — cái cây
la fleur — bông hoa
l'herbe — cỏ
la plante — cây cối
le canard — con vịt
le chat — con mèo
le cheval — con ngựa
le chien — con chó
le lapin — con thỏ
l'oiseau — con chim
le poisson — cá
la poule — con gà mái
la vache — con bò
faire du bateau — đi thuyền
faire de la plongée — lặn biển
pique-niquer — đi dã ngoại
le train — tàu hỏa
l'avion — máy bay
beau / belle — đẹp
magnifique — tuyệt đẹp
plus … que — hơn … (so sánh hơn)
aussi … que — cũng … như (so sánh ngang bằng)
la carte postale — bư�i thiếp
c'était — đó là (quá khứ)
il y avait — có (quá khứ)
il faisait beau — trời đẹp (quá khứ)
la destination — điểm đến
l'hébergement — chỗ ở
le moyen de transport — phương tiện di chuyển`
  },
  {
    id: "u10", num: "10", title: "Au travail !", theme: "Études, campus, vie professionnelle",
    words: `l'amphithéâtre / l'amphi — giảng đường lớn
la bibliothèque — thư viện
le logement étudiant — ký túc xá
le restaurant universitaire — căng tin đại học
la salle de cours — phòng học
le secrétariat — phòng hành chính
l'université — trường đại học
le cours — buổi học / môn học
le diplôme — bằng cấp
la licence — bằng cử nhân
l'enseignant(e) — giảng viên
le/la professeur(e) — thầy/cô giáo
les études — việc học
l'étudiant(e) — sinh viên
étudier — học
faire des études — theo học đại học
s'inscrire — đăng ký nhập học
la formation — khóa đào tạo
la note — điểm số
le commerce — thương mại
le droit — luật
l'économie — kinh tế
l'informatique — tin học
les langues — ngôn ngữ
les lettres — văn học
les mathématiques — toán học
les sciences — khoa học
le bureau — văn phòng
le contrat — hợp đồng
les horaires — giờ giấc làm việc
la machine à café — máy pha cà phê
la pause-déjeuner — giờ nghỉ trưa
le poste — vị trí / chức vụ
le restaurant d'entreprise — nhà ăn công ty
le salaire — lương
le télétravail — làm việc từ xa
l'agriculteur, l'agricultrice — nông dân
l'artiste — nghệ sĩ
le/la journaliste — nhà báo
le/la libraire — người bán sách
le/la photographe — nhiếp ảnh gia
le policier, la policière — cảnh sát
le chauffeur — tài xế
le comédien, la comédienne — diễn viên
le danseur, la danseuse — vũ công
communiquer — giao tiếp
écrire un mail — viết email
lire un rapport — đọc báo cáo
s'organiser — tổ chức công việc
préparer une réunion — chuẩn bị cuộc họp
travailler sur un dossier — làm hồ sơ
le mail / le courriel — email
l'ordinateur portable — máy tính xách tay
le smartphone — điện thoại thông minh
la visioconférence — họp trực tuyến
chercher un emploi — tìm việc làm
travailler — làm việc
les compétences — kỹ năng
le projet professionnel — dự án nghề nghiệp
la durée — thời gian / khoảng thời gian`
  },
];


export function EditoPresets({ onLoad }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background:C.white, border:`1.5px solid ${C.gold}55`, borderRadius:12, overflow:"hidden" }}>
      <button onClick={()=>setOpen(o=>!o)}
        style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0.65rem 0.9rem", background:"transparent", border:"none", cursor:"pointer", fontFamily:"inherit" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <span style={{ fontSize:"0.85rem" }}>📘</span>
          <div style={{ textAlign:"left" }}>
            <div style={{ fontSize:"0.78rem", fontWeight:600, color:C.gold }}>Édito A1 — Từ vựng theo bài</div>
            <div style={{ fontSize:"0.65rem", color:C.gray }}>10 unités · nhấn 1 cái load ngay</div>
          </div>
        </div>
        <span style={{ fontSize:"0.8rem", color:C.gray }}>{open?"▲":"▼"}</span>
      </button>
      {open && (
        <div style={{ borderTop:`1px solid ${C.border}`, padding:"0.6rem" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.4rem" }}>
            {EDITO_UNITS.map(u => (
              <button key={u.id} onClick={()=>{ onLoad(u); setOpen(false); }}
                style={{ background:C.cream, border:`1px solid ${C.border}`, borderRadius:8, padding:"0.55rem 0.6rem", textAlign:"left", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.background=C.purpleL}
                onMouseLeave={e=>e.currentTarget.style.background=C.cream}>
                <div style={{ display:"flex", gap:"0.35rem", alignItems:"center" }}>
                  <span style={{ background:C.gold, color:C.ink, fontSize:"0.58rem", fontWeight:700, borderRadius:20, padding:"0.1rem 0.38rem", whiteSpace:"nowrap" }}>U{u.num}</span>
                  <div>
                    <div style={{ fontSize:"0.75rem", fontWeight:600, color:C.ink, lineHeight:1.2 }}>{u.title}</div>
                    <div style={{ fontSize:"0.62rem", color:C.gray, marginTop:"0.08rem" }}>{u.words.split("\n").length} từ</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
