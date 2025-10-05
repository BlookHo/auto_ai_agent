import React, { useState } from 'react';
import { 
  Button, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StorageIcon from '@mui/icons-material/Storage';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLanguage } from '../contexts/LanguageContext';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../contexts/LanguageContext';

const LlmMenu = ({ onModelSelect }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    if (path === '/llm/selection') {
      // Handle model selection directly if needed
      if (onModelSelect) {
        onModelSelect();
      }
    } else {
      // Get current language from URL or use default
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      const currentLang = pathSegments.length > 0 && SUPPORTED_LANGUAGES.includes(pathSegments[0]) 
        ? pathSegments[0] 
        : DEFAULT_LANGUAGE;
      
      // Navigate with language prefix
      navigate(`/${currentLang}${path}`);
    }
    handleClose();
  };

  const menuItems = [
    { 
      text: t('llm.selection', 'Model Selection'), 
      icon: <StorageIcon fontSize="small" />,
      path: '/llm/selection'
    },
    { 
      text: t('llm.logs', 'Logs'), 
      icon: <ListAltIcon fontSize="small" />,
      path: '/llm/logs'
    },
  ];

  return (
    <Box>
      <Button
        id="llm-menu-button"
        aria-controls={open ? 'llm-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
        sx={{
          color: 'white',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        LLM
      </Button>
      <Menu
        id="llm-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'llm-menu-button',
          sx: {
            minWidth: '200px',
            py: 0,
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {menuItems.map((item) => (
          <MenuItem 
            key={item.path} 
            onClick={() => handleMenuItemClick(item.path)}
            sx={{ py: 1.5, px: 2 }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LlmMenu;
