import {
  Box,
  Drawer,
  Typography,
  Slider,
  FormControlLabel,
  Switch,
  IconButton,
  Divider,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import { useState } from 'react';

function AdvancedFilters({ open, onClose, onApplyFilters }) {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const handleApply = () => {
    onApplyFilters({
      priceRange,
      showFreeOnly,
      showFavorites
    });
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box sx={{ width: 300, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">Filtros Avançados</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Typography gutterBottom>Faixa de Preço</Typography>
        <Slider
          value={priceRange}
          onChange={(_, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={500}
          sx={{ mb: 3 }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={showFreeOnly}
              onChange={(e) => setShowFreeOnly(e.target.checked)}
            />
          }
          label="Mostrar apenas eventos gratuitos"
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={showFavorites}
              onChange={(e) => setShowFavorites(e.target.checked)}
            />
          }
          label="Mostrar apenas favoritos"
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleApply}
          sx={{ mt: 2 }}
        >
          Aplicar Filtros
        </Button>
      </Box>
    </Drawer>
  );
}

export default AdvancedFilters; 