import React, { useCallback, useEffect, useState } from 'react';
import NextPlanRoundedIcon from '@mui/icons-material/NextPlanRounded';
import Box from '@mui/material/Box';

import { avatarIcons } from './icons';
import { playAudio } from '../audio-controls';

export interface AvatarIconProps {
  onChange: (avatar: string) => void;
}

export const AvatarIcon = ({ onChange }: AvatarIconProps) => {
  const randomAvatarIndex = Math.floor(Math.random() * avatarIcons.length);
  const [avatarIndex, setAvatarIndex] = useState(randomAvatarIndex ?? 0);

  const changeAvatar = useCallback(() => {
    const next = (avatarIndex + 1) % avatarIcons.length;
    setAvatarIndex(next);
  }, [avatarIndex, setAvatarIndex]);

  useEffect(() => {
    onChange(avatarIcons[avatarIndex].img);
  }, [avatarIndex, onChange]);

  return (
    <Box width="25%" sx={{ position: 'relative' }} onClick={() => playAudio('flip')}>
      <img
        width="100%"
        style={{ cursor: 'pointer' }}
        onClick={changeAvatar}
        src={avatarIcons[avatarIndex].img}
        alt={avatarIcons[avatarIndex].title}
      />
      <NextPlanRoundedIcon
        style={{ position: 'absolute', bottom: '10%', right: '-2%', cursor: 'pointer', fontSize: '200%' }}
        onClick={changeAvatar}
      />
    </Box>
  );
};
