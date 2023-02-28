import React from 'react';
import { render } from '@testing-library/react';
import GamePresets from './GamePresets';

function renderGamePresets() {
  return render(<GamePresets handleWritingRoundTimeChange={() => {}} handleDrawingRoundTimeChange={() => {}} />);
}

test('should display express mode button with default OFF text', async () => {
  const { findByTestId } = renderGamePresets();

  const toggleButtonLabel = await findByTestId('toggle-button-label');

  expect(toggleButtonLabel).toHaveTextContent('OFF');
});

test('should display drawing phase  as Normal', async () => {
  const { findByTestId } = renderGamePresets();

  const toggleButtonLabel = await findByTestId('drawing-select');

  expect(toggleButtonLabel).toHaveTextContent('Normal');
});

test('should display writing phase as Normal', async () => {
  const { findByTestId } = renderGamePresets();

  const toggleButtonLabel = await findByTestId('writing-select');

  expect(toggleButtonLabel).toHaveTextContent('Normal');
});
