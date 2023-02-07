import React from 'react';
import { createRoot } from 'react-dom/client';
import store from './app/store/store';
import { Provider } from 'react-redux';
import { App } from './app/App';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
