'use client';

import React from 'react';
import { Compass, UserPlus, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

export const VolunteerJourney: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Discover',
      description: 'Explore community initiatives across education, healthcare, culture, and environmental sustainability in your district.',
      icon: Compass,
    },
    {
      num: '02',
      title: 'Register',
      description: 'Join our network of dedicated volunteers, scholars, and youth leaders committed to social transformation.',
      icon: UserPlus,
    },
    {
      num: '03',
      title: 'Participate',
      description: 'Engage directly in healthcare camps, school mentoring, tree plantation drives, and cultural archives.',
      icon: HeartHandshake,
    },
    {
      num: '04',
      title: 'Create Impact',
      description: 'See the real-world lives touched, track transparent metrics, and inspire others to contribute.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="volunteer" className="py-16 sm:py-28 bg-institutional-cream dark:bg-institutional-surface/20 text-institutional-dark dark:text-institutional-light border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden">
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.2em] font-space text-institutional-accent font-semibold">
              Get Involved
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Your Volunteer Journey
          </h2>
          <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 mt-2.5">
            Four meaningful steps to become part of Odisha’s living legacy of service.
          </p>
        </div>

        {/* 4-Step Interactive Horizontal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-14">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <InteractiveCard
                key={step.num}
                className="flex flex-col justify-between bg-white dark:bg-institutional-surface/40 border border-institutional-dark/10 dark:border-white/10 rounded-sm p-6 sm:p-8 text-center sm:text-left items-center sm:items-start"
              >
                <div className="flex flex-col items-center sm:items-start">
                  <div className="w-full flex items-center justify-between mb-5 sm:mb-6">
                    <span className="font-space text-xl sm:text-2xl font-bold text-institutional-accent/50 group-hover:text-institutional-accent transition-colors duration-300">
                      {step.num}
                    </span>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-institutional-accent/10 dark:bg-institutional-accent/15 border border-institutional-accent/30 flex items-center justify-center text-institutional-accent transition-all duration-500 ease-out group-hover:scale-110 group-hover:bg-institutional-accent group-hover:text-institutional-dark">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
                    </div>
                  </div>

                  <h3 className="font-cormorant text-xl sm:text-2xl font-bold text-institutional-dark dark:text-white mb-2 sm:mb-3 group-hover:text-institutional-accent transition-colors duration-300">
                    {step.title}
                  </h3>

                  <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="w-full pt-3 sm:pt-4 mt-5 sm:mt-6 border-t border-institutional-dark/5 dark:border-white/5 flex items-center justify-between text-[10px] font-space text-institutional-mutedLight dark:text-gray-400">
                  <span>Step {step.num}</span>
                  <span className="text-institutional-accent group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </div>
              </InteractiveCard>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="text-center">
          <a
            href="#volunteer-register"
            className="group inline-flex items-center gap-2.5 px-6 py-3 sm:px-8 sm:py-4 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover transition-colors duration-200 rounded-sm shadow-md"
          >
            <span>Become a Volunteer Today</span>
            <ArrowRight className="w-4 h-4 text-institutional-dark group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
