import React, { useState, useMemo } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container, 
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  alpha
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import ProfileMenu from './ProfileMenu';
import LanguageSwitcher from './LanguageSwitcher';
import { localizePath } from '../utils/routing';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Navigation items
  const navItems = useMemo(() => [
    { path: '/', label: 'nav.home' },
    { path: '/new', label: 'nav.newDiagnosis', auth: true },
  ], []);
  
  // Check if a path is active (supports language prefixes)
  const isActive = (path) => {
    // Remove language prefix for comparison
    const currentPath = location.pathname.replace(new RegExp(`^/(${['en', 'ru', 'de'].join('|')})`), '');
    const normalizedPath = path === '/' ? '' : path;
    return currentPath === normalizedPath || currentPath === `${normalizedPath}/`;
  };
  
  // Generate a localized path for navigation
  const getLocalizedPath = (path) => {
    return localizePath(path, language);
  };
  
  // Handle navigation to a path
  const handleNavigate = (path) => {
    navigate(getLocalizedPath(path));
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  // Mobile menu drawer
  const drawer = (
    <Box
      sx={{
        width: 280,
        height: '100%',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
      }}
      role="presentation"
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        p: 2,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`
      }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          Menu
        </Typography>
        <IconButton onClick={() => setMobileMenuOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Box sx={{ p: 2, mb: 2 }}>
        <LanguageSwitcher fullWidth />
      </Box>
      
      <Divider />
      
      <List sx={{ flex: 1, overflowY: 'auto' }}>
        {navItems.map((item) => {
          // Skip auth-protected items if user is not logged in
          if (item.auth && !user) return null;
          
          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton 
                selected={isActive(item.path)}
                onClick={() => handleNavigate(item.path)}
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  '&.Mui-selected': {
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    '&:hover': {
                      backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.15),
                    },
                  },
                }}
              >
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: isActive(item.path) ? 600 : 400,
                      color: isActive(item.path) ? 'primary.main' : 'text.primary',
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      
      <Divider />
      
      <Box sx={{ p: 2 }}>
        <ProfileMenu mobile />
      </Box>
    </Box>
  );

  return (
    <AppBar 
      position="sticky"
      elevation={0}
      sx={{ 
        backgroundColor: 'transparent',
        backgroundImage: 'linear-gradient(180deg, #202123 0%, rgba(32, 33, 35, 0.8) 100%)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        height: '64px',
        display: 'flex',
        justifyContent: 'center',
        transition: 'all 0.2s ease-in-out',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: '1600px !important' }}>
        <Toolbar disableGutters sx={{ minHeight: '64px !important', px: { xs: 2, sm: 3 } }}>
          {/* Mobile menu button */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setMobileMenuOpen(true)}
            sx={{ 
              display: { xs: 'flex', md: 'none' },
              mr: 1,
              color: 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo / Brand */}
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to={getLocalizedPath('/')}
            sx={{ 
              textDecoration: 'none',
              background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              fontSize: '1.5rem',
              fontFamily: 'Söhne, ui-sans-serif, system-ui, -apple-system, sans-serif',
              '&:hover': {
                opacity: 0.9
              },
              lineHeight: 1.2,
            }}
          >
            AI Car Diagnostics
          </Typography>
          
          <Box sx={{ flexGrow: 1 }} />
          
          {/* Desktop Navigation */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' },
            gap: '8px',
            alignItems: 'center'
          }}>
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Navigation Links */}
            {navItems.map((item) => {
              // Skip auth-protected items if user is not logged in
              if (item.auth && !user) return null;
              
              return (
                <Button 
                  key={item.path}
                  component={RouterLink}
                  to={getLocalizedPath(item.path)}
                  sx={{
                    color: isActive(item.path) ? 'white' : 'rgba(255, 255, 255, 0.8)',
                    backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white'
                    },
                    borderRadius: '6px',
                    padding: '8px 16px',
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '0.9375rem',
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
            
            <ProfileMenu />
          </Box>
        </Toolbar>
      </Container>
      
      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            backgroundColor: (theme) => theme.palette.background.paper,
          },
          display: { xs: 'block', md: 'none' },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
