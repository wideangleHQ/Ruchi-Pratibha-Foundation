'use client';

import React from 'react';
import { Award, ShieldCheck, Landmark, Globe2 } from 'lucide-react';
import { CREDENTIALS } from '../constants';

const icons = [Award, ShieldCheck, Landmark, Globe2];

export const CredentialsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
      {CREDENTIALS.map((item, idx) => {
        const Icon = icons[idx % icons.length];
        return (
          <div
            key={item.title}
            className="group relative flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-institutional-dark/10 dark:border-white/10 rounded-sm p-7 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-institutional-accent transition-all duration-300 ease-out"
          >
            {/* Top subtle accent bar on hover */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-institutional-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-sm" />

            <div>
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-sm bg-institutional-accent/10 dark:bg-institutional-accent/15 border border-institutional-accent/30 flex items-center justify-center text-institutional-accent mb-6 transition-all duration-300 group-hover:scale-105 group-hover:bg-institutional-accent group-hover:text-institutional-dark">
                <Icon className="w-5 h-5 stroke-[1.5] transition-transform duration-300" />
              </div>

              {/* Card Title */}
              <h3 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white mb-3 group-hover:text-institutional-accent transition-colors duration-200">
                {item.title}
              </h3>

              {/* Card Supporting Description */}
              <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Bottom subtle indicator */}
            <div className="pt-5 mt-6 border-t border-institutional-dark/5 dark:border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-space tracking-widest uppercase text-institutional-mutedLight dark:text-gray-400 group-hover:text-institutional-accent transition-colors font-medium">
                Institutional Trust
              </span>
              <span className="text-xs text-institutional-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                →
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
