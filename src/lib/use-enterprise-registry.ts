'use client';

import { useEffect, useState } from 'react';

type Brand = {
  name: string;
  category: string;
  logo?: string;
  href: string;
  status: string;
};

type RegistryEntity = {
  name?: string;
  short_description?: string;
  category?: string;
  logo_url?: string;
  primary_action_url?: string;
  website_url?: string;
  status?: string;
};

export function useEnterpriseRegistry(fallbackBrands: Brand[]) {
  const [brands, setBrands] = useState<Brand[]>(fallbackBrands);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch('/api/enterprise/registry?current_focus=true', { cache: 'no-store' });
        if (!response.ok) return;
        const payload = await response.json();
        if (!Array.isArray(payload?.entities) || payload.entities.length === 0 || cancelled) return;

        const normalized = payload.entities.map((entity: RegistryEntity) => ({
          name: entity.name || 'Enterprise Entity',
          category: entity.category || entity.short_description || 'The Kollective',
          logo: entity.logo_url || undefined,
          href: entity.primary_action_url || entity.website_url || '/access',
          status: entity.status || 'Active',
        }));

        setBrands(normalized);
      } catch {
        // The static registry remains visible whenever the managed directory is unavailable.
      }
    }

    load();
    return () => { cancelled = true; };
  }, [fallbackBrands]);

  return { brands };
}
