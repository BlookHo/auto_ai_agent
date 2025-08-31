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
import { useSnackbar } from 'notistack';
import ProfileMenu from './ProfileMenu';
import LanguageSwitcher from './LanguageSwitcher';
import LlmMenu from './LlmMenu';
import Modal from './common/Modal';
import ModelSelection from './settings/ModelSelection';

// Mock data for LLM providers and their models
const LLM_PROVIDERS = [
  { 
    id: 'openai', 
    name: 'OpenAI', 
    requiresApiKey: true,
    models: [
      { id: 'gpt-4o', name: 'GPT-4o' },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' },
      { id: 'gpt-4', name: 'GPT-4' },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
    ]
  },
  // Add other providers as needed
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const { enqueueSnackbar } = useSnackbar();
  
  // Get the current path without the language prefix
  const currentPath = location.pathname.replace(new RegExp(`^/(${['en', 'ru', 'de'].join('|')})`), '') || '/';
  
  // Check if a path is the current active path
  const isActive = (path) => {
    return currentPath === path || currentPath === `${path}/`;
  };
  
  // Generate a localized path for navigation
  const getLocalizedPath = (path) => {
    if (!path) return `/${language}`;
    return `/${language}${path === '/' ? '' : path}`;
  };
  
  // Navigation items
  const navItems = useMemo(() => [
    { path: '/', label: t('nav.home') },
    { path: '/new', label: t('nav.newDiagnosis'), auth: true },
    // Profile link removed from navigation as per requirements
  ], [t]);
  
  // Handle navigation to a path
  const handleNavigate = (path) => {
    const targetPath = path === '/' ? `/${language}` : `/${language}${path}`;
    navigate(targetPath);
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
          
          {/* Main Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, ml: 4 }}>
            <LlmMenu onModelSelect={() => setIsModelModalOpen(true)} />
          </Box>
          
          {/* Model Selection Modal */}
          <Modal
            isOpen={isModelModalOpen}
            onClose={() => setIsModelModalOpen(false)}
            title="Select Model"
          >
            <ModelSelection
              models={LLM_PROVIDERS[0].models} // Using first provider's models for now
              selectedModel={selectedModel}
              onSelectModel={(modelId) => {
                setSelectedModel(modelId);
                enqueueSnackbar(`Model changed to: ${modelId}`, { variant: 'success' });
                setIsModelModalOpen(false);
              }}
            />
          </Modal>
          
          <Box sx={{ flexGrow: 1 }} />
          
          {/* Desktop Navigation */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' },
            gap: '8px',
            alignItems: 'center'
          }}>
            {/* Language Switcher - Desktop */}
            <Box sx={{ mr: 2 }}>
              <LanguageSwitcher />
            </Box>
            
            {user ? (
              <>
                <Typography variant="body2" sx={{ color: 'white', mr: 1 }}>
                  {user.name || user.email}
                </Typography>
                <ProfileMenu />
              </>
            ) : (
              <Button 
                color="inherit" 
                component={RouterLink} 
                to={getLocalizedPath('/login')}
                sx={{ 
                  ml: 2,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.common.white, 0.1),
                  },
                }}
              >
                {t('auth.login')}
              </Button>
            )}
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
