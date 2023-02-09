import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import { store } from './app/store/store';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  // eslint-disable-next-line react/jsx-no-undef
  <Provider store={store}>
    <App />
  </Provider>,
);
