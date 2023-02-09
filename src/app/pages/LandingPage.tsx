import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createUser } from '../store/userSlice';
import Box from '@mui/material/Box';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import { AvatarIcon } from '../components/avatar/AvatarIcon';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppDispatch } from '../store/store';
import { selectIsUserLoading, selectUser } from '../store/selectors';

export const LandingPage = () => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectIsUserLoading);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  const isInvite = !!searchParams.get('lobby');
  const disabled = !name || !avatar;

  useEffect(() => {
    if (user.id) {
      navigate({ pathname: '/lobby', search: searchParams.toString() });
    }
  }, [user.id, searchParams]);

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
            <TextField id="outlined-basic" label="Your name" variant="outlined" onChange={event => setName(event.target.value)} />
          </Box>
        </Box>
        <LoadingButton
          variant="contained"
          loading={loading}
          disabled={disabled}
          startIcon={<PlayArrowRoundedIcon />}
          onClick={() => dispatch(createUser({ name, avatar }))}
        >
          {isInvite ? 'JOIN' : 'START'}
        </LoadingButton>
      </Box>
      <Box sx={{ margin: '0 auto' }}>LINKS</Box>
    </Box>
  );
};
