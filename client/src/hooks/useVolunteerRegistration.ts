'use client';

import { useMutation } from '@tanstack/react-query';
import { submitFormData } from '@/services';

export type RegistrationResult = {
  applicationCode: string;
  volunteerCode: string;
  applicationStatus: string;
  opportunityTitle: string;
  opportunitySlug?: string;
  submittedAt: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: RegistrationResult;
};

export type RegistrationPayload = {
  opportunityId: string;
  formData: FormData;
};

export function useVolunteerRegistration() {
  return useMutation<ApiResponse, Error & { status?: number; errorCode?: string }, RegistrationPayload>({
    mutationFn: async ({ opportunityId, formData }) => {
      return submitFormData<ApiResponse>(
        `/v1/opportunities/${opportunityId}/register`,
        formData,
      );
    },
  });
}
