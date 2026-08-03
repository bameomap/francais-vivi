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
  {
    id: "b2", num: "2", title: "Je me souviens",
    color: "#7C3AED", bg: "#EDE9FE",
    groups: [
      {
        id: "b2g1", label: "La mémoire", icon: "🧠",
        words: [
          { fr:"l'album photos (m.)",      vi:"cuốn album ảnh", ex_fr:"Je cherche l'album photos bleu.", ex_vi:"Tôi đang tìm cuốn album ảnh màu xanh." },
          { fr:"oublier",                  vi:"quên", ex_fr:"Ils ne veulent pas oublier mon anniversaire.", ex_vi:"Họ không muốn quên sinh nhật tôi." },
          { fr:"raconter un souvenir",     vi:"kể lại một kỷ niệm", ex_fr:"Je vais vous raconter mes souvenirs.", ex_vi:"Tôi sẽ kể cho các bạn nghe những kỷ niệm của tôi." },
          { fr:"replonger dans son enfance", vi:"đắm chìm lại vào tuổi thơ", ex_fr:"J'ai envie de replonger dans mon enfance.", ex_vi:"Tôi muốn được đắm chìm lại vào tuổi thơ của mình." },
          { fr:"se rappeler",              vi:"nhớ lại (nhớ ra)", ex_fr:"Je me rappelle les bugnes qu'elle nous préparait.", ex_vi:"Tôi nhớ lại món bugnes mà bà thường làm cho chúng tôi." },
          { fr:"se souvenir (de)",         vi:"nhớ, ghi nhớ", ex_fr:"Je me souviens des confitures de ma grand-mère.", ex_vi:"Tôi nhớ mứt của bà tôi." },
        ]
      },
      {
        id: "b2g2", label: "Les cinq sens", icon: "👃",
        words: [
          { fr:"le bruit",                 vi:"tiếng động, âm thanh", ex_fr:"Le bruit du feu me rappelle mon grand-père.", ex_vi:"Tiếng lửa cháy làm tôi nhớ đến ông tôi." },
          { fr:"le chant des oiseaux",     vi:"tiếng chim hót", ex_fr:"J'aimais le chant des oiseaux dans le jardin.", ex_vi:"Tôi thích tiếng chim hót trong vườn." },
          { fr:"le goût",                  vi:"vị giác, mùi vị", ex_fr:"Le bout de la ligne avait le goût du bout du monde.", ex_vi:"Điểm cuối chặng đường có cái vị của tận cùng thế giới." },
          { fr:"goûter",                   vi:"nếm thử", ex_fr:"D'accord, mais juste pour goûter !", ex_vi:"Được rồi, nhưng chỉ để nếm thử thôi nhé!" },
          { fr:"l'odeur (f.)",             vi:"mùi hương", ex_fr:"L'odeur, le bruit, la vue du feu me rappellent ces moments.", ex_vi:"Mùi, tiếng động, cảnh lửa cháy làm tôi nhớ lại những khoảnh khắc ấy." },
          { fr:"le parfum",                vi:"hương thơm", ex_fr:"La Corse, c'est le parfum des fleurs au printemps.", ex_vi:"Corse, đó là hương hoa mùa xuân." },
          { fr:"regarder",                 vi:"nhìn, ngắm", ex_fr:"On regardait les étoiles.", ex_vi:"Chúng tôi ngắm những vì sao." },
          { fr:"la saveur",                vi:"hương vị", ex_fr:"Quelles saveurs ! Mes préférées : figues, abricots et clémentines.", ex_vi:"Bao nhiêu hương vị! Tôi thích nhất là sung, mơ và quýt." },
          { fr:"sentir bon ≠ sentir mauvais", vi:"có mùi thơm ≠ có mùi khó chịu", ex_fr:"Ça sentait bon !", ex_vi:"Thơm quá!" },
          { fr:"tenir la main",            vi:"nắm tay", ex_fr:"Je lui tenais la main.", ex_vi:"Tôi nắm tay bà." },
          { fr:"voir",                     vi:"nhìn thấy", ex_fr:"On voit la mer, c'est magnifique !", ex_vi:"Nhìn thấy biển kìa, đẹp quá!" },
          { fr:"la vue",                   vi:"tầm nhìn, cảnh nhìn thấy", ex_fr:"Vous découvrez une vue magnifique sur les plages.", ex_vi:"Bạn sẽ thấy một tầm nhìn tuyệt đẹp ra các bãi biển." },
        ]
      },
      {
        id: "b2g3", label: "Qualifier un souvenir", icon: "💭",
        words: [
          { fr:"un souvenir d'adolescence", vi:"kỷ niệm thời thanh thiếu niên", ex_fr:"Elle adore replonger dans ses souvenirs d'adolescence.", ex_vi:"Cô ấy rất thích đắm chìm lại vào kỷ niệm thời thanh thiếu niên của mình." },
          { fr:"un souvenir d'école",       vi:"kỷ niệm thời đi học", ex_fr:"J'ai des bons souvenirs d'école.", ex_vi:"Tôi có những kỷ niệm đẹp thời đi học." },
          { fr:"un souvenir d'enfance",     vi:"kỷ niệm tuổi thơ", ex_fr:"Mon enfance est une boîte pleine de souvenirs.", ex_vi:"Tuổi thơ tôi là một hộp đầy ắp kỷ niệm." },
          { fr:"un souvenir de famille",    vi:"kỷ niệm gia đình", ex_fr:"C'est un souvenir de famille très heureux.", ex_vi:"Đó là một kỷ niệm gia đình rất hạnh phúc." },
          { fr:"un souvenir de jeunesse",   vi:"kỷ niệm thời trẻ", ex_fr:"Ils ne veulent pas oublier leurs souvenirs de jeunesse.", ex_vi:"Họ không muốn quên những kỷ niệm thời trẻ của mình." },
          { fr:"des souvenirs de vacances", vi:"kỷ niệm những kỳ nghỉ", ex_fr:"C'est un souvenir de vacances inoubliable !", ex_vi:"Đó là một kỷ niệm nghỉ mát không thể quên!" },
          { fr:"agréable",                 vi:"dễ chịu, thú vị", ex_fr:"Ce ne sont pas des souvenirs très agréables.", ex_vi:"Đó không phải là những kỷ niệm dễ chịu lắm." },
          { fr:"bon",                      vi:"tốt, đẹp", ex_fr:"J'ai des bons souvenirs d'école.", ex_vi:"Tôi có những kỷ niệm đẹp thời đi học." },
          { fr:"difficile",                vi:"khó khăn", ex_fr:"C'est un souvenir difficile pour elle.", ex_vi:"Đó là một kỷ niệm khó khăn với cô ấy." },
          { fr:"heureux, heureuse",        vi:"hạnh phúc", ex_fr:"Quels souvenirs heureux !", ex_vi:"Những kỷ niệm hạnh phúc làm sao!" },
          { fr:"inoubliable",              vi:"không thể quên", ex_fr:"Un souvenir inoubliable.", ex_vi:"Một kỷ niệm không thể quên." },
          { fr:"joyeux, joyeuse",          vi:"vui vẻ", ex_fr:"C'est un souvenir d'enfance joyeux.", ex_vi:"Đó là một kỷ niệm tuổi thơ vui vẻ." },
          { fr:"mauvais",                  vi:"xấu, tệ", ex_fr:"C'est un mauvais souvenir d'école.", ex_vi:"Đó là một kỷ niệm tệ thời đi học." },
          { fr:"triste",                   vi:"buồn", ex_fr:"C'est un souvenir de jeunesse très triste.", ex_vi:"Đó là một kỷ niệm thời trẻ rất buồn." },
        ]
      },
      {
        id: "b2g4", label: "Les paysages", icon: "🏞️",
        words: [
          { fr:"à marée basse ≠ à marée haute", vi:"lúc thủy triều xuống ≠ lúc thủy triều lên", ex_fr:"À marée basse, on peut marcher jusqu'à l'île.", ex_vi:"Lúc thủy triều xuống, có thể đi bộ ra tới đảo." },
          { fr:"la barrière de corail",    vi:"rạn san hô", ex_fr:"Le vent, la barrière de corail, les plages…", ex_vi:"Gió, rạn san hô, những bãi biển…" },
          { fr:"la côte",                  vi:"bờ biển", ex_fr:"On fait de très belles balades sur la côte.", ex_vi:"Có thể đi dạo rất đẹp dọc bờ biển." },
          { fr:"la dune",                  vi:"đụn cát", ex_fr:"On marchait dans le désert au milieu des dunes.", ex_vi:"Chúng tôi đi bộ trong sa mạc giữa những đụn cát." },
          { fr:"l'île (f.)",               vi:"hòn đảo", ex_fr:"C'est une île très touristique.", ex_vi:"Đó là một hòn đảo rất du lịch." },
          { fr:"la mouette",               vi:"chim mòng biển", ex_fr:"Oh regarde les mouettes !", ex_vi:"Ồ nhìn kìa, chim mòng biển!" },
          { fr:"la plage",                 vi:"bãi biển", ex_fr:"Le camping est à côté des plages.", ex_vi:"Khu cắm trại ở ngay cạnh các bãi biển." },
          { fr:"le port",                  vi:"bến cảng", ex_fr:"On y voit de très jolis bateaux dans le port.", ex_vi:"Ở đó ta thấy những chiếc thuyền rất đẹp trong bến cảng." },
          { fr:"le sable",                 vi:"cát", ex_fr:"Les enfants jouent dans le sable.", ex_vi:"Bọn trẻ chơi trên cát." },
          { fr:"le champ",                 vi:"cánh đồng", ex_fr:"On voit beaucoup de champs, de fermes et de prairies.", ex_vi:"Có thể thấy rất nhiều cánh đồng, trang trại và đồng cỏ." },
          { fr:"la ferme",                 vi:"trang trại", ex_fr:"On va visiter cette ferme cet après-midi ?", ex_vi:"Chiều nay mình đi thăm trang trại này nhé?" },
          { fr:"la prairie",               vi:"đồng cỏ", ex_fr:"J'adore ces paysages avec ces prairies !", ex_vi:"Tôi mê cảnh có những đồng cỏ như thế này!" },
          { fr:"le chalet",                vi:"nhà gỗ (kiểu miền núi)", ex_fr:"Vous avez loué un chalet à la montagne ?", ex_vi:"Bạn có thuê một căn nhà gỗ trên núi không?" },
          { fr:"le lac",                   vi:"hồ", ex_fr:"En randonnée, on passe parfois à côté de petits lacs.", ex_vi:"Khi đi trekking, thỉnh thoảng ta đi ngang những cái hồ nhỏ." },
          { fr:"le sommet",                vi:"đỉnh (núi)", ex_fr:"Encore un petit effort, on arrive bientôt au sommet !", ex_vi:"Cố thêm chút nữa, sắp tới đỉnh rồi!" },
        ]
      },
      {
        id: "b2g5", label: "La météo", icon: "⛅",
        words: [
          { fr:"la canicule",              vi:"đợt nắng nóng gay gắt", ex_fr:"C'est la canicule ! Il fait très chaud la journée et la nuit aussi.", ex_vi:"Đợt nắng nóng ghê quá! Ban ngày lẫn ban đêm đều nóng." },
          { fr:"la chaleur ≠ la fraîcheur", vi:"cái nóng ≠ sự mát mẻ", ex_fr:"L'été, je cherche la fraîcheur !", ex_vi:"Mùa hè, tôi tìm chỗ mát mẻ!" },
          { fr:"le ciel (bleu, gris)",     vi:"bầu trời (xanh, xám)", ex_fr:"Le ciel est devenu gris.", ex_vi:"Bầu trời trở nên xám xịt." },
          { fr:"le climat",                vi:"khí hậu", ex_fr:"Le climat y est agréable.", ex_vi:"Khí hậu ở đó dễ chịu." },
          { fr:"l'orage (m.)",             vi:"cơn giông", ex_fr:"Il y a eu un gros orage !", ex_vi:"Đã có một cơn giông lớn!" },
          { fr:"la pluie",                 vi:"mưa", ex_fr:"Tu as vu cette pluie ?", ex_vi:"Bạn có thấy trận mưa đó không?" },
          { fr:"le soleil",                vi:"mặt trời, nắng", ex_fr:"Avec du soleil, c'est très différent !", ex_vi:"Có nắng thì khác hẳn!" },
          { fr:"la température (les degrés)", vi:"nhiệt độ (số độ)", ex_fr:"Entre 18 et 20 degrés, c'est parfait pour moi.", ex_vi:"Từ 18 đến 20 độ là hoàn hảo với tôi." },
          { fr:"le temps",                 vi:"thời tiết", ex_fr:"On va avoir ce temps gris tout le week-end ?", ex_vi:"Cả cuối tuần sẽ có kiểu thời tiết xám xịt này à?" },
          { fr:"un temps humide ≠ un temps sec", vi:"thời tiết ẩm ≠ thời tiết khô", ex_fr:"Il fait un temps humide en Thaïlande.", ex_vi:"Ở Thái Lan thời tiết ẩm." },
          { fr:"un temps gris",            vi:"trời âm u", ex_fr:"La météo annonce un temps gris.", ex_vi:"Dự báo thời tiết báo trời sẽ âm u." },
          { fr:"le vent",                  vi:"gió", ex_fr:"Je déteste le vent, parfois il souffle à 80 kilomètres par heure.", ex_vi:"Tôi ghét gió lắm, đôi khi nó thổi tới 80 cây số một giờ." },
        ]
      },
    ]
  },
  {
    id: "b3", num: "3", title: "Comme à la maison",
    color: "#D97706", bg: "#FEF3E2",
    groups: [
      {
        id: "b3g1", label: "Les types de logement", icon: "🏠",
        words: [
          { fr:"l'appartement (m.)",      vi:"căn hộ", ex_fr:"Nous louons un appartement trois pièces.", ex_vi:"Chúng tôi thuê một căn hộ ba phòng." },
          { fr:"le foyer = la résidence (universitaire)", vi:"khu nhà tập thể = ký túc xá", ex_fr:"J'habite dans un foyer où il y a beaucoup de jeunes actifs.", ex_vi:"Tôi sống trong một khu nhà tập thể có nhiều người trẻ đi làm." },
          { fr:"l'immeuble (m.)",         vi:"tòa nhà chung cư", ex_fr:"Nous habitons dans un immeuble qui a 8 étages.", ex_vi:"Chúng tôi sống trong một tòa nhà có 8 tầng." },
          { fr:"la maison",               vi:"nhà (nhà riêng)", ex_fr:"Ma sœur vit dans une maison à la campagne.", ex_vi:"Chị tôi sống trong một ngôi nhà ở nông thôn." },
          { fr:"le studio",               vi:"phòng studio (1 phòng)", ex_fr:"Je loue un studio qui est dans une ferme.", ex_vi:"Tôi thuê một phòng studio nằm trong một trang trại." },
          { fr:"le T1/T2, le F1/F2",      vi:"căn hộ 1/2 phòng (cách gọi Pháp)", ex_fr:"Il y a autant de pièces dans un T2 que dans un F2.", ex_vi:"Một căn T2 có số phòng bằng một căn F2." },
          { fr:"le/la propriétaire",      vi:"chủ nhà", ex_fr:"Mon propriétaire est un homme que j'aime beaucoup.", ex_vi:"Chủ nhà tôi là một người đàn ông mà tôi rất quý." },
          { fr:"le/la locataire",         vi:"người thuê nhà", ex_fr:"Le locataire habite un appartement qui n'est pas à lui.", ex_vi:"Người thuê nhà sống trong một căn hộ không phải của mình." },
          { fr:"le/la colocataire",       vi:"người ở ghép", ex_fr:"Les colocataires sont des personnes qui partagent un appartement.", ex_vi:"Người ở ghép là những người cùng chia sẻ một căn hộ." },
          { fr:"la colocation",           vi:"việc ở ghép", ex_fr:"Une colocation qui se passe bien permet de partager de bons moments.", ex_vi:"Một cuộc ở ghép suôn sẻ giúp chia sẻ nhiều khoảnh khắc vui." },
          { fr:"la cohabitation",         vi:"sự sống chung (liên thế hệ)", ex_fr:"La cohabitation intergénérationnelle est une solution pratique.", ex_vi:"Sống chung liên thế hệ là một giải pháp thiết thực." },
          { fr:"vivre seul(e) / en couple / en colocation", vi:"sống một mình / có đôi / ở ghép", ex_fr:"Je préfère vivre seule plutôt qu'en colocation.", ex_vi:"Tôi thích sống một mình hơn là ở ghép." },
        ]
      },
      {
        id: "b3g2", label: "Les pièces & l'immeuble", icon: "🚪",
        words: [
          { fr:"le balcon",               vi:"ban công", ex_fr:"Cette maison neuve a un grand jardin et un balcon.", ex_vi:"Ngôi nhà mới này có một khu vườn lớn và một ban công." },
          { fr:"la buanderie",            vi:"phòng giặt đồ", ex_fr:"On fait la lessive dans la buanderie.", ex_vi:"Người ta giặt đồ trong phòng giặt." },
          { fr:"le bureau",               vi:"phòng làm việc / bàn làm việc", ex_fr:"La chambre a un coin bureau.", ex_vi:"Phòng ngủ có một góc bàn làm việc." },
          { fr:"la chambre",              vi:"phòng ngủ", ex_fr:"Voici la chambre où je dors.", ex_vi:"Đây là phòng ngủ nơi tôi ngủ." },
          { fr:"le couloir",              vi:"hành lang", ex_fr:"Un couloir sépare les deux chambres.", ex_vi:"Một hành lang ngăn cách hai phòng ngủ." },
          { fr:"la cuisine",              vi:"nhà bếp", ex_fr:"Il y a une petite cuisine équipée.", ex_vi:"Có một bếp nhỏ được trang bị đầy đủ." },
          { fr:"la salle à manger",       vi:"phòng ăn", ex_fr:"Le salon fait aussi salle à manger.", ex_vi:"Phòng khách cũng là phòng ăn luôn." },
          { fr:"la salle d'eau = la salle de bain", vi:"phòng tắm", ex_fr:"Le studio a une grande pièce et une salle d'eau.", ex_vi:"Phòng studio có một phòng lớn và một phòng tắm." },
          { fr:"le salon = le séjour",    vi:"phòng khách", ex_fr:"Le salon est la pièce que je préfère.", ex_vi:"Phòng khách là căn phòng tôi thích nhất." },
          { fr:"la véranda",              vi:"hiên kính (véranda)", ex_fr:"Cette maison a une véranda et une buanderie.", ex_vi:"Ngôi nhà này có một hiên kính và một phòng giặt." },
          { fr:"l'ascenseur (m.)",        vi:"thang máy", ex_fr:"J'habite au septième étage sans ascenseur.", ex_vi:"Tôi ở tầng bảy mà không có thang máy." },
          { fr:"la cave, le sous-sol",    vi:"tầng hầm, hầm chứa đồ", ex_fr:"Il y a un garage au sous-sol.", ex_vi:"Có một ga-ra ở tầng hầm." },
          { fr:"l'étage (m.)",            vi:"tầng", ex_fr:"Les chambres sont au premier et au deuxième étages.", ex_vi:"Các phòng ngủ ở tầng một và tầng hai." },
          { fr:"le garage",               vi:"ga-ra để xe", ex_fr:"Il y a un garage où vous pouvez garer votre voiture.", ex_vi:"Có một ga-ra nơi bạn có thể đỗ ô tô." },
          { fr:"le grenier",              vi:"gác mái", ex_fr:"Le studio est aménagé dans un ancien grenier.", ex_vi:"Phòng studio được cải tạo từ một gác mái cũ." },
          { fr:"le jardin",               vi:"khu vườn", ex_fr:"Cette maison neuve a un grand jardin.", ex_vi:"Ngôi nhà mới này có một khu vườn lớn." },
          { fr:"le local à vélos",        vi:"kho để xe đạp", ex_fr:"Il y a aussi un local où vous pouvez mettre votre vélo.", ex_vi:"Cũng có một kho nơi bạn có thể để xe đạp." },
          { fr:"le rez-de-chaussée",      vi:"tầng trệt", ex_fr:"Au rez-de-chaussée, il y a les espaces communs.", ex_vi:"Ở tầng trệt có các không gian chung." },
        ]
      },
      {
        id: "b3g3", label: "L'annonce, les frais, les gens", icon: "📋",
        words: [
          { fr:"ancien(ne) ≠ neuf, neuve",  vi:"cũ ≠ mới", ex_fr:"Loue appartement dans un bel immeuble ancien.", ex_vi:"Cho thuê căn hộ trong một tòa nhà cũ đẹp." },
          { fr:"calme ≠ bruyant(e)",        vi:"yên tĩnh ≠ ồn ào", ex_fr:"La résidence est située dans un quartier calme.", ex_vi:"Khu nhà nằm trong một khu phố yên tĩnh." },
          { fr:"clair(e) ≠ sombre",         vi:"sáng ≠ tối", ex_fr:"Studio très clair, aménagé dans un ancien grenier.", ex_vi:"Phòng studio rất sáng, được cải tạo từ một gác mái cũ." },
          { fr:"confortable",               vi:"tiện nghi, thoải mái", ex_fr:"C'est très confortable !", ex_vi:"Nó rất tiện nghi!" },
          { fr:"disponible",                vi:"sẵn có, còn trống", ex_fr:"Ce logement est disponible tout de suite.", ex_vi:"Chỗ ở này còn trống ngay bây giờ." },
          { fr:"équipé(e)",                 vi:"được trang bị", ex_fr:"Une petite cuisine équipée.", ex_vi:"Một bếp nhỏ được trang bị đầy đủ." },
          { fr:"le mètre carré (m²)",       vi:"mét vuông", ex_fr:"Studio de 33 m² à louer.", ex_vi:"Phòng studio 33m² cho thuê." },
          { fr:"meublé(e)",                 vi:"có nội thất sẵn", ex_fr:"18 chambres et studios meublés en location.", ex_vi:"18 phòng và studio có nội thất sẵn cho thuê." },
          { fr:"rénové(e)",                 vi:"đã cải tạo", ex_fr:"Magnifique T2 rénové dans un bel immeuble ancien.", ex_vi:"Căn T2 tuyệt đẹp đã cải tạo trong một tòa nhà cũ đẹp." },
          { fr:"la superficie",             vi:"diện tích", ex_fr:"Quelle est la superficie du logement ?", ex_vi:"Diện tích chỗ ở là bao nhiêu?" },
          { fr:"l'abonnement à Internet (m.)", vi:"gói cước Internet", ex_fr:"Ça inclut l'abonnement à Internet.", ex_vi:"Cái đó bao gồm cả gói cước Internet." },
          { fr:"l'assurance (f.)",          vi:"bảo hiểm", ex_fr:"Toutes les charges sont incluses, ainsi que l'assurance.", ex_vi:"Tất cả chi phí đều đã bao gồm, cùng với bảo hiểm." },
          { fr:"les charges (f.)",          vi:"phí dịch vụ chung", ex_fr:"580 € par mois charges comprises.", ex_vi:"580 euro một tháng đã gồm phí dịch vụ." },
          { fr:"le chauffage",              vi:"hệ thống sưởi", ex_fr:"Le loyer inclut l'eau, l'électricité, le gaz et le chauffage.", ex_vi:"Tiền thuê bao gồm nước, điện, gas và sưởi." },
          { fr:"l'eau (f.)",                vi:"nước", ex_fr:"Ça inclut les charges : l'eau, l'électricité, le gaz.", ex_vi:"Cái đó bao gồm các chi phí: nước, điện, gas." },
          { fr:"l'électricité (f.)",        vi:"điện", ex_fr:"Le montant du loyer inclut l'électricité.", ex_vi:"Số tiền thuê nhà đã bao gồm tiền điện." },
          { fr:"le gaz",                    vi:"gas", ex_fr:"Il n'y a pas de gaz dans cet appartement, tout est électrique.", ex_vi:"Căn hộ này không có gas, mọi thứ đều chạy điện." },
          { fr:"le loyer",                  vi:"tiền thuê nhà", ex_fr:"Quel est le montant du loyer ?", ex_vi:"Số tiền thuê nhà là bao nhiêu?" },
          { fr:"le ménage",                 vi:"dịch vụ dọn dẹp", ex_fr:"Le loyer inclut aussi le ménage.", ex_vi:"Tiền thuê nhà còn bao gồm cả dịch vụ dọn dẹp." },
        ]
      },
      {
        id: "b3g4", label: "Le mobilier et la décoration", icon: "🛋️",
        words: [
          { fr:"le canapé = le sofa = le divan", vi:"ghế sofa", ex_fr:"Il y a un espace salon, avec un canapé-lit.", ex_vi:"Có một khu vực phòng khách, với một ghế sofa giường." },
          { fr:"la chaise",                 vi:"cái ghế", ex_fr:"Un bureau blanc et sa chaise.", ex_vi:"Một cái bàn làm việc màu trắng và ghế của nó." },
          { fr:"l'étagère (f.)",            vi:"kệ sách", ex_fr:"J'ai mis une étagère avec des plantes.", ex_vi:"Tôi đã đặt một cái kệ có cây xanh." },
          { fr:"le lit (une place/deux places)", vi:"giường (đơn/đôi)", ex_fr:"Un lit deux places recouvert d'une couette bleue.", ex_vi:"Một giường đôi phủ chăn màu xanh." },
          { fr:"le placard",                vi:"tủ tường", ex_fr:"Il y a des placards et des rangements.", ex_vi:"Có tủ tường và các ngăn chứa đồ." },
          { fr:"les rangements (m.)",       vi:"chỗ chứa đồ", ex_fr:"Il y a une douche, un lavabo et des rangements.", ex_vi:"Có vòi sen, bồn rửa và chỗ chứa đồ." },
          { fr:"la table",                  vi:"cái bàn", ex_fr:"Un balcon meublé d'un transat, d'une table et deux chaises.", ex_vi:"Một ban công có ghế nằm, một cái bàn và hai ghế." },
          { fr:"la table basse",            vi:"bàn trà", ex_fr:"Il y a un canapé-lit, une table basse et deux tabourets.", ex_vi:"Có ghế sofa giường, bàn trà và hai ghế đẩu." },
          { fr:"la table de chevet",        vi:"bàn đầu giường", ex_fr:"Une table de chevet sur laquelle est posée une lampe.", ex_vi:"Một bàn đầu giường có đặt một cái đèn." },
          { fr:"le tabouret",               vi:"ghế đẩu", ex_fr:"Deux tabourets près de la table basse.", ex_vi:"Hai ghế đẩu gần bàn trà." },
          { fr:"le téléviseur = la télé",   vi:"tivi", ex_fr:"Un téléviseur et son meuble.", ex_vi:"Một cái tivi và kệ để tivi." },
          { fr:"le cadre (photo)",          vi:"khung ảnh", ex_fr:"J'ai mis des cadres avec des photos.", ex_vi:"Tôi đã treo các khung ảnh." },
          { fr:"le coussin",                vi:"gối tựa", ex_fr:"Des coussins sur le canapé.", ex_vi:"Những cái gối tựa trên ghế sofa." },
          { fr:"l'horloge (f.)",            vi:"đồng hồ treo tường", ex_fr:"J'ai mis une horloge dans le salon.", ex_vi:"Tôi đã treo một cái đồng hồ trong phòng khách." },
          { fr:"la lampe",                  vi:"cái đèn", ex_fr:"Une table de chevet sur laquelle est posée une lampe.", ex_vi:"Một bàn đầu giường có đặt một cái đèn." },
          { fr:"la plante",                 vi:"cây cảnh", ex_fr:"Une étagère avec des plantes.", ex_vi:"Một cái kệ có cây cảnh." },
          { fr:"le rideau",                 vi:"rèm cửa", ex_fr:"J'ai mis des rideaux aux fenêtres.", ex_vi:"Tôi đã treo rèm ở cửa sổ." },
        ]
      },
      {
        id: "b3g5", label: "L'équipement et le quartier", icon: "🏙️",
        words: [
          { fr:"les appareils électroménagers (m.)", vi:"đồ điện gia dụng", ex_fr:"On a moins d'appareils électroménagers que dans notre ancien appartement.", ex_vi:"Chúng tôi có ít đồ điện gia dụng hơn căn hộ cũ." },
          { fr:"la couette",                vi:"chăn (bông)", ex_fr:"Un lit recouvert d'une épaisse couette bleue.", ex_vi:"Một cái giường phủ chăn dày màu xanh." },
          { fr:"la douche",                 vi:"vòi hoa sen", ex_fr:"Il y a une douche, un lavabo et des toilettes.", ex_vi:"Có vòi hoa sen, bồn rửa và nhà vệ sinh." },
          { fr:"l'évier (m.)",              vi:"bồn rửa bát", ex_fr:"Il y a l'essentiel : un four, un évier et un frigo.", ex_vi:"Có những thứ cơ bản: lò nướng, bồn rửa bát và tủ lạnh." },
          { fr:"le four",                   vi:"lò nướng", ex_fr:"Mon four n'est pas très bon, je dois acheter un meilleur four.", ex_vi:"Lò nướng của tôi không tốt lắm, tôi phải mua cái tốt hơn." },
          { fr:"le lavabo",                 vi:"bồn rửa mặt", ex_fr:"Une douche, un lavabo et des rangements.", ex_vi:"Một vòi sen, một bồn rửa mặt và chỗ chứa đồ." },
          { fr:"le lave-linge = la machine à laver", vi:"máy giặt", ex_fr:"Est-ce qu'il y a déjà un lave-linge dans l'appartement ?", ex_vi:"Trong căn hộ đã có sẵn máy giặt chưa?" },
          { fr:"le lave-vaisselle",         vi:"máy rửa bát", ex_fr:"Mon lave-vaisselle est pire que mon four.", ex_vi:"Máy rửa bát của tôi tệ hơn lò nướng của tôi." },
          { fr:"la machine à café",         vi:"máy pha cà phê", ex_fr:"Il y a un petit réfrigérateur et une machine à café.", ex_vi:"Có một tủ lạnh nhỏ và một máy pha cà phê." },
          { fr:"le réfrigérateur = le frigo", vi:"tủ lạnh", ex_fr:"Un petit réfrigérateur dans la cabine.", ex_vi:"Một tủ lạnh nhỏ trong ca-bin." },
          { fr:"l'avenue (f.)",             vi:"đại lộ", ex_fr:"On peut admirer cette maison sur une avenue chic.", ex_vi:"Có thể chiêm ngưỡng ngôi nhà này trên một đại lộ sang trọng." },
          { fr:"le bâtiment",               vi:"tòa nhà, công trình", ex_fr:"Ce superbe bâtiment se trouve au milieu d'espaces verts.", ex_vi:"Công trình tuyệt đẹp này nằm giữa các không gian xanh." },
          { fr:"les bureaux (m.)",          vi:"văn phòng", ex_fr:"Près des immeubles de bureaux d'institutions européennes.", ex_vi:"Gần các tòa nhà văn phòng của các tổ chức châu Âu." },
          { fr:"les espaces verts (m.)",    vi:"không gian xanh", ex_fr:"Est-ce qu'il y a des espaces verts dans le quartier ?", ex_vi:"Trong khu phố có không gian xanh không?" },
          { fr:"le magasin",                vi:"cửa hàng", ex_fr:"Une avenue chic et commerçante, avec beaucoup de magasins.", ex_vi:"Một đại lộ sang trọng và sầm uất buôn bán, có nhiều cửa hàng." },
          { fr:"la rue",                    vi:"con phố", ex_fr:"Dans une petite rue calme et tranquille.", ex_vi:"Trong một con phố nhỏ yên tĩnh." },
          { fr:"animé(e) ≠ tranquille",     vi:"nhộn nhịp ≠ yên tĩnh", ex_fr:"Ce quartier est populaire et vivant.", ex_vi:"Khu phố này bình dân và nhộn nhịp." },
          { fr:"chic",                      vi:"sang trọng", ex_fr:"Une avenue chic et commerçante.", ex_vi:"Một đại lộ sang trọng và sầm uất buôn bán." },
          { fr:"commerçant(e)",             vi:"sầm uất buôn bán", ex_fr:"Un quartier commerçant, avec beaucoup de bars et de restaurants.", ex_vi:"Một khu phố sầm uất, có nhiều quán bar và nhà hàng." },
          { fr:"historique",                vi:"mang tính lịch sử", ex_fr:"Dans le centre historique de Bruxelles.", ex_vi:"Trong trung tâm lịch sử của Bruxelles." },
          { fr:"populaire",                 vi:"bình dân, đông dân", ex_fr:"Situé dans un quartier populaire et vivant.", ex_vi:"Nằm trong một khu phố bình dân và nhộn nhịp." },
        ]
      },
    ]
  },
  {
    id: "b4", num: "4", title: "Tous pareils, tous différents",
    color: "#E8574A", bg: "#FFF0EF",
    groups: [
      {
        id: "b4g1", label: "La tête et le visage", icon: "😊",
        words: [
          { fr:"barbu(e)",                 vi:"để râu quai nón", ex_fr:"Il est barbu et dégarni du chef.", ex_vi:"Anh ấy để râu quai nón và hói đầu." },
          { fr:"chauve, dégarni(e)",       vi:"hói đầu, hói tóc", ex_fr:"Je n'ai plus du tout la tête de l'emploi, je suis chauve maintenant.", ex_vi:"Tôi không còn hợp vai nữa, giờ tôi hói rồi." },
          { fr:"les cheveux gris, bruns, longs, courts", vi:"tóc bạc, tóc nâu, tóc dài, tóc ngắn", ex_fr:"Elle pose avec ses longs cheveux gris.", ex_vi:"Cô ấy tạo dáng với mái tóc bạc dài." },
          { fr:"la fossette",              vi:"lúm đồng tiền", ex_fr:"Il a la même fossette au menton que Bonaparte.", ex_vi:"Anh ấy có lúm đồng tiền trên cằm giống Bonaparte." },
          { fr:"le menton",                vi:"cằm", ex_fr:"Il a la même fossette au menton.", ex_vi:"Anh ấy có lúm đồng tiền giống vậy trên cằm." },
          { fr:"le sourire",               vi:"nụ cười", ex_fr:"Son sourire illumine son visage.", ex_vi:"Nụ cười của cô ấy làm sáng bừng khuôn mặt." },
        ]
      },
      {
        id: "b4g2", label: "Le corps et l'apparence", icon: "🧍",
        words: [
          { fr:"âgé(e) = vieux, vieille (fam.) ≠ jeune", vi:"lớn tuổi ≠ trẻ", ex_fr:"Caroline Ida Ours, mannequin de 61 ans.", ex_vi:"Caroline Ida Ours, người mẫu 61 tuổi." },
          { fr:"corpulent(e), costaud(e), rond(e)", vi:"đẫy đà, vạm vỡ, tròn trịa", ex_fr:"Il se qualifie de « gros » : costaud, corpulent, taille plus.", ex_vi:"Anh ấy tự nhận mình là “béo”: vạm vỡ, đẫy đà, cỡ lớn." },
          { fr:"être de grande/petite taille", vi:"người cao lớn / thấp nhỏ", ex_fr:"Il veut devenir le premier mannequin de petite taille.", ex_vi:"Anh ấy muốn trở thành người mẫu thấp nhỏ đầu tiên." },
          { fr:"faire du 44 = faire une taille 44", vi:"mặc size 44", ex_fr:"Je fais du 44. Chaque corps est unique.", ex_vi:"Tôi mặc size 44. Mỗi cơ thể đều độc nhất." },
          { fr:"fort(e)",                  vi:"khỏe mạnh, to khỏe", ex_fr:"Tu es trop fort(e) !", ex_vi:"Bạn giỏi quá!" },
          { fr:"mesurer 1,60 m",           vi:"cao 1m60", ex_fr:"Il mesure 1,55 m.", ex_vi:"Anh ấy cao 1m55." },
          { fr:"musclé(e)",                vi:"cơ bắp", ex_fr:"Il faut être grand, musclé, sec.", ex_vi:"Phải cao, cơ bắp, gầy săn chắc." },
          { fr:"sec, sèche",               vi:"gầy săn chắc", ex_fr:"Je ne remplis aucun de ces critères.", ex_vi:"Tôi chẳng đáp ứng tiêu chí nào trong số đó." },
          { fr:"avoir bonne/mauvaise mine", vi:"trông khỏe/mệt", ex_fr:"Cette couleur vous donne bonne mine.", ex_vi:"Màu này làm bạn trông khỏe khoắn hơn." },
          { fr:"avoir un corps (im)parfait", vi:"có thân hình (không) hoàn hảo", ex_fr:"Qui a dit qu'un corps parfait, c'est un corps qui fait une taille 34-36 ?", ex_vi:"Ai bảo thân hình hoàn hảo là thân hình cỡ 34-36?" },
          { fr:"les canons de beauté (m.)", vi:"chuẩn mực cái đẹp", ex_fr:"Un physique différent des canons de beauté.", ex_vi:"Một vóc dáng khác với chuẩn mực cái đẹp." },
          { fr:"les critères de beauté (m.)", vi:"tiêu chí cái đẹp", ex_fr:"Il ne faut pas imposer de critères de beauté.", ex_vi:"Không nên áp đặt tiêu chí cái đẹp." },
          { fr:"être/se sentir bien dans sa peau", vi:"cảm thấy thoải mái với chính mình", ex_fr:"Elle se sent très bien dans sa peau.", ex_vi:"Cô ấy cảm thấy rất thoải mái với chính mình." },
          { fr:"avoir la tête de l'emploi", vi:"có gương mặt hợp vai/hợp việc", ex_fr:"Il était taillé pour le rôle.", ex_vi:"Anh ấy sinh ra để hợp với vai đó." },
          { fr:"être le sosie de",         vi:"là bản sao giống hệt của", ex_fr:"C'est sa doublure officielle depuis dix ans.", ex_vi:"Đó là người đóng thế chính thức của ông ấy suốt mười năm." },
          { fr:"ressembler à",             vi:"giống với", ex_fr:"Il ne ressemble plus autant qu'avant à l'empereur.", ex_vi:"Anh ấy không còn giống hoàng đế nhiều như trước." },
        ]
      },
      {
        id: "b4g3", label: "La mode", icon: "👗",
        words: [
          { fr:"le créateur, la créatrice", vi:"nhà thiết kế", ex_fr:"Elle défile pour beaucoup de créateurs.", ex_vi:"Cô ấy trình diễn cho nhiều nhà thiết kế." },
          { fr:"défiler",                  vi:"trình diễn thời trang", ex_fr:"Elle pose et défile avec ses longs cheveux gris.", ex_vi:"Cô ấy tạo dáng và trình diễn với mái tóc bạc dài." },
          { fr:"le/la mannequin",          vi:"người mẫu", ex_fr:"Mannequin depuis huit ans, il se qualifie de « gros ».", ex_vi:"Làm người mẫu tám năm nay, anh ấy tự nhận mình “béo”." },
          { fr:"porter des vêtements",     vi:"mặc quần áo", ex_fr:"C'est nous qui portons les vêtements.", ex_vi:"Chính chúng tôi là người mặc quần áo." },
          { fr:"poser",                    vi:"tạo dáng (chụp ảnh)", ex_fr:"Elle pose pour des photographes de mode.", ex_vi:"Cô ấy tạo dáng cho các nhiếp ảnh gia thời trang." },
        ]
      },
      {
        id: "b4g4", label: "Les qualités", icon: "✨",
        words: [
          { fr:"chaleureux, chaleureuse",  vi:"nồng hậu, ấm áp", ex_fr:"Vous êtes une personne sociable, chaleureuse et spontanée.", ex_vi:"Bạn là người hòa đồng, ấm áp và tự nhiên." },
          { fr:"curieux, curieuse",        vi:"tò mò, ham tìm hiểu", ex_fr:"Seul, il se montre curieux et réfléchi.", ex_vi:"Một mình, cậu ta tỏ ra tò mò và biết suy nghĩ." },
          { fr:"discret, discrète",        vi:"kín đáo, tế nhị", ex_fr:"Vous êtes quelqu'un de discret et réfléchi.", ex_vi:"Bạn là người kín đáo và chín chắn." },
          { fr:"doux, douce",              vi:"dịu dàng, hiền lành", ex_fr:"L'agneau est doux et honnête.", ex_vi:"Con cừu con thì hiền lành và trung thực." },
          { fr:"extraverti(e)",            vi:"hướng ngoại", ex_fr:"Vous êtes du genre extraverti ?", ex_vi:"Bạn thuộc kiểu người hướng ngoại à?" },
          { fr:"fidèle",                   vi:"trung thành", ex_fr:"Le chien est fidèle à son maître.", ex_vi:"Con chó trung thành với chủ." },
          { fr:"honnête",                  vi:"trung thực", ex_fr:"Tatiana ne ment jamais, elle est toujours honnête.", ex_vi:"Tatiana không bao giờ nói dối, cô ấy luôn trung thực." },
          { fr:"indépendant(e)",           vi:"độc lập", ex_fr:"Le loup est indépendant.", ex_vi:"Con sói thì độc lập." },
          { fr:"optimiste",                vi:"lạc quan", ex_fr:"La cigale est optimiste et paresseuse.", ex_vi:"Con ve sầu thì lạc quan và lười biếng." },
          { fr:"ordonné(e)",               vi:"ngăn nắp", ex_fr:"Vous êtes ordonné(e) et rigoureux(-se).", ex_vi:"Bạn ngăn nắp và nghiêm túc." },
          { fr:"prudent(e)",               vi:"thận trọng", ex_fr:"On peut compter sur votre prudence et votre tact.", ex_vi:"Có thể trông cậy vào sự thận trọng và tế nhị của bạn." },
          { fr:"réfléchi(e)",              vi:"chín chắn, biết suy nghĩ", ex_fr:"Seul, il se montre curieux et réfléchi.", ex_vi:"Một mình, cậu ta tỏ ra tò mò và biết suy nghĩ." },
          { fr:"spontané(e)",              vi:"tự nhiên, bộc trực", ex_fr:"Vous êtes chaleureuse et spontanée.", ex_vi:"Bạn ấm áp và tự nhiên." },
          { fr:"travailleur, travailleuse", vi:"chăm chỉ", ex_fr:"La fourmi est toujours inquiète et travailleuse.", ex_vi:"Con kiến thì lúc nào cũng lo lắng và chăm chỉ." },
        ]
      },
      {
        id: "b4g5", label: "Les défauts", icon: "😬",
        words: [
          { fr:"autoritaire",              vi:"độc đoán", ex_fr:"Le lion est autoritaire et cruel.", ex_vi:"Con sư tử thì độc đoán và tàn nhẫn." },
          { fr:"bruyant(e)",               vi:"ồn ào", ex_fr:"Vous vous trouvez bavard(e), bruyant(e) ?", ex_vi:"Bạn thấy mình hay nói, ồn ào à?" },
          { fr:"cruel(le)",                vi:"tàn nhẫn", ex_fr:"Le lion est autoritaire et cruel.", ex_vi:"Con sư tử thì độc đoán và tàn nhẫn." },
          { fr:"envieux, envieuse",        vi:"hay ganh tị", ex_fr:"La grenouille est envieuse et prétentieuse.", ex_vi:"Con ếch hay ganh tị và tự phụ." },
          { fr:"inquiet, inquiète",        vi:"hay lo lắng", ex_fr:"La fourmi est toujours inquiète.", ex_vi:"Con kiến lúc nào cũng lo lắng." },
          { fr:"maniaque (de l'ordre, de la propreté)", vi:"kỹ tính, cầu toàn (về trật tự, sạch sẽ)", ex_fr:"Vous êtes un peu maniaque ?", ex_vi:"Bạn hơi cầu toàn à?" },
          { fr:"menteur, menteuse",        vi:"hay nói dối", ex_fr:"Le renard est intelligent et menteur.", ex_vi:"Con cáo thì thông minh và hay nói dối." },
          { fr:"paresseux, paresseuse",    vi:"lười biếng", ex_fr:"La cigale est optimiste et paresseuse.", ex_vi:"Con ve sầu thì lạc quan và lười biếng." },
          { fr:"pessimiste",               vi:"bi quan", ex_fr:"La Fontaine se montre pessimiste.", ex_vi:"La Fontaine tỏ ra bi quan." },
          { fr:"peureux, peureuse",        vi:"hay sợ hãi", ex_fr:"Le loup est peureux face au renard.", ex_vi:"Con sói lại sợ hãi trước con cáo." },
          { fr:"prétentieux, prétentieuse", vi:"tự phụ, kiêu ngạo", ex_fr:"La grenouille est envieuse et prétentieuse.", ex_vi:"Con ếch hay ganh tị và tự phụ." },
          { fr:"sans gêne",                vi:"vô tư quá mức, thiếu tế nhị", ex_fr:"Un peu bavard(e), bruyant(e), parfois sans gêne.", ex_vi:"Hơi nhiều lời, ồn ào, đôi khi vô tư quá mức." },
          { fr:"stupide",                  vi:"ngốc nghếch", ex_fr:"Le loup est souvent un peu stupide face au renard.", ex_vi:"Con sói thường hơi ngốc trước con cáo." },
          { fr:"superficiel(le)",          vi:"hời hợt", ex_fr:"En groupe, le rat est superficiel.", ex_vi:"Khi ở trong nhóm, con chuột tỏ ra hời hợt." },
          { fr:"têtu(e)",                  vi:"bướng bỉnh, cứng đầu", ex_fr:"Antoine ne va pas changer d'avis parce qu'il est vraiment têtu.", ex_vi:"Antoine sẽ không đổi ý đâu vì cậu ấy rất bướng." },
          { fr:"avoir des yeux de lynx",   vi:"mắt tinh như cáo", ex_fr:"Le lynx a une très bonne vision.", ex_vi:"Con linh miêu có thị lực rất tốt." },
          { fr:"avoir une mémoire d'éléphant", vi:"trí nhớ như voi", ex_fr:"On associe l'éléphant à une grande mémoire.", ex_vi:"Người ta gắn con voi với trí nhớ tuyệt vời." },
          { fr:"être têtu(e) comme une mule/un âne", vi:"bướng như lừa", ex_fr:"Quand quelqu'un est têtu, on dit qu'il est une tête de mule.", ex_vi:"Khi ai đó bướng bỉnh, người ta bảo họ là “đầu lừa”." },
        ]
      },
    ]
  },
  {
    id: "b5", num: "5", title: "En route vers le futur !",
    color: "#7B6CF6", bg: "#EDE9FE",
    groups: [
      {
        id: "b5g1", label: "Le progrès", icon: "🔬",
        words: [
          { fr:"le chercheur, la chercheuse", vi:"nhà nghiên cứu", ex_fr:"Les chercheurs veulent l'utiliser pour étudier les océans.", ex_vi:"Các nhà nghiên cứu muốn dùng nó để nghiên cứu đại dương." },
          { fr:"la découverte",             vi:"khám phá", ex_fr:"Ce chercheur a fait une découverte incroyable.", ex_vi:"Nhà nghiên cứu này đã có một khám phá đáng kinh ngạc." },
          { fr:"l'énergie solaire (f.)",    vi:"năng lượng mặt trời", ex_fr:"Son moteur électrique marche à l'énergie solaire.", ex_vi:"Động cơ điện của nó chạy bằng năng lượng mặt trời." },
          { fr:"l'évolution (f.)",          vi:"sự tiến hóa, tiến bộ", ex_fr:"L'évolution des technologies est très rapide.", ex_vi:"Sự tiến bộ của công nghệ diễn ra rất nhanh." },
          { fr:"fabriquer",                 vi:"chế tạo", ex_fr:"Les ingénieurs comptent fabriquer un nouveau robot.", ex_vi:"Các kỹ sư dự định chế tạo một robot mới." },
          { fr:"l'innovation (f.)",         vi:"sự đổi mới, cải tiến", ex_fr:"Cette machine est une innovation qui va révolutionner le monde.", ex_vi:"Cỗ máy này là một cải tiến sẽ làm thay đổi thế giới." },
          { fr:"inventer",                  vi:"phát minh", ex_fr:"Qui a inventé cette machine ?", ex_vi:"Ai đã phát minh ra cỗ máy này?" },
          { fr:"l'inventeur, l'inventrice", vi:"nhà phát minh", ex_fr:"Il est l'inventeur du CardioPad.", ex_vi:"Ông ấy là nhà phát minh ra CardioPad." },
          { fr:"l'invention (f.)",          vi:"phát minh (danh từ)", ex_fr:"Cette invention est très utile pour la planète.", ex_vi:"Phát minh này rất hữu ích cho hành tinh." },
          { fr:"la nouveauté",              vi:"cái mới, sản phẩm mới", ex_fr:"Nous irons voir les dernières nouveautés.", ex_vi:"Chúng tôi sẽ đi xem những sản phẩm mới nhất." },
          { fr:"la technologie",            vi:"công nghệ", ex_fr:"Les technologies seront partout dans les écoles.", ex_vi:"Công nghệ sẽ có mặt khắp nơi trong trường học." },
        ]
      },
      {
        id: "b5g2", label: "Les machines et leur fonctionnement", icon: "⚙️",
        words: [
          { fr:"l'appareil (m.)",          vi:"thiết bị, máy móc", ex_fr:"Cet appareil ne fonctionne pas, je pense qu'il est en panne.", ex_vi:"Thiết bị này không hoạt động, tôi nghĩ nó bị hỏng." },
          { fr:"le moteur",                vi:"động cơ", ex_fr:"Cet avion fonctionne avec un moteur électrique.", ex_vi:"Máy bay này chạy bằng động cơ điện." },
          { fr:"la navette",                vi:"tàu con thoi", ex_fr:"Pour aller dans l'espace, il faut prendre une navette spatiale.", ex_vi:"Để lên vũ trụ, phải đi tàu con thoi." },
          { fr:"le robot",                  vi:"người máy, robot", ex_fr:"Nous avons acheté un nouveau robot qui fait le ménage.", ex_vi:"Chúng tôi đã mua một con robot mới làm việc nhà." },
          { fr:"être/tomber en panne",      vi:"bị hỏng, hỏng hóc", ex_fr:"Le bateau ne peut pas tomber en panne.", ex_vi:"Con tàu này không thể bị hỏng." },
          { fr:"fonctionner = marcher bien/mal", vi:"hoạt động, vận hành", ex_fr:"J'ai réparé mon ordinateur, j'espère qu'il va bien fonctionner.", ex_vi:"Tôi đã sửa máy tính, hy vọng nó sẽ chạy tốt." },
        ]
      },
      {
        id: "b5g3", label: "Les innovations technologiques", icon: "🤖",
        words: [
          { fr:"automatique",               vi:"tự động", ex_fr:"Ce métro est automatique, sans chauffeur.", ex_vi:"Tàu điện ngầm này tự động, không có tài xế." },
          { fr:"autonome",                  vi:"tự vận hành, độc lập", ex_fr:"Un jour, les voitures seront autonomes.", ex_vi:"Một ngày nào đó, xe hơi sẽ tự lái." },
          { fr:"électrique",                vi:"chạy điện", ex_fr:"Des transports électriques autonomes.", ex_vi:"Những phương tiện tự lái chạy điện." },
          { fr:"futuriste",                 vi:"mang phong cách tương lai", ex_fr:"Les films de science-fiction sont très futuristes.", ex_vi:"Phim khoa học viễn tưởng rất tương lai." },
          { fr:"indispensable",             vi:"không thể thiếu", ex_fr:"Bientôt, les robots deviendront indispensables.", ex_vi:"Chẳng bao lâu nữa, robot sẽ trở nên không thể thiếu." },
          { fr:"pratique",                  vi:"tiện lợi", ex_fr:"J'ai acheté une imprimante 3D, c'est très pratique.", ex_vi:"Tôi đã mua một máy in 3D, rất tiện lợi." },
          { fr:"robotisé(e)",               vi:"được tự động hóa bằng robot", ex_fr:"Dans ce restaurant, le service est entièrement robotisé.", ex_vi:"Trong nhà hàng này, việc phục vụ hoàn toàn do robot đảm nhiệm." },
          { fr:"utile ≠ inutile",           vi:"hữu ích ≠ vô ích", ex_fr:"Cet appareil ne sert à rien, il est vraiment inutile.", ex_vi:"Thiết bị này chẳng để làm gì, thật sự vô ích." },
          { fr:"le GPS",                    vi:"định vị GPS", ex_fr:"Je mets mon GPS quand je vais dans un endroit inconnu.", ex_vi:"Tôi bật GPS khi đến một nơi lạ." },
          { fr:"l'hologramme (m.)",         vi:"hình ảnh 3D nổi (hologram)", ex_fr:"Les professeurs utiliseront les hologrammes pour donner des cours.", ex_vi:"Giáo viên sẽ dùng hologram để dạy học." },
          { fr:"l'imprimante 3D (f.)",      vi:"máy in 3D", ex_fr:"J'ai découvert l'imprimante 3D alimentaire.", ex_vi:"Tôi đã khám phá ra máy in 3D thực phẩm." },
          { fr:"l'intelligence artificielle (f.)", vi:"trí tuệ nhân tạo", ex_fr:"Ce bateau fonctionne avec une intelligence artificielle.", ex_vi:"Con tàu này vận hành nhờ trí tuệ nhân tạo." },
          { fr:"le logiciel",               vi:"phần mềm", ex_fr:"La machine marche avec un logiciel sur un ordinateur.", ex_vi:"Cỗ máy chạy bằng phần mềm trên máy tính." },
          { fr:"la reconnaissance faciale", vi:"nhận diện khuôn mặt", ex_fr:"La reconnaissance faciale permettra d'adapter la nourriture.", ex_vi:"Nhận diện khuôn mặt sẽ giúp điều chỉnh phần ăn phù hợp." },
          { fr:"la tablette",               vi:"máy tính bảng", ex_fr:"Chaque enfant aura une tablette numérique à l'école.", ex_vi:"Mỗi trẻ sẽ có một máy tính bảng ở trường." },
          { fr:"la soucoupe volante",       vi:"đĩa bay", ex_fr:"Les navettes seront comme de petites soucoupes volantes.", ex_vi:"Những chiếc xe con thoi sẽ giống như những chiếc đĩa bay nhỏ." },
          { fr:"la téléportation",          vi:"dịch chuyển tức thời", ex_fr:"Les maisons pourront se téléporter jusqu'à la plage.", ex_vi:"Những ngôi nhà sẽ có thể dịch chuyển tức thời tới bãi biển." },
        ]
      },
      {
        id: "b5g4", label: "Le téléphone", icon: "📱",
        words: [
          { fr:"l'appel (m.)",              vi:"cuộc gọi", ex_fr:"Il n'a pas répondu à mon appel.", ex_vi:"Anh ấy không trả lời cuộc gọi của tôi." },
          { fr:"la batterie",                vi:"pin", ex_fr:"Mon téléphone n'a plus de batterie.", ex_vi:"Điện thoại tôi hết pin rồi." },
          { fr:"le selfie",                  vi:"ảnh tự sướng", ex_fr:"On fait un selfie ?", ex_vi:"Chụp ảnh tự sướng nhé?" },
          { fr:"le smartphone",              vi:"điện thoại thông minh", ex_fr:"Je n'ai plus Instagram sur mon smartphone.", ex_vi:"Tôi không còn Instagram trên điện thoại nữa." },
          { fr:"le SMS = le texto",          vi:"tin nhắn văn bản", ex_fr:"Tu pourras m'envoyer un SMS ?", ex_vi:"Bạn nhắn tin cho tôi được không?" },
          { fr:"le téléphone fixe",          vi:"điện thoại bàn", ex_fr:"Contactez-moi par téléphone fixe.", ex_vi:"Liên hệ với tôi qua điện thoại bàn." },
          { fr:"le téléphone portable",      vi:"điện thoại di động", ex_fr:"J'ai remplacé mon smartphone par un téléphone portable sans Internet.", ex_vi:"Tôi đã đổi điện thoại thông minh sang điện thoại di động không có mạng." },
          { fr:"contacter quelqu'un",        vi:"liên hệ với ai đó", ex_fr:"Marine n'est pas là ? Je vais la contacter.", ex_vi:"Marine không có ở đó à? Tôi sẽ liên hệ với cô ấy." },
          { fr:"décrocher ≠ raccrocher",     vi:"nhấc máy ≠ cúp máy", ex_fr:"Je t'ai appelé trois fois mais tu n'as pas décroché.", ex_vi:"Tôi gọi bạn ba lần mà bạn không nhấc máy." },
          { fr:"éteindre ≠ allumer",         vi:"tắt ≠ bật", ex_fr:"Julie a éteint son téléphone, elle n'est pas joignable.", ex_vi:"Julie đã tắt điện thoại, không liên lạc được." },
          { fr:"être joignable",             vi:"có thể liên lạc được", ex_fr:"Elle n'est pas joignable en ce moment.", ex_vi:"Cô ấy hiện không thể liên lạc được." },
        ]
      },
      {
        id: "b5g5", label: "L'informatique et Internet", icon: "💻",
        words: [
          { fr:"le clavier",                vi:"bàn phím", ex_fr:"L'écran ou le clavier est cassé.", ex_vi:"Màn hình hoặc bàn phím bị hỏng." },
          { fr:"la clé USB",                 vi:"USB", ex_fr:"J'ai mis le fichier sur une clé USB.", ex_vi:"Tôi đã lưu file vào USB." },
          { fr:"l'écran (m.)",              vi:"màn hình", ex_fr:"On discute sans clavier et sans écran.", ex_vi:"Chúng tôi trò chuyện không cần bàn phím hay màn hình." },
          { fr:"l'imprimante (f.)",         vi:"máy in", ex_fr:"J'ai besoin de mon ordinateur pour imprimer un document.", ex_vi:"Tôi cần máy tính để in một tài liệu." },
          { fr:"imprimer",                  vi:"in ấn", ex_fr:"Je n'utilise mon PC que pour imprimer un document.", ex_vi:"Tôi chỉ dùng máy tính để in tài liệu thôi." },
          { fr:"le PC = l'ordinateur",       vi:"máy tính (PC)", ex_fr:"Tu n'utilises plus du tout ton PC ?", ex_vi:"Bạn không dùng máy tính nữa à?" },
          { fr:"la souris",                  vi:"chuột máy tính", ex_fr:"Retrouvez le nom des objets : imprimante, ordinateur, souris.", ex_vi:"Tìm tên các đồ vật: máy in, máy tính, chuột." },
          { fr:"l'appli(cation) (f.)",       vi:"ứng dụng", ex_fr:"Cette application semble géniale, je vais la télécharger.", ex_vi:"Ứng dụng này có vẻ tuyệt, tôi sẽ tải về." },
          { fr:"se connecter",               vi:"kết nối mạng", ex_fr:"Internet marche mal, je n'arrive pas à me connecter.", ex_vi:"Mạng chập chờn, tôi không kết nối được." },
          { fr:"se désabonner",              vi:"hủy theo dõi, hủy đăng ký", ex_fr:"Je me suis désabonnée de tous les réseaux sociaux.", ex_vi:"Tôi đã hủy theo dõi tất cả mạng xã hội." },
          { fr:"en ligne",                   vi:"trực tuyến", ex_fr:"Il fait des achats en ligne.", ex_vi:"Anh ấy mua sắm trực tuyến." },
          { fr:"envoyer un courriel",        vi:"gửi email", ex_fr:"Ce n'est pas bon pour la planète d'envoyer des mails tout le temps.", ex_vi:"Gửi email liên tục không tốt cho hành tinh." },
          { fr:"faire une visio(conférence)", vi:"gọi video call", ex_fr:"On pourra s'appeler en visio.", ex_vi:"Chúng ta có thể gọi video call." },
          { fr:"le mail = l'e-mail = le courriel", vi:"thư điện tử", ex_fr:"Donnez-moi votre adresse mail.", ex_vi:"Cho tôi xin địa chỉ email của bạn." },
          { fr:"le réseau social",           vi:"mạng xã hội", ex_fr:"Je ne veux plus utiliser les réseaux sociaux.", ex_vi:"Tôi không muốn dùng mạng xã hội nữa." },
          { fr:"le site Internet",           vi:"trang web", ex_fr:"Je n'arrive pas à me connecter à ce site Internet.", ex_vi:"Tôi không vào được trang web này." },
          { fr:"télécharger un document, une vidéo", vi:"tải xuống tài liệu, video", ex_fr:"Il faut télécharger une vidéo tout le temps.", ex_vi:"Cứ phải tải video suốt." },
        ]
      },
    ]
  },
  {
    id: "b6", num: "6", title: "En cuisine",
    color: "#E8574A", bg: "#FFF0EF",
    groups: [
      {
        id: "b6g1", label: "Les légumes", icon: "🥕",
        words: [
          { fr:"l'aubergine (f.)", vi:"cà tím", ex_fr:"Dans mon couscous végétarien, je mets des aubergines.", ex_vi:"Trong couscous chay của tôi, tôi cho cà tím." },
          { fr:"l'avocat (m.)",    vi:"quả bơ", ex_fr:"Une salade tropicale, sans avocat si possible.", ex_vi:"Một đĩa salad nhiệt đới, nếu được thì không có bơ." },
          { fr:"la betterave",     vi:"củ dền", ex_fr:"Je cultive des betteraves et des radis noirs.", ex_vi:"Tôi trồng củ dền và củ cải đen." },
          { fr:"la carotte",       vi:"cà rốt", ex_fr:"Je mets des oignons, des navets et des carottes.", ex_vi:"Tôi cho hành, củ cải và cà rốt vào." },
          { fr:"le céleri",        vi:"cần tây", ex_fr:"Dans le couscous à la viande, je mets du céleri.", ex_vi:"Trong couscous thịt, tôi cho cần tây." },
          { fr:"la courge",        vi:"bí ngô, bí đao", ex_fr:"Je cultive des tomates, des courges, des haricots.", ex_vi:"Tôi trồng cà chua, bí và đậu." },
          { fr:"l'endive (f.)",    vi:"xà lách xoăn Bỉ (endive)", ex_fr:"Je plante des poireaux, des choux et des endives.", ex_vi:"Tôi trồng tỏi tây, bắp cải và endive." },
          { fr:"le navet",         vi:"củ cải trắng", ex_fr:"Dans le couscous à la viande, je mets des navets.", ex_vi:"Trong couscous thịt, tôi cho củ cải trắng." },
          { fr:"l'oignon (m.)",    vi:"củ hành", ex_fr:"J'arrête d'acheter des bottes d'oignons.", ex_vi:"Tôi thôi mua từng bó hành." },
          { fr:"le poireau",       vi:"tỏi tây", ex_fr:"Le très classique poireaux-vinaigrette.", ex_vi:"Món tỏi tây trộn giấm rất kinh điển." },
          { fr:"le radis",         vi:"củ cải", ex_fr:"Je plante des radis noirs de juillet à septembre.", ex_vi:"Tôi trồng củ cải đen từ tháng bảy đến tháng chín." },
        ]
      },
      {
        id: "b6g2", label: "Les céréales, légumes secs, fruits et protéines", icon: "🌾",
        words: [
          { fr:"la farine",         vi:"bột mì", ex_fr:"Mélangez le lait avec la crème et la farine.", ex_vi:"Trộn sữa với kem và bột mì." },
          { fr:"les lentilles (f.)", vi:"đậu lăng", ex_fr:"Je cuisine des légumes secs, des lentilles.", ex_vi:"Tôi nấu các loại đậu khô, như đậu lăng." },
          { fr:"les pois chiches (m.)", vi:"đậu gà", ex_fr:"Il y a de la semoule et des pois chiches.", ex_vi:"Có bột semoule và đậu gà." },
          { fr:"le riz",             vi:"gạo", ex_fr:"Je cuisine mes légumes avec des céréales, comme le riz.", ex_vi:"Tôi nấu rau cùng ngũ cốc, như gạo." },
          { fr:"la semoule",         vi:"bột semoule (bột báng thô)", ex_fr:"Dans ces trois couscous, il y a de la semoule.", ex_vi:"Trong cả ba loại couscous đều có bột semoule." },
          { fr:"l'amande (f.)",      vi:"hạnh nhân", ex_fr:"Je mets des aubergines et des amandes grillées.", ex_vi:"Tôi cho cà tím và hạnh nhân rang." },
          { fr:"la banane",          vi:"chuối", ex_fr:"Vous pouvez remplacer les fruits rouges par des bananes.", ex_vi:"Bạn có thể thay quả mọng đỏ bằng chuối." },
          { fr:"la framboise",       vi:"quả mâm xôi (đỏ)", ex_fr:"Une barquette de framboises pour le clafoutis.", ex_vi:"Một khay mâm xôi để làm clafoutis." },
          { fr:"la groseille",       vi:"quả lý gai đỏ", ex_fr:"Ajoutez des groseilles pour décorer.", ex_vi:"Thêm quả lý gai đỏ để trang trí." },
          { fr:"le kiwi",            vi:"quả kiwi", ex_fr:"Remplacez les fruits rouges par des kiwis.", ex_vi:"Thay quả mọng đỏ bằng kiwi." },
          { fr:"la mûre",            vi:"quả mâm xôi đen (mûre)", ex_fr:"Mettez les framboises et les mûres dans le plat.", ex_vi:"Cho mâm xôi đỏ và mâm xôi đen vào khuôn." },
          { fr:"la myrtille",        vi:"quả việt quất", ex_fr:"Une barquette de myrtilles pour le clafoutis.", ex_vi:"Một khay việt quất cho món clafoutis." },
          { fr:"la poire",           vi:"quả lê", ex_fr:"Vous pouvez remplacer les fruits rouges par des poires.", ex_vi:"Bạn có thể thay quả mọng đỏ bằng lê." },
          { fr:"la prune",           vi:"quả mận", ex_fr:"Vous pouvez remplacer les fruits rouges par des prunes.", ex_vi:"Bạn có thể thay quả mọng đỏ bằng mận." },
          { fr:"les raisins secs (m.)", vi:"nho khô", ex_fr:"J'en mets dans tous mes couscous, ça donne un goût sucré.", ex_vi:"Tôi cho nho khô vào mọi loại couscous, tạo vị ngọt nhẹ." },
          { fr:"le bœuf",            vi:"thịt bò", ex_fr:"Un couscous à la viande, avec du poulet, du bœuf ou du mouton.", ex_vi:"Couscous thịt, với gà, bò hoặc cừu." },
          { fr:"le mouton",          vi:"thịt cừu", ex_fr:"Je fais aussi un couscous de poisson.", ex_vi:"Tôi cũng làm couscous cá." },
          { fr:"le poulet",          vi:"thịt gà", ex_fr:"J'ai un couscous à la viande, avec du poulet.", ex_vi:"Tôi có couscous thịt, với gà." },
          { fr:"le colin",           vi:"cá tuyết colin", ex_fr:"Je fais un couscous de poisson, avec du saumon ou du colin.", ex_vi:"Tôi làm couscous cá, với cá hồi hoặc cá colin." },
          { fr:"les crevettes (f.)", vi:"tôm", ex_fr:"Dans le couscous de poisson, il y a des crevettes.", ex_vi:"Trong couscous cá có tôm." },
          { fr:"le saumon",          vi:"cá hồi", ex_fr:"Je conseille d'acheter du saumon.", ex_vi:"Tôi khuyên nên mua cá hồi." },
        ]
      },
      {
        id: "b6g3", label: "Les épices, les quantités et les gestes de cuisine", icon: "🧂",
        words: [
          { fr:"la cannelle",   vi:"quế", ex_fr:"Toujours une pincée de cannelle, de noix de muscade ou de gingembre.", ex_vi:"Luôn một nhúm quế, hạt nhục đậu khấu hoặc gừng." },
          { fr:"la coriandre",  vi:"rau mùi (ngò)", ex_fr:"J'utilise beaucoup de cumin, mais aussi de la coriandre.", ex_vi:"Tôi dùng nhiều thìa là Ai Cập, và cả rau mùi." },
          { fr:"le cumin",      vi:"thìa là Ai Cập (cumin)", ex_fr:"J'utilise beaucoup de cumin dans mon couscous.", ex_vi:"Tôi dùng nhiều cumin trong món couscous." },
          { fr:"le curcuma",    vi:"nghệ", ex_fr:"Un chou-fleur rôti avec du curcuma frais.", ex_vi:"Súp lơ nướng với nghệ tươi." },
          { fr:"le gingembre",  vi:"gừng", ex_fr:"Une pincée de gingembre donne un bon goût.", ex_vi:"Một nhúm gừng tạo vị rất ngon." },
          { fr:"la menthe",     vi:"bạc hà", ex_fr:"Ajoutez des feuilles de menthe pour décorer.", ex_vi:"Thêm lá bạc hà để trang trí." },
          { fr:"la muscade",    vi:"nhục đậu khấu", ex_fr:"J'utilise une pincée de noix de muscade.", ex_vi:"Tôi dùng một nhúm nhục đậu khấu." },
          { fr:"le safran",     vi:"nghệ tây (saffron)", ex_fr:"J'utilise du safran et de la coriandre.", ex_vi:"Tôi dùng nghệ tây và rau mùi." },
          { fr:"une barquette de framboises", vi:"một khay mâm xôi", ex_fr:"Une barquette de framboises (150 g).", ex_vi:"Một khay mâm xôi (150g)." },
          { fr:"une botte d'oignons",  vi:"một bó hành", ex_fr:"Je continue d'acheter les bottes d'oignons.", ex_vi:"Tôi vẫn mua các bó hành." },
          { fr:"une boule de glace",   vi:"một viên kem", ex_fr:"Servez tiède avec une boule de glace à la vanille.", ex_vi:"Dùng nóng với một viên kem vani." },
          { fr:"un bouquet de menthe", vi:"một bó bạc hà", ex_fr:"Des groseilles ou un bouquet de menthe.", ex_vi:"Quả lý gai đỏ hoặc một bó bạc hà." },
          { fr:"une feuille de menthe", vi:"một lá bạc hà", ex_fr:"Ajoutez des feuilles de menthe ou des groseilles.", ex_vi:"Thêm lá bạc hà hoặc quả lý gai đỏ." },
          { fr:"une pincée de sel",    vi:"một nhúm muối", ex_fr:"Mélangez avec une pincée de sel.", ex_vi:"Trộn cùng một nhúm muối." },
          { fr:"une tablette de chocolat", vi:"một thanh sô-cô-la", ex_fr:"Achetez une tablette de chocolat noir.", ex_vi:"Mua một thanh sô-cô-la đen." },
          { fr:"ajouter",       vi:"thêm vào", ex_fr:"Ajoutez des feuilles de menthe pour décorer.", ex_vi:"Thêm lá bạc hà để trang trí." },
          { fr:"couper (en morceaux)", vi:"cắt (thành miếng)", ex_fr:"Coupez le beurre en petits morceaux.", ex_vi:"Cắt bơ thành từng miếng nhỏ." },
          { fr:"(faire) cuire",  vi:"nấu chín", ex_fr:"Faites-le cuire pendant 35-40 minutes.", ex_vi:"Nấu trong 35-40 phút." },
          { fr:"laver",          vi:"rửa", ex_fr:"Lavez et séchez les fruits rouges.", ex_vi:"Rửa và lau khô quả mọng đỏ." },
          { fr:"mélanger",       vi:"trộn", ex_fr:"Mélangez le lait avec la crème liquide.", ex_vi:"Trộn sữa với kem lỏng." },
          { fr:"mettre au four = enfourner", vi:"cho vào lò", ex_fr:"Enfournez le clafoutis et faites-le cuire.", ex_vi:"Cho clafoutis vào lò và nướng." },
          { fr:"préchauffer le four", vi:"làm nóng lò trước", ex_fr:"Préchauffez le four à 200°C.", ex_vi:"Làm nóng lò trước ở 200°C." },
          { fr:"préparer",       vi:"chuẩn bị", ex_fr:"Préparez-vous des infusions de thym.", ex_vi:"Chuẩn bị trà xông lá thyme cho mình." },
          { fr:"(laisser) refroidir", vi:"để nguội", ex_fr:"Laissez refroidir avant de servir.", ex_vi:"Để nguội trước khi dùng." },
          { fr:"servir",         vi:"phục vụ, dọn ra", ex_fr:"Servez tiède avec une boule de glace.", ex_vi:"Dọn ra khi còn ấm cùng một viên kem." },
          { fr:"sortir du four",  vi:"lấy ra khỏi lò", ex_fr:"Sortez le gâteau du four quand le dessus est doré.", ex_vi:"Lấy bánh ra khỏi lò khi mặt bánh vàng đều." },
          { fr:"verser",          vi:"đổ, rót", ex_fr:"Versez la pâte sur les fruits.", ex_vi:"Đổ bột nhão lên trên quả." },
        ]
      },
      {
        id: "b6g4", label: "Les lieux et le service", icon: "🍽️",
        words: [
          { fr:"le bistrot = la brasserie", vi:"quán ăn nhỏ kiểu Pháp (bistrot)", ex_fr:"On boit un verre, on grignote et on mange des plats traditionnels.", ex_vi:"Người ta uống một ly, nhấm nháp và ăn các món truyền thống." },
          { fr:"le fast-food",     vi:"đồ ăn nhanh", ex_fr:"C'est hyper gras et fade, les plats n'ont pas de goût.", ex_vi:"Rất nhiều dầu mỡ và nhạt nhẽo, món ăn chẳng có vị gì." },
          { fr:"le restaurant étoilé/gastronomique", vi:"nhà hàng có sao / cao cấp", ex_fr:"Un restaurant a reçu deux étoiles au Michelin.", ex_vi:"Một nhà hàng đã nhận hai sao Michelin." },
          { fr:"le restaurant végan", vi:"nhà hàng thuần chay", ex_fr:"Pour la première fois, un restaurant végan a reçu une étoile.", ex_vi:"Lần đầu tiên, một nhà hàng thuần chay được trao sao." },
          { fr:"le restaurant végétarien", vi:"nhà hàng chay", ex_fr:"95 % de ses clients ne sont pas végétariens.", ex_vi:"95% khách hàng của quán không phải người ăn chay." },
          { fr:"le traiteur",      vi:"dịch vụ nấu ăn/cỗ mang đi", ex_fr:"On commande un plat chez le traiteur alors ?", ex_vi:"Vậy đặt món chỗ dịch vụ nấu ăn nhé?" },
          { fr:"à emporter ≠ sur place", vi:"mang đi ≠ ăn tại chỗ", ex_fr:"Quel couscous proposez-vous à la vente à emporter ?", ex_vi:"Bạn bán mang đi loại couscous nào?" },
          { fr:"l'ambiance (f.)",  vi:"không khí, bầu không khí", ex_fr:"Il y a une très bonne ambiance, c'est génial !", ex_vi:"Không khí rất tốt, tuyệt lắm!" },
          { fr:"commander des plats", vi:"gọi món", ex_fr:"Locmiam permet de commander des plats faits maison.", ex_vi:"Locmiam cho phép đặt các món tự nấu tại nhà." },
          { fr:"fait maison",      vi:"tự làm tại nhà", ex_fr:"Vous avez l'obligation de préparer uniquement des plats faits maison.", ex_vi:"Bạn bắt buộc chỉ được chuẩn bị món tự nấu tại nhà." },
          { fr:"la nappe",         vi:"khăn trải bàn", ex_fr:"Des nappes à carreaux rouges et blancs.", ex_vi:"Khăn trải bàn caro đỏ trắng." },
          { fr:"le pourboire",     vi:"tiền boa/tip", ex_fr:"Tu laisses toujours un pourboire, je comprends pas pourquoi.", ex_vi:"Bạn lúc nào cũng để lại tiền boa, tôi không hiểu tại sao." },
          { fr:"les produits frais/de qualité", vi:"nguyên liệu tươi/chất lượng", ex_fr:"Il est indispensable de cuisiner des produits frais et de qualité.", ex_vi:"Việc nấu ăn từ nguyên liệu tươi, chất lượng là không thể thiếu." },
          { fr:"le serveur, la serveuse", vi:"nhân viên phục vụ (nam/nữ)", ex_fr:"Vous avez choisi ? demande le serveur.", ex_vi:"Anh chị đã chọn món chưa? — nhân viên hỏi." },
          { fr:"le service",       vi:"dịch vụ phục vụ", ex_fr:"Le service est trop lent dans ce restaurant.", ex_vi:"Dịch vụ phục vụ ở nhà hàng này quá chậm." },
          { fr:"le tablier",       vi:"tạp dề", ex_fr:"Portez un tablier propre quand vous cuisinez.", ex_vi:"Mặc tạp dề sạch khi nấu ăn." },
        ]
      },
      {
        id: "b6g5", label: "Les plats, les goûts et les personnes", icon: "🍲",
        words: [
          { fr:"le bœuf bourguignon", vi:"món bò hầm vang đỏ (bourguignon)", ex_fr:"Le bœuf bourguignon est un plat traditionnel des bistrots.", ex_vi:"Bò hầm bourguignon là món truyền thống của các bistrot." },
          { fr:"le bouillon",         vi:"nước dùng", ex_fr:"Un bouillon citronnelle et safran.", ex_vi:"Một loại nước dùng sả và nghệ tây." },
          { fr:"la choucroute",       vi:"món bắp cải muối chua kiểu Alsace", ex_fr:"Il y a des saucisses en Alsace et de la choucroute.", ex_vi:"Ở Alsace có xúc xích và món bắp cải muối chua." },
          { fr:"le clafoutis",        vi:"bánh clafoutis (bánh flan nhân quả)", ex_fr:"Clafoutis aux fruits rouges, pour 4 personnes.", ex_vi:"Clafoutis nhân quả mọng đỏ, cho 4 người." },
          { fr:"le confit",           vi:"món confit (thịt/nguyên liệu om chậm trong mỡ)", ex_fr:"Il y a du confit de canard dans le Sud.", ex_vi:"Ở miền Nam có món vịt confit." },
          { fr:"le couscous",         vi:"couscous (món semoule hấp Bắc Phi)", ex_fr:"Il existe beaucoup de recettes de couscous.", ex_vi:"Có rất nhiều công thức làm couscous." },
          { fr:"les crêpes (f.)",     vi:"bánh crêpe", ex_fr:"Il y a des crêpes en Bretagne.", ex_vi:"Ở Bretagne có món bánh crêpe." },
          { fr:"le flan",             vi:"bánh flan", ex_fr:"Le flan était amer, non, il était acide.", ex_vi:"Bánh flan bị đắng à, không, nó bị chua." },
          { fr:"le fondant au chocolat", vi:"bánh sô-cô-la tan chảy (fondant)", ex_fr:"T'as mangé tout le fondant au chocolat.", ex_vi:"Bạn ăn hết cả bánh fondant sô-cô-la rồi." },
          { fr:"le gratin",           vi:"món gratin (nướng phô mai)", ex_fr:"Le gratin était congelé, la ratatouille était brûlée.", ex_vi:"Món gratin bị đông lạnh, ratatouille thì bị cháy." },
          { fr:"le pâté",             vi:"pa-tê", ex_fr:"On y retrouve souvent le pâté et les petites salades.", ex_vi:"Ở đó thường có pa-tê và các đĩa salad nhỏ." },
          { fr:"les poireaux-vinaigrette", vi:"tỏi tây trộn giấm", ex_fr:"Le très classique poireaux-vinaigrette.", ex_vi:"Món tỏi tây trộn giấm rất kinh điển." },
          { fr:"le pot-au-feu",       vi:"món pot-au-feu (thịt bò hầm rau củ)", ex_fr:"Le poulet rôti, le bœuf bourguignon, le pot-au-feu.", ex_vi:"Gà quay, bò hầm bourguignon, pot-au-feu." },
          { fr:"la purée",            vi:"khoai tây nghiền", ex_fr:"Le poulet rôti avec ses frites ou sa purée.", ex_vi:"Gà quay ăn kèm khoai tây chiên hoặc nghiền." },
          { fr:"la ratatouille",      vi:"món ratatouille (rau củ om kiểu Provence)", ex_fr:"La ratatouille était brûlée lundi dernier.", ex_vi:"Món ratatouille bị cháy hôm thứ Hai vừa rồi." },
          { fr:"les saucisses (f.)",  vi:"xúc xích", ex_fr:"Il y a des saucisses en Alsace.", ex_vi:"Ở Alsace có món xúc xích." },
          { fr:"le tartare (de bœuf, d'algues, etc.)", vi:"món tartare (thịt/nguyên liệu sống băm nhuyễn)", ex_fr:"Un tartare d'algues au citron caviar.", ex_vi:"Một món tartare rong biển với chanh caviar." },
          { fr:"la tartiflette",      vi:"món tartiflette (khoai tây, phô mai, thịt xông khói)", ex_fr:"Il y a des tartiflettes à la montagne.", ex_vi:"Trên núi có món tartiflette." },
          { fr:"à point",             vi:"chín vừa (thịt)", ex_fr:"Parce que tu l'as demandé à point.", ex_vi:"Vì bạn đã gọi món chín vừa." },
          { fr:"bien cuit(e)",        vi:"chín kỹ", ex_fr:"Mon steak saignant est arrivé trop cuit.", ex_vi:"Bít tết tái của tôi lại được mang ra chín quá." },
          { fr:"saignant(e)",         vi:"tái (thịt)", ex_fr:"J'ai bien dit « saignant ».", ex_vi:"Tôi đã nói rõ là 'tái' mà." },
          { fr:"acide",               vi:"chua", ex_fr:"Il n'était pas amer, il était acide.", ex_vi:"Nó không đắng đâu, nó chua." },
          { fr:"amer, amère",         vi:"đắng", ex_fr:"Le flan était amer.", ex_vi:"Bánh flan bị đắng." },
          { fr:"épicé(e) = pimenté(e)", vi:"cay, nhiều gia vị", ex_fr:"Ce n'est pas pimenté, c'est très doux.", ex_vi:"Món này không cay, rất dịu." },
          { fr:"fade",                vi:"nhạt (không vị)", ex_fr:"C'est fade, les plats n'ont pas de goût.", ex_vi:"Nhạt lắm, món ăn chẳng có vị gì." },
          { fr:"goûteux, goûteuse",   vi:"đậm vị, ngon miệng", ex_fr:"Des plats simples mais goûteux.", ex_vi:"Những món đơn giản nhưng đậm vị." },
          { fr:"gras, grasse",        vi:"nhiều dầu mỡ", ex_fr:"C'est hyper gras, ce fast-food.", ex_vi:"Quán đồ ăn nhanh này nhiều dầu mỡ lắm." },
          { fr:"salé(e)",             vi:"mặn", ex_fr:"Est-ce que vous cuisinez des plats sucrés ou salés ?", ex_vi:"Bạn nấu món ngọt hay món mặn?" },
          { fr:"sucré(e)",            vi:"ngọt", ex_fr:"Ça donne un petit goût sucré.", ex_vi:"Nó tạo ra một vị ngọt nhẹ." },
          { fr:"déguster",            vi:"thưởng thức", ex_fr:"Je vous invite à déguster vos délicieux couscous.", ex_vi:"Mời các bạn thưởng thức món couscous ngon tuyệt của bạn." },
          { fr:"goûter",              vi:"nếm thử", ex_fr:"Je l'ai juste goûté, pour voir.", ex_vi:"Tôi chỉ nếm thử thôi, để xem sao." },
          { fr:"grignoter",           vi:"nhấm nháp, ăn vặt", ex_fr:"On boit un verre, on grignote.", ex_vi:"Người ta uống một ly, nhấm nháp chút gì đó." },
          { fr:"se régaler",          vi:"ăn ngon miệng, thích thú", ex_fr:"J'ai très bien mangé, je me suis régalé.", ex_vi:"Tôi đã ăn rất ngon, thích lắm." },
          { fr:"allergique (à…)",     vi:"dị ứng (với…)", ex_fr:"Je suis allergique aux champignons.", ex_vi:"Tôi bị dị ứng với nấm." },
          { fr:"difficile",           vi:"khó tính, kén ăn", ex_fr:"Toi de toute façon t'aimes rien, t'es difficile.", ex_vi:"Đằng nào bạn cũng chẳng thích gì, kén ăn thật đấy." },
          { fr:"gourmand(e)",         vi:"phàm ăn, thích ăn ngon", ex_fr:"T'es gourmand surtout, t'as mangé tout le fondant.", ex_vi:"Bạn phàm ăn thì có, ăn hết cả bánh fondant rồi." },
          { fr:"gourmet",             vi:"người sành ăn", ex_fr:"Je ne suis pas difficile, je suis un gourmet.", ex_vi:"Tôi không kén ăn, tôi là người sành ăn." },
          { fr:"végan(e)",            vi:"người ăn thuần chay", ex_fr:"Une cheffe qui a créé un restaurant végan.", ex_vi:"Một nữ đầu bếp đã tạo ra một nhà hàng thuần chay." },
          { fr:"végétarien(ne)",      vi:"người ăn chay", ex_fr:"Pour les végétariens, j'en prépare un avec des œufs.", ex_vi:"Cho người ăn chay, tôi làm một loại với trứng." },
        ]
      },
    ]
  },
  {
    id: "b7", num: "7", title: "À votre santé !",
    color: "#0891B2", bg: "#E0F2FE",
    groups: [
      {
        id: "b7g1", label: "Les parties du corps", icon: "🦵",
        words: [
          { fr:"le bras",              vi:"cánh tay", ex_fr:"Placez un oreiller sous votre bras pour le surélever.", ex_vi:"Đặt một chiếc gối dưới cánh tay để nâng nó lên." },
          { fr:"le cerveau",           vi:"não", ex_fr:"Le cerveau est réceptif mais ne comprend plus.", ex_vi:"Não vẫn tiếp nhận nhưng không còn hiểu nữa." },
          { fr:"la cheville",          vi:"mắt cá chân", ex_fr:"Vos chevilles seront plus reposées : l'oreiller leur évite des tensions inutiles.", ex_vi:"Mắt cá chân bạn sẽ được nghỉ ngơi hơn: chiếc gối giúp chúng tránh những căng thẳng không cần thiết." },
          { fr:"la colonne vertébrale", vi:"cột sống", ex_fr:"Pour éviter de tordre votre colonne vertébrale, mettez un oreiller sous vos genoux.", ex_vi:"Để tránh vặn cột sống, hãy đặt một chiếc gối dưới đầu gối." },
          { fr:"le cou",               vi:"cổ", ex_fr:"Placez votre tête au milieu de l'oreiller, le cou sera bien calé.", ex_vi:"Đặt đầu ở giữa gối, cổ sẽ được kê vững vàng." },
          { fr:"la cuisse",            vi:"đùi", ex_fr:"Placez des oreillers sous votre corps : ventre, cuisses, genoux et pieds.", ex_vi:"Đặt gối dưới cơ thể: bụng, đùi, đầu gối và bàn chân." },
          { fr:"le dos",               vi:"lưng", ex_fr:"Si vous avez mal au dos, il est conseillé de dormir sur le côté.", ex_vi:"Nếu bạn đau lưng, nên nằm nghiêng khi ngủ." },
          { fr:"l'épaule (f.)",        vi:"vai", ex_fr:"Cet oreiller doit toucher votre épaule.", ex_vi:"Chiếc gối này phải chạm vào vai bạn." },
          { fr:"le genou",             vi:"đầu gối", ex_fr:"Mettez un oreiller sous vos genoux.", ex_vi:"Đặt một chiếc gối dưới đầu gối." },
          { fr:"la jambe",             vi:"chân (cả cẳng chân)", ex_fr:"Je vous recommande de placer un oreiller entre vos jambes.", ex_vi:"Tôi khuyên bạn nên đặt một chiếc gối giữa hai chân." },
          { fr:"le pied",              vi:"bàn chân", ex_fr:"Placez des oreillers sous votre corps : ventre, cuisses, genoux et pieds.", ex_vi:"Đặt gối dưới cơ thể: bụng, đùi, đầu gối và bàn chân." },
          { fr:"la tête",              vi:"đầu", ex_fr:"Il faut poser sa tête au milieu de l'oreiller.", ex_vi:"Phải đặt đầu ở giữa chiếc gối." },
          { fr:"le ventre",            vi:"bụng", ex_fr:"Je vous déconseille de dormir sur le ventre.", ex_vi:"Tôi khuyên bạn không nên ngủ sấp bụng." },
        ]
      },
      {
        id: "b7g2", label: "La douleur et se sentir bien", icon: "😌",
        words: [
          { fr:"avoir mal",            vi:"bị đau", ex_fr:"Mes jambes me font beaucoup mal.", ex_vi:"Chân tôi đau lắm." },
          { fr:"la courbature",        vi:"cơn đau nhức cơ (do vận động)", ex_fr:"Changez de position régulièrement pendant la nuit pour éviter les courbatures.", ex_vi:"Thay đổi tư thế thường xuyên trong đêm để tránh đau nhức cơ." },
          { fr:"souffrir",             vi:"đau đớn, chịu đựng", ex_fr:"Ce matelas est vieux, elle va souffrir du dos.", ex_vi:"Tấm nệm này cũ rồi, cô ấy sẽ bị đau lưng." },
          { fr:"soulager",             vi:"làm dịu, giảm đau", ex_fr:"Ces tisanes permettent de soulager mes douleurs.", ex_vi:"Những loại trà thảo mộc này giúp làm dịu cơn đau của tôi." },
          { fr:"la tension",           vi:"sự căng cơ, căng thẳng", ex_fr:"Vous êtes stressé, vous allez avoir des tensions musculaires.", ex_vi:"Bạn đang căng thẳng, bạn sẽ bị căng cơ." },
          { fr:"adopter de bonnes habitudes", vi:"tạo thói quen tốt", ex_fr:"Il est important d'adopter de bonnes habitudes pour bien dormir.", ex_vi:"Việc tạo thói quen tốt để ngủ ngon là rất quan trọng." },
          { fr:"apaisé(e)",            vi:"được xoa dịu, bình tâm", ex_fr:"Reposé et apaisé, Victor reprend sa journée en toute sérénité.", ex_vi:"Được nghỉ ngơi và xoa dịu, Victor tiếp tục ngày làm việc trong sự thanh thản." },
          { fr:"être en pleine forme", vi:"khỏe khoắn, sung sức", ex_fr:"Vous n'êtes pas en pleine forme au réveil ?", ex_vi:"Bạn không thấy khỏe khoắn khi thức dậy à?" },
          { fr:"masser",               vi:"mát-xa", ex_fr:"Une sieste dans un fauteuil apesanteur massant.", ex_vi:"Một giấc ngủ trưa trong chiếc ghế bồng bềnh có chức năng mát-xa." },
          { fr:"récupérer = se remettre", vi:"hồi phục", ex_fr:"Le corps se remet de la fatigue physique de la journée.", ex_vi:"Cơ thể hồi phục khỏi sự mệt mỏi thể chất trong ngày." },
          { fr:"relâcher ses muscles", vi:"thả lỏng cơ bắp", ex_fr:"Vous relâchez ainsi les tensions dans le haut du corps.", ex_vi:"Nhờ vậy bạn thả lỏng được sự căng thẳng ở phần trên cơ thể." },
          { fr:"relaxé(e)",            vi:"thư giãn", ex_fr:"Le bar à sieste propose des soins relaxants.", ex_vi:"Quán bar ngủ trưa cung cấp các liệu pháp thư giãn." },
          { fr:"reposé(e)",            vi:"được nghỉ ngơi", ex_fr:"Reposé et apaisé, Victor reprend sa journée en toute sérénité.", ex_vi:"Được nghỉ ngơi và xoa dịu, Victor tiếp tục ngày làm việc." },
          { fr:"se sentir léger, légère", vi:"cảm thấy nhẹ nhõm", ex_fr:"Il se sent léger et fait le vide dans sa tête.", ex_vi:"Anh ấy cảm thấy nhẹ nhõm và đầu óc trống rỗng." },
          { fr:"la sérénité",          vi:"sự thanh thản", ex_fr:"Victor reprend sa journée en toute sérénité.", ex_vi:"Victor tiếp tục ngày làm việc trong sự thanh thản." },
        ]
      },
      {
        id: "b7g3", label: "Le sommeil et les mouvements", icon: "😴",
        words: [
          { fr:"le bâillement",        vi:"cái ngáp", ex_fr:"À l'endormissement : bâillements, engourdissement.", ex_vi:"Ở giai đoạn buồn ngủ: ngáp, tê bì." },
          { fr:"la fatigue (physique)", vi:"sự mệt mỏi (thể chất)", ex_fr:"Le corps se remet de la fatigue physique de la journée.", ex_vi:"Cơ thể hồi phục khỏi sự mệt mỏi thể chất trong ngày." },
          { fr:"manquer de sommeil",   vi:"thiếu ngủ", ex_fr:"Pendant la semaine, il manque de sommeil.", ex_vi:"Trong tuần, anh ấy bị thiếu ngủ." },
          { fr:"le repos",             vi:"sự nghỉ ngơi", ex_fr:"La qualité de votre repos dépend en partie de votre manière de dormir.", ex_vi:"Chất lượng giấc nghỉ của bạn phụ thuộc một phần vào cách bạn ngủ." },
          { fr:"la respiration",       vi:"nhịp thở", ex_fr:"Respiration et rythme cardiaque plus lents.", ex_vi:"Nhịp thở và nhịp tim chậm hơn." },
          { fr:"le rêve",              vi:"giấc mơ", ex_fr:"Déclenchement des rêves pendant le sommeil paradoxal.", ex_vi:"Giấc mơ xuất hiện trong giai đoạn ngủ nghịch lý (REM)." },
          { fr:"le réveil",            vi:"lúc thức dậy", ex_fr:"Au réveil, restez allongé(e) quelques minutes et étirez-vous.", ex_vi:"Khi thức dậy, hãy nằm yên vài phút rồi vươn vai." },
          { fr:"le rythme cardiaque",  vi:"nhịp tim", ex_fr:"Respiration et rythme cardiaque irréguliers pendant le sommeil paradoxal.", ex_vi:"Nhịp thở và nhịp tim không đều trong giai đoạn ngủ nghịch lý." },
          { fr:"s'endormir",           vi:"chìm vào giấc ngủ", ex_fr:"Cette plante est antiseptique et aide à s'endormir.", ex_vi:"Loại cây này có tính sát khuẩn và giúp dễ ngủ." },
          { fr:"se réveiller",         vi:"thức dậy", ex_fr:"Quand ce cycle prend fin, on peut se réveiller.", ex_vi:"Khi chu kỳ này kết thúc, người ta có thể thức dậy." },
          { fr:"la sieste",            vi:"giấc ngủ trưa", ex_fr:"C'est un petit moment de repos au cours de la journée : la sieste.", ex_vi:"Đó là một khoảng nghỉ ngắn trong ngày: giấc ngủ trưa." },
          { fr:"allongé(e)",           vi:"nằm dài", ex_fr:"Au réveil, restez allongé(e) quelques minutes.", ex_vi:"Khi thức dậy, hãy nằm yên vài phút." },
          { fr:"assis(e)",             vi:"ngồi", ex_fr:"Mettez-vous en position assise et attendez encore un instant.", ex_vi:"Ngồi dậy và chờ thêm một chút." },
          { fr:"debout",               vi:"đứng", ex_fr:"Levez-vous doucement pour ne pas avoir de vertiges quand vous êtes debout.", ex_vi:"Đứng dậy từ từ để không bị chóng mặt khi đứng." },
          { fr:"s'étirer",             vi:"vươn vai, duỗi người", ex_fr:"Au réveil, restez allongé(e) quelques minutes et étirez-vous.", ex_vi:"Khi thức dậy, hãy nằm yên vài phút rồi vươn vai." },
          { fr:"se lever",             vi:"đứng dậy, ra khỏi giường", ex_fr:"Levez-vous doucement pour ne pas avoir de vertiges.", ex_vi:"Đứng dậy từ từ để không bị chóng mặt." },
        ]
      },
      {
        id: "b7g4", label: "Les maux et se soigner", icon: "🤒",
        words: [
          { fr:"l'allergie (f.)",      vi:"dị ứng", ex_fr:"L'échinacée soulage entre autres les allergies ou encore l'asthme.", ex_vi:"Cây echinacea giúp làm dịu chứng dị ứng và cả hen suyễn." },
          { fr:"l'anxiété (f.)",       vi:"sự lo âu", ex_fr:"Le millepertuis est un excellent remède contre les insomnies et l'anxiété.", ex_vi:"Cây ban Âu là phương thuốc tuyệt vời chống mất ngủ và lo âu." },
          { fr:"l'asthme (m.)",       vi:"hen suyễn", ex_fr:"De plus en plus d'enfants souffrent d'asthme.", ex_vi:"Ngày càng nhiều trẻ em mắc bệnh hen suyễn." },
          { fr:"la fièvre",            vi:"sốt", ex_fr:"L'eucalyptus est particulièrement efficace contre la fièvre.", ex_vi:"Bạch đàn đặc biệt hiệu quả chống sốt." },
          { fr:"l'indigestion (f.)",   vi:"chứng khó tiêu", ex_fr:"La lavande soigne également les indigestions.", ex_vi:"Oải hương cũng chữa được chứng khó tiêu." },
          { fr:"l'infection (f.)",     vi:"nhiễm trùng", ex_fr:"L'eucalyptus est la plus efficace des plantes contre les rhumes et les infections.", ex_vi:"Bạch đàn là loại cây hiệu quả nhất chống cảm và nhiễm trùng." },
          { fr:"l'insomnie (f.)",      vi:"chứng mất ngủ", ex_fr:"Le millepertuis est un excellent remède contre les insomnies.", ex_vi:"Cây ban Âu là phương thuốc tuyệt vời chống mất ngủ." },
          { fr:"le mal de gorge",      vi:"đau họng", ex_fr:"Vous avez mal à la gorge aussi ?", ex_vi:"Bạn cũng bị đau họng à?" },
          { fr:"la migraine",          vi:"chứng đau nửa đầu", ex_fr:"C'est le romarin qui soulage le mieux les migraines.", ex_vi:"Chính hương thảo là loại giúp giảm chứng đau nửa đầu tốt nhất." },
          { fr:"le nez bouché",        vi:"nghẹt mũi", ex_fr:"Je me sens fatigué, j'ai le nez bouché, j'ai mal à la tête.", ex_vi:"Tôi thấy mệt, nghẹt mũi, đau đầu." },
          { fr:"le rhume",             vi:"cảm lạnh", ex_fr:"Le thym est le plus souvent utilisé pour les maux de gorge, la toux et le rhume.", ex_vi:"Cỏ xạ hương thường được dùng cho đau họng, ho và cảm lạnh." },
          { fr:"le stress",            vi:"căng thẳng", ex_fr:"Il donne de l'énergie en cas de stress ou d'anxiété.", ex_vi:"Nó tiếp thêm năng lượng khi bị căng thẳng hoặc lo âu." },
          { fr:"la toux",              vi:"ho", ex_fr:"Je vous propose un sirop pour la toux.", ex_vi:"Tôi đề nghị bạn dùng si-rô trị ho." },
          { fr:"l'antibiotique (m.)",  vi:"kháng sinh", ex_fr:"Les Français consomment beaucoup d'antibiotiques.", ex_vi:"Người Pháp tiêu thụ rất nhiều kháng sinh." },
          { fr:"l'antiseptique (m.)",  vi:"chất sát khuẩn", ex_fr:"Cette plante est antiseptique et aide à s'endormir.", ex_vi:"Loại cây này có tính sát khuẩn và giúp dễ ngủ." },
          { fr:"calmer (une douleur)", vi:"làm dịu (cơn đau)", ex_fr:"En cas de migraine, faites la sieste dans le noir, ça va calmer la douleur.", ex_vi:"Nếu bị đau nửa đầu, hãy ngủ trưa trong bóng tối, điều đó sẽ làm dịu cơn đau." },
          { fr:"consulter un/une médecin", vi:"đi khám bác sĩ", ex_fr:"Vous avez consulté votre médecin ?", ex_vi:"Bạn đã đi khám bác sĩ chưa?" },
          { fr:"les gouttes (f.)",     vi:"thuốc nhỏ (mũi, mắt)", ex_fr:"Je vous propose des gouttes pour le nez à l'eucalyptus.", ex_vi:"Tôi đề nghị bạn dùng thuốc nhỏ mũi tinh dầu bạch đàn." },
          { fr:"le remède",            vi:"phương thuốc", ex_fr:"Le thym est une plante aromatique et un formidable remède.", ex_vi:"Cỏ xạ hương là loại cây thơm và là một phương thuốc tuyệt vời." },
          { fr:"le sirop",             vi:"si-rô", ex_fr:"Je vous propose un sirop pour la toux.", ex_vi:"Tôi đề nghị bạn dùng si-rô trị ho." },
          { fr:"le traitement",        vi:"liệu trình điều trị", ex_fr:"Le médecin m'a donné un traitement pour me soulager.", ex_vi:"Bác sĩ đã cho tôi một liệu trình điều trị để giảm đau." },
        ]
      },
      {
        id: "b7g5", label: "Les urgences et expressions", icon: "🚑",
        words: [
          { fr:"donner du tonus",      vi:"tiếp thêm sinh lực", ex_fr:"Prenez ces vitamines, elles vont vous donner du tonus.", ex_vi:"Hãy uống những viên vitamin này, chúng sẽ tiếp thêm sinh lực cho bạn." },
          { fr:"être patraque",        vi:"cảm thấy không khỏe (thân mật)", ex_fr:"Je suis un peu patraque en ce moment.", ex_vi:"Dạo này tôi thấy hơi không khỏe." },
          { fr:"faire le plus grand bien", vi:"rất tốt cho sức khỏe", ex_fr:"Préparez-vous des infusions de thym avec du miel, ça vous fera le plus grand bien.", ex_vi:"Hãy pha trà xạ hương với mật ong, điều đó sẽ rất tốt cho bạn." },
          { fr:"l'accident (m.)",      vi:"tai nạn", ex_fr:"Il y a eu un accident de la circulation devant chez moi.", ex_vi:"Đã có một vụ tai nạn giao thông trước nhà tôi." },
          { fr:"l'ambulance (f.)",     vi:"xe cứu thương", ex_fr:"Une ambulance est arrivée rapidement pour les transporter aux urgences.", ex_vi:"Một xe cứu thương đã đến nhanh chóng để đưa họ đến cấp cứu." },
          { fr:"l'ambulancier, l'ambulancière", vi:"nhân viên xe cứu thương", ex_fr:"Les ambulanciers doivent être diplômés pour exercer leur métier.", ex_vi:"Nhân viên xe cứu thương phải có bằng cấp để hành nghề." },
          { fr:"l'appel (m.)",         vi:"cuộc gọi", ex_fr:"J'ai tout de suite appelé le 112, le numéro d'urgence.", ex_vi:"Tôi đã gọi ngay số 112, số khẩn cấp." },
          { fr:"le/la blessé(e)",      vi:"người bị thương", ex_fr:"Il y avait plusieurs blessés mais cela ne semblait pas très grave.", ex_vi:"Có nhiều người bị thương nhưng có vẻ không nghiêm trọng lắm." },
          { fr:"le numéro d'urgence",  vi:"số điện thoại khẩn cấp", ex_fr:"J'ai tout de suite appelé le 112, le numéro d'urgence.", ex_vi:"Tôi đã gọi ngay số 112, số khẩn cấp." },
          { fr:"le policier, la policière", vi:"cảnh sát (nam/nữ)", ex_fr:"Des policiers sont venus pour faciliter la circulation.", ex_vi:"Cảnh sát đã đến để hỗ trợ giao thông." },
          { fr:"le pompier, la pompière", vi:"lính cứu hỏa (nam/nữ)", ex_fr:"Les sapeurs-pompiers reçoivent les appels 365 jours par an et 24 heures sur 24.", ex_vi:"Lính cứu hỏa tiếp nhận cuộc gọi 365 ngày một năm, 24 giờ mỗi ngày." },
          { fr:"le SAMU",              vi:"dịch vụ cấp cứu y tế (SAMU)", ex_fr:"SAMU : 15.", ex_vi:"SAMU: số 15." },
          { fr:"la victime",           vi:"nạn nhân", ex_fr:"Jusqu'aux années 50, la ville ne propose pas de service ambulancier aux citoyens victimes d'accidents.", ex_vi:"Cho đến những năm 1950, thành phố không có dịch vụ xe cứu thương cho các nạn nhân tai nạn." },
        ]
      },
    ]
  },
  {
    id: "b8", num: "8", title: "Dans les médias",
    color: "#DB2777", bg: "#FCE7F3",
    groups: [
      {
        id: "b8g1", label: "L'information", icon: "📰",
        words: [
          { fr:"la diffusion en direct / en streaming", vi:"phát trực tiếp / phát trực tuyến", ex_fr:"Twitch est une plateforme de diffusion de vidéos en direct.", ex_vi:"Twitch là một nền tảng phát video trực tiếp." },
          { fr:"le documentaire",      vi:"phim tài liệu", ex_fr:"Elle propose des enquêtes, des reportages et des documentaires.", ex_vi:"Nó cung cấp các cuộc điều tra, phóng sự và phim tài liệu." },
          { fr:"l'enquête (f.) = le reportage", vi:"cuộc điều tra = phóng sự", ex_fr:"Le bd reporter livre une enquête passionnante entre et hors les murs.", ex_vi:"Người viết BD phóng sự mang đến một cuộc điều tra hấp dẫn." },
          { fr:"le journalisme numérique", vi:"báo chí số", ex_fr:"Dans le domaine du journalisme numérique, la nouvelle tendance, c'est Twitch.", ex_vi:"Trong lĩnh vực báo chí số, xu hướng mới là Twitch." },
          { fr:"le/la journaliste",    vi:"nhà báo", ex_fr:"Elle est réalisée en équipe par des dessinateurs et des journalistes.", ex_vi:"Nó được thực hiện theo nhóm bởi các họa sĩ và nhà báo." },
          { fr:"les médias",           vi:"truyền thông", ex_fr:"Grâce à Twitch, les médias classiques essaient de toucher un public plus jeune.", ex_vi:"Nhờ Twitch, các phương tiện truyền thông truyền thống cố gắng tiếp cận công chúng trẻ hơn." },
          { fr:"la plateforme",        vi:"nền tảng", ex_fr:"Twitch, une plateforme de diffusion de vidéos en direct.", ex_vi:"Twitch, một nền tảng phát video trực tiếp." },
          { fr:"le(s) point(s) de vue", vi:"quan điểm", ex_fr:"Nous donnons une grande importance à la diversité des points de vue.", ex_vi:"Chúng tôi rất coi trọng sự đa dạng quan điểm." },
          { fr:"publier un article",   vi:"đăng một bài báo", ex_fr:"Faire paraître un article dans un journal, c'est publier un article.", ex_vi:"Cho đăng một bài báo trên tờ báo, đó là xuất bản một bài báo." },
          { fr:"la revue de presse",   vi:"điểm báo", ex_fr:"Des journalistes indépendants font aussi des revues de presse quotidiennes interactives.", ex_vi:"Các nhà báo tự do cũng làm điểm báo tương tác hằng ngày." },
        ]
      },
      {
        id: "b8g2", label: "La presse écrite", icon: "🗞️",
        words: [
          { fr:"l'article (m.)",       vi:"bài báo", ex_fr:"Ils publient des résumés d'articles de magazines économiques.", ex_vi:"Họ đăng tóm tắt các bài báo tạp chí kinh tế." },
          { fr:"le dessinateur, la dessinatrice", vi:"họa sĩ minh họa", ex_fr:"Je ne suis pas journaliste ; je suis dessinateur de presse.", ex_vi:"Tôi không phải nhà báo; tôi là họa sĩ vẽ tranh báo chí." },
          { fr:"le journal",           vi:"tờ báo", ex_fr:"Y'a un article sur notre université dans le journal.", ex_vi:"Có một bài báo về trường đại học của chúng ta trên báo." },
          { fr:"le magazine = la revue", vi:"tạp chí = tập san", ex_fr:"Je viens de recevoir le dernier numéro de La Revue Dessinée.", ex_vi:"Tôi vừa nhận được số mới nhất của La Revue Dessinée." },
          { fr:"le numéro",            vi:"số (báo)", ex_fr:"C'est une revue trimestrielle de 228 pages.", ex_vi:"Đó là một tập san ra ba tháng một lần, dày 228 trang." },
          { fr:"la presse en ligne ≠ la presse papier", vi:"báo mạng ≠ báo giấy", ex_fr:"J'aime mieux lire la presse en ligne sur mon smartphone.", ex_vi:"Tôi thích đọc báo mạng trên điện thoại hơn." },
          { fr:"le titre",             vi:"tiêu đề", ex_fr:"En général je lis les titres, pas les articles.", ex_vi:"Nhìn chung tôi đọc tiêu đề, không đọc bài báo." },
        ]
      },
      {
        id: "b8g3", label: "La télévision", icon: "📺",
        words: [
          { fr:"la chaîne",            vi:"kênh (truyền hình)", ex_fr:"Sur cette chaîne, les émissions sont très intéressantes.", ex_vi:"Trên kênh này, các chương trình rất thú vị." },
          { fr:"le direct",            vi:"trực tiếp", ex_fr:"Ils chantent en direct dans cette émission ?", ex_vi:"Họ hát trực tiếp trong chương trình này à?" },
          { fr:"l'émission (f.)",      vi:"chương trình", ex_fr:"Change de chaîne, s'il te plaît. J'aime pas du tout cette émission.", ex_vi:"Đổi kênh giùm tôi. Tôi không thích chương trình này chút nào." },
          { fr:"le journal télé(visé) = le JT", vi:"bản tin thời sự truyền hình", ex_fr:"Je regarde toujours le JT de 20 h.", ex_vi:"Tôi luôn xem bản tin thời sự lúc 20 giờ." },
          { fr:"le téléviseur, la télé(vision)", vi:"tivi, truyền hình", ex_fr:"Je peux pas regarder le journal télé, à cause des images qui sont souvent horribles.", ex_vi:"Tôi không xem được bản tin thời sự, vì hình ảnh thường rất kinh khủng." },
        ]
      },
      {
        id: "b8g4", label: "Les rubriques de l'info", icon: "🗂️",
        words: [
          { fr:"actualité internationale / nationale / régionale", vi:"thời sự quốc tế / quốc gia / vùng miền", ex_fr:"Est-ce qu'ils suivent l'actualité nationale, internationale ?", ex_vi:"Họ có theo dõi thời sự quốc gia, quốc tế không?" },
          { fr:"la culture",           vi:"văn hóa", ex_fr:"« Un film magnifique ! » → la rubrique culture.", ex_vi:"« Một bộ phim tuyệt vời! » → mục văn hóa." },
          { fr:"l'écologie (f.)",      vi:"sinh thái, môi trường", ex_fr:"« Des solutions pour la planète ? » → la rubrique écologie.", ex_vi:"« Giải pháp cho hành tinh? » → mục sinh thái." },
          { fr:"l'économie (f.)",      vi:"kinh tế", ex_fr:"« Le prix de l'essence augmente » → la rubrique économie.", ex_vi:"« Giá xăng tăng » → mục kinh tế." },
          { fr:"la météo",             vi:"dự báo thời tiết", ex_fr:"Elle publie des résumés d'articles de magazines économiques, culturels ou politiques.", ex_vi:"Cô ấy đăng tóm tắt bài báo tạp chí kinh tế, văn hóa hoặc chính trị." },
          { fr:"la politique",         vi:"chính trị", ex_fr:"« 1er tour des élections présidentielles » → la rubrique politique.", ex_vi:"« Vòng 1 bầu cử tổng thống » → mục chính trị." },
          { fr:"la société",           vi:"xã hội", ex_fr:"« Un meilleur contrôle parental sur Internet » → la rubrique société.", ex_vi:"« Kiểm soát của phụ huynh trên Internet tốt hơn » → mục xã hội." },
          { fr:"le sport",             vi:"thể thao", ex_fr:"« Qui remportera la finale de la Ligue ? » → la rubrique sport.", ex_vi:"« Ai sẽ giành chức vô địch giải đấu? » → mục thể thao." },
        ]
      },
      {
        id: "b8g5", label: "La radio, les podcasts", icon: "🎙️",
        words: [
          { fr:"l'auditeur, l'auditrice", vi:"thính giả", ex_fr:"Il y a quelque chose de la proximité avec l'auditeur dans le podcast.", ex_vi:"Có một sự gần gũi với thính giả trong podcast." },
          { fr:"les contenus sonores (m.)", vi:"nội dung âm thanh", ex_fr:"Julie Nicolas écoute des podcasts, des contenus sonores le plus souvent gratuits.", ex_vi:"Julie Nicolas nghe podcast, các nội dung âm thanh thường miễn phí." },
          { fr:"l'écoute (f.)",        vi:"lượt nghe", ex_fr:"27 épisodes et près de 800 000 écoutes.", ex_vi:"27 tập và gần 800.000 lượt nghe." },
          { fr:"écouter des podcasts", vi:"nghe podcast", ex_fr:"Est-ce que vous écoutez des podcasts ? Pourquoi ?", ex_vi:"Bạn có nghe podcast không? Tại sao?" },
          { fr:"l'émission de radio (f.)", vi:"chương trình phát thanh", ex_fr:"Présentez une chaîne de radio ou une série de podcasts que vous aimez.", ex_vi:"Hãy giới thiệu một kênh radio hoặc chuỗi podcast mà bạn thích." },
          { fr:"l'épisode (m.)",       vi:"tập (chương trình)", ex_fr:"C'est un chapitre, une partie d'une série, d'émissions ou de podcasts.", ex_vi:"Đó là một chương, một phần của loạt chương trình hoặc podcast." },
          { fr:"le programme de radio", vi:"chương trình radio", ex_fr:"Elle choisit elle-même quand son programme préféré commence.", ex_vi:"Cô ấy tự chọn thời điểm chương trình yêu thích bắt đầu." },
          { fr:"raconter",             vi:"kể lại", ex_fr:"Depuis plus d'un an, elle raconte des expéditions d'aventuriers.", ex_vi:"Hơn một năm nay, cô ấy kể lại các chuyến thám hiểm của các nhà phiêu lưu." },
          { fr:"la voix",              vi:"giọng nói", ex_fr:"C'est grâce à elle qu'on reconnaît une personne à la radio : la voix.", ex_vi:"Nhờ nó mà người ta nhận ra một người trên radio: giọng nói." },
        ]
      },
      {
        id: "b8g6", label: "Les réseaux sociaux", icon: "📱",
        words: [
          { fr:"commenter",            vi:"bình luận", ex_fr:"C'est bien d'aimer les photos des gens qu'on suit ! C'est sympa d'écrire un petit message.", ex_vi:"Thật hay khi thích ảnh của những người mình theo dõi! Viết một dòng nhắn nhỏ cũng dễ thương." },
          { fr:"être connecté(e)",     vi:"kết nối mạng", ex_fr:"Je ne veux pas être connecté(e) tout le temps.", ex_vi:"Tôi không muốn kết nối mạng liên tục." },
          { fr:"être en contact (avec)", vi:"giữ liên lạc (với)", ex_fr:"Ça me passionne d'être en contact avec cette génération !", ex_vi:"Tôi rất thích được giữ liên lạc với thế hệ này!" },
          { fr:"être sur un réseau social", vi:"có mặt trên mạng xã hội", ex_fr:"C'est normal qu'on soit sur les réseaux sociaux, nous aussi !", ex_vi:"Chúng tôi cũng có mặt trên mạng xã hội là chuyện bình thường!" },
          { fr:"les fausses nouvelles, les infox", vi:"tin giả", ex_fr:"On y trouve parfois de fausses nouvelles.", ex_vi:"Đôi khi ở đó có tin giả." },
          { fr:"l'internaute (m./f.)", vi:"cư dân mạng", ex_fr:"Il faut sensibiliser les internautes et leur apprendre à se méfier.", ex_vi:"Cần nâng cao nhận thức cho cư dân mạng và dạy họ cách đề phòng." },
          { fr:"ouvrir un compte sur / s'inscrire sur un réseau social ≠ fermer son compte sur… / quitter un réseau social", vi:"mở tài khoản / đăng ký mạng xã hội ≠ đóng tài khoản / rời khỏi mạng xã hội", ex_fr:"Elle a ouvert un compte Facebook pour parler avec ses amies.", ex_vi:"Bà đã mở một tài khoản Facebook để trò chuyện với bạn bè." },
          { fr:"poster des photos",    vi:"đăng ảnh", ex_fr:"Ma petite-fille Dina poste de superbes vidéos.", ex_vi:"Cháu gái tôi, Dina, đăng những video tuyệt đẹp." },
          { fr:"regarder une vidéo",   vi:"xem video", ex_fr:"Elle a même ouvert un compte TikTok pour regarder les vidéos de ses petits-enfants.", ex_vi:"Bà còn mở tài khoản TikTok để xem video của các cháu." },
          { fr:"suivre quelqu'un sur un réseau", vi:"theo dõi ai đó trên mạng", ex_fr:"Elle a ouvert un compte Instagram pour suivre la vie de son fils.", ex_vi:"Bà mở tài khoản Instagram để theo dõi cuộc sống của con trai." },
        ]
      },
      {
        id: "b8g7", label: "La communication", icon: "📡",
        words: [
          { fr:"diffuser une information", vi:"phát tán thông tin", ex_fr:"Les radios diffusent de l'information.", ex_vi:"Các đài radio phát tán thông tin." },
          { fr:"un outil / un moyen de communication", vi:"công cụ / phương tiện truyền thông", ex_fr:"Internet est un moyen de communication très efficace.", ex_vi:"Internet là một phương tiện truyền thông rất hiệu quả." },
          { fr:"sensibiliser un public", vi:"nâng cao nhận thức cho công chúng", ex_fr:"Des émissions essayent de sensibiliser les jeunes aux dangers des réseaux sociaux.", ex_vi:"Một số chương trình cố gắng nâng cao nhận thức cho giới trẻ về nguy cơ của mạng xã hội." },
          { fr:"transmettre des connaissances", vi:"truyền đạt kiến thức", ex_fr:"Grâce aux podcasts, on peut transmettre des connaissances.", ex_vi:"Nhờ podcast, người ta có thể truyền đạt kiến thức." },
        ]
      },
    ]
  },
  {
    id: "b9", num: "9", title: "Consommer responsable",
    color: "#059669", bg: "#D1FAE5",
    groups: [
      {
        id: "b9g1", label: "Consommer", icon: "💶",
        words: [
          { fr:"acheter",              vi:"mua", ex_fr:"Utilisons-les et arrêtons d'acheter des objets neufs !", ex_vi:"Hãy dùng chúng và ngừng mua đồ mới!" },
          { fr:"l'argent (m.)",        vi:"tiền", ex_fr:"Je souhaiterais économiser de l'argent.", ex_vi:"Tôi ước gì có thể tiết kiệm được tiền." },
          { fr:"dépenser",             vi:"tiêu (tiền)", ex_fr:"Nous dépensons trop d'argent.", ex_vi:"Chúng tôi tiêu quá nhiều tiền." },
          { fr:"donner",               vi:"cho, tặng", ex_fr:"Quand on donne un objet, cet objet est gratuit.", ex_vi:"Khi ta cho một món đồ, món đồ đó là miễn phí." },
          { fr:"économiser",           vi:"tiết kiệm", ex_fr:"Nous devons économiser pour partir en voyage.", ex_vi:"Chúng tôi phải tiết kiệm để đi du lịch." },
          { fr:"emprunter",            vi:"mượn, vay", ex_fr:"Je voudrais emprunter plus de livres à la bibliothèque.", ex_vi:"Tôi muốn mượn nhiều sách hơn ở thư viện." },
          { fr:"jeter",                vi:"vứt bỏ", ex_fr:"Je veux arrêter de jeter.", ex_vi:"Tôi muốn ngừng vứt bỏ đồ." },
          { fr:"louer",                vi:"thuê, cho thuê", ex_fr:"On pourrait louer une voiture ce week-end !", ex_vi:"Chúng ta có thể thuê một chiếc xe cuối tuần này!" },
          { fr:"négocier",             vi:"thương lượng (giá)", ex_fr:"Le prix n'est pas fixe, tu peux le négocier.", ex_vi:"Giá không cố định, bạn có thể thương lượng." },
          { fr:"partager",             vi:"chia sẻ", ex_fr:"Vous devriez partager vos livres avec votre famille.", ex_vi:"Bạn nên chia sẻ sách của mình với gia đình." },
          { fr:"payer",                vi:"trả tiền", ex_fr:"Comment voulez-vous payer ? Par carte bancaire ?", ex_vi:"Bạn muốn trả tiền như thế nào? Bằng thẻ ngân hàng à?" },
          { fr:"vendre",               vi:"bán", ex_fr:"Tu ne vas pas vendre ces chaussures !", ex_vi:"Bạn sẽ không bán đôi giày này chứ!" },
        ]
      },
      {
        id: "b9g2", label: "Le produit", icon: "🏷️",
        words: [
          { fr:"cher",                 vi:"đắt", ex_fr:"Ça coûte souvent moins cher de réparer un objet.", ex_vi:"Việc sửa một món đồ thường đỡ tốn kém hơn." },
          { fr:"la couleur",           vi:"màu sắc", ex_fr:"Vends vélo neuf, couleur noire.", ex_vi:"Bán xe đạp mới, màu đen." },
          { fr:"gratuit",              vi:"miễn phí", ex_fr:"Certaines bricothèques proposent même des ateliers gratuits.", ex_vi:"Một số thư viện dụng cụ còn tổ chức các buổi hội thảo miễn phí." },
          { fr:"la marque",            vi:"nhãn hiệu", ex_fr:"Il faut préciser la marque, la taille et la couleur.", ex_vi:"Cần ghi rõ nhãn hiệu, kích cỡ và màu sắc." },
          { fr:"neuf ≠ d'occasion",    vi:"mới ≠ cũ (đã qua sử dụng)", ex_fr:"On voit ce marché de l'occasion qui explose.", ex_vi:"Ta thấy thị trường đồ cũ đang bùng nổ." },
          { fr:"le prix",              vi:"giá", ex_fr:"Le prix aussi est important.", ex_vi:"Giá cả cũng quan trọng." },
          { fr:"en promotion",         vi:"đang khuyến mãi", ex_fr:"Je suis toujours attirée par les soldes et les produits en promotion.", ex_vi:"Tôi luôn bị hấp dẫn bởi hàng giảm giá và sản phẩm khuyến mãi." },
          { fr:"la taille",            vi:"kích cỡ", ex_fr:"Précise la taille de chaque vêtement.", ex_vi:"Hãy ghi rõ kích cỡ của mỗi món quần áo." },
        ]
      },
      {
        id: "b9g3", label: "Les personnes", icon: "🧑‍🤝‍🧑",
        words: [
          { fr:"l'acheteur, l'acheteuse", vi:"người mua", ex_fr:"Pour le même article, les acheteurs paieront toujours le minimum.", ex_vi:"Với cùng một món hàng, người mua luôn trả mức giá thấp nhất." },
          { fr:"le client, la cliente", vi:"khách hàng", ex_fr:"J'ai déjà trouvé une cliente pour une robe !", ex_vi:"Tôi đã tìm được một khách hàng cho chiếc váy rồi!" },
          { fr:"le consommateur, la consommatrice", vi:"người tiêu dùng", ex_fr:"Je veux mieux consommer, je veux arrêter de jeter.", ex_vi:"Tôi muốn tiêu dùng tốt hơn, tôi muốn ngừng vứt bỏ." },
          { fr:"le particulier",       vi:"cá nhân (không phải cửa hàng)", ex_fr:"Votre site de petites annonces entre particuliers.", ex_vi:"Trang rao vặt giữa các cá nhân của bạn." },
          { fr:"l'utilisateur, l'utilisatrice", vi:"người sử dụng", ex_fr:"Il y a combien d'utilisateurs du Leboncoin ?", ex_vi:"Có bao nhiêu người dùng trang Leboncoin?" },
          { fr:"le vendeur, la vendeuse", vi:"người bán", ex_fr:"Regarde aussi les annonces proposées par les autres vendeurs !", ex_vi:"Hãy xem thêm những tin rao của các người bán khác!" },
        ]
      },
      {
        id: "b9g4", label: "Les catégories de produits", icon: "🛍️",
        words: [
          { fr:"l'alimentation (f.)",  vi:"thực phẩm", ex_fr:"Ça ne concerne pas l'alimentation ou les produits de beauté.", ex_vi:"Điều đó không liên quan đến thực phẩm hay mỹ phẩm." },
          { fr:"l'électroménager (m.)", vi:"đồ điện gia dụng", ex_fr:"Que faites-vous quand un de vos appareils électroménagers ne fonctionne plus ?", ex_vi:"Bạn làm gì khi một thiết bị điện gia dụng của bạn không hoạt động nữa?" },
          { fr:"le matériel de sport", vi:"dụng cụ thể thao", ex_fr:"J'aimerais arrêter d'acheter du matériel de sport.", ex_vi:"Tôi muốn ngừng mua dụng cụ thể thao." },
          { fr:"le meuble",            vi:"đồ nội thất", ex_fr:"Je vais bientôt déménager et je veux vendre mes meubles.", ex_vi:"Tôi sắp chuyển nhà và muốn bán đồ nội thất của mình." },
          { fr:"le multimédia",        vi:"đồ đa phương tiện", ex_fr:"La partie multimédia, les téléphones, les ordinateurs…", ex_vi:"Mảng đa phương tiện, điện thoại, máy tính…" },
          { fr:"le produit de beauté", vi:"mỹ phẩm", ex_fr:"Les grands magasins vendent des kits pour fabriquer ses produits de beauté.", ex_vi:"Các cửa hàng lớn bán bộ dụng cụ để tự làm mỹ phẩm." },
          { fr:"le vêtement",          vi:"quần áo", ex_fr:"J'essaie de vendre des vêtements sur Leboncoin.", ex_vi:"Tôi đang cố bán quần áo trên Leboncoin." },
        ]
      },
      {
        id: "b9g5", label: "Les travaux manuels", icon: "🧵",
        words: [
          { fr:"l'atelier (m.)",       vi:"xưởng, buổi hội thảo thủ công", ex_fr:"Est-ce que vous aimeriez participer à cet atelier ?", ex_vi:"Bạn có muốn tham gia buổi hội thảo này không?" },
          { fr:"la couture",           vi:"may vá", ex_fr:"On fait de la couture en écoutant la radio.", ex_vi:"Chúng tôi may vá trong lúc nghe radio." },
          { fr:"créer",                vi:"sáng tạo, tạo ra", ex_fr:"Beaucoup de personnes aiment créer.", ex_vi:"Nhiều người thích sáng tạo." },
          { fr:"la cuisine",           vi:"nấu ăn", ex_fr:"Ils sont de plus en plus nombreux à pratiquer la cuisine.", ex_vi:"Ngày càng có nhiều người thực hành nấu ăn." },
          { fr:"la décoration",        vi:"trang trí", ex_fr:"Le fait maison se développe aussi dans la décoration d'intérieur.", ex_vi:"Trào lưu tự làm cũng phát triển trong trang trí nội thất." },
          { fr:"la mécanique",         vi:"cơ khí, sửa xe", ex_fr:"Elle a réparé sa voiture en faisant de la mécanique.", ex_vi:"Cô ấy đã sửa xe bằng cách làm cơ khí." },
          { fr:"monter un meuble",     vi:"lắp ráp đồ nội thất", ex_fr:"Vous devez monter un meuble ?", ex_vi:"Bạn cần lắp ráp một món đồ nội thất à?" },
          { fr:"le tricot",            vi:"đan len", ex_fr:"Elles tricotent en regardant la télévision.", ex_vi:"Họ đan len trong lúc xem tivi." },
          { fr:"le tutoriel",          vi:"video hướng dẫn", ex_fr:"J'apprends la mécanique en regardant des tutoriels.", ex_vi:"Tôi học cơ khí bằng cách xem video hướng dẫn." },
        ]
      },
      {
        id: "b9g6", label: "Les matières", icon: "🧶",
        words: [
          { fr:"en bois",              vi:"bằng gỗ", ex_fr:"Poncer une table en bois.", ex_vi:"Đánh giấy nhám một cái bàn gỗ." },
          { fr:"en carton",            vi:"bằng bìa carton", ex_fr:"Une boîte en carton.", ex_vi:"Một cái hộp bìa carton." },
          { fr:"en coton",             vi:"bằng vải cotton", ex_fr:"Un t-shirt en coton.", ex_vi:"Một chiếc áo phông bằng vải cotton." },
          { fr:"en cuir",              vi:"bằng da", ex_fr:"Des chaussures en cuir.", ex_vi:"Một đôi giày da." },
          { fr:"en fer",               vi:"bằng sắt", ex_fr:"Une clé en fer.", ex_vi:"Một chiếc chìa khóa bằng sắt." },
          { fr:"en jean",              vi:"bằng vải jean", ex_fr:"Je fais un sac en jean.", ex_vi:"Tôi làm một cái túi bằng vải jean." },
          { fr:"en laine",             vi:"bằng len", ex_fr:"J'ai acheté de la laine.", ex_vi:"Tôi đã mua len." },
          { fr:"en papier",            vi:"bằng giấy", ex_fr:"Un origami en papier plié.", ex_vi:"Một hình origami bằng giấy gấp." },
          { fr:"en plastique",         vi:"bằng nhựa", ex_fr:"Un objet en plastique se recycle facilement.", ex_vi:"Một món đồ bằng nhựa dễ tái chế." },
          { fr:"en tissu",             vi:"bằng vải", ex_fr:"Nous avons trouvé du tissu à la mercerie.", ex_vi:"Chúng tôi đã tìm được vải ở tiệm đồ may." },
          { fr:"en verre",             vi:"bằng thủy tinh", ex_fr:"Une bouteille en verre.", ex_vi:"Một cái chai thủy tinh." },
        ]
      },
      {
        id: "b9g7", label: "La réparation", icon: "🔧",
        words: [
          { fr:"abîmé(e)",             vi:"hư hỏng, bị hỏng", ex_fr:"Un vêtement abîmé est un vêtement en mauvais état.", ex_vi:"Một cái áo bị hỏng là một cái áo trong tình trạng xấu." },
          { fr:"cassé(e)",             vi:"bị gãy, bị vỡ", ex_fr:"Mon frigo est cassé.", ex_vi:"Tủ lạnh của tôi bị hỏng." },
          { fr:"changer une pièce",    vi:"thay một bộ phận", ex_fr:"Il faut changer une pièce et c'est compliqué.", ex_vi:"Cần phải thay một bộ phận và việc đó phức tạp." },
          { fr:"la panne",             vi:"sự cố, hỏng hóc", ex_fr:"La moitié des pannes n'ont pas besoin de pièces.", ex_vi:"Một nửa số sự cố không cần đến phụ tùng thay thế." },
          { fr:"la pièce",             vi:"bộ phận, phụ tùng", ex_fr:"Vous la trouverez dans notre catalogue.", ex_vi:"Bạn sẽ tìm thấy nó trong danh mục của chúng tôi." },
          { fr:"poncer",               vi:"đánh giấy nhám", ex_fr:"Poncer une table en bois.", ex_vi:"Đánh giấy nhám một cái bàn gỗ." },
          { fr:"réparer",              vi:"sửa chữa", ex_fr:"J'ai essayé de le réparer mais je n'ai pas trouvé la panne.", ex_vi:"Tôi đã thử sửa nhưng không tìm ra sự cố." },
          { fr:"le technicien, la technicienne", vi:"kỹ thuật viên", ex_fr:"Je vais demander à un technicien de faire cette réparation.", ex_vi:"Tôi sẽ nhờ một kỹ thuật viên làm việc sửa chữa này." },
        ]
      },
      {
        id: "b9g8", label: "L'équipement", icon: "🪜",
        words: [
          { fr:"l'échelle (f.)",       vi:"cái thang", ex_fr:"Installer une étagère ? Vous manquez d'outils…", ex_vi:"Lắp một cái kệ? Bạn thiếu dụng cụ…" },
          { fr:"l'outil (m.)",         vi:"dụng cụ", ex_fr:"Vous avez l'embarras du choix !", ex_vi:"Bạn có vô vàn lựa chọn!" },
          { fr:"la ponceuse",          vi:"máy đánh giấy nhám", ex_fr:"Scie, ponceuse, échelle, tondeuse…", ex_vi:"Cưa, máy đánh giấy nhám, thang, máy cắt cỏ…" },
          { fr:"la scie",              vi:"cái cưa", ex_fr:"Quel objet on utilise pour couper du bois ?", ex_vi:"Người ta dùng đồ gì để cắt gỗ?" },
          { fr:"la tondeuse",          vi:"máy cắt cỏ", ex_fr:"Quel objet on utilise pour couper l'herbe du jardin ?", ex_vi:"Người ta dùng đồ gì để cắt cỏ trong vườn?" },
        ]
      },
    ]
  },
  {
    id: "b10", num: "10", title: "Envies d'ailleurs ?",
    color: "#0EA5E9", bg: "#E0F2FE",
    groups: [
      {
        id: "b10g1", label: "L'hébergement", icon: "🏨",
        words: [
          { fr:"l'auberge de jeunesse (f.)", vi:"nhà nghỉ thanh niên", ex_fr:"Où vous allez dormir ? au camping ou dans une auberge de jeunesse ?", ex_vi:"Bạn sẽ ngủ ở đâu? cắm trại hay ở nhà nghỉ thanh niên?" },
          { fr:"le camping",           vi:"cắm trại, khu cắm trại", ex_fr:"On va faire du camping cet été.", ex_vi:"Mùa hè này chúng tôi sẽ đi cắm trại." },
          { fr:"chez l'habitant",      vi:"ở nhà dân địa phương", ex_fr:"Je vais être logé chez l'habitant. J'adore dormir chez l'habitant.", ex_vi:"Tôi sẽ ở nhà dân địa phương. Tôi rất thích ngủ ở nhà dân." },
          { fr:"l'hôtel (m.)",         vi:"khách sạn", ex_fr:"Nous proposons à nos clients de dormir chez l'habitant, pas à l'hôtel.", ex_vi:"Chúng tôi đề nghị khách hàng ngủ ở nhà dân, không phải khách sạn." },
          { fr:"passer la nuit (chez quelqu'un)", vi:"ngủ qua đêm (ở nhà ai)", ex_fr:"Nous avons passé la nuit chez des amis.", ex_vi:"Chúng tôi đã ngủ qua đêm ở nhà bạn bè." },
        ]
      },
      {
        id: "b10g2", label: "Le séjour", icon: "🧳",
        words: [
          { fr:"le circuit",           vi:"lộ trình, chuyến đi vòng quanh", ex_fr:"J'ai réfléchi à un circuit pour notre voyage au Japon.", ex_vi:"Tôi đã nghĩ ra một lộ trình cho chuyến đi Nhật Bản của chúng ta." },
          { fr:"la croisière",         vi:"chuyến du lịch bằng tàu biển", ex_fr:"Cet été, on va faire une croisière. Une semaine sur un bateau, le bonheur !", ex_vi:"Hè này chúng tôi sẽ đi du thuyền. Một tuần trên tàu, thật hạnh phúc!" },
          { fr:"le départ ≠ l'arrivée (f.)", vi:"khởi hành ≠ đến nơi", ex_fr:"Nous travaillons avec des compagnies aériennes qui proposent des vols directs au départ de Paris.", ex_vi:"Chúng tôi hợp tác với các hãng hàng không có chuyến bay thẳng khởi hành từ Paris." },
          { fr:"la destination",       vi:"điểm đến", ex_fr:"Tu as une idée pour la destination de notre prochain voyage ?", ex_vi:"Bạn có ý tưởng gì về điểm đến cho chuyến đi tiếp theo của chúng ta không?" },
          { fr:"la direction",         vi:"hướng đi", ex_fr:"Ensuite, direction la Baie d'Halong pour une croisière inoubliable.", ex_vi:"Sau đó, hướng về vịnh Hạ Long cho một chuyến du thuyền khó quên." },
          { fr:"faire le tour de France, du monde", vi:"đi vòng quanh nước Pháp, vòng quanh thế giới", ex_fr:"Après le Vercors, les volcans d'Auvergne, j'ai fini mon tour de France à Paris.", ex_vi:"Sau vùng Vercors, các núi lửa Auvergne, tôi đã kết thúc chuyến vòng quanh Pháp tại Paris." },
          { fr:"l'itinéraire (m.)",    vi:"hành trình", ex_fr:"Selon l'itinéraire choisi, vous pourrez aller à Hoi An.", ex_vi:"Tùy theo hành trình đã chọn, bạn sẽ có thể đến Hội An." },
          { fr:"le/la touriste",       vi:"khách du lịch", ex_fr:"Vous la découvrez sous l'angle du quotidien, non plus comme un(e) touriste.", ex_vi:"Bạn khám phá nó dưới góc nhìn đời thường, không còn như một khách du lịch nữa." },
        ]
      },
      {
        id: "b10g3", label: "L'avion", icon: "✈️",
        words: [
          { fr:"l'aéroport (m.)",      vi:"sân bay", ex_fr:"Vous atterrirez à l'aéroport d'Hanoï.", ex_vi:"Bạn sẽ hạ cánh xuống sân bay Hà Nội." },
          { fr:"atterrir ≠ décoller",  vi:"hạ cánh ≠ cất cánh", ex_fr:"L'avion a décollé de Paris et va atterrir à Hanoï.", ex_vi:"Máy bay đã cất cánh từ Paris và sẽ hạ cánh xuống Hà Nội." },
          { fr:"les bagages (m.)",     vi:"hành lý", ex_fr:"Ce sont mes sacs, mes valises : mes bagages.", ex_vi:"Đây là túi xách, va li của tôi: hành lý của tôi." },
          { fr:"le billet",            vi:"vé", ex_fr:"Nous nous occupons de vos billets.", ex_vi:"Chúng tôi lo vé cho bạn." },
          { fr:"la compagnie aérienne", vi:"hãng hàng không", ex_fr:"Nous travaillons avec différentes compagnies aériennes.", ex_vi:"Chúng tôi hợp tác với nhiều hãng hàng không khác nhau." },
          { fr:"le vol (direct)",      vi:"chuyến bay (thẳng)", ex_fr:"Est-ce que les vols sont inclus dans le prix ?", ex_vi:"Các chuyến bay có được tính trong giá không?" },
        ]
      },
      {
        id: "b10g4", label: "Les prestations du séjour", icon: "🍽️",
        words: [
          { fr:"la chambre double",    vi:"phòng đôi", ex_fr:"Nous sommes deux. Vous avez une chambre double ?", ex_vi:"Chúng tôi có hai người. Bạn có phòng đôi không?" },
          { fr:"la chambre simple",    vi:"phòng đơn", ex_fr:"Je voyage seul. Il vous reste une chambre simple ?", ex_vi:"Tôi đi du lịch một mình. Bạn còn phòng đơn không?" },
          { fr:"compris = inclus",     vi:"được bao gồm", ex_fr:"Tous les repas sont inclus dans la pension complète ?", ex_vi:"Tất cả các bữa ăn có được bao gồm trong gói trọn bữa không?" },
          { fr:"la demi-pension",      vi:"nửa suất ăn (2 bữa/ngày)", ex_fr:"On mangera le soir à l'hôtel mais pas le midi. On va prendre la demi-pension.", ex_vi:"Chúng tôi sẽ ăn tối ở khách sạn nhưng không ăn trưa. Chúng tôi sẽ đặt gói nửa suất ăn." },
          { fr:"la pension complète",  vi:"trọn suất ăn (3 bữa/ngày)", ex_fr:"On veut prendre tous nos repas à l'hôtel : la pension complète.", ex_vi:"Chúng tôi muốn ăn tất cả các bữa ở khách sạn: gói trọn suất ăn." },
          { fr:"le petit déjeuner",    vi:"bữa sáng", ex_fr:"Une chambre avec le petit déjeuner s'il vous plaît.", ex_vi:"Một phòng có kèm bữa sáng, làm ơn." },
          { fr:"le repas",             vi:"bữa ăn", ex_fr:"Les repas sont compris ? Juste le petit déjeuner.", ex_vi:"Các bữa ăn có được bao gồm không? Chỉ có bữa sáng thôi." },
        ]
      },
      {
        id: "b10g5", label: "La visite touristique", icon: "🧭",
        words: [
          { fr:"l'audioguide (m.)",    vi:"máy hướng dẫn nghe tự động", ex_fr:"C'est mieux qu'avec un audioguide !", ex_vi:"Cách này tốt hơn là dùng audioguide!" },
          { fr:"la brochure touristique", vi:"tờ rơi du lịch", ex_fr:"À l'hôtel, j'ai vu la brochure du bus amphibie.", ex_vi:"Ở khách sạn, tôi đã thấy tờ rơi về xe buýt lưỡng cư." },
          { fr:"le bus touristique",   vi:"xe buýt du lịch", ex_fr:"C'est un véhicule qui fait le tour d'une ville en passant par les principaux monuments.", ex_vi:"Đó là một phương tiện đi vòng quanh thành phố, qua các di tích chính." },
          { fr:"l'excursion (f.)",     vi:"chuyến du ngoạn", ex_fr:"Quelle excursion ! On fait souvent des visites guidées, mais en bus amphibie, ça change !", ex_vi:"Chuyến du ngoạn tuyệt vời! Chúng tôi thường đi tham quan có hướng dẫn, nhưng bằng xe buýt lưỡng cư thì khác hẳn!" },
          { fr:"le/la guide",          vi:"hướng dẫn viên", ex_fr:"C'est la personne qui donne les explications aux touristes.", ex_vi:"Đó là người giải thích thông tin cho khách du lịch." },
          { fr:"l'histoire (f.)",      vi:"lịch sử, câu chuyện", ex_fr:"C'est le récit des événements du passé.", ex_vi:"Đó là câu chuyện kể lại các sự kiện trong quá khứ." },
          { fr:"les informations pratiques (f.)", vi:"thông tin thực tế, hữu ích", ex_fr:"À l'office de tourisme, on m'a donné toutes les informations pratiques.", ex_vi:"Ở văn phòng du lịch, người ta đã cho tôi tất cả thông tin hữu ích." },
          { fr:"l'office de tourisme (m.)", vi:"văn phòng thông tin du lịch", ex_fr:"L'office de tourisme donne des informations pratiques aux visiteurs.", ex_vi:"Văn phòng du lịch cung cấp thông tin hữu ích cho du khách." },
          { fr:"la visite guidée",     vi:"chuyến tham quan có hướng dẫn", ex_fr:"On fait souvent des visites guidées.", ex_vi:"Chúng tôi thường đi tham quan có hướng dẫn." },
        ]
      },
      {
        id: "b10g6", label: "Les sites", icon: "🏞️",
        words: [
          { fr:"la cascade",           vi:"thác nước", ex_fr:"On a la chance de pouvoir admirer de magnifiques cascades dans les montagnes françaises.", ex_vi:"Chúng ta may mắn được chiêm ngưỡng những thác nước tuyệt đẹp ở vùng núi Pháp." },
          { fr:"la falaise",           vi:"vách đá", ex_fr:"Du haut de la falaise on peut voir toute la ville.", ex_vi:"Từ trên đỉnh vách đá có thể nhìn thấy toàn bộ thành phố." },
          { fr:"la fontaine",          vi:"đài phun nước", ex_fr:"Les questions sur les fontaines de la Concorde étaient très intéressantes.", ex_vi:"Các câu hỏi về đài phun nước ở quảng trường Concorde rất thú vị." },
          { fr:"la grotte",            vi:"hang động", ex_fr:"On a visité des grottes. C'était sombre et il faisait assez froid !", ex_vi:"Chúng tôi đã tham quan hang động. Ở đó tối và khá lạnh!" },
          { fr:"le pont",              vi:"cây cầu", ex_fr:"On est passés sur le pont pour traverser la rivière.", ex_vi:"Chúng tôi đã đi qua cầu để băng qua sông." },
          { fr:"les ruines (f.)",      vi:"tàn tích", ex_fr:"Il y a beaucoup de ruines de l'époque romaine dans le Sud de la France.", ex_vi:"Có rất nhiều tàn tích thời La Mã ở miền Nam nước Pháp." },
          { fr:"le volcan",            vi:"núi lửa", ex_fr:"Les passionnés de nature pourront gravir le volcan de la Soufrière.", ex_vi:"Những người đam mê thiên nhiên có thể leo lên núi lửa Soufrière." },
        ]
      },
      {
        id: "b10g7", label: "Les types de tourisme", icon: "🌍",
        words: [
          { fr:"le tourisme de proximité/local", vi:"du lịch gần nhà/địa phương", ex_fr:"Cette année, ils voyagent dans leur région : c'est le tourisme local.", ex_vi:"Năm nay họ đi du lịch trong vùng của mình: đó là du lịch địa phương." },
          { fr:"le tourisme lent = le slow tourisme", vi:"du lịch chậm", ex_fr:"Depuis plusieurs années, ils prennent le temps de voyager : le tourisme lent.", ex_vi:"Từ nhiều năm nay, họ dành thời gian để đi du lịch một cách thong thả: du lịch chậm." },
          { fr:"le tourisme durable/responsable", vi:"du lịch bền vững/có trách nhiệm", ex_fr:"Ils voyagent en respectant l'environnement et les gens sur place.", ex_vi:"Họ đi du lịch trong khi tôn trọng môi trường và người dân địa phương." },
        ]
      },
    ]
  },
];
