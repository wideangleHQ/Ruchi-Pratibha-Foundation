'use client';

import React from 'react';
import { StatItem } from '../types';
import { useCounterAnimation } from '../hooks/useCounterAnimation';

interface StatCounterProps {
  stat: StatItem;
}

export const StatCounter: React.FC<StatCounterProps> = ({ stat }) => {
  const displayEnd = stat.numericValue === 200000 ? 2 : stat.numericValue;
  const { ref, count } = useCounterAnimation(displayEnd, 1800);

  const formattedDisplay =
    stat.numericValue === 200000 ? `${count} Lakhs+` : `${count}${stat.suffix}`;

  return (
    <div ref={ref} className="flex flex-col items-center text-center p-2 sm:p-4 min-w-0">
      <span className="font-space text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-institutional-dark dark:text-white mb-3 tabular-nums whitespace-nowrap">
        {formattedDisplay}
      </span>
      <span className="font-manrope text-xs sm:text-sm uppercase tracking-wider font-semibold text-institutional-mutedLight dark:text-gray-400 whitespace-nowrap">
        {stat.label}
      </span>
    </div>
  );
};
