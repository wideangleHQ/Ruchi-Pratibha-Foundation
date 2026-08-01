'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, ArrowRight } from 'lucide-react';

export const ChairmanMessage: React.FC = () => {
  return (
    <section id="chairman" className="py-20 sm:py-28 bg-institutional-cream dark:bg-institutional-surface/20 text-institutional-dark dark:text-institutional-light border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden">
      <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Chairman Portrait Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="group relative w-full max-w-md aspect-[4/5] rounded-sm bg-white dark:bg-institutional-surface/40 border border-institutional-dark/15 dark:border-white/15 p-6 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(197, 160, 89, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(197, 160, 89, 0.15) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest font-space text-institutional-accent font-semibold">
                  Founder&apos;s Perspective
                </span>
                <span className="text-[10px] font-space text-institutional-mutedLight dark:text-gray-400">
                  Est. 1997
                </span>
              </div>

              <div className="relative z-10 my-auto py-8 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-institutional-dark text-institutional-accent flex items-center justify-center mb-4 shadow-md">
                  <Quote className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h4 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white">
                  Shri Sarat Kumar Sahoo
                </h4>
                <span className="font-space text-xs text-institutional-accent mt-1">
                  Founder &amp; Managing Trustee
                </span>
              </div>

              <div className="relative z-10 pt-4 border-t border-institutional-dark/10 dark:border-white/10 flex items-center justify-between text-[10px] font-space text-institutional-mutedLight dark:text-gray-400">
                <span>Ruchi Prativa Foundation</span>
                <span>Leadership</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Personal Message Copy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col justify-center max-w-2xl"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-[1px] w-8 bg-institutional-accent" />
              <span className="text-xs uppercase tracking-[0.2em] font-space text-institutional-accent font-semibold">
                Message From Our Founder
              </span>
            </div>

            <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-institutional-dark dark:text-white tracking-tight mb-6 leading-tight">
              &ldquo;True progress begins when we honor those who serve and uplift those in need.&rdquo;
            </h2>

            <div className="space-y-4 font-manrope text-base sm:text-lg text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-8">
              <p>
                When we established the Ruchi Prativa Foundation nearly thirty years ago, our vision was simple yet eternal: to build an institution that acts as a bridge of hope for grassroots communities and a platform of honor for Odisha’s most dedicated minds.
              </p>
              <p>
                Philanthropy is not merely about resources; it is about human dignity, cultural self-respect, and fostering a spirit of togetherness across generations.
              </p>
            </div>

            <div>
              <a
                href="#message-full"
                className="group inline-flex items-center gap-3 px-7 py-3.5 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark dark:text-white border border-institutional-dark dark:border-white/30 hover:bg-institutional-dark hover:text-white dark:hover:bg-white dark:hover:text-institutional-dark transition-all duration-300 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent"
              >
                <span>Read Full Message</span>
                <ArrowRight className="w-4 h-4 text-institutional-accent group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
