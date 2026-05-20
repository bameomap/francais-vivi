// Edito A1 — Vocabulary organized by unit & group
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
          { fr:"Vous vous appelez comment?", vi:"Bạn tên là gì? (lịch sự)" },
          { fr:"Tu t'appelles comment?",     vi:"Bạn tên là gì? (thân mật)" },
          { fr:"Vous avez quel âge?", vi:"Bạn bao nhiêu tuổi? (lịch sự)" },
          { fr:"Vous habitez où?",   vi:"Bạn sống ở đâu? (lịch sự)" },
        ]
      },
      {
        id: "u0g3", label: "Nationalités", icon: "🌍",
        words: [
          { fr:"français / française",     vi:"người Pháp (nam/nữ)" },
          { fr:"vietnamien / vietnamienne", vi:"người Việt Nam (nam/nữ)" },
          { fr:"japonais / japonaise",      vi:"người Nhật (nam/nữ)" },
          { fr:"chinois / chinoise",        vi:"người Trung Quốc (nam/nữ)" },
          { fr:"américain / américaine",    vi:"người Mỹ (nam/nữ)" },
          { fr:"anglais / anglaise",        vi:"người Anh (nam/nữ)" },
          { fr:"espagnol / espagnole",      vi:"người Tây Ban Nha (nam/nữ)" },
          { fr:"italien / italienne",       vi:"người Ý (nam/nữ)" },
          { fr:"coréen / coréenne",         vi:"người Hàn Quốc (nam/nữ)" },
          { fr:"allemand / allemande",      vi:"người Đức (nam/nữ)" },
          { fr:"belge",                     vi:"người Bỉ (nam và nữ)" },
          { fr:"suisse",                    vi:"người Thụy Sĩ (nam và nữ)" },
        ]
      },
      {
        id: "u0g4", label: "En classe", icon: "📚",
        words: [
          { fr:"le professeur",      vi:"giáo viên" },
          { fr:"l'étudiant(e)",      vi:"sinh viên" },
          { fr:"le livre",           vi:"quyển sách" },
          { fr:"le cahier",          vi:"quyển vở" },
          { fr:"le stylo",           vi:"bút bi" },
          { fr:"le crayon",          vi:"bút chì" },
          { fr:"la gomme",           vi:"cục tẩy" },
          { fr:"le tableau",         vi:"bảng đen" },
          { fr:"la chaise",          vi:"cái ghế" },
          { fr:"la table",           vi:"cái bàn" },
          { fr:"Répétez, s'il vous plaît", vi:"Hãy lặp lại, làm ơn" },
          { fr:"Je ne comprends pas",      vi:"Tôi không hiểu" },
          { fr:"Comment dit-on...?",       vi:"Người ta nói ... như thế nào?" },
          { fr:"Qu'est-ce que ça veut dire?", vi:"Cái này có nghĩa là gì?" },
        ]
      },
    ]
  },
  {
    id: "u1", num: "1", title: "Je suis…",
    color: "#7B6CF6", bg: "#F0EEFF",
    groups: [
      {
        id: "u1g1", label: "La famille", icon: "👨‍👩‍👧",
        words: [
          { fr:"le père",         vi:"bố / ba" },
          { fr:"la mère",         vi:"mẹ" },
          { fr:"le frère",        vi:"anh / em trai" },
          { fr:"la sœur",         vi:"chị / em gái" },
          { fr:"le fils",         vi:"con trai" },
          { fr:"la fille",        vi:"con gái" },
          { fr:"le grand-père",   vi:"ông nội / ngoại" },
          { fr:"la grand-mère",   vi:"bà nội / ngoại" },
          { fr:"l'oncle",         vi:"chú / bác / cậu" },
          { fr:"la tante",        vi:"cô / dì / mợ" },
          { fr:"le cousin",       vi:"anh / em họ (nam)" },
          { fr:"la cousine",      vi:"chị / em họ (nữ)" },
          { fr:"le mari",         vi:"chồng" },
          { fr:"la femme",        vi:"vợ" },
          { fr:"le bébé",         vi:"em bé" },
        ]
      },
      {
        id: "u1g2", label: "Les professions", icon: "💼",
        words: [
          { fr:"médecin",         vi:"bác sĩ" },
          { fr:"infirmier(ère)",  vi:"y tá" },
          { fr:"professeur",      vi:"giáo viên / giáo sư" },
          { fr:"étudiant(e)",     vi:"sinh viên" },
          { fr:"ingénieur",       vi:"kỹ sư" },
          { fr:"architecte",      vi:"kiến trúc sư" },
          { fr:"journaliste",     vi:"nhà báo" },
          { fr:"acteur / actrice",vi:"diễn viên" },
          { fr:"chanteur(se)",    vi:"ca sĩ" },
          { fr:"cuisinier(ère)",  vi:"đầu bếp" },
          { fr:"serveur(se)",     vi:"bồi bàn" },
          { fr:"vendeur(se)",     vi:"người bán hàng" },
          { fr:"avocat(e)",       vi:"luật sư" },
          { fr:"secrétaire",      vi:"thư ký" },
          { fr:"sans emploi",     vi:"thất nghiệp" },
        ]
      },
      {
        id: "u1g3", label: "Description physique", icon: "🪞",
        words: [
          { fr:"grand(e)",        vi:"cao" },
          { fr:"petit(e)",        vi:"thấp / nhỏ" },
          { fr:"mince",           vi:"mảnh khảnh / gầy" },
          { fr:"gros(se)",        vi:"to / béo" },
          { fr:"beau / belle",    vi:"đẹp trai / đẹp gái" },
          { fr:"les cheveux blonds", vi:"tóc vàng" },
          { fr:"les cheveux bruns",  vi:"tóc nâu" },
          { fr:"les cheveux noirs",  vi:"tóc đen" },
          { fr:"les yeux bleus",  vi:"mắt xanh" },
          { fr:"les yeux verts",  vi:"mắt xanh lá" },
          { fr:"les yeux noirs",  vi:"mắt đen" },
          { fr:"jeune",           vi:"trẻ" },
          { fr:"âgé(e)",          vi:"lớn tuổi / già" },
        ]
      },
    ]
  },
  {
    id: "u2", num: "2", title: "Près de moi",
    color: "#0891B2", bg: "#F0F9FF",
    groups: [
      {
        id: "u2g1", label: "Les objets du quotidien", icon: "🎒",
        words: [
          { fr:"le téléphone portable", vi:"điện thoại di động" },
          { fr:"l'ordinateur",          vi:"máy tính" },
          { fr:"la tablette",           vi:"máy tính bảng" },
          { fr:"les clés",              vi:"chìa khóa" },
          { fr:"le portefeuille",       vi:"ví tiền" },
          { fr:"le sac à dos",          vi:"ba lô" },
          { fr:"l'agenda",              vi:"sổ tay lịch" },
          { fr:"la montre",             vi:"đồng hồ đeo tay" },
          { fr:"les lunettes",          vi:"kính mắt" },
          { fr:"le parapluie",          vi:"ô / dù" },
          { fr:"la carte d'identité",   vi:"chứng minh nhân dân / CCCD" },
          { fr:"le passeport",          vi:"hộ chiếu" },
        ]
      },
      {
        id: "u2g2", label: "Les couleurs", icon: "🎨",
        words: [
          { fr:"rouge",       vi:"màu đỏ" },
          { fr:"bleu(e)",     vi:"màu xanh dương" },
          { fr:"vert(e)",     vi:"màu xanh lá" },
          { fr:"jaune",       vi:"màu vàng" },
          { fr:"orange",      vi:"màu cam" },
          { fr:"violet(te)",  vi:"màu tím" },
          { fr:"rose",        vi:"màu hồng" },
          { fr:"blanc / blanche", vi:"màu trắng" },
          { fr:"noir(e)",     vi:"màu đen" },
          { fr:"gris(e)",     vi:"màu xám" },
          { fr:"marron",      vi:"màu nâu" },
          { fr:"beige",       vi:"màu be / kem" },
        ]
      },
      {
        id: "u2g3", label: "Adjectifs de base", icon: "✨",
        words: [
          { fr:"nouveau / nouvelle",  vi:"mới" },
          { fr:"vieux / vieille",     vi:"cũ / già" },
          { fr:"grand(e)",            vi:"to / lớn / cao" },
          { fr:"petit(e)",            vi:"nhỏ / thấp" },
          { fr:"long(ue)",            vi:"dài" },
          { fr:"court(e)",            vi:"ngắn" },
          { fr:"cher / chère",        vi:"đắt tiền" },
          { fr:"bon marché",          vi:"rẻ tiền" },
          { fr:"joli(e)",             vi:"xinh / đẹp" },
          { fr:"sympa",               vi:"dễ mến / thân thiện" },
          { fr:"intéressant(e)",      vi:"thú vị" },
          { fr:"facile",              vi:"dễ" },
          { fr:"difficile",           vi:"khó" },
        ]
      },
    ]
  },
  {
    id: "u3", num: "3", title: "Qu'est-ce qu'on mange ?",
    color: "#D97706", bg: "#FFFBEB",
    groups: [
      {
        id: "u3g1", label: "Les repas & aliments", icon: "🥐",
        words: [
          { fr:"le petit-déjeuner",  vi:"bữa sáng" },
          { fr:"le déjeuner",        vi:"bữa trưa" },
          { fr:"le dîner",           vi:"bữa tối" },
          { fr:"le pain",            vi:"bánh mì" },
          { fr:"le croissant",       vi:"bánh sừng bò" },
          { fr:"le fromage",         vi:"phô mai" },
          { fr:"le beurre",          vi:"bơ" },
          { fr:"la confiture",       vi:"mứt" },
          { fr:"l'œuf",              vi:"quả trứng" },
          { fr:"la viande",          vi:"thịt" },
          { fr:"le poulet",          vi:"thịt gà" },
          { fr:"le poisson",         vi:"cá" },
          { fr:"les légumes",        vi:"rau củ" },
          { fr:"la salade",          vi:"rau xà lách / rau trộn" },
          { fr:"les fruits",         vi:"hoa quả" },
          { fr:"la pomme",           vi:"quả táo" },
          { fr:"la banane",          vi:"quả chuối" },
          { fr:"le gâteau",          vi:"bánh ngọt" },
        ]
      },
      {
        id: "u3g2", label: "Les boissons", icon: "☕",
        words: [
          { fr:"l'eau (minérale)",   vi:"nước (khoáng)" },
          { fr:"le jus d'orange",    vi:"nước cam" },
          { fr:"le café",            vi:"cà phê" },
          { fr:"le thé",             vi:"trà" },
          { fr:"le lait",            vi:"sữa" },
          { fr:"la bière",           vi:"bia" },
          { fr:"le vin",             vi:"rượu vang" },
          { fr:"le coca",            vi:"nước cola" },
          { fr:"le chocolat chaud",  vi:"sô-cô-la nóng" },
        ]
      },
      {
        id: "u3g3", label: "Au restaurant", icon: "🍽️",
        words: [
          { fr:"la carte",           vi:"thực đơn" },
          { fr:"le menu",            vi:"thực đơn cố định" },
          { fr:"l'entrée",           vi:"món khai vị" },
          { fr:"le plat principal",  vi:"món chính" },
          { fr:"le dessert",         vi:"món tráng miệng" },
          { fr:"l'addition",         vi:"hóa đơn thanh toán" },
          { fr:"le pourboire",       vi:"tiền boa" },
          { fr:"commander",          vi:"gọi món" },
          { fr:"réserver une table", vi:"đặt bàn" },
          { fr:"Je voudrais...",      vi:"Tôi muốn... (lịch sự)" },
          { fr:"L'addition, s'il vous plaît", vi:"Cho tôi hóa đơn" },
        ]
      },
      {
        id: "u3g4", label: "Quantités", icon: "⚖️",
        words: [
          { fr:"un kilo de",         vi:"một kg" },
          { fr:"un litre de",        vi:"một lít" },
          { fr:"une bouteille de",   vi:"một chai" },
          { fr:"une boîte de",       vi:"một hộp" },
          { fr:"un paquet de",       vi:"một gói" },
          { fr:"un morceau de",      vi:"một miếng" },
          { fr:"une tranche de",     vi:"một lát" },
          { fr:"beaucoup de",        vi:"nhiều" },
          { fr:"un peu de",          vi:"một chút" },
          { fr:"assez de",           vi:"đủ" },
          { fr:"trop de",            vi:"quá nhiều" },
        ]
      },
    ]
  },
  {
    id: "u4", num: "4", title: "C'est où ?",
    color: "#059669", bg: "#ECFDF5",
    groups: [
      {
        id: "u4g1", label: "La ville", icon: "🏙️",
        words: [
          { fr:"la rue",             vi:"con đường / phố" },
          { fr:"l'avenue",           vi:"đại lộ" },
          { fr:"le boulevard",       vi:"đường lớn" },
          { fr:"la place",           vi:"quảng trường" },
          { fr:"la mairie",          vi:"tòa thị chính" },
          { fr:"l'église",           vi:"nhà thờ" },
          { fr:"le musée",           vi:"bảo tàng" },
          { fr:"le cinéma",          vi:"rạp chiếu phim" },
          { fr:"le théâtre",         vi:"nhà hát" },
          { fr:"la bibliothèque",    vi:"thư viện" },
          { fr:"la pharmacie",       vi:"nhà thuốc" },
          { fr:"la boulangerie",     vi:"tiệm bánh mì" },
          { fr:"la boucherie",       vi:"tiệm thịt" },
          { fr:"le supermarché",     vi:"siêu thị" },
          { fr:"le marché",          vi:"chợ" },
          { fr:"la banque",          vi:"ngân hàng" },
          { fr:"la poste",           vi:"bưu điện" },
          { fr:"l'hôpital",          vi:"bệnh viện" },
          { fr:"l'hôtel",            vi:"khách sạn" },
          { fr:"la gare",            vi:"ga tàu hỏa" },
          { fr:"l'aéroport",         vi:"sân bay" },
        ]
      },
      {
        id: "u4g2", label: "Les transports", icon: "🚇",
        words: [
          { fr:"le métro",           vi:"tàu điện ngầm" },
          { fr:"le bus",             vi:"xe buýt" },
          { fr:"le tramway",         vi:"tàu điện" },
          { fr:"le taxi",            vi:"taxi" },
          { fr:"le train",           vi:"tàu hỏa" },
          { fr:"l'avion",            vi:"máy bay" },
          { fr:"le vélo",            vi:"xe đạp" },
          { fr:"la voiture",         vi:"ô tô / xe hơi" },
          { fr:"à pied",             vi:"đi bộ" },
          { fr:"le ticket",          vi:"vé (tàu/bus)" },
          { fr:"le billet",          vi:"vé (tàu hỏa/máy bay)" },
        ]
      },
      {
        id: "u4g3", label: "Les directions", icon: "🗺️",
        words: [
          { fr:"tout droit",         vi:"đi thẳng" },
          { fr:"à gauche",           vi:"bên trái / rẽ trái" },
          { fr:"à droite",           vi:"bên phải / rẽ phải" },
          { fr:"au bout de",         vi:"ở cuối" },
          { fr:"au coin de",         vi:"ở góc" },
          { fr:"en face de",         vi:"đối diện" },
          { fr:"à côté de",          vi:"bên cạnh" },
          { fr:"près de",            vi:"gần" },
          { fr:"loin de",            vi:"xa" },
          { fr:"derrière",           vi:"đằng sau" },
          { fr:"devant",             vi:"trước mặt" },
          { fr:"entre",              vi:"giữa" },
          { fr:"Où est...?",         vi:"... ở đâu?" },
          { fr:"C'est loin d'ici?",  vi:"Từ đây có xa không?" },
        ]
      },
    ]
  },
  {
    id: "u5", num: "5", title: "C'est tendance !",
    color: "#8E44AD", bg: "#F5EEFF",
    groups: [
      {
        id: "u5g1", label: "Les vêtements", icon: "👗",
        words: [
          { fr:"le manteau",         vi:"áo khoác dài" },
          { fr:"la veste",           vi:"áo jacket / veston" },
          { fr:"le pull",            vi:"áo len" },
          { fr:"le t-shirt",         vi:"áo phông" },
          { fr:"la chemise",         vi:"áo sơ mi" },
          { fr:"le pantalon",        vi:"quần dài" },
          { fr:"le jean",            vi:"quần jeans" },
          { fr:"la jupe",            vi:"váy ngắn" },
          { fr:"la robe",            vi:"váy đầm" },
          { fr:"le short",           vi:"quần short" },
          { fr:"les chaussures",     vi:"giày" },
          { fr:"les baskets",        vi:"giày thể thao" },
          { fr:"les bottes",         vi:"giày ống" },
          { fr:"les chaussettes",    vi:"tất / vớ" },
          { fr:"le chapeau",         vi:"mũ rộng vành" },
          { fr:"la casquette",       vi:"mũ lưỡi trai" },
          { fr:"le sac",             vi:"túi xách" },
          { fr:"la ceinture",        vi:"thắt lưng" },
          { fr:"les lunettes de soleil", vi:"kính mát" },
        ]
      },
      {
        id: "u5g2", label: "Le shopping", icon: "🛍️",
        words: [
          { fr:"le magasin",         vi:"cửa hàng" },
          { fr:"la boutique",        vi:"tiệm / boutique" },
          { fr:"le centre commercial",vi:"trung tâm thương mại" },
          { fr:"la caisse",          vi:"quầy thu ngân" },
          { fr:"la cabine d'essayage",vi:"phòng thử đồ" },
          { fr:"la taille",          vi:"size / cỡ" },
          { fr:"le prix",            vi:"giá cả" },
          { fr:"les soldes",         vi:"đợt giảm giá" },
          { fr:"payer",              vi:"trả tiền" },
          { fr:"acheter",            vi:"mua" },
          { fr:"vendre",             vi:"bán" },
          { fr:"Vous faites quelle taille?", vi:"Bạn mặc cỡ bao nhiêu?" },
          { fr:"C'est combien?",     vi:"Cái này bao nhiêu tiền?" },
          { fr:"C'est trop cher.",   vi:"Đắt quá." },
          { fr:"Je cherche...",      vi:"Tôi đang tìm..." },
          { fr:"Je vais prendre ça.", vi:"Tôi sẽ lấy cái này." },
        ]
      },
    ]
  },
  {
    id: "u6", num: "6", title: "Qu'est-ce qu'on fait ?",
    color: "#0D9488", bg: "#F0FDFA",
    groups: [
      {
        id: "u6g1", label: "Les activités & loisirs", icon: "🎮",
        words: [
          { fr:"écouter de la musique", vi:"nghe nhạc" },
          { fr:"regarder la télé",      vi:"xem TV" },
          { fr:"lire",                  vi:"đọc sách" },
          { fr:"écrire",                vi:"viết" },
          { fr:"jouer au foot",         vi:"chơi bóng đá" },
          { fr:"jouer aux jeux vidéo",  vi:"chơi trò chơi điện tử" },
          { fr:"faire du sport",        vi:"tập thể thao" },
          { fr:"faire de la natation",  vi:"bơi lội" },
          { fr:"danser",                vi:"khiêu vũ / nhảy" },
          { fr:"chanter",               vi:"ca hát" },
          { fr:"voyager",               vi:"du lịch" },
          { fr:"cuisiner",              vi:"nấu ăn" },
          { fr:"faire du shopping",     vi:"mua sắm" },
          { fr:"se promener",           vi:"dạo chơi" },
          { fr:"prendre des photos",    vi:"chụp ảnh" },
        ]
      },
      {
        id: "u6g2", label: "L'heure & les jours", icon: "⏰",
        words: [
          { fr:"Quelle heure est-il?",  vi:"Bây giờ là mấy giờ?" },
          { fr:"Il est ... heure(s)",   vi:"Bây giờ là ... giờ" },
          { fr:"et demi(e)",            vi:"rưỡi" },
          { fr:"et quart",              vi:"mười lăm phút" },
          { fr:"moins le quart",        vi:"kém mười lăm" },
          { fr:"du matin",              vi:"buổi sáng" },
          { fr:"de l'après-midi",       vi:"buổi chiều" },
          { fr:"du soir",               vi:"buổi tối" },
          { fr:"maintenant",            vi:"bây giờ" },
          { fr:"aujourd'hui",           vi:"hôm nay" },
          { fr:"demain",                vi:"ngày mai" },
          { fr:"hier",                  vi:"hôm qua" },
          { fr:"la semaine prochaine",  vi:"tuần tới" },
          { fr:"le week-end",           vi:"cuối tuần" },
        ]
      },
    ]
  },
  {
    id: "u7", num: "7", title: "Chez moi !",
    color: "#D35400", bg: "#FEF3E2",
    groups: [
      {
        id: "u7g1", label: "Le logement", icon: "🏠",
        words: [
          { fr:"l'appartement",      vi:"căn hộ" },
          { fr:"la maison",          vi:"ngôi nhà" },
          { fr:"le studio",          vi:"phòng ở studio" },
          { fr:"le loyer",           vi:"tiền thuê nhà" },
          { fr:"le propriétaire",    vi:"chủ nhà" },
          { fr:"le locataire",       vi:"người thuê nhà" },
          { fr:"les charges",        vi:"phí dịch vụ" },
          { fr:"l'immeuble",         vi:"tòa nhà chung cư" },
          { fr:"l'étage",            vi:"tầng" },
          { fr:"l'ascenseur",        vi:"thang máy" },
          { fr:"la cave",            vi:"tầng hầm" },
          { fr:"le balcon",          vi:"ban công" },
        ]
      },
      {
        id: "u7g2", label: "Les pièces & meubles", icon: "🛋️",
        words: [
          { fr:"la chambre",         vi:"phòng ngủ" },
          { fr:"la cuisine",         vi:"nhà bếp" },
          { fr:"le salon",           vi:"phòng khách" },
          { fr:"la salle à manger",  vi:"phòng ăn" },
          { fr:"la salle de bain",   vi:"phòng tắm" },
          { fr:"les toilettes",      vi:"nhà vệ sinh" },
          { fr:"le couloir",         vi:"hành lang" },
          { fr:"le jardin",          vi:"khu vườn" },
          { fr:"le lit",             vi:"cái giường" },
          { fr:"le canapé",          vi:"ghế sofa" },
          { fr:"le bureau",          vi:"bàn làm việc / văn phòng" },
          { fr:"l'armoire",          vi:"tủ quần áo" },
          { fr:"la fenêtre",         vi:"cửa sổ" },
          { fr:"la porte",           vi:"cái cửa" },
          { fr:"le mur",             vi:"bức tường" },
        ]
      },
    ]
  },
  {
    id: "u8", num: "8", title: "En forme !",
    color: "#DC2626", bg: "#FEF2F2",
    groups: [
      {
        id: "u8g1", label: "Le corps humain", icon: "🫀",
        words: [
          { fr:"la tête",            vi:"cái đầu" },
          { fr:"le visage",          vi:"khuôn mặt" },
          { fr:"les yeux",           vi:"đôi mắt" },
          { fr:"le nez",             vi:"cái mũi" },
          { fr:"la bouche",          vi:"cái miệng" },
          { fr:"les dents",          vi:"hàm răng" },
          { fr:"l'oreille",          vi:"cái tai" },
          { fr:"le cou",             vi:"cái cổ" },
          { fr:"l'épaule",           vi:"cái vai" },
          { fr:"le bras",            vi:"cánh tay" },
          { fr:"la main",            vi:"bàn tay" },
          { fr:"le doigt",           vi:"ngón tay" },
          { fr:"la jambe",           vi:"cái chân" },
          { fr:"le pied",            vi:"bàn chân" },
          { fr:"le ventre",          vi:"cái bụng" },
          { fr:"le dos",             vi:"cái lưng" },
        ]
      },
      {
        id: "u8g2", label: "La santé", icon: "🏥",
        words: [
          { fr:"avoir mal à...",     vi:"bị đau ở..." },
          { fr:"J'ai mal à la tête", vi:"Tôi bị đau đầu" },
          { fr:"J'ai mal au ventre", vi:"Tôi bị đau bụng" },
          { fr:"la fièvre",          vi:"cơn sốt" },
          { fr:"le rhume",           vi:"cảm lạnh" },
          { fr:"la grippe",          vi:"cúm" },
          { fr:"le médicament",      vi:"thuốc" },
          { fr:"l'ordonnance",       vi:"đơn thuốc" },
          { fr:"le médecin",         vi:"bác sĩ" },
          { fr:"l'hôpital",          vi:"bệnh viện" },
          { fr:"la pharmacie",       vi:"nhà thuốc" },
          { fr:"prendre rendez-vous",vi:"đặt lịch hẹn" },
        ]
      },
      {
        id: "u8g3", label: "Le sport", icon: "⚽",
        words: [
          { fr:"le football",        vi:"bóng đá" },
          { fr:"le tennis",          vi:"quần vợt" },
          { fr:"la natation",        vi:"bơi lội" },
          { fr:"le vélo",            vi:"đạp xe" },
          { fr:"la course à pied",   vi:"chạy bộ" },
          { fr:"le yoga",            vi:"yoga" },
          { fr:"la gym",             vi:"tập gym" },
          { fr:"le ski",             vi:"trượt tuyết" },
          { fr:"faire du sport",     vi:"tập thể thao" },
          { fr:"s'entraîner",        vi:"tập luyện" },
        ]
      },
    ]
  },
  {
    id: "u9", num: "9", title: "Bonnes vacances !",
    color: "#0891B2", bg: "#F0F9FF",
    groups: [
      {
        id: "u9g1", label: "Les pays & voyages", icon: "✈️",
        words: [
          { fr:"la France",          vi:"nước Pháp" },
          { fr:"le Vietnam",         vi:"Việt Nam" },
          { fr:"le Japon",           vi:"Nhật Bản" },
          { fr:"la Chine",           vi:"Trung Quốc" },
          { fr:"les États-Unis",     vi:"Hoa Kỳ / Mỹ" },
          { fr:"l'Italie",           vi:"Ý" },
          { fr:"l'Espagne",          vi:"Tây Ban Nha" },
          { fr:"voyager",            vi:"du lịch" },
          { fr:"partir en vacances", vi:"đi nghỉ hè" },
          { fr:"l'hôtel",            vi:"khách sạn" },
          { fr:"la chambre d'hôtel", vi:"phòng khách sạn" },
          { fr:"réserver",           vi:"đặt chỗ" },
          { fr:"la valise",          vi:"vali" },
          { fr:"le passeport",       vi:"hộ chiếu" },
          { fr:"les vacances",       vi:"kỳ nghỉ" },
        ]
      },
      {
        id: "u9g2", label: "La météo", icon: "🌤️",
        words: [
          { fr:"il fait beau",       vi:"trời đẹp / nắng" },
          { fr:"il fait chaud",      vi:"trời nóng" },
          { fr:"il fait froid",      vi:"trời lạnh" },
          { fr:"il pleut",           vi:"trời mưa" },
          { fr:"il neige",           vi:"tuyết rơi" },
          { fr:"il y a du vent",     vi:"có gió" },
          { fr:"il y a du soleil",   vi:"trời có nắng" },
          { fr:"il y a des nuages",  vi:"trời có mây" },
          { fr:"le temps",           vi:"thời tiết" },
          { fr:"la température",     vi:"nhiệt độ" },
          { fr:"degrés",             vi:"độ (nhiệt độ)" },
        ]
      },
    ]
  },
  {
    id: "u10", num: "10", title: "Au travail !",
    color: "#374151", bg: "#F9FAFB",
    groups: [
      {
        id: "u10g1", label: "Le travail", icon: "💻",
        words: [
          { fr:"le bureau",          vi:"văn phòng / bàn làm việc" },
          { fr:"le collègue",        vi:"đồng nghiệp" },
          { fr:"le patron / la patronne", vi:"sếp (nam/nữ)" },
          { fr:"le salaire",         vi:"lương" },
          { fr:"les congés",         vi:"ngày nghỉ phép" },
          { fr:"la réunion",         vi:"cuộc họp" },
          { fr:"le projet",          vi:"dự án" },
          { fr:"le contrat",         vi:"hợp đồng" },
          { fr:"travailler",         vi:"làm việc" },
          { fr:"chercher un emploi", vi:"tìm việc làm" },
          { fr:"envoyer un CV",      vi:"gửi CV" },
          { fr:"passer un entretien",vi:"phỏng vấn" },
        ]
      },
      {
        id: "u10g2", label: "Communication", icon: "📧",
        words: [
          { fr:"le courrier électronique / l'email", vi:"thư điện tử / email" },
          { fr:"le téléphone",       vi:"điện thoại" },
          { fr:"appeler",            vi:"gọi điện" },
          { fr:"envoyer un message", vi:"gửi tin nhắn" },
          { fr:"la réponse",         vi:"câu trả lời / phản hồi" },
          { fr:"le rendez-vous",     vi:"cuộc hẹn" },
          { fr:"confirmer",          vi:"xác nhận" },
          { fr:"annuler",            vi:"hủy bỏ" },
        ]
      },
    ]
  },
];
