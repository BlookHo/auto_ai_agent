import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import i18n from 'i18next';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../contexts/LanguageContext';

/**
 * Extracts the language code from the URL path
 * @param {string} pathname - The current pathname
 * @returns {string} The language code (e.g., 'en', 'ru', 'de')
 */
export const getLanguageFromPath = (pathname) => {
  // Remove leading slash and split path into segments
  const segments = pathname.split('/').filter(Boolean);
  
  // First segment is the language code if it's a supported language
  if (segments.length > 0 && SUPPORTED_LANGUAGES.includes(segments[0])) {
    return segments[0];
  }
  
  // Default to the current language or the default language
  return i18n.language || DEFAULT_LANGUAGE;
};

/**
 * Gets the base path (path without language prefix)
 * @param {string} pathname - The current pathname
 * @returns {string} The base path without the language prefix
 */
export const getBasePath = (pathname) => {
  const language = getLanguageFromPath(pathname);
  const pathWithoutLang = pathname.replace(new RegExp(`^/${language}`), '');
  return pathWithoutLang || '/';
};

/**
 * Hook to get the current language and base path
 * @returns {Object} { language, basePath }
 */
export const useLanguageRouting = () => {
  const location = useLocation();
  const language = getLanguageFromPath(location.pathname);
  const basePath = getBasePath(location.pathname);
  
  return { language, basePath };
};

/**
 * Hook to navigate with language support
 * @returns {Function} A function to navigate to a path with the current language
 */
export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { language } = useLanguageRouting();
  
  return (to, options) => {
    // If 'to' is a string, prepend the current language
    if (typeof to === 'string') {
      // Don't add language prefix for absolute URLs or if already has a language prefix
      if (to.startsWith('http') || to.startsWith('//') || 
          SUPPORTED_LANGUAGES.some(lang => to.startsWith(`/${lang}/`) || to === `/${lang}`)) {
        navigate(to, options);
      } else {
        // Add language prefix for relative paths
        const path = to.startsWith('/') ? to : `/${to}`;
        navigate(`/${language}${path}`, options);
      }
    } else if (to && typeof to === 'object' && to.pathname) {
      // Handle location descriptor objects
      const { pathname, ...rest } = to;
      // Don't add language prefix for absolute URLs or if already has a language prefix
      if (pathname.startsWith('http') || pathname.startsWith('//') ||
          SUPPORTED_LANGUAGES.some(lang => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`)) {
        navigate({ pathname, ...rest }, options);
      } else {
        // Add language prefix for relative paths
        const newPathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
        navigate({ pathname: `/${language}${newPathname}`, ...rest }, options);
      }
    } else {
      navigate(to, options);
    }
  };
};

/**
 * Creates a localized path by prepending the current language
 * @param {string} path - The path to localize
 * @param {string} [lang] - The language to use (defaults to current language)
 * @returns {string} The localized path
 */
export const localizePath = (path, lang) => {
  const language = lang || i18n.language || DEFAULT_LANGUAGE;
  
  // Don't modify absolute URLs or paths that already have a language prefix
  if (path.startsWith('http') || path.startsWith('//') ||
      SUPPORTED_LANGUAGES.some(l => path.startsWith(`/${l}/`) || path === `/${l}`)) {
    return path;
  }
  
  // Ensure path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Special case for home page
  if (normalizedPath === '/') {
    return `/${language}`;
  }
  
  return `/${language}${normalizedPath}`;
};

/**
 * Higher-order component to wrap route components with language support
 * @param {React.ComponentType} Component - The component to wrap
 * @returns {React.ComponentType} The wrapped component with language support
 */
export const withLanguageSupport = (Component) => {
  const WrappedComponent = (props) => {
    const { language, basePath } = useLanguageRouting();
    const navigate = useLocalizedNavigate();
    
    // Update i18n language when it changes in the URL
    React.useEffect(() => {
      if (language && language !== i18n.language) {
        i18n.changeLanguage(language);
      }
    }, [language]);
    
    return <Component {...props} language={language} basePath={basePath} navigate={navigate} />;
  };
  
  return WrappedComponent;
};

/**
 * Creates a route configuration with language support
 * @param {Object} route - The route configuration
 * @param {string} route.path - The route path (without language prefix)
 * @param {React.ComponentType} route.component - The component to render
 * @param {boolean} [route.exact] - Whether the route should match exactly
 * @param {boolean} [route.strict] - Whether the route is strict
 * @param {Array} [route.routes] - Nested routes
 * @returns {Array} An array of route configurations with language prefixes
 */
export const createLocalizedRoutes = (route) => {
  const routes = [];
  
  // Create a route for each supported language
  SUPPORTED_LANGUAGES.forEach(lang => {
    const path = `/${lang}${route.path}`;
    
    routes.push({
      ...route,
      path,
      // Add language prop to the route component
      element: React.createElement(route.element.type, { ...route.element.props, language: lang })
    });
  });
  
  // Add a default route (without language prefix) that redirects to the user's preferred language
  if (route.path === '/') {
    routes.push({
      ...route,
      path: '/',
      element: <LanguageRedirect />
    });
  }
  
  return routes;
};

/**
 * Component to redirect to the user's preferred language
 */
const LanguageRedirect = () => {
  const navigate = useNavigate();
  const { language } = useLanguageRouting();
  
  React.useEffect(() => {
    // Redirect to the user's preferred language
    navigate(`/${language}`, { replace: true });
  }, [navigate, language]);
  
  return null;
};

const routingUtils = {
  getLanguageFromPath,
  getBasePath,
  useLanguageRouting,
  useLocalizedNavigate,
  localizePath,
  withLanguageSupport,
  createLocalizedRoutes,
  LanguageRedirect,
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE
};

export default routingUtils;
