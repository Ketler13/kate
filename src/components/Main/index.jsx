import { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Container from '@mui/material/Container';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Outlet } from 'react-router-dom';

import AppBar from '../AppBar';
import Drawer from '../Drawer';
import Header from '../Header';
import MainNav from '../MainNav';

function Main() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <Box sx={{ display: 'flex' }}>
        <AppBar position="absolute" open={open}>
          <Header toggleDrawer={toggleDrawer} />
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainNav />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container sx={{ mt: 4, mb: 4 }} maxWidth={null}>
            <Outlet />
          </Container>
        </Box>
      </Box>
  );
}

export default Main;