import React from 'react';
import { createRoot } from 'react-dom/client';
import { Player } from './Player';

it('Renders without crashing Player component', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<Player user={undefined} isOwnerPlayerItem={true} isOwner={true} />);
});
