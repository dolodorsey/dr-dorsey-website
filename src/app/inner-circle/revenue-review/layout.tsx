import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Venue Revenue Review — The Inner Circle',
  description: 'Request a Venue Revenue Review from The Inner Circle and identify the highest-fit opportunities across guest traffic, space, media, food, beverage, commerce and underused operating capacity.',
  alternates: { canonical: 'https://innercircle.thekollectivehospitality.com/revenue-review' },
  openGraph: {
    title: 'Venue Revenue Review — The Inner Circle',
    description: 'Find the revenue already sitting inside your four walls.',
    url: 'https://innercircle.thekollectivehospitality.com/revenue-review',
    siteName: 'The Inner Circle',
    type: 'website',
  },
};

export default function RevenueReviewLayout({children}:{children:React.ReactNode}) {
  return children;
}
