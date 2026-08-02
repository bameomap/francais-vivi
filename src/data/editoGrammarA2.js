// Edito A2 — Grammar points organized by unit (aligned with Édito A2 Didier FLE, 2e édition)
// Unit ids are prefixed "b" (b1, b2, …) — see editoVocabA2.js for why.
//
// Each point uses a STRUCTURED `blocks` array instead of one long text blob, so
// GrammarBlocks.jsx can render real tables, formula boxes, comparison rows etc.
// Block types: lead · text · formula · cards · table · pairs · compare · callout · timeline
// See GrammarBlocks.jsx for the renderer of each type.

export const GRAMMAR_A2_EMOJIS = { b1: "🌱", b2: "📷" };

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

  {
    id:"b2", num:"2", title:"Je me souviens", points:[

      // ── 1. L'imparfait ───────────────────────────────────────
      {
        topic:"L'imparfait — Kể thói quen & tả khung cảnh quá khứ",
        summary:"Một thì quá khứ HOÀN TOÀN KHÁC passé composé: không kể một việc đã XONG, mà tả một THÓI QUEN lặp đi lặp lại, hoặc VẼ RA khung cảnh xung quanh một câu chuyện. Chỉ có MỘT mảnh (không ghép 2 mảnh như passé composé).",
        blocks:[
          { type:"lead", text:"Passé composé trả lời câu “việc gì đã XẢY RA?”. Imparfait trả lời câu khác hẳn: “ngày xưa mọi việc THƯỜNG như thế nào?”, hoặc “lúc đó xung quanh trông RA SAO?”. Đây là thì để kể một thói quen hay vẽ phông nền, không phải để kể một sự kiện." },

          { type:"formula",
            parts:["Chủ ngữ", "gốc động từ (từ “nous” hiện tại)", "đuôi -ais/-ais/-ait/-ions/-iez/-aient"],
            example:"Je jouais au foot tous les week-ends. — Ngày xưa cứ cuối tuần là tôi lại đi đá bóng.",
            note:"Không ghép avoir/être như passé composé — imparfait chỉ có MỘT mảnh, chia trực tiếp trên động từ chính." },

          { type:"callout", variant:"note", title:"2 việc imparfait làm được",
            text:"1) Kể THÓI QUEN, việc LẶP LẠI trong quá khứ — “ngày nào cũng…”, “năm nào cũng…”.\n2) TẢ khung cảnh, cảm giác, ngoại hình lúc đó đang như thế nào — không phải một hành động, mà là một trạng thái kéo dài." },

          { type:"heading", text:"Cách chia: một quy tắc DUY NHẤT" },
          { type:"text", text:"Lấy động từ chia ở HIỆN TẠI với “nous”, bỏ đuôi “-ons”, được gốc (radical). Gắn 6 đuôi imparfait vào gốc đó. Chỉ CÓ MỘT ngoại lệ trong cả tiếng Pháp: être." },

          { type:"table",
            caption:"Từ “nous” hiện tại → gốc imparfait",
            headers:["Động từ", "nous (hiện tại)", "Gốc imparfait", "je (imparfait)"],
            rows:[
              ["avoir", "nous avons", "av-", "j'avais"],
              ["changer", "nous changeons", "chang(e)-", "je changeais"],
              ["se déplacer", "nous nous déplaçons", "déplac(e)-", "je me déplaçais"],
              ["faire", "nous faisons", "fais-", "je faisais"],
              ["aller", "nous allons", "all-", "j'allais"],
            ] },

          { type:"table",
            caption:"6 đuôi imparfait — học một lần dùng cho MỌI động từ",
            headers:["Ngôi", "avoir", "changer", "se déplacer"],
            rows:[
              ["je/j'", "avais", "changeais", "me déplaçais"],
              ["tu", "avais", "changeais", "te déplaçais"],
              ["il/elle/on", "avait", "changeait", "se déplaçait"],
              ["nous", "avions", "changions", "nous déplacions"],
              ["vous", "aviez", "changiez", "vous déplaciez"],
              ["ils/elles", "avaient", "changeaient", "se déplaçaient"],
            ] },

          { type:"callout", variant:"warn", title:"Ngoại lệ duy nhất: ÊTRE",
            text:"être không tuân theo quy tắc “bỏ -ons của nous” (vì “nous sommes” không cho ra gốc “ét-”). Gốc của être ở imparfait là ÉT-, phải học thuộc riêng: j'étais, tu étais, il était, nous étions, vous étiez, ils étaient." },

          { type:"heading", text:"Từ diễn tả thói quen — “tín hiệu” của imparfait" },
          { type:"text", text:"Khi thấy các cụm này trong câu, rất có thể động từ phải chia ở imparfait, vì chúng đánh dấu một việc LẶP LẠI đều đặn chứ không phải một lần:" },

          { type:"cards", items:[
            { badge:"⏱", color:"#4A90D9", title:"À cette époque, avant…",
              lines:["Đánh dấu một GIAI ĐOẠN trong quá khứ, không phải một thời điểm."],
              examples:[
                { fr:"À cette époque, j'habitais à Strasbourg.", vi:"Hồi đó tôi sống ở Strasbourg." },
              ] },
            { badge:"🔁", color:"#10B981", title:"chaque jour/semaine, tous les jours, toutes les semaines",
              lines:["Lặp lại theo chu kỳ đều đặn."],
              examples:[
                { fr:"Toutes les semaines, il y avait un match.", vi:"Tuần nào cũng có một trận đấu." },
              ] },
            { badge:"〰", color:"#F5A623", title:"souvent, beaucoup, de temps en temps, parfois, toujours, tout le temps",
              lines:["Tần suất — nhiều/ít, thường xuyên/thỉnh thoảng, nhưng luôn LẶP LẠI chứ không phải một lần."],
              examples:[
                { fr:"On se déplaçait beaucoup.", vi:"Hồi đó bọn tôi hay phải di chuyển." },
                { fr:"Il faisait toujours beau.", vi:"Lúc đó lúc nào trời cũng đẹp." },
              ] },
          ] },

          { type:"heading", text:"So sánh trực tiếp: imparfait ≠ passé composé" },
          { type:"compare", items:[
            { wrong:"Hier, je jouais au foot avec mes copains toute la journée. *(nếu muốn kể một LẦN cụ thể)*", right:"Hier, j'ai joué au foot avec mes copains toute la journée.", why:"“Hier” = MỘT ngày cụ thể, việc đã XONG → passé composé, không phải imparfait." },
            { wrong:"Quand j'étais petit, j'ai joué au foot tous les week-ends.", right:"Quand j'étais petit, je jouais au foot tous les week-ends.", why:"“tous les week-ends” = thói quen lặp lại nhiều lần → imparfait, không phải passé composé." },
            { wrong:"Il regardait sa montre et il a couru pour rentrer. *(nếu cả 2 vế đều là hành động đơn lẻ)*", right:"Il a regardé sa montre et il a couru pour rentrer.", why:"Nếu cả hai đều là hành động NHẤT THỜI (không phải tả khung cảnh) thì cả hai vế đều passé composé." },
          ] },

          { type:"callout", variant:"tip", title:"Mẹo phân biệt nhanh",
            text:"Tự hỏi: “Đây là MỘT LẦN đã xong, hay là một điều VẪN THƯỜNG như vậy?”\n• Một lần, đã xong → passé composé\n• Thường xuyên, lặp đi lặp lại, hoặc đang mô tả bối cảnh → imparfait\nHai thì này thường ĐI CHUNG với nhau trong cùng một câu chuyện: imparfait vẽ phông nền, passé composé kể sự kiện xảy ra trên phông nền đó." },
        ],
        examples:[
          "Ma grand-mère nous préparait des bugnes. — Ngày xưa bà tôi hay làm bánh bugnes cho chúng tôi. (thói quen)",
          "Il regardait sa montre pendant le trajet, avec cette inquiétude des gens qui sont toujours en retard. — Ông ấy cứ nhìn đồng hồ suốt chặng đường, với vẻ lo lắng của người hay trễ giờ. (tả khung cảnh)",
          "Nous nous voyions chaque jour. — Ngày đó ngày nào chúng tôi cũng gặp nhau.",
          "Quand j'étais petit, mes parents m'inscrivaient chaque année au foot. — Hồi bé, năm nào bố mẹ tôi cũng đăng ký cho tôi học đá bóng.",
        ]
      },

      // ── 2. Les pronoms y et en ────────────────────────────────
      {
        topic:"Les pronoms y et en — Thay cho một địa điểm đã nhắc tới",
        summary:"Hai đại từ nhỏ nhưng cực hay dùng, để KHÔNG PHẢI lặp lại tên một nơi chốn đã nói ở câu trước. Phân biệt bằng GIỚI TỪ đi trước tên nơi đó trong câu gốc: à/dans/sur/chez… → y ; de → en.",
        blocks:[
          { type:"lead", text:"Tiếng Việt hay lặp lại: “Bạn có đi biển không? — Có, tôi có đi biển.” Tiếng Pháp thay hẳn cụm nơi chốn bằng MỘT chữ duy nhất: y hoặc en, đặt ngay trước động từ." },

          { type:"formula",
            parts:["Chủ ngữ", "y / en", "động từ"],
            example:"Tu vas à l'île Maurice ? — Oui, j'y vais. — Bạn có đi đảo Maurice không? — Có, tôi có đi (đó).",
            note:"y/en luôn đứng ngay TRƯỚC động từ chia (hoặc trước trợ động từ nếu là passé composé), không phải ở cuối câu như trong tiếng Việt." },

          { type:"heading", text:"Chọn y hay en — nhìn giới từ ở câu hỏi/câu gốc" },
          { type:"table",
            caption:"Mẹo nhận diện: giới từ nào đứng trước nơi chốn?",
            headers:["Giới từ trong câu gốc", "Đại từ thay thế", "Ý nghĩa"],
            rows:[
              ["à, dans, sur, sous, chez…", "y", "Ở/đến/vào một nơi"],
              ["de (du/de la/des)", "en", "Từ một nơi (trở về, xuất phát)"],
            ] },

          { type:"cards", items:[
            { badge:"y", color:"#10B981", title:"y — thay nơi đi ĐẾN/ở TẠI",
              lines:["Thay danh từ có à, dans, sur, sous… đứng trước."],
              examples:[
                { fr:"Le climat est agréable sur cette île ? — Oui, il y est très agréable.", vi:"Khí hậu trên đảo này dễ chịu không? — Có, ở đó rất dễ chịu." },
                { fr:"Tu te promènes souvent au bord de l'eau ? — Oui, je m'y promène très souvent.", vi:"Bạn có hay đi dạo bờ nước không? — Có, tôi hay đi dạo ở đó lắm." },
              ] },
            { badge:"en", color:"#F5A623", title:"en — thay nơi đi TỪ/xuất phát",
              lines:["Thay danh từ có de/du/de la/des đứng trước."],
              examples:[
                { fr:"Tu reviens de la plage ? — Oui, j'en reviens à l'instant.", vi:"Bạn vừa từ bãi biển về à? — Đúng rồi, tôi vừa về xong." },
                { fr:"Il est parti du chalet à quelle heure ? — Il en est parti à 6 h.", vi:"Anh ấy rời khỏi nhà gỗ lúc mấy giờ? — Anh ấy rời đi lúc 6 giờ." },
              ] },
          ] },

          { type:"heading", text:"Ici / là / là-bas — cách khác để chỉ nơi chốn" },
          { type:"text", text:"Không chỉ có y/en: 3 trạng từ này cũng thay được một nơi chốn, đặc biệt khi muốn nhấn khoảng cách gần/xa với người nói." },
          { type:"pairs", caption:"ici = gần người nói · là/là-bas = xa hơn", items:[
            { fr:"Ici, il n'y a pas de place. Là non plus. Allons là-bas.", vi:"Ở đây không còn chỗ. Ở kia cũng không. Ta đi chỗ khác xa hơn đi." },
            { fr:"Tu vas toujours en vacances à l'île Maurice ? — Oui, j'y vais tous les étés. / J'y vais tous les étés.", vi:"Bạn vẫn hay đi nghỉ ở đảo Maurice à? — Ừ, hè nào tôi cũng đến đó." },
          ] },
          { type:"callout", variant:"note", title:"y và là-bas đôi khi thay nhau được",
            text:"Với nơi đã biết rõ trong hội thoại, có thể dùng y HOẶC là-bas — cả hai đều đúng, là-bas nhấn mạnh khoảng cách hơn một chút." },

          { type:"heading", text:"Lỗi hay gặp nhất" },
          { type:"compare", items:[
            { wrong:"J'y en vais.", right:"J'y vais.", why:"Chỉ dùng MỘT đại từ cho một nơi chốn — không ghép y và en cùng lúc trong câu này." },
            { wrong:"Je vais en.", right:"J'y vais.", why:"“Aller à” → y, không phải en. En chỉ dùng khi câu gốc có “de”." },
            { wrong:"Elle en est.", right:"Elle y est.", why:"“Être sur/dans/à” (ở tại) → y, không phải en (en là “từ đâu tới”)." },
          ] },
        ],
        examples:[
          "On y trouve des endroits calmes et magiques. — Ở đó có những chỗ yên tĩnh và kỳ diệu.",
          "On en revient enchanté ! — Đi về mà thấy mê mẩn luôn!",
          "Elle rentre de Bruxelles et elle en revient très contente ! — Cô ấy từ Bruxelles về và rất vui.",
          "Il part en Australie. Il y va avec sa sœur. — Anh ấy sang Úc. Anh ấy đi cùng chị gái.",
          "Nous adorons le bord de mer. Nous nous y baladons tous les soirs. — Chúng tôi mê bờ biển lắm. Tối nào cũng ra đó dạo.",
        ]
      },

      // ── 3. La place de l'adjectif ─────────────────────────────
      {
        topic:"La place de l'adjectif — Trước hay sau danh từ?",
        summary:"Quy tắc chung: tính từ đứng SAU danh từ. Nhưng một nhóm tính từ ngắn, quen thuộc lại đứng TRƯỚC — và đổi vị trí đôi khi còn đổi cả Ý NGHĨA của câu.",
        blocks:[
          { type:"lead", text:"Tiếng Việt luôn nói “cái áo đẹp” (tính từ sau). Tiếng Pháp phần lớn giống vậy — nhưng có một nhóm tính từ ngắn hay dùng lại chen lên TRƯỚC danh từ, nghe tự nhiên hơn khi nói xuôi." },

          { type:"formula",
            parts:["danh từ", "tính từ (mặc định)"],
            example:"une boutique touristique — một cửa hàng du lịch",
            note:"Đây là vị trí MẶC ĐỊNH — áp dụng cho đa số tính từ, đặc biệt tính từ chỉ quốc tịch, màu sắc, hình dạng." },

          { type:"heading", text:"Nhóm tính từ đặc biệt: đứng TRƯỚC danh từ" },
          { type:"table",
            caption:"Học thuộc nhóm này — chúng đứng trước, ngược quy tắc chung",
            headers:["Loại", "Ví dụ tính từ", "Câu mẫu"],
            rows:[
              ["Ngắn, thường gặp", "bon, gros, grand, petit, vieux, joli, beau, jeune, nouveau, mauvais", "de jolies espadrilles — một đôi giày xinh xắn"],
            ] },

          { type:"table",
            caption:"Nhóm LUÔN đứng SAU — không bao giờ đảo lên trước",
            headers:["Loại", "Ví dụ tính từ", "Câu mẫu"],
            rows:[
              ["Quốc tịch", "marocain, toulousain, mexicain", "des épices marocaines — gia vị Ma-rốc"],
              ["Màu sắc", "blanc, bleu, vert", "des bateaux blancs — những chiếc thuyền trắng"],
              ["Hình dạng", "rond, carré, rectangulaire", "une table ronde — một cái bàn tròn"],
            ] },

          { type:"callout", variant:"tip", title:"Đảo vị trí để NHẤN MẠNH",
            text:"Đưa một tính từ (thường vốn đứng sau) lên TRƯỚC danh từ để câu văn giàu cảm xúc, trang trọng hơn — hay gặp trong văn viết, quảng cáo, báo chí:\n« Les boutiques incroyables. » → « Les incroyables boutiques. »\n(Ý nghĩa không đổi nhiều, chỉ là cách nhấn.)" },

          { type:"heading", text:"Cẩn thận: đổi vị trí = đổi Ý NGHĨA!" },
          { type:"text", text:"Một số ít tính từ đặc biệt: nghĩa hoàn toàn khác nhau tùy đặt trước hay sau danh từ. Đây là bẫy hay gặp nhất của bài này." },
          { type:"compare", items:[
            { wrong:"J'utilise mon propre mug. (nếu muốn nói “cái cốc sạch sẽ”)", right:"J'utilise un mug propre.", why:"“propre” SAU danh từ = sạch sẽ. “propre” TRƯỚC danh từ = của chính mình (sở hữu)." },
          ] },
          { type:"pairs", caption:"So sánh 2 nghĩa của “propre”", items:[
            { fr:"J'utilise mon propre mug.", vi:"Tôi dùng cốc CỦA RIÊNG tôi. (propre trước = sở hữu)" },
            { fr:"J'utilise un mug propre.", vi:"Tôi dùng một cái cốc SẠCH. (propre sau = sạch sẽ)" },
          ] },

          { type:"heading", text:"Số nhiều trước danh từ: des → de/d'" },
          { type:"callout", variant:"warn", title:"Đừng quên đổi mạo từ",
            text:"Khi một tính từ số nhiều đứng TRƯỚC danh từ, mạo từ “des” phải đổi thành “de” (hoặc “d'” trước nguyên âm) — quy tắc riêng chỉ áp dụng trường hợp này:\ndes espadrilles + joli(e)s → de jolies espadrilles\ndes épices + excellent(e)s → d'excellentes épices" },

          { type:"heading", text:"Ghép nhiều tính từ cho một danh từ" },
          { type:"text", text:"Có thể vừa có tính từ trước vừa có tính từ sau cùng một danh từ, mỗi cái theo đúng vị trí riêng của nó:" },
          { type:"pairs", caption:"J'ai vu des affiches. (joli/touristique)", items:[
            { fr:"J'ai vu de jolies affiches touristiques.", vi:"Tôi thấy những tấm áp phích du lịch xinh xắn. (joli trước vì ngắn-quen thuộc, touristique sau vì là tính từ dài/loại)" },
          ] },
        ],
        examples:[
          "Elle a ramené une belle chemise colorée. — Cô ấy mang về một chiếc áo sơ mi màu sắc đẹp.",
          "Ils sont partis sur une petite île espagnole. — Họ đã đến một hòn đảo nhỏ của Tây Ban Nha.",
          "Les touristes ont goûté d'excellentes épices marocaines. — Khách du lịch đã nếm thử gia vị Ma-rốc tuyệt hảo.",
          "Nous avons vu de gros bateaux blancs. — Chúng tôi thấy những chiếc thuyền trắng to lớn.",
          "La famille a très bien mangé dans ce bon restaurant toulousain. — Cả nhà đã ăn rất ngon ở nhà hàng Toulouse này.",
        ]
      },
    ]
  },
];
