"use client";

import { DragEvent, FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { CalendarClock, ClipboardCheck, Image as ImageIcon, Instagram, Loader2, Send, ShieldCheck, UploadCloud } from "lucide-react";

type Row = Record<string, any>;
type Account = {
  id?: string;
  account_key: string;
  handle: string;
  brand_key: string;
  account_label: string;
  role_label: string;
  content_cadence: string;
  default_post_times: string[];
  connection_status?: string;
};

type SocialForm = {
  accountKey: string;
  accountId: string;
  handle: string;
  brand: string;
  title: string;
  format: string;
  date: string;
  time: string;
  customTime: string;
  assetUrl: string;
  caption: string;
  cta: string;
  brief: string;
  owner: string;
};

const fallbackAccounts: Account[] = [
  { account_key: "ig_dolodorsey", handle: "@DOLODORSEY", brand_key: "Dr. Dorsey", account_label: "Dr. Dorsey", role_label: "Founder / personal brand", content_cadence: "Authority + promo + lifestyle", default_post_times: ["09:00", "12:00", "15:00", "18:00", "20:00", "22:00"] },
  { account_key: "ig_makeatlanta", handle: "@MAKEATLANTA.GREATAGAIN", brand_key: "Make Atlanta Great Again", account_label: "Make Atlanta Great Again", role_label: "Civic / culture events", content_cadence: "Community + event conversion", default_post_times: ["09:00", "12:00", "15:00", "18:00", "20:00", "22:00"] },
  { account_key: "ig_kollectivehospitality", handle: "@KOLLECTIVEHOSPITALITY", brand_key: "The Kollective", account_label: "The Kollective Hospitality", role_label: "Parent company", content_cadence: "Proof of scale + brands", default_post_times: ["09:00", "12:00", "15:00", "18:00", "20:00", "22:00"] },
  { account_key: "ig_goodtimesworldwide", handle: "@GOODTIMESWORLDWIDE", brand_key: "GOOD TIMES", account_label: "GOOD TIMES", role_label: "Discovery platform", content_cadence: "Where to go + what to do", default_post_times: ["09:00", "12:00", "15:00", "18:00", "20:00", "22:00"] },
  { account_key: "ig_justhuglife", handle: "@JUST.HUGLIFE", brand_key: "Hug Life", account_label: "Hug Life", role_label: "Street team / activation", content_cadence: "DM conversion + ground game", default_post_times: ["09:00", "12:00", "15:00", "18:00", "20:00", "22:00"] },
  { account_key: "ig_thafraternity", handle: "@THAFRATERNITY", brand_key: "The Fraternity", account_label: "The Fraternity", role_label: "DJ / entertainer org", content_cadence: "Members + drops + city chapters", default_post_times: ["09:00", "12:00", "15:00", "18:00", "20:00", "22:00"] },
  { account_key: "ig_help911", handle: "@HELP911.HELP", brand_key: "HELP 911", account_label: "HELP 911", role_label: "Partner brand", content_cadence: "Utility + credibility + signups", default_post_times: ["09:00", "12:00", "15:00", "18:00", "20:00", "22:00"] },
  { account_key: "ig_clubsouthdekalb", handle: "@THECLUBATSOUTHDEKALB", brand_key: "Club at South Dekalb", account_label: "Club at South Dekalb", role_label: "Venue / nightlife", content_cadence: "Events + flyers + recaps", default_post_times: ["09:00", "12:00", "15:00", "18:00", "20:00", "22:00"] },
];

const formats = ["post", "reel", "story", "carousel", "flyer", "short"];
const statuses = ["needs_asset", "needs_caption", "needs_approval", "approved", "scheduled", "posted"];

function token() {
  return typeof window === "undefined" ? "" : localStorage.getItem("khg_ops_token") || "";
}

function displayDate(value?: string) {
  if (!value) return "Schedule needed";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value));
}

function label(value?: string) {
  return (value || "unknown").replaceAll("_", " ");
}

function normalizeAccount(row: Row): Account {
  const defaultTimes = Array.isArray(row.default_post_times) ? row.default_post_times : fallbackAccounts[0].default_post_times;
  return {
    id: row.id,
    account_key: row.account_key,
    handle: row.handle,
    brand_key: row.brand_key,
    account_label: row.account_label || row.brand_key,
    role_label: row.role_label || "Social account",
    content_cadence: row.content_cadence || "Custom account cadence",
    default_post_times: defaultTimes,
    connection_status: row.connection_status,
  };
}

function emptyFormFor(account: Account): SocialForm {
  return {
    accountKey: account.account_key,
    accountId: account.id || "",
    handle: account.handle,
    brand: account.brand_key,
    title: "",
    format: "post",
    date: "",
    time: account.default_post_times?.[1] || "12:00",
    customTime: "",
    assetUrl: "",
    caption: "",
    cta: "",
    brief: "",
    owner: "Social Ops",
  };
}

export default function SocialCommandPro() {
  const [rows, setRows] = useState<Row[]>([]);
  const [accounts, setAccounts] = useState<Account[]>(fallbackAccounts);
  const [activeAccount, setActiveAccount] = useState(fallbackAccounts[0].account_key);
  const [form, setForm] = useState<SocialForm>(emptyFormFor(fallbackAccounts[0]));
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const headers = token() ? { Authorization: `Bearer ${token()}` } : {};
      const [socialResponse, accountResponse] = await Promise.all([
        fetch("/api/ops-os/data?resource=social", { headers }),
        fetch("/api/ops-os/data?resource=social-accounts", { headers }),
      ]);
      const socialResult = await socialResponse.json();
      const accountResult = await accountResponse.json();
      if (!socialResponse.ok) throw new Error(socialResult.error || "Unable to load social calendar.");
      if (!accountResponse.ok) throw new Error(accountResult.error || "Unable to load social accounts.");
      const liveAccounts = (accountResult.data || []).map(normalizeAccount).filter((account: Account) => account.account_key && account.handle);
      if (liveAccounts.length) {
        setAccounts(liveAccounts);
        if (!liveAccounts.some((account: Account) => account.account_key === activeAccount)) {
          setActiveAccount(liveAccounts[0].account_key);
          setForm(emptyFormFor(liveAccounts[0]));
        }
      }
      setRows(socialResult.data || []);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to load social command data.");
    } finally {
      setLoading(false);
    }
  }, [activeAccount]);

  useEffect(() => { load(); }, [load]);

  const selectedAccount = accounts.find((account) => account.account_key === activeAccount) || accounts[0];
  const timeBlocks = [...new Set([...(selectedAccount.default_post_times || []), "custom"])];

  const accountRows = useMemo(() => rows.filter((row) => row.account_key === activeAccount || row.social_account_id === selectedAccount?.id || `${row.brand_key || ""}`.toLowerCase().includes(selectedAccount?.brand_key.toLowerCase() || "")), [rows, activeAccount, selectedAccount]);

  const metrics = {
    total: rows.length,
    needsAsset: rows.filter((row) => !row.asset_url).length,
    needsApproval: rows.filter((row) => ["needs_approval", "pending"].includes(row.approval_status || row.status || row.slot_status)).length,
    scheduled: rows.filter((row) => row.scheduled_for).length,
  };

  const selectedTime = form.time === "custom" ? form.customTime : form.time;
  const scheduledFor = form.date && selectedTime ? `${form.date}T${selectedTime}` : "";

  async function uploadFile(file: File) {
    setBusy(true); setError(""); setNotice("Uploading creative...");
    try {
      const configResponse = await fetch("/api/ops-os/config");
      const config = await configResponse.json();
      if (!configResponse.ok) throw new Error(config.error || "Upload config unavailable.");
      const client = createClient(config.url, config.key);
      const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
      const path = `ops-os/social/${Date.now()}-${safeName}`;
      const { error: uploadError } = await client.storage.from("brand-graphics").upload(path, file);
      if (uploadError) throw uploadError;
      const { data } = client.storage.from("brand-graphics").getPublicUrl(path);
      setForm((current) => ({ ...current, assetUrl: data.publicUrl }));
      setNotice("Creative attached to this post block.");
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
          operation: "social_program",
          social_account_id: form.accountId || undefined,
          account_key: form.accountKey,
          account_handle: form.handle,
          brand_key: form.brand,
          title: form.title,
          platform: "instagram",
          content_type: form.format,
          scheduled_for: scheduledFor,
          scheduled_time_label: selectedTime,
          custom_time: form.time === "custom",
          asset_url: form.assetUrl,
          caption_text: form.caption,
          cta: form.cta,
          brief: `Account: ${form.handle}\nBrand: ${form.brand}\nContent Block: ${form.format}\nNotes: ${form.brief}`,
          owner_label: form.owner,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Post block was not created.");
      setNotice(`${form.handle} post block programmed and sent to approval.`);
      setActiveAccount(form.accountKey);
      setForm(emptyFormFor(selectedAccount));
      await load();
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Post block was not created.");
    } finally {
      setBusy(false);
    }
  }

  function updateAccount(accountKey: string) {
    const account = accounts.find((item) => item.account_key === accountKey) || accounts[0];
    setActiveAccount(account.account_key);
    setForm((current) => ({ ...emptyFormFor(account), title: current.title, assetUrl: current.assetUrl, caption: current.caption, cta: current.cta, brief: current.brief, owner: current.owner }));
  }

  return (
    <div className="ops-workspace">
      <header className="ops-header">
        <div>
          <span className="ops-eyebrow">SOCIAL MEDIA COMMAND • ACCOUNT-SEPARATED • ASSET + CAPTION BLOCKS</span>
          <h1>Social Media Command</h1>
          <p>Program every IG separately with custom post times, drag/drop creative, caption blocks, CTA, approval routing, and calendar visibility before anything goes live.</p>
        </div>
        <div className="ops-header-actions"><button className="ops-button secondary" onClick={load}><CalendarClock size={17} /> Refresh</button></div>
      </header>

      <section className="ops-metrics">
        <div><span>Total blocks</span><strong>{metrics.total}</strong></div>
        <div><span>Needs creative</span><strong>{metrics.needsAsset}</strong></div>
        <div><span>Needs approval</span><strong>{metrics.needsApproval}</strong></div>
        <div><span>Scheduled</span><strong>{metrics.scheduled}</strong></div>
      </section>

      {notice && <div className="ops-alert success">{notice}</div>}
      {error && <div className="ops-alert error">{error}</div>}

      <section className="ops-panel">
        <div className="ops-panel-heading"><div><span className="ops-eyebrow">IG ACCOUNT CONTROL</span><h2>Live Accounts From Supabase</h2></div><Instagram size={22} /></div>
        <div className="ops-records calendar-grid">
          {accounts.map((account) => {
            const count = rows.filter((row) => row.account_key === account.account_key || row.social_account_id === account.id || `${row.brand_key || ""}`.toLowerCase().includes(account.brand_key.toLowerCase())).length;
            return <button key={account.account_key} className="ops-record command-card" onClick={() => updateAccount(account.account_key)} style={{ textAlign: "left", cursor: "pointer" }}>
              <div className="ops-record-top"><span className={`ops-badge ${activeAccount === account.account_key ? "approved" : "planned"}`}>{count} blocks</span><Instagram size={18} /></div>
              <h2>{account.handle}</h2><p>{account.brand_key} — {account.role_label}</p><div className="ops-status-line"><span>{account.content_cadence}</span><span>{account.connection_status || "manual_ready"}</span></div>
            </button>;
          })}
        </div>
      </section>

      <section className="ops-panel ops-create">
        <div className="ops-panel-heading"><div><span className="ops-eyebrow">POST BLOCK BUILDER</span><h2>Drag Creative + Caption + Custom Time</h2></div><UploadCloud size={22} /></div>
        <form className="ops-form" onSubmit={submit}>
          <label><span>IG Account *</span><select value={form.accountKey} onChange={(event) => updateAccount(event.target.value)}>{accounts.map((account) => <option key={account.account_key} value={account.account_key}>{account.handle} — {account.brand_key}</option>)}</select></label>
          <label><span>Post Title *</span><input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Example: Water Wars last call" /></label>
          <label><span>Format</span><select value={form.format} onChange={(event) => setForm({ ...form, format: event.target.value })}>{formats.map((item) => <option key={item} value={item}>{label(item)}</option>)}</select></label>
          <label><span>Post Date *</span><input required type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} /></label>
          <label><span>Post Time *</span><select value={form.time} onChange={(event) => setForm({ ...form, time: event.target.value })}>{timeBlocks.map((item) => <option key={item} value={item}>{item === "custom" ? "Custom time" : item}</option>)}</select></label>
          {form.time === "custom" && <label><span>Custom Time *</span><input required type="time" value={form.customTime} onChange={(event) => setForm({ ...form, customTime: event.target.value })} /></label>}
          <label className="wide"><span>Caption Block *</span><textarea required value={form.caption} onChange={(event) => setForm({ ...form, caption: event.target.value })} placeholder="Write the caption exactly how it should post." /></label>
          <label><span>CTA</span><input value={form.cta} onChange={(event) => setForm({ ...form, cta: event.target.value })} placeholder="DM, RSVP, buy, comment, share" /></label>
          <label><span>Owner</span><input value={form.owner} onChange={(event) => setForm({ ...form, owner: event.target.value })} /></label>
          <label><span>Asset URL</span><input type="url" value={form.assetUrl} onChange={(event) => setForm({ ...form, assetUrl: event.target.value })} placeholder="Paste final graphic/video URL" /></label>
          <label className="wide"><span>Creative / Programming Notes</span><textarea value={form.brief} onChange={(event) => setForm({ ...form, brief: event.target.value })} placeholder="Graphic direction, slide count, hook, footage needed, edit notes, etc." /></label>
          <div className="wide ops-form-footer"><span>Every post block writes account ID, account key, caption, asset, calendar slot, and approval request.</span><button className="ops-button" type="submit" disabled={busy}>{busy ? <Loader2 className="spin" size={17} /> : <Send size={17} />} Program Post Block</button></div>
        </form>

        <div className="ops-preview-grid">
          <div className={`ops-graphic-preview ${dragging ? "is-dragging" : ""}`} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={handleDrop}>
            {form.assetUrl ? <img src={form.assetUrl} alt="Creative preview" /> : <><UploadCloud size={38} /><span>Drag/drop creative here or upload below</span><input type="file" accept="image/*,video/*,.pdf" disabled={busy} onChange={(event) => { const file = event.target.files?.[0]; if (file) uploadFile(file); }} /></>}
          </div>
          <div className="ops-copy-preview"><span className="ops-badge approved">{form.handle}</span><h3>{form.title || "Post title"}</h3><p>{form.caption || "Caption preview appears here while your team programs this post block."}</p><strong>{form.cta || "CTA"}</strong><footer style={{ marginTop: 14, color: "#9da1a9" }}>{scheduledFor ? displayDate(scheduledFor) : "Custom schedule not set"}</footer></div>
        </div>
      </section>

      <section className="ops-toolbar"><input placeholder="Account view" value={selectedAccount?.handle || activeAccount} readOnly /><select value={activeAccount} onChange={(event) => updateAccount(event.target.value)}>{accounts.map((account) => <option key={account.account_key} value={account.account_key}>{account.handle}</option>)}</select></section>

      {loading ? <div className="ops-empty"><Loader2 className="spin" /> Loading social calendar...</div> :
      <section className="ops-records calendar-grid">
        {accountRows.length === 0 ? <div className="ops-empty"><ImageIcon /> No programmed blocks for {selectedAccount?.handle || activeAccount} yet.</div> : accountRows.map((row) => <article className="ops-record" key={row.id}>
          {(row.asset_url || row.thumbnail_url) && <img className="record-image" src={row.asset_url || row.thumbnail_url} alt="" />}
          <div className="ops-record-top"><span className={`ops-badge ${row.slot_status || row.approval_status || row.status || "planned"}`}>{label(row.slot_status || row.approval_status || row.status || "planned")}</span><span>{label(row.content_type || row.platform || "instagram")}</span></div>
          <h2>{row.title || "Untitled post"}</h2><p>{row.caption_text || "Caption missing."}</p>
          <div className="ops-record-meta"><span><CalendarClock size={14} /> {displayDate(row.scheduled_for)}</span><span><ClipboardCheck size={14} /> {row.asset_url ? "Creative attached" : "Creative needed"}</span><span><ShieldCheck size={14} /> {label(row.publish_status || "not_published")}</span></div>
          <div className="ops-status-line">{statuses.map((status) => <span key={status}>{label(status)}</span>)}</div>
        </article>)}
      </section>}
    </div>
  );
}
