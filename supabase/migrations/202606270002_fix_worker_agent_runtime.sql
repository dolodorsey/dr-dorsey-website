create or replace function public.worker_auth_ok(p_key text)
returns boolean
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_hash text := encode(extensions.digest(coalesce(p_key, ''), 'sha256'), 'hex');
  v_ok boolean;
begin
  select true into v_ok
  from public.worker_api_keys
  where is_active and key_hash = v_hash
  limit 1;

  if coalesce(v_ok, false) then
    update public.worker_api_keys
    set last_used_at = now()
    where key_hash = v_hash;
  end if;

  return coalesce(v_ok, false);
end;
$$;

create or replace function public.worker_claim_sms(p_key text)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_row public.text_message_queue%rowtype;
begin
  perform public.worker_require_key(p_key);
  if public.worker_is_paused('sms_watcher_9609') then
    return null;
  end if;

  select * into v_row
  from public.text_message_queue
  where status = 'queued'
    and send_from = '9609'
    and queue_enabled = true
    and scheduled_at <= now()
  order by scheduled_at asc nulls first, created_at asc
  limit 1
  for update skip locked;

  if not found then
    return null;
  end if;

  update public.text_message_queue
  set status = 'sending'
  where id = v_row.id
  returning * into v_row;

  return to_jsonb(v_row);
end;
$$;

create or replace function public.worker_ping(p_worker text)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_id uuid;
begin
  if p_worker = 'sms_watcher_9609' then
    insert into public.text_message_queue
      (recipient_name, recipient_phone, message, status, scheduled_at, send_from, queue_enabled)
    values
      ('SELF-PING', '+14048199609', 'watcher ping ' || to_char(now(),'HH24:MI:SS'), 'queued', now(), '9609', true)
    returning id into v_id;
  elsif p_worker = 'ig_worker_dolodorsey' then
    insert into public.ig_direct_actions
      (action_type, brand_key, ig_account, target_handle, message_text, status, priority, scheduled_after, metadata)
    values
      ('send_dm', 'dr_dorsey', 'dolodorsey', 'dolodorsey', 'ig worker ping ' || to_char(now(),'HH24:MI:SS'), 'queued', 10, now(), jsonb_build_object('campaign','dashboard_ping'))
    returning id into v_id;
  elsif p_worker = 'ig_scraper_dolodorsey' then
    insert into public.ig_scrape_jobs_runtime
      (job_type, target_account, payload, status, results_table, requested_at)
    values
      ('scrape_recent_commenters', 'dolodorsey', jsonb_build_object('last_n_posts', 2, 'source', 'dashboard_ping'), 'queued', 'ig_post_commenters', now())
    returning id into v_id;
  else
    return jsonb_build_object('ok', false, 'err', 'unknown_worker');
  end if;

  return jsonb_build_object('ok', true, 'ping_id', v_id);
end;
$$;

create or replace view public.v_worker_health as
select
  'sms_watcher_9609'::text as worker,
  'watcher_9609 · +14048199609'::text as label,
  exists (
    select 1 from public.text_message_queue
    where sent_at >= now() - interval '15 minutes' and send_from = '9609'
  ) as is_alive,
  (select max(sent_at) from public.text_message_queue where send_from = '9609') as last_action_at,
  (select count(*)::int from public.text_message_queue where status = 'queued' and send_from = '9609') as queue_depth,
  (select count(*)::int from public.text_message_queue where status = 'sent' and sent_at >= current_date and send_from = '9609') as sent_today,
  (select count(*)::int from public.text_message_queue where status = 'failed' and created_at >= now() - interval '24 hours' and send_from = '9609') as failed_24h,
  coalesce((select is_paused from public.worker_state where worker = 'sms_watcher_9609'), false) as is_paused
union all
select
  'ig_worker_dolodorsey'::text as worker,
  'khg_ig_worker · @dolodorsey'::text as label,
  coalesce((
    select is_active and not is_flagged and last_action_at >= now() - interval '30 minutes'
    from public.ig_worker_credentials
    where brand_key = 'dr_dorsey'
    limit 1
  ), false) as is_alive,
  (select last_action_at from public.ig_worker_credentials where brand_key = 'dr_dorsey' limit 1) as last_action_at,
  (select count(*)::int from public.ig_direct_actions where brand_key = 'dr_dorsey' and status = 'queued') as queue_depth,
  (select count(*)::int from public.ig_direct_actions where brand_key = 'dr_dorsey' and status = 'completed' and completed_at >= current_date) as sent_today,
  (select count(*)::int from public.ig_direct_actions where brand_key = 'dr_dorsey' and status = 'failed' and created_at >= now() - interval '24 hours') as failed_24h,
  coalesce((select is_paused from public.worker_state where worker = 'ig_worker_dolodorsey'), false) as is_paused
union all
select
  'ig_scraper_dolodorsey'::text as worker,
  'ig_scraper · @dolodorsey'::text as label,
  exists (
    select 1 from public.ig_scrape_jobs_runtime
    where status = 'completed' and completed_at >= now() - interval '30 minutes'
  ) as is_alive,
  (select max(completed_at) from public.ig_scrape_jobs_runtime) as last_action_at,
  (select count(*)::int from public.ig_scrape_jobs_runtime where status = 'queued') as queue_depth,
  (select coalesce(sum(results_count), 0)::int from public.ig_scrape_jobs_runtime where status = 'completed' and completed_at >= current_date) as sent_today,
  (select count(*)::int from public.ig_scrape_jobs_runtime where status = 'failed' and requested_at >= now() - interval '24 hours') as failed_24h,
  coalesce((select is_paused from public.worker_state where worker = 'ig_scraper_dolodorsey'), false) as is_paused;

notify pgrst, 'reload schema';
