import React, { useEffect, useState } from 'react';
import NextPlanRoundedIcon from '@mui/icons-material/NextPlanRounded';
import Box from '@mui/material/Box';

import { avatarIcons } from './icons';

export interface AvatarIconInterface {
  currentAvatar: number;
}

export interface AvatarIconProps {
  onChange: (avatar: string) => void;
}

export const AvatarIcon = ({ onChange }: AvatarIconProps) => {
  const [currentAvatar, setCurrentAvatar] = useState(0);
  function avatarChange() {
    const avatarsAmount = avatarIcons.length - 1;
    if (currentAvatar >= avatarsAmount) {
      setCurrentAvatar(0);
    } else {
      setCurrentAvatar(currentAvatar + 1);
    }
  }

  useEffect(() => {
    onChange(avatarIcons[currentAvatar].img);
  }, [currentAvatar, onChange]);

  return (
    <Box width="25%" sx={{ position: 'relative' }}>
      <img
        width="100%"
        style={{ cursor: 'pointer' }}
        onClick={() => avatarChange()}
        src={avatarIcons[currentAvatar].img}
        alt={avatarIcons[currentAvatar].title}
      />
      <NextPlanRoundedIcon
        style={{ position: 'absolute', bottom: '10%', right: '-2%', cursor: 'pointer', fontSize: '200%' }}
        onClick={() => avatarChange()}
      />
    </Box>
  );
};
