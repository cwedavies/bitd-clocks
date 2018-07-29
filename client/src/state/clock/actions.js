
import { actions } from './constants';

export {
  decrementClock,
  incrementClock
}

function incrementClock() {
  return { type: actions.CLOCK_INCREMENT };
}

function decrementClock() {
  return { type: actions.CLOCK_DECREMENT };
}
