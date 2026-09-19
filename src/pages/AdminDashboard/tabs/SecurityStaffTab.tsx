import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
  createSecurityStaff,
  deleteSecurityStaff,
  listSecurityStaff,
  updateSecurityStaff,
  type SecurityStaffPayload,
  type SecurityStaffRecord,
} from '../../../services/peopleService';

type Staff = {
  id: number;
  name: string;
  role: string;
  shift: string;
  phone: string;
  salary: string;
  joinDate: string;
  status: 'active' | 'on leave' | 'inactive';
};

type StaffDraft = {
  name: string;
  phone: string;
  role: string;
  shift: string;
  salary: string;
  joining_date: string;
  status: 'Active' | 'On Leave' | 'Inactive';
};

const EMPTY_DRAFT: StaffDraft = {
  name: '', phone: '', role: 'Watchman', shift: 'Morning', salary: '',
  joining_date: new Date().toISOString().slice(0, 10), status: 'Active',
};

function toStaff(record: SecurityStaffRecord): Staff {
  return {
    id: record.id,
    name: record.name,
    role: record.role,
    shift: record.shift,
    phone: record.phone,
    salary: `₹${Number(record.salary).toLocaleString('en-IN')}`,
    joinDate: record.joining_date,
    status: record.status.toLowerCase() as Staff['status'],
  };
}

function SecurityStaffTab() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [draft, setDraft] = useState<StaffDraft>(EMPTY_DRAFT);

  useEffect(() => {
    listSecurityStaff()
      .then((records) => setStaff(records.map(toStaff)))
      .catch((error) => setMessage(error instanceof Error ? error.message : 'Unable to load security staff.'))
      .finally(() => setLoading(false));
  }, []);

  const updateDraft = (field: keyof StaffDraft, value: string) =>
    setDraft((current) => ({ ...current, [field]: value }));

  const closeDialog = () => {
    setOpen(false);
    setEditingId(null);
    setDraft(EMPTY_DRAFT);
  };

  const openCreateDialog = () => {
    setMessage('');
    setEditingId(null);
    setDraft(EMPTY_DRAFT);
    setOpen(true);
  };

  const openEditDialog = (member: Staff) => {
    setMessage('');
    setEditingId(member.id);
    setDraft({
      name: member.name,
      phone: member.phone.replace(/\D/g, '').slice(-10),
      role: member.role,
      shift: member.shift,
      salary: member.salary.replace(/[^\d.]/g, ''),
      joining_date: member.joinDate,
      status: member.status === 'on leave' ? 'On Leave' : member.status === 'inactive' ? 'Inactive' : 'Active',
    });
    setOpen(true);
  };

  const saveStaff = async () => {
    if (!draft.name.trim() || !/^\d{10}$/.test(draft.phone) || !draft.salary.trim() || saving) {
      setMessage('Enter a name, valid 10-digit phone number, and salary.');
      return;
    }

    setSaving(true);
    setMessage('');
    const payload: SecurityStaffPayload = {
      name: draft.name.trim(), role: draft.role, shift: draft.shift,
      phone: draft.phone, salary: Number(draft.salary), joining_date: draft.joining_date, status: draft.status,
    };
    try {
      const saved = editingId === null
        ? await createSecurityStaff(payload)
        : await updateSecurityStaff(editingId, payload);
      setStaff((current) => editingId === null
        ? [toStaff(saved), ...current]
        : current.map((member) => member.id === editingId ? toStaff(saved) : member));
      closeDialog();
      setMessage(editingId === null ? 'Staff member added successfully.' : 'Staff member updated successfully.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save staff member.');
    } finally {
      setSaving(false);
    }
  };

  const removeStaff = async (member: Staff) => {
    if (!window.confirm(`Delete ${member.name}?`)) return;
    try {
      await deleteSecurityStaff(member.id);
      setStaff((current) => current.filter((item) => item.id !== member.id));
      setMessage('Staff member deleted successfully.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to delete staff member.');
    }
  };

  return (
    <Stack spacing={2}>
      <Typography sx={{ fontSize: '1.6rem', fontWeight: 800 }}>Security & Watchmen</Typography>
      {message ? <Alert severity={message.includes('successfully') ? 'success' : 'error'}>{message}</Alert> : null}

      <Paper variant="outlined" sx={{ borderRadius: 3, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography sx={{ fontWeight: 700 }}>Security Staff</Typography>
          <Button onClick={openCreateDialog} variant="contained" sx={{ bgcolor: '#4f46e5', '&:hover': { bgcolor: '#4338ca' } }}>+ Add Staff</Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Shift</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Join Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? <TableRow><TableCell colSpan={8} align="center"><CircularProgress size={24} /></TableCell></TableRow> : null}
              {!loading && staff.length === 0 ? <TableRow><TableCell colSpan={8} align="center">No security staff found.</TableCell></TableRow> : null}
              {staff.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.role}</TableCell>
                  <TableCell><Chip label={s.shift} size="small" color={s.shift === 'Morning' ? 'success' : s.shift === 'Evening' ? 'warning' : 'default'} /></TableCell>
                  <TableCell>{s.phone}</TableCell>
                  <TableCell>{s.salary}</TableCell>
                  <TableCell>{s.joinDate}</TableCell>
                  <TableCell>
                    <Chip label={s.status} size="small" sx={{ bgcolor: s.status === 'active' ? '#d1fae5' : s.status === 'on leave' ? '#fef3c7' : '#f3f4f6', color: s.status === 'active' ? '#047857' : s.status === 'on leave' ? '#975a16' : '#374151' }} />
                  </TableCell>
                  <TableCell align="right">
                    <Button size="small" onClick={() => openEditDialog(s)} aria-label={`Edit ${s.name}`}><EditOutlinedIcon fontSize="small" /></Button>
                    <Button size="small" color="error" onClick={() => removeStaff(s)} aria-label={`Delete ${s.name}`}><DeleteOutlineIcon fontSize="small" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>{editingId === null ? 'Add Security Staff' : 'Edit Security Staff'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField label="Full name" value={draft.name} onChange={(event) => updateDraft('name', event.target.value)} autoFocus fullWidth />
            <TextField label="Mobile number" value={draft.phone} onChange={(event) => updateDraft('phone', event.target.value.replace(/\D/g, '').slice(0, 10))} slotProps={{ htmlInput: { inputMode: 'numeric', maxLength: 10 } }} fullWidth />
            <TextField select label="Role" value={draft.role} onChange={(event) => updateDraft('role', event.target.value)} fullWidth>
              {['Head Security', 'Watchman', 'Night Guard'].map((role) => <MenuItem key={role} value={role}>{role}</MenuItem>)}
            </TextField>
            <TextField select label="Shift" value={draft.shift} onChange={(event) => updateDraft('shift', event.target.value)} fullWidth>
              {['Morning', 'Evening', 'Night'].map((shift) => <MenuItem key={shift} value={shift}>{shift}</MenuItem>)}
            </TextField>
            <TextField label="Monthly salary" type="number" value={draft.salary} onChange={(event) => updateDraft('salary', event.target.value)} fullWidth />
            <TextField label="Join date" type="date" value={draft.joining_date} onChange={(event) => updateDraft('joining_date', event.target.value)} slotProps={{ inputLabel: { shrink: true } }} fullWidth />
            <TextField select label="Status" value={draft.status} onChange={(event) => updateDraft('status', event.target.value)} fullWidth>
              {['Active', 'On Leave', 'Inactive'].map((status) => <MenuItem key={status} value={status}>{status}</MenuItem>)}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} disabled={saving}>Cancel</Button>
          <Button onClick={saveStaff} variant="contained" disabled={saving}>{saving ? 'Saving...' : editingId === null ? 'Add Staff' : 'Save Changes'}</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default SecurityStaffTab;
