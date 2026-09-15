import type { Metadata } from 'next';
import LegalPage from '../_components/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | The Kollective',
  description: 'Privacy practices for The Kollective, including the SMS program legally sent by The Inner Circle LLC.',
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="This policy explains what information is collected through The Kollective websites, forms, services, email, and text-message programs, how it is used, and the choices available to you. For the SMS messaging program described on this site, The Inner Circle LLC is the legal sender."
    >
      <section>
        <h2>SMS program identity</h2>
        <p><strong>The Inner Circle LLC is the legal sender for The Kollective SMS messaging program available through thekollectivehospitality.com.</strong> The messaging program may be supported operationally by service providers that process communications on our behalf, but consent remains specific to this messaging program.</p>
      </section>

      <section>
        <h2>Information we collect</h2>
        <p>We may collect information you provide directly, including your name, email address, telephone number, company, requested service, event or booking details, communication preferences, and the content of messages you send us.</p>
        <p>For SMS consent records, we may also retain the exact disclosure shown at opt-in, consent version, source page, timestamp, referral information, user agent, and other submission context reasonably needed to document consent and operate the messaging program.</p>
        <p>When you use our websites, we may also collect device, browser, IP address, referral, page-view, cookie, and similar technical information needed to operate, secure, and improve the service.</p>
      </section>

      <section>
        <h2>How we use information</h2>
        <ul>
          <li>Respond to inquiries and provide requested services, bookings, updates, or support.</li>
          <li>Send operational, customer-care, promotional, or marketing communications when you have requested or consented to them.</li>
          <li>Document SMS consent, opt-outs, suppression status, and other messaging-compliance records.</li>
          <li>Maintain records, measure performance, prevent fraud, protect our systems, and comply with legal obligations.</li>
          <li>Improve our websites, offerings, events, customer experience, and enterprise operations.</li>
        </ul>
      </section>

      <section>
        <h2>SMS and mobile information</h2>
        <p>When you provide a mobile number and expressly opt in, The Inner Circle LLC may use it to send the categories of messages described at the point of consent for The Kollective messaging program. Message frequency varies. Message and data rates may apply. You may reply STOP to opt out or HELP for help.</p>
        <p><strong>We do not sell, rent, or share mobile opt-in information, telephone numbers, or SMS consent with third parties or affiliates for their own marketing or promotional purposes.</strong> We may disclose information to service providers that process communications for us, but only as needed to provide those services and subject to appropriate restrictions.</p>
      </section>

      <section>
        <h2>Service providers and disclosures</h2>
        <p>We may use vetted providers for hosting, customer relationship management, analytics, communications, scheduling, payments, security, and related business operations. We may also disclose information when required by law, to protect rights or safety, or in connection with a business transaction.</p>
      </section>

      <section>
        <h2>Retention, security, and choices</h2>
        <p>We keep information only as long as reasonably necessary for the purposes described here, our records, messaging compliance, and applicable legal obligations. We use reasonable administrative and technical safeguards, but no system can guarantee absolute security.</p>
        <p>You may request access, correction, or deletion of information, or withdraw marketing consent, by emailing <a href="mailto:thekollectivehospitality@gmail.com">thekollectivehospitality@gmail.com</a>. You may withdraw SMS consent at any time by replying STOP.</p>
      </section>

      <section>
        <h2>Children and updates</h2>
        <p>Our general services are not directed to children under 13, and we do not knowingly collect their personal information through these services. We may update this policy and will post the effective date on this page.</p>
      </section>

      <section>
        <h2>Contact us</h2>
        <p>For privacy or SMS-program questions, email <a href="mailto:thekollectivehospitality@gmail.com">thekollectivehospitality@gmail.com</a>.</p>
      </section>
    </LegalPage>
  );
}
