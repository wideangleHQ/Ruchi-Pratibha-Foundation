'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { VolunteerHero } from './sections/VolunteerHero';
import { WizardProvider, useWizard } from './components/wizard/WizardContext';

const WhyVolunteer = dynamic(() => import('./sections/WhyVolunteer').then((m) => m.WhyVolunteer), {
  loading: () => <div className="py-20 bg-institutional-light dark:bg-institutional-dark min-h-[350px]" />,
});
const VolunteerJourney = dynamic(() => import('./sections/VolunteerJourney').then((m) => m.VolunteerJourney), {
  loading: () => <div className="py-20 bg-institutional-light dark:bg-institutional-dark min-h-[350px]" />,
});
const VolunteerFAQ = dynamic(() => import('./sections/VolunteerFAQ').then((m) => m.VolunteerFAQ), {
  loading: () => <div className="py-20 bg-institutional-light dark:bg-institutional-dark min-h-[300px]" />,
});
const VolunteerCTA = dynamic(() => import('./sections/VolunteerCTA').then((m) => m.VolunteerCTA), {
  loading: () => <div className="py-20 bg-institutional-darker min-h-[250px]" />,
});
const RegistrationWizard = dynamic(() => import('./components/wizard/RegistrationWizard').then((m) => m.RegistrationWizard));

const WizardOpener: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const searchParams = useSearchParams();
  const { setOpportunityId, opportunityId } = useWizard();

  useEffect(() => {
    const idFromUrl = searchParams.get('opportunityId');
    if (idFromUrl && !opportunityId) {
      setOpportunityId(idFromUrl);
    }
  }, [searchParams, setOpportunityId, opportunityId]);

  useEffect(() => {
    if (isOpen && !opportunityId) {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      fetch(`${API_BASE_URL}/v1/opportunities?pageSize=1`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.data?.length > 0) {
            setOpportunityId(data.data[0].id);
          }
        })
        .catch(() => {});
    }
  }, [isOpen, opportunityId, setOpportunityId]);

  return (
    <AnimatePresence>
      {isOpen && <RegistrationWizard onClose={onClose} />}
    </AnimatePresence>
  );
};

export const VolunteerOnboardingPage: React.FC = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  useEffect(() => {
    if (isWizardOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isWizardOpen]);

  const openWizard = () => setIsWizardOpen(true);
  const closeWizard = () => setIsWizardOpen(false);

  return (
    <WizardProvider>
      <main className="flex flex-col min-h-screen bg-institutional-light dark:bg-institutional-dark">
        <VolunteerHero onOpenWizard={openWizard} />
        <WhyVolunteer />
        <VolunteerJourney />
        <VolunteerFAQ />
        <VolunteerCTA onOpenWizard={openWizard} />
        <WizardOpener isOpen={isWizardOpen} onClose={closeWizard} />
      </main>
    </WizardProvider>
  );
};
