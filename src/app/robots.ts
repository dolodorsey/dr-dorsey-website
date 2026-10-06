import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

const KOLLECTIVE_HOSTS = new Set([
  'thekollectivehospitality.com',
  'www.thekollectivehospitality.com',
]);

function siteUrl() {
  const host = (headers().get('host') || '').split(':')[0].toLowerCase();
  return KOLLECTIVE_HOSTS.has(host)
    ? 'https://thekollectivehospitality.com'
    : 'https://doctordorsey.com';
}

export default function robots(): MetadataRoute.Robots {
  const site = siteUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${site}/sitemap.xml`,
    host: site,
  };
}
