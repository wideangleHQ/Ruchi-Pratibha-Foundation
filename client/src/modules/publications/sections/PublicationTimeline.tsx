'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';

const PUBLICATION_TIMELINE_MILESTONES = [
  {
    year: '1997',
    title: 'First Publication & Foundation Inception',
    category: 'Founding Milestone',
    summary:
      'Release of the inaugural Foundation booklet outlining the vision of Shri Sarat Kumar Sahoo for Odia literature, student recognition, and community service.',
    description:
      'Marking the official beginning of Ruchi Prativa Foundation’s publication series, establishing the tradition of publishing annual commemorative reports and academic monographs.',
    coverBg: '#1B1722',
    accentColor: '#C5A059',
  },
  {
    year: '2005',
    title: 'Inaugural Issue of Amaruchi Journal',
    category: 'Literary Anthology',
    summary:
      'Launch of Amaruchi as an annual literary journal dedicated to preserving Odia research papers, essays, poetry, and classical heritage studies.',
    description:
      'Amaruchi rapidly grew into a respected platform bringing together veteran Odia authors, research scholars, and university students across Eastern India.',
    coverBg: '#2A1E17',
    accentColor: '#D4AF37',
  },
  {
    year: '2012',
    title: 'Expansion of Prativayana Gazette',
    category: 'Institutional Record',
    summary:
      'Systematic documentation of grassroots CSR drives, blood donation camps, healthcare outreach, and annual student scholarship statistics.',
    description:
      'Prativayana was expanded into a multi-volume gazette providing complete public transparency and documenting the social impact of the Foundation.',
    coverBg: '#172421',
    accentColor: '#76C7C0',
  },
  {
    year: '2022',
    title: 'Silver Jubilee Souvenir & 25-Year Retrospective',
    category: 'Commemorative Edition',
    summary:
      'Release of the historic 25th Anniversary Souvenir compiling felicitation letters from governors, dignitaries, founding trustee notes, and archival photos.',
    description:
      'A landmark 320-page hardcover commemorative volume celebrating twenty-five years of compassion in action, literature, and social development.',
    coverBg: '#1E1B2A',
    accentColor: '#C5A059',
  },
  {
    year: '2025',
    title: 'Digital Knowledge Centre & Living Archive',
    category: 'Digital Epoch',
    summary:
      'Transformation of three decades of print publications into an interactive digital knowledge centre accessible to researchers worldwide.',
    description:
      'Building the digital search layer, online flipbook reader, discoverable article archive, and public transparency repository for future generations.',
    coverBg: '#1A2228',
    accentColor: '#93C5FD',
  },
];

export const PublicationTimeline: React.FC = () => {
  const [selectedMilestoneIdx, setSelectedMilestoneIdx] = useState<number>(3); // Default Silver Jubilee

  const currentMilestone = PUBLICATION_TIMELINE_MILESTONES[selectedMilestoneIdx];

  return (
    <section
      id="publication-timeline"
      className="py-24 sm:py-32 bg-institutional-light dark:bg-institutional-surface/20 text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Archival Evolution
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Three Decades of Publications
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Trace the evolutionary timeline of Ruchi Prativa Foundation&apos;s publications from our founding 1997 inaugural issue to today&apos;s digital knowledge archive.
          </p>
        </div>

        {/* Timeline Track & Expanded Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Timeline Year Track */}
          <div className="lg:col-span-5 space-y-3">
            {PUBLICATION_TIMELINE_MILESTONES.map((ms, idx) => {
              const active = selectedMilestoneIdx === idx;

              return (
                <button
                  key={ms.year}
                  onClick={() => setSelectedMilestoneIdx(idx)}
                  className={`w-full p-5 rounded-sm border text-left transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    active
                      ? 'bg-white dark:bg-institutional-surface/60 border-institutional-accent shadow-md'
                      : 'bg-white/60 dark:bg-white/5 border-black/10 dark:border-white/10 hover:border-institutional-accent/40'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-cormorant text-xl font-bold transition-colors ${
                        active
                          ? 'bg-institutional-accent text-institutional-dark'
                          : 'bg-black/5 dark:bg-white/5 text-institutional-accent'
                      }`}
                    >
                      {ms.year.slice(-2)}
                    </div>

                    <div>
                      <span className="text-[9px] font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-0.5">
                        {ms.year} • {ms.category}
                      </span>
                      <h4 className="font-cormorant text-lg font-bold text-institutional-dark dark:text-white leading-tight">
                        {ms.title}
                      </h4>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      active ? 'translate-x-1 text-institutional-accent' : 'text-gray-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Expanded Milestone Detail Display Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMilestone.year}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 sm:p-10 shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[420px]"
              >
                <div>
                  {/* Top Year & Category Badge */}
                  <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4 mb-6">
                    <span className="font-space text-xs uppercase tracking-widest text-institutional-accent font-semibold flex items-center gap-2">
                      <span className="h-[1px] w-6 bg-institutional-accent" />
                      <span>{currentMilestone.year} ARCHIVAL MILESTONE</span>
                    </span>
                    <span className="px-2.5 py-1 text-[10px] font-space uppercase tracking-wider text-institutional-accent bg-institutional-accent/15 border border-institutional-accent/30 rounded font-semibold">
                      {currentMilestone.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-cormorant text-3xl sm:text-4xl font-bold text-institutional-dark dark:text-white mb-4 leading-tight">
                    {currentMilestone.title}
                  </h3>

                  {/* Summary & Description */}
                  <p className="font-manrope text-sm sm:text-base text-institutional-dark dark:text-gray-200 font-semibold mb-4 leading-relaxed">
                    {currentMilestone.summary}
                  </p>
                  <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6">
                    {currentMilestone.description}
                  </p>


                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-space text-gray-400">
                    RPF KNOWLEDGE TIMELINE
                  </span>

                  <a
                    href="#featured-publications"
                    className="inline-flex items-center gap-1.5 text-xs font-space uppercase tracking-widest text-institutional-accent font-semibold hover:underline"
                  >
                    <span>Read Publication</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
