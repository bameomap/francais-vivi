/**
 * editoPourNotesA2.js — « Pour communiquer » boxes for Édito A2.
 * Same shape as EDITO_POUR_NOTES (editoAudioNotes.js); EditoAudioPanel and
 * ProductionOralePanel pick them up through their `pourNotes` prop.
 *
 * Keys are "<unitId>-<document letter>" so the unit can be recovered from the
 * key prefix, exactly like the A1 file ("u1-b" → unit 1).
 */

export const EDITO_POUR_NOTES_A2 = {

  // ─── Unité 1 · Nouvelles vies ─────────────────────────────────────
  "b1-a": [
    {
      heading: "Pour parler de son parcours",
      structure: "Kể lại chặng đường đời — luôn dùng passé composé. Nơi sinh/lớn lên: « à + thành phố », « en + nước giống cái », « au(x) + nước giống đực/số nhiều ». Các động từ chỉ chuyển động/thay đổi (naître, venir, devenir) chia với ÊTRE, nên quá khứ phân từ phải hợp giống–số với chủ ngữ.",
      phrases: [
        { fr: "Je suis né(e) à Hanoï, au Vietnam.", vi: "Tôi sinh ra ở Hà Nội, Việt Nam." },
        { fr: "J'ai grandi en France / au Burundi.", vi: "Tôi lớn lên ở Pháp / ở Burundi." },
        { fr: "Je suis venu(e) ici en 2019.", vi: "Tôi đến đây năm 2019." },
        { fr: "J'ai fait mes études à Versailles.", vi: "Tôi học đại học ở Versailles." },
        { fr: "Je suis devenu(e) trader / écrivain(e).", vi: "Tôi trở thành nhà giao dịch / nhà văn." },
        { fr: "J'ai changé de vie.", vi: "Tôi đã thay đổi cuộc đời." },
      ],
    },
  ],

  "b1-c": [
    {
      heading: "Pour exprimer son intention de faire quelque chose",
      structure: "Nói về dự định. Ba cấu trúc đều + động từ nguyên thể: « compter + inf. » (tính sẽ), « avoir l'intention de + inf. » (có ý định), « penser + inf. » (nghĩ sẽ). Chốt hạ bằng « C'est décidé ! ».",
      phrases: [
        { fr: "Je compte chercher du travail.", vi: "Tôi tính đi tìm việc." },
        { fr: "J'ai l'intention de rester en France.", vi: "Tôi có ý định ở lại Pháp." },
        { fr: "Je pense rentrer au Vietnam.", vi: "Tôi nghĩ sẽ về Việt Nam." },
        { fr: "C'est décidé !", vi: "Quyết định rồi!" },
      ],
    },
    {
      heading: "Pour raconter un parcours à l'étranger",
      structure: "Từ vựng du học & nghề nghiệp: « faire un séjour Erasmus », « finir ses études », « obtenir son diplôme », « faire un stage », « s'installer à + thành phố ». Nối chuỗi sự kiện bằng: ensuite, puis, un an plus tard, maintenant.",
      phrases: [
        { fr: "J'ai fait un séjour Erasmus à Bordeaux.", vi: "Tôi đi trao đổi Erasmus ở Bordeaux." },
        { fr: "Ensuite, je suis rentré(e) pour finir mes études.", vi: "Sau đó tôi về để học nốt." },
        { fr: "Quand j'ai obtenu mon diplôme, j'ai décidé de revenir.", vi: "Khi lấy được bằng, tôi quyết định quay lại." },
        { fr: "Je me suis installé(e) à Lyon.", vi: "Tôi đã định cư ở Lyon." },
        { fr: "Je me suis fait de nouveaux amis.", vi: "Tôi đã kết bạn mới." },
        { fr: "Je fais un stage dans une entreprise française.", vi: "Tôi đang thực tập ở một công ty Pháp." },
      ],
    },
  ],

  "b1-d": [
    {
      heading: "Pour parler de ses goûts",
      structure: "Thích: adorer > aimer bien > aimer. Không thích: « ne pas être fan de + danh từ », « ne pas aimer trop », « c'est pas du tout mon truc » (rất thân mật). Nói về đam mê: « Ma passion, c'est + danh từ ».",
      phrases: [
        { fr: "J'adore ce concert.", vi: "Tôi mê buổi hòa nhạc này." },
        { fr: "J'aime bien sortir.", vi: "Tôi thích đi chơi." },
        { fr: "Je (ne) suis (pas) fan de jazz.", vi: "Tôi (không) hâm mộ nhạc jazz." },
        { fr: "Je n'aime pas trop les sports aquatiques.", vi: "Tôi không thích lắm các môn thể thao dưới nước." },
        { fr: "C'est pas du tout mon truc.", vi: "Cái đó chẳng hợp gu tôi tí nào." },
        { fr: "Ma passion, c'est les jeux vidéo.", vi: "Đam mê của tôi là trò chơi điện tử." },
      ],
    },
  ],

  "b1-i": [
    {
      heading: "Pour proposer, accepter ou refuser une sortie",
      structure: "Rủ đi chơi: « Ça te dit ? », « Tu es libre + thời gian ? ». Hẹn giờ: « On se retrouve + nơi + à + giờ ? ». Hỏi có tiện không: « Ça te va ? / C'est bon pour toi ? ». Đồng ý: Avec plaisir, D'accord, Ça marche. Từ chối lịch sự: xin lỗi TRƯỚC rồi mới nêu lý do.",
      phrases: [
        { fr: "Ça te dit ?", vi: "Bạn thấy sao? Đi không?" },
        { fr: "Tu es libre le 9 juillet ?", vi: "Ngày 9 tháng 7 bạn rảnh không?" },
        { fr: "On se retrouve chez moi à 19 h ?", vi: "Gặp nhau ở nhà mình lúc 19h nhé?" },
        { fr: "Ça te va ? / C'est bon pour toi ?", vi: "Vậy được không? / Bạn tiện không?" },
        { fr: "Avec plaisir ! / OK ! / D'accord !", vi: "Rất sẵn lòng! / Được! / Đồng ý!" },
        { fr: "Ça marche ! / Ça me va !", vi: "Chốt vậy nhé! / Vậy hợp với mình." },
        { fr: "Je suis désolé(e), ce n'est pas possible.", vi: "Mình xin lỗi, không được rồi." },
        { fr: "Je m'excuse, mais je ne peux pas.", vi: "Cho mình xin lỗi, mình không đi được." },
      ],
    },
  ],

  "b1-atelier": [
    {
      heading: "Pour proposer une sortie (à un groupe)",
      structure: "Giới thiệu hoạt động trước đám đông. Mở đầu: « Nous vous proposons + danh từ/de + inf. ». Nhấn giá trị: « C'est l'occasion de + inf. », « C'est une expérience unique / agréable / amusante ».",
      phrases: [
        { fr: "Nous vous proposons une balade de deux heures en canoë-kayak.", vi: "Chúng tôi đề xuất một chuyến chèo kayak hai tiếng." },
        { fr: "En ce moment, il y a une exposition de peinture.", vi: "Hiện đang có một triển lãm tranh." },
        { fr: "Au programme : une visite guidée inédite.", vi: "Chương trình gồm: một chuyến tham quan có hướng dẫn hoàn toàn mới." },
        { fr: "C'est l'occasion de découvrir la ville autrement.", vi: "Đây là dịp để khám phá thành phố theo cách khác." },
        { fr: "C'est un bon plan pour les familles.", vi: "Đây là lựa chọn hay cho các gia đình." },
        { fr: "C'est une expérience unique.", vi: "Đó là một trải nghiệm độc nhất." },
      ],
    },
    {
      heading: "Pour donner des informations pratiques",
      structure: "Thông tin hậu cần. Giá: « L'entrée coûte + số € » hoặc « Le tarif est de + số € par personne ». Bắt buộc: « Il faut + inf. ». Hẹn địa điểm: « Rendez-vous à + giờ/nơi ».",
      phrases: [
        { fr: "Il faut réserver les places.", vi: "Cần đặt chỗ trước." },
        { fr: "L'entrée coûte 8 €.", vi: "Vé vào cửa 8 euro." },
        { fr: "Le tarif est de 16,50 € par personne.", vi: "Giá là 16,50 euro mỗi người." },
        { fr: "Inscriptions 3 jours à l'avance.", vi: "Đăng ký trước 3 ngày." },
        { fr: "Rendez-vous à 13 h 30 à l'arrêt du tram T1.", vi: "Hẹn lúc 13h30 tại trạm tram T1." },
      ],
    },
  ],

  // ─── Unité 2 · Je me souviens ─────────────────────────────────────
  "b2-a": [
    {
      heading: "Pour raconter un souvenir",
      structure: "Hai động từ chính để mở đầu một kỷ niệm: « se souvenir DE + danh từ » (nhớ về), « se rappeler + danh từ » (không có « de »! nhớ lại). Sau đó thường chuyển sang imparfait để tả chi tiết.",
      phrases: [
        { fr: "Je me souviens des confitures de ma grand-mère.", vi: "Tôi nhớ về mứt của bà tôi." },
        { fr: "Je me rappelle les bugnes qu'elle nous préparait.", vi: "Tôi nhớ lại món bugnes mà bà từng làm." },
        { fr: "Ça sentait bon !", vi: "Thơm quá!" },
        { fr: "C'est gravé dans ma mémoire.", vi: "Nó khắc sâu trong ký ức tôi." },
        { fr: "Ça me rappelle mon enfance.", vi: "Cái đó làm tôi nhớ lại tuổi thơ." },
      ],
    },
  ],

  "b2-imparfait": [
    {
      heading: "Pour parler d'une habitude passée",
      structure: "Dùng imparfait để kể một điều TỪNG lặp đi lặp lại, rồi đối lập với hiện tại. Cấu trúc quen thuộc: « Avant, + imparfait. Maintenant/Aujourd'hui, + hiện tại. »",
      phrases: [
        { fr: "Avant, je partais avec mes parents.", vi: "Trước đây, tôi hay đi cùng bố mẹ." },
        { fr: "À cette époque, on allait chaque année à la mer.", vi: "Hồi đó, năm nào chúng tôi cũng ra biển." },
        { fr: "Quand j'étais petit(e), nous nous voyions tous les jours.", vi: "Hồi bé, ngày nào chúng tôi cũng gặp nhau." },
        { fr: "Maintenant, c'est différent : je pars avec des amis.", vi: "Giờ thì khác rồi: tôi đi cùng bạn bè." },
      ],
    },
  ],

  "b2-e": [
    {
      heading: "Pour interroger sur un souvenir",
      structure: "Hỏi về trải nghiệm quá khứ, thường dùng thì hiện tại (vì hỏi về cảm nhận BÂY GIỜ về việc đã qua) hoặc futur proche (hỏi ý định).",
      phrases: [
        { fr: "Quels souvenirs vous gardez de votre expérience ?", vi: "Bạn giữ lại những kỷ niệm gì từ trải nghiệm đó?" },
        { fr: "Vous êtes content(e) de votre expérience ?", vi: "Bạn có hài lòng với trải nghiệm đó không?" },
        { fr: "Vous allez recommencer l'expérience ?", vi: "Bạn có định làm lại trải nghiệm đó không?" },
        { fr: "Ça s'est bien passé ?", vi: "Mọi việc có suôn sẻ không?" },
      ],
    },
  ],

  "b2-h": [
    {
      heading: "Pour parler des souvenirs qu'on rapporte de vacances",
      structure: "Dùng « rapporter/ramener + danh từ » (mang về). Nhớ đặt tính từ đúng vị trí — tính từ ngắn/quen thuộc (joli, bon, petit) đứng TRƯỚC danh từ.",
      phrases: [
        { fr: "En général, je rapporte une petite spécialité locale.", vi: "Thường thì tôi mang về một món đặc sản địa phương nho nhỏ." },
        { fr: "J'aime bien ramener un joli objet artisanal.", vi: "Tôi thích mang về một món đồ thủ công xinh xắn." },
        { fr: "Ce n'est pas du tout mon truc, les souvenirs-gadgets.", vi: "Đồ lưu niệm kiểu gadget chả phải gu tôi tí nào." },
        { fr: "J'achète toujours d'excellentes épices.", vi: "Tôi luôn mua gia vị cực ngon." },
      ],
    },
  ],

  "b2-atelier": [
    {
      heading: "Pour présenter une exposition photo",
      structure: "Giới thiệu một chủ đề trước lớp. Mở đầu: « Nous avons choisi + danh từ ». Tả thời kỳ bằng imparfait (vì đó là thói quen/đặc trưng của cả một giai đoạn): « on portait, on écoutait, on utilisait ».",
      phrases: [
        { fr: "Nous avons choisi les années 80.", vi: "Chúng tôi đã chọn thập niên 80." },
        { fr: "À cette époque, on portait des vêtements très colorés.", vi: "Hồi đó, người ta mặc quần áo rất sặc sỡ." },
        { fr: "On écoutait cette musique tout le temps.", vi: "Người ta nghe loại nhạc này suốt ngày." },
        { fr: "Cette photo montre un objet emblématique de cette période.", vi: "Bức ảnh này cho thấy một món đồ tiêu biểu của thời kỳ đó." },
      ],
    },
  ],

  // ─── Unité 3 · Comme à la maison ──────────────────────────────────
  "b3-c": [
    {
      heading: "Pour louer un logement",
      structure: "Mở đầu cuộc gọi hỏi thuê nhà: « Je suis intéressé(e) par votre annonce. » Hỏi thông tin bằng « Quel(le) est + danh từ ? » — quelle est la superficie, quel est le montant du loyer. Hỏi có bao gồm gì không: « Ça inclut + danh từ ? »",
      phrases: [
        { fr: "Je suis intéressé(e) par votre annonce.", vi: "Tôi quan tâm đến tin đăng của bạn." },
        { fr: "Quelle est la superficie du logement ?", vi: "Diện tích chỗ ở là bao nhiêu?" },
        { fr: "Quel est le montant du loyer ?", vi: "Tiền thuê nhà là bao nhiêu?" },
        { fr: "Ça inclut les charges ?", vi: "Cái đó có bao gồm phí dịch vụ không?" },
        { fr: "Quand est-ce que je peux venir visiter ?", vi: "Khi nào tôi có thể đến xem nhà?" },
      ],
    },
  ],

  "b3-e": [
    {
      heading: "Pour comparer deux logements ou deux façons de vivre",
      structure: "Dùng cấu trúc so sánh học ở ngữ pháp: plus/moins/aussi + tính từ + que (so sánh tính chất); autant de + danh từ + que (so sánh số lượng); meilleur/mieux cho trường hợp bất quy tắc.",
      phrases: [
        { fr: "C'est plus calme qu'en ville.", vi: "Ở đây yên tĩnh hơn thành phố." },
        { fr: "On a autant de pièces que dans notre ancien appartement.", vi: "Chúng tôi có số phòng bằng căn hộ cũ." },
        { fr: "On a un meilleur cadre de vie.", vi: "Chúng tôi có môi trường sống tốt hơn." },
        { fr: "On vit mieux ici qu'avant.", vi: "Ở đây sống tốt hơn trước." },
      ],
    },
  ],

  "b3-i": [
    {
      heading: "Pour exprimer sa déception",
      structure: "Ba câu cảm thán ngắn, đi từ nhẹ tới mạnh hơn một chút: Zut ! (thân mật) → Mince ! (thân mật, hơi mạnh hơn) → C'est dommage. (trung tính, có thể dùng trang trọng hơn).",
      phrases: [
        { fr: "Zut !", vi: "Chết thật!" },
        { fr: "Mince !", vi: "Ôi trời!" },
        { fr: "C'est dommage.", vi: "Tiếc quá." },
      ],
    },
    {
      heading: "Pour consoler, réconforter",
      structure: "Trấn an người khác: « Ce n'est pas grave » (không sao đâu), « Ça va aller » (rồi sẽ ổn thôi), « Courage ! » (cố lên!), « Ne t'inquiète pas » (đừng lo).",
      phrases: [
        { fr: "Ce n'est pas grave.", vi: "Không sao đâu." },
        { fr: "Ça va aller.", vi: "Rồi sẽ ổn thôi." },
        { fr: "Courage !", vi: "Cố lên!" },
        { fr: "Ne t'inquiète pas.", vi: "Đừng lo lắng." },
      ],
    },
  ],

  "b3-atelier": [
    {
      heading: "Pour choisir un logement (en groupe)",
      structure: "Đặt câu hỏi để cả nhóm thống nhất tiêu chí trước khi tìm nhà: nơi ở, loại nhà, số phòng, có nội thất hay không, không gian phụ (vườn, ban công, ga-ra…).",
      phrases: [
        { fr: "Où voulez-vous habiter ?", vi: "Các bạn muốn sống ở đâu?" },
        { fr: "Est-ce mieux de prendre un appartement ou une maison ?", vi: "Nên thuê căn hộ hay nhà riêng thì hơn?" },
        { fr: "Combien de chambres sont nécessaires ?", vi: "Cần bao nhiêu phòng ngủ?" },
        { fr: "Préférez-vous un logement meublé ou non meublé ?", vi: "Các bạn thích nhà có sẵn nội thất hay không?" },
      ],
    },
    {
      heading: "Pour mettre vos informations en commun",
      structure: "Trình bày ý kiến và đi đến thống nhất chung, dùng lại cấu trúc so sánh + mệnh đề si vừa học.",
      phrases: [
        { fr: "Je préfère habiter en ville : c'est plus animé qu'à la campagne.", vi: "Tôi thích sống ở thành phố hơn: nhộn nhịp hơn ở quê." },
        { fr: "Une maison, c'est mieux qu'un appartement parce que c'est plus grand.", vi: "Nhà riêng thì tốt hơn căn hộ vì rộng hơn." },
        { fr: "Si vous êtes d'accord, on peut prendre un logement meublé.", vi: "Nếu mọi người đồng ý, ta có thể chọn nhà có sẵn nội thất." },
        { fr: "J'ai trouvé un appartement qui a trois chambres et un grand salon.", vi: "Tôi tìm được một căn hộ có ba phòng ngủ và phòng khách rộng." },
      ],
    },
  ],

  // ─── Unité 4 · Tous pareils, tous différents ──────────────────────
  "b4-a": [
    {
      heading: "Pour faire le portrait physique de quelqu'un",
      structure: "Tả tóc/dáng người bằng « avoir + danh từ » hoặc « être + tính từ ». Chiều cao: « mesurer + số ». Size quần áo: « faire une taille + số ».",
      phrases: [
        { fr: "Il/Elle a les cheveux blancs/blonds/bruns, courts/longs.", vi: "Anh ấy/Cô ấy có tóc trắng/vàng/nâu, ngắn/dài." },
        { fr: "Il/Elle fait une taille 44.", vi: "Anh ấy/Cô ấy mặc size 44." },
        { fr: "Il/Elle est grand(e) / petit(e).", vi: "Anh ấy/Cô ấy cao / thấp." },
        { fr: "Il/Elle mesure 1,55 m.", vi: "Anh ấy/Cô ấy cao 1m55." },
        { fr: "Il/Elle est costaud(e) = corpulent(e).", vi: "Anh ấy/Cô ấy vạm vỡ = đẫy đà." },
        { fr: "Il/Elle ressemble à…", vi: "Anh ấy/Cô ấy giống…" },
      ],
    },
  ],

  "b4-b": [
    {
      heading: "Pour faire un compliment",
      structure: "Khen ngợi ngắn gọn, thân mật — dùng được với người lạ, không cần lý do đặc biệt.",
      phrases: [
        { fr: "Vous êtes une fée !", vi: "Bạn đúng là một bà tiên!" },
        { fr: "Tu es trop fort(e) !", vi: "Bạn giỏi quá!" },
        { fr: "Vous êtes la chance de ma journée.", vi: "Gặp bạn là may mắn của ngày hôm nay." },
        { fr: "Cette couleur te/vous donne bonne mine.", vi: "Màu này làm bạn trông thật khỏe khoắn." },
      ],
    },
  ],

  "b4-d": [
    {
      heading: "Pour parler du caractère de quelqu'un",
      structure: "« être du genre / d'un naturel + tính từ » để mô tả xu hướng tính cách chung. « être doué(e) pour + danh từ » để khen năng lực. « c'est quelqu'un/une personne de/qui... » để giới thiệu tính cách người khác.",
      phrases: [
        { fr: "Il/Elle est du genre extraverti.", vi: "Anh ấy/Cô ấy thuộc kiểu người hướng ngoại." },
        { fr: "Il/Elle est d'un naturel timide.", vi: "Anh ấy/Cô ấy vốn tính nhút nhát." },
        { fr: "Il/Elle est doué(e) pour la communication.", vi: "Anh ấy/Cô ấy có năng khiếu giao tiếp." },
        { fr: "C'est quelqu'un de discret.", vi: "Đó là người kín đáo." },
        { fr: "C'est une personne sociable.", vi: "Đó là người hòa đồng." },
      ],
    },
  ],

  "b4-h": [
    {
      heading: "Pour choisir une photo de profil",
      structure: "Dùng pronom possessif (la mienne, la tienne…) khi so sánh ảnh của mình với người khác, tránh lặp từ « photo ».",
      phrases: [
        { fr: "Sur ce réseau, je préfère une photo sérieuse.", vi: "Trên mạng này, tôi thích ảnh nghiêm túc hơn." },
        { fr: "J'aime bien montrer mes passions en photo.", vi: "Tôi thích thể hiện đam mê của mình qua ảnh." },
        { fr: "C'est la mienne. / C'est la tienne.", vi: "Đó là của tôi. / Đó là của bạn." },
        { fr: "Voici les miennes !", vi: "Đây là của tôi (số nhiều)!" },
      ],
    },
  ],

  "b4-i": [
    {
      heading: "Pour parler d'un souvenir scolaire",
      structure: "Kể lại một kỷ niệm học đường, dùng imparfait (đã học ở Unité 2) để tả thói quen/khung cảnh.",
      phrases: [
        { fr: "Chez nous, on disait « ouistiti » pour la photo.", vi: "Ở chỗ chúng tôi, người ta hay nói “ouistiti” khi chụp ảnh." },
        { fr: "C'était un moment important de l'année.", vi: "Đó là một khoảnh khắc quan trọng trong năm." },
        { fr: "Je me souviens de ma photo de classe en CM2.", vi: "Tôi nhớ tấm ảnh lớp hồi lớp 5 của mình." },
      ],
    },
  ],

  "b4-atelier": [
    {
      heading: "Pour décrire une œuvre d'art",
      structure: "Khuôn mẫu mô tả tác phẩm nghệ thuật: loại tác phẩm → chủ đề → bố cục (vị trí) → màu sắc → cảm xúc.",
      phrases: [
        { fr: "C'est un tableau/une photographie/un dessin. Cette œuvre date de…", vi: "Đây là một bức tranh/bức ảnh/bản vẽ. Tác phẩm này có từ năm…" },
        { fr: "On voit… / On observe… / Elle représente…", vi: "Ta thấy… / Ta quan sát thấy… / Nó thể hiện…" },
        { fr: "Au premier plan, au centre, à gauche, à droite.", vi: "Ở tiền cảnh, ở giữa, bên trái, bên phải." },
        { fr: "Les couleurs sont chaudes/froides, claires/sombres.", vi: "Màu sắc ấm/lạnh, sáng/tối." },
        { fr: "Cette œuvre inspire la joie/la tristesse/la surprise.", vi: "Tác phẩm này gợi lên niềm vui/nỗi buồn/sự ngạc nhiên." },
      ],
    },
  ],

  // ─── Unité 5 · En route vers le futur ! ───────────────────────────
  "b5-a": [
    {
      heading: "Pour parler du futur, imaginer l'avenir",
      structure: "Dùng futur simple. Mở đầu bằng mốc thời gian mơ hồ: « Bientôt », « Un jour », « Dans un avenir proche » — không cần ngày giờ chính xác, chỉ cần chia đúng futur.",
      phrases: [
        { fr: "Bientôt, il y aura des maisons qui pourront se téléporter.", vi: "Chẳng bao lâu nữa, sẽ có những ngôi nhà có thể dịch chuyển tức thời." },
        { fr: "Un jour, il y aura de petites navettes.", vi: "Một ngày nào đó, sẽ có những chiếc xe con thoi nhỏ." },
        { fr: "Dans le futur, on mangera un comprimé pour nos repas.", vi: "Trong tương lai, người ta sẽ ăn một viên thuốc thay bữa ăn." },
        { fr: "Ça paraît loin la vie dans trente ans !", vi: "Cuộc sống sau ba mươi năm nghe xa vời quá!" },
        { fr: "Dans un avenir proche, des robots nous serviront.", vi: "Trong tương lai gần, robot sẽ phục vụ chúng ta." },
      ],
    },
  ],

  "b5-d": [
    {
      heading: "Pour exprimer sa surprise",
      structure: "Từ trang trọng đến rất thân mật. « C'est pas possible ! » và « Ah bon ? » dùng được rộng rãi; « Ça alors ! », « C'est pas vrai ! », « Quoi ? », « Sérieux ? » chỉ dùng trong văn nói thân mật.",
      phrases: [
        { fr: "C'est pas possible !", vi: "Không thể nào!" },
        { fr: "Ah bon ?", vi: "Vậy à?" },
        { fr: "Ça alors !", vi: "Trời đất ơi! (thân mật)" },
        { fr: "C'est pas vrai !", vi: "Không đời nào! (thân mật)" },
        { fr: "Sérieux ?", vi: "Thật á? (thân mật)" },
      ],
    },
  ],

  "b5-si": [
    {
      heading: "Pour poser des conditions",
      structure: "Dùng « si + hiện tại » để nêu điều kiện, theo sau bằng hiện tại/mệnh lệnh/tương lai tùy mức chắc chắn. Dùng « quand + tương lai » khi chắc chắn việc đó sẽ xảy ra.",
      phrases: [
        { fr: "Si tu m'achètes un portable, je…", vi: "Nếu bố/mẹ mua điện thoại cho con, con sẽ…" },
        { fr: "Si tu as un portable, tu devras faire attention.", vi: "Nếu con có điện thoại, con sẽ phải cẩn thận." },
        { fr: "Quand tu seras plus grand(e), tu comprendras.", vi: "Khi con lớn hơn, con sẽ hiểu." },
        { fr: "D'accord, mais seulement si tu…", vi: "Được, nhưng chỉ khi con…" },
      ],
    },
  ],

  "b5-atelier": [
    {
      heading: "Pour présenter une invention ou une découverte",
      structure: "Khuôn phỏng vấn: hỏi về khoảnh khắc nảy ra ý tưởng, rồi hỏi về công dụng/đặc điểm phát minh. Trả lời bằng « Cette invention sert à… », nhấn mạnh tính cách mạng bằng « … est révolutionnaire parce que… ».",
      phrases: [
        { fr: "Cette invention sert à…", vi: "Phát minh này dùng để…" },
        { fr: "Cette découverte est révolutionnaire parce que…", vi: "Khám phá này mang tính cách mạng vì…" },
        { fr: "Dans le futur, cette invention permettra de…", vi: "Trong tương lai, phát minh này sẽ giúp…" },
        { fr: "Comment avez-vous eu cette idée ?", vi: "Ông/Bà đã có ý tưởng này như thế nào?" },
      ],
    },
  ],

  // ─── Unité 6 · En cuisine ──────────────────────────────────────────
  "b6-c": [
    {
      heading: "Pour comprendre des instructions de cuisine",
      structure: "Công thức nấu ăn luôn viết ở thể MỆNH LỆNH (impératif, ngôi vous), theo đúng thứ tự các bước. Mỗi câu thường chỉ có MỘT động từ hành động + nguyên liệu/thời gian.",
      phrases: [
        { fr: "Mélangez le lait avec la crème.", vi: "Trộn sữa với kem." },
        { fr: "Coupez le beurre en petits morceaux.", vi: "Cắt bơ thành từng miếng nhỏ." },
        { fr: "Versez la pâte sur les fruits.", vi: "Đổ bột nhão lên trên quả." },
        { fr: "Faites cuire pendant 35-40 minutes.", vi: "Nấu trong 35-40 phút." },
        { fr: "Ajoutez des feuilles de menthe.", vi: "Thêm lá bạc hà." },
      ],
    },
  ],

  "b6-d": [
    {
      heading: "Pour mettre en garde",
      structure: "Dùng « Faites attention à… » để cảnh báo chung, hoặc « Attention ! » đơn giản trước một nguy cơ cụ thể. Có thể kết hợp với « il est dangereux de + infinitif » hoặc l'impératif phủ định.",
      phrases: [
        { fr: "Faites attention aux températures de conservation des aliments.", vi: "Chú ý nhiệt độ bảo quản thực phẩm." },
        { fr: "Attention ! C'est dangereux.", vi: "Cẩn thận! Nguy hiểm đấy." },
        { fr: "Ne laissez pas d'animal entrer dans votre cuisine.", vi: "Đừng để động vật vào bếp." },
        { fr: "Il est interdit de… / Il ne faut pas…", vi: "Bị cấm… / Không được…" },
      ],
    },
  ],

  "b6-h": [
    {
      heading: "Pour communiquer au restaurant",
      structure: "Khuôn hội thoại chuẩn khi ăn nhà hàng: người phục vụ hỏi món → khách gọi món bằng « je voudrais » → hỏi ý kiến bằng « Qu'est-ce que vous me conseillez ? » → cuối bữa, phục vụ hỏi cảm nhận bằng « Ça vous a plu ? ».",
      phrases: [
        { fr: "Vous avez choisi ? – En entrée, je voudrais…", vi: "Anh/chị đã chọn món chưa? – Món khai vị, tôi muốn…" },
        { fr: "Quel est le plat du jour ? – Le plat du jour est…", vi: "Món đặc biệt hôm nay là gì? – Món hôm nay là…" },
        { fr: "Qu'est-ce que vous me conseillez ? – C'est la spécialité de la maison.", vi: "Anh/chị gợi ý món gì? – Đó là đặc sản của quán." },
        { fr: "Vous prendrez des desserts ? – Oui, c'est quoi… ?", vi: "Anh/chị dùng tráng miệng chứ? – Vâng, … là món gì vậy?" },
        { fr: "Ça vous a plu ? – Oui, c'était très bon !", vi: "Anh/chị có thích không? – Có, ngon lắm!" },
      ],
    },
  ],

  "b6-i": [
    {
      heading: "Pour exprimer sa satisfaction",
      structure: "Dùng các cụm cảm thán ngắn (un régal !) hoặc « avoir un coup de cœur pour… » để diễn tả sự yêu thích mạnh mẽ, tức thì.",
      phrases: [
        { fr: "(C'est) un régal !", vi: "Ngon tuyệt!" },
        { fr: "J'ai eu un coup de cœur.", vi: "Tôi đã yêu thích ngay lập tức." },
        { fr: "Je suis ravi(e) de cette expérience.", vi: "Tôi rất hài lòng với trải nghiệm này." },
        { fr: "Je ne peux en dire que du bien.", vi: "Tôi chỉ có thể nói tốt về nó thôi." },
      ],
    },
    {
      heading: "Pour exprimer son insatisfaction",
      structure: "Dùng « trop + tính từ » để chỉ ra điều gì đó thái quá, hoặc câu cảm thán mạnh (C'est une honte ! C'est scandaleux !) để phản ánh sự bức xúc.",
      phrases: [
        { fr: "Le service est trop lent.", vi: "Dịch vụ phục vụ quá chậm." },
        { fr: "Les plats étaient trop…", vi: "Các món ăn thì quá…" },
        { fr: "Les plats sont mauvais.", vi: "Món ăn dở." },
        { fr: "C'est une honte !", vi: "Thật là một điều đáng xấu hổ!" },
        { fr: "C'est scandaleux de payer aussi cher !", vi: "Trả nhiều tiền thế này thì thật là tai tiếng!" },
      ],
    },
  ],

  "b6-atelier": [
    {
      heading: "Pour parler d'habitudes alimentaires",
      structure: "Dùng « ≠ » để đối lập hai khái niệm gần giống nhau nhưng KHÁC nhau (ví dụ ăn thịt/cá ≠ ăn chay), tránh nhầm lẫn khi khảo sát hoặc trình bày kết quả.",
      phrases: [
        { fr: "Manger de la viande ou du poisson ≠ être végétarien(ne).", vi: "Ăn thịt hoặc cá ≠ là người ăn chay." },
        { fr: "Manger des produits d'origine animale ≠ être végan(e).", vi: "Ăn sản phẩm từ động vật ≠ là người ăn thuần chay." },
        { fr: "Manger des plats préparés ≠ faits maison.", vi: "Ăn đồ ăn sẵn ≠ đồ tự nấu." },
        { fr: "Partager des photos de plats en ligne / sur les réseaux.", vi: "Chia sẻ ảnh món ăn trực tuyến / trên mạng xã hội." },
      ],
    },
  ],

  // ─── Unité 7 · À votre santé ! ──────────────────────────────────────
  "b7-a": [
    {
      heading: "Pour donner un conseil (1)",
      structure: "Dùng « il est important/conseillé de + infinitif » để khuyên chung chung, hoặc « je vous/te recommande/déconseille de + infinitif » để khuyên một cách cá nhân, trực tiếp. Dạng phủ định của « recommander » là « déconseiller ».",
      phrases: [
        { fr: "Il est important d'être attentif(ve) à votre position de sommeil.", vi: "Việc chú ý đến tư thế ngủ của bạn là quan trọng." },
        { fr: "Il est conseillé de dormir sur le côté.", vi: "Nên nằm nghiêng khi ngủ." },
        { fr: "Il faut poser sa tête au milieu de l'oreiller.", vi: "Phải đặt đầu ở giữa chiếc gối." },
        { fr: "Je vous recommande de placer un oreiller entre vos jambes.", vi: "Tôi khuyên bạn nên đặt một chiếc gối giữa hai chân." },
        { fr: "Je te déconseille de dormir sur le ventre.", vi: "Tôi khuyên bạn không nên ngủ sấp." },
      ],
    },
  ],

  "b7-e": [
    {
      heading: "Pour parler des problèmes de santé",
      structure: "Khuôn hội thoại chuẩn ở phòng khám/nhà thuốc: dược sĩ hỏi triệu chứng bằng « Qu'est-ce qui ne va pas ? » và các câu hỏi có/không cụ thể; người bệnh trả lời bằng « je suis/j'ai + triệu chứng ».",
      phrases: [
        { fr: "Qu'est-ce qui ne va pas ? — Je suis un peu patraque.", vi: "Bạn thấy không khỏe chỗ nào? — Tôi thấy hơi mệt trong người." },
        { fr: "Vous avez consulté votre médecin ? — Je me sens fatigué(e).", vi: "Bạn đã đi khám bác sĩ chưa? — Tôi thấy mệt." },
        { fr: "Vous toussez ? — J'ai le nez bouché.", vi: "Bạn có ho không? — Tôi bị nghẹt mũi." },
        { fr: "Vous avez mal à la gorge ? — J'ai mal à la tête.", vi: "Bạn có đau họng không? — Tôi bị đau đầu." },
        { fr: "Vous avez de la fièvre ?", vi: "Bạn có bị sốt không?" },
      ],
    },
  ],

  "b7-j": [
    {
      heading: "Pour exprimer son point de vue",
      structure: "Dùng « pour nous/moi » để nêu quan điểm cá nhân/tập thể, hoặc « je crois/pense/trouve que » + mệnh đề, hoặc « à mon avis » đứng đầu câu — cả ba cách đều có thể thay nhau khi trình bày ý kiến.",
      phrases: [
        { fr: "Pour nous/moi, ce n'est pas suffisant.", vi: "Theo chúng tôi/tôi, như vậy là chưa đủ." },
        { fr: "Je crois/pense/trouve que les formations ne sont pas assez nombreuses.", vi: "Tôi tin/nghĩ/thấy rằng các khóa đào tạo chưa đủ nhiều." },
        { fr: "À mon avis, il faut appeler les secours.", vi: "Theo tôi, phải gọi cấp cứu." },
      ],
    },
  ],

  "b7-atelier": [
    {
      heading: "Pour informer des risques pour la santé",
      structure: "Khuôn câu cảnh báo/khuyên bảo trong một chiến dịch phòng ngừa sức khỏe: dùng mệnh lệnh (Évitez, Pensez à) hoặc « il est (dé)conseillé/important de + infinitif », hoặc « le mieux, c'est de + infinitif » để đề xuất giải pháp tốt nhất.",
      phrases: [
        { fr: "Évitez de…", vi: "Hãy tránh…" },
        { fr: "Attention à…", vi: "Chú ý đến…" },
        { fr: "Il est (dé)conseillé de…", vi: "Nên (không nên)…" },
        { fr: "Il est important de…", vi: "Điều quan trọng là…" },
        { fr: "Pensez à…", vi: "Hãy nhớ…" },
        { fr: "La meilleure manière de…, c'est…", vi: "Cách tốt nhất để…, đó là…" },
        { fr: "Le mieux, c'est de…", vi: "Tốt nhất là…" },
      ],
    },
  ],

  // ─── Unité 8 · Dans les médias ───────────────────────────────────────
  "b8-b": [
    {
      heading: "Pour exprimer sa préférence",
      structure: "Dùng « aimer mieux + inf. » hoặc « préférer + nom + à + nom » để so sánh hai lựa chọn, hoặc đơn giản « c'est mieux (que…) » để kết luận.",
      phrases: [
        { fr: "J'aime mieux lire la presse en ligne.", vi: "Tôi thích đọc báo mạng hơn." },
        { fr: "Je préfère les réseaux sociaux aux médias traditionnels.", vi: "Tôi thích mạng xã hội hơn các phương tiện truyền thông truyền thống." },
        { fr: "C'est mieux (que…).", vi: "Cái này tốt hơn (so với…)." },
      ],
    },
  ],

  "b8-d": [
    {
      heading: "Pour exprimer son intérêt",
      structure: "Dùng « ça m'/nous intéresse/passionne » hoặc « je m'intéresse à + nom » để nói mình quan tâm đến điều gì; « c'est fascinant/passionnant » để nhấn mạnh; « je suis curieux/curieuse de + inf. » để nói mình tò mò muốn biết.",
      phrases: [
        { fr: "Ça m'/nous intéresse !", vi: "Điều đó khiến tôi/chúng tôi quan tâm!" },
        { fr: "Ça me/nous passionne.", vi: "Điều đó khiến tôi/chúng tôi say mê." },
        { fr: "Je m'intéresse à leur vie !", vi: "Tôi quan tâm đến cuộc sống của họ!" },
        { fr: "C'est fascinant ! C'est passionnant !", vi: "Thật hấp dẫn! Thật đam mê!" },
        { fr: "Je suis curieux/curieuse de savoir/de comprendre comment ça fonctionne.", vi: "Tôi tò mò muốn biết/hiểu nó hoạt động thế nào." },
      ],
    },
  ],

  "b8-h": [
    {
      heading: "Pour faire une critique positive",
      structure: "Dùng « ce film est/c'est + tính từ » để đánh giá chung, « j'ai (bien) aimé » hoặc « ce film m'a (beaucoup) plu » để nói cảm nhận cá nhân.",
      phrases: [
        { fr: "Ce film est une bonne surprise.", vi: "Bộ phim này là một bất ngờ thú vị." },
        { fr: "C'est passionnant !", vi: "Thật hấp dẫn!" },
        { fr: "C'est très bien filmé !", vi: "Phim được quay rất đẹp!" },
        { fr: "Je trouve ce film intéressant.", vi: "Tôi thấy bộ phim này thú vị." },
        { fr: "J'ai bien aimé.", vi: "Tôi rất thích." },
        { fr: "Ce film m'a (beaucoup) plu.", vi: "Bộ phim này khiến tôi (rất) thích." },
      ],
    },
    {
      heading: "Pour faire une critique négative",
      structure: "Dùng « je n'ai pas (du tout) aimé » để phủ định trực tiếp, hoặc « le/la + nom + est + tính từ tiêu cực » để chỉ ra điểm yếu cụ thể (scénario, histoire…).",
      phrases: [
        { fr: "Je n'ai pas du tout aimé.", vi: "Tôi không thích chút nào." },
        { fr: "Le scénario est mauvais.", vi: "Kịch bản tệ." },
        { fr: "Ce film n'est pas réaliste.", vi: "Bộ phim này không thực tế." },
        { fr: "C'est (très) ennuyeux.", vi: "Cái này (rất) nhàm chán." },
        { fr: "Je l'ai trouvé(e) nul(le).", vi: "Tôi thấy nó dở tệ." },
      ],
    },
  ],

  "b8-atelier": [
    {
      heading: "Pour faire la critique d'un média",
      structure: "Dùng « grâce à ce média » để mở đầu một lập luận tích cực (kèm parce que/car/c'est pour ça que), và « à cause de ce média » để mở đầu một lập luận tiêu cực — đúng theo cấu trúc nguyên nhân-kết quả của Unité 8.",
      phrases: [
        { fr: "C'est intéressant d'écouter des podcasts, parce que…", vi: "Thật thú vị khi nghe podcast, bởi vì…" },
        { fr: "La télé, c'est très bien parce que…", vi: "Truyền hình rất hay bởi vì…" },
        { fr: "Nous trouvons les journaux très intéressants, car…", vi: "Chúng tôi thấy báo chí rất thú vị, vì…" },
        { fr: "C'est pour ça que le cinéma est un art passionnant.", vi: "Đó là lý do vì sao điện ảnh là một môn nghệ thuật đầy đam mê." },
        { fr: "Regarder la télévision, ce n'est pas très intéressant pour nous.", vi: "Xem truyền hình không thú vị lắm đối với chúng tôi." },
        { fr: "Les réseaux sociaux, c'est nul, parce que…", vi: "Mạng xã hội thật tệ, bởi vì…" },
        { fr: "On trouve les journaux ennuyeux, parce que…", vi: "Chúng tôi thấy báo chí nhàm chán, bởi vì…" },
      ],
    },
  ],

  // ─── Unité 9 · Consommer responsable ────────────────────────────────
  "b9-a": [
    {
      heading: "Pour exprimer un souhait, un désir",
      structure: "Diễn đạt một ước muốn: « espérer que + phrase », « avoir envie de + inf. », « vouloir/souhaiter + inf. » ở présent, hoặc — LỊCH SỰ HƠN — ở conditionnel présent (je voudrais, je souhaiterais, j'aimerais).",
      phrases: [
        { fr: "J'espère que je vais apprendre à résister.", vi: "Tôi hy vọng mình sẽ học được cách kiềm chế." },
        { fr: "J'ai envie d'essayer ce défi.", vi: "Tôi rất muốn thử thử thách này." },
        { fr: "Je veux/Je voudrais emprunter des livres.", vi: "Tôi muốn mượn sách." },
        { fr: "Je souhaite/Je souhaiterais économiser de l'argent.", vi: "Tôi mong/Tôi ước gì có thể tiết kiệm được tiền." },
        { fr: "J'aimerais arrêter d'acheter du matériel de sport.", vi: "Tôi muốn ngừng mua dụng cụ thể thao." },
      ],
    },
  ],

  "b9-c": [
    {
      heading: "Pour donner un conseil (2)",
      structure: "6 cách khuyên ai làm gì: « il faut + inf. » (nêu chung chung), « c'est mieux de + inf. », « tu devrais + inf. » (conditionnel), « je te conseille de + inf. », « tu pourrais + inf. » (conditionnel, nhẹ nhàng hơn), hoặc mệnh lệnh cách « Regarde… ! ».",
      phrases: [
        { fr: "Il faut préciser la marque.", vi: "Cần phải ghi rõ nhãn hiệu." },
        { fr: "C'est mieux de porter les vêtements.", vi: "Tốt hơn là nên mặc quần áo (khi chụp ảnh)." },
        { fr: "Tu devrais refaire les photos.", vi: "Bạn nên chụp lại ảnh." },
        { fr: "Je te conseille de prendre tes photos vers midi.", vi: "Tôi khuyên bạn nên chụp ảnh vào khoảng giữa trưa." },
        { fr: "Tu pourrais lire ce livre.", vi: "Bạn có thể đọc cuốn sách này." },
        { fr: "Regarde aussi les autres annonces !", vi: "Hãy xem thêm các tin rao khác nữa!" },
      ],
    },
  ],

  "b9-h": [
    {
      heading: "Pour demander un service",
      structure: "Xin giúp đỡ một cách lịch sự bằng conditionnel « Pourriez-vous… ? », hoặc nêu rõ nhu cầu bằng « avoir besoin de + nom », « chercher quelqu'un avec qui + inf. ».",
      phrases: [
        { fr: "Pourriez-vous m'expliquer ?", vi: "Bạn có thể giải thích cho tôi được không?" },
        { fr: "J'ai besoin d'aide en allemand.", vi: "Tôi cần giúp đỡ về tiếng Đức." },
        { fr: "Je cherche quelqu'un avec qui pratiquer l'allemand.", vi: "Tôi đang tìm người để luyện tập tiếng Đức cùng." },
      ],
    },
    {
      heading: "Pour proposer un service",
      structure: "Đề nghị giúp đỡ ai bằng « souhaiter + inf. », « proposer de + inf. », hoặc đơn giản « pouvoir + inf. » để nêu khả năng của mình.",
      phrases: [
        { fr: "Je souhaiterais échanger des services.", vi: "Tôi mong muốn được trao đổi dịch vụ." },
        { fr: "Je propose de faire du jardinage.", vi: "Tôi đề nghị làm vườn." },
        { fr: "Je peux faire du covoiturage.", vi: "Tôi có thể đi chung xe (covoiturage)." },
      ],
    },
  ],

  "b9-atelier": [
    {
      heading: "Pour écrire une annonce",
      structure: "4 cách mở đầu một tin rao trao đổi (troc): « je donne… » (cho tặng), « je cherche… » (tìm kiếm), « je propose de + inf. » (đề nghị làm gì), « je voudrais… » (muốn có món gì / muốn làm gì, + danh từ hoặc động từ nguyên thể).",
      phrases: [
        { fr: "Je donne...", vi: "Tôi cho/tặng..." },
        { fr: "Je cherche...", vi: "Tôi đang tìm..." },
        { fr: "Je propose de faire du jardinage.", vi: "Tôi đề nghị làm vườn." },
        { fr: "Je voudrais des livres / échanger des services.", vi: "Tôi muốn có sách / trao đổi dịch vụ." },
      ],
    },
    {
      heading: "Pour demander des renseignements sur un objet ou un service",
      structure: "Hỏi thêm thông tin về một món đồ hoặc dịch vụ trước khi trao đổi: hỏi chung bằng « aimerais avoir des informations sur… », hỏi cụ thể về đặc điểm (màu sắc, kích thước, trọng lượng, chất liệu) hoặc thời gian rảnh, và đề nghị giúp đỡ bằng conditionnel lịch sự.",
      phrases: [
        { fr: "J'aimerais avoir des informations sur…", vi: "Tôi muốn có thêm thông tin về…" },
        { fr: "Comment est… ?", vi: "… như thế nào?" },
        { fr: "De quelle couleur elle est ?", vi: "Nó màu gì?" },
        { fr: "Il est grand/petit ?", vi: "Nó to/nhỏ không?" },
        { fr: "Elle est lourde/légère ?", vi: "Nó nặng/nhẹ không?" },
        { fr: "En quelle matière il est ?", vi: "Nó làm bằng chất liệu gì?" },
        { fr: "Tu pourrais m'aider à…, s'il te plaît ?", vi: "Bạn có thể giúp tôi… được không?" },
        { fr: "Ça te dirait de… ?", vi: "Bạn có muốn… không?" },
        { fr: "Quand est-ce que tu es libre ?", vi: "Khi nào thì bạn rảnh?" },
      ],
    },
  ],

  // ─── Unité 10 · Envies d'ailleurs ? ──────────────────────────────────
  "b10-a": [
    {
      heading: "Pour structurer son propos",
      structure: "4 từ nối để trình bày các bước theo thứ tự thời gian, thường dùng khi kể lại một hành trình hay đề xuất một chương trình.",
      phrases: [
        { fr: "D'abord, …", vi: "Trước tiên, …" },
        { fr: "Après, …", vi: "Sau đó, …" },
        { fr: "Ensuite, …", vi: "Tiếp theo, …" },
        { fr: "Enfin, …", vi: "Cuối cùng, …" },
      ],
    },
  ],

  "b10-b": [
    {
      heading: "Pour demander des renseignements sur un voyage",
      structure: "Xin thông tin về một chuyến đi một cách lịch sự, dùng conditionnel « je voudrais » hoặc « vous pouvez/pourriez… ? », rồi hỏi cụ thể về từng khoản (hébergement, vol, repas, période).",
      phrases: [
        { fr: "Je voudrais avoir des renseignements s'il vous plaît.", vi: "Tôi muốn được biết thêm thông tin, làm ơn." },
        { fr: "Vous pouvez me donner des précisions sur l'hébergement ?", vi: "Bạn có thể cho tôi biết thêm chi tiết về chỗ ở không?" },
        { fr: "Est-ce que les vols sont inclus dans le prix ?", vi: "Vé máy bay có được tính trong giá không?" },
        { fr: "Les repas sont compris ?", vi: "Các bữa ăn có được bao gồm không?" },
        { fr: "Quelle est la meilleure période pour visiter le Vietnam ?", vi: "Thời điểm nào là tốt nhất để đi thăm Việt Nam?" },
      ],
    },
  ],

  "b10-e": [
    {
      heading: "Pour parler d'une visite touristique — de manière positive",
      structure: "6 cách khen ngợi một chuyến tham quan, từ nhận xét chung chung (« Quelle bonne idée ! ») đến so sánh với một hình thức khác (« C'est mieux qu'avec un audioguide ! »).",
      phrases: [
        { fr: "C'est original et ludique.", vi: "Vừa độc đáo vừa vui nhộn." },
        { fr: "C'est une visite que nous avons adorée.", vi: "Đây là một chuyến tham quan mà chúng tôi rất thích." },
        { fr: "Quelle excursion !", vi: "Một chuyến du ngoạn tuyệt vời!" },
        { fr: "Ça change !", vi: "Đổi gió thật đấy!" },
        { fr: "Quelle bonne idée !", vi: "Ý tưởng hay quá!" },
        { fr: "C'est mieux qu'avec un audioguide !", vi: "Cách này tốt hơn dùng máy hướng dẫn nghe tự động!" },
      ],
    },
    {
      heading: "Pour parler d'une visite touristique — de manière négative",
      structure: "5 cách chê một chuyến tham quan, từ cảm xúc thất vọng chung (« Quelle déception ! ») đến nhận xét cụ thể về giá cả (« C'est cher pour ce que c'est ! »).",
      phrases: [
        { fr: "Quelle déception !", vi: "Thật đáng thất vọng!" },
        { fr: "C'était horrible.", vi: "Thật kinh khủng." },
        { fr: "C'est sans intérêt.", vi: "Chẳng có gì thú vị cả." },
        { fr: "Ça ne m'a pas plu.", vi: "Tôi không thích chuyến này." },
        { fr: "C'est cher pour ce que c'est !", vi: "Giá đắt so với những gì nhận được!" },
      ],
    },
  ],

  "b10-i": [
    {
      heading: "Pour exprimer l'agacement",
      structure: "2 câu ngắn để thể hiện sự khó chịu, bực mình với ai đó.",
      phrases: [
        { fr: "Tu exagères !", vi: "Bạn quá đáng rồi đấy!" },
        { fr: "Mais c'est pas possible !", vi: "Thật không thể chấp nhận được!" },
      ],
    },
    {
      heading: "Pour répondre à l'agacement",
      structure: "2 câu ngắn để trấn an người đang khó chịu với mình.",
      phrases: [
        { fr: "Ça va !", vi: "Được rồi mà!" },
        { fr: "Du calme !", vi: "Bình tĩnh nào!" },
      ],
    },
  ],

  "b10-atelier": [
    {
      heading: "Pour réagir à un article dans un commentaire",
      structure: "5 câu bình luận ngắn, tích cực để phản hồi một bài viết blog kể chuyện du lịch của bạn học.",
      phrases: [
        { fr: "J'ai bien ri !", vi: "Mình đã cười rất nhiều!" },
        { fr: "Quel beau voyage !", vi: "Chuyến đi đẹp quá!" },
        { fr: "Quelle aventure !", vi: "Một cuộc phiêu lưu thật sự!" },
        { fr: "Merci pour ces anecdotes et ces belles photos !", vi: "Cảm ơn vì những câu chuyện và những bức ảnh đẹp này!" },
        { fr: "Bravo pour ce blog !", vi: "Chúc mừng bạn về trang blog này!" },
      ],
    },
  ],
};
