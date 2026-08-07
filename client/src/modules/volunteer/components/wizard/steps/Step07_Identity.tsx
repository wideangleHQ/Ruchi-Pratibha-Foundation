'use client';

import React, { useRef } from 'react';
import { useWizard } from '../WizardContext';
import { ArrowLeft, ArrowRight, UploadCloud, CheckCircle, X, AlertCircle } from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

const GOV_ID_OPTIONS = [
  { value: 'AADHAAR', label: 'Aadhaar Card' },
  { value: 'PAN', label: 'PAN Card' },
  { value: 'VOTER_ID', label: 'Voter ID' },
  { value: 'DRIVING_LICENSE', label: 'Driving Licence' },
  { value: 'PASSPORT', label: 'Passport' },
];

export const Step07_Identity: React.FC = () => {
  const { formData, updateFormData, nextStep, prevStep, govIdFile, setGovIdFile } = useWizard();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.govIdType) {
      alert('Please select a document type.');
      return;
    }
    if (!formData.govIdNumber) {
      alert('Please enter your document number.');
      return;
    }
    if (!govIdFile) {
      alert('Please upload your government ID document.');
      return;
    }
    nextStep();
  };

  const handleFileSelect = (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert('Please upload a JPEG, PNG, WebP, or PDF file.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert('File size must be less than 5MB.');
      return;
    }
    setGovIdFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <h3 className="font-cormorant text-3xl sm:text-4xl font-bold text-institutional-dark dark:text-white mb-3">
          Identity & Verification
        </h3>
        <p className="font-manrope text-gray-600 dark:text-gray-400">
          Please upload a government ID to verify your identity. Only one document is required.
        </p>
      </div>

      <form onSubmit={handleNext} className="flex-1 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-space text-xs uppercase tracking-widest text-gray-500 font-semibold">Document Type *</label>
              <select
                required
                value={formData.govIdType}
                onChange={(e) => updateFormData({ govIdType: e.target.value })}
                className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-sm px-4 py-3.5 font-manrope text-institutional-dark dark:text-white focus:outline-none focus:border-institutional-accent transition-colors appearance-none"
              >
                <option value="" disabled>Select document type</option>
                {GOV_ID_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-space text-xs uppercase tracking-widest text-gray-500 font-semibold">Document Number *</label>
              <input
                required
                type="text"
                value={formData.govIdNumber}
                onChange={(e) => updateFormData({ govIdNumber: e.target.value.toUpperCase() })}
                className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-sm px-4 py-3.5 font-manrope text-institutional-dark dark:text-white focus:outline-none focus:border-institutional-accent transition-colors"
                placeholder={formData.govIdType === 'AADHAAR' ? '1234 5678 9012' : formData.govIdType === 'PAN' ? 'ABCDE1234F' : 'Enter document number'}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-space text-xs uppercase tracking-widest text-gray-500 font-semibold">Upload Document *</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,application/pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
            />
            {govIdFile ? (
              <div className="border border-institutional-accent/30 bg-institutional-accent/5 rounded-sm p-4 flex items-center gap-4">
                <CheckCircle className="w-5 h-5 text-institutional-accent shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="font-manrope text-sm text-institutional-dark dark:text-white font-medium block truncate">{govIdFile.name}</span>
                  <span className="text-xs text-gray-500 font-manrope">{(govIdFile.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <button
                  type="button"
                  onClick={() => setGovIdFile(null)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="border-2 border-dashed border-gray-200 dark:border-white/10 rounded-sm p-8 flex flex-col items-center justify-center gap-3 bg-gray-50 dark:bg-white/5 hover:border-institutional-accent/50 hover:bg-institutional-accent/5 transition-all cursor-pointer"
              >
                <UploadCloud className="w-8 h-8 text-gray-400" />
                <div className="text-center">
                  <span className="font-manrope text-sm text-institutional-dark dark:text-white font-medium block">Click to upload or drag and drop</span>
                  <span className="text-xs text-gray-500 font-manrope">JPEG, PNG, WebP, or PDF (Max 5MB)</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-sm">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
            <p className="font-manrope text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
              Upload any one government-issued ID: Aadhaar, PAN, Voter ID, Driving Licence, or Passport. Your document will be stored securely and used only for verification purposes.
            </p>
          </div>
        </div>

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
