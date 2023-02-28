import React, { useState } from 'react';
// eslint-disable-next-line import/named
import { FormControl, Grid, MenuItem, Select, SelectChangeEvent, Stack, ToggleButton, Typography } from '@mui/material';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import CreateIcon from '@mui/icons-material/Create';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import SleddingIcon from '@mui/icons-material/Sledding';

const PRESETS = 'Game Presets';

const timeIntervalInMilsec = 60000;

const roundDurationOptions = {
  fast: { id: 'fast', time: timeIntervalInMilsec, title: 'Fast' },
  normal: { id: 'normal', time: timeIntervalInMilsec * 2, title: 'Normal' },
  slow: { id: 'slow', time: timeIntervalInMilsec * 3, title: 'Slow' },
};

interface GamePresetsProps {
  handleWritingRoundTimeChange: (newTime: string) => void;
  handleDrawingRoundTimeChange: (newTime: string) => void;
}

const GamePresets = (props: GamePresetsProps) => {
  const [writingRoundDuration, setWritingRoundDuration] = useState(roundDurationOptions.normal.id);
  const [drawingRoundDuration, setDrawingRoundDuration] = useState(roundDurationOptions.normal.id);
  const [isExpressMode, setIsExpressMode] = useState(false);

  const handleChangeWritingRoundDuration = (event: SelectChangeEvent) => {
    setWritingRoundDuration(event.target.value);
    props.handleWritingRoundTimeChange(event.target.value);
  };

  const handleChangeDrawingRoundDuration = (event: SelectChangeEvent) => {
    setDrawingRoundDuration(event.target.value);
    props.handleDrawingRoundTimeChange(event.target.value);
  };

  const handleExpressModeChange = () => {
    setIsExpressMode(!isExpressMode);
    if (!isExpressMode) {
      props.handleWritingRoundTimeChange('fast');
      props.handleDrawingRoundTimeChange('fast');
    } else {
      props.handleWritingRoundTimeChange(writingRoundDuration);
      props.handleDrawingRoundTimeChange(drawingRoundDuration);
    }
  };

  return (
    <Stack spacing={3} width={'100%'} borderRadius={2} sx={{ border: '1px solid', height: '100%' }}>
      <Typography align={'center'} mt={2} mb={1} variant="h4">
        {PRESETS}
      </Typography>
      <Grid container spacing={1} justifyContent="space-around">
        <Grid item xs={4}>
          <CreateIcon fontSize="large" />
          <Typography variant="h6" pl={2} component="span" sx={{ verticalAlign: 'super' }}>
            Writing phase
          </Typography>
        </Grid>
        <Grid item xs={4} alignSelf="center">
          <FormControl sx={{ width: '100%' }}>
            <Select
              value={writingRoundDuration}
              onChange={handleChangeWritingRoundDuration}
              displayEmpty
              disabled={isExpressMode}
              inputProps={{ 'aria-label': 'Writing Round Duration' }}
            >
              {Object.values(roundDurationOptions).map(value => {
                return (
                  <MenuItem key={value.id} value={value.id}>
                    {value.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1} justifyContent="space-around">
        <Grid item xs={4}>
          <FormatPaintIcon fontSize="large" />
          <Typography variant="h6" pl={2} component="span" sx={{ verticalAlign: 'super' }}>
            Drawing phase
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <FormControl sx={{ width: '100%' }}>
            <Select
              value={drawingRoundDuration}
              onChange={handleChangeDrawingRoundDuration}
              displayEmpty
              disabled={isExpressMode}
              inputProps={{ 'aria-label': 'Drawing Round Duration' }}
            >
              {Object.values(roundDurationOptions).map(value => {
                return (
                  <MenuItem key={value.id} value={value.id}>
                    {value.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1} justifyContent="space-around">
        <Grid item xs={4}>
          <SleddingIcon fontSize="large" />
          <Typography variant="h6" pl={2} component="span" sx={{ verticalAlign: 'super' }}>
            Express mode
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <ToggleButton value="check" selected={isExpressMode} sx={{ minWidth: 100 }} onChange={() => handleExpressModeChange()}>
            <ElectricBoltIcon />
            <Typography align={'center'} mt={0} mb={0} variant="h6">
              {isExpressMode ? 'OFF' : 'ON'}
            </Typography>
          </ToggleButton>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default GamePresets;
