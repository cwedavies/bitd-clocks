import _ from 'lodash/fp';
import { serial as test } from 'ava';
import io from 'socket.io-client';

import server from '../lib/server';
import * as user from './_user';

const TEST_PORT = 3002;

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

  // ASSERT
  const action = user.lastAction(userA);
  t.is(action.type, 'clock/UPDATE');
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

function startServer() {
  return new Promise((resolve, reject) => {
    server().listen(TEST_PORT, err => {
      if (err) return reject(`Unable to start server: ${err}`);
      console.log(`server listening on ${TEST_PORT}`);
      resolve();
    });
  });
}
