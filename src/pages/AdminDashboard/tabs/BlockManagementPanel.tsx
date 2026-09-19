import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
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
import CloseIcon from '@mui/icons-material/Close';
import {
  createFloor,
  createWing,
  deleteWing,
  getFlats,
  getSociety,
  getWings,
  updateWing,
} from '../../../services/apartmentMasterService';
import type { Wing } from '../../../types/apartmentMaster';

// Wing stats (total flats / occupied) have no stored field on the backend --
// they're derived from that wing's Floors and Flats. We fetch and compute them
// per wing rather than storing them as editable inputs.
interface WingWithStats extends Wing {
  totalFlats: number;
  occupiedFlats: number;
}

async function loadWingStats(wing: Wing): Promise<WingWithStats> {
  const flats = await getFlats({ wing: wing.id });
  const totalFlats = flats.length;
  const occupiedFlats = flats.filter((flat) => flat.occupancy_status?.toLowerCase() === 'occupied').length;

  return { ...wing, totalFlats, occupiedFlats };
}

function displayWingName(name: string): string {
  return name.toLowerCase().startsWith('wing ') ? name : `Wing ${name}`;
}

function WingCard({
  wing,
  onEdit,
  onDelete,
}: {
  wing: WingWithStats;
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
        <Avatar variant="rounded" sx={{ bgcolor: 'primary.main', fontWeight: 800, borderRadius: 2, fontSize: '11.25px' }}>
          {wing.code || wing.name}
        </Avatar>
        <Stack direction="row" spacing={0.5}>
          <IconButton size="small" onClick={onEdit} aria-label={`Edit Wing ${wing.name}`}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={onDelete} aria-label={`Delete Wing ${wing.name}`}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      <Typography sx={{ fontWeight: 800, fontSize: '16.8px' }}>{displayWingName(wing.name)}</Typography>
      {wing.description ? <Typography sx={{ color: 'text.secondary', fontSize: '11.25px', mt: 0.5 }}>{wing.description}</Typography> : null}

      <Stack direction="row" spacing={1} sx={{ mb: 2, mt: 2 }}>
        {[
          { label: 'Floors', value: wing.total_floors },
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
            <Typography sx={{ fontWeight: 800, fontSize: '11.25px' }}>{stat.value}</Typography>
            <Typography sx={{ fontSize: '11.25px', color: 'text.secondary' }}>{stat.label}</Typography>
          </Box>
        ))}
      </Stack>

      <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 0.5 }}>
        <Typography sx={{ fontSize: '11.25px', color: 'text.secondary' }}>Occupancy</Typography>
        <Typography sx={{ fontSize: '11.25px', fontWeight: 700 }}>{occupancyPct}%</Typography>
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
  const [societyId, setSocietyId] = useState<number | null>(null);
  const [wings, setWings] = useState<WingWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [nameDraft, setNameDraft] = useState('');
  const [codeDraft, setCodeDraft] = useState('');
  const [floorCountDraft, setFloorCountDraft] = useState('');
  const [descriptionDraft, setDescriptionDraft] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');
      try {
        const society = await getSociety();
        if (!society) {
          if (!cancelled) setError('No society record found. Create one first under Society Details.');
          return;
        }
        if (cancelled) return;
        setSocietyId(society.id);

        const wingList = await getWings(society.id);
        const withStats = await Promise.all(wingList.map(loadWingStats));
        if (!cancelled) setWings(withStats);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Could not load wings.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setNameDraft('');
    setCodeDraft('');
    setFloorCountDraft('');
    setDescriptionDraft('');
    setDialogOpen(true);
  };

  const openEdit = (wing: WingWithStats) => {
    setEditingId(wing.id);
    setNameDraft(wing.name);
    setCodeDraft(wing.code ?? wing.name);
    setFloorCountDraft(String(wing.total_floors));
    setDescriptionDraft(wing.description ?? '');
    setDialogOpen(true);
  };

  const removeWing = async (id: number) => {
    if (!window.confirm('Delete this block? Existing floors and flats must be removed first.')) return;
    const previous = wings;
    setWings((prev) => prev.filter((w) => w.id !== id));
    try {
      await deleteWing(id);
    } catch (err) {
      setWings(previous);
      setError(err instanceof Error ? err.message : 'Could not delete wing.');
    }
  };

  const save = async () => {
    const floorCount = Number(floorCountDraft);
    if (!nameDraft.trim() || !codeDraft.trim() || !societyId || floorCount < 0 || saving) return;
    setSaving(true);
    setError('');
    try {
      if (editingId) {
        const current = wings.find((wing) => wing.id === editingId);
        const updated = await updateWing(editingId, {
          name: nameDraft.trim(),
          code: codeDraft.trim(),
          description: descriptionDraft.trim(),
        });
        if (current && floorCount > current.total_floors) {
          await Promise.all(Array.from({ length: floorCount - current.total_floors }, (_, index) => createFloor({
            wing: editingId,
            floor_number: current.total_floors + index + 1,
            name: `Floor ${current.total_floors + index + 1}`,
          })));
        }
        const refreshed = await loadWingStats({ ...current, ...updated } as Wing);
        setWings((prev) => prev.map((w) => (w.id === editingId ? refreshed : w)));
      } else {
        const created = await createWing({
          society: societyId,
          name: nameDraft.trim(),
          code: codeDraft.trim(),
          description: descriptionDraft.trim(),
        });
        await Promise.all(Array.from({ length: floorCount }, (_, index) => createFloor({
          wing: created.id,
          floor_number: index + 1,
          name: `Floor ${index + 1}`,
        })));
        const refreshed = await loadWingStats(created);
        setWings((prev) => [...prev, refreshed]);
      }
      setDialogOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save wing.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Stack sx={{ alignItems: 'center', justifyContent: 'center', py: 8 }}>
        <CircularProgress size={28} />
      </Stack>
    );
  }

  return (
    <Stack spacing={2.5}>
      <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: '22.5px' }}>Block Management</Typography>
          <Typography sx={{ fontSize: '11.25px', color: 'text.secondary' }}>
            Manage wings/blocks within your society
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon fontSize="small" />}
          onClick={openAdd}
          disabled={!societyId}
          sx={{ bgcolor: '#0f172a', fontSize: '11.25px', '&:hover': { bgcolor: '#1e293b' } }}
        >
          Add Block
        </Button>
      </Stack>

      {error ? (
        <Typography sx={{ color: 'error.main', fontWeight: 600, fontSize: '11.25px' }}>{error}</Typography>
      ) : null}

      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
        {wings.map((wing) => (
          <WingCard
            key={wing.id}
            wing={wing}
            onEdit={() => openEdit(wing)}
            onDelete={() => removeWing(wing.id)}
          />
        ))}
        {wings.length === 0 && !error ? (
          <Typography sx={{ fontSize: '11.25px', color: 'text.secondary' }}>
            No wings yet. Click "Add Block" to create one.
          </Typography>
        ) : null}
      </Stack>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 3, maxWidth: 600 } } }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3.5, py: 2.5, fontWeight: 800, fontSize: '1.35rem', borderBottom: '1px solid #e5e7eb' }}>
          {editingId ? 'Edit Block' : 'Add New Block'}
          <IconButton onClick={() => setDialogOpen(false)} disabled={saving} aria-label="Close dialog" size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: 3.5, py: 2.5 }}>
          <Stack spacing={1.8}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>Block Name</Typography>
            <TextField
              fullWidth
              placeholder="e.g. Wing D"
              value={nameDraft}
              onChange={(event) => setNameDraft(event.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#f1f5f9' } }}
            />
            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>Block Code</Typography>
            <TextField
              fullWidth
              placeholder="e.g. D"
              value={codeDraft}
              onChange={(event) => setCodeDraft(event.target.value.toUpperCase())}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#f1f5f9' } }}
            />
            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>Floors</Typography>
            <TextField
              fullWidth
              type="number"
              placeholder="e.g. 6"
              value={floorCountDraft}
              onChange={(event) => setFloorCountDraft(event.target.value)}
              slotProps={{ htmlInput: { min: 0, step: 1 } }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#f1f5f9' } }}
            />
            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>Description</Typography>
            <TextField
              fullWidth
              value={descriptionDraft}
              onChange={(event) => setDescriptionDraft(event.target.value)}
              placeholder=""
              multiline
              minRows={1}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#f1f5f9' } }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3.5, pb: 3, gap: 1.5 }}>
          <Button onClick={() => setDialogOpen(false)} disabled={saving} sx={{ minWidth: 96, borderRadius: 2, bgcolor: '#ede9fe', color: '#29245b', fontWeight: 700, textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={save}
            disabled={saving || !nameDraft.trim() || !codeDraft.trim() || floorCountDraft === '' || Number(floorCountDraft) < 0}
            sx={{ minWidth: 96, borderRadius: 2, bgcolor: '#4f46e5', fontWeight: 700, textTransform: 'none', '&:hover': { bgcolor: '#4338ca' } }}
          >
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default BlockManagementPanel;