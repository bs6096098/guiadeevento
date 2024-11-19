import { Box, Paper, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

function EventStats({ events }) {
  const totalEvents = events.length;
  const freeEvents = events.filter(e => e.price === 0).length;
  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date()).length;
  const totalParticipants = events.reduce((acc, event) => acc + (event.participants || 0), 0);

  const stats = [
    {
      label: 'Eventos Ativos',
      value: upcomingEvents,
      icon: TrendingUpIcon,
      color: '#00F5FF'
    },
    {
      label: 'Eventos Gratuitos',
      value: freeEvents,
      icon: LocalActivityIcon,
      color: '#4caf50'
    },
    {
      label: 'Participantes',
      value: totalParticipants,
      icon: PeopleIcon,
      color: '#ff9800'
    }
  ];

  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
      gap: 2,
      mb: 4 
    }}>
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Paper
            key={stat.label}
            sx={{
              p: 2,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Icon sx={{ color: stat.color }} />
              <Typography variant="subtitle2" color="text.secondary">
                {stat.label}
              </Typography>
            </Box>
            
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: stat.color }}>
              {stat.value}
            </Typography>
          </Paper>
        );
      })}
    </Box>
  );
}

export default EventStats; 