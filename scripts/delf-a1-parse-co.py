#!/usr/bin/env python3
"""Pull the Compréhension de l'oral drills (p.12–27) out of the book.

The SE PRÉPARER activités are uniform enough to read mechanically: a heading,
a consigne, then question lines whose three choices are separated by the
checkbox glyph, which extracts as a bare "A". Typing 58 activités by hand
would invite exactly the kind of silent transcription error that makes a
learning app worse than useless, so they are parsed and then reviewed.

Answers and transcripts come from the Corrigés (p.144–146) and Transcriptions
(p.132–143), matched on the "Activité N, p. X" headings the book prints there.

Activités whose answer is a matching table or an image (reliez…, notez le
numéro sous l'image) can't be expressed as multiple choice; they are reported
as skipped so they can be handled deliberately rather than mangled.

    python3 scripts/delf-a1-parse-co.py > /tmp/co.json
"""

import json
import re
import subprocess
import sys
from pathlib import Path
from importlib.machinery import SourceFileLoader

HERE = Path(__file__).resolve().parent
_text = SourceFileLoader("delf_text", str(HERE / "delf-a1-text.py")).load_module()
page_text = _text.page_text
locate = _text._crop.locate


def layout_text(page):
    """`pdftotext -layout` for one page.

    The drill pages are single-column with the three choices ruled across the
    line, so preserving the physical layout keeps each question with its own
    choices. (The corrigés are the opposite case — two columns that only read
    correctly once split, which is what page_text is for.)
    """
    pdf, n = locate(page)
    return subprocess.run(["pdftotext", "-layout", "-f", str(n), "-l", str(n), str(pdf), "-"],
                          capture_output=True, text=True, check=True).stdout

PREPARE_PAGES = range(12, 28)      # SE PRÉPARER for the listening paper
ANSWER_PAGES  = range(144, 147)    # CORRIGÉS, compréhension de l'oral
SCRIPT_PAGES  = range(132, 144)    # TRANSCRIPTIONS

HEAD   = re.compile(r"^Activité (\d+)\b")
LEAD   = re.compile(r"^(Message n[°o] ?\d+|Document n[°o] ?\d+|Dialogue n[°o] ?\d+)\s*:?\s*(.*)$")
# The checkbox glyph extracts as a lone "A"; three of them fence the choices.
CHOICE = re.compile(r"(?:^|\s)A\s+")

# Consignes that describe something a multiple-choice card can't hold.
UNSUPPORTED = re.compile(r"reliez|associez|sous l'image|sous chaque image|notez le num|complétez",
                         re.IGNORECASE)


def clean(s):
    return re.sub(r"\s+", " ", s).replace("’", "'").strip()


def key_of(s):
    """Compare an answer to a choice ignoring the book's typographic noise.

    The corrigés sometimes reprint the checkbox glyph in front of the answer,
    so "A Au musée." and "Au musée." are the same answer.
    """
    s = clean(s)
    s = re.sub(r"^A\s+", "", s)
    return s.lower().rstrip(". ")


def split_choices(line):
    """['Julie.', 'Julien.', 'Virginie.'] from 'A Julie. A Julien. A Virginie.'"""
    parts = [clean(p) for p in CHOICE.split(line) if clean(p)]
    return parts


def parse_prepare():
    raw = "\n".join(layout_text(p) for p in PREPARE_PAGES)
    lines = [clean(l) for l in raw.split("\n")]

    items, cur = [], None
    for line in lines:
        if not line:
            continue
        m = HEAD.match(line)
        if m:
            cur = {"num": int(m.group(1)), "consigne": "", "rows": []}
            items.append(cur)
            continue
        if cur is None:
            continue
        if not cur["consigne"]:
            # First line after the heading is the instruction, unless the
            # heading line already ran into it.
            if line.lower().startswith(("écoutez", "ecoutez", "vous ")):
                cur["consigne"] = line
                continue
        cur["rows"].append(line)

    out = []
    for it in items:
        rows, questions, lead, pending = it["rows"], [], None, None
        for row in rows:
            lm = LEAD.match(row)
            if lm:
                lead, row = lm.group(1), lm.group(2)
                if not row:
                    pending = None
                    continue
            n_marks = len(CHOICE.findall(" " + row))
            if n_marks >= 2:
                # A row is either "question A x. A y. A z." or the choices on
                # their own under the question. Splitting on the marker puts the
                # stem first — empty when the row is choices only, which is why
                # this can't just partition on the first " A ".
                parts = CHOICE.split(" " + row)
                stem, choices = clean(parts[0]), [clean(p) for p in parts[1:] if clean(p)]
                if not stem and pending:
                    stem, pending = pending, None
                if stem and len(choices) >= 2:
                    questions.append({"lead": lead, "q": stem, "options": choices})
            elif row.endswith("?") or row.endswith(":"):
                pending = row.rstrip(":").strip()
        it["questions"] = questions
        out.append(it)
    return out


def parse_keyed(pages, key=r"Activité (\d+), p\.\s*(\d+)"):
    """{activity number: the block of text printed under its heading}.

    The heading also carries the page the activité is on, which is the only
    place that number appears in machine-readable form.
    """
    global PAGE_OF
    raw = "\n".join(page_text(p) for p in pages)
    blocks, cur, buf = {}, None, []
    for line in raw.split("\n"):
        m = re.match(key, line.strip())
        if m:
            if cur is not None:
                blocks[cur] = "\n".join(buf).strip()
            cur, buf = int(m.group(1)), []
            # The transcriptions section also carries "Activité N, p. 96"
            # headings for the speaking paper, whose numbering restarts. Only
            # believe a page that falls inside the listening drills.
            if m.lastindex and m.lastindex >= 2 and m.group(2).isdigit():
                page = int(m.group(2))
                if page in PREPARE_PAGES:
                    PAGE_OF[cur] = page
            continue
        if cur is not None:
            buf.append(line.rstrip())
    if cur is not None:
        blocks[cur] = "\n".join(buf).strip()
    return blocks


PAGE_OF = {}

ANSWER = re.compile(r"\b(\d{1,2})\s*[:.]\s*(.+?)(?=\s+\d{1,2}\s*[:.]\s|$)")


def answer_lines(block):
    """Split a corrigés block into its numbered answers.

    The book sets these inconsistently — one per line for long answers, but run
    together as "1 : 15 h 40. – 2 : 9 h 45." when they are short. Rather than
    guess, take every "N : …" and only trust the result if the numbers come out
    as 1, 2, 3…; anything else falls back to one answer per line, and a count
    mismatch against the questions makes the caller skip the activité.
    """
    flat = clean(block.replace("\n", " "))
    pairs = ANSWER.findall(flat)
    if pairs and [int(n) for n, _ in pairs] == list(range(1, len(pairs) + 1)):
        return [clean(a).rstrip("–- ") for _, a in pairs]
    return [clean(l) for l in block.split("\n") if clean(l) and not clean(l).isdigit()]


def main():
    items    = parse_prepare()
    answers  = parse_keyed(ANSWER_PAGES)
    scripts  = parse_keyed(SCRIPT_PAGES, r"Activité (\d+), p\.\s*(\d+),\s*PISTE\s*\d+")

    result, skipped = [], []
    for it in items:
        n = it["num"]
        ans = answer_lines(answers.get(n, ""))
        qs  = it["questions"]

        if UNSUPPORTED.search(it["consigne"]) or not qs or len(ans) != len(qs):
            skipped.append({"num": n, "consigne": it["consigne"],
                            "questions": len(qs), "answers": len(ans)})
            continue

        for q, a in zip(qs, ans):
            # The corrigés spell the answer out; match it back to a choice so
            # the data carries the option text, not a letter.
            hit = next((o for o in q["options"] if key_of(o) == key_of(a)), None)
            q["answer"] = hit or a
            q["exact"]  = hit is not None

        # An answer that doesn't match any printed choice means the parse drifted
        # somewhere in this activité. Ship it and the learner gets marked wrong
        # for a right answer, so drop the whole activité instead.
        if not all(q["exact"] for q in qs):
            skipped.append({"num": n, "consigne": it["consigne"],
                            "questions": len(qs), "answers": len(ans),
                            "why": "answer not among the choices"})
            continue

        result.append({"num": n, "piste": n, "page": PAGE_OF.get(n),
                       "consigne": it["consigne"],
                       "transcript": scripts.get(n, ""), "questions": qs})

    json.dump({"activites": result, "skipped": skipped}, sys.stdout,
              ensure_ascii=False, indent=1)
    print(f"\n# parsed {len(result)}, skipped {len(skipped)}", file=sys.stderr)
    fuzzy = [(r['num'], q['q']) for r in result for q in r['questions'] if not q['exact']]
    print(f"# answers not matched to a choice: {len(fuzzy)}", file=sys.stderr)
    for f in fuzzy[:20]:
        print("#   ", f, file=sys.stderr)
    for s in skipped:
        print(f"#  skip Activité {s['num']}: {s['questions']}q/{s['answers']}a — {s['consigne'][:60]}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
