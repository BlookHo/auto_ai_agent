import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { 
  Dialog, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Box, 
  Typography, 
  CircularProgress,
  useTheme
} from '@mui/material';

const VehicleDiagnosisAssistant = ({ 
  open, 
  onClose, 
  onUseDiagnosis, 
  initialMessages = [],
  isLoading = false
}) => {
  const theme = useTheme();
  const [conversation, setConversation] = useState(initialMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when conversation updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput) {
      const userMessage = {
        id: Date.now(),
        role: 'user',
        content: trimmedInput,
        timestamp: new Date().toISOString()
      };
      
      setConversation((prev) => [...prev, userMessage]);
      setInput('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          role: 'assistant',
          content: `I've received your message: "${trimmedInput}". In a real implementation, I would analyze your vehicle's symptoms and provide a detailed diagnosis.`,
          timestamp: new Date().toISOString()
        };
        setConversation((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  }, [input]);

  const handleClose = useCallback(() => {
    if (!isLoading) {
      onClose();
    }
  }, [isLoading, onClose]);

  const handleUseDiagnosisClick = useCallback(() => {
    onUseDiagnosis(conversation);
  }, [conversation, onUseDiagnosis]);

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          height: '90vh',
          maxHeight: '800px',
          width: '100%',
          maxWidth: '900px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          '& .MuiDialogContent-root': {
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            flex: 1
          }
        }
      }}
    >
      <DialogContent>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
          bgcolor: 'background.default'
        }}>
          {/* Chat messages area */}
          <Box sx={{ 
            flex: 1,
            overflowY: 'auto',
            p: 2,
            '& > *': {
              mb: 2
            }
          }}>
            {conversation.map((msg) => (
              <Box 
                key={msg.id}
                sx={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  '& > div': {
                    maxWidth: '80%',
                    p: 2,
                    borderRadius: 2,
                    bgcolor: msg.role === 'user' ? 'primary.main' : 'background.paper',
                    color: msg.role === 'user' ? 'primary.contrastText' : 'text.primary',
                    boxShadow: 1,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }
                }}
              >
                <div>
                  {msg.content}
                </div>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input area */}
          <Box sx={{ 
            p: 2, 
            borderTop: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper'
          }}>
            <Box 
              component="form" 
              onSubmit={handleSubmit}
              sx={{ display: 'flex', gap: 1 }}
            >
              <TextField
                fullWidth
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your vehicle issue..."
                variant="outlined"
                size="small"
                disabled={isLoading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 4,
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : 'rgba(0, 0, 0, 0.03)'
                  }
                }}
              />
              <Button 
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading || !input.trim()}
                sx={{ borderRadius: 4 }}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ 
        p: 2, 
        borderTop: 1, 
        borderColor: 'divider',
        justifyContent: 'space-between',
        bgcolor: 'background.paper',
        '& > *': {
          m: '0 !important'
        }
      }}>
        <Typography variant="body2" color="text.secondary">
          {conversation.length > 1 ? `${conversation.length - 1} messages` : 'Start describing your vehicle issue'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            onClick={handleClose}
            disabled={isLoading}
            color="inherit"
            variant="outlined"
            size="small"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUseDiagnosisClick}
            disabled={conversation.length <= 1 || isLoading}
            startIcon={isLoading ? <CircularProgress size={16} /> : null}
            size="small"
            sx={{ minWidth: '180px' }}
          >
            Use this description
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

VehicleDiagnosisAssistant.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUseDiagnosis: PropTypes.func.isRequired,
  initialMessages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      role: PropTypes.oneOf(['user', 'assistant']).isRequired,
      content: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired
    })
  ),
  isLoading: PropTypes.bool
};

export default React.memo(VehicleDiagnosisAssistant);
