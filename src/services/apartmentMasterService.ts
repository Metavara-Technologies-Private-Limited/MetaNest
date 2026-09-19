import { apiRequest } from './apiClient';
import type {
  Flat,
  FlatType,
  Floor,
  PaginatedResponse,
  Society,
  SocietySummary,
  Wing,
} from '../types/apartmentMaster';

const BASE = '/apartment-master';

function apartmentMasterError(error: unknown): Error {
  const message = error instanceof Error ? error.message : String(error ?? '');
  if (message.includes('404') || message.includes('Not Found')) {
    return new Error('Apartment master backend is not available for this module.');
  }
  return error instanceof Error ? error : new Error(message || 'Apartment master backend request failed.');
}

/**
 * DRF list endpoints may or may not be paginated depending on backend settings.
 * This normalizes either shape (plain array, or { results: [...] }) into a plain array.
 */
function unwrapList<T>(response: T[] | PaginatedResponse<T>): T[] {
  return Array.isArray(response) ? response : response.results;
}

// ---- Society ----
// MVP manages exactly one Society, so getSociety() just returns the first record.

export async function getSociety(): Promise<Society | null> {
  try {
    const response = await apiRequest<Society[] | PaginatedResponse<Society>>(`${BASE}/societies/`);
    const list = unwrapList(response);
    return list[0] ?? null;
  } catch (error) {
    throw apartmentMasterError(error);
  }
}

export async function getSocietySummary(societyId: number): Promise<SocietySummary> {
  try {
    return await apiRequest<SocietySummary>(`${BASE}/societies/${societyId}/summary/`);
  } catch (error) {
    throw apartmentMasterError(error);
  }
}

export function updateSociety(societyId: number, payload: Partial<Society>): Promise<Society> {
  return apiRequest<Society>(`${BASE}/societies/${societyId}/`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  }).catch((error) => {
    throw apartmentMasterError(error);
  });
}

// ---- Wings ----

export async function getWings(societyId?: number): Promise<Wing[]> {
  try {
    const query = societyId ? `?society=${societyId}` : '';
    const response = await apiRequest<Wing[] | PaginatedResponse<Wing>>(`${BASE}/wings/${query}`);
    return unwrapList(response);
  } catch (error) {
    throw apartmentMasterError(error);
  }
}

export function createWing(payload: { society: number; name: string; code?: string; description?: string }): Promise<Wing> {
  return apiRequest<Wing>(`${BASE}/wings/`, { method: 'POST', body: JSON.stringify(payload) }).catch((error) => {
    throw apartmentMasterError(error);
  });
}

export function updateWing(id: number, payload: Partial<Pick<Wing, 'name' | 'code' | 'description'>>): Promise<Wing> {
  return apiRequest<Wing>(`${BASE}/wings/${id}/`, { method: 'PATCH', body: JSON.stringify(payload) }).catch((error) => {
    throw apartmentMasterError(error);
  });
}

export function deleteWing(id: number): Promise<void> {
  return apiRequest<void>(`${BASE}/wings/${id}/`, { method: 'DELETE' }).catch((error) => {
    throw apartmentMasterError(error);
  });
}

// ---- Floors ----

export async function getFloors(wingId?: number): Promise<Floor[]> {
  try {
    const query = wingId ? `?wing=${wingId}` : '';
    const response = await apiRequest<Floor[] | PaginatedResponse<Floor>>(`${BASE}/floors/${query}`);
    return unwrapList(response);
  } catch (error) {
    throw apartmentMasterError(error);
  }
}

export function createFloor(payload: {
  wing: number;
  floor_number: number;
  name?: string;
}): Promise<Floor> {
  return apiRequest<Floor>(`${BASE}/floors/`, { method: 'POST', body: JSON.stringify(payload) }).catch((error) => {
    throw apartmentMasterError(error);
  });
}

export function updateFloor(
  id: number,
  payload: Partial<Pick<Floor, 'floor_number' | 'name'>>,
): Promise<Floor> {
  return apiRequest<Floor>(`${BASE}/floors/${id}/`, { method: 'PATCH', body: JSON.stringify(payload) }).catch((error) => {
    throw apartmentMasterError(error);
  });
}

export function deleteFloor(id: number): Promise<void> {
  return apiRequest<void>(`${BASE}/floors/${id}/`, { method: 'DELETE' }).catch((error) => {
    throw apartmentMasterError(error);
  });
}

// ---- Flat Types ----

export async function getFlatTypes(): Promise<FlatType[]> {
  try {
    const response = await apiRequest<FlatType[] | PaginatedResponse<FlatType>>(`${BASE}/flat-types/`);
    return unwrapList(response);
  } catch (error) {
    throw apartmentMasterError(error);
  }
}

// ---- Flats ----

export async function getFlats(filters?: {
  floor?: number;
  wing?: number;
  flat_type?: number;
}): Promise<Flat[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.floor) params.set('floor', String(filters.floor));
    if (filters?.wing) params.set('wing', String(filters.wing));
    if (filters?.flat_type) params.set('flat_type', String(filters.flat_type));
    const query = params.toString() ? `?${params.toString()}` : '';

    const response = await apiRequest<Flat[] | PaginatedResponse<Flat>>(`${BASE}/flats/${query}`);
    return unwrapList(response);
  } catch (error) {
    throw apartmentMasterError(error);
  }
}

export function createFlat(payload: {
  floor: number;
  flat_type: number;
  flat_number: string;
  carpet_area_sqft: number;
  built_up_area_sqft?: number;
  facing?: string;
  occupancy_status?: 'occupied' | 'vacant';
}): Promise<Flat> {
  return apiRequest<Flat>(`${BASE}/flats/`, { method: 'POST', body: JSON.stringify(payload) }).catch((error) => {
    throw apartmentMasterError(error);
  });
}

export function updateFlat(id: number, payload: Record<string, unknown>): Promise<Flat> {
  return apiRequest<Flat>(`${BASE}/flats/${id}/`, { method: 'PATCH', body: JSON.stringify(payload) }).catch((error) => {
    throw apartmentMasterError(error);
  });
}

export function deleteFlat(id: number): Promise<void> {
  return apiRequest<void>(`${BASE}/flats/${id}/`, { method: 'DELETE' }).catch((error) => {
    throw apartmentMasterError(error);
  });
}