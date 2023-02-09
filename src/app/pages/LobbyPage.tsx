import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import Stack from '@mui/material/Stack';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import LinkIcon from '@mui/icons-material/Link';
import Snackbar from '@mui/material/Snackbar';

import { PlayersBox } from '../components/players/players-box/PlayersBox';
import { selectGame, selectIsOwner, selectLobby } from '../store/selectors';
import { useSocket } from '../socket/useSocket';

export const LobbyPage = () => {
  const [shown, setShown] = useState(false);
  const lobby = useSelector(selectLobby);
  const game = useSelector(selectGame);
  const isOwner = useSelector(selectIsOwner);
  const socket = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (game.id) {
      navigate('/game');
    }
  }, [game.id, navigate]);

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

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          gridTemplateColumns: '90%',
          justifyContent: 'center',
          gap: '10%',
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
