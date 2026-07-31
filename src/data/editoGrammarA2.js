// Edito A2 — Grammar points organized by unit (aligned with Édito A2 Didier FLE, 2e édition)
// Unit ids are prefixed "b" (b1, b2, …) — see editoVocabA2.js for why.
//
// Each point uses a STRUCTURED `blocks` array instead of one long text blob, so
// GrammarBlocks.jsx can render real tables, formula boxes, comparison rows etc.
// Block types: lead · text · formula · cards · table · pairs · compare · callout · timeline
// See GrammarBlocks.jsx for the renderer of each type.

export const GRAMMAR_A2_EMOJIS = { b1: "🌱" };

export const EDITO_GRAMMAR_A2 = [
  {
    id:"b1", num:"1", title:"Nouvelles vies", points:[

      // ── 1. Le passé composé ──────────────────────────────────
      {
        topic:"Le passé composé — Kể chuyện đã xảy ra",
        summary:"Thì dùng để kể một việc ĐÃ XONG trong quá khứ. Giống chữ “đã” của tiếng Việt, nhưng phải ghép 2 mảnh: một trợ động từ + một dạng đặc biệt của động từ.",
        blocks:[
          { type:"lead", text:"Tiếng Việt chỉ cần thêm chữ “đã”: *Tôi đã ăn.* Tiếng Pháp không có chữ nào như vậy — thay vào đó bạn phải ghép **hai mảnh** lại. Đó chính là passé composé (“quá khứ ghép”)." },

          { type:"formula",
            parts:["Chủ ngữ", "AVOIR hoặc ÊTRE", "participe passé"],
            example:"J'ai mangé. — Tôi đã ăn.",
            note:"Mảnh giữa (avoir/être) chia ở thì HIỆN TẠI. Mảnh cuối là dạng quá khứ của động từ chính, không đổi theo ngôi." },

          { type:"callout", variant:"note", title:"Vậy khi nào dùng?",
            text:"Khi việc đó đã xảy ra và ĐÃ KẾT THÚC — một lần, tại một thời điểm cụ thể. “Hôm qua tôi gặp cô ấy”, “Năm 2008 họ quen nhau”, “Cô ấy sinh năm 1977”." },

          { type:"heading", text:"Bước khó nhất: chọn AVOIR hay ÊTRE?" },
          { type:"text", text:"Đây là chỗ ai học cũng vấp. Chỉ có 3 trường hợp, và bạn chỉ cần nhớ 2 cái sau (còn lại mặc định là avoir):" },

          { type:"cards", items:[
            { badge:"1", color:"#4A90D9", title:"Đa số động từ → AVOIR",
              lines:["Đây là mặc định. Không thuộc 2 nhóm dưới thì dùng avoir.","Participe passé GIỮ NGUYÊN, không thêm gì cả."],
              examples:[
                { fr:"Elle a décidé de revenir.", vi:"Cô ấy đã quyết định quay lại." },
                { fr:"Ils ont fait connaissance en 2008.", vi:"Họ đã làm quen năm 2008." },
              ] },
            { badge:"2", color:"#10B981", title:"17 động từ chuyển động / thay đổi → ÊTRE",
              lines:["Là các động từ nói về ĐI–ĐẾN–VÀO–RA–LÊN–XUỐNG, và SINH–TỬ–Ở LẠI.","aller · arriver · descendre · devenir · entrer · monter · mourir · naître · partir · passer · rentrer · rester · retourner · revenir · sortir · tomber · venir","⚠️ Participe passé phải HỢP với chủ ngữ: chủ ngữ nữ thêm -e, số nhiều thêm -s."],
              examples:[
                { fr:"Elle est rentrée à Rome.", vi:"Cô ấy đã về Rome. (thêm -e vì “elle”)" },
                { fr:"Ils sont tombés amoureux.", vi:"Họ đã phải lòng nhau. (thêm -s vì “ils”)" },
              ] },
            { badge:"3", color:"#F5A623", title:"Động từ phản thân (se…) → luôn ÊTRE",
              lines:["Là các động từ có “se” phía trước: se marier, s'installer, se rencontrer, se séparer…","Cũng phải hợp với chủ ngữ giống nhóm 2."],
              examples:[
                { fr:"Je me suis installée à Lyon.", vi:"Tôi đã chuyển đến Lyon sống. (người nữ nói)" },
                { fr:"Nous nous sommes séparés.", vi:"Chúng tôi đã chia tay." },
              ] },
          ] },

          { type:"callout", variant:"tip", title:"Mẹo nhớ 17 động từ ÊTRE",
            text:"Hình dung một CĂN NHÀ: bạn đến (arriver), vào (entrer), lên lầu (monter), xuống (descendre), ở lại (rester), ra ngoài (sortir), rời đi (partir), quay về (revenir)… Tất cả chuyển động ra vào căn nhà đó đều dùng être. Cộng thêm sinh (naître) và mất (mourir) — vào đời và rời đời." },

          { type:"heading", text:"Mảnh thứ hai: tạo participe passé thế nào?" },
          { type:"table",
            caption:"Động từ có quy tắc — nhìn đuôi mà đổi",
            headers:["Đuôi động từ", "Đổi thành", "Ví dụ"],
            rows:[
              ["-ER", "-É", "jouer → joué · raconter → raconté"],
              ["-IR", "-I", "choisir → choisi · grandir → grandi · sortir → sorti"],
              ["-RE / -DRE / -OIR", "-U", "lire → lu · perdre → perdu · vouloir → voulu"],
            ] },

          { type:"table",
            caption:"Bất quy tắc — phải học thuộc (hay gặp nhất)",
            headers:["Động từ", "Participe passé", "Động từ", "Participe passé"],
            rows:[
              ["avoir", "eu", "naître", "né"],
              ["être", "été", "mourir", "mort"],
              ["faire", "fait", "ouvrir", "ouvert"],
              ["dire", "dit", "prendre", "pris"],
              ["écrire", "écrit", "recevoir", "reçu"],
              ["mettre", "mis", "vivre", "vécu"],
              ["devoir", "dû", "(de)venir", "(de)venu"],
            ] },

          { type:"heading", text:"Lỗi hay gặp nhất" },
          { type:"compare", items:[
            { wrong:"Elle a née en 2000.", right:"Elle est née en 2000.", why:"naître nằm trong 17 động từ ÊTRE, không dùng avoir." },
            { wrong:"Il a resté chez lui.", right:"Il est resté chez lui.", why:"rester cũng thuộc nhóm ÊTRE." },
            { wrong:"Nous avons nous mariés.", right:"Nous nous sommes mariés.", why:"Động từ phản thân (se marier) luôn dùng être." },
            { wrong:"Elle est allé à Paris.", right:"Elle est allée à Paris.", why:"Dùng être thì participe phải hợp giống — “elle” là nữ nên thêm -e." },
          ] },
        ],
        examples:[
          "Tu as lu le roman de Gaël Faye ? — Bạn đã đọc tiểu thuyết của Gaël Faye chưa?",
          "Ma sœur a eu 18 ans hier, elle a fait une grande fête. — Chị tôi vừa tròn 18 tuổi hôm qua, chị ấy đã tổ chức một bữa tiệc lớn.",
          "Elle est allée en Angleterre pour finir ses études, puis elle est rentrée en France. — Cô ấy đã sang Anh để hoàn thành việc học, rồi trở về Pháp.",
          "Marine et Éric se sont mariés le week-end dernier. — Marine và Éric đã kết hôn vào cuối tuần trước.",
          "Elle est née le 3 avril 1977 et elle a grandi en banlieue parisienne. — Cô ấy sinh ngày 3 tháng 4 năm 1977 và lớn lên ở ngoại ô Paris.",
        ]
      },

      // ── 2. La phrase négative ────────────────────────────────
      {
        topic:"La phrase négative — Phủ định nâng cao",
        summary:"Ở A1 bạn đã biết ne… pas (“không”). Giờ chỉ cần THAY chữ “pas” bằng chữ khác là được nghĩa mới: không gì cả / không ai cả / không bao giờ / không… nữa.",
        blocks:[
          { type:"lead", text:"Tin vui: bạn **không phải học cấu trúc mới**. Khung `ne … ___` vẫn y nguyên như A1 — chỉ đổi chữ nằm ở chỗ trống là ra nghĩa khác." },

          { type:"formula",
            parts:["ne", "động từ", "rien / personne / jamais / plus"],
            example:"Je ne fais rien. — Tôi không làm gì cả.",
            note:"So sánh với A1: Je ne fais pas… → chỉ thay “pas” thành “rien”." },

          { type:"heading", text:"4 chữ cần nhớ — và cặp khẳng định của nó" },
          { type:"table",
            caption:"Học theo cặp sẽ nhớ nhanh hơn học riêng lẻ",
            headers:["Muốn nói", "Câu khẳng định", "Câu phủ định"],
            rows:[
              ["không gì cả", "quelque chose (cái gì đó)", "ne… rien"],
              ["không ai cả", "quelqu'un / tout le monde", "ne… personne"],
              ["không bao giờ", "toujours · souvent · déjà", "ne… jamais"],
              ["không… nữa", "toujours · encore (vẫn còn)", "ne… plus"],
            ] },

          { type:"pairs", caption:"Nghe thử 4 câu này", items:[
            { fr:"Elle ne boit rien.", vi:"Cô ấy không uống gì cả." },
            { fr:"Je ne connais personne ici.", vi:"Tôi không quen ai ở đây cả." },
            { fr:"Nous n'allons jamais au théâtre.", vi:"Chúng tôi không bao giờ đi nhà hát." },
            { fr:"Il ne fait plus de boxe.", vi:"Anh ấy không đánh boxing nữa. (trước có, giờ nghỉ rồi)" },
          ] },

          { type:"heading", text:"Ở passé composé, chữ phủ định đứng ở đâu?" },
          { type:"text", text:"Đây là điểm dễ sai nhất. Câu passé composé có 2 mảnh (trợ động từ + participe). Quy tắc: **phủ định ôm lấy TRỢ ĐỘNG TỪ**, không ôm participe." },

          { type:"cards", items:[
            { badge:"✓", color:"#10B981", title:"rien · jamais · plus · pas → kẹp giữa",
              lines:["Đặt ngay trước và ngay sau trợ động từ (ai / as / a / est / sommes…)."],
              examples:[
                { fr:"Il n'a rien mangé.", vi:"Anh ấy không ăn gì cả." },
                { fr:"Je ne suis jamais allé à ce festival.", vi:"Tôi chưa từng đến lễ hội này." },
              ] },
            { badge:"!", color:"#E8574A", title:"personne → ngoại lệ, đứng CUỐI",
              lines:["Khi làm tân ngữ, “personne” luôn nhảy ra sau participe passé — khác hẳn 3 chữ trên.","Khi làm chủ ngữ thì lại đứng đầu câu."],
              examples:[
                { fr:"Je n'ai rencontré personne.", vi:"Tôi đã không gặp ai cả. (tân ngữ → cuối câu)" },
                { fr:"Personne n'est venu.", vi:"Không ai đến cả. (chủ ngữ → đầu câu)" },
              ] },
          ] },

          { type:"callout", variant:"warn", title:"Đừng quên: mạo từ đổi thành “de”",
            text:"Giống quy tắc đã học ở A1 với ne…pas — sau phủ định, các mạo từ un / une / du / de la / des đều đổi thành de (hoặc d' trước nguyên âm).\nJe fais du sport. → Je ne fais jamais de sport.\nIl a de l'argent. → Il n'a plus d'argent." },

          { type:"compare", items:[
            { wrong:"Je n'ai mangé rien.", right:"Je n'ai rien mangé.", why:"rien phải kẹp cùng trợ động từ, không để sau participe." },
            { wrong:"Je n'ai personne rencontré.", right:"Je n'ai rencontré personne.", why:"personne thì ngược lại — luôn đứng sau participe." },
            { wrong:"Il ne fait plus du sport.", right:"Il ne fait plus de sport.", why:"Sau phủ định, “du” đổi thành “de”." },
          ] },
        ],
        examples:[
          "Tu veux encore faire du vélo ? — Non, je ne veux plus faire de vélo. — Bạn còn muốn đạp xe không? — Không, tôi không muốn đạp nữa.",
          "Vous faites quelque chose ce week-end ? — Non, nous ne faisons rien. — Cuối tuần này bạn có làm gì không? — Không, chúng tôi không làm gì cả.",
          "Il y a quelqu'un dans la salle ? — Non, il n'y a personne. — Có ai trong phòng không? — Không, không có ai cả.",
          "Elle n'a jamais fait d'escalade. — Cô ấy chưa từng leo núi bao giờ.",
          "Ils n'ont invité personne à leur mariage. — Họ đã không mời ai đến đám cưới cả.",
        ]
      },

      // ── 3. Les indicateurs de temps ──────────────────────────
      {
        topic:"il y a · pendant · depuis — Ba cách nói về thời gian",
        summary:"Cả ba đều dịch na ná nhau sang tiếng Việt nên rất dễ lẫn. Cách phân biệt chắc chắn nhất: hỏi “việc này xong chưa, và mình đang nói về điều gì — điểm bắt đầu hay độ dài?”",
        blocks:[
          { type:"lead", text:"Đừng học thuộc nghĩa dịch — hãy hình dung trên **trục thời gian**. Mỗi từ chỉ một phần khác nhau của trục đó." },

          { type:"timeline", items:[
            { key:"il y a", color:"#E8574A", label:"CÁCH ĐÂY…",
              meaning:"Việc đã XONG HẲN. Đo khoảng cách từ lúc đó đến bây giờ.",
              question:"Việc đó xảy ra cách đây bao lâu?",
              example:{ fr:"J'ai fait ma première compétition il y a onze ans.", vi:"Tôi thi đấu lần đầu cách đây 11 năm." } },
            { key:"pendant", color:"#F5A623", label:"TRONG SUỐT…",
              meaning:"Đo ĐỘ DÀI của việc đó. Không quan tâm nó cách hiện tại bao xa.",
              question:"Việc đó kéo dài bao lâu?",
              example:{ fr:"Nous avons fait du canoë pendant quatre heures.", vi:"Chúng tôi chèo xuồng suốt bốn tiếng." } },
            { key:"depuis", color:"#10B981", label:"TỪ… ĐẾN GIỜ",
              meaning:"Việc BẮT ĐẦU trong quá khứ và VẪN CÒN đang diễn ra.",
              question:"Việc đó bắt đầu từ khi nào và còn tiếp không?",
              example:{ fr:"J'habite à Lyon depuis trois ans.", vi:"Tôi sống ở Lyon được ba năm rồi (và vẫn đang ở)." } },
          ] },

          { type:"callout", variant:"tip", title:"Câu hỏi thần kỳ để chọn đúng",
            text:"Tự hỏi: “Việc này CÒN đang diễn ra không?”\n• Còn đang diễn ra → depuis\n• Đã xong rồi, muốn nói cách đây bao lâu → il y a\n• Đã xong rồi, muốn nói nó kéo dài bao lâu → pendant" },

          { type:"heading", text:"Cùng một tình huống, ba cách nói" },
          { type:"pairs", caption:"Để ý nghĩa thay đổi thế nào", items:[
            { fr:"J'ai travaillé là-bas il y a deux ans.", vi:"Tôi làm ở đó cách đây 2 năm. (giờ nghỉ rồi)" },
            { fr:"J'ai travaillé là-bas pendant deux ans.", vi:"Tôi đã làm ở đó suốt 2 năm. (giờ nghỉ rồi, nói về độ dài)" },
            { fr:"Je travaille là-bas depuis deux ans.", vi:"Tôi làm ở đó được 2 năm rồi. (vẫn đang làm)" },
          ] },

          { type:"compare", items:[
            { wrong:"J'habite à Paris pendant 2020.", right:"J'habite à Paris depuis 2020.", why:"Vẫn đang sống ở đó → phải dùng depuis." },
            { wrong:"Il a travaillé là-bas depuis un an, maintenant il est parti.", right:"Il a travaillé là-bas pendant un an.", why:"Đã nghỉ rồi, chỉ nói độ dài → pendant." },
          ] },

          { type:"callout", variant:"note", title:"Lưu ý nhỏ về thì",
            text:"depuis thường đi với thì HIỆN TẠI (vì việc còn tiếp diễn): *Je travaille depuis…* — trong khi il y a và pendant thường đi với passé composé (việc đã xong)." },
        ],
        examples:[
          "Mon frère est aux Francofolies depuis mardi. — Anh trai tôi ở Francofolies từ thứ Ba (và vẫn còn ở đó).",
          "Hier, nous avons fait du canoë pendant quatre heures. — Hôm qua chúng tôi đã chèo xuồng suốt bốn tiếng.",
          "J'ai déjà fait cette randonnée il y a deux ans. — Tôi đã đi chuyến trekking này cách đây hai năm.",
          "Les places sont en vente depuis hier. — Vé được bán từ hôm qua đến giờ.",
        ]
      },
    ]
  },
];
