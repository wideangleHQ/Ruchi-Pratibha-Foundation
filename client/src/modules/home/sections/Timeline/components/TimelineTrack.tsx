'use client';

import React from 'react';
import { TimelineMilestone } from '../types';

interface TimelineTrackProps {
  milestones: TimelineMilestone[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const TimelineTrack: React.FC<TimelineTrackProps> = ({
  milestones,
  selectedId,
  onSelect,
}) => {
  const selectedIndex = milestones.findIndex((m) => m.id === selectedId);
  const progressPercent = (selectedIndex / (milestones.length - 1)) * 100;

  return (
    <div className="relative py-4 my-2 w-full">
      {/* Unified Horizontal Track for Desktop & Mobile */}
      <div className="relative w-full overflow-x-auto scrollbar-none py-3 px-2 sm:px-4 lg:px-8">
        <div className="min-w-[660px] lg:min-w-0 relative">
          {/* Continuous Horizontal Line aligned to geometric center of node circles */}
          <div className="absolute top-[42px] left-10 right-10 lg:left-12 lg:right-12 h-[2px] bg-institutional-accent/30 dark:bg-institutional-accent/30 -translate-y-1/2 z-0" />

          {/* Selected Progress Fill */}
          <div
            className="absolute top-[42px] left-10 lg:left-12 h-[2px] bg-institutional-accent -translate-y-1/2 transition-all duration-500 ease-out z-0"
            style={{ width: `calc(${progressPercent}% * 0.92)` }}
          />

          {/* Milestone Items Grid */}
          <div className="relative z-10 flex items-start justify-between">
            {milestones.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  aria-pressed={isSelected}
                  aria-label={`Timeline milestone ${item.year}: ${item.title}`}
                  className="group relative flex flex-col items-center outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent rounded-sm transition-all duration-300 select-none cursor-pointer px-2 sm:px-0"
                >
                  {/* Year Label */}
                  <span
                    className={`font-space text-xs tracking-wider transition-all duration-300 mb-2.5 whitespace-nowrap ${
                      isSelected
                        ? 'text-institutional-accent font-bold scale-110'
                        : 'text-institutional-dark dark:text-gray-200 font-semibold group-hover:text-institutional-accent'
                    }`}
                  >
                    {item.year}
                  </span>

                  {/* Centered Node Circle */}
                  <div className="relative w-8 h-8 flex items-center justify-center my-0.5 z-10">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? 'bg-institutional-accent shadow-md scale-125 ring-4 ring-institutional-accent/30 border-0'
                          : 'bg-white dark:bg-institutional-surface border-2 border-institutional-accent/50 group-hover:border-institutional-accent group-hover:scale-110'
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-institutional-dark" />}
                    </div>
                  </div>

                  {/* Milestone Short Title */}
                  <span
                    className={`font-cormorant text-sm sm:text-base transition-all duration-300 mt-2.5 text-center max-w-[110px] sm:max-w-[130px] leading-snug ${
                      isSelected
                        ? 'text-institutional-accent font-bold'
                        : 'text-institutional-dark dark:text-gray-100 font-medium group-hover:text-institutional-accent'
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
