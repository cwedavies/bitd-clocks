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
    setTimeout(() => {
      ticks = (ticks > 0 ? ticks - 1 : 0);
      emitter.emit(CHANGE_EVENT, ticks)
    });
  }

  function tickup() {
    setTimeout(() => {
      ticks = (ticks < 5 ? ticks + 1 : 0);
      emitter.emit(CHANGE_EVENT, ticks);
    });
  }
}
