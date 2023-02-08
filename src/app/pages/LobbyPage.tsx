import React, { useState } from 'react';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
// import { PlayersList } from '../components/PlayersList';
import { PlayersBox } from '../components/PlayersBox';
import { PlayerProps } from '../components/PlayerListItem';

// TODO:replace by real data
const dummyPlayers = [
  { name: 'Alex', isOwner: true, avatarId: 0 },
  { name: 'John', isOwner: false, avatarId: 1 },
  { name: 'Tad', isOwner: false, avatarId: 2 },
];

export const LobbyPage = () => {
  const [players, setPlayers] = useState<Array<PlayerProps>>(dummyPlayers);
  const handlePlayerDelete = (playerId: string) => {
    // TODO: change logic for real api
    const filteredPlayers = players.filter(({ name }) => name !== playerId);
    setPlayers(filteredPlayers);
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '90%',
        justifyContent: 'center',
        gap: '20%',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', justifySelf: 'center' }}>
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
        <PlayersBox players={players} onPlayerDelete={handlePlayerDelete} />

        <Box>
          <h1>Settings and presets</h1>
          {/* TODO: players options element and player card */}
        </Box>
      </Box>
    </Box>
  );
};
