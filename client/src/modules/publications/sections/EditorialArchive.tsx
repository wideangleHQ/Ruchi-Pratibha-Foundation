'use client';

import React, { useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Filter, ArrowRight, Clock, User, Bookmark } from 'lucide-react';
import { EDITORIAL_ARTICLES } from '../data/publicationsData';

const ARTICLE_CATEGORIES = [
  'All',
  "Chairman's Messages",
  'Editorial Notes',
  "Governor's Messages",
  "Chief Minister's Messages",
  'Literary Essays',
];

export const EditorialArchive: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredArticles = useMemo(() => {
    if (selectedCat === 'All') return EDITORIAL_ARTICLES;
    return EDITORIAL_ARTICLES.filter((art) => art.category === selectedCat);
  }, [selectedCat]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / filteredArticles.length;
    const scrollPos = container.scrollLeft;
    const index = Math.round(scrollPos / cardWidth);
    if (index >= 0 && index < filteredArticles.length) {
      setActiveMobileIndex(index);
    }
  };

  const scrollToIndex = (idx: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / filteredArticles.length;
    container.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth',
    });
    setActiveMobileIndex(idx);
  };

  return (
    <section
      id="editorial"
      className="py-24 sm:py-32 bg-institutional-cream dark:bg-institutional-dark text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Discoverable Knowledge
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Editorial Archive
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Transforming buried publication content into discoverable essays, chairman addresses, dignitary messages, and forewords across three decades.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          <span className="text-[10px] font-space uppercase text-institutional-accent font-semibold shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>FILTER:</span>
          </span>
          {ARTICLE_CATEGORIES.map((cat) => {
            const active = selectedCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`text-[11px] font-space uppercase tracking-wider px-3.5 py-2 min-h-[38px] rounded-sm transition-all duration-200 shrink-0 cursor-pointer ${
                  active
                    ? 'bg-institutional-accent text-institutional-dark font-bold shadow-xs'
                    : 'bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-institutional-dark dark:text-gray-300 hover:border-institutional-accent/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {EDITORIAL_ARTICLES.length > 0 ? (
          <>
            {/* 1. DESKTOP & TABLET ARTICLE GRID (hidden on mobile, grid on md+) */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((art, idx) => (
                <motion.div
                  key={art.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <div className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 sm:p-7 hover:border-institutional-accent/50 transition-all duration-300 shadow-sm hover:shadow-md">
                    <div>
                      {/* Category & Reading Time */}
                      <div className="flex items-center justify-between text-[10px] font-space uppercase text-institutional-accent font-semibold border-b border-black/5 dark:border-white/5 pb-3 mb-4">
                        <span className="px-2 py-0.5 rounded bg-institutional-accent/15 border border-institutional-accent/30">
                          {art.category}
                        </span>
                        <span className="flex items-center gap-1 text-gray-400 font-normal">
                          <Clock className="w-3 h-3 text-institutional-accent" />
                          <span>{art.readingTime}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white mb-2 leading-snug">
                        {art.title}
                      </h3>

                      {/* Author & Source */}
                      <div className="flex items-center gap-2 text-xs font-space text-gray-500 dark:text-gray-400 mb-4">
                        <User className="w-3.5 h-3.5 text-institutional-accent" />
                        <span>{art.author}</span>
                        <span>•</span>
                        <span className="text-gray-400 truncate">{art.publicationTitle}</span>
                      </div>

                      {/* Preview */}
                      <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6">
                        {art.preview}
                      </p>
                    </div>

                    {/* Footer Action */}
                    <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-space text-institutional-accent font-semibold">
                      <a href="#digital-reader" className="inline-flex items-center gap-1 hover:underline">
                        <span>Read Full Article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                      <span className="text-[10px] font-space text-gray-400">
                        YEAR: {art.year}
                      </span>
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
                {filteredArticles.map((art) => (
                  <div
                    key={art.id}
                    className="w-[78vw] shrink-0 snap-center flex flex-col justify-between bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 shadow-none"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[9px] font-space uppercase text-institutional-accent font-semibold border-b border-black/5 dark:border-white/5 pb-2.5 mb-3">
                        <span className="px-2 py-0.5 rounded bg-institutional-accent/15 border border-institutional-accent/30">
                          {art.category}
                        </span>
                        <span className="flex items-center gap-1 text-gray-400 font-normal">
                          <Clock className="w-3 h-3 text-institutional-accent" />
                          <span>{art.readingTime}</span>
                        </span>
                      </div>

                      <h3 className="font-cormorant text-xl font-bold text-institutional-dark dark:text-white mb-2 leading-snug">
                        {art.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-[11px] font-space text-gray-500 dark:text-gray-400 mb-3">
                        <User className="w-3 h-3 text-institutional-accent" />
                        <span>{art.author}</span>
                      </div>

                      <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-4">
                        {art.preview}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-space text-institutional-accent font-semibold">
                      <a href="#digital-reader" className="inline-flex items-center gap-1 hover:underline min-h-[40px]">
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                      <span className="text-[9px] font-space text-gray-400">
                        {art.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Pagination Indicator Dots */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {filteredArticles.map((art, idx) => {
                  const active = activeMobileIndex === idx;
                  return (
                    <button
                      key={art.id}
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
            <Bookmark className="w-10 h-10 mx-auto text-institutional-accent mb-4 opacity-80" />
            <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300">
              Editorial articles will appear here as they are added to the digital archive.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
