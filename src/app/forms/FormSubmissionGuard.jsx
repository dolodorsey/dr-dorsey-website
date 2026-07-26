'use client';

import { useEffect } from 'react';

const LEGACY_FORM_WEBHOOK = 'https://dorsey.app.n8n.cloud/webhook/khg-form-submit';
const DIRECT_FORM_ENDPOINT = '/api/forms/submit';

export default function FormSubmissionGuard({ children }) {
  useEffect(() => {
    const originalFetch = window.fetch.bind(window);

    window.fetch = async (input, init) => {
      const requestedUrl = typeof input === 'string' ? input : input?.url || '';
      const isLegacyFormRequest = requestedUrl === LEGACY_FORM_WEBHOOK;
      const response = await originalFetch(
        isLegacyFormRequest ? DIRECT_FORM_ENDPOINT : input,
        init,
      );

      if (isLegacyFormRequest) {
        const payload = await response.clone().json().catch(() => null);
        if (!response.ok || payload?.success !== true) {
          throw new Error(
            payload?.message ||
            payload?.error ||
            `Form submission failed with status ${response.status}`,
          );
        }
      }

      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return children;
}
