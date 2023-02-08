import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { EMPTY, EmptyAvatarIcon } from './../../configs/defaults';
import { emptyAvatarIconStyle } from '.';

const EmptyPlayerListItem: React.FC = () => {
  return (
    <ListItem divider>
      <ListItemIcon>
        <EmptyAvatarIcon sx={emptyAvatarIconStyle} />
      </ListItemIcon>
      <ListItemText primary={EMPTY} />
    </ListItem>
  );
};

export default EmptyPlayerListItem;
