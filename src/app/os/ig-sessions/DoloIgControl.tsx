'use client';

import { useState } from 'react';

const CONTROL_URL = 'https://dzlmtvodpyhetvektfuo.supabase.co/functions/v1/ops-dolo-social-control';
const META_CONNECT_URL = 'https://dzlmtvodpyhetvektfuo.supabase.co/functions/v1/meta-social-connect-start';

type ControlResult = {
  ok?: boolean;
  ready?: boolean;
  error?: string;
  action?: string;
  profile?: {
    ig_username?: string;
    status?: string;
    session_saved?: boolean;
    daily_action_limit?: number;
    actions_today?: number;
    last_login?: string | null;
  };
  lane?: {
    worker_id?: string;
    status?: string;
    last_heartbeat?: string;
  };
  queued?: Array<{ id: string; action_type: string; status: string; target_handle: string }>;
};

export default function DoloIgControl() {
  const [result, setResult] = useState<ControlResult | null>(null);
  const [loading, setLoading] = useState<string>('');

  async function run(action: 'start' | 'check' | 'test') {
    setLoading(action);
    setResult(null);
    try {
      const res = await fetch(CONTROL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, target_handle: 'makeatlanta.greatagain' }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ ok: false, error: error instanceof Error ? error.message : 'Control request failed' });
    } finally {
      setLoading('');
    }
  }

  return (
    <section className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-5">
      <div className="text-xs uppercase tracking-[0.25em] text-yellow-100/80">@dolodorsey Connection</div>
      <h2 className="mt-2 text-2xl font-semibold text-white">Connect Instagram Through Meta</h2>
      <p className="mt-2 text-sm leading-6 text-white/70">
        This is the real Meta connection entry point for @dolodorsey. It will open Meta when app settings are present, or show the exact config that still needs to be added.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={META_CONNECT_URL}
          className="rounded-full bg-yellow-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-200"
        >
          Connect Instagram Through Meta
        </a>
        <button
          onClick={() => run('check')}
          disabled={Boolean(loading)}
          className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
        >
          {loading === 'check' ? 'Checking...' : 'Check Current Status'}
        </button>
        <button
          onClick={() => run('test')}
          disabled={Boolean(loading)}
          className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
        >
          {loading === 'test' ? 'Testing...' : 'Queue Test After Ready'}
        </button>
      </div>

      <div className="mt-5 grid gap-3">
        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-yellow-100/70">Meta Connect</div>
          <div className="mt-2 text-lg font-semibold text-white">What should happen</div>
          <p className="mt-1 text-sm text-white/60">
            If Meta app settings are installed, the button opens Meta. If settings are missing, the start function shows the exact missing keys and redirect URI.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-yellow-100/70">Before full activation</div>
          <div className="mt-2 text-lg font-semibold text-white">Profile and page must be linked</div>
          <p className="mt-1 text-sm text-white/60">
            @dolodorsey should be a professional Instagram profile connected to a Facebook Page inside Meta Business tools.
          </p>
        </div>
      </div>

      {result ? (
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/75">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] ${result.ready ? 'bg-green-400/15 text-green-200' : 'bg-yellow-400/15 text-yellow-100'}`}>
              {result.ready ? 'ready' : 'not ready'}
            </span>
            <span>{result.ok ? `${result.action || 'request'} processed` : result.error || 'Blocked'}</span>
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl bg-white/[0.04] p-3"><div className="text-white/40">Profile</div><div>{result.profile?.ig_username || 'dolodorsey'}</div></div>
            <div className="rounded-xl bg-white/[0.04] p-3"><div className="text-white/40">Status</div><div>{result.profile?.status || result.error || 'unknown'}</div></div>
            <div className="rounded-xl bg-white/[0.04] p-3"><div className="text-white/40">Ready</div><div>{String(result.profile?.session_saved ?? false)}</div></div>
          </div>
          {result.lane ? <div className="mt-3 rounded-xl bg-white/[0.04] p-3">Lane: {result.lane.worker_id} · {result.lane.status}</div> : null}
          {result.queued?.length ? (
            <div className="mt-3 rounded-xl bg-green-400/10 p-3 text-green-100">
              Queued: {result.queued.map((row) => `${row.action_type}:${row.status}`).join(', ')}
            </div>
          ) : null}
          {result.error ? <div className="mt-3 rounded-xl bg-red-400/10 p-3 text-red-100">{result.error}</div> : null}
        </div>
      ) : null}
    </section>
  );
}
