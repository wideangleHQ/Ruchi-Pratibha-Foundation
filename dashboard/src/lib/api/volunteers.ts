import { apiClient } from '../api-client';

export interface VolunteerListItem {
  id: string;
  volunteerCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  volunteerStatus: string;
  occupation: string | null;
  organization: string | null;
  skills: string[];
  createdAt: string;
}

export interface VolunteerDetail extends VolunteerListItem {
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  addressLine1: string;
  addressLine2: string | null;
  pincode: string;
  country: string;
  profilePhotoUrl: string | null;
  emergencyName: string | null;
  emergencyPhone: string | null;
  motivation: string | null;
  languages: string[];
  availableDays: string[];
  status: string;
  identities?: Array<{
    id: string;
    documentType: string;
    documentNumber: string;
    verificationStatus: string;
    createdAt: string;
  }>;
}

export interface DashboardStats {
  volunteers: {
    total: number;
    pending: number;
    verified: number;
    rejected: number;
    thisMonth: number;
  };
  applications: {
    total: number;
    submitted: number;
    underReview: number;
    approved: number;
    rejected: number;
  };
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function getVolunteers(params: {
  page?: number;
  pageSize?: number;
  search?: string;
  volunteerStatus?: string;
  sortBy?: string;
  sortOrder?: string;
}): Promise<PaginatedResponse<VolunteerListItem>> {
  const { data } = await apiClient.get<PaginatedResponse<VolunteerListItem>>('/admin/volunteers', { params });
  return data;
}

export async function getVolunteerById(id: string): Promise<ApiResponse<VolunteerDetail>> {
  const { data } = await apiClient.get<ApiResponse<VolunteerDetail>>(`/admin/volunteers/${id}`);
  return data;
}

export async function verifyVolunteer(id: string): Promise<ApiResponse<VolunteerListItem>> {
  const { data } = await apiClient.patch<ApiResponse<VolunteerListItem>>(`/admin/volunteers/${id}/verify`);
  return data;
}

export async function rejectVolunteer(id: string): Promise<ApiResponse<VolunteerListItem>> {
  const { data } = await apiClient.patch<ApiResponse<VolunteerListItem>>(`/admin/volunteers/${id}/reject`);
  return data;
}

export async function getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
  const { data } = await apiClient.get<ApiResponse<DashboardStats>>('/admin/volunteers/stats');
  return data;
}
