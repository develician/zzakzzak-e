import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configure from 'store/configure';
import Loadable from 'react-loadable';
// import * as serviceWorker from './serviceWorker';

const store = configure(window.__PRELOADED_STATE__);

const rootElement = document.getElementById('root');

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

if (window.ssr) {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(app, rootElement);
  });
  console.log('hydrate');
} else {
  ReactDOM.render(app, rootElement);
  console.log('just render');
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
