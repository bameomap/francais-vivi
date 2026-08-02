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
};
