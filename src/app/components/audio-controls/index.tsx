import React, { useState } from 'react';
import clickAudio from '../../../assets/click.mp3';
import flipAudio from '../../../assets/flip.mp3';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import { IconButton } from '@mui/material';

const sounds: { [key: string]: HTMLAudioElement } = {
  click: new Audio(clickAudio),
  flip: new Audio(flipAudio),
};

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

export const playAudio = (str: string) => {
  if (getStatusSuond() && str in sounds) {
    const audio: HTMLAudioElement = sounds[str];
    audio.currentTime = 0;
    audio.play();
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
          playAudio('click');
        }}
      >
        {status ? <VolumeUpRoundedIcon style={{ fontSize: 50 }} /> : <VolumeOffRoundedIcon style={{ fontSize: 50 }} />}
      </IconButton>
    </>
  );
};

export default ConstrolsAudio;
