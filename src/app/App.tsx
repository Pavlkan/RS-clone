import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/named
import { Box, PaletteMode } from '@mui/material';

import { LandingPage } from './pages/LandingPage';
import { LobbyPage } from './pages/LobbyPage';
import { GameProcessor } from './GameProcessor';
import { GamePage } from './pages/GamePage';
import { SocketProvider } from './socket/SocketProvider';
import { selectIsAuth } from './store/selectors';
import { ProtectedRoute } from './ProtectedRoute';
import { ResultsPage } from './pages/ResultsPage';
import ThemeSwitcher from './components/theme-switcher/ThemeSwitcher';
import { playAudio } from './components/audio-controls';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode: mode,
  },
});

export const App = () => {
  const themeMode: 'dark' | 'light' = localStorage.getItem('themeMode') === 'light' ? 'light' : 'dark';
  const [mode, setMode] = React.useState<PaletteMode>(themeMode);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        playAudio('click');
        setMode(() => {
          const nextThemeMode = localStorage.getItem('themeMode') === 'light' ? 'dark' : 'light';
          localStorage.setItem('themeMode', nextThemeMode);
          return nextThemeMode;
        });
      },
    }),
    [],
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const isAuth = useSelector(selectIsAuth);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            width: 'fit-content',
            position: 'absolute',
            top: 3,
            left: 3,
          }}
        >
          <ThemeSwitcher mode={mode} onClick={colorMode.toggleColorMode}></ThemeSwitcher>
        </Box>
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
              <Route path="/results" element={<ResultsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
