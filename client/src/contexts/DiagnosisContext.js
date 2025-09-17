import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { 
  FOLLOW_UP_QUESTIONS, 
  DIAGNOSIS_SYSTEM_PROMPT
} from '../utils/promptTemplates';

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
      text: '🚗 Welcome to the Vehicle Diagnostic Assistant! I can help you diagnose issues with your vehicle.\n\nTo get started, please describe the problem you\'re experiencing in as much detail as possible.\n\nFor the most accurate diagnosis, please include:\n- When the issue started\n- Any warning lights on the dashboard\n- Any unusual sounds or smells\n- Under what conditions the problem occurs',
      sender: 'ai',
      timestamp: new Date().toISOString(),
      isSystem: true
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [diagnosisDescription, setDiagnosisDescription] = useState('');
  const [vehicleInfo, setVehicleInfo] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    engineType: '',
    lastServiceDate: '',
    recentRepairs: ''
  });

  // Format the conversation into a readable diagnosis
  const formatDiagnosis = useCallback(() => {
    console.log('Formatting diagnosis with conversation:', conversation);
    const userMessages = conversation.filter(msg => msg.sender === 'user');
    const aiResponses = conversation.filter(msg => msg.sender === 'ai' && !msg.isSystem);
    
    console.log('User messages:', userMessages);
    console.log('AI responses:', aiResponses);
    
    let diagnosis = '# Vehicle Diagnosis Summary\n\n';
    
    // Add vehicle info if available
    if (vehicleInfo.make || vehicleInfo.model) {
      diagnosis += `## Vehicle: ${vehicleInfo.year || ''} ${vehicleInfo.make || ''} ${vehicleInfo.model || ''}\n\n`;
    }
    
    // Add reported issues
    if (userMessages.length > 0) {
      diagnosis += '## Reported Issues\n';
      userMessages.forEach((msg, index) => {
        diagnosis += `${index + 1}. ${msg.text}\n`;
      });
      diagnosis += '\n';
    }
    
    // Add AI analysis
    if (aiResponses.length > 0) {
      diagnosis += '## Analysis\n';
      aiResponses.forEach((msg, index) => {
        diagnosis += `### Response ${index + 1}\n${msg.text}\n\n`;
      });
    }
    
    return diagnosis;
  }, [conversation, vehicleInfo]);
  
  // Generate AI response using the prompt templates and common symptoms
  const generateMockAIResponse = useCallback((userMessage, conversationHistory) => {
    // Common symptoms and their related information - defined inside useCallback to prevent recreation
    const commonSymptoms = {
      'noise': {
        response: 'Based on the noise you\'re describing, this could be related to:',
        causes: [
          'Brakes: Squealing, grinding, or metal-on-metal sounds',
          'Suspension: Clunking, creaking, or rattling over bumps',
          'Exhaust: Hissing, rattling, or loud rumbling',
          'Engine: Knocking, pinging, or ticking sounds',
          'Belts: Squealing or chirping sounds',
          'Wheel bearings: Growling or humming that changes with speed'
        ],
        questions: [
          'Where is the noise coming from? (front, back, left, right, under the hood, etc.)',
          'Does the noise change with speed or when turning?',
          'Is the noise constant or intermittent?',
          'When did you first notice the noise?',
          'Has the noise been getting worse over time?'
        ]
      },
      'vibrat': {
        response: 'Vibrations can indicate several potential issues:',
        causes: [
          'Wheels: Unbalanced or out-of-round tires',
          'Brakes: Warped rotors or stuck calipers',
          'Suspension: Worn shocks, struts, or bushings',
          'Driveline: Worn CV joints, U-joints, or drive shaft issues',
          'Engine: Misfiring, rough idle, or motor mounts',
          'Steering: Loose or worn components'
        ],
        questions: [
          'Does the vibration occur at certain speeds?',
          'Do you feel it in the steering wheel, seat, or throughout the vehicle?',
          'Does it happen when braking, accelerating, or all the time?',
          'Has the vehicle hit any potholes or curbs recently?',
          'When was the last time you had your tires rotated and balanced?'
        ]
      },
      'light': {
        response: '⚠️ Warning lights should be addressed promptly:',
        causes: [
          'Check Engine Light: Emissions, sensor, or engine issues',
          'ABS Light: Anti-lock Braking System problem',
          'Battery/Charging Light: Charging system issue',
          'Oil Pressure Light: Low oil level or pressure',
          'Temperature Warning: Engine overheating',
          'Tire Pressure Light: Low tire pressure detected'
        ],
        questions: [
          'What color is the warning light?',
          'Is the light constantly on or flashing?',
          'Are there any other warning lights on?',
          'When did the light first come on?',
          'Have you noticed any changes in vehicle performance?'
        ]
      },
      'start': {
        response: 'Starting issues could be related to:',
        causes: [
          'Battery: Low charge or failing battery',
          'Starter: Worn or failing starter motor',
          'Fuel System: Fuel pump, filter, or injector issues',
          'Ignition: Spark plugs, coils, or ignition switch',
          'Security System: Key fob battery or anti-theft system',
          'Electrical: Wiring or connection problems'
        ],
        questions: [
          'What happens when you try to start the vehicle?',
          'Do you hear any clicking, grinding, or other sounds?',
          'Do the dashboard lights come on when you turn the key?',
          'Does this happen all the time or only sometimes?',
          'Has the vehicle been sitting unused for an extended period?'
        ]
      },
      'brak': {
        response: '⚠️ Brake issues are critical for safety:',
        causes: [
          'Brake Pads: Worn down and need replacement',
          'Rotors: Warped or scored rotors',
          'Brake Fluid: Low or contaminated fluid',
          'Brake Lines: Leaks or damage',
          'ABS System: Malfunctioning components',
          'Parking Brake: Stuck or not releasing properly'
        ],
        questions: [
          'What exactly are you experiencing with the brakes?',
          'Do you hear any unusual noises when braking?',
          'Does the brake pedal feel soft or go to the floor?',
          'Does the vehicle pull to one side when braking?',
          'When was the last brake service performed?'
        ]
      },
      'steer': {
        response: 'Steering problems could indicate:',
        causes: [
          'Power Steering: Low fluid, pump failure, or leaks',
          'Tie Rods: Worn or damaged tie rod ends',
          'Ball Joints: Worn or failing ball joints',
          'Rack and Pinion: Leaks or internal damage',
          'Wheel Alignment: Improper alignment settings',
          'Suspension: Worn control arms or bushings'
        ],
        questions: [
          'Is the steering wheel hard to turn?',
          'Do you feel any looseness or play in the steering?',
          'Does the vehicle pull to one side?',
          'Do you hear any clunking or whining noises?',
          'When was the last alignment or suspension service?'
        ]
      }
    };
    const userInput = userMessage.text;
    const userInputLower = userInput.toLowerCase();
    
    // In a real implementation, this would be an API call to an AI service
    // For now, we'll simulate a response based on the input
    let responseText = '';
    let suggestedQuestions = [];
    
    // Check if this is the first user message
    if (conversationHistory.length <= 2) {
      // First interaction - ask for more details
      responseText = `🔍 Thank you for describing the issue. I'll do my best to help diagnose the problem with your ${vehicleInfo.year || ''} ${vehicleInfo.make || 'vehicle'}.\n\n` +
        'To help me better understand the issue, could you please provide more details about:\n' +
        `1. ${FOLLOW_UP_QUESTIONS.SYMPTOMS}\n` +
        `2. ${FOLLOW_UP_QUESTIONS.TIMING}\n` +
        `3. ${FOLLOW_UP_QUESTIONS.WARNING_LIGHTS}`;
      
      suggestedQuestions = [
        FOLLOW_UP_QUESTIONS.SYMPTOMS,
        FOLLOW_UP_QUESTIONS.TIMING,
        FOLLOW_UP_QUESTIONS.WARNING_LIGHTS
      ];
    } else {
      // Check for common symptoms in the user input
      let symptomFound = false;
      
      for (const [symptom, details] of Object.entries(commonSymptoms)) {
        if (userInputLower.includes(symptom)) {
          responseText = `${details.response}\n\n`;
          responseText += '**Possible Causes:**\n';
          responseText += details.causes.map(cause => `- ${cause}`).join('\n');
          responseText += '\n\n**To help diagnose further, please answer:**\n';
          responseText += details.questions.slice(0, 3).map((q, i) => `${i + 1}. ${q}`).join('\n');
          
          suggestedQuestions = details.questions.slice(0, 3);
          symptomFound = true;
          break;
        }
      }
      
      // If no specific symptom matched, provide a generic response
      if (!symptomFound) {
        responseText = 'Thank you for those details. ';
        
        // Add vehicle-specific context if available
        if (vehicleInfo.make || vehicleInfo.model) {
          responseText += `For your ${vehicleInfo.year || ''} ${vehicleInfo.make || ''} ${vehicleInfo.model || 'vehicle'}, `;
        }
        
        responseText += 'here are some follow-up questions that might help narrow down the issue:\n\n';
        
        suggestedQuestions = [
          FOLLOW_UP_QUESTIONS.FREQUENCY,
          FOLLOW_UP_QUESTIONS.TRIGGERS,
          FOLLOW_UP_QUESTIONS.RECENT_SERVICE
        ];
      }
      
      // Add a safety note if the issue seems serious
      const safetyKeywords = ['brake', 'steering', 'won\'t start', 'smoke', 'fire', 'leak', 'overheat'];
      if (safetyKeywords.some(keyword => userInputLower.includes(keyword))) {
        responseText += '\n\n⚠️ **Safety Note**: This issue could affect your vehicle\'s drivability or safety. If you feel unsafe, please have the vehicle inspected by a professional as soon as possible.';
      }
    }
    
    return {
      text: responseText,
      suggestedQuestions: suggestedQuestions,
      systemPrompt: DIAGNOSIS_SYSTEM_PROMPT
    };
  }, [vehicleInfo]);

  const sendMessage = useCallback(async (message) => {
    if (!message || !message.trim()) return;

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
      // Always use the mock response generator in development
      // In production, this would be an API call to your backend
      
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
      
      // Return the updated conversation for testing/verification
      return [...updatedConversation, aiResponse];
    } catch (error) {
      console.error('Error generating response:', error);
      setError('Failed to get diagnosis. Please try again.');
      
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again later.',
        sender: 'ai',
        timestamp: new Date().toISOString(),
        isError: true
      };
      
      setConversation(prev => [...prev, errorMessage]);
      throw error; // Re-throw to allow error handling in the component
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

  const resetConversation = useCallback((keepVehicleInfo = false) => {
    console.log('Resetting conversation', { keepVehicleInfo });
    
    // Reset the conversation to the initial state
    setConversation([
      { 
        id: 1, 
        text: '🚗 Welcome to the Vehicle Diagnostic Assistant! I can help you diagnose issues with your vehicle.\n\nTo get started, please describe the problem you\'re experiencing in as much detail as possible.\n\nFor the most accurate diagnosis, please include:\n- When the issue started\n- Any warning lights on the dashboard\n- Any unusual sounds or smells\n- Under what conditions the problem occurs',
        sender: 'ai',
        timestamp: new Date().toISOString(),
        isSystem: true
      }
    ]);
    
    // Reset vehicle info if not keeping it
    if (!keepVehicleInfo) {
      setVehicleInfo({
        make: '',
        model: '',
        year: '',
        mileage: '',
        engineType: '',
        lastServiceDate: '',
        recentRepairs: ''
      });
    }
    
    // Clear any errors and reset diagnosis description
    setError(null);
    setDiagnosisDescription('');
  }, []);

  const updateDiagnosisDescription = useCallback(() => {
    const summary = formatDiagnosis();
    setDiagnosisDescription(summary);
    return summary;
  }, [formatDiagnosis]);

  const getConversationHistory = useCallback(() => {
    // Return a clean copy of the conversation without system messages
    const history = conversation.filter(msg => !msg.isSystem);
    console.log('Getting conversation history:', history);
    return history;
  }, [conversation]);

  return (
    <DiagnosisContext.Provider 
      value={{ 
        conversation, 
        isLoading, 
        error, 
        sendMessage, 
        resetConversation,
        vehicleInfo,
        updateVehicleInfo,
        formatDiagnosis,
        getConversationHistory,
        diagnosisDescription,
        updateDiagnosisDescription
      }}
    >
      {children}
    </DiagnosisContext.Provider>
  );
};

export default DiagnosisContext;
