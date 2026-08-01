'use client';

import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Landmark, Award, ArrowUpRight, ShieldCheck } from 'lucide-react';
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

  const cardIcons = [Landmark, Award, ShieldCheck];

  return (
    <div className="mt-6 lg:mt-8 w-full transition-all duration-300">
      <AnimatePresence mode="wait">
        <motion.div
          key={milestone.id}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {milestone.cards.map((card: MilestoneCard, idx: number) => {
            const IconComp = cardIcons[idx % cardIcons.length];
            return (
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
                        <div className="relative w-12 h-12 rounded-full border-2 border-institutional-accent/40 bg-white dark:bg-institutional-dark flex items-center justify-center text-institutional-accent mb-2 transition-all duration-300 ease-out group-hover:border-institutional-accent group-hover:bg-institutional-accent group-hover:text-institutional-dark shadow-sm">
                          <div className="absolute inset-1 rounded-full bg-institutional-accent/15 dark:bg-institutional-accent/25 group-hover:bg-white/40 dark:group-hover:bg-white/30 transition-colors duration-300 pointer-events-none" />
                          <IconComp className="relative z-10 w-5 h-5 stroke-[1.75] transition-all duration-300 group-hover:scale-110 group-hover:text-institutional-dark" />
                        </div>
                        <span className="text-[9px] uppercase tracking-widest font-space text-institutional-mutedLight dark:text-gray-400">
                          Historical Archive
                        </span>
                      </div>
                    )}

                    {/* Card 2 & 3 Icon Container with Concentric Circle */}
                    {card.type !== 'overview' && (
                      <div className="relative w-12 h-12 rounded-full border-2 border-institutional-accent/40 bg-white dark:bg-institutional-dark flex items-center justify-center text-institutional-accent mb-6 transition-all duration-300 ease-out group-hover:border-institutional-accent group-hover:bg-institutional-accent group-hover:text-institutional-dark shadow-sm">
                        <div className="absolute inset-1 rounded-full bg-institutional-accent/15 dark:bg-institutional-accent/25 group-hover:bg-white/40 dark:group-hover:bg-white/30 transition-colors duration-300 pointer-events-none" />
                        <IconComp className="relative z-10 w-5 h-5 stroke-[1.75] transition-all duration-300 group-hover:scale-110 group-hover:text-institutional-dark" />
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
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
