import { Grid, Container, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import EventCard from './EventCard';

const StyledGrid = styled(Grid)(({ theme }) => ({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100vw',
    height: '100%',
    background: 'radial-gradient(circle at 50% 50%, rgba(0, 245, 255, 0.1), transparent 70%)',
    pointerEvents: 'none',
    zIndex: -1,
  }
}));

function EventList({ events, loading }) {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress 
          sx={{ 
            color: 'primary.main',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            }
          }} 
        />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <StyledGrid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
            <EventCard event={event} />
          </Grid>
        ))}
      </StyledGrid>
    </Container>
  );
}

export default EventList; 