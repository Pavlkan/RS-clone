import React from 'react';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <h1>
      LandingPage
      <Link to="/lobby">Go to lobby</Link>
    </h1>
  );
};
