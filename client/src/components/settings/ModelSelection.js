import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ModelSelection = ({ 
  open, 
  onClose, 
  models = [], 
  selectedModel, 
  onSelectModel 
}) => {
  const { t } = useTranslation();

  const handleSelect = (modelId) => {
    onSelectModel(modelId);
    onClose();
  };

  return (
    <>
      {models.length > 0 ? (
        <List disablePadding>
          {models.map((model) => (
            <ListItem key={model.id} disablePadding>
              <ListItemButton 
                onClick={() => handleSelect(model.id)}
                selected={selectedModel === model.id}
                sx={{
                  px: 3,
                  py: 1.5,
                  my: 0.5,
                  borderRadius: 1,
                  '&.Mui-selected': {
                    bgcolor: 'primary.light',
                    '&:hover': {
                      bgcolor: 'primary.light',
                    },
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
                    color: selectedModel === model.id ? 'primary.contrastText' : 'text.secondary',
                    fontSize: '0.75rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Box p={3} textAlign="center">
          <Typography color="text.secondary">
            {t('settings.llm.noModelsAvailable')}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default React.memo(ModelSelection);
