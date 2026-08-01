import { useState, useEffect } from "react";
import { C } from "../constants.js";
import { EDITO_VOCAB_UNITS } from "../data/editoVocab.js";
import EditoAudioPanel from "./EditoAudioPanel.jsx";
import { EDITO_AUDIO } from "../data/editoAudio.js";
import { EDITO_POUR_NOTES } from "../data/editoAudioNotes.js";

// L'Écoute is the book's listening, and only that. The AI-generated dictée,
// the vocabulary listening quiz, the upload-your-own-file dictée and the
// communication practice tabs were removed: with the real Édito recordings
// playable sentence by sentence, they were competing paths to a worse version
// of the same exercise.
export default function EcouterPanel({
  section,
  onBackToParcours,
  vocabUnits   = EDITO_VOCAB_UNITS,
  audio        = EDITO_AUDIO,
  timings      = null,   // sentence-level mp3 timestamps; null ⇒ no per-sentence play
  pourNotes    = EDITO_POUR_NOTES,
  levelLabel   = "Édito A1",
  cefr         = "A1",
}) {
  const [fromParcours, setFromParcours] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("parcours_back")) {
      setFromParcours(true);
      localStorage.removeItem("parcours_back");
    }
  }, []);

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>

      {/* ── Dark hero banner ── */}
      <div style={{ background: `linear-gradient(135deg, ${C.heroFrom} 0%, ${C.heroTo} 100%)`, padding: "0.9rem 1rem 0.85rem" }}>
        {fromParcours && onBackToParcours && (
          <button onClick={onBackToParcours} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer", padding: "0.2rem 0.65rem", borderRadius: 20, marginBottom: "0.6rem", fontFamily: "inherit" }}>
            ← Parcours
          </button>
        )}
        <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1.15rem", color: "#fff", fontWeight: 800, lineHeight: 1.1 }}>
          🎧 L'Écoute
        </div>
        <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.65)", marginTop: 4 }}>
          Nghe &amp; học theo sách {levelLabel}
        </div>
      </div>

      <EditoAudioPanel audio={audio} timings={timings} vocabUnits={vocabUnits}
        pourNotes={pourNotes} cefr={cefr} />
    </div>
  );
}
