import React from 'react';
import { createRoot } from 'react-dom/client';
import { LobbyPage } from './LobbyPage';

it('Renders without crashing LobbyPage component', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<LobbyPage />);
});
