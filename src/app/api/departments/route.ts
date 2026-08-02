import { NextResponse } from 'next/server';
import { departments } from '@/lib/departments';

/**
 * The fourteen operating departments, with the animation pool for each.
 *
 * Served so the apps show the same fourteen the websites do, from the same
 * definition, instead of each keeping its own list that quietly falls behind.
 *
 * `animations` is a pool, not a single asset — rotate through it per visit so
 * a department shows a different one of its companies each time a viewer comes
 * back to the screen.
 *
 * GET /api/departments
 */
export const dynamic = 'force-static';
export const revalidate = 3600;

export function GET() {
  return NextResponse.json(
    {
      count: departments.length,
      note: 'animations is a rotation pool — pick per visit, do not pin to index 0.',
      departments: departments.map((department) => ({
        title: department.title,
        eyebrow: department.eyebrow,
        detail: department.detail,
        sample: department.sample,
        href: department.href,
        cta: department.cta,
        animations: department.animations,
      })),
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
}
