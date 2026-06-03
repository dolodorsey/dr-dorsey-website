type OpsSection = {
  section_key: string;
  section_label: string;
  section_order: number;
  purpose?: string;
  required_widgets?: string[];
  required_actions?: string[];
  tiles?: Array<{
    tile_key: string;
    label: string;
    full_route?: string;
    preview_view?: string;
    preview_label?: string;
    detail_query?: Record<string, unknown>;
  }>;
};

type TeamRow = {
  person_name: string;
  role_lane?: string;
  priority?: string;
  assignment_status?: string;
  dashboard_lane?: string;
  assignment_confirmed?: boolean;
  contacts_made_today?: number;
  responses_received_today?: number;
  blockers?: string | null;
  needs_from_dolo?: string | null;
  tomorrow_first_move?: string | null;
};

type OpsConfig = {
  ok: boolean;
  canonical?: {
    host: string;
    path: string;
    source_project_id: string;
  };
  sections?: OpsSection[];
  frontend_fixes?: Array<{
    fix_key: string;
    title: string;
    priority: string;
    status: string;
    description?: string;
  }>;
  team_execution_board?: TeamRow[];
  errors?: string[];
};

const CONFIG_URL = 'https://dzlmtvodpyhetvektfuo.supabase.co/functions/v1/ops-os-canonical-config';

async function getOpsConfig(): Promise<OpsConfig> {
  try {
    const res = await fetch(CONFIG_URL, { cache: 'no-store' });
    if (!res.ok && res.status !== 207) {
      return { ok: false, errors: [`Config endpoint returned ${res.status}`], sections: [], frontend_fixes: [], team_execution_board: [] };
    }
    return await res.json();
  } catch (error) {
    return { ok: false, errors: [error instanceof Error ? error.message : 'Unknown config error'], sections: [], frontend_fixes: [], team_execution_board: [] };
  }
}

function routeForTile(tile?: { tile_key?: string; full_route?: string }) {
  if (!tile) return '/os/build-deploy';
  if (tile.full_route && tile.full_route.startsWith('/os/')) return tile.full_route;
  const key = tile.tile_key || 'build-deploy';
  return `/os/${key.replace(/_/g, '-')}`;
}

function routeForSection(section: OpsSection) {
  const firstTile = section.tiles?.[0];
  if (firstTile) return routeForTile(firstTile);
  return `/os/${section.section_key.replace(/_/g, '-')}`;
}

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-yellow-200">
    {children}
  </span>
);

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/20">
    <div className="text-xs uppercase tracking-[0.25em] text-white/45">{label}</div>
    <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
  </div>
);

export const metadata = {
  title: 'Kollective Ops OS — GM Command Center',
  description: 'Canonical execution dashboard for The Kollective operating system.',
};

export default async function OpsOSPage() {
  const config = await getOpsConfig();
  const sections = config.sections || [];
  const fixes = config.frontend_fixes || [];
  const team = config.team_execution_board || [];
  const confirmed = team.filter((row) => row.assignment_confirmed).length;
  const blockers = team.filter((row) => Boolean(row.blockers)).length;
  const p0Fixes = fixes.filter((fix) => fix.priority === 'P0' && fix.status !== 'complete').length;

  return (
    <main className="min-h-screen bg-[#060607] text-white">
      <section className="relative overflow-hidden border-b border-white/10 px-5 py-8 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,184,122,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.09),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Badge>Canonical /ops-os</Badge>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight sm:text-7xl">
                Kollective Execution Command Center
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
                One source. One build. One operating room for revenue, workers, team tasks, dashboard fixes, outreach, apps, and BOH execution.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/os/engagement" className="rounded-full bg-yellow-300 px-5 py-3 text-sm font-semibold text-black hover:bg-yellow-200">Run Engagement</a>
                <a href="/os/outreach" className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Launch Outreach</a>
                <a href="/os/team-tasks" className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Team Tasks</a>
              </div>
            </div>
            <div className="rounded-3xl border border-yellow-400/20 bg-black/35 p-5 text-sm text-white/70">
              <div className="text-xs uppercase tracking-[0.25em] text-yellow-200">Source of Truth</div>
              <div className="mt-2 font-mono text-white">{config.canonical?.source_project_id || 'dzlmtvodpyhetvektfuo'}</div>
              <div className="mt-3 text-xs text-white/45">{config.canonical?.host || 'dr-dorsey-website.vercel.app'}{config.canonical?.path || '/ops-os'}</div>
            </div>
          </div>

          {config.errors?.length ? (
            <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-950/30 p-4 text-red-100">
              <div className="font-semibold">Config warnings</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-red-100/80">
                {config.errors.map((error) => <li key={error}>{error}</li>)}
              </ul>
            </div>
          ) : null}

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Stat label="Sections" value={sections.length} />
            <Stat label="Team Rows" value={team.length} />
            <Stat label="Confirmed" value={`${confirmed}/${team.length}`} />
            <Stat label="Blockers" value={blockers} />
            <Stat label="P0 Fixes" value={p0Fixes} />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[1.7fr_0.9fr] lg:px-12">
        <div className="space-y-6">
          {sections.map((section) => (
            <article key={section.section_key} id={section.section_key} className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/30">
              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-yellow-200/80">Section {section.section_order}</div>
                  <h2 className="mt-2 text-3xl font-semibold">{section.section_label}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-white/55">{section.purpose}</p>
                </div>
                <a className="rounded-full bg-yellow-300 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-200" href={routeForSection(section)}>
                  Open Workspace
                </a>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {(section.tiles || []).map((tile) => (
                  <div key={tile.tile_key} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-white/40">{tile.tile_key}</div>
                    <div className="mt-2 text-xl font-semibold">{tile.label}</div>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/55">
                      <span className="rounded-full bg-white/10 px-2 py-1">{tile.preview_view || 'needs source'}</span>
                      <span className="rounded-full bg-green-400/10 px-2 py-1 text-green-100">workspace live</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <a className="rounded-full border border-white/15 px-3 py-2 text-xs text-white/80 hover:bg-white/10" href={routeForTile(tile)}>
                        Open
                      </a>
                      <a className="rounded-full border border-yellow-400/30 px-3 py-2 text-xs text-yellow-100 hover:bg-yellow-400/10" href={`${routeForTile(tile)}#assign-owner`}>
                        Assign Owner
                      </a>
                      <a className="rounded-full border border-yellow-400/30 px-3 py-2 text-xs text-yellow-100 hover:bg-yellow-400/10" href={`${routeForTile(tile)}#add-task`}>
                        Add Task
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {(section.required_actions || []).map((action) => <Badge key={action}>{action}</Badge>)}
              </div>
            </article>
          ))}
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
            <div className="text-xs uppercase tracking-[0.25em] text-yellow-200/80">Team + Tasks</div>
            <h2 className="mt-2 text-2xl font-semibold">GM Execution Board</h2>
            <div className="mt-5 space-y-3">
              {team.slice(0, 12).map((row) => (
                <a key={row.person_name} href="/os/team-tasks" className="block rounded-2xl border border-white/10 bg-black/25 p-4 transition hover:border-yellow-400/30 hover:bg-white/[0.06]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold">{row.person_name}</div>
                    <span className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.18em] ${row.assignment_confirmed ? 'bg-green-400/15 text-green-200' : 'bg-yellow-400/15 text-yellow-100'}`}>
                      {row.assignment_confirmed ? 'confirmed' : 'missing confirm'}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-white/50">{row.role_lane || 'Owner lane'} · {row.priority || 'P0'}</div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-white/55">
                    <span>Contacts: {row.contacts_made_today || 0}</span>
                    <span>Replies: {row.responses_received_today || 0}</span>
                  </div>
                  {row.blockers ? <div className="mt-3 rounded-xl bg-red-400/10 p-2 text-xs text-red-100">{row.blockers}</div> : null}
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
            <div className="text-xs uppercase tracking-[0.25em] text-yellow-200/80">Frontend Fix Queue</div>
            <h2 className="mt-2 text-2xl font-semibold">Build Cleanup</h2>
            <div className="mt-5 space-y-3">
              {fixes.map((fix) => (
                <a key={fix.fix_key} href="/os/build-deploy" className="block rounded-2xl border border-white/10 bg-black/25 p-4 transition hover:border-yellow-400/30 hover:bg-white/[0.06]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold">{fix.title}</div>
                    <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70">{fix.priority}</span>
                  </div>
                  <div className="mt-2 text-xs leading-5 text-white/50">{fix.description}</div>
                  <div className="mt-3 text-xs uppercase tracking-[0.18em] text-yellow-200/70">{fix.status}</div>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
