import * as React from 'react';
import { useState } from 'react';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import { Canvas } from './Canvas';
import { ColorsPalette } from './ColorsPalette';
// eslint-disable-next-line import/named
import { MuiColorInputValue } from 'mui-color-input';
import { BrushSize } from './BrushSize';
import { Tools } from './Tools';
import { borderedItemStyles } from './styles';
import { useSocket } from '../../socket/useSocket';
import { initialImage } from './initialImage';
import { useSelector } from 'react-redux';
import { selectGame } from '../../store/selectors';
import { playAudio } from '../audio-controls';

const defaultBrusColor = '#000000';
const brushSizes = [2, 5, 8, 11, 15];
const defaultBrushSize = brushSizes[2];

export const Paint = (props: { currentPhase: number }) => {
  const socket = useSocket();
  const game = useSelector(selectGame);
  const currentData = game.rounds[props.currentPhase - 1].data;

  const [brushColor, setBrashColor] = useState<MuiColorInputValue>(defaultBrusColor);
  const [brushSize, setBrushSize] = useState<number>(defaultBrushSize);
  const [tool, setTool] = useState<string>('brush');
  const [clearTrigger, setSlearTrigger] = useState(0);
  const [saveTrigger, setSaveTrigger] = useState(0);
  const [changeTrigger, setChangeTrigger] = useState(0);
  const [canvasData, setCanvasData] = useState(initialImage);
  const theme = useTheme();
  const onChangeBrashColor = (color: MuiColorInputValue) => {
    setBrashColor(color);
  };

  const onSubmitPaintClick = React.useCallback(() => {
    socket?.emit('game:update-data', props.currentPhase - 1, canvasData);
    playAudio('click');
    setChangeTrigger(trigger => trigger + 1);
  }, [socket, props.currentPhase, canvasData]);

  const onChangeBrashSize = (size: number) => {
    setBrushSize(size);
  };
  const onToolChange = (toolId: string) => {
    setTool(toolId);
  };

  const handleClearCanvas = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    playAudio('click');
    setSlearTrigger(trigger => trigger + 1);
  };

  const handleSaveCanvas = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    playAudio('click');
    setSaveTrigger(trigger => trigger + 1);
  };

  const handleSendCanvasData = (data: string) => {
    setCanvasData(data);
  };

  React.useEffect(() => {
    socket?.emit('game:update-data', props.currentPhase - 1, canvasData);
  }, [socket, props.currentPhase, canvasData]);

  return (
    <Box sx={{ width: 1082, display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto' }}>
      <Grid container spacing={1} sx={borderedItemStyles}>
        <Grid item xs={12} m={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0', margin: '0' }}>
          <Typography>HEY, IT IS TIME TO DRAW!</Typography>
          <Typography variant="h5">{currentData}</Typography>
        </Grid>
        <Grid item xs={2}>
          <ColorsPalette color={brushColor} onColorChange={onChangeBrashColor} />
        </Grid>
        <Grid style={{ display: 'flex', justifyContent: 'center' }} item xs={8}>
          <Canvas
            width={600}
            height={500}
            brushColor={brushColor}
            brushSize={brushSize}
            tool={tool}
            clearTrigger={clearTrigger}
            saveTrigger={saveTrigger}
            changeTrigger={changeTrigger}
            changeCanvasData={handleSendCanvasData}
          />
        </Grid>
        <Grid item xs={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Tools onToolChange={onToolChange} activeToolId={tool} />
          <Grid container spacing={0} marginTop={2} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Button variant="text" onClick={handleClearCanvas} size="large" sx={{ color: theme.palette.text.primary }}>
                Clear
              </Button>
            </Grid>
            <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Button variant="text" onClick={handleSaveCanvas} size="large" sx={{ color: theme.palette.text.primary }}>
                Save
              </Button>
              <Button variant="text" onClick={onSubmitPaintClick} size="large" sx={{ color: theme.palette.text.primary }}>
                Done
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} m={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <BrushSize size={brushSize} sizeOptions={brushSizes} onSizeChange={onChangeBrashSize} />
        </Grid>
      </Grid>
    </Box>
  );
};
