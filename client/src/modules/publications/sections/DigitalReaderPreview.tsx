'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Bookmark,
  Search,
  ZoomIn,
  ZoomOut,
  List,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
} from 'lucide-react';
import { FEATURED_PUBLICATIONS } from '../data/publicationsData';

export const DigitalReaderPreview: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(24);
  const totalPages = 340;

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 2, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 2, 1));
  };

  return (
    <section
      id="digital-reader"
      className="py-24 sm:py-32 bg-institutional-dark text-white border-b border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28 relative"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent/60" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Interactive Reading Interface
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent/60" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Read Without Leaving the Website
          </h2>
          <p className="font-manrope text-sm sm:text-base text-gray-300 mt-3 leading-relaxed">
            Our next-generation institutional reader brings rare archival volumes, literary anthologies, and historical gazettes to life with fluid flipbook navigation, full-text search, and annotation controls.
          </p>
        </div>

        {/* Reader Mockup Frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto bg-[#141822] border border-white/15 rounded-sm shadow-2xl overflow-hidden"
        >
          {/* Reader Top Toolbar */}
          <div className="px-6 py-4 bg-[#0F131C] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-institutional-accent/15 border border-institutional-accent/30 text-institutional-accent flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </span>
              <div>
                <h4 className="font-cormorant text-base sm:text-lg font-bold text-white leading-tight">
                  {FEATURED_PUBLICATIONS.length > 0
                    ? 'Amaruchi Journal (2024 Edition) • Vol. XXVIII'
                    : 'Digital Reader Interface'}
                </h4>
                <p className="font-space text-[10px] text-gray-400 uppercase tracking-wider">
                  {FEATURED_PUBLICATIONS.length > 0
                    ? 'CHAPTER 3: ODIA LITERATURE & HERITAGE STUDIES'
                    : 'No active volume loaded'}
                </p>
              </div>
            </div>

            {/* Reader Action Controls */}
            <div className="flex items-center gap-2">
              <button
                aria-label="Table of Contents"
                className="p-2 rounded bg-white/5 border border-white/10 text-gray-300 hover:text-institutional-accent hover:border-institutional-accent/50 transition-colors"
                title="Table of Contents"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                aria-label="Search Book"
                className="p-2 rounded bg-white/5 border border-white/10 text-gray-300 hover:text-institutional-accent hover:border-institutional-accent/50 transition-colors"
                title="Search in Publication"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                aria-label="Add Bookmark"
                className="p-2 rounded bg-white/5 border border-white/10 text-gray-300 hover:text-institutional-accent hover:border-institutional-accent/50 transition-colors"
                title="Add Bookmark"
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <div className="h-4 w-[1px] bg-white/15 mx-1" />
              <button
                aria-label="Zoom In"
                className="p-2 rounded bg-white/5 border border-white/10 text-gray-300 hover:text-institutional-accent transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                aria-label="Zoom Out"
                className="p-2 rounded bg-white/5 border border-white/10 text-gray-300 hover:text-institutional-accent transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <div className="h-4 w-[1px] bg-white/15 mx-1" />
              <button
                aria-label="Fullscreen"
                className="p-2 rounded bg-white/5 border border-white/10 text-gray-300 hover:text-institutional-accent transition-colors"
                title="Toggle Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reader Main Open Book Canvas */}
          <div className="p-6 sm:p-12 bg-[#0B0E14] relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center">
            {/* Background Warm Lighting Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.08),transparent_70%)] pointer-events-none" />

            {/* Open Book Spread Simulation */}
            {FEATURED_PUBLICATIONS.length > 0 ? (
              <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 bg-[#FDFBF7] text-institutional-dark rounded-sm border border-institutional-accent/40 shadow-2xl p-6 sm:p-8 relative">
                {/* Center Spine Fold Shadow */}
                <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-4 bg-gradient-to-r from-black/20 via-black/10 to-transparent pointer-events-none" />

                {/* Left Page (Page N) */}
                <div className="space-y-3 font-manrope text-xs sm:text-sm text-institutional-dark/90 leading-relaxed border-b sm:border-b-0 sm:border-r border-black/10 pb-4 sm:pb-0 sm:pr-6">
                  <div className="flex justify-between items-center text-[10px] font-space uppercase text-institutional-accent font-semibold border-b border-black/10 pb-2 mb-3">
                    <span>AMARUCHI JOURNAL</span>
                    <span>PAGE {currentPage}</span>
                  </div>
                  <h4 className="font-cormorant text-xl font-bold text-institutional-dark mb-2">
                    Preserving Cultural Identity in Eastern India
                  </h4>
                  <p>
                    &ldquo;Literature serves as the custodian of a society&apos;s memory. Through every recorded stanza, essay, and commentary, we pass down not merely words, but the living spirit of our ancestors.&rdquo;
                  </p>
                  <p className="text-xs text-gray-600 italic">
                    — Shri Sarat Kumar Sahoo (Keynote Address, Amaruchi Release Ceremony 2024)
                  </p>
                </div>

                {/* Right Page (Page N+1) */}
                <div className="space-y-3 font-manrope text-xs sm:text-sm text-institutional-dark/90 leading-relaxed pt-2 sm:pt-0 sm:pl-2">
                  <div className="flex justify-between items-center text-[10px] font-space uppercase text-institutional-accent font-semibold border-b border-black/10 pb-2 mb-3">
                    <span>HISTORICAL ANTHOLOGY</span>
                    <span>PAGE {currentPage + 1}</span>
                  </div>
                  <p>
                    The Ruchi Prativa Foundation has consistently published historical monographs documenting classical Odia poetry, temple architecture, and grassroots educational campaigns.
                  </p>
                  <div className="p-3 bg-black/5 rounded border border-black/10 my-2">
                    <span className="text-[10px] font-space uppercase text-institutional-accent font-semibold block mb-1">
                      [ Archival Plate Illustration ]
                    </span>
                    <p className="text-[11px] text-gray-600">
                      Odia Palm-Leaf Manuscript Replica • Circa 19th Century Research Documentation.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-4xl bg-[#FDFBF7] text-institutional-dark rounded-sm border border-institutional-accent/40 shadow-2xl p-12 text-center relative">
                <BookOpen className="w-12 h-12 mx-auto text-institutional-accent mb-4 opacity-80" />
                <p className="font-manrope text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed">
                  Publications will appear here as they are added to the Foundation&apos;s digital archive.
                </p>
              </div>
            )}
          </div>

          {/* Reader Bottom Navigation Bar */}
          <div className="px-6 py-4 bg-[#0F131C] border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-space text-gray-300">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevPage}
                disabled={FEATURED_PUBLICATIONS.length === 0 || currentPage <= 1}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-white/5 border border-white/10 hover:bg-institutional-accent hover:text-institutional-dark disabled:opacity-40 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev Spread</span>
              </button>

              <button
                onClick={handleNextPage}
                disabled={FEATURED_PUBLICATIONS.length === 0 || currentPage >= totalPages}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-white/5 border border-white/10 hover:bg-institutional-accent hover:text-institutional-dark disabled:opacity-40 transition-colors cursor-pointer"
              >
                <span>Next Spread</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Reading Progress Indicator */}
            <div className="flex items-center gap-3">
              <span>
                {FEATURED_PUBLICATIONS.length > 0
                  ? `SPREAD ${currentPage}-${currentPage + 1} OF ${totalPages}`
                  : 'SPREAD 0-0 OF 0'}
              </span>
              <div className="w-32 sm:w-48 h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-institutional-accent transition-all duration-300"
                  style={{
                    width: FEATURED_PUBLICATIONS.length > 0
                      ? `${(currentPage / totalPages) * 100}%`
                      : '0%'
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase text-institutional-accent font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-institutional-accent animate-pulse" />
                <span>FLIPBOOK PREVIEW</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
