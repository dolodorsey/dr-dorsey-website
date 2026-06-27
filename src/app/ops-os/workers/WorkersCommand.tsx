"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2, Pause, Play, RadioTower, RefreshCw, Send, ShieldCheck, XCircle } from "lucide-react";

type WorkerHealth = {
  worker: string;
  label: string;
  is_alive: boolean;
  last_action_at: string | null;
  queue_depth: number;
  sent_today: number;
  failed_24h: number;
  is_paused: boolean;
};

type WorkerError = { worker: string; id: string; created_at: string; err: string | null; context: string | null };

type ApiState = { health: WorkerHealth[]; errors: WorkerError[] };

function token() {
  return typeof window === "undefined" ? "" : localStorage.getItem("khg_ops_token") || "";
}

function age(value: string | null) {
  if (!value) return "never";
  const minutes = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 60000));
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}

function label(value: string) {
  return value.replaceAll("_", " ");
}

export default function WorkersCommand() {
  const [data, setData] = useState<ApiState>({ health: [], errors: [] });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const authed = typeof window !== "undefined" && Boolean(token());

  const load = useCallback(async () => {
    setError("");
    const response = await fetch("/api/ops-os/workers", { headers: token() ? { Authorization: `Bearer ${token()}` } : {} });
    const result = await response.json();
    if (!response.ok) setError(result.error || "Unable to load workers.");
    else setData({ health: result.health || [], errors: result.errors || [] });
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const interval = window.setInterval(load, 8000);
    return () => window.clearInterval(interval);
  }, [load]);

  async function act(worker: string, action: "ping" | "pause" | "resume") {
    setBusy(`${worker}:${action}`); setError(""); setNotice("");
    try {
      const response = await fetch("/api/ops-os/workers", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
        body: JSON.stringify({ worker, action, reason: "manual_via_ops_os" }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Worker action failed.");
      setNotice(action === "ping" ? `Ping queued for ${label(worker)}.` : `${label(worker)} ${action === "pause" ? "paused" : "resumed"}.`);
      await load();
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Worker action failed.");
    } finally {
      setBusy("");
    }
  }

  const totals = useMemo(() => ({
    queue: data.health.reduce((sum, item) => sum + Number(item.queue_depth || 0), 0),
    alive: data.health.filter((item) => item.is_alive && !item.is_paused).length,
    failed: data.health.reduce((sum, item) => sum + Number(item.failed_24h || 0), 0),
    done: data.health.reduce((sum, item) => sum + Number(item.sent_today || 0), 0),
  }), [data.health]);

  return <div className="ops-workspace">
    <header className="ops-header">
      <div><span className="ops-eyebrow">WORKER CONTROL • SMS • IG DM • IG SCRAPE</span><h1>Workers Command</h1><p>Live queue health and protected controls for the Mac workers that send SMS, process Instagram DMs, and capture recent Instagram engagement.</p></div>
      <div className="ops-header-actions"><button className="ops-button secondary" onClick={load}><RefreshCw size={17} /> Refresh</button></div>
    </header>

    <section className="ops-metrics"><div><span>Alive</span><strong>{totals.alive}</strong></div><div><span>Queued</span><strong>{totals.queue}</strong></div><div><span>Done today</span><strong>{totals.done}</strong></div><div><span>Failed 24h</span><strong>{totals.failed}</strong></div></section>
    {!authed && <div className="ops-alert error">Sign in under Database Access to run PING, PAUSE, or RESUME. Health is read-only until signed in.</div>}
    {notice && <div className="ops-alert success">{notice}</div>}{error && <div className="ops-alert error">{error}</div>}

    {loading ? <div className="ops-empty"><Loader2 className="spin" /> Loading worker health...</div> : <section className="ops-records calendar-grid">
      {data.health.map((worker) => <article className="ops-record" key={worker.worker}>
        <div className="ops-record-top"><span className={`ops-badge ${worker.is_paused ? "planned" : worker.is_alive ? "approved" : worker.queue_depth > 0 ? "failed" : "planned"}`}>{worker.is_paused ? "paused" : worker.is_alive ? "alive" : worker.queue_depth > 0 ? "down" : "idle"}</span><RadioTower size={18} /></div>
        <h2>{worker.label}</h2>
        <p>Last action: {age(worker.last_action_at)}. Queue depth {worker.queue_depth}; completed today {worker.sent_today}; failed in 24h {worker.failed_24h}.</p>
        <div className="ops-status-line"><span>{worker.is_alive ? "Recent activity detected" : "No recent activity"}</span><span>{worker.is_paused ? "Paused in worker_state" : "Pulling is enabled"}</span><span>{worker.queue_depth > 0 ? "Work is waiting" : "Queue is clear"}</span></div>
        <div className="ops-action-row" style={{ marginTop: 14 }}>
          <button className="ops-button" disabled={!authed || Boolean(busy)} onClick={() => act(worker.worker, "ping")}>{busy === `${worker.worker}:ping` ? <Loader2 className="spin" size={16} /> : <Send size={16} />} Ping</button>
          {worker.is_paused ? <button className="ops-button approve" disabled={!authed || Boolean(busy)} onClick={() => act(worker.worker, "resume")}><Play size={16} /> Resume</button> : <button className="ops-button secondary" disabled={!authed || Boolean(busy)} onClick={() => act(worker.worker, "pause")}><Pause size={16} /> Pause</button>}
        </div>
      </article>)}
    </section>}

    <section className="ops-panel" style={{ marginTop: 18 }}>
      <div className="ops-panel-heading"><div><span className="ops-eyebrow">RECENT ERRORS</span><h2>Last 24 Hours</h2></div>{data.errors.length ? <AlertTriangle /> : <ShieldCheck />}</div>
      {data.errors.length === 0 ? <div className="ops-empty"><CheckCircle2 /> No worker errors found in the last 24 hours.</div> : <div className="ops-records">
        {data.errors.map((item) => <article className="ops-record" key={`${item.worker}-${item.id}`}><div className="ops-record-top"><span className="ops-badge failed">{item.worker}</span><XCircle size={17} /></div><h2>{item.context || item.id}</h2><p>{item.err || "No error message recorded."}</p><div className="ops-record-meta"><span>{new Date(item.created_at).toLocaleString()}</span></div></article>)}
      </div>}
    </section>
  </div>;
}
