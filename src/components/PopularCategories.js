import { Box, Chip, Typography, Skeleton } from '@mui/material';
import { categoryConfig } from '../utils/categoryIcons';

function PopularCategories({ categories, selectedCategory, onCategoryChange, loading = false }) {
  if (loading) {
    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>Categorias Populares</Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} variant="rounded" width={100} height={32} />
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>Categorias Populares</Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {categories.map((category) => {
          const CategoryIcon = categoryConfig[category.name]?.icon;
          return (
            <Chip
              key={category.name}
              label={`${category.name} (${category.count})`}
              icon={CategoryIcon && <CategoryIcon />}
              onClick={() => onCategoryChange(category.name)}
              color={selectedCategory === category.name ? "primary" : "default"}
              variant={selectedCategory === category.name ? "filled" : "outlined"}
              sx={{
                '&:hover': {
                  bgcolor: selectedCategory === category.name ? 'primary.main' : 'action.hover'
                }
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default PopularCategories; 