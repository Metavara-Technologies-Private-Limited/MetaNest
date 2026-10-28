export type UserRole = 'admin' | 'resident';

export interface AuthUser {
  id: number;
  mobile_number: string;
  first_name: string;
  last_name: string;
  role: string;
}

export interface RoleOption {
  role: UserRole;
  title: string;
  description: string;
}

export interface SendOtpResponse {
  success: boolean;
  mobileNumber: string;
  message: string;
  otp?: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  role: UserRole;
  access: string;
  refresh: string;
  user: AuthUser;
}
