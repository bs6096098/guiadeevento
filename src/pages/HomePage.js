import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  IconButton,
  InputAdornment,
  Fade,
  Zoom,
  CircularProgress,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventCard from '../components/EventCard';
import EventDetailsModal from '../components/EventDetailsModal';
import PopularCategories from '../components/PopularCategories';
import EventStats from '../components/EventStats';
import MyCalendar from '../components/MyCalendar';
import NotificationSettings from '../components/NotificationSettings';

function HomePage() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedDate, setSelectedDate] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [notificationSettingsOpen, setNotificationSettingsOpen] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Festival de Música Eletrônica",
      date: "2024-05-15",
      location: "São Paulo, SP",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
      description: "O maior festival de música eletrônica do Brasil",
      category: "Música",
      price: 150,
      isFavorite: false
    },
    {
      id: 2,
      title: "Exposição de Arte Moderna",
      date: "2024-05-20",
      location: "São Paulo, SP",
      image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&q=80",
      description: "Uma exposição única com artistas contemporâneos",
      category: "Arte",
      price: 50,
      isFavorite: false
    },
    {
      id: 3,
      title: "Workshop de Fotografia",
      date: "2024-05-25",
      location: "Rio de Janeiro, RJ",
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",
      description: "Aprenda técnicas avançadas de fotografia",
      category: "Arte",
      price: 200,
      isFavorite: false
    }
  ]);

  // Calcular categorias populares
  const popularCategories = useMemo(() => {
    const categories = events.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(categories)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [events]);

  // Filtrar eventos
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const textMatch = !searchText || 
        event.title.toLowerCase().includes(searchText.toLowerCase()) ||
        event.description.toLowerCase().includes(searchText.toLowerCase());
      const categoryMatch = selectedCategory === 'Todos' || event.category === selectedCategory;
      const dateMatch = !selectedDate || event.date === selectedDate;
      const locationMatch = !location || event.location.toLowerCase().includes(location.toLowerCase());

      return textMatch && categoryMatch && dateMatch && locationMatch;
    });
  }, [events, searchText, selectedCategory, selectedDate, location]);

  const handleSearch = (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Simular busca
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleClearFilters = () => {
    setSearchText('');
    setSelectedCategory('Todos');
    setSelectedDate('');
    setLocation('');
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleFavoriteClick = (eventId) => {
    setEvents(prevEvents => prevEvents.map(event => 
      event.id === eventId 
        ? { ...event, isFavorite: !event.isFavorite }
        : event
    ));
    
    if (selectedEvent && selectedEvent.id === eventId) {
      setSelectedEvent(prevEvent => ({
        ...prevEvent,
        isFavorite: !prevEvent.isFavorite
      }));
    }
  };

  const handleShare = async (event) => {
    const shareData = {
      title: event.title,
      text: event.description,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // Adicionar feedback visual (snackbar/toast)
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header com botões de ação */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3 
      }}>
        <Typography variant="h5" component="h1">
          Eventos
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton
            onClick={() => setNotificationSettingsOpen(true)}
            sx={{ 
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1
            }}
          >
            <NotificationsIcon />
          </IconButton>

          <Button
            variant="outlined"
            startIcon={<CalendarMonthIcon />}
            onClick={() => setCalendarOpen(true)}
          >
            Meu Calendário
          </Button>
        </Box>
      </Box>

      {/* Estatísticas */}
      <EventStats events={events} />

      {/* Categorias Populares */}
      <PopularCategories
        categories={popularCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Filtros */}
      <Box 
        component="form" 
        onSubmit={handleSearch}
        sx={{ 
          display: 'flex', 
          gap: 2,
          mb: 4,
          flexDirection: { xs: 'column', md: 'row' }
        }}
      >
        <TextField
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Buscar eventos..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ flex: 2 }}
        />

        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          displayEmpty
          sx={{ flex: 1 }}
        >
          <MenuItem value="Todos">Todas as categorias</MenuItem>
          <MenuItem value="Música">Música</MenuItem>
          <MenuItem value="Arte">Arte</MenuItem>
          <MenuItem value="Teatro">Teatro</MenuItem>
          <MenuItem value="Esporte">Esporte</MenuItem>
        </Select>

        <TextField
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          sx={{ flex: 1 }}
        />

        <TextField
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Localização"
          sx={{ flex: 1 }}
        />

        <Button
          variant="outlined"
          onClick={handleClearFilters}
          startIcon={<RefreshIcon />}
          sx={{ minWidth: 'auto' }}
        >
          Limpar
        </Button>
      </Box>

      {/* Lista de Eventos */}
      <Grid container spacing={3}>
        {filteredEvents.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <EventCard 
              event={event}
              onFavoriteClick={handleFavoriteClick}
              onClick={() => handleEventClick(event)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Loading Indicator */}
      {isLoading && (
        <Fade in timeout={200}>
          <Box
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              zIndex: 2000
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                bgcolor: 'background.paper'
              }}
            >
              <CircularProgress size={20} />
              <Typography variant="body2">
                Atualizando resultados...
              </Typography>
            </Paper>
          </Box>
        </Fade>
      )}

      {/* Modais */}
      <EventDetailsModal
        event={selectedEvent}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onFavoriteClick={handleFavoriteClick}
        onShare={handleShare}
      />

      <MyCalendar
        open={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        events={events}
      />

      <NotificationSettings
        open={notificationSettingsOpen}
        onClose={() => setNotificationSettingsOpen(false)}
      />
    </Container>
  );
}

export default HomePage; 