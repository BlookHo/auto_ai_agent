import React from 'react';
import { useDiagnosis } from '../contexts/DiagnosisContext';
import { TEST_CASES } from '../utils/diagnosisTestCases';
import { 
  Box, 
  Button, 
  Typography, 
  Card, 
  CardContent, 
  CardActions, 
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper
} from '@mui/material';

const DiagnosisTester = () => {
  const { updateVehicleInfo, sendMessage, resetConversation } = useDiagnosis();

  const runTestCase = (testCase) => {
    // Reset any existing conversation
    resetConversation();
    
    // Set the vehicle info
    updateVehicleInfo(testCase.vehicleInfo);
    
    // Simulate user message after a short delay
    setTimeout(() => {
      sendMessage(testCase.userInput);
    }, 500);
  };

  return (
    <Box sx={{ p: 2, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Vehicle Diagnosis Test Cases
      </Typography>
      <Typography variant="body1" paragraph>
        Select a test case to see how the diagnosis system responds to common vehicle issues.
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ display: 'grid', gap: 3 }}>
        {TEST_CASES.map((testCase) => (
          <Card key={testCase.id} variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">
                Test Case #{testCase.id}: {testCase.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                {testCase.vehicleInfo.year} {testCase.vehicleInfo.make} {testCase.vehicleInfo.model} • {testCase.vehicleInfo.mileage} miles
              </Typography>
              
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>User Input:</Typography>
              <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5' }}>
                <Typography variant="body2" fontFamily="monospace">
                  "{testCase.userInput}"
                </Typography>
              </Paper>
              
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Expected AI Response:</Typography>
              <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                <Typography variant="body2" whiteSpace="pre-line">
                  {testCase.expectedResponse.text.split('\n\n')[0]}...
                </Typography>
              </Paper>
              
              <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                {testCase.expectedResponse.suggestedQuestions.length} follow-up questions available
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small" 
                variant="contained" 
                onClick={() => runTestCase(testCase)}
                sx={{ mr: 1 }}
              >
                Run This Test
              </Button>
              <Button 
                size="small" 
                onClick={() => {
                  console.log('Test Case Details:', testCase);
                }}
              >
                View Details
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ mt: 4, p: 2, bgcolor: '#f8f9fa', borderRadius: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          How to Use This Tester:
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText 
              primary="1. Click 'Run This Test' to simulate a user reporting an issue"
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="2. The system will automatically set the vehicle info and send the test message"
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="3. Observe how the AI responds in the chat interface"
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default DiagnosisTester;
