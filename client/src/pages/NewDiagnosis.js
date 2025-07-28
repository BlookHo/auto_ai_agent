import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';
import SendIcon from '@mui/icons-material/Send';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Paper, 
  IconButton,
  Avatar,
  Grid,
  CircularProgress
} from '@mui/material';

const NewDiagnosis = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI car diagnostic assistant. Please describe the symptoms you\'re experiencing with your car. Be as detailed as possible.'
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleInfo, setVehicleInfo] = useState({
    make: '',
    model: '',
    year: '',
    vin: '',
    mileage: ''
  });
  
  const messagesEndRef = useRef(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/new' } });
    }
  }, [user, navigate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleVehicleInfoChange = (e) => {
    const { name, value } = e.target;
    setVehicleInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate API call
      setTimeout(() => {
        const botResponse = {
          role: 'assistant',
          content: `I've received your message about: "${input}". In a real implementation, I would analyze your vehicle's symptoms and provide a diagnosis.`
        };
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 600,
            mb: 1,
            background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}
        >
          New Car Diagnosis
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Fill in the details below to start a new diagnosis
        </Typography>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          mb: 4,
          p: 4, 
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Vehicle Information</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Make"
              name="make"
              value={vehicleInfo.make}
              onChange={handleVehicleInfoChange}
              variant="outlined"
              size="small"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Model"
              name="model"
              value={vehicleInfo.model}
              onChange={handleVehicleInfoChange}
              variant="outlined"
              size="small"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Year"
              name="year"
              type="number"
              value={vehicleInfo.year}
              onChange={handleVehicleInfoChange}
              variant="outlined"
              size="small"
              margin="normal"
              inputProps={{ min: 1900, max: new Date().getFullYear() + 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="VIN (Optional)"
              name="vin"
              value={vehicleInfo.vin}
              onChange={handleVehicleInfoChange}
              variant="outlined"
              size="small"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Current Mileage (Optional)"
              name="mileage"
              type="number"
              value={vehicleInfo.mileage}
              onChange={handleVehicleInfoChange}
              variant="outlined"
              size="small"
              margin="normal"
              InputProps={{
                endAdornment: <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>miles</Typography>
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Describe the Issue</Typography>
        
        <Box sx={{ 
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          overflow: 'hidden',
          height: '400px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Box sx={{ 
            flexGrow: 1, 
            overflowY: 'auto',
            p: 2
          }}>
            {messages.map((message, index) => (
              <Box 
                key={index}
                sx={{
                  display: 'flex',
                  mb: 2,
                  justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                {message.role === 'assistant' && (
                  <Avatar 
                    sx={{ 
                      width: 32, 
                      height: 32, 
                      mr: 1.5, 
                      mt: 0.5,
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText
                    }}
                  >
                    AI
                  </Avatar>
                )}
                <Box 
                  sx={{
                    maxWidth: '80%',
                    p: 2,
                    backgroundColor: message.role === 'user' 
                      ? theme.palette.primary.main 
                      : theme.palette.background.paper,
                    color: message.role === 'user' 
                      ? theme.palette.primary.contrastText 
                      : theme.palette.text.primary,
                    borderRadius: message.role === 'user' 
                      ? '18px 18px 4px 18px' 
                      : '18px 18px 18px 4px',
                    border: message.role === 'assistant' 
                      ? '1px solid' 
                      : 'none',
                    borderColor: 'divider',
                    boxShadow: 1,
                  }}
                >
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {message.content}
                  </Typography>
                </Box>
                {message.role === 'user' && (
                  <Avatar 
                    sx={{ 
                      width: 32, 
                      height: 32, 
                      ml: 1.5, 
                      mt: 0.5,
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText
                    }}
                  >
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </Avatar>
                )}
              </Box>
            ))}
            
            {isLoading && (
              <Box 
                sx={{
                  display: 'flex',
                  mb: 2,
                  justifyContent: 'flex-start',
                }}
              >
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    mr: 1.5, 
                    mt: 0.5,
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText
                  }}
                >
                  AI
                </Avatar>
                <Box 
                  sx={{
                    maxWidth: '80%',
                    p: 2,
                    backgroundColor: theme.palette.background.paper,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '18px 18px 18px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <CircularProgress size={16} thickness={5} />
                  <Typography variant="body1">Analyzing your symptoms...</Typography>
                </Box>
              </Box>
            )}
            
            <div ref={messagesEndRef} />
          </Box>

          <Box 
            component="form" 
            onSubmit={handleSubmit}
            sx={{
              p: 2,
              borderTop: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'flex-end',
              gap: 1,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <TextField
              fullWidth
              multiline
              maxRows={4}
              variant="outlined"
              placeholder="Describe your car's symptoms..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              disabled={isLoading}
              size="small"
              InputProps={{
                sx: {
                  borderRadius: 4,
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                  },
                  '&.Mui-focused': {
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.03)',
                  },
                },
              }}
            />
            <IconButton
              type="submit"
              disabled={isLoading || !input.trim()}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
                '&:disabled': {
                  backgroundColor: theme.palette.action.disabledBackground,
                  color: theme.palette.action.disabled,
                },
                width: 48,
                height: 48,
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default NewDiagnosis;
