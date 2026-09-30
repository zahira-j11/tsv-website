// Only these Reel fields may be written through the API. Passing the raw body
// to Mongoose would let a request set anything on the document.
const WRITABLE = ['type', 'src', 'poster', 'contentType', 'distribution', 'clientName', 'clientLogoColor', 'viewCount', 'serviceKey', 'order', 'active'] as const;

export function pickWritable(body: unknown): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (body && typeof body === 'object') {
    for (const k of WRITABLE) {
      if (k in body) out[k] = (body as Record<string, unknown>)[k];
    }
  }
  return out;
}
