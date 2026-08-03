'use client';

import React from 'react';
import { PILLARS } from './constants';
import { usePillarHover } from './hooks/usePillarHover';
import { PillarCard } from './components/PillarCard';

export const ThreePillars: React.FC = () => {
  const { hoveredId, handleMouseEnter, handleMouseLeave } = usePillarHover();

  return (
    <section id="pillars" className="py-28 bg-institutional-cream text-institutional-dark border-b border-institutional-dark/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-6 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-widest font-space text-institutional-accent font-semibold">
              Our Mission
            </span>
            <span className="h-[1px] w-6 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-bold text-institutional-dark tracking-tight">
            Our Purpose
          </h2>
          <p className="font-manrope text-base text-institutional-mutedLight mt-4 leading-relaxed">
            Our institutional platform is guided by core directives that drive recognition, empower youth through education, preserve literature and culture, and fulfill social responsibility.
          </p>
        </div>

        {/* Purpose Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PILLARS.map((pillar) => (
            <PillarCard
              key={pillar.id}
              pillar={pillar}
              isHovered={hoveredId === pillar.id}
              onMouseEnter={() => handleMouseEnter(pillar.id)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreePillars;
