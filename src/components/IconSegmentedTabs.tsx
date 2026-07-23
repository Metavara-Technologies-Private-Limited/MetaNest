import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

export interface IconTabOption<T extends string> {
  value: T;
  label: string;
  icon: ReactNode;
}

interface IconSegmentedTabsProps<T extends string> {
  options: ReadonlyArray<IconTabOption<T>>;
  value: T;
  onChange: (value: T) => void;
  /** 'stacked' = icon above label (main dashboard tabs), 'inline' = icon beside label (sub-tabs) */
  variant?: 'stacked' | 'inline';
}

function IconSegmentedTabs<T extends string>({
  options,
  value,
  onChange,
  variant = 'stacked',
}: IconSegmentedTabsProps<T>) {
  const stacked = variant === 'stacked';

  return (
    <Box
      sx={{
        display: 'flex',
        bgcolor: '#e4e6ec',
        border: '1px solid rgba(148, 163, 184, 0.25)',
        borderRadius: 3,
        p: 0.5,
        overflowX: 'auto',
      }}
    >
      {options.map((option) => (
        <ButtonBase
          key={option.value}
          onClick={() => onChange(option.value)}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: stacked ? 'column' : 'row',
            alignItems: 'center',
            gap: stacked ? 0.5 : 0.75,
            py: stacked ? 1.25 : 1,
            px: 1.5,
            borderRadius: 2.5,
            whiteSpace: 'nowrap',
            color: value === option.value ? 'text.primary' : 'text.secondary',
            bgcolor: value === option.value ? '#fff' : 'transparent',
            boxShadow: value === option.value ? '0 1px 3px rgba(15, 23, 42, 0.15)' : 'none',
            transition: 'background-color 120ms ease',
          }}
        >
          <Box sx={{ display: 'flex', fontSize: stacked ? 22 : 18 }}>{option.icon}</Box>
          <Typography sx={{ fontWeight: 700, fontSize: stacked ? '0.78rem' : '0.88rem' }}>
            {option.label}
          </Typography>
        </ButtonBase>
      ))}
    </Box>
  );
}

export default IconSegmentedTabs;
