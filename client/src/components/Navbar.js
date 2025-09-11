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
  alpha,
  Menu,
  MenuItem
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
import ModelSettingsModal from './settings/ModelSettingsModal';

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
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [modelMenuAnchor, setModelMenuAnchor] = useState(null);
  const [modelSettings, setModelSettings] = useState({
    systemPrompt: '',
    temperature: 0.2,
    // Add other settings here as needed
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleModelMenuOpen = (event) => {
    setModelMenuAnchor(event.currentTarget);
  };

  const handleModelMenuClose = () => {
    setModelMenuAnchor(null);
  };

  const handleSettingsClick = () => {
    setIsSettingsModalOpen(true);
    handleModelMenuClose();
  };

  const handleSaveSettings = (newSettings) => {
    setModelSettings(newSettings);
    enqueueSnackbar('Settings saved successfully', { variant: 'success' });
  };
  
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
        <Typography variant="h5" component="div" sx={{ fontWeight: 600, fontSize: '1.5rem' }}>
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
                      fontSize: '1.1rem',
                      py: 1
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
        <Toolbar 
          disableGutters 
          sx={{ 
            minHeight: '64px !important', 
            px: { xs: 2, sm: 3 },
            '& .MuiTypography-root': {
              fontSize: { xs: '0.95rem', sm: '1.05rem' }, // Slightly larger on desktop
            },
            '& .MuiButton-root': {
              fontSize: '1.15rem',
              textTransform: 'none',
              fontWeight: 500,
              lineHeight: 1.2,
            },
            '& .MuiSvgIcon-root': {
              fontSize: { xs: '1.4rem', sm: '1.5rem' },
            },
            // Brand/logo specific styling
            '& .MuiTypography-h6': {
              fontSize: { xs: '1.5rem', sm: '1.75rem' },
              background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              textShadow: (theme) => `0 0 8px ${theme.palette.primary.light}40`,
              transition: 'all 0.3s ease',
              '&:hover': {
                background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                textShadow: (theme) => `0 0 12px ${theme.palette.primary.light}80`,
                transform: 'scale(1.02)',
              },
              // Ensure good contrast on dark backgrounds
              '@media (prefers-contrast: more)': {
                WebkitTextStroke: '0.5px white',
              }
            },
            // Selected model display
            '& .MuiTypography-subtitle2': {
              fontSize: '1.15rem',
              fontWeight: 500,
            },
            // User menu items
            '& .MuiMenuItem-root': {
              fontSize: '1rem',
              '& .MuiSvgIcon-root': {
                fontSize: '1.25rem',
              }
            },
            // Username text
            '& .MuiTypography-body1': {
              fontSize: '1.15rem !important',
              fontWeight: 500,
            }
          }}
        >
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
              fontSize: '1.75rem',
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
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, ml: 4, '& .MuiButton-root': { fontSize: '1rem' } }}>
            <LlmMenu onModelSelect={() => setIsModelModalOpen(true)} />
          </Box>
          
          {/* Selected Model with Dropdown */}
          <Box sx={{ 
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
          }}>
            <Box 
              onClick={handleModelMenuOpen}
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                px: 2,
                py: 0.75,
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                },
              }}
            >
              <Box sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: 'success.main',
                mr: 1
              }} />
              <Typography variant="subtitle2" sx={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 500,
                fontSize: '1rem',
                whiteSpace: 'nowrap',
                textTransform: 'none'
              }}>
                {selectedModel}
              </Typography>
            </Box>
            
            {/* Model Menu */}
            <Menu
              anchorEl={modelMenuAnchor}
              open={Boolean(modelMenuAnchor)}
              onClose={handleModelMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <MenuItem onClick={handleSettingsClick}>
                <ListItemText>Settings</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleModelMenuClose}>
                <ListItemText>Pricing</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleModelMenuClose}>
                <ListItemText>Addons</ListItemText>
              </MenuItem>
            </Menu>
            
            {/* Settings Modal */}
            <ModelSettingsModal
              open={isSettingsModalOpen}
              onClose={() => setIsSettingsModalOpen(false)}
              onSave={handleSaveSettings}
              initialSettings={modelSettings}
            />
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
                <Typography variant="body1" sx={{ color: 'white', mr: 1, fontSize: '1rem' }}>
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
                  fontSize: '1rem',
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
