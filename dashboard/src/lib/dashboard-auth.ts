import { apiClient } from './api-client';

interface AccessResponse {
  success: boolean;
  authenticated: boolean;
  message: string;
}

interface VerifyResponse {
  success: boolean;
  data: {
    success: boolean;
    authenticated: boolean;
  };
}

interface LogoutResponse {
  success: boolean;
  message: string;
}

export async function dashboardAccess(accessCode: string): Promise<AccessResponse> {
  const { data } = await apiClient.post<AccessResponse>('/dashboard/access', {
    accessCode,
  });
  return data;
}

export async function dashboardVerify(): Promise<boolean> {
  try {
    const { data } = await apiClient.get<VerifyResponse>('/dashboard/verify');
    return data?.success === true || data?.data?.authenticated === true;
  } catch {
    return false;
  }
}

export async function dashboardLogout(): Promise<LogoutResponse> {
  const { data } = await apiClient.post<LogoutResponse>('/dashboard/logout');
  return data;
}
