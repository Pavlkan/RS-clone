import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createUser } from '../store/userSlice';
import Box from '@mui/material/Box';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import { AvatarIcon } from '../avatars/AvatarIcon';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

export const LandingPage = () => {
  const loading = useSelector((state: any) => state.user.loading);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

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
          <AvatarIcon onChange={newAvatar => setAvatar(newAvatar)} />
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
            <TextField id="outlined-basic" label="Your name" variant="outlined" onChange={event => setName((event.target as any).value)} />
          </Box>
        </Box>
        <LoadingButton
          variant="contained"
          loading={loading}
          startIcon={<PlayArrowRoundedIcon />}
          onClick={() => dispatch(createUser({ name, avatar }) as any)}
        >
          START
        </LoadingButton>
      </Box>
      <Box sx={{ margin: '0 auto' }}>LINKS</Box>
    </Box>
  );
};
