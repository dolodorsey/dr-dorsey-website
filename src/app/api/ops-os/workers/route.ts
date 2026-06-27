import { NextRequest, NextResponse } from "next/server";
import { getOpsClient } from "@/lib/ops-supabase";

export const dynamic = "force-dynamic";

const allowedWorkers = new Set(["sms_watcher_9609", "ig_worker_dolodorsey", "ig_scraper_dolodorsey"]);
const allowedActions = new Set(["ping", "pause", "resume"]);

type Body = { action?: string; worker?: string; reason?: string };

function accessToken(request: NextRequest) {
  const header = request.headers.get("authorization");
  return header?.startsWith("Bearer ") ? header.slice(7) : undefined;
}

export async function GET(request: NextRequest) {
  try {
    const client = getOpsClient(accessToken(request));
    const [health, errors] = await Promise.all([
      client.from("v_worker_health").select("*").order("worker", { ascending: true }),
      client.from("v_worker_errors_recent").select("*").order("created_at", { ascending: false }).limit(20),
    ]);
    if (health.error) throw health.error;
    if (errors.error) throw errors.error;
    return NextResponse.json({ health: health.data || [], errors: errors.data || [] });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load worker health." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const token = accessToken(request);
  if (!token) return NextResponse.json({ error: "Sign in to control workers." }, { status: 401 });
  try {
    const body = (await request.json()) as Body;
    const worker = String(body.worker || "");
    const action = String(body.action || "");
    if (!allowedWorkers.has(worker)) throw new Error("Unknown worker.");
    if (!allowedActions.has(action)) throw new Error("Unknown worker action.");

    const client = getOpsClient(token);
    const rpcName = action === "ping" ? "worker_ping" : action === "pause" ? "worker_pause" : "worker_resume";
    const args = action === "pause" ? { p_worker: worker, p_reason: body.reason || "manual_via_ops_os" } : { p_worker: worker };
    const { data, error } = await client.rpc(rpcName, args);
    if (error) throw error;
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Worker action failed." }, { status: 400 });
  }
}
