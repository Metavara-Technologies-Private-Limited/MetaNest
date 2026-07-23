import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';

interface SegmentedTabsProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}

function SegmentedTabs<T extends string>({ options, value, onChange }: SegmentedTabsProps<T>) {
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
          key={option}
          onClick={() => onChange(option)}
          sx={{
            flex: 1,
            py: 1,
            px: 2,
            borderRadius: 2.5,
            fontWeight: 700,
            fontSize: '0.9rem',
            whiteSpace: 'nowrap',
            color: value === option ? 'text.primary' : 'text.secondary',
            bgcolor: value === option ? '#fff' : 'transparent',
            boxShadow: value === option ? '0 1px 3px rgba(15, 23, 42, 0.15)' : 'none',
            transition: 'background-color 120ms ease',
          }}
        >
          {option}
        </ButtonBase>
      ))}
    </Box>
  );
}

export default SegmentedTabs;
