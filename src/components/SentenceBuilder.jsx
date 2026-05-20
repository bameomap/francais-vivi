import { useState } from "react";
import { C } from "../constants.js";
import { SENTENCE_TOPICS } from "../data/sentenceData.js";
import { awardXP } from "../utils/xp.js";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const norm = s => s.trim().replace(/\s+/g, " ");

// ── Single question card ──────────────────────────────────────
function QuizCard({ sentence, topicColor, onNext, isLast }) {
  const [pool,    setPool]    = useState(() => shuffle(sentence.words.map((w, i) => ({ w, id: i }))));
  const [answer,  setAnswer]  = useState([]);
  const [checked, setChecked] = useState(false);

  const correct = norm(answer.map(t => t.w).join(" ")) === norm(sentence.fr);

  const pick   = t => { if (checked) return; setPool(p => p.filter(x => x.id !== t.id)); setAnswer(a => [...a, t]); };
  const remove = t => { if (checked) return; setAnswer(a => a.filter(x => x.id !== t.id)); setPool(p => [...p, t]); };
  const check  = () => { if (!answer.length) return; setChecked(true); if (correct) awardXP(3); };
  const reset  = () => { setPool(shuffle(sentence.words.map((w, i) => ({ w, id: i })))); setAnswer([]); setChecked(false); };

  return (
    <div style={{ animation:"fadeUp 0.25s ease" }}>

      {/* Vietnamese prompt */}
      <div style={{ background:`linear-gradient(135deg,${C.blueL},#f0f4ff)`, borderRadius:16, padding:"1.1rem 1.2rem", marginBottom:"1rem", textAlign:"center" }}>
        <div style={{ fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:2, color:C.gray, fontWeight:700, marginBottom:"0.4rem" }}>🇻🇳 Dịch sang tiếng Pháp</div>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.1rem", color:C.ink, fontWeight:700, lineHeight:1.5 }}>{sentence.vi}</div>
      </div>

      {/* Answer tray */}
      <div style={{ minHeight:52, background:C.white, border:`2px dashed ${checked?(correct?"#059669":C.red):C.blue+"55"}`, borderRadius:14, padding:"0.6rem 0.75rem", marginBottom:"0.75rem", display:"flex", flexWrap:"wrap", gap:"0.35rem", alignItems:"center", transition:"border-color 0.2s" }}>
        {answer.length === 0
          ? <span style={{ fontSize:"0.78rem", color:C.gray, fontStyle:"italic" }}>Nhấn từ bên dưới để ghép câu...</span>
          : answer.map(tile => (
            <button key={tile.id} onClick={() => remove(tile)} disabled={checked}
              style={{ padding:"0.35rem 0.7rem", background:checked?(correct?"#ECFDF5":"#FEF2F2"):C.blueL, border:`1.5px solid ${checked?(correct?"#059669":C.red):C.blue}`, borderRadius:20, fontSize:"0.88rem", color:checked?(correct?"#059669":C.red):C.blue, cursor:checked?"default":"pointer", fontFamily:"Georgia,serif", fontWeight:600 }}>
              {tile.w}
            </button>
          ))
        }
      </div>

      {/* Feedback */}
      {checked && (
        <div style={{ background:correct?"#ECFDF5":"#FEF2F2", border:`1.5px solid ${correct?"#059669":C.red}`, borderRadius:12, padding:"0.65rem 1rem", marginBottom:"0.75rem", animation:"fadeUp 0.2s ease" }}>
          {correct
            ? <div style={{ fontSize:"0.85rem", color:"#059669", fontWeight:700 }}>✓ Chính xác! +3 XP</div>
            : <>
                <div style={{ fontSize:"0.82rem", color:C.red, fontWeight:700, marginBottom:"0.2rem" }}>✗ Chưa đúng</div>
                <div style={{ fontSize:"0.72rem", color:C.gray }}>Đáp án:</div>
                <div style={{ fontFamily:"Georgia,serif", fontSize:"0.9rem", color:C.ink, fontWeight:600, marginTop:"0.1rem" }}>{sentence.fr}</div>
              </>
          }
        </div>
      )}

      {/* Word pool */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:"0.35rem", marginBottom:"1rem", minHeight:44 }}>
        {pool.map(tile => (
          <button key={tile.id} onClick={() => pick(tile)} disabled={checked}
            style={{ padding:"0.38rem 0.72rem", background:C.white, border:`1.5px solid ${C.border}`, borderRadius:20, fontSize:"0.88rem", color:C.ink, cursor:checked?"default":"pointer", fontFamily:"Georgia,serif", fontWeight:500, opacity:checked?0.4:1, transition:"opacity 0.2s" }}>
            {tile.w}
          </button>
        ))}
        {pool.length === 0 && !checked && (
          <span style={{ fontSize:"0.72rem", color:C.gray, fontStyle:"italic", alignSelf:"center" }}>Đã dùng hết từ — nhấn Kiểm tra!</span>
        )}
      </div>

      {/* Buttons */}
      <div style={{ display:"flex", gap:"0.5rem" }}>
        {!checked ? (
          <>
            <button onClick={reset}
              style={{ padding:"0.55rem 1rem", background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, borderRadius:12, fontSize:"0.82rem", cursor:"pointer" }}>
              ↺ Reset
            </button>
            <button onClick={check} disabled={!answer.length}
              style={{ flex:1, padding:"0.6rem", background:answer.length?C.blue:C.border, color:"#fff", border:"none", borderRadius:12, fontSize:"0.85rem", cursor:answer.length?"pointer":"default", fontWeight:700, transition:"background 0.15s" }}>
              Kiểm tra ✓
            </button>
          </>
        ) : (
          <>
            {!correct && (
              <button onClick={reset}
                style={{ padding:"0.55rem 1rem", background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, borderRadius:12, fontSize:"0.82rem", cursor:"pointer" }}>
                ↺ Thử lại
              </button>
            )}
            <button onClick={() => onNext(correct)}
              style={{ flex:1, padding:"0.6rem", background:correct?"#059669":topicColor, color:"#fff", border:"none", borderRadius:12, fontSize:"0.85rem", cursor:"pointer", fontWeight:700 }}>
              {isLast ? "Xem kết quả 🎉" : "Câu tiếp →"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────
export default function SentenceBuilder() {
  const [topicId, setTopicId] = useState(null);
  const [qIdx,    setQIdx]    = useState(0);
  const [score,   setScore]   = useState(0);
  const [done,    setDone]    = useState(false);

  const topic = SENTENCE_TOPICS.find(t => t.id === topicId);

  const startTopic = (id) => { setTopicId(id); setQIdx(0); setScore(0); setDone(false); };

  const handleNext = (wasCorrect) => {
    if (wasCorrect) setScore(s => s + 1);
    if (qIdx + 1 >= topic.sentences.length) setDone(true);
    else setQIdx(i => i + 1);
  };

  // ── Topic selection ──
  if (!topicId) return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      <div style={{ marginBottom:"1rem" }}>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.1rem", color:C.ink, fontWeight:700, marginBottom:"0.2rem" }}>🧩 Câu ghép từ</div>
        <div style={{ fontSize:"0.75rem", color:C.gray }}>Chọn chủ đề để luyện ghép câu tiếng Pháp</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.6rem" }}>
        {SENTENCE_TOPICS.map((t, i) => (
          <button key={t.id} onClick={() => startTopic(t.id)}
            style={{ background:C.white, border:`1.5px solid ${t.color}33`, borderRadius:16, padding:"1rem 0.9rem", textAlign:"left", cursor:"pointer", fontFamily:"inherit", animation:`fadeUp 0.25s ease ${i*0.04}s both`, transition:"all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 4px 16px ${t.color}22`; }}
            onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
            <div style={{ fontSize:"1.5rem", marginBottom:"0.4rem" }}>{t.icon}</div>
            <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"0.88rem", color:C.ink, fontWeight:700, marginBottom:"0.1rem" }}>{t.label}</div>
            <div style={{ fontSize:"0.65rem", color:t.color, fontWeight:600 }}>{t.sentences.length} câu</div>
          </button>
        ))}
      </div>
    </div>
  );

  // ── Done screen ──
  if (done) {
    const pct = Math.round(score / topic.sentences.length * 100);
    return (
      <div style={{ padding:"1.5rem 1rem", animation:"fadeUp 0.3s ease" }}>
        <div style={{ textAlign:"center", marginBottom:"1.25rem" }}>
          <div style={{ fontSize:"3rem", marginBottom:"0.5rem" }}>{pct>=80?"🎉":pct>=50?"👍":"💪"}</div>
          <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.4rem", color:C.ink, fontWeight:700, marginBottom:"0.2rem" }}>
            {score}/{topic.sentences.length} câu đúng
          </div>
          <div style={{ fontSize:"0.82rem", color:C.gray }}>{pct}% · {topic.label}</div>
        </div>
        <div style={{ display:"flex", gap:"0.5rem" }}>
          <button onClick={() => setTopicId(null)}
            style={{ flex:1, padding:"0.7rem", background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, borderRadius:12, fontSize:"0.85rem", cursor:"pointer" }}>
            ← Chủ đề khác
          </button>
          <button onClick={() => startTopic(topicId)}
            style={{ flex:1, padding:"0.7rem", background:topic.color, color:"#fff", border:"none", borderRadius:12, fontSize:"0.85rem", cursor:"pointer", fontWeight:700 }}>
            🔄 Làm lại
          </button>
        </div>
      </div>
    );
  }

  // ── Quiz ──
  const progress = (qIdx / topic.sentences.length) * 100;
  return (
    <div style={{ padding:"1rem", animation:"fadeUp 0.3s ease" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"0.85rem" }}>
        <button onClick={() => setTopicId(null)}
          style={{ background:"transparent", border:`1.5px solid ${C.border}`, color:C.gray, borderRadius:20, padding:"0.2rem 0.65rem", fontSize:"0.7rem", cursor:"pointer" }}>
          ← Quay lại
        </button>
        <span style={{ fontSize:"0.95rem" }}>{topic.icon}</span>
        <span style={{ fontWeight:700, color:topic.color, fontSize:"0.88rem", flex:1 }}>{topic.label}</span>
        <span style={{ fontSize:"0.72rem", color:C.gray }}>{qIdx+1}/{topic.sentences.length}</span>
        <span style={{ fontSize:"0.72rem", color:"#059669", fontWeight:700 }}>✓ {score}</span>
      </div>
      <div style={{ height:4, background:C.border, borderRadius:999, marginBottom:"1rem", overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${progress}%`, background:topic.color, borderRadius:999, transition:"width 0.4s ease" }}/>
      </div>
      <QuizCard
        key={qIdx}
        sentence={topic.sentences[qIdx]}
        topicColor={topic.color}
        onNext={handleNext}
        isLast={qIdx + 1 >= topic.sentences.length}
      />
    </div>
  );
}
