import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Tabs,
  Tab,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemSecondary,
  Chip,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';

function MyCalendar({ open, onClose, events }) {
  const [tabValue, setTabValue] = useState(0);
  
  // Filtrar eventos
  const favoriteEvents = events.filter(event => event.isFavorite);
  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
  
  // Agrupar eventos por mês
  const groupEventsByMonth = (eventList) => {
    return eventList.reduce((acc, event) => {
      const month = new Date(event.date).toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
      if (!acc[month]) acc[month] = [];
      acc[month].push(event);
      return acc;
    }, {});
  };

  const renderEventList = (eventList) => {
    const groupedEvents = groupEventsByMonth(eventList);
    
    return Object.entries(groupedEvents).map(([month, monthEvents]) => (
      <Box key={month} sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, textTransform: 'capitalize' }}>
          {month}
        </Typography>
        <List>
          {monthEvents.map(event => (
            <ListItem
              key={event.id}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                mb: 1,
                '&:hover': {
                  bgcolor: 'action.hover'
                }
              }}
            >
              <ListItemText
                primary={event.title}
                secondary={
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5 }}>
                    <Chip 
                      label={new Date(event.date).toLocaleDateString('pt-BR')}
                      size="small"
                    />
                    <Chip 
                      label={event.location}
                      size="small"
                      variant="outlined"
                    />
                    {event.price === 0 ? (
                      <Chip 
                        label="Gratuito"
                        size="small"
                        color="success"
                      />
                    ) : (
                      <Chip 
                        label={`R$ ${event.price}`}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>
                }
              />
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => {/* Adicionar função para abrir modal do evento */}}
              >
                Ver Detalhes
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    ));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Meu Calendário</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 2 }}>
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
        >
          <Tab 
            label="Próximos Eventos" 
            icon={<Badge badgeContent={upcomingEvents.length} color="primary"><CalendarMonthIcon /></Badge>}
            iconPosition="start"
          />
          <Tab 
            label="Favoritos" 
            icon={<Badge badgeContent={favoriteEvents.length} color="error"><FavoriteIcon /></Badge>}
            iconPosition="start"
          />
        </Tabs>

        {tabValue === 0 && renderEventList(upcomingEvents)}
        {tabValue === 1 && renderEventList(favoriteEvents)}

        {((tabValue === 0 && upcomingEvents.length === 0) || 
          (tabValue === 1 && favoriteEvents.length === 0)) && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">
              Nenhum evento encontrado
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default MyCalendar; 