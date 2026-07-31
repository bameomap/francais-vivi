// Edito A2 — Vocabulary organized by unit & group (aligned with Édito A2 Didier FLE, 2e édition)
// Unit ids are prefixed "b" (b1, b2, …) to stay isolated from Édito A1's "u"/"g" ids
// in shared localStorage progress (see materials/A2/README or parcours.js).
export const EDITO_VOCAB_A2_UNITS = [
  {
    id: "b1", num: "1", title: "Nouvelles vies",
    color: "#2E8B57", bg: "#EAF7F0",
    groups: [
      {
        id: "b1g1", label: "Parcours de vie (verbes)", icon: "🌱",
        words: [
          { fr:"vivre",                                   vi:"sống" },
          { fr:"avoir un coup de foudre",                 vi:"tiếng sét ái tình, yêu từ cái nhìn đầu tiên", ex_fr:"Ils ont eu un coup de foudre.", ex_vi:"Họ đã yêu nhau từ cái nhìn đầu tiên." },
          { fr:"avoir un enfant",                         vi:"có con" },
          { fr:"déménager",                               vi:"chuyển nhà", ex_fr:"Je vais déménager le mois prochain.", ex_vi:"Tháng sau tôi sẽ chuyển nhà." },
          { fr:"être célibataire",                        vi:"độc thân" },
          { fr:"être en couple",                          vi:"đang hẹn hò, có đôi có cặp" },
          { fr:"faire connaissance",                      vi:"làm quen, gặp gỡ lần đầu", ex_fr:"Ils ont fait connaissance en 2008.", ex_vi:"Họ làm quen với nhau vào năm 2008." },
          { fr:"grandir",                                 vi:"lớn lên", ex_fr:"Elle a grandi en banlieue parisienne.", ex_vi:"Cô ấy lớn lên ở ngoại ô Paris." },
          { fr:"naître",                                  vi:"sinh ra, chào đời", ex_fr:"Il est né à Bujumbura.", ex_vi:"Anh ấy sinh ra ở Bujumbura." },
          { fr:"rencontrer quelqu'un",                    vi:"gặp ai đó" },
          { fr:"se rencontrer",                           vi:"gặp nhau" },
          { fr:"se faire des ami(e)s",                    vi:"kết bạn" },
          { fr:"se marier (avec quelqu'un)",               vi:"kết hôn (với ai đó)", ex_fr:"Ils se sont mariés deux ans après leur rencontre.", ex_vi:"Họ kết hôn hai năm sau khi gặp nhau." },
          { fr:"se séparer (de quelqu'un)",                vi:"chia tay (với ai đó)" },
          { fr:"s'installer",                             vi:"định cư, ổn định chỗ ở", ex_fr:"Elle s'est installée à Lyon.", ex_vi:"Cô ấy đã định cư ở Lyon." },
          { fr:"tomber amoureux, amoureuse (de quelqu'un)", vi:"phải lòng (ai đó)", ex_fr:"Je suis tombée amoureuse de la France.", ex_vi:"Tôi đã phải lòng nước Pháp." },
        ]
      },
      {
        id: "b1g2", label: "La vie personnelle", icon: "💑",
        words: [
          { fr:"le/la célibataire",     vi:"người độc thân" },
          { fr:"le conjoint, la conjointe", vi:"người bạn đời (chồng/vợ)" },
          { fr:"le couple",             vi:"cặp đôi" },
          { fr:"l'enfant (m., f.)",     vi:"đứa trẻ, con cái" },
          { fr:"la femme",              vi:"vợ / người phụ nữ" },
          { fr:"le mari",               vi:"chồng" },
          { fr:"le/la meilleur(e) ami(e)", vi:"bạn thân nhất" },
          { fr:"la rencontre",          vi:"cuộc gặp gỡ" },
          { fr:"la vie de famille",     vi:"cuộc sống gia đình" },
        ]
      },
      {
        id: "b1g3", label: "Le parcours scolaire et professionnel", icon: "🎓",
        words: [
          { fr:"chercher du travail",                     vi:"tìm việc làm" },
          { fr:"devenir trader/écrivain(e)/humoriste...", vi:"trở thành nhà giao dịch/nhà văn/diễn viên hài..." },
          { fr:"faire/finir ses études",                  vi:"học / hoàn thành việc học" },
          { fr:"faire un séjour Erasmus, partir en Erasmus", vi:"đi trao đổi Erasmus" },
          { fr:"faire un stage",                          vi:"đi thực tập" },
          { fr:"obtenir un diplôme",                      vi:"lấy bằng" },
          { fr:"travailler dans une entreprise",          vi:"làm việc trong một công ty" },
        ]
      },
      {
        id: "b1g4", label: "Les professions artistiques", icon: "🎨",
        words: [
          { fr:"l'acteur, l'actrice",           vi:"diễn viên (nam/nữ)" },
          { fr:"le chanteur, la chanteuse",     vi:"ca sĩ (nam/nữ)" },
          { fr:"le compositeur, la compositrice", vi:"nhà soạn nhạc (nam/nữ)" },
          { fr:"l'écrivain(e)",                 vi:"nhà văn" },
          { fr:"l'interprète",                  vi:"nghệ sĩ biểu diễn (nhạc/kịch/phim)" },
          { fr:"le/la musicien(ne)",            vi:"nhạc sĩ, nhạc công" },
          { fr:"le/la scénariste",              vi:"biên kịch" },
        ]
      },
      {
        id: "b1g5", label: "Parler de son parcours, ses intentions, ses goûts", icon: "💬",
        words: [
          { fr:"Je suis né(e) à/en/au(x)...",    vi:"Tôi sinh ra ở..." },
          { fr:"J'ai grandi à/en/au(x)...",       vi:"Tôi lớn lên ở..." },
          { fr:"Je suis venu(e) ici en 1995",     vi:"Tôi đến đây vào năm 1995" },
          { fr:"J'ai fait mes études à...",       vi:"Tôi đã học ở..." },
          { fr:"Je suis devenu(e)...",            vi:"Tôi đã trở thành..." },
          { fr:"Je compte chercher du travail",   vi:"Tôi định tìm việc làm" },
          { fr:"J'ai l'intention de rester en France", vi:"Tôi có ý định ở lại Pháp" },
          { fr:"Je pense rentrer en Italie",      vi:"Tôi nghĩ mình sẽ về Ý" },
          { fr:"C'est décidé",                    vi:"Đã quyết định rồi" },
          { fr:"J'adore ce concert",              vi:"Tôi rất thích buổi hòa nhạc này" },
          { fr:"Je (ne) suis (pas) fan de jazz",  vi:"Tôi (không) mê nhạc jazz" },
          { fr:"J'aime bien sortir",              vi:"Tôi khá thích đi chơi" },
          { fr:"Je n'aime pas trop les sports aquatiques", vi:"Tôi không thích lắm các môn thể thao dưới nước" },
          { fr:"C'est pas du tout mon truc",      vi:"Cái đó chả phải gu của tôi" },
          { fr:"Ma passion, c'est les jeux vidéo", vi:"Đam mê của tôi là trò chơi điện tử" },
        ]
      },
      {
        id: "b1g6", label: "Proposer, accepter, refuser une sortie", icon: "📅",
        words: [
          { fr:"Ça te dit ?",                      vi:"Bạn có thích/muốn đi không?" },
          { fr:"Tu es libre ?",                    vi:"Bạn có rảnh không?" },
          { fr:"On se retrouve chez moi à 19 h ?", vi:"Gặp nhau ở nhà mình lúc 19h nhé?" },
          { fr:"Ça te va ? / C'est bon pour toi ?", vi:"Được với bạn không?" },
          { fr:"Avec plaisir ! / OK ! / D'accord !", vi:"Rất vui lòng! / Được! / Đồng ý!" },
          { fr:"Je suis désolé(e)",                vi:"Tôi xin lỗi" },
          { fr:"Ça marche ! / Ça me va !",         vi:"Được đó! / Ổn với tôi!" },
          { fr:"Je m'excuse, mais je ne peux pas", vi:"Xin lỗi nhưng tôi không thể" },
          { fr:"Ce n'est pas possible",            vi:"Không thể được" },
        ]
      },
      {
        id: "b1g7", label: "Les lieux culturels", icon: "🏛️",
        words: [
          { fr:"le château",   vi:"lâu đài" },
          { fr:"le cinéma",    vi:"rạp chiếu phim" },
          { fr:"le cirque",    vi:"rạp xiếc" },
          { fr:"le monument",  vi:"di tích, công trình" },
          { fr:"le musée",     vi:"bảo tàng" },
          { fr:"le théâtre",   vi:"nhà hát" },
        ]
      },
      {
        id: "b1g8", label: "Sortir", icon: "🎭",
        words: [
          { fr:"aller au cirque, à un concert, à un festival", vi:"đi xem xiếc, đi hòa nhạc, đi lễ hội" },
          { fr:"faire une balade = une promenade",  vi:"đi dạo" },
          { fr:"faire une visite (guidée)",         vi:"đi tham quan (có hướng dẫn)" },
          { fr:"visiter une exposition, un monument, un musée", vi:"tham quan triển lãm/di tích/bảo tàng" },
          { fr:"voir une pièce de théâtre, un spectacle", vi:"xem một vở kịch, một buổi biểu diễn" },
        ]
      },
      {
        id: "b1g9", label: "Les activités en plein air", icon: "🌳",
        words: [
          { fr:"l'accrobranche (m.)",         vi:"leo cây mạo hiểm (accrobranche)" },
          { fr:"le canoë (kayak)",            vi:"chèo xuồng / kayak" },
          { fr:"l'escalade (f.)",             vi:"leo núi / leo tường" },
          { fr:"le foot(ball)",               vi:"bóng đá" },
          { fr:"le jardinage",                vi:"làm vườn" },
          { fr:"le (stand-up) paddle",        vi:"chèo ván đứng (SUP)" },
          { fr:"la randonnée",                vi:"đi bộ đường dài (trekking)" },
          { fr:"les sports aquatiques / nautiques", vi:"các môn thể thao dưới nước" },
          { fr:"le vélo",                     vi:"xe đạp / đạp xe" },
          { fr:"la via ferrata",              vi:"leo núi có dây bảo hộ (via ferrata)" },
        ]
      },
      {
        id: "b1g10", label: "Les activités à l'intérieur", icon: "🏠",
        words: [
          { fr:"le bricolage",       vi:"làm đồ thủ công / sửa chữa vặt" },
          { fr:"les jeux de société", vi:"trò chơi bàn (board game)" },
          { fr:"les jeux vidéo",     vi:"trò chơi điện tử" },
          { fr:"le judo",            vi:"judo" },
          { fr:"la peinture",        vi:"hội họa, vẽ tranh" },
        ]
      },
      {
        id: "b1g11", label: "Pratiquer une activité (verbes)", icon: "🏃",
        words: [
          { fr:"bricoler",                                vi:"làm đồ thủ công / sửa chữa vặt" },
          { fr:"être amateur, amatrice / professionnel(le)", vi:"là người nghiệp dư / chuyên nghiệp" },
          { fr:"faire du vélo, de l'escalade, de l'accrobranche", vi:"đạp xe, leo núi, leo cây mạo hiểm" },
          { fr:"faire une compétition de...",             vi:"thi đấu môn..." },
          { fr:"faire une randonnée, une via ferrata",     vi:"đi trekking, leo via ferrata" },
          { fr:"jardiner",                                vi:"làm vườn" },
          { fr:"jouer au / faire du foot",                vi:"chơi bóng đá" },
          { fr:"jouer aux jeux vidéo",                    vi:"chơi trò chơi điện tử" },
          { fr:"peindre / faire un tableau",              vi:"vẽ tranh" },
          { fr:"regarder une série, un match, etc.",      vi:"xem phim bộ, xem trận đấu, v.v." },
        ]
      },
    ]
  },
];
