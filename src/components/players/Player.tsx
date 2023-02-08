import React from 'react';
import { User } from '../../app/store/userSlice';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export const Player = (props: { user: User; isOwner: boolean }) => {
  const createAvatar = () => {
    if (props.user.name !== 'Empty') {
      return <img style={{ margin: '0.5vw', width: '4vw' }} src={props.user.avatar} alt={props.user.avatar} />;
    } else {
      return <AccountCircleIcon style={{ margin: '0.5vw', fontSize: '4vw' }}></AccountCircleIcon>;
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        marginBottom: '4%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        border: '1px solid white',
        borderRadius: '6vw 1vw 1vw 6vw',
      }}
    >
      {createAvatar()}
      <p style={{ margin: '0' }}>{props.user.name}</p>
      {props.isOwner && <StarBorderIcon />}
    </Box>
  );
};
