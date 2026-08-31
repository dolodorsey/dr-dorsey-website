import type { Metadata } from 'next';
import LegalPage from '../_components/LegalPage';
import styles from '../_components/legal-page.module.css';
import SmsOptInForm from './SmsOptInForm';

export const metadata: Metadata = {
  title: 'SMS Consent | The Kollective',
  description: 'How customers can opt in to text messages from Kollective Hospitality Texas.',
};

export default function SmsConsentPage() {
  return (
    <LegalPage
      eyebrow="Messaging"
      title="SMS Consent"
      intro="Text messaging is optional. Kollective Hospitality Texas sends messages only after a person provides a mobile number and gives clear consent through an approved form, conversation, keyword, or other documented opt-in method."
    >
      <section>
        <h2>What you may receive</h2>
        <p>Depending on the request you make, messages may include inquiry follow-up, booking or scheduling information, customer support, service updates, event information, promotions, or special offers from Kollective Hospitality Texas.</p>
      </section>

      <section>
        <h2>Required consent disclosure</h2>
        <div className={styles.notice}>
          <p><strong>By checking the SMS consent box on a Kollective Hospitality Texas form, you agree to receive recurring informational and marketing text messages from Kollective Hospitality Texas at the number provided. Message frequency varies. Message and data rates may apply. Reply STOP to opt out and HELP for help. Consent is not a condition of purchase. Review our <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Service</a>.</strong></p>
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
        <p>Use this form only if you want text messages from Kollective Hospitality Texas. The SMS checkbox is optional to your relationship with us and is never pre-selected.</p>
        <SmsOptInForm />
      </section>

      <section>
        <h2>How consent is documented</h2>
        <p>Our approved forms display an unchecked SMS consent control next to the disclosure above and link to the Privacy Policy and Terms of Service. We retain appropriate consent records, including the source and time of opt-in. We do not use pre-checked consent or treat submission of a general form as automatic marketing consent.</p>
      </section>
    </LegalPage>
  );
}
