'use client';

import React from 'react';
import { Download, FileText, ShieldCheck, Building2, GraduationCap, Landmark } from 'lucide-react';

export const TransparencyAndPartners: React.FC = () => {
  const reports = [
    { title: 'Annual Impact Report 2024–25', category: 'Annual Gazette', size: 'PDF • 4.2 MB' },
    { title: 'Statutory Financial Audit Report', category: 'Governance & Audits', size: 'PDF • 2.8 MB' },
    { title: '80G & 12A Tax Exemption Certificate', category: 'Compliance', size: 'PDF • 1.5 MB' },
    { title: 'FCRA Registration Charter', category: 'Charitable Charter', size: 'PDF • 1.9 MB' },
  ];

  const partnerTypes = [
    { name: 'Government Bodies', icon: Landmark, desc: 'State & National Welfare Alliances' },
    { name: 'Educational Institutions', icon: GraduationCap, desc: 'Universities & Rural Schools' },
    { name: 'Corporate Partners', icon: Building2, desc: 'CSR Initiatives & Coalitions' },
    { name: 'Grassroots NGOs', icon: ShieldCheck, desc: 'Community Implementation Networks' },
  ];

  return (
    <section id="transparency" className="py-20 sm:py-28 bg-institutional-light dark:bg-institutional-dark text-institutional-dark dark:text-institutional-light border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden">
      <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section 1: Partners & Recognition */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="h-[1px] w-8 bg-institutional-accent" />
              <span className="text-xs uppercase tracking-[0.2em] font-space text-institutional-accent font-semibold">
                Strategic Partnerships
              </span>
              <span className="h-[1px] w-8 bg-institutional-accent" />
            </div>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
              Partners in Purpose
            </h2>
            <p className="font-manrope text-sm text-institutional-mutedLight dark:text-gray-300 mt-3">
              Collaborating with government agencies, universities, corporate CSR partners, and grassroots activists.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerTypes.map((partner) => {
              const IconComp = partner.icon;
              return (
                <div
                  key={partner.name}
                  className="group bg-white dark:bg-institutional-surface/40 border border-institutional-dark/10 dark:border-white/10 rounded-sm p-6 text-center hover:border-institutional-accent transition-all duration-300 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-full bg-institutional-accent/10 dark:bg-institutional-accent/15 border border-institutional-accent/30 text-institutional-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                    <IconComp className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h4 className="font-cormorant text-xl font-bold text-institutional-dark dark:text-white mb-1">
                    {partner.name}
                  </h4>
                  <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-400">
                    {partner.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Governance & Download Cards */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="h-[1px] w-8 bg-institutional-accent" />
              <span className="text-xs uppercase tracking-[0.2em] font-space text-institutional-accent font-semibold">
                Accountability
              </span>
              <span className="h-[1px] w-8 bg-institutional-accent" />
            </div>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
              Institutional Governance & Transparency
            </h2>
            <p className="font-manrope text-sm text-institutional-mutedLight dark:text-gray-300 mt-3">
              Download our public financial audits, annual impact reports, and statutory compliance certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reports.map((report) => (
              <div
                key={report.title}
                className="group relative flex flex-col justify-between bg-white dark:bg-institutional-surface/40 border border-institutional-dark/10 dark:border-white/10 rounded-sm p-6 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-institutional-accent transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-space text-institutional-accent uppercase font-semibold">
                      {report.category}
                    </span>
                    <FileText className="w-4 h-4 text-institutional-accent/70" />
                  </div>

                  <h4 className="font-cormorant text-xl font-bold text-institutional-dark dark:text-white mb-2 group-hover:text-institutional-accent transition-colors">
                    {report.title}
                  </h4>
                </div>

                <div className="pt-4 mt-6 border-t border-institutional-dark/5 dark:border-white/5 flex items-center justify-between">
                  <span className="font-space text-[10px] text-institutional-mutedLight dark:text-gray-400">
                    {report.size}
                  </span>
                  <a
                    href="#download"
                    aria-label={`Download ${report.title}`}
                    className="inline-flex items-center gap-1 text-xs font-space text-institutional-accent hover:text-institutional-dark dark:hover:text-white font-semibold transition-colors"
                  >
                    <span>Download</span>
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
