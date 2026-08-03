'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const OurLegacy: React.FC = () => {
  return (
    <section id="legacy" className="py-20 sm:py-28 bg-institutional-light dark:bg-institutional-surface/20 text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden">
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Large Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 w-full order-2 lg:order-1"
          >
            <div className="w-full aspect-[4/3] rounded-sm overflow-hidden border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] p-6 flex flex-col justify-between relative shadow-lg">
              <div className="flex items-center justify-between text-[10px] font-space text-institutional-accent uppercase tracking-widest border-b border-black/5 dark:border-white/10 pb-3">
                <span>CONVOCATION ARCHIVES</span>
                <span>28+ YEARS</span>
              </div>

              <div className="my-auto text-center py-6 px-4">
                <span className="text-xs font-space uppercase tracking-[0.2em] text-institutional-accent font-semibold block mb-2">
                  [ Image Placeholder ]
                </span>
                <h4 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white mb-2">
                  Annual Ruchi Prativa Sanman Convocation Archives
                </h4>
                <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
                  Gathering of Odisha Governors, Chief Ministers, Chief Justices, scholars, and honorees. • TODO: Insert historical convocation image from Amaruchi archives.
                </p>
              </div>

              <div className="pt-3 border-t border-black/5 dark:border-white/10 text-[10px] font-space text-gray-500 dark:text-gray-400 flex justify-between">
                <span>SANMAN ARCHIVE</span>
                <span>PERMANENT RECORD</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex flex-col items-start order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-[1px] w-8 bg-institutional-accent" />
              <span className="text-xs uppercase tracking-[0.2em] font-space text-institutional-accent font-semibold">
                Our Evolution
              </span>
            </div>

            <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white mb-6 leading-[1.15]">
              Three Decades of Unwavering Stewardship
            </h2>

            <div className="space-y-4 font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6">
              <p>
                The story of Ruchi Prativa Foundation is a story of continuous dedication. Established in 1997, it began as a humble initiative to shine a light on individuals whose extraordinary contributions were transforming literature, education, and society in Odisha.
              </p>
              <p>
                Over the years, that initial spark expanded into an institutional ecosystem. The annual <strong>Ruchi Prativa Sanman</strong> grew into one of the state’s most prestigious recognitions, while literary journals <strong>Amaruchi</strong> and <strong>Prativayana</strong> created a permanent record of intellectual discourse.
              </p>
            </div>

            {/* Highlight Quote */}
            <div className="w-full p-5 mb-8 bg-white/60 dark:bg-white/[0.03] border-l-2 border-institutional-accent rounded-r-sm">
              <p className="font-cormorant italic text-lg sm:text-xl text-institutional-dark dark:text-white leading-relaxed">
                &ldquo;Over nearly three decades, our legacy has grown into a living sanctuary of Odisha’s intellectual and cultural spirit.&rdquo;
              </p>
            </div>

            {/* Action CTA */}
            <div>
              <a
                href="#values"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark dark:text-white border border-institutional-dark dark:border-white/30 hover:bg-institutional-dark hover:text-white dark:hover:bg-white dark:hover:text-institutional-dark transition-all duration-300 rounded-sm"
              >
                <span>Read Our Values</span>
                <ArrowRight className="w-4 h-4 text-institutional-accent group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
