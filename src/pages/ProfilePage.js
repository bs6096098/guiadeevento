import {
  Container,
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Avatar,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Switch,
  Divider,
  Chip,
  CircularProgress
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import EventCard from '../components/EventCard';

function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    upcoming: true,
    promotions: false
  });

  const [userEvents, setUserEvents] = useState({
    favoriteEvents: [],
    eventHistory: []
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Simular carregamento de dados do usuário
    const loadUserData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUserEvents({
          favoriteEvents: [
            {
              id: 1,
              title: "Festival de Música Eletrônica",
              date: "2024-05-15",
              location: "São Paulo, SP",
              image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
              price: 150,
              category: "Música",
              isFavorite: true
            },
            // Adicione mais eventos aqui
          ],
          eventHistory: [
            {
              id: 2,
              title: "Workshop de Fotografia",
              date: "2024-03-10",
              location: "Rio de Janeiro, RJ",
              status: "Concluído",
              rating: 5
            },
            // Adicione mais eventos aqui
          ]
        });
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user, navigate]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleNotificationChange = (setting) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          bgcolor: 'background.default'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Perfil Header */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar
                src={user?.avatar}
                sx={{ width: 100, height: 100 }}
              />
            </Grid>
            <Grid item xs>
              <Typography variant="h4" gutterBottom>
                {user?.name}
              </Typography>
              <Typography color="text.secondary">
                {user?.email}
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                >
                  Editar Perfil
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<LogoutIcon />}
                  onClick={logout}
                >
                  Sair
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Tabs */}
        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
          >
            <Tab 
              icon={<FavoriteIcon />} 
              label="Favoritos" 
              iconPosition="start"
            />
            <Tab 
              icon={<HistoryIcon />} 
              label="Histórico" 
              iconPosition="start"
            />
            <Tab 
              icon={<SettingsIcon />} 
              label="Configurações" 
              iconPosition="start"
            />
          </Tabs>
        </Paper>

        {/* Tab Panels */}
        {tabValue === 0 && (
          <Grid container spacing={3}>
            {userEvents.favoriteEvents.length === 0 ? (
              <Grid item xs={12}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography color="text.secondary">
                    Você ainda não tem eventos favoritos
                  </Typography>
                </Paper>
              </Grid>
            ) : (
              userEvents.favoriteEvents.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event.id}>
                  <EventCard event={event} />
                </Grid>
              ))
            )}
          </Grid>
        )}

        {tabValue === 1 && (
          <Paper>
            {userEvents.eventHistory.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography color="text.secondary">
                  Você ainda não participou de nenhum evento
                </Typography>
              </Box>
            ) : (
              <List>
                {userEvents.eventHistory.map((event) => (
                  <ListItem key={event.id} divider>
                    <ListItemText
                      primary={event.title}
                      secondary={
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                          <Chip 
                            label={event.date} 
                            size="small" 
                            variant="outlined"
                          />
                          <Chip 
                            label={event.location} 
                            size="small" 
                            variant="outlined"
                          />
                          <Chip 
                            label={event.status} 
                            size="small"
                            color={event.status === "Concluído" ? "success" : "default"}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        )}

        {tabValue === 2 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Notificações
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Notificações por E-mail"
                  secondary="Receba atualizações sobre seus eventos por e-mail"
                />
                <Switch
                  checked={notifications.email}
                  onChange={() => handleNotificationChange('email')}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Notificações no Navegador"
                  secondary="Receba notificações push no seu navegador"
                />
                <Switch
                  checked={notifications.browser}
                  onChange={() => handleNotificationChange('browser')}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Eventos Próximos"
                  secondary="Seja notificado sobre eventos que você demonstrou interesse"
                />
                <Switch
                  checked={notifications.upcoming}
                  onChange={() => handleNotificationChange('upcoming')}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Promoções"
                  secondary="Receba ofertas especiais e descontos em eventos"
                />
                <Switch
                  checked={notifications.promotions}
                  onChange={() => handleNotificationChange('promotions')}
                />
              </ListItem>
            </List>
          </Paper>
        )}
      </Container>
    </Box>
  );
}

export default ProfilePage; 