'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Users, Award, Shield } from 'lucide-react';

export const NextChapter: React.FC = () => {
  const focuses = [
    { label: 'Digital Heritage', desc: 'Archiving 30 years of publications & convocation speeches.', icon: Shield },
    { label: 'Youth Engagement', desc: 'Empowering upcoming scholars & meritorious achievers.', icon: Users },
    { label: 'Knowledge Preservation', desc: 'Expanding print & digital distribution of Amaruchi & Prativayana.', icon: BookOpen },
    { label: 'Institutional Growth', desc: 'Expanding award categories & multi-disciplinary jury councils.', icon: Award },
    { label: 'Community Participation', desc: 'Strengthening grassroots welfare initiatives across Odisha districts.', icon: Sparkles },
  ];

  return (
    <section
      id="future"
      className="py-24 sm:py-32 bg-institutional-dark text-white border-b border-white/10 overflow-hidden relative scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              The Next Era
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-cormorant text-3xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.12]"
          >
            Looking Towards the Future
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-manrope text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed mb-12"
          >
            As Ruchi Prativa Foundation enters its next era of service, our commitment remains steadfast: to bridge time-honored heritage with future opportunities, ensuring that merit, compassion, and cultural self-respect flourish across Odisha.
          </motion.p>

          {/* 5 Focus Areas Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full mb-8">
            {focuses.map((f, idx) => {
              const IconComp = f.icon;
              return (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="flex flex-col items-center text-center p-5 rounded-sm bg-white/5 border border-white/10"
                >
                  <IconComp className="w-5 h-5 text-institutional-accent mb-2" />
                  <span className="font-space text-xs uppercase tracking-wider font-bold text-white mb-1">
                    {f.label}
                  </span>
                  <span className="font-manrope text-[11px] text-gray-400 leading-snug">
                    {f.desc}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
