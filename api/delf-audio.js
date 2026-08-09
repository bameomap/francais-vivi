import { get } from "@vercel/blob";

// Streams the « 100 % réussite » listening tracks out of a private Blob store.
//
// The tracks are the book's own audio, so they are not public assets: the store
// is private and the only way to read a private blob is through a function.
// That also keeps them out of this repo, which is public.
//
// Range requests are forwarded rather than swallowed. Without that, dragging the
// audio scrubber does nothing — the browser asks for a byte range, gets the
// whole file back, and gives up on seeking.

const MAX_PISTE = 97;          // the book ships 97 tracks; anything else is a probe

// Copied straight through from the blob response so the browser sees the same
// content type, length and range it would from a static file.
const PASS_THROUGH = ["content-type", "content-length", "content-range", "etag", "accept-ranges"];

export default async function handler(req, res) {
  const n = Number(req.query.p);
  if (!Number.isInteger(n) || n < 1 || n > MAX_PISTE) {
    return res.status(400).json({ error: "bad piste" });
  }
  const pathname = `delf-a1/piste-${String(n).padStart(2, "0")}.m4a`;

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
    console.error("delf-audio", pathname, err?.message);
    return res.status(502).json({ error: "blob read failed" });
  }
}
