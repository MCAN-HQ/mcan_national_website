import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider, createTheme, Theme, responsiveFontSizes } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';


interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const CustomThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  let theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#00C853' : '#1B5E20',
        dark: darkMode ? '#00A041' : '#0D3A0D',
        light: darkMode ? '#4CAF50' : '#2E7D32',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: darkMode ? '#FFD700' : '#FF8F00',
        dark: darkMode ? '#FFC107' : '#E65100',
        light: darkMode ? '#FFF176' : '#FFB74D',
        contrastText: '#000000',
      },
      background: {
        default: darkMode ? '#0A0A0A' : '#FAFAFA',
        paper: darkMode ? '#1A1A1A' : '#FFFFFF',
      },
      text: {
        primary: darkMode ? '#FFFFFF' : '#1A1A1A',
        secondary: darkMode ? '#B0B0B0' : '#666666',
        disabled: darkMode ? '#666666' : '#999999',
      },
      success: {
        main: '#4CAF50',
        dark: '#388E3C',
        light: '#81C784',
      },
      warning: {
        main: '#FF9800',
        dark: '#F57C00',
        light: '#FFB74D',
      },
      error: {
        main: '#F44336',
        dark: '#D32F2F',
        light: '#EF5350',
      },
      info: {
        main: '#2196F3',
        dark: '#1976D2',
        light: '#64B5F6',
      },
    },
    typography: {
      fontFamily: '"Inter", "Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontFamily: '"Poppins", "Inter", sans-serif',
        fontWeight: 800,
        fontSize: '3.5rem',
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        background: darkMode 
          ? 'linear-gradient(135deg, #FFFFFF 0%, #B0B0B0 100%)'
          : 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
      h2: {
        fontFamily: '"Poppins", "Inter", sans-serif',
        fontWeight: 700,
        fontSize: '2.75rem',
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
        background: darkMode 
          ? 'linear-gradient(135deg, #FFFFFF 0%, #B0B0B0 100%)'
          : 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
      h3: {
        fontFamily: '"Poppins", "Inter", sans-serif',
        fontWeight: 600,
        fontSize: '2.25rem',
        lineHeight: 1.4,
        letterSpacing: '-0.01em',
      },
      h4: {
        fontFamily: '"Poppins", "Inter", sans-serif',
        fontWeight: 600,
        fontSize: '1.875rem',
        lineHeight: 1.4,
      },
      h5: {
        fontFamily: '"Poppins", "Inter", sans-serif',
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.5,
      },
      h6: {
        fontFamily: '"Poppins", "Inter", sans-serif',
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: 1.5,
      },
      body1: {
        fontFamily: '"Inter", "Roboto", sans-serif',
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: 1.6,
      },
      body2: {
        fontFamily: '"Inter", "Roboto", sans-serif',
        fontWeight: 400,
        fontSize: '0.875rem',
        lineHeight: 1.6,
      },
      button: {
        fontFamily: '"Inter", "Roboto", sans-serif',
        fontWeight: 600,
        fontSize: '0.875rem',
        textTransform: 'none',
        letterSpacing: '0.02em',
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollBehavior: 'smooth',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            background: darkMode 
              ? 'linear-gradient(145deg, #1A1A1A 0%, #2A2A2A 100%)'
              : 'linear-gradient(145deg, #FFFFFF 0%, #FAFAFA 100%)',
            boxShadow: darkMode 
              ? '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)'
              : '0 8px 32px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(10px)',
            border: darkMode 
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-4px)',
            boxShadow: darkMode 
                ? '0 16px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                : '0 16px 48px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.08)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.875rem',
            padding: '12px 24px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
              transition: 'left 0.5s',
            },
            '&:hover::before': {
              left: '100%',
            },
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: darkMode 
                ? '0 8px 25px rgba(0, 200, 83, 0.3)'
                : '0 8px 25px rgba(27, 94, 32, 0.3)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          },
          contained: {
            background: darkMode 
              ? 'linear-gradient(135deg, #00C853 0%, #4CAF50 100%)'
              : 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
            boxShadow: darkMode 
              ? '0 4px 15px rgba(0, 200, 83, 0.3)'
              : '0 4px 15px rgba(27, 94, 32, 0.3)',
            '&:hover': {
              background: darkMode 
                ? 'linear-gradient(135deg, #00A041 0%, #388E3C 100%)'
                : 'linear-gradient(135deg, #0D3A0D 0%, #1B5E20 100%)',
            },
          },
          outlined: {
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            fontWeight: 500,
            fontSize: '0.75rem',
            padding: '4px 12px',
            height: 'auto',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: darkMode 
              ? 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)'
              : 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: darkMode 
              ? '0 4px 20px rgba(0, 0, 0, 0.4)'
              : '0 4px 20px rgba(27, 94, 32, 0.2)',
            borderBottom: darkMode 
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(255, 255, 255, 0.1)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-1px)',
              },
              '&.Mui-focused': {
                transform: 'translateY(-2px)',
            boxShadow: darkMode 
                  ? '0 8px 25px rgba(0, 200, 83, 0.2)'
                  : '0 8px 25px rgba(27, 94, 32, 0.2)',
              },
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });

  // Enable responsive typography scaling across breakpoints
  theme = responsiveFontSizes(theme);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, theme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a CustomThemeProvider');
  }
  return context;
};
