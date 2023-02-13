import React, { useCallback, useEffect, useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import TimelapseRoundedIcon from '@mui/icons-material/TimelapseRounded';
import PermPhoneMsgRoundedIcon from '@mui/icons-material/PermPhoneMsgRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import Garticphone from '../../../../assets/Garticphone.webp';
import { useSocket } from '../../../socket/useSocket';

export interface WritingPhaseProps {
  isInitialWrite: boolean;
  phaseAmount: number;
  currentPhase: number;
}

export const WritingPhase = (props: WritingPhaseProps) => {
  const socket = useSocket();
  const [phrase, setPhrase] = useState('Wait, not so fast :(');
  const textFieldLabel = props.isInitialWrite ? 'Your witty sentence' : 'Type your description for this scene here';

  const onSubmitPhraseClick = useCallback(() => {
    socket?.emit('game:update-data', props.currentPhase, phrase);
  }, [socket, props.currentPhase, phrase]);

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
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'center' }}>
        <Typography variant="h6" component="div" align="center">
          {props.currentPhase}/{props.phaseAmount}
        </Typography>
        <img src={Garticphone} width="37%" style={{ justifySelf: 'center' }} alt="Garticphone" />
        {/* TODO: sound component with onClick */}
        <TimelapseRoundedIcon sx={{ justifySelf: 'center' }} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10%',
        }}
      >
        {(props.isInitialWrite && (
          <>
            <PermPhoneMsgRoundedIcon style={{ fontSize: '15vw' }} />
            <Typography variant="h4" component="div" align="center">
              WRITE A SENTENCE
            </Typography>
          </>
        )) || <h1>Another player picture</h1>}
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '3%', justifySelf: 'center' }}>
          <TextField
            label={textFieldLabel}
            variant="outlined"
            style={{ width: '60%' }}
            onChange={event => setPhrase(event.target.value)}
          ></TextField>
          <Button startIcon={<CheckCircleRoundedIcon />} variant="contained" onClick={onSubmitPhraseClick}>
            DONE
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
