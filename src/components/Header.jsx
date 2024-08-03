// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = ({ handleDrawerToggle }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Link Chat
      </Typography>
      <Button onClick={handleDrawerToggle} color="inherit">
        About
      </Button>
    </Toolbar>
  </AppBar>
);

export default Header;
