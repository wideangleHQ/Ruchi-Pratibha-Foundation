'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown } from 'lucide-react';

export const FoundationStory: React.FC = () => {
  const [showArchivalNote, setShowArchivalNote] = useState(false);

  return (
    <section
      id="foundation-story"
      className="py-24 sm:py-32 bg-institutional-light dark:bg-institutional-surface/20 text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
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
              Our Charter
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
            The Story Behind the Foundation
          </motion.h2>

          {/* Lead Statement */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="w-full p-6 bg-white dark:bg-institutional-surface/40 border-l-4 border-institutional-accent border-y border-r border-black/5 dark:border-white/10 rounded-r-sm shadow-md mb-8"
          >
            <p className="font-cormorant italic text-xl sm:text-2xl lg:text-3xl font-semibold text-institutional-dark dark:text-white leading-relaxed">
              Every enduring institution begins with a purpose.
            </p>
          </motion.div>

          {/* Editorial Reading Blocks with Smooth Fade Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5 font-manrope text-base sm:text-lg lg:text-xl text-institutional-mutedLight dark:text-gray-300 leading-relaxed font-normal mb-10"
          >
            <p>
              <strong>Ruchi Prativa Foundation</strong> was founded on the belief that a progressive society must not only create opportunities but also recognise the individuals whose dedication, creativity, and service inspire others.
            </p>
            <p>
              With this vision, the Foundation was established in <strong>1997</strong> to create a permanent platform that celebrates excellence across diverse fields while encouraging education, literature, culture, and community welfare.
            </p>
            <p>
              What began as an initiative to honour remarkable individuals gradually evolved into a respected institution that documents history, preserves intellectual heritage through publications, and fosters a culture of recognition and social responsibility.
            </p>
            <p>
              For nearly three decades, the Foundation has continued this journey with unwavering commitment—honouring excellence, preserving values, and inspiring generations to contribute meaningfully to society.
            </p>
          </motion.div>

          {/* 3 Interactive Highlight Story Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-10">
            <div className="p-4 bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm hover:border-institutional-accent/40 transition-all duration-200">
              <span className="text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-1">
                CHAPTER I
              </span>
              <h4 className="font-cormorant text-lg font-bold text-institutional-dark dark:text-white mb-1">
                1997 Establishment
              </h4>
              <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300">
                Created to build a permanent platform celebrating excellence across Odisha.
              </p>
            </div>

            <div className="p-4 bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm hover:border-institutional-accent/40 transition-all duration-200">
              <span className="text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-1">
                CHAPTER II
              </span>
              <h4 className="font-cormorant text-lg font-bold text-institutional-dark dark:text-white mb-1">
                Flagship Publications
              </h4>
              <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300">
                Preserving intellectual heritage through Amaruchi and Prativayana journals.
              </p>
            </div>

            <div className="p-4 bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm hover:border-institutional-accent/40 transition-all duration-200">
              <span className="text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-1">
                CHAPTER III
              </span>
              <h4 className="font-cormorant text-lg font-bold text-institutional-dark dark:text-white mb-1">
                Living Public Trust
              </h4>
              <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300">
                Three decades of unwavering commitment, social welfare &amp; public trust.
              </p>
            </div>
          </div>

          {/* Interactive Click-to-Reveal Archival Excerpt */}
          <div className="w-full mb-10">
            <button
              onClick={() => setShowArchivalNote(!showArchivalNote)}
              className="inline-flex items-center gap-2 text-xs font-space uppercase tracking-wider text-institutional-accent hover:text-institutional-dark dark:hover:text-white font-semibold transition-colors duration-150 cursor-pointer focus:outline-none"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{showArchivalNote ? 'Hide Archival Publication Excerpt' : 'Read Publication Excerpt from Amaruchi Vol. I'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showArchivalNote ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showArchivalNote && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-3 p-5 bg-white dark:bg-institutional-surface/60 border border-black/10 dark:border-white/10 rounded-sm"
                >
                  <blockquote className="font-cormorant italic text-sm sm:text-base text-institutional-dark dark:text-white leading-relaxed mb-2">
                    &ldquo;Odisha’s intellectual greatness lies not in static pride of the past, but in our daily commitment to recognise living trailblazers and cultivate the minds of our children.&rdquo;
                  </blockquote>
                  <span className="text-[10px] font-space text-institutional-accent block">
                    — Amaruchi Inaugural Volume Editorial (1997 Archives)
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="#founders-words"
              className="group inline-flex items-center gap-3 px-8 py-4 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover transition-colors duration-200 rounded-sm shadow-md"
            >
              <span>Discover Our Legacy</span>
              <span className="text-institutional-dark group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
