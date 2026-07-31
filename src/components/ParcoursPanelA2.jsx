import { C } from "../constants.js";
import { PARCOURS_UNITS_A2 } from "../data/parcoursDataA2.js";

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
      ) : null}

      <button onClick={() => onNavigate?.("vocab", "input")}
        style={{ width:"100%", marginTop:"0.85rem", padding:"0.85rem", background:`linear-gradient(135deg, ${C.blue}, ${C.blueDark})`, color:"#fff", border:"none", borderRadius:14, fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.9rem", fontWeight:700, cursor:"pointer" }}>
        Luyện từ vựng tự do ✦
      </button>
    </div>
  );
}
