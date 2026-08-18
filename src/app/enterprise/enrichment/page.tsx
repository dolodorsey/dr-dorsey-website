import ContactEnrichmentDashboard from "./ContactEnrichmentDashboard";
import "./enrichment.css";

export const metadata = {
  title: "Contact Enrichment | KHG Enterprise",
  description: "Live phone and email enrichment coverage, yield, provenance, and queue health.",
};

export default function ContactEnrichmentPage() {
  return <ContactEnrichmentDashboard />;
}
