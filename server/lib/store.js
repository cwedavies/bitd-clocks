import _ from 'lodash/fp';
import { fromEvent, startWith } from 'most';
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

export default function store() {
  let ticks = 2;
  const emitter = new EventEmitter();
  const listeners = [];

  return {
    changes: changes,
    tickdown: tickdown,
    tickup: tickup
  };

  function changes() {
    return startWith(ticks, fromEvent(CHANGE_EVENT, emitter));
  }

  function tickdown() {
    ticks = (ticks > 0 ? ticks - 1 : 0);
    emitChange(ticks);
  }

  function tickup() {
    ticks = (ticks < 5 ? ticks + 1 : 0);
    emitChange(ticks);
  }

  function emitChange(ticks) {
    _.delay(0, () => emitter.emit(CHANGE_EVENT, ticks));
  }
}
