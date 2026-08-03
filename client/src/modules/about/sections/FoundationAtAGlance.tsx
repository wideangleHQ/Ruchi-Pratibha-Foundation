'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const FoundationAtAGlance: React.FC = () => {
  const stats = [
    { value: '1997', label: 'Established Year' },
    { value: '28+', label: 'Years of Legacy' },
    { value: '1', label: 'Annual Flagship Recognition', sub: '(Ruchi Prativa Sanman)' },
    { value: '2', label: 'Institutional Publications', sub: 'Amaruchi & Prativayana' },
    { value: '1', label: 'Registered Charitable Trust' },
  ];

  return (
    <section className="py-20 sm:py-28 bg-institutional-cream dark:bg-institutional-dark text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden">
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.2em] font-space text-institutional-accent font-semibold">
              Verified Institutional Metrics
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Foundation At A Glance
          </h2>
          <p className="font-manrope text-sm text-institutional-mutedLight dark:text-gray-300 mt-2.5">
            Key verified milestones reflecting nearly three decades of dedicated service.
          </p>
        </div>

        {/* 5 Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {stats.map((st, idx) => (
            <motion.div
              key={st.label}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="flex flex-col items-center justify-center text-center p-5 rounded-sm bg-white/60 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 hover:border-institutional-accent/40 transition-all duration-300 min-h-[140px]"
            >
              <span className="font-space text-4xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white mb-2 leading-none tabular-nums">
                {st.value}
              </span>
              <span className="font-manrope text-xs sm:text-sm font-semibold text-institutional-dark dark:text-gray-200 leading-snug">
                {st.label}
              </span>
              {st.sub && (
                <span className="font-manrope text-[10px] sm:text-xs text-institutional-accent font-medium mt-1">
                  {st.sub}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
