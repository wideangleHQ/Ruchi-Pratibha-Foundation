'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { RegistrationResult } from '@/hooks/useVolunteerRegistration';

export type VolunteerFormData = {
  // Step 1
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;

  // Step 2
  email: string;
  phone: string;
  whatsapp: string;
  emergencyContact: string;

  // Step 3
  country: string;
  state: string;
  district: string;
  city: string;
  pin: string;

  // Step 4
  highestQualification: string;
  institution: string;
  occupation: string;

  // Step 5
  skills: string[];

  // Step 6
  availabilityWeekdays: boolean;
  availabilityWeekends: boolean;
  specificDates: string;
  preferredLocations: string;
  preferredCategories: string;

  // Step 7
  govIdType: string;
  govIdNumber: string;

  // Step 8
  termsAccepted: boolean;
};

const defaultFormData: VolunteerFormData = {
  firstName: '',
  lastName: '',
  gender: '',
  dob: '',
  email: '',
  phone: '',
  whatsapp: '',
  emergencyContact: '',
  country: '',
  state: '',
  district: '',
  city: '',
  pin: '',
  highestQualification: '',
  institution: '',
  occupation: '',
  skills: [],
  availabilityWeekdays: false,
  availabilityWeekends: false,
  specificDates: '',
  preferredLocations: '',
  preferredCategories: '',
  govIdType: '',
  govIdNumber: '',
  termsAccepted: false,
};

type WizardContextType = {
  currentStep: number;
  formData: VolunteerFormData;
  updateFormData: (data: Partial<VolunteerFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetWizard: () => void;
  profilePhoto: File | null;
  setProfilePhoto: (file: File | null) => void;
  govIdFile: File | null;
  setGovIdFile: (file: File | null) => void;
  submissionResult: RegistrationResult | null;
  setSubmissionResult: (result: RegistrationResult | null) => void;
  opportunityId: string;
  setOpportunityId: (id: string) => void;
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<VolunteerFormData>(defaultFormData);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [govIdFile, setGovIdFile] = useState<File | null>(null);
  const [submissionResult, setSubmissionResult] = useState<RegistrationResult | null>(null);
  const [opportunityId, setOpportunityId] = useState('');

  const updateFormData = (data: Partial<VolunteerFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 9));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const goToStep = (step: number) => setCurrentStep(step);
  const resetWizard = () => {
    setFormData(defaultFormData);
    setCurrentStep(1);
    setProfilePhoto(null);
    setGovIdFile(null);
    setSubmissionResult(null);
  };

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        formData,
        updateFormData,
        nextStep,
        prevStep,
        goToStep,
        resetWizard,
        profilePhoto,
        setProfilePhoto,
        govIdFile,
        setGovIdFile,
        submissionResult,
        setSubmissionResult,
        opportunityId,
        setOpportunityId,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
};
