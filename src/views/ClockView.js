import React from 'react';
import _ from 'lodash/fp';

import Clock from '../components/ClockAlt';

export default ClockView;

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
