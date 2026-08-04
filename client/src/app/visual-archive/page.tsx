import { Metadata } from 'next';
import { VisualArchivePage } from '@/modules/archive/VisualArchivePage';

export const metadata: Metadata = {
  title: 'Visual Archive & Living Museum | Ruchi Prativa Foundation',
  description:
    'Explore three decades (1997–2026) of connected photographs, award convocations, video documentaries, newspaper press clippings, and community memories of Ruchi Prativa Foundation.',
  keywords: [
    'Visual Archive',
    'Living Museum',
    'Ruchi Prativa Foundation Photo Archive',
    'Sanman Convocations Gallery',
    'Documentary Centre',
    'Odisha Cultural Memory',
  ],
};

export default function VisualArchiveRoute() {
  return <VisualArchivePage />;
}
