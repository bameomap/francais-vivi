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
        # Round photos put their label beside the picture at mid-height, so the
        # crop has to grow past it. Where the label sits *under* its picture the
        # baseline is already the bottom edge, and growing would swallow the
        # next question — those specs pass grow=False.
        if spec.get("grow", True):
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

FULL  = (55, 542)   # the text column, edge to edge
# The épreuves blanches run a coloured sidebar down the outer edge, which
# swaps sides with the page parity — so the text column does too.
BLANC_L = (72, 548)   # sidebar on the left  (even pages)
BLANC_R = (60, 536)   # sidebar on the right (odd pages)

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

    # ---- Compréhension de l'oral · S'ENTRAÎNER picture options ----
    dict(id="co-ex2-q2", page=29, dir=OPT, x=FULL,
         top="2 - Qu'est-ce que vous devez apporter", bottom="b. A"),
    dict(id="co-ex3-q3", page=29, dir=OPT, x=FULL,
         top="3 - Fabiola va préparer une salade avec quoi", bottom="b. A"),
    dict(id="co-ex5-q1", page=30, dir=OPT, x=FULL,
         top="1 - Où est le grand concert de ce soir", bottom="b. A"),
    dict(id="co-ex5-q4", page=31, dir=OPT, x=FULL,
         top="4 - Quelle est la météo pour ce soir", bottom="b. A"),
    dict(id="co-ex6-q1", page=31, dir=OPT, x=FULL,
         top="1 - Quel est le numéro du train", bottom="b. A"),

    # Exercices 11 and 12 give six drawings, A–F, to match against four
    # dialogues. The whole grid is one document rather than six choices, so it
    # is cut as the exercice's document. Exercice 11's grid straddles a page
    # break, hence two halves.
    dict(id="co-ex11-abc", page=34, dir=DOC, x=FULL,
         top="Exercice 11", bottom="A. n°"),
    dict(id="co-ex11-def", page=35, dir=DOC, x=FULL, top=55, bottom=232),
    dict(id="co-ex12", page=35, dir=DOC, x=FULL,
         top="Exercice 12", bottom="D. n°"),

    # Exercices 14 and 15 show five numbered objects with a OUI/NON pair under
    # each. Same idea: the grid is the document, the questions are the numbers.
    dict(id="co-ex14", page=36, dir=DOC, x=FULL, top=628, bottom=800),
    dict(id="co-ex15", page=37, dir=DOC, x=FULL, top=170, bottom=355),

    # ---- SE PRÉPARER · the picture drills (p.13–27) ----
    # Same idea as the two above: the grid is the document and its labels are
    # the questions. Every one of these gives raw y coordinates rather than
    # anchors, because the only text inside them is the label row we are
    # cutting *down to* — an anchor would stop at the top of the drawing.
    dict(id="co-a10", page=13, dir=DOC, x=FULL, top=712, bottom=812),
    dict(id="co-a14", page=14, dir=DOC, x=FULL, top=660, bottom=800),
    dict(id="co-a30", page=18, dir=DOC, x=FULL, top=292, bottom=395),
    # Activité 32's six drawings straddle the page break, as do 33's three maps.
    dict(id="co-a32-abc", page=18, dir=DOC, x=FULL, top=648, bottom=802),
    dict(id="co-a32-def", page=19, dir=DOC, x=FULL, top=40, bottom=240),
    dict(id="co-a33-ab", page=19, dir=DOC, x=FULL, top=290, bottom=542),
    dict(id="co-a33-c", page=19, dir=DOC, x=FULL, top=548, bottom=788),
    dict(id="co-a39", page=21, dir=DOC, x=FULL, top=126, bottom=260),
    dict(id="co-a40", page=21, dir=DOC, x=FULL, top=298, bottom=412),
    # The answer blanks for Activité 42 run down the right half of the column;
    # only the photo on the left is the document.
    dict(id="co-a42", page=21, dir=DOC, x=(62, 305), top=636, bottom=800),
    dict(id="co-a47-abc", page=23, dir=DOC, x=FULL, top=140, bottom=292),
    dict(id="co-a47-def", page=23, dir=DOC, x=FULL, top=296, bottom=444),
    dict(id="co-a48-abc", page=23, dir=DOC, x=FULL, top=498, bottom=653),
    dict(id="co-a48-def", page=23, dir=DOC, x=FULL, top=657, bottom=803),
    # Activité 49 sets its three messages as three small A/B pairs scattered
    # across the page, so each is cut as that question's own picture choice.
    dict(id="co-a49-q1", page=24, dir=OPT, x=(95, 265), top=218, bottom=328),
    dict(id="co-a49-q2", page=24, dir=OPT, x=(342, 500), top=218, bottom=326),
    dict(id="co-a49-q3", page=24, dir=OPT, x=(220, 378), top=347, bottom=433),
    dict(id="co-a50", page=24, dir=DOC, x=FULL, top=480, bottom=615),
    dict(id="co-a51", page=24, dir=DOC, x=FULL, top=664, bottom=800),
    dict(id="co-a52", page=25, dir=DOC, x=FULL, top=124, bottom=270),
    dict(id="co-a53", page=25, dir=DOC, x=FULL, top=315, bottom=478),
    dict(id="co-a54-q1", page=25, dir=OPT, x=(330, 500), top=548, bottom=637),
    dict(id="co-a54-q2", page=25, dir=OPT, x=(330, 500), top=642, bottom=716),
    dict(id="co-a54-q3", page=25, dir=OPT, x=(330, 500), top=722, bottom=800),
    dict(id="co-a55", page=26, dir=DOC, x=FULL, top=126, bottom=225),
    dict(id="co-a56", page=26, dir=DOC, x=FULL, top=275, bottom=495),
    # Frida's six plates are on p.26, Richard's on p.27 — one grid each.
    dict(id="co-a57-frida", page=26, dir=DOC, x=FULL, top=572, bottom=792),
    dict(id="co-a57-richard", page=27, dir=DOC, x=FULL, top=90, bottom=308),
    dict(id="co-a58-1", page=27, dir=OPT, x=FULL, top=372, bottom=496),
    dict(id="co-a58-2", page=27, dir=OPT, x=FULL, top=505, bottom=628),
    dict(id="co-a58-3", page=27, dir=OPT, x=FULL, top=638, bottom=761),

    # ---- Épreuve blanche 1 · compréhension de l'oral ----
    # This one's A/B/C labels are drawn into the artwork rather than set as
    # text, so there is no anchor to stop at — the next "B." belongs to
    # question 4.
    dict(id="b1-ex1-q3", page=112, dir=OPT, x=BLANC_L, top=364, bottom=468),
    dict(grow=False, id="b1-ex2-q1", page=112, dir=OPT, x=BLANC_L,
         top="1. Où faut-il courir", bottom="B."),
    dict(grow=False, id="b1-ex2-q3", page=113, dir=OPT, x=BLANC_R,
         top="3. Où est-ce que vous pouvez avoir un bon", bottom="B."),
    dict(id="b1-ex4-abc", page=113, dir=DOC, x=BLANC_R, top=545, bottom=800),
    dict(id="b1-ex4-def", page=114, dir=DOC, x=BLANC_L, top=55, bottom=240),
    dict(id="b1-ex5", page=114, dir=DOC, x=BLANC_L, top=375, bottom=720),

    # ---- Épreuve blanche 2 · compréhension de l'oral ----
    dict(grow=False, id="b2-ex1-q4", page=121, dir=OPT, x=BLANC_R,
         top="4. Quel souvenir est-ce que Cyril va acheter", bottom="B."),
    dict(grow=False, id="b2-ex2-q3", page=121, dir=OPT, x=BLANC_R,
         top="3. Quel cadeau est-ce que vous pouvez trouver", bottom="B."),
    dict(grow=False, id="b2-ex2-q4", page=122, dir=OPT, x=BLANC_L,
         top="4. Qu'est-ce qui coûte 25 euros", bottom="B."),
    dict(id="b2-ex4-abc", page=122, dir=DOC, x=BLANC_L, top=610, bottom=800),
    dict(id="b2-ex4-def", page=123, dir=DOC, x=BLANC_R, top=55, bottom=240),
    dict(id="b2-ex5", page=123, dir=DOC, x=BLANC_R, top=355, bottom=712),

    # ---- Épreuve blanche 1 · compréhension des écrits ----
    # Documents first, then the picture-choice rows. Both are cut whole: an
    # email mock-up or a wall of sticky notes is artwork, not prose.
    dict(id="b1ce-ex1-doc", page=115, dir=DOC, x=BLANC_R, top=196, bottom=364),
    dict(id="b1ce-ex1-q2",  page=115, dir=OPT, x=BLANC_R, top=426, bottom=560),
    dict(id="b1ce-ex1-q5",  page=115, dir=OPT, x=BLANC_R, top=660, bottom=794),
    dict(id="b1ce-ex2-doc", page=116, dir=DOC, x=(330, 542), top=70, bottom=292),
    dict(id="b1ce-ex2-q5",  page=116, dir=OPT, x=BLANC_L, top=342, bottom=800),
    dict(id="b1ce-ex3-doc", page=117, dir=DOC, x=BLANC_R, top=120, bottom=300),
    dict(id="b1ce-ex4-doc", page=117, dir=DOC, x=BLANC_R, top=615, bottom=800),
    dict(id="b1ce-ex4-q2",  page=118, dir=OPT, x=BLANC_L, top=124, bottom=246),

    # ---- Épreuve blanche 2 · compréhension des écrits ----
    dict(id="b2ce-ex1-doc", page=124, dir=DOC, x=BLANC_L, top=198, bottom=360),
    dict(id="b2ce-ex1-q1",  page=124, dir=OPT, x=BLANC_L, top=386, bottom=504),
    dict(id="b2ce-ex1-q4",  page=124, dir=OPT, x=BLANC_L, top=640, bottom=759),
    dict(id="b2ce-ex2-doc", page=125, dir=DOC, x=BLANC_R, top=118, bottom=318),
    # Choices A and B sit at the foot of p.125, C at the head of p.126.
    dict(id="b2ce-ex2-q5-ab", page=125, dir=OPT, x=BLANC_R, top=560, bottom=795),
    dict(id="b2ce-ex2-q5-c",  page=126, dir=OPT, x=BLANC_L, top=55, bottom=300),
    dict(id="b2ce-ex3-doc", page=126, dir=DOC, x=BLANC_L, top=392, bottom=600),
    dict(id="b2ce-ex4-doc", page=127, dir=DOC, x=BLANC_R, top=120, bottom=348),
    dict(id="b2ce-ex4-q5",  page=127, dir=OPT, x=BLANC_R, top=556, bottom=691),
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
