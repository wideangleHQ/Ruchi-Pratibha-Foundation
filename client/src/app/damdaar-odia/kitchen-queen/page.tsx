import KitchenQueenPage from '@/modules/damdaar/KitchenQueenPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Global Odia Kitchen Queen Contest | Ruchi Masala | DUMDAAR ODIA',
  description:
    'An online cooking contest celebrating Odia food, creativity and the love for Odisha — wherever you are in the world.',
  openGraph: {
    title: 'Global Odia Kitchen Queen Contest | Ruchi Masala | DUMDAAR ODIA',
    description:
      'Cook. Create. Represent Odia. Separate India and Overseas winners with Puri trips, trophies, and Amazon vouchers.',
  },
};

export default function Page() {
  return <KitchenQueenPage />;
}
