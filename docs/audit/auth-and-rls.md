# Authentication and RLS audit

## Current application flow

Ops and Enterprise clients store a Supabase access token in browser local storage and attach it as `Authorization: Bearer ...`. Mutation APIs reject a missing bearer token; read APIs generally permit anonymous access. The server creates a Supabase client using the public URL/anonymous key and forwards a supplied user token when present.

## Live findings (2026-07-13)

- Anonymous `SELECT` policies with unconditional `true` exist on core Ops relations including dashboard cards, social accounts, approvals, content, marketing calendar items, event rollouts, revenue opportunities, and work queues.
- Authenticated write policies use `ALL`, `USING (true)`, and `WITH CHECK (true)` on the inspected Ops tables. Any authenticated user therefore has broad row access unless another application-level control intervenes.
- Targeted anonymous REST checks succeeded for these relations. Several administrative-looking datasets elsewhere in the shared project also returned rows anonymously, including directives and website registry/build-spec records.
- Worker RPCs are executable by `anon`, `authenticated`, and `service_role`. Most are `SECURITY DEFINER`; their internal worker-key check is the effective authorization boundary.

## Risk and required follow-up

This is a shared Supabase project, so changes must be scoped and tested against every consumer. A later security PR should define roles/claims, make private Ops reads authenticated, replace unconditional writes with tenant/role checks, revoke anonymous worker RPC execution where compatibility permits, rotate/scoped worker keys, and add negative authorization tests.

No grants, policies, functions, keys, or data were changed in PR0.
