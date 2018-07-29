import _ from 'lodash/fp';
import { serial as test } from 'ava';

import * as user from './_user';
import { connect, delay, startServer } from './_util';

// -- Constants --

const resolveUser = user.buildCache(connect);

// -- Test Suite --

test.before(startServer);

test('1)  user A connects to the service', async t => {
  // ACT
  const userA = await resolveUser('userA');
  await delay(10);

  // ASSERT
  t.truthy(user.actions(userA).length, 'Expected some initial state');
  assertUpdate(t, user.lastAction(userA), 2);
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
  assertUpdate(t, user.lastAction(userA), 3);
});

test('3)  user B connects to the service', async t => {
  const userB = await resolveUser('userB');

  // ASSERT
  await delay(10);
  const action = user.lastAction(userB);
  t.truthy(action, 'Expected initial state');
  assertUpdate(t, user.lastAction(userB), 3);
});

test('4)  user A ticks down the clock', async t => {
  const [userA, userB] = await Promise.all([resolveUser('userA'), resolveUser('B')]);

  user.send(userA, { type: 'clock/TICKDOWN' });

  await delay(10);
  t.truthy(user.lastAction(userA), 'Expected user A to recieve an updated');
  assertUpdate(t, user.lastAction(userA), 4);
  t.truthy(user.lastAction(userB), 'Expected user B to recieve an updated');
  assertUpdate(t, user.lastAction(userB), 4);
});

test('5)  user A ticks up the clock', async t => {
  const [userA, userB] = await Promise.all([resolveUser('userA'), resolveUser('B')]);

  user.send(userA, { type: 'clock/TICKUP' });

  await delay(10);
  t.truthy(user.lastAction(userA), 'Expected user A to recieve an updated');
  assertUpdate(t, user.lastAction(userA), 3);
  t.truthy(user.lastAction(userB), 'Expected user B to recieve an updated');
  assertUpdate(t, user.lastAction(userB), 3);
});

test('6)  user B ticks down the clock twice', async t => {
  const [userA, userB] = await Promise.all([resolveUser('userA'), resolveUser('B')]);

  user.send(userB, { type: 'clock/TICKDOWN' });
  user.send(userB, { type: 'clock/TICKDOWN' });

  await delay(10);
  t.truthy(user.lastAction(userA), 'Expected user A to recieve an updated');
  assertUpdate(t, user.lastAction(userA), 5);
  t.truthy(user.lastAction(userB), 'Expected user B to recieve an updated');
  assertUpdate(t, user.lastAction(userB), 5);
});

function assertUpdate(t, { type, ticks }, expectedTicks) {
  t.is(type, 'clock/UPDATE', 'Expected the action to be a clock update');
  t.is(ticks, expectedTicks, `Expected the clock to have ${expectedTicks} ticks`);
}

