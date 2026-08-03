'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveImage } from '@/components/ui/InteractiveImage';

export const WhoWeAre: React.FC = () => {
  return (
    <section id="about-foundation" className="py-20 sm:py-28 bg-institutional-cream dark:bg-institutional-dark text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28">
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
                About Foundation
              </span>
            </div>

            <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white mb-6 leading-[1.15]">
              An Institutional Sanctuary for Merit, Heritage and Public Service
            </h2>

            <div className="space-y-4 font-manrope text-sm sm:text-base lg:text-lg text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-8">
              <p>
                Founded in <strong>1997</strong>, Ruchi Prativa Foundation was incorporated with a timeless charter: to celebrate human achievement, encourage education among youth, preserve Odia literary heritage, and strengthen community welfare across the state.
              </p>
              <p>
                Over nearly three decades, the Foundation has grown into one of Odisha’s most revered philanthropic institutions. Through flagship programmes such as the <strong>Ruchi Prativa Sanman</strong> and literary publications <strong>Amaruchi</strong> and <strong>Prativayana</strong>, it honors lifelong dedication while nurturing upcoming generations.
              </p>
              <p>
                As a registered public charitable trust, the Foundation operates with uncompromising transparency, stewardship, and governance—ensuring that every initiative directly serves public good.
              </p>
            </div>

            {/* Elegant Pull Quote */}
            <div className="w-full pl-6 border-l-2 border-institutional-accent py-2 my-2 bg-institutional-accent/5 dark:bg-institutional-accent/10 rounded-r-sm">
              <blockquote className="font-cormorant italic text-lg sm:text-xl text-institutional-dark dark:text-white leading-relaxed">
                &ldquo;An institution is not measured by the height of its structures, but by the depth of its service to society and the permanence of its values.&rdquo;
              </blockquote>
              <cite className="block font-space text-xs uppercase tracking-widest text-institutional-accent font-semibold mt-2 not-italic">
                — Ruchi Prativa Foundation Charter (1997)
              </cite>
            </div>
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
                  {/* Decorative Corner Accents */}
                  <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-institutional-accent/80 z-20 pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-institutional-accent/80 z-20 pointer-events-none" />

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
