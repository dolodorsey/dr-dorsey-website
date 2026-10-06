import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

const KOLLECTIVE_HOSTS = new Set([
  'thekollectivehospitality.com',
  'www.thekollectivehospitality.com',
]);

const INNER_CIRCLE_HOSTS = new Set([
  'innercircle.thekollectivehospitality.com',
  'houstatlantavegas.com',
  'www.houstatlantavegas.com',
]);

function requestHost() {
  return (headers().get('host') || '').split(':')[0].toLowerCase();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const host = requestHost();
  const isInnerCircle = INNER_CIRCLE_HOSTS.has(host);
  const isKollective = KOLLECTIVE_HOSTS.has(host);
  const site = isInnerCircle
    ? 'https://innercircle.thekollectivehospitality.com'
    : isKollective
      ? 'https://thekollectivehospitality.com'
      : 'https://doctordorsey.com';

  if (isInnerCircle) {
    return [
      { url: site, lastModified: now, changeFrequency: 'weekly', priority: 1 },
      { url: `${site}/revenue-review`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ];
  }

  if (isKollective) {
    return [
      { url: site, lastModified: now, changeFrequency: 'weekly', priority: 1 },
      { url: `${site}/events`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
      { url: `${site}/shop`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
      { url: `${site}/app`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
      { url: `${site}/access`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
      { url: `${site}/team`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
      { url: `${site}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
      { url: `${site}/terms`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    ];
  }

  return [
    { url: site, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${site}/companies`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${site}/directory`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${site}/events`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${site}/kollective`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${site}/access`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site}/links`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${site}/author/dr-dorsey`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site}/insights`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${site}/insights/shared-infrastructure-independent-brands`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site}/press`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${site}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];
}
