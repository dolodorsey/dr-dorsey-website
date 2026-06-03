/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'dzlmtvodpyhetvektfuo.supabase.co' },
      { protocol: 'https', hostname: 'makeatlantagreatagain.myshopify.com' },
      { protocol: 'https', hostname: 'stushusa.myshopify.com' },
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
