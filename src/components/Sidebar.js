import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Box, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = ({ activeComponent, setActiveComponent }) => {
  const [open, setOpen] = useState(false); // Initially collapsed

  const menuItems = ['Employee', 'User', 'Product'];

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: open ? 240 : 0, // Set the width when open
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: 'black',
            color: 'orange',
          },
        }}
      >
        <Toolbar /> {/* Spacer to align with header */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item}
              selected={activeComponent === item}
              onClick={() => setActiveComponent(item)}
            >
              <ListItemText primary={item} sx={{ color: 'orange' }} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Toggle Button on Top Corner */}
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          position: 'fixed',
          top: 10,
          left: 10,
          zIndex: 1301, // Ensure it stays above the header
          color: 'orange',
          backgroundColor: 'black',
          '&:hover': {
            backgroundColor: 'orange',
            color: 'black',
          },
        }}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
};

export default Sidebar;
