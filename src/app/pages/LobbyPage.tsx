import React from 'react';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';

export const LobbyPage = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '90%',
        justifyContent: 'center',
        gap: '20%',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'center' }}>
        <Link to="/landing" style={{ textDecoration: 'none', justifySelf: 'center' }}>
          <Button startIcon={<ArrowBackIosRoundedIcon />} variant="contained">
            BACK
          </Button>
        </Link>
        <PhoneMissedIcon sx={{ justifySelf: 'center' }} />
        {/* TODO: sound component with onClick */}
        <VolumeUpRoundedIcon sx={{ justifySelf: 'center' }} />
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gridTemplateRows: '100%',
          gap: '10%',
        }}
      >
        <Box>
          <h1>Players</h1>
          {/* TODO: players options element and player card */}
        </Box>
        <Box>
          <h1>Settings and presets</h1>
          {/* TODO: players options element and player card */}
        </Box>
      </Box>
    </Box>
  );
};
