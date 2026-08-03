// Edito A2 — Grammar points organized by unit (aligned with Édito A2 Didier FLE, 2e édition)
// Unit ids are prefixed "b" (b1, b2, …) — see editoVocabA2.js for why.
//
// Each point uses a STRUCTURED `blocks` array instead of one long text blob, so
// GrammarBlocks.jsx can render real tables, formula boxes, comparison rows etc.
// Block types: lead · text · formula · cards · table · pairs · compare · callout · timeline
// See GrammarBlocks.jsx for the renderer of each type.

export const GRAMMAR_A2_EMOJIS = { b1: "🌱", b2: "📷", b3: "🏠", b4: "🎭", b5: "🚀", b6: "🍳", b7: "💊", b8: "📰", b9: "🔄", b10: "✈️", b11: "🎓", b12: "🌳" };

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

  {
    id:"b3", num:"3", title:"Comme à la maison", points:[

      // ── 1. Les pronoms relatifs qui, que, où ──────────────────
      {
        topic:"Les pronoms relatifs qui, que, où — Nối hai câu làm một",
        summary:"Thay vì lặp lại một danh từ ở câu thứ hai, dùng MỘT trong ba chữ này để nối hai câu lại. Chọn chữ nào phụ thuộc vào VAI TRÒ của danh từ đó trong câu thứ hai: chủ ngữ → qui, tân ngữ trực tiếp → que, nơi chốn → où.",
        blocks:[
          { type:"lead", text:"So sánh: “Tôi thuê một căn hộ. Căn hộ đó rất đẹp.” — hai câu lặp “căn hộ”. Tiếng Pháp nối gọn lại bằng một pronom relatif: “Je loue un appartement qui est très beau.”" },

          { type:"formula",
            parts:["danh từ", "qui / que / où", "phần còn lại của câu 2"],
            example:"J'habite dans une maison qui est grande. — Tôi sống trong một ngôi nhà mà nó (= ngôi nhà) rất lớn.",
            note:"Cả ba đại từ đều đứng ngay sau danh từ mà chúng thay thế, không có khoảng cách." },

          { type:"heading", text:"Chọn đại từ nào — nhìn vai trò trong câu 2" },
          { type:"table",
            caption:"Danh từ đó làm gì trong câu thứ hai?",
            headers:["Đại từ", "Thay cho vai trò", "Ví dụ"],
            rows:[
              ["qui", "CHỦ NGỮ (đứng trước động từ)", "Il y a des offres qui mettent en contact propriétaires et locataires."],
              ["que", "TÂN NGỮ TRỰC TIẾP (đứng sau động từ)", "Des personnes que vous ne connaissez pas."],
              ["où", "NƠI CHỐN (bổ ngữ chỉ nơi chốn)", "Des lieux où on trouve beaucoup de jeunes actifs."],
            ] },

          { type:"cards", items:[
            { badge:"qui", color:"#1B3A6B", title:"qui — luôn có ĐỘNG TỪ theo ngay sau",
              lines:["Vì “qui” đóng vai chủ ngữ của mệnh đề sau, nó không bao giờ đứng một mình — theo sau luôn là một động từ chia."],
              examples:[
                { fr:"C'est la chambre qui coûte 650 euros.", vi:"Đó là căn phòng có giá 650 euro." },
              ] },
            { badge:"que", color:"#10B981", title:"que — có CHỦ NGỮ KHÁC + động từ theo ngay sau",
              lines:["“que” làm tân ngữ, nên ngay sau nó là một chủ ngữ mới rồi mới đến động từ.", "que → qu' trước nguyên âm."],
              examples:[
                { fr:"Regarde cette annonce que je viens de lire !", vi:"Nhìn cái tin đăng mà tôi vừa đọc kìa!" },
              ] },
            { badge:"où", color:"#F5A623", title:"où — chỉ nơi chốn (đôi khi cả thời gian)",
              lines:["Thay cho “dans + nơi”, “à + nơi”… — không dùng cho người hay vật thường."],
              examples:[
                { fr:"Voici la chambre où je dors.", vi:"Đây là căn phòng nơi tôi ngủ." },
              ] },
          ] },

          { type:"heading", text:"Mẹo phân biệt qui vs que nhanh" },
          { type:"callout", variant:"tip", title:"Thử bỏ đại từ ra, xem câu 2 còn thiếu gì",
            text:"Je loue un studio ___ est dans une ferme. → bỏ trống rồi thử: “___ est dans une ferme” — thiếu CHỦ NGỮ → phải là qui.\nLe salon est la pièce ___ je préfère. → “je préfère ___” — thiếu TÂN NGỮ (tôi thích CÁI GÌ) → phải là que." },

          { type:"compare", items:[
            { wrong:"C'est un homme que est sympathique.", right:"C'est un homme qui est sympathique.", why:"“est sympathique” cần chủ ngữ ngay trước — đó là vai trò của qui, không phải que." },
            { wrong:"Voici l'appartement qui j'aime.", right:"Voici l'appartement que j'aime.", why:"“j'aime” đã có chủ ngữ “j'” rồi — appartement là tân ngữ của “aime” → dùng que." },
            { wrong:"Le quartier que j'habite est calme.", right:"Le quartier où j'habite est calme.", why:"“habiter” đi với nơi chốn (habiter DANS un quartier) → dùng où, không phải que." },
          ] },
        ],
        examples:[
          "Ces colocataires peuvent être des amis ou des personnes que vous ne connaissez pas. — Những người ở ghép này có thể là bạn bè hoặc những người mà bạn không quen.",
          "Ce sont des lieux où on trouve beaucoup de jeunes actifs. — Đó là những nơi có nhiều người trẻ đang đi làm.",
          "Mon propriétaire est un homme que j'aime beaucoup. — Chủ nhà tôi là một người đàn ông mà tôi rất quý.",
          "J'habite dans un foyer où il y a beaucoup de jeunes actifs. — Tôi sống trong một khu nhà tập thể có rất nhiều người trẻ đi làm.",
        ]
      },

      // ── 2. La comparaison ──────────────────────────────────────
      {
        topic:"La comparaison — Hơn, kém, bằng",
        summary:"Ba mức so sánh (moins/aussi/plus) áp dụng lên BỐN loại từ khác nhau (trạng từ, tính từ, động từ, danh từ) — mỗi loại ghép với “que” theo một khuôn hơi khác nhau. Và 4 cặp từ bất quy tắc phải học thuộc riêng.",
        blocks:[
          { type:"lead", text:"Tiếng Việt chỉ cần thêm “hơn”/“kém”/“bằng”. Tiếng Pháp cũng đơn giản, nhưng khuôn câu đổi theo loại từ đi kèm — nắm 4 khuôn này là xong cả bài." },

          { type:"formula",
            parts:["moins / aussi / plus", "tính từ · trạng từ · danh từ · động từ", "que"],
            example:"La chambre de Tom est plus grande que la chambre d'Anna. — Phòng của Tom rộng hơn phòng của Anna.",
            note:"moins = kém hơn, aussi = bằng, plus = hơn. “que” luôn đóng vai trò như chữ “hơn/bằng…so với” trong tiếng Việt." },

          { type:"heading", text:"4 khuôn câu — theo loại từ đi kèm" },
          { type:"table",
            caption:"Vị trí của moins/aussi/plus thay đổi theo loại từ",
            headers:["Loại từ", "Khuôn câu", "Ví dụ"],
            rows:[
              ["trạng từ (adverbe)", "moins/aussi/plus + trạng từ + que", "Nous habitons plus loin que vous."],
              ["tính từ (adjectif)", "moins/aussi/plus + tính từ + que", "La chambre de Tom est plus grande que la chambre d'Anna."],
              ["động từ (verbe)", "verbe + moins/autant/plus + que", "Les jeunes déménagent plus que les personnes âgées."],
              ["danh từ (nom)", "moins de/autant de/plus de + danh từ + que", "Il y a plus de chambres que dans notre maison."],
            ] },

          { type:"callout", variant:"warn", title:"Chú ý: “aussi” đổi thành “autant” với động từ và danh từ",
            text:"Với trạng từ/tính từ: dùng aussi (aussi grande que…).\nVới động từ/danh từ: dùng autant / autant de (déménager autant que…, autant de chambres que…).\nĐây là lỗi hay gặp nhất của bài — nhớ “aussi” đi với tính từ/trạng từ, “autant” đi với động từ/danh từ." },

          { type:"heading", text:"4 cặp bất quy tắc — không ghép plus + bon/bien" },
          { type:"table",
            caption:"Những từ này có dạng so sánh hơn RIÊNG, không theo khuôn plus + từ",
            headers:["Từ gốc", "Kém hơn", "Bằng", "Hơn (bất quy tắc)"],
            rows:[
              ["bon(ne) — tính từ", "moins bon(ne)", "aussi bon(ne)", "meilleur(e)"],
              ["mauvais(e) — tính từ", "moins mauvais(e)", "aussi mauvais(e)", "plus mauvais(e) / pire"],
              ["bien — trạng từ", "moins bien", "aussi bien", "mieux"],
              ["mal — trạng từ", "moins mal", "aussi mal", "plus mal / pire"],
            ] },

          { type:"cards", items:[
            { badge:"★", color:"#10B981", title:"meilleur(e) — so sánh hơn của BON (tính từ)",
              lines:["Không bao giờ nói “plus bon” — luôn dùng meilleur(e), hợp giống/số với danh từ."],
              examples:[
                { fr:"Mon four n'est pas très bon, je dois acheter un meilleur four.", vi:"Lò nướng của tôi không tốt lắm, tôi phải mua một cái lò tốt hơn." },
              ] },
            { badge:"★", color:"#7B6CF6", title:"mieux — so sánh hơn của BIEN (trạng từ)",
              lines:["mieux KHÔNG đổi theo giống/số (vì là trạng từ, bổ nghĩa cho động từ, không phải danh từ)."],
              examples:[
                { fr:"On vit bien en ville, mais on vit mieux à la campagne.", vi:"Ở thành phố sống cũng ổn, nhưng ở quê sống tốt hơn." },
              ] },
          ] },

          { type:"compare", items:[
            { wrong:"Ce logement est plus bon que l'autre.", right:"Ce logement est meilleur que l'autre.", why:"bon → meilleur(e), không ghép plus + bon." },
            { wrong:"On vit plus bien à la campagne.", right:"On vit mieux à la campagne.", why:"bien → mieux, không ghép plus + bien." },
            { wrong:"Il y a aussi de chambres que chez moi.", right:"Il y a autant de chambres que chez moi.", why:"Với danh từ, dùng autant de, không phải aussi de." },
          ] },
        ],
        examples:[
          "Elle est moins grande qu'une cuisine classique, mais elle est aussi bien. — Nó nhỏ hơn một cái bếp bình thường, nhưng vẫn ổn không kém.",
          "On a autant de pièces que dans notre ancien appartement. — Chúng tôi có số phòng bằng căn hộ cũ.",
          "On sort plus qu'avant ! — Bọn tôi ra ngoài nhiều hơn trước!",
          "Le désordre est pire dans un bus que dans un appartement. — Sự bừa bộn trong xe bus tệ hơn trong căn hộ.",
          "On a un meilleur cadre de vie. — Chúng tôi có môi trường sống tốt hơn.",
        ]
      },

      // ── 3. La condition avec si ────────────────────────────────
      {
        topic:"Si + présent — Điều kiện đơn giản, việc CÓ THỂ xảy ra",
        summary:"Cấu trúc điều kiện cơ bản nhất: nếu vế “si” là thật/có thể, thì vế kia là kết quả — ở HIỆN TẠI (việc luôn đúng) hoặc MỆNH LỆNH (yêu cầu/gợi ý ngay lúc nói).",
        blocks:[
          { type:"lead", text:"Khác với “nếu… thì sẽ” trong tiếng Việt (thường nghĩ tới tương lai xa), câu điều kiện này nói về việc CÓ THỂ xảy ra bất cứ lúc nào — nên vế sau chia ở hiện tại hoặc mệnh lệnh, KHÔNG phải tương lai." },

          { type:"formula",
            parts:["Si", "chủ ngữ + hiện tại", "chủ ngữ + hiện tại / mệnh lệnh"],
            example:"Si tu es disponible, tu peux passer chez moi. — Nếu bạn rảnh, bạn có thể ghé qua nhà tôi.",
            note:"Vế “si” LUÔN ở hiện tại. Vế kết quả có thể ở hiện tại (sự thật chung) hoặc mệnh lệnh (đề nghị/yêu cầu ngay)." },

          { type:"table",
            caption:"Hai kiểu vế kết quả",
            headers:["Vế kết quả", "Khi nào dùng", "Ví dụ"],
            rows:[
              ["hiện tại", "Kết quả LUÔN đúng, như một quy luật", "Si je veux lire, je vais à la bibliothèque."],
              ["mệnh lệnh (impératif)", "Yêu cầu/gợi ý/đề nghị ngay lúc nói", "Si tu es malade, va à la pharmacie !"],
            ] },

          { type:"callout", variant:"warn", title:"si → s' trước il/ils",
            text:"“si” rút gọn thành “s'” CHỈ trước il và ils (không rút trước elle/on/elles):\nS'il pleut, on peut aller au Centre de la BD.\nSi elle vient, on sera contents. (KHÔNG rút — elle không rút)" },

          { type:"heading", text:"Không nhầm với đại từ “si” khác" },
          { type:"text", text:"Vế “si” điều kiện luôn đứng đầu câu (hoặc giữa câu, ngăn cách bằng dấu phẩy) và đi kèm một mệnh đề kết quả riêng — khác với “si” dùng để trả lời khẳng định cho câu hỏi phủ định (Tu n'aimes pas ça ? — Si, j'aime bien !)." },

          { type:"compare", items:[
            { wrong:"Si tu es disponible, tu passeras chez moi.", right:"Si tu es disponible, tu peux passer chez moi.", why:"Vế kết quả của “si + hiện tại” không chia ở tương lai — dùng hiện tại hoặc mệnh lệnh." },
            { wrong:"Si il pleut, on reste à la maison.", right:"S'il pleut, on reste à la maison.", why:"“si” phải rút thành “s'” trước “il”." },
          ] },
        ],
        examples:[
          "Si tes voisins sont bruyants, change d'appartement ! — Nếu hàng xóm bạn ồn ào, đổi căn hộ khác đi!",
          "Si vous avez un problème, vous pouvez m'appeler. — Nếu bạn có vấn đề gì, bạn có thể gọi tôi.",
          "S'il fait froid, on met le chauffage. — Nếu trời lạnh, chúng tôi bật lò sưởi.",
          "Si vous voyez un chat noir, contactez-moi s'il vous plaît ! — Nếu bạn thấy một con mèo đen, làm ơn liên hệ với tôi!",
        ]
      },
    ]
  },

  {
    id:"b4", num:"4", title:"Tous pareils, tous différents", points:[

      // ── 1. La comparaison : l'équivalence ──────────────────────
      {
        topic:"La comparaison : l'équivalence — Giống nhau, bằng nhau",
        summary:"Ở bài trước bạn đã học hơn/kém/bằng. Bài này đào sâu riêng mức BẰNG NHAU: aussi (với tính từ/trạng từ), même (với danh từ, để nói CÙNG MỘT thứ), autant (với động từ hoặc số lượng).",
        blocks:[
          { type:"lead", text:"“Bằng nhau” trong tiếng Pháp không chỉ có MỘT từ — chọn từ nào phụ thuộc bạn đang so sánh TÍNH CHẤT (aussi), CÙNG MỘT VẬT/ĐẶC ĐIỂM (même), hay HÀNH ĐỘNG/SỐ LƯỢNG (autant)." },

          { type:"formula",
            parts:["aussi / le·la·les même(s) / autant", "(+ danh từ)", "que"],
            example:"Il est aussi grand que l'empereur. — Anh ấy cao bằng hoàng đế.",
            note:"Ba từ đều dịch là “bằng”, nhưng đi với loại từ khác nhau — xem bảng dưới." },

          { type:"table",
            caption:"3 cách nói “bằng nhau” — chọn theo loại từ đi kèm",
            headers:["Loại từ", "Từ dùng", "Ví dụ"],
            rows:[
              ["tính từ / trạng từ", "aussi … que", "Il est aussi blond que son père. · Il parle aussi bien que sa mère."],
              ["danh từ — CÙNG MỘT đặc điểm", "le/la/les même(s) … que", "Il a le même nez que son père. · Elle a les mêmes yeux que sa sœur."],
              ["danh từ — SỐ LƯỢNG bằng nhau", "autant de … que", "Il achète autant de vêtements que moi."],
              ["động từ", "verbe + autant … que", "Il s'intéresse autant à la mode qu'au sport."],
            ] },

          { type:"callout", variant:"warn", title:"Đừng lẫn “aussi” và “même”",
            text:"aussi + tính từ = GIỐNG MỨC ĐỘ nhưng có thể là 2 thứ khác nhau (Elle est aussi grande que moi — hai người khác nhau, chỉ chiều cao bằng nhau).\nle/la même + danh từ = CÙNG MỘT thứ, giống hệt (Elle a les mêmes yeux que sa sœur — không phải mắt giống nhau về độ cao, mà là kiểu mắt y hệt)." },

          { type:"heading", text:"“le/la/les même(s)” — hợp giống số với danh từ theo sau" },
          { type:"table",
            caption:"même luôn đi kèm mạo từ xác định + hợp số với danh từ",
            headers:["Danh từ", "le/la/les même(s)", "Ví dụ"],
            rows:[
              ["số ít, giống đực", "le même", "le même nez"],
              ["số ít, giống cái", "la même", "la même physionomie"],
              ["số nhiều", "les mêmes", "les mêmes yeux"],
            ] },

          { type:"heading", text:"pareil(le) — tính từ, không phải trạng từ so sánh" },
          { type:"callout", variant:"note", title:"“pareil” đi MỘT MÌNH, không cần “que”",
            text:"pareil(le) = giống hệt, y như nhau — là TÍNH TỪ thường, hợp giống-số với danh từ nó bổ nghĩa, và KHÔNG bắt buộc phải có “que” theo sau (khác với aussi/même/autant).\nIl n'y a pas deux corps pareils. — Không có hai cơ thể nào giống hệt nhau.\nCes deux robes sont pareilles. — Hai chiếc váy này giống hệt nhau." },

          { type:"compare", items:[
            { wrong:"Il a le même taille que moi.", right:"Il a la même taille que moi.", why:"“taille” giống cái → phải dùng “la même”, không phải “le même”." },
            { wrong:"Je ne fais pas aussi de sport que ma sœur.", right:"Je ne fais pas autant de sport que ma sœur.", why:"Với danh từ (số lượng thể thao), dùng autant de, không phải aussi de." },
            { wrong:"Ils parlent aussi l'un que l'autre.", right:"Ils parlent autant l'un que l'autre.", why:"“parlent” là động từ → dùng autant, không phải aussi (aussi chỉ đi với tính từ/trạng từ)." },
          ] },
        ],
        examples:[
          "Il n'y a pas deux corps pareils. — Không có hai cơ thể nào giống hệt nhau.",
          "Il a la même physionomie, le même visage rond que Bonaparte. — Anh ấy có cùng vóc dáng, cùng khuôn mặt tròn như Bonaparte.",
          "Il ne ressemble plus autant qu'avant à l'empereur. — Anh ấy không còn giống hoàng đế nhiều như trước nữa.",
          "Mon fils me ressemble autant que ma fille. — Con trai tôi giống tôi ngang với con gái tôi.",
          "Ce mannequin est aussi petit que moi. — Người mẫu này thấp bằng tôi.",
        ]
      },

      // ── 2. Les adjectifs indéfinis ─────────────────────────────
      {
        topic:"Chaque, tout/toute/tous/toutes — Nói về TOÀN THỂ",
        summary:"Hai cách nói “mọi, tất cả” — nhưng KHÁC NHAU về ngữ pháp: chaque luôn đi với danh từ SỐ ÍT và không đổi dạng; tout/toute/tous/toutes phải hợp giống-số với danh từ.",
        blocks:[
          { type:"lead", text:"Tiếng Việt chỉ cần “mọi” hay “tất cả”. Tiếng Pháp có hai từ khác hẳn nhau về ngữ pháp cho cùng một ý — nhầm giữa hai từ này là lỗi rất hay gặp." },

          { type:"formula",
            parts:["chaque + danh từ SỐ ÍT", "≈", "tout/toute/tous/toutes + danh từ (hợp giống-số)"],
            example:"Chaque qualité peut cacher un défaut. ≈ Toutes les qualités peuvent cacher un défaut.",
            note:"Hai cách diễn đạt gần như cùng nghĩa, nhưng chaque luôn kèm danh từ SỐ ÍT, còn tout nhóm phải hợp giống-số." },

          { type:"table",
            caption:"So sánh trực tiếp",
            headers:["", "chaque", "tout, toute, tous, toutes"],
            rows:[
              ["Biến đổi hình thức?", "KHÔNG — luôn “chaque”, bất biến", "CÓ — đổi theo giống/số của danh từ"],
              ["Đi với danh từ nào?", "Luôn SỐ ÍT", "Số ít (tout/toute) hoặc SỐ NHIỀU (tous/toutes)"],
              ["Ví dụ", "Chaque qualité peut cacher un défaut.", "J'aime tous les aspects de sa personnalité."],
            ] },

          { type:"cards", items:[
            { badge:"♂", color:"#1B3A6B", title:"tout / tous — giống đực",
              lines:["tout + danh từ số ít giống đực.", "tous + danh từ số nhiều giống đực."],
              examples:[
                { fr:"Tout le monde a des défauts.", vi:"Ai cũng có khuyết điểm." },
                { fr:"Tous les traits de caractère peuvent être utiles.", vi:"Mọi nét tính cách đều có thể hữu ích." },
              ] },
            { badge:"♀", color:"#E8574A", title:"toute / toutes — giống cái",
              lines:["toute + danh từ số ít giống cái.", "toutes + danh từ số nhiều giống cái."],
              examples:[
                { fr:"Nous avons passé toute l'heure à parler de nos qualités.", vi:"Chúng tôi đã dành cả tiếng đồng hồ nói về ưu điểm của mình." },
                { fr:"Vous trouvez vite toutes les choses que vous cherchez.", vi:"Bạn tìm nhanh mọi thứ bạn cần tìm." },
              ] },
          ] },

          { type:"callout", variant:"tip", title:"Đổi qua lại giữa chaque và tous/toutes les",
            text:"chaque + danh từ số ít ↔ tous/toutes les + danh từ số nhiều — nghĩa gần như nhau, chỉ đổi hình thức ngữ pháp:\nChaque créateur va présenter sa collection. ↔ Tous les créateurs vont présenter leur collection." },

          { type:"heading", text:"“tout” — còn là đại từ trung tính" },
          { type:"callout", variant:"note", title:"tout đứng một mình = “mọi thứ”",
            text:"Khi KHÔNG đi kèm danh từ, “tout” là đại từ, luôn bất biến, nghĩa là “mọi thứ/mọi việc”:\nTout va bien. — Mọi thứ đều ổn." },

          { type:"compare", items:[
            { wrong:"Chaque les qualités ont un opposé.", right:"Chaque qualité a un opposé. / Toutes les qualités ont un opposé.", why:"chaque không bao giờ đi với “les” hay danh từ số nhiều." },
            { wrong:"Tout le monde ont des défauts.", right:"Tout le monde a des défauts.", why:"“tout le monde” luôn chia động từ ở NGÔI THỨ BA SỐ ÍT (il/elle), dù nghĩa là “mọi người”." },
          ] },
        ],
        examples:[
          "Personne n'est parfait, tout le monde le sait. — Không ai hoàn hảo cả, ai cũng biết điều đó.",
          "Chaque faiblesse est aussi une force. — Mỗi điểm yếu cũng là một điểm mạnh.",
          "Le coach donne tous ces conseils sur son site. — Huấn luyện viên đưa hết những lời khuyên này lên trang web.",
          "Faites la liste de toutes les qualités qui vous représentent. — Hãy liệt kê tất cả các ưu điểm đại diện cho bạn.",
        ]
      },

      // ── 3. Les pronoms possessifs ──────────────────────────────
      {
        topic:"Les pronoms possessifs — Thay hẳn “của tôi/của bạn…”",
        summary:"Thay vì nói “ma photo” (ảnh của tôi) rồi lặp lại “ta photo” (ảnh của bạn), tiếng Pháp gộp cả tính từ sở hữu + danh từ vào MỘT từ duy nhất: la mienne, la tienne… Luôn có mạo từ le/la/les phía trước.",
        blocks:[
          { type:"lead", text:"So sánh: “C'est ma photo de profil.” → “C'est la mienne.” — “la mienne” thay cho CẢ CỤM “ma photo de profil”, không lặp lại danh từ." },

          { type:"formula",
            parts:["le / la / les", "mien·tien·sien·nôtre·vôtre·leur (+ ne/s)"],
            example:"C'est ma photo de profil. → C'est la mienne. — Đó là ảnh đại diện của tôi. → Đó là CỦA TÔI.",
            note:"Luôn có mạo từ xác định (le/la/les) đứng trước — không bao giờ dùng pronom possessif một mình." },

          { type:"table",
            caption:"Bảng đầy đủ — hợp giống/số với danh từ được thay thế, KHÔNG phải với người sở hữu",
            headers:["Ai sở hữu", "số ít giống đực", "số ít giống cái", "số nhiều giống đực", "số nhiều giống cái"],
            rows:[
              ["je", "le mien", "la mienne", "les miens", "les miennes"],
              ["tu", "le tien", "la tienne", "les tiens", "les tiennes"],
              ["il/elle/on", "le sien", "la sienne", "les siens", "les siennes"],
              ["nous", "le nôtre", "la nôtre", "les nôtres", "les nôtres"],
              ["vous", "le vôtre", "la vôtre", "les vôtres", "les vôtres"],
              ["ils/elles", "le leur", "la leur", "les leurs", "les leurs"],
            ] },

          { type:"callout", variant:"warn", title:"Hợp giống/số theo DANH TỪ, không theo người sở hữu",
            text:"Đây là điểm hay nhầm nhất: “la sienne” không có nghĩa “cô ấy” hay “anh ấy” — giống/số của pronom possessif đi theo DANH TỪ bị thay thế, còn NGÔI (je/tu/il…) mới quyết định ai sở hữu.\nsa photo (photo = giống cái) → la sienne (dù người sở hữu là anh hay chị)." },

          { type:"cards", items:[
            { badge:"👤", color:"#10B981", title:"nôtre/vôtre có dấu mũ (^), khác tính từ sở hữu",
              lines:["notre/votre (tính từ, không dấu mũ) khác le nôtre/le vôtre (đại từ, CÓ dấu mũ) — dễ viết sai chính tả nhất bài này."],
              examples:[
                { fr:"C'est notre projet. → C'est le nôtre.", vi:"Đó là dự án của chúng tôi. → Đó là CỦA CHÚNG TÔI." },
              ] },
          ] },

          { type:"heading", text:"So sánh cạnh nhau: tính từ sở hữu ≠ đại từ sở hữu" },
          { type:"pairs", caption:"Tính từ sở hữu LUÔN có danh từ theo sau · Đại từ sở hữu THAY THẾ danh từ", items:[
            { fr:"Ayez toujours une série de photos d'avance. Voici les miennes !", vi:"Luôn chuẩn bị sẵn một loạt ảnh. Đây là CỦA TÔI!" },
            { fr:"Il a changé la sienne pour avoir l'air plus sérieux.", vi:"Anh ấy đã đổi CỦA MÌNH để trông nghiêm túc hơn." },
            { fr:"Nous avons tous envie de rencontrer des gens qui ont des intérêts semblables aux nôtres.", vi:"Ai cũng muốn gặp những người có sở thích giống CỦA CHÚNG TA." },
          ] },

          { type:"compare", items:[
            { wrong:"C'est mienne photo.", right:"C'est la mienne.", why:"Pronom possessif luôn cần mạo từ le/la/les phía trước." },
            { wrong:"C'est le votre idée.", right:"C'est la vôtre.", why:"“idée” giống cái → la vôtre, không phải le votre (và phải có dấu mũ: vôtre)." },
          ] },
        ],
        examples:[
          "Je lui ai parlé de l'importance de la photo de profil et il a changé la sienne. — Tôi đã nói với anh ấy về tầm quan trọng của ảnh đại diện và anh ấy đã đổi ảnh của mình.",
          "Évitez la photo avec vos amis, c'est votre tête que l'employeur veut voir, pas les leurs. — Tránh chụp ảnh cùng bạn bè, nhà tuyển dụng muốn thấy mặt bạn, không phải mặt của họ.",
          "J'ai préparé ma photo. Et toi ? Tu as apporté la tienne ? — Tôi đã chuẩn bị ảnh của mình rồi. Còn bạn? Bạn mang ảnh của bạn chưa?",
          "Ton appareil photo est en panne ? Prends le mien. — Máy ảnh của bạn hỏng à? Lấy cái của tôi mà dùng.",
        ]
      },
    ]
  },

  {
    id:"b5", num:"5", title:"En route vers le futur !", points:[

      // ── 1. Le futur simple ─────────────────────────────────────
      {
        topic:"Le futur simple — Nói việc SẼ xảy ra",
        summary:"Thì để dự đoán hoặc lên kế hoạch cho tương lai. Cách chia RẤT ĐƠN GIẢN: động từ nguyên thể + 6 đuôi cố định — hầu như không cần “gốc” riêng như imparfait, chỉ có một nhóm nhỏ động từ bất quy tắc phải học thuộc gốc.",
        blocks:[
          { type:"lead", text:"Passé composé/imparfait kể chuyện ĐÃ xảy ra. Futur simple thì ngược lại hoàn toàn — nói về một dự đoán hay kế hoạch SẼ xảy ra, giống chữ “sẽ” trong tiếng Việt." },

          { type:"formula",
            parts:["động từ NGUYÊN THỂ", "+ đuôi -ai/-as/-a/-ons/-ez/-ont"],
            example:"On mangera un comprimé. — Chúng ta sẽ ăn một viên thuốc.",
            note:"Điểm khác lớn nhất so với imparfait: gốc là NGUYÊN THỂ (không phải “nous” hiện tại bỏ -ons)." },

          { type:"table",
            caption:"Chia đều đặn — giữ nguyên động từ nguyên thể + đuôi",
            headers:["Ngôi", "manger", "prendre *(bỏ -e cuối)*"],
            rows:[
              ["je/j'", "mangerai", "prendrai"],
              ["tu", "mangeras", "prendras"],
              ["il/elle/on", "mangera", "prendra"],
              ["nous", "mangerons", "prendrons"],
              ["vous", "mangerez", "prendrez"],
              ["ils/elles", "mangeront", "prendront"],
            ] },

          { type:"callout", variant:"note", title:"Động từ tận cùng bằng -E: bỏ chữ E trước khi thêm đuôi",
            text:"prendre → prendr- + ai → je prendrai (KHÔNG phải “prendrerai”). Áp dụng cho mọi động từ -re: vivre → je vivrai, répondre → je répondrai." },

          { type:"heading", text:"Nhóm bất quy tắc — gốc riêng, đuôi vẫn y hệt" },
          { type:"table",
            caption:"Chỉ GỐC thay đổi — 6 đuôi phía sau luôn giữ nguyên -ai/-as/-a/-ons/-ez/-ont",
            headers:["Động từ", "Gốc tương lai", "je (tương lai)"],
            rows:[
              ["avoir", "aur-", "j'aurai"],
              ["être", "ser-", "je serai"],
              ["faire", "fer-", "je ferai"],
              ["aller", "ir-", "j'irai"],
              ["voir", "verr-", "je verrai"],
              ["savoir", "saur-", "je saurai"],
              ["devoir", "devr-", "je devrai"],
              ["pouvoir", "pourr-", "je pourrai"],
              ["vouloir", "voudr-", "je voudrai"],
              ["venir/devenir", "viendr-/deviendr-", "je viendrai"],
              ["falloir (il faut)", "faudr-", "il faudra"],
              ["pleuvoir (il pleut)", "pleuvr-", "il pleuvra"],
            ] },

          { type:"callout", variant:"tip", title:"Mẹo học 12 gốc bất quy tắc",
            text:"Đa số gốc bất quy tắc kết thúc bằng “-R” hoặc “-RR” — cứ nhớ “thêm r vào cuối một dạng rút gọn của động từ” là chia được gần đúng, rồi học thuộc từng trường hợp cụ thể qua luyện tập nhiều." },

          { type:"heading", text:"Khi nào dùng futur simple?" },
          { type:"text", text:"Diễn tả một DỰ ĐOÁN (prévision) hoặc một DỰ ĐỊNH/kế hoạch (projet) trong tương lai — không phân biệt gần hay xa như futur proche (aller + inf.), cả hai đều tồn tại song song trong tiếng Pháp." },

          { type:"compare", items:[
            { wrong:"Il y a des maisons qui pourrer se téléporter.", right:"Il y aura des maisons qui pourront se téléporter.", why:"“avoir” → il y aura (không phải “il y a” giữ nguyên thì hiện tại khi nói về tương lai)." },
            { wrong:"Nous allerons au salon.", right:"Nous irons au salon.", why:"aller có gốc bất quy tắc riêng: ir-, không phải allé-/aller-." },
          ] },
        ],
        examples:[
          "Bientôt, il y aura des maisons qui pourront se téléporter jusqu'à la plage. — Chẳng bao lâu nữa, sẽ có những ngôi nhà có thể dịch chuyển tức thời tới bãi biển.",
          "Un jour, pour remplacer les transports en commun, il y aura de petites navettes individuelles. — Một ngày nào đó, để thay thế phương tiện công cộng, sẽ có những chiếc xe con thoi cá nhân nhỏ.",
          "Dans le futur, on mangera un comprimé, quatre fois par jour. — Trong tương lai, người ta sẽ ăn một viên thuốc, bốn lần một ngày.",
          "Les étudiants verront leur enseignant apparaître en 3D. — Sinh viên sẽ thấy giáo viên của mình xuất hiện dưới dạng 3D.",
        ]
      },

      // ── 2. La condition avec si / quand ────────────────────────
      {
        topic:"Si / Quand + tương lai — Điều kiện & sự kiện chắc chắn",
        summary:"Đã học “si + hiện tại + hiện tại/mệnh lệnh” ở Unité 3. Bài này thêm khuôn thứ ba: si + hiện tại + TƯƠNG LAI (kết quả chưa chắc chắn). Và giới thiệu “quand + tương lai + tương lai” — khi CHẮC CHẮN việc đó sẽ xảy ra, chỉ là chưa biết lúc nào.",
        blocks:[
          { type:"lead", text:"Điểm khác biệt cốt lõi: “si” dùng khi ĐIỀU KIỆN không chắc chắn xảy ra hay không; “quand” dùng khi bạn CHẮC CHẮN nó sẽ xảy ra, chỉ đang nói tới THỜI ĐIỂM." },

          { type:"table",
            caption:"3 khuôn với si — đã học 2, thêm 1 khuôn mới",
            headers:["Khuôn", "Sắc thái", "Ví dụ"],
            rows:[
              ["Si + hiện tại + hiện tại", "Quy luật chung, luôn đúng", "Si quelqu'un m'appelle, je réponds."],
              ["Si + hiện tại + mệnh lệnh", "Đề nghị/yêu cầu ngay", "Si vous voulez passer moins de temps sur votre téléphone, lisez un livre !"],
              ["Si + hiện tại + tương lai *(MỚI)*", "Kết quả CHƯA CHẮC, ở tương lai", "Si tu passes une semaine sans ordi, tu perdras l'habitude."],
            ] },

          { type:"formula",
            parts:["Quand", "chủ ngữ + TƯƠNG LAI", "chủ ngữ + TƯƠNG LAI"],
            example:"Quand tu auras 18 ans, je t'achèterai un ordinateur. — Khi nào bạn tròn 18 tuổi, tôi sẽ mua cho bạn một cái máy tính.",
            note:"CẢ HAI vế đều chia ở tương lai — khác hẳn tiếng Việt (“khi nào... thì sẽ...” chỉ vế sau mới có “sẽ”)." },

          { type:"callout", variant:"warn", title:"Lỗi hay gặp nhất: chia “quand” ở hiện tại",
            text:"Tiếng Việt nói “KHI bạn rảnh” (không có tương lai ở vế đầu), nên người học hay viết “Quand tu es disponible…”. Nhưng nếu chắc chắn việc đó SẼ xảy ra trong tương lai, tiếng Pháp bắt buộc chia CẢ HAI vế ở futur." },

          { type:"heading", text:"So sánh trực tiếp: si ≠ quand" },
          { type:"pairs", caption:"Cùng ý “khi/nếu” nhưng SẮC THÁI khác nhau", items:[
            { fr:"Si tu gagnes le concours Lépine, ton invention deviendra célèbre.", vi:"Nếu bạn thắng cuộc thi Lépine (chưa chắc thắng), phát minh của bạn sẽ nổi tiếng." },
            { fr:"Quand tu seras grand, tu seras ingénieur.", vi:"Khi bạn lớn (chắc chắn sẽ lớn), bạn sẽ là kỹ sư." },
          ] },

          { type:"compare", items:[
            { wrong:"Quand tu es disponible, on s'appellera en visio ?", right:"Quand tu seras disponible, on s'appellera en visio ?", why:"“quand” + việc chắc chắn ở tương lai → CẢ HAI vế đều chia futur." },
            { wrong:"Si l'ordinateur tombera en panne, appelle le réparateur.", right:"Si l'ordinateur tombe en panne, appelle le réparateur.", why:"Vế “si” LUÔN ở hiện tại, dù vế kết quả là mệnh lệnh hay tương lai." },
          ] },
        ],
        examples:[
          "Si tu passes une semaine sans ordi et sans smartphone, tu perdras l'habitude. — Nếu bạn không dùng máy tính và điện thoại thông minh trong một tuần, bạn sẽ bỏ được thói quen đó.",
          "Nous vous téléphonerons quand nous serons arrivés. — Chúng tôi sẽ gọi điện cho bạn khi chúng tôi đã đến nơi.",
          "Si Thomas a son bac, il fera des études d'ingénieur. — Nếu Thomas đỗ tú tài, cậu ấy sẽ học ngành kỹ sư.",
          "Quand mes enfants seront grands, je voyagerai plus. — Khi các con tôi lớn, tôi sẽ đi du lịch nhiều hơn.",
        ]
      },

      // ── 3. Le pronom on ─────────────────────────────────────────
      {
        topic:"Le pronom on — Một chữ, ba nghĩa",
        summary:"“On” là một trong những từ hay dùng nhất tiếng Pháp nói — nhưng nghĩa của nó thay đổi tùy ngữ cảnh: có thể là “ai đó” (không xác định), “người ta/mọi người” (nói chung), hoặc “chúng ta” (thân mật, thay cho “nous”).",
        blocks:[
          { type:"lead", text:"Về mặt ngữ pháp, “on” LUÔN chia động từ như “il/elle” (ngôi thứ ba số ít) — dù nghĩa thực tế có thể là số nhiều (“chúng ta”, “mọi người”). Đây là điểm khác biệt lớn nhất so với tiếng Việt." },

          { type:"formula",
            parts:["On", "+ động từ chia NGÔI THỨ BA SỐ ÍT"],
            example:"On a gagné quatre compétitions. — (Chúng tôi) đã thắng bốn cuộc thi.",
            note:"“on” luôn đi với dạng động từ giống “il” — kể cả khi nghĩa là “chúng ta”." },

          { type:"table",
            caption:"3 nghĩa của “on” — suy luận từ ngữ cảnh",
            headers:["Nghĩa", "Khi nào hiểu như vậy", "Ví dụ"],
            rows:[
              ["= Quelqu'un (ai đó)", "Chủ thể KHÔNG xác định, thường trong câu bị động-nghĩa", "On a volé mon téléphone. = Quelqu'un a volé mon téléphone."],
              ["= Les gens (người ta, nói chung)", "Nói về một quy luật/thói quen CHUNG của xã hội", "Dans ce pays, on aime beaucoup les nouvelles technologies."],
              ["= Nous (chúng ta, thân mật)", "Người nói tự gộp mình vào nhóm đang nhắc tới", "On va au salon des innovations. = Nous allons au salon des innovations."],
            ] },

          { type:"callout", variant:"tip", title:"Mẹo nhận diện nghĩa nào",
            text:"Tự hỏi: “Ai đang làm việc này?”\n• Không rõ là ai, chỉ biết CÓ người làm → quelqu'un\n• Một quy luật chung, đúng với mọi người → les gens\n• Chính người nói + nhóm của họ → nous (thường thấy trong hội thoại thân mật, thay cho “nous” trang trọng hơn)" },

          { type:"heading", text:"“on” trong văn nói VS “nous” trong văn viết" },
          { type:"callout", variant:"note", title:"Văn nói ưu tiên “on”, văn viết trang trọng ưu tiên “nous”",
            text:"Trong hội thoại đời thường, người Pháp gần như luôn dùng “on” thay cho “nous” — “On va au salon” tự nhiên hơn nhiều so với “Nous allons au salon”. Nhưng trong văn viết trang trọng (báo cáo, thư từ), “nous” vẫn là lựa chọn chuẩn mực." },

          { type:"compare", items:[
            { wrong:"On sont allés à la RoboCup.", right:"On est allés à la RoboCup.", why:"Dù nghĩa là “chúng tôi” (số nhiều), động từ vẫn PHẢI chia theo “on” = ngôi ba số ít → est, không phải sont." },
          ] },
        ],
        examples:[
          "C'est vrai ce qu'on raconte ? — Điều người ta kể có thật không?",
          "Est-ce qu'on vous a déjà parlé de la RoboCup ? — Đã có ai từng nói với bạn về RoboCup chưa?",
          "On a gagné quatre compétitions. — Chúng tôi đã thắng bốn cuộc thi.",
          "On améliore nos robots chaque année. — Chúng tôi cải tiến robot của mình mỗi năm.",
        ]
      },
    ]
  },

  {
    id:"b6", num:"6", title:"En cuisine", points:[

      // ── 1. Les quantités et le pronom en ────────────────────────
      {
        topic:"Les quantités et le pronom en — Thay thế số lượng, tránh lặp danh từ",
        summary:"« en » thay cho một danh từ đi kèm « de/du/de la/des » (partitif), một danh từ đi kèm mạo từ không xác định (un/une/des), hoặc một cụm chỉ SỐ LƯỢNG + de. Dùng « en » để khỏi phải lặp lại tên món ăn, nguyên liệu đã nhắc ở câu trước.",
        blocks:[
          { type:"lead", text:"Câu hỏi có « de la, du, un, une, des, une pincée de… » → câu trả lời thay cụm đó bằng MỘT chữ duy nhất: « en ». « en » luôn đứng ngay trước động từ chia (hoặc trước trợ động từ ở passé composé)." },

          { type:"formula",
            parts:["en", "+ động từ (chia)"],
            example:"Tu manges de la viande ? – Non, je n'en mange pas. — Bạn có ăn thịt không? – Không, tôi không ăn (loại đó).",
            note:"« en » đứng NGAY TRƯỚC động từ được chia, kể cả khi đó là trợ động từ avoir ở passé composé." },

          { type:"table",
            caption:"4 trường hợp « en » thay thế — theo cái gì đứng trước danh từ",
            headers:["Danh từ đi kèm", "Ví dụ có danh từ", "Ví dụ với en"],
            rows:[
              ["partitif: de la/de l'/du/des", "De la salade, j'ai mis dans mon jardin.", "J'en ai mis dans mon jardin."],
              ["mạo từ không xác định: un/une/des", "Vous proposez un couscous ? — Non, je n'en propose pas un.", "Je n'en propose pas un, mais trois."],
              ["số lượng CHÍNH XÁC + de (kg, g, l, un pot de, une pincée de…)", "Vous proposez trois plats ?", "Non, je n'en propose pas trois, mais quatre."],
              ["số lượng KHÔNG chính xác + de (beaucoup de, peu de, plein de, assez de…)", "Vous consommez beaucoup de légumes ?", "Oui, j'en consomme beaucoup."],
            ] },

          { type:"callout", variant:"warn", title:"Vị trí của « en » ở thể phủ định",
            text:"Khẳng định: en đứng NGAY TRƯỚC động từ. J'en mange. / J'en ai mangé.\nPhủ định: en đứng giữa ne/n' và động từ (hoặc trợ động từ). Je n'en mange pas. / Je n'en ai pas mangé.\n« ne » KHÔNG đứng trước « en » mà đứng trước cả cụm « en + động từ »." },

          { type:"callout", variant:"note", title:"Trong khẩu ngữ: « j'en ai pas »",
            text:"Ở văn nói thân mật, người Pháp hay bỏ « ne » và chỉ nói « j'en ai pas » thay vì « je n'en ai pas ». Hiểu được cả hai, nhưng khi viết luôn giữ đủ « ne… pas »." },

          { type:"heading", text:"Khi nào giữ lại số lượng sau « en »?" },
          { type:"text", text:"Khi câu trả lời nêu một SỐ LƯỢNG khác với câu hỏi (kể cả bằng con số), số lượng đó vẫn phải nhắc lại sau động từ: « Je n'en propose pas un, mais trois. » — « en » thay « couscous », còn « trois » (số lượng mới) vẫn giữ nguyên." },

          { type:"compare", items:[
            { wrong:"Je ne mange pas en.", right:"Je n'en mange pas.", why:"« en » luôn đứng NGAY SAU ne/n', không phải sau động từ." },
            { wrong:"Non, je ne propose pas en un.", right:"Non, je n'en propose pas un.", why:"« en » đứng giữa n' và động từ; số lượng « un » giữ nguyên ở cuối câu." },
          ] },
        ],
        examples:[
          "De la salade, j'en ai mis dans mon jardin. — Rau diếp, tôi đã trồng trong vườn.",
          "De couscous, je n'en propose pas un, mais trois ! — Về couscous, tôi không chỉ có một loại, mà những ba loại!",
          "Des tomates, des courges et des haricots, j'en consomme beaucoup. — Cà chua, bí và đậu, tôi ăn rất nhiều.",
          "Tu as une grande poêle ? – Oui, j'en ai une. — Bạn có chảo to không? – Có, tôi có một cái.",
          "Est-ce qu'il y a de la crème fraîche dans la tartiflette ? – Oui, il y en a. — Có kem tươi trong món tartiflette không? – Có, có đấy.",
        ]
      },

      // ── 2. L'obligation et l'interdiction ────────────────────────
      {
        topic:"L'obligation et l'interdiction — Bắt buộc & cấm đoán",
        summary:"Hai nhóm cấu trúc đối lập nhau: một nhóm diễn tả điều BẮT BUỘC phải làm (il faut, il est nécessaire de, vous avez l'obligation de…), nhóm kia diễn tả điều BỊ CẤM (il est interdit de, il est défendu de, vous ne devez pas…). Cả hai đều có thể diễn đạt bằng L'IMPÉRATIF, ở thể khẳng định hoặc phủ định.",
        blocks:[
          { type:"lead", text:"Cùng một ý « phải/không được », tiếng Pháp có nhiều cách diễn đạt trang trọng khác nhau (giống văn bản quy định, biển báo, nội quy) — học theo CẶP đối lập sẽ dễ nhớ hơn học rời rạc." },

          { type:"table",
            caption:"Bắt buộc ≠ Cấm đoán — 2 cột đối lập",
            headers:["L'obligation (bắt buộc)", "L'interdiction (cấm đoán)"],
            rows:[
              ["Il faut + infinitif", "Il ne faut pas + infinitif"],
              ["Il est nécessaire de + infinitif", "Il est interdit de + infinitif"],
              ["Il est indispensable de + infinitif", "Il est défendu de + infinitif"],
              ["Vous avez l'obligation de + infinitif", "Vous ne devez pas + infinitif"],
              ["L'impératif, thể khẳng định : Faites attention !", "L'impératif, thể phủ định : Ne laissez pas entrer d'animal."],
            ] },

          { type:"formula",
            parts:["Il est interdit / défendu / nécessaire / indispensable de", "+ infinitif"],
            example:"Il est interdit de vendre vos plats de manière régulière. — Bị cấm bán các món ăn của bạn một cách thường xuyên.",
            note:"Sau « il est + tính từ + de », động từ LUÔN ở dạng NGUYÊN THỂ, không chia." },

          { type:"callout", variant:"warn", title:"Verbe pronominal ở mệnh lệnh khẳng định: đại từ ra SAU động từ",
            text:"Se laver les mains → Lavez-vous les mains ! — đại từ phản thân (vous, te→toi, nous) chuyển ra SAU động từ và có gạch nối, khác hẳn câu bình thường (Vous vous lavez les mains).\nỞ thể PHỦ ĐỊNH, đại từ vẫn đứng TRƯỚC như bình thường: Ne vous lavez pas les mains sales." },

          { type:"table",
            caption:"Impératif — 3 ngôi duy nhất, không có chủ ngữ",
            headers:["Ngôi", "Khẳng định", "Phủ định"],
            rows:[
              ["tu", "Fais attention !", "Ne fais pas ça !"],
              ["nous", "Faisons attention !", "Ne faisons pas ça !"],
              ["vous", "Faites attention !", "Ne faites pas ça !"],
            ] },

          { type:"heading", text:"« devoir » — trợ động từ diễn tả cả hai chiều" },
          { type:"pairs", caption:"devoir (bắt buộc) ≠ ne pas devoir (cấm)", items:[
            { fr:"Vous avez l'obligation de préparer uniquement des plats faits maison.", vi:"Bạn bắt buộc chỉ được chuẩn bị các món tự nấu tại nhà." },
            { fr:"Vous ne devez pas être cuisinier ou cuisinière de métier.", vi:"Bạn không được phép là đầu bếp chuyên nghiệp." },
          ] },

          { type:"compare", items:[
            { wrong:"Il est interdit vendre vos plats.", right:"Il est interdit de vendre vos plats.", why:"« il est interdit DE + infinitif » luôn cần « de » trước động từ nguyên thể." },
            { wrong:"Lavez vous les mains !", right:"Lavez-vous les mains !", why:"Ở mệnh lệnh khẳng định, đại từ phản thân nối với động từ bằng GẠCH NỐI, không phải khoảng trắng." },
          ] },
        ],
        examples:[
          "Il faut avoir une bonne hygiène personnelle. — Phải giữ vệ sinh cá nhân tốt.",
          "Il est indispensable de cuisiner des produits frais et de qualité. — Việc nấu ăn từ nguyên liệu tươi và chất lượng là không thể thiếu.",
          "Il est défendu de cuisiner dans des conditions non hygiéniques. — Bị cấm nấu ăn trong điều kiện mất vệ sinh.",
          "Ne laissez pas d'animal entrer dans votre cuisine, c'est dangereux. — Đừng để động vật vào bếp, nguy hiểm đấy.",
          "Ne vous asseyez pas ici, un groupe a réservé cette table. — Đừng ngồi đây, một nhóm đã đặt bàn này rồi.",
        ]
      },

      // ── 3. La restriction : ne… que ──────────────────────────────
      {
        topic:"La restriction : ne… que — Chỉ, duy nhất",
        summary:"« ne… que » diễn tả một sự HẠN CHẾ/GIỚI HẠN — có thể thay bằng uniquement, juste hoặc seulement. Khác với phủ định « ne… pas », « ne… que » KHÔNG phủ định cả câu, mà chỉ giới hạn nó lại ở MỘT điều duy nhất.",
        blocks:[
          { type:"lead", text:"« Je ne mange que des légumes » không có nghĩa « tôi không ăn rau » — nó có nghĩa « tôi CHỈ ăn rau, không ăn gì khác ». Đây là điểm dễ nhầm nhất: « que » ở đây không phải liên từ « rằng », mà là nửa sau của cấu trúc phủ định-giới hạn." },

          { type:"formula",
            parts:["ne/n'", "+ động từ", "+ que/qu'", "+ phần bị giới hạn"],
            example:"Je ne mets que 4 étoiles sur 5. — Tôi chỉ cho 4 trên 5 sao thôi.",
            note:"« que/qu' » đứng NGAY TRƯỚC phần bị giới hạn (danh từ, số lượng…), không phải ngay sau động từ như « pas »." },

          { type:"table",
            caption:"Emploi và formation",
            headers:["Emploi (dùng khi nào)", "Formation (cách đặt câu)"],
            rows:[
              ["Diễn tả một sự HẠN CHẾ — thay được bằng uniquement/juste/seulement.", "ne/n' đặt TRƯỚC động từ, que/qu' đặt SAU động từ (trước phần bị giới hạn)."],
            ] },

          { type:"callout", variant:"tip", title:"3 từ đồng nghĩa để kiểm tra nghĩa",
            text:"Muốn chắc câu có « ne… que » đúng nghĩa « chỉ/duy nhất », thử thay bằng uniquement, juste hoặc seulement — nếu câu vẫn có nghĩa, đó là restriction:\nCe restaurant ne propose que des plats à base de riz. = Ce restaurant propose UNIQUEMENT des plats à base de riz." },

          { type:"callout", variant:"warn", title:"« ne… pas que » ≠ « ne… que »",
            text:"Elle n'achète pas que des produits sains. — Cô ấy KHÔNG CHỈ mua đồ lành mạnh (nghĩa là còn mua thứ khác nữa) — khác hẳn « elle n'achète que des produits sains » (cô ấy CHỈ mua đồ lành mạnh).\nIl ne mange plus que du poulet. — Trước đây anh ấy ăn mọi loại thịt; giờ CHỈ CÒN ăn gà thôi (« ne… plus que » = đã thay đổi thói quen, giờ chỉ giới hạn ở một thứ)." },

          { type:"heading", text:"« il ne m'en reste qu'un » — kết hợp với pronom en" },
          { type:"text", text:"« ne… que » có thể xuất hiện cùng « en » trong một câu: « Il ne m'en reste qu'un » (Tôi chỉ còn lại một cái) — « en » thay danh từ, « ne… que » giới hạn số lượng còn lại." },

          { type:"compare", items:[
            { wrong:"Je mange que des légumes de mon jardin.", right:"Je ne mange que des légumes de mon jardin.", why:"« ne » KHÔNG được bỏ trong văn viết — phải giữ đủ « ne… que »." },
            { wrong:"Nous n'allons que dans des restaurants sans étoile pas.", right:"Nous n'allons que dans des restaurants sans étoile.", why:"« ne… que » không đi kèm « pas » — « que » đã đóng vai trò giới hạn, không cần thêm « pas »." },
          ] },
        ],
        examples:[
          "Je ne mets qu'une étoile, et encore, je suis gentil. — Tôi chỉ cho một sao thôi, thế còn là tôi tử tế đấy.",
          "Ce restaurant, je ne peux en dire que du bien. — Về nhà hàng này, tôi chỉ có thể nói tốt thôi.",
          "Il ne m'en reste qu'un. — Tôi chỉ còn lại một cái (bánh) thôi.",
          "Ce restaurant ne propose que des plats à base de riz. — Nhà hàng này chỉ phục vụ các món làm từ gạo.",
          "Je suis juste allergique aux œufs. → Je ne suis allergique qu'aux œufs. — Tôi chỉ dị ứng với trứng thôi.",
        ]
      },
    ]
  },

  {
    id:"b7", num:"7", title:"À votre santé !", points:[

      // ── 1. Les pronoms COD et COI ────────────────────────────────
      {
        topic:"Les pronoms COD et COI — Tránh lặp lại người/vật đã nhắc tới",
        summary:"COD (complément d'objet direct) và COI (complément d'objet indirect) là hai loại đại từ thay thế bổ ngữ đã nhắc ở câu trước, giúp câu gọn hơn. COD trả lời câu hỏi « quoi ?/qui ? » (không có « à »); COI trả lời câu hỏi « à qui ?/à quoi ? » (động từ đi với « à »). Cả hai đều đứng NGAY TRƯỚC động từ chia.",
        blocks:[
          { type:"lead", text:"Câu hỏi cốt lõi để chọn đúng loại đại từ: động từ có « à » trước bổ ngữ chỉ người không? Có « à » → COI (me, te, lui, nous, vous, leur). Không có « à » → COD (me, te, le/la/l', nous, vous, les)." },

          { type:"table",
            caption:"Bảng đại từ COD và COI theo ngôi",
            headers:["Ngôi", "Pronom COD", "Pronom COI"],
            rows:[
              ["je", "me/m'", "me/m'"],
              ["tu", "te/t'", "te/t'"],
              ["il/elle", "le/la/l'", "lui"],
              ["nous", "nous", "nous"],
              ["vous", "vous", "vous"],
              ["ils/elles", "les", "leur"],
            ] },

          { type:"formula",
            parts:["Chủ ngữ", "+ pronom (COD/COI)", "+ động từ chia"],
            example:"Tu donnes des conseils à Hamid ? – Oui, je lui conseille de dormir sur le côté. — Bạn có khuyên Hamid không? – Có, tôi khuyên anh ấy nên nằm nghiêng.",
            note:"Đại từ luôn đứng NGAY TRƯỚC động từ được chia (hoặc trước trợ động từ ở passé composé)." },

          { type:"heading", text:"COD — trả lời « quoi ? » hoặc « qui ? » (không « à »)" },
          { type:"pairs", caption:"COD thay một danh từ KHÔNG đi với « à »", items:[
            { fr:"Tu as acheté l'oreiller parfait ? – Oui, je l'ai acheté.", vi:"Bạn đã mua chiếc gối hoàn hảo chưa? – Rồi, tôi đã mua nó. (l' = l'oreiller)" },
            { fr:"Placez un oreiller sous votre bras pour le surélever.", vi:"Đặt một chiếc gối dưới cánh tay để nâng nó lên. (le = votre bras)" },
          ] },

          { type:"heading", text:"COI — trả lời « à qui ? » hoặc « à quoi ? » (động từ + à)" },
          { type:"callout", variant:"note", title:"Nhóm động từ hay đi với COI cần nhớ",
            text:"apporter, conseiller, demander, donner, écrire, expliquer, lire, offrir, prêter/emprunter, répondre (quelque chose) À quelqu'un — tất cả đều có cấu trúc « verbe + à + người », nên bổ ngữ người phải thay bằng COI, không phải COD." },
          { type:"pairs", caption:"COI thay một danh từ đi CÙNG « à »", items:[
            { fr:"Vos chevilles seront plus reposées : l'oreiller leur évite des tensions inutiles.", vi:"Mắt cá chân bạn sẽ được nghỉ ngơi hơn: chiếc gối giúp chúng tránh những căng thẳng không cần thiết. (leur = à vos chevilles)" },
            { fr:"Je vous déconseille de dormir sur le ventre.", vi:"Tôi khuyên bạn không nên ngủ sấp. (vous = à vous, COI vì « déconseiller à quelqu'un »)" },
          ] },

          { type:"callout", variant:"warn", title:"1re và 2e ngôi: COD và COI giống hệt nhau",
            text:"me/m', te/t', nous, vous KHÔNG phân biệt COD/COI — chỉ ngôi thứ ba (il/elle, ils/elles) mới có hai dạng khác nhau: le/la/l'/les (COD) ≠ lui/leur (COI)." },

          { type:"compare", items:[
            { wrong:"Je téléphone lui tous les soirs.", right:"Je lui téléphone tous les soirs.", why:"Đại từ (COD/COI) luôn đứng TRƯỚC động từ chia, không phải sau." },
            { wrong:"Raoul le lit une histoire tous les soirs à ses filles.", right:"Raoul leur lit une histoire tous les soirs.", why:"« lire une histoire À ses filles » → bổ ngữ người đi với « à » nên phải là COI « leur », không phải COD « le »." },
          ] },
        ],
        examples:[
          "J'aime beaucoup faire la sieste. → Je l'aime beaucoup. — Tôi rất thích ngủ trưa. → Tôi rất thích nó.",
          "Vous écrirez un courrier à ce spécialiste du sommeil. → Vous lui écrirez un courrier. — Bạn sẽ viết thư cho chuyên gia về giấc ngủ này. → Bạn sẽ viết thư cho ông ấy.",
          "J'offre une séance dans un bar à sieste à mon frère. → Je lui offre une séance. — Tôi tặng em trai một buổi trong quán bar ngủ trưa. → Tôi tặng anh ấy một buổi.",
          "J'emprunte un livre sur le sommeil à Michèle. → Je lui emprunte un livre. — Tôi mượn Michèle một cuốn sách về giấc ngủ. → Tôi mượn cô ấy một cuốn sách.",
          "Béatrice ne téléphone jamais à ses parents le soir. → Elle ne leur téléphone jamais. — Béatrice không bao giờ gọi điện cho bố mẹ vào buổi tối. → Cô ấy không bao giờ gọi cho họ.",
        ]
      },

      // ── 2. Le superlatif ──────────────────────────────────────────
      {
        topic:"Le superlatif — So sánh HƠN NHẤT / KÉM NHẤT trong một nhóm",
        summary:"Superlatif diễn tả mức độ CAO NHẤT (supériorité) hay THẤP NHẤT (infériorité) so với cả một nhóm — khác với so sánh hơn (comparatif) chỉ so sánh hai đối tượng. Có 2 trường hợp bất quy tắc cần nhớ riêng: meilleur(e)(s) (từ bon) và mieux (từ bien).",
        blocks:[
          { type:"lead", text:"Cấu trúc superlatif luôn cần mạo từ xác định (le/la/les) đứng trước « plus/moins » — mạo từ này hợp giống/số theo danh từ mà tính từ bổ nghĩa." },

          { type:"table",
            caption:"Superlatif de supériorité (+) và d'infériorité (–)",
            headers:["Loại", "Công thức", "Ví dụ"],
            rows:[
              ["+ Supériorité", "le/la/les + PLUS + tính từ + (de + danh từ)", "C'est l'infirmière la plus sympathique de l'hôpital."],
              ["– Infériorité", "le/la/les + MOINS + tính từ + (de + danh từ)", "C'est le sirop pour la toux le moins bon."],
            ] },

          { type:"formula",
            parts:["le/la/les", "+ plus/moins", "+ tính từ", "(+ de + danh từ)"],
            example:"L'eucalyptus est la plus efficace des plantes contre le rhume. — Bạch đàn là cây hiệu quả nhất trong số các cây chống cảm.",
            note:"Cụm « de + danh từ » ở cuối (không bắt buộc) chỉ RÕ nhóm đang so sánh — dịch là « trong số… »." },

          { type:"heading", text:"2 trường hợp bất quy tắc: meilleur(e)(s) và mieux" },
          { type:"table",
            caption:"bon → meilleur (tính từ) ≠ bien → mieux (trạng từ)",
            headers:["Từ gốc", "Superlatif", "Bổ nghĩa cho"],
            rows:[
              ["bon, bonne, bons, bonnes (tính từ)", "le meilleur, la meilleure, les meilleur(e)s", "một DANH TỪ — Ce sont les meilleures plantes pour les tisanes."],
              ["bien (trạng từ)", "le mieux (không đổi giống/số)", "một ĐỘNG TỪ — C'est le romarin qui soulage le mieux les migraines."],
            ] },

          { type:"callout", variant:"tip", title:"Mẹo phân biệt meilleur ≠ mieux",
            text:"Tự hỏi: từ đang bổ nghĩa cho DANH TỪ hay ĐỘNG TỪ?\n• Bổ nghĩa danh từ (một cái gì đó « tốt ») → meilleur(e)(s), hợp giống/số\n• Bổ nghĩa động từ (làm việc gì « tốt/giỏi ») → mieux, không bao giờ đổi dạng\nC'est le meilleur bar à sieste de la ville. (danh từ « bar ») / C'est ce sirop qui fonctionne le mieux. (động từ « fonctionne »)" },

          { type:"callout", variant:"warn", title:"Đừng nhầm « plus bon » — luôn dùng meilleur",
            text:"Khác với đa số tính từ (plus + tính từ), « bon » KHÔNG BAO GIỜ dùng « le plus bon » — luôn phải là « le meilleur/la meilleure ». Đây là ngoại lệ bắt buộc nhớ." },

          { type:"compare", items:[
            { wrong:"C'est le plus bon remède.", right:"C'est le meilleur remède.", why:"« bon » có superlatif riêng « meilleur », không ghép với « plus »." },
            { wrong:"C'est ce sirop qui fonctionne le meilleur.", right:"C'est ce sirop qui fonctionne le mieux.", why:"« fonctionner » là động từ → cần trạng từ « mieux », không phải tính từ « meilleur »." },
          ] },
        ],
        examples:[
          "C'est peut-être la plante la moins connue de cette liste. — Đây có lẽ là loại cây ít được biết đến nhất trong danh sách này.",
          "Un bon lit, ce n'est pas le plus important pour bien dormir. — Một chiếc giường tốt không phải là điều quan trọng nhất để ngủ ngon.",
          "Les tisanes ne coûtent pas cher. C'est le remède le plus économique. — Trà thảo mộc không đắt. Đó là phương thuốc kinh tế nhất.",
          "C'est dans mon canapé que je dors le mieux. — Chính trên ghế sofa của tôi là nơi tôi ngủ ngon nhất.",
          "Ce médecin est le plus célèbre de la région. — Bác sĩ này nổi tiếng nhất trong vùng.",
        ]
      },

      // ── 3. Les pronoms interrogatifs (lequel…) ────────────────────
      {
        topic:"Les pronoms interrogatifs lequel, laquelle, lesquels, lesquelles — Hỏi để CHỌN giữa nhiều thứ",
        summary:"Khác với « quel/quelle/quels/quelles » (adjectif interrogatif, luôn đi kèm một DANH TỪ), « lequel/laquelle/lesquels/lesquelles » là PRONOM — thay thế hẳn danh từ đã nhắc, dùng khi hỏi để CHỌN một hoặc nhiều phần tử trong số nhiều thứ đã biết.",
        blocks:[
          { type:"lead", text:"« quel/quelle » luôn đứng NGAY TRƯỚC một danh từ (Quelles gouttes tu prends ?). « lequel/laquelle… » đứng MỘT MÌNH, thay thế danh từ đó (Tu as vu ces tisanes ? Laquelle choisis-tu ?)." },

          { type:"table",
            caption:"Les pronoms interrogatifs — hợp giống/số với danh từ được thay thế",
            headers:["", "Số ít", "Số nhiều"],
            rows:[
              ["Giống đực", "lequel", "lesquels"],
              ["Giống cái", "laquelle", "lesquelles"],
            ] },

          { type:"formula",
            parts:["Lequel/Laquelle/Lesquels/Lesquelles", "+ động từ (đảo chủ ngữ hoặc est-ce que)"],
            example:"Voici trois numéros d'urgence, lequel composez-vous ? — Đây là ba số khẩn cấp, bạn sẽ gọi số nào?",
            note:"Đại từ hợp giống/số theo danh từ nó thay thế — dù danh từ đó không còn xuất hiện trong câu hỏi." },

          { type:"table",
            caption:"So sánh: quel (adjectif) ≠ lequel (pronom)",
            headers:["", "Vai trò", "Ví dụ"],
            rows:[
              ["quel, quelle, quels, quelles", "Adjectif — luôn kèm một DANH TỪ ngay sau", "Quelles gouttes pour le nez tu prends ?"],
              ["lequel, laquelle, lesquels, lesquelles", "Pronom — đứng MỘT MÌNH, THAY danh từ đã biết", "Il y a beaucoup de traitements différents. Lesquels sont les moins chers ?"],
            ] },

          { type:"callout", variant:"tip", title:"Mẹo nhận biết: có danh từ đi kèm ngay sau không?",
            text:"Nếu ngay sau từ hỏi CÓ một danh từ → dùng quel/quelle/quels/quelles (adjectif).\nNếu từ hỏi đứng MỘT MÌNH, không kèm danh từ → dùng lequel/laquelle/lesquels/lesquelles (pronom), vì danh từ đã được nhắc ở câu trước." },

          { type:"heading", text:"« lequel » chỉ dùng khi có sự CHỌN LỰA giữa nhiều phần tử" },
          { type:"text", text:"Un de tes enfants est malade ? Lequel ? — câu hỏi ngụ ý phải CHỌN một trong số các con đã biết trước (nhiều đứa trẻ), khác với một câu hỏi mở không có sự lựa chọn cụ thể." },

          { type:"compare", items:[
            { wrong:"Quel de ces traitements est le moins cher ?", right:"Lequel de ces traitements est le moins cher ?", why:"Khi hỏi để CHỌN trong một nhóm đã biết, dùng pronom « lequel », không phải adjectif « quel » (vì không có danh từ ngay sau « quel »)." },
            { wrong:"Tu as vu ces tisanes ? Quelle choisis-tu ?", right:"Tu as vu ces tisanes ? Laquelle choisis-tu ?", why:"« tisanes » đã được nhắc ở câu trước, câu sau phải dùng pronom « laquelle » để THAY thế, không lặp lại bằng adjectif." },
          ] },
        ],
        examples:[
          "Dans quel ordre devez-vous agir ? — Bạn phải hành động theo thứ tự nào?",
          "Parmi les actions suivantes, lesquelles sont utiles pour faciliter l'arrivée des secours ? — Trong số các hành động sau, hành động nào hữu ích để giúp cứu hộ đến nhanh hơn?",
          "Tes malades vont-ils mieux ? Lesquels peuvent sortir de l'hôpital ? — Bệnh nhân của bạn có khỏe hơn không? Những ai có thể xuất viện?",
          "D'après toi, quelles études médicales sont intéressantes ? — Theo bạn, ngành học y khoa nào thú vị?",
          "À quelle heure tu rentres ? — Mấy giờ bạn về?",
        ]
      },
    ]
  },

  {
    id:"b8", num:"8", title:"Dans les médias", points:[

      // ── 1. La cause et la conséquence ──────────────────────────────
      {
        topic:"La cause et la conséquence — Giải thích LÝ DO và KẾT QUẢ",
        summary:"Để nối một lý do (cause) với kết quả của nó (conséquence), tiếng Pháp có hai bộ liên từ riêng biệt. Chọn từ nào phụ thuộc vào: (1) câu văn hay câu nói miệng, và (2) sau liên từ là MỆNH ĐỀ (chủ ngữ + động từ) hay chỉ một DANH TỪ.",
        blocks:[
          { type:"lead", text:"Câu hỏi cốt lõi: bạn đang giới thiệu LÝ DO (tại sao?) hay KẾT QUẢ (vậy nên?) — và sau liên từ có phải là một câu hoàn chỉnh hay chỉ một danh từ?" },

          { type:"table",
            caption:"La cause — parce que / car / à cause de / grâce à",
            headers:["Liên từ", "Theo sau bởi", "Sắc thái", "Ví dụ"],
            rows:[
              ["parce que", "mệnh đề (chủ ngữ + động từ)", "trung tính, dùng cả nói lẫn viết", "Des journalistes utilisent Twitch parce que c'est interactif."],
              ["car", "mệnh đề", "chỉ dùng trong VĂN VIẾT", "La Revue Dessinée est trimestrielle, car elle prend le temps de mener des enquêtes."],
              ["à cause de + danh từ", "danh từ (không phải mệnh đề)", "cause TIÊU CỰC", "À cause d'Internet, la presse papier a des difficultés."],
              ["grâce à + danh từ", "danh từ (không phải mệnh đề)", "cause TÍCH CỰC", "Je suis toujours informée grâce aux réseaux sociaux."],
            ] },

          { type:"table",
            caption:"La conséquence — donc / alors / c'est pourquoi / c'est pour cela que",
            headers:["Liên từ", "Sắc thái", "Ví dụ"],
            rows:[
              ["donc", "chủ yếu VĂN VIẾT", "L'interaction séduit le public, le succès de Twitch n'a donc rien d'étonnant."],
              ["alors", "chủ yếu NÓI MIỆNG", "Tu reçois les nouvelles sur ton téléphone, alors tu n'as pas besoin de les chercher."],
              ["c'est pourquoi / c'est pour cela que", "VĂN VIẾT trang trọng", "Nous donnons une grande importance à la diversité. C'est pourquoi vous découvrirez toutes sortes de sujets."],
              ["c'est pour ça que", "NÓI MIỆNG (thân mật)", "Les articles sont trop longs, c'est pour ça que je ne lis que les titres."],
            ] },

          { type:"formula",
            parts:["Cause", "+ parce que/car/donc/alors", "+ Conséquence"],
            example:"Les jeunes préfèrent les réseaux sociaux, alors ils ne regardent plus la télévision.",
            note:"Với « à cause de » và « grâce à », thứ tự có thể đảo: cụm cause có thể đứng ĐẦU câu, theo sau là dấu phẩy — À cause de(s) réseaux sociaux, il ne sort plus de chez lui." },

          { type:"callout", variant:"tip", title:"Mẹo chọn à cause de ≠ grâce à",
            text:"Cả hai đều + DANH TỪ (không phải mệnh đề), nhưng khác nhau ở SẮC THÁI: kết quả là điều XẤU/KHÔNG MONG MUỐN → à cause de; kết quả là điều TỐT/ĐÁNG MONG → grâce à.\nÀ cause des images horribles, je ne regarde plus le JT. (xấu)\nGrâce à Twitch, les médias touchent un public plus jeune. (tốt)" },

          { type:"callout", variant:"warn", title:"Đừng nhầm « à cause de/grâce à » với « parce que/car »",
            text:"« à cause de » và « grâce à » PHẢI theo sau bởi một DANH TỪ (à cause de + nom), KHÔNG được theo sau bởi một mệnh đề đầy đủ. Nếu muốn diễn đạt bằng mệnh đề (chủ ngữ + động từ), phải dùng « parce que » hoặc « car »." },

          { type:"compare", items:[
            { wrong:"À cause qu'il pleut, je reste chez moi.", right:"Parce qu'il pleut, je reste chez moi. / À cause de la pluie, je reste chez moi.", why:"« à cause de » cần một DANH TỪ theo sau (la pluie), không phải mệnh đề « qu'il pleut »." },
            { wrong:"J'ai raté mon bus, grâce à ça je suis arrivé en retard.", right:"J'ai raté mon bus, à cause de ça je suis arrivé en retard.", why:"Đến muộn là kết quả TIÊU CỰC nên phải dùng « à cause de », không phải « grâce à » (chỉ dùng cho kết quả tích cực)." },
          ] },
        ],
        examples:[
          "Je ne peux pas regarder le journal télé, à cause des images qui sont souvent horribles. — Tôi không thể xem bản tin truyền hình, vì những hình ảnh thường rất kinh khủng.",
          "Grâce à Twitch, les médias classiques essaient de toucher un public plus jeune. — Nhờ có Twitch, các phương tiện truyền thông truyền thống cố gắng tiếp cận một công chúng trẻ hơn.",
          "Des journalistes font des revues de presse interactives car c'est bien l'interaction qui séduit le public actuel. — Các nhà báo làm điểm báo tương tác vì chính sự tương tác thu hút công chúng hiện nay.",
          "L'interaction séduit le public, le succès de Twitch n'a donc rien d'étonnant. — Sự tương tác thu hút công chúng, vậy nên thành công của Twitch chẳng có gì đáng ngạc nhiên.",
          "Tu reçois les nouvelles sur ton téléphone, alors tu n'as pas besoin de les chercher. — Bạn nhận tin tức trên điện thoại, vậy nên bạn không cần phải tìm kiếm chúng.",
          "Nous donnons une grande importance à la diversité. C'est pourquoi vous découvrirez toutes sortes de sujets. — Chúng tôi rất coi trọng sự đa dạng. Đó là lý do vì sao bạn sẽ khám phá đủ loại chủ đề.",
        ]
      },

      // ── 2. Le subjonctif présent (nécessité, opinion) ──────────────
      {
        topic:"Le subjonctif présent — Diễn đạt SỰ CẦN THIẾT và Ý KIẾN/ĐÁNH GIÁ",
        summary:"Subjonctif présent là một thức (mode) mới, khác với indicatif (thì trình bày sự thật khách quan). Nó bắt buộc xuất hiện sau các động từ/cấu trúc diễn tả sự CẦN THIẾT (il faut que, il est important que) hoặc một Ý KIẾN/ĐÁNH GIÁ chủ quan (c'est bien que, il est normal que…) khi câu có « que » và chủ ngữ thứ hai khác chủ ngữ thứ nhất.",
        blocks:[
          { type:"lead", text:"Công thức chung: [động từ/cấu trúc diễn tả sự cần thiết hoặc ý kiến] + QUE + [chủ ngữ mới] + [động từ ở SUBJONCTIF]." },

          { type:"table",
            caption:"Khi nào dùng subjonctif?",
            headers:["Loại cấu trúc", "Ví dụ mở đầu câu"],
            rows:[
              ["Sự cần thiết (nécessité)", "il faut que…, il est important que…, il est indispensable que…, il ne faut pas que…"],
              ["Ý kiến/đánh giá (opinion, jugement de valeur)", "c'est/il est + tính từ + que…  (c'est bien que, c'est normal que, c'est génial que…)"],
            ] },

          { type:"heading", text:"Cách chia — động từ đều đặn (-er : informer)" },
          { type:"table",
            caption:"que j'informe — que nous informions",
            headers:["Ngôi", "Subjonctif présent"],
            rows:[
              ["je", "que j'informe"],
              ["tu", "que tu informes"],
              ["il/elle/on", "qu'il/elle/on informe"],
              ["nous", "que nous informions"],
              ["vous", "que vous informiez"],
              ["ils/elles", "qu'ils/elles informent"],
            ] },

          { type:"formula",
            parts:["Gốc = ils/elles ở hiện tại (bỏ -ent)", "+ -e, -es, -e, -ent (je/tu/il/ils)", "nous/vous = như imparfait"],
            example:"ils informent → j'informe, tu informes, il informe, ils informent. nous informions, vous informiez (giống hệt gốc imparfait).",
            note:"Với động từ -er đều đặn, subjonctif ở je/tu/il/ils GIỐNG HỆT présent de l'indicatif — chỉ nous/vous khác (thêm -i- như imparfait)." },

          { type:"heading", text:"3 động từ bất quy tắc quan trọng: être, avoir, aller" },
          { type:"table",
            caption:"être / avoir / aller ở subjonctif présent",
            headers:["être", "avoir", "aller"],
            rows:[
              ["que je sois", "que j'aie", "que j'aille"],
              ["que tu sois", "que tu aies", "que tu ailles"],
              ["qu'il/elle/on soit", "qu'il/elle/on ait", "qu'il/elle/on aille"],
              ["que nous soyons", "que nous ayons", "que nous allions"],
              ["que vous soyez", "que vous ayez", "que vous alliez"],
              ["qu'ils/elles soient", "qu'ils/elles aient", "qu'ils/elles aillent"],
            ] },

          { type:"callout", variant:"tip", title:"Mẹo nhớ 3 động từ bất quy tắc",
            text:"être → gốc « soi- » (sois, soit, soient) nhưng nous/vous = soyons/soyez.\navoir → gốc « ai- » (aie, aies, ait, aient) nhưng nous/vous = ayons/ayez.\naller → gốc « aill- » (aille, ailles, aillent) nhưng nous/vous = allions/alliez (giống gốc présent « nous allons »)." },

          { type:"callout", variant:"warn", title:"« il faut que » ≠ « il faut + infinitif »",
            text:"« il faut + infinitif » dùng khi KHÔNG nêu rõ ai phải làm (chung chung): Il faut s'informer. « il faut que + subjonctif » dùng khi nêu RÕ chủ ngữ cụ thể: Il faut que tu t'informes." },

          { type:"compare", items:[
            { wrong:"Il faut que tu es plus prudent sur Internet.", right:"Il faut que tu sois plus prudent sur Internet.", why:"Sau « il faut que » PHẢI dùng subjonctif « sois » (être), không phải indicatif « es »." },
            { wrong:"Il est important qu'ils ont cette information.", right:"Il est important qu'ils aient cette information.", why:"Sau cấu trúc ý kiến/cần thiết « il est important que », động từ « avoir » phải chia subjonctif « aient », không phải indicatif « ont »." },
          ] },
        ],
        examples:[
          "Il faut qu'on accompagne ces publics. — Cần phải đồng hành cùng những công chúng này.",
          "Il est important que les réseaux sociaux s'adaptent aux différents publics. — Việc mạng xã hội thích ứng với các công chúng khác nhau là quan trọng.",
          "C'est normal qu'on soit sur les réseaux sociaux, nous aussi ! — Chuyện chúng ta cũng dùng mạng xã hội là bình thường thôi!",
          "C'est très bien que les personnes âgées soient plus connectées. — Việc người cao tuổi kết nối nhiều hơn là điều rất tốt.",
          "Il ne faut pas que tu utilises Instagram tout le temps. — Bạn không nên dùng Instagram suốt cả ngày.",
          "Il est indispensable qu'ils aient cette information. — Việc họ có được thông tin này là điều không thể thiếu.",
        ]
      },

      // ── 3. La place des pronoms COD et COI ─────────────────────────
      {
        topic:"La place des pronoms COD et COI — Vị trí đại từ theo THÌ của câu",
        summary:"Bài Unité 7 đã học pronoms COD/COI (le/la/les, lui/leur…) đứng TRƯỚC động từ ở thì đơn. Bài này mở rộng: vị trí đại từ THAY ĐỔI tùy theo cấu trúc thì — thì đơn, thì kép (passé composé), hay cấu trúc có động từ chia + động từ nguyên thể (futur proche, présent continu…).",
        blocks:[
          { type:"lead", text:"Nguyên tắc chung: đại từ COD/COI luôn đứng NGAY TRƯỚC động từ mà nó là bổ ngữ trực tiếp — nhưng trong câu có 2 động từ, phải xác định đại từ thuộc về động từ NÀO." },

          { type:"table",
            caption:"Vị trí pronom COD/COI theo cấu trúc thì",
            headers:["Cấu trúc", "Quy tắc", "Ví dụ"],
            rows:[
              ["Présent và các thì đơn khác", "Đại từ đứng TRƯỚC động từ chia", "Vous la connaissez. / Vous ne la connaissez pas."],
              ["Passé composé và các thì kép khác", "Đại từ đứng TRƯỚC trợ động từ (être/avoir)", "Je les ai aimés. / Je ne les ai pas aimés."],
              ["Futur proche, passé récent, présent continu", "Đại từ đứng SAU động từ chia và TRƯỚC động từ nguyên thể", "Je vais le regarder. / Je ne vais pas le regarder."],
            ] },

          { type:"table",
            caption:"Nhắc lại bảng đại từ COD/COI",
            headers:["Ngôi", "Pronom COD", "Pronom COI"],
            rows:[
              ["je", "me/m'", "me/m'"],
              ["tu", "te/t'", "te/t'"],
              ["il/elle", "le/la/l'", "lui"],
              ["nous", "nous", "nous"],
              ["vous", "vous", "vous"],
              ["ils/elles", "les", "leur"],
            ] },

          { type:"formula",
            parts:["aller/venir de/être en train de", "+ pronom COD/COI", "+ động từ nguyên thể"],
            example:"Ce film, je vais le regarder ce soir. — Bộ phim này, tối nay tôi sẽ xem nó.",
            note:"Ở cấu trúc 2 động từ, đại từ luôn bám sát động từ NGUYÊN THỂ (động từ mà nó thực sự là bổ ngữ), không phải động từ chia đứng trước." },

          { type:"heading", text:"Ở passé composé — phủ định « ne…pas » bao quanh cả trợ động từ" },
          { type:"pairs", caption:"Phủ định ở passé composé: ne + pronom + trợ động từ + pas", items:[
            { fr:"Je les ai aimés. → Je ne les ai pas aimés.", vi:"Tôi đã thích chúng. → Tôi đã không thích chúng." },
            { fr:"Il lui a parlé. → Il ne lui a pas parlé.", vi:"Anh ấy đã nói chuyện với cô ấy. → Anh ấy đã không nói chuyện với cô ấy." },
          ] },

          { type:"callout", variant:"warn", title:"Đừng đặt đại từ trước động từ chia trong cấu trúc 2 động từ",
            text:"Ở futur proche/présent continu, đại từ KHÔNG đứng trước động từ chia (vais/suis en train de) mà đứng ngay trước động từ NGUYÊN THỂ, vì đại từ là bổ ngữ của động từ nguyên thể đó, không phải của aller/être." },

          { type:"compare", items:[
            { wrong:"Je le vais regarder.", right:"Je vais le regarder.", why:"Đại từ phải đứng NGAY TRƯỚC động từ nguyên thể « regarder », không phải trước « vais »." },
            { wrong:"Nous allons ne pas le voir.", right:"Nous n'allons pas le voir.", why:"« ne…pas » bao quanh động từ chia « allons », còn đại từ « le » vẫn đứng trước động từ nguyên thể « voir »." },
            { wrong:"J'ai le aimé.", right:"Je l'ai aimé.", why:"Trước nguyên âm, « le/la » rút gọn thành « l' » — đại từ vẫn đứng trước trợ động từ « ai »." },
          ] },
        ],
        examples:[
          "Ce film, je le conseille à tous les fans de Romain Duris. — Bộ phim này, tôi giới thiệu nó cho tất cả người hâm mộ Romain Duris.",
          "Le rôle de Gustave Eiffel lui va très bien ! — Vai diễn Gustave Eiffel rất hợp với anh ấy!",
          "Les premières scènes, je les ai trouvées nulles. — Những cảnh đầu, tôi thấy chúng rất tệ.",
          "Mes enfants aussi : le film leur a beaucoup plu ! — Con tôi cũng vậy: bộ phim đã rất được lòng chúng!",
          "Nous allons voir ce film au cinéma. → Nous allons le voir au cinéma. — Chúng tôi sẽ đi xem bộ phim này ở rạp. → Chúng tôi sẽ đi xem nó ở rạp.",
          "J'ai conseillé à mes parents de regarder cette série. → Je leur ai conseillé de la regarder. — Tôi đã khuyên bố mẹ xem bộ phim truyền hình này. → Tôi đã khuyên họ xem nó.",
        ]
      },
    ]
  },

  {
    id:"b9", num:"9", title:"Consommer responsable", points:[

      // ── 1. Le conditionnel présent (1) ──────────────────────────────
      {
        topic:"Le conditionnel présent (1) — Xin lịch sự, ước muốn, lời khuyên, đề nghị",
        summary:"Conditionnel présent là một thức mới. Cách chia GIỐNG futur simple (gốc = nguyên thể của động từ), nhưng đuôi lại là đuôi của imparfait (-ais, -ais, -ait, -ions, -iez, -aient). Thức này dùng để: xin một cách LỊCH SỰ, diễn đạt một ƯỚC MUỐN, đưa ra một LỜI KHUYÊN, hoặc ĐỀ NGHỊ làm gì.",
        blocks:[
          { type:"lead", text:"Câu hỏi cốt lõi: bạn đang làm gì với câu này — xin lịch sự, ước muốn, khuyên, hay đề nghị? Cả 4 chức năng đều dùng CÙNG một thức: conditionnel présent." },

          { type:"table",
            caption:"4 cách dùng của conditionnel présent (1)",
            headers:["Chức năng", "Ví dụ"],
            rows:[
              ["Demande polie (xin lịch sự)", "Tu pourrais me donner plus d'informations s'il te plaît ?"],
              ["Souhait (ước muốn)", "J'aimerais arrêter d'acheter du matériel de sport."],
              ["Conseil (lời khuyên)", "Tu devrais refaire tes photos !"],
              ["Proposition (đề nghị)", "Ça te dirait d'en discuter ?"],
            ] },

          { type:"heading", text:"Cách chia" },
          { type:"formula",
            parts:["Gốc = NGUYÊN THỂ của động từ (giống futur simple)", "+ -ais, -ais, -ait, -ions, -iez, -aient (đuôi của imparfait)"],
            example:"aimer → j'aimerais. choisir → je choisirais. prendre → je prendrais (bỏ -e cuối trước khi thêm đuôi).",
            note:"Mẹo nhớ nhanh: conditionnel présent = gốc futur + đuôi imparfait. Nếu đã thuộc futur simple (Unité 5), chỉ cần đổi đuôi -ai/-as/-a/-ons/-ez/-ont thành -ais/-ais/-ait/-ions/-iez/-aient." },

          { type:"table",
            caption:"Các động từ bất quy tắc — CÙNG gốc với futur simple",
            headers:["Động từ", "Gốc", "je"],
            rows:[
              ["aller", "ir-", "j'irais"],
              ["avoir", "aur-", "j'aurais"],
              ["devoir", "devr-", "je devrais"],
              ["être", "ser-", "je serais"],
              ["faire", "fer-", "je ferais"],
              ["pouvoir", "pourr-", "je pourrais"],
              ["savoir", "saur-", "je saurais"],
              ["venir", "viendr-", "je viendrais"],
              ["voir", "verr-", "je verrais"],
              ["vouloir", "voudr-", "je voudrais"],
              ["il faut", "faudr-", "il faudrait"],
            ] },

          { type:"callout", variant:"tip", title:"« vouloir » và « pouvoir » ở conditionnel = lịch sự hơn",
            text:"Thay vì nói thẳng « Je veux un café » (hơi cộc), người Pháp dùng conditionnel « Je voudrais un café » để xin một cách lịch sự. Tương tự, « Pourrais-tu m'expliquer ? » lịch sự hơn « Peux-tu m'expliquer ? ». Riêng « pouvoir » ở conditionnel còn dùng để ĐỀ NGHỊ: On pourrait aller au cinéma !" },

          { type:"callout", variant:"warn", title:"Đừng nhầm conditionnel với futur simple",
            text:"Futur simple (Unité 5) dùng đuôi -ai/-as/-a/-ons/-ez/-ont (không có « i » trước đuôi ở je/tu/il/ils). Conditionnel présent dùng đuôi -ais/-ais/-ait/-ions/-iez/-aient (LUÔN có gốc imparfait « ai/i »). Ví dụ: j'irai (futur, sẽ đi) ≠ j'irais (conditionnel, tôi sẽ đi/muốn đi, tùy ngữ cảnh)." },

          { type:"compare", items:[
            { wrong:"Je veux emprunter des livres à la bibliothèque, s'il te plaît.", right:"Je voudrais emprunter des livres à la bibliothèque, s'il te plaît.", why:"Khi xin một cách lịch sự (có kèm « s'il te plaît »), nên dùng conditionnel « je voudrais » thay vì présent « je veux » nghe cộc hơn." },
            { wrong:"Tu devras regarder ce forum.", right:"Tu devrais regarder ce forum.", why:"Đưa ra LỜI KHUYÊN dùng conditionnel « tu devrais », không phải futur « tu devras » (diễn đạt một sự bắt buộc trong tương lai, không phải lời khuyên)." },
          ] },
        ],
        examples:[
          "J'aimerais arrêter d'acheter du matériel de sport. — Tôi muốn ngừng mua đồ dùng thể thao.",
          "Tu pourrais me donner plus d'informations s'il te plaît ? — Bạn có thể cho tôi thêm thông tin được không?",
          "Ça te dirait d'en discuter ? — Bạn có muốn bàn về chuyện đó không?",
          "Tu devrais refaire tes photos ! — Bạn nên chụp lại ảnh đi!",
          "Je souhaiterais économiser de l'argent. — Tôi ước gì có thể tiết kiệm được tiền.",
          "On pourrait aller au cinéma ce week-end ! — Chúng ta có thể đi xem phim cuối tuần này!",
        ]
      },

      // ── 2. Le gérondif ──────────────────────────────────────────────
      {
        topic:"Le gérondif — Diễn đạt HAI HÀNH ĐỘNG ĐỒNG THỜI hoặc CÁCH THỨC làm gì",
        summary:"Gérondif (« en » + động từ chia « -ant ») dùng khi CHỦ NGỮ của câu làm hai việc CÙNG MỘT LÚC, hoặc để trả lời câu hỏi « Comment ? » (làm bằng cách nào). Khác với participe présent, gérondif LUÔN có « en » đứng trước.",
        blocks:[
          { type:"lead", text:"Câu hỏi cốt lõi: hai hành động trong câu có xảy ra ĐỒNG THỜI, do CÙNG một chủ ngữ thực hiện không? Nếu có, có thể nối chúng bằng gérondif." },

          { type:"table",
            caption:"2 cách dùng của gérondif",
            headers:["Chức năng", "Ví dụ"],
            rows:[
              ["Đồng thời (simultanéité) — hai việc cùng lúc", "Elles cuisinent en écoutant de la musique."],
              ["Cách thức (manière) — trả lời « Comment ? »", "Elle est venue à l'atelier en courant."],
            ] },

          { type:"heading", text:"Cách hình thành" },
          { type:"formula",
            parts:["en", "+ gốc của « nous » ở hiện tại (bỏ -ons)", "+ -ant"],
            example:"regarder: nous regardons → en regardant. faire: nous faisons → en faisant.",
            note:"Gốc của gérondif LUÔN lấy từ ngôi « nous » ở thì hiện tại, kể cả với động từ bất quy tắc (nous faisons → en faisant, nous prenons → en prenant)." },

          { type:"table",
            caption:"3 động từ bất quy tắc",
            headers:["Động từ", "Gérondif"],
            rows:[
              ["être", "en étant"],
              ["avoir", "en ayant"],
              ["savoir", "en sachant"],
            ] },

          { type:"callout", variant:"tip", title:"Đại từ bổ ngữ đứng ở đâu?",
            text:"Nếu động từ trong gérondif có đại từ bổ ngữ (le/la/les/lui/leur/en/y…), đại từ đó đứng NGAY GIỮA « en » và động từ: Je fais du jardinage en lui parlant. (không phải « en parlant lui »)." },

          { type:"callout", variant:"warn", title:"Đừng nhầm gérondif với participe présent",
            text:"Participe présent (không có « en » đứng trước) mô tả một danh từ hoặc diễn tả nguyên nhân, KHÁC chủ ngữ với động từ chính. Gérondif (LUÔN có « en ») diễn tả một hành động ĐỒNG THỜI với hành động chính, do CÙNG một chủ ngữ. Ở trình độ A2, chỉ cần nhớ: có « en » + -ant = gérondif." },

          { type:"compare", items:[
            { wrong:"Il travaille chantant.", right:"Il travaille en chantant.", why:"Gérondif LUÔN cần « en » đứng trước động từ chia -ant — thiếu « en » là sai cấu trúc." },
            { wrong:"Nous bricolons en chante nos chansons préférées.", right:"Nous bricolons en chantant nos chansons préférées.", why:"Sau « en », động từ phải chia ở dạng -ANT (chanter → chantant), không phải một dạng chia khác." },
          ] },
        ],
        examples:[
          "Elles cuisinent en écoutant de la musique. — Họ nấu ăn trong lúc nghe nhạc.",
          "Les fans du fait maison s'échangent des idées en mettant en ligne des tutoriels. — Những người mê đồ tự làm chia sẻ ý tưởng bằng cách đăng tải các video hướng dẫn.",
          "On mange mieux en cuisinant soi-même. — Chúng ta ăn ngon hơn bằng cách tự nấu ăn.",
          "Il a vendu son vélo en mettant une annonce sur Leboncoin. — Anh ấy đã bán chiếc xe đạp bằng cách đăng tin trên Leboncoin.",
          "On peut mieux consommer en achetant moins d'objets neufs. — Chúng ta có thể tiêu dùng tốt hơn bằng cách mua ít đồ mới hơn.",
          "Je fais du jardinage en lui parlant. — Tôi làm vườn trong lúc nói chuyện với anh ấy.",
        ]
      },

      // ── 3. Le conditionnel présent (2) ──────────────────────────────
      {
        topic:"Le conditionnel présent (2) — Diễn đạt điều TƯỞNG TƯỢNG, GIẢ ĐỊNH",
        summary:"Vẫn là thức conditionnel présent (chia y hệt phần 1), nhưng lần này dùng cho một chức năng khác: tưởng tượng những điều KHÔNG CÓ THẬT, đặt GIẢ THUYẾT về một thế giới hay tình huống không tồn tại.",
        blocks:[
          { type:"lead", text:"Câu hỏi cốt lõi: câu này mô tả sự thật, hay một điều TƯỞNG TƯỢNG/KHÔNG CÓ THẬT? Nếu là tưởng tượng, dùng conditionnel présent cho TẤT CẢ các động từ trong câu." },

          { type:"table",
            caption:"So sánh: sự thật (indicatif) vs. tưởng tượng (conditionnel)",
            headers:["Loại câu", "Ví dụ"],
            rows:[
              ["Sự thật (indicatif présent)", "Il n'y a pas d'argent. On fait les magasins sans payer. Tout est gratuit."],
              ["Tưởng tượng (conditionnel présent)", "Imaginez un monde où il n'y aurait pas d'argent, où on ferait les magasins sans payer, où tout serait gratuit !"],
            ] },

          { type:"heading", text:"Cách chia — GIỐNG HỆT conditionnel (1)" },
          { type:"formula",
            parts:["Gốc = nguyên thể (hoặc gốc bất quy tắc như futur)", "+ -ais, -ais, -ait, -ions, -iez, -aient"],
            example:"Je rêve d'avoir des week-ends de quatre jours. J'aurais plus de temps pour moi, je pourrais faire des travaux manuels et j'apprendrais à jardiner.",
            note:"Cấu trúc chia hoàn toàn giống conditionnel présent (1) — chỉ CHỨC NĂNG khác đi: ở đây không phải xin lịch sự/khuyên/đề nghị, mà là tưởng tượng một điều không có thật." },

          { type:"callout", variant:"tip", title:"Từ khóa báo hiệu câu tưởng tượng",
            text:"Các cụm « imaginez… », « dans un monde idéal… », « je rêve de… » thường mở đầu cho một chuỗi câu ở conditionnel, vì chúng báo hiệu người nói đang tưởng tượng, không mô tả thực tế." },

          { type:"callout", variant:"warn", title:"Trong câu tưởng tượng, TẤT CẢ động từ đều ở conditionnel",
            text:"Khi mô tả một thế giới/tình huống tưởng tượng gồm nhiều mệnh đề nối tiếp nhau, phải giữ NHẤT QUÁN conditionnel cho toàn bộ các động từ, không được trộn lẫn với indicatif présent." },

          { type:"compare", items:[
            { wrong:"Dans un monde idéal, tout le monde fait du troc.", right:"Dans un monde idéal, tout le monde ferait du troc.", why:"« dans un monde idéal » báo hiệu một điều tưởng tượng, nên động từ « faire » phải chia ở conditionnel « ferait », không phải présent « fait »." },
            { wrong:"Nous n'achèterons pas de choses inutiles dans ce monde imaginaire.", right:"Nous n'achèterions pas de choses inutiles dans ce monde imaginaire.", why:"« monde imaginaire » là điều không có thật, nên phải dùng conditionnel « achèterions », không phải futur « achèterons » (futur nói về tương lai CÓ THẬT sẽ xảy ra)." },
          ] },
        ],
        examples:[
          "Imaginez un monde où il n'y aurait pas d'argent, où on ferait les magasins sans payer, où tout serait gratuit ! — Hãy tưởng tượng một thế giới không có tiền, nơi người ta đi mua sắm mà không cần trả tiền, nơi mọi thứ đều miễn phí!",
          "Dans un monde idéal, tout le monde ferait du troc. — Trong một thế giới lý tưởng, mọi người sẽ trao đổi đồ với nhau.",
          "Nous n'achèterions pas de choses inutiles. — Chúng tôi sẽ không mua những thứ vô ích.",
          "Tous les gens seraient des consommateurs responsables. — Mọi người sẽ đều là những người tiêu dùng có trách nhiệm.",
          "Il n'y aurait pas de problèmes écologiques. — Sẽ không có vấn đề sinh thái nào cả.",
          "La planète se porterait bien. — Trái đất sẽ khỏe mạnh.",
        ]
      },
    ]
  },

  {
    id:"b10", num:"10", title:"Envies d'ailleurs ?", points:[

      // ── 1. Le passé composé et l'imparfait dans le récit ──────────────
      {
        topic:"Le passé composé et l'imparfait dans le récit — Kể một chuyện đã xảy ra khi đi du lịch",
        summary:"Bạn đã học passé composé (Unité 1) và imparfait (Unité 2) riêng lẻ. Ở đây là ÔN LẠI và ghép hai thì đó vào CÙNG một câu chuyện: imparfait để MIÊU TẢ bối cảnh (đang kéo dài), passé composé để kể HÀNH ĐỘNG MỚI xen vào bối cảnh đó — thường có « quand », « soudain », « tout à coup » báo hiệu.",
        blocks:[
          { type:"lead", text:"Câu hỏi cốt lõi khi kể chuyện quá khứ: câu này đang MIÊU TẢ một tình huống đang diễn ra (→ imparfait), hay đang kể một VIỆC MỚI xảy ra, làm thay đổi tình huống đó (→ passé composé) ?" },

          { type:"table",
            caption:"2 vai trò trong một câu chuyện",
            headers:["Vai trò", "Thì", "Ví dụ"],
            rows:[
              ["Miêu tả bối cảnh (nơi chốn, người, cảm giác, hành động đang kéo dài)", "Imparfait", "Il travaillait dans une agence à Montréal, dans un bureau qui avait une vue sur la montagne."],
              ["Giới thiệu hành động mới, một sự thay đổi bất ngờ", "Passé composé", "Et l'agence a fermé son service et a supprimé son poste !"],
            ] },

          { type:"formula",
            parts:["Imparfait (bối cảnh đang kéo dài)", "…quand/soudain/tout à coup…", "Passé composé (hành động mới xen vào)"],
            example:"Il était en route vers le Mexique quand il a eu l'idée de créer cette plateforme.",
            note:"« quand », « soudain », « tout à coup » thường xuất hiện ngay trước động từ ở passé composé — đó là tín hiệu nhận biết rõ nhất." },

          { type:"callout", variant:"tip", title:"Mẹo nhanh: phim nền vs. cắt cảnh",
            text:"Hãy tưởng tượng imparfait là CẢNH QUAY NỀN đang chạy liên tục (máy quay không dừng), còn passé composé là một CÚ CẮT CẢNH đột ngột làm thay đổi câu chuyện. Một đoạn văn kể chuyện thường có NHIỀU câu imparfait làm nền, rồi MỘT sự kiện passé composé xen vào để câu chuyện tiến triển." },

          { type:"callout", variant:"warn", title:"Đây là ÔN TẬP, không phải thì mới",
            text:"Cách chia imparfait và passé composé không đổi so với Unité 1 và 2. Điều DUY NHẤT mới ở đây là cách PHỐI HỢP hai thì đó trong cùng một đoạn văn kể chuyện — chọn thì nào tùy theo VAI TRÒ của câu (miêu tả hay hành động mới), không tùy theo « quá khứ gần/xa »." },

          { type:"compare", items:[
            { wrong:"Nous étions dans l'avion. Soudain, je me sentais mal.", right:"Nous étions dans l'avion. Soudain, je me suis senti mal.", why:"« Soudain » báo hiệu một hành động MỚI, bất ngờ xen vào bối cảnh — phải dùng passé composé « je me suis senti », không phải imparfait." },
            { wrong:"Elle marchait en montagne quand elle entendait un animal.", right:"Elle marchait en montagne quand elle a entendu un animal.", why:"« marchait » là bối cảnh đang kéo dài (imparfait, đúng), nhưng « entendre » ở đây là một sự việc xảy ra MỘT LẦN, xen vào bối cảnh đó → phải là passé composé « a entendu »." },
          ] },
        ],
        examples:[
          "Il travaillait dans une agence à Montréal, dans un bureau qui avait une vue sur la montagne. — Anh ấy làm việc ở một công ty tại Montréal, trong một văn phòng có tầm nhìn ra núi.",
          "Mais il commençait à s'ennuyer, à trouver le temps long… — Nhưng anh ấy bắt đầu thấy chán, thấy thời gian trôi chậm…",
          "Et l'agence a fermé son service et a supprimé son poste ! — Và công ty đã đóng cửa bộ phận của anh ấy và xóa bỏ vị trí của anh!",
          "Alors, à 33 ans, il a profité de l'occasion pour partir faire un road trip de 4 000 km. — Vậy nên, ở tuổi 33, anh ấy đã tận dụng cơ hội để đi road trip 4.000 km.",
          "Il était en route vers le Mexique quand il a eu l'idée de créer cette plateforme. — Anh ấy đang trên đường đến Mexico thì nảy ra ý tưởng tạo nền tảng này.",
          "Nous marchions depuis des heures dans les Andes quand j'ai perdu l'équilibre et je suis tombé. — Chúng tôi đã đi bộ nhiều giờ ở dãy Andes thì tôi mất thăng bằng và ngã.",
        ]
      },

      // ── 2. Les pronoms démonstratifs ─────────────────────────────────
      {
        topic:"Les pronoms démonstratifs — Thay thế danh từ để tránh lặp lại: celui, celle, ceux, celles",
        summary:"Pronom démonstratif thay cho một danh từ (người/vật) đã nhắc tới, để KHỎI PHẢI NHẮC LẠI danh từ đó. Nó phải hợp GIỐNG và SỐ với danh từ mà nó thay thế. Có thể thêm « -ci »/« -là » để phân biệt/đối lập hai thứ, hoặc theo sau bởi « qui/que/de » để bổ nghĩa.",
        blocks:[
          { type:"lead", text:"Câu hỏi cốt lõi: pronom démonstratif đang thay cho danh từ NÀO trong câu? Xác định GIỐNG (nam/nữ) và SỐ (số ít/số nhiều) của danh từ đó để chọn đúng dạng." },

          { type:"table",
            caption:"Bảng các dạng pronom démonstratif",
            headers:["", "Số ít", "Số nhiều"],
            rows:[
              ["Giống đực (masculin)", "celui", "ceux"],
              ["Giống cái (féminin)", "celle", "celles"],
            ] },

          { type:"heading", text:"3 cách dùng" },
          { type:"cards", items:[
            { badge:"1", color:"#4A90D9", title:"+ -ci / -là để phân biệt, đối lập",
              lines:["Dùng khi có HAI thứ cùng loại đang được nói tới và cần chỉ rõ « cái này » / « cái kia »."],
              examples:[
                { fr:"Celle-ci est vraiment bien ! Celui-là est magnifique !", vi:"Cái này thì rất tốt! Cái kia thì đẹp tuyệt vời!" },
              ] },
            { badge:"2", color:"#10B981", title:"+ qui / que + mệnh đề",
              lines:["Dùng để bổ nghĩa thêm cho pronom bằng một mệnh đề quan hệ (giống như một « cái mà… »)."],
              examples:[
                { fr:"Tu sais, celle qui est partie en voyage en solo.", vi:"Bạn biết đấy, người mà đã đi du lịch một mình." },
                { fr:"Le circuit que j'ai préféré, c'est le Sénégal.", vi:"Chuyến đi mà tôi thích nhất, đó là Sénégal." },
              ] },
            { badge:"3", color:"#F5A623", title:"+ de + danh từ (sở hữu)",
              lines:["Dùng để so sánh « cái của… » mà không cần lặp lại danh từ."],
              examples:[
                { fr:"Mes photos sont moins belles que celles de ma sœur.", vi:"Ảnh của tôi không đẹp bằng ảnh của chị/em gái tôi." },
              ] },
          ] },

          { type:"callout", variant:"tip", title:"Có thể dùng cùng lúc celui-ci và celui-là",
            text:"Khi so sánh hai vật/người trong cùng một câu, có thể đặt cả hai dạng cạnh nhau: « Celui-ci est joli mais celui-là est encore plus beau ! » (Cái này đẹp nhưng cái kia còn đẹp hơn!)" },

          { type:"callout", variant:"warn", title:"Đừng nhầm với pronom possessif hay adjectif démonstratif",
            text:"« ce/cet/cette/ces » (adjectif démonstratif) LUÔN đứng trước một danh từ (ce bâtiment). Pronom démonstratif (celui/celle/ceux/celles) đứng MỘT MÌNH, THAY cho danh từ, không bao giờ đi kèm danh từ ngay sau nó — chỉ theo sau bởi -ci/-là, qui/que, hoặc de." },

          { type:"compare", items:[
            { wrong:"Regarde ces maisons, elles sont jolies ! Et ceux qui sont dans cette rue ont l'air encore plus belles !", right:"Regarde ces maisons, elles sont jolies ! Et celles qui sont dans cette rue ont l'air encore plus belles !", why:"« maisons » là giống cái số nhiều, nên pronom phải là « celles », không phải « ceux » (giống đực số nhiều)." },
            { wrong:"J'ai visité beaucoup de pays, mais celui que j'ai préféré, c'est le Sénégal.", right:"J'ai visité beaucoup de pays, mais celui que j'ai préféré, c'est le Sénégal.", why:"Đúng rồi! « pays » giống đực số ít → « celui » là chính xác." },
          ] },
        ],
        examples:[
          "Attends, je cherche mon appli Guide de voyages. Celle-ci est vraiment bien ! — Đợi đã, tôi đang tìm ứng dụng Guide de voyages của tôi. Cái này thì rất tốt!",
          "Tu as vu ce bâtiment ? Et celui-ci ! Il est magnifique ! — Bạn thấy tòa nhà đó chưa? Còn cái này nữa! Nó tuyệt đẹp!",
          "Regarde ces maisons, elles sont jolies ! Et celles qui sont dans cette rue ont l'air encore plus belles ! — Nhìn những ngôi nhà này xem, chúng đẹp quá! Và những cái ở con phố này còn có vẻ đẹp hơn nữa!",
          "Celle qui est au coin de la rue me semble sympa. — Cái ở góc phố có vẻ dễ thương đấy.",
          "Ces deux circuits sont intéressants. Celui-ci est plus long, mais celui-là est plus culturel. — Hai lộ trình này đều thú vị. Cái này thì dài hơn, nhưng cái kia thì thiên về văn hóa hơn.",
          "Ceux qui aiment le tourisme local visiteront leur région cet été ! — Những ai thích du lịch địa phương sẽ đi thăm vùng của mình vào hè này!",
        ]
      },
    ]
  },

  {
    id:"b11", num:"11", title:"De jolis parcours", points:[

      // ── 1. La mise en relief ──────────────────────────────────────────
      {
        topic:"La mise en relief — Nhấn mạnh một từ trong câu bằng « c'est/ce sont… qui/que »",
        summary:"Mise en relief = đặt « C'est/Ce sont » trước một từ, rồi thêm « qui » (nếu từ đó là chủ ngữ) hoặc « que/qu' » (nếu từ đó là bổ ngữ), để NHẤN MẠNH đúng từ đó. « Ce qui »/« Ce que » dùng khi thứ được nhấn mạnh không phải một danh từ cụ thể mà là « điều gì đó ».",
        blocks:[
          { type:"lead", text:"Câu hỏi cốt lõi: từ muốn nhấn mạnh đóng vai trò CHỦ NGỮ hay BỔ NGỮ trong câu? Chủ ngữ → theo sau bởi « qui ». Bổ ngữ → theo sau bởi « que/qu' »." },

          { type:"table",
            caption:"Cấu trúc theo loại từ được nhấn mạnh",
            headers:["Loại từ nhấn mạnh", "Nhấn mạnh CHỦ NGỮ", "Nhấn mạnh BỔ NGỮ"],
            rows:[
              ["Danh từ/nhóm danh từ", "C'est/Ce sont + danh từ + qui… — C'est la prof qui a changé ma vie.", "C'est/Ce sont + danh từ + que… — C'est une expérience que je ne regrette pas."],
              ["Đại từ nhấn mạnh (moi, toi, lui…)", "C'est/Ce sont + moi/toi/lui/eux… + qui… — C'est vous qui m'avez fait découvrir le théâtre.", "C'est/Ce sont + moi/toi/lui/eux… + que… — C'est vous que j'ai vu."],
              ["Đại từ chỉ định (ce)", "C'est ce qui… — C'est ce qui me plaît ici.", "C'est ce que… — C'est ce que j'ai préféré au lycée."],
            ] },

          { type:"formula",
            parts:["C'est / Ce sont", "+ từ muốn nhấn mạnh", "+ qui (chủ ngữ) hoặc que/qu' (bổ ngữ)", "+ phần còn lại của câu"],
            example:"Ce sont des matières que j'ai toujours aimées. (nhấn mạnh « des matières », bổ ngữ của « aimer »)",
            note:"« Que » biến thành « Qu' » trước nguyên âm: C'est un prof qu'elle admire." },

          { type:"heading", text:"« Ce qui »/« Ce que » đứng ĐẦU câu" },
          { type:"cards", items:[
            { badge:"1", color:"#4A90D9", title:"Ce qui/Ce que + mệnh đề, c'est/ce sont + phần nhấn mạnh",
              lines:["Khi muốn đưa « điều nhấn mạnh » lên đầu câu để tạo hiệu ứng, đảo ngược thứ tự: bắt đầu bằng « Ce qui »/« Ce que », rồi thêm « c'est/ce sont » ở giữa câu."],
              examples:[
                { fr:"Ce qui est le plus difficile, c'est l'organisation du travail.", vi:"Điều khó nhất, đó là việc tổ chức công việc." },
                { fr:"Ce que j'ai préféré au lycée, ce sont les fêtes de fin d'année.", vi:"Điều tôi thích nhất ở trường trung học, đó là các lễ hội cuối năm." },
              ] },
          ] },

          { type:"callout", variant:"tip", title:"Ở văn nói, hay dùng « c'est » với ngôi thứ 3 số nhiều",
            text:"Theo đúng ngữ pháp phải là « Ce sont elles qui… », nhưng trong khẩu ngữ người Pháp thường nói « C'est elles qui ont eu les meilleures notes » — vẫn hiểu và chấp nhận được ở trình độ giao tiếp." },

          { type:"callout", variant:"warn", title:"Đừng lẫn « qui » và « que »",
            text:"« Qui » luôn đứng ngay trước một ĐỘNG TỪ (vì nó thay cho chủ ngữ của động từ đó). « Que/Qu' » luôn đứng trước một CHỦ NGỮ + động từ khác (vì nó thay cho bổ ngữ của động từ đó). Thử tách câu ra: nếu sau « qui/que » không có chủ ngữ nào khác nữa → đó là « qui »." },

          { type:"compare", items:[
            { wrong:"C'est l'université que a les meilleurs résultats.", right:"C'est l'université qui a les meilleurs résultats.", why:"« l'université » là CHỦ NGỮ của « a » (a les meilleurs résultats) → phải dùng « qui », không phải « que »." },
            { wrong:"C'est la littérature qui il étudie.", right:"C'est la littérature qu'il étudie.", why:"« la littérature » là BỔ NGỮ của « étudie » (il étudie la littérature) → phải dùng « que » (rút gọn thành « qu' » trước nguyên âm « il »), không phải « qui »." },
          ] },
        ],
        examples:[
          "Ce sont des matières que j'ai toujours aimées. — Đó là những môn mà tôi luôn yêu thích.",
          "C'est une expérience que je ne regrette pas. — Đó là một trải nghiệm mà tôi không hối tiếc.",
          "L'ambiance, c'est ce que j'ai préféré au lycée. — Bầu không khí, đó là điều tôi thích nhất ở trường trung học.",
          "C'est un prof qui a changé ma vie. — Đó là một thầy/cô giáo đã thay đổi cuộc đời tôi.",
          "C'est vous qui m'avez fait découvrir le théâtre. — Chính cô là người đã giúp tôi khám phá ra sân khấu kịch.",
          "Ce sont eux qui m'ont permis d'avancer. — Chính họ là những người đã giúp tôi tiến bộ.",
        ]
      },

      // ── 2. Le discours rapporté au présent ─────────────────────────────
      {
        topic:"Le discours rapporté au présent — Thuật lại lời nói của người khác",
        summary:"Discours rapporté (thuật lại gián tiếp) dùng để kể lại lời một người khác đã nói, KHÔNG dùng dấu ngoặc kép nữa. Câu khẳng định → dùng « dire/répondre/expliquer… + que ». Câu hỏi → dùng « demander/vouloir savoir + từ nghi vấn », với vài thay đổi đặc biệt cho « est-ce que », « qu'est-ce que », « qu'est-ce qui ».",
        blocks:[
          { type:"lead", text:"Câu hỏi cốt lõi: câu gốc là một CÂU KHẲNG ĐỊNH (→ thêm « que » sau động từ tường thuật) hay một CÂU HỎI (→ giữ từ nghi vấn, hoặc biến đổi « est-ce que/qu'est-ce que/qu'est-ce qui »)?" },

          { type:"table",
            caption:"2 loại câu tường thuật",
            headers:["Loại câu gốc", "Cách tường thuật"],
            rows:[
              ["Câu khẳng định", "dire, répondre, affirmer, ajouter, annoncer, déclarer, expliquer, répéter… + que — « C'est plus facile pour nous. » → Ils disent que c'est plus facile pour eux."],
              ["Câu hỏi", "demander, vouloir savoir, aimer savoir… + từ nghi vấn (où, qui, quand, comment, pourquoi…) — « Pourquoi ce poste vous intéresse ? » → Elle me demande pourquoi ce poste m'intéresse."],
            ] },

          { type:"heading", text:"3 biến đổi đặc biệt cho câu hỏi với est-ce que" },
          { type:"table",
            caption:"Bảng biến đổi",
            headers:["Nghi vấn ở câu trực tiếp", "Ở discours indirect", "Ví dụ"],
            rows:[
              ["Est-ce que / không có từ nghi vấn", "→ si", "« Est-ce que le CV est utile ? » → Elle se demande si le CV est utile."],
              ["Qu'est-ce que", "→ ce que", "« Qu'est-ce que vous pouvez apporter ? » → On vous demande ce que vous pouvez apporter."],
              ["Qu'est-ce qui", "→ ce qui", "« Qu'est-ce qui est important ? » → Ils se demandent ce qui est important."],
            ] },

          { type:"formula",
            parts:["Chủ ngữ", "+ dire/demander/vouloir savoir… (chia đúng thì)", "+ que / mot interrogatif / si / ce que / ce qui", "+ phần còn lại của câu (đổi đại từ nếu cần)"],
            example:"« Je voudrais être dans ce réseau professionnel. » → Elle dit qu'elle voudrait être dans ce réseau professionnel.",
            note:"« Je »→« elle », « ce réseau »→ giữ nguyên vì không phụ thuộc người nói. Luôn kiểm tra đại từ chủ ngữ VÀ sở hữu (mon/ton→son) cần đổi theo người được thuật lại." },

          { type:"callout", variant:"tip", title:"Đừng quên đổi đại từ",
            text:"Khi chuyển từ lời nói trực tiếp (« Je »/« tu »/« mon ») sang gián tiếp, phải đổi các đại từ và tính từ sở hữu cho khớp với người đang được nói tới: « Je vais créer un profil » (Elle) → Elle annonce qu'elle va créer un profil." },

          { type:"callout", variant:"warn", title:"« Si » nghĩa là « nếu » HAY « có… không »?",
            text:"Ở discours rapporté, « si » sau « demander/se demander » KHÔNG có nghĩa « nếu » — nó thay cho « est-ce que » để hỏi có/không: « Est-ce que le CV est mort ? » → Ils se demandent si le CV est mort. (= họ tự hỏi liệu CV có… hay không, không phải câu điều kiện)." },

          { type:"compare", items:[
            { wrong:"Elle se demande est-ce que le CV est utile.", right:"Elle se demande si le CV est utile.", why:"Trong discours indirect, « est-ce que » PHẢI biến thành « si » — không được giữ nguyên « est-ce que » sau động từ tường thuật." },
            { wrong:"Ils se demandent qu'est-ce qui est important dans un CV.", right:"Ils se demandent ce qui est important dans un CV.", why:"« Qu'est-ce qui » (chủ ngữ nghi vấn) PHẢI biến thành « ce qui » ở discours indirect." },
          ] },
        ],
        examples:[
          "Ils disent que c'est plus facile d'avoir un CV d'une page. — Họ nói rằng có một CV một trang thì dễ hơn.",
          "Je voudrais savoir ce que je dois indiquer sur mon profil. — Tôi muốn biết tôi phải ghi gì trên hồ sơ của mình.",
          "Je me demande comment écrire le premier message. — Tôi tự hỏi làm sao để viết tin nhắn đầu tiên.",
          "Elle se demande si le CV est utile. — Cô ấy tự hỏi liệu CV có hữu ích hay không.",
          "On vous demande ce que vous pouvez apporter à l'entreprise. — Người ta hỏi bạn có thể mang lại gì cho công ty.",
          "Ils se demandent ce qui est important dans un CV. — Họ tự hỏi điều gì là quan trọng trong một CV.",
        ]
      },

      // ── 3. Le pronom COI y ──────────────────────────────────────────────
      {
        topic:"Le pronom COI « y » — Thay thế bổ ngữ gián tiếp bắt đầu bằng « à »",
        summary:"« Y » thay cho một bổ ngữ (vật/ý tưởng, KHÔNG PHẢI người) đi sau giới từ « à » — của các động từ như « penser à, réfléchir à, s'intéresser à, répondre à, arriver à… ». Với NGƯỜI, phải dùng « à + đại từ nhấn mạnh » (à lui, à elle…), không dùng « y ».",
        blocks:[
          { type:"lead", text:"Câu hỏi cốt lõi: bổ ngữ đi sau « à » là một VẬT/Ý TƯỞNG (→ dùng « y ») hay một NGƯỜI (→ dùng « à + moi/toi/lui/elle/nous/vous/eux/elles »)?" },

          { type:"table",
            caption:"Vị trí của « y » trong câu",
            headers:["Trường hợp", "Vị trí", "Ví dụ"],
            rows:[
              ["Câu khẳng định/phủ định", "« y » đứng TRƯỚC động từ", "J'y ai bien réfléchi. Je n'y ai pas réfléchi. Je ne m'y intéresse pas."],
              ["Câu mệnh lệnh khẳng định", "« y » đứng SAU động từ (nối bằng gạch ngang)", "Pensez-y !"],
            ] },

          { type:"formula",
            parts:["Chủ ngữ", "+ y", "+ động từ (chia đúng thì)"],
            example:"– Tu réponds à ce message ? – Oui, j'y réponds tout de suite !",
            note:"Câu hỏi gốc dùng « à ce message » → « y » thay thế toàn bộ cụm giới từ đó, không chỉ danh từ." },

          { type:"callout", variant:"tip", title:"So sánh với « le/la/les » (COD)",
            text:"« Y » chỉ thay cho bổ ngữ có « à » đứng trước (COI). Nếu động từ không có giới từ (ví dụ « regarder quelque chose »), phải dùng « le/la/les », không phải « y ». Kiểm tra: động từ đó có « à » đi kèm không, trước khi chọn « y »." },

          { type:"callout", variant:"warn", title:"NGƯỜI thì không dùng « y »",
            text:"« Il pense à ses vacances. » (điều/vật) → « Il y pense. » Nhưng « Il pense à son collègue. » (người) → « Il pense à lui. » — không bao giờ nói « Il y pense » khi nói về một người cụ thể." },

          { type:"compare", items:[
            { wrong:"Je réponds toujours à eux.", right:"Je leur réponds toujours.", why:"« eux » (mails/khách hàng là VẬT ở đây tùy ngữ cảnh) — nếu bổ ngữ là người nhận thư, dùng đại từ COI « leur », không phải « à eux » (chỉ dùng « à + đại từ nhấn mạnh » với một số động từ đặc biệt như penser à)." },
            { wrong:"Il y pense.", right:"Il pense à lui. (nếu nói về một người, ví dụ son collègue)", why:"« y » KHÔNG được dùng để thay cho một NGƯỜI — phải dùng « à + đại từ nhấn mạnh » (à lui, à elle…)." },
          ] },
        ],
        examples:[
          "Il y pense depuis toujours. — Anh ấy luôn nghĩ về điều đó.",
          "Vous y êtes arrivé(e) ! — Bạn đã đạt được điều đó rồi!",
          "J'y ai bien réfléchi. — Tôi đã suy nghĩ kỹ về điều đó.",
          "Je n'y réponds pas. — Tôi không trả lời điều đó.",
          "– Tu réponds à ce message ? – Oui, j'y réponds tout de suite ! — Bạn có trả lời tin nhắn này không? – Có, tôi trả lời ngay đây!",
          "Il pense à ses vacances. Il y pense. — Anh ấy nghĩ về kỳ nghỉ của mình. Anh ấy nghĩ về điều đó.",
        ]
      },
    ]
  },

  // ═══════════════ Unité 12 — Soif de nature ═══════════════
  {
    id:"b12", num:"12", title:"Soif de nature", points:[

      // ── 1. L'impératif et les pronoms ───────────────────────────────────
      {
        topic:"L'impératif et les pronoms — Đặt đại từ với câu mệnh lệnh",
        summary:"Ở câu mệnh lệnh (impératif), vị trí đại từ (me/te/le/la/les/lui/leur/en/y…) thay đổi tùy khẳng định hay phủ định: KHẲNG ĐỊNH → đại từ đứng SAU động từ, nối bằng gạch ngang; PHỦ ĐỊNH → đại từ đứng TRƯỚC động từ như bình thường.",
        blocks:[
          { type:"lead", text:"Câu hỏi cốt lõi: câu mệnh lệnh đó là KHẲNG ĐỊNH (làm gì) hay PHỦ ĐỊNH (đừng làm gì)? Từ đó suy ra đại từ đứng trước hay sau động từ." },

          { type:"table",
            caption:"Vị trí đại từ ở impératif",
            headers:["Impératif affirmatif", "Impératif négatif"],
            rows:[
              ["Đại từ đứng SAU động từ, nối bằng gạch ngang (-) : Multiplions-**les** ! Mobilisons-**nous** !", "Đại từ đứng TRƯỚC động từ, không đổi dạng : Ne **leur** faites pas peur. N'**en** achète pas."],
            ] },

          { type:"formula",
            parts:["Động từ ở impératif", "+ gạch ngang (-)", "+ đại từ (le/la/les/lui/leur/en/y/moi/toi…)"],
            example:"Choisissez des produits écologiques, fabriquez-en vous-même !",
            note:"« me »/« te » đổi thành « moi »/« toi » ở cuối câu khẳng định: Mobilise-toi ! (không nói « Mobilise-te »)." },

          { type:"heading", text:"Thêm « -s » với « en »/« y » ở ngôi 2 số ít động từ nhóm -er" },
          { type:"callout", variant:"tip", title:"Vì sao phải thêm « -s » ?",
            text:"Động từ nhóm -er ở ngôi « tu » của impératif vốn không có « -s » (Mange ! Parle !). Nhưng khi theo sau là « en » hoặc « y », người Pháp thêm lại « -s » để nối liền âm, dễ đọc hơn: « Fabriques-en toi-même » (không nói « Fabrique-en »), « Penses-y ! » (không nói « Pense-y »)." },

          { type:"compare", items:[
            { wrong:"Ne faites-leur pas peur.", right:"Ne leur faites pas peur.", why:"Ở câu PHỦ ĐỊNH, đại từ « leur » phải đứng TRƯỚC động từ, không đứng sau — quy tắc gạch ngang chỉ áp dụng cho câu khẳng định." },
            { wrong:"Fabrique-en toi-même.", right:"Fabriques-en toi-même.", why:"Trước « en », động từ nhóm -er ở ngôi « tu » phải thêm lại « -s » (Fabriques-en), dù bình thường impératif của « tu » với -er không có « -s »." },
            { wrong:"Mobilise-te avec nous !", right:"Mobilise-toi avec nous !", why:"Ở cuối câu khẳng định, đại từ phản thân « te » luôn đổi thành « toi »." },
          ] },
        ],
        examples:[
          "Mobilisons-nous !— Chúng ta hãy cùng hành động!",
          "Multiplions-les ! — Chúng ta hãy nhân nó lên nhiều lần!",
          "Fabriquez-en vous-même. — Hãy tự làm lấy điều đó.",
          "Laissez les animaux où ils sont et ne leur faites pas peur. — Hãy để động vật ở nguyên chỗ của chúng và đừng làm chúng sợ.",
          "La nature est fragile, penses-y ! — Thiên nhiên rất mong manh, hãy nghĩ về điều đó!",
          "Les produits chimiques sont dangereux, n'en achète pas. — Hóa chất rất nguy hiểm, đừng mua chúng.",
        ]
      },

      // ── 2. L'expression du but ──────────────────────────────────────────
      {
        topic:"L'expression du but — « pour » và « pour que » diễn đạt mục đích",
        summary:"« Pour »/« pour que » đều dùng để nói MỤC ĐÍCH (làm gì… để làm gì). Chọn cái nào phụ thuộc vào: chủ ngữ của hai vế câu có GIỐNG NHAU không? Giống nhau → « pour » + động từ nguyên thể (infinitif). Khác nhau → « pour que » + động từ chia ở subjonctif.",
        blocks:[
          { type:"lead", text:"Câu hỏi cốt lõi: ai làm hành động chính, và ai đạt được mục đích đó — có phải CÙNG MỘT NGƯỜI không?" },

          { type:"table",
            caption:"« pour » hay « pour que » ?",
            headers:["Trường hợp", "Cấu trúc", "Ví dụ"],
            rows:[
              ["Cùng một chủ ngữ", "pour + infinitif (phủ định: pour ne pas + infinitif)", "Le coq chante pour informer en cas d'urgence. / Il travaille à la maison pour ne pas laisser son chien seul."],
              ["Hai chủ ngữ khác nhau", "pour que + subjonctif (phủ định: pour que + subjonctif phủ định)", "La poule crie pour que ses camarades sachent qu'il y a un danger."],
            ] },

          { type:"formula",
            parts:["Mệnh đề chính", "+ pour / pour que", "+ infinitif (pour) hoặc subjonctif (pour que)"],
            example:"Pour que votre chat se sente bien, éloignez la gamelle du bol d'eau !",
            note:"« pour que » luôn cần một chủ ngữ MỚI theo sau (votre chat ≠ vous), còn « pour » không có chủ ngữ mới vì cùng người thực hiện cả hai hành động." },

          { type:"callout", variant:"warn", title:"Đừng quên chia subjonctif sau « pour que »",
            text:"Sau « pour que », động từ LUÔN chia ở subjonctif, không phải indicatif: « pour que les espèces ne disparaissent pas » (không phải « ne disparaissent pas » ở hiện tại thường mà là subjonctif — với nhiều động từ thường thì hình thức giống present de l'indicatif ở ngôi il/elle/ils/elles, nhưng với động từ bất quy tắc như « être », « avoir », « savoir » thì khác hẳn: qu'il soit, qu'il ait, qu'il sache)." },

          { type:"compare", items:[
            { wrong:"Il lit un livre pour que comprendre le comportement des abeilles.", right:"Il lit un livre pour comprendre le comportement des abeilles.", why:"Chủ ngữ của « lire » và « comprendre » là CÙNG MỘT NGƯỜI (il) → phải dùng « pour » + infinitif, không dùng « pour que »." },
            { wrong:"Il faut protéger la biodiversité pour que les espèces animales ne disparaissent.", right:"Il faut protéger la biodiversité pour que les espèces animales ne disparaissent pas.", why:"Ở thể phủ định, « pour que » vẫn cần đủ « ne… pas » bao quanh động từ chia ở subjonctif — không được bỏ « pas »." },
          ] },
        ],
        examples:[
          "Pour se protéger, les animaux ont des comportements surprenants. — Để tự bảo vệ mình, các loài vật có những hành vi đáng ngạc nhiên.",
          "Ils ne buvaient pas d'eau stagnante pour ne pas s'empoisonner. — Chúng không uống nước đọng để khỏi bị nhiễm độc.",
          "Pour que votre chat se sente bien, éloignez la gamelle du bol d'eau ! — Để mèo của bạn cảm thấy thoải mái, hãy để bát thức ăn xa bát nước!",
          "Elles dansent pour que les autres abeilles comprennent où est le lieu intéressant. — Chúng nhảy múa để những con ong khác hiểu nơi có hoa thú vị ở đâu.",
          "On célèbre la journée des animaux pour améliorer leurs conditions de vie. — Người ta tổ chức ngày động vật để cải thiện điều kiện sống của chúng.",
          "Vous devez promener souvent votre chien pour qu'il soit en forme. — Bạn phải thường xuyên dắt chó đi dạo để nó khỏe mạnh.",
        ]
      },

      // ── 3. La forme passive ──────────────────────────────────────────────
      {
        topic:"La forme passive — Câu bị động: ÊTRE + participe passé",
        summary:"Forme passive nhấn mạnh vào KẾT QUẢ và ĐỐI TƯỢNG bị/được tác động, thay vì người thực hiện hành động. Cấu trúc: chủ ngữ (đối tượng bị tác động) + ÊTRE (chia đúng thì) + participe passé (hợp giống–số với chủ ngữ) + par + người thực hiện.",
        blocks:[
          { type:"lead", text:"Câu hỏi cốt lõi: câu đó muốn nhấn mạnh AI làm hành động (→ thể chủ động/actif) hay đối tượng NÀO bị/được tác động (→ thể bị động/passif)?" },

          { type:"table",
            caption:"Chuyển từ actif sang passif",
            headers:["Forme active", "Forme passive"],
            rows:[
              ["Un botaniste développe la méthode.", "La méthode est développée par un botaniste."],
              ["Chantal Perdigau a créé le site.", "Le site a été créé par Chantal Perdigau."],
              ["Une personne compétente cultive mon jardin.", "Mon jardin est cultivé par une personne compétente."],
            ] },

          { type:"formula",
            parts:["Chủ ngữ (đối tượng bị tác động)", "+ ÊTRE (chia đúng thì)", "+ participe passé (hợp giống–số)", "+ par + người/vật thực hiện"],
            example:"Mon jardin a été cultivé par une personne compétente.",
            note:"« être » chia đúng THÌ của câu gốc: hiện tại → est cultivé ; passé composé → a été cultivé ; futur → sera cultivé. Participe passé luôn hợp giống–số với chủ ngữ mới, giống hệt tính từ." },

          { type:"heading", text:"3 thì thường gặp ở forme passive" },
          { type:"cards", items:[
            { badge:"1", color:"#059669", title:"Présent : être (hiện tại) + participe passé",
              lines:["Mon jardin est cultivé par une personne compétente."] },
            { badge:"2", color:"#0891B2", title:"Passé composé : avoir été + participe passé",
              lines:["Mon jardin a été cultivé par une personne compétente."] },
            { badge:"3", color:"#D97706", title:"Futur : être (futur) + participe passé",
              lines:["Mon jardin sera cultivé par une personne compétente."] },
          ] },

          { type:"callout", variant:"warn", title:"Đừng quên hợp giống–số của participe passé",
            text:"Participe passé ở thể bị động LUÔN hợp giống–số với chủ ngữ, dù đi với « être »: « La méthode est développée » (giống cái, không phải « développé »), « Les micro-forêts ont été inventées » (số nhiều giống cái)." },

          { type:"compare", items:[
            { wrong:"La méthode est développé par un botaniste.", right:"La méthode est développée par un botaniste.", why:"Chủ ngữ « la méthode » là giống cái → participe passé phải thêm « -e »: développée, không phải développé." },
            { wrong:"Des milliers d'arbres seront planté par notre association.", right:"Des milliers d'arbres seront plantés par notre association.", why:"Chủ ngữ « des milliers d'arbres » (arbres, giống đực số nhiều) → participe passé phải thêm « -s »: plantés." },
          ] },
        ],
        examples:[
          "Le site a été créé par Chantal Perdigau. — Trang web đã được tạo ra bởi Chantal Perdigau.",
          "Mon jardin est cultivé par une personne compétente. — Khu vườn của tôi được chăm sóc bởi một người có năng lực.",
          "Votre argent est bien utilisé par cette association. — Tiền của bạn được hiệp hội này sử dụng tốt.",
          "Les micro-forêts ont été inventées par Akira Miyawaki. — Những khu rừng tí hon đã được phát minh bởi Akira Miyawaki.",
          "Des milliers d'arbres seront plantés par notre association. — Hàng nghìn cây sẽ được hiệp hội của chúng tôi trồng.",
          "J'ai été contactée par Alexandre. — Tôi đã được Alexandre liên hệ.",
        ]
      },
    ]
  },
];
