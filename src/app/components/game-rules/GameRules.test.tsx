import React from 'react';
import { createRoot } from 'react-dom/client';
import GameRules from './GameRules';

it('Renders without crashing GameRules component', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<GameRules />);
});
