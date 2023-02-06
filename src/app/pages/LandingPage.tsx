import React from 'react';
import Box from '@mui/material/Box';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import { AvatarIcon } from '../avatars/AvatarIcon';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

export const LandingPage = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        gridTemplateColumns: '100%',
        gap: '20%',
        minHeight: '100vh',
      }}
    >
      <PhoneMissedIcon sx={{ margin: '0 auto' }} />
      <Box
        sx={{
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid white',
          borderRadius: '10px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          <AvatarIcon />
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            noValidate
            autoComplete="off"
          >
            <h2 style={{ textAlign: 'center' }}>CHOOSE A CHARACTER AND A NICKNAME</h2>
            <TextField id="outlined-basic" label="Your name" variant="outlined" />
          </Box>
        </Box>
        <Link to="/lobby" style={{ textDecoration: 'none' }}>
          <Button variant="contained" startIcon={<PlayArrowRoundedIcon />}>
            START
          </Button>
        </Link>
      </Box>
      <Box sx={{ margin: '0 auto' }}>LINKS</Box>
    </Box>
  );
};
