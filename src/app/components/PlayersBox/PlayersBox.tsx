import React from 'react';
// eslint-disable-next-line import/named
import { Box, SelectChangeEvent } from '@mui/material';
import { defaultPlayersLimit } from '../../configs/defaults';
import { PlayersLimitSelect } from '../PlayersLimitSelect';
import { PlayersList } from '../PlayersList';
import { PlayersBoxProps, playersContainer } from '.';

const PlayersBox: React.FC<PlayersBoxProps> = ({ players, onPlayerDelete }) => {
  const [playersLimit, setPlayersLimit] = React.useState<number>(defaultPlayersLimit);

  const handlePlayersLimitChange = (event: SelectChangeEvent<typeof playersLimit>) => {
    setPlayersLimit(Number(event.target.value));
  };

  return (
    <Box sx={playersContainer}>
      <PlayersLimitSelect playersCount={players.length} onChang={handlePlayersLimitChange} playersLimit={playersLimit} />
      <PlayersList players={players} playersLimit={playersLimit} onPlayerDelete={onPlayerDelete} />
    </Box>
  );
};

export default PlayersBox;
