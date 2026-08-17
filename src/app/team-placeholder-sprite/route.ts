import { TEAM_PORTRAIT_SPRITE_BASE64 } from '@/data/team-portraits';

export const dynamic = 'force-static';

export async function GET() {
  const bytes = Buffer.from(TEAM_PORTRAIT_SPRITE_BASE64, 'base64');
  return new Response(bytes, {
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
