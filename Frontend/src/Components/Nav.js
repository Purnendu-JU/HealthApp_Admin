import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Nav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          {/* Logo and Title Container */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img
              src="/favicon.ico"
              alt="PocketCare Logo"
              style={{ width: 40, height: 40, marginRight: 10 }}
            />
            <Typography variant="h5" component="div">
              PocketCare Admin Console
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              onClick={() => navigate('/create-account')}
              sx={{
                backgroundColor: 'green',
                color: 'white',
                border: '2px solid green',
                borderRadius: '8px',
                textTransform: 'none',
                paddingX: 2,
                '&:hover': {
                  backgroundColor: '#006400',
                },
              }}
            >
              Create an admin account
            </Button>

            <Button
              onClick={handleLogout}
              sx={{
                backgroundColor: 'red',
                color: 'white',
                border: '2px solid red',
                borderRadius: '8px',
                textTransform: 'none',
                paddingX: 2,
                '&:hover': {
                  backgroundColor: '#cc0000',
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Nav;
