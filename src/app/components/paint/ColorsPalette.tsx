import * as React from 'react';
import { Box, Grid } from '@mui/material';
// eslint-disable-next-line import/named
import { MuiColorInput, MuiColorInputValue, MuiColorInputFormat } from 'mui-color-input';

const colorOptions = [
  '#000000',
  '#666666',
  '#0050CD',
  '#FFFFFF',
  '#AAAAAA',
  '#26C9FF',
  '#017420',
  '#990000',
  '#964112',
  '#11B03C',
  '#FF0013',
  '#FF7829',
  '#B0701C',
  '#99004E',
  '#FFC126',
  '#FF008F',
  '#FEAFA8',
  '#5A0089',
];

type ColorsPaletteProps = {
  color: MuiColorInputValue;
  onColorChange: (color: MuiColorInputValue) => void;
};

export const ColorsPalette: React.FC<ColorsPaletteProps> = ({ color, onColorChange }) => {
  const handleChange = (newValue: string) => {
    onColorChange(newValue);
  };

  const format: MuiColorInputFormat = 'hex';

  const hanleSelectColor = (color: MuiColorInputValue) => {
    onColorChange(color);
  };

  const colors = colorOptions.map((color, index) => {
    return (
      <Grid onClick={() => hanleSelectColor(color)} key={index} m={0.5} item xs={3} sx={{ backgroundColor: color, height: 40 }}></Grid>
    );
  });

  return (
    <Box
      sx={{
        marginTop: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Grid container justifyContent="center" alignItems="flex-start" spacing={2}>
        {colors}
        <Grid marginTop={0.5} marginLeft={-1.5} item xs={10} sx={{ height: 40 }}>
          <MuiColorInput value={color} onChange={handleChange} format={format} fullWidth size="medium" />
        </Grid>
      </Grid>
    </Box>
  );
};
