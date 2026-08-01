import type { Metadata } from 'next';
import { cormorantGaramond, manrope, spaceGrotesk } from '@/core/fonts';
import { ReactQueryProvider } from '@/core/providers/query-provider';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Ruchi Prativa Foundation | Institutional Platform',
  description: 'Celebrating Excellence. Empowering Communities. Inspiring Generations. Official digital identity of the Ruchi Prativa Foundation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${manrope.variable} ${spaceGrotesk.variable}`}
    >
      <body className="font-manrope antialiased bg-institutional-light text-institutional-dark selection:bg-institutional-accent selection:text-white">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
