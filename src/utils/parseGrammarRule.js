// Converts Édito A1's plain-text `rule` strings (src/data/editoGrammar.js)
// into the same structured `blocks` shape used by Édito A2's hand-authored
// grammar (see GrammarBlocks.jsx). Content is never rewritten — only its
// existing conventions (PHẦN headers, • bullets, ⚠️/💡 lines, ✅/❌ pairs,
// "X | Y" tables) are recognised and reshaped into real boxes/tables/lists
// instead of a flat column of same-size lines.

const ICON_RE = /^[⚠️✅❌\u{1F4A1}•]+\s*/u;
const stripIcon = (t) => t.replace(ICON_RE, "").trim();

const isHeading = (t) =>
  /^PHẦN\s*\d+/i.test(t) ||
  (t.length > 3 && t === t.toUpperCase() && /[A-ZÀ-Ỹ]/.test(t));

// A short line ending in ":" that isn't itself a bullet/numbered item reads
// as a sub-heading even when it mixes upper/lowercase (e.g. "BẢNG CHIA (présent):").
const isSubHeading = (t) =>
  t.endsWith(":") && t.length < 70 && !t.startsWith("•") && !/^\d+\.\s/.test(t) && !isHeading(t);

const isWarn     = (t) => t.startsWith("⚠️") || t.startsWith("⚠");
const isTip      = (t) => t.startsWith("💡");
const isOk       = (t) => t.startsWith("✅");
const isBad      = (t) => t.startsWith("❌");
const isBullet   = (t) => t.startsWith("•");
const isNumbered = (t) => /^\d+\.\s/.test(t);
const isPipeRow  = (t) => t.includes("|") && t.includes("·");
const isBreakLine = (t) =>
  isWarn(t) || isTip(t) || isOk(t) || isBad(t) || isBullet(t) || isNumbered(t) ||
  isHeading(t) || isSubHeading(t) || isPipeRow(t);

export function parseRuleToBlocks(rule) {
  if (!rule) return [];
  const lines = rule.split("\n");
  const blocks = [];
  let i = 0;
  let leadUsed = false;

  while (i < lines.length) {
    const t = lines[i].trim();
    if (!t) { i++; continue; }

    // "✅ right.  ❌ wrong." on one line
    if (isOk(t) && t.includes("❌")) {
      const badIdx = t.indexOf("❌");
      const right = t.slice(0, badIdx).replace(/^✅\s*/, "").trim();
      const wrong = t.slice(badIdx).replace(/^❌\s*/, "").trim();
      blocks.push({ type:"compare", items:[{ wrong, right }] });
      i++; continue;
    }

    // A run of ✅/❌ lines — pair them up in the order they complete a pair.
    if (isOk(t) || isBad(t)) {
      const items = [];
      let wrong = null, right = null;
      while (i < lines.length) {
        const t2 = lines[i].trim();
        if (!t2) break;
        if (isOk(t2)) right = stripIcon(t2);
        else if (isBad(t2)) wrong = stripIcon(t2);
        else break;
        i++;
        if (wrong && right) { items.push({ wrong, right }); wrong = null; right = null; }
      }
      if (items.length) blocks.push({ type:"compare", items });
      if (right) blocks.push({ type:"callout", variant:"ok",  title:"Đúng", text:right });
      if (wrong) blocks.push({ type:"callout", variant:"bad", title:"Sai",  text:wrong });
      continue;
    }

    if (isWarn(t)) {
      const parts = [];
      while (i < lines.length && isWarn(lines[i].trim())) { parts.push(stripIcon(lines[i].trim())); i++; }
      blocks.push({ type:"callout", variant:"warn", title:"Lưu ý", text:parts.join("\n") });
      continue;
    }

    if (isTip(t)) {
      const parts = [];
      while (i < lines.length && isTip(lines[i].trim())) { parts.push(stripIcon(lines[i].trim())); i++; }
      blocks.push({ type:"callout", variant:"tip", title:"Mẹo", text:parts.join("\n") });
      continue;
    }

    if (isBullet(t) || isNumbered(t)) {
      const items = [];
      while (i < lines.length) {
        const t2 = lines[i].trim();
        if (!t2) break;
        if (isBullet(t2)) { items.push(stripIcon(t2)); i++; }
        else if (isNumbered(t2)) { items.push(t2); i++; }
        else break;
      }
      blocks.push({ type:"list", items });
      continue;
    }

    if (isHeading(t)) { blocks.push({ type:"heading", text:t.replace(/:$/, "") }); i++; continue; }
    if (isSubHeading(t)) { blocks.push({ type:"heading", text:t }); i++; continue; }

    // "vietnamien · vietnamienne | japonais · japonaise" style rows
    if (isPipeRow(t)) {
      const rows = [];
      while (i < lines.length) {
        const t2 = lines[i].trim();
        if (!t2 || !isPipeRow(t2)) break;
        rows.push(t2.split("|").flatMap(cell => cell.split("·").map(s => s.trim())));
        i++;
      }
      const colCount = Math.max(...rows.map(r => r.length));
      const headers = colCount === 4 ? ["Nam", "Nữ", "Nam", "Nữ"]
        : colCount === 2 ? ["Nam", "Nữ"]
        : rows[0].map((_, idx) => `Cột ${idx + 1}`);
      blocks.push({ type:"table", headers, rows });
      continue;
    }

    // Plain prose — merge consecutive plain lines into one paragraph.
    {
      const parts = [];
      while (i < lines.length) {
        const t2 = lines[i].trim();
        if (!t2 || isBreakLine(t2)) break;
        parts.push(t2);
        i++;
      }
      blocks.push({ type: leadUsed ? "text" : "lead", text: parts.join(" ") });
      leadUsed = true;
    }
  }

  return blocks;
}
