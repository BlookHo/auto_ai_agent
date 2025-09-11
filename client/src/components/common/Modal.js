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

  // Keep the modal in the DOM for the exit animation
  const [isMounted, setIsMounted] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      // Small timeout to allow the DOM to update before starting the animation
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      // Wait for the animation to complete before unmounting
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isMounted) return null;

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
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
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
          top: isVisible ? '80px' : '60px', // Start slightly higher and animate down
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
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
          <Typography variant="h5" component="h2" sx={{ fontSize: '1.5rem', fontWeight: 600 }}>
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
