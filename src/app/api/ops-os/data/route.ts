import { NextRequest, NextResponse } from "next/server";
import { getOpsClient } from "@/lib/ops-supabase";

export const dynamic = "force-dynamic";

const tables = {
  home: "khg_dashboard_cards",
  social: "v_khg_social_command",
  "social-accounts": "khg_social_accounts",
  marketing: "khg_marketing_calendar_items",
  approvals: "khg_approval_requests",
  "content-studio": "khg_content_generation_requests",
  events: "khg_event_rollouts",
  revenue: "khg_revenue_opportunities",
  tasks: "khg_work_queues",
} as const;

type Resource = keyof typeof tables;
type JsonRecord = Record<string, unknown>;

function token(request: NextRequest) {
  const value = request.headers.get("authorization");
  return value?.startsWith("Bearer ") ? value.slice(7) : undefined;
}

function required(value: unknown, label: string) {
  if (!value || String(value).trim() === "") throw new Error(`${label} is required.`);
  return String(value).trim();
}

function optionalText(value: unknown) {
  return value == null || String(value).trim() === "" ? null : String(value).trim();
}

function key(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

async function insert(client: ReturnType<typeof getOpsClient>, table: string, values: JsonRecord) {
  const { data, error } = await client.from(table).insert(values).select().single();
  if (error) throw error;
  return data;
}

async function findSocialAccount(client: ReturnType<typeof getOpsClient>, body: JsonRecord) {
  const socialAccountId = optionalText(body.social_account_id);
  const accountKey = optionalText(body.account_key);
  const handle = optionalText(body.account_handle);

  if (socialAccountId) {
    const { data, error } = await client.from("khg_social_accounts").select("*").eq("id", socialAccountId).maybeSingle();
    if (error) throw error;
    if (data) return data as JsonRecord;
  }
  if (accountKey) {
    const { data, error } = await client.from("khg_social_accounts").select("*").eq("account_key", accountKey).maybeSingle();
    if (error) throw error;
    if (data) return data as JsonRecord;
  }
  if (handle) {
    const { data, error } = await client.from("khg_social_accounts").select("*").ilike("handle", handle).maybeSingle();
    if (error) throw error;
    if (data) return data as JsonRecord;
  }
  return null;
}

export async function GET(request: NextRequest) {
  const resource = request.nextUrl.searchParams.get("resource") as Resource | null;
  if (!resource || !tables[resource]) return NextResponse.json({ error: "Unknown resource." }, { status: 400 });
  try {
    const client = getOpsClient(token(request));
    const table = tables[resource];
    let query = client.from(table).select("*").limit(200);
    if (resource === "approvals") query = query.order("created_at", { ascending: false });
    else if (resource === "social") query = query.order("scheduled_for", { ascending: true, nullsFirst: false });
    else if (resource === "social-accounts") query = query.order("brand_key", { ascending: true });
    else if (resource === "marketing") query = query.order("scheduled_for", { ascending: true, nullsFirst: false });
    else if (resource === "tasks") query = query.order("due_at", { ascending: true, nullsFirst: false });
    else query = query.order("created_at", { ascending: false });
    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load data." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const accessToken = token(request);
  if (!accessToken) return NextResponse.json({ error: "Sign in to create or change work." }, { status: 401 });
  try {
    const body = (await request.json()) as JsonRecord;
    const operation = required(body.operation, "Operation");
    const client = getOpsClient(accessToken);
    let data: unknown;

    if (operation === "social_program") {
      const socialAccount = await findSocialAccount(client, body);
      const brand = required(body.brand_key || socialAccount?.brand_key, "Brand");
      const title = required(body.title, "Title");
      const postBlockKey = optionalText(body.post_block_key) || key("post-block");
      const accountKey = optionalText(body.account_key) || optionalText(socialAccount?.account_key);
      const socialAccountId = optionalText(socialAccount?.id);
      const scheduledFor = required(body.scheduled_for, "Schedule");
      const isCustomTime = Boolean(body.custom_time);

      const item = await insert(client, "khg_content_items", {
        brand_key: brand,
        social_account_id: socialAccountId,
        account_key: accountKey,
        post_block_key: postBlockKey,
        platform: body.platform || socialAccount?.platform || "instagram",
        content_type: body.content_type || "post",
        title,
        brief: body.brief || null,
        cta: body.cta || null,
        status: "needs_approval",
        priority: body.priority || "normal",
        owner_label: body.owner_label || "Social Ops",
        publish_status: "not_published",
        approval_status: "needs_approval",
        qa_status: "needs_review",
        final_asset_url: body.asset_url || null,
        scheduled_time_label: body.scheduled_time_label || null,
        metadata: {
          account_handle: socialAccount?.handle || body.account_handle || null,
          account_label: socialAccount?.account_label || null,
          custom_time: isCustomTime,
          source: "ops-os-social-command",
        },
      });

      const [caption, asset, slot, approval] = await Promise.all([
        insert(client, "khg_content_captions", {
          content_item_id: item.id,
          caption_block_key: postBlockKey,
          caption_text: required(body.caption_text, "Caption"),
          cta: body.cta || null,
          status: "needs_review",
          approved_caption: false,
          metadata: { source: "ops-os-social-command" },
        }),
        insert(client, "khg_content_assets", {
          content_item_id: item.id,
          brand_key: brand,
          asset_url: body.asset_url || null,
          final_asset_url: body.asset_url || null,
          thumbnail_url: body.asset_url || null,
          file_name: body.file_name || null,
          asset_role: "primary_creative",
          upload_block_key: postBlockKey,
          status: body.asset_url ? "needs_review" : "draft",
          approval_status: body.asset_url ? "needs_review" : "needs_asset",
          metadata: { source: "ops-os-social-command" },
        }),
        insert(client, "khg_content_calendar_slots", {
          content_item_id: item.id,
          social_account_id: socialAccountId,
          account_key: accountKey,
          brand_key: brand,
          platform: body.platform || socialAccount?.platform || "instagram",
          scheduled_for: scheduledFor,
          timezone: body.timezone || "America/New_York",
          slot_status: "needs_approval",
          custom_time: isCustomTime,
          publish_status: "not_published",
          metadata: { post_block_key: postBlockKey, source: "ops-os-social-command" },
        }),
        insert(client, "khg_approval_requests", {
          approval_key: key("social"),
          department_key: "social",
          brand_key: brand,
          source_type: "content_item",
          source_id: item.id,
          title,
          preview_url: body.asset_url || null,
          preview_text: body.caption_text,
          requested_by: body.owner_label || "Social Ops",
          status: "pending",
          risk_level: "normal",
          metadata: {
            post_block_key: postBlockKey,
            social_account_id: socialAccountId,
            account_key: accountKey,
            account_handle: socialAccount?.handle || body.account_handle || null,
          },
        }),
      ]);
      data = { item, caption, asset, slot, approval, social_account: socialAccount };
    } else if (operation === "marketing_create") {
      const name = required(body.campaign_name, "Campaign name");
      const stage = optionalText(body.funnel_stage) || "awareness";
      const ghlStage = optionalText(body.ghl_stage) || optionalText(body.conversion_stage) || stage;
      const budget = Number(body.budget || 0);
      const campaign = await insert(client, "khg_marketing_campaigns", {
        campaign_key: key("marketing"),
        brand_key: body.brand_key || null,
        campaign_name: name,
        campaign_goal: body.campaign_goal || null,
        conversion_goal: body.campaign_goal || null,
        offer_name: body.offer_name || null,
        funnel_stage: stage,
        conversion_stage: body.conversion_stage || stage,
        ghl_stage: ghlStage,
        start_date: body.start_date || null,
        end_date: body.end_date || null,
        budget,
        status: "draft",
        owner_label: body.owner_label || null,
        metadata: { source: "ops-os-marketing-command" },
      });
      const calendar = await insert(client, "khg_marketing_calendar_items", {
        campaign_id: campaign.id,
        brand_key: body.brand_key || null,
        channel: body.channel || "email",
        title: name,
        copy_preview: body.copy_preview || null,
        asset_url: body.asset_url || null,
        audience_key: body.audience_key || null,
        scheduled_for: body.scheduled_for || null,
        timezone: body.timezone || "America/New_York",
        status: "needs_approval",
        funnel_stage: stage,
        offer_name: body.offer_name || null,
        campaign_goal: body.campaign_goal || null,
        budget,
        owner_label: body.owner_label || null,
        conversion_stage: body.conversion_stage || stage,
        ghl_stage: ghlStage,
        custom_time: Boolean(body.custom_time),
        approval_status: "needs_approval",
        metadata: { source: "ops-os-marketing-command" },
      });
      const approval = await insert(client, "khg_approval_requests", {
        approval_key: key("marketing"),
        department_key: "marketing",
        brand_key: body.brand_key || null,
        source_type: "marketing_campaign",
        source_id: campaign.id,
        title: name,
        preview_url: body.asset_url || null,
        preview_text: body.copy_preview || null,
        requested_by: body.owner_label || "Marketing Ops",
        status: "pending",
        risk_level: "normal",
        metadata: {
          channel: body.channel || "email",
          funnel_stage: stage,
          ghl_stage: ghlStage,
          audience_key: body.audience_key || null,
        },
      });
      data = { campaign, calendar, approval };
    } else if (operation === "creative_request") {
      const brand = required(body.brand_key, "Brand");
      const title = required(body.title, "Title");
      const item = await insert(client, "khg_content_items", {
        brand_key: brand, platform: body.platform || "instagram", content_type: body.content_type || "post",
        title, brief: body.brief || null, status: "needs_graphic", priority: body.priority || "normal",
      });
      data = await insert(client, "khg_content_generation_requests", {
        content_item_id: item.id, brand_key: brand, request_type: body.request_type || "graphic",
        request_prompt: required(body.request_prompt, "Generation prompt"),
        source_files: body.source_url ? [body.source_url] : [],
        target_dimensions: body.target_dimensions || null,
        requested_tool: body.requested_tool || "ai", due_at: body.due_at || null,
      });
    } else if (operation === "event_create") {
      const name = required(body.event_name, "Event name");
      const event = await insert(client, "khg_event_rollouts", {
        event_key: key("event"), brand_key: body.brand_key || null, event_name: name,
        event_date: body.event_date || null, venue_name: body.venue_name || null, city: body.city || null,
        ticketing_url: body.ticketing_url || null, flyer_asset_url: body.flyer_asset_url || null, status: "planning",
      });
      const taskNames = ["Finalize ticketing", "Approve event creative", "Launch promotion", "Confirm staffing"];
      const { data: tasks, error } = await client.from("khg_work_queues").insert(taskNames.map((title) => ({
        department_key: "events", queue_key: key("event-task"), brand_key: body.brand_key || null,
        source_type: "event", source_id: event.id, title: `${title}: ${name}`, priority: "high",
        status: "open", owner_label: body.owner_label || "Events Ops", due_at: body.event_date || null, proof_required: true,
      }))).select();
      if (error) throw error;
      data = { event, tasks };
    } else if (operation === "revenue_create") {
      data = await insert(client, "khg_revenue_opportunities", {
        brand_key: body.brand_key || null, revenue_lane: required(body.revenue_lane, "Revenue lane"),
        opportunity_name: required(body.opportunity_name, "Opportunity"), contact_name: body.contact_name || null,
        contact_method: body.contact_method || null, offer_name: body.offer_name || null,
        estimated_value: Number(body.estimated_value || 0), next_action: body.next_action || null,
        blocker_reason: body.blocker_reason || null, owner_label: body.owner_label || null,
        due_at: body.due_at || null, status: "open",
      });
    } else if (operation === "task_create") {
      data = await insert(client, "khg_work_queues", {
        department_key: body.department_key || "tasks", queue_key: key("task"), brand_key: body.brand_key || null,
        title: required(body.title, "Task title"), description: body.description || null, priority: body.priority || "normal",
        status: body.status || "open", owner_label: body.owner_label || null, due_at: body.due_at || null,
        proof_required: Boolean(body.proof_required), proof_url: body.proof_url || null,
        metadata: { blocker: body.blocker_reason || null, handoff_to: body.handoff_to || null },
      });
    } else {
      return NextResponse.json({ error: "Unknown operation." }, { status: 400 });
    }
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Operation failed." }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  const accessToken = token(request);
  if (!accessToken) return NextResponse.json({ error: "Sign in to create or change work." }, { status: 401 });
  try {
    const body = (await request.json()) as JsonRecord;
    const resource = required(body.resource, "Resource") as Resource;
    const id = required(body.id, "ID");
    if (!tables[resource] || resource === "home" || resource === "social" || resource === "social-accounts") throw new Error("Resource cannot be updated directly.");
    const allowed: Record<string, string[]> = {
      approvals: ["status", "decision_note", "decided_at"],
      marketing: ["status", "scheduled_for", "copy_preview", "asset_url", "budget", "funnel_stage", "offer_name", "campaign_goal", "owner_label", "conversion_stage", "ghl_stage", "approval_status"],
      "content-studio": ["status", "output_payload"],
      events: ["status", "ambassador_status", "street_team_status", "staffing_status"],
      revenue: ["status", "next_action", "blocker_reason", "owner_label", "due_at"],
      tasks: ["status", "title", "description", "priority", "owner_label", "due_at", "proof_url", "metadata"],
    };
    const changes = Object.fromEntries(Object.entries(body.changes as JsonRecord).filter(([field]) => allowed[resource]?.includes(field)));
    const client = getOpsClient(accessToken);
    const { data, error } = await client.from(tables[resource]).update({ ...changes, updated_at: new Date().toISOString() }).eq("id", id).select().single();
    if (error) throw error;
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Update failed." }, { status: 400 });
  }
}
