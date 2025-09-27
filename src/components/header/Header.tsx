import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
 
const Header: React.FC = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#d32f2f',
        zIndex: 1201,
        height: '45px',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '45px',
          '@media (min-width:600px)': {
            minHeight: '45px !important',
          },
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            ExxonMobil
          </Typography>
          <Box
            sx={{
              height: 24,
              borderLeft: '1px solid white',
              mx: 2,
            }}
          />
          <Typography variant="body1">Novaflow</Typography>
        </Box>
 
        {/* Right Icons */}
        <Box>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit">
            <HelpOutlineIcon />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
 
export default Header;
 
 