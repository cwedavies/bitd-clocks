
import { observe, reduce, Stream, take } from 'most';
import { serial as test } from 'ava';

import store from './store';

test('change stream can be retrieved', t => {
  var instance = store();
  var stream = instance.changes();

  t.true(stream instanceof Stream, 'Expected a Stream instance');
});

test('change stream starts with initial state', async t => {
  var instance = store();
  var changes = instance.changes();

  var value = await last(take(1, changes));

  t.is(value, 2, 'Expected the clock state to be different');
});

test('stored clock can be ticked down', async t => {
  var instance = store();
  var value = last(take(2, instance.changes()));

  instance.tickdown();

  t.is(await value, 1, 'Expected the clock state to be different');
});

test('stores clock can be ticked up', async t => {
  var instance = store();
  var value = last(take(2, instance.changes()));

  instance.tickup();

  t.is(await value, 3, 'Expected the clock state to be different');
});

test('store can be ticked down multiple times', async t => {
  var instance = store();
  var value = last(take(3, instance.changes()));

  instance.tickdown();
  instance.tickdown();

  t.is(await value, 0, 'Expected the clock state to be different');
});

test('stored clock can not go below zero', async t => {
  var instance = store();
  var value = last(take(5, instance.changes()));

  instance.tickdown();
  instance.tickdown();
  instance.tickdown();
  instance.tickdown();

  t.is(await value, 0, 'Expected the clock state to be different');
});

test('stored clock can be ticked up and down', async t => {
  var instance = store();
  var value = last(take(5, instance.changes()));

  instance.tickdown();
  instance.tickup();
  instance.tickup();
  instance.tickup();

  t.is(await value, 4, 'Expected the clock state to be different');
});

function last(stream) {
  return reduce((_, x) => x, null, stream);
}
