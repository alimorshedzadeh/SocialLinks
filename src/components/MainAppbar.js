import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DarkSwitch from './DarkSwitch'
import Avatar from '@mui/material/Avatar';
export default function MainAppbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute" color="transparent" sx={{boxShadow:'none'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
             <MenuIcon  color="commen"/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <DarkSwitch/>
          <Avatar sx={{mr:2}} src="/avatar.jpg">L</Avatar>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
