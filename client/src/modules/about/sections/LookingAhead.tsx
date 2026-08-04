'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const LookingAhead: React.FC = () => {
  const focuses = [
    { label: 'Youth', desc: 'Empowering young scholars & meritorious achievers.' },
    { label: 'Knowledge', desc: 'Expanding print & digital reach of Amaruchi & Prativayana.' },
    { label: 'Culture', desc: 'Safeguarding Odia traditions, arts, and heritage.' },
    { label: 'Recognition', desc: 'Sustaining national honor for trailblazing minds.' },
    { label: 'Community', desc: 'Expanding grassroots welfare initiatives across districts.' },
  ];

  return (
    <section className="py-20 sm:py-28 bg-institutional-dark text-white border-b border-white/10 overflow-hidden relative">
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
              Future Vision
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
            Preserving Our Past, Inspiring Future Generations
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

          {/* 5 Focus Areas Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full mb-12">
            {focuses.map((f, idx) => (
              <motion.div
                key={f.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="flex flex-col items-center text-center p-4 rounded-sm bg-white/5 border border-white/10"
                >
                  <span className="font-space text-[10px] uppercase tracking-widest text-institutional-accent font-bold mb-1">
                    0{idx + 1} • {f.label}
                  </span>
                  <span className="font-manrope text-[11px] text-gray-400 leading-snug">
                    {f.desc}
                  </span>
                </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/#pillars"
              className="group inline-flex items-center gap-2.5 px-8 py-4 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover transition-colors duration-200 rounded-sm shadow-xl"
            >
              <span>Discover Our Work</span>
              <ArrowRight className="w-4 h-4 text-institutional-dark group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
