'use client';

import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Landmark, Award, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { TimelineMilestone, MilestoneCard } from '../types';

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cardIcons = [Landmark, Award, ShieldCheck];

  return (
    <div className="mt-8 lg:mt-12 w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={milestone.id}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -15, transition: { duration: 0.2 } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {milestone.cards.map((card: MilestoneCard, idx: number) => {
            const IconComp = cardIcons[idx % cardIcons.length];
            return (
              <motion.div
                key={card.title}
                variants={cardVariants}
                className="group relative flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-institutional-dark/10 dark:border-white/10 rounded-sm p-6 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-institutional-accent transition-all duration-300 ease-out"
              >
                {/* Top subtle accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-institutional-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-sm" />

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

                  {/* Card Image / Icon Container for Card 1 */}
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
                      <div className="w-12 h-12 rounded-full bg-institutional-dark dark:bg-white/10 text-institutional-accent flex items-center justify-center mb-2 shadow transition-transform duration-300 group-hover:scale-110">
                        <IconComp className="w-6 h-6 stroke-[1.5]" />
                      </div>
                      <span className="text-[9px] uppercase tracking-widest font-space text-institutional-mutedLight dark:text-gray-400">
                        Historical Archive
                      </span>
                    </div>
                  )}

                  {/* Card 2 Icon */}
                  {card.type === 'achievement' && (
                    <div className="w-12 h-12 rounded-sm bg-institutional-accent/10 dark:bg-institutional-accent/15 border border-institutional-accent/30 flex items-center justify-center text-institutional-accent mb-6 transition-all duration-300 group-hover:scale-105 group-hover:bg-institutional-accent group-hover:text-institutional-dark">
                      <IconComp className="w-6 h-6 stroke-[1.5]" />
                    </div>
                  )}

                  {/* Card 3 Icon */}
                  {card.type === 'legacy' && (
                    <div className="w-12 h-12 rounded-sm bg-institutional-dark/5 dark:bg-white/10 border border-institutional-dark/15 dark:border-white/15 flex items-center justify-center text-institutional-dark dark:text-white mb-6 transition-all duration-300 group-hover:scale-105 group-hover:border-institutional-accent group-hover:text-institutional-accent">
                      <IconComp className="w-6 h-6 stroke-[1.5]" />
                    </div>
                  )}

                  {/* Card Title */}
                  <h3 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white mb-3 group-hover:text-institutional-accent transition-colors duration-200">
                    {card.title}
                  </h3>

                  {/* Card Description */}
                  <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Footer Section */}
                <div className="pt-4 border-t border-institutional-dark/5 dark:border-white/5 flex items-center justify-between">
                  <span className="font-space text-[10px] tracking-wider text-institutional-mutedLight dark:text-gray-400 uppercase">
                    {milestone.year} Milestone
                  </span>

                  {card.ctaText ? (
                    <span className="inline-flex items-center gap-1 text-xs font-space font-semibold text-institutional-accent group-hover:translate-x-1 transition-transform duration-200">
                      <span>{card.ctaText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="text-xs text-institutional-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      →
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
