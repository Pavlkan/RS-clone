import React from 'react';
import { Box } from '@mui/material';
import { Paint } from '../components/paint/Paint';

export const GamePage = () => {
  return (
    <>
      <h1>Game Page</h1>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paint />
      </Box>
    </>
  );
};
