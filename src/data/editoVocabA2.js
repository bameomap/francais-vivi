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
          { fr:"vivre",                                   vi:"sống", ex_fr:"Nous avons vécu ensemble pendant un an.", ex_vi:"Chúng tôi đã sống với nhau một năm." },
          { fr:"avoir un coup de foudre",                 vi:"tiếng sét ái tình, yêu từ cái nhìn đầu tiên", ex_fr:"Ils ont eu un coup de foudre.", ex_vi:"Họ đã yêu nhau từ cái nhìn đầu tiên." },
          { fr:"avoir un enfant",                         vi:"có con", ex_fr:"Ils ont eu un enfant en 2019.", ex_vi:"Họ có con vào năm 2019." },
          { fr:"déménager",                               vi:"chuyển nhà", ex_fr:"Je vais déménager le mois prochain.", ex_vi:"Tháng sau tôi sẽ chuyển nhà." },
          { fr:"être célibataire",                        vi:"độc thân", ex_fr:"Maintenant, je suis célibataire et j'habite seule.", ex_vi:"Bây giờ tôi độc thân và sống một mình." },
          { fr:"être en couple",                          vi:"đang hẹn hò, có đôi có cặp", ex_fr:"Elle est en couple depuis trois ans.", ex_vi:"Cô ấy có người yêu được ba năm rồi." },
          { fr:"faire connaissance",                      vi:"làm quen, gặp gỡ lần đầu", ex_fr:"Ils ont fait connaissance en 2008.", ex_vi:"Họ làm quen với nhau vào năm 2008." },
          { fr:"grandir",                                 vi:"lớn lên", ex_fr:"Elle a grandi en banlieue parisienne.", ex_vi:"Cô ấy lớn lên ở ngoại ô Paris." },
          { fr:"naître",                                  vi:"sinh ra, chào đời", ex_fr:"Il est né à Bujumbura.", ex_vi:"Anh ấy sinh ra ở Bujumbura." },
          { fr:"rencontrer quelqu'un",                    vi:"gặp ai đó", ex_fr:"Quand je suis arrivée, j'ai rencontré un Français.", ex_vi:"Khi tôi đến, tôi đã gặp một anh người Pháp." },
          { fr:"se rencontrer",                           vi:"gặp nhau", ex_fr:"Ils se sont rencontrés à Bordeaux.", ex_vi:"Họ gặp nhau ở Bordeaux." },
          { fr:"se faire des ami(e)s",                    vi:"kết bạn", ex_fr:"Je me suis fait de nouveaux amis à Lyon.", ex_vi:"Tôi đã kết bạn mới ở Lyon." },
          { fr:"se marier (avec quelqu'un)",               vi:"kết hôn (với ai đó)", ex_fr:"Ils se sont mariés deux ans après leur rencontre.", ex_vi:"Họ kết hôn hai năm sau khi gặp nhau." },
          { fr:"se séparer (de quelqu'un)",                vi:"chia tay (với ai đó)", ex_fr:"Nous nous sommes séparés il y a deux ans.", ex_vi:"Chúng tôi chia tay cách đây hai năm." },
          { fr:"s'installer",                             vi:"định cư, ổn định chỗ ở", ex_fr:"Elle s'est installée à Lyon.", ex_vi:"Cô ấy đã định cư ở Lyon." },
          { fr:"tomber amoureux, amoureuse (de quelqu'un)", vi:"phải lòng (ai đó)", ex_fr:"Je suis tombée amoureuse de la France.", ex_vi:"Tôi đã phải lòng nước Pháp." },
        ]
      },
      {
        id: "b1g2", label: "La vie personnelle", icon: "💑",
        words: [
          { fr:"le/la célibataire",     vi:"người độc thân", ex_fr:"Ce site est fait pour les célibataires.", ex_vi:"Trang này dành cho người độc thân." },
          { fr:"le conjoint, la conjointe", vi:"người bạn đời (chồng/vợ)", ex_fr:"Elle est venue à la fête avec son conjoint.", ex_vi:"Cô ấy đến bữa tiệc cùng bạn đời." },
          { fr:"le couple",             vi:"cặp đôi", ex_fr:"C'est un couple très connu en France.", ex_vi:"Đó là một cặp đôi rất nổi tiếng ở Pháp." },
          { fr:"l'enfant (m., f.)",     vi:"đứa trẻ, con cái", ex_fr:"Ils ont deux enfants.", ex_vi:"Họ có hai người con." },
          { fr:"la femme",              vi:"vợ / người phụ nữ", ex_fr:"Sa femme est journaliste.", ex_vi:"Vợ anh ấy là nhà báo." },
          { fr:"le mari",               vi:"chồng", ex_fr:"Mon mari travaille dans une entreprise italienne.", ex_vi:"Chồng tôi làm việc trong một công ty Ý." },
          { fr:"le/la meilleur(e) ami(e)", vi:"bạn thân nhất", ex_fr:"J'ai fait connaissance avec ma meilleure amie au lycée.", ex_vi:"Tôi làm quen với bạn thân nhất hồi cấp ba." },
          { fr:"la rencontre",          vi:"cuộc gặp gỡ", ex_fr:"Leur rencontre a changé sa vie.", ex_vi:"Cuộc gặp gỡ ấy đã thay đổi cuộc đời cô ấy." },
          { fr:"la vie de famille",     vi:"cuộc sống gia đình", ex_fr:"Il aime sa vie de famille à la campagne.", ex_vi:"Anh ấy thích cuộc sống gia đình ở nông thôn." },
        ]
      },
      {
        id: "b1g3", label: "Le parcours scolaire et professionnel", icon: "🎓",
        words: [
          { fr:"chercher du travail",                     vi:"tìm việc làm", ex_fr:"Après son diplôme, elle a cherché du travail à Lyon.", ex_vi:"Sau khi có bằng, cô ấy đi tìm việc ở Lyon." },
          { fr:"devenir trader/écrivain(e)/humoriste...", vi:"trở thành nhà giao dịch/nhà văn/diễn viên hài...", ex_fr:"Il est devenu écrivain après son premier album.", ex_vi:"Anh ấy trở thành nhà văn sau album đầu tiên." },
          { fr:"faire/finir ses études",                  vi:"học / hoàn thành việc học", ex_fr:"Je suis rentrée à Rome pour finir mes études.", ex_vi:"Tôi về Rome để hoàn thành việc học." },
          { fr:"faire un séjour Erasmus, partir en Erasmus", vi:"đi trao đổi Erasmus", ex_fr:"J'ai fait un séjour Erasmus à Bordeaux en 2019.", ex_vi:"Tôi đi trao đổi Erasmus ở Bordeaux năm 2019." },
          { fr:"faire un stage",                          vi:"đi thực tập", ex_fr:"Elle a fait un stage de six mois dans un musée.", ex_vi:"Cô ấy thực tập sáu tháng ở một bảo tàng." },
          { fr:"obtenir un diplôme",                      vi:"lấy bằng", ex_fr:"Quand j'ai obtenu mon diplôme, je suis revenue en France.", ex_vi:"Khi lấy được bằng, tôi quay lại Pháp." },
          { fr:"travailler dans une entreprise",          vi:"làm việc trong một công ty", ex_fr:"Il travaille dans une entreprise française depuis deux ans.", ex_vi:"Anh ấy làm cho một công ty Pháp được hai năm rồi." },
        ]
      },
      {
        id: "b1g4", label: "Les professions artistiques", icon: "🎨",
        words: [
          { fr:"l'acteur, l'actrice",           vi:"diễn viên (nam/nữ)", ex_fr:"Les acteurs du film sont burundais.", ex_vi:"Các diễn viên trong phim là người Burundi." },
          { fr:"le chanteur, la chanteuse",     vi:"ca sĩ (nam/nữ)", ex_fr:"C'est une chanteuse très connue au Rwanda.", ex_vi:"Đó là một nữ ca sĩ rất nổi tiếng ở Rwanda." },
          { fr:"le compositeur, la compositrice", vi:"nhà soạn nhạc (nam/nữ)", ex_fr:"Gaël Faye est aussi compositeur.", ex_vi:"Gaël Faye còn là nhà soạn nhạc nữa." },
          { fr:"l'écrivain(e)",                 vi:"nhà văn", ex_fr:"Cette écrivaine a reçu un prix important.", ex_vi:"Nữ nhà văn này đã nhận một giải thưởng lớn." },
          { fr:"l'interprète",                  vi:"nghệ sĩ biểu diễn (nhạc/kịch/phim)", ex_fr:"Il est à la fois compositeur et interprète.", ex_vi:"Anh ấy vừa soạn nhạc vừa biểu diễn." },
          { fr:"le/la musicien(ne)",            vi:"nhạc sĩ, nhạc công", ex_fr:"Les musiciens sont arrivés avant le concert.", ex_vi:"Các nhạc công đến trước buổi hòa nhạc." },
          { fr:"le/la scénariste",              vi:"biên kịch", ex_fr:"Il a été scénariste pour le film Petit Pays.", ex_vi:"Anh ấy làm biên kịch cho phim Petit Pays." },
        ]
      },
      {
        id: "b1g5", label: "Parler de son parcours, ses intentions, ses goûts", icon: "💬",
        words: [
          { fr:"Je suis né(e) à/en/au(x)...",    vi:"Tôi sinh ra ở...", ex_fr:"Je suis née à Hanoï, au Vietnam.", ex_vi:"Tôi sinh ra ở Hà Nội, Việt Nam." },
          { fr:"J'ai grandi à/en/au(x)...",       vi:"Tôi lớn lên ở...", ex_fr:"J'ai grandi dans un petit village près de Rome.", ex_vi:"Tôi lớn lên ở một ngôi làng nhỏ gần Rome." },
          { fr:"Je suis venu(e) ici en 1995",     vi:"Tôi đến đây vào năm 1995", ex_fr:"Je suis venue ici en 2019, après mes études.", ex_vi:"Tôi đến đây năm 2019, sau khi học xong." },
          { fr:"J'ai fait mes études à...",       vi:"Tôi đã học ở...", ex_fr:"J'ai fait mes études à Versailles.", ex_vi:"Tôi học ở Versailles." },
          { fr:"Je suis devenu(e)...",            vi:"Tôi đã trở thành...", ex_fr:"Je suis devenue professeure de français.", ex_vi:"Tôi đã trở thành giáo viên tiếng Pháp." },
          { fr:"Je compte chercher du travail",   vi:"Tôi định tìm việc làm", ex_fr:"Je compte chercher du travail à Paris l'année prochaine.", ex_vi:"Năm tới tôi định tìm việc ở Paris." },
          { fr:"J'ai l'intention de rester en France", vi:"Tôi có ý định ở lại Pháp", ex_fr:"J'ai l'intention de rester en France encore deux ans.", ex_vi:"Tôi có ý định ở lại Pháp thêm hai năm nữa." },
          { fr:"Je pense rentrer en Italie",      vi:"Tôi nghĩ mình sẽ về Ý", ex_fr:"Je pense rentrer au Vietnam en décembre.", ex_vi:"Tôi nghĩ tháng 12 mình sẽ về Việt Nam." },
          { fr:"C'est décidé",                    vi:"Đã quyết định rồi", ex_fr:"C'est décidé : je déménage à Lyon !", ex_vi:"Quyết định rồi: tôi sẽ chuyển tới Lyon!" },
          { fr:"J'adore ce concert",              vi:"Tôi rất thích buổi hòa nhạc này", ex_fr:"J'adore ce chanteur, j'ai tous ses albums.", ex_vi:"Tôi mê ca sĩ này lắm, tôi có hết album của anh ấy." },
          { fr:"Je (ne) suis (pas) fan de jazz",  vi:"Tôi (không) mê nhạc jazz", ex_fr:"Je ne suis pas fan de jazz, je préfère le rap.", ex_vi:"Tôi không mê nhạc jazz, tôi thích rap hơn." },
          { fr:"J'aime bien sortir",              vi:"Tôi khá thích đi chơi", ex_fr:"J'aime bien sortir le week-end avec mes amis.", ex_vi:"Cuối tuần tôi khá thích đi chơi với bạn bè." },
          { fr:"Je n'aime pas trop les sports aquatiques", vi:"Tôi không thích lắm các môn thể thao dưới nước", ex_fr:"Je n'aime pas trop la randonnée, c'est fatigant.", ex_vi:"Tôi không thích trekking lắm, mệt lắm." },
          { fr:"C'est pas du tout mon truc",      vi:"Cái đó chả phải gu của tôi", ex_fr:"Les jeux vidéo ? C'est pas du tout mon truc.", ex_vi:"Trò chơi điện tử à? Chả phải gu tôi tí nào." },
          { fr:"Ma passion, c'est les jeux vidéo", vi:"Đam mê của tôi là trò chơi điện tử", ex_fr:"Ma passion, c'est la peinture.", ex_vi:"Đam mê của tôi là hội họa." },
        ]
      },
      {
        id: "b1g6", label: "Proposer, accepter, refuser une sortie", icon: "📅",
        words: [
          { fr:"Ça te dit ?",                      vi:"Bạn có thích/muốn đi không?", ex_fr:"On va au cinéma ce soir, ça te dit ?", ex_vi:"Tối nay đi xem phim nhé, bạn thấy sao?" },
          { fr:"Tu es libre ?",                    vi:"Bạn có rảnh không?", ex_fr:"Tu es libre samedi après-midi ?", ex_vi:"Chiều thứ Bảy bạn rảnh không?" },
          { fr:"On se retrouve chez moi à 19 h ?", vi:"Gặp nhau ở nhà mình lúc 19h nhé?", ex_fr:"On se retrouve devant le musée à 14 h ?", ex_vi:"Gặp nhau trước bảo tàng lúc 14h nhé?" },
          { fr:"Ça te va ? / C'est bon pour toi ?", vi:"Được với bạn không?", ex_fr:"Rendez-vous à 20 h, ça te va ?", ex_vi:"Hẹn 20h, được với bạn chứ?" },
          { fr:"Avec plaisir ! / OK ! / D'accord !", vi:"Rất vui lòng! / Được! / Đồng ý!", ex_fr:"— Ça te dit d'aller au théâtre ? — Avec plaisir !", ex_vi:"— Đi xem kịch nhé? — Rất sẵn lòng!" },
          { fr:"Je suis désolé(e)",                vi:"Tôi xin lỗi", ex_fr:"Je suis désolée, je ne suis pas libre ce soir.", ex_vi:"Xin lỗi, tối nay tôi không rảnh." },
          { fr:"Ça marche ! / Ça me va !",         vi:"Được đó! / Ổn với tôi!", ex_fr:"— On se retrouve à 19 h ? — Ça marche !", ex_vi:"— Gặp lúc 19h nhé? — Được đó!" },
          { fr:"Je m'excuse, mais je ne peux pas", vi:"Xin lỗi nhưng tôi không thể", ex_fr:"Je m'excuse, mais je ne peux pas : je travaille samedi.", ex_vi:"Xin lỗi nhưng tôi không đi được: thứ Bảy tôi phải làm." },
          { fr:"Ce n'est pas possible",            vi:"Không thể được", ex_fr:"Cette semaine, ce n'est pas possible. La semaine prochaine ?", ex_vi:"Tuần này thì không được. Tuần sau nhé?" },
        ]
      },
      {
        id: "b1g7", label: "Les lieux culturels", icon: "🏛️",
        words: [
          { fr:"le château",   vi:"lâu đài", ex_fr:"Nous avons visité un château pendant les Journées du patrimoine.", ex_vi:"Chúng tôi tham quan một lâu đài trong Ngày Di sản." },
          { fr:"le cinéma",    vi:"rạp chiếu phim", ex_fr:"Il y a un nouveau cinéma près de chez moi.", ex_vi:"Gần nhà tôi có một rạp chiếu phim mới." },
          { fr:"le cirque",    vi:"rạp xiếc", ex_fr:"Les enfants sont allés au cirque dimanche.", ex_vi:"Bọn trẻ đi xem xiếc hôm Chủ nhật." },
          { fr:"le monument",  vi:"di tích, công trình", ex_fr:"Ce monument est fermé le lundi.", ex_vi:"Di tích này đóng cửa vào thứ Hai." },
          { fr:"le musée",     vi:"bảo tàng", ex_fr:"Le musée propose une visite guidée gratuite.", ex_vi:"Bảo tàng có tour tham quan miễn phí." },
          { fr:"le théâtre",   vi:"nhà hát", ex_fr:"Nous avons vu une pièce au théâtre hier soir.", ex_vi:"Tối qua chúng tôi xem một vở kịch ở nhà hát." },
        ]
      },
      {
        id: "b1g8", label: "Sortir", icon: "🎭",
        words: [
          { fr:"aller au cirque, à un concert, à un festival", vi:"đi xem xiếc, đi hòa nhạc, đi lễ hội", ex_fr:"L'été dernier, je suis allée à un festival de musique.", ex_vi:"Hè năm ngoái tôi đi một lễ hội âm nhạc." },
          { fr:"faire une balade = une promenade",  vi:"đi dạo", ex_fr:"On a fait une balade au bord de la Seine.", ex_vi:"Chúng tôi đi dạo dọc bờ sông Seine." },
          { fr:"faire une visite (guidée)",         vi:"đi tham quan (có hướng dẫn)", ex_fr:"Nous avons fait une visite guidée du château.", ex_vi:"Chúng tôi tham quan lâu đài có hướng dẫn viên." },
          { fr:"visiter une exposition, un monument, un musée", vi:"tham quan triển lãm/di tích/bảo tàng", ex_fr:"J'ai visité une exposition sur la Francophonie.", ex_vi:"Tôi đã đi xem một triển lãm về Cộng đồng Pháp ngữ." },
          { fr:"voir une pièce de théâtre, un spectacle", vi:"xem một vở kịch, một buổi biểu diễn", ex_fr:"Tu as vu le spectacle de cirque ?", ex_vi:"Bạn xem buổi diễn xiếc chưa?" },
        ]
      },
      {
        id: "b1g9", label: "Les activités en plein air", icon: "🌳",
        words: [
          { fr:"l'accrobranche (m.)",         vi:"leo cây mạo hiểm (accrobranche)", ex_fr:"L'accrobranche, c'est parfait pour les enfants.", ex_vi:"Leo cây mạo hiểm rất hợp với trẻ con." },
          { fr:"le canoë (kayak)",            vi:"chèo xuồng / kayak", ex_fr:"Nous avons fait du canoë pendant deux heures.", ex_vi:"Chúng tôi chèo xuồng suốt hai tiếng." },
          { fr:"l'escalade (f.)",             vi:"leo núi / leo tường", ex_fr:"Elle fait de l'escalade depuis cinq ans.", ex_vi:"Cô ấy leo núi được năm năm rồi." },
          { fr:"le foot(ball)",               vi:"bóng đá", ex_fr:"Mon fils joue au foot le mercredi.", ex_vi:"Con trai tôi chơi bóng đá vào thứ Tư." },
          { fr:"le jardinage",                vi:"làm vườn", ex_fr:"Le jardinage, c'est ma passion.", ex_vi:"Làm vườn là đam mê của tôi." },
          { fr:"le (stand-up) paddle",        vi:"chèo ván đứng (SUP)", ex_fr:"On a essayé le paddle sur le lac.", ex_vi:"Chúng tôi thử chèo ván đứng trên hồ." },
          { fr:"la randonnée",                vi:"đi bộ đường dài (trekking)", ex_fr:"Ils ont fait une randonnée de dix kilomètres.", ex_vi:"Họ đi bộ đường dài mười cây số." },
          { fr:"les sports aquatiques / nautiques", vi:"các môn thể thao dưới nước", ex_fr:"En été, on fait des sports nautiques sur le lac.", ex_vi:"Mùa hè chúng tôi chơi thể thao dưới nước trên hồ." },
          { fr:"le vélo",                     vi:"xe đạp / đạp xe", ex_fr:"Je vais au travail à vélo.", ex_vi:"Tôi đi làm bằng xe đạp." },
          { fr:"la via ferrata",              vi:"leo núi có dây bảo hộ (via ferrata)", ex_fr:"La via ferrata demande un bon équipement.", ex_vi:"Leo via ferrata cần đồ bảo hộ tốt." },
        ]
      },
      {
        id: "b1g10", label: "Les activités à l'intérieur", icon: "🏠",
        words: [
          { fr:"le bricolage",       vi:"làm đồ thủ công / sửa chữa vặt", ex_fr:"Le week-end, il fait du bricolage à la maison.", ex_vi:"Cuối tuần anh ấy sửa chữa lặt vặt ở nhà." },
          { fr:"les jeux de société", vi:"trò chơi bàn (board game)", ex_fr:"On a joué à des jeux de société toute la soirée.", ex_vi:"Cả tối chúng tôi chơi board game." },
          { fr:"les jeux vidéo",     vi:"trò chơi điện tử", ex_fr:"Il passe trop de temps sur les jeux vidéo.", ex_vi:"Cậu ấy dành quá nhiều thời gian cho trò chơi điện tử." },
          { fr:"le judo",            vi:"judo", ex_fr:"Elle fait du judo depuis l'âge de six ans.", ex_vi:"Cô ấy học judo từ năm sáu tuổi." },
          { fr:"la peinture",        vi:"hội họa, vẽ tranh", ex_fr:"Il a découvert la peinture pendant le confinement.", ex_vi:"Anh ấy khám phá ra hội họa trong thời gian giãn cách." },
        ]
      },
      {
        id: "b1g11", label: "Pratiquer une activité (verbes)", icon: "🏃",
        words: [
          { fr:"bricoler",                                vi:"làm đồ thủ công / sửa chữa vặt", ex_fr:"Mon père adore bricoler le dimanche.", ex_vi:"Bố tôi rất thích sửa chữa vặt vào Chủ nhật." },
          { fr:"être amateur, amatrice / professionnel(le)", vi:"là người nghiệp dư / chuyên nghiệp", ex_fr:"Je suis amatrice : je fais ça pour le plaisir.", ex_vi:"Tôi là dân nghiệp dư: tôi làm vì thích thôi." },
          { fr:"faire du vélo, de l'escalade, de l'accrobranche", vi:"đạp xe, leo núi, leo cây mạo hiểm", ex_fr:"Le dimanche, nous faisons du vélo en famille.", ex_vi:"Chủ nhật cả nhà tôi đạp xe." },
          { fr:"faire une compétition de...",             vi:"thi đấu môn...", ex_fr:"Il a fait une compétition de judo à Lyon.", ex_vi:"Anh ấy thi đấu judo ở Lyon." },
          { fr:"faire une randonnée, une via ferrata",     vi:"đi trekking, leo via ferrata", ex_fr:"On a fait une randonnée pendant tout le week-end.", ex_vi:"Chúng tôi đi trekking suốt cả cuối tuần." },
          { fr:"jardiner",                                vi:"làm vườn", ex_fr:"Elle jardine tous les matins.", ex_vi:"Sáng nào cô ấy cũng làm vườn." },
          { fr:"jouer au / faire du foot",                vi:"chơi bóng đá", ex_fr:"Mes amis jouent au foot le samedi.", ex_vi:"Bạn tôi chơi bóng đá vào thứ Bảy." },
          { fr:"jouer aux jeux vidéo",                    vi:"chơi trò chơi điện tử", ex_fr:"Il joue aux jeux vidéo depuis qu'il est petit.", ex_vi:"Cậu ấy chơi game từ hồi bé." },
          { fr:"peindre / faire un tableau",              vi:"vẽ tranh", ex_fr:"Elle a peint un tableau pour sa mère.", ex_vi:"Cô ấy vẽ một bức tranh tặng mẹ." },
          { fr:"regarder une série, un match, etc.",      vi:"xem phim bộ, xem trận đấu, v.v.", ex_fr:"Hier soir, j'ai regardé un match de foot.", ex_vi:"Tối qua tôi xem một trận bóng đá." },
        ]
      },
    ]
  },
];
