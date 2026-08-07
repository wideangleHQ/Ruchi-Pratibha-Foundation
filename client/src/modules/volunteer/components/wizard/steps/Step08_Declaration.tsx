'use client';

import React, { useState } from 'react';
import { useWizard } from '../WizardContext';
import { useVolunteerRegistration } from '@/hooks/useVolunteerRegistration';
import { ArrowLeft, Send, Loader2, AlertCircle } from 'lucide-react';

const GENDER_MAP: Record<string, string> = {
  'Male': 'MALE',
  'Female': 'FEMALE',
  'Other': 'OTHER',
  'Prefer not to say': 'PREFER_NOT_TO_SAY',
};

const ERROR_MESSAGES: Record<string, string> = {
  OPPORTUNITY_NOT_PUBLISHED: 'This opportunity is no longer accepting registrations.',
  REGISTRATIONS_DISABLED: 'Registrations are currently disabled for this opportunity.',
  OPPORTUNITY_ARCHIVED: 'This opportunity has been archived.',
  REGISTRATION_NOT_OPEN: 'Registration has not opened yet. Please check back later.',
  REGISTRATION_CLOSED: 'The registration deadline has passed.',
  OPPORTUNITY_FULL: 'All volunteer positions have been filled. Please check other opportunities.',
  ENTITY_CONFLICT: 'You have already registered with this email or phone number.',
  DOCUMENT_REQUIRED: 'Please go back and upload your government ID document.',
  INVALID_DOCUMENT_NUMBER: 'The document number you entered is invalid. Please check and try again.',
  FILE_UPLOAD_FAILED: 'Failed to upload your files. Please try again.',
  NO_EDITION_LINKED: 'This opportunity is not properly configured. Please contact the administrator.',
};

export const Step08_Declaration: React.FC = () => {
  const { formData, updateFormData, nextStep, prevStep, profilePhoto, govIdFile, setSubmissionResult, opportunityId } = useWizard();
  const registration = useVolunteerRegistration();
  const [submitting, setSubmitting] = useState(false);

  const getErrorMessage = (error: Error & { errorCode?: string }): string => {
    if (error.errorCode && ERROR_MESSAGES[error.errorCode]) {
      return ERROR_MESSAGES[error.errorCode];
    }
    if (error.message.includes('already exists')) {
      return 'You have already registered with this email or phone number.';
    }
    if (error.message.includes('not found')) {
      return 'The opportunity could not be found. It may have been removed.';
    }
    return error.message || 'Something went wrong. Please try again.';
  };

  const buildFormData = (): FormData => {
    const fd = new FormData();

    fd.append('fullName', `${formData.firstName} ${formData.lastName}`.trim());
    fd.append('dateOfBirth', formData.dob);
    fd.append('gender', GENDER_MAP[formData.gender] || 'OTHER');

    const phone = formData.phone.startsWith('+91') ? formData.phone : `+91${formData.phone.replace(/^0+/, '')}`;
    fd.append('mobile', phone);
    fd.append('email', formData.email);

    if (formData.whatsapp) {
      const wa = formData.whatsapp.startsWith('+91') ? formData.whatsapp : `+91${formData.whatsapp.replace(/^0+/, '')}`;
      fd.append('whatsapp', wa);
    }

    fd.append('address', [formData.city, formData.district].filter(Boolean).join(', ') || formData.city);
    fd.append('district', formData.district || formData.city);
    fd.append('state', formData.state);
    fd.append('pincode', formData.pin);

    fd.append('identityDocumentType', formData.govIdType);
    fd.append('identityDocumentNumber', formData.govIdNumber);

    const emergencyParts = formData.emergencyContact.split(/[,\-–]+/).map((s) => s.trim());
    fd.append('emergencyContactName', emergencyParts[0] || 'Emergency Contact');
    fd.append('emergencyContactRelationship', 'Family');
    const emergencyPhone = emergencyParts.find((p) => /\d{10}/.test(p.replace(/\D/g, '')));
    const emergencyMobile = emergencyPhone
      ? (emergencyPhone.startsWith('+91') ? emergencyPhone : `+91${emergencyPhone.replace(/\D/g, '')}`)
      : phone;
    fd.append('emergencyContactMobile', emergencyMobile);

    if (formData.highestQualification) fd.append('qualification', formData.highestQualification);
    if (formData.occupation) fd.append('occupation', formData.occupation);
    if (formData.institution) fd.append('organizationOrCollege', formData.institution);

    if (formData.skills.length > 0) fd.append('skills', formData.skills.join(', '));

    const availability: string[] = [];
    if (formData.availabilityWeekdays) availability.push('Weekdays');
    if (formData.availabilityWeekends) availability.push('Weekends');
    if (availability.length > 0) fd.append('availability', JSON.stringify(availability));

    if (profilePhoto) fd.append('profilePhoto', profilePhoto);
    if (govIdFile) fd.append('identityDocument', govIdFile);

    return fd;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert('Please accept the terms and conditions to proceed.');
      return;
    }
    if (submitting) return;

    setSubmitting(true);
    registration.reset();

    try {
      const fd = buildFormData();
      const result = await registration.mutateAsync({ opportunityId, formData: fd });
      setSubmissionResult(result.data);
      nextStep();
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <h3 className="font-cormorant text-3xl sm:text-4xl font-bold text-institutional-dark dark:text-white mb-3">
          Declaration & Submission
        </h3>
        <p className="font-manrope text-gray-600 dark:text-gray-400">
          Review your information and agree to our terms before submitting.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
        <div className="space-y-8">

          <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-sm p-6 text-sm font-manrope">
            <h4 className="font-space text-xs uppercase tracking-widest text-gray-500 font-semibold mb-4">Summary</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-gray-500 mb-1">Name</span>
                <span className="text-institutional-dark dark:text-white font-medium">{formData.firstName} {formData.lastName}</span>
              </div>
              <div>
                <span className="block text-gray-500 mb-1">Contact</span>
                <span className="text-institutional-dark dark:text-white font-medium">{formData.email}</span>
              </div>
              <div>
                <span className="block text-gray-500 mb-1">Location</span>
                <span className="text-institutional-dark dark:text-white font-medium">{formData.city}, {formData.state}</span>
              </div>
              <div>
                <span className="block text-gray-500 mb-1">Skills</span>
                <span className="text-institutional-dark dark:text-white font-medium">{formData.skills.length > 0 ? formData.skills.join(', ') : 'None selected'}</span>
              </div>
              <div>
                <span className="block text-gray-500 mb-1">Government ID</span>
                <span className="text-institutional-dark dark:text-white font-medium">
                  {formData.govIdType ? `${formData.govIdType} — ••••${formData.govIdNumber.slice(-4)}` : 'Not provided'}
                </span>
              </div>
              <div>
                <span className="block text-gray-500 mb-1">Documents</span>
                <span className="text-institutional-dark dark:text-white font-medium">
                  {[profilePhoto && 'Photo', govIdFile && 'Gov ID'].filter(Boolean).join(', ') || 'None'}
                </span>
              </div>
            </div>
          </div>

          {registration.isError && (
            <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-sm">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-manrope text-sm text-red-700 dark:text-red-300 font-medium">
                  Registration Failed
                </p>
                <p className="font-manrope text-sm text-red-600 dark:text-red-400 mt-1">
                  {getErrorMessage(registration.error as Error & { errorCode?: string })}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-4 p-4 border border-institutional-accent/30 bg-institutional-accent/5 rounded-sm">
            <input
              required
              type="checkbox"
              id="terms"
              checked={formData.termsAccepted}
              onChange={(e) => updateFormData({ termsAccepted: e.target.checked })}
              className="mt-1 w-5 h-5 accent-institutional-accent"
              disabled={submitting}
            />
            <label htmlFor="terms" className="font-manrope text-sm text-gray-700 dark:text-gray-300 leading-relaxed cursor-pointer">
              I hereby declare that all the information provided by me is true and correct to the best of my knowledge and belief. I agree to abide by the rules, regulations, and privacy policy of Ruchi Prativa Foundation.
            </label>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10 flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={submitting}
            className="flex items-center gap-2 text-gray-500 hover:text-institutional-dark dark:text-gray-400 dark:hover:text-white px-4 py-3.5 font-space text-xs uppercase tracking-widest font-semibold transition-colors disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button
            type="submit"
            disabled={!formData.termsAccepted || submitting}
            className="flex items-center gap-2 bg-institutional-accent text-institutional-dark px-8 py-3.5 rounded-sm font-space text-xs uppercase tracking-widest font-semibold hover:bg-institutional-accentHover transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
              </>
            ) : (
              <>
                Submit Application <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
