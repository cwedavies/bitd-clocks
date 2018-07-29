import _ from 'lodash/fp';
import io from 'socket.io-client';
import winston from 'winston';

import server from '../lib/server';

// -- Constants --

const TEST_PORT = 3002;
const log = winston.createLogger({
  level: process.env.LOG_LEVEL || 'error',
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// -- Public --

export function connect(handlers) {
  return new Promise((resolve, reject) => {
    const socket = io(`http://localhost:${TEST_PORT}`, {
      path: '/api',
      reconnectionAttempts: 3,
      timeout: 1000,
      forceNew: true,
      transports: ['websocket']
    });

    _.each(([event, handler]) => {
      socket.on(event, handler);
    }, _.entries(handlers));

    socket.on('connect', () => resolve(socket));
    socket.on('reconnect_failed', () => reject('Unable to connect to api'));
  });
}

export function delay(ms, promise) {
  return new Promise(_.delay(ms))
    .then(() => promise);
}

export function startServer() {
  return new Promise((resolve, reject) => {
    server(log).listen(TEST_PORT, err => {
      if (err) return reject(`Unable to start server: ${err}`);
      log.info(`server listening on ${TEST_PORT}`);
      resolve();
    });
  });
}

