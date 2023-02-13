import React, { useState } from 'react';
import clickAudio from '../../../assets/click.mp3';
import flipAudio from '../../../assets/flip.mp3';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import { IconButton } from '@mui/material';

let statusAudio = true;
const audioClick = new Audio(clickAudio);
const audioFlip = new Audio(flipAudio);
const soundOf = (state: boolean) => {
  statusAudio = state;
};
export const playClick = () => {
  if (statusAudio) {
    audioClick.currentTime = 0;
    audioClick.play();
  }
};
export const playFlip = () => {
  if (statusAudio) {
    audioFlip.currentTime = 0;
    audioFlip.play();
  }
};

const ConstrolsAudio = () => {
  const [status, setStatus] = useState(true);
  return (
    <>
      <IconButton
        sx={{ justifySelf: 'center' }}
        onClick={() => {
          playClick();
          setStatus(status ? false : true);
          soundOf(status);
        }}
      >
        {status ? <VolumeUpRoundedIcon /> : <VolumeOffRoundedIcon />}
      </IconButton>
    </>
  );
};

export default ConstrolsAudio;
