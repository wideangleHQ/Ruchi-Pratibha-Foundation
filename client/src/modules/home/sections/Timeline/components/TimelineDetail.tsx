'use client';

import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { TimelineMilestone, MilestoneCard } from '../types';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

interface TimelineDetailProps {
  milestone: TimelineMilestone;
}

export const TimelineDetail: React.FC<TimelineDetailProps> = ({ milestone }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="mt-6 lg:mt-8 w-full transition-all duration-300">
      <AnimatePresence mode="wait">
        <div key={milestone.id}>
          {/* Desktop Layout (Unchanged 3-Card Grid) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
          >
            {milestone.cards.map((card: MilestoneCard) => (
              <motion.div key={card.title} variants={cardVariants} className="h-full">
                  <InteractiveCard
                    className="flex flex-col justify-between h-full p-6 sm:p-8"
                  >
                    <div>
                      {/* Card Header & Badge */}
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-[10px] uppercase tracking-widest font-space text-institutional-accent font-semibold">
                          {card.subtitle}
                        </span>
                        {card.metricOrBadge && (
                          <span className="text-[10px] font-space px-2 py-0.5 rounded bg-institutional-accent/10 border border-institutional-accent/30 text-institutional-accent font-medium whitespace-nowrap">
                            {card.metricOrBadge}
                          </span>
                        )}
                      </div>

                      {/* Card Image Placeholder for Card 1 */}
                      {card.type === 'overview' && (
                        <div className="relative w-full aspect-[16/10] rounded-sm bg-institutional-surface/5 dark:bg-white/5 border border-institutional-dark/10 dark:border-white/10 p-4 flex flex-col items-center justify-center mb-6 overflow-hidden">
                          <div
                            className="absolute inset-0 opacity-10 pointer-events-none"
                            style={{
                              backgroundImage:
                                'linear-gradient(rgba(197, 160, 89, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(197, 160, 89, 0.15) 1px, transparent 1px)',
                              backgroundSize: '16px 16px',
                            }}
                          />
                          <span className="text-[10px] uppercase tracking-[0.2em] font-space text-institutional-accent font-semibold mb-1">
                            [ Historical Archive Placeholder ]
                          </span>
                          <span className="text-[9px] font-space text-institutional-mutedLight dark:text-gray-400">
                            Archival Photo Record • {milestone.year}
                          </span>
                        </div>
                      )}

                      {/* Card 2 & 3 Editorial Index Bar */}
                      {card.type !== 'overview' && (
                        <div className="flex items-center gap-2 mb-4">
                          <span className="h-[1px] w-6 bg-institutional-accent" />
                          <span className="font-space text-[10px] uppercase tracking-widest text-institutional-accent font-semibold">
                            ARCHIVAL RECORD
                          </span>
                        </div>
                      )}

                      {/* Card Title */}
                      <h3 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white mb-3 group-hover:text-institutional-accent transition-colors duration-300">
                        {card.title}
                      </h3>

                      {/* Card Description */}
                      <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6 group-hover:text-institutional-dark dark:group-hover:text-white transition-colors duration-300">
                        {card.description}
                      </p>
                    </div>

                    {/* Footer Section */}
                    <div className="pt-4 border-t border-institutional-dark/5 dark:border-white/5 flex items-center justify-between">
                      <span className="font-space text-[10px] tracking-wider text-institutional-mutedLight dark:text-gray-400 uppercase">
                        {milestone.year} Milestone
                      </span>

                      {card.ctaText ? (
                        <span className="inline-flex items-center gap-1 text-xs font-space font-semibold text-institutional-accent group-hover:translate-x-1 transition-transform duration-300">
                          <span>{card.ctaText}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="text-xs text-institutional-accent group-hover:translate-x-1 transition-transform duration-300">
                          →
                        </span>
                      )}
                    </div>
                  </InteractiveCard>
                </motion.div>
            ))}
          </motion.div>

          {/* Mobile View Only: Vertical Editorial Order (Text Box 1 -> Text Box 2 -> Image Container) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            className="flex flex-col gap-6 md:hidden"
          >
            {/* 1. Text Box 1: Description Box (Card 0: Overview) */}
            <motion.div variants={cardVariants} className="w-full">
              <InteractiveCard className="flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase tracking-widest font-space text-institutional-accent font-semibold">
                      {milestone.cards[0].subtitle}
                    </span>
                    {milestone.cards[0].metricOrBadge && (
                      <span className="text-[10px] font-space px-2 py-0.5 rounded bg-institutional-accent/10 border border-institutional-accent/30 text-institutional-accent font-medium whitespace-nowrap">
                        {milestone.cards[0].metricOrBadge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white mb-3">
                    {milestone.cards[0].title}
                  </h3>
                  <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-4">
                    {milestone.cards[0].description}
                  </p>
                </div>
                <div className="pt-3 border-t border-institutional-dark/5 dark:border-white/5 flex items-center justify-between">
                  <span className="font-space text-[10px] tracking-wider text-institutional-mutedLight dark:text-gray-400 uppercase">
                    {milestone.year} Epoch Overview
                  </span>
                  <span className="text-xs text-institutional-accent">→</span>
                </div>
              </InteractiveCard>
            </motion.div>

            {/* 2. Text Box 2: Highlight / Key Achievements Box (Card 1: Achievements) */}
            <motion.div variants={cardVariants} className="w-full">
              <InteractiveCard className="flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase tracking-widest font-space text-institutional-accent font-semibold">
                      {milestone.cards[1].subtitle}
                    </span>
                    {milestone.cards[1].metricOrBadge && (
                      <span className="text-[10px] font-space px-2 py-0.5 rounded bg-institutional-accent/10 border border-institutional-accent/30 text-institutional-accent font-medium whitespace-nowrap">
                        {milestone.cards[1].metricOrBadge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white mb-3">
                    {milestone.cards[1].title}
                  </h3>
                  <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-4">
                    {milestone.cards[1].description}
                  </p>
                </div>
                <div className="pt-3 border-t border-institutional-dark/5 dark:border-white/5 flex items-center justify-between">
                  <span className="font-space text-[10px] tracking-wider text-institutional-mutedLight dark:text-gray-400 uppercase">
                    {milestone.year} Milestone
                  </span>
                  {milestone.cards[1].ctaText ? (
                    <span className="inline-flex items-center gap-1 text-xs font-space font-semibold text-institutional-accent">
                      <span>{milestone.cards[1].ctaText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="text-xs text-institutional-accent">→</span>
                  )}
                </div>
              </InteractiveCard>
            </motion.div>

            {/* 3. Image Container: Historical Archive Placeholder (Placed BELOW Both Text Boxes) */}
            <motion.div variants={cardVariants} className="w-full">
              <div className="relative w-full aspect-[16/10] rounded-sm bg-white dark:bg-institutional-surface/40 border border-institutional-dark/15 dark:border-white/15 p-4 flex flex-col items-center justify-center overflow-hidden shadow-md hover:border-institutional-accent/50 transition-all duration-300">
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(197, 160, 89, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(197, 160, 89, 0.15) 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                  }}
                />
                <span className="font-cormorant text-lg font-bold text-institutional-dark dark:text-white mb-1 text-center">
                  {milestone.year} Historical Document Archive
                </span>
                <span className="text-[10px] uppercase tracking-widest font-space text-institutional-accent font-semibold">
                  Ruchi Prativa Foundation Heritage
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </AnimatePresence>
    </div>
  );
};
