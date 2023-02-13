import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, IconButton, Button, Stack, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import LinkIcon from '@mui/icons-material/Link';

import { PlayersBox } from '../components/players/players-box/PlayersBox';
import { selectGame, selectIsOwner, selectLobby } from '../store/selectors';
import { useSocket } from '../socket/useSocket';
import { resetUser } from '../store/userSlice';
import GarticPhone from '../../assets/Garticphone.webp';

export const LobbyPage = () => {
  const [shown, setShown] = useState(false);
  const lobby = useSelector(selectLobby);
  const game = useSelector(selectGame);
  const isOwner = useSelector(selectIsOwner);
  const socket = useSocket();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (game.id) {
      navigate('/game');
    }
  }, [game.id]);

  const onSnackbarClose = useCallback(() => setShown(false), [setShown]);

  const onInviteClick = useCallback(() => {
    const link = `${location.origin}/landing?lobby=${lobby.id}`;
    navigator.clipboard.writeText(link);
    setShown(true);
  }, [setShown, lobby]);

  const onStartClick = useCallback(() => {
    if (isOwner) {
      socket?.emit('game:start');
    }
  }, [socket, isOwner]);

  const onBackClick = useCallback(() => {
    dispatch(resetUser(null));
    navigate('/landing');
  }, [dispatch, navigate]);

  return (
    <>
      <Box
        // TODO: move style to separate file
        sx={{
          padding: '2%',
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          gridTemplateColumns: '95%',
          justifyContent: 'center',
          gap: '10%',
          minHeight: '100vh',
        }}
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'center' }}>
          <Button
            sx={{ textDecoration: 'none', justifySelf: 'center' }}
            startIcon={<ArrowBackIosRoundedIcon />}
            variant="contained"
            onClick={onBackClick}
          >
            BACK
          </Button>
          <img src={GarticPhone} width="35%" style={{ justifySelf: 'center' }} alt="GarticPhone" />
          {/* TODO: sound component with onClick */}
          <IconButton sx={{ justifySelf: 'center' }}>
            <VolumeUpRoundedIcon />
          </IconButton>
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
            <PlayersBox />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {isOwner && <h1>Settings and presets</h1>}
            {/* TODO: players options element and player card */}

            {isOwner && (
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" startIcon={<LinkIcon />} onClick={onInviteClick}>
                  Invite
                </Button>
                <Button variant="contained" startIcon={<PlayArrowRoundedIcon />} onClick={onStartClick}>
                  Start
                </Button>
              </Stack>
            )}
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={shown}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={onSnackbarClose}
        message="Link copied!"
      />
    </>
  );
};
