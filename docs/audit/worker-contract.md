# Worker compatibility contract

## Adapter actions

| Action | RPC |
|---|---|
| `claim_sms` | `worker_claim_sms` |
| `finish_sms` | `worker_finish_sms` |
| `claim_ig_dm` | `worker_claim_ig_dm` |
| `finish_ig_dm` | `worker_finish_ig_dm` |
| `claim_ig_scrape` | `worker_claim_ig_scrape` |
| `finish_ig_scrape` | `worker_finish_ig_scrape` |
| `insert_ig_commenters` | `worker_insert_ig_commenters` |
| `insert_ig_likers` | `worker_insert_ig_likers` |
| `insert_ig_inbound` | `worker_insert_ig_inbound` |
| `get_ig_creds` | `worker_get_ig_creds` |

The adapter requires a worker key in the JSON body. Invalid actions fail with 400. Baseline contract tests lock these action/RPC names so a future security migration cannot silently break deployed workers.

## Control surface

`/api/ops-os/workers` reads `v_worker_health` and `v_worker_errors_recent`. POST requires a user bearer token and only accepts workers `sms_watcher_9609`, `ig_worker_dolodorsey`, and `ig_scraper_dolodorsey`, with actions `ping`, `pause`, or `resume`.

## Live database notes

Seventeen `worker_*` functions were inventoried. Most are `SECURITY DEFINER`; `worker_heartbeat` is not. The inspected functions grant execute to anonymous, authenticated, and service roles. Future hardening must preserve parameter shapes and deployed worker behavior while narrowing execution and credential scope.
