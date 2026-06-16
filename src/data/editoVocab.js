// Edito A1 — Vocabulary organized by unit & group (aligned with Édito A1 Didier FLE)
export const EDITO_VOCAB_UNITS = [
  {
    id: "u0", num: "0", title: "Bienvenue !",
    color: "#4A90D9", bg: "#EBF4FF",
    groups: [
      {
        id: "u0g1", label: "Salutations", icon: "👋",
        words: [
          { fr:"Bonjour",          vi:"Xin chào (ban ngày)", pos:"Lời chào", ipa:"bɔ̃.ʒuʁ",        ex_fr:"Bonjour, ça va ?",            ex_vi:"Chào, khỏe không?" },
          { fr:"Bonsoir",          vi:"Chào buổi tối",       pos:"Lời chào", ipa:"bɔ̃.swaʁ",       ex_fr:"Bonsoir madame !",            ex_vi:"Chào bà (buổi tối)!" },
          { fr:"Bonne nuit",       vi:"Chúc ngủ ngon",       pos:"Lời chào", ipa:"bɔn nɥi",        ex_fr:"Bonne nuit, à demain !",      ex_vi:"Ngủ ngon, hẹn mai!" },
          { fr:"Salut",            vi:"Chào (thân mật)",     pos:"Lời chào", ipa:"sa.ly",           ex_fr:"Salut ! Ça va ?",             ex_vi:"Chào! Khỏe không?" },
          { fr:"Au revoir",        vi:"Tạm biệt",            pos:"Lời chào", ipa:"o ʁə.vwaʁ",       ex_fr:"Au revoir, bonne journée !",  ex_vi:"Tạm biệt, ngày tốt lành!" },
          { fr:"À bientôt",        vi:"Hẹn gặp lại sớm",     pos:"Lời chào", ipa:"a bjɛ̃.to",       ex_fr:"Merci, à bientôt !",          ex_vi:"Cảm ơn, hẹn sớm gặp lại!" },
          { fr:"À demain",         vi:"Hẹn gặp ngày mai",    pos:"Lời chào", ipa:"a də.mɛ̃",        ex_fr:"À demain au cours !",         ex_vi:"Hẹn mai ở lớp!" },
          { fr:"À tout à l'heure", vi:"Hẹn gặp lại chút nữa", pos:"Lời chào", ipa:"a tu ta lœʁ",    ex_fr:"À tout à l'heure !",          ex_vi:"Lát gặp lại nhé!" },
          { fr:"Merci",            vi:"Cảm ơn",              pos:"Lời xã giao", ipa:"mɛʁ.si",       ex_fr:"Merci beaucoup !",            ex_vi:"Cảm ơn nhiều!" },
          { fr:"De rien",          vi:"Không có gì",         pos:"Lời xã giao", ipa:"də ʁjɛ̃",       ex_fr:"— Merci ! — De rien.",        ex_vi:"— Cảm ơn! — Không có gì." },
          { fr:"S'il vous plaît",  vi:"Làm ơn (lịch sự)",    pos:"Lời xã giao", ipa:"sil vu plɛ",   ex_fr:"Un café, s'il vous plaît.",   ex_vi:"Cho một cà phê, làm ơn." },
          { fr:"S'il te plaît",    vi:"Làm ơn (thân mật)",   pos:"Lời xã giao", ipa:"sil tə plɛ",   ex_fr:"Aide-moi, s'il te plaît.",    ex_vi:"Giúp mình với, làm ơn." },
          { fr:"Excusez-moi",      vi:"Xin lỗi (lịch sự)",   pos:"Lời xã giao", ipa:"ɛks.ky.ze mwa", ex_fr:"Excusez-moi, où est la gare ?", ex_vi:"Xin lỗi, ga ở đâu ạ?" },
          { fr:"Pardon",           vi:"Xin lỗi / Xin nhường", pos:"Lời xã giao", ipa:"paʁ.dɔ̃",     ex_fr:"Pardon, je suis en retard.",  ex_vi:"Xin lỗi, tôi trễ." },
          { fr:"Enchanté(e)",      vi:"Rất vui được gặp",    pos:"Lời xã giao", ipa:"ɑ̃.ʃɑ̃.te",    ex_fr:"Enchanté(e) de vous rencontrer.", ex_vi:"Rất vui được gặp bạn." },
        ]
      },
      {
        id: "u0g2", label: "Se présenter", icon: "🪪",
        words: [
          { fr:"Je m'appelle...",   vi:"Tôi tên là..." },
          { fr:"Je suis...",        vi:"Tôi là..." },
          { fr:"J'habite à...",     vi:"Tôi sống ở..." },
          { fr:"J'ai ... ans",      vi:"Tôi ... tuổi" },
          { fr:"Je suis étudiant",  vi:"Tôi là sinh viên (nam)" },
          { fr:"Je suis étudiante", vi:"Tôi là sinh viên (nữ)" },
          { fr:"Je parle français", vi:"Tôi nói tiếng Pháp" },
          { fr:"Je comprends",      vi:"Tôi hiểu" },
          { fr:"Vous vous appelez comment ?", vi:"Bạn tên là gì? (lịch sự)" },
          { fr:"Tu t'appelles comment ?",     vi:"Bạn tên là gì? (thân mật)" },
          { fr:"Vous avez quel âge ?", vi:"Bạn bao nhiêu tuổi? (lịch sự)" },
          { fr:"Vous habitez où ?",   vi:"Bạn sống ở đâu? (lịch sự)" },
          { fr:"D'où venez-vous ?",   vi:"Bạn đến từ đâu?" },
          { fr:"Je viens de...",       vi:"Tôi đến từ..." },
          { fr:"Ravi(e) de vous rencontrer", vi:"Rất vui được gặp bạn" },
        ]
      },
      {
        id: "u0g3", label: "En classe", icon: "📚",
        words: [
          { fr:"le professeur",      vi:"giáo viên" },
          { fr:"l'étudiant(e)",      vi:"sinh viên" },
          { fr:"le livre",           vi:"quyển sách" },
          { fr:"le cahier",          vi:"quyển vở" },
          { fr:"le stylo",           vi:"bút bi" },
          { fr:"le crayon",          vi:"bút chì" },
          { fr:"la gomme",           vi:"cục tẩy" },
          { fr:"le tableau",         vi:"bảng" },
          { fr:"la chaise",          vi:"ghế" },
          { fr:"la table",           vi:"bàn" },
          { fr:"Répétez, s'il vous plaît", vi:"Hãy lặp lại, làm ơn" },
          { fr:"Je ne comprends pas",      vi:"Tôi không hiểu" },
          { fr:"Comment dit-on... ?",      vi:"Người ta nói ... như thế nào?" },
          { fr:"Qu'est-ce que ça veut dire ?", vi:"Cái này có nghĩa là gì?" },
          { fr:"Ouvrez votre livre page...", vi:"Mở sách trang..." },
        ]
      },
    ]
  },

  // ── Unité 1 — Je suis… ────────────────────────────────────────
  {
    id: "u1", num: "1", title: "Je suis…",
    color: "#7B6CF6", bg: "#F0EEFF",
    groups: [
      {
        id: "u1g1", label: "Les loisirs (1)", icon: "🎭",
        words: [
          { fr:"l'art (m.)",          vi:"nghệ thuật" },
          { fr:"le cinéma",           vi:"điện ảnh / rạp chiếu phim" },
          { fr:"les langues (f.)",    vi:"các ngôn ngữ" },
          { fr:"la musique",          vi:"âm nhạc" },
          { fr:"le sport",            vi:"thể thao" },
        ]
      },
      {
        id: "u1g2", label: "Les nombres (1) — 32 à 69", icon: "🔢",
        words: [
          { fr:"trente-deux (32)",        vi:"ba mươi hai" },
          { fr:"quarante (40)",           vi:"bốn mươi" },
          { fr:"quarante et un (41)",     vi:"bốn mươi mốt" },
          { fr:"cinquante (50)",          vi:"năm mươi" },
          { fr:"cinquante et un (51)",    vi:"năm mươi mốt" },
          { fr:"soixante (60)",           vi:"sáu mươi" },
          { fr:"soixante et un (61)",     vi:"sáu mươi mốt" },
          { fr:"soixante-neuf (69)",      vi:"sáu mươi chín" },
        ]
      },
      {
        id: "u1g3", label: "Les pays et nationalités", icon: "🌍",
        words: [
          { fr:"l'Algérie — algérien(ne)",          vi:"Algeria — người Algeria" },
          { fr:"l'Allemagne — allemand(e)",          vi:"Đức — người Đức" },
          { fr:"l'Argentine — argentin(e)",          vi:"Argentina — người Argentina" },
          { fr:"la Belgique — belge",                vi:"Bỉ — người Bỉ" },
          { fr:"le Brésil — brésilien(ne)",          vi:"Brazil — người Brazil" },
          { fr:"le Cameroun — camerounais(e)",       vi:"Cameroun — người Cameroun" },
          { fr:"le Canada — canadien(ne)",           vi:"Canada — người Canada" },
          { fr:"la Chine — chinois(e)",              vi:"Trung Quốc — người Trung Quốc" },
          { fr:"la Colombie — colombien(ne)",        vi:"Colombia — người Colombia" },
          { fr:"le Congo — congolais(e)",            vi:"Congo — người Congo" },
          { fr:"la Corée — coréen(ne)",              vi:"Hàn Quốc — người Hàn Quốc" },
          { fr:"l'Espagne — espagnol(e)",            vi:"Tây Ban Nha — người Tây Ban Nha" },
          { fr:"les États-Unis — américain(e)",      vi:"Mỹ — người Mỹ" },
          { fr:"la France — français(e)",            vi:"Pháp — người Pháp" },
          { fr:"l'Inde — indien(ne)",                vi:"Ấn Độ — người Ấn Độ" },
          { fr:"l'Italie — italien(ne)",             vi:"Ý — người Ý" },
          { fr:"le Japon — japonais(e)",             vi:"Nhật Bản — người Nhật" },
          { fr:"le Maroc — marocain(e)",             vi:"Maroc — người Maroc" },
          { fr:"le Mexique — mexicain(e)",           vi:"Mexico — người Mexico" },
          { fr:"les Pays-Bas — hollandais(e)",       vi:"Hà Lan — người Hà Lan" },
          { fr:"la Pologne — polonais(e)",           vi:"Ba Lan — người Ba Lan" },
          { fr:"la République Tchèque — tchèque",    vi:"CH Séc — người Séc" },
          { fr:"la Russie — russe",                  vi:"Nga — người Nga" },
          { fr:"le Sénégal — sénégalais(e)",         vi:"Sénégal — người Sénégal" },
          { fr:"la Suisse — suisse",                 vi:"Thụy Sĩ — người Thụy Sĩ" },
          { fr:"la Tunisie — tunisien(ne)",          vi:"Tunisia — người Tunisia" },
          { fr:"le Vietnam — vietnamien(ne)",        vi:"Việt Nam — người Việt Nam" },
        ]
      },
      {
        id: "u1g4", label: "L'identité", icon: "🪪",
        words: [
          { fr:"le nom",                             vi:"họ" },
          { fr:"le prénom",                          vi:"tên" },
          { fr:"la date de naissance",               vi:"ngày sinh" },
          { fr:"le lieu de naissance",               vi:"nơi sinh" },
          { fr:"le pays",                            vi:"quốc gia" },
          { fr:"la ville",                           vi:"thành phố" },
          { fr:"l'adresse mail (f.) / le mail",      vi:"địa chỉ email" },
          { fr:"le compte Facebook / Instagram",     vi:"tài khoản Facebook / Instagram" },
          { fr:"le numéro de téléphone",             vi:"số điện thoại" },
        ]
      },
      {
        id: "u1g5", label: "Les nombres (2) — 70 à 100", icon: "🔢",
        words: [
          { fr:"soixante-dix (70)",                  vi:"bảy mươi" },
          { fr:"soixante et onze (71)",              vi:"bảy mươi mốt" },
          { fr:"soixante-dix-neuf (79)",             vi:"bảy mươi chín" },
          { fr:"quatre-vingts (80)",                 vi:"tám mươi" },
          { fr:"quatre-vingt-un (81)",               vi:"tám mươi mốt" },
          { fr:"quatre-vingt-dix (90)",              vi:"chín mươi" },
          { fr:"quatre-vingt-onze (91)",             vi:"chín mươi mốt" },
          { fr:"quatre-vingt-dix-neuf (99)",         vi:"chín mươi chín" },
          { fr:"cent (100)",                         vi:"một trăm" },
          { fr:"septante (70) — Suisse / Belgique",  vi:"bảy mươi (cách nói Thụy Sĩ / Bỉ)" },
          { fr:"huitante (80) — Suisse",             vi:"tám mươi (cách nói Thụy Sĩ)" },
          { fr:"nonante (90) — Suisse / Belgique",   vi:"chín mươi (cách nói Thụy Sĩ / Bỉ)" },
        ]
      },
    ]
  },

  // ── Unité 2 — Près de moi ────────────────────────────────────
  {
    id: "u2", num: "2", title: "Près de moi",
    color: "#0891B2", bg: "#F0F9FF",
    groups: [
      {
        id: "u2g1", label: "Les lieux", icon: "🏘️",
        words: [
          { fr:"l'appartement (m.)",        vi:"căn hộ" },
          { fr:"la mer",                    vi:"biển" },
          { fr:"la plage",                  vi:"bãi biển" },
          { fr:"le quartier",               vi:"khu phố" },
          { fr:"la rue",                    vi:"con đường / phố" },
          { fr:"l'université (f.)",         vi:"trường đại học" },
        ]
      },
      {
        id: "u2g2", label: "La musique", icon: "🎵",
        words: [
          { fr:"l'instrument de musique (m.)", vi:"nhạc cụ" },
          { fr:"la guitare",                   vi:"đàn ghi-ta" },
          { fr:"le piano",                     vi:"đàn piano" },
        ]
      },
      {
        id: "u2g3", label: "Le cinéma", icon: "🎬",
        words: [
          { fr:"le festival",               vi:"lễ hội / liên hoan phim" },
          { fr:"le film",                   vi:"bộ phim" },
          { fr:"la place (de cinéma)",      vi:"chỗ ngồi / vé (rạp chiếu phim)" },
        ]
      },
      {
        id: "u2g4", label: "Le sport", icon: "⚽",
        words: [
          { fr:"la danse",                  vi:"múa / khiêu vũ" },
          { fr:"danser",                    vi:"nhảy / múa" },
          { fr:"la marche",                 vi:"đi bộ" },
          { fr:"marcher",                   vi:"đi bộ" },
          { fr:"la natation",               vi:"bơi lội" },
          { fr:"nager",                     vi:"bơi" },
          { fr:"le ski",                    vi:"trượt tuyết" },
          { fr:"skier",                     vi:"trượt tuyết" },
        ]
      },
      {
        id: "u2g5", label: "La famille", icon: "👨‍👩‍👧",
        words: [
          { fr:"la grand-mère",             vi:"bà nội / ngoại" },
          { fr:"le grand-père",             vi:"ông nội / ngoại" },
          { fr:"la mère (maman)",           vi:"mẹ (má)" },
          { fr:"le père (papa)",            vi:"bố (ba)" },
          { fr:"le fils",                   vi:"con trai" },
          { fr:"la fille (unique)",         vi:"con gái (một con)" },
          { fr:"le frère",                  vi:"anh / em trai" },
          { fr:"la sœur",                   vi:"chị / em gái" },
          { fr:"le petit-fils",             vi:"cháu trai (nội / ngoại)" },
          { fr:"la petite-fille",           vi:"cháu gái (nội / ngoại)" },
          { fr:"l'oncle (m.)",              vi:"chú / bác / cậu" },
          { fr:"la tante",                  vi:"cô / dì / mợ" },
          { fr:"le/la cousin(e)",           vi:"anh / chị em họ" },
          { fr:"le neveu",                  vi:"cháu trai (của cô / chú)" },
          { fr:"la nièce",                  vi:"cháu gái (của cô / chú)" },
        ]
      },
      {
        id: "u2g6", label: "La situation familiale", icon: "💍",
        words: [
          { fr:"célibataire",               vi:"độc thân" },
          { fr:"le mariage",                vi:"hôn nhân / đám cưới" },
          { fr:"le mari",                   vi:"chồng" },
          { fr:"la femme",                  vi:"vợ" },
          { fr:"marié(e)",                  vi:"đã kết hôn" },
          { fr:"le/la petit(e) ami(e)",     vi:"bạn trai / bạn gái" },
        ]
      },
      {
        id: "u2g7", label: "Les professions", icon: "💼",
        words: [
          { fr:"l'acteur, l'actrice",           vi:"diễn viên (nam / nữ)" },
          { fr:"le coiffeur, la coiffeuse",     vi:"thợ làm tóc (nam / nữ)" },
          { fr:"l'étudiant(e)",                 vi:"sinh viên" },
          { fr:"le/la fleuriste",               vi:"người bán hoa" },
          { fr:"l'infirmier, l'infirmière",     vi:"y tá (nam / nữ)" },
          { fr:"l'informaticien(ne)",           vi:"kỹ thuật viên tin học" },
          { fr:"le/la professeur(e)",           vi:"giáo viên / giáo sư" },
        ]
      },
    ]
  },

  // ── Unité 3 — Qu'est-ce qu'on mange ? ────────────────────────
  {
    id: "u3", num: "3", title: "Qu'est-ce qu'on mange ?",
    color: "#D97706", bg: "#FFFBEB",
    groups: [
      {
        id: "u3g1", label: "Les commerces / Les commerçants", icon: "🏪",
        words: [
          { fr:"la boucherie — le boucher, la bouchère",               vi:"tiệm thịt — người bán thịt (nam / nữ)" },
          { fr:"la boulangerie — le boulanger, la boulangère",         vi:"tiệm bánh mì — thợ làm bánh (nam / nữ)" },
          { fr:"l'épicerie (f.) — l'épicier, l'épicière",             vi:"cửa hàng tạp hóa — người bán tạp hóa" },
          { fr:"la fromagerie — le fromager, la fromagère",            vi:"tiệm phô mai — người bán phô mai" },
          { fr:"la poissonnerie — le poissonnier, la poissonnière",    vi:"tiệm cá — người bán cá" },
          { fr:"le marché",                                            vi:"chợ" },
          { fr:"le supermarché",                                       vi:"siêu thị" },
        ]
      },
      {
        id: "u3g2", label: "Les aliments — les fruits", icon: "🍎",
        words: [
          { fr:"l'abricot (m.)",   vi:"quả mơ" },
          { fr:"la cerise",        vi:"quả anh đào" },
          { fr:"la fraise",        vi:"quả dâu tây" },
          { fr:"la pêche",         vi:"quả đào" },
          { fr:"la pomme",         vi:"quả táo" },
          { fr:"la tomate",        vi:"quả cà chua" },
        ]
      },
      {
        id: "u3g3", label: "Les aliments — les légumes", icon: "🥦",
        words: [
          { fr:"la courgette",            vi:"bí xanh" },
          { fr:"les haricots verts (m.)", vi:"đậu que xanh" },
          { fr:"le poivron",              vi:"ớt chuông" },
          { fr:"la pomme de terre",       vi:"khoai tây" },
          { fr:"la salade",               vi:"rau xà lách" },
        ]
      },
      {
        id: "u3g4", label: "Les aliments — pain, laitiers, céréales", icon: "🥐",
        words: [
          { fr:"la baguette",                vi:"bánh mì baguette" },
          { fr:"le croissant",               vi:"bánh sừng bò" },
          { fr:"l'huile d'olive (f.)",       vi:"dầu ô-liu" },
          { fr:"le beurre",                  vi:"bơ" },
          { fr:"la crème",                   vi:"kem tươi" },
          { fr:"le fromage (de chèvre)",     vi:"phô mai (dê)" },
          { fr:"le yaourt",                  vi:"sữa chua" },
          { fr:"la farine",                  vi:"bột mì" },
          { fr:"les pâtes (f.)",             vi:"mì ống / pasta" },
          { fr:"le riz",                     vi:"gạo / cơm" },
          { fr:"l'œuf (m.)",                 vi:"quả trứng" },
          { fr:"le poisson",                 vi:"cá" },
          { fr:"le poulet",                  vi:"thịt gà" },
          { fr:"la viande",                  vi:"thịt" },
        ]
      },
      {
        id: "u3g5", label: "Les quantités", icon: "⚖️",
        words: [
          { fr:"une boîte de…",    vi:"một hộp..." },
          { fr:"une bouteille de…",vi:"một chai..." },
          { fr:"un kilo de…",      vi:"một kilo..." },
          { fr:"un panier de…",    vi:"một giỏ..." },
          { fr:"un paquet de…",    vi:"một gói..." },
          { fr:"un pot de…",       vi:"một hũ / lọ..." },
        ]
      },
      {
        id: "u3g6", label: "Les moyens de paiement", icon: "💳",
        words: [
          { fr:"la carte bancaire / bleue", vi:"thẻ ngân hàng" },
          { fr:"les espèces (f.)",          vi:"tiền mặt" },
        ]
      },
      {
        id: "u3g7", label: "Au restaurant", icon: "🍽️",
        words: [
          { fr:"l'addition (f.)",                    vi:"hóa đơn" },
          { fr:"la formule",                         vi:"thực đơn cố định" },
          { fr:"la carte",                           vi:"thực đơn (tự chọn)" },
          { fr:"le menu",                            vi:"thực đơn cố định" },
          { fr:"le plat du jour",                    vi:"món đặc biệt hôm nay" },
          { fr:"le/la chef(fe)",                     vi:"đầu bếp chính" },
          { fr:"commander",                          vi:"gọi món" },
          { fr:"l'entrée (f.)",                      vi:"món khai vị" },
          { fr:"le plat",                            vi:"món chính" },
          { fr:"le dessert",                         vi:"món tráng miệng" },
          { fr:"le sel",                             vi:"muối" },
          { fr:"le poivre",                          vi:"tiêu" },
          { fr:"le sucre",                           vi:"đường" },
        ]
      },
      {
        id: "u3g8", label: "Les boissons", icon: "☕",
        words: [
          { fr:"le café",              vi:"cà phê" },
          { fr:"le café crème",        vi:"cà phê kem" },
          { fr:"l'eau (f.)",             vi:"nước" },
          { fr:"le jus de fruits",       vi:"nước ép trái cây" },
          { fr:"le soda",                vi:"nước ngọt có ga" },
          { fr:"le thé",                 vi:"trà" },
        ]
      },
      {
        id: "u3g9", label: "Les plats", icon: "🥩",
        words: [
          { fr:"la blanquette de veau",        vi:"thịt bê hầm kem" },
          { fr:"le croque-monsieur végétarien",vi:"bánh mì kẹp nướng chay" },
          { fr:"l'omelette (f.)",              vi:"trứng tráng" },
          { fr:"le steak-frites",              vi:"bít-tết kèm khoai chiên" },
          { fr:"le magret de canard",          vi:"ức vịt áp chảo" },
          { fr:"la quiche",                    vi:"bánh quiche mặn" },
        ]
      },
      {
        id: "u3g10", label: "Les desserts", icon: "🍰",
        words: [
          { fr:"le gâteau / la mousse au chocolat", vi:"bánh / mousse sô-cô-la" },
          { fr:"la glace",                          vi:"kem" },
          { fr:"le riz au lait",                    vi:"cháo gạo ngọt sữa" },
          { fr:"la tarte aux pommes",               vi:"bánh tart táo" },
        ]
      },
      {
        id: "u3g11", label: "La vaisselle", icon: "🍴",
        words: [
          { fr:"l'assiette (f.)",                    vi:"cái đĩa" },
          { fr:"la carafe",                          vi:"bình nước" },
          { fr:"le couteau",    vi:"dao" },
          { fr:"la cuillère",  vi:"thìa" },
          { fr:"la fourchette",vi:"nĩa" },
          { fr:"le verre",                           vi:"cái ly / cốc" },
        ]
      },
    ]
  },

  // ── Unité 4 — C'est où ? ─────────────────────────────────────
  {
    id: "u4", num: "4", title: "C'est où ?",
    color: "#059669", bg: "#ECFDF5",
    groups: [
      {
        id: "u4g1", label: "Les voies", icon: "🛣️",
        words: [
          { fr:"l'avenue (f.)", vi:"đại lộ" },
          { fr:"le boulevard",  vi:"đường lớn" },
          { fr:"le fleuve",     vi:"sông lớn" },
          { fr:"la place",      vi:"quảng trường" },
          { fr:"le pont",       vi:"cây cầu" },
          { fr:"le quai",       vi:"bờ sông / bến tàu" },
          { fr:"la rue",        vi:"con phố" },
        ]
      },
      {
        id: "u4g2", label: "Les parties de la ville", icon: "🏙️",
        words: [
          { fr:"la banlieue",    vi:"vùng ngoại ô" },
          { fr:"le centre-ville",vi:"trung tâm thành phố" },
          { fr:"le quartier",    vi:"khu phố" },
        ]
      },
      {
        id: "u4g3", label: "Les lieux et monuments", icon: "🏛️",
        words: [
          { fr:"la banque",          vi:"ngân hàng" },
          { fr:"le bâtiment",        vi:"tòa nhà" },
          { fr:"la bibliothèque",    vi:"thư viện" },
          { fr:"le commissariat",    vi:"đồn cảnh sát" },
          { fr:"l'école (f.)",       vi:"trường học" },
          { fr:"l'église (f.)",      vi:"nhà thờ" },
          { fr:"la fontaine",        vi:"đài phun nước" },
          { fr:"la gare",            vi:"ga tàu hỏa" },
          { fr:"le jardin",          vi:"vườn hoa công cộng" },
          { fr:"la mairie",          vi:"tòa thị chính" },
          { fr:"le musée",           vi:"bảo tàng" },
          { fr:"le parc",            vi:"công viên" },
          { fr:"la poste",           vi:"bưu điện" },
          { fr:"le théâtre",         vi:"nhà hát" },
        ]
      },
      {
        id: "u4g4", label: "Les personnes", icon: "👥",
        words: [
          { fr:"les habitants",  vi:"cư dân / người dân" },
          { fr:"les touristes",  vi:"du khách" },
        ]
      },
      {
        id: "u4g5", label: "Les transports", icon: "🚇",
        words: [
          { fr:"à pied",                          vi:"đi bộ" },
          { fr:"à trottinette — la trottinette (f.)", vi:"bằng xe trượt điện" },
          { fr:"à vélo — le vélo",                vi:"bằng xe đạp" },
          { fr:"en bus — le bus",                 vi:"bằng xe buýt" },
          { fr:"en métro — le métro",             vi:"bằng tàu điện ngầm" },
          { fr:"en tramway — le tramway",         vi:"bằng tàu điện" },
          { fr:"en train — le train",             vi:"bằng tàu hỏa" },
          { fr:"en voiture — la voiture",         vi:"bằng ô tô" },
          { fr:"le covoiturage",                  vi:"đi chung xe" },
          { fr:"les transports en commun (m.)",   vi:"phương tiện công cộng" },
        ]
      },
      {
        id: "u4g6", label: "Se déplacer", icon: "🗺️",
        words: [
          { fr:"l'arrêt (m.)",          vi:"bến / trạm dừng" },
          { fr:"la carte de transport", vi:"thẻ đi lại" },
          { fr:"l'itinéraire (m.)",     vi:"lộ trình" },
          { fr:"la ligne",              vi:"tuyến (tàu / bus)" },
          { fr:"la station",            vi:"nhà ga (tàu điện ngầm)" },
          { fr:"le ticket",             vi:"vé" },
        ]
      },
      {
        id: "u4g7", label: "Demander / indiquer le chemin", icon: "🧭",
        words: [
          { fr:"Excusez-moi, on cherche…",                             vi:"Xin lỗi, chúng tôi đang tìm..." },
          { fr:"Où est l'arrêt de bus (s'il vous plaît) ?",           vi:"Bến xe buýt ở đâu (làm ơn) ?" },
          { fr:"Tournez / Prenez à gauche / à droite.",                vi:"Rẽ trái / phải." },
          { fr:"Continuez tout droit.",                                vi:"Đi thẳng." },
          { fr:"Prenez la première / deuxième / troisième rue à droite.", vi:"Rẽ vào phố đầu / thứ hai / thứ ba bên phải." },
        ]
      },
      {
        id: "u4g8", label: "En transports en commun", icon: "🚌",
        words: [
          { fr:"Pour aller du… au / à la…", vi:"Để đi từ... đến..." },
          { fr:"Prenez la ligne…",          vi:"Đi tuyến..." },
          { fr:"Descendez à l'arrêt…",      vi:"Xuống ở trạm..." },
        ]
      },
      {
        id: "u4g9", label: "Les nombres (3) — 100 à 1 milliard", icon: "🔢",
        words: [
          { fr:"cent (100)",                    vi:"một trăm" },
          { fr:"trois cent cinquante-deux (352)",vi:"ba trăm năm mươi hai" },
          { fr:"mille (1 000)",                 vi:"một nghìn" },
          { fr:"deux mille (2 000)",            vi:"hai nghìn" },
          { fr:"dix mille (10 000)",            vi:"mười nghìn" },
          { fr:"un million (1 000 000)",        vi:"một triệu" },
          { fr:"deux millions (2 000 000)",     vi:"hai triệu" },
          { fr:"un milliard (1 000 000 000)",   vi:"một tỷ" },
        ]
      },
      {
        id: "u4g10", label: "La fréquence (1)", icon: "🔄",
        words: [
          { fr:"toujours",              vi:"luôn luôn" },
          { fr:"souvent",               vi:"thường xuyên" },
          { fr:"jamais (ne… jamais)",   vi:"không bao giờ (chỉ dùng với phủ định)" },
        ]
      },
    ]
  },

  // ── Unité 5 — C'est tendance ! ───────────────────────────────
  {
    id: "u5", num: "5", title: "C'est tendance !",
    color: "#8E44AD", bg: "#F5EEFF",
    groups: [
      {
        id: "u5g1", label: "Les vêtements", icon: "👗",
        words: [
          { fr:"la chemise",          vi:"áo sơ mi",     pos:"Danh từ (f.)", ipa:"ʃə.miz",     ex_fr:"Il porte une chemise blanche.",        ex_vi:"Anh ấy mặc một chiếc áo sơ mi trắng." },
          { fr:"le costume",          vi:"bộ vest",      pos:"Danh từ (m.)", ipa:"kɔs.tym",    ex_fr:"Elle achète un costume pour l'entretien.", ex_vi:"Cô ấy mua một bộ vest để đi phỏng vấn." },
          { fr:"le gilet",            vi:"áo gile",      pos:"Danh từ (m.)", ipa:"ʒi.lɛ",      ex_fr:"Il met un gilet avant de sortir.",     ex_vi:"Anh ấy mặc áo gile trước khi ra ngoài." },
          { fr:"l'imperméable (m.)",  vi:"áo mưa",       pos:"Danh từ (m.)", ipa:"ɛ̃.pɛʁ.me.abl", ex_fr:"Prends ton imperméable, il pleut.",  ex_vi:"Mang áo mưa theo, trời đang mưa." },
          { fr:"la jupe",             vi:"chân váy",     pos:"Danh từ (f.)", ipa:"ʒyp",        ex_fr:"Elle porte une jupe noire.",           ex_vi:"Cô ấy mặc một chiếc chân váy đen." },
          { fr:"le manteau",          vi:"áo khoác dài", pos:"Danh từ (m.)", ipa:"mɑ̃.to",      ex_fr:"Il fait froid, mets ton manteau.",     ex_vi:"Trời lạnh, mặc áo khoác dài vào đi." },
          { fr:"le pantalon",         vi:"quần dài",     pos:"Danh từ (m.)", ipa:"pɑ̃.ta.lɔ̃",   ex_fr:"Ce pantalon est trop grand.",          ex_vi:"Cái quần dài này quá rộng." },
          { fr:"le jean",             vi:"quần jeans",   pos:"Danh từ (m.)", ipa:"dʒin",       ex_fr:"J'aime porter un jean et un tee-shirt.", ex_vi:"Tôi thích mặc quần jeans với áo thun." },
          { fr:"le pull",             vi:"áo len",       pos:"Danh từ (m.)", ipa:"pyl",        ex_fr:"Elle porte un pull rouge en hiver.",   ex_vi:"Cô ấy mặc áo len đỏ vào mùa đông." },
          { fr:"la robe",             vi:"váy đầm",      pos:"Danh từ (f.)", ipa:"ʁɔb",        ex_fr:"Cette robe te va très bien.",          ex_vi:"Chiếc váy đầm này hợp với bạn lắm." },
          { fr:"le short",            vi:"quần short",   pos:"Danh từ (m.)", ipa:"ʃɔʁt",       ex_fr:"Il porte un short pour faire du sport.", ex_vi:"Anh ấy mặc quần short để tập thể thao." },
          { fr:"le tee-shirt",        vi:"áo phông",     pos:"Danh từ (m.)", ipa:"ti.ʃœʁt",    ex_fr:"J'ai acheté un tee-shirt blanc.",      ex_vi:"Tôi mua một cái áo phông trắng." },
          { fr:"la veste",            vi:"áo jacket",    pos:"Danh từ (f.)", ipa:"vɛst",       ex_fr:"Elle enlève sa veste en entrant.",     ex_vi:"Cô ấy cởi áo jacket khi bước vào." },
        ]
      },
      {
        id: "u5g2", label: "Les accessoires", icon: "👜",
        words: [
          { fr:"le(s) bijou(x)",      vi:"đồ trang sức", pos:"Danh từ (m.)", ipa:"bi.ʒu",      ex_fr:"Elle porte toujours des bijoux.",      ex_vi:"Cô ấy luôn đeo trang sức." },
          { fr:"la ceinture",         vi:"thắt lưng",    pos:"Danh từ (f.)", ipa:"sɛ̃.tyʁ",     ex_fr:"Il met une ceinture noire.",           ex_vi:"Anh ấy đeo một chiếc thắt lưng đen." },
          { fr:"le chapeau",          vi:"mũ rộng vành", pos:"Danh từ (m.)", ipa:"ʃa.po",      ex_fr:"Elle porte un chapeau sur la plage.",  ex_vi:"Cô ấy đội mũ rộng vành ở bãi biển." },
          { fr:"les chaussures (f.)", vi:"giày",         pos:"Danh từ (f. pl.)", ipa:"ʃo.syʁ", ex_fr:"J'ai besoin de nouvelles chaussures.", ex_vi:"Tôi cần mua giày mới." },
          { fr:"les baskets (f.)",    vi:"giày thể thao", pos:"Danh từ (f. pl.)", ipa:"bas.kɛt", ex_fr:"Il court avec ses baskets blanches.", ex_vi:"Anh ấy chạy bộ với giày thể thao trắng." },
          { fr:"les bottes (f.)",     vi:"giày ống / ủng", pos:"Danh từ (f. pl.)", ipa:"bɔt",  ex_fr:"Elle met des bottes quand il pleut.",  ex_vi:"Cô ấy đi ủng khi trời mưa." },
          { fr:"la cravate",          vi:"cà vạt",       pos:"Danh từ (f.)", ipa:"kʁa.vat",    ex_fr:"Il porte une cravate au bureau.",      ex_vi:"Anh ấy đeo cà vạt khi đi làm." },
          { fr:"les lunettes de soleil (f.)", vi:"kính mát", pos:"Danh từ (f. pl.)", ipa:"ly.nɛt də sɔ.lɛj", ex_fr:"N'oublie pas tes lunettes de soleil.", ex_vi:"Đừng quên kính mát của bạn." },
          { fr:"le parapluie",        vi:"ô / dù",       pos:"Danh từ (m.)", ipa:"pa.ʁa.plɥi", ex_fr:"Prends ton parapluie, il va pleuvoir.", ex_vi:"Mang ô theo, trời sắp mưa." },
          { fr:"le sac à main",       vi:"túi xách tay", pos:"Danh từ (m.)", ipa:"sak a mɛ̃",   ex_fr:"Elle a perdu son sac à main.",         ex_vi:"Cô ấy bị mất túi xách tay." },
        ]
      },
      {
        id: "u5g3", label: "Les couleurs", icon: "🎨",
        words: [
          { fr:"blanc / blanche", vi:"trắng",      pos:"Tính từ", ipa:"blɑ̃ / blɑ̃ʃ", ex_fr:"Une chemise blanche.", ex_vi:"Một chiếc áo sơ mi trắng." },
          { fr:"bleu(e)",         vi:"xanh dương", pos:"Tính từ", ipa:"blø",          ex_fr:"Le ciel est bleu.",     ex_vi:"Bầu trời màu xanh." },
          { fr:"gris(e)",         vi:"xám",        pos:"Tính từ", ipa:"gʁi / gʁiz",   ex_fr:"Un pantalon gris.",     ex_vi:"Một cái quần xám." },
          { fr:"jaune",           vi:"vàng",       pos:"Tính từ", ipa:"ʒon",          ex_fr:"Le soleil est jaune.",  ex_vi:"Mặt trời màu vàng." },
          { fr:"marron",          vi:"nâu",        pos:"Tính từ", ipa:"ma.ʁɔ̃",       ex_fr:"Des yeux marron.",      ex_vi:"Đôi mắt màu nâu." },
          { fr:"noir(e)",         vi:"đen",        pos:"Tính từ", ipa:"nwaʁ",         ex_fr:"Un café noir.",         ex_vi:"Một ly cà phê đen." },
          { fr:"rose",            vi:"hồng",       pos:"Tính từ", ipa:"ʁoz",          ex_fr:"Une robe rose.",        ex_vi:"Một chiếc váy hồng." },
          { fr:"rouge",           vi:"đỏ",         pos:"Tính từ", ipa:"ʁuʒ",          ex_fr:"Une pomme rouge.",      ex_vi:"Một quả táo đỏ." },
          { fr:"vert(e)",         vi:"xanh lá",    pos:"Tính từ", ipa:"vɛʁ / vɛʁt",   ex_fr:"L'herbe est verte.",    ex_vi:"Cỏ màu xanh lá." },
        ]
      },
      {
        id: "u5g4", label: "Les matières", icon: "🧵",
        words: [
          { fr:"en coton (m.)", vi:"bằng vải cotton", pos:"Cụm danh từ", ipa:"ɑ̃ kɔ.tɔ̃", ex_fr:"Ce tee-shirt est en coton.",  ex_vi:"Cái áo phông này làm bằng vải cotton." },
          { fr:"en cuir (m.)",  vi:"bằng da",         pos:"Cụm danh từ", ipa:"ɑ̃ kɥiʁ",  ex_fr:"J'aime les sacs en cuir.",    ex_vi:"Tôi thích những chiếc túi bằng da." },
          { fr:"en jean (m.)",  vi:"bằng vải jeans",  pos:"Cụm danh từ", ipa:"ɑ̃ dʒin",  ex_fr:"Elle porte une veste en jean.", ex_vi:"Cô ấy mặc áo khoác bằng vải jeans." },
          { fr:"en laine (f.)", vi:"bằng len",        pos:"Cụm danh từ", ipa:"ɑ̃ lɛn",   ex_fr:"Ce pull en laine est très chaud.", ex_vi:"Cái áo len này rất ấm." },
        ]
      },
      {
        id: "u5g5", label: "La météo et les températures", icon: "🌦️",
        words: [
          { fr:"le(s) degré(s) (m.)", vi:"độ (nhiệt độ)",   pos:"Danh từ (m.)", ipa:"də.gʁe",  ex_fr:"Il fait dix degrés ce matin.",  ex_vi:"Sáng nay nhiệt độ là mười độ." },
          { fr:"la neige",            vi:"tuyết",           pos:"Danh từ (f.)", ipa:"nɛʒ",     ex_fr:"La neige tombe sur la montagne.", ex_vi:"Tuyết đang rơi trên núi." },
          { fr:"le nuage",            vi:"đám mây",         pos:"Danh từ (m.)", ipa:"nɥaʒ",    ex_fr:"Le ciel est couvert de nuages.", ex_vi:"Bầu trời đầy mây." },
          { fr:"l'orage (m.)",        vi:"cơn giông bão",   pos:"Danh từ (m.)", ipa:"ɔ.ʁaʒ",   ex_fr:"Il y a un orage ce soir.",       ex_vi:"Tối nay có giông bão." },
          { fr:"la pluie",            vi:"mưa",             pos:"Danh từ (f.)", ipa:"plɥi",    ex_fr:"La pluie tombe depuis ce matin.", ex_vi:"Mưa rơi từ sáng đến giờ." },
          { fr:"le soleil",           vi:"mặt trời / nắng", pos:"Danh từ (m.)", ipa:"sɔ.lɛj",  ex_fr:"Le soleil brille aujourd'hui.",  ex_vi:"Hôm nay nắng đẹp." },
          { fr:"le vent",             vi:"gió",             pos:"Danh từ (m.)", ipa:"vɑ̃",     ex_fr:"Il y a beaucoup de vent.",       ex_vi:"Hôm nay gió thổi nhiều." },
        ]
      },
      {
        id: "u5g6", label: "Les objets technologiques", icon: "📱",
        words: [
          { fr:"la batterie (externe)",         vi:"pin dự phòng",          pos:"Danh từ (f.)", ipa:"ba.tə.ʁi", ex_fr:"J'ai oublié ma batterie externe.", ex_vi:"Tôi quên mang pin dự phòng." },
          { fr:"les écouteurs (m.) (sans fil)", vi:"tai nghe (không dây)",  pos:"Danh từ (m. pl.)", ipa:"e.ku.tœʁ", ex_fr:"Il écoute de la musique avec ses écouteurs.", ex_vi:"Anh ấy nghe nhạc bằng tai nghe." },
          { fr:"l'enceinte Bluetooth (f.)",      vi:"loa Bluetooth",        pos:"Danh từ (f.)", ipa:"ɑ̃.sɛ̃t blu.tuθ", ex_fr:"On écoute de la musique avec l'enceinte Bluetooth.", ex_vi:"Mọi người nghe nhạc bằng loa Bluetooth." },
          { fr:"la montre connectée",            vi:"đồng hồ thông minh",   pos:"Danh từ (f.)", ipa:"mɔ̃tʁ kɔ.nɛk.te", ex_fr:"Elle porte une montre connectée.", ex_vi:"Cô ấy đeo một chiếc đồng hồ thông minh." },
          { fr:"l'ordinateur (m.) (portable)",   vi:"máy tính (xách tay)",  pos:"Danh từ (m.)", ipa:"ɔʁ.di.na.tœʁ", ex_fr:"Mon ordinateur portable est cassé.", ex_vi:"Máy tính xách tay của tôi bị hỏng." },
          { fr:"la tablette",                    vi:"máy tính bảng",       pos:"Danh từ (f.)", ipa:"ta.blɛt", ex_fr:"Les enfants jouent sur la tablette.", ex_vi:"Mấy đứa trẻ chơi trên máy tính bảng." },
          { fr:"le téléphone (portable) / le smartphone", vi:"điện thoại (di động) / smartphone", pos:"Danh từ (m.)", ipa:"te.le.fɔn pɔʁ.tabl", ex_fr:"J'ai perdu mon téléphone portable.", ex_vi:"Tôi bị mất điện thoại di động." },
        ]
      },
      {
        id: "u5g7", label: "Les objets du quotidien", icon: "🎒",
        words: [
          { fr:"le cadre photo",   vi:"khung ảnh",       pos:"Danh từ (m.)", ipa:"kadʁ fɔ.to",   ex_fr:"Elle met une photo dans le cadre.", ex_vi:"Cô ấy đặt một bức ảnh vào khung." },
          { fr:"le porte-clés",    vi:"móc chìa khóa",   pos:"Danh từ (m.)", ipa:"pɔʁt kle",     ex_fr:"J'ai un porte-clés en forme de cœur.", ex_vi:"Tôi có một cái móc chìa khóa hình tim." },
          { fr:"le portefeuille",  vi:"ví tiền",         pos:"Danh từ (m.)", ipa:"pɔʁ.tə.fœj",   ex_fr:"Il a oublié son portefeuille à la maison.", ex_vi:"Anh ấy quên ví tiền ở nhà." },
          { fr:"le porte-monnaie", vi:"ví đựng tiền lẻ", pos:"Danh từ (m.)", ipa:"pɔʁt mɔ.nɛ",   ex_fr:"Elle range ses pièces dans le porte-monnaie.", ex_vi:"Cô ấy cất tiền xu vào ví đựng tiền lẻ." },
          { fr:"le sac à dos",     vi:"ba lô",           pos:"Danh từ (m.)", ipa:"sak a do",     ex_fr:"Il porte un sac à dos pour aller au cours.", ex_vi:"Anh ấy đeo ba lô đi học." },
          { fr:"le sac de sport",  vi:"túi thể thao",    pos:"Danh từ (m.)", ipa:"sak də spɔʁ",  ex_fr:"Elle met ses affaires dans le sac de sport.", ex_vi:"Cô ấy để đồ vào túi thể thao." },
          { fr:"la valise",        vi:"va-li",           pos:"Danh từ (f.)", ipa:"va.liz",       ex_fr:"Je fais ma valise pour les vacances.", ex_vi:"Tôi đang xếp va-li để đi nghỉ." },
        ]
      },
      {
        id: "u5g8", label: "La description des objets", icon: "📐",
        words: [
          { fr:"carré(e)",            vi:"hình vuông",  pos:"Tính từ", ipa:"ka.ʁe",         ex_fr:"La table est carrée.",          ex_vi:"Cái bàn có hình vuông." },
          { fr:"rond(e)",             vi:"hình tròn",   pos:"Tính từ", ipa:"ʁɔ̃",           ex_fr:"Ce miroir est rond.",            ex_vi:"Cái gương này có hình tròn." },
          { fr:"rectangulaire",       vi:"hình chữ nhật", pos:"Tính từ", ipa:"ʁɛk.tɑ̃.gy.lɛʁ", ex_fr:"La boîte est rectangulaire.",  ex_vi:"Cái hộp có hình chữ nhật." },
          { fr:"léger ≠ lourd",       vi:"nhẹ ≠ nặng",  pos:"Tính từ", ipa:"le.ʒe ≠ luʁ",   ex_fr:"Ce sac est léger, pas lourd.",   ex_vi:"Cái túi này nhẹ, không nặng." },
          { fr:"petit(e) ≠ grand(e)",vi:"nhỏ ≠ lớn",    pos:"Tính từ", ipa:"pə.ti ≠ gʁɑ̃",   ex_fr:"Cette valise est petite.",       ex_vi:"Cái va-li này nhỏ." },
        ]
      },
    ]
  },

  // ── Unité 6 — Qu'est-ce qu'on fait aujourd'hui ? ────────────
  {
    id: "u6", num: "6", title: "Qu'est-ce qu'on fait aujourd'hui ?",
    color: "#0D9488", bg: "#F0FDFA",
    groups: [
      {
        id: "u6g1", label: "Les heures", icon: "🕐",
        words: [
          { fr:"9 h (du matin)",          vi:"9 giờ sáng",            pos:"Cụm từ chỉ giờ", ipa:"nœf œʁ dy ma.tɛ̃",       ex_fr:"Le cours commence à neuf heures.",      ex_vi:"Buổi học bắt đầu vào 9 giờ." },
          { fr:"9 h 05",                  vi:"9 giờ 5 phút",          pos:"Cụm từ chỉ giờ", ipa:"nœf œʁ sɛ̃k",            ex_fr:"Il est neuf heures cinq.",              ex_vi:"Bây giờ là 9 giờ 5 phút." },
          { fr:"9 h 15 (et quart)",       vi:"9 giờ 15 (một phần tư)",pos:"Cụm từ chỉ giờ", ipa:"nœf œʁ e kaʁ",          ex_fr:"On part à neuf heures et quart.",       ex_vi:"Chúng ta xuất phát lúc 9 giờ 15." },
          { fr:"9 h 30 (et demie)",       vi:"9 giờ rưỡi",            pos:"Cụm từ chỉ giờ", ipa:"nœf œʁ e də.mi",        ex_fr:"Le rendez-vous est à neuf heures et demie.", ex_vi:"Cuộc hẹn vào 9 giờ rưỡi." },
          { fr:"9 h 45 (moins le quart)", vi:"9 giờ 45 (kém một phần tư)", pos:"Cụm từ chỉ giờ", ipa:"dis œʁ mwɛ̃ lə kaʁ", ex_fr:"Il est dix heures moins le quart.",  ex_vi:"Bây giờ là 10 giờ kém 15." },
          { fr:"9 h 50 (moins dix)",      vi:"9 giờ 50 (kém mười)",   pos:"Cụm từ chỉ giờ", ipa:"dis œʁ mwɛ̃ dis",       ex_fr:"Il est dix heures moins dix.",          ex_vi:"Bây giờ là 10 giờ kém 10." },
          { fr:"12 h (midi)",             vi:"12 giờ trưa",           pos:"Danh từ (m.)", ipa:"mi.di",                   ex_fr:"On mange à midi.",                      ex_vi:"Chúng ta ăn vào buổi trưa." },
          { fr:"16 h (4 h de l'après-midi)", vi:"16 giờ (4 giờ chiều)", pos:"Cụm từ chỉ giờ", ipa:"sɛz œʁ",              ex_fr:"La réunion est à seize heures.",        ex_vi:"Cuộc họp vào lúc 16 giờ." },
          { fr:"21 h (9 h du soir)",      vi:"21 giờ (9 giờ tối)",    pos:"Cụm từ chỉ giờ", ipa:"vɛ̃t e œ̃n œʁ",          ex_fr:"Le film commence à vingt et une heures.", ex_vi:"Bộ phim bắt đầu lúc 21 giờ." },
          { fr:"0 h (minuit)",            vi:"0 giờ (nửa đêm)",       pos:"Danh từ (m.)", ipa:"mi.nɥi",                  ex_fr:"Je me couche après minuit.",            ex_vi:"Tôi đi ngủ sau nửa đêm." },
        ]
      },
      {
        id: "u6gjms", label: "Les jours, mois et saisons", icon: "📅",
        words: [
          { fr:"lundi",        vi:"thứ Hai",  pos:"Danh từ", ipa:"lœ̃.di",       ex_fr:"Je travaille lundi.",        ex_vi:"Tôi làm việc thứ Hai." },
          { fr:"mardi",        vi:"thứ Ba",   pos:"Danh từ", ipa:"maʁ.di",       ex_fr:"On se voit mardi ?",         ex_vi:"Thứ Ba mình gặp nhau nhé?" },
          { fr:"mercredi",     vi:"thứ Tư",   pos:"Danh từ", ipa:"mɛʁ.kʁə.di",   ex_fr:"Le cours est mercredi.",     ex_vi:"Buổi học vào thứ Tư." },
          { fr:"jeudi",        vi:"thứ Năm",  pos:"Danh từ", ipa:"ʒø.di",        ex_fr:"Jeudi, je suis libre.",      ex_vi:"Thứ Năm tôi rảnh." },
          { fr:"vendredi",     vi:"thứ Sáu",  pos:"Danh từ", ipa:"vɑ̃.dʁə.di",   ex_fr:"Vendredi soir, on sort.",    ex_vi:"Tối thứ Sáu tụi mình đi chơi." },
          { fr:"samedi",       vi:"thứ Bảy",  pos:"Danh từ", ipa:"sam.di",       ex_fr:"Samedi, je fais les courses.", ex_vi:"Thứ Bảy tôi đi chợ." },
          { fr:"dimanche",     vi:"Chủ nhật", pos:"Danh từ", ipa:"di.mɑ̃ʃ",      ex_fr:"Dimanche, je me repose.",    ex_vi:"Chủ nhật tôi nghỉ ngơi." },
          { fr:"janvier",      vi:"tháng Một",      pos:"Danh từ", ipa:"ʒɑ̃.vje",     ex_fr:"Mon anniversaire est en janvier.", ex_vi:"Sinh nhật tôi vào tháng Một." },
          { fr:"février",      vi:"tháng Hai",      pos:"Danh từ", ipa:"fe.vʁi.je",   ex_fr:"Il fait froid en février.",  ex_vi:"Tháng Hai trời lạnh." },
          { fr:"mars",         vi:"tháng Ba",       pos:"Danh từ", ipa:"maʁs",        ex_fr:"Le printemps commence en mars.", ex_vi:"Mùa xuân bắt đầu tháng Ba." },
          { fr:"avril",        vi:"tháng Tư",       pos:"Danh từ", ipa:"a.vʁil",      ex_fr:"En avril, il pleut souvent.", ex_vi:"Tháng Tư hay mưa." },
          { fr:"mai",          vi:"tháng Năm",      pos:"Danh từ", ipa:"mɛ",          ex_fr:"On est en mai.",             ex_vi:"Bây giờ là tháng Năm." },
          { fr:"juin",         vi:"tháng Sáu",      pos:"Danh từ", ipa:"ʒɥɛ̃",        ex_fr:"Les vacances sont en juin.", ex_vi:"Kỳ nghỉ vào tháng Sáu." },
          { fr:"juillet",      vi:"tháng Bảy",      pos:"Danh từ", ipa:"ʒɥi.jɛ",      ex_fr:"Il fait chaud en juillet.",  ex_vi:"Tháng Bảy trời nóng." },
          { fr:"août",         vi:"tháng Tám",      pos:"Danh từ", ipa:"ut",          ex_fr:"Je voyage en août.",         ex_vi:"Tôi đi du lịch tháng Tám." },
          { fr:"septembre",    vi:"tháng Chín",     pos:"Danh từ", ipa:"sɛp.tɑ̃bʁ",   ex_fr:"L'école commence en septembre.", ex_vi:"Trường học bắt đầu tháng Chín." },
          { fr:"octobre",      vi:"tháng Mười",     pos:"Danh từ", ipa:"ɔk.tɔbʁ",     ex_fr:"En octobre, les feuilles tombent.", ex_vi:"Tháng Mười lá rụng." },
          { fr:"novembre",     vi:"tháng Mười Một", pos:"Danh từ", ipa:"nɔ.vɑ̃bʁ",    ex_fr:"Il fait gris en novembre.",  ex_vi:"Tháng Mười Một trời u ám." },
          { fr:"décembre",     vi:"tháng Mười Hai", pos:"Danh từ", ipa:"de.sɑ̃bʁ",    ex_fr:"Noël, c'est en décembre.",   ex_vi:"Giáng sinh vào tháng Mười Hai." },
          { fr:"le printemps", vi:"mùa xuân", pos:"Danh từ (m.)", ipa:"lə pʁɛ̃.tɑ̃", ex_fr:"J'aime le printemps.",       ex_vi:"Tôi thích mùa xuân." },
          { fr:"l'été (m.)",   vi:"mùa hè",   pos:"Danh từ (m.)", ipa:"le.te",       ex_fr:"En été, il fait chaud.",     ex_vi:"Mùa hè trời nóng." },
          { fr:"l'automne (m.)", vi:"mùa thu", pos:"Danh từ (m.)", ipa:"lo.tɔn",     ex_fr:"L'automne est ma saison préférée.", ex_vi:"Mùa thu là mùa tôi thích nhất." },
          { fr:"l'hiver (m.)", vi:"mùa đông", pos:"Danh từ (m.)", ipa:"li.vɛʁ",      ex_fr:"En hiver, il neige.",        ex_vi:"Mùa đông có tuyết rơi." },
          { fr:"aujourd'hui",  vi:"hôm nay",  pos:"Trạng từ", ipa:"o.ʒuʁ.dɥi",       ex_fr:"Aujourd'hui, c'est lundi.",  ex_vi:"Hôm nay là thứ Hai." },
          { fr:"demain",       vi:"ngày mai", pos:"Trạng từ", ipa:"də.mɛ̃",          ex_fr:"À demain !",                 ex_vi:"Hẹn mai gặp!" },
          { fr:"hier",         vi:"hôm qua",  pos:"Trạng từ", ipa:"jɛʁ",             ex_fr:"Hier, j'étais malade.",      ex_vi:"Hôm qua tôi bị ốm." },
        ]
      },
      {
        id: "u6g2", label: "Les activités quotidiennes", icon: "🌅",
        words: [
          { fr:"se brosser les dents",        vi:"đánh răng",   pos:"Động từ phản thân", ipa:"sə bʁɔ.se le dɑ̃", ex_fr:"Je me brosse les dents matin et soir.", ex_vi:"Tôi đánh răng vào sáng và tối." },
          { fr:"se coiffer",                  vi:"chải đầu",    pos:"Động từ phản thân", ipa:"sə kwa.fe",       ex_fr:"Elle se coiffe avant de sortir.",       ex_vi:"Cô ấy chải đầu trước khi ra ngoài." },
          { fr:"se coucher",                  vi:"đi ngủ",      pos:"Động từ phản thân", ipa:"sə ku.ʃe",        ex_fr:"Je me couche à dix heures.",            ex_vi:"Tôi đi ngủ vào lúc 10 giờ." },
          { fr:"se doucher",                  vi:"tắm vòi sen", pos:"Động từ phản thân", ipa:"sə du.ʃe",        ex_fr:"Il se douche tous les matins.",         ex_vi:"Anh ấy tắm vòi sen mỗi sáng." },
          { fr:"s'habiller",                  vi:"mặc quần áo", pos:"Động từ phản thân", ipa:"sa.bi.je",        ex_fr:"Elle s'habille rapidement.",            ex_vi:"Cô ấy mặc quần áo rất nhanh." },
          { fr:"se lever",                    vi:"ngồi dậy / dậy khỏi giường", pos:"Động từ phản thân", ipa:"sə lə.ve", ex_fr:"Je me lève à sept heures.",     ex_vi:"Tôi dậy lúc 7 giờ." },
          { fr:"se maquiller",                vi:"trang điểm",  pos:"Động từ phản thân", ipa:"sə ma.ki.je",     ex_fr:"Elle se maquille avant le travail.",    ex_vi:"Cô ấy trang điểm trước khi đi làm." },
          { fr:"s'occuper des enfants",       vi:"chăm sóc con cái", pos:"Cụm động từ", ipa:"sɔ.ky.pe de.z‿ɑ̃.fɑ̃", ex_fr:"Elle s'occupe des enfants l'après-midi.", ex_vi:"Cô ấy chăm sóc con cái vào buổi chiều." },
          { fr:"prendre son petit déjeuner",  vi:"ăn sáng",     pos:"Cụm động từ", ipa:"pʁɑ̃dʁ sɔ̃ pə.ti de.ʒœ.ne", ex_fr:"Je prends mon petit déjeuner à huit heures.", ex_vi:"Tôi ăn sáng vào lúc 8 giờ." },
          { fr:"se préparer",                 vi:"chuẩn bị",    pos:"Động từ phản thân", ipa:"sə pʁe.pa.ʁe",    ex_fr:"Il se prépare pour aller au travail.",  ex_vi:"Anh ấy chuẩn bị để đi làm." },
          { fr:"se raser",                    vi:"cạo râu",     pos:"Động từ phản thân", ipa:"sə ʁa.ze",        ex_fr:"Il se rase tous les jours.",            ex_vi:"Anh ấy cạo râu mỗi ngày." },
          { fr:"se réveiller",                vi:"thức dậy",    pos:"Động từ phản thân", ipa:"sə ʁe.vɛ.je",     ex_fr:"Je me réveille à six heures.",          ex_vi:"Tôi thức dậy lúc 6 giờ." },
        ]
      },
      {
        id: "u6g3", label: "Les activités de la maison", icon: "🏠",
        words: [
          { fr:"faire du bricolage",           vi:"làm đồ thủ công / sửa đồ nhà", pos:"Cụm động từ", ipa:"fɛʁ dy bʁi.kɔ.laʒ", ex_fr:"Mon père fait du bricolage le week-end.", ex_vi:"Bố tôi sửa đồ nhà vào cuối tuần." },
          { fr:"bricoler",                     vi:"tự sửa / làm thủ công",        pos:"Động từ", ipa:"bʁi.kɔ.le",         ex_fr:"Il aime bricoler dans son garage.",   ex_vi:"Anh ấy thích làm thủ công trong nhà xe." },
          { fr:"faire les courses",            vi:"đi mua đồ / đi chợ",           pos:"Cụm động từ", ipa:"fɛʁ le kuʁs",   ex_fr:"On fait les courses le samedi.",      ex_vi:"Chúng tôi đi chợ vào thứ Bảy." },
          { fr:"faire la cuisine",             vi:"nấu ăn",                       pos:"Cụm động từ", ipa:"fɛʁ la kɥi.zin", ex_fr:"Elle fait la cuisine tous les soirs.", ex_vi:"Cô ấy nấu ăn mỗi tối." },
          { fr:"cuisiner",                     vi:"nấu ăn",                       pos:"Động từ", ipa:"kɥi.zi.ne",        ex_fr:"J'aime cuisiner pour mes amis.",      ex_vi:"Tôi thích nấu ăn cho bạn bè." },
          { fr:"faire du jardinage",           vi:"làm vườn",                     pos:"Cụm động từ", ipa:"fɛʁ dy ʒaʁ.di.naʒ", ex_fr:"Mes parents font du jardinage le dimanche.", ex_vi:"Bố mẹ tôi làm vườn vào Chủ nhật." },
          { fr:"jardiner",                     vi:"làm vườn",                     pos:"Động từ", ipa:"ʒaʁ.di.ne",        ex_fr:"Elle jardine tous les week-ends.",    ex_vi:"Cô ấy làm vườn mỗi cuối tuần." },
          { fr:"faire une lessive",            vi:"giặt quần áo",                 pos:"Cụm động từ", ipa:"fɛʁ yn lə.siv", ex_fr:"Je fais une lessive le lundi.",       ex_vi:"Tôi giặt quần áo vào thứ Hai." },
          { fr:"faire à manger",               vi:"nấu bữa ăn",                   pos:"Cụm động từ", ipa:"fɛʁ a mɑ̃.ʒe", ex_fr:"Qui fait à manger ce soir ?",         ex_vi:"Tối nay ai nấu ăn?" },
          { fr:"faire le ménage",              vi:"dọn dẹp nhà cửa",              pos:"Cụm động từ", ipa:"fɛʁ lə me.naʒ", ex_fr:"Je fais le ménage chaque samedi.",    ex_vi:"Tôi dọn dẹp nhà cửa mỗi thứ Bảy." },
          { fr:"faire la vaisselle",           vi:"rửa bát đĩa",                  pos:"Cụm động từ", ipa:"fɛʁ la vɛ.sɛl", ex_fr:"Il fait la vaisselle après le dîner.", ex_vi:"Anh ấy rửa bát sau khi ăn tối." },
        ]
      },
      {
        id: "u6g4", label: "Le temps libre", icon: "🎭",
        words: [
          { fr:"aller à un cours de dessin", vi:"đi học lớp vẽ", pos:"Cụm động từ", ipa:"a.le a œ̃ kuʁ də de.sɛ̃", ex_fr:"Elle va à un cours de dessin le mercredi.", ex_vi:"Cô ấy đi học lớp vẽ vào thứ Tư." },
          { fr:"dessiner",                   vi:"vẽ",          pos:"Động từ", ipa:"de.si.ne",       ex_fr:"Mon fils aime dessiner.",             ex_vi:"Con trai tôi thích vẽ." },
          { fr:"écouter de la musique",      vi:"nghe nhạc",   pos:"Cụm động từ", ipa:"e.ku.te də la my.zik", ex_fr:"J'écoute de la musique en travaillant.", ex_vi:"Tôi nghe nhạc khi làm việc." },
          { fr:"écouter la radio",           vi:"nghe đài",    pos:"Cụm động từ", ipa:"e.ku.te la ʁa.djo", ex_fr:"Il écoute la radio chaque matin.",    ex_vi:"Anh ấy nghe đài mỗi sáng." },
          { fr:"faire du jogging",           vi:"chạy bộ",     pos:"Cụm động từ", ipa:"fɛʁ dy dʒɔ.giŋ", ex_fr:"Je fais du jogging au parc.",         ex_vi:"Tôi chạy bộ ở công viên." },
          { fr:"faire du sport",             vi:"tập thể thao", pos:"Cụm động từ", ipa:"fɛʁ dy spɔʁ",  ex_fr:"Elle fait du sport trois fois par semaine.", ex_vi:"Cô ấy tập thể thao ba lần mỗi tuần." },
          { fr:"jouer à un jeu vidéo",       vi:"chơi game điện tử", pos:"Cụm động từ", ipa:"ʒwe a œ̃ ʒø vi.de.o", ex_fr:"Il joue à un jeu vidéo le soir.", ex_vi:"Anh ấy chơi game điện tử vào buổi tối." },
          { fr:"lire",                       vi:"đọc sách / đọc báo", pos:"Động từ", ipa:"liʁ",       ex_fr:"J'aime lire avant de dormir.",       ex_vi:"Tôi thích đọc sách trước khi ngủ." },
          { fr:"se promener",                vi:"dạo bộ",      pos:"Động từ phản thân", ipa:"sə pʁɔm.ne", ex_fr:"On se promène dans le parc.",      ex_vi:"Chúng tôi dạo bộ trong công viên." },
          { fr:"regarder la télévision",     vi:"xem tivi",    pos:"Cụm động từ", ipa:"ʁə.gaʁ.de la te.le.vi.zjɔ̃", ex_fr:"Le soir, je regarde la télévision.", ex_vi:"Tối tôi xem tivi." },
          { fr:"surfer sur Internet",        vi:"lướt Internet", pos:"Cụm động từ", ipa:"syʁ.fe syʁ ɛ̃.tɛʁ.nɛt", ex_fr:"Elle surfe sur Internet pendant des heures.", ex_vi:"Cô ấy lướt Internet hàng giờ." },
          { fr:"voir des amis",              vi:"gặp bạn bè",  pos:"Cụm động từ", ipa:"vwaʁ de.z‿a.mi", ex_fr:"Le week-end, je vois des amis.",    ex_vi:"Cuối tuần tôi gặp bạn bè." },
        ]
      },
      {
        id: "u6g5", label: "Les sorties culturelles", icon: "🎪",
        words: [
          { fr:"aller à un concert",   vi:"đi xem hòa nhạc", pos:"Cụm động từ", ipa:"a.le a œ̃ kɔ̃.sɛʁ", ex_fr:"On va à un concert ce soir.", ex_vi:"Tối nay chúng tôi đi xem hòa nhạc." },
          { fr:"aller au cinéma",      vi:"đi xem phim",     pos:"Cụm động từ", ipa:"a.le o si.ne.ma", ex_fr:"Je vais au cinéma le vendredi.", ex_vi:"Tôi đi xem phim vào thứ Sáu." },
          { fr:"aller au musée",       vi:"đi bảo tàng",     pos:"Cụm động từ", ipa:"a.le o my.ze",   ex_fr:"Nous allons au musée demain.", ex_vi:"Ngày mai chúng tôi đi bảo tàng." },
          { fr:"aller au théâtre",     vi:"đi xem kịch",     pos:"Cụm động từ", ipa:"a.le o te.atʁ",  ex_fr:"Elle va au théâtre une fois par mois.", ex_vi:"Cô ấy đi xem kịch mỗi tháng một lần." },
          { fr:"voir une exposition",  vi:"xem triển lãm",   pos:"Cụm động từ", ipa:"vwaʁ yn ɛks.po.zi.sjɔ̃", ex_fr:"On va voir une exposition de photos.", ex_vi:"Chúng tôi đi xem triển lãm ảnh." },
        ]
      },
      {
        id: "u6g6", label: "La description physique", icon: "🪞",
        words: [
          { fr:"petit(e) / grand(e)",              vi:"thấp / nhỏ — cao / lớn", pos:"Tính từ", ipa:"pə.ti / gʁɑ̃",   ex_fr:"Il est grand et mince.",            ex_vi:"Anh ấy cao và mảnh mai." },
          { fr:"mince",                            vi:"mảnh mai",   pos:"Tính từ", ipa:"mɛ̃s",          ex_fr:"Elle est mince et sportive.",        ex_vi:"Cô ấy mảnh mai và năng động." },
          { fr:"les cheveux courts / longs",       vi:"tóc ngắn / dài", pos:"Cụm danh từ", ipa:"le ʃə.vø kuʁ / lɔ̃", ex_fr:"Elle a les cheveux longs.",     ex_vi:"Cô ấy có tóc dài." },
          { fr:"les cheveux gris / roux / frisés", vi:"tóc bạc / hung đỏ / xoăn", pos:"Cụm danh từ", ipa:"le ʃə.vø gʁi / ʁu / fʁi.ze", ex_fr:"Mon grand-père a les cheveux gris.", ex_vi:"Ông tôi có tóc bạc." },
          { fr:"la moustache",                     vi:"bộ râu mép", pos:"Danh từ (f.)", ipa:"mus.taʃ", ex_fr:"Mon oncle porte une moustache.",     ex_vi:"Chú tôi có bộ râu mép." },
          { fr:"les yeux marron",                  vi:"mắt nâu",   pos:"Cụm danh từ", ipa:"le.z‿jø ma.ʁɔ̃", ex_fr:"Elle a les yeux marron.",           ex_vi:"Cô ấy có mắt nâu." },
        ]
      },
      {
        id: "u6g7", label: "Le caractère", icon: "😊",
        words: [
          { fr:"sympathique / sympa",      vi:"dễ mến",      pos:"Tính từ", ipa:"sɛ̃.pa.tik / sɛ̃.pa", ex_fr:"Mon nouveau collègue est très sympa.", ex_vi:"Đồng nghiệp mới của tôi rất dễ mến." },
          { fr:"bavard(e)",                vi:"hay nói / nhiều chuyện", pos:"Tính từ", ipa:"ba.vaʁ", ex_fr:"Ma sœur est très bavarde.",          ex_vi:"Em gái tôi rất hay nói." },
          { fr:"drôle",                    vi:"hài hước / vui tính",   pos:"Tính từ", ipa:"dʁol",   ex_fr:"Il raconte des histoires drôles.",    ex_vi:"Anh ấy kể những câu chuyện hài hước." },
          { fr:"sociable",                 vi:"hòa đồng",    pos:"Tính từ", ipa:"sɔ.sjabl",          ex_fr:"Elle est sociable et aimable.",        ex_vi:"Cô ấy hòa đồng và dễ thương." },
          { fr:"calme",                    vi:"bình tĩnh / điềm tĩnh", pos:"Tính từ", ipa:"kalm",    ex_fr:"Il reste calme dans toutes les situations.", ex_vi:"Anh ấy luôn bình tĩnh trong mọi tình huống." },
          { fr:"sérieux / sérieuse",       vi:"nghiêm túc",  pos:"Tính từ", ipa:"se.ʁjø / se.ʁjøz",  ex_fr:"C'est une étudiante sérieuse.",        ex_vi:"Đó là một sinh viên nghiêm túc." },
          { fr:"timide",                   vi:"nhút nhát / e thẹn",    pos:"Tính từ", ipa:"ti.mid",  ex_fr:"Le petit garçon est timide.",          ex_vi:"Cậu bé nhỏ nhút nhát." },
          { fr:"dynamique",                vi:"năng động",   pos:"Tính từ", ipa:"di.na.mik",         ex_fr:"Elle est jeune et dynamique.",         ex_vi:"Cô ấy trẻ và năng động." },
          { fr:"généreux / généreuse",     vi:"hào phóng",   pos:"Tính từ", ipa:"ʒe.ne.ʁø / ʒe.ne.ʁøz", ex_fr:"Mon grand-père est très généreux.", ex_vi:"Ông tôi rất hào phóng." },
        ]
      },
    ]
  },

  // ── Unité 7 — Chez moi ! ─────────────────────────────────────
  {
    id: "u7", num: "7", title: "Chez moi !",
    color: "#D35400", bg: "#FEF3E2",
    groups: [
      {
        id: "u7g1", label: "Le logement", icon: "🏠",
        words: [
          { fr:"déménager",          vi:"chuyển nhà",   pos:"Động từ", ipa:"de.me.na.ʒe", ex_fr:"Nous déménageons le mois prochain.", ex_vi:"Tháng sau chúng tôi chuyển nhà." },
          { fr:"l'étage (m.)",       vi:"tầng",         pos:"Danh từ (m.)", ipa:"e.taʒ",   ex_fr:"Mon appartement est au troisième étage.", ex_vi:"Căn hộ của tôi ở tầng ba." },
          { fr:"la fenêtre",         vi:"cửa sổ",       pos:"Danh từ (f.)", ipa:"fə.nɛtʁ", ex_fr:"Ouvre la fenêtre, s'il te plaît.",  ex_vi:"Mở cửa sổ giúp tôi nhé." },
          { fr:"le jardin",         vi:"vườn",          pos:"Danh từ (m.)", ipa:"ʒaʁ.dɛ̃",  ex_fr:"Les enfants jouent dans le jardin.", ex_vi:"Mấy đứa trẻ chơi trong vườn." },
          { fr:"la maison",          vi:"ngôi nhà",     pos:"Danh từ (f.)", ipa:"mɛ.zɔ̃",   ex_fr:"Cette maison est très grande.",      ex_vi:"Ngôi nhà này rất rộng." },
          { fr:"la pièce",           vi:"phòng",        pos:"Danh từ (f.)", ipa:"pjɛs",    ex_fr:"L'appartement a quatre pièces.",     ex_vi:"Căn hộ có bốn phòng." },
          { fr:"le rez-de-chaussée", vi:"tầng trệt",    pos:"Danh từ (m.)", ipa:"ʁe də ʃo.se", ex_fr:"La cuisine est au rez-de-chaussée.", ex_vi:"Nhà bếp ở tầng trệt." },
          { fr:"la surface",         vi:"diện tích",    pos:"Danh từ (f.)", ipa:"syʁ.fas", ex_fr:"Quelle est la surface de l'appartement ?", ex_vi:"Diện tích căn hộ là bao nhiêu?" },
          { fr:"la terrasse",        vi:"ban công / sân thượng", pos:"Danh từ (f.)", ipa:"tɛ.ʁas", ex_fr:"On prend le café sur la terrasse.", ex_vi:"Chúng tôi uống cà phê trên sân thượng." },
        ]
      },
      {
        id: "u7g2", label: "Les pièces", icon: "🚪",
        words: [
          { fr:"la chambre",          vi:"phòng ngủ",       pos:"Danh từ (f.)", ipa:"ʃɑ̃bʁ",  ex_fr:"Ma chambre est petite mais confortable.", ex_vi:"Phòng ngủ của tôi nhỏ nhưng tiện nghi." },
          { fr:"la cuisine",          vi:"nhà bếp",         pos:"Danh từ (f.)", ipa:"kɥi.zin", ex_fr:"On mange dans la cuisine.",          ex_vi:"Chúng tôi ăn ở trong nhà bếp." },
          { fr:"la salle à manger",   vi:"phòng ăn",        pos:"Danh từ (f.)", ipa:"sal a mɑ̃.ʒe", ex_fr:"La salle à manger est grande.",   ex_vi:"Phòng ăn rất rộng." },
          { fr:"la salle de bains",   vi:"phòng tắm",       pos:"Danh từ (f.)", ipa:"sal də bɛ̃",   ex_fr:"La salle de bains est au fond du couloir.", ex_vi:"Phòng tắm ở cuối hành lang." },
          { fr:"le salon",            vi:"phòng khách",     pos:"Danh từ (m.)", ipa:"sa.lɔ̃",  ex_fr:"On regarde la télévision dans le salon.", ex_vi:"Chúng tôi xem tivi ở phòng khách." },
          { fr:"les toilettes (f.)",  vi:"nhà vệ sinh / WC", pos:"Danh từ (f. pl.)", ipa:"twa.lɛt", ex_fr:"Les toilettes sont à côté de la cuisine.", ex_vi:"Nhà vệ sinh ở cạnh nhà bếp." },
        ]
      },
      {
        id: "u7g3", label: "Les meubles", icon: "🛋️",
        words: [
          { fr:"l'armoire (f.)",      vi:"tủ quần áo",   pos:"Danh từ (f.)", ipa:"aʁ.mwaʁ", ex_fr:"Je range mes vêtements dans l'armoire.", ex_vi:"Tôi cất quần áo vào tủ." },
          { fr:"le bureau",           vi:"bàn làm việc", pos:"Danh từ (m.)", ipa:"by.ʁo",   ex_fr:"L'ordinateur est sur le bureau.",     ex_vi:"Máy tính ở trên bàn làm việc." },
          { fr:"le canapé",           vi:"ghế sofa",     pos:"Danh từ (m.)", ipa:"ka.na.pe", ex_fr:"On s'assoit sur le canapé.",          ex_vi:"Chúng tôi ngồi trên ghế sofa." },
          { fr:"la chaise",           vi:"ghế",          pos:"Danh từ (f.)", ipa:"ʃɛz",     ex_fr:"Il y a quatre chaises autour de la table.", ex_vi:"Có bốn cái ghế quanh bàn." },
          { fr:"le fauteuil",         vi:"ghế bành",     pos:"Danh từ (m.)", ipa:"fo.tœj",  ex_fr:"Mon grand-père lit dans son fauteuil.", ex_vi:"Ông tôi đọc sách trên ghế bành." },
          { fr:"le lit",              vi:"giường",       pos:"Danh từ (m.)", ipa:"li",      ex_fr:"Le lit est près de la fenêtre.",      ex_vi:"Cái giường ở gần cửa sổ." },
          { fr:"la table (basse)",    vi:"bàn (thấp / cà phê)", pos:"Danh từ (f.)", ipa:"tabl bas", ex_fr:"Le journal est sur la table basse.", ex_vi:"Tờ báo ở trên bàn thấp." },
        ]
      },
      {
        id: "u7g4", label: "L'électroménager", icon: "🍳",
        words: [
          { fr:"la cuisinière",                   vi:"bếp nấu",   pos:"Danh từ (f.)", ipa:"kɥi.zi.njɛʁ", ex_fr:"La cuisinière est neuve.",       ex_vi:"Cái bếp nấu này mới." },
          { fr:"le four (à micro-ondes)",         vi:"lò nướng (vi sóng)", pos:"Danh từ (m.)", ipa:"fuʁ a mi.kʁo.ɔ̃d", ex_fr:"Je réchauffe le plat au four à micro-ondes.", ex_vi:"Tôi hâm nóng món ăn bằng lò vi sóng." },
          { fr:"le lave-linge",                   vi:"máy giặt",  pos:"Danh từ (m.)", ipa:"lav lɛ̃ʒ",     ex_fr:"Le lave-linge est dans la salle de bains.", ex_vi:"Máy giặt ở trong phòng tắm." },
          { fr:"le réfrigérateur / le frigo (fam.)", vi:"tủ lạnh", pos:"Danh từ (m.)", ipa:"ʁe.fʁi.ʒe.ʁa.tœʁ / fʁi.go", ex_fr:"Le lait est dans le frigo.", ex_vi:"Sữa ở trong tủ lạnh." },
        ]
      },
      {
        id: "u7g5", label: "Les objets et la décoration", icon: "🖼️",
        words: [
          { fr:"l'aquarium (m.)", vi:"bể cá cảnh",   pos:"Danh từ (m.)", ipa:"a.ka.ʁjɔm", ex_fr:"Il y a des poissons dans l'aquarium.", ex_vi:"Có cá trong bể cá cảnh." },
          { fr:"décorer",         vi:"trang trí",    pos:"Động từ", ipa:"de.kɔ.ʁe",      ex_fr:"Elle décore son salon avec des plantes.", ex_vi:"Cô ấy trang trí phòng khách với cây cảnh." },
          { fr:"la lampe",        vi:"đèn",          pos:"Danh từ (f.)", ipa:"lɑ̃p",      ex_fr:"Allume la lampe, s'il te plaît.",      ex_vi:"Bật đèn lên giúp tôi nhé." },
          { fr:"la plante",       vi:"cây cảnh",     pos:"Danh từ (f.)", ipa:"plɑ̃t",     ex_fr:"Il y a une plante verte près de la fenêtre.", ex_vi:"Có một cây cảnh xanh gần cửa sổ." },
          { fr:"le tableau",      vi:"bức tranh (treo tường)", pos:"Danh từ (m.)", ipa:"ta.blo", ex_fr:"Ce tableau est très beau.",       ex_vi:"Bức tranh này rất đẹp." },
          { fr:"le tapis",        vi:"tấm thảm",     pos:"Danh từ (m.)", ipa:"ta.pi",     ex_fr:"Le chat dort sur le tapis.",            ex_vi:"Con mèo ngủ trên tấm thảm." },
          { fr:"la télévision",   vi:"ti vi",        pos:"Danh từ (f.)", ipa:"te.le.vi.zjɔ̃", ex_fr:"La télévision est dans le salon.",  ex_vi:"Ti vi ở trong phòng khách." },
        ]
      },
      {
        id: "u7g6", label: "L'immeuble", icon: "🏢",
        words: [
          { fr:"l'appartement (m.)",    vi:"căn hộ",         pos:"Danh từ (m.)", ipa:"a.paʁ.tə.mɑ̃", ex_fr:"J'habite dans un petit appartement.", ex_vi:"Tôi sống trong một căn hộ nhỏ." },
          { fr:"l'ascenseur (m.)",      vi:"thang máy",      pos:"Danh từ (m.)", ipa:"a.sɑ̃.sœʁ",    ex_fr:"L'ascenseur ne fonctionne pas.",     ex_vi:"Thang máy không hoạt động." },
          { fr:"le balcon",             vi:"ban công",       pos:"Danh từ (m.)", ipa:"bal.kɔ̃",      ex_fr:"On prend le petit déjeuner sur le balcon.", ex_vi:"Chúng tôi ăn sáng trên ban công." },
          { fr:"le couloir",            vi:"hành lang",      pos:"Danh từ (m.)", ipa:"ku.lwaʁ",     ex_fr:"Ma chambre est au bout du couloir.", ex_vi:"Phòng tôi ở cuối hành lang." },
          { fr:"l'escalier (m.)",       vi:"cầu thang",      pos:"Danh từ (m.)", ipa:"ɛs.ka.lje",   ex_fr:"Je monte l'escalier à pied.",        ex_vi:"Tôi đi cầu thang bộ lên." },
          { fr:"le hall",               vi:"sảnh",           pos:"Danh từ (m.)", ipa:"ol",          ex_fr:"On se retrouve dans le hall.",       ex_vi:"Chúng ta gặp nhau ở sảnh." },
          { fr:"le local à poubelles",  vi:"khu vực để thùng rác", pos:"Danh từ (m.)", ipa:"lɔ.kal a pu.bɛl", ex_fr:"Le local à poubelles est au sous-sol.", ex_vi:"Khu vực để thùng rác ở dưới hầm." },
          { fr:"le local à vélos",      vi:"khu vực gửi xe đạp", pos:"Danh từ (m.)", ipa:"lɔ.kal a ve.lo", ex_fr:"Je laisse mon vélo dans le local à vélos.", ex_vi:"Tôi để xe đạp ở khu vực gửi xe." },
          { fr:"la pelouse",            vi:"bãi cỏ",         pos:"Danh từ (f.)", ipa:"pə.luz",      ex_fr:"Les enfants jouent sur la pelouse.", ex_vi:"Mấy đứa trẻ chơi trên bãi cỏ." },
          { fr:"la porte (d'entrée)",   vi:"cửa ra vào",     pos:"Danh từ (f.)", ipa:"pɔʁt dɑ̃.tʁe", ex_fr:"Ferme la porte d'entrée, s'il te plaît.", ex_vi:"Đóng cửa ra vào lại giúp tôi." },
          { fr:"la résidence",          vi:"khu dân cư",     pos:"Danh từ (f.)", ipa:"ʁe.zi.dɑ̃s",   ex_fr:"Cette résidence est très calme.",    ex_vi:"Khu dân cư này rất yên tĩnh." },
          { fr:"le/la voisin(e)",       vi:"hàng xóm",       pos:"Danh từ", ipa:"vwa.zɛ̃ / vwa.zin", ex_fr:"Mon voisin est très sympa.",        ex_vi:"Hàng xóm của tôi rất dễ mến." },
        ]
      },
      {
        id: "u7g7", label: "Les problèmes, pannes et solutions", icon: "🔧",
        words: [
          { fr:"la fuite d'eau", vi:"rò rỉ nước",  pos:"Danh từ (f.)", ipa:"fɥit do",  ex_fr:"Il y a une fuite d'eau dans la cuisine.", ex_vi:"Có chỗ rò rỉ nước trong nhà bếp." },
          { fr:"fonctionner",    vi:"hoạt động / vận hành", pos:"Động từ", ipa:"fɔ̃k.sjɔ.ne", ex_fr:"L'ascenseur ne fonctionne plus.",  ex_vi:"Thang máy không hoạt động nữa." },
          { fr:"marcher",        vi:"chạy / hoạt động (máy móc)", pos:"Động từ", ipa:"maʁ.ʃe", ex_fr:"Le four ne marche pas bien.",      ex_vi:"Cái lò không chạy tốt." },
          { fr:"réparer",        vi:"sửa chữa",    pos:"Động từ", ipa:"ʁe.pa.ʁe", ex_fr:"Le plombier répare la fuite d'eau.",      ex_vi:"Thợ sửa ống nước đang sửa chỗ rò rỉ." },
        ]
      },
      {
        id: "u7g8", label: "Les professionnels", icon: "👷",
        words: [
          { fr:"l'électricien (m.)",   vi:"thợ điện",      pos:"Danh từ (m.)", ipa:"e.lɛk.tʁi.sjɛ̃", ex_fr:"L'électricien répare la lumière.",  ex_vi:"Thợ điện đang sửa đèn." },
          { fr:"l'informaticien (m.)", vi:"kỹ thuật viên tin học", pos:"Danh từ (m.)", ipa:"ɛ̃.fɔʁ.ma.ti.sjɛ̃", ex_fr:"L'informaticien répare mon ordinateur.", ex_vi:"Kỹ thuật viên tin học đang sửa máy tính của tôi." },
          { fr:"le peintre",           vi:"thợ sơn",       pos:"Danh từ (m.)", ipa:"pɛ̃tʁ",        ex_fr:"Le peintre peint le salon.",         ex_vi:"Thợ sơn đang sơn phòng khách." },
          { fr:"le plombier",          vi:"thợ sửa ống nước", pos:"Danh từ (m.)", ipa:"plɔ̃.bje",  ex_fr:"J'appelle le plombier pour la fuite d'eau.", ex_vi:"Tôi gọi thợ sửa ống nước vì chỗ rò rỉ." },
          { fr:"le serrurier",         vi:"thợ khóa",      pos:"Danh từ (m.)", ipa:"se.ʁy.ʁje",    ex_fr:"Le serrurier change la serrure.",    ex_vi:"Thợ khóa đang thay khóa." },
        ]
      },
      {
        id: "u7g9", label: "Les prépositions de lieu (2)", icon: "📍",
        words: [
          { fr:"à gauche (de) / à droite (de)", vi:"bên trái (của) / bên phải (của)", pos:"Giới ngữ", ipa:"a goʃ / a dʁwat", ex_fr:"La cuisine est à gauche du salon.", ex_vi:"Nhà bếp ở bên trái phòng khách." },
          { fr:"devant / derrière",             vi:"phía trước / phía sau", pos:"Giới từ", ipa:"də.vɑ̃ / dɛ.ʁjɛʁ", ex_fr:"La voiture est devant la maison.", ex_vi:"Xe ô tô đậu phía trước nhà." },
          { fr:"sur / sous",                    vi:"trên / dưới",  pos:"Giới từ", ipa:"syʁ / su", ex_fr:"Le chat dort sous la table.",       ex_vi:"Con mèo ngủ dưới gầm bàn." },
          { fr:"à côté (de)",                   vi:"bên cạnh (của)", pos:"Giới ngữ", ipa:"a ko.te", ex_fr:"La pharmacie est à côté de la banque.", ex_vi:"Nhà thuốc ở bên cạnh ngân hàng." },
          { fr:"en face (de)",                  vi:"đối diện (với)", pos:"Giới ngữ", ipa:"ɑ̃ fas", ex_fr:"L'école est en face du parc.",       ex_vi:"Trường học ở đối diện công viên." },
          { fr:"entre",                         vi:"giữa (hai vật)", pos:"Giới từ", ipa:"ɑ̃tʁ",   ex_fr:"La banque est entre la poste et l'école.", ex_vi:"Ngân hàng nằm giữa bưu điện và trường học." },
        ]
      },
    ]
  },

  // ── Unité 8 — En forme ! ─────────────────────────────────────
  {
    id: "u8", num: "8", title: "En forme !",
    color: "#DC2626", bg: "#FEF2F2",
    groups: [
      {
        id: "u8g1", label: "Les parties du corps", icon: "🫀",
        words: [
          { fr:"le bras",    vi:"cánh tay", pos:"Danh từ (m.)", ipa:"bʁa",  ex_fr:"Il a mal au bras.",       ex_vi:"Anh ấy bị đau cánh tay." },
          { fr:"le dos",     vi:"lưng",     pos:"Danh từ (m.)", ipa:"do",   ex_fr:"J'ai mal au dos.",        ex_vi:"Tôi bị đau lưng." },
          { fr:"le genou",   vi:"đầu gối",  pos:"Danh từ (m.)", ipa:"ʒə.nu", ex_fr:"Elle s'est blessée au genou.", ex_vi:"Cô ấy bị thương ở đầu gối." },
          { fr:"la gorge",   vi:"cổ họng",  pos:"Danh từ (f.)", ipa:"gɔʁʒ", ex_fr:"J'ai mal à la gorge.",    ex_vi:"Tôi bị đau cổ họng." },
          { fr:"la jambe",   vi:"chân",     pos:"Danh từ (f.)", ipa:"ʒɑ̃b", ex_fr:"Il a une jambe cassée.",  ex_vi:"Anh ấy bị gãy chân." },
          { fr:"la main",    vi:"bàn tay",  pos:"Danh từ (f.)", ipa:"mɛ̃",  ex_fr:"Lave-toi les mains avant de manger.", ex_vi:"Rửa tay trước khi ăn." },
          { fr:"le pied",    vi:"bàn chân", pos:"Danh từ (m.)", ipa:"pje", ex_fr:"J'ai mal aux pieds après la marche.", ex_vi:"Tôi bị đau chân sau khi đi bộ." },
          { fr:"la tête",    vi:"cái đầu",  pos:"Danh từ (f.)", ipa:"tɛt", ex_fr:"J'ai mal à la tête.",      ex_vi:"Tôi bị đau đầu." },
          { fr:"le ventre",  vi:"bụng",     pos:"Danh từ (m.)", ipa:"vɑ̃tʁ", ex_fr:"Il a mal au ventre.",    ex_vi:"Anh ấy bị đau bụng." },
        ]
      },
      {
        id: "u8g2", label: "Le visage", icon: "😊",
        words: [
          { fr:"la bouche",          vi:"cái miệng", pos:"Danh từ (f.)", ipa:"buʃ", ex_fr:"Ferme la bouche, s'il te plaît.", ex_vi:"Ngậm miệng lại giúp tôi nhé." },
          { fr:"la dent",            vi:"cái răng",  pos:"Danh từ (f.)", ipa:"dɑ̃", ex_fr:"J'ai mal à une dent.",          ex_vi:"Tôi bị đau một cái răng." },
          { fr:"le nez",             vi:"cái mũi",   pos:"Danh từ (m.)", ipa:"ne", ex_fr:"Il a le nez bouché.",            ex_vi:"Anh ấy bị nghẹt mũi." },
          { fr:"l'œil (m.) / les yeux", vi:"mắt / đôi mắt", pos:"Danh từ (m.)", ipa:"œj / le.z‿jø", ex_fr:"Elle a les yeux bleus.", ex_vi:"Cô ấy có mắt xanh." },
          { fr:"l'oreille (f.)",     vi:"cái tai",   pos:"Danh từ (f.)", ipa:"ɔ.ʁɛj", ex_fr:"J'ai mal à l'oreille.",      ex_vi:"Tôi bị đau tai." },
        ]
      },
      {
        id: "u8g3", label: "La taille et le poids", icon: "📏",
        words: [
          { fr:"mesurer / le mètre (= m)",  vi:"đo chiều cao / mét", pos:"Động từ / Danh từ", ipa:"mə.zy.ʁe / mɛtʁ", ex_fr:"Je mesure un mètre soixante-dix.", ex_vi:"Tôi cao một mét bảy mươi." },
          { fr:"peser / le kilo (= kg)",    vi:"cân nặng / ki-lô-gam", pos:"Động từ / Danh từ", ipa:"pə.ze / ki.lo", ex_fr:"Je pèse soixante kilos.",         ex_vi:"Tôi cân nặng sáu mươi ki-lô." },
        ]
      },
      {
        id: "u8g4", label: "Les symptômes et maladies", icon: "🤒",
        words: [
          { fr:"la fièvre", vi:"sốt",       pos:"Danh từ (f.)", ipa:"fjɛvʁ", ex_fr:"Mon fils a de la fièvre.",   ex_vi:"Con trai tôi bị sốt." },
          { fr:"la grippe", vi:"cảm cúm",   pos:"Danh từ (f.)", ipa:"gʁip", ex_fr:"Elle a la grippe depuis hier.", ex_vi:"Cô ấy bị cảm cúm từ hôm qua." },
          { fr:"malade",    vi:"ốm / bệnh", pos:"Tính từ", ipa:"ma.lad", ex_fr:"Il est malade aujourd'hui.",  ex_vi:"Hôm nay anh ấy bị ốm." },
          { fr:"le rhume",  vi:"cảm lạnh",  pos:"Danh từ (m.)", ipa:"ʁym", ex_fr:"J'ai un rhume depuis deux jours.", ex_vi:"Tôi bị cảm lạnh hai ngày nay." },
          { fr:"tousser",   vi:"ho",        pos:"Động từ", ipa:"tu.se", ex_fr:"Il tousse beaucoup la nuit.", ex_vi:"Anh ấy ho nhiều vào ban đêm." },
          { fr:"la toux",   vi:"cơn ho",    pos:"Danh từ (f.)", ipa:"tu", ex_fr:"Sa toux est très forte.",     ex_vi:"Cơn ho của anh ấy rất nặng." },
        ]
      },
      {
        id: "u8g5", label: "Les lieux, médicaments et examens", icon: "🏥",
        words: [
          { fr:"l'hôpital (m.)",       vi:"bệnh viện",       pos:"Danh từ (m.)", ipa:"o.pi.tal", ex_fr:"Il est à l'hôpital depuis hier.", ex_vi:"Anh ấy ở bệnh viện từ hôm qua." },
          { fr:"la pharmacie",         vi:"nhà thuốc",       pos:"Danh từ (f.)", ipa:"faʁ.ma.si", ex_fr:"Je vais à la pharmacie acheter des médicaments.", ex_vi:"Tôi đi nhà thuốc mua thuốc." },
          { fr:"le paracétamol",       vi:"thuốc paracetamol", pos:"Danh từ (m.)", ipa:"pa.ʁa.se.ta.mɔl", ex_fr:"Prends du paracétamol contre la fièvre.", ex_vi:"Uống paracetamol để hạ sốt." },
          { fr:"la radio",             vi:"chụp X-quang",   pos:"Danh từ (f.)", ipa:"ʁa.djo", ex_fr:"Le médecin demande une radio du bras.", ex_vi:"Bác sĩ yêu cầu chụp X-quang cánh tay." },
          { fr:"le sirop",             vi:"siro (thuốc)",   pos:"Danh từ (m.)", ipa:"si.ʁo", ex_fr:"Elle prend du sirop pour la toux.", ex_vi:"Cô ấy uống siro để trị ho." },
          { fr:"la visite à domicile", vi:"khám tại nhà",   pos:"Danh từ (f.)", ipa:"vi.zit a dɔ.mi.sil", ex_fr:"Le médecin fait une visite à domicile.", ex_vi:"Bác sĩ khám tại nhà." },
          { fr:"la vitamine C",        vi:"vitamin C",      pos:"Danh từ (f.)", ipa:"vi.ta.min se", ex_fr:"Mangez des fruits riches en vitamine C.", ex_vi:"Hãy ăn trái cây giàu vitamin C." },
        ]
      },
      {
        id: "u8g6", label: "Les professions médicales", icon: "👨‍⚕️",
        words: [
          { fr:"le dentiste",                              vi:"nha sĩ", pos:"Danh từ (m./f.)", ipa:"dɑ̃.tist", ex_fr:"J'ai rendez-vous chez le dentiste.", ex_vi:"Tôi có hẹn với nha sĩ." },
          { fr:"le/la docteur(e) / le médecin",           vi:"bác sĩ", pos:"Danh từ (m./f.)", ipa:"dɔk.tœʁ / med.sɛ̃", ex_fr:"Le médecin examine le patient.", ex_vi:"Bác sĩ khám cho bệnh nhân." },
          { fr:"l'infirmier (m.) / l'infirmière (f.)",    vi:"y tá (nam / nữ)", pos:"Danh từ", ipa:"ɛ̃.fiʁ.mje / ɛ̃.fiʁ.mjɛʁ", ex_fr:"L'infirmière prend ma tension.", ex_vi:"Y tá đo huyết áp cho tôi." },
          { fr:"le pharmacien / la pharmacienne",         vi:"dược sĩ (nam / nữ)", pos:"Danh từ", ipa:"faʁ.ma.sjɛ̃ / faʁ.ma.sjɛn", ex_fr:"Le pharmacien me donne des conseils.", ex_vi:"Dược sĩ cho tôi lời khuyên." },
        ]
      },
      {
        id: "u8g7", label: "Les émotions", icon: "😄",
        words: [
          { fr:"content(e)",              vi:"vui vẻ / hài lòng", pos:"Tính từ", ipa:"kɔ̃.tɑ̃",   ex_fr:"Je suis content de te voir.",      ex_vi:"Tôi rất vui được gặp bạn." },
          { fr:"heureux / heureuse",      vi:"hạnh phúc",  pos:"Tính từ", ipa:"œ.ʁø / œ.ʁøz", ex_fr:"Elle est heureuse aujourd'hui.",   ex_vi:"Hôm nay cô ấy rất hạnh phúc." },
          { fr:"fatigué(e)",              vi:"mệt mỏi",    pos:"Tính từ", ipa:"fa.ti.ge",     ex_fr:"Je suis fatigué après le travail.", ex_vi:"Tôi mệt mỏi sau khi làm việc." },
          { fr:"inquiet / inquiète",      vi:"lo lắng",    pos:"Tính từ", ipa:"ɛ̃.kjɛ / ɛ̃.kjɛt", ex_fr:"Elle est inquiète pour son examen.", ex_vi:"Cô ấy lo lắng về bài thi." },
          { fr:"malheureux / malheureuse",vi:"bất hạnh / không hạnh phúc", pos:"Tính từ", ipa:"ma.lœ.ʁø / ma.lœ.ʁøz", ex_fr:"Il se sent malheureux ce soir.", ex_vi:"Tối nay anh ấy cảm thấy không vui." },
          { fr:"stressé(e)",              vi:"căng thẳng", pos:"Tính từ", ipa:"stʁe.se",      ex_fr:"Je suis stressé avant l'examen.",   ex_vi:"Tôi căng thẳng trước kỳ thi." },
          { fr:"triste",                  vi:"buồn",       pos:"Tính từ", ipa:"tʁist",        ex_fr:"Pourquoi es-tu triste ?",           ex_vi:"Sao bạn lại buồn vậy?" },
        ]
      },
      {
        id: "u8g8", label: "La salle de sport", icon: "🏋️",
        words: [
          { fr:"l'activité (f.) physique",  vi:"hoạt động thể chất", pos:"Danh từ (f.)", ipa:"ak.ti.vi.te fi.zik", ex_fr:"L'activité physique est bonne pour la santé.", ex_vi:"Hoạt động thể chất tốt cho sức khỏe." },
          { fr:"l'appareil (m.) de sport",  vi:"dụng cụ tập thể thao", pos:"Danh từ (m.)", ipa:"a.pa.ʁɛj də spɔʁ", ex_fr:"Cette salle a beaucoup d'appareils de sport.", ex_vi:"Phòng tập này có nhiều dụng cụ tập thể thao." },
          { fr:"le certificat médical",     vi:"giấy chứng nhận y tế", pos:"Danh từ (m.)", ipa:"sɛʁ.ti.fi.ka me.di.kal", ex_fr:"Il faut un certificat médical pour s'inscrire.", ex_vi:"Cần giấy chứng nhận y tế để đăng ký." },
          { fr:"le coach",                  vi:"huấn luyện viên", pos:"Danh từ (m.)", ipa:"koʃ", ex_fr:"Mon coach m'aide à m'entraîner.", ex_vi:"Huấn luyện viên của tôi giúp tôi tập luyện." },
          { fr:"la douche",                 vi:"vòi tắm",   pos:"Danh từ (f.)", ipa:"duʃ", ex_fr:"Je prends une douche après le sport.", ex_vi:"Tôi tắm vòi sau khi tập thể thao." },
          { fr:"le maillot de bain",        vi:"đồ bơi",    pos:"Danh từ (m.)", ipa:"ma.jo də bɛ̃", ex_fr:"N'oublie pas ton maillot de bain.", ex_vi:"Đừng quên đồ bơi của bạn." },
          { fr:"le sauna",                  vi:"phòng xông hơi", pos:"Danh từ (m.)", ipa:"so.na", ex_fr:"Le sauna est ouvert tous les jours.", ex_vi:"Phòng xông hơi mở mỗi ngày." },
          { fr:"la serviette de bain",      vi:"khăn tắm",  pos:"Danh từ (f.)", ipa:"sɛʁ.vjɛt də bɛ̃", ex_fr:"Prends une serviette de bain propre.", ex_vi:"Lấy một cái khăn tắm sạch." },
          { fr:"le vestiaire",              vi:"phòng thay đồ", pos:"Danh từ (m.)", ipa:"vɛs.tjɛʁ", ex_fr:"Je laisse mes affaires au vestiaire.", ex_vi:"Tôi để đồ ở phòng thay đồ." },
        ]
      },
      {
        id: "u8g9", label: "L'alimentation", icon: "🥗",
        words: [
          { fr:"l'alimentation (f.) saine",                vi:"chế độ ăn lành mạnh", pos:"Danh từ (f.)", ipa:"a.li.mɑ̃.ta.sjɔ̃ sɛn", ex_fr:"Une alimentation saine est importante.", ex_vi:"Chế độ ăn lành mạnh rất quan trọng." },
          { fr:"la calorie",                               vi:"calo", pos:"Danh từ (f.)", ipa:"ka.lɔ.ʁi", ex_fr:"Ce gâteau a beaucoup de calories.", ex_vi:"Cái bánh này có nhiều calo." },
          { fr:"le produit : gras / salé / sucré",         vi:"thực phẩm: béo / mặn / ngọt", pos:"Cụm danh từ + tính từ", ipa:"pʁɔ.dɥi gʁa / sa.le / sy.kʁe", ex_fr:"Évitez les produits trop sucrés.", ex_vi:"Hãy tránh thực phẩm quá ngọt." },
        ]
      },
      {
        id: "u8g10", label: "Les sports", icon: "⚽",
        words: [
          { fr:"la corde à sauter",      vi:"dây nhảy",  pos:"Danh từ (f.)", ipa:"kɔʁd a so.te", ex_fr:"Elle fait de la corde à sauter chaque matin.", ex_vi:"Cô ấy nhảy dây mỗi sáng." },
          { fr:"la course à pied",       vi:"chạy bộ",   pos:"Danh từ (f.)", ipa:"kuʁs a pje",   ex_fr:"Il fait de la course à pied le week-end.", ex_vi:"Anh ấy chạy bộ vào cuối tuần." },
          { fr:"la gymnastique",         vi:"thể dục thể hình", pos:"Danh từ (f.)", ipa:"ʒim.nas.tik", ex_fr:"Elle fait de la gymnastique au club.", ex_vi:"Cô ấy tập thể dục thể hình ở câu lạc bộ." },
          { fr:"le judo",                vi:"judo",      pos:"Danh từ (m.)", ipa:"ʒy.do",       ex_fr:"Mon fils fait du judo le samedi.", ex_vi:"Con trai tôi học judo vào thứ Bảy." },
          { fr:"la marche (rapide)",     vi:"đi bộ (nhanh)", pos:"Danh từ (f.)", ipa:"maʁʃ ʁa.pid", ex_fr:"La marche rapide est un bon exercice.", ex_vi:"Đi bộ nhanh là một bài tập tốt." },
          { fr:"la musculation",         vi:"tập tạ",    pos:"Danh từ (f.)", ipa:"mys.ky.la.sjɔ̃", ex_fr:"Il fait de la musculation trois fois par semaine.", ex_vi:"Anh ấy tập tạ ba lần mỗi tuần." },
          { fr:"la natation",            vi:"bơi lội",   pos:"Danh từ (f.)", ipa:"na.ta.sjɔ̃",   ex_fr:"La natation est très bonne pour le dos.", ex_vi:"Bơi lội rất tốt cho lưng." },
          { fr:"le rugby",               vi:"bóng bầu dục", pos:"Danh từ (m.)", ipa:"ʁyg.bi",    ex_fr:"Il regarde un match de rugby.",   ex_vi:"Anh ấy xem một trận bóng bầu dục." },
          { fr:"le tennis",              vi:"quần vợt",  pos:"Danh từ (m.)", ipa:"tɛ.nis",       ex_fr:"On joue au tennis le dimanche.",   ex_vi:"Chúng tôi chơi quần vợt vào Chủ nhật." },
          { fr:"le volley (le volley-ball)", vi:"bóng chuyền", pos:"Danh từ (m.)", ipa:"vɔ.lɛ",  ex_fr:"Les filles jouent au volley sur la plage.", ex_vi:"Các cô gái chơi bóng chuyền trên bãi biển." },
          { fr:"le yoga",                vi:"yoga",      pos:"Danh từ (m.)", ipa:"jɔ.ga",        ex_fr:"Elle fait du yoga tous les matins.", ex_vi:"Cô ấy tập yoga mỗi sáng." },
        ]
      },
    ]
  },

  // ── Unité 9 — Bonnes vacances ! ──────────────────────────────
  {
    id: "u9", num: "9", title: "Bonnes vacances !",
    color: "#0891B2", bg: "#F0F9FF",
    groups: [
      {
        id: "u9g1", label: "Les lieux, les destinations", icon: "🗺️",
        words: [
          { fr:"la campagne",  vi:"vùng nông thôn", pos:"Danh từ (f.)", ipa:"kɑ̃.paɲ", ex_fr:"J'aime passer mes vacances à la campagne.", ex_vi:"Tôi thích đi nghỉ ở vùng nông thôn." },
          { fr:"l'île (f.)",   vi:"đảo",            pos:"Danh từ (f.)", ipa:"il",     ex_fr:"On part sur une île pour les vacances.", ex_vi:"Chúng tôi đi nghỉ ở một hòn đảo." },
          { fr:"la mer",       vi:"biển",           pos:"Danh từ (f.)", ipa:"mɛʁ",    ex_fr:"On se baigne dans la mer.",         ex_vi:"Chúng tôi tắm biển." },
          { fr:"la montagne",  vi:"núi",            pos:"Danh từ (f.)", ipa:"mɔ̃.taɲ", ex_fr:"Ils font de la randonnée en montagne.", ex_vi:"Họ đi bộ đường dài trên núi." },
          { fr:"le village",   vi:"làng / thị trấn nhỏ", pos:"Danh từ (m.)", ipa:"vi.laʒ", ex_fr:"Ce village est très calme.",     ex_vi:"Ngôi làng này rất yên tĩnh." },
        ]
      },
      {
        id: "u9g2", label: "L'hébergement", icon: "🏨",
        words: [
          { fr:"le camping",                              vi:"cắm trại / khu cắm trại", pos:"Danh từ (m.)", ipa:"kɑ̃.piŋ", ex_fr:"On fait du camping au bord du lac.", ex_vi:"Chúng tôi cắm trại bên hồ." },
          { fr:"la chambre d'hôtes",                      vi:"phòng trọ tư nhân (B&B)", pos:"Danh từ (f.)", ipa:"ʃɑ̃bʁ dot", ex_fr:"Nous restons dans une chambre d'hôtes.", ex_vi:"Chúng tôi ở trong một phòng trọ tư nhân." },
          { fr:"l'échange (m.) d'appartements / de maisons", vi:"trao đổi căn hộ / nhà ở", pos:"Danh từ (m.)", ipa:"e.ʃɑ̃ʒ da.paʁ.tə.mɑ̃", ex_fr:"Ils font un échange de maisons pour l'été.", ex_vi:"Họ trao đổi nhà ở vào kỳ nghỉ hè." },
          { fr:"la ferme",                                vi:"trang trại",  pos:"Danh từ (f.)", ipa:"fɛʁm", ex_fr:"On dort dans une ferme pendant les vacances.", ex_vi:"Chúng tôi ngủ ở một trang trại trong kỳ nghỉ." },
          { fr:"l'hôtel (m.)",                            vi:"khách sạn",   pos:"Danh từ (m.)", ipa:"o.tɛl", ex_fr:"Nous réservons un hôtel près de la plage.", ex_vi:"Chúng tôi đặt một khách sạn gần bãi biển." },
          { fr:"la location",                             vi:"nhà thuê (nghỉ dưỡng)", pos:"Danh từ (f.)", ipa:"lo.ka.sjɔ̃", ex_fr:"On a réservé une location au bord de la mer.", ex_vi:"Chúng tôi đã đặt một nhà thuê bên biển." },
          { fr:"la tente",                                vi:"lều cắm trại", pos:"Danh từ (f.)", ipa:"tɑ̃t", ex_fr:"On installe la tente près de la rivière.", ex_vi:"Chúng tôi dựng lều gần con sông." },
        ]
      },
      {
        id: "u9g3", label: "La réservation", icon: "📋",
        words: [
          { fr:"l'arrivée (f.) ≠ le départ",                        vi:"ngày đến ≠ ngày đi", pos:"Danh từ (f./m.)", ipa:"a.ʁi.ve ≠ de.paʁ", ex_fr:"L'arrivée est le 3 juillet, le départ le 10.", ex_vi:"Ngày đến là 3 tháng 7, ngày đi là ngày 10." },
          { fr:"la chambre (simple / double / familiale)",           vi:"phòng (đơn / đôi / gia đình)", pos:"Danh từ (f.)", ipa:"ʃɑ̃bʁ sɛ̃pl / dubl", ex_fr:"Je voudrais une chambre double.", ex_vi:"Tôi muốn đặt một phòng đôi." },
          { fr:"le lit simple",                                      vi:"giường đơn", pos:"Danh từ (m.)", ipa:"li sɛ̃pl", ex_fr:"La chambre a un lit simple.",         ex_vi:"Phòng có một giường đơn." },
          { fr:"le lit double",                                      vi:"giường đôi", pos:"Danh từ (m.)", ipa:"li dubl", ex_fr:"Nous préférons un lit double.",        ex_vi:"Chúng tôi muốn một giường đôi." },
          { fr:"le lit bébé",                                        vi:"giường trẻ em", pos:"Danh từ (m.)", ipa:"li be.be", ex_fr:"L'hôtel propose un lit bébé.",        ex_vi:"Khách sạn có cung cấp giường trẻ em." },
          { fr:"le parking",                                         vi:"bãi đỗ xe", pos:"Danh từ (m.)", ipa:"paʁ.kiŋ", ex_fr:"L'hôtel a un grand parking.",          ex_vi:"Khách sạn có bãi đỗ xe lớn." },
          { fr:"le petit déjeuner compris",                          vi:"bao gồm bữa sáng", pos:"Cụm danh từ", ipa:"pə.ti de.ʒœ.ne kɔ̃.pʁi", ex_fr:"Le petit déjeuner est compris dans le prix.", ex_vi:"Bữa sáng đã bao gồm trong giá phòng." },
          { fr:"les animaux acceptés",                               vi:"cho phép mang thú cưng", pos:"Cụm danh từ + tính từ", ipa:"le.z‿a.ni.mo ak.sɛp.te", ex_fr:"Dans cet hôtel, les animaux sont acceptés.", ex_vi:"Khách sạn này cho phép mang theo thú cưng." },
          { fr:"réserver une chambre",                              vi:"đặt phòng", pos:"Cụm động từ", ipa:"ʁe.zɛʁ.ve yn ʃɑ̃bʁ", ex_fr:"Je voudrais réserver une chambre.",   ex_vi:"Tôi muốn đặt một phòng." },
        ]
      },
      {
        id: "u9g4", label: "Les moyens de transport", icon: "✈️",
        words: [
          { fr:"l'avion (m.) → à l'aéroport", vi:"máy bay → ở sân bay", pos:"Danh từ (m.)", ipa:"a.vjɔ̃ → a la.e.ʁo.pɔʁ", ex_fr:"On prend l'avion pour aller en vacances.", ex_vi:"Chúng tôi đi máy bay để đi nghỉ." },
          { fr:"le van",                       vi:"xe van",   pos:"Danh từ (m.)", ipa:"vɑ̃",  ex_fr:"On voyage en van avec toute la famille.", ex_vi:"Chúng tôi đi du lịch bằng xe van cùng cả gia đình." },
          { fr:"la voiture",                   vi:"ô tô",     pos:"Danh từ (f.)", ipa:"vwa.tyʁ", ex_fr:"On va à la plage en voiture.",       ex_vi:"Chúng tôi đi biển bằng ô tô." },
        ]
      },
      {
        id: "u9g5", label: "Les activités de vacances", icon: "🏖️",
        words: [
          { fr:"se baigner",                  vi:"tắm biển / tắm sông", pos:"Động từ phản thân", ipa:"sə bɛ.ɲe", ex_fr:"On se baigne dans la mer tous les jours.", ex_vi:"Chúng tôi tắm biển mỗi ngày." },
          { fr:"bronzer",                     vi:"tắm nắng", pos:"Động từ", ipa:"bʁɔ̃.ze", ex_fr:"Elle bronze sur la plage.",            ex_vi:"Cô ấy tắm nắng trên bãi biển." },
          { fr:"faire de la randonnée",       vi:"đi bộ đường dài", pos:"Cụm động từ", ipa:"fɛʁ də la ʁɑ̃.dɔ.ne", ex_fr:"On fait de la randonnée en montagne.", ex_vi:"Chúng tôi đi bộ đường dài trên núi." },
          { fr:"faire du surf",               vi:"lướt sóng", pos:"Cụm động từ", ipa:"fɛʁ dy sœʁf", ex_fr:"Il fait du surf chaque été.",         ex_vi:"Anh ấy lướt sóng mỗi mùa hè." },
          { fr:"goûter la cuisine locale",    vi:"thử ẩm thực địa phương", pos:"Cụm động từ", ipa:"gu.te la kɥi.zin lɔ.kal", ex_fr:"On adore goûter la cuisine locale.", ex_vi:"Chúng tôi rất thích thử ẩm thực địa phương." },
          { fr:"prendre des photos",          vi:"chụp ảnh", pos:"Cụm động từ", ipa:"pʁɑ̃dʁ de fɔ.to", ex_fr:"Je prends des photos pendant le voyage.", ex_vi:"Tôi chụp ảnh trong suốt chuyến đi." },
          { fr:"visiter un musée / un village",vi:"tham quan bảo tàng / làng", pos:"Cụm động từ", ipa:"vi.zi.te œ̃ my.ze", ex_fr:"On va visiter un musée demain.",   ex_vi:"Ngày mai chúng tôi sẽ đi tham quan một bảo tàng." },
        ]
      },
      {
        id: "u9g6", label: "Les lieux dans la nature", icon: "🌿",
        words: [
          { fr:"le champ",   vi:"cánh đồng",   pos:"Danh từ (m.)", ipa:"ʃɑ̃",  ex_fr:"Les vaches sont dans le champ.",  ex_vi:"Đàn bò đang ở trong cánh đồng." },
          { fr:"le chemin",  vi:"con đường mòn", pos:"Danh từ (m.)", ipa:"ʃə.mɛ̃", ex_fr:"On suit le chemin jusqu'au lac.", ex_vi:"Chúng tôi đi theo con đường mòn đến hồ." },
          { fr:"la forêt",   vi:"khu rừng",    pos:"Danh từ (f.)", ipa:"fɔ.ʁɛ", ex_fr:"On se promène dans la forêt.",    ex_vi:"Chúng tôi đi dạo trong rừng." },
          { fr:"le lac",     vi:"hồ",          pos:"Danh từ (m.)", ipa:"lak", ex_fr:"On fait du bateau sur le lac.",    ex_vi:"Chúng tôi đi thuyền trên hồ." },
          { fr:"la plage",   vi:"bãi biển",    pos:"Danh từ (f.)", ipa:"plaʒ", ex_fr:"On passe la journée à la plage.", ex_vi:"Chúng tôi dành cả ngày ở bãi biển." },
          { fr:"la rivière", vi:"con sông (nhỏ)", pos:"Danh từ (f.)", ipa:"ʁi.vjɛʁ", ex_fr:"Les enfants jouent près de la rivière.", ex_vi:"Mấy đứa trẻ chơi gần con sông." },
        ]
      },
      {
        id: "u9g7", label: "La flore", icon: "🌳",
        words: [
          { fr:"l'arbre (m.)", vi:"cây",        pos:"Danh từ (m.)", ipa:"aʁbʁ", ex_fr:"Il y a un grand arbre devant la maison.", ex_vi:"Có một cây lớn trước nhà." },
          { fr:"la fleur",     vi:"bông hoa",   pos:"Danh từ (f.)", ipa:"flœʁ", ex_fr:"Elle cueille des fleurs dans le jardin.", ex_vi:"Cô ấy hái hoa trong vườn." },
          { fr:"l'herbe (f.)", vi:"cỏ",         pos:"Danh từ (f.)", ipa:"ɛʁb",  ex_fr:"Les enfants courent dans l'herbe.",    ex_vi:"Mấy đứa trẻ chạy trên cỏ." },
          { fr:"la plante",    vi:"cây cối / thực vật", pos:"Danh từ (f.)", ipa:"plɑ̃t", ex_fr:"Cette plante a besoin de soleil.",  ex_vi:"Cây này cần ánh nắng." },
        ]
      },
      {
        id: "u9g8", label: "Les animaux", icon: "🐄",
        words: [
          { fr:"le canard",    vi:"con vịt",   pos:"Danh từ (m.)", ipa:"ka.naʁ", ex_fr:"Le canard nage sur le lac.",     ex_vi:"Con vịt bơi trên hồ." },
          { fr:"le chat",      vi:"con mèo",   pos:"Danh từ (m.)", ipa:"ʃa",     ex_fr:"Mon chat dort tout l'après-midi.", ex_vi:"Con mèo của tôi ngủ suốt cả buổi chiều." },
          { fr:"le cheval",    vi:"con ngựa",  pos:"Danh từ (m.)", ipa:"ʃə.val", ex_fr:"On fait une promenade à cheval.", ex_vi:"Chúng tôi đi cưỡi ngựa dạo chơi." },
          { fr:"le chien",     vi:"con chó",   pos:"Danh từ (m.)", ipa:"ʃjɛ̃",   ex_fr:"Le chien court dans le jardin.",  ex_vi:"Con chó chạy trong vườn." },
          { fr:"le lapin",     vi:"con thỏ",   pos:"Danh từ (m.)", ipa:"la.pɛ̃", ex_fr:"Les enfants nourrissent le lapin.", ex_vi:"Mấy đứa trẻ cho con thỏ ăn." },
          { fr:"l'oiseau (m.)",vi:"con chim",  pos:"Danh từ (m.)", ipa:"wa.zo", ex_fr:"L'oiseau chante dans l'arbre.",   ex_vi:"Con chim hót trên cây." },
          { fr:"le poisson",   vi:"con cá",    pos:"Danh từ (m.)", ipa:"pwa.sɔ̃", ex_fr:"On pêche des poissons dans le lac.", ex_vi:"Chúng tôi câu cá trong hồ." },
          { fr:"la poule",     vi:"con gà mái", pos:"Danh từ (f.)", ipa:"pul",  ex_fr:"La poule est dans la ferme.",     ex_vi:"Con gà mái ở trong trang trại." },
          { fr:"la vache",     vi:"con bò",    pos:"Danh từ (f.)", ipa:"vaʃ",   ex_fr:"Les vaches mangent dans le champ.", ex_vi:"Đàn bò ăn cỏ trong cánh đồng." },
        ]
      },
      {
        id: "u9g9", label: "Les activités nature", icon: "🚤",
        words: [
          { fr:"faire du bateau",    vi:"đi thuyền", pos:"Cụm động từ", ipa:"fɛʁ dy ba.to", ex_fr:"On fait du bateau sur le lac.", ex_vi:"Chúng tôi đi thuyền trên hồ." },
          { fr:"faire de la plongée",vi:"lặn biển",  pos:"Cụm động từ", ipa:"fɛʁ də la plɔ̃.ʒe", ex_fr:"Il fait de la plongée près de l'île.", ex_vi:"Anh ấy lặn biển gần hòn đảo." },
          { fr:"pique-niquer",       vi:"dã ngoại / picnic", pos:"Động từ", ipa:"pik.ni.ke", ex_fr:"On pique-nique dans le parc.",    ex_vi:"Chúng tôi đi dã ngoại trong công viên." },
        ]
      },
    ]
  },

  // ── Unité 10 — Au travail ! ───────────────────────────────────
  {
    id: "u10", num: "10", title: "Au travail !",
    color: "#374151", bg: "#F9FAFB",
    groups: [
      {
        id: "u10g1", label: "Le campus", icon: "🎓",
        words: [
          { fr:"l'amphithéâtre / l'amphi (m.)",              vi:"giảng đường lớn", pos:"Danh từ (m.)", ipa:"ɑ̃.fi.te.atʁ / ɑ̃.fi", ex_fr:"Le cours a lieu dans le grand amphi.", ex_vi:"Buổi học diễn ra trong giảng đường lớn." },
          { fr:"la bibliothèque",                            vi:"thư viện", pos:"Danh từ (f.)", ipa:"bi.bli.jɔ.tɛk", ex_fr:"Je révise à la bibliothèque.",   ex_vi:"Tôi ôn bài ở thư viện." },
          { fr:"le logement étudiant",                       vi:"ký túc xá / nhà sinh viên", pos:"Danh từ (m.)", ipa:"lɔʒ.mɑ̃ e.ty.djɑ̃", ex_fr:"Il habite dans un logement étudiant.", ex_vi:"Anh ấy sống trong ký túc xá sinh viên." },
          { fr:"le restaurant universitaire / le resto U (fam.)", vi:"căn tin sinh viên", pos:"Danh từ (m.)", ipa:"ʁɛs.to.ʁɑ̃ y.ni.vɛʁ.si.tɛʁ", ex_fr:"On mange au resto U à midi.", ex_vi:"Chúng tôi ăn trưa ở căn tin sinh viên." },
          { fr:"la salle de cours",                          vi:"phòng học", pos:"Danh từ (f.)", ipa:"sal də kuʁ", ex_fr:"La salle de cours est au deuxième étage.", ex_vi:"Phòng học ở tầng hai." },
          { fr:"le secrétariat",                             vi:"phòng hành chính", pos:"Danh từ (m.)", ipa:"sə.kʁe.ta.ʁja", ex_fr:"Va au secrétariat pour ton inscription.", ex_vi:"Hãy đến phòng hành chính để đăng ký." },
          { fr:"l'université (f.)",                          vi:"trường đại học", pos:"Danh từ (f.)", ipa:"y.ni.vɛʁ.si.te", ex_fr:"Elle étudie le droit à l'université.", ex_vi:"Cô ấy học luật ở trường đại học." },
        ]
      },
      {
        id: "u10g2", label: "Les études et les personnes", icon: "📚",
        words: [
          { fr:"le cours / étudier",                               vi:"buổi học / học", pos:"Danh từ / Động từ", ipa:"kuʁ / e.ty.dje", ex_fr:"J'étudie pour mon cours de demain.", ex_vi:"Tôi học bài cho buổi học ngày mai." },
          { fr:"le diplôme (la licence, le master, le doctorat)",  vi:"bằng cấp (cử nhân, thạc sĩ, tiến sĩ)", pos:"Danh từ (m.)", ipa:"di.plom", ex_fr:"Elle a obtenu son diplôme de master.", ex_vi:"Cô ấy đã nhận được bằng thạc sĩ." },
          { fr:"faire des études",                                 vi:"đi học",        pos:"Cụm động từ", ipa:"fɛʁ de.z‿e.tyd", ex_fr:"Il fait des études de droit.",      ex_vi:"Anh ấy học ngành luật." },
          { fr:"faire un stage",                                   vi:"thực tập",      pos:"Cụm động từ", ipa:"fɛʁ œ̃ staʒ", ex_fr:"Elle fait un stage dans une entreprise.", ex_vi:"Cô ấy thực tập ở một công ty." },
          { fr:"l'enseignant(e)",                                  vi:"giáo viên / người dạy", pos:"Danh từ", ipa:"ɑ̃.sɛ.ɲɑ̃ / ɑ̃.sɛ.ɲɑ̃t", ex_fr:"L'enseignant explique bien la leçon.", ex_vi:"Giáo viên giải thích bài học rất dễ hiểu." },
          { fr:"le/la professeur(e)",                              vi:"giáo viên / giáo sư", pos:"Danh từ", ipa:"pʁɔ.fɛ.sœʁ", ex_fr:"Le professeur corrige les copies.",  ex_vi:"Giáo viên đang sửa bài kiểm tra." },
          { fr:"les études",                                       vi:"việc học",      pos:"Danh từ (f. pl.)", ipa:"le.z‿e.tyd", ex_fr:"Il aime ses études.",             ex_vi:"Anh ấy thích việc học của mình." },
          { fr:"la note",                                          vi:"điểm số",       pos:"Danh từ (f.)", ipa:"nɔt", ex_fr:"J'ai eu une bonne note à l'examen.", ex_vi:"Tôi đã có điểm số tốt trong kỳ thi." },
          { fr:"l'étudiant(e)",                                    vi:"sinh viên",     pos:"Danh từ", ipa:"e.ty.djɑ̃ / e.ty.djɑ̃t", ex_fr:"Cette étudiante travaille beaucoup.", ex_vi:"Cô sinh viên này học rất chăm chỉ." },
          { fr:"s'inscrire",                                       vi:"đăng ký / ghi danh", pos:"Động từ phản thân", ipa:"sɛ̃s.kʁiʁ", ex_fr:"Je m'inscris à l'université en septembre.", ex_vi:"Tôi đăng ký vào đại học vào tháng Chín." },
          { fr:"la formation",                                     vi:"khóa đào tạo", pos:"Danh từ (f.)", ipa:"fɔʁ.ma.sjɔ̃", ex_fr:"Il suit une formation en informatique.", ex_vi:"Anh ấy đang theo một khóa đào tạo tin học." },
        ]
      },
      {
        id: "u10g3", label: "Les disciplines", icon: "🔬",
        words: [
          { fr:"le commerce",         vi:"thương mại", pos:"Danh từ (m.)", ipa:"kɔ.mɛʁs", ex_fr:"Elle étudie le commerce international.", ex_vi:"Cô ấy học ngành thương mại quốc tế." },
          { fr:"le droit",            vi:"luật",       pos:"Danh từ (m.)", ipa:"dʁwa",    ex_fr:"Il fait des études de droit.",        ex_vi:"Anh ấy học ngành luật." },
          { fr:"l'économie (f.)",     vi:"kinh tế học", pos:"Danh từ (f.)", ipa:"e.kɔ.nɔ.mi", ex_fr:"L'économie est une matière difficile.", ex_vi:"Kinh tế học là một môn khó." },
          { fr:"l'informatique (m.)", vi:"tin học",    pos:"Danh từ (f.)", ipa:"ɛ̃.fɔʁ.ma.tik", ex_fr:"Il étudie l'informatique à l'université.", ex_vi:"Anh ấy học tin học ở trường đại học." },
          { fr:"les langues",         vi:"các ngôn ngữ / ngoại ngữ", pos:"Danh từ (f. pl.)", ipa:"le lɑ̃g", ex_fr:"J'aime étudier les langues étrangères.", ex_vi:"Tôi thích học ngoại ngữ." },
          { fr:"les lettres",         vi:"văn học / ngữ văn", pos:"Danh từ (f. pl.)", ipa:"le lɛtʁ", ex_fr:"Elle fait des études de lettres.", ex_vi:"Cô ấy học ngành ngữ văn." },
          { fr:"les mathématiques",   vi:"toán học",   pos:"Danh từ (f. pl.)", ipa:"le ma.te.ma.tik", ex_fr:"Les mathématiques sont sa matière préférée.", ex_vi:"Toán học là môn anh ấy thích nhất." },
          { fr:"les sciences",        vi:"khoa học",   pos:"Danh từ (f. pl.)", ipa:"le sjɑ̃s", ex_fr:"Elle aime les sciences naturelles.",  ex_vi:"Cô ấy thích khoa học tự nhiên." },
        ]
      },
      {
        id: "u10g4", label: "Les conditions et lieux de travail", icon: "🏢",
        words: [
          { fr:"le bureau",                          vi:"văn phòng", pos:"Danh từ (m.)", ipa:"by.ʁo", ex_fr:"Je travaille au bureau jusqu'à dix-huit heures.", ex_vi:"Tôi làm việc ở văn phòng đến 18 giờ." },
          { fr:"le contrat",                         vi:"hợp đồng",  pos:"Danh từ (m.)", ipa:"kɔ̃.tʁa", ex_fr:"Elle a signé son contrat hier.",    ex_vi:"Cô ấy đã ký hợp đồng hôm qua." },
          { fr:"les horaires (m.)",                  vi:"giờ làm việc", pos:"Danh từ (m. pl.)", ipa:"le.z‿ɔ.ʁɛʁ", ex_fr:"Les horaires sont flexibles.",  ex_vi:"Giờ làm việc khá linh hoạt." },
          { fr:"la machine à café",                  vi:"máy cà phê", pos:"Danh từ (f.)", ipa:"ma.ʃin a ka.fe", ex_fr:"La machine à café est dans la cuisine.", ex_vi:"Máy cà phê ở trong nhà bếp." },
          { fr:"la pause-déjeuner",                  vi:"giờ nghỉ trưa", pos:"Danh từ (f.)", ipa:"poz de.ʒœ.ne", ex_fr:"La pause-déjeuner est à midi.",  ex_vi:"Giờ nghỉ trưa là vào lúc 12 giờ." },
          { fr:"le poste",                           vi:"chức vụ / vị trí", pos:"Danh từ (m.)", ipa:"pɔst", ex_fr:"Ce poste demande de l'expérience.", ex_vi:"Vị trí này yêu cầu kinh nghiệm." },
          { fr:"le restaurant d'entreprise",         vi:"căn tin công ty", pos:"Danh từ (m.)", ipa:"ʁɛs.to.ʁɑ̃ dɑ̃.tʁə.pʁiz", ex_fr:"On mange au restaurant d'entreprise.", ex_vi:"Chúng tôi ăn ở căn tin công ty." },
          { fr:"le salaire",                         vi:"lương",      pos:"Danh từ (m.)", ipa:"sa.lɛʁ", ex_fr:"Le salaire est versé le 28 du mois.", ex_vi:"Lương được trả vào ngày 28 hàng tháng." },
          { fr:"le télétravail / faire du télétravail", vi:"làm việc từ xa", pos:"Danh từ (m.)", ipa:"te.le.tʁa.vaj", ex_fr:"Je fais du télétravail deux jours par semaine.", ex_vi:"Tôi làm việc từ xa hai ngày mỗi tuần." },
        ]
      },
      {
        id: "u10g5", label: "Les professions", icon: "👩‍🌾",
        words: [
          { fr:"l'agriculteur / l'agricultrice",     vi:"nông dân (nam / nữ)", pos:"Danh từ", ipa:"a.gʁi.kyl.tœʁ / a.gʁi.kyl.tʁis", ex_fr:"L'agriculteur travaille dans son champ.", ex_vi:"Người nông dân làm việc trên cánh đồng." },
          { fr:"l'artiste (m./f.)",                  vi:"nghệ sĩ", pos:"Danh từ", ipa:"aʁ.tist", ex_fr:"Cet artiste peint de très beaux tableaux.", ex_vi:"Nghệ sĩ này vẽ những bức tranh rất đẹp." },
          { fr:"le boucher / la bouchère",           vi:"người bán thịt (nam / nữ)", pos:"Danh từ", ipa:"bu.ʃe / bu.ʃɛʁ", ex_fr:"Le boucher coupe la viande.",        ex_vi:"Người bán thịt cắt thịt." },
          { fr:"le chauffeur",                       vi:"tài xế",  pos:"Danh từ (m.)", ipa:"ʃo.fœʁ", ex_fr:"Le chauffeur conduit toute la journée.", ex_vi:"Tài xế lái xe suốt cả ngày." },
          { fr:"le comédien / la comédienne",        vi:"diễn viên hài (nam / nữ)", pos:"Danh từ", ipa:"kɔ.me.djɛ̃ / kɔ.me.djɛn", ex_fr:"Ce comédien fait rire tout le monde.", ex_vi:"Diễn viên hài này làm mọi người cười." },
          { fr:"le danseur / la danseuse",           vi:"vũ công (nam / nữ)", pos:"Danh từ", ipa:"dɑ̃.sœʁ / dɑ̃.søz", ex_fr:"La danseuse répète tous les jours.", ex_vi:"Vũ công luyện tập mỗi ngày." },
          { fr:"le/la journaliste",                  vi:"nhà báo", pos:"Danh từ", ipa:"ʒuʁ.na.list", ex_fr:"Le journaliste écrit un article.",   ex_vi:"Nhà báo viết một bài báo." },
          { fr:"le/la libraire",                     vi:"chủ hiệu sách", pos:"Danh từ", ipa:"li.bʁɛʁ", ex_fr:"Le libraire me conseille un bon livre.", ex_vi:"Chủ hiệu sách giới thiệu cho tôi một cuốn sách hay." },
          { fr:"le/la photographe",                  vi:"nhiếp ảnh gia", pos:"Danh từ", ipa:"fo.tɔ.gʁaf", ex_fr:"Le photographe prend des photos du mariage.", ex_vi:"Nhiếp ảnh gia chụp ảnh đám cưới." },
          { fr:"le policier / la policière",         vi:"cảnh sát (nam / nữ)", pos:"Danh từ", ipa:"pɔ.li.sje / pɔ.li.sjɛʁ", ex_fr:"Le policier contrôle les voitures.", ex_vi:"Cảnh sát kiểm tra các xe ô tô." },
        ]
      },
      {
        id: "u10g6", label: "Les tâches", icon: "✅",
        words: [
          { fr:"communiquer",             vi:"giao tiếp", pos:"Động từ", ipa:"kɔ.my.ni.ke", ex_fr:"Il faut bien communiquer avec l'équipe.", ex_vi:"Cần giao tiếp tốt với nhóm." },
          { fr:"écrire un mail",          vi:"viết email", pos:"Cụm động từ", ipa:"e.kʁiʁ œ̃ mɛl", ex_fr:"J'écris un mail à mon collègue.",   ex_vi:"Tôi viết email cho đồng nghiệp." },
          { fr:"lire un rapport",         vi:"đọc báo cáo", pos:"Cụm động từ", ipa:"liʁ œ̃ ʁa.pɔʁ", ex_fr:"Elle lit un rapport avant la réunion.", ex_vi:"Cô ấy đọc báo cáo trước cuộc họp." },
          { fr:"s'organiser",             vi:"tự tổ chức công việc", pos:"Động từ phản thân", ipa:"sɔʁ.ga.ni.ze", ex_fr:"Il faut bien s'organiser au travail.", ex_vi:"Cần tổ chức công việc tốt." },
          { fr:"préparer une réunion",    vi:"chuẩn bị cuộc họp", pos:"Cụm động từ", ipa:"pʁe.pa.ʁe yn ʁe.y.njɔ̃", ex_fr:"Je prépare une réunion pour demain.", ex_vi:"Tôi chuẩn bị một cuộc họp cho ngày mai." },
          { fr:"travailler sur un dossier",vi:"làm việc trên hồ sơ", pos:"Cụm động từ", ipa:"tʁa.va.je syʁ œ̃ dɔ.sje", ex_fr:"Il travaille sur un dossier important.", ex_vi:"Anh ấy đang làm việc trên một hồ sơ quan trọng." },
        ]
      },
      {
        id: "u10g7", label: "Les outils de communication", icon: "💻",
        words: [
          { fr:"le mail / le courriel",        vi:"email / thư điện tử", pos:"Danh từ (m.)", ipa:"mɛl / ku.ʁjɛl", ex_fr:"J'envoie un mail à mon professeur.", ex_vi:"Tôi gửi một email cho giáo viên." },
          { fr:"l'ordinateur (portable) (m.)", vi:"máy tính (xách tay)", pos:"Danh từ (m.)", ipa:"ɔʁ.di.na.tœʁ pɔʁ.tabl", ex_fr:"J'apporte mon ordinateur portable au bureau.", ex_vi:"Tôi mang máy tính xách tay đến văn phòng." },
          { fr:"le téléphone / le smartphone", vi:"điện thoại / smartphone", pos:"Danh từ (m.)", ipa:"te.le.fɔn / smaʁt.fɔn", ex_fr:"Mon téléphone est presque déchargé.", ex_vi:"Điện thoại của tôi gần hết pin." },
          { fr:"la visioconférence",           vi:"hội nghị truyền hình", pos:"Danh từ (f.)", ipa:"vi.zjo.kɔ̃.fe.ʁɑ̃s", ex_fr:"On a une visioconférence à quatorze heures.", ex_vi:"Chúng tôi có một buổi hội nghị truyền hình vào 14 giờ." },
        ]
      },
      {
        id: "u10g8", label: "Les personnes", icon: "👥",
        words: [
          { fr:"le chef / la cheffe",           vi:"sếp", pos:"Danh từ", ipa:"ʃɛf", ex_fr:"Mon chef est très exigeant.",        ex_vi:"Sếp của tôi rất nghiêm khắc." },
          { fr:"le/la collègue",                vi:"đồng nghiệp", pos:"Danh từ", ipa:"kɔ.lɛg", ex_fr:"Je déjeune avec mes collègues.",  ex_vi:"Tôi ăn trưa cùng đồng nghiệp." },
          { fr:"le directeur / la directrice",  vi:"giám đốc (nam / nữ)", pos:"Danh từ", ipa:"di.ʁɛk.tœʁ / di.ʁɛk.tʁis", ex_fr:"Le directeur dirige l'entreprise.", ex_vi:"Giám đốc điều hành công ty." },
          { fr:"l'équipe (f.)",                 vi:"đội / nhóm", pos:"Danh từ (f.)", ipa:"e.kip", ex_fr:"Notre équipe travaille bien ensemble.", ex_vi:"Nhóm chúng tôi làm việc rất ăn ý." },
          { fr:"le/la responsable",             vi:"người phụ trách", pos:"Danh từ", ipa:"ʁes.pɔ̃.sabl", ex_fr:"Le responsable décide du planning.", ex_vi:"Người phụ trách quyết định lịch trình." },
        ]
      },
      {
        id: "u10g9", label: "L'intensité (adverbes)", icon: "📊",
        words: [
          { fr:"un peu",                vi:"một chút (ít)", pos:"Trạng từ", ipa:"œ̃ pø", ex_fr:"Je suis un peu fatigué.",          ex_vi:"Tôi có một chút mệt." },
          { fr:"assez",                 vi:"khá / đủ", pos:"Trạng từ", ipa:"a.se", ex_fr:"Ce travail est assez difficile.",    ex_vi:"Công việc này khá khó." },
          { fr:"très (+ adjectif)",     vi:"rất (đi với tính từ)", pos:"Trạng từ", ipa:"tʁɛ", ex_fr:"Elle est très contente de son poste.", ex_vi:"Cô ấy rất hài lòng với vị trí của mình." },
          { fr:"beaucoup (+ verbe)",    vi:"nhiều (đi với động từ)", pos:"Trạng từ", ipa:"bo.ku", ex_fr:"Il travaille beaucoup ce mois-ci.", ex_vi:"Tháng này anh ấy làm việc rất nhiều." },
          { fr:"trop (sens négatif)",   vi:"quá (nghĩa tiêu cực)", pos:"Trạng từ", ipa:"tʁo", ex_fr:"Il y a trop de travail cette semaine.", ex_vi:"Tuần này có quá nhiều việc." },
        ]
      },
    ]
  },
];

// Index of words shipped with pre-baked details (ipa/example) for instant,
// offline word cards. Falls back to AI for words not in this index.
const _BAKED_WORD_INDEX = (() => {
  const m = {};
  for (const u of EDITO_VOCAB_UNITS)
    for (const g of u.groups)
      for (const w of g.words)
        if (w.ipa || w.ex_fr) m[w.fr] = w;
  return m;
})();

export function getBakedWord(fr) {
  return _BAKED_WORD_INDEX[fr] || null;
}
