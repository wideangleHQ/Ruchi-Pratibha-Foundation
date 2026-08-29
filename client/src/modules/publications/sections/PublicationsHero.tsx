'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowDown } from 'lucide-react';
import { CSRHeroSlideshow } from '@/components/ui/CSRHeroSlideshow';

export const PublicationsHero: React.FC = () => {
  return (
    <section
      id="pub-hero"
      className="relative z-10 min-h-[90vh] sm:min-h-screen w-full bg-institutional-dark text-white border-b border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28 flex items-end"
    >
      {/* Background CSR Slideshow & Pattern */}
      <CSRHeroSlideshow opacity={0.35} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-institutional-dark via-transparent to-institutional-dark/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-12 xl:px-16 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-[1500px] w-full mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12">
          {/* Left: Text Content Block */}
          <div className="flex flex-col items-start max-w-[70%] sm:max-w-full lg:max-w-[65%]">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <span className="h-[1px] w-8 bg-institutional-accent/60" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
                Knowledge Centre • Institutional Library
              </span>
              <span className="h-[1px] w-8 bg-institutional-accent/60" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-cormorant text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.12] mb-6"
            >
              Preserving Three Decades of Knowledge, Culture &amp; Legacy
            </motion.h1>

            {/* Description Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 font-manrope text-sm sm:text-base lg:text-lg text-gray-300 max-w-full sm:max-w-2xl leading-relaxed font-normal"
            >
              <p>
                For nearly three decades, <strong>Ruchi Prativa Foundation</strong> has documented its journey through carefully curated publications that preserve history, celebrate excellence, record institutional milestones, and promote literature, culture, and social thought.
              </p>
              <p className="text-xs sm:text-sm text-gray-400">
                From <em>Amaruchi</em> and <em>Prativayana</em> to annual reports and commemorative editions, every publication reflects the Foundation&apos;s commitment to knowledge, transparency, and heritage.
              </p>
            </motion.div>
          </div>

          {/* Right: Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-3.5 w-[70%] sm:w-full lg:w-auto lg:min-w-[280px]"
          >
            <a
              href="#collection"
              className="inline-flex items-center justify-center gap-2.5 w-full px-7 py-3.5 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover transition-colors duration-200 rounded-sm shadow-md text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent min-h-[44px]"
            >
              <span>Explore Collection</span>
              <ArrowDown className="w-4 h-4 text-institutional-dark" />
            </a>

            <a
              href="#featured-publications"
              className="inline-flex items-center justify-center gap-2.5 w-full px-7 py-3.5 text-xs uppercase tracking-widest font-space font-semibold text-white border border-white/30 hover:bg-white hover:text-institutional-dark transition-all duration-300 rounded-sm text-center min-h-[44px]"
            >
              <BookOpen className="w-4 h-4" />
              <span>Start Reading</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
