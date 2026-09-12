import { getCollectionProducts, formatPrice, cartAddUrl, productPageUrl, CART_ORIGIN } from '@/lib/shopify';
import type { ShopifyProduct } from '@/lib/shopify';

export const revalidate = 60;

export const metadata = {
  title: 'Shop The Kollective',
  description: 'Official merchandise from The Kollective Hospitality Group.',
};

const GOLD = '#d4b87a';
const CREAM = '#f6f0e4';
const MUTED = 'rgba(246,240,228,.58)';

export default async function KollectiveShopPage() {
  const raw = await getCollectionProducts('kollective-1', 80);
  const products = raw.filter((p) => Boolean(p.images?.[0]?.src && p.variants?.[0]?.id));

  return (
    <main style={{ minHeight: '100vh', background: '#050506', color: CREAM, fontFamily: 'DM Sans, sans-serif' }}>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: 20, padding: '18px 32px', background: 'rgba(5,5,6,.92)', backdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(212,184,122,.2)',
      }}>
        <a href="/" style={{ color: GOLD, textDecoration: 'none', fontFamily: 'DM Mono, monospace', letterSpacing: '.22em', fontSize: 11 }}>← THE KOLLECTIVE</a>
        <strong style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 500, letterSpacing: '.14em' }}>OFFICIAL MERCH</strong>
        <a href={`${CART_ORIGIN}/cart`} style={{ color: CREAM, textDecoration: 'none', border: `1px solid ${GOLD}`, padding: '9px 16px', fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '.2em' }}>BAG</a>
      </nav>

      <header style={{ maxWidth: 1380, margin: '0 auto', padding: '92px 36px 48px' }}>
        <div style={{ color: GOLD, fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: '.34em', textTransform: 'uppercase', marginBottom: 18 }}>The Kollective / Official Store</div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: 'clamp(52px,8vw,112px)', lineHeight: .86, margin: 0, maxWidth: 980 }}>
          THE ENTERPRISE,<br />WEARABLE.
        </h1>
        <p style={{ maxWidth: 620, color: MUTED, fontSize: 17, lineHeight: 1.6, marginTop: 28 }}>
          Official Kollective pieces only. Each product stays inside The Kollective identity while checkout and fulfillment run through BODEGA.
        </p>
      </header>

      <section style={{ maxWidth: 1380, margin: '0 auto', padding: '20px 36px 100px' }}>
        {products.length ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 36 }}>
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div style={{ border: '1px solid rgba(212,184,122,.25)', padding: 48, textAlign: 'center', color: MUTED }}>
            Kollective merchandise is being prepared for release.
          </div>
        )}
      </section>

      <footer style={{ borderTop: '1px solid rgba(212,184,122,.18)', padding: '36px', display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '.2em', color: MUTED }}>THE KOLLECTIVE HOSPITALITY GROUP</span>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <a href="https://doctordorsey.com/shop" style={{ color: GOLD, textDecoration: 'none', fontSize: 11 }}>DR. DORSEY SHOP</a>
          <a href="https://bodegabodegabodega.com/shop?brand=kollective-1" style={{ color: GOLD, textDecoration: 'none', fontSize: 11 }}>BODEGA</a>
        </div>
      </footer>
    </main>
  );
}

function ProductCard({ product }: { product: ShopifyProduct }) {
  const img = product.images?.[0]?.src;
  const variant = product.variants?.[0];

  return (
    <article style={{ minWidth: 0 }}>
      <a href={productPageUrl(product.handle)} style={{ display: 'block', aspectRatio: '1/1.12', background: '#111', overflow: 'hidden', textDecoration: 'none' }}>
        {img && <img src={img} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
      </a>
      <div style={{ paddingTop: 18 }}>
        <a href={productPageUrl(product.handle)} style={{ color: CREAM, textDecoration: 'none', fontFamily: 'Cormorant Garamond, serif', fontSize: 22, lineHeight: 1.2 }}>{product.title}</a>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginTop: 12 }}>
          <span style={{ color: GOLD, fontFamily: 'DM Mono, monospace', fontSize: 13 }}>{formatPrice(variant?.price)}</span>
          {variant?.id && (
            <a href={cartAddUrl(variant.id)} style={{ color: '#050506', background: GOLD, padding: '10px 14px', textDecoration: 'none', fontFamily: 'DM Mono, monospace', fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase' }}>Add to Bag</a>
          )}
        </div>
      </div>
    </article>
  );
}
