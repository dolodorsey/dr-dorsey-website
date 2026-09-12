import { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED = new Set([
  '12NDVa_b0GMWLWuozALsHWOo2ERYvgRcl',
  '1okEsQiEx3fpmMiT4FAaXRIgJNxcZwaAs',
  '1Rff5LFZc9QfcuCHI9wAzWA26lrARt_Vh',
  '1ZRtzUYyTLLrvgzyNu8mIXU0Lgw3E1sQ1',
  '1b0tMahIiM9r3GZG0yeXI8VKoIii-7nbv',
  '1qVEgE1XFXt2DodzEcDZX0b0Ot3hPvEEs',
  '1r7zOgLhV8-0ebqMYx34enGsN20Sze-j1',
  '1lrguvZp9cMjZ_U07P7cTXrl2CBvn9G6h',
  '193hbCbC89LffZ1uCtmZl5gce8-W1axDC',
  '1L35fZzAr3BjQTrXpPPLuDqvsu9X5eUN6',
  '1HRR1XHPXUVlNgwElsNrGrEqyX9RRCiu-',
  '1Dw8DR5O_lfUj5qInhg0E0lMsYollSxSa',
]);

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!ALLOWED.has(id)) return Response.json({ error: 'Asset not allowed.' }, { status: 404 });

  const headers = new Headers({ 'User-Agent': 'Mozilla/5.0 HakunaMatataMedia/1.0' });
  const range = request.headers.get('range');
  if (range) headers.set('range', range);

  const urls = [
    `https://drive.usercontent.google.com/download?id=${encodeURIComponent(id)}&export=download&confirm=t`,
    `https://drive.google.com/uc?export=download&id=${encodeURIComponent(id)}&confirm=t`,
  ];

  try {
    let upstream: Response | null = null;
    for (const url of urls) {
      const candidate = await fetch(url, { headers, redirect: 'follow', cache: 'no-store' });
      upstream = candidate;
      const type = candidate.headers.get('content-type') || '';
      if ((candidate.ok || candidate.status === 206) && !type.includes('text/html')) break;
    }
    if (!upstream || (!upstream.ok && upstream.status !== 206)) {
      return Response.json({ error: 'Asset unavailable.' }, { status: 502 });
    }
    const out = new Headers();
    for (const name of ['content-type','content-length','content-range','accept-ranges','etag','last-modified']) {
      const value = upstream.headers.get(name);
      if (value) out.set(name, value);
    }
    out.set('Cache-Control', 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000');
    out.set('Content-Disposition', 'inline');
    out.set('X-Content-Type-Options', 'nosniff');
    return new Response(upstream.body, { status: upstream.status, headers: out });
  } catch (error) {
    console.error('Hakuna media proxy failed', { id, error });
    return Response.json({ error: 'Asset unavailable.' }, { status: 502 });
  }
}
