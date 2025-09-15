/**
 * Vehicle Diagnosis Prompt Templates
 * 
 * These templates guide the AI in providing structured and helpful vehicle diagnosis.
 * They are designed to extract relevant information and provide accurate assistance.
 */

export const DIAGNOSIS_SYSTEM_PROMPT = `You are an expert automotive technician with extensive knowledge of vehicle diagnostics.
Your role is to help users diagnose and understand issues with their vehicles.

Guidelines:
1. Ask clarifying questions to gather necessary information
2. Provide clear, step-by-step guidance
3. Explain technical terms in simple language
4. List possible causes from most to least likely
5. Suggest safety precautions when relevant
6. Recommend when professional help is needed

Format your responses in clear, easy-to-understand language.`;

export const DIAGNOSIS_USER_PROMPT = (userInput, vehicleInfo = {}) => {
  const { make, model, year, mileage } = vehicleInfo;
  
  return `Vehicle Information:
- Make: ${make || 'Not specified'}
- Model: ${model || 'Not specified'}
- Year: ${year || 'Not specified'}
- Mileage: ${mileage ? `${mileage} miles` : 'Not specified'}

User's Issue:
${userInput}

Please provide a helpful diagnosis and next steps.`;
};

// Common follow-up questions to gather more information
export const FOLLOW_UP_QUESTIONS = {
  SYMPTOMS: 'Can you describe the symptoms in more detail? When did you first notice them?',
  FREQUENCY: 'How often does this issue occur? Is it constant or intermittent?',
  TRIGGERS: 'Does the issue happen under specific conditions (e.g., when cold, when accelerating, etc.)?',
  WARNING_LIGHTS: 'Are there any warning lights on the dashboard? If yes, which ones?',
  RECENT_SERVICE: 'Has the vehicle had any recent maintenance or repairs?',
  PREVIOUS_ISSUES: 'Have you experienced similar issues before?'
};

// Common diagnostic categories
export const DIAGNOSTIC_CATEGORIES = [
  'Engine Performance',
  'Transmission',
  'Electrical System',
  'Brakes',
  'Suspension',
  'Exhaust System',
  'Heating/Cooling',
  'Check Engine Light',
  'Other'
];
