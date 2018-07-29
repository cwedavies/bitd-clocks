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
          ([idx, clock]) => <Clock key={idx} {...clock} />,
          _.entries(clocks)
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
