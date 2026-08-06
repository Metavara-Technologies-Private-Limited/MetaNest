import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ScheduleIcon from '@mui/icons-material/Schedule';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoginDialog from '../../components/LoginDialog';
import OTPInput from '../../components/OTPInput';
import { sendOTP, verifyOTP } from '../../api/authApi';
import type { UserRole } from '../../types/auth';

const RESEND_SECONDS = 30;
const OTP_LENGTH = 6;

function OtpVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useParams<{ role: UserRole }>();
  const state = location.state as { mobileNumber?: string; otp?: string } | null;
  const mobileNumber = state?.mobileNumber;

  const [otp, setOtp] = useState('');
  const [expectedOtp, setExpectedOtp] = useState(state?.otp ?? '');
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (!mobileNumber || !role || !expectedOtp) {
      navigate(role ? `/login/${role}/mobile` : '/login', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((seconds) => seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  if (!mobileNumber || !role || !expectedOtp) {
    return null;
  }

  const isValid = otp.length === OTP_LENGTH;

  const handleVerify = async () => {
    if (!isValid || verifying) return;
    setVerifying(true);
    setError('');
    try {
      await verifyOTP(otp, expectedOtp, role);
      const destination = role === 'resident' ? '/resident/select-flat' : `/${role}`;
      navigate(destination, { replace: true });
    } catch {
      setError('Incorrect OTP. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    if (secondsLeft > 0) return;
    setOtp('');
    setError('');
    setSecondsLeft(RESEND_SECONDS);
    const response = await sendOTP(mobileNumber);
    setExpectedOtp(response.otp);
  };

  return (
    <LoginDialog onBack={() => navigate(`/login/${role}/mobile`)}>
      <Stack spacing={0.5} sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Verify OTP
        </Typography>
        <Typography variant="body2" color="text.secondary">
          We have sent a 6-digit OTP to
        </Typography>
        <Typography sx={{ fontWeight: 700, color: 'primary.main' }}>
          +91 {mobileNumber}
        </Typography>
      </Stack>

      <Alert
        severity="info"
        icon={<InfoOutlinedIcon fontSize="small" />}
        sx={{ mb: 2.5, fontSize: '0.85rem' }}
      >
        Demo mode &mdash; no SMS is sent. Your OTP is <strong>{expectedOtp}</strong>.
      </Alert>

      <Stack spacing={2.5} sx={{ alignItems: 'center' }}>
        <OTPInput
          length={OTP_LENGTH}
          value={otp}
          onChange={(value) => {
            setOtp(value);
            setError('');
          }}
        />

        {error ? (
          <Typography variant="body2" color="error" sx={{ fontWeight: 600, mt: -1.5 }}>
            {error}
          </Typography>
        ) : null}

        <Typography variant="body2" color="text.secondary">
          {"Didn't receive OTP? "}
          {secondsLeft > 0 ? (
            <Typography component="span" variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
              Resend OTP ({secondsLeft}s)
            </Typography>
          ) : (
            <Link component="button" type="button" onClick={handleResend} sx={{ fontWeight: 700 }}>
              Resend OTP
            </Link>
          )}
        </Typography>

        <Button
          fullWidth
          size="large"
          variant="contained"
          disabled={!isValid || verifying}
          onClick={handleVerify}
          sx={{ py: 1.4, fontSize: '1rem' }}
        >
          Verify & Login
        </Button>

        <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <ScheduleIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary">
            OTP will expire in 5 minutes
          </Typography>
        </Stack>
      </Stack>
    </LoginDialog>
  );
}

export default OtpVerification;
