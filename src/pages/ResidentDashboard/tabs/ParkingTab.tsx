import { useState } from 'react';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { MOCK_ASSIGNED_SLOTS, MOCK_AVAILABLE_SLOTS, type AssignedParkingSlot } from '../residentMockData';

function slotIcon(type: string) {
  return type === 'Four Wheeler' ? (
    <DirectionsCarIcon fontSize="small" color="primary" />
  ) : (
    <TwoWheelerIcon fontSize="small" color="primary" />
  );
}

function ParkingTab() {
  const [slots, setSlots] = useState<AssignedParkingSlot[]>(MOCK_ASSIGNED_SLOTS);
  const [editSlot, setEditSlot] = useState<AssignedParkingSlot | null>(null);
  const [plateDraft, setPlateDraft] = useState('');
  const [message, setMessage] = useState('');

  const openEdit = (slot: AssignedParkingSlot) => {
    setEditSlot(slot);
    setPlateDraft(slot.plate);
  };

  const saveEdit = () => {
    if (!editSlot) return;
    setSlots((prev) => prev.map((slot) => (slot.id === editSlot.id ? { ...slot, plate: plateDraft } : slot)));
    setMessage(`${editSlot.code} vehicle updated.`);
    setEditSlot(null);
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Parking Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage your parking slots
        </Typography>
      </Box>

      <Box>
        <Typography sx={{ fontWeight: 800, mb: 1.5 }}>My Parking Slots</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          {slots.map((slot) => (
            <Paper
              key={slot.id}
              variant="outlined"
              sx={{ flex: 1, borderRadius: 3, borderColor: 'primary.main', p: 2.5 }}
            >
              <Stack spacing={1}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  {slotIcon(slot.type)}
                  <Typography sx={{ fontWeight: 800 }}>{slot.code}</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {slot.type}
                </Typography>
                <Typography sx={{ fontWeight: 700 }}>{slot.plate}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {slot.vehicleType}
                </Typography>
                <Button fullWidth variant="outlined" onClick={() => openEdit(slot)}>
                  Update Vehicle
                </Button>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Box>

      <Box>
        <Typography sx={{ fontWeight: 800, mb: 1.5 }}>
          Available Slots ({MOCK_AVAILABLE_SLOTS.length})
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 1.5,
          }}
        >
          {MOCK_AVAILABLE_SLOTS.map((slot) => (
            <Paper
              key={slot.id}
              variant="outlined"
              sx={{
                borderRadius: 2.5,
                borderColor: 'rgba(148, 163, 184, 0.35)',
                p: 1.5,
                textAlign: 'center',
              }}
            >
              <Stack spacing={0.5} sx={{ alignItems: 'center' }}>
                {slotIcon(slot.type)}
                <Typography sx={{ fontWeight: 700, fontSize: '0.85rem' }}>{slot.code}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {slot.type === 'Four Wheeler' ? '4W' : '2W'}
                </Typography>
              </Stack>
            </Paper>
          ))}
        </Box>
      </Box>

      <Dialog open={Boolean(editSlot)} onClose={() => setEditSlot(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Update Vehicle</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Vehicle Number Plate"
            value={plateDraft}
            onChange={(event) => setPlateDraft(event.target.value.toUpperCase())}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditSlot(null)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={saveEdit}
            sx={{ bgcolor: '#0f172a', '&:hover': { bgcolor: '#1e293b' } }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

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

export default ParkingTab;
