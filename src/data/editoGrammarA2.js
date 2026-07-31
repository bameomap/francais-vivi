// Edito A2 — Grammar points organized by unit (aligned with Édito A2 Didier FLE, 2e édition)
// Unit ids are prefixed "b" (b1, b2, …) — see editoVocabA2.js for why.
export const GRAMMAR_A2_EMOJIS = { b1: "🌱" };

export const EDITO_GRAMMAR_A2 = [
  {
    id:"b1", num:"1", title:"Nouvelles vies", points:[
      {
        topic:"Le passé composé — Cách dùng và cách chia",
        rule:`PASSÉ COMPOSÉ = thì quá khứ dùng để kể một hành động ĐÃ XẢY RA VÀ KẾT THÚC tại một thời điểm cụ thể trong quá khứ.

CÔNG THỨC:
Chủ ngữ + AVOIR hoặc ÊTRE (chia ở hiện tại) + participe passé (phân từ quá khứ)

BA NHÓM ĐỘNG TỪ, BA CÁCH CHỌN TRỢ ĐỘNG TỪ

🔵 1. Đa số động từ chia với AVOIR
Phân từ quá khứ KHÔNG chia theo giống/số của chủ ngữ.
Elle a décidé de revenir en France. — Cô ấy đã quyết định trở về Pháp.
Ils ont fait connaissance en 2008. — Họ đã làm quen với nhau vào năm 2008.

🟢 2. 17 động từ chuyển động/thay đổi trạng thái chia với ÊTRE
aller, arriver, descendre, devenir, entrer, monter, mourir, naître, partir,
passer, rentrer, rester, retourner, revenir, sortir, tomber, venir
Phân từ quá khứ CHIA theo giống/số của chủ ngữ (thêm -e nếu chủ ngữ nữ, -s nếu số nhiều).
Elle est rentrée à Rome. — Cô ấy đã trở về Rome. (thêm -e vì "elle")
Ils sont tombés amoureux. — Họ đã phải lòng nhau. (thêm -s vì "ils")

🟡 3. Động từ phản thân (verbes pronominaux: se marier, s'installer, se rencontrer…) LUÔN chia với ÊTRE
Phân từ quá khứ cũng chia theo chủ ngữ, tương tự nhóm 2.
Je me suis installée à Lyon. — Tôi đã định cư ở Lyon. (nói, người nữ)
Nous nous sommes séparés. — Chúng tôi đã chia tay.

CÁCH TẠO PHÂN TỪ QUÁ KHỨ (participe passé) — ĐỘNG TỪ CÓ QUY TẮC
• Động từ -ER → -É : jouer → joué, raconter → raconté
• Động từ -IR → -I : choisir → choisi, grandir → grandi, sortir → sorti
• Động từ -RE/-DRE/-OIR → -U : lire → lu, perdre → perdu, vouloir → voulu

PHÂN TỪ QUÁ KHỨ BẤT QUY TẮC — PHẢI HỌC THUỘC
avoir → eu · devoir → dû · dire → dit · écrire → écrit · être → été
faire → fait · mettre → mis · mourir → mort · naître → né · ouvrir → ouvert
prendre → pris · recevoir → reçu · (ob)tenir → (ob)tenu · (de)venir → (de)venu · vivre → vécu

⚠️ LỖI HAY GẶP
❌ Elle a née en 2000.        ✅ Elle est née en 2000. (naître chia với ÊTRE!)
❌ Il a resté chez lui.        ✅ Il est resté chez lui. (rester chia với ÊTRE!)
❌ Nous avons nous mariés.    ✅ Nous nous sommes mariés. (động từ phản thân luôn ÊTRE)`,
        examples:[
          "Tu as lu le roman de Gaël Faye ? — Bạn đã đọc tiểu thuyết của Gaël Faye chưa?",
          "Ma sœur a eu 18 ans hier, elle a fait une grande fête. — Chị tôi vừa tròn 18 tuổi hôm qua, chị ấy đã tổ chức một bữa tiệc lớn.",
          "Elle est allée en Angleterre pour finir ses études, puis elle est rentrée en France. — Cô ấy đã sang Anh để hoàn thành việc học, rồi trở về Pháp.",
          "Marine et Éric se sont mariés le week-end dernier. — Marine và Éric đã kết hôn vào cuối tuần trước.",
          "Elle est née le 3 avril 1977 et elle a grandi en banlieue parisienne. — Cô ấy sinh ngày 3 tháng 4 năm 1977 và lớn lên ở ngoại ô Paris.",
        ]
      },
      {
        topic:"La phrase négative — ne… rien / personne / jamais / plus",
        rule:`Ngoài "ne… pas" đã học ở A1, tiếng Pháp có nhiều cấu trúc phủ định khác để diễn tả "KHÔNG GÌ CẢ", "KHÔNG AI CẢ", "KHÔNG BAO GIỜ", "KHÔNG… NỮA".

BẢNG 4 CẤU TRÚC PHỦ ĐỊNH MỚI

| Phủ định cho... | Khẳng định | Phủ định |
|---|---|---|
| một sự việc | quelque chose (có gì đó) | ne… rien (không gì cả) |
| một người | quelqu'un / tout le monde (có ai đó / mọi người) | ne… personne (không ai cả) |
| tần suất/thời gian | toujours, souvent, déjà (luôn, thường, đã từng) | ne… jamais (không bao giờ) |
| sự thay đổi | toujours, encore (vẫn, còn) | ne… plus (không… nữa) |

Elle ne boit rien. — Cô ấy không uống gì cả.
Je ne connais personne ici. — Tôi không quen ai ở đây cả.
Nous n'allons jamais au théâtre. — Chúng tôi không bao giờ đi nhà hát.
Il ne fait plus de boxe. — Anh ấy không đánh quyền anh nữa.

VỊ TRÍ CỦA PHỦ ĐỊNH

📍 Ở thì hiện tại: hai phần của phủ định đứng NGAY TRƯỚC và NGAY SAU động từ.
Je ne danse pas. / Je ne danse jamais.

📍 Ở passé composé (QUAN TRỌNG — khác với ne...pas ở A1!):
Với pas/plus/rien/jamais → hai phần phủ định đứng NGAY TRƯỚC và NGAY SAU trợ động từ (avoir/être), KHÔNG đứng sau participe passé.
Il n'a pas mangé. — Anh ấy đã không ăn.
Il n'a rien mangé. — Anh ấy đã không ăn gì cả.
Je ne suis jamais allé à ce festival. — Tôi chưa từng đến lễ hội này.

⚠️ RIÊNG "PERSONNE" — quy tắc khác biệt!
• Khi "personne" làm CHỦ NGỮ → đứng TRƯỚC động từ (ở cả hiện tại và passé composé):
  Personne n'est là. — Không có ai ở đây. / Personne n'est venu. — Không ai đến cả.
• Khi "personne" làm TÂN NGỮ (COD) → luôn đứng SAU participe passé (không như rien/jamais/plus):
  Je ne connais personne. — Tôi không quen ai cả.
  Je n'ai rencontré personne. — Tôi đã không gặp ai cả.

MẠO TỪ SAU PHỦ ĐỊNH — GHI NHỚ
Sau ne... rien/jamais/plus/pas, các mạo từ un/une/du/de la/de l'/des → đổi thành de/d' (như phủ định thường ở A1).
Je fais du sport. → Je ne fais jamais de sport. — Tôi không bao giờ chơi thể thao.
Il a de l'argent. → Il n'a plus d'argent. — Anh ấy không còn tiền nữa.`,
        examples:[
          "Tu veux encore faire du vélo ? — Non, je ne veux plus faire de vélo. — Bạn còn muốn đạp xe không? — Không, tôi không muốn đạp xe nữa.",
          "Vous faites quelque chose ce week-end ? — Non, nous ne faisons rien. — Cuối tuần này bạn có làm gì không? — Không, chúng tôi không làm gì cả.",
          "Il y a quelqu'un dans la salle ? — Non, il n'y a personne. — Có ai trong phòng không? — Không, không có ai cả.",
          "Elle a déjà fait de l'escalade. → Elle n'a jamais fait d'escalade. — Cô ấy chưa từng leo núi bao giờ.",
          "Ils ont invité tout le monde à leur mariage. → Ils n'ont invité personne à leur mariage. — Họ đã không mời ai đến đám cưới của họ cả.",
        ]
      },
      {
        topic:"Les indicateurs de temps — il y a / pendant / depuis",
        rule:`Ba từ này đều nói về THỜI GIAN nhưng dùng cho ba trường hợp KHÁC NHAU — rất dễ nhầm, cần phân biệt kỹ.

🔴 IL Y A + khoảng thời gian
= khoảng thời gian đã trôi qua GIỮA một sự việc ĐÃ KẾT THÚC và HIỆN TẠI.
Trả lời câu hỏi: việc đó xảy ra CÁCH ĐÂY bao lâu?
J'ai fait ma première compétition il y a onze ans. — Tôi đã thi đấu lần đầu cách đây 11 năm.
→ Nghĩa là: 11 năm đã trôi qua kể từ lúc đó cho tới bây giờ.

🟡 PENDANT + khoảng thời gian
= ĐỘ DÀI của một hành động/tình huống (đã xảy ra, đang xảy ra, hoặc sẽ xảy ra) — không quan tâm nó cách hiện tại bao lâu, chỉ nói nó KÉO DÀI bao lâu.
Pendant deux semaines, j'ai fait la connaissance de beaucoup d'athlètes. — Trong (suốt) hai tuần, tôi đã làm quen với nhiều vận động viên.

🟢 DEPUIS + thời điểm hoặc khoảng thời gian
= ĐIỂM BẮT ĐẦU của một hành động/tình trạng CÒN TIẾP TỤC đến hiện tại (khác pendant — depuis luôn có nghĩa "và vẫn còn đang diễn ra").
Les places sont en vente depuis hier. — Vé được bán từ hôm qua (đến giờ vẫn còn bán).
J'habite à Lyon depuis trois ans. — Tôi sống ở Lyon được ba năm rồi (và vẫn đang sống ở đó).

MẸO PHÂN BIỆT NHANH
• il y a → nhìn về QUÁ KHỨ, việc đã xong hẳn. (cách đây...)
• pendant → đo ĐỘ DÀI của một khoảng thời gian, không cần liên hệ hiện tại. (trong suốt...)
• depuis → có một ĐIỂM BẮT ĐẦU và hành động CÒN TIẾP DIỄN tới bây giờ. (từ... đến giờ)

⚠️ LỖI HAY GẶP
❌ J'habite à Paris pendant 2020.  ✅ J'habite à Paris depuis 2020. (còn đang sống ở đó → depuis)
❌ Il a travaillé là-bas depuis un an, maintenant il est parti.  ✅ Il a travaillé là-bas pendant un an. (đã kết thúc, chỉ nói độ dài → pendant)`,
        examples:[
          "Mon frère est aux Francofolies depuis mardi. — Anh trai tôi ở Francofolies từ thứ Ba (và vẫn còn ở đó).",
          "Hier, nous avons fait du canoë pendant quatre heures. — Hôm qua, chúng tôi đã chèo xuồng trong suốt bốn tiếng.",
          "J'ai déjà fait cette randonnée il y a deux ans. — Tôi đã đi trekking này cách đây hai năm rồi.",
          "Elle a vécu au Burundi, puis au Rwanda, puis en France. — Cô ấy đã sống ở Burundi, rồi Rwanda, rồi Pháp.",
        ]
      },
    ]
  },
];
