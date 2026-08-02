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
};
