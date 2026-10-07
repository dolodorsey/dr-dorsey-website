import BookLeadForm from '../_components/BookLeadForm';

const fields = [
  { name: 'full_name', label: 'Full Name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel', required: true },
  { name: 'organization', label: 'Book Club / Organization Name', required: true },
  { name: 'member_count', label: 'Number of Readers', type: 'select', required: true, options: ['Under 10', '10–24', '25–49', '50–99', '100+'] },
  { name: 'format', label: 'Discussion Format', type: 'select', required: true, options: ['In person', 'Virtual', 'Either'] },
  { name: 'requested_date', label: 'Preferred Discussion Date', type: 'date' },
  { name: 'city', label: 'City / Location', required: true },
  { name: 'notes', label: 'What would you like from the session?', type: 'textarea' },
];

export default function BookClubPage() {
  return <BookLeadForm type="book_club" title="Book Clubs" subtitle="Bring Hakuna Matata to your book club — group reading, discussion sessions, and Dr. Dorsey appearances." icon="📖" fields={fields} />;
}
