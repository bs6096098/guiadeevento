import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Chip,
  Button,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Alert from '@mui/material/Alert';
import { categoryConfig } from '../utils/categoryIcons';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function EventDetailsModal({ event, open, onClose, onFavoriteClick, onShare }) {
  const navigate = useNavigate();

  const handleViewFullDetails = () => {
    onClose(); // Fecha a modal
    navigate(`/evento/${event.id}`); // Navega para a página de detalhes
  };

  if (!event) return null;

  const CategoryIcon = categoryConfig[event.category]?.icon;
  const categoryColor = categoryConfig[event.category]?.color;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="body"
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div">
          {event.title}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ color: 'text.secondary' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ position: 'relative' }}>
          <Box
            component="img"
            src={event.image}
            alt={event.title}
            sx={{
              width: '100%',
              height: 300,
              objectFit: 'cover'
            }}
          />
          
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Chip
              icon={CategoryIcon && <CategoryIcon />}
              label={event.category}
              sx={{
                bgcolor: `${categoryColor}CC`,
                color: 'white',
                '& .MuiChip-icon': { color: 'white' }
              }}
            />
            
            {event.price === 0 ? (
              <Chip label="Gratuito" color="success" />
            ) : (
              <Chip 
                label={`R$ ${event.price}`}
                sx={{ bgcolor: 'white', fontWeight: 'bold' }}
              />
            )}
          </Box>
        </Box>

        <Box sx={{ p: 3 }}>
          {event.price === 0 && (
            <Alert 
              severity="info" 
              icon={<InfoIcon />}
              sx={{ mb: 3 }}
            >
              Este é um evento gratuito! A entrada é por ordem de chegada, sujeita à lotação do espaço.
            </Alert>
          )}

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            {event.price === 0 ? (
              <Button
                variant="contained"
                startIcon={<EventAvailableIcon />}
                color="success"
                sx={{ flex: 1 }}
                onClick={() => window.open(event.registrationLink || '#', '_blank')}
              >
                Garantir Presença
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                color="primary"
                sx={{ flex: 1 }}
                onClick={() => window.open(event.ticketLink || 'https://www.eventim.com.br', '_blank')}
              >
                Comprar Ingresso
              </Button>
            )}

            <Button
              variant="outlined"
              startIcon={event.isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
              onClick={() => onFavoriteClick(event.id)}
              sx={{ minWidth: '120px' }}
            >
              {event.isFavorite ? 'Favoritado' : 'Favoritar'}
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<ShareIcon />}
              onClick={() => onShare(event)}
              sx={{ minWidth: '120px' }}
            >
              Compartilhar
            </Button>
          </Box>

          {event.price === 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Informações importantes:
              </Typography>
              <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    Chegue com antecedência para garantir seu lugar
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    Documento de identificação pode ser solicitado
                  </Typography>
                </li>
                {event.maxCapacity && (
                  <li>
                    <Typography variant="body2" color="text.secondary">
                      Capacidade máxima: {event.maxCapacity} pessoas
                    </Typography>
                  </li>
                )}
              </ul>
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarTodayIcon color="action" />
              <Typography>{event.displayDate || event.date}</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon color="action" />
              <Typography>{event.location}</Typography>
            </Box>
          </Box>

          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            Sobre o evento
          </Typography>
          <Typography color="text.secondary">
            {event.description}
          </Typography>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              variant="text"
              onClick={handleViewFullDetails}
              endIcon={<ArrowForwardIcon />}
            >
              Ver Todos os Detalhes
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default EventDetailsModal; 