#!/usr/bin/env python3
"""Pull the S'ENTRAÎNER listening exercices (p.28–37) out of the book.

These pages defeat `pdftotext`, with or without -layout: the question, its three
choices and its points sit in separate flows, so the plain text comes out with
every "c." choice pooled at the foot of the page, far from its question. Reading
the geometry instead is straightforward, because the layout is rigidly gridded —
a question stem at the left margin, then its choices on one horizontal band at
x ≈ 63 / 188 / 314.

Answers come from the Corrigés (p.146–147), which for these exercices print the
letter as well as the text ("1. b. Louis."), so a parse that drifted shows up
immediately as a letter/text mismatch rather than passing silently.

    python3 scripts/delf-a1-parse-co-train.py > /tmp/co-train.json
"""

import argparse
import json
import re
import sys
from pathlib import Path
from importlib.machinery import SourceFileLoader

HERE = Path(__file__).resolve().parent
_prep = SourceFileLoader("delf_prep", str(HERE / "delf-a1-parse-co.py")).load_module()
lines_of, page_text, clean, key_of = _prep._text._crop.lines_of, _prep.page_text, _prep.clean, _prep.key_of

# Defaults cover S'ENTRAÎNER; the épreuves blanches have the same layout on
# other pages, so the ranges are arguments rather than constants.
TRAIN_PAGES  = range(28, 38)      # S'ENTRAÎNER, compréhension de l'oral
ANSWER_PAGES = range(146, 148)    # CORRIGÉS
SCRIPT_PAGES = range(132, 144)    # TRANSCRIPTIONS
PREFIX       = "co-ex"            # id prefix for picture-choice crops

EX_HEAD  = re.compile(r"^Exercice (\d+)$")

# The drills number questions "1 - …" and label choices "a." "b." "c."; the
# épreuves blanches use "1. …" with capital letters. Same grid either way.
STYLES = {
    "drill": (re.compile(r"^(\d+)\s*-\s*(.+)$"),
              re.compile(r"^([abc])\.\s*(?:A\s*)?(.*)$")),
    "blanc": (re.compile(r"^(\d+)\s*\.\s*(.+)$"),
              re.compile(r"^([ABC])\.\s*(.*)$")),
}
STEM, CHOICE = STYLES["drill"]
BAND     = 4.0                    # points; choices on one row share a baseline
CONSIGNE = re.compile(r"^(Lisez les questions|Vous (allez )?(écoutez|entendez|écouter))", re.I)
TIP      = "•u"  # the bullet glyphs the method notes start with


def merge_row(row):
    """Stitch a horizontal band of fragments back into whole choices.

    The choice letter is sometimes typeset apart from its text ("b." at x=188,
    "18 h 30." at x=212), which arrives as two lines on the same baseline.
    """
    row = sorted(row, key=lambda l: l[1])
    out = []
    for text, x0, _y0, _x1, _y1 in row:
        text = clean(text)
        if not text:
            continue
        m = CHOICE.match(text)
        if m:
            out.append([m.group(1), m.group(2).strip()])
        elif out and not out[-1][1]:
            out[-1][1] = text          # the orphaned text of the previous letter
        elif out:
            out[-1][1] = f"{out[-1][1]} {text}".strip()
    return [(letter.lower(), clean(re.sub(r"^A\s+", "", txt))) for letter, txt in out if txt]


def rows_of(page):
    """Page lines grouped into horizontal bands."""
    bands = []
    for line in lines_of(page):
        for b in bands:
            if abs(b[0][2] - line[2]) <= BAND:
                b.append(line)
                break
        else:
            bands.append([line])
    return sorted(bands, key=lambda b: b[0][2])


def parse_train():
    items, cur, stem, pts = [], None, None, None

    for page in TRAIN_PAGES:
        for band in rows_of(page):
            band = sorted(band, key=lambda l: l[1])
            texts = [clean(t) for t, *_ in band]
            first = texts[0]

            m = EX_HEAD.match(first)
            if m:
                cur = {"num": int(m.group(1)), "page": page, "consigne": "", "questions": []}
                items.append(cur)
                stem = None
                continue
            if cur is None:
                continue

            if not cur["consigne"] and CONSIGNE.match(first):
                cur["consigne"] = " ".join(texts).strip()
                continue

            sm = STEM.match(first)
            if sm:
                stem = clean(sm.group(2))
                # The points sit at the right margin of the same band.
                pts = next((clean(t).replace(" point", "").replace("s", "")
                            for t in texts[1:] if "point" in t), None)
                continue

            # A row of bare "a." "b." "c." and NOTHING else is a picture
            # question: the choices are drawings, and only their labels are
            # text. The "nothing else" matters — in the épreuves blanches a
            # normal choice sets its letter and its wording as two pieces on the
            # same baseline, so a bare-label count alone would call every
            # question a picture one.
            bare = [t for t in texts if re.fullmatch(r"[abcABC]\.(\s*A)?", t)]
            if stem and len(bare) >= 2 and len(bare) == len([t for t in texts if t]):
                cur["questions"].append({
                    "q": stem, "kind": "image", "pts": pts,
                    "crop": f"{PREFIX}{cur['num']}-q{len(cur['questions']) + 1}",
                })
                stem, pts = None, None
                continue

            choices = merge_row(band)
            if stem and len(choices) >= 2:
                cur["questions"].append({
                    "q": stem,
                    "letters": [c[0] for c in choices],
                    "options": [c[1] for c in choices],
                    "pts": pts,
                })
                stem, pts = None, None
    return items


# The drills key answers as "1. b. Louis."; the épreuves blanches use capitals.
ANS = re.compile(r"(\d+)\s*\.\s*([abcABC])\s*\.\s*(.+?)(?=\s+\d+\s*\.\s*[abcABC]\s*\.|$)")


def parse_answers():
    """{exercice: [(letter, text), …]} from the corrigés."""
    raw = "\n".join(page_text(p) for p in ANSWER_PAGES)
    out, cur, buf = {}, None, []
    for line in raw.split("\n"):
        m = re.match(r"Exercice (\d+), p\.\s*(\d+)", line.strip())
        if m:
            if cur:
                out[cur] = buf
            page = int(m.group(2))
            cur, buf = (int(m.group(1)) if page in TRAIN_PAGES else None), []
            continue
        if cur:
            buf.extend(ANS.findall(clean(line)))
    if cur:
        out[cur] = buf
    return {k: [(l.lower(), clean(t)) for _n, l, t in v] for k, v in out.items()}


def parse_scripts():
    """{exercice: (piste, transcript)} from the transcriptions."""
    raw = "\n".join(page_text(p) for p in SCRIPT_PAGES)
    out, cur, buf, piste = {}, None, [], None
    for line in raw.split("\n"):
        m = re.match(r"Exercice (\d+), p\.\s*(\d+),\s*PISTE\s*(\d+)", line.strip())
        if m:
            if cur:
                out[cur] = (piste, "\n".join(buf).strip())
            page = int(m.group(2))
            cur = int(m.group(1)) if page in TRAIN_PAGES else None
            piste, buf = int(m.group(3)), []
            continue
        if cur:
            buf.append(line.rstrip())
    if cur:
        out[cur] = (piste, "\n".join(buf).strip())
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--pages", help="exercice pages, e.g. 112-114")
    ap.add_argument("--answers", help="corrigés pages, e.g. 156-157")
    ap.add_argument("--scripts", help="transcription pages, e.g. 142-143")
    ap.add_argument("--style", choices=list(STYLES), default="drill")
    ap.add_argument("--prefix", default="co-ex", help="id prefix for picture crops")
    args = ap.parse_args()

    def rng(spec, fallback):
        if not spec:
            return fallback
        lo, _, hi = spec.partition("-")
        return range(int(lo), int(hi or lo) + 1)

    global TRAIN_PAGES, ANSWER_PAGES, SCRIPT_PAGES, STEM, CHOICE, PREFIX
    TRAIN_PAGES  = rng(args.pages, TRAIN_PAGES)
    ANSWER_PAGES = rng(args.answers, ANSWER_PAGES)
    SCRIPT_PAGES = rng(args.scripts, SCRIPT_PAGES)
    STEM, CHOICE = STYLES[args.style]
    PREFIX = args.prefix

    items   = parse_train()
    answers = parse_answers()
    scripts = parse_scripts()

    kept, skipped = [], []
    for it in items:
        n, qs = it["num"], it["questions"]
        ans = answers.get(n)
        piste, transcript = scripts.get(n, (None, ""))

        if not qs or piste is None:
            skipped.append({"num": n, "why": "no questions or no track", "q": len(qs)})
            continue

        # Exercices 1, 4, 7 and 10 are the book's worked examples: printed with
        # the answers already ticked and a method note under each question, so
        # the corrigés skip them. Nothing to key against, so they are dropped
        # here rather than shipped unanswerable.
        if not ans:
            skipped.append({"num": n, "why": "worked example, no key", "q": len(qs)})
            continue
        if len(ans) != len(qs):
            skipped.append({"num": n, "why": f"{len(qs)}q vs {len(ans)}a", "q": len(qs)})
            continue

        bad = []
        for q, (letter, text) in zip(qs, ans):
            if q.get("kind") == "image":
                # Only the letter is usable — the choices are drawings, and the
                # wording in the corrigés describes them rather than quoting them.
                q["answer"] = letter.upper()
                q["describes"] = text
                continue
            # The corrigés give both the letter and the wording; requiring them
            # to agree catches a drifted parse instead of trusting it.
            by_letter = dict(zip(q["letters"], q["options"])).get(letter)
            hit = next((o for o in q["options"] if key_of(o) == key_of(text)), None)
            if hit and by_letter and key_of(hit) == key_of(by_letter):
                q["answer"] = hit
            else:
                bad.append((q["q"], letter, text, q["options"]))
            q.pop("letters", None)

        if bad:
            skipped.append({"num": n, "why": "answer/letter mismatch", "detail": bad[:2]})
            continue

        kept.append({"num": n, "page": it["page"], "piste": piste,
                     "consigne": it["consigne"], "transcript": transcript,
                     "questions": qs})

    json.dump({"exercices": kept, "skipped": skipped}, sys.stdout, ensure_ascii=False, indent=1)
    print(f"\n# parsed {len(kept)}, skipped {len(skipped)}", file=sys.stderr)
    for s in skipped:
        print(f"#  skip Exercice {s['num']}: {s['why']}", file=sys.stderr)
        for d in s.get("detail", []):
            print(f"#     {d}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
