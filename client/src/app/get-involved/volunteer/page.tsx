import { Metadata } from 'next';
import { Suspense } from 'react';
import { VolunteerOnboardingPage } from '@/modules/volunteer/VolunteerOnboardingPage';

export const metadata: Metadata = {
  title: 'Become a Volunteer | Ruchi Prativa Foundation',
  description: 'Join a growing community of individuals committed to creating lasting impact.',
};

export default function VolunteerPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VolunteerOnboardingPage />
    </Suspense>
  );
}
