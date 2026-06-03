'use client';

import { useMemo, useState } from 'react';

type TeamRow = {
  person_name: string;
  role_lane?: string;
  priority?: string;
  assignment_confirmed?: boolean;
  contacts_made_today?: number;
  responses_received_today?: number;
  blockers?: string | null;
};

type FixRow = {
  fix_key: string;
  title: string;
  priority: string;
  status: string;
  description?: string;
};

type OpsWorkspaceClientProps = {
  lane: string;
  team: TeamRow[];
  fixes: FixRow[];
};

const ACTION_URL = 'https://dzlmtvodpyhetvektfuo.supabase.co/functions/v1/ops-os-action-dispatch';

function Field({ label, name, type = 'text', placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.2em] text-white/45">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-yellow-300/60"
      />
    </label>
  );
}

function TextArea({ label, name, placeholder }: { label: string; name: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.2em] text-white/45">{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={4}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-yellow-300/60"
      />
    </label>
  );
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-full bg-yellow-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-200" type="submit">
      {children}
    </button>
  );
}

export default function OpsWorkspaceClient({ lane, team, fixes }: OpsWorkspaceClientProps) {
  const [status, setStatus] = useState<string>('');
  const laneFixes = useMemo(() => fixes.filter((fix) => fix.status !== 'complete'), [fixes]);

  async function submit(action: string, formData: FormData) {
    setStatus('Saving...');
    const payload: Record<string, unknown> = {};
    formData.forEach((value, key) => {
      payload[key] = value.toString();
    });

    try {
      const res = await fetch(ACTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, actor: 'Ops OS', lane, payload }),
      });
      const data = await res.json();
      setStatus(data.ok ? `${action} saved.` : `Error: ${data.error || 'Action failed'}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Action failed');
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-6">
        <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-yellow-200/80">Action Rail</div>
          <h2 className="mt-2 text-3xl font-semibold">Run The Lane</h2>
          <p className="mt-2 text-sm leading-6 text-white/55">Create real tasks, contacts, proof reports, confirmations, and blockers. Every submission logs back to MCP Gateway.</p>
          {status ? <div className="mt-4 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-3 text-sm text-yellow-100">{status}</div> : null}
        </section>

        <form action={(fd) => submit('add_task', fd)} className="rounded-3xl border border-white/10 bg-black/25 p-5">
          <h3 className="text-xl font-semibold">Add Task</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field label="Title" name="title" placeholder="Call vendor / approve flyer / source leads" />
            <Field label="Assigned To" name="assigned_to" placeholder="Team member" />
            <Field label="Brand" name="brand" placeholder="Help 911 / Casper / Good Times" />
            <Field label="Priority" name="priority" placeholder="urgent / high" />
          </div>
          <div className="mt-4"><TextArea label="Description" name="description" placeholder="What exactly needs to happen?" /></div>
          <div className="mt-4"><SubmitButton>Create Task</SubmitButton></div>
        </form>

        <form action={(fd) => submit('add_contact', fd)} className="rounded-3xl border border-white/10 bg-black/25 p-5">
          <h3 className="text-xl font-semibold">Add Black Book Contact</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field label="Contact Name" name="contact_name" />
            <Field label="IG Handle" name="ig_handle" placeholder="@handle" />
            <Field label="Phone" name="phone" />
            <Field label="Email" name="email" type="email" />
            <Field label="Company / Event" name="company_or_event" placeholder="Wasted Weekends / Help 911" />
            <Field label="Lead Type" name="lead_type" placeholder="birthday / vendor / sponsor" />
          </div>
          <div className="mt-4"><TextArea label="Notes" name="notes" /></div>
          <div className="mt-4"><SubmitButton>Add Contact</SubmitButton></div>
        </form>

        <form action={(fd) => submit('submit_proof', fd)} className="rounded-3xl border border-white/10 bg-black/25 p-5">
          <h3 className="text-xl font-semibold">Submit Daily Proof</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field label="Person Name" name="person_name" />
            <Field label="Company / Event" name="company_or_event" />
            <Field label="Contacts Made" name="contacts_made" type="number" />
            <Field label="Responses Received" name="responses_received" type="number" />
          </div>
          <div className="mt-4"><TextArea label="Tomorrow First Move" name="tomorrow_first_move" /></div>
          <div className="mt-4"><SubmitButton>Submit Proof</SubmitButton></div>
        </form>
      </div>

      <aside className="space-y-6">
        <form action={(fd) => submit('confirm_assignment', fd)} className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-yellow-200/80">Confirm</div>
          <h3 className="mt-2 text-2xl font-semibold">Confirm Assignment</h3>
          <div className="mt-4 space-y-4">
            <Field label="Person Name" name="person_name" />
            <TextArea label="Response Summary" name="response_summary" placeholder="Confirmed. I own this lane." />
            <TextArea label="Blockers" name="blockers" />
            <TextArea label="Need From Dolo" name="needs_from_dolo" />
            <TextArea label="Tomorrow First Move" name="tomorrow_first_move" />
          </div>
          <div className="mt-4"><SubmitButton>Confirm Assignment</SubmitButton></div>
        </form>

        <form action={(fd) => submit('mark_blocker', fd)} className="rounded-3xl border border-red-400/20 bg-red-950/20 p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-red-200/80">Blocker</div>
          <h3 className="mt-2 text-2xl font-semibold">Report Blocker</h3>
          <div className="mt-4 space-y-4">
            <TextArea label="Blocker" name="blocker" placeholder="What is stopping execution?" />
            <TextArea label="Next Required" name="next_required" placeholder="What fixes it?" />
          </div>
          <div className="mt-4"><SubmitButton>Report Blocker</SubmitButton></div>
        </form>

        <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-yellow-200/80">Team Status</div>
          <h3 className="mt-2 text-2xl font-semibold">Assignments</h3>
          <div className="mt-4 space-y-3">
            {team.slice(0, 10).map((row) => (
              <div key={row.person_name} className="rounded-2xl border border-white/10 bg-black/25 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold">{row.person_name}</div>
                  <span className="text-xs text-yellow-100">{row.assignment_confirmed ? 'confirmed' : 'missing'}</span>
                </div>
                <div className="mt-1 text-xs text-white/50">{row.role_lane} · {row.priority}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-yellow-200/80">Fix Queue</div>
          <h3 className="mt-2 text-2xl font-semibold">Build Items</h3>
          <div className="mt-4 space-y-3">
            {laneFixes.map((fix) => (
              <div key={fix.fix_key} className="rounded-2xl border border-white/10 bg-black/25 p-3">
                <div className="font-semibold">{fix.title}</div>
                <div className="mt-1 text-xs text-white/50">{fix.priority} · {fix.status}</div>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}
