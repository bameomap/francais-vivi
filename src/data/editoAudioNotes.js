/**
 * editoAudioNotes.js — « Pour communiquer » notes cho mỗi bài nghe B/C/F
 * Khớp với track ID trong editoAudio.js
 */

export const EDITO_POUR_NOTES = {

  // ─── Unité 1 ──────────────────────────────────────────────────────
  "u1-b": [
    {
      heading: "Pour se présenter",
      phrases: [
        "Je m'appelle [prénom].",
        "J'ai [X] ans.",
        "Je suis [nationalité].",
      ],
    },
    {
      heading: "Pour demander des informations sur quelqu'un",
      phrases: [
        "Comment vous vous appelez ? / Comment tu t'appelles ?",
        "Vous avez quel âge ? / Tu as quel âge ?",
        "Vous êtes / Tu es [nationalité] ?",
      ],
    },
  ],

  "u1-f": [
    {
      heading: "Pour parler de ses goûts",
      phrases: [
        "J'aime / J'adore [nom / infinitif].",
        "Tu aimes [nom] ?",
      ],
    },
    {
      heading: "Pour échanger des coordonnées",
      phrases: [
        "Tu as Facebook / Instagram ?",
        "Quel est ton numéro [de téléphone] ?",
        "C'est le [06 XX XX XX XX].",
      ],
    },
  ],

  // ─── Unité 2 ──────────────────────────────────────────────────────
  "u2-b": [
    {
      heading: "Pour exprimer ses goûts",
      phrases: [
        "J'aime / J'adore [nom / infinitif].",
        "Je n'aime pas [nom / infinitif].",
        "Je déteste [nom / infinitif].",
        "Moi aussi ! / Moi non plus !",
      ],
    },
  ],

  // ─── Unité 3 ──────────────────────────────────────────────────────
  "u3-b": [
    {
      heading: "Pour acheter dans un magasin",
      phrases: [
        "Ça coûte combien ? / Combien ça coûte ?",
        "[Le produit] coûte [X] euros.",
        "Ce sera tout ?",
      ],
    },
    {
      heading: "Pour payer",
      phrases: [
        "Vous payez comment ?",
        "Par carte / En espèces, s'il vous plaît.",
      ],
    },
  ],

  "u3-f": [
    {
      heading: "Pour parler des aliments disponibles",
      phrases: [
        "Il y a / On a [de la / du / des] + aliment.",
        "Il n'y a pas / On n'a pas de + aliment.",
        "On a un peu de [huile d'olive].",
      ],
    },
    {
      heading: "Pour faire une suggestion culinaire",
      phrases: [
        "On fait [des pâtes] ? / On mange [une quiche] ?",
        "Qu'est-ce qu'on mange ?",
        "Qu'est-ce que tu préfères ?",
      ],
    },
  ],

  // ─── Unité 4 ──────────────────────────────────────────────────────
  "u4-b": [
    {
      heading: "Pour décrire un quartier / une ville",
      phrases: [
        "C'est un quartier [agréable / dynamique / calme].",
        "Il y a [des cafés / une église / une mairie].",
        "C'est loin / près [du centre / de chez moi].",
      ],
    },
    {
      heading: "Pour situer un lieu",
      phrases: [
        "Là, c'est [la place du Capitole].",
        "Sur la place, il y a…",
        "Ici, c'est [la mairie]. / Moi, j'habite là, [rue des Jacobins].",
      ],
    },
  ],

  "u4-c": [
    {
      heading: "Pour parler de la fréquence",
      phrases: [
        "Je vais souvent / toujours / parfois [au musée / dans les parcs].",
        "Je vais rarement [au théâtre].",
        "Je ne vais jamais [rue de la République].",
      ],
    },
  ],

  "u4-f": [
    {
      heading: "Pour demander son chemin",
      phrases: [
        "Excusez-moi, on cherche [les Arènes].",
        "Où est [l'arrêt de bus], s'il vous plaît ?",
        "C'est quelle ligne ?",
      ],
    },
    {
      heading: "Pour indiquer un chemin",
      phrases: [
        "Tournez à droite / à gauche.",
        "Continuez tout droit sur [100] mètres.",
        "Prenez la première rue à droite.",
        "Prenez le bus direction [« Lices »].",
        "Descendez à l'arrêt [« Lices »].",
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
      heading: "Pour consulter un médecin",
      structure: "Câu bác sĩ hỏi (ngôi VOUS lịch sự). « Qu'est-ce qui vous arrive ? » = bạn bị làm sao? « Vous avez pris… ? » = passé composé (bạn đã… chưa?). « Vous pesez combien ? » = bạn nặng bao nhiêu?",
      phrases: [
        { fr: "Qu'est-ce qui vous arrive ?", vi: "Anh/chị bị làm sao vậy?" },
        { fr: "Vous toussez ? / Vous avez encore de la fièvre ?", vi: "Anh/chị có ho không? / Còn sốt không?" },
        { fr: "Vous avez pris des médicaments ?", vi: "Anh/chị đã uống thuốc gì chưa?" },
        { fr: "Vous pesez combien ? / Quelle est votre taille ?", vi: "Anh/chị nặng bao nhiêu? / Cao bao nhiêu?" },
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
      heading: "Pour réagir à une information",
      structure: "Phản ứng với thông tin: « Tu as raison » (bạn đúng) ↔ « Tu as tort » (bạn sai) — đều dùng AVOIR. « Ah bon ? C'est vrai ? » = Vậy à? Thật không?",
      phrases: [
        { fr: "Tu as raison ! / Tu as tort !", vi: "Bạn nói đúng! / Bạn sai rồi!" },
        { fr: "C'est incroyable ! / Ah bon ? C'est vrai ?", vi: "Khó tin thật! / Vậy à? Thật không?" },
        { fr: "Je suis d'accord !", vi: "Tôi đồng ý!" },
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
      heading: "Pour décrire un lieu visité",
      structure: "Tả nơi chốn ở hiện tại: « C'EST + tính từ » (cảnh/không khí), « Les gens SONT + tính từ » (con người). « Tu DOIS y aller ! » = bạn nhất định phải đến đó! (y = đến đó).",
      phrases: [
        { fr: "C'est [magnifique / très sympa / très animé].", vi: "Nơi đó [tuyệt đẹp / rất dễ chịu / rất nhộn nhịp]." },
        { fr: "Les gens sont [très gentils].", vi: "Người dân ở đó [rất tốt bụng]." },
        { fr: "On mange bien.", vi: "Đồ ăn ngon lắm." },
        { fr: "Tu dois y aller !", vi: "Bạn nhất định phải đến đó!" },
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

  // ─── Unité 10 ─────────────────────────────────────────────────────
  "u10-b": [
    {
      heading: "Pour parler de ses études",
      structure: "« être EN + cấp/năm học » (en master, en 4e année). « étudier + LE/LES + ngành ». « J'ai EU ma licence » = passé composé của avoir (đã có/đã lấy được). « hésiter ENTRE X ET Y » = phân vân giữa X và Y.",
      phrases: [
        { fr: "Je suis en [quatrième] année / en master / en licence.", vi: "Tôi đang học năm [thứ tư] / cao học / cử nhân." },
        { fr: "J'étudie [le droit / les langues / le commerce].", vi: "Tôi học [luật / ngôn ngữ / thương mại]." },
        { fr: "J'ai eu ma [licence] [l'année dernière].", vi: "Tôi đã lấy bằng [cử nhân] [năm ngoái]." },
        { fr: "J'hésite entre [les langues] et [le droit].", vi: "Tôi đang phân vân giữa [ngôn ngữ] và [luật]." },
      ],
    },
    {
      heading: "Pour donner son avis sur les études",
      structure: "Nhận xét: « Les cours SONT + tính từ » (tính từ hợp số nhiều: excellentS, intéressantS). « C'est important POUR + động từ nguyên mẫu » = quan trọng để…",
      phrases: [
        { fr: "Les cours et les profs sont [excellents / intéressants].", vi: "Các môn học và thầy cô [xuất sắc / thú vị]." },
        { fr: "On apprend de nouvelles choses tous les jours.", vi: "Mỗi ngày đều học được điều mới." },
        { fr: "C'est important pour avoir de [bonnes notes].", vi: "Điều đó quan trọng để đạt [điểm cao]." },
      ],
    },
  ],

  "u10-c": [
    {
      heading: "Pour parler de ses projets",
      structure: "Nói dự định, đều theo cấu trúc động từ + động từ nguyên mẫu: « rêver DE + inf » (mơ ước), « espérer + inf » (hy vọng), « vouloir + inf » (muốn), « devoir + inf » (phải).",
      phrases: [
        { fr: "Je rêve de [travailler pour une organisation internationale].", vi: "Tôi mơ ước [làm việc cho một tổ chức quốc tế]." },
        { fr: "J'espère [avoir mon diplôme / trouver un travail intéressant].", vi: "Tôi hy vọng [lấy được bằng / tìm được công việc thú vị]." },
        { fr: "Je veux [être utile].", vi: "Tôi muốn [trở nên có ích]." },
        { fr: "Je dois finir [mon master].", vi: "Tôi phải hoàn thành [bằng thạc sĩ]." },
      ],
    },
    {
      heading: "Pour parler d'une expérience enrichissante",
      structure: "« J'ai appris » = passé composé của apprendre (đã học được). So sánh hơn: « plus + tính từ » (… hơn). « une pause POUR + inf » = một quãng nghỉ để…",
      phrases: [
        { fr: "J'ai appris beaucoup de choses.", vi: "Tôi đã học được rất nhiều điều." },
        { fr: "Je suis plus [patient(e)] maintenant.", vi: "Giờ tôi [kiên nhẫn] hơn." },
        { fr: "C'est une pause pour [faire de nouvelles choses].", vi: "Đó là quãng nghỉ để [thử những điều mới]." },
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
