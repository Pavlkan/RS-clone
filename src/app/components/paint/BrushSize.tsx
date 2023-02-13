import * as React from 'react';
import { Box, Grid } from '@mui/material';
// eslint-disable-next-line import/named
import { circleShape, borderedItemStyles } from './stiles';

type BrushSizeProps = {
  sizeOptions: number[];
  size: number;
  onSizeChange: (size: number) => void;
};

const multipayer = 2;

export const BrushSize: React.FC<BrushSizeProps> = ({ size, sizeOptions, onSizeChange }) => {
  const hanleSelectSize = (size: number) => {
    onSizeChange(size);
  };

  const sizes = sizeOptions.map((option, index) => {
    const wrapperSize = 20 + sizeOptions[sizeOptions.length - 1] * multipayer;
    return (
      <Grid
        onClick={() => hanleSelectSize(option)}
        key={index}
        m={0.5}
        item
        sx={[
          ...(Array.isArray(borderedItemStyles) ? borderedItemStyles : [borderedItemStyles]),
          {
            size: option,
            height: wrapperSize,
            width: wrapperSize,
            opacity: option === size ? 1 : 0.5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <Box
          sx={[
            ...(Array.isArray(circleShape) ? circleShape : [circleShape]),
            { height: 15 + option * multipayer, width: 15 + option * multipayer },
          ]}
        ></Box>
      </Grid>
    );
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 'fit-content',
      }}
    >
      <Grid sx={borderedItemStyles} container spacing={0}>
        {sizes}
      </Grid>
    </Box>
  );
};
