import React from 'react';
import { Box, Link, useTheme } from '@mui/material';
import dataLinks from './dataLinks';

export const Footer = () => {
  const theme = useTheme();
  const links = dataLinks.map((dataLink, key) => {
    return (
      <Link underline="hover" href={dataLink.link} key={key} color={theme.palette.text.primary} margin={'1em'}>
        {dataLink.text}
      </Link>
    );
  });
  return <Box sx={{ margin: '0 auto' }}>{links}</Box>;
};
