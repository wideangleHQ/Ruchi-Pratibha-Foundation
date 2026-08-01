import React from 'react';
import { STATS } from './constants';
import { StatCounter } from './components/StatCounter';
import { CredentialsGrid } from './components/CredentialsGrid';

export const Legacy: React.FC = () => {
  return (
    <section
      id="legacy"
      className="py-24 sm:py-32 bg-institutional-light dark:bg-institutional-dark text-institutional-dark dark:text-institutional-light border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden"
    >
      <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-10 items-center justify-center">
          {STATS.map((stat) => (
            <StatCounter key={stat.label} stat={stat} />
          ))}
        </div>

        {/* Central Trust Section Divider Heading */}
        <div className="my-16 sm:my-20 flex items-center justify-center gap-4 sm:gap-6">
          <span className="h-[1px] w-12 sm:w-20 bg-institutional-accent/40" />
          <h3 className="font-space text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold text-institutional-accent text-center whitespace-nowrap">
            Built on Trust. Driven by Purpose.
          </h3>
          <span className="h-[1px] w-12 sm:w-20 bg-institutional-accent/40" />
        </div>

        {/* Institutional Credentials Cards */}
        <CredentialsGrid />
      </div>
    </section>
  );
};

export default Legacy;
