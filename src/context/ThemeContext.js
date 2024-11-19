import { createContext, useState, useContext, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('theme_mode');
    return savedMode || 'dark';
  });

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark' ? {
            primary: {
              main: '#00F5FF',
              light: '#33F7FF',
              dark: '#00DBFF',
            },
            secondary: {
              main: '#FF00E4',
            },
            background: {
              default: '#0A0A0A',
              paper: '#141414',
            },
          } : {
            primary: {
              main: '#0088FF',
            },
            secondary: {
              main: '#E100FF',
            },
            background: {
              default: '#F5F5F5',
              paper: '#FFFFFF',
            },
          }),
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                background: mode === 'dark' ? 'rgba(20, 20, 20, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
              },
            },
          },
        },
      }),
    [mode],
  );

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme_mode', newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext); 