type ReadinessRow = {
  task_id: string;
  title: string;
  description?: string;
  brand: string;
  status: string;
  priority: string;
  profile: string;
  notes?: string;
  account?: {
    ig_username: string;
    brand_key: string;
    session_saved: boolean;
    status: string;
    daily_action_limit: number;
    actions_today: number;
    last_login?: string | null;
  } | null;
};

type WorkerRow = {
  worker_id: string;
  status: string;
  is_primary: boolean;
  last_heartbeat?: string;
  error_message?: string | null;
};

type ReadinessResponse = {
  ok: boolean;
  priority_profiles?: ReadinessRow[];
  worker_status?: WorkerRow[];
  summary?: {
    priority_count: number;
    queued_count: number;
    ready_count: number;
    attention_count: number;
  };
  errors?: string[];
};

const READINESS_URL = 'https://dzlmtvodpyhetvektfuo.supabase.co/functions/v1/ops-social-profile-readiness';

async function getReadiness(): Promise<ReadinessResponse> {
  try {
    const res = await fetch(READINESS_URL, { cache: 'no-store' });
    if (!res.ok && res.status !== 207) return { ok: false, errors: [`Readiness endpoint returned ${res.status}`] };
    return await res.json();
  } catch (error) {
    return { ok: false, errors: [error instanceof Error ? error.message : 'Unknown readiness error'] };
  }
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-white/45">{label}</div>
      <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
    </div>
  );
}

export const metadata = {
  title: 'IG Session Readiness — Ops OS',
  description: 'Priority social profile readiness board for Ops OS.',
};

export default async function IgSessionsPage() {
  const data = await getReadiness();
  const rows = data.priority_profiles || [];
  const workers = data.worker_status || [];
  const summary = data.summary || { priority_count: rows.length, queued_count: 0, ready_count: 0, attention_count: rows.length };

  return (
    <main className="min-h-screen bg-[#060607] px-5 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <a href="/ops-os" className="text-xs uppercase tracking-[0.25em] text-yellow-200/75 hover:text-yellow-100">← Back to Ops OS</a>
        <section className="mt-5 rounded-3xl border border-white/10 bg-white/[0.035] p-6">
          <div className="text-xs uppercase tracking-[0.25em] text-yellow-200/80">Priority #1</div>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl">Social Profile Readiness</h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/60">
            This board tracks which priority profiles still need owner action before safe automation. Do not share passwords or codes in chat. Use the secure platform/device flow, then mark the related task complete after the session is ready.
          </p>
          {data.errors?.length ? <div className="mt-4 rounded-2xl border border-red-400/30 bg-red-950/30 p-4 text-sm text-red-100">{data.errors.join(' • ')}</div> : null}
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-4">
          <Stat label="Priority Profiles" value={summary.priority_count} />
          <Stat label="Queued" value={summary.queued_count} />
          <Stat label="Ready" value={summary.ready_count} />
          <Stat label="Needs Owner" value={summary.attention_count} />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_0.75fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
            <div className="text-xs uppercase tracking-[0.25em] text-yellow-200/80">Priority Queue</div>
            <div className="mt-5 space-y-3">
              {rows.map((row, index) => {
                const ready = row.account?.session_saved === true;
                return (
                  <article key={row.task_id} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-[0.2em] text-white/40">#{index + 1} · {row.brand}</div>
                        <h2 className="mt-1 text-2xl font-semibold">@{row.profile}</h2>
                        <p className="mt-1 text-sm text-white/50">{row.description}</p>
                      </div>
                      <span className={`rounded-full px-3 py-2 text-xs uppercase tracking-[0.18em] ${ready ? 'bg-green-400/15 text-green-200' : 'bg-yellow-400/15 text-yellow-100'}`}>
                        {ready ? 'ready' : 'owner action'}
                      </span>
                    </div>
                    <div className="mt-4 grid gap-3 text-sm md:grid-cols-4">
                      <div className="rounded-xl bg-white/[0.04] p-3"><div className="text-white/40">Task</div><div>{row.status}</div></div>
                      <div className="rounded-xl bg-white/[0.04] p-3"><div className="text-white/40">Account Status</div><div>{row.account?.status || 'not mapped'}</div></div>
                      <div className="rounded-xl bg-white/[0.04] p-3"><div className="text-white/40">Daily Limit</div><div>{row.account?.daily_action_limit ?? '—'}</div></div>
                      <div className="rounded-xl bg-white/[0.04] p-3"><div className="text-white/40">Used Today</div><div>{row.account?.actions_today ?? '—'}</div></div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
              <div className="text-xs uppercase tracking-[0.25em] text-yellow-200/80">Execution Lanes</div>
              <div className="mt-4 space-y-3">
                {workers.map((worker) => (
                  <div key={worker.worker_id} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-semibold">{worker.worker_id}</div>
                      <span className="text-xs text-yellow-100">{worker.status}</span>
                    </div>
                    <div className="mt-2 text-xs text-white/45">{worker.is_primary ? 'Primary lane' : 'Secondary lane'}</div>
                    <div className="mt-1 text-xs text-white/45">{worker.last_heartbeat || 'No heartbeat'}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
              <div className="text-xs uppercase tracking-[0.25em] text-yellow-200/80">Next Move</div>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-white/65">
                <li>Start with @dolodorsey.</li>
                <li>Complete secure owner action on device/platform.</li>
                <li>Confirm the account shows ready/session saved.</li>
                <li>Run one like, one comment, one scrape, then one warm DM test.</li>
                <li>Repeat for each priority profile.</li>
              </ol>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
