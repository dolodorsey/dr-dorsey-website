import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Dr. Dorsey',
  description:
    'Privacy Policy for Dr. Dorsey, The Kollective Hospitality Group LLC, and connected digital applications and integrations.',
  alternates: {
    canonical: 'https://doctordorsey.com/privacy',
  },
};

const sections = [
  {
    title: '1. Who We Are',
    body: (
      <>
        <p>
          This Privacy Policy explains how Dr. Dorsey and The Kollective Hospitality Group LLC
          (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collect, use, disclose, retain, and
          protect information when you use doctordorsey.com, our related digital services, and
          applications or integrations that link to this policy.
        </p>
      </>
    ),
  },
  {
    title: '2. Information We Collect',
    body: (
      <>
        <p>Depending on how you interact with us, we may collect:</p>
        <ul>
          <li>Contact information such as name, email address, phone number, company, and role.</li>
          <li>Account or profile information that you choose to provide.</li>
          <li>
            Information submitted through forms, registrations, applications, purchases, inquiries,
            or other communications.
          </li>
          <li>
            Technical and usage information such as IP address, browser type, device information,
            pages viewed, referring URLs, timestamps, cookies, and similar analytics data.
          </li>
          <li>
            Information received from third-party platforms when you choose to connect or authorize
            an integration.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: '3. LinkedIn and Other Connected Platforms',
    body: (
      <>
        <p>
          If you connect a LinkedIn account or otherwise authorize a LinkedIn integration, we may
          receive information made available through LinkedIn&apos;s APIs based on the permissions
          you grant. This may include basic profile information, identity information, organization
          or page information, and other data permitted by the applicable LinkedIn product and your
          authorization.
        </p>
        <p>
          We use LinkedIn data only to provide the connected feature, authenticate users, support
          authorized business workflows, maintain security, and improve the applicable service. We
          do not sell LinkedIn member data. We do not use LinkedIn data for purposes that are
          prohibited by LinkedIn&apos;s developer terms or applicable law.
        </p>
        <p>
          You can revoke a LinkedIn connection through your LinkedIn account settings where
          available. After revocation, we will stop requesting new LinkedIn data under that
          authorization and will delete or de-identify previously received data when required by
          applicable platform rules, law, or a valid user request, subject to legitimate retention
          obligations.
        </p>
      </>
    ),
  },
  {
    title: '4. How We Use Information',
    body: (
      <>
        <p>We may use information to:</p>
        <ul>
          <li>Provide, operate, secure, and improve our websites, apps, products, and services.</li>
          <li>Authenticate users and maintain authorized integrations.</li>
          <li>Respond to requests, questions, applications, and customer-service matters.</li>
          <li>Process transactions and administer business relationships.</li>
          <li>Send operational notices and, where permitted, marketing communications.</li>
          <li>Measure performance, diagnose issues, prevent fraud, and protect our systems.</li>
          <li>Comply with legal obligations and enforce applicable agreements.</li>
        </ul>
      </>
    ),
  },
  {
    title: '5. How We Share Information',
    body: (
      <>
        <p>
          We may share information with service providers and business partners that help us host,
          operate, analyze, communicate, process payments, manage customer relationships, or provide
          other functions on our behalf. We may also disclose information when required by law, to
          protect rights or safety, in connection with a corporate transaction, or when you direct
          or authorize us to do so.
        </p>
        <p>We do not sell personal information in exchange for money.</p>
      </>
    ),
  },
  {
    title: '6. Cookies and Analytics',
    body: (
      <>
        <p>
          Our services may use cookies and similar technologies to operate core functionality,
          remember preferences, understand usage, measure performance, and improve user experience.
          Your browser may allow you to restrict or delete cookies. Some features may not function
          properly if certain cookies are disabled.
        </p>
      </>
    ),
  },
  {
    title: '7. Data Retention',
    body: (
      <>
        <p>
          We retain personal information only for as long as reasonably necessary for the purposes
          described in this policy, to provide requested services, maintain business and security
          records, comply with legal or contractual obligations, resolve disputes, and enforce our
          agreements. Retention periods may vary based on the type of information and the service
          involved.
        </p>
      </>
    ),
  },
  {
    title: '8. Data Security',
    body: (
      <>
        <p>
          We use reasonable administrative, technical, and organizational safeguards designed to
          protect information from unauthorized access, loss, misuse, alteration, or disclosure.
          No method of storage or transmission is completely secure, so we cannot guarantee absolute
          security.
        </p>
      </>
    ),
  },
  {
    title: '9. Your Privacy Choices and Requests',
    body: (
      <>
        <p>
          Depending on your location, you may have rights to request access to, correction of,
          deletion of, or a copy of certain personal information, or to object to or restrict
          certain processing. You may also withdraw consent where processing is based on consent.
        </p>
        <p>
          To submit a privacy or data-deletion request, use the contact methods published on
          doctordorsey.com and clearly identify the service or connected account involved. We may
          need to verify your identity before completing a request.
        </p>
      </>
    ),
  },
  {
    title: '10. Third-Party Services',
    body: (
      <>
        <p>
          Our services may link to or integrate with third-party platforms, including LinkedIn and
          other technology providers. Their privacy practices are governed by their own policies and
          terms. We encourage you to review those policies before connecting an account or providing
          information to a third-party service.
        </p>
      </>
    ),
  },
  {
    title: '11. Children',
    body: (
      <>
        <p>
          Our general business services are not directed to children under 13, and we do not
          knowingly collect personal information from children under 13 through these services. If
          we learn that such information was collected in error, we will take reasonable steps to
          delete it.
        </p>
      </>
    ),
  },
  {
    title: '12. Changes to This Policy',
    body: (
      <>
        <p>
          We may update this Privacy Policy from time to time. When we do, we will update the
          effective date shown on this page. Material changes may also be communicated through the
          applicable service when appropriate.
        </p>
      </>
    ),
  },
  {
    title: '13. Contact',
    body: (
      <>
        <p>
          For privacy questions, access requests, or deletion requests, contact us using the current
          contact methods published at{' '}
          <a href="https://doctordorsey.com" className="underline underline-offset-4">
            doctordorsey.com
          </a>
          .
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f6f4ef] text-black">
      <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10 sm:py-24">
        <a
          href="/"
          className="mb-12 inline-flex text-xs font-semibold uppercase tracking-[0.24em] text-black/60 transition hover:text-black"
        >
          ← Dr. Dorsey
        </a>

        <header className="border-b border-black/15 pb-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-black/55">
            Legal
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">Privacy Policy</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-black/65">
            This policy applies to doctordorsey.com and digital services or authorized integrations
            that link to this page.
          </p>
          <p className="mt-5 text-sm font-medium text-black/55">
            Effective date: October 1, 2026
          </p>
        </header>

        <div className="space-y-12 py-12">
          {sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{section.title}</h2>
              <div className="space-y-4 text-[15px] leading-7 text-black/70 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
                {section.body}
              </div>
            </section>
          ))}
        </div>

        <footer className="border-t border-black/15 pt-8 text-xs uppercase tracking-[0.18em] text-black/45">
          © 2026 Dr. Dorsey / The Kollective Hospitality Group LLC
        </footer>
      </div>
    </main>
  );
}
