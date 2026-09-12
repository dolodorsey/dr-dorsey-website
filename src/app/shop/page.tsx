import { getCollectionProducts, formatPrice, cartAddUrl, productPageUrl, CART_ORIGIN } from '@/lib/shopify';
import type { ShopifyProduct } from '@/lib/shopify';

export const revalidate = 60;

export const metadata = {
  title: 'The Shop — Dr. Dorsey',
  description: 'Hakuna Matata by Dr. Dorsey. Capsule 01: The Architect. The Kollective essentials.',
};

const GOLD = '#D4B87A';
const GB = '#E8D5A3';

const renderable = (p: ShopifyProduct) => Boolean(p.images?.[0]?.src && p.variants?.[0]?.id);

async function loadProducts() {
  const [dorseyRaw, kollectiveRaw] = await Promise.all([
    getCollectionProducts('dr-dorsey', 40),
    getCollectionProducts('kollective-1', 60),
  ]);

  const dorsey = dorseyRaw.filter(renderable);
  const kollective = kollectiveRaw.filter(renderable);

  const bookHero = dorsey.find(p =>
    p.tags?.some(t => t.trim() === 'brand:the_book') || /hakuna|matata/i.test(p.title)
  ) || null;
  const dorseyPieces = dorsey.filter(p => p.id !== bookHero?.id);

  return { bookHero, dorseyPieces, kollective };
}

export default async function ShopPage() {
  const { bookHero, dorseyPieces, kollective } = await loadProducts();

  return (
    <main style={{ background: '#060607', color: '#F5EFE0', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif' }}>
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24,
        padding: '20px 40px', borderBottom: '1px solid rgba(212,184,122,0.2)',
        position: 'sticky', top: 0, background: 'rgba(6,6,7,0.92)', backdropFilter: 'blur(20px)', zIndex: 50,
      }}>
        <a href="/" style={{
          fontFamily: 'DM Mono, monospace', fontSize: 12, letterSpacing: '0.3em',
          color: GB, textDecoration: 'none', textTransform: 'uppercase',
        }}>← Dr. Dorsey</a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <a href="#dorsey" style={{ color: GB, textDecoration: 'none', fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Dorsey</a>
          <a href="#kollective" style={{ color: GB, textDecoration: 'none', fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Kollective</a>
        </div>
        <a href={`${CART_ORIGIN}/cart`} style={{
          fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: '0.3em',
          color: GB, textDecoration: 'none', textTransform: 'uppercase',
          border: `1px solid ${GOLD}`, padding: '10px 22px',
        }}>Bag</a>
      </nav>

      <section id="dorsey">
        {bookHero && (
          <section style={{
            padding: '100px 40px 80px', maxWidth: 1400, margin: '0 auto',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 80, alignItems: 'center',
          }}>
            <div style={{ position: 'relative', aspectRatio: '3/4', background: '#0d0d10' }}>
              {bookHero.images?.[0] && (
                <img src={bookHero.images[0].src} alt={bookHero.title} style={{
                  width: '100%', height: '100%', objectFit: 'contain', padding: 20,
                }} />
              )}
            </div>
            <div>
              <div style={{
                fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: '0.4em',
                color: GOLD, textTransform: 'uppercase', marginBottom: 24,
              }}>The Book · By Dr. Dorsey</div>
              <h1 style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(48px, 6vw, 88px)',
                fontWeight: 400, lineHeight: 0.95, marginBottom: 32, letterSpacing: '-0.02em',
              }}>{bookHero.title}</h1>
              <div style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontStyle: 'italic',
                lineHeight: 1.5, marginBottom: 40, color: 'rgba(245,239,224,0.75)',
              }}>
                Live for today, plan for tomorrow, party tonight. The mindset that built an empire — in your hands.
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', marginBottom: 32 }}>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 32, color: GOLD, letterSpacing: '0.05em' }}>
                  {formatPrice(bookHero.variants[0]?.price)}
                </div>
                <a href={cartAddUrl(bookHero.variants[0]?.id)} style={{
                  background: GOLD, color: '#060607', padding: '18px 44px', fontFamily: 'DM Mono, monospace',
                  fontSize: 12, fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', textDecoration: 'none',
                }}>Add to Bag</a>
                <a href={productPageUrl(bookHero.handle)} style={{
                  color: GB, fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: '0.3em',
                  textDecoration: 'none', textTransform: 'uppercase', borderBottom: `1px solid ${GOLD}`, paddingBottom: 2,
                }}>Read more →</a>
              </div>
            </div>
          </section>
        )}

        {dorseyPieces.length > 0 && (
          <ProductSection eyebrow="Dr. Dorsey · Capsule 01" title="The Architect." products={dorseyPieces} />
        )}
      </section>

      <section id="kollective" style={{ borderTop: '1px solid rgba(212,184,122,0.2)' }}>
        <ProductSection
          eyebrow="The Kollective · Official Merch"
          title="The enterprise, wearable."
          products={kollective}
          emptyCopy="Kollective products are being prepared for release."
        />
        <div style={{ textAlign: 'center', padding: '0 40px 80px' }}>
          <a href="https://thekollectivehospitality.com/shop" style={{
            display: 'inline-block', color: '#060607', background: GOLD, padding: '16px 32px',
            fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', textDecoration: 'none',
          }}>Enter The Kollective Shop →</a>
        </div>
      </section>

      <footer style={{
        padding: '80px 40px 40px', borderTop: '1px solid rgba(212,184,122,0.2)', marginTop: 20,
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: 32, letterSpacing: '0.2em',
          color: GOLD, textTransform: 'uppercase', marginBottom: 24,
        }}>DR. DORSEY</div>
        <div style={{ fontSize: 12, color: 'rgba(245,239,224,0.4)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.2em' }}>
          A KOLLECTIVE HOSPITALITY GROUP BRAND · POWERED BY BODEGA
        </div>
        <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32, fontSize: 11, fontFamily: 'DM Mono, monospace', letterSpacing: '0.2em' }}>
          <a href={`${CART_ORIGIN}/pages/contact`} style={{ color: GB, textDecoration: 'none' }}>CONTACT</a>
          <a href={`${CART_ORIGIN}/policies/shipping-policy`} style={{ color: GB, textDecoration: 'none' }}>SHIPPING</a>
          <a href={`${CART_ORIGIN}/policies/refund-policy`} style={{ color: GB, textDecoration: 'none' }}>RETURNS</a>
          <a href="/" style={{ color: GB, textDecoration: 'none' }}>THE EMPIRE</a>
        </div>
      </footer>
    </main>
  );
}

function ProductSection({ eyebrow, title, products, emptyCopy = 'Products coming soon.' }: { eyebrow: string; title: string; products: ShopifyProduct[]; emptyCopy?: string }) {
  return (
    <section style={{ padding: '80px 40px', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ marginBottom: 48, textAlign: 'center' }}>
        <div style={{
          fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: '0.4em',
          color: GOLD, textTransform: 'uppercase', marginBottom: 20,
        }}>{eyebrow}</div>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 5vw, 64px)',
          fontWeight: 400, lineHeight: 1, letterSpacing: '-0.01em',
        }}>{title}</h2>
      </div>
      {products.length > 0 ? (
        <div style={{ display: 'grid', gap: 40, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <p style={{ textAlign: 'center', fontFamily: 'DM Mono, monospace', letterSpacing: '0.12em', color: 'rgba(245,239,224,.55)' }}>{emptyCopy}</p>
      )}
    </section>
  );
}

function ProductCard({ product }: { product: ShopifyProduct }) {
  const img = product.images?.[0]?.src;
  const variant = product.variants?.[0];
  const price = variant?.price;
  const variantId = variant?.id;
  const comingSoon = product.tags?.some(tag => tag.trim() === 'status:coming_soon') || variant?.available === false;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <a href={productPageUrl(product.handle)} style={{ display: 'block', aspectRatio: '3/4', background: '#0d0d10', overflow: 'hidden', textDecoration: 'none', position: 'relative' }}>
        {img && <img src={img} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        {comingSoon && (
          <span style={{ position: 'absolute', left: 16, top: 16, padding: '8px 10px', background: 'rgba(6,6,7,.88)', border: `1px solid ${GOLD}`, color: GOLD, fontFamily: 'DM Mono, monospace', fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase' }}>Coming Soon</span>
        )}
      </a>
      <div style={{ padding: '20px 4px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <a href={productPageUrl(product.handle)} style={{ color: '#F5EFE0', textDecoration: 'none', fontFamily: 'Cormorant Garamond, serif', fontSize: 20, letterSpacing: '0.01em' }}>{product.title}</a>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, color: GOLD, letterSpacing: '0.05em' }}>{formatPrice(price)}</span>
          {comingSoon ? (
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.3em', color: 'rgba(245,239,224,.55)', textTransform: 'uppercase' }}>Coming Soon</span>
          ) : variantId ? (
            <a href={cartAddUrl(variantId)} style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.3em', color: GB, textDecoration: 'none', textTransform: 'uppercase', borderBottom: `1px solid ${GOLD}`, paddingBottom: 2 }}>Add →</a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
