'use client';

import { useEffect, useMemo, useState } from 'react';
import type { BrandCard } from '@/lib/enterprise';
import type { RegistryEntity } from '@/lib/kollective-public';

function toBrandCard(entity: RegistryEntity): BrandCard {
  const primary = entity.destinations?.find((destination) => destination.is_primary) || entity.destinations?.[0];

  return {
    name: entity.name,
    category: entity.category || entity.short_description || '',
    logo: entity.logo_url || undefined,
    heroUrl: entity.hero_url || undefined,
    href: entity.id.startsWith('fallback-') && primary?.fallback_url
      ? primary.fallback_url
      : `/go/${entity.slug}?source=enterprise_registry`,
    status: entity.status_label || entity.status,
    actionLabel: primary?.action_label || 'Explore',
    destinationType: (primary?.destination_type || 'web') as BrandCard['destinationType'],
  };
}

export function useEnterpriseRegistry(fallback: BrandCard[]) {
  const [entities, setEntities] = useState<RegistryEntity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/enterprise/registry?current_focus=true', { cache: 'no-store', signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Registry request failed: ${response.status}`);
        return response.json();
      })
      .then((payload) => setEntities(Array.isArray(payload.entities) ? payload.entities : []))
      .catch((error) => {
        if (error?.name !== 'AbortError') console.error('enterprise_registry_client_failed', error);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const brands = useMemo(() => (entities.length ? entities.map(toBrandCard) : fallback), [entities, fallback]);
  return { brands, loading, entities };
}
