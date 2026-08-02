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
};
