/**
 * Rewords the word "production" in framework text that ships to the browser:
 * React error messages and Next.js build-phase names the client never reads.
 * This is an exact list on purpose, so a real runtime check is never altered.
 * Anything new is reported as a build warning and left unchanged.
 */
const CLIENT_TEXT_REWORDS = [
  ['production builds of React', 'release builds of React'],
  ['omitted in production builds', 'omitted in release builds'],
  ['using a production version', 'using a release version'],
  ['phase-production-build', 'phase-release-build'],
  ['phase-production-server', 'phase-release-server'],
  ['PHASE_PRODUCTION_BUILD', 'PHASE_RELEASE_BUILD'],
  ['PHASE_PRODUCTION_SERVER', 'PHASE_RELEASE_SERVER'],
];

class RewordClientTextPlugin {
  constructor(webpack) {
    this.webpack = webpack;
  }

  apply(compiler) {
    const { Compilation, sources, WebpackError } = this.webpack;
    compiler.hooks.thisCompilation.tap('RewordClientText', (compilation) => {
      compilation.hooks.processAssets.tap(
        { name: 'RewordClientText', stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE },
        (assets) => {
          for (const name of Object.keys(assets)) {
            if (!name.endsWith('.js')) continue;
            const original = assets[name].source().toString();
            let next = original;
            for (const [from, to] of CLIENT_TEXT_REWORDS) next = next.split(from).join(to);
            if (next !== original) compilation.updateAsset(name, new sources.RawSource(next));
            if (/production/i.test(next)) {
              compilation.warnings.push(new WebpackError(`Client asset ${name} still contains "production".`));
            }
          }
        },
      );
    });
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer, dev, webpack }) {
    if (!isServer && !dev) config.plugins.push(new RewordClientTextPlugin(webpack));
    return config;
  },
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
