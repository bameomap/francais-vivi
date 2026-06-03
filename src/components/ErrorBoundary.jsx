import { Component } from "react";
import { C } from "../constants.js";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Log for debugging; avoids a silent white screen.
    console.error("App crash:", error, info?.componentStack);
  }

  handleReset = () => {
    this.setState({ error: null });
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"1.5rem", background:C.paper, color:C.ink, fontFamily:"'Inter',sans-serif" }}>
        <div style={{ maxWidth:380, textAlign:"center", background:C.white, border:`1px solid ${C.border}`, borderRadius:18, padding:"1.75rem 1.5rem" }}>
          <div style={{ fontSize:"2.4rem", marginBottom:"0.5rem" }}>🥐</div>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.25rem", fontWeight:700, marginBottom:"0.4rem" }}>
            Oups ! Có lỗi xảy ra
          </div>
          <div style={{ fontSize:"0.82rem", color:C.gray, lineHeight:1.6, marginBottom:"1.2rem" }}>
            App gặp sự cố nhỏ. Dữ liệu học của bạn vẫn được lưu an toàn. Hãy thử tải lại nhé!
          </div>
          <div style={{ display:"flex", gap:"0.6rem", justifyContent:"center" }}>
            <button onClick={this.handleReset}
              style={{ padding:"0.6rem 1rem", background:"transparent", border:`1.5px solid ${C.border}`, color:C.ink, borderRadius:12, fontSize:"0.82rem", cursor:"pointer", fontWeight:600, fontFamily:"inherit" }}>
              Thử lại
            </button>
            <button onClick={() => window.location.reload()}
              style={{ padding:"0.6rem 1rem", background:`linear-gradient(135deg, ${C.blue}, ${C.red})`, color:"#fff", border:"none", borderRadius:12, fontSize:"0.82rem", cursor:"pointer", fontWeight:600, fontFamily:"inherit" }}>
              Tải lại app
            </button>
          </div>
          {import.meta.env?.DEV && (
            <pre style={{ marginTop:"1rem", textAlign:"left", fontSize:"0.65rem", color:C.gray, whiteSpace:"pre-wrap", maxHeight:120, overflow:"auto" }}>
              {String(this.state.error?.stack || this.state.error)}
            </pre>
          )}
        </div>
      </div>
    );
  }
}
