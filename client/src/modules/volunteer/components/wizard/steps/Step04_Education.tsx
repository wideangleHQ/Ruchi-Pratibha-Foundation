'use client';

import React from 'react';
import { useWizard } from '../WizardContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const Step04_Education: React.FC = () => {
  const { formData, updateFormData, nextStep, prevStep } = useWizard();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <h3 className="font-cormorant text-3xl sm:text-4xl font-bold text-institutional-dark dark:text-white mb-3">
          Education & Occupation
        </h3>
        <p className="font-manrope text-gray-600 dark:text-gray-400">
          Tell us about your background to help us align you with the right initiatives.
        </p>
      </div>

      <form onSubmit={handleNext} className="flex-1 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="font-space text-xs uppercase tracking-widest text-gray-500 font-semibold">Highest Qualification</label>
            <select
              required
              value={formData.highestQualification}
              onChange={(e) => updateFormData({ highestQualification: e.target.value })}
              className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-sm px-4 py-3.5 font-manrope text-institutional-dark dark:text-white focus:outline-none focus:border-institutional-accent transition-colors appearance-none"
            >
              <option value="" disabled>Select highest qualification</option>
              <option value="High School">High School</option>
              <option value="Undergraduate">Undergraduate (Bachelor&apos;s)</option>
              <option value="Postgraduate">Postgraduate (Master&apos;s)</option>
              <option value="Doctorate">Doctorate (PhD)</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-space text-xs uppercase tracking-widest text-gray-500 font-semibold">Institution / University</label>
            <input
              required
              type="text"
              value={formData.institution}
              onChange={(e) => updateFormData({ institution: e.target.value })}
              className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-sm px-4 py-3.5 font-manrope text-institutional-dark dark:text-white focus:outline-none focus:border-institutional-accent transition-colors"
              placeholder="Name of your educational institution"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-space text-xs uppercase tracking-widest text-gray-500 font-semibold">Current Occupation</label>
            <input
              required
              type="text"
              value={formData.occupation}
              onChange={(e) => updateFormData({ occupation: e.target.value })}
              className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-sm px-4 py-3.5 font-manrope text-institutional-dark dark:text-white focus:outline-none focus:border-institutional-accent transition-colors"
              placeholder="E.g. Student, Software Engineer, Teacher, Retired"
            />
          </div>
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
