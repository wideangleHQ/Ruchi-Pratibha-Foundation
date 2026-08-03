'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const MissionVision: React.FC = () => {
  return (
    <section id="mission-vision" className="py-24 sm:py-32 bg-institutional-light dark:bg-institutional-surface/20 text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Mission &amp; Vision
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Our Guiding Philosophy
          </h2>
        </div>

        {/* Two Wide Editorial Content Blocks (No Corporate Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Mission Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start pr-0 lg:pr-6 border-l-2 border-institutional-accent pl-6 sm:pl-8"
          >
            <span className="font-space text-xs uppercase tracking-[0.2em] text-institutional-accent font-semibold mb-3">
              INSTITUTIONAL DIRECTIVE I
            </span>

            <h3 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-institutional-dark dark:text-white mb-6 tracking-tight leading-tight">
              Our Mission
            </h3>

            <p className="font-manrope text-base sm:text-lg lg:text-xl text-institutional-mutedLight dark:text-gray-300 leading-relaxed font-normal">
              To recognise extraordinary human achievements, encourage academic excellence among youth, preserve Odia literary and cultural heritage, and execute transparent social initiatives that strengthen dignity, self-respect, and community welfare across Odisha.
            </p>
          </motion.div>

          {/* Vision Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col items-start pl-6 sm:pl-8 border-l-2 border-institutional-accent/40"
          >
            <span className="font-space text-xs uppercase tracking-[0.2em] text-institutional-accent font-semibold mb-3">
              INSTITUTIONAL DIRECTIVE II
            </span>

            <h3 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-institutional-dark dark:text-white mb-6 tracking-tight leading-tight">
              Our Vision
            </h3>

            <p className="font-manrope text-base sm:text-lg lg:text-xl text-institutional-mutedLight dark:text-gray-300 leading-relaxed font-normal">
              To stand as an enduring institutional pillar where merit is celebrated, knowledge is archived for posterity, and every generation is inspired to contribute selflessly toward a compassionate and intellectually vibrant society.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
