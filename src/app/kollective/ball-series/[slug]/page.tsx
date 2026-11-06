import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BallDetail from '../../../ball-series/[slug]/BallDetail';
import { KOLLECTIVE_BALLS } from '../kollective-balls';

export const revalidate = 60;

export function generateStaticParams() {
  return KOLLECTIVE_BALLS.map((ball) => ({ slug: ball.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const ball = KOLLECTIVE_BALLS.find((item) => item.slug === params.slug);
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

export default function KollectiveBallPage({ params }: { params: { slug: string } }) {
  const ball = KOLLECTIVE_BALLS.find((item) => item.slug === params.slug);
  if (!ball) notFound();
  return <BallDetail ball={ball} related={KOLLECTIVE_BALLS} seasonLabel="2026" />;
}
