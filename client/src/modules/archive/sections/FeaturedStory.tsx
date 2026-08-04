'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ARCHIVE_FEATURED_STORY } from '../data/archiveData';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

export const FeaturedStory: React.FC = () => {
  const story = ARCHIVE_FEATURED_STORY;

  return (
    <section
      id="featured-story"
      className="py-24 sm:py-36 bg-institutional-darker text-white border-b border-white/10 overflow-hidden relative scroll-mt-24"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              {story.tag}
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Spotlight Archival Story
          </h2>
          <p className="font-manrope text-sm sm:text-base text-gray-300 mt-3 leading-relaxed">
            One story. Connected history. Discover the convocation that defined a generation of Odia literature and grassroots action.
          </p>
        </div>

        {/* Immersive Split-Screen Storytelling Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Large Archival Image Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <InteractiveCard className="relative w-full aspect-[4/3] rounded-sm bg-white/5 border border-white/15 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl group">
              {/* Fine Grid Background */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(197,160,89,0.15)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

              <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-4">
                <span className="text-xs font-space uppercase tracking-widest text-institutional-accent font-semibold">
                  HISTORIC CONVOCATION • {story.year}
                </span>
                <span className="text-[10px] font-space uppercase tracking-wider text-gray-400">
                  {story.location}
                </span>
              </div>

              <div className="relative z-10 my-auto text-center py-8 px-4">
                <span className="text-xs font-space uppercase tracking-[0.25em] text-institutional-accent font-semibold block mb-2">
                  [ Archival Convocation Photo Placeholder ]
                </span>
                <h3 className="font-cormorant text-2xl sm:text-4xl font-bold text-white mb-2 leading-tight group-hover:text-institutional-accent transition-colors duration-300">
                  {story.subtitle}
                </h3>
                <p className="font-manrope text-xs text-gray-300 max-w-md mx-auto">
                  Original 35mm archival capture from Saheed Bhawan Convocation Hall (2004).
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-[10px] font-space text-gray-400">
                <span>ARCHIVAL FILM RECORD</span>
                <span className="text-institutional-accent font-semibold">{story.videoDuration}</span>
              </div>
            </InteractiveCard>
          </motion.div>

          {/* Right Column: Progressive Text & Connected Metadata */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div>
              <span className="font-space text-xs uppercase tracking-widest text-institutional-accent font-semibold mb-2 block">
                CONVOCATION STORY • {story.year}
              </span>

              <h3 className="font-cormorant text-3xl sm:text-5xl font-bold text-white mb-6 leading-[1.12]">
                {story.title}
              </h3>

              <p className="font-manrope text-base sm:text-lg text-gray-200 leading-relaxed mb-6 font-semibold">
                {story.summary}
              </p>

              <p className="font-manrope text-xs sm:text-sm text-gray-300 leading-relaxed mb-8">
                {story.fullStory}
              </p>
            </div>

            {/* Connected Content Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/15">
              <div className="p-4 rounded-sm bg-white/5 border border-white/10">
                <span className="text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-1">
                  CONNECTED PUBLICATION
                </span>
                <span className="font-cormorant text-base font-bold text-white block">
                  {story.relatedPublication}
                </span>
              </div>

              <div className="p-4 rounded-sm bg-white/5 border border-white/10">
                <span className="text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-1">
                  HONORED LAUREATES
                </span>
                <span className="font-manrope text-xs text-gray-300 block">
                  {story.relatedAwardees.join(' • ')}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
