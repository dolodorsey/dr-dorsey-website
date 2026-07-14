import { NextRequest, NextResponse } from "next/server";
import { getOpsClient } from "@/lib/ops-supabase";

export const dynamic = "force-dynamic";

type Payload = Record<string, unknown>;

const rpcByAction: Record<string, { name: string; args: (key: string, payload: Payload) => Payload; single?: boolean }> = {
  claim_sms: { name: "worker_claim_sms", args: (key) => ({ p_key: key }), single: true },
  finish_sms: {
    name: "worker_finish_sms",
    args: (key, p) => ({ p_key: key, p_id: p.id, p_status: p.status, p_provider_message_id: p.provider_message_id ?? null, p_provider_response: p.provider_response ?? {}, p_error_message: p.error_message ?? null }),
  },
  claim_ig_dm: { name: "worker_claim_ig_dm", args: (key) => ({ p_key: key }), single: true },
  finish_ig_dm: {
    name: "worker_finish_ig_dm",
    args: (key, p) => ({ p_key: key, p_id: p.id, p_status: p.status, p_result_data: p.result_data ?? {}, p_error_message: p.error_message ?? null }),
  },
  claim_ig_scrape: { name: "worker_claim_ig_scrape", args: (key) => ({ p_key: key }), single: true },
  finish_ig_scrape: {
    name: "worker_finish_ig_scrape",
    args: (key, p) => ({ p_key: key, p_id: p.id, p_status: p.status, p_results_count: p.results_count ?? 0, p_error: p.error ?? null }),
  },
  insert_ig_commenters: { name: "worker_insert_ig_commenters", args: (key, p) => ({ p_key: key, p_rows: p.rows ?? [] }) },
  insert_ig_likers: { name: "worker_insert_ig_likers", args: (key, p) => ({ p_key: key, p_rows: p.rows ?? [] }) },
  insert_ig_inbound: { name: "worker_insert_ig_inbound", args: (key, p) => ({ p_key: key, p_rows: p.rows ?? [] }) },
  get_ig_creds: { name: "worker_get_ig_creds", args: (key, p) => ({ p_key: key, p_brand_key: p.brand_key }), single: true },
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { key?: string; action?: string; payload?: Payload };
    const key = body.key?.trim();
    const action = body.action?.trim();
    if (!key || !action || !rpcByAction[action]) return NextResponse.json({ error: "Invalid worker request." }, { status: 400 });

    const operation = rpcByAction[action];
    const { data, error } = await getOpsClient().rpc(operation.name, operation.args(key, body.payload || {}));
    if (error) throw error;
    const normalized = operation.single && Array.isArray(data) ? (data[0] ?? null) : data;
    return NextResponse.json({ data: normalized });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Worker action failed." }, { status: 400 });
  }
}
