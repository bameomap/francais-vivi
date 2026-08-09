#!/usr/bin/env python3
"""Read « Le DELF A1 100 % réussite » pages in true reading order.

`pdftotext -layout` walks the page by scanline, so on the book's two-column
spreads it interleaves the columns and the corrigés come out as nonsense
("Activité 1, p. 12, PISTE 1 | Est-ce que tu es d'accord pour jeudi alors ?").
This groups lines into columns by their x position first, then reads each
column top to bottom.

    python3 scripts/delf-a1-text.py 130 161        # dump a page range
    python3 scripts/delf-a1-text.py 12 --cols 1    # force single column
"""

import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from importlib.machinery import SourceFileLoader

_crop = SourceFileLoader("delf_crop", str(Path(__file__).resolve().parent / "delf-a1-crop.py")).load_module()
lines_of = _crop.lines_of

GUTTER = 290.0          # the spreads split near the middle of the 595pt page
MIN_COL_LINES = 4       # below this, treat the page as one column


def columns(page):
    """Lines of `page`, left column first, then right — or one run if unsplit."""
    lines = lines_of(page)
    left  = [l for l in lines if l[3] <= GUTTER]        # ends before the gutter
    right = [l for l in lines if l[1] >= GUTTER]        # starts after it
    spans = [l for l in lines if l not in left and l not in right]

    # A page with a real two-column body has plenty of lines on both sides and
    # few that straddle. Headers and full-width intros are the straddlers.
    if len(left) < MIN_COL_LINES or len(right) < MIN_COL_LINES:
        return [lines]
    return [spans, left, right]


def page_text(page, force_cols=None):
    if force_cols == 1:
        return "\n".join(t for t, *_ in lines_of(page))
    out = []
    for run in columns(page):
        for t, *_ in run:
            out.append(t)
    return "\n".join(out)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("first", type=int)
    ap.add_argument("last", type=int, nargs="?")
    ap.add_argument("--cols", type=int, choices=[1], help="force single column")
    args = ap.parse_args()

    for p in range(args.first, (args.last or args.first) + 1):
        print(f"\n===== p.{p} =====")
        print(page_text(p, args.cols))
    return 0


if __name__ == "__main__":
    sys.exit(main())
