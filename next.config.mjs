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
      // There is one canonical operations dashboard. Keep the public sites and
      // worker APIs on this project, but send every legacy Ops OS page to the
      // matching page in KHG Command Center.
      {
        source: '/ops-os',
        destination: 'https://thedoctordorsey.com/',
        permanent: true,
      },
      {
        source: '/ops-os/:path*',
        destination: 'https://thedoctordorsey.com/:path*',
        permanent: true,
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
