import React, { createContext, useContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('green'); // 'green' or 'violet'

  const theme = useMemo(() => {
    const baseTheme = {
      typography: {
        fontFamily: [
          'Söhne',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ].join(','),
        h1: {
          fontWeight: 700,
          fontSize: '2.5rem',
          lineHeight: 1.2,
        },
        h2: {
          fontWeight: 600,
          fontSize: '2rem',
          lineHeight: 1.25,
        },
        h3: {
          fontWeight: 600,
          fontSize: '1.5rem',
          lineHeight: 1.3,
        },
      },
      shape: {
        borderRadius: 8,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              borderRadius: '6px',
              fontWeight: 500,
              '&:hover': {
                opacity: 0.9,
              },
            },
          },
        },
      },
    };

    if (mode === 'green') {
      return createTheme({
        ...baseTheme,
        palette: {
          mode: 'dark',
          primary: {
            main: '#19c37d',
            light: '#4fd69f',
            dark: '#0f8a5c',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#8e8ea0',
            light: '#a1a1b5',
            dark: '#6e6e8f',
          },
          background: {
            default: '#343541',
            paper: '#444654',
          },
          text: {
            primary: '#ffffff',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.5)',
          },
          divider: 'rgba(255, 255, 255, 0.1)',
        },
      });
    }

    // Violet theme
    return createTheme({
      ...baseTheme,
      palette: {
        mode: 'dark',
        primary: {
          main: '#a78bfa',
          light: '#c4b5fd',
          dark: '#8b5cf6',
          contrastText: '#1e1b4b',
        },
        secondary: {
          main: '#c7d2fe',
          light: '#e0e7ff',
          dark: '#a5b4fc',
        },
        background: {
          default: '#1e1b4b',
          paper: '#312e81',
        },
        text: {
          primary: '#eef2ff',
          secondary: '#c7d2fe',
          disabled: '#a5b4fc',
        },
        divider: 'rgba(199, 210, 254, 0.1)',
      },
    });
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'green' ? 'violet' : 'green'));
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
