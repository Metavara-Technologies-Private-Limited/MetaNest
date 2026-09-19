import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LayersIcon from '@mui/icons-material/Layers';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SecurityIcon from '@mui/icons-material/Security';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import BuildIcon from '@mui/icons-material/Build';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardTab from './tabs/DashboardTab';
import BlockManagementPanel from './tabs/BlockManagementPanel';
import FloorManagementPanel from './tabs/FloorManagementPanel';
import FlatManagementPanel from './tabs/FlatManagementPanel';
import SocietyDetailsTab from './tabs/SocietyDetailsTab';
import ResidentsTab from './tabs/ResidentsTab';
import BillingCollectionTab from './tabs/BillingCollectionTab';
import SecurityStaffTab from './tabs/SecurityStaffTab';
import MaintenanceConfigTab from './tabs/MaintenanceConfigTab';
import LateFeeManagementTab from './tabs/LateFeeManagementTab';
import UsersRolesTab from './tabs/UsersRolesTab';
import NotificationsTab from './tabs/NotificationsTab';
import SettingsTab from './tabs/SettingsTab';
import ReportsTab from './tabs/ReportsTab';
import { useAppDispatch } from '../../redux/hooks';
import { clearAuth } from '../../redux/slices/authSlice';
import { logout } from '../../services/authService';
import { listAdminNotifications, markAllAdminNotificationsRead, type AdminNotification } from '../../services/adminSettingsService';

type NavItem = {
  key: string;
  label: string;
  icon: typeof DashboardIcon;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Dashboard',
    items: [{ key: 'dashboard', label: 'Dashboard', icon: DashboardIcon }],
  },
  {
    title: 'Apartment Master',
    items: [
      { key: 'society-details', label: 'Society Details', icon: ApartmentIcon },
      { key: 'block-management', label: 'Block Management', icon: AccountBalanceWalletIcon },
      { key: 'floor-management', label: 'Floor Management', icon: LayersIcon },
      { key: 'flat-management', label: 'Flat Management', icon: HomeWorkIcon },
    ],
  },
  {
    title: 'People',
    items: [
      { key: 'residents', label: 'Residents', icon: PeopleAltIcon },
      { key: 'security-staff', label: 'Security Staff', icon: SecurityIcon },
    ],
  },
  {
    title: 'Finance',
    items: [
      { key: 'maintenance-config', label: 'Maintenance Config', icon: BuildIcon },
      { key: 'billing-collection', label: 'Billing & Collection', icon: ReceiptLongIcon },
      { key: 'late-fee-management', label: 'Late Fee Management', icon: ScheduleIcon },
    ],
  },
  {
    title: 'Analytics',
    items: [{ key: 'reports', label: 'Reports', icon: AssessmentIcon }],
  },
  {
    title: 'Administration',
    items: [
      { key: 'users-and-roles', label: 'Users & Roles', icon: ManageAccountsIcon },
      { key: 'notifications', label: 'Notifications', icon: NotificationsIcon },
      { key: 'settings', label: 'Settings', icon: SettingsIcon },
    ],
  },
];

function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [active, setActive] = useState(() => sessionStorage.getItem('metanest_admin_active_tab') ?? 'dashboard');
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    sessionStorage.setItem('metanest_admin_active_tab', active);
  }, [active]);

  useEffect(() => {
    listAdminNotifications()
      .then((response) => { setNotifications(response.results); setUnreadCount(response.unread_count); })
      .catch(() => undefined);
  }, []);

  const handleLogout = async () => {
    setProfileAnchor(null);
    try {
      await logout();
    } finally {
      dispatch(clearAuth());
      navigate('/login', { replace: true });
    }
  };

  function renderContent() {
    switch (active) {
      case 'dashboard':
        return <DashboardTab />;
      case 'society-details':
        return <SocietyDetailsTab />;
      case 'block-management':
        return <BlockManagementPanel />;
      case 'floor-management':
        return <FloorManagementPanel />;
      case 'flat-management':
        return <FlatManagementPanel />;
      case 'residents':
        return <ResidentsTab />;
      case 'billing-collection':
        return <BillingCollectionTab />;
      case 'late-fee-management':
        return <LateFeeManagementTab />;
      case 'security-staff':
        return <SecurityStaffTab />;
      case 'maintenance-config':
        return <MaintenanceConfigTab />;
      case 'reports':
        return <ReportsTab />;
      case 'users-and-roles':
        return <UsersRolesTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
              {active}
            </Typography>
            <Typography color="text.secondary">This section is coming soon.</Typography>
          </Box>
        );
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#edf2f7' }}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Box
          sx={{
            width: 260,
            flexShrink: 0,
            bgcolor: '#2c2c67',
            color: '#f3f4ff',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            position: 'sticky',
            top: 0,
            height: '100vh',
            alignSelf: 'flex-start',
          }}
        >
          <Box sx={{ px: 2.5, py: 2.5, display: 'flex', alignItems: 'center', gap: 1.5, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <IconButton onClick={() => navigate('/login', { replace: true })} sx={{ bgcolor: 'rgba(255,255,255,0.12)', color: '#fff', p: 1.15 }} aria-label="Back">
              <ArrowBackIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <Box>
              <Typography sx={{ fontSize: '1.05rem', fontWeight: 800, lineHeight: 1.2 }}>Epsilon Homes</Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>Admin Portal</Typography>
            </Box>
          </Box>

          <Box sx={{ px: 1.5, py: 1.5, overflowY: 'auto', flex: 1 }}>
            <List dense disablePadding>
              {NAV_SECTIONS.map((section) => (
                <Box key={section.title} sx={{ mb: 1.5 }}>
                  <Typography sx={{ px: 1.5, mb: 0.8, fontSize: '0.72rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.68)', textTransform: 'uppercase', fontWeight: 700 }}>
                    {section.title}
                  </Typography>
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const selected = active === item.key;
                    return (
                      <ListItemButton
                        key={item.key}
                        selected={selected}
                        onClick={() => setActive(item.key)}
                        sx={{
                          borderRadius: 1.5,
                          mb: 0.5,
                          color: selected ? '#fff' : 'rgba(255,255,255,0.8)',
                          bgcolor: selected ? 'rgba(255,255,255,0.12)' : 'transparent',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                          px: 1.5,
                          py: 0.9,
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                          <Icon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={item.label}
                          sx={{
                            '& .MuiTypography-root': {
                              fontWeight: 700,
                              fontSize: '0.95rem',
                              letterSpacing: '0.01em',
                            },
                          }}
                        />
                      </ListItemButton>
                    );
                  })}
                </Box>
              ))}
            </List>
          </Box>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 4, py: 2.5, bgcolor: '#f4f6f9', borderBottom: '1px solid rgba(15,23,42,0.08)' }}>
            <Box>
              <Typography sx={{ fontSize: '1.6rem', fontWeight: 800, color: '#2d3748', letterSpacing: '-0.03em' }}>
                {active === 'dashboard' ? 'Dashboard' : active.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </Typography>
              <Typography sx={{ color: '#6b7280', fontSize: '0.95rem' }}>
                Epsilon Homes • Baner, Pune
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <IconButton
                aria-label="Open notifications"
                onClick={(event) => setNotificationAnchor(event.currentTarget)}
                sx={{ color: '#5d6380' }}
              >
                <Badge badgeContent={unreadCount} color="error" max={99}>
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Menu
                anchorEl={notificationAnchor}
                open={Boolean(notificationAnchor)}
                onClose={() => setNotificationAnchor(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{ paper: { sx: { width: 340, maxHeight: 380, mt: 1 } } }}
              >
                <Typography sx={{ px: 2, py: 1.2, fontWeight: 800 }}>Notifications</Typography>
                <Divider />
                {notifications.length === 0 ? <MenuItem disabled>No notifications</MenuItem> : notifications.slice(0, 5).map((notification) => (
                  <MenuItem key={notification.id} sx={{ display: 'block', whiteSpace: 'normal', py: 1.2 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{notification.title}</Typography>
                    <Typography sx={{ color: '#6b7280', fontSize: '0.8rem' }}>{notification.message}</Typography>
                  </MenuItem>
                ))}
                {unreadCount > 0 ? <><Divider /><MenuItem onClick={async () => { await markAllAdminNotificationsRead(); setNotifications((current) => current.map((item) => ({ ...item, is_read: true }))); setUnreadCount(0); setNotificationAnchor(null); }}>Mark all as read</MenuItem></> : null}
              </Menu>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  bgcolor: '#f6f6f7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(0,0,0,0.06)',
                  cursor: 'pointer',
                }}
                onClick={(event) => setProfileAnchor(event.currentTarget)}
              >
                <Typography sx={{ fontWeight: 700, color: '#5d5d67', fontSize: '0.9rem' }}>S</Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{ fontWeight: 700, color: '#313649', cursor: 'pointer' }}
                onClick={(event) => setProfileAnchor(event.currentTarget)}
              >
                Suresh Mehta
              </Typography>
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
                    setActive('settings');
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
            </Box>
          </Box>

          <Box sx={{ p: 2, bgcolor: '#eef2f7' }}>
            {renderContent()}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminDashboard;