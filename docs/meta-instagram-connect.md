# Meta Instagram Connect Setup — @dolodorsey

## Goal

Connect `@dolodorsey` through the official Meta path for approved publishing, comment/insight access, and reporting.

## Owner private-message policy

**Private messages are owner-managed.**

For `@dolodorsey`:

- Do not send automated DMs.
- Do not send automated DM replies.
- Do not run keyword-DM automations.
- Do not run comment-to-DM automations.
- Do not poll/read the Instagram inbox through the social worker.
- Do not route private messages to an AI/CRM response agent.

Dr. Dorsey handles the Instagram inbox personally.

This is enforced in Supabase by the `dorsey_social_policy` record and database triggers, not just by operator instructions.

## Live Start Function

```text
https://dzlmtvodpyhetvektfuo.supabase.co/functions/v1/meta-social-connect-start
```

For `@dolodorsey`, call it with the account identity so the function applies the owner-manual DM policy:

```text
https://dzlmtvodpyhetvektfuo.supabase.co/functions/v1/meta-social-connect-start?brand_slug=dr_dorsey&account_identifier=dolodorsey
```

## Dolo Meta scopes

The Dolo connection intentionally excludes `instagram_manage_messages`.

Expected Dolo scopes:

```text
instagram_basic
instagram_content_publish
instagram_manage_comments
pages_show_list
pages_read_engagement
business_management
```

Other brand connections may have different approved permissions. Do not copy Dolo's connection policy onto another brand automatically.

## Supabase Edge Function Secrets

The Meta connection stack depends on the server-side Meta app configuration already used by the canonical connection flow, including the Meta app ID and OAuth redirect configuration.

Canonical callback:

```text
https://dzlmtvodpyhetvektfuo.supabase.co/functions/v1/meta-social-connect-callback
```

## Meta App Requirements

`@dolodorsey` should be a professional Instagram profile connected to the correct Facebook Page in Meta Business tools.

The Meta app must allow the canonical callback URI.

## Current implementation

Completed:

- Official Meta OAuth start function.
- Dolo-specific OAuth scope policy that omits `instagram_manage_messages`.
- Dolo private-message policy stored in Supabase.
- Dolo auto-reply rules disabled.
- Dolo DM keyword routes disabled.
- Database triggers block future `send_dm`, `reply_dm`, engagement-queue DM, and Dolo `dm_batch` actions.
- Social inbound poller skips `@dolodorsey` messages even if an older credential still carries message permission.
- Approved publishing/comment/analytics paths remain separate from private messaging.

## Operator rule

Use automation for content organization, approved publishing, attribution, analytics, and engagement recommendations.

Do not automate `@dolodorsey` private conversations.

Last audited: September 24, 2026.
