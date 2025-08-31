import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Box, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField, 
  Typography, 
  CircularProgress,
  Slider,
  FormHelperText,
  IconButton,
  InputAdornment
} from '@mui/material';
import { useSnackbar } from 'notistack';
import ModelSelection from './ModelSelection';
import Modal from '../common/Modal';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Mock data for LLM providers and their models
const LLM_PROVIDERS = [
  { 
    id: 'openai', 
    name: 'OpenAI', 
    requiresApiKey: true,
    models: [
      { id: 'gpt-4o', name: 'GPT-4o' },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' },
      { id: 'gpt-4', name: 'GPT-4' },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
    ]
  },
  { 
    id: 'anthropic', 
    name: 'Anthropic', 
    requiresApiKey: true,
    models: [
      { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus' },
      { id: 'claude-3-sonnet-20240229', name: 'Claude 3 Sonnet' },
      { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku' },
    ]
  },
  { 
    id: 'local', 
    name: 'Local Model', 
    requiresApiKey: false,
    models: [
      { id: 'local-llm', name: 'Local LLM' },
    ]
  }
];

const LlmSettings = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  
  // State management
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  
  // Settings state
  const [settings, setSettings] = useState({
    provider: '',
    model: '',
    apiKey: '',
    temperature: 0.7,
    baseUrl: ''
  });
  
  const [availableModels, setAvailableModels] = useState([]);
  const selectedProvider = LLM_PROVIDERS.find(p => p.id === settings.provider) || LLM_PROVIDERS[0];

  // Load available models when provider changes
  useEffect(() => {
    const loadModels = () => {
      if (!settings.provider) return;
      
      console.log('Loading models for provider:', settings.provider);
      const provider = LLM_PROVIDERS.find(p => p.id === settings.provider);
      if (provider) {
        console.log('Found provider, setting models:', provider.models);
        setAvailableModels(provider.models || []);
        
        // Auto-select the first model if none is selected
        if (!settings.model && provider.models.length > 0) {
          console.log('Auto-selecting first model:', provider.models[0].id);
          setSettings(prev => ({
            ...prev,
            model: provider.models[0].id
          }));
        }
      }
    };

    loadModels();
  }, [settings.provider]);

  // Load settings on mount
  useEffect(() => {
    console.log('Initial load of settings');
    // Simulate loading settings
    setTimeout(() => {
      setSettings({
        provider: 'openai',
        model: 'gpt-4o',
        apiKey: '',
        temperature: 0.7,
        baseUrl: ''
      });
      setLoading(false);
    }, 500);
  }, []); // Empty dependency array means this runs once on mount

  const handleSelectModel = (modelId) => {
    console.log('Selected model:', modelId);
    setSettings(prev => ({
      ...prev,
      model: modelId
    }));
    setIsModelModalOpen(false);
  };

  const handleOpenModelModal = (event) => {
    event?.stopPropagation();
    if (!settings.provider) {
      enqueueSnackbar(t('settings.llm.errors.selectProviderFirst'), { variant: 'warning' });
      return;
    }
    setIsModelModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Setting ${name} to:`, value);
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      console.log('Saving settings:', settings);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      enqueueSnackbar(t('settings.llm.settingsSaved'), { variant: 'success' });
    } catch (error) {
      console.error('Error saving settings:', error);
      enqueueSnackbar(t('settings.llm.saveError'), { variant: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', minHeight: '100%' }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t('settings.llm.title')}
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="llm-provider-label">{t('settings.llm.provider')}</InputLabel>
            <Select
              labelId="llm-provider-label"
              id="provider"
              name="provider"
              value={settings.provider}
              onChange={handleChange}
              label={t('settings.llm.provider')}
              disabled={saving}
            >
              {LLM_PROVIDERS.map((provider) => (
                <MenuItem key={provider.id} value={provider.id}>
                  {provider.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedProvider?.requiresApiKey && (
            <TextField
              fullWidth
              margin="normal"
              id="apiKey"
              name="apiKey"
              label={t('settings.llm.apiKey')}
              type="password"
              value={settings.apiKey}
              onChange={handleChange}
              disabled={saving}
              helperText={t('settings.llm.apiKeyHelper')}
              InputProps={{
                endAdornment: settings.apiKey && (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => {
                        setSettings(prev => ({ ...prev, apiKey: '' }));
                      }}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <Typography variant="caption" color="textSecondary">
                        {t('common.clear')}
                      </Typography>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}

          {selectedProvider?.id === 'local' && (
            <TextField
              fullWidth
              margin="normal"
              id="baseUrl"
              name="baseUrl"
              label={t('settings.llm.baseUrl')}
              value={settings.baseUrl}
              onChange={handleChange}
              disabled={saving}
              placeholder="http://localhost:11434/v1"
              helperText={t('settings.llm.baseUrlHelper')}
            />
          )}

          {/* Model Selection */}
          <FormControl fullWidth margin="normal" variant="outlined">
            <TextField
              label={t('settings.llm.model')}
              value={settings.model ? 
                LLM_PROVIDERS
                  .flatMap(p => p.models)
                  .find(m => m.id === settings.model)?.name || settings.model 
                : ''
              }
              onClick={handleOpenModelModal}
              disabled={!settings.provider || loading}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={handleOpenModelModal}>
                      <ArrowDropDownIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  cursor: 'pointer',
                },
              }}
            />
            <FormHelperText>
              {t('settings.llm.clickToSelectModel')}
            </FormHelperText>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            id="temperature"
            name="temperature"
            label={t('settings.llm.temperature')}
            type="number"
            inputProps={{
              min: 0,
              max: 2,
              step: 0.1
            }}
            value={settings.temperature}
            onChange={handleChange}
            disabled={saving}
            helperText={t('settings.llm.temperatureHelper')}
          />

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={saving}
              startIcon={saving ? <CircularProgress size={20} /> : null}
            >
              {saving ? t('common.saving') : t('common.saveChanges')}
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Model Selection Modal */}
      <Modal
        isOpen={isModelModalOpen}
        onClose={() => setIsModelModalOpen(false)}
        title={t('settings.llm.selectModel')}
      >
        <ModelSelection
          models={LLM_PROVIDERS.find(p => p.id === settings.provider)?.models || []}
          selectedModel={settings.model}
          onSelectModel={handleSelectModel}
        />
      </Modal>
    </Box>
  );
};

export default LlmSettings;
