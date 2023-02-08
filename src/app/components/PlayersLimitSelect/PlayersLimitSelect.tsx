import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// eslint-disable-next-line import/named
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { playersLimitOptions } from './../../configs/defaults';
import { Typography } from '@mui/material';
import { PlayersLimitSelectProps } from './types';
import { selectContainer } from '.';

const PLAYERS_TITLE = 'PLAYERS';

const PlayersLimitSelect: React.FC<PlayersLimitSelectProps> = ({ playersCount, onChang, playersLimit }) => {
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<typeof playersLimit>) => {
    onChang(event);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Typography variant="h6" component="div" align="center" sx={{ m: 1, minWidth: 350 }}>
        {PLAYERS_TITLE} {playersCount}/{playersLimit}
      </Typography>
      <FormControl sx={selectContainer}>
        <Select
          id="players-limit-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={playersLimit}
          onChange={handleChange}
        >
          {playersLimitOptions.map(item => (
            <MenuItem key={item} value={item}>
              {item} {PLAYERS_TITLE}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default PlayersLimitSelect;
