import EntrepreneurshipPage from '@/modules/damdaar/EntrepreneurshipPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Entrepreneurship | DUMDAAR ODIA | Ruchi Prativa Foundation',
  description:
    'Turn your idea into an opportunity. Empowering visionary founders, innovators, and aspiring entrepreneurs across Odisha to turn ambitious ideas into impactful ventures.',
  openGraph: {
    title: 'Entrepreneurship | DUMDAAR ODIA | Ruchi Prativa Foundation',
    description:
      'Turn your idea into an opportunity. Empowering visionary founders, innovators, and aspiring entrepreneurs across Odisha to turn ambitious ideas into impactful ventures.',
  },
};

export default function Page() {
  return <EntrepreneurshipPage />;
}
