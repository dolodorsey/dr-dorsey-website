/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'dzlmtvodpyhetvektfuo.supabase.co' },
      // Bodega storefront (custom domain + Shopify CDN for product images)
      { protocol: 'https', hostname: 'bodegabodegabodega.com' },
      { protocol: 'https', hostname: 'www.bodegabodegabodega.com' },
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'bodgeaworldwide.myshopify.com' },
    ],
  },
  async redirects() {
    return [
      // Keep secondary Ops OS domain from becoming a split-source dashboard.
      {
        source: '/ops-os',
        has: [{ type: 'host', value: 'thedoctordorsey.com' }],
        destination: 'https://dr-dorsey-website.vercel.app/ops-os',
        permanent: false,
      },
      {
        source: '/ops-os/:path*',
        has: [{ type: 'host', value: 'thedoctordorsey.com' }],
        destination: 'https://dr-dorsey-website.vercel.app/ops-os/:path*',
        permanent: false,
      },
      {
        source: '/ops-os',
        has: [{ type: 'host', value: 'www.thedoctordorsey.com' }],
        destination: 'https://dr-dorsey-website.vercel.app/ops-os',
        permanent: false,
      },
      {
        source: '/ops-os/:path*',
        has: [{ type: 'host', value: 'www.thedoctordorsey.com' }],
        destination: 'https://dr-dorsey-website.vercel.app/ops-os/:path*',
        permanent: false,
      },
      // drdorseyevents.com root -> /events
      {
        source: '/',
        has: [{ type: 'host', value: 'drdorseyevents.com' }],
        destination: 'https://doctordorsey.com/events',
        permanent: true,
      },
      {
        source: '/',
        has: [{ type: 'host', value: 'www.drdorseyevents.com' }],
        destination: 'https://doctordorsey.com/events',
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
