import { PlayerProps } from '../PlayerListItem';

export type PlayersBoxProps = {
  players: PlayerProps[];
  onPlayerDelete: (playerId: string) => void;
};
