import React from 'react';
import { Box } from '@mui/material';
import Header from './header/Header';
import Sidebar from './SideMenuBar';
 
interface LayoutProps {
  children: React.ReactNode;
  hideSidebar?: boolean;
}
 
const Layout: React.FC<LayoutProps> = ({ children, hideSidebar }) => {
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header />
      {!hideSidebar ? <Sidebar /> : null}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          width: '75%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
 
export default Layout;