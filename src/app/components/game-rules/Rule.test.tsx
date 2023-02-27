import React from 'react';
import { createRoot } from 'react-dom/client';
import Rule from './Rule';

it('Renders without crashing Rule component', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<Rule ruleId={0} />);
});
