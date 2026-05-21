import { useState, useEffect } from "react";
import { C } from "../../constants.js";
import { callAIText } from "../../utils/api.js";
import { addWordToSRS, getSRSStats } from "../../utils/srs.js";
import SpeakBtn from "./SpeakBtn.jsx";
import Spinner from "./Spinner.jsx";

/**
 * WordDetailSheet — bottom sheet showing full word details
 * Props: word { fr, vi }, onClose
 */
export default function WordDetailSheet({ word, onClose }) {
  const cacheKey = `wds_${word.fr}`;

  const [details, setDetails] = useState(() => {
    try { return JSON.parse(localStorage.getItem(cacheKey)) || null; } catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const [srsAdded, setSrsAdded] = useState(false);

  useEffect(() => {
    if (details) return;
    setLoading(true);
    callAIText(
      [{ role:"user", content:
        `Từ tiếng Pháp: "${word.fr}" (nghĩa: ${word.vi || "?"}).\n` +
        `Trả lời đúng format, không thêm gì khác:\n` +
        `POS: <loại từ: Danh từ / Động từ / Tính từ / Trạng từ / Giới từ / ...>\n` +
        `IPA: <phiên âm IPA chính xác>\n` +
        `DEF_FR: <định nghĩa 1 câu bằng tiếng Pháp đơn giản A1-A2>\n` +
        `DEF_VI: <định nghĩa 1 câu bằng tiếng Việt>\n` +
        `EX_FR: <1 câu ví dụ ngắn tiếng Pháp (6-10 từ) dùng từ này>\n` +
        `EX_VI: <dịch tiếng Việt của câu ví dụ>`
      }],
      "Giáo viên tiếng Pháp. Chỉ trả lời đúng 6 dòng format yêu cầu."
    ).then(text => {
      const get = tag => text.match(new RegExp(`^${tag}:\\s*(.+)`, "m"))?.[1]?.trim() || "";
      const result = {
        pos:    get("POS"),
        ipa:    get("IPA"),
        def_fr: get("DEF_FR"),
        def_vi: get("DEF_VI"),
        ex_fr:  get("EX_FR"),
        ex_vi:  get("EX_VI"),
      };
      localStorage.setItem(cacheKey, JSON.stringify(result));
      setDetails(result);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [word.fr]);

  const handleAddSRS = () => {
    addWordToSRS(word.fr, word.vi);
    setSrsAdded(true);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:500, animation:"fadeIn 0.2s ease" }}
      />

      {/* Sheet — centered + max-width on desktop */}
      <div style={{
        position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)",
        width:"100%", maxWidth:560, zIndex:510,
        background:C.white,
        borderRadius:"24px 24px 0 0",
        maxHeight:"88vh",
        overflowY:"auto",
        animation:"slideUp 0.3s cubic-bezier(0.32,0.72,0,1)",
        paddingBottom:"env(safe-area-inset-bottom, 16px)",
        boxShadow:"0 -8px 40px rgba(0,0,0,0.18)",
      }}>
        {/* Drag handle */}
        <div style={{ display:"flex", justifyContent:"center", padding:"0.7rem 0 0.2rem" }}>
          <div style={{ width:36, height:4, background:C.border, borderRadius:999 }}/>
        </div>

        <div style={{ padding:"0.75rem 1.25rem 1.5rem" }}>

          {/* ── Word + POS + close ── */}
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"0.2rem" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.55rem", flexWrap:"wrap" }}>
              <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"2rem", color:C.ink, fontWeight:700, lineHeight:1.1 }}>
                {word.fr}
              </span>
              {details?.pos && (
                <span style={{ background:C.blue, color:"#fff", fontSize:"0.68rem", fontWeight:700, padding:"0.2rem 0.65rem", borderRadius:20 }}>
                  {details.pos}
                </span>
              )}
              {loading && !details && <Spinner size={16} />}
            </div>
            <button onClick={onClose}
              style={{ background:C.border, border:"none", borderRadius:"50%", width:30, height:30, cursor:"pointer", color:C.gray, fontSize:"1rem", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              ×
            </button>
          </div>

          {/* ── IPA ── */}
          <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"0.9rem", flexWrap:"wrap" }}>
            {details?.ipa
              ? <>
                  <span style={{ fontSize:"0.65rem", background:"#F5F5F5", color:C.gray, borderRadius:6, padding:"0.1rem 0.4rem", fontWeight:600 }}>FR</span>
                  <span style={{ fontFamily:"'Courier New',monospace", fontSize:"0.88rem", color:"#6D28D9" }}>/{details.ipa}/</span>
                  <SpeakBtn text={word.fr} />
                </>
              : <SpeakBtn text={word.fr} />
            }
          </div>

          {/* ── Divider ── */}
          <div style={{ borderTop:`1px dashed ${C.border}`, marginBottom:"0.9rem" }}/>

          {/* ── Định nghĩa ── */}
          {(details?.def_fr || details?.def_vi) && (
            <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:14, padding:"0.9rem 1rem", marginBottom:"0.75rem" }}>
              <div style={{ fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:1.5, color:C.gray, fontWeight:700, marginBottom:"0.55rem" }}>
                Định nghĩa
              </div>
              {details.def_fr && (
                <div style={{ display:"flex", gap:"0.5rem", marginBottom:"0.45rem" }}>
                  <span style={{ fontSize:"0.65rem", fontWeight:700, color:C.gray, minWidth:20, marginTop:"0.15rem" }}>FR</span>
                  <span style={{ fontSize:"0.82rem", color:C.ink, lineHeight:1.6 }}>{details.def_fr}</span>
                </div>
              )}
              {details.def_vi && (
                <div style={{ display:"flex", gap:"0.5rem" }}>
                  <span style={{ fontSize:"0.65rem", fontWeight:700, color:C.gray, minWidth:20, marginTop:"0.15rem" }}>VI</span>
                  <span style={{ fontSize:"0.82rem", color:C.gray, lineHeight:1.6 }}>{details.def_vi}</span>
                </div>
              )}
            </div>
          )}

          {/* ── Bản dịch ── */}
          <div style={{ background:C.blueL, border:`1px solid ${C.blue}33`, borderRadius:14, padding:"0.9rem 1rem", marginBottom:"0.75rem" }}>
            <div style={{ fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:1.5, color:C.blue, fontWeight:700, marginBottom:"0.4rem" }}>
              Bản dịch
            </div>
            <div style={{ display:"flex", gap:"0.5rem", alignItems:"center" }}>
              <span style={{ fontSize:"0.65rem", fontWeight:700, color:C.blue, minWidth:20 }}>VI</span>
              <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.05rem", color:C.blue, fontWeight:700 }}>{word.vi || "—"}</span>
            </div>
          </div>

          {/* ── Ví dụ ── */}
          {details?.ex_fr && (
            <div style={{ background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:14, padding:"0.9rem 1rem", marginBottom:"0.9rem" }}>
              <div style={{ fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:1.5, color:"#D97706", fontWeight:700, marginBottom:"0.5rem" }}>
                ✦ Ví dụ
              </div>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"0.5rem" }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:"0.85rem", color:C.ink, fontStyle:"italic", lineHeight:1.6, marginBottom:"0.2rem" }}>
                    {details.ex_fr}
                  </div>
                  <div style={{ fontSize:"0.75rem", color:C.gray }}>↳ {details.ex_vi}</div>
                </div>
                <SpeakBtn text={details.ex_fr} />
              </div>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div style={{ display:"flex", justifyContent:"center", padding:"0.75rem 0", gap:"0.5rem", alignItems:"center" }}>
              <Spinner size={14} />
              <span style={{ fontSize:"0.75rem", color:C.gray }}>Đang tải chi tiết…</span>
            </div>
          )}

          {/* ── Add to SRS button ── */}
          <button
            onClick={handleAddSRS}
            disabled={srsAdded}
            style={{
              width:"100%", padding:"0.85rem",
              background: srsAdded ? C.greenL : `linear-gradient(135deg,${C.blue},${C.blueDark})`,
              color: srsAdded ? C.green : "#fff",
              border: srsAdded ? `1.5px solid ${C.green}` : "none",
              borderRadius:14, fontSize:"0.9rem", cursor: srsAdded ? "default" : "pointer",
              fontWeight:700, fontFamily:"inherit",
              boxShadow: srsAdded ? "none" : `0 4px 16px ${C.blue}44`,
              transition:"all 0.2s",
            }}>
            {srsAdded ? "✓ Đã thêm vào thẻ ôn tập" : "🧠 Thêm vào SRS"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
      `}</style>
    </>
  );
}
