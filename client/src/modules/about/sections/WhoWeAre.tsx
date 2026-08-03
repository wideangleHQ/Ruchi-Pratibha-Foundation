'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveImage } from '@/components/ui/InteractiveImage';
import { ChevronDown, BookOpen } from 'lucide-react';

export const WhoWeAre: React.FC = () => {
  const [showCharterDetail, setShowCharterDetail] = useState(false);

  return (
    <section
      id="about-foundation"
      className="py-20 sm:py-28 bg-institutional-cream dark:bg-institutional-dark text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-[1px] w-8 bg-institutional-accent" />
              <span className="text-xs uppercase tracking-[0.2em] font-space text-institutional-accent font-semibold">
                Who We Are
              </span>
            </div>

            <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white mb-6 leading-[1.15]">
              About Ruchi Prativa Foundation
            </h2>

            {/* Editorial Reading Blocks with Smooth Fade Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4 font-manrope text-base sm:text-lg text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6 font-normal"
            >
              <p>
                Established in <strong>1997</strong>, <strong>Ruchi Prativa Foundation</strong> is a registered public charitable trust dedicated to recognising excellence, promoting education, preserving literature and culture, and encouraging social responsibility.
              </p>
              <p>
                Since its inception, the Foundation has served as a platform to honour individuals whose extraordinary contributions have enriched society while inspiring future generations to pursue knowledge, service, and integrity.
              </p>
              <p>
                Through its flagship recognition <strong>Ruchi Prativa Sanman</strong>, its literary publications <strong>Amaruchi</strong> and <strong>Prativayana</strong>, and its continued commitment to educational, cultural, and philanthropic initiatives, the Foundation has built a legacy that reflects the values of compassion, excellence, and public service.
              </p>
              <p>
                Guided by these principles, it continues to strengthen Odisha&apos;s rich heritage while contributing to the broader development of society.
              </p>
            </motion.div>

            {/* Elegant Pull Quote */}
            <div className="w-full pl-6 border-l-2 border-institutional-accent py-3 bg-institutional-accent/5 dark:bg-institutional-accent/10 rounded-r-sm mb-6">
              <blockquote className="font-cormorant italic text-lg sm:text-xl text-institutional-dark dark:text-white leading-relaxed">
                &ldquo;An institution is not measured by the height of its structures, but by the depth of its service to society and the permanence of its values.&rdquo;
              </blockquote>
              <cite className="block font-space text-xs uppercase tracking-widest text-institutional-accent font-semibold mt-2 not-italic">
                — Ruchi Prativa Foundation Charter (1997)
              </cite>
            </div>

            {/* Interactive Click-To-Reveal Disclosure */}
            <div className="w-full mb-6">
              <button
                onClick={() => setShowCharterDetail(!showCharterDetail)}
                className="inline-flex items-center gap-2 text-xs font-space uppercase tracking-wider text-institutional-accent hover:text-institutional-dark dark:hover:text-white font-semibold transition-colors duration-150 cursor-pointer focus:outline-none"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{showCharterDetail ? 'Hide Charter Excerpt' : 'Read 1997 Charter Excerpt'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showCharterDetail ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showCharterDetail && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-3 p-4 bg-white dark:bg-institutional-surface/60 border border-black/10 dark:border-white/10 rounded-sm"
                  >
                    <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed italic">
                      &ldquo;Clause 3(a): The Foundation shall operate exclusively as a public charitable trust dedicated to the advancement of education, recognition of outstanding human effort in Odia literature and culture, and the relief of distress among underprivileged communities in Odisha.&rdquo;
                    </p>
                    <span className="text-[10px] font-space text-institutional-accent block mt-2">
                      Source: Official Public Trust Deed Reg. No. 1997/RPF
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <a
              href="#foundation-story"
              className="group inline-flex items-center gap-2.5 px-6 py-3 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark dark:text-white border border-institutional-dark dark:border-white/30 hover:bg-institutional-dark hover:text-white dark:hover:bg-white dark:hover:text-institutional-dark transition-all duration-300 rounded-sm"
            >
              <span>Read Our Foundation Story</span>
              <span className="text-institutional-accent group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>

          {/* Right Column: Large Interactive Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 w-full"
          >
            <div className="w-full aspect-[4/5] rounded-sm overflow-hidden border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] p-2.5 shadow-xl hover:shadow-2xl hover:border-institutional-accent transition-all duration-500">
              <InteractiveImage className="w-full h-full rounded-sm">
                <div className="w-full h-full flex flex-col justify-between p-6 relative bg-gradient-to-b from-institutional-surface/90 via-institutional-dark to-institutional-darker text-white">
                  <div className="flex items-center justify-between text-[10px] font-space text-institutional-accent uppercase tracking-widest border-b border-white/15 pb-3">
                    <span>HISTORICAL ARCHIVE</span>
                    <span>EST. 1997</span>
                  </div>

                  <div className="my-auto text-center py-6 px-3">
                    <span className="text-xs font-space uppercase tracking-[0.2em] text-institutional-accent font-semibold block mb-3">
                      [ Image Placeholder ]
                    </span>
                    <h4 className="font-cormorant text-2xl font-bold text-white mb-2">
                      Foundation Public Charter Assembly &amp; Cultural Discourse
                    </h4>
                    <p className="font-manrope text-xs text-gray-300 max-w-xs mx-auto leading-relaxed">
                      Historical gathering of scholars, community leaders, and founding trustees in Odisha. • TODO: Insert official photograph from Prativayana archival gallery.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/15 text-[10px] font-space text-gray-400 flex justify-between">
                    <span>ITEM #RPF-1997-ARCHIVE</span>
                    <span>DOCUMENTED AT INCEPTION</span>
                  </div>
                </div>
              </InteractiveImage>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
