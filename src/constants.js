const LIGHT = {
  blue:       "#4A90D9",
  blueL:      "#EBF4FF",
  blueDark:   "#1B3A6B",
  accent:     "#E8574A",
  accentL:    "#FFF0EF",
  red:        "#E8574A",
  redL:       "#FFF0EF",
  ink:        "#1A2744",
  ink2:       "#3A4664",
  paper:      "#F5F8FF",
  cream:      "#EEF3FF",
  borderSoft: "#EEF2FA",
  white:      "#FFFFFF",
  gray:       "#6B7A99",
  gray2:      "#94A0BC",
  border:     "#DDE5F4",
  gold:       "#F5A623",
  goldL:      "#FFF8E1",
  green:      "#10B981",
  greenL:     "#ECFDF5",
  purple:     "#4A90D9",
  purpleL:    "#EBF4FF",
  g1: "rgba(255,255,255,1)",
  g2: "rgba(255,255,255,0.85)",
  g3: "rgba(245,248,255,0.95)",
  // Hero gradient — stays dark in BOTH themes so white text is always readable
  heroFrom:   "#1A2744",
  heroTo:     "#2d4f8a",
};

const DARK = {
  blue:       "#60A5FA",
  blueL:      "#0F2540",
  blueDark:   "#93C5FD",
  accent:     "#F87171",
  accentL:    "#2D0D0D",
  red:        "#F87171",
  redL:       "#2D0D0D",
  ink:        "#E2E8F0",
  ink2:       "#CBD5E1",
  paper:      "#0F172A",
  cream:      "#1E293B",
  borderSoft: "#283548",
  white:      "#1E293B",
  gray:       "#94A3B8",
  gray2:      "#64748B",
  border:     "#334155",
  gold:       "#FCD34D",
  goldL:      "#292200",
  green:      "#34D399",
  greenL:     "#052E16",
  purple:     "#60A5FA",
  purpleL:    "#0F2540",
  g1: "rgba(30,41,59,1)",
  g2: "rgba(30,41,59,0.85)",
  g3: "rgba(15,23,42,0.95)",
  heroFrom:   "#1A2744",
  heroTo:     "#3a5da0",
};

export const C = { ...LIGHT };

// ── Color themes (chọn trong Profil) ─────────────────────────
// Mỗi theme override một bộ màu chủ đạo lên nền LIGHT/DARK.
// purple được gán = blue để toàn app thống nhất một màu nhấn.
export const THEMES = [
  {
    id: "classic", label: "Xanh Pháp", emoji: "🇫🇷", swatch: "#4A90D9",
    light: {}, dark: {},
  },
  {
    id: "rose", label: "Hồng pastel", emoji: "🌸", swatch: "#E98B96",
    light: {
      blue: "#D9707B", blueL: "#FDEFF1", blueDark: "#A14A57",
      purple: "#D9707B", purpleL: "#FDEFF1",
      paper: "#FFF7F8", cream: "#FBEDF0", border: "#F0DADF", borderSoft: "#F7E8EB",
      heroFrom: "#43242B", heroTo: "#8a4a5c",
    },
    dark: { blue: "#F0A1AB", blueL: "#3A2026", blueDark: "#F8C7CD", purple: "#F0A1AB", purpleL: "#3A2026", heroTo: "#8a4a5c" },
  },
  {
    id: "sage", label: "Xanh sage", emoji: "🌿", swatch: "#7A9E7C",
    light: {
      blue: "#678F69", blueL: "#EFF4EF", blueDark: "#3D6B3F",
      purple: "#678F69", purpleL: "#EFF4EF",
      paper: "#F4F7F3", cream: "#EBF1EA", border: "#DCE5DA", borderSoft: "#E7EEE5",
      heroFrom: "#243527", heroTo: "#4a6e4d",
    },
    dark: { blue: "#8FBF92", blueL: "#16281A", blueDark: "#B5D6B7", purple: "#8FBF92", purpleL: "#16281A", heroTo: "#4a6e4d" },
  },
  {
    id: "lavande", label: "Oải hương", emoji: "💜", swatch: "#8B7CD8",
    light: {
      blue: "#7B6CF6", blueL: "#F0EEFF", blueDark: "#4F3FB5",
      purple: "#7B6CF6", purpleL: "#F0EEFF",
      paper: "#F7F6FD", cream: "#EFEDFB", border: "#E1DDF4", borderSoft: "#EAE7F8",
      heroFrom: "#241A44", heroTo: "#54448a",
    },
    dark: { blue: "#A79BFA", blueL: "#221B40", blueDark: "#C8C0FC", purple: "#A79BFA", purpleL: "#221B40", heroTo: "#54448a" },
  },
  {
    id: "miel", label: "Mật ong", emoji: "🍯", swatch: "#E0A04F",
    light: {
      blue: "#BC832B", blueL: "#FDF3E0", blueDark: "#8A5500",
      purple: "#BC832B", purpleL: "#FDF3E0",
      paper: "#FFFBF0", cream: "#FAF1DC", border: "#EFE2C4", borderSoft: "#F6ECD6",
      heroFrom: "#3A2C12", heroTo: "#8a6a2e",
    },
    dark: { blue: "#E0B36A", blueL: "#33270D", blueDark: "#EFD09C", purple: "#E0B36A", purpleL: "#33270D", heroTo: "#8a6a2e" },
  },
];

export const THEME_KEY = "app_theme";
export const LEVEL_KEY = "app_level";

export function applyTheme(dark, themeId) {
  const id = themeId ?? localStorage.getItem(THEME_KEY) ?? "classic";
  const theme = THEMES.find(t => t.id === id) || THEMES[0];
  Object.assign(C, dark ? DARK : LIGHT, dark ? theme.dark : theme.light);
  document.body.style.background = C.paper;
}

export const DEFAULTS = `la boulangerie — tiệm bánh mì
le marché — chợ
la pharmacie — nhà thuốc
la pomme — táo
la tomate — cà chua
le croissant — bánh sừng bò
un kilo de — một kg
la carte bancaire — thẻ ngân hàng
les espèces — tiền mặt
le reçu — biên lai`;
