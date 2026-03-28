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
