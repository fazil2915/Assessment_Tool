// src/scenes/layout/Layout.js
import React from 'react';
import { Box, Toolbar } from '@mui/material';
import Navbar from '@/scenes/layout/navbar';
import SideBar from '@/scenes/layout/sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Box>
      <Navbar />
      
      
        <Outlet />
    </Box>
  );
};

export default Layout;

