import { C } from "../constants.js";

export default function ReferenceHubA2() {
  return (
    <div style={{ padding:"1.5rem 1rem", animation:"fadeUp 0.3s ease" }}>
      <div style={{ textAlign:"center", padding:"2.5rem 1.25rem", background:C.white, border:`1.5px dashed ${C.border}`, borderRadius:16 }}>
        <div style={{ fontSize:"2rem", marginBottom:"0.6rem" }}>📚</div>
        <div style={{ fontSize:"0.88rem", color:C.ink, fontWeight:600, marginBottom:"0.3rem" }}>Référence A2 sắp ra mắt</div>
        <div style={{ fontSize:"0.78rem", color:C.gray, lineHeight:1.6 }}>
          Tra từ, ngữ pháp, động từ và mẫu câu của A2 sẽ được thêm dần —
          theo đúng format của Référence A1.
        </div>
      </div>
    </div>
  );
}
