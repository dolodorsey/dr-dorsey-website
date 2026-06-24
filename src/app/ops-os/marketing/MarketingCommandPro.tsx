"use client";

import { DragEvent, FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { BarChart3, CalendarClock, DollarSign, Funnel, Image as ImageIcon, Loader2, Megaphone, Send, UploadCloud } from "lucide-react";

type Row = Record<string, any>;

type MarketingForm = {
  brand: string;
  campaign: string;
  channel: string;
  stage: string;
  goal: string;
  offer: string;
  audience: string;
  date: string;
  time: string;
  customTime: string;
  budget: string;
  copy: string;
  assetUrl: string;
  startDate: string;
  endDate: string;
  owner: string;
};

const brands = ["Dr. Dorsey", "Make Atlanta Great Again", "The Kollective", "GOOD TIMES", "The Fraternity", "Casper Group", "The Mind Studio", "Products Division", "Club at South Dekalb"];
const channels = ["email", "sms", "evite", "eventbrite", "ads", "retargeting", "landing_page", "seo", "engagement", "street_team"];
const stages = ["awareness", "engagement", "lead", "invited", "clicked", "rsvp", "confirmed", "attended", "bought", "retention", "reactivation"];
const timeBlocks = ["09:00", "12:00", "15:00", "18:00", "20:00", "22:00", "custom"];
const pipeline = ["Lead Captured", "Invited", "Clicked", "RSVP'd", "Confirmed", "Attended", "Bought", "Follow-Up Needed", "Converted"];

const emptyForm: MarketingForm = {
  brand: brands[0],
  campaign: "",
  channel: "email",
  stage: "awareness",
  goal: "",
  offer: "",
  audience: "",
  date: "",
  time: "12:00",
  customTime: "",
  budget: "",
  copy: "",
  assetUrl: "",
  startDate: "",
  endDate: "",
  owner: "Marketing Ops",
};

function token() {
  return typeof window === "undefined" ? "" : localStorage.getItem("khg_ops_token") || "";
}

function label(value?: string) {
  return (value || "unknown").replaceAll("_", " ");
}

function date(value?: string) {
  if (!value) return "Schedule pending";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value));
}

function money(value?: number | string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(value || 0));
}

export default function MarketingCommandPro() {
  const [rows, setRows] = useState<Row[]>([]);
  const [form, setForm] = useState<MarketingForm>(emptyForm);
  const [activeBrand, setActiveBrand] = useState(brands[0]);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/ops-os/data?resource=marketing", { headers: token() ? { Authorization: `Bearer ${token()}` } : {} });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to load marketing calendar.");
      setRows(result.data || []);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to load marketing calendar.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const selectedTime = form.time === "custom" ? form.customTime : form.time;
  const scheduledFor = form.date && selectedTime ? `${form.date}T${selectedTime}` : "";

  const brandRows = useMemo(() => rows.filter((row) => `${row.brand_key || ""} ${row.title || ""}`.toLowerCase().includes(activeBrand.toLowerCase())), [rows, activeBrand]);

  const metrics = {
    total: rows.length,
    needsApproval: rows.filter((row) => ["needs_approval", "draft", "planned"].includes(row.status)).length,
    live: rows.filter((row) => ["sent", "live", "scheduled"].includes(row.status)).length,
    budget: rows.reduce((sum, row) => sum + Number(row.budget || 0), 0),
  };

  async function uploadFile(file: File) {
    setBusy(true); setError(""); setNotice("Uploading marketing asset...");
    try {
      const configResponse = await fetch("/api/ops-os/config");
      const config = await configResponse.json();
      if (!configResponse.ok) throw new Error(config.error || "Upload config unavailable.");
      const client = createClient(config.url, config.key);
      const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
      const path = `ops-os/marketing/${Date.now()}-${safeName}`;
      const { error: uploadError } = await client.storage.from("brand-graphics").upload(path, file);
      if (uploadError) throw uploadError;
      const { data } = client.storage.from("brand-graphics").getPublicUrl(path);
      setForm((current) => ({ ...current, assetUrl: data.publicUrl }));
      setNotice("Marketing asset attached.");
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Upload failed.");
      setNotice("");
    } finally {
      setBusy(false);
    }
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/ops-os/data", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
        body: JSON.stringify({
          operation: "marketing_create",
          campaign_name: form.campaign,
          brand_key: form.brand,
          channel: form.channel,
          funnel_stage: form.stage,
          campaign_goal: form.goal,
          offer_name: form.offer,
          audience_key: form.audience,
          scheduled_for: scheduledFor,
          budget: form.budget,
          copy_preview: form.copy,
          asset_url: form.assetUrl,
          start_date: form.startDate,
          end_date: form.endDate,
          owner_label: form.owner,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Campaign was not created.");
      setNotice(`${form.brand} ${label(form.channel)} campaign created and sent to approval.`);
      setActiveBrand(form.brand);
      setForm({ ...emptyForm, brand: form.brand });
      await load();
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Campaign was not created.");
    } finally {
      setBusy(false);
    }
  }

  function updateBrand(brand: string) {
    setActiveBrand(brand);
    setForm((current) => ({ ...current, brand }));
  }

  return (
    <div className="ops-workspace">
      <header className="ops-header">
        <div>
          <span className="ops-eyebrow">MARKETING COMMAND • CAMPAIGNS • CONVERSION PATHS • ASSET APPROVAL</span>
          <h1>Marketing Command</h1>
          <p>Program campaigns by brand, channel, audience, offer, copy, asset, send time, budget, and conversion stage. Social posts stay separate; this is for email, SMS, ads, evites, SEO, and revenue movement.</p>
        </div>
        <div className="ops-header-actions"><button className="ops-button secondary" onClick={load}><CalendarClock size={17} /> Refresh</button></div>
      </header>

      <section className="ops-metrics">
        <div><span>Campaign items</span><strong>{metrics.total}</strong></div>
        <div><span>Needs approval</span><strong>{metrics.needsApproval}</strong></div>
        <div><span>Live / scheduled</span><strong>{metrics.live}</strong></div>
        <div><span>Tracked budget</span><strong>{money(metrics.budget)}</strong></div>
      </section>

      {notice && <div className="ops-alert success">{notice}</div>}
      {error && <div className="ops-alert error">{error}</div>}

      <section className="ops-panel">
        <div className="ops-panel-heading"><div><span className="ops-eyebrow">BRAND LANES</span><h2>Keep Campaigns Separated</h2></div><Megaphone size={22} /></div>
        <div className="ops-records calendar-grid">
          {brands.map((brand) => {
            const count = rows.filter((row) => `${row.brand_key || ""}`.toLowerCase().includes(brand.toLowerCase())).length;
            return <button key={brand} className="ops-record command-card" onClick={() => updateBrand(brand)} style={{ textAlign: "left", cursor: "pointer" }}>
              <div className="ops-record-top"><span className={`ops-badge ${activeBrand === brand ? "approved" : "planned"}`}>{count} campaigns</span><BarChart3 size={18} /></div>
              <h2>{brand}</h2><p>Dedicated marketing calendar, audience, offer, and conversion path.</p>
            </button>;
          })}
        </div>
      </section>

      <section className="ops-panel ops-create">
        <div className="ops-panel-heading"><div><span className="ops-eyebrow">CAMPAIGN BUILDER</span><h2>Copy + Creative + Channel + Funnel Stage</h2></div><Funnel size={22} /></div>
        <form className="ops-form" onSubmit={submit}>
          <label><span>Brand *</span><select value={form.brand} onChange={(event) => updateBrand(event.target.value)}>{brands.map((brand) => <option key={brand}>{brand}</option>)}</select></label>
          <label><span>Campaign Name *</span><input required value={form.campaign} onChange={(event) => setForm({ ...form, campaign: event.target.value })} placeholder="Birthday Weekend RSVP Push" /></label>
          <label><span>Channel</span><select value={form.channel} onChange={(event) => setForm({ ...form, channel: event.target.value })}>{channels.map((item) => <option key={item} value={item}>{label(item)}</option>)}</select></label>
          <label><span>Conversion Stage</span><select value={form.stage} onChange={(event) => setForm({ ...form, stage: event.target.value })}>{stages.map((item) => <option key={item} value={item}>{label(item)}</option>)}</select></label>
          <label><span>Audience</span><input value={form.audience} onChange={(event) => setForm({ ...form, audience: event.target.value })} placeholder="VIPs, birthday list, vendors, old leads" /></label>
          <label><span>Offer / Hook</span><input value={form.offer} onChange={(event) => setForm({ ...form, offer: event.target.value })} placeholder="Free session, early RSVP, vendor slot" /></label>
          <label><span>Send Date</span><input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} /></label>
          <label><span>Send Time</span><select value={form.time} onChange={(event) => setForm({ ...form, time: event.target.value })}>{timeBlocks.map((item) => <option key={item} value={item}>{item === "custom" ? "Custom time" : item}</option>)}</select></label>
          {form.time === "custom" && <label><span>Custom Time</span><input type="time" value={form.customTime} onChange={(event) => setForm({ ...form, customTime: event.target.value })} /></label>}
          <label><span>Budget</span><input type="number" value={form.budget} onChange={(event) => setForm({ ...form, budget: event.target.value })} placeholder="0" /></label>
          <label><span>Start Date</span><input type="date" value={form.startDate} onChange={(event) => setForm({ ...form, startDate: event.target.value })} /></label>
          <label><span>End Date</span><input type="date" value={form.endDate} onChange={(event) => setForm({ ...form, endDate: event.target.value })} /></label>
          <label className="wide"><span>Campaign Goal</span><textarea value={form.goal} onChange={(event) => setForm({ ...form, goal: event.target.value })} placeholder="What should this campaign make happen?" /></label>
          <label className="wide"><span>Message / Copy Preview *</span><textarea required value={form.copy} onChange={(event) => setForm({ ...form, copy: event.target.value })} placeholder="Paste the email/SMS/ad/evite copy here." /></label>
          <label><span>Asset URL</span><input type="url" value={form.assetUrl} onChange={(event) => setForm({ ...form, assetUrl: event.target.value })} placeholder="Paste campaign creative URL" /></label>
          <label><span>Owner</span><input value={form.owner} onChange={(event) => setForm({ ...form, owner: event.target.value })} /></label>
          <div className="wide ops-form-footer"><span>Campaigns create marketing calendar items and approval requests without touching social post blocks.</span><button className="ops-button" type="submit" disabled={busy}>{busy ? <Loader2 className="spin" size={17} /> : <Send size={17} />} Create Campaign</button></div>
        </form>

        <div className="ops-preview-grid">
          <div className={`ops-graphic-preview ${dragging ? "is-dragging" : ""}`} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={handleDrop}>
            {form.assetUrl ? <img src={form.assetUrl} alt="Marketing asset preview" /> : <><UploadCloud size={38} /><span>Drag/drop campaign asset here or upload below</span><input type="file" accept="image/*,video/*,.pdf" disabled={busy} onChange={(event) => { const file = event.target.files?.[0]; if (file) uploadFile(file); }} /></>}
          </div>
          <div className="ops-marketing-preview"><div><span className="ops-badge approved">{label(form.channel)}</span><span>{form.audience || "Audience"}</span></div><h3>{form.campaign || "Campaign name"}</h3><p>{form.copy || "Campaign copy preview appears here while your team builds the send."}</p><footer><span>{form.offer || "Offer"}</span><strong>{scheduledFor ? date(scheduledFor) : "Schedule pending"}</strong></footer></div>
        </div>
      </section>

      <section className="ops-panel">
        <div className="ops-panel-heading"><div><span className="ops-eyebrow">CONVERSION PIPELINE</span><h2>GHL Stage Logic</h2></div><DollarSign size={22} /></div>
        <div className="ops-records calendar-grid">{pipeline.map((stage) => <article className="ops-record" key={stage}><div className="ops-record-top"><span className="ops-badge planned">Stage</span></div><h2>{stage}</h2><p>Use this as the campaign follow-up and CRM movement checkpoint.</p></article>)}</div>
      </section>

      {loading ? <div className="ops-empty"><Loader2 className="spin" /> Loading marketing calendar...</div> :
      <section className="ops-records calendar-grid">
        {brandRows.length === 0 ? <div className="ops-empty"><ImageIcon /> No marketing campaigns for {activeBrand} yet.</div> : brandRows.map((row) => <article className="ops-record" key={row.id}>
          {row.asset_url && <img className="record-image" src={row.asset_url} alt="" />}
          <div className="ops-record-top"><span className={`ops-badge ${row.status || "planned"}`}>{label(row.status || "planned")}</span><span>{label(row.channel)}</span></div>
          <h2>{row.title || row.campaign_name || "Untitled campaign"}</h2><p>{row.copy_preview || "Copy needed."}</p>
          <div className="ops-record-meta"><span><CalendarClock size={14} /> {date(row.scheduled_for)}</span><span><DollarSign size={14} /> {money(row.budget)}</span><span>{row.audience_key || "Audience not set"}</span></div>
        </article>)}
      </section>}
    </div>
  );
}
