import { redirect } from 'next/navigation';
import { DomainDetailsPage } from '@/modules/damdaar/domain/DomainDetailsPage';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  if (slug === 'technology') {
    return {
      title: 'Project NIRMAN | Technology Innovation Competition | DUMDAAR ODIA',
      description: 'Discover the Idea. Build the Future. The official Technology wing initiative under DUMDAAR ODIA.',
    };
  }
  const capitalized = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  return {
    title: `${capitalized} | DUMDAAR ODIA Domain | Ruchi Prativa Foundation`,
    description: `Explore details and register under the ${capitalized} domain of the DUMDAAR ODIA campaign.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  if (slug === 'technology') {
    redirect('/damdaar-odia/project-nirman');
  }
  return <DomainDetailsPage slug={slug} />;
}
