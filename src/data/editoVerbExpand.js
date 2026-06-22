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

  // ─── U0 : Premiers contacts ───────────────────────────────────────────────
  u0: {
    "être": {
      collocations: [
        { fr: "être étudiant(e)",            vi: "là sinh viên" },
        { fr: "être français(e)",            vi: "là người Pháp" },
        { fr: "être de Paris",               vi: "là người Paris / đến từ Paris" },
        { fr: "être fatigué(e)",             vi: "mệt" },
      ],
      structures: [
        { fr: "Je suis + [profession/nationalité]", vi: "không dùng mạo từ: Je suis professeur" },
        { fr: "C'est + [nom/adj]",                 vi: "giới thiệu hoặc mô tả: C'est Paul" },
        { fr: "Il/Elle est + adj",                 vi: "mô tả người: Il est sympa" },
      ],
      particles: [
        { fr: "être de + ville",    vi: "xuất xứ: être de Lyon" },
        { fr: "être en + pays fém", vi: "ở một nước: être en France" },
      ],
      idioms: [
        { fr: "C'est ça !", vi: "Đúng rồi!" },
        { fr: "Ça y est !",  vi: "Xong rồi! / Được rồi!" },
      ],
    },
    "avoir": {
      collocations: [
        { fr: "avoir un prénom",     vi: "có tên" },
        { fr: "avoir un numéro",     vi: "có số (điện thoại...)" },
        { fr: "avoir l'air + adj",   vi: "có vẻ: avoir l'air sympa" },
        { fr: "avoir ... ans",       vi: "bao nhiêu tuổi" },
      ],
      structures: [
        { fr: "avoir + [nom sans article]", vi: "thành ngữ cố định: avoir faim" },
        { fr: "avoir besoin de + V/N",      vi: "cần làm gì / cần cái gì" },
      ],
      particles: [
        { fr: "Il y a + [nom]", vi: "có (tồn tại): Il y a un livre" },
      ],
      idioms: [
        { fr: "avoir l'air bien", vi: "trông có vẻ ổn" },
        { fr: "il y a",           vi: "có (dùng như động từ độc lập)" },
      ],
    },
    "s'appeler": {
      collocations: [
        { fr: "s'appeler Marie",             vi: "tên là Marie" },
        { fr: "Comment vous appelez-vous ?", vi: "Bạn tên là gì? (lịch sự)" },
        { fr: "Comment tu t'appelles ?",     vi: "Bạn tên là gì? (thân mật)" },
      ],
      structures: [
        { fr: "Je m'appelle + [prénom]",   vi: "cấu trúc giới thiệu tên" },
        { fr: "Il/Elle s'appelle + [nom]", vi: "giới thiệu tên người khác" },
      ],
      particles: [
        { fr: "verbe pronominal (se)", vi: "me, te, s', nous, vous, s'" },
      ],
      idioms: [
        { fr: "Ça s'appelle comment ?", vi: "Cái đó gọi là gì?" },
      ],
    },
    "habiter": {
      collocations: [
        { fr: "habiter à Paris",        vi: "sống ở Paris" },
        { fr: "habiter en France",      vi: "sống ở Pháp" },
        { fr: "habiter un appartement", vi: "ở trong một căn hộ" },
        { fr: "habiter avec qqn",       vi: "sống cùng ai" },
      ],
      structures: [
        { fr: "habiter à + ville",      vi: "sống ở thành phố" },
        { fr: "habiter en + pays fém",  vi: "sống ở nước (giống cái)" },
        { fr: "habiter au + pays masc", vi: "sống ở nước (giống đực)" },
      ],
      particles: [
        { fr: "à / en / au / aux", vi: "thay đổi theo loại địa danh" },
      ],
      idioms: [],
    },
    "parler": {
      collocations: [
        { fr: "parler français",         vi: "nói tiếng Pháp" },
        { fr: "parler à qqn",            vi: "nói chuyện với ai" },
        { fr: "parler de qqch",          vi: "nói về cái gì" },
        { fr: "parler fort / doucement", vi: "nói to / nhỏ" },
      ],
      structures: [
        { fr: "parler + [langue sans article]", vi: "Je parle français (không có mạo từ)" },
        { fr: "parler à + [personne]",          vi: "nói với: parler à Marie" },
        { fr: "parler de + [sujet]",            vi: "nói về: parler de la météo" },
      ],
      particles: [
        { fr: "à (personne) / de (sujet)", vi: "phân biệt đối tượng và chủ đề" },
      ],
      idioms: [
        { fr: "Vous parlez français ?", vi: "Bạn nói tiếng Pháp không?" },
        { fr: "On parle de quoi ?",     vi: "Mình nói về chuyện gì?" },
      ],
    },
    "comprendre": {
      collocations: [
        { fr: "comprendre le français",  vi: "hiểu tiếng Pháp" },
        { fr: "comprendre la question",  vi: "hiểu câu hỏi" },
        { fr: "ne pas comprendre",       vi: "không hiểu" },
        { fr: "comprendre vite",         vi: "hiểu nhanh" },
      ],
      structures: [
        { fr: "Je comprends + [qqch]",  vi: "hiểu cái gì (trực tiếp)" },
        { fr: "Je ne comprends pas.",   vi: "phủ định thường gặp nhất ở lớp" },
      ],
      particles: [
        { fr: "pas de giới từ trước tân ngữ trực tiếp", vi: "comprendre le texte" },
      ],
      idioms: [
        { fr: "Je n'ai pas compris.", vi: "Tôi không hiểu. (passé composé)" },
      ],
    },
    "répéter": {
      collocations: [
        { fr: "répéter une phrase",      vi: "lặp lại một câu" },
        { fr: "répéter s'il vous plaît", vi: "nhờ nhắc lại (lịch sự)" },
        { fr: "répéter après moi",       vi: "lặp lại theo tôi" },
      ],
      structures: [
        { fr: "Répétez + [qqch] !",         vi: "mệnh lệnh: Lặp lại ... !" },
        { fr: "Pouvez-vous répéter ?",       vi: "Bạn có thể lặp lại không?" },
      ],
      particles: [
        { fr: "accent: je répète / nous répétons", vi: "accent thay đổi theo ngôi" },
      ],
      idioms: [
        { fr: "Vous pouvez répéter, s'il vous plaît ?", vi: "Bạn có thể nhắc lại không?" },
      ],
    },
    "écrire": {
      collocations: [
        { fr: "écrire son nom",      vi: "viết tên" },
        { fr: "écrire une lettre",   vi: "viết thư" },
        { fr: "écrire au tableau",   vi: "viết lên bảng" },
        { fr: "écrire un message",   vi: "viết tin nhắn" },
      ],
      structures: [
        { fr: "écrire + [qqch]",        vi: "viết cái gì (trực tiếp)" },
        { fr: "écrire à + [personne]",  vi: "viết cho ai" },
        { fr: "écrire sur + [support]", vi: "écrire sur le cahier" },
      ],
      particles: [
        { fr: "à (destinataire) / sur (support)", vi: "écrire à Marie / sur le tableau" },
      ],
      idioms: [
        { fr: "Comment ça s'écrit ?", vi: "Viết thế nào?" },
      ],
    },
    "lire": {
      collocations: [
        { fr: "lire un texte",    vi: "đọc một đoạn văn" },
        { fr: "lire à voix haute", vi: "đọc to" },
        { fr: "lire en silence",  vi: "đọc thầm" },
        { fr: "lire un livre",    vi: "đọc sách" },
      ],
      structures: [
        { fr: "lire + [qqch]",       vi: "đọc cái gì (trực tiếp)" },
        { fr: "lire à + [personne]", vi: "đọc cho ai nghe" },
      ],
      particles: [
        { fr: "pas de giới từ trước tân ngữ trực tiếp", vi: "lire le texte" },
      ],
      idioms: [
        { fr: "Lisez le texte page 10.", vi: "Đọc đoạn văn trang 10." },
      ],
    },
    "écouter": {
      collocations: [
        { fr: "écouter la radio",      vi: "nghe đài" },
        { fr: "écouter de la musique", vi: "nghe nhạc" },
        { fr: "écouter le professeur", vi: "lắng nghe giáo viên" },
        { fr: "écouter un dialogue",   vi: "nghe một đoạn hội thoại" },
      ],
      structures: [
        { fr: "écouter + [qqch/qqn]", vi: "nghe cái gì / ai (không giới từ)" },
      ],
      particles: [
        { fr: "pas de giới từ", vi: "écouter qqn trực tiếp (chủ động)" },
      ],
      idioms: [
        { fr: "Écoutez bien !", vi: "Nghe thật kỹ!" },
      ],
    },
    "ouvrir": {
      collocations: [
        { fr: "ouvrir le livre",   vi: "mở sách" },
        { fr: "ouvrir la porte",   vi: "mở cửa" },
        { fr: "ouvrir un compte",  vi: "mở tài khoản" },
        { fr: "ouvrir à + heure",  vi: "mở cửa lúc mấy giờ" },
      ],
      structures: [
        { fr: "ouvrir + [qqch]",     vi: "mở cái gì" },
        { fr: "ouvrir à + [heure]",  vi: "ouvre à 9h" },
      ],
      particles: [
        { fr: "à (heure) / sur (vue)", vi: "ouvrir à 9h / une fenêtre sur le jardin" },
      ],
      idioms: [
        { fr: "Ouvrez vos livres page 5.", vi: "Mở sách trang 5." },
      ],
    },
    "fermer": {
      collocations: [
        { fr: "fermer la porte",   vi: "đóng cửa" },
        { fr: "fermer le livre",   vi: "đóng sách" },
        { fr: "fermer à clé",      vi: "khóa cửa" },
        { fr: "fermer le magasin", vi: "đóng cửa hàng" },
      ],
      structures: [
        { fr: "fermer + [qqch]",    vi: "đóng cái gì" },
        { fr: "fermer à + [heure]", vi: "đóng lúc: ferme à 18h" },
      ],
      particles: [
        { fr: "à clé", vi: "fermer à clé = khóa cửa (cụm cố định)" },
      ],
      idioms: [
        { fr: "Fermez les cahiers !", vi: "Đóng vở lại!" },
      ],
    },
    "regarder": {
      collocations: [
        { fr: "regarder une photo",      vi: "xem ảnh" },
        { fr: "regarder le tableau",     vi: "nhìn lên bảng" },
        { fr: "regarder la télé",        vi: "xem ti vi" },
        { fr: "regarder par la fenêtre", vi: "nhìn qua cửa sổ" },
      ],
      structures: [
        { fr: "regarder + [qqch/qqn]", vi: "nhìn / xem (chủ động, không giới từ)" },
      ],
      particles: [
        { fr: "pas de giới từ", vi: "regarder qqch trực tiếp (chủ động hơn 'voir')" },
      ],
      idioms: [
        { fr: "Regardez l'image !", vi: "Hãy nhìn vào hình ảnh!" },
      ],
    },
    "épeler": {
      collocations: [
        { fr: "épeler son nom",      vi: "đánh vần tên" },
        { fr: "épeler une adresse",  vi: "đánh vần địa chỉ" },
        { fr: "épeler lentement",    vi: "đánh vần chậm" },
      ],
      structures: [
        { fr: "Épeler + [qqch] !",      vi: "Đánh vần cái gì!" },
        { fr: "Pouvez-vous épeler ?",   vi: "Bạn có thể đánh vần không?" },
      ],
      particles: [
        { fr: "j'épelle / nous épelons", vi: "phụ âm l kép ở je/tu/il/ils" },
      ],
      idioms: [
        { fr: "Vous pouvez épeler votre nom ?", vi: "Bạn có thể đánh vần tên không?" },
      ],
    },
    "demander": {
      collocations: [
        { fr: "demander son nom",   vi: "hỏi tên" },
        { fr: "demander l'heure",   vi: "hỏi giờ" },
        { fr: "demander de l'aide", vi: "nhờ giúp đỡ" },
        { fr: "demander à qqn",     vi: "hỏi / nhờ ai" },
      ],
      structures: [
        { fr: "demander + [qqch]",            vi: "hỏi / yêu cầu cái gì" },
        { fr: "demander à qqn de + V",        vi: "nhờ ai làm gì" },
        { fr: "demander si / comment...",     vi: "hỏi gián tiếp" },
      ],
      particles: [
        { fr: "à (personne) / de (action)", vi: "demander à Marie de venir" },
      ],
      idioms: [
        { fr: "Je vous demande de répéter.", vi: "Tôi nhờ bạn nhắc lại." },
      ],
    },
  },

  // ─── U1 : Qui suis-je ? ───────────────────────────────────────────────────
  u1: {
    "être": {
      collocations: [
        { fr: "être célibataire / marié(e)",    vi: "độc thân / đã kết hôn" },
        { fr: "être journaliste",               vi: "là nhà báo" },
        { fr: "être d'origine + [nationalité]", vi: "có gốc ..." },
        { fr: "être passionné(e) de",           vi: "đam mê cái gì" },
      ],
      structures: [
        { fr: "Je suis + [profession]",      vi: "không dùng mạo từ trước nghề nghiệp" },
        { fr: "être + adj (nationalité)",    vi: "Il est espagnol. Elle est espagnole." },
      ],
      particles: [
        { fr: "de (origine)", vi: "être de Lyon = đến từ Lyon" },
      ],
      idioms: [
        { fr: "C'est qui ?", vi: "Đó là ai?" },
        { fr: "Qui es-tu ?", vi: "Bạn là ai?" },
      ],
    },
    "avoir": {
      collocations: [
        { fr: "avoir ... ans",         vi: "... tuổi" },
        { fr: "avoir une passion",     vi: "có niềm đam mê" },
        { fr: "avoir un blog",         vi: "có một blog" },
        { fr: "avoir de l'expérience", vi: "có kinh nghiệm" },
      ],
      structures: [
        { fr: "avoir + [nombre] ans",   vi: "J'ai 25 ans. (không dùng être)" },
        { fr: "avoir envie de + V",     vi: "muốn: avoir envie de voyager" },
      ],
      particles: [
        { fr: "de + V (envie, besoin...)", vi: "avoir envie de / besoin de + infinitif" },
      ],
      idioms: [
        { fr: "Quel âge avez-vous ?", vi: "Bạn bao nhiêu tuổi?" },
      ],
    },
    "s'appeler": {
      collocations: [
        { fr: "s'appeler de son prénom", vi: "được gọi bằng tên" },
        { fr: "se faire appeler",        vi: "tự xưng / được gọi là" },
      ],
      structures: [
        { fr: "Je m'appelle + [prénom/nom]",  vi: "giới thiệu tên đầy đủ" },
        { fr: "Comment s'appelle-t-il ?",     vi: "Anh ấy tên là gì?" },
      ],
      particles: [
        { fr: "verbe pronominal", vi: "me/te/s'/nous/vous/s'" },
      ],
      idioms: [],
    },
    "aimer": {
      collocations: [
        { fr: "aimer la musique",      vi: "thích âm nhạc" },
        { fr: "aimer voyager",         vi: "thích đi du lịch" },
        { fr: "aimer beaucoup / bien", vi: "thích nhiều / thích vừa" },
        { fr: "ne pas aimer du tout",  vi: "không thích chút nào" },
      ],
      structures: [
        { fr: "aimer + [nom avec article]", vi: "aimer la musique / le sport" },
        { fr: "aimer + V (infinitif)",      vi: "aimer voyager / aimer lire" },
        { fr: "aimer mieux",                vi: "thích hơn: J'aime mieux le thé." },
      ],
      particles: [
        { fr: "pas de giới từ trước V", vi: "aimer + infinitif trực tiếp (không 'de')" },
      ],
      idioms: [
        { fr: "J'aime bien !",  vi: "Tôi thích đấy! (không quá mạnh)" },
        { fr: "Tu aimes ça ?",  vi: "Bạn thích cái đó không?" },
      ],
    },
    "adorer": {
      collocations: [
        { fr: "adorer la cuisine",  vi: "rất yêu thích ẩm thực" },
        { fr: "adorer danser",      vi: "rất thích nhảy" },
        { fr: "adorer les films",   vi: "rất mê phim" },
      ],
      structures: [
        { fr: "adorer + [nom]",         vi: "adorer le chocolat" },
        { fr: "adorer + V (infinitif)", vi: "adorer voyager" },
      ],
      particles: [
        { fr: "pas de giới từ", vi: "adorer + infinitif trực tiếp" },
      ],
      idioms: [
        { fr: "J'adore !", vi: "Tôi rất thích! (mạnh hơn aimer bien)" },
      ],
    },
    "détester": {
      collocations: [
        { fr: "détester le sport",     vi: "ghét thể thao" },
        { fr: "détester se lever tôt", vi: "ghét dậy sớm" },
        { fr: "détester les épinards", vi: "ghét rau bina" },
      ],
      structures: [
        { fr: "détester + [nom]",         vi: "ghét cái gì" },
        { fr: "détester + V (infinitif)", vi: "ghét làm gì" },
      ],
      particles: [
        { fr: "pas de giới từ", vi: "détester + infinitif trực tiếp" },
      ],
      idioms: [
        { fr: "Je déteste ça !", vi: "Tôi ghét cái đó!" },
      ],
    },
    "travailler": {
      collocations: [
        { fr: "travailler dans une école",   vi: "làm việc ở trường" },
        { fr: "travailler comme + [métier]", vi: "làm nghề: travailler comme cuisinier" },
        { fr: "travailler à temps plein",    vi: "làm toàn thời gian" },
        { fr: "travailler en équipe",        vi: "làm việc theo nhóm" },
      ],
      structures: [
        { fr: "travailler dans + [lieu]",    vi: "làm việc tại địa điểm" },
        { fr: "travailler comme + [métier]", vi: "làm với tư cách nghề nghiệp" },
      ],
      particles: [
        { fr: "dans (lieu) / comme (rôle) / en (mode)", vi: "ba giới từ thông dụng nhất" },
      ],
      idioms: [
        { fr: "Où est-ce que tu travailles ?", vi: "Bạn làm việc ở đâu?" },
      ],
    },
    "venir": {
      collocations: [
        { fr: "venir de France",    vi: "đến từ Pháp" },
        { fr: "venir de + V",       vi: "vừa mới làm gì (passé récent)" },
        { fr: "venir à la réunion", vi: "đến dự cuộc họp" },
        { fr: "venir avec qqn",     vi: "đến cùng với ai" },
      ],
      structures: [
        { fr: "venir de + [pays/ville]",  vi: "xuất xứ: Je viens du Japon" },
        { fr: "venir de + V (infinitif)", vi: "passé récent: Je viens de manger" },
      ],
      particles: [
        { fr: "de (origine ou passé récent)", vi: "venir de Paris / venir de partir" },
      ],
      idioms: [
        { fr: "D'où tu viens ?",       vi: "Bạn đến từ đâu?" },
        { fr: "Je viens de terminer.", vi: "Tôi vừa xong." },
      ],
    },
    "étudier": {
      collocations: [
        { fr: "étudier le français",     vi: "học tiếng Pháp" },
        { fr: "étudier à l'université",  vi: "học ở trường đại học" },
        { fr: "étudier la médecine",     vi: "học y khoa" },
        { fr: "étudier pour + [but]",    vi: "học để: étudier pour le bac" },
      ],
      structures: [
        { fr: "étudier + [matière]",       vi: "học môn gì (trực tiếp)" },
        { fr: "étudier à + [université]",  vi: "étudier à Paris 3" },
      ],
      particles: [
        { fr: "à (lieu) / pour (but)", vi: "étudier à Lyon / pour l'examen" },
      ],
      idioms: [],
    },
    "vivre": {
      collocations: [
        { fr: "vivre à Paris",       vi: "sống ở Paris" },
        { fr: "vivre en famille",    vi: "sống cùng gia đình" },
        { fr: "vivre seul(e)",       vi: "sống một mình" },
        { fr: "vivre de + [métier]", vi: "sống bằng nghề: vivre de sa musique" },
      ],
      structures: [
        { fr: "vivre à / en / au + [lieu]", vi: "giống habiter nhưng nhấn hơn về lối sống" },
        { fr: "vivre de + [source]",        vi: "sống bằng: vivre de son art" },
      ],
      particles: [
        { fr: "à / en / au (lieu) / de (source)", vi: "bốn giới từ thông dụng nhất" },
      ],
      idioms: [
        { fr: "Vive la France !", vi: "Muôn năm nước Pháp! (cảm thán)" },
      ],
    },
    "faire": {
      collocations: [
        { fr: "faire du sport",       vi: "chơi thể thao" },
        { fr: "faire de la musique",  vi: "chơi nhạc" },
        { fr: "faire du vélo",        vi: "đạp xe" },
        { fr: "faire de la natation", vi: "bơi lội" },
      ],
      structures: [
        { fr: "faire du/de la/de l' + [activité]", vi: "chơi / tập môn gì" },
        { fr: "faire + [qqch direct]",             vi: "faire un voyage / faire la cuisine" },
      ],
      particles: [
        { fr: "du / de la / de l'", vi: "thay đổi theo giới tính và nguyên âm của danh từ" },
      ],
      idioms: [
        { fr: "Qu'est-ce que tu fais ?", vi: "Bạn làm gì?" },
        { fr: "Ça fait combien ?",       vi: "Bao nhiêu tiền?" },
      ],
    },
    "jouer": {
      collocations: [
        { fr: "jouer au football",   vi: "chơi bóng đá" },
        { fr: "jouer de la guitare", vi: "chơi đàn guitar" },
        { fr: "jouer aux cartes",    vi: "chơi bài" },
        { fr: "jouer avec qqn",      vi: "chơi cùng ai" },
      ],
      structures: [
        { fr: "jouer à + [sport/jeu]",    vi: "chơi thể thao / trò chơi: jouer au tennis" },
        { fr: "jouer de + [instrument]",  vi: "chơi nhạc cụ: jouer du piano" },
      ],
      particles: [
        { fr: "à (sport) vs de (instrument)", vi: "jouer au foot / jouer de la flûte" },
      ],
      idioms: [
        { fr: "À toi de jouer !", vi: "Đến lượt bạn rồi!" },
      ],
    },
    "regarder": {
      collocations: [
        { fr: "regarder la télévision",  vi: "xem truyền hình" },
        { fr: "regarder un film",        vi: "xem phim" },
        { fr: "regarder des photos",     vi: "xem ảnh" },
        { fr: "regarder par la fenêtre", vi: "nhìn qua cửa sổ" },
      ],
      structures: [
        { fr: "regarder + [qqch]", vi: "xem / nhìn (chủ động, không giới từ)" },
      ],
      particles: [
        { fr: "pas de giới từ", vi: "regarder la télé (trực tiếp)" },
      ],
      idioms: [
        { fr: "On regarde un film ce soir ?", vi: "Tối nay mình xem phim nhé?" },
      ],
    },
    "partir": {
      collocations: [
        { fr: "partir en voyage",    vi: "đi du lịch" },
        { fr: "partir à l'étranger", vi: "đi nước ngoài" },
        { fr: "partir tôt / tard",   vi: "đi sớm / muộn" },
        { fr: "partir en vacances",  vi: "đi nghỉ" },
      ],
      structures: [
        { fr: "partir en + [pays/région fém]", vi: "partir en Espagne" },
        { fr: "partir au + [pays masc]",       vi: "partir au Japon" },
        { fr: "partir à + [ville]",            vi: "partir à Lyon" },
      ],
      particles: [
        { fr: "en / au / à selon le lieu", vi: "giới từ thay đổi theo loại địa danh" },
      ],
      idioms: [
        { fr: "Je dois partir.", vi: "Tôi phải đi rồi." },
        { fr: "Bon voyage !",    vi: "Chúc đi vui!" },
      ],
    },
    "habiter": {
      collocations: [
        { fr: "habiter en banlieue",  vi: "sống ở ngoại ô" },
        { fr: "habiter dans le nord", vi: "sống ở miền Bắc" },
        { fr: "habiter seul(e)",      vi: "sống một mình" },
        { fr: "habiter loin de",      vi: "sống xa: habiter loin du centre" },
      ],
      structures: [
        { fr: "habiter à / en / au + [lieu]", vi: "habiter à Bordeaux / en Bretagne" },
        { fr: "habiter + [numéro, rue]",      vi: "J'habite 12, rue de la Paix." },
      ],
      particles: [
        { fr: "à / en / au / aux selon lieu", vi: "règle giống venir de / aller à" },
      ],
      idioms: [],
    },
  },

  // ─── U2 : Ma ville ───────────────────────────────────────────────────────
  u2: {
    "habiter": {
      collocations: [
        { fr: "habiter en centre-ville",   vi: "sống ở trung tâm thành phố" },
        { fr: "habiter dans un quartier",  vi: "sống trong một khu phố" },
        { fr: "habiter près de",           vi: "sống gần: habiter près de la gare" },
        { fr: "habiter loin de",           vi: "sống xa: habiter loin du centre" },
      ],
      structures: [
        { fr: "habiter dans + [quartier/rue]", vi: "habiter dans le quartier latin" },
        { fr: "habiter à + [ville]",           vi: "habiter à Marseille" },
      ],
      particles: [
        { fr: "dans (quartier) / à (ville) / en (région)", vi: "ba giới từ khác nhau" },
      ],
      idioms: [],
    },
    "aimer": {
      collocations: [
        { fr: "aimer ma ville",         vi: "yêu thành phố của tôi" },
        { fr: "aimer le calme",         vi: "thích sự yên tĩnh" },
        { fr: "aimer les monuments",    vi: "thích các công trình" },
        { fr: "aimer se promener dans", vi: "thích dạo bộ trong" },
      ],
      structures: [
        { fr: "aimer + [nom]",         vi: "aimer les parcs (mạo từ défini)" },
        { fr: "aimer + V (infinitif)", vi: "aimer se promener" },
      ],
      particles: [
        { fr: "se promener dans + lieu", vi: "aimer se promener dans le parc" },
      ],
      idioms: [],
    },
    "préférer": {
      collocations: [
        { fr: "préférer la ville",    vi: "thích thành phố hơn" },
        { fr: "préférer la campagne", vi: "thích vùng quê hơn" },
        { fr: "préférer vivre à",     vi: "thích sống ở ... hơn" },
      ],
      structures: [
        { fr: "préférer + [nom]",           vi: "préférer la mer à la montagne" },
        { fr: "préférer + V (infinitif)",   vi: "préférer rester à la maison" },
        { fr: "préférer A à B",             vi: "thích A hơn B" },
      ],
      particles: [
        { fr: "à (comparaison)", vi: "préférer le café au thé = thích cà phê hơn trà" },
      ],
      idioms: [
        { fr: "Je préfère mille fois ...", vi: "Tôi thích hơn cả nghìn lần ..." },
      ],
    },
    "détester": {
      collocations: [
        { fr: "détester le bruit",          vi: "ghét tiếng ồn" },
        { fr: "détester les embouteillages", vi: "ghét tắc đường" },
        { fr: "détester la pollution",      vi: "ghét ô nhiễm" },
      ],
      structures: [
        { fr: "détester + [nom]",         vi: "ghét cái gì" },
        { fr: "détester + V infinitif",   vi: "ghét làm gì" },
      ],
      particles: [
        { fr: "pas de giới từ", vi: "trực tiếp trước danh từ hoặc động từ" },
      ],
      idioms: [],
    },
    "adorer": {
      collocations: [
        { fr: "adorer cette ville",   vi: "rất mê thành phố này" },
        { fr: "adorer les terrasses", vi: "rất thích ngồi sân thượng/vỉa hè" },
        { fr: "adorer le marché",     vi: "rất thích chợ" },
      ],
      structures: [
        { fr: "adorer + [nom]",         vi: "adorer les musées" },
        { fr: "adorer + V infinitif",   vi: "adorer se balader" },
      ],
      particles: [],
      idioms: [],
    },
    "connaître": {
      collocations: [
        { fr: "connaître une ville",          vi: "biết / quen thuộc với thành phố" },
        { fr: "connaître bien le quartier",   vi: "biết rõ khu phố" },
        { fr: "connaître qqn",                vi: "biết / quen ai" },
        { fr: "se faire connaître",           vi: "tự giới thiệu bản thân" },
      ],
      structures: [
        { fr: "connaître + [qqn/qqch]", vi: "biết ai/cái gì (qua kinh nghiệm)" },
      ],
      particles: [
        { fr: "pas de giới từ", vi: "connaître qqn/qqch trực tiếp" },
      ],
      idioms: [
        { fr: "Tu connais Paris ?",       vi: "Bạn có biết Paris không?" },
        { fr: "Je connais bien ce coin.", vi: "Tôi biết khu này rõ lắm." },
      ],
    },
    "trouver": {
      collocations: [
        { fr: "trouver un appartement",  vi: "tìm được căn hộ" },
        { fr: "trouver la ville belle",  vi: "thấy thành phố đẹp" },
        { fr: "trouver que + phrase",    vi: "cho rằng: Je trouve que c'est super." },
        { fr: "trouver son chemin",      vi: "tìm đường" },
      ],
      structures: [
        { fr: "trouver + [qqch]",              vi: "tìm thấy cái gì" },
        { fr: "trouver + [qqch] + adj",        vi: "thấy cái gì như thế nào: trouver ça sympa" },
        { fr: "trouver que + [subordonnée]",   vi: "cho rằng: trouver que c'est bien" },
      ],
      particles: [
        { fr: "que + phrase", vi: "trouver que = donner un avis" },
      ],
      idioms: [
        { fr: "Je trouve que c'est une belle ville.", vi: "Tôi thấy đây là thành phố đẹp." },
      ],
    },
    "avoir": {
      collocations: [
        { fr: "avoir un musée",           vi: "có bảo tàng" },
        { fr: "avoir de beaux parcs",     vi: "có những công viên đẹp" },
        { fr: "il y a beaucoup de ...",   vi: "có nhiều ..." },
        { fr: "avoir une bonne ambiance", vi: "có không khí tốt" },
      ],
      structures: [
        { fr: "Il y a + [nom]",          vi: "có (tồn tại): Il y a un parc" },
        { fr: "Il n'y a pas de + [nom]", vi: "không có: Il n'y a pas de métro" },
      ],
      particles: [
        { fr: "Il y a (invariable)", vi: "Il y a des cafés (không đổi theo số)" },
      ],
      idioms: [
        { fr: "Il y a du monde.", vi: "Có nhiều người." },
      ],
    },
    "être": {
      collocations: [
        { fr: "être une grande ville",  vi: "là thành phố lớn" },
        { fr: "être situé(e) à",        vi: "được đặt tại" },
        { fr: "être connu(e) pour",     vi: "nổi tiếng vì" },
        { fr: "être animé(e)",          vi: "nhộn nhịp, sôi động" },
      ],
      structures: [
        { fr: "C'est une ville + adj",   vi: "C'est une ville magnifique." },
        { fr: "être situé(e) à + ville", vi: "La ville est située à 50 km de Paris." },
      ],
      particles: [
        { fr: "pour (raison) / à (lieu)", vi: "être connu pour / être situé à" },
      ],
      idioms: [],
    },
    "présenter": {
      collocations: [
        { fr: "présenter sa ville",  vi: "giới thiệu thành phố của mình" },
        { fr: "présenter qqn",       vi: "giới thiệu ai" },
        { fr: "se présenter",        vi: "tự giới thiệu bản thân" },
        { fr: "présenter un projet", vi: "trình bày dự án" },
      ],
      structures: [
        { fr: "présenter + [qqch/qqn]", vi: "giới thiệu cái gì/ai" },
        { fr: "se présenter",           vi: "Je me présente, je suis..." },
      ],
      particles: [
        { fr: "pas de giới từ / se (pronominal)", vi: "présenter qqn vs se présenter" },
      ],
      idioms: [
        { fr: "Je me présente : je suis ...", vi: "Cho tôi tự giới thiệu: tôi là ..." },
      ],
    },
    "utiliser": {
      collocations: [
        { fr: "utiliser les transports",  vi: "sử dụng phương tiện giao thông" },
        { fr: "utiliser une application", vi: "dùng ứng dụng" },
        { fr: "utiliser le vélo",         vi: "đi xe đạp" },
        { fr: "utiliser Internet",        vi: "dùng internet" },
      ],
      structures: [
        { fr: "utiliser + [qqch]",   vi: "sử dụng cái gì (trực tiếp)" },
        { fr: "utiliser pour + V",   vi: "dùng để: utiliser pour communiquer" },
      ],
      particles: [
        { fr: "pour + V (but)", vi: "utiliser un dictionnaire pour comprendre" },
      ],
      idioms: [],
    },
    "se trouver": {
      collocations: [
        { fr: "se trouver au nord de",     vi: "ở phía bắc của" },
        { fr: "se trouver dans le centre", vi: "nằm ở trung tâm" },
        { fr: "se trouver à + distance",   vi: "cách: se trouver à 10 km de Paris" },
        { fr: "se trouver en face de",     vi: "ở đối diện với" },
      ],
      structures: [
        { fr: "se trouver + [préposition + lieu]", vi: "La gare se trouve à droite." },
      ],
      particles: [
        { fr: "à / dans / en / au / sur theo vị trí", vi: "nhiều giới từ tùy ngữ cảnh" },
      ],
      idioms: [
        { fr: "Où se trouve la mairie ?", vi: "Tòa thị chính ở đâu?" },
      ],
    },
    "choisir": {
      collocations: [
        { fr: "choisir une ville",    vi: "chọn thành phố" },
        { fr: "choisir son quartier", vi: "chọn khu phố" },
        { fr: "choisir entre A et B", vi: "chọn giữa A và B" },
        { fr: "choisir de vivre à",   vi: "chọn sống ở" },
      ],
      structures: [
        { fr: "choisir + [qqch]",     vi: "chọn cái gì (trực tiếp)" },
        { fr: "choisir de + V",       vi: "chọn để làm gì" },
        { fr: "choisir entre A et B", vi: "chọn giữa" },
      ],
      particles: [
        { fr: "de + V / entre + A et B", vi: "hai cấu trúc phổ biến" },
      ],
      idioms: [],
    },
    "rencontrer": {
      collocations: [
        { fr: "rencontrer des gens",      vi: "gặp gỡ mọi người" },
        { fr: "rencontrer un ami",        vi: "gặp bạn" },
        { fr: "se rencontrer",            vi: "gặp nhau (hai phía)" },
        { fr: "rencontrer des problèmes", vi: "gặp phải vấn đề" },
      ],
      structures: [
        { fr: "rencontrer + [qqn]",  vi: "gặp ai (chủ động)" },
        { fr: "se rencontrer",       vi: "Nous nous sommes rencontrés à Paris." },
      ],
      particles: [
        { fr: "pas de giới từ / se (réciproque)", vi: "rencontrer qqn vs se rencontrer" },
      ],
      idioms: [
        { fr: "Enchanté(e) de vous rencontrer !", vi: "Rất vui được gặp bạn!" },
      ],
    },
    "aller": {
      collocations: [
        { fr: "aller au marché",        vi: "đi chợ" },
        { fr: "aller au musée",         vi: "đi bảo tàng" },
        { fr: "aller en ville",         vi: "ra trung tâm thành phố" },
        { fr: "aller à pied / en vélo", vi: "đi bộ / đi xe đạp" },
      ],
      structures: [
        { fr: "aller au / à la / à l' + [lieu]",      vi: "aller au cinéma / à la piscine" },
        { fr: "aller en + [transport]",               vi: "aller en bus / en métro" },
        { fr: "aller + V (infinitif) = futur proche", vi: "Je vais visiter le musée." },
      ],
      particles: [
        { fr: "au/à la/à l' (lieu) / en (transport)", vi: "hai loại giới từ thông dụng nhất" },
      ],
      idioms: [
        { fr: "Ça va ?",   vi: "Bạn khỏe không?" },
        { fr: "On y va !", vi: "Đi thôi!" },
      ],
    },
  },

  // ─── U3 : On mange ! ────────────────────────────────────────────────────
  u3: {
    "vouloir": {
      collocations: [
        { fr: "vouloir un café",   vi: "muốn một tách cà phê" },
        { fr: "vouloir commander", vi: "muốn gọi món" },
        { fr: "vouloir bien",      vi: "sẵn lòng: Je veux bien." },
        { fr: "en vouloir à qqn",  vi: "giận ai" },
      ],
      structures: [
        { fr: "vouloir + [nom]",         vi: "muốn cái gì: Je veux un steak." },
        { fr: "vouloir + V (infinitif)", vi: "muốn làm gì: Je veux commander." },
        { fr: "vouloir bien + V",        vi: "sẵn lòng: Je veux bien essayer." },
      ],
      particles: [
        { fr: "bien (accord poli)", vi: "vouloir bien = đồng ý một cách lịch sự" },
      ],
      idioms: [
        { fr: "Je voudrais ...", vi: "Tôi muốn ... (lịch sự, conditionnel)" },
        { fr: "Tu veux quoi ?",  vi: "Bạn muốn gì?" },
      ],
    },
    "prendre": {
      collocations: [
        { fr: "prendre un café",          vi: "uống cà phê (gọi món)" },
        { fr: "prendre le petit-déjeuner", vi: "ăn sáng" },
        { fr: "prendre une entrée",        vi: "gọi món khai vị" },
        { fr: "prendre le menu",           vi: "chọn menu cố định" },
      ],
      structures: [
        { fr: "prendre + [plat/boisson]",    vi: "Je prends le plat du jour." },
        { fr: "Qu'est-ce que vous prenez ?", vi: "Bạn dùng gì? (câu nhà hàng)" },
      ],
      particles: [
        { fr: "pas de giới từ", vi: "prendre le menu trực tiếp" },
      ],
      idioms: [
        { fr: "Je prends la même chose.", vi: "Tôi lấy cái giống vậy." },
        { fr: "Qu'est-ce que tu prends ?", vi: "Bạn gọi gì?" },
      ],
    },
    "manger": {
      collocations: [
        { fr: "manger au restaurant", vi: "ăn ở nhà hàng" },
        { fr: "manger une pizza",     vi: "ăn pizza" },
        { fr: "manger équilibré",     vi: "ăn cân bằng dinh dưỡng" },
        { fr: "manger sur le pouce",  vi: "ăn nhanh / ăn vội" },
      ],
      structures: [
        { fr: "manger + du/de la/de l' + [aliment]", vi: "manger du pain / de la viande" },
        { fr: "manger au / dans un [lieu]",          vi: "manger au bistrot / dans un café" },
      ],
      particles: [
        { fr: "du / de la / de l' / des (partitif)", vi: "manger de la pizza / du riz" },
      ],
      idioms: [
        { fr: "Bon appétit !",       vi: "Chúc ngon miệng!" },
        { fr: "manger sur le pouce", vi: "ăn vội vàng" },
      ],
    },
    "boire": {
      collocations: [
        { fr: "boire de l'eau",      vi: "uống nước" },
        { fr: "boire un verre",      vi: "uống một ly" },
        { fr: "boire du vin",        vi: "uống rượu vang" },
        { fr: "boire à la santé de", vi: "nâng ly vì sức khỏe của" },
      ],
      structures: [
        { fr: "boire + du/de la/de l' + [boisson]", vi: "boire du café / de l'eau" },
        { fr: "boire à + [santé/occasion]",         vi: "boire à ta santé !" },
      ],
      particles: [
        { fr: "du / de la / de l' (partitif)", vi: "boire du jus / de l'eau minérale" },
      ],
      idioms: [
        { fr: "À ta santé !",  vi: "Chúc sức khỏe!" },
        { fr: "boire un coup", vi: "đi uống một ly (thân mật)" },
      ],
    },
    "acheter": {
      collocations: [
        { fr: "acheter des légumes",  vi: "mua rau củ" },
        { fr: "acheter au marché",    vi: "mua ở chợ" },
        { fr: "acheter à qqn",        vi: "mua từ ai" },
        { fr: "acheter en ligne",     vi: "mua trực tuyến" },
      ],
      structures: [
        { fr: "acheter + [qqch]",         vi: "mua cái gì" },
        { fr: "acheter qqch à qqn",       vi: "mua gì từ ai: acheter du pain à la boulangère" },
        { fr: "acheter pour + [montant]", vi: "mua với số tiền: acheter pour 10 euros" },
      ],
      particles: [
        { fr: "à (vendeur) / pour (prix)", vi: "acheter à qqn / pour X euros" },
      ],
      idioms: [],
    },
    "coûter": {
      collocations: [
        { fr: "coûter 5 euros",     vi: "giá 5 euro" },
        { fr: "coûter cher",        vi: "đắt tiền" },
        { fr: "coûter moins cher",  vi: "rẻ hơn" },
        { fr: "combien ça coûte ?", vi: "bao nhiêu tiền?" },
      ],
      structures: [
        { fr: "coûter + [prix]",          vi: "Ça coûte 3 euros." },
        { fr: "coûter + cher/moins cher", vi: "đắt hơn / rẻ hơn" },
      ],
      particles: [
        { fr: "pas de giới từ", vi: "coûter + prix trực tiếp" },
      ],
      idioms: [
        { fr: "Ça coûte combien ?", vi: "Cái này bao nhiêu tiền?" },
        { fr: "C'est donné !",      vi: "Rẻ như cho không!" },
      ],
    },
    "faire": {
      collocations: [
        { fr: "faire les courses",  vi: "đi mua sắm thực phẩm" },
        { fr: "faire la cuisine",   vi: "nấu ăn" },
        { fr: "faire un régime",    vi: "ăn kiêng" },
        { fr: "faire la vaisselle", vi: "rửa bát" },
      ],
      structures: [
        { fr: "faire les courses",          vi: "đi chợ / siêu thị (cố định)" },
        { fr: "faire + [recette / repas]",  vi: "faire une tarte / faire le dîner" },
      ],
      particles: [
        { fr: "la / les / un (tùy cụm)", vi: "faire la cuisine / faire les courses / faire un gâteau" },
      ],
      idioms: [
        { fr: "faire la fête",     vi: "tổ chức tiệc / ăn mừng" },
        { fr: "Ça fait combien ?", vi: "Tổng cộng bao nhiêu?" },
      ],
    },
    "choisir": {
      collocations: [
        { fr: "choisir un plat",      vi: "chọn món ăn" },
        { fr: "choisir le menu",      vi: "chọn menu cố định" },
        { fr: "choisir entre A et B", vi: "chọn giữa hai món" },
        { fr: "choisir un vin",       vi: "chọn rượu" },
      ],
      structures: [
        { fr: "choisir + [qqch]",     vi: "chọn cái gì" },
        { fr: "choisir de + V",       vi: "chọn làm gì" },
        { fr: "choisir entre A et B", vi: "chọn giữa hai lựa chọn" },
      ],
      particles: [
        { fr: "de + V / entre A et B", vi: "hai cấu trúc phổ biến nhất" },
      ],
      idioms: [
        { fr: "Vous avez choisi ?", vi: "Bạn đã chọn chưa? (câu nhà hàng)" },
      ],
    },
    "payer": {
      collocations: [
        { fr: "payer l'addition",  vi: "trả hóa đơn" },
        { fr: "payer en espèces",  vi: "trả tiền mặt" },
        { fr: "payer par carte",   vi: "trả bằng thẻ" },
        { fr: "payer cher",        vi: "trả nhiều tiền / đắt" },
      ],
      structures: [
        { fr: "payer + [qqch]",     vi: "thanh toán cái gì" },
        { fr: "payer en + [mode]",  vi: "payer en espèces" },
        { fr: "payer par + [carte]", vi: "payer par carte" },
      ],
      particles: [
        { fr: "en (espèces) / par (carte)", vi: "payer en espèces / payer par chèque" },
      ],
      idioms: [
        { fr: "C'est moi qui paie !",      vi: "Để tôi trả!" },
        { fr: "On fait moitié-moitié ?",   vi: "Mình chia đôi nhé?" },
      ],
    },
    "vendre": {
      collocations: [
        { fr: "vendre des fruits",      vi: "bán hoa quả" },
        { fr: "vendre au marché",       vi: "bán ở chợ" },
        { fr: "vendre à qqn",           vi: "bán cho ai" },
        { fr: "vendre 3 euros le kilo", vi: "bán 3 euro một kg" },
      ],
      structures: [
        { fr: "vendre + [qqch] à qqn", vi: "bán cái gì cho ai" },
        { fr: "vendre à + [prix]",     vi: "bán với giá" },
      ],
      particles: [
        { fr: "à (destinataire ou prix)", vi: "vendre à Marie / vendre à 5 euros" },
      ],
      idioms: [],
    },
    "préparer": {
      collocations: [
        { fr: "préparer un plat",    vi: "chuẩn bị một món ăn" },
        { fr: "préparer la recette", vi: "chuẩn bị công thức" },
        { fr: "préparer le repas",   vi: "chuẩn bị bữa ăn" },
        { fr: "préparer à l'avance", vi: "chuẩn bị trước" },
      ],
      structures: [
        { fr: "préparer + [qqch]",       vi: "chuẩn bị cái gì" },
        { fr: "préparer qqch pour qqn",  vi: "chuẩn bị cho ai" },
      ],
      particles: [
        { fr: "pour (destinataire / but)", vi: "préparer un gâteau pour Marie" },
      ],
      idioms: [],
    },
    "commander": {
      collocations: [
        { fr: "commander un plat",    vi: "gọi một món ăn" },
        { fr: "commander en ligne",   vi: "đặt hàng trực tuyến" },
        { fr: "commander à boire",    vi: "gọi đồ uống" },
        { fr: "commander chez + qqn", vi: "đặt hàng từ: commander chez le traiteur" },
      ],
      structures: [
        { fr: "commander + [qqch]",        vi: "gọi / đặt cái gì" },
        { fr: "commander pour + [nombre]", vi: "commander pour 4 personnes" },
      ],
      particles: [
        { fr: "pour (nombre de personnes)", vi: "commander pour 2 personnes" },
      ],
      idioms: [
        { fr: "Vous êtes prêts à commander ?", vi: "Các bạn sẵn sàng gọi món chưa?" },
      ],
    },
    "goûter": {
      collocations: [
        { fr: "goûter un plat",         vi: "nếm thử một món" },
        { fr: "goûter le fromage",      vi: "thử phô mai" },
        { fr: "faire goûter à qqn",     vi: "cho ai nếm thử" },
        { fr: "goûter avant d'acheter", vi: "nếm trước khi mua" },
      ],
      structures: [
        { fr: "goûter + [qqch]",     vi: "nếm cái gì (trực tiếp)" },
        { fr: "goûter à + [qqch]",   vi: "nếm thử: goûter à la tarte" },
      ],
      particles: [
        { fr: "à (essayer un peu) / sans prép (manger)", vi: "goûter à qqch vs goûter qqch" },
      ],
      idioms: [
        { fr: "Goûtez, c'est délicieux !", vi: "Nếm thử đi, ngon lắm!" },
      ],
    },
    "peser": {
      collocations: [
        { fr: "peser 200 grammes",     vi: "nặng 200 gram" },
        { fr: "peser les ingrédients", vi: "cân nguyên liệu" },
        { fr: "se peser",              vi: "tự cân nặng" },
      ],
      structures: [
        { fr: "peser + [qqch]",    vi: "cân cái gì" },
        { fr: "peser + [quantité]", vi: "ça pèse 500g" },
      ],
      particles: [
        { fr: "pas de giới từ", vi: "peser qqch trực tiếp" },
      ],
      idioms: [],
    },
    "avoir": {
      collocations: [
        { fr: "avoir faim",           vi: "đói bụng" },
        { fr: "avoir soif",           vi: "khát nước" },
        { fr: "avoir envie de manger", vi: "muốn ăn cái gì đó" },
        { fr: "avoir bon goût",       vi: "có khiếu thẩm mỹ / ngon" },
      ],
      structures: [
        { fr: "avoir faim / soif",            vi: "đói / khát (không dùng être)" },
        { fr: "avoir envie de + [aliment/V]", vi: "avoir envie d'une pizza" },
      ],
      particles: [
        { fr: "de + V ou de + nom après avoir envie", vi: "avoir envie de manger / de chocolat" },
      ],
      idioms: [
        { fr: "J'ai faim !",     vi: "Tôi đói!" },
        { fr: "J'ai très soif.", vi: "Tôi rất khát." },
      ],
    },
  },

  // ─── U4 : En route ! ─────────────────────────────────────────────────────
  u4: {
    "aller": {
      collocations: [
        { fr: "aller tout droit",      vi: "đi thẳng" },
        { fr: "aller à gauche/droite", vi: "rẽ trái/phải" },
        { fr: "aller jusqu'à",         vi: "đi tới: aller jusqu'à la place" },
        { fr: "aller à pied",          vi: "đi bộ" },
      ],
      structures: [
        { fr: "aller + [direction]",         vi: "aller tout droit / à gauche" },
        { fr: "aller jusqu'à + [lieu]",      vi: "đi đến tận: aller jusqu'à la gare" },
        { fr: "aller en + [transport]",      vi: "aller en bus / en taxi" },
      ],
      particles: [
        { fr: "jusqu'à (destination) / en (transport)", vi: "aller jusqu'à l'arrêt / en vélo" },
      ],
      idioms: [
        { fr: "Allez tout droit !", vi: "Đi thẳng!" },
        { fr: "On y va !",          vi: "Đi thôi!" },
      ],
    },
    "venir": {
      collocations: [
        { fr: "venir par ici",      vi: "đến đây" },
        { fr: "venir de + lieu",    vi: "đến từ nơi nào" },
        { fr: "venir en bus",       vi: "đến bằng xe buýt" },
        { fr: "venir chercher qqn", vi: "đến đón ai" },
      ],
      structures: [
        { fr: "venir de + [lieu]",        vi: "venir de la gare" },
        { fr: "venir en + [transport]",   vi: "venir en voiture" },
        { fr: "venir chercher + [qqn]",   vi: "đến đón: venir chercher Marie" },
      ],
      particles: [
        { fr: "de (provenance) / en (transport)", vi: "venir de la rue / venir en taxi" },
      ],
      idioms: [],
    },
    "tourner": {
      collocations: [
        { fr: "tourner à gauche",    vi: "rẽ trái" },
        { fr: "tourner à droite",    vi: "rẽ phải" },
        { fr: "tourner au coin de",  vi: "rẽ tại góc phố" },
        { fr: "tourner dans la rue", vi: "rẽ vào con đường" },
      ],
      structures: [
        { fr: "tourner à gauche/droite",      vi: "lệnh chỉ đường cơ bản" },
        { fr: "tourner au coin de + [rue]",   vi: "tourner au coin de la rue Lepic" },
      ],
      particles: [
        { fr: "à (gauche/droite) / au coin de", vi: "tourner à droite / au coin" },
      ],
      idioms: [
        { fr: "Tournez à droite au feu !", vi: "Rẽ phải tại đèn đỏ!" },
      ],
    },
    "continuer": {
      collocations: [
        { fr: "continuer tout droit",    vi: "tiếp tục đi thẳng" },
        { fr: "continuer sur + [rue]",   vi: "continuer sur l'avenue" },
        { fr: "continuer jusqu'à",       vi: "continuer jusqu'au rond-point" },
        { fr: "continuer à + V",         vi: "tiếp tục làm gì" },
      ],
      structures: [
        { fr: "continuer + [direction]",      vi: "continuer tout droit / à gauche" },
        { fr: "continuer à + V",              vi: "tiếp tục: continuer à marcher" },
        { fr: "continuer jusqu'à + [lieu]",   vi: "continuer jusqu'à la place" },
      ],
      particles: [
        { fr: "à + V / jusqu'à + lieu", vi: "continuer à marcher / jusqu'à la pharmacie" },
      ],
      idioms: [],
    },
    "traverser": {
      collocations: [
        { fr: "traverser la rue",          vi: "qua đường" },
        { fr: "traverser le pont",         vi: "qua cầu" },
        { fr: "traverser la place",        vi: "băng qua quảng trường" },
        { fr: "traverser au passage clouté", vi: "qua đường ở vạch kẻ đường" },
      ],
      structures: [
        { fr: "traverser + [qqch]",        vi: "băng qua cái gì (trực tiếp)" },
        { fr: "traverser au + [endroit]",  vi: "qua tại: traverser au passage piéton" },
      ],
      particles: [
        { fr: "pas de giới từ trước tân ngữ", vi: "traverser la rue (trực tiếp)" },
      ],
      idioms: [
        { fr: "Traversez au feu !", vi: "Hãy qua đường tại đèn!" },
      ],
    },
    "sortir": {
      collocations: [
        { fr: "sortir de la station",  vi: "ra khỏi ga" },
        { fr: "sortir à gauche",       vi: "ra rồi rẽ trái" },
        { fr: "sortir du métro",       vi: "ra khỏi tàu điện ngầm" },
        { fr: "sortir par la porte",   vi: "ra bằng cửa" },
      ],
      structures: [
        { fr: "sortir de + [lieu]",    vi: "ra khỏi đâu: sortir du bâtiment" },
        { fr: "sortir par + [issue]",  vi: "ra qua: sortir par la sortie B" },
      ],
      particles: [
        { fr: "de (lieu d'où on sort) / par (porte)", vi: "sortir de la gare / par la porte principale" },
      ],
      idioms: [],
    },
    "prendre": {
      collocations: [
        { fr: "prendre le métro",      vi: "đi tàu điện ngầm" },
        { fr: "prendre le bus",        vi: "đi xe buýt" },
        { fr: "prendre la rue + nom",  vi: "đi vào đường: prendre la rue de la Paix" },
        { fr: "prendre à droite",      vi: "rẽ phải" },
      ],
      structures: [
        { fr: "prendre + [transport]",     vi: "lấy / đi: prendre le tramway" },
        { fr: "prendre + [rue/direction]", vi: "prendre la première à droite" },
      ],
      particles: [
        { fr: "pas de giới từ", vi: "prendre le bus / prendre la rue Victor Hugo" },
      ],
      idioms: [
        { fr: "Prenez la deuxième à gauche.", vi: "Rẽ vào đường thứ hai bên trái." },
      ],
    },
    "se trouver": {
      collocations: [
        { fr: "se trouver à droite",   vi: "ở bên phải" },
        { fr: "se trouver en face de", vi: "ở đối diện với" },
        { fr: "se trouver au bout de", vi: "ở cuối đường" },
        { fr: "se trouver près de",    vi: "ở gần" },
      ],
      structures: [
        { fr: "se trouver + [prép + lieu]", vi: "La pharmacie se trouve en face de la mairie." },
      ],
      particles: [
        { fr: "en face de / à côté de / au bout de / près de", vi: "giới từ chỉ vị trí phổ biến" },
      ],
      idioms: [
        { fr: "Où se trouve le commissariat ?", vi: "Đồn cảnh sát ở đâu?" },
      ],
    },
    "entrer": {
      collocations: [
        { fr: "entrer dans la rue",       vi: "vào con đường" },
        { fr: "entrer dans le bâtiment",  vi: "vào tòa nhà" },
        { fr: "entrer par la porte",      vi: "vào qua cửa" },
        { fr: "entrer sans frapper",      vi: "vào mà không gõ cửa" },
      ],
      structures: [
        { fr: "entrer dans + [lieu]",  vi: "bước vào: entrer dans la cour" },
        { fr: "entrer par + [porte]",  vi: "vào qua: entrer par la porte principale" },
      ],
      particles: [
        { fr: "dans (lieu) / par (porte/moyen)", vi: "entrer dans la pièce / par la fenêtre" },
      ],
      idioms: [
        { fr: "Entrez !", vi: "Vào đi! (mời vào)" },
      ],
    },
    "monter": {
      collocations: [
        { fr: "monter les escaliers", vi: "leo cầu thang" },
        { fr: "monter dans le bus",   vi: "lên xe buýt" },
        { fr: "monter au 3e étage",   vi: "lên tầng 3" },
        { fr: "monter à pied",        vi: "leo bộ lên" },
      ],
      structures: [
        { fr: "monter dans + [transport]",    vi: "lên: monter dans le train" },
        { fr: "monter à + [étage]",           vi: "lên tầng: monter au deuxième étage" },
        { fr: "monter + [qqch (escaliers)]",  vi: "leo: monter les escaliers" },
      ],
      particles: [
        { fr: "dans (transport) / à (étage) / sans prép (escaliers)", vi: "ba cách dùng" },
      ],
      idioms: [],
    },
    "descendre": {
      collocations: [
        { fr: "descendre du bus",          vi: "xuống xe buýt" },
        { fr: "descendre les escaliers",   vi: "xuống cầu thang" },
        { fr: "descendre à la prochaine",  vi: "xuống điểm tiếp theo" },
        { fr: "descendre en ascenseur",    vi: "xuống bằng thang máy" },
      ],
      structures: [
        { fr: "descendre de + [transport]", vi: "xuống khỏi: descendre du tram" },
        { fr: "descendre à + [arrêt]",      vi: "xuống tại: descendre à la gare" },
        { fr: "descendre + [qqch]",         vi: "đi xuống: descendre les escaliers" },
      ],
      particles: [
        { fr: "de (transport) / à (arrêt)", vi: "descendre du bus / à la station" },
      ],
      idioms: [
        { fr: "Descendez au prochain arrêt.", vi: "Xuống ở trạm tiếp theo." },
      ],
    },
    "passer": {
      collocations: [
        { fr: "passer devant",         vi: "đi qua phía trước" },
        { fr: "passer par + rue",      vi: "đi qua đường: passer par la rue Rivoli" },
        { fr: "passer sous le pont",   vi: "đi dưới cầu" },
        { fr: "passer un examen",      vi: "thi (một kỳ thi)" },
      ],
      structures: [
        { fr: "passer devant/derrière/sous/sur + [lieu]", vi: "passer devant la mairie" },
        { fr: "passer par + [lieu]",                      vi: "passer par le centre-ville" },
      ],
      particles: [
        { fr: "devant / derrière / sous / par", vi: "giới từ chỉ vị trí / lộ trình" },
      ],
      idioms: [
        { fr: "Passez devant la pharmacie.", vi: "Đi qua phía trước nhà thuốc." },
      ],
    },
    "arriver": {
      collocations: [
        { fr: "arriver à la gare",  vi: "đến ga" },
        { fr: "arriver en retard",  vi: "đến muộn" },
        { fr: "arriver à l'heure",  vi: "đến đúng giờ" },
        { fr: "arriver à + V",      vi: "xoay xở được: arriver à comprendre" },
      ],
      structures: [
        { fr: "arriver à + [lieu]",        vi: "đến nơi" },
        { fr: "arriver en + [état]",       vi: "arriver en avance" },
        { fr: "arriver à + V (infinitif)", vi: "xoay xở được: arriver à ouvrir la porte" },
      ],
      particles: [
        { fr: "à (lieu / résultat) / en (état)", vi: "arriver à Paris / en retard" },
      ],
      idioms: [
        { fr: "J'arrive !",        vi: "Tôi đến ngay!" },
        { fr: "On est arrivés.",   vi: "Mình đến rồi." },
      ],
    },
    "chercher": {
      collocations: [
        { fr: "chercher la rue ...",  vi: "tìm con đường ..." },
        { fr: "chercher son chemin", vi: "tìm đường" },
        { fr: "chercher une adresse", vi: "tìm địa chỉ" },
        { fr: "aller chercher qqn",  vi: "đi đón ai" },
      ],
      structures: [
        { fr: "chercher + [qqch/qqn]",  vi: "tìm cái gì / ai" },
        { fr: "aller chercher + [qqn]", vi: "đi đón: aller chercher Paul à la gare" },
      ],
      particles: [
        { fr: "pas de giới từ", vi: "chercher qqch trực tiếp" },
      ],
      idioms: [
        { fr: "Je cherche la rue Victor Hugo.", vi: "Tôi tìm đường Victor Hugo." },
      ],
    },
    "habiter": {
      collocations: [
        { fr: "habiter près de la gare",   vi: "sống gần ga" },
        { fr: "habiter au bout de la rue", vi: "sống ở cuối đường" },
        { fr: "habiter en face de",        vi: "sống đối diện với" },
        { fr: "habiter à 10 minutes",      vi: "sống cách 10 phút" },
      ],
      structures: [
        { fr: "habiter + [prép + lieu]", vi: "J'habite à côté du parc." },
        { fr: "habiter à + [distance]",  vi: "J'habite à 5 minutes du centre." },
      ],
      particles: [
        { fr: "à / près de / en face de / au bout de", vi: "giới từ chỉ khoảng cách và vị trí" },
      ],
      idioms: [],
    },
  },

  // ─── U5 : Mode & shopping ────────────────────────────────────────────────
  u5: {
    "mettre": {
      collocations: [
        { fr: "mettre une robe",   vi: "mặc váy" },
        { fr: "mettre du temps",   vi: "mất thời gian: ça met 10 minutes" },
        { fr: "mettre la table",   vi: "dọn bàn ăn" },
        { fr: "se mettre à + V",   vi: "bắt đầu: se mettre à travailler" },
      ],
      structures: [
        { fr: "mettre + [vêtement]",   vi: "mặc / đội: mettre un chapeau" },
        { fr: "mettre du temps à + V", vi: "mettre du temps à décider" },
        { fr: "se mettre à + V",       vi: "il se met à pleuvoir" },
      ],
      particles: [
        { fr: "pas de prép (vêtement) / du temps à + V", vi: "mettre une veste / mettre du temps à choisir" },
      ],
      idioms: [
        { fr: "Mets ton manteau !", vi: "Mặc áo khoác vào!" },
        { fr: "se mettre en route",  vi: "bắt đầu lên đường" },
      ],
    },
    "porter": {
      collocations: [
        { fr: "porter une robe rouge", vi: "mặc váy đỏ" },
        { fr: "porter des lunettes",   vi: "đeo kính" },
        { fr: "porter un sac",         vi: "mang túi" },
        { fr: "ça te porte bien",      vi: "trông hợp với bạn" },
      ],
      structures: [
        { fr: "porter + [vêtement/accessoire]", vi: "mặc / đeo (trạng thái, đang mặc)" },
        { fr: "ça te/vous porte bien",          vi: "Ce rouge vous porte bien." },
      ],
      particles: [
        { fr: "pas de giới từ", vi: "porter une jupe (trực tiếp)" },
      ],
      idioms: [
        { fr: "Ce bleu vous va très bien.", vi: "Màu xanh này rất hợp với bạn." },
      ],
    },
    "faire": {
      collocations: [
        { fr: "faire du shopping",       vi: "đi mua sắm" },
        { fr: "faire les magasins",       vi: "đi lùng hàng các cửa hàng" },
        { fr: "faire la taille 38",       vi: "mặc cỡ 38" },
        { fr: "faire une bonne affaire",  vi: "mua được món hời" },
      ],
      structures: [
        { fr: "faire du shopping",                vi: "cụm danh từ + faire không đổi" },
        { fr: "faire + [taille]",                 vi: "Je fais du 40." },
        { fr: "faire une bonne/mauvaise affaire", vi: "đánh giá thương vụ mua sắm" },
      ],
      particles: [
        { fr: "du (shopping/sport) / une (affaire)", vi: "faire du shopping / faire une affaire" },
      ],
      idioms: [
        { fr: "Je fais du 38.",          vi: "Tôi mặc cỡ 38." },
        { fr: "C'est une bonne affaire !", vi: "Mua hời đấy!" },
      ],
    },
    "choisir": {
      collocations: [
        { fr: "choisir une couleur",      vi: "chọn màu sắc" },
        { fr: "choisir une taille",       vi: "chọn cỡ" },
        { fr: "choisir un modèle",        vi: "chọn kiểu dáng" },
        { fr: "avoir du mal à choisir",   vi: "khó chọn" },
      ],
      structures: [
        { fr: "choisir + [qqch]",           vi: "chọn cái gì" },
        { fr: "avoir du mal à choisir",     vi: "khó quyết định" },
        { fr: "choisir entre A et B",       vi: "chọn giữa A và B" },
      ],
      particles: [
        { fr: "entre A et B", vi: "choisir entre le rouge et le bleu" },
      ],
      idioms: [
        { fr: "Je n'arrive pas à choisir !", vi: "Tôi không thể chọn được!" },
      ],
    },
    "préférer": {
      collocations: [
        { fr: "préférer le bleu au rouge", vi: "thích xanh hơn đỏ" },
        { fr: "préférer cette coupe",      vi: "thích kiểu cắt này hơn" },
        { fr: "préférer le classique",     vi: "thích phong cách cổ điển hơn" },
      ],
      structures: [
        { fr: "préférer A à B",           vi: "thích A hơn B" },
        { fr: "préférer + V (infinitif)", vi: "Je préfère essayer avant d'acheter." },
      ],
      particles: [
        { fr: "à (comparison)", vi: "préférer le rouge au noir" },
      ],
      idioms: [],
    },
    "coûter": {
      collocations: [
        { fr: "coûter 50 euros",    vi: "giá 50 euro" },
        { fr: "coûter trop cher",   vi: "quá đắt" },
        { fr: "coûter moins cher",  vi: "rẻ hơn" },
        { fr: "combien coûte ...?", vi: "cái này giá bao nhiêu?" },
      ],
      structures: [
        { fr: "coûter + [prix]",          vi: "Cette veste coûte 80 euros." },
        { fr: "coûter + cher/moins cher", vi: "so sánh giá" },
      ],
      particles: [
        { fr: "pas de giới từ", vi: "coûter + prix trực tiếp" },
      ],
      idioms: [
        { fr: "C'est trop cher !",       vi: "Đắt quá!" },
        { fr: "C'est dans mes prix.",    vi: "Giá này hợp túi tiền tôi." },
      ],
    },
    "mesurer": {
      collocations: [
        { fr: "mesurer 1m70",      vi: "cao 1m70" },
        { fr: "mesurer un tissu",  vi: "đo vải" },
        { fr: "se faire mesurer",  vi: "được đo" },
      ],
      structures: [
        { fr: "mesurer + [taille]", vi: "Je mesure 1m65." },
        { fr: "mesurer + [qqch]",   vi: "đo cái gì: mesurer une fenêtre" },
      ],
      particles: [
        { fr: "pas de giới từ", vi: "mesurer qqch directement" },
      ],
      idioms: [],
    },
    "peser": {
      collocations: [
        { fr: "peser 60 kilos",    vi: "nặng 60 kg" },
        { fr: "peser les bagages", vi: "cân hành lý" },
        { fr: "se peser",          vi: "tự cân nặng" },
      ],
      structures: [
        { fr: "peser + [poids]", vi: "Je pèse 55 kilos." },
        { fr: "peser + [qqch]",  vi: "cân cái gì: peser une valise" },
      ],
      particles: [
        { fr: "pas de giới từ", vi: "peser qqch trực tiếp" },
      ],
      idioms: [],
    },
    "acheter": {
      collocations: [
        { fr: "acheter un vêtement",  vi: "mua quần áo" },
        { fr: "acheter en soldes",    vi: "mua hàng giảm giá" },
        { fr: "acheter en ligne",     vi: "mua trực tuyến" },
        { fr: "acheter d'occasion",   vi: "mua đồ cũ" },
      ],
      structures: [
        { fr: "acheter + [qqch]",    vi: "mua cái gì" },
        { fr: "acheter en + [mode]", vi: "acheter en ligne / en soldes" },
      ],
      particles: [
        { fr: "en (mode d'achat)", vi: "acheter en boutique / en ligne" },
      ],
      idioms: [
        { fr: "Je l'achète !", vi: "Tôi mua nó!" },
      ],
    },
    "vendre": {
      collocations: [
        { fr: "vendre des vêtements",  vi: "bán quần áo" },
        { fr: "vendre en boutique",    vi: "bán ở cửa hàng" },
        { fr: "vendre à prix réduit",  vi: "bán giá giảm" },
        { fr: "vendre des soldes",     vi: "bán hàng sale" },
      ],
      structures: [
        { fr: "vendre + [qqch] à + [prix]", vi: "vendre une robe à 30 euros" },
        { fr: "vendre en + [lieu/mode]",    vi: "vendre en boutique / en ligne" },
      ],
      particles: [
        { fr: "à (prix) / en (lieu/mode)", vi: "vendre à 20€ / vendre en boutique" },
      ],
      idioms: [],
    },
    "aimer": {
      collocations: [
        { fr: "aimer cette couleur",      vi: "thích màu này" },
        { fr: "aimer le style casual",    vi: "thích phong cách năng động" },
        { fr: "aimer faire du shopping",  vi: "thích đi mua sắm" },
        { fr: "aimer s'habiller",         vi: "thích ăn mặc" },
      ],
      structures: [
        { fr: "aimer + [qqch]",         vi: "J'aime beaucoup cette robe." },
        { fr: "aimer + V (infinitif)",  vi: "J'aime essayer des vêtements." },
      ],
      particles: [
        { fr: "bien (degré moyen)", vi: "J'aime bien ce modèle." },
      ],
      idioms: [],
    },
    "essayer": {
      collocations: [
        { fr: "essayer un vêtement",             vi: "mặc thử quần áo" },
        { fr: "essayer une paire de chaussures", vi: "thử một đôi giày" },
        { fr: "essayer de + V",                  vi: "cố gắng làm gì" },
        { fr: "cabine d'essayage",               vi: "phòng thử đồ" },
      ],
      structures: [
        { fr: "essayer + [qqch]",  vi: "thử cái gì: Vous pouvez essayer ce manteau." },
        { fr: "essayer de + V",    vi: "J'essaie de trouver ma taille." },
      ],
      particles: [
        { fr: "de + V (tentative)", vi: "essayer de comprendre" },
      ],
      idioms: [
        { fr: "Je peux l'essayer ?",      vi: "Tôi có thể thử mặc không?" },
        { fr: "Vous voulez l'essayer ?",  vi: "Bạn muốn thử không?" },
      ],
    },
    "changer": {
      collocations: [
        { fr: "changer de taille",  vi: "đổi cỡ" },
        { fr: "changer de couleur", vi: "đổi màu" },
        { fr: "changer un article", vi: "đổi hàng" },
        { fr: "se changer",         vi: "thay quần áo" },
      ],
      structures: [
        { fr: "changer de + [qqch]", vi: "đổi cái gì: changer de taille" },
        { fr: "se changer",          vi: "Je vais me changer." },
      ],
      particles: [
        { fr: "de (remplacement)", vi: "changer de magasin / de couleur / de modèle" },
      ],
      idioms: [
        { fr: "Je peux l'échanger ?", vi: "Tôi có thể đổi hàng không?" },
      ],
    },
    "trouver": {
      collocations: [
        { fr: "trouver sa taille",   vi: "tìm được cỡ của mình" },
        { fr: "trouver un bon prix", vi: "tìm được giá tốt" },
        { fr: "trouver ça joli",     vi: "thấy cái đó đẹp" },
        { fr: "ne pas trouver",      vi: "không tìm thấy" },
      ],
      structures: [
        { fr: "trouver + [qqch] + adj",      vi: "Je trouve ce modèle très élégant." },
        { fr: "trouver que + [subordonnée]", vi: "Je trouve que c'est trop cher." },
      ],
      particles: [
        { fr: "que + phrase (opinion)", vi: "trouver que = donner un avis" },
      ],
      idioms: [
        { fr: "Je trouve ça parfait !", vi: "Tôi thấy cái đó hoàn hảo!" },
      ],
    },
    "plaire": {
      collocations: [
        { fr: "ça me plaît",     vi: "tôi thích cái đó" },
        { fr: "ça vous plaît ?", vi: "bạn thích không?" },
        { fr: "plaire à qqn",    vi: "làm hài lòng ai" },
        { fr: "ne pas plaire",   vi: "không thích" },
      ],
      structures: [
        { fr: "ça (me/te/lui...) plaît",  vi: "chủ ngữ là vật, tân ngữ là người" },
        { fr: "ce modèle me plaît",       vi: "= J'aime ce modèle" },
      ],
      particles: [
        { fr: "à + [personne]", vi: "Ce manteau plaît à Marie." },
      ],
      idioms: [
        { fr: "Ça vous plaît ?",          vi: "Bạn có thích không?" },
        { fr: "Ce n'est pas à mon goût.", vi: "Không hợp gu tôi." },
      ],
    },
  },

  // ─── U6 : Ma journée ─────────────────────────────────────────────────────
  u6: {
    "se lever": {
      collocations: [
        { fr: "se lever tôt / tard",      vi: "dậy sớm / muộn" },
        { fr: "se lever à 7h",            vi: "dậy lúc 7 giờ" },
        { fr: "se lever du bon pied",     vi: "bắt đầu ngày tốt đẹp" },
        { fr: "avoir du mal à se lever",  vi: "khó dậy sáng" },
      ],
      structures: [
        { fr: "se lever à + [heure]", vi: "Je me lève à 6h30." },
        { fr: "se lever tôt/tard",    vi: "chỉ thời điểm trong ngày" },
      ],
      particles: [
        { fr: "verbe pronominal", vi: "me lève / te lèves / se lève / nous levons..." },
      ],
      idioms: [
        { fr: "Je me lève du mauvais pied.", vi: "Tôi bắt đầu ngày không tốt." },
      ],
    },
    "se coucher": {
      collocations: [
        { fr: "se coucher tôt",      vi: "đi ngủ sớm" },
        { fr: "se coucher à minuit", vi: "đi ngủ lúc nửa đêm" },
        { fr: "se coucher tard",     vi: "ngủ muộn" },
        { fr: "aller se coucher",    vi: "đi ngủ" },
      ],
      structures: [
        { fr: "se coucher à + [heure]", vi: "Je me couche à 23h." },
        { fr: "aller se coucher",       vi: "đi (vào giường) ngủ" },
      ],
      particles: [
        { fr: "verbe pronominal", vi: "me couche / te couches / se couche..." },
      ],
      idioms: [
        { fr: "Bonne nuit !", vi: "Chúc ngủ ngon!" },
      ],
    },
    "se laver": {
      collocations: [
        { fr: "se laver les mains",    vi: "rửa tay" },
        { fr: "se laver les cheveux",  vi: "gội đầu" },
        { fr: "se laver le matin",     vi: "tắm rửa buổi sáng" },
        { fr: "se laver les dents",    vi: "đánh răng" },
      ],
      structures: [
        { fr: "se laver + les [partie du corps]", vi: "se laver les mains (mạo từ défini)" },
        { fr: "se laver (sans complément)",        vi: "tắm gội nói chung" },
      ],
      particles: [
        { fr: "les (partie du corps)", vi: "se laver les mains — không dùng 'mes mains'" },
      ],
      idioms: [],
    },
    "se préparer": {
      collocations: [
        { fr: "se préparer pour le travail",   vi: "chuẩn bị đi làm" },
        { fr: "se préparer rapidement",        vi: "chuẩn bị nhanh" },
        { fr: "prendre du temps à se préparer", vi: "mất nhiều thời gian chuẩn bị" },
        { fr: "se préparer à partir",          vi: "chuẩn bị để đi" },
      ],
      structures: [
        { fr: "se préparer pour + [occasion]", vi: "se préparer pour la fête" },
        { fr: "se préparer à + V",             vi: "chuẩn bị để: se préparer à sortir" },
      ],
      particles: [
        { fr: "pour (occasion) / à + V (action)", vi: "se préparer pour l'entretien / à partir" },
      ],
      idioms: [
        { fr: "Je me prépare en 10 minutes.", vi: "Tôi chuẩn bị xong trong 10 phút." },
      ],
    },
    "se reposer": {
      collocations: [
        { fr: "se reposer après le travail",  vi: "nghỉ ngơi sau khi làm việc" },
        { fr: "se reposer un peu",            vi: "nghỉ ngơi một chút" },
        { fr: "avoir besoin de se reposer",   vi: "cần nghỉ ngơi" },
        { fr: "se reposer le week-end",       vi: "nghỉ ngơi cuối tuần" },
      ],
      structures: [
        { fr: "se reposer après + [activité]", vi: "se reposer après le sport" },
        { fr: "se reposer pour + [raison]",    vi: "se reposer pour être en forme" },
      ],
      particles: [
        { fr: "après (activité) / pour (raison)", vi: "se reposer après / pour être en forme" },
      ],
      idioms: [
        { fr: "J'ai besoin de me reposer.", vi: "Tôi cần nghỉ ngơi." },
      ],
    },
    "se promener": {
      collocations: [
        { fr: "se promener dans le parc",   vi: "dạo bộ trong công viên" },
        { fr: "se promener à pied",         vi: "đi dạo bộ" },
        { fr: "aller se promener",          vi: "đi dạo" },
        { fr: "se promener avec le chien",  vi: "dắt chó đi dạo" },
      ],
      structures: [
        { fr: "se promener dans + [lieu]", vi: "se promener dans la forêt" },
        { fr: "aller se promener",         vi: "đi dạo (hành động)" },
      ],
      particles: [
        { fr: "dans (lieu) / avec (compagnie)", vi: "se promener dans le parc / avec des amis" },
      ],
      idioms: [
        { fr: "On va se promener ?", vi: "Mình đi dạo nhé?" },
      ],
    },
    "partir": {
      collocations: [
        { fr: "partir au travail",     vi: "đi làm" },
        { fr: "partir tôt le matin",   vi: "ra đi sớm buổi sáng" },
        { fr: "à quelle heure tu pars ?", vi: "Bạn đi lúc mấy giờ?" },
        { fr: "partir sans déjeuner",  vi: "đi mà không ăn sáng" },
      ],
      structures: [
        { fr: "partir à + [heure]",        vi: "Je pars à 8h." },
        { fr: "partir sans + V/N",         vi: "partir sans manger" },
        { fr: "partir pour + [durée]",     vi: "Je pars pour deux semaines." },
      ],
      particles: [
        { fr: "à (heure) / pour (durée) / sans (manque)", vi: "partir à 7h / pour 3 jours / sans parapluie" },
      ],
      idioms: [
        { fr: "C'est l'heure de partir.", vi: "Đến giờ phải đi rồi." },
      ],
    },
    "rentrer": {
      collocations: [
        { fr: "rentrer à la maison", vi: "về nhà" },
        { fr: "rentrer du travail",  vi: "tan làm về" },
        { fr: "rentrer tard",        vi: "về muộn" },
        { fr: "rentrer en bus",      vi: "về bằng xe buýt" },
      ],
      structures: [
        { fr: "rentrer à + [lieu]",       vi: "rentrer à la maison / au bureau" },
        { fr: "rentrer de + [origine]",   vi: "rentrer du bureau / des courses" },
        { fr: "rentrer en + [transport]", vi: "rentrer en voiture" },
      ],
      particles: [
        { fr: "à (destination) / de (origine) / en (transport)", vi: "rentrer à la maison de l'école en bus" },
      ],
      idioms: [
        { fr: "Je rentre à la maison.", vi: "Tôi về nhà rồi." },
      ],
    },
    "regarder": {
      collocations: [
        { fr: "regarder la télé le soir", vi: "tối xem ti vi" },
        { fr: "regarder une série",       vi: "xem phim bộ" },
        { fr: "regarder l'heure",         vi: "xem giờ" },
        { fr: "regarder par la fenêtre",  vi: "nhìn qua cửa sổ" },
      ],
      structures: [
        { fr: "regarder + [qqch]", vi: "xem / nhìn (chủ động)" },
        { fr: "se regarder",       vi: "tự nhìn mình (trong gương)" },
      ],
      particles: [
        { fr: "pas de giới từ", vi: "regarder la télé trực tiếp" },
      ],
      idioms: [
        { fr: "Je regarde la télé avant de dormir.", vi: "Tôi xem ti vi trước khi ngủ." },
      ],
    },
    "dormir": {
      collocations: [
        { fr: "dormir 8 heures",        vi: "ngủ 8 tiếng" },
        { fr: "dormir profondément",    vi: "ngủ sâu" },
        { fr: "mal dormir",             vi: "ngủ không ngon" },
        { fr: "avoir besoin de dormir", vi: "cần ngủ" },
      ],
      structures: [
        { fr: "dormir + [durée]",   vi: "Je dors 7 heures par nuit." },
        { fr: "bien / mal dormir",  vi: "ngủ ngon / không ngon" },
      ],
      particles: [
        { fr: "pas de giới từ", vi: "dormir 8 heures trực tiếp" },
      ],
      idioms: [
        { fr: "Dors bien !",          vi: "Ngủ ngon nhé!" },
        { fr: "Je tombe de sommeil.", vi: "Tôi buồn ngủ lắm rồi." },
      ],
    },
    "travailler": {
      collocations: [
        { fr: "travailler de 9h à 18h",  vi: "làm từ 9h đến 18h" },
        { fr: "travailler à domicile",   vi: "làm việc tại nhà" },
        { fr: "travailler le week-end",  vi: "làm cuối tuần" },
        { fr: "travailler beaucoup",     vi: "làm việc nhiều" },
      ],
      structures: [
        { fr: "travailler de ... à + [heures]", vi: "Je travaille de 8h à 17h." },
        { fr: "travailler à + [lieu/mode]",     vi: "travailler à la maison / à temps partiel" },
      ],
      particles: [
        { fr: "de ... à (heures) / à (lieu/mode)", vi: "de 9h à 18h / à domicile" },
      ],
      idioms: [
        { fr: "J'ai beaucoup travaillé aujourd'hui.", vi: "Hôm nay tôi làm việc nhiều lắm." },
      ],
    },
    "manger": {
      collocations: [
        { fr: "manger le matin",         vi: "ăn sáng" },
        { fr: "manger à midi",           vi: "ăn trưa" },
        { fr: "manger le soir",          vi: "ăn tối" },
        { fr: "manger vite / lentement", vi: "ăn nhanh / chậm" },
      ],
      structures: [
        { fr: "manger à + [heure/moment]",         vi: "manger à 12h30" },
        { fr: "manger du/de la/de l' + [aliment]", vi: "manger du pain" },
      ],
      particles: [
        { fr: "à (heure) / du/de la (partitif)", vi: "manger à 13h / manger du riz" },
      ],
      idioms: [
        { fr: "C'est l'heure de manger !", vi: "Đến giờ ăn rồi!" },
      ],
    },
    "aller": {
      collocations: [
        { fr: "aller au travail",        vi: "đi làm" },
        { fr: "aller à l'école",         vi: "đi học" },
        { fr: "aller faire les courses", vi: "đi mua đồ" },
        { fr: "aller se coucher",        vi: "đi ngủ" },
      ],
      structures: [
        { fr: "aller + V (futur proche)", vi: "Je vais me lever à 7h." },
        { fr: "aller à + [lieu]",         vi: "aller au travail / à la salle de sport" },
      ],
      particles: [
        { fr: "au/à la/à l' (lieu) / + V infinitif (futur proche)", vi: "aller au bureau / aller manger" },
      ],
      idioms: [
        { fr: "Ça va ?",   vi: "Bạn khỏe không?" },
        { fr: "On y va !", vi: "Đi thôi!" },
      ],
    },
    "faire": {
      collocations: [
        { fr: "faire la cuisine le soir", vi: "nấu ăn buổi tối" },
        { fr: "faire du sport le matin",  vi: "tập thể dục buổi sáng" },
        { fr: "faire la vaisselle",       vi: "rửa bát" },
        { fr: "faire le ménage",          vi: "dọn nhà" },
      ],
      structures: [
        { fr: "faire + [tâche ménagère]", vi: "faire la lessive / le repassage" },
        { fr: "faire du sport",           vi: "tập thể dục (dùng du/de la)" },
      ],
      particles: [
        { fr: "la / le / les (tâches) / du (sport)", vi: "faire la cuisine / du jogging" },
      ],
      idioms: [
        { fr: "J'ai beaucoup à faire !", vi: "Tôi có nhiều việc phải làm!" },
      ],
    },
    "sortir": {
      collocations: [
        { fr: "sortir le soir",          vi: "ra ngoài buổi tối" },
        { fr: "sortir avec des amis",    vi: "ra ngoài cùng bạn bè" },
        { fr: "sortir faire une course", vi: "ra ngoài mua đồ" },
        { fr: "ne pas sortir",           vi: "không ra ngoài" },
      ],
      structures: [
        { fr: "sortir + [expression de temps]", vi: "sortir le week-end / le soir" },
        { fr: "sortir avec + [qqn]",            vi: "sortir avec des collègues" },
        { fr: "sortir de + [lieu]",             vi: "sortir de la maison à 8h" },
      ],
      particles: [
        { fr: "de (lieu) / avec (compagnie)", vi: "sortir de chez soi / avec des amis" },
      ],
      idioms: [
        { fr: "On sort ce soir ?", vi: "Tối nay mình ra ngoài nhé?" },
      ],
    },
  },
};

export function getVerbExpand(unitId, infinitive) {
  return EDITO_VERB_EXPAND[unitId]?.[infinitive] ?? null;
}
