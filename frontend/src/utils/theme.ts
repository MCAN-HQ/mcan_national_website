import { createTheme } from '@mui/material/styles';

// MCAN Brand Colors
const colors = {
  primary: {
    main: '#2E7D32',
    light: '#4CAF50',
    lighter: '#81C784',
    dark: '#1B5E20',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#FFC107',
    light: '#FFD54F',
    dark: '#FF8F00',
    contrastText: '#000000',
  },
  background: {
    default: '#FAFAFA',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#424242',
    secondary: '#757575',
  },
  success: {
    main: '#4CAF50',
    light: '#81C784',
    dark: '#388E3C',
  },
  warning: {
    main: '#FF9800',
    light: '#FFB74D',
    dark: '#F57C00',
  },
  error: {
    main: '#F44336',
    light: '#EF5350',
    dark: '#D32F2F',
  },
  info: {
    main: '#2196F3',
    light: '#64B5F6',
    dark: '#1976D2',
  },
};

export const theme = createTheme({
  palette: {
    ...colors,
    mode: 'light',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: colors.primary.dark,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: colors.primary.dark,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: colors.primary.dark,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: colors.primary.dark,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: colors.primary.dark,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: colors.primary.dark,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: colors.text.primary,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: colors.text.secondary,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontWeight: 500,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(46, 125, 50, 0.2)',
          },
        },
        contained: {
          backgroundColor: colors.primary.main,
          '&:hover': {
            backgroundColor: colors.primary.dark,
          },
        },
        outlined: {
          borderColor: colors.primary.main,
          color: colors.primary.main,
          '&:hover': {
            borderColor: colors.primary.dark,
            backgroundColor: 'rgba(46, 125, 50, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(46, 125, 50, 0.1)',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(46, 125, 50, 0.15)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.primary.main,
          boxShadow: '0 2px 8px rgba(46, 125, 50, 0.2)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.primary.light,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.primary.main,
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: colors.primary.lighter,
          color: colors.primary.dark,
          fontWeight: 500,
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
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Islamic theme extensions
export const islamicTheme = {
  ...theme,
  typography: {
    ...theme.typography,
    arabic: {
      fontFamily: '"Amiri", "Times New Roman", serif',
      direction: 'rtl',
      textAlign: 'right',
    },
  },
  custom: {
    islamicPattern: {
      background: `
        radial-gradient(circle at 25% 25%, rgba(46, 125, 50, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(76, 175, 80, 0.1) 0%, transparent 50%)
      `,
    },
    crescent: {
      color: colors.secondary.main,
    },
    mosque: {
      color: colors.primary.main,
    },
  },
};
