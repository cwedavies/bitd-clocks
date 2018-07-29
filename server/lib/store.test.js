
import { reduce, Stream, take } from 'most';
import { serial as test } from 'ava';

import store from './store';

test('change stream can be retrieved', t => {
  var instance = store();
  var stream = instance.changes();

  t.true(stream instanceof Stream);
});

test('change stream starts with initial state', async t => {
  var instance = store();
  var changes = instance.changes();

  var value = await last(take(1, changes));

  t.is(value, 2);
});

function last(stream) {
  return reduce((_, x) => x, null, stream);
}
