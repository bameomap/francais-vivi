import { useState } from "react";
import { C } from "../constants.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";

// ── Data ────────────────────────────────────────────────────────────────────

const ALPHABET = [
  { l:"A", ipa:"a",         ex:"ami",       vi:"bạn bè"     },
  { l:"B", ipa:"bé",        ex:"beau",      vi:"đẹp"        },
  { l:"C", ipa:"cé",        ex:"chat",      vi:"mèo"        },
  { l:"D", ipa:"dé",        ex:"doux",      vi:"dịu dàng"   },
  { l:"E", ipa:"e",         ex:"été",       vi:"mùa hè"     },
  { l:"F", ipa:"effe",      ex:"fleur",     vi:"hoa"        },
  { l:"G", ipa:"gé",        ex:"garçon",    vi:"cậu bé"     },
  { l:"H", ipa:"ache",      ex:"heure",     vi:"giờ"        },
  { l:"I", ipa:"i",         ex:"île",       vi:"hòn đảo"    },
  { l:"J", ipa:"ji",        ex:"jour",      vi:"ngày"       },
  { l:"K", ipa:"ka",        ex:"kilo",      vi:"ki-lô"      },
  { l:"L", ipa:"elle",      ex:"livre",     vi:"sách"       },
  { l:"M", ipa:"emme",      ex:"mer",       vi:"biển"       },
  { l:"N", ipa:"enne",      ex:"nuit",      vi:"đêm"        },
  { l:"O", ipa:"o",         ex:"oiseau",    vi:"chim"       },
  { l:"P", ipa:"pé",        ex:"pain",      vi:"bánh mì"    },
  { l:"Q", ipa:"ku",        ex:"quatre",    vi:"bốn"        },
  { l:"R", ipa:"erre",      ex:"rue",       vi:"con phố"    },
  { l:"S", ipa:"esse",      ex:"soleil",    vi:"mặt trời"   },
  { l:"T", ipa:"té",        ex:"terre",     vi:"đất"        },
  { l:"U", ipa:"u",         ex:"un",        vi:"một"        },
  { l:"V", ipa:"vé",        ex:"ville",     vi:"thành phố"  },
  { l:"W", ipa:"double vé", ex:"wagon",     vi:"toa xe"     },
  { l:"X", ipa:"iks",       ex:"xylophone", vi:"đàn gỗ"     },
  { l:"Y", ipa:"i grec",    ex:"yaourt",    vi:"sữa chua"   },
  { l:"Z", ipa:"zède",      ex:"zéro",      vi:"số không"   },
];

const PRONUNC_RULES = [
  // Nguyên âm kép
  { cat:"🔵 Nguyên âm kép", pattern:"ai, ei",         reads:"ê [ɛ]",   examples:["lait","neige","baleine"],    tip:'Đọc như "ê" mở — miệng hé' },
  { cat:"🔵 Nguyên âm kép", pattern:"au, eau",         reads:"ô [o]",   examples:["eau","beau","bateau"],       tip:'Luôn đọc là "ô" — không bao giờ đọc "au"' },
  { cat:"🔵 Nguyên âm kép", pattern:"ou",              reads:"u [u]",   examples:["loup","tour","vous"],        tip:'Đọc như "u" tiếng Việt, môi tròn chụm' },
  { cat:"🔵 Nguyên âm kép", pattern:"oi",              reads:"oa [wa]", examples:["moi","noir","voix"],         tip:'Đọc như "oa" — "w" + "a"' },
  { cat:"🔵 Nguyên âm kép", pattern:"eu, œu",          reads:"ơ [ø]",   examples:["feu","bleu","sœur"],         tip:'Môi tròn như "u" nhưng đọc "ê" — gần với "ơ" tiếng Việt' },
  { cat:"🔵 Nguyên âm kép", pattern:"é",               reads:"ê [e]",   examples:["café","été","bébé"],         tip:'Đọc "ê" rõ, miệng hơi mỉm — khác với è' },
  { cat:"🔵 Nguyên âm kép", pattern:"è, ê",            reads:"ê mở [ɛ]",examples:["mère","fête","après"],       tip:'"Ê" mở hơn é — hàm dưới hơi xuống' },
  // Nguyên âm mũi
  { cat:"👃 Nguyên âm mũi", pattern:"an, en, am, em",  reads:"ân [ɑ̃]",  examples:["dans","vent","temps","jambe"],tip:'Đọc "an" nhưng âm đi vào mũi, không bật n cuối' },
  { cat:"👃 Nguyên âm mũi", pattern:"in, im, ain, ein, un", reads:"in [ɛ̃]", examples:["vin","main","pain","brun"],tip:'"In" mũi — miệng mỉm, âm vào mũi, không đọc n cuối' },
  { cat:"👃 Nguyên âm mũi", pattern:"on, om",          reads:"ôn [ɔ̃]",  examples:["bon","ombre","maison"],      tip:'"On" mũi — môi tròn, âm vào mũi, không đọc n cuối' },
  // Phụ âm đặc biệt
  { cat:"🟢 Phụ âm",        pattern:"ch",              reads:"sh [ʃ]",  examples:["chat","chocolat","chose"],   tip:'Đọc như "sh" tiếng Anh hoặc "x" tiếng Việt (xì)' },
  { cat:"🟢 Phụ âm",        pattern:"gn",              reads:"nh [ɲ]",  examples:["montagne","gagner","ligne"], tip:'Đọc như "nh" tiếng Việt — đầu lưỡi chạm vòm miệng' },
  { cat:"🟢 Phụ âm",        pattern:"qu",              reads:"k [k]",   examples:["qui","que","quatre"],        tip:'"u" sau q luôn câm, chỉ đọc "k"' },
  { cat:"🟢 Phụ âm",        pattern:"ph",              reads:"f [f]",   examples:["photo","téléphone","phare"], tip:'Đọc như "f" — không đọc "p" + "h" riêng' },
  { cat:"🟢 Phụ âm",        pattern:"c + e / i / y",   reads:"s [s]",   examples:["ceci","ciel","cycle"],       tip:'C trước e, i, y → đọc "s" (như cédille ç)' },
  { cat:"🟢 Phụ âm",        pattern:"g + e / i / y",   reads:"j [ʒ]",   examples:["gel","girafe","gym"],        tip:'G trước e, i, y → đọc như "j" (zh tiếng Việt)' },
  { cat:"🟢 Phụ âm",        pattern:"ç",               reads:"s [s]",   examples:["français","garçon","ça"],    tip:'Cedille = luôn đọc "s", dù trước a, o, u' },
  { cat:"🟢 Phụ âm",        pattern:"r",               reads:"[ʁ]",     examples:["rue","rouge","merci"],       tip:'"R" Pháp: rung cuống họng — không phải đầu lưỡi như tiếng Việt' },
];

const LIAISONS = [
  { trigger:"les / des / mes + nguyên âm", example:"les amis",        pronunc:"lé‿zami",          note:"s cuối đọc thành z" },
  { trigger:"un + nguyên âm",              example:"un ami",           pronunc:"un‿nami",           note:"n nối sang từ sau" },
  { trigger:"vous / nous / ils + nguyên âm",example:"vous avez",      pronunc:"vou‿zavé",          note:"s cuối đọc thành z" },
  { trigger:"en + nguyên âm",              example:"en avion",         pronunc:"en‿navion",         note:"n nối" },
  { trigger:"est / sont + nguyên âm",      example:"il est arrivé",    pronunc:"il‿è‿tarivé",       note:"t cuối của est đọc lên" },
  { trigger:"mon / ton / son + nguyên âm", example:"mon ami",          pronunc:"mo‿nami",           note:"n nối" },
  { trigger:"grand + nguyên âm",           example:"un grand arbre",   pronunc:"un gran‿tarbre",    note:"d trong liaison đọc thành t" },
  { trigger:"Không bao giờ nối âm sau:",   example:"et, un, huit, onze","pronunc":"—",             note:'et (và) không bao giờ nối; un / huit / onze: h aspiré, không nối' },
];

const SILENT_LETTERS = [
  { pattern:"Phụ âm cuối s, t, d, x, z", examples:["bras","petit","grand","voix","nez"],   note:"Thường câm — trừ khi có liaison hoặc từ ngoại lệ" },
  { pattern:"E cuối từ",                  examples:["table","rouge","livre","femme"],        note:"E muet — câm nhưng ảnh hưởng cách đọc phụ âm trước" },
  { pattern:"H",                          examples:["heure","homme","hôtel","heureux"],      note:'Hầu hết câm; "h aspiré" (héros, hibou) không cho liaison' },
  { pattern:"P cuối trong -mp, -ps",      examples:["camp","temps","champs"],                note:"p câm: beaucoup / trop — ngoại lệ: cap" },
];

const NUMBERS = [
  [0,"zéro"],[1,"un / une"],[2,"deux"],[3,"trois"],[4,"quatre"],[5,"cinq"],
  [6,"six"],[7,"sept"],[8,"huit"],[9,"neuf"],[10,"dix"],
  [11,"onze"],[12,"douze"],[13,"treize"],[14,"quatorze"],[15,"quinze"],
  [16,"seize"],[17,"dix-sept"],[18,"dix-huit"],[19,"dix-neuf"],[20,"vingt"],
  [21,"vingt et un"],[22,"vingt-deux"],[30,"trente"],[40,"quarante"],
  [50,"cinquante"],[60,"soixante"],[70,"soixante-dix"],[71,"soixante et onze"],
  [80,"quatre-vingts"],[81,"quatre-vingt-un"],[90,"quatre-vingt-dix"],
  [91,"quatre-vingt-onze"],[100,"cent"],[1000,"mille"],
];

const ORDINALS = [
  [1,"premier (m) / première (f)","1er / 1re"],
  [2,"deuxième","2e"],[3,"troisième","3e"],[4,"quatrième","4e"],
  [5,"cinquième","5e"],[6,"sixième","6e"],[7,"septième","7e"],
  [8,"huitième","8e"],[9,"neuvième","9e"],[10,"dixième","10e"],
  [20,"vingtième","20e"],[100,"centième","100e"],
];

const NUMBER_TIPS = [
  "70 = 60+10 (soixante-dix), không phải septante (trừ Bỉ & Thụy Sĩ)",
  "80 = 4×20 (quatre-vingts) — có s khi đứng một mình, không có s khi có số sau",
  "21, 31, 41, 51, 61, 71 dùng \"et un\" — các số khác không dùng \"et\"",
  "\"Un\" có 2 giống: un (đực) / une (cái) — số từ 2 trở đi không đổi",
];

const JOURS = [
  { fr:"lundi",    vi:"Thứ Hai",    abbr:"lun." },
  { fr:"mardi",    vi:"Thứ Ba",     abbr:"mar." },
  { fr:"mercredi", vi:"Thứ Tư",     abbr:"mer." },
  { fr:"jeudi",    vi:"Thứ Năm",    abbr:"jeu." },
  { fr:"vendredi", vi:"Thứ Sáu",    abbr:"ven." },
  { fr:"samedi",   vi:"Thứ Bảy",    abbr:"sam." },
  { fr:"dimanche", vi:"Chủ Nhật",   abbr:"dim." },
];

const MOIS = [
  { fr:"janvier",   vi:"Tháng 1",  n:1  },{ fr:"février",   vi:"Tháng 2",  n:2  },
  { fr:"mars",      vi:"Tháng 3",  n:3  },{ fr:"avril",     vi:"Tháng 4",  n:4  },
  { fr:"mai",       vi:"Tháng 5",  n:5  },{ fr:"juin",      vi:"Tháng 6",  n:6  },
  { fr:"juillet",   vi:"Tháng 7",  n:7  },{ fr:"août",      vi:"Tháng 8",  n:8  },
  { fr:"septembre", vi:"Tháng 9",  n:9  },{ fr:"octobre",   vi:"Tháng 10", n:10 },
  { fr:"novembre",  vi:"Tháng 11", n:11 },{ fr:"décembre",  vi:"Tháng 12", n:12 },
];

const DATE_PATTERNS = [
  { label:"Hỏi ngày",     fr:"Quelle est la date aujourd'hui ?",           vi:"Hôm nay là ngày mấy?" },
  { label:"Trả lời",      fr:"Aujourd'hui, c'est le 19 mai 2026.",         vi:"Hôm nay là 19 tháng 5, 2026." },
  { label:"Ngày sinh",    fr:"Je suis né(e) le 3 mars 2000.",              vi:"Tôi sinh ngày 3 tháng 3 năm 2000." },
  { label:"Hỏi thứ",      fr:"C'est quel jour aujourd'hui ?",              vi:"Hôm nay là thứ mấy?" },
  { label:"Thứ + ngày",   fr:"C'est lundi, le 19 mai.",                    vi:"Hôm nay là thứ Hai, 19 tháng 5." },
  { label:"Trong tương lai", fr:"Le cours est vendredi prochain.",         vi:"Buổi học là thứ Sáu tuần tới." },
];

const HEURES = [
  { time:"00:00", fr:"Il est minuit.",                         vi:"Nửa đêm" },
  { time:"01:00", fr:"Il est une heure du matin.",             vi:"1 giờ sáng" },
  { time:"02:00", fr:"Il est deux heures.",                    vi:"2 giờ" },
  { time:"02:15", fr:"Il est deux heures et quart.",           vi:"2 giờ 15" },
  { time:"02:30", fr:"Il est deux heures et demie.",           vi:"2 giờ 30" },
  { time:"02:45", fr:"Il est trois heures moins le quart.",    vi:"2 giờ 45 (kém 15 đến 3 giờ)" },
  { time:"12:00", fr:"Il est midi.",                           vi:"12 giờ trưa" },
  { time:"13:00", fr:"Il est treize heures. / Une heure de l'après-midi.", vi:"1 giờ chiều" },
  { time:"20:00", fr:"Il est vingt heures. / Huit heures du soir.",        vi:"8 giờ tối" },
  { time:"?",     fr:"Quelle heure est-il ?",                  vi:"Bây giờ là mấy giờ?" },
  { time:"?",     fr:"À quelle heure ?",                       vi:"Lúc mấy giờ?" },
];

const HEURE_TIPS = [
  '"Et quart" = +15 phút, "et demie" = +30 phút',
  '"Moins le quart" = giờ sau − 15 phút (2h45 = "trois heures moins le quart")',
  "Giờ chính thức dùng 24h (treize heures); thông thường dùng 12h (une heure de l'après-midi)",
  '"Du matin" (sáng), "de l\'après-midi" (chiều), "du soir" (tối) dùng khi cần phân biệt',
];

const COULEURS = [
  { fr:"rouge",    fr_f:"rouge",    vi:"đỏ",          hex:"#E74C3C", textLight:true },
  { fr:"bleu",     fr_f:"bleue",    vi:"xanh dương",   hex:"#2980B9", textLight:true },
  { fr:"vert",     fr_f:"verte",    vi:"xanh lá",      hex:"#27AE60", textLight:true },
  { fr:"jaune",    fr_f:"jaune",    vi:"vàng",          hex:"#F1C40F", textLight:false },
  { fr:"orange",   fr_f:"orange",   vi:"cam",           hex:"#E67E22", textLight:true },
  { fr:"violet",   fr_f:"violette", vi:"tím",           hex:"#9B59B6", textLight:true },
  { fr:"rose",     fr_f:"rose",     vi:"hồng",          hex:"#FF6FAE", textLight:true },
  { fr:"noir",     fr_f:"noire",    vi:"đen",           hex:"#2C3E50", textLight:true },
  { fr:"blanc",    fr_f:"blanche",  vi:"trắng",         hex:"#F8F9FA", textLight:false },
  { fr:"gris",     fr_f:"grise",    vi:"xám",           hex:"#95A5A6", textLight:false },
  { fr:"marron",   fr_f:"marron",   vi:"nâu",           hex:"#795548", textLight:true },
  { fr:"beige",    fr_f:"beige",    vi:"be",            hex:"#E8D5B7", textLight:false },
];

const COULEUR_TIPS = [
  "Màu sắc là tính từ → chia theo giống và số của danh từ",
  "\"Marron\" và \"orange\" không đổi dạng (invariable): des chaussures marron",
  "Vị trí: tính từ màu thường đứng SAU danh từ — une robe rouge (không phải une rouge robe)",
  "Hỏi màu: \"De quelle couleur est… ?\" → \"Il/elle est…\"",
];

const SALUTATIONS = [
  // Chào
  { cat:"👋 Chào hỏi",     fr:"Bonjour",                   vi:"Xin chào (ban ngày)",       ctx:"Formal & informal, mọi lúc ban ngày" },
  { cat:"👋 Chào hỏi",     fr:"Bonsoir",                   vi:"Chào buổi tối",              ctx:"Từ khoảng 6–7 giờ tối trở đi" },
  { cat:"👋 Chào hỏi",     fr:"Salut",                     vi:"Chào (thân mật)",            ctx:"Informal, giữa bạn bè / người trẻ" },
  { cat:"👋 Chào hỏi",     fr:"Coucou !",                  vi:"Này ơi! / Hé!",              ctx:"Rất thân mật — nhắn tin, gặp bạn thân" },
  // Tạm biệt
  { cat:"🚪 Tạm biệt",     fr:"Au revoir",                 vi:"Tạm biệt",                   ctx:"Formal & informal, dùng mọi lúc" },
  { cat:"🚪 Tạm biệt",     fr:"À bientôt",                 vi:"Hẹn gặp lại sớm",           ctx:"Khi biết sẽ gặp nhau lại sớm" },
  { cat:"🚪 Tạm biệt",     fr:"À demain",                  vi:"Hẹn ngày mai",               ctx:"Khi hẹn gặp lại hôm sau" },
  { cat:"🚪 Tạm biệt",     fr:"À tout à l'heure",         vi:"Lát gặp lại",                ctx:"Sẽ gặp lại trong ngày, cùng ngày" },
  { cat:"🚪 Tạm biệt",     fr:"Bonne nuit",                vi:"Ngủ ngon",                   ctx:"Khi người kia sắp đi ngủ" },
  // Lịch sự
  { cat:"🎩 Lịch sự",      fr:"Merci",                     vi:"Cảm ơn",                     ctx:"Cảm ơn cơ bản" },
  { cat:"🎩 Lịch sự",      fr:"Merci beaucoup",            vi:"Cảm ơn rất nhiều",           ctx:"Cảm ơn chân thành hơn" },
  { cat:"🎩 Lịch sự",      fr:"De rien",                   vi:"Không có gì",                ctx:"Informal — trả lời merci" },
  { cat:"🎩 Lịch sự",      fr:"Je vous en prie",           vi:"Không có chi (formal)",      ctx:"Formal — trả lời merci" },
  { cat:"🎩 Lịch sự",      fr:"S'il vous plaît",           vi:"Làm ơn (formal)",            ctx:"Formal — dùng với người lạ, người lớn tuổi" },
  { cat:"🎩 Lịch sự",      fr:"S'il te plaît",             vi:"Làm ơn (thân mật)",          ctx:"Informal — dùng với bạn bè" },
  { cat:"🎩 Lịch sự",      fr:"Excusez-moi",               vi:"Xin lỗi / Cho hỏi (formal)", ctx:"Gọi sự chú ý hoặc xin lỗi — formal" },
  { cat:"🎩 Lịch sự",      fr:"Excuse-moi",                vi:"Xin lỗi (thân mật)",         ctx:"Informal" },
  { cat:"🎩 Lịch sự",      fr:"Pardon",                    vi:"Xin lỗi (va chạm)",          ctx:"Khi vô tình va vào ai, đi qua ai đó" },
  // Giới thiệu
  { cat:"🙋 Giới thiệu",   fr:"Je m'appelle…",             vi:"Tôi tên là…",                ctx:"Cách tự giới thiệu tên phổ biến nhất" },
  { cat:"🙋 Giới thiệu",   fr:"Comment vous appelez-vous ?", vi:"Bạn tên gì? (formal)",    ctx:"Formal" },
  { cat:"🙋 Giới thiệu",   fr:"Comment tu t'appelles ?",   vi:"Bạn tên gì? (thân mật)",    ctx:"Informal" },
  { cat:"🙋 Giới thiệu",   fr:"Enchanté(e) !",             vi:"Rất vui được gặp!",          ctx:"Khi gặp ai lần đầu — thêm e nếu là nữ" },
  { cat:"🙋 Giới thiệu",   fr:"Comment allez-vous ?",      vi:"Bạn có khoẻ không? (formal)",ctx:"Formal — hỏi thăm sức khoẻ" },
  { cat:"🙋 Giới thiệu",   fr:"Ça va ?",                   vi:"Khoẻ không? (thân mật)",     ctx:"Informal — rất thường dùng" },
  { cat:"🙋 Giới thiệu",   fr:"Ça va bien, merci !",       vi:"Khoẻ, cảm ơn!",             ctx:"Trả lời Ça va?" },
];

// ── Shared components ────────────────────────────────────────────────────────

function Section({ icon, title, subtitle, color, bg, defaultOpen=false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderRadius:16, overflow:"hidden", border:`1.5px solid ${color}33`, marginBottom:"0.6rem", boxShadow:`0 2px 10px ${color}10` }}>
      <button onClick={()=>setOpen(o=>!o)}
        style={{ width:"100%", display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.9rem 1rem", background:open?bg:C.white, border:"none", cursor:"pointer", fontFamily:"inherit", transition:"background 0.2s" }}>
        <span style={{ fontSize:"1.4rem", flexShrink:0 }}>{icon}</span>
        <div style={{ flex:1, textAlign:"left" }}>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.97rem", color:C.ink, fontWeight:700 }}>{title}</div>
          {subtitle && <div style={{ fontSize:"0.67rem", color:color, marginTop:"0.05rem" }}>{subtitle}</div>}
        </div>
        <span style={{ color:color, fontSize:"0.85rem", transform:open?"rotate(180deg)":"none", transition:"transform 0.2s", flexShrink:0 }}>▾</span>
      </button>
      {open && <div style={{ background:bg, borderTop:`1px solid ${color}22` }}>{children}</div>}
    </div>
  );
}

function Chip({ label, color }) {
  return <span style={{ background:`${color}18`, color, border:`1px solid ${color}44`, borderRadius:20, padding:"0.1rem 0.5rem", fontSize:"0.68rem", fontFamily:"Georgia,serif" }}>{label}</span>;
}

function CatLabel({ label, color }) {
  return <div style={{ fontSize:"0.62rem", textTransform:"uppercase", letterSpacing:1.2, color, fontWeight:700, marginBottom:"0.4rem", marginTop:"0.85rem" }}>{label}</div>;
}

// ── Alphabet Section ─────────────────────────────────────────────────────────

function AlphabetSection() {
  const [rulesOpen, setRulesOpen] = useState(false);
  const [activeRuleCat, setActiveRuleCat] = useState("🔵 Nguyên âm kép");
  const ruleCats = [...new Set(PRONUNC_RULES.map(r=>r.cat))];
  const COLOR = "#6D28D9";

  return (
    <div style={{ padding:"0.75rem 0.9rem 0.9rem" }}>

      {/* Letter grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:"0.35rem", marginBottom:"0.9rem" }}>
        {ALPHABET.map(a => (
          <div key={a.l} style={{ background:C.white, border:`1px solid ${COLOR}22`, borderRadius:10, padding:"0.4rem 0.2rem", textAlign:"center" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:1 }}>
              <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.1rem", color:COLOR, fontWeight:700 }}>{a.l}</span>
              <SpeakBtn text={a.ipa} size="0.6rem" />
            </div>
            <div style={{ fontSize:"0.52rem", color:"#888", fontStyle:"italic", marginBottom:"0.15rem" }}>{a.ipa}</div>
            <div style={{ fontSize:"0.58rem", color:C.ink, fontFamily:"Georgia,serif", lineHeight:1.2 }}>
              <SpeakBtn text={a.ex} size="0.55rem" />
              <span style={{ marginLeft:1 }}>{a.ex}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pronunciation rules accordion */}
      <button onClick={()=>setRulesOpen(o=>!o)}
        style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0.65rem 0.75rem", background:rulesOpen?"#F0EEFF":C.white, border:`1.5px solid ${COLOR}33`, borderRadius:12, cursor:"pointer", fontFamily:"inherit", marginBottom:"0.4rem", transition:"background 0.2s" }}>
        <span style={{ fontSize:"0.85rem", color:COLOR, fontWeight:700 }}>📐 Quy tắc phát âm & Nối âm</span>
        <span style={{ color:COLOR, transform:rulesOpen?"rotate(180deg)":"none", transition:"transform 0.2s" }}>▾</span>
      </button>

      {rulesOpen && (
        <div style={{ background:"#F9F8FF", border:`1.5px solid ${COLOR}22`, borderRadius:12, overflow:"hidden", animation:"fadeUp 0.2s ease" }}>
          {/* Category tabs */}
          <div style={{ display:"flex", gap:"0.3rem", padding:"0.6rem 0.7rem", overflowX:"auto", borderBottom:`1px solid ${COLOR}15` }}>
            {[...ruleCats, "🔗 Nối âm", "🤫 Chữ câm"].map(cat => (
              <button key={cat} onClick={()=>setActiveRuleCat(cat)}
                style={{ padding:"0.3rem 0.65rem", background:activeRuleCat===cat?COLOR:"transparent", border:`1.5px solid ${activeRuleCat===cat?COLOR:COLOR+"44"}`, color:activeRuleCat===cat?"#fff":COLOR, borderRadius:20, fontSize:"0.65rem", cursor:"pointer", whiteSpace:"nowrap", fontWeight:activeRuleCat===cat?700:400, transition:"all 0.15s" }}>
                {cat}
              </button>
            ))}
          </div>

          <div style={{ padding:"0.75rem 0.8rem" }}>
            {/* Pronunciation rules */}
            {PRONUNC_RULES.filter(r=>r.cat===activeRuleCat).map((r, i) => (
              <div key={i} style={{ background:C.white, border:`1px solid ${COLOR}20`, borderRadius:10, padding:"0.6rem 0.75rem", marginBottom:"0.4rem" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"0.5rem", marginBottom:"0.3rem" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", flexWrap:"wrap" }}>
                    <span style={{ fontFamily:"Georgia,serif", fontSize:"0.9rem", color:COLOR, fontWeight:700 }}>{r.pattern}</span>
                    <span style={{ fontSize:"0.72rem", color:C.gray }}>→</span>
                    <span style={{ fontFamily:"Georgia,serif", fontSize:"0.88rem", color:"#D97706", fontWeight:600 }}>{r.reads}</span>
                  </div>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.3rem", marginBottom:"0.3rem" }}>
                  {r.examples.map((ex,j) => (
                    <span key={j} style={{ display:"flex", alignItems:"center", gap:2, background:"#F0EEFF", borderRadius:20, padding:"0.1rem 0.45rem 0.1rem 0.55rem", fontSize:"0.75rem", fontFamily:"Georgia,serif", color:COLOR }}>
                      {ex}<SpeakBtn text={ex} size="0.6rem"/>
                    </span>
                  ))}
                </div>
                <div style={{ fontSize:"0.72rem", color:C.gray, lineHeight:1.5 }}>💡 {r.tip}</div>
              </div>
            ))}

            {/* Liaisons */}
            {activeRuleCat === "🔗 Nối âm" && LIAISONS.map((l, i) => (
              <div key={i} style={{ background:C.white, border:`1px solid ${COLOR}20`, borderRadius:10, padding:"0.6rem 0.75rem", marginBottom:"0.4rem" }}>
                <div style={{ fontSize:"0.75rem", color:COLOR, fontWeight:600, marginBottom:"0.25rem" }}>{l.trigger}</div>
                <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", flexWrap:"wrap", marginBottom:"0.2rem" }}>
                  <span style={{ fontFamily:"Georgia,serif", fontSize:"0.88rem", color:C.ink }}>{l.example}</span>
                  {l.pronunc !== "—" && <SpeakBtn text={l.example} size="0.65rem"/>}
                  {l.pronunc !== "—" && <span style={{ fontSize:"0.75rem", color:C.gray }}>→</span>}
                  {l.pronunc !== "—" && <span style={{ fontFamily:"Georgia,serif", fontSize:"0.82rem", color:"#D97706", fontStyle:"italic" }}>{l.pronunc}</span>}
                </div>
                <div style={{ fontSize:"0.7rem", color:C.gray }}>💡 {l.note}</div>
              </div>
            ))}

            {/* Silent letters */}
            {activeRuleCat === "🤫 Chữ câm" && SILENT_LETTERS.map((sl, i) => (
              <div key={i} style={{ background:C.white, border:`1px solid ${COLOR}20`, borderRadius:10, padding:"0.6rem 0.75rem", marginBottom:"0.4rem" }}>
                <div style={{ fontSize:"0.8rem", color:COLOR, fontWeight:700, marginBottom:"0.3rem" }}>{sl.pattern}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.3rem", marginBottom:"0.25rem" }}>
                  {sl.examples.map((ex,j) => (
                    <span key={j} style={{ display:"flex", alignItems:"center", gap:2, background:"#F0EEFF", borderRadius:20, padding:"0.1rem 0.45rem 0.1rem 0.55rem", fontSize:"0.75rem", fontFamily:"Georgia,serif", color:COLOR }}>
                      {ex}<SpeakBtn text={ex} size="0.6rem"/>
                    </span>
                  ))}
                </div>
                <div style={{ fontSize:"0.7rem", color:C.gray }}>💡 {sl.note}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Numbers Section ──────────────────────────────────────────────────────────

function NumbersSection() {
  const COLOR = "#0369A1";
  const [showOrdinal, setShowOrdinal] = useState(false);
  return (
    <div style={{ padding:"0.75rem 0.9rem 0.9rem" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.3rem", marginBottom:"0.7rem" }}>
        {NUMBERS.map(([n, fr]) => (
          <div key={n} style={{ display:"flex", alignItems:"center", gap:"0.5rem", background:C.white, border:`1px solid ${COLOR}22`, borderRadius:10, padding:"0.45rem 0.65rem" }}>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:"0.95rem", color:COLOR, fontWeight:700, minWidth:28 }}>{n}</span>
            <span style={{ fontFamily:"Georgia,serif", fontSize:"0.83rem", color:C.ink, flex:1 }}>{fr}</span>
            <SpeakBtn text={fr} size="0.65rem"/>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div style={{ background:"#EFF6FF", border:`1px solid ${COLOR}22`, borderRadius:10, padding:"0.65rem 0.75rem", marginBottom:"0.6rem" }}>
        <div style={{ fontSize:"0.62rem", color:COLOR, fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:"0.4rem" }}>💡 Mẹo nhớ</div>
        {NUMBER_TIPS.map((t,i) => <div key={i} style={{ fontSize:"0.73rem", color:C.ink, lineHeight:1.6, marginBottom:"0.15rem" }}>• {t}</div>)}
      </div>

      {/* Ordinals toggle */}
      <button onClick={()=>setShowOrdinal(o=>!o)}
        style={{ width:"100%", padding:"0.5rem 0.75rem", background:showOrdinal?"#DBEAFE":C.white, border:`1.5px solid ${COLOR}33`, borderRadius:10, cursor:"pointer", fontFamily:"inherit", fontSize:"0.8rem", color:COLOR, fontWeight:600, display:"flex", justifyContent:"space-between", transition:"background 0.2s" }}>
        <span>Số thứ tự (1er, 2e…)</span><span style={{ transform:showOrdinal?"rotate(180deg)":"none", transition:"transform 0.2s" }}>▾</span>
      </button>
      {showOrdinal && (
        <div style={{ marginTop:"0.4rem", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.3rem" }}>
          {ORDINALS.map(([n, fr, abbr]) => (
            <div key={n} style={{ display:"flex", alignItems:"center", gap:"0.4rem", background:C.white, border:`1px solid ${COLOR}22`, borderRadius:10, padding:"0.45rem 0.6rem" }}>
              <span style={{ fontFamily:"Georgia,serif", fontSize:"0.72rem", color:COLOR, fontWeight:700, flexShrink:0 }}>{abbr}</span>
              <span style={{ fontFamily:"Georgia,serif", fontSize:"0.75rem", color:C.ink, flex:1, lineHeight:1.3 }}>{fr}</span>
              <SpeakBtn text={fr.split(" / ")[0]} size="0.6rem"/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Days & Months Section ────────────────────────────────────────────────────

function DateSection() {
  const COLOR = "#B45309";
  return (
    <div style={{ padding:"0.75rem 0.9rem 0.9rem" }}>
      <CatLabel label="Các ngày trong tuần" color={COLOR}/>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.3rem", marginBottom:"0.75rem" }}>
        {JOURS.map((j,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:"0.5rem", background:C.white, border:`1px solid ${COLOR}22`, borderRadius:10, padding:"0.45rem 0.65rem" }}>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:"0.62rem", color:COLOR, fontWeight:700, minWidth:22 }}>{j.abbr}</span>
            <span style={{ fontFamily:"Georgia,serif", fontSize:"0.85rem", color:C.ink, flex:1 }}>{j.fr}</span>
            <span style={{ fontSize:"0.68rem", color:C.gray }}>{j.vi}</span>
            <SpeakBtn text={j.fr} size="0.65rem"/>
          </div>
        ))}
      </div>

      <CatLabel label="Các tháng trong năm" color={COLOR}/>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.3rem", marginBottom:"0.75rem" }}>
        {MOIS.map((m,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:"0.5rem", background:C.white, border:`1px solid ${COLOR}22`, borderRadius:10, padding:"0.45rem 0.65rem" }}>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:"0.78rem", color:COLOR, fontWeight:700, minWidth:20 }}>{m.n}</span>
            <span style={{ fontFamily:"Georgia,serif", fontSize:"0.85rem", color:C.ink, flex:1 }}>{m.fr}</span>
            <SpeakBtn text={m.fr} size="0.65rem"/>
          </div>
        ))}
      </div>

      <CatLabel label="Cách dùng trong câu" color={COLOR}/>
      {DATE_PATTERNS.map((d,i) => (
        <div key={i} style={{ background:C.white, border:`1px solid ${COLOR}22`, borderRadius:10, padding:"0.55rem 0.7rem", marginBottom:"0.3rem", display:"flex", alignItems:"flex-start", gap:"0.5rem" }}>
          <span style={{ fontSize:"0.6rem", background:`${COLOR}18`, color:COLOR, padding:"0.15rem 0.45rem", borderRadius:20, fontWeight:600, whiteSpace:"nowrap", marginTop:2 }}>{d.label}</span>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"Georgia,serif", fontSize:"0.83rem", color:C.ink, display:"flex", alignItems:"center", gap:4 }}>{d.fr}<SpeakBtn text={d.fr} size="0.6rem"/></div>
            <div style={{ fontSize:"0.7rem", color:C.gray, fontStyle:"italic" }}>{d.vi}</div>
          </div>
        </div>
      ))}

      <div style={{ marginTop:"0.65rem", background:"#FEF3E2", border:`1px solid ${COLOR}22`, borderRadius:10, padding:"0.6rem 0.75rem" }}>
        <div style={{ fontSize:"0.68rem", color:COLOR, fontWeight:700, marginBottom:"0.2rem" }}>💡 Thứ và tháng không viết hoa trong tiếng Pháp (trừ đầu câu)</div>
        <div style={{ fontSize:"0.68rem", color:C.gray }}>lundi, mardi … / janvier, février …</div>
      </div>
    </div>
  );
}

// ── Time Section ─────────────────────────────────────────────────────────────

function HeureSection() {
  const COLOR = "#0D9488";
  return (
    <div style={{ padding:"0.75rem 0.9rem 0.9rem" }}>
      {HEURES.map((h,i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:"0.6rem", background:C.white, border:`1px solid ${COLOR}22`, borderRadius:10, padding:"0.5rem 0.7rem", marginBottom:"0.3rem" }}>
          {h.time !== "?" && <span style={{ fontFamily:"'Playfair Display',serif", fontSize:"0.75rem", color:COLOR, fontWeight:700, minWidth:36, flexShrink:0 }}>{h.time}</span>}
          {h.time === "?" && <span style={{ fontSize:"0.9rem", minWidth:36, flexShrink:0, textAlign:"center" }}>❓</span>}
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"Georgia,serif", fontSize:"0.83rem", color:C.ink, display:"flex", alignItems:"center", gap:4, flexWrap:"wrap" }}>{h.fr}<SpeakBtn text={h.fr} size="0.6rem"/></div>
            <div style={{ fontSize:"0.68rem", color:C.gray, fontStyle:"italic" }}>{h.vi}</div>
          </div>
        </div>
      ))}
      <div style={{ marginTop:"0.65rem", background:"#F0FDFA", border:`1px solid ${COLOR}22`, borderRadius:10, padding:"0.6rem 0.75rem" }}>
        <div style={{ fontSize:"0.62rem", color:COLOR, fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:"0.35rem" }}>💡 Mẹo nhớ</div>
        {HEURE_TIPS.map((t,i) => <div key={i} style={{ fontSize:"0.73rem", color:C.ink, lineHeight:1.6, marginBottom:"0.12rem" }}>• {t}</div>)}
      </div>
    </div>
  );
}

// ── Colors Section ───────────────────────────────────────────────────────────

function CouleurSection() {
  const COLOR = "#DB2777";
  return (
    <div style={{ padding:"0.75rem 0.9rem 0.9rem" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.4rem", marginBottom:"0.75rem" }}>
        {COULEURS.map((c,i) => {
          const textColor = c.textLight ? "#fff" : "#2c3e50";
          return (
            <div key={i} style={{ background:c.hex, border:`2px solid ${c.hex}`, borderRadius:12, padding:"0.6rem 0.7rem", boxShadow:"0 2px 8px rgba(0,0,0,0.1)" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <span style={{ fontFamily:"Georgia,serif", fontSize:"0.9rem", color:textColor, fontWeight:700 }}>{c.fr}</span>
                <SpeakBtn text={c.fr} size="0.65rem"/>
              </div>
              {c.fr !== c.fr_f && (
                <div style={{ fontSize:"0.68rem", color:textColor, opacity:0.8, fontFamily:"Georgia,serif", fontStyle:"italic" }}>f: {c.fr_f}</div>
              )}
              <div style={{ fontSize:"0.67rem", color:textColor, opacity:0.85, marginTop:"0.15rem" }}>{c.vi}</div>
            </div>
          );
        })}
      </div>
      <div style={{ background:"#FDF2F8", border:`1px solid ${COLOR}22`, borderRadius:10, padding:"0.6rem 0.75rem" }}>
        <div style={{ fontSize:"0.62rem", color:COLOR, fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:"0.35rem" }}>💡 Lưu ý</div>
        {COULEUR_TIPS.map((t,i) => <div key={i} style={{ fontSize:"0.73rem", color:C.ink, lineHeight:1.6, marginBottom:"0.12rem" }}>• {t}</div>)}
      </div>
    </div>
  );
}

// ── Greetings Section ────────────────────────────────────────────────────────

function SalutationsSection() {
  const COLOR = "#2980B9";
  const cats = [...new Set(SALUTATIONS.map(s=>s.cat))];
  return (
    <div style={{ padding:"0.75rem 0.9rem 0.9rem" }}>
      {cats.map(cat => (
        <div key={cat}>
          <CatLabel label={cat} color={COLOR}/>
          {SALUTATIONS.filter(s=>s.cat===cat).map((s,i) => (
            <div key={i} style={{ background:C.white, border:`1px solid ${COLOR}22`, borderRadius:10, padding:"0.55rem 0.75rem", marginBottom:"0.3rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", marginBottom:"0.2rem" }}>
                <span style={{ fontFamily:"Georgia,serif", fontSize:"0.9rem", color:C.ink, fontWeight:600, flex:1 }}>{s.fr}</span>
                <SpeakBtn text={s.fr} size="0.7rem"/>
              </div>
              <div style={{ fontSize:"0.75rem", color:COLOR, fontWeight:500, marginBottom:"0.15rem" }}>{s.vi}</div>
              <div style={{ fontSize:"0.67rem", color:C.gray, fontStyle:"italic", lineHeight:1.5 }}>→ {s.ctx}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ── Main Panel ───────────────────────────────────────────────────────────────

export default function ReferencePanel() {
  return (
    <div style={{ padding:"0.9rem 1rem 1.5rem" }}>
      <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1rem", color:C.ink, fontWeight:700, marginBottom:"0.25rem" }}>📖 Cẩm nang tiếng Pháp</div>
      <div style={{ fontSize:"0.72rem", color:C.gray, marginBottom:"0.9rem" }}>Bấm 🔈 để nghe phát âm chuẩn — không cần internet phụ thêm</div>

      <Section icon="🔤" title="Bảng chữ cái" subtitle="26 chữ + quy tắc phát âm + nối âm" color="#6D28D9" bg="#F5F0FF">
        <AlphabetSection/>
      </Section>

      <Section icon="🔢" title="Số đếm" subtitle="0–1000 + số thứ tự" color="#0369A1" bg="#EFF6FF">
        <NumbersSection/>
      </Section>

      <Section icon="🗓" title="Ngày tháng" subtitle="Thứ, tháng, cách đọc ngày" color="#B45309" bg="#FFFBEB">
        <DateSection/>
      </Section>

      <Section icon="🕐" title="Giờ giấc" subtitle="Cách đọc giờ chính thức & thông dụng" color="#0D9488" bg="#F0FDFA">
        <HeureSection/>
      </Section>

      <Section icon="🎨" title="Màu sắc" subtitle="12 màu + chia theo giống đực / cái" color="#DB2777" bg="#FDF2F8">
        <CouleurSection/>
      </Section>

      <Section icon="👋" title="Chào hỏi & Lịch sự" subtitle="Chào, tạm biệt, cảm ơn, giới thiệu" color="#2980B9" bg="#EBF5FB">
        <SalutationsSection/>
      </Section>
    </div>
  );
}
