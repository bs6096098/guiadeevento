import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { NotificationProvider } from './context/NotificationContext';
import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const [mode, setMode] = useState('dark');

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            primary: {
              main: '#00F5FF',
            },
            secondary: {
              main: '#FF00E4',
            },
            background: {
              default: '#0A0A0A',
              paper: '#141414',
            },
          }
        : {
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
  });

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <NotificationProvider>
            <CssBaseline />
            <Navbar onToggleTheme={toggleColorMode} currentTheme={mode} />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<RegisterPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/evento/:id" element={<EventPage />} />
              <Route path="/perfil" element={<ProfilePage />} />
            </Routes>
          </NotificationProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
