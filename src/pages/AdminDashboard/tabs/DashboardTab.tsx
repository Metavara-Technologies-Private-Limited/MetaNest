import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useMemo, useState } from 'react';
import { getAdminDashboardSummary } from '../../../services/adminSettingsService';
import StatCard from '../StatCard';

const CURRENT_MONTH_LABEL = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
}).format(new Date());

function DashboardTab() {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    getAdminDashboardSummary()
      .then((response) => setSummary(response))
      .catch(() => setSummary(null));
  }, []);

  const totalFlats = Number(summary?.total_flats ?? 0);
  const occupied = Number(summary?.occupied_flats ?? 0);
  const occupancyPct = Number(summary?.occupancy_rate ?? 0);
  const paid = Number(summary?.collected_amount ?? 0);
  const pending = Number(summary?.pending_amount ?? summary?.outstanding_amount ?? 0);

  const monthlyCollection = useMemo(() => {
    return Array.isArray(summary?.monthly_collection) ? summary.monthly_collection : [];
  }, [summary]);

  const chartMax = Math.max(...monthlyCollection.map((item: { value?: number }) => Number(item.value ?? 0)), 1);

  const donutColors = ['#4f46e5', '#0f9d7b', '#f59e0b'];
  const wingList = Array.isArray(summary?.wing_summary) ? summary.wing_summary : [];
  const donutSegments: Array<{ wing: string; color: string; angle: number }> = wingList.map((wing: Record<string, unknown>, index: number) => ({
    wing: String(wing['wing'] ?? wing['name'] ?? `Wing ${index + 1}`),
    color: donutColors[index % donutColors.length],
    angle: totalFlats > 0 ? ((Number(wing['occupied'] ?? wing['occupiedFlats'] ?? 0) / totalFlats) * 100) : Number(wing['percentage'] ?? 0),
  }));

  const donutGradient = donutSegments.length
    ? `conic-gradient(${donutSegments
        .map((segment: { color: string; angle: number }, index: number) => {
          const start = donutSegments
            .slice(0, index)
            .reduce((sum: number, item: { angle: number }) => sum + item.angle, 0);
          return `${segment.color} ${start}% ${start + segment.angle}%`;
        })
        .join(', ')})`
    : 'conic-gradient(#e2e8f0 0% 100%)';

  return (
    <Stack spacing={2.5}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <StatCard label="Total Flats" value={String(totalFlats)} footerText={occupied ? `${occupied} occupied` : 'No data'} />
        <StatCard
          label="Occupancy"
          value={totalFlats > 0 ? `${occupancyPct}%` : '0%'}
          footerIcon={<TrendingUpIcon sx={{ fontSize: 15, color: '#22c55e' }} />}
          footerText={totalFlats > 0 ? 'Live backend data' : 'Awaiting data'}
          footerColor="#22c55e"
        />
        <StatCard label="Collection" value={`₹${paid.toLocaleString('en-IN')}`} footerText={CURRENT_MONTH_LABEL} />
        <StatCard
          label="Outstanding"
          value={`₹${pending.toLocaleString('en-IN')}`}
          valueColor="#eb7d1d"
          footerIcon={<ScheduleIcon sx={{ fontSize: 15, color: '#eb7d1d' }} />}
          footerText={pending ? 'Pending amount' : 'No pending amount'}
          footerColor="#eb7d1d"
        />
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Paper variant="outlined" sx={{ flex: 1, borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', p: 2.5, bgcolor: 'rgba(255,255,255,0.22)' }}>
          <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, color: '#2d3748', mb: 1.25, letterSpacing: '-0.04em' }}>
            Monthly Collection
          </Typography>

          {monthlyCollection.length ? (
            <Box sx={{ position: 'relative', height: 220, mt: 1.5, px: 1.5, pb: 0.5 }}>
              <Box sx={{ position: 'absolute', inset: 0, borderBottom: '1px solid rgba(148,163,184,0.45)', borderLeft: '1px solid rgba(148,163,184,0.45)' }} />
              <Box sx={{ position: 'relative', display: 'flex', alignItems: 'end', justifyContent: 'space-between', height: '100%', gap: 1.25 }}>
                {monthlyCollection.map((item: { month: string; value?: number }) => (
                  <Box key={item.month} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'end', height: '100%' }}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'end', height: '100%' }}>
                      <Box
                        sx={{
                          width: '58%',
                          height: `${((Number(item.value ?? 0) / chartMax) * 100)}%`,
                          minHeight: 28,
                          borderRadius: '8px 8px 0 0',
                          bgcolor: item.month === 'Jul' ? '#f59e0b' : '#4f46e5',
                          boxShadow: 'inset 0 -10px 0 rgba(255,255,255,0.06)',
                        }}
                      />
                    </Box>
                    <Typography sx={{ mt: 1, fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>{item.month}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ) : (
            <Box sx={{ mt: 2, p: 2, borderRadius: 2, bgcolor: '#f8fafc', color: '#64748b' }}>
              No monthly collection data available from the backend.
            </Box>
          )}
        </Paper>

        <Paper variant="outlined" sx={{ width: 350, borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', p: 2.5, bgcolor: 'rgba(255,255,255,0.22)' }}>
          <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, color: '#2d3748', mb: 1.75, letterSpacing: '-0.04em' }}>
            Occupancy by Wing
          </Typography>

          {wingList.length ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  background: donutGradient,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'inset 0 0 0 1px rgba(148,163,184,0.08)',
                }}
              >
                <Box sx={{ width: 84, height: 84, borderRadius: '50%', bgcolor: '#f3f6fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, flex: 1 }}>
                {wingList.map((wing: Record<string, unknown>, index: number) => (
                  <Box key={String(wing['wing'] ?? wing['name'] ?? `wing-${index}`)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: donutColors[index % donutColors.length] }} />
                      <Typography sx={{ fontWeight: 700, color: '#374151' }}>{String(wing['wing'] ?? wing['name'])}</Typography>
                    </Box>
                    <Typography sx={{ fontWeight: 700, color: '#374151' }}>{Number(wing['occupied'] ?? wing['occupiedFlats'] ?? 0)} flats</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ) : (
            <Box sx={{ mt: 2, p: 2, borderRadius: 2, bgcolor: '#f8fafc', color: '#64748b' }}>
              No wing occupancy data available from the backend.
            </Box>
          )}
        </Paper>
      </Stack>

      <Paper variant="outlined" sx={{ borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', p: 2.5, bgcolor: 'rgba(255,255,255,0.22)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <HomeWorkIcon sx={{ color: '#4f46e5', fontSize: 22 }} />
          <Typography sx={{ fontSize: '1.1rem', fontWeight: 800, color: '#374151' }}>Recent Payments</Typography>
        </Box>
        <Typography sx={{ color: '#64748b' }}>Live payment activity will appear once the backend exposes recent payment records.</Typography>
      </Paper>
    </Stack>
  );
}

export default DashboardTab;
