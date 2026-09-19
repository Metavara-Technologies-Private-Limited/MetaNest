import type { ComponentType } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DescriptionIcon from '@mui/icons-material/Description';
import HomeIcon from '@mui/icons-material/Home';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import LogoutIcon from '@mui/icons-material/Logout';
import PaymentIcon from '@mui/icons-material/Payment';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconSegmentedTabs from '../../components/IconSegmentedTabs';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { clearAuth } from '../../redux/slices/authSlice';
import { logout } from '../../services/authService';
import type { MockFlat } from '../AdminDashboard/mockData';
import BillsTab from './tabs/BillsTab';
import ParkingTab from './tabs/ParkingTab';
import PayTab from './tabs/PayTab';
import ProfileTab from './tabs/ProfileTab';
import SocietyTab from './tabs/SocietyTab';
import VisitorsTab from './tabs/VisitorsTab';

const TABS = [
  { value: 'Visitors', label: 'Visitors', icon: <PeopleIcon fontSize="inherit" /> },
  { value: 'Bills', label: 'Bills', icon: <DescriptionIcon fontSize="inherit" /> },
  { value: 'Pay', label: 'Pay', icon: <PaymentIcon fontSize="inherit" /> },
  { value: 'Society', label: 'Society', icon: <ApartmentIcon fontSize="inherit" /> },
  { value: 'Parking', label: 'Parking', icon: <LocalParkingIcon fontSize="inherit" /> },
  { value: 'Profile', label: 'Profile', icon: <PersonIcon fontSize="inherit" /> },
] as const;
type Tab = (typeof TABS)[number]['value'];

function ResidentDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const flat = (location.state as { flat?: MockFlat } | null)?.flat;
  const [activeTab, setActiveTab] = useState<Tab>('Visitors');
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);

  const TAB_CONTENT: Record<Tab, ComponentType> = {
    Visitors: VisitorsTab,
    Bills: BillsTab,
    Pay: PayTab,
    Society: SocietyTab,
    Parking: ParkingTab,
    Profile: () => <ProfileTab flat={flat} />,
  };
  const ActiveTabContent = TAB_CONTENT[activeTab];
  const displayName = user ? `${user.first_name} ${user.last_name}`.trim() : flat?.residentName ?? 'Resident';
  const profileInitial = displayName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    setProfileAnchor(null);
    try {
      await logout();
    } finally {
      dispatch(clearAuth());
      navigate('/login', { replace: true });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 6 }}>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #4338ca 0%, #4f46e5 100%)',
          color: '#fff',
          pb: 3,
        }}
      >
        <Box sx={{ maxWidth: 1600, mx: 'auto', px: { xs: 2, sm: 4, md: 6 }, pt: 3 }}>
          <Stack direction="row" spacing={1.5} sx={{ mb: 2.5, alignItems: 'flex-start' }}>
            <IconButton
              onClick={() => setActiveTab('Visitors')}
              sx={{ mt: 0.5, color: '#fff' }}
              aria-label="Back"
            >
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                My Flat
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)' }}>
                Welcome back!
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              bgcolor: 'rgba(255,255,255,0.12)',
              borderRadius: 3,
              px: 2.5,
              py: 2,
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                {flat ? flat.flatNo : 'Flat'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)' }}>
                {flat ? `${flat.residentName} (${flat.residentType})` : 'Resident'}
              </Typography>
            </Box>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  border: '1.5px solid rgba(255,255,255,0.5)',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <HomeIcon />
              </Box>
              <IconButton
                onClick={(event) => setProfileAnchor(event.currentTarget)}
                aria-label="Open profile menu"
                sx={{ p: 0.25 }}
              >
                <Avatar sx={{ width: 42, height: 42, bgcolor: '#fff', color: '#4338ca', fontWeight: 800 }}>
                  {profileInitial}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={profileAnchor}
                open={Boolean(profileAnchor)}
                onClose={() => setProfileAnchor(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem
                  onClick={() => {
                    setProfileAnchor(null);
                    setActiveTab('Profile');
                  }}
                >
                  <SettingsIcon fontSize="small" sx={{ mr: 1.5 }} />
                  Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon fontSize="small" sx={{ mr: 1.5 }} />
                  Logout
                </MenuItem>
              </Menu>
            </Stack>
          </Stack>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1600, mx: 'auto', px: { xs: 2, sm: 4, md: 6 } }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: -4.5, mb: 3 }}>
          <Box sx={{ flex: 1, bgcolor: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 3, p: 2.5 }}>
            <Typography variant="body2" sx={{ color: '#ea580c', fontWeight: 700 }}>
              Pending
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#ea580c' }}>
              ₹0
            </Typography>
            <Typography variant="caption" sx={{ color: '#ea580c' }}>
              0 bill(s)
            </Typography>
          </Box>
          <Box sx={{ flex: 1, bgcolor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 3, p: 2.5 }}>
            <Typography variant="body2" sx={{ color: '#16a34a', fontWeight: 700 }}>
              Paid
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#16a34a' }}>
              ₹0
            </Typography>
            <Typography variant="caption" sx={{ color: '#16a34a' }}>
              0 bill(s)
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ mb: 3 }}>
          <IconSegmentedTabs options={TABS} value={activeTab} onChange={setActiveTab} variant="stacked" />
        </Box>

        <ActiveTabContent />
      </Box>
    </Box>
  );
}

export default ResidentDashboard;
