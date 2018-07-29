import React from 'react';
import ReactDOM from 'react-dom';
import openSocket from 'socket.io-client';
import rSocket from 'redux-socket.io';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import clockReducer from './state/clock';
import registerServiceWorker from './registerServiceWorker';

const socket = openSocket('http://192.168.0.106:3001', { path: '/' });
const store = createStore(
  clockReducer,
  undefined,
  applyMiddleware(
    logger,
    rSocket(socket, (type, action) => action.emit)
  )
);

//socket.on('action', (action) => store.dispatch(action));

ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('root')
);
registerServiceWorker();
