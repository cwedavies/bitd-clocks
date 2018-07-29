import React from 'react';
import { connect } from 'react-redux';
import { tickUp, tickDown } from '../state/clock';

export default connect(null, { tickUp, tickDown })(ClockControls);

function ClockControls({ tickUp, tickDown }) {
  return (
    <section className="clock-controls">
      <button onClick={tickDown}>-</button>
      <button onClick={tickUp}>+</button>
    </section>
  );
}
