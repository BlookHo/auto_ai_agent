import React, { useState, useRef, useEffect } from 'react';
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
  const { 
    conversation, 
    isLoading, 
    error, 
    sendMessage, 
    resetConversation,
    vehicleInfo,
    updateVehicleInfo
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

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  const handleQuickQuestion = (question) => {
    setInput(question);
    // Auto-send if question is selected
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      maxWidth: '900px',
      margin: '0 auto',
      bgcolor: 'background.paper',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: 3
    }}>
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SmartToyIcon />
          <Typography variant="h6">Vehicle Diagnosis Assistant</Typography>
        </Box>
        <Box>
          <Tooltip title="Vehicle Info">
            <IconButton 
              onClick={() => setShowVehicleForm(!showVehicleForm)}
              color="inherit"
              size="small"
              sx={{ ml: 1 }}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="New Chat">
            <IconButton 
              onClick={handleReset}
              color="inherit"
              size="small"
            >
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      {/* Vehicle Info Form */}
      <Fade in={showVehicleForm}>
        <Box sx={{ 
          p: 2, 
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          <form onSubmit={handleVehicleInfoSubmit}>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2,
              mb: 2
            }}>
              <TextField
                label="Make"
                value={localVehicleInfo.make}
                onChange={(e) => setLocalVehicleInfo({...localVehicleInfo, make: e.target.value})}
                size="small"
                fullWidth
              />
              <TextField
                label="Model"
                value={localVehicleInfo.model}
                onChange={(e) => setLocalVehicleInfo({...localVehicleInfo, model: e.target.value})}
                size="small"
                fullWidth
              />
              <TextField
                label="Year"
                type="number"
                value={localVehicleInfo.year}
                onChange={(e) => setLocalVehicleInfo({...localVehicleInfo, year: e.target.value})}
                size="small"
                fullWidth
              />
              <TextField
                label="Mileage"
                type="number"
                value={localVehicleInfo.mileage}
                onChange={(e) => setLocalVehicleInfo({...localVehicleInfo, mileage: e.target.value})}
                size="small"
                fullWidth
                InputProps={{
                  endAdornment: <Typography variant="caption">miles</Typography>
                }}
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
                    <Avatar sx={{ width: 32, height: 32 }}>
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
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 1, 
                  px: 1,
                  pl: 7,
                  mb: 2
                }}>
                  {message.suggestedQuestions.map((question, idx) => (
                    <Chip
                      key={idx}
                      label={question}
                      onClick={() => handleQuickQuestion(question)}
                      size="small"
                      icon={<HelpOutlineIcon fontSize="small" />}
                      sx={{
                        borderRadius: 1,
                        bgcolor: 'action.selected',
                        '&:hover': {
                          bgcolor: 'action.hover',
                          cursor: 'pointer'
                        }
                      }}
                    />
                  ))}
                </Box>
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
        
        {/* Quick Tips */}
        {conversation.length <= 1 && (
          <Box sx={{ 
            mt: 'auto',
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            mb: 2
          }}>
            <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <InfoIcon color="primary" fontSize="small" />
              Quick Tips
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
      
      {/* Input Area */}
      <Box sx={{ 
        p: 2, 
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        position: 'relative'
      }}>
        <Box 
          component="form" 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder={
              vehicleInfo.make && vehicleInfo.model 
                ? `Describe the issue with your ${vehicleInfo.year} ${vehicleInfo.make} ${vehicleInfo.model}...`
                : 'Describe your vehicle issue...'
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            multiline
            maxRows={4}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: 'background.paper',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                  borderWidth: '1px'
                }
              }
            }}
          />
          <Button
            id="send-button"
            type="submit"
            variant="contained"
            color="primary"
            disabled={!input.trim() || isLoading}
            sx={{ 
              minWidth: '48px',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              p: 0,
              '&:hover': {
                transform: 'scale(1.05)'
              },
              transition: 'transform 0.2s'
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <SendIcon />
            )}
          </Button>
        </Box>
        
        {/* Vehicle info chip */}
        {(vehicleInfo.make || vehicleInfo.model) && (
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
            <Chip
              label={`${vehicleInfo.year || ''} ${vehicleInfo.make || ''} ${vehicleInfo.model || ''} ${vehicleInfo.mileage ? `• ${vehicleInfo.mileage} mi` : ''}`.trim()}
              size="small"
              onDelete={() => setShowVehicleForm(true)}
              sx={{ 
                maxWidth: '100%',
                '& .MuiChip-label': {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  pr: 0.5
                }
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DiagnosisPrompt;
