/**
 * editoCahierA2.js — Exercices du Cahier d'activités, Édito A2 2e édition.
 *
 * Source: materials/A2/EDITO A2/Edito A2 by Unite md/cahier_unite_1.md
 * Answers come from the cahier's own Corrigés (p. 155) — not generated, so a
 * self-learner can trust them. This is what the grammar step was missing:
 * theory with no way to check yourself.
 *
 * Audio exercises carry `audioSrc`; the cahier tracks are hosted next to the
 * livre ones and their printed piste number matches the filename directly.
 * A handful of cahier exercises depend on photographs rather than sound
 * (p.4 act.4, p.6 act.1, p.11 act.4) — those stay in the .md only. Where the
 * DELF listening uses pictures as answer options, the option is written out.
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

const AUDIO_BASE = "https://bameomap.github.io/francais-vivi";
const piste = (n) => `${AUDIO_BASE}/${String(n).padStart(3, "0")}_Edito_A2_Cahier.mp3`;

export const CAHIER_A2 = {
  b1: {

    // ── Grammaire, keyed by the grammar point index in editoGrammarA2.js ──
    grammar: {

      // p0 — Le passé composé (cahier p. 3)
      p0: [
        {
          num: 1, page: 3, audioSrc: piste(1),
          instruction: "Écoutez et dites si vous entendez le passé composé.",
          vi: "Nghe từng câu và cho biết câu đó có dùng passé composé không.",
          type: "truefalse",
          items: [
            { q: "a. Tu as préparé toutes tes affaires.", answer: false },
            { q: "b. Hier vous avez vu un film.", answer: true },
            { q: "c. Dans un bar, debout, j'ai bu un cocktail de fruits.", answer: true },
            { q: "d. Il a lu à son fils l'histoire du loup.", answer: true },
            { q: "e. Sa moto à trois roues est dans la rue.", answer: true },
            { q: "f. Elle a su gérer son stress.", answer: false },
          ],
        },
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
        {
          num: 4, page: 5, audioSrc: piste(3),
          instruction: "Écoutez et répondez aux questions avec la négation proposée.",
          vi: "Nghe câu hỏi rồi trả lời bằng từ phủ định cho sẵn trong ngoặc.",
          type: "transform",
          items: [
            { q: "(jamais)", answer: "Non, je ne fais jamais de jardinage.", example: true },
            { q: "(personne)", answer: "Je ne vais au concert avec personne." },
            { q: "(rien)", answer: "Je n'ai rien dit." },
            { q: "(plus)", answer: "Non, je n'ai plus d'argent." },
            { q: "(personne)", answer: "Non, personne ne parle italien ici." },
            { q: "(jamais)", answer: "Non, je n'ai jamais vu ce spectacle." },
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
        {
          num: 4, page: 7, audioSrc: piste(5),
          instruction: "Écoutez et complétez les phrases avec pendant, depuis et il y a.",
          vi: "Nghe rồi điền pendant / depuis / il y a.",
          type: "fill",
          bank: ["pendant", "depuis", "il y a"],
          items: [
            { q: "J'ai joué au foot ___ deux heures.", answer: "pendant", example: true },
            { q: "Nous sommes allées au Festival de Vercors ___ deux ans.", answer: "il y a" },
            { q: "Je ne fais plus de compétition ___ un an.", answer: "depuis" },
            { q: "Annabelle est restée à Berlin ___ cinq mois.", answer: "pendant" },
            { q: "Je travaille ici ___ dix jours.", answer: "depuis" },
            { q: "J'ai rencontré mon meilleur ami ___ 22 ans.", answer: "il y a" },
          ],
        },
      ],
    },

    // ── Phonie-graphie (cahier p. 8) — wired into the Phono step ─────
    phono: [
      {
        num: 1, page: 8, audioSrc: piste(6),
        instruction: "Discrimination — écoutez et dites dans quel ordre vous entendez les sons [y] et [u].",
        vi: "Nghe và cho biết thứ tự hai âm: [y] (như « tu ») trước hay [u] (như « coucou ») trước?",
        type: "choice",
        items: [
          { q: "a. Tu as préparé toutes tes affaires.", options: ["[y] avant [u]", "[u] avant [y]"], answer: "[y] avant [u]", example: true },
          { q: "b. Hier vous avez vu un film.", options: ["[y] avant [u]", "[u] avant [y]"], answer: "[u] avant [y]" },
          { q: "c. Dans un bar, debout, j'ai bu un cocktail.", options: ["[y] avant [u]", "[u] avant [y]"], answer: "[u] avant [y]" },
          { q: "d. Il a lu à son fils l'histoire du loup.", options: ["[y] avant [u]", "[u] avant [y]"], answer: "[y] avant [u]" },
          { q: "e. Sa moto à trois roues est dans la rue.", options: ["[y] avant [u]", "[u] avant [y]"], answer: "[u] avant [y]" },
          { q: "f. Elle a su gérer son stress et ne pas être sous pression.", options: ["[y] avant [u]", "[u] avant [y]"], answer: "[y] avant [u]" },
        ],
      },
      {
        num: 3, page: 8, audioSrc: piste(8),
        instruction: "Dictée — écoutez le texte et complétez les mots.",
        vi: "Nghe và điền các từ còn thiếu. Toàn bộ đều là âm [y] hoặc [u].",
        type: "fill",
        items: [
          { q: "Sal___ Jules,", answer: "ut", example: true },
          { q: "au mois d'a___t,", answer: "oû" },
          { q: "n___s avons d___ annuler nos vacances. (2 từ, cách nhau bởi dấu cách)", answer: "ou û" },
          { q: "N___s avons ___ un gros problème. (2 từ)", answer: "ou eu" },
          { q: "Et toi, tu pars ___ p___r les vacances ? (2 từ)", answer: "où ou" },
        ],
      },
    ],

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

    // ── Bilan linguistique (cahier p. 10-11, noté /40) ──────────────
    // Wired into the "L'essentiel" step, alongside the AI-generated quiz.
    bilan: [
      {
        num: 1, page: 10,
        instruction: "Transformez les phrases au passé composé. (/7)",
        vi: "Chuyển sang passé composé — chú ý hợp giống–số.",
        type: "transform",
        items: [
          { q: "Marc déménage à Paris.", answer: "Marc a déménagé à Paris." },
          { q: "Lana a un enfant.", answer: "Lana a eu un enfant." },
          { q: "Cathy tombe amoureuse.", answer: "Cathy est tombée amoureuse." },
          { q: "Vincent et Ève se marient !", answer: "Vincent et Ève se sont mariés !" },
          { q: "Ma conjointe va à un spectacle.", answer: "Ma conjointe est allée à un spectacle." },
          { q: "Mon frère finit son stage.", answer: "Mon frère a fini son stage." },
          { q: "Cédric et Anouk décident d'avoir un enfant.", answer: "Cédric et Anouk ont décidé d'avoir un enfant." },
        ],
      },
      {
        num: 2, page: 10,
        instruction: "Dites le contraire. Utilisez rien, personne, jamais ou plus. (/7)",
        vi: "Viết câu trái nghĩa bằng phủ định.",
        type: "transform",
        items: [
          { q: "Je vois tout.", answer: "Je ne vois rien." },
          { q: "Vous connaissez tout le monde ici.", answer: "Vous ne connaissez personne ici." },
          { q: "Je fais encore de la compétition.", answer: "Je ne fais plus de compétition." },
          { q: "Tu as toujours été en retard.", answer: "Tu n'as jamais été en retard." },
          { q: "Quelqu'un a parlé de notre stage.", answer: "Personne n'a parlé de notre stage." },
          { q: "Tout a été simple avec toi.", answer: "Rien n'a été simple avec toi." },
          { q: "J'ai déjà fait cette balade.", answer: "Je n'ai jamais fait cette balade." },
        ],
      },
      {
        num: 3, page: 10,
        instruction: "Complétez les phrases avec il y a, pendant, depuis. (/6)",
        vi: "Điền il y a / pendant / depuis.",
        type: "fill",
        bank: ["il y a", "pendant", "depuis"],
        items: [
          { q: "Mon mari fait de l'escalade ___ 15 ans.", answer: "depuis" },
          { q: "J'ai fait du kayak pour la première fois ___ six mois.", answer: "il y a" },
          { q: "Hier, nous avons fait une promenade ___ deux heures.", answer: "pendant" },
          { q: "J'ai vu ce musicien en concert ___ cinq ans.", answer: "il y a" },
          { q: "Ali et moi, nous sommes mariés ___ septembre 2009.", answer: "depuis" },
          { q: "J'ai travaillé dans cette entreprise ___ trois ans.", answer: "il y a" },
        ],
      },
      {
        num: 4, page: 11,
        instruction: "Vocabulaire — Choisissez la réponse correcte. (/5)",
        vi: "Chọn từ đúng.",
        type: "choice",
        items: [
          { q: "Ma sœur n'est pas mariée mais elle vit en couple, ___ est musicien.", options: ["son mari", "son conjoint"], answer: "son conjoint" },
          { q: "J'ai fini mes études et maintenant je ___.", options: ["fais un séjour Erasmus", "cherche du travail"], answer: "cherche du travail" },
          { q: "Mon conjoint est ___, il écrit des livres pour enfants.", options: ["écrivain", "chanteur"], answer: "écrivain" },
          { q: "Ma meilleure amie est ___, elle joue dans une pièce de théâtre.", options: ["actrice", "trader"], answer: "actrice" },
          { q: "Mathieu et Mathilde se sont mariés et ils ont eu un ___.", options: ["enfant", "coup de foudre"], answer: "enfant" },
        ],
      },
      {
        num: 5, page: 11,
        instruction: "Associez les phrases qui ont le même sens. (/5)",
        vi: "Nối hai câu cùng nghĩa.",
        type: "match",
        pairs: [
          { l: "Ils sont mariés.",                      r: "Ils sont mari et femme." },
          { l: "Ils déménagent.",                       r: "Ils s'installent dans un autre lieu." },
          { l: "Ils sont tombés amoureux tout de suite.", r: "Ils ont eu un coup de foudre." },
          { l: "Ils se sont rencontrés.",               r: "Ils ont fait connaissance." },
          { l: "Ils ont des enfants.",                  r: "Ils ont une vie de famille." },
        ],
      },
      {
        num: 6, page: 11,
        instruction: "Répondez par vrai ou faux. (/5)",
        vi: "Đúng hay sai?",
        type: "truefalse",
        items: [
          { q: "Le château est un monument.", answer: true },
          { q: "Le vélo est un sport aquatique.", answer: false },
          { q: "On va voir une exposition dans un musée.", answer: true },
          { q: "On fait de l'escalade dans un théâtre.", answer: false },
          { q: "Le bricolage est une activité en plein air.", answer: false },
        ],
      },
      {
        num: 7, page: 9, audioSrc: piste(10),
        instruction: "Compréhension orale — Rencontre avec Abd Al Malik.",
        vi: "Nghe bài phỏng vấn rapper Abd Al Malik rồi trả lời.",
        type: "truefalse",
        items: [
          { q: "« Le modèle noir » est le nom d'un tableau.", answer: false },
          { q: "Le rappeur Abd Al Malik présente son spectacle au musée d'Orsay.", answer: true },
        ],
      },
      {
        num: 8, page: 9, audioSrc: piste(10),
        instruction: "Compréhension orale — cochez les bonnes réponses.",
        vi: "Vẫn bài nghe trên — chọn đáp án đúng.",
        type: "choice",
        items: [
          { q: "Abd Al Malik raconte :", options: ["la rencontre d'un jeune homme avec un Français", "le parcours d'un jeune homme"], answer: "le parcours d'un jeune homme" },
          { q: "Le jeune homme se pose des questions sur :", options: ["son travail", "lui et son identité"], answer: "lui et son identité" },
          { q: "Où est né le jeune homme ?", options: ["En France.", "Au Congo."], answer: "En France." },
        ],
      },
      {
        num: 9, page: 14,
        instruction: "Jeux — Barrez l'intrus.",
        vi: "Tìm từ lạc loài trong mỗi nhóm.",
        type: "choice",
        items: [
          { q: "a.", options: ["le scénariste", "le compositeur", "l'interprète", "la conjointe"], answer: "la conjointe" },
          { q: "b.", options: ["faire un stage", "partir en Erasmus", "s'installer", "obtenir un diplôme"], answer: "s'installer" },
          { q: "c.", options: ["se marier", "avoir un enfant", "avoir un coup de foudre", "grandir"], answer: "grandir" },
          { q: "d.", options: ["le cirque", "la peinture", "le cinéma", "le château"], answer: "la peinture" },
          { q: "e.", options: ["le paddle", "une exposition", "le musée", "une visite guidée"], answer: "le paddle" },
          { q: "f.", options: ["faire du vélo", "faire une balade", "regarder une série", "jouer au foot"], answer: "regarder une série" },
        ],
      },
    ],

    // ── DELF A2 blanc (cahier p. 12-14) ────────────────────────────
    delf: {
      // The livre's own DELF prep listening (p.26). The book prints three of
      // its six answer sets as photographs; those options are written out from
      // the official transcript, where the answer is unambiguous. The audio
      // lives with the livre tracks, not the cahier ones.
      coLivre: [
        {
          num: 1, page: 26,
          audioSrc: "https://bameomap.github.io/francais-vivi/010_Edito_A2_Livre.mp3",
          instruction: "Livre p.26 — vous écoutez 6 annonces diffusées dans des lieux publics. (6 points)",
          vi: "Nghe 6 thông báo nơi công cộng. Đọc câu hỏi TRƯỚC khi nghe — mỗi thông báo được nghe 2 lần.",
          type: "choice",
          transcript: "1. Mesdames et Messieurs, le concert va commencer. Merci d'éteindre vos téléphones portables. — 2. La ville de Bordeaux propose des activités pour la Semaine du patrimoine. Pour regarder le programme, connectez-vous sur le site internet de la ville. — 3. Nous informons les visiteurs que le château va bientôt fermer ses portes. Merci de marcher vers la sortie et bonne fin de journée. — 4. Mesdames et messieurs, notre spectacle de cirque va commencer. Merci d'aller vous asseoir à votre place. — 5. Bienvenue au centre aquatique ! Nous vous informons qu'il est interdit de courir près des piscines. — 6. Les inscriptions pour la sortie en canoë-kayak sont ouvertes. Venez vite réserver votre place pour la journée à la réception du camping.",
          items: [
            { q: "1. Qu'est-ce que vous devez faire ?", options: ["Allumer votre téléphone portable.", "Éteindre votre téléphone portable.", "Ranger votre téléphone portable."], answer: "Éteindre votre téléphone portable." },
            { q: "2. Comment connaître le programme de la Semaine du patrimoine à Bordeaux ?", options: ["Sur le site internet de la ville.", "À l'office de tourisme.", "Par téléphone."], answer: "Sur le site internet de la ville." },
            { q: "3. Quand entendez-vous ce message ?", options: ["Le matin.", "Le midi.", "Le soir."], answer: "Le soir." },
            { q: "4. Qu'est-ce que vous devez faire ?", options: ["Aller vous asseoir à votre place.", "Sortir de la salle.", "Éteindre la lumière."], answer: "Aller vous asseoir à votre place." },
            { q: "5. Qu'est-ce qui est interdit près des piscines ?", options: ["Courir.", "Sauter.", "Marcher."], answer: "Courir." },
            { q: "6. À quelle activité pouvez-vous vous inscrire ?", options: ["Une sortie en canoë-kayak.", "Un cours de natation.", "Une randonnée en montagne."], answer: "Une sortie en canoë-kayak." },
          ],
        },
      ],

      // Compréhension de l'oral — the cahier's own exam. Three of the six
      // questions use photographs as options in the book; they are written out.
      co: [
        {
          num: 1, page: 12, audioSrc: piste(11),
          instruction: "Compréhension de l'oral — vous écoutez des annonces publiques. (6 points)",
          vi: "Nghe 6 thông báo nơi công cộng rồi chọn đáp án đúng.",
          type: "choice",
          items: [
            { q: "1. Quel événement est organisé au cinéma ?", options: ["Une signature de livre.", "Une projection de film.", "Une présentation de CD."], answer: "Une présentation de CD." },
            { q: "2. Où est-ce qu'il faut aller pour retrouver le sac ?", options: ["La salle de cinéma.", "Le kiosque d'accueil.", "Le restaurant."], answer: "Le kiosque d'accueil." },
            { q: "3. Quelle sortie propose le club cette année ?", options: ["Le canoë-kayak.", "L'escalade.", "L'accrobranche."], answer: "Le canoë-kayak." },
            { q: "4. À quel concours est-ce que vous pouvez vous inscrire ?", options: ["La photographie.", "La peinture.", "La sculpture."], answer: "La photographie." },
            { q: "5. Dans le parc du château de Versailles, vous pouvez…", options: ["écouter un concert.", "rencontrer le jardinier.", "faire une visite guidée."], answer: "faire une visite guidée." },
            { q: "6. Qu'est-ce qui est interdit ?", options: ["Venir à côté des sportifs.", "Discuter avec les sportifs.", "Photographier les sportifs."], answer: "Venir à côté des sportifs." },
          ],
        },
      ],
      // Compréhension des écrits — 6 documents, 8 candidates, 6 to place.
      ce: [
        {
          num: 1, page: 12,
          instruction: "Compréhension des écrits — associez chaque document à la personne correspondante. (6 points)",
          vi: "Bạn muốn rủ bạn bè đi chơi và đọc chương trình hoạt động của thành phố Rennes. Nối mỗi thông báo với người phù hợp — có 8 người nhưng chỉ 6 thông báo.",
          type: "match",
          pairs: [
            { l: "1. Samedi 10 juin, l'Opéra de Bretagne va présenter ses nouveaux spectacles de chant et de danse.", r: "E. Nina enseigne le ballet." },
            { l: "2. Promenade guidée du magnifique jardin du Tabor. Fleurs exotiques et arbres de cent ans.", r: "D. Timoteo s'intéresse à la nature." },
            { l: "3. À la librairie Pagina, l'écrivain Sylvain Tesson signe son nouveau livre sur l'Asie traditionnelle.", r: "B. Rose aime les cultures du monde." },
            { l: "4. Jeudi 15, enregistrement en public de l'émission politique de Radio Armorique.", r: "G. Blanche voudrait devenir journaliste." },
            { l: "5. Pendant les vacances, la piscine de Bréquigny propose un stage de natation. 135 euros la semaine.", r: "C. Jasper adore les sports aquatiques." },
            { l: "6. Des tableaux du XXe siècle de la collection du Louvre sont exposés pour la première fois à Rennes.", r: "H. Luca apprécie la peinture moderne." },
          ],
          // Distractors the book includes on purpose — offered in the dropdowns.
          extraOptions: ["A. Mahé adore aller au cinéma.", "F. Jan a envie de bricoler."],
        },
      ],
      // Production — no auto-grading; the cahier's model answer is the yardstick.
      production: [
        {
          skill: "Production écrite", points: "12,5 points", page: 13,
          prompt: "Vous habitez en France. Vous êtes allé(e) aux Journées du Patrimoine de votre ville, samedi dernier. Vous écrivez à un(e) ami(e) français(e) pour lui raconter votre visite. Vous lui donnez aussi vos impressions. (60 mots minimum)",
          vi: "Viết thư kể cho bạn Pháp nghe về chuyến đi Ngày Di sản. (tối thiểu 60 từ)",
          model: "Salut ! Comment ça va ? Samedi dernier, c'était les journées du Patrimoine. Avec Thibaut, nous sommes allés visiter l'Opéra de Paris. C'était magnifique. Il y a de l'or et des sculptures partout ! Nous avons vu le hall, la salle de spectacle et les coulisses. J'ai adoré voir toutes les machines derrière la scène. Le soir, on a mangé au restaurant de l'Opéra. C'était très bon. On a passé une journée vraiment agréable. Si ça te dit, on peut y aller l'année prochaine ? Bisous Léo",
        },
        {
          skill: "Production orale", points: "2 minutes environ", page: 13,
          prompt: "Partie 2 — monologue suivi. Sujet : Vacances préférées. Racontez vos vacances préférées. Vous êtes parti où et avec qui ? Qu'est-ce que vous avez fait ? Pourquoi est-ce que vous avez aimé ces vacances ?",
          vi: "Nói 2 phút về kỳ nghỉ bạn thích nhất: đi đâu, với ai, làm gì, vì sao thích.",
          model: "Mes vacances préférées c'était en Suisse. J'y suis allée avec mon mari et ma fille l'année dernière. La première semaine, nous sommes restés dans une petite ville, près de Genève. Nous avons visité un vieux château et la maison de l'acteur de cinéma Charlie Chaplin. Elle est très grande. Il y a beaucoup de souvenirs de lui et de sa famille. On a regardé des extraits de ses films dans son studio de cinéma et on s'est promené dans le jardin. Il y a une belle vue sur le lac et les montagnes. C'était magnifique et en plus il faisait beau. Après, nous sommes allés voir mon cousin. Il habite à Neuchâtel. Ma fille a joué avec ses cousines. Nous nous sommes baignés et on a fait du paddle sur le lac. C'était mes vacances préférées parce que la Suisse est un très beau pays, c'est calme, on peut se reposer. Et j'ai aimé passer du temps avec ma famille.",
        },
      ],
    },
  },

  b2: {

    // ── Grammaire, keyed by the grammar point index in editoGrammarA2.js ──
    grammar: {

      // p0 — L'imparfait (cahier p. 15)
      p0: [
        {
          // Only the answer key is printed in the corrigé (présent/imparfait
          // per case) — the cahier doesn't reprint the individual sentences
          // for this listening exercise, so the items below are labelled by
          // case letter only, as in the source.
          num: 1, page: 15, audioSrc: piste(12),
          instruction: "Écoutez et cochez : la phrase est-elle au présent ou à l'imparfait ?",
          vi: "Nghe từng câu (a→f) và cho biết câu đó ở thì hiện tại hay imparfait.",
          type: "choice",
          items: [
            { q: "a. (exemple)", options: ["présent", "imparfait"], answer: "présent", example: true },
            { q: "b.", options: ["présent", "imparfait"], answer: "imparfait" },
            { q: "c.", options: ["présent", "imparfait"], answer: "présent" },
            { q: "d.", options: ["présent", "imparfait"], answer: "imparfait" },
            { q: "e.", options: ["présent", "imparfait"], answer: "présent" },
            { q: "f.", options: ["présent", "imparfait"], answer: "imparfait" },
          ],
        },
        {
          num: 2, page: 15,
          instruction: "Complétez les terminaisons des verbes à l'imparfait.",
          vi: "Điền đuôi động từ ở imparfait.",
          type: "fill",
          items: [
            { q: "Je me rappelle, nous étudi…… ensemble.", answer: "étudiions", example: true },
            { q: "Chaque semaine, j'écriv…… une lettre à ma meilleure amie.", answer: "écrivais" },
            { q: "On chang…… souvent de professeur.", answer: "changeait" },
            { q: "Dans ma famille, on chant…… beaucoup.", answer: "chantait" },
            { q: "À cette époque, vous espér…… devenir célèbres.", answer: "espériez" },
            { q: "Tu voy…… souvent tes cousins ?", answer: "voyais" },
          ],
        },
        {
          num: 3, page: 15,
          instruction: "Conjuguez les verbes entre parenthèses à l'imparfait.",
          vi: "Chia động từ trong ngoặc ở imparfait — đoạn văn kể kỷ niệm nghỉ hè.",
          type: "fill",
          items: [
            { q: "L'hiver, on (partir) ___ à la neige.", answer: "partait", example: true },
            { q: "Mon frère et moi, nous (faire) ___ du ski,", answer: "faisions" },
            { q: "ma sœur (préférer) ___ le snowboard.", answer: "préférait" },
            { q: "L'été, nous (aller) ___ toujours chez ma tante et mon oncle.", answer: "allions" },
            { q: "À cette époque, ils (habiter) ___ dans le sud de la France.", answer: "habitaient" },
            { q: "J'(adorer) ___ leur maison, leur jardin et tous ces moments passés en famille.", answer: "adorais" },
            { q: "On (cuisiner) ___", answer: "cuisinait" },
            { q: "et on (manger) ___ toujours tous ensemble.", answer: "mangeait" },
            { q: "C'(être) ___ des moments inoubliables.", answer: "était" },
          ],
        },
        {
          num: 4, page: 15,
          instruction: "Transformez les phrases au présent à l'imparfait.",
          vi: "Chuyển câu từ hiện tại sang imparfait.",
          type: "transform",
          items: [
            { q: "Anne oublie toujours tout.", answer: "Anne oubliait toujours tout.", example: true },
            { q: "Étienne et Alex se déplacent souvent.", answer: "Étienne et Alex se déplaçaient souvent." },
            { q: "Tu as beaucoup de photos de vacances.", answer: "Tu avais beaucoup de photos de vacances." },
            { q: "Nous sommes souvent en retard.", answer: "Nous étions souvent en retard." },
            { q: "Vous faites beaucoup de choses ensemble.", answer: "Vous faisiez beaucoup de choses ensemble." },
            { q: "J'adore écouter le chant des oiseaux.", answer: "J'adorais écouter le chant des oiseaux." },
            { q: "Tu me tiens toujours la main quand on va à l'école.", answer: "Tu me tenais toujours la main quand on allait à l'école." },
          ],
        },
      ],

      // p1 — Les pronoms y et en (cahier p. 17)
      p1: [
        {
          num: 1, page: 17,
          instruction: "Entourez le pronom y ou en qui convient dans les réponses.",
          vi: "Chọn đại từ y hoặc en phù hợp trong câu trả lời.",
          type: "choice",
          items: [
            { q: "– Tu reviens sur la même île l'été prochain ? – Oui, j'___ reviens.", options: ["y", "en"], answer: "y", example: true },
            { q: "– Tu descends du sommet ? – Oui, j'___ descends.", options: ["y", "en"], answer: "en" },
            { q: "– Vous êtes partis quand de chez vous ? – On ___ est partis il y a deux heures.", options: ["y", "en"], answer: "en" },
            { q: "– Tes parents habitent à Cannes ? – Oui, ils ___ habitent depuis l'année dernière.", options: ["y", "en"], answer: "y" },
            { q: "– Les enfants sont rentrés de leur balade ? – Oui, ils ___ sont rentrés.", options: ["y", "en"], answer: "en" },
            { q: "– Tu aimes le climat dans ce pays ? – Oui, il ___ fait toujours beau.", options: ["y", "en"], answer: "y" },
          ],
        },
        {
          num: 2, page: 17,
          instruction: "Complétez les phrases avec le pronom y ou en.",
          vi: "Điền đại từ y hoặc en.",
          type: "fill",
          bank: ["y", "en"],
          items: [
            { q: "Ma sœur va tous les ans en Croatie. Elle ___ retourne encore cette année.", answer: "y", example: true },
            { q: "Adrien va bientôt rentrer de Montpellier, il ___ est parti à 15 heures.", answer: "en" },
            { q: "Cathy a visité une ferme. Elle ___ a acheté du fromage.", answer: "y" },
            { q: "Je pars de Nice. J'___ pars très contente, c'était génial !", answer: "en" },
            { q: "On revient de notre chalet. C'était difficile d'___ repartir, on était tellement bien !", answer: "en" },
            { q: "Laure adore aller dans ce pays. Elle veut s'___ installer.", answer: "y" },
          ],
        },
        {
          // Le corrigé imprimé donne « en » pour d, alors que la question
          // transcrite (« Ton père est parti à l'aéroport ? ») suggère plutôt
          // « y ». Incohérence signalée dans la source, non résolue ici —
          // réponse reprise telle quelle du corrigé p. 156.
          num: 3, page: 17, audioSrc: piste(14),
          instruction: "Écoutez et complétez les réponses comme dans l'exemple.",
          vi: "Nghe câu hỏi rồi hoàn thành câu trả lời bằng y/en (như ví dụ). Lưu ý: câu d có một mâu thuẫn nhỏ trong sách gốc — đáp án giữ nguyên theo corrigé in sẵn.",
          type: "fill",
          items: [
            { q: "Réponse a (exemple)", answer: "nous y allons souvent", example: true },
            { q: "Réponse b", answer: "il en est revenu" },
            { q: "Réponse c", answer: "elle n'y est pas" },
            { q: "Réponse d", answer: "il en est parti" },
            { q: "Réponse e", answer: "je n'y suis pas allé(e)" },
            { q: "Réponse f", answer: "ils n'en sont pas rentrés" },
            { q: "Réponse g", answer: "elles y sont toujours" },
          ],
        },
        {
          num: 4, page: 17,
          instruction: "Complétez la carte postale avec les pronoms y ou en.",
          vi: "Điền y hoặc en vào tấm bưu thiếp.",
          type: "fill",
          bank: ["y", "en"],
          items: [
            { q: "Je t'envoie un bisou de La Rochelle. J'___ suis avec mes amis.", answer: "y", example: true },
            { q: "Nous ___ avons fait du vélo, c'était super !", answer: "y" },
            { q: "Nous sommes partis de là-bas le soir. Nous ___ sommes revenus fatigués, mais heureux.", answer: "en" },
            { q: "Hier, on est allés chez mes amis à Rochefort. On ___ a passé un très bon moment.", answer: "y" },
            { q: "On est rentrés tard de chez eux : nous ___ sommes partis à minuit !", answer: "en" },
            { q: "Demain, on retourne à Paris. Je dois ___ être lundi, je reprends le travail.", answer: "y" },
          ],
        },
      ],

      // p2 — La place de l'adjectif (cahier p. 19)
      p2: [
        {
          // Comme pour p0/num1, seul le corrigé (avant/après le nom par cas)
          // est imprimé — les phrases individuelles ne sont pas retranscrites.
          num: 1, page: 19, audioSrc: piste(16),
          instruction: "Écoutez et cochez : l'adjectif est-il placé avant ou après le nom ?",
          vi: "Nghe từng câu (a→g) và cho biết tính từ đứng trước hay sau danh từ.",
          type: "choice",
          items: [
            { q: "a. (exemple)", options: ["avant le nom", "après le nom"], answer: "après le nom", example: true },
            { q: "b.", options: ["avant le nom", "après le nom"], answer: "avant le nom" },
            { q: "c.", options: ["avant le nom", "après le nom"], answer: "après le nom" },
            { q: "d.", options: ["avant le nom", "après le nom"], answer: "après le nom" },
            { q: "e.", options: ["avant le nom", "après le nom"], answer: "avant le nom" },
            { q: "f.", options: ["avant le nom", "après le nom"], answer: "après le nom" },
            { q: "g.", options: ["avant le nom", "après le nom"], answer: "avant le nom" },
          ],
        },
        {
          num: 2, page: 19,
          instruction: "Remettez les mots dans l'ordre.",
          vi: "Sắp xếp lại các từ thành câu đúng.",
          type: "order",
          items: [
            { tokens: ["chaud", "un", "vêtement"], answer: "un vêtement chaud", example: true },
            { tokens: ["touristes", "des", "japonais"], answer: "des touristes japonais" },
            { tokens: ["souvenir", "inoubliable", "un"], answer: "un souvenir inoubliable" },
            { tokens: ["une", "fraîcheur", "grande"], answer: "une grande fraîcheur" },
            { tokens: ["vieux", "un", "port"], answer: "un vieux port" },
            { tokens: ["des", "spéciaux", "moments"], answer: "des moments spéciaux" },
            { tokens: ["gros", "un", "bateau"], answer: "un gros bateau" },
          ],
        },
        {
          num: 3, page: 19,
          instruction: "Placez les adjectifs entre parenthèses dans les phrases.",
          vi: "Đặt tính từ trong ngoặc vào đúng vị trí trong câu.",
          type: "transform",
          items: [
            { q: "On a mangé un plat. (hongrois/bon)", answer: "On a mangé un bon plat hongrois.", example: true },
            { q: "Regarde ce ciel ! (beau/bleu)", answer: "Regarde ce beau ciel bleu." },
            { q: "Nous avons visité des villages. (corses/jolis)", answer: "Nous avons visité de jolis villages corses." },
            { q: "J'ai vu des bâtiments. (modernes/grands)", answer: "J'ai vu de grands bâtiments modernes." },
            { q: "Il nous a offert un souvenir. (petit/original)", answer: "Il nous a offert un petit souvenir original." },
            { q: "C'est une fête. (traditionnelle/grande)", answer: "C'est une grande fête traditionnelle." },
            { q: "Je préfère acheter des produits. (locaux/bons)", answer: "Je préfère acheter de bons produits locaux." },
          ],
        },
        {
          num: 4, page: 19,
          instruction: "Complétez les réponses avec l'adjectif entre parenthèses. Attention aux accords et à la place des adjectifs.",
          vi: "Hoàn thành câu trả lời với tính từ trong ngoặc — chú ý hợp giống–số và vị trí.",
          type: "transform",
          items: [
            { q: "Tu as acheté des cadeaux ? (petit)", answer: "Oui, j'ai acheté de petits cadeaux.", example: true },
            { q: "Vous vous souvenez de ces moments ? (incroyable)", answer: "Oui, on se souvient de ces moments incroyables." },
            { q: "Tu es content de cette expérience ? (fantastique)", answer: "Oui, je suis contente d'une expérience fantastique." },
            { q: "Quelle cuisine tu préfères ? (italien)", answer: "Je préfère la cuisine italienne." },
            { q: "Tu as des chaussures de randonnée ? (bon)", answer: "Oui, j'ai de bonnes chaussures de randonnée." },
            { q: "Vous allez louer un chalet ? (grand)", answer: "Oui, nous allons louer un grand chalet." },
            { q: "Tu connais cette île ? (magique)", answer: "Oui, je connais une île magique." },
          ],
        },
      ],
    },

    // ── Phonie-graphie (cahier p. 20) — wired into the Phono step ─────
    // Les 4 sous-exercices de la page sont Discrimination / Articulation /
    // Graphies / Interprétation. Comme pour l'unité 1, seule la discrimination
    // se prête à une correction automatique ; Articulation et Interprétation
    // sont des exercices de répétition/lecture à voix haute sans réponse à
    // vérifier (même choix que cahier_unite_1 : ces deux-là ne sont pas
    // repris ici). Graphies (act. 3, marquage des liaisons ‿ sur un texte
    // continu) n'est pas non plus repris : le corrigé source signale que la
    // position exacte des liaisons n'est pas fiablement lisible sur le scan,
    // donc il n'y a pas de réponse texte exploitable pour ce format.
    phono: [
      {
        num: 1, page: 20, audioSrc: piste(17),
        instruction: "Discrimination — écoutez et dites combien de fois vous entendez [n], [z] ou [t] dans chaque phrase.",
        vi: "Nghe và đếm số lần xuất hiện của liên kết [n] (như « un ami »), [z] (như « des amis ») và [t] (như « petit ami ») trong mỗi câu.",
        type: "choice",
        items: [
          { q: "a. (exemple) — combien de [n] ?", options: ["0", "1", "2"], answer: "1", example: true },
          { q: "a. (exemple) — combien de [z] ?", options: ["0", "1", "2"], answer: "2", example: true },
          { q: "a. (exemple) — combien de [t] ?", options: ["0", "1", "2"], answer: "1", example: true },
          { q: "b. — combien de [n] ?", options: ["0", "1", "2"], answer: "1" },
          { q: "b. — combien de [z] ?", options: ["0", "1", "2"], answer: "1" },
          { q: "b. — combien de [t] ?", options: ["0", "1", "2"], answer: "1" },
          { q: "c. — combien de [n] ?", options: ["0", "1", "2"], answer: "0" },
          { q: "c. — combien de [z] ?", options: ["0", "1", "2"], answer: "1" },
          { q: "c. — combien de [t] ?", options: ["0", "1", "2"], answer: "2" },
          { q: "d. — combien de [n] ?", options: ["0", "1", "2"], answer: "1" },
          { q: "d. — combien de [z] ?", options: ["0", "1", "2"], answer: "2" },
          { q: "d. — combien de [t] ?", options: ["0", "1", "2"], answer: "1" },
          { q: "e. — combien de [n] ?", options: ["0", "1", "2"], answer: "1" },
          { q: "e. — combien de [z] ?", options: ["0", "1", "2"], answer: "1" },
          { q: "e. — combien de [t] ?", options: ["0", "1", "2"], answer: "1" },
        ],
      },
    ],

    // ── Vocabulaire, keyed by the cycle's vocab step ──────────────────
    vocab: {
      // Cycle 1 — Le souvenir (cahier p. 16)
      c1_vocab: [
        {
          num: 1, page: 16,
          instruction: "Associez les phrases aux images correspondantes (indiquez le numéro de l'image).",
          vi: "Nối câu với số ảnh tương ứng.",
          type: "fill",
          items: [
            { q: "Tu vois, c'est là-bas.", answer: "1", example: true },
            { q: "Le chant des oiseaux le matin, j'adore !", answer: "4" },
            { q: "Ça sent mauvais !", answer: "5" },
            { q: "Je te tiens la main.", answer: "6" },
            { q: "On aime regarder des albums photos.", answer: "3" },
            { q: "Ça n'a pas bon goût.", answer: "2" },
          ],
        },
        {
          num: 2, page: 16,
          instruction: "Entourez le mot ou l'expression correct.",
          vi: "Chọn từ hoặc cụm từ đúng.",
          type: "choice",
          items: [
            { q: "Le chant des oiseaux, c'est un ___ agréable.", options: ["bruit", "goût"], answer: "bruit", example: true },
            { q: "J'aime ___ l'odeur du pain frais.", options: ["sentir", "voir"], answer: "sentir" },
            { q: "Elle regarde l'album photo pour ___.", options: ["oublier son enfance", "replonger dans son enfance"], answer: "replonger dans son enfance" },
            { q: "On ne veut pas se rappeler un ___.", options: ["souvenir heureux", "mauvais souvenir"], answer: "mauvais souvenir" },
            { q: "Avant, on avait une grande maison avec une jolie ___ sur la mer.", options: ["vue", "saveur"], answer: "vue" },
            { q: "J'ai adoré ma fête d'anniversaire, c'est un souvenir ___.", options: ["difficile", "inoubliable"], answer: "inoubliable" },
            { q: "J'aime ce parfum, ça sent ___.", options: ["bon", "mauvais"], answer: "bon" },
          ],
        },
        {
          num: 3, page: 16,
          instruction: "Complétez le texte avec les mots et expressions suivants : saveurs – souvenirs heureux – sentir – regarde – raconte – goûter.",
          vi: "Điền từ vào đoạn văn.",
          type: "fill",
          bank: ["saveurs", "souvenirs heureux", "sentir", "regarde", "raconte", "goûter"],
          items: [
            { q: "On ___ souvent les vieilles photos de famille avec ma mère.", answer: "regarde", example: true },
            { q: "Elle me ___ toujours plein de ……", answer: "raconte" },
            { q: "… plein de ___ . Ça me plaît.", answer: "souvenirs heureux" },
            { q: "Elle aimait ___ les bonnes odeurs,", answer: "sentir" },
            { q: "……, ___ les plats qu'elles cuisinaient ensemble.", answer: "goûter" },
            { q: "Elle se souvient de toutes ces ___, comme si c'était hier.", answer: "saveurs" },
          ],
        },
        {
          num: 4, page: 16, audioSrc: piste(13),
          instruction: "Écoutez et associez chaque phrase à un souvenir.",
          vi: "Nghe và nối mỗi câu với một loại kỷ niệm.",
          type: "fill",
          items: [
            { q: "Souvenir d'adolescence → quelle phrase ?", answer: "a", example: true },
            { q: "Souvenir de vacances → quelle phrase ?", answer: "e" },
            { q: "Souvenir d'enfance → quelle phrase ?", answer: "b" },
            { q: "Souvenir de famille → quelle phrase ?", answer: "d" },
            { q: "Souvenir de jeunesse → quelle phrase ?", answer: "f" },
            { q: "Souvenir d'école → quelle phrase ?", answer: "c" },
          ],
        },
      ],

      // Cycle 2 — Les paysages et la météo (cahier p. 18)
      c2_vocab: [
        {
          num: 1, page: 18,
          instruction: "Classez les mots et expressions suivants : une île – une prairie – un chalet – une mouette – un sommet – un port – une ferme.",
          vi: "Xếp các từ vào đúng nhóm: biển / núi / nông thôn.",
          type: "match",
          pairs: [
            { l: "une île (exemple)", r: "La mer" },
            { l: "une mouette",        r: "La mer" },
            { l: "un port",            r: "La mer" },
            { l: "un chalet",          r: "La montagne" },
            { l: "un sommet",          r: "La montagne" },
            { l: "une ferme",          r: "La campagne" },
            { l: "une prairie",        r: "La campagne" },
          ],
        },
        {
          num: 2, page: 18,
          instruction: "Lisez et associez les phrases aux images (indiquez le numéro de l'image).",
          vi: "Đọc và nối câu với số ảnh tương ứng.",
          type: "fill",
          items: [
            { q: "On a passé nos vacances au bord d'un lac.", answer: "5", example: true },
            { q: "Le ciel est tout gris, il va y avoir un orage.", answer: "3" },
            { q: "Aujourd'hui, il y a beaucoup de vent.", answer: "6" },
            { q: "Derrière la ferme, il y a ce très beau champ.", answer: "1" },
            { q: "Sur cette côte, il y a beaucoup de dunes.", answer: "4" },
            { q: "Cette barrière de corail est magnifique.", answer: "2" },
          ],
        },
        {
          num: 3, page: 18,
          instruction: "Répondez par vrai ou faux.",
          vi: "Đúng hay sai?",
          type: "truefalse",
          items: [
            { q: "Quand la mer avance sur la plage, c'est la marée haute.", answer: true, example: true },
            { q: "Quand il fait froid, on parle de chaleur.", answer: false },
            { q: "Un agriculteur habite et travaille dans une ferme.", answer: true },
            { q: "Le sommet est le point le plus haut d'une montagne.", answer: true },
            { q: "Quand il y a du soleil, le ciel est gris.", answer: false },
            { q: "On peut voir des animaux manger dans une prairie.", answer: true },
            { q: "Quand on habite sur la côte, on est loin de la mer.", answer: false },
          ],
        },
        {
          num: 4, page: 18, audioSrc: piste(15),
          instruction: "Écoutez et associez les dialogues aux situations (indiquez le numéro du dialogue).",
          vi: "Nghe và nối mỗi tình huống với số đoạn hội thoại tương ứng.",
          type: "fill",
          items: [
            { q: "C'est la canicule. → quel dialogue ?", answer: "1", example: true },
            { q: "Le temps est gris. → quel dialogue ?", answer: "5" },
            { q: "C'est la marée basse. → quel dialogue ?", answer: "2" },
            { q: "À la plage, c'est agréable. → quel dialogue ?", answer: "4" },
            { q: "C'est un climat différent. → quel dialogue ?", answer: "6" },
            { q: "C'est un temps sec. → quel dialogue ?", answer: "3" },
          ],
        },
      ],
    },

    // ── Bilan linguistique (cahier p. 22-23, noté /40) ──────────────
    // Wired into the "L'essentiel" step, alongside the AI-generated quiz.
    // Comme pour b1, la compréhension écrite de la page 21 (texte + vrai/faux
    // + QCM + vocabulaire) et les mini-jeux corrigeables de la page 26 sont
    // repris ici aussi (même traitement que le num7-9 « Abd Al Malik » /
    // « Barrez l'intrus » de b1). Le jeu de rôle libre de la page 21 et les
    // jeux 1 et 3 de la page 26 (brainstorm en groupe, mots cachés à
    // découper) n'ont pas de réponse à vérifier et ne sont pas repris.
    bilan: [
      {
        num: 1, page: 22,
        instruction: "Conjuguez les verbes entre parenthèses à l'imparfait. (/7)",
        vi: "Chia động từ trong ngoặc ở imparfait.",
        type: "fill",
        items: [
          { q: "À cette époque, nous (habiter) ___ près d'un lac.", answer: "habitions" },
          { q: "On (se déplacer) ___ beaucoup à vélo.", answer: "se déplaçait" },
          { q: "Nos enfants (aller) ___ à l'école près de la maison.", answer: "allaient" },
          { q: "Tu (faire) ___ une randonnée tous les week-ends.", answer: "faisais" },
          { q: "Je (voyager) ___ souvent.", answer: "voyageais" },
          { q: "Elle (commencer) ___ à comprendre le français.", answer: "commençait" },
          { q: "Nous (écrire) ___ des poèmes ensemble.", answer: "écrivions" },
        ],
      },
      {
        num: 2, page: 22,
        instruction: "Transformez les phrases en remplaçant les éléments soulignés par y ou en. (/7)",
        vi: "Thay thành phần được gạch chân bằng y hoặc en.",
        type: "transform",
        items: [
          { q: "Je n'étais pas heureuse dans cette école.", answer: "Je n'y étais pas heureuse." },
          { q: "Nous sommes partis de Lyon à 13 heures.", answer: "Nous en sommes partis à 13 heures." },
          { q: "À quelle heure tu vas à la plage ?", answer: "À quelle heure tu y vas ?" },
          { q: "Elle est descendue rapidement de l'avion.", answer: "Elle en est descendue rapidement." },
          { q: "Tu ne passes pas beaucoup de temps dans l'eau.", answer: "Tu n'y passes pas beaucoup de temps." },
          { q: "Vous vous promenez souvent sur le port ?", answer: "Vous vous y promenez souvent ?" },
          { q: "Quand est-ce que tu repars de la ville ?", answer: "Quand est-ce que tu en repars ?" },
        ],
      },
      {
        num: 3, page: 22,
        instruction: "Accordez et placez les adjectifs entre parenthèses dans les phrases. (/6)",
        vi: "Hợp giống–số và đặt tính từ trong ngoặc vào đúng vị trí.",
        type: "transform",
        items: [
          { q: "Nous avons créé une affiche. (nouveau)", answer: "Nous avons créé une nouvelle affiche." },
          { q: "J'ai acheté des espadrilles au Maroc. (confortable)", answer: "J'ai acheté des espadrilles confortables au Maroc." },
          { q: "Ce plat a un goût. (fort)", answer: "Ce plat a un goût fort." },
          { q: "C'est une odeur. (insupportable)", answer: "C'est une odeur insupportable." },
          { q: "Je me rappelle toutes ces saveurs. (incroyable)", answer: "Je me rappelle de toutes ces saveurs incroyables." },
          { q: "Tu as rencontré beaucoup d'étudiants. (étranger)", answer: "Tu as rencontré beaucoup d'étudiants étrangers." },
        ],
      },
      {
        num: 4, page: 23,
        instruction: "Vocabulaire — Associez les débuts et les fins de phrases. (/5)",
        vi: "Nối đầu câu với cuối câu.",
        type: "match",
        pairs: [
          { l: "C'est un mauvais souvenir,",       r: "je veux oublier ce moment." },
          { l: "Je n'aime pas cette odeur,",        r: "ça sent mauvais." },
          { l: "Le matin, on allait à l'école avec ma sœur,", r: "je lui tenais souvent la main." },
          { l: "Je regarde mes photos d'enfance,",  r: "je replonge dans mon enfance." },
          { l: "Par ma fenêtre, je vois les montagnes,", r: "c'est une jolie vue." },
        ],
      },
      {
        num: 5, page: 23,
        instruction: "Complétez les phrases avec les mots suivants : bruit – jeunesse – goûter – joyeux – sent. (/5)",
        vi: "Điền từ vào chỗ trống.",
        type: "fill",
        bank: ["bruit", "jeunesse", "goûter", "joyeux", "sent"],
        items: [
          { q: "J'ai fait un gâteau, tu veux ___ ?", answer: "goûter" },
          { q: "Le chant des oiseaux est un ___ agréable.", answer: "bruit" },
          { q: "À cette époque, j'avais 25 ans, j'ai beaucoup de souvenirs de ___ .", answer: "jeunesse" },
          { q: "J'adore son parfum, il ___ très bon.", answer: "sent" },
          { q: "On a beaucoup ri ensemble, on a beaucoup de souvenirs ___ .", answer: "joyeux" },
        ],
      },
      {
        num: 6, page: 23,
        instruction: "Entourez la réponse correcte. (/5)",
        vi: "Chọn đáp án đúng.",
        type: "choice",
        items: [
          { q: "Il n'y a pas de soleil, le ciel est ___.", options: ["bleu", "gris"], answer: "gris" },
          { q: "On annonce encore de la pluie pour ce week-end, le temps est ___.", options: ["sec", "humide"], answer: "humide" },
          { q: "Pendant notre randonnée, on s'est baigné dans un ___ de montagne.", options: ["lac", "champ"], answer: "lac" },
          { q: "Il y a des ___ de sable sur cette plage.", options: ["dunes", "prairies"], answer: "dunes" },
          { q: "Il a fait plus de 40 degrés, c'était ___.", options: ["la canicule", "l'orage"], answer: "la canicule" },
        ],
      },
      {
        num: 7, page: 23,
        instruction: "Remplacez les images par les mots correspondants. (/5)",
        vi: "Thay hình ảnh bằng từ tương ứng.",
        type: "fill",
        items: [
          { q: "Nous passions tous les hivers dans notre …… (image : un chalet)", answer: "chalet" },
          { q: "L'été dernier, j'ai travaillé dans une …… (image : une ferme)", answer: "ferme" },
          { q: "Nous sommes montés jusqu'au …… (image : un sommet)", answer: "sommet" },
          { q: "Regarde cette jolie …… (image : une prairie)", answer: "prairie" },
          { q: "Nous nous promenions souvent sur le …… (image : un port)", answer: "port" },
        ],
      },
      {
        // Page 21 — Compréhension écrite : « La Commode aux tiroirs de
        // couleurs », Olivia Ruiz, 2020.
        num: 8, page: 21,
        instruction: "Compréhension écrite — « La Commode aux tiroirs de couleurs » — Vrai ou faux ?",
        vi: "Đọc đoạn trích của Olivia Ruiz rồi trả lời Đúng/Sai.",
        type: "truefalse",
        items: [
          { q: "L'écrivaine raconte un souvenir d'école.", answer: false },
          { q: "Elle aimait faire les courses et parler français aux commerçants.", answer: true },
        ],
      },
      {
        num: 9, page: 21,
        instruction: "Compréhension écrite — Cochez la bonne réponse.",
        vi: "Chọn đáp án đúng dựa trên đoạn trích.",
        type: "choice",
        items: [
          { q: "Quand elle parlait français, elle :", options: ["avait un accent espagnol", "n'avait pas d'accent espagnol"], answer: "n'avait pas d'accent espagnol" },
          { q: "André était :", options: ["français", "espagnol"], answer: "français" },
          { q: "Il habitait :", options: ["dans la même rue", "en face de l'immeuble"], answer: "dans la même rue" },
          { q: "Il savait très bien :", options: ["coudre", "cuisiner"], answer: "coudre" },
        ],
      },
      {
        num: 10, page: 21,
        instruction: "De quoi parlent l'écrivaine et André ?",
        vi: "Hai người nói chuyện về đề tài gì?",
        type: "fill",
        items: [
          { q: "De quoi parlent-ils ?", answer: "Ils parlent de l'Espagne." },
        ],
      },
      {
        num: 11, page: 21,
        instruction: "Vocabulaire — Cochez la bonne signification.",
        vi: "Chọn đúng nghĩa của cụm từ.",
        type: "choice",
        items: [
          { q: "« Ces moments étaient un bol d'air. »", options: ["Ces moments sortaient de la vie ordinaire et c'était agréable.", "Ces moments étaient fatigants."], answer: "Ces moments sortaient de la vie ordinaire et c'était agréable." },
          { q: "« Il regardait les femmes à l'œuvre. »", options: ["Il regardait les femmes travailler.", "Il regardait un tableau."], answer: "Il regardait les femmes travailler." },
          { q: "« Ma place prenait une autre tournure. »", options: ["Ma place changeait.", "Ma place disparaissait."], answer: "Ma place changeait." },
        ],
      },
      {
        // Page 26 — Jeux, act. 2 : correspondance symbole → verbe non
        // entièrement lisible sur le scan source ; réponses reprises fidèlement
        // dans l'ordre d'apparition des blancs, sans reconstruction indépendante.
        num: 12, page: 26,
        instruction: "Jeux — Remplacez les symboles par les verbes correspondants et conjuguez-les à l'imparfait.",
        vi: "Thay các ký hiệu bằng động từ phù hợp rồi chia ở imparfait (thứ tự chỗ trống trong bài).",
        type: "fill",
        bank: ["se sentir", "se réveiller", "être", "préparer", "avoir", "descendre", "s'installer", "dire", "boire", "commencer"],
        items: [
          { q: "Tous les dimanches matin, je [♥] ___ avec l'odeur des crêpes", answer: "me réveillais", example: true },
          { q: "que mon père [♦] ___ dans la cuisine.", answer: "était" },
          { q: "Mon frère et moi, nous y [■] ___, encore en pyjama.", answer: "descendions" },
          { q: "On [★] ___ un rapide bonjour à nos parents,", answer: "disait" },
          { q: "on [★] ___ à table", answer: "s'installait" },
          { q: "et on [❖] ___ à manger.", answer: "commençait" },
          { q: "Mes parents [❖] ___ leur café au lait,", answer: "buvaient" },
          { q: "nous, on [▲] ___ notre chocolat chaud.", answer: "avait" },
          { q: "Ces moments [♦] ___ très simples", answer: "étaient" },
          { q: "mais on [✳] ___ heureux.", answer: "se sentait" },
        ],
      },
      {
        num: 13, page: 26,
        instruction: "Jeux — Qui suis-je ?",
        vi: "Tôi là ai?",
        type: "fill",
        items: [
          { q: "Je suis blanche, j'aime la mer et les poissons.", answer: "une mouette", example: true },
          { q: "Je vois la mer de tous les côtés.", answer: "une île" },
          { q: "Je me lève le matin et je me couche le soir.", answer: "le soleil" },
          { q: "Je suis la frontière entre la mer et la terre.", answer: "la côte" },
          { q: "Les enfants m'utilisent pour faire un château sur la plage.", answer: "le sable" },
        ],
      },
    ],

    // ── DELF A2 blanc (cahier p. 24-25) ────────────────────────────
    // Le livre n'a pas de page « Préparation au DELF » propre à l'Unité 2
    // (contrairement aux unités 1 et 3) — aucun coLivre pour cette unité.
    delf: {
      co: [
        {
          num: 1, page: 24, audioSrc: piste(21),
          instruction: "Compréhension de l'oral — vous écoutez trois annonces radio. (6 points)",
          vi: "Nghe 3 thông báo radio rồi chọn đáp án đúng.",
          type: "choice",
          items: [
            { q: "1. Ce week-end, la médiathèque propose…", options: ["de lire des BD", "de voir des artistes", "d'écrire ses souvenirs"], answer: "d'écrire ses souvenirs" },
            { q: "2. Pour participer, il faut…", options: ["s'inscrire en ligne", "téléphoner", "se présenter à l'accueil"], answer: "s'inscrire en ligne" },
            { q: "3. Le thème de l'émission est…", options: ["la santé", "le travail", "les congés"], answer: "les congés" },
            { q: "4. Pour témoigner, vous devez…", options: ["téléphoner", "écrire un mail", "envoyer un sms"], answer: "téléphoner" },
            { q: "5. Vous allez prendre des photos de…", options: ["nature", "maison", "nourriture"], answer: "nourriture" },
            { q: "6. Vous pouvez gagner…", options: ["de l'argent", "un petit-déjeuner", "des magazines"], answer: "des magazines" },
          ],
        },
      ],
      // Compréhension des écrits — lettre de l'association « Les amoureux de
      // la Bretagne » (anniversaire des 10 ans de l'association, le 7 juin).
      // Le texte de la lettre elle-même n'est pas reproduit dans le corrigé
      // source, seulement les questions et réponses — items ci-dessous.
      ce: [
        {
          num: 2, page: 24,
          instruction: "Compréhension des écrits — Lettre de l'association « Les amoureux de la Bretagne ». (6 points)",
          vi: "Đọc thư mời của hội « Les amoureux de la Bretagne » (kỷ niệm 10 năm, ngày 7 tháng 6) rồi chọn đáp án đúng.",
          type: "choice",
          items: [
            { q: "1. Vous êtes invité pour fêter…", options: ["un mariage", "une naissance", "un anniversaire"], answer: "un anniversaire" },
            { q: "2. Quelle activité est proposée aux enfants ?", options: ["des crayons de couleur", "des crêpes", "des jouets de plage"], answer: "des crêpes" },
            { q: "3. L'exposition a pour thème…", options: ["les animaux", "les paysages de la région", "les plats typiques"], answer: "les paysages de la région" },
            { q: "4. Que recevra le gagnant ?", options: ["des billets", "un trophée", "un poisson rouge"], answer: "des billets" },
            { q: "5. L'association a besoin d'aide pour…", options: ["la cuisine", "la décoration", "le rangement"], answer: "le rangement" },
            { q: "6. Pour vous inscrire, vous devez…", options: ["aller sur place", "téléphoner à Aude", "envoyer un message"], answer: "envoyer un message" },
          ],
        },
      ],
      // Production — no auto-grading; the cahier's model answer is the yardstick.
      production: [
        {
          skill: "Production écrite", points: "12,5 points", page: 25,
          prompt: "Vous avez reçu ce courriel de votre amie belge Ève : « Coucou, Je t'invite pour mon anniversaire le week-end prochain à Arcachon ! J'ai loué une petite maison pour 15 personnes, ça va être génial ! Tu peux m'aider pour préparer les repas ? Je suis nulle en cuisine ! À bientôt, Ève » Vous répondez à Ève. Vous acceptez son invitation, vous posez des questions sur l'organisation et vous lui proposez quelques idées de repas. (60 mots minimum)",
          vi: "Viết thư trả lời Ève: nhận lời mời sinh nhật, hỏi thêm về tổ chức, gợi ý vài món ăn. (tối thiểu 60 từ)",
          model: "Salut Ève, Merci pour l'invitation. Oui, je viens à ton anniversaire, ça va être super ! Je peux venir avec une amie ? Elle s'appelle Salomé, elle est très sympa. J'adore cuisiner alors je vais t'aider. Pour le dîner, nous pouvons préparer de grandes salades à partager ou faire des crêpes. J'apporte ma recette de gâteau au chocolat pour le dessert ! À samedi ! Diane",
        },
        {
          skill: "Production orale", points: "3 à 4 minutes", page: 25,
          prompt: "Partie 3 de l'épreuve : exercice en interaction. Sujet : Souvenirs de vacances. Vous êtes en vacances à Montpellier, dans le sud de la France. Vous voulez acheter des souvenirs pour vos amis et votre famille. Vous êtes dans un magasin, vous demandez des conseils au vendeur et vous vous renseignez sur les prix. (L'examinateur joue le rôle du vendeur.)",
          vi: "Đóng vai: bạn đang đi mua quà lưu niệm ở Montpellier, hỏi người bán tư vấn và hỏi giá. (giám khảo đóng vai người bán hàng)",
          model: "– Bonjour madame. – Bonjour. – Je voudrais acheter un souvenir de Montpellier pour mon père. Vous pouvez me conseiller ? Il adore lire et il aime beaucoup l'architecture. – Oui, bien sûr. Il y a un livre sur les plus beaux monuments de la ville avec de très belles photos. Il y a aussi un magazine sur l'histoire de l'architecture dans le sud de la France. – Je préfère le livre avec les photos. Quel est le prix s'il vous plaît ? – Il est à 29,99 euros. – Je vais le prendre, merci. Je cherche aussi un petit souvenir pour mon neveu, il a 7 ans. Il adore jouer bien sûr et il aime beaucoup les animaux. – Pour un enfant je vous conseille ce puzzle avec des bateaux, il plaît beaucoup aux petits. Nous avons aussi un livre de coloriages sur les animaux de la mer. – Vous avez un puzzle avec des animaux ? – Oui, j'ai un puzzle avec des éléphants mais ce ne sont pas des animaux de Montpellier ! – Ah d'accord. Alors je ne prends pas le puzzle mais je prends le livre de coloriage sur les animaux. Il coûte combien ? – Il est à 7 euros. – D'accord, merci. Pour ma meilleure amie, je cherche un tee-shirt ou une robe. Vous vendez aussi des habits ? – J'ai seulement des tee-shirts avec le nom de la ville dessus. – Vous avez un tee-shirt de couleur jaune ? C'est sa couleur préférée. – Non, désolée. Je n'ai que du blanc, du rouge et du bleu. – Dommage. Alors je vais prendre le tee-shirt rouge. Est-ce que vous avez la taille M pour ce modèle ? – Ah non, désolée. Il reste seulement les tailles S et L. – Alors je ne prends pas de tee-shirt. Ce n'est pas grave. – D'accord. Vous voulez des paquets cadeaux pour les deux livres ? – Oui, s'il vous plaît. – D'accord. Le total est à 51,14 euros s'il vous plaît. – Très bien. Je peux payer par carte ? – Oui, c'est possible. – Merci beaucoup. Bonne journée. – À vous aussi, au revoir.",
        },
      ],
    },
  },

  b3: {
    // DELF A2 blanc (livre p. 54) — no cahier data built yet for this unit,
    // so only the livre's own DELF prep listening is included here (same
    // pattern as b1.delf.coLivre).
    delf: {
      coLivre: [
        {
          num: 1, page: 54,
          audioSrc: "https://bameomap.github.io/francais-vivi/031_Edito_A2_Livre.mp3",
          instruction: "Livre p.54, Exercice 3 — vous écoutez un message téléphonique. (6 points)",
          vi: "Nghe tin nhắn thoại của Manon Ladier rồi trả lời 6 câu hỏi.",
          type: "choice",
          transcript: "Bonjour, c'est Manon Ladier. Je vous appelle parce qu'on a des questions pour la location de l'appartement rue Lamartine. Il est à quel étage ? Ce n'est pas écrit dans l'annonce. Et est-ce qu'il y a déjà un lave-linge dans l'appartement ? Parce qu'on n'a pas de machine à laver. Et la troisième chose, c'est... est-ce qu'il y a un parc ou des espaces verts dans le quartier ? Voilà, c'est tout. Ah non, on voudrait faire la visite jeudi à 15 h si c'est possible pour vous. Rappelez-moi quand vous pouvez au 06 09 92 66 65. Merci !",
          items: [
            { q: "1. Que souhaite Manon Ladier ?", options: ["Louer une maison.", "Louer un appartement.", "Acheter un appartement."], answer: "Louer un appartement." },
            { q: "2. Sa première question porte sur :", options: ["le prix.", "la superficie.", "l'étage."], answer: "l'étage." },
            { q: "3. Elle demande s'il y a déjà :", options: ["une machine à laver.", "une machine à café.", "une lampe."], answer: "une machine à laver." },
            { q: "4. Qu'est-ce qu'elle voudrait dans le quartier ?", options: ["Un cinéma.", "Une piscine.", "Un parc ou un espace vert."], answer: "Un parc ou un espace vert." },
            { q: "5. Quand voudrait-elle faire la visite ?", options: ["Le matin.", "L'après-midi.", "Le soir."], answer: "L'après-midi." },
            { q: "6. Que faut-il faire ?", options: ["La rappeler.", "Attendre son prochain appel.", "Lui envoyer un message."], answer: "La rappeler." },
          ],
        },
        {
          num: 2, page: 54,
          audioSrc: "https://bameomap.github.io/francais-vivi/032_Edito_A2_Livre.mp3",
          instruction: "Livre p.54, Exercice 4 — vous écoutez 4 dialogues informels. Associez chacun à sa situation de communication. (7 points)",
          vi: "Nghe 4 đoạn hội thoại và chọn đúng tình huống giao tiếp cho từng đoạn (6 tình huống có sẵn, chỉ 4 đúng).",
          type: "choice",
          transcript: "Dialogue 1 — La femme : Ça va ? — L'homme : Super ! J'ai trouvé un appartement ! — La femme : Mais c'est génial ! Tu dois être content. — L'homme : Très ! Allez, je t'invite à dîner, on va fêter ça. || Dialogue 2 — L'homme : Bonjour monsieur, je cherche l'hôtel Solvay... — La femme : Il est tout près. Continuez tout droit sur l'avenue. Vous allez le voir vite : c'est un très beau bâtiment. || Dialogue 3 — L'homme : Qu'est-ce que tu fais ? — La femme : Je fixe l'étagère. — L'homme : Tu veux que je t'aide ? — La femme : Ah oui, je veux bien. Merci ! || Dialogue 4 — La femme : Excusez-moi pour le retard. Je n'ai pas fait attention à l'heure. Je suis désolée. — L'homme : Ben maintenant vous êtes là. On commence la visite ?",
          items: [
            { q: "Dialogue 1 (2 points) — quelle situation ?", options: ["Demander/donner un renseignement", "Inviter quelqu'un à dîner", "Présenter quelqu'un", "Proposer de l'aide", "Raconter un souvenir", "S'excuser"], answer: "Inviter quelqu'un à dîner" },
            { q: "Dialogue 2 (2 points) — quelle situation ?", options: ["Demander/donner un renseignement", "Inviter quelqu'un à dîner", "Présenter quelqu'un", "Proposer de l'aide", "Raconter un souvenir", "S'excuser"], answer: "Demander/donner un renseignement" },
            { q: "Dialogue 3 (2 points) — quelle situation ?", options: ["Demander/donner un renseignement", "Inviter quelqu'un à dîner", "Présenter quelqu'un", "Proposer de l'aide", "Raconter un souvenir", "S'excuser"], answer: "Proposer de l'aide" },
            { q: "Dialogue 4 (1 point) — quelle situation ?", options: ["Demander/donner un renseignement", "Inviter quelqu'un à dîner", "Présenter quelqu'un", "Proposer de l'aide", "Raconter un souvenir", "S'excuser"], answer: "S'excuser" },
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
