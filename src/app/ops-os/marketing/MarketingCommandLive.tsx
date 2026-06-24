"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { CalendarClock, DollarSign, Loader2, Megaphone, Send } from "lucide-react";

type Row = Record<string, any>;

const brands = ["Dr. Dorsey", "Make Atlanta Great Again", "The Kollective", "GOOD TIMES", "The Fraternity", "Casper Group", "The Mind Studio", "Products Division", "Club at South Dekalb"];
const channels = ["email", "sms", "evite", "eventbrite", "ads", "retargeting", "landing_page", "seo", "engagement", "street_team"];
const stages = ["awareness", "engagement", "lead", "invited", "clicked", "rsvp", "confirmed", "attended", "bought", "retention", "reactivation"];
const times = ["09:00", "12:00", "15:00", "18:00", "20:00", "22:00", "custom"];
const pipeline = ["Lead Captured", "Invited", "Clicked", "RSVP'd", "Confirmed", "Attended", "Bought", "Follow-Up Needed", "Converted"];

function token() { return typeof window === "undefined" ? "" : localStorage.getItem("khg_ops_token") || ""; }
function label(value?: string) { return (value || "unknown").replaceAll("_", " "); }
function date(value?: string) { return value ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value)) : "Schedule pending"; }
function money(value?: number | string) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(value || 0)); }

export default function MarketingCommandLive() {
  const [rows, setRows] = useState<Row[]>([]);
  const [form, setForm] = useState<Row>({ brand_key: brands[0], channel: "email", funnel_stage: "awareness", time: "12:00", owner_label: "Marketing Ops" });
  const [activeBrand, setActiveBrand] = useState(brands[0]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/ops-os/data?resource=marketing", { headers: token() ? { Authorization: `Bearer ${token()}` } : {} });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to load marketing calendar.");
      setRows(result.data || []);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to load marketing calendar.");
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  function setField(field: string, value: string) { setForm((current) => ({ ...current, [field]: value })); }
  function changeBrand(value: string) { setActiveBrand(value); setField("brand_key", value); }

  const selectedTime = form.time === "custom" ? form.custom_time_value : form.time;
  const scheduledFor = form.date && selectedTime ? `${form.date}T${selectedTime}` : "";
  const brandRows = useMemo(() => rows.filter((row) => `${row.brand_key || ""}`.toLowerCase().includes(activeBrand.toLowerCase())), [rows, activeBrand]);
  const totalBudget = rows.reduce((sum, row) => sum + Number(row.budget || 0), 0);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setNotice(""); setError("");
    try {
      const response = await fetch("/api/ops-os/data", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
        body: JSON.stringify({
          operation: "marketing_create",
          campaign_name: form.campaign_name,
          brand_key: form.brand_key,
          channel: form.channel,
          funnel_stage: form.funnel_stage,
          conversion_stage: form.funnel_stage,
          ghl_stage: form.funnel_stage,
          campaign_goal: form.campaign_goal,
          offer_name: form.offer_name,
          audience_key: form.audience_key,
          scheduled_for: scheduledFor,
          custom_time: form.time === "custom",
          timezone: "America/New_York",
          budget: form.budget,
          copy_preview: form.copy_preview,
          asset_url: form.asset_url,
          start_date: form.start_date,
          end_date: form.end_date,
          owner_label: form.owner_label,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Campaign was not created.");
      setNotice(`${form.brand_key} campaign created and sent to approval.`);
      setForm({ brand_key: activeBrand, channel: "email", funnel_stage: "awareness", time: "12:00", owner_label: "Marketing Ops" });
      await load();
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Campaign was not created.");
    } finally { setBusy(false); }
  }

  return <div className="ops-workspace">
    <header className="ops-header"><div><span className="ops-eyebrow">MARKETING COMMAND • LIVE DATABASE</span><h1>Marketing Command</h1><p>Separate campaigns by brand, channel, audience, offer, asset, custom send time, budget, and conversion stage.</p></div><div className="ops-header-actions"><button className="ops-button secondary" onClick={load}><CalendarClock size={17} /> Refresh</button></div></header>
    <section className="ops-metrics"><div><span>Campaigns</span><strong>{rows.length}</strong></div><div><span>Needs approval</span><strong>{rows.filter((row) => ["needs_approval", "draft", "planned"].includes(row.status)).length}</strong></div><div><span>Live / scheduled</span><strong>{rows.filter((row) => ["sent", "live", "scheduled"].includes(row.status)).length}</strong></div><div><span>Budget</span><strong>{money(totalBudget)}</strong></div></section>
    {notice && <div className="ops-alert success">{notice}</div>}{error && <div className="ops-alert error">{error}</div>}
    <section className="ops-panel"><div className="ops-panel-heading"><div><span className="ops-eyebrow">BRAND LANES</span><h2>Separated Campaigns</h2></div><Megaphone size={22} /></div><div className="ops-action-row">{brands.map((item) => <button className={activeBrand === item ? "ops-button" : "ops-button secondary"} key={item} onClick={() => changeBrand(item)}>{item}</button>)}</div></section>
    <section className="ops-panel ops-create"><div className="ops-panel-heading"><div><span className="ops-eyebrow">CAMPAIGN BUILDER</span><h2>Copy + Asset + Custom Time</h2></div></div><form className="ops-form" onSubmit={submit}>
      <label><span>Brand</span><select value={form.brand_key || activeBrand} onChange={(event) => changeBrand(event.target.value)}>{brands.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label><span>Campaign Name *</span><input required value={form.campaign_name || ""} onChange={(event) => setField("campaign_name", event.target.value)} /></label>
      <label><span>Channel</span><select value={form.channel || "email"} onChange={(event) => setField("channel", event.target.value)}>{channels.map((item) => <option value={item} key={item}>{label(item)}</option>)}</select></label>
      <label><span>Conversion Stage</span><select value={form.funnel_stage || "awareness"} onChange={(event) => setField("funnel_stage", event.target.value)}>{stages.map((item) => <option value={item} key={item}>{label(item)}</option>)}</select></label>
      <label><span>Audience</span><input value={form.audience_key || ""} onChange={(event) => setField("audience_key", event.target.value)} /></label>
      <label><span>Offer</span><input value={form.offer_name || ""} onChange={(event) => setField("offer_name", event.target.value)} /></label>
      <label><span>Send Date</span><input type="date" value={form.date || ""} onChange={(event) => setField("date", event.target.value)} /></label>
      <label><span>Send Time</span><select value={form.time || "12:00"} onChange={(event) => setField("time", event.target.value)}>{times.map((item) => <option value={item} key={item}>{item === "custom" ? "Custom time" : item}</option>)}</select></label>
      {form.time === "custom" && <label><span>Custom Time</span><input type="time" value={form.custom_time_value || ""} onChange={(event) => setField("custom_time_value", event.target.value)} /></label>}
      <label><span>Budget</span><input type="number" value={form.budget || ""} onChange={(event) => setField("budget", event.target.value)} /></label>
      <label><span>Asset URL</span><input type="url" value={form.asset_url || ""} onChange={(event) => setField("asset_url", event.target.value)} /></label>
      <label><span>Owner</span><input value={form.owner_label || ""} onChange={(event) => setField("owner_label", event.target.value)} /></label>
      <label className="wide"><span>Campaign Goal</span><textarea value={form.campaign_goal || ""} onChange={(event) => setField("campaign_goal", event.target.value)} /></label>
      <label className="wide"><span>Copy Preview *</span><textarea required value={form.copy_preview || ""} onChange={(event) => setField("copy_preview", event.target.value)} /></label>
      <div className="wide ops-form-footer"><span>Writes to real campaign, calendar, and approval tables.</span><button className="ops-button" type="submit" disabled={busy}>{busy ? <Loader2 className="spin" size={17} /> : <Send size={17} />} Create Campaign</button></div>
    </form><div className="ops-marketing-preview"><div><span className="ops-badge approved">{label(form.channel)}</span><span>{form.audience_key || "Audience"}</span></div><h3>{form.campaign_name || "Campaign name"}</h3><p>{form.copy_preview || "Copy preview appears here."}</p><footer><span>{form.offer_name || "Offer"}</span><strong>{scheduledFor ? date(scheduledFor) : "Schedule pending"}</strong></footer></div></section>
    <section className="ops-panel"><div className="ops-panel-heading"><div><span className="ops-eyebrow">CONVERSION PIPELINE</span><h2>GHL Stage Logic</h2></div><DollarSign size={22} /></div><div className="ops-action-row">{pipeline.map((stage) => <span className="ops-badge planned" key={stage}>{stage}</span>)}</div></section>
    {loading ? <div className="ops-empty"><Loader2 className="spin" /> Loading marketing calendar...</div> : <section className="ops-records calendar-grid">{brandRows.length === 0 ? <div className="ops-empty">No marketing campaigns for {activeBrand} yet.</div> : brandRows.map((row) => <article className="ops-record" key={row.id}>{row.asset_url && <img className="record-image" src={row.asset_url} alt="" />}<div className="ops-record-top"><span className={`ops-badge ${row.status || "planned"}`}>{label(row.status || "planned")}</span><span>{label(row.channel)}</span></div><h2>{row.title || row.campaign_name || "Untitled campaign"}</h2><p>{row.copy_preview || "Copy needed."}</p><div className="ops-record-meta"><span><CalendarClock size={14} /> {date(row.scheduled_for)}</span><span><DollarSign size={14} /> {money(row.budget)}</span><span>{row.audience_key || "Audience not set"}</span></div></article>)}</section>}
  </div>;
}
