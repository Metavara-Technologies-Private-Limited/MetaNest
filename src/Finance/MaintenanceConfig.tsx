import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';

export default function MaintenanceConfig() {
  const AREA_SQFT = 1050;

  const [baseCharge, setBaseCharge] = useState<number>(2000);
  const [perSqFt, setPerSqFt] = useState<number>(1.5);
  const [water, setWater] = useState<number>(300);
  const [parking, setParking] = useState<number>(500);
  const [sinking, setSinking] = useState<number>(200);
  const [other, setOther] = useState<number>(300);

  const [dueDay, setDueDay] = useState<number>(5);
  const [graceDays, setGraceDays] = useState<number>(5);
  const [lateFeePerDay, setLateFeePerDay] = useState<number>(10);
  const [maxLateFee, setMaxLateFee] = useState<number>(1000);

  const areaCost = useMemo(() => perSqFt * AREA_SQFT, [perSqFt]);
  const total = useMemo(() => {
    return Math.round((baseCharge + areaCost + water + parking + sinking + other) * 100) / 100;
  }, [baseCharge, areaCost, water, parking, sinking, other]);

  const fmt = (v: number) =>
    v.toLocaleString('en-IN', { maximumFractionDigits: Number.isInteger(v) ? 0 : 2 });

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: { xs: 12, md: 20 }, right: { xs: 12, md: 12 } }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CheckIcon />}
          sx={{
            bgcolor: 'primary.main',
            color: '#fff',
            borderRadius: '999px',
            px: 3,
            py: 1.2,
            fontWeight: 700,
            boxShadow: 'none',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
          onClick={() => {
            // placeholder save
            // eslint-disable-next-line no-console
            console.log('Saved config', { baseCharge, perSqFt, water, parking, sinking, other, dueDay, graceDays, lateFeePerDay, maxLateFee });
          }}
        >
          Save
        </Button>
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: 'text.primary' }}>
        Maintenance Configuration
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Paper sx={{ p: 3, borderRadius: 2 }} elevation={1}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>
            Monthly Charges
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Base Charge (₹)"
              type="number"
              size="small"
              value={baseCharge}
              onChange={(e) => setBaseCharge(Number(e.target.value || 0))}
              sx={{ '& .MuiInputBase-root': { borderRadius: 4, bgcolor: '#f3f6fb' }, '& .MuiFormLabel-root': { color: 'primary.main', fontWeight: 700 }, '& .MuiInputBase-input': { textAlign: 'right', pr: 2 } }}
            />

            <TextField
              fullWidth
              label="Per Sq.Ft (₹)"
              type="number"
              size="small"
              value={perSqFt}
              onChange={(e) => setPerSqFt(Number(e.target.value || 0))}
              sx={{ '& .MuiInputBase-root': { borderRadius: 4, bgcolor: '#f3f6fb' }, '& .MuiFormLabel-root': { color: 'primary.main', fontWeight: 700 }, '& .MuiInputBase-input': { textAlign: 'right', pr: 2 } }}
            />

            <TextField
              fullWidth
              label="Water (₹)"
              type="number"
              size="small"
              value={water}
              onChange={(e) => setWater(Number(e.target.value || 0))}
              sx={{ '& .MuiInputBase-root': { borderRadius: 4, bgcolor: '#f3f6fb' }, '& .MuiFormLabel-root': { color: 'primary.main', fontWeight: 700 }, '& .MuiInputBase-input': { textAlign: 'right', pr: 2 } }}
            />

            <TextField
              fullWidth
              label="Parking (₹)"
              type="number"
              size="small"
              value={parking}
              onChange={(e) => setParking(Number(e.target.value || 0))}
              sx={{ '& .MuiInputBase-root': { borderRadius: 4, bgcolor: '#f3f6fb' }, '& .MuiFormLabel-root': { color: 'primary.main', fontWeight: 700 }, '& .MuiInputBase-input': { textAlign: 'right', pr: 2 } }}
            />

            <TextField
              fullWidth
              label="Sinking Fund (₹)"
              type="number"
              size="small"
              value={sinking}
              onChange={(e) => setSinking(Number(e.target.value || 0))}
              sx={{ '& .MuiInputBase-root': { borderRadius: 4, bgcolor: '#f3f6fb' }, '& .MuiFormLabel-root': { color: 'primary.main', fontWeight: 700 }, '& .MuiInputBase-input': { textAlign: 'right', pr: 2 } }}
            />

            <TextField
              fullWidth
              label="Other (₹)"
              type="number"
              size="small"
              value={other}
              onChange={(e) => setOther(Number(e.target.value || 0))}
              sx={{ '& .MuiInputBase-root': { borderRadius: 4, bgcolor: '#f3f6fb' }, '& .MuiFormLabel-root': { color: 'primary.main', fontWeight: 700 }, '& .MuiInputBase-input': { textAlign: 'right', pr: 2 } }}
            />
          </Box>
        </Paper>

        <Box>
          <Paper sx={{ p: 3, borderRadius: 2 }} elevation={1}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>
              Due Date & Late Fee
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Due Day of Month"
                type="number"
                size="small"
                value={dueDay}
                onChange={(e) => setDueDay(Number(e.target.value || 0))}
                sx={{ '& .MuiFormLabel-root': { color: 'primary.main', fontWeight: 700 } }}
                />

              <TextField
                fullWidth
                label="Grace Period (Days)"
                type="number"
                size="small"
                value={graceDays}
                onChange={(e) => setGraceDays(Number(e.target.value || 0))}
              sx={{ '& .MuiFormLabel-root': { color: 'primary.main', fontWeight: 700 } }}
              />

              <TextField
                fullWidth
                label="Late Fee/Day (₹)"
                type="number"
                size="small"
                value={lateFeePerDay}
                onChange={(e) => setLateFeePerDay(Number(e.target.value || 0))}
              sx={{ '& .MuiFormLabel-root': { color: 'primary.main', fontWeight: 700 } }}
              />

              <TextField
                fullWidth
                label="Max Late Fee (₹)"
                type="number"
                size="small"
                value={maxLateFee}
                onChange={(e) => setMaxLateFee(Number(e.target.value || 0))}
              sx={{ '& .MuiFormLabel-root': { color: 'primary.main', fontWeight: 700 } }}
              />
            </Box>
          </Paper>

          <Paper sx={{ p: 2, mt: 2, borderRadius: 2, bgcolor: 'background.paper' }} elevation={0}>
            <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 700, mb: 1 }}>
              Sample Bill — 2BHK (1050 sq.ft) + Parking
            </Typography>
            <Box sx={{ bgcolor: '#f3eafd', borderRadius: 2, p: 2, mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography sx={{ color: 'primary.main', fontWeight: 700, fontSize: 13 }}>Base</Typography>
                <Typography sx={{ color: 'primary.dark', fontWeight: 700 }}>₹{fmt(baseCharge)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography sx={{ color: 'primary.main', fontSize: 13 }}>Area ({AREA_SQFT}×₹{perSqFt})</Typography>
                <Typography sx={{ color: 'primary.dark' }}>₹{fmt(areaCost)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography sx={{ color: 'primary.main', fontSize: 13 }}>Water</Typography>
                <Typography sx={{ color: 'primary.dark' }}>₹{fmt(water)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography sx={{ color: 'primary.main', fontSize: 13 }}>Parking</Typography>
                <Typography sx={{ color: 'primary.dark' }}>₹{fmt(parking)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography sx={{ color: 'primary.main', fontSize: 13 }}>Sinking</Typography>
                <Typography sx={{ color: 'primary.dark' }}>₹{fmt(sinking)}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5, pt: 1, borderTop: '1px dashed rgba(0,0,0,0.06)' }}>
                <Typography variant="subtitle2" sx={{ color: 'primary.dark', fontWeight: 800 }}>Total</Typography>
                <Typography variant="subtitle2" sx={{ color: 'primary.dark', fontWeight: 800 }}>₹{fmt(total)}</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: 3, px: 3 }}
          onClick={() => {
            // placeholder save
            // eslint-disable-next-line no-console
            console.log('Saved config', { baseCharge, perSqFt, water, parking, sinking, other, dueDay, graceDays, lateFeePerDay, maxLateFee });
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
