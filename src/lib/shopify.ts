// Dr. Dorsey Shop — public Shopify JSON endpoints (no token needed).
// Fetches from bodgeaworldwide.myshopify.com canonical host (JSON reliable).
// Checkout links ALSO use bodgeaworldwide.myshopify.com — the custom domain
// bodegabodegabodega.com is currently pointed at a legacy Kalles/Halloween theme.
// TODO: reconnect bodegabodegabodega.com to bodgeaworldwide store in Shopify Admin,
// then flip CHECKOUT_HOST back.

const FETCH_HOST = 'bodgeaworldwide.myshopify.com';
const CHECKOUT_HOST = 'bodgeaworldwide.myshopify.com';
const FETCH_ORIGIN = `https://${FETCH_HOST}`;
export const CART_ORIGIN = `https://${CHECKOUT_HOST}`;

export type ShopifyProduct = {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  vendor: string;
  product_type: string;
  tags: string[];
  images: Array<{ id: number; src: string; alt?: string; width?: number; height?: number }>;
  variants: Array<{ id: number; title: string; price: string; compare_at_price?: string; available?: boolean }>;
};

async function fetchJson<T = unknown>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${FETCH_ORIGIN}${path}`, {
      headers: {
        'User-Agent': 'DorseyShop/1.0',
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error(`[shopify] ${res.status}: ${path}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error(`[shopify] fetch error`, err);
    return null;
  }
}

/** Get products from a specific collection by handle. */
export async function getCollectionProducts(handle: string, limit = 30): Promise<ShopifyProduct[]> {
  const data = await fetchJson<{ products: ShopifyProduct[] }>(
    `/collections/${handle}/products.json?limit=${limit}`
  );
  return data?.products ?? [];
}

/** Get a single product by handle. */
export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await fetchJson<{ product: ShopifyProduct }>(`/products/${handle}.json`);
  return data?.product ?? null;
}

/** Format a numeric price string as USD. Shows cents if non-zero, whole dollars otherwise. */
export function formatPrice(price: string | number): string {
  const n = typeof price === 'string' ? parseFloat(price) : price;
  if (Number.isNaN(n)) return '';
  // Show cents when they matter (e.g. $44.44), whole dollars when clean (e.g. $85)
  return '$' + (n % 1 === 0 ? n.toFixed(0) : n.toFixed(2));
}

/** Build a cart deep-link that opens Bodega checkout at the custom domain. */
export function cartAddUrl(variantId: number | string, quantity = 1): string {
  return `${CART_ORIGIN}/cart/${variantId}:${quantity}`;
}

/** Direct link to product page on the storefront (branded custom domain). */
export function productPageUrl(handle: string): string {
  return `${CART_ORIGIN}/products/${handle}`;
}

/** Pick a secondary image for hover/gallery. */
export function altImage(p: ShopifyProduct): string | null {
  return p.images?.[1]?.src ?? p.images?.[0]?.src ?? null;
}
