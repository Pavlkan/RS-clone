import React from 'react';
import { MenuItem, FormControl, Select, Typography } from '@mui/material';

export interface PlayersLimitSelectProps {
  minAmountOfPlayers: number;
  currentPlayersLimit: number;
  onPlayersAmountChange: (amount: number) => void;
}

const PLAYERS_TITLE = 'PLAYERS';

export const PlayersLimitSelect = (props: PlayersLimitSelectProps) => {
  const minAmountOfPlayers = props.minAmountOfPlayers >= 4 ? props.minAmountOfPlayers : 4;
  const maxAmountOfPlayers = 20;
  const initialAmountOfPlayers = 14;

  const createMenuItems = () => {
    const menuItems = [];
    for (let i = minAmountOfPlayers; i <= maxAmountOfPlayers; i++) {
      if (i > 10) i++;
      menuItems.push(
        <MenuItem value={i} key={i}>
          {i} Players
        </MenuItem>,
      );
    }
    return menuItems;
  };

  return (
    <>
      <Typography variant="h6" component="div" align="center">
        {PLAYERS_TITLE} {props.minAmountOfPlayers}/{props.currentPlayersLimit}
      </Typography>
      <FormControl color="secondary" fullWidth style={{ marginBottom: '5%' }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={initialAmountOfPlayers}
          onChange={event => {
            props.onPlayersAmountChange(+event.target.value);
          }}
        >
          {createMenuItems().map(MenuItem => MenuItem)}
        </Select>
      </FormControl>
    </>
  );
};
