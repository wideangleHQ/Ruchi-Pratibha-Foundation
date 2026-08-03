'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ShieldCheck } from 'lucide-react';
import { CSR_REPORTS } from '../data/csrData';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

export const CSRReports: React.FC = () => {
  return (
    <section
      id="csr-reports"
      className="py-24 sm:py-32 bg-institutional-cream dark:bg-institutional-dark text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Public Accountability
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Transparency &amp; Documentation
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Access reports, event summaries, newsletters, and supporting documentation related to our community initiatives.
          </p>
        </div>

        {/* 4 Report Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CSR_REPORTS.map((rep, idx) => (
            <motion.div
              key={rep.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <InteractiveCard className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 hover:border-institutional-accent/50 transition-all duration-300 shadow-sm hover:shadow-md">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-space text-[10px] uppercase tracking-widest text-institutional-accent font-semibold">
                      {rep.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-institutional-accent/15 flex items-center justify-center text-institutional-accent">
                      <FileText className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-cormorant text-xl font-bold text-institutional-dark dark:text-white mb-2">
                    {rep.title}
                  </h3>

                  <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-4">
                    {rep.summary}
                  </p>

                  <div className="text-[10px] font-space text-gray-500 dark:text-gray-400 mb-4 flex items-center justify-between border-t border-black/5 dark:border-white/5 pt-2">
                    <span>RECORD YEAR: {rep.year}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-institutional-accent" />
                  </div>
                </div>

                <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-space text-institutional-accent font-semibold group/dl cursor-pointer">
                  <span className="truncate max-w-[170px] group-hover/dl:underline">
                    [PDF Download Placeholder]
                  </span>
                  <Download className="w-4 h-4 shrink-0 group-hover/dl:translate-y-0.5 transition-transform" />
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
