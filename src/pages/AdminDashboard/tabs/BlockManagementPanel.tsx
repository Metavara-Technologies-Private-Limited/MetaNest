import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { INITIAL_WINGS, type Wing } from '../mockData';

interface WingFormState {
  code: string;
  name: string;
  description: string;
  floors: string;
  totalFlats: string;
  occupiedFlats: string;
}

const EMPTY_DRAFT: WingFormState = {
  code: '',
  name: '',
  description: '',
  floors: '',
  totalFlats: '',
  occupiedFlats: '',
};

function toDraft(wing: Wing): WingFormState {
  return {
    code: wing.code,
    name: wing.name,
    description: wing.description,
    floors: String(wing.floors),
    totalFlats: String(wing.totalFlats),
    occupiedFlats: String(wing.occupiedFlats),
  };
}

function WingCard({
  wing,
  onEdit,
  onDelete,
}: {
  wing: Wing;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const occupancyPct = wing.totalFlats > 0 ? Math.round((wing.occupiedFlats / wing.totalFlats) * 100) : 0;

  return (
    <Paper
      variant="outlined"
      sx={{ flex: '1 1 280px', minWidth: 260, borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', p: 2.5 }}
    >
      <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
        <Avatar variant="rounded" sx={{ bgcolor: 'primary.main', fontWeight: 800, borderRadius: 2 }}>
          {wing.code}
        </Avatar>
        <Stack direction="row" spacing={0.5}>
          <IconButton size="small" onClick={onEdit} aria-label={`Edit ${wing.name}`}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={onDelete} aria-label={`Delete ${wing.name}`}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      <Typography sx={{ fontWeight: 800 }}>{wing.name}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {wing.description}
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        {[
          { label: 'Floors', value: wing.floors },
          { label: 'Total', value: wing.totalFlats },
          { label: 'Occupied', value: wing.occupiedFlats },
        ].map((stat) => (
          <Box
            key={stat.label}
            sx={{
              flex: 1,
              textAlign: 'center',
              bgcolor: 'rgba(148, 163, 184, 0.08)',
              borderRadius: 2,
              py: 1,
            }}
          >
            <Typography sx={{ fontWeight: 800 }}>{stat.value}</Typography>
            <Typography variant="caption" color="text.secondary">
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="caption" color="text.secondary">
          Occupancy
        </Typography>
        <Typography variant="caption" sx={{ fontWeight: 700 }}>
          {occupancyPct}%
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={occupancyPct}
        sx={{ height: 8, borderRadius: 4, bgcolor: 'rgba(148, 163, 184, 0.2)' }}
      />
    </Paper>
  );
}

function BlockManagementPanel() {
  const [wings, setWings] = useState<Wing[]>(INITIAL_WINGS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<WingFormState>(EMPTY_DRAFT);

  const openAdd = () => {
    setEditingId(null);
    setDraft(EMPTY_DRAFT);
    setDialogOpen(true);
  };

  const openEdit = (wing: Wing) => {
    setEditingId(wing.id);
    setDraft(toDraft(wing));
    setDialogOpen(true);
  };

  const removeWing = (id: string) => setWings((prev) => prev.filter((w) => w.id !== id));

  const updateDraft = (field: keyof WingFormState, value: string) =>
    setDraft((prev) => ({ ...prev, [field]: value }));

  const save = () => {
    const parsed: Wing = {
      id: editingId ?? `w${Date.now()}`,
      code: draft.code.trim().toUpperCase(),
      name: draft.name.trim(),
      description: draft.description.trim(),
      floors: Number(draft.floors) || 0,
      totalFlats: Number(draft.totalFlats) || 0,
      occupiedFlats: Number(draft.occupiedFlats) || 0,
    };

    setWings((prev) =>
      editingId ? prev.map((w) => (w.id === editingId ? parsed : w)) : [...prev, parsed],
    );
    setDialogOpen(false);
  };

  return (
    <Stack spacing={2.5}>
      <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Block Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage wings/blocks within your society
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon fontSize="small" />}
          onClick={openAdd}
          sx={{ bgcolor: '#0f172a', '&:hover': { bgcolor: '#1e293b' } }}
        >
          Add Block
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
        {wings.map((wing) => (
          <WingCard
            key={wing.id}
            wing={wing}
            onEdit={() => openEdit(wing)}
            onDelete={() => removeWing(wing.id)}
          />
        ))}
      </Stack>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>{editingId ? 'Edit Block' : 'Add Block'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="Wing Code (e.g. A)"
                value={draft.code}
                onChange={(event) => updateDraft('code', event.target.value)}
              />
              <TextField
                fullWidth
                label="Wing Name"
                value={draft.name}
                onChange={(event) => updateDraft('name', event.target.value)}
              />
            </Stack>
            <TextField
              fullWidth
              label="Description"
              value={draft.description}
              onChange={(event) => updateDraft('description', event.target.value)}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="Floors"
                type="number"
                value={draft.floors}
                onChange={(event) => updateDraft('floors', event.target.value)}
              />
              <TextField
                fullWidth
                label="Total Flats"
                type="number"
                value={draft.totalFlats}
                onChange={(event) => updateDraft('totalFlats', event.target.value)}
              />
              <TextField
                fullWidth
                label="Occupied Flats"
                type="number"
                value={draft.occupiedFlats}
                onChange={(event) => updateDraft('occupiedFlats', event.target.value)}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={save}
            sx={{ bgcolor: '#0f172a', '&:hover': { bgcolor: '#1e293b' } }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default BlockManagementPanel;