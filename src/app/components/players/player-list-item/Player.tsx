import React, { useCallback, useState } from 'react';
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import StarIcon from '@mui/icons-material/Star';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { User } from '../../../store/userSlice';
import { currentPlayerListItemStyles, playerListItemStyles } from './styles';
import { useSocket } from '../../../socket/useSocket';

interface PlayerProps {
  user: User | undefined;
  isOwnerPlayerItem: boolean;
  isOwner: boolean;
}

export const Player = ({ user, isOwnerPlayerItem, isOwner }: PlayerProps) => {
  const socket = useSocket();
  const [removeDisabled, setRemoveDisabled] = useState(false);

  const onRemoveClick = useCallback(() => {
    socket?.emit('lobby:expel', user?.id);
    setRemoveDisabled(true);
  }, [socket, user?.id]);

  const endIcon = isOwnerPlayerItem ? (
    <IconButton edge="end" disabled>
      <StarIcon color="secondary" />
    </IconButton>
  ) : (
    isOwner &&
    user && (
      <IconButton edge="end" aria-label="delete" disabled={removeDisabled} onClick={onRemoveClick}>
        <DeleteRoundedIcon />
      </IconButton>
    )
  );

  return (
    <>
      {(user || isOwner) && (
        <ListItem sx={isOwnerPlayerItem ? currentPlayerListItemStyles : playerListItemStyles} secondaryAction={endIcon}>
          <ListItemAvatar>
            {(user && <Avatar src={user.avatar} alt={user.avatar} />) || (
              <Avatar>
                <TagFacesIcon />
              </Avatar>
            )}
          </ListItemAvatar>
          <ListItemText primary={user?.name ?? 'EMPTY'} />
        </ListItem>
      )}
    </>
  );
};
