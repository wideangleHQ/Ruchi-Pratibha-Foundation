'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Search } from 'lucide-react';
import { ARCHIVE_HERO_SLIDES } from '../data/archiveData';

interface ArchiveHeroProps {
  onOpenSearch?: () => void;
}

export const ArchiveHero: React.FC<ArchiveHeroProps> = ({ onOpenSearch }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ARCHIVE_HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = ARCHIVE_HERO_SLIDES[currentSlide];

  return (
    <section
      id="archive-hero"
      className="relative min-h-[90vh] sm:min-h-screen w-full flex items-center justify-center bg-institutional-dark text-white overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-white/10"
    >
      {/* Background Slow Crossfade Slideshow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-gradient-to-b from-institutional-surface/90 via-institutional-dark/95 to-institutional-darker flex items-center justify-center p-8 text-center"
          >
            {/* Fine Archival Pattern Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(197,160,89,0.12)_1px,transparent_1px)] [background-size:32px_32px] opacity-60" />

            <div className="relative z-10 max-w-2xl mx-auto border border-white/10 rounded p-8 bg-black/40 backdrop-blur-xs">
              <span className="text-[10px] font-space uppercase tracking-[0.25em] text-institutional-accent font-semibold block mb-2">
                HISTORIC ARCHIVAL SLIDE • {slide.year}
              </span>
              <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-white mb-2">
                {slide.title}
              </h3>
              <p className="font-manrope text-xs sm:text-sm text-gray-300 leading-relaxed italic max-w-md mx-auto">
                &ldquo;{slide.caption}&rdquo;
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Ambient Dark Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-institutional-dark via-transparent to-institutional-dark/80 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 text-center flex flex-col items-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 mb-6"
        >
          <span className="h-[1px] w-10 bg-institutional-accent" />
          <span className="text-xs uppercase tracking-[0.3em] font-space text-institutional-accent font-semibold">
            Visual Archive • Living Museum
          </span>
          <span className="h-[1px] w-10 bg-institutional-accent" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-cormorant text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.08] max-w-5xl"
        >
          Preserving Every Moment That Defines Our Journey
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-manrope text-base sm:text-xl text-gray-300 max-w-3xl leading-relaxed mb-10 font-normal"
        >
          For nearly three decades, every photograph, every ceremony, every volunteer, every publication, and every community initiative has become part of the living history of Ruchi Prativa Foundation. Explore the stories that continue to inspire generations.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#journey-through-time"
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover transition-colors duration-200 rounded-sm shadow-xl min-w-[200px] min-h-[44px]"
          >
            <span>Explore Timeline</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href="#explore-collections"
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-widest font-space font-semibold text-white border border-white/30 hover:bg-white hover:text-institutional-dark transition-all duration-300 rounded-sm min-w-[200px] min-h-[44px]"
          >
            <span>Browse Collections</span>
          </a>

          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-4 text-xs uppercase tracking-widest font-space font-semibold text-institutional-accent border border-institutional-accent/40 bg-institutional-accent/10 hover:bg-institutional-accent hover:text-institutional-dark transition-all duration-300 rounded-sm min-h-[44px] cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Search Archive</span>
            </button>
          )}
        </motion.div>

        {/* Slide Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-14">
          {ARCHIVE_HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx ? 'w-8 bg-institutional-accent' : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
