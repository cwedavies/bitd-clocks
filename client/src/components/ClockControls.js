import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../state/clock/actions';

export default connect(null, mapDispatchToProps)(ClockControls);

function ClockControls({ decrementClock, incrementClock }) {
  return (
    <section className="clock-controls">
      <button onClick={decrementClock}>-</button>
      <button onClick={incrementClock}>+</button>
    </section>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    decrementClock: () => dispatch(actions.decrementClock()),
    incrementClock: () => dispatch(actions.incrementClock())
  };
}
