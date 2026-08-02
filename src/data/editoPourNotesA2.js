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
};
