'use client';

import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Maximize2, X } from 'lucide-react';
import { CSR_GALLERY_ITEMS } from '../data/csrData';
import { InteractiveImage } from '@/components/ui/InteractiveImage';

const GALLERY_CATEGORIES = [
  'All',
  'Education',
  'Healthcare',
  'Environment',
  'Culture',
  'Community Welfare',
  'Youth Engagement',
];

export const CSRGallery: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<(typeof CSR_GALLERY_ITEMS)[0] | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(() => {
    if (selectedCat === 'All') return CSR_GALLERY_ITEMS;
    return CSR_GALLERY_ITEMS.filter((item) => item.category === selectedCat);
  }, [selectedCat]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / filteredItems.length;
    const scrollPos = container.scrollLeft;
    const index = Math.round(scrollPos / cardWidth);
    if (index >= 0 && index < filteredItems.length) {
      setActiveMobileIndex(index);
    }
  };

  const scrollToIndex = (idx: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / filteredItems.length;
    container.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth',
    });
    setActiveMobileIndex(idx);
  };

  return (
    <section
      id="csr-gallery"
      className="py-24 sm:py-32 bg-institutional-light dark:bg-institutional-surface/20 text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Visual Archives
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Moments from the Field
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            A visual archive showcasing community participation, healthcare outreach, educational initiatives, environmental campaigns, cultural programmes, and volunteer activities.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          <span className="text-[10px] font-space uppercase text-institutional-accent font-semibold shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>FILTER:</span>
          </span>
          {GALLERY_CATEGORIES.map((cat) => {
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

        {/* 1. DESKTOP & TABLET MASONRY GRID (hidden on mobile, grid on md+) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={() => setActiveLightboxItem(item)}
              className="group cursor-pointer"
            >
              <div className="w-full aspect-[4/3] rounded-sm overflow-hidden border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] p-2 shadow-md hover:shadow-xl hover:border-institutional-accent transition-all duration-300">
                <InteractiveImage className="w-full h-full rounded-sm">
                  <div className="w-full h-full flex flex-col justify-between p-5 relative bg-gradient-to-b from-institutional-surface/90 via-institutional-dark to-institutional-darker text-white">
                    <div className="flex items-center justify-between text-[10px] font-space text-institutional-accent uppercase tracking-widest border-b border-white/15 pb-2">
                      <span>{item.category}</span>
                      <span>{item.location}</span>
                    </div>

                    <div className="my-auto text-center py-4 px-2">
                      <span className="text-xs font-space uppercase tracking-[0.2em] text-institutional-accent font-semibold block mb-1">
                        [ Gallery Photo Placeholder ]
                      </span>
                      <h4 className="font-cormorant text-xl font-bold text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="font-manrope text-xs text-gray-300 line-clamp-2">
                        {item.caption}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/15 text-[9px] font-space text-gray-400 flex items-center justify-between">
                      <span>ITEM #{item.id}</span>
                      <span className="flex items-center gap-1 text-institutional-accent">
                        <Maximize2 className="w-3 h-3" /> View Photo
                      </span>
                    </div>
                  </div>
                </InteractiveImage>
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
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxItem(item)}
                className="w-[78vw] shrink-0 snap-center cursor-pointer rounded-sm overflow-hidden border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] p-2 shadow-none"
              >
                <InteractiveImage className="w-full h-full rounded-sm">
                  <div className="w-full aspect-[4/3] flex flex-col justify-between p-4 relative bg-gradient-to-b from-institutional-surface/90 via-institutional-dark to-institutional-darker text-white rounded-sm">
                    <div className="flex items-center justify-between text-[9px] font-space text-institutional-accent uppercase tracking-widest border-b border-white/15 pb-1.5">
                      <span>{item.category}</span>
                      <span>{item.location}</span>
                    </div>

                    <div className="my-auto text-center py-2 px-1">
                      <span className="text-[10px] font-space uppercase tracking-[0.2em] text-institutional-accent font-semibold block mb-1">
                        [ Photo Placeholder ]
                      </span>
                      <h4 className="font-cormorant text-lg font-bold text-white mb-1 leading-tight">
                        {item.title}
                      </h4>
                      <p className="font-manrope text-xs text-gray-300 line-clamp-2">
                        {item.caption}
                      </p>
                    </div>

                    <div className="pt-1.5 border-t border-white/15 text-[8px] font-space text-gray-400 flex items-center justify-between">
                      <span>ITEM #{item.id}</span>
                      <span className="flex items-center gap-1 text-institutional-accent">
                        <Maximize2 className="w-3 h-3" /> View Photo
                      </span>
                    </div>
                  </div>
                </InteractiveImage>
              </div>
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {filteredItems.map((item, idx) => {
              const active = activeMobileIndex === idx;
              return (
                <button
                  key={item.id}
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

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeLightboxItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightboxItem(null)}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-institutional-dark text-white max-w-3xl w-full rounded-sm border border-institutional-accent/40 shadow-2xl overflow-hidden p-6 sm:p-8 relative"
              >
                <button
                  onClick={() => setActiveLightboxItem(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <span className="text-xs font-space uppercase tracking-[0.2em] text-institutional-accent font-semibold block mb-2">
                  {activeLightboxItem.category} • {activeLightboxItem.location}
                </span>

                <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-white mb-4">
                  {activeLightboxItem.title}
                </h3>

                <div className="aspect-[16/9] w-full rounded bg-white/5 border border-white/15 p-6 flex flex-col justify-between mb-4 relative">
                  <div className="my-auto text-center">
                    <span className="text-sm font-space uppercase tracking-widest text-institutional-accent font-semibold block">
                      [ High-Resolution Archival Photograph ]
                    </span>
                    <p className="text-xs text-gray-400 mt-2">
                      TODO: Insert official photograph file from RPF media drive.
                    </p>
                  </div>
                </div>

                <p className="font-manrope text-sm text-gray-300 leading-relaxed mb-4">
                  {activeLightboxItem.caption}
                </p>

                <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs font-space text-gray-400">
                  <span>LOCATION: {activeLightboxItem.location}</span>
                  <span className="text-institutional-accent">RPF DIGITAL ARCHIVE</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
