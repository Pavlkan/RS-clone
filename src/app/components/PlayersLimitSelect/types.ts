// eslint-disable-next-line import/named
import { SelectChangeEvent } from '@mui/material/Select';

export type PlayersLimitSelectProps = {
  playersCount: number;
  onChang: (event: SelectChangeEvent<number>) => void;
  playersLimit: number;
};
