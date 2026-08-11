'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ARCHIVE_COLLECTIONS } from '../data/archiveData';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

export const ExploreCollections: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -450, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 450, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="collections"
      className="py-24 sm:py-36 bg-institutional-dark text-white border-b border-white/10 overflow-hidden relative scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Header & Horizontal Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="h-[1px] w-8 bg-institutional-accent" />
              <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
                Section 03 • Curated Repositories
              </span>
            </div>
            <h2 className="font-cormorant text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Explore Archival Collections
            </h2>
            <p className="font-manrope text-sm sm:text-base text-gray-300 mt-2 max-w-2xl leading-relaxed">
              9 distinct collection panels capturing award convocations, printed journals, eco-restoration, and volunteer field operations.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={scrollLeft}
              aria-label="Scroll collections left"
              className="w-12 h-12 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-institutional-dark text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              aria-label="Scroll collections right"
              className="w-12 h-12 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-institutional-dark text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport-Filling Horizontal Snap-Scroll Gallery */}
        <div
          ref={scrollRef}
          className="w-[100vw] -ml-6 px-6 sm:-ml-8 sm:px-8 lg:-ml-12 lg:px-12 xl:-ml-16 xl:px-16 overflow-x-auto overflow-y-hidden scrollbar-none snap-x snap-mandatory flex gap-6 pt-2 pb-6 touch-pan-x"
        >
          {ARCHIVE_COLLECTIONS.map((col, idx) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="w-[85vw] sm:w-[50vw] lg:w-[32vw] shrink-0 snap-center"
            >
              <InteractiveCard className="flex flex-col justify-between h-full min-h-[480px] sm:min-h-[520px] bg-white/5 border border-white/15 rounded-sm p-6 sm:p-8 hover:border-institutional-accent/60 transition-all duration-300 group">
                <div>
                  {/* Top Badge & Count */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                    <span className="font-space text-[10px] uppercase tracking-widest text-institutional-accent font-semibold">
                      {col.category}
                    </span>
                    <span className="text-xs font-space font-semibold px-2.5 py-0.5 rounded bg-institutional-accent/15 text-institutional-accent border border-institutional-accent/30">
                      {col.count}+ Items
                    </span>
                  </div>

                  {/* Cover Image Placeholder */}
                  <div className="w-full aspect-[16/10] rounded-sm bg-gradient-to-br from-institutional-surface/90 via-institutional-dark to-institutional-darker border border-white/10 p-5 flex flex-col items-center justify-center text-center mb-6 overflow-hidden relative group-hover:border-institutional-accent/40 transition-colors">
                    <span className="text-[10px] font-space uppercase tracking-[0.25em] text-institutional-accent font-semibold block mb-1">
                      [ {col.coverImagePlaceholder} ]
                    </span>
                    <span className="text-[9px] font-space text-gray-400">
                      {col.featuredYears} Archives
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-institutional-accent transition-colors duration-300">
                    {col.title}
                  </h3>

                  <p className="font-manrope text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                    {col.description}
                  </p>

                  {/* Tag Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {col.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-space px-2.5 py-1 rounded bg-white/5 border border-white/10 text-gray-300"
                      >
                        • {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-space text-institutional-accent font-semibold">
                  <span>Explore Repository</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
