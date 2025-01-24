import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const TypeFilter = ({ value, onChange, types }) => {
  return (
    <Box sx={{ minWidth: 200, mb: 3 }}>
      <FormControl fullWidth>
        <InputLabel>Filter by Type</InputLabel>
        <Select
          value={value}
          label="Filter by Type"
          onChange={(e) => onChange(e.target.value)}
        >
          <MenuItem value="">All Types</MenuItem>
          {types.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default TypeFilter;