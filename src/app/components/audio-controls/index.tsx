import React, { useState } from 'react';
import clickAudio from '../../../assets/click.mp3';
import flipAudio from '../../../assets/flip.mp3';
import alertAudio from '../../../assets/alert.mp3';
import tabsAudio from '../../../assets/tabs.mp3';
import timeoutAudio from '../../../assets/timeout.mp3';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import { IconButton } from '@mui/material';

const sounds: { [key: string]: HTMLAudioElement } = {
  click: new Audio(clickAudio),
  flip: new Audio(flipAudio),
  alert: new Audio(alertAudio),
  tabs: new Audio(tabsAudio),
  timeout: new Audio(timeoutAudio),
};

function setStatusSound(status: boolean) {
  localStorage.setItem('statusSound', `${status}`);
}

function getStatusSound() {
  const status = localStorage.getItem('statusSound');
  if (status) {
    return JSON.parse(status);
  }
  setStatusSound(true);
}

export const playAudio = (str: string) => {
  if (getStatusSound() && str in sounds) {
    const audio: HTMLAudioElement = sounds[str];
    audio.currentTime = 0;
    audio.play();
  }
};

const ControlsAudio = () => {
  const [status, setStatus] = useState(getStatusSound());
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
        {status ? <VolumeUpRoundedIcon color="secondary" style={{ fontSize: 50 }} /> : <VolumeOffRoundedIcon style={{ fontSize: 50 }} />}
      </IconButton>
    </>
  );
};

export default ControlsAudio;
