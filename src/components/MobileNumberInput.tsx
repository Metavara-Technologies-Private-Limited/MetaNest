import type { ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface MobileNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
}

function MobileNumberInput({ value, onChange, autoFocus }: MobileNumberInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = event.target.value.replace(/\D/g, '').slice(0, 10);
    onChange(digitsOnly);
  };

  return (
    <Stack direction="row" spacing={1.25}>
      <Box
        sx={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          px: 1.75,
          borderRadius: 3,
          border: '1px solid rgba(148, 163, 184, 0.45)',
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: 'text.secondary' }}>
          IN
        </Typography>
        <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>+91</Typography>
      </Box>

      <TextField
        fullWidth
        autoFocus={autoFocus}
        placeholder="Enter mobile number"
        value={value}
        onChange={handleChange}
        inputMode="numeric"
        slotProps={{
          htmlInput: { maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' },
        }}
      />
    </Stack>
  );
}

export default MobileNumberInput;
