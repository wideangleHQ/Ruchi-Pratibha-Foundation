import React from 'react';
import { EditorialContent } from './components/EditorialContent';
import { EditorialImageContainer } from './components/EditorialImageContainer';

export const Introduction: React.FC = () => {
  return (
    <section
      id="foundation"
      className="relative min-h-screen lg:h-screen lg:min-h-[700px] w-full flex items-center justify-center py-20 lg:py-0 bg-institutional-cream dark:bg-institutional-surface/30 text-institutional-dark dark:text-institutional-light border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center justify-between">
          <div className="lg:col-span-7 xl:col-span-7">
            <EditorialContent />
          </div>
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
            <EditorialImageContainer />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
