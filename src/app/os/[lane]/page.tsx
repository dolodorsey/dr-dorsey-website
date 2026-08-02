import Link from 'next/link';
import OpsWorkspaceClient from './OpsWorkspaceClient';

type OpsSection = {
  section_key: string;
  section_label: string;
  purpose?: string;
  tiles?: Array<{
    tile_key: string;
    label: string;
    full_route?: string;
    preview_view?: string;
    detail_query?: Record<string, unknown>;
  }>;
};

type OpsConfig = {
  ok: boolean;
  sections?: OpsSection[];
  frontend_fixes?: Array<{
    fix_key: string;
    title: string;
    priority: string;
    status: string;
    description?: string;
  }>;
  team_execution_board?: Array<{
    person_name: string;
    role_lane?: string;
    priority?: string;
    assignment_confirmed?: boolean;
    contacts_made_today?: number;
    responses_received_today?: number;
    blockers?: string | null;
  }>;
  errors?: string[];
};

const CONFIG_URL = 'https://dzlmtvodpyhetvektfuo.supabase.co/functions/v1/ops-os-canonical-config';

const LANE_LABELS: Record<string, string> = {
  personal: 'Personal Command',
  approvals: 'Approvals Queue',
  social: 'Social Media',
  engagement: 'Engagement Engine',
  outreach: 'Marketing + Outreach',
  'gt-boh': 'Good Times BOH',
  'casper-boh': 'Casper BOH',
  'help911-boh': 'Help 911 BOH',
  'lead-intel': 'Lead Intel',
  'build-deploy': 'Build + Deploy',
  graphics: 'Graphics + Content',
  team_tasks: 'Team + Tasks',
  black_book: 'Black Book',
  directory: 'Directory',
  calendar: 'Calendar Timeline',
  scheduled_tasks: 'Scheduled Tasks',
};

async function getConfig(): Promise<OpsConfig> {
  try {
    const res = await fetch(CONFIG_URL, { cache: 'no-store' });
    if (!res.ok && res.status !== 207) return { ok: false, errors: [`Config endpoint returned ${res.status}`] };
    return await res.json();
  } catch (error) {
    return { ok: false, errors: [error instanceof Error ? error.message : 'Unknown config error'] };
  }
}

function normalizeLane(lane: string) {
  return lane.replace(/_/g, '-');
}

export const metadata = {
  title: 'Ops OS Workspace',
  description: 'Full-view workspace for the Kollective operating system.',
};

export default async function LanePage({ params }: { params: { lane: string } }) {
  const lane = normalizeLane(params.lane);
  const config = await getConfig();
  const sections = config.sections || [];
  const fixes = config.frontend_fixes || [];
  const team = config.team_execution_board || [];
  const activeSection = sections.find((section) =>
    (section.tiles || []).some((tile) => normalizeLane(tile.full_route?.replace('/os/', '') || tile.tile_key) === lane)
  );
  const activeTile = activeSection?.tiles?.find((tile) => normalizeLane(tile.full_route?.replace('/os/', '') || tile.tile_key) === lane);
  const label = activeTile?.label || LANE_LABELS[lane] || lane.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());

  return (
    <main className="min-h-screen bg-[#060607] px-5 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/ops-os" className="text-xs uppercase tracking-[0.25em] text-yellow-200/75 hover:text-yellow-100">← Back to Ops OS</Link>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">{label}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/55">
              True full-view workspace for execution, ownership, proof, contacts, blockers, and next actions.
            </p>
          </div>
          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-4 text-sm text-yellow-100">
            <div className="text-xs uppercase tracking-[0.25em]">Lane</div>
            <div className="mt-2 font-mono">{lane}</div>
          </div>
        </div>

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-white/45">Source</div>
            <div className="mt-2 text-xl font-semibold">{activeTile?.preview_view || 'MCP Gateway'}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-white/45">Team Rows</div>
            <div className="mt-2 text-xl font-semibold">{team.length}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-white/45">Fix Queue</div>
            <div className="mt-2 text-xl font-semibold">{fixes.filter((fix) => fix.status !== 'complete').length}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-white/45">Status</div>
            <div className="mt-2 text-xl font-semibold">{config.ok ? 'Live' : 'Warning'}</div>
          </div>
        </section>

        {config.errors?.length ? (
          <div className="mb-6 rounded-2xl border border-red-400/30 bg-red-950/30 p-4 text-sm text-red-100">
            {config.errors.join(' • ')}
          </div>
        ) : null}

        <OpsWorkspaceClient lane={lane} team={team} fixes={fixes} />
      </div>
    </main>
  );
}
