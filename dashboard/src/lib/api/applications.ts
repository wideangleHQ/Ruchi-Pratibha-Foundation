import { apiClient } from '../api-client';
import type { PaginatedResponse, ApiResponse } from './volunteers';

export interface ApplicationListItem {
  id: string;
  applicationCode: string;
  volunteerId: string;
  editionId: string;
  applicationStatus: string;
  motivation: string | null;
  relevantExperience: string | null;
  skills: string[];
  languages: string[];
  emergencyContactName: string;
  emergencyContactPhone: string;
  expectedHours: number | null;
  termsAccepted: boolean;
  adminRemarks: string | null;
  submittedAt: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
  volunteerName?: string;
  volunteerEmail?: string;
  volunteerCode?: string;
  volunteerStatus?: string;
  volunteerCity?: string;
  volunteerState?: string;
  editionName?: string;
  eventTitle?: string;
  editionYear?: number;
}

export async function getApplications(params: {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  editionId?: string;
  sortBy?: string;
  sortOrder?: string;
}): Promise<PaginatedResponse<ApplicationListItem>> {
  const { data } = await apiClient.get<PaginatedResponse<ApplicationListItem>>('/admin/applications', { params });
  return data;
}

export async function getApplicationByCode(code: string): Promise<ApiResponse<ApplicationListItem>> {
  const { data } = await apiClient.get<ApiResponse<ApplicationListItem>>(`/admin/applications/${code}`);
  return data;
}

export async function reviewApplication(code: string, adminRemarks?: string): Promise<ApiResponse<ApplicationListItem>> {
  const { data } = await apiClient.patch<ApiResponse<ApplicationListItem>>(`/admin/applications/${code}/review`, { adminRemarks });
  return data;
}

export async function approveApplication(code: string, adminRemarks?: string): Promise<ApiResponse<ApplicationListItem>> {
  const { data } = await apiClient.patch<ApiResponse<ApplicationListItem>>(`/admin/applications/${code}/approve`, { adminRemarks });
  return data;
}

export async function rejectApplication(code: string, adminRemarks?: string): Promise<ApiResponse<ApplicationListItem>> {
  const { data } = await apiClient.patch<ApiResponse<ApplicationListItem>>(`/admin/applications/${code}/reject`, { adminRemarks });
  return data;
}

export async function waitlistApplication(code: string, adminRemarks?: string): Promise<ApiResponse<ApplicationListItem>> {
  const { data } = await apiClient.patch<ApiResponse<ApplicationListItem>>(`/admin/applications/${code}/waitlist`, { adminRemarks });
  return data;
}
