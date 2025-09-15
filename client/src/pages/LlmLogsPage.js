import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { format, subDays, parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const LlmLogsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState('');
  const [timeRange, setTimeRange] = useState('24h');
  const [startDate, setStartDate] = useState(subDays(new Date(), 1));
  const [endDate, setEndDate] = useState(new Date());

  // Mock function to fetch logs
  const fetchLogs = async () => {
    setLoading(true);
    try {
      // In a real app, you would fetch logs from your API
      // const response = await fetch(`/api/llm/logs?start=${startDate.toISOString()}&end=${endDate.toISOString()}`);
      // const data = await response.json();
      
      // Mock data for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockLogs = Array(50).fill(0).map((_, i) => 
        `${new Date().toISOString()} - Log entry ${i + 1}: This is a sample log message.`
      ).join('\n');
      
      setLogs(mockLogs);
    } catch (error) {
      console.error('Error fetching logs:', error);
      setLogs('Error loading logs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle time range change
  const handleTimeRangeChange = (event) => {
    const value = event.target.value;
    setTimeRange(value);
    
    const now = new Date();
    let newStartDate = new Date();
    
    switch (value) {
      case '1h':
        newStartDate.setHours(now.getHours() - 1);
        break;
      case '24h':
        newStartDate = subDays(now, 1);
        break;
      case '7d':
        newStartDate = subDays(now, 7);
        break;
      case '30d':
        newStartDate = subDays(now, 30);
        break;
      case 'custom':
        // Keep the current date range
        return;
      default:
        newStartDate = subDays(now, 1);
    }
    
    setStartDate(newStartDate);
    setEndDate(now);
  };

  // Handle date changes
  const handleStartDateChange = (event) => {
    setTimeRange('custom');
    setStartDate(parseISO(event.target.value));
  };

  const handleEndDateChange = (event) => {
    setTimeRange('custom');
    setEndDate(parseISO(event.target.value));
  };

  // Load logs when component mounts or date range changes
  useEffect(() => {
    fetchLogs();
  }, [startDate, endDate]);

  const handleBack = () => {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const currentLang = pathSegments.length > 0 && SUPPORTED_LANGUAGES.includes(pathSegments[0]) 
      ? pathSegments[0] 
      : DEFAULT_LANGUAGE;
    navigate(`/${currentLang}`);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mr: 2 }}
        >
          {t('common.back', 'Back')}
        </Button>
        <Typography variant="h4" gutterBottom sx={{ mb: 0 }}>
          {t('llm.logs', 'LLM Logs')}
        </Typography>
      </Box>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="time-range-label">Time Range</InputLabel>
            <Select
              labelId="time-range-label"
              value={timeRange}
              label="Time Range"
              onChange={handleTimeRangeChange}
            >
              <MenuItem value="1h">Last hour</MenuItem>
              <MenuItem value="24h">Last 24 hours</MenuItem>
              <MenuItem value="7d">Last 7 days</MenuItem>
              <MenuItem value="30d">Last 30 days</MenuItem>
              <MenuItem value="custom">Custom range</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            label="Start Date"
            type="datetime-local"
            value={format(startDate, "yyyy-MM-dd'T'HH:mm")}
            onChange={handleStartDateChange}
            disabled={timeRange !== 'custom'}
            InputLabelProps={{
              shrink: true,
            }}
          />
          
          <TextField
            label="End Date"
            type="datetime-local"
            value={format(endDate, "yyyy-MM-dd'T'HH:mm")}
            onChange={handleEndDateChange}
            disabled={timeRange !== 'custom'}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              max: format(new Date(), "yyyy-MM-dd'T'HH:mm")
            }}
          />
          
          <Button 
            variant="contained" 
            onClick={fetchLogs}
            disabled={loading}
            sx={{ ml: 'auto' }}
          >
            {loading ? <CircularProgress size={24} /> : 'Refresh'}
          </Button>
        </Box>
      </Paper>
        
        <Paper sx={{ p: 2, height: '60vh', overflow: 'hidden' }}>
          <TextField
            fullWidth
            multiline
            variant="outlined"
            value={loading ? 'Loading logs...' : logs}
            InputProps={{
              readOnly: true,
              style: {
                height: '100%',
                overflowY: 'auto',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                lineHeight: 1.5,
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: '100%',
                alignItems: 'flex-start',
              },
              '& textarea': {
                height: '100% !important',
                overflowY: 'auto !important',
              },
            }}
          />
        </Paper>
    </Box>
  );
};

export default LlmLogsPage;
