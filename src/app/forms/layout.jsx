import FormSubmissionGuard from './FormSubmissionGuard';

export default function FormsLayout({ children }) {
  return <FormSubmissionGuard>{children}</FormSubmissionGuard>;
}
