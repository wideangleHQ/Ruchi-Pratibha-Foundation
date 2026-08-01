'use client';

import React from 'react';
import { Award, ShieldCheck, Landmark, Globe2 } from 'lucide-react';
import { CREDENTIALS } from '../constants';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

const icons = [Award, ShieldCheck, Landmark, Globe2];

export const CredentialsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8 items-stretch">
      {CREDENTIALS.map((item, idx) => {
        const Icon = icons[idx % icons.length];
        return (
          <InteractiveCard
            key={item.title}
            className="flex flex-col justify-between h-full p-4 sm:p-8 text-center sm:text-left items-center sm:items-start"
          >
            <div className="flex flex-col items-center sm:items-start">
              {/* Concentric Icon Container */}
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-institutional-accent/40 bg-white dark:bg-institutional-dark flex items-center justify-center text-institutional-accent mb-4 sm:mb-6 transition-all duration-300 ease-out group-hover:border-institutional-accent group-hover:bg-institutional-accent group-hover:text-institutional-dark shadow-sm">
                <div className="absolute inset-1 rounded-full bg-institutional-accent/15 dark:bg-institutional-accent/25 group-hover:bg-white/40 dark:group-hover:bg-white/30 transition-colors duration-300 pointer-events-none" />
                <Icon className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75] transition-all duration-300 group-hover:scale-110 group-hover:text-institutional-dark" />
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
        );
      })}
    </div>
  );
};
