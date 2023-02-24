import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Stack, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import LinkIcon from '@mui/icons-material/Link';
import useMediaQuery from '@mui/material/useMediaQuery';

import { PlayersBox } from '../components/players/players-box/PlayersBox';
import { selectGame, selectIsOwner, selectLobby } from '../store/selectors';
import { useSocket } from '../socket/useSocket';
import { resetUser } from '../store/userSlice';
import GarticPhone from '../../assets/Garticphone.webp';
import ControlsAudio, { playAudio } from '../components/audio-controls';
import GameRules from '../components/game-rules/GameRules';
import AlertDialog from '../components/alert-dialog/AlertDialog';
import { lobbyMainContainer, lobbyPageContainer } from './pages-styles/lobby-page-styles';

export const LobbyPage = () => {
  const socket = useSocket();
  const lobby = useSelector(selectLobby);
  const game = useSelector(selectGame);
  const isOwner = useSelector(selectIsOwner);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shown, setShown] = useState(false);
  const [openAlertFour, setOpenAlertFour] = React.useState(false);

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
      playAudio('click');
      startGame();
    } else {
      playAudio('alert');
      setOpenAlertFour(true);
    }
  };

  const onBackClick = useCallback(() => {
    dispatch(resetUser(null));
    navigate('/landing');
    playAudio('click');
  }, [dispatch, navigate]);

  const matches = useMediaQuery('(min-width:768px)');

  return (
    <>
      <Box sx={{ ...lobbyPageContainer, gridTemplateColumns: matches ? '80%' : '100%', gap: matches ? '10%' : '1%' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'center', marginTop: matches ? '0' : '7%' }}>
          <Button
            color="secondary"
            sx={{ textDecoration: 'none', justifySelf: 'center' }}
            startIcon={<ArrowBackIosRoundedIcon />}
            variant="contained"
            onClick={onBackClick}
          >
            BACK
          </Button>

          <img src={GarticPhone} width="35%" style={{ justifySelf: 'center' }} alt="GarticPhone" />

          <ControlsAudio />
        </Box>

        <Box sx={{ ...lobbyMainContainer, gap: matches ? '10%' : '2%' }}>
          <Box>
            <PlayersBox />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <GameRules />

            {isOwner && (
              <Stack direction="row" spacing={2} mt={5}>
                <Button color="secondary" variant="outlined" startIcon={<LinkIcon />} onClick={onInviteClick}>
                  Invite
                </Button>

                <Button color="secondary" variant="contained" startIcon={<PlayArrowRoundedIcon />} onClick={onStartClick}>
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
