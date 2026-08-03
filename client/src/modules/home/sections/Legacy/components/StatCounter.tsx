'use client';

import React from 'react';
import { StatItem } from '../types';
import { useCounterAnimation } from '../hooks/useCounterAnimation';

interface StatCounterProps {
  stat: StatItem;
}

export const StatCounter: React.FC<StatCounterProps> = ({ stat }) => {
  const displayEnd = stat.numericValue;
  const { ref, count } = useCounterAnimation(displayEnd, 1600);

  const formattedDisplay = stat.suffix ? `${count}${stat.suffix}` : `${count}`;

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center text-center p-4 sm:p-6 w-full h-full min-h-[120px] sm:min-h-[140px] rounded-sm bg-white/40 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 hover:border-institutional-accent/40 transition-all duration-300 group"
    >
      {/* Number Display - Space Grotesk Bold */}
      <span className="font-space text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-institutional-dark dark:text-white mb-2 leading-none tabular-nums group-hover:text-institutional-accent transition-colors duration-300">
        {formattedDisplay}
      </span>

      {/* Main Label - Manrope Medium/Semibold */}
      <span className="font-manrope text-xs sm:text-sm font-semibold text-institutional-dark dark:text-gray-200 leading-snug text-center max-w-[210px]">
        {stat.label}
      </span>

      {/* Supporting Sublabel (Visually Smaller) */}
      {stat.sublabel && (
        <span className="font-manrope text-[10px] sm:text-xs text-institutional-accent font-medium mt-1 leading-tight text-center">
          {stat.sublabel}
        </span>
      )}
    </div>
  );
};
