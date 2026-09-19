import { apiRequestWithFallback } from './apiClient';
import type { PaginatedResponse } from '../types/apartmentMaster';

export type ResidentType = 'Owner' | 'Tenant';
export type ResidentStatus = 'Active' | 'Inactive';

export interface ResidentRecord {
  id: number;
  name: string;
  resident_type: ResidentType;
  flat: number;
  flat_number: string;
  phone: string;
  email: string;
  move_in_date: string;
  family_members: number;
  status: ResidentStatus;
}

export interface ResidentPayload {
  name: string;
  resident_type: ResidentType;
  flat: number;
  phone: string;
  email: string;
  move_in_date: string;
  family_members: number;
  status: ResidentStatus;
}

const RESIDENTS_PATHS = ['/people/residents/', '/people/residents', '/people/owners/', '/people/tenants/'];

export async function listResidents(): Promise<ResidentRecord[]> {
  const response = await apiRequestWithFallback<ResidentRecord[] | PaginatedResponse<ResidentRecord>>(RESIDENTS_PATHS);
  return Array.isArray(response) ? response : response.results ?? [];
}

export function createResident(payload: ResidentPayload): Promise<ResidentRecord> {
  return apiRequestWithFallback<ResidentRecord>(RESIDENTS_PATHS, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateResident(id: number, payload: ResidentPayload): Promise<ResidentRecord> {
  return apiRequestWithFallback<ResidentRecord>(RESIDENTS_PATHS.map((path) => `${path.replace(/\/+$/, '')}/${id}/`), {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteResident(id: number): Promise<void> {
  return apiRequestWithFallback<void>(RESIDENTS_PATHS.map((path) => `${path.replace(/\/+$/, '')}/${id}/`), { method: 'DELETE' });
}

export async function getResidentSummary(): Promise<{ total_residents: number; active_residents: number; owner_count: number; tenant_count: number }> {
  const response = await apiRequestWithFallback<{ total_residents?: number; active_residents?: number; owner_count?: number; tenant_count?: number; data?: any; summary?: any }>([
    '/people/residents/summary/',
    '/people/dashboard/summary/',
    '/people/analytics/summary/',
    '/admin/residents/summary/',
  ]);

  const data = response.data ?? response.summary ?? response;
  return {
    total_residents: Number(data.total_residents ?? data.totalResidents ?? 0),
    active_residents: Number(data.active_residents ?? data.activeResidents ?? 0),
    owner_count: Number(data.owner_count ?? data.ownerCount ?? 0),
    tenant_count: Number(data.tenant_count ?? data.tenantCount ?? 0),
  };
}
