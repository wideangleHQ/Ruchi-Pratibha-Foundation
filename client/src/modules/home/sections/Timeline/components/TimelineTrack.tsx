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
  return (
    <div className="relative py-6 sm:py-8 my-4">
      {/* Desktop Horizontal Track */}
      <div className="hidden lg:block relative w-full">
        {/* Continuous Horizontal Line */}
        <div className="absolute top-1/2 left-4 right-4 h-[2px] bg-institutional-accent/30 dark:bg-institutional-accent/30 -translate-y-1/2" />

        {/* Selected Accent Progress Bar Fill */}
        <div
          className="absolute top-1/2 left-4 h-[2px] bg-institutional-accent -translate-y-1/2 transition-all duration-500 ease-out"
          style={{
            width: `${
              (milestones.findIndex((m) => m.id === selectedId) / (milestones.length - 1)) * 96
            }%`,
          }}
        />

        {/* Milestone Node Buttons */}
        <div className="relative z-10 flex items-center justify-between px-2">
          {milestones.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                aria-pressed={isSelected}
                aria-label={`Timeline milestone ${item.year}: ${item.title}`}
                className="group relative flex flex-col items-center outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent rounded-sm py-2 px-1 transition-all duration-300 select-none"
              >
                {/* Year Label */}
                <span
                  className={`font-space text-xs tracking-wider transition-all duration-300 mb-4 whitespace-nowrap ${
                    isSelected
                      ? 'text-institutional-accent font-bold scale-110'
                      : 'text-institutional-mutedLight dark:text-gray-400 group-hover:text-institutional-accent'
                  }`}
                >
                  {item.year}
                </span>

                {/* Centered Node Circle */}
                <div className="relative flex items-center justify-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'bg-institutional-accent shadow-md scale-125 ring-4 ring-institutional-accent/30 border-0'
                        : 'bg-white dark:bg-institutional-surface border border-institutional-accent/40 group-hover:border-institutional-accent group-hover:scale-110'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-institutional-dark" />}
                  </div>
                </div>

                {/* Milestone Short Title */}
                <span
                  className={`font-cormorant text-sm transition-all duration-300 mt-4 text-center max-w-[110px] leading-tight ${
                    isSelected
                      ? 'text-institutional-accent font-bold'
                      : 'text-institutional-mutedLight dark:text-gray-400 group-hover:text-institutional-dark dark:group-hover:text-white'
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
      <div className="lg:hidden flex items-center justify-start gap-2.5 overflow-x-auto pb-4 pt-2 no-scrollbar px-1">
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
                  : 'bg-institutional-accent/10 text-institutional-accent hover:bg-institutional-accent/20'
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
