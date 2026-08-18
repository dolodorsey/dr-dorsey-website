---
name: contact-enrichment
description: Continuously improve reachability of existing Kollective enterprise contact records by finding, validating, and storing missing professional phone numbers and/or email addresses from trusted internal and public sources. This skill does not generate new leads or trigger outreach.
version: 1.0.0
owner: Data / Intelligence
status: active
---

# Contact Enrichment

## Mission

Turn existing Kollective contact records into reachable records by filling missing professional email addresses and/or phone numbers with verifiable evidence.

The skill operates only on contacts already present in Kollective data systems. It does not create new prospects, assign people to marketing campaigns, send messages, or infer private personal contact information.

## Primary Outcomes

For every eligible existing record, improve one or more of these fields:

- professional email
- public business phone or verified direct professional phone
- verification status
- confidence score
- source/provenance
- last verified date

Success is measured by:

1. percentage of existing usable records with at least one verified contact method;
2. percentage with both verified email and phone;
3. verified-email rate;
4. verified-phone rate;
5. enrichment yield per 100 records;
6. false-positive / rollback rate;
7. duplicate research avoided through canonical identity matching.

## Hard Scope

### Do

- enrich records that already exist;
- search internal Kollective/Supabase sources first;
- find missing professional/public email and phone data;
- validate results before writing them;
- preserve the strongest known value;
- record where every value came from;
- retry unresolved records on a controlled cadence;
- merge enrichment across duplicate representations of the same identity;
- write back to the canonical intelligence layer and original source when safe.

### Do Not

- generate new leads;
- scrape random people solely to expand the database;
- send email, SMS, DMs, calls, newsletters, onboarding, discounts, or outreach;
- guess an email pattern and store it as verified;
- overwrite a verified value with a weaker one;
- treat a personal/free email domain as proof of employer or business affiliation;
- use geography alone to infer a business relationship;
- hunt for non-public private phone numbers or personal email addresses;
- bypass suppression, consent, privacy, or compliance controls;
- expose secret/API credentials in logs or outputs.

## Eligibility

A record is eligible when it already exists in an approved Kollective data source and at least one of the following is true:

- email is missing;
- phone is missing;
- both are missing;
- the existing contact method is stale or unverified;
- the record has conflicting contact values that need resolution.

Priority order:

1. missing both phone and email;
2. missing email;
3. missing phone;
4. stale/unverified contact methods;
5. conflicting duplicate contact methods.

Within each priority, prefer active business relationships, providers, sponsors, curators, vendors, ambassadors, partners, grant contacts, event stakeholders, and other operationally useful records before dormant low-context records.

## Canonical Identity

Before research, resolve the record to a canonical identity using available exact identifiers:

1. normalized email;
2. normalized phone;
3. verified social handle;
4. exact source identity / source record mapping;
5. exact name + company only when corroborated by another field.

Never merge records based only on a common name.

If multiple existing records resolve to one identity, enrich once and propagate only verified values to the canonical overlay and compatible source records.

## Source Priority

Search in this order and stop when sufficiently verified evidence is obtained.

### Tier 0 — Existing internal evidence

Search all relevant approved Supabase datasets first, including canonical contact intelligence, source records, customers, providers, sponsors, ambassadors, form submissions, site leads, outreach records, CRM records, event records, Good Times partner/venue records, Frequency sales records, HELP 911 professional partner records, grant contacts, supplier directories, team records, and prior enrichment outputs.

If a verified value already exists elsewhere for the same canonical identity, reuse it and cite the internal source instead of researching externally.

### Tier 1 — Official organization sources

Prefer:

- official company or organization website;
- official contact page;
- official team/staff page;
- official booking, vendor, press, partnership, or support page;
- official organization profile that publishes contact information.

### Tier 2 — Trusted professional/public sources

Use reputable professional/business directories or public organization listings when the identity and organization match are clear.

### Tier 3 — Search discovery

Use web/search only to locate a likely official or trusted source. Search results themselves are not sufficient evidence when a stronger source can be opened.

## Email Discovery Rules

Preference order:

1. directly published professional email tied to the person;
2. directly published role email tied to the relevant function;
3. directly published generic business email when no direct email exists;
4. verified email already present in another internal record.

Never store a guessed email pattern as verified.

An inferred address may be stored only as a candidate in evidence metadata, never as the canonical email, unless independently verified by a reliable source or verification mechanism.

### Email Confidence

- 1.00 — exact email published on official organization source for the person/role;
- 0.95 — exact email confirmed by official organization source and matching identity;
- 0.90 — exact email corroborated by two strong independent professional sources;
- 0.80 — generic official organization email appropriate for business contact;
- below 0.80 — candidate only; do not promote to canonical verified email.

## Phone Discovery Rules

Preference order:

1. directly published professional/direct business phone for the person;
2. official department/role phone;
3. official organization main line when direct contact is unavailable;
4. verified phone already present in another internal record.

Do not seek or store private personal phone numbers that are not clearly public/professional.

### Phone Confidence

- 1.00 — direct professional number published by official organization/person business source;
- 0.95 — official department/role number clearly connected to the contact;
- 0.90 — exact number corroborated by two strong business sources;
- 0.85 — official organization main line;
- below 0.85 — candidate only; do not promote to canonical verified phone.

## Verification

Before promotion, verify:

- identity match;
- organization/business match where applicable;
- source is reachable and not obviously stale;
- value format is valid;
- value is not a known placeholder/test value;
- value does not conflict with a stronger verified record;
- value does not come from a blocked/private source;
- the same source is not being mistaken for evidence across multiple copied directories.

For business domains, do not treat `.edu`, `.gov`, `.mil`, free/personal mail providers, disposable mail providers, or example/test domains as business-affiliation proof unless there is independent organization evidence.

## Writeback Contract

Every promoted value must store:

- canonical contact key;
- source table and source row id;
- found value;
- value type: `email` or `phone`;
- verification status;
- confidence;
- source type;
- source URL or internal source reference;
- date verified;
- enrichment method;
- worker/skill version;
- previous value, if replaced;
- reason for replacement.

Rules:

- never overwrite a stronger verified value;
- preserve historical values in the audit trail;
- update original source only when the source schema supports safe writeback;
- otherwise store the result in the canonical enrichment/intelligence overlay;
- keep marketing eligibility unchanged;
- keep consent/suppression unchanged.

## Status Model

Use these statuses:

- `queued`
- `researching`
- `verified_email`
- `verified_phone`
- `verified_both`
- `partial`
- `needs_more_data`
- `conflict_review`
- `unresolved`
- `suppressed`

## Retry Logic

Do not repeatedly hammer the same unresolved contact.

Recommended retry cadence:

- attempt 1: immediate;
- attempt 2: 7 days later if new evidence may appear;
- attempt 3: 30 days later;
- attempt 4: 90 days later;
- after 4 unsuccessful attempts: mark `unresolved` until a new internal signal or source appears.

A new trusted internal relationship, company, website, role, or social identity may immediately re-open enrichment regardless of retry date.

## Batch Operating Loop

For each run:

1. claim a bounded batch using skip-locked/idempotent semantics;
2. deduplicate by canonical identity;
3. inspect all internal sources;
4. determine the missing field(s);
5. research only the missing field(s);
6. validate evidence;
7. promote values that meet threshold;
8. store provenance and audit detail;
9. update status and next-check date;
10. release the record for the next run.

The worker should process higher-yield records first and remain safely resumable.

## Quality Gate

A record may count as successfully enriched only when:

- at least one missing contact field was filled with a value meeting the promotion threshold;
- provenance is present;
- confidence is present;
- verification timestamp is present;
- no stronger conflicting value exists;
- no suppression/privacy rule was violated.

## Failure Protocol

When research fails:

- do not fabricate data;
- store the failure reason;
- store sources attempted;
- increment attempts once per actual research pass;
- set the correct next retry date;
- if conflicting evidence exists, send to `conflict_review` instead of choosing arbitrarily.

Common failure reasons:

- `no_public_professional_contact`
- `official_site_unavailable`
- `identity_ambiguous`
- `conflicting_sources`
- `generic_contact_only`
- `source_stale`
- `blocked_private_source`
- `insufficient_evidence`

## Anti-Sloppiness Rules

- A populated field is not automatically a verified field.
- A domain is not proof of employment.
- A matching first/last name is not identity proof.
- Search-engine snippets are discovery aids, not final evidence when the source can be opened.
- A social bio containing a phone/email is usable only when the business/professional account identity is clear.
- Do not copy the same contact value across unrelated brands.
- Brand/entity assignment is outside this skill's scope.
- Marketing consent is outside this skill's scope.
- Reachability does not equal permission to contact.

## Recommended Sub-Skills

1. `contact-dedupe` — canonical identity resolution before research.
2. `internal-contact-lookup` — search all existing Supabase sources first.
3. `professional-email-discovery` — find and verify missing professional email.
4. `business-phone-discovery` — find and verify missing professional/business phone.
5. `contact-verification` — validate source, identity, confidence, and conflicts.
6. `contact-provenance` — store source, timestamp, confidence, and history.
7. `contact-enrichment-retry` — schedule unresolved records without repeated waste.

## Inputs

Minimum input:

```json
{
  "canonical_contact_key": "...",
  "source_table": "...",
  "source_id": "...",
  "full_name": "...",
  "company": "...",
  "email": null,
  "phone": null,
  "city": "...",
  "state": "...",
  "website": "...",
  "instagram": "..."
}
```

Only fields already available may be passed; missing fields are acceptable.

## Output

```json
{
  "canonical_contact_key": "...",
  "status": "verified_both",
  "email": {
    "value": "person@company.com",
    "status": "verified",
    "confidence": 0.95,
    "source_type": "official_website",
    "source": "https://..."
  },
  "phone": {
    "value": "+1...",
    "status": "verified",
    "confidence": 0.90,
    "source_type": "official_business_source",
    "source": "https://..."
  },
  "attempts": 1,
  "next_check_at": null,
  "notes": []
}
```

## Continuous Operation

Run this skill repeatedly against the enrichment queue. The ideal production behavior is continuous but bounded: small batches, idempotent claims, strict verification, and no outreach side effects.

A scheduled runner may invoke the skill, but the skill itself never sends communications.

## Definition of Done

The skill is healthy when it continuously raises verified reachability coverage while keeping false positives near zero, preserving provenance, avoiding duplicate research, and never converting contact discovery into unauthorized outreach.
