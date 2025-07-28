import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Box, 
  Button, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  Typography,
  useTheme,
  Divider
} from '@mui/material';
import { 
  Language as LanguageIcon,
  Check as CheckIcon
} from '@mui/icons-material';

const languages = [
  { code: 'ru', name: 'Русский' },
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
];

const LanguageSwitcher = () => {
  const { language: currentLanguage, setLanguage } = useLanguage();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    handleClose();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
      <Button
        onClick={handleClick}
        size="small"
        color="inherit"
        startIcon={<LanguageIcon />}
        sx={{
          textTransform: 'none',
          color: 'inherit',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
          minWidth: 'auto',
          px: 1.5,
          py: 0.5,
        }}
      >
        {languages.find(lang => lang.code === currentLanguage)?.code.toUpperCase() || 'RU'}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            minWidth: 180,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Select Language
          </Typography>
        </Box>
        <Divider />
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            selected={currentLanguage === lang.code}
            dense
            sx={{
              py: 1,
              px: 2,
              '&.Mui-selected': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selected',
                },
              },
            }}
          >
            <ListItemIcon>
              {currentLanguage === lang.code && (
                <CheckIcon fontSize="small" color="primary" />
              )}
            </ListItemIcon>
            <Typography variant="body2">
              {lang.name}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{
                fontFamily: 'monospace',
                bgcolor: theme.palette.mode === 'light' 
                  ? 'rgba(0, 0, 0, 0.04)' 
                  : 'rgba(255, 255, 255, 0.08)',
                px: 1,
                py: 0.25,
                borderRadius: 1,
                fontSize: '0.7rem',
                letterSpacing: 0.5,
              }}
            >
              {lang.code.toUpperCase()}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;
