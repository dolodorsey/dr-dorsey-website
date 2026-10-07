/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getOpsClient } from "@/lib/ops-supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Json = Record<string, any>;
type Source = "work" | "note" | "opportunity" | "content" | "calendar" | "campaign" | "approval" | "handoff" | "worker";

const DORSEY_KEYS = ["dr-dorsey", "dr_dorsey", "dorsey", "the-kollective", "the_kollective", "kollective"];
const PROOF_TERMINAL = new Set(["executed", "verified", "done", "resolved", "published", "posted"]);

const cfg: Record<Source, { table: string; id: string; fields: string[] }> = {
  work: { table: "khg_work_queues", id: "id", fields: ["title","description","priority","status","owner_label","due_at","proof_required","proof_url","metadata"] },
  note: { table: "enterprise_handoff_notes", id: "id", fields: ["title","summary","assigned_to","status","priority","next_action","blocker","decision","source_url","due_at","resolved_at","metadata"] },
  opportunity: { table: "khg_revenue_opportunities", id: "id", fields: ["opportunity_name","contact_name","contact_method","offer_name","estimated_value","next_action","blocker_reason","owner_label","due_at","status","metadata"] },
  content: { table: "khg_content_items", id: "id", fields: ["title","brief","cta","target_url","status","priority","owner_label","publish_status","posted_url","final_asset_url","approval_status","qa_status","scheduled_time_label","metadata"] },
  calendar: { table: "khg_content_calendar_slots", id: "id", fields: ["scheduled_for","slot_status","publish_status","posted_url","metadata"] },
  campaign: { table: "khg_marketing_calendar_items", id: "id", fields: ["title","copy_preview","asset_url","audience_key","scheduled_for","status","external_url","funnel_stage","offer_name","campaign_goal","budget","owner_label","conversion_stage","ghl_stage","approval_status","metadata"] },
  approval: { table: "khg_approval_reque...[truncated] client.from("enterprise_handoff_notes").select("*").in("entity_key", DORSEY_KEYS).order("updated_at", { ascending:false }).limit(250),
    client.from("khg_revenue_opportunities").select("*").in("brand_key", DORSEY_KEYS).order("updated_at", { ascending:false }).limit(200),
    client.from("khg_content_items").select("*").in("brand_key", DORSEY_KEYS).order("updated_at", { ascending:false }).limit(200),
    client.from("khg_marketing_calendar_items").select("*").in("brand_key", DORSEY_KEYS).order("updated_at", { ascending:false }).limit(200),
    client.from("khg_approval_requests").select("*").in("brand_key", DORSEY_KEYS).order("updated_at", { ascending:false }).limit(200),
    client.from("khg_social_accounts").select("*").in("brand_key", DORSEY_KEYS).order("platform").limit(60),
    client.from("khg_managed_agent_handoffs").select("*").or("title.ilike.%DORSEY%,routes_files.ilike.%/ops-os/dorsey%").order("created_at", { ascending:false }).limit(100),
    client.from("agent_health").select("*").order("last_heartbeat", { ascending:false }).limit(150),
    client.from("agent_executions").select("*").order("created_at", { ascending:false }).limit(150),
    client.from("worker_state").select("*").order("worker").limit(150),
    client.from("worker_dispatch_log").select("*").order("dispatched_at", { ascending:false }).limit(100),
    client.from("khg_dorsey_execution_audit").select("*").order("created_at", { ascending:false }).limit(300),
  ]);
  const all: Record<string, any> = { work,notes,opportunities,content,campaigns,approvals,accounts,handoffs,health,executions,workers,dispatch,history };
  for (const [name, result] of Object.entries(all)) if (result.error) throw new Error(`${name}: ${result.error.message}`);

  const ids = (content.data || []).map((x:Json)=>x.id);
  let assets:Json[]=[]; let captions:Json[]=[]; let calendar:Json[]=[]; let generation:Json[]=[];
  if (ids.length) {
    const [a,c,s,g] = await Promise.all([
      client.from("khg_content_assets").se...[truncated]tact_name||null, contact_method:body.contact_method||null,
        offer_name:body.offer_name||null, estimated_value:Number(body.estimated_value||0),
        next_action:body.next_action||null, blocker_reason:body.blocker_reason||null,
        owner_label:body.owner_label||"DOT", due_at:body.due_at||null, status:"open",
        metadata:{...meta(body.metadata),source:"DORSEY",destination_brand:body.destination_brand||null,handoff_status:"not_handed_off"}
      }).select("*").single();
      if(error) throw error; data=d; await audit(client,user,"opportunity",d.id,"create",{},d);
    } else if(op==="create_content") {
      const {data:d,error}=await client.from("khg_content_items").insert({
        brand_key:"dr-dorsey", platform:body.platform||"instagram", content_type:body.content_type||"post",
        title:str(body.title)||"Dorsey content", brief:body.brief||null, cta:body.cta||null,
        target_url:body.target_url||null, status:"ready", priority:body.priority||"high",
        owner_label:body.owner_label||"Muse", publish_status:"not_published",
        approval_status:"needs_approval", qa_status:"needs_review",
        metadata:{...meta(body.metadata),engine:"content",needs_recording:Boolean(body.needs_recording),needs_photo:Boolean(body.needs_photo)}
      }).select("*").single();
      if(error) throw error; data=d; await audit(client,user,"content",d.id,"create",{},d);
    } else if(op==="create_campaign") {
      const {data:d,error}=await client.from("khg_marketing_calendar_items").insert({
        brand_key:"dr-dorsey", channel:body.channel||"social", title:str(body.title)||"Dorsey campaign",
        copy_preview:body.copy_preview||null, asset_url:body.asset_url||null, audience_key:body.audience_key||null,
        scheduled_for:body.scheduled_for||null, timezone:"America/New_York", status:"ready",
        funnel_stage:body.funnel_stage||"awareness", offer_name:body.offer_name||null,
        campaign_goal:body.campaign_goal||null, budget:Number(body.bud...[truncated]sted.slot_status||requested.publish_status);
    if(nextStatus && PROOF_TERMINAL.has(nextStatus) && !str(requested.proof_url||requested.posted_url||requested.external_url||proofFor(source,row))) {
      if(source==="work"||source==="content"||source==="campaign") requested.status="needs_proof";
      throw new Error("Proof is required before execution can be counted.");
    }
    const data=await update(client,user,source,id,requested,"edit",str(requested.proof_url||requested.posted_url||requested.external_url)||null);
    return NextResponse.json({data});
  } catch(e) {
    const m=e instanceof Error?e.message:"Dorsey update failed.";
    return NextResponse.json({error:m},{status:m==="AUTH_REQUIRED"?401:400});
  }
}
