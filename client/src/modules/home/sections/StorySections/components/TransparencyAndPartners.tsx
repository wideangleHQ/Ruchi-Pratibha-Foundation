'use client';

import { Download, FileText } from 'lucide-react';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

export const TransparencyAndPartners: React.FC = () => {
  const reports = [
    { title: 'Annual Impact Report 2024–25', category: 'Annual Gazette', size: 'PDF • 4.2 MB' },
    { title: 'Statutory Financial Audit Report', category: 'Governance & Audits', size: 'PDF • 2.8 MB' },
    { title: '80G & 12A Tax Exemption Certificate', category: 'Compliance', size: 'PDF • 1.5 MB' },
    { title: 'FCRA Registration Charter', category: 'Charitable Charter', size: 'PDF • 1.9 MB' },
  ];

  const partnerTypes = [
    { name: 'Government Bodies', desc: 'State & National Welfare Alliances' },
    { name: 'Educational Institutions', desc: 'Universities & Rural Schools' },
    { name: 'Corporate Partners', desc: 'CSR Initiatives & Coalitions' },
    { name: 'Grassroots NGOs', desc: 'Community Implementation Networks' },
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
            {partnerTypes.map((partner) => (
              <InteractiveCard
                key={partner.name}
                  className="bg-white dark:bg-institutional-surface/40 border border-institutional-dark/10 dark:border-white/10 rounded-sm p-6 text-center hover:border-institutional-accent transition-all duration-500"
                >
                  <span className="text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold border-b border-institutional-accent/20 pb-2 mb-3 block">
                    PARTNERSHIP NETWORK
                  </span>
                  <h4 className="font-cormorant text-xl font-bold text-institutional-dark dark:text-white mb-1 group-hover:text-institutional-accent transition-colors duration-300">
                    {partner.name}
                  </h4>
                  <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-400">
                    {partner.desc}
                  </p>
                </InteractiveCard>
            ))}
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
              <InteractiveCard
                key={report.title}
                className="flex flex-col justify-between bg-white dark:bg-institutional-surface/40 border border-institutional-dark/10 dark:border-white/10 rounded-sm p-6 sm:p-7 hover:border-institutional-accent transition-all duration-500"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-space text-institutional-accent uppercase font-semibold">
                      {report.category}
                    </span>
                    <FileText className="w-4 h-4 text-institutional-accent/70" />
                  </div>

                  <h4 className="font-cormorant text-xl font-bold text-institutional-dark dark:text-white mb-2 group-hover:text-institutional-accent transition-colors duration-300">
                    {report.title}
                  </h4>
                </div>

                <div className="pt-4 mt-6 border-t border-institutional-dark/5 dark:border-white/5 flex items-center justify-between">
                  <span className="font-space text-[10px] text-institutional-mutedLight dark:text-gray-400">
                    {report.size}
                  </span>
                  <a
                    href="/publications"
                    aria-label={`Download ${report.title}`}
                    className="inline-flex items-center gap-1 text-xs font-space text-institutional-accent hover:text-institutional-dark dark:hover:text-white font-semibold transition-colors duration-300"
                  >
                    <span>Download</span>
                    <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform duration-300" />
                  </a>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
