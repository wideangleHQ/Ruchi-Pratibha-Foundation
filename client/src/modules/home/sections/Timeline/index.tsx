'use client';

import React from 'react';
import { useTimelineInteraction } from './hooks/useTimelineInteraction';
import { TimelineTrack } from './components/TimelineTrack';
import { TimelineDetail } from './components/TimelineDetail';

export const Timeline: React.FC = () => {
  const { selectedId, selectedMilestone, selectMilestone, milestones } =
    useTimelineInteraction('1997');

  return (
    <section
      id="timeline-archives"
      className="py-14 sm:py-16 bg-institutional-light dark:bg-institutional-dark text-institutional-dark dark:text-institutional-light border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-3 mb-2">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.2em] font-space text-institutional-accent font-semibold">
              Historical Archives & Epochs
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold text-institutional-dark dark:text-white tracking-tight">
            Our Journey Through Time
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-2 leading-relaxed">
            Explore five decades of institutional evolution, strategic breakthroughs, and expanding community impact.
          </p>
        </div>

        {/* Timeline Track Component */}
        <TimelineTrack
          milestones={milestones}
          selectedId={selectedId}
          onSelect={selectMilestone}
        />

        {/* Selected Milestone Interactive 3-Card Grid */}
        <TimelineDetail milestone={selectedMilestone} />
      </div>
    </section>
  );
};

export default Timeline;
