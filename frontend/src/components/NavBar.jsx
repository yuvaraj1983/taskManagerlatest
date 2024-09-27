import React from 'react';
import AppBar from "@mui/material/AppBar";
import { Box, Toolbar, Typography } from '@mui/material';


const NavBar = () => {
  return (
  <Box sx={{flexGrow: 1}}>
    <AppBar position='static'>
        <Toolbar>
            <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                Task Manager
            </Typography>
        </Toolbar>
    </AppBar>

  </Box>
  )
}

export default NavBar