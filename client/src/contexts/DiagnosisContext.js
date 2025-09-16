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
    mileage: '',
    engineType: '',
    lastServiceDate: '',
    recentRepairs: ''
  });

  // Mock AI response generator
  const generateMockAIResponse = useCallback((userMessage, conversationHistory) => {
    // Simple state machine for the diagnosis flow
    const userInput = userMessage.text.toLowerCase();
    
    // Check if we're in the initial state
    if (conversationHistory.length <= 2) {
      return {
        text: `I understand you're experiencing an issue with your vehicle. To help diagnose the problem, could you please provide more details about the following?\n\n` +
              `1. What specific symptoms are you experiencing?\n` +
              `2. When did you first notice these symptoms?\n` +
              `3. Are there any warning lights on your dashboard?`,
        suggestedQuestions: [
          FOLLOW_UP_QUESTIONS.SYMPTOMS,
          FOLLOW_UP_QUESTIONS.TRIGGERS,
          FOLLOW_UP_QUESTIONS.WARNING_LIGHTS
        ]
      };
    }
    
    // Check for common symptoms and provide relevant follow-up
    const commonSymptoms = {
      'noise': 'Based on the noise you\'re hearing, it could be related to the brakes, suspension, or exhaust system. ',
      'vibrat': 'Vibrations can indicate wheel balance issues, brake problems, or suspension components. ',
      'light': 'Warning lights should be addressed promptly. The specific light can help identify the issue. ',
      'start': 'Starting issues could be related to the battery, starter, or fuel system. ',
      'brak': 'Brake issues are critical for safety. ',
      'steer': 'Steering problems could be related to the power steering system or suspension. '
    };
    
    // Find matching symptom
    let responseText = 'I understand the issue you\'re describing. ';
    let symptomFound = false;
    
    for (const [symptom, message] of Object.entries(commonSymptoms)) {
      if (userInput.includes(symptom)) {
        responseText = message;
        symptomFound = true;
        break;
      }
    }
    
    if (!symptomFound) {
      responseText += 'Could you provide more specific details about the issue? ';
    }
    
    // Add vehicle-specific info if available
    if (vehicleInfo.make || vehicleInfo.model) {
      responseText += `For your ${vehicleInfo.year || ''} ${vehicleInfo.make || ''} ${vehicleInfo.model || 'vehicle'}, `;
    }
    
    responseText += 'it would be helpful to know:\n\n' +
      '1. How long has this been happening?\n' +
      '2. Does it happen all the time or only under certain conditions?\n' +
      '3. Have you noticed any other related symptoms?';
    
    return {
      text: responseText,
      suggestedQuestions: [
        FOLLOW_UP_QUESTIONS.FREQUENCY,
        FOLLOW_UP_QUESTIONS.TRIGGERS,
        'Have you checked the vehicle\'s fluid levels recently?'
      ]
    };
  }, [vehicleInfo]);

  const sendMessage = useCallback(async (message) => {
    if (!message.trim()) return;

    // Add user message to conversation
    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    const updatedConversation = [...conversation, userMessage];
    setConversation(updatedConversation);
    setIsLoading(true);
    setError(null);

    try {
      // In development, use the mock response generator
      if (process.env.NODE_ENV === 'development') {
        // Small delay to simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const { text, suggestedQuestions } = generateMockAIResponse(userMessage, updatedConversation);
        
        const aiResponse = {
          id: Date.now() + 1,
          text,
          sender: 'ai',
          timestamp: new Date().toISOString(),
          suggestedQuestions: suggestedQuestions || [
            FOLLOW_UP_QUESTIONS.FREQUENCY,
            FOLLOW_UP_QUESTIONS.TRIGGERS,
            'Is there anything else you can tell me about the issue?'
          ]
        };
        
        // Add AI response to conversation
        setConversation(prev => [...prev, aiResponse]);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      setError('Failed to get diagnosis. Please try again.');
      
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again later.',
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [conversation, generateMockAIResponse]);

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
    setVehicleInfo, // Keeping for backward compatibility
    resetConversation
  };

  return (
    <DiagnosisContext.Provider value={value}>
      {children}
    </DiagnosisContext.Provider>
  );
};

export default DiagnosisContext;
