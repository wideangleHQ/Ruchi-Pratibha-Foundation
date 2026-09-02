import ArtCulturePage from '@/modules/damdaar/ArtCulturePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Art & Culture | DUMDAAR ODIA | Ruchi Prativa Foundation',
  description:
    'Celebrate your talent and represent your culture. An opportunity to showcase the creativity, traditions and artistic spirit of Odisha.',
  openGraph: {
    title: 'Art & Culture | DUMDAAR ODIA | Ruchi Prativa Foundation',
    description:
      'Celebrate your talent and represent your culture. An opportunity to showcase the creativity, traditions and artistic spirit of Odisha.',
  },
};

export default function Page() {
  return <ArtCulturePage />;
}
