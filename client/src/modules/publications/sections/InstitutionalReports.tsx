'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import { INSTITUTIONAL_REPORTS } from '../data/publicationsData';

export const InstitutionalReports: React.FC = () => {
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / INSTITUTIONAL_REPORTS.length;
    const scrollPos = container.scrollLeft;
    const index = Math.round(scrollPos / cardWidth);
    if (index >= 0 && index < INSTITUTIONAL_REPORTS.length) {
      setActiveMobileIndex(index);
    }
  };

  const scrollToIndex = (idx: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / INSTITUTIONAL_REPORTS.length;
    container.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth',
    });
    setActiveMobileIndex(idx);
  };

  return (
    <section
      id="reports"
      className="py-24 sm:py-32 bg-institutional-light dark:bg-institutional-surface/20 text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
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
            Institutional Reports
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Access annual CSR reports, governance charters, financial statements, and cumulative 25-year social impact evaluations.
          </p>
        </div>

        {INSTITUTIONAL_REPORTS.length > 0 ? (
          <>
            {/* 1. DESKTOP & TABLET DOCUMENT GRID (hidden on mobile, grid on md+) */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {INSTITUTIONAL_REPORTS.map((rep, idx) => (
                <motion.div
                  key={rep.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <div className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 hover:border-institutional-accent/50 transition-all duration-300 shadow-sm hover:shadow-md">
                    <div>
                      {/* Icon & Category Header */}
                      <div className="flex items-center justify-between mb-4 border-b border-black/5 dark:border-white/5 pb-3">
                        <span className="font-space text-[10px] uppercase tracking-widest text-institutional-accent font-semibold">
                          {rep.category}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-institutional-accent/15 flex items-center justify-center text-institutional-accent">
                          <FileText className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Document Title */}
                      <h3 className="font-cormorant text-xl font-bold text-institutional-dark dark:text-white mb-2 leading-snug">
                        {rep.title}
                      </h3>

                      {/* Brief Summary */}
                      <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-4">
                        {rep.summary}
                      </p>

                      {/* Document Page & Year Metadata */}
                      <div className="text-[10px] font-space text-gray-500 dark:text-gray-400 mb-4 flex items-center justify-between border-t border-black/5 dark:border-white/5 pt-2">
                        <span>YEAR: {rep.year}</span>
                        <span>PAGES: {rep.pages}</span>
                      </div>
                    </div>

                    {/* Report Footer Actions */}
                    <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-space text-institutional-accent font-semibold">
                      <a href="#digital-reader" className="hover:underline">
                        Read Online
                      </a>
                      <a href={rep.pdfUrl} className="inline-flex items-center gap-1 hover:underline">
                        <span>PDF</span>
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
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
                {INSTITUTIONAL_REPORTS.map((rep) => (
                  <div
                    key={rep.id}
                    className="w-[78vw] shrink-0 snap-center flex flex-col justify-between bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 shadow-none"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-space text-[9px] uppercase tracking-widest text-institutional-accent font-semibold">
                          {rep.category}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-institutional-accent/15 flex items-center justify-center text-institutional-accent">
                          <FileText className="w-4 h-4" />
                        </div>
                      </div>

                      <h3 className="font-cormorant text-xl font-bold text-institutional-dark dark:text-white mb-2 leading-snug">
                        {rep.title}
                      </h3>

                      <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-4">
                        {rep.summary}
                      </p>

                      <div className="text-[9px] font-space text-gray-500 dark:text-gray-400 mb-3 flex items-center justify-between border-t border-black/5 dark:border-white/5 pt-2">
                        <span>YEAR: {rep.year}</span>
                        <span>PAGES: {rep.pages}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-space text-institutional-accent font-semibold min-h-[40px]">
                      <a href="#digital-reader" className="hover:underline">
                        Read Online
                      </a>
                      <a href={rep.pdfUrl} className="inline-flex items-center gap-1 hover:underline">
                        <span>PDF</span>
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Pagination Indicator Dots */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {INSTITUTIONAL_REPORTS.map((rep, idx) => {
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
          </>
        ) : (
          <div className="border border-dashed border-black/10 dark:border-white/10 rounded-sm p-12 text-center max-w-2xl mx-auto bg-white/40 dark:bg-white/5">
            <FileText className="w-10 h-10 mx-auto text-institutional-accent mb-4 opacity-80" />
            <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300">
              Institutional reports will appear here as they are added to the digital archive.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
