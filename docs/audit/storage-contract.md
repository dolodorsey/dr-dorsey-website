# Storage contract

## `brand-graphics` live state

- Public bucket: yes
- File size limit: 50 MiB
- Allowed MIME types: PNG, JPEG, GIF, WebP, SVG, MP4, WebM, and PDF
- Public read policy: present
- Public-role insert policy: present, constrained only to `bucket_id = 'brand-graphics'`

The live bucket controls are stricter than the V2 handoff stated: size and MIME restrictions already exist. The remaining material issue is write authorization and path ownership. Any caller able to use the public project credential may attempt uploads under arbitrary paths in this bucket.

Recommended later change: authenticated/service-only writes, prefix-level ownership, collision-safe object names, and upload/download negative tests. Public reads may remain if required by the websites. PR0 makes no bucket or policy change.
