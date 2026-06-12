import { C } from "../../constants.js";

// Hàng phím ký tự tiếng Pháp cho người dùng bàn phím Việt/mobile.
// Chèn ký tự vào ô input/textarea ĐANG FOCUS — onPointerDown preventDefault
// giữ nguyên focus, nên không cần truyền ref từ component cha.
const CHARS = ["é", "è", "ê", "à", "ç", "ô", "û", "ù", "î", "ï", "ë", "â", "œ"];

function insertChar(ch) {
  const el = document.activeElement;
  if (!el || (el.tagName !== "TEXTAREA" && el.tagName !== "INPUT")) return;
  const start = el.selectionStart ?? el.value.length;
  const end = el.selectionEnd ?? el.value.length;
  // Dùng native setter để React (controlled input) nhận sự kiện input
  const proto = el.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, "value").set;
  setter.call(el, el.value.slice(0, start) + ch + el.value.slice(end));
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.setSelectionRange(start + 1, start + 1);
}

export default function AccentBar({ compact = false }) {
  return (
    <div style={{
      display: "flex", gap: 3, flexWrap: "nowrap", overflowX: "auto",
      padding: compact ? "2px 0" : "4px 0",
      WebkitOverflowScrolling: "touch",
    }}>
      {CHARS.map(ch => (
        <button
          key={ch}
          type="button"
          aria-label={`Chèn ký tự ${ch}`}
          onPointerDown={e => e.preventDefault()}
          onMouseDown={e => e.preventDefault()}
          onClick={() => insertChar(ch)}
          style={{
            flexShrink: 0, minWidth: compact ? 26 : 30, padding: compact ? "3px 4px" : "5px 6px",
            background: C.white, border: `1px solid ${C.border}`, borderRadius: 7,
            color: C.ink, fontSize: compact ? "0.82rem" : "0.92rem",
            fontFamily: "Georgia,serif", cursor: "pointer", lineHeight: 1,
            transition: "background 0.1s",
          }}>
          {ch}
        </button>
      ))}
    </div>
  );
}
