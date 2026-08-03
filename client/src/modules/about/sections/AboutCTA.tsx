'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, HeartHandshake } from 'lucide-react';

export const AboutCTA: React.FC = () => {
  return (
    <section
      id="join-journey"
      className="py-24 sm:py-32 bg-institutional-cream dark:bg-institutional-dark text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="w-12 h-12 rounded-full bg-institutional-accent/20 text-institutional-accent flex items-center justify-center mb-6"
          >
            <HeartHandshake className="w-6 h-6" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-cormorant text-3xl sm:text-6xl font-bold tracking-tight text-institutional-dark dark:text-white mb-6 leading-[1.12]"
          >
            Become Part of Our Journey
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-manrope text-base sm:text-xl text-institutional-mutedLight dark:text-gray-300 max-w-2xl leading-relaxed mb-10"
          >
            Join us in preserving heritage, celebrating excellence, encouraging education, and inspiring future generations across Odisha.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              href="#volunteer"
              className="group inline-flex items-center gap-2.5 px-8 py-4 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover transition-colors duration-200 rounded-sm shadow-xl"
            >
              <span>Become a Volunteer</span>
              <ArrowRight className="w-4 h-4 text-institutional-dark group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/#sanman"
              className="group inline-flex items-center gap-2.5 px-8 py-4 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark dark:text-white border border-institutional-dark dark:border-white/30 hover:bg-institutional-dark hover:text-white dark:hover:bg-white dark:hover:text-institutional-dark transition-all duration-300 rounded-sm"
            >
              <span>Explore Ruchi Prativa Sanman</span>
              <span className="text-institutional-accent group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
