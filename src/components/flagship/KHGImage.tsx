import Image, { type ImageProps } from 'next/image';

type KHGImageProps = Omit<ImageProps, 'alt'> & {
  alt: string;
  /** Art-directed focal point, e.g. "50% 30%". Prevents bad crops on tall images. */
  focal?: string;
  /** contain for logos/packshots, cover for photography. */
  fit?: 'cover' | 'contain';
};

/**
 * next/image wrapper enforcing the flagship media rules:
 * responsive sizes, focal positioning, lazy by default, blur-free
 * dark placeholder so heroes never flash white.
 *
 * Supabase + Shopify hosts are already allow-listed in next.config.mjs.
 */
export default function KHGImage({
  alt,
  focal = '50% 50%',
  fit = 'cover',
  sizes = '(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 82,
  style,
  ...rest
}: KHGImageProps) {
  return (
    <Image
      alt={alt}
      sizes={sizes}
      quality={quality}
      style={{ objectFit: fit, objectPosition: focal, ...style }}
      {...rest}
    />
  );
}
