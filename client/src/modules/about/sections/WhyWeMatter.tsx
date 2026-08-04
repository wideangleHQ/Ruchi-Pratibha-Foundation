'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveImage } from '@/components/ui/InteractiveImage';
import { ChevronDown } from 'lucide-react';

export const WhyWeMatter: React.FC = () => {
  const [expandedReason, setExpandedReason] = useState<number | null>(0);

  const reasons = [
    {
      tag: 'WHY RECOGNITION?',
      title: 'Honouring Lifelong Merit',
      summary: 'Publicly celebrating individuals whose contributions transform literature, science, and society.',
      detail: 'When society honours merit, it establishes high moral and intellectual standards for upcoming generations, proving that integrity and public dedication are valued above fleeting gains.',
    },
    {
      tag: 'WHY EDUCATION?',
      title: 'Empowering Meritorious Youth',
      summary: 'Instituting academic awards and scholarships for deserving young scholars across Odisha.',
      detail: 'Education is the engine of social mobility. By supporting top performers in schools and colleges, we nurture the scholars, researchers, and public leaders of tomorrow.',
    },
    {
      tag: 'WHY CULTURE?',
      title: 'Preserving Odia Literature & Heritage',
      summary: 'Publishing flagship journals Amaruchi and Prativayana to archive intellectual thought.',
      detail: 'A society that loses its literary memory loses its self-respect. Our publications provide a permanent printed and digital home for Odia language, essays, and creative expressions.',
    },
    {
      tag: 'WHY SERVICE?',
      title: 'Grassroots Social Welfare & Public Trust',
      summary: 'Executing transparent community welfare projects under audited trust governance.',
      detail: 'Operated strictly under public charitable trust charters, 100% of our welfare programs deliver direct community support while adhering to strict tax and financial audit standards.',
    },
  ];

  return (
    <section
      id="why-we-matter"
      className="py-24 sm:py-32 bg-institutional-light dark:bg-institutional-surface/20 text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Institutional Values
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Why Ruchi Prativa Foundation Matters
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Discover four foundational reasons why our three-decade journey continues to matter.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: 4 Interactive Narrative Cards */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {reasons.map((r, idx) => {
              const isExpanded = expandedReason === idx;
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  onClick={() => setExpandedReason(isExpanded ? null : idx)}
                  className={`p-6 rounded-sm bg-white dark:bg-institutional-surface/40 border transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md ${
                    isExpanded
                      ? 'border-institutional-accent ring-1 ring-institutional-accent/30'
                      : 'border-black/10 dark:border-white/10 hover:border-institutional-accent/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="font-cormorant text-2xl font-bold text-institutional-accent shrink-0">
                        0{idx + 1}
                      </span>
                      <div>
                        <span className="font-space text-[10px] uppercase tracking-widest text-institutional-accent font-semibold block">
                          {r.tag}
                        </span>
                        <h3 className="font-cormorant text-xl font-bold text-institutional-dark dark:text-white">
                          {r.title}
                        </h3>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-4 h-4 text-institutional-accent transition-transform duration-300 shrink-0 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 mt-2.5 leading-relaxed">
                    {r.summary}
                  </p>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden pt-3 mt-3 border-t border-black/5 dark:border-white/5"
                      >
                        <p className="font-manrope text-xs text-institutional-dark dark:text-gray-200 leading-relaxed font-medium">
                          {r.detail}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Featured Archival Image & Quote */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 w-full sticky top-28"
          >
            <div className="w-full aspect-[4/5] rounded-sm overflow-hidden border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] p-2.5 shadow-xl hover:shadow-2xl hover:border-institutional-accent transition-all duration-500">
              <InteractiveImage className="w-full h-full rounded-sm">
                <div className="w-full h-full flex flex-col justify-between p-6 relative bg-gradient-to-b from-institutional-surface/90 via-institutional-dark to-institutional-darker text-white">
                  <div className="flex items-center justify-between text-[10px] font-space text-institutional-accent uppercase tracking-widest border-b border-white/15 pb-3">
                    <span>CULTURAL MEMORY</span>
                    <span>28+ YEARS</span>
                  </div>

                  <div className="my-auto text-center py-6 px-3">
                    <span className="text-xs font-space uppercase tracking-[0.2em] text-institutional-accent font-semibold block mb-3">
                      [ Image Placeholder ]
                    </span>
                    <h4 className="font-cormorant text-2xl font-bold text-white mb-2">
                      Scholarly Assembly &amp; Community Gathering
                    </h4>
                    <p className="font-manrope text-xs text-gray-300 max-w-xs mx-auto leading-relaxed">
                      Preserving memory across generations • TODO: Insert official photograph from Prativayana archives.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/15 text-[10px] font-space text-gray-400 flex justify-between">
                    <span>ITEM #RPF-MATTER-ARCHIVE</span>
                    <span>PERMANENT RECORD</span>
                  </div>
                </div>
              </InteractiveImage>
            </div>

            <div className="w-full pl-5 border-l-2 border-institutional-accent py-3 my-4 bg-institutional-accent/5 dark:bg-institutional-accent/10 rounded-r-sm">
              <blockquote className="font-cormorant italic text-base sm:text-lg text-institutional-dark dark:text-white leading-relaxed">
                &ldquo;Our relevance is defined by the lives we touch, the heritage we preserve, and the future we help shape.&rdquo;
              </blockquote>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
