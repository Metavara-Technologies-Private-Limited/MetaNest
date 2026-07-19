import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoginDialog from '../../components/LoginDialog';
import type { UserRole } from '../../types/auth';

const NAVIGATE_DELAY_MS = 150;

function RoleSelection() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    setTimeout(() => {
      navigate(`/login/${role}/mobile`);
    }, NAVIGATE_DELAY_MS);
  };

  return (
    <LoginDialog onBack={() => navigate('/')} backLabel="Back to Projects">
      <Stack spacing={1.5}>
        <Button
          fullWidth
          size="large"
          startIcon={<ManageAccountsIcon />}
          onClick={() => handleSelectRole('admin')}
          disabled={selectedRole !== null}
          sx={{
            py: 1.5,
            fontSize: '1.02rem',
            bgcolor: '#0f172a',
            color: '#fff',
            '&:hover': { bgcolor: '#1e293b' },
            '&.Mui-disabled': {
              bgcolor: selectedRole === 'admin' ? '#0f172a' : undefined,
              color: selectedRole === 'admin' ? '#fff' : undefined,
              opacity: selectedRole === 'admin' ? 1 : 0.4,
            },
          }}
        >
          Admin
        </Button>

        <Button
          fullWidth
          size="large"
          variant="outlined"
          startIcon={<PeopleAltIcon />}
          onClick={() => handleSelectRole('resident')}
          disabled={selectedRole !== null}
          sx={{
            py: 1.5,
            fontSize: '1.02rem',
            borderColor: '#0f172a',
            color: '#0f172a',
            '&:hover': { borderColor: '#0f172a', bgcolor: 'rgba(15, 23, 42, 0.04)' },
            '&.Mui-disabled': {
              borderColor: selectedRole === 'resident' ? '#0f172a' : undefined,
              color: selectedRole === 'resident' ? '#0f172a' : undefined,
              opacity: selectedRole === 'resident' ? 1 : 0.4,
            },
          }}
        >
          Resident
        </Button>
      </Stack>

      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2.5 }}>
        Choose your role to continue
      </Typography>
    </LoginDialog>
  );
}

export default RoleSelection;
