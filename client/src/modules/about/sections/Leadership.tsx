'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, UserCheck, Shield } from 'lucide-react';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

export const Leadership: React.FC = () => {
  return (
    <section id="leadership" className="py-20 sm:py-28 bg-institutional-cream dark:bg-institutional-dark text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.2em] font-space text-institutional-accent font-semibold">
              Institutional Governance
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Leadership &amp; Advisory Trustees
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Guided by visionary founders, distinguished scholars, public administrators, and community leaders.
          </p>
        </div>

        {/* 2 Leadership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Founder & Managing Trustee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <InteractiveCard className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 sm:p-8">
              <div>
                {/* Portrait Placeholder */}
                <div className="w-full aspect-[4/3] rounded-sm bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-4 flex flex-col items-center justify-center text-center mb-6">
                  <UserCheck className="w-8 h-8 text-institutional-accent mb-2 stroke-[1.5]" />
                  <span className="text-[11px] font-space uppercase tracking-widest text-institutional-accent font-semibold">
                    [ Portrait Placeholder ]
                  </span>
                  <span className="text-[10px] font-manrope text-gray-500 dark:text-gray-400 mt-1">
                    Shri Sarat Kumar Sahoo • Founder &amp; Managing Trustee
                  </span>
                </div>

                <span className="text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-1">
                  FOUNDER &amp; MANAGING TRUSTEE
                </span>
                <h3 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white mb-3">
                  Shri Sarat Kumar Sahoo
                </h3>
                <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed">
                  Pioneered the establishment of Ruchi Prativa Foundation in 1997 with a vision to recognise excellence, empower youth through education, and preserve Odisha’s rich literary heritage.
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] font-space text-institutional-mutedLight dark:text-gray-400">
                <span>FOUNDING TRUSTEE</span>
                <span>EST. 1997</span>
              </div>
            </InteractiveCard>
          </motion.div>

          {/* Board & Advisory Council Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <InteractiveCard className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 sm:p-8">
              <div>
                {/* Board Group Placeholder */}
                <div className="w-full aspect-[4/3] rounded-sm bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-4 flex flex-col items-center justify-center text-center mb-6">
                  <Shield className="w-8 h-8 text-institutional-accent mb-2 stroke-[1.5]" />
                  <span className="text-[11px] font-space uppercase tracking-widest text-institutional-accent font-semibold">
                    [ Portrait Placeholder ]
                  </span>
                  <span className="text-[10px] font-manrope text-gray-500 dark:text-gray-400 mt-1">
                    Institutional Advisory Trustees &amp; Jurors Assembly
                  </span>
                </div>

                <span className="text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-1">
                  GOVERNANCE &amp; ADVISORY COUNCIL
                </span>
                <h3 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white mb-3">
                  Advisory Trustees &amp; Jurors
                </h3>
                <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed">
                  Composed of distinguished educationists, authors, judges, scientists, and social visionaries who oversee transparent selection of Sanman honorees and public trust compliance.
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] font-space text-institutional-mutedLight dark:text-gray-400">
                <span>ADVISORY BOARD</span>
                <span>INDEPENDENT JURY</span>
              </div>
            </InteractiveCard>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#governance"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-institutional-dark dark:bg-white text-white dark:text-institutional-dark hover:bg-institutional-accent hover:text-institutional-dark dark:hover:bg-institutional-accent dark:hover:text-institutional-dark font-space text-xs font-semibold tracking-widest uppercase rounded-sm shadow-md transition-all duration-300"
          >
            <span>Meet Our Leadership</span>
            <ArrowRight className="w-4 h-4 text-institutional-accent group-hover:text-institutional-dark group-hover:translate-x-1 transition-all duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};
