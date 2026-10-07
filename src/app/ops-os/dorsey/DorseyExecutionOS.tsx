/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  AlertTriangle, Bot, Check, Clock3, ExternalLink, FileCheck2,
  Handshake, History, Loader2, Megaphone, MessageSquare, Newspaper, Plus,
  RefreshCw, Search, ShieldCheck, Target, UserCheck, Users, X, Zap
} from "lucide-react";
import styles from "./DorseyExecutionOS.module.css";

type J=Record<string,any>;
type Source="work"|"note"|"opportunity"|"content"|"calendar"|"campaign"|"approval"|"handoff"|"worker";
type Tab="today"|"founder"|"social"|"relationships"|"authority"|"origination"|"approvals"|"campaigns"|"agents"|"proof";

const tabs=[
  ["today","Today",Zap],["founder","Founder Queue",UserCheck],["social","Social & Content",MessageSquare],
  ["relationships","Relationships",Handshake],["authority","Authority",Newspaper],["origination","Origination",Target],
  ["approvals","Approvals",ShieldCheck],["campaigns","Campaigns",Megaphone],["agents","Agents",Bot],["proof","Proof",FileCheck2]
] as const;
const agents=["muse","claude","dot"];
const terminal=new Set(["verified","executed","done","resolved","rejected","cancelled","published","handed_off"]);
const prio:Record<string,number>={urgent:0,critical:0,executive:0,high:1,p0:1,medium:2,normal:2,p1:2,low:3};

const token=()=>typeof window==="undefined"?"":localStorage.getItem("khg_ops_token")||"";
const txt=(v:any)=>v==null?"":String(v);
const low=(v:any)=>txt(v).toLowerCase();
const title=(r:J)=>r.title||r.opportunity_name||r.worker||r.agent_key||"Untitled";
const status=(r:J)=>r.status||r.slot_status||r.publish_status||r.connection_status||"active";
const owner=(r:J)=>r.owner_label||r.assigned_to||r.requested_by||r.approver_label||"Unassigned";
const priority=(r:J)=>r.priority||r.risk_level||"normal";
const due=(r:J)=>r.due_at||r.scheduled_for||r.updated_at||r.created_at;
const blocker=(r:J)=>r.blocker||r.blocker_reason||r.metadata?.blocker||"";
const next=(r:J)=>r.next_action||r.metadata?.next_action||r.expected_behavior||r.summary||r.description||r.brief||"";
const proof=(r:J)=>r.proof_url||r.posted_url||r.external_url||r.metadata?.proof_url||"";
const sourceUrl=(r:J)=>r.source_url||r.posted_url||r.external_url||r.target_url||r.final_asset_url||r.preview_url||r.account_url||r.proof_url||r.metadata?.proof_url||"";
const open=(r:J)=>!terminal.has(low(status(r)));
const idOf=(r:J,s:Source)=>s==="worker"?r.worker:r.id;
const date=(v:any)=>{
  if(!v)return"No due time"; const d=new Date(v); if(Number.isNaN(d.getTime()))return txt(v);
  return new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(d);
};
const age=(v:any)=>{
  if(!v)return"unknown"; const n=Math.max(0,Math.round((Date.now()-new Date(v).getTime())/60000));
  return n<60?`${n}m`:n<1440?`${Math.floor(n/60)}h`:`${Math.floor(n/1440)}d`;
};
const money=(v:any)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(Number(v||0));

export default function DorseyExecutionOS(){
  const [tab,setTab]=useState<Tab>("today"),[data,setData]=useState<J>({}),[loading,setLoading]=useState(true);
  const [busy,setBusy]=useState(""),[error,setError]=useState(""),[notice,setNotice]=useState("");
  const [query,setQuery]=useState(""),[filter,setFilter]=useState<"all"|"needs_dorsey"|"blockers">("all");
  const [modal,setModal]=useState<null|"work"|"content"|"opportunity"|"campaign"|"handoff">(null),[draft,setDraft]=useState<J>({});
  const [sync,setSync]=useState("Connecting");

  const load=useCallback(async(silent=false)=>{
    if(!silent)setLoading(true); setError("");
    try{
      const t=token(); if(!t)throw new Error("Sign in to Ops OS to open the Dorsey execution workspace.");
      const r=await fetch("/api/ops-os/dorsey",{headers:{Authorization:`Bearer ${t}`},cache:"no-store"});
      const j=await r.json(); if(!r.ok)throw new Error(j.error||"Unable to load Dorsey execution data.");
      setData(j.data||{}); setSync(`Synced ${new Date().toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}`);
    }catch(e){setError(e instanceof Error?e.message:"Load failed.");}
    finally{if(!silent)setLoading(false);}
  },[]);

  useEffect(()=>{load();},[load]);
  useEffect(()=>{
    let cleanup=()=>{};
    const polling=window.setInterval(()=>load(true),30000);
    fetch("/api/ops-os/config").then(r=>r.json()).then(cfg=>{
      if(!cfg.url||!cfg.key)return;
      const c=createClient(cfg.url,cfg.key,{auth:{persistSession:false,autoRefreshToken:false},global:{headers:{Authorization:`Bearer ${token()}`}}});
      const channel=c.channel("dorsey-execution-os")
        .on("postgres_changes",{event:"*",schema:"public",table:"khg_work_queues"},()=>load(true))
        .on("postgres_changes",{event:"*",schema:"public",table:"enterprise_handoff_notes"},()=>load(true))
        .on("postgres_changes",{event:"*",schema:"public",table:"khg_content_items"},()=>load(true))
        .on("postgres_changes",{event:"*",schema:"public",table:"khg_marketing_calendar_items"},()=>load(true))
        .on("postgres_changes",{event:"*",schema:"public",table:"khg_approval_requests"},()=>load(true))
        .on("postgres_changes",{event:"*",schema:"public",table:"khg_revenue_opportunities"},()=>load(true))
        .subscribe(s=>setSync(s==="SUBSCRIBED"?"Realtime connected":s));
      cleanup=()=>{c.removeChannel(channel);};
    }).catch(()=>{});
    const focus=()=>load(true); window.addEventListener("focus",focus);
    return()=>{window.clearInterval(polling);window.removeEventListener("focus",focus);cleanup();};
  },[load]);

  async function act(operation:string,p:J={},ok="Updated"){
    const key=`${operation}:${p.id||p.title||Date.now()}`;setBusy(key);setError("");setNotice("");
    try{
      const r=await fetch("/api/ops-os/dorsey",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${token()}`},body:JSON.stringify({operation,...p})});
      const j=await r.json();if(!r.ok)throw new Error(j.error||"Action failed.");setNotice(ok);await load(true);return j.data;
    }catch(e){setError(e instanceof Error?e.message:"Action failed.");return null;}finally{setBusy("");}
  }
  async function patch(source:Source,row:J,changes:J,ok="Edit persisted"){
    const id=idOf(row,source);setBusy(`edit:${id}`);setError("");setNotice("");
    try{
      const r=await fetch("/api/ops-os/dorsey",{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${token()}`},body:JSON.stringify({source,id,changes})});
      const j=await r.json();if(!r.ok)throw new Error(j.error||"Save failed.");setNotice(ok);await load(true);
    }catch(e){setError(e instanceof Error?e.message:"Save failed.");}finally{setBusy("");}
  }

  const work=data.work||[],notes=data.notes||[],opps=data.opportunities||[],content=data.content||[],campaigns=data.campaigns||[];
  const approvals=data.approvals||[],handoffs=data.handoffs||[],health=data.agent_health||[],workers=data.workers||[],audit=data.audit||[];
  const openWork=work.filter(open).sort((a:J,b:J)=>(prio[priority(a)]??9)-(prio[priority(b)]??9));
  const openNotes=notes.filter(open).sort((a:J,b:J)=>(prio[priority(a)]??9)-(prio[priority(b)]??9));
  const founder=[...openWork.filter((x:J)=>/dorsey|founder/i.test(owner(x))||x.metadata?.needs_dorsey),...openNotes.filter((x:J)=>/dorsey|founder|human submission/i.test(owner(x))||x.metadata?.needs_dorsey)].slice(0,10);
  const today=[...openWork,...openNotes].sort((a:J,b:J)=>(prio[priority(a)]??9)-(prio[priority(b)]??9)).slice(0,5);
  const blocks=[...openWork,...openNotes,...opps.filter(open)].filter((x:J)=>blocker(x)||low(status(x))==="blocked").slice(0,10);
  const signals=openNotes.filter((x:J)=>/sponsor|relationship|intro|press|media|inbound|signal|partner/i.test(`${x.note_type} ${x.title} ${x.summary}`)).slice(0,10);
  const proofEvents=audit.filter((x:J)=>["mark_executed","attach_proof"].includes(x.action)).slice(0,10);
  const proofGaps=[...work,...content,...campaigns,...opps].filter((x:J)=>["executed","done","published"].includes(low(status(x)))&&!proof(x)).length;
  const stale=health.filter((x:J)=>x.heartbeat_stale).length;
  const muse=handoffs.find((x:J)=>open(x)&&(low(x.assigned_to)==="muse"||low(x.agent_key)==="muse"));

  const match=(r:J)=>{
    const q=low(query); if(q&&!low(JSON.stringify(r)).includes(q))return false;
    if(filter==="blockers")return Boolean(blocker(r))||low(status(r))==="blocked";
    if(filter==="needs_dorsey")return /dorsey|founder/i.test(owner(r))||Boolean(r.metadata?.needs_dorsey);
    return true;
  };
  const rows=(items:J[],source:Source,empty:string,opts:J={})=>{
    const visible=items.filter(match);if(!visible.length)return <Empty text={empty}/>;
    return <div className={styles.stack}>{visible.map(r=><Row key={`${source}-${idOf(r,source)}`} row={r} source={source} busy={busy} patch={patch} act={act} opts={opts}/>)}</div>;
  };

  return <div className={styles.app}>
    <header className={styles.top}>
      <div className={styles.brand}><b>DD</b><div><strong>DORSEY EXECUTION OS</strong><span>Authority • Access • Origination</span></div></div>
      <div className={styles.tools}>
        <button className={styles.primary} onClick={()=>{setDraft({priority:"high",owner_label:"DOT",proof_required:true});setModal("work");}}><Plus size={14}/>New Action</button>
        <label><Search size={14}/><input placeholder="Search execution truth" value={query} onChange={e=>setQuery(e.target.value)}/></label>
        <button className={filter==="needs_dorsey"?styles.selected:""} onClick={()=>setFilter(filter==="needs_dorsey"?"all":"needs_dorsey")}>Needs Dorsey</button>
        <button className={filter==="blockers"?styles.selected:""} onClick={()=>setFilter(filter==="blockers"?"all":"blockers")}>Blockers</button>
        <button onClick={()=>load()}><RefreshCw size={14}/></button>
      </div>
    </header>
    <div className={styles.live}><i/><strong>{sync}</strong><span>Muse: {muse?"assigned":"no active Dorsey handoff"}</span><span>{stale} stale agent heartbeats</span><span>{data.generated_at?`Backend ${age(data.generated_at)} old`:"Backend pending"}</span></div>
    <nav className={styles.nav}>{tabs.map(([key,label,Icon])=><button key={key} className={tab===key?styles.active:""} onClick={()=>setTab(key as Tab)}><Icon size={14}/>{label}</button>)}</nav>
    {error&&<div className={styles.error}><AlertTriangle size={15}/>{error}</div>}
    {notice&&<div className={styles.notice}><Check size={15}/>{notice}</div>}
    <div className={styles.stats}><Stat l="Founder actions" v={founder.length}/><Stat l="Open blockers" v={blocks.length}/><Stat l="Pending approvals" v={approvals.filter(open).length}/><Stat l="Proof gaps" v={proofGaps}/></div>

    <main className={styles.main}>{loading?<div className={styles.loading}><Loader2 className={styles.spin}/>Loading live execution truth…</div>:<>
      {tab==="today"&&<Screen n="01" t="Command Center / Today" s="Only work that changes outcome today.">
        <div className={styles.grid}>
          <Lane t="TODAY" badge="MAX 5">{today.length?<div className={styles.stack}>{today.filter(match).map((r:J)=><Row key={r.id} row={r} source={work.includes(r)?"work":"note"} busy={busy} patch={patch} act={act} opts={{compact:true}}/>)}</div>:<Empty text="No Dorsey-critical priority loaded."/>}</Lane>
          <Lane t="NEEDS DORSEY" badge={`${founder.length}/10`}>{founder.length?<div className={styles.stack}>{founder.filter(match).map((r:J)=><Row key={r.id} row={r} source={work.includes(r)?"work":"note"} busy={busy} patch={patch} act={act} opts={{founder:true}}/>)}</div>:<Empty text="Founder queue is clear."/>}</Lane>
          <Lane t="HOT SIGNALS">{rows(signals,"note","No high-value signal surfaced.",{relationship:true})}</Lane>
          <Lane t="BLOCKERS" badge={String(blocks.length)}>{blocks.length?<div className={styles.stack}>{blocks.filter(match).map((r:J)=><Row key={r.id} row={r} source={work.includes(r)?"work":opps.includes(r)?"opportunity":"note"} busy={busy} patch={patch} act={act} opts={{compact:true}}/>)}</div>:<Empty text="No execution blocker surfaced."/>}</Lane>
          <Lane t="PROOF / RECENTLY EXECUTED">{proofEvents.length?<Audit items={proofEvents}/>:<Empty text="No recent proof event recorded."/>}</Lane>
          <Lane t="TOMORROW PREP">{rows([...openWork,...openNotes].filter((r:J)=>{const d=due(r);if(!d)return false;const x=new Date(d),t=new Date();t.setDate(t.getDate()+1);return x.toDateString()===t.toDateString();}),"note","Nothing is due tomorrow.")}</Lane>
        </div>
      </Screen>}
      {tab==="founder"&&<Screen n="02" t="Founder Queue" s="Maximum 10 actions where Dr. Dorsey materially improves the outcome.">
        <div className={styles.actions}><button onClick={()=>{setDraft({priority:"executive",owner_label:"Dr. Dorsey",proof_required:true,needs_dorsey:true});setModal("work");}}><Plus size={14}/>Add founder action</button></div>
        {founder.length?<div className={styles.stack}>{founder.filter(match).map((r:J)=><Row key={r.id} row={r} source={work.includes(r)?"work":"note"} busy={busy} patch={patch} act={act} opts={{founder:true}}/>)}</div>:<Empty text="Founder queue is clear."/>}
        {founder.length>=10&&<div className={styles.warning}><AlertTriangle size={14}/>Founder queue cap reached. Delegate before adding routine work.</div>}
      </Screen>}
      {tab==="social"&&<Screen n="03" t="Social + Content" s="Create, approve, hand to Muse, schedule, and prove publication. Scheduled is not executed.">
        <div className={styles.actions}><button onClick={()=>{setDraft({platform:"instagram",content_type:"post",priority:"high",owner_label:"Muse"});setModal("content");}}><Plus size={14}/>Create content</button></div>
        <Lane t="CONTENT PIPELINE" badge={String(content.length)}>{rows(content,"content","No Dorsey content rows exist in MCP Gateway.",{approval:true})}</Lane>
        <Lane t="SOCIAL ACCOUNTS" badge={String((data.social_accounts||[]).length)}><div className={styles.accounts}>{(data.social_accounts||[]).map((r:J)=><a href={r.account_url||"#"} target="_blank" key={r.id}><b>{r.platform}</b><span>{r.handle||r.account_label}</span><em>{r.connection_status}</em></a>)}</div></Lane>
      </Screen>}
      {tab==="relationships"&&<Screen n="04" t="Engagement + Relationships" s="Warm intros, VIP inbound, follow-ups, reconnects, and high-value relationship movement.">
        {rows(notes.filter((r:J)=>/relationship|intro|call|sponsor|partner|outreach|inbound|reconnect/i.test(`${r.note_type} ${r.title} ${r.summary} ${r.next_action}`)),"note","No Dorsey relationship rows currently mapped.",{relationship:true})}
      </Screen>}
      {tab==="authority"&&<Screen n="05" t="Authority / PR" s="Press, podcasts, speaking, sponsor authority, expert positioning, and published proof.">
        {rows(notes.filter((r:J)=>/pr|press|media|podcast|speaking|sponsor|authority|insight|linkedin/i.test(`${r.note_type} ${r.title} ${r.summary} ${r.next_action}`)),"note","No Dorsey authority/PR rows currently mapped.",{authority:true})}
      </Screen>}
      {tab==="origination"&&<Screen n="06" t="Enterprise Origination" s="Dorsey-originated opportunity → value → destination brand → accepted handoff.">
        <div className={styles.actions}><button onClick={()=>{setDraft({revenue_lane:"enterprise_origination",owner_label:"DOT"});setModal("opportunity");}}><Plus size={14}/>Create opportunity</button></div>
        {rows(opps,"opportunity","No Dorsey origination opportunity exists yet.",{origination:true})}
      </Screen>}
      {tab==="approvals"&&<Screen n="07" t="Approvals" s="One decision center. Approval updates the actual source object.">
        {rows(approvals,"approval","No Dorsey approval request is pending.",{approval:true})}
        <Lane t="CONTENT NEEDING DECISION">{rows(content.filter((r:J)=>["needs_approval","needs_review"].includes(low(r.approval_status||r.status))),"content","No content currently awaits approval.",{approval:true})}</Lane>
      </Screen>}
      {tab==="campaigns"&&<Screen n="08" t="Campaigns + Distribution" s="Social, email, SMS where permitted, LinkedIn, PR, search authority, and partner distribution. Muse owns assigned external sends.">
        <div className={styles.actions}><button onClick={()=>{setDraft({channel:"social",owner_label:"Muse",funnel_stage:"awareness"});setModal("campaign");}}><Plus size={14}/>Create campaign</button></div>
        <div className={styles.lock}><ShieldCheck size={15}/>Creating or scheduling a campaign never counts as sent. Muse must execute approved external sends and return native proof.</div>
        {rows(campaigns,"campaign","No Dorsey campaign currently exists.",{campaign:true})}
      </Screen>}
      {tab==="agents"&&<Screen n="09" t="Muse / Agent Control" s="Handoffs, worker health, receipts, failures, and escalation. Handoff is not execution.">
        <div className={styles.actions}>{agents.map(a=><button key={a} onClick={()=>{setDraft({agent:a,priority:"high"});setModal("handoff");}}><Bot size={14}/>Ask {a==="dot"?"DOT":a[0].toUpperCase()+a.slice(1)}</button>)}</div>
        <Lane t="DORSEY HANDOFFS" badge={String(handoffs.length)}>{rows(handoffs,"handoff","No Dorsey handoff exists.",{handoff:true})}</Lane>
        <Lane t="AGENT HEALTH" badge={`${stale} STALE`}><div className={styles.health}>{health.slice(0,60).map((r:J)=><div className={r.heartbeat_stale?styles.bad:styles.good} key={r.id||r.agent_key}><b>{r.agent_key}</b><span>{r.status}</span><em>{r.last_heartbeat?`${age(r.last_heartbeat)} ago`:"No heartbeat"}</em></div>)}</div></Lane>
        <Lane t="WORKER CONTROLS">{workers.length?<div className={styles.stack}>{workers.map((r:J)=><Row key={r.worker} row={r} source="worker" busy={busy} patch={patch} act={act} opts={{worker:true}}/>)}</div>:<Empty text="No worker-state rows returned."/>}</Lane>
      </Screen>}
      {tab==="proof"&&<Screen n="10" t="Proof / Audit / History" s="Execution counts only with proof. Every Dorsey mutation on this surface is auditable.">
        <div className={styles.proofStats}><Stat l="Audit events" v={audit.length}/><Stat l="Proof gaps" v={proofGaps}/><Stat l="Execution proof events" v={proofEvents.length}/></div>
        <Audit items={audit.filter(match)}/>
      </Screen>}
    </>}</main>
    {modal&&<Create kind={modal} value={draft} setValue={setDraft} busy={busy} close={()=>{setModal(null);setDraft({});}} submit={async()=>{
      const op={work:"create_work",content:"create_content",opportunity:"create_opportunity",campaign:"create_campaign",handoff:"create_handoff"}[modal];
      const r=await act(op,draft,"Created and persisted.");if(r){setModal(null);setDraft({});}
    }}/>}
  </div>;
}

function Stat({l,v}:{l:string;v:any}){return <div><span>{l}</span><strong>{v}</strong></div>;}
function Screen({n,t,s,children}:{n:string;t:string;s:string;children:any}){return <section className={styles.screen}><header><span>{n}</span><div><h1>{t}</h1><p>{s}</p></div></header>{children}</section>;}
function Lane({t,badge,children}:{t:string;badge?:string;children:any}){return <section className={styles.lane}><header><strong>{t}</strong>{badge&&<span>{badge}</span>}</header>{children}</section>;}
function Empty({text}:{text:string}){return <div className={styles.empty}><Clock3 size={14}/>{text}</div>;}

function Row({row,source,busy,patch,act,opts}:{row:J;source:Source;busy:string;patch:any;act:any;opts:J}){
  const [edit,setEdit]=useState(false),[form,setForm]=useState<J>({});
  const id=idOf(row,source),src=sourceUrl(row),p=proof(row),blocked=Boolean(blocker(row))||low(status(row))==="blocked";
  const openEdit=()=>{setForm({title:title(row),owner_label:owner(row),status:status(row),priority:priority(row),due_at:row.due_at||row.scheduled_for||"",next_action:next(row),blocker:blocker(row),proof_url:p});setEdit(true);};
  const changes=()=>{
    const mm={...(row.metadata||{}),next_action:form.next_action,blocker:form.blocker,proof_url:form.proof_url||row.metadata?.proof_url};
    if(source==="note")return{title:form.title,assigned_to:form.owner_label,status:form.status,priority:form.priority,due_at:form.due_at||null,next_action:form.next_action,blocker:form.blocker,metadata:mm};
    if(source==="work")return{title:form.title,owner_label:form.owner_label,status:form.status,priority:form.priority,due_at:form.due_at||null,description:form.next_action,proof_url:form.proof_url||null,metadata:mm};
    if(source==="opportunity")return{opportunity_name:form.title,owner_label:form.owner_label,status:form.status,due_at:form.due_at||null,next_action:form.next_action,blocker_reason:form.blocker,metadata:mm};
    if(source==="content")return{title:form.title,owner_label:form.owner_label,status:form.status,priority:form.priority,posted_url:form.proof_url||row.posted_url,metadata:mm};
    if(source==="campaign")return{title:form.title,owner_label:form.owner_label,status:form.status,scheduled_for:form.due_at||null,external_url:form.proof_url||row.external_url,metadata:mm};
    if(source==="approval")return{title:form.title,status:form.status,risk_level:form.priority,due_at:form.due_at||null,decision_note:form.next_action,metadata:mm};
    if(source==="handoff")return{title:form.title,assigned_to:form.owner_label,status:form.status,priority:form.priority,expected_behavior:form.next_action};
    return{};
  };
  return <article className={blocked?`${styles.row} ${styles.blocked}`:styles.row}>
    <div className={styles.rowBody}>
      <div className={styles.rowTitle}><strong>{title(row)}</strong><div><i data-status={low(status(row))}>{txt(status(row)).replaceAll("_"," ")}</i><em>{priority(row)}</em>{p&&<b><FileCheck2 size={11}/>proof</b>}</div></div>
      {next(row)&&<p>{next(row)}</p>}
      <div className={styles.meta}><span><Users size={12}/>{owner(row)}</span><span><Clock3 size={12}/>{date(due(row))}</span>{blocker(row)&&<span className={styles.red}><AlertTriangle size={12}/>{blocker(row)}</span>}</div>
      {source==="opportunity"&&<div className={styles.value}><b>{money(row.estimated_value)}</b><span>{row.metadata?.destination_brand||"No destination brand"}</span></div>}
      {source==="worker"&&<div className={styles.value}><b>{row.is_paused?"PAUSED":"RUNNING"}</b><span>{row.paused_reason||"No pause reason"}</span></div>}
    </div>
    <div className={styles.rowTools}>
      {source!=="worker"&&<button onClick={openEdit}>Edit</button>}
      {src&&<a href={src} target="_blank" rel="noreferrer">Open source<ExternalLink size={11}/></a>}
      {!["worker","handoff"].includes(source)&&<button onClick={async()=>{const u=window.prompt("Paste provider receipt, live URL, screenshot URL, or proof reference",p);if(u)await act("attach_proof",{source,id,proof_url:u},"Proof attached.");}}>Attach proof</button>}
      {!["worker","handoff"].includes(source)&&<button className={styles.execute} onClick={async()=>{let u=p;if(!u)u=window.prompt("Execution requires proof. Paste proof URL/receipt reference")||"";await act("mark_executed",{source,id,proof_url:u},"Execution verified against proof.");}}>Mark executed</button>}
      {!["worker"].includes(source)&&agents.map(a=><button key={a} onClick={()=>act("assign_agent",{source,id,agent:a,title:title(row),summary:next(row),priority:priority(row)},`Assigned to ${a==="dot"?"DOT":a}.`)}>{a==="muse"?"Assign Muse":a==="claude"?"Ask Claude":"Ask DOT"}</button>)}
      {opts.approval&&<><button onClick={()=>act("decision",{source,id,decision:"approve"},"Approved.")}>Approve</button><button onClick={()=>act("decision",{source,id,decision:"revise",note:window.prompt("Revision instruction")||""},"Needs revision.")}>Revise</button><button onClick={()=>act("decision",{source,id,decision:"reject",note:window.prompt("Reason")||""},"Rejected.")}>Reject</button></>}
      {opts.origination&&<button onClick={()=>{const d=window.prompt("Destination brand/division");if(d)act("handoff_opportunity",{id,destination_brand:d,agent:"dot",founder_leverage_required:false},"Opportunity handed off; source remains DORSEY.");}}>Hand off brand</button>}
      {opts.relationship&&<button onClick={()=>act("create_opportunity",{title:title(row),contact_name:owner(row),next_action:next(row),metadata:{source_note_id:row.id}},"Opportunity created.")}>Create opportunity</button>}
      {opts.worker&&<button onClick={()=>act("worker_state",{id,is_paused:!row.is_paused,reason:row.is_paused?"":"Paused from Dorsey Agent Control"},row.is_paused?"Worker resumed.":"Worker paused.")}>{row.is_paused?"Resume":"Pause"}</button>}
    </div>
    {edit&&<div className={styles.editor}>
      <label>Title<input value={form.title||""} onChange={e=>setForm({...form,title:e.target.value})}/></label>
      <label>Owner<input value={form.owner_label||""} onChange={e=>setForm({...form,owner_label:e.target.value})}/></label>
      <label>Status<select value={form.status||""} onChange={e=>setForm({...form,status:e.target.value})}>{["draft","ready","needs_approval","approved","assigned","in_progress","waiting","blocked","needs_proof","executed","verified","open","resolved","rejected"].map(x=><option key={x}>{x}</option>)}</select></label>
      <label>Priority<select value={form.priority||"normal"} onChange={e=>setForm({...form,priority:e.target.value})}>{["critical","executive","high","medium","normal","low"].map(x=><option key={x}>{x}</option>)}</select></label>
      <label>Due<input type="datetime-local" value={form.due_at?txt(form.due_at).slice(0,16):""} onChange={e=>setForm({...form,due_at:e.target.value})}/></label>
      <label className={styles.wide}>Next action<textarea value={form.next_action||""} onChange={e=>setForm({...form,next_action:e.target.value})}/></label>
      <label className={styles.wide}>Blocker<textarea value={form.blocker||""} onChange={e=>setForm({...form,blocker:e.target.value})}/></label>
      <label className={styles.wide}>Proof<input value={form.proof_url||""} onChange={e=>setForm({...form,proof_url:e.target.value})} placeholder="Live URL, receipt ID, screenshot URL"/></label>
      <footer><button onClick={()=>setEdit(false)}>Cancel</button><button className={styles.primary} disabled={busy.includes(String(id))} onClick={async()=>{await patch(source,row,changes());setEdit(false);}}><Check size={13}/>Save</button></footer>
    </div>}
  </article>;
}

function Audit({items}:{items:J[]}){if(!items.length)return <Empty text="No audit events match this view."/>;return <div className={styles.audit}>{items.map(r=><div key={r.id}><History size={14}/><section><strong>{txt(r.action).replaceAll("_"," ")||"Execution event"}</strong><span>{r.source_table} • {r.source_id}</span></section><aside><b>{r.actor_label||"system"}</b><em>{date(r.created_at)}</em>{r.proof_url&&<a href={r.proof_url} target="_blank">Proof<ExternalLink size={10}/></a>}</aside></div>)}</div>;}

function Create({kind,value,setValue,busy,close,submit}:{kind:string;value:J;setValue:any;busy:string;close:()=>void;submit:()=>void}){
  const heading:{[k:string]:string}={work:"New Execution Action",content:"New Content Item",opportunity:"New Dorsey Origination",campaign:"New Distribution Campaign",handoff:"New Agent Handoff"};
  return <div className={styles.backdrop}><div className={styles.modal}>
    <header><div><span>CREATE + PERSIST</span><h2>{heading[kind]}</h2></div><button onClick={close}><X size={17}/></button></header>
    <div className={styles.form}>
      {kind==="handoff"&&<label>Agent<select value={value.agent||"dot"} onChange={e=>setValue({...value,agent:e.target.value})}>{agents.map(a=><option key={a} value={a}>{a==="dot"?"DOT":a[0].toUpperCase()+a.slice(1)}</option>)}</select></label>}
      <label className={styles.wide}>Title<input value={value.title||value.opportunity_name||""} onChange={e=>setValue({...value,title:e.target.value,opportunity_name:e.target.value})}/></label>
      {kind==="work"&&<><label>Owner<input value={value.owner_label||""} onChange={e=>setValue({...value,owner_label:e.target.value})}/></label><label>Engine<select value={value.engine||"enterprise_origination"} onChange={e=>setValue({...value,engine:e.target.value})}>{["social","content","engagement","authority_pr","relationships","enterprise_origination"].map(x=><option key={x}>{x}</option>)}</select></label><label>Priority<select value={value.priority||"high"} onChange={e=>setValue({...value,priority:e.target.value})}>{["critical","executive","high","medium","normal","low"].map(x=><option key={x}>{x}</option>)}</select></label><label>Due<input type="datetime-local" value={value.due_at||""} onChange={e=>setValue({...value,due_at:e.target.value})}/></label></>}
      {kind==="content"&&<><label>Platform<select value={value.platform||"instagram"} onChange={e=>setValue({...value,platform:e.target.value})}>{["instagram","linkedin","x","facebook","youtube","tiktok"].map(x=><option key={x}>{x}</option>)}</select></label><label>Format<select value={value.content_type||"post"} onChange={e=>setValue({...value,content_type:e.target.value})}>{["post","reel","carousel","story","article","video"].map(x=><option key={x}>{x}</option>)}</select></label></>}
      {kind==="campaign"&&<><label>Channel<select value={value.channel||"social"} onChange={e=>setValue({...value,channel:e.target.value})}>{["social","email","sms","linkedin","pr","seo_aeo_geo","partner"].map(x=><option key={x}>{x}</option>)}</select></label><label>Scheduled<input type="datetime-local" value={value.scheduled_for||""} onChange={e=>setValue({...value,scheduled_for:e.target.value})}/></label></>}
      {kind==="opportunity"&&<><label>Contact<input value={value.contact_name||""} onChange={e=>setValue({...value,contact_name:e.target.value})}/></label><label>Estimated value<input type="number" value={value.estimated_value||""} onChange={e=>setValue({...value,estimated_value:e.target.value})}/></label><label>Destination brand<input value={value.destination_brand||""} onChange={e=>setValue({...value,destination_brand:e.target.value})}/></label></>}
      <label className={styles.wide}>{kind==="content"?"Brief":kind==="campaign"?"Campaign copy / brief":kind==="handoff"?"What should this agent do?":"Next action / instructions"}<textarea value={value.next_action||value.brief||value.copy_preview||value.summary||""} onChange={e=>setValue({...value,next_action:e.target.value,brief:e.target.value,copy_preview:e.target.value,summary:e.target.value})}/></label>
      {kind==="work"&&<label className={styles.check}><input type="checkbox" checked={Boolean(value.needs_dorsey)} onChange={e=>setValue({...value,needs_dorsey:e.target.checked})}/>Requires Dr. Dorsey personally</label>}
      {kind==="campaign"&&<div className={styles.lock}><ShieldCheck size={14}/>External sends remain Muse-owned. Creating this campaign does not send it.</div>}
    </div>
    <footer><button onClick={close}>Cancel</button><button className={styles.primary} disabled={Boolean(busy)} onClick={submit}>{busy?<Loader2 className={styles.spin} size={13}/>:<Plus size={13}/>}Create</button></footer>
  </div></div>;
}
