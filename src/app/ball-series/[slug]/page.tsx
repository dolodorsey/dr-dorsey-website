import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BALLS, getBallConfig } from '@/lib/ball-series';
import BallDetail from './BallDetail';

export const revalidate = 60;

export function generateStaticParams() {
  return BALLS.map((ball) => ({ slug: ball.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const ball = getBallConfig(params.slug);
  if (!ball) return {};
  return {
    title: `${ball.title}: ${ball.name} — The Ball Series`,
    description: ball.description,
    alternates: { canonical: `https://thekollectivehospitality.com/ball-series/${ball.slug}` },
    openGraph: {
      title: `${ball.title}: ${ball.name}`,
      description: `${ball.date} · ${ball.year} · Atlanta. ${ball.dress}.`,
      images: [{ url: ball.animation.poster }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${ball.title}: ${ball.name}`,
      description: `${ball.date} · ${ball.year} · Atlanta.`,
      images: [ball.animation.poster],
    },
  };
}

export default function BallDetailPage({ params }: { params: { slug: string } }) {
  const ball = getBallConfig(params.slug);
  if (!ball) notFound();
  return <BallDetail ball={ball} related={BALLS} />;
}
