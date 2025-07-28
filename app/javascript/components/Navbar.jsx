import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <AppBar 
      position="static" 
      elevation={0} 
      sx={{ 
        backgroundColor: '#202123',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        height: '60px',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth={false}>
        <Toolbar disableGutters sx={{ minHeight: '60px !important' }}>
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/" 
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              color: 'white',
              fontWeight: 600,
              fontSize: '1.25rem',
              '&:hover': {
                opacity: 0.9
              }
            }}
          >
            AI Car Diagnostics
          </Typography>
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <Button 
              component={RouterLink} 
              to="/"
              sx={{
                color: isActive('/') ? 'white' : 'rgba(255, 255, 255, 0.7)',
                backgroundColor: isActive('/') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white'
                },
                borderRadius: '4px',
                padding: '6px 12px',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.875rem'
              }}
            >
              Home
            </Button>
            <Button 
              component={RouterLink} 
              to="/new"
              sx={{
                color: isActive('/new') ? 'white' : 'rgba(255, 255, 255, 0.7)',
                backgroundColor: isActive('/new') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white'
                },
                borderRadius: '4px',
                padding: '6px 12px',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.875rem'
              }}
            >
              New Diagnosis
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
