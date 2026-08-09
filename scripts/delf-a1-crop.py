#!/usr/bin/env python3
"""Crop illustrations out of « Le DELF A1 100% réussite » (Didier, 2022).

The book's pictures are vector art drawn in the page content stream, not
embedded raster images — pulling the embedded images out only yields the
headphone/pencil icons and a decorative background. So the pictures are cut by
rendering the page and cropping it, which also renders sharper than the
originals would have.

Crop rectangles are expressed as *text anchors* rather than pixel coordinates:
"from the line that reads `4 - On vous écrit…` down to the line that reads
`A A.`". Anchors survive a re-render at a different resolution and, unlike bare
numbers, say what they are pointing at.

    python3 scripts/delf-a1-crop.py            # write every crop
    python3 scripts/delf-a1-crop.py --sheet    # + a contact sheet to eyeball

Reads from materials/, writes WebP crops to public/delf-a1/.
"""

import argparse
import html
import re
import subprocess
import sys
from pathlib import Path
from xml.etree import ElementTree as ET

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "materials/100% DELF Level/Le DELF A1 100_ réussite - 2022"
OUT = ROOT / "public/delf-a1"
DPI = 200                      # 2.78x the PDF's own points — sharp on retina
MAX_W = 1100                   # wider than any phone needs, even at 3x
QUALITY = 82                   # WebP; PNG of the same crops runs ~8x heavier
PT = DPI / 72.0                # points -> pixels
PAGE_W = 595.2756              # every page in this book is the same A4-ish box

# The book is split into per-chapter PDFs whose names carry the page range they
# cover, so a book page number maps to (file, page-within-file).
PARTS = [
    (1, 8, "001-008.pdf"), (9, 40, "009-040.pdf"), (41, 70, "041-070.pdf"),
    (71, 86, "071-086.pdf"), (87, 107, "087-107.pdf"), (108, 129, "108-129.pdf"),
    (130, 161, "130-161.pdf"),
]


def locate(book_page):
    for lo, hi, name in PARTS:
        if lo <= book_page <= hi:
            return SRC / name, book_page - lo + 1
    raise SystemExit(f"page {book_page} is outside the book")


_lines_cache = {}


def lines_of(book_page):
    """Every text line on the page as (text, xMin, yMin, xMax, yMax), in PDF points."""
    if book_page in _lines_cache:
        return _lines_cache[book_page]
    pdf, n = locate(book_page)
    xml = subprocess.run(
        ["pdftotext", "-bbox-layout", "-f", str(n), "-l", str(n), str(pdf), "-"],
        capture_output=True, text=True, check=True).stdout
    # poppler emits XHTML with a DTD reference; strip the doctype so ElementTree
    # doesn't try to resolve it, and drop the namespace for simpler queries.
    xml = re.sub(r"<!DOCTYPE[^>]*>", "", xml, count=1)
    xml = xml.replace(' xmlns="http://www.w3.org/1999/xhtml"', "")
    root = ET.fromstring(xml)
    out = []
    for line in root.iter("line"):
        words = [html.unescape(w.text or "") for w in line.iter("word")]
        out.append((
            " ".join(words).strip(),
            float(line.get("xMin")), float(line.get("yMin")),
            float(line.get("xMax")), float(line.get("yMax")),
        ))
    out.sort(key=lambda l: (l[2], l[1]))
    _lines_cache[book_page] = out
    return out


def norm(s):
    """Fold the typographic noise that makes anchors brittle."""
    s = s.replace("’", "'").replace(" ", " ")
    return re.sub(r"\s+", " ", s).strip().lower()


def find_line(book_page, anchor, after=None, nth=1):
    """The nth line containing `anchor`, optionally below y=`after`."""
    want = norm(anchor)
    hits = [l for l in lines_of(book_page)
            if want in norm(l[0]) and (after is None or l[2] > after - 0.5)]
    if len(hits) < nth:
        raise SystemExit(
            f"p.{book_page}: no match #{nth} for {anchor!r}"
            + (f" below y={after}" if after else ""))
    return hits[nth - 1]


_render_cache = {}


def render(book_page):
    if book_page in _render_cache:
        return _render_cache[book_page]
    pdf, n = locate(book_page)
    tmp = OUT / f".render-{book_page}"
    subprocess.run(["pdftoppm", "-f", str(n), "-l", str(n), "-r", str(DPI),
                    "-png", str(pdf), str(tmp)], check=True)
    hit = next(OUT.glob(f".render-{book_page}-*.png"))
    img = Image.open(hit).convert("RGB")
    _render_cache[book_page] = (img, hit)
    return img, hit


def crop(spec):
    """Cut one rectangle. See CROPS for the spec shape."""
    page = spec["page"]

    # An edge is either a text anchor or, where the surrounding type is set in a
    # font we can't read (see the handwriting note under CROPS), a raw y in points.
    if isinstance(spec["top"], (int, float)):
        y0 = spec["top"]
    else:
        y0 = find_line(page, spec["top"], nth=spec.get("top_nth", 1))[4] + 2

    if isinstance(spec["bottom"], (int, float)):
        y1 = spec["bottom"]
    else:
        label = find_line(page, spec["bottom"], after=y0,
                          nth=spec.get("bottom_nth", 1))
        # Where the choices are maps, the a/b/c label sits under its picture and
        # the label's baseline is the bottom edge. Where they are round photos,
        # the label is set beside the circle at mid-height and the picture runs
        # on below it. So grow past the label until just short of whatever comes
        # next, capped so a crop can't run all the way down to the folio.
        y1 = label[4] + 3
        below = [l[2] for l in lines_of(page) if l[2] > label[4] + 1]
        y1 = max(y1, min(min(below) - 4 if below else 9e9, label[4] + 60))

    x0, x1 = spec.get("x", (48, 548))

    img, _ = render(page)
    box = (int(x0 * PT), int(y0 * PT), int(x1 * PT), int(y1 * PT))
    if box[3] <= box[1] or box[2] <= box[0]:
        raise SystemExit(f"{spec['id']}: empty crop {box}")
    out = img.crop(box)
    out = trim_white(out)
    if out.width > MAX_W:
        out = out.resize((MAX_W, round(out.height * MAX_W / out.width)), Image.LANCZOS)

    # WebP, because the whole set ships to the browser and gets cached for
    # offline use: the same crops as PNG come to ~15 MB, as WebP to under 2.
    dest = OUT / spec["dir"] / f"{spec['id']}.webp"
    dest.parent.mkdir(parents=True, exist_ok=True)
    out.save(dest, quality=QUALITY, method=6)
    return dest, out


def trim_white(img, tol=248):
    """Shave uniform white margins so cards don't inherit the page's padding."""
    import numpy as np
    a = np.asarray(img)
    ink = (a < tol).any(axis=2)
    rows, cols = ink.any(axis=1), ink.any(axis=0)
    if not rows.any():
        return img
    y0, y1 = rows.argmax(), len(rows) - rows[::-1].argmax()
    x0, x1 = cols.argmax(), len(cols) - cols[::-1].argmax()
    m = 6
    return img.crop((max(0, x0 - m), max(0, y0 - m),
                     min(img.width, x1 + m), min(img.height, y1 + m)))


# ── What to cut ──────────────────────────────────────────────────
# `top`/`bottom` are text anchors; the crop spans the gap between them, which is
# exactly where the artwork sits. Option strips are cut as one wide image
# covering choices a/b/c together — the answer is still picked as a/b/c, and one
# strip beats three crops that have to stay aligned with each other.

DOC = "docs"      # the document being read
OPT = "options"   # a question's three picture choices

FULL = (55, 542)   # the text column, edge to edge

CROPS = [
    # ---- Documents the reader has to read as a picture ----
    # These are set in a handwriting face whose glyphs carry no usable Unicode
    # mapping: extracting the text yields "Cocu, Éten e Mai vent dnr", and the
    # same kind of font silently drops every digit in the Activité 9 memo
    # ("Rendez-vous à  h"). Anchoring inside them is impossible for the same
    # reason, so these four give their edges as raw y coordinates.
    dict(id="act1-doc", page=44, dir=DOC, x=(335, 527), top=128, bottom=352),
    dict(id="act9-doc", page=50, dir=DOC, x=(298, 522), top=210, bottom=392),
    dict(id="ex2-doc",  page=57, dir=DOC, x=(88, 500),  top=328, bottom=450),
    dict(id="ex3-doc",  page=58, dir=DOC, x=(106, 518), top=141, bottom=328),

    # ---- SE PRÉPARER · picture options ----
    dict(id="act1-q4", page=44, dir=OPT, x=FULL,
         top="4 - On vous écrit pour vous demander quoi", bottom="A A."),
    dict(id="act2-q2", page=44, dir=OPT, x=(55, 330),
         top="2 - Comment pouvez-vous payer dans l'auberge", bottom="A A."),
    dict(id="act2-q5", page=45, dir=OPT, x=FULL,
         top="5 - À quelle heure pouvez-vous boire un jus d'orange", bottom="A A."),
    dict(id="act3-q3", page=45, dir=OPT, x=FULL,
         top="3 - Qu'est-ce que fait Ana", bottom="A A."),
    dict(id="act5-q3", page=46, dir=OPT, x=FULL,
         top="3 - Qu'est-ce qu'il faut donner pour faire du sport", bottom="A C."),
    dict(id="act6-q1", page=47, dir=OPT, x=(55, 290),
         top="1 - Pourquoi l'entrée principale est fermée", bottom="A C."),
    dict(id="act7-q5", page=48, dir=OPT, x=FULL,
         top="Cochez le bon chemin.", bottom="A C."),
    dict(id="act8-q3", page=49, dir=OPT, x=FULL,
         top="3 - On vous propose quoi", bottom="A A."),
    dict(id="act8-q5", page=49, dir=OPT, x=FULL,
         top="5 - Vous êtes à la station de métro Gambetta", bottom="A C."),
    dict(id="act13-q2", page=53, dir=OPT, x=FULL,
         top="2 - Où est-ce que la fête des voisins a lieu", bottom="A A."),
    dict(id="act14-q5", page=54, dir=OPT, x=FULL,
         top="5 - Qu'est-ce que vous devez apporter pour votre inscription", bottom="A A."),
    dict(id="act16-q5", page=55, dir=OPT, x=FULL,
         top="5 - Qu'est-ce que vous pouvez voir au centre du bâtiment", bottom="A A."),

    # ---- S'ENTRAÎNER · picture options ----
    dict(id="ex1-q2", page=56, dir=OPT, x=FULL,
         top="2 - Où est-ce que vous allez samedi", bottom="b. A"),
    dict(id="ex1-q4", page=56, dir=OPT, x=FULL,
         top="4 - Comment est-ce que Christophe va aller à la gare", bottom="b. A"),
    dict(id="ex2-q2", page=57, dir=OPT, x=FULL,
         top="2 - Quelle est l'activité de samedi après-midi", bottom="b. A"),
    dict(id="ex2-q5", page=57, dir=OPT, x=FULL,
         top="5 - Vous devez venir avec quoi", bottom="b. A"),
    dict(id="ex3-q1", page=58, dir=OPT, x=FULL,
         top="1 - Quel document est-ce que vous devez prendre à l'ambassade", bottom="b. A"),
    dict(id="ex3-q3", page=58, dir=OPT, x=FULL,
         top="3 - Qu'est-ce que vous devez envoyer à la poste", bottom="b. A"),
    dict(id="ex5-q5", page=61, dir=OPT, x=FULL,
         top="5 - Les vélos prennent quel chemin", bottom="c. A"),
    dict(id="ex6-q5", page=62, dir=OPT, x=FULL,
         top="5 - Quel est le chemin pour aller au restaurant", bottom="c. A"),
    dict(id="ex10-q5", page=66, dir=OPT, x=FULL,
         top="5 - Qu'est-ce que vous pouvez avoir à votre inscription", bottom="c. A"),
    dict(id="ex11-q5", page=66, dir=OPT, x=FULL,
         top="5 - Comment est-ce que les Français s'installent", bottom="c. A"),
    dict(id="ex12-q5", page=67, dir=OPT, x=FULL,
         top="5 - Qu'est-ce que vous devez prendre", bottom="c. A"),

    # Exercice 4's map choices straddle a page break — a and b at the foot of
    # p.59, c at the head of p.60. Cut each half; the panel stacks them.
    dict(id="ex4-q4-ab", page=59, dir=OPT, x=FULL,
         top="4 - Vous êtes à la gare", bottom="b. A"),
    dict(id="ex4-q4-c", page=60, dir=OPT, x=FULL, top=60, bottom=326),
]


def contact_sheet(shots):
    """One tall strip of every crop, labelled — the fastest way to spot a bad box."""
    from PIL import ImageDraw
    width = 900
    scaled = []
    for name, im in shots:
        w = min(width, im.width)
        h = max(1, int(im.height * w / im.width))
        scaled.append((name, im.resize((w, h))))
    total = sum(h.height + 26 for _, h in scaled)
    sheet = Image.new("RGB", (width, total), "white")
    d = ImageDraw.Draw(sheet)
    y = 0
    for name, im in scaled:
        d.text((4, y + 6), name, fill="red")
        y += 24
        sheet.paste(im, (0, y))
        d.line([(0, y - 2), (width, y - 2)], fill="#ccc")
        y += im.height + 2
    # Deliberately not under public/ — this is a proofing aid, not an asset.
    path = ROOT / "delf-a1-contact-sheet.png"
    sheet.save(path)
    return path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sheet", action="store_true", help="also write a contact sheet")
    ap.add_argument("--only", help="crop ids matching this substring")
    args = ap.parse_args()

    OUT.mkdir(parents=True, exist_ok=True)
    shots = []
    for spec in CROPS:
        if args.only and args.only not in spec["id"]:
            continue
        dest, im = crop(spec)
        shots.append((spec["id"], im))
        print(f"{spec['id']:<14} {im.width}x{im.height}  -> {dest.relative_to(ROOT)}")

    if args.sheet and shots:
        print("contact sheet ->", contact_sheet(shots).relative_to(ROOT))

    for junk in OUT.glob(".render-*.png"):
        junk.unlink()
    return 0


if __name__ == "__main__":
    sys.exit(main())
