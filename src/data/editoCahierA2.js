/**
 * editoCahierA2.js — Exercices du Cahier d'activités, Édito A2 2e édition.
 *
 * Source: materials/A2/EDITO A2/Edito A2 by Unite md/cahier_unite_1.md
 * Answers come from the cahier's own Corrigés (p. 155) — not generated, so a
 * self-learner can trust them. This is what the grammar step was missing:
 * theory with no way to check yourself.
 *
 * Only exercises that work WITHOUT audio or images are included here. The
 * audio ones (pistes 1-11) stay in the .md until the cahier audio is hosted.
 *
 * Exercise types:
 *   fill      — type the missing word;  `bank` = words to pick from
 *   choice    — pick one of `options`
 *   order     — put `tokens` back into a sentence
 *   match     — pair each `pairs[].l` with its `pairs[].r`
 *   truefalse — answer is a boolean
 *   transform — rewrite the sentence (checked leniently, see normalize())
 *
 * `example` marks the item the book already solves as a worked example; it is
 * shown filled in and not scored.
 */

export const CAHIER_A2 = {
  b1: {

    // ── Grammaire, keyed by the grammar point index in editoGrammarA2.js ──
    grammar: {

      // p0 — Le passé composé (cahier p. 3)
      p0: [
        {
          num: 2, page: 3,
          instruction: "Complétez les phrases avec l'auxiliaire être ou avoir.",
          vi: "Điền trợ động từ être hoặc avoir.",
          type: "fill",
          items: [
            { q: "Virginie ___ rencontré son conjoint à l'étranger.", answer: "a", example: true },
            { q: "Jamel Debbouze s'___ marié en 2008.", answer: "est" },
            { q: "Leïla Bekhti et Tahar Rahim ___ eu trois enfants.", answer: "ont" },
            { q: "Nous ___ écouté le nouvel album de Stromae.", answer: "avons" },
            { q: "Vous ___ allés au concert de Gaël Faye ?", answer: "êtes" },
            { q: "Tu ___ déjà rencontré une célébrité ?", answer: "as" },
          ],
        },
        {
          num: 3, page: 3,
          instruction: "Écrivez les participes passés des verbes.",
          vi: "Viết quá khứ phân từ của các động từ.",
          type: "fill",
          items: [
            { q: "venir", answer: "venu", example: true },
            { q: "dire", answer: "dit" },
            { q: "être", answer: "été" },
            { q: "recevoir", answer: "reçu" },
            { q: "devoir", answer: "dû" },
            { q: "vivre", answer: "vécu" },
          ],
        },
        {
          num: 4, page: 3,
          instruction: "Choisissez la forme correcte.",
          vi: "Chọn dạng đúng — chú ý hợp giống–số của quá khứ phân từ.",
          type: "choice",
          items: [
            { q: "Ma meilleure amie est ___ en Erasmus l'an dernier.", options: ["parti", "partie"], answer: "partie", example: true },
            { q: "Mes parents se sont ___ à Venise.", options: ["rencontré", "rencontrés"], answer: "rencontrés" },
            { q: "Ma conjointe a ___ ses études.", options: ["fini", "finie"], answer: "fini" },
            { q: "Ma grand-mère est ___ l'an dernier.", options: ["mort", "morte"], answer: "morte" },
            { q: "La chanteuse Angèle est ___ très populaire.", options: ["devenu", "devenue"], answer: "devenue" },
            { q: "Mes sœurs sont ___ dimanche.", options: ["arrivé", "arrivées"], answer: "arrivées" },
          ],
        },
        {
          num: 5, page: 3,
          instruction: "Conjuguez les verbes entre parenthèses au passé composé.",
          vi: "Chia động từ trong ngoặc ở passé composé — đoạn văn về Juliette Armanet.",
          type: "fill",
          items: [
            { q: "Elle (naître) ___ le 4 mars 1984 à Lille.", answer: "est née", example: true },
            { q: "Elle (grandir) ___ en région parisienne.", answer: "a grandi" },
            { q: "Après ses études, elle (devenir) ___ journaliste.", answer: "est devenue" },
            { q: "Elle (travailler) ___ pour la radio et la télévision.", answer: "a travaillé" },
            { q: "Puis elle (décider) ___ de changer de profession.", answer: "a décidé" },
            { q: "Son premier album (sortir) ___ en 2017.", answer: "est sorti" },
            { q: "Les deux albums (avoir) ___ beaucoup de succès.", answer: "ont eu" },
          ],
        },
      ],

      // p1 — La phrase négative (cahier p. 5)
      p1: [
        {
          num: 1, page: 5,
          instruction: "Remettez les éléments dans l'ordre pour former des phrases à la forme négative.",
          vi: "Sắp xếp lại các thành phần thành câu phủ định.",
          type: "order",
          items: [
            { tokens: ["fait", "jamais", "Mick", "ne", "de", "judo."], answer: "Mick ne fait jamais de judo." },
            { tokens: ["le", "match", "ne", "regarde", "à", "télé.", "la", "Personne"], answer: "Personne ne regarde le match à la télé." },
            { tokens: ["aux", "vidéo.", "Je", "joue", "ne", "pas", "jeux"], answer: "Je ne joue pas aux jeux vidéo." },
            { tokens: ["Nous", "mangeons", "rien.", "ne"], answer: "Nous ne mangeons rien." },
            { tokens: ["randonnée.", "ne", "Personne", "fait", "de"], answer: "Personne ne fait de randonnée." },
            { tokens: ["jamais", "moi.", "Romain", "danse", "avec", "ne"], answer: "Romain ne danse jamais avec moi." },
          ],
        },
        {
          num: 2, page: 5,
          instruction: "Complétez les phrases avec rien, personne, jamais, plus.",
          vi: "Điền rien / personne / jamais / plus.",
          type: "fill",
          bank: ["rien", "personne", "jamais", "plus"],
          items: [
            { q: "– Il y a quelqu'un ? – Non, il n'y a ___.", answer: "personne", example: true },
            { q: "– Tu fais quoi demain soir ? – Je ne fais ___, j'ai envie de me reposer.", answer: "rien" },
            { q: "– Damien habite toujours à Cannes ? – Non, il n'habite ___ à Cannes.", answer: "plus" },
            { q: "– Tu regardes des séries parfois ? – Non, je ne regarde ___ de séries.", answer: "jamais" },
            { q: "– Tu as rencontré quelqu'un au concert ? – Non, je n'ai rencontré ___.", answer: "personne" },
            { q: "– Tu fais encore de l'escalade ? – Non, je ne fais ___ de sport.", answer: "plus" },
          ],
        },
        {
          num: 3, page: 5,
          instruction: "Transformez les phrases au passé composé.",
          vi: "Chuyển câu sang passé composé — chú ý vị trí của phủ định.",
          type: "transform",
          items: [
            { q: "Il ne va jamais au cirque.", answer: "Il n'est jamais allé au cirque.", example: true },
            { q: "Je ne vois personne.", answer: "Je n'ai vu personne." },
            { q: "Vous ne mangez rien ?", answer: "Vous n'avez rien mangé ?" },
            { q: "Elle ne fait plus de vélo.", answer: "Elle n'a plus fait de vélo." },
            { q: "Tu ne joues jamais au foot ?", answer: "Tu n'as jamais joué au foot ?" },
            { q: "Nous n'avons rien à faire.", answer: "Nous n'avons rien eu à faire." },
          ],
        },
      ],

      // p2 — Les indicateurs de temps (cahier p. 7)
      p2: [
        {
          num: 1, page: 7,
          instruction: "Complétez avec il y a et depuis.",
          vi: "Điền il y a hoặc depuis.",
          type: "fill",
          bank: ["il y a", "depuis"],
          items: [
            { q: "Jérôme s'est marié ___ deux ans.", answer: "il y a", example: true },
            { q: "Juliette et Miro sont en couple ___ six mois.", answer: "depuis" },
            { q: "Manu a commencé à travailler dans cette entreprise ___ dix ans.", answer: "il y a" },
            { q: "Nous faisons de la randonnée ensemble ___ longtemps.", answer: "depuis" },
            { q: "La nouvelle chanson d'Angèle est sortie ___ une semaine.", answer: "il y a" },
            { q: "Adeline fait du paddle ___ une heure.", answer: "depuis" },
          ],
        },
        {
          num: 2, page: 7,
          instruction: "Entourez la bonne réponse.",
          vi: "Chọn đáp án đúng.",
          type: "choice",
          items: [
            { q: "Bertille a commencé à chanter ___ trois ans.", options: ["depuis", "il y a", "pendant"], answer: "il y a", example: true },
            { q: "Karim ne fait plus de vélo ___ janvier.", options: ["depuis", "il y a", "pendant"], answer: "depuis" },
            { q: "Hier, Maryse a fait de l'escalade ___ quatre heures.", options: ["depuis", "il y a", "pendant"], answer: "pendant" },
            { q: "Je suis allée au Cirque d'hiver Bouglione ___ un an.", options: ["depuis", "il y a", "pendant"], answer: "il y a" },
            { q: "Tu fais de la compétition ___ longtemps ?", options: ["depuis", "il y a", "pendant"], answer: "depuis" },
            { q: "Je vais au Festival de Cannes chaque année, ___ huit ans.", options: ["depuis", "il y a", "pendant"], answer: "depuis" },
            { q: "Mes parents aiment faire des activités en plein air ___ leurs vacances d'été.", options: ["depuis", "il y a", "pendant"], answer: "pendant" },
          ],
        },
        {
          num: 3, page: 7,
          instruction: "Complétez les phrases avec depuis, il y a, pendant. (Pierre Niney)",
          vi: "Điền depuis / il y a / pendant — đoạn về diễn viên Pierre Niney.",
          type: "fill",
          bank: ["depuis", "il y a", "pendant"],
          items: [
            { q: "Il est comédien ___ l'âge de 11 ans.", answer: "depuis", example: true },
            { q: "Il a fait des études de théâtre ___ plusieurs années.", answer: "pendant" },
            { q: "Il est en couple avec Natasha Andrews ___ huit ans.", answer: "depuis" },
            { q: "Il a été comédien à la Comédie-Française ___ cinq ans, de 2010 à 2015.", answer: "pendant" },
            { q: "Il est célèbre surtout ___ 2015.", answer: "depuis" },
            { q: "La série La Flamme est sortie ___ deux ans.", answer: "il y a" },
          ],
        },
      ],
    },

    // ── Vocabulaire, keyed by the cycle's vocab step ──────────────────
    vocab: {
      // Cycle 1 — Parcours de vie (cahier p. 4)
      c1_vocab: [
        {
          num: 1, page: 4,
          instruction: "Associez les débuts et les fins de phrases.",
          vi: "Nối nghề nghiệp với công việc tương ứng.",
          type: "match",
          pairs: [
            { l: "Un acteur",      r: "joue dans un film." },
            { l: "Un scénariste",  r: "écrit l'histoire d'un film." },
            { l: "Un chanteur",    r: "chante des chansons." },
            { l: "Un compositeur", r: "compose de la musique." },
            { l: "Une écrivaine",  r: "écrit des livres." },
          ],
        },
        {
          num: 2, page: 4,
          instruction: "Complétez les phrases avec les éléments proposés.",
          vi: "Điền từ cho sẵn vào chỗ trống.",
          type: "fill",
          bank: ["célibataire", "déménager", "faire connaissance", "coup de foudre", "se faire des amis", "rencontre"],
          items: [
            { q: "Dom a tout de suite aimé Laurence, il a eu un ___.", answer: "coup de foudre", example: true },
            { q: "Je cherche un travail dans le sud de la France, je voudrais ___.", answer: "déménager" },
            { q: "Ce n'est pas toujours facile de ___ quand on arrive dans une nouvelle ville.", answer: "se faire des amis" },
            { q: "Papi, tu nous racontes ta ___ avec mamie ?", answer: "rencontre" },
            { q: "La vie en couple ? Non, ce n'est pas pour moi, je préfère rester ___.", answer: "célibataire" },
            { q: "Je ne connais pas encore les parents de mon copain mais je vais ___ avec eux le week-end prochain.", answer: "faire connaissance" },
          ],
        },
        {
          num: 3, page: 4,
          instruction: "Remettez l'histoire de Lise et Luc dans l'ordre.",
          vi: "Sắp xếp câu chuyện của Lise và Luc theo đúng thứ tự.",
          type: "order",
          sentences: true,
          items: [
            {
              tokens: [
                "Ils se sont mariés et ils ont décidé d'avoir un enfant.",
                "Ils sont tombés amoureux.",
                "Lise et Luc se sont rencontrés pendant leur séjour Erasmus à Barcelone.",
                "Ils se sont séparés 20 ans après leur rencontre.",
                "Ils ont décidé de s'installer ensemble.",
                "Leur enfant est né.",
              ],
              answer: [
                "Lise et Luc se sont rencontrés pendant leur séjour Erasmus à Barcelone.",
                "Ils sont tombés amoureux.",
                "Ils ont décidé de s'installer ensemble.",
                "Ils se sont mariés et ils ont décidé d'avoir un enfant.",
                "Leur enfant est né.",
                "Ils se sont séparés 20 ans après leur rencontre.",
              ],
            },
          ],
        },
      ],

      // Cycle 2 — Les loisirs (cahier p. 6)
      c2_vocab: [
        {
          num: 2, page: 6,
          instruction: "Entourez la bonne réponse.",
          vi: "Chọn từ đúng.",
          type: "choice",
          items: [
            { q: "Ce week-end, je vais faire ___ à la montagne.", options: ["une randonnée", "du bricolage"], answer: "une randonnée", example: true },
            { q: "On va au ___ ? Il y a un film intéressant.", options: ["cinéma", "musée"], answer: "cinéma" },
            { q: "C'est un sportif professionnel, il a fait beaucoup de ___.", options: ["compétitions", "spectacles"], answer: "compétitions" },
            { q: "J'adore le ___ de Fontainebleau, c'est vraiment un beau monument.", options: ["château", "concert"], answer: "château" },
            { q: "Maman, je peux aller dans ma chambre faire de ___ ?", options: ["l'escalade", "la peinture"], answer: "la peinture" },
            { q: "Dominique aime beaucoup les activités en plein air, surtout le ___.", options: ["judo", "vélo"], answer: "vélo" },
          ],
        },
        {
          num: 3, page: 6,
          instruction: "Complétez le texte « Bienvenue à Rennes ! » avec les mots proposés.",
          vi: "Điền từ vào bài giới thiệu thành phố Rennes.",
          type: "fill",
          bank: ["musées", "sports nautiques", "amateurs et amatrices", "promenades", "visites guidées", "monuments"],
          items: [
            { q: "Vous aimez les ___ ? Venez visiter l'exposition Celtique au musée de Bretagne.", answer: "musées", example: true },
            { q: "Envie de nature ? En famille ou en amoureux, faites de jolies ___ dans les bois de Rennes !", answer: "promenades" },
            { q: "Vous aimez les ___ ? Louez un paddle ou un kayak sur le quai Saint Cyr.", answer: "sports nautiques" },
            { q: "Vous voulez découvrir le centre historique ? L'office de tourisme organise des ___.", answer: "visites guidées" },
            { q: "Pour les ___ de jeux vidéo, le Stunfest festival est là pour vous !", answer: "amateurs et amatrices" },
            { q: "Vous pouvez aussi sortir de Rennes et aller visiter d'autres ___.", answer: "monuments" },
          ],
        },
      ],
    },
  },
};

// Answers are compared loosely: case, accents on the apostrophe, doubled
// spaces and trailing punctuation shouldn't cost the learner a point.
export function normalizeAnswer(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[''’]/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.!?;:]+$/g, "")
    .trim();
}

export function isAnswerCorrect(given, expected) {
  return normalizeAnswer(given) === normalizeAnswer(expected);
}
