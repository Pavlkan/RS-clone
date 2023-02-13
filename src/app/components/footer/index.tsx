import React from 'react';
import { Box, Link } from '@mui/material';
import dataLinks from './dataLinks';

export const Footer = () => {
  const links = dataLinks.map((dataLink, key) => {
    return (
      <Link underline="hover" href={dataLink.link} key={key} color={'Menu'} margin={'1em'}>
        {dataLink.text}
      </Link>
    );
  });
  return <Box sx={{ margin: '0 auto' }}>{links}</Box>;
};
