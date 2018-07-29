import _ from 'lodash/fp';

export default function store() {
  let ticks = 2;
  const listeners = [];

  return {
    changes: changes,
    tickdown: tickdown
  };

  function changes(listener) {
    listeners.push(listener);
    notify(listener);
  }

  function tickdown() {
    ticks = ticks + 1;
    notifyAll();
  }

  function notify(listener) {
    listener(ticks);
  }

  function notifyAll() {
    _.each(notify, listeners);
  }
}
