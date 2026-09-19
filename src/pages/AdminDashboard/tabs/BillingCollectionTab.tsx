import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
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
import SearchIcon from '@mui/icons-material/Search';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { getFlats } from '../../../services/apartmentMasterService';
import { listBills, listLateFeeHistory, listPayments, generateBill, type Bill, type Payment } from '../../../services/financeService';
import type { Flat } from '../../../types/apartmentMaster';
import { listResidents, type ResidentRecord } from '../../../services/residentService';

function BillingCollectionTab() {
  const [active, setActive] = useState<'generate' | 'payments' | 'outstanding'>('generate');
  const [search, setSearch] = useState('');
  const [bills, setBills] = useState<Bill[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [flats, setFlats] = useState<Flat[]>([]);
  const [residents, setResidents] = useState<ResidentRecord[]>([]);
  const [billingMonth, setBillingMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    Promise.all([listBills(), listPayments(), getFlats(), listResidents(), listLateFeeHistory()])
      .then(([billRecords, paymentRecords, flatRecords, residentRecords]) => { setBills(billRecords); setPayments(paymentRecords); setFlats(flatRecords); setResidents(residentRecords); })
      .catch((error) => setMessage(error instanceof Error ? error.message : 'Unable to load billing data.'))
      .finally(() => setLoading(false));
  }, []);

  const occupiedFlats = flats.filter((flat) => flat.occupancy_status === 'occupied').length;
  const totalAmount = bills.reduce((sum, bill) => sum + Number(bill.total_amount), 0);
  const outstandingBills = bills.filter((bill) => Number(bill.balance_amount) > 0);
  const outstandingTotal = outstandingBills.reduce((sum, bill) => sum + Number(bill.balance_amount), 0);
  const occupiedFlatRecords = flats.filter((flat) => flat.occupancy_status === 'occupied');
  const generatedThisMonth = bills.filter((bill) => bill.billing_month.startsWith(billingMonth)).length;
  const flatsById = new Map(flats.map((flat) => [flat.id, flat]));
  const residentsByFlatId = new Map(residents.map((resident) => [resident.flat, resident.name]));
  const billsById = new Map(bills.map((bill) => [bill.id, bill]));

  const paymentsFiltered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return payments;
    return payments.filter((p) => p.receipt_number.toLowerCase().includes(q) || p.bill.toLowerCase().includes(q));
  }, [payments, search]);

  const generate = async () => {
    if (!occupiedFlatRecords.length || saving) return;
    setSaving(true); setMessage('');
    try {
      const createdBills = await Promise.all(occupiedFlatRecords.map((flat) => generateBill({ flat: flat.id, billing_month: `${billingMonth}-01`, area_charge: 0 })));
      setBills((current) => [...createdBills, ...current]); setMessage(`${createdBills.length} bill${createdBills.length === 1 ? '' : 's'} generated successfully.`);
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to generate bill.'); } finally { setSaving(false); }
  };

  return (
    <Stack spacing={2}>
      <Typography sx={{ fontSize: '1.6rem', fontWeight: 800 }}>Billing & Collection</Typography>
      {message ? <Alert severity={message.includes('successfully') ? 'success' : 'error'}>{message}</Alert> : null}
      {loading ? <CircularProgress size={24} /> : null}

      <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'center' }}>
        <Button
          onClick={() => setActive('generate')}
          variant={active === 'generate' ? 'contained' : 'text'}
          sx={{ borderRadius: 6, textTransform: 'none', bgcolor: active === 'generate' ? '#4f46e5' : 'transparent', color: active === 'generate' ? '#fff' : '#6b7280', px: 3 }}
        >
          Generate Bills
        </Button>
        <Button
          onClick={() => setActive('payments')}
          variant={active === 'payments' ? 'contained' : 'text'}
          sx={{ borderRadius: 6, textTransform: 'none', bgcolor: active === 'payments' ? '#4f46e5' : 'transparent', color: active === 'payments' ? '#fff' : '#6b7280', px: 3 }}
        >
          Payments
        </Button>
        <Button
          onClick={() => setActive('outstanding')}
          variant={active === 'outstanding' ? 'contained' : 'text'}
          sx={{ borderRadius: 6, textTransform: 'none', bgcolor: active === 'outstanding' ? '#4f46e5' : 'transparent', color: active === 'outstanding' ? '#fff' : '#6b7280', px: 3 }}
        >
          Outstanding
        </Button>
      </Box>

      {active === 'generate' && (
        <Paper variant="outlined" sx={{ borderRadius: 3, p: { xs: 2, md: 3 }, borderColor: 'rgba(148,163,184,0.3)' }}>
          <Typography sx={{ fontWeight: 800, fontSize: '1.25rem', mb: 2 }}>Generate Monthly Bills</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2.25 }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 700, mb: 0.75, color: '#172554' }}>Billing Month</Typography>
              <TextField type="month" value={billingMonth} onChange={(event) => setBillingMonth(event.target.value)} fullWidth sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#f1f5f9', borderRadius: 2 } }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 700, mb: 0.75, color: '#172554' }}>Due Date</Typography>
              <TextField type="date" value={`${billingMonth}-05`} slotProps={{ htmlInput: { readOnly: true } }} fullWidth sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#f1f5f9', borderRadius: 2 } }} />
            </Box>
          </Stack>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2, mb: 2.25, p: 2, borderRadius: 2, bgcolor: '#f1f5f9' }}>
            <Box><Typography sx={{ color: '#64748b', fontWeight: 600 }}>Occupied Flats</Typography><Typography sx={{ fontWeight: 800, fontSize: '1.25rem' }}>{occupiedFlats}</Typography></Box>
            <Box><Typography sx={{ color: '#64748b', fontWeight: 600 }}>Total Amount</Typography><Typography sx={{ fontWeight: 800, fontSize: '1.25rem' }}>₹{totalAmount.toLocaleString('en-IN')}</Typography></Box>
            <Box><Typography sx={{ color: '#64748b', fontWeight: 600 }}>Generated</Typography><Typography sx={{ fontWeight: 800, fontSize: '1.25rem', color: '#059669' }}>{generatedThisMonth}</Typography></Box>
          </Box>
          <Button variant="contained" onClick={generate} disabled={saving || !occupiedFlatRecords.length} sx={{ borderRadius: 2, px: 2.5, bgcolor: '#4f46e5', '&:hover': { bgcolor: '#4338ca' } }}>{saving ? 'Generating...' : `Generate Bills for ${new Date(`${billingMonth}-01`).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}`}</Button>
        </Paper>
      )}

      {active === 'payments' && (
        <Paper variant="outlined" sx={{ borderRadius: 3, p: 2 }}>
          <Typography sx={{ fontWeight: 800, mb: 1.25 }}>Payment Records</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <TextField
              size="small"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: 280 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Receipt No.</TableCell>
                  <TableCell>Flat</TableCell>
                  <TableCell>Resident</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Mode</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentsFiltered.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell sx={{ color: '#6b7280' }}>{p.receipt_number}</TableCell>
                    <TableCell>{flatsById.get(billsById.get(p.bill)?.flat ?? -1)?.flat_number ?? '—'}</TableCell>
                    <TableCell>{residentsByFlatId.get(billsById.get(p.bill)?.flat ?? -1) ?? '—'}</TableCell>
                    <TableCell>₹{Number(p.amount).toLocaleString('en-IN')}</TableCell>
                    <TableCell>{p.payment_date}</TableCell>
                    <TableCell>
                        <Chip label={p.payment_mode} size="small" sx={{ bgcolor: '#eef2ff', color: '#4f46e5' }} />
                    </TableCell>
                    <TableCell>
                        <Chip label={p.payment_status} size="small" sx={{ bgcolor: '#d1fae5', color: '#047857' }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {active === 'outstanding' && (
        <Paper variant="outlined" sx={{ borderRadius: 3, p: 2 }}>
            <Typography sx={{ fontWeight: 800, mb: 1.25 }}>Outstanding — ₹{outstandingTotal.toLocaleString('en-IN')}</Typography>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <Button variant="outlined">Send Reminders</Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Flat</TableCell>
                  <TableCell>Resident</TableCell>
                  <TableCell>Principal</TableCell>
                  <TableCell>Late Fee</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {outstandingBills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell>{flatsById.get(bill.flat ?? -1)?.flat_number ?? '—'}</TableCell>
                    <TableCell>{residentsByFlatId.get(bill.flat ?? -1) ?? '—'}</TableCell>
                    <TableCell>₹{Number(bill.principal_amount).toLocaleString('en-IN')}</TableCell>
                    <TableCell sx={{ color: Number(bill.late_fee) > 0 ? '#ef4444' : 'inherit' }}>{Number(bill.late_fee) > 0 ? `₹${Number(bill.late_fee).toLocaleString('en-IN')}` : '—'}</TableCell>
                    <TableCell>₹{Number(bill.total_amount).toLocaleString('en-IN')}</TableCell>
                    <TableCell>{bill.due_date}</TableCell>
                    <TableCell>
                      <Chip label={bill.status} size="small" sx={{ bgcolor: bill.status === 'OVERDUE' ? '#fee2e2' : '#fef3c7', color: bill.status === 'OVERDUE' ? '#b91c1c' : '#92400e' }} />
                    </TableCell>
                    <TableCell align="right">
                      <Button variant="outlined" size="small" disabled>Record Payment</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Stack>
  );
}

export default BillingCollectionTab;
