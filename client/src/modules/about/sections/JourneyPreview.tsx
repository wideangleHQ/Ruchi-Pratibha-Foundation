'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const JourneyPreview: React.FC = () => {
  const steps = [
    { year: '1997', title: 'Foundation Established', desc: 'Trust charter & Ruchi Prativa Sanman introduced.' },
    { year: '2004', title: 'Academic Excellence', desc: 'Meritorious student awards instituted across Odisha.' },
    { year: '2011', title: 'Literary Publications', desc: 'Launch of flagship journals Amaruchi & Prativayana.' },
    { year: '2018', title: 'Personalities Honoured', desc: 'Expanded awards to multi-disciplinary trailblazers.' },
    { year: 'Present Day', title: 'Continuing Legacy', desc: 'Digital transformation & expanding community impact.' },
  ];

  return (
    <section id="journey" className="py-20 sm:py-28 bg-institutional-cream dark:bg-institutional-dark text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden">
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.2em] font-space text-institutional-accent font-semibold">
              Three Decades
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Our Journey Through Time
          </h2>
          <p className="font-manrope text-sm text-institutional-mutedLight dark:text-gray-300 mt-2.5">
            Key milestones shaping nearly 30 years of recognition, education, and cultural preservation.
          </p>
        </div>

        {/* Horizontal Timeline Track */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative mb-12">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[1px] bg-institutional-accent/30 z-0" />

          {steps.map((step, idx) => (
            <motion.div
              key={step.year}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center p-4 bg-white/60 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-sm"
            >
              <span className="w-8 h-8 rounded-full bg-institutional-accent text-institutional-dark font-space text-xs font-bold flex items-center justify-center mb-3 shadow-md">
                {idx + 1}
              </span>
              <span className="font-space text-sm font-bold text-institutional-accent mb-1">
                {step.year}
              </span>
              <h4 className="font-cormorant text-lg font-bold text-institutional-dark dark:text-white mb-1">
                {step.title}
              </h4>
              <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-400 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/#timeline"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-institutional-dark dark:bg-white text-white dark:text-institutional-dark hover:bg-institutional-accent hover:text-institutional-dark dark:hover:bg-institutional-accent dark:hover:text-institutional-dark font-space text-xs font-semibold tracking-widest uppercase rounded-sm shadow-md transition-all duration-300"
          >
            <span>View Complete Timeline</span>
            <ArrowRight className="w-4 h-4 text-institutional-accent group-hover:text-institutional-dark group-hover:translate-x-1 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};
