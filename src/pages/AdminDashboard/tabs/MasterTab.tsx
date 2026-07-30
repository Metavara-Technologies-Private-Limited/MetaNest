import type { ReactNode } from 'react';
import { useState } from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BuildIcon from '@mui/icons-material/Build';
import EditIcon from '@mui/icons-material/Edit';
import GridViewIcon from '@mui/icons-material/GridView';
import HomeIcon from '@mui/icons-material/Home';
import LayersIcon from '@mui/icons-material/Layers';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { INITIAL_SOCIETY_DETAILS, type SocietyDetails } from '../mockData';
import BlockManagementPanel from './BlockManagementPanel';
import FloorManagementPanel from './FloorManagementPanel';
import FlatManagementPanel from './FlatManagementPanel';

interface NavItem {
  key: string;
  label: string;
  icon: ReactNode;
}

interface NavSection {
  section: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    section: 'Setup',
    items: [
      { key: 'society-details', label: 'Society Details', icon: <ApartmentIcon fontSize="small" /> },
      { key: 'block-management', label: 'Block Management', icon: <LayersIcon fontSize="small" /> },
      { key: 'floor-management', label: 'Floor Management', icon: <GridViewIcon fontSize="small" /> },
      { key: 'flat-management', label: 'Flat Management', icon: <HomeIcon fontSize="small" /> },
    ],
  },
  {
    section: 'People',
    items: [
      { key: 'resident-management', label: 'Resident Management', icon: <PeopleIcon fontSize="small" /> },
      { key: 'security-watchmen', label: 'Security / Watchmen', icon: <SecurityIcon fontSize="small" /> },
    ],
  },
  {
    section: 'Finance',
    items: [
      { key: 'maintenance-config', label: 'Maintenance Config', icon: <BuildIcon fontSize="small" /> },
      { key: 'billing-collection', label: 'Billing & Collection', icon: <ReceiptLongIcon fontSize="small" /> },
      { key: 'late-fee-management', label: 'Late Fee Management', icon: <ScheduleIcon fontSize="small" /> },
    ],
  },
  {
    section: 'Analytics',
    items: [{ key: 'reports', label: 'Reports', icon: <AssessmentIcon fontSize="small" /> }],
  },
  {
    section: 'System',
    items: [
      { key: 'user-role-mgmt', label: 'User & Role Mgmt', icon: <ManageAccountsIcon fontSize="small" /> },
      { key: 'notifications', label: 'Notifications', icon: <NotificationsIcon fontSize="small" /> },
      { key: 'settings', label: 'Settings', icon: <SettingsIcon fontSize="small" /> },
    ],
  },
];

function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 700 }}>{value}</Typography>
    </Box>
  );
}

function SocietyDetailsPanel() {
  const [details, setDetails] = useState<SocietyDetails>(INITIAL_SOCIETY_DETAILS);
  const [draft, setDraft] = useState<SocietyDetails>(INITIAL_SOCIETY_DETAILS);
  const [editOpen, setEditOpen] = useState(false);

  const openEdit = () => {
    setDraft(details);
    setEditOpen(true);
  };

  const saveEdit = () => {
    setDetails(draft);
    setEditOpen(false);
  };

  const updateDraft = (field: keyof SocietyDetails, value: string) =>
    setDraft((prev) => ({ ...prev, [field]: value }));

  return (
    <Stack spacing={2.5}>
      <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Apartment / Society Details
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Core information about your housing society
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<EditIcon fontSize="small" />}
          onClick={openEdit}
          sx={{ bgcolor: '#0f172a', '&:hover': { bgcolor: '#1e293b' } }}
        >
          Edit
        </Button>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Paper
          variant="outlined"
          sx={{ flex: 1, borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', p: 2.5 }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
            <ApartmentIcon color="primary" fontSize="small" />
            <Typography sx={{ fontWeight: 800 }}>Basic Information</Typography>
          </Stack>
          <Stack spacing={1.75}>
            <InfoRow label="Society Name" value={details.societyName} />
            <InfoRow label="Registration No." value={details.registrationNo} />
            <InfoRow label="Total Flats" value={details.totalFlats} />
            <InfoRow label="Total Blocks" value={details.totalBlocks} />
            <InfoRow label="Year Established" value={details.yearEstablished} />
          </Stack>
        </Paper>

        <Paper
          variant="outlined"
          sx={{ flex: 1, borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', p: 2.5 }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
            <LocationOnIcon color="primary" fontSize="small" />
            <Typography sx={{ fontWeight: 800 }}>Address & Contact</Typography>
          </Stack>
          <Stack spacing={1.75}>
            <InfoRow label="Address" value={details.address} />
            <InfoRow label="City / State" value={details.cityState} />
            <InfoRow label="Pincode" value={details.pincode} />
            <InfoRow label="Phone" value={details.phone} />
            <InfoRow label="Email" value={details.email} />
          </Stack>
        </Paper>
      </Stack>

      <Paper variant="outlined" sx={{ borderRadius: 3, borderColor: 'rgba(148, 163, 184, 0.35)', p: 2.5 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
          <AccountBalanceIcon color="primary" fontSize="small" />
          <Typography sx={{ fontWeight: 800 }}>Bank Account Details</Typography>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          <InfoRow label="Bank Name" value={details.bankName} />
          <InfoRow label="Account No." value={details.accountNo} />
          <InfoRow label="IFSC Code" value={details.ifscCode} />
          <InfoRow label="UPI ID" value={details.upiId} />
        </Stack>
      </Paper>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Edit Society Details</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Society Name"
              value={draft.societyName}
              onChange={(event) => updateDraft('societyName', event.target.value)}
            />
            <TextField
              fullWidth
              label="Address"
              value={draft.address}
              onChange={(event) => updateDraft('address', event.target.value)}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="Phone"
                value={draft.phone}
                onChange={(event) => updateDraft('phone', event.target.value)}
              />
              <TextField
                fullWidth
                label="Email"
                value={draft.email}
                onChange={(event) => updateDraft('email', event.target.value)}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={saveEdit}
            sx={{ bgcolor: '#0f172a', '&:hover': { bgcolor: '#1e293b' } }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

function MasterTab() {
  const [activeKey, setActiveKey] = useState('society-details');
  const activeLabel = NAV_SECTIONS.flatMap((section) => section.items).find(
    (item) => item.key === activeKey,
  )?.label;

  const renderActivePanel = () => {
    switch (activeKey) {
      case 'society-details':
        return <SocietyDetailsPanel />;
      case 'block-management':
        return <BlockManagementPanel />;
      case 'floor-management':
        return <FloorManagementPanel />;
      case 'flat-management':
        return <FlatManagementPanel />;
      default:
        return (
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 3,
              borderColor: 'rgba(148, 163, 184, 0.35)',
              p: 6,
              textAlign: 'center',
            }}
          >
            <Typography color="text.secondary">{activeLabel} is coming soon.</Typography>
          </Paper>
        );
    }
  };

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
      <Paper
        variant="outlined"
        sx={{
          width: { xs: '100%', md: 240 },
          flexShrink: 0,
          borderRadius: 3,
          borderColor: 'rgba(148, 163, 184, 0.35)',
          p: 2,
          alignSelf: 'flex-start',
        }}
      >
        <Stack spacing={2.5}>
          {NAV_SECTIONS.map((section) => (
            <Box key={section.section}>
              <Typography
                variant="caption"
                sx={{ fontWeight: 700, color: 'text.disabled', letterSpacing: '0.06em', pl: 1 }}
              >
                {section.section.toUpperCase()}
              </Typography>
              <Stack spacing={0.5} sx={{ mt: 0.75 }}>
                {section.items.map((item) => (
                  <ButtonBase
                    key={item.key}
                    onClick={() => setActiveKey(item.key)}
                    sx={{
                      justifyContent: 'flex-start',
                      gap: 1.25,
                      px: 1.5,
                      py: 1,
                      borderRadius: 2,
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: activeKey === item.key ? '#fff' : 'text.primary',
                      bgcolor: activeKey === item.key ? '#0f172a' : 'transparent',
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </ButtonBase>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Paper>

      <Box sx={{ flex: 1, minWidth: 0 }}>{renderActivePanel()}</Box>
    </Stack>
  );
}

export default MasterTab;