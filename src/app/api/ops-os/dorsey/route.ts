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
  approval: { table: "khg_approval_reque...[truncated]st before = await getOne(client, source, id);
  const clean = Object.fromEntries(Object.entries(changes || {}).filter(([k]) => c.fields.includes(k)));
  if (!Object.keys(clean).length) throw new Error("No allowed changes supplied.");
  const { data, error } = await client.from(c.table).update(clean).eq(c.id, id).select("*").single();
  if (error) throw error;
  await audit(client, user, source, id, action, before, data, proof);
  return data;
}
function proofFor(source: Source, row: Json) {
  const m = meta(row.metadata);
  if (source === "work") return str(row.proof_url || m.proof_url);
  if (source === "content" || source === "calendar") return str(row.posted_url || m.proof_url);
  if (source === "campaign") return str(row.external_url || m.proof_url);
  return str(m.proof_url);
}
function proofPatch(source: Source, row: Json, proof: string) {
  const m = { ...meta(row.metadata), proof_url: proof, proof_attached_at: new Date().toISOString() };
  if (source === "work") return { proof_url: proof, metadata: m };
  if (source === "content") return { posted_url: proof, metadata: m };
  if (source === "calendar") return { posted_url: proof, metadata: m };
  if (source === "campaign") return { external_url: proof, metadata: m };
  if (["note","opportunity","approval"].includes(source)) return { metadata: m };
  return {};
}
function executedPatch(source: Source, row: Json, proof: string) {
  const p = proofPatch(source, row, proof);
  const now = new Date().toISOString();
  if (source === "work") return { ...p, status: "executed" };
  if (source === "content") return { ...p, status: "executed", publish_status: "published" };
  if (source === "calendar") return { ...p, slot_status: "executed", publish_status: "published" };
  if (source === "campaign") return { ...p, status: "executed" };
  if (source === "note") return { ...p, status: "resolved", resolved_at: now };
  if (source === "opportunity") return { ...p, status: "executed" };
  if (source === "approval") return {...[truncated]lect("*").in("content_item_id",ids).order("updated_at",{ascending:false}),
      client.from("khg_content_captions").select("*").in("content_item_id",ids).order("updated_at",{ascending:false}),
      client.from("khg_content_calendar_slots").select("*").in("content_item_id",ids).order("scheduled_for",{ascending:true}),
      client.from("khg_content_generation_requests").select("*").in("content_item_id",ids).order("updated_at",{ascending:false}),
    ]);
    if (a.error) throw a.error; if (c.error) throw c.error; if (s.error) throw s.error; if (g.error) throw g.error;
    assets=a.data||[]; captions=c.data||[]; calendar=s.data||[]; generation=g.data||[];
  }
  const now = Date.now();
  const healthRows=(health.data||[]).map((x:Json)=>{
    const t=x.last_heartbeat?new Date(x.last_heartbeat).getTime():0;
    const stale=t?Math.round((now-t)/60000):null;
    return {...x, stale_minutes:stale, heartbeat_stale:stale==null||stale>120};
  });
  return {
    generated_at:new Date().toISOString(), entity_key:"dr-dorsey",
    work:work.data||[], notes:notes.data||[], opportunities:opportunities.data||[],
    content:content.data||[], content_assets:assets, content_captions:captions,
    content_calendar:calendar, content_generation:generation, campaigns:campaigns.data||[],
    approvals:approvals.data||[], social_accounts:accounts.data||[], handoffs:handoffs.data||[],
    agent_health:healthRows, agent_executions:executions.data||[], workers:workers.data||[],
    worker_dispatch:dispatch.data||[], audit:history.data||[],
    status_contract:["draft","ready","needs_approval","approved","assigned","in_progress","waiting","blocked","needs_proof","executed","verified"]
  };
}

async function managedHandoff(client: ReturnType<typeof getOpsClient>, agent:string, title:string, source:Source|"new", id:string, body:Json) {
  const a=agent.toLowerCase().replace(/[^a-z0-9_-]/g,"_");
  const muse=a==="muse";
  const { data,error }=await client.from("khg_managed_agent_handoffs").insert({...[truncated]verage_value:body.leverage_value||null}
      }).select("*").single();
      if(error) throw error; data=d; await audit(client,user,"work",d.id,"create",{},d,d.proof_url);
    } else if(op==="create_opportunity") {
      const {data:d,error}=await client.from("khg_revenue_opportunities").insert({
        brand_key:"dr-dorsey", revenue_lane:body.revenue_lane||"enterprise_origination",
        opportunity_name:str(body.opportunity_name||body.title)||"New opportunity",
        contact_name:body.contact_name||null, contact_method:body.contact_method||null,
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
      const {data:d,error}=await client.from("khg_marketi...[truncated](client,user,source,id,executedPatch(source,row,proof),"mark_executed",proof);
    } else if(op==="decision") {
      const source=body.source as Source; const id=str(body.id); const decision=str(body.decision);
      const now=new Date().toISOString();
      if(source==="approval") data=await update(client,user,source,id,{status:decision==="approve"?"approved":decision==="reject"?"rejected":"needs_revision",decision_note:body.note||null,decided_at:now},"decision");
      else {
        const row=await getOne(client,source,id);
        const m={...meta(row.metadata),approval_state:decision==="approve"?"approved":decision==="reject"?"rejected":"needs_revision",approval_note:body.note||null,approval_at:now};
        const patch:Json={metadata:m};
        if(cfg[source].fields.includes("approval_status")) patch.approval_status=m.approval_state;
        if(cfg[source].fields.includes("status") && decision==="revise") patch.status="needs_revision";
        data=await update(client,user,source,id,patch,"decision");
      }
    } else if(op==="handoff_opportunity") {
      const id=str(body.id); const row=await getOne(client,"opportunity",id);
      const destination=str(body.destination_brand);
      if(!destination) throw new Error("Destination brand is required.");
      const hand=await managedHandoff(client,str(body.agent||"dot"),`Origination handoff — ${row.opportunity_name}`,"opportunity",id,{...body,expected_behavior:`Accept Dorsey-originated opportunity into ${destination}. Preserve source=DORSEY and write acceptance/proof back.`});
      const m={...meta(row.metadata),source:"DORSEY",destination_brand:destination,handoff_status:"sent",handoff_id:hand.id,founder_leverage_required:Boolean(body.founder_leverage_required)};
      data=await update(client,user,"opportunity",id,{metadata:m,status:body.founder_leverage_required?"waiting":"handed_off"},"handoff_opportunity");
    } else if(op==="worker_state") {
      const id=str(body.id); await getOne(client,"worker",i...[truncated]