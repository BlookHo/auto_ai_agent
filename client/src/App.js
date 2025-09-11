import React, { Suspense, useEffect } from 'react';
import { CssBaseline, Box, CircularProgress, Container, Typography } from '@mui/material';
import { Outlet, Navigate, useLocation, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider, useThemeContext } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NewDiagnosis from './pages/NewDiagnosis';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from './contexts/LanguageContext';
import './i18n'; // Import i18n configuration
import { useTranslation } from 'react-i18next';

/**
 * A wrapper for routes that require authentication
 */
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (!user) {
    // Redirect to login, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

/**
 * Language route component to handle language-specific routes
 */
const LanguageRoute = () => {
  const { lang } = useParams();
  const { changeLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // If the language in the URL is valid, update the context
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      changeLanguage(lang);
    } else {
      // If the language is not supported, redirect to default language
      const pathSegments = location.pathname.split('/').filter(Boolean);
      const basePath = pathSegments.length > 1 ? `/${pathSegments.slice(1).join('/')}` : '/';
      navigate(`/${DEFAULT_LANGUAGE}${basePath}`, { replace: true });
    }
  }, [lang, changeLanguage, navigate, location.pathname]);
  
  return <Outlet />;
};

/**
 * Main app layout with language support
 */
const AppLayout = () => {
  return (
    <div className="App">
      <Navbar />
      <Box component="main" sx={{ 
        minHeight: 'calc(100vh - 64px)', 
        pt: 2, // Reduced from 8 (32px) to 2 (16px)
        pb: 4,
        '& .MuiBox-root.css-u7a00a': {
          marginTop: 0
        },
        '& .MuiBox-root.css-54xu33': {
          paddingTop: 2 // 16px padding top
        }
      }}>
        <Container maxWidth="lg">
          <Suspense fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          }>
            <Outlet />
          </Suspense>
        </Container>
      </Box>
    </div>
  );
};

/**
 * 404 Not Found page
 */
const NotFound = () => {
  const { t } = useTranslation();
  
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        {t('common.pageNotFound')}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {t('common.pageNotFoundMessage')}
      </Typography>
    </Box>
  );
};

/**
 * Component to wrap the app with providers and set up routing
 */
const AppContent = () => {
  const { theme } = useThemeContext();
  const { language, changeLanguage } = useLanguage();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Handle initial language detection and redirection
  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const urlLang = pathSegments[0];
    
    // If no language in URL, redirect to detected language
    if (!urlLang || !SUPPORTED_LANGUAGES.includes(urlLang)) {
      const detectedLang = i18n.language || navigator.language.split('-')[0];
      const defaultLang = SUPPORTED_LANGUAGES.includes(detectedLang) ? detectedLang : DEFAULT_LANGUAGE;
      
      // Only navigate if we're not already on the correct path
      if (urlLang !== defaultLang) {
        const newPath = `/${defaultLang}${location.pathname}`.replace(/^\/+/g, '/');
        navigate(newPath, { replace: true });
      }
      return;
    }
    
    // If URL language is different from i18n, update i18n
    if (urlLang !== i18n.language) {
      i18n.changeLanguage(urlLang);
    }
    
    // If URL language is different from context, update context
    if (urlLang !== language) {
      changeLanguage(urlLang);
    }
  }, [location.pathname, i18n, language, changeLanguage, navigate]);
  
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider>
        <Routes>
          {/* Language-specific routes */}
          <Route path=":lang" element={<LanguageRoute />}>
            <Route element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route 
                path="new" 
                element={
                  <PrivateRoute>
                    <NewDiagnosis />
                  </PrivateRoute>
                } 
              />
              <Route path="login" element={<Login />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
          
          {/* Redirect root to default language */}
          <Route 
            path="/" 
            element={
              <Navigate 
                to={`/${DEFAULT_LANGUAGE}`} 
                replace 
              />
            } 
          />
          
          {/* Catch-all route for unsupported languages */}
          <Route 
            path="*" 
            element={
              <Navigate 
                to={`/${DEFAULT_LANGUAGE}`} 
                replace 
              />
            } 
          />
        </Routes>
      </LanguageProvider>
    </MuiThemeProvider>
  );
};

/**
 * Root App component with all providers
 */
const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
