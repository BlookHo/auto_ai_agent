import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { FOLLOW_UP_QUESTIONS } from '../utils/promptTemplates';

const DiagnosisContext = createContext();

export const useDiagnosis = () => {
  const context = useContext(DiagnosisContext);
  if (!context) {
    throw new Error('useDiagnosis must be used within a DiagnosisProvider');
  }
  return context;
};

export const DiagnosisProvider = ({ children }) => {
  useAuth(); // We're not using the user object in the active code
  const [conversation, setConversation] = useState([
    { 
      id: 1, 
      text: 'Hello! I can help diagnose vehicle issues. Please describe the problem you\'re experiencing with your vehicle.',
      sender: 'ai',
      timestamp: new Date().toISOString()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [vehicleInfo, setVehicleInfo] = useState({
    make: '',
    model: '',
    year: '',
    mileage: ''
  });

  const sendMessage = useCallback(async (message) => {
    if (!message.trim()) return;

    // Add user message to conversation
    const userMessage = {
      id: conversation.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setConversation(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/diagnose', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${user.token}`
      // },
      //   body: JSON.stringify({
      //     message,
      //     conversation,
      //     vehicleInfo,
      //     systemPrompt: DIAGNOSIS_SYSTEM_PROMPT,
      //     userPrompt: DIAGNOSIS_USER_PROMPT(message, vehicleInfo)
      //   })
      // });

      // if (!response.ok) throw new Error('Failed to get diagnosis');
      // const data = await response.json();

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // This would come from the API in a real implementation
      const aiResponse = {
        id: conversation.length + 2,
        text: 'I understand you\'re experiencing an issue. ' + 
              'Could you provide more details about when this problem occurs?',
        sender: 'ai',
        timestamp: new Date().toISOString(),
        suggestedQuestions: [
          FOLLOW_UP_QUESTIONS.FREQUENCY,
          FOLLOW_UP_QUESTIONS.TRIGGERS,
          FOLLOW_UP_QUESTIONS.WARNING_LIGHTS
        ]
      };
      
      setConversation(prev => [...prev, aiResponse]);
    } catch (err) {
      console.error('Diagnosis error:', err);
      setError('Failed to get diagnosis. Please try again.');
      
      const errorMessage = {
        id: conversation.length + 2,
        text: 'Sorry, I encountered an error. Please try again later.',
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [conversation]); // Only conversation is used in the active code path

  const updateVehicleInfo = useCallback((newInfo) => {
    setVehicleInfo(prev => ({
      ...prev,
      ...newInfo
    }));
  }, []);

  const resetConversation = useCallback(() => {
    setConversation([
      { 
        id: 1, 
        text: 'Hello! I can help diagnose vehicle issues. Please describe the problem you\'re experiencing with your vehicle.',
        sender: 'ai',
        timestamp: new Date().toISOString()
      }
    ]);
    setError(null);
  }, []);

  const value = {
    conversation,
    isLoading,
    error,
    vehicleInfo,
    sendMessage,
    updateVehicleInfo,
    resetConversation
  };

  return (
    <DiagnosisContext.Provider value={value}>
      {children}
    </DiagnosisContext.Provider>
  );
};

export default DiagnosisContext;
