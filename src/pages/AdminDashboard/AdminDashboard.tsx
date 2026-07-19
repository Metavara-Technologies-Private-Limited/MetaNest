import type { ComponentType } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SegmentedTabs from '../../components/SegmentedTabs';
import DashboardTab from './tabs/DashboardTab';
import GenerateTab from './tabs/GenerateTab';
import BillsTab from './tabs/BillsTab';
import EntriesTab from './tabs/EntriesTab';
import CommitteeTab from './tabs/CommitteeTab';
import MasterTab from './tabs/MasterTab';

const TABS = ['Dashboard', 'Generate', 'Bills', 'Entries', 'Committee', 'Master'] as const;
type Tab = (typeof TABS)[number];

const TAB_CONTENT: Record<Tab, ComponentType> = {
  Dashboard: DashboardTab,
  Generate: GenerateTab,
  Bills: BillsTab,
  Entries: EntriesTab,
  Committee: CommitteeTab,
  Master: MasterTab,
};

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('Dashboard');
  const ActiveTabContent = TAB_CONTENT[activeTab];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 6 }}>
      <Box sx={{ maxWidth: 1600, mx: 'auto', px: { xs: 2, sm: 4, md: 6 }, pt: 4 }}>
        <Stack direction="row" spacing={1.5} sx={{ mb: 3, alignItems: 'flex-start' }}>
          <IconButton
            onClick={() => navigate('/login', { replace: true })}
            sx={{ mt: 0.5 }}
            aria-label="Back"
          >
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Epsilon Homes - Admin
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage bills and payments
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ mb: 3 }}>
          <SegmentedTabs options={TABS} value={activeTab} onChange={setActiveTab} />
        </Box>

        <ActiveTabContent />
      </Box>
    </Box>
  );
}

export default AdminDashboard;
