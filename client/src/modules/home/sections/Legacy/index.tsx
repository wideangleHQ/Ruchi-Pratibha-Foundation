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
        {/* Mobile-Only 2 + 2 + 1 Editorial Composition */}
        <div className="block sm:hidden py-4 space-y-6 text-center">
          {/* Row 1: 30+ & 300+ */}
          <div className="grid grid-cols-2 gap-4 items-center">
            <StatCounter stat={STATS[0]} isCompactMobile />
            <StatCounter stat={STATS[1]} isCompactMobile />
          </div>

          <div className="w-12 h-[1px] bg-institutional-accent/25 mx-auto" />

          {/* Row 2: 250+ & 50+ */}
          <div className="grid grid-cols-2 gap-4 items-center">
            <StatCounter stat={STATS[2]} isCompactMobile />
            <StatCounter stat={STATS[4]} isCompactMobile />
          </div>

          <div className="w-20 h-[1px] bg-institutional-accent/40 mx-auto my-3" />

          {/* Row 3: Visual Centerpiece: 2 Lakhs+ Lives Empowered */}
          <div className="pt-2 pb-4 flex flex-col items-center justify-center">
            <StatCounter stat={STATS[3]} isFeaturedHeroMobile />
          </div>
        </div>

        {/* Desktop Statistics Grid (Unchanged) */}
        <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-10 items-center justify-center">
          {STATS.map((stat) => (
            <StatCounter key={stat.label} stat={stat} />
          ))}
        </div>

        {/* Central Trust Section Divider Heading */}
        <div className="my-12 sm:my-20 flex items-center justify-center gap-3 sm:gap-6">
          <span className="h-[1px] w-8 sm:w-20 bg-institutional-accent/40" />
          <h3 className="font-space text-[10px] sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold text-institutional-accent text-center whitespace-nowrap">
            Built on Trust. Driven by Purpose.
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
