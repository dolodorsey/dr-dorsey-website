create table if not exists public.tlu_offer_levels (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  lane text not null check (lane in ('course', 'consultation', 'hybrid')),
  level_number integer not null check (level_number >= 1),
  name text not null,
  subtitle text,
  description text,
  price_floor_cents integer not null default 0 check (price_floor_cents >= 0),
  price_ceiling_cents integer not null default 0 check (price_ceiling_cents >= price_floor_cents),
  billing_period text not null default 'one_time' check (billing_period in ('one_time', 'monthly', 'varies')),
  duration_label text,
  delivery_model text not null,
  includes text[] not null default '{}',
  deliverables text[] not null default '{}',
  client_archetypes text[] not null default '{}',
  cta_mode text not null default 'apply' check (cta_mode in ('free', 'checkout', 'apply', 'contact')),
  published boolean not null default true,
  sort_order integer not null default 0,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (lane, level_number)
);

alter table public.tlu_courses
  add column if not exists level_id uuid references public.tlu_offer_levels(id) on delete set null;

alter table public.tlu_consultation_offers
  add column if not exists level_id uuid references public.tlu_offer_levels(id) on delete set null,
  add column if not exists offer_kind text not null default 'consultation'
    check (offer_kind in ('consultation', 'course_level', 'hybrid')),
  add column if not exists price_label text,
  add column if not exists billing_period text not null default 'one_time'
    check (billing_period in ('one_time', 'monthly', 'varies'));

create index if not exists tlu_courses_level_idx on public.tlu_courses(level_id);
create index if not exists tlu_consultation_offers_level_idx on public.tlu_consultation_offers(level_id);
create index if not exists tlu_consultation_offers_kind_idx on public.tlu_consultation_offers(offer_kind, published, sort_order);

insert into public.tlu_offer_levels
  (slug, lane, level_number, name, subtitle, description, price_floor_cents, price_ceiling_cents, billing_period, duration_label, delivery_model, includes, deliverables, client_archetypes, cta_mode, sort_order, metadata)
values
  ('course-essentials', 'course', 1, 'Essentials', 'Self-paced execution', 'Focused modules for a specific commercial constraint and a practical operating artifact.', 4900, 49900, 'one_time', '1-8 weeks', 'self_paced', array['Self-paced modules', 'Templates and checklists', 'Implementation assignment'], array['Completed operating artifact', 'Execution scorecard'], array['DIY Learners'], 'checkout', 10, '{"ascension_band":"low_ticket"}'),
  ('course-premium', 'course', 2, 'Premium', 'Interactive cohort', 'Structured modules with bi-weekly group implementation calls and accountability.', 50000, 200000, 'one_time', '6-8 weeks', 'interactive', array['Complete course library', 'Bi-weekly group calls', 'Community accountability'], array['Personalized implementation plan', 'Group-reviewed operating artifacts'], array['Guided Learners'], 'apply', 20, '{"ascension_band":"mid_ticket"}'),
  ('course-elite', 'course', 3, 'Elite', 'Mentorship and private application', 'Course access, group implementation, and three private sessions to install the system in the buyer business.', 200000, 500000, 'one_time', '8-12 weeks', 'mentorship', array['Complete course library', 'Group implementation calls', 'Three private sessions'], array['Custom operating plan', 'Private implementation reviews', '90-day scorecard'], array['Guided Learners', 'Hands-On Clients'], 'apply', 30, '{"ascension_band":"high_ticket"}'),
  ('course-mastery', 'course', 4, 'Mastery', 'Certification, licensing, and ongoing mentorship', 'Authority-level implementation with final project review, certification, licensing, and mentorship.', 500000, 1000000, 'varies', '8-12+ weeks', 'certification', array['Certification curriculum', 'Final project review', 'Framework license', 'Ongoing mentorship'], array['Certificate', 'Approved implementation portfolio', 'Framework license'], array['Licensees', 'High-Rollers'], 'apply', 40, '{"ascension_band":"elite"}'),
  ('consultation-discovery', 'consultation', 1, 'Discovery', 'Qualifier and fast diagnosis', 'A focused diagnosis, one immediate recommendation, and a clear next-step decision.', 15000, 15000, 'one_time', '20 minutes', 'direct', array['Pre-call intake', 'Direct diagnosis'], array['One immediate recommendation', 'Recommended next level'], array['DIY Learners', 'Guided Learners'], 'checkout', 110, '{"ascension_band":"low_ticket"}'),
  ('consultation-strategy', 'consultation', 2, 'Strategy', 'Decision and roadmap', 'Resolve one expensive challenge and leave with a sequenced three-to-five-step roadmap.', 25000, 75000, 'one_time', '60 minutes', 'private_session', array['Pre-session review', 'Private strategy session'], array['Decision brief', 'Three-to-five-step roadmap'], array['Hands-On Clients'], 'apply', 120, '{"ascension_band":"mid_ticket"}'),
  ('consultation-implementation', 'consultation', 3, 'Implementation', 'Deep dive and custom build map', 'Translate strategy into a customized build map, templates, checklists, and ownership plan.', 100000, 250000, 'one_time', '90-120 minutes', 'deep_dive', array['Pre-work audit', 'Private deep dive', 'Template customization'], array['Full implementation breakdown', 'Custom templates and checklists'], array['Hands-On Clients'], 'apply', 130, '{"ascension_band":"mid_ticket"}'),
  ('consultation-vip', 'consultation', 4, 'VIP Intensive', 'Done-in-a-day strategy and assets', 'A concentrated half-day or full-day engagement that produces decisions and working assets.', 300000, 700000, 'one_time', '3-6 hours', 'vip_day', array['Executive pre-work', 'Private intensive', 'Live asset creation'], array['Strategy package', 'Working asset draft', 'Operating SOP'], array['Hands-On Clients', 'High-Rollers'], 'apply', 140, '{"ascension_band":"high_ticket"}'),
  ('consultation-advisory', 'consultation', 5, 'Private Advisory', 'Ongoing direct access', 'Monthly strategic access for leaders managing complex portfolios, capital, operations, or growth.', 1000000, 2000000, 'monthly', 'Monthly', 'private_advisory', array['Weekly strategy calls', 'Priority async access', 'Document review', 'Strategic introductions'], array['Monthly decision log', 'Executive scorecard', 'Portfolio review'], array['High-Rollers'], 'apply', 150, '{"ascension_band":"elite"}'),
  ('hybrid-course-strategy', 'hybrid', 1, 'Course + Strategy Call', 'Learn, then personalize', 'Core modules plus one private session to adapt the framework to the buyer business.', 99700, 200000, 'one_time', '4-8 weeks', 'hybrid', array['Core course', 'One private strategy session'], array['Personalized implementation plan'], array['Guided Learners'], 'apply', 210, '{"ascension_band":"mid_ticket"}'),
  ('hybrid-cohort', 'hybrid', 2, 'Cohort Accelerator', 'Weekly implementation container', 'Weekly modules, coaching, and community accountability for implementation momentum.', 200000, 500000, 'one_time', '8-12 weeks', 'cohort', array['Weekly modules', 'Weekly live coaching', 'Community access'], array['Implemented operating system', 'Weekly scorecard'], array['Guided Learners'], 'apply', 220, '{"ascension_band":"high_ticket"}'),
  ('hybrid-vip', 'hybrid', 3, 'VIP Accelerator', 'High-touch 90-day build', 'Full curriculum, weekly coaching, and priority private access inside a 90-day implementation container.', 1000000, 1500000, 'one_time', '90 days', 'vip_accelerator', array['Complete curriculum', 'Weekly coaching', 'Priority private access'], array['90-day implementation', 'Executive operating system'], array['High-Rollers'], 'apply', 230, '{"ascension_band":"elite"}'),
  ('hybrid-continuity', 'hybrid', 4, 'Continuity Membership', 'Ongoing learning and coaching', 'Ongoing access to courses, monthly coaching, and a private operator community.', 9900, 49900, 'monthly', 'Monthly', 'membership', array['Course library', 'Monthly group coaching', 'Private community'], array['Monthly implementation focus'], array['DIY Learners', 'Guided Learners'], 'contact', 240, '{"ascension_band":"continuity"}')
on conflict (slug) do update set
  name = excluded.name,
  subtitle = excluded.subtitle,
  description = excluded.description,
  price_floor_cents = excluded.price_floor_cents,
  price_ceiling_cents = excluded.price_ceiling_cents,
  billing_period = excluded.billing_period,
  duration_label = excluded.duration_label,
  delivery_model = excluded.delivery_model,
  includes = excluded.includes,
  deliverables = excluded.deliverables,
  client_archetypes = excluded.client_archetypes,
  cta_mode = excluded.cta_mode,
  sort_order = excluded.sort_order,
  metadata = excluded.metadata,
  updated_at = now();

update public.tlu_courses
set level_id = (select id from public.tlu_offer_levels where slug = 'course-essentials')
where price_cents > 0;

update public.tlu_consultation_offers
set
  name = 'Strategy Session',
  description = 'Resolve one expensive challenge and leave with a sequenced three-to-five-step roadmap.',
  duration_minutes = 60,
  price_cents = 75000,
  deposit_cents = 75000,
  requires_application = true,
  transformation_promise = 'Make one expensive decision and leave with a clear roadmap.',
  includes = array['Pre-session review', '60-minute private strategy session'],
  deliverables = array['Decision brief', 'Three-to-five-step roadmap'],
  target_customer = 'Entrepreneurs and operators who need clarity on one urgent challenge.',
  capacity_per_week = 5,
  minimum_qualification_score = 35,
  level_id = (select id from public.tlu_offer_levels where slug = 'consultation-strategy'),
  offer_kind = 'consultation',
  price_label = '$750',
  billing_period = 'one_time',
  sales_status = 'live',
  sort_order = 20
where slug = 'strategy-session';

update public.tlu_consultation_offers
set
  slug = 'private-advisory',
  name = 'Private Advisory',
  description = 'Ongoing strategic access for leaders managing complex portfolios, capital, operations, or growth.',
  duration_minutes = 43200,
  price_cents = 1500000,
  deposit_cents = 1000000,
  requires_application = true,
  transformation_promise = 'Install an executive decision rhythm with direct strategic access.',
  includes = array['Weekly strategy calls', 'Priority async access', 'Document review', 'Strategic introductions'],
  deliverables = array['Monthly decision log', 'Executive scorecard', 'Portfolio review'],
  target_customer = 'High-net-worth founders, investors, hospitality groups, and multi-brand operators.',
  capacity_per_week = 1,
  minimum_qualification_score = 70,
  level_id = (select id from public.tlu_offer_levels where slug = 'consultation-advisory'),
  offer_kind = 'consultation',
  price_label = '$10K-$20K+/month',
  billing_period = 'monthly',
  sales_status = 'live',
  sort_order = 50
where slug in ('90-day-advisory', '90-day-advisory-sprint');

insert into public.tlu_consultation_offers
  (slug, name, description, duration_minutes, price_cents, requires_application, published, sort_order, brand_key, owner_label, target_customer, transformation_promise, includes, deliverables, preparation_required, capacity_per_week, minimum_qualification_score, deposit_cents, sales_status, launch_gate_notes, level_id, offer_kind, price_label, billing_period)
values
  ('discovery-call', 'Discovery Call', 'A focused qualifier for one problem, one quick recommendation, and the right next step.', 20, 15000, false, true, 10, 'dr_dorsey', 'Dr. Dorsey', 'Founders who need a fast diagnosis before committing to deeper work.', 'Diagnose the problem and leave with one immediate recommendation.', array['Pre-call intake', '20-minute phone or Zoom call'], array['One immediate recommendation', 'Recommended next level'], array['Submit the primary challenge'], 8, 0, 15000, 'live', 'Direct paid qualifier.', (select id from public.tlu_offer_levels where slug = 'consultation-discovery'), 'consultation', '$150', 'one_time'),
  ('implementation-deep-dive', 'Implementation Deep Dive', 'A 90-120 minute working session that translates strategy into a customized build map.', 120, 250000, true, true, 30, 'dr_dorsey', 'Dr. Dorsey', 'Operators ready to build a funnel, automation, hospitality playbook, or operating system.', 'Turn the decision into an owned implementation plan and working assets.', array['Pre-work audit', 'Private deep dive', 'Template customization'], array['Full implementation breakdown', 'Custom templates and checklists', 'Ownership map'], array['Submit current assets', 'Identify the implementation owner'], 3, 50, 100000, 'live', 'Deposit reserves the deep dive.', (select id from public.tlu_offer_levels where slug = 'consultation-implementation'), 'consultation', '$1,000-$2,500', 'one_time'),
  ('vip-intensive', 'VIP Day / Intensive', 'A concentrated half-day or full-day engagement for strategy, operating decisions, and asset creation.', 360, 700000, true, true, 40, 'dr_dorsey', 'Dr. Dorsey', 'Leaders who need a major operating outcome completed in one concentrated engagement.', 'Leave with the core strategy and working assets built in a day.', array['Executive pre-work', '3-6 hour private intensive', 'Live asset creation'], array['Strategy package', 'Working asset draft', 'Operating SOP'], array['Submit decision brief', 'Provide source materials', 'Confirm decision-makers'], 1, 65, 300000, 'live', 'Deposit reserves the intensive; final scope determines balance.', (select id from public.tlu_offer_levels where slug = 'consultation-vip'), 'consultation', '$3,000-$7,000', 'one_time'),
  ('premium-cohort', 'Premium Cohort', 'Interactive course implementation with bi-weekly group calls and accountability.', 10080, 150000, true, true, 60, 'dr_dorsey', 'Dr. Dorsey', 'Guided learners who need structure, feedback, and group accountability.', 'Complete the curriculum and install the operating artifacts with live guidance.', array['Complete course library', 'Bi-weekly group calls', 'Community accountability'], array['Personalized implementation plan', 'Reviewed operating artifacts'], array['Select a primary course track'], 12, 35, 50000, 'live', 'Application confirms cohort fit and timing.', (select id from public.tlu_offer_levels where slug = 'course-premium'), 'course_level', '$500-$2,000', 'one_time'),
  ('elite-mentorship', 'Elite Mentorship', 'Course access, group implementation, and three private sessions.', 80640, 450000, true, true, 70, 'dr_dorsey', 'Dr. Dorsey', 'Hands-on clients who want the framework installed in their business.', 'Install a custom operating plan with private decision support.', array['Complete course library', 'Group implementation calls', 'Three private sessions'], array['Custom operating plan', 'Private implementation reviews', '90-day scorecard'], array['Submit business baseline', 'Identify the implementation team'], 5, 60, 200000, 'live', 'Application and deposit required.', (select id from public.tlu_offer_levels where slug = 'course-elite'), 'course_level', '$2,000-$5,000', 'one_time'),
  ('mastery-certification', 'Mastery Certification', 'Certification, licensing, final project review, and ongoing mentorship.', 120960, 750000, true, true, 80, 'dr_dorsey', 'Dr. Dorsey', 'Operators and consultants who want to apply the framework with recognized authority.', 'Prove mastery, earn certification, and qualify to license the framework.', array['Certification curriculum', 'Final project review', 'Framework license review', 'Ongoing mentorship'], array['Certificate', 'Approved implementation portfolio', 'Framework license pathway'], array['Submit experience profile', 'Propose final project'], 3, 75, 250000, 'live', 'Application confirms certification readiness.', (select id from public.tlu_offer_levels where slug = 'course-mastery'), 'course_level', '$5,000-$10,000+', 'varies')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  duration_minutes = excluded.duration_minutes,
  price_cents = excluded.price_cents,
  requires_application = excluded.requires_application,
  published = excluded.published,
  sort_order = excluded.sort_order,
  target_customer = excluded.target_customer,
  transformation_promise = excluded.transformation_promise,
  includes = excluded.includes,
  deliverables = excluded.deliverables,
  preparation_required = excluded.preparation_required,
  capacity_per_week = excluded.capacity_per_week,
  minimum_qualification_score = excluded.minimum_qualification_score,
  deposit_cents = excluded.deposit_cents,
  sales_status = excluded.sales_status,
  launch_gate_notes = excluded.launch_gate_notes,
  level_id = excluded.level_id,
  offer_kind = excluded.offer_kind,
  price_label = excluded.price_label,
  billing_period = excluded.billing_period;

alter table public.tlu_offer_levels enable row level security;
revoke all on table public.tlu_offer_levels from anon, authenticated;
grant select on table public.tlu_offer_levels to anon, authenticated;

drop policy if exists "Public can read published offer levels" on public.tlu_offer_levels;
create policy "Public can read published offer levels"
on public.tlu_offer_levels for select
to anon, authenticated
using (published = true);

grant all on table public.tlu_offer_levels to service_role;
