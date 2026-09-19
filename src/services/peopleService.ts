import { apiRequestWithFallback } from './apiClient';

export type SecurityStaffStatus = 'Active' | 'On Leave' | 'Inactive';

export interface SecurityStaffRecord {
  id: number;
  name: string;
  role: string;
  shift: string;
  phone: string;
  salary: string | number;
  joining_date: string;
  status: SecurityStaffStatus;
}

export interface SecurityStaffPayload {
  name: string;
  role: string;
  shift: string;
  phone: string;
  salary: number;
  joining_date: string;
  status?: SecurityStaffStatus;
}

const STAFF_PATHS = ['/people/security-staff/', '/people/security-staff', '/people/staff/', '/people/staff'];

export async function listSecurityStaff(): Promise<SecurityStaffRecord[]> {
  const response = await apiRequestWithFallback<SecurityStaffRecord[] | { results: SecurityStaffRecord[] }>(STAFF_PATHS);
  return Array.isArray(response) ? response : response.results ?? [];
}

export function createSecurityStaff(payload: SecurityStaffPayload): Promise<SecurityStaffRecord> {
  return apiRequestWithFallback<SecurityStaffRecord>(STAFF_PATHS, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateSecurityStaff(id: number, payload: SecurityStaffPayload): Promise<SecurityStaffRecord> {
  return apiRequestWithFallback<SecurityStaffRecord>(STAFF_PATHS.map((path) => `${path.replace(/\/+$/, '')}/${id}/`), {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteSecurityStaff(id: number): Promise<void> {
  return apiRequestWithFallback<void>(STAFF_PATHS.map((path) => `${path.replace(/\/+$/, '')}/${id}/`), { method: 'DELETE' });
}

export async function getPeopleSummary(): Promise<{ total_residents: number; total_security_staff: number; active_residents: number; active_staff: number }> {
  const response = await apiRequestWithFallback<{ total_residents?: number; total_security_staff?: number; active_residents?: number; active_staff?: number; data?: any; summary?: any }>([
    '/people/summary/',
    '/people/dashboard/summary/',
    '/people/analytics/summary/',
    '/admin/people/summary/',
  ]);

  const data = response.data ?? response.summary ?? response;

  return {
    total_residents: Number(data.total_residents ?? data.totalResidents ?? 0),
    total_security_staff: Number(data.total_security_staff ?? data.totalSecurityStaff ?? 0),
    active_residents: Number(data.active_residents ?? data.activeResidents ?? 0),
    active_staff: Number(data.active_staff ?? data.activeStaff ?? 0),
  };
}
