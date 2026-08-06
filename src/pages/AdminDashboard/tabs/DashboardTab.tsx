import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import StatCard from '../StatCard';

const CURRENT_MONTH_LABEL = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
}).format(new Date(2026, 6));

function DashboardTab() {
  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <StatCard
          label="Total Collection"
          value="₹0"
          footerIcon={<CheckCircleIcon sx={{ fontSize: 16, color: '#16a34a' }} />}
          footerText="0 bills paid"
          footerColor="#16a34a"
        />
        <StatCard
          label="Pending Amount"
          value="₹0"
          valueColor="#ea580c"
          footerIcon={<ScheduleIcon sx={{ fontSize: 16, color: '#ea580c' }} />}
          footerText="0 pending"
          footerColor="#ea580c"
        />
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <StatCard label="This Month" value="₹0" footerText={CURRENT_MONTH_LABEL} />
        <StatCard
          label="Collection Rate"
          value="0%"
          valueColor="primary.main"
          footerIcon={<TrendingUpIcon sx={{ fontSize: 16, color: 'primary.main' }} />}
          footerText="Overall"
          footerColor="primary.main"
        />
      </Stack>

      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>
          Bills Overview
        </Typography>
        <Paper
          variant="outlined"
          sx={{ borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', overflow: 'hidden' }}
        >
          <Stack
            direction="row"
            sx={{
              px: 2.5,
              py: 2,
              bgcolor: 'rgba(34, 197, 94, 0.08)',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <CheckCircleIcon sx={{ color: '#16a34a' }} />
              <Typography sx={{ fontWeight: 700 }}>Paid Bills</Typography>
            </Stack>
            <Chip label="0" size="small" sx={{ bgcolor: '#16a34a', color: '#fff', fontWeight: 700 }} />
          </Stack>
        </Paper>
      </Box>
    </Stack>
  );
}

export default DashboardTab;
