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
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // If the language in the URL is valid, update i18n
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
    } else {
      // If the language is not supported, redirect to default language
      const pathSegments = location.pathname.split('/').filter(Boolean);
      const basePath = pathSegments.length > 1 ? `/${pathSegments.slice(1).join('/')}` : '/';
      navigate(`/${DEFAULT_LANGUAGE}${basePath}`, { replace: true });
    }
  }, [lang, i18n, navigate, location.pathname]);
  
  return <Outlet />;
};

/**
 * Main app layout with language support
 */
const AppLayout = () => {
  return (
    <div className="App">
      <Navbar />
      <Box component="main" sx={{ minHeight: 'calc(100vh - 64px)', pt: 8, pb: 4 }}>
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
  const { language } = useLanguage();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  
  // Sync i18n language with our language context
  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);
  
  // Redirect to the user's preferred language if no language is specified
  useEffect(() => {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    
    // If no language is specified in the URL, redirect to the user's preferred language
    if (pathSegments.length === 0 || !SUPPORTED_LANGUAGES.includes(pathSegments[0])) {
      const userLang = i18n.language || window.navigator.language.split('-')[0];
      const defaultLang = SUPPORTED_LANGUAGES.includes(userLang) ? userLang : DEFAULT_LANGUAGE;
      navigate(`/${defaultLang}${window.location.pathname}`, { replace: true });
    }
  }, [navigate, i18n]);
  
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
