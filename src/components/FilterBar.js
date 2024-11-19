import { useState } from 'react';
import { 
  Paper, 
  TextField, 
  Box, 
  Button, 
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  gap: theme.spacing(2),
  backgroundColor: theme.palette.mode === 'dark'
    ? 'rgba(20, 20, 20, 0.8)'
    : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.mode === 'dark'
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)'}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 6px rgba(0, 0, 0, 0.1)'
    : '0 2px 4px rgba(0, 0, 0, 0.05)',
}));

const categories = [
  'Todos',
  'Tecnologia',
  'Música',
  'Design',
  'Esportes',
  'Gastronomia'
];

function FilterBar({ onFilter }) {
  const [filters, setFilters] = useState({
    search: '',
    date: '',
    location: '',
    category: 'Todos'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onFilter(filters);
  };

  return (
    <StyledPaper>
      <TextField
        name="search"
        value={filters.search}
        onChange={handleChange}
        placeholder="Buscar eventos..."
        variant="outlined"
        size="small"
        fullWidth
        sx={{ flex: 2, minWidth: '200px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />
      
      <FormControl sx={{ flex: 1, minWidth: '150px' }}>
        <InputLabel>Categoria</InputLabel>
        <Select
          name="category"
          value={filters.category}
          onChange={handleChange}
          size="small"
        >
          {categories.map(category => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <TextField
        name="date"
        value={filters.date}
        onChange={handleChange}
        type="date"
        size="small"
        sx={{ flex: 1, minWidth: '150px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarTodayIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />
      
      <TextField
        name="location"
        value={filters.location}
        onChange={handleChange}
        placeholder="Localização"
        size="small"
        sx={{ flex: 1, minWidth: '150px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationOnIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />
      
      <Button 
        onClick={handleSubmit}
        variant="contained" 
        sx={{ 
          background: 'linear-gradient(45deg, #00F5FF, #FF00E4)',
          minWidth: '120px',
        }}
      >
        Filtrar
      </Button>
    </StyledPaper>
  );
}

export default FilterBar; 