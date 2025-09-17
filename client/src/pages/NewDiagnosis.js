import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';
import VehicleDiagnosisAssistant from '../components/VehicleDiagnosisAssistant';
import { Typography, TextField, Button, Grid, Container, Box, CircularProgress } from '@mui/material';

const NewDiagnosis = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [symptoms, setSymptoms] = useState('');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [vehicleInfo, setVehicleInfo] = useState({ 
    make: '', 
    model: '', 
    year: '', 
    vin: '', 
    mileage: '' 
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/new' } });
    }
  }, [user, navigate]);

  const handleVehicleInfoChange = (e) => {
    const { name, value } = e.target;
    setVehicleInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSymptomsChange = (e) => {
    setSymptoms(e.target.value);
  };

  const handleOpenAssistant = () => {
    setIsAssistantOpen(true);
  };

  const handleCloseAssistant = () => {
    setIsAssistantOpen(false);
  };

  const handleUseDiagnosis = (conversation) => {
    const userMessages = conversation
      .filter(msg => msg.role === 'user')
      .map(msg => msg.content)
      .join('\n\n');
    
    setSymptoms(prev => prev ? `${prev}\n\n${userMessages}` : userMessages);
    setIsAssistantOpen(false);
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!user) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, position: 'relative' }}>
      <Box sx={{ mb: 4, position: 'relative', pt: 6 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleBack}
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 1,
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
              transform: 'translateY(-1px)',
              boxShadow: 3
            },
            boxShadow: 2,
            textTransform: 'none',
            fontWeight: 500,
            padding: '8px 20px',
            borderRadius: 2,
            transition: 'all 0.2s ease-in-out',
            color: '#fff',
            '& .MuiButton-startIcon': {
              color: '#fff'
            }
          }}
        >
          Back to Dashboard
        </Button>
        
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 600,
            mb: 1,
            background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
            ml: 2
          }}
        >
          New Car Diagnosis
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Fill in the details below to start a new diagnosis
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Make"
            name="make"
            value={vehicleInfo.make}
            onChange={handleVehicleInfoChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Model"
            name="model"
            value={vehicleInfo.model}
            onChange={handleVehicleInfoChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Year"
            name="year"
            value={vehicleInfo.year}
            onChange={handleVehicleInfoChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="VIN"
            name="vin"
            value={vehicleInfo.vin}
            onChange={handleVehicleInfoChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Mileage"
            name="mileage"
            value={vehicleInfo.mileage}
            onChange={handleVehicleInfoChange}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Symptoms"
            value={symptoms}
            onChange={handleSymptomsChange}
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenAssistant}
            sx={{ mb: 2 }}
          >
            Open Assistant
          </Button>
          <VehicleDiagnosisAssistant
            open={isAssistantOpen}
            onClose={handleCloseAssistant}
            onUseDiagnosis={handleUseDiagnosis}
            isLoading={false}
            initialMessages={[
              {
                id: 1,
                role: 'assistant',
                content: 'Hello! I\'m here to help diagnose your vehicle. Please describe the issues you\'re experiencing in detail.'
              }
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewDiagnosis;
