import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSocket } from '../../../socket/useSocket';
import { Paint } from '../../paint/Paint';

export interface DrawingPhaseProps {
  isInitialWrite: boolean;
  phaseAmount: number;
  currentPhase: number;
}

export const DrawingPhase = (props: DrawingPhaseProps) => {
  const socket = useSocket();
  const [phrase, setPhrase] = useState('Wait, not so fast :(');
  useEffect(() => {
    socket?.emit('game:update-data', props.currentPhase, phrase);
  }, [socket, props.currentPhase, phrase]);

  return (
    <Box
      sx={{
        padding: '2%',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '90%',
        justifyContent: 'center',
        gap: '10%',
        minHeight: '100vh',
      }}
    >
      <Paint currentPhase={props.currentPhase}></Paint>
      <h1 onClick={() => setPhrase('!!')}>DrawingPhase</h1>
    </Box>
  );
};
