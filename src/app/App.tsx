import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';

import { LandingPage } from './pages/LandingPage';
import { LobbyPage } from './pages/LobbyPage';
import { GameProcessor } from './GameProcessor';
import { GamePage } from './pages/GamePage';
import { SocketProvider } from './socket/SocketProvider';
import { selectIsAuth } from './store/selectors';
import { ProtectedRoute } from './ProtectedRoute';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const App = () => {
  const isAuth = useSelector(selectIsAuth);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <BrowserRouter>
        <Routes>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/" element={<Navigate to="/landing" />} />
          <Route
            path="/"
            element={
              <ProtectedRoute condition={isAuth} redirect="/landing">
                <SocketProvider>
                  <GameProcessor />
                </SocketProvider>
              </ProtectedRoute>
            }
          >
            <Route path="/lobby" element={<LobbyPage />} />
            <Route path="/game" element={<GamePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
