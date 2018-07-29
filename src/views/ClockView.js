import React from 'react';
import _ from 'lodash/fp';
import { connect } from 'react-redux';

import Clock from '../components/Clock';

export default connect(mapStateToProps)(ClockView);

function ClockView({clocks}) {
  return (
    <section className="clocks">
      {
        _.map(
          (clock, idx) => <Clock key={idx} {...clock} />,
          clocks
        )
      }
    </section>
  );
}

function mapStateToProps(state) {
  return {
    clocks: [state]
  };
}
