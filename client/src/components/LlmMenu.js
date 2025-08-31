import React, { useState } from 'react';
import { 
  Button, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Divider,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import StorageIcon from '@mui/icons-material/Storage';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLanguage } from '../contexts/LanguageContext';

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

  const handleMenuItemClick = (item) => {
    if (item.path) {
      if (item.path === '/llm/selection') {
        // Handle model selection directly if needed
        if (onModelSelect) {
          onModelSelect();
        }
      } else {
        navigate(item.path);
      }
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
      text: t('llm.settings', 'Settings'), 
      icon: <SettingsIcon fontSize="small" />,
      path: '/llm/settings'
    },
    { 
      text: t('llm.pricing', 'Pricing'), 
      icon: <AttachMoneyIcon fontSize="small" />,
      path: '/llm/pricing'
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
        {menuItems.map((item, index) => (
          <div key={item.path}>
            {index > 0 && <Divider />}
            <MenuItem onClick={() => handleMenuItemClick(item)}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText>{item.text}</ListItemText>
            </MenuItem>
          </div>
        ))}
      </Menu>
    </Box>
  );
};

export default LlmMenu;
