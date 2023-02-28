import React, { useCallback, useState } from 'react';
import { Box, Button, List } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

import GarticPhone from '../../assets/Garticphone.webp';
import { playersContainer, playersListResults } from '../components/players/players-box/styles';
import { selectGameAlbum, selectLobby } from '../store/selectors';
import { Player } from '../components/players/player-list-item/Player';
import { ResultsAlbum } from '../components/results-album/ResultsAlbum';
import ControlsAudio, { playAudio } from '../components/audio-controls';
import { resultsMainContainer, resultsPageContainer } from './pages-styles/results-page-styles';
import useMediaQuery from '@mui/material/useMediaQuery/useMediaQuery';

export const ResultsPage = () => {
  const lobby = useSelector(selectLobby);
  const gameAlbum = useSelector(selectGameAlbum);

  const [currentPlayer, setCurrentPlayer] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onBackClick = useCallback(() => {
    playAudio('click');
    dispatch({ type: 'reset' });
    navigate('/landing');
  }, [dispatch, navigate]);

  const matches = useMediaQuery('(min-width:768px)');

  return (
    <Box sx={{ ...resultsPageContainer, gridTemplateColumns: matches ? '80%' : '100%', gap: matches ? '10%' : '1%' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'center', marginTop: matches ? '0' : '7%' }}>
        <Button
          color="secondary"
          sx={{ textDecoration: 'none', justifySelf: 'center' }}
          startIcon={<HomeRoundedIcon />}
          variant="contained"
          onClick={onBackClick}
        >
          HOME
        </Button>

        <img src={GarticPhone} width="35%" style={{ justifySelf: 'center' }} alt="GarticPhone" />

        <ControlsAudio />
      </Box>

      <Box sx={{ ...resultsMainContainer, gap: matches ? '10%' : '2%' }}>
        <Box sx={playersContainer}>
          <List sx={playersListResults}>
            {lobby.players.map((option, i) => {
              const isOwnerPlayerItem = option?.id === lobby.owner.id;
              return <Player user={option} isOwnerPlayerItem={isOwnerPlayerItem} isOwner={false} key={option?.id ?? i}></Player>;
            })}
          </List>
        </Box>

        <Box>
          <ResultsAlbum albumIndex={currentPlayer} gameAlbum={gameAlbum} />

          <Box sx={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
            <Button
              startIcon={<PlayArrowRoundedIcon />}
              color="secondary"
              disabled={lobby.players.length - 1 <= currentPlayer}
              variant="contained"
              onClick={() => {
                playAudio('click');
                setCurrentPlayer(currentPlayer + 1);
              }}
            >
              NEW TURN
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
