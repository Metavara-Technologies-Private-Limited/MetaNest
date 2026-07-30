import { useMemo, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { INITIAL_WINGS, MOCK_FLOORS, type FloorRecord } from '../mockData';

function FloorManagementPanel() {
  const [activeWing, setActiveWing] = useState<'all' | string>('all');
  const [floors, setFloors] = useState<FloorRecord[]>(MOCK_FLOORS);

  const filterOptions = useMemo(
    () => [{ code: 'all', label: 'All Wings' }, ...INITIAL_WINGS.map((w) => ({ code: w.code, label: w.name }))],
    [],
  );

  const visibleFloors = activeWing === 'all' ? floors : floors.filter((f) => f.wingCode === activeWing);

  const removeFloor = (id: string) => setFloors((prev) => prev.filter((f) => f.id !== id));

  return (
    <Stack spacing={2.5}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Floor Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View and manage floors across every wing
        </Typography>
      </Box>

      {/* Segmented wing filter */}
      <Box
        sx={{
          display: 'inline-flex',
          bgcolor: 'rgba(148, 163, 184, 0.12)',
          borderRadius: 3,
          p: 0.5,
          gap: 0.5,
          width: 'fit-content',
        }}
      >
        {filterOptions.map((option) => {
          const isActive = activeWing === option.code;
          return (
            <ButtonBase
              key={option.code}
              onClick={() => setActiveWing(option.code)}
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

      <Paper variant="outlined" sx={{ borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Wing</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Floor</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Level</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Flats</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleFloors.map((floor) => (
                <TableRow key={floor.id} hover>
                  <TableCell>
                    <Chip label={floor.wingLabel} size="small" sx={{ fontWeight: 600 }} />
                  </TableCell>
                  <TableCell>{floor.floorLabel}</TableCell>
                  <TableCell>{floor.level}</TableCell>
                  <TableCell>{floor.flatsCount}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" aria-label={`Edit ${floor.wingLabel} ${floor.floorLabel}`}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => removeFloor(floor.id)}
                      aria-label={`Delete ${floor.wingLabel} ${floor.floorLabel}`}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {visibleFloors.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ color: 'text.secondary', py: 4 }}>
                    No floors to show.
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

export default FloorManagementPanel;