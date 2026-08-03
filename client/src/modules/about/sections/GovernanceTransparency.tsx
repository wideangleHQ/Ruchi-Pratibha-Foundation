'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ShieldCheck, CheckCircle } from 'lucide-react';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

export const GovernanceTransparency: React.FC = () => {
  const documents = [
    {
      title: 'Trust Registration Charter',
      category: 'LEGAL CHARTER',
      desc: 'Official public charitable trust deed registered under Indian Trust Act 1882.',
      filename: 'RPF_Trust_Charter_1997.pdf',
    },
    {
      title: 'Annual Report & Audit Statement',
      category: 'FINANCIAL AUDIT',
      desc: 'Transparent public disclosure of annual audited financial accounts and programme expenses.',
      filename: 'RPF_Annual_Report_2024-25.pdf',
    },
    {
      title: 'Governance & Jury Guidelines',
      category: 'AWARD GOVERNANCE',
      desc: 'Rigorous selection criteria and conflict-of-interest guidelines for Ruchi Prativa Sanman jurors.',
      filename: 'RPF_Sanman_Jury_Guidelines.pdf',
    },
  ];

  return (
    <section id="governance" className="py-20 sm:py-28 bg-institutional-light dark:bg-institutional-surface/20 text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="h-[1px] w-8 bg-institutional-accent" />
              <span className="text-xs uppercase tracking-[0.2em] font-space text-institutional-accent font-semibold">
                Public Accountability
              </span>
            </div>
            <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white mb-6 leading-[1.15]">
              Governance, Integrity &amp; Public Transparency
            </h2>
            <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6">
              Ruchi Prativa Foundation believes that public trust is earned through uncompromising institutional compliance, independent financial auditing, and transparent governance standards.
            </p>

            <ul className="space-y-3 font-manrope text-xs sm:text-sm text-institutional-dark dark:text-gray-200">
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-institutional-accent shrink-0" />
                <span>Registered Public Charitable Trust under the Indian Trust Act, 1882.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-institutional-accent shrink-0" />
                <span>Section 80G &amp; 12A Income Tax Registration for charitable donations.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-institutional-accent shrink-0" />
                <span>Independent Advisory Board and Jury panel for award selection.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-institutional-accent shrink-0" />
                <span>Annual public disclosures and certified financial audit statements.</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="p-8 rounded-sm bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 shadow-lg flex flex-col items-center text-center">
              <ShieldCheck className="w-12 h-12 text-institutional-accent mb-4 stroke-[1.5]" />
              <h3 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white mb-2">
                Institutional Pledge
              </h3>
              <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed">
                &ldquo;Every rupee entrusted to the Foundation is deployed strictly according to public trust legislation, safeguarding institutional dignity and social welfare.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>

        {/* Download Placeholders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {documents.map((doc, idx) => (
            <motion.div
              key={doc.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <InteractiveCard className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 hover:border-institutional-accent/50 transition-all duration-300 shadow-sm hover:shadow-md">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-space text-[10px] uppercase tracking-widest text-institutional-accent font-semibold">
                      {doc.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-institutional-accent/15 flex items-center justify-center text-institutional-accent">
                      <FileText className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="font-cormorant text-xl font-bold text-institutional-dark dark:text-white mb-2">
                    {doc.title}
                  </h4>
                  <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-4">
                    {doc.desc}
                  </p>
                  <div className="text-[10px] font-space text-gray-500 dark:text-gray-400 mb-4 flex items-center justify-between border-t border-black/5 dark:border-white/5 pt-2">
                    <span>STATUS: CERTIFIED PUBLIC RECORD</span>
                    <span>UPDATED 2024-25</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-space text-institutional-accent font-semibold group/dl cursor-pointer">
                  <span className="truncate max-w-[180px] group-hover/dl:underline">[PDF Download Placeholder]</span>
                  <Download className="w-4 h-4 shrink-0 group-hover/dl:translate-y-0.5 transition-transform" />
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
