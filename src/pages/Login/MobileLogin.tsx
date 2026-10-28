import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoginDialog from '../../components/LoginDialog';
import MobileNumberInput from '../../components/MobileNumberInput';
import { sendOTP } from '../../api/authApi';
import type { UserRole } from '../../types/auth';

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function MobileLogin() {
  const navigate = useNavigate();
  const { role } = useParams<{ role: UserRole }>();
  const [mobileNumber, setMobileNumber] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const isValid = mobileNumber.length === 10;

  const handleContinue = async () => {
    if (!isValid || sending) return;
    setSending(true);
    setError('');
    try {
      const response = await sendOTP(mobileNumber, role as UserRole);
      navigate(`/login/${role}/otp`, { state: { mobileNumber, developmentOtp: response.otp } });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to send OTP.');
    } finally {
      setSending(false);
    }
  };

  return (
    <LoginDialog onBack={() => navigate('/login')}>
      <Stack spacing={0.5} sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Welcome {capitalize(role ?? '')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Login to continue
        </Typography>
      </Stack>

      <Stack spacing={0.75} sx={{ mb: 3 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>Mobile Number</Typography>
        <MobileNumberInput value={mobileNumber} onChange={setMobileNumber} autoFocus />
      </Stack>

      {error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null}

      <Button
        fullWidth
        size="large"
        variant="contained"
        disabled={!isValid || sending}
        onClick={handleContinue}
        startIcon={<PhoneAndroidIcon />}
        sx={{ py: 1.4, fontSize: '1rem' }}
      >
        Continue
      </Button>

      <Stack direction="row" spacing={0.5} sx={{ mt: 2, justifyContent: 'center', alignItems: 'center' }}>
        <LockOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
        <Typography variant="caption" color="text.secondary">
          We will send you an OTP to verify your number
        </Typography>
      </Stack>
    </LoginDialog>
  );
}

export default MobileLogin;
