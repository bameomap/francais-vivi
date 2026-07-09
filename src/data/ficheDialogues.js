// Đoạn hội thoại mẫu (A1) cho tab "Giao tiếp" — mỗi Unité 2 tình huống tiêu biểu.
// Key = số Unité. Mỗi phần tử: { situation, a, b, lines: [{ sp: "A"|"B", fr, vi }] }
export const FICHE_DIALOGUES = {
  1: [
    {
      situation: "Speak-dating — làm quen", a: "Léa", b: "Minh",
      lines: [
        { sp: "A", fr: "Bonjour ! Je m'appelle Léa. Et toi ?", vi: "Chào! Mình tên Léa. Còn bạn?" },
        { sp: "B", fr: "Salut ! Moi, c'est Minh.", vi: "Chào! Mình là Minh." },
        { sp: "A", fr: "Tu as quel âge ?", vi: "Bạn bao nhiêu tuổi?" },
        { sp: "B", fr: "J'ai vingt-trois ans. Et toi ?", vi: "Mình 23 tuổi. Còn bạn?" },
        { sp: "A", fr: "Vingt-cinq. Tu es d'où ?", vi: "25. Bạn từ đâu đến?" },
        { sp: "B", fr: "Je suis vietnamien, de Hanoi.", vi: "Mình là người Việt, ở Hà Nội." },
        { sp: "A", fr: "Enchantée, Minh !", vi: "Rất vui được gặp, Minh!" },
      ],
    },
    {
      situation: "Hỏi thông tin cá nhân (trang trọng)", a: "Employée", b: "M. Tran",
      lines: [
        { sp: "A", fr: "Bonjour monsieur. Comment vous vous appelez ?", vi: "Chào ông. Ông tên là gì ạ?" },
        { sp: "B", fr: "Je m'appelle Duc Tran.", vi: "Tôi tên là Duc Tran." },
        { sp: "A", fr: "Vous êtes de quelle nationalité ?", vi: "Ông mang quốc tịch gì ạ?" },
        { sp: "B", fr: "Je suis vietnamien.", vi: "Tôi là người Việt Nam." },
        { sp: "A", fr: "Vous habitez où ?", vi: "Ông sống ở đâu ạ?" },
        { sp: "B", fr: "J'habite à Paris, rue Victor Hugo.", vi: "Tôi sống ở Paris, phố Victor Hugo." },
        { sp: "A", fr: "Quelle est votre profession ?", vi: "Nghề nghiệp của ông là gì ạ?" },
        { sp: "B", fr: "Je suis ingénieur.", vi: "Tôi là kỹ sư." },
      ],
    },
  ],
  2: [
    {
      situation: "Nói về sở thích & gia đình", a: "Paul", b: "Sara",
      lines: [
        { sp: "A", fr: "Qu'est-ce que tu aimes faire ?", vi: "Bạn thích làm gì?" },
        { sp: "B", fr: "J'adore la musique et le cinéma.", vi: "Mình mê âm nhạc và điện ảnh." },
        { sp: "A", fr: "Moi aussi ! Tu as des frères ?", vi: "Mình cũng vậy! Bạn có anh em không?" },
        { sp: "B", fr: "Oui, j'ai un frère et une sœur.", vi: "Có, mình có một anh trai và một em gái." },
        { sp: "A", fr: "Ta sœur, elle a quel âge ?", vi: "Em gái bạn bao nhiêu tuổi?" },
        { sp: "B", fr: "Elle a seize ans. Elle est lycéenne.", vi: "Em ấy 16 tuổi. Đang học cấp ba." },
      ],
    },
    {
      situation: "Nói về khu phố của mình", a: "Nora", b: "Hugo",
      lines: [
        { sp: "A", fr: "Tu habites où, Hugo ?", vi: "Hugo, bạn sống ở đâu?" },
        { sp: "B", fr: "J'habite dans le centre-ville.", vi: "Mình sống ở trung tâm thành phố." },
        { sp: "A", fr: "C'est comment, ton quartier ?", vi: "Khu của bạn thế nào?" },
        { sp: "B", fr: "Il est animé. Il y a des cafés et un marché.", vi: "Nhộn nhịp lắm. Có quán cà phê và một cái chợ." },
        { sp: "A", fr: "Tu aimes ton quartier ?", vi: "Bạn có thích khu mình ở không?" },
        { sp: "B", fr: "Oui, mais c'est un peu bruyant le soir.", vi: "Thích, nhưng buổi tối hơi ồn." },
      ],
    },
  ],
  3: [
    {
      situation: "Ở tiệm tạp hóa", a: "Vendeur", b: "Cliente",
      lines: [
        { sp: "A", fr: "Bonjour ! Vous désirez ?", vi: "Chào chị! Chị cần gì ạ?" },
        { sp: "B", fr: "Bonjour. Je voudrais un kilo de tomates.", vi: "Chào. Cho tôi một kí cà chua." },
        { sp: "A", fr: "Voilà. Et avec ça ?", vi: "Của chị đây. Còn gì nữa không ạ?" },
        { sp: "B", fr: "Deux croissants, s'il vous plaît. Ça fait combien ?", vi: "Hai cái bánh sừng bò nữa. Hết bao nhiêu ạ?" },
        { sp: "A", fr: "Ça fait six euros.", vi: "Hết 6 euro." },
        { sp: "B", fr: "Voilà. Merci, au revoir !", vi: "Đây ạ. Cảm ơn, tạm biệt!" },
      ],
    },
    {
      situation: "Gọi món ở nhà hàng", a: "Serveur", b: "Client",
      lines: [
        { sp: "A", fr: "Bonsoir ! Vous avez choisi ?", vi: "Chào anh! Anh chọn món chưa ạ?" },
        { sp: "B", fr: "Oui. En entrée, une salade, s'il vous plaît.", vi: "Rồi. Khai vị cho tôi một phần salad." },
        { sp: "A", fr: "Et comme plat ?", vi: "Còn món chính ạ?" },
        { sp: "B", fr: "Le poulet avec des frites, s'il vous plaît.", vi: "Cho tôi gà với khoai tây chiên." },
        { sp: "A", fr: "Et comme boisson ?", vi: "Đồ uống thì sao ạ?" },
        { sp: "B", fr: "Une carafe d'eau, merci.", vi: "Một bình nước lọc, cảm ơn." },
        { sp: "A", fr: "Très bien. Bon appétit !", vi: "Vâng ạ. Chúc ngon miệng!" },
      ],
    },
  ],
  4: [
    {
      situation: "Hỏi đường", a: "Touriste", b: "Passant",
      lines: [
        { sp: "A", fr: "Excusez-moi, où est la gare ?", vi: "Xin lỗi, ga tàu ở đâu ạ?" },
        { sp: "B", fr: "C'est tout droit, puis à gauche.", vi: "Đi thẳng, rồi rẽ trái." },
        { sp: "A", fr: "C'est loin ?", vi: "Có xa không ạ?" },
        { sp: "B", fr: "Non, c'est à cinq minutes.", vi: "Không, cách đây 5 phút." },
        { sp: "A", fr: "Merci beaucoup !", vi: "Cảm ơn nhiều!" },
        { sp: "B", fr: "De rien. Bonne journée !", vi: "Không có gì. Chúc một ngày tốt lành!" },
      ],
    },
    {
      situation: "Giới thiệu khu phố cho bạn", a: "Inès", b: "Marco",
      lines: [
        { sp: "A", fr: "Voilà mon quartier !", vi: "Đây là khu phố của mình!" },
        { sp: "B", fr: "Qu'est-ce qu'il y a ici ?", vi: "Ở đây có gì thế?" },
        { sp: "A", fr: "Il y a une boulangerie, une pharmacie et un parc.", vi: "Có tiệm bánh mì, nhà thuốc và một công viên." },
        { sp: "B", fr: "Il y a un cinéma ?", vi: "Có rạp phim không?" },
        { sp: "A", fr: "Non, mais ce n'est pas loin, à dix minutes en bus.", vi: "Không, nhưng không xa đâu, 10 phút đi buýt." },
        { sp: "B", fr: "J'aime bien ton quartier !", vi: "Mình thích khu của bạn đấy!" },
      ],
    },
  ],
  5: [
    {
      situation: "Mua quần áo", a: "Vendeuse", b: "Client",
      lines: [
        { sp: "A", fr: "Bonjour, je peux vous aider ?", vi: "Chào anh, tôi giúp gì được ạ?" },
        { sp: "B", fr: "Je cherche un pull bleu.", vi: "Tôi tìm một cái áo len màu xanh." },
        { sp: "A", fr: "Quelle taille faites-vous ?", vi: "Anh mặc cỡ nào?" },
        { sp: "B", fr: "Du M. Il coûte combien ?", vi: "Cỡ M. Cái này giá bao nhiêu?" },
        { sp: "A", fr: "Trente euros. Il est très joli.", vi: "30 euro. Đẹp lắm đó." },
        { sp: "B", fr: "Parfait, je le prends !", vi: "Tuyệt, tôi lấy cái này!" },
      ],
    },
    {
      situation: "Thử đồ & xin đổi cỡ", a: "Cliente", b: "Vendeur",
      lines: [
        { sp: "A", fr: "Je peux essayer cette robe ?", vi: "Tôi thử cái váy này được không?" },
        { sp: "B", fr: "Bien sûr, la cabine est là-bas.", vi: "Dĩ nhiên ạ, phòng thử ở đằng kia." },
        { sp: "A", fr: "C'est trop petit. Vous l'avez en 40 ?", vi: "Chật quá. Anh có cỡ 40 không?" },
        { sp: "B", fr: "Oui, voilà. Ça va ?", vi: "Có ạ, đây. Vừa không ạ?" },
        { sp: "A", fr: "Oui, ça me va bien. Je la prends.", vi: "Vừa, hợp với tôi lắm. Tôi lấy cái này." },
        { sp: "B", fr: "Vous payez par carte ?", vi: "Chị thanh toán bằng thẻ ạ?" },
        { sp: "A", fr: "Oui, par carte.", vi: "Vâng, bằng thẻ." },
      ],
    },
  ],
  6: [
    {
      situation: "Rủ đi chơi", a: "Emma", b: "Théo",
      lines: [
        { sp: "A", fr: "Qu'est-ce que tu fais ce week-end ?", vi: "Cuối tuần này bạn làm gì?" },
        { sp: "B", fr: "Rien de spécial. Pourquoi ?", vi: "Không có gì đặc biệt. Sao thế?" },
        { sp: "A", fr: "On va voir un film samedi ?", vi: "Thứ Bảy đi xem phim nhé?" },
        { sp: "B", fr: "Bonne idée ! À quelle heure ?", vi: "Ý hay! Mấy giờ?" },
        { sp: "A", fr: "À vingt heures, devant le cinéma.", vi: "8 giờ tối, trước rạp phim." },
        { sp: "B", fr: "D'accord, à samedi !", vi: "Được, hẹn thứ Bảy!" },
      ],
    },
    {
      situation: "Từ chối lời mời + nói lịch trình", a: "Lucas", b: "Mai",
      lines: [
        { sp: "A", fr: "Tu veux venir à la piscine demain ?", vi: "Mai bạn muốn đi bơi không?" },
        { sp: "B", fr: "Désolée, je ne peux pas.", vi: "Xin lỗi, mình không đi được." },
        { sp: "A", fr: "Ah bon ? Pourquoi ?", vi: "Vậy à? Sao thế?" },
        { sp: "B", fr: "Le matin, j'ai un cours de français.", vi: "Buổi sáng mình có lớp tiếng Pháp." },
        { sp: "A", fr: "Et l'après-midi ?", vi: "Thế buổi chiều?" },
        { sp: "B", fr: "Je travaille de quatorze heures à dix-huit heures.", vi: "Mình làm việc từ 14h đến 18h." },
        { sp: "A", fr: "Dommage ! Une autre fois, alors.", vi: "Tiếc thật! Vậy để lần khác nhé." },
      ],
    },
  ],
  7: [
    {
      situation: "Giới thiệu nhà mình", a: "Hôte", b: "Ami",
      lines: [
        { sp: "A", fr: "Voilà mon appartement !", vi: "Đây là căn hộ của mình!" },
        { sp: "B", fr: "Il est grand ! Il y a combien de pièces ?", vi: "Rộng ghê! Có mấy phòng?" },
        { sp: "A", fr: "Trois pièces. Là, c'est le salon.", vi: "Ba phòng. Kia là phòng khách." },
        { sp: "B", fr: "Et la cuisine, elle est où ?", vi: "Còn bếp ở đâu?" },
        { sp: "A", fr: "À droite, à côté de la salle de bains.", vi: "Bên phải, cạnh phòng tắm." },
        { sp: "B", fr: "C'est très joli chez toi !", vi: "Nhà bạn đẹp thật đấy!" },
      ],
    },
    {
      situation: "Báo sự cố với chủ nhà", a: "Locataire", b: "Propriétaire",
      lines: [
        { sp: "A", fr: "Bonjour, j'ai un problème dans l'appartement.", vi: "Chào anh, căn hộ có vấn đề ạ." },
        { sp: "B", fr: "Qu'est-ce qui se passe ?", vi: "Có chuyện gì thế?" },
        { sp: "A", fr: "Le chauffage ne marche pas.", vi: "Máy sưởi không hoạt động." },
        { sp: "B", fr: "Depuis quand ?", vi: "Từ khi nào?" },
        { sp: "A", fr: "Depuis hier soir. Il fait très froid.", vi: "Từ tối qua. Lạnh lắm ạ." },
        { sp: "B", fr: "D'accord, je viens demain matin avec un technicien.", vi: "Được rồi, sáng mai tôi đến cùng thợ." },
        { sp: "A", fr: "Merci beaucoup !", vi: "Cảm ơn anh nhiều!" },
      ],
    },
  ],
  8: [
    {
      situation: "Ở phòng khám", a: "Médecin", b: "Patient",
      lines: [
        { sp: "A", fr: "Bonjour, qu'est-ce qui ne va pas ?", vi: "Chào anh, anh bị sao thế?" },
        { sp: "B", fr: "J'ai mal à la tête et à la gorge.", vi: "Tôi đau đầu và đau họng." },
        { sp: "A", fr: "Vous avez de la fièvre ?", vi: "Anh có sốt không?" },
        { sp: "B", fr: "Oui, un peu. Je suis fatigué.", vi: "Có, một chút. Tôi thấy mệt." },
        { sp: "A", fr: "Reposez-vous et buvez beaucoup d'eau.", vi: "Anh nghỉ ngơi và uống nhiều nước nhé." },
        { sp: "B", fr: "D'accord, merci docteur.", vi: "Vâng, cảm ơn bác sĩ." },
      ],
    },
    {
      situation: "Nói về thói quen thể thao", a: "Coach", b: "Linh",
      lines: [
        { sp: "A", fr: "Vous faites du sport ?", vi: "Chị có chơi thể thao không?" },
        { sp: "B", fr: "Oui, je fais du yoga deux fois par semaine.", vi: "Có, tôi tập yoga hai lần một tuần." },
        { sp: "A", fr: "Très bien ! Et vous mangez équilibré ?", vi: "Tốt lắm! Chị ăn uống điều độ chứ?" },
        { sp: "B", fr: "Je mange des légumes, mais j'adore le chocolat…", vi: "Tôi ăn rau, nhưng tôi nghiện sô-cô-la…" },
        { sp: "A", fr: "Il ne faut pas manger trop de sucre !", vi: "Không nên ăn nhiều đường quá đâu!" },
        { sp: "B", fr: "Je sais… Je vais faire des efforts !", vi: "Tôi biết mà… Tôi sẽ cố gắng!" },
      ],
    },
  ],
  9: [
    {
      situation: "Kể về kỳ nghỉ (passé composé)", a: "Chloé", b: "Nam",
      lines: [
        { sp: "A", fr: "Tu as passé de bonnes vacances ?", vi: "Kỳ nghỉ của bạn vui không?" },
        { sp: "B", fr: "Oui ! Je suis allé à Nice.", vi: "Vui lắm! Mình đã đi Nice." },
        { sp: "A", fr: "Super ! Qu'est-ce que tu as fait ?", vi: "Tuyệt! Bạn đã làm gì?" },
        { sp: "B", fr: "J'ai visité la ville et j'ai nagé.", vi: "Mình đi tham quan thành phố và đi bơi." },
        { sp: "A", fr: "Tu as mangé quoi de bon ?", vi: "Bạn ăn món gì ngon không?" },
        { sp: "B", fr: "J'ai mangé une super pizza !", vi: "Mình ăn một cái pizza siêu ngon!" },
      ],
    },
    {
      situation: "Đặt phòng khách sạn qua điện thoại", a: "Réceptionniste", b: "Cliente",
      lines: [
        { sp: "A", fr: "Hôtel du Lac, bonjour !", vi: "Khách sạn du Lac xin nghe!" },
        { sp: "B", fr: "Bonjour, je voudrais réserver une chambre.", vi: "Chào anh, tôi muốn đặt một phòng." },
        { sp: "A", fr: "Oui, pour quelles dates ?", vi: "Vâng, cho ngày nào ạ?" },
        { sp: "B", fr: "Du 10 au 12 août, pour deux personnes.", vi: "Từ ngày 10 đến 12 tháng 8, cho hai người." },
        { sp: "A", fr: "Une chambre double avec petit-déjeuner ?", vi: "Phòng đôi kèm bữa sáng ạ?" },
        { sp: "B", fr: "Oui. C'est combien la nuit ?", vi: "Vâng. Bao nhiêu một đêm ạ?" },
        { sp: "A", fr: "Quatre-vingts euros, madame.", vi: "80 euro ạ." },
        { sp: "B", fr: "Très bien, je réserve. Merci !", vi: "Tốt quá, tôi đặt nhé. Cảm ơn!" },
      ],
    },
  ],
  10: [
    {
      situation: "Nói về công việc", a: "Recruteur", b: "Candidate",
      lines: [
        { sp: "A", fr: "Bonjour, qu'est-ce que vous faites dans la vie ?", vi: "Chào chị, chị làm nghề gì?" },
        { sp: "B", fr: "Je suis infirmière dans un hôpital.", vi: "Tôi là y tá ở bệnh viện." },
        { sp: "A", fr: "Vous aimez votre travail ?", vi: "Chị có thích công việc của mình không?" },
        { sp: "B", fr: "Oui, beaucoup. C'est utile.", vi: "Có, rất thích. Nó có ích." },
        { sp: "A", fr: "Vous travaillez le week-end ?", vi: "Chị có làm cuối tuần không?" },
        { sp: "B", fr: "Parfois. Mais j'ai deux jours de repos.", vi: "Thỉnh thoảng. Nhưng tôi có hai ngày nghỉ." },
      ],
    },
    {
      situation: "Nói về kỹ năng & dự định", a: "Conseillère", b: "Étudiant",
      lines: [
        { sp: "A", fr: "Qu'est-ce que vous savez faire ?", vi: "Bạn biết làm những gì?" },
        { sp: "B", fr: "Je sais parler anglais et utiliser un ordinateur.", vi: "Tôi biết nói tiếng Anh và dùng máy tính." },
        { sp: "A", fr: "Et qu'est-ce que vous voulez apprendre ?", vi: "Bạn muốn học thêm gì?" },
        { sp: "B", fr: "Je voudrais bien parler français.", vi: "Tôi muốn nói tiếng Pháp thật giỏi." },
        { sp: "A", fr: "Quel est votre projet professionnel ?", vi: "Dự định nghề nghiệp của bạn là gì?" },
        { sp: "B", fr: "Plus tard, je vais travailler dans le tourisme.", vi: "Sau này tôi sẽ làm trong ngành du lịch." },
        { sp: "A", fr: "Très bon projet. Bon courage !", vi: "Dự định hay đấy. Cố lên nhé!" },
      ],
    },
  ],
};
