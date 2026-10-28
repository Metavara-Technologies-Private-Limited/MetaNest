import { apiRequest } from './apiClient';

export interface AdminNotification {
  id: number | string;
  title: string;
  message: string;
  notification_type: string;
  is_read: boolean;
  created_at: string;
}

export interface NotificationListResponse {
  unread_count: number;
  results: AdminNotification[];
}

export interface NotificationSettings {
  id?: number;
  sms_notifications: boolean;
  email_notifications: boolean;
  whatsapp_notifications: boolean;
  payment_reminders: boolean;
  overdue_alerts: boolean;
}

export interface SocietySettings {
  id?: number;
  name: string;
  registration_no: string;
  address: string;
  city: string;
  state: string;
  pin_code: string;
  phone: string;
  email: string;
}

export interface BankSettings {
  id?: number;
  bank_name: string;
  account_number: string;
  ifsc_code: string;
  account_type: string;
  is_primary?: boolean;
}

export interface BillingSettings {
  id?: number;
  receipt_prefix: string;
  starting_no: number;
  bill_prefix: string;
  financial_year: string;
}

const ADMIN_PATH = '/admin/users';

export function listAdminNotifications(): Promise<NotificationListResponse> {
  return apiRequest<NotificationListResponse>(`${ADMIN_PATH}/notifications/`);
}

export function markAllAdminNotificationsRead(): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`${ADMIN_PATH}/notifications/mark-all-read/`, { method: 'POST' });
}

export function getNotificationSettings(): Promise<NotificationSettings> {
  return apiRequest<NotificationSettings>(`${ADMIN_PATH}/notification-settings/`);
}

export function updateNotificationSettings(settings: NotificationSettings): Promise<NotificationSettings> {
  return apiRequest<NotificationSettings>(`${ADMIN_PATH}/notification-settings/`, {
    method: 'PUT',
    body: JSON.stringify(settings),
  });
}

export function getSocietySettings(): Promise<SocietySettings> {
  return apiRequest<SocietySettings>(`${ADMIN_PATH}/society/`);
}

export function updateSocietySettings(settings: SocietySettings): Promise<SocietySettings> {
  return apiRequest<SocietySettings>(`${ADMIN_PATH}/society/`, { method: 'PUT', body: JSON.stringify(settings) });
}

export function getBankSettings(): Promise<BankSettings> {
  return apiRequest<BankSettings>(`${ADMIN_PATH}/bank-account/`);
}

export function updateBankSettings(settings: BankSettings): Promise<BankSettings> {
  return apiRequest<BankSettings>(`${ADMIN_PATH}/bank-account/`, { method: 'PUT', body: JSON.stringify(settings) });
}

export function getBillingSettings(): Promise<BillingSettings> {
  return apiRequest<BillingSettings>(`${ADMIN_PATH}/billing/`);
}

export function updateBillingSettings(settings: BillingSettings): Promise<BillingSettings> {
  return apiRequest<BillingSettings>(`${ADMIN_PATH}/billing/`, { method: 'PUT', body: JSON.stringify(settings) });
}
