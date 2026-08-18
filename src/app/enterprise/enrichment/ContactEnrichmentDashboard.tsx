"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Activity, CheckCircle2, Database, Mail, Phone, RefreshCw, ShieldCheck, TimerReset } from "lucide-react";

interface Summary {
  total_records: number;
  reachable_any: number;
  has_both: number;
  missing_email: number;
  missing_phone: number;
  missing_both: number;
  records_verified_today: number;
  emails_recovered_today: number;
  phones_recovered_today: number;
  queue_queued: number;
  queue_in_progress: number;
  queue_needs_more_data: number;
  queue_resolved: number;
  attempted_record_yield_pct: number | null;
  refreshed_at: string;
}
interface SourceRow { enrichment_source: string; field_name: string; recovered_fields: number; recovered_records: number; avg_confidence: number; last_verified_at: string; }
interface RecentRow { field_name: string; confidence: number; enrichment_source: string; verified_at: string; entity_key?: string; context?: string; }
interface CronRow { jobname: string; schedule: string; active: boolean; }
interface Payload { summary: Summary; sources: SourceRow[]; recent: RecentRow[]; cron: CronRow[]; generated_at: string; }

function token() { return typeof window === "undefined" ? "" : localStorage.getItem("khg_ops_token") || ""; }
function n(value: number | null | undefined) { return Number(value || 0).toLocaleString(); }
function pct(value: number, total: number) { return total ? `${((value / total) * 100).toFixed(1)}%` : "0%"; }
function label(value?: string) { return (value || "unknown").replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()); }
function time(value?: string) { return value ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value)) : "—"; }

export default function ContactEnrichmentDashboard() {
  const [data, setData] = useState<Payload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setError("");
    const response = await fetch("/api/enterprise/enrichment", { headers: token() ? { Authorization: `Bearer ${token()}` } : {} });
    const result = await response.json();
    if (!response.ok) setError(result.error || "Could not load enrichment dashboard."); else setData(result.data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); const interval = window.setInterval(load, 30000); return () => window.clearInterval(interval); }, [load]);

  const s = data?.summary;
  const coverage = useMemo(() => s ? Math.round((s.reachable_any / Math.max(s.total_records, 1)) * 1000) / 10 : 0, [s]);
  const bothCoverage = useMemo(() => s ? Math.round((s.has_both / Math.max(s.total_records, 1)) * 1000) / 10 : 0, [s]);

  if (loading) return <div className="ce-loading"><RefreshCw className="ce-spin" /> Loading enrichment intelligence…</div>;
  if (error) return <div className="ce-error">{error}</div>;
  if (!s) return <div className="ce-error">No enrichment metrics are available.</div>;

  return <div className="ce-wrap">
    <header className="ce-hero">
      <div><span>DATA INTELLIGENCE • CONTACT ENRICHMENT</span><h1>Reachability Command Center</h1><p>Existing records only. Fill missing verified email and phone data, preserve provenance, and never trigger outreach from enrichment.</p></div>
      <button onClick={load}><RefreshCw size={16} /> Refresh</button>
    </header>

    <section className="ce-scorebar">
      <div><small>REACHABLE</small><strong>{coverage}%</strong><span>{n(s.reachable_any)} of {n(s.total_records)}</span></div>
      <div><small>HAS BOTH</small><strong>{bothCoverage}%</strong><span>{n(s.has_both)} complete records</span></div>
      <div><small>VERIFIED TODAY</small><strong>{n(s.records_verified_today)}</strong><span>{n(s.emails_recovered_today)} email · {n(s.phones_recovered_today)} phone</span></div>
      <div><small>ATTEMPT YIELD</small><strong>{s.attempted_record_yield_pct == null ? "—" : `${Number(s.attempted_record_yield_pct).toFixed(1)}%`}</strong><span>verified records / attempted</span></div>
    </section>

    <section className="ce-grid ce-metrics">
      <Metric icon={<Database />} title="Total Records" value={n(s.total_records)} sub="Existing enterprise contact intelligence" />
      <Metric icon={<Mail />} title="Missing Email" value={n(s.missing_email)} sub={`${pct(s.missing_email, s.total_records)} of records`} />
      <Metric icon={<Phone />} title="Missing Phone" value={n(s.missing_phone)} sub={`${pct(s.missing_phone, s.total_records)} of records`} />
      <Metric icon={<TimerReset />} title="Missing Both" value={n(s.missing_both)} sub="Highest enrichment priority" />
    </section>

    <section className="ce-two">
      <article className="ce-panel">
        <div className="ce-head"><div><span>QUEUE HEALTH</span><h2>Continuous Worker</h2></div><Activity /></div>
        <div className="ce-queue">
          <Queue label="Queued" value={s.queue_queued} />
          <Queue label="In Progress" value={s.queue_in_progress} />
          <Queue label="Needs More Data" value={s.queue_needs_more_data} />
          <Queue label="Resolved" value={s.queue_resolved} />
        </div>
        <div className="ce-crons">{(data?.cron || []).map((job) => <div key={job.jobname}><span className={job.active ? "on" : "off"} /><div><strong>{label(job.jobname.replace("khg-contact-method-", ""))}</strong><small>{job.schedule} · {job.active ? "ACTIVE" : "PAUSED"}</small></div></div>)}</div>
      </article>

      <article className="ce-panel">
        <div className="ce-head"><div><span>QUALITY CONTRACT</span><h2>Verification Guardrails</h2></div><ShieldCheck /></div>
        <ul className="ce-rules">
          <li><CheckCircle2 /> Exact internal identity recovery is preferred first.</li>
          <li><CheckCircle2 /> Official-site email must match the site domain.</li>
          <li><CheckCircle2 /> Phone auto-write requires a `tel:` link or structured telephone field.</li>
          <li><CheckCircle2 /> No guessed emails, private-number hunting, lead generation, or outreach.</li>
          <li><CheckCircle2 /> Every promoted value stores source, confidence, and verification time.</li>
        </ul>
      </article>
    </section>

    <section className="ce-panel">
      <div className="ce-head"><div><span>YIELD BY SOURCE</span><h2>What Is Actually Recovering Data</h2></div></div>
      <div className="ce-table"><div className="ce-row header"><span>Source</span><span>Field</span><span>Recovered</span><span>Confidence</span><span>Latest</span></div>{(data?.sources || []).map((row, i) => <div className="ce-row" key={`${row.enrichment_source}-${row.field_name}-${i}`}><strong>{label(row.enrichment_source)}</strong><span>{label(row.field_name)}</span><span>{n(row.recovered_fields)}</span><span>{(Number(row.avg_confidence) * 100).toFixed(1)}%</span><span>{time(row.last_verified_at)}</span></div>)}</div>
    </section>

    <section className="ce-panel">
      <div className="ce-head"><div><span>RECENT VERIFIED ACTIVITY</span><h2>Latest Recoveries</h2></div><span className="ce-private">Values hidden on dashboard</span></div>
      <div className="ce-table"><div className="ce-row recent header"><span>Context</span><span>Entity</span><span>Field</span><span>Source</span><span>Confidence</span><span>Verified</span></div>{(data?.recent || []).map((row, i) => <div className="ce-row recent" key={`${row.verified_at}-${i}`}><strong>{row.context || "Existing contact"}</strong><span>{label(row.entity_key)}</span><span>{label(row.field_name)}</span><span>{label(row.enrichment_source)}</span><span>{(Number(row.confidence) * 100).toFixed(1)}%</span><span>{time(row.verified_at)}</span></div>)}</div>
    </section>

    <footer className="ce-foot">Auto-refreshes every 30 seconds · Last generated {time(data?.generated_at)}</footer>
  </div>;
}

function Metric({ icon, title, value, sub }: { icon: React.ReactNode; title: string; value: string; sub: string }) { return <article className="ce-metric"><div>{icon}</div><span>{title}</span><strong>{value}</strong><small>{sub}</small></article>; }
function Queue({ label: name, value }: { label: string; value: number }) { return <div><span>{name}</span><strong>{n(value)}</strong></div>; }
