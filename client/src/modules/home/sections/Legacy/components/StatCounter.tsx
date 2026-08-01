'use client';

import React from 'react';
import { StatItem } from '../types';
import { useCounterAnimation } from '../hooks/useCounterAnimation';

interface StatCounterProps {
  stat: StatItem;
  isFeaturedHeroMobile?: boolean;
  isCompactMobile?: boolean;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  stat,
  isFeaturedHeroMobile = false,
  isCompactMobile = false,
}) => {
  const displayEnd = stat.numericValue === 200000 ? 2 : stat.numericValue;
  const { ref, count } = useCounterAnimation(displayEnd, 1800);

  const formattedDisplay =
    stat.numericValue === 200000 ? `${count} Lakhs+` : `${count}${stat.suffix}`;

  return (
    <div ref={ref} className="flex flex-col items-center text-center p-2 sm:p-4 min-w-0">
      <span
        className={`font-space font-bold tracking-tight tabular-nums whitespace-nowrap mb-2 ${
          isFeaturedHeroMobile
            ? 'text-6xl sm:text-7xl lg:text-6xl xl:text-7xl text-institutional-accent font-extrabold scale-105'
            : isCompactMobile
            ? 'text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-institutional-dark dark:text-white'
            : 'text-5xl sm:text-5xl lg:text-5xl xl:text-6xl text-institutional-dark dark:text-white'
        }`}
      >
        {formattedDisplay}
      </span>
      <span
        className={`font-manrope uppercase tracking-wider whitespace-nowrap ${
          isFeaturedHeroMobile
            ? 'text-xs sm:text-sm font-bold text-institutional-dark dark:text-white tracking-widest'
            : 'text-[10px] sm:text-sm font-semibold text-institutional-mutedLight dark:text-gray-400'
        }`}
      >
        {stat.label}
      </span>
    </div>
  );
};
