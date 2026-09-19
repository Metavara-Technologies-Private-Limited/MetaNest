import { apiRequestWithFallback } from './apiClient';

export type AdminRole = 'ADMIN' | 'SUPER_ADMIN' | 'TREASURER' | 'SECURITY' | 'RESIDENT';

export interface AdminUser {
  id: number | string;
  first_name?: string;
  last_name?: string;
  name?: string;
  email: string;
  phone_number?: string;
  phone?: string;
  role: string;
  is_active?: boolean;
  status?: string;
  last_login?: string | null;
}

export interface CreateAdminUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: AdminRole;
}

const USERS_PATHS = [
  import.meta.env.VITE_ADMIN_USERS_API_PATH ?? '/admin/users/',
  '/admin/users/',
  '/admin/users',
].filter(Boolean).map((path) => path.replace(/\/+$/, '/'));

function requireUsersPath() {
  if (!USERS_PATHS.length) {
    throw new Error('Users & Roles API is not available on the configured backend.');
  }
  return USERS_PATHS;
}

function unwrapUsers(response: AdminUser[] | { data?: AdminUser[]; results?: AdminUser[]; users?: AdminUser[] }): AdminUser[] {
  if (Array.isArray(response)) return response;
  return response.data ?? response.results ?? response.users ?? [];
}

export async function listAdminUsers(): Promise<AdminUser[]> {
  const response = await apiRequestWithFallback<AdminUser[] | { data?: AdminUser[]; results?: AdminUser[]; users?: AdminUser[] }>(
    requireUsersPath(),
  );
  return unwrapUsers(response);
}

export function createAdminUser(payload: CreateAdminUserPayload): Promise<AdminUser> {
  return apiRequestWithFallback<AdminUser>(
    requireUsersPath().map((base) => `${base}`),
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );
}

export function updateAdminUser(id: number | string, payload: Partial<CreateAdminUserPayload>): Promise<AdminUser> {
  return apiRequestWithFallback<AdminUser>(
    requireUsersPath().map((base) => `${base}${id}/`),
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    },
  );
}

export function deleteAdminUser(id: number | string): Promise<void> {
  return apiRequestWithFallback<void>(requireUsersPath().map((base) => `${base}${id}/`), { method: 'DELETE' });
}

export function toggleAdminUserStatus(id: number | string): Promise<AdminUser> {
  return apiRequestWithFallback<AdminUser>(requireUsersPath().map((base) => `${base}${id}/toggle-status/`), {
    method: 'PATCH',
  });
}
