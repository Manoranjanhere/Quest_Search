import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = () => (
  <Box sx={{ 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
    minHeight: '200px'
  }}>
    <CircularProgress color="primary" />
    <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
      Loading questions...
    </Typography>
  </Box>
);

export default LoadingSpinner;