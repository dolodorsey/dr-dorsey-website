# THE KOLLECTIVE ENTERPRISE APP FRAMEWORK

**Working product name:** The Kollective App  
**Product role:** One persistent user relationship across the full enterprise  
**Primary promise:** One account. The whole enterprise. Immediate action.

---

# Best Move

Build one enterprise shell that gives every user a permanent identity, personalized home feed and direct access to every Kollective brand without merging the brands themselves.

The app is not a replacement for every brand website or standalone app. It is the **enterprise access, discovery, communication and conversion layer** above them.

Every entity keeps its own:

- Brand identity
- Voice and creative direction
- Products and offers
- Website or standalone app
- Customer funnel
- Operations and reporting

The Kollective App provides the shared:

- User account
- Enterprise home feed
- Notification system
- Search and discovery
- Saved preferences
- Action routing
- Membership and access levels
- Analytics and attribution
- Cross-brand recommendations
- Single enterprise relationship

---

# 1. PRODUCT OBJECTIVE

Convert anonymous visitors and one-time buyers into identifiable, repeat users who can receive relevant information and take immediate action across the enterprise.

The app must answer four questions within seconds:

1. **What is relevant to me right now?**
2. **What can I do right now?**
3. **Where should this button send me?**
4. **Why should I keep the app installed?**

The product succeeds when users repeatedly open the app for access, information, benefits, opportunities and action—not only when a single event is happening.

---

# 2. CORE PRODUCT MODEL

## 2.1 Enterprise Shell

The Kollective App is the parent experience.

It contains:

- Enterprise home
- Current focus
- Full enterprise directory
- Personalized feed
- Notifications
- Saved items
- User profile
- Membership and access
- Universal action router

## 2.2 Independent Brand Destinations

Each brand receives its own destination configuration.

A brand may route to:

- An internal app screen
- A native feature module
- A web page
- A direct form
- A checkout page
- A reservation flow
- A ticketing page
- Apple App Store
- Google Play Store
- A phone call
- SMS
- Email
- Maps
- A coming-soon or waitlist screen

## 2.3 Action-First Architecture

Every content card must have a defined primary action.

Examples:

| Entity | Content | Primary CTA | Destination |
|---|---|---|---|
| Rose on Piedmont | Friday programming | Reserve / RSVP | Internal form or 111ATL reservation flow |
| Hakuna Matata | Book feature | Buy Now | Bodega or Shopify checkout |
| Dr. Dorsey | Strategy feature | Book Strategy | Consultation form |
| STUSH | Product drop | Shop Drop | STUSH product page |
| The University | Enrollment announcement | Apply | Internal application flow |
| Black Pages | App launch | Download Black Pages | Device-specific app store |
| GOOD TIMES | City guide feature | Open GOOD TIMES | Deep link or web fallback |
| Sole Exchange | Shoe drive | Donate / Volunteer | Internal campaign flow |

No informational card should exist without a deliberate next action unless it is purely editorial.

---

# 3. USER EXPERIENCE

## 3.1 Onboarding

The minimum onboarding sequence:

1. Phone, email, Apple or Google sign-in
2. Choose home city
3. Select interests
4. Select preferred brands or divisions
5. Choose notification categories
6. Optional birthday and demographic profile
7. Optional invite or access code

Recommended interest categories:

- Events and nightlife
- Restaurants and food
- Fashion and products
- Books and education
- Business and investment
- Careers and opportunities
- Community and nonprofit
- Health and wellness
- Technology and apps
- Nation, Tribe and institutional access

## 3.2 Home Screen

The home screen should be dynamic, not a fixed directory.

Recommended order:

1. **Priority Hero** — one enterprise-level campaign
2. **Your Next Move** — personalized immediate actions
3. **Happening Now / This Week**
4. **Current Focus Companies**
5. **For You**
6. **New Products and Drops**
7. **Opportunities** — jobs, vendors, sponsors, applications
8. **Enterprise Spotlight**
9. **Standalone Apps**
10. **Saved and Recently Viewed**

## 3.3 Bottom Navigation

Recommended MVP navigation:

- Home
- Explore
- Actions
- Notifications
- Profile

The central **Actions** tab should open a fast command menu:

- RSVP
- Reserve
- Buy
- Apply
- Book
- Partner
- Donate
- Download
- Contact

## 3.4 Explore

Explore should support:

- Search by brand, product, event, service or opportunity
- Division filters
- City filters
- Status filters
- “Available now” filter
- “App download” filter
- “Near me” filter where relevant

---

# 4. ENTERPRISE REGISTRY

The app must be driven by a central enterprise registry rather than hardcoded cards.

## 4.1 Required Entity Fields

```text
id
slug
name
division_id
parent_entity_id
short_description
long_description
status
public_visibility
logo_url
hero_url
website_url
primary_action_type
primary_action_label
primary_action_url
ios_store_url
android_store_url
deep_link_scheme
universal_link
fallback_url
city_scope
access_level
featured_priority
search_keywords
created_at
updated_at
```

## 4.2 Status Values

Use controlled statuses:

- operating
- active
- available_now
- launching
- building
- seasonal
- portfolio_ip
- paused
- archived
- private

Public interfaces must never translate “portfolio” into “operating.”

## 4.3 Destination Types

```text
internal_screen
internal_form
web
checkout
reservation
ticket
app_store
phone
sms
email
maps
waitlist
coming_soon
```

---

# 5. SMART CTA ROUTER

The CTA router is the core system that turns the enterprise into immediate action.

## 5.1 Routing Logic

When a user taps a CTA:

1. Read the entity and action configuration
2. Identify device and platform
3. Check whether an internal native route exists
4. Check whether a supported external app is installed, when possible
5. Open the correct destination
6. Use a fallback when the preferred destination is unavailable
7. Log the action and attribution

## 5.2 Black Pages Example

Entity configuration:

```json
{
  "slug": "black-pages",
  "name": "Black Pages",
  "primary_action_type": "app_store",
  "primary_action_label": "Download Black Pages",
  "ios_store_url": "APP_STORE_URL_HERE",
  "android_store_url": "PLAY_STORE_URL_HERE",
  "deep_link_scheme": "blackpages://",
  "universal_link": "https://blackpages.example/open",
  "fallback_url": "https://blackpages.example/download"
}
```

User behavior:

- iPhone user → Apple App Store
- Android user → Google Play Store
- Desktop user → Black Pages download landing page with QR code
- App already installed → deep link into Black Pages
- Store listing not live → waitlist or “notify me” screen

## 5.3 Deferred Deep Linking

Phase 2 should support deferred deep links:

1. User taps a specific Black Pages business or campaign
2. User installs Black Pages
3. On first open, Black Pages returns the user to the exact intended content

This preserves campaign intent through the install process.

## 5.4 Router Event Tracking

Every CTA event should record:

```text
user_id
session_id
entity_id
content_id
action_type
action_label
source_screen
source_campaign
destination_url
device_platform
city
result
created_at
```

---

# 6. CONTENT AND PUSH SYSTEM

## 6.1 Content Types

- Announcement
- Event
- Product
- Offer
- Job
- Application
- Partnership opportunity
- App launch
- Founder message
- Educational content
- Community campaign
- Emergency or high-priority alert

## 6.2 Audience Segmentation

Push campaigns may target by:

- City
- Interest
- Brand affinity
- Division affinity
- Purchase history
- RSVP history
- App activity
- Membership level
- Partner or team role
- Age eligibility
- User-created notification preferences

## 6.3 Notification Rules

- Never send every notification to every user
- Separate transactional notifications from marketing
- Provide per-category controls
- Apply quiet hours
- Cap routine promotional frequency
- Reserve enterprise-wide alerts for major announcements
- Allow high-priority brands to purchase or receive featured placement only through approved governance

## 6.4 Notification Center

Every push should also appear in an in-app inbox with:

- Brand identity
- Timestamp
- Message
- CTA
- Read status
- Expiration date

---

# 7. IDENTITY, ACCESS AND MEMBERSHIP

## 7.1 Universal User Profile

```text
user_id
full_name
email
phone
avatar_url
home_city
birthday
interests
favorite_entities
notification_preferences
membership_level
access_roles
referral_code
created_at
last_active_at
```

## 7.2 Access Levels

Recommended access model:

- Public
- Registered User
- Member
- VIP
- Ambassador
- Vendor
- Partner
- Staff
- Executive
- Board
- Private Institutional Access

Access must be role-based and entity-specific. A person may be a public user for one division and approved staff for another.

## 7.3 Membership Benefits

Potential user-retention benefits:

- Early event access
- Preferred RSVP windows
- Member-only offers
- Birthday benefits
- Product presales
- Private content
- Referral rewards
- Loyalty points or enterprise credits
- Partner discounts
- Application status tracking
- Saved forms and faster checkout

---

# 8. MVP SCOPE

## Phase 1 — Enterprise Access App

Build first:

- Authentication
- User profile and preferences
- Dynamic home feed
- Current focus directory
- Full enterprise directory
- Search
- Smart CTA router
- Notifications and in-app inbox
- Internal forms
- Saved items
- Admin publishing dashboard
- Analytics

Do not build every standalone brand feature natively in Phase 1.

## Phase 2 — Membership and Personalization

Add:

- Membership levels
- Loyalty and referrals
- Advanced personalization
- City feeds
- Purchase and RSVP history
- Benefits wallet
- Deferred deep linking
- Partner portal

## Phase 3 — Native Enterprise Modules

Add selected high-value native modules:

- Event reservations
- Restaurant booking
- Product checkout
- Job and application tracking
- GOOD TIMES integration
- Black Pages deep-link integration
- Member messaging
- Secure institutional access

---

# 9. RECOMMENDED TECHNICAL ARCHITECTURE

## Mobile

**Strong default:** React Native with Expo

Reasons:

- Shared iOS and Android codebase
- Fast deployment
- Push notification support
- Deep linking
- OTA updates for non-native changes
- Existing TypeScript/Next.js alignment

## Web and Admin

- Next.js
- Vercel
- Shared TypeScript packages
- Responsive web fallback for every app route

## Backend

- Supabase Postgres
- Supabase Auth
- Supabase Storage
- Row Level Security
- Edge Functions for routing and transactional operations
- Realtime where required

## Automation

- n8n for cross-platform workflow automation
- Transactional email and SMS provider
- Push provider through Expo Notifications initially
- Analytics through PostHog or equivalent

## Repository Structure

```text
/apps
  /mobile
  /web
  /admin
/packages
  /enterprise-registry
  /design-system
  /auth
  /analytics
  /cta-router
  /notifications
  /types
/supabase
  /migrations
  /functions
/workflows
  /n8n
/docs
```

---

# 10. SUPABASE DATA MODEL

## Core Tables

### enterprise_divisions

```text
id
name
slug
description
sort_order
is_public
```

### enterprise_entities

Uses the registry fields defined above.

### users_profile

Stores universal profile and preferences.

### user_entity_follows

```text
user_id
entity_id
notification_level
created_at
```

### content_items

```text
id
entity_id
type
title
summary
body
hero_url
city_scope
publish_at
expire_at
status
primary_action_id
audience_rules
priority
```

### actions

```text
id
entity_id
type
label
destination_config
is_active
```

### notification_campaigns

```text
id
entity_id
title
body
audience_rules
send_at
status
action_id
```

### notification_deliveries

```text
campaign_id
user_id
channel
status
opened_at
clicked_at
```

### user_activity

Tracks views, saves, searches and CTA actions.

### access_roles

Stores role-based entity and division permissions.

---

# 11. N8N WORKFLOW OUTLINE

## Workflow 1 — Publish Content

```text
Admin approves content
→ Validate entity and destination
→ Write content_items record
→ Generate web/app card payload
→ Publish to app feed
→ Create notification campaign when requested
→ Log publication
```

## Workflow 2 — Smart Notification

```text
Campaign approved
→ Pull matching users by audience rules
→ Remove opted-out users
→ Apply quiet hours and frequency caps
→ Send push
→ Send email/SMS only where authorized
→ Write delivery records
→ Report opens and clicks
```

## Workflow 3 — Lead and Action Routing

```text
User submits action
→ Identify entity and request type
→ Create Supabase lead
→ Create/update CRM contact
→ Route to correct division owner
→ Send confirmation
→ Start SLA timer
→ Escalate if untouched
```

## Workflow 4 — App Store Campaign

```text
Entity launches standalone app
→ Add iOS/Android URLs to registry
→ Publish launch content
→ Segment interested users
→ Send device-specific push
→ Route through CTA service
→ Track store clicks and installs where attribution is available
```

## Workflow 5 — Inactive User Recovery

```text
No app open for 14/30 days
→ Check interests and prior actions
→ Select one relevant current offer
→ Send reactivation push
→ Log response
→ Stop campaign after conversion
```

---

# 12. CRM / GHL STAGES

Even if a different CRM is selected later, use this shared funnel logic:

```text
New App User
Profile Completed
Interested / Following
Action Started
Lead Submitted
Contacted
Qualified
Converted
Repeat User
VIP / Member
Partner / Team
Inactive
Reactivation
```

Each lead also receives:

- Source entity
- Source content
- Campaign
- City
- Interest
- Action type
- Last app activity
- Lifetime actions

---

# 13. ADMIN AND GOVERNANCE

## Roles

- Enterprise Super Admin
- Division Admin
- Brand Admin
- Content Publisher
- Campaign Approver
- Analyst
- Support Agent

## Publishing Guardrails

- Brand admins only publish for approved entities
- Enterprise-wide pushes require central approval
- Every CTA must pass destination validation
- Expired events and offers automatically disappear
- App-store CTAs cannot publish without a valid store or waitlist fallback
- Archived entities cannot appear in current-focus feeds
- Private divisions require explicit access policies

---

# 14. ANALYTICS DASHBOARD

Track:

- Registered users
- Monthly active users
- Daily active users
- Retention by cohort
- Notification opt-in rate
- Push open rate
- CTA conversion rate
- Revenue attributed by entity
- RSVPs and reservations
- App-store clicks
- Leads by division
- Cross-brand movement
- Most followed entities
- User activity by city

The most important enterprise metric is:

**How many users take repeated actions across more than one entity?**

That proves the app is creating enterprise leverage rather than acting as another static directory.

---

# 15. MVP ACCEPTANCE CRITERIA

The MVP is ready when:

- A user can create one account
- The user can select city and interests
- The home feed changes based on preferences
- All current-focus entities are visible with accurate statuses
- The full enterprise is searchable
- Every card has a validated CTA
- Black Pages-style entities can route by device to an app store or fallback
- Users can receive segmented pushes
- Users can control notification categories
- Leads route to the correct division
- Admins can publish without a developer
- Every action is attributed and measurable
- Private entities remain protected

---

# Deliverables

1. Shared enterprise registry schema
2. Mobile information architecture
3. User-role matrix
4. Smart CTA router specification
5. Supabase migration plan
6. n8n workflow package
7. Notification governance SOP
8. Admin publishing SOP
9. Analytics event dictionary
10. MVP product requirements document
11. React Native / Expo application scaffold
12. App Store and Google Play launch checklist

---

# Next Actions

The immediate implementation order is:

1. Convert the current TypeScript enterprise registry into Supabase-managed data.
2. Build the CTA router service and validate every entity destination.
3. Scaffold the Expo app with authentication, home, explore, actions, notifications and profile.

**Next 3 actions to execute now.**
