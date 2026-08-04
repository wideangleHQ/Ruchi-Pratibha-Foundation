'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowDown } from 'lucide-react';

export const PublicationsHero: React.FC = () => {
  return (
    <section
      id="pub-hero"
      className="relative z-10 pt-28 sm:pt-36 pb-16 sm:pb-24 bg-institutional-dark text-white border-b border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
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
            className="font-cormorant text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.12] mb-6 sm:mb-8"
          >
            Preserving Three Decades of Knowledge, Culture &amp; Legacy
          </motion.h1>

          {/* Description Paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 font-manrope text-base sm:text-lg text-gray-300 max-w-3xl leading-relaxed mb-8 sm:mb-10 font-normal"
          >
            <p>
              For nearly three decades, <strong>Ruchi Prativa Foundation</strong> has documented its journey through carefully curated publications that preserve history, celebrate excellence, record institutional milestones, and promote literature, culture, and social thought.
            </p>
            <p className="text-sm sm:text-base text-gray-400">
              From <em>Amaruchi</em> and <em>Prativayana</em> to annual reports and commemorative editions, every publication reflects the Foundation&apos;s commitment to knowledge, transparency, and heritage.
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-12 sm:mb-16"
          >
            <a
              href="#pub-collection"
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-3.5 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover transition-colors duration-200 rounded-sm shadow-md text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent min-h-[44px]"
            >
              <span>Explore Collection</span>
              <ArrowDown className="w-4 h-4 text-institutional-dark" />
            </a>

            <a
              href="#featured-publications"
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-3.5 text-xs uppercase tracking-widest font-space font-semibold text-white border border-white/30 hover:bg-white hover:text-institutional-dark transition-all duration-300 rounded-sm text-center min-h-[44px]"
            >
              <BookOpen className="w-4 h-4" />
              <span>Start Reading</span>
            </a>
          </motion.div>
        </div>

        {/* Library-Inspired Editorial Composition (3D Bookshelf Preview Placeholder) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-5xl mx-auto relative rounded-sm overflow-hidden border border-white/15 bg-white/5 shadow-none sm:shadow-2xl"
        >
          <div className="aspect-[16/9] sm:aspect-[21/9] w-full flex flex-col items-center justify-center p-8 text-center relative bg-gradient-to-br from-institutional-surface/90 via-institutional-dark to-institutional-darker text-white">
            <div className="absolute inset-0 bg-[radial-gradient(rgba(197,160,89,0.12)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50" />

            <div className="relative z-10 flex flex-col items-center max-w-xl">
              <span className="text-xs font-space uppercase tracking-[0.2em] text-institutional-accent font-semibold mb-2">
                [ Digital Bookshelf &amp; Warm Editorial Lighting ]
              </span>
              <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-white mb-2">
                Three Decades of Printed Heritage &amp; Digital Knowledge
              </h3>
              <p className="font-manrope text-xs text-gray-400 leading-relaxed max-w-md">
                Curated volumes of <em>Amaruchi</em>, <em>Prativayana</em>, Annual Impact Reports, and Commemorative Souvenirs from 1997 to Present Day.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
