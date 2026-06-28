/**
 * editoAudioNotes.js — « Pour communiquer » notes cho mỗi bài nghe B/C/F
 * Khớp với track ID trong editoAudio.js
 */

export const EDITO_POUR_NOTES = {

  // ─── Unité 1 ──────────────────────────────────────────────────────
  "u1-e": [
    {
      heading: "Pour donner ses coordonnées personnelles",
      structure: "Điền form online: « Prénom » (tên), « Nom » (họ), « Date de naissance » (ngày sinh), « E-mail » (email), « Mot de passe » (mật khẩu). Nói ngày sinh: « Je suis né(e) le + ngày + mois + année ». Email đọc: @ = arobase, . = point.",
      phrases: [
        { fr: "Prénom : [Marie] / Nom : [Dupont]", vi: "Tên: [Marie] / Họ: [Dupont]" },
        { fr: "Date de naissance : le [26 janvier 1999].", vi: "Ngày sinh: [26 tháng 1 năm 1999]." },
        { fr: "E-mail : [marie.dupont@gmail.com].", vi: "Email: [marie.dupont@gmail.com]." },
        { fr: "Mot de passe : [marie260199].", vi: "Mật khẩu: [marie260199]." },
        { fr: "Je suis né(e) le [26 janvier 1999].", vi: "Tôi sinh ngày [26 tháng 1 năm 1999]." },
      ],
    },
    {
      heading: "Pour parler de covoiturage / transport",
      structure: "Covoiturage = xe đi chung (carpooling). Chỉ điểm đến: « Paris-Angoulême » (từ Paris đến Angoulême). Ngày đi: « le + ngày ». Số người: « pour + số + passager(s) ».",
      phrases: [
        { fr: "C'est un site de covoiturage.", vi: "Đây là trang web đi chung xe." },
        { fr: "[Paris]-[Angoulême], le [24 janvier], pour [un] passager.", vi: "[Paris]-[Angoulême], ngày [24/1], cho [một] hành khách." },
        { fr: "C'est parti !", vi: "Xuất phát thôi! / Đi thôi!" },
      ],
    },
  ],

  "u1-b": [
    {
      heading: "Pour se présenter",
      structure: "Tự giới thiệu: ÊTRE + quốc tịch/nghề nghiệp (không cần mạo từ!). Tuổi: AVOIR + số + ans. Tên: « Je m'APPELLE » (động từ phản thân s'appeler).",
      phrases: [
        { fr: "Je m'appelle [prénom].", vi: "Tôi tên là [tên]." },
        { fr: "J'ai [X] ans.", vi: "Tôi [X] tuổi." },
        { fr: "Je suis [nationalité].", vi: "Tôi là người [quốc tịch]." },
      ],
    },
    {
      heading: "Pour demander des informations sur quelqu'un",
      structure: "Hỏi thông tin: « Comment + VOUS/TU + động từ ? ». Dùng VOUS (lịch sự) với người lạ/bề trên, TU (thân mật) với bạn bè. « Vous avez quel âge ? » = lịch sự ↔ « Tu as quel âge ? » = thân mật.",
      phrases: [
        { fr: "Comment vous vous appelez ? / Comment tu t'appelles ?", vi: "Bạn/Ngài tên là gì?" },
        { fr: "Vous avez quel âge ? / Tu as quel âge ?", vi: "Ngài/Bạn bao nhiêu tuổi?" },
        { fr: "Vous êtes / Tu es [nationalité] ?", vi: "Ngài/Bạn là người [quốc tịch] à?" },
      ],
    },
  ],

  "u1-f": [
    {
      heading: "Pour parler de ses goûts",
      structure: "Thang cảm xúc tăng dần: AIMER (thích) < ADORER (rất thích/mê). Hỏi: « Tu aimes + danh từ/động từ nguyên mẫu ? ». Đặc biệt: J'AIME + LE/LA/LES (nói chung), J'AIME + UN/UNE (cụ thể).",
      phrases: [
        { fr: "J'aime / J'adore [nom / infinitif].", vi: "Tôi thích / Tôi mê [danh từ / động từ]." },
        { fr: "Tu aimes [nom] ?", vi: "Bạn có thích [danh từ] không?" },
      ],
    },
    {
      heading: "Pour échanger des coordonnées",
      structure: "Trao đổi liên hệ: « Tu as + mạng xã hội ? » (hỏi đơn giản). Số điện thoại: « Quel est TON numéro ? » (ton vì thân mật). Đọc số theo từng cặp: 06 = zéro six.",
      phrases: [
        { fr: "Tu as Facebook / Instagram ?", vi: "Bạn có Facebook / Instagram không?" },
        { fr: "Quel est ton numéro [de téléphone] ?", vi: "Số [điện thoại] của bạn là gì?" },
        { fr: "C'est le [06 XX XX XX XX].", vi: "Số là [06 XX XX XX XX]." },
      ],
    },
  ],

  // ─── Unité 2 ──────────────────────────────────────────────────────
  "u2-e": [
    {
      heading: "Pour présenter quelqu'un à sa famille",
      structure: "Giới thiệu người khác: « Voici [prénom], [lien de parenté/relation] ». Lịch sự khi gặp lần đầu: « C'est un plaisir (de vous rencontrer) ! ». Hỏi nghề nghiệp: « Vous êtes/Tu es + profession ? » hoặc « Qu'est-ce que vous faites (comme travail) ? ».",
      phrases: [
        { fr: "[Prénom], voici [mes parents / mon ami(e) / ma famille].", vi: "[Tên], đây là [bố mẹ tôi / bạn tôi / gia đình tôi]." },
        { fr: "C'est un plaisir (de vous rencontrer) !", vi: "Rất vui được gặp bạn/anh/chị!" },
        { fr: "Bienvenue !", vi: "Chào mừng!" },
        { fr: "Tu es étudiant(e) ? / Vous travaillez ?", vi: "Bạn là sinh viên à? / Bạn đang đi làm à?" },
      ],
    },
    {
      heading: "Pour parler des professions et de la famille",
      structure: "Nghề nghiệp: « Je suis + profession » (KHÔNG có mạo từ sau être!). Gia đình: « Mon/ma + lien ». Hỏi: « Ils étudient ou ils travaillent ? » = câu hỏi hai lựa chọn dùng OU (hoặc).",
      phrases: [
        { fr: "Je suis [infirmière / professeure / informaticien / fleuriste].", vi: "Tôi là [y tá / giáo viên / kỹ sư IT / người bán hoa]." },
        { fr: "Je travaille à [l'hôpital / l'université / la banque].", vi: "Tôi làm việc ở [bệnh viện / trường đại học / ngân hàng]." },
        { fr: "Mon frère est [coiffeur]. Ma sœur est [actrice].", vi: "Anh tôi là [thợ cắt tóc]. Chị tôi là [diễn viên]." },
        { fr: "Ils étudient ou ils travaillent ?", vi: "Họ đang học hay đi làm?" },
      ],
    },
  ],

  "u2-b": [
    {
      heading: "Pour exprimer ses goûts",
      structure: "Thang cảm xúc đầy đủ: ADORER > AIMER > (neutre) > NE PAS AIMER > DÉTESTER. Phủ định: NE + AIMER + PAS (kẹp động từ). Đồng ý/Không đồng ý: « MOI AUSSI » (tôi cũng vậy — câu khẳng định) ↔ « MOI NON PLUS » (tôi cũng không — câu phủ định).",
      phrases: [
        { fr: "J'aime / J'adore [nom / infinitif].", vi: "Tôi thích / Tôi mê [danh từ / động từ]." },
        { fr: "Je n'aime pas [nom / infinitif].", vi: "Tôi không thích [danh từ / động từ]." },
        { fr: "Je déteste [nom / infinitif].", vi: "Tôi ghét [danh từ / động từ]." },
        { fr: "Moi aussi ! / Moi non plus !", vi: "Tôi cũng vậy! (câu ĐỀU ĐÚNG) / Tôi cũng không! (câu ĐỀU PHỦ ĐỊNH)" },
      ],
    },
  ],

  // ─── Unité 3 ──────────────────────────────────────────────────────
  "u3-b": [
    {
      heading: "Pour acheter dans un magasin",
      structure: "Hỏi giá: « Ça COÛTE combien ? » = « Combien ça COÛTE ? » (2 cách đều đúng). Trả lời: chủ ngữ + COÛTE + giá. « Ce sera tout ? » = người bán hỏi (Bạn cần thêm gì không?).",
      phrases: [
        { fr: "Ça coûte combien ? / Combien ça coûte ?", vi: "Cái này giá bao nhiêu?" },
        { fr: "[Le produit] coûte [X] euros.", vi: "[Sản phẩm] giá [X] euro." },
        { fr: "Ce sera tout ?", vi: "Bạn cần thêm gì không? (câu người bán hỏi)" },
      ],
    },
    {
      heading: "Pour payer",
      structure: "Người bán hỏi: « Vous payez COMMENT ? » (Có con chữ COMMENT = thế nào?). Khách trả lời: PAR + thẻ (carte) hoặc EN + tiền mặt (espèces). ⚠️ Luôn dùng VOUS (trang trọng) trong cửa hàng.",
      phrases: [
        { fr: "Vous payez comment ?", vi: "Bạn thanh toán thế nào?" },
        { fr: "Par carte / En espèces, s'il vous plaît.", vi: "Bằng thẻ / Bằng tiền mặt, xin cảm ơn." },
      ],
    },
  ],

  "u3-f": [
    {
      heading: "Pour parler des aliments disponibles",
      structure: "Có gì: « Il y a / On a + DU/DE LA/DES + thực phẩm ». Không có: « Il n'y a PAS / On n'a PAS DE + thực phẩm » (sau phủ định: mạo từ phân lượng → DE). « Un peu de » = một ít (không dùng mạo từ sau).",
      phrases: [
        { fr: "Il y a / On a [de la / du / des] + aliment.", vi: "Có [mạo từ phân lượng + thực phẩm]." },
        { fr: "Il n'y a pas / On n'a pas de + aliment.", vi: "Không có [thực phẩm]. (de thay mạo từ sau phủ định)" },
        { fr: "On a un peu de [huile d'olive].", vi: "Có một ít [dầu ô-liu]." },
      ],
    },
    {
      heading: "Pour faire une suggestion culinaire",
      structure: "Đề xuất: « ON + động từ ? » — ON là chủ ngữ tập thể thân mật (chúng mình), chia như IL/ELLE. « Qu'est-ce qu'on mange ? » = Chúng mình ăn gì? « Tu PRÉFÈRES » (bạn thích hơn — thể hiện ưu tiên cá nhân).",
      phrases: [
        { fr: "On fait [des pâtes] ? / On mange [une quiche] ?", vi: "Mình nấu [mì ống] nhé? / Mình ăn [bánh quiche] nhé?" },
        { fr: "Qu'est-ce qu'on mange ?", vi: "Chúng mình ăn gì đây?" },
        { fr: "Qu'est-ce que tu préfères ?", vi: "Bạn thích ăn gì hơn?" },
      ],
    },
  ],

  // ─── Unité 4 ──────────────────────────────────────────────────────
  "u4-b": [
    {
      heading: "Pour décrire un quartier / une ville",
      structure: "Tả chung: « C'EST UN quartier + tính từ ». Liệt kê: « IL Y A + mạo từ + địa điểm ». Khoảng cách: « C'EST LOIN/PRÈS DE + địa điểm » — nhớ co rút de+le → DU, de+les → DES (près du centre, pas près de le centre).",
      phrases: [
        { fr: "C'est un quartier [agréable / dynamique / calme].", vi: "Đây là một khu phố [dễ chịu / sôi động / yên tĩnh]." },
        { fr: "Il y a [des cafés / une église / une mairie].", vi: "Có [quán cà phê / nhà thờ / tòa thị chính]." },
        { fr: "C'est loin / près [du centre / de chez moi].", vi: "Xa / gần [trung tâm / nhà tôi]." },
      ],
    },
    {
      heading: "Pour situer un lieu",
      structure: "Chỉ địa điểm trực tiếp: « LÀ/ICI, C'EST + tên địa điểm » (dùng khi đang đứng tại chỗ hoặc chỉ vào bản đồ). « SUR + địa điểm, IL Y A… » (trên/ở… có…). Địa chỉ đường phố: số nhà + RUE + tên đường (không có mạo từ).",
      phrases: [
        { fr: "Là, c'est [la place du Capitole].", vi: "Đằng kia là [quảng trường Capitole]." },
        { fr: "Sur la place, il y a…", vi: "Trên quảng trường có…" },
        { fr: "Ici, c'est [la mairie]. / Moi, j'habite là, [rue des Jacobins].", vi: "Đây là [tòa thị chính]. / Tôi sống ở đây, [phố Jacobins]." },
      ],
    },
  ],

  "u4-c": [
    {
      heading: "Pour parler de la fréquence",
      structure: "Thang tần suất: TOUJOURS (100%) > SOUVENT > PARFOIS > RAREMENT > JAMAIS (0%). Vị trí: sau động từ chính. Phủ định JAMAIS: NE + động từ + JAMAIS. ⚠️ NE PAS + JAMAIS = sai! Chỉ dùng một trong hai.",
      phrases: [
        { fr: "Je vais souvent / toujours / parfois [au musée / dans les parcs].", vi: "Tôi thường xuyên / luôn / đôi khi đến [bảo tàng / trong các công viên]." },
        { fr: "Je vais rarement [au théâtre].", vi: "Tôi hiếm khi đến [rạp hát]." },
        { fr: "Je ne vais jamais [rue de la République].", vi: "Tôi không bao giờ đến [phố République]." },
      ],
    },
  ],

  "u4-f": [
    {
      heading: "Pour demander son chemin",
      structure: "Mở đầu lịch sự: « EXCUSEZ-MOI » (từ VOUS/lịch sự). « On cherche + địa điểm » (chúng tôi đang tìm…). « Où EST + địa điểm ? » — dùng EST (être) không phải trouver. « C'est quelle ligne ? » = đi tuyến nào?",
      phrases: [
        { fr: "Excusez-moi, on cherche [les Arènes].", vi: "Xin lỗi, chúng tôi đang tìm [đấu trường La Mã]." },
        { fr: "Où est [l'arrêt de bus], s'il vous plaît ?", vi: "[Trạm xe buýt] ở đâu ạ?" },
        { fr: "C'est quelle ligne ?", vi: "Đó là tuyến nào?" },
      ],
    },
    {
      heading: "Pour indiquer un chemin",
      structure: "Dùng IMPÉRATIF (mệnh lệnh): TOURNEZ (quẹo) / CONTINUEZ (tiếp tục) / PRENEZ (lấy/đi) / DESCENDEZ (xuống). « tout droit » = thẳng. « la première/deuxième rue à droite » = con đường đầu tiên/thứ hai bên phải.",
      phrases: [
        { fr: "Tournez à droite / à gauche.", vi: "Quẹo phải / trái." },
        { fr: "Continuez tout droit sur [100] mètres.", vi: "Đi thẳng [100] mét." },
        { fr: "Prenez la première rue à droite.", vi: "Rẽ vào con đường đầu tiên bên phải." },
        { fr: "Prenez le bus direction [« Lices »].", vi: "Đi xe buýt hướng [« Lices »]." },
        { fr: "Descendez à l'arrêt [« Lices »].", vi: "Xuống ở trạm [« Lices »]." },
      ],
    },
  ],

  // ─── Unité 5 ──────────────────────────────────────────────────────
  "u5-b": [
    {
      heading: "Pour parler de la taille et de la pointure",
      structure: "Cỡ quần áo: FAIRE DU + cỡ → « Je fais du M / du 38 ». Cỡ giày: CHAUSSER DU + số → « Je chausse du 39 ». Hỏi: « Tu fais quelle taille ? » (cỡ áo) / « Tu chausses du combien ? » (cỡ giày).",
      phrases: [
        { fr: "Je fais du [38]. / Tu fais quelle taille ?", vi: "Tôi mặc cỡ 38. / Bạn mặc cỡ nào?" },
        { fr: "Je chausse du [39]. / Tu chausses du combien ?", vi: "Tôi đi giày cỡ 39. / Bạn đi giày cỡ bao nhiêu?" },
      ],
    },
    {
      heading: "Pour donner son avis sur un vêtement",
      structure: "Khen/chê: [đồ vật] + ME PLAÎT (tôi thích) ↔ NE ME PLAÎT PAS. « Il/Elle te va bien » = hợp với bạn. Lưu ý chọn il (đồ giống đực) / elle (đồ giống cái).",
      phrases: [
        { fr: "Il / Elle me plaît. / Il / Elle ne me plaît pas.", vi: "Cái này tôi thích. / Cái này tôi không thích." },
        { fr: "Il / Elle te va bien !", vi: "Cái này hợp với bạn đấy!" },
        { fr: "J'aime / Je n'aime pas [la couleur / le style].", vi: "Tôi thích / không thích [màu / kiểu]." },
        { fr: "Quelle horreur ! / C'est à la mode !", vi: "Gớm quá! / Cái này hợp mốt đấy!" },
      ],
    },
  ],

  "u5-c": [
    {
      heading: "Pour parler de la météo",
      structure: "Thời tiết luôn dùng chủ ngữ vô nhân xưng « IL ». IL FAIT + tính từ/độ (Il fait beau / Il fait 20 degrés). Hiện tượng thì dùng động từ riêng: « Il pleut » (mưa), « Il neige » (tuyết), hoặc « Il y a + du vent / des nuages ».",
      phrases: [
        { fr: "Il fait beau / froid / chaud. / Il fait [X] degrés.", vi: "Trời đẹp / lạnh / nóng. / Trời [X] độ." },
        { fr: "Il pleut. / Il neige. / Il y a du vent / des orages.", vi: "Trời mưa. / Trời có tuyết. / Có gió / có giông bão." },
        { fr: "Il y a des nuages.", vi: "Trời nhiều mây." },
      ],
    },
    {
      heading: "Pour parler des saisons",
      structure: "4 mùa: EN été / EN automne / EN hiver, nhưng AU printemps (mùa xuân dùng « au »). « Il VA faire… » = futur proche (sắp sẽ…). « moins 10 degrés » = âm 10 độ.",
      phrases: [
        { fr: "En été / en automne / en hiver / au printemps…", vi: "Vào mùa hè / mùa thu / mùa đông / mùa xuân…" },
        { fr: "Début [septembre], il fait [30 degrés].", vi: "Đầu [tháng 9], trời [30 độ]." },
        { fr: "L'hiver va être difficile, il va faire moins [10] degrés !", vi: "Mùa đông sẽ khắc nghiệt, trời sẽ xuống âm [10] độ!" },
      ],
    },
  ],

  "u5-f": [
    {
      heading: "Pour décrire un objet / un cadeau",
      structure: "Giới thiệu vật: « C'EST + un/une… ». Hỏi công dụng: « À quoi ça sert ? » → trả lời « Ça sert à + động từ nguyên mẫu » (dùng để…) hoặc « C'est pour + động từ nguyên mẫu ».",
      phrases: [
        { fr: "C'est [un scanner portable]. C'est [rapide et pratique].", vi: "Đây là [máy quét cầm tay]. Nó [nhanh và tiện]." },
        { fr: "À quoi ça sert ? / Ça sert à [numériser des documents].", vi: "Cái này dùng để làm gì? / Nó dùng để [số hóa tài liệu]." },
        { fr: "C'est pour [mettre une tablette].", vi: "Nó dùng để [đặt máy tính bảng]." },
        { fr: "C'est [moderne / utile / idéal] !", vi: "Nó [hiện đại / hữu ích / lý tưởng]!" },
      ],
    },
    {
      heading: "Pour donner son avis",
      structure: "Đồng tình: « Je suis d'accord (avec + người) » (tôi đồng ý). Nhấn mạnh: « C'EST le cadeau parfait ! ». « Je participe » = tôi tham gia (góp tiền/chung tay).",
      phrases: [
        { fr: "C'est une bonne idée ! / Je suis d'accord (avec [quelqu'un]).", vi: "Ý hay đấy! / Tôi đồng ý (với [ai đó])." },
        { fr: "[La montre connectée], c'est le cadeau parfait !", vi: "[Đồng hồ thông minh], đúng là món quà hoàn hảo!" },
        { fr: "Je participe aussi !", vi: "Tôi cũng góp (tham gia) nữa!" },
      ],
    },
  ],

  // ─── Unité 6 ──────────────────────────────────────────────────────
  "u6-b": [
    {
      heading: "Pour dire et demander l'heure",
      structure: "Hỏi giờ: « Quelle heure il est ? » → trả lời « IL EST + giờ ». Hỏi giờ của sự kiện: « À quelle heure… ? » → « C'est À + giờ » (à = vào lúc). « moins dix » = kém 10 phút, « et demie » = rưỡi.",
      phrases: [
        { fr: "Quelle heure il est ? / Il est [neuf heures cinq].", vi: "Mấy giờ rồi? / [9 giờ 5 phút]." },
        { fr: "À quelle heure [le match] ? / C'est à quelle heure ?", vi: "[Trận đấu] mấy giờ? / Lúc mấy giờ vậy?" },
        { fr: "Le supermarché ouvre à [neuf heures].", vi: "Siêu thị mở cửa lúc [9 giờ]." },
        { fr: "Midi moins dix = 11h50 · Dix-huit heures quarante-cinq = 18h45", vi: "« Trưa kém 10 » = 11h50 · « 18 giờ 45 » = 18h45 (giờ hành chính 24h)." },
      ],
    },
    {
      heading: "Pour parler des activités du jour",
      structure: "« avoir un cours DE + môn » (có buổi học môn gì). « Je VAIS + động từ nguyên mẫu » = futur proche (sắp/định làm gì). « On a le temps » = mình còn thời gian.",
      phrases: [
        { fr: "Ils ont un cours de [dessin] à [dix heures et demie].", vi: "Họ có buổi học [vẽ] lúc [10 giờ rưỡi]." },
        { fr: "On a le temps !", vi: "Mình còn thời gian mà!" },
        { fr: "Je vais [jardiner / faire le ménage].", vi: "Tôi sẽ [làm vườn / dọn nhà]." },
      ],
    },
  ],

  "u6-c": [
    {
      heading: "Pour proposer une sortie",
      structure: "Rủ đi chơi: « On va + AU/À LA + nơi chốn ? » (mình đi… nhé?), « Tu veux aller… ? » (bạn muốn đi… không?). « Ça te dit + danh từ ? » = bạn có hứng… không?",
      phrases: [
        { fr: "Tu es libre ce soir ? On va [au théâtre] ?", vi: "Tối nay bạn rảnh không? Mình đi [xem kịch] nhé?" },
        { fr: "Tu veux aller [au musée] ?", vi: "Bạn muốn đi [bảo tàng] không?" },
        { fr: "Ça te dit [une exposition sur Brancusi] ?", vi: "Bạn có hứng đi [triển lãm về Brancusi] không?" },
      ],
    },
    {
      heading: "Pour accepter une proposition",
      structure: "Đồng ý/nhận lời: các cụm cố định, đáp nhanh khi được rủ.",
      phrases: [
        { fr: "Pourquoi pas ! / D'accord.", vi: "Sao lại không! / Được, đồng ý." },
        { fr: "Bonne idée ! / Super !", vi: "Ý hay đấy! / Tuyệt!" },
      ],
    },
    {
      heading: "Pour refuser une proposition",
      structure: "Từ chối lịch sự: « Je ne peux pas » (tôi không thể) + lý do. « Je n'ai pas envie » = tôi không có hứng. « Bof » = chán/không hào hứng.",
      phrases: [
        { fr: "Je ne peux pas, je suis désolé(e).", vi: "Tôi không đi được, xin lỗi nhé." },
        { fr: "Je n'ai pas envie. / Bof.", vi: "Tôi không có hứng. / Thường thôi, chán." },
        { fr: "Malheureusement non.", vi: "Tiếc là không được." },
      ],
    },
  ],

  "u6-f": [
    {
      heading: "Pour décrire l'apparence physique",
      structure: "Tả ngoại hình hai cách: ÊTRE + tính từ (Il EST grand) cho dáng vẻ chung; AVOIR + (les cheveux/les yeux) + tính từ (Il A les yeux bleus) cho bộ phận. Tính từ phải hợp giống & số với người được tả.",
      phrases: [
        { fr: "Il / Elle est [grand(e) / mince / brun(e) / chauve].", vi: "Anh ấy / Cô ấy [cao / mảnh khảnh / tóc nâu / hói]." },
        { fr: "Il / Elle a les cheveux [courts / bruns / châtains / blonds].", vi: "Anh ấy / Cô ấy có mái tóc [ngắn / nâu sẫm / nâu hạt dẻ / vàng]." },
        { fr: "Il / Elle a les yeux [verts / noirs / bleus].", vi: "Anh ấy / Cô ấy có đôi mắt [xanh lá / đen / xanh dương]." },
        { fr: "Il / Elle a [la barbe / un grand nez].", vi: "Anh ấy / Cô ấy có [râu / cái mũi to]." },
      ],
    },
  ],

  // ─── Unité 7 ──────────────────────────────────────────────────────
  "u7-c": [
    {
      heading: "Pour situer des objets dans une pièce",
      structure: "[Vật] + EST + giới từ vị trí + nơi chốn. Nhớ co rút: à droite DE + LE → à droite DU, en face DE + LE → en face DU. « entre » = giữa (hai vật), « sous » = dưới, « à côté de » = bên cạnh.",
      phrases: [
        { fr: "Je place [la télé] en face de [le canapé].", vi: "Tôi đặt [TV] đối diện [ghế sofa]." },
        { fr: "[La lampe] est à droite / à gauche [du canapé].", vi: "[Đèn] ở bên phải / bên trái [ghế sofa]." },
        { fr: "[Le tableau] est entre [les deux fenêtres].", vi: "[Bức tranh] ở giữa [hai cửa sổ]." },
        { fr: "[Le tapis] est sous [la table].", vi: "[Tấm thảm] ở dưới [bàn]." },
        { fr: "[L'aquarium] est à côté de [la fenêtre].", vi: "[Bể cá] ở bên cạnh [cửa sổ]." },
        { fr: "[La table] est derrière / devant [le canapé].", vi: "[Cái bàn] ở phía sau / phía trước [ghế sofa]." },
      ],
    },
  ],

  "u7-f": [
    {
      heading: "Pour exprimer l'obligation et l'interdiction",
      structure: "Cấm: « C'est interdit » (bị cấm), « Ce n'est pas possible » (không được). Cho phép: « ON PEUT + động từ nguyên mẫu » (có thể, được phép làm).",
      phrases: [
        { fr: "C'est interdit. / Ce n'est pas possible.", vi: "Cái đó bị cấm. / Không được đâu." },
        { fr: "On peut [mettre les objets dans le couloir].", vi: "Mình có thể [để đồ ngoài hành lang]." },
        { fr: "Ce n'est pas agréable…", vi: "Như thế không dễ chịu chút nào…" },
      ],
    },
    {
      heading: "Pour faire une suggestion",
      structure: "Gợi ý: « ON PEUT + động từ » (mình có thể…), « Je VAIS + động từ » = futur proche (tôi sẽ…). « dire à + người + DE + động từ » = bảo ai làm gì.",
      phrases: [
        { fr: "On peut [dire à notre voisin de participer].", vi: "Mình có thể [rủ hàng xóm cùng tham gia]." },
        { fr: "Je vais [mettre un mot dans l'ascenseur].", vi: "Tôi sẽ [dán một mẩu giấy trong thang máy]." },
        { fr: "Bonne idée ! On va s'amuser !", vi: "Ý hay! Mình sẽ vui lắm cho xem!" },
      ],
    },
  ],

  // ─── Unité 8 ──────────────────────────────────────────────────────
  "u8-a": [
    {
      heading: "Pour exprimer une émotion positive",
      structure: "Cảm xúc tích cực dùng ÊTRE + tính từ: « Je suis content(e) » (đực/cái khác nhau). « Je me sens bien » = cảm giác tốt (động từ phản thân se sentir). « ça fait du bien » = điều đó giúp dễ chịu / tốt cho người.",
      phrases: [
        { fr: "Je me sens bien.", vi: "Tôi cảm thấy ổn / dễ chịu." },
        { fr: "C'est agréable. / Ça fait du bien.", vi: "Thật dễ chịu. / Điều đó giúp khỏe hơn." },
        { fr: "Je suis en (pleine) forme.", vi: "Tôi (đang) rất khỏe / sung sức." },
        { fr: "Je suis content(e) (pour toi). / Je suis heureux, heureuse (pour toi).", vi: "Tôi vui (cho bạn). / Tôi hạnh phúc (vì bạn)." },
      ],
    },
    {
      heading: "Pour exprimer une émotion négative",
      structure: "Cảm xúc tiêu cực cũng dùng ÊTRE + tính từ. Chú ý accord giới tính: fatigué/fatiguée, stressé/stressée, malheureux/malheureuse. « inquiet / inquiète » = lo lắng (bất quy tắc: -et → -ète).",
      phrases: [
        { fr: "Je suis inquiet, inquiète.", vi: "Tôi lo lắng. (nam: inquiet / nữ: inquiète)" },
        { fr: "Je suis fatigué(e).", vi: "Tôi mệt mỏi." },
        { fr: "Je suis stressé(e).", vi: "Tôi bị stress." },
        { fr: "Je suis malheureux, malheureuse. / Je suis triste.", vi: "Tôi bất hạnh / không vui. / Tôi buồn." },
      ],
    },
  ],

  "u8-b": [
    {
      heading: "Pour parler de ses symptômes",
      structure: "Đau ở đâu: « J'ai mal À + LE/LA/LES + bộ phận » — nhớ co rút à+le → AU, à+les → AUX (j'ai mal AU dos, AUX yeux). Bệnh: « J'ai + un rhume / de la fièvre ». Thời điểm bắt đầu: « il y a + thời gian » (cách đây…).",
      phrases: [
        { fr: "J'ai mal à [la gorge / la tête / les oreilles / le genou].", vi: "Tôi đau [họng / đầu / tai / đầu gối]." },
        { fr: "J'ai [un rhume / de la fièvre / 39 de fièvre].", vi: "Tôi bị [cảm / sốt / sốt 39 độ]." },
        { fr: "Je tousse. / Je suis inquiet(e).", vi: "Tôi bị ho. / Tôi thấy lo lắng." },
        { fr: "Ça a commencé [hier] / il y a [deux jours].", vi: "Nó bắt đầu [hôm qua] / cách đây [hai ngày]." },
      ],
    },
    {
      heading: "Pour demander/dire le poids et la taille",
      structure: "Hỏi cân nặng: « Vous PESEZ combien ? » (động từ peser). Hỏi chiều cao: « Vous MESUREZ combien ? » (động từ mesurer). Đơn vị: kg = kilo, m = mètre. Ví dụ: 1,68 m đọc là « un mètre soixante-huit ».",
      phrases: [
        { fr: "Quel est votre poids ? / Vous pesez combien ?", vi: "Cân nặng của anh/chị là bao nhiêu?" },
        { fr: "Je pèse 60 kg (soixante kilos).", vi: "Tôi nặng 60 ký." },
        { fr: "Quelle est votre taille ? / Vous mesurez combien ?", vi: "Chiều cao của anh/chị là bao nhiêu?" },
        { fr: "Je mesure 1,68 m (un mètre soixante-huit).", vi: "Tôi cao 1m68." },
      ],
    },
    {
      heading: "Pour parler de sa santé (médecin / malade)",
      structure: "Hai vai trong cuộc khám: bác sĩ dùng VOUS lịch sự để hỏi; bệnh nhân dùng « J'ai mal À + bộ phận » (đau ở đâu) hoặc « J'ai + bệnh » (bị gì). Nhiệt độ: « J'ai 39°C » = sốt 39 độ.",
      phrases: [
        { fr: "— Qu'est-ce qui vous arrive ?", vi: "— Anh/chị bị làm sao vậy?" },
        { fr: "— Vous vous sentez comment ?", vi: "— Anh/chị thấy thế nào?" },
        { fr: "— Vous avez (encore) de la fièvre ?", vi: "— Anh/chị có (còn) sốt không?" },
        { fr: "— Je suis malade. / J'ai un rhume.", vi: "— Tôi bị ốm. / Tôi bị cảm." },
        { fr: "— J'ai mal à la gorge / à la tête / aux oreilles.", vi: "— Tôi đau họng / đầu / tai." },
        { fr: "— J'ai 39°C.", vi: "— Tôi sốt 39 độ." },
      ],
    },
  ],

  "u8-c": [
    {
      heading: "Pour parler de sa santé",
      structure: "« être EN bonne santé / EN pleine forme » = khỏe mạnh (cụm cố định với EN). « ça fait du bien » = (việc đó) tốt cho sức khỏe / khiến dễ chịu.",
      phrases: [
        { fr: "Je suis en [bonne santé / pleine forme].", vi: "Tôi [khỏe mạnh / sung sức]." },
        { fr: "Je ne suis pas souvent malade.", vi: "Tôi ít khi bị ốm." },
        { fr: "Marcher, ça fait du bien !", vi: "Đi bộ tốt cho sức khỏe lắm!" },
      ],
    },
    {
      heading: "Pour parler d'un rendez-vous médical",
      structure: "« aller CHEZ le médecin » = đi khám (chez + người). « prendre un rendez-vous » = đặt lịch hẹn. « X fois par an » = X lần mỗi năm. « à domicile » = tại nhà.",
      phrases: [
        { fr: "Je vais chez le médecin [une fois par an].", vi: "Tôi đi khám bác sĩ [mỗi năm một lần]." },
        { fr: "Je vais téléphoner et prendre un rendez-vous.", vi: "Tôi sẽ gọi điện và đặt lịch hẹn." },
        { fr: "Mon médecin fait des visites à domicile.", vi: "Bác sĩ của tôi có khám tại nhà." },
      ],
    },
  ],

  "u8-f": [
    {
      heading: "Pour exprimer l'obligation et l'interdiction",
      structure: "Bắt buộc cá nhân: « Je DOIS + động từ » (tôi phải…). Cấm = phủ định DEVOIR: « Je NE dois PAS + động từ » (tôi không được…). Sau phủ định, mạo từ phân lượng đổi thành DE: « ne pas manger DE produits sucrés ».",
      phrases: [
        { fr: "Je dois [faire attention à mon alimentation].", vi: "Tôi phải [chú ý đến chế độ ăn của mình]." },
        { fr: "Je ne dois pas manger de [produits gras / sucrés].", vi: "Tôi không được ăn [đồ béo / đồ ngọt]." },
        { fr: "On doit [changer notre manière de manger].", vi: "Chúng ta phải [thay đổi cách ăn uống]." },
      ],
    },
    {
      heading: "Pour exprimer son accord ou son désaccord",
      structure: "Đồng ý / Không đồng ý. « Tu as raison » (đúng) ↔ « Tu as tort » (sai) — dùng AVOIR. « C'est vrai » ↔ « C'est faux » — dùng ÊTRE. « Je suis d'accord AVEC toi » = tôi đồng ý với bạn; phủ định: « Je ne suis PAS d'accord ».",
      phrases: [
        { fr: "Tu as raison. ≠ Tu as tort.", vi: "Bạn đúng. ≠ Bạn sai." },
        { fr: "C'est vrai. ≠ C'est faux.", vi: "Đúng vậy. ≠ Sai rồi." },
        { fr: "Je suis d'accord (avec toi).", vi: "Tôi đồng ý (với bạn)." },
        { fr: "Je ne suis pas d'accord (avec toi).", vi: "Tôi không đồng ý (với bạn)." },
      ],
    },
  ],

  // ─── Unité 9 ──────────────────────────────────────────────────────
  "u9-b": [
    {
      heading: "Pour réserver une chambre d'hôtel",
      structure: "Đặt phòng lịch sự: « Je VOUDRAIS + động từ » (conditionnel, lịch sự hơn « je veux »). Khoảng ngày: « DU [18] AU [23] » (từ… đến…). « À quel nom ? » = đặt dưới tên ai?",
      phrases: [
        { fr: "Je voudrais réserver une chambre [pour les vacances].", vi: "Tôi muốn đặt một phòng [cho kỳ nghỉ]." },
        { fr: "À quelles dates ? / Du [18] au [23 août].", vi: "Vào những ngày nào? / Từ [18] đến [23 tháng 8]." },
        { fr: "C'est pour combien de personnes ?", vi: "Cho bao nhiêu người ạ?" },
        { fr: "À quel nom, s'il vous plaît ?", vi: "Đặt dưới tên ai ạ?" },
      ],
    },
    {
      heading: "Pour se renseigner à l'hôtel",
      structure: "Hỏi thông tin dạng câu hỏi Có/Không — lên giọng cuối câu: « Le petit déjeuner est compris ? » (đã bao gồm chưa?). « Qu'est-ce qu'on peut faire… ? » = có thể làm gì…?",
      phrases: [
        { fr: "Le petit déjeuner est compris ?", vi: "Bữa sáng có bao gồm trong giá không ạ?" },
        { fr: "Les animaux sont acceptés ?", vi: "Khách sạn có nhận thú cưng không?" },
        { fr: "Il y a un parking [privé] ?", vi: "Có bãi đỗ xe [riêng] không ạ?" },
        { fr: "Qu'est-ce qu'on peut faire dans la région ?", vi: "Ở vùng này có thể đi chơi/làm gì?" },
      ],
    },
  ],

  "u9-c": [
    {
      heading: "Pour raconter un voyage au passé",
      structure: "Kể chuyện đã qua = PASSÉ COMPOSÉ: « J'AI + participe passé ». Bất quy tắc cần nhớ: faire→FAIT, voir→VU, prendre→PRIS. (visiter→visité, adorer→adoré theo quy tắc -er→é).",
      phrases: [
        { fr: "J'ai fait [de la randonnée].", vi: "Tôi đã [đi leo núi / trekking]." },
        { fr: "J'ai visité [des villes et des musées].", vi: "Tôi đã thăm [nhiều thành phố và bảo tàng]." },
        { fr: "J'ai vu [des amis]. / J'ai adoré / aimé.", vi: "Tôi đã gặp [bạn bè]. / Tôi rất thích / thích." },
        { fr: "J'ai pris des photos.", vi: "Tôi đã chụp nhiều ảnh." },
      ],
    },
    {
      heading: "Pour décrire une ville, un pays",
      structure: "Tả nơi chốn ở hiện tại: « C'EST + tính từ » (cảnh/không khí), « Les gens SONT + tính từ » (con người). « Tu DOIS y aller ! » = bạn nhất định phải đến đó! (y = đến đó).",
      phrases: [
        { fr: "C'est [magnifique / très sympa / très animé].", vi: "Nơi đó [tuyệt đẹp / rất dễ chịu / rất nhộn nhịp]." },
        { fr: "Les gens sont [très gentils].", vi: "Người dân ở đó [rất tốt bụng]." },
        { fr: "On mange bien.", vi: "Đồ ăn ngon lắm." },
        { fr: "Tu dois y aller !", vi: "Bạn nhất định phải đến đó!" },
      ],
    },
  ],

  "u9-e": [
    {
      heading: "Pour décrire un paysage",
      structure: "Tả phong cảnh: « Il y a + danh từ » (có…), « On voit + danh từ » (nhìn thấy…), « C'est + tính từ » (thật…). Dùng trong Production écrite — mô tả tranh/ảnh về thiên nhiên.",
      phrases: [
        { fr: "Il y a une rivière, des maisons et de l'herbe verte.", vi: "Có một con sông, những ngôi nhà và cỏ xanh." },
        { fr: "On voit des arbres, des champs et la montagne.", vi: "Ta thấy những cây, những cánh đồng và núi." },
        { fr: "C'est très joli !", vi: "Thật đẹp quá!" },
        { fr: "C'est un lac.", vi: "Đây là một cái hồ." },
      ],
    },
  ],

  "u9-f": [
    {
      heading: "Pour exprimer une préférence",
      structure: "Thích hơn: « Je PRÉFÈRE + danh từ » = « J'aime MIEUX + danh từ » (thích… hơn). Phân biệt: « j'aime bien X, MAIS je préfère Y » = thích X, nhưng thích Y hơn.",
      phrases: [
        { fr: "Je préfère [les vacances à la mer].", vi: "Tôi thích hơn là [đi nghỉ ở biển]." },
        { fr: "J'aime mieux [bronzer et nager].", vi: "Tôi thích [tắm nắng và bơi] hơn." },
        { fr: "J'aime bien [la campagne], mais je préfère [la mer].", vi: "Tôi cũng thích [vùng quê], nhưng tôi thích [biển] hơn." },
      ],
    },
  ],

  "u9-g": [
    {
      heading: "Pour écrire une carte postale",
      structure: "Cấu trúc bưu thiếp: MỞ ĐẦU với lời chào + tên người nhận (Cher = nam, Chère = nữ), KẾT THƯ với lời tạm biệt. Đây là văn phong thân mật — dùng « tu » không dùng « vous ».",
      phrases: [
        { fr: "Salut ! / Bonjour !", vi: "Chào! / Xin chào! (mở đầu thân mật)" },
        { fr: "Cher [Lucas] / Chère [Emma],", vi: "Bạn [Lucas] thân mến, / Bạn [Emma] thân mến, (mở đầu trang trọng hơn)" },
        { fr: "À bientôt !", vi: "Hẹn gặp lại sớm nhé!" },
        { fr: "Bisous ! / Je t'embrasse.", vi: "Hôn bạn nhé! / Gửi cho bạn cái ôm." },
      ],
    },
  ],

  // ─── Unité 10 ─────────────────────────────────────────────────────
  "u10-b": [
    {
      heading: "Pour parler de ses études et de son université",
      structure: "« être EN + cấp/năm học » (en master, en 4e année). « étudier + LE/LES + ngành ». « J'ai EU ma licence » = passé composé của avoir (đã có/đã lấy được). Nhận xét trường: « Les cours SONT + tính từ ».",
      phrases: [
        { fr: "J'étudie [le droit / les langues / l'économie].", vi: "Tôi học [luật / ngôn ngữ / kinh tế]." },
        { fr: "Je suis étudiant(e) en licence / master d'économie.", vi: "Tôi đang học cử nhân / thạc sĩ kinh tế." },
        { fr: "Je suis en [quatrième] année.", vi: "Tôi đang học năm [thứ tư]." },
        { fr: "J'ai eu ma licence [l'année dernière].", vi: "Tôi đã lấy bằng cử nhân [năm ngoái]." },
        { fr: "Les cours sont excellents.", vi: "Các môn học rất xuất sắc." },
        { fr: "L'université / La bibliothèque est agréable.", vi: "Trường đại học / Thư viện rất dễ chịu." },
        { fr: "Le resto U n'est pas cher.", vi: "Căng tin trường không đắt." },
      ],
    },
  ],

  "u10-c": [
    {
      heading: "Pour parler de ses compétences",
      structure: "Kể năng lực/tính cách: « J'AIME + inf » (thích làm gì), « Je SUIS + tính từ » (tôi là người như thế nào). Tính từ phải chia giống: patient (nam) / patiente (nữ).",
      phrases: [
        { fr: "J'aime être avec des enfants.", vi: "Tôi thích được ở cùng trẻ em." },
        { fr: "Je suis patient(e).", vi: "Tôi là người kiên nhẫn." },
      ],
    },
    {
      heading: "Pour parler de son projet professionnel",
      structure: "Nói dự định nghề nghiệp: « rêver DE + inf » (mơ ước), « vouloir + inf » (muốn), « espérer QUE + mệnh đề » (hy vọng rằng…). Futur proche: « je vais + inf ».",
      phrases: [
        { fr: "Je rêve de travailler pour une organisation internationale.", vi: "Tôi mơ ước được làm việc cho một tổ chức quốc tế." },
        { fr: "Je veux être utile.", vi: "Tôi muốn trở nên có ích." },
        { fr: "J'espère que je vais avoir un travail intéressant.", vi: "Tôi hy vọng sẽ có một công việc thú vị." },
      ],
    },
  ],

  "u10-e": [
    {
      heading: "Pour parler de son métier",
      structure: "Giới thiệu nghề: « Je SUIS + nghề » (không dùng article: « je suis artiste », không phải « je suis une artiste »). « travailler COMME + nghề » = làm với tư cách là… « J'ai CRÉÉ » = passé composé của créer (đã tạo ra/thành lập).",
      phrases: [
        { fr: "Je suis comédien(ne) / artiste / informaticien(ne).", vi: "Tôi là diễn viên / nghệ sĩ / chuyên gia tin học." },
        { fr: "C'est un métier difficile.", vi: "Đây là một nghề khó." },
        { fr: "J'ai un rythme très différent.", vi: "Tôi có nhịp sống rất khác." },
        { fr: "Je travaille comme chauffeur.", vi: "Tôi làm nghề lái xe." },
        { fr: "J'ai créé mon entreprise.", vi: "Tôi đã tự lập doanh nghiệp." },
      ],
    },
  ],

  "u10-f": [
    {
      heading: "Pour parler de son travail",
      structure: "« travailler DANS une équipe de + số » (làm trong một nhóm gồm…). « Je VIENS DE commencer » = passé récent (vừa mới bắt đầu). « assez + tính từ » = khá…",
      phrases: [
        { fr: "Je suis [responsable]. / Je travaille dans une équipe de [8] personnes.", vi: "Tôi là [trưởng nhóm/người phụ trách]. / Tôi làm trong nhóm [8] người." },
        { fr: "J'ai [un bon salaire]. / Je viens de commencer.", vi: "Tôi có [mức lương tốt]. / Tôi vừa mới bắt đầu." },
        { fr: "Mon nouveau bureau est [assez grand].", vi: "Văn phòng mới của tôi [khá rộng]." },
      ],
    },
    {
      heading: "Pour parler des avantages du télétravail",
      structure: "« moins + tính từ » = ít… hơn (moins fatigué = đỡ mệt hơn). « Je PEUX + động từ » = tôi có thể… « plus tôt » (sớm hơn) ↔ « plus tard » (muộn hơn).",
      phrases: [
        { fr: "Je suis moins [fatigué(e)] avec le télétravail.", vi: "Làm việc từ xa khiến tôi đỡ [mệt] hơn." },
        { fr: "Je peux [m'organiser comme je veux].", vi: "Tôi có thể [sắp xếp theo ý mình]." },
        { fr: "Je peux commencer plus tôt / finir plus tard.", vi: "Tôi có thể bắt đầu sớm hơn / kết thúc muộn hơn." },
        { fr: "C'est [pratique] !", vi: "Thật [tiện lợi]!" },
      ],
    },
  ],
};
