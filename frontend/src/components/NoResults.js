import React from 'react';
import { Box, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

const NoResults = ({ searchQuery }) => (
  <Box sx={{ 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
    minHeight: '200px',
    color: 'text.secondary'
  }}>
    <SearchOffIcon sx={{ fontSize: 60, mb: 2 }} />
    <Typography variant="h6">
      No results found
    </Typography>
    {searchQuery && (
      <Typography variant="body2">
        No matches found for "{searchQuery}"
      </Typography>
    )}
  </Box>
);

export default NoResults;