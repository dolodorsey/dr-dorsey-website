export type KollectivePage = {
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  facts: Array<[string, string]>;
  sections: Array<{
    title: string;
    body: string[];
    bullets?: string[];
    links?: Array<[string, string]>;
  }>;
};

export const kollectivePages: Record<string, KollectivePage> = {
  about: {
    eyebrow: 'ABOUT THE KOLLECTIVE',
    title: 'Independent brands. Shared enterprise leverage.',
    description: 'What The Kollective is, how it is structured, and what it does for its operating brands.',
    intro: 'The Kollective is the enterprise layer behind a portfolio spanning hospitality, food, events, products, services, technology, education, institutions, and community initiatives. Public brands remain distinct; shared capabilities help them move with greater discipline.',
    facts: [
      ['Independent', 'Each public brand keeps its own identity and promise'],
      ['Coordinated', 'Strategy, systems, data, and execution can be shared'],
      ['Action-led', 'Every public route ends in a defined next step'],
    ],
    sections: [
      {
        title: 'What the enterprise layer does',
        body: [
          'The Kollective coordinates strategy, creative direction, technology, data, partnerships, legal and operating workflows, market development, and cross-brand opportunities.',
          'That coordination is intended to reduce repeated work without flattening the companies into one generic identity. A water company, event platform, hospitality concept, service network, and education program should not sound or behave alike simply because they share ownership or infrastructure.',
        ],
      },
      {
        title: 'What remains separate',
        body: [
          'Brand claims, customer promises, product information, pricing, contracts, inquiry routing, permissions, and public identity remain specific to the company that owns the relationship.',
          'A concept is not presented as an operating company, a planned market is not presented as active, and a shared enterprise resource does not erase the need for brand-level responsibility.',
        ],
      },
      {
        title: 'The standard',
        body: [
          'The standard is simple: clear information, direct action, defensible claims, visible ownership, secure data handling, and no fake links or fabricated operating proof.',
          'Where a system is early, the site should say so. Where a brand is active, the public should be able to understand what it offers and reach the correct team without navigating the internal organization chart.',
        ],
      },
    ],
  },
  portfolio: {
    eyebrow: 'THE ENTERPRISE PORTFOLIO',
    title: 'Different worlds with different jobs.',
    description: 'How The Kollective organizes and presents its portfolio of brands, ventures, and institutions.',
    intro: 'The portfolio is organized by operating purpose rather than visual similarity. Hospitality, experiences, food, products, services, technology, education, institutions, and impact initiatives each require their own market logic.',
    facts: [
      ['Hospitality', 'Venues, guest experiences, reservations, and service'],
      ['Consumer', 'Food, beverage, merchandise, and product brands'],
      ['Platforms', 'Technology, services, education, and institutional systems'],
    ],
    sections: [
      {
        title: 'Operating brands versus concepts',
        body: [
          'An operating brand has a defined offer, accountable owner, usable customer path, and current market status. A concept may have a name, identity, or roadmap without yet meeting that standard.',
          'The directory distinguishes those stages so visitors are not asked to interpret planning material as proof of launch.',
        ],
      },
      {
        title: 'Portfolio navigation',
        body: [
          'The public entry point is organized around intent: attend, reserve, buy, request service, partner, apply, learn, or begin a protected enterprise conversation.',
          'The enterprise directory provides context, while the destination brand remains responsible for its own detailed pages, forms, terms, and fulfillment.',
        ],
      },
      {
        title: 'Cross-brand opportunities',
        body: [
          'The Kollective can evaluate programs that require more than one capability—such as an event with venue, beverage, content, sponsorship, technology, and hospitality components.',
          'Those programs still require a defined scope, participating entities, rights, budget, responsibilities, and written approval. Shared ownership does not make every brand automatically available to every proposal.',
        ],
      },
    ],
  },
  'operating-model': {
    eyebrow: 'HOW THE SYSTEM WORKS',
    title: 'One command layer without one generic company.',
    description: 'The Kollective operating model for shared services, brand accountability, and execution.',
    intro: 'Shared capabilities create leverage only when responsibility stays clear. The operating model separates enterprise coordination from brand-level decisions and customer delivery.',
    facts: [
      ['Brand owner', 'Responsible for offer, claims, customer, and fulfillment'],
      ['Enterprise layer', 'Coordinates shared systems and strategic leverage'],
      ['Evidence', 'Status and performance should be demonstrated, not implied'],
    ],
    sections: [
      {
        title: 'Strategy and prioritization',
        body: [
          'Enterprise planning identifies which brands are active, which are being built, which need infrastructure, and which should remain in concept status. Priorities follow readiness, market need, owner capacity, risk, and expected value.',
          'A larger idea does not automatically outrank a smaller operation that is ready to serve customers now.',
        ],
      },
      {
        title: 'Shared services',
        body: [
          'Shared services may include design systems, engineering, analytics, forms, automation, data standards, procurement support, legal coordination, partnerships, and operating dashboards.',
          'Sensitive data, permissions, credentials, and regulated workflows remain isolated according to the needs of the underlying company and user role.',
        ],
      },
      {
        title: 'Decision and handoff',
        body: [
          'Every project should identify the decision owner, execution owner, required inputs, deadline, proof of completion, and next handoff. That structure keeps strategy from becoming an endless list of attractive ideas.',
          'Public sites follow the same discipline: every important page explains the subject and provides the correct next action.',
        ],
      },
    ],
  },
  partnerships: {
    eyebrow: 'ENTERPRISE PARTNERSHIPS',
    title: 'Bring a defined opportunity.',
    description: 'How to approach The Kollective with sponsorship, licensing, distribution, property, technology, and strategic opportunities.',
    intro: 'The strongest partnership proposals identify the parties, opportunity, audience, assets, responsibilities, economics, timeline, rights, risks, and evidence required to decide.',
    facts: [
      ['Commercial', 'Distribution, licensing, sponsorship, and procurement'],
      ['Strategic', 'Property, technology, capital, and market access'],
      ['Programmatic', 'Multi-brand experiences and community initiatives'],
    ],
    sections: [
      {
        title: 'What belongs in a proposal',
        body: [
          'State what you are offering, what you need, which brand or capability is relevant, who controls the decision, what each party contributes, how success is measured, and what must happen by when.',
          'A useful proposal separates confirmed assets from estimates and avoids assigning rights or responsibilities to a Kollective company before agreement.',
        ],
      },
      {
        title: 'How opportunities are routed',
        body: [
          'An enterprise inquiry is reviewed for fit and then routed to the brand, division, or operating owner best positioned to evaluate it. Multi-brand proposals may require a coordinated review before any company commits.',
          'Submitting an inquiry does not create a partnership, sponsorship, appointment, exclusivity, or authorization to use a name or mark.',
        ],
      },
      {
        title: 'Protected conversations',
        body: [
          'If meaningful confidential information is required, the first exchange should identify the subject and purpose without exposing trade secrets, personal data, security detail, or privileged material.',
          'Confidentiality and data-room access are established deliberately for qualified conversations rather than assumed from an unsolicited submission.',
        ],
      },
    ],
  },
  technology: {
    eyebrow: 'TECHNOLOGY & DATA',
    title: 'Systems that make the enterprise legible.',
    description: 'The role of technology, data, automation, and governance across The Kollective.',
    intro: 'Technology supports the portfolio by connecting public entry points to accountable workflows, separating brand data, documenting execution, and giving owners a current operating picture.',
    facts: [
      ['Public layer', 'Informative sites and direct conversion paths'],
      ['Operating layer', 'Dashboards, handoffs, records, and automation'],
      ['Control layer', 'Permissions, auditability, and brand separation'],
    ],
    sections: [
      {
        title: 'From website to owner',
        body: [
          'A form is not complete when it displays a success message. The submission must be validated, stored, attributed to the correct brand and source, visible to the responsible team, and moved through a defined response workflow.',
          'The public experience and the operating system are therefore one user story with different permissions.',
        ],
      },
      {
        title: 'Shared standards, isolated responsibility',
        body: [
          'The portfolio can share neutral standards for validation, accessibility, analytics, performance, security, and records while maintaining separate brand configuration, destinations, data authority, and public claims.',
          'This reduces duplicated engineering without creating one undifferentiated database or one generic brand experience.',
        ],
      },
      {
        title: 'Automation with proof',
        body: [
          'Automation should leave evidence: what triggered, what was attempted, what completed, what failed, and who owns the exception. Silent queues and unverifiable social or operational actions are not treated as complete.',
          'High-risk actions retain approval and audit requirements appropriate to the people, money, data, or external systems they affect.',
        ],
      },
    ],
  },
  companies: {
    eyebrow: 'THE ENTERPRISE IN DEPTH',
    title: 'Fourteen departments. One enterprise.',
    description: 'The complete Kollective company and department architecture.',
    intro: 'Entertainment, apps and technology, products, water sourcing, beverages, response, philanthropy, hospitality, and services operate with distinct identities while sharing enterprise intelligence.',
    facts: [['09', 'Independent department worlds'], ['60+', 'Entities, companies, concepts, and institutions'], ['01', 'Shared command layer']],
    sections: [
      {
        title: 'Culture, technology, and commerce',
        body: ['Entertainment includes Rose on Piedmont, GROWN-ISH, Taste of Art, HugLife, Iconic, GOOD TIMES, and original cultural IP. The technology world includes active platforms GOOD TIMES, On Call, and S.O.S., alongside products in development and planning.', 'Products and commerce include Hakuna Matata, Bodega, STUSH, PULSE, Make Atlanta Great Again, and Scented Flowers.'],
        links: [['Open every entity', '/entities'], ['Current experiences', '/events'], ['Shop the portfolio', '/store']],
      },
      {
        title: 'Water, beverages, and response',
        body: ['Everyday Water Group connects Aquifer Waterworks and Nativa Waterworks to a long-term source and infrastructure strategy. Infinity Water, Tribal Water, The Tribe Wine, and Pronto Energy remain distinct consumer brands.', 'Help 911, S.O.S., On Call, and the Umbrella Injury Network form the response layer.'],
        links: [['Water network', '/network'], ['Help 911', 'https://www.help911.help']],
      },
      {
        title: 'Hospitality, services, and impact',
        body: ['The Casper Group is a verified twelve-brand hospitality portfolio. The Umbrella Group coordinates property, mobility, cleaning, accounting, travel, wellness, and people operations. Sole Exchange, Playmakers Sports Association, Members Elite, and The University build durable community pathways.'],
        links: [['Casper Group', 'https://caspergroupworldwide.com'], ['Umbrella Group', 'https://theumbrella.group'], ['Sole Exchange', 'https://soleexchangeworldwide.com']],
      },
    ],
  },
  directory: {
    eyebrow: 'THE MASTER DIRECTORY',
    title: 'Find the company. Make the move.',
    description: 'A direct directory into the complete enterprise.',
    intro: 'Use the entity universe for company profiles, the links page for public destinations, and All Access for applications, reservations, partnerships, and protected conversations.',
    facts: [['Entities', 'Companies and official identities'], ['Links', 'Public websites and platforms'], ['Access', 'Forms and direct action']],
    sections: [
      { title: 'Choose the correct directory', body: ['The Entity Universe explains each company, status, division, and live destination. The links page is the shortest public route. The forms page routes a request to an accountable operating lane.'], links: [['Entity Universe', '/entities'], ['All links', '/links'], ['All forms', '/forms'], ['Open Access', '/access']] },
      { title: 'Enterprise worlds', body: ['The company map shows how every department relates without flattening the individual brands. Current, Store, Network, Upcoming, and Team provide specialized views of the system.'], links: [['Companies', '/companies'], ['Current', '/events'], ['Store', '/store'], ['Network', '/network'], ['Upcoming', '/upcoming'], ['Team', '/team']] },
    ],
  },
  links: {
    eyebrow: 'ONE PAGE. EVERY MOVE.',
    title: 'The public command page.',
    description: 'The highest-value public destinations across the enterprise.',
    intro: 'Enter current Atlanta culture, company profiles, active stores, water and beverage brands, community platforms, or the founder’s world from one deliberate page.',
    facts: [['111ATL', 'Events, tables, RSVP, and VIP access'], ['Enterprise', 'Companies, services, and partnerships'], ['Founder', 'Book, strategy, and speaking']],
    sections: [
      { title: 'Live destinations', body: ['These links lead to current public platforms verified in the enterprise registry.'], links: [['111ATL', 'https://111atl.com'], ['GOOD TIMES', 'https://www.thegoodtimesworldwide.com'], ['Dr. Dorsey', 'https://doctordorsey.com'], ['Casper Group', 'https://caspergroupworldwide.com'], ['Umbrella Group', 'https://theumbrella.group'], ['Help 911', 'https://www.help911.help']] },
      { title: 'Products and impact', body: ['Shop, read, support, and enter consumer or community platforms directly.'], links: [['STUSH', 'https://stushusa.com'], ['Bodega', 'https://bodegabodegabodega.com'], ['Pronto Energy', 'https://prontoenergydrink.com'], ['Infinity Water', 'https://watertoinfinity.com'], ['Sole Exchange', 'https://soleexchangeworldwide.com'], ['Hakuna Matata', 'https://bodgeaworldwide.myshopify.com/products/hakuna-matata-by-dr-dorsey']] },
    ],
  },
  forms: {
    eyebrow: 'CHOOSE THE CONVERSATION',
    title: 'Every form has a purpose.',
    description: 'Reservations, partnerships, careers, media, vendors, and enterprise inquiries.',
    intro: 'The Kollective uses the shared Doctor Dorsey enterprise forms system while keeping each submission routed by intent, brand, and operating owner.',
    facts: [['Reserve', 'Events, tables, and celebrations'], ['Build', 'Partnerships, vendors, and careers'], ['Protect', 'NDA and private enterprise review']],
    sections: [
      { title: 'Public and commercial access', body: ['Choose the lane that most closely matches the request.'], links: [['Reserve / RSVP', 'https://111atl.com/#forms'], ['Partner / Sponsor', 'https://doctordorsey.com/forms/sponsor'], ['Careers', 'https://doctordorsey.com/forms/hiring_inquiry'], ['Vendor network', 'https://doctordorsey.com/forms/vendor'], ['Media', 'https://doctordorsey.com/forms/media'], ['General inquiry', 'https://doctordorsey.com/forms/inquiry']] },
      { title: 'Founder and protected access', body: ['Private strategy, speaking, book orders, and NDA requests are handled through dedicated routes.'], links: [['Private strategy', 'https://doctordorsey.com/forms/consultation'], ['Speaking', 'https://doctordorsey.com/forms/speaking'], ['Bulk books', 'https://doctordorsey.com/forms/bulk_orders'], ['Request NDA', 'https://doctordorsey.com/forms/nda']] },
    ],
  },
  events: {
    eyebrow: 'CURRENT CULTURE',
    title: 'What is moving now.',
    description: 'Current public events and cultural programming after July 28, 2026.',
    intro: 'The upcoming calendar includes GROWN-ISH, the Back to School Drive, Soul Session, Taste of Art, Labor Day programming, and the Beauty & Beast Greek Ball.',
    facts: [['AUG 07', 'GROWN-ISH'], ['AUG 22', 'Taste of Art'], ['ATLANTA', 'Venue details confirmed by each event listing']],
    sections: [
      { title: 'August 2026', body: ['Use the official event listing for current time, location, availability, and ticket terms.'], links: [['GROWN-ISH · Aug 07', 'https://www.eventbrite.com/e/the-grown-ish-aug-07-tickets-1988881854165'], ['Back to School Drive · Aug 08', 'https://www.eventbrite.com/e/the-back-to-school-drive-aug-08-tickets-1988881869210'], ['Soul Session · Aug 09', 'https://www.eventbrite.com/e/the-soul-session-aug-09-tickets-1988881865198'], ['Taste of Art · Aug 22', 'https://www.eventbrite.com/e/the-taste-of-art-aug-22-tickets-1988881972519']] },
      { title: 'Complete live calendar', body: ['111ATL and GOOD TIMES remain the public hubs for current experiences, reservations, and discovery.'], links: [['111ATL', 'https://111atl.com'], ['GOOD TIMES', 'https://www.thegoodtimesworldwide.com']] },
    ],
  },
  store: {
    eyebrow: 'THE PORTFOLIO IN HAND',
    title: 'Wear it. Read it. Drink it.',
    description: 'The active product and commerce layer of the enterprise.',
    intro: 'Founder media, fashion, premium water, energy, culture, and limited product worlds—each with its own storefront or verified destination.',
    facts: [['READ', 'Hakuna Matata'], ['WEAR', 'STUSH, Bodega, and Atlanta culture'], ['DRINK', 'Infinity Water and Pronto Energy']],
    sections: [
      { title: 'Active storefronts', body: ['Purchase and fulfillment happen through each brand’s current public destination.'], links: [['Hakuna Matata', 'https://bodgeaworldwide.myshopify.com/products/hakuna-matata-by-dr-dorsey'], ['STUSH', 'https://stushusa.com'], ['Bodega', 'https://bodegabodegabodega.com'], ['Make Atlanta Great Again', 'https://thaoldatlanta.com'], ['Pronto Energy', 'https://prontoenergydrink.com'], ['Infinity Water', 'https://watertoinfinity.com']] },
    ],
  },
  upcoming: {
    eyebrow: 'WHAT IS BEING BUILT NEXT',
    title: 'The pipeline, without the fiction.',
    description: 'A status-aware view of development, planning, and expansion.',
    intro: 'Active means active. Development means development. Planning means planning. The enterprise pipeline separates readiness from ambition while preserving a route for qualified partners.',
    facts: [['ACTIVE', 'On Call, S.O.S., water and beverage brands'], ['DEVELOPMENT', 'Luxe on Demand and The Law'], ['PLANNING', 'The Vote and future market programs']],
    sections: [
      { title: 'Expansion lanes', body: ['Casper Group licensing, water infrastructure, platform development, product releases, and education are moving through different operating stages.'], links: [['Hospitality expansion', 'https://caspergroupworldwide.com'], ['Water network', '/network'], ['Products', '/store'], ['Technology', '/technology']] },
      { title: 'Bring a qualified opportunity', body: ['Property, distribution, licensing, technology, sponsorship, talent, and capital proposals should identify scope, timing, decision owner, and mutual value.'], links: [['Enterprise inquiry', 'https://doctordorsey.com/forms/inquiry'], ['Partnership request', 'https://doctordorsey.com/forms/sponsor']] },
    ],
  },
  network: {
    eyebrow: 'THE WATER AND TRIBE NETWORK',
    title: 'From source to culture.',
    description: 'Water sourcing, infrastructure, consumer products, education, and community.',
    intro: 'Everyday Water Group coordinates a connected long-term system while Aquifer, Nativa, Infinity, Tribal Water, The Tribe, and The University remain distinct worlds.',
    facts: [['SOURCE', 'Aquifer Waterworks'], ['SYSTEM', 'Everyday and Nativa'], ['CULTURE', 'Infinity, Tribal Water, The Tribe, and education']],
    sections: [
      { title: 'Water infrastructure', body: ['Aquifer Waterworks focuses on source intelligence. Nativa Waterworks focuses on place-led infrastructure. Everyday Water Group coordinates the portfolio.'], links: [['Aquifer', 'https://aquifer-waterworks.vercel.app'], ['Nativa', 'https://nativa-waterworks.vercel.app'], ['Everyday Water', 'https://everyday-water-group.vercel.app']] },
      { title: 'Consumer and community worlds', body: ['Infinity Water and Tribal Water are active consumer brands. The Tribe and The University connect gathering, learning, and enterprise development.'], links: [['Infinity Water', 'https://watertoinfinity.com'], ['Tribal Water', 'https://tribal-water.vercel.app'], ['The Tribe', 'https://the-tribe-wine.vercel.app'], ['The University', 'https://the-university.vercel.app']] },
    ],
  },
  team: {
    eyebrow: 'THE PEOPLE BEHIND THE WORLDS',
    title: 'Founder-led. Specialist-powered.',
    description: 'The leadership, operating, creative, and partner structure behind the enterprise.',
    intro: 'Dr. Dorsey sets enterprise direction and architecture. Each department then requires accountable owners, operators, specialists, and partners appropriate to its own market.',
    facts: [['FOUNDER', 'Vision and enterprise architecture'], ['OPERATORS', 'Brand and delivery accountability'], ['NETWORK', 'Specialists, vendors, and strategic partners']],
    sections: [
      { title: 'Operating disciplines', body: ['Hospitality operations, creative and culture, technology and product, water and infrastructure, commerce, legal coordination, and partnership development work as specialist disciplines—not generic titles.'], links: [['Meet Dr. Dorsey', 'https://doctordorsey.com'], ['Careers', 'https://doctordorsey.com/forms/hiring_inquiry'], ['Vendor network', 'https://doctordorsey.com/forms/vendor']] },
      { title: 'Build with the network', body: ['Qualified specialists and operating partners can introduce their capabilities through the correct public route.'], links: [['What do you do?', 'https://doctordorsey.com/forms/what_you_do'], ['Partner', 'https://doctordorsey.com/forms/sponsor']] },
    ],
  },
  access: {
    eyebrow: 'ALL ACCESS',
    title: 'Discovery ends in a move.',
    description: 'Every important public action across the enterprise.',
    intro: 'Reserve, RSVP, buy, apply, partner, request service, enter a platform, or begin a protected enterprise conversation.',
    facts: [['EXPERIENCE', 'Events, tables, and culture'], ['ENTERPRISE', 'Partners, vendors, careers, and services'], ['FOUNDER', 'Strategy, speaking, and Hakuna Matata']],
    sections: [
      { title: 'Choose the move', body: ['Use the shortest verified route to the action you need.'], links: [['Experience Atlanta', 'https://111atl.com'], ['Shop', '/store'], ['Partner', 'https://doctordorsey.com/forms/sponsor'], ['Careers', 'https://doctordorsey.com/forms/hiring_inquiry'], ['Request service', 'https://theumbrella.group'], ['Help 911', 'https://www.help911.help'], ['Private strategy', 'https://doctordorsey.com/forms/consultation'], ['Enterprise inquiry', 'https://doctordorsey.com/forms/inquiry']] },
    ],
  },
};

export const kollectiveNav = [
  ['Companies', '/companies'],
  ['Entities', '/entities'],
  ['Current', '/events'],
  ['Network', '/network'],
  ['Links', '/links'],
] as const;
