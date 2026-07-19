import type { ReactNode } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

interface LoginDialogProps {
  onBack?: () => void;
  backLabel?: string;
  children: ReactNode;
}

function LoginDialog({ onBack, backLabel = 'Back', children }: LoginDialogProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 4,
        background:
          'radial-gradient(circle at top, rgba(147, 197, 253, 0.24), transparent 36%), radial-gradient(circle at 85% 15%, rgba(196, 181, 253, 0.24), transparent 26%), linear-gradient(180deg, #fafbff 0%, #eef2ff 100%)',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 420,
          borderRadius: 6,
          p: { xs: 3, sm: 4.5 },
          boxShadow: '0 24px 60px rgba(30, 27, 75, 0.14)',
        }}
      >
        {onBack ? (
          <ButtonBase
            onClick={onBack}
            disableRipple
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'text.secondary',
              fontWeight: 600,
              fontSize: '0.95rem',
              mb: 2,
              borderRadius: 1,
            }}
          >
            <ArrowBackIcon fontSize="small" />
            {backLabel}
          </ButtonBase>
        ) : null}

        <Stack spacing={0.5} sx={{ mb: 3.5, alignItems: 'center' }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 3,
              display: 'grid',
              placeItems: 'center',
              bgcolor: 'primary.light',
              color: 'primary.main',
              mb: 1.5,
            }}
          >
            <ApartmentIcon sx={{ fontSize: 32 }} />
          </Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, color: 'primary.main', letterSpacing: '-0.01em' }}
          >
            Epsilon Homes
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Apartment Management System
          </Typography>
        </Stack>

        {children}
      </Paper>
    </Box>
  );
}

export default LoginDialog;
