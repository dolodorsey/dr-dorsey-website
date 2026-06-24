"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { CalendarClock, Check, CircleDollarSign, Clock3, ExternalLink, Image as ImageIcon, Loader2, Pencil, Plus, RefreshCw, Send, Sparkles, X } from "lucide-react";

type Row = Record<string, any>;
type Field = { name: string; label: string; type?: string; options?: string[]; required?: boolean; placeholder?: string };

const definitions: Record<string, { title: string; eyebrow: string; intro: string; operation?: string; submit?: string; fields?: Field[] }> = {
  home: { title: "Command Center", eyebrow: "TODAY'S OPERATING PICTURE", intro: "Move approvals, campaigns, revenue, events, and execution work from one live command surface." },
  social: {
    title: "Social Media Command", eyebrow: "PROGRAM • PREVIEW • APPROVE • SCHEDULE", intro: "Build complete posts with creative, captions, approvals, and publishing status in one calendar.",
    operation: "social_program", submit: "Program post",
    fields: [
      { name: "brand_key", label: "Brand", required: true, placeholder: "KHG" }, { name: "title", label: "Post title", required: true },
      { name: "platform", label: "Platform", type: "select", options: ["instagram", "tiktok", "facebook", "x", "youtube", "linkedin", "threads"] },
      { name: "content_type", label: "Format", type: "select", options: ["post", "reel", "story", "short", "carousel", "flyer"] },
      { name: "scheduled_for", label: "Publish date & time", type: "datetime-local", required: true }, { name: "asset_url", label: "Graphic / video URL", type: "url" },
      { name: "asset_upload", label: "Or upload graphic / video", type: "file" },
      { name: "caption_text", label: "Caption", type: "textarea", required: true }, { name: "cta", label: "Call to action" },
      { name: "brief", label: "Creative notes", type: "textarea" }, { name: "owner_label", label: "Owner" },
    ],
  },
  marketing: {
    title: "Marketing Command", eyebrow: "EMAIL • SMS • EVITE • EVENTBRITE • SEO • ADS", intro: "Program coordinated campaigns across every growth channel and see the send calendar at a glance.",
    operation: "marketing_create", submit: "Create campaign",
    fields: [
      { name: "campaign_name", label: "Campaign name", required: true }, { name: "brand_key", label: "Brand", placeholder: "KHG" },
      { name: "channel", label: "Channel", type: "select", options: ["email", "sms", "evite", "eventbrite", "seo", "ads", "retargeting", "landing_page", "engagement"] },
      { name: "funnel_stage", label: "Funnel stage", type: "select", options: ["awareness", "engagement", "lead", "conversion", "retention", "reactivation"] },
      { name: "campaign_goal", label: "Goal" }, { name: "offer_name", label: "Offer" }, { name: "audience_key", label: "Audience" },
      { name: "scheduled_for", label: "Launch date & time", type: "datetime-local" }, { name: "budget", label: "Budget", type: "number" },
      { name: "copy_preview", label: "Message / copy preview", type: "textarea" }, { name: "asset_url", label: "Asset URL", type: "url" },
      { name: "start_date", label: "Start date", type: "date" }, { name: "end_date", label: "End date", type: "date" }, { name: "owner_label", label: "Owner" },
    ],
  },
  approvals: { title: "Approval Command", eyebrow: "DECISIONS THAT UNBLOCK WORK", intro: "Review creative and copy, then approve, reject, or return it with a clear revision note." },
  "content-studio": {
    title: "Content Studio", eyebrow: "BRIEF • GENERATE • REVIEW • DELIVER", intro: "Turn creative briefs into trackable generation requests and production-ready assets.",
    operation: "creative_request", submit: "Create request",
    fields: [
      { name: "brand_key", label: "Brand", required: true }, { name: "title", label: "Asset title", required: true },
      { name: "request_type", label: "Request type", type: "select", options: ["graphic", "caption", "video", "source_content", "full_post", "email", "ad", "seo"] },
      { name: "content_type", label: "Asset format", type: "select", options: ["post", "reel", "story", "carousel", "email_asset", "ad_asset", "flyer", "seo_asset"] },
      { name: "request_prompt", label: "Generation instructions", type: "textarea", required: true }, { name: "brief", label: "Creative brief", type: "textarea" },
      { name: "source_url", label: "Source asset URL", type: "url" }, { name: "source_upload", label: "Or upload source asset", type: "file" },
      { name: "target_dimensions", label: "Dimensions", placeholder: "1080x1350" }, { name: "requested_tool", label: "Tool", placeholder: "Canva / AI / Designer" },
      { name: "due_at", label: "Due date & time", type: "datetime-local" },
    ],
  },
  events: {
    title: "Events Command", eyebrow: "ROLLOUT • PROMOTION • STAFFING • READINESS", intro: "Create an event rollout and automatically generate the critical execution tasks.",
    operation: "event_create", submit: "Create rollout + tasks",
    fields: [
      { name: "event_name", label: "Event name", required: true }, { name: "brand_key", label: "Brand" }, { name: "event_date", label: "Event date", type: "date" },
      { name: "venue_name", label: "Venue" }, { name: "city", label: "City" }, { name: "ticketing_url", label: "Ticketing URL", type: "url" },
      { name: "flyer_asset_url", label: "Flyer URL", type: "url" }, { name: "owner_label", label: "Rollout owner" },
    ],
  },
  revenue: {
    title: "Revenue Command", eyebrow: "PIPELINE • FOLLOW-UP • CLOSE • COLLECT", intro: "Track every money move, its value, next action, blocker, owner, and close status.",
    operation: "revenue_create", submit: "Add opportunity",
    fields: [
      { name: "opportunity_name", label: "Opportunity", required: true }, { name: "revenue_lane", label: "Revenue lane", required: true, placeholder: "Sponsorship / consulting / event" },
      { name: "brand_key", label: "Brand" }, { name: "contact_name", label: "Contact" }, { name: "contact_method", label: "Contact method" },
      { name: "offer_name", label: "Offer" }, { name: "estimated_value", label: "Estimated value", type: "number" },
      { name: "next_action", label: "Next action", type: "textarea" }, { name: "blocker_reason", label: "Blocker", type: "textarea" },
      { name: "owner_label", label: "Owner" }, { name: "due_at", label: "Follow-up date", type: "datetime-local" },
    ],
  },
  tasks: {
    title: "Task Command", eyebrow: "QUEUE • BLOCKERS • PROOF • HANDOFFS", intro: "Create and edit the operating queue with explicit ownership, proof, blockers, and handoffs.",
    operation: "task_create", submit: "Add task",
    fields: [
      { name: "title", label: "Task title", required: true }, { name: "department_key", label: "Department", type: "select", options: ["tasks", "social", "marketing", "content_studio", "events", "revenue", "approvals", "daily_ops"] },
      { name: "brand_key", label: "Brand" }, { name: "owner_label", label: "Owner" }, { name: "priority", label: "Priority", type: "select", options: ["low", "normal", "high", "critical", "executive"] },
      { name: "status", label: "Status", type: "select", options: ["open", "in_progress", "blocked", "waiting_approval", "scheduled", "done"] },
      { name: "due_at", label: "Due date", type: "datetime-local" }, { name: "description", label: "Instructions", type: "textarea" },
      { name: "blocker_reason", label: "Blocker", type: "textarea" }, { name: "handoff_to", label: "Handoff to" },
      { name: "proof_required", label: "Proof required", type: "checkbox" }, { name: "proof_url", label: "Proof URL", type: "url" },
    ],
  },
};

function date(value?: string) {
  if (!value) return "Not scheduled";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value));
}

function money(value?: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value || 0);
}

function label(value?: string) {
  return (value || "unknown").replaceAll("_", " ");
}

function token() {
  return typeof window === "undefined" ? "" : localStorage.getItem("khg_ops_token") || "";
}

export default function Workspace({ section }: { section: string }) {
  const definition = definitions[section] || definitions.home;
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(section !== "home" && section !== "approvals");
  const [form, setForm] = useState<Row>({});
  const [busy, setBusy] = useState(false);
  const [decisionNote, setDecisionNote] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch(`/api/ops-os/data?resource=${section}`, { headers: token() ? { Authorization: `Bearer ${token()}` } : {} });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setRows(result.data || []);
    } catch (nextError) { setError(nextError instanceof Error ? nextError.message : "Unable to load workspace."); }
    finally { setLoading(false); }
  }, [section]);

  useEffect(() => { load(); }, [load]);

  const visible = useMemo(() => rows.filter((row) => {
    const text = JSON.stringify(row).toLowerCase();
    const status = row.status || row.slot_status || "active";
    return text.includes(query.toLowerCase()) && (filter === "all" || status === filter || row.channel === filter || row.platform === filter);
  }), [rows, query, filter]);

  const statuses = useMemo(() => Array.from(new Set(rows.flatMap((row) => [row.status || row.slot_status, row.channel, row.platform]).filter(Boolean))), [rows]);

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/ops-os/data", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
        body: JSON.stringify({ ...form, operation: definition.operation }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setNotice(`${definition.submit} completed.`); setForm({}); await load();
    } catch (nextError) { setError(nextError instanceof Error ? nextError.message : "Action failed."); }
    finally { setBusy(false); }
  }

  async function uploadFile(file: File, targetField: string) {
    setBusy(true); setError(""); setNotice("Uploading asset...");
    try {
      const configResponse = await fetch("/api/ops-os/config");
      const config = await configResponse.json();
      if (!configResponse.ok) throw new Error(config.error);
      const client = createClient(config.url, config.key);
      const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
      const path = `ops-os/${Date.now()}-${safeName}`;
      const { error: uploadError } = await client.storage.from("brand-graphics").upload(path, file);
      if (uploadError) throw uploadError;
      const { data } = client.storage.from("brand-graphics").getPublicUrl(path);
      setForm((current) => ({ ...current, [targetField]: data.publicUrl }));
      setNotice("Asset uploaded and attached.");
    } catch (nextError) { setError(nextError instanceof Error ? nextError.message : "Upload failed."); setNotice(""); }
    finally { setBusy(false); }
  }

  async function update(resource: string, id: string, changes: Row, success: string) {
    setBusy(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/ops-os/data", {
        method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
        body: JSON.stringify({ resource, id, changes }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setNotice(success); await load();
    } catch (nextError) { setError(nextError instanceof Error ? nextError.message : "Update failed."); }
    finally { setBusy(false); }
  }

  const pending = rows.filter((row) => (row.status || row.slot_status) === "pending" || (row.status || row.slot_status) === "needs_approval").length;
  const blocked = rows.filter((row) => (row.status || row.slot_status) === "blocked" || row.blocker_reason).length;
  const scheduled = rows.filter((row) => ["scheduled", "approved", "live", "active"].includes(row.status || row.slot_status)).length;

  return (
    <div className="ops-workspace">
      <header className="ops-header">
        <div><span className="ops-eyebrow">{definition.eyebrow}</span><h1>{definition.title}</h1><p>{definition.intro}</p></div>
        <div className="ops-header-actions">
          <button className="ops-icon-button" title="Refresh data" onClick={load}><RefreshCw size={18} /></button>
          {definition.operation && <button className="ops-button" onClick={() => setShowForm(!showForm)}>{showForm ? <X size={17} /> : <Plus size={17} />}{showForm ? "Close" : definition.submit}</button>}
        </div>
      </header>

      <section className="ops-metrics">
        <div><span>Records</span><strong>{rows.length}</strong></div><div><span>Needs action</span><strong>{pending}</strong></div>
        <div><span>Blocked</span><strong>{blocked}</strong></div><div><span>Moving</span><strong>{scheduled}</strong></div>
      </section>

      {error && <div className="ops-alert error">{error}</div>}
      {notice && <div className="ops-alert success">{notice}</div>}

      {showForm && definition.fields && <section className="ops-panel ops-create">
        <div className="ops-panel-heading"><div><span className="ops-eyebrow">NEW RECORD</span><h2>{definition.submit}</h2></div><Sparkles size={20} /></div>
        <form className="ops-form" onSubmit={submit}>
          {definition.fields.map((field) => <label key={field.name} className={field.type === "textarea" ? "wide" : field.type === "checkbox" ? "check" : ""}>
            {field.type === "checkbox" ? <><input type="checkbox" checked={Boolean(form[field.name])} onChange={(e) => setForm({ ...form, [field.name]: e.target.checked })} /><span>{field.label}</span></> : <>
              <span>{field.label}{field.required ? " *" : ""}</span>
              {field.type === "select" ? <select value={form[field.name] || field.options?.[0]} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}>{field.options?.map((option) => <option key={option} value={option}>{label(option)}</option>)}</select>
              : field.type === "file" ? <input type="file" accept="image/*,video/*,.pdf" disabled={busy} onChange={(e) => { const file = e.target.files?.[0]; if (file) uploadFile(file, field.name === "asset_upload" ? "asset_url" : "source_url"); }} />
              : field.type === "textarea" ? <textarea required={field.required} placeholder={field.placeholder} value={form[field.name] || ""} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} />
              : <input required={field.required} type={field.type || "text"} placeholder={field.placeholder} value={form[field.name] || ""} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} />}</>}
          </label>)}
          <div className="wide ops-form-footer"><span>Writes require a signed-in Ops OS account.</span><button className="ops-button" type="submit" disabled={busy}>{busy ? <Loader2 className="spin" size={17} /> : <Send size={17} />}{definition.submit}</button></div>
        </form>
        {section === "social" && <SocialPreview form={form} />}
        {section === "marketing" && <MarketingPreview form={form} />}
        {section === "content-studio" && form.source_url && <div className="ops-source-preview"><span className="ops-eyebrow">SOURCE ASSET PREVIEW</span><img src={form.source_url} alt="Uploaded source asset preview" /></div>}
      </section>}

      <section className="ops-toolbar">
        <input aria-label="Search records" placeholder="Search this workspace" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select aria-label="Filter records" value={filter} onChange={(e) => setFilter(e.target.value)}><option value="all">All records</option>{statuses.map((status) => <option key={status} value={status}>{label(status)}</option>)}</select>
      </section>

      {loading ? <div className="ops-empty"><Loader2 className="spin" /> Loading live data...</div> :
      visible.length === 0 ? <div className="ops-empty"><CalendarClock /> No matching records yet.</div> :
      <section className={`ops-records ${section === "social" || section === "marketing" ? "calendar-grid" : ""}`}>
        {visible.map((row) => <RecordCard key={row.id} section={section} row={row} busy={busy} note={decisionNote[row.id] || ""} setNote={(value) => setDecisionNote({ ...decisionNote, [row.id]: value })} update={update} />)}
      </section>}
    </div>
  );
}

function SocialPreview({ form }: { form: Row }) {
  return <div className="ops-preview-grid"><div className="ops-graphic-preview">{form.asset_url ? <img src={form.asset_url} alt="Social creative preview" /> : <><ImageIcon size={36} /><span>Graphic preview</span></>}</div><div className="ops-copy-preview"><span className="ops-badge">{label(form.platform || "instagram")}</span><h3>{form.title || "Post title"}</h3><p>{form.caption_text || "Your caption preview appears here as you program the post."}</p><strong>{form.cta || "Call to action"}</strong></div></div>;
}

function MarketingPreview({ form }: { form: Row }) {
  return <div className="ops-marketing-preview"><div><span className="ops-badge">{label(form.channel || "email")}</span><span>{form.audience_key || "Audience"}</span></div><h3>{form.campaign_name || "Campaign name"}</h3><p>{form.copy_preview || "Campaign copy preview appears here."}</p><footer><span>{form.offer_name || "Offer"}</span><strong>{form.scheduled_for ? date(form.scheduled_for) : "Schedule pending"}</strong></footer></div>;
}

function RecordCard({ section, row, busy, note, setNote, update }: { section: string; row: Row; busy: boolean; note: string; setNote: (value: string) => void; update: (resource: string, id: string, changes: Row, success: string) => Promise<void> }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Row>({});
  const status = row.status || row.slot_status || "active";
  if (section === "home") return <article className="ops-record command-card"><span className={`ops-badge ${row.priority || ""}`}>{row.priority || "active"}</span><h2>{row.title}</h2><p>{row.subtitle}</p><div className="ops-record-meta"><span>Owner: {row.owner_label || "Unassigned"}</span><span>{row.next_best_action}</span></div><a className="ops-button" href={row.primary_route}>{row.primary_action_label} <ExternalLink size={15} /></a></article>;
  if (section === "approvals") return <article className="ops-record approval-card"><div className="ops-record-top"><span className={`ops-badge ${status}`}>{label(status)}</span><span>{row.risk_level} risk</span></div>{row.preview_url && <img src={row.preview_url} alt="" className="approval-image" />}<h2>{row.title}</h2><p>{row.preview_text || "No preview copy supplied."}</p><textarea aria-label={`Decision note for ${row.title}`} placeholder="Decision or revision note" value={note} onChange={(e) => setNote(e.target.value)} /><div className="ops-action-row"><button disabled={busy} className="ops-button approve" onClick={() => update("approvals", row.id, { status: "approved", decision_note: note, decided_at: new Date().toISOString() }, "Approval recorded.")}><Check size={16} /> Approve</button><button disabled={busy} className="ops-button secondary" onClick={() => update("approvals", row.id, { status: "needs_revision", decision_note: note, decided_at: new Date().toISOString() }, "Revision requested.")}><Pencil size={16} /> Revise</button><button disabled={busy} className="ops-button reject" onClick={() => update("approvals", row.id, { status: "rejected", decision_note: note, decided_at: new Date().toISOString() }, "Rejection recorded.")}><X size={16} /> Reject</button></div></article>;

  const title = row.title || row.campaign_name || row.event_name || row.opportunity_name || `${label(row.request_type)} request`;
  const description = row.caption_text || row.copy_preview || row.request_prompt || row.next_action || row.description || row.venue_name || "No additional notes.";
  const resource = section;
  const updateStatuses: Record<string, string[]> = {
    marketing: ["planned", "needs_copy", "needs_asset", "needs_approval", "approved", "scheduled", "sent", "live", "failed"],
    "content-studio": ["queued", "in_progress", "generated", "failed", "cancelled"],
    events: ["planning", "active", "blocked", "ready", "completed"],
    revenue: ["open", "in_progress", "blocked", "won", "lost"],
    tasks: ["open", "in_progress", "blocked", "waiting_approval", "scheduled", "done"],
  };
  return <article className="ops-record">
    {(row.asset_url || row.flyer_asset_url || row.thumbnail_url) && <img src={row.asset_url || row.flyer_asset_url || row.thumbnail_url} alt="" className="record-image" />}
    <div className="ops-record-top"><span className={`ops-badge ${status}`}>{label(status)}</span><span>{label(row.channel || row.platform || row.revenue_lane || row.request_type || row.department_key)}</span></div>
    <h2>{title}</h2><p>{description}</p>
    <div className="ops-record-meta">
      {(row.scheduled_for || row.due_at || row.event_date) && <span><Clock3 size={14} /> {date(row.scheduled_for || row.due_at || row.event_date)}</span>}
      {row.estimated_value != null && <span><CircleDollarSign size={14} /> {money(row.estimated_value)}</span>}
      {row.owner_label && <span>Owner: {row.owner_label}</span>}
      {row.blocker_reason && <span className="danger">Blocked: {row.blocker_reason}</span>}
      {row.metadata?.handoff_to && <span>Handoff: {row.metadata.handoff_to}</span>}
      {row.proof_url && <a href={row.proof_url} target="_blank" rel="noreferrer">View proof <ExternalLink size={13} /></a>}
    </div>
    {section === "social" ? <div className="ops-status-line"><span>Caption ready</span><span>{row.asset_url ? "Creative attached" : "Creative needed"}</span><span>{row.scheduled_for ? "Calendar programmed" : "Schedule needed"}</span></div> :
    updateStatuses[section] ? <><label className="ops-inline-edit"><span>Update status</span><select disabled={busy} value={status} onChange={(e) => update(resource, row.id, { status: e.target.value }, `${title} updated.`)}>{updateStatuses[section].map((option) => <option key={option}>{option}</option>)}</select></label>
      {(section === "tasks" || section === "revenue") && <div className="ops-card-edit">
        <button className="ops-button secondary" onClick={() => { setDraft(row); setEditing(!editing); }}><Pencil size={15} /> {editing ? "Close editor" : "Edit details"}</button>
        {editing && <div className="ops-mini-form">
          {section === "tasks" ? <><input aria-label="Task title" value={draft.title || ""} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /><input aria-label="Task owner" placeholder="Owner" value={draft.owner_label || ""} onChange={(e) => setDraft({ ...draft, owner_label: e.target.value })} /><textarea aria-label="Task description" placeholder="Instructions" value={draft.description || ""} onChange={(e) => setDraft({ ...draft, description: e.target.value })} /><input aria-label="Proof URL" placeholder="Proof URL" value={draft.proof_url || ""} onChange={(e) => setDraft({ ...draft, proof_url: e.target.value })} /></>
          : <><input aria-label="Next revenue action" placeholder="Next action" value={draft.next_action || ""} onChange={(e) => setDraft({ ...draft, next_action: e.target.value })} /><input aria-label="Revenue owner" placeholder="Owner" value={draft.owner_label || ""} onChange={(e) => setDraft({ ...draft, owner_label: e.target.value })} /><textarea aria-label="Revenue blocker" placeholder="Blocker" value={draft.blocker_reason || ""} onChange={(e) => setDraft({ ...draft, blocker_reason: e.target.value })} /></>}
          <button className="ops-button" disabled={busy} onClick={() => update(resource, row.id, section === "tasks" ? { title: draft.title, description: draft.description, owner_label: draft.owner_label, proof_url: draft.proof_url } : { next_action: draft.next_action, blocker_reason: draft.blocker_reason, owner_label: draft.owner_label }, `${title} details saved.`)}>Save details</button>
        </div>}
      </div>}</> : null}
  </article>;
}
