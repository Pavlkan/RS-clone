import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export interface PlayersAmountOptionsInterface {
  minAmountOfPlayers: number;
  onPlayersAmountChange: (amount: number) => void;
}

export const PlayersLimitOption = (props: PlayersAmountOptionsInterface) => {
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
    <FormControl fullWidth style={{ marginBottom: '5%' }}>
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
  );
};
