import React, { useCallback, useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import TimelapseRoundedIcon from '@mui/icons-material/TimelapseRounded';
import PermPhoneMsgRoundedIcon from '@mui/icons-material/PermPhoneMsgRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import Garticphone from '../../../../assets/Garticphone.webp';
import { useSocket } from '../../../socket/useSocket';
import { useSelector } from 'react-redux';
import { selectGame } from '../../../store/selectors';
import { playAudio } from '../../audio-controls';

export interface WritingPhaseProps {
  isInitialWrite: boolean;
  phaseAmount: number;
  currentPhase: number;
}

export const WritingPhase = (props: WritingPhaseProps) => {
  const socket = useSocket();
  const game = useSelector(selectGame);
  const [phrase, setPhrase] = useState('Wait, not so fast :(');
  const [phraseConfirmation, setPhraseConfirmation] = useState(false);
  const textFieldLabel = props.isInitialWrite ? 'Your witty sentence' : 'Type your description for this scene here';

  const onSubmitPhraseClick = useCallback(() => {
    socket?.emit('game:update-data', props.currentPhase - 1, phrase);
    playAudio('click');
    setPhraseConfirmation(true);
  }, [socket, props.currentPhase, phrase]);

  useEffect(() => {
    socket?.emit('game:update-data', props.currentPhase - 1, phrase);
  }, [socket, props.currentPhase, phrase]);

  // const matches = useMediaQuery('(min-width:768px)');

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
        )) || (
          <img
            width={'30%'}
            style={{ boxShadow: '0px 0px 7px 1px black' }}
            src={game.rounds[props.currentPhase - 1].data}
            alt="Another Player picture"
          />
        )}

        <Box
          sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '3%', WebkitJustifyContent: 'center' }}
        >
          <TextField
            color="secondary"
            label={textFieldLabel}
            variant="outlined"
            size="small"
            style={{ width: '40%' }}
            onChange={event => {
              setPhrase(event.target.value);
              setPhraseConfirmation(false);
            }}
          ></TextField>
          <Button
            style={{ width: '120px' }}
            color={phraseConfirmation ? 'success' : 'secondary'}
            startIcon={phraseConfirmation ? <CheckCircleRoundedIcon /> : <BorderColorIcon />}
            variant="contained"
            onClick={onSubmitPhraseClick}
          >
            {(phraseConfirmation && 'DONE') || 'CONFIRM'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
