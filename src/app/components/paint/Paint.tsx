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
import TimeProgress from '../time-progress';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';

const defaultBrusColor = '#000000';
const brushSizes = [2, 5, 8, 11, 15];
const defaultBrushSize = brushSizes[2];

export const Paint = (props: { currentPhase: number; phaseAmount: number; roundTime: number }) => {
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
  const [paintConfirmation, setPaintConfirmation] = useState(false);
  const theme = useTheme();

  const onChangeBrashColor = (color: MuiColorInputValue) => {
    setBrashColor(color);
  };

  const onSubmitPaintClick = React.useCallback(() => {
    socket?.emit('game:update-data', props.currentPhase - 1, canvasData);
    playAudio('click');
    setChangeTrigger(trigger => trigger + 1);
    setPaintConfirmation(true);
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
      <Grid container spacing={1} sx={{ ...borderedItemStyles, padding: '0 1vw' }}>
        <Grid item xs={12} m={2} style={{ padding: 0 }}>
          <Grid container direction="row">
            <Grid item xs={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h4">
                {props.currentPhase}/{props.phaseAmount}
              </Typography>
            </Grid>
            <Grid item xs={10} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0', margin: '0' }}>
              <Typography>HEY, IT IS TIME TO DRAW!</Typography>
              <Typography variant="h5">{currentData}</Typography>
            </Grid>
            <Grid item xs={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <TimeProgress timeInMilsec={props.roundTime} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <ColorsPalette color={brushColor} onColorChange={onChangeBrashColor} />
        </Grid>
        <Grid style={{ display: 'flex', justifyContent: 'center', padding: '0' }} item xs={8}>
          <Canvas
            width={600}
            height={480}
            brushColor={brushColor}
            brushSize={brushSize}
            tool={tool}
            clearTrigger={clearTrigger}
            saveTrigger={saveTrigger}
            changeTrigger={changeTrigger}
            changeCanvasData={handleSendCanvasData}
            setPaintConfirmation={setPaintConfirmation}
          />
        </Grid>
        <Grid item xs={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Tools onToolChange={onToolChange} activeToolId={tool} />
          <Grid container spacing={0.5} marginTop={2} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Button variant="text" onClick={handleClearCanvas} style={{ width: '120px' }} sx={{ color: theme.palette.text.primary }}>
                Clear
              </Button>
            </Grid>
            <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <Button variant="text" onClick={handleSaveCanvas} style={{ width: '120px' }} sx={{ color: theme.palette.text.primary }}>
                Save
              </Button>
              <Button
                variant="contained"
                color={paintConfirmation ? 'success' : 'secondary'}
                startIcon={paintConfirmation ? <CheckCircleRoundedIcon /> : <PaletteRoundedIcon />}
                onClick={onSubmitPaintClick}
                style={{ width: '120px' }}
              >
                {(paintConfirmation && 'DONE') || 'CONFIRM'}
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
