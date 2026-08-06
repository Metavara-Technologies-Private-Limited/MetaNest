import type { ReactNode } from 'react';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SegmentedTabs from '../../../components/SegmentedTabs';
import FlatSelector from '../FlatSelector';
import { MOCK_FLATS } from '../mockData';

const GENERATE_TABS = ['Monthly Bill', 'Ad-hoc Bill'] as const;
type GenerateSubTab = (typeof GENERATE_TABS)[number];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const YEARS = [2024, 2025, 2026, 2027, 2028];

interface LineItem {
  id: string;
  description: string;
  amount: string;
}

let itemCounter = 0;
function newItemId() {
  itemCounter += 1;
  return `item-${itemCounter}`;
}

function PanelHeader({ icon, title, subtitle }: { icon: ReactNode; title: string; subtitle: string }) {
  return (
    <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center', mb: 2.5 }}>
      {icon}
      <Box>
        <Typography sx={{ fontWeight: 800 }}>{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
    </Stack>
  );
}

function MonthlyBillPanel({ onGenerate }: { onGenerate: (message: string) => void }) {
  const [month, setMonth] = useState('July');
  const [year, setYear] = useState(2026);
  const [dueDate, setDueDate] = useState('2026-07-17');
  const [selectedFlatIds, setSelectedFlatIds] = useState<string[]>([]);
  const [charges, setCharges] = useState<LineItem[]>([]);

  const addCharge = () => setCharges((prev) => [...prev, { id: newItemId(), description: '', amount: '' }]);
  const updateCharge = (id: string, field: 'description' | 'amount', value: string) =>
    setCharges((prev) => prev.map((charge) => (charge.id === id ? { ...charge, [field]: value } : charge)));
  const removeCharge = (id: string) => setCharges((prev) => prev.filter((charge) => charge.id !== id));

  const handleGenerate = () => {
    if (selectedFlatIds.length === 0) return;
    onGenerate(`${selectedFlatIds.length} bill(s) generated for ${month} ${year}.`);
    setSelectedFlatIds([]);
    setCharges([]);
  };

  return (
    <Paper variant="outlined" sx={{ borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', p: 3 }}>
      <PanelHeader
        icon={<DescriptionIcon sx={{ color: 'primary.main' }} />}
        title="Generate Monthly Bills"
        subtitle="Create maintenance bills for selected flats"
      />

      <Stack spacing={2.5}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            select
            fullWidth
            label="Month"
            value={month}
            onChange={(event) => setMonth(event.target.value)}
          >
            {MONTHS.map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label="Year"
            value={year}
            onChange={(event) => setYear(Number(event.target.value))}
          >
            {YEARS.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <TextField
          fullWidth
          type="date"
          label="Due Date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonthIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            },
          }}
        />

        <FlatSelector flats={MOCK_FLATS} selectedIds={selectedFlatIds} onChange={setSelectedFlatIds} />

        <Box>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>Additional Charges (Optional)</Typography>
            <Button size="small" startIcon={<AddIcon />} onClick={addCharge}>
              Add
            </Button>
          </Stack>
          {charges.length > 0 ? (
            <Stack spacing={1.25}>
              {charges.map((charge) => (
                <Stack key={charge.id} direction="row" spacing={1}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Charge description"
                    value={charge.description}
                    onChange={(event) => updateCharge(charge.id, 'description', event.target.value)}
                  />
                  <TextField
                    size="small"
                    placeholder="Amount"
                    value={charge.amount}
                    onChange={(event) =>
                      updateCharge(charge.id, 'amount', event.target.value.replace(/[^\d]/g, ''))
                    }
                    sx={{ width: 140 }}
                  />
                  <IconButton onClick={() => removeCharge(charge.id)} aria-label="Remove charge">
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Stack>
              ))}
            </Stack>
          ) : null}
        </Box>

        <Button
          fullWidth
          size="large"
          variant="contained"
          disabled={selectedFlatIds.length === 0}
          onClick={handleGenerate}
          sx={{
            py: 1.4,
            bgcolor: '#0f172a',
            '&:hover': { bgcolor: '#1e293b' },
          }}
        >
          Generate Bills for {selectedFlatIds.length} Flat(s)
        </Button>
      </Stack>
    </Paper>
  );
}

function AdhocBillPanel({ onGenerate }: { onGenerate: (message: string) => void }) {
  const [selectedFlatIds, setSelectedFlatIds] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('2026-07-17');
  const [items, setItems] = useState<LineItem[]>([]);

  const addItem = () => setItems((prev) => [...prev, { id: newItemId(), description: '', amount: '' }]);
  const updateItem = (id: string, field: 'description' | 'amount', value: string) =>
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  const removeItem = (id: string) => setItems((prev) => prev.filter((item) => item.id !== id));

  const totalAmount = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  const handleGenerate = () => {
    if (selectedFlatIds.length === 0) return;
    onGenerate(`Ad-hoc bill generated for ${selectedFlatIds.length} flat(s).`);
    setSelectedFlatIds([]);
    setDescription('');
    setItems([]);
  };

  return (
    <Paper variant="outlined" sx={{ borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', p: 3 }}>
      <PanelHeader
        icon={<EventNoteIcon sx={{ color: 'primary.main' }} />}
        title="Generate Ad-hoc Bill"
        subtitle="Create one-time bills for special charges"
      />

      <Stack spacing={2.5}>
        <FlatSelector flats={MOCK_FLATS} selectedIds={selectedFlatIds} onChange={setSelectedFlatIds} />

        <TextField
          fullWidth
          multiline
          minRows={2}
          label="Bill Description"
          placeholder="e.g., Water tank repair, Lift maintenance, etc."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <TextField
          fullWidth
          type="date"
          label="Due Date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonthIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            },
          }}
        />

        <Box>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>Bill Items</Typography>
            <Button size="small" startIcon={<AddIcon />} onClick={addItem}>
              Add Item
            </Button>
          </Stack>
          {items.length > 0 ? (
            <Stack spacing={1.25}>
              {items.map((item) => (
                <Stack key={item.id} direction="row" spacing={1}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Item description"
                    value={item.description}
                    onChange={(event) => updateItem(item.id, 'description', event.target.value)}
                  />
                  <TextField
                    size="small"
                    placeholder="Amount"
                    value={item.amount}
                    onChange={(event) => updateItem(item.id, 'amount', event.target.value.replace(/[^\d]/g, ''))}
                    sx={{ width: 140 }}
                  />
                  <IconButton onClick={() => removeItem(item.id)} aria-label="Remove item">
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Stack>
              ))}
            </Stack>
          ) : (
            <Typography variant="caption" color="text.secondary">
              No items added yet
            </Typography>
          )}
        </Box>

        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ fontWeight: 700 }}>Total Amount:</Typography>
          <Typography sx={{ fontWeight: 800, color: 'primary.main' }}>₹{totalAmount}</Typography>
        </Stack>

        <Button
          fullWidth
          size="large"
          variant="contained"
          disabled={selectedFlatIds.length === 0}
          onClick={handleGenerate}
          sx={{
            py: 1.4,
            bgcolor: '#0f172a',
            '&:hover': { bgcolor: '#1e293b' },
          }}
        >
          Generate Bill for {selectedFlatIds.length} Flat(s)
        </Button>
      </Stack>
    </Paper>
  );
}

function GenerateTab() {
  const [subTab, setSubTab] = useState<GenerateSubTab>('Monthly Bill');
  const [successMessage, setSuccessMessage] = useState('');

  return (
    <Stack spacing={2.5}>
      <Alert severity="info">
        <strong>Note:</strong> Bills are generated only for occupied flats and will be sent to the current
        resident (tenant if rented, otherwise owner).
      </Alert>

      <Box>
        <Box sx={{ mb: 2.5 }}>
          <SegmentedTabs options={GENERATE_TABS} value={subTab} onChange={setSubTab} />
        </Box>

        {subTab === 'Monthly Bill' ? (
          <MonthlyBillPanel onGenerate={setSuccessMessage} />
        ) : (
          <AdhocBillPanel onGenerate={setSuccessMessage} />
        )}
      </Box>

      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default GenerateTab;
