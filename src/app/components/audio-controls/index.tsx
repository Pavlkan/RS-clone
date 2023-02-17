import React, { useState } from 'react';
import clickAudio from '../../../assets/click.mp3';
import flipAudio from '../../../assets/flip.mp3';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import { IconButton } from '@mui/material';

const audioClick = new Audio(clickAudio);
const audioFlip = new Audio(flipAudio);

function setStatusSound(status: boolean) {
  localStorage.setItem('statusSound', `${status}`);
}
function getStatusSuond() {
  const status = localStorage.getItem('statusSound');
  if (status) {
    return JSON.parse(status);
  }
  setStatusSound(true);
}
export const playClick = () => {
  if (getStatusSuond()) {
    audioClick.currentTime = 0;
    audioClick.play();
  }
};
export const playFlip = () => {
  if (getStatusSuond()) {
    audioFlip.currentTime = 0;
    audioFlip.play();
  }
};

const ConstrolsAudio = () => {
  const [status, setStatus] = useState(getStatusSuond());
  return (
    <>
      <IconButton
        sx={{ justifySelf: 'center' }}
        onClick={() => {
          setStatusSound(!status);
          setStatus(!status);
          playClick();
        }}
      >
        {status ? <VolumeUpRoundedIcon /> : <VolumeOffRoundedIcon />}
      </IconButton>
    </>
  );
};

export default ConstrolsAudio;
