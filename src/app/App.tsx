import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';

import { LandingPage } from './pages/LandingPage';
import { LobbyPage } from './pages/LobbyPage';
import { GameProcessor } from './GameProcessor';
import { GamePage } from './pages/GamePage';
import { store } from './store/store';
import { SocketProvider } from './socket/SocketProvider';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <BrowserRouter>
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/" element={<Navigate to="/landing" />} />
            <Route
              path="/"
              element={
                <SocketProvider>
                  <GameProcessor />
                </SocketProvider>
              }
            >
              <Route path="/lobby" element={<LobbyPage />} />
              <Route path="/game" element={<GamePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};
