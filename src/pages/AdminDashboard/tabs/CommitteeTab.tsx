import type { ReactNode } from 'react';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BoltIcon from '@mui/icons-material/Bolt';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ElevatorIcon from '@mui/icons-material/Elevator';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShieldIcon from '@mui/icons-material/Shield';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SegmentedTabs from '../../../components/SegmentedTabs';
import { MOCK_AMC_SERVICES, type AmcIconKey } from '../mockData';

const COMMITTEE_TABS = ['Visitor Management', 'AMC Alerts'] as const;
type CommitteeSubTab = (typeof COMMITTEE_TABS)[number];

const AMC_ICONS: Record<AmcIconKey, { icon: ReactNode; bg: string }> = {
  generator: { icon: <BoltIcon sx={{ color: '#ea580c' }} />, bg: '#ffedd5' },
  elevator: { icon: <ElevatorIcon sx={{ color: 'primary.main' }} />, bg: '#ede9fe' },
  water: { icon: <WaterDropIcon sx={{ color: '#0ea5e9' }} />, bg: '#e0f2fe' },
};

function VisitorManagementPanel() {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = () => {
    setMessage('No matching pre-approved visitor found for this OTP.');
    setOtp('');
  };

  return (
    <Stack spacing={2.5}>
      <Paper sx={{ borderRadius: 3, bgcolor: '#0f172a', color: '#fff', p: 2.5 }}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: 'rgba(255,255,255,0.7)' }}>
              <ArrowBackIcon fontSize="small" />
              <Typography variant="body2">Back</Typography>
            </Stack>
            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.12)', width: 40, height: 40 }}>
              <ShieldIcon fontSize="small" />
            </Avatar>
            <Box>
              <Typography sx={{ fontWeight: 800 }}>Guard Portal</Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Visitor Check-in/Check-out
              </Typography>
            </Box>
          </Stack>
          <ShieldIcon />
        </Stack>
      </Paper>

      <Paper
        variant="outlined"
        sx={{ borderRadius: 3, borderColor: 'primary.main', bgcolor: 'primary.light', p: 2.5 }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1.5 }}>
          <CheckCircleOutlinedIcon color="primary" fontSize="small" />
          <Typography sx={{ fontWeight: 700 }}>Quick OTP Verification</Typography>
        </Stack>
        <Stack direction="row" spacing={1.5}>
          <TextField
            fullWidth
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
            sx={{ bgcolor: '#fff' }}
          />
          <Button
            variant="contained"
            disabled={otp.length !== 6}
            onClick={handleVerify}
            sx={{ bgcolor: '#0f172a', '&:hover': { bgcolor: '#1e293b' }, px: 3 }}
          >
            Verify
          </Button>
        </Stack>
      </Paper>

      <Box>
        <Typography sx={{ fontWeight: 800, mb: 1.5 }}>Currently Inside (0)</Typography>
        <Paper
          variant="outlined"
          sx={{ borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', p: 4, textAlign: 'center' }}
        >
          <Typography color="text.secondary">No visitors currently inside</Typography>
        </Paper>
      </Box>

      <Box>
        <Typography sx={{ fontWeight: 800, mb: 1.5 }}>Pre-Approved Visitors (0)</Typography>
        <TextField fullWidth placeholder="Search by name, phone, or OTP" sx={{ mb: 1.5 }} />
        <Paper
          variant="outlined"
          sx={{ borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', p: 4, textAlign: 'center' }}
        >
          <Typography color="text.secondary">No pre-approved visitors</Typography>
        </Paper>
      </Box>

      <Snackbar
        open={Boolean(message)}
        autoHideDuration={4000}
        onClose={() => setMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="info" onClose={() => setMessage('')}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

function AmcAlertsPanel() {
  return (
    <Stack spacing={2.5}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Committee Alerts
        </Typography>
        <Typography variant="body2" color="text.secondary">
          AMC schedules and maintenance alerts
        </Typography>
      </Box>

      <Typography sx={{ fontWeight: 800 }}>AMC Services</Typography>

      {MOCK_AMC_SERVICES.map((service) => (
        <Paper
          key={service.id}
          variant="outlined"
          sx={{ borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', p: 2.5 }}
        >
          <Stack spacing={1.5}>
            <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <Stack direction="row" spacing={1.5}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: AMC_ICONS[service.iconKey].bg,
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  {AMC_ICONS[service.iconKey].icon}
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 800 }}>{service.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
                </Box>
              </Stack>
              <Chip
                label={service.status}
                size="small"
                variant="outlined"
                color={service.status === 'OVERDUE' ? 'error' : 'primary'}
                sx={{ fontWeight: 700, flexShrink: 0 }}
              />
            </Stack>

            <Stack spacing={0.5} sx={{ pl: { sm: 7 } }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Vendor:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {service.vendor}
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Last Service:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {service.lastService}
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Next Service:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: service.status === 'OVERDUE' ? 'error.main' : 'text.primary' }}
                >
                  {service.nextService}
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Cost:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  ₹{service.cost.toLocaleString('en-IN')}
                </Typography>
              </Stack>
            </Stack>

            {service.warning ? (
              <Alert severity="error" icon={<NotificationsIcon fontSize="small" />}>
                {service.warning}
              </Alert>
            ) : null}
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}

function CommitteeTab() {
  const [subTab, setSubTab] = useState<CommitteeSubTab>('Visitor Management');

  return (
    <Stack spacing={2.5}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Committee &amp; Security
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage visitors and AMC alerts
        </Typography>
      </Box>

      <SegmentedTabs options={COMMITTEE_TABS} value={subTab} onChange={setSubTab} />

      {subTab === 'Visitor Management' ? <VisitorManagementPanel /> : <AmcAlertsPanel />}
    </Stack>
  );
}

export default CommitteeTab;
