import { C } from "../../constants.js";

// Shown when a panel has been narrowed to one parcours step's items
// (see utils/parcoursFocus.js). Names what's being shown and always offers a
// way back to the full list, so the filter can never trap the learner.
export default function FocusBar({ label, total, onClear }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap",
      background: C.blueL, border: `1px solid ${C.blue}44`,
      borderRadius: 10, padding: "0.45rem 0.7rem", margin: "0 0 0.7rem",
    }}>
      <span style={{ fontSize: "0.72rem", color: C.blueDark, fontWeight: 600, flex: 1, minWidth: 0, lineHeight: 1.45 }}>
        🎯 Bước của Parcours{label ? ` · ${label}` : ""}
      </span>
      <button
        onClick={onClear}
        style={{
          flexShrink: 0, background: C.white, border: `1px solid ${C.blue}55`,
          color: C.blue, borderRadius: 20, padding: "0.12rem 0.6rem",
          fontSize: "0.66rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
        }}>
        Xem tất cả{total ? ` (${total})` : ""}
      </button>
    </div>
  );
}
