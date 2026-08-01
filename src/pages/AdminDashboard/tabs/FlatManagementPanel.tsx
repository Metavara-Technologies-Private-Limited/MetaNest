import { useMemo, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import StatCard from '../StatCard';
import { INITIAL_WINGS, MOCK_FLAT_UNITS, type FlatUnit, type FlatStatus } from '../mockData';

type StatusFilter = 'all' | FlatStatus;

function FlatManagementPanel() {
  const [flats, setFlats] = useState<FlatUnit[]>(MOCK_FLAT_UNITS);
  const [search, setSearch] = useState('');
  const [wingFilter, setWingFilter] = useState<'all' | string>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const wingOptions = useMemo(
    () => [{ code: 'all', label: 'All' }, ...INITIAL_WINGS.map((w) => ({ code: w.code, label: w.name }))],
    [],
  );

  const total = flats.length;
  const occupied = flats.filter((f) => f.status === 'occupied').length;
  const vacant = total - occupied;
  const occupancyPct = total > 0 ? Math.round((occupied / total) * 100) : 0;

  const visibleFlats = flats.filter((flat) => {
    const matchesWing = wingFilter === 'all' || flat.wingCode === wingFilter;
    const matchesStatus = statusFilter === 'all' || flat.status === statusFilter;
    const query = search.trim().toLowerCase();
    const matchesSearch =
      query.length === 0 ||
      flat.flatNo.toLowerCase().includes(query) ||
      flat.owner.toLowerCase().includes(query);
    return matchesWing && matchesStatus && matchesSearch;
  });

  const removeFlat = (id: string) => setFlats((prev) => prev.filter((f) => f.id !== id));

  return (
    <Stack spacing={2.5}>
      <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Flat Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {total} flats across {INITIAL_WINGS.length} wings
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon fontSize="small" />}
          sx={{ bgcolor: '#0f172a', '&:hover': { bgcolor: '#1e293b' } }}
        >
          Add Flat
        </Button>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <StatCard label="Total" value={String(total)} footerText={`${INITIAL_WINGS.length} wings`} />
        <StatCard
          label="Occupied"
          value={String(occupied)}
          valueColor="#1FA971"
          footerText={`${occupancyPct}% occupancy`}
          footerColor="#1FA971"
        />
        <StatCard
          label="Vacant"
          value={String(vacant)}
          valueColor="#B98900"
          footerText={`${100 - occupancyPct}% vacant`}
          footerColor="#B98900"
        />
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} sx={{ alignItems: { md: 'center' } }}>
        <TextField
          placeholder="Search flat or owner..."
          size="small"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          sx={{ flex: 1, minWidth: 220 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />

        <Box sx={{ display: 'inline-flex', bgcolor: 'rgba(148, 163, 184, 0.12)', borderRadius: 3, p: 0.5, gap: 0.5 }}>
          {wingOptions.map((option) => {
            const isActive = wingFilter === option.code;
            return (
              <ButtonBase
                key={option.code}
                onClick={() => setWingFilter(option.code)}
                sx={{
                  px: 2,
                  py: 0.75,
                  borderRadius: 2.5,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: isActive ? '#fff' : 'text.primary',
                  bgcolor: isActive ? '#0f172a' : 'transparent',
                }}
              >
                {option.label}
              </ButtonBase>
            );
          })}
        </Box>

        <Select
          size="small"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="occupied">Occupied</MenuItem>
          <MenuItem value="vacant">Vacant</MenuItem>
        </Select>
      </Stack>

      <Paper variant="outlined" sx={{ borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Flat No.</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Wing</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Floor</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Area</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Owner</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Parking</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Maint.</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleFlats.map((flat) => (
                <TableRow key={flat.id} hover>
                  <TableCell sx={{ fontWeight: 700 }}>{flat.flatNo}</TableCell>
                  <TableCell>
                    <Chip label={flat.wingLabel} size="small" sx={{ fontWeight: 600 }} />
                  </TableCell>
                  <TableCell>{flat.floorCode}</TableCell>
                  <TableCell>
                    <Chip label={flat.type} size="small" color="secondary" variant="outlined" />
                  </TableCell>
                  <TableCell>{flat.area}</TableCell>
                  <TableCell>
                    <Chip
                      label={flat.status}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        bgcolor: flat.status === 'occupied' ? '#E7F8F0' : 'rgba(148, 163, 184, 0.15)',
                        color: flat.status === 'occupied' ? '#1FA971' : 'text.secondary',
                      }}
                    />
                  </TableCell>
                  <TableCell>{flat.owner}</TableCell>
                  <TableCell>
                    {flat.parking ? (
                      <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                        <DirectionsCarIcon fontSize="inherit" />
                        <span>{flat.parking}</span>
                      </Stack>
                    ) : (
                      '—'
                    )}
                  </TableCell>
                  <TableCell>₹{flat.maintenance.toLocaleString('en-IN')}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" aria-label={`Edit ${flat.flatNo}`}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => removeFlat(flat.id)}
                      aria-label={`Delete ${flat.flatNo}`}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {visibleFlats.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10} align="center" sx={{ color: 'text.secondary', py: 4 }}>
                    No flats match your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Stack>
  );
}

export default FlatManagementPanel;