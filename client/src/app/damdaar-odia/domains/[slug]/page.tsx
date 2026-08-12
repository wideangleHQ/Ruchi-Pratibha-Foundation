import { DomainDetailsPage } from '@/modules/damdaar/domain/DomainDetailsPage';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
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
  return <DomainDetailsPage slug={slug} />;
}
