import { TextField, InputAdornment } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function DatePicker({ value, onChange, sx }) {
  return (
    <TextField
      type="date"
      value={value}
      onChange={onChange}
      size="small"
      placeholder="dd/mm/aaaa"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <CalendarTodayIcon fontSize="small" />
          </InputAdornment>
        )
      }}
      sx={{ 
        minWidth: '150px',
        flex: '0 1 auto',
        '& input': {
          py: '8.5px',  // Ajusta o padding vertical
          px: 1,        // Ajusta o padding horizontal
        },
        '& .MuiInputBase-root': {
          height: '40px'  // Altura fixa igual aos outros inputs
        },
        ...sx
      }}
    />
  );
}

export default DatePicker; 