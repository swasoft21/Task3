import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = ({ activeComponent, setActiveComponent }) => {
  const [open, setOpen] = useState(false);

  const menuItems = ['Employee', 'User', 'Product'];

  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton onClick={() => setOpen(!open)}>
        <MenuIcon sx={{ color: 'orange' }} />
      </IconButton>
      <Drawer variant="persistent" open={open} sx={{ width: 240 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item}
              selected={activeComponent === item}
              onClick={() => setActiveComponent(item)}
            >
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
