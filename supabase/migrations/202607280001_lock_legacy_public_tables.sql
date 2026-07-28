-- Legacy action tables are server-operated and must not be reachable with a
-- browser key. Service-role access continues to bypass RLS.
alter table public.khg_team_contacts enable row level security;
alter table public.khg_team_reminders enable row level security;
alter table public.khg_revenue_actions enable row level security;
alter table public.khg_build_actions enable row level security;
alter table public.khg_brand_actions enable row level security;
alter table public.khg_connection_actions enable row level security;

revoke all on table public.khg_team_contacts from anon, authenticated;
revoke all on table public.khg_team_reminders from anon, authenticated;
revoke all on table public.khg_revenue_actions from anon, authenticated;
revoke all on table public.khg_build_actions from anon, authenticated;
revoke all on table public.khg_brand_actions from anon, authenticated;
revoke all on table public.khg_connection_actions from anon, authenticated;

-- Drive links contain operational records. Remove the permissive public policy
-- and keep access on trusted server routes.
drop policy if exists khg_drive_links_service_all on public.khg_drive_links;
revoke all on table public.khg_drive_links from anon, authenticated;

-- Pin function name resolution so an attacker cannot shadow referenced
-- objects through a mutable search path.
alter function sec.has_brand(text)
  set search_path = sec, core, public, pg_temp;
alter function ops.audit_trigger()
  set search_path = ops, sec, core, public, pg_temp;
alter function util.tag_entity(text, uuid, text, text)
  set search_path = util, sec, core, public, pg_temp;
alter function sec.current_user_row()
  set search_path = sec, core, public, pg_temp;
alter function public.exec_sql(text)
  set search_path = public, pg_temp;
