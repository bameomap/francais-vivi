import { useState, useRef } from "react";
import { C } from "../constants.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";

// ── Design tokens ─────────────────────────────────────────────
const T = {
  blue:   "#4A90D9", purple: "#7B6CF6", green:  "#059669",
  orange: "#E67E22", red:    "#DC2626", teal:   "#0891B2",
  gold:   "#D97706", pink:   "#DB2777",
};

// ── Helpers ───────────────────────────────────────────────────
const Badge = ({ text, color = C.blue, bg }) => (
  <span style={{ background: bg || color + "18", color, border: `1px solid ${color}44`, borderRadius: 20, padding: "0.08rem 0.5rem", fontSize: "0.75rem", fontWeight: 700, fontFamily: "Georgia,serif", whiteSpace: "nowrap" }}>
    {text}
  </span>
);

const Row = ({ cells, header, colors = [] }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(${cells.length}, 1fr)`, gap: 1, marginBottom: 1 }}>
    {cells.map((c, i) => (
      <div key={i} style={{ padding: "0.45rem 0.6rem", background: header ? "#F1F5F9" : (colors[i] || C.white), fontSize: header ? "0.6rem" : "0.82rem", fontWeight: header ? 700 : 400, color: header ? C.gray : C.ink, textTransform: header ? "uppercase" : "none", letterSpacing: header ? 0.8 : 0, fontFamily: header ? "inherit" : "Georgia,serif", lineHeight: 1.4 }}>
        {c}
      </div>
    ))}
  </div>
);

const Table = ({ headers, rows, colors }) => (
  <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: "0.75rem" }}>
    <Row cells={headers} header />
    {rows.map((r, i) => <Row key={i} cells={r} colors={colors} />)}
  </div>
);

const Note = ({ text, color = T.gold }) => (
  <div style={{ background: color + "12", border: `1px solid ${color}44`, borderRadius: 8, padding: "0.45rem 0.7rem", fontSize: "0.75rem", color, lineHeight: 1.6, marginBottom: "0.6rem" }}>
    💡 {text}
  </div>
);

const SectionTitle = ({ text }) => (
  <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: 2, color: C.gray, fontWeight: 700, marginTop: "1rem", marginBottom: "0.45rem" }}>{text}</div>
);

const Phrase = ({ fr, vi }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0", borderBottom: `1px solid ${C.border}` }}>
    <span style={{ fontFamily: "Georgia,serif", fontSize: "0.88rem", color: C.blue, fontWeight: 600, flex: 1 }}>{fr}</span>
    <SpeakBtn text={fr} size="0.7rem" />
    <span style={{ fontSize: "0.75rem", color: C.gray, flex: 1 }}>→ {vi}</span>
  </div>
);

// ── Topics ────────────────────────────────────────────────────
const TOPICS = [
  { id: "pronoms",       label: "Đại từ",           icon: "👤", color: T.blue   },
  { id: "articles",      label: "Mạo từ",           icon: "🔤", color: T.purple },
  { id: "possessifs",    label: "Sở hữu",           icon: "👜", color: T.orange },
  { id: "demonstratifs", label: "Chỉ định từ",      icon: "👉", color: T.orange },
  { id: "etre_avoir",    label: "Être / Avoir",     icon: "⚜️", color: T.purple },
  { id: "verbes_er",     label: "Động từ -ER/-IR",  icon: "🖊️", color: T.teal   },
  { id: "verbes_irreg",  label: "Bất quy tắc",      icon: "⚡", color: T.red    },
  { id: "pronominaux",   label: "Động từ phản thân",icon: "🔄", color: T.teal   },
  { id: "imperatif",     label: "Câu mệnh lệnh",    icon: "📢", color: T.red    },
  { id: "adjectifs",     label: "Tính từ",          icon: "🎨", color: T.green  },
  { id: "negation",      label: "Phủ định",         icon: "🚫", color: T.red    },
  { id: "questions",     label: "Câu hỏi",          icon: "❓", color: T.gold   },
  { id: "prepositions",  label: "Giới từ",          icon: "📍", color: T.teal   },
  { id: "futur",         label: "Tương lai gần",    icon: "🔮", color: T.purple },
  { id: "passe_recent",  label: "Passé récent",     icon: "⏪", color: T.green  },
  { id: "passe",         label: "Passé composé",    icon: "📜", color: T.green  },
  { id: "comparaison",   label: "So sánh",          icon: "⚖️", color: T.gold   },
  { id: "pronoms_rel",   label: "Đại từ quan hệ",   icon: "🔗", color: T.blue   },
];

// ── Content by topic ──────────────────────────────────────────
function TopicContent({ id }) {
  switch (id) {

    case "pronoms": return (
      <div>
        <SectionTitle text="Đại từ chủ ngữ (Pronoms sujets)" />
        <Table
          headers={["Ngôi", "Số ít", "Số nhiều"]}
          rows={[
            ["1 (tôi / chúng tôi)", "je", "nous"],
            ["2 (bạn / các bạn)",   "tu", "vous"],
            ["3 nam",               "il · on", "ils"],
            ["3 nữ",                "elle", "elles"],
          ]}
        />
        <Note text="'on' = người ta / chúng ta (thân mật)" color={T.blue} />

        <SectionTitle text="Đại từ nhấn mạnh (Pronoms toniques)" />
        <Note text="Dùng sau giới từ: avec moi, chez toi, pour lui..." color={T.orange} />
        <Table
          headers={["Chủ ngữ", "Nhấn mạnh", "Ví dụ"]}
          rows={[
            ["je",   "moi",  "C'est moi !"],
            ["tu",   "toi",  "Et toi ?"],
            ["il",   "lui",  "Avec lui"],
            ["elle", "elle", "Chez elle"],
            ["nous", "nous", "Pour nous"],
            ["vous", "vous", "Après vous"],
            ["ils",  "eux",  "Sans eux"],
            ["elles","elles","Devant elles"],
          ]}
        />

        <SectionTitle text="Đại từ bổ ngữ trực tiếp (COD)" />
        <Table
          headers={["Ngôi", "COD", "Ví dụ"]}
          rows={[
            ["je → me", "me / m'", "Il me regarde."],
            ["tu → te", "te / t'", "Je te vois."],
            ["il/elle", "le / la / l'", "Je le connais."],
            ["nous",    "nous",  "Il nous aide."],
            ["vous",    "vous",  "Je vous attends."],
            ["ils/elles","les",  "Tu les aimes ?"],
          ]}
        />
      </div>
    );

    case "articles": return (
      <div>
        <SectionTitle text="Mạo từ xác định (Articles définis)" />
        <Note text="Dùng khi nói về vật/người đã biết hoặc cụ thể" color={T.blue} />
        <Table
          headers={["Giống", "Số ít", "Trước nguyên âm", "Số nhiều"]}
          rows={[
            ["Đực (masc.)", "le", "l'", "les"],
            ["Cái (fém.)",  "la", "l'", "les"],
          ]}
        />
        <div style={{ marginBottom: "0.5rem" }}>
          {[["le livre", "cuốn sách"], ["la table", "cái bàn"], ["l'arbre", "cái cây"], ["les enfants", "những đứa trẻ"]].map(([fr, vi]) => <Phrase key={fr} fr={fr} vi={vi} />)}
        </div>

        <SectionTitle text="Mạo từ không xác định (Articles indéfinis)" />
        <Note text="Dùng khi nói về vật chưa biết / lần đầu đề cập" color={T.purple} />
        <Table
          headers={["Giống", "Số ít", "Số nhiều"]}
          rows={[
            ["Đực", "un", "des"],
            ["Cái", "une", "des"],
          ]}
        />
        <div style={{ marginBottom: "0.5rem" }}>
          {[["un café", "một tách cà phê"], ["une pomme", "một quả táo"], ["des amis", "vài người bạn"]].map(([fr, vi]) => <Phrase key={fr} fr={fr} vi={vi} />)}
        </div>

        <SectionTitle text="Mạo từ bộ phận (Articles partitifs)" />
        <Note text="Dùng cho danh từ không đếm được (một phần / một ít)" color={T.green} />
        <Table
          headers={["Giống", "Dạng", "Trước nguyên âm"]}
          rows={[
            ["Đực", "du", "de l'"],
            ["Cái", "de la", "de l'"],
            ["Số nhiều", "des", "—"],
          ]}
        />
        <div style={{ marginBottom: "0.5rem" }}>
          {[["du pain", "bánh mì (một ít)"], ["de la musique", "âm nhạc"], ["de l'eau", "nước"], ["des épinards", "rau bina"]].map(([fr, vi]) => <Phrase key={fr} fr={fr} vi={vi} />)}
        </div>
        <Note text="Sau phủ định → de/d' : Je n'ai pas de pain." color={T.red} />

        <SectionTitle text="Tổng hợp — bảng nhanh" />
        <Table
          headers={["", "Masc. sg", "Fém. sg", "Pl."]}
          rows={[
            ["Défini",    "le / l'", "la / l'", "les"],
            ["Indéfini",  "un",      "une",      "des"],
            ["Partitif",  "du / de l'", "de la / de l'", "des"],
          ]}
        />
      </div>
    );

    case "possessifs": return (
      <div>
        <SectionTitle text="Tính từ sở hữu (Adjectifs possessifs)" />
        <Note text="Hòa hợp với DANH TỪ được sở hữu, không phải người sở hữu" color={T.orange} />
        <Table
          headers={["Người sở hữu", "Masc. sg", "Fém. sg", "Pluriel"]}
          rows={[
            ["je (tôi)",          "mon",   "ma (→ mon*)", "mes"],
            ["tu (bạn)",          "ton",   "ta (→ ton*)", "tes"],
            ["il/elle (anh/cô)",  "son",   "sa (→ son*)", "ses"],
            ["nous (chúng tôi)", "notre",  "notre",       "nos"],
            ["vous (các bạn)",   "votre",  "votre",       "vos"],
            ["ils/elles (họ)",   "leur",   "leur",        "leurs"],
          ]}
        />
        <Note text="* ma/ta/sa → mon/ton/son trước từ bắt đầu bằng nguyên âm: mon amie (không phải ma amie)" color={T.red} />

        <SectionTitle text="Ví dụ thực tế" />
        {[
          ["mon père",    "bố tôi"],
          ["ma mère",     "mẹ tôi"],
          ["mes parents", "bố mẹ tôi"],
          ["ton livre",   "cuốn sách của bạn"],
          ["ta chambre",  "phòng của bạn"],
          ["son ami",     "người bạn của anh/cô ấy"],
          ["son amie",    "người bạn (nữ) — dùng son vì amie bắt đầu bằng nguyên âm"],
          ["notre maison","nhà của chúng tôi"],
          ["vos clés",    "chìa khóa của các bạn"],
          ["leur voiture","xe của họ"],
          ["leurs enfants","những đứa con của họ"],
        ].map(([fr, vi]) => <Phrase key={fr} fr={fr} vi={vi} />)}
      </div>
    );

    case "etre_avoir": return (
      <div>
        <SectionTitle text="Être — thì hiện tại" />
        <Table
          headers={["Ngôi", "Dạng chia", "Phát âm"]}
          rows={[
            ["je",       "suis",   "[swi]"],
            ["tu",       "es",     "[ɛ]"],
            ["il/elle",  "est",    "[ɛ]"],
            ["nous",     "sommes", "[sɔm]"],
            ["vous",     "êtes",   "[ɛt]"],
            ["ils/elles","sont",   "[sɔ̃]"],
          ]}
        />
        <SectionTitle text="Ví dụ — Être" />
        {[
          ["Je suis étudiant.", "Tôi là sinh viên."],
          ["Tu es fatigué ?",   "Bạn có mệt không?"],
          ["Il est médecin.",   "Anh ấy là bác sĩ."],
          ["Nous sommes amis.", "Chúng tôi là bạn bè."],
          ["Vous êtes prêts ?", "Các bạn sẵn sàng chưa?"],
          ["Ils sont contents.", "Họ vui."],
        ].map(([fr, vi]) => <Phrase key={fr} fr={fr} vi={vi} />)}

        <SectionTitle text="Avoir — thì hiện tại" />
        <Table
          headers={["Ngôi", "Dạng chia", "Lưu ý"]}
          rows={[
            ["je",       "ai",    "j'ai (nối âm)"],
            ["tu",       "as",    "tu as"],
            ["il/elle",  "a",     "il a"],
            ["nous",     "avons", "nous avons"],
            ["vous",     "avez",  "vous avez"],
            ["ils/elles","ont",   "ils ont"],
          ]}
        />
        <SectionTitle text="Ví dụ — Avoir" />
        {[
          ["J'ai vingt ans.",      "Tôi 20 tuổi."],
          ["Tu as faim ?",         "Bạn có đói không?"],
          ["Elle a un chien.",     "Cô ấy có một con chó."],
          ["Nous avons le temps.", "Chúng tôi có thời gian."],
          ["Vous avez raison.",    "Các bạn đúng."],
          ["Ils ont de la chance.","Họ thật may mắn."],
        ].map(([fr, vi]) => <Phrase key={fr} fr={fr} vi={vi} />)}

        <Note text="Tuổi dùng AVOIR: J'ai 20 ans. (không dùng être)" color={T.orange} />
        <Note text="Cảm giác dùng AVOIR: avoir faim, avoir soif, avoir froid, avoir chaud, avoir peur" color={T.blue} />
      </div>
    );

    case "verbes_er": return (
      <div>
        <SectionTitle text="Động từ -ER quy tắc (nhóm 1)" />
        <Note text="Chiếm ~90% động từ tiếng Pháp. Bỏ -ER, thêm đuôi." color={T.teal} />
        <Table
          headers={["Ngôi", "Đuôi", "parler", "aimer", "manger"]}
          rows={[
            ["je",        "-e",   "parle",  "aime",  "mange"],
            ["tu",        "-es",  "parles", "aimes", "manges"],
            ["il/elle",   "-e",   "parle",  "aime",  "mange"],
            ["nous",      "-ons", "parlons","aimons","mangeons"],
            ["vous",      "-ez",  "parlez", "aimez", "mangez"],
            ["ils/elles", "-ent", "parlent","aiment","mangent"],
          ]}
        />
        <Note text="nous: manger → mangeons (thêm 'e' trước -ons để giữ âm [ʒ])" color={T.orange} />

        <SectionTitle text="Động từ -IR quy tắc (nhóm 2)" />
        <Table
          headers={["Ngôi", "Đuôi", "finir", "choisir"]}
          rows={[
            ["je",        "-is",    "finis",    "choisis"],
            ["tu",        "-is",    "finis",    "choisis"],
            ["il/elle",   "-it",    "finit",    "choisit"],
            ["nous",      "-issons","finissons","choisissons"],
            ["vous",      "-issez", "finissez", "choisissez"],
            ["ils/elles", "-issent","finissent","choisissent"],
          ]}
        />

        <SectionTitle text="Động từ -ER thường dùng" />
        {[
          ["parler",   "nói"], ["aimer",    "yêu thích"], ["manger",  "ăn"],
          ["habiter",  "ở, sống"], ["travailler","làm việc"], ["écouter", "nghe"],
          ["regarder", "nhìn, xem"], ["chercher", "tìm"],   ["acheter", "mua"],
          ["donner",   "cho"], ["penser",   "nghĩ"],       ["arriver", "đến"],
        ].reduce((acc, [fr, vi], i) => {
          if (i % 2 === 0) acc.push([fr, vi]);
          else { acc[acc.length-1] = [...acc[acc.length-1], fr, vi]; }
          return acc;
        }, []).map((row, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem", borderBottom: `1px solid ${C.border}`, padding: "0.28rem 0" }}>
            {[0, 2].map(j => row[j] !== undefined && (
              <div key={j} style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
                <span style={{ fontFamily: "Georgia,serif", fontSize: "0.85rem", color: T.teal, fontWeight: 600 }}>{row[j]}</span>
                <SpeakBtn text={row[j]} size="0.65rem" />
                <span style={{ fontSize: "0.75rem", color: C.gray }}>→ {row[j+1]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    );

    case "verbes_irreg": return (
      <div>
        <SectionTitle text="Aller — đi" />
        <Table headers={["Ngôi","Dạng chia"]} rows={[["je","vais"],["tu","vas"],["il/elle","va"],["nous","allons"],["vous","allez"],["ils/elles","vont"]]} />
        {[["Je vais à l'école.","Tôi đi học."],["On y va !","Đi thôi!"],["Comment tu vas ?","Bạn có khỏe không?"]].map(([fr,vi])=><Phrase key={fr} fr={fr} vi={vi}/>)}

        <SectionTitle text="Faire — làm, làm gì đó" />
        <Table headers={["Ngôi","Dạng chia"]} rows={[["je","fais"],["tu","fais"],["il/elle","fait"],["nous","faisons"],["vous","faites"],["ils/elles","font"]]} />
        {[["Qu'est-ce que tu fais ?","Bạn đang làm gì?"],["Il fait beau.","Trời đẹp."],["Nous faisons du sport.","Chúng tôi chơi thể thao."]].map(([fr,vi])=><Phrase key={fr} fr={fr} vi={vi}/>)}

        <SectionTitle text="Vouloir — muốn" />
        <Table headers={["Ngôi","Dạng chia"]} rows={[["je","veux"],["tu","veux"],["il/elle","veut"],["nous","voulons"],["vous","voulez"],["ils/elles","veulent"]]} />

        <SectionTitle text="Pouvoir — có thể" />
        <Table headers={["Ngôi","Dạng chia"]} rows={[["je","peux"],["tu","peux"],["il/elle","peut"],["nous","pouvons"],["vous","pouvez"],["ils/elles","peuvent"]]} />

        <SectionTitle text="Devoir — phải" />
        <Table headers={["Ngôi","Dạng chia"]} rows={[["je","dois"],["tu","dois"],["il/elle","doit"],["nous","devons"],["vous","devez"],["ils/elles","doivent"]]} />

        <SectionTitle text="Savoir — biết (kiến thức)" />
        <Table headers={["Ngôi","Dạng chia"]} rows={[["je","sais"],["tu","sais"],["il/elle","sait"],["nous","savons"],["vous","savez"],["ils/elles","savent"]]} />

        <SectionTitle text="Prendre — lấy, đi (phương tiện)" />
        <Table headers={["Ngôi","Dạng chia"]} rows={[["je","prends"],["tu","prends"],["il/elle","prend"],["nous","prenons"],["vous","prenez"],["ils/elles","prennent"]]} />

        <SectionTitle text="Venir — đến" />
        <Table headers={["Ngôi","Dạng chia"]} rows={[["je","viens"],["tu","viens"],["il/elle","vient"],["nous","venons"],["vous","venez"],["ils/elles","viennent"]]} />
      </div>
    );

    case "adjectifs": return (
      <div>
        <SectionTitle text="Quy tắc hòa hợp (Accord)" />
        <Note text="Tính từ phải hòa hợp GIỐNG và SỐ với danh từ nó bổ nghĩa." color={T.green} />
        <Table
          headers={["", "Masc. sg", "Fém. sg", "Masc. pl", "Fém. pl"]}
          rows={[
            ["Quy tắc chung",  "grand",   "grande",   "grands",   "grandes"],
            ["-eux / -euse",   "heureux", "heureuse", "heureux",  "heureuses"],
            ["-if / -ive",     "sportif", "sportive", "sportifs", "sportives"],
            ["-er / -ère",     "premier", "première", "premiers", "premières"],
            ["-el / -elle",    "naturel", "naturelle","naturels", "naturelles"],
            ["Bất quy tắc",    "beau",    "belle",    "beaux",    "belles"],
            ["",               "nouveau", "nouvelle", "nouveaux", "nouvelles"],
            ["",               "vieux",   "vieille",  "vieux",    "vieilles"],
            ["Masc=Fém",       "rouge",   "rouge",    "rouges",   "rouges"],
          ]}
        />
        <Note text="beau/nouveau/vieux → bel/nouvel/vieil trước nguyên âm: un bel homme" color={T.orange} />

        <SectionTitle text="Vị trí tính từ" />
        <Note text="Thường đứng SAU danh từ: une voiture rouge, un livre intéressant" color={T.blue} />
        <Note text="Một số đứng TRƯỚC (BAGS): Beauty (beau), Age (jeune/vieux), Goodness (bon/mauvais), Size (grand/petit)" color={T.purple} />
        {[
          ["un grand appartement","căn hộ rộng"],["une petite fille","cô bé nhỏ"],
          ["un bon restaurant","nhà hàng ngon"],["une belle femme","người phụ nữ đẹp"],
          ["un livre intéressant","cuốn sách hay"],["une voiture rouge","xe đỏ"],
        ].map(([fr,vi])=><Phrase key={fr} fr={fr} vi={vi}/>)}

        <SectionTitle text="Phó từ chỉ mức độ" />
        <Table
          headers={["Phó từ","Nghĩa","Ví dụ"]}
          rows={[
            ["très","rất","très grand"],["assez","khá","assez bien"],
            ["un peu","hơi, một chút","un peu fatigué"],["trop","quá","trop chaud"],
            ["vraiment","thật sự","vraiment beau"],["plutôt","khá, hơi","plutôt sympa"],
          ]}
        />
      </div>
    );

    case "negation": return (
      <div>
        <SectionTitle text="Phủ định cơ bản: ne … pas" />
        <Note text="ne đứng TRƯỚC động từ, pas đứng SAU. Trước nguyên âm: ne → n'" color={T.red} />
        <Table
          headers={["Khẳng định","Phủ định"]}
          rows={[
            ["Je parle français.","Je ne parle pas français."],
            ["Il mange du pain.","Il ne mange pas de pain."],
            ["Nous avons une voiture.","Nous n'avons pas de voiture."],
            ["Tu aimes le café ?","Tu n'aimes pas le café ?"],
          ]}
        />
        <Note text="Sau phủ định: un/une/du/de la/des → de/d'" color={T.orange} />

        <SectionTitle text="Các dạng phủ định khác" />
        <Table
          headers={["Cấu trúc","Nghĩa","Ví dụ"]}
          rows={[
            ["ne … jamais",   "không bao giờ","Je ne fume jamais."],
            ["ne … plus",     "không còn nữa","Il ne travaille plus."],
            ["ne … rien",     "không gì cả",  "Je ne vois rien."],
            ["ne … personne", "không ai",     "Je ne connais personne."],
            ["ne … que",      "chỉ",          "Il ne mange que des légumes."],
            ["ne … ni … ni",  "không … cũng không","Je ne veux ni thé ni café."],
          ]}
        />

        <SectionTitle text="Phủ định ở Infinitif" />
        <Note text="ne pas đứng TRƯỚC động từ nguyên thể: Je préfère ne pas sortir." color={T.teal} />
        {[
          ["Je décide de ne pas venir.","Tôi quyết định không đến."],
          ["Il vaut mieux ne pas fumer.","Tốt hơn là không hút thuốc."],
        ].map(([fr,vi])=><Phrase key={fr} fr={fr} vi={vi}/>)}
      </div>
    );

    case "questions": return (
      <div>
        <SectionTitle text="3 cách đặt câu hỏi" />
        <Table
          headers={["Cách","Ví dụ","Dùng khi"]}
          rows={[
            ["Ngữ điệu ↑",       "Tu parles français ?",              "Thân mật, nói chuyện"],
            ["Est-ce que …",     "Est-ce que tu parles français ?",   "Thường dùng nhất"],
            ["Đảo ngữ (inversion)","Parles-tu français ?",            "Trang trọng, viết"],
          ]}
        />

        <SectionTitle text="Từ để hỏi (Mots interrogatifs)" />
        <Table
          headers={["Từ","Nghĩa","Ví dụ"]}
          rows={[
            ["Qui",         "Ai",            "Qui est-ce ? / Qui parle ?"],
            ["Que / Quoi",  "Cái gì",        "Qu'est-ce que tu fais ?"],
            ["Où",          "Ở đâu",         "Où tu habites ?"],
            ["Quand",       "Khi nào",       "Quand tu arrives ?"],
            ["Comment",     "Như thế nào",   "Comment tu t'appelles ?"],
            ["Pourquoi",    "Tại sao",       "Pourquoi tu pleures ?"],
            ["Combien (de)","Bao nhiêu",     "Combien ça coûte ?"],
            ["Quel(le)(s)", "Nào / Cái nào", "Quel âge tu as ?"],
          ]}
        />

        <SectionTitle text="Quel — hòa hợp giống & số" />
        <Table
          headers={["","Singulier","Pluriel"]}
          rows={[
            ["Masc.","quel",  "quels"],
            ["Fém.", "quelle","quelles"],
          ]}
        />
        {[
          ["Quel film tu regardes ?","Bạn xem phim nào?"],
          ["Quelle heure est-il ?","Mấy giờ rồi?"],
          ["Quels sports tu aimes ?","Bạn thích môn thể thao nào?"],
          ["Quelles langues tu parles ?","Bạn nói được ngôn ngữ nào?"],
        ].map(([fr,vi])=><Phrase key={fr} fr={fr} vi={vi}/>)}
      </div>
    );

    case "prepositions": return (
      <div>
        <SectionTitle text="Giới từ chỉ nơi chốn" />
        <Table
          headers={["Giới từ","Nghĩa","Ví dụ"]}
          rows={[
            ["à",         "ở, tại (thành phố/điểm)","J'habite à Paris."],
            ["en",        "ở, tại (quốc gia/tỉnh)","Je suis en France."],
            ["au / aux",  "ở (quốc gia đực/nhiều)", "Je vais au Japon."],
            ["dans",      "trong, bên trong",        "Il est dans la chambre."],
            ["sur",       "trên (bề mặt)",            "Le livre est sur la table."],
            ["sous",      "dưới",                     "Le chat est sous le lit."],
            ["devant",    "trước mặt",               "Il attend devant la porte."],
            ["derrière",  "phía sau",                "Le jardin est derrière la maison."],
            ["entre",     "giữa (hai vật)",           "Le café est entre la banque et la pharmacie."],
            ["à côté de", "bên cạnh",                "L'école est à côté de l'église."],
            ["en face de","đối diện",                "La boulangerie est en face de la gare."],
            ["près de",   "gần",                     "Nous habitons près du parc."],
            ["loin de",   "xa",                      "C'est loin de la gare."],
          ]}
        />

        <SectionTitle text="à + le/les → contraction" />
        <Table
          headers={["","Singulier","Pluriel"]}
          rows={[
            ["Masc.","à + le = au","à + les = aux"],
            ["Fém.", "à la (pas de contraction)","à + les = aux"],
            ["Voyelle","à l' (pas de contraction)","à + les = aux"],
          ]}
        />
        {[["Je vais au marché.","Tôi đến chợ."],["Elle parle aux enfants.","Cô ấy nói chuyện với bọn trẻ."]].map(([fr,vi])=><Phrase key={fr} fr={fr} vi={vi}/>)}

        <SectionTitle text="de + le/les → contraction" />
        <Table
          headers={["","Singulier","Pluriel"]}
          rows={[
            ["Masc.","de + le = du","de + les = des"],
            ["Fém.", "de la (pas de contraction)","de + les = des"],
          ]}
        />
        {[["Je viens du bureau.","Tôi từ văn phòng về."],["C'est la maison du voisin.","Đây là nhà của người hàng xóm."]].map(([fr,vi])=><Phrase key={fr} fr={fr} vi={vi}/>)}
      </div>
    );

    case "futur": return (
      <div>
        <SectionTitle text="Futur proche — Tương lai gần" />
        <Note text="Cấu trúc: aller (chia theo ngôi) + động từ nguyên thể" color={T.purple} />
        <Table
          headers={["Ngôi","Aller","Ví dụ"]}
          rows={[
            ["je",        "vais",  "Je vais manger."],
            ["tu",        "vas",   "Tu vas partir ?"],
            ["il/elle",   "va",    "Elle va dormir."],
            ["nous",      "allons","Nous allons voyager."],
            ["vous",      "allez", "Vous allez réussir."],
            ["ils/elles", "vont",  "Ils vont arriver."],
          ]}
        />

        <SectionTitle text="Ví dụ thực tế" />
        {[
          ["Je vais apprendre le français.", "Tôi sẽ học tiếng Pháp."],
          ["Il va pleuvoir ce soir.",         "Tối nay trời sẽ mưa."],
          ["On va manger ensemble ?",         "Chúng ta sẽ ăn cùng nhau chứ?"],
          ["Tu vas bien dormir.",             "Bạn sẽ ngủ ngon."],
          ["Nous allons fêter ça !",          "Chúng ta sẽ ăn mừng điều này!"],
        ].map(([fr,vi])=><Phrase key={fr} fr={fr} vi={vi}/>)}

        <Note text="Phủ định: Je ne vais pas sortir. (ne...pas kẹp giữa aller)" color={T.red} />

        <SectionTitle text="Futur simple — Tương lai đơn (tham khảo)" />
        <Note text="Cấu trúc: infinitif + đuôi: -ai, -as, -a, -ons, -ez, -ont" color={T.teal} />
        <Table
          headers={["Ngôi","Đuôi","parler","finir"]}
          rows={[
            ["je",       "-ai",  "parlerai",  "finirai"],
            ["tu",       "-as",  "parleras",  "finiras"],
            ["il/elle",  "-a",   "parlera",   "finira"],
            ["nous",     "-ons", "parlerons", "finirons"],
            ["vous",     "-ez",  "parlerez",  "finirez"],
            ["ils/elles","-ont", "parleront", "finiront"],
          ]}
        />
      </div>
    );

    case "passe": return (
      <div>
        <SectionTitle text="Passé composé — Quá khứ hoàn thành" />
        <Note text="Cấu trúc: avoir/être (hiện tại) + participe passé" color={T.green} />

        <SectionTitle text="Với AVOIR (đa số động từ)" />
        <Table
          headers={["Ngôi","Avoir","Participe passé (parler)","Kết quả"]}
          rows={[
            ["je",        "ai",   "parlé", "j'ai parlé"],
            ["tu",        "as",   "parlé", "tu as parlé"],
            ["il/elle",   "a",    "parlé", "il a parlé"],
            ["nous",      "avons","parlé", "nous avons parlé"],
            ["vous",      "avez", "parlé", "vous avez parlé"],
            ["ils/elles", "ont",  "parlé", "ils ont parlé"],
          ]}
        />

        <SectionTitle text="Cách tạo Participe passé" />
        <Table
          headers={["Nhóm","Quy tắc","Ví dụ"]}
          rows={[
            ["-ER", "bỏ -er → +é", "parler → parlé, manger → mangé"],
            ["-IR", "bỏ -ir → +i", "finir → fini, choisir → choisi"],
            ["-RE", "bỏ -re → +u", "perdre → perdu, vendre → vendu"],
            ["Bất quy tắc","học thuộc","être→été, avoir→eu, faire→fait, prendre→pris, venir→venu"],
          ]}
        />

        <SectionTitle text="Với ÊTRE (chuyển động & phản thân)" />
        <Note text="Participe passé hòa hợp với CHỦ NGỮ khi dùng être" color={T.orange} />
        <Table
          headers={["Động từ","Participe","Ví dụ"]}
          rows={[
            ["aller",   "allé(e)(s)", "Elle est allée au marché."],
            ["venir",   "venu(e)(s)", "Ils sont venus hier."],
            ["partir",  "parti(e)(s)","Je suis parti(e) tôt."],
            ["arriver", "arrivé(e)(s)","Tu es arrivé(e) ?"],
            ["naître",  "né(e)(s)",   "Il est né en 2000."],
            ["mourir",  "mort(e)(s)", "Elle est morte."],
            ["rester",  "resté(e)(s)","Nous sommes restés."],
            ["tomber",  "tombé(e)(s)","Je suis tombé(e)."],
          ]}
        />

        <SectionTitle text="Phủ định ở Passé composé" />
        <Note text="ne...pas kẹp xung quanh AVOIR/ÊTRE: Je n'ai pas mangé." color={T.red} />
        {[
          ["J'ai mangé une pizza.","Tôi đã ăn pizza."],
          ["Elle est venue hier.","Cô ấy đã đến hôm qua."],
          ["Nous n'avons pas dormi.","Chúng tôi đã không ngủ."],
          ["Tu as fini tes devoirs ?","Bạn đã làm xong bài tập chưa?"],
        ].map(([fr,vi])=><Phrase key={fr} fr={fr} vi={vi}/>)}
      </div>
    );

    case "demonstratifs": return (
      <div>
        <SectionTitle text="Tính từ chỉ định (Adjectifs démonstratifs)" />
        <Note text="Dùng để chỉ vào người/vật cụ thể: cái này, cái kia. Hòa hợp với giống và số của danh từ." color={T.orange} />
        <Table
          headers={["Giống / Số", "Dạng", "Trước nguyên âm / h câm", "Ví dụ"]}
          rows={[
            ["Đực số ít",   "ce",   "cet",  "ce livre / cet homme"],
            ["Cái số ít",   "cette","cette","cette robe / cette amie"],
            ["Số nhiều",    "ces",  "ces",  "ces enfants / ces amis"],
          ]}
        />
        <Note text="ce → cet trước nguyên âm hoặc h câm: cet appartement, cet hôtel" color={T.red} />

        <SectionTitle text="Ví dụ thực tế" />
        {[
          ["ce pull",          "cái áo len này"],
          ["cet imperméable",  "cái áo mưa này"],
          ["cette robe",       "cái váy này"],
          ["ces chaussures",   "đôi giày này"],
          ["Je veux ce livre.", "Tôi muốn cuốn sách này."],
          ["Tu aimes cette couleur ?","Bạn thích màu này không?"],
          ["Ces vêtements sont chers.","Những bộ quần áo này đắt."],
          ["Cet homme est sympa.","Người đàn ông này dễ mến."],
        ].map(([fr,vi])=><Phrase key={fr} fr={fr} vi={vi}/>)}
      </div>
    );

    case "pronominaux": return (
      <div>
        <SectionTitle text="Verbes pronominaux — Động từ phản thân" />
        <Note text="Cấu trúc: se + động từ. Đại từ phản thân thay đổi theo ngôi." color={T.teal} />
        <Table
          headers={["Ngôi", "Đại từ phản thân", "se lever (thức dậy)"]}
          rows={[
            ["je",        "me (m')", "je me lève"],
            ["tu",        "te (t')", "tu te lèves"],
            ["il/elle",   "se (s')", "il/elle se lève"],
            ["nous",      "nous",    "nous nous levons"],
            ["vous",      "vous",    "vous vous levez"],
            ["ils/elles", "se (s')", "ils/elles se lèvent"],
          ]}
        />

        <SectionTitle text="Động từ phản thân thường dùng nhất" />
        {[
          ["se réveiller",       "thức dậy"],
          ["se lever",           "ngồi dậy"],
          ["se laver",           "rửa (mặt, tay...)"],
          ["se doucher",         "tắm vòi sen"],
          ["se brosser les dents","đánh răng"],
          ["se coiffer",         "chải đầu"],
          ["se maquiller",       "trang điểm"],
          ["s'habiller",         "mặc quần áo"],
          ["se préparer",        "chuẩn bị"],
          ["se coucher",         "đi ngủ / nằm xuống"],
          ["s'appeler",          "tên là"],
          ["se promener",        "dạo chơi"],
        ].map(([fr,vi])=><Phrase key={fr} fr={fr} vi={vi}/>)}

        <SectionTitle text="Phủ định" />
        <Note text="ne...pas kẹp xung quanh đại từ phản thân + động từ:" color={T.red} />
        {[
          ["Je ne me lève pas tôt.", "Tôi không dậy sớm."],
          ["Elle ne se maquille pas.", "Cô ấy không trang điểm."],
        ].map(([fr,vi])=><Phrase key={fr} fr={fr} vi={vi}/>)}
      </div>
    );

    case "imperatif": return (
      <div>
        <SectionTitle text="L'impératif — Câu mệnh lệnh" />
        <Note text="Chỉ chia 3 ngôi: tu, nous, vous. Bỏ đại từ chủ ngữ." color={T.red} />
        <Table
          headers={["Ngôi", "parler", "finir", "prendre"]}
          rows={[
            ["tu",   "Parle !",   "Finis !",   "Prends !"],
            ["nous", "Parlons !", "Finissons !","Prenons !"],
            ["vous", "Parlez !",  "Finissez !","Prenez !"],
          ]}
        />
        <Note text="Động từ -ER: ngôi 'tu' bỏ -s cuối: parle (không phải parles)" color={T.orange} />

        <SectionTitle text="Động từ bất quy tắc" />
        <Table
          headers={["Động từ", "tu", "nous", "vous"]}
          rows={[
            ["être",  "Sois !",  "Soyons !", "Soyez !"],
            ["avoir", "Aie !",   "Ayons !",  "Ayez !"],
            ["aller", "Va !",    "Allons !", "Allez !"],
            ["savoir","Sache !", "Sachons !", "Sachez !"],
          ]}
        />

        <SectionTitle text="Phủ định mệnh lệnh" />
        <Note text="Cấu trúc: Ne + động từ + pas" color={T.red} />
        {[
          ["Écoute !", "Nghe này!"],
          ["Écoutez !", "Các bạn hãy nghe!"],
          ["N'écoute pas !", "Đừng nghe!"],
          ["Soyez ponctuels !", "Hãy đúng giờ!"],
          ["Allons-y !", "Đi thôi!"],
          ["Ne fumez pas !", "Không hút thuốc!"],
          ["Prenez à gauche.", "Rẽ trái."],
          ["Continuez tout droit.", "Đi thẳng."],
        ].map(([fr,vi])=><Phrase key={fr} fr={fr} vi={vi}/>)}

        <SectionTitle text="Obligation / Interdiction (Unité 7)" />
        <Table
          headers={["Cấu trúc", "Nghĩa", "Ví dụ"]}
          rows={[
            ["il est interdit de + inf.", "bị cấm", "Il est interdit de fumer."],
            ["défense de + inf.",         "cấm",    "Défense d'entrer."],
            ["ne pas + inf.",             "không được","Ne pas stationner."],
            ["merci de + inf.",           "xin vui lòng","Merci de fermer la porte."],
            ["prière de + inf.",          "xin vui lòng (trang trọng)","Prière de ne pas déranger."],
          ]}
        />
      </div>
    );

    case "passe_recent": return (
      <div>
        <SectionTitle text="Passé récent — Vừa mới làm gì" />
        <Note text="Cấu trúc: venir de + infinitif → diễn tả hành động vừa xảy ra" color={T.green} />
        <Table
          headers={["Ngôi", "Venir", "Ví dụ"]}
          rows={[
            ["je",        "viens de",  "Je viens de manger."],
            ["tu",        "viens de",  "Tu viens de partir ?"],
            ["il/elle",   "vient de",  "Elle vient de téléphoner."],
            ["nous",      "venons de", "Nous venons d'arriver."],
            ["vous",      "venez de",  "Vous venez de finir ?"],
            ["ils/elles", "viennent de","Ils viennent de sortir."],
          ]}
        />

        <SectionTitle text="Ví dụ thực tế" />
        {[
          ["Je viens de me lever.",           "Tôi vừa mới dậy."],
          ["Il vient de manger.",             "Anh ấy vừa ăn xong."],
          ["Nous venons d'arriver à Paris.",  "Chúng tôi vừa đến Paris."],
          ["Elle vient de finir ses études.", "Cô ấy vừa tốt nghiệp."],
          ["Ils viennent de partir.",         "Họ vừa mới đi."],
        ].map(([fr,vi])=><Phrase key={fr} fr={fr} vi={vi}/>)}

        <Note text="Phủ định: Je ne viens pas de dormir. (ne...pas kẹp venir)" color={T.red} />

        <SectionTitle text="So sánh 3 thì thường dùng" />
        <Table
          headers={["Thì", "Cấu trúc", "Ý nghĩa"]}
          rows={[
            ["Passé récent",  "venir de + inf.",        "Vừa xảy ra xong"],
            ["Présent",       "động từ chia hiện tại",  "Đang xảy ra / thói quen"],
            ["Futur proche",  "aller + inf.",            "Sắp xảy ra"],
          ]}
        />
      </div>
    );

    case "comparaison": return (
      <div>
        <SectionTitle text="La comparaison — So sánh tính từ" />
        <Note text="Cấu trúc: plus / moins / aussi + adjectif + que" color={T.gold} />
        <Table
          headers={["Loại so sánh", "Cấu trúc", "Ví dụ"]}
          rows={[
            ["Hơn",   "plus + adj + que",  "Paris est plus grand que Lyon."],
            ["Kém",   "moins + adj + que", "Cette robe est moins chère que l'autre."],
            ["Bằng",  "aussi + adj + que", "Il est aussi grand que moi."],
          ]}
        />

        <SectionTitle text="Bất quy tắc — bon et mauvais" />
        <Table
          headers={["Tính từ", "So sánh hơn", "Cấp cao nhất"]}
          rows={[
            ["bon(ne)",     "meilleur(e) que",  "le/la meilleur(e)"],
            ["mauvais(e)",  "pire que",         "le/la pire"],
          ]}
        />
        {[
          ["Ce restaurant est meilleur que l'autre.", "Nhà hàng này ngon hơn cái kia."],
          ["C'est la meilleure pizza de Paris !",     "Đây là pizza ngon nhất Paris!"],
          ["Ce film est pire que le premier.",        "Bộ phim này tệ hơn phần trước."],
        ].map(([fr,vi])=><Phrase key={fr} fr={fr} vi={vi}/>)}

        <SectionTitle text="Giới từ provenance (Unité 9) — de / d' / du / des" />
        <Note text="Khi nói xuất phát từ đâu: venir de, partir de, arriver de..." color={T.teal} />
        <Table
          headers={["Loại địa danh", "Giới từ", "Ví dụ"]}
          rows={[
            ["Thành phố",         "de / d'",     "Je viens de Paris / d'Oslo."],
            ["Quốc gia giống cái","de / d'",     "Il arrive de France / d'Italie."],
            ["Quốc gia giống đực","du",          "Elle vient du Japon."],
            ["Quốc gia số nhiều", "des",         "Nous revenons des États-Unis."],
          ]}
        />

        <SectionTitle text="Imparfait impersonnel (Unité 9)" />
        <Note text="Mô tả thời tiết / bối cảnh trong quá khứ" color={T.orange} />
        {[
          ["Il faisait beau.",     "Trời đẹp (hồi đó)."],
          ["Il faisait chaud.",    "Trời nóng (hồi đó)."],
          ["Il y avait du vent.",  "Có gió (hồi đó)."],
          ["C'était magnifique !", "Thật tuyệt vời!"],
        ].map(([fr,vi])=><Phrase key={fr} fr={fr} vi={vi}/>)}
      </div>
    );

    case "pronoms_rel": return (
      <div>
        <SectionTitle text="Pronoms relatifs — Đại từ quan hệ" />
        <Note text="Dùng để nối hai mệnh đề, tránh lặp từ." color={T.blue} />
        <Table
          headers={["Đại từ", "Chức năng", "Ví dụ"]}
          rows={[
            ["qui",  "Chủ ngữ của mệnh đề quan hệ",  "C'est l'homme qui parle."],
            ["que",  "Tân ngữ trực tiếp (COD)",        "Le film que j'aime est français."],
          ]}
        />

        <SectionTitle text="QUI — thay thế chủ ngữ" />
        <Note text="qui đứng trước động từ của mệnh đề quan hệ" color={T.blue} />
        {[
          ["J'ai un ami qui parle vietnamien.",       "Tôi có người bạn nói tiếng Việt."],
          ["C'est le professeur qui explique bien.",  "Đó là giáo viên giải thích hay."],
          ["Il cherche quelqu'un qui connaît Paris.", "Anh ấy tìm người biết Paris."],
        ].map(([fr,vi])=><Phrase key={fr} fr={fr} vi={vi}/>)}

        <SectionTitle text="QUE — thay thế tân ngữ (COD)" />
        <Note text="que / qu' đứng trước chủ ngữ mới. Trước nguyên âm: qu'" color={T.purple} />
        {[
          ["Le livre que je lis est intéressant.",   "Cuốn sách tôi đang đọc thú vị."],
          ["La robe qu'elle achète est rouge.",      "Cái váy cô ấy mua màu đỏ."],
          ["C'est le film que tu m'as recommandé ?","Đây là bộ phim bạn giới thiệu cho tôi?"],
        ].map(([fr,vi])=><Phrase key={fr} fr={fr} vi={vi}/>)}

        <SectionTitle text="COD (2) — pronoms me / te / nous / vous (Unité 10)" />
        <Note text="Đại từ COD ngôi 1 và 2 đứng TRƯỚC động từ" color={T.orange} />
        <Table
          headers={["Ngôi", "COD", "Ví dụ"]}
          rows={[
            ["je",   "me / m'", "Il me regarde. / Il m'aide."],
            ["tu",   "te / t'", "Je te vois. / Je t'entends."],
            ["nous", "nous",    "Il nous invite."],
            ["vous", "vous",    "Je vous remercie."],
          ]}
        />
        {[
          ["Il me téléphone tous les soirs.", "Anh ấy gọi điện cho tôi mỗi tối."],
          ["Elle nous attend devant la gare.", "Cô ấy đợi chúng tôi trước ga."],
          ["Je vous comprends très bien.",    "Tôi hiểu các bạn rất rõ."],
        ].map(([fr,vi])=><Phrase key={fr} fr={fr} vi={vi}/>)}
      </div>
    );

    default: return null;
  }
}

// ── Main ──────────────────────────────────────────────────────
// Export TOPICS and TopicContent for reuse in EditoGrammarPanel
// TOPICS and TopicContent available internally only

// Optional props: allowedTopics (string[]), defaultTopic (string), hideTabBar (bool)
export default function GrammarCheatsheet({ allowedTopics = null, defaultTopic = null, hideTabBar = false }) {
  const visibleTopics = allowedTopics
    ? TOPICS.filter(t => allowedTopics.includes(t.id))
    : TOPICS;
  const firstTopic = visibleTopics[0]?.id || "pronoms";

  const [active, setActive] = useState(defaultTopic || firstTopic);
  const tabRef = useRef(null);

  const scroll = (dir) => {
    if (tabRef.current) tabRef.current.scrollBy({ left: dir * 160, behavior: "smooth" });
  };

  const pick = (id) => {
    setActive(id);
    setTimeout(() => {
      const el = tabRef.current?.querySelector(`[data-id="${id}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }, 50);
  };

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      {/* Header — only shown in standalone mode */}
      {!allowedTopics && (
        <div style={{ padding: "0.85rem 1rem 0.5rem" }}>
          <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1.05rem", color: C.ink, fontWeight: 700, marginBottom: "0.15rem" }}>
            📋 Bảng tra cứu ngữ pháp A1
          </div>
          <div style={{ fontSize: "0.72rem", color: C.gray }}>Chọn chủ đề · Không cần AI · Tra nhanh</div>
        </div>
      )}

      {/* Tab bar — hidden when embedded (parent controls topic selection) */}
      {!hideTabBar && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.5rem 0.75rem" }}>
          <button onClick={() => scroll(-1)}
            style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", border: `1.5px solid ${C.border}`, background: C.white, color: C.gray, fontSize: "0.8rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
            ‹
          </button>
          <div ref={tabRef} style={{ overflowX: "auto", display: "flex", gap: "0.35rem", flex: 1, scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {visibleTopics.map(t => (
              <button key={t.id} data-id={t.id} onClick={() => pick(t.id)}
                style={{ flexShrink: 0, padding: "0.35rem 0.7rem", background: active === t.id ? t.color : C.white, border: `1.5px solid ${active === t.id ? t.color : C.border}`, color: active === t.id ? "#fff" : C.gray, borderRadius: 20, fontSize: "0.72rem", cursor: "pointer", fontFamily: "inherit", fontWeight: active === t.id ? 700 : 400, whiteSpace: "nowrap", transition: "all 0.15s" }}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
          <button onClick={() => scroll(1)}
            style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", border: `1.5px solid ${C.border}`, background: C.white, color: C.gray, fontSize: "0.8rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
            ›
          </button>
        </div>
      )}

      {/* Content */}
      <div style={{ padding: "0 1rem 5rem", animation: "fadeUp 0.2s ease" }} key={active}>
        <TopicContent id={active} />
      </div>
    </div>
  );
}
