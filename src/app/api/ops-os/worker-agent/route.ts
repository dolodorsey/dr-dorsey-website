import { NextRequest, NextResponse } from "next/server";
import { getOpsClient } from "@/lib/ops-supabase";

export const dynamic = "force-dynamic";

type Body = { key?: string; action?: string; payload?: Record<string, unknown> };

const rpcForAction: Record<string, string> = {
  claim_sms: "worker_claim_sms",
  finish_sms: "worker_finish_sms",
  claim_ig_dm: "worker_claim_ig_dm",
  finish_ig_dm: "worker_finish_ig_dm",
  claim_ig_scrape: "worker_claim_ig_scrape",
  finish_ig_scrape: "worker_finish_ig_scrape",
  insert_ig_commenters: "worker_insert_ig_commenters",
  insert_ig_likers: "worker_insert_ig_likers",
  insert_ig_inbound: "worker_insert_ig_inbound",
};

function argsFor(action: string, key: string, payload: Record<string, unknown>) {
  if (action === "claim_sms" || action === "claim_ig_dm" || action === "claim_ig_scrape") return { p_key: key };
  if (action === "finish_sms") return {
    p_key: key,
    p_id: payload.id,
    p_status: payload.status,
    p_provider_message_id: payload.provider_message_id || null,
    p_provider_response: payload.provider_response || {},
    p_error_message: payload.error_message || null,
  };
  if (action === "finish_ig_dm") return {
    p_key: key,
    p_id: payload.id,
    p_status: payload.status,
    p_result_data: payload.result_data || {},
    p_error_message: payload.error_message || null,
  };
  if (action === "finish_ig_scrape") return {
    p_key: key,
    p_id: payload.id,
    p_status: payload.status,
    p_results_count: payload.results_count || 0,
    p_error: payload.error || null,
  };
  if (action === "insert_ig_commenters" || action === "insert_ig_likers" || action === "insert_ig_inbound") return {
    p_key: key,
    p_rows: payload.rows || [],
  };
  throw new Error("Unknown worker action.");
}

function errorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (error && typeof error === "object") {
    const detail = error as { message?: unknown; details?: unknown; hint?: unknown; code?: unknown };
    return [detail.message, detail.details, detail.hint, detail.code].filter(Boolean).join(" | ") || "Worker agent failed.";
  }
  return typeof error === "string" ? error : "Worker agent failed.";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as Body;
    const action = String(body.action || "");
    const key = String(body.key || "");
    const rpc = rpcForAction[action];
    if (!rpc) throw new Error("Unknown worker action.");
    if (!key) throw new Error("Worker key is required.");
    const client = getOpsClient();
    const { data, error } = await client.rpc(rpc, argsFor(action, key, body.payload || {}));
    if (error) throw error;
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error) }, { status: 400 });
  }
}
