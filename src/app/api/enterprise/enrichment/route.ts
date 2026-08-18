import { NextRequest, NextResponse } from "next/server";
import { getOpsClient } from "@/lib/ops-supabase";

export const dynamic = "force-dynamic";

function accessToken(request: NextRequest) {
  const header = request.headers.get("authorization");
  return header?.startsWith("Bearer ") ? header.slice(7) : undefined;
}

export async function GET(request: NextRequest) {
  const token = accessToken(request);
  if (!token) return NextResponse.json({ error: "Sign in to view contact enrichment." }, { status: 401 });

  const client = getOpsClient(token);
  const { data, error } = await client.rpc("khg_get_contact_enrichment_dashboard");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
