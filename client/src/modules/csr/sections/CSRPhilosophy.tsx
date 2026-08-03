'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const CSRPhilosophy: React.FC = () => {
  return (
    <section
      id="csr-philosophy"
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
              Our CSR Philosophy
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
            Serving Society with Purpose
          </motion.h2>

          {/* Editorial Reading Blocks */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 font-manrope text-base sm:text-lg lg:text-xl text-institutional-mutedLight dark:text-gray-300 leading-relaxed font-normal mb-10"
          >
            <p>
              Since its establishment in <strong>1997</strong>, Ruchi Prativa Foundation has believed that sustainable development begins with people. Every initiative undertaken by the Foundation is guided by empathy, transparency, and long-term community engagement.
            </p>
            <p>
              Our approach focuses on creating opportunities, preserving dignity, encouraging education, protecting the environment, and supporting communities during times of need. Rather than measuring success solely through numbers, we measure it through the lives touched, the communities strengthened, and the positive change created for future generations.
            </p>
          </motion.div>

          {/* Highlighted Pull Quote */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full p-6 sm:p-8 bg-white dark:bg-institutional-surface/40 border-l-4 border-institutional-accent border-y border-r border-black/5 dark:border-white/10 rounded-r-sm shadow-md"
          >
            <blockquote className="font-cormorant italic text-xl sm:text-2xl lg:text-3xl text-institutional-dark dark:text-white leading-relaxed">
              &ldquo;We measure institutional success not through raw output, but through the dignity preserved, lives touched, and positive change passed to future generations.&rdquo;
            </blockquote>
            <span className="block font-space text-xs uppercase tracking-widest text-institutional-accent font-semibold mt-3">
              — Ruchi Prativa Foundation CSR Charter
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
