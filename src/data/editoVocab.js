// Edito A1 — Vocabulary organized by unit & group (aligned with Édito A1 Didier FLE)
export const EDITO_VOCAB_UNITS = [
  {
    id: "u0", num: "0", title: "Bienvenue !",
    color: "#4A90D9", bg: "#EBF4FF",
    groups: [
      {
        id: "u0g1", label: "Salutations", icon: "👋",
        words: [
          { fr:"Bonjour",          vi:"Xin chào (ban ngày)" },
          { fr:"Bonsoir",          vi:"Chào buổi tối" },
          { fr:"Bonne nuit",       vi:"Chúc ngủ ngon" },
          { fr:"Salut",            vi:"Chào (thân mật)" },
          { fr:"Au revoir",        vi:"Tạm biệt" },
          { fr:"À bientôt",        vi:"Hẹn gặp lại sớm" },
          { fr:"À demain",         vi:"Hẹn gặp ngày mai" },
          { fr:"À tout à l'heure", vi:"Hẹn gặp lại chút nữa" },
          { fr:"Merci",            vi:"Cảm ơn" },
          { fr:"De rien",          vi:"Không có gì" },
          { fr:"S'il vous plaît",  vi:"Làm ơn (lịch sự)" },
          { fr:"S'il te plaît",    vi:"Làm ơn (thân mật)" },
          { fr:"Excusez-moi",      vi:"Xin lỗi (lịch sự)" },
          { fr:"Pardon",           vi:"Xin lỗi / Xin nhường" },
          { fr:"Enchanté(e)",      vi:"Rất vui được gặp" },
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
          { fr:"la chemise",          vi:"áo sơ mi" },
          { fr:"le costume",          vi:"bộ vest" },
          { fr:"le gilet",            vi:"áo gile" },
          { fr:"l'imperméable (m.)",  vi:"áo mưa" },
          { fr:"la jupe",             vi:"chân váy" },
          { fr:"le manteau",          vi:"áo khoác dài" },
          { fr:"le pantalon",         vi:"quần dài" },
          { fr:"le jean",             vi:"quần jeans" },
          { fr:"le pull",             vi:"áo len" },
          { fr:"la robe",             vi:"váy đầm" },
          { fr:"le short",            vi:"quần short" },
          { fr:"le tee-shirt",        vi:"áo phông" },
          { fr:"la veste",            vi:"áo jacket" },
        ]
      },
      {
        id: "u5g2", label: "Les accessoires", icon: "👜",
        words: [
          { fr:"le(s) bijou(x)",                                    vi:"đồ trang sức" },
          { fr:"la ceinture",                                       vi:"thắt lưng" },
          { fr:"le chapeau",                                        vi:"mũ rộng vành" },
          { fr:"les chaussures (f.)", vi:"giày" },
          { fr:"les baskets (f.)",   vi:"giày thể thao" },
          { fr:"les bottes (f.)",    vi:"giày ống / ủng" },
          { fr:"la cravate",                                        vi:"cà vạt" },
          { fr:"les lunettes de soleil (f.)",                       vi:"kính mát" },
          { fr:"le parapluie",                                      vi:"ô / dù" },
          { fr:"le sac à main",                                     vi:"túi xách tay" },
        ]
      },
      {
        id: "u5g3", label: "Les couleurs", icon: "🎨",
        words: [
          { fr:"blanc / blanche", vi:"trắng" },
          { fr:"bleu(e)",         vi:"xanh dương" },
          { fr:"gris(e)",         vi:"xám" },
          { fr:"jaune",           vi:"vàng" },
          { fr:"marron",          vi:"nâu" },
          { fr:"noir(e)",         vi:"đen" },
          { fr:"rose",            vi:"hồng" },
          { fr:"rouge",           vi:"đỏ" },
          { fr:"vert(e)",         vi:"xanh lá" },
        ]
      },
      {
        id: "u5g4", label: "Les matières", icon: "🧵",
        words: [
          { fr:"en coton (m.)", vi:"bằng vải cotton" },
          { fr:"en cuir (m.)",  vi:"bằng da" },
          { fr:"en jean (m.)",  vi:"bằng vải jeans" },
          { fr:"en laine (f.)", vi:"bằng len" },
        ]
      },
      {
        id: "u5g5", label: "La météo et les températures", icon: "🌦️",
        words: [
          { fr:"le(s) degré(s) (m.)", vi:"độ (nhiệt độ)" },
          { fr:"la neige",            vi:"tuyết" },
          { fr:"le nuage",            vi:"đám mây" },
          { fr:"l'orage (m.)",        vi:"cơn giông bão" },
          { fr:"la pluie",            vi:"mưa" },
          { fr:"le soleil",           vi:"mặt trời / nắng" },
          { fr:"le vent",             vi:"gió" },
        ]
      },
      {
        id: "u5g6", label: "Les objets technologiques", icon: "📱",
        words: [
          { fr:"la batterie (externe)",             vi:"pin dự phòng" },
          { fr:"les écouteurs (m.) (sans fil)",     vi:"tai nghe (không dây)" },
          { fr:"l'enceinte Bluetooth (f.)",         vi:"loa Bluetooth" },
          { fr:"la montre connectée",               vi:"đồng hồ thông minh" },
          { fr:"l'ordinateur (m.) (portable)",      vi:"máy tính (xách tay)" },
          { fr:"la tablette",                       vi:"máy tính bảng" },
          { fr:"le téléphone (portable) / le smartphone", vi:"điện thoại (di động) / smartphone" },
        ]
      },
      {
        id: "u5g7", label: "Les objets du quotidien", icon: "🎒",
        words: [
          { fr:"le cadre photo",   vi:"khung ảnh" },
          { fr:"le porte-clés",    vi:"móc chìa khóa" },
          { fr:"le portefeuille",  vi:"ví tiền" },
          { fr:"le porte-monnaie", vi:"ví đựng tiền lẻ" },
          { fr:"le sac à dos",     vi:"ba lô" },
          { fr:"le sac de sport",  vi:"túi thể thao" },
          { fr:"la valise",        vi:"va-li" },
        ]
      },
      {
        id: "u5g8", label: "La description des objets", icon: "📐",
        words: [
          { fr:"carré(e)",           vi:"hình vuông" },
          { fr:"rond(e)",            vi:"hình tròn" },
          { fr:"rectangulaire",      vi:"hình chữ nhật" },
          { fr:"léger ≠ lourd",      vi:"nhẹ ≠ nặng" },
          { fr:"petit(e) ≠ grand(e)",vi:"nhỏ ≠ lớn" },
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
          { fr:"9 h (du matin)",          vi:"9 giờ sáng" },
          { fr:"9 h 05",                  vi:"9 giờ 5 phút" },
          { fr:"9 h 15 (et quart)",       vi:"9 giờ 15 (một phần tư)" },
          { fr:"9 h 30 (et demie)",       vi:"9 giờ rưỡi" },
          { fr:"9 h 45 (moins le quart)", vi:"9 giờ 45 (kém một phần tư)" },
          { fr:"9 h 50 (moins dix)",      vi:"9 giờ 50 (kém mười)" },
          { fr:"12 h (midi)",             vi:"12 giờ trưa" },
          { fr:"16 h (4 h de l'après-midi)", vi:"16 giờ (4 giờ chiều)" },
          { fr:"21 h (9 h du soir)",      vi:"21 giờ (9 giờ tối)" },
          { fr:"0 h (minuit)",            vi:"0 giờ (nửa đêm)" },
        ]
      },
      {
        id: "u6g2", label: "Les activités quotidiennes", icon: "🌅",
        words: [
          { fr:"se brosser les dents",        vi:"đánh răng" },
          { fr:"se coiffer",                  vi:"chải đầu" },
          { fr:"se coucher",                  vi:"đi ngủ" },
          { fr:"se doucher",                  vi:"tắm vòi sen" },
          { fr:"s'habiller",                  vi:"mặc quần áo" },
          { fr:"se lever",                    vi:"ngồi dậy / dậy khỏi giường" },
          { fr:"se maquiller",                vi:"trang điểm" },
          { fr:"s'occuper des enfants",       vi:"chăm sóc con cái" },
          { fr:"prendre son petit déjeuner",  vi:"ăn sáng" },
          { fr:"se préparer",                 vi:"chuẩn bị" },
          { fr:"se raser",                    vi:"cạo râu" },
          { fr:"se réveiller",                vi:"thức dậy" },
        ]
      },
      {
        id: "u6g3", label: "Les activités de la maison", icon: "🏠",
        words: [
          { fr:"faire du bricolage",           vi:"làm đồ thủ công / sửa đồ nhà" },
          { fr:"bricoler",                     vi:"tự sửa / làm thủ công" },
          { fr:"faire les courses",            vi:"đi mua đồ / đi chợ" },
          { fr:"faire la cuisine",             vi:"nấu ăn" },
          { fr:"cuisiner",                     vi:"nấu ăn" },
          { fr:"faire du jardinage",           vi:"làm vườn" },
          { fr:"jardiner",                     vi:"làm vườn" },
          { fr:"faire une lessive",            vi:"giặt quần áo" },
          { fr:"faire à manger",               vi:"nấu bữa ăn" },
          { fr:"faire le ménage",              vi:"dọn dẹp nhà cửa" },
          { fr:"faire la vaisselle",           vi:"rửa bát đĩa" },
        ]
      },
      {
        id: "u6g4", label: "Le temps libre", icon: "🎭",
        words: [
          { fr:"aller à un cours de dessin", vi:"đi học lớp vẽ" },
          { fr:"dessiner",                   vi:"vẽ" },
          { fr:"écouter de la musique",               vi:"nghe nhạc" },
          { fr:"écouter la radio",                    vi:"nghe đài" },
          { fr:"faire du jogging",                    vi:"chạy bộ" },
          { fr:"faire du sport",                      vi:"tập thể thao" },
          { fr:"jouer à un jeu vidéo",                vi:"chơi game điện tử" },
          { fr:"lire",                                vi:"đọc sách / đọc báo" },
          { fr:"se promener",                         vi:"dạo bộ" },
          { fr:"regarder la télévision",              vi:"xem tivi" },
          { fr:"surfer sur Internet",                 vi:"lướt Internet" },
          { fr:"voir des amis",                       vi:"gặp bạn bè" },
        ]
      },
      {
        id: "u6g5", label: "Les sorties culturelles", icon: "🎪",
        words: [
          { fr:"aller à un concert",   vi:"đi xem hòa nhạc" },
          { fr:"aller au cinéma",      vi:"đi xem phim" },
          { fr:"aller au musée",       vi:"đi bảo tàng" },
          { fr:"aller au théâtre",     vi:"đi xem kịch" },
          { fr:"voir une exposition",  vi:"xem triển lãm" },
        ]
      },
      {
        id: "u6g6", label: "La description physique", icon: "🪞",
        words: [
          { fr:"petit(e) / grand(e)",              vi:"thấp / nhỏ — cao / lớn" },
          { fr:"mince",                            vi:"mảnh mai" },
          { fr:"les cheveux courts / longs",       vi:"tóc ngắn / dài" },
          { fr:"les cheveux gris / roux / frisés", vi:"tóc bạc / hung đỏ / xoăn" },
          { fr:"la moustache",                     vi:"bộ râu mép" },
          { fr:"les yeux marron",                  vi:"mắt nâu" },
        ]
      },
      {
        id: "u6g7", label: "Le caractère", icon: "😊",
        words: [
          { fr:"sympathique / sympa",      vi:"dễ mến" },
          { fr:"bavard(e)",                vi:"hay nói / nhiều chuyện" },
          { fr:"drôle",                    vi:"hài hước / vui tính" },
          { fr:"sociable",                 vi:"hòa đồng" },
          { fr:"calme",                    vi:"bình tĩnh / điềm tĩnh" },
          { fr:"sérieux / sérieuse",       vi:"nghiêm túc" },
          { fr:"timide",                   vi:"nhút nhát / e thẹn" },
          { fr:"dynamique",                vi:"năng động" },
          { fr:"généreux / généreuse",     vi:"hào phóng" },
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
          { fr:"déménager",          vi:"chuyển nhà" },
          { fr:"l'étage (m.)",       vi:"tầng" },
          { fr:"la fenêtre",         vi:"cửa sổ" },
          { fr:"le jardin",          vi:"vườn" },
          { fr:"la maison",          vi:"ngôi nhà" },
          { fr:"la pièce",           vi:"phòng" },
          { fr:"le rez-de-chaussée", vi:"tầng trệt" },
          { fr:"la surface",         vi:"diện tích" },
          { fr:"la terrasse",        vi:"ban công / sân thượng" },
        ]
      },
      {
        id: "u7g2", label: "Les pièces", icon: "🚪",
        words: [
          { fr:"la chambre",          vi:"phòng ngủ" },
          { fr:"la cuisine",          vi:"nhà bếp" },
          { fr:"la salle à manger",   vi:"phòng ăn" },
          { fr:"la salle de bains",   vi:"phòng tắm" },
          { fr:"le salon",            vi:"phòng khách" },
          { fr:"les toilettes (f.)",  vi:"nhà vệ sinh / WC" },
        ]
      },
      {
        id: "u7g3", label: "Les meubles", icon: "🛋️",
        words: [
          { fr:"l'armoire (f.)",      vi:"tủ quần áo" },
          { fr:"le bureau",           vi:"bàn làm việc" },
          { fr:"le canapé",           vi:"ghế sofa" },
          { fr:"la chaise",           vi:"ghế" },
          { fr:"le fauteuil",         vi:"ghế bành" },
          { fr:"le lit",              vi:"giường" },
          { fr:"la table (basse)",    vi:"bàn (thấp / cà phê)" },
        ]
      },
      {
        id: "u7g4", label: "L'électroménager", icon: "🍳",
        words: [
          { fr:"la cuisinière",                   vi:"bếp nấu" },
          { fr:"le four (à micro-ondes)",         vi:"lò nướng (vi sóng)" },
          { fr:"le lave-linge",                   vi:"máy giặt" },
          { fr:"le réfrigérateur / le frigo (fam.)", vi:"tủ lạnh" },
        ]
      },
      {
        id: "u7g5", label: "Les objets et la décoration", icon: "🖼️",
        words: [
          { fr:"l'aquarium (m.)", vi:"bể cá cảnh" },
          { fr:"décorer",         vi:"trang trí" },
          { fr:"la lampe",        vi:"đèn" },
          { fr:"la plante",       vi:"cây cảnh" },
          { fr:"le tableau",      vi:"bức tranh (treo tường)" },
          { fr:"le tapis",        vi:"tấm thảm" },
          { fr:"la télévision",   vi:"ti vi" },
        ]
      },
      {
        id: "u7g6", label: "L'immeuble", icon: "🏢",
        words: [
          { fr:"l'appartement (m.)",    vi:"căn hộ" },
          { fr:"l'ascenseur (m.)",      vi:"thang máy" },
          { fr:"le balcon",             vi:"ban công" },
          { fr:"le couloir",            vi:"hành lang" },
          { fr:"l'escalier (m.)",       vi:"cầu thang" },
          { fr:"le hall",               vi:"sảnh" },
          { fr:"le local à poubelles",  vi:"khu vực để thùng rác" },
          { fr:"le local à vélos",      vi:"khu vực gửi xe đạp" },
          { fr:"la pelouse",            vi:"bãi cỏ" },
          { fr:"la porte (d'entrée)",   vi:"cửa ra vào" },
          { fr:"la résidence",          vi:"khu dân cư" },
          { fr:"le/la voisin(e)",       vi:"hàng xóm" },
        ]
      },
      {
        id: "u7g7", label: "Les problèmes, pannes et solutions", icon: "🔧",
        words: [
          { fr:"la fuite d'eau", vi:"rò rỉ nước" },
          { fr:"fonctionner",    vi:"hoạt động / vận hành" },
          { fr:"marcher",        vi:"chạy / hoạt động (máy móc)" },
          { fr:"réparer",        vi:"sửa chữa" },
        ]
      },
      {
        id: "u7g8", label: "Les professionnels", icon: "👷",
        words: [
          { fr:"l'électricien (m.)",   vi:"thợ điện" },
          { fr:"l'informaticien (m.)", vi:"kỹ thuật viên tin học" },
          { fr:"le peintre",           vi:"thợ sơn" },
          { fr:"le plombier",          vi:"thợ sửa ống nước" },
          { fr:"le serrurier",         vi:"thợ khóa" },
        ]
      },
      {
        id: "u7g9", label: "Les prépositions de lieu (2)", icon: "📍",
        words: [
          { fr:"à gauche (de) / à droite (de)", vi:"bên trái (của) / bên phải (của)" },
          { fr:"devant / derrière",             vi:"phía trước / phía sau" },
          { fr:"sur / sous",                    vi:"trên / dưới" },
          { fr:"à côté (de)",                   vi:"bên cạnh (của)" },
          { fr:"en face (de)",                  vi:"đối diện (với)" },
          { fr:"entre",                         vi:"giữa (hai vật)" },
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
          { fr:"le bras",    vi:"cánh tay" },
          { fr:"le dos",     vi:"lưng" },
          { fr:"le genou",   vi:"đầu gối" },
          { fr:"la gorge",   vi:"cổ họng" },
          { fr:"la jambe",   vi:"chân" },
          { fr:"la main",    vi:"bàn tay" },
          { fr:"le pied",    vi:"bàn chân" },
          { fr:"la tête",    vi:"cái đầu" },
          { fr:"le ventre",  vi:"bụng" },
        ]
      },
      {
        id: "u8g2", label: "Le visage", icon: "😊",
        words: [
          { fr:"la bouche",          vi:"cái miệng" },
          { fr:"la dent",            vi:"cái răng" },
          { fr:"le nez",             vi:"cái mũi" },
          { fr:"l'œil (m.) / les yeux", vi:"mắt / đôi mắt" },
          { fr:"l'oreille (f.)",     vi:"cái tai" },
        ]
      },
      {
        id: "u8g3", label: "La taille et le poids", icon: "📏",
        words: [
          { fr:"mesurer / le mètre (= m)",  vi:"đo chiều cao / mét" },
          { fr:"peser / le kilo (= kg)",    vi:"cân nặng / ki-lô-gam" },
        ]
      },
      {
        id: "u8g4", label: "Les symptômes et maladies", icon: "🤒",
        words: [
          { fr:"la fièvre", vi:"sốt" },
          { fr:"la grippe", vi:"cảm cúm" },
          { fr:"malade",    vi:"ốm / bệnh" },
          { fr:"le rhume",  vi:"cảm lạnh" },
          { fr:"tousser",   vi:"ho" },
          { fr:"la toux",   vi:"cơn ho" },
        ]
      },
      {
        id: "u8g5", label: "Les lieux, médicaments et examens", icon: "🏥",
        words: [
          { fr:"l'hôpital (m.)",       vi:"bệnh viện" },
          { fr:"la pharmacie",         vi:"nhà thuốc" },
          { fr:"le paracétamol",       vi:"thuốc paracetamol" },
          { fr:"la radio",             vi:"chụp X-quang" },
          { fr:"le sirop",             vi:"siro (thuốc)" },
          { fr:"la visite à domicile", vi:"khám tại nhà" },
          { fr:"la vitamine C",        vi:"vitamin C" },
        ]
      },
      {
        id: "u8g6", label: "Les professions médicales", icon: "👨‍⚕️",
        words: [
          { fr:"le dentiste",                              vi:"nha sĩ" },
          { fr:"le/la docteur(e) / le médecin",           vi:"bác sĩ" },
          { fr:"l'infirmier (m.) / l'infirmière (f.)",    vi:"y tá (nam / nữ)" },
          { fr:"le pharmacien / la pharmacienne",         vi:"dược sĩ (nam / nữ)" },
        ]
      },
      {
        id: "u8g7", label: "Les émotions", icon: "😄",
        words: [
          { fr:"content(e)",              vi:"vui vẻ / hài lòng" },
          { fr:"heureux / heureuse",      vi:"hạnh phúc" },
          { fr:"fatigué(e)",              vi:"mệt mỏi" },
          { fr:"inquiet / inquiète",      vi:"lo lắng" },
          { fr:"malheureux / malheureuse",vi:"bất hạnh / không hạnh phúc" },
          { fr:"stressé(e)",              vi:"căng thẳng" },
          { fr:"triste",                  vi:"buồn" },
        ]
      },
      {
        id: "u8g8", label: "La salle de sport", icon: "🏋️",
        words: [
          { fr:"l'activité (f.) physique",  vi:"hoạt động thể chất" },
          { fr:"l'appareil (m.) de sport",  vi:"dụng cụ tập thể thao" },
          { fr:"le certificat médical",     vi:"giấy chứng nhận y tế" },
          { fr:"le coach",                  vi:"huấn luyện viên" },
          { fr:"la douche",                 vi:"vòi tắm" },
          { fr:"le maillot de bain",        vi:"đồ bơi" },
          { fr:"le sauna",                  vi:"phòng xông hơi" },
          { fr:"la serviette de bain",      vi:"khăn tắm" },
          { fr:"le vestiaire",              vi:"phòng thay đồ" },
        ]
      },
      {
        id: "u8g9", label: "L'alimentation", icon: "🥗",
        words: [
          { fr:"l'alimentation (f.) saine",                vi:"chế độ ăn lành mạnh" },
          { fr:"la calorie",                               vi:"calo" },
          { fr:"le produit : gras / salé / sucré",         vi:"thực phẩm: béo / mặn / ngọt" },
        ]
      },
      {
        id: "u8g10", label: "Les sports", icon: "⚽",
        words: [
          { fr:"la corde à sauter",      vi:"dây nhảy" },
          { fr:"la course à pied",       vi:"chạy bộ" },
          { fr:"la gymnastique",         vi:"thể dục thể hình" },
          { fr:"le judo",                vi:"judo" },
          { fr:"la marche (rapide)",     vi:"đi bộ (nhanh)" },
          { fr:"la musculation",         vi:"tập tạ" },
          { fr:"la natation",            vi:"bơi lội" },
          { fr:"le rugby",               vi:"bóng bầu dục" },
          { fr:"le tennis",              vi:"quần vợt" },
          { fr:"le volley (le volley-ball)", vi:"bóng chuyền" },
          { fr:"le yoga",                vi:"yoga" },
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
          { fr:"la campagne",  vi:"vùng nông thôn" },
          { fr:"l'île (f.)",   vi:"đảo" },
          { fr:"la mer",       vi:"biển" },
          { fr:"la montagne",  vi:"núi" },
          { fr:"le village",   vi:"làng / thị trấn nhỏ" },
        ]
      },
      {
        id: "u9g2", label: "L'hébergement", icon: "🏨",
        words: [
          { fr:"le camping",                              vi:"cắm trại / khu cắm trại" },
          { fr:"la chambre d'hôtes",                      vi:"phòng trọ tư nhân (B&B)" },
          { fr:"l'échange (m.) d'appartements / de maisons", vi:"trao đổi căn hộ / nhà ở" },
          { fr:"la ferme",                                vi:"trang trại" },
          { fr:"l'hôtel (m.)",                            vi:"khách sạn" },
          { fr:"la location",                             vi:"nhà thuê (nghỉ dưỡng)" },
          { fr:"la tente",                                vi:"lều cắm trại" },
        ]
      },
      {
        id: "u9g3", label: "La réservation", icon: "📋",
        words: [
          { fr:"l'arrivée (f.) ≠ le départ",                        vi:"ngày đến ≠ ngày đi" },
          { fr:"la chambre (simple / double / familiale)",           vi:"phòng (đơn / đôi / gia đình)" },
          { fr:"le lit simple",                                      vi:"giường đơn" },
          { fr:"le lit double",                                      vi:"giường đôi" },
          { fr:"le lit bébé",                                        vi:"giường trẻ em" },
          { fr:"le parking",                                         vi:"bãi đỗ xe" },
          { fr:"le petit déjeuner compris",                          vi:"bao gồm bữa sáng" },
          { fr:"les animaux acceptés",                               vi:"cho phép mang thú cưng" },
          { fr:"réserver une chambre",                              vi:"đặt phòng" },
        ]
      },
      {
        id: "u9g4", label: "Les moyens de transport", icon: "✈️",
        words: [
          { fr:"l'avion (m.) → à l'aéroport", vi:"máy bay → ở sân bay" },
          { fr:"le van",                       vi:"xe van" },
          { fr:"la voiture",                   vi:"ô tô" },
        ]
      },
      {
        id: "u9g5", label: "Les activités de vacances", icon: "🏖️",
        words: [
          { fr:"se baigner",                  vi:"tắm biển / tắm sông" },
          { fr:"bronzer",                     vi:"tắm nắng" },
          { fr:"faire de la randonnée",       vi:"đi bộ đường dài" },
          { fr:"faire du surf",               vi:"lướt sóng" },
          { fr:"goûter la cuisine locale",    vi:"thử ẩm thực địa phương" },
          { fr:"prendre des photos",          vi:"chụp ảnh" },
          { fr:"visiter un musée / un village",vi:"tham quan bảo tàng / làng" },
        ]
      },
      {
        id: "u9g6", label: "Les lieux dans la nature", icon: "🌿",
        words: [
          { fr:"le champ",   vi:"cánh đồng" },
          { fr:"le chemin",  vi:"con đường mòn" },
          { fr:"la forêt",   vi:"khu rừng" },
          { fr:"le lac",     vi:"hồ" },
          { fr:"la plage",   vi:"bãi biển" },
          { fr:"la rivière", vi:"con sông (nhỏ)" },
        ]
      },
      {
        id: "u9g7", label: "La flore", icon: "🌳",
        words: [
          { fr:"l'arbre (m.)", vi:"cây" },
          { fr:"la fleur",     vi:"bông hoa" },
          { fr:"l'herbe (f.)", vi:"cỏ" },
          { fr:"la plante",    vi:"cây cối / thực vật" },
        ]
      },
      {
        id: "u9g8", label: "Les animaux", icon: "🐄",
        words: [
          { fr:"le canard",    vi:"con vịt" },
          { fr:"le chat",      vi:"con mèo" },
          { fr:"le cheval",    vi:"con ngựa" },
          { fr:"le chien",     vi:"con chó" },
          { fr:"le lapin",     vi:"con thỏ" },
          { fr:"l'oiseau (m.)",vi:"con chim" },
          { fr:"le poisson",   vi:"con cá" },
          { fr:"la poule",     vi:"con gà mái" },
          { fr:"la vache",     vi:"con bò" },
        ]
      },
      {
        id: "u9g9", label: "Les activités nature", icon: "🚤",
        words: [
          { fr:"faire du bateau",    vi:"đi thuyền" },
          { fr:"faire de la plongée",vi:"lặn biển" },
          { fr:"pique-niquer",       vi:"dã ngoại / picnic" },
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
          { fr:"l'amphithéâtre / l'amphi (m.)",              vi:"giảng đường lớn" },
          { fr:"la bibliothèque",                            vi:"thư viện" },
          { fr:"le logement étudiant",                       vi:"ký túc xá / nhà sinh viên" },
          { fr:"le restaurant universitaire / le resto U (fam.)", vi:"căn tin sinh viên" },
          { fr:"la salle de cours",                          vi:"phòng học" },
          { fr:"le secrétariat",                             vi:"phòng hành chính" },
          { fr:"l'université (f.)",                          vi:"trường đại học" },
        ]
      },
      {
        id: "u10g2", label: "Les études et les personnes", icon: "📚",
        words: [
          { fr:"le cours / étudier",                               vi:"buổi học / học" },
          { fr:"le diplôme (la licence, le master, le doctorat)",  vi:"bằng cấp (cử nhân, thạc sĩ, tiến sĩ)" },
          { fr:"faire des études",                                 vi:"đi học" },
          { fr:"faire un stage",                                   vi:"thực tập" },
          { fr:"l'enseignant(e)",                                  vi:"giáo viên / người dạy" },
          { fr:"le/la professeur(e)",                              vi:"giáo viên / giáo sư" },
          { fr:"les études",                                       vi:"việc học" },
          { fr:"la note",                                          vi:"điểm số" },
          { fr:"l'étudiant(e)",                                    vi:"sinh viên" },
          { fr:"s'inscrire",                                       vi:"đăng ký / ghi danh" },
          { fr:"la formation",                                     vi:"khóa đào tạo" },
        ]
      },
      {
        id: "u10g3", label: "Les disciplines", icon: "🔬",
        words: [
          { fr:"le commerce",         vi:"thương mại" },
          { fr:"le droit",            vi:"luật" },
          { fr:"l'économie (f.)",     vi:"kinh tế học" },
          { fr:"l'informatique (m.)", vi:"tin học" },
          { fr:"les langues",         vi:"các ngôn ngữ / ngoại ngữ" },
          { fr:"les lettres",         vi:"văn học / ngữ văn" },
          { fr:"les mathématiques",   vi:"toán học" },
          { fr:"les sciences",        vi:"khoa học" },
        ]
      },
      {
        id: "u10g4", label: "Les conditions et lieux de travail", icon: "🏢",
        words: [
          { fr:"le bureau",                          vi:"văn phòng" },
          { fr:"le contrat",                         vi:"hợp đồng" },
          { fr:"les horaires (m.)",                  vi:"giờ làm việc" },
          { fr:"la machine à café",                  vi:"máy cà phê" },
          { fr:"la pause-déjeuner",                  vi:"giờ nghỉ trưa" },
          { fr:"le poste",                           vi:"chức vụ / vị trí" },
          { fr:"le restaurant d'entreprise",         vi:"căn tin công ty" },
          { fr:"le salaire",                         vi:"lương" },
          { fr:"le télétravail / faire du télétravail", vi:"làm việc từ xa" },
        ]
      },
      {
        id: "u10g5", label: "Les professions", icon: "👩‍🌾",
        words: [
          { fr:"l'agriculteur / l'agricultrice",     vi:"nông dân (nam / nữ)" },
          { fr:"l'artiste (m./f.)",                  vi:"nghệ sĩ" },
          { fr:"le boucher / la bouchère",           vi:"người bán thịt (nam / nữ)" },
          { fr:"le chauffeur",                       vi:"tài xế" },
          { fr:"le comédien / la comédienne",        vi:"diễn viên hài (nam / nữ)" },
          { fr:"le danseur / la danseuse",           vi:"vũ công (nam / nữ)" },
          { fr:"le/la journaliste",                  vi:"nhà báo" },
          { fr:"le/la libraire",                     vi:"chủ hiệu sách" },
          { fr:"le/la photographe",                  vi:"nhiếp ảnh gia" },
          { fr:"le policier / la policière",         vi:"cảnh sát (nam / nữ)" },
        ]
      },
      {
        id: "u10g6", label: "Les tâches", icon: "✅",
        words: [
          { fr:"communiquer",             vi:"giao tiếp" },
          { fr:"écrire un mail",          vi:"viết email" },
          { fr:"lire un rapport",         vi:"đọc báo cáo" },
          { fr:"s'organiser",             vi:"tự tổ chức công việc" },
          { fr:"préparer une réunion",    vi:"chuẩn bị cuộc họp" },
          { fr:"travailler sur un dossier",vi:"làm việc trên hồ sơ" },
        ]
      },
      {
        id: "u10g7", label: "Les outils de communication", icon: "💻",
        words: [
          { fr:"le mail / le courriel",        vi:"email / thư điện tử" },
          { fr:"l'ordinateur (portable) (m.)", vi:"máy tính (xách tay)" },
          { fr:"le téléphone / le smartphone", vi:"điện thoại / smartphone" },
          { fr:"la visioconférence",           vi:"hội nghị truyền hình" },
        ]
      },
      {
        id: "u10g8", label: "Les personnes", icon: "👥",
        words: [
          { fr:"le chef / la cheffe",           vi:"sếp" },
          { fr:"le/la collègue",                vi:"đồng nghiệp" },
          { fr:"le directeur / la directrice",  vi:"giám đốc (nam / nữ)" },
          { fr:"l'équipe (f.)",                 vi:"đội / nhóm" },
          { fr:"le/la responsable",             vi:"người phụ trách" },
        ]
      },
      {
        id: "u10g9", label: "L'intensité (adverbes)", icon: "📊",
        words: [
          { fr:"un peu",                vi:"một chút (ít)" },
          { fr:"assez",                 vi:"khá / đủ" },
          { fr:"très (+ adjectif)",     vi:"rất (đi với tính từ)" },
          { fr:"beaucoup (+ verbe)",    vi:"nhiều (đi với động từ)" },
          { fr:"trop (sens négatif)",   vi:"quá (nghĩa tiêu cực)" },
        ]
      },
    ]
  },
];
