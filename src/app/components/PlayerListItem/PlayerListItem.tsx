import React from 'react';
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemIcon, ListItemText } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import { avatarIcons } from './../../avatars/AvatarIconsRepo';
import { listItemIconStyle, PlayerListItemProps } from '.';

const PlayerListItem: React.FC<PlayerListItemProps> = ({ name, isOwner, avatarId, onPlayerDelete }) => {
  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    onPlayerDelete(name);
  };

  const endIcon = isOwner ? (
    <ListItemIcon sx={listItemIconStyle}>
      <StarIcon />
    </ListItemIcon>
  ) : (
    <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
      <DeleteIcon />
    </IconButton>
  );

  return (
    <ListItem divider secondaryAction={endIcon}>
      <ListItemAvatar>
        <Avatar alt={avatarIcons[avatarId].title} src={avatarIcons[avatarId].img} />
      </ListItemAvatar>
      <ListItemText primary={name} />
    </ListItem>
  );
};

export default PlayerListItem;
