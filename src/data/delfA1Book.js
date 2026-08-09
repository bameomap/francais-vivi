// « Le DELF A1 100 % réussite » (Didier FLE, 2e édition 2022) — everything in
// the book that isn't a graded exercise: what the exam is, how each paper is
// marked, and the writing/speaking tasks, whose "answer" is a production the
// book can only model rather than key.
//
// Sources are cited per block by page so anything here can be checked against
// the book. Vietnamese sits in `vi` fields the UI reveals on request — the exam
// is in French and reading a translation first defeats the practice.

// ── 1 · Giới thiệu (p.3–8) ───────────────────────────────────────
export const INTRO = {
  what: {
    fr: "Le DELF, diplôme d'études en langue française, est une certification officielle du ministère français de l'Éducation nationale. C'est un diplôme internationalement reconnu, valable sans limitation de durée.",
    vi: "DELF là chứng chỉ tiếng Pháp chính thức của Bộ Giáo dục Pháp, được công nhận quốc tế và có giá trị vĩnh viễn — không hết hạn.",
  },
  levels: "DELF A1.1 (Prim), A1, A2, B1, B2 — theo Khung tham chiếu châu Âu (CECRL).",
  pass: {
    fr: "L'obtention de la moyenne (50 points sur 100) à l'ensemble des épreuves permet la délivrance du diplôme. Note minimale par épreuve : 5/25.",
    vi: "Đạt 50/100 tổng 4 kỹ năng là đỗ. Nhưng mỗi kỹ năng phải được ít nhất 5/25 — dưới ngưỡng đó là trượt dù tổng điểm cao.",
  },
  // p.6 — how the exam day actually runs
  day: [
    { fr: "1. Compréhension de l'oral — 20 min, 25 pts",
      vi: "Nghe — 20 phút, 25 điểm. Nghe 5 tài liệu, mỗi tài liệu 2 lần." },
    { fr: "2. Compréhension des écrits — 30 min, 25 pts",
      vi: "Đọc — 30 phút, 25 điểm. 4 bài, 8 tài liệu." },
    { fr: "3. Production écrite — 30 min, 25 pts",
      vi: "Viết — 30 phút, 25 điểm. Điền phiếu + viết đoạn ≥ 40 từ." },
    { fr: "4. Production orale — 10 min de préparation, 5 à 7 min de passation, 25 pts",
      vi: "Nói — chuẩn bị 10 phút, thi 5–7 phút, 25 điểm. Thi vào ngày thứ hai, thi riêng từng người." },
  ],
  note: {
    fr: "L'examen collectif dure 1 h 20. La compréhension des écrits et la production écrite se font ensemble en 1 heure.",
    vi: "Ba phần thi chung (Nghe – Đọc – Viết) làm trong 1 giờ 20. Đọc và Viết làm liền nhau trong 1 tiếng, bạn tự chia thời gian — đây là chỗ nhiều người bị hụt giờ.",
  },
  // p.69–70, the book's own revision checklist
  strategy: [
    { fr: "Avant de lire un texte, observer sa forme et lire son titre.",
      vi: "Nhìn hình thức tài liệu và tiêu đề trước khi đọc chữ — biết ngay đó là thư, áp phích hay quảng cáo." },
    { fr: "Souligner les chiffres, les dates et les mots clés.",
      vi: "Gạch chân số, ngày tháng và từ khoá." },
    { fr: "Lire les questions avant le document.",
      vi: "Đọc câu hỏi trước tài liệu — để biết cần tìm gì." },
    { fr: "Les mots des questions sont souvent différents des mots du document.",
      vi: "Từ trong câu hỏi thường KHÁC từ trong tài liệu: garage → mécanicien, prix → tarif, €." },
    { fr: "Le jour de l'examen : respirer, se détendre, repérer les mots que je reconnais.",
      vi: "Ngày thi: hít thở, bình tĩnh, bám vào những từ mình nhận ra để đoán chủ đề chung." },
  ],
};

// ── 4 · Production écrite (p.71–86) ──────────────────────────────
// Exercice 1 is a form: ten fields, one point each. Exercice 2 is a short
// message, marked on the grid reprinted at p.130.
export const PE = {
  duree: "30 minutes", points: 25, pages: "p.71–86",
  intro: {
    fr: "2 exercices : compléter un formulaire (10 points) puis écrire un texte court de 40 mots minimum (15 points).",
    vi: "2 bài: điền phiếu thông tin (10 điểm) rồi viết một đoạn ngắn tối thiểu 40 từ (15 điểm).",
  },
  timing: {
    fr: "Faire l'exercice 1 en 10 minutes, l'exercice 2 en 20 minutes.",
    vi: "Chia giờ: bài 1 làm 10 phút, bài 2 làm 20 phút.",
  },
  // p.130 — the official marking grid for exercice 2
  grid: [
    { fr: "Respect de la consigne", pts: 2, vi: "Đúng loại thư được yêu cầu, đủ độ dài tối thiểu." },
    { fr: "Correction sociolinguistique", pts: 2, vi: "Có chào hỏi đầu thư và kết thư; chọn đúng tu/vous." },
    { fr: "Capacité à informer et/ou à décrire", pts: 4, vi: "Viết được câu đơn giản về bản thân và hoạt động của mình." },
    { fr: "Lexique / orthographe lexicale", pts: 3, vi: "Vốn từ cơ bản, viết đúng chính tả những từ quen thuộc." },
    { fr: "Morphosyntaxe / orthographe grammaticale", pts: 3, vi: "Dùng được cấu trúc và dạng ngữ pháp đơn giản đã thuộc." },
    { fr: "Cohérence et cohésion", pts: 1, vi: "Nối câu bằng liên từ rất cơ bản: et, alors." },
  ],
  tips: [
    { fr: "Les fautes d'orthographe ne comptent pas dans l'exercice 1.",
      vi: "Bài 1 không trừ điểm lỗi chính tả — cứ điền, đừng bỏ trống dòng nào." },
    { fr: "En français, le nom de famille s'écrit en majuscules.",
      vi: "Họ viết IN HOA. Trong phòng thi họ thật được thay bằng XXXX cho ẩn danh." },
    { fr: "La date de naissance s'écrit 09/04/1978 ou 9 avril 1978. Le numéro de téléphone a 10 chiffres.",
      vi: "Ngày sinh: 09/04/1978 hoặc 9 avril 1978. Số điện thoại Pháp có đúng 10 chữ số." },
    { fr: "La nationalité s'accorde : vietnamien / vietnamienne.",
      vi: "Quốc tịch phải hợp giống: nam vietnamien, nữ vietnamienne." },
    { fr: "Compter et noter le nombre de mots à la fin.",
      vi: "Đếm và ghi số từ ở cuối bài. Dưới 40 từ bị trừ điểm." },
  ],
  forms: [
    { id: "pe-e1", label: "Exercice 1", page: 80, pts: 10,
      setup: "Lisez le formulaire d'inscription à votre bibliothèque à Bordeaux. Complétez le formulaire.",
      setupVi: "Điền phiếu đăng ký thẻ thư viện ở Bordeaux.",
      fields: ["NOM", "Prénom", "Date de naissance", "Nationalité", "Adresse",
               "Code postal", "Ville", "Tél. mobile", "Adresse électronique", "Profession"],
      model: ["VARIN", "Estelle", "29/05/1982", "Française", "21 cours de l'Yser",
              "33000", "Bordeaux", "0656874253", "e.varin@courriel.fr", "pharmacienne"] },
    { id: "pe-e2", label: "Exercice 2", page: 80, pts: 10,
      setup: "Complétez ce formulaire pour un abonnement de train.",
      setupVi: "Điền phiếu đăng ký thẻ tàu.",
      fields: ["Civilité (Monsieur / Madame)", "NOM", "Prénom", "Date de naissance", "Courriel",
               "Adresse (n° et nom de la voie)", "Code postal", "Ville", "Pays", "Téléphone"],
      model: ["Madame", "DURROUSSEAU", "Ghislaine", "08/04/1948", "gdurrous@courriel.fr",
              "21 rue du Mont Berny", "64000", "Pau", "France", "05.59.87.24.72"] },
    { id: "pe-e3", label: "Exercice 3", page: 81, pts: 10,
      setup: "Vous êtes une famille avec trois enfants. Vous complétez ce formulaire pour réserver une chambre double et trois chambres simples à l'hôtel Saint-Malo.",
      setupVi: "Gia đình bạn có ba con. Điền phiếu đặt 1 phòng đôi và 3 phòng đơn ở khách sạn Saint-Malo.",
      fields: ["Date d'arrivée", "Date de départ", "Adulte(s)", "Enfant(s)", "Chambre double",
               "Chambre simple", "Petit-déjeuner", "NOM", "Téléphone", "Courriel"],
      model: ["04/08/2016", "06/08/2016", "2 adultes", "3 enfants", "1 chambre double",
              "3 chambres simples", "petit-déjeuner", "M. GOUPIL Christian", "06 74 36 98 21",
              "goupil@courriel.fr"] },
  ],
  // The essays: prompt + the book's own Proposition, kept behind a reveal.
  essays: [
    { id: "pe-e4", label: "Exercice 4", page: 82, pts: 15, worked: true,
      setup: "Vous êtes en vacances. Vous écrivez un courrier électronique à votre amie française Viviane pour voir une exposition. Vous indiquez le sujet et le lieu de l'exposition. Vous invitez votre amie et proposez une heure et un lieu de rendez-vous. Vous lui demandez ce qu'elle veut faire après la visite. (40 mots minimum)",
      setupVi: "Bạn đang đi nghỉ. Viết email cho bạn Pháp tên Viviane rủ đi xem triển lãm: nêu chủ đề và địa điểm triển lãm, mời bạn ấy, đề nghị giờ và chỗ hẹn, hỏi xem sau đó bạn ấy muốn làm gì. (≥ 40 từ)",
      must: ["saluer", "inviter / proposer", "le sujet de l'exposition", "le lieu",
             "la date et l'heure du rendez-vous", "prendre congé"],
      model: "Salut Viviane,\nComment ça va ? Moi, je vais bien. Je suis en vacances.\nIl y a une exposition sur les impressionnistes au musée d'Orsay à Paris. Tu peux venir avec moi samedi à 14 h. Rendez-vous au musée ?\nÀ bientôt, je t'embrasse,\nMaude" },
    { id: "pe-e5", label: "Exercice 5", page: 82, pts: 15,
      setup: "Vous envoyez un message électronique à votre ami québécois. Vous proposez un saut à l'élastique pour son anniversaire. Vous indiquez la date et le lieu du saut. Vous lui demandez d'apporter sa caméra et de vous appeler pour confirmer. (40 mots minimum)",
      setupVi: "Viết email cho bạn người Québec: rủ nhảy bungee nhân sinh nhật, nêu ngày và địa điểm, dặn mang máy quay và gọi lại xác nhận. (≥ 40 từ)",
      must: ["proposer", "l'anniversaire", "la date", "le lieu", "apporter la caméra", "appeler pour confirmer"],
      model: "Mon cher ami,\nPour ton anniversaire, je t'invite à faire un saut à l'élastique. Je te propose de faire le grand plongeon au Viaduc de la Souleuvre près de Caen en Normandie le 12 octobre à 9 heures. Appelle-moi pour confirmer et apporte ta caméra pour filmer !\nGros bisous" },
    { id: "pe-e6", label: "Exercice 6", page: 83, pts: 15,
      setup: "Vous habitez en France et vous partez en voyage d'affaires. Vous laissez un message à votre voisine. Vous lui demandez de vous rendre service. Vous lui donnez des instructions et vous indiquez la date de votre retour. (40 mots minimum)",
      setupVi: "Bạn sống ở Pháp và sắp đi công tác. Để lại lời nhắn cho bà hàng xóm: nhờ giúp một việc, đưa hướng dẫn cụ thể, nói ngày bạn về. (≥ 40 từ)",
      must: ["message à la voisine", "3 instructions", "la date du retour", "remercier"],
      tip: "Pour les instructions, vous pouvez utiliser l'impératif.",
      tipVi: "Phần dặn việc nên dùng thức mệnh lệnh (impératif): Arrosez… / N'oubliez pas…",
      model: "Chère voisine,\nJe rentre mercredi prochain. Pouvez-vous arroser les plantes s'il vous plaît et prendre le courrier dans la boîte aux lettres ? Ne pas oublier les tomates sur le balcon ! Je vous remercie beaucoup.\nCordialement, Votre voisin." },
    { id: "pe-e7", label: "Exercice 7", page: 83, pts: 15,
      setup: "Vous recevez un message d'un ami français. Il vous propose de faire une randonnée. Répondez et expliquez pourquoi vous acceptez ou refusez. (40 mots minimum)",
      setupVi: "Một người bạn Pháp rủ bạn đi leo núi. Trả lời và giải thích vì sao bạn nhận lời hoặc từ chối. (≥ 40 từ)",
      must: ["répondre à l'invitation", "accepter ou refuser", "expliquer pourquoi", "formule de politesse"],
      model: "Damien,\nMerci pour ta proposition. Malheureusement, je travaille dimanche prochain. Je ne suis pas disponible et je ne peux pas faire une randonnée avec toi. C'est dommage ! Une prochaine fois ?\nÀ bientôt, Charles" },
    { id: "pe-e8", label: "Exercice 8", page: 83, pts: 15,
      setup: "Vous venez de déménager à Genève en Suisse pour vos études ou votre travail. Vous écrivez un e-mail à un(e) ami(e) pour lui raconter votre nouvelle vie. Vous lui décrivez ce que vous faites et vous lui demandez de ses nouvelles. (40 mots minimum)",
      setupVi: "Bạn vừa chuyển tới Genève (Thuỵ Sĩ) để học hoặc làm việc. Viết email kể cuộc sống mới, mô tả bạn làm gì và hỏi thăm bạn mình. (≥ 40 từ)",
      must: ["saluer", "raconter la nouvelle vie", "décrire ses activités", "demander des nouvelles", "prendre congé"],
      model: "Salut Alice,\nComment ça va ? Moi, je vais très bien. J'ai déménagé à Genève et ma nouvelle vie est fantastique. C'est une très belle ville avec la nature à côté. La qualité de vie est extraordinaire. Je rencontre des gens sympas et je ne m'ennuie pas.\nUne bise, Lucie" },
  ],
};

// ── 5 · Production orale (p.87–107) ──────────────────────────────
export const PO = {
  duree: "10 minutes de préparation · 5 à 7 minutes de passation", points: 25, pages: "p.87–107",
  intro: {
    fr: "3 parties : l'entretien dirigé, l'échange d'informations, le dialogue simulé. L'épreuve est individuelle.",
    vi: "3 phần: phỏng vấn, hỏi thông tin từ thẻ từ, và đóng vai tình huống. Thi riêng từng người với giám khảo.",
  },
  timing: {
    fr: "Vous avez 10 minutes pour préparer les parties 2 et 3. La partie 1 ne se prépare pas.",
    vi: "10 phút chuẩn bị chỉ dành cho phần 2 và 3. Phần 1 KHÔNG được chuẩn bị — trả lời trực tiếp.",
  },
  parts: [
    { id: "po-p1", label: "Partie 1", page: 90, pts: 6,
      title: "L'entretien dirigé — se présenter et parler de soi",
      titleVi: "Phỏng vấn: tự giới thiệu và nói về bản thân",
      setup: "L'examinateur vous pose des questions simples sur vous : votre nom, votre âge, votre famille, vos goûts, vos activités. Vous répondez par des phrases.",
      setupVi: "Giám khảo hỏi những câu đơn giản về bạn: tên, tuổi, gia đình, sở thích, hoạt động. Trả lời thành câu, đừng trả lời một từ.",
      prompts: [
        "Comment vous appelez-vous ?", "Quel âge avez-vous ?", "Quelle est votre nationalité ?",
        "Où est-ce que vous habitez ?", "Qu'est-ce que vous faites dans la vie ?",
        "Parlez-moi de votre famille.", "Qu'est-ce que vous aimez faire le week-end ?",
        "Quel est votre plat préféré ?", "Est-ce que vous faites du sport ?",
      ],
      model: "Bonjour Madame. Je m'appelle Thao. J'ai 28 ans et je suis vietnamienne. J'habite à Hô-Chi-Minh-Ville. Je suis étudiante en informatique. Dans ma famille, il y a mes parents et un petit frère. Le week-end, j'aime cuisiner et je fais du yoga le samedi matin.",
      tips: [
        { fr: "Répondre par une phrase complète, pas par un mot.",
          vi: "Trả lời cả câu, không trả lời cụt lủn một từ — giám khảo chấm khả năng nói thành câu." },
        { fr: "Saluer l'examinateur au début et le remercier à la fin.",
          vi: "Nhớ chào ở đầu và cảm ơn ở cuối — đây là điểm sociolinguistique cho không." },
      ] },
    { id: "po-p2", label: "Partie 2", page: 94, pts: 6,
      title: "L'échange d'informations — poser des questions à l'examinateur",
      titleVi: "Hỏi thông tin: bạn đặt câu hỏi cho giám khảo từ các thẻ từ",
      setup: "Vous tirez des cartes avec un mot. Vous posez une question à l'examinateur à partir de chaque mot.",
      setupVi: "Bạn bốc các thẻ, mỗi thẻ một từ. Với mỗi từ, bạn đặt một câu hỏi cho giám khảo.",
      prompts: ["Âge ?", "Profession ?", "Sport ?", "Musique ?", "Vacances ?", "Famille ?",
                "Animal ?", "Ville ?", "Restaurant ?", "Langues ?"],
      model: "Âge → Quel âge avez-vous ?\nProfession → Qu'est-ce que vous faites dans la vie ?\nSport → Est-ce que vous faites du sport ?\nMusique → Quelle musique est-ce que vous aimez ?\nVacances → Où est-ce que vous allez en vacances ?",
      tips: [
        { fr: "Trois façons de poser une question : intonation, est-ce que, inversion.",
          vi: "Ba cách đặt câu hỏi: lên giọng (Vous avez un chien ?), est-ce que, và đảo ngữ (Avez-vous…?). Ở A1 dùng « est-ce que » là an toàn nhất." },
        { fr: "Vouvoyer l'examinateur.",
          vi: "Luôn dùng « vous » với giám khảo, đừng dùng « tu »." },
      ] },
    { id: "po-p3", label: "Partie 3", page: 99, pts: 6,
      title: "Le dialogue simulé — jouer une situation d'achat",
      titleVi: "Đóng vai: tình huống mua bán",
      setup: "Vous jouez une situation : vous achetez quelque chose, vous demandez le prix, vous payez. L'examinateur joue le vendeur.",
      setupVi: "Bạn đóng vai người mua: hỏi món hàng, hỏi giá, trả tiền. Giám khảo đóng vai người bán. Có thẻ hình tiền xu/tờ tiền để trả.",
      prompts: ["Carottes", "Cahier", "Télévision", "Pain", "Billet de cinéma", "Chemise"],
      model: "– Bonjour Madame.\n– Bonjour Monsieur, je peux vous aider ?\n– Oui, je voudrais un kilo de carottes s'il vous plaît. Combien ça coûte ?\n– C'est 2 euros 50.\n– Voilà. Est-ce que vous avez aussi du pain ?\n– Oui, une baguette ?\n– Une baguette, s'il vous plaît. Merci beaucoup. Au revoir Madame !\n– Au revoir, bonne journée !",
      tips: [
        { fr: "Saluer, demander poliment, remercier, prendre congé.",
          vi: "Bốn bước bắt buộc: chào → hỏi lịch sự → cảm ơn → chào tạm biệt." },
        { fr: "« Je veux » est trop direct : dire « Je voudrais… s'il vous plaît ».",
          vi: "Đừng nói « Je veux » (quá cộc). Nói « Je voudrais… s'il vous plaît »." },
        { fr: "Poser deux questions par article : la quantité/taille et le prix.",
          vi: "Mỗi món hỏi hai câu: số lượng/kích cỡ và giá tiền." },
      ] },
  ],
  // p.131 — the marking grid, condensed
  grid: [
    { fr: "Partie 1 — Entretien dirigé", pts: 5, vi: "Tự giới thiệu và trả lời câu hỏi cá nhân đơn giản, nói chậm rõ." },
    { fr: "Partie 2 — Échange d'informations", pts: 4, vi: "Đặt được câu hỏi đơn giản về chủ đề quen thuộc." },
    { fr: "Partie 3 — Dialogue simulé", pts: 4, vi: "Xin/đưa đồ vật, hỏi giá, dùng được cách xưng hô lịch sự cơ bản." },
    { fr: "Lexique / correction lexicale", pts: 3, vi: "Vốn từ về đời sống hằng ngày." },
    { fr: "Morphosyntaxe", pts: 4, vi: "Dùng được cấu trúc đơn giản đã thuộc lòng." },
    { fr: "Maîtrise du système phonologique", pts: 5, vi: "Phát âm đủ rõ để người bản ngữ quen nghe người nước ngoài hiểu được." },
  ],
};

// ── 6 · Thi thử (p.108–129) ──────────────────────────────────────
// Two full mock papers. The writing and speaking halves are self-contained
// prompts and are here; the listening and reading halves need their documents
// and picture options cut from the book the way the Đọc section's were, and
// are not built yet.
export const BLANCS = {
  pages: "p.108–129",
  intro: {
    fr: "Deux épreuves blanches complètes, dans les conditions de l'examen.",
    vi: "Hai đề thi thử đầy đủ, làm đúng điều kiện phòng thi.",
  },
  rules: [
    { fr: "Compréhension de l'oral : 20 min · Compréhension des écrits + production écrite : 1 h",
      vi: "Nghe 20 phút. Đọc + Viết làm liền 1 tiếng — tự chia giờ." },
    { fr: "Chaque épreuve est notée sur 25. Note minimale requise par épreuve : 5/25.",
      vi: "Mỗi kỹ năng 25 điểm. Phải được tối thiểu 5/25 mỗi kỹ năng, và tổng ≥ 50/100." },
    { fr: "Pas de dictionnaire, pas de téléphone.",
      vi: "Không từ điển, không điện thoại. Chỉ giấy nháp và bút." },
  ],
  exams: [
    { id: "blanc1", label: "Épreuve blanche 1", pages: "p.110–120",
      form: { label: "Exercice 1 — Votre fiche d'abonnement", page: 119, pts: 10,
              setup: "Vous remplissez un formulaire d'abonnement à une salle de sport.",
              setupVi: "Điền phiếu đăng ký thẻ phòng gym.",
              fields: ["Nom : XXX", "Prénom", "Date de naissance", "Nationalité",
                       "Adresse électronique", "Numéro de téléphone", "Sport pratiqué",
                       "Durée de l'abonnement", "Jour préféré", "Nombre de séances par semaine",
                       "N° de tél d'un médecin"] },
      essay: { id: "b1-pe2", label: "Exercice 2", page: 119, pts: 15,
               setup: "Vous recevez une carte de vos amis français (« Bonne année ! Meilleurs vœux — Amitiés de France, Karine et Léo »). Vous répondez à vos amis. Vous leur présentez vos vœux et vous les invitez à venir dans votre ville. Vous proposez des dates et des activités à faire ensemble. (40 mots minimum)",
               setupVi: "Bạn nhận thiệp chúc mừng năm mới của hai người bạn Pháp. Viết thư trả lời: chúc lại, mời họ đến thành phố của bạn, đề nghị ngày cụ thể và các hoạt động cùng làm. (≥ 40 từ)",
               must: ["présenter ses vœux", "inviter dans sa ville", "proposer des dates", "proposer des activités"] },
      po: { id: "b1-po", label: "Production orale", page: 120, pts: 25,
            setup: "Partie 1 — Entretien dirigé (vos frères et sœurs, vos animaux…). Partie 2 — Échange d'informations à partir de six cartes. Partie 3 — Dialogue simulé : vous tirez deux sujets et vous en choisissez un.",
            setupVi: "Phần 1 — phỏng vấn (anh chị em, thú nuôi…). Phần 2 — đặt câu hỏi từ 6 thẻ từ. Phần 3 — bốc 2 đề tình huống, chọn 1 để đóng vai.",
            cards: ["Frère ?", "Musique ?", "Ordinateur ?", "Forêt ?", "Cadeau ?", "Diplôme ?"],
            sujets: [
              "Sujet 1 — À la boulangerie : vous demandez des informations au vendeur, vous choisissez trois produits et vous payez.",
              "Sujet 2 — Dans une parfumerie : vous voulez faire un cadeau à une amie, vous demandez des informations sur deux ou trois articles.",
              "Sujet 3 — À la pharmacie : vous avez du mal à dormir et vous demandez un médicament.",
            ] } },
    { id: "blanc2", label: "Épreuve blanche 2", pages: "p.121–129",
      form: { label: "Exercice 1 — Fiche d'hôtel", page: 128, pts: 10,
              setup: "Vous arrivez à l'hôtel en France. Vous remplissez ce formulaire.",
              setupVi: "Bạn tới khách sạn ở Pháp. Điền phiếu nhận phòng.",
              fields: ["Nom : XXX", "Prénom", "Date de naissance", "Ville de naissance",
                       "Nationalité", "Adresse électronique", "Situation familiale",
                       "Date d'arrivée", "Date de départ", "Plat préféré", "Numéro de chambre"] },
      essay: { id: "b2-pe2", label: "Exercice 2", page: 128, pts: 15,
               setup: "Vous écrivez à un(e) ami(e) français(e). Vous parlez de vos vacances en France. Vous dites où vous êtes et vous parlez de vos activités. (40 mots minimum)",
               setupVi: "Viết cho một người bạn Pháp kể về kỳ nghỉ của bạn ở Pháp: bạn đang ở đâu và làm những gì. (≥ 40 từ)",
               must: ["saluer", "dire où vous êtes", "parler de vos activités", "prendre congé"] },
      po: { id: "b2-po", label: "Production orale", page: 129, pts: 25,
            setup: "Partie 1 — Entretien dirigé (vos parents, vos soirées, vos repas…). Partie 2 — Échange d'informations à partir de six cartes. Partie 3 — Dialogue simulé : vous tirez deux sujets et vous en choisissez un.",
            setupVi: "Phần 1 — phỏng vấn (bố mẹ, buổi tối, bữa trưa…). Phần 2 — đặt câu hỏi từ 6 thẻ từ. Phần 3 — bốc 2 đề tình huống, chọn 1 để đóng vai.",
            cards: ["Poisson ?", "Voiture ?", "Lunettes ?", "Bleu ?", "Enfant ?", "Dimanche ?"],
            sujets: [
              "Sujet 1 — Au magasin de vêtements : vous demandez les couleurs, les tailles et les prix, vous choisissez un vêtement et vous payez.",
              "Sujet 2 — Au restaurant : vous demandez des informations sur le menu, vous choisissez les plats et vous payez.",
              "Sujet 3 — À la papeterie : vous achetez votre matériel d'université.",
            ] } },
  ],
};
