import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import configService from './core/services/configService';
import store from '@store/store';

// import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';

const root = createRoot(document.getElementById('root'));

configService.loadConfig().then(() => {
  return root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
});
