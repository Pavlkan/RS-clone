import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

export const LobbyPage = () => {
  return (
    <h1>
      LobbyPage
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="contained">Go to landing page</Button>
      </Link>
    </h1>
  );
};
