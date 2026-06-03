// Pre-baked conjugation tables for the most common A1 verbs.
// Used by ConjugaisonPanel to answer instantly & offline; falls back to AI
// for other verbs/tenses. Order: je, tu, il/elle, nous, vous, ils/elles.

const PRESENT = {
  être:    { group:"irrégulier", meaning:"thì / là", conjugations:["suis","es","est","sommes","êtes","sont"], tip:"Động từ quan trọng nhất — học thuộc lòng.", example:"Je suis étudiant. — Tôi là sinh viên." },
  avoir:   { group:"irrégulier", meaning:"có", conjugations:["ai","as","a","avons","avez","ont"], tip:"Dùng cho tuổi: J'ai 20 ans.", example:"J'ai un chat. — Tôi có một con mèo." },
  aller:   { group:"irrégulier", meaning:"đi", conjugations:["vais","vas","va","allons","allez","vont"], tip:"Còn dùng cho futur proche: je vais + inf.", example:"Je vais à Paris. — Tôi đi Paris." },
  faire:   { group:"irrégulier", meaning:"làm", conjugations:["fais","fais","fait","faisons","faites","font"], tip:"Lưu ý: vous faites, ils font (bất quy tắc).", example:"Je fais mes devoirs. — Tôi làm bài tập." },
  pouvoir: { group:"irrégulier", meaning:"có thể", conjugations:["peux","peux","peut","pouvons","pouvez","peuvent"], tip:"je/tu peux; theo sau là động từ nguyên thể.", example:"Je peux t'aider. — Tôi có thể giúp bạn." },
  vouloir: { group:"irrégulier", meaning:"muốn", conjugations:["veux","veux","veut","voulons","voulez","veulent"], tip:"Lịch sự hơn: je voudrais.", example:"Je veux un café. — Tôi muốn một ly cà phê." },
  savoir:  { group:"irrégulier", meaning:"biết", conjugations:["sais","sais","sait","savons","savez","savent"], tip:"Biết (thông tin/kỹ năng), khác connaître.", example:"Je sais nager. — Tôi biết bơi." },
  venir:   { group:"irrégulier", meaning:"đến", conjugations:["viens","viens","vient","venons","venez","viennent"], tip:"Passé récent: venir de + inf.", example:"Je viens de Hanoi. — Tôi đến từ Hà Nội." },
  voir:    { group:"irrégulier", meaning:"nhìn / thấy", conjugations:["vois","vois","voit","voyons","voyez","voient"], tip:"nous voyons, vous voyez (y).", example:"Je vois la mer. — Tôi thấy biển." },
  prendre: { group:"irrégulier", meaning:"lấy / dùng", conjugations:["prends","prends","prend","prenons","prenez","prennent"], tip:"ils prennent (2 chữ n).", example:"Je prends le bus. — Tôi đi xe buýt." },
  parler:  { group:"1 (-er)", meaning:"nói", conjugations:["parle","parles","parle","parlons","parlez","parlent"], tip:"Mẫu chuẩn nhóm 1: -e, -es, -e, -ons, -ez, -ent.", example:"Je parle français. — Tôi nói tiếng Pháp." },
  manger:  { group:"1 (-er)", meaning:"ăn", conjugations:["mange","manges","mange","mangeons","mangez","mangent"], tip:"nous mangeons (giữ e để đọc mềm).", example:"Nous mangeons à midi. — Chúng tôi ăn trưa." },
  finir:   { group:"2 (-ir)", meaning:"kết thúc", conjugations:["finis","finis","finit","finissons","finissez","finissent"], tip:"Nhóm 2 thêm -iss ở số nhiều.", example:"Je finis à 18h. — Tôi xong lúc 18 giờ." },
  aimer:   { group:"1 (-er)", meaning:"thích / yêu", conjugations:["aime","aimes","aime","aimons","aimez","aiment"], tip:"J'aime (j' trước nguyên âm).", example:"J'aime le café. — Tôi thích cà phê." },
  dormir:  { group:"3 (-ir)", meaning:"ngủ", conjugations:["dors","dors","dort","dormons","dormez","dorment"], tip:"Bỏ -mir rồi thêm -s,-s,-t ở số ít.", example:"Je dors huit heures. — Tôi ngủ 8 tiếng." },
};

// Past participles + which auxiliary each verb takes (for passé composé).
const PARTICIPLE = {
  être:"été", avoir:"eu", aller:"allé", faire:"fait", pouvoir:"pu", vouloir:"voulu",
  savoir:"su", venir:"venu", voir:"vu", prendre:"pris", parler:"parlé", manger:"mangé",
  finir:"fini", aimer:"aimé", dormir:"dormi",
};
const ETRE_VERBS = new Set(["aller", "venir"]); // of this core set, these use être

const AVOIR_PRES = ["ai", "as", "a", "avons", "avez", "ont"];
const ETRE_PRES  = ["suis", "es", "est", "sommes", "êtes", "sont"];
const ALLER_PRES = ["vais", "vas", "va", "allons", "allez", "vont"];

function buildPasse(verb) {
  const pp = PARTICIPLE[verb];
  if (!pp) return null;
  const usesEtre = ETRE_VERBS.has(verb);
  const aux = usesEtre ? ETRE_PRES : AVOIR_PRES;
  // For être-verbs the participle agrees: allé(e)(s). Show a simple A1-friendly form.
  const conj = usesEtre
    ? [`${aux[0]} ${pp}(e)`, `${aux[1]} ${pp}(e)`, `${aux[2]} ${pp}(e)`, `${aux[3]} ${pp}(e)s`, `${aux[4]} ${pp}(e)(s)`, `${aux[5]} ${pp}(e)s`]
    : aux.map(a => `${a} ${pp}`);
  return {
    group: PRESENT[verb]?.group || "",
    meaning: PRESENT[verb]?.meaning || "",
    conjugations: conj,
    tip: usesEtre
      ? "Đi với ÊTRE → phân từ hợp giống/số: allé(e)(s)."
      : "Passé composé = avoir (hiện tại) + phân từ quá khứ.",
    example: usesEtre
      ? `Je suis ${pp}(e) hier. — Hôm qua tôi đã ${PRESENT[verb]?.meaning || ""}.`
      : `J'${aux[0]==="ai"?"ai":aux[0]} ${pp}. — Tôi đã ${PRESENT[verb]?.meaning || ""}.`,
  };
}

function buildFuturProche(verb) {
  if (!PRESENT[verb]) return null;
  return {
    group: PRESENT[verb].group,
    meaning: PRESENT[verb].meaning,
    conjugations: ALLER_PRES.map(a => `${a} ${verb}`),
    tip: "Futur proche = ALLER (hiện tại) + động từ nguyên thể.",
    example: `Je vais ${verb} demain. — Mai tôi sẽ ${PRESENT[verb].meaning}.`,
  };
}

const norm = (s = "") => s.toLowerCase().trim().replace(/^(se |s'|s’)/, "");

// Returns a result object matching the AI shape, or null if not baked.
export function getBakedConjugation(verb, tenseId, tenseLabel) {
  const v = norm(verb);
  let entry = null;
  if (tenseId === "present")        entry = PRESENT[v];
  else if (tenseId === "passe")     entry = buildPasse(v);
  else if (tenseId === "futur_pro") entry = buildFuturProche(v);
  if (!entry) return null;
  return { verb: v, tense: tenseLabel || tenseId, baked: true, ...entry };
}
