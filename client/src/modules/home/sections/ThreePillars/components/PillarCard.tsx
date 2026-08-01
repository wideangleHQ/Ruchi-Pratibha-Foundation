import React from 'react';
import { Award, Users, BookOpen, ArrowUpRight } from 'lucide-react';
import { PillarItem } from '../types';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

interface PillarCardProps {
  pillar: PillarItem;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const pillarIcons = {
  recognition: Award,
  community: Users,
  knowledge: BookOpen,
};

export const PillarCard: React.FC<PillarCardProps> = ({
  pillar,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}) => {
  const IconComponent = pillarIcons[pillar.id as keyof typeof pillarIcons] || Award;

  return (
    <InteractiveCard
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border rounded-sm p-6 sm:p-8 transition-all duration-500 ${
        isHovered ? 'border-institutional-accent' : 'border-institutional-dark/10 dark:border-white/10'
      }`}
    >
      <div>
        {/* Card Header Tag */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] uppercase tracking-widest font-space text-institutional-accent font-semibold">
            {pillar.tag}
          </span>
          <span className="text-[10px] font-space text-institutional-mutedLight dark:text-gray-400">
            {pillar.subtitle}
          </span>
        </div>

        {/* Editorial Image Container Placeholder */}
        <div className="relative w-full aspect-[16/10] rounded-sm bg-institutional-surface/5 dark:bg-white/5 border border-institutional-dark/10 dark:border-white/10 p-6 flex flex-col items-center justify-center mb-8 overflow-hidden">
          {/* Geometric grid line overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(197, 160, 89, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(197, 160, 89, 0.15) 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />

          <div className="relative z-10 w-14 h-14 rounded-full bg-institutional-dark dark:bg-white/10 text-institutional-accent flex items-center justify-center mb-2 shadow transition-all duration-500 ease-out group-hover:scale-110 group-hover:bg-institutional-accent group-hover:text-institutional-dark">
            <IconComponent className="w-6 h-6 stroke-[1.5]" />
          </div>

          <span className="relative z-10 text-[10px] uppercase tracking-widest font-space text-institutional-mutedLight dark:text-gray-400 font-medium">
            {pillar.title} Pillar
          </span>
        </div>

        {/* Pillar Title */}
        <h3 className="font-cormorant text-3xl font-bold text-institutional-dark dark:text-white mb-3 group-hover:text-institutional-accent transition-colors duration-300">
          {pillar.title}
        </h3>

        {/* Pillar Description */}
        <p className="font-manrope text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-8">
          {pillar.description}
        </p>
      </div>

      {/* CTA Button */}
      <a
        href={pillar.href}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark dark:text-white group-hover:text-institutional-accent transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent rounded-sm py-1"
      >
        <span>{pillar.ctaText}</span>
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-institutional-accent" />
      </a>
    </InteractiveCard>
  );
};
