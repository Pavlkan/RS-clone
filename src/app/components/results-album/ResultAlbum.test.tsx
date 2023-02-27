import React from 'react';
import { createRoot } from 'react-dom/client';
import { GameAlbum } from '../../store/gameSlice';
import { ResultsAlbum } from './ResultsAlbum';

it('Render without crashing ResultAlbum component', () => {
  const mockGameAlbum: GameAlbum = { data: ['', ['', '']] };

  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<ResultsAlbum albumIndex={1} gameAlbum={mockGameAlbum} />);
});
