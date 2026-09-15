import type { Metadata } from 'next';
import LegalPage from '../_components/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service | The Kollective',
  description: 'Terms governing The Kollective website, services, and SMS messaging program legally sent by The Inner Circle LLC.',
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      intro="These terms govern your use of The Kollective websites, forms, communications, events, booking requests, and related services. The SMS messaging program described below is legally sent by The Inner Circle LLC."
    >
      <section>
        <h2>Using our services</h2>
        <p>You must provide accurate information, use our services lawfully, and avoid interfering with our websites, systems, staff, events, or other users. A submitted form or inquiry is a request for review and does not create a reservation, purchase, contract, admission, or approval unless we separately confirm it.</p>
      </section>

      <section>
        <h2>Bookings, purchases, and third-party services</h2>
        <p>Specific bookings, tickets, products, memberships, payments, or partner services may have additional terms shown at checkout or confirmation. Links to independently operated brands or third-party services are provided for convenience; their own terms and privacy practices apply.</p>
      </section>

      <section>
        <h2>SMS messaging terms</h2>
        <p><strong>Legal SMS sender: The Inner Circle LLC. Messaging program: The Kollective.</strong></p>
        <p>If you expressly opt in, The Inner Circle LLC may send recurring informational and marketing text messages for The Kollective messaging program about inquiries, bookings, services, events, customer care, updates, promotions, special offers, and related opportunities. Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase.</p>
        <p>Reply STOP to cancel. After a STOP request, you may receive one final confirmation message. Reply HELP for help or email <a href="mailto:thekollectivehospitality@gmail.com">thekollectivehospitality@gmail.com</a>. Carriers are not liable for delayed or undelivered messages. Your mobile carrier&apos;s terms also apply.</p>
        <p>SMS consent applies only to the messaging program and disclosures presented when you opt in. Mobile opt-in information and SMS consent are not sold, rented, or shared with third parties or affiliates for their own marketing or promotional purposes.</p>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>Our names, brands, graphics, media, written materials, designs, and software are owned by or licensed to the applicable rights holders and may not be copied, sold, or exploited without written permission, except for ordinary personal use of the service.</p>
      </section>

      <section>
        <h2>Disclaimers and limitation of liability</h2>
        <p>Services are provided on an “as available” basis to the extent permitted by law. We do not guarantee uninterrupted access, availability, event schedules, inventory, outcomes, or third-party performance. To the fullest extent permitted by law, the applicable service operator is not liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the services.</p>
      </section>

      <section>
        <h2>Changes and contact</h2>
        <p>We may update these terms by posting the revised terms on this page. Questions about the SMS program or these terms may be sent to <a href="mailto:thekollectivehospitality@gmail.com">thekollectivehospitality@gmail.com</a>.</p>
      </section>
    </LegalPage>
  );
}
