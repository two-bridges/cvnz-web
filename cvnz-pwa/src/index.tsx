
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './redux/store/configureStore';
import { swEnabled } from './sw/sw-enabled';

// fix: https://stackoverflow.com/a/53924630/2396191
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

if (swEnabled) {
  serviceWorker.register({});
}