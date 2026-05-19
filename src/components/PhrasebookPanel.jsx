import { useState } from "react";
import { C } from "../constants.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";

const CATEGORIES = [
  {
    id:"greetings", icon:"👋", label:"Chào hỏi",
    phrases:[
      { fr:"Bonjour !",                     vi:"Xin chào! (ban ngày)"           },
      { fr:"Bonsoir !",                     vi:"Xin chào! (buổi tối)"           },
      { fr:"Salut !",                       vi:"Chào! (thân mật)"               },
      { fr:"Au revoir !",                   vi:"Tạm biệt!"                      },
      { fr:"À bientôt !",                   vi:"Hẹn gặp lại!"                   },
      { fr:"À demain !",                    vi:"Hẹn ngày mai!"                  },
      { fr:"Bonne nuit !",                  vi:"Chúc ngủ ngon!"                 },
      { fr:"Comment allez-vous ?",          vi:"Bạn có khỏe không? (lịch sự)"  },
      { fr:"Comment vas-tu ?",              vi:"Bạn có khỏe không? (thân mật)" },
      { fr:"Je vais bien, merci.",          vi:"Tôi khỏe, cảm ơn."             },
      { fr:"Pas mal.",                      vi:"Cũng tạm."                      },
      { fr:"Et vous ?",                     vi:"Còn bạn thì sao? (lịch sự)"    },
      { fr:"Et toi ?",                      vi:"Còn bạn thì sao? (thân mật)"   },
    ],
  },
  {
    id:"intro", icon:"🙋", label:"Giới thiệu",
    phrases:[
      { fr:"Je m'appelle…",                 vi:"Tôi tên là…"                    },
      { fr:"Mon prénom est…",               vi:"Tên tôi là…"                    },
      { fr:"J'ai … ans.",                   vi:"Tôi … tuổi."                   },
      { fr:"Je suis vietnamien(ne).",       vi:"Tôi là người Việt Nam."         },
      { fr:"J'habite à Hanoï.",             vi:"Tôi sống ở Hà Nội."            },
      { fr:"Je suis étudiant(e).",          vi:"Tôi là sinh viên."              },
      { fr:"Je travaille dans…",            vi:"Tôi làm việc trong lĩnh vực…"  },
      { fr:"Je parle un peu français.",     vi:"Tôi nói được một chút tiếng Pháp."},
      { fr:"Je suis en train d'apprendre le français.", vi:"Tôi đang học tiếng Pháp."},
      { fr:"Enchanté(e) !",                 vi:"Rất vui được gặp bạn!"          },
    ],
  },
  {
    id:"polite", icon:"🙏", label:"Lịch sự",
    phrases:[
      { fr:"Merci beaucoup.",               vi:"Cảm ơn rất nhiều."              },
      { fr:"De rien.",                      vi:"Không có gì."                   },
      { fr:"S'il vous plaît.",              vi:"Làm ơn. (lịch sự)"              },
      { fr:"S'il te plaît.",                vi:"Làm ơn. (thân mật)"             },
      { fr:"Excusez-moi.",                  vi:"Xin lỗi. / Excuse me."          },
      { fr:"Pardon.",                       vi:"Xin lỗi."                       },
      { fr:"Je suis désolé(e).",            vi:"Tôi rất tiếc / xin lỗi."       },
      { fr:"Ce n'est pas grave.",           vi:"Không sao đâu."                 },
      { fr:"Avec plaisir !",                vi:"Rất vui lòng!"                  },
      { fr:"Bien sûr !",                    vi:"Tất nhiên rồi!"                 },
    ],
  },
  {
    id:"cafe", icon:"☕", label:"Quán cà phê & nhà hàng",
    phrases:[
      { fr:"Une table pour deux, s'il vous plaît.", vi:"Một bàn cho hai người, làm ơn."},
      { fr:"Le menu, s'il vous plaît.",     vi:"Cho tôi xem menu."              },
      { fr:"Je voudrais un café.",          vi:"Tôi muốn một ly cà phê."        },
      { fr:"Un café au lait, s'il vous plaît.", vi:"Một ly cà phê sữa, làm ơn."},
      { fr:"Un verre d'eau, s'il vous plaît.", vi:"Một ly nước, làm ơn."       },
      { fr:"Je voudrais commander.",        vi:"Tôi muốn gọi món."              },
      { fr:"C'est quoi la spécialité ?",   vi:"Món đặc biệt hôm nay là gì?"   },
      { fr:"L'addition, s'il vous plaît.", vi:"Tính tiền cho tôi, làm ơn."    },
      { fr:"C'est délicieux !",             vi:"Ngon lắm!"                      },
      { fr:"Je suis végétarien(ne).",       vi:"Tôi ăn chay."                  },
      { fr:"Je suis allergique à…",         vi:"Tôi bị dị ứng với…"            },
    ],
  },
  {
    id:"shopping", icon:"🛍️", label:"Mua sắm",
    phrases:[
      { fr:"Combien ça coûte ?",            vi:"Cái này giá bao nhiêu?"         },
      { fr:"C'est trop cher.",              vi:"Đắt quá."                       },
      { fr:"Avez-vous quelque chose de moins cher ?", vi:"Bạn có cái gì rẻ hơn không?"},
      { fr:"Je voudrais essayer ça.",       vi:"Tôi muốn thử cái này."         },
      { fr:"Quelle taille faites-vous ?",  vi:"Bạn mặc cỡ bao nhiêu?"         },
      { fr:"Je fais du 38.",                vi:"Tôi mặc cỡ 38."                },
      { fr:"Je prends celui-ci.",           vi:"Tôi lấy cái này."              },
      { fr:"Vous acceptez la carte ?",      vi:"Bạn nhận thanh toán thẻ không?"},
      { fr:"Je paie en espèces.",           vi:"Tôi trả tiền mặt."             },
    ],
  },
  {
    id:"directions", icon:"🗺️", label:"Hỏi đường",
    phrases:[
      { fr:"Où est… ?",                    vi:"… ở đâu?"                       },
      { fr:"C'est loin ?",                  vi:"Xa không?"                      },
      { fr:"Comment aller à… ?",           vi:"Đi đến … bằng cách nào?"       },
      { fr:"Tournez à gauche.",             vi:"Rẽ trái."                       },
      { fr:"Tournez à droite.",             vi:"Rẽ phải."                       },
      { fr:"Allez tout droit.",             vi:"Đi thẳng."                      },
      { fr:"C'est à … minutes à pied.",    vi:"Đi bộ … phút."                 },
      { fr:"Prenez le métro.",              vi:"Đi tàu điện ngầm."              },
      { fr:"Je suis perdu(e).",             vi:"Tôi bị lạc đường."             },
      { fr:"Pouvez-vous m'aider ?",         vi:"Bạn có thể giúp tôi không?"    },
    ],
  },
  {
    id:"transport", icon:"🚌", label:"Di chuyển",
    phrases:[
      { fr:"Un billet pour…, s'il vous plaît.", vi:"Một vé đến…, làm ơn."     },
      { fr:"À quelle heure part le train ?", vi:"Tàu khởi hành lúc mấy giờ?" },
      { fr:"À quelle heure arrive-t-il ?", vi:"Tàu đến lúc mấy giờ?"         },
      { fr:"Sur quel quai ?",              vi:"Ở sân ga số mấy?"               },
      { fr:"Est-ce que ce siège est libre ?", vi:"Chỗ này còn trống không?"   },
      { fr:"Je voudrais réserver une place.", vi:"Tôi muốn đặt chỗ."          },
    ],
  },
  {
    id:"health", icon:"🏥", label:"Sức khỏe",
    phrases:[
      { fr:"J'ai mal à la tête.",           vi:"Tôi đau đầu."                  },
      { fr:"J'ai mal au ventre.",           vi:"Tôi đau bụng."                 },
      { fr:"J'ai de la fièvre.",            vi:"Tôi bị sốt."                   },
      { fr:"Je me sens mal.",               vi:"Tôi cảm thấy không khỏe."      },
      { fr:"Appelez un médecin, s'il vous plaît.", vi:"Gọi bác sĩ giúp tôi."},
      { fr:"Où est la pharmacie ?",         vi:"Nhà thuốc ở đâu?"              },
      { fr:"J'ai besoin d'un médicament.", vi:"Tôi cần thuốc."                },
    ],
  },
  {
    id:"smalltalk", icon:"💬", label:"Chuyện phiếm",
    phrases:[
      { fr:"Quel temps il fait !",          vi:"Thời tiết thật…!"               },
      { fr:"Il fait beau aujourd'hui.",     vi:"Hôm nay trời đẹp."             },
      { fr:"Il pleut.",                     vi:"Trời đang mưa."                 },
      { fr:"J'aime beaucoup la France.",   vi:"Tôi rất thích nước Pháp."      },
      { fr:"C'est ma première fois à Paris.", vi:"Đây là lần đầu tôi đến Paris."},
      { fr:"Qu'est-ce que vous faites dans la vie ?", vi:"Bạn làm nghề gì?"  },
      { fr:"Vous aimez la musique ?",       vi:"Bạn có thích âm nhạc không?"   },
      { fr:"Moi aussi !",                   vi:"Tôi cũng vậy!"                 },
      { fr:"C'est intéressant !",           vi:"Thú vị thật!"                  },
      { fr:"Je ne comprends pas.",          vi:"Tôi không hiểu."               },
      { fr:"Pouvez-vous répéter, s'il vous plaît ?", vi:"Bạn có thể nói lại không?"},
      { fr:"Parlez plus lentement, s'il vous plaît.", vi:"Nói chậm hơn giúp tôi."},
    ],
  },
];

function PhraseRow({ phrase }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", padding:"0.55rem 0", borderBottom:`1px solid ${C.border}` }}>
      <div style={{ flex:1 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.4rem" }}>
          <span style={{ fontSize:"0.88rem", color:C.ink, fontFamily:"Georgia,serif", fontStyle:"italic" }}>{phrase.fr}</span>
          <SpeakBtn text={phrase.fr} size="sm" />
        </div>
        {show && (
          <div style={{ fontSize:"0.75rem", color:C.gray, marginTop:"0.2rem", animation:"fadeUp 0.2s ease" }}>{phrase.vi}</div>
        )}
      </div>
      <button onClick={() => setShow(v => !v)}
        style={{ padding:"0.2rem 0.55rem", border:`1px solid ${C.border}`, borderRadius:20, background:"transparent", color:C.gray, fontSize:"0.65rem", cursor:"pointer", flexShrink:0, whiteSpace:"nowrap" }}>
        {show ? "Ẩn" : "Nghĩa"}
      </button>
    </div>
  );
}

export default function PhrasebookPanel() {
  const [open,   setOpen]   = useState(null);
  const [search, setSearch] = useState("");

  const q = search.toLowerCase().trim();
  const filtered = q
    ? CATEGORIES.map(cat => ({
        ...cat,
        phrases: cat.phrases.filter(p =>
          p.fr.toLowerCase().includes(q) || p.vi.toLowerCase().includes(q)
        ),
      })).filter(cat => cat.phrases.length > 0)
    : CATEGORIES;

  return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>

      {/* Search */}
      <div style={{ position:"relative", marginBottom:"0.85rem" }}>
        <span style={{ position:"absolute", left:"0.75rem", top:"50%", transform:"translateY(-50%)", fontSize:"0.9rem", pointerEvents:"none" }}>🔍</span>
        <input
          value={search} onChange={e => { setSearch(e.target.value); setOpen(null); }}
          placeholder="Tìm mẫu câu…"
          style={{ width:"100%", padding:"0.65rem 0.85rem 0.65rem 2.2rem", border:`1.5px solid ${C.border}`, borderRadius:12, fontSize:"0.85rem", fontFamily:"inherit", color:C.ink, background:C.white, boxSizing:"border-box" }}
        />
      </div>

      {/* Category accordion */}
      <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
        {filtered.map(cat => {
          const isOpen = open === cat.id || !!q;
          return (
            <div key={cat.id} style={{ background:C.white, borderRadius:16, border:`1.5px solid ${C.border}`, overflow:"hidden" }}>
              {/* Header */}
              <button
                onClick={() => !q && setOpen(isOpen && !q ? null : cat.id)}
                style={{ width:"100%", display:"flex", alignItems:"center", gap:"0.65rem", padding:"0.85rem 1rem", background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", textAlign:"left" }}>
                <span style={{ fontSize:"1.3rem" }}>{cat.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:"0.88rem", color:C.ink, fontWeight:700 }}>{cat.label}</div>
                  <div style={{ fontSize:"0.67rem", color:C.gray }}>{cat.phrases.length} mẫu câu</div>
                </div>
                {!q && <span style={{ color:C.gray, fontSize:"0.75rem" }}>{isOpen ? "▲" : "▼"}</span>}
              </button>

              {/* Phrases */}
              {isOpen && (
                <div style={{ padding:"0 1rem 0.5rem", animation:"fadeUp 0.2s ease" }}>
                  {cat.phrases.map((p, i) => <PhraseRow key={i} phrase={p} />)}
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div style={{ textAlign:"center", color:C.gray, fontSize:"0.82rem", padding:"2rem 0" }}>
            Không tìm thấy mẫu câu nào cho "{search}"
          </div>
        )}
      </div>
    </div>
  );
}
