import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/named
import { Box, IconButton, PaletteMode } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { LandingPage } from './pages/LandingPage';
import { LobbyPage } from './pages/LobbyPage';
import { GameProcessor } from './GameProcessor';
import { GamePage } from './pages/GamePage';
import { SocketProvider } from './socket/SocketProvider';
import { selectIsAuth } from './store/selectors';
import { ProtectedRoute } from './ProtectedRoute';
import { ResultsPage } from './pages/ResultsPage';

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
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
  const isAuth = useSelector(selectIsAuth);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            width: 'fit-content',
            position: 'absolute',
            top: matches ? 20 : 3,
            left: matches ? 20 : 3,
            bgcolor: 'background.default',
            color: 'text.primary',
            border: '1px solid',
            borderRadius: 2,
            p: matches ? 1.5 : 0,
            cursor: 'pointer',
          }}
          onClick={colorMode.toggleColorMode}
        >
          <span>{matches ? `${theme.palette.mode.toUpperCase()} MODE` : ''}</span>
          <IconButton sx={{ ml: 1 }} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
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
