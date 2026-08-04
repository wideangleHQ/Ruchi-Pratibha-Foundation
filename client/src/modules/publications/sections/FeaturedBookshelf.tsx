'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Download, Book } from 'lucide-react';
import { FEATURED_PUBLICATIONS } from '../data/publicationsData';

export const FeaturedBookshelf: React.FC = () => {
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / FEATURED_PUBLICATIONS.length;
    const scrollPos = container.scrollLeft;
    const index = Math.round(scrollPos / cardWidth);
    if (index >= 0 && index < FEATURED_PUBLICATIONS.length) {
      setActiveMobileIndex(index);
    }
  };

  const scrollToIndex = (idx: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / FEATURED_PUBLICATIONS.length;
    container.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth',
    });
    setActiveMobileIndex(idx);
  };

  return (
    <section
      id="featured-publications"
      className="py-24 sm:py-32 bg-institutional-cream dark:bg-institutional-dark text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Digital Bookshelf
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Featured Publications
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Curated volumes naturally arranged on our institutional digital bookshelf. Inspect metadata, read online, or download archival PDF records.
          </p>
        </div>

        {/* 1. DESKTOP & TABLET BOOKSHELF GRID (hidden on mobile, grid on md+) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {FEATURED_PUBLICATIONS.map((pub, idx) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 sm:p-7 hover:border-institutional-accent/50 transition-all duration-300 shadow-sm hover:shadow-xl group"
            >
              <div>
                {/* Book Cover Placeholder Container with Lift Hover */}
                <div className="w-full aspect-[16/10] rounded-sm overflow-hidden border border-black/10 dark:border-white/10 mb-6 relative group-hover:-translate-y-2 transition-transform duration-500 shadow-md">
                  <div
                    className="w-full h-full flex flex-col justify-between p-5 relative text-white"
                    style={{ backgroundColor: pub.coverBg }}
                  >
                    {/* Spine Shadow Overlay */}
                    <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/80 to-transparent border-r border-white/20 z-20 pointer-events-none" />

                    <div className="relative z-10 flex items-center justify-between text-[10px] font-space uppercase tracking-widest border-b border-white/15 pb-2">
                      <span className="text-institutional-accent font-semibold">{pub.category}</span>
                      <span className="text-gray-300">{pub.year}</span>
                    </div>

                    <div className="relative z-10 my-auto text-center py-3">
                      <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-90 text-institutional-accent group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-space uppercase tracking-[0.2em] text-institutional-accent font-semibold block mb-1">
                        [ Hardcover Cover Placeholder ]
                      </span>
                      <h3 className="font-cormorant text-xl font-bold text-white mb-1">
                        {pub.title}
                      </h3>
                      {pub.subtitle && (
                        <p className="font-cormorant italic text-xs text-institutional-accent/90">
                          {pub.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="relative z-10 pt-2 border-t border-white/15 text-[9px] font-space text-gray-400 flex justify-between">
                      <span>PAGES: {pub.pages}</span>
                      <span>LANG: {pub.language}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold mb-2">
                  <span>{pub.category} • {pub.volume || pub.year}</span>
                  <span className="text-gray-400 font-normal">{pub.pages} PAGES</span>
                </div>

                <h3 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white mb-2 leading-snug">
                  {pub.title}
                </h3>

                <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6">
                  {pub.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-6">
                  {pub.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-space px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-institutional-dark dark:text-gray-200"
                    >
                      • {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-space gap-2">
                <a
                  href="#digital-reader"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-institutional-accent text-institutional-dark font-semibold rounded-sm hover:bg-institutional-accentHover transition-colors"
                >
                  <Book className="w-3.5 h-3.5" />
                  <span>Read Online</span>
                </a>

                <a
                  href={pub.pdfUrl}
                  className="inline-flex items-center gap-1.5 px-3 py-2 border border-black/10 dark:border-white/10 text-institutional-dark dark:text-gray-200 font-semibold rounded-sm hover:border-institutional-accent transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-institutional-accent" />
                  <span>PDF</span>
                </a>
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
            {FEATURED_PUBLICATIONS.map((pub) => (
              <div
                key={pub.id}
                className="w-[78vw] shrink-0 snap-center flex flex-col justify-between bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 shadow-none"
              >
                <div>
                  <div className="w-full aspect-[16/10] rounded-sm overflow-hidden border border-black/10 dark:border-white/10 mb-4 relative shadow-sm">
                    <div
                      className="w-full h-full flex flex-col justify-between p-4 relative text-white"
                      style={{ backgroundColor: pub.coverBg }}
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/80 to-transparent border-r border-white/20 z-20 pointer-events-none" />

                      <div className="relative z-10 flex items-center justify-between text-[9px] font-space uppercase tracking-widest border-b border-white/15 pb-1.5">
                        <span className="text-institutional-accent font-semibold">{pub.category}</span>
                        <span className="text-gray-300">{pub.year}</span>
                      </div>

                      <div className="relative z-10 my-auto text-center py-2">
                        <BookOpen className="w-6 h-6 mx-auto mb-1 text-institutional-accent opacity-90" />
                        <span className="text-[10px] font-space uppercase tracking-[0.2em] text-institutional-accent font-semibold block mb-0.5">
                          [ Hardcover Cover ]
                        </span>
                        <h3 className="font-cormorant text-lg font-bold text-white mb-0.5 leading-tight">
                          {pub.title}
                        </h3>
                      </div>

                      <div className="relative z-10 pt-1.5 border-t border-white/15 text-[8px] font-space text-gray-400 flex justify-between">
                        <span>PAGES: {pub.pages}</span>
                        <span>LANG: {pub.language}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[9px] font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-1">
                    {pub.category} • {pub.year}
                  </span>
                  <h3 className="font-cormorant text-xl font-bold text-institutional-dark dark:text-white mb-2 leading-snug">
                    {pub.title}
                  </h3>
                  <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-4">
                    {pub.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-space gap-2">
                  <a
                    href="#digital-reader"
                    className="inline-flex items-center gap-1 px-3 py-2 bg-institutional-accent text-institutional-dark font-semibold rounded-sm min-h-[40px]"
                  >
                    <Book className="w-3.5 h-3.5" />
                    <span>Read</span>
                  </a>

                  <a
                    href={pub.pdfUrl}
                    className="inline-flex items-center gap-1 px-3 py-2 border border-black/10 dark:border-white/10 text-institutional-dark dark:text-gray-200 font-semibold rounded-sm min-h-[40px]"
                  >
                    <Download className="w-3.5 h-3.5 text-institutional-accent" />
                    <span>PDF</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {FEATURED_PUBLICATIONS.map((pub, idx) => {
              const active = activeMobileIndex === idx;
              return (
                <button
                  key={pub.id}
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
