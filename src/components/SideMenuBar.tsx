import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ReportIcon from '@mui/icons-material/Report';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';


const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        ['& .MuiDrawer-paper']: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f0d0d2',
          paddingTop: '64px', // space for header
          color: '#5A5A5A',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {[
            { text: 'Dashboard', icon: <DashboardIcon />, navigateTo: '/dashboard' },
            { text: 'T-Min', icon: <AssignmentIcon />, navigateTo: '/Tmin/review' },
             { text: 'Trainings', icon: <ReportIcon /> },
            { text: 'Reports', icon: <ReportIcon /> },
            { text: 'Tickets Status', icon: <NotificationsIcon /> },
            { text: 'Profile', icon: <PersonIcon /> },
            { text: 'Setting', icon: <SettingsIcon /> },
          ].map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => item.navigateTo && navigate(item.navigateTo)}
              selected={window.location.pathname === item.navigateTo}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#D5010B',
                  color: 'white',
                  '& .MuiListItemIcon-root': { color: 'white' },
                },
                '&:hover': {
                  backgroundColor: '#D5010B',
                  color: 'white',
                  '& .MuiListItemIcon-root': { color: 'white' },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

