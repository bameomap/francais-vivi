"""Forced alignment: give each book sentence a (start, end) in its mp3.

Produces the data behind "▶ Nghe câu này" in dictée and the per-line play
buttons in the Script tab. Run once per level, offline; the app then needs
nothing at runtime.

We already have the exact transcript, so ASR is not here to read the audio —
only to put clocks on words. Whisper's words are matched against the book's
words, and each sentence takes the time of its first and last matched word.

Why not something cheaper: ffmpeg silencedetect cannot recover the book's
sentence boundaries. Measured on piste 2, seconds 19.5→40.1 are one unbroken
stretch of speech that the book prints as three sentences — no threshold
finds a boundary that is not there.

Usage
-----
    python3 -m venv venv && ./venv/bin/pip install faster-whisper

    # 1. export the reference transcripts next to this script's workdir
    node -e 'const {EDITO_AUDIO_A2}=await import("./src/data/editoAudioA2.js");
      console.log(JSON.stringify(Object.values(EDITO_AUDIO_A2).flat()
        .map(t=>({id:t.id,trackNum:t.trackNum,sentences:t.sentences}))))' > ref.json

    # 2. fetch the mp3s as <trackNum padded to 3>.mp3, e.g.
    curl -sfLO https://bameomap.github.io/francais-vivi/002_Edito_A2_Livre.mp3

    # 3. align (model: small is enough — the transcript does the reading)
    ./venv/bin/python scripts/align-audio.py small

Output is timings_<model>.json: {trackId: [{i, start, end}]}. Reshape to
[[start, end], …] per track and commit as src/data/editoTimings*.js, which
src/utils/dictee.test.js then checks for count, order and sane duration.

Check the reported match rate before trusting a run — anything well under
~90% means the mp3 and the transcript are not the same recording (see
materials/README.md for the 2016-vs-2022 edition trap).
"""
import json, re, sys, unicodedata, difflib
from faster_whisper import WhisperModel

MODEL = sys.argv[1] if len(sys.argv) > 1 else "small"
# Whisper marks a word's start a touch late, so clips lose their first word
# without a lead-in. A little overlap with the neighbour is harmless — the
# clips are played one at a time — but a clipped word is not, so OVERLAP lets
# the lead-in bite into the previous sentence rather than give up.
PAD_IN, PAD_OUT, OVERLAP = 0.35, 0.30, 0.18

# "La journaliste :" is printed in the book but nobody says it.
SPEAKER = re.compile(r"^\s*[A-ZÀ-ÝÉÈ][^:]{0,30}\s*:\s*")

def norm(w):
    w = unicodedata.normalize("NFD", w.lower())
    w = "".join(c for c in w if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9]", "", w)

def words_of(sentence):
    return [w for w in re.split(r"\s+", SPEAKER.sub("", sentence)) if norm(w)]

def align(track, mp3, model):
    segs, _ = model.transcribe(mp3, language="fr", word_timestamps=True,
                               vad_filter=False, beam_size=5)
    hyp = [(norm(w.word), w.start, w.end)
           for s in segs for w in s.words if norm(w.word)]

    # Flatten the book text, remembering which sentence each word came from.
    ref, owner = [], []
    for i, s in enumerate(track["sentences"]):
        for w in words_of(s):
            ref.append(norm(w)); owner.append(i)

    sm = difflib.SequenceMatcher(a=ref, b=[h[0] for h in hyp], autojunk=False)
    # span[i] = [earliest start, latest end] among words of sentence i that matched
    span = [[None, None] for _ in track["sentences"]]
    matched = 0
    for ai, bi, n in sm.get_matching_blocks():
        for k in range(n):
            i, (_, st, en) = owner[ai + k], hyp[bi + k]
            sp = span[i]
            if sp[0] is None or st < sp[0]: sp[0] = st
            if sp[1] is None or en > sp[1]: sp[1] = en
            matched += 1

    # A sentence nobody matched borrows the gap between its neighbours.
    for i, sp in enumerate(span):
        if sp[0] is not None: continue
        prev = next((span[j][1] for j in range(i - 1, -1, -1) if span[j][1] is not None), 0.0)
        nxt  = next((span[j][0] for j in range(i + 1, len(span)) if span[j][0] is not None), prev + 1.0)
        sp[0], sp[1] = prev, nxt

    out = []
    for i, (st, en) in enumerate(span):
        floor = span[i - 1][1] - OVERLAP if i else 0.0
        ceil  = span[i + 1][0] + OVERLAP if i + 1 < len(span) else 1e9
        st = max(st - PAD_IN, floor, 0.0)
        en = min(max(en + PAD_OUT, st + 0.4), max(ceil, en + 0.05))
        out.append({"i": i, "start": round(st, 2), "end": round(en, 2)})
    return out, matched / max(len(ref), 1)

if __name__ == "__main__":
    model = WhisperModel(MODEL, device="cpu", compute_type="int8")
    tracks = json.load(open("ref.json"))
    result = {}
    for t in tracks:
        mp3 = f"{t['trackNum']:03d}.mp3"
        spans, cov = align(t, mp3, model)
        result[t["id"]] = spans
        print(f"{t['id']:9s} {len(spans):3d} câu  khớp {cov:5.1%}  "
              f"cuối {spans[-1]['end']:.1f}s", flush=True)
    json.dump(result, open(f"timings_{MODEL}.json", "w"), ensure_ascii=False, indent=1)
    print("→ timings_%s.json" % MODEL)
