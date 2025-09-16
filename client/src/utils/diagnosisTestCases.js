/**
 * Vehicle Diagnosis Test Cases
 * 
 * This file contains realistic test cases for the vehicle diagnosis system.
 * Each test case includes a user prompt and the expected AI response.
 */

export const TEST_CASES = [
  {
    id: 1,
    description: "Basic engine knocking issue",
    vehicleInfo: {
      make: 'Toyota',
      model: 'Camry',
      year: '2018',
      mileage: '65000',
      engineType: '2.5L 4-cylinder',
      lastServiceDate: '2023-05-15',
      recentRepairs: 'Oil change and tire rotation'
    },
    userInput: "My car is making a knocking sound from the engine, especially when accelerating.",
    expectedResponse: {
      text: "I understand you're hearing a knocking sound from your 2018 Toyota Camry's engine, particularly during acceleration. This could indicate several potential issues:\n\n**Most Likely Causes:**\n1. **Low or old engine oil** - The most common cause of engine knocking\n2. **Incorrect fuel octane rating** - Using lower octane fuel than recommended\n3. **Carbon buildup** - Common in direct injection engines\n4. **Worn engine bearings** - More serious issue that requires immediate attention\n\n**Recommended Actions:**\n1. Check your engine oil level and condition\n2. Verify you're using the recommended fuel octane (check your owner's manual)\n3. Consider using a fuel system cleaner\n\n**Safety Note:** If the knocking is accompanied by any warning lights or loss of power, please have your vehicle inspected by a professional immediately.\n\nWhen was your last oil change, and what type of fuel do you typically use?",
      suggestedQuestions: [
        "When was your last oil change?",
        "What type of fuel do you typically use?",
        "Is the check engine light on?",
        "Does the knocking change with engine speed?"
      ]
    }
  },
  {
    id: 2,
    description: "Check engine light with rough idle",
    vehicleInfo: {
      make: 'Honda',
      model: 'Civic',
      year: '2020',
      mileage: '42000',
      engineType: '1.5L Turbo',
      lastServiceDate: '2023-10-10',
      recentRepairs: 'None'
    },
    userInput: "The check engine light came on yesterday and now my car is idling rough.",
    expectedResponse: {
      text: "I see your 2020 Honda Civic with the 1.5L Turbo engine is showing a check engine light and experiencing rough idling. This combination often points to specific issues.\n\n**Possible Causes:**\n1. **Faulty spark plugs or ignition coils** - Common in turbocharged engines\n2. **Mass Airflow Sensor (MAF) issues** - Can cause rough idle and trigger the check engine light\n3. **Vacuum leak** - Would cause unmetered air to enter the engine\n4. **Fuel system problems** - Such as a failing fuel pump or clogged injectors\n\n**Immediate Steps:**\n1. Get the trouble codes read at an auto parts store (usually free)\n2. Check for any obvious vacuum leaks or disconnected hoses\n3. Look for any other symptoms like poor fuel economy or loss of power\n\n**Safety Note:** While the car is likely still drivable, I recommend having this checked soon as some of these issues can affect fuel economy and emissions.\n\nCould you tell me if the check engine light is flashing or steady? Also, have you noticed any changes in fuel economy?",
      suggestedQuestions: [
        "Is the check engine light flashing or steady?",
        "Have you noticed any changes in fuel economy?",
        "Does the issue get worse when the engine is cold?",
        "Have you had any recent work done on the vehicle?"
      ]
    }
  },
  {
    id: 3,
    description: "Brake noise concern",
    vehicleInfo: {
      make: 'Ford',
      model: 'F-150',
      year: '2019',
      mileage: '85000',
      engineType: '3.5L EcoBoost V6',
      lastServiceDate: '2023-11-01',
      recentRepairs: 'Front brake pads and rotors replaced'
    },
    userInput: "I just had my front brakes done last week, but now I hear a grinding noise when I brake.",
    expectedResponse: {
      text: "I understand you're hearing a grinding noise after recent brake work on your 2019 Ford F-150. This is concerning and should be addressed promptly.\n\n**Possible Causes:**\n1. **Improperly installed brake components** - Common after recent service\n2. **Lack of lubrication on brake hardware** - Can cause squealing or grinding\n3. **Debris between pad and rotor** - Small stones or metal shavings can get lodged\n4. **Worn brake hardware** - Shims or clips may be missing or damaged\n\n**Recommended Actions:**\n1. **Stop driving immediately** if the grinding is severe or you feel vibration\n2. Return to the shop that performed the work for inspection\n3. Check if the noise changes when lightly applying the brakes\n\n**Safety Warning:** Grinding brakes can indicate metal-on-metal contact, which can be dangerous and cause further damage.\n\nCould you tell me if the noise is constant or only happens when braking? Also, does the steering wheel vibrate when you brake?",
      suggestedQuestions: [
        "Is the noise constant or only when braking?",
        "Does the steering wheel vibrate when braking?",
        "Did the shop mention any issues during the brake service?",
        "Have you checked your brake fluid level?"
      ]
    }
  },
  {
    id: 4,
    description: "Battery/starting issue",
    vehicleInfo: {
      make: 'BMW',
      model: 'X5',
      year: '2017',
      mileage: '72000',
      engineType: '3.0L Turbo I6',
      lastServiceDate: '2023-09-15',
      recentRepairs: 'Battery replacement 3 months ago'
    },
    userInput: "My car won't start. It makes a clicking sound when I turn the key.",
    expectedResponse: {
      text: "I understand your 2017 BMW X5 is experiencing a no-start condition with a clicking sound. This is typically related to the starting/charging system.\n\n**Most Likely Causes:**\n1. **Weak or dead battery** - Even though it was replaced recently\n2. **Poor battery connections** - Corrosion or loose terminals\n3. **Faulty starter motor** - Common in higher-mileage vehicles\n4. **Charging system issue** - Alternator not properly charging the battery\n\n**Troubleshooting Steps:**\n1. Try jump-starting the vehicle\n2. Check battery terminals for corrosion or looseness\n3. Look for any warning lights on the dashboard\n\n**Safety Note:** If jump-starting works, have your charging system tested as soon as possible. Modern BMWs are sensitive to voltage fluctuations.\n\nHow old is your current battery, and have you noticed any other electrical issues recently?",
      suggestedQuestions: [
        "How old is your current battery?",
        "Have you noticed any other electrical issues?",
        "Do the dashboard lights come on when you turn the key?",
        "Have you tried jump-starting the vehicle?"
      ]
    }
  },
  {
    id: 5,
    description: "Overheating concern",
    vehicleInfo: {
      make: 'Chevrolet',
      model: 'Silverado',
      year: '2015',
      mileage: '135000',
      engineType: '5.3L V8',
      lastServiceDate: '2023-07-20',
      recentRepairs: 'Coolant flush and fill'
    },
    userInput: "My truck's temperature gauge is in the red and there's steam coming from under the hood.",
    expectedResponse: {
      text: "I understand your 2015 Chevrolet Silverado is overheating, as indicated by the temperature gauge in the red and visible steam. This is a serious issue that requires immediate attention.\n\n**Immediate Action Required:**\n1. **Pull over safely** and turn off the engine immediately\n2. **Do not open the radiator cap** while the engine is hot\n3. **Call for assistance** - Continuing to drive could cause severe engine damage\n\n**Potential Causes:**\n1. **Coolant leak** - Check for visible puddles under the vehicle\n2. **Faulty thermostat** - Common in higher-mileage vehicles\n3. **Water pump failure** - May cause overheating and steam\n4. **Blown head gasket** - More serious and expensive to repair\n\n**Safety Warning:** Do not attempt to drive the vehicle until the issue is resolved. Severe engine damage can occur from overheating.\n\nHave you noticed any coolant leaks or low coolant levels recently?",
      suggestedQuestions: [
        "Have you noticed any coolant leaks?",
        "When was the last time you checked the coolant level?",
        "Has the temperature gauge been running higher than normal?",
        "Is there any white smoke from the exhaust?"
      ]
    }
  }
];

/**
 * Helper function to get a test case by ID
 */
export const getTestCaseById = (id) => {
  return TEST_CASES.find(testCase => testCase.id === id);
};
