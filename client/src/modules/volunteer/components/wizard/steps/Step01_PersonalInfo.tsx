'use client';

import React, { useRef } from 'react';
import { useWizard } from '../WizardContext';
import { ArrowRight, UploadCloud, X, CheckCircle } from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const Step01_PersonalInfo: React.FC = () => {
  const { formData, updateFormData, nextStep, profilePhoto, setProfilePhoto } = useWizard();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  const handleFileSelect = (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert('Please upload a JPEG, PNG, or WebP image.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert('File size must be less than 5MB.');
      return;
    }
    setProfilePhoto(file);
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
          Personal Information
        </h3>
        <p className="font-manrope text-gray-600 dark:text-gray-400">
          Let&apos;s start with your basic details to create your profile.
        </p>
      </div>

      <form onSubmit={handleNext} className="flex-1 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-space text-xs uppercase tracking-widest text-gray-500 font-semibold">First Name</label>
              <input
                required
                type="text"
                value={formData.firstName}
                onChange={(e) => updateFormData({ firstName: e.target.value })}
                className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-sm px-4 py-3.5 font-manrope text-institutional-dark dark:text-white focus:outline-none focus:border-institutional-accent transition-colors"
                placeholder="Enter first name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-space text-xs uppercase tracking-widest text-gray-500 font-semibold">Last Name</label>
              <input
                required
                type="text"
                value={formData.lastName}
                onChange={(e) => updateFormData({ lastName: e.target.value })}
                className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-sm px-4 py-3.5 font-manrope text-institutional-dark dark:text-white focus:outline-none focus:border-institutional-accent transition-colors"
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-space text-xs uppercase tracking-widest text-gray-500 font-semibold">Gender</label>
              <select
                required
                value={formData.gender}
                onChange={(e) => updateFormData({ gender: e.target.value })}
                className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-sm px-4 py-3.5 font-manrope text-institutional-dark dark:text-white focus:outline-none focus:border-institutional-accent transition-colors appearance-none"
              >
                <option value="" disabled>Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-space text-xs uppercase tracking-widest text-gray-500 font-semibold">Date of Birth</label>
              <input
                required
                type="date"
                value={formData.dob}
                onChange={(e) => updateFormData({ dob: e.target.value })}
                className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-sm px-4 py-3.5 font-manrope text-institutional-dark dark:text-white focus:outline-none focus:border-institutional-accent transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-space text-xs uppercase tracking-widest text-gray-500 font-semibold">Profile Photo (Optional)</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
            />
            {profilePhoto ? (
              <div className="border border-institutional-accent/30 bg-institutional-accent/5 rounded-sm p-4 flex items-center gap-4">
                <CheckCircle className="w-5 h-5 text-institutional-accent shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="font-manrope text-sm text-institutional-dark dark:text-white font-medium block truncate">{profilePhoto.name}</span>
                  <span className="text-xs text-gray-500 font-manrope">{(profilePhoto.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <button
                  type="button"
                  onClick={() => setProfilePhoto(null)}
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
                className="border-2 border-dashed border-gray-200 dark:border-white/10 rounded-sm p-6 flex flex-col items-center justify-center gap-2 bg-gray-50 dark:bg-white/5 hover:border-institutional-accent/50 hover:bg-institutional-accent/5 transition-all cursor-pointer"
              >
                <UploadCloud className="w-6 h-6 text-gray-400" />
                <span className="font-manrope text-sm text-gray-500 dark:text-gray-400">Drag & drop your photo or click to browse</span>
                <span className="text-xs text-gray-400 font-space tracking-wider uppercase">JPG, PNG or WebP · Max 5MB</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10 flex justify-end">
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
