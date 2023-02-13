import * as React from 'react';
import { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { Canvas } from './Canvas';
import { ColorsPalette } from './ColorsPalette';
// eslint-disable-next-line import/named
import { MuiColorInputValue } from 'mui-color-input';
import { BrushSize } from './BrushSize';
import { Tools } from './Tools';
import { borderedItemStyles } from './stiles';

const defaultBrusColor = '#000000';
const brushSizes = [2, 5, 8, 11, 15];
const defaultBrushSize = brushSizes[2];

export const Paint = () => {
  const [brushColor, setBrashColor] = useState<MuiColorInputValue>(defaultBrusColor);
  const [brushSize, setBrushSize] = useState<number>(defaultBrushSize);
  const [tool, setTool] = useState<string>('brush');
  const [clearTrigger, setSlearTrigger] = useState(0);
  const [saveTrigger, setSaveTrigger] = useState(0);
  const onChangeBrashColor = (color: MuiColorInputValue) => {
    setBrashColor(color);
  };

  const onChangeBrashSize = (size: number) => {
    setBrushSize(size);
  };
  const onToolChange = (toolId: string) => {
    setTool(toolId);
  };

  const handleClearCanvas = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSlearTrigger(trigger => trigger + 1);
  };

  const handleSaveCanvas = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSaveTrigger(trigger => trigger + 1);
  };

  return (
    <Box sx={{ width: 1082, height: 698, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid container spacing={1} sx={borderedItemStyles}>
        <Grid item xs={12} m={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          Header
        </Grid>
        <Grid item xs={2}>
          <ColorsPalette color={brushColor} onColorChange={onChangeBrashColor} />
        </Grid>
        <Grid item xs={8}>
          <Canvas
            width={708}
            height={562}
            brushColor={brushColor}
            brushSize={brushSize}
            tool={tool}
            clearTrigger={clearTrigger}
            saveTrigger={saveTrigger}
          />
        </Grid>
        <Grid item xs={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Tools onToolChange={onToolChange} activeToolId={tool} />
          <Grid container spacing={0} marginTop={2} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Button variant="text" onClick={handleClearCanvas} size="large" sx={{ color: '#ffffff' }}>
                Clear
              </Button>
            </Grid>
            <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Button variant="text" onClick={handleSaveCanvas} size="large" sx={{ color: '#ffffff' }}>
                Save
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
