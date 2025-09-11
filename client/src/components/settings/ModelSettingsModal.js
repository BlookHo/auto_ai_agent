import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Slider,
  Button,
  Typography,
  Box,
  Stack,
  Tooltip
} from '@mui/material';

const ModelSettingsModal = ({ open, onClose, onSave, initialSettings = {} }) => {
  const [settings, setSettings] = useState({
    systemPrompt: initialSettings.systemPrompt || '',
    temperature: initialSettings.temperature || 0.2,
    // Add other settings here as needed
  });

  const handleChange = (field) => (event) => {
    const value = event.target ? event.target.value : event;
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    onSave(settings);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Conversation Settings</DialogTitle>
      <DialogContent>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
            System prompt
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={settings.systemPrompt}
            onChange={handleChange('systemPrompt')}
            placeholder="Type a text or «/» to use a prompt..."
            sx={{ mb: 3 }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 500, mr: 1 }}>
              Temperature: {settings.temperature.toFixed(1)}
            </Typography>
            <Tooltip 
              title="Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic."
              placement="top"
              arrow
            >
              <Box component="span" sx={{ display: 'inline-flex', cursor: 'pointer' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM8 13.8C4.8002 13.8 2.2 11.1998 2.2 8C2.2 4.8002 4.8002 2.2 8 2.2C11.1998 2.2 13.8 4.8002 13.8 8C13.8 11.1998 11.1998 13.8 8 13.8Z" fill="#9CA3AF"/>
                  <path d="M7.2 11.8H8.8V7.2H7.2V11.8ZM8 6.4C8.44183 6.4 8.8 6.04183 8.8 5.6C8.8 5.15817 8.44183 4.8 8 4.8C7.55817 4.8 7.2 5.15817 7.2 5.6C7.2 6.04183 7.55817 6.4 8 6.4Z" fill="#9CA3AF"/>
                </svg>
              </Box>
            </Tooltip>
          </Box>
          <Box sx={{ px: 2, mb: 3 }}>
            <Slider
              value={settings.temperature}
              onChange={handleChange('temperature')}
              min={0}
              max={1}
              step={0.1}
              marks
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => value.toFixed(1)}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: -1 }}>
              <Typography variant="caption" color="text.secondary">
                Precise
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Neutral
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Creative
              </Typography>
            </Box>
          </Box>

          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
            Addons (max 10)
          </Typography>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {}}
            sx={{ mb: 3 }}
          >
            See all addons
          </Button>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Apply changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModelSettingsModal;
