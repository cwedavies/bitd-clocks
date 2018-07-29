import _ from 'lodash/fp';
import { of } from 'most';

export default function store() {
  let ticks = 2;
  const listeners = [];

  return {
    changes: changes,
    tickdown: tickdown,
    tickup: tickup
  };

  function changes() {
    return of(ticks);
  }

  function tickdown() {
    ticks = ticks + 1;
    notifyAll();
  }

  function tickup() {
    ticks = ticks - 1;
    notifyAll();
  }

  function notify(listener) {
    listener(ticks);
  }

  function notifyAll() {
    _.each(notify, listeners);
  }
}
