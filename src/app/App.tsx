import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { LandingPage } from './pages/LandingPage';
import { LobbyPage } from './pages/LobbyPage';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/lobby',
    element: <LobbyPage />,
  },
]);

export const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
