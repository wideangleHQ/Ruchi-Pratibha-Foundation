import React from 'react';
import { STATS } from './constants';
import { StatCounter } from './components/StatCounter';
import { CredentialsGrid } from './components/CredentialsGrid';

export const Legacy: React.FC = () => {
  return (
    <section
      id="legacy"
      className="py-16 sm:py-32 bg-institutional-light dark:bg-institutional-dark text-institutional-dark dark:text-institutional-light border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-6 lg:px-8 xl:px-12">
        {/* Mobile-Only 2×2 Grid + 1 Full-Width Card */}
        <div className="block sm:hidden py-4 space-y-3.5">
          {/* 2x2 Grid for first four statistics */}
          <div className="grid grid-cols-2 gap-3.5 items-stretch">
            <StatCounter stat={STATS[0]} />
            <StatCounter stat={STATS[1]} />
            <StatCounter stat={STATS[2]} />
            <StatCounter stat={STATS[3]} />
          </div>

          {/* Full-width container for 5th statistic */}
          <div className="w-full">
            <StatCounter stat={STATS[4]} />
          </div>
        </div>

        {/* Desktop Statistics Grid (5-column equal cards) */}
        <div className="hidden sm:grid sm:grid-cols-5 gap-4 lg:gap-6 items-stretch justify-center">
          {STATS.map((stat) => (
            <StatCounter key={stat.label} stat={stat} />
          ))}
        </div>

        {/* Central Trust Section Divider Heading */}
        <div className="my-12 sm:my-20 flex items-center justify-center gap-3 sm:gap-6">
          <span className="h-[1px] w-8 sm:w-20 bg-institutional-accent/40" />
          <h3 className="font-space text-[10px] sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold text-institutional-accent text-center whitespace-nowrap">
            Three Decades of Purposeful Service
          </h3>
          <span className="h-[1px] w-8 sm:w-20 bg-institutional-accent/40" />
        </div>

        {/* Institutional Credentials Cards */}
        <CredentialsGrid />
      </div>
    </section>
  );
};

export default Legacy;
