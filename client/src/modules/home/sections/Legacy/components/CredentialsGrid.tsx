'use client';

import React from 'react';
import { CREDENTIALS } from '../constants';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

export const CredentialsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8 items-stretch">
      {CREDENTIALS.map((item, idx) => (
        <InteractiveCard
          key={item.title}
            className="flex flex-col justify-between h-full p-4 sm:p-8 text-center sm:text-left items-center sm:items-start"
          >
            <div className="flex flex-col items-center sm:items-start">
              {/* Editorial Index & Gold Accent Line */}
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <span className="h-[1px] w-6 bg-institutional-accent" />
                <span className="font-space text-xs uppercase tracking-widest text-institutional-accent font-semibold">
                  0{idx + 1}
                </span>
              </div>

              {/* Card Title */}
              <h3 className="font-cormorant text-lg sm:text-2xl font-bold text-institutional-dark dark:text-white mb-2 sm:mb-3 group-hover:text-institutional-accent transition-colors duration-300 leading-tight">
                {item.title}
              </h3>

              {/* Card Supporting Description */}
              <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed group-hover:text-institutional-dark dark:group-hover:text-white transition-colors duration-300">
                {item.description}
              </p>
            </div>

            {/* Bottom subtle indicator */}
            <div className="w-full pt-3 sm:pt-5 mt-4 sm:mt-6 border-t border-institutional-dark/5 dark:border-white/5 flex items-center justify-between">
              <span className="text-[9px] font-space tracking-widest uppercase text-institutional-mutedLight dark:text-gray-400 group-hover:text-institutional-accent transition-colors duration-300 font-medium">
                Trust
              </span>
              <span className="text-xs text-institutional-accent group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </div>
          </InteractiveCard>
      ))}
    </div>
  );
};
