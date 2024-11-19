import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
  Button,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState, useEffect } from 'react';

function NotificationSettings({ open, onClose }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState('1day');
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [browserNotifications, setBrowserNotifications] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    // Verificar permissão de notificações do navegador
    if ('Notification' in window) {
      if (Notification.permission === 'denied') {
        setPermissionDenied(true);
      }
    }
  }, []);

  const handleEnableNotifications = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        setBrowserNotifications(true);
        setPermissionDenied(false);
      } else {
        setPermissionDenied(true);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Configurações de Notificações</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {permissionDenied && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            As notificações estão bloqueadas no seu navegador. Por favor, habilite-as nas configurações do navegador.
          </Alert>
        )}

        <FormGroup sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Switch
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                onClick={handleEnableNotifications}
              />
            }
            label="Ativar notificações"
          />

          {notificationsEnabled && (
            <Box sx={{ ml: 3, mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Lembrar-me antes do evento:
              </Typography>
              <Select
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                size="small"
                sx={{ minWidth: 200, mb: 2 }}
              >
                <MenuItem value="1hour">1 hora antes</MenuItem>
                <MenuItem value="3hours">3 horas antes</MenuItem>
                <MenuItem value="1day">1 dia antes</MenuItem>
                <MenuItem value="1week">1 semana antes</MenuItem>
              </Select>

              <FormControlLabel
                control={
                  <Switch
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                  />
                }
                label="Receber notificações por e-mail"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={browserNotifications}
                    onChange={(e) => setBrowserNotifications(e.target.checked)}
                    disabled={permissionDenied}
                  />
                }
                label="Receber notificações no navegador"
              />
            </Box>
          )}
        </FormGroup>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button variant="contained" onClick={onClose}>
            Salvar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default NotificationSettings; 