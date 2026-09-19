import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Sidebar from '../Sidebar/Sidebar';

export default function MainLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box component="main" sx={{ flex: 1, bgcolor: 'background.default' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
