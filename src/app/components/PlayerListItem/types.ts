export type PlayerProps = {
  name: string;
  isOwner: boolean;
  avatarId: number;
};

export type PlayerListItemProps = PlayerProps & {
  onPlayerDelete: (playerId: string) => void;
};
