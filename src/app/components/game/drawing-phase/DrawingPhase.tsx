import React from 'react';
import { Box } from '@mui/material';
import { Paint } from '../../paint/Paint';

export interface DrawingPhaseProps {
  isInitialWrite: boolean;
  phaseAmount: number;
  currentPhase: number;
  roundTime: number;
}

export const DrawingPhase = (props: DrawingPhaseProps) => {
  return (
    <Box
      sx={{
        padding: '2% 2% 0 2%',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '100%',
        justifyContent: 'center',
        gap: '10%',
        minHeight: '100vh',
      }}
    >
      <Paint currentPhase={props.currentPhase} roundTime={props.roundTime} phaseAmount={props.phaseAmount}></Paint>
    </Box>
  );
};
