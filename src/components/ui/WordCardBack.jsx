/**
 * WordCardBack — back face of a flip card
 * Shows: word, POS, translation, IPA, definition, example sentence
 * AI-powered with localStorage cache
 */
import { useState, useEffect } from "react";
import { C } from "../../constants.js";
import { callAIText } from "../../utils/api.js";
import SpeakBtn from "./SpeakBtn.jsx";
import Spinner from "./Spinner.jsx";

export default function WordCardBack({ word }) {
  const cacheKey = `wcb_${word.fr}`;
  const [details, setDetails] = useState(() => {
    try { return JSON.parse(localStorage.getItem(cacheKey)) || null; } catch { return null; }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (details) return;
    setLoading(true);
    callAIText(
      [{ role:"user", content:
        `Từ tiếng Pháp: "${word.fr}" (nghĩa: ${word.vi || "?"}).\n` +
        `Trả lời đúng 5 dòng, không thêm gì khác:\n` +
        `POS: <loại từ: Danh từ / Động từ / Tính từ / ...>\n` +
        `IPA: <phiên âm IPA>\n` +
        `DEF: <định nghĩa 1 câu tiếng Việt>\n` +
        `EX_FR: <1 câu ví dụ ngắn tiếng Pháp (6-10 từ)>\n` +
        `EX_VI: <dịch tiếng Việt>`
      }],
      "Giáo viên tiếng Pháp. Chỉ trả lời đúng 5 dòng format."
    ).then(text => {
      const get = tag => text.match(new RegExp(`^${tag}:\\s*(.+)`, "m"))?.[1]?.trim() || "";
      const result = { pos:get("POS"), ipa:get("IPA"), def:get("DEF"), ex_fr:get("EX_FR"), ex_vi:get("EX_VI") };
      localStorage.setItem(cacheKey, JSON.stringify(result));
      setDetails(result);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [word.fr]);

  return (
    <div style={{
      width:"100%", height:"100%", overflowY:"auto",
      display:"flex", flexDirection:"column", padding:"1.25rem 1.4rem",
      gap:"0.55rem", boxSizing:"border-box",
    }}>
      {/* Word + POS */}
      <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", flexWrap:"wrap" }}>
        <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.75rem", color:C.ink, fontWeight:700, lineHeight:1 }}>
          {word.fr}
        </span>
        {details?.pos && (
          <span style={{ background:C.blue, color:"#fff", fontSize:"0.64rem", fontWeight:700, padding:"0.18rem 0.6rem", borderRadius:20, flexShrink:0 }}>
            {details.pos}
          </span>
        )}
      </div>

      {/* Translation */}
      <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.1rem", color:C.blue, fontWeight:700 }}>
        {word.vi || "—"}
      </div>

      {/* IPA + speak */}
      <div style={{ display:"flex", alignItems:"center", gap:"0.45rem" }}>
        {details?.ipa
          ? <span style={{ fontFamily:"'Courier New',monospace", fontSize:"0.8rem", color:"#6D28D9", background:"#F5F0FF", borderRadius:8, padding:"0.15rem 0.5rem" }}>/{details.ipa}/</span>
          : null
        }
        <SpeakBtn text={word.fr} />
        {loading && <Spinner size={13} />}
      </div>

      {/* Definition */}
      {details?.def && (
        <div style={{ fontSize:"0.78rem", color:C.gray, lineHeight:1.6 }}>
          {details.def}
        </div>
      )}

      {/* Example */}
      {details?.ex_fr && (
        <div style={{ background:"#FFFBEB", borderRadius:12, padding:"0.55rem 0.8rem", border:"1px solid #FDE68A", marginTop:"0.1rem" }}>
          <div style={{ fontSize:"0.58rem", textTransform:"uppercase", letterSpacing:1.5, color:"#D97706", fontWeight:700, marginBottom:"0.3rem" }}>✦ Ví dụ</div>
          <div style={{ fontSize:"0.78rem", color:C.ink, fontStyle:"italic", lineHeight:1.55 }}>{details.ex_fr}</div>
          <div style={{ fontSize:"0.7rem", color:C.gray, marginTop:"0.2rem" }}>↳ {details.ex_vi}</div>
        </div>
      )}
    </div>
  );
}
