import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Retire only the mistakenly added public-site Dorsey API. Do not forward
// requests, authentication tokens or write bodies to another origin.
function retired() {
  return NextResponse.json(
    {
      ok: false,
      error: "Dorsey execution is available only on the private dashboard.",
      canonical_url: "https://thedoctordorsey.com/",
    },
    { status: 410, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } },
  );
}

export const GET = retired;
export const POST = retired;
export const PATCH = retired;
