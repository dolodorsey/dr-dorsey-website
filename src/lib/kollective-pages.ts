export type KollectivePage = {
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  facts: Array<[string, string]>;
  sections: Array<{ title: string; body: string[]; bullets?: string[] }>;
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
};

export const kollectiveNav = [
  ['About', '/kollective/about'],
  ['Portfolio', '/kollective/portfolio'],
  ['Operating Model', '/kollective/operating-model'],
  ['Partnerships', '/kollective/partnerships'],
  ['Technology', '/kollective/technology'],
] as const;
