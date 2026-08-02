/**
 * editoAudioA2.js — Listening tracks from Édito A2, 2e édition (2022).
 *
 * Same shape as EDITO_AUDIO (editoAudio.js) so EditoAudioPanel and DicteePanel
 * render either set through their `audio` prop.
 *
 * Hosting: mp3s live on the `audio` branch of this repo, served by GitHub Pages
 * — same place as the A1 tracks — under their original publisher filenames, so
 * re-pointing a document is a one-number change here with no re-upload.
 *
 * Track numbering: the book prints no piste numbers (2e édition uses the
 * didierfle.app page-flash system). The mapping is structural: the Livre set
 * has 121 files against the 120 entries of the official transcriptions, in the
 * same order, offset by one (001 is a 24s générique). So
 *
 *     file N+1  ↔  transcription entry N
 *
 * The alignment was checked entry-by-entry against durations across all twelve
 * units. Do NOT mix in the 2016 first-edition CD rip — different recordings
 * entirely; see materials/README.md.
 */

const AUDIO_BASE = "https://bameomap.github.io/francais-vivi";
const url = (n) => `${AUDIO_BASE}/${String(n).padStart(3, "0")}_Edito_A2_Livre.mp3`;

export const EDITO_AUDIO_A2 = {

  // ─── Unité 1 · Nouvelles vies ───────────────────────────────────
  "b1": [
    {
      id: "b1-a", trackNum: 2, section: "A", page: 14,
      title: "Gaël Faye, artiste multi-talents",
      subtitle: "Interview — parcours d'un écrivain-musicien",
      theme: "🎤", color: "#7C3AED", colorLight: "#EDE9FE",
      audioSrc: url(2),
      sentences: [
        "La journaliste : Bonjour Gaël Faye !",
        "Gaël Faye : Bonjour !",
        "La journaliste : Vous êtes écrivain, musicien, compositeur et interprète… et scénariste.",
        "Gaël Faye : Oui.",
        "La journaliste : Vous êtes né au Burundi d'une mère rwandaise et d'un père français.",
        "Vous avez grandi là-bas puis vous êtes venu en France en 1995.",
        "Vous avez fait vos études à Versailles. Vous êtes devenu trader à Londres.",
        "Gaël Faye : Non, pas vraiment trader. J'ai…",
        "La journaliste : On va en reparler. Finalement, vous avez changé de vie, vous vous êtes tourné vers la musique.",
        "Et, après votre premier album Pili pili sur un croissant au beurre, une éditrice vous a contacté pour vous proposer d'écrire un livre, ce que vous avez fait.",
        "Donc c'était Petit Pays, ça c'était en 2016, et c'est votre seul livre à ce jour.",
        "C'est un roman inspiré par votre enfance au Burundi.",
        "Un million d'exemplaires dans le monde, beaucoup de prix, le Goncourt des lycéens par exemple.",
        "Et il vient d'être adapté en film qui est sorti en août et que vous avez coécrit.",
        "Entre-temps, vous avez écrit deux autres albums de musique, et puis vous avez un livre, un album pour la jeunesse, qui sort aux Arènes, et bientôt un nouveau disque.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Regardez la couverture du livre (qui reproduit l'affiche du film) et la carte. De quel pays parle Petit Pays ?" },
        { label: "1ère écoute", text: "Où est né Gaël Faye ? a. En France · b. Au Rwanda · c. Au Burundi / De quelles origines sont ses parents ? / Dans quels pays a-t-il vécu ?" },
        { label: "2e écoute", text: "Classez ses créations selon ses professions (musicien-compositeur-interprète / écrivain / scénariste) : l'album Pili pili…, le roman Petit Pays, le film Petit Pays, deux autres albums, un album jeunesse, un nouveau disque." },
        { label: "Vocabulaire", text: "Quels sont les deux sens du mot « album » ? a. Un film · b. Un disque · c. Un livre avec des images." },
      ],
    },
    {
      id: "b1-c", trackNum: 3, section: "C", page: 15,
      title: "Ma vie en France",
      subtitle: "Podcast — le parcours de Giulia, italienne à Lyon",
      theme: "🇮🇹", color: "#10B981", colorLight: "#E7F8F1",
      audioSrc: url(3),
      sentences: [
        "Le présentateur : Bonjour, bienvenue dans notre podcast Ma vie en France.",
        "Aujourd'hui nous sommes avec Giulia. Elle est italienne et elle va nous raconter son parcours.",
        "Bonjour Giulia ! Vous venez de Rome, c'est ça ?",
        "Giulia : Oui, j'ai grandi dans un petit village près de Rome.",
        "Le présentateur : Quand avez-vous décidé de venir vivre en France ?",
        "Giulia : J'ai fait un séjour Erasmus à Bordeaux en 2019 et je suis tombée amoureuse de la France.",
        "Ensuite, je suis rentrée à Rome pour finir mes études.",
        "Un an plus tard, quand j'ai obtenu mon diplôme, j'ai décidé de revenir en France et je me suis installée à Lyon.",
        "Le présentateur : Vous aimez votre nouvelle vie à Lyon ?",
        "Giulia : Oui, j'adore cette ville et je me suis fait de nouveaux amis.",
        "Le présentateur : Vous vivez seule ?",
        "Giulia : En fait, quand je suis arrivée, j'ai rencontré un Français, nous avons vécu ensemble pendant un an, mais nous nous sommes séparés et j'ai déménagé.",
        "Maintenant, je suis célibataire et j'habite seule.",
        "Le présentateur : Et comment ça s'est passé au niveau professionnel ?",
        "Giulia : Je fais un stage dans une entreprise française mais il se termine bientôt, alors je compte chercher du travail dans une entreprise internationale.",
        "Le présentateur : Et vous avez l'intention de rester en France ?",
        "Giulia : Oui, j'ai pensé rentrer en Italie après ma séparation, mais c'est décidé : je reste en France !",
      ],
      questions: [
        { label: "Entrée en matière", text: "« Je suis tombée amoureuse de la France. » D'après vous, la personne interviewée est-elle française ?" },
        { label: "1ère écoute", text: "D'où vient Giulia ? Dans quel pays vit-elle maintenant ?" },
        { label: "2e écoute", text: "Remettez le parcours de Giulia dans l'ordre : a. Elle s'est installée à Lyon · b. Elle a fait un séjour Erasmus à Bordeaux · c. Elle a grandi près de Rome · d. Elle a fini ses études à Rome." },
        { label: "Production orale", text: "À deux ! Racontez pourquoi vous avez décidé d'apprendre le français et ce que vous comptez faire avec cette langue." },
      ],
    },
    {
      id: "b1-e", trackNum: 5, section: "E", page: 18,
      title: "Nos activités du week-end",
      subtitle: "Conversation — Lucie & Christophe, loisirs en famille",
      theme: "🚴", color: "#E67E22", colorLight: "#FEF3E2",
      audioSrc: url(5),
      sentences: [
        "Lucie : Salut Christophe, ça va ? Tu as passé un bon week-end ?",
        "Christophe : Salut Lucie ! Oui, ça va, je n'ai rien fait de spécial, je suis resté à la maison en famille.",
        "Lucie : Et qu'est-ce que vous avez fait ?",
        "Christophe : J'ai fait du bricolage et du jardinage, les enfants ont joué aux jeux vidéo et Élodie a fait de la peinture. Elle a commencé un nouveau tableau.",
        "Lucie : Ah, super ! Et samedi soir, vous êtes sortis ?",
        "Christophe : Non, on a regardé un match de foot. Et toi ?",
        "Lucie : Alors, samedi on a accompagné les enfants à leur compétition de judo. Et le soir nous sommes allés au festival Jazz à Vienne.",
        "Christophe : Ah, je ne suis jamais allé à ce festival. Vous avez aimé ?",
        "Lucie : Oui, moi j'ai adoré le concert, mais mes enfants ne sont pas fans de jazz. Et dimanche, nous sommes allés à l'accrobranche. Nous nous sommes bien amusés !",
        "Christophe : Ah, moi aussi j'aime bien sortir, mais pas mes enfants, c'est pas du tout leur truc.",
        "Ils ne veulent rien faire le week-end. Ils ne voient personne et ils ne veulent plus jouer à des jeux de société, ni aller au ciné en famille.",
        "Leur passion, c'est les jeux vidéo.",
        "Lucie : Ah oui, c'est normal, ce sont des ados maintenant.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Décrivez la photo. Connaissez-vous cette activité ?" },
        { label: "1ère écoute", text: "De quoi parlent ces personnes ? / Qu'est-ce qu'elles ont fait ce week-end ? Associez : Christophe et sa famille / Lucie et sa famille → sont restés chez eux / sont sortis." },
        { label: "2e écoute", text: "Notez trois activités du week-end de chaque famille." },
        { label: "Grammaire", text: "Relevez les phrases négatives : « je n'ai rien fait de spécial », « je ne suis jamais allé », « ils ne veulent rien faire », « ils ne voient personne », « ils ne veulent plus jouer »." },
        { label: "Au fait !", text: "En langage familier, les francophones coupent certains mots : foot = football, ciné = cinéma, ado = adolescent(e)." },
      ],
    },
    {
      id: "b1-delf", trackNum: 10, section: "DELF", page: 26,
      title: "DELF A2 — Compréhension de l'oral, exercice 1",
      subtitle: "6 annonces dans des lieux publics",
      theme: "🏆", color: "#E8574A", colorLight: "#FFF0EF",
      audioSrc: url(10),
      // Six public announcements, not six sentences: every one runs 8–13
      // seconds. Copying them out word for word is a transcription exercise,
      // not the listening-comprehension task the exam is testing.
      noDictee: true,
      sentences: [
        "1. Mesdames et Messieurs, le concert va commencer. Merci d'éteindre vos téléphones portables.",
        "2. La ville de Bordeaux propose des activités pour la Semaine du patrimoine. Pour regarder le programme, connectez-vous sur le site internet de la ville.",
        "3. Nous informons les visiteurs que le château va bientôt fermer ses portes. Merci de marcher vers la sortie et bonne fin de journée.",
        "4. Mesdames et messieurs, notre spectacle de cirque va commencer. Merci d'aller vous asseoir à votre place.",
        "5. Bienvenue au centre aquatique ! Nous vous informons qu'il est interdit de courir près des piscines.",
        "6. Les inscriptions pour la sortie en canoë-kayak sont ouvertes. Venez vite réserver votre place pour la journée à la réception du camping.",
      ],
      questions: [
        { label: "Stratégie", text: "Lisez attentivement les questions AVANT l'écoute — vous découvrez le sujet, puis vous pouvez vous concentrer sur les informations à comprendre. Vous entendez chaque document 2 fois." },
        { label: "1ère écoute", text: "Annonce 1 : qu'est-ce que vous devez faire ? A. Allumer votre téléphone · B. Éteindre votre téléphone · C. Ranger votre téléphone / Annonce 2 : comment connaître le programme de la Semaine du patrimoine à Bordeaux ?" },
        { label: "2e écoute", text: "Annonce 5 : qu'est-ce qui est interdit près des piscines ? A. Courir · B. Sauter · C. Marcher / Annonce 6 : à quelle activité pouvez-vous vous inscrire ?" },
      ],
    },
  ],

  // ─── Unité 2 · Je me souviens ───────────────────────────────────
  "b2": [
    {
      id: "b2-b", trackNum: 11, section: "B", page: 29,
      title: "Revivre de beaux moments !",
      subtitle: "Mélina, Aurore et Nino regardent un album photos",
      theme: "📷", color: "#7C3AED", colorLight: "#EDE9FE",
      audioSrc: url(11),
      sentences: [
        "Mélina : Je cherche l'album photos bleu ! Tu sais où les parents le rangent Aurore ?",
        "Aurore : Oui ! Dans la bibliothèque. Pourquoi tu le cherches ?",
        "Mélina : Nino veut voir des photos de moi quand j'étais petite et moi j'aime bien replonger dans nos souvenirs d'enfance et d'adolescence ! Tu viens les regarder avec nous ?",
        "Aurore : Bonne idée, ça me plaît bien de revoir ces photos !",
        "Mélina : Tiens, Nino, regarde, c'est moi quand je faisais du volley !",
        "Nino : Ah ! Tu faisais du volley ?",
        "Mélina : Oui ! J'adorais ça. Les entraînements, les matchs, mon équipe… ce sont des souvenirs inoubliables !",
        "Nino : Ah, mais toi aussi Aurore, tu jouais dans l'équipe ? C'est bien toi sur la photo ?",
        "Aurore : Oui, mais pour moi, ce ne sont pas des souvenirs très agréables… j'étais assez mauvaise…",
        "Nino : Dommage ! Et vous étiez où pour ce match ?",
        "Aurore : On était à Valence… ou à Lyon. J'ai oublié ! On se déplaçait beaucoup…",
        "Mélina : Et là, on partait à l'école, nos cartables sur le dos. Quelle période heureuse ! J'ai des bons souvenirs d'école, des souvenirs très joyeux…",
        "Nino : C'est super d'avoir des albums photos et de pouvoir se rappeler ses souvenirs de jeunesse, de famille, de vacances…",
        "Mélina : Oui, eh bien c'est parfait si tu aimes faire des albums, moi, j'ai horreur de ça !",
      ],
      questions: [
        { label: "Entrée en matière", text: "Vous aimez regarder de vieilles photos ?" },
        { label: "1ère écoute", text: "Que cherche Mélina ?" },
        { label: "2e écoute", text: "Vrai ou faux ? a. Nino veut voir des photos de Mélina enfant. b. Mélina n'aime pas regarder de vieilles photos. c. Aurore accepte de regarder de vieilles photos. / De quoi Mélina et Aurore parlent-elles (vacances, école, sport) ?" },
        { label: "Grammaire", text: "Quel souvenir est très positif pour Mélina et négatif pour Aurore ? (le volley) Relevez les verbes à l'imparfait : je cherchais, j'étais, je faisais, tu jouais, on était, on se déplaçait, on partait." },
        { label: "Production orale", text: "À deux ! Vous adorez photographier votre famille mais une personne de votre famille déteste être prise en photo. Discutez et trouvez un accord. Jouez la scène." },
      ],
    },
    {
      id: "b2-e", trackNum: 14, section: "E", page: 32,
      title: "Quelle expérience !",
      subtitle: "Charlotte et Achille racontent leurs vacances à une journaliste",
      theme: "🏕️", color: "#0891B2", colorLight: "#E0F2FE",
      audioSrc: url(14),
      sentences: [
        "La journaliste : Bonjour ! Dans notre émission aujourd'hui, nous accueillons Charlotte et Achille. Charlotte est partie en famille cet été en roulotte, et Achille a vécu l'expérience des vacances dans les arbres. Alors, quels souvenirs vous gardez de votre expérience ?",
        "Charlotte : Un très bon souvenir ! D'habitude on passe nos vacances sur la côte Atlantique, en compagnie des mouettes. Cette année, c'était très différent !",
        "La journaliste : Alors racontez-nous. Comment ça se passe des vacances en roulotte ?",
        "Charlotte : Eh bien, on roule sur des routes de campagne et on profite de la nature et des paysages. On voit beaucoup de champs, de fermes et de prairies !",
        "La journaliste : Et vous y dormez, dans la roulotte ?",
        "Charlotte : Oui, c'est notre maison pendant les vacances !",
        "La journaliste : Vous, Achille, vous avez passé un séjour dans les arbres.",
        "Achille : Oui, j'en reviens !",
        "La journaliste : Vous êtes content de cette expérience ?",
        "Achille : Oui et non…",
        "La journaliste : Ah ! Pourquoi ?",
        "Achille : Oui, parce que c'était un rêve d'enfant mais quand il pleut et qu'il y a des orages, c'est moins sympa ! Avec du soleil, c'est très différent !",
        "La journaliste : Vous allez recommencer l'expérience ?",
        "Achille : Non, l'année prochaine, je pense aller dans un chalet en montagne, faire de la randonnée et admirer les lacs… ou marcher dans le désert au milieu des dunes et du sable.",
        "Charlotte : Nous, nous pensons faire du camping en Charente-Maritime. Le climat y est agréable, il ne fait pas trop humide et le camping est à côté des plages !",
      ],
      questions: [
        { label: "Entrée en matière", text: "Quel(s) type(s) de vacances vous aimez ?" },
        { label: "1ère écoute", text: "De quel genre d'enregistrement s'agit-il ? Charlotte a choisi quelles vacances ? Et Achille ?" },
        { label: "2e écoute", text: "Vrai ou faux ? a. Charlotte garde un très bon souvenir de ses vacances. b. Achille est très content de son expérience. c. Achille et Charlotte veulent recommencer les mêmes vacances l'année prochaine." },
        { label: "Grammaire", text: "Relevez les pronoms y et en : « Vous y dormez ? », « j'en reviens », « Le climat y est agréable »." },
        { label: "Production orale (DELF)", text: "À deux ! Questionnez votre voisin(e) sur un de ses souvenirs de vacances puis inversez les rôles." },
      ],
    },
    {
      id: "b2-i", trackNum: 17, section: "I", page: 37,
      title: "La tendance rétro",
      subtitle: "Reportage — les affiches vintage, souvenirs de vacances",
      theme: "🖼️", color: "#E67E22", colorLight: "#FEF3E2",
      audioSrc: url(17),
      sentences: [
        "Voix off : Ça y est, déjà la fin de nos voyages. Mais pour nous rappeler de ces bons moments, nous avons opté cette année pour des posters. Que ce soit à la mer, à la montagne ou en ville, l'affiche rétro est devenue un classique des souvenirs de vacances.",
        "Femme 1 : Des endroits qui nous ont plu, des endroits où il s'est passé quelque chose de particulier…",
        "Femme 2 : Ça change de plein d'affiches qu'on peut voir ailleurs.",
        "Femme 3 : Et puis elles sont belles, les couleurs sont belles, ça donne envie de voyager.",
        "Voix off : Dans cette boutique toulousaine, les nouvelles affiches touristiques côtoient celles des années 30. Le vintage revient en force, ici, les ventes augmentent de 10 % chaque année.",
        "Voix off : Ces illustrations se déclinent aussi en cartes postales. Chaque destination touristique veut son modèle, comme Carcassonne. Pour la cité médiévale, c'est un outil de promotion indispensable.",
        "Femme 4 : L'avantage pour nous d'avoir une affiche, que les gens repartent avec une affiche, c'est de se souvenir de Carcassonne, avoir envie de revenir.",
      ],
      questions: [
        { label: "Entrée en matière", text: "À votre avis, pourquoi dit-on que des posters de voyage sont « rétro » ?" },
        { label: "1ère écoute", text: "Vrai ou faux ? a. Les Français aiment ramener des affiches rétro comme souvenirs de vacances. b. Ces affiches représentent seulement des villes au bord de la mer." },
        { label: "2e écoute", text: "Associez les phrases aux personnes : « Elles rappellent des lieux et des moments spéciaux » / « Elles sont jolies, elles donnent envie de voyager » / « Elles sont différentes »." },
        { label: "Vocabulaire", text: "Dans la boutique toulousaine, les ventes augmentent chaque année de : a. 6 % · b. 10 % · c. 16 % / Pourquoi les affiches de Carcassonne sont-elles positives pour la ville ?" },
      ],
    },
  ],

  // ─── Unité 3 · Comme à la maison ────────────────────────────────
  "b3": [
    {
      id: "b3-c", trackNum: 21, section: "C", page: 43,
      title: "Je suis intéressé par votre annonce",
      subtitle: "Thomas appelle la propriétaire d'un coliving à Marseille",
      theme: "🏠", color: "#D97706", colorLight: "#FEF3E2",
      audioSrc: url(21),
      sentences: [
        "Thomas : Bonjour, je suis intéressé par votre annonce de coliving à Marseille.",
        "La propriétaire : Bonjour ! Vous avez déjà fait du coliving ?",
        "Thomas : Non, mais j'aime bien l'idée. Je vois sur l'annonce que la résidence a 18 chambres et studios. C'est grand ! Quelle est sa superficie ?",
        "La propriétaire : Elle fait 760 m².",
        "Thomas : Comment elle est organisée ?",
        "La propriétaire : Au rez-de-chaussée, il y a les espaces communs, avec un grand couloir qui sépare le salon qui fait salle à manger et les cuisines.",
        "Thomas : Et c'est pas trop bruyant ?",
        "La propriétaire : Non, parce que les chambres sont au premier et au deuxième étages.",
        "Thomas : D'accord. Quel est le montant du loyer ?",
        "La propriétaire : Les chambres sont à 650 euros par mois et les studios à 1090.",
        "Thomas : Est-ce que ça inclut les charges ?",
        "La propriétaire : Oui, toutes les charges : l'eau, l'électricité, le gaz et le chauffage, mais aussi l'abonnement à Internet, l'assurance et le ménage. Il y a aussi un garage au sous-sol et un local où vous pouvez mettre votre vélo, si vous avez un vélo.",
        "Thomas : Parfait, quand est-ce que je peux venir visiter ?",
        "La propriétaire : Demain à 14 heures ? La maison est au 26 rue des Roses.",
        "Thomas : C'est noté. À demain !",
      ],
      questions: [
        { label: "Entrée en matière", text: "D'après le titre, de quoi vont parler ces personnes ?" },
        { label: "1ère écoute", text: "Quelle annonce intéresse Thomas ? Est-il toujours intéressé à la fin de la conversation ?" },
        { label: "2e écoute", text: "Quelles pièces se trouvent au rez-de-chaussée ? Au 1er et au 2e étages ? Au sous-sol ? Qu'est-ce qui est inclus dans le montant du loyer ?" },
        { label: "Production orale", text: "À deux ! Posez des questions à votre voisin(e) sur le logement décrit dans son annonce ou un autre logement de son choix." },
      ],
    },
    {
      id: "b3-e", trackNum: 24, section: "E", page: 46,
      title: "Vivre dans un bus",
      subtitle: "Nina raconte sa vie dans un bus aménagé, à un journaliste",
      theme: "🚌", color: "#059669", colorLight: "#E7F8F1",
      audioSrc: url(24),
      sentences: [
        "Le journaliste : Aujourd'hui, nous parlons de logements différents. Nina, vous avez choisi de quitter votre appartement en ville pour vivre dans un bus aménagé avec votre mari. Expliquez-nous, il est comment ce bus ?",
        "Nina : Il est confortable ! C'est comme un très grand camping-car. Il y a un espace salon, avec un canapé-lit, une table basse et deux tabourets. Pour la décoration, j'ai mis des rideaux aux fenêtres, des coussins sur le canapé, une étagère avec des plantes, des cadres avec des photos et une horloge. C'est cosy !",
        "Le journaliste : Et la cuisine ?",
        "Nina : Elle est moins grande qu'une cuisine classique mais elle est aussi bien ! Il y a l'essentiel : un four, un évier et un frigo.",
        "Le journaliste : Pas de lave-vaisselle ?",
        "Nina : Non. On a moins d'appareils électroménagers que dans notre ancien appartement. Mais on a un lave-linge dans la salle de bains. Le luxe !",
        "Le journaliste : Elle est grande ?",
        "Nina : Assez. Il y a une douche, un lavabo, des toilettes et des rangements.",
        "Le journaliste : Et vous dormez sur le canapé-lit du salon ?",
        "Nina : Non, on a une chambre.",
        "Le journaliste : Ça fait quatre pièces dans un bus !",
        "Nina : Oui. On a autant de pièces que dans notre ancien appartement. Elles sont petites mais on est souvent dehors. On sort plus qu'avant ! C'est agréable.",
        "Le journaliste : Donc vivre dans un bus, ce n'est pas moins bien que dans un appartement ?",
        "Nina : Non, pour moi c'est mieux. Bien sûr, quand on ne range pas nos affaires, le désordre est pire dans un bus que dans un appartement. Mais de manière générale, c'est très confortable, on a un meilleur cadre de vie.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Quels logements atypiques ou originaux connaissez-vous ?" },
        { label: "1ère écoute", text: "Où habitent Nina et son mari ? Nina est-elle contente de son nouveau logement ?" },
        { label: "2e écoute", text: "Quels éléments de décoration mentionne Nina ? (rideaux, tapis, coussins, miroirs, cadres-photos)" },
        { label: "Grammaire", text: "Relevez les comparaisons : « moins grande qu'une cuisine classique », « aussi bien », « autant de pièces que », « plus qu'avant », « pire », « meilleur »." },
        { label: "Production orale", text: "Êtes-vous d'accord avec Nina ? Pensez-vous que c'est mieux de vivre dans un bus que dans un appartement ? Pourquoi ?" },
      ],
    },
    {
      id: "b3-g", trackNum: 26, section: "G", page: 50,
      title: "La ville du quart d'heure",
      subtitle: "Interview radio — le concept d'Olivier Marin",
      theme: "🚲", color: "#0891B2", colorLight: "#E0F2FE",
      audioSrc: url(26),
      sentences: [
        "Éric Delvaux : « L'urbanisme demain », c'est avec vous, bonjour Olivier Marin !",
        "Olivier Marin : Bonjour Éric !",
        "Éric Delvaux : Mais quel est donc ce concept, Olivier, la ville du quart d'heure ?",
        "Olivier Marin : La ville du quart d'heure, et bien c'est le principe de trouver près de chez soi tout ce qui est essentiel. Pour faire ses courses, pour travailler, pour pratiquer des loisirs, pour se cultiver, pour se soigner. À moins de 5 minutes à vélo et à 15 minutes maximum à pied. Donc sans prendre la voiture.",
        "Éric Delvaux : Alors ce concept de la ville du quart d'heure, est-ce que ça marche ?",
        "Olivier Marin : Le concept commence à s'appliquer un peu partout dans le monde : à Copenhague au Danemark, à Melbourne en Australie, à Ottawa au Canada. Et puis en France aussi ça existe.",
        "Éric Delvaux : Est-ce que ça peut s'appliquer partout ?",
        "Olivier Marin : Alors évidemment c'est beaucoup plus compliqué dans les petites villes où la voiture est encore indispensable pour se déplacer, pour se rendre dans un centre commercial. Le modèle est plutôt pensé pour les quartiers des grandes métropoles.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Que voyez-vous sur l'image ? À quelle distance habitez-vous des lieux où vous allez souvent ?" },
        { label: "1ère écoute", text: "Quel est le concept de la ville du quart d'heure ? a. Tout est à 15 min à pied ou 5 min en vélo. b. Tout est à 15 min en voiture." },
        { label: "2e écoute", text: "D'après Olivier Marin, ce concept est présent dans quels pays ? S'adapte-t-il mieux aux petites ou aux grandes villes ? Pourquoi ?" },
      ],
    },
    {
      id: "b3-delf", trackNum: 31, section: "DELF", page: 54,
      title: "DELF A2 — Préparation : Compréhension de l'oral",
      subtitle: "Exercice 3 (message) et Exercice 4 (4 dialogues)",
      theme: "🎓", color: "#E8574A", colorLight: "#FFF0EF",
      audioSrc: url(31),
      noDictee: true,
      sentences: [
        "Exercice 3 — Bonjour, c'est Manon Ladier. Je vous appelle parce qu'on a des questions pour la location de l'appartement rue Lamartine. Il est à quel étage ? Ce n'est pas écrit dans l'annonce. Et est-ce qu'il y a déjà un lave-linge dans l'appartement ? Parce qu'on n'a pas de machine à laver. Et la troisième chose, c'est : est-ce qu'il y a un parc ou des espaces verts dans le quartier ? On voudrait faire la visite jeudi à 15 h si c'est possible. Rappelez-moi quand vous pouvez.",
        "Exercice 4, dialogue 1 — La femme : Ça va ? — L'homme : Super ! J'ai trouvé un appartement ! — La femme : Mais c'est génial ! — L'homme : Très ! Allez, je t'invite à dîner, on va fêter ça.",
        "Exercice 4, dialogue 2 — L'homme : Bonjour, je cherche l'hôtel Solvay… — La femme : Il est tout près, continuez tout droit sur l'avenue, vous allez le voir vite.",
        "Exercice 4, dialogue 3 — L'homme : Qu'est-ce que tu fais ? — La femme : Je fixe l'étagère. — L'homme : Tu veux que je t'aide ? — La femme : Ah oui, je veux bien, merci !",
        "Exercice 4, dialogue 4 — La femme : Excusez-moi pour le retard, je suis désolée. — L'homme : Maintenant vous êtes là, on commence la visite ?",
      ],
      questions: [
        { label: "Stratégie", text: "Lisez les questions AVANT l'écoute. Vous entendez chaque document 2 fois : la 1ère écoute repère les informations, la 2e permet de vérifier." },
        { label: "Exercice 3", text: "Que souhaite Manon Ladier ? Quelle est sa première question ? Que demande-t-elle sur l'équipement, le quartier, le jour de visite ?" },
        { label: "Exercice 4", text: "Associez chaque dialogue à une situation : demander/donner un renseignement, inviter à dîner, présenter quelqu'un, proposer de l'aide, raconter un souvenir, s'excuser." },
      ],
    },
  ],

  // ─── Unité 4 · Tous pareils, tous différents ────────────────────
  "b4": [
    {
      id: "b4-b", trackNum: 33, section: "B", page: 57,
      title: "Faites des compliments !",
      subtitle: "Chronique radio — la coach Juliette Dumas, sur RTL",
      theme: "💬", color: "#D97706", colorLight: "#FEF3E2",
      audioSrc: url(33),
      sentences: [
        "Stéphane Carpentier : Précieux conseils de notre coach bien-être : Juliette Dumas. Bonjour !",
        "Juliette Dumas : Bonjour Stéphane et bonjour à tous.",
        "Stéphane Carpentier : Vous nous invitez aujourd'hui à faire des compliments.",
        "Juliette Dumas : Oui Stéphane. Cette semaine, j'ai assisté à une scène touchante dans l'épicerie de mon quartier. Une vieille dame devant moi n'arrivait pas à trouver ce qu'elle cherchait, alors un des employés est venu l'aider en lui disant : « Bonjour la plus belle ! » Si vous aviez vu son visage s'illuminer, c'était merveilleux.",
        "Stéphane Carpentier : J'imagine l'effet de ce compliment.",
        "Juliette Dumas : Oui, ça m'a donné l'idée de vous proposer ce matin d'en faire le plus souvent possible, sans occasion ni raison particulière. Des petits compliments tout simples. Par exemple dire « T'es trop fort, toi ! » au petit enfant qui s'est enfin lancé du haut du toboggan. « La couleur de cette écharpe vous donne une mine exquise » à votre voisine si fatiguée. « Vous êtes ma chance de la journée ! » au contrôleur qui vous a fait rentrer in extremis dans le wagon. « Vous êtes une fée ! » à l'infirmière de l'hôpital. Ce sont juste des petits mots gentils, dits comme ça en passant, qui demandent rien en retour.",
        "Stéphane Carpentier : Faire des compliments, c'est le conseil du matin signé Juliette Dumas.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Faites-vous souvent des compliments aux personnes de votre entourage ?" },
        { label: "1ère écoute", text: "Vrai ou faux ? a. Juliette Dumas est journaliste. b. Elle conseille de faire des compliments pour les anniversaires. c. Elle explique que faire un compliment, ça fait du bien." },
        { label: "2e écoute", text: "Quel compliment propose-t-elle pour : a. un enfant ? b. une voisine ? c. un contrôleur ? d. une infirmière ?" },
        { label: "Production orale (DELF)", text: "On vous a déjà dit quelque chose qui vous a fait très plaisir ? Racontez-le à votre voisin(e) et dites pourquoi ce compliment vous a plu." },
      ],
    },
    {
      id: "b4-g", trackNum: 35, section: "G", page: 62,
      title: "L'anthropomorphisme",
      subtitle: "Fred Dubé explique pourquoi on prête des traits humains aux animaux",
      theme: "🐘", color: "#7C3AED", colorLight: "#EDE9FE",
      audioSrc: url(35),
      sentences: [
        "Fred Dubé : L'anthropomorphisme. As-tu déjà réfléchi au fait que quand tu dis que ton chien a de la peine, c'est le même sentiment que nous, les humains, pouvons ressentir ? Ce principe d'attribuer des caractéristiques propres aux humains à des animaux ou à des objets s'appelle l'anthropomorphisme.",
        "C'est aussi utilisé en littérature pour créer des personnages d'animaux au visage humain, comme le lapin dans Alice au pays des merveilles, ou encore Jimmy le Cricket dans Pinocchio.",
        "Il existe ainsi des expressions dans la langue française qui représentent bien l'anthropomorphisme. Par exemple, lorsque quelqu'un est têtu, nous dirons qu'il est une tête de mule, qu'il a une tête de cochon ou qu'il est têtu comme un âne.",
        "Les éléphants, en raison de leurs instincts, retournent toujours à la même source d'eau, même s'ils parcourent de nombreux kilomètres dans une journée. On dit donc qu'ils se souviennent des endroits qu'ils visitent, c'est pourquoi on les associe à une grande mémoire.",
        "Le lynx a naturellement une très bonne vision, on dit donc que quelqu'un a des yeux de lynx lorsqu'il a une vue affûtée ou, au figuré, lorsqu'il perçoit des choses que les autres ne perçoivent pas nécessairement.",
        "L'anthropomorphisme a permis d'enrichir notre langue avec le temps, tout en simplifiant nos phrases et en créant de belles images dans nos textes.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Fred Dubé parle du fait de donner des traits humains à quoi ?" },
        { label: "2 écoutes", text: "Complétez les expressions avec : mémoire, tête, têtu(e), yeux. a. Être …… comme une mule. b. Avoir une …… de cochon. c. Avoir une …… d'éléphant. d. Avoir des …… de lynx." },
        { label: "Production orale", text: "Quelles expressions avec des animaux existent dans vos langues ?" },
      ],
    },
    {
      id: "b4-i", trackNum: 37, section: "I", page: 65,
      title: "La photo de classe",
      subtitle: "Reportage radio sur la traditionnelle photo de classe",
      theme: "📸", color: "#0891B2", colorLight: "#E0F2FE",
      audioSrc: url(37),
      sentences: [
        "Pierre de Vilno : Douze millions d'élèves posent chaque année devant le photographe pour cette photo de classe. De la photo sérieuse à la grimace, ça fait plus d'un siècle et demi que ça dure. On en parle avec notre spécialiste éducation, Virginie Salmen.",
        "Le photographe : Allez, prêts les enfants ! Un, deux, trois. Maintenant tout doucement on va chuchoter « Ouistiti ». Un, deux, trois.",
        "Les enfants : Ouistiti !",
        "Le photographe : Encore une autre. Un, deux, trois.",
        "Les enfants : Ouistiti !",
        "Virginie Salmen : Il y a maintenant d'autres styles de photo en plus de la photo classique.",
        "Le photographe : Et comme vous avez été super sympas, on fait une belle photo grimace.",
        "Virginie Salmen : Et oui, la photo grimace. Il y a aussi des photos déguisées sur différents thèmes, ou encore des photos avec un « dress code ».",
        "Ryan : Je me suis habillé en costume-cravate parce que la photo de classe c'est chic, alors moi je mets des habits chics. Tous les ans je mets un costume.",
        "Lauryn : Je me suis dit que j'allais faire une coiffure un peu spéciale : une queue de cheval en laissant des petits cheveux qui restent.",
        "Lila : Mon jean à paillettes avec mon t-shirt Queen.",
        "Un autre enfant : J'aimerais bien être beau mais pas faire trop mon crâneur sur la photo quoi.",
      ],
      questions: [
        { label: "Entrée en matière", text: "Qu'est-ce qu'on dit dans votre pays quand on prend une photo ?" },
        { label: "1ère écoute", text: "Où a lieu le reportage ? De quoi parle-t-il ?" },
        { label: "2e écoute", text: "En plus de la photo classique, le photographe propose de faire : a. des photos d'identité. b. une photo de grimaces. Est-ce que les enfants interrogés veulent être beaux sur leur photo de classe ?" },
        { label: "Production orale", text: "La photo de classe était-elle un moment important dans votre scolarité ? Parlez-en avec votre voisin(e)." },
      ],
    },
  ],
};
