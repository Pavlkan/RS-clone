import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Stack, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import LinkIcon from '@mui/icons-material/Link';

import { PlayersBox } from '../components/players/players-box/PlayersBox';
import { selectGame, selectIsOwner, selectLobby } from '../store/selectors';
import { useSocket } from '../socket/useSocket';
import { resetUser } from '../store/userSlice';
import GarticPhone from '../../assets/Garticphone.webp';
import ConstrolsAudio, { playAudio } from '../components/audio-controls';
import GameRules from '../components/game-rules/GameRules';
import AlertDialog from '../components/alert-dialog/AlertDialog';

export const LobbyPage = () => {
  const [shown, setShown] = useState(false);
  const [openAlertFour, setOpenAlertFour] = React.useState(false);
  const lobby = useSelector(selectLobby);
  const game = useSelector(selectGame);
  const isOwner = useSelector(selectIsOwner);
  const socket = useSocket();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const alertFourTitle = 'Wanna try?';
  const alertFourContent = 'Hey! The playability is better when there are at least 4 players. Do you really want to continue?';

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
    playAudio('click');
  }, [setShown, lobby]);

  const startGame = useCallback(() => {
    setOpenAlertFour(true);
    if (isOwner) {
      socket?.emit('game:start');
    }
    playAudio('click');
  }, [socket, isOwner]);

  const responseAlertFourHandle = (resp: boolean) => {
    setOpenAlertFour(false);
    if (resp) {
      startGame();
    }
  };

  const onStartClick = () => {
    if (lobby.players.length >= 4) {
      startGame();
    } else {
      setOpenAlertFour(true);
    }
  };

  const onBackClick = useCallback(() => {
    dispatch(resetUser(null));
    navigate('/landing');
    playAudio('click');
  }, [dispatch, navigate]);

  return (
    <>
      <Box
        // TODO: move style to separate file
        sx={{
          padding: '2%',
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          gridTemplateColumns: document.documentElement.clientWidth <= 768 ? '100%' : '80%',
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
          <ConstrolsAudio />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gridTemplateRows: '100%',
            gap: document.documentElement.clientWidth <= 768 ? '2%' : '10%',
          }}
        >
          <Box>
            <PlayersBox />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <GameRules />
            {/* {isOwner && <h1>Settings and presets</h1>} */}
            {/* TODO: players options element and player card */}

            {isOwner && (
              <Stack direction="row" spacing={2} mt={5}>
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
      <AlertDialog title={alertFourTitle} content={alertFourContent} open={openAlertFour} responseHandler={responseAlertFourHandle} />
    </>
  );
};
