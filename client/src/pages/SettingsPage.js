import React, { useState } from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  Container, 
  Typography,
  Paper
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import LlmSettings from '../components/settings/LlmSettings';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  };
}

const SettingsPage = () => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t('settings.title')}
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="settings tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label={t('settings.tabs.llm')} {...a11yProps(0)} />
          <Tab label={t('settings.tabs.profile')} {...a11yProps(1)} />
          <Tab label={t('settings.tabs.notifications')} {...a11yProps(2)} />
        </Tabs>
      </Box>

      <Paper elevation={2}>
        <TabPanel value={tabValue} index={0}>
          <LlmSettings />
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            {t('settings.profile.title')}
          </Typography>
          <Typography color="textSecondary">
            {t('settings.comingSoon')}
          </Typography>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            {t('settings.notifications.title')}
          </Typography>
          <Typography color="textSecondary">
            {t('settings.comingSoon')}
          </Typography>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default SettingsPage;
