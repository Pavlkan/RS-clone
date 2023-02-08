import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { AppState } from '../../store/store';
import { PlayersAmountOptions } from './PlayersAmountOptions';
import { Player } from './Player';

export const Players = () => {
  const lobby = useSelector((state: AppState) => state.lobby);

  const [playersAmount, setPlayersAmount] = useState(14);

  const handlePlayersAmountChange = useCallback(
    (playersAmount: number) => {
      setPlayersAmount(playersAmount);
    },
    [setPlayersAmount],
  );

  const createPlayers = () => {
    const lobbyPlayers = lobby.players;
    const allPlayers: JSX.Element[] = [];
    for (let i = 0; i < playersAmount; i++) {
      const user = lobbyPlayers[i] ? lobbyPlayers[i] : { id: `${i}`, name: 'Empty', avatar: '' };
      const isOwner = lobby.owner.id === user.id;
      allPlayers.push(<Player user={user} isOwner={isOwner} key={user.id}></Player>);
    }
    return allPlayers;
  };

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
        PLAYERS {lobby.players.length}/{playersAmount}
      </h2>

      <PlayersAmountOptions minAmountOfPlayers={lobby.players.length} onPlayersAmountChange={handlePlayersAmountChange} />

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
        {createPlayers().map(player => player)}
      </Box>
    </Box>
  );
};
