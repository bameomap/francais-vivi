import { useState, useEffect } from "react";
import { C } from "../constants.js";
import { callAIText } from "../utils/api.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";
import Spinner from "./ui/Spinner.jsx";
import { EDITO_VOCAB_UNITS } from "../data/editoVocab.js";

// A1 seed words used when user has no vocab yet
const SEED_WORDS = [
  { fr:"bonjour",           vi:"xin chào"          },
  { fr:"merci",             vi:"cảm ơn"             },
  { fr:"s'il vous plaît",   vi:"làm ơn"             },
  { fr:"au revoir",         vi:"tạm biệt"           },
  { fr:"maison",            vi:"ngôi nhà"           },
  { fr:"famille",           vi:"gia đình"           },
  { fr:"ami",               vi:"người bạn"          },
  { fr:"école",             vi:"trường học"         },
  { fr:"livre",             vi:"cuốn sách"          },
  { fr:"chat",              vi:"con mèo"            },
  { fr:"chien",             vi:"con chó"            },
  { fr:"eau",               vi:"nước"               },
  { fr:"pain",              vi:"bánh mì"            },
  { fr:"café",              vi:"cà phê"             },
  { fr:"beau",              vi:"đẹp"                },
  { fr:"grand",             vi:"lớn / cao"          },
  { fr:"petit",             vi:"nhỏ"                },
  { fr:"nouveau",           vi:"mới"                },
  { fr:"heureux",           vi:"hạnh phúc"          },
  { fr:"triste",            vi:"buồn"               },
  { fr:"manger",            vi:"ăn"                 },
  { fr:"boire",             vi:"uống"               },
  { fr:"dormir",            vi:"ngủ"                },
  { fr:"parler",            vi:"nói / nói chuyện"   },
  { fr:"lire",              vi:"đọc"                },
  { fr:"écrire",            vi:"viết"               },
  { fr:"aller",             vi:"đi"                 },
  { fr:"venir",             vi:"đến"                },
  { fr:"aimer",             vi:"yêu / yêu thích"    },
  { fr:"savoir",            vi:"biết (kiến thức)"   },
  { fr:"pouvoir",           vi:"có thể"             },
  { fr:"vouloir",           vi:"muốn"               },
  { fr:"faire",             vi:"làm / tạo"          },
  { fr:"prendre",           vi:"lấy / đi (xe)"      },
  { fr:"voir",              vi:"nhìn thấy"           },
  { fr:"donner",            vi:"cho / tặng"         },
  { fr:"trouver",           vi:"tìm thấy"           },
  { fr:"ville",             vi:"thành phố"          },
  { fr:"rue",               vi:"con đường / phố"    },
  { fr:"temps",             vi:"thời gian / thời tiết" },
  { fr:"jour",              vi:"ngày"               },
  { fr:"nuit",              vi:"đêm"                },
  { fr:"matin",             vi:"buổi sáng"          },
  { fr:"soir",              vi:"buổi tối"           },
  { fr:"semaine",           vi:"tuần"               },
  { fr:"mois",              vi:"tháng"              },
  { fr:"année",             vi:"năm"                },
  { fr:"travail",           vi:"công việc"          },
  { fr:"argent",            vi:"tiền"               },
  { fr:"voyage",            vi:"chuyến đi / du lịch"},
  { fr:"enfant",            vi:"đứa trẻ"            },
  { fr:"femme",             vi:"phụ nữ / vợ"        },
  { fr:"homme",             vi:"đàn ông / chồng"    },
  { fr:"pays",              vi:"đất nước"           },
  { fr:"monde",             vi:"thế giới"           },
  { fr:"vie",               vi:"cuộc sống"          },
  { fr:"voiture",           vi:"xe ô tô"            },
  { fr:"restaurant",        vi:"nhà hàng"           },
  { fr:"musique",           vi:"âm nhạc"            },
  { fr:"fleur",             vi:"bông hoa"           },
  { fr:"soleil",            vi:"mặt trời"           },
  { fr:"mer",               vi:"biển"               },
  { fr:"montagne",          vi:"núi"                },
  { fr:"liberté",           vi:"tự do"              },
  { fr:"bonheur",           vi:"hạnh phúc (danh từ)"},
  { fr:"boulangerie",       vi:"tiệm bánh mì"       },
  { fr:"fromage",           vi:"phô mai"            },
  { fr:"croissant",         vi:"bánh sừng bò"       },
  { fr:"chapeau",           vi:"cái mũ"             },
  { fr:"parapluie",         vi:"cái ô / dù"         },
];

function getDayIndex() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  return now.getFullYear() * 1000 + Math.floor(diff / 86400000);
}

function getTodayKey() {
  const now = new Date();
  return `wotd_${now.getFullYear()}_${now.getMonth() + 1}_${now.getDate()}`;
}

export default function MotDuJour({ words = [] }) {
  // Ưu tiên: vocab unit đang học trong parcours → words user → seed
  const parcoursUnitId = localStorage.getItem("parcours_last_unit");
  const parcoursUnit   = parcoursUnitId ? EDITO_VOCAB_UNITS.find(u => u.id === parcoursUnitId) : null;
  const parcoursWords  = parcoursUnit ? parcoursUnit.groups.flatMap(g => g.words) : null;
  const pool  = parcoursWords || (words.length >= 7 ? words : SEED_WORDS);
  const word  = pool[getDayIndex() % pool.length];
  const cacheKey = getTodayKey() + "_" + word.fr;

  const [example, setExample] = useState(() => {
    try { return JSON.parse(localStorage.getItem(cacheKey)) || null; } catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (example || !word) return;
    setLoading(true);
    callAIText(
      [{ role:"user", content:`Viết 1 câu ví dụ ngắn (A1) bằng tiếng Pháp sử dụng từ "${word.fr}", kèm bản dịch tiếng Việt.\nChỉ trả lời đúng 2 dòng:\nFR: <câu tiếng Pháp>\nVI: <bản dịch tiếng Việt>` }],
      "Bạn là giáo viên tiếng Pháp. Chỉ trả lời đúng format được yêu cầu, không thêm gì khác."
    ).then(text => {
      const fr = text.match(/^FR:\s*(.+)/m)?.[1]?.trim() || "";
      const vi = text.match(/^VI:\s*(.+)/m)?.[1]?.trim() || "";
      if (fr) {
        const result = { fr, vi };
        localStorage.setItem(cacheKey, JSON.stringify(result));
        setExample(result);
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (!word) return null;

  return (
    <div style={{ margin:"0.75rem 1.25rem 0", animation:"fadeUp 0.4s ease 0.08s both" }}>
      <div style={{ background:C.white, borderRadius:20, overflow:"hidden", boxShadow:"0 2px 16px #00239510", border:`1.5px solid #00239520` }}>

        {/* French flag top stripe */}
        <div style={{ display:"flex", height:4 }}>
          {["#002395","#FFFFFF","#ED2939"].map((col,i) => (
            <div key={i} style={{ flex:1, background:col, borderTop:col==="#FFFFFF"?`1px solid ${C.border}`:"none" }}/>
          ))}
        </div>

        <div style={{ padding:"0.65rem 0.9rem" }}>
          {/* Label */}
          <div style={{ fontSize:"0.56rem", textTransform:"uppercase", letterSpacing:2.5, color:C.gray, marginBottom:"0.4rem", fontWeight:600 }}>
            Le Mot du Jour · {parcoursUnit ? `Unit ${parcoursUnit.num} · ${parcoursUnit.title}` : new Date().toLocaleDateString("vi-VN", { weekday:"long" })}
          </div>

          {/* Word row */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.6rem", color:C.ink, fontWeight:700, lineHeight:1 }}>{word.fr}</span>
              <div style={{ fontSize:"0.78rem", color:C.gray, marginTop:"0.15rem" }}>{word.vi}</div>
            </div>
            <SpeakBtn text={word.fr} />
          </div>

          {/* Expand / collapse toggle */}
          <button
            onClick={() => setExpanded(v => !v)}
            style={{ marginTop:"0.5rem", background:"none", border:"none", color:C.blue, fontSize:"0.7rem", cursor:"pointer", fontWeight:600, padding:0 }}>
            {expanded ? "Thu gọn ▲" : "Xem ví dụ ▼"}
          </button>

          {/* Expanded: example + details */}
          {expanded && (
            <div style={{ marginTop:"0.45rem", animation:"fadeUp 0.25s ease", display:"flex", flexDirection:"column", gap:"0.45rem" }}>
              {loading && (
                <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                  <Spinner size={14} />
                  <span style={{ fontSize:"0.72rem", color:C.gray }}>Đang tạo ví dụ…</span>
                </div>
              )}
              {example && (
                <div style={{ background:"#F5F8FF", borderRadius:12, padding:"0.5rem 0.75rem", border:`1px solid ${C.border}` }}>
                  <div style={{ display:"flex", alignItems:"flex-start", gap:"0.5rem" }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:"0.82rem", color:C.ink, fontStyle:"italic", lineHeight:1.5 }}>{example.fr}</div>
                      <div style={{ fontSize:"0.72rem", color:C.gray, marginTop:"0.15rem" }}>{example.vi}</div>
                    </div>
                    <SpeakBtn text={example.fr} />
                  </div>
                </div>
              )}
              <WordDetails word={word} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Inline details panel ───────────────────────────────────────
function WordDetails({ word }) {
  const [details, setDetails] = useState(() => {
    const k = `wotd_det_${word.fr}`;
    try { return JSON.parse(localStorage.getItem(k)) || null; } catch { return null; }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (details) return;
    const k = `wotd_det_${word.fr}`;
    setLoading(true);
    callAIText(
      [{ role:"user", content:`Cho từ tiếng Pháp: "${word.fr}" (nghĩa: ${word.vi}).\nTrả lời đúng format:\nPRON: <phiên âm IPA của từ>\nTIP: <1 mẹo ghi nhớ ngắn bằng tiếng Việt, tối đa 15 từ>\nGRAM: <loại từ + ghi chú ngắn nếu có (vd: danh từ giống cái, động từ nhóm 1...)>` }],
      "Bạn là giáo viên tiếng Pháp. Chỉ trả lời đúng 3 dòng format được yêu cầu."
    ).then(text => {
      const pron = text.match(/^PRON:\s*(.+)/m)?.[1]?.trim() || "";
      const tip  = text.match(/^TIP:\s*(.+)/m)?.[1]?.trim() || "";
      const gram = text.match(/^GRAM:\s*(.+)/m)?.[1]?.trim() || "";
      const result = { pron, tip, gram };
      localStorage.setItem(k, JSON.stringify(result));
      setDetails(result);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
      <Spinner size={12} />
      <span style={{ fontSize:"0.7rem", color:C.gray }}>Đang tải thông tin…</span>
    </div>
  );
  if (!details) return null;

  return (
    <>
      {details.pron && (
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <span style={{ fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:1, color:C.gray, fontWeight:600, minWidth:36 }}>IPA</span>
          <span style={{ fontFamily:"'Courier New',monospace", fontSize:"0.82rem", color:"#6D28D9", background:"#F5F0FF", borderRadius:8, padding:"0.2rem 0.55rem" }}>/{details.pron}/</span>
        </div>
      )}
      {details.gram && (
        <div style={{ display:"flex", alignItems:"flex-start", gap:"0.5rem" }}>
          <span style={{ fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:1, color:C.gray, fontWeight:600, minWidth:36, paddingTop:"0.1rem" }}>Loại</span>
          <span style={{ fontSize:"0.78rem", color:C.ink }}>{details.gram}</span>
        </div>
      )}
      {details.tip && (
        <div style={{ display:"flex", alignItems:"flex-start", gap:"0.5rem" }}>
          <span style={{ fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:1, color:C.gray, fontWeight:600, minWidth:36, paddingTop:"0.1rem" }}>Mẹo</span>
          <span style={{ fontSize:"0.78rem", color:"#B45309", background:"#FFFBEB", borderRadius:8, padding:"0.2rem 0.55rem", lineHeight:1.45 }}>💡 {details.tip}</span>
        </div>
      )}
    </>
  );
}
