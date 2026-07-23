import type { ReactNode } from 'react';
import { useState } from 'react';
import PaymentsIcon from '@mui/icons-material/Payments';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { MOCK_FLATS } from '../mockData';

const PAYMENT_MODES = ['Cash', 'Cheque', 'IMPS'] as const;
const EXPENSE_CATEGORIES = ['Salary', 'Maintenance', 'Other'] as const;

interface Expense {
  id: string;
  category: string;
  amount: string;
  description: string;
  date: string;
}

let expenseCounter = 0;

function EntryOptionCard({
  icon,
  iconBg,
  title,
  subtitle,
  onClick,
}: {
  icon: ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        flex: 1,
        p: 3,
        borderRadius: 3,
        border: '1px solid rgba(148, 163, 184, 0.35)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: iconBg, display: 'grid', placeItems: 'center' }}>
        {icon}
      </Box>
      <Typography sx={{ fontWeight: 800 }}>{title}</Typography>
      <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
        {subtitle}
      </Typography>
    </ButtonBase>
  );
}

function EntriesTab() {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [message, setMessage] = useState('');

  const [paymentFlatId, setPaymentFlatId] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState<(typeof PAYMENT_MODES)[number]>('Cash');
  const [paymentDate, setPaymentDate] = useState('');

  const [expenseCategory, setExpenseCategory] = useState<(typeof EXPENSE_CATEGORIES)[number]>('Maintenance');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseDate, setExpenseDate] = useState('');

  const closePaymentDialog = () => {
    setPaymentOpen(false);
    setPaymentFlatId('');
    setPaymentAmount('');
    setPaymentMode('Cash');
    setPaymentDate('');
  };

  const submitPayment = () => {
    const flat = MOCK_FLATS.find((f) => f.id === paymentFlatId);
    setMessage(`Payment of ₹${paymentAmount} recorded${flat ? ` for ${flat.flatNo}` : ''}.`);
    closePaymentDialog();
  };

  const closeExpenseDialog = () => {
    setExpenseOpen(false);
    setExpenseCategory('Maintenance');
    setExpenseAmount('');
    setExpenseDescription('');
    setExpenseDate('');
  };

  const submitExpense = () => {
    expenseCounter += 1;
    setExpenses((prev) => [
      {
        id: `exp-${expenseCounter}`,
        category: expenseCategory,
        amount: expenseAmount,
        description: expenseDescription,
        date: expenseDate,
      },
      ...prev,
    ]);
    setMessage('Expense recorded.');
    closeExpenseDialog();
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Manual Entries
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Record payments and expenses
        </Typography>
      </Box>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <EntryOptionCard
          icon={<PaymentsIcon sx={{ color: 'primary.main' }} />}
          iconBg="#ede9fe"
          title="Record Payment"
          subtitle="Cash/Cheque/IMPS"
          onClick={() => setPaymentOpen(true)}
        />
        <EntryOptionCard
          icon={<TrendingDownIcon sx={{ color: '#ea580c' }} />}
          iconBg="#ffedd5"
          title="Add Expense"
          subtitle="Salary/Maintenance"
          onClick={() => setExpenseOpen(true)}
        />
      </Stack>

      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>
          Recent Expenses
        </Typography>
        {expenses.length === 0 ? (
          <Paper
            variant="outlined"
            sx={{ borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', p: 5, textAlign: 'center' }}
          >
            <TrendingDownIcon sx={{ fontSize: 32, color: 'text.disabled', mb: 1 }} />
            <Typography color="text.secondary">No expenses recorded</Typography>
          </Paper>
        ) : (
          <Stack spacing={1.5}>
            {expenses.map((expense) => (
              <Paper
                key={expense.id}
                variant="outlined"
                sx={{ borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', p: 2 }}
              >
                <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>{expense.category}</Typography>
                    {expense.description ? (
                      <Typography variant="body2" color="text.secondary">
                        {expense.description}
                      </Typography>
                    ) : null}
                    {expense.date ? (
                      <Typography variant="caption" color="text.secondary">
                        {expense.date}
                      </Typography>
                    ) : null}
                  </Box>
                  <Typography sx={{ fontWeight: 800, color: '#ea580c' }}>-₹{expense.amount || 0}</Typography>
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}
      </Box>

      <Dialog open={paymentOpen} onClose={closePaymentDialog} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Record Payment</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              select
              fullWidth
              label="Flat"
              value={paymentFlatId}
              onChange={(event) => setPaymentFlatId(event.target.value)}
            >
              {MOCK_FLATS.map((flat) => (
                <MenuItem key={flat.id} value={flat.id}>
                  {flat.flatNo} &mdash; {flat.residentName}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Amount"
              value={paymentAmount}
              onChange={(event) => setPaymentAmount(event.target.value.replace(/[^\d]/g, ''))}
            />
            <TextField
              select
              fullWidth
              label="Mode"
              value={paymentMode}
              onChange={(event) => setPaymentMode(event.target.value as (typeof PAYMENT_MODES)[number])}
            >
              {PAYMENT_MODES.map((mode) => (
                <MenuItem key={mode} value={mode}>
                  {mode}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              type="date"
              label="Date"
              value={paymentDate}
              onChange={(event) => setPaymentDate(event.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePaymentDialog}>Cancel</Button>
          <Button
            variant="contained"
            disabled={!paymentFlatId || !paymentAmount}
            onClick={submitPayment}
            sx={{ bgcolor: '#0f172a', '&:hover': { bgcolor: '#1e293b' } }}
          >
            Record
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={expenseOpen} onClose={closeExpenseDialog} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Add Expense</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              select
              fullWidth
              label="Category"
              value={expenseCategory}
              onChange={(event) => setExpenseCategory(event.target.value as (typeof EXPENSE_CATEGORIES)[number])}
            >
              {EXPENSE_CATEGORIES.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Amount"
              value={expenseAmount}
              onChange={(event) => setExpenseAmount(event.target.value.replace(/[^\d]/g, ''))}
            />
            <TextField
              fullWidth
              label="Description"
              value={expenseDescription}
              onChange={(event) => setExpenseDescription(event.target.value)}
            />
            <TextField
              fullWidth
              type="date"
              label="Date"
              value={expenseDate}
              onChange={(event) => setExpenseDate(event.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeExpenseDialog}>Cancel</Button>
          <Button
            variant="contained"
            disabled={!expenseAmount}
            onClick={submitExpense}
            sx={{ bgcolor: '#0f172a', '&:hover': { bgcolor: '#1e293b' } }}
          >
            Add
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

export default EntriesTab;
