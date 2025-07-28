import React, { useState, useRef, useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import '../styles/chat.css';

const NewDiagnosis = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI car diagnostic assistant. Please describe the symptoms you\'re experiencing with your car. Be as detailed as possible.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'I\'ve received your symptoms. Based on the information provided, I recommend checking the following:\n\n1. The noise at 1100-1200 RPM could be related to engine mounts or exhaust system components.\n2. It might also be worth inspecting the heat shields and other underbody components for any loose parts.\n\nWould you like me to suggest some diagnostic steps?'
        }
      ]);
    } catch (err) {
      console.error('Error:', err);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error while processing your request. Please try again.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <div className="message-avatar">
              {message.role === 'user' ? 'U' : 'AI'}
            </div>
            <div className="message-content">
              {message.content.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant">
            <div className="message-avatar">AI</div>
            <div className="message-content">
              <span className="loading-indicator"></span>
              Analyzing your symptoms...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <form onSubmit={handleSubmit} className="chat-input-form">
          <textarea
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Describe your car's symptoms..."
            disabled={isLoading}
            rows={1}
          />
          <button
            type="submit"
            className="send-button"
            disabled={isLoading || !input.trim()}
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewDiagnosis;
