// Single source of truth for CEFR levels the app offers.
// To add B1 later: build its data files, then flip `status` to "ready" and
// point `unitCount` at the real number — the level picker, the level badge
// and every level-aware branch in App.jsx pick it up automatically.

export const LEVELS = [
  {
    id: "a1",
    code: "A1",
    fr: "Débutant",
    vi: "Nhập môn",
    tagline: "Chào hỏi, giới thiệu bản thân, mua sắm, chỉ đường",
    book: "Édito A1 · Didier FLE",
    emoji: "🌱",
    color: "#4A90D9",
    status: "ready",
    unitCount: 11,
    goals: [
      "Chào hỏi, tự giới thiệu (tên, quốc tịch, nghề nghiệp) và nói về gia đình",
      "Mua sắm, gọi món, hỏi giá và nói về số lượng",
      "Hỏi đường, mô tả vị trí và nơi ở",
      "Kể hoạt động hàng ngày và lên kế hoạch với thì tương lai gần",
      "Nói về sức khỏe, đưa lời khuyên bằng thức mệnh lệnh",
      "Kể lại chuyện đã xảy ra với thì quá khứ kép (passé composé)",
    ],
  },
  {
    id: "a2",
    code: "A2",
    fr: "Élémentaire",
    vi: "Sơ cấp",
    tagline: "Kể chuyện quá khứ, tả người & nơi chốn, bày tỏ ý kiến",
    book: "Édito A2 · Didier FLE",
    emoji: "🌿",
    color: "#10B981",
    status: "ready",
    unitCount: 12,
    goals: [
      "Kể chuyện quá khứ mạch lạc, phối hợp passé composé và imparfait",
      "Miêu tả người, nơi chốn và hồi tưởng kỷ niệm",
      "So sánh, bày tỏ sở thích, ý kiến và mong muốn (conditionnel)",
      "Nói về dự định, tương lai và các giả định (futur simple, si/quand)",
      "Bàn luận về ẩm thực, sức khỏe, tiêu dùng và môi trường",
      "Đọc hiểu tin tức, viết thư và chuẩn bị cho kỳ thi DELF A2",
    ],
  },
  {
    id: "b1",
    code: "B1",
    fr: "Intermédiaire",
    vi: "Trung cấp",
    tagline: "Tranh luận, kể chi tiết, viết thư trang trọng",
    book: "Édito B1 · Didier FLE",
    emoji: "🌳",
    color: "#F5A623",
    status: "soon",
    unitCount: null,
  },
  {
    id: "b2",
    code: "B2",
    fr: "Intermédiaire sup.",
    vi: "Trung cao cấp",
    tagline: "Lập luận chặt chẽ, hiểu văn bản dài & phức tạp",
    book: "Édito B2 · Didier FLE",
    emoji: "🌲",
    color: "#7B6CF6",
    status: "soon",
    unitCount: null,
  },
];

export const DEFAULT_LEVEL = "a1";

export const getLevel = (id) =>
  LEVELS.find(l => l.id === id) || LEVELS.find(l => l.id === DEFAULT_LEVEL);

// Only these can actually be opened; "soon" levels stay locked in the picker.
export const isSelectable = (level) => level.status !== "soon";
