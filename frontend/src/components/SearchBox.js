import React from 'react';
import { TextField, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = ({ value, onChange }) => {
  return (
    <Box sx={{ position: 'relative', margin: '20px 0' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search questions..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'primary.main',
            },
            '&:hover fieldset': {
              borderColor: 'primary.light',
            },
          },
        }}
      />
    </Box>
  );
};

export default SearchBox;