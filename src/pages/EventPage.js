import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Skeleton,
  Chip,
  Divider
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function EventPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simular dados do evento
        const mockEvent = {
          id: parseInt(id),
          title: "Festival de Música Eletrônica",
          date: "2024-05-15",
          time: "19:00",
          location: "Parque do Ibirapuera",
          image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
          description: "O maior festival de música eletrônica do Brasil",
          price: 150,
          category: "Música",
          isFavorite: false,
          participants: 1500,
          details: "Lorem ipsum dolor sit amet..."
        };

        setEvent(mockEvent);
      } catch (error) {
        console.error('Erro ao carregar evento:', error);
        addNotification({
          message: 'Erro ao carregar evento',
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id, addNotification]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" height={400} />
        <Box sx={{ mt: 4 }}>
          <Skeleton variant="text" height={60} />
          <Skeleton variant="text" width="60%" />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={8}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }

  if (!event) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" color="error">
          Evento não encontrado
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Box
        sx={{
          width: '100%',
          height: '50vh',
          position: 'relative',
          backgroundImage: `url(${event.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)'
          }
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            pb: 4,
            position: 'relative',
            zIndex: 1
          }}
        >
          <Typography variant="h3" color="white" gutterBottom>
            {event.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Chip
              icon={<CalendarTodayIcon />}
              label={new Date(event.date).toLocaleDateString('pt-BR')}
              sx={{ color: 'white', borderColor: 'white' }}
              variant="outlined"
            />
            <Chip
              icon={<AccessTimeIcon />}
              label={event.time}
              sx={{ color: 'white', borderColor: 'white' }}
              variant="outlined"
            />
            <Chip
              icon={<LocationOnIcon />}
              label={event.location}
              sx={{ color: 'white', borderColor: 'white' }}
              variant="outlined"
            />
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Sobre o Evento
              </Typography>
              <Typography paragraph>
                {event.description}
              </Typography>
              <Typography paragraph>
                {event.details}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Informações
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Preço
                </Typography>
                <Typography variant="h5">
                  {event.price === 0 ? 'Gratuito' : `R$ ${event.price}`}
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => {
                  if (!user) {
                    addNotification({
                      message: 'Faça login para comprar ingressos',
                      type: 'warning'
                    });
                    return;
                  }
                  // Lógica de compra
                }}
              >
                Comprar Ingresso
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default EventPage; 