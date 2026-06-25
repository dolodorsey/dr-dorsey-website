import { NextRequest, NextResponse } from "next/server";
import { getOpsClient } from "@/lib/ops-supabase";

export const dynamic = "force-dynamic";

const resources = {
  projects: "enterprise_projects",
  dashboards: "enterprise_dashboards",
  centers: "enterprise_command_centers",
  approvals: "enterprise_approvals",
  security: "security_audit_findings",
  ai: "ai_build_tasks",
  campaigns: "marketing_campaigns",
  content: "marketing_content_queue",
  eventbrite: "eventbrite_events",
  outreach: "outreach_queue",
  audit: "enterprise_audit_logs",
} as const;

type Resource = keyof typeof resources;
type Values = Record<string, unknown>;

function accessToken(request: NextRequest) {
  const header = request.headers.get("authorization");
  return header?.startsWith("Bearer ") ? header.slice(7) : undefined;
}

function required(value: unknown, label: string) {
  if (!value || String(value).trim() === "") throw new Error(`${label} is required.`);
  return String(value).trim();
}

async function logAction(client: ReturnType<typeof getOpsClient>, action: string, target: string, id: string, payload: Values) {
  await client.from("enterprise_audit_logs").insert({
    action_type: action, target_type: target, target_id: id, status: "completed", payload_snapshot: payload,
  });
}

export async function GET(request: NextRequest) {
  const resource = request.nextUrl.searchParams.get("resource") as Resource | null;
  if (!resource || !resources[resource]) return NextResponse.json({ error: "Unknown enterprise resource." }, { status: 400 });
  const client = getOpsClient(accessToken(request));
  const { data, error } = await client.from(resources[resource]).select("*").order("created_at", { ascending: false }).limit(200);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const token = accessToken(request);
  if (!token) return NextResponse.json({ error: "Sign in to create enterprise records." }, { status: 401 });
  try {
    const body = await request.json() as Values;
    const operation = required(body.operation, "Operation");
    const client = getOpsClient(token);
    let table = "";
    let values: Values = {};

    if (operation === "campaign") {
      table = resources.campaigns;
      values = {
        campaign_name: required(body.campaign_name, "Campaign name"), division: body.division || null,
        brand_name: body.brand_name || null, primary_account: body.primary_account || null,
        campaign_type: body.campaign_type || "multi_channel", objective: body.objective || null,
        start_date: body.start_date || null, end_date: body.end_date || null,
        primary_cta: body.primary_cta || null, status: "draft", priority: body.priority || "normal", owner: body.owner || null,
      };
    } else if (operation === "eventbrite_draft") {
      table = resources.eventbrite;
      values = {
        event_name: required(body.event_name, "Event name"), division: body.division || null,
        brand_name: body.brand_name || null, venue_name: body.venue_name || null,
        venue_address: body.venue_address || null, starts_at: body.starts_at || null, ends_at: body.ends_at || null,
        flyer_url: body.flyer_url || null, approval_status: "ready_for_review", publish_status: "not_published",
        payload_preview: {
          name: body.event_name, venue: body.venue_name, address: body.venue_address,
          starts_at: body.starts_at, ends_at: body.ends_at, ticket_classes: body.ticket_classes || [],
        },
      };
    } else if (operation === "ai_task") {
      table = resources.ai;
      values = {
        task_title: required(body.task_title, "Task title"), task_type: body.task_type || "build",
        assigned_agent: body.assigned_agent || "codex", division: body.division || null,
        brand_name: body.brand_name || null, status: "draft", priority: body.priority || "normal",
        repo_url: body.repo_url || null, branch_name: body.branch_name || null,
        description: body.description || null, acceptance_criteria: String(body.acceptance_criteria || "").split("\n").filter(Boolean),
        required_env_vars: String(body.required_env_vars || "").split(",").map((item) => item.trim()).filter(Boolean),
        risk_notes: body.risk_notes || null,
      };
    } else if (operation === "outreach") {
      table = resources.outreach;
      values = {
        division: body.division || null, brand_name: body.brand_name || null,
        platform: body.platform || "instagram", target_handle: required(body.target_handle, "Target handle"),
        target_name: body.target_name || null, segment: body.segment || null,
        message_script: required(body.message_script, "Message script"), assigned_to: body.assigned_to || null,
        outreach_status: "queued", next_follow_up_at: body.next_follow_up_at || null,
        metadata: { human_approval_required: true },
      };
    } else {
      return NextResponse.json({ error: "Unknown operation." }, { status: 400 });
    }

    const { data, error } = await client.from(table).insert(values).select().single();
    if (error) throw error;
    await logAction(client, `create_${operation}`, table, data.id, values);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Enterprise operation failed." }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  const token = accessToken(request);
  if (!token) return NextResponse.json({ error: "Sign in to update enterprise records." }, { status: 401 });
  try {
    const body = await request.json() as Values;
    const resource = required(body.resource, "Resource") as Resource;
    const id = required(body.id, "ID");
    if (!resources[resource]) throw new Error("Unknown resource.");
    const allowed: Partial<Record<Resource, string[]>> = {
      approvals: ["approval_status", "decision_notes", "approved_at", "rejected_at"],
      security: ["remediation_status", "reviewed_by", "reviewed_at"],
      ai: ["status", "result_notes", "risk_notes", "priority"],
      campaigns: ["status", "priority", "owner"],
      content: ["approval_status", "publish_status", "scheduled_for"],
      eventbrite: ["approval_status", "publish_status"],
      outreach: ["outreach_status", "response_status", "next_follow_up_at", "assigned_to"],
    };
    const changes = Object.fromEntries(Object.entries(body.changes as Values).filter(([key]) => allowed[resource]?.includes(key)));
    const client = getOpsClient(token);
    const { data, error } = await client.from(resources[resource]).update({ ...changes, updated_at: new Date().toISOString() }).eq("id", id).select().single();
    if (error) throw error;
    await logAction(client, `update_${resource}`, resources[resource], id, changes);
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Enterprise update failed." }, { status: 400 });
  }
}
