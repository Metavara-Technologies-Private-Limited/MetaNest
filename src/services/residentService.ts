import { apiRequest } from './apiClient';
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

const RESIDENTS_PATH = '/people/residents/';

export async function listResidents(): Promise<ResidentRecord[]> {
  const response = await apiRequest<ResidentRecord[] | PaginatedResponse<ResidentRecord>>(RESIDENTS_PATH);
  return Array.isArray(response) ? response : response.results;
}

export function createResident(payload: ResidentPayload): Promise<ResidentRecord> {
  return apiRequest<ResidentRecord>(RESIDENTS_PATH, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateResident(id: number, payload: ResidentPayload): Promise<ResidentRecord> {
  return apiRequest<ResidentRecord>(`${RESIDENTS_PATH}${id}/`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteResident(id: number): Promise<void> {
  return apiRequest<void>(`${RESIDENTS_PATH}${id}/`, { method: 'DELETE' });
}
