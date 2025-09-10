import React, { useEffect, useCallback } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Button, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ModelSelectionModal = ({ 
  open, 
  onClose, 
  models = [], 
  selectedModel, 
  onSelectModel 
}) => {
  const { t } = useTranslation();

  // Handle closing the modal
  const handleClose = useCallback((e) => {
    e?.stopPropagation();
    document.body.style.overflow = 'unset';
    onClose();
  }, [onClose]);

  // Handle model selection
  const handleSelect = useCallback((modelId) => {
    onSelectModel(modelId);
    handleClose();
  }, [onSelectModel, handleClose]);

  // Handle keyboard events
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose(e);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [open, handleClose]);

  if (!open) return null;

  return (
    <div 
      style={{
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
        padding: '20px',
      }}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        style={{
          backgroundColor: '#1a2027',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '500px',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ 
          padding: '16px 24px', 
          borderBottom: '1px solid #2d3748',
          backgroundColor: '#1e293b'
        }}>
          <Typography variant="h6" style={{ color: 'white', margin: 0 }}>
            {t('settings.llm.selectModel')}
          </Typography>
        </div>
        
        <div style={{ 
          overflowY: 'auto',
          maxHeight: 'calc(80vh - 120px)',
          padding: '8px 0'
        }}>
          {models.length > 0 ? (
            <List>
              {models.map((model) => (
                <ListItem key={model.id} disablePadding>
                  <ListItemButton 
                    onClick={() => handleSelect(model.id)}
                    selected={selectedModel === model.id}
                    style={{
                      padding: '12px 24px',
                      margin: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: selectedModel === model.id ? 'rgba(66, 165, 245, 0.1)' : 'transparent',
                      borderLeft: selectedModel === model.id ? '3px solid #42a5f5' : '3px solid transparent'
                    }}
                  >
                    <ListItemText 
                      primary={model.name} 
                      secondary={model.id}
                      primaryTypographyProps={{
                        style: {
                          color: selectedModel === model.id ? '#90caf9' : 'white',
                          fontWeight: selectedModel === model.id ? 600 : 400
                        }
                      }}
                      secondaryTypographyProps={{
                        style: {
                          color: selectedModel === model.id ? '#90caf9' : '#9e9e9e',
                          fontSize: '0.75rem'
                        }
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Box p={3} textAlign="center">
              <Typography color="textSecondary">
                {t('settings.llm.noModelsAvailable')}
              </Typography>
            </Box>
          )}
        </div>
        
        <div style={{
          padding: '12px 24px',
          borderTop: '1px solid #2d3748',
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: '#1e293b'
        }}>
          <Button 
            onClick={handleClose}
            style={{
              color: '#90caf9',
              textTransform: 'none',
              fontWeight: 500,
              padding: '6px 16px',
              borderRadius: '4px',
            }}
          >
            {t('common.close')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ModelSelectionModal);
