import { apiRequest } from './apiClient';

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

const STAFF_PATH = '/people/security-staff/';

export async function listSecurityStaff(): Promise<SecurityStaffRecord[]> {
  const response = await apiRequest<SecurityStaffRecord[] | { results: SecurityStaffRecord[] }>(STAFF_PATH);
  return Array.isArray(response) ? response : response.results;
}

export function createSecurityStaff(payload: SecurityStaffPayload): Promise<SecurityStaffRecord> {
  return apiRequest<SecurityStaffRecord>(STAFF_PATH, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateSecurityStaff(id: number, payload: SecurityStaffPayload): Promise<SecurityStaffRecord> {
  return apiRequest<SecurityStaffRecord>(`${STAFF_PATH}${id}/`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteSecurityStaff(id: number): Promise<void> {
  return apiRequest<void>(`${STAFF_PATH}${id}/`, { method: 'DELETE' });
}
