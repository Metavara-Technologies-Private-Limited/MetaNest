import type { SendOtpResponse, UserRole, VerifyOtpResponse } from '../types/auth';

const MOCK_DELAY_MS = 600;
const OTP_LENGTH = 6;

function generateOtp(): string {
  return Array.from({ length: OTP_LENGTH }, () => Math.floor(Math.random() * 10)).join('');
}

export function sendOTP(mobileNumber: string): Promise<SendOtpResponse> {
  const otp = generateOtp();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, mobileNumber, otp });
    }, MOCK_DELAY_MS);
  });
}

export function verifyOTP(
  enteredOtp: string,
  expectedOtp: string,
  role: UserRole,
): Promise<VerifyOtpResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (enteredOtp === expectedOtp) {
        resolve({ success: true, role });
      } else {
        reject(new Error('Invalid OTP'));
      }
    }, MOCK_DELAY_MS);
  });
}
