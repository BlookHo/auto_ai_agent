import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent, Button, Box, Avatar, Divider, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { UserOutlined, CarOutlined, ToolOutlined, HistoryOutlined } from '@ant-design/icons';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('/api/v1/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: '1400px', margin: '0 auto' }}>
      <Grid container spacing={3}>
        {/* Welcome Card */}
        <Grid item xs={12}>
          <Card sx={{ 
            backgroundColor: '#444654',
            color: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #444654 0%, #343541 100%)',
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background: 'radial-gradient(circle at 80% 20%, rgba(16, 163, 127, 0.1) 0%, transparent 60%)',
              zIndex: 0
            }
          }}>
            <CardContent sx={{ position: 'relative', zIndex: 1, p: { xs: 3, md: 4 } }}>
              <Box display="flex" alignItems="center" mb={3}>
                <Avatar 
                  sx={{ 
                    bgcolor: '#10a37f',
                    width: 60, 
                    height: 60,
                    mr: 3,
                    fontSize: '1.75rem'
                  }}
                >
                  {userData?.name?.charAt(0) || <UserOutlined />}
                </Avatar>
                <Box>
                  <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {greeting()}, {userData?.name?.split(' ')[0] || 'User'}!
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Welcome back to AI Car Diagnostics
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box display="flex" alignItems="center">
                    <Box sx={{ 
                      bgcolor: 'rgba(16, 163, 127, 0.15)', 
                      p: 1.5, 
                      borderRadius: '12px',
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <CarOutlined style={{ fontSize: '24px', color: '#10a37f' }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Vehicles
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>0</Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Box display="flex" alignItems="center">
                    <Box sx={{ 
                      bgcolor: 'rgba(25, 118, 210, 0.15)', 
                      p: 1.5, 
                      borderRadius: '12px',
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <ToolOutlined style={{ fontSize: '24px', color: '#1976d2' }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Diagnostics
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>0</Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Box display="flex" alignItems="center">
                    <Box sx={{ 
                      bgcolor: 'rgba(255, 152, 0, 0.15)', 
                      p: 1.5, 
                      borderRadius: '12px',
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <HistoryOutlined style={{ fontSize: '24px', color: '#ff9800' }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        History
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>0</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Quick Actions */}
        <Grid item xs={12} md={8}>
          <Card sx={{ 
            backgroundColor: '#444654',
            color: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Box flex={1}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 2 }}>
                  Quick Actions
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
                  Start a new diagnostic session to get AI-powered analysis of your car's issues.
                </Typography>
              </Box>
              
              <Box mt="auto">
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/new"
                  size="large"
                  fullWidth
                  sx={{
                    backgroundColor: '#10a37f',
                    '&:hover': {
                      backgroundColor: '#0d8c6d',
                    },
                    textTransform: 'none',
                    fontWeight: 500,
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    height: '48px'
                  }}
                >
                  Start New Diagnosis
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Recent Activity */}
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            backgroundColor: '#444654',
            color: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <CardContent>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 2 }}>
                Recent Activity
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Your recent activity will appear here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
