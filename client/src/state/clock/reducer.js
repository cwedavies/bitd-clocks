
import { actions } from './constants';

const initialState = {
  caption: [
    'A New Life of Crime',
    '#Theoldlifewascrimetoo',
  ],
  ticks: 2
};

export default reducer;

function reducer(clock = initialState, action) {
  switch(action.type) {
    case actions.CLOCK_DECREMENT:
      return updateTicks(clock, dec);
    case actions.CLOCK_INCREMENT:
      return updateTicks(clock, inc);
    default:
      return clock;
  }
}

function updateTicks(clock, fn) {
  var ticks = clamp(fn(clock.ticks), 0, 6);

  return (ticks === clock.ticks) ?
    clock :
    Object.assign({}, clock, { ticks });
}

function clamp(val, min, max) {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}

function inc(x) {
  return x + 1;
}

function dec(x) {
  return x - 1;
}
