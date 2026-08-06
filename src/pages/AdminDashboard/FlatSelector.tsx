import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import ButtonBase from '@mui/material/ButtonBase';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { MockFlat } from './mockData';

interface FlatSelectorProps {
  flats: MockFlat[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

function FlatSelector({ flats, selectedIds, onChange }: FlatSelectorProps) {
  const allSelected = selectedIds.length === flats.length;

  const toggleFlat = (id: string) => {
    onChange(
      selectedIds.includes(id) ? selectedIds.filter((flatId) => flatId !== id) : [...selectedIds, id],
    );
  };

  const toggleAll = () => {
    onChange(allSelected ? [] : flats.map((flat) => flat.id));
  };

  return (
    <Stack spacing={1}>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>
          Select Flats ({selectedIds.length} selected)
        </Typography>
        <Link component="button" type="button" onClick={toggleAll} sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
          Select All
        </Link>
      </Stack>

      <Box
        sx={{
          border: '1px solid rgba(148, 163, 184, 0.35)',
          borderRadius: 2,
          maxHeight: 220,
          overflowY: 'auto',
        }}
      >
        {flats.map((flat) => (
          <ButtonBase
            key={flat.id}
            onClick={() => toggleFlat(flat.id)}
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 1.5,
              py: 1,
              borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
              '&:last-of-type': { borderBottom: 'none' },
            }}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Checkbox checked={selectedIds.includes(flat.id)} tabIndex={-1} sx={{ pointerEvents: 'none' }} />
              <Stack sx={{ textAlign: 'left' }}>
                <Typography sx={{ fontWeight: 700, fontSize: '0.92rem' }}>{flat.flatNo}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {flat.residentName} ({flat.residentType})
                </Typography>
              </Stack>
            </Stack>
            <Typography sx={{ fontWeight: 700 }}>₹{flat.amount}</Typography>
          </ButtonBase>
        ))}
      </Box>
    </Stack>
  );
}

export default FlatSelector;
