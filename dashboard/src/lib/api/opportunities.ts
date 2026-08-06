import { apiClient } from '../api-client';
import type { PaginatedResponse, ApiResponse } from './volunteers';

export interface OpportunityListItem {
  id: string;
  opportunityCode: string;
  slug: string;
  title: string;
  opportunityType: string;
  opportunityStatus: string;
  shortDescription: string;
  district: string | null;
  state: string | null;
  mode: string;
  registrationCloses: string | null;
  volunteersRequired: number;
  maxApplications: number;
  isFeatured: boolean;
  acceptRegistrations: boolean;
  createdAt: string;
  eventTitle?: string;
}

export interface OpportunityDetail extends OpportunityListItem {
  eventId: string | null;
  editionId: string | null;
  detailedDescription: string | null;
  featuredImageKey: string | null;
  bannerImageKey: string | null;
  registrationOpens: string | null;
  eventStartDate: string | null;
  eventEndDate: string | null;
  reportingTime: string | null;
  closingTime: string | null;
  timeZone: string;
  venue: string | null;
  address: string | null;
  landmark: string | null;
  pincode: string | null;
  googleMapsUrl: string | null;
  meetingLink: string | null;
  platform: string | null;
  minAge: number | null;
  maxAge: number | null;
  genderRestriction: string;
  experienceRequired: boolean;
  requiredSkills: string[];
  physicalRequirements: string | null;
  coordinatorName: string | null;
  coordinatorDesignation: string | null;
  coordinatorEmail: string | null;
  coordinatorMobile: string | null;
  coordinatorAltMobile: string | null;
  formConfig: Record<string, boolean> | null;
  requiredDocuments: string[];
  galleryImageKeys: string[];
  brochureKey: string | null;
  supportingDocKeys: string[];
  showOnHomepage: boolean;
  showOnCsrPage: boolean;
  showCountdown: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  ogImageKey: string | null;
  workflowType: string;
  notifyRegistration: boolean;
  notifyApproval: boolean;
  notifyRejection: boolean;
  notifyReminder: boolean;
  adminNotes: string | null;
  updatedAt: string;
}

export interface OpportunityStats {
  applications: { status: string; count: number }[];
  total: number;
}

export async function getOpportunities(params: {
  page?: number;
  pageSize?: number;
  search?: string;
  opportunityStatus?: string;
  opportunityType?: string;
  sortBy?: string;
  sortOrder?: string;
}): Promise<PaginatedResponse<OpportunityListItem>> {
  const { data } = await apiClient.get<PaginatedResponse<OpportunityListItem>>('/admin/csr-opportunities', { params });
  return data;
}

export async function getArchivedOpportunities(params: {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}): Promise<PaginatedResponse<OpportunityListItem>> {
  const { data } = await apiClient.get<PaginatedResponse<OpportunityListItem>>('/admin/csr-opportunities/archived', { params });
  return data;
}

export async function getOpportunityById(id: string): Promise<ApiResponse<OpportunityDetail>> {
  const { data } = await apiClient.get<ApiResponse<OpportunityDetail>>(`/admin/csr-opportunities/${id}`);
  return data;
}

export async function getOpportunityStats(id: string): Promise<ApiResponse<OpportunityStats>> {
  const { data } = await apiClient.get<ApiResponse<OpportunityStats>>(`/admin/csr-opportunities/${id}/stats`);
  return data;
}

export async function createOpportunity(payload: Partial<OpportunityDetail>): Promise<ApiResponse<OpportunityDetail>> {
  const { data } = await apiClient.post<ApiResponse<OpportunityDetail>>('/admin/csr-opportunities', payload);
  return data;
}

export async function updateOpportunity(id: string, payload: Partial<OpportunityDetail>): Promise<ApiResponse<OpportunityDetail>> {
  const { data } = await apiClient.patch<ApiResponse<OpportunityDetail>>(`/admin/csr-opportunities/${id}`, payload);
  return data;
}

export async function publishOpportunity(id: string): Promise<ApiResponse<OpportunityDetail>> {
  const { data } = await apiClient.patch<ApiResponse<OpportunityDetail>>(`/admin/csr-opportunities/${id}/publish`);
  return data;
}

export async function archiveOpportunity(id: string): Promise<ApiResponse<OpportunityDetail>> {
  const { data } = await apiClient.patch<ApiResponse<OpportunityDetail>>(`/admin/csr-opportunities/${id}/archive`);
  return data;
}

export async function deleteOpportunity(id: string): Promise<ApiResponse<{ id: string }>> {
  const { data } = await apiClient.delete<ApiResponse<{ id: string }>>(`/admin/csr-opportunities/${id}`);
  return data;
}

export async function duplicateOpportunity(id: string): Promise<ApiResponse<OpportunityDetail>> {
  const { data } = await apiClient.post<ApiResponse<OpportunityDetail>>(`/admin/csr-opportunities/${id}/duplicate`);
  return data;
}

export async function bulkPublish(ids: string[]): Promise<ApiResponse<{ count: number }>> {
  const { data } = await apiClient.post<ApiResponse<{ count: number }>>('/admin/csr-opportunities/bulk/publish', { ids });
  return data;
}

export async function bulkArchive(ids: string[]): Promise<ApiResponse<{ count: number }>> {
  const { data } = await apiClient.post<ApiResponse<{ count: number }>>('/admin/csr-opportunities/bulk/archive', { ids });
  return data;
}

export async function bulkDelete(ids: string[]): Promise<ApiResponse<{ count: number }>> {
  const { data } = await apiClient.post<ApiResponse<{ count: number }>>('/admin/csr-opportunities/bulk/delete', { ids });
  return data;
}
