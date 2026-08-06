import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function ComingSoonPanel({ label }: { label: string }) {
  return (
    <Paper
      variant="outlined"
      sx={{ borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', p: 6, textAlign: 'center' }}
    >
      <Typography color="text.secondary">{label} is coming soon.</Typography>
    </Paper>
  );
}

export default ComingSoonPanel;
