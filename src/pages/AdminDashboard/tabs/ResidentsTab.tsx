import { useEffect, useMemo, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { getFlats } from '../../../services/apartmentMasterService';
import { createResident, deleteResident, listResidents, updateResident, type ResidentPayload, type ResidentRecord, type ResidentType } from '../../../services/residentService';
import type { Flat } from '../../../types/apartmentMaster';

type ResidentDraft = {
  name: string;
  flat: string;
  phone: string;
  email: string;
  moveInDate: string;
  familyMembers: string;
  type: ResidentType;
  status: 'Active' | 'Inactive';
};

const EMPTY_DRAFT: ResidentDraft = { name: '', flat: '', phone: '', email: '', moveInDate: '', familyMembers: '1', type: 'Owner', status: 'Active' };

function ResidentsTab() {
  const [residents, setResidents] = useState<ResidentRecord[]>([]);
  const [flats, setFlats] = useState<Flat[]>([]);
  const [activeType, setActiveType] = useState<'All' | ResidentType>('All');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [draft, setDraft] = useState<ResidentDraft>(EMPTY_DRAFT);

  useEffect(() => {
    Promise.all([listResidents(), getFlats()])
      .then(([residentRecords, flatRecords]) => { setResidents(residentRecords); setFlats(flatRecords); })
      .catch((error) => setMessage(error instanceof Error ? error.message : 'Unable to load residents.'))
      .finally(() => setLoading(false));
  }, []);

  const filteredResidents = useMemo(() => {
    const query = search.trim().toLowerCase();
    return residents.filter((resident) => (activeType === 'All' || resident.resident_type === activeType) && (!query || resident.name.toLowerCase().includes(query) || resident.flat_number.toLowerCase().includes(query) || resident.phone.includes(query)));
  }, [activeType, residents, search]);

  const closeModal = () => { if (!saving) { setModalOpen(false); setEditingId(null); setDraft(EMPTY_DRAFT); } };
  const openCreate = () => { setMessage(''); setEditingId(null); setDraft(EMPTY_DRAFT); setModalOpen(true); };
  const openEdit = (resident: ResidentRecord) => { setMessage(''); setEditingId(resident.id); setDraft({ name: resident.name, flat: String(resident.flat), phone: resident.phone.replace(/\D/g, '').slice(-10), email: resident.email, moveInDate: resident.move_in_date, familyMembers: String(resident.family_members), type: resident.resident_type, status: resident.status }); setModalOpen(true); };

  const saveResident = async () => {
    if (!draft.name.trim() || !draft.flat || !/^\d{10}$/.test(draft.phone) || !draft.moveInDate || saving) { setMessage('Enter name, flat, valid 10-digit phone number, and move-in date.'); return; }
    setSaving(true); setMessage('');
    const payload: ResidentPayload = { name: draft.name.trim(), resident_type: draft.type, flat: Number(draft.flat), phone: draft.phone, email: draft.email.trim(), move_in_date: draft.moveInDate, family_members: Math.max(1, Number(draft.familyMembers) || 1), status: draft.status };
    try {
      const saved = editingId === null ? await createResident(payload) : await updateResident(editingId, payload);
      setResidents((current) => editingId === null ? [saved, ...current] : current.map((resident) => resident.id === editingId ? saved : resident));
      closeModal(); setMessage(editingId === null ? 'Resident added successfully.' : 'Resident updated successfully.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to save resident.'); } finally { setSaving(false); }
  };

  const removeResident = async (resident: ResidentRecord) => {
    if (!window.confirm(`Delete ${resident.name}?`)) return;
    try { await deleteResident(resident.id); setResidents((current) => current.filter((item) => item.id !== resident.id)); setMessage('Resident deleted successfully.'); }
    catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to delete resident.'); }
  };

  const summaryCounts = { All: residents.length, Owner: residents.filter((r) => r.resident_type === 'Owner').length, Tenant: residents.filter((r) => r.resident_type === 'Tenant').length };

  return (
    <Stack spacing={2.5}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><Box><Typography variant="h5" sx={{ fontSize: '1.4rem', fontWeight: 800, color: '#2d3748', lineHeight: 1.2 }}>Resident Management</Typography><Typography sx={{ mt: 1, color: '#697386', fontSize: '1.05rem' }}>{residents.length} registered</Typography></Box><Button variant="contained" startIcon={<AddIcon />} onClick={openCreate} sx={{ bgcolor: '#4f46e5', borderRadius: 2.5, px: 3, py: 1.6, fontWeight: 700, textTransform: 'none', boxShadow: 'none', '&:hover': { bgcolor: '#4338ca' } }}>+ Add Resident</Button></Box>
      {message ? <Alert severity={message.includes('successfully') ? 'success' : 'error'}>{message}</Alert> : null}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}><Box sx={{ display: 'inline-flex', gap: 1, bgcolor: 'rgba(148,163,184,0.12)', p: 0.6, borderRadius: 2.5 }}>{(['All', 'Owner', 'Tenant'] as const).map((type) => <Button key={type} onClick={() => setActiveType(type)} variant={activeType === type ? 'contained' : 'text'} sx={{ minWidth: 100, borderRadius: 2, textTransform: 'none', fontWeight: 700, bgcolor: activeType === type ? '#4f46e5' : 'transparent', color: activeType === type ? '#fff' : '#4b5563' }}>{type} ({summaryCounts[type]})</Button>)}</Box><TextField value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name or flat..." size="small" sx={{ width: 260, bgcolor: 'rgba(255,255,255,0.35)', borderRadius: 2 }} slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#6b7280' }} /></InputAdornment> } }} /></Box>
      <Paper variant="outlined" sx={{ borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', overflow: 'hidden' }}><TableContainer><Table><TableHead><TableRow sx={{ bgcolor: 'rgba(148,163,184,0.08)' }}>{['NAME', 'TYPE', 'FLAT', 'PHONE', 'MOVE-IN', 'FAMILY', 'STATUS', 'ACTIONS'].map((header) => <TableCell key={header} sx={{ fontWeight: 800, color: '#495469', letterSpacing: '0.05em', fontSize: '0.75rem', py: 1.7 }}>{header}</TableCell>)}</TableRow></TableHead><TableBody>{loading ? <TableRow><TableCell colSpan={8} align="center"><CircularProgress size={24} /></TableCell></TableRow> : null}{!loading && filteredResidents.length === 0 ? <TableRow><TableCell colSpan={8} align="center">No residents found.</TableCell></TableRow> : null}{filteredResidents.map((resident) => <TableRow key={resident.id} hover><TableCell><Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}><Box sx={{ width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, bgcolor: 'rgba(148,163,184,0.14)' }}>{resident.name[0]}</Box><Typography sx={{ fontWeight: 700 }}>{resident.name}</Typography></Box></TableCell><TableCell><Chip label={resident.resident_type} size="small" /></TableCell><TableCell>{resident.flat_number}</TableCell><TableCell>{resident.phone}</TableCell><TableCell>{resident.move_in_date}</TableCell><TableCell>{resident.family_members}</TableCell><TableCell><Chip label={resident.status} size="small" color={resident.status === 'Active' ? 'success' : 'default'} /></TableCell><TableCell align="right"><IconButton size="small" aria-label={`Edit ${resident.name}`} onClick={() => openEdit(resident)}><EditIcon fontSize="small" /></IconButton><IconButton size="small" aria-label={`Delete ${resident.name}`} onClick={() => removeResident(resident)}><DeleteIcon fontSize="small" /></IconButton></TableCell></TableRow>)}</TableBody></Table></TableContainer></Paper>
      <Dialog open={modalOpen} onClose={closeModal} maxWidth="sm" fullWidth slotProps={{ paper: { sx: { borderRadius: 3, maxWidth: 600 } } }}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3.5, py: 2.5, fontWeight: 800, fontSize: '1.35rem', borderBottom: '1px solid #e5e7eb' }}>
          {editingId === null ? 'Add Resident' : 'Edit Resident'}
          <IconButton onClick={closeModal} disabled={saving} aria-label="Close dialog" size="small"><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: 3.5, py: 2.5 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.4, columnGap: 2 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>Full Name</Typography><Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>Flat Number</Typography>
            <TextField placeholder="" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} autoFocus sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#f1f5f9' } }} />
            <TextField select value={draft.flat} onChange={(event) => setDraft({ ...draft, flat: event.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#f1f5f9' } }}>{flats.map((flat) => <MenuItem key={flat.id} value={flat.id}>{flat.flat_number}</MenuItem>)}</TextField>
            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>Phone</Typography><Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>Email</Typography>
            <TextField value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value.replace(/\D/g, '').slice(0, 10) })} slotProps={{ htmlInput: { inputMode: 'numeric', maxLength: 10 } }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#f1f5f9' } }} />
            <TextField type="email" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#f1f5f9' } }} />
            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>Move-in Date</Typography><Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>Family Members</Typography>
            <TextField type="date" value={draft.moveInDate} onChange={(event) => setDraft({ ...draft, moveInDate: event.target.value })} slotProps={{ inputLabel: { shrink: true } }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#f1f5f9' } }} />
            <TextField type="number" value={draft.familyMembers} onChange={(event) => setDraft({ ...draft, familyMembers: event.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#f1f5f9' } }} />
            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', gridColumn: '1 / -1' }}>Type</Typography>
            <TextField select value={draft.type} onChange={(event) => setDraft({ ...draft, type: event.target.value as ResidentType })} sx={{ gridColumn: '1 / -1', '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#f1f5f9' } }}><MenuItem value="Owner">Owner</MenuItem><MenuItem value="Tenant">Tenant</MenuItem></TextField>
            {editingId !== null ? <><Typography sx={{ fontWeight: 700, fontSize: '0.9rem', gridColumn: '1 / -1' }}>Status</Typography><TextField select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value as ResidentDraft['status'] })} sx={{ gridColumn: '1 / -1', '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#f1f5f9' } }}><MenuItem value="Active">Active</MenuItem><MenuItem value="Inactive">Inactive</MenuItem></TextField></> : null}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3.5, pb: 3, gap: 1.5 }}><Button onClick={closeModal} disabled={saving} sx={{ minWidth: 96, borderRadius: 2, bgcolor: '#ede9fe', color: '#29245b', fontWeight: 700, textTransform: 'none' }}>Cancel</Button><Button onClick={saveResident} variant="contained" disabled={saving} sx={{ minWidth: 96, borderRadius: 2, bgcolor: '#4f46e5', fontWeight: 700, textTransform: 'none', '&:hover': { bgcolor: '#4338ca' } }}>{saving ? 'Saving...' : editingId === null ? 'Save' : 'Save Changes'}</Button></DialogActions>
      </Dialog>
    </Stack>
  );
}

export default ResidentsTab;
