'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { IMPACT_STORIES } from '../data/csrData';
import { CSRStory } from '../types';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

export const StoriesOfImpact: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [selectedStory, setSelectedStory] = useState<CSRStory | null>(null);

  const currentStory = IMPACT_STORIES[activeIdx];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % IMPACT_STORIES.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + IMPACT_STORIES.length) % IMPACT_STORIES.length);
  };

  return (
    <section
      id="stories-of-impact"
      className="py-24 sm:py-32 bg-institutional-cream dark:bg-institutional-dark text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Human Impact Stories
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Every Activity Has a Story
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Behind every initiative lies a story of hope, determination, and collective effort. Whether it is a student receiving encouragement, a community benefiting from healthcare outreach, or volunteers coming together for environmental conservation, these stories remind us that meaningful change begins with people.
          </p>
        </div>

        {/* Storytelling Carousel View */}
        <div className="max-w-4xl mx-auto">
          <InteractiveCard className="bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 sm:p-12 shadow-none sm:shadow-xl relative overflow-hidden">
            {/* Story Category Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6 sm:mb-8 border-b border-black/5 dark:border-white/5 pb-4">
              {IMPACT_STORIES.map((st, sIdx) => (
                <button
                  key={st.id}
                  onClick={() => setActiveIdx(sIdx)}
                  className={`text-xs font-space uppercase tracking-wider px-3.5 py-2.5 min-h-[40px] flex items-center justify-center rounded-sm transition-all duration-200 cursor-pointer ${
                    activeIdx === sIdx
                      ? 'bg-institutional-accent text-institutional-dark font-bold'
                      : 'bg-black/5 dark:bg-white/5 text-gray-500 hover:text-institutional-accent'
                  }`}
                >
                  {st.role} Story
                </button>
              ))}
            </div>

            {/* Slide Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStory.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                {/* Left: Image Container */}
                <div className="md:col-span-5 aspect-[4/5] rounded-sm bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 relative overflow-hidden group">
                  {currentStory.imagePlaceholder ? (
                    <>
                      <Image
                        src={currentStory.imagePlaceholder}
                        alt={currentStory.title}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none z-10" />
                      <div className="absolute inset-0 p-4 flex flex-col justify-between text-white z-10">
                        <div className="text-[10px] font-space text-institutional-accent uppercase tracking-widest border-b border-white/15 pb-1.5">
                          <span>{currentStory.category}</span>
                        </div>
                        <div className="text-[9px] font-space text-gray-300 flex justify-between border-t border-white/15 pt-2">
                          <span>{currentStory.personName}</span>
                          <span>{currentStory.location}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 flex flex-col justify-between h-full">
                      <div className="text-[10px] font-space text-institutional-accent uppercase tracking-widest">
                        <span>{currentStory.category}</span>
                      </div>
                      <div className="my-auto text-center py-4">
                        <p className="font-manrope text-xs text-gray-400">
                          {currentStory.personName} • {currentStory.location}
                        </p>
                      </div>
                      <div className="text-[9px] font-space text-gray-400 flex justify-between border-t border-black/5 dark:border-white/10 pt-2">
                        <span>VERIFIED RECORD</span>
                        <span>IMPACT NARRATIVE</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Story Details & Quote */}
                <div className="md:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <Quote className="w-8 h-8 text-institutional-accent/40 mb-3 rotate-180" />

                    <blockquote className="font-cormorant italic text-xl sm:text-2xl text-institutional-dark dark:text-white leading-relaxed mb-6">
                      &ldquo;{currentStory.quote}&rdquo;
                    </blockquote>

                    <h3 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white mb-2">
                      {currentStory.title}
                    </h3>

                    <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6">
                      {currentStory.storyPreview}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                    <div className="font-space text-xs text-institutional-accent font-semibold">
                      <span>{currentStory.personName}</span>
                      <span className="block text-[10px] text-gray-400 font-normal">
                        {currentStory.location}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedStory(currentStory)}
                      className="px-4 py-2 text-xs font-space uppercase tracking-widest bg-institutional-accent text-institutional-dark font-semibold rounded-sm hover:bg-institutional-accentHover transition-colors"
                    >
                      Read Full Story
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-black/5 dark:border-white/5">
              <button
                onClick={handlePrev}
                className="inline-flex items-center gap-1 text-xs font-space uppercase tracking-wider text-institutional-accent hover:text-institutional-dark dark:hover:text-white font-semibold cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Story</span>
              </button>

              <span className="text-xs font-space text-gray-400">
                {activeIdx + 1} of {IMPACT_STORIES.length}
              </span>

              <button
                onClick={handleNext}
                className="inline-flex items-center gap-1 text-xs font-space uppercase tracking-wider text-institutional-accent hover:text-institutional-dark dark:hover:text-white font-semibold cursor-pointer"
              >
                <span>Next Story</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </InteractiveCard>
        </div>

        {/* Modal Detail for Story */}
        <AnimatePresence>
          {selectedStory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStory(null)}
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-institutional-cream dark:bg-institutional-dark text-institutional-dark dark:text-white max-w-2xl w-full rounded-sm border border-institutional-accent/40 shadow-2xl overflow-hidden p-6 sm:p-8 relative"
              >
                <button
                  onClick={() => setSelectedStory(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-institutional-accent cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <span className="text-[10px] font-space uppercase tracking-widest text-institutional-accent block mb-2">
                  {selectedStory.category} • {selectedStory.role} Story
                </span>

                <h3 className="font-cormorant text-3xl font-bold text-institutional-dark dark:text-white mb-4">
                  {selectedStory.title}
                </h3>

                <blockquote className="font-cormorant italic text-lg text-institutional-dark dark:text-white border-l-2 border-institutional-accent pl-4 py-2 mb-4">
                  &ldquo;{selectedStory.quote}&rdquo;
                </blockquote>

                <p className="font-manrope text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6">
                  {selectedStory.storyPreview} Working closely with community leaders, volunteers, and local institutions, Ruchi Prativa Foundation ensures that every welfare program transforms compassion into meaningful public service.
                </p>

                <div className="p-3 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 mb-6 text-xs font-space flex justify-between text-gray-400">
                  <span>LOCATION: {selectedStory.location}</span>
                  <span>RECORD: VERIFIED STORY</span>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedStory(null)}
                    className="px-6 py-2.5 text-xs font-space uppercase tracking-widest bg-institutional-accent text-institutional-dark font-semibold rounded-sm"
                  >
                    Close Window
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
