'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { HISTORICAL_MOMENTS } from '../data/archiveData';
import { HistoricalMoment } from '../types';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

export const HistoricalMoments: React.FC = () => {
  const [selectedMoment, setSelectedMoment] = useState<HistoricalMoment | null>(null);

  return (
    <section
      id="historical-moments"
      className="py-24 sm:py-36 bg-institutional-dark text-white border-b border-white/10 overflow-hidden relative scroll-mt-24"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Section 07 • Museum Timeline Wall
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Historical Moments &amp; Institutional Milestones
          </h2>
          <p className="font-manrope text-sm sm:text-base text-gray-300 mt-3 leading-relaxed">
            Museum-inspired exhibition wall showcasing the founding meetings, flagship convocations, and publication launches that built our legacy.
          </p>
        </div>

        {/* Museum Exhibition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {HISTORICAL_MOMENTS.map((moment, idx) => (
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => setSelectedMoment(moment)}
              className="cursor-pointer group"
            >
              <InteractiveCard className="flex flex-col justify-between h-full bg-white/5 border border-white/15 rounded-sm p-6 sm:p-8 hover:border-institutional-accent transition-all duration-300 shadow-xl">
                <div>
                  {/* Top Badge & Date */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                    <span className="text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold">
                      {moment.milestoneType}
                    </span>
                    <span className="text-[9px] font-space text-gray-400">
                      {moment.dateStr}
                    </span>
                  </div>

                  {/* Milestone Frame */}
                  <div className="w-full aspect-[16/10] rounded-sm bg-gradient-to-br from-institutional-surface/90 via-institutional-dark to-institutional-darker border border-white/10 p-4 flex flex-col items-center justify-center text-center text-white mb-4 relative overflow-hidden group-hover:border-institutional-accent/40 transition-colors">
                    <span className="text-2xl font-cormorant font-bold text-institutional-accent mb-1">
                      {moment.year}
                    </span>
                    <span className="text-[10px] font-space uppercase tracking-[0.2em] text-white font-semibold">
                      [ Museum Milestone Frame ]
                    </span>
                  </div>

                  <h3 className="font-cormorant text-2xl font-bold text-white mb-2 leading-snug group-hover:text-institutional-accent transition-colors">
                    {moment.title}
                  </h3>

                  <p className="font-manrope text-xs text-gray-300 leading-relaxed mb-4">
                    {moment.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-space text-institutional-accent font-semibold">
                  <span>EXHIBITION DETAIL</span>
                  <span className="group-hover:underline">Read Full Story →</span>
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Historical Moment Modal */}
      <AnimatePresence>
        {selectedMoment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
          >
            <div className="max-w-3xl w-full bg-institutional-dark border border-white/20 rounded-sm p-6 sm:p-10 text-white relative shadow-2xl">
              <button
                onClick={() => setSelectedMoment(null)}
                aria-label="Close milestone details"
                className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="h-[1px] w-6 bg-institutional-accent" />
                  <span className="text-xs font-space uppercase tracking-widest text-institutional-accent font-semibold">
                    {selectedMoment.milestoneType} • {selectedMoment.dateStr}
                  </span>
                </div>
                <h3 className="font-cormorant text-3xl sm:text-5xl font-bold text-white mb-4">
                  {selectedMoment.title}
                </h3>
              </div>

              <div className="space-y-4 font-manrope text-sm text-gray-300 leading-relaxed mb-6 border-t border-b border-white/10 py-4">
                <p>{selectedMoment.fullStory}</p>
                <p className="italic text-institutional-accent font-semibold">
                  &ldquo;{selectedMoment.impactNote}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-space text-gray-400">
                <span>CATALOG YEAR: {selectedMoment.year}</span>
                {selectedMoment.relatedPublication && (
                  <span className="text-institutional-accent font-semibold">
                    RELATED: {selectedMoment.relatedPublication}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
