'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

export const VisionMissionValues: React.FC = () => {
  return (
    <section
      id="mission"
      className="py-24 sm:py-32 bg-institutional-cream dark:bg-[#121824] text-institutional-dark dark:text-white border-b border-black/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Institutional Creed
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Vision • Mission • Values
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            The foundational principles that govern our institutional ethics, selection processes, and public service.
          </p>
        </div>

        {/* 3 Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Card 1: Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <InteractiveCard className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-8 hover:border-institutional-accent/40 transition-all duration-300">
              <div>
                <span className="font-space text-[10px] uppercase tracking-widest text-institutional-accent font-semibold block mb-3">
                  INSTITUTIONAL HORIZON
                </span>
                <h3 className="font-cormorant text-3xl font-bold text-institutional-dark dark:text-white mb-4">
                  Our Vision
                </h3>
                <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6">
                  Building a society that celebrates excellence while preserving culture and uplifting communities across Odisha and beyond.
                </p>
              </div>

              <div className="pt-4 border-t border-black/5 dark:border-white/5 text-[11px] font-space text-institutional-accent font-medium">
                Enduring Excellence &amp; Heritage
              </div>
            </InteractiveCard>
          </motion.div>

          {/* Card 2: Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <InteractiveCard className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-8 hover:border-institutional-accent/40 transition-all duration-300">
              <div>
                <span className="font-space text-[10px] uppercase tracking-widest text-institutional-accent font-semibold block mb-3">
                  CORE DIRECTIVES
                </span>
                <h3 className="font-cormorant text-3xl font-bold text-institutional-dark dark:text-white mb-4">
                  Our Mission
                </h3>
                <ul className="space-y-2 font-space text-xs uppercase tracking-wider text-institutional-dark dark:text-gray-200 font-semibold mb-6">
                  <li>• Recognise Lifelong Merit</li>
                  <li>• Educate &amp; Honor Youth</li>
                  <li>• Serve Community Welfare</li>
                  <li>• Preserve Odia Heritage</li>
                  <li>• Inspire Future Generations</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-black/5 dark:border-white/5 text-[11px] font-space text-institutional-accent font-medium">
                Five Pillars of Service
              </div>
            </InteractiveCard>
          </motion.div>

          {/* Card 3: Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <InteractiveCard className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-8 hover:border-institutional-accent/40 transition-all duration-300">
              <div>
                <span className="font-space text-[10px] uppercase tracking-widest text-institutional-accent font-semibold block mb-3">
                  ETHICAL CODE
                </span>
                <h3 className="font-cormorant text-3xl font-bold text-institutional-dark dark:text-white mb-4">
                  Our Values
                </h3>
                <p className="font-manrope text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6">
                  Grounded in six unshakeable virtues: <strong>Integrity</strong>, <strong>Compassion</strong>, <strong>Transparency</strong>, <strong>Respect</strong>, <strong>Service</strong>, and <strong>Excellence</strong>.
                </p>
              </div>

              <div className="pt-4 border-t border-black/5 dark:border-white/5 text-[11px] font-space text-institutional-accent font-medium">
                Uncompromising Public Stewardship
              </div>
            </InteractiveCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
