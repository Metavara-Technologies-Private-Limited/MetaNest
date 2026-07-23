import { useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BuildIcon from '@mui/icons-material/Build';
import ForumIcon from '@mui/icons-material/Forum';
import GroupsIcon from '@mui/icons-material/Groups';
import SecurityIcon from '@mui/icons-material/Security';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconSegmentedTabs from '../../../components/IconSegmentedTabs';
import { MOCK_AMENITIES } from '../residentMockData';

const SOCIETY_TABS = [
  { value: 'Amenities', label: 'Amenities', icon: <BuildIcon fontSize="inherit" /> },
  { value: 'Forum', label: 'Forum', icon: <ForumIcon fontSize="inherit" /> },
  { value: 'Guards', label: 'Guards', icon: <SecurityIcon fontSize="inherit" /> },
  { value: 'Committee', label: 'Committee', icon: <GroupsIcon fontSize="inherit" /> },
] as const;
type SocietySubTab = (typeof SOCIETY_TABS)[number]['value'];

function AmenitiesPanel() {
  const [message, setMessage] = useState('');

  return (
    <Stack spacing={2}>
      {MOCK_AMENITIES.map((amenity) => (
        <Paper
          key={amenity.id}
          variant="outlined"
          sx={{ borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', p: 2.5 }}
        >
          <Stack spacing={1.25}>
            <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <Typography sx={{ fontWeight: 800 }}>{amenity.name}</Typography>
              <Chip
                label={amenity.available ? 'Available' : 'Unavailable'}
                size="small"
                variant="outlined"
                color={amenity.available ? 'success' : 'default'}
                sx={{ fontWeight: 700 }}
              />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {amenity.description}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {amenity.hours}
              </Typography>
              {amenity.bookingRequired ? (
                <Chip label="Booking Required" size="small" sx={{ fontWeight: 600 }} />
              ) : null}
            </Stack>
            {amenity.bookingRequired ? (
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setMessage(`Booking request submitted for ${amenity.name}.`)}
              >
                Book Now
              </Button>
            ) : null}
          </Stack>
        </Paper>
      ))}

      <Snackbar
        open={Boolean(message)}
        autoHideDuration={4000}
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

function SocietyTab() {
  const [subTab, setSubTab] = useState<SocietySubTab>('Amenities');

  return (
    <Stack spacing={2.5}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          My Society
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Community information and resources
        </Typography>
      </Box>

      <IconSegmentedTabs options={SOCIETY_TABS} value={subTab} onChange={setSubTab} variant="inline" />

      {subTab === 'Amenities' ? (
        <AmenitiesPanel />
      ) : (
        <Paper
          variant="outlined"
          sx={{ borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', p: 6, textAlign: 'center' }}
        >
          <Typography color="text.secondary">{subTab} is coming soon.</Typography>
        </Paper>
      )}
    </Stack>
  );
}

export default SocietyTab;
