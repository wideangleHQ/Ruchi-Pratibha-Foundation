'use client';

import React from 'react';
import { Quote } from 'lucide-react';

export const SignatureQuote: React.FC = () => {
  return (
    <section className="py-14 sm:py-28 bg-institutional-cream dark:bg-institutional-surface/30 text-institutional-dark dark:text-institutional-light border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden text-center">
      <div className="max-w-4xl mx-auto px-6 sm:px-6 lg:px-8">
        <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-institutional-accent/40 mx-auto mb-4 sm:mb-6" />

        <h2 className="font-cormorant text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white leading-tight mb-4 sm:mb-6">
          &ldquo;Recognizing excellence is the first step toward inspiring a better society.&rdquo;
        </h2>

        <div className="inline-flex items-center gap-3">
          <span className="h-[1px] w-6 sm:w-8 bg-institutional-accent" />
          <span className="font-space text-[10px] sm:text-xs uppercase tracking-[0.2em] text-institutional-accent font-semibold">
            Ruchi Prativa Foundation Philosophy
          </span>
          <span className="h-[1px] w-6 sm:w-8 bg-institutional-accent" />
        </div>
      </div>
    </section>
  );
};
