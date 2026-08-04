'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { MEDIA_RESOURCES } from '../data/archiveData';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

export const MediaResourceCentre: React.FC = () => {
  return (
    <section
      id="media-resource"
      className="py-24 sm:py-36 bg-institutional-cream dark:bg-institutional-surface/20 text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Section 10 • Press &amp; Brand Downloads
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Media Resource Centre
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            High-resolution brand assets, press kits, official logos, and archival photography packages for media houses, journalists, and institutional partners.
          </p>
        </div>

        {/* Media Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {MEDIA_RESOURCES.map((res, idx) => (
            <motion.div
              key={res.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <InteractiveCard className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 sm:p-7 hover:border-institutional-accent transition-all duration-300 shadow-sm hover:shadow-xl">
                <div>
                  {/* Category & Format */}
                  <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-3 mb-4">
                    <span className="font-space text-[10px] uppercase tracking-widest text-institutional-accent font-semibold">
                      {res.category}
                    </span>
                    <span className="font-space text-[9px] uppercase tracking-wider text-institutional-accent font-semibold border border-institutional-accent/30 px-2 py-0.5 rounded">
                      {res.fileFormat}
                    </span>
                  </div>

                  <h3 className="font-cormorant text-xl sm:text-2xl font-bold text-institutional-dark dark:text-white mb-2 leading-snug">
                    {res.title}
                  </h3>

                  <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6">
                    {res.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5 dark:border-white/10">
                  <button
                    onClick={() => alert(`Initiating download for ${res.title} (${res.fileSize})`)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-space uppercase tracking-widest text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover font-semibold transition-colors rounded-sm cursor-pointer min-h-[44px]"
                  >
                    <span>Download ({res.fileSize})</span>
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
