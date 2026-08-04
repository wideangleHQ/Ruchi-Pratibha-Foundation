'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Newspaper } from 'lucide-react';
import { MEDIA_CLIPPINGS } from '../data/archiveData';
import { MediaClipping } from '../types';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

export const MediaCoverage: React.FC = () => {
  const [selectedClipping, setSelectedClipping] = useState<MediaClipping | null>(null);

  return (
    <section
      id="media-coverage"
      className="py-24 sm:py-36 bg-institutional-cream dark:bg-institutional-surface/20 text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Section 08 • Newspaper Archival Press
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Media Coverage &amp; Press Archives
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Archival newspaper clippings, state journal reports, and press coverage documenting our convocations and community initiatives since 1997.
          </p>
        </div>

        {/* Newspaper Clipping Inspired Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {MEDIA_CLIPPINGS.map((clip, idx) => (
            <motion.div
              key={clip.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => setSelectedClipping(clip)}
              className="cursor-pointer group"
            >
              <InteractiveCard className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/15 dark:border-white/15 rounded-sm p-6 sm:p-7 hover:border-institutional-accent transition-all duration-300 shadow-md hover:shadow-xl">
                <div>
                  {/* Newspaper Masthead Header */}
                  <div className="flex items-center justify-between border-b-2 border-institutional-accent/40 pb-3 mb-4">
                    <span className="font-cormorant text-lg font-bold text-institutional-accent tracking-wide flex items-center gap-2">
                      <Newspaper className="w-4 h-4 text-institutional-accent" />
                      <span>{clip.publicationName}</span>
                    </span>
                    <span className="font-space text-[9px] uppercase tracking-wider text-gray-400">
                      {clip.language}
                    </span>
                  </div>

                  <div className="text-[10px] font-space uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                    {clip.dateStr} • {clip.edition}
                  </div>

                  {/* Headline */}
                  <h3 className="font-cormorant text-xl sm:text-2xl font-bold text-institutional-dark dark:text-white mb-3 leading-tight group-hover:text-institutional-accent transition-colors">
                    {clip.headline}
                  </h3>

                  {/* Article Snippet */}
                  <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed italic mb-4">
                    &ldquo;{clip.previewSnippet}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[10px] font-space text-institutional-accent font-semibold">
                  <span>PRESS ARCHIVE #{clip.id}</span>
                  <span className="group-hover:underline">Read Full Article →</span>
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Newspaper Modal View */}
      <AnimatePresence>
        {selectedClipping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
          >
            <div className="max-w-3xl w-full bg-white dark:bg-institutional-dark border border-black/20 dark:border-white/20 rounded-sm p-6 sm:p-10 text-institutional-dark dark:text-white relative shadow-2xl">
              <button
                onClick={() => setSelectedClipping(null)}
                aria-label="Close newspaper article modal"
                className="absolute top-4 right-4 w-10 h-10 rounded-full border border-black/20 dark:border-white/20 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border-b-2 border-institutional-accent pb-4 mb-6">
                <span className="font-space text-xs uppercase tracking-widest text-institutional-accent font-semibold block mb-1">
                  NEWSPAPER CLIPPING ARCHIVE • {selectedClipping.language} EDITION
                </span>
                <h3 className="font-cormorant text-2xl font-bold text-institutional-accent mb-2">
                  {selectedClipping.publicationName}
                </h3>
                <span className="text-xs font-space text-gray-500 dark:text-gray-400">
                  Published: {selectedClipping.dateStr} ({selectedClipping.edition})
                </span>
              </div>

              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                {selectedClipping.headline}
              </h2>

              <div className="p-4 bg-institutional-accent/10 border-l-4 border-institutional-accent mb-6 rounded-r">
                <p className="font-manrope text-sm italic text-institutional-dark dark:text-gray-200">
                  {selectedClipping.previewSnippet}
                </p>
              </div>

              <p className="font-manrope text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6">
                {selectedClipping.articleSummary}
              </p>

              <div className="pt-4 border-t border-black/10 dark:border-white/10 flex justify-between text-xs font-space text-gray-500 dark:text-gray-400">
                <span>PRESS CATALOG # {selectedClipping.id}</span>
                <span>STATUS: ARCHIVED PUBLIC RECORD</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
