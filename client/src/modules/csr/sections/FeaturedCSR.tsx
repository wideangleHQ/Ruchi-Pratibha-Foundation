'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FEATURED_CSR_ACTIVITIES } from '../data/csrData';
import { InteractiveCard } from '@/components/ui/InteractiveCard';
import { InteractiveImage } from '@/components/ui/InteractiveImage';

export const FeaturedCSR: React.FC = () => {
  const featured = FEATURED_CSR_ACTIVITIES.slice(0, 3);

  return (
    <section
      id="featured-csr"
      className="py-24 sm:py-32 bg-institutional-light dark:bg-institutional-surface/20 text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Flagship Initiatives
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Featured Community Initiatives
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Highlighting key welfare programs that demonstrate our commitment to long-term social progress across Odisha.
          </p>
        </div>

        {/* 3 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((act, idx) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <InteractiveCard className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 sm:p-7 hover:border-institutional-accent/50 transition-all duration-300 shadow-md hover:shadow-xl">
                <div>
                  {/* Interactive Image Container */}
                  <div className="w-full aspect-[16/10] rounded-sm overflow-hidden border border-black/10 dark:border-white/10 mb-6 group relative bg-black/5 dark:bg-white/5">
                    <InteractiveImage className="w-full h-full rounded-sm">
                      <div className="w-full h-full flex flex-col justify-between p-5 relative bg-gradient-to-b from-institutional-surface/90 via-institutional-dark to-institutional-darker text-white">
                        <div className="flex items-center justify-between text-[10px] font-space text-institutional-accent uppercase tracking-widest border-b border-white/15 pb-2">
                          <span>{act.category}</span>
                          <span>{act.year}</span>
                        </div>

                        <div className="my-auto text-center py-3">
                          <span className="text-xs font-space uppercase tracking-[0.2em] text-institutional-accent font-semibold block mb-1">
                            [ Feature Image Placeholder ]
                          </span>
                          <p className="font-manrope text-xs text-gray-300">
                            {act.location}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-white/15 text-[9px] font-space text-gray-400 flex justify-between">
                          <span>FEATURED RECORD</span>
                          <span>RPF IMPACT ARCHIVE</span>
                        </div>
                      </div>
                    </InteractiveImage>
                  </div>

                  <span className="text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-1">
                    {act.category} • {act.district}
                  </span>
                  <h3 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white mb-3">
                    {act.title}
                  </h3>
                  <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6">
                    {act.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-space text-institutional-accent font-semibold">
                  <a href="#csr-archive" className="inline-flex items-center gap-1 hover:underline">
                    <span>Explore Archive Item</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
