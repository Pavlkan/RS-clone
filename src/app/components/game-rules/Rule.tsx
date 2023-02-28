import React from 'react';
import { Stack, SvgIcon, Typography, useTheme } from '@mui/material';
// eslint-disable-next-line import/namespace
import { rules } from './RulesConfig';
import useMediaQuery from '@mui/material/useMediaQuery';

type RuleProps = {
  ruleId: number;
  children?: JSX.Element | JSX.Element[];
};

const Rule: React.FC<RuleProps> = ({ ruleId }) => {
  const theme = useTheme();

  const matches = useMediaQuery('(min-width:768px)');

  return (
    <Stack p={0} m={0}>
      <SvgIcon
        sx={{
          fill: theme.palette.text.primary,
          stroke: theme.palette.text.primary,
          width: matches ? '30%' : '60%',
          height: '70%',
          display: 'block',
          margin: 'auto',
        }}
        component={rules[ruleId].image}
        inheritViewBox
      />
      <Typography variant="h5" align={'center'} sx={{ fontWeight: 700, marginBottom: 0 }}>
        {rules[ruleId].title}
      </Typography>
      <Typography variant="body1" component="p" align={'center'} gutterBottom sx={{ fontSize: '100%' }}>
        {rules[ruleId].description}
      </Typography>
    </Stack>
  );
};

export default Rule;
