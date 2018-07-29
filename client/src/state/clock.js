import _ from 'lodash/fp';

// -- CONSTANTS --

const initialState = {
  caption: [
    'A New Life of Crime',
    '#Theoldlifewascrimetoo',
  ],
  ticks: 0
};

export const UPDATE = 'clock/UPDATE';
export const TICK = 'clock/TICK';


// -- ACTIONS --

export const tickUp = _.partial(tick, [1]);
export const tickDown = _.partial(tick, [-1]);

export function tick(increment) {
  return { type: TICK, emit: true, increment };
}

export function update(ticks) {
  return { type: UPDATE, ticks, emit: true };
}

// -- REDUCER --

export default function reducer(clock = initialState, action) {
  console.log("ahhh");
  console.log(clock.ticks);
  switch(action.type) {
    case TICK:
      return updateTicks(clock, clock.ticks + action.increment);
    case UPDATE:
      return updateTicks(clock, action.ticks);
    default:
      return clock;
  }
}

function updateTicks(clock, ticks) {
  ticks = clamp(ticks, 0, 6);

  return (ticks === clock.ticks) ?
    clock :
    Object.assign({}, clock, { ticks });
}

function clamp(val, min, max) {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}
