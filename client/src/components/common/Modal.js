import React, { useEffect, useRef, useCallback } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Modal = React.forwardRef(({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  maxWidth = '500px',
  fullWidth = false,
  showCloseButton = true
}, ref) => {
  const modalRef = useRef(null);

  // Handle clicks outside the modal
  const handleClickOutside = useCallback((event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  }, [onClose]);

  // Handle keyboard events and outside clicks
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Add event listeners
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    
    // Set focus to modal when opened
    if (modalRef.current) {
      modalRef.current.focus();
    }
    
    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, handleClickOutside]);

  if (!isOpen) return null;

  return (
    <Box 
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1300,
        padding: 2,
        outline: 'none',
      }}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      ref={modalRef}
    >
      <Box 
        sx={{
          backgroundColor: (theme) => 
            theme.palette.mode === 'dark' 
              ? theme.palette.grey[800] 
              : theme.palette.grey[100],
          borderRadius: 2,
          width: fullWidth ? '90%' : 'auto',
          minWidth: '300px',
          maxWidth: maxWidth,
          maxHeight: 'calc(100vh - 120px)', // Account for header and spacing
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: 3,
          outline: 'none',
          position: 'absolute',
          top: '80px', // Position below header
          left: '50%',
          transform: 'translateX(-50%)',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          '@media (max-height: 600px)': {
            top: '20px', // Adjust for smaller screens
          },
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            backgroundColor: (theme) => 
              theme.palette.mode === 'dark' 
                ? theme.palette.grey[700] 
                : theme.palette.grey[200],
          }}
        >
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          {showCloseButton && (
            <IconButton 
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="close"
              size="small"
              sx={{
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>

        {/* Content */}
        <Box 
          sx={{
            overflowY: 'auto',
            p: 3,
            flex: 1,
            maxHeight: 'calc(100vh - 240px)', // Adjust based on header and content
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '3px',
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
});

Modal.displayName = 'Modal';

export default React.memo(Modal);
