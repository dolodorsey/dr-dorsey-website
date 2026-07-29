import type { MetadataRoute } from 'next';

const paths = [
  '', '/kollective', '/kollective/entities', '/kollective/locations',
  '/kollective/careers', '/events', '/book', '/shop', '/brands',
  '/directory', '/access', '/contact', '/privacy', '/terms', '/accessibility',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `https://doctordorsey.com${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' || path === '/events' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/kollective' ? 0.9 : 0.7,
  }));
}
