'use client';

import { useEffect, useState } from 'react';

const STATUS_URL = 'https://dzlmtvodpyhetvektfuo.supabase.co/functions/v1/social-connect-status';

type StatusResponse = {
  ok?: boolean;
  config_ready?: boolean;
  missing?: string[];
  checks?: Record<string, boolean>;
  profile?: { profile?: string; platform_username?: string; status?: string; connected_at?: string | null } | null;
  urls?: { start?: string; return_url?: string; dashboard?: string };
  next?: string;
};

export default function ConnectionChecklist() {
  const [data, setData] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(STATUS_URL, { cache: 'no-store' });
      setData(await res.json());
    } catch {
      setData({ ok: false, missing: ['status_endpoint_error'] });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const missing = data?.missing || [];
  const checks = data?.checks || {};

  return (
    <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-yellow-100/70">Live Connect Checklist</div>
          <h3 className="mt-2 text-lg font-semibold text-white">{loading ? 'Checking setup...' : data?.config_ready ? 'Meta setup ready' : 'Meta setup still missing items'}</h3>
        </div>
        <button onClick={load} className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10">Refresh</button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {Object.entries(checks).map(([key, ok]) => (
          <div key={key} className="rounded-xl bg-white/[0.04] p-3 text-sm">
            <div className="text-white/40">{key}</div>
            <div className={ok ? 'text-green-200' : 'text-yellow-100'}>{ok ? 'ready' : 'missing'}</div>
          </div>
        ))}
      </div>

      {missing.length ? (
        <div className="mt-4 rounded-xl bg-yellow-400/10 p-3 text-sm text-yellow-100">
          Missing: {missing.join(', ')}
        </div>
      ) : null}

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl bg-white/[0.04] p-3 text-sm">
          <div className="text-white/40">Profile record</div>
          <div>{data?.profile?.platform_username ? `@${data.profile.platform_username}` : 'not connected yet'}</div>
        </div>
        <div className="rounded-xl bg-white/[0.04] p-3 text-sm">
          <div className="text-white/40">Next</div>
          <div>{data?.next || 'load status'}</div>
        </div>
      </div>
    </div>
  );
}
