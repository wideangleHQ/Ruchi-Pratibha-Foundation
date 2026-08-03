'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const OurPhilosophy: React.FC = () => {
  return (
    <section
      id="philosophy"
      className="py-24 sm:py-32 bg-institutional-cream dark:bg-institutional-dark text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-4xl mx-auto flex flex-col items-start">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Institutional Creed
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-cormorant text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-institutional-dark dark:text-white mb-8 leading-[1.12]"
          >
            Why Recognition Matters
          </motion.h2>

          {/* Editorial Paragraphs with Smooth Fade Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5 font-manrope text-base sm:text-lg lg:text-xl text-institutional-mutedLight dark:text-gray-300 leading-relaxed font-normal mb-8"
          >
            <p>
              To recognise an individual for their lifelong service or creative genius is not merely to confer an award—it is an act of cultural self-respect. When society publicly honours merit, it elevates standards for everyone, signaling to upcoming generations that dedication, integrity, and intellect are valued above fleeting gain.
            </p>
            <p>
              At <strong>Ruchi Prativa Foundation</strong>, recognition is paired inextricably with education and cultural stewardship. By acknowledging meritorious youth alongside veteran scholars, we build a bridge of continuity: passing the torch of Odia heritage, language, and moral responsibility from one generation to the next.
            </p>
          </motion.div>

          {/* Pull Quote Callout Block */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full p-6 sm:p-8 bg-white dark:bg-institutional-surface/40 border-l-4 border-institutional-accent border-y border-r border-black/5 dark:border-white/10 rounded-r-sm shadow-md"
          >
            <blockquote className="font-cormorant italic text-xl sm:text-2xl lg:text-3xl text-institutional-dark dark:text-white leading-relaxed">
              &ldquo;Recognition transforms individual brilliance into a collective heritage that inspires the future.&rdquo;
            </blockquote>
            <span className="block font-space text-xs uppercase tracking-widest text-institutional-accent font-semibold mt-3">
              — Foundation Governance Principle
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
