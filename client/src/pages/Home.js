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
      height: 'calc(100vh - 80px)',
      minHeight: '500px',
      maxHeight: 'calc(100vh - 80px)',
      '&.css-1q20oqd': {
        pb: 3, // Add bottom padding to the specified element
      },
      '& .MuiBox-root': {
        py: 2, // 16px padding top and bottom
      },
      '& .css-giv2cc-MuiTypography-root': {
        pt: 2, // 16px top padding for specific h6 element
      },
      '& .css-quskuc-MuiTypography-root': {
        pb: 2, // 16px bottom padding for specific h2 element
      },
      background: 'radial-gradient(circle at 50% 0%, rgba(25, 195, 125, 0.1) 0%, transparent 70%)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      pt: 0
    }}>
      <Container 
        maxWidth="lg" 
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          py: 0,
          px: { xs: 1, sm: 1.5 },
          overflow: 'hidden',
          gap: 0,
          '& > *': {
            flexShrink: 1,
            minHeight: 0,
            margin: 0,
            padding: 0,
          },
        }}
      >
        {/* Hero Section */}
        <Box sx={{ 
          textAlign: 'center',
          flex: '0 0 auto',
          pt: 0,
          pb: 0,
          my: 0,
          '& h1': { mt: 0 },
        }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              lineHeight: 1.1,
              mb: 0,
              mt: 0,
              background: 'linear-gradient(90deg, #19C37D 0%, #A78BFA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
            }}>
            {t('home.hero.title')}
          </Typography>
          <Typography 
            variant="h6" 
            component="p" 
            sx={{ 
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              mb: 2,
              fontSize: { xs: '1rem', sm: '1.125rem' },
              lineHeight: 1.5,
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
              minWidth: '200px',
              height: '48px',
              mt: 0.5,
              mx: 'auto',
            }}
          >
            {t('home.hero.cta')}
          </Button>
        </Box>

        {/* Features Grid */}
        <Box sx={{ 
          flex: '0 0 auto',
          pt: 0,
          pb: 0,
          overflow: 'hidden',
          '& .MuiTypography-h3': {
            mb: 0.5,
            fontSize: { xs: '1.4rem', sm: '1.6rem' },
            mt: 0,
          },
        }}>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              textAlign: 'center',
              mb: 2,
              fontSize: { xs: '1.75rem', md: '2rem' },
              fontWeight: 700,
            }}
          >
            {t('home.features.title')}
          </Typography>
          
          <Grid container spacing={{ xs: 3, sm: 3.5 }} sx={{ 
            maxHeight: { xs: '45vh', sm: '52vh' },
            overflow: 'hidden',
            mt: 2,
            py: 3,
            alignItems: 'stretch',
            '& .MuiGrid-item': {
              pb: '0 !important',
              display: 'flex',
              '& .MuiCard-root': {
                height: '100%',
                minHeight: { xs: '200px', sm: '220px' },
                '& .MuiCardContent-root': {
                  p: { xs: 2.5, sm: 3.5, pb: 4 },
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '& .MuiSvgIcon-root': {
                    fontSize: '24px',
                  },
                  '& h6': {
                    fontSize: { xs: '0.9375rem', sm: '1rem' },
                    mb: 0,
                    lineHeight: 1.4,
                  },
                  '& p': {
                    fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                    lineHeight: 1.4,
                    mt: 'auto',
                    mb: 0,
                  },
                },
              },
            },
          }}>
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
