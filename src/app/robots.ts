import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/ops-os/', '/enterprise/', '/os/'] },
    ],
    sitemap: 'https://doctordorsey.com/sitemap.xml',
  };
}
