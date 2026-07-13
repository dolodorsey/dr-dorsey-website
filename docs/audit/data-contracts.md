# Data contracts

## Ops OS reads

| Resource | Relation |
|---|---|
| `home` | `khg_dashboard_cards` |
| `social` | `v_khg_social_command` |
| `social-accounts` | `khg_social_accounts` |
| `marketing` | `khg_marketing_calendar_items` |
| `approvals` | `khg_approval_requests` |
| `content-studio` | `khg_content_generation_requests` |
| `events` | `khg_event_rollouts` |
| `revenue` | `khg_revenue_opportunities` |
| `tasks` | `khg_work_queues` |

GET responses are shaped as `{ data }`, are limited to 200 rows, and accept an optional bearer token. Unknown resources return 400.

## Ops OS writes

POST requires a bearer token and delegates authorization to Supabase RLS. Operations are `social_program`, `marketing_create`, `creative_request`, `event_create`, `revenue_create`, and `task_create`. PATCH applies explicit field allowlists.

`social_program`, `marketing_create`, `creative_request`, and `event_create` span multiple database writes without a transaction or idempotency key. A mid-operation failure can leave partial records; remediation belongs in a later behavior-changing PR.

## Enterprise

Read resources map to `enterprise_projects`, `enterprise_dashboards`, `enterprise_command_centers`, `enterprise_approvals`, `security_audit_findings`, `ai_build_tasks`, `marketing_campaigns`, `marketing_content_queue`, `eventbrite_events`, `outreach_queue`, and `enterprise_audit_logs`.

Writes support `campaign`, `eventbrite_draft`, `ai_task`, and `outreach`; updates use per-resource field allowlists. Creation and the subsequent audit-log insert are separate writes, so audit failure does not roll back the created record.

## Environment contract

The application reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` on the server and exposes them through `/api/ops-os/config`. The anonymous key is a public client credential by design; authorization must therefore come from grants and RLS, not secrecy of the key.
