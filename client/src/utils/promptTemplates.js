/**
 * Vehicle Diagnosis Prompt Templates
 * 
 * These templates guide the AI in providing structured and helpful vehicle diagnosis.
 * They are designed to extract relevant information and provide accurate assistance.
 */

export const DIAGNOSIS_SYSTEM_PROMPT = `You are an expert automotive technician with 20+ years of experience in vehicle diagnostics.
Your role is to help users diagnose and understand issues with their vehicles in a friendly, professional manner.

Guidelines for responses:
1. Start by acknowledging the user's concern
2. Ask specific, targeted questions to narrow down the issue
3. Provide clear, step-by-step guidance for diagnosis
4. Explain technical terms in simple, non-technical language
5. List possible causes from most to least likely
6. Include safety precautions when relevant
7. Recommend when professional help is needed
8. Be empathetic and patient
9. Keep responses concise but thorough
10. End with a clear next step or question

Format your responses in clear, easy-to-understand language with proper spacing and bullet points for readability.`;

export const DIAGNOSIS_USER_PROMPT = (userInput, vehicleInfo = {}) => {
  const { 
    make = 'Not specified', 
    model = 'Not specified', 
    year = 'Not specified', 
    mileage,
    engineType = 'Not specified',
    lastServiceDate = 'Not specified',
    recentRepairs = 'None reported'
  } = vehicleInfo;
  
  return `# Vehicle Diagnostic Request

## Vehicle Information
- **Make:** ${make}
- **Model:** ${model}
- **Year:** ${year}
- **Mileage:** ${mileage ? `${mileage} miles` : 'Not specified'}
- **Engine Type:** ${engineType}
- **Last Service Date:** ${lastServiceDate}
- **Recent Repairs:** ${recentRepairs}

## Reported Issue
${userInput}

## Additional Context
- Current conversation history is available for reference
- Previous diagnostic steps have been considered
- Vehicle-specific technical service bulletins may be relevant

## Response Guidelines
1. Acknowledge the user's concern
2. Analyze the symptoms based on the vehicle details
3. List possible causes in order of likelihood
4. Provide clear, actionable steps for diagnosis
5. Include safety warnings if applicable
6. Suggest when professional help is needed
7. End with specific follow-up questions`;
};

// Common follow-up questions to gather more information
export const FOLLOW_UP_QUESTIONS = {
  // Initial questions
  SYMPTOMS: 'Can you describe the symptoms in more detail?',
  TIMING: 'When did you first notice this issue?',
  FREQUENCY: 'How often does this happen? Is it constant or does it come and go?',
  
  // Contextual questions
  TRIGGERS: 'Does it happen under specific conditions (e.g., when cold, when accelerating, turning, etc.)?',
  SPEED: 'At what speeds do you notice this issue?',
  TEMPERATURE: 'Does outside temperature affect the issue?',
  
  // Visual/auditory cues
  WARNING_LIGHTS: 'Are there any warning lights on the dashboard?',
  NOISES: 'Do you hear any unusual noises? If so, can you describe them?',
  SMELLS: 'Do you notice any unusual smells?',
  
  // Vehicle history
  RECENT_SERVICE: 'Has the vehicle had any recent maintenance or repairs?',
  PREVIOUS_ISSUES: 'Have you experienced similar issues before?',
  MILEAGE: 'What is your vehicle\'s current mileage?',
  
  // Follow-up diagnostics
  CHECK_FLUIDS: 'Have you checked the fluid levels recently?',
  TIRE_PRESSURE: 'When was the last time you checked your tire pressure?',
  BATTERY_AGE: 'How old is your car battery?'
};

// Common diagnostic categories with subcategories
export const DIAGNOSTIC_CATEGORIES = {
  'Engine': [
    'Won\'t start',
    'Rough idle',
    'Stalling',
    'Loss of power',
    'Check engine light',
    'Overheating',
    'Strange noises',
    'Other engine issues'
  ],
  'Transmission': [
    'Shifting problems',
    'Slipping gears',
    'Delayed engagement',
    'Transmission fluid leak',
    'Other transmission issues'
  ],
  'Electrical System': [
    'Battery issues',
    'Alternator problems',
    'Lighting issues',
    'Power window/lock problems',
    'Other electrical issues'
  ],
  'Brakes': [
    'Squeaking/grinding',
    'Soft brake pedal',
    'Pulling to one side',
    'Vibration when braking',
    'Other brake issues'
  ],
  'Suspension/Steering': [
    'Pulling to one side',
    'Vibration in steering wheel',
    'Noise over bumps',
    'Uneven tire wear',
    'Other suspension issues'
  ],
  'Heating/Cooling': [
    'No heat',
    'No air conditioning',
    'Overheating',
    'Coolant leak',
    'Other climate control issues'
  ],
  'Exhaust/Smoke': [
    'Loud exhaust',
    'Blue smoke',
    'White smoke',
    'Black smoke',
    'Other exhaust issues'
  ],
  'Other': [
    'Strange smells',
    'Warning lights',
    'Fluid leaks',
    'Other issues not listed'
  ]
};

// Common vehicle makes and models for better contextual responses
export const VEHICLE_MAKES = [
  'Acura', 'Audi', 'BMW', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge', 'Ford', 
  'GMC', 'Honda', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Kia', 'Land Rover', 'Lexus', 
  'Lincoln', 'Mazda', 'Mercedes-Benz', 'Mitsubishi', 'Nissan', 'Subaru', 'Tesla', 'Toyota', 
  'Volkswagen', 'Volvo', 'Other'
];

// Common symptoms and their possible causes
export const SYMPTOM_DIAGNOSIS = {
  // Engine related
  'engine knocking': {
    causes: [
      'Low oil level or poor oil quality',
      'Incorrect fuel octane rating',
      'Carbon buildup in combustion chamber',
      'Worn engine bearings'
    ],
    severity: 'high',
    action: 'Address immediately to prevent engine damage',
    followUp: ['When did you last change your oil?', 'What type of fuel do you use?']
  },
  'check engine light': {
    causes: [
      'Loose or faulty gas cap',
      'Oxygen sensor failure',
      'Catalytic converter issues',
      'Mass airflow sensor problems',
      'Spark plug/ignition coil issues'
    ],
    severity: 'medium',
    action: 'Have the trouble codes read as soon as possible',
    followUp: ['Is the light flashing or steady?', 'Any noticeable performance issues?']
  },
  // Add more symptoms as needed
};
