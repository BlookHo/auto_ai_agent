import React, { useState, useEffect, useRef, useCallback } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Box } from '@mui/material';

const ModelSelection = ({ 
  models = [], 
  selectedModel, 
  onSelectModel 
}) => {
  const listRef = useRef(null);
  const selectedIndex = models.findIndex(m => m.id === selectedModel);
  const [focusedIndex, setFocusedIndex] = useState(selectedIndex >= 0 ? selectedIndex : 0);

  // Update focused index when selected model changes
  useEffect(() => {
    if (selectedIndex >= 0) {
      setFocusedIndex(selectedIndex);
    }
  }, [selectedIndex]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => Math.min(prev + 1, models.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (models[focusedIndex]) {
          onSelectModel(models[focusedIndex].id);
        }
        break;
      case 'Escape':
        e.preventDefault();
        break;
      default:
        break;
    }
  }, [focusedIndex, models, onSelectModel]);

  // Handle wheel events
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    if (e.deltaY > 10) {
      setFocusedIndex(prev => Math.min(prev + 1, models.length - 1));
    } else if (e.deltaY < -10) {
      setFocusedIndex(prev => Math.max(prev - 1, 0));
    }
  }, [models.length]);

  // Set up wheel and focus
  useEffect(() => {
    const listElement = listRef.current;
    if (!listElement) return;

    listElement.addEventListener('wheel', handleWheel, { passive: false });
    listElement.focus();

    return () => {
      listElement.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  // Scroll to selected item
  useEffect(() => {
    if (listRef.current && focusedIndex >= 0) {
      const items = listRef.current.querySelectorAll('[role="listitem"]');
      if (items[focusedIndex]) {
        items[focusedIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [focusedIndex]);

  const handleSelect = (modelId) => {
    onSelectModel(modelId);
  };

  return (
    <Box 
      ref={listRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      sx={{
        outline: 'none',
        height: '100%',
        overflowY: 'auto',
        '&:focus': { outline: 'none' },
      }}
    >
        <List disablePadding>
          {models.map((model, index) => (
            <ListItem 
              key={model.id} 
              disablePadding
              onMouseEnter={() => setFocusedIndex(index)}
              role="listitem"
            >
              <ListItemButton 
                onClick={() => handleSelect(model.id)}
                selected={selectedModel === model.id}
                autoFocus={focusedIndex === index}
                sx={{
                  px: 3,
                  py: 1.5,
                  my: 0,
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <ListItemText 
                  primary={model.name} 
                  secondary={model.id}
                  primaryTypographyProps={{
                    color: selectedModel === model.id ? 'primary.contrastText' : 'text.primary',
                    fontWeight: selectedModel === model.id ? 600 : 400,
                  }}
                  secondaryTypographyProps={{
                    color: selectedModel === model.id ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary',
                    fontSize: '0.75rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
    </Box>
  );
};

export default React.memo(ModelSelection);
