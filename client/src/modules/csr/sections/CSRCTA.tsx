'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Building2 } from 'lucide-react';

export const CSRCTA: React.FC = () => {
  return (
    <section
      id="csr-cta"
      className="py-24 sm:py-32 bg-institutional-dark text-white border-b border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28 relative"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="w-14 h-14 rounded-full bg-institutional-accent/20 border border-institutional-accent/40 flex items-center justify-center mb-6 text-institutional-accent"
          >
            <HeartHandshake className="w-7 h-7 stroke-[1.5]" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-cormorant text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight"
          >
            Be Part of the Change
          </motion.h2>

          {/* Body Text */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-manrope text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed mb-10"
          >
            Every meaningful initiative begins with people who believe in making a difference. Whether you wish to volunteer, collaborate as a partner, or support community programmes, your participation helps create stronger communities and brighter futures.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover transition-colors duration-200 rounded-sm shadow-xl min-w-[200px]"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Become a Volunteer</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xs uppercase tracking-widest font-space font-semibold text-white border border-white/30 hover:bg-white hover:text-institutional-dark transition-all duration-300 rounded-sm min-w-[200px]"
            >
              <Building2 className="w-4 h-4" />
              <span>Partner With Us</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
