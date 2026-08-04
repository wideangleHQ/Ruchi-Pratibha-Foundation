'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EVENT_FOLDERS, ARCHIVE_PHOTOS, ARCHIVE_DOCUMENTARIES } from '../data/archiveData';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

const TIMELINE_YEARS = [2026, 2022, 2018, 2015, 2009, 2004, 1997];

export const JourneyThroughTime: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2026);

  // Find matching event or fallback
  const currentFolder =
    EVENT_FOLDERS.find((e) => e.year === selectedYear) || EVENT_FOLDERS[0];
  const yearPhotos = ARCHIVE_PHOTOS.filter((p) => p.year === selectedYear);
  const yearDoc = ARCHIVE_DOCUMENTARIES.find((d) => d.year === selectedYear);

  return (
    <section
      id="journey-through-time"
      className="py-24 sm:py-36 bg-institutional-cream dark:bg-institutional-dark text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Section 02 • Journey Through Time
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Three Decades Connected (1997 – 2026)
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Select a year to explore its connected photographs, video documentaries, award convocations, and publication releases inline.
          </p>
        </div>

        {/* Year Selector Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none snap-x touch-pan-x">
          {TIMELINE_YEARS.map((year) => {
            const active = selectedYear === year;
            return (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-5 py-3 rounded-sm font-space text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer shrink-0 snap-center ${
                  active
                    ? 'bg-institutional-accent text-institutional-dark font-bold shadow-md scale-105'
                    : 'bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-institutional-dark dark:text-gray-300 hover:border-institutional-accent/50'
                }`}
              >
                Year {year}
              </button>
            );
          })}
        </div>

        {/* Inline Connected Memory Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedYear}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Master Summary Panel */}
            <InteractiveCard className="bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 sm:p-10 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-black/5 dark:border-white/10 pb-6 mb-6">
                <div>
                  <span className="font-space text-xs uppercase tracking-widest text-institutional-accent font-semibold block mb-1">
                    YEAR {selectedYear} HISTORICAL SUMMARY
                  </span>
                  <h3 className="font-cormorant text-2xl sm:text-4xl font-bold text-institutional-dark dark:text-white">
                    {currentFolder.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="px-3 py-1 text-xs font-space uppercase tracking-wider text-institutional-accent bg-institutional-accent/15 border border-institutional-accent/30 rounded font-semibold">
                    {currentFolder.photosCount} Archival Photos
                  </span>
                  <span className="px-3 py-1 text-xs font-space uppercase tracking-wider text-institutional-accent bg-institutional-accent/15 border border-institutional-accent/30 rounded font-semibold">
                    {currentFolder.honoreesCount} Honorees
                  </span>
                </div>
              </div>

              <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6">
                {currentFolder.summary}
              </p>

              {/* Connected Content Pill Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-black/5 dark:border-white/10 pt-6">
                <div>
                  <span className="text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-1">
                    DISTINGUISHED GUESTS
                  </span>
                  <span className="font-manrope text-xs text-institutional-dark dark:text-gray-200">
                    {currentFolder.distinguishedGuests.join(' • ')}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-1">
                    PUBLICATIONS RELEASED
                  </span>
                  <span className="font-manrope text-xs text-institutional-dark dark:text-gray-200">
                    {currentFolder.publicationsReleased.join(' • ')}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-1">
                    CONVOCATION VENUE
                  </span>
                  <span className="font-manrope text-xs text-institutional-dark dark:text-gray-200">
                    {currentFolder.location}
                  </span>
                </div>
              </div>
            </InteractiveCard>

            {/* Grid of Year Photos & Video Documentaries */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {yearPhotos.length > 0 ? (
                yearPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-5 shadow-sm"
                  >
                    <div className="aspect-[4/3] rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-3 flex flex-col justify-between mb-3">
                      <span className="text-[9px] font-space uppercase text-institutional-accent">
                        {photo.category}
                      </span>
                      <span className="text-xs font-space uppercase tracking-widest text-institutional-accent text-center font-semibold">
                        [ {photo.year} Photo Record ]
                      </span>
                      <span className="text-[8px] font-space text-gray-400 text-right">
                        {photo.location}
                      </span>
                    </div>
                    <h4 className="font-cormorant text-lg font-bold text-institutional-dark dark:text-white mb-1">
                      {photo.title}
                    </h4>
                    <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed">
                      {photo.caption}
                    </p>
                  </div>
                ))
              ) : (
                <div className="md:col-span-2 bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 flex flex-col items-center justify-center text-center">
                  <span className="font-space text-xs uppercase tracking-widest text-institutional-accent font-semibold mb-2">
                    [ Archival Photographic Record ]
                  </span>
                  <p className="font-manrope text-xs text-gray-400">
                    Over {currentFolder.photosCount} photographs cataloged in the Foundation digital vault for Year {selectedYear}.
                  </p>
                </div>
              )}

              {/* Documentary Highlight if available */}
              {yearDoc && (
                <div className="bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-5 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="font-space text-[10px] uppercase tracking-widest text-institutional-accent font-semibold block mb-2">
                      DOCUMENTARY FILM ({yearDoc.duration})
                    </span>
                    <h4 className="font-cormorant text-xl font-bold text-institutional-dark dark:text-white mb-2">
                      {yearDoc.title}
                    </h4>
                    <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-4">
                      {yearDoc.summary}
                    </p>
                  </div>
                  <span className="text-[10px] font-space uppercase tracking-wider text-institutional-accent font-semibold border-t border-black/5 dark:border-white/10 pt-3 block">
                    • Film Director Note: {yearDoc.directorNote}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
