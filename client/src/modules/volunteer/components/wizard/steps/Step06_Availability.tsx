'use client';

import React from 'react';
import { useWizard } from '../WizardContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const Step06_Availability: React.FC = () => {
  const { formData, updateFormData, nextStep, prevStep } = useWizard();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <h3 className="font-cormorant text-3xl sm:text-4xl font-bold text-institutional-dark dark:text-white mb-3">
          Availability
        </h3>
        <p className="font-manrope text-gray-600 dark:text-gray-400">
          When and where would you like to volunteer?
        </p>
      </div>

      <form onSubmit={handleNext} className="flex-1 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <span className="font-space text-xs uppercase tracking-widest text-gray-500 font-semibold">General Availability</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.availabilityWeekdays}
                  onChange={(e) => updateFormData({ availabilityWeekdays: e.target.checked })}
                  className="w-5 h-5 accent-institutional-accent"
                />
                <span className="font-manrope text-institutional-dark dark:text-white">Weekdays</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.availabilityWeekends}
                  onChange={(e) => updateFormData({ availabilityWeekends: e.target.checked })}
                  className="w-5 h-5 accent-institutional-accent"
                />
                <span className="font-manrope text-institutional-dark dark:text-white">Weekends</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-space text-xs uppercase tracking-widest text-gray-500 font-semibold">Specific Dates (Optional)</label>
            <input
              type="text"
              value={formData.specificDates}
              onChange={(e) => updateFormData({ specificDates: e.target.value })}
              className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-sm px-4 py-3.5 font-manrope text-institutional-dark dark:text-white focus:outline-none focus:border-institutional-accent transition-colors"
              placeholder="e.g. During summer holidays, December"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-space text-xs uppercase tracking-widest text-gray-500 font-semibold">Preferred Locations</label>
            <input
              required
              type="text"
              value={formData.preferredLocations}
              onChange={(e) => updateFormData({ preferredLocations: e.target.value })}
              className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-sm px-4 py-3.5 font-manrope text-institutional-dark dark:text-white focus:outline-none focus:border-institutional-accent transition-colors"
              placeholder="e.g. Cuttack, Bhubaneswar, Remote"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-space text-xs uppercase tracking-widest text-gray-500 font-semibold">Preferred Program Categories</label>
            <select
              required
              value={formData.preferredCategories}
              onChange={(e) => updateFormData({ preferredCategories: e.target.value })}
              className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-sm px-4 py-3.5 font-manrope text-institutional-dark dark:text-white focus:outline-none focus:border-institutional-accent transition-colors appearance-none"
            >
              <option value="" disabled>Select a category</option>
              <option value="Education">Education & Literacy</option>
              <option value="Health">Health & Wellness</option>
              <option value="Environment">Environmental Sustainability</option>
              <option value="Culture">Art & Culture Conservation</option>
              <option value="Any">Any Available Opportunity</option>
            </select>
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
