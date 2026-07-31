import { C } from "../constants.js";
import SpeakBtn from "./ui/SpeakBtn.jsx";

// Renders the structured `blocks` array of an A2 grammar point.
// Block types: lead · heading · text · formula · cards · table · pairs · compare · callout · timeline
// Data lives in src/data/editoGrammarA2.js.

// Minimal inline markup so prose can emphasise a word without extra block types:
// **bold** and *italic*. Anything else is rendered as-is.
function RichText({ text, style }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return (
    <span style={style}>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**")) return <b key={i} style={{ color:C.ink }}>{p.slice(2, -2)}</b>;
        if (p.startsWith("*")  && p.endsWith("*"))  return <i key={i} style={{ color:C.blue }}>{p.slice(1, -1)}</i>;
        return <span key={i}>{p}</span>;
      })}
    </span>
  );
}

// A French sentence + its Vietnamese meaning, with a listen button.
function ExampleRow({ fr, vi, compact = false }) {
  return (
    <div style={{ display:"flex", alignItems:"flex-start", gap:6, padding: compact ? "5px 0" : "7px 0" }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontFamily:"Georgia,serif", fontSize:13.5, color:C.blue, lineHeight:1.5 }}>{fr}</div>
        {vi && <div style={{ fontSize:12, color:C.gray, lineHeight:1.5, marginTop:1 }}>{vi}</div>}
      </div>
      <SpeakBtn text={fr} size="sm" />
    </div>
  );
}

// Must be read at render time, not module scope: applyTheme() mutates `C` in
// place, so values captured at import would stay frozen on the light theme.
const calloutStyle = (variant) => ({
  warn: { bg:C.goldL,  border:C.gold,  fg:C.gold,     icon:"⚠️" },
  tip:  { bg:C.greenL, border:C.green, fg:C.green,    icon:"💡" },
  note: { bg:C.blueL,  border:C.blue,  fg:C.blueDark, icon:"📌" },
}[variant] || { bg:C.blueL, border:C.blue, fg:C.blueDark, icon:"📌" });

function Block({ block }) {
  const b = block;

  switch (b.type) {

    case "lead":
      return (
        <div style={{ borderLeft:`3px solid ${C.blue}`, paddingLeft:12, margin:"2px 0 4px" }}>
          <RichText text={b.text} style={{ fontSize:14, color:C.ink2, lineHeight:1.75 }} />
        </div>
      );

    case "heading":
      return (
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:15, fontWeight:700, color:C.ink, lineHeight:1.3, marginTop:6 }}>
          {b.text}
        </div>
      );

    case "text":
      return <RichText text={b.text} style={{ fontSize:13.5, color:C.ink2, lineHeight:1.75 }} />;

    case "formula":
      return (
        <div style={{ background:C.cream, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"12px 14px" }}>
          <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:6 }}>
            {b.parts.map((p, i) => (
              <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:6 }}>
                {i > 0 && <span style={{ color:C.gray2, fontSize:15, fontWeight:700 }}>+</span>}
                <span style={{ background:C.white, border:`1.5px solid ${C.blue}44`, color:C.blue,
                  borderRadius:9, padding:"5px 10px", fontSize:12.5, fontWeight:700, whiteSpace:"nowrap" }}>
                  {p}
                </span>
              </span>
            ))}
          </div>
          {b.example && (
            <div style={{ marginTop:10, paddingTop:9, borderTop:`1px dashed ${C.border}` }}>
              <span style={{ fontFamily:"Georgia,serif", fontSize:13.5, color:C.ink }}>{b.example}</span>
            </div>
          )}
          {b.note && (
            <div style={{ fontSize:11.5, color:C.gray, lineHeight:1.6, marginTop:7 }}>{b.note}</div>
          )}
        </div>
      );

    case "cards":
      return (
        <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
          {/* Border sides are listed individually: mixing the `border` shorthand
              with `borderLeft` in one style object makes React warn. */}
          {b.items.map((it, i) => (
            <div key={i} style={{ background:C.white,
              borderTop:`1.5px solid ${C.border}`, borderRight:`1.5px solid ${C.border}`,
              borderBottom:`1.5px solid ${C.border}`, borderLeft:`4px solid ${it.color}`,
              borderRadius:13, padding:"11px 13px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:7 }}>
                <span style={{ flexShrink:0, width:22, height:22, borderRadius:"50%", background:it.color,
                  color:"#fff", fontSize:11.5, fontWeight:800,
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {it.badge}
                </span>
                <span style={{ fontSize:13.5, fontWeight:700, color:C.ink, lineHeight:1.35 }}>{it.title}</span>
              </div>
              {it.lines?.map((l, j) => (
                <div key={j} style={{ fontSize:12.5, color:C.ink2, lineHeight:1.7, marginBottom:3 }}>{l}</div>
              ))}
              {it.examples?.length > 0 && (
                <div style={{ marginTop:7, paddingTop:5, borderTop:`1px dashed ${C.border}` }}>
                  {it.examples.map((ex, j) => <ExampleRow key={j} fr={ex.fr} vi={ex.vi} compact />)}
                </div>
              )}
            </div>
          ))}
        </div>
      );

    case "table":
      return (
        <div>
          {b.caption && (
            <div style={{ fontSize:11.5, fontWeight:700, color:C.gray, marginBottom:6 }}>{b.caption}</div>
          )}
          {/* Wide tables scroll inside their own box so the page never scrolls sideways */}
          <div style={{ overflowX:"auto", border:`1.5px solid ${C.border}`, borderRadius:12, background:C.white }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12.5, minWidth:280 }}>
              <thead>
                <tr style={{ background:C.cream }}>
                  {b.headers.map((h, i) => (
                    <th key={i} style={{ textAlign:"left", padding:"8px 10px", fontSize:11,
                      fontWeight:700, color:C.gray, textTransform:"uppercase", letterSpacing:"0.06em",
                      borderBottom:`1.5px solid ${C.border}`, whiteSpace:"nowrap" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 ? C.paper : C.white }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding:"8px 10px", color: j === 0 ? C.ink : C.ink2,
                        fontWeight: j === 0 ? 600 : 400, lineHeight:1.55,
                        fontFamily: j > 0 ? "Georgia,serif" : "inherit",
                        borderBottom: i < b.rows.length - 1 ? `1px solid ${C.borderSoft}` : "none" }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case "pairs":
      return (
        <div>
          {b.caption && (
            <div style={{ fontSize:11.5, fontWeight:700, color:C.gray, marginBottom:4 }}>{b.caption}</div>
          )}
          <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"4px 12px" }}>
            {b.items.map((ex, i) => (
              <div key={i} style={{ borderBottom: i < b.items.length - 1 ? `1px solid ${C.borderSoft}` : "none" }}>
                <ExampleRow fr={ex.fr} vi={ex.vi} />
              </div>
            ))}
          </div>
        </div>
      );

    case "compare":
      return (
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {b.items.map((it, i) => (
            <div key={i} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"8px 11px", background:C.redL }}>
                <span style={{ fontSize:12, flexShrink:0 }}>❌</span>
                <span style={{ fontFamily:"Georgia,serif", fontSize:13, color:C.red, textDecoration:"line-through", lineHeight:1.5 }}>
                  {it.wrong}
                </span>
              </div>
              <div style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"8px 11px", background:C.greenL }}>
                <span style={{ fontSize:12, flexShrink:0 }}>✅</span>
                <span style={{ fontFamily:"Georgia,serif", fontSize:13, color:C.green, fontWeight:600, lineHeight:1.5 }}>
                  {it.right}
                </span>
              </div>
              {it.why && (
                <div style={{ padding:"7px 11px", fontSize:11.5, color:C.gray, lineHeight:1.6, borderTop:`1px solid ${C.border}` }}>
                  → {it.why}
                </div>
              )}
            </div>
          ))}
        </div>
      );

    case "callout": {
      const s = calloutStyle(b.variant);
      return (
        <div style={{ background:s.bg, borderLeft:`4px solid ${s.border}`, borderRadius:"0 12px 12px 0", padding:"10px 13px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:4 }}>
            <span style={{ fontSize:13 }}>{s.icon}</span>
            <span style={{ fontSize:12.5, fontWeight:700, color:s.fg }}>{b.title}</span>
          </div>
          {String(b.text).split("\n").map((line, i) => (
            <div key={i} style={{ fontSize:12.5, color:C.ink2, lineHeight:1.7, paddingLeft:20 }}>
              <RichText text={line} />
            </div>
          ))}
        </div>
      );
    }

    case "timeline":
      return (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {b.items.map((it, i) => (
            <div key={i} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:13, overflow:"hidden" }}>
              <div style={{ display:"flex", alignItems:"center", gap:9, padding:"9px 12px", background:`${it.color}14`, borderBottom:`1px solid ${C.border}` }}>
                <span style={{ fontFamily:"Georgia,serif", fontSize:14.5, fontWeight:700, color:it.color }}>{it.key}</span>
                <span style={{ fontSize:10, fontWeight:800, color:it.color, letterSpacing:"0.08em",
                  background:C.white, border:`1px solid ${it.color}55`, borderRadius:20, padding:"2px 8px" }}>
                  {it.label}
                </span>
              </div>
              <div style={{ padding:"9px 12px" }}>
                <div style={{ fontSize:12.5, color:C.ink2, lineHeight:1.7 }}>{it.meaning}</div>
                <div style={{ fontSize:11.5, color:C.gray, lineHeight:1.6, marginTop:4, fontStyle:"italic" }}>
                  ❓ {it.question}
                </div>
                {it.example && (
                  <div style={{ marginTop:6, paddingTop:5, borderTop:`1px dashed ${C.border}` }}>
                    <ExampleRow fr={it.example.fr} vi={it.example.vi} compact />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}

export default function GrammarBlocks({ blocks }) {
  if (!blocks?.length) return null;
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      {blocks.map((b, i) => <Block key={i} block={b} />)}
    </div>
  );
}
