import React from 'react';
import { List } from '@mui/material';
import { EmptyPlayerListItem } from '../EmptyPlayerListItem';
import { PlayerListItem } from '../PlayerListItem';
import { listStyles, PlayersListProps } from '.';

function generate<T extends React.Key>(element: React.ReactElement, _array: Array<T>) {
  return _array.map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const PlayersList: React.FC<PlayersListProps> = ({ players, playersLimit, onPlayerDelete }) => {
  const enptySlotsNumber = playersLimit - players.length;
  const emptySlotsArray = Array.from(Array(enptySlotsNumber).keys());
  const emptySlotsItems = generate(<EmptyPlayerListItem />, emptySlotsArray);
  const playersItems = players.map(({ name, isOwner, avatarId }) => (
    <PlayerListItem key={name} name={name} isOwner={isOwner} avatarId={avatarId} onPlayerDelete={onPlayerDelete} />
  ));

  return <List sx={listStyles}>{playersItems.concat(emptySlotsItems)}</List>;
};

export default PlayersList;
