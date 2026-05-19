import { useState } from "react";
import { speak } from "../../utils/helpers.js";

export default function SpeakBtn({ text, size = "0.8rem" }) {
  const [playing, setPlaying] = useState(false);
  const go = (e) => {
    e.stopPropagation();
    setPlaying(true);
    speak(text, () => setPlaying(false));
  };
  return (
    <button onClick={go} title="Nghe phát âm"
      style={{ background:"none", border:"none", cursor:"pointer", fontSize:size, padding:"0 0.2rem", opacity: playing ? 1 : 0.6, transition:"opacity 0.2s" }}>
      {playing ? "🔊" : "🔈"}
    </button>
  );
}
