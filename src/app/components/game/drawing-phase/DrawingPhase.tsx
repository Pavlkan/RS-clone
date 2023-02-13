import React, { useEffect, useState } from 'react';
import { useSocket } from '../../../socket/useSocket';

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

  return <h1 onClick={() => setPhrase('!!')}>DrawingPhase</h1>;
};
