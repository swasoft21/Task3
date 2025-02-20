import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Clear login state
    navigate('/login'); // Redirect to login page
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ color: 'orange' }}>
          Admin Dashboard
        </Typography>
        <Button
          onClick={handleLogout}
          sx={{
            color: 'orange',
            border: '1px solid orange',
            textTransform: 'none',
            padding: '6px 12px',
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
