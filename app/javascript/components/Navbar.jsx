import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { UserOutlined, HomeOutlined, PlusCircleOutlined, LogoutOutlined } from '@ant-design/icons';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const isActive = (path) => location.pathname === path;
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsAuthenticated(false);
          return;
        }
        
        // Check if user is authenticated and get user data
        const response = await fetch('/api/v1/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const userData = await response.json();
          setIsAuthenticated(true);
          setIsAdmin(userData.role === 'admin');
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      }
    };
    
    checkAuth();
  }, [location]);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate('/');
  };

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
            {isAuthenticated ? (
              <>
                <Button 
                  component={RouterLink} 
                  to="/"
                  startIcon={<HomeOutlined />}
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
                  Dashboard
                </Button>
                
                <Button 
                  component={RouterLink} 
                  to="/new"
                  startIcon={<PlusCircleOutlined />}
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
                
                {isAdmin && (
                  <Button 
                    component={RouterLink} 
                    to="/users"
                    startIcon={<UserOutlined />}
                    sx={{
                      color: isActive('/users') ? 'white' : 'rgba(255, 255, 255, 0.7)',
                      backgroundColor: isActive('/users') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
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
                    Users
                  </Button>
                )}
                
                <Button 
                  onClick={handleLogout}
                  startIcon={<LogoutOutlined />}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
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
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                component={RouterLink} 
                to="/login"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
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
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
