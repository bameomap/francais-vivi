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
