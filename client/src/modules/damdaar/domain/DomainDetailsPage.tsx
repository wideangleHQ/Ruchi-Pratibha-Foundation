'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, ChevronRight, User, Briefcase, Award, ShieldAlert } from 'lucide-react';
import { Navigation } from '@/modules/home/sections/Navigation';
import { Footer } from '@/modules/home/sections/Footer';
import { DAMDAAR_DOMAINS } from '../data/damdaarData';

// Odisha Districts List
const ODISHA_DISTRICTS = [
  'Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Baudh', 'Cuttack', 
  'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghpur', 'Jajpur', 
  'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara', 'Kendujhar', 'Khordha', 
  'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada', 
  'Puri', 'Rayagada', 'Sambalpur', 'Subarnapur', 'Sundargarh'
];

interface DomainDetailsPageProps {
  slug: string;
}

export const DomainDetailsPage: React.FC<DomainDetailsPageProps> = ({ slug }) => {
  const router = useRouter();
  const domain = DAMDAAR_DOMAINS.find((d) => d.slug === slug);
  const [step, setStep] = useState<number>(1); // 1: Info & Eligibility, 2: Personal Details Form, 3: Domain Form, 4: Review, 5: Success
  
  // Form State
  const [formData, setFormData] = useState({
    // Common Info
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    dob: '',
    gender: 'Male',
    district: 'Khordha',
    city: '',
    idProofType: 'Aadhaar Card',
    idNumber: '',
    
    // Art & Culture Specific
    artForm: '',
    discipline: 'Classical',
    experienceYears: '2',
    portfolioUrl: '',
    
    // Tech Specific
    projectName: '',
    problemStatement: '',
    solution: '',
    techStack: '',
    projectStage: 'Prototype',
    repoUrl: '',
    
    // Entrepreneurship Specific
    startupName: '',
    businessCategory: 'Social Enterprise',
    businessModel: '',
    pitchDeckUrl: '',
    teamSize: '1',
    
    // Culinary Specific
    recipeName: '',
    cuisineType: 'Traditional Odia',
    specialtyCategory: 'Pitha & Sweets',
    recipeSteps: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!domain) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-between font-poppins text-institutional-dark">
        <Navigation />
        <div className="flex-grow flex flex-col items-center justify-center py-20 px-6">
          <h2 className="font-playfair text-3xl font-bold mb-4">Domain Not Found</h2>
          <button 
            onClick={() => router.push('/damdaar-odia')}
            className="flex items-center gap-2 px-5 py-2.5 bg-institutional-accent text-white font-medium rounded-sm hover:bg-institutional-accentHover transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Damdaar Odia
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid Email is required';
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) newErrors.phone = '10-digit Phone Number is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.city.trim()) newErrors.city = 'City/Village is required';
    if (!formData.idNumber.trim()) newErrors.idNumber = 'Identification document number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (domain.id === 'art-culture' && !formData.artForm.trim()) {
      newErrors.artForm = 'Art Form details are required';
    }
    if (domain.id === 'technology') {
      if (!formData.projectName.trim()) newErrors.projectName = 'Project/Application Name is required';
      if (!formData.problemStatement.trim()) newErrors.problemStatement = 'Problem Statement is required';
      if (!formData.solution.trim()) newErrors.solution = 'Solution details are required';
    }
    if (domain.id === 'entrepreneurship') {
      if (!formData.startupName.trim()) newErrors.startupName = 'Startup/Business name is required';
      if (!formData.businessModel.trim()) newErrors.businessModel = 'Business model explanation is required';
    }
    if (domain.id === 'culinary-excellence') {
      if (!formData.recipeName.trim()) newErrors.recipeName = 'Recipe Name is required';
      if (!formData.recipeSteps.trim()) newErrors.recipeSteps = 'Recipe details/instructions are required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    setStep((prev) => Math.min(prev + 1, 5));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const domainBgTheme = {
    'art-culture': 'bg-damdaar-freshGreen/10 border-damdaar-freshGreen/30',
    'technology': 'bg-damdaar-deepGreen/10 border-damdaar-deepGreen/30',
    'entrepreneurship': 'bg-damdaar-warmOrange/10 border-damdaar-warmOrange/30',
    'culinary-excellence': 'bg-damdaar-burntOrange/10 border-damdaar-burntOrange/30',
  }[domain.id];

  const domainColorText = {
    'art-culture': 'text-damdaar-freshGreen',
    'technology': 'text-damdaar-deepGreen',
    'entrepreneurship': 'text-damdaar-warmOrange',
    'culinary-excellence': 'text-damdaar-burntOrange',
  }[domain.id];

  const domainBtnTheme = {
    'art-culture': 'bg-damdaar-freshGreen hover:bg-damdaar-freshGreen/90 focus-visible:ring-damdaar-freshGreen',
    'technology': 'bg-damdaar-deepGreen hover:bg-damdaar-deepGreen/90 focus-visible:ring-damdaar-deepGreen',
    'entrepreneurship': 'bg-damdaar-warmOrange hover:bg-damdaar-warmOrange/90 focus-visible:ring-damdaar-warmOrange',
    'culinary-excellence': 'bg-damdaar-burntOrange hover:bg-damdaar-burntOrange/90 focus-visible:ring-damdaar-burntOrange',
  }[domain.id];

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-between font-poppins text-institutional-dark selection:bg-damdaar-gold selection:text-white">
      <Navigation />

      <main className="flex-grow pt-10 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Breadcrumb / Back Button */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => router.push('/damdaar-odia')}
            className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-gray-500 hover:text-institutional-dark transition-colors duration-150 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to Movement
          </button>
          
          {step > 1 && step < 5 && (
            <div className="text-xs font-semibold text-gray-500">
              STEP {step} OF 4
            </div>
          )}
        </div>

        {/* Wizard Progression Bar */}
        {step < 5 && (
          <div className="mb-12 relative flex items-center justify-between max-w-lg mx-auto">
            <div className="absolute left-0 right-0 h-0.5 bg-gray-200 top-1/2 -translate-y-1/2 z-0" />
            <div 
              className="absolute left-0 h-0.5 bg-damdaar-gold top-1/2 -translate-y-1/2 z-0 transition-all duration-300"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />

            {[1, 2, 3, 4].map((s) => (
              <button
                key={s}
                onClick={() => s < step && setStep(s)}
                disabled={s >= step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold z-10 transition-all duration-300 ${
                  s < step
                    ? 'bg-damdaar-gold text-white cursor-pointer'
                    : s === step
                    ? `bg-institutional-dark text-white shadow-md scale-110`
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {s < step ? <Check className="w-4 h-4" /> : s}
              </button>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Info & Guidelines */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Domain Main Header */}
              <div className={`p-8 sm:p-12 rounded-sm border ${domainBgTheme} text-center space-y-4`}>
                <span className={`text-[10px] sm:text-xs uppercase tracking-widest font-bold ${domainColorText}`}>
                  {domain.focus}
                </span>
                <h1 className="font-playfair text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
                  {domain.title}
                </h1>
                <p className="font-playfair text-lg sm:text-xl text-gray-600 italic">
                  &ldquo;{domain.tagline}&rdquo;
                </p>
                <div className="max-w-2xl mx-auto pt-4 border-t border-black/5">
                  <p className="text-sm leading-relaxed text-gray-700">
                    {domain.fullDescription}
                  </p>
                </div>
              </div>

              {/* Guidelines Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Who Can Register */}
                <div className="bg-white border border-black/5 rounded-sm p-6 sm:p-8 space-y-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 ${domainColorText}`}>
                      <User className="w-5 h-5" />
                    </div>
                    <h3 className="font-playfair text-xl font-bold">Eligibility Profile</h3>
                  </div>
                  <ul className="space-y-2.5 text-sm text-gray-600">
                    {domain.whoCanParticipate.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${domainColorText}`} style={{ backgroundColor: domain.colorHex }} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Journey & Evaluation */}
                <div className="bg-white border border-black/5 rounded-sm p-6 sm:p-8 space-y-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 ${domainColorText}`}>
                      <Award className="w-5 h-5" />
                    </div>
                    <h3 className="font-playfair text-xl font-bold">Evaluation Stages</h3>
                  </div>
                  <ul className="space-y-2.5 text-sm text-gray-600">
                    {domain.stagesInfo.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className={`font-semibold mr-1 ${domainColorText}`}>{idx + 1}.</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Key Rules */}
              <div className="bg-white border border-black/5 rounded-sm p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3 text-red-700">
                  <ShieldAlert className="w-5 h-5" />
                  <h3 className="font-playfair text-xl font-bold text-institutional-dark">Key Rules & Directives</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-600">
                  {domain.rules.map((r, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400 select-none">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Start Registration CTA */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={handleNext}
                  className={`px-8 py-3.5 text-xs font-semibold text-white uppercase tracking-widest rounded-sm shadow-md transition-all duration-200 flex items-center gap-2 ${domainBtnTheme} cursor-pointer`}
                >
                  Start Registration
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Personal details */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-black/5 rounded-sm p-6 sm:p-10 space-y-8 shadow-sm"
            >
              <div className="border-b border-black/5 pb-4">
                <h2 className="font-playfair text-2xl font-bold">1. Participant Credentials</h2>
                <p className="text-xs text-gray-400 mt-1">Please enter your verified personal details as they appear on official identity documents.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`px-4 py-2.5 text-sm bg-gray-50 border rounded-sm focus:outline-none focus:ring-1 ${
                      errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-damdaar-gold'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <span className="text-[10px] text-red-500 font-semibold">{errors.fullName}</span>}
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`px-4 py-2.5 text-sm bg-gray-50 border rounded-sm focus:outline-none focus:ring-1 ${
                      errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-damdaar-gold'
                    }`}
                    placeholder="name@example.com"
                  />
                  {errors.email && <span className="text-[10px] text-red-500 font-semibold">{errors.email}</span>}
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`px-4 py-2.5 text-sm bg-gray-50 border rounded-sm focus:outline-none focus:ring-1 ${
                      errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-damdaar-gold'
                    }`}
                    placeholder="10-digit mobile number"
                  />
                  {errors.phone && <span className="text-[10px] text-red-500 font-semibold">{errors.phone}</span>}
                </div>

                {/* WhatsApp Number */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">WhatsApp Number</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className="px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-damdaar-gold"
                    placeholder="Optional (if different from phone)"
                  />
                </div>

                {/* Date of Birth */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Date of Birth *</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className={`px-4 py-2.5 text-sm bg-gray-50 border rounded-sm focus:outline-none focus:ring-1 ${
                      errors.dob ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-damdaar-gold'
                    }`}
                  />
                  {errors.dob && <span className="text-[10px] text-red-500 font-semibold">{errors.dob}</span>}
                </div>

                {/* Gender */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-damdaar-gold"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* District */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">District (Odisha) *</label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-damdaar-gold"
                  >
                    {ODISHA_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">City / Village *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`px-4 py-2.5 text-sm bg-gray-50 border rounded-sm focus:outline-none focus:ring-1 ${
                      errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-damdaar-gold'
                    }`}
                    placeholder="Enter city or village name"
                  />
                  {errors.city && <span className="text-[10px] text-red-500 font-semibold">{errors.city}</span>}
                </div>

                {/* ID Proof Type */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">ID Proof Type *</label>
                  <select
                    name="idProofType"
                    value={formData.idProofType}
                    onChange={handleInputChange}
                    className="px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-damdaar-gold"
                  >
                    <option value="Aadhaar Card">Aadhaar Card</option>
                    <option value="Voter ID">Voter ID</option>
                    <option value="PAN Card">PAN Card</option>
                    <option value="Driving License">Driving License</option>
                  </select>
                </div>

                {/* ID Proof Number */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">ID Proof Document Number *</label>
                  <input
                    type="text"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleInputChange}
                    className={`px-4 py-2.5 text-sm bg-gray-50 border rounded-sm focus:outline-none focus:ring-1 ${
                      errors.idNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-damdaar-gold'
                    }`}
                    placeholder="Enter document number"
                  />
                  {errors.idNumber && <span className="text-[10px] text-red-500 font-semibold">{errors.idNumber}</span>}
                </div>
              </div>

              {/* Navigation CTAs */}
              <div className="pt-6 border-t border-black/5 flex items-center justify-between">
                <button
                  onClick={handleBack}
                  className="px-5 py-2.5 border border-gray-300 text-xs uppercase tracking-wider font-semibold hover:bg-gray-50 transition-colors duration-150 text-gray-500 hover:text-institutional-dark"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className={`px-6 py-2.5 text-xs font-semibold text-white uppercase tracking-widest rounded-sm shadow-md transition-all duration-200 flex items-center gap-1 ${domainBtnTheme}`}
                >
                  Next Step
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Category-specific form */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-black/5 rounded-sm p-6 sm:p-10 space-y-8 shadow-sm"
            >
              <div className="border-b border-black/5 pb-4">
                <h2 className="font-playfair text-2xl font-bold">2. {domain.title} Entry Details</h2>
                <p className="text-xs text-gray-400 mt-1">Provide relevant details regarding your showcase entry, project, or recipe submission.</p>
              </div>

              {/* A. Art & Culture Form */}
              {domain.id === 'art-culture' && (
                <div className="space-y-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Specific Art Form / Craft Name *</label>
                    <input
                      type="text"
                      name="artForm"
                      value={formData.artForm}
                      onChange={handleInputChange}
                      className={`px-4 py-2.5 text-sm bg-gray-50 border rounded-sm focus:outline-none focus:ring-1 ${
                        errors.artForm ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-damdaar-gold'
                      }`}
                      placeholder="e.g. Odissi Dance, Pattachitra Painting, Sambalpuri Weaver, etc."
                    />
                    {errors.artForm && <span className="text-[10px] text-red-500 font-semibold">{errors.artForm}</span>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Discipline Category</label>
                      <select
                        name="discipline"
                        value={formData.discipline}
                        onChange={handleInputChange}
                        className="px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-damdaar-gold"
                      >
                        <option value="Classical">Classical</option>
                        <option value="Folk & Tribal">Folk & Tribal</option>
                        <option value="Contemporary & Fusion">Contemporary & Fusion</option>
                        <option value="Craftsmanship & Weaving">Craftsmanship & Weaving</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Years of Experience</label>
                      <select
                        name="experienceYears"
                        value={formData.experienceYears}
                        onChange={handleInputChange}
                        className="px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-damdaar-gold"
                      >
                        <option value="Under 2 Years">Under 2 Years</option>
                        <option value="2 to 5 Years">2 to 5 Years</option>
                        <option value="5 to 10 Years">5 to 10 Years</option>
                        <option value="Over 10 Years">Over 10 Years</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Portfolio / Performance Showcase Link</label>
                    <input
                      type="url"
                      name="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleInputChange}
                      className="px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-damdaar-gold"
                      placeholder="e.g. YouTube video, Google Drive folder, digital catalog URL"
                    />
                  </div>
                </div>
              )}

              {/* B. Technology Form */}
              {domain.id === 'technology' && (
                <div className="space-y-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Project / Application Name *</label>
                    <input
                      type="text"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleInputChange}
                      className={`px-4 py-2.5 text-sm bg-gray-50 border rounded-sm focus:outline-none focus:ring-1 ${
                        errors.projectName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-damdaar-gold'
                      }`}
                      placeholder="Enter project name"
                    />
                    {errors.projectName && <span className="text-[10px] text-red-500 font-semibold">{errors.projectName}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">The Problem Statement *</label>
                    <textarea
                      name="problemStatement"
                      value={formData.problemStatement}
                      onChange={handleInputChange}
                      rows={3}
                      className={`px-4 py-2.5 text-sm bg-gray-50 border rounded-sm focus:outline-none focus:ring-1 ${
                        errors.problemStatement ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-damdaar-gold'
                      }`}
                      placeholder="Describe the specific problem or issue your innovation addresses..."
                    />
                    {errors.problemStatement && <span className="text-[10px] text-red-500 font-semibold">{errors.problemStatement}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">The Solution *</label>
                    <textarea
                      name="solution"
                      value={formData.solution}
                      onChange={handleInputChange}
                      rows={3}
                      className={`px-4 py-2.5 text-sm bg-gray-50 border rounded-sm focus:outline-none focus:ring-1 ${
                        errors.solution ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-damdaar-gold'
                      }`}
                      placeholder="Describe how your project solves the problem statement..."
                    />
                    {errors.solution && <span className="text-[10px] text-red-500 font-semibold">{errors.solution}</span>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Technology Stack Used</label>
                      <input
                        type="text"
                        name="techStack"
                        value={formData.techStack}
                        onChange={handleInputChange}
                        className="px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-damdaar-gold"
                        placeholder="e.g. React Native, Node.js, IoT, Python, Arduino"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Current Prototype Stage</label>
                      <select
                        name="projectStage"
                        value={formData.projectStage}
                        onChange={handleInputChange}
                        className="px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-damdaar-gold"
                      >
                        <option value="Idea Stage">Idea Stage</option>
                        <option value="Prototype (MVP)">Prototype (MVP)</option>
                        <option value="Beta Live">Beta Live</option>
                        <option value="Fully Deployed">Fully Deployed</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Repository / Code Link</label>
                    <input
                      type="url"
                      name="repoUrl"
                      value={formData.repoUrl}
                      onChange={handleInputChange}
                      className="px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-damdaar-gold"
                      placeholder="e.g. GitHub link, project URL, video demo link"
                    />
                  </div>
                </div>
              )}

              {/* C. Entrepreneurship Form */}
              {domain.id === 'entrepreneurship' && (
                <div className="space-y-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Startup / Business Name *</label>
                    <input
                      type="text"
                      name="startupName"
                      value={formData.startupName}
                      onChange={handleInputChange}
                      className={`px-4 py-2.5 text-sm bg-gray-50 border rounded-sm focus:outline-none focus:ring-1 ${
                        errors.startupName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-damdaar-gold'
                      }`}
                      placeholder="Enter business name"
                    />
                    {errors.startupName && <span className="text-[10px] text-red-500 font-semibold">{errors.startupName}</span>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Business Category</label>
                      <select
                        name="businessCategory"
                        value={formData.businessCategory}
                        onChange={handleInputChange}
                        className="px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-damdaar-gold"
                      >
                        <option value="Social Enterprise">Social Enterprise</option>
                        <option value="Technology & SaaS">Technology & SaaS</option>
                        <option value="Traditional Craft & Handlooms">Traditional Craft & Handlooms</option>
                        <option value="Agribusiness & Rural">Agribusiness & Rural</option>
                        <option value="Food & Hospitality">Food & Hospitality</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Core Team Size</label>
                      <select
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleInputChange}
                        className="px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-damdaar-gold"
                      >
                        <option value="Solo Founder (1)">Solo Founder (1)</option>
                        <option value="2 to 5 Members">2 to 5 Members</option>
                        <option value="5 to 10 Members">5 to 10 Members</option>
                        <option value="Over 10 Members">Over 10 Members</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Value Proposition & Business Model *</label>
                    <textarea
                      name="businessModel"
                      value={formData.businessModel}
                      onChange={handleInputChange}
                      rows={4}
                      className={`px-4 py-2.5 text-sm bg-gray-50 border rounded-sm focus:outline-none focus:ring-1 ${
                        errors.businessModel ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-damdaar-gold'
                      }`}
                      placeholder="Explain what your startup offers and how it generates revenue or social value..."
                    />
                    {errors.businessModel && <span className="text-[10px] text-red-500 font-semibold">{errors.businessModel}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Pitch Deck / Business Proposal Link</label>
                    <input
                      type="url"
                      name="pitchDeckUrl"
                      value={formData.pitchDeckUrl}
                      onChange={handleInputChange}
                      className="px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-damdaar-gold"
                      placeholder="e.g. Google Drive presentation link, Dropbox PDF URL"
                    />
                  </div>
                </div>
              )}

              {/* D. Culinary Excellence Form */}
              {domain.id === 'culinary-excellence' && (
                <div className="space-y-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Recipe / Dish Name *</label>
                    <input
                      type="text"
                      name="recipeName"
                      value={formData.recipeName}
                      onChange={handleInputChange}
                      className={`px-4 py-2.5 text-sm bg-gray-50 border rounded-sm focus:outline-none focus:ring-1 ${
                        errors.recipeName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-damdaar-gold'
                      }`}
                      placeholder="e.g. Mandia Pitha, Dalma Fusion, Chena Poda Variation"
                    />
                    {errors.recipeName && <span className="text-[10px] text-red-500 font-semibold">{errors.recipeName}</span>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Cuisine Style</label>
                      <select
                        name="cuisineType"
                        value={formData.cuisineType}
                        onChange={handleInputChange}
                        className="px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-damdaar-gold"
                      >
                        <option value="Traditional Odia">Traditional Odia</option>
                        <option value="Odia Fusion Gastronomy">Odia Fusion Gastronomy</option>
                        <option value="Ancient/Tribal Forest Recipes">Ancient/Tribal Forest Recipes</option>
                        <option value="Odia Sweet & Confectionery">Odia Sweet & Confectionery</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Specialty Category</label>
                      <select
                        name="specialtyCategory"
                        value={formData.specialtyCategory}
                        onChange={handleInputChange}
                        className="px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-damdaar-gold"
                      >
                        <option value="Pitha & Sweets">Pitha & Sweets</option>
                        <option value="Rice & Millet Dishes">Rice & Millet Dishes</option>
                        <option value="Curries & Accompaniments">Curries & Accompaniments</option>
                        <option value="Beverages & Sherbets">Beverages & Sherbets</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Recipe Summary & Preparation Details *</label>
                    <textarea
                      name="recipeSteps"
                      value={formData.recipeSteps}
                      onChange={handleInputChange}
                      rows={5}
                      className={`px-4 py-2.5 text-sm bg-gray-50 border rounded-sm focus:outline-none focus:ring-1 ${
                        errors.recipeSteps ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-damdaar-gold'
                      }`}
                      placeholder="Outline the main ingredients, heritage value of the dish, and core cooking steps..."
                    />
                    {errors.recipeSteps && <span className="text-[10px] text-red-500 font-semibold">{errors.recipeSteps}</span>}
                  </div>
                </div>
              )}

              {/* Navigation CTAs */}
              <div className="pt-6 border-t border-black/5 flex items-center justify-between">
                <button
                  onClick={handleBack}
                  className="px-5 py-2.5 border border-gray-300 text-xs uppercase tracking-wider font-semibold hover:bg-gray-50 transition-colors duration-150 text-gray-500 hover:text-institutional-dark"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className={`px-6 py-2.5 text-xs font-semibold text-white uppercase tracking-widest rounded-sm shadow-md transition-all duration-200 flex items-center gap-1 ${domainBtnTheme}`}
                >
                  Next Step
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Review details */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-black/5 rounded-sm p-6 sm:p-10 space-y-8 shadow-sm"
            >
              <div className="border-b border-black/5 pb-4">
                <h2 className="font-playfair text-2xl font-bold">3. Verification Review</h2>
                <p className="text-xs text-gray-400 mt-1">Please review your submission parameters before locking your registration profile.</p>
              </div>

              {/* A. Personal Recap */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-damdaar-gold flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Participant Profile
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-gray-50 border border-gray-100 p-5 rounded-sm">
                  <div><span className="text-gray-400 block text-xs">FULL NAME</span> <span className="font-medium">{formData.fullName}</span></div>
                  <div><span className="text-gray-400 block text-xs">EMAIL ADDRESS</span> <span className="font-medium">{formData.email}</span></div>
                  <div><span className="text-gray-400 block text-xs">PHONE NUMBER</span> <span className="font-medium">{formData.phone}</span></div>
                  <div><span className="text-gray-400 block text-xs">DISTRICT / LOCATION</span> <span className="font-medium">{formData.city}, {formData.district} (Odisha)</span></div>
                  <div><span className="text-gray-400 block text-xs">DATE OF BIRTH</span> <span className="font-medium">{formData.dob}</span></div>
                  <div><span className="text-gray-400 block text-xs">IDENTIFICATION DOCUMENT</span> <span className="font-medium">{formData.idProofType} ({formData.idNumber})</span></div>
                </div>
              </div>

              {/* B. Domain Entry Recap */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-damdaar-gold flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Showcase & Domain Settings ({domain.title})
                </h3>
                <div className="text-sm bg-gray-50 border border-gray-100 p-5 rounded-sm space-y-4">
                  {domain.id === 'art-culture' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><span className="text-gray-400 block text-xs">SPECIFIC ART FORM</span> <span className="font-medium">{formData.artForm}</span></div>
                      <div><span className="text-gray-400 block text-xs">DISCIPLINE CATEGORY</span> <span className="font-medium">{formData.discipline}</span></div>
                      <div><span className="text-gray-400 block text-xs">EXPERIENCE</span> <span className="font-medium">{formData.experienceYears}</span></div>
                      <div><span className="text-gray-400 block text-xs">PORTFOLIO URL</span> <span className="font-medium truncate block max-w-xs">{formData.portfolioUrl || 'None Provided'}</span></div>
                    </div>
                  )}

                  {domain.id === 'technology' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><span className="text-gray-400 block text-xs">PROJECT NAME</span> <span className="font-medium">{formData.projectName}</span></div>
                        <div><span className="text-gray-400 block text-xs">PROTOTYPE STAGE</span> <span className="font-medium">{formData.projectStage}</span></div>
                        <div><span className="text-gray-400 block text-xs">TECH STACK</span> <span className="font-medium">{formData.techStack || 'Not Specified'}</span></div>
                        <div><span className="text-gray-400 block text-xs">REPOSITORY LINK</span> <span className="font-medium truncate block max-w-xs">{formData.repoUrl || 'None Provided'}</span></div>
                      </div>
                      <div><span className="text-gray-400 block text-xs">PROBLEM STATEMENT</span> <p className="text-gray-700 mt-0.5">{formData.problemStatement}</p></div>
                      <div><span className="text-gray-400 block text-xs">PROPOSED SOLUTION</span> <p className="text-gray-700 mt-0.5">{formData.solution}</p></div>
                    </div>
                  )}

                  {domain.id === 'entrepreneurship' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><span className="text-gray-400 block text-xs">STARTUP / VENTURE NAME</span> <span className="font-medium">{formData.startupName}</span></div>
                        <div><span className="text-gray-400 block text-xs">BUSINESS CATEGORY</span> <span className="font-medium">{formData.businessCategory}</span></div>
                        <div><span className="text-gray-400 block text-xs">CORE TEAM SIZE</span> <span className="font-medium">{formData.teamSize}</span></div>
                        <div><span className="text-gray-400 block text-xs">PITCH DECK URL</span> <span className="font-medium truncate block max-w-xs">{formData.pitchDeckUrl || 'None Provided'}</span></div>
                      </div>
                      <div><span className="text-gray-400 block text-xs">VALUE PROPOSITION & REVENUE MODEL</span> <p className="text-gray-700 mt-0.5">{formData.businessModel}</p></div>
                    </div>
                  )}

                  {domain.id === 'culinary-excellence' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><span className="text-gray-400 block text-xs">RECIPE NAME</span> <span className="font-medium">{formData.recipeName}</span></div>
                        <div><span className="text-gray-400 block text-xs">CUISINE STYLE</span> <span className="font-medium">{formData.cuisineType}</span></div>
                        <div><span className="text-gray-400 block text-xs">SPECIALTY CATEGORY</span> <span className="font-medium">{formData.specialtyCategory}</span></div>
                      </div>
                      <div><span className="text-gray-400 block text-xs">RECIPE DETAILS</span> <p className="text-gray-700 mt-0.5 whitespace-pre-wrap">{formData.recipeSteps}</p></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation CTAs */}
              <div className="pt-6 border-t border-black/5 flex items-center justify-between">
                <button
                  onClick={handleBack}
                  className="px-5 py-2.5 border border-gray-300 text-xs uppercase tracking-wider font-semibold hover:bg-gray-50 transition-colors duration-150 text-gray-500 hover:text-institutional-dark"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-damdaar-gold hover:bg-damdaar-gold/90 text-xs font-semibold text-white uppercase tracking-widest rounded-sm shadow-md transition-all duration-200 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-damdaar-gold"
                >
                  Confirm & Submit
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Success & Confirmation */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="bg-white border border-black/5 rounded-sm p-8 sm:p-12 text-center space-y-6 shadow-md max-w-2xl mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto shadow-sm border border-green-100">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest font-bold text-damdaar-gold font-space">Registration Confirmed</span>
                <h2 className="font-playfair text-3xl font-bold">Welcome to Odisha&apos;s Next Chapter</h2>
                <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                  Your application profile has been logged in the Foundation&apos;s database. A confirmation email containing details and evaluation stages has been dispatched.
                </p>
              </div>

              {/* ID Badge Box */}
              <div className="p-6 bg-[#FDFBF7] border border-dashed border-gray-200 rounded-sm inline-block max-w-xs mx-auto space-y-2.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block font-space">DUMDAAR ODIA PROFILE ID</span>
                <div className="font-space font-bold text-lg text-institutional-dark tracking-wider select-all uppercase">
                  DO-2026-{Math.floor(10000 + Math.random() * 90000)}
                </div>
                <div className="text-[10px] text-gray-400 leading-normal">
                  Registered under {formData.fullName} ({domain.title})
                </div>
              </div>

              <div className="pt-4 border-t border-black/5 flex flex-col sm:flex-row gap-3 items-center justify-center">
                <button
                  onClick={() => router.push('/damdaar-odia')}
                  className={`w-full sm:w-auto px-6 py-3 text-xs font-semibold text-white uppercase tracking-widest rounded-sm transition-all duration-200 shadow-md ${domainBtnTheme}`}
                >
                  Return to movement
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="w-full sm:w-auto px-6 py-3 border border-gray-300 hover:bg-gray-50 text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors text-gray-500 hover:text-institutional-dark"
                >
                  Foundation Home
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};
