import BookLeadForm from '../_components/BookLeadForm';

const fields = [
  { name: 'full_name', label: 'Full Name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel', required: true },
  { name: 'organization', label: 'Organization / Company', required: true },
  { name: 'event_name', label: 'Event Name', required: true },
  { name: 'event_type', label: 'Request Type', type: 'select', required: true, options: ['Keynote','Panel','Workshop / Class','Interview / Podcast','Book Signing','Private Appearance','Other'] },
  { name: 'event_date', label: 'Event Date', type: 'date' },
  { name: 'city', label: 'City / Location', required: true },
  { name: 'budget_range', label: 'Budget Range', type: 'select', required: true, options: ['Under $2,500','$2,500–$5,000','$5,000–$10,000','$10,000–$25,000','$25,000+'] },
  { name: 'audience_size', label: 'Estimated Audience Size' },
  { name: 'details', label: 'Event Details and Requested Role', type: 'textarea', required: true },
];

export default function SpeakingPage() {
  return <BookLeadForm type="speaking" title="Speaking & Appearances" subtitle="Keynotes, panels, interviews, book signings and private appearances with Dr. Dorsey." icon="🎤" fields={fields} />;
}
