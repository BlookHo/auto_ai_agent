import React, { useState, useEffect, useRef, useCallback } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import Modal from './Modal';

const SelectableListModal = ({
  isOpen,
  onClose,
  title,
  items = [],
  selectedItemId,
  onSelectItem,
  getItemLabel = (item) => item?.name || item?.id || '',
  maxWidth = '500px',
  emptyMessage = 'No items available'
}) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const listRef = useRef(null);

  // Update focused index when selected item changes
  useEffect(() => {
    if (selectedItemId && items.length > 0) {
      const index = items.findIndex(item => item.id === selectedItemId);
      setFocusedIndex(Math.max(0, index));
    }
  }, [selectedItemId, items]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => Math.min(prev + 1, items.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && items[focusedIndex]) {
          onSelectItem(items[focusedIndex].id);
        }
        break;
      default:
        break;
    }
  }, [isOpen, items, focusedIndex, onSelectItem]);

  // Handle wheel events for navigation
  const handleWheel = useCallback((e) => {
    if (!isOpen) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    if (e.deltaY > 0) {
      // Scrolling down
      setFocusedIndex(prev => Math.min(prev + 1, items.length - 1));
    } else if (e.deltaY < 0) {
      // Scrolling up
      setFocusedIndex(prev => Math.max(prev - 1, 0));
    }
  }, [isOpen, items.length]);

  // Scroll the selected item into view
  useEffect(() => {
    if (isOpen && listRef.current && focusedIndex >= 0) {
      const selectedElement = listRef.current.children[focusedIndex]?.firstChild;
      selectedElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [focusedIndex, isOpen]);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth={maxWidth}
    >
      <div 
        ref={listRef}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
        tabIndex={0}
        style={{
          outline: 'none',
          maxHeight: '60vh',
          overflowY: 'auto',
          padding: '8px 0',
          scrollBehavior: 'smooth',
          '&:focus': {
            outline: '2px solid #42a5f5',
          }
        }}
      >
        {items.length === 0 ? (
          <Typography variant="body1" style={{ padding: '16px', textAlign: 'center' }}>
            {emptyMessage}
          </Typography>
        ) : (
          <List disablePadding>
            {items.map((item, index) => (
              <ListItem 
                key={item.id} 
                disablePadding
                onMouseEnter={() => setFocusedIndex(index)}
              >
                <ListItemButton
                  selected={focusedIndex === index}
                  onClick={() => onSelectItem(item.id)}
                  style={{
                    width: '100%',
                    backgroundColor: focusedIndex === index ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                  }}
                >
                  <ListItemText 
                    primary={getItemLabel(item)} 
                    primaryTypographyProps={{
                      color: selectedItemId === item.id ? 'primary' : 'textPrimary',
                      fontWeight: selectedItemId === item.id ? 'bold' : 'normal'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </Modal>
  );
};

export default React.memo(SelectableListModal);
