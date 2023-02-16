import React from 'react';
import { Stack, SvgIcon, Typography, useTheme } from '@mui/material';
// eslint-disable-next-line import/namespace
import { rules } from './RulesConfig';

type RuleProps = {
  ruleId: number;
  children?: JSX.Element | JSX.Element[];
};

const Rule: React.FC<RuleProps> = ({ ruleId }) => {
  const theme = useTheme();

  return (
    <Stack p={0} m={0}>
      <SvgIcon
        sx={{
          fill: theme.palette.text.primary,
          stroke: theme.palette.text.primary,
          width: '70%',
          height: '70%',
          display: 'block',
          margin: 'auto',
        }}
        component={rules[ruleId].image}
        inheritViewBox
      />
      <Typography variant="h5" align={'center'} sx={{ fontWeight: 700 }}>
        {rules[ruleId].title}
      </Typography>
      <Typography variant="body1" component="p" align={'center'} gutterBottom sx={{ fontSize: 26 }}>
        {rules[ruleId].description}
      </Typography>
    </Stack>
  );
};

export default Rule;
