"""Give every sentence of a listening track its (start, end) inside the mp3.

Why this exists: dictée used to read the book's sentences back with the
browser's text-to-speech, which pronounces every word cleanly and at an even
pace — the opposite of the recording the learner is meant to train on. Real
audio has liaisons, elisions, people talking fast. Playing the actual seconds
of the actual mp3 is what makes the exercise worth doing.

Cutting one mp3 per sentence would mean ~1600 files across A1+A2. Instead each
sentence keeps a pair of timestamps and <audio> seeks to them, so the published
mp3s never change.

The transcript is already exact, so speech recognition is not here to read the
audio — only to put a clock on words. Whisper's words are matched against the
book's words with a plain sequence diff, and a sentence takes the time of its
first and last matched word. Words Whisper hears wrong are simply skipped by
the diff, which is why a mediocre model still yields good boundaries.

Usage (see README.md):
    python3 align.py [model] [book]   # model: small (default) | medium | large-v3
                                       # book: a2 (default) | a1
"""
import json, os, re, sys, unicodedata, difflib, urllib.request
from faster_whisper import WhisperModel

HERE  = os.path.dirname(os.path.abspath(__file__))
WORK  = os.path.join(HERE, "work")
def out_path(book):
    return os.path.join(HERE, "..", "..", "src", "data",
                         "editoTimingsA1.js" if book == "a1" else "editoTimingsA2.js")

# Whisper marks a word's start a touch late, so clips lose their first word
# without a lead-in. Slight overlap with the neighbour is harmless — clips play
# one at a time — while a clipped word is not, so the lead-in is allowed to
# bite into the previous sentence rather than give up.
PAD_IN, PAD_OUT, OVERLAP = 0.35, 0.30, 0.18

# "La journaliste :" is printed in the book but nobody says it out loud.
SPEAKER = re.compile(r"^\s*[A-ZÀ-ÝÉÈ][^:]{0,30}\s*:\s*")


def norm(w):
    w = unicodedata.normalize("NFD", w.lower())
    w = "".join(c for c in w if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9]", "", w)


def spoken_words(sentence):
    return [n for n in (norm(w) for w in SPEAKER.sub("", sentence).split()) if n]


def fetch(track):
    path = os.path.join(WORK, "%s.mp3" % track["id"])
    if not os.path.exists(path):
        print("   tải %s…" % os.path.basename(track["audioSrc"]), flush=True)
        urllib.request.urlretrieve(track["audioSrc"], path)
    return path


def align(track, model):
    segs, _ = model.transcribe(fetch(track), language="fr",
                               word_timestamps=True, vad_filter=False, beam_size=5)
    hyp = [(norm(w.word), w.start, w.end)
           for s in segs for w in s.words if norm(w.word)]

    ref, owner = [], []           # every book word, and which sentence it belongs to
    for i, s in enumerate(track["sentences"]):
        for w in spoken_words(s):
            ref.append(w); owner.append(i)

    sm = difflib.SequenceMatcher(a=ref, b=[h[0] for h in hyp], autojunk=False)
    span = [[None, None] for _ in track["sentences"]]
    matched = 0
    for ai, bi, n in sm.get_matching_blocks():
        for k in range(n):
            i, (_, st, en) = owner[ai + k], hyp[bi + k]
            if span[i][0] is None or st < span[i][0]: span[i][0] = st
            if span[i][1] is None or en > span[i][1]: span[i][1] = en
            matched += 1

    # A sentence Whisper never matched takes the gap left by its neighbours.
    holes = 0
    for i, sp in enumerate(span):
        if sp[0] is not None: continue
        holes += 1
        prev = next((span[j][1] for j in range(i - 1, -1, -1) if span[j][1] is not None), 0.0)
        nxt  = next((span[j][0] for j in range(i + 1, len(span)) if span[j][0] is not None), prev + 1.0)
        sp[0], sp[1] = prev, nxt

    out = []
    for i, (st, en) in enumerate(span):
        floor = span[i - 1][1] - OVERLAP if i else 0.0
        ceil  = span[i + 1][0] + OVERLAP if i + 1 < len(span) else 1e9
        st = max(st - PAD_IN, floor, 0.0)
        en = min(max(en + PAD_OUT, st + 0.4), max(ceil, en + 0.05))
        out.append((round(st, 2), round(en, 2)))
    return out, matched / max(len(ref), 1), holes, odd_pace(track, out)


# The failure worth catching: Whisper hallucinates over music (famously
# "Sous-titres réalisés par la communauté d'Amara.org"), the diff matches a
# real word to that noise, and one sentence swallows the jingle before it. The
# giveaway is pace — the span is far too long for the words in it. Nothing
# reads at 1.3s or 0.1s a word.
SLOW_PER_WORD, FAST_PER_WORD = 1.1, 0.12

def odd_pace(track, spans):
    bad = []
    for i, ((st, en), text) in enumerate(zip(spans, track["sentences"])):
        n = len(spoken_words(text))
        if not n: continue
        per = (en - st) / n
        # On a one- or two-word line ("Oui.") the padding is most of the span,
        # so a slow reading there means nothing.
        if (per > SLOW_PER_WORD and n >= 3) or per < FAST_PER_WORD:
            bad.append((i, per, text))
    return bad


def emit(result, model_name, book):
    const_name = "EDITO_TIMINGS_A1" if book == "a1" else "EDITO_TIMINGS_A2"
    audio_const = "EDITO_AUDIO" if book == "a1" else "EDITO_AUDIO_A2"
    out = out_path(book)
    lines = [
        "// Generated by scripts/align-audio/align.py (model: %s) — do not edit by hand." % model_name,
        "//",
        "// [start, end] in seconds for each sentence of %s, in the same" % audio_const,
        "// order as that track's `sentences`. Dictée seeks the real mp3 to these",
        "// instead of reading the sentence back with text-to-speech.",
        "//",
        "// To regenerate (or to cover a new unité): see scripts/align-audio/README.md",
        "",
        "export const %s = {" % const_name,
    ]
    for tid, spans in result.items():
        body = ", ".join("[%.2f,%.2f]" % s for s in spans)
        lines.append('  "%s": [%s],' % (tid, body))
    lines += [
        "};",
        "",
        "export const clipsFor = (trackId) => %s[trackId] || null;" % const_name,
        "",
    ]
    with open(out, "w") as f:
        f.write("\n".join(lines))
    print("→ %s" % os.path.relpath(out, os.path.join(HERE, "..", "..")))


if __name__ == "__main__":
    name = sys.argv[1] if len(sys.argv) > 1 else "small"
    book = sys.argv[2] if len(sys.argv) > 2 else "a2"
    os.makedirs(WORK, exist_ok=True)
    tracks = json.load(open(os.path.join(WORK, "refs.json")))
    model = WhisperModel(name, device="cpu", compute_type="int8")

    result, weakest, suspect = {}, 1.0, 0
    for t in tracks:
        spans, cov, holes, odd = align(t, model)
        result[t["id"]] = spans
        weakest = min(weakest, cov)
        suspect += len(odd)
        warn = "  ⚠ %d câu phải nội suy" % holes if holes else ""
        print("%-10s %3d câu  khớp %5.1f%%  hết ở %6.1fs%s"
              % (t["id"], len(spans), cov * 100, spans[-1][1], warn), flush=True)
        for i, per, text in odd:
            print("           ⚠ câu %d: %.2fs/từ — %s" % (i, per, text[:60]), flush=True)

    emit(result, name, book)
    if weakest < 0.80:
        print("\n⚠ Có track khớp dưới 80% — nghe kiểm tra trước khi tin.")
    if suspect:
        print("\n⚠ %d câu có tốc độ bất thường: mốc thời gian nhiều khả năng sai.\n"
              "  Thường là do Whisper 'nghe' ra chữ trong đoạn nhạc đầu bài.\n"
              "  Mở bài đó, bấm nghe từng câu, sửa tay trong editoTimingsA2.js nếu cần." % suspect)
