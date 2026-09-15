# A2P 10DLC Submission Packet — The Inner Circle LLC

Status owner: Kollective enterprise communications
Last updated: 2026-09-15

## Registration identity

- Legal A2P brand: **The Inner Circle LLC**
- Registration path: **Standard Brand**
- Messaging volume: **High Volume Standard**
- Campaign use case: **Marketing**
- Messaging program / public-facing brand: **The Kollective**
- Website: **https://thekollectivehospitality.com**
- Privacy Policy: **https://thekollectivehospitality.com/privacy**
- Terms of Service: **https://thekollectivehospitality.com/terms**
- SMS opt-in: **https://thekollectivehospitality.com/sms-consent**

> Do not store the full EIN or IRS registered address in this public repository. Enter both directly in HighLevel from the official IRS CP-575/147C record.

## Campaign description

The Inner Circle LLC sends recurring informational and marketing SMS messages for The Kollective messaging program to customers and prospective customers who explicitly opt in through first-party web forms and other documented consent experiences controlled by the business. Messages may include inquiry follow-up, event information, booking or scheduling information, customer support, service updates, promotions, special offers, and related marketing opportunities. Message frequency varies. Message and data rates may apply. Recipients may reply STOP to opt out or HELP for help. Consent is not a condition of purchase.

## Opt-in workflow

1. The user visits https://thekollectivehospitality.com/sms-consent.
2. The page visibly identifies **The Inner Circle LLC** as the legal SMS sender for **The Kollective** messaging program.
3. The user enters name, email, and mobile number.
4. The user must actively check an SMS consent checkbox that is not pre-selected.
5. The disclosure states message purpose, recurring messaging, variable frequency, message/data rates, STOP, HELP, and that consent is not a condition of purchase.
6. The page links to the public Privacy Policy and Terms of Service.
7. The consent record stores the disclosure, consent version, legal sender, messaging program, source page, timestamp, and submission context.
8. STOP requests must be honored and suppressed from future marketing messaging.

## Canonical consent language

I agree to receive recurring informational and marketing text messages from The Inner Circle LLC, the legal sender for The Kollective messaging program, at the mobile number provided. Message frequency varies. Message and data rates may apply. Reply STOP to opt out and HELP for help. Consent is not a condition of purchase.

## Sample messages

### Sample 1 — Welcome / confirmation

The Inner Circle LLC / The Kollective: Hi {{contact.first_name}}, thanks for opting in. We’ll send event, service and offer updates you requested. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out or HELP for help.

### Sample 2 — Event / offer

The Inner Circle LLC / The Kollective: Hi {{contact.first_name}}, registration is open for {{event_or_offer_name}}. View details: {{first_party_https_url}}. Reply STOP to opt out or HELP for help.

### Sample 3 — Follow-up

The Inner Circle LLC / The Kollective: Hi {{contact.first_name}}, following up on your request about {{request_topic}}. View the next step here: {{first_party_https_url}}. Reply STOP to opt out or HELP for help.

## HighLevel submission sequence

1. Settings → Phone System → Trust Center.
2. Open the existing The Inner Circle LLC Standard Brand draft.
3. Use the exact legal business name, EIN, and physical registered address from the IRS record.
4. Select High Volume Standard.
5. Choose Manual Setup for the consent method.
6. Select Marketing as the campaign use case.
7. Use the campaign description, public URLs, opt-in workflow, and sample messages in this packet.
8. Run Review Application and resolve every compliance-review flag before submission.
9. Submit the Brand/Campaign.
10. After approval, link each intended local number and verify that its status is A2P Verified.

## Production QA gate

Do not submit until all of the following are true:

- [ ] Exact IRS legal identity and registered physical address verified from CP-575 or 147C
- [x] Website published
- [x] Privacy Policy contains mobile-data non-sharing language
- [x] Terms contain SMS program terms
- [x] SMS opt-in page names The Inner Circle LLC as legal sender
- [x] Consent checkbox is affirmative and not pre-selected
- [x] STOP / HELP disclosures present
- [x] Consent is not a condition of purchase
- [x] Consent evidence is versioned and stored
- [x] Campaign description prepared
- [x] Sample messages prepared
- [ ] HighLevel Trust Center carrier submission completed
- [ ] Campaign approved
- [ ] Sending number(s) linked and A2P Verified
