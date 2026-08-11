'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FEATURED_CSR_ACTIVITIES } from '../data/csrData';
import { InteractiveCard } from '@/components/ui/InteractiveCard';
import { InteractiveImage } from '@/components/ui/InteractiveImage';

export const FeaturedCSR: React.FC = () => {
  const featured = FEATURED_CSR_ACTIVITIES.slice(0, 3);
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / featured.length;
    const scrollPos = container.scrollLeft;
    const index = Math.round(scrollPos / cardWidth);
    if (index >= 0 && index < featured.length) {
      setActiveMobileIndex(index);
    }
  };

  const scrollToIndex = (idx: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / featured.length;
    container.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth',
    });
    setActiveMobileIndex(idx);
  };

  return (
    <section
      id="featured-csr"
      className="py-24 sm:py-32 bg-institutional-light dark:bg-institutional-surface/20 text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Flagship Initiatives
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Featured Community Initiatives
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Highlighting key welfare programs that demonstrate our commitment to long-term social progress across Odisha.
          </p>
        </div>

        {/* 1. DESKTOP & TABLET GRID (hidden on mobile, grid on md+) */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {featured.map((act, idx) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <InteractiveCard className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 sm:p-7 hover:border-institutional-accent/50 transition-all duration-300 shadow-md hover:shadow-xl">
                <div>
                  <div className="w-full aspect-[16/10] rounded-sm overflow-hidden border border-black/10 dark:border-white/10 mb-6 group relative bg-black/5 dark:bg-white/5">
                    <InteractiveImage className="w-full h-full rounded-sm relative">
                      {act.coverImage ? (
                        <>
                          <Image
                            src={act.coverImage}
                            alt={act.title}
                            fill
                            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                            sizes="(max-w-768px) 100vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-85 pointer-events-none z-10" />
                          <div className="absolute inset-0 p-5 flex flex-col justify-between text-white z-10">
                            <div className="flex items-center justify-between text-[10px] font-space text-institutional-accent uppercase tracking-widest border-b border-white/15 pb-2">
                              <span className="px-2 py-0.5 rounded bg-institutional-accent/15 border border-institutional-accent/30 font-semibold">{act.category}</span>
                              <span>{act.year}</span>
                            </div>
                            <div className="pt-2 border-t border-white/15 text-[9px] font-space text-gray-300 flex justify-between">
                              <span>FEATURED RECORD</span>
                              <span>RPF IMPACT ARCHIVE</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col justify-between p-5 relative bg-gradient-to-b from-institutional-surface/90 via-institutional-dark to-institutional-darker text-white">
                          <div className="flex items-center justify-between text-[10px] font-space text-institutional-accent uppercase tracking-widest border-b border-white/15 pb-2">
                            <span>{act.category}</span>
                            <span>{act.year}</span>
                          </div>

                          <div className="my-auto text-center py-3">
                            <span className="text-xs font-space uppercase tracking-[0.2em] text-institutional-accent font-semibold block mb-1">
                              [ Feature Image Placeholder ]
                            </span>
                            <p className="font-manrope text-xs text-gray-300">
                              {act.location}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-white/15 text-[9px] font-space text-gray-400 flex justify-between">
                            <span>FEATURED RECORD</span>
                            <span>RPF IMPACT ARCHIVE</span>
                          </div>
                        </div>
                      )}
                    </InteractiveImage>
                  </div>

                  <span className="text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-1">
                    {act.category} • {act.district}
                  </span>
                  <h3 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white mb-3">
                    {act.title}
                  </h3>
                  <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6">
                    {act.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-space text-institutional-accent font-semibold">
                  <a href="#csr-archive" className="inline-flex items-center gap-1 hover:underline">
                    <span>Explore Archive Item</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
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
            {featured.map((act) => (
              <div
                key={act.id}
                className="w-[78vw] shrink-0 snap-center flex flex-col justify-between bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 shadow-none"
              >
                <div>
                  <div className="w-full aspect-[16/10] rounded-sm overflow-hidden border border-black/10 dark:border-white/10 mb-4 relative bg-black/5 dark:bg-white/5">
                    <InteractiveImage className="w-full h-full rounded-sm relative">
                      {act.coverImage ? (
                        <>
                          <Image
                            src={act.coverImage}
                            alt={act.title}
                            fill
                            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                            sizes="78vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-85 pointer-events-none z-10" />
                          <div className="absolute inset-0 p-4 flex flex-col justify-between text-white z-10">
                            <div className="flex items-center justify-between text-[9px] font-space text-institutional-accent uppercase tracking-widest border-b border-white/15 pb-1.5">
                              <span className="px-1.5 py-0.5 rounded bg-institutional-accent/15 border border-institutional-accent/30 font-semibold">{act.category}</span>
                              <span>{act.year}</span>
                            </div>
                            <div className="pt-1.5 border-t border-white/15 text-[8px] font-space text-gray-300 flex justify-between">
                              <span>FEATURED RECORD</span>
                              <span>RPF IMPACT</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col justify-between p-4 relative bg-gradient-to-b from-institutional-surface/90 via-institutional-dark to-institutional-darker text-white">
                          <div className="flex items-center justify-between text-[9px] font-space text-institutional-accent uppercase tracking-widest border-b border-white/15 pb-1.5">
                            <span>{act.category}</span>
                            <span>{act.year}</span>
                          </div>

                          <div className="my-auto text-center py-2">
                            <span className="text-[10px] font-space uppercase tracking-[0.2em] text-institutional-accent font-semibold block mb-1">
                              [ Feature Image Placeholder ]
                            </span>
                            <p className="font-manrope text-[11px] text-gray-300">
                              {act.location}
                            </p>
                          </div>

                          <div className="pt-1.5 border-t border-white/15 text-[8px] font-space text-gray-400 flex justify-between">
                            <span>FEATURED RECORD</span>
                            <span>RPF IMPACT</span>
                          </div>
                        </div>
                      )}
                    </InteractiveImage>
                  </div>

                  <span className="text-[9px] font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-1">
                    {act.category} • {act.district}
                  </span>
                  <h3 className="font-cormorant text-xl font-bold text-institutional-dark dark:text-white mb-2 leading-snug">
                    {act.title}
                  </h3>
                  <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-4">
                    {act.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-space text-institutional-accent font-semibold">
                  <a href="#csr-archive" className="inline-flex items-center gap-1 hover:underline">
                    <span>Explore Archive Item</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {featured.map((act, idx) => {
              const active = activeMobileIndex === idx;
              return (
                <button
                  key={act.id}
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
