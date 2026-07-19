import { useMemo, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { INITIAL_BILLS, type BillStatus, type BillType, type MockBill } from '../mockData';

const STATUS_OPTIONS: Array<BillStatus | 'All Status'> = ['All Status', 'Pending', 'Paid', 'Overdue'];
const TYPE_OPTIONS: Array<BillType | 'All Types'> = ['All Types', 'Monthly', 'Adhoc'];

const STATUS_COLORS: Record<BillStatus, { bg: string; color: string }> = {
  Pending: { bg: '#fff7ed', color: '#ea580c' },
  Paid: { bg: '#f0fdf4', color: '#16a34a' },
  Overdue: { bg: '#fef2f2', color: '#dc2626' },
};

function BillsTab() {
  const [bills, setBills] = useState(INITIAL_BILLS);
  const [statusFilter, setStatusFilter] = useState<BillStatus | 'All Status'>('All Status');
  const [typeFilter, setTypeFilter] = useState<BillType | 'All Types'>('All Types');
  const [detailsBill, setDetailsBill] = useState<MockBill | null>(null);

  const filteredBills = useMemo(
    () =>
      bills.filter((bill) => {
        const statusMatch = statusFilter === 'All Status' || bill.status === statusFilter;
        const typeMatch = typeFilter === 'All Types' || bill.type === typeFilter;
        return statusMatch && typeMatch;
      }),
    [bills, statusFilter, typeFilter],
  );

  const removeBill = (id: string) => setBills((prev) => prev.filter((bill) => bill.id !== id));

  return (
    <Stack spacing={2.5}>
      <Paper variant="outlined" sx={{ borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', p: 2.5 }}>
        <Typography sx={{ fontWeight: 800, mb: 2 }}>Filter Bills</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            select
            fullWidth
            label="Status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as BillStatus | 'All Status')}
          >
            {STATUS_OPTIONS.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label="Type"
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value as BillType | 'All Types')}
          >
            {TYPE_OPTIONS.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Paper>

      {filteredBills.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{ borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', p: 5, textAlign: 'center' }}
        >
          <Typography color="text.secondary">No bills match these filters.</Typography>
        </Paper>
      ) : (
        filteredBills.map((bill) => (
          <Paper
            key={bill.id}
            variant="outlined"
            sx={{ borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', p: 2.5 }}
          >
            <Stack spacing={1.25}>
              <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Typography sx={{ fontWeight: 800 }}>{bill.flatNo}</Typography>
                  <Chip label={bill.type === 'Adhoc' ? 'Ad-hoc' : 'Monthly'} size="small" variant="outlined" />
                </Stack>
                <Chip
                  label={bill.status.toUpperCase()}
                  size="small"
                  sx={{
                    bgcolor: STATUS_COLORS[bill.status].bg,
                    color: STATUS_COLORS[bill.status].color,
                    fontWeight: 700,
                  }}
                />
              </Stack>

              <Typography variant="body2" color="text.secondary">
                {bill.residentName} ({bill.residentType})
              </Typography>

              <Typography sx={{ fontWeight: 700 }}>{bill.description}</Typography>

              <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Bill #{bill.billNumber}
                </Typography>
                <Typography sx={{ fontWeight: 800, color: 'primary.main' }}>
                  ₹{bill.amount.toLocaleString('en-IN')}
                </Typography>
              </Stack>

              <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="caption" color="text.secondary">
                  Due: {bill.dueDate}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Generated: {bill.generatedDate}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} sx={{ pt: 0.5 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<VisibilityIcon fontSize="small" />}
                  onClick={() => setDetailsBill(bill)}
                >
                  View Details
                </Button>
                <IconButton onClick={() => removeBill(bill.id)} aria-label="Delete bill" color="error">
                  <DeleteOutlineIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Paper>
        ))
      )}

      <Dialog open={Boolean(detailsBill)} onClose={() => setDetailsBill(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Bill Details</DialogTitle>
        <DialogContent>
          {detailsBill ? (
            <Stack spacing={1.25} sx={{ pb: 1 }}>
              <Typography sx={{ fontWeight: 700 }}>{detailsBill.flatNo}</Typography>
              <Typography variant="body2" color="text.secondary">
                {detailsBill.residentName} ({detailsBill.residentType})
              </Typography>
              <Divider />
              <Typography variant="body2">{detailsBill.description}</Typography>
              <Typography variant="body2" color="text.secondary">
                Bill #{detailsBill.billNumber}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Type: {detailsBill.type === 'Adhoc' ? 'Ad-hoc' : 'Monthly'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Status: {detailsBill.status}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Due: {detailsBill.dueDate} &middot; Generated: {detailsBill.generatedDate}
              </Typography>
              <Divider />
              <Typography sx={{ fontWeight: 800, color: 'primary.main' }}>
                Amount: ₹{detailsBill.amount.toLocaleString('en-IN')}
              </Typography>
            </Stack>
          ) : null}
        </DialogContent>
      </Dialog>
    </Stack>
  );
}

export default BillsTab;
