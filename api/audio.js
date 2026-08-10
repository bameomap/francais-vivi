import { get } from "@vercel/blob";

// Streams a book's listening tracks out of the PRIVATE Blob store.
//
// Every track this app plays is a publisher's audio. None of it is a public
// asset and none of it is in this repo, which is public: the store is private,
// and the only way to read a private blob is through a function like this one.
//
// Range requests are forwarded rather than swallowed. Without that, dragging the
// scrubber does nothing — the browser asks for a byte range, gets the whole file
// back, and gives up on seeking.

// The books, and how many tracks each has. A request outside the range is a
// probe, not a mistake, so it gets a 400 rather than a round trip to the store.
const BOOKS = {
  "delf-a1":        { max: 97,  name: n => `delf-a1/piste-${String(n).padStart(2, "0")}.m4a` },
  "edito-a1-livre": { max: 152 },
  "edito-a1-cahier":{ max: 111 },
  "edito-a2-livre": { max: 121 },
  "edito-a2-cahier":{ max: 127 },
};

// Copied straight through from the blob response so the browser sees the same
// content type, length and range it would from a static file.
const PASS_THROUGH = ["content-type", "content-length", "content-range", "etag", "accept-ranges"];

export default async function handler(req, res) {
  const book = BOOKS[String(req.query.b ?? "")];
  const n = Number(req.query.p);
  if (!book) return res.status(400).json({ error: "bad book" });
  if (!Number.isInteger(n) || n < 1 || n > book.max) {
    return res.status(400).json({ error: "bad piste" });
  }
  // « 100 % réussite » was uploaded before this route existed and keeps its
  // original key; everything since is <book>/NNN.m4a.
  const pathname = book.name
    ? book.name(n)
    : `${req.query.b}/${String(n).padStart(3, "0")}.m4a`;

  try {
    const range = req.headers.range;
    const ifNoneMatch = req.headers["if-none-match"];
    const result = await get(pathname, {
      access: "private",
      ...(range ? { headers: { range } } : {}),
      ...(ifNoneMatch ? { ifNoneMatch } : {}),
    });

    if (!result) return res.status(404).json({ error: "not found" });

    // A week in the browser: the tracks never change and a listening exercise
    // gets replayed a lot. Private, because these are not ours to hand out.
    res.setHeader("Cache-Control", "private, max-age=604800");

    if (result.statusCode === 304) return res.status(304).end();

    for (const h of PASS_THROUGH) {
      const v = result.headers?.get(h);
      if (v) res.setHeader(h, v);
    }
    // The SDK reports 200 even when the upstream served a partial; the presence
    // of a content-range is what actually says "this is a slice".
    res.status(result.headers?.get("content-range") ? 206 : 200);

    const body = result.stream;
    if (!body) return res.status(502).json({ error: "no stream" });
    if (typeof body.pipe === "function") return body.pipe(res);

    const reader = body.getReader();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(Buffer.from(value));
    }
    return res.end();
  } catch (err) {
    console.error("audio", pathname, err?.message);
    return res.status(502).json({ error: "blob read failed" });
  }
}
