import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import i18n from 'i18next';

// Language constants
export const SUPPORTED_LANGUAGES = ['en', 'ru', 'de'];
export const DEFAULT_LANGUAGE = 'ru';

// Create the context with default values
export const LanguageContext = createContext({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  changeLanguage: () => {},
  t: (key) => key,
  isLanguageSupported: (lang) => SUPPORTED_LANGUAGES.includes(lang),
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
});

/**
 * Language provider component that manages the current language state
 * and provides methods to change the language
 */
export const LanguageProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  
  // Get the current language from the URL or i18n
  const getCurrentLanguage = useCallback(() => {
    // First, check the URL for a language parameter
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const urlLang = pathSegments[0];
    
    if (urlLang && SUPPORTED_LANGUAGES.includes(urlLang)) {
      return urlLang;
    }
    
    // Then check i18n's current language
    if (i18n.language && SUPPORTED_LANGUAGES.includes(i18n.language.split('-')[0])) {
      return i18n.language.split('-')[0];
    }
    
    // Then check browser language
    const browserLang = navigator.language.split('-')[0];
    if (browserLang && SUPPORTED_LANGUAGES.includes(browserLang)) {
      return browserLang;
    }
    
    // Default to the default language
    return DEFAULT_LANGUAGE;
  }, [location.pathname]);
  
  // Update the language state when the URL or i18n language changes
  useEffect(() => {
    const currentLang = getCurrentLanguage();
    if (currentLang !== language) {
      setLanguage(currentLang);
    }
  }, [getCurrentLanguage, language]);
  
  // Handle language changes from i18n
  useEffect(() => {
    const handleLanguageChange = (lng) => {
      const lang = lng.split('-')[0];
      if (lang !== language && SUPPORTED_LANGUAGES.includes(lang)) {
        setLanguage(lang);
      }
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [language]);
  
  /**
   * Change the current language
   * @param {string} newLang - The new language code (e.g., 'en', 'ru', 'de')
   */
  const changeLanguage = useCallback((newLang) => {
    if (!newLang || !SUPPORTED_LANGUAGES.includes(newLang)) {
      console.warn(`Unsupported language: ${newLang}. Defaulting to ${DEFAULT_LANGUAGE}`);
      newLang = DEFAULT_LANGUAGE;
    }
    
    // Update i18n
    i18n.changeLanguage(newLang);
    
    // Update the URL to reflect the new language
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    // If the first segment is a language code, replace it
    if (pathSegments.length > 0 && SUPPORTED_LANGUAGES.includes(pathSegments[0])) {
      pathSegments[0] = newLang;
    } else {
      // Otherwise, prepend the language code
      pathSegments.unshift(newLang);
    }
    
    const newPath = `/${pathSegments.join('/')}${location.search}${location.hash}`;
    
    // Use replace instead of navigate to avoid adding to history
    navigate(newPath, { replace: true });
    
    // Update the language state
    setLanguage(newLang);
  }, [navigate, location.pathname, location.search, location.hash]);
  
  // Expose the translation function with proper binding
  const t = useCallback((key, options) => {
    return i18n.t(key, options);
  }, []);
  
  // Check if a language is supported
  const isLanguageSupported = useCallback((lang) => {
    return SUPPORTED_LANGUAGES.includes(lang);
  }, []);
  
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
        changeLanguage,
        t,
        isLanguageSupported,
        SUPPORTED_LANGUAGES,
        DEFAULT_LANGUAGE,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Custom hook to access the language context
 * @returns {Object} The language context
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};

/**
 * Higher-order component to inject the language context into a component
 * @param {React.ComponentType} Component - The component to wrap
 * @returns {React.ComponentType} The wrapped component with language context
 */
export const withLanguage = (Component) => {
  const WrappedComponent = (props) => {
    const languageContext = useLanguage();
    return <Component {...props} {...languageContext} />;
  };
  
  // Set a display name for the wrapped component for better debugging
  const componentName = Component.displayName || Component.name || 'Component';
  WrappedComponent.displayName = `withLanguage(${componentName})`;
  
  return WrappedComponent;
};
