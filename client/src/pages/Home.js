import React from 'react';
import { Typography, Grid, Card, CardContent, Button, Box, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useTranslation } from 'react-i18next';

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <Card sx={{ 
      height: '100%',
      backgroundColor: 'background.paper',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
      },
    }}>
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{
          width: '56px',
          height: '56px',
          borderRadius: '12px',
          backgroundColor: 'rgba(25, 195, 125, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
        }}>
          <Icon sx={{ fontSize: '28px', color: 'primary.main' }} />
        </Box>
        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 1.5 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ flexGrow: 1 }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Home = () => {
  const { t } = useTranslation();
  
  return (
    <Box sx={{ 
      minHeight: 'calc(100vh - 64px)',
      background: 'radial-gradient(circle at 50% 0%, rgba(25, 195, 125, 0.1) 0%, transparent 70%)',
      pt: { xs: 6, md: 10 },
      pb: 10,
    }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 12 }, px: { xs: 0, sm: 2 } }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              lineHeight: 1.1,
              mb: 3,
              background: 'linear-gradient(90deg, #19C37D 0%, #A78BFA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: { xs: 'center', md: 'left' },
            }}>
            {t('home.hero.title')}
          </Typography>
          <Typography 
            variant="h5" 
            component="p" 
            sx={{ 
              color: 'text.secondary',
              maxWidth: '720px',
              mx: 'auto',
              mb: 4,
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              lineHeight: 1.6,
            }}
          >
            {t('home.hero.description')}
          </Typography>
          <Button
            component={RouterLink}
            to="/new"
            variant="contained"
            size="large"
            sx={{
              background: 'linear-gradient(90deg, #19c37d 0%, #10a37f 100%)',
              color: 'white',
              px: 4,
              py: 1.5,
              fontSize: '1.0625rem',
              fontWeight: 500,
              borderRadius: '8px',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(90deg, #1ed68f 0%, #19a67c 100%)',
                boxShadow: '0 0 20px rgba(25, 195, 125, 0.4)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease-in-out',
              minWidth: '220px',
              height: '52px',
            }}
          >
            {t('home.hero.cta')}
          </Button>
        </Box>

        {/* Features Grid */}
        <Box sx={{ mt: 8 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              textAlign: 'center',
              mb: 6,
              fontSize: { xs: '1.75rem', md: '2rem' },
              fontWeight: 700,
            }}
          >
            {t('home.features.title')}
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard
                icon={AutoFixHighIcon}
                title={t('home.features.ai.title')}
                description={t('home.features.ai.description')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard
                icon={SpeedIcon}
                title={t('home.features.speed.title')}
                description={t('home.features.speed.description')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard
                icon={SecurityIcon}
                title={t('home.features.security.title')}
                description={t('home.features.security.description')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard
                icon={SupportAgentIcon}
                title={t('home.features.support.title')}
                description={t('home.features.support.description')}
              />
            </Grid>
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box sx={{
          mt: { xs: 8, md: 12 },
          p: { xs: 3, md: 6 },
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(25, 195, 125, 0.1) 0%, rgba(16, 163, 127, 0.1) 100%)',
          border: '1px solid rgba(25, 195, 125, 0.2)',
          textAlign: 'center',
        }}>
          <Typography variant="h4" component="h3" sx={{ mb: 2, fontWeight: 700 }}>
            {t('home.cta.title')}
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', maxWidth: '600px', mx: 'auto' }}>
            {t('home.cta.description')}
          </Typography>
          <Button
            component={RouterLink}
            to="/new"
            variant="contained"
            size="large"
            sx={{
              background: 'linear-gradient(90deg, #19c37d 0%, #10a37f 100%)',
              color: 'white',
              px: 5,
              py: 1.5,
              fontSize: '1.0625rem',
              fontWeight: 500,
              borderRadius: '8px',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(90deg, #1ed68f 0%, #19a67c 100%)',
                boxShadow: '0 0 20px rgba(25, 195, 125, 0.4)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease-in-out',
              minWidth: '220px',
              height: '52px',
            }}
          >
            {t('home.cta.button')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
