/**
 * editoVerbsA2.js — Verb drill sets for Édito A2, 2e édition (2022).
 *
 * Same shape as EDITO_A1_VERB_UNITS (editoVerbs.js) so EditoVerbsPanel renders
 * either set through its `units` prop.
 *
 * Why a unit needs this at all: the grammar page can explain the passé composé
 * in one screen, but three things in it can only be memorised —
 *   • whether a verb takes avoir or être,
 *   • the quá khứ phân từ of irregular verbs (né, vécu, devenu, écrit…),
 *   • the agreement that follows être (elle est venue, ils se sont rencontrés).
 * The verb list below therefore mixes both auxiliaries and the pronominals on
 * purpose: choosing the auxiliary *is* the exercise, so a drill that separated
 * them would remove the difficulty it is meant to train.
 *
 * `tenses` carries Présent as well, so the panel's "Chuyển thì" exercise has a
 * source tense to convert from — présent → passé composé is the single most
 * useful transformation at this level.
 */

export const EDITO_A2_VERB_UNITS = [
  {
    unitId: "b1", unitNum: "1",
    title: "Nouvelles vies",
    color: "#7C3AED", bg: "#EDE9FE",
    cefr: "A2",   // đọc trong EditoVerbsPanel để AI ra đề đúng trình độ
    tenses: [
      { id: "present", label: "Présent",
        note: "Ôn lại thì hiện tại — nền để so sánh với passé composé" },
      { id: "passe_compose", label: "Passé composé",
        note: "avoir/être + quá khứ phân từ · nhớ hợp giống-số khi dùng être" },
    ],
    verbs: [
      // — đi với être (chuyển động / thay đổi trạng thái) —
      { infinitive: "naître",       meaning: "sinh ra" },
      { infinitive: "devenir",      meaning: "trở thành" },
      { infinitive: "venir",        meaning: "đến" },
      { infinitive: "revenir",      meaning: "quay lại" },
      { infinitive: "partir",       meaning: "rời đi" },
      { infinitive: "rentrer",      meaning: "về" },
      { infinitive: "arriver",      meaning: "đến nơi" },
      { infinitive: "tomber",       meaning: "ngã, rơi" },
      { infinitive: "rester",       meaning: "ở lại" },
      // — động từ phản thân, cũng đi với être —
      { infinitive: "s'installer",  meaning: "định cư" },
      { infinitive: "se marier",    meaning: "kết hôn" },
      { infinitive: "se séparer",   meaning: "chia tay" },
      { infinitive: "se rencontrer", meaning: "gặp nhau" },
      // — đi với avoir, quá khứ phân từ bất quy tắc —
      { infinitive: "vivre",        meaning: "sống" },
      { infinitive: "faire",        meaning: "làm" },
      { infinitive: "écrire",       meaning: "viết" },
      { infinitive: "obtenir",      meaning: "đạt được" },
      { infinitive: "voir",         meaning: "thấy" },
      { infinitive: "avoir",        meaning: "có" },
      { infinitive: "être",         meaning: "thì, là" },
      // — đi với avoir, có quy tắc —
      { infinitive: "grandir",      meaning: "lớn lên" },
      { infinitive: "rencontrer",   meaning: "gặp ai đó" },
      { infinitive: "déménager",    meaning: "chuyển nhà" },
      { infinitive: "travailler",   meaning: "làm việc" },
      { infinitive: "visiter",      meaning: "tham quan" },
    ],
  },
  {
    unitId: "b2", unitNum: "2",
    title: "Je me souviens",
    color: "#7C3AED", bg: "#EDE9FE",
    cefr: "A2",
    tenses: [
      { id: "present", label: "Présent",
        note: "Gốc imparfait luôn lấy từ “nous” của thì này — ôn lại trước khi chia imparfait" },
      { id: "imparfait", label: "Imparfait",
        note: "Gốc (nous, bỏ -ons) + đuôi -ais/-ais/-ait/-ions/-iez/-aient · chỉ être là ngoại lệ" },
    ],
    verbs: [
      // — être: ngoại lệ duy nhất —
      { infinitive: "être",         meaning: "thì, là (gốc riêng: ét-)" },
      // — -er đều đặn —
      { infinitive: "aimer",        meaning: "yêu, thích" },
      { infinitive: "habiter",      meaning: "sống, cư trú" },
      { infinitive: "changer",      meaning: "thay đổi" },
      { infinitive: "regarder",     meaning: "nhìn, xem" },
      { infinitive: "raconter",     meaning: "kể lại" },
      { infinitive: "adorer",       meaning: "mê, rất thích" },
      { infinitive: "préparer",     meaning: "chuẩn bị, nấu" },
      { infinitive: "voyager",      meaning: "du lịch" },
      { infinitive: "goûter",       meaning: "nếm thử" },
      // — -ir/-re/irrégulier —
      { infinitive: "avoir",        meaning: "có" },
      { infinitive: "aller",        meaning: "đi" },
      { infinitive: "faire",        meaning: "làm" },
      { infinitive: "rendre",       meaning: "trả lại, làm cho (ai thành sao)" },
      { infinitive: "écrire",       meaning: "viết" },
      { infinitive: "prendre",      meaning: "lấy, chụp (ảnh)" },
      { infinitive: "attendre",     meaning: "chờ đợi" },
      { infinitive: "partir",       meaning: "rời đi" },
      { infinitive: "vouloir",      meaning: "muốn" },
      // — phản thân —
      { infinitive: "se déplacer",  meaning: "di chuyển" },
      { infinitive: "se souvenir",  meaning: "nhớ, ghi nhớ" },
      { infinitive: "se rappeler",  meaning: "nhớ lại" },
      { infinitive: "s'amuser",     meaning: "vui chơi" },
      { infinitive: "s'installer",  meaning: "định cư, ổn định chỗ ở" },
    ],
  },
  {
    unitId: "b5", unitNum: "5",
    title: "En route vers le futur !",
    color: "#7B6CF6", bg: "#EDE9FE",
    cefr: "A2",
    tenses: [
      { id: "present", label: "Présent",
        note: "Ôn lại hiện tại — không phải gốc futur (khác imparfait!), chỉ để so sánh" },
      { id: "futur", label: "Futur simple",
        note: "Nguyên thể + đuôi -ai/-as/-a/-ons/-ez/-ont · 12 động từ có gốc bất quy tắc riêng" },
    ],
    verbs: [
      // — bất quy tắc: gốc riêng —
      { infinitive: "avoir",        meaning: "có (gốc: aur-)" },
      { infinitive: "être",         meaning: "thì, là (gốc: ser-)" },
      { infinitive: "faire",        meaning: "làm (gốc: fer-)" },
      { infinitive: "aller",        meaning: "đi (gốc: ir-)" },
      { infinitive: "voir",         meaning: "thấy (gốc: verr-)" },
      { infinitive: "savoir",       meaning: "biết (gốc: saur-)" },
      { infinitive: "devoir",       meaning: "phải (gốc: devr-)" },
      { infinitive: "pouvoir",      meaning: "có thể (gốc: pourr-)" },
      { infinitive: "vouloir",      meaning: "muốn (gốc: voudr-)" },
      { infinitive: "venir",        meaning: "đến (gốc: viendr-)" },
      { infinitive: "devenir",      meaning: "trở thành (gốc: deviendr-)" },
      { infinitive: "envoyer",      meaning: "gửi (gốc: enverr-)" },
      // — đều đặn -er —
      { infinitive: "manger",       meaning: "ăn" },
      { infinitive: "fabriquer",    meaning: "chế tạo" },
      { infinitive: "inventer",     meaning: "phát minh" },
      { infinitive: "télécharger",  meaning: "tải xuống" },
      { infinitive: "contacter",    meaning: "liên hệ" },
      { infinitive: "changer",      meaning: "thay đổi" },
      // — đều đặn -re/-ir —
      { infinitive: "prendre",      meaning: "lấy, dùng" },
      { infinitive: "vivre",        meaning: "sống" },
      { infinitive: "répondre",     meaning: "trả lời" },
      { infinitive: "connaître",    meaning: "biết, quen" },
      { infinitive: "réussir",      meaning: "thành công" },
      { infinitive: "servir",       meaning: "phục vụ" },
    ],
  },
  {
    unitId: "b6", unitNum: "6",
    title: "En cuisine",
    color: "#E8574A", bg: "#FFF0EF",
    cefr: "A2",
    tenses: [
      { id: "present", label: "Présent",
        note: "Gốc của l'impératif lấy trực tiếp từ đây (chỉ bỏ chủ ngữ và, ở tu của -er, bỏ luôn -s)" },
      { id: "imperatif", label: "Impératif",
        note: "Chỉ 3 ngôi (tu/nous/vous), KHÔNG chủ ngữ · phản thân đổi vị trí đại từ ở thể khẳng định" },
    ],
    verbs: [
      // — pronominal: đại từ đổi vị trí ở impératif khẳng định —
      { infinitive: "se laver",     meaning: "rửa, tắm rửa (Lavez-vous les mains !)" },
      { infinitive: "s'asseoir",    meaning: "ngồi xuống (bất quy tắc)" },
      // — bất quy tắc thường gặp trong nội quy/mệnh lệnh —
      { infinitive: "être",         meaning: "thì, là (Soyez prudent !)" },
      { infinitive: "avoir",        meaning: "có (Ayez une bonne hygiène.)" },
      { infinitive: "faire",        meaning: "làm, chú ý (Faites attention !)" },
      { infinitive: "aller",        meaning: "đi" },
      { infinitive: "vendre",       meaning: "bán (il est interdit de vendre)" },
      { infinitive: "laisser",      meaning: "để, cho phép (Ne laissez pas entrer d'animal.)" },
      // — đều đặn -er: gốc của mệnh lệnh cuộc sống bếp núc —
      { infinitive: "préchauffer",  meaning: "làm nóng trước (lò)" },
      { infinitive: "mélanger",     meaning: "trộn" },
      { infinitive: "couper",       meaning: "cắt" },
      { infinitive: "verser",       meaning: "đổ, rót" },
      { infinitive: "ajouter",      meaning: "thêm vào" },
      { infinitive: "décorer",      meaning: "trang trí" },
      { infinitive: "utiliser",     meaning: "sử dụng" },
      { infinitive: "fixer",        meaning: "ấn định (giá, giờ)" },
      { infinitive: "respecter",    meaning: "tuân thủ" },
      // — đều đặn -ir/-re —
      { infinitive: "servir",       meaning: "dọn ra, phục vụ" },
      { infinitive: "sortir",       meaning: "lấy ra, ra khỏi" },
      { infinitive: "attacher",     meaning: "buộc, cột (les cheveux)" },
    ],
  },
  {
    unitId: "b8", unitNum: "8",
    title: "Dans les médias",
    color: "#DB2777", bg: "#FCE7F3",
    cefr: "A2",
    tenses: [
      { id: "present", label: "Présent",
        note: "Ils/elles + présent = gốc của subjonctif cho je/tu/il/on/ils" },
      { id: "subjonctif", label: "Subjonctif présent",
        note: "Gốc = ils/elles présent (bỏ -ent) + -e/-es/-e/-ent · nous/vous = gốc imparfait + -ions/-iez" },
    ],
    verbs: [
      // — bất quy tắc: gốc riêng hoàn toàn —
      { infinitive: "être",         meaning: "thì, là (que je sois, que nous soyons)" },
      { infinitive: "avoir",        meaning: "có (que j'aie, que nous ayons)" },
      { infinitive: "aller",        meaning: "đi (que j'aille, que nous allions)" },
      // — đều đặn -er: gốc = ils informent → que j'informe —
      { infinitive: "informer",     meaning: "thông tin cho, đưa tin" },
      { infinitive: "s'informer",   meaning: "tự cập nhật thông tin" },
      { infinitive: "publier",      meaning: "đăng, xuất bản" },
      { infinitive: "utiliser",     meaning: "sử dụng" },
      { infinitive: "regarder",     meaning: "xem" },
      { infinitive: "écouter",      meaning: "nghe" },
      { infinitive: "poster",       meaning: "đăng (ảnh, video)" },
      { infinitive: "accompagner",  meaning: "đồng hành, hỗ trợ" },
      // — đều đặn -ir/-re, gốc theo présent —
      { infinitive: "s'adapter",    meaning: "thích nghi" },
      { infinitive: "connaître",    meaning: "biết, hiểu" },
      // — đặc biệt ở présent, vẫn theo quy tắc subjonctif —
      { infinitive: "demander",     meaning: "hỏi, yêu cầu" },
    ],
  },
];
