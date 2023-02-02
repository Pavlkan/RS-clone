import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { LandingPage } from './pages/LandingPage';
import { LobbyPage } from './pages/LobbyPage';

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
  return <RouterProvider router={router} />;
};
