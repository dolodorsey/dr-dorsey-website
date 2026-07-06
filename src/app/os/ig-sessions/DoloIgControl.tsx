'use client';

import { useState } from 'react';

const CONTROL_URL = 'https://dzlmtvodpyhetvektfuo.supabase.co/functions/v1/ops-dolodorsey-ig-control';

type ControlResult = {
  ok?: boolean;
  ready?: boolean;
  error?: string;
  next?: string;
  account?: {
    ig_username?: string;
    status?: string;
    session_saved?: boolean;
    daily_action_limit?: number;
    actions_today?: number;
    last_login?: string | null;
  };
  worker?: {
    worker_id?: string;
    status?: string;
    last_heartbeat?: string;
  };
  queued?: Array<{ id: string; action_type: string; status: string; target_handle: string }>;
};

export default function DoloIgControl() {
  const [result, setResult] = useState<ControlResult | null>(null);
  const [loading, setLoading] = useState<string>('');

  async function run(action: 'recheck' | 'queue_test') {
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
      <div className="text-xs uppercase tracking-[0.25em] text-yellow-100/80">@dolodorsey Control</div>
      <h2 className="mt-2 text-2xl font-semibold text-white">Get First Account Working</h2>
      <p className="mt-2 text-sm leading-6 text-white/65">
        This panel checks the live readiness state and only queues a controlled test after the account is ready. No passwords or codes go through this page.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={() => run('recheck')}
          disabled={Boolean(loading)}
          className="rounded-full bg-yellow-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-200 disabled:opacity-50"
        >
          {loading === 'recheck' ? 'Rechecking...' : 'Recheck @dolodorsey'}
        </button>
        <button
          onClick={() => run('queue_test')}
          disabled={Boolean(loading)}
          className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
        >
          {loading === 'queue_test' ? 'Testing...' : 'Queue Controlled Test'}
        </button>
      </div>

      {result ? (
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/75">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] ${result.ready ? 'bg-green-400/15 text-green-200' : 'bg-yellow-400/15 text-yellow-100'}`}>
              {result.ready ? 'ready' : 'not ready'}
            </span>
            <span>{result.ok ? 'Request processed' : result.error || 'Blocked'}</span>
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl bg-white/[0.04] p-3"><div className="text-white/40">Account</div><div>{result.account?.ig_username || 'dolodorsey'}</div></div>
            <div className="rounded-xl bg-white/[0.04] p-3"><div className="text-white/40">Status</div><div>{result.account?.status || result.error || 'unknown'}</div></div>
            <div className="rounded-xl bg-white/[0.04] p-3"><div className="text-white/40">Session</div><div>{String(result.account?.session_saved ?? false)}</div></div>
          </div>
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
