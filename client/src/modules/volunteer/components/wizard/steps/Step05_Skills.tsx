'use client';

import React from 'react';
import { useWizard } from '../WizardContext';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const SKILL_OPTIONS = [
  'Teaching',
  'Healthcare',
  'Photography',
  'Event Management',
  'Technology',
  'Administration',
  'Social Media',
  'Community Outreach',
  'Environment',
  'Culture',
  'Languages',
  'Writing',
  'Graphic Design',
  'Logistics',
  'Mentorship'
];

export const Step05_Skills: React.FC = () => {
  const { formData, updateFormData, nextStep, prevStep } = useWizard();

  const toggleSkill = (skill: string) => {
    const currentSkills = formData.skills;
    if (currentSkills.includes(skill)) {
      updateFormData({ skills: currentSkills.filter(s => s !== skill) });
    } else {
      updateFormData({ skills: [...currentSkills, skill] });
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <h3 className="font-cormorant text-3xl sm:text-4xl font-bold text-institutional-dark dark:text-white mb-3">
          Your Skills
        </h3>
        <p className="font-manrope text-gray-600 dark:text-gray-400">
          Select all areas where you feel you can contribute the most. (Multi-select)
        </p>
      </div>

      <form onSubmit={handleNext} className="flex-1 flex flex-col justify-between">
        <div className="flex flex-wrap gap-3">
          {SKILL_OPTIONS.map((skill) => {
            const isSelected = formData.skills.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-manrope transition-all duration-200 ${
                  isSelected
                    ? 'border-institutional-accent bg-institutional-accent/10 text-institutional-dark dark:text-institutional-accent font-semibold'
                    : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-institutional-accent hover:text-institutional-dark dark:hover:text-white'
                }`}
              >
                {isSelected && <Check className="w-4 h-4" />}
                {skill}
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10 flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center gap-2 text-gray-500 hover:text-institutional-dark dark:text-gray-400 dark:hover:text-white px-4 py-3.5 font-space text-xs uppercase tracking-widest font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 bg-institutional-dark dark:bg-white text-white dark:text-institutional-dark px-8 py-3.5 rounded-sm font-space text-xs uppercase tracking-widest font-semibold hover:bg-institutional-accent hover:text-institutional-dark dark:hover:bg-institutional-accent transition-colors"
          >
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
