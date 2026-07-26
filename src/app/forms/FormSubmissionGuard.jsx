'use client';

import { useEffect } from 'react';

const FORM_WEBHOOK = 'https://dorsey.app.n8n.cloud/webhook/khg-form-submit';

export default function FormSubmissionGuard({ children }) {
  useEffect(() => {
    const originalFetch = window.fetch.bind(window);

    window.fetch = async (input, init) => {
      const url = typeof input === 'string' ? input : input?.url || '';
      const response = await originalFetch(input, init);

      if (url === FORM_WEBHOOK && !response.ok) {
        const payload = await response.clone().json().catch(() => null);
        throw new Error(
          payload?.message ||
          payload?.error ||
          `Form submission failed with status ${response.status}`,
        );
      }

      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return children;
}
