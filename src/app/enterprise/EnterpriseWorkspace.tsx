"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowUpRight, Bot, Building2, Check, Database, ExternalLink, FileCheck2, Loader2, Megaphone, Plus, RefreshCw, ShieldAlert, TicketCheck, X } from "lucide-react";

type Row = Record<string, any>;
type Field = { name: string; label: string; type?: string; options?: string[]; required?: boolean; placeholder?: string };

const forms: Record<string, { operation: string; label: string; resource: string; fields: Field[] }> = {
  "marketing/campaigns": { operation: "campaign", label: "Create campaign", resource: "campaigns", fields: [
    { name: "campaign_name", label: "Campaign name", required: true }, { name: "brand_name", label: "Brand" },
    { name: "primary_account", label: "Primary account", placeholder: "@DOLODORSEY" },
    { name: "campaign_type", label: "Campaign type", type: "select", options: ["multi_channel","event","social","email","revenue"] },
    { name: "objective", label: "Objective", type: "textarea" }, { name: "primary_cta", label: "Primary CTA" },
    { name: "start_date", label: "Start date", type: "date" }, { name: "end_date", label: "End date", type: "date" },
    { name: "priority", label: "Priority", type: "select", options: ["normal","high","critical"] }, { name: "owner", label: "Owner" },
  ]},
  "eventbrite/drafts": { operation: "eventbrite_draft", label: "Create Eventbrite draft", resource: "eventbrite", fields: [
    { name: "event_name", label: "Event name", required: true }, { name: "brand_name", label: "Brand" },
    { name: "venue_name", label: "Venue" }, { name: "venue_address", label: "Venue address" },
    { name: "starts_at", label: "Starts", type: "datetime-local" }, { name: "ends_at", label: "Ends", type: "datetime-local" },
    { name: "flyer_url", label: "Flyer URL", type: "url" },
    { name: "ticket_classes", label: "Ticket classes", type: "textarea", placeholder: "General Admission - $25\nVIP - $75" },
  ]},
  "ai/tasks": { operation: "ai_task", label: "Create AI build task", resource: "ai", fields: [
    { name: "task_title", label: "Task title", required: true }, { name: "assigned_agent", label: "Agent", type: "select", options: ["codex","claude","openai","human"] },
    { name: "task_type", label: "Type", type: "select", options: ["build","audit","migration","deployment","research"] },
    { name: "repo_url", label: "Repository URL", type: "url" }, { name: "branch_name", label: "Branch" },
    { name: "description", label: "Build brief", type: "textarea" }, { name: "acceptance_criteria", label: "Acceptance criteria", type: "textarea", placeholder: "One requirement per line" },
    { name: "required_env_vars", label: "Required environment variables", placeholder: "KEY_ONE, KEY_TWO" },
    { name: "risk_notes", label: "Risk notes", type: "textarea" }, { name: "priority", label: "Priority", type: "select", options: ["normal","high","critical"] },
  ]},
  "marketing/outreach": { operation: "outreach", label: "Queue human-assisted outreach", resource: "outreach", fields: [
    { name: "target_handle", label: "Target handle", required: true }, { name: "target_name", label: "Target name" },
    { name: "platform", label: "Platform", type: "select", options: ["instagram","email","sms","linkedin","x"] },
    { name: "segment", label: "Segment" }, { name: "message_script", label: "Message script", type: "textarea", required: true },
    { name: "assigned_to", label: "Assigned to" }, { name: "next_follow_up_at", label: "Follow-up", type: "datetime-local" },
  ]},
};

const routeConfig: Record<string, { resource: string; title: string; eyebrow: string; intro: string }> = {
  home: { resource: "centers", title: "Enterprise Headquarters", eyebrow: "EMPIRE-WIDE OPERATING PICTURE", intro: "A protected executive layer connecting every command center without replacing the systems underneath it." },
  "command-centers": { resource: "centers", title: "Command Center Registry", eyebrow: "20 CONTROL ROOMS", intro: "Every division, brand, source system, status, owner, and route in one enterprise registry." },
  "registry/projects": { resource: "projects", title: "Project Registry", eyebrow: "CONNECTED SYSTEMS", intro: "Supabase projects and enterprise systems with purpose, owner, status, and risk level." },
  "registry/dashboards": { resource: "dashboards", title: "Dashboard Registry", eyebrow: "OVERWRITE-PROTECTED", intro: "Existing dashboards remain protected while the enterprise layer provides rollup navigation." },
  "security/rls": { resource: "security", title: "Security & Compliance", eyebrow: "REVIEW • REMEDIATE • VERIFY", intro: "RLS findings and remediation status across the enterprise. Nothing is auto-applied." },
  "marketing/campaigns": { resource: "campaigns", title: "Enterprise Marketing OS", eyebrow: "CAMPAIGNS • CONTENT • OUTREACH • REPORTS", intro: "Program coordinated campaigns across priority accounts with approval-first publishing." },
  "marketing/outreach": { resource: "outreach", title: "Human-Assisted Outreach", eyebrow: "TARGET • SCRIPT • ASSIGN • FOLLOW UP", intro: "Prepare outreach for human review. This command center never sends DMs or comments automatically." },
  "eventbrite/drafts": { resource: "eventbrite", title: "Eventbrite Command Center", eyebrow: "DRAFT • PREVIEW • APPROVE • PUBLISH", intro: "Build complete event payloads and ticket plans. Publishing remains locked behind approval." },
  "ai/tasks": { resource: "ai", title: "AI Agents & Codex", eyebrow: "BRIEF • BUILD • VERIFY • DEPLOY", intro: "Track enterprise AI work, repositories, branches, required environment, risks, and outcomes." },
  approvals: { resource: "approvals", title: "Enterprise Approvals", eyebrow: "HUMAN DECISION GATES", intro: "Review high-impact enterprise actions before publishing, sending, syncing, or deploying." },
  audit: { resource: "audit", title: "Enterprise Audit Log", eyebrow: "EVERY ACTION RECORDED", intro: "Immutable operational history for enterprise create and update actions." },
};

function titleCase(value?: string) { return (value || "unknown").replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()); }
function token() { return typeof window === "undefined" ? "" : localStorage.getItem("khg_ops_token") || ""; }
function fmtDate(value?: string) { return value ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value)) : "Not set"; }

export default function EnterpriseWorkspace({ path }: { path: string }) {
  const commandSlug = path.startsWith("command-centers/") ? path.split("/")[1] : "";
  const config = commandSlug ? routeConfig["command-centers"] : routeConfig[path] || routeConfig.home;
  const formConfig = forms[path];
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [showForm, setShowForm] = useState(Boolean(formConfig));
  const [form, setForm] = useState<Row>({});
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    const response = await fetch(`/api/enterprise/data?resource=${config.resource}`, { headers: token() ? { Authorization: `Bearer ${token()}` } : {} });
    const result = await response.json();
    if (!response.ok) setError(result.error); else setRows(result.data || []);
    setLoading(false);
  }, [config.resource]);
  useEffect(() => { load(); }, [load]);

  const visible = useMemo(() => rows.filter((row) => JSON.stringify(row).toLowerCase().includes(query.toLowerCase()) && (!commandSlug || row.slug === commandSlug)), [rows, query, commandSlug]);
  const active = rows.filter((r) => ["active","approved","completed"].includes(r.status || r.approval_status)).length;
  const review = rows.filter((r) => ["review","needs_review","ready_for_review","pending"].includes(r.status || r.remediation_status || r.approval_status)).length;
  const critical = rows.filter((r) => r.priority === "critical" || r.severity === "critical" || r.risk_level === "high").length;

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setError(""); setNotice("");
    const payload: Row = { ...form, operation: formConfig.operation };
    if (formConfig.operation === "eventbrite_draft") payload.ticket_classes = String(form.ticket_classes || "").split("\n").filter(Boolean);
    const response = await fetch("/api/enterprise/data", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` }, body: JSON.stringify(payload) });
    const result = await response.json();
    if (!response.ok) setError(result.error); else { setNotice(`${formConfig.label} completed.`); setForm({}); await load(); }
    setBusy(false);
  }

  async function update(resource: string, id: string, changes: Row) {
    setBusy(true); setError("");
    const response = await fetch("/api/enterprise/data", { method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` }, body: JSON.stringify({ resource, id, changes }) });
    const result = await response.json();
    if (!response.ok) setError(result.error); else { setNotice("Record updated and audit logged."); await load(); }
    setBusy(false);
  }

  const heading = commandSlug && visible[0] ? visible[0].name : config.title;
  const intro = commandSlug && visible[0] ? visible[0].purpose : config.intro;
  return <div className="ent-workspace">
    <header className="ent-header"><div><span>{config.eyebrow}</span><h1>{heading}</h1><p>{intro}</p></div><div className="ent-actions"><button title="Refresh" onClick={load}><RefreshCw size={17} /></button>{formConfig && <button className="primary" onClick={() => setShowForm(!showForm)}>{showForm ? <X size={16} /> : <Plus size={16} />}{showForm ? "Close" : formConfig.label}</button>}</div></header>
    <section className="ent-kpis"><div><span>Records</span><strong>{visible.length}</strong></div><div><span>Active</span><strong>{active}</strong></div><div><span>Needs review</span><strong>{review}</strong></div><div><span>Critical</span><strong>{critical}</strong></div></section>
    {error && <div className="ent-alert error">{error}</div>}{notice && <div className="ent-alert success">{notice}</div>}
    {showForm && formConfig && <section className="ent-form-panel"><div className="ent-section-head"><div><span>NEW ENTERPRISE RECORD</span><h2>{formConfig.label}</h2></div><FileCheck2 /></div><form className="ent-form" onSubmit={submit}>{formConfig.fields.map((field) => <label key={field.name} className={field.type === "textarea" ? "wide" : ""}><span>{field.label}{field.required ? " *" : ""}</span>{field.type === "select" ? <select value={form[field.name] || field.options?.[0]} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}>{field.options?.map((option) => <option key={option} value={option}>{titleCase(option)}</option>)}</select> : field.type === "textarea" ? <textarea required={field.required} placeholder={field.placeholder} value={form[field.name] || ""} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} /> : <input required={field.required} type={field.type || "text"} placeholder={field.placeholder} value={form[field.name] || ""} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} />}</label>)}<div className="wide ent-submit"><span>Authenticated enterprise writes are audit logged.</span><button className="primary" disabled={busy}>{busy ? <Loader2 className="spin" /> : <Plus size={16} />}{formConfig.label}</button></div></form>{path === "eventbrite/drafts" && <PayloadPreview form={form} />}</section>}
    <div className="ent-toolbar"><input aria-label="Search enterprise records" placeholder="Search command layer" value={query} onChange={(e) => setQuery(e.target.value)} /><Link href="/enterprise/audit">View audit log <ArrowUpRight size={14} /></Link></div>
    {loading ? <div className="ent-empty"><Loader2 className="spin" /> Loading enterprise data...</div> : visible.length === 0 ? <div className="ent-empty"><Database /> No records found. Apply the enterprise migration to populate this command center.</div> : <section className="ent-grid">{visible.map((row) => <EnterpriseCard key={row.id} resource={config.resource} row={row} busy={busy} update={update} />)}</section>}
  </div>;
}

function PayloadPreview({ form }: { form: Row }) {
  return <div className="ent-payload"><div><span>EVENTBRITE PAYLOAD PREVIEW</span><strong>Approval required before publish</strong></div><pre>{JSON.stringify({ name: form.event_name || "Event name", venue: form.venue_name || "Venue", address: form.venue_address || "Address", starts_at: form.starts_at || null, ends_at: form.ends_at || null, ticket_classes: String(form.ticket_classes || "").split("\n").filter(Boolean) }, null, 2)}</pre></div>;
}

function EnterpriseCard({ resource, row, busy, update }: { resource: string; row: Row; busy: boolean; update: (resource: string, id: string, changes: Row) => void }) {
  const title = row.name || row.project_name || row.dashboard_name || row.campaign_name || row.event_name || row.task_title || row.title || row.action_type || row.target_handle;
  const status = row.status || row.approval_status || row.remediation_status || row.publish_status || row.outreach_status || "active";
  const icon = resource === "security" ? <ShieldAlert /> : resource === "eventbrite" ? <TicketCheck /> : resource === "ai" ? <Bot /> : resource === "campaigns" ? <Megaphone /> : resource === "projects" ? <Building2 /> : <Database />;
  return <article className="ent-card">
    <div className="ent-card-top"><span className={`ent-status ${status}`}>{titleCase(status)}</span><span>{titleCase(row.priority || row.severity || row.risk_level || row.division)}</span></div>
    <div className="ent-card-icon">{icon}</div><h2>{title}</h2><p>{row.purpose || row.description || row.objective || row.source_notes || row.message_script || row.result_notes || "Enterprise command record"}</p>
    <dl>{row.owner && <><dt>Owner</dt><dd>{row.owner}</dd></>}{row.source_projects && <><dt>Sources</dt><dd>{row.source_projects.join(", ")}</dd></>}{row.route_path && <><dt>Route</dt><dd>{row.route_path}</dd></>}{row.affected_table && <><dt>Affected</dt><dd>{row.affected_table}</dd></>}{row.starts_at && <><dt>Starts</dt><dd>{fmtDate(row.starts_at)}</dd></>}</dl>
    {row.widgets?.length ? <div className="ent-tags">{row.widgets.map((item: string) => <span key={item}>{titleCase(item)}</span>)}</div> : null}
    {row.route_path && <Link className="ent-open" href={row.route_path}>Open command center <ExternalLink size={14} /></Link>}
    {resource === "security" && <div className="ent-card-actions"><button disabled={busy} onClick={() => update("security", row.id, { remediation_status: "reviewed", reviewed_at: new Date().toISOString() })}><Check size={14} /> Mark reviewed</button></div>}
    {resource === "eventbrite" && <div className="ent-card-actions"><button disabled={busy} onClick={() => update("eventbrite", row.id, { approval_status: "approved" })}><Check size={14} /> Approve draft</button><span><AlertTriangle size={13} /> Publish remains manual</span></div>}
    {resource === "ai" && <div className="ent-card-actions"><button disabled={busy} onClick={() => update("ai", row.id, { status: "in_progress" })}>Start build</button><button disabled={busy} onClick={() => update("ai", row.id, { status: "completed" })}>Complete</button></div>}
    {resource === "outreach" && <div className="ent-card-actions"><button disabled={busy} onClick={() => update("outreach", row.id, { outreach_status: "approved_for_manual_send" })}><Check size={14} /> Approve manual send</button></div>}
  </article>;
}
