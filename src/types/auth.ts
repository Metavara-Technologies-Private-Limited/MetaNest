export type UserRole = 'admin' | 'resident';

export interface RoleOption {
  role: UserRole;
  title: string;
  description: string;
}

export interface SendOtpResponse {
  success: boolean;
  mobileNumber: string;
  /** Demo-only: a real backend would deliver this via SMS, never return it. */
  otp: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  role: UserRole;
}
