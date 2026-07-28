import BookLeadForm from '../_components/BookLeadForm';

const fields = [
  { name: 'full_name', label: 'Full Name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel', required: true },
  { name: 'organization', label: 'Organization / Company', required: true },
  { name: 'quantity', label: 'Estimated Quantity', type: 'select', required: true, options: ['10–24', '25–49', '50–99', '100–249', '250–499', '500+'] },
  { name: 'delivery_date', label: 'Requested Delivery Date', type: 'date' },
  { name: 'shipping_city', label: 'Shipping City', required: true },
  { name: 'shipping_state', label: 'Shipping State', required: true },
  { name: 'notes', label: 'Order Details', type: 'textarea' },
];

export default function BulkOrdersPage() {
  return <BookLeadForm type="bulk_orders" title="Bulk Book Orders" subtitle="Organizations, schools, teams, book clubs, and corporate orders for Hakuna Matata." icon="📚" fields={fields} />;
}
