'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { CSR_REPORTS } from '../data/csrData';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

export const CSRReports: React.FC = () => {
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / CSR_REPORTS.length;
    const scrollPos = container.scrollLeft;
    const index = Math.round(scrollPos / cardWidth);
    if (index >= 0 && index < CSR_REPORTS.length) {
      setActiveMobileIndex(index);
    }
  };

  const scrollToIndex = (idx: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / CSR_REPORTS.length;
    container.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth',
    });
    setActiveMobileIndex(idx);
  };

  return (
    <section
      id="csr-reports"
      className="py-24 sm:py-32 bg-institutional-cream dark:bg-institutional-dark text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Public Accountability
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Transparency &amp; Documentation
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Access reports, event summaries, newsletters, and supporting documentation related to our community initiatives.
          </p>
        </div>

        {/* 1. DESKTOP & TABLET GRID (hidden on mobile, grid on md+) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CSR_REPORTS.map((rep, idx) => (
            <motion.div
              key={rep.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <InteractiveCard className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 hover:border-institutional-accent/50 transition-all duration-300 shadow-sm hover:shadow-md">
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-institutional-accent/20 pb-2.5">
                    <span className="font-space text-[10px] uppercase tracking-widest text-institutional-accent font-semibold">
                      {rep.category}
                    </span>
                    <span className="font-space text-[8px] uppercase tracking-wider text-institutional-accent font-semibold border border-institutional-accent/30 px-2 py-0.5 rounded">
                      PDF DOCUMENT
                    </span>
                  </div>

                  <h3 className="font-cormorant text-xl font-bold text-institutional-dark dark:text-white mb-2">
                    {rep.title}
                  </h3>

                  <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-4">
                    {rep.summary}
                  </p>

                  <div className="text-[10px] font-space text-gray-500 dark:text-gray-400 mb-4 flex items-center justify-between border-t border-black/5 dark:border-white/5 pt-2">
                    <span>RECORD YEAR: {rep.year}</span>
                    <span>VERIFIED CHARTER</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-space text-institutional-accent font-semibold group/dl cursor-pointer min-h-[44px]">
                  <span className="truncate max-w-[170px] group-hover/dl:underline">
                    [PDF Download Placeholder]
                  </span>
                  <Download className="w-4 h-4 shrink-0 group-hover/dl:translate-y-0.5 transition-transform" />
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>

        {/* 2. MOBILE FULL-BLEED HORIZONTAL CAROUSEL (320px-480px, visible on md:hidden) */}
        <div className="block md:hidden">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="w-[100vw] -ml-6 px-6 overflow-x-auto overflow-y-hidden scrollbar-none snap-x snap-mandatory flex gap-4 pt-2 pb-4 touch-pan-x"
          >
            {CSR_REPORTS.map((rep) => (
              <div
                key={rep.id}
                className="w-[78vw] shrink-0 snap-center flex flex-col justify-between bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 shadow-none"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-institutional-accent/20 pb-2">
                    <span className="font-space text-[9px] uppercase tracking-widest text-institutional-accent font-semibold">
                      {rep.category}
                    </span>
                    <span className="font-space text-[8px] uppercase tracking-wider text-institutional-accent font-semibold border border-institutional-accent/30 px-2 py-0.5 rounded">
                      PDF
                    </span>
                  </div>

                  <h3 className="font-cormorant text-xl font-bold text-institutional-dark dark:text-white mb-2 leading-snug">
                    {rep.title}
                  </h3>

                  <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-4">
                    {rep.summary}
                  </p>

                  <div className="text-[9px] font-space text-gray-500 dark:text-gray-400 mb-3 flex items-center justify-between border-t border-black/5 dark:border-white/5 pt-2">
                    <span>RECORD YEAR: {rep.year}</span>
                    <span>VERIFIED</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-space text-institutional-accent font-semibold cursor-pointer min-h-[44px]">
                  <span className="truncate">
                    [PDF Download Placeholder]
                  </span>
                  <Download className="w-4 h-4 shrink-0 ml-2" />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {CSR_REPORTS.map((rep, idx) => {
              const active = activeMobileIndex === idx;
              return (
                <button
                  key={rep.id}
                  onClick={() => scrollToIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    active
                      ? 'w-6 h-2 bg-institutional-accent shadow-sm'
                      : 'w-2 h-2 bg-black/20 dark:bg-white/20 hover:bg-institutional-accent/50'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
