/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getOpsClient } from "@/lib/ops-supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type J = Record<string, any>;
type Source = "work"|"note"|"opportunity"|"content"|"calendar"|"campaign"|"approval"|"handoff"|"worker";

const KEYS=["dr-dorsey","dr_dorsey","dorsey","the-kollective","the_kollective","kollective"];
const tables:Record<Source,{table:string,id:string,fields:string[]}>={
  work:{table:"khg_work_queues",id:"id",fields:["title","description","priority","status","owner_label","due_at","proof_required","proof_url","metadata"]},
  note:{table:"enterprise_handoff_notes",id:"id",fields:["title","summary","assigned_to","status","priority","next_action","blocker","decision","source_url","due_at","resolved_at","metadata"]},
  opportunity:{table:"khg_revenue_opportunities",id:"id",fields:["opportunity_name","contact_name","contact_method","offer_name","estimated_value","next_action","blocker_reason","owner_label","due_at","status","metadata"]},
  content:{table:"khg_content_items",id:"id",fields:["title","brief","cta","target_url","status","priority","owner_label","publish_status","posted_url","final_asset_url","approval_status","qa_status","scheduled_time_label","metadata"]},
  calendar:{table:"khg_content_calendar_slots",id:"id",fields:["scheduled_for","slot_status","publish_status","posted_url","metadata"]},
  campaign:{table:"khg_marketing_calendar_items",id:"id",fields:["title","copy_preview","asset_url","audience_key","scheduled_for","status","external_url","funnel_stage","offer_name","campaign_goal","budget","owner_label","conversion_stage","ghl_stage","approval_status","metadata"]},
  approval:{table:"khg_approval_requests",id:"id",fields:["title","status","risk_level","decision_note","decided_at","due_at","metadata"]},
  handoff:{table:"khg_managed_agent_handoffs",id:"id",fields:["priority","title","routes_files","supabase_targets","current_problem","expected_behavior","founder_summary","status","assigned_to","accepted_at","completed_at"]},
  worker:{table:"worker_state",id:"worker",fields:["is_paused","paused_at","paused_reason","updated_at"]},
};
const terminal=new Set(["executed","verified","done","resolved","published","posted"]);

const bearer=(r:NextRequest)=>(r.headers.get("authorization")||"").replace(/^Bearer\s+/,"");
const s=(v:any)=>v==null?"":String(v).trim();
const m=(v:any):J=>v&&typeof v==="object"&&!Array.isArray(v)?{...v}:{};
const k=(p:string)=>`${p}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

async function session(req:NextRequest){
  const token=bearer(req);
  if(!token) throw new Error("AUTH_REQUIRED");
  const client=getOpsClient(token);
  const {data,error}=await client.auth.getUser();
  if(error||!data.user) throw new Error("AUTH_REQUIRED");
  return {client,user:data.user};
}
function scoped(source:Source,row:J){
  if(source==="worker") return true;
  if(source==="handoff") return /dorsey|\/ops-os\/dorsey/i.test([row.title,row.routes_files,row.supabase_targets].filter(Boolean).join(" "));
  const key=row.brand_key||row.entity_key;
  return !key||KEYS.includes(String(key));
}
async function one(client:ReturnType<typeof getOpsClient>,source:Source,id:string){
  const c=tables[source];
  const {data,error}=await client.from(c.table).select("*").eq(c.id,id).single();
  if(error) throw error;
  if(!scoped(source,data)) throw new Error("OUT_OF_SCOPE");
  return data as J;
}
async function log(client:ReturnType<typeof getOpsClient>,user:J,source:Source,id:string,action:string,before:J,after:J,proof?:string){
  const {error}=await client.from("khg_dorsey_execution_audit").insert({
    entity_key:"dr-dorsey",actor_id:user.id,actor_label:user.email||"Ops OS",
    action,source_table:tables[source].table,source_id:id,before_state:before,after_state:after,
    proof_url:proof||null,metadata:{route:"/ops-os/dorsey"}
  });
  if(error) throw error;
}
async function mutate(client:ReturnType<typeof getOpsClient>,user:J,source:Source,id:string,changes:J,action="edit",proof?:string){
  const before=await one(client,source,id), c=tables[source];
  const clean=Object.fromEntries(Object.entries(changes||{}).filter(([f])=>c.fields.includes(f)));
  if(!Object.keys(clean).length) throw new Error("No allowed changes supplied.");
  const {data,error}=await client.from(c.table).update(clean).eq(c.id,id).select("*").single();
  if(error) throw error;
  await log(client,user,source,id,action,before,data,proof);
  return data;
}
function proofOf(source:Source,row:J){
  const mm=m(row.metadata);
  if(source==="work") return s(row.proof_url||mm.proof_url);
  if(source==="content"||source==="calendar") return s(row.posted_url||mm.proof_url);
  if(source==="campaign") return s(row.external_url||mm.proof_url);
  return s(mm.proof_url);
}
function proofPatch(source:Source,row:J,proof:string){
  const mm={...m(row.metadata),proof_url:proof,proof_attached_at:new Date().toISOString()};
  if(source==="work") return {proof_url:proof,metadata:mm};
  if(source==="content") return {posted_url:proof,metadata:mm};
  if(source==="calendar") return {posted_url:proof,metadata:mm};
  if(source==="campaign") return {external_url:proof,metadata:mm};
  if(["note","opportunity","approval"].includes(source)) return {metadata:mm};
  return {};
}
function execPatch(source:Source,row:J,proof:string){
  const p=proofPatch(source,row,proof), now=new Date().toISOString();
  if(source==="work") return {...p,status:"executed"};
  if(source==="content") return {...p,status:"executed",publish_status:"published"};
  if(source==="calendar") return {...p,slot_status:"executed",publish_status:"published"};
  if(source==="campaign") return {...p,status:"executed"};
  if(source==="note") return {...p,status:"resolved",resolved_at:now};
  if(source==="opportunity") return {...p,status:"executed"};
  if(source==="approval") return {...p,status:"approved",decided_at:now};
  return p;
}
async function handoff(client:ReturnType<typeof getOpsClient>,agent:string,title:string,target:string,body:J){
  const a=agent.toLowerCase().replace(/[^a-z0-9_-]/g,"_"), muse=a==="muse";
  const {data,error}=await client.from("khg_managed_agent_handoffs").insert({
    agent_key:a,handoff_type:body.handoff_type||(muse?"external_execution":"dashboard_execution"),
    priority:body.priority||"high",title:`DORSEY — ${title}`,routes_files:"/ops-os/dorsey",
    supabase_targets:target,current_problem:body.summary||body.current_problem||title,
    expected_behavior:body.next_action||body.expected_behavior||"Execute assigned work and write result/proof back to Supabase.",
    do_not_break:muse
      ?"Muse owns external-send execution. Verify target, brand, suppression/DNC, sender route and approval. Handoff is not execution; native provider proof must write back."
      :"No uncontrolled external sends. No completion without proof.",
    acceptance_tests:"Result, status, blocker and proof write back to Supabase.",
    rollback_plan:"Do not overwrite source truth; return a blocker if execution cannot be verified.",
    founder_summary:body.founder_summary||body.summary||title,status:"ready",assigned_to:a
  }).select("*").single();
  if(error) throw error;
  return data;
}
async function readData(client:ReturnType<typeof getOpsClient>){
  const qs=[
    ["work",client.from("khg_work_queues").select("*").in("brand_key",KEYS).order("updated_at",{ascending:false}).limit(200)],
    ["notes",client.from("enterprise_handoff_notes").select("*").in("entity_key",KEYS).order("updated_at",{ascending:false}).limit(250)],
    ["opportunities",client.from("khg_revenue_opportunities").select("*").in("brand_key",KEYS).order("updated_at",{ascending:false}).limit(200)],
    ["content",client.from("khg_content_items").select("*").in("brand_key",KEYS).order("updated_at",{ascending:false}).limit(200)],
    ["calendar",client.from("khg_content_calendar_slots").select("*").in("brand_key",KEYS).order("scheduled_for",{ascending:true}).limit(200)],
    ["campaigns",client.from("khg_marketing_calendar_items").select("*").in("brand_key",KEYS).order("updated_at",{ascending:false}).limit(200)],
    ["approvals",client.from("khg_approval_requests").select("*").in("brand_key",KEYS).order("updated_at",{ascending:false}).limit(200)],
    ["social_accounts",client.from("khg_social_accounts").select("*").in("brand_key",KEYS).order("platform").limit(60)],
    ["handoffs",client.from("khg_managed_agent_handoffs").select("*").or("title.ilike.%DORSEY%,routes_files.ilike.%/ops-os/dorsey%").order("created_at",{ascending:false}).limit(120)],
    ["agent_health",client.from("agent_health").select("*").order("last_heartbeat",{ascending:false}).limit(150)],
    ["agent_executions",client.from("agent_executions").select("*").order("created_at",{ascending:false}).limit(150)],
    ["workers",client.from("worker_state").select("*").order("worker").limit(150)],
    ["worker_dispatch",client.from("worker_dispatch_log").select("*").order("dispatched_at",{ascending:false}).limit(120)],
    ["audit",client.from("khg_dorsey_execution_audit").select("*").order("created_at",{ascending:false}).limit(300)]
  ] as const;
  const results=await Promise.all(qs.map(async([name,q])=>[name,await q] as const));
  const out:J={generated_at:new Date().toISOString(),entity_key:"dr-dorsey"};
  for(const [name,r] of results){if(r.error) throw new Error(`${name}: ${r.error.message}`); out[name]=r.data||[];}
  const now=Date.now();
  out.agent_health=(out.agent_health||[]).map((x:J)=>{
    const t=x.last_heartbeat?new Date(x.last_heartbeat).getTime():0;
    const mins=t?Math.round((now-t)/60000):null;
    return {...x,stale_minutes:mins,heartbeat_stale:mins==null||mins>120};
  });
  out.status_contract=["draft","ready","needs_approval","approved","assigned","in_progress","waiting","blocked","needs_proof","executed","verified"];
  return out;
}

export async function GET(req:NextRequest){
  try{const {client}=await session(req);return NextResponse.json({data:await readData(client)});}
  catch(e){const msg=e instanceof Error?e.message:"Load failed";return NextResponse.json({error:msg},{status:msg==="AUTH_REQUIRED"?401:400});}
}

export async function POST(req:NextRequest){
  try{
    const {client,user}=await session(req), body=await req.json() as J, op=s(body.operation);
    let data:any;
    if(op==="create_work"){
      const {data:d,error}=await client.from("khg_work_queues").insert({
        department_key:body.department_key||"dorsey",queue_key:k("dorsey"),brand_key:"dr-dorsey",
        source_type:body.source_type||"dashboard",source_id:body.source_id||null,title:s(body.title)||"Untitled action",
        description:body.description||body.next_action||null,priority:body.priority||"high",status:body.status||"ready",
        owner_label:body.owner_label||"DOT",due_at:body.due_at||null,proof_required:body.proof_required!==false,
        proof_url:body.proof_url||null,metadata:{...m(body.metadata),engine:body.engine||"enterprise_origination",next_action:body.next_action||null,blocker:body.blocker||null,needs_dorsey:Boolean(body.needs_dorsey),leverage_value:body.leverage_value||null}
      }).select("*").single(); if(error) throw error; data=d; await log(client,user,"work",d.id,"create",{},d,d.proof_url);
    }else if(op==="create_content"){
      const {data:d,error}=await client.from("khg_content_items").insert({
        brand_key:"dr-dorsey",platform:body.platform||"instagram",content_type:body.content_type||"post",
        title:s(body.title)||"Dorsey content",brief:body.brief||body.next_action||null,cta:body.cta||null,target_url:body.target_url||null,
        status:"ready",priority:body.priority||"high",owner_label:body.owner_label||"Muse",publish_status:"not_published",
        approval_status:"needs_approval",qa_status:"needs_review",metadata:{...m(body.metadata),engine:"content",needs_recording:Boolean(body.needs_recording),needs_photo:Boolean(body.needs_photo)}
      }).select("*").single(); if(error) throw error; data=d; await log(client,user,"content",d.id,"create",{},d);
    }else if(op==="create_opportunity"){
      const {data:d,error}=await client.from("khg_revenue_opportunities").insert({
        brand_key:"dr-dorsey",revenue_lane:body.revenue_lane||"enterprise_origination",
        opportunity_name:s(body.opportunity_name||body.title)||"New opportunity",contact_name:body.contact_name||null,
        contact_method:body.contact_method||null,offer_name:body.offer_name||null,estimated_value:Number(body.estimated_value||0),
        next_action:body.next_action||null,blocker_reason:body.blocker_reason||null,owner_label:body.owner_label||"DOT",
        due_at:body.due_at||null,status:"open",metadata:{...m(body.metadata),source:"DORSEY",destination_brand:body.destination_brand||null,handoff_status:"not_handed_off"}
      }).select("*").single(); if(error) throw error; data=d; await log(client,user,"opportunity",d.id,"create",{},d);
    }else if(op==="create_campaign"){
      const {data:d,error}=await client.from("khg_marketing_calendar_items").insert({
        brand_key:"dr-dorsey",channel:body.channel||"social",title:s(body.title)||"Dorsey campaign",
        copy_preview:body.copy_preview||body.next_action||null,asset_url:body.asset_url||null,audience_key:body.audience_key||null,
        scheduled_for:body.scheduled_for||null,timezone:"America/New_York",status:"ready",funnel_stage:body.funnel_stage||"awareness",
        offer_name:body.offer_name||null,campaign_goal:body.campaign_goal||null,budget:Number(body.budget||0),owner_label:body.owner_label||"Muse",
        approval_status:"needs_approval",metadata:{...m(body.metadata),external_send_owner:"Muse",send_locked:true}
      }).select("*").single(); if(error) throw error; data=d; await log(client,user,"campaign",d.id,"create",{},d);
    }else if(op==="create_handoff"){
      data=await handoff(client,s(body.agent||body.assigned_to||"dot"),s(body.title)||"Execution handoff","Dorsey Execution OS",body);
    }else if(op==="assign_agent"){
      const source=body.source as Source,id=s(body.id),row=await one(client,source,id);
      data=await handoff(client,s(body.agent),s(body.title||row.title||row.opportunity_name||"Execution handoff"),`${tables[source].table}:${id}`,body);
      if(tables[source].fields.includes("metadata")) await mutate(client,user,source,id,{metadata:{...m(row.metadata),last_handoff_id:data.id,last_handoff_agent:s(body.agent),last_handoff_at:new Date().toISOString()}},"assign_agent");
    }else if(op==="attach_proof"){
      const source=body.source as Source,id=s(body.id),proof=s(body.proof_url); if(!proof) throw new Error("Proof URL or receipt reference is required.");
      const row=await one(client,source,id); data=await mutate(client,user,source,id,proofPatch(source,row,proof),"attach_proof",proof);
    }else if(op==="mark_executed"){
      const source=body.source as Source,id=s(body.id),row=await one(client,source,id),proof=s(body.proof_url)||proofOf(source,row);
      if(!proof){if(["work","content","campaign","opportunity"].includes(source)) await mutate(client,user,source,id,{status:"needs_proof"},"proof_rejected");throw new Error("Proof required. Item moved to needs_proof where supported.");}
      data=await mutate(client,user,source,id,execPatch(source,row,proof),"mark_executed",proof);
    }else if(op==="decision"){
      const source=body.source as Source,id=s(body.id),decision=s(body.decision),now=new Date().toISOString();
      if(source==="approval"){
        const row=await one(client,source,id),state=decision==="approve"?"approved":decision==="reject"?"rejected":"needs_revision";
        data=await mutate(client,user,source,id,{status:state,decision_note:body.note||null,decided_at:now},"decision");
        if(row.source_type==="content_item"&&row.source_id) await client.from("khg_content_items").update({approval_status:state,status:state==="approved"?"approved":"needs_revision"}).eq("id",row.source_id);
        if(row.source_type==="marketing_calendar_item"&&row.source_id) await client.from("khg_marketing_calendar_items").update({approval_status:state,status:state==="approved"?"approved":"needs_revision"}).eq("id",row.source_id);
      }else{
        const row=await one(client,source,id),state=decision==="approve"?"approved":decision==="reject"?"rejected":"needs_revision";
        const patch:J={metadata:{...m(row.metadata),approval_state:state,approval_note:body.note||null,approval_at:now}};
        if(tables[source].fields.includes("approval_status")) patch.approval_status=state;
        if(tables[source].fields.includes("status")&&state!=="approved") patch.status="needs_revision";
        data=await mutate(client,user,source,id,patch,"decision");
      }
    }else if(op==="handoff_opportunity"){
      const id=s(body.id),row=await one(client,"opportunity",id),destination=s(body.destination_brand); if(!destination) throw new Error("Destination brand is required.");
      const h=await handoff(client,s(body.agent||"dot"),`Origination handoff — ${row.opportunity_name}`,`khg_revenue_opportunities:${id}`,{...body,expected_behavior:`Accept Dorsey-originated opportunity into ${destination}; preserve source=DORSEY and write acceptance proof back.`});
      data=await mutate(client,user,"opportunity",id,{metadata:{...m(row.metadata),source:"DORSEY",destination_brand:destination,handoff_status:"sent",handoff_id:h.id,founder_leverage_required:Boolean(body.founder_leverage_required)},status:body.founder_leverage_required?"waiting":"handed_off"},"handoff_opportunity");
    }else if(op==="worker_state"){
      const id=s(body.id); await one(client,"worker",id);
      data=await mutate(client,user,"worker",id,{is_paused:Boolean(body.is_paused),paused_at:body.is_paused?new Date().toISOString():null,paused_reason:body.is_paused?(body.reason||"Paused from Dorsey Execution OS"):null,updated_at:new Date().toISOString()},"worker_state");
    }else throw new Error("Unknown Dorsey operation.");
    return NextResponse.json({data},{status:201});
  }catch(e){const msg=e instanceof Error?e.message:"Action failed";return NextResponse.json({error:msg},{status:msg==="AUTH_REQUIRED"?401:400});}
}

export async function PATCH(req:NextRequest){
  try{
    const {client,user}=await session(req),body=await req.json() as J,source=body.source as Source,id=s(body.id);
    if(!tables[source]||!id) throw new Error("Valid source and ID required.");
    const row=await one(client,source,id), changes={...(body.changes||{})} as J;
    const next=s(changes.status||changes.slot_status||changes.publish_status);
    const supplied=s(changes.proof_url||changes.posted_url||changes.external_url)||proofOf(source,row);
    if(next&&terminal.has(next)&&!supplied){
      if(["work","content","campaign","opportunity"].includes(source)) changes.status="needs_proof";
      throw new Error("Proof is required before execution can be counted.");
    }
    return NextResponse.json({data:await mutate(client,user,source,id,changes,"edit",supplied||undefined)});
  }catch(e){const msg=e instanceof Error?e.message:"Update failed";return NextResponse.json({error:msg},{status:msg==="AUTH_REQUIRED"?401:400});}
}
