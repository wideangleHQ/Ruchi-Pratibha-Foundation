import type { Metadata } from 'next';
import { cormorantGaramond, manrope, spaceGrotesk } from '@/lib/fonts';
import { Providers } from '@/providers';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard | Ruchi Prativa Foundation',
    template: '%s | RPF Dashboard',
  },
  description: 'Admin dashboard for the Ruchi Prativa Foundation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorantGaramond.variable} ${manrope.variable} ${spaceGrotesk.variable} font-manrope antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
