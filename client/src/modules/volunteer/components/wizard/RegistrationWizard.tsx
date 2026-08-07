'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useWizard } from './WizardContext';
import { Step01_PersonalInfo } from './steps/Step01_PersonalInfo';
import { Step02_Contact } from './steps/Step02_Contact';
import { Step03_Address } from './steps/Step03_Address';
import { Step04_Education } from './steps/Step04_Education';
import { Step05_Skills } from './steps/Step05_Skills';
import { Step06_Availability } from './steps/Step06_Availability';
import { Step07_Identity } from './steps/Step07_Identity';
import { Step08_Declaration } from './steps/Step08_Declaration';
import { SuccessScreen } from './steps/SuccessScreen';

interface RegistrationWizardProps {
  onClose: () => void;
}

const STEP_TITLES = [
  'Personal Info',
  'Contact',
  'Address',
  'Education',
  'Skills',
  'Availability',
  'Identity',
  'Declaration'
];

export const RegistrationWizard: React.FC<RegistrationWizardProps> = ({ onClose }) => {
  const { currentStep } = useWizard();

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step01_PersonalInfo />;
      case 2: return <Step02_Contact />;
      case 3: return <Step03_Address />;
      case 4: return <Step04_Education />;
      case 5: return <Step05_Skills />;
      case 6: return <Step06_Availability />;
      case 7: return <Step07_Identity />;
      case 8: return <Step08_Declaration />;
      case 9: return <SuccessScreen onClose={onClose} />;
      default: return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-institutional-light/95 dark:bg-institutional-dark/95 backdrop-blur-md"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full h-full lg:w-[1000px] lg:h-[85vh] lg:max-h-[800px] bg-white dark:bg-[#121824] lg:rounded-md lg:shadow-2xl overflow-hidden flex flex-col lg:flex-row"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 lg:top-6 lg:right-6 z-50 p-2 text-gray-500 hover:text-institutional-dark dark:text-gray-400 dark:hover:text-white bg-gray-100/50 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close Registration Wizard"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Desktop Split Screen Left Side: Progress & Info (Hidden on Success Screen) */}
        {currentStep < 9 && (
          <div className="hidden lg:flex flex-col w-1/3 bg-institutional-dark p-10 border-r border-white/10">
            <h2 className="font-cormorant text-3xl text-white font-bold mb-12">
              Volunteer Onboarding
            </h2>
            
            <div className="flex-1 flex flex-col gap-6">
              {STEP_TITLES.map((title, idx) => {
                const stepNumber = idx + 1;
                const isActive = stepNumber === currentStep;
                const isPast = stepNumber < currentStep;
                
                return (
                  <div key={title} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-space font-semibold transition-colors duration-300 ${
                      isActive ? 'bg-institutional-accent text-institutional-dark' : 
                      isPast ? 'bg-white/20 text-white' : 'bg-transparent border border-white/20 text-gray-500'
                    }`}>
                      {stepNumber}
                    </div>
                    <span className={`font-manrope text-sm transition-colors duration-300 ${
                      isActive ? 'text-white font-semibold' : 
                      isPast ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {title}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="pt-8 border-t border-white/10">
              <p className="font-manrope text-xs text-gray-400 leading-relaxed">
                Your progress is auto-saved locally. You can go back at any time to modify your details.
              </p>
            </div>
          </div>
        )}

        {/* Right Side / Mobile Full: Form Content */}
        <div className={`flex flex-col h-full w-full ${currentStep < 9 ? 'lg:w-2/3' : 'lg:w-full'} overflow-hidden`}>
          {/* Mobile Header Progress */}
          {currentStep < 9 && (
            <div className="lg:hidden p-4 sm:p-6 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-[#121824] z-10 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-space text-xs uppercase tracking-widest text-institutional-accent font-semibold">
                  Step {currentStep} of 8
                </span>
                <span className="font-manrope text-sm text-institutional-dark dark:text-white font-medium">
                  {STEP_TITLES[currentStep - 1]}
                </span>
              </div>
              <div className="w-full h-1 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-institutional-accent"
                  initial={{ width: `${((currentStep - 1) / 8) * 100}%` }}
                  animate={{ width: `${(currentStep / 8) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* Step Content */}
          <div className="flex-1 overflow-y-auto scrollbar-none relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-8 lg:p-12 pb-24 lg:pb-12 h-full flex flex-col"
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
