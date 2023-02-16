import React, { useState, useEffect } from 'react';
import { Stack, Box, Typography, Stepper, Step, StepLabel } from '@mui/material';
import Rule from './Rule';
import { rules } from './RulesConfig';

const HOW_TO_PLAY = 'How to play';

const GameRules = () => {
  const [currentRuleId, setCurrentRuleId] = useState<number>(0);

  const nextStep = () => {
    setCurrentRuleId(prev => (prev + 1 >= rules.length ? 0 : prev + 1));
  };

  const manualStep = (stepId: number) => {
    setCurrentRuleId(() => (stepId >= rules.length ? 0 : stepId));
  };

  useEffect(() => {
    const stepperRepeat = setInterval(nextStep, 3000);
    return () => {
      clearInterval(stepperRepeat);
    };
  }, []);

  return (
    <Stack spacing={0} width={'100%'} borderRadius={2} sx={{ border: '1px solid' }}>
      <Typography align={'center'} mt={2} mb={0} variant="h4">
        {HOW_TO_PLAY}
      </Typography>
      <Rule ruleId={currentRuleId} />
      <Box
        p={5}
        sx={{
          width: '70%',
          display: 'block',
          margin: 'auto',
        }}
      >
        <Stepper activeStep={currentRuleId}>
          {rules.map((_item, index) => (
            <Step key={index} onClick={() => manualStep(index)}>
              <StepLabel>{''}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Stack>
  );
};

export default GameRules;
