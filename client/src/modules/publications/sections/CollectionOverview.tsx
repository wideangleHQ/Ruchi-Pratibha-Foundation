'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Bookmark } from 'lucide-react';

const COLLECTIONS = [
  {
    id: 'col-amaruchi',
    title: 'Amaruchi',
    subtitle: 'Literary Journal & Cultural Anthology',
    tags: ['Culture', 'Society', 'History'],
    description:
      'A celebrated anthology compiling critical essays, poetry, and research papers from Odisha’s premier literary figures, young scholars, and cultural historians.',
    volumeInfo: 'Published Annually Since 1997',
    coverBg: '#1B1722',
    accentColor: '#C5A059',
  },
  {
    id: 'col-prativayana',
    title: 'Prativayana',
    subtitle: 'Institutional Archive & Legacy',
    tags: ['Foundation History', 'Award Legacy', 'Leadership'],
    description:
      'Documenting three decades of grassroots social initiatives, rural transformation, and educational milestones spearheaded by the Ruchi Prativa Foundation.',
    volumeInfo: 'Silver Jubilee & Special Issues',
    coverBg: '#2A1E17',
    accentColor: '#D4AF37',
  },
  {
    id: 'col-reports',
    title: 'Annual Reports',
    subtitle: 'Institutional Reports & Transparency',
    tags: ['Governance', 'Activities', 'Transparency'],
    description:
      'Comprehensive financial, operational, and community impact reports detailing the Foundation’s governance policies, audited statements, and field drives.',
    volumeInfo: 'Public Accountability Records',
    coverBg: '#231818',
    accentColor: '#E65C5C',
  },
  {
    id: 'col-souvenirs',
    title: 'Souvenirs',
    subtitle: 'Commemorative Editions & Milestones',
    tags: ['Special Events', 'Milestones', 'Dignitary Letters'],
    description:
      'Special edition souvenirs published during landmark Foundation anniversaries, featuring felicitation messages from state governors, scholars, and founding trustees.',
    volumeInfo: 'Commemorative Archives',
    coverBg: '#1A2321',
    accentColor: '#4E9F86',
  },
];

export const CollectionOverview: React.FC = () => {
  const [activeOpenId, setActiveOpenId] = useState<string | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (id: string) => {
    setActiveOpenId((prev) => (prev === id ? null : id));
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / COLLECTIONS.length;
    const scrollPos = container.scrollLeft;
    const index = Math.round(scrollPos / cardWidth);
    if (index >= 0 && index < COLLECTIONS.length) {
      setActiveMobileIndex(index);
    }
  };

  const scrollToIndex = (idx: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / COLLECTIONS.length;
    container.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth',
    });
    setActiveMobileIndex(idx);
  };

  return (
    <section
      id="pub-collection"
      className="py-24 sm:py-32 bg-institutional-light dark:bg-institutional-surface/20 text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Archival Categories
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Explore Our Collection
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Four primary publication pillars preserving Odisha&apos;s literary heritage, institutional history, governance transparency, and commemorative milestones. Hover or tap each volume to inspect its contents.
          </p>
        </div>

        {/* 1. DESKTOP & TABLET 4-CARD GRID (hidden on mobile, grid on md+) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {COLLECTIONS.map((col, idx) => {
            const isOpen = activeOpenId === col.id;

            return (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="w-full flex justify-center"
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  aria-label={`${col.title} Collection`}
                  onClick={() => handleCardClick(col.id)}
                  className="group relative w-full min-h-[460px] rounded-sm transition-all duration-500 focus:outline-none [perspective:1400px]"
                >
                  {/* Inside Revealed Page */}
                  <div className="absolute inset-0 z-10 w-full h-full rounded-sm bg-[#FDFBF7] dark:bg-[#121824] border border-institutional-accent/30 p-6 flex flex-col justify-between shadow-lg overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center justify-between border-b border-institutional-accent/20 pb-3 mb-4">
                        <span className="font-space text-[10px] uppercase tracking-widest text-institutional-accent font-semibold flex items-center gap-1.5">
                          <Bookmark className="w-3.5 h-3.5 text-institutional-accent" />
                          <span>COLLECTION PREVIEW</span>
                        </span>
                        <span className="font-space text-[9px] text-gray-400">RPF LIBRARY</span>
                      </div>

                      <h3 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white mb-2">
                        {col.title}
                      </h3>

                      <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-4">
                        {col.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <span className="text-[9px] font-space uppercase tracking-widest text-institutional-accent font-semibold block">
                          THEMATIC TAGS
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {col.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[9px] font-space px-2 py-0.5 rounded bg-institutional-accent/10 border border-institutional-accent/20 text-institutional-dark dark:text-gray-200"
                            >
                              • {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 pt-3 border-t border-institutional-accent/20 flex items-center justify-between">
                      <a
                        href="#featured-publications"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs font-space uppercase tracking-wider text-institutional-accent hover:text-institutional-dark dark:hover:text-white font-semibold transition-colors duration-200"
                      >
                        <span>Read Online</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                      <span className="text-[9px] font-space text-gray-400">[ ARCHIVE ]</span>
                    </div>
                  </div>

                  {/* Front Cover Layer */}
                  <div
                    className={`absolute inset-0 z-20 w-full h-full rounded-sm bg-[#0F1420] text-white border border-white/15 p-5 flex flex-col justify-between shadow-2xl transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu origin-left group-hover:[transform:rotateY(-108deg)] ${
                      isOpen ? '[transform:rotateY(-108deg)]' : '[transform:rotateY(0deg)]'
                    }`}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-3.5 bg-gradient-to-r from-black/80 via-black/40 to-transparent border-r border-institutional-accent/40 z-30 pointer-events-none rounded-l-sm" />

                    <div className="relative z-10 h-full border border-institutional-accent/30 rounded-xs p-5 flex flex-col justify-between bg-[radial-gradient(ellipse_at_top_right,rgba(197,160,89,0.12),transparent_70%)]">
                      <div className="flex items-center justify-between border-b border-institutional-accent/25 pb-3">
                        <span className="font-cormorant text-xl font-bold text-institutional-accent tracking-widest">
                          VOL. 0{idx + 1}
                        </span>
                        <span className="font-space text-[9px] uppercase tracking-[0.2em] text-institutional-accent font-semibold">
                          EST. 1997
                        </span>
                      </div>

                      <div className="my-auto py-4">
                        <span className="text-[10px] font-space uppercase tracking-[0.2em] text-institutional-accent font-semibold block mb-2">
                          PUBLICATION PILLAR
                        </span>
                        <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-2">
                          {col.title}
                        </h3>
                        <div className="w-12 h-[1px] bg-institutional-accent/50 mb-3" />
                        <p className="font-cormorant italic text-xs text-institutional-accent/90">
                          {col.subtitle}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-institutional-accent/25 flex items-center justify-between text-[10px] font-space text-gray-300">
                        <span className="flex items-center gap-1.5 text-institutional-accent font-semibold uppercase tracking-widest">
                          <Sparkles className="w-3 h-3 text-institutional-accent animate-pulse" />
                          <span>{isOpen ? 'Close Cover' : 'Hover / Tap to Open'}</span>
                        </span>
                        <span className="text-gray-400">RPF COLLECTION</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 2. MOBILE FULL-BLEED HORIZONTAL CAROUSEL (320px-480px, visible on md:hidden) */}
        <div className="block md:hidden">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="w-[100vw] -ml-6 px-6 overflow-x-auto overflow-y-hidden scrollbar-none snap-x snap-mandatory flex gap-4 pt-4 pb-6 touch-pan-x"
          >
            {COLLECTIONS.map((col, idx) => {
              const isOpen = activeOpenId === col.id;

              return (
                <div
                  key={col.id}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  aria-label={`${col.title} Collection`}
                  onClick={() => handleCardClick(col.id)}
                  className="w-[76vw] shrink-0 snap-center relative h-[460px] rounded-sm transition-all duration-500 focus:outline-none [perspective:1400px]"
                >
                  {/* Inside Page */}
                  <div className="absolute inset-0 z-10 w-full h-full rounded-sm bg-[#FDFBF7] dark:bg-[#121824] border border-institutional-accent/30 p-6 flex flex-col justify-between shadow-none overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center justify-between border-b border-institutional-accent/20 pb-2.5 mb-3">
                        <span className="font-space text-[10px] uppercase tracking-widest text-institutional-accent font-semibold flex items-center gap-1.5">
                          <Bookmark className="w-3.5 h-3.5 text-institutional-accent" />
                          <span>PREVIEW</span>
                        </span>
                        <span className="font-space text-[9px] text-gray-400">RPF LIBRARY</span>
                      </div>

                      <h3 className="font-cormorant text-xl font-bold text-institutional-dark dark:text-white mb-2">
                        {col.title}
                      </h3>

                      <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-3">
                        {col.description}
                      </p>

                      <div className="space-y-1.5 mb-3">
                        <span className="text-[9px] font-space uppercase tracking-widest text-institutional-accent font-semibold block">
                          THEMATIC TAGS
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {col.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[9px] font-space px-2 py-0.5 rounded bg-institutional-accent/10 border border-institutional-accent/20 text-institutional-dark dark:text-gray-200"
                            >
                              • {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 pt-3 border-t border-institutional-accent/20 flex items-center justify-between">
                      <a
                        href="#featured-publications"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[11px] font-space uppercase tracking-wider text-institutional-accent font-semibold"
                      >
                        <span>Read Online</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                      <span className="text-[9px] font-space text-gray-400">RPF</span>
                    </div>
                  </div>

                  {/* Front Cover Layer */}
                  <div
                    className={`absolute inset-0 z-20 w-full h-full rounded-sm bg-[#0F1420] text-white border border-white/15 p-5 flex flex-col justify-between shadow-none transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu origin-left ${
                      isOpen ? '[transform:rotateY(-108deg)]' : '[transform:rotateY(0deg)]'
                    }`}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/80 to-transparent border-r border-institutional-accent/40 z-30 pointer-events-none rounded-l-sm" />

                    <div className="relative z-10 h-full border border-institutional-accent/30 rounded-xs p-4 flex flex-col justify-between bg-[radial-gradient(ellipse_at_top_right,rgba(197,160,89,0.12),transparent_70%)]">
                      <div className="flex items-center justify-between border-b border-institutional-accent/25 pb-2.5">
                        <span className="font-cormorant text-lg font-bold text-institutional-accent tracking-widest">
                          VOL. 0{idx + 1}
                        </span>
                        <span className="font-space text-[8px] uppercase tracking-[0.2em] text-institutional-accent font-semibold">
                          EST. 1997
                        </span>
                      </div>

                      <div className="my-auto py-3">
                        <span className="text-[9px] font-space uppercase tracking-[0.2em] text-institutional-accent font-semibold block mb-1.5">
                          PUBLICATION PILLAR
                        </span>
                        <h3 className="font-cormorant text-xl font-bold text-white tracking-tight leading-snug mb-1.5">
                          {col.title}
                        </h3>
                        <div className="w-10 h-[1px] bg-institutional-accent/50 mb-2" />
                        <p className="font-cormorant italic text-xs text-institutional-accent/90">
                          {col.subtitle}
                        </p>
                      </div>

                      <div className="pt-2.5 border-t border-institutional-accent/25 flex items-center justify-between text-[9px] font-space text-gray-300">
                        <span className="flex items-center gap-1 text-institutional-accent font-semibold uppercase tracking-widest">
                          <Sparkles className="w-3 h-3 text-institutional-accent animate-pulse" />
                          <span>{isOpen ? 'Close' : 'Tap to Open'}</span>
                        </span>
                        <span className="text-gray-400">RPF COLLECTION</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {COLLECTIONS.map((col, idx) => {
              const active = activeMobileIndex === idx;
              return (
                <button
                  key={col.id}
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
