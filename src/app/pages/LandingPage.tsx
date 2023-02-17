import React, { useCallback, useEffect, useState } from 'react';
import { Box, TextField, Snackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { AvatarIcon } from '../components/avatar/AvatarIcon';
import { createUser } from '../store/userSlice';
import { AppDispatch } from '../store/store';
import { selectIsExpelled, selectIsUserLoading, selectUser } from '../store/selectors';
import GarticPhone from '../../assets/Garticphone.webp';
import { Footer } from '../components/footer';
import { playClick } from '../components/audio-controls';

export const LandingPage = () => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectIsUserLoading);
  const isExpelled = useSelector(selectIsExpelled);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [expelledPopupShown, setExpelledPopupShown] = useState(false);

  const isInvite = !!searchParams.get('lobby');
  const disabled = !name || !avatar;

  const onSnackbarClose = useCallback(() => setExpelledPopupShown(false), [setExpelledPopupShown]);

  useEffect(() => {
    if (user.id && !isExpelled) {
      navigate({ pathname: '/lobby', search: searchParams.toString() });
    }
  }, [user.id, searchParams]);

  useEffect(() => {
    if (isExpelled) {
      setExpelledPopupShown(true);
      dispatch({ type: 'reset' });
    }
  }, [setExpelledPopupShown, isExpelled, dispatch]);

  return (
    <>
      <Box
        sx={{
          padding: '2%',
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          gridTemplateColumns: '100%',
          gap: '5%',
          minHeight: '100vh',
        }}
      >
        <img src={GarticPhone} width="15%" style={{ justifySelf: 'center' }} alt="GarticPhone" />
        <Box
          sx={{
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid',
            borderRadius: '10px',
            maxHeight: '45vh',
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
            onClick={() => {
              dispatch(createUser({ name, avatar }));
              playClick();
            }}
          >
            {isInvite ? 'JOIN' : 'START'}
          </LoadingButton>
        </Box>
        <Footer></Footer>
      </Box>

      <Snackbar
        open={expelledPopupShown}
        autoHideDuration={3500}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={onSnackbarClose}
      >
        <Alert severity="error">You have been expelled :(</Alert>
      </Snackbar>
    </>
  );
};
