import { notFound } from 'next/navigation';
import WorldPage from '../WorldPage';
import { worlds } from '../worldData';

export function generateStaticParams() {
  return Object.keys(worlds).map((world) => ({ world }));
}

export default async function Page({ params }: { params: Promise<{ world: string }> }) {
  const { world } = await params;
  const data = worlds[world];
  if (!data) notFound();
  return <WorldPage world={data} />;
}
