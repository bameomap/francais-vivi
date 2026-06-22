// Édito A1 — Baked "expansion" content for Cornell verb notes.
// Structure per verb: { collocations, structures, particles, idioms }
// Each array: [{ fr, vi }]  (2–4 items each; idioms may be empty)
//
// Loaded automatically in CornellNote — no AI call needed for covered units.

export const EDITO_VERB_EXPAND = {

  // ── UNITÉ 7 ─ Le logement ────────────────────────────────────────────────
  u7: {
    devoir: {
      collocations: [
        { fr: "devoir partir",         vi: "phải đi" },
        { fr: "devoir travailler",     vi: "phải làm việc" },
        { fr: "devoir de l'argent",    vi: "nợ tiền" },
        { fr: "devoir rendre qqch",    vi: "phải trả lại cái gì" },
      ],
      structures: [
        { fr: "devoir + V (nguyên thể)",    vi: "cấu trúc cơ bản: phải làm gì" },
        { fr: "ne pas devoir + V",          vi: "không phải / không được làm gì" },
        { fr: "on doit + V",                vi: "người ta / mình phải làm gì" },
      ],
      particles: [
        { fr: "devoir + infinitif (không giới từ)", vi: "động từ theo sau là nguyên thể trực tiếp" },
      ],
      idioms: [
        { fr: "Il doit être fatigué.", vi: "Chắc anh ấy mệt rồi. (suy đoán)" },
        { fr: "Je dois y aller.",     vi: "Tôi phải đi rồi. (từ biệt lịch sự)" },
      ],
    },

    pouvoir: {
      collocations: [
        { fr: "pouvoir entrer",  vi: "có thể vào" },
        { fr: "pouvoir aider",   vi: "có thể giúp" },
        { fr: "pouvoir venir",   vi: "có thể đến" },
        { fr: "pouvoir sortir",  vi: "có thể ra ngoài" },
      ],
      structures: [
        { fr: "pouvoir + V (nguyên thể)",   vi: "cấu trúc cơ bản: có thể làm gì" },
        { fr: "Est-ce que je peux + V ?",   vi: "xin phép làm gì" },
        { fr: "je ne peux pas + V",         vi: "không thể làm gì" },
      ],
      particles: [
        { fr: "pouvoir + infinitif (không giới từ)", vi: "động từ theo sau là nguyên thể trực tiếp" },
      ],
      idioms: [
        { fr: "Tu peux répéter ?",       vi: "Bạn nhắc lại được không?" },
        { fr: "Je ne peux pas venir.",   vi: "Tôi không thể đến được." },
      ],
    },

    falloir: {
      collocations: [
        { fr: "il faut du temps",       vi: "cần thời gian" },
        { fr: "il faut travailler",     vi: "phải làm việc" },
        { fr: "il faut partir",         vi: "phải đi rồi" },
        { fr: "il faut de la patience", vi: "cần sự kiên nhẫn" },
      ],
      structures: [
        { fr: "il faut + V (nguyên thể)", vi: "cần / phải làm gì" },
        { fr: "il faut + nom",            vi: "cần cái gì" },
        { fr: "il ne faut pas + V",       vi: "không được / không nên làm gì" },
      ],
      particles: [
        { fr: "luôn dùng ngôi il (vô nhân xưng)", vi: "không có chủ ngữ thật, il là hư từ" },
      ],
      idioms: [
        { fr: "Il ne faut pas exagérer !", vi: "Đừng quá đà vậy!" },
        { fr: "Il faut le voir pour le croire.", vi: "Phải thấy mới tin được." },
      ],
    },

    ranger: {
      collocations: [
        { fr: "ranger sa chambre",     vi: "dọn phòng" },
        { fr: "ranger ses affaires",   vi: "dọn đồ đạc" },
        { fr: "ranger les vêtements",  vi: "xếp quần áo" },
        { fr: "tout ranger",           vi: "dọn hết mọi thứ" },
      ],
      structures: [
        { fr: "ranger qqch dans + nơi", vi: "xếp cái gì vào chỗ nào" },
        { fr: "ranger qqch sur + nơi",  vi: "xếp cái gì lên đâu" },
      ],
      particles: [
        { fr: "dans (le placard, l'armoire)", vi: "vào trong (tủ, ngăn kéo)" },
        { fr: "sur (l'étagère)",             vi: "trên kệ" },
      ],
      idioms: [
        { fr: "Chaque chose à sa place !", vi: "Mỗi thứ một nơi!" },
        { fr: "C'est bien rangé.",          vi: "Gọn gàng lắm." },
      ],
    },

    nettoyer: {
      collocations: [
        { fr: "nettoyer la cuisine",      vi: "lau bếp" },
        { fr: "nettoyer le sol",          vi: "lau sàn" },
        { fr: "nettoyer la salle de bains", vi: "lau phòng tắm" },
        { fr: "nettoyer les vitres",      vi: "lau cửa kính" },
      ],
      structures: [
        { fr: "nettoyer qqch",          vi: "lau sạch cái gì" },
        { fr: "nettoyer à fond",        vi: "lau thật kỹ" },
      ],
      particles: [
        { fr: "avec + produit",  vi: "bằng (nước tẩy, khăn…)" },
        { fr: "à fond",          vi: "kỹ càng (cụm trạng từ)" },
      ],
      idioms: [
        { fr: "C'est propre !",      vi: "Sạch rồi!" },
        { fr: "Ça sent le propre.", vi: "Có mùi sạch sẽ." },
      ],
    },

    partager: {
      collocations: [
        { fr: "partager un appartement", vi: "ở ghép" },
        { fr: "partager un repas",       vi: "ăn cùng nhau" },
        { fr: "partager ses idées",      vi: "chia sẻ ý kiến" },
        { fr: "partager les frais",      vi: "chia tiền chi phí" },
      ],
      structures: [
        { fr: "partager qqch avec qqn", vi: "chia sẻ gì với ai" },
        { fr: "partager en deux",       vi: "chia làm đôi" },
      ],
      particles: [
        { fr: "avec (qqn)",    vi: "với ai" },
        { fr: "entre (nous)",  vi: "giữa chúng ta" },
      ],
      idioms: [
        { fr: "On partage la note ?",       vi: "Mình chia tiền nhé?" },
        { fr: "partager les mêmes goûts",   vi: "có cùng sở thích" },
      ],
    },

    louer: {
      collocations: [
        { fr: "louer un appartement",  vi: "thuê căn hộ" },
        { fr: "louer une voiture",     vi: "thuê xe" },
        { fr: "louer une chambre",     vi: "thuê phòng" },
        { fr: "louer à la semaine",    vi: "thuê theo tuần" },
      ],
      structures: [
        { fr: "louer qqch à qqn",     vi: "cho ai thuê cái gì (người cho thuê)" },
        { fr: "louer qqch (chez qqn)", vi: "thuê cái gì (người đi thuê)" },
      ],
      particles: [
        { fr: "à (un prix)",    vi: "với giá…" },
        { fr: "pour (une durée)", vi: "trong (thời gian)" },
      ],
      idioms: [
        { fr: "C'est à louer.", vi: "Chỗ này cho thuê." },
        { fr: "louer à bon prix", vi: "thuê với giá hợp lý" },
      ],
    },

    habiter: {
      collocations: [
        { fr: "habiter à Paris",    vi: "sống ở Paris" },
        { fr: "habiter en banlieue", vi: "sống ở ngoại ô" },
        { fr: "habiter au 3e étage", vi: "sống ở tầng 3" },
        { fr: "habiter ensemble",   vi: "sống cùng nhau" },
      ],
      structures: [
        { fr: "habiter à + thành phố",   vi: "sống ở thành phố nào" },
        { fr: "habiter dans + nơi ở",    vi: "sống trong loại nhà ở" },
        { fr: "habiter chez + người",    vi: "sống nhờ nhà ai" },
      ],
      particles: [
        { fr: "à (ville)",                vi: "ở thành phố" },
        { fr: "dans (un appartement)",    vi: "trong loại nhà ở" },
        { fr: "chez (quelqu'un)",         vi: "nhà ai đó" },
      ],
      idioms: [
        { fr: "J'habite près d'ici.",    vi: "Tôi sống gần đây." },
        { fr: "On habite ensemble.",     vi: "Chúng tôi sống cùng nhau." },
      ],
    },

    permettre: {
      collocations: [
        { fr: "permettre de sortir",     vi: "cho phép ra ngoài" },
        { fr: "permettre de conduire",   vi: "cho phép lái xe" },
        { fr: "se permettre qqch",       vi: "tự cho phép mình cái gì" },
      ],
      structures: [
        { fr: "permettre à qqn de + V", vi: "cấu trúc cố định: cho phép ai làm gì" },
        { fr: "Permettez-moi de + V",   vi: "Cho phép tôi làm gì (lịch sự)" },
      ],
      particles: [
        { fr: "à (qqn)",  vi: "cho ai: permettre à quelqu'un" },
        { fr: "de + V",   vi: "làm gì: permettre de partir" },
      ],
      idioms: [
        { fr: "Permettez-moi de me présenter.", vi: "Cho phép tôi tự giới thiệu." },
        { fr: "Je me permets de vous écrire.", vi: "Tôi mạn phép viết thư cho bạn." },
      ],
    },

    interdire: {
      collocations: [
        { fr: "interdire de fumer",        vi: "cấm hút thuốc" },
        { fr: "interdire l'accès",         vi: "cấm vào" },
        { fr: "interdire à un enfant de",  vi: "cấm trẻ em làm gì" },
      ],
      structures: [
        { fr: "interdire à qqn de + V",  vi: "cấu trúc cố định: cấm ai làm gì" },
        { fr: "Il est interdit de + V",  vi: "Bị cấm làm gì (thụ động)" },
      ],
      particles: [
        { fr: "à (qqn)", vi: "cấm ai" },
        { fr: "de + V",  vi: "làm gì: interdire de fumer" },
      ],
      idioms: [
        { fr: "Entrée interdite !",       vi: "Cấm vào!" },
        { fr: "Stationnement interdit.",  vi: "Cấm đỗ xe." },
      ],
    },

    faire: {
      collocations: [
        { fr: "faire le ménage",    vi: "dọn nhà" },
        { fr: "faire la vaisselle", vi: "rửa bát" },
        { fr: "faire les courses",  vi: "đi mua đồ" },
        { fr: "faire la cuisine",   vi: "nấu ăn" },
      ],
      structures: [
        { fr: "faire + le/la + việc nhà",  vi: "làm công việc nhà" },
        { fr: "faire faire qqch",          vi: "nhờ người khác làm gì" },
        { fr: "faire attention à",         vi: "chú ý đến" },
      ],
      particles: [
        { fr: "attention à",  vi: "chú ý đến: faire attention au feu" },
        { fr: "part de",      vi: "thông báo: faire part de" },
      ],
      idioms: [
        { fr: "Ça ne fait rien.", vi: "Không sao." },
        { fr: "C'est bien fait !", vi: "Đáng đời!" },
      ],
    },

    utiliser: {
      collocations: [
        { fr: "utiliser un ordinateur",  vi: "dùng máy tính" },
        { fr: "utiliser une application", vi: "dùng ứng dụng" },
        { fr: "utiliser les transports",  vi: "dùng phương tiện giao thông" },
        { fr: "utiliser de l'eau",        vi: "dùng nước" },
      ],
      structures: [
        { fr: "utiliser qqch pour + V",   vi: "dùng gì để làm gì" },
        { fr: "utiliser qqch comme outil", vi: "dùng gì như một công cụ" },
      ],
      particles: [
        { fr: "pour + V",          vi: "để làm gì" },
        { fr: "comme (outil)",     vi: "như (công cụ)" },
      ],
      idioms: [
        { fr: "C'est facile à utiliser.", vi: "Dễ sử dụng." },
        { fr: "On peut utiliser le dictionnaire.", vi: "Có thể dùng từ điển." },
      ],
    },

    payer: {
      collocations: [
        { fr: "payer le loyer",     vi: "trả tiền nhà" },
        { fr: "payer l'addition",   vi: "trả tiền hóa đơn" },
        { fr: "payer en espèces",   vi: "trả tiền mặt" },
        { fr: "payer par carte",    vi: "trả bằng thẻ" },
      ],
      structures: [
        { fr: "payer + qqch",         vi: "trả tiền cho cái gì" },
        { fr: "payer en + cách trả",  vi: "trả bằng (tiền mặt/thẻ)" },
        { fr: "C'est moi qui paie.",  vi: "Tôi trả tiền." },
      ],
      particles: [
        { fr: "en (espèces/cash)",  vi: "bằng tiền mặt" },
        { fr: "par (carte)",        vi: "bằng thẻ" },
        { fr: "pour (qqn)",         vi: "trả thay cho ai" },
      ],
      idioms: [
        { fr: "Payer comptant.",    vi: "Trả ngay (không trả góp)." },
        { fr: "C'est moi qui régale.", vi: "Tôi đãi. (thân mật)" },
      ],
    },

    vivre: {
      collocations: [
        { fr: "vivre à Paris",      vi: "sống ở Paris" },
        { fr: "vivre ensemble",     vi: "sống cùng nhau" },
        { fr: "vivre seul(e)",      vi: "sống một mình" },
        { fr: "vivre de son travail", vi: "sống bằng nghề" },
      ],
      structures: [
        { fr: "vivre à / dans",     vi: "sống ở đâu (như habiter)" },
        { fr: "vivre de + qqch",    vi: "sống bằng cái gì (thu nhập)" },
        { fr: "vivre avec qqn",     vi: "sống cùng ai" },
      ],
      particles: [
        { fr: "à / dans (nơi chốn)", vi: "ở đâu" },
        { fr: "avec (qqn)",          vi: "cùng ai" },
        { fr: "de (qqch)",           vi: "bằng (thu nhập)" },
      ],
      idioms: [
        { fr: "Vive la France !", vi: "Muôn năm nước Pháp!" },
        { fr: "C'est ainsi qu'on vit.", vi: "Đó là cách sống." },
      ],
    },

    mettre: {
      collocations: [
        { fr: "mettre la table",     vi: "bày bàn ăn" },
        { fr: "mettre les clés",     vi: "để chìa khóa" },
        { fr: "mettre de l'ordre",   vi: "sắp xếp ngăn nắp" },
        { fr: "mettre le couvert",   vi: "dọn bàn (đủ bộ)" },
      ],
      structures: [
        { fr: "mettre qqch + nơi chốn",  vi: "để / đặt gì ở đâu" },
        { fr: "se mettre à + V",         vi: "bắt đầu làm gì" },
        { fr: "mettre du temps",         vi: "mất thời gian" },
      ],
      particles: [
        { fr: "sur (la table)",    vi: "trên bàn" },
        { fr: "dans (le tiroir)",  vi: "trong ngăn kéo" },
        { fr: "à + V (se mettre)", vi: "se mettre à + nguyên thể" },
      ],
      idioms: [
        { fr: "Il se met à pleuvoir.", vi: "Trời bắt đầu mưa." },
        { fr: "Mettons-nous au travail !", vi: "Bắt đầu làm việc thôi!" },
      ],
    },
  },

  // ── UNITÉ 8 ─ La santé ───────────────────────────────────────────────────
  u8: {
    faire: {
      collocations: [
        { fr: "faire du sport",       vi: "tập thể thao" },
        { fr: "faire du vélo",        vi: "đi xe đạp" },
        { fr: "faire de la natation", vi: "bơi lội" },
        { fr: "faire du jogging",     vi: "chạy bộ" },
      ],
      structures: [
        { fr: "faire du / de la / de l' + môn thể thao", vi: "chơi/tập môn thể thao" },
        { fr: "faire attention à sa santé",              vi: "chú ý đến sức khỏe" },
      ],
      particles: [
        { fr: "du (sport, foot)",       vi: "môn thể thao giống đực" },
        { fr: "de la (natation, danse)", vi: "môn thể thao giống cái" },
        { fr: "de l' (escalade)",        vi: "môn bắt đầu bằng nguyên âm" },
      ],
      idioms: [
        { fr: "Ça fait du bien !",          vi: "Thật sảng khoái!" },
        { fr: "faire d'une pierre deux coups", vi: "một công đôi việc" },
      ],
    },

    manger: {
      collocations: [
        { fr: "manger équilibré",        vi: "ăn cân bằng dinh dưỡng" },
        { fr: "manger sainement",        vi: "ăn lành mạnh" },
        { fr: "manger des légumes",      vi: "ăn rau" },
        { fr: "manger entre les repas",  vi: "ăn vặt giữa bữa" },
      ],
      structures: [
        { fr: "manger + qqch",           vi: "ăn cái gì" },
        { fr: "manger à + giờ",          vi: "ăn lúc mấy giờ" },
        { fr: "ne pas manger + qqch",    vi: "không ăn cái gì" },
      ],
      particles: [
        { fr: "du / de la (pain, viande)", vi: "ăn một ít: manger du pain" },
        { fr: "sans (sel, sucre)",         vi: "không có: manger sans sel" },
      ],
      idioms: [
        { fr: "Mange, c'est bon pour toi !", vi: "Ăn đi, tốt cho sức khỏe đó!" },
        { fr: "avoir faim",                  vi: "đói (dùng avoir, không phải manger)" },
      ],
    },

    dormir: {
      collocations: [
        { fr: "dormir bien",         vi: "ngủ ngon" },
        { fr: "dormir assez",        vi: "ngủ đủ giấc" },
        { fr: "dormir huit heures",  vi: "ngủ 8 tiếng" },
        { fr: "mal dormir",          vi: "ngủ không ngon" },
      ],
      structures: [
        { fr: "dormir + adverbe (bien/mal)",  vi: "ngủ tốt/xấu" },
        { fr: "il faut dormir + durée",        vi: "cần ngủ bao nhiêu tiếng" },
      ],
      particles: [
        { fr: "bien / mal",          vi: "phó từ chỉ chất lượng giấc ngủ" },
        { fr: "pendant + durée",     vi: "trong suốt khoảng thời gian" },
      ],
      idioms: [
        { fr: "Dors bien !", vi: "Ngủ ngon nhé!" },
        { fr: "dormir comme un loir", vi: "ngủ như chết (thành ngữ)" },
      ],
    },

    marcher: {
      collocations: [
        { fr: "marcher vite",          vi: "đi bộ nhanh" },
        { fr: "marcher une heure",     vi: "đi bộ một tiếng" },
        { fr: "marcher au travail",    vi: "đi bộ đến sở" },
        { fr: "ça marche",             vi: "hoạt động / OK nhé" },
      ],
      structures: [
        { fr: "marcher + durée / distance", vi: "đi bộ bao lâu / bao xa" },
        { fr: "ça marche (bien/mal)",       vi: "(máy) chạy tốt/tệ" },
      ],
      particles: [
        { fr: "jusqu'à + nơi",  vi: "đi bộ đến tận đâu" },
        { fr: "pendant + durée", vi: "trong suốt" },
      ],
      idioms: [
        { fr: "Ça marche !", vi: "OK! / Được rồi!" },
        { fr: "marcher sur des œufs", vi: "đi trên trứng (quá cẩn thận)" },
      ],
    },

    courir: {
      collocations: [
        { fr: "courir le matin",    vi: "chạy bộ buổi sáng" },
        { fr: "courir un marathon", vi: "chạy marathon" },
        { fr: "courir vite",        vi: "chạy nhanh" },
        { fr: "aller courir",       vi: "đi chạy bộ" },
      ],
      structures: [
        { fr: "courir + durée / distance",    vi: "chạy bao lâu / bao xa" },
        { fr: "faire de la course à pied",    vi: "cách khác: chạy bộ (danh từ)" },
      ],
      particles: [
        { fr: "dans (le parc)",   vi: "trong công viên" },
        { fr: "pendant + durée",  vi: "trong khoảng thời gian" },
      ],
      idioms: [
        { fr: "courir après qqn",  vi: "đuổi theo ai" },
        { fr: "Cours !",           vi: "Chạy đi!" },
      ],
    },

    "se reposer": {
      collocations: [
        { fr: "se reposer après le sport",  vi: "nghỉ ngơi sau khi tập" },
        { fr: "se reposer le weekend",      vi: "nghỉ ngơi cuối tuần" },
        { fr: "bien se reposer",            vi: "nghỉ ngơi tốt" },
        { fr: "se reposer sur le canapé",   vi: "nghỉ trên sofa" },
      ],
      structures: [
        { fr: "se reposer après + qqch",      vi: "nghỉ ngơi sau khi làm gì" },
        { fr: "avoir besoin de se reposer",   vi: "cần nghỉ ngơi" },
      ],
      particles: [
        { fr: "après + qqch",    vi: "sau khi" },
        { fr: "sur (le canapé)", vi: "trên (sofa)" },
      ],
      idioms: [
        { fr: "Repose-toi bien !", vi: "Nghỉ ngơi cho khỏe nhé!" },
        { fr: "J'ai besoin de me reposer.", vi: "Tôi cần được nghỉ ngơi." },
      ],
    },

    prendre: {
      collocations: [
        { fr: "prendre un médicament",     vi: "uống thuốc" },
        { fr: "prendre un rendez-vous",    vi: "đặt hẹn (bác sĩ)" },
        { fr: "prendre le petit-déjeuner", vi: "ăn sáng" },
        { fr: "prendre soin de soi",       vi: "tự chăm sóc bản thân" },
      ],
      structures: [
        { fr: "prendre + qqch (objet direct)",   vi: "lấy / uống / dùng cái gì" },
        { fr: "prendre soin de + qqn/qqch",      vi: "chăm sóc ai/cái gì" },
      ],
      particles: [
        { fr: "soin de", vi: "chăm sóc: prendre soin de" },
        { fr: "en charge", vi: "đảm nhận: prendre en charge" },
      ],
      idioms: [
        { fr: "Prends soin de toi !",    vi: "Giữ gìn sức khỏe nhé!" },
        { fr: "Ça me prend du temps.",   vi: "Cái này mất của tôi thời gian." },
      ],
    },

    souffrir: {
      collocations: [
        { fr: "souffrir du dos",        vi: "bị đau lưng" },
        { fr: "souffrir de la tête",    vi: "bị đau đầu" },
        { fr: "souffrir d'une maladie", vi: "mắc bệnh" },
        { fr: "faire souffrir",         vi: "làm đau / làm khổ" },
      ],
      structures: [
        { fr: "souffrir de + bộ phận / bệnh", vi: "bị đau / mắc bệnh gì" },
        { fr: "faire souffrir qqn",           vi: "làm ai đó đau khổ" },
      ],
      particles: [
        { fr: "de + bộ phận cơ thể", vi: "đau chỗ nào: souffrir du dos" },
        { fr: "de + bệnh tật",       vi: "mắc bệnh gì: souffrir d'asthme" },
      ],
      idioms: [
        { fr: "souffrir en silence",      vi: "chịu đựng trong im lặng" },
        { fr: "Je souffre le martyre.",   vi: "Tôi đau đớn kinh khủng." },
      ],
    },

    aller: {
      collocations: [
        { fr: "aller bien",   vi: "khỏe" },
        { fr: "aller mal",    vi: "không khỏe" },
        { fr: "ça va",        vi: "ổn" },
        { fr: "aller mieux",  vi: "đỡ hơn rồi" },
      ],
      structures: [
        { fr: "aller + adverbe (bien/mal)",  vi: "hỏi/trả lời về sức khỏe" },
        { fr: "Comment vas-tu ?",            vi: "hỏi sức khỏe (thân mật)" },
        { fr: "Comment allez-vous ?",        vi: "hỏi sức khỏe (lịch sự)" },
      ],
      particles: [
        { fr: "bien / mieux / mal", vi: "phó từ chỉ tình trạng sức khỏe" },
      ],
      idioms: [
        { fr: "Ça va mieux, merci.",          vi: "Đỡ hơn rồi, cảm ơn." },
        { fr: "Ça va comme ci comme ça.",     vi: "Ổn ổn, không tốt không xấu." },
      ],
    },

    boire: {
      collocations: [
        { fr: "boire de l'eau",   vi: "uống nước" },
        { fr: "boire du café",    vi: "uống cà phê" },
        { fr: "boire un verre",   vi: "uống một ly" },
        { fr: "boire de l'alcool", vi: "uống rượu bia" },
      ],
      structures: [
        { fr: "boire du / de la / de l' + qqch", vi: "uống gì (article partitif)" },
        { fr: "boire + durée / fréquence",        vi: "uống bao nhiêu lần" },
      ],
      particles: [
        { fr: "du (café/thé)",  vi: "lượng không xác định: boire du café" },
        { fr: "de l' (eau)",    vi: "nguyên âm đầu: boire de l'eau" },
      ],
      idioms: [
        { fr: "boire un coup",                      vi: "đi uống một ly (thân mật)" },
        { fr: "Il ne faut pas boire et conduire.",  vi: "Uống rượu không lái xe." },
      ],
    },

    "éviter": {
      collocations: [
        { fr: "éviter le sucre",   vi: "tránh đường" },
        { fr: "éviter le stress",  vi: "tránh căng thẳng" },
        { fr: "éviter les erreurs", vi: "tránh lỗi" },
        { fr: "éviter de sortir",  vi: "tránh ra ngoài" },
      ],
      structures: [
        { fr: "éviter + qqch",    vi: "tránh cái gì (danh từ)" },
        { fr: "éviter de + V",    vi: "tránh làm gì" },
      ],
      particles: [
        { fr: "de + V",         vi: "éviter de fumer = tránh hút thuốc" },
        { fr: "à tout prix",    vi: "bằng mọi giá: éviter à tout prix" },
      ],
      idioms: [
        { fr: "Évite les excès !", vi: "Tránh thái quá nhé!" },
        { fr: "mieux vaut éviter",  vi: "tốt hơn là nên tránh" },
      ],
    },

    conseiller: {
      collocations: [
        { fr: "conseiller de dormir",    vi: "khuyên nên ngủ" },
        { fr: "conseiller un médecin",   vi: "giới thiệu bác sĩ" },
        { fr: "conseiller un restaurant", vi: "gợi ý nhà hàng" },
        { fr: "bien conseillé",          vi: "được tư vấn tốt" },
      ],
      structures: [
        { fr: "conseiller à qqn de + V", vi: "cấu trúc cố định: khuyên ai làm gì" },
        { fr: "Je te conseille de + V",  vi: "Tôi khuyên bạn nên…" },
      ],
      particles: [
        { fr: "à (qqn)",    vi: "khuyên ai: conseiller à quelqu'un" },
        { fr: "de + V",     vi: "làm gì: de dormir, de manger mieux" },
      ],
      idioms: [
        { fr: "Je vous conseille vivement.",   vi: "Tôi thành thật khuyên bạn." },
        { fr: "Un bon conseil !",              vi: "Một lời khuyên tốt!" },
      ],
    },

    "arrêter": {
      collocations: [
        { fr: "arrêter de fumer",       vi: "bỏ thuốc lá" },
        { fr: "arrêter le sport",       vi: "bỏ tập thể thao" },
        { fr: "s'arrêter de travailler", vi: "nghỉ làm việc" },
        { fr: "arrêter net",            vi: "dừng đột ngột" },
      ],
      structures: [
        { fr: "arrêter de + V",    vi: "ngừng làm gì" },
        { fr: "s'arrêter",         vi: "tự dừng lại (phản thân)" },
        { fr: "arrêter qqch",      vi: "dừng / chấm dứt cái gì" },
      ],
      particles: [
        { fr: "de + V", vi: "arrêter de fumer = ngừng hút thuốc" },
      ],
      idioms: [
        { fr: "Arrête de te plaindre !", vi: "Thôi phàn nàn đi!" },
        { fr: "N'arrête pas !",          vi: "Đừng dừng lại!" },
      ],
    },

    "avoir mal": {
      collocations: [
        { fr: "avoir mal à la tête",  vi: "đau đầu" },
        { fr: "avoir mal au ventre",  vi: "đau bụng" },
        { fr: "avoir mal aux dents",  vi: "đau răng" },
        { fr: "avoir mal au dos",     vi: "đau lưng" },
      ],
      structures: [
        { fr: "avoir mal à + article + bộ phận", vi: "đau chỗ nào (à+le=au, à+les=aux)" },
        { fr: "avoir très mal",                   vi: "đau nhiều" },
        { fr: "faire mal à qqn",                  vi: "làm ai đó đau" },
      ],
      particles: [
        { fr: "à la (tête, gorge)",  vi: "bộ phận giống cái" },
        { fr: "au (dos, ventre)",    vi: "bộ phận giống đực (à + le)" },
        { fr: "aux (dents, pieds)",  vi: "bộ phận số nhiều (à + les)" },
      ],
      idioms: [
        { fr: "Aïe, j'ai mal !", vi: "Ái, tôi đau!" },
        { fr: "Ça fait mal !",   vi: "Đau quá!" },
      ],
    },

    respirer: {
      collocations: [
        { fr: "respirer profondément",   vi: "hít thở sâu" },
        { fr: "respirer par le nez",     vi: "hít thở bằng mũi" },
        { fr: "respirer l'air frais",    vi: "hít thở không khí trong lành" },
        { fr: "bien respirer",           vi: "hít thở đúng cách" },
      ],
      structures: [
        { fr: "respirer + adverbe",         vi: "hít thở như thế nào" },
        { fr: "respirer par + bộ phận",     vi: "thở bằng mũi/miệng" },
      ],
      particles: [
        { fr: "profondément",          vi: "sâu: respirer profondément" },
        { fr: "par (le nez/la bouche)", vi: "bằng (mũi/miệng)" },
      ],
      idioms: [
        { fr: "Respire !",               vi: "Hít thở đi! (bình tĩnh nào)" },
        { fr: "Laisse-moi respirer !", vi: "Cho tôi thở với!" },
      ],
    },
  },

  // ── UNITÉ 9 ─ Les vacances ───────────────────────────────────────────────
  u9: {
    partir: {
      collocations: [
        { fr: "partir en vacances",  vi: "đi nghỉ" },
        { fr: "partir en voyage",    vi: "lên đường du lịch" },
        { fr: "partir à l'étranger", vi: "đi nước ngoài" },
        { fr: "partir tôt",          vi: "đi sớm" },
      ],
      structures: [
        { fr: "partir en + vùng/nước",   vi: "đi đến vùng/nước" },
        { fr: "partir à + thành phố",    vi: "đi đến thành phố" },
        { fr: "partir de + nơi xuất phát", vi: "khởi hành từ đâu" },
      ],
      particles: [
        { fr: "en (vacances, France)", vi: "đi đến (kỳ nghỉ, nước Pháp)" },
        { fr: "à (Paris)",             vi: "đến thành phố" },
        { fr: "de (Lyon)",             vi: "từ thành phố" },
      ],
      idioms: [
        { fr: "Bon voyage !",          vi: "Chúc đi vui vẻ!" },
        { fr: "partir à l'aventure",   vi: "đi theo kiểu phiêu lưu" },
      ],
    },

    arriver: {
      collocations: [
        { fr: "arriver à Paris",      vi: "đến Paris" },
        { fr: "arriver en retard",    vi: "đến trễ" },
        { fr: "arriver à l'heure",    vi: "đến đúng giờ" },
        { fr: "arriver enfin",        vi: "cuối cùng đã đến" },
      ],
      structures: [
        { fr: "arriver à + lieu",          vi: "đến nơi nào" },
        { fr: "arriver à + V",             vi: "làm được gì (thành công)" },
        { fr: "arriver en retard / à l'heure", vi: "đến trễ / đúng giờ" },
      ],
      particles: [
        { fr: "à + lieu",                  vi: "đến nơi: arriver à Nice" },
        { fr: "en retard / à l'heure",     vi: "phó từ chỉ thời gian" },
      ],
      idioms: [
        { fr: "J'arrive !",             vi: "Tôi đến ngay! (khi ai gọi)" },
        { fr: "arriver à ses fins",     vi: "đạt được mục đích" },
      ],
    },

    visiter: {
      collocations: [
        { fr: "visiter un musée",        vi: "tham quan bảo tàng" },
        { fr: "visiter une ville",       vi: "tham quan thành phố" },
        { fr: "visiter un monument",     vi: "tham quan danh lam" },
        { fr: "visiter un appartement",  vi: "xem căn hộ" },
      ],
      structures: [
        { fr: "visiter + nơi chốn (trực tiếp)", vi: "tham quan nơi nào (không giới từ)" },
        { fr: "aller visiter + nơi",             vi: "đi tham quan" },
      ],
      particles: [
        { fr: "KHÔNG dùng giới từ", vi: "visiter le musée (không 'visiter au musée')" },
      ],
      idioms: [
        { fr: "Vous avez visité Paris ?",  vi: "Bạn đã thăm Paris chưa?" },
        { fr: "rendre visite à qqn",       vi: "thăm người (khác visiter)" },
      ],
    },

    voir: {
      collocations: [
        { fr: "voir un film",    vi: "xem phim" },
        { fr: "voir des amis",   vi: "gặp bạn bè" },
        { fr: "voir la mer",     vi: "nhìn thấy biển" },
        { fr: "se voir",         vi: "gặp nhau" },
      ],
      structures: [
        { fr: "voir + qqch (cảnh vật)",  vi: "nhìn thấy cái gì" },
        { fr: "voir + qqn (gặp gỡ)",     vi: "gặp ai" },
        { fr: "voir si + phrase",        vi: "xem liệu có… không" },
      ],
      particles: [
        { fr: "KHÔNG cần giới từ (trực tiếp)", vi: "voir quelque chose (không à/de)" },
      ],
      idioms: [
        { fr: "On se voit bientôt !", vi: "Sớm gặp lại nhé!" },
        { fr: "C'est à voir.",        vi: "Phải xem thử đã." },
      ],
    },

    prendre: {
      collocations: [
        { fr: "prendre le train",  vi: "đi tàu" },
        { fr: "prendre l'avion",   vi: "đi máy bay" },
        { fr: "prendre le bus",    vi: "đi xe buýt" },
        { fr: "prendre un taxi",   vi: "bắt taxi" },
      ],
      structures: [
        { fr: "prendre le / la / l' + phương tiện", vi: "đi bằng phương tiện nào" },
        { fr: "prendre ses bagages",                 vi: "lấy hành lý" },
      ],
      particles: [
        { fr: "KHÔNG giới từ khi chỉ phương tiện", vi: "prendre le train (không phải 'en train' với prendre)" },
      ],
      idioms: [
        { fr: "J'ai pris le premier train.", vi: "Tôi đã bắt chuyến tàu đầu tiên." },
        { fr: "prendre la route",            vi: "lên đường (lái xe)" },
      ],
    },

    "réserver": {
      collocations: [
        { fr: "réserver une chambre",  vi: "đặt phòng" },
        { fr: "réserver une table",    vi: "đặt bàn" },
        { fr: "réserver un billet",    vi: "đặt vé" },
        { fr: "réserver en ligne",     vi: "đặt online" },
      ],
      structures: [
        { fr: "réserver + qqch (trực tiếp)",    vi: "đặt cái gì" },
        { fr: "réserver pour + số người / ngày", vi: "đặt cho bao nhiêu người" },
      ],
      particles: [
        { fr: "pour + số người",    vi: "cho: réserver pour 2 personnes" },
        { fr: "au nom de + tên",    vi: "đặt tên: au nom de Dupont" },
        { fr: "en ligne / par téléphone", vi: "online / qua điện thoại" },
      ],
      idioms: [
        { fr: "J'ai une réservation.", vi: "Tôi có đặt chỗ rồi." },
        { fr: "C'est réservé.",        vi: "Chỗ này đã được đặt rồi." },
      ],
    },

    rester: {
      collocations: [
        { fr: "rester à l'hôtel",      vi: "ở lại khách sạn" },
        { fr: "rester trois jours",    vi: "ở lại ba ngày" },
        { fr: "rester chez des amis",  vi: "ở nhà bạn bè" },
        { fr: "rester tranquille",     vi: "ở yên" },
      ],
      structures: [
        { fr: "rester + durée",             vi: "ở lại bao lâu" },
        { fr: "rester à / chez + nơi / người", vi: "ở lại đâu / nhà ai" },
        { fr: "rester + adjectif",          vi: "giữ trạng thái: rester calme" },
      ],
      particles: [
        { fr: "à (Paris)",          vi: "ở lại thành phố" },
        { fr: "chez (des amis)",    vi: "ở nhà ai đó" },
        { fr: "pendant (3 jours)",  vi: "trong suốt bao nhiêu ngày" },
      ],
      idioms: [
        { fr: "Reste !",          vi: "Ở lại đây!" },
        { fr: "Il reste du pain.", vi: "Còn bánh mì. (còn lại)" },
      ],
    },

    aller: {
      collocations: [
        { fr: "aller à la plage",     vi: "đi biển" },
        { fr: "aller en montagne",    vi: "đi núi" },
        { fr: "aller à l'étranger",   vi: "đi nước ngoài" },
        { fr: "aller voir + qqn",     vi: "đi thăm ai" },
      ],
      structures: [
        { fr: "aller à + thành phố",              vi: "đi đến thành phố" },
        { fr: "aller en + nước giống cái",        vi: "đi đến nước giống cái" },
        { fr: "aller au + nước giống đực",        vi: "đi đến nước giống đực" },
      ],
      particles: [
        { fr: "à (la plage, Paris)",  vi: "đến thành phố/nơi chốn" },
        { fr: "en (France, montagne)", vi: "đến nước giống cái/vùng" },
        { fr: "au (Japon, Portugal)", vi: "đến nước giống đực" },
      ],
      idioms: [
        { fr: "Allons-y !", vi: "Đi thôi!" },
        { fr: "Vas-y !",    vi: "Đi đi! / Làm đi!" },
      ],
    },

    rentrer: {
      collocations: [
        { fr: "rentrer chez soi",        vi: "về nhà mình" },
        { fr: "rentrer de vacances",     vi: "trở về sau kỳ nghỉ" },
        { fr: "rentrer en France",       vi: "trở về Pháp" },
        { fr: "rentrer tard",            vi: "về muộn" },
      ],
      structures: [
        { fr: "rentrer de + nơi đã đến",        vi: "trở về từ đâu" },
        { fr: "rentrer à / chez + nơi về đến",  vi: "về đến đâu / nhà ai" },
      ],
      particles: [
        { fr: "de (vacances, Paris)",  vi: "từ: rentrer de Paris" },
        { fr: "à (la maison)",         vi: "về: rentrer à la maison" },
        { fr: "chez (soi, ses parents)", vi: "nhà: rentrer chez soi" },
      ],
      idioms: [
        { fr: "La rentrée",          vi: "Mùa tựu trường / khai giảng (danh từ)" },
        { fr: "Bonne rentrée !",     vi: "Chúc tựu trường vui vẻ!" },
      ],
    },

    voyager: {
      collocations: [
        { fr: "voyager en train",       vi: "du lịch bằng tàu" },
        { fr: "voyager à l'étranger",   vi: "du lịch nước ngoài" },
        { fr: "voyager seul(e)",        vi: "du lịch một mình" },
        { fr: "voyager léger",          vi: "du lịch gọn nhẹ" },
      ],
      structures: [
        { fr: "voyager en / à + destination", vi: "du lịch đến đâu" },
        { fr: "voyager avec + qqn",           vi: "du lịch cùng ai" },
      ],
      particles: [
        { fr: "en (avion/train/France)", vi: "bằng phương tiện / đến nước giống cái" },
        { fr: "à (Paris)",               vi: "đến thành phố" },
        { fr: "avec (des amis)",         vi: "cùng bạn bè" },
      ],
      idioms: [
        { fr: "Les voyages forment la jeunesse.", vi: "Du lịch mở mang con người." },
        { fr: "Bon voyage !",                      vi: "Chúc đi vui!" },
      ],
    },

    passer: {
      collocations: [
        { fr: "passer des vacances",       vi: "trải qua kỳ nghỉ" },
        { fr: "passer un moment agréable", vi: "trải qua thời gian vui" },
        { fr: "passer par Paris",          vi: "đi qua Paris (quá cảnh)" },
        { fr: "passer une nuit",           vi: "ở lại một đêm" },
      ],
      structures: [
        { fr: "passer + temps / vacances (avoir)", vi: "trải qua thời gian (dùng avoir)" },
        { fr: "passer par + nơi (être)",           vi: "đi qua nơi đâu (dùng être)" },
        { fr: "se passer",                         vi: "xảy ra: Qu'est-ce qui se passe ?" },
      ],
      particles: [
        { fr: "par + nơi",    vi: "đi qua: passer par Lyon" },
        { fr: "chez (qqn)",   vi: "ghé qua: passer chez toi" },
      ],
      idioms: [
        { fr: "Ça se passe bien.",  vi: "Mọi chuyện diễn ra tốt." },
        { fr: "Le temps passe vite.", vi: "Thời gian trôi nhanh." },
      ],
    },

    "découvrir": {
      collocations: [
        { fr: "découvrir un pays",     vi: "khám phá một đất nước" },
        { fr: "découvrir une culture", vi: "khám phá văn hóa" },
        { fr: "découvrir un restaurant", vi: "phát hiện nhà hàng" },
        { fr: "découvrir la vérité",   vi: "phát hiện sự thật" },
      ],
      structures: [
        { fr: "découvrir + qqch",          vi: "khám phá / phát hiện cái gì" },
        { fr: "faire découvrir qqch à qqn", vi: "giới thiệu cái gì cho ai khám phá" },
      ],
      particles: [
        { fr: "KHÔNG cần giới từ (trực tiếp)", vi: "découvrir un village (không có giới từ)" },
      ],
      idioms: [
        { fr: "J'ai découvert un endroit magique.", vi: "Tôi đã phát hiện một nơi tuyệt vời." },
        { fr: "À découvrir !",                       vi: "Đáng khám phá!" },
      ],
    },

    manger: {
      collocations: [
        { fr: "manger des spécialités",   vi: "ăn đặc sản" },
        { fr: "manger au restaurant",     vi: "ăn ở nhà hàng" },
        { fr: "manger local",             vi: "ăn theo kiểu địa phương" },
        { fr: "bien manger",              vi: "ăn ngon / ăn lành mạnh" },
      ],
      structures: [
        { fr: "manger + article partitif + plat", vi: "ăn (một phần) món gì" },
        { fr: "inviter à manger",                  vi: "mời ăn" },
      ],
      particles: [
        { fr: "au restaurant",  vi: "ở nhà hàng" },
        { fr: "avec (des amis)", vi: "cùng bạn bè" },
      ],
      idioms: [
        { fr: "Bon appétit !",          vi: "Chúc ngon miệng!" },
        { fr: "manger sur le pouce",    vi: "ăn nhanh / ăn qua loa" },
      ],
    },

    dormir: {
      collocations: [
        { fr: "dormir à l'hôtel",          vi: "ngủ ở khách sạn" },
        { fr: "dormir sous la tente",      vi: "ngủ lều trại" },
        { fr: "dormir à la belle étoile",  vi: "ngủ ngoài trời dưới sao" },
        { fr: "bien dormi",                vi: "đã ngủ ngon" },
      ],
      structures: [
        { fr: "dormir à + nơi ở",           vi: "ngủ ở đâu" },
        { fr: "dormir + adverbe (bien/mal)", vi: "ngủ như thế nào" },
      ],
      particles: [
        { fr: "à l'hôtel / chez des amis", vi: "ở khách sạn / nhà bạn" },
        { fr: "sous (la tente)",           vi: "trong lều" },
      ],
      idioms: [
        { fr: "J'ai bien dormi !",              vi: "Tôi ngủ ngon lắm!" },
        { fr: "dormir à la belle étoile",       vi: "ngủ ngoài trời (thành ngữ)" },
      ],
    },

    acheter: {
      collocations: [
        { fr: "acheter des souvenirs",  vi: "mua quà lưu niệm" },
        { fr: "acheter en ligne",       vi: "mua online" },
        { fr: "acheter au marché",      vi: "mua ở chợ" },
        { fr: "acheter pas cher",       vi: "mua rẻ" },
      ],
      structures: [
        { fr: "acheter + qqch à + qqn (người nhận)", vi: "mua gì cho ai (tặng)" },
        { fr: "acheter + qqch à + qqn (người bán)", vi: "mua gì từ ai" },
      ],
      particles: [
        { fr: "à (qqn)",           vi: "mua cho ai: acheter qqch à sa mère" },
        { fr: "en ligne / au marché", vi: "online / ở chợ" },
      ],
      idioms: [
        { fr: "Ça vaut le coup d'acheter.", vi: "Đáng mua lắm." },
        { fr: "acheter à bon prix",        vi: "mua với giá tốt" },
      ],
    },
  },

  // ── UNITÉ 10 ─ Le travail ────────────────────────────────────────────────
  u10: {
    travailler: {
      collocations: [
        { fr: "travailler à temps plein",  vi: "làm toàn thời gian" },
        { fr: "travailler à temps partiel", vi: "làm bán thời gian" },
        { fr: "travailler en équipe",       vi: "làm việc nhóm" },
        { fr: "travailler dur",             vi: "làm việc chăm chỉ" },
      ],
      structures: [
        { fr: "travailler comme + nghề",      vi: "làm với tư cách nghề gì" },
        { fr: "travailler dans + lĩnh vực",   vi: "làm trong lĩnh vực" },
        { fr: "travailler chez + tên công ty", vi: "làm ở công ty nào" },
      ],
      particles: [
        { fr: "comme (ingénieur)",            vi: "với tư cách" },
        { fr: "dans (la santé, l'informatique)", vi: "trong lĩnh vực" },
        { fr: "chez (une entreprise)",        vi: "ở công ty" },
      ],
      idioms: [
        { fr: "Bon courage !",              vi: "Cố lên! (khi ai làm việc khó)" },
        { fr: "travailler d'arrache-pied",  vi: "làm việc cật lực" },
      ],
    },

    "étudier": {
      collocations: [
        { fr: "étudier le français",      vi: "học tiếng Pháp" },
        { fr: "étudier à l'université",   vi: "học ở đại học" },
        { fr: "étudier les maths",        vi: "học toán" },
        { fr: "étudier pour un examen",   vi: "ôn thi" },
      ],
      structures: [
        { fr: "étudier + môn học (trực tiếp)",  vi: "học môn gì (không cần giới từ)" },
        { fr: "étudier à + trường / thành phố", vi: "học ở đâu" },
        { fr: "étudier pour + mục tiêu",        vi: "học để làm gì" },
      ],
      particles: [
        { fr: "à (l'université, Paris)", vi: "ở trường / thành phố" },
        { fr: "pour (un examen)",        vi: "để thi / cho mục tiêu" },
      ],
      idioms: [
        { fr: "Bon courage pour tes études !", vi: "Cố lên trong học tập!" },
        { fr: "faire des études de + môn",     vi: "học chuyên ngành (dài hạn)" },
      ],
    },

    savoir: {
      collocations: [
        { fr: "savoir parler",   vi: "biết nói" },
        { fr: "savoir conduire", vi: "biết lái xe" },
        { fr: "savoir nager",    vi: "biết bơi" },
        { fr: "ne pas savoir",   vi: "không biết" },
      ],
      structures: [
        { fr: "savoir + V (nguyên thể)",  vi: "biết làm gì (kỹ năng học được)" },
        { fr: "savoir que + phrase",       vi: "biết rằng…" },
        { fr: "Je ne sais pas.",           vi: "Tôi không biết." },
      ],
      particles: [
        { fr: "KHÔNG giới từ với V",    vi: "savoir nager (không 'savoir à nager')" },
        { fr: "que + subordonnée",      vi: "biết rằng: savoir que…" },
      ],
      idioms: [
        { fr: "On ne sait jamais.",  vi: "Không bao giờ biết được." },
        { fr: "savoir par cœur",     vi: "biết thuộc lòng" },
      ],
    },

    pouvoir: {
      collocations: [
        { fr: "pouvoir commencer",     vi: "có thể bắt đầu" },
        { fr: "pouvoir travailler",    vi: "có thể làm việc" },
        { fr: "ne pas pouvoir venir",  vi: "không thể đến" },
        { fr: "pouvoir parler anglais", vi: "có thể nói tiếng Anh" },
      ],
      structures: [
        { fr: "pouvoir + V (nguyên thể)", vi: "có thể làm gì" },
        { fr: "Vous pouvez + V ?",         vi: "Bạn có thể…? (nhờ vả lịch sự)" },
        { fr: "je pourrais (conditionnel)", vi: "Tôi có thể… (lịch sự hơn)" },
      ],
      particles: [
        { fr: "KHÔNG giới từ", vi: "pouvoir + infinitif trực tiếp" },
      ],
      idioms: [
        { fr: "Vous pouvez répéter, s'il vous plaît ?", vi: "Bạn có thể nhắc lại không?" },
        { fr: "On ne peut pas tout avoir.",              vi: "Không thể có tất cả." },
      ],
    },

    vouloir: {
      collocations: [
        { fr: "vouloir devenir médecin",  vi: "muốn trở thành bác sĩ" },
        { fr: "vouloir travailler",       vi: "muốn làm việc" },
        { fr: "vouloir bien + V",         vi: "sẵn sàng làm gì" },
        { fr: "ne pas vouloir",           vi: "không muốn" },
      ],
      structures: [
        { fr: "vouloir + V (nguyên thể)",  vi: "muốn làm gì" },
        { fr: "vouloir + qqch (danh từ)",  vi: "muốn cái gì" },
        { fr: "je voudrais (conditionnel)", vi: "Tôi muốn… (lịch sự hơn veux)" },
      ],
      particles: [
        { fr: "bien + V",             vi: "sẵn sàng: vouloir bien aider" },
        { fr: "KHÔNG giới từ với V",  vi: "vouloir travailler (không 'vouloir de travailler')" },
      ],
      idioms: [
        { fr: "Je voudrais, s'il vous plaît.", vi: "Cho tôi… (đặt đồ lịch sự)" },
        { fr: "Vouloir, c'est pouvoir.",       vi: "Muốn là được. (tục ngữ)" },
      ],
    },

    chercher: {
      collocations: [
        { fr: "chercher un travail",     vi: "tìm việc" },
        { fr: "chercher un appartement", vi: "tìm nhà" },
        { fr: "chercher ses clés",       vi: "tìm chìa khóa" },
        { fr: "chercher à comprendre",   vi: "cố hiểu" },
      ],
      structures: [
        { fr: "chercher + qqch (trực tiếp)", vi: "tìm cái gì (không cần giới từ)" },
        { fr: "chercher à + V",              vi: "cố gắng làm gì" },
        { fr: "aller chercher qqn",          vi: "đi đón ai" },
      ],
      particles: [
        { fr: "à + V",                         vi: "chercher à comprendre = cố hiểu" },
        { fr: "KHÔNG 'pour' hay 'de' sau chercher", vi: "chercher qqch (trực tiếp)" },
      ],
      idioms: [
        { fr: "Tu cherches des problèmes !", vi: "Mày đang cố kiếm chuyện!" },
        { fr: "Je cherche mes mots.",        vi: "Tôi đang tìm từ (để nói)." },
      ],
    },

    apprendre: {
      collocations: [
        { fr: "apprendre le français",  vi: "học tiếng Pháp" },
        { fr: "apprendre à conduire",   vi: "học lái xe" },
        { fr: "apprendre par cœur",     vi: "học thuộc lòng" },
        { fr: "apprendre vite",         vi: "học nhanh" },
      ],
      structures: [
        { fr: "apprendre + qqch (môn học)", vi: "học cái gì" },
        { fr: "apprendre à + V",            vi: "học làm gì (kỹ năng)" },
        { fr: "apprendre qqch à qqn",       vi: "dạy ai cái gì" },
      ],
      particles: [
        { fr: "à + V",       vi: "apprendre à nager = học bơi" },
        { fr: "par cœur",    vi: "thuộc lòng (thành ngữ)" },
      ],
      idioms: [
        { fr: "apprendre sur le tas",             vi: "học bằng thực hành tại chỗ" },
        { fr: "On n'a jamais fini d'apprendre.",  vi: "Học hỏi là chuyện không bao giờ dừng." },
      ],
    },

    devenir: {
      collocations: [
        { fr: "devenir médecin",   vi: "trở thành bác sĩ" },
        { fr: "devenir célèbre",   vi: "trở nên nổi tiếng" },
        { fr: "devenir ami(e)",    vi: "trở thành bạn" },
        { fr: "devenir grand(e)",  vi: "lớn lên / lớn mạnh" },
      ],
      structures: [
        { fr: "devenir + nghề nghiệp (không article)", vi: "trở thành nghề: devenir médecin" },
        { fr: "devenir + tính từ",                     vi: "trở nên: devenir célèbre" },
        { fr: "vouloir devenir + nghề",                vi: "muốn trở thành" },
      ],
      particles: [
        { fr: "KHÔNG article trước nghề nghiệp", vi: "devenir ingénieur (không 'un ingénieur')" },
      ],
      idioms: [
        { fr: "Qu'est-ce que tu veux devenir ?", vi: "Bạn muốn trở thành gì?" },
        { fr: "Qu'est-ce que tu deviens ?",       vi: "Dạo này mày thế nào? (thân mật)" },
      ],
    },

    trouver: {
      collocations: [
        { fr: "trouver un emploi",    vi: "tìm được việc" },
        { fr: "trouver un stage",     vi: "tìm được thực tập" },
        { fr: "trouver une solution", vi: "tìm ra giải pháp" },
        { fr: "trouver ça bien",      vi: "thấy cái đó hay" },
      ],
      structures: [
        { fr: "trouver + qqch (kết quả)",  vi: "tìm ra / tìm được" },
        { fr: "trouver + adj",             vi: "cho là: Je trouve ça intéressant." },
        { fr: "se trouver",                vi: "nằm ở đâu: Où se trouve… ?" },
      ],
      particles: [
        { fr: "KHÔNG giới từ (trực tiếp)", vi: "trouver un emploi (không 'trouver pour')" },
      ],
      idioms: [
        { fr: "Où se trouve la gare ?",       vi: "Ga ở đâu? (se trouver)" },
        { fr: "trouver chaussure à son pied", vi: "tìm được đúng thứ mình cần" },
      ],
    },

    parler: {
      collocations: [
        { fr: "parler français",         vi: "nói tiếng Pháp" },
        { fr: "parler à voix haute",     vi: "nói to" },
        { fr: "parler avec quelqu'un",   vi: "nói chuyện với ai" },
        { fr: "parler de sa vie",        vi: "kể về cuộc đời" },
      ],
      structures: [
        { fr: "parler + ngôn ngữ (trực tiếp)", vi: "nói tiếng gì: parler français" },
        { fr: "parler à + qqn",                vi: "nói chuyện với ai" },
        { fr: "parler de + qqch",              vi: "nói về cái gì" },
      ],
      particles: [
        { fr: "à (qqn)",    vi: "với ai: parler à son professeur" },
        { fr: "de (qqch)",  vi: "về cái gì: parler de son travail" },
        { fr: "avec (qqn)", vi: "cùng ai: parler avec des amis" },
      ],
      idioms: [
        { fr: "Tu parles !",       vi: "Mày nói cho sướng miệng! (bác bỏ)" },
        { fr: "Sans parler de…",   vi: "Chưa kể đến…" },
      ],
    },

    lire: {
      collocations: [
        { fr: "lire un livre",      vi: "đọc sách" },
        { fr: "lire le journal",    vi: "đọc báo" },
        { fr: "lire une annonce",   vi: "đọc thông báo tuyển dụng" },
        { fr: "lire à voix haute",  vi: "đọc to thành tiếng" },
      ],
      structures: [
        { fr: "lire + qqch (trực tiếp)", vi: "đọc cái gì" },
        { fr: "lire à qqn",              vi: "đọc cho ai nghe" },
      ],
      particles: [
        { fr: "à voix haute / basse",    vi: "to / nhỏ" },
        { fr: "KHÔNG giới từ (trực tiếp)", vi: "lire un roman (không 'lire à un roman')" },
      ],
      idioms: [
        { fr: "lire entre les lignes",  vi: "đọc hàm ý (thành ngữ)" },
        { fr: "Lisez !",                vi: "Đọc đi! (mệnh lệnh)" },
      ],
    },

    "écrire": {
      collocations: [
        { fr: "écrire un CV",                  vi: "viết CV" },
        { fr: "écrire une lettre de motivation", vi: "viết thư xin việc" },
        { fr: "écrire un e-mail",              vi: "viết email" },
        { fr: "écrire à la main",              vi: "viết tay" },
      ],
      structures: [
        { fr: "écrire + qqch (trực tiếp)",   vi: "viết cái gì" },
        { fr: "écrire à + qqn",              vi: "viết cho ai" },
        { fr: "s'écrire",                    vi: "viết thư cho nhau" },
      ],
      particles: [
        { fr: "à (qqn)",                  vi: "viết cho ai: écrire à son ami" },
        { fr: "à la main / à l'ordinateur", vi: "viết tay / bằng máy" },
      ],
      idioms: [
        { fr: "C'est écrit noir sur blanc.", vi: "Viết đen trên trắng (rõ ràng)." },
        { fr: "Bien écrit !",               vi: "Viết hay lắm!" },
      ],
    },

    "présenter": {
      collocations: [
        { fr: "présenter un projet",         vi: "trình bày dự án" },
        { fr: "se présenter à un entretien", vi: "đến phỏng vấn" },
        { fr: "présenter ses excuses",       vi: "xin lỗi" },
        { fr: "présenter qqn à qqn",         vi: "giới thiệu ai cho ai" },
      ],
      structures: [
        { fr: "présenter + qqch",       vi: "trình bày cái gì" },
        { fr: "se présenter",           vi: "tự giới thiệu bản thân" },
        { fr: "présenter qqn à qqn",    vi: "giới thiệu ai với ai" },
      ],
      particles: [
        { fr: "à (qqn)",         vi: "giới thiệu cho ai: présenter à ses collègues" },
        { fr: "devant (un jury)", vi: "trước: présenter devant le jury" },
      ],
      idioms: [
        { fr: "Je me présente : je m'appelle…", vi: "Tôi tự giới thiệu: tên tôi là…" },
        { fr: "se présenter aux élections",      vi: "ra ứng cử" },
      ],
    },

    "réussir": {
      collocations: [
        { fr: "réussir un examen",      vi: "đậu kỳ thi" },
        { fr: "réussir sa vie",         vi: "thành công trong cuộc sống" },
        { fr: "réussir un entretien",   vi: "vượt qua phỏng vấn" },
        { fr: "bien réussir",           vi: "thành công tốt" },
      ],
      structures: [
        { fr: "réussir + qqch",          vi: "thành công / đậu cái gì" },
        { fr: "réussir à + V",           vi: "thành công làm được gì" },
        { fr: "réussir dans + lĩnh vực", vi: "thành công trong lĩnh vực" },
      ],
      particles: [
        { fr: "à + V",             vi: "réussir à trouver = thành công tìm được" },
        { fr: "dans (sa carrière)", vi: "trong lĩnh vực nghề nghiệp" },
      ],
      idioms: [
        { fr: "Bonne chance !",            vi: "Chúc may mắn!" },
        { fr: "réussir du premier coup",   vi: "thành công ngay lần đầu" },
      ],
    },

    "préparer": {
      collocations: [
        { fr: "préparer un entretien",    vi: "chuẩn bị phỏng vấn" },
        { fr: "préparer un diplôme",      vi: "học lấy bằng" },
        { fr: "se préparer à l'avance",   vi: "chuẩn bị trước" },
        { fr: "préparer un repas",        vi: "chuẩn bị bữa ăn" },
      ],
      structures: [
        { fr: "préparer + qqch",       vi: "chuẩn bị cái gì" },
        { fr: "se préparer à + V",     vi: "chuẩn bị cho việc gì (sắp làm)" },
        { fr: "préparer qqn à + qqch", vi: "chuẩn bị cho ai trước một việc" },
      ],
      particles: [
        { fr: "à + V",          vi: "se préparer à partir = chuẩn bị đi" },
        { fr: "pour + qqch",    vi: "chuẩn bị cho: préparer pour l'entretien" },
      ],
      idioms: [
        { fr: "Tout est prêt !",          vi: "Mọi thứ đã sẵn sàng!" },
        { fr: "se préparer au pire",      vi: "chuẩn bị cho tình huống xấu nhất" },
      ],
    },
  },
};

export function getVerbExpand(unitId, infinitive) {
  return EDITO_VERB_EXPAND[unitId]?.[infinitive] ?? null;
}
