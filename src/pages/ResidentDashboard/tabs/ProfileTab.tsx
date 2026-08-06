import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PersonIcon from '@mui/icons-material/Person';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { MockFlat } from '../../AdminDashboard/mockData';

const OCCUPANCY_OPTIONS = ['Owner Occupied', 'Tenant Occupied', 'Vacant'] as const;

interface ProfileTabProps {
  flat: MockFlat | undefined;
}

function ProfileTab({ flat }: ProfileTabProps) {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [name, setName] = useState(flat?.residentName ?? '');
  const [contact, setContact] = useState(flat?.contact ?? '');
  const [occupancy, setOccupancy] = useState<(typeof OCCUPANCY_OPTIONS)[number]>(
    flat?.residentType === 'Tenant' ? 'Tenant Occupied' : 'Owner Occupied',
  );
  const [message, setMessage] = useState('');

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhotoUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = () => setMessage('Profile updated.');

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          My Profile
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage your profile information
        </Typography>
      </Box>

      <Stack spacing={1} sx={{ alignItems: 'center' }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <ButtonBase
              onClick={() => fileInputRef.current?.click()}
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                color: '#fff',
                display: 'grid',
                placeItems: 'center',
              }}
              aria-label="Upload photo"
            >
              <PhotoCameraIcon sx={{ fontSize: 16 }} />
            </ButtonBase>
          }
        >
          <Avatar src={photoUrl ?? undefined} sx={{ width: 96, height: 96, bgcolor: '#e2e8f0' }}>
            <PersonIcon sx={{ fontSize: 48, color: '#94a3b8' }} />
          </Avatar>
        </Badge>
        <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handlePhotoChange} />
        <Typography variant="body2" color="primary.main">
          Click the camera icon to upload your photo
        </Typography>
      </Stack>

      <Paper variant="outlined" sx={{ borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', p: 3 }}>
        <Stack spacing={2.5}>
          <TextField fullWidth label="Name" value={name} onChange={(event) => setName(event.target.value)} />
          <TextField fullWidth label="Flat Number" value={flat?.flatNo.replace('Flat ', '') ?? ''} disabled />
          <TextField
            fullWidth
            label="Contact"
            value={contact}
            onChange={(event) => setContact(event.target.value.replace(/\D/g, '').slice(0, 10))}
          />
          <TextField
            select
            fullWidth
            label="Occupancy Status"
            value={occupancy}
            onChange={(event) => setOccupancy(event.target.value as (typeof OCCUPANCY_OPTIONS)[number])}
          >
            {OCCUPANCY_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <Button
            fullWidth
            size="large"
            variant="contained"
            onClick={handleSave}
            sx={{ py: 1.3, bgcolor: '#0f172a', '&:hover': { bgcolor: '#1e293b' } }}
          >
            Save Changes
          </Button>
        </Stack>
      </Paper>

      <Button
        variant="outlined"
        startIcon={<LogoutIcon />}
        onClick={() => navigate('/login', { replace: true })}
        sx={{ alignSelf: 'flex-start' }}
      >
        Logout
      </Button>

      <Snackbar
        open={Boolean(message)}
        autoHideDuration={3000}
        onClose={() => setMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setMessage('')}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default ProfileTab;
