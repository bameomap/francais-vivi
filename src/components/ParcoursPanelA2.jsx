import { C } from "../constants.js";
import { PARCOURS_UNITS_A2 } from "../data/parcoursDataA2.js";

// Unit cards launch straight into Vocabulaire / Grammaire (reusing the
// EditoVocabPanel / EditoGrammarPanel deep-link protocol from ParcoursPanel.jsx:
// stash the unit's index, then navigate). No step/progress tracking yet —
// that lands once more units + steps (lecture, écoute, écrire, parler…) exist.
function goToStep(section, view, unitIdx, onNavigate) {
  localStorage.setItem("parcours_unit_idx", String(unitIdx));
  onNavigate(section, view);
}

export default function ParcoursPanelA2({ onNavigate }) {
  return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      <div style={{ marginBottom:"1rem" }}>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.05rem", fontWeight:700, color:C.ink }}>🇫🇷 Parcours A2</div>
        <div style={{ fontSize:12, color:C.gray, marginTop:2 }}>Édito A2 · sẽ được xây dần theo từng Unité</div>
      </div>

      {PARCOURS_UNITS_A2.length === 0 ? (
        <div style={{ textAlign:"center", padding:"3rem 1.25rem", background:C.white, border:`1.5px dashed ${C.border}`, borderRadius:16 }}>
          <div style={{ fontSize:"2rem", marginBottom:"0.6rem" }}>🚧</div>
          <div style={{ fontSize:"0.88rem", color:C.ink, fontWeight:600, marginBottom:"0.3rem" }}>Đang xây dựng Parcours A2</div>
          <div style={{ fontSize:"0.78rem", color:C.gray, lineHeight:1.6 }}>
            Các Unité sẽ được thêm dần vào đây khi bạn học qua sách Édito A2 —
            theo cùng cấu trúc với Parcours A1 nhưng chỉnh sửa cho nội dung mới.
          </div>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
          {PARCOURS_UNITS_A2.map((unit, i) => (
            <div key={unit.id} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:16, padding:"0.9rem 1rem", animation:`fadeUp 0.2s ease ${i*0.04}s both` }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:"0.7rem" }}>
                <span style={{ fontSize:22, lineHeight:1 }}>{unit.emoji}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:15, color:C.ink, lineHeight:1.2 }}>
                    Unité {unit.num} · {unit.fr}
                  </div>
                  <div style={{ fontSize:11, color:C.gray, marginTop:2 }}>{unit.vi} · {unit.grammar}</div>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.4rem" }}>
                <button onClick={() => goToStep("vocab", "edito", i, onNavigate)}
                  style={{ padding:"0.55rem 0.4rem", background:C.blueL, color:C.blue, border:"none", borderRadius:10, fontSize:"0.78rem", fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                  📖 Từ vựng
                </button>
                <button onClick={() => goToStep("grammar", "grammar", i, onNavigate)}
                  style={{ padding:"0.55rem 0.4rem", background:C.blueL, color:C.blue, border:"none", borderRadius:10, fontSize:"0.78rem", fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                  ⚜️ Ngữ pháp
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button onClick={() => onNavigate?.("vocab", "input")}
        style={{ width:"100%", marginTop:"0.85rem", padding:"0.85rem", background:`linear-gradient(135deg, ${C.blue}, ${C.blueDark})`, color:"#fff", border:"none", borderRadius:14, fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.9rem", fontWeight:700, cursor:"pointer" }}>
        Luyện từ vựng tự do ✦
      </button>
    </div>
  );
}
