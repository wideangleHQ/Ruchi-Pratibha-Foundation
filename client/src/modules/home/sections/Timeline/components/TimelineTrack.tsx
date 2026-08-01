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
    <div className="relative py-2 my-2">
      {/* Desktop Horizontal Track */}
      <div className="hidden lg:block relative w-full px-8">
        {/* Continuous Horizontal Line aligned to geometric center of node circles */}
        <div className="absolute top-[42px] left-12 right-12 h-[2px] bg-institutional-accent/30 dark:bg-institutional-accent/30 -translate-y-1/2 z-0" />

        {/* Selected Progress Fill */}
        <div
          className="absolute top-[42px] left-12 h-[2px] bg-institutional-accent -translate-y-1/2 transition-all duration-500 ease-out z-0"
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
                className="group relative flex flex-col items-center outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent rounded-sm transition-all duration-300 select-none cursor-pointer"
              >
                {/* Year Label - Enhanced Legibility & Font Weight */}
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

                {/* Milestone Short Title - Enhanced Readability */}
                <span
                  className={`font-cormorant text-base transition-all duration-300 mt-2.5 text-center max-w-[130px] leading-snug ${
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

      {/* Mobile/Tablet Scrollable Track */}
      <div className="lg:hidden flex items-center justify-start gap-2.5 overflow-x-auto pb-3 pt-1 no-scrollbar px-1">
        {milestones.map((item) => {
          const isSelected = item.id === selectedId;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              aria-pressed={isSelected}
              aria-label={`Select ${item.year} milestone`}
              className={`px-4 py-2.5 text-xs font-space rounded-full transition-all duration-200 min-h-[44px] flex items-center justify-center whitespace-nowrap outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent flex-shrink-0 border-0 ${
                isSelected
                  ? 'bg-institutional-accent text-institutional-dark font-bold shadow-md'
                  : 'bg-institutional-accent/10 text-institutional-accent font-semibold hover:bg-institutional-accent/20'
              }`}
            >
              {item.year}
            </button>
          );
        })}
      </div>
    </div>
  );
};
