import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, List } from '@mui/material';

import { PlayersLimitSelect } from '../players-limit-select/PlayersLimitSelect';
import { Player } from '../player-list-item/Player';
import { selectIsOwner, selectLobby } from '../../../store/selectors';
import { playersContainer, playersList, playersListContainer } from './styles';

export const PlayersBox = () => {
  const lobby = useSelector(selectLobby);
  const isOwner = useSelector(selectIsOwner);
  const [playersLimit, setPlayersLimit] = useState(14);

  const handlePlayersAmountChange = useCallback(
    (playersAmount: number) => {
      setPlayersLimit(playersAmount);
    },
    [setPlayersLimit],
  );

  return (
    <Box sx={playersContainer}>
      {isOwner && (
        <PlayersLimitSelect
          minAmountOfPlayers={lobby.players.length}
          currentPlayersLimit={playersLimit}
          onPlayersAmountChange={handlePlayersAmountChange}
        />
      )}
      <Box sx={playersListContainer}>
        <List sx={playersList}>
          {Array.from({ ...lobby.players, length: playersLimit }).map((option, i) => {
            const isOwnerPlayerItem = option?.id === lobby.owner.id;
            return <Player user={option} isOwnerPlayerItem={isOwnerPlayerItem} isOwner={Boolean(isOwner)} key={option?.id ?? i}></Player>;
          })}
        </List>
      </Box>
    </Box>
  );
};
