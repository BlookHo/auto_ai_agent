import React from 'react';
import { Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  return (
    <Grid container spacing={4} sx={{ p: 4, maxWidth: '1200px', margin: '0 auto' }}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white', fontWeight: 600 }}>
          Welcome to AI Car Diagnostics
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          Our AI-powered car diagnostic system helps you identify and fix car issues quickly and accurately.
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={8}>
        <Card sx={{ 
          backgroundColor: '#444654',
          color: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
              Get Started
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
              Start a new diagnostic session to get AI-powered analysis of your car's issues.
              Our system will guide you through the process and provide detailed recommendations.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/new"
              size="large"
              sx={{
                backgroundColor: '#10a37f',
                '&:hover': {
                  backgroundColor: '#0d8c6d',
                },
                textTransform: 'none',
                fontWeight: 500,
                padding: '8px 16px',
                borderRadius: '4px'
              }}
            >
              Start New Diagnosis
            </Button>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ 
          backgroundColor: '#444654',
          color: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          height: '100%'
        }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
              Recent Diagnostics
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 2 }}>
              Your recent diagnostic sessions will appear here.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Home;
