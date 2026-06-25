-- Additive Enterprise Command Center layer.
-- Rollback: drop only the enterprise_* / security_* / marketing_* /
-- eventbrite_* / outreach_* / ai_* objects created by this migration.

create extension if not exists pgcrypto;

create table if not exists public.enterprise_projects (
  id uuid primary key default gen_random_uuid(),
  project_name text not null unique,
  project_ref text,
  purpose text,
  status text not null default 'active',
  risk_level text not null default 'unknown',
  owner text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enterprise_dashboards (
  id uuid primary key default gen_random_uuid(),
  dashboard_name text not null,
  route_path text not null unique,
  owning_division text,
  owning_brand text,
  source_project_id text,
  status text not null default 'active',
  overwrite_protected boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enterprise_command_centers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  purpose text,
  division text,
  brand_name text,
  route_path text not null,
  priority text not null default 'normal',
  status text not null default 'planned',
  owner text,
  source_projects text[] default '{}'::text[],
  widgets jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enterprise_approvals (
  id uuid primary key default gen_random_uuid(),
  request_type text not null,
  title text not null,
  division text,
  brand_name text,
  requested_by text,
  assigned_to text,
  approval_status text not null default 'pending',
  priority text not null default 'normal',
  target_type text,
  target_id text,
  payload_snapshot jsonb not null default '{}'::jsonb,
  decision_notes text,
  approved_at timestamptz,
  rejected_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enterprise_audit_logs (
  id uuid primary key default gen_random_uuid(),
  action_type text not null,
  actor_id text,
  actor_name text,
  target_type text,
  target_id text,
  status text not null default 'logged',
  payload_snapshot jsonb not null default '{}'::jsonb,
  error_message text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.security_audit_findings (
  id uuid primary key default gen_random_uuid(),
  project_name text,
  project_id text,
  finding_type text not null,
  severity text not null default 'medium',
  title text not null,
  description text,
  affected_schema text,
  affected_table text,
  remediation_sql text,
  remediation_status text not null default 'needs_review',
  reviewed_by text,
  reviewed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ai_build_tasks (
  id uuid primary key default gen_random_uuid(),
  task_title text not null,
  task_type text not null default 'build',
  assigned_agent text default 'codex',
  division text,
  brand_name text,
  status text not null default 'draft',
  priority text not null default 'normal',
  repo_url text,
  branch_name text,
  description text,
  acceptance_criteria jsonb not null default '[]'::jsonb,
  required_env_vars text[] default '{}'::text[],
  risk_notes text,
  result_notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.marketing_campaigns (
  id uuid primary key default gen_random_uuid(),
  campaign_name text not null,
  division text,
  brand_name text,
  primary_account text,
  campaign_type text,
  objective text,
  start_date date,
  end_date date,
  primary_cta text,
  status text not null default 'draft',
  priority text not null default 'normal',
  owner text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.marketing_content_queue (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references public.marketing_campaigns(id) on delete set null,
  division text,
  brand_name text,
  account_handle text,
  platform text not null default 'instagram',
  content_type text not null,
  scheduled_for timestamptz,
  caption text,
  asset_url text,
  cta text,
  approval_status text not null default 'draft',
  publish_status text not null default 'not_scheduled',
  owner text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.eventbrite_events (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references public.marketing_campaigns(id) on delete set null,
  division text,
  brand_name text,
  event_name text not null,
  venue_name text,
  venue_address text,
  starts_at timestamptz,
  ends_at timestamptz,
  eventbrite_event_id text,
  eventbrite_url text,
  flyer_url text,
  approval_status text not null default 'draft',
  publish_status text not null default 'not_published',
  payload_preview jsonb not null default '{}'::jsonb,
  last_sync_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.outreach_queue (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references public.marketing_campaigns(id) on delete set null,
  division text,
  brand_name text,
  platform text,
  target_handle text,
  target_name text,
  segment text,
  message_script text,
  assigned_to text,
  outreach_status text not null default 'queued',
  response_status text,
  next_follow_up_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$
declare
  t text;
  names text[] := array[
    'enterprise_projects','enterprise_dashboards','enterprise_command_centers',
    'enterprise_approvals','enterprise_audit_logs','security_audit_findings',
    'ai_build_tasks','marketing_campaigns','marketing_content_queue',
    'eventbrite_events','outreach_queue'
  ];
begin
  foreach t in array names loop
    execute format('alter table public.%I enable row level security', t);
    execute format('grant select on public.%I to anon, authenticated', t);
    execute format('revoke insert, update, delete on public.%I from anon', t);
    execute format('grant insert, update, delete on public.%I to authenticated', t);
    execute format('drop policy if exists "enterprise public read %s" on public.%I', t, t);
    execute format('drop policy if exists "enterprise authenticated write %s" on public.%I', t, t);
    execute format('create policy "enterprise public read %s" on public.%I for select to anon, authenticated using (true)', t, t);
    execute format('create policy "enterprise authenticated write %s" on public.%I for all to authenticated using (true) with check (true)', t, t);
  end loop;
end $$;

insert into public.enterprise_projects (project_name, project_ref, purpose, risk_level, owner)
values
  ('MCP Gateway','dzlmtvodpyhetvektfuo','Ops OS and enterprise registry','low','Enterprise Ops'),
  ('KOLLECTIVE BOH',null,'Enterprise parent operations','review','Operations'),
  ('GOOD TIMES',null,'City intelligence and concierge','high','Good Times'),
  ('Casper Universe',null,'Loyalty, rewards and QR','high','Casper'),
  ('the Casper Group',null,'Hospitality operations','medium','Casper Group'),
  ('SOS / HELP 911',null,'Mission control and service delivery','high','HELP 911'),
  ('DR. DORSEY VAULT',null,'Consulting, courses and executive IP','unknown','Dr. Dorsey'),
  ('Kollective Creative Engine',null,'Enterprise creative production','unknown','Creative')
on conflict (project_name) do update set purpose=excluded.purpose, risk_level=excluded.risk_level, owner=excluded.owner, updated_at=now();

insert into public.enterprise_dashboards (dashboard_name, route_path, owning_division, source_project_id)
values
  ('KHG Ops OS','/ops-os','Operations','MCP Gateway'),
  ('Social Media Command','/ops-os/social','Marketing','MCP Gateway'),
  ('Marketing Command','/ops-os/marketing','Marketing','MCP Gateway'),
  ('Approvals Command','/ops-os/approvals','Executive','MCP Gateway'),
  ('Content Studio','/ops-os/content-studio','Creative','MCP Gateway'),
  ('Events Command','/ops-os/events','Events','MCP Gateway'),
  ('Revenue Command','/ops-os/revenue','Revenue','MCP Gateway'),
  ('Task Command','/ops-os/tasks','Operations','MCP Gateway'),
  ('Codex Command','/ops-os/codex','Technology','MCP Gateway')
on conflict (route_path) do update set dashboard_name=excluded.dashboard_name, owning_division=excluded.owning_division, source_project_id=excluded.source_project_id, updated_at=now();

insert into public.enterprise_command_centers (name, slug, purpose, division, route_path, priority, status, source_projects, widgets)
values
  ('Executive Command Center','executive','Empire-wide priorities, approvals, revenue and alerts','Executive','/enterprise/command-centers/executive','critical','active',array['MCP Gateway','KOLLECTIVE BOH'],'["priorities","approvals","revenue","alerts","ai_builds"]'),
  ('Marketing Command Center','marketing','Campaigns, content, email and human-assisted outreach','Marketing','/enterprise/command-centers/marketing','critical','active',array['MCP Gateway','KOLLECTIVE BOH'],'["calendar","content_queue","email","outreach","reports"]'),
  ('Eventbrite / Ticketing','eventbrite','Draft events, tickets, approvals and attendee sync','Events','/enterprise/command-centers/eventbrite','critical','active',array['MCP Gateway'],'["drafts","tickets","payload_preview","approval_gate"]'),
  ('Events / Nightlife','events-nightlife','Run of show, talent, vendors and recaps','Events','/enterprise/command-centers/events-nightlife','high','active',array['MCP Gateway','KOLLECTIVE BOH'],'["events","staffing","vendors","recaps"]'),
  ('Creative Engine','creative','Creative requests, revisions and delivery','Creative','/enterprise/command-centers/creative','high','active',array['Kollective Creative Engine','MCP Gateway'],'["requests","assets","revisions","delivery"]'),
  ('CRM / Revenue Pipeline','crm','Leads, consultations, sponsors and collections','Revenue','/enterprise/command-centers/crm','high','active',array['KOLLECTIVE BOH','MCP Gateway'],'["pipeline","followups","offers","collections"]'),
  ('Outreach Command Center','outreach','Target lists and human-assisted outreach','Marketing','/enterprise/command-centers/outreach','high','active',array['KOLLECTIVE BOH'],'["targets","scripts","assignments","responses"]'),
  ('Sponsorships / Partnerships','sponsorships','Sponsor prospects, contracts and deliverables','Revenue','/enterprise/command-centers/sponsorships','high','planned',array['KOLLECTIVE BOH'],'["prospects","packages","contracts","deliverables"]'),
  ('Vendor Command Center','vendors','Vendor applications, fees and setup','Operations','/enterprise/command-centers/vendors','normal','planned',array['KOLLECTIVE BOH','the Casper Group'],'["applications","fees","permits","setup"]'),
  ('Finance / P&L','finance','Revenue, costs, labor, AR/AP and profit','Finance','/enterprise/command-centers/finance','high','planned',array['KOLLECTIVE BOH','the Casper Group'],'["revenue","cogs","labor","profit"]'),
  ('Operations / BOH','operations','Tasks, SOPs, incidents, inventory and equipment','Operations','/enterprise/command-centers/operations','high','active',array['the Casper Group','KOLLECTIVE BOH'],'["tasks","incidents","sops","inventory"]'),
  ('Staffing / HR','staffing','Roles, onboarding, training and schedules','People','/enterprise/command-centers/staffing','normal','planned',array['the Casper Group','KOLLECTIVE BOH'],'["roles","training","schedules","timeclock"]'),
  ('HELP 911 Mission Control','help911','Mission queue, heroes, proof and disputes','HELP 911','/enterprise/command-centers/help911','critical','review',array['SOS / HELP 911','KOLLECTIVE BOH'],'["missions","heroes","payments","proof","safety"]'),
  ('GOOD TIMES City Intelligence','good-times','Cities, venues, concierge and bookings','GOOD TIMES','/enterprise/command-centers/good-times','high','review',array['GOOD TIMES'],'["cities","venues","experiences","concierge"]'),
  ('Casper Command Center','casper','Executive rollup for Casper brands and locations','Casper','/enterprise/command-centers/casper','high','active',array['the Casper Group','Casper Universe'],'["brands","locations","tickets","inventory"]'),
  ('Sole Exchange','sole-exchange','Sneaker donations, cleaning and impact','Impact','/enterprise/command-centers/sole-exchange','normal','planned',array['KOLLECTIVE BOH'],'["events","donations","distribution","impact"]'),
  ('Product / Commerce','products','Products, drops, orders and fulfillment','Commerce','/enterprise/command-centers/products','normal','planned',array['KOLLECTIVE BOH'],'["products","orders","inventory","fulfillment"]'),
  ('Consultation / Course','consultations','Leads, sessions, courses and payments','Dr. Dorsey','/enterprise/command-centers/consultations','high','planned',array['DR. DORSEY VAULT'],'["leads","clients","sessions","courses"]'),
  ('AI Agents / Codex','ai','AI tasks, builds, deployments and failures','Technology','/enterprise/command-centers/ai','critical','active',array['MCP Gateway','KOLLECTIVE BOH'],'["tasks","builds","deployments","failures"]'),
  ('Security / Compliance','security','RLS, credentials, webhooks, users and audits','Security','/enterprise/command-centers/security','critical','active',array['MCP Gateway','KOLLECTIVE BOH','GOOD TIMES','SOS / HELP 911'],'["rls","api_keys","webhooks","users","advisories"]')
on conflict (slug) do update set name=excluded.name, purpose=excluded.purpose, division=excluded.division, route_path=excluded.route_path, priority=excluded.priority, status=excluded.status, source_projects=excluded.source_projects, widgets=excluded.widgets, updated_at=now();

insert into public.security_audit_findings (project_name, finding_type, severity, title, description, affected_table)
values
  ('the Casper Group','rls_disabled','high','RLS disabled on activity_logs','Review access patterns before exposing the table.','activity_logs'),
  ('GOOD TIMES','rls_disabled','high','RLS review required on event sync and source tables','event_sync_logs, source_posts, and sources require policy review.','event_sync_logs'),
  ('Casper Universe','rls_review','high','Multiple loyalty tables need RLS review','Complete a project-wide policy audit before public expansion.',null),
  ('SOS / HELP 911','rls_review','critical','Operational mission tables need RLS review','Mission, payment, proof, dispute, and safety data require strict ownership policies.',null)
on conflict do nothing;
