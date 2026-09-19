import { apiRequestWithFallback } from './apiClient';

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

export interface AdminDashboardSummary {
  total_flats: number;
  occupied_flats: number;
  occupancy_rate: number;
  monthly_collection: Array<{ month: string; value: number; outstanding?: number }>;
  outstanding_amount: number;
  collected_amount: number;
  pending_amount: number;
  wing_summary: Array<{ wing: string; occupied: number; total: number; percentage: number }>;
}

type AdminDashboardSummaryPayload = Partial<AdminDashboardSummary> & Record<string, unknown>;

function findNestedSummary(payload: Record<string, unknown>): Record<string, unknown> | null {
  const source = payload as Record<string, unknown> & {
    data?: Record<string, unknown>;
    results?: Record<string, unknown>;
    summary?: Record<string, unknown>;
    dashboard?: Record<string, unknown>;
    analytics?: Record<string, unknown>;
    stats?: Record<string, unknown>;
  };

  const candidates: unknown[] = [
    payload,
    source.data,
    source.results,
    source.summary,
    source.dashboard,
    source.analytics,
    source.stats,
    source.data?.dashboard,
    source.data?.analytics,
    source.data?.summary,
    source.results?.dashboard,
    source.results?.analytics,
    source.summary?.data,
  ];

  for (const candidate of candidates) {
    if (candidate && typeof candidate === 'object') {
      return candidate as Record<string, unknown>;
    }
  }

  return null;
}

const ADMIN_PATHS = [
  import.meta.env.VITE_ADMIN_API_BASE_PATH ?? '/admin',
  '/admin',
  '/admin/users',
].filter(Boolean).map((path) => path.replace(/\/+$/, ''));

function buildAdminCandidates(endpoint: string, method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'): string[] {
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const candidates = ADMIN_PATHS.flatMap((base) => [
    `${base}${normalizedEndpoint}`,
  ]);

  return Array.from(new Set(candidates));
}

export function listAdminNotifications(): Promise<NotificationListResponse> {
  return apiRequestWithFallback<NotificationListResponse>(buildAdminCandidates('/notifications/'));
}

export function markAllAdminNotificationsRead(): Promise<{ message: string }> {
  return apiRequestWithFallback<{ message: string }>(buildAdminCandidates('/notifications/mark-all-read/'), {
    method: 'POST',
  });
}

export function getNotificationSettings(): Promise<NotificationSettings> {
  return apiRequestWithFallback<NotificationSettings>(buildAdminCandidates('/notification-settings/'));
}

export function updateNotificationSettings(settings: NotificationSettings): Promise<NotificationSettings> {
  return apiRequestWithFallback<NotificationSettings>(buildAdminCandidates('/notification-settings/'), {
    method: 'PUT',
    body: JSON.stringify(settings),
  });
}

export function getSocietySettings(): Promise<SocietySettings> {
  return apiRequestWithFallback<SocietySettings>(buildAdminCandidates('/society/'));
}

export function updateSocietySettings(settings: SocietySettings): Promise<SocietySettings> {
  return apiRequestWithFallback<SocietySettings>(buildAdminCandidates('/society/'), {
    method: 'PUT',
    body: JSON.stringify(settings),
  });
}

export function getBankSettings(): Promise<BankSettings> {
  return apiRequestWithFallback<BankSettings>(buildAdminCandidates('/bank-account/'));
}

export function updateBankSettings(settings: BankSettings): Promise<BankSettings> {
  return apiRequestWithFallback<BankSettings>(buildAdminCandidates('/bank-account/'), {
    method: 'PUT',
    body: JSON.stringify(settings),
  });
}

export function getBillingSettings(): Promise<BillingSettings> {
  return apiRequestWithFallback<BillingSettings>(buildAdminCandidates('/billing/'));
}

export function updateBillingSettings(settings: BillingSettings): Promise<BillingSettings> {
  return apiRequestWithFallback<BillingSettings>(buildAdminCandidates('/billing/'), {
    method: 'PUT',
    body: JSON.stringify(settings),
  });
}

export function getAdminDashboardSummary(): Promise<AdminDashboardSummary> {
  const summaryPaths = [
    '/admin/dashboard/',
    '/admin/dashboard/summary/',
    '/admin/dashboard-summary/',
    '/admin/analytics/',
    '/admin/analytics/summary/',
    '/analytics/dashboard/',
    '/analytics/dashboard/summary/',
    '/dashboard/',
    '/dashboard/summary/',
  ];

  return apiRequestWithFallback<AdminDashboardSummaryPayload | { data?: AdminDashboardSummaryPayload; results?: AdminDashboardSummaryPayload; summary?: AdminDashboardSummaryPayload }>([
    ...summaryPaths,
    ...buildAdminCandidates('/dashboard/'),
    ...buildAdminCandidates('/analytics/'),
  ]).then((response) => {
    const apiResponse = (response as Record<string, unknown>) ?? {};
    const topLevelSummary = findNestedSummary(apiResponse) ?? apiResponse;

    const summary = (topLevelSummary.summary && typeof topLevelSummary.summary === 'object'
      ? topLevelSummary.summary as Record<string, unknown>
      : topLevelSummary) as Record<string, unknown>;

    const monthlyCollection = (Array.isArray(apiResponse['monthly_collection'])
      ? apiResponse['monthly_collection']
      : Array.isArray(topLevelSummary['monthly_collection'])
        ? topLevelSummary['monthly_collection']
        : Array.isArray((summary as Record<string, unknown>)['monthly_collection'])
          ? (summary as Record<string, unknown>)['monthly_collection']
          : []) as Array<Record<string, unknown>>;

    const occupancyByWing = (Array.isArray(apiResponse['occupancy_by_wing'])
      ? apiResponse['occupancy_by_wing']
      : Array.isArray(topLevelSummary['occupancy_by_wing'])
        ? topLevelSummary['occupancy_by_wing']
        : Array.isArray((summary as Record<string, unknown>)['occupancy_by_wing'])
          ? (summary as Record<string, unknown>)['occupancy_by_wing']
          : []) as Array<Record<string, unknown>>;

    const totalFlats = Number(summary['total_flats'] ?? summary['totalFlats'] ?? 0);
    const occupiedFlats = Number(summary['occupied_flats'] ?? summary['occupiedFlats'] ?? 0);
    const occupancyRate = Number(summary['occupancy_percentage'] ?? summary['occupancyRate'] ?? summary['occupancy_percentage'] ?? 0);
    const currentMonthCollection = Number(summary['current_month_collection'] ?? summary['collected_amount'] ?? summary['currentMonthCollection'] ?? 0);
    const currentMonthOutstanding = Number(summary['current_month_outstanding'] ?? summary['outstanding_amount'] ?? summary['currentMonthOutstanding'] ?? 0);
    const pendingFlats = Number(summary['pending_flats'] ?? summary['pendingFlats'] ?? 0);

    const normalizedMonthly = monthlyCollection.map((item) => ({
      month: String(item['month'] ?? item['label'] ?? ''),
      value: Number(item['collected'] ?? item['value'] ?? item['amount'] ?? 0),
      outstanding: Number(item['outstanding'] ?? item['outstanding_amount'] ?? 0),
    }));

    const normalizedWings = occupancyByWing.map((item) => {
      const occupied = Number(item['occupied_flats'] ?? item['occupied'] ?? 0);
      const percentage = totalFlats > 0 ? Math.round((occupied / totalFlats) * 100) : 0;
      return {
        wing: String(item['wing'] ?? item['name'] ?? 'Wing'),
        occupied,
        total: totalFlats,
        percentage,
      };
    });

    return {
      total_flats: totalFlats,
      occupied_flats: occupiedFlats,
      occupancy_rate: occupancyRate,
      monthly_collection: normalizedMonthly,
      outstanding_amount: currentMonthOutstanding,
      collected_amount: currentMonthCollection,
      pending_amount: currentMonthOutstanding,
      wing_summary: normalizedWings,
    };
  });
}
