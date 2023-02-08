import { PlayerProps } from '../PlayerListItem';

export type PlayersListProps = {
  players: PlayerProps[];
  playersLimit: number;
  onPlayerDelete: (playerId: string) => void;
};
