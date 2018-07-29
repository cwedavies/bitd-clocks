import _ from 'lodash/fp';
import { serial as test } from 'ava';
import io from 'socket.io-client';
import { createLogger, transports, format } from 'winston';

import server from '../lib/server';
import * as user from './_user';

const TEST_PORT = 3002;

const PORT = 3001;

const log = createLogger({
  level: process.env.LOG_LEVEL || 'error',
  transports: [
    new transports.Console({ format: format.simple() })
  ]
});

/*
1) user A connects to the service
2) user A ticks down the clock
3) user B connects to the service
4) user A ticks down the clock
5) user A ticks up the clock
6) user B ticks up the clock twice
*/

const resolveUser = user.buildCache(connect);

test.before(startServer);

test('1)  user A connects to the service', async t => {
  // ACT
  const userA = await resolveUser('userA');
  await delay(10);

  // ASSERT
  t.truthy(user.actions(userA).length, 'Expected some initial state');

  const firstAction = _.first(user.actions(userA));
  t.is(firstAction.type, 'clock/UPDATE', 'Expected the first action to be a clock update');
});

test('2)  user A ticks down the clock', async t => {
  // SETUP
  const userA = await resolveUser('userA');

  // ACT
  user.send(userA, { type: 'clock/TICKDOWN' });
  await delay(10);

  // ASSERT
  const action = user.lastAction(userA);
  t.truthy(action, 'Expected a response to user A\'s action');
  t.is(action.type, 'clock/UPDATE', 'Expected the response to be a clock update');
  t.is(action.ticks, 3, 'Expected the clock\'s ticks to be incremented');
});

function connect(handlers) {
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

function delay(ms, promise) {
  return new Promise(_.delay(ms))
    .then(() => promise);
}

function startServer() {
  return new Promise((resolve, reject) => {
    server(log).listen(TEST_PORT, err => {
      if (err) return reject(`Unable to start server: ${err}`);
      log.info(`server listening on ${TEST_PORT}`);
      resolve();
    });
  });
}
