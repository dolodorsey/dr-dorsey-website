-- Dorsey Execution OS: authenticated staff routing + immutable audit trail.
-- Scope is intentionally limited to the existing Ops OS control-plane objects.

create table if not exists public.khg_dorsey_execution_audit (
  id uuid primary key default gen_random_uuid(),
  entity_key text not null default 'dr-dorsey',
  actor_id uuid default auth.uid(),
  actor_label text,
  action text not null,
  source_table text not null,
  source_id text not null,
  before_state jsonb not null default '{}'::jsonb,
  after_state jsonb not null default '{}'::jsonb,
  proof_url text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.khg_dorsey_execution_audit enable row level security;

create index if not exists khg_dorsey_execution_audit_source_idx
  on public.khg_dorsey_execution_audit (source_table, source_id, created_at desc);
create index if not exists khg_dorsey_execution_audit_created_idx
  on public.khg_dorsey_execution_audit (created_at desc);

grant select, insert on public.khg_dorsey_execution_audit to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname='public' and tablename='khg_dorsey_execution_audit' and policyname='dorsey_audit_staff_read'
  ) then
    create policy dorsey_audit_staff_read on public.khg_dorsey_execution_audit
      for select to authenticated using (public.is_khg_staff());
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname='public' and tablename='khg_dorsey_execution_audit' and policyname='dorsey_audit_staff_insert'
  ) then
    create policy dorsey_audit_staff_insert on public.khg_dorsey_execution_audit
      for insert to authenticated with check (
        public.is_khg_staff()
        and entity_key in ('dr-dorsey','dr_dorsey','dorsey','the-kollective','the_kollective','kollective')
      );
  end if;
end $$;

-- These are internal control-plane records. Browser writes use the signed-in
-- staff JWT. No service-role key is exposed to the client.
grant select, insert, update on public.enterprise_handoff_notes to authenticated;
grant select, insert, update on public.khg_managed_agent_handoffs to authenticated;
grant select on public.agent_health to authenticated;
grant select on public.agent_executions to authenticated;
grant select on public.worker_dispatch_log to authenticated;
grant update on public.worker_state to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname='public' and tablename='enterprise_handoff_notes' and policyname='dorsey_notes_staff_read'
  ) then
    create policy dorsey_notes_staff_read on public.enterprise_handoff_notes
      for select to authenticated using (public.is_khg_staff());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname='public' and tablename='enterprise_handoff_notes' and policyname='dorsey_notes_staff_insert'
  ) then
    create policy dorsey_notes_staff_insert on public.enterprise_handoff_notes
      for insert to authenticated with check (public.is_khg_staff());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname='public' and tablename='enterprise_handoff_notes' and policyname='dorsey_notes_staff_update'
  ) then
    create policy dorsey_notes_staff_update on public.enterprise_handoff_notes
      for update to authenticated
      using (public.is_khg_staff())
      with check (public.is_khg_staff());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname='public' and tablename='khg_managed_agent_handoffs' and policyname='dorsey_handoffs_staff_read'
  ) then
    create policy dorsey_handoffs_staff_read on public.khg_managed_agent_handoffs
      for select to authenticated using (public.is_khg_staff());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname='public' and tablename='khg_managed_agent_handoffs' and policyname='dorsey_handoffs_staff_insert'
  ) then
    create policy dorsey_handoffs_staff_insert on public.khg_managed_agent_handoffs
      for insert to authenticated with check (public.is_khg_staff());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname='public' and tablename='khg_managed_agent_handoffs' and policyname='dorsey_handoffs_staff_update'
  ) then
    create policy dorsey_handoffs_staff_update on public.khg_managed_agent_handoffs
      for update to authenticated
      using (public.is_khg_staff())
      with check (public.is_khg_staff());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname='public' and tablename='agent_health' and policyname='dorsey_agent_health_staff_read'
  ) then
    create policy dorsey_agent_health_staff_read on public.agent_health
      for select to authenticated using (public.is_khg_staff());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname='public' and tablename='agent_executions' and policyname='dorsey_agent_exec_staff_read'
  ) then
    create policy dorsey_agent_exec_staff_read on public.agent_executions
      for select to authenticated using (public.is_khg_staff());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname='public' and tablename='worker_dispatch_log' and policyname='dorsey_worker_dispatch_staff_read'
  ) then
    create policy dorsey_worker_dispatch_staff_read on public.worker_dispatch_log
      for select to authenticated using (public.is_khg_staff());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname='public' and tablename='worker_state' and policyname='dorsey_worker_state_admin_update'
  ) then
    create policy dorsey_worker_state_admin_update on public.worker_state
      for update to authenticated
      using (public.is_khg_admin())
      with check (public.is_khg_admin());
  end if;
end $$;
