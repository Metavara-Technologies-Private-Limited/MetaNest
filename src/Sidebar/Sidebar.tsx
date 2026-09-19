import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, Avatar, Badge, Collapse, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import NotificationsIcon from '@mui/icons-material/Notifications';

type SidebarItem = { key: string; label: string; icon: React.ReactElement; badge?: number };
type SidebarGroup = { heading: string | null; items: SidebarItem[] };

const groups: SidebarGroup[] = [
	{
		heading: null,
		items: [
			{ key: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
		],
	},
	{
		heading: 'APARTMENT MASTER',
		items: [
			{ key: 'society', label: 'Society Details', icon: <ApartmentIcon /> },
			{ key: 'block', label: 'Block Management', icon: <ApartmentIcon /> },
			{ key: 'floor', label: 'Floor Management', icon: <ApartmentIcon /> },
			{ key: 'flat', label: 'Flat Management', icon: <ApartmentIcon /> },
		],
	},
	{
		heading: 'PEOPLE',
		items: [
			{ key: 'residents', label: 'Residents', icon: <PeopleIcon /> },
			{ key: 'security', label: 'Security Staff', icon: <PeopleIcon /> },
		],
	},
	{
		heading: 'FINANCE',
		items: [
			{ key: 'maintenance', label: 'Maintenance Config', icon: <ReceiptLongIcon /> },
			{ key: 'billing', label: 'Billing & Collection', icon: <ReceiptLongIcon /> },
			{ key: 'latefee', label: 'Late Fee Management', icon: <ReceiptLongIcon /> },
		],
	},
	{
		heading: 'ANALYTICS',
		items: [
			{ key: 'reports', label: 'Reports', icon: <DashboardIcon /> },
		],
	},
	{
		heading: 'ADMINISTRATION',
		items: [
			{ key: 'users', label: 'Users & Roles', icon: <PeopleIcon /> },
			{ key: 'notifications', label: 'Notifications', icon: <NotificationsIcon />, badge: 2 },
			{ key: 'settings', label: 'Settings', icon: <SettingsIcon /> },
		],
	},
];

export default function Sidebar() {
	const navigate = useNavigate();
	const location = useLocation();
	const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>({});

	const routeMap: Record<string, string | null> = {
		dashboard: '/',
		society: '/admin',
		block: '/admin',
		floor: '/admin',
		flat: '/admin',
		residents: '/admin',
		security: '/admin',
		maintenance: '/admin/maintenance',
		billing: '/admin',
		latefee: '/admin',
		reports: '/admin',
		users: '/admin',
		notifications: '/admin',
		settings: '/admin',
	};

	const selected = React.useMemo(() => {
		// derive selected by matching pathname to routeMap
		const entry = Object.entries(routeMap).find(([, path]) => path === location.pathname);
		return entry ? entry[0] : 'dashboard';
	}, [location.pathname]);

	const toggleGroup = (heading: string) => {
		setOpenGroups((s) => ({ ...s, [heading]: !s[heading] }));
	};

	const handleItemClick = (key: string) => {
		const path = routeMap[key];
		if (path) navigate(path);
	};

	return (
		<Box sx={{ width: 260, height: '100vh', bgcolor: 'primary.dark', color: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
			<Box sx={{ px: 3, py: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
				<Avatar sx={{ bgcolor: 'primary.main' }}>E</Avatar>
				<Box>
					<Typography variant="h6" sx={{ fontWeight: 800 }}>Epsilon Homes</Typography>
					<Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>Admin Portal</Typography>
				</Box>
			</Box>

			<Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

			<Box sx={{ overflowY: 'auto', flex: 1, px: 1, py: 2 }}>
				<List disablePadding>
					{groups.map((g) => (
						<Box key={g.heading ?? 'top'} sx={{ mb: 1 }}>
							{g.heading && (
								<Box sx={{ px: 3, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'rgba(255,255,255,0.6)', fontWeight: 700, letterSpacing: 0.6 }}>
									<Typography variant="caption">{g.heading}</Typography>
									<IconButton size="small" onClick={() => g.heading && toggleGroup(g.heading)} sx={{ color: 'rgba(255,255,255,0.6)' }}>
										{openGroups[g.heading as string] ? <ExpandLess /> : <ExpandMore />}
									</IconButton>
								</Box>
							)}

							<List disablePadding>
								{g.items.map((it) => (
									<ListItemButton
										key={it.key}
										selected={selected === it.key}
										onClick={() => handleItemClick(it.key)}
										sx={{
											color: 'rgba(255,255,255,0.95)',
											py: 1.5,
											pl: 3,
											'&.Mui-selected': {
												bgcolor: 'rgba(255,255,255,0.08)',
												borderLeft: '4px solid',
												borderColor: 'primary.main',
											},
										}}
									>
										<ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>{it.icon}</ListItemIcon>
										<ListItemText primary={
											<Typography variant="body2" sx={{ fontWeight: 700 }}>{it.label}</Typography>
										} />
										{typeof it.badge === 'number' ? (
											<Badge badgeContent={it.badge} color="error" sx={{ mr: 2 }} />
										) : null}
									</ListItemButton>
								))}
							</List>
						</Box>
					))}
				</List>
			</Box>

			<Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

			<Box sx={{ px: 3, py: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
				<Avatar sx={{ bgcolor: '#fff', color: 'primary.main' }}>S</Avatar>
				<Box sx={{ flex: 1 }}>
					<Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 800 }}>Suresh Mehta</Typography>
					<Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>Super Admin</Typography>
				</Box>
				<Badge color="error" variant="dot">
					<NotificationsIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
				</Badge>
			</Box>
		</Box>
	);
}

