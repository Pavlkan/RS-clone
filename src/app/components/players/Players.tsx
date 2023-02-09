import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';

import { PlayersLimitOption } from './PlayersLimitOption';
import { Player } from './Player';
import { selectLobby, selectUser } from '../../store/selectors';

export const Players = () => {
  const lobby = useSelector(selectLobby);
  const user = useSelector(selectUser);
  const [playersLimit, setPlayersLimit] = useState(14);

  const isOwner = lobby.owner.id === user.id;

  const handlePlayersAmountChange = useCallback(
    (playersAmount: number) => {
      setPlayersLimit(playersAmount);
    },
    [setPlayersLimit],
  );

  return (
    <Box
      sx={{
        padding: '2%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid white',
        borderRadius: '10px',
      }}
    >
      <h2>
        PLAYERS {lobby.players.length}/{playersLimit}
      </h2>

      {isOwner && <PlayersLimitOption minAmountOfPlayers={lobby.players.length} onPlayersAmountChange={handlePlayersAmountChange} />}

      <Box
        sx={{
          width: '100%',
          height: '53vh',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {Array.from({ ...lobby.players, length: playersLimit }).map((option, i) => {
          const isOwner = option?.id === lobby.owner.id;
          return <Player user={option} isOwner={isOwner} key={option?.id ?? i}></Player>;
        })}
      </Box>
    </Box>
  );
};
