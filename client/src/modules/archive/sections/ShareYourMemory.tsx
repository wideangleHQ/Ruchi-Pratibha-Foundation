'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

export const ShareYourMemory: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: 'Past Volunteer',
    yearOfAssociation: '',
    location: '',
    memoryStory: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.memoryStory.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section
      id="share-memory"
      className="py-24 sm:py-36 bg-institutional-dark text-white border-b border-white/10 overflow-hidden relative scroll-mt-24"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <span className="h-[1px] w-8 bg-institutional-accent" />
              <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
                Section 11 • Living Community Memory
              </span>
              <span className="h-[1px] w-8 bg-institutional-accent" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-cormorant text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight"
            >
              Share Your Memory with the Foundation
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-manrope text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              Were you a past volunteer, awardee, convocation guest, partner, or beneficiary? Your personal story, historic photographs, or letters belong in the living history of Ruchi Prativa Foundation.
            </motion.p>
          </div>

          {/* Submission Form Card */}
          <InteractiveCard className="bg-white/5 border border-white/15 rounded-sm p-6 sm:p-12 shadow-2xl">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <CheckCircle2 className="w-16 h-16 text-institutional-accent mx-auto mb-4 stroke-[1.5]" />
                <h3 className="font-cormorant text-3xl sm:text-4xl font-bold text-white mb-2">
                  Thank You for Preserving History
                </h3>
                <p className="font-manrope text-sm sm:text-base text-gray-300 max-w-lg mx-auto leading-relaxed mb-6">
                  Your memory submission has been received by our Digital Archivist team. Once reviewed, it will be cataloged into the official Foundation vault.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', role: 'Past Volunteer', yearOfAssociation: '', location: '', memoryStory: '' });
                  }}
                  className="px-6 py-3 text-xs uppercase tracking-widest font-space font-semibold text-institutional-accent border border-institutional-accent/40 rounded hover:bg-institutional-accent hover:text-institutional-dark transition-colors cursor-pointer"
                >
                  Submit Another Memory
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-space uppercase tracking-widest text-institutional-accent font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Chandra Das"
                      className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-institutional-accent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-space uppercase tracking-widest text-institutional-accent font-semibold mb-2">
                      Your Association Role *
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded text-sm text-white focus:outline-none focus:border-institutional-accent transition-colors cursor-pointer"
                    >
                      <option value="Past Volunteer" className="bg-institutional-dark text-white">Past Volunteer</option>
                      <option value="Awardee" className="bg-institutional-dark text-white">Sanman Awardee</option>
                      <option value="Guest" className="bg-institutional-dark text-white">Convocation Guest</option>
                      <option value="Family" className="bg-institutional-dark text-white">Family of Laureate</option>
                      <option value="Partner" className="bg-institutional-dark text-white">Social Partner</option>
                      <option value="Citizen" className="bg-institutional-dark text-white">Community Citizen</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-space uppercase tracking-widest text-institutional-accent font-semibold mb-2">
                      Year of Association / Event
                    </label>
                    <input
                      type="text"
                      value={formData.yearOfAssociation}
                      onChange={(e) => setFormData({ ...formData, yearOfAssociation: e.target.value })}
                      placeholder="e.g. 2004 or 1997-2008"
                      className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-institutional-accent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-space uppercase tracking-widest text-institutional-accent font-semibold mb-2">
                      Location / District
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Cuttack, Keonjhar, or Bhubaneswar"
                      className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-institutional-accent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-space uppercase tracking-widest text-institutional-accent font-semibold mb-2">
                    Your Personal Memory or Story *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.memoryStory}
                    onChange={(e) => setFormData({ ...formData, memoryStory: e.target.value })}
                    placeholder="Share your personal recollection, convocation moment, or community experience..."
                    className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-institutional-accent transition-colors resize-y"
                  />
                </div>

                {/* File Attachment Placeholder */}
                <div className="p-4 rounded border border-dashed border-white/20 bg-black/20 text-center">
                  <span className="text-xs font-space text-gray-300 block mb-1">
                    Optional: Upload Historic Photograph or Letter Scan
                  </span>
                  <span className="text-[10px] font-space text-institutional-accent">
                    [ Admin Moderated Submission • Max 25 MB ]
                  </span>
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-3 px-10 py-4 text-xs font-space uppercase tracking-widest font-semibold text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover transition-colors rounded-sm shadow-xl cursor-pointer min-h-[44px]"
                  >
                    <span>Submit Memory to Digital Archivist</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </InteractiveCard>
        </div>
      </div>
    </section>
  );
};
