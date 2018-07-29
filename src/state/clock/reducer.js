
import { actions } from './constants';

const initialState = {
  caption: [
    'A New Life of Crime',
    '#Theoldlifewascrimetoo',
  ],
  ticks: 2
};

export default reducer;

function reducer(state = initialState, action) {
  switch(action.type) {
    case actions.CLOCK_DECREMENT:
      return Object.assign({}, state, { ticks: state.ticks - 1 });
    case actions.CLOCK_INCREMENT:
      return Object.assign({}, state, { ticks: state.ticks + 1 });
    default:
      return state;
  }
}
