'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

export const Leadership: React.FC = () => {
  const [expandedProfile, setExpandedProfile] = useState<string | null>(null);

  const toggleProfile = (id: string) => {
    setExpandedProfile((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="leadership"
      className="py-20 sm:py-28 bg-institutional-cream dark:bg-institutional-dark text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
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
            Leadership &amp; Advisory Council
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Guided by visionary founders, distinguished scholars, public administrators, and community leaders.
          </p>
        </div>

        {/* 2 Interactive Leadership Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Founder & Managing Trustee Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <InteractiveCard className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 sm:p-8 hover:border-institutional-accent/50 transition-all duration-300">
              <div>
                {/* Portrait Placeholder */}
                <div className="w-full aspect-[4/3] rounded-sm bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-4 flex flex-col items-center justify-center text-center mb-6 group relative overflow-hidden">
                  <span className="text-[11px] font-space uppercase tracking-widest text-institutional-accent font-semibold mb-1">
                    [ Archival Portrait Placeholder ]
                  </span>
                  <span className="text-[10px] font-manrope text-gray-500 dark:text-gray-400">
                    Shri Sarat Kumar Sahoo • Founder &amp; Managing Trustee
                  </span>
                </div>

                <span className="text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-1">
                  FOUNDER &amp; MANAGING TRUSTEE
                </span>
                <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-institutional-dark dark:text-white mb-3">
                  Shri Sarat Kumar Sahoo
                </h3>
                <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-4">
                  Pioneered the establishment of Ruchi Prativa Foundation in 1997 with a vision to recognise excellence, empower youth through education, and preserve Odisha’s rich literary heritage.
                </p>

                {/* Click-to-Reveal Full Biography */}
                <button
                  onClick={() => toggleProfile('founder')}
                  className="inline-flex items-center gap-1.5 text-xs font-space uppercase tracking-wider text-institutional-accent hover:text-institutional-dark dark:hover:text-white font-semibold transition-colors duration-150 cursor-pointer focus:outline-none mb-2"
                >
                  <span>{expandedProfile === 'founder' ? 'Hide Biography' : 'Read Archival Biography'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expandedProfile === 'founder' ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {expandedProfile === 'founder' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden p-4 mt-2 bg-black/5 dark:bg-white/5 rounded-sm border border-black/5 dark:border-white/5 space-y-2"
                    >
                      <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed">
                        Under Shri Sahoo’s leadership, the Foundation introduced the flagship Ruchi Prativa Sanman and published Amaruchi and Prativayana. His dedication ensures 100% transparent public governance and selfless community service.
                      </p>
                      <span className="text-[10px] font-space text-institutional-accent block">
                        Source: Prativayana Trustees Profile (1997-2026)
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-4 mt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] font-space text-institutional-mutedLight dark:text-gray-400">
                <span>FOUNDING TRUSTEE</span>
                <span>EST. 1997</span>
              </div>
            </InteractiveCard>
          </motion.div>

          {/* Advisory Council & Jury Panel Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <InteractiveCard className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 sm:p-8 hover:border-institutional-accent/50 transition-all duration-300">
              <div>
                {/* Board Group Placeholder */}
                <div className="w-full aspect-[4/3] rounded-sm bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-4 flex flex-col items-center justify-center text-center mb-6 group relative overflow-hidden">
                  <span className="text-[11px] font-space uppercase tracking-widest text-institutional-accent font-semibold mb-1">
                    [ Archival Portrait Placeholder ]
                  </span>
                  <span className="text-[10px] font-manrope text-gray-500 dark:text-gray-400">
                    Institutional Advisory Trustees &amp; Jurors Assembly
                  </span>
                </div>

                <span className="text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-1">
                  GOVERNANCE &amp; ADVISORY COUNCIL
                </span>
                <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-institutional-dark dark:text-white mb-3">
                  Advisory Trustees &amp; Jurors
                </h3>
                <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-4">
                  Composed of distinguished educationists, authors, judges, scientists, and social visionaries who oversee transparent selection of Sanman honorees and public trust compliance.
                </p>

                {/* Click-to-Reveal Council Guidelines */}
                <button
                  onClick={() => toggleProfile('council')}
                  className="inline-flex items-center gap-1.5 text-xs font-space uppercase tracking-wider text-institutional-accent hover:text-institutional-dark dark:hover:text-white font-semibold transition-colors duration-150 cursor-pointer focus:outline-none mb-2"
                >
                  <span>{expandedProfile === 'council' ? 'Hide Jury Principles' : 'Read Jury Principles'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expandedProfile === 'council' ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {expandedProfile === 'council' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden p-4 mt-2 bg-black/5 dark:bg-white/5 rounded-sm border border-black/5 dark:border-white/5 space-y-2"
                    >
                      <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed">
                        The selection panel adheres to strict conflict-of-interest guidelines. Nominations undergo independent peer evaluation before final approval by the Board of Trustees.
                      </p>
                      <span className="text-[10px] font-space text-institutional-accent block">
                        Source: RPF Sanman Jury Charter Section 4.2
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-4 mt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] font-space text-institutional-mutedLight dark:text-gray-400">
                <span>ADVISORY BOARD</span>
                <span>INDEPENDENT JURY</span>
              </div>
            </InteractiveCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
