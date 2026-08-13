import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Coming Soon - Pratibha Sanman | Ruchi Prativa Foundation',
  description: 'A dedicated experience for the Pratibha Sanman recognition programme is currently being prepared.',
};

export default function PratibhaSanmanComingSoon() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-institutional-cream dark:bg-institutional-dark text-institutional-dark dark:text-white px-6 sm:px-8 overflow-hidden selection:bg-institutional-accent selection:text-white">
      {/* Subtle geometric structural pattern overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none z-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(197, 160, 89, 0.25) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />
      
      <div className="relative z-10 max-w-xl w-full text-center flex flex-col items-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="h-[1px] w-8 bg-institutional-accent" />
          <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
            Coming Soon
          </span>
          <span className="h-[1px] w-8 bg-institutional-accent" />
        </div>

        {/* Heading */}
        <h1 className="font-cormorant text-4xl sm:text-6xl font-bold tracking-tight mb-6">
          Pratibha Sanman
        </h1>

        {/* Supporting text */}
        <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mb-10 leading-relaxed max-w-md">
          A dedicated experience for the Pratibha Sanman recognition programme is currently being prepared. Stay connected with us for updates.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3.5 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover transition-colors duration-200 rounded-sm shadow-md min-h-[44px]"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
