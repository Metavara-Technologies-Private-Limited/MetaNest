import type { ReactNode } from 'react';
import { useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BlockIcon from '@mui/icons-material/Block';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import HistoryIcon from '@mui/icons-material/History';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SegmentedTabs from '../../../components/SegmentedTabs';

const VISITOR_SUB_TABS = ['Pre-Approved', 'Current', 'Past', 'Denied'] as const;
type VisitorSubTab = (typeof VISITOR_SUB_TABS)[number];

const VISITOR_TYPES = ['Guest', 'Delivery', 'Cab', 'Service', 'Other'] as const;
const DURATIONS = ['One Day', 'One Week', 'One Month'] as const;

interface Visitor {
  id: string;
  type: string;
  name: string;
  phone: string;
  purpose: string;
  visitDate: string;
  time: string;
  duration: string;
  otp: string;
}

let visitorCounter = 0;

const EMPTY_STATE: Record<VisitorSubTab, { icon: ReactNode; title: string; subtitle?: string }> = {
  'Pre-Approved': {
    icon: <AccessTimeIcon sx={{ fontSize: 32 }} />,
    title: 'No pre-approved visitors',
    subtitle: 'Add visitors to generate entry OTP',
  },
  Current: { icon: <DirectionsWalkIcon sx={{ fontSize: 32 }} />, title: 'No visitors currently inside' },
  Past: { icon: <HistoryIcon sx={{ fontSize: 32 }} />, title: 'No visit history' },
  Denied: { icon: <BlockIcon sx={{ fontSize: 32 }} />, title: 'No denied visitors' },
};

function VisitorsTab() {
  const [subTab, setSubTab] = useState<VisitorSubTab>('Pre-Approved');
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState('');

  const [type, setType] = useState<(typeof VISITOR_TYPES)[number]>('Guest');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]>('One Day');

  const resetForm = () => {
    setType('Guest');
    setName('');
    setPhone('');
    setPurpose('');
    setVisitDate('');
    setTime('');
    setDuration('One Day');
  };

  const closeDialog = () => {
    setDialogOpen(false);
    resetForm();
  };

  const canSubmit = name.trim() !== '' && phone.trim() !== '' && visitDate !== '';

  const submitVisitor = () => {
    if (!canSubmit) return;
    visitorCounter += 1;
    const otp = String((visitorCounter * 3721) % 9000 + 1000);
    setVisitors((prev) => [
      { id: `v${visitorCounter}`, type, name, phone, purpose, visitDate, time, duration, otp },
      ...prev,
    ]);
    setMessage(`Visitor added. Entry OTP: ${otp}`);
    setSubTab('Pre-Approved');
    closeDialog();
  };

  return (
    <Stack spacing={2.5}>
      <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            My Visitors
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and track your visitors
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon fontSize="small" />}
          onClick={() => setDialogOpen(true)}
          sx={{ bgcolor: '#0f172a', '&:hover': { bgcolor: '#1e293b' } }}
        >
          Add Visitor
        </Button>
      </Stack>

      <SegmentedTabs options={VISITOR_SUB_TABS} value={subTab} onChange={setSubTab} />

      {subTab === 'Pre-Approved' && visitors.length > 0 ? (
        <Stack spacing={1.5}>
          {visitors.map((visitor) => (
            <Paper
              key={visitor.id}
              variant="outlined"
              sx={{ borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', p: 2 }}
            >
              <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Box>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Typography sx={{ fontWeight: 700 }}>{visitor.name}</Typography>
                    <Chip label={visitor.type} size="small" variant="outlined" />
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {visitor.phone}
                    {visitor.purpose ? ` · ${visitor.purpose}` : ''}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {visitor.visitDate} {visitor.time} &middot; {visitor.duration}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Chip
                    label={`OTP ${visitor.otp}`}
                    size="small"
                    sx={{ bgcolor: 'primary.light', color: 'primary.main', fontWeight: 700 }}
                  />
                  <IconButton
                    size="small"
                    aria-label="Remove visitor"
                    onClick={() => setVisitors((prev) => prev.filter((v) => v.id !== visitor.id))}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Stack>
      ) : (
        <Paper
          variant="outlined"
          sx={{
            borderRadius: 3,
            borderColor: 'rgba(148, 163, 184, 0.35)',
            p: 5,
            textAlign: 'center',
            color: 'text.disabled',
          }}
        >
          <Stack spacing={1} sx={{ alignItems: 'center' }}>
            {EMPTY_STATE[subTab].icon}
            <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
              {EMPTY_STATE[subTab].title}
            </Typography>
            {EMPTY_STATE[subTab].subtitle ? (
              <Typography variant="body2" color="primary.main">
                {EMPTY_STATE[subTab].subtitle}
              </Typography>
            ) : null}
          </Stack>
        </Paper>
      )}

      <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800, pb: 0.5 }}>Pre-Approve Visitor</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Add visitor details to generate entry OTP
          </Typography>
          <Stack spacing={2}>
            <TextField
              select
              fullWidth
              label="Visitor Type"
              value={type}
              onChange={(event) => setType(event.target.value as (typeof VISITOR_TYPES)[number])}
            >
              {VISITOR_TYPES.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              required
              label="Name"
              placeholder="Visitor name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              fullWidth
              required
              label="Phone"
              placeholder="Phone number"
              value={phone}
              onChange={(event) => setPhone(event.target.value.replace(/[^\d]/g, '').slice(0, 10))}
            />
            <TextField
              fullWidth
              label="Purpose"
              placeholder="Purpose of visit"
              value={purpose}
              onChange={(event) => setPurpose(event.target.value)}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                required
                type="date"
                label="Visit Date"
                value={visitDate}
                onChange={(event) => setVisitDate(event.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                fullWidth
                type="time"
                label="Time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Stack>
            <TextField
              select
              fullWidth
              label="Duration"
              value={duration}
              onChange={(event) => setDuration(event.target.value as (typeof DURATIONS)[number])}
            >
              {DURATIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <Button
              fullWidth
              size="large"
              variant="contained"
              disabled={!canSubmit}
              onClick={submitVisitor}
              sx={{ py: 1.3, bgcolor: '#0f172a', '&:hover': { bgcolor: '#1e293b' } }}
            >
              Generate OTP &amp; Add Visitor
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={Boolean(message)}
        autoHideDuration={5000}
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

export default VisitorsTab;
