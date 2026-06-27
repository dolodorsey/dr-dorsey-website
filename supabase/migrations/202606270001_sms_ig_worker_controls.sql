create table if not exists public.worker_state (
  worker text primary key,
  is_paused boolean not null default false,
  paused_at timestamptz,
  paused_reason text,
  updated_at timestamptz not null default now()
);

insert into public.worker_state (worker)
values ('sms_watcher_9609'), ('ig_worker_dolodorsey'), ('ig_scraper_dolodorsey')
on conflict (worker) do nothing;

alter table public.worker_state enable row level security;
grant select on public.worker_state to anon, authenticated;
grant insert, update, delete on public.worker_state to authenticated;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='worker_state' and policyname='worker_state public read') then
    create policy "worker_state public read" on public.worker_state for select to anon, authenticated using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='worker_state' and policyname='worker_state authenticated write') then
    create policy "worker_state authenticated write" on public.worker_state for all to authenticated using (true) with check (true);
  end if;
end $$;

create or replace view public.v_worker_health as
select
  'sms_watcher_9609'::text as worker,
  'watcher_9609 · +14048199609'::text as label,
  exists (select 1 from public.text_message_queue where sent_at >= now() - interval '15 minutes' and send_from = '+14048199609') as is_alive,
  (select max(sent_at) from public.text_message_queue where send_from = '+14048199609') as last_action_at,
  (select count(*)::int from public.text_message_queue where status = 'queued' and send_from = '+14048199609') as queue_depth,
  (select count(*)::int from public.text_message_queue where status = 'sent' and sent_at >= current_date and send_from = '+14048199609') as sent_today,
  (select count(*)::int from public.text_message_queue where status = 'failed' and created_at >= now() - interval '24 hours' and send_from = '+14048199609') as failed_24h,
  coalesce((select is_paused from public.worker_state where worker='sms_watcher_9609'), false) as is_paused
union all
select
  'ig_worker_dolodorsey'::text,
  'khg_ig_worker · @dolodorsey'::text,
  coalesce((select is_active and not is_flagged and last_action_at >= now() - interval '30 minutes' from public.ig_worker_credentials where brand_key='dr_dorsey' limit 1), false),
  (select last_action_at from public.ig_worker_credentials where brand_key='dr_dorsey' limit 1),
  (select count(*)::int from public.ig_direct_actions where brand_key='dr_dorsey' and status='queued'),
  (select count(*)::int from public.ig_direct_actions where brand_key='dr_dorsey' and status='completed' and completed_at >= current_date),
  (select count(*)::int from public.ig_direct_actions where brand_key='dr_dorsey' and status='failed' and created_at >= now() - interval '24 hours'),
  coalesce((select is_paused from public.worker_state where worker='ig_worker_dolodorsey'), false)
union all
select
  'ig_scraper_dolodorsey'::text,
  'ig_scraper · @dolodorsey'::text,
  exists (select 1 from public.ig_scrape_jobs_runtime where status='completed' and completed_at >= now() - interval '30 minutes'),
  (select max(completed_at) from public.ig_scrape_jobs_runtime),
  (select count(*)::int from public.ig_scrape_jobs_runtime where status='queued'),
  (select coalesce(sum(results_count),0)::int from public.ig_scrape_jobs_runtime where status='completed' and completed_at >= current_date),
  (select count(*)::int from public.ig_scrape_jobs_runtime where status='failed' and requested_at >= now() - interval '24 hours'),
  coalesce((select is_paused from public.worker_state where worker='ig_scraper_dolodorsey'), false);

grant select on public.v_worker_health to anon, authenticated;

create or replace view public.v_worker_errors_recent as
select 'sms'::text as worker, id::text, created_at, error_message as err, recipient_phone as context
from public.text_message_queue
where status='failed' and created_at >= now() - interval '24 hours'
union all
select 'ig'::text, id::text, created_at, error_message, target_handle
from public.ig_direct_actions
where status='failed' and brand_key='dr_dorsey' and created_at >= now() - interval '24 hours'
union all
select 'ig_scraper'::text, id::text, requested_at as created_at, error, target_account
from public.ig_scrape_jobs_runtime
where status='failed' and requested_at >= now() - interval '24 hours'
order by created_at desc
limit 50;

grant select on public.v_worker_errors_recent to anon, authenticated;

create or replace function public.worker_ping(p_worker text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare v_id uuid;
begin
  if p_worker = 'sms_watcher_9609' then
    insert into public.text_message_queue (recipient_name, recipient_phone, message, status, scheduled_at, send_from, queue_enabled)
    values ('SELF-PING', '+14048199609', 'watcher ping ' || to_char(now(),'HH24:MI:SS'), 'queued', now(), '+14048199609', true)
    returning id into v_id;
  elsif p_worker = 'ig_worker_dolodorsey' then
    insert into public.ig_direct_actions (action_type, brand_key, ig_account, target_handle, message_text, status, priority, scheduled_after, metadata)
    values ('send_dm', 'dr_dorsey', 'dolodorsey', 'dolodorsey', 'ig worker ping ' || to_char(now(),'HH24:MI:SS'), 'queued', 10, now(), jsonb_build_object('campaign','dashboard_ping'))
    returning id into v_id;
  elsif p_worker = 'ig_scraper_dolodorsey' then
    insert into public.ig_scrape_jobs_runtime (job_type, target_account, payload, status, results_table, requested_at)
    values ('scrape_recent_commenters', 'dolodorsey', jsonb_build_object('last_n_posts', 2, 'source', 'dashboard_ping'), 'queued', 'ig_post_commenters', now())
    returning id into v_id;
  else
    return jsonb_build_object('ok', false, 'err', 'unknown_worker');
  end if;
  return jsonb_build_object('ok', true, 'ping_id', v_id);
end $$;

create or replace function public.worker_pause(p_worker text, p_reason text default 'manual')
returns jsonb language plpgsql security definer set search_path = public as $$
begin
  insert into public.worker_state(worker, is_paused, paused_at, paused_reason, updated_at)
  values (p_worker, true, now(), p_reason, now())
  on conflict (worker) do update set is_paused=true, paused_at=excluded.paused_at, paused_reason=excluded.paused_reason, updated_at=now();
  return jsonb_build_object('ok', true);
end $$;

create or replace function public.worker_resume(p_worker text)
returns jsonb language plpgsql security definer set search_path = public as $$
begin
  insert into public.worker_state(worker, is_paused, updated_at)
  values (p_worker, false, now())
  on conflict (worker) do update set is_paused=false, paused_at=null, paused_reason=null, updated_at=now();
  return jsonb_build_object('ok', true);
end $$;

revoke execute on function public.worker_ping(text) from anon;
revoke execute on function public.worker_pause(text, text) from anon;
revoke execute on function public.worker_resume(text) from anon;
grant execute on function public.worker_ping(text) to authenticated;
grant execute on function public.worker_pause(text, text) to authenticated;
grant execute on function public.worker_resume(text) to authenticated;
