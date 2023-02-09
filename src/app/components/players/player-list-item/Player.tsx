import React from 'react';
import { User } from '../../../store/userSlice';
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import StarIcon from '@mui/icons-material/Star';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { playerListItemStyles } from './styles';

interface PlayerProps {
  user: User | undefined;
  isOwner: boolean;
}

export const Player = ({ user, isOwner }: PlayerProps) => {
  const endIcon = isOwner ? (
    <IconButton edge="end" disabled>
      <StarIcon />
    </IconButton>
  ) : (
    <IconButton edge="end" aria-label="delete">
      <DeleteRoundedIcon />
    </IconButton>
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
