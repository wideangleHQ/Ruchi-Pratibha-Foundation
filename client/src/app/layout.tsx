import type { Metadata } from 'next';
import { cormorantGaramond, manrope, spaceGrotesk, playfairDisplay, poppins, hatalekha } from '@/core/fonts';
import { ReactQueryProvider } from '@/core/providers/query-provider';
import { ThemeProvider } from '@/core/providers/theme-provider';
import { PageTransitionProvider } from '@/core/providers/page-transition-provider';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Ruchi Prativa Foundation | Institutional Platform',
  description: 'Celebrating Excellence. Empowering Communities. Inspiring Generations. Official digital identity of the Ruchi Prativa Foundation.',
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorantGaramond.variable} ${manrope.variable} ${spaceGrotesk.variable} ${playfairDisplay.variable} ${poppins.variable} ${hatalekha.variable}`}
    >
      <body className="font-manrope antialiased bg-institutional-light dark:bg-institutional-dark text-institutional-dark dark:text-institutional-light selection:bg-institutional-accent selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <ReactQueryProvider>
            <PageTransitionProvider>{children}</PageTransitionProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
