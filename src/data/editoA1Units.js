// Édito A1 — speaking & writing tasks per unit.
//
// `notes` on a speaking task lists keys into EDITO_POUR_NOTES
// (editoAudioNotes.js): the « Pour communiquer » boxes of that lesson —
// structures and sample sentences with Vietnamese glosses. The speaking step
// is a preparation sheet built from these (ProductionOralePanel).
// Unité 0 has no « Pour communiquer » boxes, so its tasks carry no `notes`.

export const EDITO_A1_UNITS = [
  {
    id: "unite-0", unit: 0, title: "Bienvenue !",
    speakingPractice: [
      { title: "Se présenter", task: "Présentez-vous à votre partenaire : dites bonjour et donnez votre prénom.", usefulPhrases: ["Bonjour, je m'appelle…", "Et vous ?", "Moi, je m'appelle…"] },
      { title: "Saluer", task: "Saluez votre partenaire selon la situation (le matin, le soir, un ami, un professeur), puis dites au revoir.", usefulPhrases: ["Bonjour", "Salut", "Au revoir", "À bientôt"] },
      { title: "Dans la classe", task: "Vous êtes en classe de français : demandez de répéter, demandez comment on dit un mot, dites que vous ne comprenez pas.", usefulPhrases: ["Vous pouvez répéter ?", "Comment on dit… ?", "Je ne comprends pas.", "Qu'est-ce que ça veut dire ?"] },
      {
        title: "Se saluer & faire connaissance",
        task: "Cẩm nang các câu chào hỏi và làm quen — dùng khi tự luyện nói hoặc nói chuyện với bạn học.",
        rule: `CHÀO HỎI VÀ LÀM QUEN — Script đầy đủ từ A đến Z:

CHÀO KHI GẶP:
• Bonjour ! — Xin chào! (dùng cả ngày) · Bonsoir ! — Chào buổi tối!
• Salut ! — Chào! (thân mật, với bạn bè) · Coucou ! — Hế lô! (rất thân mật)
• Comment allez-vous ? — Ngài/Anh chị khỏe không? (lịch sự, với VOUS)
• Comment tu vas ? / Ça va ? — Bạn khỏe không? / Khỏe chứ? (thân mật, với TU)
→ Très bien, merci ! / Bien, merci. Et vous/toi ? — Rất khỏe, cảm ơn! / Khỏe, cảm ơn. Còn bạn?
→ Ça va. / Pas mal. / Comme ci, comme ça. — Bình thường. / Cũng ổn. / Tàm tạm. (trung bình)

GIỚI THIỆU BẢN THÂN:
• Je m'appelle [prénom]. / Mon prénom, c'est [prénom]. — Tôi tên là [tên]. / Tên tôi là [tên].
• Je suis [nationalité]. J'ai [X] ans. — Tôi là người [quốc tịch]. Tôi [X] tuổi.
• J'habite à [ville], en/au [pays]. — Tôi sống ở [thành phố], tại [quốc gia].
• Je suis [profession / étudiant(e)]. — Tôi là [nghề nghiệp / sinh viên].

HỎI THÔNG TIN CƠ BẢN:
• Comment vous vous appelez ? / Tu t'appelles comment ? — Ngài/Bạn tên là gì?
• Vous avez quel âge ? / Tu as quel âge ? — Ngài/Bạn bao nhiêu tuổi?
• Vous êtes d'où ? / Tu viens d'où ? — Ngài/Bạn đến từ đâu?
• Qu'est-ce que vous faites dans la vie ? — Ngài làm nghề gì? (làm nghề gì trong đời?)

TẠM BIỆT:
• Au revoir ! — Tạm biệt! (chính thức) · À bientôt ! — Hẹn gặp lại sớm!
• À tout à l'heure ! — Lát gặp lại! · À demain ! — Hẹn mai gặp!
• Bonne journée ! / Bonne soirée ! / Bonne nuit ! — Chúc một ngày tốt lành! / Chúc buổi tối vui! / Chúc ngủ ngon!
• Salut ! — Chào! (thân mật — dùng cả khi gặp lẫn khi chia tay)

💡 VOUS vs TU — quy tắc chọn:
TU → bạn bè, gia đình, người cùng tuổi, trẻ em
VOUS → người lạ, người lớn tuổi hơn, cấp trên, bối cảnh trang trọng`,
        examples: [
          "Bonjour! Je m'appelle Linh. Je suis vietnamienne et j'étudie le français.",
          "Comment tu t'appelles? — Je m'appelle Thomas. Et toi?",
          "Ça va? — Très bien, merci! Et toi?",
          "Vous êtes d'où? — Je suis de Hanoï, au Vietnam.",
          "Ravi(e) de vous rencontrer! — Moi aussi, enchanté(e)!",
          "Au revoir! Bonne journée! — Merci, à bientôt!",
        ],
      },
    ],
    writingPractice: [
      { title: "Écrire son prénom", task: "Épelez et écrivez des prénoms." },
      { title: "Dire une date", task: "Écrivez la date d'une fête ou d'un événement." },
    ],
  },
  {
    id: "unite-1", unit: 1, title: "Je suis…",
    speakingPractice: [
      { notes: ["u1-a", "u1-b"], title: "Speak-dating", task: "Vous participez à un speak-dating : présentez-vous et posez des questions à votre partenaire.", usefulPhrases: ["Je m'appelle…", "Et toi ?", "Vous avez quel âge ?", "Je suis vietnamien(ne)."] },
      { notes: ["u1-b"], title: "Nationalité d'une personnalité", task: "Présentez un acteur, chanteur ou sportif célèbre : son nom, sa nationalité, sa profession. Votre partenaire vous pose des questions.", usefulPhrases: ["Il s'appelle…", "Elle est américaine.", "Il est chanteur."] },
      { notes: ["u1-f", "u1-e"], title: "Questionnaire d'identité", task: "Interviewez votre partenaire : posez des questions sur son nom, son âge, sa nationalité, sa ville.", usefulPhrases: ["Comment tu t'appelles ?", "Tu as quel âge ?", "Tu habites où ?"] },
      {
        title: "Se présenter en détail",
        task: "Cẩm nang các câu tự giới thiệu chi tiết hơn — nghề nghiệp, sở thích, gia đình.",
        rule: `SCRIPT TỰ GIỚI THIỆU HOÀN CHỈNH:

1. NÀO, TUỔI, NGUỒN GỐC:
• Je m'appelle [prénom] [nom]. J'ai [X] ans. — Tôi tên là [tên] [họ]. Tôi [X] tuổi.
• Je suis [nationalité]. Je viens de [ville/pays]. — Tôi là người [quốc tịch]. Tôi đến từ [thành phố/quốc gia].
• J'habite à [ville], en/au [pays] depuis [X] ans. — Tôi sống ở [thành phố], tại [quốc gia] được [X] năm rồi.

2. NGHỀ NGHIỆP / HỌC VẤN:
• Je suis [profession]. / Je travaille comme [profession]. — Tôi là [nghề]. / Tôi làm [nghề].
• Je travaille dans [secteur / entreprise / hôpital…]. — Tôi làm trong [lĩnh vực / công ty / bệnh viện…].
• Je suis étudiant(e) en [droit / médecine / langues…]. — Tôi là sinh viên ngành [luật / y / ngôn ngữ…].

3. NGÔN NGỮ:
• Je parle [français / vietnamien / anglais / japonais]. — Tôi nói [tiếng Pháp / tiếng Việt / tiếng Anh / tiếng Nhật].
• Je parle un peu de [langue]. / J'apprends le français. — Tôi nói chút [ngôn ngữ]. / Tôi đang học tiếng Pháp.

4. GOÛTS & LOISIRS (sở thích & giải trí):
• J'aime / J'adore [la musique / voyager / cuisiner]. — Tôi thích / Tôi mê [âm nhạc / đi du lịch / nấu ăn].
• Je n'aime pas [le sport / se lever tôt]. — Tôi không thích [thể thao / dậy sớm].
• Mon passe-temps préféré, c'est [loisir]. — Trò tiêu khiển yêu thích của tôi là [sở thích].

5. FAMILLE (gia đình):
• Je suis fils/fille unique. / J'ai [X] frère(s) et [X] sœur(s). — Tôi là con một. / Tôi có [X] anh em trai và [X] chị em gái.
• Mon père est [profession], ma mère est [profession]. — Bố tôi là [nghề], mẹ tôi là [nghề].
• Je suis célibataire / marié(e) / en couple. / J'ai [X] enfant(s). — Tôi độc thân / đã kết hôn / đang có người yêu. / Tôi có [X] con.

6. COORDONNÉES (thông tin liên hệ):
• Mon numéro, c'est le [06 XX XX XX XX]. — Số của tôi là [06 XX XX XX XX].
• Mon adresse mail : [adresse]. J'ai Instagram : [@handle]. — Email của tôi: [địa chỉ]. Tôi có Instagram: [@tên].

💡 Ordre naturel de présentation:
Prénom → âge → ville → profession/études → famille → goûts → contact`,
        examples: [
          "Je m'appelle Linh Nguyen, j'ai 24 ans. Je suis vietnamienne et j'habite à Paris depuis deux ans.",
          "Je suis étudiante en commerce à l'université Paris 1.",
          "Je parle vietnamien, anglais et j'apprends le français depuis six mois.",
          "J'adore voyager et cuisiner. Mon passe-temps préféré, c'est la photographie.",
          "J'ai un frère. Mon père est ingénieur et ma mère est professeure.",
          "Mon numéro, c'est le 06 12 34 56 78. J'ai Instagram : @linhparis.",
        ],
      },
    ],
    writingPractice: [
      { title: "Profil personnel", task: "Complétez ou écrivez une courte fiche avec nom, prénom, âge, nationalité, ville, goûts." },
      { title: "Présentation d'un artiste", task: "Préparez un texte court pour présenter un(e) artiste francophone." },
    ],
  },
  {
    id: "unite-2", unit: 2, title: "Près de moi",
    speakingPractice: [
      { notes: ["u2-a"], title: "Parler de son quartier", task: "Présentez votre ville, votre quartier ou votre logement.", usefulPhrases: ["J'habite à…", "Mon quartier est calme.", "Il y a un parc.", "C'est près du centre."] },
      { notes: ["u2-b"], title: "Exprimer ses goûts", task: "Dites ce que vous aimez et ce que vous détestez.", usefulPhrases: ["J'aime…", "J'adore…", "Je déteste…", "Je n'aime pas…"] },
      { notes: ["u2-d", "u2-e"], title: "Présenter sa famille", task: "Présentez les membres de votre famille : qui, âge, profession. Votre partenaire vous pose des questions.", usefulPhrases: ["J'ai un frère.", "Ma mère s'appelle…", "Il a … ans."] },
      {
        title: "Chez les commerçants",
        task: "Cẩm nang các câu dùng khi mua sắm ở cửa hàng, chợ, tiệm bánh.",
        rule: `MUA SẮM TẠI CỬA HÀNG — Script đầy đủ:

BƯỚC 1 — VÀO CỬA HÀNG:
• Bonjour ! Je cherche [du pain / une baguette / du fromage]. — Xin chào! Tôi tìm [bánh mì / một ổ baguette / phô mai].
• Vous avez [des tomates / du jambon] ? — Anh/chị có [cà chua / giăm bông] không?
• C'est pour [offrir / consommer de suite]. — Cái này để [làm quà / ăn liền].

BƯỚC 2 — CHỈ ĐỊNH / HỎI LƯỢNG:
• Je voudrais [200 grammes / une tranche / un morceau] de [produit]. — Tôi muốn [200 gam / một lát / một miếng] [sản phẩm].
• Donnez-moi [un kilo / une bouteille / une boîte / un paquet] de [produit]. — Cho tôi [một ký / một chai / một hộp / một gói] [sản phẩm].
• Il m'en faut combien ? → [X] suffira / Il m'en faut [X]. — Tôi cần bao nhiêu? → [X] là đủ / Tôi cần [X].
• C'est tout ? — Oui, c'est tout. / Ajoutez aussi [produit]. — Hết chưa ạ? — Vâng, hết rồi. / Thêm cả [sản phẩm] nữa.

BƯỚC 3 — HỎI GIÁ:
• C'est combien ? / Ça fait combien en tout ? — Bao nhiêu tiền? / Tất cả hết bao nhiêu?
• Le [produit], c'est combien le kilo / la pièce / le litre ? — [Sản phẩm] bao nhiêu một ký / một cái / một lít?

BƯỚC 4 — THANH TOÁN:
• Je paye comment ? / Vous acceptez la carte ? — Tôi thanh toán thế nào? / Anh/chị có nhận thẻ không?
• Par carte, s'il vous plaît. / En espèces. — Trả bằng thẻ nhé. / Tiền mặt.
• Je n'ai pas de monnaie. / Vous avez la monnaie pour [20 euros] ? — Tôi không có tiền lẻ. / Anh/chị có thối tiền cho [tờ 20 euro] không?
• Gardez la monnaie ! — Khỏi thối lại! (giữ tiền thừa)

TYPES DE COMMERCES & CE QU'ON Y ACHÈTE (các loại cửa hàng & mua gì ở đó):
• la boulangerie (tiệm bánh mì) → du pain, des croissants, des gâteaux (bánh mì, bánh sừng bò, bánh ngọt)
• la boucherie (hàng thịt) → du bœuf, du poulet, de l'agneau, des saucisses (thịt bò, gà, cừu, xúc xích)
• la fromagerie (hàng phô mai) → du camembert, du brie, du gruyère (các loại phô mai)
• l'épicerie / le marché (tạp hóa / chợ) → des fruits, des légumes, des conserves (trái cây, rau, đồ hộp)
• la pharmacie (nhà thuốc) → des médicaments, de la crème, des vitamines (thuốc, kem, vitamin)
• la poissonnerie (hàng hải sản) → du saumon, des crevettes, des huîtres (cá hồi, tôm, hàu)

⚠️ "Chez" avec les personnes, "à la/au" avec les lieux:
"Je vais chez le boulanger." = Je vais à la boulangerie.`,
        examples: [
          "Bonjour! Je voudrais une baguette et deux croissants, s'il vous plaît.",
          "Vous avez du fromage de chèvre? — Oui! En voici. Combien il vous en faut?",
          "Donnez-moi 300 grammes de jambon blanc, s'il vous plaît.",
          "Ça fait combien en tout? — Ça fait 7,50 euros.",
          "Je paye par carte. — Oui, bien sûr. Tapez votre code.",
          "Et avec ça? — C'est tout, merci. Bonne journée!",
        ],
      },
    ],
    writingPractice: [
      { title: "Portrait collectif", task: "Écrivez un court portrait de votre groupe : prénoms, villes, goûts, professions." },
      { title: "Famille", task: "Écrivez une courte présentation de votre famille." },
    ],
  },
  {
    id: "unite-3", unit: 3, title: "Qu'est-ce qu'on mange ?",
    speakingPractice: [
      { notes: ["u3-b"], title: "Acheter dans une épicerie", task: "Achetez des produits et demandez le prix.", usefulPhrases: ["Je voudrais…", "Ce sera tout ?", "Vous payez comment ?", "Combien ça coûte ?"] },
      { notes: ["u3-f"], title: "Parler des commerces", task: "Dites quels commerces il y a dans votre quartier.", usefulPhrases: ["Il y a une boulangerie.", "À côté, il y a une pharmacie.", "Je fais mes courses au marché.", "Il n'y a pas de supermarché."] },
      { notes: ["u3-g", "u3-e"], title: "Commander au restaurant", task: "Posez des questions sur la carte et commandez.", usefulPhrases: ["Je voudrais…", "Pour moi…", "Une carafe d'eau, s'il vous plaît."] },
      {
        title: "Au restaurant",
        task: "Cẩm nang các câu gọi món, hỏi thực đơn và thanh toán ở nhà hàng.",
        rule: `AU RESTAURANT — Hội thoại từ đầu đến cuối:

📞 ĐẶT BÀN TRƯỚC (réserver):
• Je voudrais réserver une table pour [X] personnes. — Tôi muốn đặt một bàn cho [X] người.
• C'est pour [ce soir / demain soir / samedi à 20h]. — Đặt cho [tối nay / tối mai / thứ Bảy lúc 20h].
• À quel nom ? — Au nom de [nom]. — Đặt tên ai ạ? — Tên [tên].
• Vous avez une table en terrasse / non-fumeur ? — Anh/chị có bàn ngoài hiên / khu không hút thuốc không?

🚪 KHI ĐẾN (arriver):
• Bonjour, j'ai réservé au nom de [nom]. — Xin chào, tôi đã đặt bàn tên [tên].
• Une table pour [X], s'il vous plaît. — Cho một bàn [X] người ạ.
• On peut s'asseoir là-bas ? — Chúng tôi ngồi đằng kia được không?

📋 COMMANDER (gọi món):
Demander (hỏi):
• La carte / Le menu, s'il vous plaît ! — Cho xem thực đơn ạ!
• Qu'est-ce que vous recommandez ? — Anh/chị gợi ý món nào?
• C'est quoi exactement, [le plat du jour / la blanquette] ? — [Món trong ngày / món blanquette] chính xác là gì vậy?
• C'est [végétarien / sans gluten / sans lactose] ? — Món này [chay / không gluten / không lactose] phải không?

Commander (gọi món):
• Je voudrais [la soupe à l'oignon], s'il vous plaît. — Cho tôi [súp hành] ạ.
• Pour moi, [le steak-frites]. / Comme [entrée / plat / dessert], je prends [plat]. — Tôi lấy [bít tết khoai chiên]. / Phần [khai vị / món chính / tráng miệng], tôi gọi [món].
• Je vais prendre [le menu à 15 euros]. — Tôi sẽ lấy [phần set 15 euro].

Les boissons (đồ uống):
• Une carafe d'eau, s'il vous plaît. — Cho một bình nước ạ. (miễn phí ở Pháp!)
• Un verre de [vin rouge / vin blanc / rosé], s'il vous plaît. — Cho một ly [vang đỏ / vang trắng / vang hồng] ạ.
• Je voudrais [un jus d'orange / une eau pétillante / un café]. — Tôi muốn [nước cam / nước có ga / một ly cà phê].

🍽️ PENDANT LE REPAS (trong bữa ăn):
• Excusez-moi, vous avez du [sel / poivre / pain] ? — Xin lỗi, có [muối / tiêu / bánh mì] không ạ?
• C'est délicieux ! / C'est très bon. / Je me régale ! — Ngon quá! / Rất ngon. / Tôi ăn thích mê!
• C'est [trop salé / pas assez cuit / un peu froid]. — Món hơi [mặn / chưa chín tới / nguội].
• Vous pouvez me rapporter du pain ? — Anh/chị cho thêm bánh mì được không?

💳 PAYER (thanh toán):
• L'addition, s'il vous plaît ! / On peut avoir l'addition ? — Tính tiền ạ! / Cho xin hóa đơn được không?
• C'est combien ? / Le service est compris ? — Hết bao nhiêu? / Đã gồm phí phục vụ chưa?
• On partage ? / C'est moi qui invite ! / C'est pour moi. — Chia đôi nhé? / Để tôi mời! / Tôi trả.
• Vous acceptez la carte ? / Je paye en espèces. — Anh/chị nhận thẻ không? / Tôi trả tiền mặt.

⚠️ VOCABULAIRE CLÉ (từ vựng then chốt):
• "La carte" = menu (danh sách các món)
• "Le menu" = phần ăn giá cố định (vd: khai vị + món chính + tráng miệng = 15€)
• "Le plat du jour" = món của riêng hôm nay
• "Service compris" = đã gồm tip (không cần đưa thêm tiền boa)
• "Une carafe d'eau" = nước lọc vòi, luôn miễn phí`,
        examples: [
          "Bonjour! J'ai réservé une table pour deux au nom de Nguyen.",
          "La carte, s'il vous plaît! — Voici. Qu'est-ce que vous recommandez? — La blanquette de veau est excellente!",
          "Pour moi, l'entrée du jour et comme plat, le steak-frites, s'il vous plaît. Et une carafe d'eau.",
          "Excusez-moi, vous avez du pain? Et c'est quoi exactement le 'gratin dauphinois'?",
          "C'est délicieux! Je me régale vraiment.",
          "L'addition, s'il vous plaît! — C'est 32 euros, service compris. — Vous acceptez la carte? — Oui, bien sûr.",
        ],
      },
    ],
    writingPractice: [
      { title: "Pique-nique", task: "Écrivez un mail à vos ami(e)s pour organiser les achats." },
      { title: "Courses", task: "Écrivez où vous faites vos courses et quels produits vous achetez." },
      { title: "Plat préféré", task: "Présentez votre plat préféré et ses ingrédients." },
    ],
  },
  {
    id: "unite-4", unit: 4, title: "C'est où ?",
    speakingPractice: [
      { notes: ["u4-b"], title: "Présenter son quartier", task: "Présentez votre quartier à un(e) ami(e).", usefulPhrases: ["Voilà mon quartier.", "Ici, c'est…", "Il y a…", "Ce n'est pas loin."] },
      { notes: ["u4-c", "u4-e"], title: "Enquête sur les lieux", task: "Dites où vous allez souvent et où vous n'allez jamais.", usefulPhrases: ["Je vais souvent au parc.", "Je ne vais jamais à la piscine.", "Tous les jours, je vais au travail.", "Le week-end, je vais au marché."] },
      { notes: ["u4-f"], title: "Demander le chemin", task: "Demandez et indiquez un itinéraire dans la ville.", usefulPhrases: ["Pardon, où est la poste ?", "C'est tout droit.", "Tournez à gauche.", "C'est en face de la banque."] },
      {
        title: "Dans la ville & les transports",
        task: "Cẩm nang các câu hỏi đường, đi phương tiện công cộng trong thành phố.",
        rule: `DI CHUYỂN TRONG THÀNH PHỐ:

🚇 MUA VÉ:
• Un ticket / Un carnet de 10, s'il vous plaît. — Cho một vé / một xấp 10 vé ạ.
• C'est quelle ligne pour aller à [la gare / le centre-ville] ? — Đi [nhà ga / trung tâm] thì tuyến nào ạ?
• Je voudrais un aller simple / aller-retour pour [destination]. — Tôi muốn vé một chiều / khứ hồi đi [điểm đến].
• C'est direct ou avec correspondance ? — Đi thẳng hay phải đổi tuyến ạ?

🚌 DANS LE BUS / LE MÉTRO:
• Ce bus/métro va bien à [la gare / le musée] ? — Xe buýt/tàu này có đến [nhà ga / bảo tàng] không ạ?
• Excusez-moi, je descends à quel arrêt pour [lieu] ? — Xin lỗi, đi [địa điểm] thì xuống trạm nào ạ?
• C'est encore loin ? / Combien d'arrêts encore ? — Còn xa không ạ? / Còn mấy trạm nữa?
• Composez votre billet ! — Hãy bấm/quẹt vé! (bắt buộc phải dập vé)

🚆 À LA GARE / PRENDRE LE TRAIN:
• Je voudrais un billet pour [Lyon], s'il vous plaît. — Tôi muốn một vé đi [Lyon] ạ.
• En première ou deuxième classe ? → Deuxième classe, s'il vous plaît. — Hạng nhất hay hạng hai? → Hạng hai ạ.
• À quelle heure part le prochain train pour [ville] ? — Chuyến tàu tới đi [thành phố] mấy giờ chạy ạ?
• Le train est à l'heure ? / Il a du retard ? — Tàu đúng giờ chứ? / Có trễ không?
• C'est quel quai ? / Voie [numéro]. — Sân ga nào ạ? / Đường ray số [số].
• Je voudrais réserver une place [côté fenêtre / côté couloir]. — Tôi muốn đặt chỗ [cạnh cửa sổ / cạnh lối đi].

🗺️ DEMANDER SON CHEMIN (hỏi đường — nhắc lại):
• Excusez-moi, je cherche [la gare / la mairie / la poste]. — Xin lỗi, tôi tìm [nhà ga / tòa thị chính / bưu điện].
• C'est loin d'ici ? / C'est à combien de minutes à pied ? — Có xa đây không? / Đi bộ mất mấy phút?
• Il y a [un bus / un métro] pour aller à [lieu] ? — Có [xe buýt / tàu điện] đi [địa điểm] không ạ?

MODES DE TRANSPORT à connaître:
• à pied (đi bộ) · à vélo (xe đạp) · en vélo électrique
• en bus · en métro · en tramway · en RER
• en voiture · en taxi · en Uber/VTC
• en train · en TGV · en avion
• en bateau · en ferry

⚠️ À PIED ou EN?
"Je vais à pied." / "Je vais à vélo." (pas "en" pour les deux-roues sans moteur)
"Je vais en voiture / en bus / en avion."`,
        examples: [
          "Excusez-moi, c'est quelle ligne pour aller à la Tour Eiffel? — Prenez la ligne 6 direction Charles de Gaulle-Étoile.",
          "Un carnet de 10 tickets, s'il vous plaît. — Ça fait 16,90€.",
          "Ce bus va bien à la gare Saint-Lazare? — Oui, descendez dans 3 arrêts.",
          "Je voudrais un billet Lyon-Paris pour demain matin, s'il vous plaît. En deuxième classe.",
          "Le train de 9h15 est à l'heure? — Oui, il part voie 7.",
          "C'est loin, le Louvre? — Non, c'est à 10 minutes à pied ou deux stations de métro.",
        ],
      },
    ],
    writingPractice: [
      { title: "Blog ville/quartier", task: "Présentez votre ville et votre quartier en 30 à 40 mots." },
      { title: "Post réseau social", task: "Écrivez un post de réseau social sur un festival : décrivez le festival et dites pourquoi vous l'aimez." },
      { title: "Audioguide", task: "Écrivez un court texte d'audioguide pour un lieu de votre ville." },
    ],
  },
  {
    id: "unite-5", unit: 5, title: "C'est tendance !",
    speakingPractice: [
      { notes: ["u5-b", "u5-a"], title: "Dans un magasin", task: "Demandez une taille ou une pointure et donnez votre avis sur un vêtement.", usefulPhrases: ["Vous avez cette robe en 38 ?", "Je fais du 40.", "C'est trop petit.", "Ça me va."] },
      { notes: ["u5-c"], title: "Parler de la météo", task: "Présentez la météo d'aujourd'hui ou de demain.", usefulPhrases: ["Aujourd'hui, il fait beau.", "Il pleut.", "Demain, il va faire froid.", "Il y a du soleil."] },
      { notes: ["u5-g", "u5-f"], title: "Décrire un objet", task: "Décrivez un objet : forme, taille, poids, utilité.", usefulPhrases: ["C'est petit et rond.", "C'est en plastique.", "Ça sert à écrire.", "C'est léger."] },
      {
        title: "Dans un magasin — Poids, Taille, Matière, Prix",
        task: "Cẩm nang các câu hỏi cân nặng, kích cỡ, chất liệu, giá cả khi mua sắm.",
        rule: `KHI MUA SẮM — 4 chủ đề cần nắm chắc (Production orale):

⚖️ POIDS — Cân nặng:

Với NGƯỜI (động từ PESER):
• Tu pèses combien ? / Vous pesez combien ?
• Quel est ton/votre poids ?
→ Je pèse [60] kilos. / Mon poids est de [60] kilos.

Với ĐỒ VẬT:
• Quel est le poids de [la valise] ?
→ Elle pèse [10] kilos. / Son poids est de [10] kilos.
→ Il/Elle est de [X] kilos.
Ví dụ: Mon sac pèse 1 kilo. = Mon sac est de 1 kilo.

📏 TAILLE — Kích cỡ:

Chiều cao (động từ MESURER / FAIRE):
• Quelle est ta taille ?
→ Je mesure 1m65. / Je fais 1m70.

Cỡ quần áo (FAIRE DU + số/chữ):
• Quelle est ta taille ? / Vous faites quelle taille ?
→ Je fais du M. / Je fais du 38. / Je fais du L.
⚠️ Dùng FAIRE DU, không phải "je suis taille M"

Cỡ giày (CHAUSSER / FAIRE DU):
• Tu chausses combien ? / Vous faites quelle taille ?
→ Je chausse du 39. / Je fais du 39.

🧵 MATIÈRE — Chất liệu:

EN + matière = làm bằng... (KHÔNG có mạo từ sau EN!)
• en coton   = bằng cotton/vải bông
• en laine   = bằng len
• en cuir    = bằng da
• en plastique = bằng nhựa
• en tissu   = bằng vải
• en métal   = bằng kim loại
• en soie    = bằng lụa
• en bois    = bằng gỗ

Hỏi chất liệu — 2 cách:
• Quelle est la matière de [la valise] ?
• De quelle matière est [la valise] ?
→ C'est en cuir. / Elle est en plastique. / Mon tee-shirt est en coton.

⚠️ Không nói "C'est fait de cuir" ở trình độ A1 → dùng "C'est en cuir"

💰 PRIX — Giá:

Hỏi giá — 3 cách đều đúng:
• Quel est le prix ? / Quel est le prix de [la valise] ?
• Combien ça coûte ?
• C'est combien ?
→ C'est [20] euros. / Ça coûte [20] euros.

👗 MÔ TẢ ĐỒ VẬT VÀ TRANG PHỤC:

Quels objets technologiques avez-vous / as-tu ?
→ J'ai un smartphone / une tablette / un ordinateur portable / une montre connectée.

Quels vêtements / accessoires portez-vous aujourd'hui ?
→ Je porte une robe / un tee-shirt / une ceinture / des lunettes.
→ Je porte des chaussures. / Je porte une paire de chaussures.`,
        examples: [
          "Tu pèses combien? — Je pèse 65 kilos. / Mon poids est de 65 kilos.",
          "Quel est le poids de la valise? — Elle pèse 8 kilos. / Son poids est de 8 kilos.",
          "Quelle est ta taille? — Je mesure 1m70. / Je fais du 40.",
          "Tu chausses combien? — Je chausse du 38. / Je fais du 38.",
          "De quelle matière est ce sac? — C'est en cuir. Il est très solide!",
          "Quelle est la matière de cette veste? — Elle est en laine. C'est chaud!",
          "Combien ça coûte? / C'est combien? — Ça coûte 45 euros. / C'est 45 euros.",
          "Quels vêtements portez-vous aujourd'hui? — Je porte un jean et un tee-shirt en coton.",
        ],
      },
    ],
    writingPractice: [
      { title: "Journal en ligne", task: "Créez un court article sur la mode, le recyclage ou une tendance." },
      { title: "Annonce produit", task: "Écrivez une petite annonce pour vendre ou présenter un objet." },
      { title: "Message shopping", task: "Écrivez un message pour demander un avis sur un vêtement." },
    ],
  },
  {
    id: "unite-6", unit: 6, title: "Qu'est-ce qu'on fait aujourd'hui ?",
    speakingPractice: [
      { notes: ["u6-b"], title: "Routine quotidienne", task: "Présentez votre journée habituelle.", usefulPhrases: ["Je me lève à sept heures.", "Le matin, je travaille.", "Je déjeune à midi.", "Le soir, je regarde la télé."] },
      { notes: ["u6-c"], title: "Proposer une sortie", task: "Proposez une sortie ; votre ami(e) accepte ou refuse.", usefulPhrases: ["On va au cinéma ?", "Tu veux venir ?", "D'accord !", "Désolé(e), je ne peux pas."] },
      { notes: ["u6-f", "u6-e"], title: "Décrire une personne", task: "Décrivez une célébrité sans dire son nom ; votre partenaire devine qui c'est.", usefulPhrases: ["Il est grand.", "Elle a les cheveux longs.", "Il est acteur.", "C'est… ?"] },
      {
        title: "Proposer une sortie & parler de sa journée",
        task: "Cẩm nang các câu rủ đi chơi và kể về hoạt động trong ngày.",
        rule: `PROPOSER ET ORGANISER UNE SORTIE:

PROPOSER (rủ rê / đề nghị):
• Tu es libre [ce soir / samedi / ce week-end] ? — Bạn rảnh [tối nay / thứ Bảy / cuối tuần] không?
• On va [au cinéma / au musée / au restaurant / en boîte] ? — Mình đi [xem phim / bảo tàng / nhà hàng / quán bar] nhé?
• Tu veux [voir un film / manger ensemble / faire une promenade] ? — Bạn muốn [xem phim / ăn cùng nhau / đi dạo] không?
• Ça te dit [une expo sur Brancusi / un concert de jazz] ? — Bạn thấy [một triển lãm Brancusi / một buổi hòa nhạc jazz] thế nào?
• Je t'invite ! / C'est moi qui invite. — Tớ mời cậu! / Để tớ mời.

ACCEPTER (đồng ý):
• Oui, bonne idée ! / Pourquoi pas ! / Avec plaisir ! — Ừ, ý hay đấy! / Sao lại không! / Rất sẵn lòng!
• Super ! / Génial ! / Je suis partant(e) ! — Tuyệt! / Đỉnh! / Tớ tham gia liền!
• À quelle heure / Où on se retrouve ? — Mấy giờ / Gặp ở đâu?

REFUSER POLIMENT (từ chối lịch sự):
• Désolé(e), je ne peux pas. / Je suis occupé(e). — Xin lỗi, tớ không đi được. / Tớ đang bận.
• Je dois [travailler / garder les enfants / rester à la maison]. — Tớ phải [làm việc / trông con / ở nhà].
• J'ai déjà [un rendez-vous / un cours / un dîner]. — Tớ đã có [một cuộc hẹn / một buổi học / một bữa tối] rồi.
• Une prochaine fois peut-être ? — Để lần sau nhé?

SE DONNER RENDEZ-VOUS (hẹn gặp):
• On se retrouve [devant le cinéma / à la station de métro] ? — Mình gặp nhau [trước rạp phim / ở ga tàu điện] nhé?
• À [19h30] ça te va ? / On se retrouve à quelle heure ? — [19h30] được không? / Mình gặp lúc mấy giờ?
• Je te retrouve là-bas ! / À tout à l'heure ! — Tớ gặp cậu ở đó nhé! / Lát gặp!

PARLER D'UN SPECTACLE / FILM (bàn về buổi diễn / phim):
• Tu as vu [ce film / cette série / cette expo] ? — Bạn xem [phim này / phim bộ này / triển lãm này] chưa?
• C'est bien ? Tu me recommandes ? — Có hay không? Bạn có giới thiệu không?
• C'est quel genre ? / L'histoire parle de quoi ? — Thể loại gì vậy? / Nội dung nói về gì?
• C'était [super / nul / émouvant / drôle / long]. — Nó [tuyệt / dở tệ / cảm động / vui / dài lê thê].
• Je l'ai adoré ! / J'ai bien aimé mais la fin est décevante. — Tớ mê lắm! / Tớ thích nhưng đoạn kết hơi hụt hẫng.

SA ROUTINE QUOTIDIENNE (thói quen hằng ngày — nói đơn giản):
• D'habitude, je [prends le bus / travaille de 9h à 18h]. — Thường thì tôi [đi xe buýt / làm từ 9h đến 18h].
• Le matin, je [prends un café / lis les news]. — Buổi sáng, tôi [uống cà phê / đọc tin tức].
• Le week-end, je [sors avec des amis / reste à la maison / fais du sport]. — Cuối tuần, tôi [đi chơi với bạn / ở nhà / tập thể thao].
• Le lundi, j'ai [cours / réunion]. Tous les vendredis, je [finis tôt]. — Thứ Hai tôi có [buổi học / cuộc họp]. Thứ Sáu nào tôi cũng [tan sớm].`,
        examples: [
          "Tu es libre samedi soir? On va au cinéma? — Oui, bonne idée! À quelle heure?",
          "Il y a un concert de jazz au Bataclan. Ça te dit? — Pourquoi pas! À quelle heure ça commence?",
          "Désolée, je ne peux pas vendredi. J'ai déjà un dîner prévu. — Pas de problème, une prochaine fois!",
          "On se retrouve devant le cinéma à 19h30? — Parfait, à tout à l'heure!",
          "Tu as vu le dernier film de Klapisch? C'était bien? — Oui, j'ai adoré! C'est très drôle.",
          "D'habitude, le week-end je sors avec des amis le samedi et le dimanche je reste tranquille.",
        ],
      },
    ],
    writingPractice: [
      { title: "Production écrite", task: "Écrivez un message pour proposer, accepter ou refuser une sortie." },
      { title: "Affiche d'une célébrité", task: "Écrivez le texte d'une affiche sur une célébrité : description physique, caractère et activités." },
      { title: "Agenda", task: "Écrivez votre programme de la journée avec les heures." },
    ],
  },
  {
    id: "unite-7", unit: 7, title: "Chez moi !",
    speakingPractice: [
      { notes: ["u7-a", "u7-c"], title: "Décrire son logement", task: "Présentez votre logement, les pièces et les meubles.", usefulPhrases: ["J'habite dans un appartement.", "Il y a deux chambres.", "Dans le salon, il y a un canapé.", "La cuisine est petite."] },
      { notes: ["u7-f"], title: "Règles de colocation", task: "Expliquez les règles de vie commune.", usefulPhrases: ["Il faut ranger la cuisine.", "On ne fume pas.", "Chacun fait le ménage.", "Il est interdit de faire du bruit."] },
      { notes: ["u7-g"], title: "Problème domestique", task: "Expliquez un problème et demandez une solution.", usefulPhrases: ["Le chauffage ne marche pas.", "Il y a une fuite d'eau.", "Vous pouvez réparer ?", "C'est urgent."] },
      {
        title: "Chercher un logement",
        task: "Cẩm nang các câu tìm nhà, hỏi thuê nhà, mô tả chỗ ở.",
        rule: `TÌM VÀ MÔ TẢ CHỖ Ở:

LOẠI NHÀ Ở (types de logement):
un studio (1 pièce tout-en-un) · un T1 (1 pièce + cuisine séparée)
un T2 (2 pièces) · un T3 (3 pièces) · un appartement · une maison
une résidence étudiante · une chambre chez l'habitant (colocation)

DÉCRIRE SON LOGEMENT (mô tả chỗ ở):
• J'habite dans un [appartement / studio] de [X] m². — Tôi sống trong [căn hộ / phòng studio] rộng [X] m².
• Il y a [X] pièces : [salon / chambre / cuisine / salle de bains / WC]. — Có [X] phòng: [phòng khách / phòng ngủ / bếp / phòng tắm / nhà vệ sinh].
• C'est [meublé / non meublé]. / C'est [grand / petit / lumineux / sombre]. — Nhà [có sẵn đồ / trống]. / Nhà [rộng / nhỏ / sáng / tối].
• Il y a [un balcon / un jardin / une terrasse / un parking / une cave]. — Có [ban công / vườn / sân thượng / chỗ đậu xe / tầng hầm].
• C'est au [rez-de-chaussée / 1er / 2e] étage. — Nhà ở [tầng trệt / tầng 1 / tầng 2].
• L'immeuble a [un ascenseur / un gardien / un digicode / un interphone]. — Tòa nhà có [thang máy / bảo vệ / khóa mã số / chuông liên lạc].
• C'est près [du métro / des commerces / d'une école]. — Gần [ga tàu điện / khu mua sắm / trường học].

CHERCHER UN LOGEMENT — conversation (đi tìm nhà):
• Je cherche un appartement [2 pièces / T2] dans [le 5e arrondissement / le centre]. — Tôi tìm một căn hộ [2 phòng / T2] ở [quận 5 / trung tâm].
• Mon budget est de [X] euros par mois, charges comprises. — Ngân sách của tôi là [X] euro/tháng, đã gồm phí chung.
• Je cherche quelque chose de [meublé / calme / proche des transports]. — Tôi tìm nơi [có sẵn đồ / yên tĩnh / gần phương tiện công cộng].
• Quand est-ce que c'est disponible ? / Je peux le visiter quand ? — Khi nào trống ạ? / Tôi xem nhà được khi nào?
• Le loyer est de combien ? Les charges sont comprises ? — Tiền thuê bao nhiêu? Đã gồm phí chung chưa?
• Il y a une caution ? C'est combien ? — Có tiền đặt cọc không? Bao nhiêu? (= tiền đặt cọc, thường 1 tháng tiền thuê)
• Les animaux sont acceptés ? / Le parking est inclus ? — Có cho nuôi thú cưng không? / Có kèm chỗ đậu xe không?
• C'est bien isolé ? Il y a du bruit ? — Cách âm tốt chứ? / Có ồn không?

VOCABULAIRE ESSENTIEL DU LOGEMENT:
le loyer = tiền thuê nhà (mensuel = mỗi tháng)
les charges = chi phí điện/nước/rác...
meublé / non meublé = có / không có đồ đạc
la caution = tiền đặt cọc
le propriétaire / la propriétaire = chủ nhà
le/la locataire = người thuê nhà
l'agence immobilière = công ty bất động sản
le bail = hợp đồng thuê nhà`,
        examples: [
          "J'habite dans un T2 de 45m² au 3e étage. Il y a un salon, une chambre et une cuisine équipée.",
          "Mon appartement est lumineux et calme. Il y a un petit balcon avec vue sur le jardin.",
          "Je cherche un studio meublé près du métro, budget 700 euros charges comprises.",
          "Le loyer est de combien? Et les charges sont comprises? — C'est 850 euros, charges incluses.",
          "Il y a une caution? — Oui, l'équivalent d'un mois de loyer.",
          "Je peux visiter l'appartement ce week-end? — Bien sûr, samedi à 14h?",
        ],
      },
    ],
    writingPractice: [
      { title: "Annonce logement", task: "Écrivez une annonce pour louer ou partager un logement." },
      { title: "Message d'excuse", task: "Écrivez un message à un voisin pour vous excuser." },
      { title: "Demande de réparation", task: "Écrivez un message pour signaler un problème domestique." },
    ],
  },
  {
    id: "unite-8", unit: 8, title: "En forme !",
    speakingPractice: [
      { notes: ["u8-b", "u8-c"], title: "Chez le médecin", task: "Expliquez vos symptômes et répondez aux questions du médecin.", usefulPhrases: ["J'ai mal à la tête.", "J'ai de la fièvre.", "Je suis fatigué(e).", "Depuis deux jours."] },
      { notes: ["u8-c"], title: "Sport et santé", task: "Parlez de vos habitudes sportives et alimentaires.", usefulPhrases: ["Je fais du sport deux fois par semaine.", "Je mange des légumes.", "Je bois beaucoup d'eau.", "Je ne fume pas."] },
      { notes: ["u8-f"], title: "Donner un conseil", task: "Donnez des conseils à une personne fatiguée ou malade.", usefulPhrases: ["Repose-toi bien.", "Bois de l'eau.", "Il faut dormir.", "Ne mange pas trop de sucre."] },
      {
        title: "Chez le médecin",
        task: "Cẩm nang các câu khám bệnh, mô tả triệu chứng với bác sĩ.",
        rule: `KHÁM BỆNH — Hội thoại hoàn chỉnh:

📞 PRENDRE RENDEZ-VOUS (đặt lịch hẹn):
• Je voudrais prendre rendez-vous avec le docteur [nom], s'il vous plaît. — Tôi muốn đặt lịch hẹn với bác sĩ [tên] ạ.
• C'est urgent ou c'est pour un contrôle ? — Có gấp không hay là khám định kỳ ạ?
• J'ai mal à [la gorge] depuis [hier / deux jours]. C'est urgent. — Tôi đau [họng] từ [hôm qua / hai ngày nay]. Hơi gấp ạ.
• Vous avez une place aujourd'hui / cette semaine ? — Hôm nay / tuần này còn lịch trống không ạ?
• Je suis disponible [le matin / l'après-midi / n'importe quand]. — Tôi rảnh [buổi sáng / buổi chiều / lúc nào cũng được].

🩺 AVEC LE MÉDECIN — Décrire ses symptômes (tả triệu chứng):
(Ôn lại các cụm với AVOIR — xem Unité 0!)
• Docteur, j'ai mal à [la tête / la gorge / l'estomac / le dos / le genou]. — Thưa bác sĩ, tôi đau [đầu / họng / dạ dày / lưng / đầu gối].
• J'ai [un rhume / une angine / une toux / de la fièvre / 38,5]. — Tôi bị [cảm / viêm họng / ho / sốt / 38,5 độ].
• Ça a commencé [hier / avant-hier / il y a deux jours]. — Bắt đầu từ [hôm qua / hôm kia / hai ngày trước].
• Je tousse beaucoup. / Je me sens très fatigué(e). — Tôi ho nhiều. / Tôi thấy rất mệt.
• J'ai du mal à [dormir / avaler / marcher]. — Tôi khó [ngủ / nuốt / đi lại].

Répondre aux questions (trả lời câu hỏi):
• Vous avez des allergies ? — Non, aucune. / Oui, je suis allergique à [pénicilline]. — Anh/chị có dị ứng gì không? — Không, không có. / Có, tôi dị ứng [penicillin].
• Vous prenez des médicaments ? — Non. / Oui, je prends [médicament]. — Anh/chị đang uống thuốc gì không? — Không. / Có, tôi đang uống [thuốc].
• Vous fumez ? — Non. / Oui, j'ai arrêté. — Anh/chị có hút thuốc không? — Không. / Có, nhưng tôi đã bỏ.
• Vous avez été vacciné(e) contre [la grippe] ? — Anh/chị đã tiêm phòng [cúm] chưa?

Après l'examen (sau khi khám):
• C'est grave, docteur ? / Je dois m'arrêter de travailler ? — Có nặng không thưa bác sĩ? / Tôi có cần nghỉ làm không?
• Vous me prescrivez quelque chose ? — Bác sĩ kê đơn gì cho tôi chứ?
• Je reviens vous voir dans [X] jours si ça ne va pas mieux ? — Nếu không đỡ thì [X] ngày nữa tôi quay lại nhé?

💊 À LA PHARMACIE (ở nhà thuốc):
• J'ai une ordonnance du Dr [nom]. — Tôi có đơn thuốc của bác sĩ [tên].
• Je voudrais quelque chose pour [la toux / les maux de tête / le mal de gorge]. — Tôi muốn thuốc trị [ho / nhức đầu / đau họng].
• Vous avez [du paracétamol / du sirop / des pastilles] ? — Có [paracétamol / siro / viên ngậm] không ạ?
• Il faut prendre [combien de comprimés] par jour ? — Mỗi ngày uống [mấy viên] ạ?
• C'est remboursé par la Sécurité sociale ? — Cái này bảo hiểm xã hội có hoàn tiền không ạ?

PARTIES DU CORPS — à connaître:
la tête · le front · les yeux · le nez · la bouche · la gorge
les oreilles · le cou · les épaules · le dos · la poitrine
le ventre / l'estomac · les bras · les mains · les jambes
les genoux · les pieds · la cheville`,
        examples: [
          "Bonjour, je voudrais prendre rendez-vous avec le Dr Martin. J'ai mal à la gorge depuis deux jours.",
          "Docteur, j'ai de la fièvre — 38,5 — et je tousse beaucoup. Ça a commencé hier soir.",
          "J'ai du mal à avaler. Vous pensez que c'est une angine?",
          "Vous avez des allergies? — Non, aucune. Je ne prends pas de médicaments.",
          "C'est grave? — Non, c'est une angine virale. Reposez-vous et buvez beaucoup d'eau.",
          "J'ai une ordonnance. — Je vous prépare ça tout de suite. Prenez 3 fois par jour pendant 5 jours.",
        ],
      },
    ],
    writingPractice: [
      { title: "Programme sport et bien-être", task: "Créez un programme simple avec activités, conseils et interdictions." },
      { title: "Message santé", task: "Écrivez un message pour expliquer pourquoi vous ne pouvez pas venir." },
      { title: "Production écrite", task: "Rédigez quelques conseils pour être en forme." },
    ],
  },
  {
    id: "unite-9", unit: 9, title: "Bonnes vacances !",
    speakingPractice: [
      { notes: ["u9-b"], title: "Réserver un hôtel", task: "Appelez un hôtel et réservez une chambre.", usefulPhrases: ["Je voudrais réserver une chambre.", "Pour deux nuits.", "C'est combien ?"] },
      { notes: ["u9-c", "u9-e"], title: "Décrire une destination", task: "Présentez une ville, un pays ou un paysage de vacances.", usefulPhrases: ["C'est une belle ville.", "Il y a la mer.", "Le paysage est magnifique.", "On peut visiter des musées."] },
      { notes: ["u9-f"], title: "Préférences", task: "Comparez deux destinations et dites laquelle vous préférez.", usefulPhrases: ["Je préfère la montagne.", "La plage est plus reposante.", "Paris est plus grand que Nice.", "J'aime mieux la campagne."] },
      {
        title: "Planifier des vacances & À l'hôtel",
        task: "Cẩm nang các câu đặt khách sạn và lên kế hoạch cho kỳ nghỉ.",
        rule: `CHUẨN BỊ VÀ KỂ VỀ KỲ NGHỈ:

PLANIFIER (lên kế hoạch):
• On part où cette année ? Tu as des idées pour les vacances ? — Năm nay mình đi đâu? Bạn có ý tưởng gì cho kỳ nghỉ không?
• Je voudrais aller [à la mer / à la montagne / à l'étranger / en ville]. — Tôi muốn đi [biển / núi / nước ngoài / thành phố].
• On peut partir du [X] au [X] ? / On a [X] jours de congés. — Mình đi từ [ngày X] đến [ngày X] được không? / Mình có [X] ngày nghỉ phép.
• On voyage comment ? → En avion / en train / en voiture / en bateau. — Mình đi bằng gì? → Máy bay / tàu hỏa / ô tô / tàu thủy.
• On loge où ? → À l'hôtel / en camping / dans un Airbnb / chez des amis. — Mình ở đâu? → Khách sạn / cắm trại / Airbnb / nhà bạn bè.

🏨 À L'HÔTEL — Réserver:
• Je voudrais réserver une chambre [simple / double / familiale / twin]. — Tôi muốn đặt phòng [đơn / đôi / gia đình / hai giường].
• Du [18] au [23 août], soit [5] nuits. — Từ [18] đến [23 tháng 8], tức [5] đêm.
• Avec ou sans petit-déjeuner ? → Avec, s'il vous plaît. — Có kèm bữa sáng không ạ? → Có nhé.
• C'est combien la nuit ? / Le petit-déjeuner est compris ? — Bao nhiêu một đêm? / Đã gồm bữa sáng chưa?
• Les animaux sont acceptés ? / Il y a un parking ? — Có cho mang thú cưng không? / Có chỗ đậu xe không?
• À quel nom ? — Au nom de [nom]. — Đặt tên ai ạ? — Tên [tên].

✅ CHECK-IN (nhận phòng):
• Bonjour, j'ai une réservation au nom de [nom]. — Xin chào, tôi có đặt phòng tên [tên].
• Voici ma carte d'identité / mon passeport. — Đây là chứng minh thư / hộ chiếu của tôi.
• À quelle heure est le check-out ? — À 11h. — Mấy giờ trả phòng ạ? — Lúc 11h.
• Le Wi-Fi est gratuit ? / Quel est le code Wi-Fi ? — Wi-Fi miễn phí chứ? / Mật khẩu Wi-Fi là gì ạ?
• Vous avez un coffre-fort dans la chambre ? — Trong phòng có két sắt không ạ?

🔧 PROBLÈME À L'HÔTEL (sự cố ở khách sạn):
• La climatisation / le chauffage ne marche pas. — Máy lạnh / lò sưởi không chạy.
• Il n'y a pas de serviettes / de savon / de papier toilette. — Không có khăn tắm / xà phòng / giấy vệ sinh.
• Il y a beaucoup de bruit. Vous pouvez changer ma chambre ? — Ồn quá. Anh/chị đổi phòng giúp tôi được không?
• L'ascenseur est en panne. — Thang máy bị hỏng.

📸 RACONTER SES VACANCES (kể về kỳ nghỉ — thì quá khứ):
• Cette année, je suis allé(e) [en Martinique / au Portugal / à Tokyo]. — Năm nay, tôi đã đi [Martinique / Bồ Đào Nha / Tokyo].
• C'était [magnifique / décevant / inoubliable / reposant]. — Thật [tuyệt vời / đáng thất vọng / khó quên / thư giãn].
• J'ai [fait de la plongée / visité des musées / goûté la cuisine locale]. — Tôi đã [đi lặn / thăm bảo tàng / nếm thử ẩm thực địa phương].
• Il faisait [très chaud / beau / variable]. — Thời tiết [rất nóng / đẹp / thất thường].
• Je recommande vraiment [cet endroit / cet hôtel / ce restaurant]. — Tôi rất khuyên nên đến [nơi này / khách sạn này / nhà hàng này].
• La prochaine fois, j'aimerais aller [à…]. — Lần tới, tôi muốn đi [đến…].`,
        examples: [
          "On part où cet été? J'aimerais aller à la mer. — Pourquoi pas la Côte d'Azur?",
          "Je voudrais réserver une chambre double pour deux nuits, du 15 au 17 juillet.",
          "Le petit-déjeuner est compris? — Non, c'est 12 euros par personne.",
          "Bonjour, j'ai une réservation au nom de Nguyen. — Voici votre clé, chambre 204 au 2e étage.",
          "La climatisation ne marche pas. Pouvez-vous envoyer quelqu'un?",
          "Cette année j'ai visité la Martinique. C'était magnifique! Il faisait beau tous les jours et la plongée était incroyable.",
        ],
      },
    ],
    writingPractice: [
      { title: "Carte postale", task: "Écrivez une carte postale de vacances." },
      { title: "Brochure touristique", task: "Écrivez le texte d'une brochure touristique : lieux à visiter, activités et conseils." },
      { title: "Avis de voyage", task: "Écrivez un court avis sur une destination." },
    ],
  },
  {
    id: "unite-10", unit: 10, title: "Au travail !",
    speakingPractice: [
      { notes: ["u10-b"], title: "Présenter son université", task: "Présentez votre centre de langue, école ou université.", usefulPhrases: ["J'étudie à l'université.", "Mon école est à Hanoi.", "J'apprends le français.", "Les cours sont intéressants."] },
      { notes: ["u10-c"], title: "Compétences", task: "Dites ce que vous savez faire et ce que vous voulez apprendre.", usefulPhrases: ["Je sais parler anglais.", "Je sais utiliser un ordinateur.", "Je voudrais apprendre l'espagnol.", "Je veux travailler à l'étranger."] },
      { notes: ["u10-c", "u10-e"], title: "Projet professionnel", task: "Présentez votre métier idéal ou votre projet professionnel.", usefulPhrases: ["Je voudrais être médecin.", "Je veux travailler dans le tourisme.", "Mon métier idéal, c'est professeur.", "Plus tard, je vais créer mon entreprise."] },
      {
        title: "Parler de son travail et de ses études",
        task: "Cẩm nang các câu nói về công việc, ngành học, tìm việc làm.",
        rule: `PARLER DE SON TRAVAIL:

SON POSTE ET SON ENTREPRISE (vị trí & công ty):
• Je travaille dans [une entreprise / une école / un hôpital / une ONG]. — Tôi làm trong [một công ty / một trường học / một bệnh viện / một tổ chức phi chính phủ].
• Je suis [profession] depuis [X] ans / mois. — Tôi làm [nghề] được [X] năm / tháng rồi.
• Mon poste, c'est [responsable marketing / développeur / infirmier…]. — Vị trí của tôi là [trưởng phòng marketing / lập trình viên / y tá…].
• Je travaille [à plein temps / à mi-temps / en télétravail / en freelance]. — Tôi làm [toàn thời gian / bán thời gian / từ xa / tự do].
• Mon bureau est [au centre-ville / en banlieue / à domicile]. — Văn phòng tôi ở [trung tâm / ngoại ô / tại nhà].

LES CONDITIONS DE TRAVAIL (điều kiện làm việc):
• Je commence à [X]h et je finis à [X]h. Je travaille [X] heures par semaine. — Tôi bắt đầu lúc [X]h và tan lúc [X]h. Tôi làm [X] giờ mỗi tuần.
• Je prends [X] semaines de congés par an. — Tôi được nghỉ [X] tuần phép mỗi năm.
• Mon manager / ma responsable est [sympa / exigeant(e) / compétent(e)]. — Sếp của tôi [dễ chịu / khó tính / giỏi].
• Je dois souvent voyager pour le travail. — Tôi thường phải đi công tác.
• Je gagne [bien / correctement / pas assez] ma vie. — Tôi kiếm sống [khá / tạm ổn / chưa đủ].
• L'ambiance au bureau est [bonne / tendue / très agréable]. — Không khí ở văn phòng [tốt / căng thẳng / rất dễ chịu].

CE QUE J'AIME / JE N'AIME PAS (điều tôi thích / không thích):
• Ce que j'aime dans mon travail, c'est [le contact avec les clients / la créativité]. — Điều tôi thích ở công việc là [được tiếp xúc khách hàng / sự sáng tạo].
• Ce qui est difficile, c'est [les horaires / le stress / les réunions]. — Điều khó khăn là [giờ giấc / áp lực / các cuộc họp].
• Je voudrais évoluer vers [un poste de / le management]. — Tôi muốn thăng tiến lên [vị trí / quản lý].

PARLER DE SES ÉTUDES (nói về việc học):
• Je suis étudiant(e) en [droit / médecine / commerce / langues / informatique]. — Tôi là sinh viên ngành [luật / y / thương mại / ngôn ngữ / tin học].
• Je suis en [1ère / 2e / 3e] année de [licence / master / BTS]. — Tôi học năm [1 / 2 / 3] hệ [cử nhân / thạc sĩ / cao đẳng nghề].
• Mon université / mon école est à [Lyon / Paris / Hanoï]. — Trường đại học / trường của tôi ở [Lyon / Paris / Hà Nội].
• Mes cours sont [très intéressants / difficiles / passionnants]. — Các môn học của tôi [rất thú vị / khó / cuốn hút].
• J'ai [X] heures de cours par semaine. Je travaille aussi [X] heures à la maison. — Tôi có [X] giờ học mỗi tuần. Tôi cũng học thêm [X] giờ ở nhà.
• Je veux devenir [profession] après mes études. — Tôi muốn trở thành [nghề] sau khi học xong.
• Je cherche un stage / alternance dans [le domaine]. — Tôi đang tìm chỗ thực tập / vừa học vừa làm trong [lĩnh vực].

CHERCHER UN EMPLOI (tìm việc):
• Je cherche un [emploi / stage / poste] dans [le domaine X]. — Tôi tìm [việc làm / chỗ thực tập / vị trí] trong [lĩnh vực X].
• J'ai de l'expérience en [marketing / comptabilité / enseignement]. — Tôi có kinh nghiệm về [marketing / kế toán / giảng dạy].
• Je parle [X] langues. Je maîtrise [outils numériques / Excel / design]. — Tôi nói [X] thứ tiếng. Tôi thành thạo [công cụ số / Excel / thiết kế].
• Je suis disponible à partir du [date]. / Je suis disponible immédiatement. — Tôi có thể bắt đầu từ [ngày]. / Tôi có thể đi làm ngay.`,
        examples: [
          "Je travaille dans une entreprise tech depuis 3 ans. Je suis développeur à plein temps.",
          "Je travaille en télétravail 3 jours par semaine. C'est très pratique, je suis moins fatigué.",
          "Ce que j'aime dans mon travail, c'est la créativité et le contact avec l'équipe.",
          "Je suis étudiante en droit en 2e année de licence à l'université de Lyon.",
          "Mes cours sont intéressants mais il y a beaucoup de travail à la maison.",
          "Je cherche un stage de 6 mois dans le domaine du marketing digital. Je parle français et anglais.",
        ],
      },
    ],
    writingPractice: [
      { title: "Profil étudiant", task: "Écrivez une courte présentation de vos études et compétences." },
      { title: "Projet professionnel", task: "Écrivez ce que vous voulez faire plus tard." },
      { title: "Centre de langue", task: "Préparez le texte d'une vidéo pour présenter votre centre de langue." },
    ],
  },
];
