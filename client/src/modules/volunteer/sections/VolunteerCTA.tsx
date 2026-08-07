'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface VolunteerCTAProps {
  onOpenWizard: () => void;
}

export const VolunteerCTA: React.FC<VolunteerCTAProps> = ({ onOpenWizard }) => {
  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-[#121824] border-b border-gray-200 dark:border-white/10 text-center flex flex-col items-center justify-center">
      <div className="max-w-[800px] w-full mx-auto px-6 sm:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-6xl text-institutional-accent/40 font-cormorant leading-none block mb-4">&quot;</span>
          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-institutional-dark dark:text-white leading-[1.2] mb-12">
            Every journey of service begins with a single decision to participate.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <button
            onClick={onOpenWizard}
            className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-10 py-4 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover transition-colors duration-200 rounded-sm shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent"
          >
            <span>Submit Application</span>
            <ArrowRight className="w-4 h-4 text-institutional-dark" />
          </button>
          
          <Link
            href="/get-involved#journeys"
            className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-10 py-4 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark dark:text-white bg-transparent border border-gray-300 dark:border-white/20 hover:border-institutional-accent dark:hover:border-institutional-accent hover:text-institutional-accent dark:hover:text-institutional-accent transition-all duration-200 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent"
          >
            <span>Explore Opportunities</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
