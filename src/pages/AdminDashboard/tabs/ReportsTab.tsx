import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { getAdminDashboardSummary } from '../../../services/adminSettingsService';

type ReportTab = 'collection' | 'outstanding' | 'occupancy';

function ReportsTab() {
  const [tab, setTab] = useState<ReportTab>('collection');
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    getAdminDashboardSummary().then((response) => setSummary(response)).catch(() => setSummary(null));
  }, []);

  const summaryData = useMemo(() => {
    const totalBilled = Number(summary?.collected_amount ?? 0) + Number(summary?.pending_amount ?? summary?.outstanding_amount ?? 0);
    const collected = Number(summary?.collected_amount ?? 0);
    const outstanding = Number(summary?.pending_amount ?? summary?.outstanding_amount ?? 0);

    return [
      { label: 'Total Billed', value: `₹${totalBilled.toLocaleString('en-IN')}`, color: '#1f2a37' },
      { label: 'Collected', value: `₹${collected.toLocaleString('en-IN')}`, color: '#16a34a' },
      { label: 'Outstanding', value: `₹${outstanding.toLocaleString('en-IN')}`, color: '#ef4444' },
    ];
  }, [summary]);

  const liveTrend = useMemo<Array<{ month: string; value: number; outstanding: number }>>(() => {
    return Array.isArray(summary?.monthly_collection)
      ? summary.monthly_collection.map((item: { month?: string; monthName?: string; value?: number; collected?: number; amount?: number; outstanding?: number }) => ({
          month: String(item.month ?? item.monthName ?? 'Unknown'),
          value: Number(item.value ?? item.collected ?? item.amount ?? 0),
          outstanding: Number(item.outstanding ?? 0),
        }))
      : [];
  }, [summary]);

  const wingSummary = useMemo(() => {
    if (!Array.isArray(summary?.wing_summary)) return [];
    return summary.wing_summary.map((wing: Record<string, unknown>) => ({
      wing: String(wing['wing'] ?? wing['name'] ?? 'Wing'),
      occupied: Number(wing['occupied'] ?? wing['occupied_flats'] ?? 0),
      total: Number(wing['total'] ?? wing['total_flats'] ?? 0),
      pct: Number(wing['percentage'] ?? (Number(wing['total'] ?? wing['total_flats'] ?? 0) > 0
        ? (Number(wing['occupied'] ?? wing['occupied_flats'] ?? 0) / Number(wing['total'] ?? wing['total_flats'] ?? 1)) * 100
        : 0)),
    }));
  }, [summary]);

  const maxValue = liveTrend.length ? Math.max(...liveTrend.map((d) => d.value)) : 1;
  const minValue = liveTrend.length ? Math.min(...liveTrend.map((d) => d.outstanding)) : 0;

  const chartPoints = liveTrend.length
    ? liveTrend
        .map((point, index) => {
          const x = 70 + (index * 780) / (liveTrend.length - 1 || 1);
          const y = 170 - ((point.value - minValue) / (maxValue - minValue || 1)) * 120;
          return `${x},${y}`;
        })
        .join(' ')
    : '';

  const outstandingPoints = liveTrend.length
    ? liveTrend
        .map((point, index) => {
          const x = 70 + (index * 780) / (liveTrend.length - 1 || 1);
          const y = 170 - ((point.outstanding - minValue) / (maxValue - minValue || 1)) * 120;
          return `${x},${y}`;
        })
        .join(' ')
    : '';

  const renderContent = () => {
    if (tab === 'outstanding') {
      return (
        <Paper sx={{ borderRadius: 3, border: '1px solid rgba(148,163,184,0.32)', boxShadow: 'none', bgcolor: '#f7f9fb', overflow: 'hidden' }}>
          <Box sx={{ px: 2.5, py: 1.5 }}>
            <Typography sx={{ fontSize: '1.15rem', fontWeight: 800, color: '#1f2a37', mb: 0.5 }}>Outstanding Report</Typography>
            <Typography sx={{ fontSize: '0.96rem', fontWeight: 600, color: '#667085', mb: 2 }}>
              ₹{Number(summary?.pending_amount ?? summary?.outstanding_amount ?? 0).toLocaleString('en-IN')} total pending
            </Typography>
          </Box>

          {summary?.pending_amount || summary?.outstanding_amount ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'rgba(148,163,184,0.05)' }}>
                    {['Flat', 'Resident', 'Amount', 'Late Fee', 'Total', 'Days Overdue'].map((cell) => (
                      <TableCell key={cell} sx={{ color: '#5d6676', fontWeight: 800, fontSize: '0.76rem', letterSpacing: '0.08em', textTransform: 'uppercase', py: 1.5 }}>
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: '#1f2a37', py: 1.6 }}>—</TableCell>
                    <TableCell sx={{ color: '#1f2a37', py: 1.6 }}>Live backend data not yet exposed</TableCell>
                    <TableCell sx={{ color: '#1f2a37', py: 1.6 }}>₹{Number(summary?.pending_amount ?? summary?.outstanding_amount ?? 0).toLocaleString('en-IN')}</TableCell>
                    <TableCell sx={{ color: '#1f2a37', py: 1.6 }}>—</TableCell>
                    <TableCell sx={{ color: '#1f2a37', py: 1.6 }}>₹{Number(summary?.pending_amount ?? summary?.outstanding_amount ?? 0).toLocaleString('en-IN')}</TableCell>
                    <TableCell sx={{ py: 1.6 }}>
                      <Box sx={{ display: 'inline-flex', px: 1.1, py: 0.35, borderRadius: 1.3, bgcolor: '#fef3c7', color: '#a16207', fontWeight: 700, fontSize: '0.78rem' }}>
                        Due
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box sx={{ px: 2.5, py: 2.5, color: '#64748b' }}>No outstanding report data available from the backend.</Box>
          )}
        </Paper>
      );
    }

    if (tab === 'occupancy') {
      return (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5}>
          <Paper sx={{ flex: 1.6, borderRadius: 3, border: '1px solid rgba(148,163,184,0.32)', boxShadow: 'none', bgcolor: '#f7f9fb', p: 2.2 }}>
            <Typography sx={{ fontSize: '1.2rem', fontWeight: 800, color: '#1f2a37', mb: 2 }}>Occupancy by Wing</Typography>

            {wingSummary.length ? (
              <>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'end', height: 240, px: 1 }}>
                  {wingSummary.map((wing: { wing: string; occupied: number; total: number; pct: number }, index: number) => {
                    const occupied = Math.max(wing.occupied, 0);
                    const max = Math.max(wing.total, 1);
                    return (
                      <Box key={`${wing.wing}-${index}`} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'end', height: 180, gap: 0.5 }}>
                          <Box sx={{ width: 28, height: `${(occupied / max) * 140}px`, borderRadius: '8px 8px 0 0', bgcolor: '#4f46e5' }} />
                          <Box sx={{ width: 28, height: `${((max - occupied) / max) * 140}px`, borderRadius: '8px 8px 0 0', bgcolor: '#e2e8f0' }} />
                        </Box>
                        <Typography sx={{ fontSize: '0.85rem', color: '#5d6676', fontWeight: 600 }}>{wing.wing}</Typography>
                      </Box>
                    );
                  })}
                </Box>

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '3px', bgcolor: '#4f46e5' }} />
                    <Typography sx={{ fontSize: '0.8rem', color: '#4b5565' }}>Occupied</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '3px', bgcolor: '#e2e8f0' }} />
                    <Typography sx={{ fontSize: '0.8rem', color: '#4b5565' }}>Vacant</Typography>
                  </Box>
                </Box>
              </>
            ) : (
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#f8fafc', color: '#64748b' }}>No occupancy data available from the backend.</Box>
            )}
          </Paper>

          <Paper sx={{ flex: 1, borderRadius: 3, border: '1px solid rgba(148,163,184,0.32)', boxShadow: 'none', bgcolor: '#f7f9fb', p: 2.2 }}>
            <Typography sx={{ fontSize: '1.2rem', fontWeight: 800, color: '#1f2a37', mb: 2 }}>Wing Summary</Typography>
            {wingSummary.length ? (
              <Stack spacing={2}>
                {wingSummary.map((wing: { wing: string; occupied: number; total: number; pct: number }, index: number) => (
                  <Box key={`${wing.wing}-${index}`}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography sx={{ fontSize: '0.96rem', fontWeight: 600, color: '#1f2a37' }}>{wing.wing}</Typography>
                      <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: '#5d6676' }}>{wing.occupied}/{wing.total} · {Math.round(wing.pct)}%</Typography>
                    </Box>
                    <Box sx={{ width: '100%', height: 8, bgcolor: '#e2e8f0', borderRadius: 999, overflow: 'hidden' }}>
                      <Box sx={{ width: `${Math.min(Math.max(wing.pct, 0), 100)}%`, height: '100%', bgcolor: '#4f46e5', borderRadius: 999 }} />
                    </Box>
                  </Box>
                ))}
              </Stack>
            ) : (
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#f8fafc', color: '#64748b' }}>No wing summary data available from the backend.</Box>
            )}
          </Paper>
        </Stack>
      );
    }

    return (
      <Box>
        <Paper sx={{ borderRadius: 3, border: '1px solid rgba(148,163,184,0.32)', boxShadow: 'none', bgcolor: '#f7f9fb', p: 2.2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography sx={{ fontSize: '1.15rem', fontWeight: 800, color: '#1f2a37' }}>Collection Trend</Typography>
          </Box>

          {liveTrend.length ? (
            <>
              <Box sx={{ height: 230, position: 'relative', px: 1 }}>
                <svg viewBox="0 0 860 220" width="100%" height="100%">
                  {[0, 1, 2, 3].map((line) => (
                    <line key={line} x1="60" x2="820" y1={25 + line * 40} y2={25 + line * 40} stroke="#dfe6ee" strokeDasharray="4 4" />
                  ))}
                  <polyline fill="none" stroke="#4f46e5" strokeWidth="3" points={chartPoints} strokeLinejoin="round" strokeLinecap="round" />
                  <polyline fill="none" stroke="#d9a84d" strokeWidth="3" strokeDasharray="6 6" points={outstandingPoints} strokeLinejoin="round" strokeLinecap="round" />
                  {liveTrend.map((point, index) => {
                    const x = 70 + (index * 780) / (liveTrend.length - 1 || 1);
                    const y = 170 - ((point.value - minValue) / (maxValue - minValue || 1)) * 120;
                    const y2 = 170 - ((point.outstanding - minValue) / (maxValue - minValue || 1)) * 120;
                    return (
                      <g key={point.month}>
                        <circle cx={x} cy={y} r="4" fill="#4f46e5" />
                        <circle cx={x} cy={y2} r="4" fill="#d9a84d" />
                        <text x={x} y="210" textAnchor="middle" fill="#667085" fontSize="12">{point.month}</text>
                      </g>
                    );
                  })}
                </svg>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#4f46e5' }} />
                  <Typography sx={{ fontSize: '0.8rem', color: '#4b5565' }}>Collected</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#d9a84d' }} />
                  <Typography sx={{ fontSize: '0.8rem', color: '#4b5565' }}>Outstanding</Typography>
                </Box>
              </Box>
            </>
          ) : (
            <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#f8fafc', color: '#64748b' }}>No collection trend data available from the backend.</Box>
          )}
        </Paper>
      </Box>
    );
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
        <Typography sx={{ fontSize: '1.4rem', fontWeight: 800, color: '#2d2f38', lineHeight: 1.2 }}>
          Reports
        </Typography>

        <Button
          variant="contained"
          sx={{
            borderRadius: 2.5,
            px: 2.4,
            py: 1.1,
            background: '#f2f4fb',
            color: '#3d485d',
            boxShadow: 'none',
            textTransform: 'none',
            fontWeight: 700,
            '&:hover': { background: '#e9edf8' },
          }}
        >
          Export
        </Button>
      </Box>

      <Box sx={{ display: 'inline-flex', p: 0.6, bgcolor: '#edf1f8', borderRadius: 3, mb: 2.5 }}>
        {['collection', 'outstanding', 'occupancy'].map((tabKey) => {
          const selected = tab === tabKey;
          return (
            <Button
              key={tabKey}
              onClick={() => setTab(tabKey as ReportTab)}
              variant={selected ? 'contained' : 'text'}
              sx={{
                minWidth: 130,
                borderRadius: 2.2,
                px: 1.8,
                py: 0.7,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '0.97rem',
                color: selected ? '#fff' : '#4b5565',
                bgcolor: selected ? '#4f46e5' : 'transparent',
                boxShadow: 'none',
                '&:hover': { bgcolor: selected ? '#4338ca' : 'rgba(79,70,229,0.04)' },
              }}
            >
              {tabKey === 'collection' ? 'Collection' : tabKey === 'outstanding' ? 'Outstanding' : 'Occupancy'}
            </Button>
          );
        })}
      </Box>

      {tab === 'collection' && (
        <Stack spacing={2.5}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 2 }}>
            {summaryData.map((item) => (
              <Paper key={item.label} sx={{ borderRadius: 3, border: '1px solid rgba(148,163,184,0.32)', boxShadow: 'none', bgcolor: '#f7f9fb', p: 2.2 }}>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 800, color: item.color, textAlign: 'center' }}>{item.value}</Typography>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#485569', textAlign: 'center', mt: 0.5 }}>{item.label}</Typography>
              </Paper>
            ))}
          </Box>

          {renderContent()}
        </Stack>
      )}

      {tab !== 'collection' && <Box sx={{ mt: 0.5 }}>{renderContent()}</Box>}
    </Box>
  );
}

export default ReportsTab;
