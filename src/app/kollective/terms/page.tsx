import type { Metadata } from 'next';
import LegalPage from '../_components/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service | The Kollective',
  description: 'Terms governing The Kollective website, services, and messaging program.',
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      intro="These terms govern your use of The Kollective websites, forms, communications, events, booking requests, and related services operated by Kollective Hospitality Texas."
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
        <p>If you expressly opt in, Kollective Hospitality Texas may send text messages about your inquiry, bookings, services, events, customer care, updates, promotions, and offers. Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase.</p>
        <p>Reply STOP to cancel. After a STOP request, you may receive one final confirmation message. Reply HELP for help or email <a href="mailto:thekollectivehospitality@gmail.com">thekollectivehospitality@gmail.com</a>. Carriers are not liable for delayed or undelivered messages. Your mobile carrier&apos;s terms also apply.</p>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>Our names, brands, graphics, media, written materials, designs, and software are owned by or licensed to us and may not be copied, sold, or exploited without written permission, except for ordinary personal use of the service.</p>
      </section>

      <section>
        <h2>Disclaimers and limitation of liability</h2>
        <p>Services are provided on an “as available” basis to the extent permitted by law. We do not guarantee uninterrupted access, availability, event schedules, inventory, outcomes, or third-party performance. To the fullest extent permitted by law, Kollective Hospitality Texas is not liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the services.</p>
      </section>

      <section>
        <h2>Changes, governing law, and contact</h2>
        <p>We may update these terms by posting a revised effective date. These terms are governed by applicable United States and Texas law, without regard to conflict-of-law principles.</p>
        <p>Questions may be sent to <a href="mailto:thekollectivehospitality@gmail.com">thekollectivehospitality@gmail.com</a> or Kollective Hospitality Texas, 2811 Washington Ave, Houston, TX 77007.</p>
      </section>
    </LegalPage>
  );
}
