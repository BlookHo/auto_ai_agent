import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Tooltip,
  Fade
} from '@mui/material';
import { useDiagnosis } from '../../contexts/DiagnosisContext';
import SendIcon from '@mui/icons-material/Send';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import InfoIcon from '@mui/icons-material/Info';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const DiagnosisPrompt = () => {
  const [searchParams] = useSearchParams();
  const isEmbedded = searchParams.get('embedded') === 'true';
  const { 
    conversation, 
    isLoading, 
    error, 
    sendMessage, 
    resetConversation,
    updateVehicleInfo,
    getConversationHistory
  } = useDiagnosis();
  
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [localVehicleInfo, setLocalVehicleInfo] = useState({
    make: '',
    model: '',
    year: '',
    mileage: ''
  });

  // Handle messages from parent window when in embedded mode
  useEffect(() => {
    if (!isEmbedded) return;
    
    const handleMessage = (event) => {
      // Only accept messages from our domain
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'REQUEST_DIAGNOSIS') {
        // Send the conversation back to the parent
        window.parent.postMessage({
          type: 'DIAGNOSIS_READY',
          conversation: getConversationHistory()
        }, window.location.origin);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isEmbedded, getConversationHistory]);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickQuestion = (question) => {
    setInput(question);
    setTimeout(() => {
      const sendButton = document.getElementById('send-button');
      if (sendButton) sendButton.click();
    }, 0);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to start a new conversation? This will clear the current chat history.')) {
      resetConversation();
    }
  };

  const handleVehicleInfoSubmit = (e) => {
    e.preventDefault();
    updateVehicleInfo(localVehicleInfo);
    setShowVehicleForm(false);
  };

  const handleVehicleInfoChange = (e) => {
    const { name, value } = e.target;
    setLocalVehicleInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      maxWidth: '100%',
      mx: 'auto',
      bgcolor: 'background.default',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: 3
    }}>
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h6" component="h2">
          Vehicle Diagnosis Assistant
        </Typography>
        <Box>
          <Tooltip title="Reset Conversation">
            <IconButton 
              onClick={handleReset}
              color="inherit"
              size="small"
              sx={{ mr: 1 }}
            >
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Vehicle Information">
            <IconButton 
              onClick={() => setShowVehicleForm(!showVehicleForm)}
              color="inherit"
              size="small"
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Vehicle Info Form */}
      <Fade in={showVehicleForm}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <form onSubmit={handleVehicleInfoSubmit}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
              <TextField
                name="make"
                label="Make"
                value={localVehicleInfo.make}
                onChange={handleVehicleInfoChange}
                size="small"
                required
              />
              <TextField
                name="model"
                label="Model"
                value={localVehicleInfo.model}
                onChange={handleVehicleInfoChange}
                size="small"
                required
              />
              <TextField
                name="year"
                label="Year"
                type="number"
                value={localVehicleInfo.year}
                onChange={handleVehicleInfoChange}
                size="small"
                inputProps={{ min: 1900, max: new Date().getFullYear() + 1 }}
              />
              <TextField
                name="mileage"
                label="Mileage"
                type="number"
                value={localVehicleInfo.mileage}
                onChange={handleVehicleInfoChange}
                size="small"
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button 
                onClick={() => setShowVehicleForm(false)}
                size="small"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                variant="contained" 
                size="small"
                disabled={!localVehicleInfo.make || !localVehicleInfo.model}
              >
                Save Vehicle
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
      
      {/* Messages */}
      <Box sx={{ 
        flex: 1, 
        overflowY: 'auto', 
        p: 2,
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <List sx={{ flex: 1 }}>
          {conversation.map((message) => (
            <React.Fragment key={message.id}>
              <ListItem 
                sx={{
                  flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-start',
                  mb: 2,
                  px: 1
                }}
              >
                <ListItemAvatar sx={{ minWidth: '40px' }}>
                  {message.sender === 'ai' ? (
                    <Avatar sx={{ 
                      bgcolor: 'primary.main',
                      width: 32,
                      height: 32
                    }}>
                      <SmartToyIcon fontSize="small" />
                    </Avatar>
                  ) : (
                    <Avatar sx={{ 
                      bgcolor: 'secondary.main',
                      width: 32,
                      height: 32
                    }}>
                      <AccountCircle fontSize="small" />
                    </Avatar>
                  )}
                </ListItemAvatar>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    ml: message.sender === 'ai' ? 0 : 2,
                    mr: message.sender === 'user' ? 0 : 2,
                    bgcolor: message.sender === 'ai' ? 'action.hover' : 'primary.main',
                    color: message.sender === 'ai' ? 'text.primary' : 'primary.contrastText',
                    borderRadius: 2,
                    maxWidth: { xs: '85%', sm: '70%' },
                    wordBreak: 'break-word',
                    position: 'relative',
                    '&:hover .message-timestamp': {
                      opacity: 1
                    }
                  }}
                >
                  <ListItemText 
                    primary={message.text} 
                    primaryTypographyProps={{ 
                      color: 'inherit',
                      variant: 'body2',
                      sx: { whiteSpace: 'pre-line' }
                    }}
                  />
                  <Typography 
                    className="message-timestamp"
                    variant="caption" 
                    sx={{
                      position: 'absolute',
                      bottom: 2,
                      right: 8,
                      opacity: 0.6,
                      transition: 'opacity 0.2s',
                      color: 'inherit',
                      fontSize: '0.6rem'
                    }}
                  >
                    {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </Typography>
                </Paper>
              </ListItem>
              
              {/* Suggested questions */}
              {message.sender === 'ai' && message.suggestedQuestions && (
                <ListItem sx={{ pt: 0, pb: 2, pl: 7 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 1,
                    width: '100%'
                  }}>
                    {message.suggestedQuestions.map((question, idx) => (
                      <Chip
                        key={idx}
                        label={question}
                        onClick={() => handleQuickQuestion(question)}
                        sx={{ cursor: 'pointer' }}
                      />
                    ))}
                  </Box>
                </ListItem>
              )}
            </React.Fragment>
          ))}
          
          {isLoading && !conversation.some(msg => msg.id === 'typing') && (
            <ListItem sx={{ justifyContent: 'flex-start', pl: 7 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 1,
                color: 'text.secondary'
              }}>
                <CircularProgress size={16} thickness={4} />
                <Typography variant="caption">Diagnosing...</Typography>
              </Box>
            </ListItem>
          )}
          
          {error && (
            <ListItem sx={{ justifyContent: 'flex-start', pl: 7 }}>
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            </ListItem>
          )}
          
          <div ref={messagesEndRef} />
        </List>
      </Box>

      {/* Input Area */}
      <Box sx={{ 
        p: 2, 
        borderTop: 1, 
        borderColor: 'divider',
        bgcolor: 'background.paper'
      }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            variant="outlined"
            placeholder="Describe your vehicle issue..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <Button
            id="send-button"
            variant="contained"
            color="primary"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            sx={{ minWidth: '56px', height: '56px' }}
          >
            {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
          </Button>
        </Box>
        
        {/* Quick Tips */}
        {conversation.length <= 1 && (
          <Box sx={{ mt: 2, pt: 1, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
              <HelpOutlineIcon fontSize="small" /> Try asking:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {[
                'My car is making a strange noise when I brake',
                'Check engine light is on',
                'Car won\'t start in cold weather',
                'What does this warning light mean?'
              ].map((tip, idx) => (
                <Chip
                  key={idx}
                  label={tip}
                  onClick={() => handleQuickQuestion(tip)}
                  size="small"
                  variant="outlined"
                  sx={{ 
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: 'action.hover',
                      cursor: 'pointer'
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DiagnosisPrompt;
