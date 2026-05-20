const LIGHT = {
  blue:    "#4A90D9",
  blueL:   "#EBF4FF",
  blueDark:"#1B3A6B",
  red:     "#E8574A",
  redL:    "#FFF0EF",
  ink:     "#1A2744",
  paper:   "#F5F8FF",
  cream:   "#EEF3FF",
  white:   "#FFFFFF",
  gray:    "#6B7A99",
  border:  "#DDE5F4",
  gold:    "#F5A623",
  goldL:   "#FFF8E1",
  green:   "#10B981",
  greenL:  "#ECFDF5",
  purple:  "#4A90D9",
  purpleL: "#EBF4FF",
  g1: "rgba(255,255,255,1)",
  g2: "rgba(255,255,255,0.85)",
  g3: "rgba(245,248,255,0.95)",
};

const DARK = {
  blue:    "#60A5FA",
  blueL:   "#0F2540",
  blueDark:"#93C5FD",
  red:     "#F87171",
  redL:    "#2D0D0D",
  ink:     "#E2E8F0",
  paper:   "#0F172A",
  cream:   "#1E293B",
  white:   "#1E293B",
  gray:    "#94A3B8",
  border:  "#334155",
  gold:    "#FCD34D",
  goldL:   "#292200",
  green:   "#34D399",
  greenL:  "#052E16",
  purple:  "#60A5FA",
  purpleL: "#0F2540",
  g1: "rgba(30,41,59,1)",
  g2: "rgba(30,41,59,0.85)",
  g3: "rgba(15,23,42,0.95)",
};

export const C = { ...LIGHT };

export function applyTheme(dark) {
  Object.assign(C, dark ? DARK : LIGHT);
  document.body.style.background = dark ? DARK.paper : LIGHT.paper;
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
