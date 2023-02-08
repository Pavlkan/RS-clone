import React from 'react';
import { User } from '../../store/userSlice';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export const Player = ({ user, isOwner }: { user: User | undefined; isOwner: boolean }) => {
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
      {(user && <img style={{ margin: '0.5vw', width: '4vw' }} src={user.avatar} alt={user.avatar} />) || (
        <AccountCircleIcon style={{ margin: '0.5vw', fontSize: '4vw' }} />
      )}
      <p style={{ margin: '0' }}>{user?.name ?? 'Empty'}</p>
      {isOwner && <StarBorderIcon />}
    </Box>
  );
};
