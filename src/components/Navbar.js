import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';

function Navbar({ onToggleTheme, currentTheme }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'background.paper' }} elevation={0}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            cursor: 'pointer',
            color: 'primary.main',
            fontWeight: 'bold'
          }}
          onClick={() => navigate('/')}
        >
          Event Guide
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={onToggleTheme} sx={{ color: 'primary.main' }}>
            {currentTheme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {user ? (
            <>
              <IconButton sx={{ color: 'primary.main' }}>
                <NotificationsIcon />
              </IconButton>
              
              <IconButton 
                onClick={handleMenu}
                sx={{ color: 'primary.main' }}
              >
                {user.avatar ? (
                  <Avatar src={user.avatar} alt={user.name} />
                ) : (
                  <SettingsIcon />
                )}
              </IconButton>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider'
                  }
                }}
              >
                <MenuItem onClick={() => {
                  handleClose();
                  navigate('/perfil');
                }}>
                  Meu Perfil
                </MenuItem>
                <MenuItem onClick={() => {
                  handleClose();
                  logout();
                }}>
                  Sair
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/login')}
                sx={{ color: 'primary.main', borderColor: 'primary.main' }}
              >
                Login
              </Button>
              <Button 
                variant="contained" 
                onClick={() => navigate('/registro')}
                sx={{ bgcolor: 'primary.main', color: 'background.default' }}
              >
                Registrar
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 