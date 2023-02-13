import React from 'react';
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import StarIcon from '@mui/icons-material/Star';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { User } from '../../../store/userSlice';
import { playerListItemStyles } from './styles';

interface PlayerProps {
  user: User | undefined;
  isOwnerPlayerItem: boolean;
  isOwner: boolean;
}

export const Player = ({ user, isOwnerPlayerItem, isOwner }: PlayerProps) => {
  const endIcon = isOwnerPlayerItem ? (
    <IconButton edge="end" disabled>
      <StarIcon />
    </IconButton>
  ) : (
    isOwner &&
    user && (
      <IconButton edge="end" aria-label="delete">
        <DeleteRoundedIcon />
      </IconButton>
    )
  );

  return (
    <ListItem sx={playerListItemStyles} secondaryAction={endIcon}>
      <ListItemAvatar>
        {(user && <Avatar src={user.avatar} alt={user.avatar} />) || (
          <Avatar>
            <TagFacesIcon />
          </Avatar>
        )}
      </ListItemAvatar>
      <ListItemText primary={user?.name ?? 'EMPTY'} />
    </ListItem>
  );
};
