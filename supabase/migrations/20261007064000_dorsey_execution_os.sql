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
    select 1 from pg_policies where schemaname='public' and tablename='khg_dorsey_execution_audit' and policyname='dorsey_audit_staff_read'
  ) then
    create policy dorsey_audit_staff_read on public.khg_dorsey_execution_audit
      for select to authenticated using (public.is_khg_staff());
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='khg_dorsey_execution_audit' and policyname='dorsey_audit_staff_insert'
  ) then
    create policy dorsey_audit_staff_insert on public.khg_dorsey_execution_audit
      for insert to authenticated with check (public.is_khg_staff() and entity_key in ('dr-dorsey','dr_dorsey','dorsey','the-kollective','the_kollective','kollective'));
  end if;
end $$;

-- Handoffs and enterprise notes are internal control-plane records. The app uses
-- the signed-in staff JWT; no service-role key i...[truncated]