import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HomeIcon from '@mui/icons-material/Home';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { MOCK_FLATS } from '../AdminDashboard/mockData';

function SelectFlat() {
  const navigate = useNavigate();
  const [flatId, setFlatId] = useState('');

  const handleContinue = () => {
    if (!flatId) return;
    const flat = MOCK_FLATS.find((candidate) => candidate.id === flatId);
    navigate('/resident', { state: { flat } });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 6 }}>
      <Box sx={{ maxWidth: 1600, mx: 'auto', px: { xs: 2, sm: 4, md: 6 }, pt: 4 }}>
        <Stack direction="row" spacing={1.5} sx={{ mb: 3, alignItems: 'flex-start' }}>
          <IconButton onClick={() => navigate('/login')} sx={{ mt: 0.5 }} aria-label="Back">
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Epsilon Homes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Resident Portal
            </Typography>
          </Box>
        </Stack>

        <Paper
          variant="outlined"
          sx={{ borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', p: 3, mb: 3 }}
        >
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 2.5 }}>
            <HomeIcon color="primary" />
            <Box>
              <Typography sx={{ fontWeight: 800 }}>Select Your Flat</Typography>
              <Typography variant="body2" color="text.secondary">
                Choose your flat to continue
              </Typography>
            </Box>
          </Stack>

          <TextField
            select
            fullWidth
            value={flatId}
            onChange={(event) => setFlatId(event.target.value)}
            slotProps={{ select: { displayEmpty: true } }}
            sx={{ mb: 2.5 }}
          >
            <MenuItem value="" disabled>
              Choose your flat
            </MenuItem>
            {MOCK_FLATS.map((flat) => (
              <MenuItem key={flat.id} value={flat.id}>
                {flat.flatNo} - {flat.residentName} ({flat.residentType})
              </MenuItem>
            ))}
          </TextField>

          <Button
            fullWidth
            size="large"
            variant="contained"
            disabled={!flatId}
            onClick={handleContinue}
            endIcon={<ArrowForwardIcon />}
            sx={{ py: 1.4 }}
          >
            Continue
          </Button>
        </Paper>

        <Alert severity="info">
          <strong>Note:</strong> In a real application, you would log in with your credentials. This is a demo
          version where you can select any flat.
        </Alert>
      </Box>
    </Box>
  );
}

export default SelectFlat;
