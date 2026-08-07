'use client';

import React from 'react';
import { useWizard } from '../WizardContext';
import { CheckCircle, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface SuccessScreenProps {
  onClose: () => void;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  SUBMITTED: { label: 'Submitted', color: 'text-institutional-accent bg-institutional-accent/10' },
  APPROVED: { label: 'Approved', color: 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20' },
  UNDER_REVIEW: { label: 'Under Review', color: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20' },
};

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ onClose }) => {
  const { formData, resetWizard, submissionResult } = useWizard();

  const handleClose = () => {
    resetWizard();
    onClose();
  };

  const applicationCode = submissionResult?.applicationCode || 'N/A';
  const volunteerCode = submissionResult?.volunteerCode || 'N/A';
  const status = submissionResult?.applicationStatus || 'SUBMITTED';
  const statusInfo = STATUS_LABELS[status] || STATUS_LABELS.SUBMITTED;
  const submittedDate = submissionResult?.submittedAt
    ? new Date(submissionResult.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const opportunityTitle = submissionResult?.opportunityTitle || '';

  return (
    <div className="flex flex-col items-center justify-center h-full text-center max-w-2xl mx-auto py-12">
      <div className="w-20 h-20 bg-institutional-accent/10 rounded-full flex items-center justify-center mb-8 border border-institutional-accent/20">
        <CheckCircle className="w-10 h-10 text-institutional-accent" />
      </div>

      <h3 className="font-cormorant text-4xl sm:text-5xl font-bold text-institutional-dark dark:text-white mb-4">
        Application Submitted Successfully
      </h3>

      {opportunityTitle && (
        <p className="font-manrope text-sm text-institutional-accent font-medium mb-4 uppercase tracking-wider">
          {opportunityTitle}
        </p>
      )}

      <p className="font-manrope text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10">
        Thank you, <span className="font-semibold text-institutional-dark dark:text-white">{formData.firstName}</span>. Your application to join the Ruchi Prativa Foundation volunteer network has been received successfully.
      </p>

      <div className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-sm p-6 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div>
            <span className="block font-space text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-1">Application Code</span>
            <span className="font-manrope text-institutional-dark dark:text-white font-medium text-sm">{applicationCode}</span>
          </div>
          <div>
            <span className="block font-space text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-1">Volunteer Code</span>
            <span className="font-manrope text-institutional-dark dark:text-white font-medium text-sm">{volunteerCode}</span>
          </div>
          <div>
            <span className="block font-space text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-1">Submission Date</span>
            <span className="font-manrope text-institutional-dark dark:text-white font-medium text-sm">{submittedDate}</span>
          </div>
          <div>
            <span className="block font-space text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-1">Current Status</span>
            <span className={`inline-flex items-center gap-1.5 font-manrope font-medium px-2.5 py-1 rounded-sm text-xs ${statusInfo.color}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {statusInfo.label}
            </span>
          </div>
        </div>
      </div>

      <div className="text-left w-full mb-12">
        <h4 className="font-space text-xs uppercase tracking-widest text-gray-500 font-semibold mb-4">Next Steps</h4>
        <ul className="space-y-3 font-manrope text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-xs">1</div>
            Our community team will review your profile.
          </li>
          <li className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-xs">2</div>
            You will receive a welcome email with further instructions within 48 hours.
          </li>
          <li className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-xs">3</div>
            Complete the virtual orientation session.
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-center">
        <Link
          href="/get-involved"
          onClick={handleClose}
          className="flex items-center justify-center gap-2 bg-institutional-dark dark:bg-white text-white dark:text-institutional-dark px-8 py-3.5 rounded-sm font-space text-xs uppercase tracking-widest font-semibold hover:bg-institutional-accent hover:text-institutional-dark dark:hover:bg-institutional-accent transition-colors"
        >
          Explore More Opportunities <ExternalLink className="w-4 h-4" />
        </Link>
        <Link
          href="/"
          onClick={handleClose}
          className="flex items-center justify-center gap-2 text-gray-500 hover:text-institutional-dark dark:text-gray-400 dark:hover:text-white px-8 py-3.5 font-space text-xs uppercase tracking-widest font-semibold transition-colors border border-gray-200 dark:border-white/10 rounded-sm hover:border-institutional-accent dark:hover:border-institutional-accent"
        >
          <ArrowLeft className="w-4 h-4" /> Return Home
        </Link>
      </div>
    </div>
  );
};
