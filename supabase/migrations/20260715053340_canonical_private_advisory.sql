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
  launch_gate_notes = 'Application and first-month advisory deposit required.',
  sort_order = 50
where slug = '90-day-advisory';
