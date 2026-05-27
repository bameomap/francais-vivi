/**
 * editoAudio.js — Real audio tracks from Édito A1
 *
 * Audio files live in /Nouvel_Edito_A1_audios_manuel/
 * Symlinked to /public/audio/ → served at /audio/{n}_Edito_A1_Livre.mp3
 *
 * 3 tracks per unit: sections B, C/E/F/G depending on unit.
 * Each track has a `questions` array from the Édito A1 book.
 */

export function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Build audio URL from track number
function url(n) {
  const s = n < 10 ? `0${n}` : `${n}`;
  return `/audio/${s}_Edito_A1_Livre.mp3`;
}

export const EDITO_AUDIO = {

  // ─────────────────────────────────────────────────────────────────
  "u1": [
    {
      id: "u1-b", trackNum: 13, section: "B", page: 18,
      title: "Parlez en français !",
      subtitle: "Lars, Enzo, Giulia, Alice — se présenter",
      theme: "👋", color: "#7C3AED", colorLight: "#EDE9FE",
      audioSrc: url(13),
      sentences: [
        "Bonjour, je m'appelle Lars.",
        "Je suis hollandais et j'ai 52 ans.",
        "Et vous, vous avez quel âge ?",
        "Je m'appelle Giulia. J'ai 28 ans.",
        "Tu as quel âge ?",
        "Non, je suis allemande.",
        "Je m'appelle Alice. J'ai 23 ans.",
        "Moi, je suis italienne.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Regardez l'affiche. Dites la date du speak-dating." },
        { label: "1ère écoute", text: "Vrai ou faux ? a. Les personnes se présentent. b. Les personnes se disent au revoir. / Associez les prénoms aux photos (Lars, Enzo, Giulia, Alice)." },
        { label: "2e écoute", text: "Trouvez la nationalité des personnes. / Associez Lars, Enzo, Giulia, Alice avec 23, 52, 28, 44 ans." },
      ],
    },
    {
      id: "u1-f", trackNum: 22, section: "F", page: 26,
      title: "En route pour le festival !",
      subtitle: "Juliette & Ana — voyage à Angoulême",
      theme: "🎪", color: "#DB2777", colorLight: "#FCE7F3",
      audioSrc: url(22),
      sentences: [
        "Tu habites dans quelle ville ?",
        "J'habite à Barcelone.",
        "Je parle français, espagnol et anglais.",
        "Nous sommes à Angoulême, Juliette.",
        "Tu as Facebook ou Instagram ?",
        "J'ai Instagram.",
        "C'est le 06 80 72 86 45.",
        "Bon festival !",
      ],
      questions: [
        { label: "Entrée en matière", text: "Vous aimez parler en voiture ?" },
        { label: "1ère écoute", text: "Vrai ou faux ? Ana et Juliette parlent de loisirs." },
        { label: "2e écoute", text: "Ana habite dans quel pays ? dans quelle ville ? / Juliette et Ana : a. parlent français, anglais et espagnol / b. aiment la musique et la bande dessinée / c. échangent les mails et les numéros de téléphone. / Quel est le numéro de téléphone d'Ana ? a. 06 80 72 86 45 / b. 06 90 32 71 66." },
      ],
    },
    {
      id: "u1-e", trackNum: 21, section: "E", page: 25,
      title: "En voiture avec BlaBlaCar !",
      subtitle: "Juliette s'inscrit sur un site de covoiturage",
      theme: "🚗", color: "#059669", colorLight: "#ECFDF5",
      audioSrc: url(21),
      sentences: [
        "Je suis sur le site BlaBlaCar, un site de covoiturage.",
        "C'est le festival de la bande dessinée !",
        "Paris-Angoulême !",
        "Date de naissance : le 26 janvier 1999, e-mail : juliette.baldi@gmail.com",
        "C'est parti pour le Festival d'Angoulême !",
      ],
      questions: [
        { label: "Entrée en matière", text: "Vous pratiquez le covoiturage ?" },
        { label: "1ère écoute", text: "Juliette utilise un site de covoiturage. Comment il s'appelle ? / Vrai ou faux ? Juliette s'inscrit sur le site." },
        { label: "2e écoute", text: "Juliette est née : a. le 25 janvier 1998 / b. le 26 janvier 1999. / L'adresse mail : a. juliette.baldi@gmail.com / b. juliette260199. / Juliette trouve un covoiturage Paris-Angoulême : a. le 24 janvier / b. le 26 janvier." },
      ],
    },
  ],

  // ─────────────────────────────────────────────────────────────────
  "u2": [
    {
      id: "u2-b", trackNum: 31, section: "B", page: 34,
      title: "Tu aimes le cinéma ?",
      subtitle: "Anaïs, Romain, Manon — goûts et loisirs",
      theme: "🎬", color: "#D97706", colorLight: "#FFFBEB",
      audioSrc: url(31),
      sentences: [
        "Salut Romain ! Ça va ?",
        "J'adore le cinéma et la montagne !",
        "Elle n'aime pas la neige et elle déteste skier.",
        "Tu n'aimes pas le sport ?",
        "J'aime le sport ! La marche, la natation, la danse.",
        "Trois places pour le Festival du film de montagne, s'il vous plaît.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Observez le document. Quel festival il présente ?" },
        { label: "1ère écoute", text: "Romain, Anaïs et Manon parlent : a. de cinéma / b. de sport / c. de cinéma et de sport." },
        { label: "2e écoute", text: "Vrai ou faux ? a. Anaïs, Manon et Romain aiment la montagne et le ski. / b. Ils demandent trois places pour le Festival du film de montagne." },
      ],
    },
    {
      id: "u2-e", trackNum: 39, section: "E", page: 40,
      title: "Dans la belle famille",
      subtitle: "Thomas présente Barbara à ses parents",
      theme: "👨‍👩‍👧", color: "#7C3AED", colorLight: "#EDE9FE",
      audioSrc: url(39),
      sentences: [
        "Tu es étudiante, Barbara ?",
        "J'étudie la physique.",
        "Mon père est informaticien et ma mère est professeure à l'université.",
        "Tu as des frères et sœurs, Barbara ?",
        "J'ai un frère et une sœur.",
        "Mon frère est marié et il a deux enfants.",
        "Ma sœur est célibataire.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Regardez la photo. À votre avis, qui sont les personnes ?" },
        { label: "1ère écoute", text: "Vrai ou faux ? Thomas présente Barbara à ses parents. Barbara est : a. une amie / b. la petite amie de Thomas." },
        { label: "2e écoute", text: "Thomas et Barbara travaillent ? Qui travaille à l'hôpital ? Qui travaille à l'université ?" },
      ],
    },
    {
      id: "u2-essentiel", trackNum: 44, section: "L'essentiel", page: 42,
      title: "Compréhension orale",
      subtitle: "Naïma & Magdalena — mariage de famille",
      theme: "🎧", color: "#059669", colorLight: "#ECFDF5",
      audioSrc: url(44),
      sentences: [
        "Je suis au mariage de mon cousin Alex !",
        "Je suis avec mes parents, mes grands-parents, mon oncle et ma tante.",
        "Ma sœur Sophie n'est pas là, elle étudie aux États-Unis.",
        "Mon frère est professeur et Noémie est fleuriste.",
        "Il a deux frères. Ils sont six dans la famille.",
      ],
      questions: [
        { label: "Entrée en matière", text: "(Compréhension orale)" },
        { label: "1ère écoute", text: "1. Où est Magdalena ? / 2. Vrai ou faux ? a. Magdalena est avec ses sœurs, Sophie et Émilie. b. Sa sœur Sophie est étudiante." },
        { label: "2e écoute", text: "3. Quelle est la profession d'Émilie ? du frère de Naïma ? / 4. Est-ce que Naïma est mariée ? / 5. Quelle est la profession de Mike ? / 6. Combien Mike a de frères et sœurs ?" },
      ],
    },
  ],

  // ─────────────────────────────────────────────────────────────────
  "u3": [
    {
      id: "u3-b", trackNum: 45, section: "B", page: 47,
      title: "À l'épicerie bio",
      subtitle: "Une cliente fait ses courses",
      theme: "🛒", color: "#059669", colorLight: "#ECFDF5",
      audioSrc: url(45),
      sentences: [
        "Deux bouteilles de jus de pomme, un paquet de riz, un paquet de pâtes.",
        "La bouteille d'huile d'olive coûte 12 euros.",
        "Ce sera tout ?",
        "Vous payez comment ? Par carte ou en espèces ?",
        "Par carte, s'il vous plaît.",
        "Les yaourts coûtent 1,50 euro.",
        "Et je voudrais aussi 2 pains, s'il vous plaît.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Regardez la photo. À votre avis, quels produits on achète dans une épicerie ?" },
        { label: "1ère écoute", text: "Combien de personnes vous entendez dans l'épicerie ?" },
        { label: "2e écoute", text: "Vrai ou faux ? a. Madame Berthier achète cinq produits différents. / b. Monsieur Peltier achète un pain. / c. Ils payent en espèces." },
      ],
    },
    {
      id: "u3-f", trackNum: 52, section: "F", page: 53,
      title: "En cuisine !",
      subtitle: "Noé & Sarah — préparer le repas",
      theme: "🍳", color: "#DC2626", colorLight: "#FEF2F2",
      audioSrc: url(52),
      sentences: [
        "On prépare le repas ? J'ai faim !",
        "Il y a des œufs et du lait, du beurre et de la crème.",
        "Est-ce qu'on a des poivrons ?",
        "Non, on n'a pas de poivrons mais on a des tomates.",
        "Il y a de la farine, des pâtes et une boîte de thon.",
        "On mange une quiche tomates-courgettes ou des pâtes au thon !",
        "Demain c'est samedi, je fais les courses.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Vous aimez cuisiner ?" },
        { label: "1ère écoute", text: "Sarah et Noé : a. préparent le repas / b. font la liste des courses." },
        { label: "2e écoute", text: "Vrai ou faux ? a. Sarah et Noé cherchent des recettes avec Frigo Magic. / b. Ils ont de la farine et de l'huile d'olive. / c. Ils mangent des pâtes au thon. / Que fait Noé le samedi ?" },
      ],
    },
    {
      id: "u3-g", trackNum: 53, section: "G", page: 54,
      title: "Au restaurant",
      subtitle: "Une famille commande un repas au restaurant",
      theme: "🍽️", color: "#7C3AED", colorLight: "#EDE9FE",
      audioSrc: url(53),
      sentences: [
        "Je voudrais de la blanquette de veau avec du riz.",
        "Un croque-monsieur végétarien.",
        "Et voilà vos plats, messieurs-dames.",
        "Une carafe d'eau, s'il vous plaît !",
        "Alors, un riz au lait, un café, un thé et l'addition.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Regardez la photo. Vous aimez les restaurants différents, originaux ?" },
        { label: "1ère écoute", text: "Qui mange au restaurant ? a. Des amis / b. Une famille." },
        { label: "2e écoute", text: "Qui choisit la blanquette de veau ? / Qui commande un dessert ? / Qu'est-ce que l'homme et la femme commandent à la fin du repas ?" },
      ],
    },
  ],

  // ─────────────────────────────────────────────────────────────────
  "u4": [
    {
      id: "u4-b", trackNum: 58, section: "B", page: 61,
      title: "Bienvenue à Toulouse !",
      subtitle: "Éva & William — les quartiers de Toulouse",
      theme: "🏙️", color: "#D97706", colorLight: "#FFFBEB",
      audioSrc: url(58),
      sentences: [
        "Dans quel quartier de Toulouse tu habites ?",
        "En septembre, je commence mon travail à la mairie de Toulouse.",
        "Il y a beaucoup de quartiers sympas.",
        "Il est agréable et dynamique.",
        "Il y a des cafés, des restaurants et ici, c'est la mairie.",
        "Il y a un jardin japonais.",
        "Et il y a aussi le quai de la Daurade.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Quelles villes de France vous connaissez ?" },
        { label: "1ère écoute", text: "Vrai ou faux ? William et Éva parlent des quartiers de Toulouse." },
        { label: "2e écoute", text: "Pourquoi Éva demande des informations sur Toulouse ? / Pourquoi William aime son quartier ? / Comment est la rue de William ?" },
      ],
    },
    {
      id: "u4-c", trackNum: 59, section: "C", page: 62,
      title: "Vous habitez à Lyon ?",
      subtitle: "Une journaliste, Chloé & Raphaël — Lyon",
      theme: "🦁", color: "#DC2626", colorLight: "#FEF2F2",
      audioSrc: url(59),
      sentences: [
        "Je suis journaliste et je fais une enquête sur la ville de Lyon.",
        "Je vais souvent dans les jardins et les parcs de la ville.",
        "J'adore la nature.",
        "Le dimanche, je marche toujours près du fleuve.",
        "Moi, je vais souvent à la gare.",
        "Je voyage beaucoup pour mon travail.",
        "Je n'aime pas le shopping !",
      ],
      questions: [
        { label: "Entrée en matière", text: "Quels lieux vous aimez dans votre ville ?" },
        { label: "1ère écoute", text: "La journaliste enquête sur quel sujet ?" },
        { label: "2e écoute", text: "Vrai ou faux ? a. Chloé n'aime pas aller dans le quartier Saint-Jean. / b. Chloé n'aime pas aller dans les magasins. / c. Raphaël aime aller au théâtre. / Pourquoi Chloé va souvent au musée des Confluences ?" },
      ],
    },
    {
      id: "u4-f", trackNum: 65, section: "F", page: 67,
      title: "Comment on va aux Arènes ?",
      subtitle: "Vanessa & Sébastien — itinéraire à Arles",
      theme: "🗺️", color: "#7C3AED", colorLight: "#EDE9FE",
      audioSrc: url(65),
      sentences: [
        "On continue ?",
        "Maintenant on visite les Arènes !",
        "L'appli propose un itinéraire en bus, à pied, à vélo ou à trottinette.",
        "C'est bien de marcher !",
        "C'est 14 minutes de marche !",
        "Prenez la première rue à droite.",
        "L'arrêt de bus n'est pas loin.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Qu'est-ce que vous utilisez pour visiter une ville ? un plan ? une application ?" },
        { label: "1ère écoute", text: "Vrai ou faux ? Vanessa et Sébastien sont à Arles." },
        { label: "2e écoute", text: "Comment Sébastien préfère aller aux Arènes ? Pourquoi ? / Écoutez les instructions du GPS et tracez l'itinéraire sur le plan. / Quel transport en commun Vanessa et Sébastien prennent ?" },
      ],
    },
  ],

  // ─────────────────────────────────────────────────────────────────
  "u5": [
    {
      id: "u5-b", trackNum: 73, section: "B", page: 75,
      title: "Un styliste personnel",
      subtitle: "Zoé & Flore — la box de vêtements",
      theme: "🛍️", color: "#7C3AED", colorLight: "#EDE9FE",
      audioSrc: url(73),
      sentences: [
        "C'est un service de shopping en ligne avec un styliste.",
        "Sur le site, tu choisis ta taille et tes styles préférés.",
        "Tu parles dix minutes au téléphone avec un styliste.",
        "Le ou la styliste choisit les articles pour les clientes.",
        "Tu aimes, tu achètes, tu n'aimes pas, tu n'achètes pas.",
        "Il y a une robe longue et une veste courte en jean.",
        "Il y a aussi des bottes et un chapeau.",
        "J'adore le manteau, mais je n'aime pas le pull.",
        "Je fais du 38.",
        "Le gris, c'est à la mode.",
        "Il te va bien.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Regardez la photo. Qu'est-ce que vous voyez dans la box « La Malle française » ?" },
        { label: "1ère écoute", text: "Flore et Zoé sont clientes à « La Malle française » ?" },
        { label: "2e écoute", text: "Vrai ou faux ? a. « La Malle française », c'est un service de shopping en ligne. b. Leurs stylistes choisissent les articles pour les clientes. / Est-ce que Flore aime tous les articles de sa box ?" },
      ],
    },
    {
      id: "u5-c", trackNum: 74, section: "C", page: 76,
      title: "Une saison, un vêtement",
      subtitle: "L'atelier de couture et de tricot",
      theme: "🧵", color: "#059669", colorLight: "#ECFDF5",
      audioSrc: url(74),
      sentences: [
        "Je téléphone pour les cours de couture et de tricot.",
        "Nous proposons de faire un vêtement par saison.",
        "En été, nous proposons de faire une robe ou une jupe.",
        "En automne, nous faisons un imperméable.",
        "En hiver, nous tricotons un pull.",
        "Au printemps, nous faisons un pantalon.",
        "Dans notre région, il fait froid et il neige.",
        "Quand il pleut, j'ai un parapluie.",
        "Un imperméable, c'est pratique quand il y a du vent.",
        "Il y a deux ou trois nuages mais il fait beau.",
        "Je vais venir à pied.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Lisez le titre de l'affiche. L'atelier propose quelles activités ?" },
        { label: "1ère écoute", text: "Vrai ou faux ? L'homme téléphone pour avoir des informations sur les activités de l'atelier. / Dans l'atelier : a. on fait des vêtements. b. on fait des vêtements et des accessoires." },
        { label: "2e écoute", text: "Quels vêtements l'atelier propose de faire ? À quel moment ? / Comment l'homme va s'inscrire ? a. Il va s'inscrire sur Internet. b. Il va aller à l'atelier." },
      ],
    },
    {
      id: "u5-f", trackNum: 80, section: "F", page: 81,
      title: "Quel cadeau pour Valentin ?",
      subtitle: "Inès, Pablo & Marie — choisir un cadeau high-tech",
      theme: "🎁", color: "#D97706", colorLight: "#FFFBEB",
      audioSrc: url(80),
      sentences: [
        "À quoi ça sert, une montre connectée ?",
        "C'est pour téléphoner, se repérer avec le GPS, se connecter à Internet.",
        "Je propose un scanner portable.",
        "Il sert à numériser des documents ou des photos.",
        "C'est utile pour ses études et son travail.",
        "On va lui acheter le scanner portable !",
      ],
      questions: [
        { label: "Entrée en matière", text: "À votre avis, qui sont Inès, Pablo et Marie ? Pourquoi ils laissent un message ?" },
        { label: "1ère écoute", text: "Vrai ou faux ? Inès, Pablo et Marie : a. donnent leur avis pour le cadeau de Valentin. b. n'aiment pas l'idée de la montre connectée. / Pourquoi Marie propose un scanner portable pour le cadeau de Valentin ?" },
        { label: "2e écoute", text: "À quoi sert un scanner portable ? / Quel cadeau Inès, Marie et Pablo vont choisir pour Valentin ?" },
      ],
    },
  ],

  // ─────────────────────────────────────────────────────────────────
  "u6": [
    {
      id: "u6-b", trackNum: 87, section: "B", page: 89,
      title: "Quel programme !",
      subtitle: "Romain & Nina — la journée et les activités",
      theme: "📅", color: "#059669", colorLight: "#ECFDF5",
      audioSrc: url(87),
      sentences: [
        "Dans la cuisine, je fais une lessive.",
        "Quelle heure il est ?",
        "Il est neuf heures cinq.",
        "Le supermarché ouvre à neuf heures.",
        "Il y a un cours de dessin à dix heures et demie.",
        "À quelle heure vous rentrez ?",
        "À midi moins dix.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Regardez les images. À votre avis, de quoi parle le document ?" },
        { label: "1ère écoute", text: "Vrai ou faux ? a. Nina et Romain vont faire un barbecue avec des amis. b. Romain s'occupe des enfants. c. Les enfants ont un cours de dessin à 9 h 30." },
        { label: "2e écoute", text: "Le match est à 17 h 15 ou 18 h 45 ? / Est-ce que la famille va dîner avant le match ?" },
      ],
    },
    {
      id: "u6-c", trackNum: 88, section: "C", page: 90,
      title: "On sort ce soir ?",
      subtitle: "Thomas, Florian, Perrine — projets du soir",
      theme: "🌙", color: "#7C3AED", colorLight: "#EDE9FE",
      audioSrc: url(88),
      sentences: [
        "Tu vas bien ?",
        "Je ne peux pas, je suis désolé. Je vais au concert de Boulevard des airs.",
        "Leurs concerts sont toujours complets.",
        "Il y a parfois des places au dernier moment.",
        "Il y a une exposition sur Brancusi. Ça te dit ?",
        "Le jeudi, c'est ouvert jusqu'à 23 heures.",
        "On se retrouve à l'exposition à 19 heures.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Regardez le document. Qu'est-ce que c'est ?" },
        { label: "1ère écoute", text: "Quelle activité Thomas propose à Florian et Perrine ?" },
        { label: "2e écoute", text: "Dialogue 1 : Qu'est-ce que Florian va faire le soir ? Pourquoi Thomas ne peut pas accompagner Florian ? / Dialogue 2 : Pourquoi Thomas accepte la proposition de Perrine ? À quelle heure ils se retrouvent ?" },
      ],
    },
    {
      id: "u6-f", trackNum: 95, section: "F", page: 95,
      title: "Une série à suivre !",
      subtitle: "Jade & Léa — parler de séries TV",
      theme: "📺", color: "#DC2626", colorLight: "#FEF2F2",
      audioSrc: url(95),
      sentences: [
        "Moi, je préfère les séries.",
        "Il est brun, il a la barbe et il est un peu chauve.",
        "Elle est grande, mince, blonde et elle a les yeux verts.",
        "J'aime beaucoup son grand nez. Il est original !",
        "C'est surtout un très bon acteur ! Et cette série est géniale.",
        "Je veux aussi regarder la nouvelle saison du Bureau des légendes.",
        "Bonne soirée ! Salut !",
      ],
      questions: [
        { label: "Entrée en matière", text: "Vous aimez les séries ? Quelles séries vous regardez ?" },
        { label: "1ère écoute", text: "Associez les séries et leur thème (Le Bureau des légendes / Dix pour cent / Baron noir — 1. La politique / 2. Les services secrets / 3. La vie des acteurs). / Dans quelles séries jouent Camille Cottin, Mathieu Kassovitz et Kad Merad ?" },
        { label: "2e écoute", text: "Jade et Stan viennent de regarder un épisode de quelle série ? / Quelle série Léa veut regarder ? Pourquoi ?" },
      ],
    },
  ],

  // ─────────────────────────────────────────────────────────────────
  "u7": [
    {
      id: "u7-a", trackNum: 102, section: "A", page: 102,
      title: "Un nouveau logement",
      subtitle: "Marco & David — la nouvelle maison",
      theme: "🏠", color: "#D97706", colorLight: "#FFFBEB",
      audioSrc: url(102),
      sentences: [
        "Nous avons acheté une maison à 30 kilomètres de Paris.",
        "On a déménagé il y a dix jours.",
        "On a trouvé la maison de nos rêves.",
        "La maison fait 150 mètres carrés.",
        "Il y a un petit jardin et une jolie terrasse.",
        "Au rez-de-chaussée, il y a le salon, la salle à manger et la cuisine.",
        "À l'étage, il y a trois chambres.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Observez la photo. Dans quel type de logement ces personnes vont habiter ?" },
        { label: "1ère écoute", text: "Qu'est-ce que Marco annonce à David ? a. Ils vont acheter une maison. b. Ils ont acheté une maison. / Où habitent Marco et sa famille maintenant ? a. À 3 km / b. À 13 km / c. À 30 km de Paris." },
        { label: "2e écoute", text: "Vrai ou faux ? Les enfants n'aiment pas leur nouveau logement. / Le logement fait combien de m² ? / Quand David va aller chez Marco ?" },
      ],
    },
    {
      id: "u7-c", trackNum: 103, section: "C", page: 104,
      title: "On bouge les meubles !",
      subtitle: "Décorer son appartement",
      theme: "🛋️", color: "#7C3AED", colorLight: "#EDE9FE",
      audioSrc: url(103),
      sentences: [
        "J'ai trouvé un site internet génial !",
        "Je clique sur « Meubles ».",
        "Je place la télé en face du canapé.",
        "Je place la table derrière le canapé.",
        "On peut mettre une lampe à droite du canapé.",
        "Il est bien là, entre les deux fenêtres.",
        "On va acheter un petit meuble.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Observez le document. À votre avis, qu'est-ce que c'est ?" },
        { label: "1ère écoute", text: "Les personnes : a. choisissent un appartement. b. achètent des meubles. c. placent des meubles dans une pièce." },
        { label: "2e écoute", text: "De quelle pièce ces personnes parlent ? / Qu'est-ce qu'elles vont acheter pour mettre l'aquarium ?" },
      ],
    },
    {
      id: "u7-f", trackNum: 109, section: "F", page: 109,
      title: "Chers voisins",
      subtitle: "Antoine & Nelly — organiser un escape game",
      theme: "🔑", color: "#059669", colorLight: "#ECFDF5",
      audioSrc: url(109),
      sentences: [
        "On veut organiser un escape game dans l'immeuble !",
        "On va mettre les objets et les questions dans les parties communes.",
        "Le couloir, les escaliers.",
        "Dans le local à vélos, c'est interdit.",
        "Je vais mettre un mot dans l'ascenseur.",
        "C'est le 25 septembre.",
        "On va s'amuser !",
      ],
      questions: [
        { label: "Entrée en matière", text: "Observez le document. Vous connaissez les escape game ?" },
        { label: "1ère écoute", text: "Avec quels voisins Antoine va organiser le jeu ? a. Avec Mathieu et Sébastien. b. Avec Nelly, Mathieu et Sébastien." },
        { label: "2e écoute", text: "Quelles parties communes les voisins veulent utiliser pour le jeu ? / Quand ils vont jouer à ce jeu ?" },
      ],
    },
  ],

  // ─────────────────────────────────────────────────────────────────
  "u8": [
    {
      id: "u8-b", trackNum: 117, section: "B", page: 117,
      title: "Bonjour docteure !",
      subtitle: "Deux patients chez le médecin",
      theme: "🩺", color: "#DC2626", colorLight: "#FEF2F2",
      audioSrc: url(117),
      sentences: [
        "J'ai un rhume, j'ai mal à la gorge et à la tête.",
        "Ça a commencé hier.",
        "J'ai eu de la fièvre cette nuit.",
        "Vous allez prendre du paracétamol et du sirop pour la toux.",
        "Buvez 1,5 litre par jour, minimum.",
        "J'ai fait un footing il y a deux jours et j'ai eu mal au genou.",
        "Je pèse 60 kg.",
        "Je mesure 1,68 m.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Est-ce que vous consultez parfois un médecin à distance ?" },
        { label: "1ère écoute", text: "L'homme contacte le médecin parce qu'il a mal : a. à la gorge. b. à la tête. c. aux oreilles. / Il a souvent des problèmes de santé ?" },
        { label: "2e écoute", text: "Choisissez 2 bonnes réponses. La femme : a. a mal au genou. b. utilise de mauvaises chaussures de sport. c. va passer une radio." },
      ],
    },
    {
      id: "u8-c", trackNum: 118, section: "C", page: 118,
      title: "Marcher, ça fait du bien !",
      subtitle: "Un petit-fils et sa grand-mère en pleine forme",
      theme: "🚶", color: "#059669", colorLight: "#ECFDF5",
      audioSrc: url(118),
      sentences: [
        "Je vais chez le médecin une fois par an pour un contrôle.",
        "Je suis en bonne santé !",
        "Je n'ai jamais de rhume, jamais de grippe !",
        "Marcher, ça fait du bien !",
        "Parfois, quand je vais à la pharmacie, j'y vais en bus !",
        "Et marcher, c'est important.",
        "J'achète de la vitamine C et je rentre à pied !",
      ],
      questions: [
        { label: "Entrée en matière", text: "Pour votre santé, qu'est-ce que vous faites au quotidien ?" },
        { label: "1ère écoute", text: "Pour sa santé, la grand-mère aime : a. marcher. b. nager." },
        { label: "2e écoute", text: "Vrai ou faux ? La grand-mère : a. cherche le numéro de son médecin. b. est malade. c. veut aller chez le médecin en bus. / Quelle est la profession de son petit-fils ? / Est-ce qu'il aime son travail à l'hôpital ?" },
      ],
    },
    {
      id: "u8-f", trackNum: 124, section: "F", page: 123,
      title: "Manger sain",
      subtitle: "Éric & Marc — manger sainement après le sport",
      theme: "🥗", color: "#D97706", colorLight: "#FFFBEB",
      audioSrc: url(124),
      sentences: [
        "Je suis fatigué après ce cours de natation ! Et j'ai faim !",
        "Tu manges des biscuits après le sport ?",
        "Il y a beaucoup de calories dans les biscuits.",
        "Je dois faire attention, je ne dois pas manger des produits gras et sucrés.",
        "Ce produit est très sucré !",
        "On doit manger sain et faire attention à notre alimentation.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Vous connaissez Yuka ? Qu'est-ce que c'est ? À quoi ça sert ?" },
        { label: "1ère écoute", text: "Marc et Éric viennent de : a. faire du sport. b. faire des courses." },
        { label: "2e écoute", text: "Associez. a. Éric mange — 1. des biscuits. b. Marc mange — 2. des barres de céréales. / Est-ce que ces deux produits sont bons pour la santé ? / Qu'est-ce que Éric et Marc doivent changer ?" },
      ],
    },
  ],

  // ─────────────────────────────────────────────────────────────────
  "u9": [
    {
      id: "u9-b", trackNum: 130, section: "B", page: 131,
      title: "Hôtel Atlantique, j'écoute !",
      subtitle: "Réserver une chambre d'hôtel",
      theme: "🏨", color: "#7C3AED", colorLight: "#EDE9FE",
      audioSrc: url(130),
      sentences: [
        "Je voudrais réserver une chambre dans votre hôtel pour les vacances.",
        "À quelles dates ?",
        "Du 18 au 23 août.",
        "Nous sommes deux adultes, un enfant et un bébé.",
        "Les chambres avec vue sur la mer sont à 170 euros la nuit.",
        "Je vais prendre une chambre avec vue sur rue.",
        "Le petit déjeuner est compris ?",
      ],
      questions: [
        { label: "Entrée en matière", text: "Regardez le document. Qu'est-ce que c'est ?" },
        { label: "1ère écoute", text: "Le client réserve une chambre d'hôtel : a. pour les vacances ? b. pour le travail ?" },
        { label: "2e écoute", text: "Pourquoi le client préfère une chambre avec vue sur rue ? / Dans cet hôtel : a. le petit déjeuner coûte 6,50 € par jour. b. les petits animaux sont acceptés. c. il y a un parking privé." },
      ],
    },
    {
      id: "u9-c", trackNum: 131, section: "C", page: 132,
      title: "À l'aéroport",
      subtitle: "Loïc & Marina — retour de Nouvelle-Zélande",
      theme: "✈️", color: "#059669", colorLight: "#ECFDF5",
      audioSrc: url(131),
      sentences: [
        "Qu'est-ce que tu fais à l'aéroport ?",
        "Je rentre de vacances !",
        "J'arrive de Nouvelle-Zélande.",
        "J'ai visité des villes et des musées.",
        "J'ai vu des amis.",
        "J'ai fait 25 heures d'avion et je suis fatiguée.",
        "Je reviens du Danemark, de Copenhague.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Observez la photo. À votre avis, que font ces personnes ?" },
        { label: "1ère écoute", text: "De quoi parlent Marina et Loïc ? / Qui arrive de Nouvelle-Zélande ? Qui revient du Danemark ?" },
        { label: "2e écoute", text: "Vrai ou faux ? Yvonne et Nathan : a. sont des amis de Marina. b. viennent d'Irlande. c. habitent dans l'île du nord de la Nouvelle-Zélande. / Pourquoi Marina et Loïc ont aimé leur lieu de vacances ?" },
      ],
    },
    {
      id: "u9-f", trackNum: 137, section: "F", page: 137,
      title: "Retour de vacances",
      subtitle: "Damien & Laurence — vacances en Martinique",
      theme: "🌴", color: "#D97706", colorLight: "#FFFBEB",
      audioSrc: url(137),
      sentences: [
        "Tu es rentrée de Martinique ?",
        "Oui, hier.",
        "Les plages sont superbes et il y a beaucoup de plantes et de fleurs.",
        "Tu as fait de la plongée ?",
        "Nous sommes allées dans le sud de l'île.",
        "Nous avons vu des poissons rouges, jaunes, bleus, blancs.",
        "J'adore entendre les petits oiseaux le matin.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Regardez la photo. À votre avis, où c'est ?" },
        { label: "1ère écoute", text: "Où Laurence et Damien sont allés en vacances ? (Complétez avec : dans une ferme, à la plage, en Martinique, en Suisse)" },
        { label: "2e écoute", text: "Quand Laurence est rentrée de vacances ? / Pourquoi elle aime les paysages de la Martinique ? / Damien préfère la mer ou la campagne ?" },
      ],
    },
  ],

  // ─────────────────────────────────────────────────────────────────
  "u10": [
    {
      id: "u10-b", trackNum: 144, section: "B", page: 145,
      title: "Visite de l'université",
      subtitle: "Karim & Mila — l'université et les études",
      theme: "🎓", color: "#059669", colorLight: "#ECFDF5",
      audioSrc: url(144),
      sentences: [
        "Je viens parce que je vais m'inscrire dans cette université.",
        "J'ai hésité mais finalement, j'ai choisi le droit.",
        "Les cours et les profs sont excellents.",
        "On apprend de nouvelles choses tous les jours.",
        "Il faut deux ou trois heures par jour.",
        "Il est agréable, cette université.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Regardez le document. Qu'est-ce que c'est ?" },
        { label: "1ère écoute", text: "Qui sont Karim et Mila ?" },
        { label: "2e écoute", text: "Karim étudie le droit, les lettres ou les langues ? Il est en quelle année ? / Qu'est-ce qu'il pense de ses cours et de ses professeurs ? / Qu'est-ce que Karim et Mila vont faire à 16 heures ?" },
      ],
    },
    {
      id: "u10-c", trackNum: 145, section: "C", page: 146,
      title: "L'année de césure",
      subtitle: "Un animateur & Lucie — faire une pause dans les études",
      theme: "🌍", color: "#7C3AED", colorLight: "#EDE9FE",
      audioSrc: url(145),
      sentences: [
        "L'année de césure, qu'est-ce que c'est ?",
        "C'est une pause pendant les études pour faire de nouvelles choses.",
        "Un voyage ou une formation, il y a beaucoup de possibilités.",
        "On peut aussi faire un stage dans une entreprise.",
        "La césure dure six ou douze mois.",
        "J'ai travaillé dans une école en Afrique, au Burkina Faso.",
        "J'espère avoir mon diplôme et avoir un travail intéressant.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Regardez la photo. À votre avis, où sont ces personnes ?" },
        { label: "1ère écoute", text: "Lucie parle : a. de ses vacances. b. de ses études. c. d'une pause pendant les études." },
        { label: "2e écoute", text: "Qu'est-ce que les étudiants peuvent faire pendant la césure ? / Combien de temps la césure peut durer ? / En général, quand est-ce que les étudiants font une année de césure ?" },
      ],
    },
    {
      id: "u10-f", trackNum: 152, section: "F", page: 152,
      title: "Pour ou contre le télétravail ?",
      subtitle: "Sacha & Laure — les avantages du télétravail",
      theme: "💻", color: "#DC2626", colorLight: "#FEF2F2",
      audioSrc: url(152),
      sentences: [
        "Tu as changé de poste ? Quand est-ce que tu as signé ton nouveau contrat ?",
        "Je viens de commencer mais oui ! Je travaille beaucoup, mais c'est intéressant.",
        "J'ai un bon salaire.",
        "Je travaille toujours huit heures par jour.",
        "Je peux commencer plus tôt ou finir plus tard.",
        "Entre chez moi et le bureau, il y a une heure de métro.",
        "Je suis moins fatigué.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Que fait la personne sur la photo ?" },
        { label: "1ère écoute", text: "Qui a changé de poste : Laure ou Sacha ? / Qui ne va pas tous les jours au bureau ?" },
        { label: "2e écoute", text: "Pourquoi Sacha aime le télétravail ? / Pourquoi Laure n'aime pas le télétravail ?" },
      ],
    },
  ],
};
