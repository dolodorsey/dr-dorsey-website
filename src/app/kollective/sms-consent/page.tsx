import type { Metadata } from 'next';
import LegalPage from '../_components/LegalPage';
import styles from '../_components/legal-page.module.css';
import SmsOptInForm from './SmsOptInForm';

export const metadata: Metadata = {
  title: 'SMS Consent | The Kollective',
  description: 'SMS consent for The Kollective messaging program, legally sent by The Inner Circle LLC.',
};

export default function SmsConsentPage() {
  return (
    <LegalPage
      eyebrow="Messaging"
      title="SMS Consent"
      intro="The Inner Circle LLC is the legal sender for The Kollective SMS messaging program on this site. Text messaging is optional and begins only after a person provides a mobile number and gives clear, documented consent."
    >
      <section>
        <h2>Messaging identity</h2>
        <div className={styles.notice}>
          <p><strong>Legal SMS sender: The Inner Circle LLC</strong></p>
          <p><strong>Messaging program: The Kollective</strong></p>
          <p>Website: thekollectivehospitality.com</p>
        </div>
      </section>

      <section>
        <h2>What you may receive</h2>
        <p>Depending on the request you make, messages may include inquiry follow-up, booking or scheduling information, customer support, service updates, event information, promotions, special offers, and other marketing or informational communications from The Inner Circle LLC for The Kollective messaging program.</p>
      </section>

      <section>
        <h2>Required consent disclosure</h2>
        <div className={styles.notice}>
          <p><strong>By checking the SMS consent box, you agree to receive recurring informational and marketing text messages from The Inner Circle LLC, the legal sender for The Kollective messaging program, at the mobile number provided. Message frequency varies. Message and data rates may apply. Reply STOP to opt out and HELP for help. Consent is not a condition of purchase. Review our <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Service</a>.</strong></p>
        </div>
      </section>

      <section>
        <h2>Your choices</h2>
        <ul>
          <li>Reply STOP at any time to cancel text messages.</li>
          <li>Reply HELP for help or email <a href="mailto:thekollectivehospitality@gmail.com">thekollectivehospitality@gmail.com</a>.</li>
          <li>Declining or withdrawing SMS consent does not prevent you from making a purchase or requesting service through another available channel.</li>
        </ul>
      </section>

      <section>
        <h2>Opt in to SMS</h2>
        <p>Use this dedicated form only if you want text messages from The Inner Circle LLC for The Kollective messaging program. The consent checkbox is never pre-selected.</p>
        <SmsOptInForm />
      </section>

      <section>
        <h2>How consent is documented</h2>
        <p>Our SMS opt-in form records the consent language shown to you, the consent version, source page, opt-in time, and submission context. We do not use pre-checked consent or treat submission of a general form as automatic marketing consent.</p>
      </section>
    </LegalPage>
  );
}
