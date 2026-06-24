import { NextResponse } from "next/server";
import { getPublicOpsConfig } from "@/lib/ops-supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(getPublicOpsConfig());
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Configuration unavailable" }, { status: 503 });
  }
}
