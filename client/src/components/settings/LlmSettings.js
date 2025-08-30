import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField,
  Paper,
  Alert,
  Button,
  CircularProgress
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';

const LLM_PROVIDERS = [
  { id: 'openai', name: 'OpenAI', apiKeyRequired: true },
  { id: 'anthropic', name: 'Anthropic', apiKeyRequired: true },
  { id: 'llama', name: 'Llama 3 (Self-hosted)', apiKeyRequired: false },
  { id: 'mistral', name: 'Mistral', apiKeyRequired: true },
];

const LlmSettings = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    provider: 'openai',
    apiKey: '',
    model: 'gpt-4',
    temperature: 0.7,
  });
  const [models] = useState([]);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await api.get(`/api/v1/settings/llm/${settings.provider}`);
        if (response.data) {
          setSettings(prev => ({
            ...prev,
            ...response.data,
            apiKey: response.data.api_key || ''
          }));
        }
      } catch (error) {
        console.error('Failed to load LLM settings:', error);
        enqueueSnackbar('Failed to load LLM settings', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [enqueueSnackbar, settings.provider]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await api.put(`/api/v1/settings/llm/${settings.provider}`, {
        llm_setting: {
          provider: settings.provider,
          api_key: settings.apiKey,
          model: settings.model,
          temperature: parseFloat(settings.temperature)
        }
      });
      
      enqueueSnackbar(t('settings.llm.saveSuccess'), { variant: 'success' });
    } catch (error) {
      console.error('Failed to save LLM settings:', error);
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

  const selectedProvider = LLM_PROVIDERS.find(p => p.id === settings.provider) || LLM_PROVIDERS[0];

  return (
    <Paper elevation={2} sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        {t('settings.llm.title')}
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        {t('settings.llm.description')}
      </Alert>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="llm-provider-label">
            {t('settings.llm.provider')}
          </InputLabel>
          <Select
            labelId="llm-provider-label"
            id="provider"
            name="provider"
            value={settings.provider}
            label={t('settings.llm.provider')}
            onChange={handleChange}
            disabled={saving}
          >
            {LLM_PROVIDERS.map(provider => (
              <MenuItem key={provider.id} value={provider.id}>
                {provider.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedProvider.apiKeyRequired && (
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
          />
        )}

        <FormControl fullWidth margin="normal">
          <InputLabel id="llm-model-label">
            {t('settings.llm.model')}
          </InputLabel>
          <Select
            labelId="llm-model-label"
            id="model"
            name="model"
            value={settings.model}
            label={t('settings.llm.model')}
            onChange={handleChange}
            disabled={saving || !selectedProvider.apiKeyRequired}
          >
            {models.length > 0 ? (
              models.map(model => (
                <MenuItem key={model.id} value={model.id}>
                  {model.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="gpt-4">GPT-4</MenuItem>
            )}
          </Select>
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

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={saving}
            startIcon={saving ? <CircularProgress size={20} /> : null}
          >
            {saving ? t('common.saving') : t('common.save')}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default LlmSettings;
