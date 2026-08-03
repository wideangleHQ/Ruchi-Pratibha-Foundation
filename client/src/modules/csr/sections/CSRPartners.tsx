'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Stethoscope, Briefcase, Handshake, Users2, Home } from 'lucide-react';
import { PARTNER_CATEGORIES } from '../data/csrData';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

const PARTNER_ICONS: Record<string, React.ElementType> = {
  'Educational Institutions': Building2,
  'Healthcare Organizations': Stethoscope,
  'Corporate & CSR Partners': Briefcase,
  'NGOs & Civil Society': Handshake,
  'Youth & Volunteers': Users2,
  'Local Communities': Home,
};

export const CSRPartners: React.FC = () => {
  return (
    <section
      id="csr-partners"
      className="py-24 sm:py-32 bg-institutional-cream dark:bg-institutional-dark text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Social Collaboration
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Working Together for Greater Impact
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Meaningful social change is achieved through collaboration. Ruchi Prativa Foundation works alongside educational institutions, healthcare professionals, community organisations, volunteers, corporate partners, and local communities to create initiatives that deliver lasting impact.
          </p>
        </div>

        {/* 6 Partner Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PARTNER_CATEGORIES.map((p, idx) => {
            const IconComp = PARTNER_ICONS[p.title] || Handshake;

            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <InteractiveCard className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 sm:p-7 hover:border-institutional-accent/50 transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-space text-[10px] uppercase tracking-widest text-institutional-accent font-semibold">
                        {p.tag}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-institutional-accent/15 text-institutional-accent flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white mb-2">
                      {p.title}
                    </h3>

                    <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-4">
                      {p.description}
                    </p>

                    <div className="pt-3 border-t border-black/5 dark:border-white/5">
                      <span className="text-[10px] font-space uppercase text-institutional-accent font-semibold block mb-2">
                        TYPICAL COLLABORATORS
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {p.examples.map((ex) => (
                          <span
                            key={ex}
                            className="text-[10px] font-space px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-institutional-dark dark:text-gray-200"
                          >
                            • {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-6 border-t border-black/5 dark:border-white/5 text-[10px] font-space text-gray-500 dark:text-gray-400 flex justify-between">
                    <span>PARTNERSHIP NETWORK</span>
                    <span>TODO: Partner Registration</span>
                  </div>
                </InteractiveCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
