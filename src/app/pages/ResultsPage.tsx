import React, { useCallback } from 'react';
import { Box, IconButton, Button, List } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import GarticPhone from '../../assets/Garticphone.webp';
import { resetUser } from '../store/userSlice';
import { playersContainer, playersListResults } from '../components/players/players-box/styles';
import { selectGame, selectLobby } from '../store/selectors';
import { Player } from '../components/players/player-list-item/Player';

export const ResultsPage = () => {
  const lobby = useSelector(selectLobby);
  const game = useSelector(selectGame);
  // const albumData =
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log('game:', game);
  console.log('lobby:', lobby);

  const onBackClick = useCallback(() => {
    dispatch(resetUser(null));
    navigate('/landing');
  }, [dispatch, navigate]);

  return (
    <Box
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
          startIcon={<HomeRoundedIcon />}
          variant="contained"
          onClick={onBackClick}
        >
          HOME
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
        <Box sx={playersContainer}>
          <List sx={playersListResults}>
            {lobby.players.map((option, i) => {
              const isOwnerPlayerItem = option?.id === lobby.owner.id;
              return <Player user={option} isOwnerPlayerItem={isOwnerPlayerItem} isOwner={false} key={option?.id ?? i}></Player>;
            })}
          </List>
        </Box>
        <Box>
          <h1>Result Album</h1>
        </Box>
      </Box>
    </Box>
  );
};
