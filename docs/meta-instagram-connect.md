# Meta Instagram Connect Setup

## Goal

Connect `@dolodorsey` through the official Meta path so Ops OS can stop relying only on worker/session status.

## Live Start Function

```text
https://dzlmtvodpyhetvektfuo.supabase.co/functions/v1/meta-social-connect-start
```

## Supabase Edge Function Secrets Needed

Add these to Supabase Edge Function secrets:

```text
META_APP_ID
META_APP_SECRET
META_REDIRECT_URI
META_SCOPES
```

Recommended redirect URI:

```text
https://dzlmtvodpyhetvektfuo.supabase.co/functions/v1/meta-social-connect-callback
```

Default scopes used by the start function:

```text
pages_show_list,pages_read_engagement,instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_messages
```

## Meta App Requirements

`@dolodorsey` should be a professional Instagram profile connected to a Facebook Page in Meta Business tools.

The Meta app should allow the redirect URI above.

## Current Implementation Status

Completed:

- Supabase tables for Meta connect state and profile records.
- Start function: `meta-social-connect-start`.
- Ops OS button: `Connect Instagram Through Meta` on `/os/ig-sessions`.

Still required:

- Add Meta app settings as Supabase Edge Function secrets.
- Complete secure callback exchange/worker storage after secrets are available.
- Recheck `@dolodorsey` and then queue a controlled test.
